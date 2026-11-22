import type { Metadata } from "next";
import type { BreadcrumbList, FAQPage, Graph, Thing, WithContext } from "schema-dts";
import { site, siteEn } from "@/content/site";
import { cities } from "@/content/cities";
import { servicesFor } from "@/content/services";
import { counterpart, hasEnglish, localeOf, localizeHref, type Locale } from "@/i18n/config";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  ogImage?: string | false;
  noindex?: boolean;
};

const OG_LOCALE: Record<Locale, string> = { pl: site.locale, en: "en_US" };
const OG_ALT: Record<Locale, string> = {
  pl: "bartekstrony.pl — strony internetowe i sklepy, które przynoszą klientów",
  en: "bartekstrony.pl — websites and online stores that bring in customers",
};

export const defaultOgImage = (locale: Locale) => ({
  url: `/share/bartekstrony-${locale}-v2.jpg`,
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: OG_ALT[locale],
});

function languages(path: string) {
  const pl = localeOf(path) === "pl" ? path : counterpart(path, "pl");
  if (!hasEnglish(pl)) return undefined;
  return { "pl-PL": absoluteUrl(pl), en: absoluteUrl(counterpart(pl, "en")), "x-default": absoluteUrl(pl) };
}

export function pageMeta({ title, description, path, ogImage, noindex }: PageMeta): Metadata {
  const url = new URL(path, site.url).toString();
  const locale = localeOf(path);
  const images =
    ogImage === false
      ? undefined
      : [ogImage ? { url: ogImage, width: 1200, height: 630, alt: OG_ALT[locale] } : defaultOgImage(locale)];
  return {
    title,
    description,
    alternates: { canonical: url, languages: languages(path) },
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale],
      ...(languages(path) ? { alternateLocale: OG_LOCALE[locale === "pl" ? "en" : "pl"] } : {}),
      siteName: site.name,
      url,
      title,
      description,
      ...(images ? { images } : {}),
    },
    twitter: { card: "summary_large_image", title, description, ...(images ? { images } : {}) },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

export const absoluteUrl = (path: string) => new URL(path, site.url).toString();

export function breadcrumbs(items: { name: string; path: string }[]): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function faqSchema(faq: { q: string; a: string }[]): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function rootGraph(locale: Locale = "pl"): Graph {
  const en = locale === "en";
  const PERSON_ID = `${site.url}/#person`;
  const BUSINESS_ID = `${site.url}/#business`;
  const portrait = absoluteUrl("/portrait/bartek-1080.webp");
  const sameAs = site.socials.map((s) => s.href);
  const offers = servicesFor(locale).map((s) => ({
    "@type": "Offer" as const,
    url: absoluteUrl(localizeHref(`/oferta/${s.slug}`, locale)),
    itemOffered: { "@type": "Service" as const, name: s.name, description: s.promise },
    ...(s.priceFrom
      ? { priceSpecification: { "@type": "PriceSpecification" as const, minPrice: s.priceFrom, priceCurrency: "PLN" } }
      : {}),
  }));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: en ? "en" : "pl-PL",
        publisher: { "@id": BUSINESS_ID },
      },
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: site.fullName,
        givenName: "Bartłomiej",
        familyName: "Kulesz",
        alternateName: [site.owner, "Bartek Kulesz"],
        jobTitle: "Web developer",
        description: en
          ? `${site.fullName} (Bartek), web developer from Podlasie, Poland, founder of bartekstrony.pl: websites and online stores for businesses.`
          : `${site.fullName} (Bartek), web developer z Podlasia, twórca bartekstrony.pl: strony i sklepy internetowe dla firm.`,
        url: absoluteUrl(site.aboutPath),
        mainEntityOfPage: absoluteUrl(site.aboutPath),
        homeLocation: { "@type": "Place", name: "Podlasie, Polska" },
        image: portrait,
        email: site.email,
        worksFor: { "@id": BUSINESS_ID },
        knowsLanguage: ["pl", "en"],
        knowsAbout: ["Next.js", "React", "TypeScript", "SEO", "E-commerce", "UX", "Integracje AI"],
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        "@type": "ProfessionalService",
        "@id": BUSINESS_ID,
        name: site.name,
        description: en ? siteEn.description : site.description,
        url: site.url,
        email: site.email,
        telephone: site.phone,
        image: [portrait, absoluteUrl(defaultOgImage(locale).url)],
        logo: absoluteUrl("/apple-icon"),
        priceRange: en ? "from 500 PLN" : "od 500 zł",
        currenciesAccepted: "PLN",
        founder: { "@id": PERSON_ID },
        employee: { "@id": PERSON_ID },
        areaServed: [
          { "@type": "Country", name: en ? "Poland" : "Polska" },
          ...cities.map((c) => ({ "@type": "City" as const, name: c.name })),
        ],
        address: { "@type": "PostalAddress", addressRegion: "podlaskie", addressCountry: "PL" },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: en ? "sales" : "wycena i zamówienia",
          email: site.email,
          telephone: site.phone,
          availableLanguage: ["Polish", "English"],
          areaServed: "PL",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: en ? "Websites and online stores" : "Strony i sklepy internetowe",
          itemListElement: offers,
        },
        knowsAbout: ["Strony internetowe", "Sklepy internetowe", "Landing page", "SEO", "Aplikacje webowe"],
        ...(sameAs.length ? { sameAs } : {}),
      },
    ],
  };
}

export function jsonLdString(data: Thing | WithContext<Thing> | Graph) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
