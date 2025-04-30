import * as esbuild from "https://deno.land/x/esbuild@v0.21.4/mod.js";
import { denoPlugins } from "https://deno.land/x/esbuild_deno_loader@0.9.0/mod.ts";

const result = await esbuild.build({
    entryPoints: ["main.ts"],
    bundle: true,
    format: "esm",
    minify: true,
    target: "esnext",
    plugins: [...denoPlugins()],
    write: false // <- key to avoid writing to disk
});

// Extract JS code from memory
const js = result.outputFiles?.[0]?.text ?? "";
const htmlTemplate = await Deno.readTextFile("templates/index.html");

const htmlPart1 = htmlTemplate.split("__BUNDLE__")[0];
const htmlPart2 = htmlTemplate.split("__BUNDLE__")[1];
const finalHtml = htmlPart1 + js + htmlPart2;
await Deno.writeTextFile("public/index.html", finalHtml);

console.log("✅ Inline build complete: dist/index.html");
Deno.exit(0);
