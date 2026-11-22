import { createSign } from "node:crypto";

const PROPERTY = process.env.GA_PROPERTY_ID?.replace(/^properties\//, "");
const EMAIL = process.env.GA_CLIENT_EMAIL;
const KEY = process.env.GA_PRIVATE_KEY?.replace(/\\n/g, "\n");
const SCOPE = "https://www.googleapis.com/auth/analytics.readonly";

export const gaConfigured = () => Boolean(PROPERTY && EMAIL && KEY);

export type Range = { startAt: number; endAt: number; days: number };

export function rangeOf(days: number): Range {
  const endAt = Date.now();
  const start = new Date(endAt - (days - 1) * 86_400_000);
  start.setHours(0, 0, 0, 0);
  return { startAt: start.getTime(), endAt, days };
}

let token: { value: string; exp: number } | null = null;

const b64url = (s: string | Buffer) => Buffer.from(s).toString("base64url");

async function accessToken() {
  if (token && token.exp > Date.now() + 60_000) return token.value;
  const now = Math.floor(Date.now() / 1000);
  const unsigned = `${b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }))}.${b64url(
    JSON.stringify({ iss: EMAIL, scope: SCOPE, aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 }),
  )}`;
  const signature = createSign("RSA-SHA256").update(unsigned).sign(KEY!).toString("base64url");
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${unsigned}.${signature}` }),
    cache: "no-store",
  });
  if (!res.ok) return null;
  const json = (await res.json()) as { access_token: string; expires_in: number };
  token = { value: json.access_token, exp: Date.now() + json.expires_in * 1000 };
  return token.value;
}

type Report = { rows?: { dimensionValues?: { value: string }[]; metricValues?: { value: string }[] }[] };

const cache = new Map<string, { at: number; data: Report }>();

async function report(body: Record<string, unknown>): Promise<Report | null> {
  if (!gaConfigured()) return null;
  const key = JSON.stringify(body);
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < 300_000) return hit.data;
  try {
    const t = await accessToken();
    if (!t) return null;
    const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY}:runReport`, {
      method: "POST",
      headers: { authorization: `Bearer ${t}`, "content-type": "application/json" },
      body: key,
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as Report;
    cache.set(key, { at: Date.now(), data });
    return data;
  } catch {
    return null;
  }
}

const dates = (r: Range) => [{ startDate: `${r.days - 1}daysAgo`, endDate: "today" }];
const n = (v?: { value: string }) => Number(v?.value) || 0;

export async function getStats(r: Range) {
  const rep = await report({
    dateRanges: dates(r),
    metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }, { name: "sessions" }, { name: "bounceRate" }, { name: "averageSessionDuration" }],
  });
  if (!rep) return null;
  const m = rep.rows?.[0]?.metricValues ?? [];
  return {
    visitors: n(m[0]),
    pageviews: n(m[1]),
    visits: n(m[2]),
    bounceRate: Math.round(n(m[3]) * 100),
    avgSeconds: Math.round(n(m[4])),
  };
}

export async function getDailyVisitors(r: Range): Promise<Map<string, number> | null> {
  const rep = await report({ dateRanges: dates(r), dimensions: [{ name: "date" }], metrics: [{ name: "activeUsers" }] });
  if (!rep) return null;
  return new Map(
    (rep.rows ?? []).map((row) => {
      const d = row.dimensionValues?.[0]?.value ?? "";
      return [`${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`, n(row.metricValues?.[0])];
    }),
  );
}

export type Metric = { x: string; y: number };

const DIMENSION = {
  path: ["pagePath", "screenPageViews"],
  referrer: ["sessionSource", "sessions"],
  device: ["deviceCategory", "activeUsers"],
  country: ["country", "activeUsers"],
  event: ["eventName", "eventCount"],
} as const;

export async function getMetrics(r: Range, type: keyof typeof DIMENSION, limit = 8): Promise<Metric[] | null> {
  const [dimension, metric] = DIMENSION[type];
  const rep = await report({
    dateRanges: dates(r),
    dimensions: [{ name: dimension }],
    metrics: [{ name: metric }],
    orderBys: [{ metric: { metricName: metric }, desc: true }],
    limit: type === "event" ? 50 : limit,
  });
  if (!rep) return null;
  return (rep.rows ?? []).map((row) => ({ x: row.dimensionValues?.[0]?.value ?? "", y: n(row.metricValues?.[0]) }));
}
