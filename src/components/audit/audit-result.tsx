"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { buttonClass, ButtonLink, Button } from "@/components/ui/button";
import { Accent } from "@/components/ui/section-head";
import { Reveal } from "@/components/ui/reveal";
import { localizeHref, type Locale } from "@/i18n/config";
import { useLocale } from "@/i18n/client";
import { cn, contactHref } from "@/lib/utils";
import type { AuditData } from "./psi";
import { auditTextFor, metricDefs, metricOrder, type CategoryId } from "./audit-copy";
import { PhoneFrame } from "./phone-frame";
import { RatingBadge, ScoreGauge } from "./score-gauge";

const GAUGES: CategoryId[] = ["performance", "seo", "accessibility", "best-practices"];

const BOUNCE = [
  { from: 1, to: 3, value: 32 },
  { from: 1, to: 5, value: 90 },
  { from: 1, to: 10, value: 123 },
] as const;

const COPY = {
  pl: {
    bounce: (from: number, to: number) => `z ${from} s do ${to} s`,
    about: "ok.",
    faster: "szybciej",
    less: "mniej",
    copyPrompt: "Skopiuj link:",
    result: "Wynik",
    mobileTest: "test mobilny",
    scoresLabel: "Wyniki w czterech kategoriach",
    method:
      "Test wykonał Google PageSpeed (Lighthouse) na symulowanym telefonie ze średniej półki i łączu 4G — tak, jak Twoją stronę widzi klient w terenie. Wynik 90–100 to dobrze, 50–89 do poprawy, poniżej 50 słabo.",
    shotAlt: (d: string) => `Tak wygląda strona ${d} na telefonie, w chwili zakończenia testu`,
    noShot: "Google nie zwróciło zrzutu ekranu tej strony.",
    phoneCaption: "Tak widzi Cię klient na telefonie",
    feels: "Co czuje Twój klient",
    field: "Dane od prawdziwych użytkowników · Chrome, ostatnie 28 dni",
    noField:
      "Google nie ma jeszcze wystarczająco danych od prawdziwych użytkowników tej strony — to normalne przy mniejszym ruchu. Powyższe wyniki pochodzą z testu laboratoryjnego.",
    top: (n: number) => (
      <>
        Top {n} <Accent>problemów</Accent> do naprawy
      </>
    ),
    none: (
      <>
        Nie znalazłem <Accent>poważnych</Accent> problemów
      </>
    ),
    biz: "Co to znaczy dla firmy",
    bizTitle: (
      <>
        Im dłużej się ładuje, tym więcej osób <Accent>wychodzi</Accent>.
      </>
    ),
    yours: (v: React.ReactNode) => (
      <>
        U Ciebie główna treść pojawia się po {v}. To punkt odniesienia, nie prognoza strat — dokładnego wpływu na Twoją
        sprzedaż nie da się wyliczyć z jednego testu.
      </>
    ),
    bounceIntro: "Gdy czas wczytania strony na telefonie rośnie, rośnie szansa, że klient od razu wyjdzie:",
    bounceSource:
      "Wzrost prawdopodobieństwa odrzucenia (bounce) względem strony ładowanej 1 s. Źródło: Google / SOASTA Research, „The Need for Mobile Speed”, 2017.",
    plus: (
      <>
        Dodatkowo: <strong>53%</strong> wizyt na stronach mobilnych jest porzucanych, jeśli ładowanie trwa dłużej niż 3 s{" "}
        <span className="text-mute">(Google / DoubleClick, 2016)</span>.
      </>
    ),
    next: "Następny krok",
    nextGood: (
      <>
        Teraz niech <Accent>znajdą</Accent> Cię klienci.
      </>
    ),
    nextFix: (
      <>
        Naprawmy to <Accent>razem</Accent>.
      </>
    ),
    describe: "Opisz w dwóch zdaniach, czym się zajmujesz — odpiszę z propozycją i wyceną w 24h. Bez zobowiązań.",
    call: "Zadzwoń:",
    newSite: "Zobacz, jak mogłaby wyglądać nowa",
    another: "Sprawdź inną stronę",
    copied: "Skopiowano link",
    copyLink: "Kopiuj link do tego testu",
    copiedSr: "Link skopiowany do schowka",
    rerun: "Link uruchomi test od nowa — wynik może się nieco różnić.",
  },
  en: {
    bounce: (from: number, to: number) => `from ${from} s to ${to} s`,
    about: "about",
    faster: "faster",
    less: "less",
    copyPrompt: "Copy the link:",
    result: "Result",
    mobileTest: "mobile test",
    scoresLabel: "Scores in four categories",
    method:
      "The test was run by Google PageSpeed (Lighthouse) on a simulated mid-range phone on 4G — the way a customer out and about sees your site. 90–100 is good, 50–89 needs work, below 50 is poor.",
    shotAlt: (d: string) => `What ${d} looks like on a phone when the test finished`,
    noShot: "Google didn’t return a screenshot of this site.",
    phoneCaption: "How customers see you on a phone",
    feels: "What your customer feels",
    field: "Data from real users · Chrome, last 28 days",
    noField:
      "Google doesn’t have enough data from real users of this site yet — that’s normal with less traffic. The results above come from a lab test.",
    top: (n: number) => (
      <>
        Top {n} <Accent>problems</Accent> to fix
      </>
    ),
    none: (
      <>
        I found no <Accent>serious</Accent> problems
      </>
    ),
    biz: "What it means for your business",
    bizTitle: (
      <>
        The longer it loads, the more people <Accent>leave</Accent>.
      </>
    ),
    yours: (v: React.ReactNode) => (
      <>
        On your site, the main content appears after {v}. That’s a reference point, not a forecast of losses — the exact
        effect on your sales can’t be calculated from one test.
      </>
    ),
    bounceIntro: "As the load time on a phone grows, so does the chance that the customer leaves straight away:",
    bounceSource:
      "Increase in bounce probability compared with a page that loads in 1 s. Source: Google / SOASTA Research, “The Need for Mobile Speed”, 2017.",
    plus: (
      <>
        Also: <strong>53%</strong> of mobile site visits are abandoned if loading takes longer than 3 s{" "}
        <span className="text-mute">(Google / DoubleClick, 2016)</span>.
      </>
    ),
    next: "Next step",
    nextGood: (
      <>
        Now let customers <Accent>find</Accent> you.
      </>
    ),
    nextFix: (
      <>
        Let’s fix it <Accent>together</Accent>.
      </>
    ),
    describe: "Describe what you do in two sentences — I’ll reply with a proposal and a quote within 24h. No strings attached.",
    call: "Call:",
    newSite: "See what a new one could look like",
    another: "Check another site",
    copied: "Link copied",
    copyLink: "Copy the link to this test",
    copiedSr: "Link copied to the clipboard",
    rerun: "The link runs the test again — the result may differ slightly.",
  },
};

function fmtSavings(locale: Locale, ms?: number, bytes?: number) {
  const c = COPY[locale];
  const t = auditTextFor(locale);
  if (ms) return `${c.about} ${t.fmtSeconds(ms)} ${c.faster}`;
  if (bytes) {
    const kb = bytes / 1024;
    return kb >= 1024
      ? `${c.about} ${(kb / 1024).toLocaleString(t.numberLocale, { maximumFractionDigits: 1 })} MB ${c.less}`
      : `${c.about} ${Math.round(kb).toLocaleString(t.numberLocale)} KB ${c.less}`;
  }
  return null;
}

export function AuditResult({ data, onReset }: { data: AuditData; onReset: () => void }) {
  const locale = useLocale();
  const c = COPY[locale];
  const t = auditTextFor(locale);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const perf = data.scores.performance;
  const lcp = data.metrics.find((m) => m.id === "lcp")?.value ?? null;
  const verdict = t.buildVerdict(data.scores, lcp);
  const date = new Date(data.fetchedAt).toLocaleDateString(t.numberLocale, { day: "numeric", month: "long", year: "numeric" });

  const shareUrl = `${site.url}${localizeHref(`/audyt?url=${encodeURIComponent(data.display)}`, locale)}`;
  async function copy() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt(c.copyPrompt, shareUrl);
    }
  }

  const leadHref = localizeHref(
    contactHref({
      zrodlo: "audyt",
      url: data.url,
      wynik: perf ?? undefined,
      usluga: verdict.usluga,
    }),
    locale,
  );

  return (
    <div className="grid gap-16 md:gap-24">
      <section aria-labelledby="audit-verdict" className="border-t hairline pt-6">
        <p className="label-mono text-mute">
          {c.result} · {data.display} · {c.mobileTest} · {date}
        </p>
        <h2
          id="audit-verdict"
          ref={headingRef}
          tabIndex={-1}
          className="mt-5 max-w-5xl font-display text-[length:var(--text-huge)] font-semibold text-balance outline-none"
        >
          {verdict.pre}
          <Accent>{verdict.accent}</Accent>
          {verdict.post}
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-mute">{verdict.lead}</p>
      </section>

      <section aria-label={c.scoresLabel} className="grid gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-7">
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4">
            {GAUGES.map((id, i) => (
              <ScoreGauge
                key={id}
                label={t.categoryLabel[id]}
                hint={t.categoryHint[id]}
                score={data.scores[id]}
                size={120}
                delay={i * 0.12}
              />
            ))}
          </div>
          <p className="mt-10 max-w-xl text-sm leading-relaxed text-mute">{c.method}</p>
        </div>

        <div className="md:col-span-5">
          <PhoneFrame>
            {data.screenshot ? (
              // eslint-disable-next-line @next/next/no-img-element -- data: URI from the API, nothing to optimise
              <img
                src={data.screenshot}
                alt={c.shotAlt(data.display)}
                className="size-full object-cover object-top"
              />
            ) : (
              <div className="grid size-full place-items-center p-6 text-center text-sm text-mute">
                {c.noShot}
              </div>
            )}
          </PhoneFrame>
          <p className="label-mono mt-5 text-center text-mute">{c.phoneCaption}</p>
        </div>
      </section>

      <section aria-labelledby="audit-metrics">
        <h3 id="audit-metrics" className="font-display text-[length:var(--text-big)] font-semibold">
          {c.feels}
        </h3>
        <ul className="mt-8 border-t hairline">
          {metricOrder.map((id) => {
            const m = data.metrics.find((x) => x.id === id);
            if (!m) return null;
            const def = { ...t.metric(id), code: metricDefs[id].code };
            const value = def.format(m.value);
            return (
              <li
                key={id}
                className="grid items-center gap-x-8 gap-y-3 border-b hairline py-6 md:grid-cols-12"
              >
                <div className="md:col-span-3">
                  <p className="font-display text-xl font-medium">{def.name}</p>
                  <p className="label-mono mt-1 text-mute">{def.code}</p>
                </div>
                <p className="max-w-prose text-pretty text-mute md:col-span-5">{def.sentence(m.value)}</p>
                <p className="font-display text-3xl font-medium tabular-nums md:col-span-2 md:text-right">
                  {value}
                  <span className="sr-only"> — {t.ratingLabel[m.rating]}</span>
                </p>
                <div className="flex flex-col items-start gap-1 md:col-span-2 md:items-end">
                  <RatingBadge rating={m.rating} />
                  <span className="text-xs text-mute">{def.bench}</span>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 rounded-[var(--radius)] bg-paper-2 p-5 text-sm leading-relaxed">
          {data.field ? (
            <>
              <p className="label-mono text-mute">{c.field}</p>
              <ul className="mt-3 flex flex-wrap gap-x-10 gap-y-3">
                {data.field.metrics.map((f) => (
                  <li key={f.label} className="flex items-center gap-3">
                    <span>{f.label}:</span>
                    <strong className="font-display text-lg font-medium tabular-nums">{f.valueText}</strong>
                    <RatingBadge rating={f.rating} />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-mute">{c.noField}</p>
          )}
        </div>
      </section>

      <section aria-labelledby="audit-problems">
        <h3 id="audit-problems" className="font-display text-[length:var(--text-big)] font-semibold">
          {data.problems.length > 0 ? c.top(data.problems.length) : c.none}
        </h3>
        {data.problems.length > 0 && (
          <ol className="mt-8 border-t hairline">
            {data.problems.map((p, i) => {
              const sv = fmtSavings(locale, p.savingsMs, p.savingsBytes);
              return (
                <li key={p.id} className="grid gap-x-8 gap-y-2 border-b hairline py-7 md:grid-cols-12">
                  <p className="label-mono text-signal md:col-span-1">{String(i + 1).padStart(2, "0")}</p>
                  <div className="md:col-span-5">
                    <p className="font-display text-2xl leading-[1.05] font-medium text-balance">{p.title}</p>
                    <p className="label-mono mt-2 text-mute">{t.categoryLabel[p.category]}</p>
                  </div>
                  <p className="max-w-prose text-pretty text-mute md:col-span-4">{p.why}</p>
                  <p className="label-mono md:col-span-2 md:text-right">{sv ?? ""}</p>
                </li>
              );
            })}
          </ol>
        )}
      </section>

      {verdict.tone !== "good" && (
        <Reveal>
          <section aria-labelledby="audit-biz" className="theme-ink rounded-[var(--radius)] p-6 md:p-12">
            <div className="grid gap-10 md:grid-cols-12">
              <div className="md:col-span-5">
                <p className="label-mono text-mute">{c.biz}</p>
                <h3 id="audit-biz" className="mt-4 font-display text-[length:var(--text-big)] font-semibold text-balance">
                  {c.bizTitle}
                </h3>
                {lcp !== null && (
                  <p className="mt-6 text-mute">{c.yours(<strong className="text-paper">{t.fmtSeconds(lcp)}</strong>)}</p>
                )}
              </div>
              <div className="md:col-span-7">
                <p className="text-lg text-pretty">{c.bounceIntro}</p>
                <ul className="mt-6 grid gap-4">
                  {BOUNCE.map((b) => (
                    <li key={b.to} className="grid grid-cols-[7.5rem_1fr_3.5rem] items-center gap-4">
                      <span className="label-mono text-mute">{c.bounce(b.from, b.to)}</span>
                      <span className="h-2 rounded-full bg-paper/10" aria-hidden>
                        <span className="block h-full rounded-full bg-paper" style={{ width: `${(b.value / 123) * 100}%` }} />
                      </span>
                      <span className="font-display text-xl font-medium tabular-nums">+{b.value}%</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-mute">{c.bounceSource}</p>
                <p className="mt-6 text-pretty">{c.plus}</p>
              </div>
            </div>
          </section>
        </Reveal>
      )}

      <section aria-labelledby="audit-cta" className="rounded-[var(--radius)] bg-paper-2 p-6 md:p-12">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-6">
            <p className="label-mono text-mute">{c.next}</p>
            <h3 id="audit-cta" className="mt-4 font-display text-[length:var(--text-huge)] font-semibold text-balance">
              {verdict.tone === "good" ? c.nextGood : c.nextFix}
            </h3>
            <p className="mt-5 max-w-md text-mute">{c.describe}</p>
          </div>
          <div className="flex flex-col items-start gap-3 md:col-span-6 md:items-end">
            <ButtonLink href={leadHref} variant="signal" size="lg" arrow className="h-auto min-h-14 py-3 text-left">
              {verdict.ctaLabel}
            </ButtonLink>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <a href={site.phoneHref} className={buttonClass("ghost", "md")}>
                <span className="relative">
                  {c.call} {site.phone}
                </span>
              </a>
              <ButtonLink href={localizeHref("/twoja-strona", locale)} variant="ghost">
                {c.newSite}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t hairline pt-6">
        <Button variant="ink" onClick={onReset}>
          {c.another}
        </Button>
        <button
          type="button"
          onClick={copy}
          className={cn("label-mono px-1 py-3 underline-offset-4 hover:underline", copied && "text-signal")}
        >
          {copied ? c.copied : c.copyLink}
        </button>
        <span className="sr-only" role="status" aria-live="polite">
          {copied ? c.copiedSr : ""}
        </span>
        <p className="text-xs text-mute">{c.rerun}</p>
      </div>
    </div>
  );
}
