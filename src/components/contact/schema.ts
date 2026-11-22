import { z } from "zod";
import { emptyLead } from "./lead";

export { LEAD_KEYS, emptyLead, messageEn, type Lead, type LeadKey } from "./lead";

const text = (max: number) => z.string().trim().max(max, "Za długie").default("");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const contactSchema = z
  .object({
    name: z.string().trim().min(2, "Podaj swoje imię").max(100, "Za długie"),
    email: text(200).refine((v) => v === "" || EMAIL_RE.test(v), "Sprawdź adres e-mail"),
    phone: text(30).refine(
      (v) => v === "" || (/^[+()\d\s-]+$/.test(v) && v.replace(/\D/g, "").length >= 9),
      "Sprawdź numer telefonu",
    ),
    message: text(5000),
    consent: z.literal(true, { error: "Zaznacz zgodę, żebym mógł odpowiedzieć" }),
    trap: z.string().max(0).default(""),
    lead: z
      .object({
        zrodlo: text(40),
        firma: text(150),
        branza: text(60),
        miasto: text(80),
        usluga: text(60),
        budzet: text(12),
        url: text(300).transform((v) => (/^[a-z][a-z0-9+.-]*:/i.test(v) && !/^https?:\/\//i.test(v) ? "" : v)),
        wynik: text(4),
        podglad: text(400).transform((v) => (v.startsWith("/") && !v.startsWith("//") && !v.includes("\\") ? v : "")),
        opis: text(1500),
        jezyk: text(5),
      })
      .default(emptyLead),
  })
  .superRefine((d, ctx) => {
    if (!d.email && !d.phone) {
      ctx.addIssue({ code: "custom", path: ["email"], message: "Podaj e-mail albo telefon" });
    }
    const hasContext = !!(d.lead.opis || d.lead.podglad || d.lead.wynik || d.lead.usluga);
    if (d.message.length < 10 && !hasContext) {
      ctx.addIssue({ code: "custom", path: ["message"], message: "Napisz kilka słów o tym, czego potrzebujesz" });
    }
  });

export type ContactInput = z.infer<typeof contactSchema>;

export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "form";
    if (!(key in out)) out[key] = issue.message;
  }
  return out;
}
