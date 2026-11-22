import type { Locale } from "@/i18n/config";
import {
  auditTextFor,
  metricDefs,
  metricOrder,
  rateMetric,
  type CategoryId,
  type MetricId,
  type Rating,
} from "./audit-copy";

type PsiAuditRef = { id: string; weight?: number; group?: string };

type PsiAudit = {
  id: string;
  title?: string;
  description?: string;
  score?: number | null;
  scoreDisplayMode?: string;
  displayValue?: string;
  numericValue?: number;
  metricSavings?: Record<string, number>;
  details?: {
    type?: string;
    overallSavingsMs?: number;
    overallSavingsBytes?: number;
    data?: string;
  };
};

type PsiFieldMetric = { percentile?: number; category?: "FAST" | "AVERAGE" | "SLOW" | string };

type PsiResponse = {
  loadingExperience?: {
    metrics?: Record<string, PsiFieldMetric>;
    overall_category?: string;
  };
  lighthouseResult?: {
    finalDisplayedUrl?: string;
    finalUrl?: string;
    runtimeError?: { code?: string; message?: string };
    categories?: Partial<
      Record<CategoryId, { score?: number | null; auditRefs?: PsiAuditRef[] }>
    >;
    audits?: Record<string, PsiAudit>;
    fullPageScreenshot?: { screenshot?: { data?: string } };
  };
};

type PsiErrorBody = {
  error?: { code?: number; message?: string; status?: string; errors?: { reason?: string; message?: string }[] };
};

export type MetricResult = { id: MetricId; value: number; rating: Rating };

export type AuditProblem = {
  id: string;
  category: CategoryId;
  title: string;
  why: string;
  savingsMs?: number;
  savingsBytes?: number;
};

export type FieldMetric = { label: string; valueText: string; rating: Rating };

export type AuditData = {
  url: string;
  display: string;
  fetchedAt: number;
  scores: Record<CategoryId, number | null>;
  metrics: MetricResult[];
  problems: AuditProblem[];
  screenshot?: string;
  field: { overall?: Rating; metrics: FieldMetric[] } | null;
};

export type AuditErrorKind =
  | "unreachable"
  | "timeout"
  | "quota"
  | "config"
  | "network"
  | "unknown";

export class AuditError extends Error {
  kind: AuditErrorKind;
  constructor(kind: AuditErrorKind, message?: string) {
    super(message ?? kind);
    this.name = "AuditError";
    this.kind = kind;
  }
}

const ENDPOINT = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
const CLIENT_TIMEOUT_MS = 110_000;

function buildRequestUrl(url: string, locale: Locale) {
  const q = new URLSearchParams();
  q.set("url", url);
  q.set("strategy", "mobile");
  for (const c of ["performance", "accessibility", "best-practices", "seo"]) q.append("category", c);
  q.set("locale", locale);
  const key = process.env.NEXT_PUBLIC_PSI_API_KEY;
  if (key) q.set("key", key);
  return `${ENDPOINT}?${q.toString()}`;
}

function classifyLighthouseMessage(text: string): AuditErrorKind | null {
  const t = text.toUpperCase();
  if (/(FAILED_DOCUMENT_REQUEST|ERRORED_DOCUMENT_REQUEST|DNS_FAILURE|NOT_HTML|INSECURE_DOCUMENT_REQUEST|UNABLE TO RESOLVE|COULD NOT REACH|NO_FCP|NO_LCP|NO_NAVSTART)/.test(t)) {
    return "unreachable";
  }
  if (/(PAGE_HUNG|PROTOCOL_TIMEOUT|TIMEOUT|TOOK TOO LONG|NO_FCP)/.test(t)) return "timeout";
  return null;
}

async function readError(res: Response): Promise<AuditError> {
  let body: PsiErrorBody = {};
  try {
    body = (await res.json()) as PsiErrorBody;
  } catch {
  }
  const msg = body.error?.message ?? "";
  const reason = body.error?.errors?.[0]?.reason ?? body.error?.status ?? "";

  if (res.status === 429 || /RESOURCE_EXHAUSTED|rateLimitExceeded|quota/i.test(`${msg} ${reason}`)) {
    return new AuditError("quota", msg);
  }
  if (res.status === 403 || res.status === 401 || /API key|PERMISSION_DENIED|referer|referrer/i.test(msg)) {
    return new AuditError("config", msg);
  }
  const kind = classifyLighthouseMessage(`${msg} ${reason}`);
  if (kind) return new AuditError(kind, msg);
  if (res.status === 400) return new AuditError("unreachable", msg);
  return new AuditError("unknown", msg || `HTTP ${res.status}`);
}

export async function runAudit(url: string, display: string, signal: AbortSignal, locale: Locale = "pl"): Promise<AuditData> {
  const requestUrl = buildRequestUrl(url, locale);

  const attempt = async (): Promise<PsiResponse> => {
    const timeout = new AbortController();
    const timer = setTimeout(() => timeout.abort(), CLIENT_TIMEOUT_MS);
    const onUserAbort = () => timeout.abort();
    signal.addEventListener("abort", onUserAbort, { once: true });
    try {
      const res = await fetch(requestUrl, { signal: timeout.signal });
      if (!res.ok) throw await readError(res);
      return (await res.json()) as PsiResponse;
    } catch (err) {
      if (err instanceof AuditError) throw err;
      if (signal.aborted) throw err;
      if (timeout.signal.aborted) throw new AuditError("timeout", "client timeout");
      throw new AuditError("network", err instanceof Error ? err.message : undefined);
    } finally {
      clearTimeout(timer);
      signal.removeEventListener("abort", onUserAbort);
    }
  };

  let json: PsiResponse;
  try {
    json = await attempt();
  } catch (err) {
    if (err instanceof AuditError && err.kind === "unknown" && !signal.aborted) {
      json = await attempt();
    } else {
      throw err;
    }
  }

  return parseResponse(json, url, display, locale);
}

const CATEGORY_IDS: CategoryId[] = ["performance", "seo", "accessibility", "best-practices"];
const SKIP_MODES = new Set(["notApplicable", "manual", "informative", "error"]);

const toPct = (score: number | null | undefined) =>
  typeof score === "number" && Number.isFinite(score) ? Math.round(score * 100) : null;

const FIELD_CATEGORY: Record<string, Rating> = { FAST: "good", AVERAGE: "needs-work", SLOW: "poor" };

export function parseResponse(json: PsiResponse, url: string, display: string, locale: Locale = "pl"): AuditData {
  const text = auditTextFor(locale);
  const en = locale === "en";
  const lh = json.lighthouseResult;
  if (!lh) throw new AuditError("unknown", "no lighthouseResult");
  if (lh.runtimeError?.code && lh.runtimeError.code !== "NO_ERROR") {
    const kind = classifyLighthouseMessage(`${lh.runtimeError.code} ${lh.runtimeError.message ?? ""}`);
    throw new AuditError(kind ?? "unknown", lh.runtimeError.message);
  }

  const audits = lh.audits ?? {};
  const cats = lh.categories ?? {};

  const scores = {} as Record<CategoryId, number | null>;
  for (const id of CATEGORY_IDS) scores[id] = toPct(cats[id]?.score);
  if (scores.performance === null) {
    throw new AuditError("unreachable", "no performance score");
  }

  const metrics: MetricResult[] = [];
  for (const id of metricOrder) {
    const v = audits[metricDefs[id].audit]?.numericValue;
    if (typeof v === "number" && Number.isFinite(v)) metrics.push({ id, value: v, rating: rateMetric(id, v) });
  }

  const metricAuditIds = new Set(Object.values(metricDefs).map((d) => d.audit));
  type Cand = AuditProblem & { weight: number };
  const perf: Cand[] = [];
  const other: Cand[] = [];
  const seenTitles = new Set<string>();

  for (const catId of CATEGORY_IDS) {
    for (const ref of cats[catId]?.auditRefs ?? []) {
      if (ref.group === "metrics" || ref.group === "hidden" || metricAuditIds.has(ref.id)) continue;
      const a = audits[ref.id];
      if (!a) continue;
      if (a.scoreDisplayMode && SKIP_MODES.has(a.scoreDisplayMode)) continue;
      if (typeof a.score !== "number" || a.score >= 0.9) continue;

      const copy = text.explainAudit(ref.id, a.title ?? ref.id, a.description);
      if (seenTitles.has(copy.title)) continue;

      const ms = a.metricSavings?.LCP ?? a.metricSavings?.FCP ?? a.details?.overallSavingsMs;
      const bytes = a.details?.overallSavingsBytes;
      const cand: Cand = {
        id: ref.id,
        category: catId,
        title: copy.title,
        why: copy.why,
        savingsMs: typeof ms === "number" && ms >= 100 ? ms : undefined,
        savingsBytes: typeof bytes === "number" && bytes >= 10_000 ? bytes : undefined,
        weight: (ref.weight ?? 0) * (1 - a.score),
      };
      seenTitles.add(copy.title);
      (catId === "performance" ? perf : other).push(cand);
    }
  }
  perf.sort((a, b) => (b.savingsMs ?? 0) - (a.savingsMs ?? 0) || (b.savingsBytes ?? 0) - (a.savingsBytes ?? 0) || b.weight - a.weight);
  other.sort((a, b) => b.weight - a.weight);

  const picked: Cand[] = [];
  picked.push(...perf.slice(0, 3));
  picked.push(...other.slice(0, 5 - picked.length));
  if (picked.length < 5) picked.push(...perf.slice(3, 3 + 5 - picked.length));
  const problems: AuditProblem[] = picked.slice(0, 5).map((p) => ({
    id: p.id,
    category: p.category,
    title: p.title,
    why: p.why,
    savingsMs: p.savingsMs,
    savingsBytes: p.savingsBytes,
  }));

  const shot = audits["final-screenshot"]?.details?.data ?? lh.fullPageScreenshot?.screenshot?.data;
  const screenshot = typeof shot === "string" && shot.startsWith("data:image/") ? shot : undefined;

  let field: AuditData["field"] = null;
  const fm = json.loadingExperience?.metrics;
  if (fm) {
    const out: FieldMetric[] = [];
    const lcp = fm.LARGEST_CONTENTFUL_PAINT_MS;
    if (lcp?.percentile && lcp.category && FIELD_CATEGORY[lcp.category]) {
      out.push({
        label: en ? "Main content (LCP)" : "Główna treść (LCP)",
        valueText: text.fmtSeconds(lcp.percentile),
        rating: FIELD_CATEGORY[lcp.category],
      });
    }
    const inp = fm.INTERACTION_TO_NEXT_PAINT;
    if (inp?.percentile && inp.category && FIELD_CATEGORY[inp.category]) {
      out.push({
        label: en ? "Response to touch (INP)" : "Reakcja na dotyk (INP)",
        valueText: `${Math.round(inp.percentile).toLocaleString(text.numberLocale)} ms`,
        rating: FIELD_CATEGORY[inp.category],
      });
    }
    const overall = json.loadingExperience?.overall_category;
    if (out.length > 0) field = { overall: overall ? FIELD_CATEGORY[overall] : undefined, metrics: out };
  }

  return { url, display, fetchedAt: Date.now(), scores, metrics, problems, screenshot, field };
}
