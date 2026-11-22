import { randomUUID } from "node:crypto";
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { del, get, list, put } from "@vercel/blob";
import type { ContactInput, Lead } from "@/components/contact/schema";

export const LEAD_STATUSES = ["nowe", "w-rozmowie", "wygrane", "przegrane"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export type StoredLead = {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: LeadStatus;
  note: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  lead: Lead;
};

const PREFIX = "leads/";
const LOCAL_DIR = path.join(process.cwd(), ".data", "leads");

export const blobEnabled = () => Boolean(process.env.BLOB_STORE_ID || process.env.BLOB_READ_WRITE_TOKEN);
const localEnabled = () => !blobEnabled() && process.env.NODE_ENV !== "production";

export const leadStorageReady = () => blobEnabled() || localEnabled();

async function write(lead: StoredLead) {
  const body = JSON.stringify(lead, null, 2);
  if (blobEnabled()) {
    await put(`${PREFIX}${lead.id}.json`, body, {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return;
  }
  if (!localEnabled()) throw new Error("Lead storage not configured (no BLOB_STORE_ID / BLOB_READ_WRITE_TOKEN)");
  await mkdir(LOCAL_DIR, { recursive: true });
  await writeFile(path.join(LOCAL_DIR, `${lead.id}.json`), body, "utf8");
}

async function readBlob(pathname: string): Promise<StoredLead | null> {
  const res = await get(pathname, { access: "private", useCache: false });
  if (!res || res.statusCode !== 200) return null;
  return JSON.parse(await new Response(res.stream).text()) as StoredLead;
}

export async function saveLead(input: ContactInput): Promise<StoredLead> {
  const now = new Date().toISOString();
  const lead: StoredLead = {
    id: `${now.slice(0, 10)}-${randomUUID().slice(0, 8)}`,
    createdAt: now,
    updatedAt: now,
    status: "nowe",
    note: "",
    name: input.name,
    email: input.email,
    phone: input.phone,
    message: input.message,
    lead: input.lead,
  };
  await write(lead);
  return lead;
}

export async function listLeads(): Promise<StoredLead[]> {
  let leads: StoredLead[] = [];
  if (blobEnabled()) {
    const pathnames: string[] = [];
    let cursor: string | undefined;
    do {
      const page = await list({ prefix: PREFIX, cursor, limit: 1000 });
      pathnames.push(...page.blobs.map((b) => b.pathname));
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
    leads = (await Promise.all(pathnames.map(readBlob))).filter((l): l is StoredLead => l !== null);
  } else if (localEnabled()) {
    const files = await readdir(LOCAL_DIR).catch(() => [] as string[]);
    leads = await Promise.all(
      files.filter((f) => f.endsWith(".json")).map(async (f) => JSON.parse(await readFile(path.join(LOCAL_DIR, f), "utf8")) as StoredLead),
    );
  }
  return leads.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

const safeId = (id: string) => /^[\w-]{6,80}$/.test(id);

export async function getLead(id: string): Promise<StoredLead | null> {
  if (!safeId(id)) return null;
  if (blobEnabled()) return readBlob(`${PREFIX}${id}.json`);
  if (!localEnabled()) return null;
  try {
    return JSON.parse(await readFile(path.join(LOCAL_DIR, `${id}.json`), "utf8")) as StoredLead;
  } catch {
    return null;
  }
}

export async function updateLead(id: string, patch: Partial<Pick<StoredLead, "status" | "note">>) {
  const lead = await getLead(id);
  if (!lead) throw new Error("Lead not found");
  await write({ ...lead, ...patch, updatedAt: new Date().toISOString() });
}

export async function deleteLead(id: string) {
  if (!safeId(id)) return;
  if (blobEnabled()) {
    await del(`${PREFIX}${id}.json`);
    return;
  }
  if (localEnabled()) await rm(path.join(LOCAL_DIR, `${id}.json`), { force: true });
}
