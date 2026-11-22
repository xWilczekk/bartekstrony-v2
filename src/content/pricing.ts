import type { Locale } from "@/i18n/config";
import {
  addonsTextEn,
  comparisonRowsEn,
  extraPriceItemsEn,
  notIncludedEn,
  packsTextEn,
  priceFactorsEn,
  quoteServicesTextEn,
  quoteStepsEn,
} from "./en/pricing";
import { getService, getServiceFor } from "./services";

export type QuoteServiceSlug =
  | "landing-page"
  | "strona-firmowa"
  | "sklep-internetowy"
  | "redesign-strony"
  | "pozycjonowanie-seo"
  | "aplikacje-ai";

export type DayRange = [number, number];

export type SliderScope = {
  kind: "slider";
  question: string;
  hint: string;
  unit: [string, string, string];
  min: number;
  max: number;
  default: number;
  included: number;
  perExtra: number;
  extraDays: DayRange;
};

export type StepsScope = {
  kind: "steps";
  question: string;
  hint: string;
  steps: { label: string; add: number; days: DayRange }[];
  default: number;
};

export type ChoiceScope = {
  kind: "choice";
  question: string;
  hint: string;
  options: { label: string; hint: string }[];
  default: number;
};

export type Scope = SliderScope | StepsScope | ChoiceScope;

export type QuoteService = {
  slug: QuoteServiceSlug;
  label: string;
  base: number | null;
  baseDays: DayRange;
  spread: number;
  scope: Scope;
  copyFlat?: number;
};

export const quoteServices: Record<QuoteServiceSlug, QuoteService> = {
  "landing-page": {
    slug: "landing-page",
    label: "Landing page",
    base: getService("landing-page")?.priceFrom ?? 500,
    baseDays: [3, 5],
    spread: 1.3,
    scope: {
      kind: "slider",
      question: "Ile podstron ma mieć strona?",
      hint: "Landing to jedna długa strona. Ewentualne dodatkowe podstrony to np. podziękowanie po wysłaniu formularza albo regulamin.",
      unit: ["podstrona", "podstrony", "podstron"],
      min: 1,
      max: 4,
      default: 1,
      included: 1,
      perExtra: 200,
      extraDays: [1, 2],
    },
  },
  "strona-firmowa": {
    slug: "strona-firmowa",
    label: "Strona firmowa",
    base: getService("strona-firmowa")?.priceFrom ?? 1500,
    baseDays: [7, 14],
    spread: 1.25,
    scope: {
      kind: "slider",
      question: "Ile podstron potrzebujesz?",
      hint: "Typowa firma: Start, Oferta, O nas, Kontakt. Do tego osobne podstrony usług, realizacje, cennik.",
      unit: ["podstrona", "podstrony", "podstron"],
      min: 3,
      max: 20,
      default: 6,
      included: 4,
      perExtra: 200,
      extraDays: [1, 2],
    },
  },
  "sklep-internetowy": {
    slug: "sklep-internetowy",
    label: "Sklep internetowy",
    base: getService("sklep-internetowy")?.priceFrom ?? 3500,
    baseDays: [14, 28],
    spread: 1.35,
    copyFlat: 5,
    scope: {
      kind: "steps",
      question: "Ile produktów będzie w sklepie?",
      hint: "Orientacyjnie. Im więcej produktów i wariantów, tym więcej importu, zdjęć i testów.",
      default: 1,
      steps: [
        { label: "do 20", add: 0, days: [0, 0] },
        { label: "do 50", add: 0, days: [0, 2] },
        { label: "do 150", add: 600, days: [2, 4] },
        { label: "do 500", add: 1400, days: [3, 7] },
        { label: "do 2 000", add: 2400, days: [5, 10] },
        { label: "ponad 2 000", add: 3800, days: [8, 14] },
      ],
    },
  },
  "redesign-strony": {
    slug: "redesign-strony",
    label: "Redesign strony",
    base: getService("redesign-strony")?.priceFrom ?? 1200,
    baseDays: [5, 10],
    spread: 1.25,
    scope: {
      kind: "slider",
      question: "Ile podstron ma obecna strona?",
      hint: "Liczę te, które mają zostać po przeniesieniu. Nieistotne wpisy mogą zniknąć.",
      unit: ["podstrona", "podstrony", "podstron"],
      min: 1,
      max: 30,
      default: 6,
      included: 3,
      perExtra: 120,
      extraDays: [0.5, 1],
    },
  },
  "pozycjonowanie-seo": {
    slug: "pozycjonowanie-seo",
    label: "SEO i widoczność w Google",
    base: getService("pozycjonowanie-seo")?.priceFrom ?? 600,
    baseDays: [7, 14],
    spread: 1.3,
    scope: {
      kind: "slider",
      question: "Ile usług lub podstron mam zoptymalizować?",
      hint: "Każda usługa to osobna fraza i osobna podstrona, która ma wyjść w Google.",
      unit: ["usługa", "usługi", "usług"],
      min: 1,
      max: 12,
      default: 3,
      included: 2,
      perExtra: 120,
      extraDays: [1, 2],
    },
  },
  "aplikacje-ai": {
    slug: "aplikacje-ai",
    label: "Aplikacja lub integracja AI",
    base: null,
    baseDays: [14, 42],
    spread: 1,
    scope: {
      kind: "choice",
      question: "Jak duży to projekt?",
      hint: "Nie liczę tego w kalkulatorze — aplikacje wyceniam po rozmowie. Ten wybór pomoże mi się przygotować.",
      default: 1,
      options: [
        { label: "Prosty", hint: "Jeden kalkulator, formularz albo mały panel." },
        { label: "Średni", hint: "Konta użytkowników, panel admina, kilka integracji." },
        { label: "Rozbudowany", hint: "System z wieloma rolami, płatnościami i automatyzacjami." },
      ],
    },
  },
};

export const quoteServiceOrder: QuoteServiceSlug[] = [
  "landing-page",
  "strona-firmowa",
  "sklep-internetowy",
  "redesign-strony",
  "pozycjonowanie-seo",
  "aplikacje-ai",
];

export const isQuoteService = (v: string | null | undefined): v is QuoteServiceSlug =>
  !!v && v in quoteServices;

export type Addon = {
  id: string;
  label: string;
  short: string;
  hint: string;
  price: number;
  from?: boolean;
  priceFor?: Partial<Record<QuoteServiceSlug, number>>;
  recurring?: boolean;
  days: DayRange;
  for: QuoteServiceSlug[];
};

const SITES: QuoteServiceSlug[] = ["landing-page", "strona-firmowa", "redesign-strony"];

export const addons: Addon[] = [
  {
    id: "cms",
    label: "Panel do edycji treści",
    short: "panel edycji treści",
    hint: "Sam zmienisz teksty, zdjęcia i ceny — bez dzwonienia do mnie. W stronie firmowej i sklepie jest w cenie.",
    price: 400,
    days: [1, 2],
    for: ["landing-page", "redesign-strony"],
  },
  {
    id: "blog",
    label: "Blog / aktualności",
    short: "blog",
    hint: "Miejsce na artykuły, które przyciągają klientów z Google.",
    price: 400,
    days: [1, 1],
    for: [...SITES, "sklep-internetowy"],
  },
  {
    id: "rezerwacje-gotowe",
    label: "Podpięcie gotowych rezerwacji (Booksy, Calendly…)",
    short: "rezerwacje przez Booksy / Calendly",
    hint: "Masz już system rezerwacji? Podpinam go pod stronę: przycisk, kalendarz i dopasowany wygląd.",
    price: 200,
    days: [0, 1],
    for: SITES,
  },
  {
    id: "rezerwacje",
    label: "Własny system rezerwacji online",
    short: "własne rezerwacje online",
    hint: "Kalendarz terminów na Twojej stronie, potwierdzenia mailem, przypomnienia, panel z rezerwacjami.",
    price: 1200,
    from: true,
    days: [3, 5],
    for: SITES,
  },
  {
    id: "platnosci",
    label: "Płatności online",
    short: "płatności online",
    hint: "BLIK, Przelewy24, karty — na zaliczki, usługi albo bilety.",
    price: 500,
    days: [1, 2],
    for: SITES,
  },
  {
    id: "jezyk",
    label: "Druga wersja językowa",
    short: "druga wersja językowa",
    hint: "Np. angielska lub ukraińska. Cena nie obejmuje tłumaczenia tekstów.",
    price: 600,
    priceFor: { "sklep-internetowy": 900 },
    days: [1, 2],
    for: [...SITES, "sklep-internetowy"],
  },
  {
    id: "kalkulator",
    label: "Kalkulator lub konfigurator na stronie",
    short: "kalkulator na stronie",
    hint: "Klient sam liczy cenę usługi albo składa zamówienie z opcji.",
    price: 700,
    from: true,
    days: [2, 4],
    for: [...SITES, "sklep-internetowy"],
  },
  {
    id: "newsletter",
    label: "Newsletter i zapisy",
    short: "newsletter",
    hint: "Formularz zapisu połączony z MailerLite lub podobnym narzędziem.",
    price: 300,
    days: [1, 1],
    for: [...SITES, "sklep-internetowy"],
  },
  {
    id: "gbp",
    label: "Profil Firmy w Google (konfiguracja)",
    short: "Profil Firmy w Google",
    hint: "Wizytówka w Mapach: kategorie, zdjęcia, godziny, powiązanie ze stroną.",
    price: 250,
    days: [0, 1],
    for: SITES,
  },
  {
    id: "opinie-google",
    label: "Opinie z Google na stronie",
    short: "opinie z Google",
    hint: "Najlepsze opinie z Map Google pokazane na stronie, z gwiazdkami i linkiem do wszystkich.",
    price: 150,
    days: [0, 1],
    for: [...SITES, "sklep-internetowy"],
  },
  {
    id: "import-hurtownia",
    label: "Import produktów z hurtowni (XML / CSV)",
    short: "import produktów z hurtowni",
    hint: "Automatyczna aktualizacja cen i stanów magazynowych.",
    price: 800,
    from: true,
    days: [1, 2],
    for: ["sklep-internetowy"],
  },
  {
    id: "ksiegowosc",
    label: "Integracja z księgowością",
    short: "integracja z księgowością",
    hint: "Faktury z zamówień trafiają automatycznie do Fakturowni, wFirmy itp.",
    price: 600,
    days: [1, 2],
    for: ["sklep-internetowy"],
  },
  {
    id: "allegro",
    label: "Integracja z Allegro",
    short: "integracja z Allegro",
    hint: "Jeden magazyn dla sklepu i aukcji.",
    price: 900,
    from: true,
    days: [2, 4],
    for: ["sklep-internetowy"],
  },
  {
    id: "seo-artykul",
    label: "Dodatkowy artykuł pod frazy (1 szt.)",
    short: "dodatkowe artykuły SEO",
    hint: "Tekst pod konkretne zapytanie z Twojej okolicy.",
    price: 250,
    days: [1, 1],
    for: ["pozycjonowanie-seo"],
  },
  {
    id: "seo-konkurencja",
    label: "Analiza konkurencji w Twoim mieście",
    short: "analiza konkurencji",
    hint: "Kto jest przed Tobą w Google i dlaczego.",
    price: 300,
    days: [1, 1],
    for: ["pozycjonowanie-seo"],
  },
  {
    id: "seo-miesiecznie",
    label: "Stała opieka SEO (miesięcznie)",
    short: "stała opieka SEO",
    hint: "Raport widoczności i kolejne poprawki co miesiąc.",
    price: 400,
    recurring: true,
    days: [0, 0],
    for: ["pozycjonowanie-seo"],
  },
  {
    id: "opieka",
    label: "Opieka miesięczna (hosting, aktualizacje, drobne zmiany)",
    short: "opieka miesięczna",
    hint: "Po 30 dniach darmowego wsparcia: ktoś pilnuje strony i wprowadza drobne zmiany.",
    price: 99,
    priceFor: { "sklep-internetowy": 199 },
    recurring: true,
    days: [0, 0],
    for: [...SITES, "sklep-internetowy"],
  },
  {
    id: "app-konta",
    label: "Konta użytkowników i logowanie",
    short: "logowanie użytkowników",
    hint: "Klienci lub pracownicy mają własne konta i uprawnienia.",
    price: 0,
    days: [0, 0],
    for: ["aplikacje-ai"],
  },
  {
    id: "app-admin",
    label: "Panel administratora",
    short: "panel administratora",
    hint: "Zarządzasz danymi, użytkownikami i zamówieniami w jednym miejscu.",
    price: 0,
    days: [0, 0],
    for: ["aplikacje-ai"],
  },
  {
    id: "app-api",
    label: "Integracje z innymi systemami (API)",
    short: "integracje API",
    hint: "CRM, księgowość, magazyn, płatności, kurierzy.",
    price: 0,
    days: [0, 0],
    for: ["aplikacje-ai"],
  },
  {
    id: "app-ai",
    label: "Asystent AI lub automatyzacja",
    short: "AI / automatyzacje",
    hint: "Odpowiadanie na pytania klientów, analiza dokumentów, generowanie treści.",
    price: 0,
    days: [0, 0],
    for: ["aplikacje-ai"],
  },
  {
    id: "app-raporty",
    label: "Raporty, wykresy i eksport danych",
    short: "raporty i eksport",
    hint: "Podsumowania w PDF / Excelu, dashboard z liczbami.",
    price: 0,
    days: [0, 0],
    for: ["aplikacje-ai"],
  },
];

export const addonPrice = (a: Addon, svc: QuoteServiceSlug) => a.priceFor?.[svc] ?? a.price;
export const addonsFor = (svc: QuoteServiceSlug) => addons.filter((a) => a.for.includes(svc));

export const contentOptions = {
  texts: {
    perPage: 100,
    min: 300,
    days: [1, 2] as DayRange,
  },
  photos: {
    help: 250,
    days: [0, 1] as DayRange,
  },
  logo: {
    need: 600,
    days: [2, 3] as DayRange,
  },
} as const;

export const express = {
  surcharge: 0.3,
  timeFactor: 0.55,
  minDays: 2,
} as const;

export const quoteSteps = ["Usługa", "Zakres", "Funkcje", "Treści", "Termin", "Wynik"] as const;

export type Pack = {
  slug: QuoteServiceSlug;
  name: string;
  forWho: string;
  priceFrom: number | null;
  priceNote: string;
  timeline: string;
  highlight?: boolean;
  bullets: string[];
};

function pack(slug: QuoteServiceSlug, extra: Pick<Pack, "priceNote" | "bullets" | "highlight">): Pack {
  const s = getService(slug)!;
  return {
    slug,
    name: s.name,
    forWho: s.forWho,
    priceFrom: s.priceFrom,
    timeline: s.timeline,
    ...extra,
  };
}

export const packages: Pack[] = [
  pack("landing-page", {
    priceNote: "jedna strona, bez ukrytych kosztów",
    bullets: ["Projekt pod Twoją markę", "Formularz i klik-do-zadzwonienia", "Podstawowe SEO i Mapy Google"],
  }),
  pack("strona-firmowa", {
    highlight: true,
    priceNote: "do 4 podstron, każda kolejna 200 zł",
    bullets: ["Oferta, realizacje, opinie, kontakt", "SEO lokalne pod Twoje miasto", "Analityka i Google Search Console", "Panel do edycji treści w cenie"],
  }),
  pack("sklep-internetowy", {
    priceNote: "do 50 produktów z importem",
    bullets: ["Płatności BLIK, Przelewy24, karty", "Kurierzy i InPost", "Panel zamówień", "SEO kategorii i produktów"],
  }),
];

export const bigger: Pack = pack("aplikacje-ai", {
  priceNote: "wycena po rozmowie",
  bullets: ["Panele klienta i dashboardy", "Integracje API i automatyzacje", "Asystenci AI na stronie"],
});

export const otherPacks: Pack[] = [
  pack("redesign-strony", {
    priceNote: "do 3 podstron, każda kolejna ok. 120 zł",
    bullets: ["Audyt obecnej strony", "Przeniesienie treści i przekierowania 301", "Pomiar przed i po"],
  }),
  pack("pozycjonowanie-seo", {
    priceNote: "do 2 usług, każda kolejna ok. 120 zł",
    bullets: ["Analiza fraz w Twojej okolicy", "Optymalizacja techniczna", "Raport widoczności"],
  }),
];

export const comparisonCols = [
  { slug: "landing-page", name: "Landing page" },
  { slug: "strona-firmowa", name: "Strona firmowa" },
  { slug: "sklep-internetowy", name: "Sklep internetowy" },
] as const;

export const comparisonRows: { label: string; values: [string, string, string] }[] = [
  { label: "Podstrony w cenie", values: ["1", "do 4", "strony informacyjne + katalog"] },
  { label: "Projekt graficzny pod Twoją markę", values: ["tak", "tak", "tak"] },
  { label: "Widok na telefonie i tablecie", values: ["tak", "tak", "tak"] },
  { label: "Formularz i klik-do-zadzwonienia", values: ["tak", "tak", "tak"] },
  { label: "SEO na start", values: ["podstawowe", "lokalne pod Twoje miasto", "kategorii i produktów"] },
  { label: "Mapy Google i Search Console", values: ["tak", "tak", "tak"] },
  { label: "Panel do edycji treści", values: ["opcja", "tak", "tak"] },
  { label: "Płatności online (BLIK, P24, karty)", values: ["opcja", "opcja", "tak"] },
  { label: "Katalog produktów z wariantami", values: ["nie", "nie", "tak"] },
  { label: "Kurierzy i InPost", values: ["nie", "nie", "tak"] },
  { label: "30 dni wsparcia technicznego po starcie", values: ["tak", "tak", "tak"] },
];

export const priceFactors: { title: string; text: string }[] = [
  {
    title: "Zakres",
    text: "Liczba podstron albo produktów. Landing page to jedna strona, firmowa to kilka, sklep to katalog. Każda kolejna podstrona to więcej projektowania, treści i testów.",
  },
  {
    title: "Treści",
    text: "Jeśli masz teksty i zdjęcia, oszczędzasz czas i pieniądze. Jeśli ich nie masz, napiszę teksty i dobiorę zdjęcia — to dodatkowa praca, więc jest osobno w cenie.",
  },
  {
    title: "Funkcje",
    text: "Formularz kontaktowy to standard. Rezerwacje online, płatności, panel edycji czy kalkulator to osobne elementy do zaprojektowania i przetestowania.",
  },
  {
    title: "Integracje",
    text: "Połączenie z Allegro, księgowością czy hurtownią to pewna praca — i ryzyko, że drugi system zachowa się inaczej niż w dokumentacji. Wyceniam je osobno.",
  },
  {
    title: "Termin",
    text: "Standardowy czas to spokojna praca nad jednym projektem. Ekspres oznacza, że przesuwam inne zlecenia — dlatego +30%. Wolne terminy potwierdzam w wycenie.",
  },
];

export const notIncluded: { title: string; text: string }[] = [
  {
    title: "Domena i hosting",
    text: "Rejestrujesz je na siebie i płacisz dostawcy. Pomagam wybrać i skonfigurować. Dzięki temu masz pełną kontrolę nad swoją stroną.",
  },
  {
    title: "Zdjęcia z sesji u fotografa",
    text: "Mogę polecić fotografa z mojej sieci kontaktów (cena po stronie fotografa). Bez sesji dobiorę i obrobię zdjęcia, które masz.",
  },
  {
    title: "Płatne licencje i wtyczki",
    text: "Gdyby projekt wymagał płatnego narzędzia (np. system rezerwacji), powiem o tym z góry w wycenie — z kwotą.",
  },
  {
    title: "Reklamy",
    text: "Google Ads i reklamy w mediach społecznościowych rozliczasz bezpośrednio z platformami. Mogę je skonfigurować osobno.",
  },
];

export const extraPriceItems: { label: string; price: string; note?: string }[] = [
  { label: "Dodatkowa podstrona (strona firmowa, landing)", price: "200 zł", note: "ponad zakres pakietu" },
  { label: "Teksty na stronie (napiszę je za Ciebie)", price: "od 100 zł / podstrona", note: "min. 300 zł" },
  { label: "Dobór i obróbka zdjęć", price: "250 zł" },
  { label: "Logo i podstawowa identyfikacja", price: "od 600 zł" },
  { label: "Sesja zdjęciowa u fotografa-partnera", price: "wycena po stronie fotografa" },
  { label: "Ekspres (szybszy termin)", price: "+30%", note: "do ceny jednorazowej" },
];

function localizeService(s: QuoteService): QuoteService {
  const t = quoteServicesTextEn[s.slug];
  const sc = s.scope;
  const scope: Scope =
    sc.kind === "slider"
      ? { ...sc, question: t.scope.question, hint: t.scope.hint, unit: t.scope.unit ?? sc.unit }
      : sc.kind === "steps"
        ? { ...sc, question: t.scope.question, hint: t.scope.hint, steps: sc.steps.map((st, i) => ({ ...st, label: t.scope.steps?.[i] ?? st.label })) }
        : { ...sc, question: t.scope.question, hint: t.scope.hint, options: t.scope.options ?? sc.options };
  return { ...s, label: t.label, scope };
}

const quoteServicesEn = Object.fromEntries(
  quoteServiceOrder.map((slug) => [slug, localizeService(quoteServices[slug])]),
) as Record<QuoteServiceSlug, QuoteService>;

const addonsEn: Addon[] = addons.map((a) => ({ ...a, ...addonsTextEn[a.id] }));

function packEn(p: Pack): Pack {
  const s = getServiceFor(p.slug, "en")!;
  return { ...p, name: s.name, forWho: s.forWho, timeline: s.timeline, ...packsTextEn[p.slug] };
}

const pricingPl = {
  quoteServices,
  addons,
  quoteSteps: quoteSteps as readonly string[],
  packages,
  bigger,
  otherPacks,
  comparisonCols: comparisonCols as readonly { slug: QuoteServiceSlug; name: string }[],
  comparisonRows,
  priceFactors,
  notIncluded,
  extraPriceItems,
};

const pricingEn: typeof pricingPl = {
  quoteServices: quoteServicesEn,
  addons: addonsEn,
  quoteSteps: quoteStepsEn,
  packages: packages.map(packEn),
  bigger: packEn(bigger),
  otherPacks: otherPacks.map(packEn),
  comparisonCols: comparisonCols.map((c) => ({ slug: c.slug, name: getServiceFor(c.slug, "en")!.name })),
  comparisonRows: comparisonRowsEn,
  priceFactors: priceFactorsEn,
  notIncluded: notIncludedEn,
  extraPriceItems: extraPriceItemsEn,
};

export const pricingFor = (locale: Locale) => (locale === "en" ? pricingEn : pricingPl);

export const addonsForLocale = (svc: QuoteServiceSlug, locale: Locale) =>
  pricingFor(locale).addons.filter((a) => a.for.includes(svc));
