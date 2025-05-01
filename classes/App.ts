import {fromFileUrl, resolve} from "https://deno.land/std@0.224.0/path/mod.ts"

interface ProjectStructure {
  sourceDir: string
  sourceMain: string
  outputDir: string
  outputJsBundle: string
  importMapPath: string
  indexFile: string
}

interface BuildOptions {
  inlineJs: boolean
}

export class App {

  readonly projectRoot: string
  readonly paths: {
    entryPoint: string
    index: string
    outputDir: string
    outputJsBundle: string
    importMap: string
  }

  constructor(
      readonly name: string = 'RadiantLizard',
      readonly structure: ProjectStructure = {
        sourceDir: 'public',
        sourceMain: 'main.ts',
        outputDir: 'dist',
        outputJsBundle: 'bundle.js',
        importMapPath: 'import_map.json',
        indexFile: 'index.html',
      },
      readonly buildOptions: BuildOptions = {
        inlineJs: false,
      },
  ) {
    this.projectRoot = resolve(fromFileUrl(new URL('..', import.meta.url)))
    this.paths = {
      entryPoint: this.realPath(this.structure.sourceMain),
      index: this.realPath(this.structure.indexFile),
      outputDir: this.realPath(this.structure.outputDir),
      outputJsBundle: this.realPath(this.structure.outputJsBundle),
      importMap: this.realPath(this.structure.importMapPath),
    }

    // freeze objects to make them truly immutable
    this.buildOptions = Object.freeze(buildOptions)
    this.structure = Object.freeze(structure)
    this.paths = Object.freeze(this.paths)
  }

  // returns a real absolute path from the project root
  realPath(relativePath: string): string {
    return resolve(this.projectRoot, relativePath)
  }
}

export const app = new App()