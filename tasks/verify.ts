import {app} from "@bootstrap-app";

const gitDiff = new Deno.Command("git", {
  args: ["diff", "--exit-code", app.paths.outputDir],
  stdout: "null",
  stderr: "null"
})

const proc = gitDiff.spawn()
const status = await proc.status

if (status.code !== 0) {
  console.error("%c❌ Build is out of sync. Please commit updated dist/ before pushing.","color: indianred; font-weight: bold")
  Deno.exit(1)
}

console.log("%c✅ Build is up-to-date with git history.", "color: green")
Deno.exit(0)

