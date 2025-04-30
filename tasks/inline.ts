import * as esbuild from "@esbuild";
import { denoPlugins } from "@deno-plugins";
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

const result = await esbuild.build({
    entryPoints: ["main.ts"],
    bundle: true,
    format: "esm",
    minify: true,
    target: "esnext",
    plugins: [...denoPlugins({
        importMapURL: new URL("../import_map.json", import.meta.url).href, // 👈 this line is crucial
    })],
    write: false // <- key to avoid writing to disk
});

// Extract JS code from memory
const js = result.outputFiles?.[0]?.text ?? "";
const html = await Deno.readTextFile("index.html");

// Parse the DOM
const doc = new DOMParser().parseFromString(html, "text/html");
if (!doc) throw new Error("Failed to parse HTML.");

// Create a new <script> element
const script = doc.createElement("script");
script.setAttribute("type", "module");
script.innerHTML = js

// Replace placeholder in old script or just append cleanly
const oldScript = doc.querySelector('script[src="./main.ts"]');
if (oldScript) {
    oldScript.replaceWith(script);
} else {
    doc.body?.appendChild(script);
}

const finalHtml = doc.documentElement?.outerHTML ?? null
if(finalHtml === null){
    throw new Error("Failed to parse HTML.")
}
await Deno.writeTextFile("portable.html", "<!DOCTYPE html>\n" + finalHtml);

console.log("✅ Inline build complete: portable.html");
Deno.exit(0);
