export type Locale = "pl" | "en";

export const LOCALES: readonly Locale[] = ["pl", "en"];
export const DEFAULT_LOCALE: Locale = "pl";

export const LOCALE_PREF_KEY = "bs-lang";

const SECTIONS: Record<string, string> = {
  "/oferta": "/en/services",
  "/realizacje": "/en/work",
  "/cennik": "/en/pricing",
  "/kontakt": "/en/contact",
  "/wycena": "/en/quote",
  "/audyt": "/en/audit",
  "/twoja-strona": "/en/your-site",
  "/polityka-prywatnosci": "/en/privacy-policy",
  "/mapa-strony": "/en/site-map",
};

const SERVICE_SLUGS: Record<string, string> = {
  "landing-page": "landing-page",
  "strona-firmowa": "business-website",
  "sklep-internetowy": "online-store",
  "redesign-strony": "website-redesign",
  "pozycjonowanie-seo": "local-seo",
  "aplikacje-ai": "ai-apps",
};

const invert = (o: Record<string, string>) => Object.fromEntries(Object.entries(o).map(([k, v]) => [v, k]));
const SECTIONS_PL = invert(SECTIONS);
const SERVICE_SLUGS_PL = invert(SERVICE_SLUGS);

export const enServiceSlug = (plSlug: string) => SERVICE_SLUGS[plSlug] ?? plSlug;
export const plServiceSlug = (enSlug: string) => SERVICE_SLUGS_PL[enSlug] ?? enSlug;

export const localeOf = (pathname: string): Locale => (pathname === "/en" || pathname.startsWith("/en/") ? "en" : "pl");

const splitHref = (href: string) => {
  const i = href.search(/[?#]/);
  return i === -1 ? [href, ""] : [href.slice(0, i), href.slice(i)];
};

function toEn(path: string): string | null {
  if (path === "/") return "/en";
  const [, section, slug, ...rest] = path.split("/");
  const en = SECTIONS[`/${section}`];
  if (!en || rest.length) return null;
  if (!slug) return en;
  if (section === "oferta") return `${en}/${enServiceSlug(slug)}`;
  if (section === "realizacje") return `${en}/${slug}`;
  return null;
}

function toPl(path: string): string {
  if (path === "/en") return "/";
  const [, , section, slug] = path.split("/");
  const pl = SECTIONS_PL[`/en/${section}`];
  if (!pl) return "/";
  if (!slug) return pl;
  return section === "services" ? `${pl}/${plServiceSlug(slug)}` : `${pl}/${slug}`;
}

export function localizeHref(href: string, locale: Locale): string {
  if (locale === "pl" || !href.startsWith("/") || href.startsWith("/en") || href.startsWith("/api")) return href;
  const [path, tail] = splitHref(href);
  const en = toEn(path);
  return en ? en + tail : href;
}

export function counterpart(pathname: string, target: Locale): string {
  if (localeOf(pathname) === target) return pathname;
  return target === "en" ? (toEn(pathname) ?? "/en") : toPl(pathname);
}

export const hasEnglish = (plPath: string) => toEn(plPath) !== null;
