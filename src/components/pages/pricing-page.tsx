import { FaqAccordion } from "@/components/home/faq";
import { PackageList } from "@/components/pricing/package-list";
import { AddonsTable, ComparisonTable } from "@/components/pricing/price-tables";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { CtaBand } from "@/components/ui/cta-band";
import { JsonLd } from "@/components/ui/json-ld";
import { Accent, SectionHead } from "@/components/ui/section-head";
import { pricingFaqFor } from "@/content/faq";
import { pricingFor } from "@/content/pricing";
import { formatPrice } from "@/content/services";
import { localizeHref, type Locale } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { breadcrumbs, faqSchema, pageMeta } from "@/lib/seo";

const priceOf = (locale: Locale, i: number) => formatPrice(pricingFor(locale).packages[i].priceFrom ?? 0, locale);
const otherPrice = (locale: Locale, slug: string) =>
  formatPrice(pricingFor(locale).otherPacks.find((p) => p.slug === slug)?.priceFrom ?? 0, locale);

export const pricingMeta = {
  pl: pageMeta({
    title: "Cennik stron internetowych — ile kosztuje strona i sklep",
    description: `Ile kosztuje strona internetowa? Landing page od ${priceOf("pl", 0)}, strona firmowa od ${priceOf("pl", 1)}, sklep od ${priceOf("pl", 2)}. Pełny cennik z dodatkami, porównaniem pakietów i wyceną online w 24h.`,
    path: "/cennik",
  }),
  en: pageMeta({
    title: "Website pricing — what a website and an online store cost",
    description: `How much does a website cost? A landing page from ${priceOf("en", 0)}, a business website from ${priceOf("en", 1)}, an online store from ${priceOf("en", 2)}. The full price list with add-ons, a package comparison and an online quote within 24h.`,
    path: "/en/pricing",
  }),
};

function copy(locale: Locale) {
  const [landing, firmowa, sklep] = [0, 1, 2].map((i) => priceOf(locale, i));
  const redesign = otherPrice(locale, "redesign-strony");
  const seo = otherPrice(locale, "pozycjonowanie-seo");
  if (locale === "en")
    return {
      home: "Home",
      crumb: "Pricing",
      eyebrow: "(Pricing)",
      eyebrowText: "What a website costs",
      h1: (
        <>
          How much does a <Accent>website</Accent> cost?
        </>
      ),
      lead: `A landing page from ${landing}, a business website from ${firmowa}, an online store from ${sklep}. Below is everything that affects the price — no hidden costs. Plus a website redesign from ${redesign} and SEO from ${seo}.`,
      calc: "Price your website",
      calcNote: "30 seconds, no personal details",
      packs: ["Packages", <>Three <Accent>packages</Accent>, one honest price list.</>, "“From” prices are for a typical, simple scope. Below you’ll see what the final amount depends on."] as const,
      compare: ["What you get", <>Package <Accent>comparison</Accent>.</>, "Everything that’s included in the price, and what you pay extra for."] as const,
      addons: ["Add-ons", <>Add only what you <Accent>need</Accent>.</>, "Add-on rates are fixed. The calculator adds them to the quote as you go."] as const,
      factors: ["What the price depends on", <>Five things that <Accent>change</Accent> the amount.</>, "No secrets: this is how I build a quote. If anything’s unclear, ask."] as const,
      notIncluded: "Not included in the price",
      faq: ["Questions about price", <>Talking about money, <Accent>plainly</Accent>.</>] as const,
      closing: <>Want the amount for your business? <Accent>Work it out</Accent> yourself.</>,
      closingCta: "Go to the calculator",
    };
  return {
    home: "Strona główna",
    crumb: "Cennik",
    eyebrow: "(Cennik)",
    eyebrowText: "Ile kosztuje strona internetowa",
    h1: (
      <>
        Ile kosztuje <Accent>strona</Accent> internetowa?
      </>
    ),
    lead: `Landing page od ${landing}, strona firmowa od ${firmowa}, sklep internetowy od ${sklep}. Poniżej wszystko, co wpływa na cenę — bez chowania kosztów. Dodatkowo redesign strony od ${redesign} i SEO od ${seo}.`,
    calc: "Policz swoją stronę",
    calcNote: "30 sekund, bez podawania danych",
    packs: ["Pakiety", <>Trzy <Accent>pakiety</Accent>, jeden uczciwy cennik.</>, "Ceny „od” dotyczą typowego, prostego zakresu. Poniżej dowiesz się, od czego zależy końcowa kwota."] as const,
    compare: ["Co dostajesz", <>Porównanie <Accent>pakietów</Accent>.</>, "Wszystko, co jest w cenie, i to, za co zapłacisz dodatkowo."] as const,
    addons: ["Dodatki", <>Dołóż tylko to, co <Accent>potrzebne</Accent>.</>, "Stawki dodatków są stałe. Kalkulator doda je do wyceny na bieżąco."] as const,
    factors: ["Od czego zależy cena", <>Pięć rzeczy, które <Accent>zmieniają</Accent> kwotę.</>, "Bez tajemnic: tak liczę wycenę. Jeśli coś jest niejasne, zapytaj."] as const,
    notIncluded: "Czego nie ma w cenie",
    faq: ["Pytania o cenę", <>O pieniądzach <Accent>wprost</Accent>.</>] as const,
    closing: <>Chcesz znać kwotę dla swojej firmy? <Accent>Policz ją</Accent> sam.</>,
    closingCta: "Przejdź do kalkulatora",
  };
}

export function PricingPage() {
  const locale = getLocale();
  const c = copy(locale);
  const { packages, priceFactors, notIncluded } = pricingFor(locale);
  const pricingFaq = pricingFaqFor(locale);
  const href = (h: string) => localizeHref(h, locale);

  return (
    <>
      <JsonLd data={faqSchema(pricingFaq)} />
      <JsonLd
        data={breadcrumbs([
          { name: c.home, path: href("/") },
          { name: c.crumb, path: href("/cennik") },
        ])}
      />

      <section className="container-x pt-[calc(var(--header-h)+3rem)] pb-14 md:pb-20">
        <p className="label-mono text-mute">
          <span className="text-signal">{c.eyebrow}</span> {c.eyebrowText}
        </p>
        <h1 className="mt-5 max-w-5xl font-display text-[length:var(--text-giant)] font-semibold text-balance">{c.h1}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-mute">{c.lead}</p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <ButtonLink href={href("/wycena")} variant="signal" size="lg" arrow>
            {c.calc}
          </ButtonLink>
          <span className="label-mono text-mute">{c.calcNote}</span>
        </div>
      </section>

      <section className="container-x pb-20 md:pb-28">
        <SectionHead index="01" eyebrow={c.packs[0]} title={c.packs[1]} lead={c.packs[2]} />
        <div className="mt-12 md:mt-16">
          <PackageList packs={packages} />
        </div>
      </section>

      <section className="container-x pb-20 md:pb-28">
        <SectionHead index="02" eyebrow={c.compare[0]} title={c.compare[1]} lead={c.compare[2]} />
        <div className="mt-12 md:mt-16">
          <ComparisonTable />
        </div>
      </section>

      <section className="border-t hairline bg-paper-2">
        <div className="container-x py-20 md:py-28">
          <SectionHead index="03" eyebrow={c.addons[0]} title={c.addons[1]} lead={c.addons[2]} />
          <div className="mt-12 md:mt-16">
            <AddonsTable />
          </div>
        </div>
      </section>

      <section className="container-x py-20 md:py-28">
        <SectionHead index="04" eyebrow={c.factors[0]} title={c.factors[1]} lead={c.factors[2]} />
        <ol className="mt-12 divide-y divide-line border-y hairline md:mt-16">
          {priceFactors.map((f, i) => (
            <li key={f.title}>
              <Reveal from={i % 2 ? "right" : "left"} className="grid gap-x-8 gap-y-2 py-7 md:grid-cols-12">
                <p className="label-mono text-signal md:col-span-1">0{i + 1}</p>
                <h3 className="font-display text-[clamp(1.5rem,2.4vw,2rem)] font-semibold md:col-span-4">{f.title}</h3>
                <p className="max-w-2xl text-pretty text-mute md:col-span-7">{f.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="mt-16 grid gap-8">
          <h3 className="label-mono text-mute">{c.notIncluded}</h3>
          <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {notIncluded.map((n) => (
              <div key={n.title} className="border-t hairline pt-4">
                <dt className="font-medium">{n.title}</dt>
                <dd className="mt-2 text-pretty text-mute">{n.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="container-x pb-20 md:pb-28">
        <SectionHead index="05" eyebrow={c.faq[0]} title={c.faq[1]} align="center" />
        <div className="mx-auto mt-12 max-w-4xl md:mt-16">
          <FaqAccordion items={pricingFaq} />
        </div>
      </section>

      <section className="border-t hairline">
        <div className="container-x flex flex-col items-start gap-6 py-14 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl font-display text-[length:var(--text-big)] leading-[1.05]! font-semibold text-balance">
            {c.closing}
          </p>
          <ButtonLink href={href("/wycena")} variant="ink" size="lg" arrow>
            {c.closingCta}
          </ButtonLink>
        </div>
      </section>

      <CtaBand source="cennik" />
    </>
  );
}
