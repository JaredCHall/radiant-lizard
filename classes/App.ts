import {fromFileUrl, join, resolve} from "https://deno.land/std@0.224.0/path/mod.ts"

interface ProjectStructure {
  denoConf: string
  importMap: string
  sourceDir: string
  entryScript: string
  outputDir: string
  bundleFile: string
  indexFile: string
}

interface BuildOptions {
  inlineJs: boolean
}

const defaultStructure: ProjectStructure = {
  denoConf: 'deno.json',
  importMap: 'import_map.json',
  sourceDir: 'public',
  entryScript: 'main.ts',
  outputDir: 'dist',
  bundleFile: 'bundle.js',
  indexFile: 'index.html',
}

const defaultBuildOptions: BuildOptions = {
  inlineJs: true,
}


export class App {

  readonly projectRoot: string
  readonly paths: {
    denoConf: string
    importMap: string
    inputDir: string
    inputScript: string
    inputIndex: string
    outputDir: string
    outputScript: string
    outputIndex: string
  }

  constructor(
      readonly name: string = 'RadiantLizard',
      readonly structure: ProjectStructure = defaultStructure,
      readonly buildOptions: BuildOptions = defaultBuildOptions,
  ) {
    this.projectRoot = resolve(fromFileUrl(new URL('..', import.meta.url)))

    this.paths = {
      denoConf: this.realPath(this.structure.denoConf),
      importMap: this.realPath(this.structure.importMap),
      inputDir: this.realPath(this.structure.sourceDir),
      inputScript: this.realPath(this.structure.entryScript),
      inputIndex: this.realPath(join(
          this.structure.sourceDir,
          this.structure.indexFile
      )),
      outputDir: this.realPath(this.structure.outputDir),
      outputScript: this.realPath(join(
          this.structure.outputDir,
          this.structure.bundleFile
      )),
      outputIndex: this.realPath(join(
          this.structure.outputDir,
          this.structure.indexFile
      )),
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