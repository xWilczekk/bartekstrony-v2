"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/i18n/client";
import { PhoneFrame } from "./phone-frame";

const STEPS: { at: number; text: string; en: string }[] = [
  { at: 0, text: "Otwieram stronę na symulowanym telefonie z siecią 4G…", en: "Opening the site on a simulated phone on 4G…" },
  { at: 5, text: "Mierzę, kiedy pojawia się pierwsza treść…", en: "Measuring when the first content appears…" },
  { at: 10, text: "Sprawdzam, kiedy klient zobaczy główny nagłówek i zdjęcie…", en: "Checking when the customer sees the main heading and photo…" },
  { at: 16, text: "Testuję, czy strona reaguje na dotyk…", en: "Testing whether the page responds to touch…" },
  { at: 22, text: "Sprawdzam, co widzi Google: tytuł, opis, linki…", en: "Checking what Google sees: title, description, links…" },
  { at: 28, text: "Szukam błędów dostępności i bezpieczeństwa…", en: "Looking for accessibility and security issues…" },
  { at: 34, text: "Układam wyniki po ludzku…", en: "Putting the results into plain words…" },
];

const LONG_WAIT_AT = 48;

export function AuditProgress({ display, onCancel }: { display: string; onCancel: () => void }) {
  const en = useLocale() === "en";
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const t0 = performance.now();
    const id = window.setInterval(() => setElapsed((performance.now() - t0) / 1000), 250);
    return () => window.clearInterval(id);
  }, []);

  let current = 0;
  STEPS.forEach((s, i) => {
    if (elapsed >= s.at) current = i;
  });
  const longWait = elapsed >= LONG_WAIT_AT;
  const longText = en
    ? "Taking longer than usual — the site responds slowly or the test queue is long. Just a moment."
    : "Trwa dłużej niż zwykle — strona odpowiada wolno albo kolejka testów jest długa. Jeszcze chwila.";
  const stepText = (s: (typeof STEPS)[number]) => (en ? s.en : s.text);
  const message = longWait ? longText : stepText(STEPS[current]);

  return (
    <div className="grid items-center gap-10 border-t hairline pt-10 md:grid-cols-12 md:gap-12">
      <style href="bs-audit-progress" precedence="default">
        {`@keyframes bs-audit-bar{from{translate:-100% 0}to{translate:300% 0}}@keyframes bs-audit-scan{50%{top:96%}}.bs-audit-bar{animation:bs-audit-bar 1.6s ease-in-out infinite}.bs-audit-scan{animation:bs-audit-scan 3.2s ease-in-out infinite}@media (prefers-reduced-motion:reduce){.bs-audit-bar{animation:none}.bs-audit-scan{display:none}}`}
      </style>
      <div className="md:col-span-7">
        <p className="label-mono text-mute">
          {en ? "Testing" : "Trwa test"} · {display}
        </p>

        <p role="status" aria-live="polite" className="mt-5 min-h-[2lh] max-w-xl font-display text-[length:var(--text-big)] font-medium text-balance">
          {message}
        </p>

        <div className="mt-8 h-1 w-full max-w-xl overflow-hidden rounded-full bg-ink/10" aria-hidden>
          <div className="bs-audit-bar h-full w-1/3 rounded-full bg-signal" />
        </div>

        <div className="mt-4 flex max-w-xl items-center justify-between gap-4">
          <p className="label-mono text-mute">
            {Math.floor(elapsed)} s · {en ? "usually 15–40 s" : "zwykle 15–40 s"}
          </p>
          <Button variant="ghost" onClick={onCancel}>
            {en ? "Cancel" : "Anuluj"}
          </Button>
        </div>

        <ol className="mt-10 grid max-w-xl gap-2 text-sm text-mute" aria-hidden>
          {STEPS.map((s, i) => (
            <li
              key={s.at}
              className={cn(
                "flex gap-3 transition-opacity duration-500",
                i < current && "opacity-40",
                i === current && !longWait && "text-ink",
                i > current && "opacity-25",
              )}
            >
              <span className="label-mono w-6 shrink-0 text-signal">{i < current ? "ok" : String(i + 1).padStart(2, "0")}</span>
              <span>{stepText(s)}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="md:col-span-5" aria-hidden>
        <PhoneFrame>
          <div className="absolute inset-x-0 top-0 flex h-10 items-end justify-center pb-1">
            <span className="max-w-[80%] truncate rounded-full bg-ink/10 px-3 py-0.5 font-mono text-[10px] text-ink/60">
              {display}
            </span>
          </div>
          <div className="absolute inset-x-4 top-14 grid gap-3">
            {[
              "h-24 rounded-lg",
              "h-4 w-2/3 rounded",
              "h-3 rounded",
              "h-3 w-5/6 rounded",
              "h-20 rounded-lg",
              "h-3 w-1/2 rounded",
            ].map((cls, i) => (
              <i
                key={i}
                className={cn(
                  "block bg-ink/10 transition-opacity duration-700",
                  cls,
                  current + 1 >= i ? "opacity-100" : "opacity-0",
                )}
              />
            ))}
          </div>
          <span aria-hidden className="bs-audit-scan absolute inset-x-0 top-[6%] h-0.5 bg-signal" />
        </PhoneFrame>
      </div>
    </div>
  );
}
