import { serveDir } from "https://deno.land/std@0.224.0/http/file_server.ts";
import { join } from "https://deno.land/std@0.224.0/path/mod.ts";

Deno.serve({ port: 8000, hostname: "127.0.0.1" }, async (req) => {
  const url = new URL(req.url);
  const pathname = url.pathname;

  // Serve index.html manually
  if (pathname === "/") {
    const file = await Deno.readFile("public/index.html");
    return new Response(file, {
      headers: { "content-type": "text/html" },
    });
  }

  // Fallback to static file server
  return serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
  });
});
