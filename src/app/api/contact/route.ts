import { buildPlainText } from "@/components/contact/lead-text";
import { contactSchema, fieldErrors } from "@/components/contact/schema";
import { leadStorageReady, saveLead } from "@/lib/leads";
import { ipKey } from "@/lib/control-auth";
import { CONTACT_LIMIT, consume } from "@/lib/limiter";
import { rateLimit } from "./rate-limit";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 20_000;

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const quick = rateLimit(ip);
  const limit = quick.ok ? await consume(CONTACT_LIMIT, ipKey(ip)) : quick;
  if (!limit.ok) {
    return Response.json(
      { ok: false, code: "RATE_LIMITED" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  const body = await request.text();
  if (body.length > MAX_BODY_BYTES) return Response.json({ ok: false, code: "TOO_LARGE" }, { status: 413 });

  let raw: unknown;
  try {
    raw = JSON.parse(body);
  } catch {
    return Response.json({ ok: false, code: "INVALID_JSON" }, { status: 400 });
  }

  if (raw && typeof raw === "object" && "trap" in raw && typeof raw.trap === "string" && raw.trap.length > 0) {
    return Response.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return Response.json({ ok: false, code: "VALIDATION", fields: fieldErrors(parsed.error) }, { status: 400 });
  }
  const data = parsed.data;

  if (!leadStorageReady()) {
    console.warn("[contact] no lead storage (Vercel Blob not connected) — lead not saved:\n" + buildPlainText(data));
    return Response.json({ ok: false, code: "EMAIL_NOT_CONFIGURED" }, { status: 503 });
  }

  try {
    await saveLead(data);
  } catch (err) {
    console.error("[contact] saving the lead failed:", err, "\nLead:\n" + buildPlainText(data));
    return Response.json({ ok: false, code: "SEND_FAILED" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
