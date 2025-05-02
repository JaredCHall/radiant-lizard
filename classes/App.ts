import {fromFileUrl, join, resolve} from "@path"

interface ProjectStructure {
  denoConf: string
  sourceDir: string
  entryScript: string
  outputDir: string
  bundleFile: string
  indexFile: string
}

interface BuildOptions {
  inlineJs: boolean
}

export class App {

  readonly projectRoot: string
  readonly paths: {
    denoConf: string
    inputDir: string
    inputScript: string
    inputIndex: string
    outputDir: string
    outputScript: string
    outputIndex: string
  }

  constructor(
      readonly name: string = 'RadiantLizard',
      readonly structure: ProjectStructure,
      readonly buildOptions: BuildOptions,
  ) {
    this.projectRoot = resolve(fromFileUrl(new URL('..', import.meta.url)))

    this.paths = {
      denoConf: this.realPath(this.structure.denoConf),
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