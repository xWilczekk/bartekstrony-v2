import type { IndustrySlug } from "./projects";
import type { VibeSlug } from "@/components/signature/preview-model";

export type Ctx = {
  name: string;
  city: string;
  inCity: string;
  domain: string;
};

export type Txt = string | ((c: Ctx) => string);

export type Palette = {
  bg: string;
  surface: string;
  ink: string;
  muted: string;
  accent: string;
  onAccent: string;
  accentInk: string;
  line: string;
  deep: string;
  onDeep: string;
  foot: string;
  onFoot: string;
  mark?: boolean;
};

export type ArtKey =
  | "plate" | "pizza" | "grill" | "sushi" | "burger" | "cup"
  | "build" | "roof" | "paving"
  | "car" | "garage"
  | "care" | "paw"
  | "stay"
  | "route" | "tow" | "van"
  | "shop" | "coffee" | "fashion" | "cosmetics"
  | "sun" | "heatpump"
  | "scissors" | "ledger" | "wrench" | "sparkle";

export type PatternKey = "tiles" | "kitchen" | "planks" | "bricks" | "roof" | "paving" | "panels" | "garden" | "fence";
export type CarBody = "hatch" | "kombi" | "suv" | "van";
export type ProductShape =
  | "jar" | "jar-tall" | "bottle" | "dropper" | "box" | "tube" | "bag"
  | "tee" | "hoodie" | "sweater" | "pants" | "cap" | "tote" | "grinder";

export type Thumb =
  | { kind: "pattern"; pattern: PatternKey }
  | { kind: "car"; body: CarBody; tone: number }
  | { kind: "room"; variant: number }
  | { kind: "hall"; variant: number }
  | { kind: "product"; shape: ProductShape; tone: number };

export type Item = {
  name: Txt;
  note?: Txt;
  price?: Txt;
  old?: string;
  badge?: string;
  meta?: Txt[];
  thumb?: Thumb;
};

export type Group = { name: string; items: Item[] };

type Head = {
  id: string;
  nav?: string;
  eyebrow: string;
  title: Txt;
  lead?: Txt;
};

export type Section =
  | (Head & { kind: "menu"; groups: Group[]; note?: Txt })
  | (Head & { kind: "pricelist"; groups: Group[]; note?: Txt })
  | (Head & { kind: "cards"; items: Item[]; note?: Txt })
  | (Head & { kind: "gallery"; style: "projects" | "fleet" | "rooms" | "halls" | "products"; items: Item[]; chips?: string[]; note?: Txt })
  | (Head & { kind: "routes"; items: Item[]; note?: Txt })
  | (Head & { kind: "steps"; items: { name: string; note: string }[] })
  | (Head & { kind: "form"; style: "booking" | "quote" | "visit"; fields: [string, Txt][]; button: string; aside?: Txt[] })
  | (Head & { kind: "features"; items: { name: string; note?: string }[] })
  | (Head & { kind: "calc" })
  | (Head & { kind: "faq"; items: { q: string; a: string }[] })
  | (Head & { kind: "reviews"; items: string[] })
  | (Head & { kind: "hours"; rows: [string, string][]; aside?: Txt })
  | (Head & { kind: "contact" })
  | (Omit<Head, "eyebrow"> & { kind: "band"; eyebrow?: string; style: "phone" | "finance" | "newsletter" | "usp"; button?: Txt; items?: string[] });

export type Widget =
  | { kind: "facts"; items: [string, Txt][] }
  | { kind: "search"; fields: [string, string][]; button: string }
  | { kind: "booking"; fields: [string, Txt][]; button: string }
  | { kind: "slots"; label: string; slots: string[] }
  | { kind: "badges"; items: string[] }
  | { kind: "phone" }
  | { kind: "calc" };

export type Hero = {
  layout: "split" | "claim" | "center" | "shop";
  eyebrow: Txt;
  title?: Txt;
  lead: Txt;
  primary: string;
  secondary?: string;
  widget?: Widget;
  badge?: [string, string];
};

type DistOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;
export type SectionPatch = Partial<DistOmit<Section, "kind" | "id">>;

export type KitPatch = {
  category?: string;
  art?: ArtKey;
  navCta?: Txt;
  navIcon?: "phone" | "cart";
  announce?: Txt;
  hours?: string;
  hero?: Partial<Hero>;
  sections?: Record<string, SectionPatch | null>;
  add?: Section[];
  order?: string[];
  cta?: Partial<Kit["cta"]>;
};

export type Kit = {
  slug: IndustrySlug;
  category: string;
  art: ArtKey;
  navCta: Txt;
  navIcon?: "phone" | "cart";
  announce?: Txt;
  hours: string;
  hero: Hero;
  sections: Section[];
  cta: { title: Txt; lead: Txt; button: Txt };
  palettes: Record<VibeSlug, Palette>;
  variants: Record<string, KitPatch>;
};

export const SAMPLE_PHONE = "123 456 789";
const PHONE = SAMPLE_PHONE;

const dot = (c: Ctx) => (c.city ? ` · ${c.city}` : "");
const addr = (c: Ctx) => (c.city ? `ul. Przykładowa 12, ${c.city}` : "ul. Przykładowa 12");

export const sampleAddress = addr;

type PaletteSet = Record<VibeSlug, Palette>;

export const BRAND_PALETTE: Palette = { bg: "#fafaf7", surface: "#f0f1ea", ink: "#10201a", muted: "#56645c", accent: "#c6f36b", onAccent: "#10201a", accentInk: "#3f6212", line: "rgba(16,32,26,0.12)", deep: "#10201a", onDeep: "#fafaf7", foot: "#10201a", onFoot: "#a3b2a9", mark: true };

const PALETTES: Record<IndustrySlug, PaletteSet> = {
  restauracje: {
    klasyczny: { bg: "#f8f3ea", surface: "#efe4d2", ink: "#2b1d15", muted: "#78624f", accent: "#c23b22", onAccent: "#fff7ec", accentInk: "#b2361f", line: "rgba(43,29,21,0.14)", deep: "#2b1d15", onDeep: "#f8f3ea", foot: "#2b1d15", onFoot: "#e2d3bf" },
    odwazny: { bg: "#161110", surface: "#211a17", ink: "#f8efe4", muted: "#ad9c8c", accent: "#ff7a1a", onAccent: "#170f0b", accentInk: "#ff8a33", line: "rgba(248,239,228,0.12)", deep: "#ff7a1a", onDeep: "#170f0b", foot: "#0f0b0a", onFoot: "#c9b8a6" },
    premium: { bg: "#15100d", surface: "#1e1813", ink: "#f2e8d9", muted: "#a69783", accent: "#c9a46a", onAccent: "#15100d", accentInk: "#d4b07a", line: "rgba(242,232,217,0.13)", deep: "#0e0a08", onDeep: "#f2e8d9", foot: "#0e0a08", onFoot: "#a69783" },
  },
  budowlanka: {
    klasyczny: { bg: "#f2f1ed", surface: "#e5e3dc", ink: "#1b1d20", muted: "#686b70", accent: "#f2a20c", onAccent: "#1b1d20", accentInk: "#a35f00", line: "rgba(27,29,32,0.13)", deep: "#1b1d20", onDeep: "#f2f1ed", foot: "#1b1d20", onFoot: "#c8c6c0", mark: true },
    odwazny: { bg: "#121212", surface: "#1d1d1d", ink: "#f5f4f0", muted: "#9e9d97", accent: "#ff6b13", onAccent: "#121212", accentInk: "#ff7d2e", line: "rgba(245,244,240,0.12)", deep: "#ff6b13", onDeep: "#121212", foot: "#0a0a0a", onFoot: "#b9b7b0" },
    premium: { bg: "#101010", surface: "#191919", ink: "#ede8df", muted: "#9d968b", accent: "#d9b27c", onAccent: "#101010", accentInk: "#dfbb88", line: "rgba(237,232,223,0.13)", deep: "#090909", onDeep: "#ede8df", foot: "#090909", onFoot: "#9d968b" },
  },
  motoryzacja: {
    klasyczny: { bg: "#f3f5f8", surface: "#e3e8ef", ink: "#0f1b2d", muted: "#5b687b", accent: "#e8541e", onAccent: "#ffffff", accentInk: "#c94313", line: "rgba(15,27,45,0.12)", deep: "#0f1b2d", onDeep: "#f3f5f8", foot: "#0f1b2d", onFoot: "#b9c3d1" },
    odwazny: { bg: "#0b0b0b", surface: "#161616", ink: "#f4f4f2", muted: "#9b9b97", accent: "#e3b23c", onAccent: "#0b0b0b", accentInk: "#e8bd52", line: "rgba(244,244,242,0.12)", deep: "#e3b23c", onDeep: "#0b0b0b", foot: "#050505", onFoot: "#a5a5a0" },
    premium: { bg: "#0d1521", surface: "#142032", ink: "#e8edf4", muted: "#92a0b4", accent: "#d6b98c", onAccent: "#0d1521", accentInk: "#ddc39a", line: "rgba(232,237,244,0.12)", deep: "#080d15", onDeep: "#e8edf4", foot: "#080d15", onFoot: "#92a0b4" },
  },
  gabinety: {
    klasyczny: { bg: "#f3f7f5", surface: "#e3ede8", ink: "#12302a", muted: "#57716a", accent: "#2a7a66", onAccent: "#ffffff", accentInk: "#236b59", line: "rgba(18,48,42,0.12)", deep: "#12302a", onDeep: "#f3f7f5", foot: "#12302a", onFoot: "#b8cbc4" },
    odwazny: { bg: "#f1ece3", surface: "#e6dfd2", ink: "#0f1f1b", muted: "#56625d", accent: "#ff5a3c", onAccent: "#ffffff", accentInk: "#d9401f", line: "rgba(15,31,27,0.14)", deep: "#0f1f1b", onDeep: "#f1ece3", foot: "#0f1f1b", onFoot: "#b9c2bd" },
    premium: { bg: "#10201c", surface: "#172b26", ink: "#eee8db", muted: "#9cada5", accent: "#d9a65a", onAccent: "#10201c", accentInk: "#e0b26c", line: "rgba(238,232,219,0.13)", deep: "#0a1613", onDeep: "#eee8db", foot: "#0a1613", onFoot: "#9cada5" },
  },
  hotele: {
    klasyczny: { bg: "#f7f4ee", surface: "#ebe4d7", ink: "#2a2420", muted: "#7a6e62", accent: "#8a6a3b", onAccent: "#fffaf2", accentInk: "#7d5f33", line: "rgba(42,36,32,0.13)", deep: "#2a2420", onDeep: "#f7f4ee", foot: "#2a2420", onFoot: "#cfc3b3" },
    odwazny: { bg: "#1a1917", surface: "#252320", ink: "#f6f1e7", muted: "#a7a094", accent: "#e0b15a", onAccent: "#1a1917", accentInk: "#e6bd6e", line: "rgba(246,241,231,0.12)", deep: "#e0b15a", onDeep: "#1a1917", foot: "#100f0e", onFoot: "#a7a094" },
    premium: { bg: "#121212", surface: "#1b1b1b", ink: "#efe6d6", muted: "#a39889", accent: "#d29d66", onAccent: "#121212", accentInk: "#dbab78", line: "rgba(239,230,214,0.13)", deep: "#0a0a0a", onDeep: "#efe6d6", foot: "#0a0a0a", onFoot: "#a39889" },
  },
  transport: {
    klasyczny: { bg: "#f6f6f2", surface: "#eaeae4", ink: "#141414", muted: "#67675f", accent: "#f6c400", onAccent: "#141414", accentInk: "#141414", line: "rgba(20,20,20,0.12)", deep: "#141414", onDeep: "#f6f6f2", foot: "#141414", onFoot: "#c4c4bc", mark: true },
    odwazny: { bg: "#111111", surface: "#1c1c1c", ink: "#f6f6f2", muted: "#9d9d96", accent: "#ffd000", onAccent: "#111111", accentInk: "#ffd000", line: "rgba(246,246,242,0.12)", deep: "#ffd000", onDeep: "#111111", foot: "#080808", onFoot: "#a9a9a2" },
    premium: { bg: "#0f1115", surface: "#181b21", ink: "#ecebe6", muted: "#9a9ca3", accent: "#c9b37e", onAccent: "#0f1115", accentInk: "#d3bf8f", line: "rgba(236,235,230,0.12)", deep: "#08090b", onDeep: "#ecebe6", foot: "#08090b", onFoot: "#9a9ca3" },
  },
  "e-commerce": {
    klasyczny: { bg: "#faf8f4", surface: "#f0ebe3", ink: "#1c1a17", muted: "#736c64", accent: "#2f5d50", onAccent: "#ffffff", accentInk: "#2f5d50", line: "rgba(28,26,23,0.12)", deep: "#1c1a17", onDeep: "#faf8f4", foot: "#1c1a17", onFoot: "#c9c2b8" },
    odwazny: { bg: "#f3ece1", surface: "#e8dece", ink: "#121110", muted: "#5e584f", accent: "#b53250", onAccent: "#ffffff", accentInk: "#a32a46", line: "rgba(18,17,16,0.14)", deep: "#121110", onDeep: "#f3ece1", foot: "#121110", onFoot: "#bdb5a9" },
    premium: { bg: "#171412", surface: "#211d1a", ink: "#f0e8dc", muted: "#a59a8d", accent: "#c7a27c", onAccent: "#171412", accentInk: "#d1ae8a", line: "rgba(240,232,220,0.12)", deep: "#0e0c0b", onDeep: "#f0e8dc", foot: "#0e0c0b", onFoot: "#a59a8d" },
  },
  energetyka: {
    klasyczny: { bg: "#f4f7f0", surface: "#e5ecdc", ink: "#102018", muted: "#5a6a60", accent: "#f29a0e", onAccent: "#102018", accentInk: "#a35f00", line: "rgba(16,32,24,0.12)", deep: "#102018", onDeep: "#f4f7f0", foot: "#102018", onFoot: "#b9c6bd", mark: true },
    odwazny: { bg: "#00101c", surface: "#06202f", ink: "#eef4f7", muted: "#8aa1b0", accent: "#fc7402", onAccent: "#00101c", accentInk: "#ff8a2a", line: "rgba(238,244,247,0.12)", deep: "#fc7402", onDeep: "#00101c", foot: "#000a12", onFoot: "#8aa1b0" },
    premium: { bg: "#0c1411", surface: "#13201b", ink: "#e9efe6", muted: "#94a59a", accent: "#d4b45c", onAccent: "#0c1411", accentInk: "#dcc070", line: "rgba(233,239,230,0.12)", deep: "#070d0b", onDeep: "#e9efe6", foot: "#070d0b", onFoot: "#94a59a" },
  },
  uslugi: {
    klasyczny: { bg: "#f8f4f1", surface: "#eee5df", ink: "#241c1a", muted: "#776a64", accent: "#b4563f", onAccent: "#ffffff", accentInk: "#a44c37", line: "rgba(36,28,26,0.12)", deep: "#241c1a", onDeep: "#f8f4f1", foot: "#241c1a", onFoot: "#cdbfb8" },
    odwazny: { bg: "#151515", surface: "#202020", ink: "#f3f3f0", muted: "#9b9b95", accent: "#f2c94c", onAccent: "#151515", accentInk: "#f2c94c", line: "rgba(243,243,240,0.12)", deep: "#f2c94c", onDeep: "#151515", foot: "#0b0b0b", onFoot: "#a5a5a0" },
    premium: { bg: "#18161a", surface: "#221f24", ink: "#efe9e3", muted: "#a39b97", accent: "#c8a27c", onAccent: "#18161a", accentInk: "#d2af8b", line: "rgba(239,233,227,0.12)", deep: "#0f0e10", onDeep: "#efe9e3", foot: "#0f0e10", onFoot: "#a39b97" },
  },
};

const MENU_PL: Group[] = [
  {
    name: "Zupy",
    items: [
      { name: "Żurek na zakwasie", note: "z jajkiem i białą kiełbasą", price: "19 zł" },
      { name: "Rosół z domowym makaronem", note: "gotowany od szóstej rano", price: "16 zł" },
      { name: "Krem z pieczonej dyni", note: "z prażonymi pestkami", price: "18 zł" },
    ],
  },
  {
    name: "Dania główne",
    items: [
      { name: "Pierogi ruskie", note: "8 sztuk, ze skwarkami", price: "29 zł" },
      { name: "Kotlet schabowy", note: "z kapustą zasmażaną i ziemniakami", price: "38 zł" },
      { name: "Placki ziemniaczane", note: "ze śmietaną albo gulaszem", price: "32 zł" },
      { name: "Polędwiczki w sosie kurkowym", note: "z domowymi kopytkami", price: "46 zł" },
    ],
  },
  {
    name: "Desery",
    items: [
      { name: "Sernik na zimno", note: "z musem malinowym", price: "17 zł" },
      { name: "Szarlotka na ciepło", note: "z lodami waniliowymi", price: "18 zł" },
    ],
  },
];

const MENU_PIZZA: Group[] = [
  {
    name: "Pizza 32 cm",
    items: [
      { name: "Margherita", note: "pomidory San Marzano, fior di latte, bazylia", price: "29 zł" },
      { name: "Diavola", note: "pikantne salami, chili, oliwa", price: "36 zł" },
      { name: "Capricciosa", note: "szynka, pieczarki, karczochy, oliwki", price: "38 zł" },
      { name: "Quattro formaggi", note: "mozzarella, gorgonzola, parmezan, pecorino", price: "39 zł" },
    ],
  },
  {
    name: "Makarony",
    items: [
      { name: "Spaghetti carbonara", note: "guanciale, żółtko, pecorino", price: "34 zł" },
      { name: "Tagliatelle z kurkami", note: "śmietana, parmezan, natka", price: "39 zł" },
      { name: "Penne all’arrabbiata", note: "pomidory, czosnek, chili", price: "29 zł" },
    ],
  },
  {
    name: "Desery",
    items: [
      { name: "Tiramisu", note: "mascarpone, espresso, kakao", price: "19 zł" },
      { name: "Panna cotta", note: "z sosem malinowym", price: "17 zł" },
    ],
  },
];

const MENU_KEBAB: Group[] = [
  {
    name: "Kebaby",
    items: [
      { name: "Kebab w bułce", note: "mięso, surówki, dwa sosy", price: "24 zł" },
      { name: "Kebab w tortilli", note: "duży, z serem", price: "27 zł" },
      { name: "Kebab box", note: "mięso, frytki, sos czosnkowy", price: "28 zł" },
      { name: "Talerz kebab", note: "mięso, frytki, surówki", price: "36 zł" },
    ],
  },
  {
    name: "Z grilla",
    items: [
      { name: "Szaszłyk drobiowy", note: "z ryżem i sałatką", price: "34 zł" },
      { name: "Falafel na talerzu", note: "hummus, warzywa, pita", price: "31 zł" },
      { name: "Skrzydełka BBQ", note: "8 sztuk", price: "26 zł" },
    ],
  },
  {
    name: "Dodatki",
    items: [
      { name: "Frytki", note: "duża porcja", price: "12 zł" },
      { name: "Sos czosnkowy", note: "robiony na miejscu", price: "3 zł" },
      { name: "Ayran", note: "0,3 l", price: "8 zł" },
    ],
  },
];

const MENU_SUSHI: Group[] = [
  {
    name: "Zestawy",
    items: [
      { name: "Zestaw Classic", note: "24 kawałki", price: "89 zł" },
      { name: "Zestaw dla dwojga", note: "40 kawałków", price: "149 zł" },
      { name: "Zestaw Wege", note: "20 kawałków", price: "69 zł" },
    ],
  },
  {
    name: "Rolki",
    items: [
      { name: "Futomaki z łososiem", note: "8 sztuk, awokado, ogórek", price: "36 zł" },
      { name: "California z krewetką", note: "8 sztuk, tobiko", price: "38 zł" },
      { name: "Hosomaki z ogórkiem", note: "6 sztuk", price: "14 zł" },
    ],
  },
  {
    name: "Na ciepło",
    items: [
      { name: "Ramen shoyu", note: "bulion, chashu, jajko", price: "42 zł" },
      { name: "Krewetki w tempurze", note: "5 sztuk, sos ponzu", price: "34 zł" },
      { name: "Gyoza z kurczakiem", note: "6 sztuk", price: "26 zł" },
    ],
  },
];

const MENU_BURGER: Group[] = [
  {
    name: "Burgery",
    items: [
      { name: "Classic", note: "wołowina 180 g, cheddar, pikle", price: "34 zł" },
      { name: "Bacon BBQ", note: "boczek, sos BBQ, karmelizowana cebula", price: "38 zł" },
      { name: "Chili", note: "jalapeño, pikantny majonez", price: "37 zł" },
      { name: "Veggie", note: "kotlet z ciecierzycy, hummus", price: "32 zł" },
    ],
  },
  {
    name: "Dodatki",
    items: [
      { name: "Frytki belgijskie", note: "z solą morską", price: "12 zł" },
      { name: "Krążki cebulowe", note: "8 sztuk", price: "14 zł" },
      { name: "Coleslaw", note: "domowy", price: "9 zł" },
    ],
  },
  {
    name: "Napoje",
    items: [
      { name: "Lemoniada domowa", note: "0,4 l", price: "12 zł" },
      { name: "Shake waniliowy", note: "0,4 l", price: "16 zł" },
    ],
  },
];

const MENU_CAFE: Group[] = [
  {
    name: "Kawa",
    items: [
      { name: "Espresso", note: "ziarno z lokalnej palarni", price: "9 zł" },
      { name: "Flat white", note: "podwójne espresso, mleko", price: "14 zł" },
      { name: "Cappuccino", note: "klasyczne, 200 ml", price: "13 zł" },
      { name: "Latte z syropem", note: "wanilia, karmel lub orzech", price: "16 zł" },
    ],
  },
  {
    name: "Ciasta",
    items: [
      { name: "Sernik baskijski", note: "przypalony, kremowy", price: "17 zł" },
      { name: "Szarlotka z kruszonką", note: "z cynamonem", price: "15 zł" },
      { name: "Tarta z owocami", note: "sezonowe owoce", price: "18 zł" },
    ],
  },
  {
    name: "Śniadania",
    items: [
      { name: "Jajka po turecku", note: "jogurt, masło z chili, chleb", price: "29 zł" },
      { name: "Owsianka", note: "owoce, orzechy, miód", price: "22 zł" },
      { name: "Tost z awokado", note: "jajko w koszulce, rzodkiewka", price: "26 zł" },
    ],
  },
];

const restauracje: Kit = {
  slug: "restauracje",
  category: "Restauracja",
  art: "plate",
  navCta: "Zarezerwuj stolik",
  hours: "Pn–Nd 12:00–22:00",
  hero: {
    layout: "split",
    eyebrow: (c) => `Kuchnia polska${dot(c)}`,
    lead: "Domowe obiady, sezonowa karta i stolik, który czeka na Ciebie — bez kolejki.",
    primary: "Zobacz menu",
    secondary: "Zarezerwuj stolik",
    badge: ["Obiad dnia", "od 12:00"],
    widget: { kind: "facts", items: [["Adres", addr], ["Otwarte", "Pn–Nd 12–22"], ["Telefon", PHONE]] },
  },
  sections: [
    { kind: "menu", id: "menu", nav: "Menu", eyebrow: "Karta", title: "Menu, do którego się *wraca*", groups: MENU_PL, note: "Na wynos pakujemy w opakowania z papieru i trzciny." },
    {
      kind: "features",
      id: "o-nas",
      nav: "O nas",
      eyebrow: "O nas",
      title: "Gotujemy tak, jak *w domu*",
      lead: (c) => `Mała kuchnia${c.inCity ? ` ${c.inCity}` : ""}, duże porcje. Wszystko robimy na miejscu — od rosołu po sernik.`,
      items: [
        { name: "Lepione ręcznie", note: "Pierogi i kluski robimy codziennie rano." },
        { name: "Lokalne produkty", note: "Mięso i warzywa od dostawców z okolicy." },
        { name: "Sala na przyjęcia", note: "Chrzciny, komunie i urodziny do 40 osób." },
      ],
    },
    {
      kind: "form",
      id: "rezerwacja",
      nav: "Rezerwacja",
      style: "booking",
      eyebrow: "Rezerwacja",
      title: "Zarezerwuj *stolik*",
      lead: "Wybierz dzień i godzinę — potwierdzimy SMS-em.",
      fields: [["Data", "pt, 14 listopada"], ["Godzina", "19:00"], ["Goście", "4 osoby"]],
      button: "Rezerwuję",
      aside: [`Większe przyjęcie? Zadzwoń: ${PHONE}`],
    },
    {
      kind: "reviews",
      id: "opinie",
      eyebrow: "Opinie",
      title: "Co mówią *goście*",
      items: [
        "Porcje ogromne, a pierogi lepsze niż u babci.",
        "Szybka obsługa i świetny klimat. Wrócimy w niedzielę.",
        "Catering na urodziny — wszystko na czas i jeszcze gorące.",
      ],
    },
    { kind: "contact", id: "kontakt", nav: "Kontakt", eyebrow: "Kontakt", title: "Wpadnij *na obiad*" },
  ],
  cta: { title: "Głodny? *Zadzwoń* i zamów.", lead: "Odbiór osobisty albo dowóz w okolicy — gorące i na czas.", button: `Zadzwoń: ${PHONE}` },
  palettes: PALETTES.restauracje,
  variants: {
    pizza: {
      category: "Pizzeria",
      art: "pizza",
      navCta: "Zamów pizzę",
      hero: {
        eyebrow: (c) => `Pizza neapolitańska${dot(c)}`,
        lead: "Ciasto dojrzewa 48 godzin, piec ma 450°C, a pizza jest u Ciebie w pół godziny.",
        secondary: "Zamów z dowozem",
        badge: ["Piec opalany", "drewnem"],
      },
      sections: {
        menu: { title: "Prosto *z pieca*", groups: MENU_PIZZA },
        "o-nas": {
          title: "Pizza bez *skrótów*",
          lead: "Mąka typu 00, pomidory San Marzano i mozzarella fior di latte. Więcej nie trzeba.",
          items: [
            { name: "48 godzin", note: "Tyle dojrzewa nasze ciasto." },
            { name: "90 sekund", note: "Tyle piecze się pizza w 450°C." },
            { name: "Dowóz", note: "Gorąca pod drzwiami, zwykle w 30 minut." },
          ],
        },
      },
      cta: { title: "Głodny? *Zadzwoń* i zamów pizzę." },
    },
    kebab: {
      category: "Kebab & grill",
      art: "grill",
      navCta: "Zamów",
      hours: "Pn–Nd 11:00–24:00",
      hero: {
        eyebrow: (c) => `Kebab · grill${dot(c)}`,
        lead: "Mięso prosto z rożna, chlebek z pieca i sosy robione na miejscu. Otwarte do późna.",
        secondary: "Zadzwoń i zamów",
        badge: ["Weekend", "otwarte do 2:00"],
        widget: { kind: "facts", items: [["Adres", addr], ["Otwarte", "Pn–Nd 11–24"], ["Zamówienia", PHONE]] },
      },
      sections: {
        menu: { title: "Menu z *ognia*", groups: MENU_KEBAB },
        "o-nas": {
          title: "Świeże, nie *mrożone*",
          lead: "Mięso marynujemy sami, sosy robimy codziennie, a porcje nikogo nie zawodzą.",
          items: [
            { name: "Własna marynata", note: "Mięso dojrzewa u nas co najmniej dobę." },
            { name: "Sosy z kuchni", note: "Czosnkowy, ostry i mieszany — codziennie świeże." },
            { name: "Duże porcje", note: "Wychodzisz najedzony. Zawsze." },
          ],
        },
        rezerwacja: null,
      },
    },
    sushi: {
      category: "Sushi bar",
      art: "sushi",
      navCta: "Zamów online",
      hero: {
        eyebrow: (c) => `Sushi & ramen${dot(c)}`,
        lead: "Ryba z dostaw dwa razy w tygodniu, ryż według japońskiej receptury. Na miejscu i na wynos.",
        badge: ["Zestawy", "dla 2 osób"],
      },
      sections: {
        menu: { title: "Zestawy i *rolki*", groups: MENU_SUSHI },
        "o-nas": {
          title: "Ryż to *połowa* sukcesu",
          lead: "Gotujemy go kilka razy dziennie, w małych porcjach — dlatego zawsze ma idealną temperaturę.",
          items: [
            { name: "Świeża ryba", note: "Dostawy we wtorki i piątki." },
            { name: "Robione przy Tobie", note: "Otwarta kuchnia, zero tajemnic." },
            { name: "Na wynos", note: "Zapakowane tak, żeby nic się nie rozpadło." },
          ],
        },
      },
    },
    burger: {
      category: "Burger bar",
      art: "burger",
      navCta: "Zamów",
      hero: {
        eyebrow: (c) => `Burgery z grilla${dot(c)}`,
        lead: "Wołowina mielona codziennie, bułki z lokalnej piekarni i frytki krojone na miejscu.",
        badge: ["Burger dnia", "29 zł"],
      },
      sections: {
        menu: { title: "Burgery, które *kapią*", groups: MENU_BURGER },
        "o-nas": {
          title: "Mięso, ogień, *bułka*",
          lead: "Bez mrożonek i bez skrótów — tylko dobra wołowina i grill rozgrzany do czerwoności.",
          items: [
            { name: "Mielone codziennie", note: "Wołowina z polskich hodowli." },
            { name: "Lokalna piekarnia", note: "Bułki maślane pieczone rano." },
            { name: "Frytki z ziemniaków", note: "Krojone na miejscu, smażone dwa razy." },
          ],
        },
      },
    },
    kawiarnia: {
      category: "Kawiarnia",
      art: "cup",
      navCta: "Zamów tort",
      hours: "Pn–Nd 8:00–20:00",
      hero: {
        eyebrow: (c) => `Kawiarnia i cukiernia${dot(c)}`,
        lead: "Kawa z lokalnej palarni, ciasta pieczone każdego ranka i śniadania do 13:00.",
        primary: "Zobacz kartę",
        secondary: "Zamów tort",
        badge: ["Śniadania", "do 13:00"],
        widget: { kind: "facts", items: [["Adres", addr], ["Otwarte", "Pn–Nd 8–20"], ["Torty", PHONE]] },
      },
      sections: {
        menu: { title: "Kawa i *coś słodkiego*", groups: MENU_CAFE },
        "o-nas": {
          title: "Pieczemy *każdego ranka*",
          lead: "Ciasta wychodzą z pieca, zanim otworzymy drzwi. Kawę palimy razem z lokalną palarnią.",
          items: [
            { name: "Świeże ciasta", note: "Codziennie inne, zawsze z rana." },
            { name: "Kawa speciality", note: "Ziarno palone w okolicy." },
            { name: "Torty na zamówienie", note: "Urodziny, komunie, wesela." },
          ],
        },
        rezerwacja: {
          nav: "Torty",
          eyebrow: "Na zamówienie",
          title: "Tort na *Twoją* okazję",
          lead: "Zamów z trzydniowym wyprzedzeniem — potwierdzimy telefonicznie.",
          fields: [["Okazja", "Urodziny"], ["Porcje", "20 porcji"], ["Odbiór", "sob, 15 listopada"]],
          button: "Zamawiam tort",
        },
      },
    },
  },
};

const budowlanka: Kit = {
  slug: "budowlanka",
  category: "Remonty i wykończenia",
  art: "build",
  navCta: "Bezpłatna wycena",
  hours: "Pn–Pt 7:00–17:00, Sb 8:00–13:00",
  hero: {
    layout: "claim",
    eyebrow: (c) => (c.city ? `Remonty i wykończenia · ${c.city} i okolice` : "Remonty i wykończenia wnętrz"),
    title: "Remont bez *niespodzianek*.",
    lead: "Łazienki, kuchnie i całe mieszkania pod klucz. Termin i cena na piśmie, zanim zaczniemy.",
    primary: "Bezpłatna wycena",
    secondary: "Zobacz realizacje",
    badge: ["Każdy remont", "zdjęcia przed i po"],
    widget: { kind: "badges", items: ["Wycena w 48 h", "Gwarancja 24 mies.", "Faktura VAT"] },
  },
  sections: [
    {
      kind: "cards",
      id: "uslugi",
      nav: "Usługi",
      eyebrow: "Zakres prac",
      title: "Zrobimy to *od A do Z*",
      items: [
        { name: "Łazienki pod klucz", note: "Skucie, hydraulika, płytki i biały montaż.", price: "od 2 tygodni" },
        { name: "Kuchnie", note: "Instalacje, płytki, montaż zabudowy i AGD.", price: "od 10 dni" },
        { name: "Malowanie i gładzie", note: "Równe ściany bez smug — także w zamieszkałych mieszkaniach.", price: "od 25 zł/m²" },
        { name: "Podłogi", note: "Panele, deska, płytki wielkoformatowe.", price: "od 35 zł/m²" },
        { name: "Elektryka i hydraulika", note: "Nowe instalacje z odbiorem i dokumentacją." },
        { name: "Remonty pod wynajem", note: "Szybko, solidnie i w ustalonym budżecie." },
      ],
    },
    {
      kind: "gallery",
      id: "realizacje",
      nav: "Realizacje",
      style: "projects",
      eyebrow: "Realizacje",
      title: "Zobacz, jak *pracujemy*",
      items: [
        { name: "Łazienka 6 m²", meta: ["płytki 120 × 60", "4 tygodnie"], thumb: { kind: "pattern", pattern: "tiles" } },
        { name: "Kuchnia w bieli", meta: ["zabudowa z wyspą"], thumb: { kind: "pattern", pattern: "kitchen" } },
        { name: "Salon z aneksem", meta: ["gładzie, deska dębowa"], thumb: { kind: "pattern", pattern: "planks" } },
        { name: "Elewacja domu", meta: ["ocieplenie i tynk"], thumb: { kind: "pattern", pattern: "bricks" } },
      ],
    },
    {
      kind: "steps",
      id: "proces",
      eyebrow: "Jak to wygląda",
      title: "Cztery kroki, *zero nerwów*",
      items: [
        { name: "Oględziny", note: "Przyjeżdżam, mierzę i doradzam. Bezpłatnie." },
        { name: "Wycena na piśmie", note: "Konkretny kosztorys i termin w 48 godzin." },
        { name: "Realizacja", note: "Codzienny kontakt i zdjęcia z postępów." },
        { name: "Odbiór", note: "Sprzątamy po sobie. Gwarancja 24 miesiące." },
      ],
    },
    {
      kind: "form",
      id: "wycena",
      nav: "Wycena",
      style: "quote",
      eyebrow: "Bezpłatna wycena",
      title: "Opisz remont, *oddzwonię*",
      lead: "Wycena w 48 godzin — bez zobowiązań.",
      fields: [["Rodzaj prac", "Remont łazienki"], ["Metraż", "ok. 6 m²"], ["Telefon", PHONE]],
      button: "Wyślij zapytanie",
      aside: ["Bezpłatne oględziny", "Kosztorys na piśmie", "Termin startu od razu w wycenie"],
    },
    {
      kind: "reviews",
      id: "opinie",
      eyebrow: "Opinie",
      title: "Klienci *polecają*",
      items: [
        "Termin dotrzymany co do dnia, a ekipa posprzątała po sobie.",
        "Łazienka jak z katalogu. Cena dokładnie taka, jak w wycenie.",
        "Konkretny kontakt i zero niespodzianek na koniec. Polecam.",
      ],
    },
    { kind: "contact", id: "kontakt", nav: "Kontakt", eyebrow: "Kontakt", title: "Porozmawiajmy o *remoncie*" },
  ],
  cta: { title: "Planujesz remont? *Zadzwoń* dziś.", lead: "Bezpłatne oględziny i wycena na piśmie w 48 godzin.", button: `Zadzwoń: ${PHONE}` },
  palettes: PALETTES.budowlanka,
  variants: {
    dach: {
      category: "Dachy i pokrycia",
      art: "roof",
      hero: {
        eyebrow: (c) => (c.city ? `Dekarstwo · ${c.city} i okolice` : "Dekarstwo i pokrycia dachowe"),
        title: "Dach, który przetrwa *dekady*.",
        lead: "Nowe pokrycia, remonty i docieplenia. Sprawdzone materiały i gwarancja na szczelność.",
        badge: ["Gwarancja", "10 lat szczelności"],
      },
      sections: {
        uslugi: {
          title: "Wszystko, co *nad głową*",
          items: [
            { name: "Blachodachówka", note: "Montaż na nowych i starych więźbach.", price: "od 70 zł/m²" },
            { name: "Dachówka ceramiczna", note: "Pokrycia na dekady, także na trudnych dachach.", price: "od 110 zł/m²" },
            { name: "Rynny i obróbki", note: "Systemy stalowe i PVC, kominy, attyki." },
            { name: "Docieplenie poddasza", note: "Wełna lub PIR, z membraną i paroizolacją.", price: "od 90 zł/m²" },
            { name: "Okna dachowe", note: "Montaż z kołnierzem i obróbką." },
            { name: "Przeglądy i naprawy", note: "Szybka pomoc po wichurze i ulewie." },
          ],
        },
        realizacje: {
          items: [
            { name: "Dach dwuspadowy", meta: ["blachodachówka", "180 m²"], thumb: { kind: "pattern", pattern: "roof" } },
            { name: "Dom z poddaszem", meta: ["dachówka ceramiczna"], thumb: { kind: "pattern", pattern: "bricks" } },
            { name: "Docieplenie poddasza", meta: ["wełna 30 cm"], thumb: { kind: "pattern", pattern: "planks" } },
            { name: "Rynny i obróbki", meta: ["system stalowy"], thumb: { kind: "pattern", pattern: "fence" } },
          ],
        },
        wycena: { fields: [["Rodzaj prac", "Wymiana pokrycia"], ["Powierzchnia", "ok. 160 m²"], ["Telefon", PHONE]] },
      },
      cta: { title: "Dach przecieka? *Zadzwoń* dziś." },
    },
    bruk: {
      category: "Brukarstwo i ogrody",
      art: "paving",
      hero: {
        eyebrow: (c) => (c.city ? `Brukarstwo · ${c.city} i okolice` : "Brukarstwo i zagospodarowanie terenu"),
        title: "Podjazd, który *robi wrażenie*.",
        lead: "Kostka, płyty tarasowe, obrzeża i odwodnienie. Solidna podbudowa — równo i na lata.",
        badge: ["Podbudowa", "do 40 cm"],
      },
      sections: {
        uslugi: {
          title: "Od podjazdu *po ogród*",
          items: [
            { name: "Podjazdy i chodniki", note: "Kostka betonowa i granitowa.", price: "od 90 zł/m²" },
            { name: "Tarasy z płyt", note: "Płyty wielkoformatowe na wspornikach lub podsypce.", price: "od 140 zł/m²" },
            { name: "Obrzeża i palisady", note: "Równe krawędzie, które nie siadają." },
            { name: "Odwodnienia", note: "Korytka liniowe i drenaż." },
            { name: "Ogrodzenia", note: "Z podmurówką, panelowe i z gabionów." },
            { name: "Trawniki", note: "Z siewu lub z rolki, z nawadnianiem." },
          ],
        },
        realizacje: {
          items: [
            { name: "Podjazd z kostki", meta: ["120 m²", "obrzeża granitowe"], thumb: { kind: "pattern", pattern: "paving" } },
            { name: "Taras z płyt", meta: ["płyty 60 × 120"], thumb: { kind: "pattern", pattern: "tiles" } },
            { name: "Ścieżki w ogrodzie", meta: ["kostka + żwir"], thumb: { kind: "pattern", pattern: "garden" } },
            { name: "Ogrodzenie", meta: ["panele z podmurówką"], thumb: { kind: "pattern", pattern: "fence" } },
          ],
        },
        wycena: { fields: [["Rodzaj prac", "Podjazd z kostki"], ["Powierzchnia", "ok. 80 m²"], ["Telefon", PHONE]] },
      },
    },
  },
};

const motoryzacja: Kit = {
  slug: "motoryzacja",
  category: "Komis samochodowy",
  art: "car",
  navCta: PHONE,
  navIcon: "phone",
  hours: "Pn–Pt 9:00–18:00, Sb 9:00–14:00",
  hero: {
    layout: "claim",
    eyebrow: (c) => `Komis samochodowy${dot(c)}`,
    title: "Sprawdzone auta z *pełną historią*.",
    lead: "Każde auto po przeglądzie, z raportem historii i pomocą w rejestracji. Przyjedź na jazdę próbną.",
    primary: "Zobacz auta",
    secondary: "Kredyt i leasing",
    badge: ["Każde auto", "z raportem historii"],
    widget: { kind: "search", fields: [["Marka", "Wszystkie"], ["Nadwozie", "SUV, kombi"], ["Cena do", "70 000 zł"]], button: "Pokaż auta" },
  },
  sections: [
    {
      kind: "gallery",
      id: "oferta",
      nav: "Auta",
      style: "fleet",
      eyebrow: "Na placu",
      title: "Auta gotowe *do jazdy*",
      chips: ["Wszystkie", "Kombi", "SUV", "Hatchback"],
      items: [
        { name: "Škoda Octavia Combi", note: "2.0 TDI · 150 KM", meta: ["2019", "148 tys. km", "Diesel"], price: "54 900 zł", badge: "Polecane", thumb: { kind: "car", body: "kombi", tone: 0 } },
        { name: "Toyota Corolla", note: "1.8 Hybrid · automat", meta: ["2020", "96 tys. km", "Hybryda"], price: "72 500 zł", thumb: { kind: "car", body: "hatch", tone: 1 } },
        { name: "Kia Sportage", note: "1.6 T-GDI · 177 KM", meta: ["2018", "131 tys. km", "Benzyna"], price: "69 900 zł", thumb: { kind: "car", body: "suv", tone: 2 } },
        { name: "Volkswagen Golf", note: "1.5 TSI · 130 KM", meta: ["2019", "112 tys. km", "Benzyna"], price: "58 900 zł", thumb: { kind: "car", body: "hatch", tone: 3 } },
      ],
    },
    {
      kind: "features",
      id: "dlaczego",
      nav: "O nas",
      eyebrow: "Dlaczego my",
      title: "Kupujesz auto, *nie problem*",
      items: [
        { name: "Raport historii", note: "Przebieg i szkody sprawdzone przed wystawieniem." },
        { name: "Przegląd na miejscu", note: "Każde auto przechodzi diagnostykę w serwisie." },
        { name: "Rejestracja", note: "Pomagamy z formalnościami — wyjeżdżasz na swoich tablicach." },
        { name: "Zamiana", note: "Przyjmujemy Twoje auto w rozliczeniu." },
      ],
    },
    {
      kind: "band",
      id: "finansowanie",
      style: "finance",
      eyebrow: "Finansowanie",
      title: "Kredyt i leasing *na miejscu*",
      lead: "Decyzja nawet w 30 minut. Także dla firm i bez wkładu własnego.",
      button: "Zapytaj o ratę",
    },
    {
      kind: "reviews",
      id: "opinie",
      eyebrow: "Opinie",
      title: "Opinie *kierowców*",
      items: [
        "Auto dokładnie takie, jak w ogłoszeniu. Zero ściemy.",
        "Pomogli z rejestracją — wszystko załatwione w jeden dzień.",
        "Uczciwie opisane wady i dobra cena. Polecam.",
      ],
    },
    { kind: "contact", id: "kontakt", nav: "Kontakt", eyebrow: "Kontakt", title: "Przyjedź na *jazdę próbną*" },
  ],
  cta: { title: "Szukasz auta? *Zadzwoń*, znajdziemy.", lead: "Nie ma go na placu? Sprowadzimy pod zamówienie.", button: `Zadzwoń: ${PHONE}` },
  palettes: PALETTES.motoryzacja,
  variants: {
    wypozyczalnia: {
      category: "Wypożyczalnia samochodów",
      navCta: "Rezerwuj auto",
      navIcon: undefined,
      hero: {
        eyebrow: (c) => `Wynajem samochodów${dot(c)}`,
        title: "Auto na dziś, *bez kombinowania*.",
        lead: "Osobowe, kombi i busy na dobę, tydzień albo miesiąc. Podstawimy auto pod wskazany adres.",
        primary: "Sprawdź dostępność",
        secondary: "Cennik",
        badge: ["Podstawienie", "pod dom i lotnisko"],
        widget: { kind: "booking", fields: [["Odbiór", (c) => c.city || "Twoje miasto"], ["Od", "pt, 14.11"], ["Do", "nd, 16.11"]], button: "Szukaj aut" },
      },
      sections: {
        oferta: {
          nav: "Flota",
          eyebrow: "Flota",
          title: "Wybierz *auto*",
          chips: ["Wszystkie", "Osobowe", "Kombi", "Busy"],
          items: [
            { name: "Toyota Yaris", note: "Klasa B · manual", meta: ["5 osób", "Benzyna", "Klima"], price: "od 119 zł / doba", thumb: { kind: "car", body: "hatch", tone: 1 } },
            { name: "Škoda Octavia", note: "Kombi · automat", meta: ["5 osób", "Diesel", "Nawigacja"], price: "od 169 zł / doba", badge: "Najczęściej", thumb: { kind: "car", body: "kombi", tone: 0 } },
            { name: "Toyota RAV4", note: "SUV · 4 × 4", meta: ["5 osób", "Hybryda", "Automat"], price: "od 249 zł / doba", thumb: { kind: "car", body: "suv", tone: 2 } },
            { name: "Ford Transit", note: "Bus 9-osobowy", meta: ["9 osób", "Diesel", "Hak"], price: "od 299 zł / doba", thumb: { kind: "car", body: "van", tone: 3 } },
          ],
        },
        dlaczego: {
          title: "Wynajem *bez gwiazdek*",
          items: [
            { name: "Bez ukrytych opłat", note: "Cena z ubezpieczeniem i limitem kilometrów." },
            { name: "Podstawienie auta", note: "Pod dom, dworzec albo lotnisko." },
            { name: "Auto zastępcze z OC", note: "Rozliczamy się bezpośrednio z ubezpieczycielem." },
            { name: "Długi termin", note: "Rabaty od 7 dni najmu." },
          ],
        },
        finansowanie: {
          eyebrow: "Po stłuczce",
          title: "Auto zastępcze *z OC sprawcy*",
          lead: "Nie z Twojej winy? Auto zastępcze bez kosztów — formalności załatwimy za Ciebie.",
          button: "Zapytaj o auto",
        },
      },
      cta: { title: "Potrzebujesz auta? *Zadzwoń*.", lead: "Sprawdzimy dostępność i podstawimy auto tam, gdzie chcesz." },
    },
    warsztat: {
      category: "Warsztat samochodowy",
      art: "garage",
      navCta: "Umów wizytę",
      navIcon: undefined,
      hero: {
        eyebrow: (c) => `Mechanika i diagnostyka${dot(c)}`,
        title: "Naprawimy to *za pierwszym razem*.",
        lead: "Mechanika, diagnostyka komputerowa, opony i klimatyzacja. Wycena przed naprawą — zawsze.",
        primary: "Umów wizytę",
        secondary: "Cennik",
        badge: ["Wycena", "przed każdą naprawą"],
        widget: { kind: "badges", items: ["Wycena przed naprawą", "Gwarancja na części", "Auto zastępcze"] },
      },
      sections: { oferta: null, finansowanie: null, dlaczego: { title: "Warsztat, któremu *ufasz*" } },
      add: [
        {
          kind: "pricelist",
          id: "cennik",
          nav: "Cennik",
          eyebrow: "Cennik",
          title: "Ceny *przed naprawą*",
          groups: [
            { name: "Serwis", items: [{ name: "Wymiana oleju z filtrem", price: "od 120 zł" }, { name: "Diagnostyka komputerowa", price: "100 zł" }, { name: "Serwis klimatyzacji", price: "199 zł" }] },
            { name: "Mechanika", items: [{ name: "Klocki hamulcowe (oś)", price: "od 150 zł" }, { name: "Rozrząd z pompą wody", price: "od 700 zł" }, { name: "Geometria kół", price: "150 zł" }] },
            { name: "Opony", items: [{ name: "Wymiana kół (komplet)", price: "od 100 zł" }, { name: "Przechowanie opon", price: "120 zł / sezon" }] },
          ],
          note: "Ceny robocizny — części wyceniamy przed naprawą.",
        },
        {
          kind: "form",
          id: "wizyta",
          nav: "Wizyta",
          style: "visit",
          eyebrow: "Umów wizytę",
          title: "Wybierz *termin*",
          lead: "Oddzwonimy z potwierdzeniem i orientacyjną ceną.",
          fields: [["Auto", "Opel Astra 1.6"], ["Usługa", "Wymiana oleju"], ["Termin", "wt, 18 listopada"]],
          button: "Umawiam wizytę",
        },
      ],
      order: ["cennik", "dlaczego", "wizyta", "opinie", "kontakt"],
      cta: { title: "Coś stuka? *Zadzwoń*, sprawdzimy." },
    },
  },
};

const gabinety: Kit = {
  slug: "gabinety",
  category: "Stomatologia",
  art: "care",
  navCta: "Umów wizytę",
  hours: "Pn–Pt 9:00–19:00",
  hero: {
    layout: "split",
    eyebrow: (c) => `Gabinet stomatologiczny${dot(c)}`,
    lead: "Leczenie bez bólu i bez pośpiechu. Plan i koszt znasz, zanim zaczniemy.",
    primary: "Umów wizytę",
    secondary: "Cennik",
    badge: ["Znieczulenie", "komputerowe"],
    widget: { kind: "slots", label: "Najbliższe wolne terminy", slots: ["pon 9:30", "pon 14:00", "wt 11:15", "śr 16:45"] },
  },
  sections: [
    {
      kind: "pricelist",
      id: "cennik",
      nav: "Cennik",
      eyebrow: "Usługi i cennik",
      title: "Ceny bez *niespodzianek*",
      groups: [
        { name: "Profilaktyka", items: [{ name: "Przegląd i plan leczenia", price: "150 zł" }, { name: "Higienizacja (skaling + piaskowanie)", price: "300 zł" }, { name: "Fluoryzacja", price: "80 zł" }] },
        { name: "Leczenie", items: [{ name: "Wypełnienie kompozytowe", price: "od 250 zł" }, { name: "Leczenie kanałowe", price: "od 800 zł" }, { name: "Korona pełnoceramiczna", price: "od 1800 zł" }] },
        { name: "Estetyka", items: [{ name: "Wybielanie nakładkowe", price: "900 zł" }, { name: "Licówka kompozytowa", price: "od 600 zł" }] },
      ],
      note: "Ceny orientacyjne — dokładny koszt podajemy po badaniu.",
    },
    {
      kind: "steps",
      id: "wizyta",
      nav: "Pierwsza wizyta",
      eyebrow: "Pierwsza wizyta",
      title: "Spokojnie, *krok po kroku*",
      items: [
        { name: "Rejestracja", note: "Online albo telefonicznie — wybierasz dogodny termin." },
        { name: "Rozmowa i badanie", note: "Bez pośpiechu. Mówimy, co widzimy i co proponujemy." },
        { name: "Plan z kosztorysem", note: "Dostajesz plan na piśmie. Decyzja należy do Ciebie." },
      ],
    },
    {
      kind: "hours",
      id: "godziny",
      eyebrow: "Godziny przyjęć",
      title: "Kiedy *przyjmujemy*",
      rows: [["Poniedziałek", "9:00–19:00"], ["Wtorek", "9:00–19:00"], ["Środa", "12:00–20:00"], ["Czwartek", "9:00–19:00"], ["Piątek", "9:00–15:00"], ["Sobota", "wybrane terminy"]],
      aside: "Nagły ból? Zadzwoń — przyjmiemy tego samego dnia.",
    },
    {
      kind: "reviews",
      id: "opinie",
      eyebrow: "Opinie",
      title: "Pacjenci o *nas*",
      items: [
        "Pierwszy raz nie bałam się dentysty. Wszystko wytłumaczone.",
        "Bezboleśnie i w terminie. Cena dokładnie jak w planie.",
        "Przyjęli mnie z bólem tego samego dnia. Dziękuję!",
      ],
    },
    { kind: "contact", id: "kontakt", nav: "Kontakt", eyebrow: "Kontakt", title: "Umów się *na wizytę*" },
  ],
  cta: { title: "Boli ząb? *Zadzwoń*, pomożemy dziś.", lead: "W nagłych przypadkach przyjmujemy tego samego dnia.", button: `Zadzwoń: ${PHONE}` },
  palettes: PALETTES.gabinety,
  variants: {
    weterynarz: {
      category: "Gabinet weterynaryjny",
      art: "paw",
      hero: {
        eyebrow: (c) => `Gabinet weterynaryjny${dot(c)}`,
        lead: "Spokojna opieka dla psów, kotów i małych zwierząt. Bez kolejek i bez pośpiechu.",
        badge: ["Psy i koty", "gryzonie, ptaki"],
      },
      sections: {
        cennik: {
          title: "Usługi i *cennik*",
          groups: [
            { name: "Konsultacje", items: [{ name: "Konsultacja z badaniem", price: "100 zł" }, { name: "Wizyta kontrolna", price: "60 zł" }, { name: "Wizyta domowa", price: "od 150 zł" }] },
            { name: "Profilaktyka", items: [{ name: "Szczepienie z wpisem", price: "od 90 zł" }, { name: "Czipowanie z rejestracją", price: "80 zł" }, { name: "Odrobaczanie", price: "od 30 zł" }] },
            { name: "Zabiegi", items: [{ name: "Kastracja kota", price: "od 300 zł" }, { name: "USG jamy brzusznej", price: "150 zł" }, { name: "Badanie krwi", price: "od 90 zł" }] },
          ],
        },
        wizyta: {
          title: "Pierwsza wizyta *pupila*",
          items: [
            { name: "Umów termin", note: "Online lub telefonicznie — bez czekania w kolejce." },
            { name: "Spokojne badanie", note: "Dajemy zwierzakowi czas, żeby się oswoił." },
            { name: "Jasny plan", note: "Wiesz, co dalej i ile to kosztuje." },
          ],
        },
        opinie: {
          title: "Opiekunowie o *nas*",
          items: [
            "Ogromne podejście do zwierząt — nasz kot był zupełnie spokojny.",
            "Szybka diagnoza i jasno wyjaśnione leczenie. Polecamy.",
            "Przyjęli nas wieczorem w nagłym przypadku. Ogromne dzięki.",
          ],
        },
      },
      cta: { title: "Pupil źle się czuje? *Zadzwoń*." },
    },
    fizjo: {
      category: "Fizjoterapia",
      hero: {
        eyebrow: (c) => `Fizjoterapia i rehabilitacja${dot(c)}`,
        lead: "Ból pleców, kontuzja, powrót do formy po urazie. Najpierw szukamy przyczyny, potem leczymy.",
        badge: ["Pierwsza wizyta", "60 minut"],
      },
      sections: {
        cennik: {
          groups: [
            { name: "Konsultacje", items: [{ name: "Konsultacja fizjoterapeutyczna", price: "180 zł" }, { name: "Wizyta kontrolna", price: "150 zł" }] },
            { name: "Terapia", items: [{ name: "Terapia manualna", price: "200 zł" }, { name: "Masaż leczniczy 60 min", price: "160 zł" }, { name: "Kinesiotaping", price: "60 zł" }] },
            { name: "Pakiety", items: [{ name: "Pakiet 5 wizyt", price: "900 zł" }, { name: "Rehabilitacja po urazach", price: "od 180 zł" }] },
          ],
        },
        opinie: {
          items: [
            "Po trzech wizytach plecy przestały boleć. W końcu ktoś znalazł przyczynę.",
            "Konkretne ćwiczenia do domu i świetne podejście.",
            "Wróciłem do biegania po kontuzji kolana. Polecam!",
          ],
        },
      },
      cta: { title: "Boli? *Umów się*, sprawdzimy.", lead: "Pierwsza wizyta to dokładne badanie i plan terapii." },
    },
    beauty: {
      category: "Gabinet kosmetyczny",
      hero: {
        eyebrow: (c) => `Kosmetologia i stylizacja${dot(c)}`,
        lead: "Zabiegi na twarz, manicure i stylizacja brwi. Spokojne miejsce, w którym masz czas tylko dla siebie.",
        badge: ["Rezerwacja", "online 24/7"],
      },
      sections: {
        cennik: {
          title: "Zabiegi i *cennik*",
          groups: [
            { name: "Dłonie i stopy", items: [{ name: "Manicure hybrydowy", price: "120 zł" }, { name: "Pedicure", price: "150 zł" }] },
            { name: "Twarz", items: [{ name: "Oczyszczanie wodorowe", price: "180 zł" }, { name: "Peeling kwasowy", price: "od 200 zł" }, { name: "Masaż twarzy", price: "140 zł" }] },
            { name: "Brwi i rzęsy", items: [{ name: "Laminacja brwi", price: "130 zł" }, { name: "Henna brwi i rzęs", price: "60 zł" }] },
          ],
          note: "Przed pierwszym zabiegiem — krótka, bezpłatna konsultacja.",
        },
        wizyta: {
          title: "Twoja *pierwsza* wizyta",
          items: [
            { name: "Rezerwacja online", note: "Wybierasz zabieg i godzinę w kilka sekund." },
            { name: "Konsultacja", note: "Dobieramy zabieg do Twojej skóry." },
            { name: "Czas dla Ciebie", note: "Herbata, spokój i efekt, który widać." },
          ],
        },
        godziny: { aside: "Wolne terminy sprawdzisz online o każdej porze." },
        opinie: {
          title: "Klientki o *nas*",
          items: [
            "Hybryda trzyma się prawie cztery tygodnie. Wracam co miesiąc.",
            "Przemiła atmosfera, a skóra po oczyszczaniu jak nowa.",
            "Rezerwacja online to wygoda — umawiam się wieczorem z kanapy.",
          ],
        },
      },
      cta: { title: "Zrób coś *dla siebie*.", lead: "Sprawdź wolne terminy i umów się online w minutę.", button: "Umów wizytę" },
    },
    lekarz: {
      category: "Gabinet lekarski",
      hero: {
        eyebrow: (c) => `Gabinet lekarski${dot(c)}`,
        lead: "Konsultacje, badania okresowe i EKG na miejscu. Krótkie terminy i rozmowa bez pośpiechu.",
        badge: ["E-recepta", "od ręki"],
      },
      sections: {
        cennik: {
          groups: [
            { name: "Konsultacje", items: [{ name: "Konsultacja internistyczna", price: "200 zł" }, { name: "Konsultacja online", price: "150 zł" }, { name: "Wizyta domowa", price: "od 300 zł" }] },
            { name: "Badania", items: [{ name: "EKG z opisem", price: "80 zł" }, { name: "Badania okresowe", price: "od 120 zł" }, { name: "Holter ciśnieniowy", price: "250 zł" }] },
          ],
        },
      },
      cta: { title: "Potrzebujesz lekarza? *Zadzwoń*.", lead: "Wolne terminy zwykle jeszcze w tym tygodniu." },
    },
  },
};

const hotele: Kit = {
  slug: "hotele",
  category: "Hotel i restauracja",
  art: "stay",
  navCta: "Rezerwuj",
  hours: "Recepcja czynna całą dobę",
  hero: {
    layout: "center",
    eyebrow: (c) => `Hotel · sala weselna · restauracja${dot(c)}`,
    lead: "Wygodne pokoje, sala na 180 gości i kuchnia, do której wraca się na niedzielny obiad.",
    primary: "Sprawdź termin",
    secondary: "Wesela i przyjęcia",
    widget: { kind: "booking", fields: [["Przyjazd", "pt, 14 listopada"], ["Wyjazd", "nd, 16 listopada"], ["Goście", "2 dorosłych"]], button: "Sprawdź dostępność" },
  },
  sections: [
    {
      kind: "gallery",
      id: "pokoje",
      nav: "Pokoje",
      style: "rooms",
      eyebrow: "Noclegi",
      title: "Pokoje i *apartamenty*",
      items: [
        { name: "Pokój dwuosobowy", meta: ["2 osoby", "18 m²", "śniadanie"], price: "od 240 zł / noc", thumb: { kind: "room", variant: 0 } },
        { name: "Pokój rodzinny", meta: ["4 osoby", "32 m²", "aneks"], price: "od 360 zł / noc", thumb: { kind: "room", variant: 1 } },
        { name: "Apartament z balkonem", meta: ["2 osoby", "40 m²", "widok na las"], price: "od 420 zł / noc", badge: "Najchętniej wybierany", thumb: { kind: "room", variant: 2 } },
      ],
    },
    {
      kind: "gallery",
      id: "sale",
      nav: "Wesela",
      style: "halls",
      eyebrow: "Przyjęcia",
      title: "Sale na *wesela* i przyjęcia",
      items: [
        { name: "Sala Główna", note: "wesela, bankiety, jubileusze", meta: ["do 180 gości", "parkiet", "klimatyzacja"], thumb: { kind: "hall", variant: 0 } },
        { name: "Sala Kominkowa", note: "komunie, chrzciny, urodziny", meta: ["do 60 gości", "kominek"], thumb: { kind: "hall", variant: 1 } },
      ],
      note: "Menu weselne od 220 zł za osobę — degustacja przed podpisaniem umowy.",
    },
    {
      kind: "features",
      id: "udogodnienia",
      eyebrow: "Na miejscu",
      title: "Wszystko, czego *potrzebujesz*",
      items: [
        { name: "Parking", note: "bezpłatny i monitorowany" },
        { name: "Restauracja", note: "śniadania i kolacje" },
        { name: "Wi-Fi", note: "w całym obiekcie" },
        { name: "Plac zabaw", note: "dla najmłodszych gości" },
        { name: "Sauna", note: "po wcześniejszej rezerwacji" },
        { name: "Rowery", note: "wypożyczalnia dla gości" },
      ],
    },
    {
      kind: "reviews",
      id: "opinie",
      eyebrow: "Opinie",
      title: "Goście o *nas*",
      items: [
        "Cisza, czysto i przepyszne śniadania. Wrócimy latem.",
        "Wesele marzeń — obsługa dopilnowała każdego szczegółu.",
        "Pokój z widokiem na las to był strzał w dziesiątkę.",
      ],
    },
    { kind: "contact", id: "kontakt", nav: "Kontakt", eyebrow: "Kontakt", title: "Zarezerwuj *pobyt*" },
  ],
  cta: { title: "Planujesz *pobyt* albo wesele?", lead: "Zadzwoń — sprawdzimy wolne terminy i przygotujemy ofertę.", button: `Zadzwoń: ${PHONE}` },
  palettes: PALETTES.hotele,
  variants: {
    wesele: {
      category: "Sala weselna",
      hero: {
        eyebrow: (c) => `Sala weselna i bankietowa${dot(c)}`,
        lead: "Wesele, o którym goście będą mówić latami. Kuchnia, obsługa i noclegi w jednym miejscu.",
        primary: "Wolne terminy",
        secondary: "Menu weselne",
        widget: { kind: "booking", fields: [["Data wesela", "sob, 13 czerwca"], ["Liczba gości", "120 osób"], ["Sala", "Główna"]], button: "Sprawdź termin" },
      },
      sections: {
        sale: { nav: "Sale", title: "Sale, które *pamiętają* najpiękniejsze chwile" },
        pokoje: { nav: "Noclegi", eyebrow: "Dla gości", title: "Noclegi dla *gości weselnych*" },
      },
      order: ["sale", "pokoje", "udogodnienia", "opinie", "kontakt"],
      cta: { title: "Zarezerwuj *datę* wesela.", lead: "Najpopularniejsze terminy znikają nawet rok wcześniej." },
    },
    pensjonat: {
      category: "Pensjonat",
      hero: {
        eyebrow: (c) => `Pensjonat${dot(c)}`,
        lead: "Kilka pokoi, cisza i śniadania z lokalnych produktów. Idealne miejsce na weekend.",
        secondary: "Pokoje",
      },
      sections: {
        sale: null,
        pokoje: {
          items: [
            { name: "Pokój dwuosobowy", meta: ["2 osoby", "16 m²", "śniadanie"], price: "od 180 zł / noc", thumb: { kind: "room", variant: 0 } },
            { name: "Pokój z tarasem", meta: ["2 osoby", "22 m²", "taras"], price: "od 220 zł / noc", badge: "Polecany", thumb: { kind: "room", variant: 2 } },
            { name: "Domek dla czterech", meta: ["4 osoby", "45 m²", "kominek"], price: "od 390 zł / noc", thumb: { kind: "room", variant: 1 } },
          ],
        },
        udogodnienia: {
          items: [
            { name: "Śniadania", note: "z lokalnych produktów" },
            { name: "Ognisko i grill", note: "drewno w cenie" },
            { name: "Parking", note: "przy samym domu" },
            { name: "Rowery", note: "dla gości bez opłat" },
            { name: "Wi-Fi", note: "także w ogrodzie" },
            { name: "Zwierzęta", note: "mile widziane" },
          ],
        },
      },
      cta: { title: "Weekend *za miastem*?", lead: "Zadzwoń albo napisz — sprawdzimy wolne pokoje." },
    },
  },
};

const transport: Kit = {
  slug: "transport",
  category: "Taxi",
  art: "route",
  navCta: PHONE,
  navIcon: "phone",
  hours: "Całą dobę, 7 dni w tygodniu",
  hero: {
    layout: "claim",
    eyebrow: (c) => (c.city ? `Taxi · ${c.city} i okolice · 24/7` : "Taxi · całą dobę"),
    title: (c) => (c.inCity ? `Taxi ${c.inCity}. *Całą dobę*.` : "Taxi, które *przyjeżdża*."),
    lead: "Kursy po mieście, na lotnisko i dworzec. Płatność kartą, faktura na miejscu.",
    primary: "Zadzwoń teraz",
    secondary: "Cennik kursów",
    badge: ["Średni dojazd", "ok. 10 minut"],
    widget: { kind: "phone" },
  },
  sections: [
    {
      kind: "routes",
      id: "cennik",
      nav: "Cennik",
      eyebrow: "Cennik",
      title: "Orientacyjne *ceny kursów*",
      items: [
        { name: "Kurs po mieście", note: "do 5 km", price: "od 15 zł" },
        { name: "Dworzec i centrum", note: "z każdego osiedla", price: "od 20 zł" },
        { name: "Lotnisko", note: "z pomocą przy bagażach", price: "od 140 zł" },
        { name: "Kurs nocny", note: "22:00–6:00", price: "+20%" },
        { name: "Zakupy i przesyłki", note: "dowieziemy za Ciebie", price: "od 30 zł" },
      ],
      note: "Inna trasa? Zadzwoń — wycenimy od ręki.",
    },
    {
      kind: "features",
      id: "uslugi",
      nav: "Usługi",
      eyebrow: "Usługi",
      title: "Nie tylko *kursy*",
      items: [
        { name: "Lotniska i dworce", note: "Odbierzemy z przylotu, także w nocy." },
        { name: "Kurier i zakupy", note: "Paczka, leki, zakupy — dowieziemy." },
        { name: "Wesela i imprezy", note: "Bezpieczny powrót dla gości." },
        { name: "Dla firm", note: "Rozliczenie miesięczne i faktury." },
      ],
    },
    { kind: "band", id: "zamow", style: "phone", title: "Potrzebujesz taxi? *Jeden telefon* wystarczy.", lead: "Podjedziemy pod wskazany adres.", button: PHONE },
    {
      kind: "faq",
      id: "faq",
      nav: "FAQ",
      eyebrow: "Pytania",
      title: "Często *pytacie*",
      items: [
        { q: "Czy mogę zapłacić kartą?", a: "Tak — kartą, BLIK-iem albo gotówką." },
        { q: "Czy wystawiacie faktury?", a: "Tak, fakturę dostaniesz od razu po kursie." },
        { q: "Czy mogę zamówić kurs z wyprzedzeniem?", a: "Tak, nawet kilka dni wcześniej — zadzwoń albo napisz SMS." },
        { q: "Czy przewozicie zwierzęta?", a: "Tak, po wcześniejszym zgłoszeniu." },
      ],
    },
    {
      kind: "reviews",
      id: "opinie",
      eyebrow: "Opinie",
      title: "Pasażerowie o *nas*",
      items: [
        "Przyjechał w kilka minut, czysto i kulturalnie.",
        "Kurs na lotnisko o czwartej rano — punktualnie co do minuty.",
        "Zawsze odbierają telefon. Najlepsza taksówka w mieście.",
      ],
    },
    { kind: "contact", id: "kontakt", nav: "Kontakt", eyebrow: "Kontakt", title: "Zamów *kurs*" },
  ],
  cta: { title: "Zamów taxi: *123 456 789*", lead: "Całą dobę, siedem dni w tygodniu.", button: "Zadzwoń teraz" },
  palettes: PALETTES.transport,
  variants: {
    laweta: {
      category: "Pomoc drogowa",
      art: "tow",
      hero: {
        eyebrow: (c) => `Pomoc drogowa 24/7${dot(c)}`,
        title: "Stoisz na drodze? *Jedziemy*.",
        lead: "Holowanie, transport aut i pomoc na miejscu. Przyjeżdżamy szybko — także w nocy i w święta.",
        badge: ["Dojazd", "nawet w 30 minut"],
      },
      sections: {
        cennik: {
          items: [
            { name: "Holowanie po mieście", note: "osobowe i dostawcze", price: "od 200 zł" },
            { name: "Dojazd poza miasto", note: "liczony od bazy", price: "od 4 zł/km" },
            { name: "Uruchomienie auta", note: "rozruch z kabli", price: "od 100 zł" },
            { name: "Wymiana koła", note: "na miejscu", price: "od 120 zł" },
            { name: "Transport lawetą", note: "w kraju i z zagranicy", price: "wycena" },
          ],
        },
        uslugi: {
          title: "Pomagamy *na miejscu*",
          items: [
            { name: "Holowanie", note: "Auta osobowe i dostawcze do 3,5 t." },
            { name: "Rozruch", note: "Rozładowany akumulator? Odpalimy." },
            { name: "Otwieranie aut", note: "Bez uszkodzeń zamka." },
            { name: "Transport aut", note: "Z giełd, z serwisu, z zagranicy." },
          ],
        },
        zamow: { title: "Awaria? *Jeden telefon* i jedziemy." },
      },
      cta: { title: "Pomoc drogowa: *123 456 789*" },
    },
    przewoz: {
      category: "Transport i przeprowadzki",
      art: "van",
      hero: {
        eyebrow: (c) => `Transport i przeprowadzki${dot(c)}`,
        title: "Przeprowadzka *bez stresu*.",
        lead: "Bus z kierowcą, pakowanie i wnoszenie. Mieszkania, biura i pojedyncze meble — w kraju i za granicą.",
        primary: "Zadzwoń po wycenę",
        secondary: "Cennik",
        badge: ["Wycena", "bezpłatna"],
      },
      sections: {
        cennik: {
          items: [
            { name: "Bus z kierowcą", note: "za godzinę", price: "od 120 zł" },
            { name: "Przeprowadzka kawalerki", note: "z wnoszeniem", price: "od 600 zł" },
            { name: "Przeprowadzka mieszkania M3", note: "z pakowaniem", price: "od 1200 zł" },
            { name: "Wnoszenie", note: "za każde piętro", price: "od 30 zł" },
            { name: "Trasy po Polsce", note: "bus do 3,5 t", price: "od 3,5 zł/km" },
          ],
        },
        uslugi: {
          title: "Zrobimy to *za Ciebie*",
          items: [
            { name: "Pakowanie", note: "Kartony, folia i zabezpieczenie mebli." },
            { name: "Demontaż i montaż", note: "Szafy, łóżka, kuchnie." },
            { name: "Meble z salonu", note: "Odbierzemy i wniesiemy." },
            { name: "Wywóz gratów", note: "Opróżnimy piwnicę i strych." },
          ],
        },
        zamow: { title: "Przeprowadzka? *Zadzwoń* po wycenę." },
        faq: {
          items: [
            { q: "Ile kosztuje przeprowadzka?", a: "Zależy od metrażu i pięter — wycenę podajemy za darmo, często od ręki." },
            { q: "Czy pomagacie przy pakowaniu?", a: "Tak, mamy kartony i materiały do zabezpieczenia." },
            { q: "Czy wystawiacie faktury?", a: "Tak, dla firm i osób prywatnych." },
            { q: "Czy jeździcie za granicę?", a: "Tak, po całej Unii Europejskiej." },
          ],
        },
      },
      cta: { title: "Wycena przeprowadzki: *123 456 789*" },
    },
  },
};

const ecommerce: Kit = {
  slug: "e-commerce",
  category: "Sklep ze świecami",
  art: "shop",
  navCta: "Koszyk",
  navIcon: "cart",
  announce: "Darmowa dostawa od 199 zł · Wysyłka w 24 godziny",
  hours: "Wysyłki: Pn–Pt do 14:00",
  hero: {
    layout: "shop",
    eyebrow: "Nowa kolekcja · jesień",
    title: "Ciepło, które *pachnie lasem*.",
    lead: "Ręcznie lane świece sojowe. Małe serie, naturalne zapachy i drewniane knoty, które trzaskają jak ognisko.",
    primary: "Kupuję",
    secondary: "Bestsellery",
    badge: ["Nowość", "Mech i cedr"],
  },
  sections: [
    {
      kind: "gallery",
      id: "sklep",
      nav: "Sklep",
      style: "products",
      eyebrow: "Bestsellery",
      title: "Najczęściej *wybierane*",
      chips: ["Wszystko", "Świece", "Dyfuzory", "Zestawy"],
      items: [
        { name: "Świeca Mech i Cedr", note: "200 g · do 45 h", price: "69 zł", badge: "Bestseller", thumb: { kind: "product", shape: "jar", tone: 0 } },
        { name: "Świeca Dym z Ogniska", note: "200 g · do 45 h", price: "69 zł", thumb: { kind: "product", shape: "jar", tone: 1 } },
        { name: "Świeca Kora i Wanilia", note: "120 g · do 30 h", price: "49 zł", badge: "Nowość", thumb: { kind: "product", shape: "jar-tall", tone: 2 } },
        { name: "Dyfuzor Leśny Poranek", note: "100 ml", price: "79 zł", thumb: { kind: "product", shape: "bottle", tone: 3 } },
        { name: "Zestaw prezentowy Trio", note: "3 × 120 g", price: "149 zł", old: "175 zł", badge: "−15%", thumb: { kind: "product", shape: "box", tone: 1 } },
        { name: "Zapas knotów", note: "10 sztuk", price: "19 zł", thumb: { kind: "product", shape: "tube", tone: 0 } },
      ],
    },
    { kind: "band", id: "usp", style: "usp", title: "", items: ["Wysyłka w 24 h", "Zwrot do 30 dni", "BLIK, karta, przelew", "Paczkomaty i kurier"] },
    {
      kind: "features",
      id: "o-nas",
      nav: "O nas",
      eyebrow: "O nas",
      title: "Małe serie, *wielkie zapachy*",
      lead: "Każdą świecę lejemy ręcznie w naszej pracowni. Wosk sojowy, bawełniane albo drewniane knoty, zero parafiny.",
      items: [
        { name: "Wosk sojowy", note: "Pali się czysto i dłużej niż parafina." },
        { name: "Lane ręcznie", note: "Partie po 40 sztuk, każda sprawdzona." },
        { name: "Opakowania eko", note: "Szkło do ponownego użycia, papier zamiast folii." },
      ],
    },
    {
      kind: "reviews",
      id: "opinie",
      eyebrow: "Opinie",
      title: "Klienci o *nas*",
      items: [
        "Mech i Cedr to absolutny hit — mam już trzecią.",
        "Paczka przyszła następnego dnia, pięknie zapakowana.",
        "Idealne na prezent. Świeca pali się równo do samego końca.",
      ],
    },
    { kind: "band", id: "newsletter", style: "newsletter", title: "−10% na *pierwsze* zamówienie", lead: "Raz w miesiącu nowości i rabaty. Zero spamu.", button: "Zapisuję się" },
  ],
  cta: { title: "Szukasz *prezentu*?", lead: "Napisz — dobierzemy zapach i zapakujemy na prezent.", button: "Napisz do nas" },
  palettes: PALETTES["e-commerce"],
  variants: {
    kawa: {
      category: "Palarnia kawy",
      art: "coffee",
      announce: "Kawa palona co tydzień · Darmowa dostawa od 149 zł",
      hero: {
        eyebrow: "Świeżo palona · ziarno i mielona",
        title: "Palona we wtorek, *u Ciebie* w czwartek.",
        lead: "Kawy speciality z małych plantacji. Palimy w małych partiach i wysyłamy w ciągu 48 godzin od wypalenia.",
        primary: "Wybieram kawę",
        secondary: "Subskrypcja",
        badge: ["Świeżość", "do 7 dni od palenia"],
      },
      sections: {
        sklep: {
          chips: ["Wszystko", "Espresso", "Przelew", "Akcesoria"],
          items: [
            { name: "Etiopia Yirgacheffe", note: "250 g · jaśmin, cytrusy", price: "54 zł", badge: "Bestseller", thumb: { kind: "product", shape: "bag", tone: 0 } },
            { name: "Brazylia Santos", note: "1 kg · czekolada, orzech", price: "119 zł", thumb: { kind: "product", shape: "bag", tone: 1 } },
            { name: "Kolumbia Huila", note: "250 g · karmel, wiśnia", price: "49 zł", badge: "Nowość", thumb: { kind: "product", shape: "bag", tone: 2 } },
            { name: "Espresso Blend", note: "1 kg · do ekspresu", price: "109 zł", thumb: { kind: "product", shape: "bag", tone: 3 } },
            { name: "Drip w saszetkach", note: "10 sztuk", price: "39 zł", old: "45 zł", badge: "−13%", thumb: { kind: "product", shape: "box", tone: 0 } },
            { name: "Młynek ręczny", note: "stalowe żarna", price: "189 zł", thumb: { kind: "product", shape: "grinder", tone: 1 } },
          ],
        },
        "o-nas": {
          title: "Kawa *bez kompromisów*",
          lead: "Kupujemy bezpośrednio od małych plantacji i palimy tylko tyle, ile wyślemy w tym tygodniu.",
          items: [
            { name: "Speciality", note: "Tylko ziarna z oceną powyżej 80 punktów." },
            { name: "Palone co tydzień", note: "Kawa nigdy nie leży w magazynie." },
            { name: "Dobierzemy mielenie", note: "Pod ekspres, drip albo kawiarkę." },
          ],
        },
        opinie: {
          items: [
            "Najlepsza Etiopia, jaką piłem. Zamawiam co miesiąc.",
            "Świeżość czuć od otwarcia paczki. Szybka wysyłka.",
            "Pomogli dobrać kawę do kawiarki — strzał w dziesiątkę.",
          ],
        },
        newsletter: { title: "−10% na *pierwszą* paczkę" },
      },
      cta: { title: "Nie wiesz, *którą wybrać*?", lead: "Napisz, jak parzysz kawę — dobierzemy ziarno.", button: "Napisz do nas" },
    },
    moda: {
      category: "Butik z odzieżą",
      art: "fashion",
      announce: "Darmowy zwrot do 30 dni · Wysyłka w 24 h",
      hero: {
        eyebrow: "Nowa kolekcja · jesień",
        title: "Ubrania na lata, *nie na sezon*.",
        lead: "Szyte w Polsce z bawełny organicznej i lnu. Proste kroje, które pasują do wszystkiego.",
        badge: ["Szyte", "w Polsce"],
      },
      sections: {
        sklep: {
          chips: ["Wszystko", "Bluzy", "Koszulki", "Dodatki"],
          items: [
            { name: "Bluza oversize", note: "bawełna organiczna", price: "189 zł", badge: "Bestseller", thumb: { kind: "product", shape: "hoodie", tone: 0 } },
            { name: "Koszulka lniana", note: "4 kolory", price: "119 zł", thumb: { kind: "product", shape: "tee", tone: 1 } },
            { name: "Sweter z alpaki", note: "ciepły i lekki", price: "349 zł", badge: "Nowość", thumb: { kind: "product", shape: "sweater", tone: 2 } },
            { name: "Spodnie szerokie", note: "len z bawełną", price: "229 zł", thumb: { kind: "product", shape: "pants", tone: 3 } },
            { name: "Czapka z merino", note: "jeden rozmiar", price: "89 zł", old: "109 zł", badge: "−20%", thumb: { kind: "product", shape: "cap", tone: 1 } },
            { name: "Torba bawełniana", note: "10 litrów", price: "59 zł", thumb: { kind: "product", shape: "tote", tone: 0 } },
          ],
        },
        "o-nas": {
          title: "Szyjemy *mniej, lepiej*",
          lead: "Krótkie serie z naturalnych tkanin, szyte w małej szwalni pod Białymstokiem.",
          items: [
            { name: "Naturalne tkaniny", note: "Bawełna organiczna, len, wełna." },
            { name: "Małe serie", note: "Zamiast wyprzedaży — przemyślane kolekcje." },
            { name: "Darmowy zwrot", note: "Nie pasuje? Odeślij w ciągu 30 dni." },
          ],
        },
        opinie: {
          items: [
            "Bluza po roku noszenia wygląda jak nowa.",
            "Rozmiarówka idealna, a paczka przyszła następnego dnia.",
            "Wreszcie ubrania, które się nie mechacą po trzecim praniu.",
          ],
        },
      },
    },
    kosmetyki: {
      category: "Naturalne kosmetyki",
      art: "cosmetics",
      hero: {
        eyebrow: "Kosmetyki naturalne · wegańskie",
        title: "Pielęgnacja, *której ufasz*.",
        lead: "Krótkie składy, bez zbędnej chemii i bez testów na zwierzętach. Robione w małej manufakturze.",
        badge: ["Skład", "krótki i czytelny"],
      },
      sections: {
        sklep: {
          chips: ["Wszystko", "Twarz", "Ciało", "Zestawy"],
          items: [
            { name: "Krem z ceramidami", note: "50 ml", price: "79 zł", badge: "Bestseller", thumb: { kind: "product", shape: "jar", tone: 0 } },
            { name: "Serum z witaminą C", note: "30 ml", price: "89 zł", thumb: { kind: "product", shape: "dropper", tone: 1 } },
            { name: "Mydło ręcznie robione", note: "110 g", price: "22 zł", thumb: { kind: "product", shape: "box", tone: 2 } },
            { name: "Olejek do ciała", note: "100 ml", price: "69 zł", badge: "Nowość", thumb: { kind: "product", shape: "bottle", tone: 3 } },
            { name: "Balsam do ust", note: "10 ml", price: "25 zł", thumb: { kind: "product", shape: "tube", tone: 1 } },
            { name: "Zestaw podróżny", note: "4 miniatury", price: "99 zł", old: "120 zł", badge: "−17%", thumb: { kind: "product", shape: "box", tone: 0 } },
          ],
        },
        "o-nas": {
          title: "Mniej składników, *więcej efektu*",
          lead: "Każdą recepturę testujemy miesiącami, zanim trafi do sklepu.",
          items: [
            { name: "Krótki skład", note: "Wiesz, co nakładasz na skórę." },
            { name: "Bez testów na zwierzętach", note: "Wszystkie produkty są wegańskie." },
            { name: "Manufaktura", note: "Robimy wszystko sami, w małych partiach." },
          ],
        },
        opinie: {
          items: [
            "Krem z ceramidami uratował moją suchą skórę zimą.",
            "Piękne opakowania i naprawdę naturalny zapach.",
            "Szybka wysyłka i gratis w paczce. Miło!",
          ],
        },
      },
    },
  },
};

const energetyka: Kit = {
  slug: "energetyka",
  category: "Fotowoltaika",
  art: "sun",
  navCta: "Darmowa wycena",
  hours: "Pn–Pt 8:00–17:00",
  hero: {
    layout: "claim",
    eyebrow: (c) => (c.city ? `Fotowoltaika · ${c.city} i okolice` : "Fotowoltaika i magazyny energii"),
    title: "Własny prąd. *Niższe* rachunki.",
    lead: "Dobierzemy instalację do Twojego dachu i zużycia. Montaż w jeden dzień, formalności po naszej stronie.",
    primary: "Policz oszczędność",
    secondary: "Realizacje",
    widget: { kind: "calc" },
  },
  sections: [
    {
      kind: "cards",
      id: "oferta",
      nav: "Oferta",
      eyebrow: "Oferta",
      title: "Energia *pod kontrolą*",
      items: [
        { name: "Fotowoltaika dla domu", note: "Instalacje 3–15 kWp dobrane do zużycia.", price: "montaż w 1 dzień" },
        { name: "Magazyny energii", note: "Zużywaj własny prąd także wieczorem." },
        { name: "Pompy ciepła", note: "Ogrzewanie, które dobrze pracuje z PV." },
        { name: "Instalacje dla firm", note: "Dachy hal, gospodarstwa, grunty." },
        { name: "Serwis i przeglądy", note: "Mycie paneli, pomiary, termowizja." },
        { name: "Monitoring", note: "Produkcja i zużycie w aplikacji." },
      ],
    },
    { kind: "calc", id: "kalkulator", nav: "Kalkulator", eyebrow: "Kalkulator", title: "Ile możesz *zaoszczędzić*?", lead: "Przesuń suwak — to szybki szacunek. Dokładną wycenę przygotujemy po audycie dachu." },
    {
      kind: "steps",
      id: "proces",
      eyebrow: "Jak to działa",
      title: "Od audytu *do prądu*",
      items: [
        { name: "Audyt dachu", note: "Bezpłatnie, z pomiarem i zdjęciami." },
        { name: "Projekt i dotacje", note: "Dobór mocy i pomoc przy wniosku." },
        { name: "Montaż", note: "Zwykle jeden dzień, bez bałaganu." },
        { name: "Zgłoszenie", note: "Formalności z operatorem sieci po naszej stronie." },
      ],
    },
    {
      kind: "gallery",
      id: "realizacje",
      nav: "Realizacje",
      style: "projects",
      eyebrow: "Realizacje",
      title: "Ostatnie *instalacje*",
      items: [
        { name: "Dom jednorodzinny", meta: ["6,4 kWp", "16 paneli"], thumb: { kind: "pattern", pattern: "panels" } },
        { name: "Gospodarstwo rolne", meta: ["15 kWp", "dach obory"], thumb: { kind: "pattern", pattern: "roof" } },
        { name: "Hala produkcyjna", meta: ["49,5 kWp", "magazyn energii"], thumb: { kind: "pattern", pattern: "panels" } },
      ],
    },
    {
      kind: "faq",
      id: "faq",
      eyebrow: "Pytania",
      title: "Zanim *zapytasz*",
      items: [
        { q: "Ile kosztuje instalacja?", a: "Zależy od mocy i dachu — po audycie dostajesz wycenę z dokładną kwotą." },
        { q: "Czy mój dach się nada?", a: "Sprawdzimy kierunek, kąt i zacienienie. Większość dachów się nadaje." },
        { q: "Co z dotacjami?", a: "Sprawdzimy aktualne programy i pomożemy złożyć wniosek." },
        { q: "Ile trwa montaż?", a: "Zwykle jeden dzień. Zgłoszenie do sieci załatwiamy za Ciebie." },
      ],
    },
    { kind: "contact", id: "kontakt", nav: "Kontakt", eyebrow: "Kontakt", title: "Umów *bezpłatny audyt*" },
  ],
  cta: { title: "Sprawdź, ile *zaoszczędzisz*.", lead: "Bezpłatny audyt dachu i wycena bez zobowiązań.", button: `Zadzwoń: ${PHONE}` },
  palettes: PALETTES.energetyka,
  variants: {
    pompa: {
      category: "Pompy ciepła i klimatyzacja",
      art: "heatpump",
      hero: {
        eyebrow: (c) => `Pompy ciepła i klimatyzacja${dot(c)}`,
        title: "Ciepło w domu, *mniej* za ogrzewanie.",
        lead: "Dobór, montaż i serwis pomp ciepła oraz klimatyzacji. Pomożemy z dotacją i wymianą starego pieca.",
        primary: "Bezpłatna wycena",
        secondary: "Realizacje",
        badge: ["Przegląd", "co roku w cenie"],
        widget: { kind: "badges", items: ["Dobór mocy", "Pomoc z dotacją", "Serwis 24/7"] },
      },
      sections: {
        oferta: {
          title: "Ciepło *i chłód*",
          items: [
            { name: "Pompy powietrze–woda", note: "Do domów nowych i modernizowanych." },
            { name: "Klimatyzacja", note: "Chłodzenie latem, dogrzewanie zimą." },
            { name: "Wymiana pieca", note: "Demontaż starego kotła i formalności." },
            { name: "Serwis i przeglądy", note: "Coroczna kontrola i czyszczenie." },
            { name: "Ogrzewanie podłogowe", note: "Projekt i wykonanie." },
            { name: "Współpraca z PV", note: "Taniej, gdy masz własny prąd." },
          ],
        },
        kalkulator: null,
        realizacje: {
          title: "Ostatnie *montaże*",
          items: [
            { name: "Dom 160 m²", meta: ["pompa 9 kW", "podłogówka"], thumb: { kind: "pattern", pattern: "bricks" } },
            { name: "Klimatyzacja w biurze", meta: ["4 jednostki"], thumb: { kind: "pattern", pattern: "tiles" } },
            { name: "Wymiana pieca", meta: ["pompa 12 kW", "dotacja"], thumb: { kind: "pattern", pattern: "planks" } },
          ],
        },
      },
      cta: { title: "Sprawdź, ile *zaoszczędzisz* na ogrzewaniu." },
    },
  },
};

const uslugi: Kit = {
  slug: "uslugi",
  category: "Salon fryzjerski",
  art: "scissors",
  navCta: "Umów wizytę",
  hours: "Pn–Pt 9:00–19:00, Sb 9:00–14:00",
  hero: {
    layout: "split",
    eyebrow: (c) => `Salon fryzjerski${dot(c)}`,
    lead: "Strzyżenie, koloryzacja i pielęgnacja. Umów się online — bez dzwonienia i czekania.",
    primary: "Umów wizytę",
    secondary: "Cennik",
    badge: ["Koloryzacja", "z konsultacją"],
    widget: { kind: "slots", label: "Wolne terminy dziś", slots: ["11:30", "13:00", "15:45", "17:30"] },
  },
  sections: [
    {
      kind: "pricelist",
      id: "cennik",
      nav: "Cennik",
      eyebrow: "Cennik",
      title: "Ceny *bez gwiazdek*",
      groups: [
        { name: "Damskie", items: [{ name: "Strzyżenie z modelowaniem", price: "od 90 zł" }, { name: "Koloryzacja", price: "od 180 zł" }, { name: "Balayage i refleksy", price: "od 280 zł" }, { name: "Upięcie okolicznościowe", price: "od 150 zł" }] },
        { name: "Męskie", items: [{ name: "Strzyżenie", price: "60 zł" }, { name: "Strzyżenie i broda", price: "90 zł" }] },
        { name: "Pielęgnacja", items: [{ name: "Keratynowe prostowanie", price: "od 300 zł" }, { name: "Rytuał regenerujący", price: "120 zł" }] },
      ],
      note: "Cena zależy od długości i gęstości włosów — dokładną podamy przed usługą.",
    },
    {
      kind: "steps",
      id: "jak",
      nav: "Rezerwacja",
      eyebrow: "Rezerwacja",
      title: "Umówisz się *w minutę*",
      items: [
        { name: "Wybierz usługę", note: "Z cennikiem przed oczami, bez niespodzianek." },
        { name: "Wybierz termin", note: "Widzisz wolne godziny na bieżąco." },
        { name: "Potwierdzenie SMS", note: "Przypomnimy dzień przed wizytą." },
      ],
    },
    {
      kind: "hours",
      id: "godziny",
      eyebrow: "Godziny otwarcia",
      title: "Kiedy *jesteśmy*",
      rows: [["Poniedziałek–piątek", "9:00–19:00"], ["Sobota", "9:00–14:00"], ["Niedziela", "nieczynne"]],
      aside: (c) => `Adres: ${addr(c)}. Parking przed salonem.`,
    },
    {
      kind: "reviews",
      id: "opinie",
      eyebrow: "Opinie",
      title: "Klientki *polecają*",
      items: [
        "Pierwszy raz wyszłam z dokładnie taką fryzurą, jaką chciałam.",
        "Świetna atmosfera i kolor, który trzyma się tygodniami.",
        "Umówiłam się online w minutę. Polecam!",
      ],
    },
    { kind: "contact", id: "kontakt", nav: "Kontakt", eyebrow: "Kontakt", title: "Do zobaczenia *w salonie*" },
  ],
  cta: { title: "Czas na zmianę? *Umów się*.", lead: "Wolne terminy nawet na dziś — sprawdź online albo zadzwoń.", button: "Umów wizytę" },
  palettes: PALETTES.uslugi,
  variants: {
    barber: {
      category: "Barber shop",
      hero: {
        eyebrow: (c) => `Barber shop${dot(c)}`,
        lead: "Klasyczne cięcia, fade i broda na gorący ręcznik. Kawa w cenie wizyty.",
        badge: ["Broda", "na gorący ręcznik"],
      },
      sections: {
        cennik: {
          groups: [
            { name: "Włosy", items: [{ name: "Strzyżenie męskie", price: "70 zł" }, { name: "Skin fade", price: "80 zł" }, { name: "Strzyżenie dziecka", price: "50 zł" }] },
            { name: "Broda", items: [{ name: "Trymowanie brody", price: "50 zł" }, { name: "Golenie brzytwą", price: "70 zł" }] },
            { name: "Combo", items: [{ name: "Włosy i broda", price: "110 zł" }, { name: "Ojciec i syn", price: "110 zł" }] },
          ],
          note: "Rezerwacja online — bez czekania w kolejce.",
        },
        opinie: {
          title: "Klienci *polecają*",
          items: [
            "Najlepszy fade w mieście, zawsze na czas.",
            "Klimat, kawa i świetna robota. Wracam co trzy tygodnie.",
            "Umawiam się online w pół minuty. Konkret.",
          ],
        },
      },
    },
    ksiegowa: {
      category: "Biuro rachunkowe",
      art: "ledger",
      navCta: "Bezpłatna konsultacja",
      hours: "Pn–Pt 8:00–16:00",
      hero: {
        layout: "claim",
        eyebrow: (c) => `Biuro rachunkowe${dot(c)}`,
        title: "Księgowość, o której *nie myślisz*.",
        lead: "Pełna księgowość, KPiR, ryczałt i kadry. Dokumenty wysyłasz zdjęciem z telefonu — resztą zajmujemy się my.",
        primary: "Bezpłatna konsultacja",
        secondary: "Cennik",
        badge: ["Dokumenty", "zdjęciem z telefonu"],
        widget: { kind: "badges", items: ["Ubezpieczenie OC", "Dokumenty online", "Stały opiekun"] },
      },
      sections: {
        cennik: {
          title: "Cennik *miesięczny*",
          groups: [
            { name: "Działalność", items: [{ name: "Ryczałt (do 20 dokumentów)", price: "od 200 zł" }, { name: "KPiR (do 30 dokumentów)", price: "od 300 zł" }, { name: "Pełna księgowość", price: "od 900 zł" }] },
            { name: "Kadry i płace", items: [{ name: "Umowa o pracę (za osobę)", price: "od 50 zł" }, { name: "Umowa zlecenie (za osobę)", price: "od 30 zł" }] },
            { name: "Na start", items: [{ name: "Pomoc w założeniu firmy", price: "0 zł z umową" }, { name: "Konsultacja podatkowa", price: "od 150 zł" }] },
          ],
          note: "Cena zależy od liczby dokumentów — podamy ją po krótkiej rozmowie.",
        },
        jak: {
          nav: "Jak zacząć",
          eyebrow: "Jak zacząć",
          title: "Przejście do nas *w 3 krokach*",
          items: [
            { name: "Rozmowa", note: "Ustalamy zakres i cenę — bez zobowiązań." },
            { name: "Umowa online", note: "Pełnomocnictwa i umowa bez wychodzenia z domu." },
            { name: "Dokumenty", note: "Wysyłasz zdjęciem, my księgujemy i pilnujemy terminów." },
          ],
        },
        godziny: null,
        opinie: {
          title: "Klienci o *nas*",
          items: [
            "Od dwóch lat zero stresu z ZUS-em i urzędem skarbowym.",
            "Szybkie odpowiedzi i konkretne porady podatkowe.",
            "Wszystko online — dokumenty wysyłam prosto z telefonu.",
          ],
        },
        kontakt: { title: "Porozmawiajmy o *Twojej firmie*" },
      },
      cta: { title: "Zmień księgową *bez stresu*.", lead: "Przejmiemy dokumenty od poprzedniego biura i wszystkiego dopilnujemy.", button: "Umów konsultację" },
    },
    fachowiec: {
      category: "Hydraulik i elektryk",
      art: "wrench",
      navCta: PHONE,
      navIcon: "phone",
      hours: "Pn–Sb 7:00–20:00, awarie całą dobę",
      hero: {
        layout: "claim",
        eyebrow: (c) => `Hydraulika i elektryka${dot(c)}`,
        title: "Cieknie? Iskrzy? *Przyjedziemy*.",
        lead: "Hydraulika, elektryka i drobne naprawy w domu. Uczciwa wycena przed pracą i porządek po robocie.",
        primary: "Zadzwoń teraz",
        secondary: "Cennik",
        badge: ["Awarie", "całą dobę"],
        widget: { kind: "phone" },
      },
      sections: {
        cennik: {
          title: "Orientacyjny *cennik*",
          groups: [
            { name: "Hydraulika", items: [{ name: "Wymiana baterii", price: "od 120 zł" }, { name: "Udrażnianie odpływu", price: "od 150 zł" }, { name: "Montaż WC lub umywalki", price: "od 200 zł" }] },
            { name: "Elektryka", items: [{ name: "Gniazdko lub włącznik", price: "od 60 zł" }, { name: "Podłączenie płyty indukcyjnej", price: "od 150 zł" }, { name: "Wymiana zabezpieczeń", price: "od 120 zł" }] },
            { name: "Dojazd", items: [{ name: "Dojazd i diagnoza", price: "od 80 zł" }, { name: "Nocą i w święta", price: "+50%" }] },
          ],
          note: "Cenę podajemy przed rozpoczęciem pracy.",
        },
        jak: {
          nav: "Jak działamy",
          eyebrow: "Jak działamy",
          title: "Szybko i *po kolei*",
          items: [
            { name: "Telefon lub SMS", note: "Opisz problem, wyślij zdjęcie." },
            { name: "Przyjazd", note: "Zwykle jeszcze tego samego dnia." },
            { name: "Naprawa z gwarancją", note: "Cena znana przed pracą, porządek po." },
          ],
        },
        godziny: null,
        opinie: {
          title: "Klienci *polecają*",
          items: [
            "Przyjechał w godzinę od telefonu i usunął awarię.",
            "Cena taka, jak ustaliliśmy przez telefon. Polecam.",
            "Posprzątał po sobie, a wszystko działa jak należy.",
          ],
        },
      },
      cta: { title: "Awaria? *Zadzwoń* teraz.", lead: "Przyjedziemy szybko — także wieczorem i w weekend.", button: `Zadzwoń: ${PHONE}` },
    },
    sprzatanie: {
      category: "Sprzątanie domów i biur",
      art: "sparkle",
      navCta: "Wycena",
      hours: "Pn–Sb 7:00–19:00",
      hero: {
        layout: "claim",
        eyebrow: (c) => `Sprzątanie domów i biur${dot(c)}`,
        title: "Czysto, *zanim wrócisz*.",
        lead: "Sprzątanie mieszkań, biur i po remontach. Własne środki, sprawdzony zespół i stałe terminy.",
        primary: "Wyceń sprzątanie",
        secondary: "Cennik",
        badge: ["Środki", "zawsze nasze"],
        widget: { kind: "badges", items: ["Własne środki", "Ubezpieczenie OC", "Stałe terminy"] },
      },
      sections: {
        cennik: {
          groups: [
            { name: "Mieszkania", items: [{ name: "Do 50 m²", price: "od 200 zł" }, { name: "Do 80 m²", price: "od 280 zł" }, { name: "Mycie okien", price: "od 15 zł / okno" }] },
            { name: "Specjalne", items: [{ name: "Po remoncie", price: "od 7 zł/m²" }, { name: "Pranie tapicerki", price: "od 100 zł" }] },
            { name: "Firmy", items: [{ name: "Biura", price: "wycena" }, { name: "Klatki schodowe", price: "abonament" }] },
          ],
          note: "Stałym klientom dajemy 10% rabatu.",
        },
        jak: {
          nav: "Jak to działa",
          eyebrow: "Jak to działa",
          title: "Czysto *w 3 krokach*",
          items: [
            { name: "Wycena", note: "Podaj metraż — cenę dostaniesz od ręki." },
            { name: "Termin", note: "Jednorazowo albo co tydzień." },
            { name: "Sprzątamy", note: "Ty wracasz do czystego domu." },
          ],
        },
        opinie: {
          title: "Klienci o *nas*",
          items: [
            "Mieszkanie po remoncie lśni. Ogromna różnica.",
            "Sprzątają u nas co tydzień — zawsze dokładnie i punktualnie.",
            "Okna umyte bez smug, a ekipa bardzo miła.",
          ],
        },
      },
      cta: { title: "Odzyskaj *weekend*.", lead: "Wycena od ręki — wystarczy metraż i adres.", button: "Wyceń sprzątanie" },
    },
  },
};

export const kits: Record<IndustrySlug, Kit> = {
  restauracje,
  budowlanka,
  motoryzacja,
  gabinety,
  hotele,
  transport,
  "e-commerce": ecommerce,
  energetyka,
  uslugi,
};

export function resolveKit(slug: IndustrySlug, variant: string | null): Kit {
  const kit = kits[slug];
  const v = variant ? kit.variants[variant] : undefined;
  if (!v) return kit;

  let sections: Section[] = [...kit.sections, ...(v.add ?? [])].flatMap((s) => {
    const patch = v.sections?.[s.id];
    if (patch === null) return [];
    return [patch ? ({ ...s, ...patch } as Section) : s];
  });
  if (v.order) {
    const rank = (id: string) => {
      const i = v.order!.indexOf(id);
      return i === -1 ? Number.MAX_SAFE_INTEGER : i;
    };
    sections = [...sections].sort((a, b) => rank(a.id) - rank(b.id));
  }

  return {
    ...kit,
    category: v.category ?? kit.category,
    art: v.art ?? kit.art,
    navCta: v.navCta ?? kit.navCta,
    navIcon: "navIcon" in v ? v.navIcon : kit.navIcon,
    announce: v.announce ?? kit.announce,
    hours: v.hours ?? kit.hours,
    hero: { ...kit.hero, ...v.hero },
    sections,
    cta: { ...kit.cta, ...v.cta },
  };
}

export const LOCATIVE: Record<string, string> = {
  bialystok: "w Białymstoku", sokolka: "w Sokółce", wyszkow: "w Wyszkowie", warszawa: "w Warszawie",
  suwalki: "w Suwałkach", augustow: "w Augustowie", krakow: "w Krakowie", lodz: "w Łodzi",
  wroclaw: "we Wrocławiu", poznan: "w Poznaniu", gdansk: "w Gdańsku", szczecin: "w Szczecinie",
  bydgoszcz: "w Bydgoszczy", lublin: "w Lublinie", katowice: "w Katowicach", gdynia: "w Gdyni",
  sopot: "w Sopocie", czestochowa: "w Częstochowie", radom: "w Radomiu", torun: "w Toruniu",
  sosnowiec: "w Sosnowcu", rzeszow: "w Rzeszowie", kielce: "w Kielcach", gliwice: "w Gliwicach",
  olsztyn: "w Olsztynie", zabrze: "w Zabrzu", "bielsko-biala": "w Bielsku-Białej", bytom: "w Bytomiu",
  "zielona gora": "w Zielonej Górze", rybnik: "w Rybniku", opole: "w Opolu", tychy: "w Tychach",
  "gorzow wielkopolski": "w Gorzowie Wielkopolskim", elblag: "w Elblągu", plock: "w Płocku",
  walbrzych: "w Wałbrzychu", wloclawek: "we Włocławku", tarnow: "w Tarnowie", chorzow: "w Chorzowie",
  koszalin: "w Koszalinie", kalisz: "w Kaliszu", legnica: "w Legnicy", grudziadz: "w Grudziądzu",
  slupsk: "w Słupsku", "nowy sacz": "w Nowym Sączu", "jelenia gora": "w Jeleniej Górze",
  siedlce: "w Siedlcach", konin: "w Koninie", pila: "w Pile", lomza: "w Łomży", elk: "w Ełku",
  ostroleka: "w Ostrołęce", zamosc: "w Zamościu", chelm: "w Chełmie", przemysl: "w Przemyślu",
  "biala podlaska": "w Białej Podlaskiej", pulawy: "w Puławach", mielec: "w Mielcu", leszno: "w Lesznie",
  gniezno: "w Gnieźnie", inowroclaw: "w Inowrocławiu", tczew: "w Tczewie", zakopane: "w Zakopanem",
  hajnowka: "w Hajnówce", "bielsk podlaski": "w Bielsku Podlaskim", grajewo: "w Grajewie",
  zambrow: "w Zambrowie", monki: "w Mońkach", siemiatycze: "w Siemiatyczach", kolno: "w Kolnie",
  sejny: "w Sejnach", wasilkow: "w Wasilkowie", lapy: "w Łapach", choroszcz: "w Choroszczy",
  suprasl: "w Supraślu", "dabrowa bialostocka": "w Dąbrowie Białostockiej",
  "czarna bialostocka": "w Czarnej Białostockiej", bransk: "w Brańsku",
  "wysokie mazowieckie": "w Wysokiem Mazowieckiem", pruszkow: "w Pruszkowie", legionowo: "w Legionowie",
  piaseczno: "w Piasecznie", otwock: "w Otwocku", "minsk mazowiecki": "w Mińsku Mazowieckim",
  wolomin: "w Wołominie", "ostrow mazowiecka": "w Ostrowi Mazowieckiej", pultusk: "w Pułtusku",
  ciechanow: "w Ciechanowie", mlawa: "w Mławie", radzymin: "w Radzyminie", marki: "w Markach",
  zabki: "w Ząbkach", gizycko: "w Giżycku", mragowo: "w Mrągowie", olecko: "w Olecku",
  goldap: "w Gołdapi", pisz: "w Piszu", szczytno: "w Szczytnie", ilawa: "w Iławie",
  ostroda: "w Ostródzie", malbork: "w Malborku", wejherowo: "w Wejherowie", rumia: "w Rumi",
  kartuzy: "w Kartuzach", "starogard gdanski": "w Starogardzie Gdańskim", kwidzyn: "w Kwidzynie",
  swinoujscie: "w Świnoujściu", kolobrzeg: "w Kołobrzegu", stargard: "w Stargardzie",
  glogow: "w Głogowie", lubin: "w Lubinie", boleslawiec: "w Bolesławcu", swidnica: "w Świdnicy",
  klodzko: "w Kłodzku", nysa: "w Nysie", raciborz: "w Raciborzu", jaworzno: "w Jaworznie",
  zory: "w Żorach", cieszyn: "w Cieszynie", zywiec: "w Żywcu", oswiecim: "w Oświęcimiu",
  wadowice: "w Wadowicach", "nowy targ": "w Nowym Targu", bochnia: "w Bochni", krosno: "w Krośnie",
  sanok: "w Sanoku", jaslo: "w Jaśle", debica: "w Dębicy", "stalowa wola": "w Stalowej Woli",
  tarnobrzeg: "w Tarnobrzegu", sandomierz: "w Sandomierzu", "ostrowiec swietokrzyski": "w Ostrowcu Świętokrzyskim",
  starachowice: "w Starachowicach", "piotrkow trybunalski": "w Piotrkowie Trybunalskim",
  belchatow: "w Bełchatowie", pabianice: "w Pabianicach", zgierz: "w Zgierzu", skierniewice: "w Skierniewicach",
  "tomaszow mazowiecki": "w Tomaszowie Mazowieckim", sieradz: "w Sieradzu", kutno: "w Kutnie",
  "ostrow wielkopolski": "w Ostrowie Wielkopolskim", wrzesnia: "we Wrześni", szczecinek: "w Szczecinku",
  "gorzow": "w Gorzowie", "zielonka": "w Zielonce", "konstancin-jeziorna": "w Konstancinie-Jeziornie",
};
