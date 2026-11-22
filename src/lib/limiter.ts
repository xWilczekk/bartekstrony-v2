import { get, put } from "@vercel/blob";
import { blobEnabled } from "./leads";

type Doc = { ip: Record<string, number[]>; all: number[] };
type Config = { name: string; windowMs: number; perIp: number; global: number };
type Result = { ok: true } | { ok: false; retryAfter: number };

const memory = new Map<string, Doc>();
const blobPath = (name: string) => `security/${name}.json`;

function prune(doc: Doc, windowMs: number, now: number): Doc {
  const keep = (list: number[]) => list.filter((t) => now - t < windowMs);
  const ip: Doc["ip"] = {};
  for (const [k, list] of Object.entries(doc.ip)) {
    const recent = keep(list);
    if (recent.length) ip[k] = recent;
  }
  return { ip, all: keep(doc.all) };
}

function take(doc: Doc, cfg: Config, key: string, now: number): { doc: Doc; result: Result } {
  const d = prune(doc, cfg.windowMs, now);
  const mine = d.ip[key] ?? [];
  const blocked = mine.length >= cfg.perIp ? mine : d.all.length >= cfg.global ? d.all : null;
  if (blocked) {
    return { doc: d, result: { ok: false, retryAfter: Math.max(1, Math.ceil((cfg.windowMs - (now - blocked[0])) / 1000)) } };
  }
  d.ip[key] = [...mine, now];
  d.all.push(now);
  return { doc: d, result: { ok: true } };
}

async function loadBlob(name: string): Promise<Doc> {
  try {
    const res = await get(blobPath(name), { access: "private", useCache: false });
    if (!res || res.statusCode !== 200) return { ip: {}, all: [] };
    return JSON.parse(await new Response(res.stream).text()) as Doc;
  } catch {
    return { ip: {}, all: [] };
  }
}

async function saveBlob(name: string, doc: Doc) {
  await put(blobPath(name), JSON.stringify(doc), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  }).catch(() => {});
}

export async function consume(cfg: Config, key: string): Promise<Result> {
  const now = Date.now();
  const local = take(memory.get(cfg.name) ?? { ip: {}, all: [] }, cfg, key, now);
  memory.set(cfg.name, local.doc);
  if (!local.result.ok || !blobEnabled()) return local.result;
  const shared = take(await loadBlob(cfg.name), cfg, key, now);
  if (shared.result.ok) await saveBlob(cfg.name, shared.doc);
  return shared.result;
}

export async function clear(cfg: Config, key: string) {
  const m = memory.get(cfg.name);
  if (m) delete m.ip[key];
  if (!blobEnabled()) return;
  const doc = prune(await loadBlob(cfg.name), cfg.windowMs, Date.now());
  if (!doc.ip[key]) return;
  delete doc.ip[key];
  await saveBlob(cfg.name, doc);
}

export const LOGIN_LIMIT: Config = { name: "login", windowMs: 15 * 60 * 1000, perIp: 5, global: 30 };
export const CONTACT_LIMIT: Config = { name: "contact", windowMs: 10 * 60 * 1000, perIp: 5, global: 60 };
