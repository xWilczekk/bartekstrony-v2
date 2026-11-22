import {
  addonPrice,
  addonsFor,
  addonsForLocale,
  contentOptions,
  express,
  isQuoteService,
  pricingFor,
  quoteServices,
  type DayRange,
  type QuoteService,
  type QuoteServiceSlug,
} from "@/content/pricing";
import { formatPrice } from "@/content/services";
import type { Locale } from "@/i18n/config";
import { plural } from "@/lib/utils";

const T = {
  pl: {
    products: "produktów",
    project: "projekt",
    day: ["dzień", "dni", "dni"] as [string, string, string],
    days: "dni",
    week: ["tydzień", "tygodnie", "tygodni"] as [string, string, string],
    base: "pakiet bazowy",
    beyond: "ponad pakiet",
    catalogue: "Katalog",
    texts: "Teksty na stronie napiszę za Ciebie",
    photos: "Dobór i obróbka zdjęć",
    logo: "Logo i podstawowa identyfikacja",
    express: "Ekspres",
    fromTwoWeeks: "od 2 tygodni",
    features: "funkcje",
    spec: "specyfikacja",
    specHave: "mam opis lub makiety",
    specHelp: "potrzebuję pomocy z doprecyzowaniem",
    textsW: "teksty",
    photosW: "zdjęcia",
    logoW: "logo",
    have: "mam",
    needHelp: "potrzebuję pomocy",
    need: "potrzebuję",
    timing: "termin",
    expressW: "ekspres",
    standard: "standard",
    estimate: "szacunek",
    plus: "do tego",
    monthly: "miesięcznie",
    individual: "wycena indywidualna po rozmowie",
  },
  en: {
    products: "products",
    project: "project",
    day: ["day", "days", "days"] as [string, string, string],
    days: "days",
    week: ["week", "weeks", "weeks"] as [string, string, string],
    base: "base package",
    beyond: "beyond the package",
    catalogue: "Catalogue",
    texts: "I write the website copy for you",
    photos: "Photo selection and editing",
    logo: "Logo and basic brand identity",
    express: "Express",
    fromTwoWeeks: "from 2 weeks",
    features: "features",
    spec: "specification",
    specHave: "I have a description or mock-ups",
    specHelp: "I need help defining it",
    textsW: "copy",
    photosW: "photos",
    logoW: "logo",
    have: "I have them",
    needHelp: "I need help",
    need: "I need one",
    timing: "timing",
    expressW: "express",
    standard: "standard",
    estimate: "estimate",
    plus: "plus",
    monthly: "per month",
    individual: "individual quote after a conversation",
  },
} satisfies Record<Locale, Record<string, unknown>>;

export type QuoteState = {
  service: QuoteServiceSlug | null;
  scope: number;
  addons: string[];
  texts: "have" | "help";
  photos: "have" | "help";
  logo: "have" | "need";
  speed: "standard" | "express";
};

export const initialState: QuoteState = {
  service: null,
  scope: 0,
  addons: [],
  texts: "have",
  photos: "have",
  logo: "have",
  speed: "standard",
};

export type QuoteLine = { id: string; label: string; amount: number; recurring?: boolean };

export type Quote = {
  service: QuoteService;
  priced: boolean;
  lines: QuoteLine[];
  total: number;
  low: number;
  high: number;
  mid: number;
  recurring: number;
  days: DayRange;
  duration: string;
  scopeLabel: string;
  summary: string;
};

export function defaultScope(slug: QuoteServiceSlug): number {
  return quoteServices[slug].scope.default;
}

export function scopeLabel(svc: QuoteService, value: number, locale: Locale = "pl"): string {
  const t = T[locale];
  const sc = svc.scope;
  if (sc.kind === "slider") return `${value} ${plural(value, sc.unit)}`;
  if (sc.kind === "steps") return `${sc.steps[clampIndex(value, sc.steps.length)].label} ${t.products}`;
  return `${t.project}: ${sc.options[clampIndex(value, sc.options.length)].label.toLowerCase()}`;
}

const clampIndex = (v: number, len: number) => Math.min(Math.max(Math.round(v) || 0, 0), len - 1);
const roundTo = (n: number, step: number) => Math.round(n / step) * step;

export function formatDays([min, max]: DayRange, locale: Locale = "pl"): string {
  const t = T[locale];
  if (max <= 14) {
    const a = Math.max(1, Math.round(min));
    const b = Math.max(a, Math.round(max));
    return a === b ? `${a} ${plural(a, t.day)}` : `${a}–${b} ${t.days}`;
  }
  const a = Math.max(1, Math.round(min / 7));
  const b = Math.max(a, Math.ceil(max / 7));
  if (a === b) return `${a} ${plural(a, t.week)}`;
  return `${a}–${b} ${plural(b, t.week)}`;
}

export function computeQuote(s: QuoteState, locale: Locale = "pl"): Quote | null {
  if (!s.service || !isQuoteService(s.service)) return null;
  const t = T[locale];
  const money = (n: number) => formatPrice(n, locale);
  const svc = pricingFor(locale).quoteServices[s.service];
  const priced = svc.base !== null;
  const lines: QuoteLine[] = [];
  let minD = svc.baseDays[0];
  let maxD = svc.baseDays[1];
  const addDays = (d: DayRange) => {
    minD += d[0];
    maxD += d[1];
  };

  if (priced) lines.push({ id: "base", label: `${svc.label} — ${t.base}`, amount: svc.base! });

  const sc = svc.scope;
  let pagesForCopy = svc.copyFlat ?? 1;
  if (sc.kind === "slider") {
    const n = Math.min(Math.max(Math.round(s.scope), sc.min), sc.max);
    pagesForCopy = n;
    const extra = Math.max(0, n - sc.included);
    if (extra > 0) {
      lines.push({
        id: "scope",
        label: `${extra} ${plural(extra, sc.unit)} ${t.beyond}`,
        amount: extra * sc.perExtra,
      });
      addDays([extra * sc.extraDays[0], extra * sc.extraDays[1]]);
    }
  } else if (sc.kind === "steps") {
    const step = sc.steps[clampIndex(s.scope, sc.steps.length)];
    if (step.add > 0) lines.push({ id: "scope", label: `${t.catalogue}: ${step.label} ${t.products}`, amount: step.add });
    addDays(step.days);
  }

  const chosen = addonsForLocale(svc.slug, locale).filter((a) => s.addons.includes(a.id));
  for (const a of chosen) {
    if (priced) {
      lines.push({
        id: a.id,
        label: a.label,
        amount: addonPrice(a, svc.slug),
        recurring: a.recurring,
      });
    }
    addDays(a.days);
  }

  if (priced) {
    if (s.texts === "help") {
      lines.push({
        id: "texts",
        label: t.texts,
        amount: Math.max(contentOptions.texts.min, contentOptions.texts.perPage * pagesForCopy),
      });
      addDays(contentOptions.texts.days);
    }
    if (s.photos === "help") {
      lines.push({ id: "photos", label: t.photos, amount: contentOptions.photos.help });
      addDays(contentOptions.photos.days);
    }
    if (s.logo === "need") {
      lines.push({ id: "logo", label: t.logo, amount: contentOptions.logo.need });
      addDays(contentOptions.logo.days);
    }
  }

  const oneTime = lines.filter((l) => !l.recurring).reduce((sum, l) => sum + l.amount, 0);
  const recurring = lines.filter((l) => l.recurring).reduce((sum, l) => sum + l.amount, 0);

  let total = oneTime;
  if (s.speed === "express") {
    minD = Math.max(express.minDays, Math.round(minD * express.timeFactor));
    maxD = Math.max(minD + 1, Math.round(maxD * express.timeFactor));
    if (priced) {
      const amount = roundTo(oneTime * express.surcharge, 10);
      lines.push({ id: "express", label: `${t.express} (+${Math.round(express.surcharge * 100)}%)`, amount });
      total += amount;
    }
  }

  const low = priced ? Math.round(total / 50) * 50 : 0;
  const high = priced ? Math.max(low + 100, Math.ceil((total * svc.spread) / 100) * 100) : 0;
  const mid = priced ? Math.round((low + high) / 2 / 100) * 100 : 0;
  const days: DayRange = [minD, maxD];
  const duration = priced ? formatDays(days, locale) : t.fromTwoWeeks;
  const label = scopeLabel(svc, s.scope, locale);

  const parts: string[] = [`${svc.label}, ${label}`];
  if (chosen.length) parts.push(`${t.features}: ${chosen.map((a) => a.short).join(", ")}`);
  if (svc.slug === "aplikacje-ai") {
    parts.push(`${t.spec}: ${s.texts === "have" ? t.specHave : t.specHelp}`);
  } else {
    parts.push(`${t.textsW}: ${s.texts === "have" ? t.have : t.needHelp}`);
    parts.push(`${t.photosW}: ${s.photos === "have" ? t.have : t.needHelp}`);
    parts.push(`${t.logoW}: ${s.logo === "have" ? t.have : t.need}`);
  }
  parts.push(`${t.timing}: ${s.speed === "express" ? t.expressW : t.standard}`);
  if (priced) {
    parts.push(`${t.estimate} ${money(low)}–${money(high)}, ${duration}${recurring ? `, ${t.plus} ${money(recurring)} ${t.monthly}` : ""}`);
  } else {
    parts.push(t.individual);
  }

  return {
    service: svc,
    priced,
    lines,
    total,
    low,
    high,
    mid,
    recurring,
    days,
    duration,
    scopeLabel: label,
    summary: parts.join(". ") + ".",
  };
}

export type UrlState = { state: QuoteState; step: number };

export function stateToParams(s: QuoteState, step: number): URLSearchParams {
  const q = new URLSearchParams();
  if (s.service) {
    q.set("u", s.service);
    q.set("z", String(s.scope));
    if (s.addons.length) q.set("d", s.addons.join(","));
    if (s.texts === "help") q.set("t", "1");
    if (s.photos === "help") q.set("f", "1");
    if (s.logo === "need") q.set("l", "1");
    if (s.speed === "express") q.set("e", "1");
    if (step > 0) q.set("k", String(step));
  }
  return q;
}

export function paramsFromUrl(get: (k: string) => string | null): UrlState {
  const u = get("u");
  if (!isQuoteService(u)) return { state: initialState, step: 0 };
  const svc = quoteServices[u];
  const allowed = new Set(addonsFor(u).map((a) => a.id));
  const zRaw = Number(get("z"));
  const sc = svc.scope;
  let scope = Number.isFinite(zRaw) && get("z") !== null ? zRaw : sc.default;
  if (sc.kind === "slider") scope = Math.min(Math.max(Math.round(scope), sc.min), sc.max);
  else scope = clampIndex(scope, sc.kind === "steps" ? sc.steps.length : sc.options.length);

  const state: QuoteState = {
    service: u,
    scope,
    addons: (get("d") ?? "").split(",").filter((id) => allowed.has(id)),
    texts: get("t") === "1" ? "help" : "have",
    photos: get("f") === "1" ? "help" : "have",
    logo: get("l") === "1" ? "need" : "have",
    speed: get("e") === "1" ? "express" : "standard",
  };
  const k = Number(get("k"));
  const step = get("k") !== null && Number.isInteger(k) && k >= 1 && k <= 5 ? k : 1;
  return { state, step };
}
