# Shotstack comparisons

| Offering | Surface | Capabilities and tradeoff |
| --- | --- | --- |
| [Official CLI](https://shotstack.io/docs/guide/agents/cli/) | @shotstack/cli 0.8.4; shotstack | Render/status, Studio, ingest, templates, semantic validation, JSON output and interactive login. The installed release differs from newer same-version source. |
| [Official hosted MCP](https://shotstack.io/docs/guide/agents/mcp-server/) | https://mcp.shotstack.io/ | Provider-hosted OAuth/API-key setup, inline Studio review/render, guide and reusable-template workflows. Client approvals remain relevant. |
| Official local MCP | @shotstack/shotstack-mcp-server 1.1.0 | The checksum-reviewed published stdio package includes Studio and agent-guide tools as well as rendering/templates. Local MCP is already available officially. |
| This owned package | Shared CLI, local MCP, .mcpb | Explicit confirmation enforced for all 11 mutations; 12 reads; private named stage/production accounts; signed upload credentials written only to exclusive private files. |
| [Official SDKs](https://github.com/shotstack) | Node, Python, PHP and other libraries | Application integration and custom orchestration; do not confuse developer SDKs with an agent task CLI. |
| [Shottower](https://github.com/DblK/shottower) | Community self-hosted backend | A narrower backend implementation with different capacity/maintenance responsibilities; it is not the Shotstack hosted account or an equivalent MCP/CLI. |

Checked October 2, 2026. The actual official CLI 0.8.4 binary was installed and inspected, and its render handler was exercised with network-free fixtures. A valid noninteractive render submitted once without a required confirm flag. Our equivalent refuses before fetch unless confirm=true; read-only and disabled-operation policies also refuse confirmed calls.

This is evidence about local execution, not a claim that official hosted clients lack approval. Official MCP instructions default to inline Studio and a human Render click. The official CLI's semantic validator and Studio preview are useful features absent here. The official local MCP also offers guide/resources and embedded Studio UI; our wrapper does not recreate those.

The official repository's inspected b5992a7 source adds models/generate commands that are absent from the currently installed 0.8.4 binary. Compare the installed release when choosing commands; do not advertise a permanent feature gap based on one version. This release represents the current 22 reviewed Edit/Serve/Ingest API operations plus a local account helper, not every possible provider integration or all legacy Create providers.

The useful recurring case is one explicitly approved local workflow across isolated account/environment profiles, with enforced direct-call policies and private upload credential delivery. Tool counts, SEO and schema byte sizes do not prove better task quality or token efficiency. Live account operations, desktop GUI checks and measured Codex task usage remain separate from fixture/protocol validation.


MCP and CLI use the same SDK server, input schemas, handlers and confirmation guard. CLI commands use the SDK's in-memory transport; there is no second API implementation. Choose shell calls for scripts and the local MCP for a stdio AI client.

| Measurement | Required evidence |
| --- | --- |
| Eager MCP loading | Actual tool schemas and instructions sent to the model |
| Deferred discovery | Actual selected schemas and lookup overhead |
| Skill read once | Complete SKILL.md and command discovery |
| Recurring skill listing | The installed skill description |
| Equivalent successful task | Help/schema, reasoning, requests, output, retries and achieved result |

Fresh Codex measurements are pending. Record model/client/package versions, date, loading settings, input/output usage, latency and equivalent results. Compare an existing-render status task and an approved template/render task with identical account environment and response fields.

Do not estimate tokens from characters, borrow another package's results, infer efficiency from 23 tools or say CLI has zero cost. Local --select trims output after receipt; it does not change provider response size or quota. Provider credits remain separate from model tokens. Claude Code measurements are deferred at the current Codex priority.
