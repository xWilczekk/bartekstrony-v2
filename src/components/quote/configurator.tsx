"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { pricingFor, quoteSteps } from "@/content/pricing";
import { formatPrice } from "@/content/services";
import type { Locale } from "@/i18n/config";
import { useLocale } from "@/i18n/client";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { computeQuote, paramsFromUrl, stateToParams, type QuoteState } from "./calc";
import { LivePanel, LiveSheet } from "./live-panel";
import { ResultView } from "./result-view";
import { StepAddons, StepContent, StepScope, StepService, StepSpeed } from "./step-views";

const LAST_STEP = quoteSteps.length - 1;

const STEP_EN = {
  service: { title: "What are we building?", hint: "Pick the closest one. It costs you nothing and commits you to nothing." },
  scope: "Scope",
  addonsApp: "What should the app be able to do?",
  addons: "Which features do you need?",
  addonsHint: "Tick what should be there at launch. You can add the rest later.",
  contentApp: { title: "What do you already have?", hint: "The more I know at the start, the more accurate the quote." },
  content: { title: "Content and photos", hint: "What do you have ready, and what should I help with?" },
  speed: { title: "How soon should it be ready?", hint: "I do most projects within the standard timeline." },
  result: "Your quote",
};

function stepCopy(step: number, state: QuoteState, locale: Locale): { title: string; hint?: string } {
  const svc = state.service ? pricingFor(locale).quoteServices[state.service] : null;
  if (locale === "en") {
    const e = STEP_EN;
    switch (step) {
      case 0:
        return e.service;
      case 1:
        return { title: svc?.scope.question ?? e.scope, hint: svc?.scope.hint };
      case 2:
        return { title: svc?.slug === "aplikacje-ai" ? e.addonsApp : e.addons, hint: e.addonsHint };
      case 3:
        return svc?.slug === "aplikacje-ai" ? e.contentApp : e.content;
      case 4:
        return e.speed;
      default:
        return { title: e.result };
    }
  }
  switch (step) {
    case 0:
      return { title: "Co budujemy?", hint: "Wybierz najbliższe. Nic Cię to nie kosztuje i nic nie wiąże." };
    case 1:
      return { title: svc?.scope.question ?? "Zakres", hint: svc?.scope.hint };
    case 2:
      return {
        title: svc?.slug === "aplikacje-ai" ? "Co ma umieć aplikacja?" : "Jakich funkcji potrzebujesz?",
        hint: "Zaznacz, co ma być na starcie. Resztę możesz dołożyć później.",
      };
    case 3:
      return svc?.slug === "aplikacje-ai"
        ? { title: "Co już masz?", hint: "Im więcej wiem na początku, tym trafniejsza wycena." }
        : { title: "Treści i zdjęcia", hint: "Co masz gotowe, a w czym mam Ci pomóc?" };
    case 4:
      return { title: "Jak szybko ma być gotowe?", hint: "Większość projektów robię w standardowym terminie." };
    default:
      return { title: "Twoja wycena" };
  }
}

export function QuoteConfigurator() {
  const locale = useLocale();
  const en = locale === "en";
  const steps = pricingFor(locale).quoteSteps;
  const params = useSearchParams();
  const headingId = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);

  const [init] = useState(() => paramsFromUrl((k) => params.get(k)));
  const [state, setState] = useState<QuoteState>(init.state);
  const [step, setStep] = useState(init.step);
  const [reached, setReached] = useState(init.step);

  const quote = useMemo(() => computeQuote(state, locale), [state, locale]);
  const set = (patch: Partial<QuoteState>) => setState((s) => ({ ...s, ...patch }));

  const loadedQs = useRef(stateToParams(init.state, init.step).toString());
  const touched = useRef(false);
  useEffect(() => {
    const qs = stateToParams(state, step).toString();
    if (!touched.current && qs === loadedQs.current) return;
    touched.current = true;
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [state, step]);

  const prevStep = useRef(step);
  useEffect(() => {
    if (prevStep.current === step) return;
    prevStep.current = step;
    headingRef.current?.focus();
  }, [step]);

  function go(n: number) {
    const target = Math.min(Math.max(n, 0), LAST_STEP);
    if (target > 0 && !state.service) return;
    if (target === LAST_STEP && step !== LAST_STEP) {
      track("wycena-wynik", { usluga: state.service ?? undefined, kwota: quote?.priced ? quote.mid : undefined, jezyk: locale });
    }
    setStep(target);
    setReached((r) => Math.max(r, target));
  }

  const copy = stepCopy(step, state, locale);
  const isResult = step === LAST_STEP;
  const canNext = step !== 0 || !!state.service;

  const live = quote
    ? quote.priced
      ? en
        ? `Estimate: from ${formatPrice(quote.low, locale)} to ${formatPrice(quote.high, locale)}, delivery time ${quote.duration}.`
        : `Szacunek: od ${formatPrice(quote.low, locale)} do ${formatPrice(quote.high, locale)}, czas realizacji ${quote.duration}.`
      : en
        ? "Quoted after a call."
        : "Wycena po rozmowie."
    : "";

  return (
    <div className="flex min-h-[calc(100dvh-var(--header-h)-3rem)] flex-col">
      <nav aria-label={en ? "Calculator progress" : "Postęp kalkulatora"}>
        <ol className="grid grid-cols-6 gap-1.5 sm:gap-2">
          {steps.map((label, i) => {
            const status = i === step ? "current" : i <= reached ? "done" : "todo";
            return (
              <li key={label}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  disabled={i > reached}
                  aria-current={i === step ? "step" : undefined}
                  aria-label={`${en ? "Step" : "Krok"} ${i + 1}: ${label}`}
                  className="group block w-full py-3 text-left disabled:cursor-default sm:py-2"
                >
                  <span
                    className={cn(
                      "block h-1 rounded-full transition-colors duration-300",
                      status === "current" ? "bg-signal" : status === "done" ? "bg-ink" : "bg-line",
                    )}
                  />
                  <span
                    className={cn(
                      "label-mono mt-2 hidden sm:block",
                      status === "current" ? "text-ink" : "text-mute",
                    )}
                  >
                    <span className="mr-1.5">0{i + 1}</span>
                    {label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        <p className="label-mono mt-1 text-mute sm:hidden">
          {en ? "Step" : "Krok"} {step + 1} {en ? "of" : "z"} {steps.length} — <span className="text-ink">{steps[step]}</span>
        </p>
      </nav>

      <p className="sr-only" aria-live="polite">
        {live}
      </p>

      <div className="mt-8 grid flex-1 gap-x-14 gap-y-8 lg:grid-cols-12">
        <div className={isResult ? "lg:col-span-12 lg:max-w-3xl" : "lg:col-span-7 xl:col-span-8"}>
          <style href="bs-quote-step" precedence="default">
            {`@keyframes bs-step-in{from{opacity:0;translate:0 14px}}.bs-step-in{animation:bs-step-in .45s cubic-bezier(.16,1,.3,1) both}@media (prefers-reduced-motion:reduce){.bs-step-in{animation:none}}`}
          </style>
          <div key={step} className="bs-step-in">
            <h2
              id={headingId}
              ref={headingRef}
              tabIndex={-1}
              className="font-display text-[length:var(--text-big)] font-semibold text-balance outline-none"
            >
              {copy.title}
            </h2>
            {copy.hint && <p className="mt-3 max-w-xl text-pretty text-mute">{copy.hint}</p>}

            {isResult && quote ? (
              <div className="mt-8">
                <ResultView quote={quote} state={state} onJump={go} />
                <div className="mt-8">
                  <Button type="button" variant="ghost" onClick={() => go(step - 1)}>
                    {en ? "← Back" : "← Wstecz"}
                  </Button>
                </div>
              </div>
            ) : (
              <form
                className="mt-8"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (canNext) go(step + 1);
                }}
              >
                {step === 0 && <StepService state={state} set={set} labelId={headingId} />}
                {step === 1 && <StepScope state={state} set={set} labelId={headingId} />}
                {step === 2 && <StepAddons state={state} set={set} labelId={headingId} />}
                {step === 3 && <StepContent state={state} set={set} labelId={headingId} />}
                {step === 4 && <StepSpeed state={state} set={set} labelId={headingId} />}

                <div className="mt-10 flex flex-wrap items-center gap-3">
                  {step > 0 && (
                    <Button type="button" variant="ghost" size="lg" onClick={() => go(step - 1)}>
                      {en ? "← Back" : "← Wstecz"}
                    </Button>
                  )}
                  <Button type="submit" variant={step === 4 ? "signal" : "ink"} size="lg" disabled={!canNext} arrow>
                    {step === 4 ? (en ? "Show the quote" : "Pokaż wycenę") : en ? "Next" : "Dalej"}
                  </Button>
                  {!canNext && (
                    <span className="text-sm text-mute">{en ? "Pick a service to continue." : "Wybierz usługę, żeby przejść dalej."}</span>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>

        {!isResult && (
          <aside className="hidden lg:col-span-5 lg:block xl:col-span-4" aria-label={en ? "Live price estimate" : "Szacunek ceny na żywo"}>
            <div className="sticky top-[calc(var(--header-h)+24px)]">
              <LivePanel quote={quote} />
            </div>
          </aside>
        )}
      </div>

      {!isResult && <LiveSheet quote={quote} />}
    </div>
  );
}
