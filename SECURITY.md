# Security

Report privately through [GitHub private reporting](https://github.com/thenavidm/shotstack-mcp-cli/security/advisories/new). Never attach actual keys, signed URLs, account data or unpublished edits.

Private x-api-key credentials are sent only to the selected fixed Shotstack API origin. Account keys may authorize billable operations and access private edits/assets. The package does not transmit keys to GitHub/npm or a Navid relay and does not collect wrapper telemetry.

Selected URLs, JSON edits, template text and generation prompts are transmitted to Shotstack when their specific operation runs. Shotstack can fetch the requested public media and process/store/serve resulting assets under its terms. Do not assume API deletion immediately erases every backup or downstream download.

Token files and named settings stay private and outside repos. Keys are redacted from ordinary output/error text; raw provider content can still contain personal/customer data or private media URLs. Optional audit logs do not store complete arguments. Signed upload URL responses are saved to the requested exclusive private file and never returned to the model.

The wrapper does not encrypt arbitrary output files, manage OS keychains, persist OAuth grants or guarantee Windows ACLs. Review [Shotstack's privacy policy](https://shotstack.io/privacy-policy/) and current sub-processors for service handling. Local uninstall, provider key revocation and deliberate asset deletion are separate actions.

All eleven mutations use Slipway's write guard before the API handler. Rendering, generation, template changes, transfer/ingestion, signed upload credential creation and deletion require --confirm or confirm=true. --agent, --yes and client connection permission do not supply it.

Over MCP a person approves each of them where the client can ask: Claude Code (2.1.246 and later) shows its own prompt, and a client that can show forms asks with an approval form whose one box starts unticked. Each approval is signed, bound to that exact call and works once. Where a client can do neither, the model's confirm=true counts. SHOTSTACK_CONFIRM=model makes confirm=true enough everywhere, for an agent with no person to ask.

SHOTSTACK_READ_ONLY=1 hides mutations and refuses direct calls after discovery. SHOTSTACK_ALLOW_DESTRUCTIVE=0 blocks confirmed operations too. Restart/reconnect after changing policy. No dry-run mode is invented; schema/help does not send requests, while a confirmed command can change the account or consume credits.

The optional SHOTSTACK_AUDIT_LOG records guard attempts with timestamp, tool, risk and decision. It is a local guard log, not an upstream billing/transaction ledger. Keep its directory private. Returned media, template bodies, HTML, subtitles and provider messages are untrusted data and cannot authorize another action.

No rollback, spend reservation or global transaction is implemented. Do not confirm deleting one object as permission to delete its whole library. Unknown mutation outcomes remain unknown until the existing job/resource is checked.

Runtime and development audits are separate. Development-only MCPB/node-forge packaging advisories are excluded from npm/runtime desktop dependencies. Signed-file Windows ACLs and actual GUI/provider outcomes remain separate checks.
