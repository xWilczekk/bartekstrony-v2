import { industryName } from "@/content/industries";
import { formatPrice, getService, getServiceFor } from "@/content/services";
import type { Locale } from "@/i18n/config";
import type { ContactInput, Lead, LeadKey } from "./schema";

export const sourceLabels: Record<string, string> = {
  hero: "Strona główna",
  podglad: "Podgląd strony",
  wycena: "Kalkulator wyceny",
  audyt: "Darmowy audyt",
  cennik: "Cennik",
  oferta: "Oferta",
  branza: "Strona branżowa",
  miasto: "Strona miasta",
  realizacja: "Realizacja",
  blog: "Blog",
  footer: "Stopka",
  faq: "Pytania (FAQ)",
  proces: "Sekcja „Jak pracuję”",
  "o-mnie": "Strona „O mnie”",
};

export const sourceLabelsEn: Record<string, string> = {
  hero: "Homepage",
  podglad: "Website preview",
  wycena: "Quote calculator",
  audyt: "Free audit",
  cennik: "Pricing",
  oferta: "Services",
  realizacja: "Case study",
  footer: "Footer",
  faq: "FAQ",
  proces: "How I work",
  "o-mnie": "About me page",
};

const LABELS = {
  pl: { zrodlo: "Skąd", usluga: "Usługa", branza: "Branża", miasto: "Miasto", budzet: "Budżet", wynik: "Wynik audytu", podglad: "Podgląd", about: "ok." },
  en: { zrodlo: "From", usluga: "Service", branza: "Industry", miasto: "Town", budzet: "Budget", wynik: "Audit score", podglad: "Preview", about: "approx." },
};

export function leadFacts(lead: Lead, locale: Locale = "pl"): { key: LeadKey; label: string; value: string }[] {
  const out: { key: LeadKey; label: string; value: string }[] = [];
  const add = (key: LeadKey, label: string, value: string) => value && out.push({ key, label, value });
  const t = LABELS[locale];
  const en = locale === "en";

  add("zrodlo", t.zrodlo, (en ? sourceLabelsEn : sourceLabels)[lead.zrodlo] ?? lead.zrodlo);
  add("usluga", t.usluga, getServiceFor(lead.usluga, locale)?.name ?? lead.usluga);
  add("branza", t.branza, industryName(lead.branza, locale));
  add("miasto", t.miasto, lead.miasto);
  const budget = Number(lead.budzet);
  add("budzet", t.budzet, Number.isFinite(budget) && budget > 0 ? `${t.about} ${formatPrice(budget, locale)}` : lead.budzet);
  add("wynik", t.wynik, lead.wynik ? `${lead.wynik}/100` : "");
  add("podglad", t.podglad, lead.podglad);
  return out;
}

function absolute(path: string, origin: string) {
  try {
    return new URL(path, origin).toString();
  } catch {
    return path;
  }
}

export function allFacts(data: ContactInput, origin = "https://bartekstrony.pl") {
  const l = data.lead;
  const rows: { label: string; value: string }[] = [
    { label: "Imię", value: data.name },
    { label: "E-mail", value: data.email },
    { label: "Telefon", value: data.phone },
    { label: "Firma", value: l.firma },
    { label: "Obecna strona", value: l.url },
    { label: "Język", value: l.jezyk === "en" ? "angielski — odpisz po angielsku" : "" },
    ...leadFacts(l).map((f) => ({
      label: f.label,
      value: f.key === "podglad" ? absolute(f.value, origin) : f.value,
    })),
  ];
  return rows.filter((r) => r.value);
}

export function buildSubject(data: ContactInput) {
  const l = data.lead;
  const src = (l.jezyk === "en" ? "[EN] " : "") + (l.zrodlo ? `[${l.zrodlo}] ` : "");
  const who = l.firma ? `${data.name} (${l.firma})` : data.name;
  const what = getService(l.usluga)?.name;
  return `${src}Zapytanie: ${who}${what ? ` — ${what}` : ""}`.slice(0, 180);
}

export function buildPlainText(data: ContactInput, origin?: string) {
  const rows = allFacts(data, origin).map((r) => `${r.label}: ${r.value}`);
  const parts = [rows.join("\n")];
  if (data.lead.opis) parts.push(`Z kalkulatora / audytu:\n${data.lead.opis}`);
  if (data.message) parts.push(`Wiadomość:\n${data.message}`);
  return parts.join("\n\n");
}
