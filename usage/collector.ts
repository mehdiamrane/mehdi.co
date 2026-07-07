// Usage collector — fetches usage from all AI services, writes to usage.json
// Run: bun run collector.ts
// Cron: every 15min, no LLM needed unless error

const FETCH_TIMEOUT = 15_000; // 15 second timeout for all API calls

function fetchWithTimeout(url: string, opts: RequestInit = {}, timeout = FETCH_TIMEOUT): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  return fetch(url, { ...opts, signal: controller.signal }).finally(() => clearTimeout(timer));
}

const CONFIG = {
  outputPath: process.env.HOME + "/dev/mehdi.co-bun/usage/usage.json",
  openRouterKey: process.env.OPENROUTER_API_KEY,
  deepSeekKey: process.env.DEEPSEEK_API_KEY,
  zaiKey: process.env.ZAI_API_KEY,
  openAiAdminKey: process.env.OPENAI_ADMIN_KEY,
  claudeCredsPath: process.env.HOME + "/.claude/.credentials.json",
  kiroSqlitePath: process.env.HOME + "/.kiro/state.db",
};

type ServiceStatus = "ok" | "not_configured" | "error";

interface ServiceResult {
  status: ServiceStatus;
  error?: string;
  [key: string]: any;
}

interface UsageData {
  updated: string;
  services: Record<string, ServiceResult>;
}

// ─── OpenRouter ──────────────────────────────────────────────────
async function fetchOpenRouter(): Promise<ServiceResult> {
  if (!CONFIG.openRouterKey) {
    return { status: "not_configured", error: "No OPENROUTER_API_KEY set" };
  }
  try {
    const headers = { Authorization: `Bearer ${CONFIG.openRouterKey}` };

    // Fetch both key usage and account credits
    const [keyRes, creditsRes] = await Promise.all([
      fetchWithTimeout("https://openrouter.ai/api/v1/key", { headers }),
      fetchWithTimeout("https://openrouter.ai/api/v1/credits", { headers }),
    ]);

    const keyData = keyRes.ok ? await keyRes.json() : null;
    const creditsData = creditsRes.ok ? await creditsRes.json() : null;

    const d = keyData?.data || keyData || {};
    const c = creditsData?.data || creditsData || {};

    return {
      status: "ok",
      used: Number(d.usage ?? 0),
      limit: d.limit !== null && d.limit !== undefined ? Number(d.limit) : null,
      daily: Number(d.usage_daily ?? 0),
      weekly: Number(d.usage_weekly ?? 0),
      monthly: Number(d.usage_monthly ?? 0),
      isFreeTier: d.is_free_tier ?? true,
      totalCredits: Number(c.total_credits ?? 0),
      totalUsage: Number(c.total_usage ?? 0),
    };
  } catch (e: any) {
    return { status: "error", error: e.message };
  }
}

// ─── DeepSeek ────────────────────────────────────────────────────
async function fetchDeepSeek(): Promise<ServiceResult> {
  if (!CONFIG.deepSeekKey) {
    return { status: "not_configured", error: "No DEEPSEEK_API_KEY set" };
  }
  try {
    const res = await fetchWithTimeout("https://api.deepseek.com/user/balance", {
      headers: { Authorization: `Bearer ${CONFIG.deepSeekKey}` },
    });
    if (!res.ok) return { status: "error", error: `HTTP ${res.status}` };
    const data = await res.json();
    const b = data.balance_infos?.[0] || data;
    return {
      status: "ok",
      totalBalance: parseFloat(b.total_balance) || 0,
      grantedBalance: parseFloat(b.granted_balance) || 0,
      toppedUpBalance: parseFloat(b.topped_up_balance) || 0,
    };
  } catch (e: any) {
    return { status: "error", error: e.message };
  }
}

// ─── Z.AI ────────────────────────────────────────────────────────
async function fetchZai(): Promise<ServiceResult> {
  if (!CONFIG.zaiKey) {
    return { status: "not_configured", error: "No ZAI_API_KEY set" };
  }
  try {
    const res = await fetchWithTimeout("https://api.z.ai/api/monitor/usage/quota/limit", {
      headers: { Authorization: `Bearer ${CONFIG.zaiKey}` },
    });
    if (!res.ok) return { status: "error", error: `HTTP ${res.status}` };
    const json = await res.json();
    const data = json.data || json;

    // Parse limits array
    const limits = data.limits || [];
    const timeLimit = limits.find((l: any) => l.type === "TIME_LIMIT");
    const tokensLimit = limits.find((l: any) => l.type === "TOKENS_LIMIT");

    return {
      status: "ok",
      plan: data.level || "unknown",
      sessionPct: timeLimit?.percentage ?? timeLimit?.usage ?? 0,
      sessionResets: timeLimit?.nextResetTime ?? null,
      sessionModels: timeLimit?.usageDetails || [],
      tokensPct: tokensLimit?.percentage ?? 0,
      tokensUnit: tokensLimit?.unit ?? 0,
      tokensNumber: tokensLimit?.number ?? 0,
    };
  } catch (e: any) {
    return { status: "error", error: e.message };
  }
}

// ─── Claude (Anthropic Console OAuth) ────────────────────────────
async function fetchClaude(): Promise<ServiceResult> {
  try {
    const credsRaw = await Bun.file(CONFIG.claudeCredsPath).text();
    const creds = JSON.parse(credsRaw);
    // Support both flat {accessToken} and nested {claudeAiOauth: {accessToken}}
    const oauth = creds.claudeAiOauth || creds;
    const accessToken = oauth.accessToken || oauth.access_token || oauth.oauth_token;
    const plan = oauth.subscriptionType || creds.subscriptionType || 'unknown';
    if (!accessToken) {
      return { status: "error", error: "No OAuth token in .credentials.json" };
    }
    const res = await fetchWithTimeout("https://api.anthropic.com/api/oauth/usage", {
      headers: { Authorization: *** ${accessToken}`, "Content-Type": "application/json" },
    });
    if (!res.ok) return { status: "error", error: `HTTP ${res.status}` };
    const data = await res.json();

    // Session (5-hour window)
    const session = data.five_hour || {};
    // Weekly
    const weekly = data.seven_day || {};
    // Overage credits
    const overage = data.extra_usage || {};

    // Collect per-model breakdowns with >0 usage
    const modelKeys = ['seven_day_opus','seven_day_sonnet','seven_day_cowork','seven_day_omelette',
      'tangelo','iguana_necktie','omelette_promotional','nimbus_quill','cinder_cove','amber_ladder'];
    const models: Record<string, number> = {};
    for (const k of modelKeys) {
      const v = data[k];
      if (v && v.utilization && v.utilization > 0) {
        models[k.replace('seven_day_', '')] = v.utilization;
      }
    }

    return {
      status: "ok",
      plan,
      sessionPct: session.utilization ?? 0,
      sessionResets: session.resets_at ?? null,
      weeklyPct: weekly.utilization ?? 0,
      weeklyResets: weekly.resets_at ?? null,
      overageCredits: overage.used_credits ?? 0,
      overageLimit: overage.monthly_limit ?? 0,
      models,
    };
  } catch (e: any) {
    if (e.message?.includes("No such file")) {
      return { status: "not_configured", error: "Claude Code credentials not found" };
    }
    return { status: "error", error: e.message };
  }
}

// ─── OpenAI Codex (Admin API) ────────────────────────────────────
async function fetchOpenAi(): Promise<ServiceResult> {
  if (!CONFIG.openAiAdminKey) {
    return { status: "not_configured", error: "No OPENAI_ADMIN_KEY set" };
  }
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
    const today = now.toISOString().split("T")[0];
    const res = await fetchWithTimeout(
      `https://api.openai.com/v1/organization/costs?start_time=${startOfMonth}&end_time=${today}&limit=1000`,
      { headers: { Authorization: *** ${CONFIG.openAiAdminKey}`, "Content-Type": "application/json" } }
    );
    if (!res.ok) return { status: "error", error: `HTTP ${res.status}` };
    const data = await res.json();
    const costs = data.data || [];
    const totalUsage = costs.reduce((sum: number, c: any) =>
      sum + (c.line_items?.reduce((s: number, li: any) => s + (li.amount || 0), 0) || 0), 0);
    return {
      status: "ok",
      totalUsage,
      daily: costs.filter((c: any) => c.billing_from?.startsWith(today))
        .reduce((s: number, c: any) => s + (c.line_items?.reduce((ss: number, li: any) => ss + (li.amount || 0), 0) || 0), 0),
      monthly: totalUsage,
      period: `${startOfMonth} → ${today}`,
    };
  } catch (e: any) {
    return { status: "error", error: e.message };
  }
}

// ─── Kiro (CLI subprocess) ───────────────────────────────────────
async function fetchKiro(): Promise<ServiceResult> {
  try {
    const proc = Bun.spawn(["kiro-cli", "acp", "--", "usage"], {
      stdout: "pipe", stderr: "pipe", timeout: 15000,
    });
    const output = await new Response(proc.stdout).text();
    await proc.exited;

    if (proc.exitCode !== 0) {
      try {
        const db = Bun.file(CONFIG.kiroSqlitePath);
        if (await db.exists()) {
          return { status: "ok", creditsUsed: 0, planCap: 0, overages: 0, estimatedCost: 0 };
        }
      } catch {}
      return { status: "not_configured", error: "kiro-cli not installed" };
    }

    const creditsMatch = output.match(/credits? used[:\s]+(\d[\d,.]*)/i);
    const capMatch = output.match(/(?:plan cap|limit)[:\s]+(\d[\d,.]*)/i);
    const overageMatch = output.match(/overages?[:\s]+(\d[\d,.]*)/i);
    const costMatch = output.match(/(?:estimated cost|cost)[:\s]+\$?(\d[\d,.]*)/i);

    return {
      status: "ok",
      creditsUsed: creditsMatch ? parseFloat(creditsMatch[1].replace(/,/g, "")) : 0,
      planCap: capMatch ? parseInt(capMatch[1].replace(/[,.]/g, "")) : 0,
      overages: overageMatch ? parseInt(overageMatch[1].replace(/[,.]/g, "")) : 0,
      estimatedCost: costMatch ? parseFloat(costMatch[1]) : 0,
    };
  } catch (e: any) {
    return { status: "not_configured", error: "kiro-cli not installed" };
  }
}

// ─── OpenCode Go & Cursor (not implemented) ─────────────────────
async function fetchOpenCodeGo(): Promise<ServiceResult> {
  return { status: "not_configured", error: "Browser cookie scraping — not yet implemented" };
}

async function fetchCursor(): Promise<ServiceResult> {
  return { status: "not_configured", error: "Browser cookie scraping — not yet implemented" };
}

// ─── Main ────────────────────────────────────────────────────────
async function main() {
  console.log(`[${new Date().toISOString()}] Collecting usage data...`);

  const [openRouter, deepSeek, zai, claude, openAi, kiro, openCodeGo, cursor] =
    await Promise.all([
      fetchOpenRouter(), fetchDeepSeek(), fetchZai(), fetchClaude(),
      fetchOpenAi(), fetchKiro(), fetchOpenCodeGo(), fetchCursor(),
    ]);

  const data: UsageData = {
    updated: new Date().toISOString(),
    services: { openRouter, deepSeek, zai, claude, openAi, kiro, openCodeGo, cursor },
  };

  await Bun.write(CONFIG.outputPath, JSON.stringify(data, null, 2));

  const failures = Object.entries(data.services)
    .filter(([_, s]) => s.status === "error")
    .map(([name, s]) => `  ${name}: ${s.error}`);

  const notConfigured = Object.entries(data.services)
    .filter(([_, s]) => s.status === "not_configured");

  if (notConfigured.length > 0) {
    console.log(`ℹ ${notConfigured.length} service(s) not configured: ${notConfigured.map(([n]) => n).join(", ")}`);
  }

  if (failures.length > 0) {
    console.log("⚠ Fetch errors:");
    failures.forEach(f => console.log(f));
    process.exit(1);
  }

  console.log("✅ All configured services OK");
  process.exit(0);
}

main();
