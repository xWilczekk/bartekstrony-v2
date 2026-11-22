"use client";

import { useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/content/site";
import { formatPrice } from "@/content/services";
import { addonsForLocale } from "@/content/pricing";
import { localizeHref } from "@/i18n/config";
import { useLocale } from "@/i18n/client";
import { contactHref } from "@/lib/utils";
import { AnimatedNumber } from "./animated-number";
import type { Quote, QuoteState } from "./calc";

const COPY = {
  pl: {
    next: [
      { t: "Wysyłasz zapytanie", d: "Zajmuje to kilkanaście sekund. Wszystko z kalkulatora wpisuje się samo." },
      { t: "W 24 godziny wracam z konkretną wyceną", d: "Jedna kwota, termin i lista tego, co dostajesz. Bez zobowiązań." },
      { t: "Krótka rozmowa, jeśli chcesz", d: "15 minut telefonem lub online, żeby doprecyzować szczegóły." },
    ],
    service: "Usługa",
    scope: "Zakres",
    features: "Funkcje",
    basicsOnly: "tylko podstawa",
    spec: "Specyfikacja",
    specHave: "mam opis lub makiety",
    specHelp: "pomóż doprecyzować",
    content: "Treści",
    contentValue: (texts: boolean, photos: boolean, logo: boolean) =>
      `teksty: ${texts ? "mam" : "napiszesz"}, zdjęcia: ${photos ? "mam" : "pomożesz"}, logo: ${logo ? "mam" : "potrzebuję"}`,
    timing: "Termin",
    express: "ekspres",
    standard: "standardowy",
    yours: "Twój szacunek",
    from: "od",
    to: "do",
    recurring: (v: string) => `Do tego ${v} miesięcznie (opieka). Płacisz, dopóki jej potrzebujesz.`,
    talk: "Wycena po rozmowie",
    time: "Czas realizacji",
    notOffer: "To szacunek, nie oferta. Dokładną kwotę dostaniesz po krótkiej rozmowie, w ciągu 24 godzin.",
    apps: "Aplikacje wyceniam indywidualnie. Opowiedz o pomyśle, a wrócę z kwotą i planem.",
    send: "Wyślij to zapytanie",
    call: "Zadzwoń:",
    summary: "Podsumowanie wyborów",
    change: "zmień",
    changeAria: "Zmień:",
    why: "Skąd ta kwota",
    month: " / mies.",
    range:
      "Widełki „od–do” biorą się z tego, ile poprawek i ustaleń będzie po drodze. Dolna kwota to scenariusz, w którym wszystko idzie gładko.",
    whatNext: "Co dalej",
    copy: "Skopiuj link do tej wyceny",
    copied: "Skopiowano",
  },
  en: {
    next: [
      { t: "You send the enquiry", d: "It takes a few seconds. Everything from the calculator fills in by itself." },
      { t: "Within 24 hours I get back with a specific quote", d: "One amount, a deadline and a list of what you get. No strings attached." },
      { t: "A short call, if you like", d: "15 minutes by phone or online to pin down the details." },
    ],
    service: "Service",
    scope: "Scope",
    features: "Features",
    basicsOnly: "basics only",
    spec: "Specification",
    specHave: "I have a description or mock-ups",
    specHelp: "help me define it",
    content: "Content",
    contentValue: (texts: boolean, photos: boolean, logo: boolean) =>
      `copy: ${texts ? "I have it" : "you write it"}, photos: ${photos ? "I have them" : "you help"}, logo: ${logo ? "I have one" : "I need one"}`,
    timing: "Timing",
    express: "express",
    standard: "standard",
    yours: "Your estimate",
    from: "from",
    to: "to",
    recurring: (v: string) => `Plus ${v} per month (care). You pay for as long as you need it.`,
    talk: "Quoted after a call",
    time: "Delivery time",
    notOffer: "This is an estimate, not an offer. You’ll get the exact amount after a short call, within 24 hours.",
    apps: "I price apps individually. Tell me about the idea and I’ll get back with an amount and a plan.",
    send: "Send this enquiry",
    call: "Call:",
    summary: "Your choices",
    change: "change",
    changeAria: "Change:",
    why: "Where the amount comes from",
    month: " / month",
    range:
      "The from–to range depends on how many revisions and decisions come up along the way. The lower amount is the scenario where everything goes smoothly.",
    whatNext: "What happens next",
    copy: "Copy the link to this quote",
    copied: "Copied",
  },
};

export function ResultView({
  quote,
  state,
  onJump,
}: {
  quote: Quote;
  state: QuoteState;
  onJump: (step: number) => void;
}) {
  const locale = useLocale();
  const c = COPY[locale];
  const [copied, setCopied] = useState(false);
  const svc = quote.service;
  const isApp = svc.slug === "aplikacje-ai";

  const href = localizeHref(
    contactHref({
      zrodlo: "wycena",
      usluga: svc.slug,
      budzet: quote.priced ? quote.mid : undefined,
      opis: quote.summary,
    }),
    locale,
  );

  const chosen = addonsForLocale(svc.slug, locale).filter((a) => state.addons.includes(a.id));

  const rows: { label: string; value: string; step: number }[] = [
    { label: c.service, value: svc.label, step: 0 },
    { label: c.scope, value: quote.scopeLabel, step: 1 },
    { label: c.features, value: chosen.length ? chosen.map((a) => a.short).join(", ") : c.basicsOnly, step: 2 },
    isApp
      ? { label: c.spec, value: state.texts === "have" ? c.specHave : c.specHelp, step: 3 }
      : {
          label: c.content,
          value: c.contentValue(state.texts === "have", state.photos === "have", state.logo === "have"),
          step: 3,
        },
    { label: c.timing, value: state.speed === "express" ? c.express : c.standard, step: 4 },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div>
      <div className="rounded-[var(--radius)] bg-ink p-6 text-paper sm:p-8">
        <p className="label-mono text-mute-ink">{c.yours}</p>
        {quote.priced ? (
          <>
            <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-display font-semibold">
              <span className="label-mono text-mute-ink">{c.from}</span>
              <AnimatedNumber value={quote.low} className="text-[clamp(2.75rem,10vw,5.25rem)] leading-none tabular-nums" />
              <span className="label-mono text-mute-ink">{c.to}</span>
              <AnimatedNumber
                value={quote.high}
                className="text-[clamp(1.75rem,6vw,3rem)] leading-none text-mute-ink tabular-nums"
              />
            </p>
            {quote.recurring > 0 && (
              <p className="mt-3 text-sm text-mute-ink">
                {c.recurring(formatPrice(quote.recurring, locale))}
              </p>
            )}
          </>
        ) : (
          <p className="mt-5 font-display text-[clamp(2.25rem,8vw,4rem)] font-semibold leading-none">
            {c.talk}
          </p>
        )}
        <div className="mt-8 flex flex-wrap items-baseline gap-x-8 gap-y-2 border-t border-line-ink pt-5">
          <p>
            <span className="label-mono text-mute-ink">{c.time}</span>
            <span className="mt-1 block font-display text-2xl font-semibold">{quote.duration}</span>
          </p>
          <p className="max-w-sm text-sm leading-snug text-mute-ink">
            {quote.priced ? c.notOffer : c.apps}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <ButtonLink href={href} variant="signal" size="lg" arrow>
          {c.send}
        </ButtonLink>
        <a
          href={site.phoneHref}
          className="inline-flex h-14 items-center rounded-full border border-current/25 px-7 font-medium tracking-tight transition-colors hover:border-current"
        >
          {c.call} {site.phone}
        </a>
      </div>

      <h3 className="label-mono mt-12 border-t hairline pt-5 text-mute">{c.summary}</h3>
      <dl className="mt-2 divide-y divide-line">
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-[6.5rem_1fr_auto] items-baseline gap-x-4 py-3 sm:grid-cols-[9rem_1fr_auto]">
            <dt className="label-mono text-mute">{r.label}</dt>
            <dd className="text-pretty">{r.value}</dd>
            <dd>
              <button
                type="button"
                onClick={() => onJump(r.step)}
                className="label-mono min-h-11 px-1 text-mute underline-offset-4 hover:text-ink hover:underline"
                aria-label={`${c.changeAria} ${r.label}`}
              >
                {c.change}
              </button>
            </dd>
          </div>
        ))}
      </dl>

      {quote.priced && (
        <>
          <h3 className="label-mono mt-10 border-t hairline pt-5 text-mute">{c.why}</h3>
          <dl className="mt-3 space-y-2 text-sm">
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
          <p className="mt-3 text-sm text-mute">{c.range}</p>
        </>
      )}

      <h3 className="label-mono mt-10 border-t hairline pt-5 text-mute">{c.whatNext}</h3>
      <ol className="mt-4 space-y-5">
        {c.next.map((s, i) => (
          <li key={s.t} className="grid grid-cols-[2.5rem_1fr] gap-x-2">
            <span className="label-mono pt-1 text-signal">0{i + 1}</span>
            <span>
              <span className="block font-medium">{s.t}</span>
              <span className="mt-0.5 block text-sm text-mute">{s.d}</span>
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex flex-wrap items-center gap-4 border-t hairline pt-6">
        <button
          type="button"
          onClick={copyLink}
          className="label-mono min-h-11 text-mute underline-offset-4 hover:text-ink hover:underline"
        >
          {c.copy}
        </button>
        <span role="status" className="label-mono text-ink">
          {copied ? c.copied : ""}
        </span>
      </div>
    </div>
  );
}
