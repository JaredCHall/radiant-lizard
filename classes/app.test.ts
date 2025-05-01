import { assertEquals, assertThrows } from "https://deno.land/std@0.224.0/assert/mod.ts"
import { App } from "./App.ts"
import { resolve } from "https://deno.land/std@0.224.0/path/mod.ts"

Deno.test("App initializes with default configuration", () => {
  const app = new App()

  // Should match one level above this file
  const expectedRoot = resolve(new URL("..", import.meta.url).pathname)
  assertEquals(app.projectRoot, expectedRoot)

  // Verify default structure
  assertEquals(app.structure, {
    inputDir: 'public',
    inputScript: 'main.ts',
    outputDir: 'dist',
    outputScript: 'bundle.js',
    importMap: 'import_map.json',
    indexFile: 'index.html',
  })

  // Verify default build options
  assertEquals(app.buildOptions, {
    inlineJs: false,
  })

  // Verify resolved paths
  assertEquals(app.paths.inputScript, resolve(expectedRoot, "main.ts"))
  assertEquals(app.paths.inputIndex, resolve(expectedRoot, "index.html"))
  assertEquals(app.paths.outputDir, resolve(expectedRoot, "dist"))
  assertEquals(app.paths.outputScript, resolve(expectedRoot, "bundle.js"))
  assertEquals(app.paths.importMap, resolve(expectedRoot, "import_map.json"))

})

Deno.test("App respects custom project structure and options", () => {
  const app = new App("TestApp", {
    inputDir: "src",
    inputScript: "entry.ts",
    outputDir: "build",
    outputScript: "main.bundle.js",
    importMap: "import-map.json",
    indexFile: "home.html",
  }, {
    inlineJs: true
  })

  assertEquals(app.name, "TestApp")
  assertEquals(app.buildOptions.inlineJs, true)

  const root = app.projectRoot
  assertEquals(app.paths.inputScript, resolve(root, "entry.ts"))
  assertEquals(app.paths.inputIndex, resolve(root, "home.html"))
  assertEquals(app.paths.outputDir, resolve(root, "build"))
  assertEquals(app.paths.outputScript, resolve(root, "main.bundle.js"))
  assertEquals(app.paths.importMap, resolve(root, "import-map.json"))
})

Deno.test("App paths and config are frozen", () => {
  const app = new App()

  assertThrows(() => {
    app.paths.inputIndex = "/somewhere/else.html"
  }, TypeError)

  assertThrows(() => {
    app.buildOptions.inlineJs = true
  }, TypeError)

  assertThrows(() => {
    app.structure.outputDir = "/elsewhere"
  }, TypeError)
})
