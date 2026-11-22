import type { Article, CreativeWork, ItemList, Service as SchemaService, WithContext } from "schema-dts";
import type { City } from "@/content/cities";
import type { Post } from "@/content/blog/posts";
import type { Industry } from "@/content/industries";
import type { Project } from "@/content/projects";
import type { Service } from "@/content/services";
import { site } from "@/content/site";
import { localizeHref, type Locale } from "@/i18n/config";
import { absoluteUrl, defaultOgImage } from "@/lib/seo";

const BUSINESS = { "@id": `${site.url}/#business` };
const PERSON = { "@id": `${site.url}/#person` };

function offer(priceFrom: number | null, url: string) {
  if (priceFrom == null) return undefined;
  return {
    "@type": "Offer" as const,
    url,
    priceCurrency: "PLN",
    priceSpecification: {
      "@type": "PriceSpecification" as const,
      minPrice: priceFrom,
      priceCurrency: "PLN",
    },
  };
}

export function serviceSchema(s: Service, locale: Locale = "pl"): WithContext<SchemaService> {
  const url = absoluteUrl(localizeHref(`/oferta/${s.slug}`, locale));
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    serviceType: s.keyword,
    description: s.metaDescription,
    url,
    provider: BUSINESS,
    areaServed: { "@type": "Country", name: locale === "en" ? "Poland" : "Polska" },
    offers: offer(s.priceFrom, url),
  };
}

export function industrySchema(i: Industry, s: Service): WithContext<SchemaService> {
  const url = absoluteUrl(`/branze/${i.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Strony internetowe dla ${i.forName}`,
    serviceType: s.keyword,
    description: i.metaDescription,
    url,
    provider: BUSINESS,
    areaServed: { "@type": "Country", name: "Polska" },
    audience: { "@type": "BusinessAudience", name: i.name },
    offers: offer(s.priceFrom, url),
  };
}

export function citySchema(c: City): WithContext<SchemaService> {
  const url = absoluteUrl(`/strony-internetowe/${c.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Strony internetowe ${c.inName}`,
    serviceType: "Strony internetowe, sklepy internetowe, SEO lokalne",
    description: c.metaDescription,
    url,
    provider: BUSINESS,
    areaServed: {
      "@type": "City",
      name: c.name,
      containedInPlace: { "@type": "AdministrativeArea", name: `województwo ${c.region}` },
    },
    offers: offer(500, url),
  };
}

export function projectSchema(p: Project, locale: Locale = "pl"): WithContext<CreativeWork> {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${p.title}: ${p.category}`,
    description: p.description,
    url: absoluteUrl(localizeHref(`/realizacje/${p.slug}`, locale)),
    creator: PERSON,
    keywords: p.tags.join(", "),
    inLanguage: locale === "en" ? "en" : "pl-PL",
    about: p.client,
    ...(p.city ? { locationCreated: { "@type": "Place" as const, name: p.city } } : {}),
  };
}

export function articleSchema(p: Post, words: number): WithContext<Article> {
  const url = absoluteUrl(`/blog/${p.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    dateModified: p.updated ?? p.date,
    inLanguage: "pl-PL",
    url,
    mainEntityOfPage: url,
    image: absoluteUrl(defaultOgImage("pl").url),
    author: PERSON,
    publisher: BUSINESS,
    keywords: p.tags.join(", "),
    wordCount: words,
  };
}

export function itemListSchema(name: string, items: { name: string; path: string }[]): WithContext<ItemList> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: absoluteUrl(it.path),
    })),
  };
}
