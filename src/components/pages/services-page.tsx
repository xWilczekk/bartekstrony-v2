import Link from "next/link";
import { CtaBand } from "@/components/ui/cta-band";
import { ButtonLink, Arrow } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { SectionHead, Accent } from "@/components/ui/section-head";
import { LinkList, Section } from "@/components/seo/blocks";
import { H1Parts, PageHero } from "@/components/seo/page-hero";
import { itemListSchema } from "@/components/seo/schema";
import { nbsp } from "@/components/seo/text";
import { industries } from "@/content/industries";
import { formatPrice, servicesFor } from "@/content/services";
import { localizeHref } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { breadcrumbs, pageMeta } from "@/lib/seo";

export const servicesMeta = {
  pl: pageMeta({
    title: "Oferta: strony, sklepy, SEO i aplikacje",
    description:
      "Landing page od 500 zł, strona firmowa od 1500 zł, sklep od 3500 zł, redesign, SEO lokalne i aplikacje z AI. Ceny, terminy, zakres. Wycena w 24h.",
    path: "/oferta",
  }),
  en: pageMeta({
    title: "Services: websites, online stores, SEO and apps",
    description:
      "A landing page from PLN 500, a business website from PLN 1,500, a store from PLN 3,500, redesigns, local SEO and AI apps. Prices, timelines, scope. Quote within 24h.",
    path: "/en/services",
  }),
};

const COPY = {
  pl: {
    home: "Start",
    crumb: "Oferta",
    list: "Oferta bartekstrony.pl",
    title: <H1Parts a="Strony i sklepy, które" accent="przynoszą klientów" />,
    lead: "Sześć konkretnych usług, każda z ceną „od”, czasem realizacji i zakresem. Bez ukrytych pozycji i bez żargonu. Wybierz to, co pasuje do Twojej firmy, a jeśli nie jesteś pewien, napisz. Powiem, czego naprawdę potrzebujesz.",
    calc: "Policz wycenę",
    pricing: "Cennik",
    price: "Cena",
    from: "od",
    custom: "indywidualnie",
    unsure: "Nie wiesz, co wybrać",
    unsureTitle: (
      <>
        Trzy szybkie <Accent>sposoby</Accent>, żeby się zorientować
      </>
    ),
    ways: [
      {
        href: "/audyt",
        title: "Masz już stronę?",
        text: "Sprawdź ją w darmowym audycie: szybkość, SEO i telefon. Dowiesz się, czy wystarczą poprawki, czy potrzebny jest redesign.",
        cta: "Zrób audyt",
      },
      {
        href: "/wycena",
        title: "Chcesz znać kwotę?",
        text: "Odpowiedz na kilka pytań i dostaniesz orientacyjną wycenę od razu, a konkretną ofertę w ciągu 24 godzin.",
        cta: "Policz wycenę",
      },
      {
        href: "/twoja-strona",
        title: "Chcesz zobaczyć efekt?",
        text: "Wpisz nazwę firmy, wybierz branżę i zobacz, jak mogłaby wyglądać Twoja strona, zanim cokolwiek zamówisz.",
        cta: "Zobacz podgląd",
      },
    ],
  },
  en: {
    home: "Home",
    crumb: "Services",
    list: "Services by bartekstrony.pl",
    title: <H1Parts a="Websites and stores that" accent="bring in customers" />,
    lead: "Six specific services, each with a “from” price, a timeline and a scope. No hidden items and no jargon. Pick what fits your business, and if you’re not sure, write to me. I’ll tell you what you actually need.",
    calc: "Get a quote",
    pricing: "Pricing",
    price: "Price",
    from: "from",
    custom: "custom quote",
    unsure: "Not sure what to choose",
    unsureTitle: (
      <>
        Three quick <Accent>ways</Accent> to find out
      </>
    ),
    ways: [
      {
        href: "/audyt",
        title: "Already have a website?",
        text: "Check it with the free audit: speed, SEO and mobile. You’ll find out whether fixes are enough or a redesign is needed.",
        cta: "Run the audit",
      },
      {
        href: "/wycena",
        title: "Want to know the price?",
        text: "Answer a few questions and get a rough quote right away, and a specific offer within 24 hours.",
        cta: "Get a quote",
      },
      {
        href: "/twoja-strona",
        title: "Want to see the result?",
        text: "Type your business name, pick an industry and see what your website could look like before you order anything.",
        cta: "See the preview",
      },
    ],
  },
};

export function ServicesPage() {
  const locale = getLocale();
  const en = locale === "en";
  const c = COPY[locale];
  const services = servicesFor(locale);
  const href = (h: string) => localizeHref(h, locale);
  const crumbs = [
    { name: c.home, path: href("/") },
    { name: c.crumb, path: href("/oferta") },
  ];

  return (
    <>
      <JsonLd data={breadcrumbs(crumbs)} />
      <JsonLd data={itemListSchema(c.list, services.map((s) => ({ name: s.name, path: href(`/oferta/${s.slug}`) })))} />

      <PageHero
        crumbs={crumbs}
        eyebrow={c.crumb}
        title={c.title}
        lead={<p>{c.lead}</p>}
        aside={
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={href("/wycena")} variant="signal" size="lg" arrow>
              {c.calc}
            </ButtonLink>
            <ButtonLink href={href("/cennik")} variant="ghost" size="lg">
              {c.pricing}
            </ButtonLink>
          </div>
        }
      />

      <Section className="pt-0 md:pt-0">
        <ol className="border-t hairline">
          {services.map((s, i) => (
            <li key={s.slug}>
              <Link
                href={href(`/oferta/${s.slug}`)}
                className="group grid gap-x-8 gap-y-5 border-b hairline py-9 transition-colors duration-300 md:grid-cols-12 md:py-12"
              >
                <span className="label-mono text-mute md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <div className="md:col-span-5">
                  <h2 className="font-display text-[length:var(--text-big)] leading-none font-semibold tracking-tight transition-colors duration-300 group-hover:text-signal">
                    {s.name}
                  </h2>
                  <p className="mt-4 max-w-md text-lg leading-snug text-ink/75">{nbsp(s.promise)}</p>
                </div>
                <ul className="space-y-2 text-[0.95rem] text-ink/75 md:col-span-3">
                  {s.includes.slice(0, 4).map((inc) => (
                    <li key={inc} className="flex gap-3">
                      <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-signal" />
                      {inc}
                    </li>
                  ))}
                </ul>
                <div className="flex items-start justify-between gap-4 md:col-span-3 md:flex-col md:items-end md:text-right">
                  <div>
                    <p className="label-mono text-mute">{c.price}</p>
                    <p className="font-display text-3xl font-semibold tracking-tight">
                      {s.priceFrom ? `${c.from} ${formatPrice(s.priceFrom, locale)}` : c.custom}
                    </p>
                    <p className="label-mono mt-1 text-mute">{s.timeline}</p>
                  </div>
                  <Arrow className="size-7 shrink-0 group-hover:text-signal" />
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="paper-2">
        <SectionHead index="01" eyebrow={c.unsure} title={c.unsureTitle} />
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {c.ways.map((w) => (
            <div key={w.href} className="border-t hairline pt-6">
              <h3 className="font-display text-2xl font-semibold tracking-tight">{w.title}</h3>
              <p className="mt-3 leading-relaxed text-ink/75">{w.text}</p>
              <ButtonLink href={href(w.href)} variant="ink" className="mt-6" arrow>
                {w.cta}
              </ButtonLink>
            </div>
          ))}
        </div>
      </Section>

      {!en && (
        <Section>
          <SectionHead
            index="02"
            eyebrow="Branże"
            title={
              <>
                Strony szyte pod <Accent>Twoją</Accent> branżę
              </>
            }
            lead="Restauracja potrzebuje czego innego niż hotel czy warsztat. Dla każdej z branż, z którymi pracuję, opisałem, co musi mieć strona i ile to kosztuje."
          />
          <LinkList
            className="mt-12"
            items={industries.map((i) => ({
              href: `/branze/${i.slug}`,
              label: i.name,
              hint: i.hook,
            }))}
          />
        </Section>
      )}

      <CtaBand source="oferta" />
    </>
  );
}
