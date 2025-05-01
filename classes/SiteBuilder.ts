import * as esbuild from "@esbuild"
import { denoPlugins } from "@deno-plugins"
import { app } from "@bootstrap-app"
import {resolve, toFileUrl} from "https://deno.land/std@0.224.0/path/mod.ts"
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"

const esbuildOptions = {
  entryPoints: [app.paths.inputScript],
  bundle: true, // bundle the scripts into a single file
  format: "esm", // format output as ESM modules
  minify: true, // minify the bundle
  target: "esnext", // emit modern javascript. no transpile / backport
  plugins: [...denoPlugins({
    importMapURL: toFileUrl(app.paths.importMap).href, // tell esbuild about the import map
  })],
  write: false // do not write the output to a file, just return it in RAM
}

export class SiteBuilder {
  /**
   * Executes the build process for the application, including file validation,
   * JavaScript compilation, and optional inlining of JavaScript into HTML.
   * Outputs the compiled JavaScript file or inlined HTML to the specified locations.
   *
   * @return {Promise<void>} A promise that resolves when the build process is completed.
   */
  public async build(): Promise<void> {

    console.log("%c🚧 Starting build process...", "color: cyan; font-weight: bold")

    // sanity checks
    await this.assertFileExists(app.paths.inputScript, "Entry point")
    await this.assertFileExists(app.paths.inputIndex, "Index File")

    // ensure the output directory exists and is empty
    await this.cleanOutputDir()
    console.log('%c📂 Output folder cleared',"color: gray")

    // copy static resources
    console.log("%c🗂 Copying static resources...", "color: gray")
    await this.copyStaticResources()

    // always need the compiled JavaScript
    const compiledJs = await this.getEsBuildOutput()
    console.log("%c✅ JavaScript successfully compiled by esbuild.", "color: green")

    // main branching logic
    switch(app.buildOptions.inlineJs) {
      case true:
        // use inlined javascript
        console.log("%c🧬 Inlining JavaScript into HTML (inlineJs = true)", "color: orange")
        await this.injectCompiledJavascript(app.paths.inputIndex, app.paths.outputIndex, compiledJs)
        break
      case false:
        // normal bundle.js type file
        await Deno.writeTextFile(app.paths.outputScript, compiledJs);
        break
    }



    console.log(`%c📦 Bundle written to ${app.paths.outputDir}`, "color: green")
    Deno.exit(0)
  }

  /**
   * Copies the contents of a directory from the source path to the destination path, including all nested files and directories.
   *
   * @param {string} src - The source directory path to copy from.
   * @param {string} dest - The destination directory path to copy to.
   * @return {Promise<void>} A Promise that resolves when the directory copy operation is complete.
   */
  public async copyDir(src: string, dest: string): Promise<void> {
    const resolvedSrc = resolve(src)
    const resolvedDest = resolve(dest)

    await Deno.mkdir(resolvedDest, { recursive: true })

    for await (const entry of Deno.readDir(resolvedSrc)) {
      const srcPath = `${resolvedSrc}/${entry.name}`
      const destPath = `${resolvedDest}/${entry.name}`

      if (entry.isDirectory) {
        await this.copyDir(srcPath, destPath)
      } else if (entry.isFile) {
        await Deno.copyFile(srcPath, destPath)
      }
    }
  }

  /**
   * Copies static resources such as files and directories from the input directory to the output directory.
   * This includes files like the index file, favicon, and image directory.
   * Logs a warning if a specified resource is missing.
   *
   * @return {Promise<void>} Resolves when all resources have been successfully copied or skipped if missing.
   */
  protected async copyStaticResources(): Promise<void> {
    const entries = [
        app.structure.indexFile,
      "favicon.ico",
      "images"
    ]

    for (const entry of entries) {
      const inputPath = app.realPath(app.structure.sourceDir + "/" + entry)
      const outputPath = app.realPath(app.structure.outputDir + "/" + entry)

      try {
        const stat = await Deno.stat(inputPath)

        if (stat.isDirectory) {
          await this.copyDir(inputPath, outputPath)
        } else if (stat.isFile) {
          await Deno.copyFile(inputPath, outputPath)
        }
      } catch (err) {
        if (err instanceof Deno.errors.NotFound) {
          console.warn(`⚠️ Skipped missing resource: ${entry}`)
        } else {
          throw err
        }
      }
    }
  }

  // cleans / recreates the output directory
  protected async cleanOutputDir(): Promise<void> {
    try {
      await Deno.remove(app.paths.outputDir, { recursive: true })
    } catch (err) {
      if (!(err instanceof Deno.errors.NotFound)) {
        throw err
      }
    }
    await Deno.mkdir(app.paths.outputDir, { recursive: true })
  }


  // run esbuild bundler and return the compiled javascript, throw if the result is empty
  protected async getEsBuildOutput(): Promise<string> {
    const result = await esbuild.build(esbuildOptions)
    const compiledJS = result.outputFiles?.[0]?.text ?? null

    if(!compiledJS) throw new Error('No output from esbuild.')

    return compiledJS
  }

  /**
   * Replaces an existing script tag in an HTML file with a new script containing compiled JavaScript,
   * and writes the updated HTML to a specified output file.
   *
   * @param {string} inputIndex - The file path to the input HTML file.
   * @param {string} outputIndex - The file path to write the updated HTML file to.
   * @param {string} compiledJs - The compiled JavaScript code to inject into the HTML.
   * @return {Promise<void>} A promise that resolves when the operation is complete.
   * @throws {Error} Throws an error if the input HTML cannot be parsed, if the script tag to be replaced is not found,
   *                 or if the updated HTML cannot be generated.
   */
  protected async injectCompiledJavascript(inputIndex: string, outputIndex: string, compiledJs: string): Promise<void> {

    const parser = new DOMParser()
    const doc = parser.parseFromString(await Deno.readTextFile(inputIndex), "text/html")
    if (!doc) throw new Error("Failed to parse HTML.")

    const newScriptTag = doc.createElement("script")
    newScriptTag.setAttribute("type", "module")
    newScriptTag.innerHTML = compiledJs

    const oldScriptTag = doc.querySelector(`script[src="./${app.structure.bundleFile}"]`)
    if (!oldScriptTag) {
      throw new Error(`index.html does not contain a script tag with src="./${app.structure.bundleFile}"`)
    }
    oldScriptTag.replaceWith(newScriptTag)

    const finalHtml = doc.documentElement?.outerHTML ?? null
    if (finalHtml === null) {
      throw new Error("Failed to parse HTML.")
    }

    await Deno.writeTextFile(outputIndex,  "<!DOCTYPE html>\n" + finalHtml)
  }

  public async verifyBuildCommit(): Promise<void> {
    const gitDiff = new Deno.Command("git", {
      args: ["diff", "--exit-code", "dist/"],
      stdout: "null",
      stderr: "null"
    })

    const proc = gitDiff.spawn()
    const status = await proc.status

    if (status.code !== 0) {
      console.error("❌ Build output is out of sync. Please commit updated dist/ before pushing.")
      Deno.exit(1)
    }

    console.log("%c✅ JavaScript successfully compiled by esbuild.", "color: green")
    Deno.exit(0)
  }


  // check if the path exists, or exit with a clean and readable error message
  protected async assertFileExists(path: string, label: string): Promise<void> {
    try {
      await Deno.stat(path)
    } catch (err) {
      if (err instanceof Deno.errors.NotFound) {
        console.log(`%c❌ ${label} not found: ${path}`, 'color: indianred; font-weight: bold')
        Deno.exit(1)
      }
      throw err
    }
  }
}
