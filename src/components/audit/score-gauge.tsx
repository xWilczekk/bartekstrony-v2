"use client";

import { useRef } from "react";
import { useInViewOnce, useTween } from "@/components/motion/tween";
import { cn } from "@/lib/utils";
import { useLocale } from "@/i18n/client";
import { RATING_LABEL, rateScore } from "./rating";

const TONE_VAR = { good: "var(--ok)", "needs-work": "var(--warn)", poor: "var(--bad)" } as const;
const TONE_BG = { good: "bg-ok", "needs-work": "bg-warn", poor: "bg-bad" } as const;

export function ScoreGauge({
  label,
  hint,
  score,
  size = 132,
  delay = 0,
  className,
}: {
  label: string;
  hint?: string;
  score: number | null;
  size?: number;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInViewOnce(ref);
  const v = useTween(score ?? 0, { duration: 1.5, delay, enabled: inView && score !== null, from: 0 });
  const rating = rateScore(score);
  const en = useLocale() === "en";
  const labels = RATING_LABEL[en ? "en" : "pl"];

  return (
    <figure ref={ref} className={cn("flex flex-col items-center gap-3", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 120 120" className="size-full" aria-hidden>
          <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeOpacity="0.14" strokeWidth="9" />
          {rating && (
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke={TONE_VAR[rating]}
              strokeWidth="9"
              transform="rotate(-90 60 60)"
              pathLength={100}
              strokeDasharray={`${v} 100`}
            />
          )}
        </svg>
        <span
          aria-hidden
          className="absolute inset-0 grid place-items-center font-display font-medium tabular-nums"
          style={{ fontSize: size * 0.34 }}
        >
          {score === null ? "—" : Math.round(v)}
        </span>
      </div>
      <figcaption className="text-center">
        <span className="label-mono block">{label}</span>
        {hint && <span className="mt-1 block max-w-[16ch] text-balance text-[0.8rem] leading-snug text-mute">{hint}</span>}
        <span className="mt-1.5 inline-flex items-center gap-1.5 text-[0.8rem] font-medium">
          {rating && <i aria-hidden className={cn("size-2 rounded-full", TONE_BG[rating])} />}
          {rating ? labels[rating] : en ? "No data" : "Brak danych"}
        </span>
        <span className="sr-only">
          {score === null ? (en ? ": no data" : ": brak danych") : en ? `: ${score} out of 100` : `: ${score} na 100`}
        </span>
      </figcaption>
    </figure>
  );
}

export function RatingBadge({ rating, className }: { rating: keyof typeof TONE_BG; className?: string }) {
  const labels = RATING_LABEL[useLocale()];
  return (
    <span
      className={cn(
        "label-mono inline-flex items-center gap-2 rounded-full border border-current/20 px-3 py-1 whitespace-nowrap",
        className,
      )}
    >
      <i aria-hidden className={cn("size-2 rounded-full", TONE_BG[rating])} />
      {labels[rating]}
    </span>
  );
}
