"use client";

import { useMemo, useState } from "react";
import { AnimatedNumber } from "@/components/quote/animated-number";
import { computeQuote, defaultScope, scopeLabel, stateToParams, initialState, type QuoteState } from "@/components/quote/calc";
import { ButtonLink } from "@/components/ui/button";
import { pricingFor, type QuoteServiceSlug } from "@/content/pricing";
import { localizeHref } from "@/i18n/config";
import { useLocale } from "@/i18n/client";
import { cn } from "@/lib/utils";

const COPY = {
  pl: {
    calc: "Kalkulator",
    sec: "30 sekund",
    title: "Policz, ile kosztuje Twoja strona",
    what: "Co budujemy?",
    pages: "Podstrony",
    products: "Produkty",
    estimate: "Szacunek",
    from: "od",
    to: "do",
    refine: "Dopracuj wycenę",
    more: "Jeszcze 3 pytania: funkcje, treści i termin.",
  },
  en: {
    calc: "Calculator",
    sec: "30 seconds",
    title: "Work out what your website costs",
    what: "What are we building?",
    pages: "Pages",
    products: "Products",
    estimate: "Estimate",
    from: "from",
    to: "to",
    refine: "Refine the quote",
    more: "Just 3 more questions: features, content and timing.",
  },
};

const choices: QuoteServiceSlug[] = ["landing-page", "strona-firmowa", "sklep-internetowy"];

export function QuoteTeaser() {
  const locale = useLocale();
  const c = COPY[locale];
  const { quoteServices } = pricingFor(locale);
  const [slug, setSlug] = useState<QuoteServiceSlug>("strona-firmowa");
  const [scope, setScope] = useState(defaultScope("strona-firmowa"));

  const svc = quoteServices[slug];
  const state = useMemo<QuoteState>(() => ({ ...initialState, service: slug, scope }), [slug, scope]);
  const quote = useMemo(() => computeQuote(state, locale), [state, locale]);

  const sc = svc.scope;
  const min = sc.kind === "slider" ? sc.min : 0;
  const max = sc.kind === "slider" ? sc.max : sc.kind === "steps" ? sc.steps.length - 1 : 0;
  const qs = stateToParams(state, 2).toString();

  return (
    <div className="grid gap-8 rounded-[var(--radius)] bg-paper-2 p-6 md:grid-cols-12 md:gap-12 md:p-10">
      <div className="md:col-span-7">
        <p className="label-mono text-mute">
          <span className="text-signal">{c.calc}</span> · {c.sec}
        </p>
        <h3 className="mt-3 font-display text-[length:var(--text-big)] font-semibold text-balance">
          {c.title}
        </h3>

        <fieldset className="mt-6">
          <legend className="sr-only">{c.what}</legend>
          <div className="flex flex-wrap gap-2">
            {choices.map((ch) => (
              <label key={ch} className="relative cursor-pointer">
                <input
                  type="radio"
                  name="teaser-usluga"
                  value={ch}
                  checked={slug === ch}
                  onChange={() => {
                    setSlug(ch);
                    setScope(defaultScope(ch));
                  }}
                  className="peer sr-only"
                />
                <span
                  className={cn(
                    "inline-flex h-11 items-center rounded-full border px-5 text-[0.95rem] transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-signal",
                    slug === ch ? "border-ink bg-ink text-paper" : "border-ink/25 hover:border-ink",
                  )}
                >
                  {quoteServices[ch].label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-7">
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor="teaser-scope" className="label-mono text-mute">
              {sc.kind === "slider" ? c.pages : c.products}
            </label>
            <output htmlFor="teaser-scope" className="font-display text-xl font-semibold">
              {scopeLabel(svc, scope, locale)}
            </output>
          </div>
          <input
            id="teaser-scope"
            type="range"
            min={min}
            max={max}
            step={1}
            value={scope}
            onChange={(e) => setScope(Number(e.target.value))}
            className="mt-2 h-11 w-full cursor-pointer accent-[var(--signal)]"
          />
        </div>
      </div>

      <div className="flex flex-col justify-between gap-6 border-t hairline pt-6 md:col-span-5 md:border-t-0 md:border-l md:pt-0 md:pl-10">
        <div aria-live="polite">
          <p className="label-mono text-mute">{c.estimate}</p>
          {quote?.priced && (
            <>
              <p className="mt-3 flex items-baseline gap-2">
                <span className="label-mono text-mute">{c.from}</span>
                <AnimatedNumber
                  value={quote.low}
                  className="font-display text-[clamp(2.75rem,6vw,4.25rem)] font-semibold leading-none tabular-nums"
                />
              </p>
              <p className="mt-2 text-mute">
                {c.to} <AnimatedNumber value={quote.high} className="tabular-nums" /> · {quote.duration}
              </p>
            </>
          )}
        </div>
        <div>
          <ButtonLink href={localizeHref(`/wycena?${qs}`, locale)} variant="signal" size="lg" arrow className="w-full sm:w-auto">
            {c.refine}
          </ButtonLink>
          <p className="mt-3 text-sm text-mute">{c.more}</p>
        </div>
      </div>
    </div>
  );
}
