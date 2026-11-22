"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { checkPassword, controlConfigured, createSessionValue, ipKey, isAuthed, SESSION_COOKIE } from "@/lib/control-auth";
import { deleteLead, LEAD_STATUSES, updateLead, type LeadStatus } from "@/lib/leads";
import { clear, consume, LOGIN_LIMIT } from "@/lib/limiter";

export type LoginState = { error?: string };

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function clientIp() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}

export async function login(_prev: LoginState, form: FormData): Promise<LoginState> {
  if (!controlConfigured()) return { error: "Panel nie jest skonfigurowany: ustaw CONTROL_PASSWORD (min. 8 znaków)." };

  const key = ipKey(await clientIp());
  const limit = await consume(LOGIN_LIMIT, key);
  if (!limit.ok) return { error: `Za dużo prób logowania. Spróbuj za ${Math.ceil(limit.retryAfter / 60)} min.` };

  const pw = form.get("password");
  if (typeof pw !== "string" || !checkPassword(pw)) {
    await sleep(800);
    return { error: "Złe hasło." };
  }

  await clear(LOGIN_LIMIT, key);
  const session = createSessionValue();
  (await cookies()).set(SESSION_COOKIE, session.value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/control",
    maxAge: session.maxAge,
    priority: "high",
  });
  redirect("/control");
}

export async function logout() {
  (await cookies()).delete({ name: SESSION_COOKIE, path: "/control" });
  redirect("/control");
}

async function guard() {
  if (!(await isAuthed())) redirect("/control");
}

const leadId = (form: FormData) => {
  const id = form.get("id");
  return typeof id === "string" && /^[\w-]{6,80}$/.test(id) ? id : null;
};

export async function saveLeadAction(form: FormData) {
  await guard();
  const id = leadId(form);
  if (!id) redirect("/control/zapytania");
  const status = form.get("status");
  const note = form.get("note");
  await updateLead(id, {
    note: typeof note === "string" ? note.slice(0, 5000) : "",
    ...(typeof status === "string" && LEAD_STATUSES.includes(status as LeadStatus) ? { status: status as LeadStatus } : {}),
  });
  revalidatePath("/control", "layout");
  redirect(`/control/zapytania/${id}?zapisano=1`);
}

export async function deleteLeadAction(form: FormData) {
  await guard();
  const id = leadId(form);
  if (id) await deleteLead(id);
  revalidatePath("/control", "layout");
  redirect("/control/zapytania?usunieto=1");
}
