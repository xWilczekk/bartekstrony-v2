"use client";

import { useState } from "react";
import { useLocale } from "@/i18n/client";
import { cn } from "@/lib/utils";
import { ScoreGauge } from "./score-gauge";

const EXAMPLES = {
  before: {
    label: "Dziś",
    scores: [38, 71, 64, 79],
    lcp: "6,1 s",
    line: "Klient czeka na główną treść ponad 6 sekund.",
  },
  after: {
    label: "Po przebudowie",
    scores: [97, 100, 96, 100],
    lcp: "1,3 s",
    line: "Ta sama firma, nowa strona: treść widać od razu.",
  },
} as const;

const EXAMPLES_EN = {
  before: { label: "Today", lcp: "6.1 s", line: "The customer waits over 6 seconds for the main content." },
  after: { label: "After the rebuild", lcp: "1.3 s", line: "Same business, new site: the content shows up straight away." },
} as const;

const GAUGES = {
  pl: ["Wydajność", "SEO", "Dostępność", "Dobre praktyki"],
  en: ["Performance", "SEO", "Accessibility", "Best practices"],
} as const;

export function TeaserExample() {
  const [mode, setMode] = useState<keyof typeof EXAMPLES>("before");
  const en = useLocale() === "en";
  const ex = en ? { ...EXAMPLES[mode], ...EXAMPLES_EN[mode] } : EXAMPLES[mode];

  return (
    <div className="rounded-[var(--radius)] border border-line bg-ink-2 p-5 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="label-mono text-mute">{en ? "Example: a typical local business website" : "Przykład: typowa strona lokalnej firmy"}</p>
        <div role="group" aria-label={en ? "Example version" : "Wersja przykładu"} className="flex rounded-full border border-line p-1">
          {(Object.keys(EXAMPLES) as (keyof typeof EXAMPLES)[]).map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={mode === k}
              onClick={() => setMode(k)}
              className={cn(
                "label-mono h-9 rounded-full px-4 transition-colors duration-300",
                mode === k ? "bg-paper text-ink" : "text-mute hover:text-paper",
              )}
            >
              {en ? EXAMPLES_EN[k].label : EXAMPLES[k].label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4">
        {GAUGES[en ? "en" : "pl"].map((label, i) => (
          <ScoreGauge key={label} label={label} score={ex.scores[i]} size={104} delay={i * 0.1} />
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-end justify-between gap-4 border-t border-line pt-6">
        <p className="max-w-xs text-pretty" aria-live="polite">
          {ex.line}
        </p>
        <p
          className="font-display text-5xl font-medium tabular-nums"
          aria-label={`${en ? "Time to main content" : "Czas do głównej treści"}: ${ex.lcp}`}
        >
          {ex.lcp}
        </p>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-mute">
        {en
          ? "An illustrative example — not a measurement of any real website. You’ll see your own score after the test."
          : "Przykład ilustracyjny — nie jest pomiarem żadnej konkretnej strony. Twój wynik zobaczysz po teście."}
      </p>
    </div>
  );
}
