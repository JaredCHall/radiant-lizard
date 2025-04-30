import * as esbuild from "@esbuild";
import { denoPlugins } from "@deno-plugins";

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
const htmlTemplate = await Deno.readTextFile("templates/index.html");

const htmlPart1 = htmlTemplate.split("__BUNDLE__")[0];
const htmlPart2 = htmlTemplate.split("__BUNDLE__")[1];
const finalHtml = htmlPart1 + js + htmlPart2;
await Deno.writeTextFile("public/index.html", finalHtml);

console.log("✅ Inline build complete: dist/index.html");
Deno.exit(0);
