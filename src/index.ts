#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { buildServer, VERSION } from "./server.js";
import { runCli, exitCodeFor } from "./cli.js";
import { runDoctor } from "./doctor.js";
import { basename } from "node:path";
const HELP = `Shotstack MCP server and CLI ${VERSION}

shotstack-mcp                         Start local stdio MCP
shotstack-cli                         List task commands
shotstack-cli <command> --help        Current arguments
shotstack-cli schema <command>        Full JSON input schema
shotstack-cli doctor [--network]      Local configuration / account read
shotstack-cli login                   Private token setup instructions
shotstack-cli --version               Package version

SHOTSTACK_API_KEY                     Private Shotstack x-api-key credential
SHOTSTACK_TOKEN_FILE                  Regular private token-only file, max 64 KB
SHOTSTACK_ACCOUNTS / _DEFAULT_ACCOUNT Named private credentials and stage/v1 environments
SHOTSTACK_ENV=v1                      stage or v1, selected per named account
SHOTSTACK_READ_ONLY=1                 Hide/refuse account mutations, rendering and generation
SHOTSTACK_ALLOW_DESTRUCTIVE=0         Block confirmed account mutations, rendering and generation
SHOTSTACK_AUDIT_LOG                   Private guard-decision log
SHOTSTACK_REQUEST_TIMEOUT_MS=30000; SHOTSTACK_MAX_RETRIES=2 (read-only GET 429 only)
SHOTSTACK_MIN_REQUEST_INTERVAL_MS=150 Conservative per-account process pacing

https://github.com/thenavidm/shotstack-mcp-cli
`;
async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const command = args[0];
  if (["--version", "-v"].includes(command ?? "")) {
    console.log(VERSION);
    return;
  }
  if (["--help", "-h", "help"].includes(command ?? "")) {
    process.stdout.write(HELP);
    return;
  }
  if (command === "doctor") {
    if (args.slice(1).some((a) => a !== "--network")) {
      process.exitCode = 2;
      console.error(JSON.stringify({ error: "doctor accepts only --network" }));
      return;
    }
    process.exitCode = await runDoctor(args.includes("--network"));
    return;
  }
  if (command === "login") {
    console.log("Create or retrieve the Shotstack API key in your own account at app.shotstack.io. Store it privately as SHOTSTACK_API_KEY or an owner-only token-only file through SHOTSTACK_TOKEN_FILE. login prints instructions; it does not create an account, save keys or perform OAuth. Never send gh auth tokens to the service. See INSTALL.md and doctor.");
    return;
  }
  if (args.length || basename(process.argv[1] ?? "").startsWith("shotstack-cli")) {
    process.exitCode = await runCli(args);
    return;
  }
  const server = buildServer();
  await server.connect(new StdioServerTransport());
  const close = async () => {
    await server.close();
    process.exit(0);
  };
  process.on("SIGTERM", () => void close());
  process.on("SIGINT", () => void close());
}
main().catch((e) => {
  console.error(JSON.stringify({ error: e.message }));
  process.exitCode = exitCodeFor(e.message);
});
