import * as esbuild from "@esbuild"
import { denoPlugins } from "@deno-plugins"
import { app } from "./App.ts"

export class SiteBuilder {
  async build(): Promise<void> {
    console.log("%c🚧 Starting build process...", "color: cyan; font-weight: bold")

    const entryPath = app.paths.entryPoint
    await this.assertFileExists(entryPath, "Entry point")

    const compiledJs = await this.getEsBuildOutput()
    console.log("%c✅ JavaScript successfully compiled by esbuild.", "color: green")

    if (app.buildOptions.inlineJs) {
      console.log("%c🧬 Inlining JavaScript into HTML (inlineJs = true)", "color: orange")
      const modifiedHtml = await this.injectCompiledJavascript(compiledJs)
      const htmlPath = app.paths.index
      await Deno.writeTextFile(htmlPath, modifiedHtml)
      console.log(`%c📄 Wrote inlined HTML to ${htmlPath}`, "color: green")
      return
    }

    const jsPath = app.paths.outputJsBundle
    await Deno.writeTextFile(jsPath, compiledJs)
    console.log(`%c📦 Wrote compiled JavaScript to ${jsPath}`, "color: green")

    Deno.exit(0)
  }

  protected async getEsBuildOutput(): Promise<string> {
    const result = await esbuild.build({
      entryPoints: [app.paths.entryPoint],
      bundle: true,
      format: "esm",
      minify: true,
      target: "esnext",
      plugins: [...denoPlugins({
        importMapURL: app.paths.importMap, // 👈 this line is crucial
      })],
      write: false
    })

    return result.outputFiles?.[0]?.text ?? ""
  }

  protected async injectCompiledJavascript(compiledJs: string): Promise<string> {
    const html = await Deno.readTextFile(app.paths.index)

    const doc = new DOMParser().parseFromString(html, "text/html")
    if (!doc) throw new Error("Failed to parse HTML.")

    const script = doc.createElement("script")
    script.setAttribute("type", "module")
    script.innerHTML = compiledJs

    const oldScript = doc.querySelector(`script[src="./${app.structure.outputJsBundle}"]`)
    if (!oldScript) {
      throw new Error(`index.html does not contain a script tag with src="./${app.structure.outputJsBundle}"`)
    }
    oldScript.replaceWith(script)

    const finalHtml = doc.documentElement?.outerHTML ?? null
    if (finalHtml === null) {
      throw new Error("Failed to parse HTML.")
    }

    return "<!DOCTYPE html>\n" + finalHtml
  }

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
