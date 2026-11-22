import { posts } from "@/content/blog/posts";
import { cities } from "@/content/cities";
import { industries, industryNamesEn } from "@/content/industries";
import { projects, projectsFor } from "@/content/projects";
import { services, servicesFor } from "@/content/services";
import { site } from "@/content/site";
import { counterpart, hasEnglish, type Locale } from "@/i18n/config";

const SITE_UPDATED = new Date("2026-11-10");

type ChangeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

export type SitemapEntry = {
  url: string;
  lastModified: Date;
  changeFrequency: ChangeFrequency;
  priority: number;
  languages?: Record<string, string>;
  noindex?: boolean;
};

const abs = (path: string) => new URL(path, site.url).toString();

const entry = (path: string, priority: number, changeFrequency: ChangeFrequency, lastModified = SITE_UPDATED): SitemapEntry => ({
  url: abs(path),
  lastModified,
  changeFrequency,
  priority,
  ...(hasEnglish(path) ? { languages: { "pl-PL": abs(path), en: abs(counterpart(path, "en")), "x-default": abs(path) } } : {}),
});

const enEntry = (e: SitemapEntry): SitemapEntry => ({
  ...e,
  url: abs(counterpart(new URL(e.url).pathname, "en")),
  priority: Math.round((e.priority - 0.1) * 10) / 10,
});

export function sitemapEntries(): SitemapEntry[] {
  const pl: SitemapEntry[] = [
    entry("/", 1, "weekly"),

    entry("/oferta", 0.9, "monthly"),
    ...services.map((s) => entry(`/oferta/${s.slug}`, 0.8, "monthly")),

    entry("/branze", 0.8, "monthly"),
    ...industries.map((i) => entry(`/branze/${i.slug}`, 0.7, "monthly")),

    entry("/strony-internetowe", 0.8, "monthly"),
    ...cities.map((c) => entry(`/strony-internetowe/${c.slug}`, 0.7, "monthly")),

    entry("/realizacje", 0.8, "monthly"),
    ...projects.map((p) => ({ ...entry(`/realizacje/${p.slug}`, 0.6, "yearly"), noindex: true })),

    entry("/blog", 0.7, "weekly", new Date(posts[0]?.updated ?? posts[0]?.date ?? SITE_UPDATED)),
    ...posts.map((p) => entry(`/blog/${p.slug}`, 0.7, "yearly", new Date(p.updated ?? p.date))),

    entry("/cennik", 0.8, "monthly"),
    entry("/wycena", 0.8, "monthly"),
    entry("/audyt", 0.8, "monthly"),
    entry("/kontakt", 0.7, "yearly"),
    entry("/bartlomiej-kulesz", 0.6, "monthly"),
    entry("/polityka-prywatnosci", 0.2, "yearly"),
    entry("/mapa-strony", 0.3, "monthly"),
  ];
  return [...pl, ...pl.filter((e) => e.languages).map(enEntry)];
}

export type SitemapLink = { href: string; label: string; path: string; other?: string };
export type SitemapGroup = { id: string; title: string; links: SitemapLink[] };

const MAIN: Record<Locale, Record<string, string>> = {
  pl: {
    "/": "Strona główna",
    "/oferta": "Oferta — wszystkie usługi",
    "/branze": "Branże — przegląd",
    "/strony-internetowe": "Strony internetowe — miasta",
    "/realizacje": "Realizacje — portfolio",
    "/blog": "Blog — wszystkie wpisy",
    "/cennik": "Cennik",
    "/wycena": "Wycena — kalkulator",
    "/audyt": "Darmowy audyt strony",
    "/kontakt": "Kontakt",
    "/bartlomiej-kulesz": "O mnie — Bartłomiej Kulesz",
    "/polityka-prywatnosci": "Polityka prywatności",
    "/mapa-strony": "Mapa strony",
  },
  en: {
    "/": "Home",
    "/oferta": "Services",
    "/realizacje": "Work — portfolio",
    "/cennik": "Pricing",
    "/wycena": "Quote calculator",
    "/audyt": "Free website audit",
    "/kontakt": "Contact",
    "/polityka-prywatnosci": "Privacy policy",
    "/mapa-strony": "Site map",
  },
};

const GROUPS: Record<Locale, [id: string, title: string][]> = {
  pl: [
    ["glowne", "Najważniejsze"],
    ["oferta", "Oferta"],
    ["realizacje", "Realizacje"],
    ["branze", "Branże"],
    ["miasta", "Miasta"],
    ["blog", "Blog"],
  ],
  en: [
    ["glowne", "Main pages"],
    ["oferta", "Services"],
    ["realizacje", "Work"],
  ],
};

const SECTION_GROUP: Record<string, string> = {
  oferta: "oferta",
  realizacje: "realizacje",
  branze: "branze",
  "strony-internetowe": "miasta",
  blog: "blog",
};

function pageName(plPath: string, locale: Locale): string {
  const [, section, slug] = plPath.split("/");
  if (!slug) return MAIN[locale][plPath] ?? MAIN.pl[plPath] ?? plPath;
  if (section === "oferta") return servicesFor(locale).find((s) => s.slug === slug)?.name ?? slug;
  if (section === "branze") {
    const i = industries.find((x) => x.slug === slug);
    return i ? (locale === "en" ? industryNamesEn[i.slug] : i.name) : slug;
  }
  if (section === "strony-internetowe") return cities.find((c) => c.slug === slug)?.name ?? slug;
  if (section === "realizacje") return projectsFor(locale).find((p) => p.slug === slug)?.title ?? slug;
  if (section === "blog") return posts.find((p) => p.slug === slug)?.title ?? slug;
  return slug;
}

export function sitemapGroups(locale: Locale): SitemapGroup[] {
  const groups = GROUPS[locale].map(([id, title]) => ({ id, title, links: [] as SitemapLink[] }));
  const byId = Object.fromEntries(groups.map((g) => [g.id, g]));

  for (const e of sitemapEntries()) {
    const plUrl = e.languages?.["pl-PL"] ?? e.url;
    const isEn = e.languages?.en === e.url;
    if ((locale === "en") !== isEn) continue;
    const plPath = new URL(plUrl).pathname;
    const [, section, slug] = plPath.split("/");
    const group = byId[slug ? (SECTION_GROUP[section] ?? "glowne") : "glowne"] ?? byId.glowne;
    const path = new URL(e.url).pathname;
    group.links.push({
      href: path,
      label: pageName(plPath, locale),
      path,
      other: e.languages ? new URL(isEn ? e.languages["pl-PL"] : e.languages.en).pathname : undefined,
    });
  }
  return groups.filter((g) => g.links.length);
}
