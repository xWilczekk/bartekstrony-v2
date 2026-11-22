"use client";

import { useId, useState } from "react";
import { formatPrice } from "@/content/services";
import { useLocale } from "@/i18n/client";
import { cn } from "@/lib/utils";

const COPY = {
  pl: {
    from: "od",
    to: "do",
    month: " / mies.",
    monthly: "miesięcznie",
    live: "Szacunek na żywo",
    pick: "Wybierz, co budujemy — cena i termin pojawią się tutaj.",
    time: "Czas",
    talk: "Wycena po rozmowie",
    apps: "Aplikacje liczę indywidualnie. Opowiedz o pomyśle, a w 24h wrócę z kwotą i planem.",
    pickService: "Wybierz usługę — pokażę cenę na żywo.",
    estimate: "Szacunek",
  },
  en: {
    from: "from",
    to: "to",
    month: " / month",
    monthly: "per month",
    live: "Live estimate",
    pick: "Pick what we’re building — the price and timing will show up here.",
    time: "Time",
    talk: "Quoted after a call",
    apps: "I price apps individually. Tell me about the idea and within 24h I’ll get back with an amount and a plan.",
    pickService: "Pick a service — I’ll show the price live.",
    estimate: "Estimate",
  },
};
import { AnimatedNumber } from "./animated-number";
import type { Quote } from "./calc";

function Breakdown({ quote, className }: { quote: Quote; className?: string }) {
  const locale = useLocale();
  const c = COPY[locale];
  if (!quote.priced) return null;
  return (
    <dl className={cn("space-y-2 text-sm", className)}>
      {quote.lines.map((l) => (
        <div key={l.id} className="flex items-baseline justify-between gap-4">
          <dt className="text-mute">{l.label}</dt>
          <dd className="shrink-0 font-medium tabular-nums">
            {l.id === "base" ? `${c.from} ` : "+ "}
            {formatPrice(l.amount, locale)}
            {l.recurring && <span className="text-mute">{c.month}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function LivePanel({ quote }: { quote: Quote | null }) {
  const locale = useLocale();
  const c = COPY[locale];
  return (
    <div className="rounded-[var(--radius)] border border-line bg-paper-2 p-6">
      <p className="label-mono text-mute">{c.live}</p>
      {!quote ? (
        <p className="mt-6 max-w-[16rem] text-lg leading-snug text-balance">{c.pick}</p>
      ) : quote.priced ? (
        <>
          <p className="mt-6 flex items-baseline gap-2">
            <span className="label-mono text-mute">{c.from}</span>
            <AnimatedNumber
              value={quote.low}
              className="font-display text-[3.4rem] font-semibold leading-none tabular-nums xl:text-[4rem]"
            />
          </p>
          <p className="mt-2 flex items-baseline gap-2">
            <span className="label-mono text-mute">{c.to}</span>
            <AnimatedNumber value={quote.high} className="font-display text-3xl font-medium tabular-nums text-mute" />
          </p>
          {quote.recurring > 0 && (
            <p className="mt-3 text-sm text-mute">
              + <span className="tabular-nums">{formatPrice(quote.recurring, locale)}</span> {c.monthly}
            </p>
          )}
          <div className="mt-6 flex items-baseline justify-between gap-4 border-t hairline pt-4">
            <span className="label-mono text-mute">{c.time}</span>
            <span className="font-display text-xl font-semibold">{quote.duration}</span>
          </div>
          <Breakdown quote={quote} className="mt-5 border-t hairline pt-4" />
        </>
      ) : (
        <>
          <p className="mt-6 font-display text-4xl font-semibold leading-none">{c.talk}</p>
          <p className="mt-4 text-sm text-mute">{c.apps}</p>
        </>
      )}
    </div>
  );
}

export function LiveSheet({ quote }: { quote: Quote | null }) {
  const c = COPY[useLocale()];
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const hasDetails = !!quote?.priced;

  return (
    <div className="sticky bottom-0 z-30 -mx-[var(--gutter)] mt-8 border-t border-line bg-paper lg:hidden">
      {hasDetails && open && (
        <div id={panelId} className="max-h-[50dvh] overflow-y-auto px-[var(--gutter)] pt-4">
          <Breakdown quote={quote} />
        </div>
      )}
      <button
        type="button"
        onClick={() => hasDetails && setOpen((o) => !o)}
        aria-expanded={hasDetails ? open : undefined}
        aria-controls={hasDetails ? panelId : undefined}
        className="flex min-h-16 w-full items-center justify-between gap-4 px-[var(--gutter)] py-3 text-left"
      >
        {!quote ? (
          <span className="text-sm text-mute">{c.pickService}</span>
        ) : quote.priced ? (
          <>
            <span className="flex flex-col">
              <span className="label-mono text-mute">{c.estimate}</span>
              <span className="font-display text-xl font-semibold leading-tight tabular-nums">
                <span className="text-sm font-normal text-mute">{c.from} </span>
                <AnimatedNumber value={quote.low} />
                <span className="text-sm font-normal text-mute"> {c.to} </span>
                <AnimatedNumber value={quote.high} />
              </span>
            </span>
            <span className="flex shrink-0 items-center gap-2 text-right text-sm">
              <span className="font-medium">{quote.duration}</span>
              <svg
                aria-hidden
                viewBox="0 0 16 16"
                className={cn("size-4 transition-transform duration-300", open ? "rotate-180" : "")}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="m3 10 5-5 5 5" />
              </svg>
            </span>
          </>
        ) : (
          <span className="font-display text-xl font-semibold">{c.talk}</span>
        )}
      </button>
    </div>
  );
}
