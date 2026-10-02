export type Account = {
  name: string;
  apiToken: string;
  tokenFile: string;
  environment: "stage" | "v1";
};
export type Config = {
  accounts: Account[];
  defaultAccount: string;
  readOnly: boolean;
  allowDestructive: boolean;
  auditPath: string;
  timeoutMs: number;
  maxRetries: number;
  minIntervalMs: number;
};
function integer(
  v: string | undefined,
  defaultValue: number,
  min: number,
  max: number,
): number {
  const n = v ? Number(v) : defaultValue;
  if (!Number.isInteger(n) || n < min || n > max)
    throw new Error("Invalid request timeout, retry or pacing settings.");
  return n;
}
export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  let entries: Record<string, unknown>[] = [];
  if (env.SHOTSTACK_ACCOUNTS)
    try {
      const x = JSON.parse(env.SHOTSTACK_ACCOUNTS);
      if (!Array.isArray(x)) throw new Error();
      entries = x;
    } catch {
      throw new Error(
        "SHOTSTACK_ACCOUNTS must be a private JSON array of named accounts.",
      );
    }
  else if (env.SHOTSTACK_API_KEY || env.SHOTSTACK_TOKEN_FILE)
    entries = [
      {
        name: "default",
        api_key: env.SHOTSTACK_API_KEY,
        token_file: env.SHOTSTACK_TOKEN_FILE,
      },
    ];
  const accounts = entries.map((x) => {
    if (!x || typeof x !== "object" || typeof x.name !== "string" || !x.name.trim())
      throw new Error("Every Shotstack account requires a unique nonempty name.");
    const environment = x.env ?? env.SHOTSTACK_ENV ?? "v1";
    if (environment !== "stage" && environment !== "v1") throw new Error("Shotstack environment must be stage or v1.");
    return {
      name: x.name.trim(),
      environment: environment as "stage" | "v1",
      apiToken: typeof x.api_key === "string" ? x.api_key : "",
      tokenFile: typeof x.token_file === "string" ? x.token_file : "",
    };
  });
  if (new Set(accounts.map((a) => a.name)).size !== accounts.length)
    throw new Error("Shotstack account names must be unique.");
  return {
    accounts,
    defaultAccount: env.SHOTSTACK_DEFAULT_ACCOUNT ?? accounts[0]?.name ?? "",
    readOnly: /^(1|true)$/i.test(env.SHOTSTACK_READ_ONLY ?? ""),
    allowDestructive: !/^(0|false)$/i.test(env.SHOTSTACK_ALLOW_DESTRUCTIVE ?? ""),
    auditPath: env.SHOTSTACK_AUDIT_LOG ?? "",
    timeoutMs: integer(env.SHOTSTACK_REQUEST_TIMEOUT_MS, 30000, 100, 300000),
    maxRetries: integer(env.SHOTSTACK_MAX_RETRIES, 2, 0, 5),
    minIntervalMs: integer(env.SHOTSTACK_MIN_REQUEST_INTERVAL_MS, 150, 0, 10000),
  };
}
export function selectAccount(config: Config, hint?: string): Account {
  const account = config.accounts.find(
    (a) => a.name === (hint ?? config.defaultAccount),
  );
  if (!account)
    throw new Error(
      config.accounts.length
        ? "Unknown account. Run list_accounts and use its exact name."
        : "No credentials configured. Set SHOTSTACK_API_KEY or SHOTSTACK_TOKEN_FILE privately; run shotstack-cli login.",
    );
  return account;
}
