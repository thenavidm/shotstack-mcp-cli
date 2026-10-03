# Changelog

## Unreleased

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
