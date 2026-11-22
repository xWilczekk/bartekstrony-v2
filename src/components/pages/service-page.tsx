import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { CtaBand } from "@/components/ui/cta-band";
import { JsonLd } from "@/components/ui/json-ld";
import { Accent, SectionHead } from "@/components/ui/section-head";
import { EditorialList, FactStrip, RelatedGrid, Section } from "@/components/seo/blocks";
import { FaqSection } from "@/components/seo/faq-list";
import { H1Parts, PageHero } from "@/components/seo/page-hero";
import { ProjectsSection } from "@/components/seo/projects-section";
import { serviceSchema } from "@/components/seo/schema";
import { nbsp } from "@/components/seo/text";
import { getPost } from "@/content/blog/posts";
import { cities } from "@/content/cities";
import { getIndustry } from "@/content/industries";
import { getProjectFor } from "@/content/projects";
import { formatPrice, getServiceFor, servicesFor } from "@/content/services";
import { localizeHref, type Locale } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { breadcrumbs, pageMeta } from "@/lib/seo";
import { contactHref } from "@/lib/utils";

export function serviceMeta(slug: string, locale: Locale): Metadata {
  const s = getServiceFor(slug, locale);
  if (!s) return {};
  return pageMeta({ title: s.metaTitle, description: s.metaDescription, path: localizeHref(`/oferta/${s.slug}`, locale), ogImage: false });
}

const COPY = {
  pl: {
    home: "Start",
    crumb: "Oferta",
    price: "Cena",
    from: "od",
    custom: "indywidualnie",
    time: "Czas",
    quote: "Wycena",
    quoteIn: "w 24 h",
    support: "Wsparcie techniczne po starcie",
    days30: "30 dni",
    freeQuote: "Bezpłatna wycena",
    seeWork: "Zobacz realizacje",
    forWho: ["Dla kogo", <>Czy to jest <Accent>dla Ciebie</Accent>?</>] as const,
    notFor: "Kiedy to nie to",
    get: ["Co dostajesz", <>W cenie: <Accent>konkrety</Accent>, nie ogólniki</>] as const,
    how: ["Jak to wygląda", <>Od rozmowy do <Accent>startu</Accent></>, "Pokazuję działającą wersję w trakcie pracy, więc widzisz postęp, a nie czekasz na wielkie odsłonięcie."] as const,
    cost: ["Cena i czas", <>Ile to <Accent>kosztuje</Accent></>] as const,
    quoteWord: "Wycena",
    delivery: "Czas realizacji:",
    calc: "Policz swoją wycenę",
    allPrices: "Cały cennik",
    practice: <>Tak to <Accent>wygląda</Accent> w praktyce</>,
    practiceLead: "Prawdziwe strony prawdziwych firm. Kliknij projekt, żeby zobaczyć zakres i efekt.",
    related: ["Zobacz też", <>Powiązane <Accent>tematy</Accent></>] as const,
    industries: "Branże",
    otherServices: "Inne usługi",
    blog: "Z bloga",
    local: "Lokalnie:",
  },
  en: {
    home: "Home",
    crumb: "Services",
    price: "Price",
    from: "from",
    custom: "custom quote",
    time: "Time",
    quote: "Quote",
    quoteIn: "within 24 h",
    support: "Technical support after launch",
    days30: "30 days",
    freeQuote: "Free quote",
    seeWork: "See my work",
    forWho: ["Who it’s for", <>Is this <Accent>for you</Accent>?</>] as const,
    notFor: "When it’s not the right fit",
    get: ["What you get", <>Included: <Accent>specifics</Accent>, not vague promises</>] as const,
    how: ["How it works", <>From the first call to <Accent>launch</Accent></>, "I show you a working version while I build it, so you see progress instead of waiting for a big reveal."] as const,
    cost: ["Price and time", <>What it <Accent>costs</Accent></>] as const,
    quoteWord: "Quote",
    delivery: "Delivery time:",
    calc: "Work out your quote",
    allPrices: "Full price list",
    practice: <>What it <Accent>looks like</Accent> in practice</>,
    practiceLead: "Real websites for real businesses. Click a project to see the scope and the result.",
    related: ["See also", <>Other <Accent>services</Accent></>] as const,
    industries: "",
    otherServices: "Other services",
    blog: "",
    local: "",
  },
};

export function ServicePage({ slug }: { slug: string }) {
  const locale = getLocale();
  const en = locale === "en";
  const c = COPY[locale];
  const href = (h: string) => localizeHref(h, locale);
  const s = getServiceFor(slug, locale);
  if (!s) notFound();

  const crumbs = [
    { name: c.home, path: href("/") },
    { name: c.crumb, path: href("/oferta") },
    { name: s.name, path: href(`/oferta/${s.slug}`) },
  ];

  const projects = s.relatedProjects.flatMap((p) => getProjectFor(p, locale) ?? []);
  const posts = en ? [] : s.relatedPosts.flatMap((p) => getPost(p) ?? []);
  const industries = en ? [] : s.relatedIndustries.flatMap((i) => getIndustry(i) ?? []);
  const otherServices = s.relatedServices.flatMap((o) => servicesFor(locale).find((x) => x.slug === o) ?? []);

  return (
    <>
      <JsonLd data={breadcrumbs(crumbs)} />
      <JsonLd data={serviceSchema(s, locale)} />

      <PageHero
        crumbs={crumbs}
        eyebrow={`${c.crumb} · ${s.name}`}
        title={<H1Parts {...s.h1} />}
        lead={
          <div className="space-y-5">
            {s.intro.map((p) => (
              <p key={p}>{nbsp(p)}</p>
            ))}
          </div>
        }
        aside={
          <div>
            <FactStrip
              facts={[
                { label: c.price, value: s.priceFrom ? `${c.from} ${formatPrice(s.priceFrom, locale)}` : c.custom },
                { label: c.time, value: s.timeline },
                { label: c.quote, value: c.quoteIn },
                { label: c.support, value: c.days30 },
              ]}
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={href(contactHref({ zrodlo: "oferta", usluga: s.slug }))} variant="signal" size="lg" arrow>
                {c.freeQuote}
              </ButtonLink>
              <ButtonLink href={href("/realizacje")} variant="ghost" size="lg">
                {c.seeWork}
              </ButtonLink>
            </div>
          </div>
        }
      />

      <Section tone="paper-2">
        <SectionHead index="01" eyebrow={c.forWho[0]} title={c.forWho[1]} />
        <div className="mt-12 grid gap-12 md:grid-cols-12">
          <ul className="border-t hairline md:col-span-7">
            {s.audience.map((a) => (
              <li key={a} className="flex gap-4 border-b hairline py-5 text-lg leading-snug">
                <span aria-hidden className="mt-[0.7em] h-px w-5 shrink-0 bg-signal" />
                {nbsp(a)}
              </li>
            ))}
          </ul>
          <aside className="self-start rounded-[var(--radius)] border border-ink/10 p-6 md:col-span-4 md:col-start-9 md:p-8">
            <p className="label-mono text-mute">{c.notFor}</p>
            <p className="mt-4 leading-relaxed text-ink/80">{nbsp(s.notFor)}</p>
          </aside>
        </div>
      </Section>

      <Section>
        <SectionHead index="02" eyebrow={c.get[0]} title={c.get[1]} />
        <EditorialList className="mt-12" items={s.deliverables} />
      </Section>

      <Section tone="ink">
        <SectionHead index="03" eyebrow={c.how[0]} title={c.how[1]} lead={c.how[2]} />
        <ol className="mt-14 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
          {s.process.map((p, i) => (
            <li key={p.title}>
              <Reveal from={i % 2 ? "right" : "left"} delay={i * 0.08} className="h-full border-t hairline pt-5">
              <p className="label-mono flex justify-between text-mute">
                <span className="text-signal">{String(i + 1).padStart(2, "0")}</span>
                <span>{p.time}</span>
              </p>
              <h3 className="mt-6 font-display text-2xl leading-tight font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-mute">{nbsp(p.text)}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <SectionHead index="04" eyebrow={c.cost[0]} title={c.cost[1]} />
        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-[length:var(--text-huge)] leading-none font-semibold tracking-tight">
              {s.priceFrom ? (
                <>
                  <span className="text-[0.4em] font-medium text-mute">{c.from} </span>
                  {formatPrice(s.priceFrom, locale)}
                </>
              ) : (
                c.quoteWord
              )}
            </p>
            <p className="label-mono mt-4 text-mute">
              {c.delivery} {s.timeline}
            </p>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="text-lg leading-relaxed text-pretty text-ink/80">{nbsp(s.priceNote)}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={href("/wycena")} variant="ink" arrow>
                {c.calc}
              </ButtonLink>
              <ButtonLink href={href("/cennik")} variant="ghost">
                {c.allPrices}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      <ProjectsSection tone="paper-2" index="05" title={c.practice} lead={c.practiceLead} projects={projects} />

      <Section>
        <SectionHead index="06" eyebrow={c.related[0]} title={c.related[1]} />
        <RelatedGrid
          className="mt-12"
          groups={[
            { title: c.industries, items: industries.map((i) => ({ href: `/branze/${i.slug}`, label: i.name })) },
            { title: c.otherServices, items: otherServices.map((o) => ({ href: href(`/oferta/${o.slug}`), label: o.name })) },
            { title: c.blog, items: posts.map((p) => ({ href: `/blog/${p.slug}`, label: p.title })) },
          ]}
        />
        {!en && (
          <p className="label-mono mt-12 flex flex-wrap gap-x-5 gap-y-2 text-mute">
            <span>{c.local}</span>
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/strony-internetowe/${city.slug}`}
                className="text-ink underline-offset-4 hover:text-signal hover:underline"
              >
                {city.name}
              </Link>
            ))}
          </p>
        )}
      </Section>

      <FaqSection tone="paper-2" index="07" items={s.faq} />

      <CtaBand source="oferta" extra={{ usluga: s.slug }} />
    </>
  );
}
