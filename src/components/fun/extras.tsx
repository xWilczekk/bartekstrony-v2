"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useLocale } from "@/i18n/client";
import { cn } from "@/lib/utils";
import { PALETTE_EVENT, XRAY_EVENT } from "./events";

type Metrics = { lcp: number; fcp: number; ttfb: number; cls: number; kb: number; requests: number };

function useLoadMetrics() {
  const [m, setM] = useState<Metrics | null>(null);
  useEffect(() => {
    let lcp = 0;
    let cls = 0;
    const observers: PerformanceObserver[] = [];
    const observe = (type: string, cb: (entries: PerformanceEntryList) => void) => {
      try {
        const o = new PerformanceObserver((list) => cb(list.getEntries()));
        o.observe({ type, buffered: true });
        observers.push(o);
      } catch {
      }
    };
    observe("largest-contentful-paint", (e) => (lcp = e[e.length - 1]?.startTime ?? lcp));
    observe("layout-shift", (e) => {
      for (const s of e as (PerformanceEntry & { value: number; hadRecentInput: boolean })[]) if (!s.hadRecentInput) cls += s.value;
    });
    const finish = () => {
      const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      const fcp = performance.getEntriesByName("first-contentful-paint")[0]?.startTime ?? 0;
      const res = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
      const bytes = res.reduce((s, r) => s + (r.transferSize || 0), nav?.transferSize ?? 0);
      setM({ lcp: lcp || fcp || nav?.loadEventEnd || 0, fcp, ttfb: nav?.responseStart ?? 0, cls, kb: Math.round(bytes / 1024), requests: res.length + 1 });
    };
    const t = window.setTimeout(finish, document.readyState === "complete" ? 600 : 2500);
    return () => {
      window.clearTimeout(t);
      observers.forEach((o) => o.disconnect());
    };
  }, []);
  return m;
}

const SPEED = {
  pl: {
    lead: "Dla porównania: ta strona załadowała się u Ciebie w",
    tail: "A Twoja?",
    measuring: "Mierzę, jak szybko załadowała się u Ciebie ta strona…",
    more: "szczegóły pomiaru",
    details: "Prawdziwy pomiar z Twojej przeglądarki",
    rows: ["Odpowiedź serwera", "Pierwszy widok", "Główna treść", "Przesunięcia układu", "Przesłane dane", "Zapytania sieciowe"],
  },
  en: {
    lead: "For comparison: this site loaded for you in",
    tail: "And yours?",
    measuring: "Measuring how fast this site loaded for you…",
    more: "measurement details",
    details: "A real measurement from your browser",
    rows: ["Server response", "First view", "Main content", "Layout shift", "Data transferred", "Network requests"],
  },
};

export function SpeedCompare({ className }: { className?: string }) {
  const locale = useLocale();
  const c = SPEED[locale];
  const m = useLoadMetrics();
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const nf = locale === "en" ? "en-US" : "pl-PL";
  const sec = (ms: number) => `${(ms / 1000).toLocaleString(nf, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} s`;

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <div ref={wrap} className={cn("relative flex items-start gap-3 rounded-[var(--radius)] border border-current/15 p-4", className)}>
      <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full bg-[var(--highlight)] text-ink">
        ⚡
      </span>
      <p className="text-[0.95rem] leading-snug" aria-live="polite">
        {m ? (
          <>
            {c.lead} <strong className="font-display text-lg font-semibold tabular-nums">{sec(m.lcp)}</strong>. {c.tail}{" "}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="label-mono whitespace-nowrap underline decoration-current/30 underline-offset-4 hover:decoration-current"
            >
              {c.more}
            </button>
          </>
        ) : (
          <span className="opacity-70">{c.measuring}</span>
        )}
      </p>
      {open && m && (
        <div
          role="dialog"
          aria-label={c.details}
          className="absolute top-full left-0 z-20 mt-2 w-72 rounded-[var(--radius)] bg-paper p-4 text-ink shadow-[0_24px_60px_-20px_rgb(0_0_0/0.5)] ring-1 ring-ink/10"
        >
          <p className="label-mono text-mute">{c.details}</p>
          <dl className="mt-3 grid grid-cols-[1fr_auto] gap-x-4 gap-y-1.5 text-sm">
            {[sec(m.ttfb), sec(m.fcp), sec(m.lcp), m.cls.toFixed(3), `${m.kb.toLocaleString(nf)} KB`, String(m.requests)].map((v, i) => (
              <div key={c.rows[i]} className="contents">
                <dt className="text-mute">{c.rows[i]}</dt>
                <dd className="text-right font-medium tabular-nums">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}

export function XrayButton({ className }: { className?: string }) {
  const en = useLocale() === "en";
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(XRAY_EVENT))}
      className={cn(
        "group inline-flex min-h-11 items-center gap-3 rounded-full bg-ink py-1.5 pr-5 pl-1.5 text-paper transition-colors hover:bg-signal",
        className,
      )}
    >
      <span aria-hidden className="grid size-8 place-items-center rounded-full bg-[var(--highlight)] font-mono text-sm text-ink">
        {"</>"}
      </span>
      <span className="text-[0.95rem] font-medium">{en ? "See how this site is built" : "Zobacz, jak zbudowana jest ta strona"}</span>
      <span className="label-mono text-paper/60 max-sm:hidden">{en ? "X-ray" : "rentgen"}</span>
    </button>
  );
}

const noop = () => () => {};
const isMac = () => /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

export function SearchButton({ className, wide }: { className?: string; wide?: boolean }) {
  const en = useLocale() === "en";
  const mac = useSyncExternalStore(noop, isMac, () => false);
  const label = en ? "Search" : "Szukaj";
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(PALETTE_EVENT))}
      aria-label={`${label} (${mac ? "⌘" : "Ctrl"}+K)`}
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-full border border-current/15 px-3 transition-colors hover:border-current",
        className,
      )}
    >
      <svg aria-hidden viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="7" cy="7" r="4.5" />
        <path d="m10.5 10.5 3 3" />
      </svg>
      {wide && <span className="text-[0.95rem]">{label}</span>}
      <kbd className="label-mono rounded border border-current/20 px-1.5 py-0.5 text-[0.65rem] opacity-70">{mac ? "⌘K" : "Ctrl K"}</kbd>
    </button>
  );
}
