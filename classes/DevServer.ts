import { serveDir } from "https://deno.land/std@0.224.0/http/file_server.ts";
import {App} from "./App.ts";



export class DevServer {

  readonly url: string;

  constructor(
      readonly hostname: string = '127.0.0.1',
      readonly port: number = 4280,
      readonly app: App,
  ) {
    this.url = `http://${this.hostname}:${this.port}/`;
  }

  start() {

    console.log(`🟢 Starting dev server at ${this.url}`);

    Deno.serve({ port: this.port, hostname: this.hostname }, async (req) => {
      const path = new URL(req.url).pathname;

      if (path === "/") {
        try {
          const file = await Deno.readFile(this.app.paths.outputIndex);
          return new Response(file, {
            headers: { "content-type": "text/html" },
          });
        } catch (_err) {
          console.error(`❌ Failed to read index.html:`);
          return new Response("Index file not found", { status: 500 });
        }
      }

      return serveDir(req, {
        fsRoot: this.app.paths.outputDir,
        urlRoot: "",
      });
    });
  }

  public async openInBrowser() {

    // wait to ensure the server is started
    await new Promise((resolve) => setTimeout(resolve, 250));

    const commands: Record<string, string[]> = {
      darwin: ["open"],
      windows: ["cmd", "/c", "start"],
      linux: ["xdg-open"],
    };

    const platform = Deno.build.os;
    const cmd = commands[platform];

    if (!cmd) {
      console.warn("⚠️ Platform not supported for auto-launch.");
      return;
    }

    try {
      new Deno.Command(cmd[0], {
        args: [...cmd.slice(1), this.url],
        stdout: "null",
        stderr: "null",
      }).spawn();
      console.log("🌐 Opening browser...");
    } catch (_err) {
      console.error("❌ Failed to open browser");
    }
  }
}
