<img src="https://cdn.navid.media/shared/tool-logos/shotstack.png" alt="Shotstack" width="88">

# Shotstack MCP Server & CLI

[![npm](https://img.shields.io/npm/v/@thenavidm/shotstack-mcp-cli?color=orange&label=npm)](https://www.npmjs.com/package/@thenavidm/shotstack-mcp-cli)
[![CI](https://github.com/thenavidm/shotstack-mcp-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/thenavidm/shotstack-mcp-cli/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/License-AGPL--3.0-green)](./LICENSE)
[![YouTube](https://img.shields.io/badge/YouTube-@thenavidm-red?logo=youtube&logoColor=white)](https://youtube.com/@thenavidm?sub_confirmation=1)
[![X](https://img.shields.io/badge/X-@thenavidm-black?logo=x)](https://x.com/thenavidm)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-thenavidm-0A66C2?logo=linkedin&logoColor=white)](https://linkedin.com/in/thenavidm)

Shotstack MCP server and CLI for Codex and AI agents. **23 tools** for current rendering, templates, generation models, Serve and Ingest, with private accounts and explicit mutation approval. One shared implementation supplies both binaries and a desktop bundle.

Built and maintained by [Navid Moazzez](https://navid.me?utm_source=github&utm_medium=referral&utm_campaign=shotstack-mcp-cli&utm_content=readme). The complete guide is on [navid.me](https://navid.me/mcp-servers/shotstack).

<img src="https://cdn.navid.me/repos/shotstack-mcp-cli.gif?v=2.0.0" alt="Illustrated workflow in the house terminal component" width="520">

The terminal illustrates real command names and approval flow. It is not a recording of a paid provider render. Shotstack already has official CLI/local/hosted MCP products; their Studio and semantic validation are compared below.

Requires Node 22+ and eligible Shotstack API access for account operations. **Validation:** fixture tests, schema validation and protocol/artifact discovery are separate from provider-account rendering, desktop GUI outcomes and fresh measured task/token evidence. Pending evidence is recorded, without invented success rates or efficiency claims.

## Two ways to use it

### Command line

```bash
npm install -g @thenavidm/shotstack-mcp-cli@latest
shotstack-cli
shotstack-cli list-models --agent
shotstack-cli schema render
shotstack-cli render --payload-file /absolute/private/approved-edit.json --account sandbox --confirm --agent
```

--confirm authorizes the specific requested operation. --agent and --yes do not supply consent or a provider credit cap.

### MCP server, for your AI app

```bash
codex mcp add shotstack -- npx -y @thenavidm/shotstack-mcp-cli@latest
```

Configure private credentials/environment first. Ask: “Inspect this existing render and return its status; do not submit another render.” Client and OS details are in [INSTALL.md](INSTALL.md).

### Which one

| Where you work | Surface |
| --- | --- |
| Codex or an agent with shell access | Local MCP, shared CLI or both |
| Desktop chat | Compatible local MCP or .mcpb |
| Scripts/CI | CLI or an MCP client |
| Remote-URL-only chat | Official provider-hosted MCP |

## Features

| Capability | CLI command | MCP tool |
| --- | --- | --- |
| Render and status | render / get-render | render / get_render |
| Templates | create-template / list-templates / render-template | create_template / list_templates / render_template |
| Generation models and jobs | list-models / generate-asset / get-generated-asset | list_models / generate_asset / get_generated_asset |
| Hosted assets | get-asset / transfer-asset | get_asset / transfer_asset |
| Ingest sources | ingest-source / list-sources / get-source | ingest_source / list_sources / get_source |
| Private upload credential | create-upload-url-file | create_upload_url_file |
| Account/environment labels | list-accounts | list_accounts |
| Configuration checks | doctor / login | CLI utilities |

## Contents

| Number | Section | What it covers |
| --- | --- | --- |
| 1 | [What you can ask it](#1-what-you-can-ask-it) | Practical tasks |
| 2 | [Quick install](#2-quick-install) | MCP/CLI/desktop |
| 3 | [Set up Shotstack access](#3-set-up-shotstack-access) | Keys, environments, credits |
| 4 | [Connect your client](#4-connect-your-client) | All client/OS routes |
| 5 | [Check it works](#5-check-it-works) | Doctor and first read |
| 6 | [Output, flags and exit codes](#6-output-flags-and-exit-codes) | Flags and scripting |
| 7 | [MCP or CLI and token cost](#7-mcp-or-cli-and-token-cost) | Actual measurement method |
| 8 | [Every tool and argument](#8-every-tool-and-argument) | Every route/argument |
| 9 | [Render, template, generation and media workflows](#9-render-template-generation-and-media-workflows) | Native workflow inputs |
| 10 | [Jobs, pagination and private files](#10-jobs-pagination-and-private-files) | Status and private credential files |
| 11 | [Several private accounts](#11-several-private-accounts) | Isolated named profiles |
| 12 | [Writing safely](#12-writing-safely) | Approval and direct-call policies |
| 13 | [How it works](#13-how-it-works) | Shared architecture and sync |
| 14 | [Your data](#14-your-data) | Credentials and provider processing |
| 15 | [Environment variables](#15-environment-variables) | Private settings and bounds |
| 16 | [Updates and removal](#16-updates-and-removal) | Upgrade/revoke/uninstall |
| 17 | [Troubleshooting](#17-troubleshooting) | Errors and recovery |
| 18 | [API coverage and comparisons](#18-api-coverage-and-comparisons) | Official and community tradeoffs |
| 19 | [Versions](#19-versions) | Release history and migration |
| 20 | [FAQ](#20-faq) | Accordion answers |

## 1. What you can ask it

- Inspect my available generation models before choosing a supported asset.
- Read this existing render's status; do not submit a duplicate.
- Prepare a reviewed timeline and submit only the approved sandbox render.
- Save this template, then render it with the merge values I selected.
- Ingest this selected public source URL after confirmation.
- Create an upload URL, keeping its temporary credential in my private file.
- Inspect a hosted asset and confirm its exact ID before deletion.

Actual discovery supplies **23 tools: 12 reads and 11 confirmed account operations**. The same handlers serve MCP and CLI. Read-only discovery and direct-call refusal agree. These checks do not establish successful provider rendering or GUI installation.

## 2. Quick install

```bash
npm install -g @thenavidm/shotstack-mcp-cli@latest
shotstack-cli --version
shotstack-cli login
shotstack-cli doctor
shotstack-cli tools
```

Node 22+ is required for manual installation. The [shotstack-2.0.0.mcpb archive](https://github.com/thenavidm/shotstack-mcp-cli/releases/download/v2.0.0/shotstack-2.0.0.mcpb) bundles production dependencies for a compatible desktop host. Complete setup is in [INSTALL.md](INSTALL.md).

After configuring private local credentials:

```bash
codex mcp add shotstack -- npx -y @thenavidm/shotstack-mcp-cli@latest
codex mcp list
```

## 3. Set up Shotstack access

### Private API keys and environments

1. Sign in to your intended account at [app.shotstack.io](https://app.shotstack.io), open the account menu and choose API Keys.
2. Select the sandbox or production key for the task. Set SHOTSTACK_ENV=stage or v1 to match. Production is the default; a sandbox key does not turn production URLs into sandbox URLs.
3. Save the key in an owner-only token file outside repositories. Set SHOTSTACK_TOKEN_FILE to its absolute path. SHOTSTACK_API_KEY in private local settings is the alternative.
4. Run shotstack-cli doctor, then doctor --network. The network check requests available generation models and does not print their content.
5. Read the selected schema, review the exact edit/account action and confirm only that operation. Do not submit a production render merely to test installation.

Requests use x-api-key on the fixed api.shotstack.io origin, with /edit, /serve or /ingest and the selected /stage or /v1 prefix. This package does not accept arbitrary API hosts, forward keys through redirects or perform OAuth. login prints setup instructions; it neither saves keys nor creates accounts.

On macOS/Linux, use a private directory (0700) and regular token-only file (0600). Windows users must restrict the file's ACL to their user; POSIX mode checking does not establish Windows ACL protection. Token files cannot be symlinks or exceed 64 KB. They override environment keys and are cached until restart. GUI settings may differ from your shell environment.

### Access, plans, credits and limits

The wrapper is free AGPL software. Shotstack access, rendering, generated assets, storage and serving follow the provider's account terms. No account role or OAuth scope bypass is supplied. [Request API keys](https://shotstack.io/docs/guide/getting-started/request-api-keys/) and check your dashboard's balance and current plan before approving charges.

The provider currently documents ten new-account credits valid for 30 days, with no credit card required. Sandbox renders are watermarked, limited to ten minutes and require at least one credit in the balance. AI generation in sandbox still consumes credits. Production rendering is billed by output duration; this wrapper is not a spending or money cap.

[Rate limits](https://shotstack.io/docs/guide/architecting-an-application/limitations/) use a fixed 60-second window per API key, across all plans. Current production/sandbox request limits are Edit 300/150, Serve 600/300 and Ingest 300/120. Wait for the window reset after 429; do not immediately repeat a render.

The local default 150 ms pacing is per account label/process, not a provider quota reservation. Shared keys in several processes still share quota. Mutations never retry automatically. GET 429 retries require an explicit Retry-After of at most ten seconds; missing/longer delays return exit 7. The default maximum is two retries and configurable upper bound five.

Current source limits are 5 GB per file and 10 GB combined source/output disk usage. Local request JSON has a separate 5 MiB cap and responses a 10 MiB cap. The wrapper does not upload local media bytes or automatically collect all pages. Check [credit consumption](https://help.shotstack.io/en/articles/16345929-understanding-shotstack-credit-consumption) for the selected current model and hosting charges.

### Revoke and rotate

Rotate or revoke the intended key through your account's API Keys controls, update private client settings, and restart. Remove the client entry when disconnecting. npm removal does not revoke the provider key, undo renders, remove hosted assets or delete private output files. Keep account records and signed URLs out of GitHub issues and public logs.

## 4. Connect your client

[INSTALL.md](INSTALL.md) provides Codex-first configuration plus optional Claude Code, Claude Desktop archive/manual setup, Cursor, VS Code/Copilot, Windsurf, Zed, Gemini CLI, Cline and Docker. Use Node 22+ on macOS, Windows or Linux; GUI settings and remote development environments need their own accessible private credentials.

Manual MCP launches npx with arguments -y and @thenavidm/shotstack-mcp-cli@latest over stdio. This package has no public HTTP relay. Remote-only clients can use the official https://mcp.shotstack.io/ service with its supported OAuth/API-key setup.

npm installation ships SKILL.md but does not register an agent skill. Add the shipped file through the client's supported skill location. Client approvals and confirm=true are separate; the guard requires the exact requested mutation, not consent inferred from returned content.

## 5. Check it works

```bash
shotstack-cli --version
shotstack-cli doctor
shotstack-cli doctor --network
shotstack-cli list-accounts --agent
shotstack-cli list-models --agent
```

Help, schemas, discovery and account labels work without a provider key. Network doctor requests GET /edit/{environment}/models without returning its content. Success establishes that account request, not every rendering model or endpoint. Full discovery exposes 23 tools; read-only exposes 12.

For an existing selected render, use get-render --id REAL_RENDER_ID. A job status read should not create a new render. Missing credentials exits 10; invalid input and refused writes exit 2.

## 6. Output, flags and exit codes

Tool results go to stdout. Errors are JSON on stderr. Reads and generation return structured JSON, so `--select` can retain nested fields.

```bash
shotstack-cli render --help
shotstack-cli schema render
shotstack-cli get-render --id REAL_RENDER_ID --agent --select response.status,response.url
```

| Flag | What it does |
| --- | --- |
| `--json` | JSON output |
| `--compact` | Single-line JSON |
| `--agent` | JSON, compact, no input and no color |
| `--select a,b.c` | Keep selected fields; dotted paths descend and arrays are traversed |
| `--confirm` | Confirm the requested paid media operation |
| `--no-input`, `--no-color`, `--yes` | Automation switches; none overrides the spending guard |
| `--wait=false` | Return an accepted job instead of polling |
| `--download` | Save completed media locally; requires waiting for completion |

Global output flags apply to tool commands. `doctor` has its own `--network` option and returns a JSON diagnostic.

| Exit code | Meaning | What a script should do |
| --- | --- | --- |
| 0 | Success | Read stdout |
| 2 | Usage, invalid input or a refused write | Fix the input or confirm only the requested action |
| 3 | Job or local upload file not found | Check the ID/path |
| 4 | Authentication or entitlement rejected | Check private credential settings and permissions |
| 5 | API, network or polling failure | Inspect an accepted job before another paid submission |
| 7 | Rate limited | Wait; do not loop over paid submissions |
| 10 | Credentials not configured | Complete local setup |

The underscore spelling also works. `generate_asset` and `generate-asset` call the same tool. Nested objects use quoted JSON. Arrays of objects use repeated flags, one JSON object at a time.

## 7. MCP or CLI and token cost

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

## 8. Every tool and argument

Every route and argument below comes from actual stdio discovery and reviewed current upstream schemas. Read exact nested definitions with shotstack-cli schema COMMAND before constructing a body. Native body names, arrays, unions and enums remain exact.

| Tool | Route | Mode |
| --- | --- | --- |
| `render` | `POST /edit/{environment}/render` | Confirm requested operation |
| `get_render` | `GET /edit/{environment}/render/{id}` | Read |
| `create_template` | `POST /edit/{environment}/templates` | Confirm requested operation |
| `list_templates` | `GET /edit/{environment}/templates` | Read |
| `get_template` | `GET /edit/{environment}/templates/{id}` | Read |
| `update_template` | `PUT /edit/{environment}/templates/{id}` | Confirm requested operation |
| `delete_template` | `DELETE /edit/{environment}/templates/{id}` | Confirm requested operation |
| `render_template` | `POST /edit/{environment}/templates/render` | Confirm requested operation |
| `probe_media` | `GET /edit/{environment}/probe/{url}` | Read |
| `generate_asset` | `POST /edit/{environment}/generate` | Confirm requested operation |
| `get_generated_asset` | `GET /edit/{environment}/generate/{id}` | Read |
| `list_models` | `GET /edit/{environment}/models` | Read |
| `get_model` | `GET /edit/{environment}/models/{id}` | Read |
| `get_asset` | `GET /serve/{environment}/assets/{id}` | Read |
| `delete_asset` | `DELETE /serve/{environment}/assets/{id}` | Confirm requested operation |
| `get_asset_by_render_id` | `GET /serve/{environment}/assets/render/{id}` | Read |
| `transfer_asset` | `POST /serve/{environment}/assets` | Confirm requested operation |
| `ingest_source` | `POST /ingest/{environment}/sources` | Confirm requested operation |
| `list_sources` | `GET /ingest/{environment}/sources` | Read |
| `get_source` | `GET /ingest/{environment}/sources/{id}` | Read |
| `delete_source` | `DELETE /ingest/{environment}/sources/{id}` | Confirm requested operation |
| `create_upload_url_file` | `POST /ingest/{environment}/upload` | Confirm requested operation |
| `list_accounts` | Local, no network | Read |

#### render

`shotstack-cli render`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `timeline` | No; body and guard rules apply | Timeline | See the full input schema. |
| `output` | No; body and guard rules apply | Output | See the full input schema. |
| `merge` | No; body and guard rules apply | array | An array of key/value pairs that provides an easy way to create templates with placeholders. The placeholders can be used to find and replace keys with values. For example you can search for the placeholder `{{NAME}}` and replace it with the value `Jane`. Items: MergeField. |
| `callback` | No; body and guard rules apply | string | An optional webhook callback URL used to receive status notifications when a render completes or fails. Notifications are also sent when a rendered video is sent to an output  [destination](https://shotstack.io/docs/guide/serving-assets/destinations/). See [webhooks](https://shotstack.io/docs/guide/architecting-an-application/webhooks/) for more details. |
| `disk` | No; body and guard rules apply | string | **Notice: This option is now deprecated and will be removed. Disk types are handled automatically. Setting a disk type has no effect.**  The disk type to use for storing footage and assets for each render.    `local` - optimized for high speed rendering with up to 512MB storage   `mount` - optimized for larger file sizes and longer videos with 5GB for source footage and 512MB for output render Values: `local`, `mount`. |
| `instance` | No; body and guard rules apply | string | The render instance type to use for processing the edit.    `s1` - standard instance (default)   `s2` - standard instance with more resources   `a1` - accelerated instance for faster rendering Values: `s1`, `s2`, `a1`. default: `s1`. |
| `account` | No; body and guard rules apply | string | Named private Shotstack account; selects private credentials and stage/v1 environment. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for this exact requested render, generation, mutation, upload URL or deletion. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |

A body is required. Use native body flags or one complete payload/payload_file; these cannot be mixed. Required body fields: `timeline`, `output`.

#### get_render

`shotstack-cli get-render`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | string | Exact resource ID from the selected account. minLength: `1`. |
| `account` | No; body and guard rules apply | string | Named private Shotstack account; selects private credentials and stage/v1 environment. |

#### create_template

`shotstack-cli create-template`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `name` | No; body and guard rules apply | string | The template name |
| `template` | No; body and guard rules apply | Edit | See the full input schema. |
| `account` | No; body and guard rules apply | string | Named private Shotstack account; selects private credentials and stage/v1 environment. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for this exact requested render, generation, mutation, upload URL or deletion. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |

A body is required. Use native body flags or one complete payload/payload_file; these cannot be mixed. Required body fields: `name`.

#### list_templates

`shotstack-cli list-templates`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `account` | No; body and guard rules apply | string | Named private Shotstack account; selects private credentials and stage/v1 environment. |

#### get_template

`shotstack-cli get-template`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | string | Exact resource ID from the selected account. minLength: `1`. |
| `account` | No; body and guard rules apply | string | Named private Shotstack account; selects private credentials and stage/v1 environment. |

#### update_template

`shotstack-cli update-template`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | string | Exact resource ID from the selected account. minLength: `1`. |
| `name` | No; body and guard rules apply | string | The template name |
| `template` | No; body and guard rules apply | Edit | See the full input schema. |
| `account` | No; body and guard rules apply | string | Named private Shotstack account; selects private credentials and stage/v1 environment. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for this exact requested render, generation, mutation, upload URL or deletion. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |

A body is required. Use native body flags or one complete payload/payload_file; these cannot be mixed. Required body fields: `name`.

#### delete_template

`shotstack-cli delete-template`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | string | Exact resource ID from the selected account. minLength: `1`. |
| `account` | No; body and guard rules apply | string | Named private Shotstack account; selects private credentials and stage/v1 environment. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for this exact requested render, generation, mutation, upload URL or deletion. |

#### render_template

`shotstack-cli render-template`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body and guard rules apply | string | The id of the template to render in UUID format. |
| `merge` | No; body and guard rules apply | array | An array of key/value pairs that provides an easy way to create templates with placeholders. The placeholders can be used to find and replace keys with values. For example you can search for the placeholder `{{NAME}}` and replace it with the value `Jane`. Items: MergeField. |
| `account` | No; body and guard rules apply | string | Named private Shotstack account; selects private credentials and stage/v1 environment. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for this exact requested render, generation, mutation, upload URL or deletion. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |

A body is required. Use native body flags or one complete payload/payload_file; these cannot be mixed. Required body fields: `id`.

#### probe_media

`shotstack-cli probe-media`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | Yes | string | Public HTTPS URL of the selected media file. minLength: `1`. format: `uri`. pattern: `^https://`. |
| `account` | No; body and guard rules apply | string | Named private Shotstack account; selects private credentials and stage/v1 environment. |

#### generate_asset

`shotstack-cli generate-asset`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `idempotency_key` | No; body and guard rules apply | string | A key that makes this request its own generation. Retrying with the same key returns the job it first created instead of generating and billing again, and a new key generates afresh even when the asset matches an earlier one. Without a key, identical assets share one cached result. For 24 hours a key reused for a different asset is rejected; after that it returns its first result. |
| `asset` | No; body and guard rules apply | GenerationAsset | See the full input schema. |
| `length` | No; body and guard rules apply | number | The length, in seconds, of the clip the asset fills. A model that generates to a duration takes it from this value in place of its own duration option. Other models ignore it. |
| `account` | No; body and guard rules apply | string | Named private Shotstack account; selects private credentials and stage/v1 environment. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for this exact requested render, generation, mutation, upload URL or deletion. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |

A body is required. Use native body flags or one complete payload/payload_file; these cannot be mixed. Required body fields: `asset`.

#### get_generated_asset

`shotstack-cli get-generated-asset`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | string | Exact resource ID from the selected account. minLength: `1`. |
| `account` | No; body and guard rules apply | string | Named private Shotstack account; selects private credentials and stage/v1 environment. |

#### list_models

`shotstack-cli list-models`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `account` | No; body and guard rules apply | string | Named private Shotstack account; selects private credentials and stage/v1 environment. |

#### get_model

`shotstack-cli get-model`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | string | Exact resource ID from the selected account. minLength: `1`. |
| `account` | No; body and guard rules apply | string | Named private Shotstack account; selects private credentials and stage/v1 environment. |

#### get_asset

`shotstack-cli get-asset`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | string | Exact resource ID from the selected account. minLength: `1`. |
| `account` | No; body and guard rules apply | string | Named private Shotstack account; selects private credentials and stage/v1 environment. |

#### delete_asset

`shotstack-cli delete-asset`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | string | Exact resource ID from the selected account. minLength: `1`. |
| `account` | No; body and guard rules apply | string | Named private Shotstack account; selects private credentials and stage/v1 environment. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for this exact requested render, generation, mutation, upload URL or deletion. |

#### get_asset_by_render_id

`shotstack-cli get-asset-by-render-id`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | string | Exact resource ID from the selected account. minLength: `1`. |
| `account` | No; body and guard rules apply | string | Named private Shotstack account; selects private credentials and stage/v1 environment. |

#### transfer_asset

`shotstack-cli transfer-asset`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | No; body and guard rules apply | string | The file URL to fetch and transfer. |
| `id` | No; body and guard rules apply | string | An identifier for the asset which must be provided by the client. The identifier does not need to be unique. |
| `destinations` | No; body and guard rules apply | array | Specify the storage locations and hosting services to send the file to. Items: Destinations. |
| `account` | No; body and guard rules apply | string | Named private Shotstack account; selects private credentials and stage/v1 environment. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for this exact requested render, generation, mutation, upload URL or deletion. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |

A body is required. Use native body flags or one complete payload/payload_file; these cannot be mixed. Required body fields: `url`, `id`, `destinations`.

#### ingest_source

`shotstack-cli ingest-source`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `url` | No; body and guard rules apply | string | The URL of the file to be ingested. The URL must be publicly accessible or include credentials. |
| `outputs` | No; body and guard rules apply | Outputs | See the full input schema. |
| `destinations` | No; body and guard rules apply | Destinations | See the full input schema. |
| `callback` | No; body and guard rules apply | string | An optional webhook callback URL used to receive status notifications when sources are uploaded and renditions processed. |
| `account` | No; body and guard rules apply | string | Named private Shotstack account; selects private credentials and stage/v1 environment. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for this exact requested render, generation, mutation, upload URL or deletion. |
| `payload` | No; body and guard rules apply | object | Complete JSON request body instead of body flags. Preserves current endpoint fields and values. |
| `payload_file` | No; body and guard rules apply | string | Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload. minLength: `1`. |

A body is required. Use native body flags or one complete payload/payload_file; these cannot be mixed. Required body fields: .

#### list_sources

`shotstack-cli list-sources`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `account` | No; body and guard rules apply | string | Named private Shotstack account; selects private credentials and stage/v1 environment. |

#### get_source

`shotstack-cli get-source`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | string | Exact resource ID from the selected account. minLength: `1`. |
| `account` | No; body and guard rules apply | string | Named private Shotstack account; selects private credentials and stage/v1 environment. |

#### delete_source

`shotstack-cli delete-source`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | string | Exact resource ID from the selected account. minLength: `1`. |
| `account` | No; body and guard rules apply | string | Named private Shotstack account; selects private credentials and stage/v1 environment. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for this exact requested render, generation, mutation, upload URL or deletion. |

#### create_upload_url_file

`shotstack-cli create-upload-url-file`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `account` | No; body and guard rules apply | string | Named private Shotstack account; selects private credentials and stage/v1 environment. |
| `confirm` | No; body and guard rules apply | boolean | Must be true for this exact requested render, generation, mutation, upload URL or deletion. |
| `secret_result_file` | Yes | string | New absolute JSON file in a private owner-only directory. Signed upload URL stays out of model output; no overwrite. minLength: `1`. |

The output file must be new and absolute, in a private directory. It is reserved exclusively before the API call; the signed URL is never returned in model output. This command creates a temporary upload credential; it does not upload file bytes.

#### list_accounts

`shotstack-cli list-accounts`

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| None | No | None | No arguments |

### Nested request definitions

The following definitions are shared by the request schemas. oneOf selects one validated asset branch; $ref names point to the definition heading here. Required fields are specific to the selected branch. Any deeper inline shape remains available through schema COMMAND.

##### Timeline

A timeline represents the contents of a video edit over time, an audio edit over time, in seconds, or an image layout. A timeline consists of layers called tracks. Tracks are composed of titles, images, audio, html or video segments referred to as clips which are placed along the track at specific starting point and lasting for a specific amount of time.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `soundtrack` | No; body and guard rules apply | Soundtrack | A music or audio soundtrack file in mp3 format. Deprecated - use an [AudioAsset](#audioasset) clip on its own track instead. |
| `background` | No; body and guard rules apply | string | A hexadecimal value for the timeline background colour. Defaults to #000000 (black). |
| `fonts` | No; body and guard rules apply | array | An array of custom fonts to be downloaded for use by the HTML assets. Items: Font. |
| `tracks` | Yes | array | A timeline consists of an array of tracks, each track containing clips. Tracks are layered on top of each other in the same order they are added to the array with the top most track layered over the top of those below it. Ensure that a track containing titles is the top most track so that it is displayed above videos and images. minItems: `1`. Items: Track. |
| `cache` | No; body and guard rules apply | boolean | Disable the caching of ingested source footage and assets. See  [caching](https://shotstack.io/docs/guide/architecting-an-application/caching/) for more details. |

##### Soundtrack

**Notice: The Soundtrack is deprecated, use an [AudioAsset](#audioasset) clip on its own track instead.** This type continues to function; no behaviour change for existing integrations. A music or audio file in mp3 format that plays for the duration of the rendered video or the length of the audio file, which ever is shortest.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `src` | Yes | string | The URL of the mp3 audio file. The URL must be publicly accessible or include credentials. minLength: `1`. pattern: `\S`. |
| `effect` | No; body and guard rules apply | string | The effect to apply to the audio file    `fadeIn` - fade volume in only   `fadeOut` - fade volume out only   `fadeInFadeOut` - fade volume in and out Values: `fadeIn`, `fadeOut`, `fadeInFadeOut`. |
| `volume` | No; body and guard rules apply | number | Set the volume for the soundtrack between 0 and 1 where 0 is muted and 1 is full volume (defaults to 1). |

##### Font

Download a custom font to use with the HTML asset type, using the font name in the CSS or font tag. See our [custom fonts](https://shotstack.io/learn/html-custom-fonts/) getting started guide for more details.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `src` | Yes | string | The URL of the font file. The URL must be publicly accessible or include credentials. |

##### Track

A track contains an array of clips. Tracks are layered on top of each other in the order in the array. The top most track will render on top of those below it.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `clips` | Yes | array | An array of Clips comprising of TitleClip, ImageClip or VideoClip. minItems: `1`. Items: Clip. |

##### Clip

A clip is a container for a specific type of asset, i.e. a title, image, video, audio or html. You use a Clip to define when an asset will display on the timeline, how long it will play for and transitions, filters and effects to apply to it.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body and guard rules apply | string | Optional client-generated identifier. Used by client SDKs (e.g. the Shotstack Studio SDK) to reference a clip across edits without relying on its position in the timeline. The render API does not use this field and it does not appear in render output. |
| `asset` | Yes | Asset | See the full input schema. |
| `start` | Yes | Union | The start position of the Clip on the timeline. |
| `length` | Yes | Union | The duration the Clip should play for. |
| `fit` | No; body and guard rules apply | string | Set how the asset should be scaled to fit the viewport using one of the following options:         `crop` (default) - scale the asset to fill the viewport while maintaining the aspect ratio. The asset will be cropped if it exceeds the bounds of the viewport.     `cover` - stretch the asset to fill the viewport without maintaining the aspect ratio.     `contain` - fit the entire asset within the viewport while maintaining the original aspect ratio.     `none` - preserves the original asset dimensions and does not apply any scaling. Values: `cover`, `contain`, `crop`, `none`. |
| `scale` | No; body and guard rules apply | Union | Scale the asset to a fraction of the viewport size - i.e. setting the scale to 0.5 will scale asset to half the size of the viewport. This is useful for picture-in-picture video and scaling images such as logos and watermarks. Use a number or an array of [Tween](https://shotstack.io/docs/api/#tocs_tween) objects to create a custom animation. |
| `width` | No; body and guard rules apply | number | Set the width of the clip bounding box in pixels. This constrains the width of the clip, overriding the default behavior where clips fill the viewport width. minimum: `1`. maximum: `3840`. format: `float`. |
| `height` | No; body and guard rules apply | number | Set the height of the clip bounding box in pixels. This constrains the height of the clip, overriding the default behavior where clips fill the viewport height. minimum: `1`. maximum: `2160`. format: `float`. |
| `position` | No; body and guard rules apply | string | Place the asset in one of nine predefined positions of the viewport. This is most effective for when the asset is scaled and you want to position the element to a specific position.    `top` - top (center)   `topRight` - top right   `right` - right (center)   `bottomRight` - bottom right   `bottom` - bottom (center)   `bottomLeft` - bottom left   `left` - left (center)   `topLeft` - top left   `center` - center Values: `top`, `topRight`, `right`, `bottomRight`, `bottom`, `bottomLeft`, `left`, `topLeft`, `center`. |
| `offset` | No; body and guard rules apply | Offset | Offset the location of the asset relative to its position on the viewport. The offset distance is relative to the width of the viewport - for example an x offset of 0.5 will move the asset half the viewport width to the right. |
| `transition` | No; body and guard rules apply | Transition | See the full input schema. |
| `effect` | No; body and guard rules apply | string | A motion effect to apply to the Clip.    `zoomIn` - slow zoom in   `zoomOut` - slow zoom out   `slideLeft` - slow slide (pan) left   `slideRight` - slow slide (pan) right   `slideUp` - slow slide (pan) up   `slideDown` - slow slide (pan) down  The motion effect speed can also be controlled by appending `Fast` or `Slow` to the effect, e.g. `zoomInFast` or `slideRightSlow`. Values: `zoomIn`, `zoomInSlow`, `zoomInFast`, `zoomOut`, `zoomOutSlow`, `zoomOutFast`, `slideLeft`, `slideLeftSlow`, `slideLeftFast`, `slideRight`, `slideRightSlow`, `slideRightFast`, `slideUp`, `slideUpSlow`, `slideUpFast`, `slideDown`, `slideDownSlow`, `slideDownFast`. |
| `filter` | No; body and guard rules apply | string | A filter effect to apply to the Clip.    `none` - no filter applied   `blur` - blur the scene   `boost` - boost contrast and saturation   `contrast` - increase contrast   `darken` - darken the scene   `greyscale` - remove colour   `lighten` - lighten the scene   `muted` - reduce saturation and contrast   `negative` - negative colors Values: `none`, `blur`, `boost`, `contrast`, `darken`, `greyscale`, `lighten`, `muted`, `negative`. |
| `opacity` | No; body and guard rules apply | Union | Offset an asset on the horizontal axis (left or right). Use a number or an array of [Tween](https://shotstack.io/docs/api/#tocs_tween) objects to create a custom animation. |
| `transform` | No; body and guard rules apply | Transformation | A transformation lets you modify the visual properties of a clip. Available transformations are rotate, skew and flip. Transformations can be combined to create interesting new shapes and effects. |
| `alias` | No; body and guard rules apply | string | A unique identifier for this clip that can be used to reference it from other clips using the `alias://` protocol in asset sources. This is useful for features like auto-captioning where a caption asset needs to reference the audio from another clip. pattern: `^[A-Za-z0-9_-]+$`. |

##### Asset

The type of asset to display for the duration of the Clip, i.e. a video clip or an image. Choose from one of the available asset types below.

oneOf: VideoAsset, ImageAsset, TextAsset, RichTextAsset, AudioAsset, LumaAsset, CaptionAsset, RichCaptionAsset, HtmlAsset, Html5Asset, TitleAsset, ShapeAsset, SvgAsset, TextToImageAsset, ImageToVideoAsset, TextToSpeechAsset.

Type: object.

##### VideoAsset

The VideoAsset adds a video to a Clip. The video can be sourced from a URL (`src`), generated from a text prompt (`prompt`), or both. At least one of `src` or `prompt` must be provided.  - **Source URL:** set `src` to the URL of an mp4 (or compatible) video file. - **Generated:** set `prompt` to describe the motion. Choose a generator   with `model` and configure it with model-specific `options`. Models that   animate an image take it as `options.startSrc` (the original   image-to-video models use `options.inputSrc`); the default model   generates from the prompt alone. The generated `src` is filled in   automatically. - **Both:** `src` acts as a preview placeholder while `prompt` drives   generation — the video is regenerated from the prompt at render time.   Unchanged prompts and options resolve from the generation cache.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `type` | Yes | string | The type of asset - set to `video` for videos. Values: `video`. default: `video`. |
| `src` | No; body and guard rules apply | string | The video source URL. The URL must be publicly accessible or include credentials. When `prompt` is also set, `src` serves as a preview placeholder and the video is regenerated from the prompt at render time. minLength: `1`. pattern: `\S`. |
| `prompt` | No; body and guard rules apply | string | A text prompt to generate the video from. The engine generates a video at render time and fills `src` automatically; an existing `src` is treated as a preview placeholder and replaced. Use `model` to choose the generator and `options` to configure it. A starting image goes in `options.startSrc` — or `options.inputSrc` on the original image-to-video models — on the models that accept one. maxLength: `4000`. |
| `model` | No; body and guard rules apply | string | The generation model to use when `prompt` is set (e.g. `seedance-2.0-text-to-video`). Defaults to `seedance-2.0-text-to-video` if omitted. `GET /models` lists what is available and the options each accepts. |
| `options` | No; body and guard rules apply | object | Model-specific generation settings. Valid keys and values depend on the chosen `model` and are defined by the model registry. Omitted options use the model's defaults. Unknown or invalid options are rejected. |
| `transcode` | No; body and guard rules apply | boolean | Set to `true` to force re-encoding of the video during preprocessing. This can help resolve compatibility issues, fix rotation problems, synchronize audio, or convert formats. The video will be processed to ensure optimal compatibility with the rendering engine. |
| `trim` | No; body and guard rules apply | number | The start trim point of the video clip, in seconds (defaults to 0). Videos will start from the in trim point. The video will play until the file ends or the Clip length is reached. |
| `volume` | No; body and guard rules apply | Union | Set the volume of the video clip. Use a number or an array of [Tween](https://shotstack.io/docs/api/#tocs_tween) objects to create custom volume transitions. |
| `volumeEffect` | No; body and guard rules apply | string | Preset volume effects to apply to the video asset    `fadeIn` - fade volume in only   `fadeOut` - fade volume out only   `fadeInFadeOut` - fade volume in and out Values: `none`, `fadeIn`, `fadeOut`, `fadeInFadeOut`. |
| `speed` | No; body and guard rules apply | Union | Adjust the playback speed of the video clip. Use a number for a constant speed or an array of [Tween](https://shotstack.io/docs/api/#tocs_tween) objects to change speed over time, for example easing from normal speed up to 3x. |
| `crop` | No; body and guard rules apply | Crop | See the full input schema. |
| `chromaKey` | No; body and guard rules apply | ChromaKey | See the full input schema. |

##### ImageAsset

The ImageAsset adds an image to a Clip. The image can be sourced from a URL (`src`), generated from a text prompt (`prompt`), or both. At least one of `src` or `prompt` must be provided.  - **Source URL:** set `src` to the publicly accessible URL of a jpg or png file. - **Generated:** set `prompt` to describe the image. Choose a generator with   `model` and configure it with model-specific `options`; the engine fills   `src` in automatically. - **Both:** `src` acts as a preview placeholder while `prompt` drives   generation — the image is regenerated from the prompt at render time.   Unchanged prompts and options resolve from the generation cache.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `type` | Yes | string | The type of asset - set to `image` for images. Values: `image`. default: `image`. |
| `src` | No; body and guard rules apply | string | The image source URL. The URL must be publicly accessible or include credentials. When `prompt` is also set, `src` serves as a preview placeholder and the image is regenerated from the prompt at render time. minLength: `1`. pattern: `\S`. |
| `prompt` | No; body and guard rules apply | string | A text prompt to generate the image from. The engine generates an image at render time and fills `src` automatically; an existing `src` is treated as a preview placeholder and replaced. Use `model` to choose the generator and `options` to configure it. maxLength: `4000`. |
| `model` | No; body and guard rules apply | string | The generation model to use when `prompt` is set (e.g. `flux-schnell`, `nano-banana-2`). Defaults to `nano-banana-2` if omitted. Each model's available options are defined by the model registry. |
| `options` | No; body and guard rules apply | object | Model-specific generation settings. Valid keys and values depend on the chosen `model` and are defined by the model registry. Omitted options use the model's defaults. Unknown or invalid options are rejected. |
| `crop` | No; body and guard rules apply | Crop | See the full input schema. |

##### TextAsset

**Notice: The TextAsset is deprecated, use the [RichTextAsset](#richtextasset) instead.** This type continues to function; no behaviour change for existing integrations.  The TextAsset is used to add text and titles to a video. The text can be styled with built in and custom [Fonts](#font). You can also add a background bounding box used to control wrapping and overflow. Emoticons are also supported.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `type` | Yes | string | The type of asset - set to `text` for text. Values: `text`. default: `text`. |
| `text` | Yes | string | The text string to display. |
| `width` | No; body and guard rules apply | integer | Set the width of the HTML asset bounding box in pixels. Text will wrap to fill the bounding box. |
| `height` | No; body and guard rules apply | integer | Set the width of the HTML asset bounding box in pixels. Text and elements will be masked if they exceed the  height of the bounding box. |
| `font` | No; body and guard rules apply | TextFont | Font styling properties. |
| `background` | No; body and guard rules apply | TextBackground | Background styling properties. |
| `alignment` | No; body and guard rules apply | TextAlignment | Alignment properties. |
| `stroke` | No; body and guard rules apply | object | Text stroke (outline) properties. |
| `animation` | No; body and guard rules apply | object | Animation properties for text entrance effects. |
| `ellipsis` | No; body and guard rules apply | string | The string to display when text overflows its bounding box. Set to an ellipsis character or custom string to indicate truncated text. |

##### RichTextAsset

The RichTextAsset provides advanced text rendering with support for custom fonts, gradients, shadows, strokes, animations, and styling options. It offers more flexibility and visual effects than the basic TextAsset.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `type` | Yes | string | The type of asset - set to `rich-text` for rich text. Values: `rich-text`. default: `rich-text`. |
| `text` | Yes | string | The text string to display. Maximum 5000 characters. maxLength: `5000`. |
| `font` | No; body and guard rules apply | RichTextFont | Font styling properties. |
| `style` | No; body and guard rules apply | RichTextStyle | Text style properties including spacing, line height, and transformations. |
| `stroke` | No; body and guard rules apply | RichTextStroke | Text stroke (outline) properties. |
| `shadow` | No; body and guard rules apply | RichTextShadow | Text shadow properties. |
| `background` | No; body and guard rules apply | RichTextBackground | Background styling properties for the text bounding box. |
| `border` | No; body and guard rules apply | RichTextBorder | Border styling properties for the text bounding box. |
| `padding` | No; body and guard rules apply | Union | Padding inside the text bounding box. Can be a single number (applied to all sides) or an object with individual sides. |
| `align` | No; body and guard rules apply | RichTextAlignment | Text alignment properties (horizontal and vertical). |
| `animation` | No; body and guard rules apply | RichTextAnimation | Animation properties for text entrance effects. |

##### AudioAsset

The AudioAsset adds audio to a Clip. The audio can be sourced from a URL (`src`), generated from a text prompt (`prompt`), or both. At least one of `src` or `prompt` must be provided.  - **Source URL:** set `src` to a publicly accessible audio URL (e.g. mp3). - **Generated speech:** set `prompt` to the spoken text and choose a   text-to-speech `model`; set the voice via `options`. - **Generated music or SFX:** set `prompt` describing the sound and choose   a music generation `model`. - **Both:** `src` acts as a preview placeholder while `prompt` drives   generation — the audio is regenerated from the prompt at render time.   Unchanged prompts and options resolve from the generation cache. - Use `model` to choose the generator and `options` to configure it. The   generated `src` is filled in automatically.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `type` | Yes | string | The type of asset - set to `audio` for audio assets. Values: `audio`. default: `audio`. |
| `src` | No; body and guard rules apply | string | The audio source URL. The URL must be publicly accessible or include credentials. When `prompt` is also set, `src` serves as a preview placeholder and the audio is regenerated from the prompt at render time. minLength: `1`. pattern: `\S`. |
| `prompt` | No; body and guard rules apply | string | A text prompt. For text-to-speech models the prompt is the spoken text; for music models it describes the sound to generate. The generated `src` is filled in automatically; an existing `src` is treated as a preview placeholder and replaced. maxLength: `4000`. |
| `model` | No; body and guard rules apply | string | The generation model to use when `prompt` is set (e.g. `polly-neural`, `elevenlabs-tts`, `elevenlabs-music`). Defaults to `elevenlabs-tts` (with a default voice) if omitted. Each model's available options are defined by the model registry. |
| `options` | No; body and guard rules apply | object | Model-specific generation settings. Valid keys and values depend on the chosen `model` and are defined by the model registry. Omitted options use the model's defaults. Unknown or invalid options are rejected. |
| `trim` | No; body and guard rules apply | number | The start trim point of the audio clip, in seconds (defaults to 0). Audio will start from the in trim point. The audio will play until the file ends or the Clip length is reached. |
| `volume` | No; body and guard rules apply | Union | Set the volume of the audio clip. Use a number or an array of [Tween](https://shotstack.io/docs/api/#tocs_tween) objects to create custom volume transitions. |
| `speed` | No; body and guard rules apply | number | Adjust the playback speed of the audio clip between 0 (paused) and 10 (10x normal speed), where 1 is normal speed (defaults to 1). Adjusting the speed will also adjust the duration of the clip and may require you to adjust the Clip length. For example, if you set speed to 0.5, the clip will need to be 2x as long to play the entire audio (i.e. original length / 0.5). If you set speed to 2, the clip will need to be half as long to play the entire audio (i.e. original length / 2). minimum: `0`. maximum: `10`. format: `float`. |
| `effect` | No; body and guard rules apply | string | The effect to apply to the audio asset    `fadeIn` - fade volume in only   `fadeOut` - fade volume out only   `fadeInFadeOut` - fade volume in and out Values: `none`, `fadeIn`, `fadeOut`, `fadeInFadeOut`. |

##### ShapeAsset

The ShapeAsset is used to add shapes to a video. The shape can be styled with a fill and a stroke. You can manipulate properties such as rotation to create dynamic effects like a diamond shape or stripes.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `type` | Yes | string | The type of asset - set to `shape` for shape. Values: `shape`. default: `shape`. |
| `shape` | Yes | string | The shape to display. Values: `rectangle`, `circle`, `line`. |
| `width` | No; body and guard rules apply | integer | Sets the width of the bounding box in pixels. This value should be larger than the shape's width. If omitted, the entire viewport width and height will be used. |
| `height` | No; body and guard rules apply | integer | Sets the height of the bounding box in pixels. This value should be larger than the shape's height. If omitted, the entire viewport width and height will be used. |
| `fill` | No; body and guard rules apply | object | Specifies the fill style of the shape. |
| `stroke` | No; body and guard rules apply | object | Specifies the stroke style of the shape. |
| `rectangle` | No; body and guard rules apply | object | Configuration settings for the rectangle shape. Required when `shape` is set to `rectangle`. |
| `circle` | No; body and guard rules apply | object | Configuration settings for the circle shape. Required when `shape` is set to `circle`. |
| `line` | No; body and guard rules apply | object | Configuration settings for the line shape. Required when `shape` is set to `line`. |

##### LumaAsset

The LumaAsset is used to create luma matte masks, transitions and effects between other assets. A luma matte is a grey scale image or animated video where the black areas are transparent and the white areas solid. The luma matte animation should be provided as an mp4 video file. The src must be a publicly accessible URL to the file.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `type` | Yes | string | The type of asset - set to `luma` for luma mattes. Values: `luma`. default: `luma`. |
| `src` | Yes | string | The luma matte source URL. The URL must be publicly accessible or include credentials. minLength: `1`. pattern: `\S`. |
| `trim` | No; body and guard rules apply | number | The start trim point of the luma matte clip, in seconds (defaults to 0). Videos will start from the in trim point. A luma matte video will play until the file ends or the Clip length is reached. |

##### CaptionAsset

**Notice: The CaptionAsset is deprecated, use the [RichCaptionAsset](#richcaptionasset) instead.**  The CaptionAsset is used to add captions (subtitles) to a video. It uses a supplied SRT or VTT file which will be read and burnt to the video.  Captions can be applied independently from a video or audio file for greater flexibility with styling and layout. For example you can scale, position or crop a video without modifying the captions.  To sync captions with a video or audio file use a [Video](#videoasset) or [Audio](#audioasset) with matching start and end time.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `type` | Yes | string | The type of asset - set to `caption` for captions. Values: `caption`. default: `caption`. |
| `src` | Yes | string | The URL to an SRT or VTT subtitles file, or an alias reference to auto-generate captions from an audio or video clip. For file URLs, the URL must be publicly accessible or include credentials. For auto-captioning, use the format `alias://clip-name` where clip-name is the alias of an audio, video, or text-to-speech clip. The system will automatically transcribe the audio and detect the language. minLength: `1`. pattern: `\S`. |
| `font` | No; body and guard rules apply | CaptionFont | Font styling properties. |
| `background` | No; body and guard rules apply | CaptionBackground | Background styling properties. |
| `margin` | No; body and guard rules apply | CaptionMargin | Margin properties. |
| `trim` | No; body and guard rules apply | number | The start trim point of the captions, in seconds (defaults to 0). Remove the trim length from the start of the captions and allow it to be synced with video or audio. The captions will play until the file ends or the Clip length is reached. |
| `speed` | No; body and guard rules apply | number | Adjust the playback speed of the captions between 0 (paused) and 10 (10x normal speed) where 1 is normal speed (defaults to 1). Adjusting the speed will also adjust the duration of the clip and may require you to  adjust the Clip length. For example, if you set speed to 0.5, the clip will need to be 2x as long to play the entire captions (i.e. original length / 0.5). If you set speed to 2, the clip will need to be half as long to play the entire captions (i.e. original length / 2). minimum: `0`. maximum: `10`. format: `float`. |

##### RichCaptionAsset

The RichCaptionAsset provides word-level caption animations with rich-text styling. It supports karaoke-style highlighting, word-by-word animations, and advanced typography. Captions can be sourced from SRT/VTT/TTML subtitle files, from audio/video media URLs (auto-transcribed), or from alias references to other clips in the same timeline.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `type` | Yes | string | The type of asset - set to `rich-caption` for rich captions. Values: `rich-caption`. default: `rich-caption`. |
| `src` | Yes | string | Source for the caption words. Accepts three formats: (1) the URL to a subtitle file (`.srt`, `.vtt`, `.ttml`, or `.dfxp`) which is parsed directly; (2) the URL to an audio or video media file (`.mp4`, `.mov`, `.webm`, `.mp3`, `.wav`, `.m4a`, `.flac`, `.aac`, `.ogg`, and related formats) which is auto-transcribed; (3) an alias reference in the form `alias://clip-name` where `clip-name` is the alias of another audio, video, or text-to-speech clip in the same timeline — the referenced clip's source is auto-transcribed. For file URLs, the URL must be publicly accessible or include credentials. Content is classified at runtime and unsupported content types (HTML, PDF, images, archives) are rejected with a structured error. minLength: `1`. |
| `font` | No; body and guard rules apply | object | Font styling properties for inactive words. |
| `style` | No; body and guard rules apply | object | Text style properties including spacing, line height, and transformations. |
| `stroke` | No; body and guard rules apply | RichTextStroke | Text stroke (outline) properties for inactive words. |
| `shadow` | No; body and guard rules apply | RichTextShadow | Text shadow properties. |
| `background` | No; body and guard rules apply | RichTextBackground | Background styling properties for the caption bounding box. |
| `border` | No; body and guard rules apply | RichTextBorder | Border styling properties for the caption bounding box. |
| `padding` | No; body and guard rules apply | Union | Padding inside the caption bounding box. Can be a single number (applied to all sides) or an object with individual sides. |
| `align` | No; body and guard rules apply | RichTextAlignment | Text alignment properties (horizontal and vertical). |
| `active` | No; body and guard rules apply | RichCaptionActive | Styling properties for the active/highlighted word. These override the base styling when a word is being spoken. |
| `animation` | No; body and guard rules apply | RichCaptionAnimation | Word-level animation properties controlling how words are highlighted or revealed. |

##### RichCaptionActiveFont

Font properties for the active/highlighted word.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `family` | No; body and guard rules apply | string | The font family for the active word. Inherits from the base font.family when not set. |
| `weight` | No; body and guard rules apply | JSON | The weight of the font for the active word. Can be a number (100-900) or a string. Inherits from the base font.weight when not set. default: `400`. |
| `color` | No; body and guard rules apply | string | The active word color using hexadecimal color notation. pattern: `^#[A-Fa-f0-9]{6}$`. |
| `background` | No; body and guard rules apply | string | The background color behind the active word using hexadecimal color notation. pattern: `^#[A-Fa-f0-9]{6}$`. |
| `opacity` | No; body and guard rules apply | number | The opacity of the active word where 1 is opaque and 0 is transparent. minimum: `0`. maximum: `1`. default: `1`. |
| `size` | No; body and guard rules apply | number | The font size of the active word in pixels. minimum: `1`. maximum: `500`. |
| `textDecoration` | No; body and guard rules apply | string | Text decoration to apply to the active word. Values: `none`, `underline`, `line-through`. default: `none`. |

##### RichCaptionActive

Styling properties for the active/highlighted word.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `font` | No; body and guard rules apply | RichCaptionActiveFont | Font properties for the active word. |
| `stroke` | No; body and guard rules apply | Union | Stroke properties for the active word. Set to "none" to explicitly remove the base stroke on the active word. |
| `shadow` | No; body and guard rules apply | Union | Shadow properties for the active word. Set to "none" to explicitly remove the base shadow on the active word. |

##### RichCaptionAnimation

Word-level animation properties for caption effects.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `style` | Yes | string | The animation style to apply to words:    `karaoke` - Word-by-word color fill as spoken (shows all words, highlights active)   `highlight` - Word changes to active color when spoken (shows all words)   `pop` - Each word scales up when active   `fade` - Gradual opacity transition per word   `slide` - Words slide in from a direction   `bounce` - Spring animation on word appearance   `typewriter` - Words appear one by one and stay visible   `none` - No animation, all words visible immediately Values: `karaoke`, `highlight`, `pop`, `fade`, `slide`, `bounce`, `typewriter`, `none`. default: `highlight`. |
| `direction` | No; body and guard rules apply | string | Direction for directional animations (slide). Only applicable when style is `slide`. Values: `left`, `right`, `up`, `down`. default: `up`. |

##### TextToImageAsset

**Notice: TextToImageAsset is deprecated. Use [ImageAsset](#imageasset) with `prompt` instead.** This type continues to function and is internally rewritten to ImageAsset; no behaviour change for existing integrations.  The TextToImageAsset lets you create a dynamic image from a text prompt.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `type` | Yes | string | The type of asset to generate - set to `text-to-image` for text-to-image. Values: `text-to-image`. default: `text-to-image`. |
| `prompt` | Yes | string | The text prompt to generate an image from. |
| `width` | No; body and guard rules apply | integer | The width of the image in pixels. |
| `height` | No; body and guard rules apply | integer | The height of the image in pixels. |
| `crop` | No; body and guard rules apply | Crop | See the full input schema. |

##### ImageToVideoAsset

**Notice: ImageToVideoAsset is deprecated. Use [VideoAsset](#videoasset) with `prompt`, a `model` that accepts a starting image, and that image in `options.startSrc` — for example `seedance-2.0-image-to-video`.** This type continues to function and is internally rewritten to VideoAsset; no behaviour change for existing integrations.  The ImageToVideoAsset lets you create a video from an image and a text prompt.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `type` | Yes | string | The type of asset to generate - set to `image-to-video` for image-to-video. Values: `image-to-video`. default: `image-to-video`. |
| `src` | Yes | string | The image source URL. The URL must be publicly accessible or include credentials. minLength: `1`. |
| `prompt` | No; body and guard rules apply | string | The instructions for modifying the image into a video sequence. |
| `aspectRatio` | No; body and guard rules apply | string | The aspect ratio (shape) of the video output. Values: `1:1`, `4:3`, `16:9`, `9:16`, `3:4`, `21:9`, `9:21`. |
| `speed` | No; body and guard rules apply | number | Adjust the playback speed of the video clip between 0 (paused) and 10 (10x normal speed) where 1 is normal speed (defaults to 1). Adjusting the speed will also adjust the duration of the clip and may require you to  adjust the Clip length. For example, if you set speed to 0.5, the clip will need to be 2x as long to play the entire video (i.e. original length / 0.5). If you set speed to 2, the clip will need to be half as long to play the entire video (i.e. original length / 2). minimum: `0`. maximum: `10`. format: `float`. |
| `crop` | No; body and guard rules apply | Crop | See the full input schema. |

##### TextToSpeechAsset

**Notice: TextToSpeechAsset is deprecated. Use [AudioAsset](#audioasset) with `prompt` (the spoken text) and `voice` instead.** This type continues to function and is internally rewritten to AudioAsset; no behaviour change for existing integrations.  The TextToSpeechAsset lets you generate a voice over from text using a text-to-speech service. The generated audio can be trimmed, faded and have its volume and speed adjusted using the same properties available on the AudioAsset.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `type` | Yes | string | The type of asset - set to `text-to-speech` for text-to-speech. Values: `text-to-speech`. default: `text-to-speech`. |
| `text` | Yes | string | The text to convert to speech. |
| `voice` | Yes | string | The voice to use for the text-to-speech conversion. |
| `language` | No; body and guard rules apply | string | The language code for the text-to-speech conversion. |
| `newscaster` | No; body and guard rules apply | boolean | Set the voice to newscaster mode. default: `False`. |
| `trim` | No; body and guard rules apply | number | The start trim point of the audio clip, in seconds (defaults to 0). Audio will start from the trim point. The audio will play until the file ends or the Clip length is reached. |
| `volume` | No; body and guard rules apply | Union | Set the volume of the audio clip. Use a number or an array of [Tween](https://shotstack.io/docs/api/#tocs_tween) objects to create custom volume transitions. |
| `speed` | No; body and guard rules apply | number | Adjust the playback speed of the audio clip between 0 (paused) and 10 (10x normal speed), where 1 is normal speed (defaults to 1). Adjusting the speed will also adjust the duration of the clip and may require you to adjust the Clip length. minimum: `0`. maximum: `10`. format: `float`. |
| `effect` | No; body and guard rules apply | string | The effect to apply to the audio asset    `fadeIn` - fade volume in only   `fadeOut` - fade volume out only   `fadeInFadeOut` - fade volume in and out Values: `none`, `fadeIn`, `fadeOut`, `fadeInFadeOut`. |

##### HtmlAsset

**Notice: The HtmlAsset is deprecated, use the [RichTextAsset](#richtextasset) instead.**  The HtmlAsset clip type lets you create text based layout and formatting using HTML and CSS. You can also set the height and width of a bounding box for the HTML content to sit within. Text and elements will wrap within the bounding box.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `type` | Yes | string | The type of asset - set to `html` for HTML. Values: `html`. default: `html`. |
| `html` | Yes | string | The HTML text string. See list of [supported HTML tags](https://shotstack.io/docs/guide/architecting-an-application/html-support/#supported-html-tags). |
| `css` | No; body and guard rules apply | string | The CSS text string to apply styling to the HTML. See list of  [support CSS properties](https://shotstack.io/docs/guide/architecting-an-application/html-support/#supported-css-properties). |
| `width` | No; body and guard rules apply | integer | Set the width of the HTML asset bounding box in pixels. Text will wrap to fill the bounding box. |
| `height` | No; body and guard rules apply | integer | Set the width of the HTML asset bounding box in pixels. Text and elements will be masked if they exceed the  height of the bounding box. |
| `background` | No; body and guard rules apply | string | Apply a background color behind the HTML bounding box using. Set the text color using hexadecimal  color notation. Transparency is supported by setting the first two characters of the hex string  (opposite to HTML), i.e. #80ffffff will be white with 50% transparency. |
| `position` | No; body and guard rules apply | string | Place the HTML in one of nine predefined positions within the HTML area.    `top` - top (center)   `topRight` - top right   `right` - right (center)   `bottomRight` - bottom right   `bottom` - bottom (center)   `bottomLeft` - bottom left   `left` - left (center)   `topLeft` - top left   `center` - center Values: `top`, `topRight`, `right`, `bottomRight`, `bottom`, `bottomLeft`, `left`, `topLeft`, `center`. |

##### Html5Asset

The Html5Asset renders full HTML5/CSS3/JS.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `type` | Yes | string | The type of asset - set to `html5` for HTML5/CSS3/JS. Values: `html5`. default: `html5`. |
| `html` | Yes | string | The HTML markup for the asset. Max 1,000,000 characters. maxLength: `1000000`. |
| `css` | No; body and guard rules apply | string | The CSS string applied to the HTML. Max 500,000 characters. maxLength: `500000`. |
| `js` | No; body and guard rules apply | string | Optional JavaScript. Use for chart libraries, animations, or DOM manipulation. `gsap`, `d3`, `anime` and `lottie` are always available. CSS animations, transitions, and `Element.animate()` are also captured automatically. Max 500,000 characters. maxLength: `500000`. |

##### TitleAsset

**Notice: The TitleAsset is deprecated, use the [RichTextAsset](#richtextasset) instead.**  The TitleAsset clip type lets you create video titles from a text string and apply styling and positioning.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `type` | Yes | string | The type of asset - set to `title` for titles. Values: `title`. default: `title`. |
| `text` | Yes | string | The title text string - i.e. "My Title". |
| `style` | No; body and guard rules apply | string | Uses a preset to apply font properties and styling to the title.    `minimal`   `blockbuster`   `vogue`   `sketchy`   `skinny`   `chunk`   `chunkLight`   `marker`   `future`   `subtitle` Values: `minimal`, `blockbuster`, `vogue`, `sketchy`, `skinny`, `chunk`, `chunkLight`, `marker`, `future`, `subtitle`. |
| `color` | No; body and guard rules apply | string | Set the text color using hexadecimal color notation. Transparency is supported by setting the first two characters of the hex string (opposite to HTML),  i.e. #80ffffff will be white with  50% transparency. |
| `size` | No; body and guard rules apply | string | Set the relative size of the text using predefined sizes from xx-small to xx-large.    `xx-small`   `x-small`   `small`   `medium`   `large`   `x-large`   `xx-large` Values: `xx-small`, `x-small`, `small`, `medium`, `large`, `x-large`, `xx-large`. |
| `background` | No; body and guard rules apply | string | Apply a background color behind the text. Set the text color using hexadecimal color notation. Transparency is supported by setting the first two characters of the hex string (opposite to HTML),  i.e. #80ffffff will be white with 50% transparency. Omit to use transparent background. |
| `position` | No; body and guard rules apply | string | Place the title in one of nine predefined positions of the viewport.    `top` - top (center)   `topRight` - top right   `right` - right (center)   `bottomRight` - bottom right   `bottom` - bottom (center)   `bottomLeft` - bottom left   `left` - left (center)   `topLeft` - top left   `center` - center Values: `top`, `topRight`, `right`, `bottomRight`, `bottom`, `bottomLeft`, `left`, `topLeft`, `center`. |
| `offset` | No; body and guard rules apply | Offset | Offset the location of the title relative to its position on the screen. |

##### SvgAsset

The SvgAsset is used to add scalable vector graphics (SVG) to a video using raw SVG markup.  **Supported elements:** ``, ``, ``, ``, ``, ``, ``  **Automatically extracted from SVG markup:** - Path data (converted to a single combined path) - Fill color (from `fill` attribute or `style`) - Stroke color and width (from attributes or `style`) - Dimensions (from `width`/`height` or `viewBox`) - Opacity (from `opacity` attribute)  See [W3C SVG 2 Specification](https://www.w3.org/TR/SVG2/) for path data syntax.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `type` | Yes | string | The asset type - set to `svg` for SVG assets. Values: `svg`. default: `svg`. |
| `src` | Yes | string | Raw SVG markup string. The SVG must contain valid SVG elements. The shape, fill, stroke, dimensions and opacity are automatically extracted from the SVG content. minLength: `1`. maxLength: `500000`. |

##### Transition

In and out transitions for a clip - i.e. fade in and fade out

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `in` | No; body and guard rules apply | string | The transition in. Available transitions are:        `fade` - fade in     `reveal` - reveal from left to right     `wipeLeft` - fade across screen to the left     `wipeRight` - fade across screen to the right     `slideLeft` - move slightly left and fade in     `slideRight` - move slightly right and fade in     `slideUp` - move slightly up and fade in     `slideDown` - move slightly down and fade in     `carouselLeft` - slide in from right to left     `carouselRight` - slide in from left to right     `carouselUp` - slide in from bottom to top     `carouselDown` - slide in from top to bottom     `shuffleTopRight` - rotate in from top right     `shuffleRightTop` - rotate in from right top     `shuffleRightBottom` - rotate in from right bottom     `shuffleBottomRight` - rotate in from bottom right     `shuffleBottomLeft` - rotate in from bottom left     `shuffleLeftBottom` - rotate in from left bottom     `shuffleLeftTop` - rotate in from left top     `shuffleTopLeft` - rotate in from top left     `zoom` - fast zoom in    The transition speed can also be controlled by appending `Fast` or `Slow` to the transition, e.g. `fadeFast` or `CarouselLeftSlow`. Values: `none`, `fade`, `fadeSlow`, `fadeFast`, `reveal`, `revealSlow`, `revealFast`, `wipeLeft`, `wipeLeftSlow`, `wipeLeftFast`, `wipeRight`, `wipeRightSlow`, `wipeRightFast`, `slideLeft`, `slideLeftSlow`, `slideLeftFast`, `slideRight`, `slideRightSlow`, `slideRightFast`, `slideUp`, `slideUpSlow`, `slideUpFast`, `slideDown`, `slideDownSlow`, `slideDownFast`, `carouselLeft`, `carouselLeftSlow`, `carouselLeftFast`, `carouselRight`, `carouselRightSlow`, `carouselRightFast`, `carouselUp`, `carouselUpSlow`, `carouselUpFast`, `carouselDown`, `carouselDownSlow`, `carouselDownFast`, `shuffleTopRight`, `shuffleTopRightSlow`, `shuffleTopRightFast`, `shuffleRightTop`, `shuffleRightTopSlow`, `shuffleRightTopFast`, `shuffleRightBottom`, `shuffleRightBottomSlow`, `shuffleRightBottomFast`, `shuffleBottomRight`, `shuffleBottomRightSlow`, `shuffleBottomRightFast`, `shuffleBottomLeft`, `shuffleBottomLeftSlow`, `shuffleBottomLeftFast`, `shuffleLeftBottom`, `shuffleLeftBottomSlow`, `shuffleLeftBottomFast`, `shuffleLeftTop`, `shuffleLeftTopSlow`, `shuffleLeftTopFast`, `shuffleTopLeft`, `shuffleTopLeftSlow`, `shuffleTopLeftFast`, `zoom`. |
| `out` | No; body and guard rules apply | string | The transition out. Available transitions are:        `fade` - fade out     `reveal` - reveal from right to left     `wipeLeft` - fade across screen to the left     `wipeRight` - fade across screen to the right     `slideLeft` - move slightly left and fade out     `slideRight` - move slightly right and fade out     `slideUp` - move slightly up and fade out     `slideDown` - move slightly down and fade out     `carouselLeft` - slide out from right to left     `carouselRight` - slide out from left to right     `carouselUp` - slide out from bottom to top     `carouselDown` - slide out from top  to bottom     `shuffleTopRight` - rotate out from top right     `shuffleRightTop` - rotate out from right top     `shuffleRightBottom` - rotate out from right bottom     `shuffleBottomRight` - rotate out from bottom right     `shuffleBottomLeft` - rotate out from bottom left     `shuffleLeftBottom` - rotate out from left bottom     `shuffleLeftTop` - rotate out from left top     `shuffleTopLeft` - rotate out from top left     `zoom` - fast zoom out    The transition speed can also be controlled by appending `Fast` or `Slow` to the transition, e.g. `fadeFast` or `CarouselLeftSlow`. Values: `none`, `fade`, `fadeSlow`, `fadeFast`, `reveal`, `revealSlow`, `revealFast`, `wipeLeft`, `wipeLeftSlow`, `wipeLeftFast`, `wipeRight`, `wipeRightSlow`, `wipeRightFast`, `slideLeft`, `slideLeftSlow`, `slideLeftFast`, `slideRight`, `slideRightSlow`, `slideRightFast`, `slideUp`, `slideUpSlow`, `slideUpFast`, `slideDown`, `slideDownSlow`, `slideDownFast`, `carouselLeft`, `carouselLeftSlow`, `carouselLeftFast`, `carouselRight`, `carouselRightSlow`, `carouselRightFast`, `carouselUp`, `carouselUpSlow`, `carouselUpFast`, `carouselDown`, `carouselDownSlow`, `carouselDownFast`, `shuffleTopRight`, `shuffleTopRightSlow`, `shuffleTopRightFast`, `shuffleRightTop`, `shuffleRightTopSlow`, `shuffleRightTopFast`, `shuffleRightBottom`, `shuffleRightBottomSlow`, `shuffleRightBottomFast`, `shuffleBottomRight`, `shuffleBottomRightSlow`, `shuffleBottomRightFast`, `shuffleBottomLeft`, `shuffleBottomLeftSlow`, `shuffleBottomLeftFast`, `shuffleLeftBottom`, `shuffleLeftBottomSlow`, `shuffleLeftBottomFast`, `shuffleLeftTop`, `shuffleLeftTopSlow`, `shuffleLeftTopFast`, `shuffleTopLeft`, `shuffleTopLeftSlow`, `shuffleTopLeftFast`, `zoom`. |

##### Offset

Offsets the position of an asset horizontally or vertically by a relative distance.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `x` | No; body and guard rules apply | Union | Offset an asset on the horizontal axis (left or right). Use a number or an array of [Tween](https://shotstack.io/docs/api/#tocs_tween) objects to create a custom animation. |
| `y` | No; body and guard rules apply | Union | Offset an asset on the vertical axis (up or down). Use a number or an array of [Tween](https://shotstack.io/docs/api/#tocs_tween) objects to create a custom animation. |

##### Crop

Crop the sides of an asset by a relative amount. The size of the crop is specified using a scale between 0 and 1, relative to the screen width - i.e a left crop of 0.5 will crop half of the asset from the left, a top crop  of 0.25 will crop the top by quarter of the asset.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `top` | No; body and guard rules apply | number | Crop from the top of the asset minimum: `0`. maximum: `1`. format: `float`. |
| `bottom` | No; body and guard rules apply | number | Crop from the bottom of the asset minimum: `0`. maximum: `1`. format: `float`. |
| `left` | No; body and guard rules apply | number | Crop from the left of the asset minimum: `0`. maximum: `1`. format: `float`. |
| `right` | No; body and guard rules apply | number | Crop from the left of the asset minimum: `0`. maximum: `1`. format: `float`. |

##### Transformation

Apply one or more transformations to a clip. Transformations alter the visual properties of a clip and can be combined to create new shapes and effects.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `rotate` | No; body and guard rules apply | RotateTransformation | See the full input schema. |
| `skew` | No; body and guard rules apply | SkewTransformation | See the full input schema. |
| `flip` | No; body and guard rules apply | FlipTransformation | See the full input schema. |

##### RotateTransformation

Rotate a clip by the specified angle in degrees. Rotation origin is set based on the clips `position`.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `angle` | No; body and guard rules apply | Union | Rotate a clip by the specified angle in degrees. Use a number or an array of [Tween](https://shotstack.io/docs/api/#tocs_tween) objects to create a custom animation. |

##### SkewTransformation

Skew a clip so its edges are sheared at an angle. Use values between -100 and 100. Values over 3 or under -3 will skew the clip almost flat.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `x` | No; body and guard rules apply | Union | Skew the clip along it's x axis. |
| `y` | No; body and guard rules apply | Union | Skew the clip along it's y axis. |

##### FlipTransformation

Flip a clip vertically or horizontally. Acts as a mirror effect of the clip along the selected plane.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `horizontal` | No; body and guard rules apply | boolean | Flip a clip horizontally. |
| `vertical` | No; body and guard rules apply | boolean | Flip a clip vertically. |

##### TextFont

Font properties for text.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `family` | No; body and guard rules apply | string | The font family name. This must be Family name embedded in the font, i.e. "Open Sans". |
| `color` | No; body and guard rules apply | string | The text color using hexadecimal color notation. |
| `opacity` | No; body and guard rules apply | number | The opacity of the text where 1 is opaque and 0 is transparent. |
| `size` | No; body and guard rules apply | integer | The size of the font in pixels (px). |
| `weight` | No; body and guard rules apply | integer | The weight of the font. 100 is lightest, 900 is heaviest (boldest). |
| `lineHeight` | No; body and guard rules apply | number | The line height of the font as a ratio of the font size. |

##### TextBackground

Displays a background box behind the text.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `color` | No; body and guard rules apply | string | The background color using hexadecimal color notation. pattern: `^#[A-Fa-f0-9]{6}$`. |
| `opacity` | No; body and guard rules apply | number | The opacity of the background where 1 is opaque and 0 is transparent. minimum: `0`. maximum: `1`. |
| `padding` | No; body and guard rules apply | number | Padding inside the background box in pixels. minimum: `0`. maximum: `100`. |
| `borderRadius` | No; body and guard rules apply | number | The border radius of the background box in pixels for rounded corners. minimum: `0`. |
| `wrap` | No; body and guard rules apply | boolean | Not supported on legacy `text` assets. Accepted here only so validators can emit a clear migration error pointing users to `rich-text` or `rich-caption`, which support background wrapping natively. |

##### TextAlignment

Horizontal and vertical alignment properties for text.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `horizontal` | No; body and guard rules apply | string | The horizontal alignment of the text. Value must be one of:    `left`   `center`   `right` Values: `left`, `center`, `right`. |
| `vertical` | No; body and guard rules apply | string | The vertical alignment of the text. Value must be one of:    `top`   `center`   `bottom` Values: `top`, `center`, `bottom`. |

##### RichTextFont

Font properties for rich text.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `family` | No; body and guard rules apply | string | The font family name. This must be the Family name embedded in the font, i.e. "Open Sans". default: `Open Sans`. |
| `size` | No; body and guard rules apply | integer | The size of the font in pixels (px). Must be between 1 and 500. minimum: `1`. maximum: `500`. default: `24`. |
| `weight` | No; body and guard rules apply | JSON | The weight of the font. Can be a number (100-900) or a string ('normal', 'bold', etc.). 100 is lightest, 900 is heaviest (boldest). default: `400`. |
| `style` | No; body and guard rules apply | string | The font style. Values: `normal`, `italic`. default: `normal`. |
| `color` | No; body and guard rules apply | string | The text color using hexadecimal color notation. pattern: `^#[A-Fa-f0-9]{6}$`. default: `#000000`. |
| `opacity` | No; body and guard rules apply | number | The opacity of the text where 1 is opaque and 0 is transparent. minimum: `0`. maximum: `1`. default: `1`. |
| `background` | No; body and guard rules apply | string | The background color behind the text using hexadecimal color notation. pattern: `^#[A-Fa-f0-9]{6}$`. |
| `stroke` | No; body and guard rules apply | RichTextStroke | Text stroke (outline) properties. |

##### RichTextStyle

Text style properties including spacing, line height, and transformations.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `letterSpacing` | No; body and guard rules apply | number | Additional spacing between letters in pixels. Can be negative for tighter spacing. default: `0`. |
| `wordSpacing` | No; body and guard rules apply | number | Additional spacing between words in pixels. A value of 0 uses the font's natural space width. minimum: `0`. default: `0`. |
| `lineHeight` | No; body and guard rules apply | number | The line height as a multiplier of the font size. Must be between 0 and 10. minimum: `0`. maximum: `10`. default: `1.2`. |
| `textTransform` | No; body and guard rules apply | string | Text transformation to apply. Values: `none`, `uppercase`, `lowercase`, `capitalize`. default: `none`. |
| `textDecoration` | No; body and guard rules apply | string | Text decoration to apply. Values: `none`, `underline`, `line-through`. default: `none`. |
| `gradient` | No; body and guard rules apply | RichTextGradient | Gradient fill for text instead of solid color. |

##### RichTextGradient

Gradient properties for text fill.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `type` | No; body and guard rules apply | string | The type of gradient. Values: `linear`, `radial`. default: `linear`. |
| `angle` | No; body and guard rules apply | number | The angle of the gradient in degrees (for linear gradients). Must be between 0 and 360. minimum: `0`. maximum: `360`. default: `0`. |
| `stops` | Yes | array | Gradient color stops. Must have at least 2 stops. minItems: `2`. Items: object. |

##### RichTextStroke

Text stroke (outline) properties.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `width` | No; body and guard rules apply | number | The width of the stroke in pixels. Must be 0 or greater. minimum: `0`. default: `0`. |
| `color` | No; body and guard rules apply | string | The stroke color using hexadecimal color notation. pattern: `^#[A-Fa-f0-9]{6}$`. default: `#000000`. |
| `opacity` | No; body and guard rules apply | number | The opacity of the stroke where 1 is opaque and 0 is transparent. minimum: `0`. maximum: `1`. default: `1`. |

##### RichTextShadow

Text shadow properties.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `offsetX` | No; body and guard rules apply | number | Horizontal offset of the shadow in pixels. Positive values move right, negative left. default: `0`. |
| `offsetY` | No; body and guard rules apply | number | Vertical offset of the shadow in pixels. Positive values move down, negative up. default: `0`. |
| `blur` | No; body and guard rules apply | number | The blur radius of the shadow in pixels. Must be 0 or greater. minimum: `0`. default: `0`. |
| `color` | No; body and guard rules apply | string | The shadow color using hexadecimal color notation. pattern: `^#[A-Fa-f0-9]{6}$`. default: `#000000`. |
| `opacity` | No; body and guard rules apply | number | The opacity of the shadow where 1 is opaque and 0 is transparent. minimum: `0`. maximum: `1`. default: `0.5`. |

##### RichTextBackground

Background styling properties for the text bounding box.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `color` | No; body and guard rules apply | string | The background color using hexadecimal color notation. pattern: `^#[A-Fa-f0-9]{6}$`. |
| `opacity` | No; body and guard rules apply | number | The opacity of the background where 1 is opaque and 0 is transparent. minimum: `0`. maximum: `1`. default: `1`. |
| `borderRadius` | No; body and guard rules apply | number | The border radius of the background box in pixels. Must be 0 or greater. minimum: `0`. default: `0`. |
| `wrap` | No; body and guard rules apply | boolean | When true, the background pill shrinks to fit the rendered text bounding box plus the asset's padding (and stroke width, if present), producing a pill or badge effect. When false (default), the background fills the full asset content area. Available on rich-text and rich-caption assets only; not supported on legacy `type: text`. default: `False`. |
| `padding` | No; body and guard rules apply | integer | Inner padding in pixels between the wrap pill edge and the rendered text. Only takes effect when `wrap: true`. When omitted, the renderer applies a sensible default proportional to the font size (approximately 12% of the active page font size on rich-caption assets). Set to 0 for a pill that hugs the text exactly. Available on rich-text and rich-caption assets only. minimum: `0`. maximum: `200`. |

##### RichTextAlignment

Text alignment properties (horizontal and vertical).

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `horizontal` | No; body and guard rules apply | string | The horizontal alignment of the text. Values: `left`, `center`, `right`. default: `center`. |
| `vertical` | No; body and guard rules apply | string | The vertical alignment of the text within the bounding box. Values: `top`, `middle`, `bottom`. default: `middle`. |

##### RichTextAnimation

Animation properties for text entrance effects.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `preset` | Yes | string | The animation preset to apply. Available presets:    `fadeIn` - fadeIn in animation   `slideIn` - slide in from a direction   `typewriter` - typewriter effect   `ascend` - ascend from a direction   `shift` - shift in from a direction   `movingLetters` - letters move in from a direction Values: `fadeIn`, `slideIn`, `typewriter`, `ascend`, `shift`, `movingLetters`. |
| `duration` | No; body and guard rules apply | number | Override animation duration in seconds. Must be between 0.1 and 30 seconds. minimum: `0.1`. maximum: `30`. |
| `style` | No; body and guard rules apply | string | Animation style - animate by character or by word. Only applicable for typewriter and shift animations. Values: `character`, `word`. |
| `direction` | No; body and guard rules apply | string | Direction for directional animations. Required for slideIn, ascend, shift, and movingLetters presets.    `ascend` - supports: up, down   `shift` - supports: left, right, up, down   `slideIn` - supports: left, right, up, down   `movingLetters` - supports: left, right, up, down Values: `left`, `right`, `up`, `down`. |

##### RichTextBorder

Border styling properties for the text bounding box.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `width` | No; body and guard rules apply | number | The width of the border in pixels. Must be 0 or greater. minimum: `0`. default: `0`. |
| `color` | No; body and guard rules apply | string | The border color using hexadecimal color notation. pattern: `^#[A-Fa-f0-9]{6}$`. default: `#000000`. |
| `opacity` | No; body and guard rules apply | number | The opacity of the border where 1 is opaque and 0 is transparent. minimum: `0`. maximum: `1`. default: `1`. |
| `radius` | No; body and guard rules apply | number | The border radius in pixels for rounded corners. Must be 0 or greater. minimum: `0`. default: `0`. |

##### RichTextPadding

Padding properties for individual sides of the text bounding box.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `top` | No; body and guard rules apply | number | Top padding in pixels. minimum: `0`. default: `0`. |
| `right` | No; body and guard rules apply | number | Right padding in pixels. minimum: `0`. default: `0`. |
| `bottom` | No; body and guard rules apply | number | Bottom padding in pixels. minimum: `0`. default: `0`. |
| `left` | No; body and guard rules apply | number | Left padding in pixels. minimum: `0`. default: `0`. |

##### CaptionFont

Font properties for captions text.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `family` | No; body and guard rules apply | string | The font family name. This must be Family name embedded in the font, i.e. "Open Sans". |
| `color` | No; body and guard rules apply | string | The text color using hexadecimal color notation. |
| `opacity` | No; body and guard rules apply | number | The opacity of the text where 1 is opaque and 0 is transparent. |
| `size` | No; body and guard rules apply | integer | The size of the font in pixels (px). |
| `lineHeight` | No; body and guard rules apply | number | The line height of the font as a ratio of the font size. |
| `stroke` | No; body and guard rules apply | string | The stroke color of the font using hexadecimal color notation. |
| `strokeWidth` | No; body and guard rules apply | number | The width of the stroke in pixels. |

##### CaptionBackground

Displays a background box behind the caption text.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `color` | No; body and guard rules apply | string | The background color using hexadecimal color notation. |
| `opacity` | No; body and guard rules apply | number | The opacity of the background color. |
| `padding` | No; body and guard rules apply | integer | The padding inside the background box in pixels. |
| `borderRadius` | No; body and guard rules apply | integer | The border radius of the background box in pixels. |

##### CaptionMargin

The margin properties for captions. Margins are used to position the caption text and background on the screen.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `top` | No; body and guard rules apply | number | The margin above the text. Pushes captions down the screen. |
| `left` | No; body and guard rules apply | number | The margin to the left of the text. Pushes captions to the right. |
| `right` | No; body and guard rules apply | number | The margin to the right of the text. Pushes captions to the left. |

##### ChromaKey

Chroma key is a technique that replaces a specific color in a video with a different background image or video, enabling seamless integration of diverse environments. Commonly used for green screen and blue screen effects.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `color` | Yes | string | The chroma key color as a hex value. Use green (#00b140) for green screens or blue (#0000FF) for blue screens. Any valid hex color can be used as the key color. pattern: `^#[0-9a-fA-F]{6}$`. |
| `threshold` | No; body and guard rules apply | integer | Pixels within this distance from the key color are eliminated by setting their alpha values to zero. minimum: `0`. maximum: `250`. |
| `halo` | No; body and guard rules apply | integer | Pixels within the halo distance from the threshold boundary are given an increasing alpha value based on their distance from the threshold. minimum: `0`. maximum: `250`. |

##### Tween

Use a Tween to [animate properties over time](/docs/guide/architecting-an-application/animations/). The following properties are currently supported and can be animated:        Opacity - animate the transparency of a clip.     Offset - animate the x and y position of a clip.     Rotation - animate the rotation of a clip.     Skew - animate the horizontal and vertical shearing effect.     Volume - animate the audio volume of a clip.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `from` | No; body and guard rules apply | JSON | The initial property value at the start of the animation. |
| `to` | No; body and guard rules apply | JSON | The final property value at the end of the animation. |
| `start` | No; body and guard rules apply | number | The time in seconds when the animation starts, relative to the clip, not the timeline. |
| `length` | No; body and guard rules apply | number | The duration of the animation in seconds. |
| `interpolation` | No; body and guard rules apply | string | The interpolation method to use for the animation. Available options are:    `linear` - a linear interpolation between the start and end values.   `bezier` - a bezier curve interpolation between the start and end values.   `constant` - an interpolation where the property instantly jumps from the start to the end value, without any gradual transition. Values: `linear`, `bezier`, `constant`. |
| `easing` | No; body and guard rules apply | string | The easing function to use for the animation. Easing controls the rate of change of the animated value, allowing for more natural motion by speeding up or slowing down the animation at different points. Only applicable if interpolation is set to `bezier`. Values: `ease`, `easeIn`, `easeOut`, `easeInOut`, `easeInQuad`, `easeInCubic`, `easeInQuart`, `easeInQuint`, `easeInSine`, `easeInExpo`, `easeInCirc`, `easeInBack`, `easeOutQuad`, `easeOutCubic`, `easeOutQuart`, `easeOutQuint`, `easeOutSine`, `easeOutExpo`, `easeOutCirc`, `easeOutBack`, `easeInOutQuad`, `easeInOutCubic`, `easeInOutQuart`, `easeInOutQuint`, `easeInOutSine`, `easeInOutExpo`, `easeInOutCirc`, `easeInOutBack`. |

##### MergeField

A merge field consists of a key; `find`, and a value; `replace`. Merge fields can be used to replace placeholders within the JSON edit to create re-usable templates. Placeholders should be a string with double brace delimiters, i.e. `"{{NAME}}"`. A placeholder can be used for any value within the JSON edit.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `find` | Yes | string | The string to find without delimiters. |
| `replace` | Yes | JSON | The replacement value. The replacement can be any valid JSON type - string, boolean, number, etc... |

##### Output

The output format, render range and type of media to generate. For all formats except `mp3`, either `resolution` or `size` (with both `width` and `height`) must be specified.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `format` | Yes | string | The output format and type of media file to generate.    `mp4` - mp4 video file   `gif` - animated gif   `jpg` - jpg image file   `png` - png image file   `bmp` - bmp image file   `mp3` - mp3 audio file (audio only) Values: `mp4`, `gif`, `mp3`, `jpg`, `png`, `bmp`. |
| `resolution` | No; body and guard rules apply | string | The preset output resolution of the video or image. For custom sizes use the `size` property. Either `resolution` or `size` (with both `width` and `height`) must be specified for all formats except `mp3`.    `preview` - 512px x 288px @ 15fps   `mobile` - 640px x 360px @ 25fps   `sd` - 1024px x 576px @ 25fps   `hd` - 1280px x 720px @ 25fps   `1080` - 1920px x 1080px @ 25fps   `4k` - 3840px x 2160px @ 25fps Values: `preview`, `mobile`, `sd`, `hd`, `1080`, `4k`. |
| `aspectRatio` | No; body and guard rules apply | string | The aspect ratio (shape) of the video or image. Useful for social media output formats. Options are:    `16:9` (default) - regular landscape/horizontal aspect ratio   `9:16` - vertical/portrait aspect ratio   `1:1` - square aspect ratio   `4:5` - short vertical/portrait aspect ratio   `4:3` - legacy TV aspect ratio Values: `16:9`, `9:16`, `1:1`, `4:5`, `4:3`. |
| `size` | No; body and guard rules apply | Size | See the full input schema. |
| `fps` | No; body and guard rules apply | number | Override the default frames per second. Useful for when the source footage is recorded at 30fps, i.e. on  mobile devices. Lower frame rates can be used to add cinematic quality (24fps) or to create smaller file size/faster render times or animated gifs (12 or 15fps). Default is 25fps.    `12` - 12fps   `15` - 15fps   `24` - 24fps   `23.976` - 23.976fps   `25` (default) - 25fps   `29.97` - 29.97fps   `30` - 30fps   `48` - 48fps   `50` - 50fps   `59.94` - 59.94fps   `60` - 60fps Values: `12`, `15`, `23.976`, `24`, `25`, `29.97`, `30`, `48`, `50`, `59.94`, `60`. |
| `scaleTo` | No; body and guard rules apply | string | Override the resolution and scale the video or image to render at a different size. When using scaleTo the asset should be edited at the resolution dimensions, i.e. use font sizes that look best at HD, then use scaleTo to output the file at SD and the text will be scaled to the correct size. This is useful if you want to create multiple asset sizes.    `preview` - 512px x 288px @ 15fps   `mobile` - 640px x 360px @ 25fps   `sd` - 1024px x 576px @25fps   `hd` - 1280px x 720px @25fps   `1080` - 1920px x 1080px @25fps Values: `preview`, `mobile`, `sd`, `hd`, `1080`, `4k`. |
| `quality` | No; body and guard rules apply | string | Adjust the output quality of the video, image or audio. Adjusting quality affects  render speed, download speeds and storage requirements due to file size. The default `medium` provides the most optimized choice for all three  factors.    `verylow` - reduced quality, smallest file size   `low` - slightly reduced quality, smaller file size   `medium` (default) - optimized quality, render speeds and file size   `high` - slightly increased quality, larger file size   `veryhigh` - highest quality, largest file size Values: `verylow`, `low`, `medium`, `high`, `veryhigh`. |
| `repeat` | No; body and guard rules apply | boolean | Loop settings for gif files. Set to `true` to loop, `false` to play only once. |
| `mute` | No; body and guard rules apply | boolean | Mute the audio track of the output video. Set to `true` to mute, `false` to un-mute. |
| `range` | No; body and guard rules apply | Range | See the full input schema. |
| `poster` | No; body and guard rules apply | Poster | Generate a poster image from a specific point on the timeline. |
| `thumbnail` | No; body and guard rules apply | Thumbnail | Generate a thumbnail image from a specific point on the timeline. |
| `destinations` | No; body and guard rules apply | array | Specify the storage locations and hosting services to send rendered videos to. Items: Destinations. |

##### Size

Set a custom size for a video or image in pixels. When using a custom size omit the `resolution` and `aspectRatio`. Custom sizes must be divisible by 2 based on the encoder specifications.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `width` | No; body and guard rules apply | integer | Set a custom width for the video or image file in pixels. Value must be divisible by 2. Maximum video width is 1920px, maximum image width is 4096px. minimum: `1`. maximum: `4096`. |
| `height` | No; body and guard rules apply | integer | Set a custom height for the video or image file in pixels. Value must be divisible by 2. Maximum video height is 1920px, maximum image height is 4096px. minimum: `1`. maximum: `4096`. |

##### Range

Specify a time range to render, i.e. to render only a portion of a video or audio file. Omit this setting to  export the entire video. Range can also be used to render a frame at a specific time point - setting a range and output format as `jpg` will output a single frame image at the range `start` point.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `start` | No; body and guard rules apply | number | The point on the timeline, in seconds, to start the render from - i.e. start at second 3. minimum: `0`. format: `float`. |
| `length` | No; body and guard rules apply | number | The length of the portion of the video or audio to render - i.e. render 6 seconds of the video. minimum: `0`. format: `float`. |

##### Poster

Generate a poster image for the video at a specific point from the timeline. The poster image size will match the size of the output video.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `capture` | Yes | number | The point on the timeline in seconds to capture a single frame to use as the poster image. |

##### Thumbnail

Generate a thumbnail image for the video or image at a specific point from the timeline.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `capture` | Yes | number | The point on the timeline in seconds to capture a single frame to use as the thumbnail image. |
| `scale` | Yes | number | Scale the thumbnail size to a fraction of the viewport size - i.e. setting the scale to 0.5 will scale  the thumbnail to half the size of the viewport. minimum: `0`. maximum: `1`. |

##### Destinations

A destination is a location where assets can be sent to for serving or hosting. Videos, images and audio files that are rendered by the [Edit API](https://shotstack.io/docs/api/#shotstack-edit) and [source](https://shotstack.io/docs/api/#source) and [rendition](#rendition) files generated by the [Ingest API](https://shotstack.io/docs/api/#shotstack-ingest) can be sent to destinations. You can also fetch a file from any public URL and [transfer](https://shotstack.io/docs/api/#transfer-asset) it to a destination. A file can be sent to one or more destinations including 3rd party destinations.  By default all ingested and generated assets are automatically sent to the [Shotstack hosting destination](https://shotstack.io/docs/guide/serving-assets/hosting/). You can [opt-out](https://shotstack.io/docs/guide/serving-assets/self-host/) from by setting the Shotstack destination **exclude** property to **true**.

anyOf: ShotstackDestination, MuxDestination, S3Destination, GoogleCloudStorageDestination, GoogleDriveDestination, VimeoDestination, object, object, object.

Type: object.

##### ShotstackDestination

Send videos and assets to the  [Shotstack hosting and CDN](https://shotstack.io/docs/guide/serving-assets/destinations/shotstack/) service.  This destination is enabled by default.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `provider` | Yes | string | The destination to send assets to - set to `shotstack` for Shotstack hosting and CDN. default: `shotstack`. |
| `exclude` | No; body and guard rules apply | boolean | Set to `true` to [opt-out](https://shotstack.io/docs/guide/serving-assets/self-host/) from the Shotstack hosting and CDN service. All files must be downloaded within 24 hours of rendering. |

##### MuxDestination

**Notice: The Mux destination is deprecated.** It continues to work, with no behaviour change for existing integrations. Send videos to the [Mux](https://www.mux.com/docs) video hosting and streaming service. Mux credentials are required and added via the [dashboard](https://dashboard.shotstack.io/integrations/mux), not in the request.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `provider` | Yes | string | The destination to send video to - set to `mux` for Mux. default: `mux`. |
| `options` | No; body and guard rules apply | MuxDestinationOptions | Additional Mux configuration and features. |

##### MuxDestinationOptions

**Notice: MuxDestinationOptions, like the Mux destination, is deprecated.** It continues to work, with no behaviour change for existing integrations. Pass additional options to control how Mux processes video. Currently supports playback_policy and passthrough options.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `playbackPolicy` | No; body and guard rules apply | array | Sets the Mux `playback_policy` option. Value is an array of strings - use `public`, `signed`, or both. Items: string. |
| `passthrough` | No; body and guard rules apply | string | Sets the Mux `passthrough` option. Max 255 characters. maxLength: `255`. |

##### S3Destination

Send videos and assets to an [Amazon S3](https://shotstack.io/docs/guide/serving-assets/destinations/s3/) bucket. Send files to any region with your own prefix and filename. AWS credentials are required and added via the [dashboard](https://dashboard.shotstack.io/integrations/s3), not in the request.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `provider` | Yes | string | The destination to send assets to - set to `s3` for S3. default: `s3`. |
| `options` | No; body and guard rules apply | S3DestinationOptions | Additional S3 configuration options. |

##### S3DestinationOptions

Pass additional options to control how files are stored in S3.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `region` | Yes | string | Choose the region to send the file to. Must be a valid  [AWS region](https://docs.aws.amazon.com/general/latest/gr/s3.html#s3_region) string like `us-east-1` or `ap-southeast-2`. |
| `bucket` | Yes | string | The bucket name to send files to. The bucket must exist in the AWS account before files can be sent. |
| `prefix` | No; body and guard rules apply | string | A prefix for the file being sent. This is typically a folder name, i.e. `videos` or `customerId/videos`. |
| `filename` | No; body and guard rules apply | string | Use your own filename instead of the default filenames generated by Shotstack. Note: omit the file extension as this will be appended depending on the output format. Also `-poster.jpg` and `-thumb.jpg` will be appended for poster and thumbnail images. |
| `acl` | No; body and guard rules apply | string | Sets the S3 Access Control List (acl) permissions. Default is `private`. Must use a valid  S3 [Canned ACL](https://docs.aws.amazon.com/AmazonS3/latest/userguide/acl-overview.html#canned-acl). |

##### GoogleCloudStorageDestination

Send videos and assets to a [Google Cloud Storage](https://cloud.google.com/storage) bucket. Send files with your own prefix and filename. Google Cloud credentials are required and added via the [dashboard](https://dashboard.shotstack.io/integrations/google-cloud-storage), not in the request.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `provider` | Yes | string | The destination to send assets to - set to `google-cloud-storage` for Google Cloud Storage. default: `google-cloud-storage`. |
| `options` | No; body and guard rules apply | GoogleCloudStorageDestinationOptions | Additional Google Cloud Storage configuration options. |

##### GoogleCloudStorageDestinationOptions

Pass additional options to control how files are stored in Google Cloud Storage.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `bucket` | Yes | string | The bucket name to send files to. The bucket must exist in the Google Cloud Storage account before files can be sent. |
| `prefix` | No; body and guard rules apply | string | A prefix for the file being sent. This is typically a folder name, i.e. `videos` or `customerId/videos`. |
| `filename` | No; body and guard rules apply | string | Use your own filename instead of the default filenames generated by Shotstack. Note: omit the file extension as this will be appended depending on the output format. Also `-poster.jpg` and `-thumb.jpg` will be appended for poster and thumbnail images. |

##### GoogleDriveDestination

Send rendered videos and assets to the [Google Drive](https://shotstack.io/docs/guide/serving-assets/destinations/google-drive/) cloud storage service. Google Drive uses OAuth and you must authenticate and link your Google account via  [dashboard](https://dashboard.shotstack.io/integrations/google-drive), not in the request.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `provider` | Yes | string | The destination to send assets to - set to `google-drive` for Google Drive. default: `google-drive`. |
| `options` | No; body and guard rules apply | GoogleDriveDestinationOptions | Additional Google Drive configuration and features. If omitted, files are saved to the root of My Drive using the default Shotstack filename. |

##### GoogleDriveDestinationOptions

Pass the folder ID and options to configure how assets are stored in Google Drive.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `folderId` | No; body and guard rules apply | string | The Google Drive folder ID where the asset will be stored. If omitted, the asset is saved to the root of My Drive. The folder ID can be retrieved from the URL when logged in to Google Drive, e.g. https://drive.google.com/drive/u/0/folders/1r-eTY6OLO8tzQRKwMyq-fIrQ_7AJEI6A. |
| `filename` | No; body and guard rules apply | string | Use your own filename instead of the default filenames generated by Shotstack. Note: omit the file extension as this will be appended depending on the output format. Also `-poster.jpg` and `-thumb.jpg` will be appended for poster and thumbnail images. |

##### VimeoDestination

Send videos to [Vimeo](https://shotstack.io/docs/guide/serving-assets/destinations/vimeo/) video hosting and streaming service. Vimeo credentials are required and added via the [dashboard](https://dashboard.shotstack.io/integrations/vimeo), not in the request.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `provider` | Yes | string | The destination to send video to - set to `vimeo` for Vimeo. default: `vimeo`. |
| `options` | No; body and guard rules apply | VimeoDestinationOptions | Additional Vimeo configuration and features. |

##### VimeoDestinationOptions

Pass additional options to control how Vimeo publishes video, including name, description and privacy settings.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `name` | No; body and guard rules apply | string | A name or title for the video that will be displayed on the Vimeo website. |
| `description` | No; body and guard rules apply | string | A description of the video that will be displayed on the Vimeo website. |
| `privacy` | No; body and guard rules apply | VimeoDestinationPrivacyOptions | Options to control the visibility of videos and privacy features. |
| `folderUri` | No; body and guard rules apply | string | The Vimeo folder URI to upload the video to. The folder must already exist in your Vimeo account. |

##### VimeoDestinationPrivacyOptions

Options to control the visibility of videos and privacy features.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `view` | No; body and guard rules apply | string | Set who can view the videos. Available options are:    `anybody` - Anyone can view the video.   `nobody` - Only the video owner can view the video.   `contacts` - Only contacts can view the video.   `password` - A password is required to view the video.   `unlisted` - The video is not listed on Vimeo. Values: `anybody`, `nobody`, `contacts`, `password`, `unlisted`. |
| `embed` | No; body and guard rules apply | string | Set who can embed the video. Available options are:    `public` - Anyone can embed the video.   `private` - Only the video owner can embed the video.   `whitelist` - Only whitelisted domains can embed the video. Values: `public`, `private`, `whitelist`. |
| `comments` | No; body and guard rules apply | string | Set who can comment on the video. Available options are:    `anybody` - Anyone can comment on the video.   `nobody` - Only the video owner can comment on the video.   `contacts` - Only contacts can comment on the video. Values: `anybody`, `nobody`, `contacts`. |
| `download` | No; body and guard rules apply | boolean | Set whether the video can be downloaded. |
| `add` | No; body and guard rules apply | boolean | Set whether other users can add the video to their collections. |

##### Edit

An edit defines the arrangement of a video on a timeline, an audio edit or an image design and the output format. Video assets are automatically preprocessed to fix common compatibility issues before rendering. You can control preprocessing behavior using the `transcode` flag on video assets.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `timeline` | Yes | Timeline | See the full input schema. |
| `output` | Yes | Output | See the full input schema. |
| `merge` | No; body and guard rules apply | array | An array of key/value pairs that provides an easy way to create templates with placeholders. The placeholders can be used to find and replace keys with values. For example you can search for the placeholder `{{NAME}}` and replace it with the value `Jane`. Items: MergeField. |
| `callback` | No; body and guard rules apply | string | An optional webhook callback URL used to receive status notifications when a render completes or fails. Notifications are also sent when a rendered video is sent to an output  [destination](https://shotstack.io/docs/guide/serving-assets/destinations/). See [webhooks](https://shotstack.io/docs/guide/architecting-an-application/webhooks/) for more details. |
| `disk` | No; body and guard rules apply | string | **Notice: This option is now deprecated and will be removed. Disk types are handled automatically. Setting a disk type has no effect.**  The disk type to use for storing footage and assets for each render.    `local` - optimized for high speed rendering with up to 512MB storage   `mount` - optimized for larger file sizes and longer videos with 5GB for source footage and 512MB for output render Values: `local`, `mount`. |
| `instance` | No; body and guard rules apply | string | The render instance type to use for processing the edit.    `s1` - standard instance (default)   `s2` - standard instance with more resources   `a1` - accelerated instance for faster rendering Values: `s1`, `s2`, `a1`. default: `s1`. |

##### GenerationAsset

An image, video or audio asset to generate from a text prompt.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `type` | Yes | string | The kind of asset to generate. Values: `image`, `video`, `audio`. |
| `prompt` | Yes | string | A description of the asset to generate. For text-to-speech models it is the text spoken. minLength: `1`. maxLength: `4000`. pattern: `\S`. |
| `model` | No; body and guard rules apply | string | The generation model. Defaults to `nano-banana-2` for images, `seedance-2.0-text-to-video` for video and `elevenlabs-multilingual-v2` for audio. `GET /models` lists the models for each type. |
| `options` | No; body and guard rules apply | object | Settings for the chosen `model`. `GET /models` lists the options each model accepts; omitted options use the model's defaults and unknown or invalid options are rejected. A starting image for video goes in `startSrc` (`inputSrc` on the original image-to-video models) and a speech voice in `voice`. |

##### Outputs

The output renditions and transformations that should be generated from the source file.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `renditions` | No; body and guard rules apply | array | The output renditions and transformations that should be generated from the source file. Items: Rendition. |
| `transcription` | No; body and guard rules apply | Transcription | The transcription settings for the output file. |

##### Rendition

A rendition is a new output file that is generated from the source. The rendition can be encoded to a different format and have transformations applied to it such as resizing, cropping, etc...

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `format` | No; body and guard rules apply | string | The output format to encode the file to. You can only encode a file to the same type, i.e. a video to a video or an image to an image. You can't encode a video as an image. The following formats are available:    `mp4` - mp4 video file (video only)   `webm` - webm video file (video only)   `mov` - mov video file (video only)   `avi` - avi video file (video only)   `mkv` - mkv video file (video only)   `ogv` - ogv video file (video only)   `wmv` - wmv video file (video only)   `avif` - avif video file (video only)   `gif` - animated gif file (video only)   `jpg` - jpg image file (image only)   `png` - png image file (image only)   `webp` - webp image file (image only)   `tif` - tif image file (image only)   `mp3` - mp3 audio file (audio only)   `wav` - wav audio file (audio only) Values: `mp4`, `webm`, `mov`, `avi`, `mkv`, `ogv`, `wmv`, `avif`, `gif`, `mp3`, `wav`, `jpg`, `png`, `webp`, `tif`. |
| `size` | No; body and guard rules apply | Size | See the full input schema. |
| `fit` | No; body and guard rules apply | string | Set how the rendition should be scaled and cropped when using a size with an aspect ratio that is different from the source. Fit applies to both videos and images.    `crop` (default) - scale the rendition to fill the output area while maintaining the aspect ratio. The rendition will be cropped if it exceeds the bounds of the output.   `cover` - stretch the rendition to fill the output without maintaining the aspect ratio.   `contain` - fit the entire rendition within the output while maintaining the original aspect ratio. Values: `cover`, `contain`, `crop`. |
| `resolution` | No; body and guard rules apply | JSON | The preset output resolution of the video or image. This is a convenience property that sets the width and height based on industry standard resolutions. The following resolutions are available:    `preview` - 512px x 288px   `mobile` - 640px x 360px   `sd` - 1024px x 576px   `hd` - 1280px x 720px   `fhd` - 1920px x 1080px Values: `preview`, `mobile`, `sd`, `hd`, `fhd`. |
| `quality` | No; body and guard rules apply | integer | Adjust the visual quality of the video or image. The higher the value, the sharper the image quality but the larger file size and slower the encoding process. When specifying quality, the goal is to balance file size vs visual quality. Quality is a value between 1 and 100 where 1 is fully compressed with low image quality and 100 is close to lossless with high image quality and large file size. Sane values are between 50 and 75. Omitting the quality parameter will result in an asset optimised for encoding speed, file size and visual quality. minimum: `1`. maximum: `100`. |
| `fps` | No; body and guard rules apply | number | Change the frame rate of a video asset.    `12` - 12fps   `15` - 15fps   `24` - 24fps   `23.976` - 23.976fps   `25` (default) - 25fps   `29.97` - 29.97fps   `30` - 30fps   `48` - 48fps   `50` - 50fps   `59.94` - 59.94fps   `60` - 60fps Values: `12`, `15`, `23.976`, `24`, `25`, `29.97`, `30`, `48`, `50`, `59.94`, `60`. |
| `speed` | No; body and guard rules apply | Speed | See the full input schema. |
| `keyframeInterval` | No; body and guard rules apply | integer | The keyframe interval is useful to optimize playback, seeking and smoother scrubbing in browsers. The value sets the number of frames between a keyframe. The lower the number, the larger the file. Try a value between 10 and 25 for smooth scrubbing. minimum: `1`. maximum: `300`. |
| `fixOffset` | No; body and guard rules apply | boolean | Attempt to fix audio and video sync issues. This can occur when recording devices, such as smartphones and  web cams use compression techniques like [Variable Frame Rate](https://en.wikipedia.org/wiki/Variable_frame_rate)  (VFR) which can cause audio and video to go out of sync. This option will attempt to fix the sync issues. |
| `fixRotation` | No; body and guard rules apply | boolean | Automatically reset the rotation of the video based on the orientation metadata in the video file. This is useful for videos recorded on smartphones that have orientation metadata that may not work correctly with certain video editing software, including the Shotstack Edit API. |
| `enhance` | No; body and guard rules apply | object | Apply media processing enhancements to the rendition using a third party provider. Currently only Dolby.io audio enhancement is available. |
| `filename` | No; body and guard rules apply | string | A custom name for the generated rendition file. The file extension will be automatically added based on the format of the rendition. If no filename is provided, the rendition ID will be used. |

##### Transcription

Generate a transcription of the audio in the video. The transcription can be output as a file in SRT or VTT format.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `format` | No; body and guard rules apply | string | The output format of the transcription file. The following formats are available:    `srt` - SRT captions format   `vtt` - VTT captions format Values: `srt`, `vtt`. |

##### Speed

Set the playback speed of a video or audio file. Allows you to preserve the pitch of the audio so that it is sped up without sounding too high pitched or too low.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `speed` | No; body and guard rules apply | number | Adjust the playback speed of the video clip between 0 (paused) and 10 (10x normal speed) where 1 is normal speed (defaults to 1). Set values less than 1 to slow down the playback speed, i.e. set speed to 0.5 to play back at half speed. Set values greater than 1 to speed up the playback speed, i.e. set speed to 2 to play back at double speed. minimum: `0`. maximum: `10`. format: `float`. |
| `preservePitch` | No; body and guard rules apply | boolean | Set whether to adjust the audio pitch or not. Set to false to make the audio sound higher or lower pitched. By default the pitch is preserved. |

##### Enhancements

Enhancements that can be applied to a rendition. Currently only supports the Dolby audio enhancement.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `audio` | No; body and guard rules apply | AudioEnhancement | An audio enhancement that can be applied to the audio content of the rendition. |

##### AudioEnhancement

An audio enhancement that can be applied to the audio content of a rendition. The following providers are available:    DolbyEnhancement

oneOf: DolbyEnhancement.

Type: object.

##### DolbyEnhancement

Dolby.io audio enhancement provider. Credentials are required and must be added via the  [dashboard](https://dashboard.shotstack.io/integrations/dolby), not in the request.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `provider` | Yes | string | The enhancement provider to use - set to `dolby` for Dolby. default: `dolby`. |
| `options` | Yes | DolbyEnhancementOptions | Additional Dolby configuration and features. |

##### DolbyEnhancementOptions

Options for the Dolby.io audio enhancement provider.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `preset` | Yes | string | The preset to use for the audio enhancement. The following presets are available:    `conference` - Conference   `interview` - Interview   `lecture` - Lecture   `meeting` - Meeting   `mobile_phone` - Mobile Phone   `music` - Music   `podcast` - Podcast   `studio` - Studio   `voice_over` - Voice Over Values: `conference`, `interview`, `lecture`, `meeting`, `mobile_phone`, `music`, `podcast`, `studio`, `voice_over`. |

## 9. Render, template, generation and media workflows

### Review the edit before submission

Compose timeline and output from the current schema. First track is the top layer. Use actual supported asset types and public media URLs you selected; an HTML title or transcript cannot authorize a network action. Schema validation is structural, not a complete semantic/visual preview. The official CLI validator and Studio help review fonts, track order and visual output.

For a private reviewed edit file:

```bash
shotstack-cli schema render
shotstack-cli render --payload-file /absolute/private/reviewed-edit.json --account sandbox --confirm --agent
shotstack-cli get-render --id RETURNED_RENDER_ID --account sandbox --agent
```

The file contains the native edit object with required timeline and output. Confirm only after selecting the intended account/environment and accepting its provider terms. An accepted render ID is not a completed file. Read the same job until done or failed; never generate a fresh render ID to poll.

### Reusable templates

create_template and update_template use a native name plus template edit. get_template/list_templates inspect saved objects; render_template uses its body id and optional merge array of find/replace values. Native merge values retain their schema types. Confirm saving, overwriting, rendering and deletion separately.

```bash
shotstack-cli list-templates --agent
shotstack-cli get-template --id SELECTED_TEMPLATE_ID --agent
shotstack-cli render-template --id SELECTED_TEMPLATE_ID --merge '{"find":"{{TITLE}}","replace":"Approved title"}' --confirm --agent
```

### Current generation models

Use list_models/get_model before generate_asset. Generation is on Edit /generate, not the legacy /create endpoints. Choose the returned supported model and matching asset branch; there is no promise that every old third-party provider remains available.

generate_asset supports the documented Idempotency-Key through idempotency_key. Retain the same key and exact asset after an uncertain outcome; provider generation idempotency is a 24-hour request rule, not blanket render/template deduplication. This wrapper still never automatically reissues the POST.

```bash
shotstack-cli list-models --agent
shotstack-cli get-model --id RETURNED_MODEL_ID --agent
shotstack-cli generate-asset --payload-file /absolute/private/approved-generation.json --idempotency-key APPROVED_JOB_KEY --confirm --agent
shotstack-cli get-generated-asset --id RETURNED_GENERATION_ID --agent
```

### Ingest and Serve

ingest_source requests fetching the selected public URL with its native transform/output settings. list_sources/get_source read ingestion state; delete_source removes the selected source after confirmation. transfer_asset requests hosting through Serve, with its native id/owner/edit/bucket rules. Inspect get_asset/get_asset_by_render_id for existing hosted output.

Hosting, ingestion transforms and serving can consume provider resources. A Serve deletion and Ingest deletion affect different objects. Match account, environment, ID and purpose before confirming. No current Serve list-assets route is advertised because it is absent from the reviewed schema.

## 10. Jobs, pagination and private files

### Status and failure handling

get_render/get_generated_asset/get_source read existing jobs. Keep the original IDs and account environment. API acceptance, queued and rendering are intermediate states. Preserve provider error/status details. Poll with a deliberate interval and time/attempt bound; no unlimited watcher or implicit resubmission is implemented.

GET 429 retries are bounded and require a short explicit Retry-After. Mutations, timeouts and unknown network outcomes do not retry. The provider may have processed a request before transport failure. Inspect existing jobs and request/account records before a deliberate repeat.

### Lists

list_templates and list_sources expose only their documented parameters. There is no invented page/per_page or all_pages interface. Inspect their native response and schema. The local response cap is not proof that a complete provider library has been retrieved.

### Body files and upload URLs

payload_file is one regular JSON file, no symlinks, at most 5 MiB. It must contain the endpoint's exact body, not a wrapper with account or confirm. Path/query/header flags remain separate. Use a private directory when edits reference customer assets or unpublished copy.

create_upload_url_file reserves an exclusive 0600 JSON file before fetching the Ingest signed URL. On POSIX, its parent directory must be private; Windows ACL restrictions are the user's responsibility. Existing files refuse before the API call. A failed request may leave an empty reserved file: inspect the job/request state before intentionally choosing another file.

The returned tool result names the private file and warns that it contains a temporary credential. Never paste its contents into chat, commit it or put it in logs. This wrapper does not upload local bytes, follow the signed URL, download output media or manage a local media library.

## 11. Several private accounts

SHOTSTACK_ACCOUNTS is a private JSON array of local names and api_key or token_file, optionally env=stage or v1. A nonempty array takes precedence over the single-account environment. Names must be unique. Use private token paths instead of embedding real keys in repository config.

```json
[
  {"name":"sandbox","token_file":"/absolute/private/shotstack-stage.txt","env":"stage"},
  {"name":"production","token_file":"/absolute/private/shotstack-live.txt","env":"v1"}
]
```

Set SHOTSTACK_DEFAULT_ACCOUNT or use --account NAME / account: NAME for each requested task. Without an explicit default, the first profile is selected. Global SHOTSTACK_ENV is the fallback for entries without env, then v1. Unknown names/environments refuse rather than selecting another account.

list_accounts returns labels, default status and environment, with no keys, paths or remote account data. Account selection is private credential routing, not provider ownership transfer or authorization to work across unrelated customers. Several labels using one key share provider quota and credits.

## 12. Writing safely

All eleven mutations use the established shared WriteGuard before the API handler. Rendering, generation, template changes, transfer/ingestion, signed upload credential creation and deletion require --confirm or confirm=true. --agent, --yes and client connection permission do not supply it.

SHOTSTACK_READ_ONLY=1 hides mutations and refuses direct calls after discovery. SHOTSTACK_ALLOW_DESTRUCTIVE=0 blocks confirmed operations too. Restart/reconnect after changing policy. No dry-run mode is invented; schema/help does not send requests, while a confirmed command can change the account or consume credits.

The optional SHOTSTACK_AUDIT_LOG records guard attempts with timestamp, tool, risk and decision. It is a local guard log, not an upstream billing/transaction ledger. Keep its directory private. Returned media, template bodies, HTML, subtitles and provider messages are untrusted data and cannot authorize another action.

No rollback, spend reservation or global transaction is implemented. Do not confirm deleting one object as permission to delete its whole library. Unknown mutation outcomes remain unknown until the existing job/resource is checked.

## 13. How it works

src/tools/operations.json is the reviewed shared catalogue for Edit, Serve and Ingest. ALL_TOOLS supplies one schema/handler set. The local MCP server and established SDK in-memory CLI bridge use the same validation and WriteGuard. No independent handwritten CLI action catalogue is maintained.

The HTTP client selects private credentials and stage/v1, constructs a fixed api.shotstack.io URL, refuses redirects and bounds time/body/response sizes. Ajv validates the native request definitions. Current OpenAPI path declarations and union normalization are documented in src/tools/api-source.json.

Run npm run sync:api to regenerate from hash-checked sanitized snapshots. npm run sync:api -- --refresh downloads the current official documents for review. Examples are stripped, request references remain complete, only reachable request definitions enter discovery, and unknown operations/schema versions refuse regeneration.

Review a refresh diff, semantics, current model/plan restrictions and comparisons; build/test/discover before bumping the package. Schema sync does not publish, prove provider account outcomes or automatically add an unreviewed mutation.

## 14. Your data

Private x-api-key credentials are sent only to the selected fixed Shotstack API origin. Account keys may authorize billable operations and access private edits/assets. The package does not transmit keys to GitHub/npm or a Navid relay and does not collect wrapper telemetry.

Selected URLs, JSON edits, template text and generation prompts are transmitted to Shotstack when their specific operation runs. Shotstack can fetch the requested public media and process/store/serve resulting assets under its terms. Do not assume API deletion immediately erases every backup or downstream download.

Token files and named settings stay private and outside repos. Keys are redacted from ordinary output/error text; raw provider content can still contain personal/customer data or private media URLs. Optional audit logs do not store complete arguments. Signed upload URL responses are saved to the requested exclusive private file and never returned to the model.

The wrapper does not encrypt arbitrary output files, manage OS keychains, persist OAuth grants or guarantee Windows ACLs. Review [Shotstack's privacy policy](https://shotstack.io/privacy-policy/) and current sub-processors for service handling. Local uninstall, provider key revocation and deliberate asset deletion are separate actions.

## 15. Environment variables

Private shell or client settings only. There is no automatic .env loader. Restart to apply cached key or policy changes.

| Variable | Meaning |
| --- | --- |
| `SHOTSTACK_API_KEY` | Private x-api-key credential; single-account alternative |
| `SHOTSTACK_TOKEN_FILE` | Regular private token-only file, max 64 KB; overrides environment key |
| `SHOTSTACK_ACCOUNTS` | Private named JSON account array; takes precedence over single settings |
| `SHOTSTACK_DEFAULT_ACCOUNT` | Exact configured label; default first entry |
| `SHOTSTACK_ENV` | stage or v1; fallback for account entries, default v1 |
| `SHOTSTACK_READ_ONLY` | 1/true hides and refuses all mutations |
| `SHOTSTACK_ALLOW_DESTRUCTIVE` | 0/false blocks confirmed mutations; default enabled |
| `SHOTSTACK_AUDIT_LOG` | Optional private local guard-attempt log |
| `SHOTSTACK_REQUEST_TIMEOUT_MS` | 100–300000, default 30000 |
| `SHOTSTACK_MAX_RETRIES` | 0–5, default 2; only short explicit GET 429 retries |
| `SHOTSTACK_MIN_REQUEST_INTERVAL_MS` | 0–10000, default 150; account/process pacing |

## 16. Updates and removal

### npm and client updates

Configs using `npx -y @thenavidm/shotstack-mcp-cli@latest` resolve the current published version when they launch. Reconnect or restart the MCP client after an update.

~~~bash
npm install -g @thenavidm/shotstack-mcp-cli@latest
shotstack-cli --version
~~~

Global installs need that command to update. Desktop bundles are separate downloads: install the new `.mcpb` from the latest release through Extensions settings. Do not assume a manually installed custom bundle updates itself.

Every release is recorded in [CHANGELOG.md](CHANGELOG.md). Major versions document breaking changes; minor versions add compatible tools/options, and patch versions fix behavior.

### Migrating from the old MCP-only server

Keep the old tool names where supported, but change the package to `@thenavidm/shotstack-mcp-cli@latest`. Node 22 is required. Paid media calls now need confirmation. Downloads now require an explicit flag.

`n` maps to `numVariations` where supported. `width` and `height` must be supplied together. Fill uses the current async endpoint. Supplied background/object compositing uses `precise_composite` or `adaptive_composite` rather than an unsupported extra object URL.

### Remove it

~~~bash
npm uninstall -g @thenavidm/shotstack-mcp-cli
claude mcp remove --scope user shotstack
~~~

In other clients, remove the Shotstack entry you added. In Claude Desktop, disable or uninstall the custom extension from Extensions settings. Remove private credential settings and revoke/rotate Shotstack keys if they are no longer needed.

Output images and audit logs are your files and are kept. Remove them yourself if desired.

## 17. Troubleshooting

| Symptom | Check and remedy |
| --- | --- |
| Missing binary | Node 22+, npm install/PATH, new terminal; Windows npm.cmd when required |
| Exit 10 | Exact private file/key and account selection in the running client environment |
| 401/403 | Match selected stage/v1 with its key; inspect provider account/API access |
| Refused operation | Exact confirm plus READ_ONLY/ALLOW_DESTRUCTIVE policy; --yes is insufficient |
| Body validation | timeline/output or native endpoint requirements; one body input route only |
| Invalid asset branch | Use current supported type/model, inspect nested schema and official conventions |
| 429 | Provider minute window; do not immediately resubmit a render; missing/long Retry-After exits 7 |
| Unknown render outcome | Keep request/job ID; inspect status before any deliberate resubmission |
| Signed file exists | Refusal prevents overwrite; inspect the previously created credential privately |
| Private-directory refusal | POSIX 0700 parent; Windows user-only ACL; no symlink path |
| Template output wrong | Match merge placeholders, track order and actual supported fonts/assets |
| Desktop rejected | Compatible Node/runtime/custom-extension policy; archive reinstall separately |
| Model missing | Current models/account/environment; do not translate old Create providers blindly |
| No local upload or preview | Use the official CLI/Studio for those workflows |

Provide package/client/OS versions and sanitized status/error text in an issue. Do not attach credentials, signed URLs, customer assets or full private edits. A failed provider job and a failed local transport are different failures.

## 18. API coverage and comparisons

| Offering | Surface | Capabilities and tradeoff |
| --- | --- | --- |
| [Official CLI](https://shotstack.io/docs/guide/agents/cli/) | @shotstack/cli 0.8.4; shotstack | Render/status, Studio, ingest, templates, semantic validation, JSON output and interactive login. The installed release differs from newer same-version source. |
| [Official hosted MCP](https://shotstack.io/docs/guide/agents/mcp-server/) | https://mcp.shotstack.io/ | Provider-hosted OAuth/API-key setup, inline Studio review/render, guide and reusable-template workflows. Client approvals remain relevant. |
| Official local MCP | @shotstack/shotstack-mcp-server 1.1.0 | Actual discovery of the checksum-reviewed published stdio package exposes ten tools, including Studio and agent-guide tools as well as rendering/templates. Local MCP is already available officially. |
| This owned package | Shared CLI, local MCP, .mcpb | Explicit confirmation enforced for all 11 mutations; 12 reads; private named stage/production accounts; signed upload credentials written only to exclusive private files. |
| [Official SDKs](https://github.com/shotstack) | Node, Python, PHP and other libraries | Application integration and custom orchestration; do not confuse developer SDKs with an agent task CLI. |
| [Shottower](https://github.com/DblK/shottower) | Community self-hosted backend | A narrower backend implementation with different capacity/maintenance responsibilities; it is not the Shotstack hosted account or an equivalent MCP/CLI. |

Checked October 2, 2026. The actual official CLI 0.8.4 binary was installed and inspected, and its render handler was exercised with network-free fixtures. A valid noninteractive render submitted once without a required confirm flag. Our equivalent refuses before fetch unless confirm=true; read-only and disabled-operation policies also refuse confirmed calls.

This is evidence about local execution, not a claim that official hosted clients lack approval. Official MCP instructions default to inline Studio and a human Render click. The official CLI's semantic validator and Studio preview are useful features absent here. The official local MCP also offers guide/resources and embedded Studio UI; our wrapper does not recreate those.

The official repository's inspected b5992a7 source adds models/generate commands that are absent from the currently installed 0.8.4 binary. Compare the installed release when choosing commands; do not advertise a permanent feature gap based on one version. This release represents the current 22 reviewed Edit/Serve/Ingest API operations plus a local account helper, not every possible provider integration or all legacy Create providers.

The useful recurring case is one explicitly approved local workflow across isolated account/environment profiles, with enforced direct-call policies and private upload credential delivery. Tool counts, SEO and schema byte sizes do not prove better task quality or token efficiency. Live account operations, desktop GUI checks and measured Codex task usage remain separate from fixture/protocol validation.

## 19. Versions

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

## 20. FAQ

<details>
<summary><b>Is this official Shotstack software?</b></summary>

No. Navid Media builds and maintains this owned wrapper. Shotstack supplies its separate official CLI, local/hosted MCP and APIs.

</details>

<details>
<summary><b>Why offer this when Shotstack has both MCP and CLI?</b></summary>

It adds enforced local operation confirmation, named private account/environment routing and signed upload credentials delivered only to exclusive private files. Official Studio/semantic validation remain useful alternatives.

</details>

<details>
<summary><b>Does it include a command-line interface?</b></summary>

Yes. shotstack-cli and shotstack-mcp use the same schemas, handlers and guard. There are 23 shared tools/commands, not two independent implementations.

</details>

<details>
<summary><b>Is it free?</b></summary>

The AGPL wrapper is free. Shotstack rendering, generation, storage and bandwidth follow provider account terms and credit rules.

</details>

<details>
<summary><b>Is sandbox unlimited and free?</b></summary>

No. Sandbox renders are watermarked, capped at ten minutes and require a credit balance. Generative AI assets still consume credits in sandbox. Select stage and its matching key.

</details>

<details>
<summary><b>How do I get the API key?</b></summary>

Open API Keys in the intended Shotstack account dashboard. Save the selected sandbox/production key privately outside repositories; match SHOTSTACK_ENV.

</details>

<details>
<summary><b>Can I use a private token file?</b></summary>

Yes. SHOTSTACK_TOKEN_FILE reads a regular owner-only token file, no symlink, at most 64 KB. It overrides the environment key. Windows ACLs must be restricted separately.

</details>

<details>
<summary><b>Can I keep sandbox and production separate?</b></summary>

Yes. Named account entries carry token_file/api_key and env. Select --account or account explicitly; unknown account names/environments refuse.

</details>

<details>
<summary><b>Does Codex work?</b></summary>

Yes, through local stdio registration or shell commands. INSTALL.md puts Codex first and documents private environment forwarding. Fresh Codex task-token measurement remains pending.

</details>

<details>
<summary><b>Does Claude Desktop have an extension?</b></summary>

Yes, the versioned .mcpb bundles production dependencies. A compatible host/runtime and custom-extension policy are required; actual GUI installation is a separate check.

</details>

<details>
<summary><b>What about Windows and Linux?</b></summary>

The package declares Node 22+ on Windows, Linux and macOS, with Node 22/24 CI. Use the documented shell/client path and private Windows ACLs. Desktop host availability is separate.

</details>

<details>
<summary><b>Does --agent or --yes approve a render?</b></summary>

No. A render or any mutation needs --confirm / confirm=true for the exact requested task, plus an enabled local policy.

</details>

<details>
<summary><b>Can I force read-only mode?</b></summary>

Yes. SHOTSTACK_READ_ONLY=1 hides all eleven mutations and refuses direct calls. SHOTSTACK_ALLOW_DESTRUCTIVE=0 blocks even confirmed operations.

</details>

<details>
<summary><b>Does a request timeout mean no credits were used?</b></summary>

No. The provider may already have processed it. No mutation retries run automatically. Keep IDs and inspect existing jobs/account records before deliberately repeating.

</details>

<details>
<summary><b>Does it preview or semantically validate my video?</b></summary>

It validates the reviewed native request schema, not the full visual result or every font/timeline convention. Use the official CLI validator and Studio for those tasks.

</details>

<details>
<summary><b>Does it upload files from my computer?</b></summary>

No. ingest_source fetches a selected remote URL. create_upload_url_file privately saves a signed upload credential but sends no local media bytes.

</details>

<details>
<summary><b>Where does the signed upload URL go?</b></summary>

Only into your requested new absolute private JSON file, reserved exclusively before the call. Ordinary model output shows the path and a warning, not the credential.

</details>

<details>
<summary><b>Are old Create providers still included?</b></summary>

Only current Edit generation schemas/models are advertised. Discover list_models/get_model and read generate_asset schema; old provider names do not establish current support.

</details>

<details>
<summary><b>Is CLI more token-efficient than MCP?</b></summary>

No measured blanket claim is made. Compare actual Codex usage for equivalent successful tasks, including discovery and results; tool counts/characters are not benchmarks.

</details>

<details>
<summary><b>How do updates and removal work?</b></summary>

Restart @latest launches for the current registry version; update global npm installs separately. Reinstall desktop archives separately. Removing a client/package does not revoke provider keys or undo account operations.

</details>

## Questions

Open a sanitized [issue](https://github.com/thenavidm/shotstack-mcp-cli/issues) with package/client/OS versions. For private reports, read SECURITY.md.

## About the author

Navid Moazzez is a leading AI business strategist, and the host of the AI Creator Summit, watched by 100,000+ creators. He helps creators and founders master AI and build their own AI Operating System (AI OS) to automate their business and life. This Shotstack MCP server and CLI is one piece of that system.

**Links**

- Personal website: [navid.me](https://navid.me?utm_source=github&utm_medium=referral&utm_campaign=firefly-mcp-cli&utm_content=readme)
- Link in bio: [navid.bio](https://navid.bio?utm_source=github&utm_medium=referral&utm_campaign=firefly-mcp-cli&utm_content=readme)
- Navid Media: [navid.media](https://navid.media?utm_source=github&utm_medium=referral&utm_campaign=firefly-mcp-cli&utm_content=readme)
- YouTube: [@thenavidm](https://youtube.com/@thenavidm?sub_confirmation=1) and [@thenavidai](https://youtube.com/@thenavidai?sub_confirmation=1)
- X: [@thenavidm](https://x.com/thenavidm)
- Instagram: [@thenavidm](https://instagram.com/thenavidm)
- LinkedIn: [thenavidm](https://linkedin.com/in/thenavidm)

If this is useful, star the repo and come say hi on [X](https://x.com/thenavidm).

## Dependencies

MCP TypeScript SDK 1.32.0, Ajv 8.20.0 and ajv-formats 3.0.1 at runtime. TypeScript 7.0.2, Vitest 5.0.3, Vite 8.3.2 and MCPB 2.1.2 are development tools. The exact dependency lock and upstream notices are retained. Packaging tools do not ship in the runtime bundle.

## License

Preserves AGPL-3.0-or-later. See [LICENSE](LICENSE), [AGPL text](licenses/AGPL-3.0.txt) and [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Provider service/API terms remain separate.

---

© 2026 [Navid Media](https://navid.media). Made with ❤️ by [Navid Moazzez](https://navid.me).
