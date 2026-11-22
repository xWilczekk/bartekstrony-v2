export const site = {
  name: "bartekstrony.pl",
  url: "https://bartekstrony.pl",
  owner: "Bartek",
  fullName: "Bartłomiej Kulesz",
  aboutPath: "/bartlomiej-kulesz",
  legalName: "Bartłomiej Kulesz",
  role: "Web developer · strony i sklepy internetowe",
  locale: "pl_PL",
  email: "kontakt@bartekstrony.pl",
  phone: "+48 509 973 600",
  phoneHref: "tel:+48509973600",
  description:
    "Strony internetowe i sklepy dla firm, które mają przynosić klientów — nie tylko ładnie wyglądać. Szybkie, widoczne w Google, gotowe nawet w 3 dni. Wycena w 24h.",
  baseRegion: "Podlasie",
  serviceArea: "Cała Polska (zdalnie) · lokalnie Białystok, Sokółka i okolice",
  socials: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/bartlomiejkulesz" }] as { label: string; href: string }[],
} as const;

export const nav = [
  { label: "Realizacje", href: "/realizacje" },
  { label: "Oferta", href: "/oferta" },
  { label: "Cennik", href: "/cennik" },
  { label: "Darmowy audyt", href: "/audyt" },
  { label: "Blog", href: "/blog" },
] as const;

export const siteEn = {
  role: "Web developer · websites and online stores",
  description:
    "Websites and online stores for businesses that need to bring in customers, not just look good. Fast, visible on Google, ready in as little as 3 days. Free quote within 24h.",
  serviceArea: "All of Poland (remotely) · locally Białystok, Sokółka and the area",
} as const;

export const navEn = [
  { label: "Work", href: "/realizacje" },
  { label: "Services", href: "/oferta" },
  { label: "Pricing", href: "/cennik" },
  { label: "Free audit", href: "/audyt" },
] as const;

export const heroStats = [
  { value: "20", suffix: "+", label: "zrealizowanych projektów" },
  { value: "24", suffix: "h", label: "na bezpłatną wycenę" },
  { value: "5", suffix: "+", label: "lat doświadczenia" },
] as const;

export const stats = [
  { value: "5 dni", label: "typowy czas na landing page" },
  { value: "24h", label: "na bezpłatną wycenę" },
  { value: "30 dni", label: "wsparcia technicznego po starcie" },
] as const;

export const heroStatsEn = [
  { value: "20", suffix: "+", label: "projects delivered" },
  { value: "24", suffix: "h", label: "for a free quote" },
  { value: "5", suffix: "+", label: "years of experience" },
] as const;

export const statsEn = [
  { value: "5 days", label: "typical time for a landing page" },
  { value: "24h", label: "for a free quote" },
  { value: "30 days", label: "of technical support after launch" },
] as const;

export type LeadSource =
  | "hero"
  | "podglad"
  | "wycena"
  | "audyt"
  | "cennik"
  | "oferta"
  | "branza"
  | "miasto"
  | "realizacja"
  | "blog"
  | "faq"
  | "proces"
  | "o-mnie"
  | "footer";
