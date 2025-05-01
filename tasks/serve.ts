import {DevServer} from "../classes/DevServer.ts";
import {app} from "@bootstrap-app";

const server = new DevServer(
    "127.0.0.1",
    4280,
    app
)
server.start();

await server.openInBrowser();