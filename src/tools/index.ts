import operationsData from "./operations.json" with { type: "json" };
import { type ValidateFunction } from "ajv";
import { Ajv2020 } from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { readFile, lstat, open } from "node:fs/promises";
import { dirname } from "node:path";
import type { Json, ShotstackClient, QueryParam } from "../api/client.js";
import { UsageError } from "../api/errors.js";
import type { Config } from "../config.js";
import type { Risk } from "@thenavidm/slipway";
export type Operation = {
  name: string;
  title: string;
  description: string;
  method: string;
  path: string;
  group: string;
  risk: Risk;
  params: {
    name: string;
    key: string;
    in: string;
    required?: boolean;
    schema: Json;
    style?: string;
    explode?: boolean;
  }[];
  bodySchema: Json;
  bodyRequired: boolean;
  paginated: boolean;
  origin: "edit" | "serve" | "ingest";
  contentType: string;
};
export type ToolSpec = {
  name: string;
  title: string;
  description: string;
  group: string;
  inputSchema: Json;
  risk: Risk;
  handler: (args: Json, client: ShotstackClient) => Promise<unknown>;
};
const operations = operationsData as unknown as Operation[];
const ajv = new Ajv2020({ allErrors: true, strict: false });
(addFormats as unknown as (a: typeof ajv) => void)(ajv);
function check(validate: ValidateFunction, args: unknown): void {
  if (!validate(args))
    throw new UsageError(ajv.errorsText(validate.errors, { separator: "; " }));
}
function fieldsFor(op: Operation): Json {
  const properties: Json = Object.fromEntries(
    op.params.map((p) => [p.key, p.schema]),
  );
  Object.assign(properties, op.bodySchema.properties ?? {});
  properties.account = {
    type: "string",
    description:
      "Named private Shotstack account; selects private credentials and stage/v1 environment.",
  };
  if (op.risk !== "read")
    properties.confirm = {
      type: "boolean",
      description: "Must be true for this exact requested render, generation, mutation, upload URL or deletion.",
    };
  if (Object.keys(op.bodySchema.properties ?? {}).length) {
    properties.payload = {
      ...op.bodySchema,
      description:
        "Complete JSON request body instead of body flags. Preserves current endpoint fields and values.",
    };
    properties.payload_file = {
      type: "string",
      minLength: 1,
      description:
        "Regular local JSON body file, at most 5 MB. Cannot be mixed with body flags or payload.",
    };
  }
  if(op.name === "create_upload_url_file") properties.secret_result_file = {type:"string",minLength:1,description:"New absolute JSON file in a private owner-only directory. Signed upload URL stays out of model output; no overwrite."};
  return {
    type: "object",
    $defs: op.bodySchema.$defs,
    properties,
    required: [...op.params.filter((p) => p.required).map((p) => p.key),...(op.name === "create_upload_url_file" ? ["secret_result_file"] : [])],
    additionalProperties: false,
  };
}
// Each schema compiles on first use: compiling all of them at load held back the server's first answer. compileAll() runs them in tests.
const bodyValidators = new Map<string, ValidateFunction>();
function bodyValidator(op: Operation): ValidateFunction {
  let v = bodyValidators.get(op.name);
  if (!v) bodyValidators.set(op.name, (v = ajv.compile(op.bodySchema)));
  return v;
}
async function execute(
  op: Operation,
  args: Json,
  client: ShotstackClient,
): Promise<unknown> {
  const flat = Object.fromEntries(
    Object.keys(op.bodySchema.properties ?? {})
      .filter((k) => args[k] !== undefined)
      .map((k) => [k, args[k]]),
  );
  if (
    (args.payload !== undefined || args.payload_file !== undefined) &&
    Object.keys(flat).length
  )
    throw new UsageError(
      "Use individual body flags or payload/payload_file without mixing them.",
    );
  if (args.payload !== undefined && args.payload_file !== undefined)
    throw new UsageError("Use payload or payload_file, not both.");
  if (op.bodyRequired && !Object.keys(flat).length && args.payload === undefined && args.payload_file === undefined) {
    throw new UsageError('This operation requires a JSON body; inspect schema and provide body flags or payload/payload_file.');
  }
  let body: Json = args.payload ?? flat;
  if (args.payload_file)
    try {
      const stat = await lstat(args.payload_file);
      if (!stat.isFile() || stat.size > 5 * 1024 * 1024) throw new Error();
      body = JSON.parse(await readFile(args.payload_file, "utf8"));
    } catch {
      throw new UsageError(
        "payload_file must be a regular JSON body file, at most 5 MB.",
      );
    }
  check(bodyValidator(op), body);
  if (
    ["PUT", "PATCH"].includes(op.method) &&
    Object.keys(op.bodySchema.properties ?? {}).length &&
    !Object.keys(body).length
  )
    throw new UsageError("Provide at least one field to update.");
  const path = op.params
    .filter((p) => p.in === "path")
    .reduce(
      (path, p) =>
        path.replace(`{${p.name}}`, encodeURIComponent(String(args[p.key]))),
      op.path,
    );
  const query: QueryParam[] = op.params
    .filter((p) => p.in === "query" && args[p.key] !== undefined)
    .map((p) => ({
      name: p.name,
      value: args[p.key],
      style: p.style,
      explode: p.explode,
    }));
  const headers = Object.fromEntries(op.params.filter(p=>p.in === "header" && args[p.key] !== undefined).map(p=>[p.name,String(args[p.key])]));
  let output;
  if(op.name === "create_upload_url_file") {
    if(!args.secret_result_file.startsWith("/") && !/^[a-zA-Z]:[\\/]/.test(args.secret_result_file)) throw new UsageError("secret_result_file must be absolute.");
    const parent = await lstat(dirname(args.secret_result_file));
    if(!parent.isDirectory() || (process.platform !== "win32" && (parent.mode & 0o077))) throw new UsageError("Use a private owner-only output directory.");
    output = await open(args.secret_result_file,"wx",0o600);
  }
  try {
    const result = await client.request(op.method,path,query,op.bodyRequired || Object.keys(body).length ? body : undefined,args.account,op.origin,op.contentType,headers);
    if(output) { await output.writeFile(JSON.stringify(result)+"\n");return {saved:true,secret_result_file:args.secret_result_file,warning:"The file contains a temporary upload credential; keep it private. No file bytes were uploaded."}; }
    return client.sanitize(result);
  } finally { await output?.close(); }
}

export const ALL_TOOLS: ToolSpec[] = operations.map((op) => ({
  name: op.name,
  title: op.title,
  description: op.description,
  group: op.group,
  inputSchema: fieldsFor(op),
  risk: op.risk,
  handler: (args, client) => execute(op, args, client),
}));
ALL_TOOLS.push({
  name: "list_accounts",
  title: "List configured accounts",
  description:
    "List private account labels, default selection and configured token method. No credentials, token paths or account content; no network request.",
  group: "accounts",
  risk: "read",
  inputSchema: { type: "object", properties: {}, additionalProperties: false },
  handler: async (_args, client) => ({
    accounts: client.config.accounts.map((a) => ({
      name: a.name,
      environment: a.environment,
      default: a.name === client.config.defaultAccount,
      auth: a.tokenFile
        ? "token_file"
        : a.apiToken
          ? "api_key"
          : "not_configured",
    })),
  }),
});
const validators = new Map<string, ValidateFunction>();
function validatorFor(tool: ToolSpec): ValidateFunction {
  let v = validators.get(tool.name);
  if (!v) validators.set(tool.name, (v = ajv.compile(tool.inputSchema)));
  return v;
}
export function validateArguments(tool: ToolSpec, args: Json): void {
  check(validatorFor(tool), args);
}
/** Compile every input and body schema, as loading once did, so a test can prove they all compile. */
export function compileAll(): number {
  for (const t of ALL_TOOLS) validatorFor(t);
  for (const op of operations) bodyValidator(op);
  return validators.size + bodyValidators.size;
}
export function visibleTools(config: Config): ToolSpec[] {
  return ALL_TOOLS.filter((t) => !config.readOnly || t.risk === "read");
}
