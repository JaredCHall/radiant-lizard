import {fromFileUrl, join, resolve} from "https://deno.land/std@0.224.0/path/mod.ts"

interface ProjectStructure {
  denoConf: string
  importMap: string
  inputDir: string
  inputScript: string
  outputDir: string
  outputScript: string
  indexFile: string
}

interface BuildOptions {
  inlineJs: boolean
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
      readonly structure: ProjectStructure = {
        denoConf: 'deno.json',
        importMap: 'import_map.json',
        inputDir: 'public',
        inputScript: 'main.ts',
        outputDir: 'dist',
        outputScript: 'bundle.js',
        indexFile: 'index.html',
      },
      readonly buildOptions: BuildOptions = {
        inlineJs: false,
      },
  ) {
    this.projectRoot = resolve(fromFileUrl(new URL('..', import.meta.url)))


    this.paths = {
      denoConf: this.realPath(this.structure.denoConf),
      importMap: this.realPath(this.structure.importMap),
      inputDir: this.realPath(this.structure.inputDir),
      inputScript: this.realPath(this.structure.inputScript),
      inputIndex: this.realPath(join(
          this.structure.inputDir,
          this.structure.indexFile
      )),
      outputDir: this.realPath(this.structure.outputDir),
      outputScript: this.realPath(join(
          this.structure.outputDir,
          this.structure.outputScript
      )),
      outputIndex: this.realPath(join(
          this.structure.inputDir,
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