import { JsonLd } from "@/components/ui/json-ld";
import { Accent } from "@/components/ui/section-head";
import { SitemapExplorer } from "@/components/site/sitemap-explorer";
import { localizeHref } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { breadcrumbs, pageMeta } from "@/lib/seo";
import { sitemapGroups } from "@/lib/sitemap";

export const sitemapMeta = {
  pl: pageMeta({
    title: "Mapa strony",
    description: "Wszystkie podstrony bartekstrony.pl w jednym miejscu: oferta, realizacje, branże, miasta, blog i narzędzia.",
    path: "/mapa-strony",
  }),
  en: pageMeta({
    title: "Site map",
    description: "Every English page of bartekstrony.pl in one place: services, work, pricing and tools.",
    path: "/en/site-map",
  }),
};

const COPY = {
  pl: {
    home: "Strona główna",
    crumb: "Mapa strony",
    eyebrow: "(Nawigacja)",
    h1: (
      <>
        Cała strona, <Accent>na&nbsp;jednej kartce</Accent>.
      </>
    ),
    lead: "Każda podstrona w jednym miejscu. Wpisz, czego szukasz, albo przeskocz do sekcji.",
    stats: ["Podstron", "Sekcji", "Po angielsku"],
    robots: "Dla wyszukiwarek jest wersja XML:",
  },
  en: {
    home: "Home",
    crumb: "Site map",
    eyebrow: "(Navigation)",
    h1: (
      <>
        The whole site, <Accent>on&nbsp;one page</Accent>.
      </>
    ),
    lead: "Every page in one place. Type what you’re looking for, or jump to a section. City and industry guides are in Polish only.",
    stats: ["Pages", "Sections", "Also in Polish"],
    robots: "For search engines there’s an XML version:",
  },
};

export function SitemapPage() {
  const locale = getLocale();
  const c = COPY[locale];
  const groups = sitemapGroups(locale);
  const pages = groups.reduce((n, g) => n + g.links.length, 0);
  const twins = groups.reduce((n, g) => n + g.links.filter((l) => l.other).length, 0);

  return (
    <>
      <JsonLd
        data={breadcrumbs([
          { name: c.home, path: localizeHref("/", locale) },
          { name: c.crumb, path: localizeHref("/mapa-strony", locale) },
        ])}
      />

      <section className="container-x pt-[calc(var(--header-h)+3rem)] pb-12 md:pt-[calc(var(--header-h)+5rem)] md:pb-16">
        <p className="label-mono text-mute">
          <span className="text-signal">{c.eyebrow}</span> {c.crumb}
        </p>
        <h1 className="mt-5 max-w-5xl font-display text-[length:var(--text-giant)] font-semibold text-balance">{c.h1}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-mute">{c.lead}</p>

        <dl className="mt-12 grid grid-cols-3 border-t hairline">
          {[pages, groups.length, twins].map((v, i) => (
            <div key={c.stats[i]} className={i ? "border-l hairline py-5 pl-4 md:pl-6" : "py-5 pr-4"}>
              <dt className="label-mono text-mute">{c.stats[i]}</dt>
              <dd className="mt-2 font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-none font-semibold tabular-nums">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="label-mono mt-6 text-mute">
          {c.robots}{" "}
          <a href="/sitemap.xml" className="text-ink underline decoration-signal underline-offset-4 hover:text-signal">
            sitemap.xml
          </a>
        </p>
      </section>

      <SitemapExplorer groups={groups} />
    </>
  );
}
