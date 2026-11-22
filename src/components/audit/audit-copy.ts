import type { Locale } from "@/i18n/config";
import {
  ariaFallbackEn,
  auditCopyEn,
  buildVerdictEn,
  categoryHintEn,
  categoryLabelEn,
  fmtSecondsEn,
  genericWhyEn,
  metricTextEn,
  ratingLabelEn,
} from "./audit-copy-en";

export type CategoryId = "performance" | "seo" | "accessibility" | "best-practices";
import { RATING_LABEL, type Rating } from "./rating";

export { rateScore, type Rating } from "./rating";

export const categoryLabel: Record<CategoryId, string> = {
  performance: "Wydajność",
  seo: "SEO",
  accessibility: "Dostępność",
  "best-practices": "Dobre praktyki",
};

export const categoryHint: Record<CategoryId, string> = {
  performance: "jak szybko strona działa na telefonie",
  seo: "czy Google rozumie, o czym jest Twoja strona",
  accessibility: "czy każdy klient zdoła z niej skorzystać",
  "best-practices": "bezpieczeństwo i porządek techniczny",
};

export const ratingLabel = RATING_LABEL.pl;

export type MetricId = "fcp" | "lcp" | "tbt" | "cls" | "si";

type MetricDef = {
  audit: string;
  name: string;
  code: string;
  good: number;
  poor: number;
  bench: string;
  sentence: (formatted: string) => string;
};

export const fmtSeconds = (ms: number) =>
  `${(ms / 1000).toLocaleString("pl-PL", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} s`;
export const fmtMs = (ms: number) => `${Math.round(ms).toLocaleString("pl-PL")} ms`;
export const fmtCls = (v: number) => v.toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const metricDefs: Record<MetricId, MetricDef & { format: (v: number) => string }> = {
  fcp: {
    audit: "first-contentful-paint",
    name: "Pierwszy widok",
    code: "FCP",
    good: 1800,
    poor: 3000,
    bench: "dobrze: do 1,8 s",
    format: fmtSeconds,
    sentence: (v) => `Pierwsza treść pojawia się po ${v}. Do tego czasu klient widzi biały ekran.`,
  },
  lcp: {
    audit: "largest-contentful-paint",
    name: "Główna treść",
    code: "LCP",
    good: 2500,
    poor: 4000,
    bench: "dobrze: do 2,5 s",
    format: fmtSeconds,
    sentence: (v) => `Klient widzi główną treść — nagłówek lub zdjęcie — po ${v}.`,
  },
  tbt: {
    audit: "total-blocking-time",
    name: "Reakcja na dotyk",
    code: "TBT",
    good: 200,
    poor: 600,
    bench: "dobrze: do 200 ms",
    format: fmtMs,
    sentence: (v) => `Przez ${v} podczas ładowania strona jest zajęta i nie reaguje na kliknięcia.`,
  },
  cls: {
    audit: "cumulative-layout-shift",
    name: "Stabilność układu",
    code: "CLS",
    good: 0.1,
    poor: 0.25,
    bench: "dobrze: do 0,1",
    format: fmtCls,
    sentence: (v) =>
      v === "0,00"
        ? "Układ stoi w miejscu — nic nie ucieka klientowi spod palca."
        : `Elementy przesuwają się podczas ładowania (wynik ${v}). Łatwo kliknąć nie to, co trzeba.`,
  },
  si: {
    audit: "speed-index",
    name: "Tempo ładowania",
    code: "Speed Index",
    good: 3400,
    poor: 5800,
    bench: "dobrze: do 3,4 s",
    format: fmtSeconds,
    sentence: (v) => `Strona wypełnia się treścią w ${v}.`,
  },
};

export const metricOrder: MetricId[] = ["lcp", "fcp", "tbt", "cls", "si"];

export function rateMetric(id: MetricId, value: number): Rating {
  const d = metricDefs[id];
  if (value <= d.good) return "good";
  if (value <= d.poor) return "needs-work";
  return "poor";
}

type Explain = { title: string; why: string };

const e = (title: string, why: string): Explain => ({ title, why });

const renderBlocking = e(
  "Skrypty i style blokują wyświetlenie strony",
  "Przeglądarka musi je pobrać, zanim pokaże cokolwiek. Klient patrzy na pusty ekran.",
);
const heavyImages = e(
  "Zdjęcia są za ciężkie",
  "Za duże lub źle skompresowane obrazy to najczęstszy powód wolnych stron. Klient płaci za nie transferem i czasem.",
);
const serverSlow = e(
  "Serwer odpowiada zbyt wolno",
  "Zanim zacznie się ładować treść, mija za dużo czasu. Zwykle winny jest słaby hosting albo rozbudowany system.",
);
const layoutShift = e(
  "Elementy skaczą podczas ładowania",
  "Klient chce kliknąć przycisk, a ten ucieka mu spod palca — to irytuje i kończy się wyjściem ze strony.",
);
const thirdParty = e(
  "Zewnętrzne skrypty spowalniają stronę",
  "Czaty, piksele reklamowe i widgety to cudzy kod, który ładuje się razem z Twoją stroną i ją spowalnia.",
);
const unusedJs = e(
  "Telefon pobiera kod, którego strona nie używa",
  "Zbędny JavaScript wydłuża ładowanie i zjada transfer klienta.",
);
const caching = e(
  "Przeglądarka nie zapamiętuje plików strony",
  "Przy każdej wizycie pobiera te same pliki od nowa, więc stały klient też czeka za każdym razem.",
);
const domSize = e(
  "Strona ma zbyt skomplikowaną budowę",
  "Tysiące elementów na jednej stronie to dla telefonu ciężka praca. Efekt: wolne przewijanie i ładowanie.",
);
const legacyJs = e(
  "Strona wysyła kod dla bardzo starych przeglądarek",
  "Nowoczesne telefony dostają zbędny, ciężki kod, który nic im nie daje.",
);
const dupJs = e(
  "Ten sam kod jest wczytywany kilka razy",
  "Duplikaty niepotrzebnie powiększają stronę i wydłużają ładowanie.",
);
const lcpLate = e(
  "Główne zdjęcie ładuje się za późno",
  "Najważniejszy element strony czeka w kolejce za mniej ważnymi rzeczami.",
);
const fontSwap = e(
  "Tekst pojawia się dopiero po wczytaniu czcionki",
  "Przez chwilę klient widzi puste miejsca zamiast napisów.",
);
const chains = e(
  "Pliki ładują się jeden po drugim",
  "Zamiast pobierać się równolegle, czekają na siebie w kolejce. To wydłuża każde wejście na stronę.",
);
const jank = e(
  "Strona zawiesza się po kliknięciu",
  "Telefon jest zajęty obliczeniami i przez chwilę nie reaguje na dotyk.",
);
const viewport = e(
  "Strona nie jest dostosowana do ekranu telefonu",
  "Klient na telefonie dostaje zmniejszoną wersję dla komputera i musi ją powiększać palcami.",
);
const tapTargets = e(
  "Przyciski i linki są za małe na telefonie",
  "Trudno w nie trafić kciukiem, a to pierwsza rzecz, którą klient robi na telefonie.",
);
const altText = e(
  "Zdjęcia bez opisów",
  "Google i osoby niewidome nie wiedzą, co jest na zdjęciu — tracisz widoczność w wyszukiwarce grafiki.",
);

export const auditCopy: Record<string, Explain> = {
  "render-blocking-resources": renderBlocking,
  "render-blocking-insight": renderBlocking,
  "render-blocking-insights": renderBlocking,
  "unused-javascript": unusedJs,
  "unused-css-rules": e(
    "Strona wysyła style, których nie używa",
    "Nieużywane reguły CSS wydłużają ładowanie, a nie dają klientowi nic w zamian.",
  ),
  "uses-optimized-images": heavyImages,
  "image-delivery-insight": heavyImages,
  "modern-image-formats": e(
    "Zdjęcia w przestarzałym formacie",
    "Nowoczesne formaty (WebP, AVIF) dają tę samą jakość przy mniejszym pliku — strona ładuje się szybciej.",
  ),
  "uses-responsive-images": e(
    "Telefon dostaje zdjęcia w rozmiarze dla komputera",
    "Mały ekran pobiera ogromne pliki, które i tak wyświetli w miniaturze.",
  ),
  "offscreen-images": e(
    "Zdjęcia spod ekranu ładują się od razu",
    "Powinny wczytywać się dopiero wtedy, gdy klient do nich przewinie. Teraz spowalniają to, co widać na starcie.",
  ),
  "uses-text-compression": e(
    "Strona jest wysyłana bez kompresji",
    "Włączenie kompresji to kwestia ustawienia serwera i zmniejsza transfer nawet kilkukrotnie.",
  ),
  "uses-long-cache-ttl": caching,
  "cache-insight": caching,
  "total-byte-weight": e(
    "Strona jest bardzo ciężka",
    "Im więcej megabajtów, tym dłużej czeka klient — zwłaszcza na słabszym zasięgu.",
  ),
  "dom-size": domSize,
  "dom-size-insight": domSize,
  "server-response-time": serverSlow,
  "document-latency-insight": serverSlow,
  redirects: e(
    "Zbędne przekierowania",
    "Zanim klient trafi na właściwą stronę, przeglądarka jest odsyłana z adresu na adres. Każde odbicie to utracone ułamki sekund.",
  ),
  "unminified-javascript": e(
    "Kod skryptów nie jest odchudzony",
    "Usunięcie zbędnych znaków z kodu zmniejsza pliki bez zmiany wyglądu.",
  ),
  "unminified-css": e(
    "Kod stylów nie jest odchudzony",
    "Usunięcie zbędnych znaków z kodu zmniejsza pliki bez zmiany wyglądu.",
  ),
  "legacy-javascript": legacyJs,
  "legacy-javascript-insight": legacyJs,
  "duplicated-javascript": dupJs,
  "duplicated-javascript-insight": dupJs,
  "third-party-summary": thirdParty,
  "third-parties-insight": thirdParty,
  "bootup-time": e(
    "Telefon długo przetwarza skrypty",
    "Słabszy telefon potrzebuje sekund, żeby „przetrawić” kod strony — zanim ona zacznie reagować.",
  ),
  "mainthread-work-breakdown": e(
    "Telefon jest zajęty obliczeniami",
    "Strona zadaje procesorowi za dużo pracy, więc wolno się ładuje i wolno reaguje.",
  ),
  "lcp-lazy-loaded": lcpLate,
  "prioritize-lcp-image": lcpLate,
  "lcp-discovery-insight": lcpLate,
  "lcp-phases-insight": e(
    "Główna treść pojawia się za późno",
    "Najważniejszy element strony długo czeka, zanim klient go zobaczy.",
  ),
  "layout-shifts": layoutShift,
  "layout-shift-elements": layoutShift,
  "cls-culprits-insight": layoutShift,
  "unsized-images": layoutShift,
  "font-display": fontSwap,
  "font-display-insight": fontSwap,
  "uses-rel-preconnect": chains,
  "critical-request-chains": chains,
  "network-dependency-tree-insight": chains,
  "long-tasks": jank,
  "forced-reflow-insight": jank,
  "interaction-to-next-paint-insight": jank,
  "non-composited-animations": e(
    "Animacje szarpią na telefonie",
    "Źle zrobione animacje obciążają procesor i powodują zacinanie.",
  ),
  "efficient-animated-content": e(
    "Animowane GIF-y są za ciężkie",
    "Jeden GIF potrafi ważyć więcej niż reszta strony. Krótkie wideo robi to samo za ułamek transferu.",
  ),
  "uses-http2": e(
    "Serwer używa przestarzałego protokołu",
    "Nowsze HTTP/2 i HTTP/3 pobierają wiele plików naraz — starsze robi to wolniej.",
  ),
  "modern-http-insight": e(
    "Serwer używa przestarzałego protokołu",
    "Nowsze HTTP/2 i HTTP/3 pobierają wiele plików naraz — starsze robi to wolniej.",
  ),
  viewport,
  "viewport-insight": viewport,
  "meta-viewport": e(
    "Strona blokuje powiększanie na telefonie",
    "Klienci słabiej widzący nie mogą powiększyć tekstu — a Google traktuje to jako błąd.",
  ),
  "no-document-write": e(
    "Przestarzały sposób ładowania skryptów",
    "Taki kod potrafi zatrzymać wyświetlanie całej strony na wolniejszym łączu.",
  ),

  "document-title": e(
    "Brak tytułu strony",
    "Tytuł to nagłówek widoczny w wynikach Google. Bez niego trudno o kliknięcie.",
  ),
  "meta-description": e(
    "Brak opisu strony w wynikach Google",
    "Opis to dwa zdania pod tytułem w wyszukiwarce. Bez niego Google dobiera losowy fragment, a klient rzadziej klika.",
  ),
  "http-status-code": e(
    "Strona zwraca błąd",
    "Google nie umieści w wynikach strony, która odpowiada kodem błędu.",
  ),
  "link-text": e(
    "Linki typu „kliknij tutaj”",
    "Google czyta tekst linków, żeby zrozumieć, dokąd prowadzą. „Tutaj” nic mu nie mówi.",
  ),
  "crawlable-anchors": e(
    "Google może nie przejść po niektórych linkach",
    "Część podstron może być dla wyszukiwarki niewidoczna.",
  ),
  "is-crawlable": e(
    "Strona jest zablokowana przed Google",
    "Jeśli to nie jest zamierzone — dla Google Twojej strony po prostu nie ma.",
  ),
  "robots-txt": e(
    "Plik robots.txt jest błędny",
    "To instrukcja dla wyszukiwarek. Błędy w niej mogą zablokować indeksowanie.",
  ),
  "image-alt": altText,
  canonical: e(
    "Google może wskazywać niewłaściwy adres strony",
    "Bez poprawnego adresu kanonicznego wyszukiwarka może rozdzielać siłę strony między kilka wersji.",
  ),
  hreflang: e(
    "Błędne oznaczenia wersji językowych",
    "Wyszukiwarka może pokazywać stronę w złym kraju lub języku.",
  ),
  "font-size": e(
    "Za mały tekst na telefonie",
    "Klient musi powiększać ekran, żeby cokolwiek przeczytać — a Google to widzi.",
  ),
  "tap-targets": tapTargets,
  "target-size": tapTargets,

  "color-contrast": e(
    "Za słaby kontrast tekstu",
    "Jasnoszary tekst na białym tle słabo widać na słońcu i dla starszych osób. Klient nie przeczyta oferty.",
  ),
  "button-name": e(
    "Przyciski bez nazwy",
    "Czytnik ekranu nie wie, do czego służy przycisk. Dla części klientów strona jest bezużyteczna.",
  ),
  "link-name": e("Linki bez nazwy", "Czytnik ekranu i Google nie wiedzą, dokąd taki link prowadzi."),
  label: e(
    "Pola formularza bez podpisów",
    "Klient nie wie, co wpisać, a czytnik ekranu nie odczyta pola. Formularz kontaktowy traci zapytania.",
  ),
  "html-has-lang": e(
    "Nie podano języka strony",
    "Przeglądarki i czytniki ekranu mogą źle wymawiać polski tekst lub oferować zbędne tłumaczenie.",
  ),
  "html-lang-valid": e("Błędnie podany język strony", "Przeglądarki i czytniki ekranu mogą źle odczytać polski tekst."),
  "heading-order": e(
    "Nagłówki w złej kolejności",
    "Nagłówki to spis treści strony — dla Google i czytników. Przeskakiwanie poziomów miesza ich sens.",
  ),
  bypass: e("Brak „przejdź do treści”", "Użytkownicy klawiatury muszą przeklikać całe menu przy każdej podstronie."),
  "frame-title": e("Ramki bez tytułu", "Osoby korzystające z czytników nie wiedzą, co zawiera osadzony element."),
  tabindex: e("Zaburzona kolejność klawiatury", "Przechodzenie po stronie klawiszem Tab odbywa się w nielogicznej kolejności."),
  "duplicate-id-aria": e("Powtórzone identyfikatory elementów", "To drobny błąd kodu, który myli technologie wspomagające."),
  list: e("Błędnie zbudowane listy", "Czytniki ekranu źle odczytują takie wyliczenia."),
  listitem: e("Błędnie zbudowane listy", "Czytniki ekranu źle odczytują takie wyliczenia."),

  "is-on-https": e(
    "Strona nie działa przez bezpieczne połączenie (HTTPS)",
    "Przeglądarki oznaczają ją jako „niezabezpieczona”, a to odstrasza klientów i obniża pozycję w Google.",
  ),
  "errors-in-console": e(
    "Strona zgłasza błędy techniczne",
    "Coś na stronie nie działa tak, jak miało — często chodzi o brakujące pliki albo skrypty.",
  ),
  "no-vulnerable-libraries": e(
    "Stare biblioteki z lukami bezpieczeństwa",
    "Strona korzysta z nieaktualnych komponentów o znanych błędach. To furtka dla włamania.",
  ),
  "js-libraries": e(
    "Stare biblioteki z lukami bezpieczeństwa",
    "Strona korzysta z nieaktualnych komponentów o znanych błędach. To furtka dla włamania.",
  ),
  "image-aspect-ratio": e("Zdjęcia są rozciągnięte", "Proporcje obrazów są zniekształcone — strona wygląda nieprofesjonalnie."),
  "image-size-responsive": e(
    "Zdjęcia są w zbyt małej rozdzielczości",
    "Na nowoczesnych ekranach wyglądają rozmyte.",
  ),
  deprecations: e("Przestarzały kod", "Strona używa rozwiązań, które przeglądarki wkrótce przestaną obsługiwać."),
  charset: e("Brak kodowania znaków", "Polskie znaki mogą wyświetlać się jako krzaczki."),
  doctype: e("Brak deklaracji typu dokumentu", "Przeglądarka może wyświetlać stronę w trybie zgodności ze starymi wersjami."),
  "geolocation-on-start": e(
    "Strona od razu pyta o lokalizację",
    "Wyskakujące pytanie na starcie odstrasza klientów, zanim cokolwiek zobaczą.",
  ),
  "notification-on-start": e(
    "Strona od razu pyta o powiadomienia",
    "Wyskakujące pytanie na starcie odstrasza klientów, zanim cokolwiek zobaczą.",
  ),
  "inspector-issues": e("Przeglądarka zgłasza problemy ze stroną", "Chrome wykrył błędy, które mogą wpływać na działanie lub bezpieczeństwo."),
  "csp-xss": e(
    "Brak zabezpieczeń przed wstrzyknięciem obcego kodu",
    "Dodatkowe nagłówki bezpieczeństwa utrudniają ataki na Twoją stronę i jej odwiedzających.",
  ),
};

export function firstSentence(description: string | undefined): string {
  if (!description) return "";
  const clean = description
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/`/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const cut = clean.search(/[.!?](\s|$)/);
  const s = cut > 0 ? clean.slice(0, cut + 1) : clean;
  return s.length > 220 ? `${s.slice(0, 217)}…` : s;
}

export function explainAudit(id: string, apiTitle: string, apiDescription?: string): Explain {
  const known = auditCopy[id];
  if (known) return known;
  if (id.startsWith("aria-")) {
    return e("Błędy w oznaczeniach dostępności", "Strona jest gorzej czytelna dla osób korzystających z czytników ekranu.");
  }
  return {
    title: apiTitle,
    why: firstSentence(apiDescription) || "Poprawka tego punktu poprawia wynik strony w teście Google.",
  };
}

export type Verdict = {
  tone: "good" | "mid" | "bad";
  pre: string;
  accent: string;
  post: string;
  lead: string;
  ctaLabel: string;
  usluga: "redesign-strony" | "pozycjonowanie-seo";
};

export function buildVerdict(scores: Record<CategoryId, number | null>, lcpMs: number | null): Verdict {
  const perf = scores.performance;
  const seo = scores.seo;
  const lcp = lcpMs !== null ? fmtSeconds(lcpMs) : null;

  if (perf !== null && perf >= 90) {
    const seoOk = seo === null || seo >= 90;
    return {
      tone: "good",
      pre: "Twoja strona jest w ",
      accent: "dobrej",
      post: " formie.",
      lead: seoOk
        ? "Pod względem technicznym nie ma tu czego ratować. Zostaje widoczność: szybka strona nie wystarczy, żeby klient trafił na Ciebie zamiast na konkurencję. Tu zaczyna się pozycjonowanie."
        : "Strona jest szybka, ale Google nie czyta jej tak dobrze, jak mógłby. To najtańsza droga do większej liczby klientów — poprawki SEO.",
      ctaLabel: "Chcę więcej klientów z Google — wyślij mi propozycję",
      usluga: "pozycjonowanie-seo",
    };
  }
  if (perf !== null && perf >= 50) {
    return {
      tone: "mid",
      pre: "Da się ",
      accent: "szybciej",
      post: " — i warto.",
      lead: `${lcp ? `Główna treść pojawia się po ${lcp}. ` : ""}Strona działa, ale nie wykorzystuje swojego potencjału: część klientów na telefonie wyjdzie, zanim zobaczy ofertę. Lista poniżej pokazuje, co poprawić w pierwszej kolejności.`,
      ctaLabel: "Chcę, żeby moja strona była szybka — wyślij mi propozycję",
      usluga: "redesign-strony",
    };
  }
  return {
    tone: "bad",
    pre: "Ta strona ",
    accent: "kosztuje",
    post: " Cię klientów.",
    lead: `${lcp ? `Na telefonie główna treść pojawia się po ${lcp}. ` : ""}Wolna strona to mniej telefonów i zapytań — klient z Google wraca do wyników i klika w konkurenta. To da się naprawić, a często najlepszym rozwiązaniem jest nowa, lekka strona.`,
    ctaLabel: "Chcę, żeby moja strona była szybka — wyślij mi propozycję",
    usluga: "redesign-strony",
  };
}

export type AuditText = {
  numberLocale: string;
  categoryLabel: Record<CategoryId, string>;
  categoryHint: Record<CategoryId, string>;
  ratingLabel: Record<Rating, string>;
  fmtSeconds: (ms: number) => string;
  metric: (id: MetricId) => { name: string; bench: string; format: (v: number) => string; sentence: (v: number) => string };
  explainAudit: (id: string, apiTitle: string, apiDescription?: string) => Explain;
  buildVerdict: typeof buildVerdict;
};

const textPl: AuditText = {
  numberLocale: "pl-PL",
  categoryLabel,
  categoryHint,
  ratingLabel,
  fmtSeconds,
  metric: (id) => {
    const d = metricDefs[id];
    return { name: d.name, bench: d.bench, format: d.format, sentence: (v) => d.sentence(d.format(v)) };
  },
  explainAudit,
  buildVerdict,
};

const textEn: AuditText = {
  numberLocale: "en-US",
  categoryLabel: categoryLabelEn,
  categoryHint: categoryHintEn,
  ratingLabel: ratingLabelEn,
  fmtSeconds: fmtSecondsEn,
  metric: (id) => {
    const d = metricTextEn[id];
    return { name: d.name, bench: d.bench, format: d.format, sentence: (v) => d.sentence(d.format(v), v) };
  },
  explainAudit: (id, apiTitle, apiDescription) => {
    const known = auditCopyEn[id];
    if (known) return known;
    if (id.startsWith("aria-")) return ariaFallbackEn;
    return { title: apiTitle, why: firstSentence(apiDescription) || genericWhyEn };
  },
  buildVerdict: buildVerdictEn,
};

export const auditTextFor = (locale: Locale): AuditText => (locale === "en" ? textEn : textPl);
