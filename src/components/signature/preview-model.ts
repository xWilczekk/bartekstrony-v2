import type { IndustrySlug } from "@/content/projects";

export const VIBES = [
  { slug: "klasyczny", label: "Klasyczny", hint: "jasno i czytelnie" },
  { slug: "odwazny", label: "Odważny", hint: "mocno i wyraziście" },
  { slug: "premium", label: "Premium", hint: "elegancko, z klasą" },
] as const;

export type VibeSlug = (typeof VIBES)[number]["slug"];

export const VIBE_TEXT_EN: Record<VibeSlug, { label: string; hint: string }> = {
  klasyczny: { label: "Classic", hint: "light and easy to read" },
  odwazny: { label: "Bold", hint: "strong and striking" },
  premium: { label: "Premium", hint: "elegant, with class" },
};
export type Device = "desktop" | "mobile";

export type IndustryMeta = {
  slug: IndustrySlug;
  chip: string;
  sample: string;
};

export const INDUSTRY_META: IndustryMeta[] = [
  { slug: "restauracje", chip: "Restauracja", sample: "Pizzeria Roma" },
  { slug: "budowlanka", chip: "Budowlanka", sample: "Remonty Nowak" },
  { slug: "uslugi", chip: "Usługi", sample: "Studio Fryzur Ania" },
  { slug: "gabinety", chip: "Gabinet", sample: "Gabinet Uśmiech" },
  { slug: "motoryzacja", chip: "Motoryzacja", sample: "AutoPunkt" },
  { slug: "transport", chip: "Taxi i transport", sample: "Taxi Komfort" },
  { slug: "hotele", chip: "Hotel i sala", sample: "Hotel Leśny Dwór" },
  { slug: "e-commerce", chip: "Sklep online", sample: "Leśna Świeca" },
  { slug: "energetyka", chip: "Fotowoltaika", sample: "Słoneczny Dach" },
];

export const INDUSTRY_CHIP_EN: Record<IndustrySlug, string> = {
  restauracje: "Restaurant",
  budowlanka: "Construction",
  uslugi: "Services",
  gabinety: "Clinic",
  motoryzacja: "Automotive",
  transport: "Taxi & transport",
  hotele: "Hotel & venue",
  "e-commerce": "Online store",
  energetyka: "Solar",
};

export const DEFAULT_INDUSTRY: IndustrySlug = "budowlanka";
export const DEFAULT_VIBE: VibeSlug = "klasyczny";
export const NAME_MAX = 60;
export const CITY_MAX = 40;

export const metaFor = (slug: IndustrySlug) =>
  INDUSTRY_META.find((m) => m.slug === slug) ?? INDUSTRY_META[0];

const isIndustry = (v: unknown): v is IndustrySlug =>
  typeof v === "string" && INDUSTRY_META.some((m) => m.slug === v);
const isVibe = (v: unknown): v is VibeSlug => typeof v === "string" && VIBES.some((m) => m.slug === v);

const PL: Record<string, string> = { ą: "a", ć: "c", ę: "e", ł: "l", ń: "n", ó: "o", ś: "s", ź: "z", ż: "z" };

export function normalize(input: string) {
  return input
    .toLowerCase()
    .replace(/[ąćęłńóśźż]/g, (c) => PL[c] ?? c)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function slugDomain(name: string) {
  const s = normalize(name)
    .replace(/&/g, "i")
    .replace(/[^a-z0-9-]+/g, "")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  return `${s || "twojafirma"}.pl`;
}

export const cleanText = (v: string, max: number) => v.replace(/\s+/g, " ").trimStart().slice(0, max);

const INDUSTRY_RULES: [RegExp, IndustrySlug][] = [
  [/palarni/, "e-commerce"],
  [/lawet|holow|pomoc drog|taxi|taksow|przeprowadz|przewoz|transport|spedyc|logisty|kurier|\bbus\b/, "transport"],
  [/fotowolt|\bpv\b|solar|\boze\b|pomp[ay] ciepl|energi|energet|slonecz|magazyn energ|elektrown/, "energetyka"],
  [/hotel|motel|pensjonat|agrotur|nocleg|apartament|wesel|bankiet|\bdwor|zajazd|willa|villa|hostel|kwater|siedlisk/, "hotele"],
  [/gabinet|stomat|\bdent|dental|ortodon|weteryn|lecznica|fizjo|rehab|osteo|masaz|kosmetycz|kosmetolog|beauty|urody|\buroda|\bspa\b|brwi|rzes|paznok|nails|klinik|lekar|przychod|medyc|psycholog|dietet|podolog|optyk/, "gabinety"],
  [/auto|moto|komis|samochod|wypozycz|warsztat|mechani|opon|wulkaniz|lakier|blachar|myjni|detailing|\bcars?\b/, "motoryzacja"],
  [/remont|budow|\bbud|dach|dekar|bruk|kostk|wykoncz|glazur|malar|tynk|elewac|ociepl|stolar|murar|okna|ogrod|taras/, "budowlanka"],
  [/pizz|kebab|doner|sushi|ramen|burger|bistro|restaur|kuchni|pierog|\bbar\b|gospod|karczm|kawiar|cafe|caffe|coffee|\bkawa\b|cukier|piekar|lodziar|food|grill|\bpub\b|jadlodaj|catering|obiad|smak|trattori|tawern/, "restauracje"],
  [/sklep|shop|store|butik|boutique|swiec|hurtowni|\bonline\b|odziez|\bmoda\b|ubran|kosmetyki|zabawk/, "e-commerce"],
  [/fryz|barber|salon|ksieg|rachunk|biuro|podatk|kadr|hydraul|elektryk|zlota racz|sprzat|czyszcz|pralni|fotograf|kancelari|adwokat|radca|prawn|krawc|krawiec|szewc|slusar|kwiac|florys|serwis|naprawa|montaz|ubezpiecz|nieruchom|tlumacz|korepet/, "uslugi"],
];

export function detectIndustry(name: string): IndustrySlug | null {
  const n = normalize(name);
  if (n.trim().length < 3) return null;
  for (const [re, slug] of INDUSTRY_RULES) if (re.test(n)) return slug;
  return null;
}

const VARIANT_RULES: Partial<Record<IndustrySlug, [RegExp, string][]>> = {
  restauracje: [
    [/pizz/, "pizza"],
    [/kebab|doner|gyros|shawarma|falafel|grill/, "kebab"],
    [/sushi|ramen|japo|azja|asia|\bwok\b|tajsk|thai|wietnam|chinsk/, "sushi"],
    [/burger/, "burger"],
    [/kawiar|cafe|caffe|coffee|\bkawa\b|cukier|piekar|lodziar|deser|nalesnik|ciast/, "kawiarnia"],
  ],
  budowlanka: [
    [/dach|dekar|blach|rynn|pokryc/, "dach"],
    [/bruk|kostk|ogrod|taras|zielen/, "bruk"],
  ],
  motoryzacja: [
    [/wypozycz|wynajem|najem|\brent/, "wypozyczalnia"],
    [/warsztat|serwis|mechani|opon|wulkan|diagnost|naprawa|lakier|blachar/, "warsztat"],
  ],
  gabinety: [
    [/weteryn|lecznica|zwierz|\bvet|pupil|psiak/, "weterynarz"],
    [/fizjo|rehab|osteo|masaz/, "fizjo"],
    [/kosmet|beauty|urod|\bspa\b|brwi|rzes|paznok|nails|makijaz|lash/, "beauty"],
    [/lekar|przychod|medyc|klinik|internist|pediatr|doktor|\bdr\b/, "lekarz"],
  ],
  hotele: [
    [/wesel|bankiet|event|przyjec|\bsala\b/, "wesele"],
    [/pensjonat|agro|domk|apartament|kwater|nocleg|willa|villa|siedlisk|chata/, "pensjonat"],
  ],
  transport: [
    [/lawet|holow|pomoc drog|assist/, "laweta"],
    [/przeprowadz|\bbus\b|transport|przewoz|kurier|spedyc|logist/, "przewoz"],
  ],
  "e-commerce": [
    [/kaw|coffee|palarni|herbat|\btea\b/, "kawa"],
    [/odziez|\bmoda\b|butik|boutique|ubran|koszul|bluz|fashion|wear/, "moda"],
    [/kosmet|mydl|natural|skin|krem|olejk|beauty/, "kosmetyki"],
  ],
  energetyka: [[/pomp|ciepl|klimat|hvac|ogrzew/, "pompa"]],
  uslugi: [
    [/barber|brzytw|golib/, "barber"],
    [/ksieg|rachunk|podatk|kadr|biuro/, "ksiegowa"],
    [/hydraul|elektry|zlota racz|instal|montaz|naprawa|serwis|majster|fachow/, "fachowiec"],
    [/sprzat|czyszcz|clean|pranie|myci|porzadk/, "sprzatanie"],
  ],
};

export function resolveVariant(industry: IndustrySlug, name: string): string | null {
  const n = normalize(name);
  for (const [re, id] of VARIANT_RULES[industry] ?? []) if (re.test(n)) return id;
  return null;
}

export type PreviewState = {
  name: string;
  industry: IndustrySlug;
  city: string;
  vibe: VibeSlug;
};

export const DEFAULT_STATE: PreviewState = { name: "", industry: DEFAULT_INDUSTRY, city: "", vibe: DEFAULT_VIBE };

export const displayName = (s: Pick<PreviewState, "name" | "industry">) =>
  s.name.trim() || metaFor(s.industry).sample;

type ParamSource = URLSearchParams | Record<string, string | string[] | undefined>;

function read(src: ParamSource, key: string) {
  const v = src instanceof URLSearchParams ? src.get(key) : src[key];
  return (Array.isArray(v) ? v[0] : v) ?? "";
}

export function parsePreviewParams(src: ParamSource): PreviewState {
  const b = read(src, "b");
  const s = read(src, "s");
  return {
    name: cleanText(read(src, "n"), NAME_MAX).trim(),
    industry: isIndustry(b) ? b : DEFAULT_INDUSTRY,
    city: cleanText(read(src, "m"), CITY_MAX).trim(),
    vibe: isVibe(s) ? s : DEFAULT_VIBE,
  };
}

export function previewQuery(s: PreviewState) {
  const q = new URLSearchParams();
  q.set("n", displayName(s));
  q.set("b", s.industry);
  if (s.city.trim()) q.set("m", s.city.trim());
  q.set("s", s.vibe);
  return q.toString();
}

export const previewPath = (s: PreviewState) => `/twoja-strona?${previewQuery(s)}`;
