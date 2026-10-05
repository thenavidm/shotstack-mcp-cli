# Changelog

## 3.0.0, 2026-10-05

Built on [Slipway](https://github.com/thenavidm/slipway) 0.1.20. The 23 tools keep their names and arguments, and every difference below was measured against 2.0.2, the last version on npm, before release.

- **A person approves each confirmed operation over MCP.** All 11 still need confirmation. Claude Code (2.1.246 and later) shows its own prompt, and a client that can show forms asks with an approval form whose one box starts unticked. Approvals are signed, bound to the exact call and work once. Where a client can do neither, the model's `confirm: true` still counts, and `SHOTSTACK_CONFIRM=model` makes it enough everywhere. The refusal and the approval form both say what 2.0 said, that the call may affect account content, media, messages, workflows or billing, and the audit log records who approved each one.
- **`SHOTSTACK_ALLOW_DESTRUCTIVE=0` still refuses all 11**, confirmed or not, and `SHOTSTACK_READ_ONLY=1` still leaves only the 12 reads.
- **Shotstack's status picks the exit code.** A request Shotstack rejects (400 or 422) exits 2 instead of 5, and a removed resource (410) 3 instead of 5. 401 and 403 still exit 4, 404 3, 429 7, a server error 5, and an unknown profile or nothing configured 10. 1 now means an unexpected error.
- **`which <words>` finds a command**, and `agent-context` describes every command, flag and setting as JSON. In Codex 0.159.3, finding the command that renders a template and its flags took a median of 83,947 input tokens over the CLI instead of 105,563 (five runs each): every 2.0.2 run read the general help, the command list, the command's help and its schema. Four 3.0.0 runs asked `which render template`, whose answer carries the command's help, and read the schema next, one request fewer; the fifth asked `which renders a template`, which matched less clearly, and read the help as 2.0.2 did.
- **`install <client>`** adds the server to Claude Code, Codex, Claude Desktop, Cursor, VS Code or Gemini CLI in each one's own format, and **`shotstack-mcp --http`** serves the same tools over Streamable HTTP, on 127.0.0.1:8787 unless told otherwise.
- **A tool list half the size.** Shotstack's edit schema spells out its clip, track and asset types everywhere they appear; each is now written once and referred to, so the list is 103,921 o200k tokens instead of 195,801. With every tool loaded, Claude Code 2.1.286 spends 154,114 tokens a message on the list instead of 287,446.
- **Less work to start.** Each input and body schema now compiles on its first use rather than at load, and the entry turns on Node's compile cache. The server spends 270 ms of CPU before its first answer where 2.0.2 spent 760, and answers in 176 ms of wall time instead of 466 (median of 21 runs, taking turns on one Mac). npx installs 10 dependencies instead of 94. A test still compiles every schema.
- **`doctor --network` lists the available models**, as 2.0's did.
- **Docs.** README section 7 has the measured Claude Code and Codex costs, where 2.0 listed what to measure, and the exit codes include 1.

### Upgrading

Over MCP, expect an approval prompt or form before any confirmed operation; a headless agent that should run them with `confirm: true` alone needs `SHOTSTACK_CONFIRM=model`. A script that read exit 5 as a rejected request should read 2, and as a removed resource 3. An error is now one JSON object with `error`, Slipway's `code` (`usage`, `refused`, `auth`, `not_found`, `rate_limited`, `api`, `not_configured`) and a `hint`, plus Shotstack's `status` when it answered; 2.0.2 printed the tool's JSON inside the `error` string. Over MCP, an argument that fails the schema comes back as the MCP SDK's own message, "Input validation error: …", instead of JSON. With `SHOTSTACK_READ_ONLY=1`, a client that calls a hidden tool gets "tool not found" instead of a refusal naming `SHOTSTACK_READ_ONLY`, and that call is not in the audit log; the CLI still names the setting. The audit log's lines gain `confirmed_by`, and each allowed call is followed by a `done` or `failed` line. A script that pipes JSON-RPC into the server must keep stdin open until it reads the answer: the server now stops when its input ends, as the MCP stdio binding asks. `--http` refuses a page from another site unless `SHOTSTACK_HTTP_ALLOWED_ORIGINS` lists it. Some terminal screens grew: the general help by 57 tokens, for `which`, `install`, what each setting is for and the exit codes; the command list by 16; and a missing argument's error by 14, for its code and a hint. Over MCP, Codex now prints each destination `transfer_asset` can send a file to, with its options, where it printed 2.0.2's as `Array<unknown>`, while seven other tools print shorter, so a discovery task read a median of 47,033 input tokens instead of 46,793. `SKILL.md` is 59 tokens longer in Claude Code, because it says how approval works over MCP, and that exit 1 is an unexpected error and 2 also an unknown command or a hidden write.

## 2.0.2, 2026-10-04

- **`npx -y @thenavidm/shotstack-mcp-cli` always starts the MCP server.** npx starts whichever binary the npm registry lists first when they share one file, and the registry does not keep the published order, so an MCP client set up with this README's install line could get `shotstack-cli` and its command list instead of a server. A third binary named after the package now always starts the server, and npx picks it by name.

Use the native terminal capture at 1040 source pixels with lossless GIF optimization, displayed at 520 pixels, matching the Bluesky/Substack reference. Original assets remain available.

## 2.0.1 — 2026-10-03

- Correct author-link tracking to this Shotstack repository and keep package, desktop and setup versions aligned.


## 2.0.0 - 2026-10-02

- Refresh current Edit/Serve/Ingest schemas: 22 API operations and local account labels, 23 shared MCP tools/CLI commands.
- Add the established CLI bridge, explicit confirmation for 11 mutations, 12 reads and enforced direct-call read-only/disabled-operation policies.
- Add private named account keys/files with strict stage/v1 routing, fixed API origin, no redirects and no mutation retries.
- Keep signed upload credentials out of model output through exclusive private files. No local byte upload is claimed.
- Validate native nested bodies, preserve supported generation idempotency headers and current models, infer missing route parameters and normalize the reviewed vendor Asset union.
- Add complete house repo/client/argument/workflow/FAQ docs, desktop package, schema regeneration and release checks. Preserve AGPL and private legacy history.

| Component | Version or baseline |
| --- | --- |
| Owned package/desktop | 2.0.0 |
| API schemas | OpenAPI 3.0.1; document v1; checked 2026-10-02 |
| Tools | 23 shared; 12 reads; 11 confirmed operations |
| Official CLI release inspected | 0.8.4 |
| Official local MCP inspected | 1.1.0 (self-reported server version 1.0.0) |
| Node baseline | 22+; CI Node 22/24 on Linux/macOS/Windows |
| MCP TypeScript SDK | 1.32.0 |
| Ajv / ajv-formats | 8.20.0 / 3.0.1 |
| TypeScript / Vitest / Vite | 7.0.2 / 5.0.3 / 8.3.2 |
| MCPB packager | 2.1.2; development only |

The lockfile records exact dependencies. The dated [CHANGELOG.md](CHANGELOG.md) records user-facing changes. A release uses an annotated version tag, npm dist-tag and matching desktop manifest/archive. Upstream schema/model changes require review before a new release.

Legacy callers retain SHOTSTACK_API_KEY and stage/v1 semantics. Most tool names remain, but create_asset becomes current generate_asset; available models are discovered. Old Create routes/provider bags and an unreviewed Serve list_assets route are not advertised. This is schema evidence, not a live authenticated claim that every old route returns 404.

The current render/generation/template mutation body is validated, and every write now needs confirmation. get_render/get_template and other path reads need their exact id. Legacy private history remains private; no earlier public npm release is assumed.

## 1.0.0 - legacy source

Legacy MCP-only Edit/Serve/Ingest/Create declarations. Records source history, not a verified prior public npm release.
