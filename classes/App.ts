export class App {

  readonly name: string = 'RadiantLizard'

  // will inline JavaScript to bypass CORs errors when viewing index.html without an http server
  readonly inlineJs: boolean = false

}

export const app = new App()