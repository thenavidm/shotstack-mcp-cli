# Install Shotstack MCP Server & CLI

One npm package includes both binaries and all **23 tools**. Requires Node.js 22 or newer for CLI/manual MCP installs. Discovery works before account authentication. Account operations need eligible Shotstack API access; Rendering, generation, hosting and provider account terms apply.

| Route | Program | Use |
| --- | --- | --- |
| Terminal | shotstack-cli | Scripts and agents with a shell |
| Local MCP | shotstack-mcp | AI clients supporting stdio |
| Desktop archive | shotstack-2.0.0.mcpb | Compatible Claude Desktop custom extensions |
| Shotstack-hosted alternative | https://mcp.shotstack.io/ | Official remote OAuth/API-key access |

## Contents

[Requirements](#requirements) · [CLI](#cli) · [Private account setup](#private-account-setup) · [Claude Code](#claude-code) · [Codex](#codex) · [Claude Desktop](#claude-desktop) · [Cursor](#cursor) · [VS Code and Copilot](#vs-code-and-copilot) · [Windsurf](#windsurf) · [Zed](#zed) · [Gemini CLI](#gemini-cli) · [Docker](#docker) · [Verify](#verify) · [Multiple accounts](#multiple-accounts) · [Updates and removal](#updates-and-removal) · [Troubleshooting](#troubleshooting) · [Development](#development)

## Requirements

Install Node from [nodejs.org](https://nodejs.org/en/download). Open a new terminal and check `node --version` and `npm --version`. The desktop host needs a compatible Node runtime; dependencies are bundled. A GUI app may not inherit your terminal's environment. Check your account's current API access and balance with Shotstack instead of assuming npm installation provides it.

## CLI

On macOS/Linux, use Terminal. On Windows, use PowerShell or Command Prompt:

```bash
npm install -g @thenavidm/shotstack-mcp-cli@latest
shotstack-cli --version
shotstack-cli
shotstack-cli list-models --help
shotstack-cli schema render
shotstack-cli login
```

If PowerShell blocks npm.ps1, use npm.cmd or Command Prompt according to your policy. If a binary is missing, check `npm prefix -g`, ensure its executable directory is on PATH and open a new terminal. Avoid sudo as a workaround for PATH problems.

For one command without a global install:

```bash
npx -y --package @thenavidm/shotstack-mcp-cli@latest shotstack-cli tools
```

Make [SKILL.md](./SKILL.md) available in your agent's supported skill location. The installed file is `<npm root -g>/@thenavidm/shotstack-mcp-cli/SKILL.md`. npm does not automatically register client skills. Your agent should read the actual schema and use --agent/--select for compact output.

## Private account setup

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


```bash
export SHOTSTACK_TOKEN_FILE='/absolute/private/shotstack-stage.txt'
export SHOTSTACK_ENV=stage
shotstack-cli doctor --network
```

```powershell
$env:SHOTSTACK_TOKEN_FILE = 'C:\Users\YOUR_USER\Private\shotstack-stage.txt'
$env:SHOTSTACK_ENV = 'stage'
shotstack-cli doctor --network
```

### Agent-guided installation

> Help me install Shotstack MCP Server & CLI with INSTALL.md. Check Node and the binary, let me configure my account credentials privately, then run discovery and doctor --network. Do not submit renders or mutate assets during setup.

## Codex

Codex is the current validation priority. Private token paths must exist in the process or remote environment where the server runs.

~~~bash
codex mcp add shotstack -- npx -y @thenavidm/shotstack-mcp-cli@latest
codex mcp list
~~~

Account credentials must reach the server through private environment settings. `codex mcp add --env NAME=value` stores values in your local config, so never commit that config or put secrets in a shared command. In TOML, the equivalent server is:

~~~toml
[mcp_servers.shotstack]
command = "npx"
args = ["-y", "@thenavidm/shotstack-mcp-cli@latest"]
env_vars = ["SHOTSTACK_API_KEY", "SHOTSTACK_TOKEN_FILE", "SHOTSTACK_ACCOUNTS", "SHOTSTACK_DEFAULT_ACCOUNT", "SHOTSTACK_READ_ONLY", "SHOTSTACK_ALLOW_DESTRUCTIVE", "SHOTSTACK_ENV"]
~~~

`env_vars` forwards those names from the environment available to Codex. If that environment does not contain them, configure private env settings locally. Codex can also call the CLI directly with SKILL.md and `--agent` output.

## Claude Code

For a user-scoped connection, after privately configuring credentials:

~~~bash
claude mcp add --scope user shotstack -- npx -y @thenavidm/shotstack-mcp-cli@latest
claude mcp list
~~~

Use the client's private local environment settings for the account variable if they are not inherited. Claude's `-e NAME=value` registration option writes values into its config; only use it locally through your secret manager, with no shared command transcript. Never place credentials in a project .mcp.json. Reconnect and ask Claude to verify credentials.

Alternatively install the CLI, make SKILL.md available to Claude, and use shell commands. Registering both surfaces is optional.

## Claude Desktop

### Install the .mcpb extension

1. Download `shotstack-2.0.0.mcpb` from [GitHub Releases](https://github.com/thenavidm/shotstack-mcp-cli/releases/latest).
2. In a supported Claude Desktop build, open **Settings > Extensions > Advanced settings > Install Extension…** and select it.
3. Enter a private API key in the sensitive setting, or an absolute private token-file path. Leave the unused credential method empty. Shotstack uses x-api-key authentication.
4. Enable read-only if you want only the five local/account reads. Reconnect and ask for account verification.

The bundle includes production dependencies and no credentials. Use a regular private token-only file if you prefer file-based credentials. The manifest requires Node 22 or newer from a compatible host. Organization policy may restrict custom extensions. Manual bundle updates require installing the new version; no automatic directory updates are promised. GUI installation remains unverified separately from archive/protocol checks.

### Manual config

Open **Settings > Developer > Edit Config**, or use your platform's config file:

| OS | Typical config path |
| --- | --- |
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |
| Linux | `~/.config/Claude/claude_desktop_config.json`; confirm the location through Edit Config in your installed build |

~~~json
{
  "mcpServers": {
    "shotstack": {
      "command": "npx",
      "args": ["-y", "@thenavidm/shotstack-mcp-cli@latest"],
      "env": {
        "SHOTSTACK_API_KEY": "YOUR_PRIVATE_API_KEY",
        "SHOTSTACK_TOKEN_FILE": ""
      }
    }
  }
}
~~~

Replace the placeholders only in your private file. Merge the server entry into an existing mcpServers object instead of replacing other integrations. Fully quit and reopen Claude Desktop. Do not enable an extension and a manual entry with the same name; choose one route.

If a Windows launcher cannot execute npx directly, use `"command": "cmd"` with `"args": ["/c", "npx", "-y", "@thenavidm/shotstack-mcp-cli@latest"]`. An absolute node executable and installed `dist/index.js` path also avoids launcher/PATH problems.

## Cursor

Use private user settings at `~/.cursor/mcp.json`, or **Settings > Tools & MCP**. [Cursor documents environment interpolation and envFile support](https://cursor.com/docs/mcp).

~~~json
{
  "mcpServers": {
    "shotstack": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@thenavidm/shotstack-mcp-cli@latest"],
      "env": {
        "SHOTSTACK_API_KEY": "${env:SHOTSTACK_API_KEY}",
        "SHOTSTACK_TOKEN_FILE": "${env:SHOTSTACK_TOKEN_FILE}"
      }
    }
  }
}
~~~

The environment values must exist for the Cursor process. If you use envFile, keep that file private and outside version control. A project's .cursor/mcp.json must not contain actual credentials. Reconnect the server after saving.

## VS Code and Copilot

Use **MCP: Open User Configuration**. [VS Code uses servers and secure inputs](https://code.visualstudio.com/docs/agent-customization/mcp-servers), rather than a mcpServers root:

~~~json
{
  "inputs": [
    {"type": "promptString", "id": "shotstack-api-key", "description": "Shotstack API key (leave empty for a private token file)", "password": true},
    {"type": "promptString", "id": "shotstack-token-file", "description": "Optional private token-file path (leave empty for API key)"}
  ],
  "servers": {
    "shotstack": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@thenavidm/shotstack-mcp-cli@latest"],
      "env": {
        "SHOTSTACK_API_KEY": "${input:shotstack-api-key}",
        "SHOTSTACK_TOKEN_FILE": "${input:shotstack-token-file}"
      }
    }
  }
}
~~~

Start Shotstack through the MCP controls, approve trust if prompted, and enter credentials in the private input prompts. Workspace .vscode/mcp.json may contain this placeholder-only structure, but never resolved secret values. Remote development runs the server in the selected remote environment, so local file paths refer to that environment.

## Windsurf

Open Cascade's MCP settings or edit the private user file `~/.codeium/windsurf/mcp_config.json`. Use the Claude Desktop manual mcpServers block above with your locally configured env values. See [Windsurf's current MCP documentation](https://docs.devin.ai/desktop/cascade/mcp). Restart or reconnect Shotstack in Cascade; project files must not contain secrets.

## Zed

Open **Settings > AI > MCP Servers > Add Server > Add Local Server**, or your user settings file. [Zed uses context_servers](https://zed.dev/docs/ai/mcp):

~~~json
{
  "context_servers": {
    "shotstack": {
      "command": "npx",
      "args": ["-y", "@thenavidm/shotstack-mcp-cli@latest"],
      "env": {
        "SHOTSTACK_API_KEY": "YOUR_PRIVATE_API_KEY",
        "SHOTSTACK_TOKEN_FILE": ""
      }
    }
  }
}
~~~

Enter actual values only in private user settings. Check the active-server indicator before prompting. Do not wrap command and args inside a nested command object from older Zed examples.

## Gemini CLI

Merge the Claude Desktop manual mcpServers block into your private `~/.gemini/settings.json`. Configure the private credential values locally, then restart Gemini CLI and inspect `/mcp`. See [Gemini CLI's MCP configuration](https://geminicli.com/docs/tools/mcp-server/). Its project settings must not contain real credentials. You can instead use the CLI from an agent shell.

Other local stdio clients use the same command and arguments, adapted to their config format. A client that only accepts a remote MCP URL cannot connect directly: this package does not ship a public HTTP listener. ChatGPT's remote connector setup is not a substitute for local stdio installation.

## Docker

Build locally from the reviewed source; no prebuilt registry image is claimed:

```bash
git clone https://github.com/thenavidm/shotstack-mcp-cli.git
cd shotstack-mcp-cli
docker build -t shotstack-mcp-cli .
docker run --rm -i -e SHOTSTACK_API_KEY shotstack-mcp-cli
```


## Cline and other local MCP clients

Use the client's **Add MCP server** flow with command `npx`, arguments `-y` and `@thenavidm/shotstack-mcp-cli@latest`, stdio transport, and private local SHOTSTACK_API_KEY or SHOTSTACK_TOKEN_FILE settings. UI names depend on the installed client. Reconnect and discover tools before an account call. Browser-only clients need a remote HTTPS connector; use Shotstack's official server rather than this local stdio command.

## Verify

```bash
shotstack-cli doctor
shotstack-cli doctor --network
shotstack-cli tools
shotstack-cli schema list-sources
shotstack-cli list-accounts --agent
```

The full server discovers 23 tools; read-only discovers 12. Help/schemas/list_accounts are local. The network doctor reads generation models without returning account details. A successful account read does not prove every rendering model or account operation.

To try read-only, privately set SHOTSTACK_READ_ONLY=1, restart/reconnect and inspect discovery. All 11 mutations must disappear and direct mutation calls must refuse. Remove/disable the setting and reconnect only when you need approved operations. `SHOTSTACK_ALLOW_DESTRUCTIVE=0` separately blocks all 11 mutations even when confirmed.

## Multiple accounts

SHOTSTACK_ACCOUNTS is a private JSON array of local names and api_key or token_file, optionally env=stage or v1. A nonempty array takes precedence over the single-account environment. Names must be unique. Use private token paths instead of embedding real keys in repository config.

```json
[
  {"name":"sandbox","token_file":"/absolute/private/shotstack-stage.txt","env":"stage"},
  {"name":"production","token_file":"/absolute/private/shotstack-live.txt","env":"v1"}
]
```

Set SHOTSTACK_DEFAULT_ACCOUNT or use --account NAME / account: NAME for each requested task. Without an explicit default, the first profile is selected. Global SHOTSTACK_ENV is the fallback for entries without env, then v1. Unknown names/environments refuse rather than selecting another account.

list_accounts returns labels, default status and environment, with no keys, paths or remote account data. Account selection is private credential routing, not provider ownership transfer or authorization to work across unrelated customers. Several labels using one key share provider quota and credits.

## Updates and removal

```bash
npm install -g @thenavidm/shotstack-mcp-cli@latest
shotstack-cli --version
claude mcp remove --scope user shotstack
codex mcp remove shotstack
npm uninstall -g @thenavidm/shotstack-mcp-cli
```

Reinstall a newer desktop archive separately and restart affected clients. Remove manual client entries using its own settings. Uninstalling the package does not revoke Shotstack credentials, remove private token files or undo completed renders, hosting or account mutations. Revoke the API key in the provider API Keys area when appropriate. Inspect and remove your private settings and files separately.

Pin a reviewed version instead of @latest if your automation requires reproducibility. Check [CHANGELOG.md](./CHANGELOG.md) and [GitHub Releases](https://github.com/thenavidm/shotstack-mcp-cli/releases) before a major update. Do not roll back by blindly publishing an older version over an existing npm version.

## Troubleshooting

| Problem | Check |
| --- | --- |
| Missing command | Node 22+, global prefix and PATH |
| No configured account | Private SHOTSTACK_API_KEY or regular SHOTSTACK_TOKEN_FILE |
| GUI authentication fails | Actual private GUI environment; shell env is separate |
| 401/403 | provider API key, selected environment and account/API status |
| Invalid/null body | schema; use payload/payload_file for null and nested data |
| First page only | Current endpoint cursor from its prior response; no automatic all-pages |
| Guard refusal | User-requested --confirm, read-only and operation settings |
| Mutation timeout | Inspect account before repeating; no automatic mutation retries |
| Desktop host rejects extension | Compatible host/runtime and organization custom-extension policy |

See the README for the complete argument table, safety, 20 FAQs and API snapshot corrections. Secrets must never appear in a troubleshooting transcript.

## Development

```bash
git clone https://github.com/thenavidm/shotstack-mcp-cli.git
cd shotstack-mcp-cli
npm ci
npm run typecheck
npm run build
npm test
npm run check:counts
npm run build:mcpb
```

Source mode: configure private env, then register `node /absolute/path/shotstack-mcp-cli/dist/index.js` as the MCP command. Build before registration and after source changes. No local credentials are packaged. [CONTRIBUTING.md](./CONTRIBUTING.md), [SECURITY.md](./SECURITY.md) and [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md) cover contributions, disclosures and licensing.
