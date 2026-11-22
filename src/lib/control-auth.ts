import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const SESSION_COOKIE = "bs_control";
export const SESSION_DAYS = 14;

const password = () => process.env.CONTROL_PASSWORD ?? "";
export const controlConfigured = () => password().length >= 8;

function secret() {
  return process.env.CONTROL_SECRET || createHash("sha256").update(`bs-control:v1:${password()}`).digest("hex");
}

const sign = (value: string) => createHmac("sha256", secret()).update(`session:${value}`).digest("base64url");

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export function checkPassword(input: string) {
  if (!controlConfigured() || input.length > 200) return false;
  const h = (s: string) => createHash("sha256").update(s).digest("hex");
  return safeEqual(h(input), h(password()));
}

export function createSessionValue() {
  const exp = String(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  return { value: `${exp}.${sign(exp)}`, maxAge: SESSION_DAYS * 24 * 60 * 60 };
}

export function verifySessionValue(raw: string | undefined) {
  if (!controlConfigured() || !raw || raw.length > 200) return false;
  const [exp, sig, extra] = raw.split(".");
  if (!exp || !sig || extra !== undefined || !/^\d{13}$/.test(exp)) return false;
  if (!safeEqual(sig, sign(exp))) return false;
  const ms = Number(exp);
  return ms > Date.now() && ms <= Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000 + 60_000;
}

export async function isAuthed() {
  const { cookies } = await import("next/headers");
  return verifySessionValue((await cookies()).get(SESSION_COOKIE)?.value);
}

export const ipKey = (ip: string) => createHmac("sha256", secret()).update(`ip:${ip}`).digest("hex").slice(0, 24);
