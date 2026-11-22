import { CtaBand } from "@/components/ui/cta-band";
import { JsonLd } from "@/components/ui/json-ld";
import { Accent, SectionHead } from "@/components/ui/section-head";
import { AuditTool } from "@/components/audit/audit-tool";
import { SpeedCompare } from "@/components/fun/extras";
import { site } from "@/content/site";
import { localizeHref } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { absoluteUrl, breadcrumbs, pageMeta } from "@/lib/seo";

export const auditMeta = {
  pl: pageMeta({
    title: "Darmowy audyt strony internetowej — test szybkości w 30 sekund",
    description:
      "Sprawdź za darmo, jak szybko ładuje się Twoja strona na telefonie, co widzi Google i co przez to tracisz. Audyt strony internetowej po polsku, bez rejestracji.",
    path: "/audyt",
  }),
  en: pageMeta({
    title: "Free website audit — a speed test in 30 seconds",
    description:
      "Check for free how fast your website loads on a phone, what Google sees and what it costs you. A website audit in plain English, no sign-up.",
    path: "/en/audit",
  }),
};

const COPY = {
  pl: {
    home: "Strona główna",
    crumb: "Darmowy audyt strony",
    app: "Darmowy audyt strony internetowej",
    os: "Przeglądarka internetowa",
    lang: "pl-PL",
    tool: "(Narzędzie)",
    h1: (
      <>
        Ile klientów traci Twoja&nbsp;<Accent>strona</Accent>? Sprawdź w&nbsp;30&nbsp;sekund.
      </>
    ),
    lead: "Wpisz adres. Otworzę Twoją stronę na symulowanym telefonie i powiem po polsku, jak szybko się ładuje, co widzi Google i co dokładnie warto poprawić. Bez rejestracji, bez maila.",
    checksHead: ["Co sprawdzam", <>Cztery oceny, <Accent>jedna</Accent> odpowiedź</>, "Każda dostaje wynik 0–100. Od 90 jest dobrze, 50–89 do poprawy, poniżej 50 słabo."] as const,
    checks: [
      {
        title: "Wydajność",
        text: "Po ilu sekundach klient widzi Twoją ofertę na telefonie z wolniejszym internetem — i czy strona reaguje na dotyk. To najczęściej decyduje o tym, czy ktoś zostaje.",
      },
      {
        title: "SEO",
        text: "Czy Google rozumie, o czym jest strona: tytuł, opis, nagłówki, linki, wersja mobilna. Bez tego możesz mieć piękną stronę, której nikt nie znajdzie.",
      },
      {
        title: "Dostępność",
        text: "Czy tekst da się przeczytać na słońcu, czy przyciski są dość duże, czy formularz da się wypełnić. Dotyczy starszych klientów, ale też każdego, kto stoi na przystanku.",
      },
      {
        title: "Dobre praktyki",
        text: "Bezpieczne połączenie (HTTPS), błędy techniczne, stare biblioteki z lukami. Rzeczy, o których właściciel zwykle nie wie, a przeglądarka potrafi ostrzec przed nimi klienta.",
      },
    ],
    faqHead: ["Pytania", <>Zanim klikniesz <Accent>sprawdź</Accent></>] as const,
    faq: [
      {
        q: "Skąd się biorą te wyniki?",
        a: "Test wykonuje Google PageSpeed Insights, na silniku Lighthouse — tym samym, którego używają programiści. Strona jest otwierana na symulowanym telefonie ze średniej półki i łączu 4G. Ja niczego nie zmieniam ani nie „podkręcam”.",
      },
      {
        q: "Dlaczego tylko wersja na telefon?",
        a: "Bo tam jest większość Twoich klientów szukających firmy „w okolicy”, a Google ocenia strony głównie według wersji mobilnej. Na komputerze wynik zwykle wychodzi lepiej.",
      },
      {
        q: "Co się dzieje z moim adresem?",
        a: "Adres trafia do Google, żeby mogło otworzyć stronę. Nie zapisuję go ani wyników na serwerze i nie dzwonię do nikogo po teście. Jeśli chcesz propozycji, klikasz sam.",
      },
      {
        q: "Wynik jest inny przy każdym teście. Dlaczego?",
        a: "Test jest symulacją, a obciążenie serwerów Google i Twojego hostingu zmienia się z minuty na minutę. Różnice o kilka punktów są normalne. Liczy się rząd wielkości.",
      },
    ],
    ctaTitle: (
      <>
        Wolisz, żebym to <Accent>naprawił</Accent>?
      </>
    ),
    ctaLead: "Opisz w dwóch zdaniach, czym się zajmujesz. Odpiszę z propozycją i wyceną w 24h.",
  },
  en: {
    home: "Home",
    crumb: "Free website audit",
    app: "Free website audit",
    os: "Web browser",
    lang: "en",
    tool: "(Tool)",
    h1: (
      <>
        How many customers is your&nbsp;<Accent>website</Accent> losing? Find out in&nbsp;30&nbsp;seconds.
      </>
    ),
    lead: "Enter the address. I’ll open your site on a simulated phone and tell you in plain English how fast it loads, what Google sees and exactly what’s worth fixing. No sign-up, no e-mail.",
    checksHead: ["What I check", <>Four scores, <Accent>one</Accent> answer</>, "Each gets a score from 0 to 100. 90 and up is good, 50–89 needs work, below 50 is poor."] as const,
    checks: [
      {
        title: "Performance",
        text: "How many seconds it takes for a customer on a slower phone connection to see your offer — and whether the page responds to touch. This most often decides whether someone stays.",
      },
      {
        title: "SEO",
        text: "Whether Google understands what the site is about: title, description, headings, links, mobile version. Without it you can have a beautiful site nobody finds.",
      },
      {
        title: "Accessibility",
        text: "Whether the text can be read in sunlight, whether buttons are big enough, whether the form can be filled in. It matters for older customers, but also for anyone standing at a bus stop.",
      },
      {
        title: "Best practices",
        text: "A secure connection (HTTPS), technical errors, old libraries with security holes. Things owners usually don’t know about, but browsers can warn customers about.",
      },
    ],
    faqHead: ["Questions", <>Before you click <Accent>check</Accent></>] as const,
    faq: [
      {
        q: "Where do these results come from?",
        a: "The test is run by Google PageSpeed Insights on the Lighthouse engine — the same one developers use. The site is opened on a simulated mid-range phone on 4G. I don’t change or “tweak” anything.",
      },
      {
        q: "Why only the phone version?",
        a: "Because that’s where most of your customers looking for a business “nearby” are, and Google ranks sites mainly by their mobile version. On a computer the score usually comes out better.",
      },
      {
        q: "What happens to my address?",
        a: "The address goes to Google so it can open the site. I don’t store it or the results on a server, and I don’t call anyone after the test. If you want a proposal, you click yourself.",
      },
      {
        q: "The score is different every time. Why?",
        a: "The test is a simulation, and the load on Google’s servers and your hosting changes minute by minute. Differences of a few points are normal. What counts is the order of magnitude.",
      },
    ],
    ctaTitle: (
      <>
        Would you rather I <Accent>fixed</Accent> it?
      </>
    ),
    ctaLead: "Describe what you do in two sentences. I’ll reply with a proposal and a quote within 24h.",
  },
};

export function AuditPage() {
  const locale = getLocale();
  const c = COPY[locale];
  const href = (h: string) => localizeHref(h, locale);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbs([
              { name: c.home, path: href("/") },
              { name: c.crumb, path: href("/audyt") },
            ]),
            {
              "@type": "WebApplication",
              name: c.app,
              url: absoluteUrl(href("/audyt")),
              applicationCategory: "BusinessApplication",
              operatingSystem: c.os,
              inLanguage: c.lang,
              offers: { "@type": "Offer", price: "0", priceCurrency: "PLN" },
              provider: { "@id": `${site.url}/#business` },
            },
          ],
        }}
      />

      <section className="pt-[calc(var(--header-h)+3rem)] pb-20 md:pt-[calc(var(--header-h)+5rem)] md:pb-28">
        <div className="container-x">
          <p className="label-mono flex gap-3 text-mute">
            <span className="text-signal">{c.tool}</span>
            <span>{c.crumb}</span>
          </p>
          <h1 className="mt-6 max-w-6xl font-display text-[length:var(--text-giant)] font-semibold text-balance">{c.h1}</h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-pretty text-mute md:text-xl">{c.lead}</p>
          <SpeedCompare className="mt-8 max-w-2xl" />

          <div className="mt-14 md:mt-20">
            <AuditTool />
          </div>
        </div>
      </section>

      <section className="border-t hairline bg-paper-2 py-20 md:py-28">
        <div className="container-x">
          <SectionHead index="01" eyebrow={c.checksHead[0]} title={c.checksHead[1]} lead={c.checksHead[2]} />
          <ol className="mt-12 border-t hairline">
            {c.checks.map((check, i) => (
              <li key={check.title} className="grid gap-2 border-b hairline py-7 md:grid-cols-12 md:gap-8">
                <p className="label-mono text-signal md:col-span-1">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="font-display text-2xl font-medium md:col-span-4">{check.title}</h3>
                <p className="max-w-prose text-pretty text-mute md:col-span-7">{check.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-x">
          <SectionHead index="02" eyebrow={c.faqHead[0]} title={c.faqHead[1]} />
          <dl className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {c.faq.map((f) => (
              <div key={f.q} className="border-t hairline pt-5">
                <dt className="font-display text-xl font-medium text-balance">{f.q}</dt>
                <dd className="mt-3 text-pretty text-mute">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBand source="audyt" title={c.ctaTitle} lead={c.ctaLead} />
    </>
  );
}
