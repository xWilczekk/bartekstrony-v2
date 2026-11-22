import { Suspense } from "react";
import Link from "next/link";
import { QuoteConfigurator } from "@/components/quote/configurator";
import { Accent } from "@/components/ui/section-head";
import { ButtonLink } from "@/components/ui/button";
import { CtaBand } from "@/components/ui/cta-band";
import { JsonLd } from "@/components/ui/json-ld";
import { localizeHref } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { breadcrumbs, pageMeta } from "@/lib/seo";

export const quoteMeta = {
  pl: pageMeta({
    title: "Wycena strony internetowej online — kalkulator",
    description:
      "Policz w 30 sekund, ile kosztuje strona internetowa, sklep albo redesign. Widełki cenowe i czas realizacji na żywo, bez podawania danych. Dokładna wycena w 24h.",
    path: "/wycena",
  }),
  en: pageMeta({
    title: "Online website quote — calculator",
    description:
      "Work out in 30 seconds what a website, an online store or a redesign costs. A live price range and delivery time, no personal details needed. An exact quote within 24h.",
    path: "/en/quote",
  }),
};

function ConfiguratorSkeleton() {
  return (
    <div aria-hidden className="min-h-[28rem]">
      <div className="grid grid-cols-6 gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-1 rounded-full bg-line" />
        ))}
      </div>
      <div className="mt-10 h-10 w-2/3 rounded-[var(--radius)] bg-paper-2" />
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 rounded-[var(--radius)] bg-paper-2" />
        ))}
      </div>
    </div>
  );
}

const COPY = {
  pl: {
    home: "Strona główna",
    crumb: "Wycena online",
    eyebrow: "(Kalkulator)",
    h1: (
      <>
        Policz, ile kosztuje <Accent>Twoja strona</Accent> — w 30&nbsp;sekund.
      </>
    ),
    lead: "Pięć krótkich pytań, cena i termin zmieniają się na żywo. Bez podawania maila i telefonu. Na końcu wysyłasz zapytanie jednym kliknięciem — albo wracasz do niego później z linku.",
    toolLabel: "Kalkulator wyceny",
    noscript: ["Kalkulator wymaga włączonego JavaScriptu. Ceny „od” znajdziesz w", "cenniku", ", a dokładną wycenę dostaniesz w 24 godziny po wiadomości przez", "formularz"],
    howTitle: "Jak liczę wycenę",
    how: [
      { t: "Cena bazowa", d: "Każda usługa ma cenę „od” dla prostego zakresu — tę samą, którą widzisz w cenniku." },
      { t: "Zakres i funkcje", d: "Dodatkowe podstrony, produkty, rezerwacje, płatności i integracje dokładam według stałych stawek." },
      { t: "Widełki od–do", d: "Dolna kwota to gładki przebieg, górna uwzględnia poprawki i niespodzianki. Dokładną cenę podaję po rozmowie." },
    ],
    pricing: "Zobacz pełny cennik",
    ctaTitle: (
      <>
        Wolisz porozmawiać? <Accent>Zadzwoń</Accent> albo napisz.
      </>
    ),
    ctaLead: "Wycena w 24h, bez zobowiązań. Odpowiem na każde pytanie, także te o cenę.",
  },
  en: {
    home: "Home",
    crumb: "Online quote",
    eyebrow: "(Calculator)",
    h1: (
      <>
        Work out what <Accent>your website</Accent> costs — in 30&nbsp;seconds.
      </>
    ),
    lead: "Five short questions, with the price and timing updating live. No e-mail or phone number needed. At the end you send the enquiry with one click — or come back to it later from the link.",
    toolLabel: "Quote calculator",
    noscript: ["The calculator needs JavaScript. You’ll find the “from” prices in the", "price list", ", and an exact quote within 24 hours after a message through the", "form"],
    howTitle: "How I calculate a quote",
    how: [
      { t: "Base price", d: "Every service has a “from” price for a simple scope — the same one you see in the price list." },
      { t: "Scope and features", d: "Extra pages, products, bookings, payments and integrations are added at fixed rates." },
      { t: "A from–to range", d: "The lower amount is a smooth ride, the upper one allows for revisions and surprises. I give the exact price after a call." },
    ],
    pricing: "See the full price list",
    ctaTitle: (
      <>
        Prefer to talk? <Accent>Call</Accent> or write.
      </>
    ),
    ctaLead: "A quote within 24h, no strings attached. I’ll answer every question, including the ones about price.",
  },
};

export function QuotePage() {
  const locale = getLocale();
  const c = COPY[locale];
  const href = (h: string) => localizeHref(h, locale);

  return (
    <>
      <JsonLd
        data={breadcrumbs([
          { name: c.home, path: href("/") },
          { name: c.crumb, path: href("/wycena") },
        ])}
      />

      <section className="container-x pt-[calc(var(--header-h)+3rem)] pb-8 md:pb-12">
        <p className="label-mono text-mute">
          <span className="text-signal">{c.eyebrow}</span> {c.crumb}
        </p>
        <h1 className="mt-5 max-w-4xl font-display text-[length:var(--text-huge)] font-semibold text-balance">{c.h1}</h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-pretty text-mute">{c.lead}</p>
      </section>

      <section className="container-x pb-20 md:pb-28" aria-label={c.toolLabel}>
        <Suspense fallback={<ConfiguratorSkeleton />}>
          <QuoteConfigurator />
        </Suspense>
        <noscript>
          <p className="rounded-[var(--radius)] border border-line p-5">
            {c.noscript[0]}{" "}
            <Link className="underline" href={href("/cennik")}>
              {c.noscript[1]}
            </Link>
            {c.noscript[2]}{" "}
            <Link className="underline" href={href("/kontakt")}>
              {c.noscript[3]}
            </Link>
            .
          </p>
        </noscript>
      </section>

      <section className="border-t hairline">
        <div className="container-x grid gap-10 py-16 md:py-20">
          <h2 className="label-mono text-mute">{c.howTitle}</h2>
          <div className="grid gap-10 sm:grid-cols-3">
            {c.how.map((h, i) => (
              <div key={h.t}>
                <p className="label-mono text-signal">0{i + 1}</p>
                <h3 className="mt-3 font-display text-2xl font-semibold">{h.t}</h3>
                <p className="mt-3 text-pretty text-mute">{h.d}</p>
              </div>
            ))}
          </div>
          <div>
            <ButtonLink href={href("/cennik")} variant="ghost" arrow>
              {c.pricing}
            </ButtonLink>
          </div>
        </div>
      </section>

      <CtaBand source="wycena" title={c.ctaTitle} lead={c.ctaLead} />
    </>
  );
}
