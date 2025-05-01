import * as esbuild from "@esbuild";
import { denoPlugins } from "@deno-plugins";
import {join} from "https://deno.land/std@0.224.0/path/mod.ts";
import {app} from "./App.ts";

export class SiteBuilder {

  readonly entryPointJs: string;

  constructor(
      readonly importMapPath: string = '../import_map.json',
      readonly entryPoint: string = 'main.ts',
      readonly indexFile: string = 'index.html',
      readonly sourceDir: string = './public',
      readonly outputDir: string = './dist',
  ) {
    this.entryPointJs = this.entryPoint.replace(/\.ts$/, '.js')
  }

  async build(): Promise<void> {
    console.log("%c🚧 Starting build process...", "color: cyan; font-weight: bold");


    const entryPath = join(this.sourceDir, this.entryPoint);

    this.assertFileExists(entryPath, "Entry point");

    const compiledJs = await this.getEsBuildOutput();
    console.log("%c✅ JavaScript successfully compiled by esbuild.", "color: green");

    if (app.inlineJs) {
      console.log("%c🧬 Inlining JavaScript into HTML (inlineJs = true)", "color: orange");
      const modifiedHtml = await this.injectCompiledJavascript(compiledJs);
      const htmlPath = join(this.outputDir, this.indexFile);
      await Deno.writeTextFile(htmlPath, modifiedHtml);
      console.log(`%c📄 Wrote inlined HTML to ${htmlPath}`, "color: green");
      return;
    }

    const jsPath = join(this.outputDir, this.entryPointJs);
    await Deno.writeTextFile(jsPath, compiledJs);
    console.log(`%c📦 Wrote compiled JavaScript to ${jsPath}`, "color: green");

    Deno.exit(0)
  }



  protected async getEsBuildOutput(): Promise<string> {
    const result = await esbuild.build({
      entryPoints: [join(this.sourceDir,this.entryPoint)],
      bundle: true,
      format: "esm",
      minify: true,
      target: "esnext",
      plugins: [...denoPlugins({
        importMapURL: new URL(this.importMapPath, import.meta.url).href, // 👈 this line is crucial
      })],
      write: false // <- key to avoid writing to disk
    });

    return result.outputFiles?.[0]?.text ?? ""
  }

  protected async injectCompiledJavascript(compiledJs: string): Promise<string> {
    const html = await Deno.readTextFile(join(this.sourceDir,this.indexFile));

    // Parse the DOM
    const doc = new DOMParser().parseFromString(html, "text/html");
    if (!doc) throw new Error("Failed to parse HTML.");

    // Create a new <script> element
    const script = doc.createElement("script");
    script.setAttribute("type", "module");
    script.innerHTML = compiledJs

    // Replace main script tag
    const oldScript = doc.querySelector(`script[src="./${this.entryPointJs}"]`);
    if (!oldScript) {
      throw new Error(`index.html does not contain a script tag with src="./${this.entryPointJs}"`)
    }
    oldScript.replaceWith(script);

    const finalHtml = doc.documentElement?.outerHTML ?? null
    if(finalHtml === null){
      throw new Error("Failed to parse HTML.")
    }

    // add back in the DOCTYPE, deno strips these
    return "<!DOCTYPE html>\n" + finalHtml
  }

  protected async assertFileExists(path: string, label: string): Promise<void> {
    try {
      await Deno.stat(path);
    } catch (err) {
      if (err instanceof Deno.errors.NotFound) {
        console.log(`%c❌ ${label} not found: ${path}`,'color: indianred; font-weight: bold');
        Deno.exit(1);
      }
      throw err;
    }
  }

}