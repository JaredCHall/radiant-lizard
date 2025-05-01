import {App} from "./classes/App.ts";
export const app = new App(
    "Radiant Lizard",
    {
      denoConf: 'deno.json',
      importMap: 'import_map.json',
      sourceDir: 'public',
      entryScript: 'main.ts',
      outputDir: 'dist',
      bundleFile: 'bundle.js',
      indexFile: 'index.html',
    },
    {
      inlineJs: false,
    },
);