"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { localizeHref } from "@/i18n/config";
import { useLocale } from "@/i18n/client";
import { saveConsent, type Consent } from "@/lib/consent";
import { cn } from "@/lib/utils";

const COPY = {
  pl: {
    till: "kasa 01",
    printing: "drukuję…",
    ready: "gotowe",
    shop: "bartekstrony.pl",
    title: "Paragon za ciasteczka",
    copy: "kopia",
    no: "nr",
    essential: "Niezbędne",
    essentialSub: "język strony, ta decyzja",
    included: "W CENIE",
    stats: "Statystyki",
    statsSub: "Google Analytics",
    ads: "Reklamy i śledzenie",
    none: "0 szt.",
    pending: "DO DECYZJI",
    yes: "TAK",
    no_: "NIE",
    total: "Sprzedaż Twoich danych",
    totalVal: "0,00 zł",
    note: "Statystyki pokazują mi, które podstrony działają, a które trzeba poprawić. Zdanie zmienisz w każdej chwili w stopce.",
    privacy: "Polityka prywatności",
    reject: "Tylko niezbędne",
    accept: "Akceptuję",
    stampYes: "Zaakceptowano",
    stampNo: "Tylko niezbędne",
    thanks: "Dziękuję · zapraszam ponownie",
  },
  en: {
    till: "till 01",
    printing: "printing…",
    ready: "ready",
    shop: "bartekstrony.pl",
    title: "Receipt for cookies",
    copy: "copy",
    no: "no.",
    essential: "Essential",
    essentialSub: "site language, this choice",
    included: "INCLUDED",
    stats: "Statistics",
    statsSub: "Google Analytics",
    ads: "Ads and tracking",
    none: "0 pcs",
    pending: "YOUR CALL",
    yes: "YES",
    no_: "NO",
    total: "Selling your data",
    totalVal: "PLN 0.00",
    note: "Statistics show me which pages work and which need fixing. You can change your mind any time in the footer.",
    privacy: "Privacy policy",
    reject: "Essentials only",
    accept: "Accept",
    stampYes: "Accepted",
    stampNo: "Essentials only",
    thanks: "Thank you · come again",
  },
};

const CSS = `
.bs-receipt-printer{animation:bs-printer-in .45s var(--ease-out) both}
.bs-receipt-paper{animation:bs-print 1.3s .35s steps(14,end) both;filter:drop-shadow(0 12px 18px rgb(0 0 0/.16)) drop-shadow(0 2px 3px rgb(0 0 0/.08))}
.bs-receipt-sheet{-webkit-mask:conic-gradient(from 135deg at top,#0000,#000 1deg 89deg,#0000 90deg) 50%/12px 100%;mask:conic-gradient(from 135deg at top,#0000,#000 1deg 89deg,#0000 90deg) 50%/12px 100%}
.bs-receipt-led{animation:bs-led .18s 1.65s steps(2,jump-none) 8}
.bs-receipt-barcode{background:repeating-linear-gradient(90deg,currentColor 0 2px,#0000 2px 3px,currentColor 3px 4px,#0000 4px 7px,currentColor 7px 10px,#0000 10px 11px,currentColor 11px 12px,#0000 12px 15px,currentColor 15px 16px,#0000 16px 18px,currentColor 18px 21px,#0000 21px 23px)}
.bs-receipt-stamp{animation:bs-stamp .26s cubic-bezier(.5,0,.75,0) both}
.bs-receipt[data-phase=stamp] .bs-receipt-sheet,.bs-receipt[data-phase=tear] .bs-receipt-sheet{animation:bs-thud .22s .2s}
.bs-receipt[data-phase=tear] .bs-receipt-clip{overflow:visible}
.bs-receipt[data-phase=tear] .bs-receipt-paper{animation:bs-tear .6s var(--ease-in-out) forwards}
.bs-receipt[data-phase=tear] .bs-receipt-printer{animation:bs-printer-out .45s .2s var(--ease-in-out) forwards}
@keyframes bs-printer-in{from{transform:translateY(160%);opacity:0}}
@keyframes bs-printer-out{to{transform:translateY(160%);opacity:0}}
@keyframes bs-print{from{transform:translateY(101%)}}
@keyframes bs-led{to{opacity:.25}}
@keyframes bs-stamp{0%{opacity:0;scale:2.4}75%{opacity:.92;scale:.94}100%{opacity:.88;scale:1}}
@keyframes bs-thud{40%{translate:0 2px}}
@keyframes bs-tear{30%{transform:translate(0,-6px) rotate(1.5deg)}100%{transform:translate(-18px,-90px) rotate(-8deg);opacity:0}}
@media (prefers-reduced-motion:reduce){.bs-receipt *{animation-duration:1ms!important;animation-delay:0s!important;animation-iteration-count:1!important}}
`;

type Phase = "print" | "idle" | "stamp" | "tear";

function Line({ label, sub, value, strong }: { label: string; sub?: string; value: string; strong?: boolean }) {
  return (
    <div>
      <div className="flex items-baseline">
        <span className={cn(strong && "font-bold")}>{label}</span>
        <span aria-hidden className="mx-1.5 min-w-3 flex-1 border-b border-dotted border-ink/35" />
        <span className={cn("tabular-nums transition-colors duration-200", strong && "font-bold")}>{value}</span>
      </div>
      {sub && <p className="text-[0.68rem] text-ink/55">{sub}</p>}
    </div>
  );
}

export default function CookieReceipt({ current, onDone }: { current: Consent | null; onDone: () => void }) {
  const locale = useLocale();
  const c = COPY[locale];
  const titleId = useId();
  const noteId = useId();
  const [phase, setPhase] = useState<Phase>("print");
  const [preview, setPreview] = useState<boolean | null>(null);
  const [choice, setChoice] = useState<boolean | null>(null);
  const [stamp] = useState(() => ({
    no: String(Math.floor(1000 + Math.random() * 9000)),
    at: new Date().toLocaleString(locale === "en" ? "en-GB" : "pl-PL", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }).replace(",", ""),
  }));
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const t = timers.current;
    t.push(window.setTimeout(() => setPhase((p) => (p === "print" ? "idle" : p)), 1700));
    return () => t.forEach((id) => window.clearTimeout(id));
  }, []);

  const decide = (analytics: boolean) => {
    if (phase === "stamp" || phase === "tear") return;
    saveConsent(analytics);
    setChoice(analytics);
    setPhase("stamp");
    timers.current.push(
      window.setTimeout(() => setPhase("tear"), 700),
      window.setTimeout(onDone, 1350),
    );
  };

  const shown = choice ?? preview ?? current?.analytics ?? null;
  const statsValue = shown === null ? c.pending : shown ? c.yes : c.no_;
  const hover = (v: boolean) => ({
    onPointerEnter: () => setPreview(v),
    onPointerLeave: () => setPreview(null),
    onFocus: () => setPreview(v),
    onBlur: () => setPreview(null),
  });

  return (
    <section
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      aria-describedby={noteId}
      data-bottom-card
      data-phase={phase}
      className="bs-receipt fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[70] sm:inset-x-auto sm:left-5 sm:w-[348px]"
    >
      <style href="bs-cookie-receipt" precedence="default">
        {CSS}
      </style>

      <div className="bs-receipt-clip relative -mb-2 overflow-hidden px-3 pt-5">
        <div className="bs-receipt-paper">
          <div className="bs-receipt-sheet relative bg-[#fbfaf6] px-5 pt-6 pb-5 font-mono text-[0.78rem] leading-[1.45] text-ink">
            <header className="text-center">
              <p className="font-bold tracking-[0.18em] uppercase">✱ {c.shop} ✱</p>
              <h2 id={titleId} className="mt-0.5 font-bold tracking-[0.08em] uppercase">
                {c.title}
                {current && <span className="ml-1.5 bg-ink px-1 text-paper">{c.copy}</span>}
              </h2>
              <p className="mt-1 flex justify-between text-[0.68rem] text-ink/55">
                <span>{stamp.at}</span>
                <span>
                  {c.no} {stamp.no}
                </span>
              </p>
            </header>

            <div aria-hidden className="my-2.5 border-t border-dashed border-ink/40" />

            <div className="grid gap-1.5">
              <Line label={c.essential} sub={c.essentialSub} value={c.included} />
              <div>
                <div className="flex items-baseline">
                  <span>{c.stats}</span>
                  <span aria-hidden className="mx-1.5 min-w-3 flex-1 border-b border-dotted border-ink/35" />
                  <span
                    aria-live="polite"
                    className={cn(
                      "px-1 font-bold transition-colors duration-200",
                      shown === true && "bg-[var(--highlight,var(--signal))] text-ink",
                      shown === false && "bg-ink text-paper",
                    )}
                  >
                    {statsValue}
                  </span>
                </div>
                <p className="text-[0.68rem] text-ink/55">{c.statsSub}</p>
              </div>
              <Line label={c.ads} value={c.none} />
            </div>

            <div aria-hidden className="mt-2.5 border-t border-dashed border-ink/40" />
            <div className="border-t border-dashed border-ink/40 pt-1.5 mt-0.5">
              <Line label={c.total.toUpperCase()} value={c.totalVal} strong />
            </div>

            <p id={noteId} className="mt-3 font-sans text-[0.8rem] leading-snug text-ink/70 max-sm:hidden">
              {c.note}
            </p>

            <div className="mt-3.5 grid grid-cols-2 gap-2 font-sans">
              <button
                type="button"
                onClick={() => decide(false)}
                {...hover(false)}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-ink px-3 text-[0.9rem] font-medium transition-colors duration-200 hover:bg-ink hover:text-paper"
              >
                {c.reject}
              </button>
              <button
                type="button"
                onClick={() => decide(true)}
                {...hover(true)}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-ink bg-ink px-3 text-[0.9rem] font-medium text-paper transition-colors duration-200 hover:border-signal hover:bg-signal hover:text-ink"
              >
                {c.accept}
              </button>
            </div>

            <p className="mt-3 text-center text-[0.68rem] text-ink/55">
              <Link href={localizeHref("/polityka-prywatnosci", locale)} className="underline underline-offset-2 hover:text-ink">
                {c.privacy}
              </Link>
            </p>
            <div aria-hidden className="mt-3 max-sm:hidden">
              <div className="bs-receipt-barcode h-6 text-ink" />
              <p className="mt-1.5 text-center text-[0.62rem] tracking-[0.12em] text-ink/55 uppercase">{c.thanks}</p>
            </div>

            {choice !== null && (
              <p
                aria-hidden
                className={cn(
                  "bs-receipt-stamp pointer-events-none absolute top-[38%] left-1/2 -translate-x-1/2 -rotate-[13deg] rounded-md border-[3px] border-current px-3 py-1 text-center text-[1.05rem] font-bold tracking-[0.14em] whitespace-nowrap uppercase mix-blend-multiply",
                  choice ? "text-signal" : "text-ink/75",
                )}
              >
                {choice ? c.stampYes : c.stampNo}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="bs-receipt-printer relative z-10 flex h-7 items-center justify-between rounded-[12px] bg-ink px-3.5 shadow-[0_18px_40px_-16px_rgb(0_0_0/0.6)]">
        <span aria-hidden className="absolute inset-x-3 top-[5px] h-[3px] rounded-full bg-black shadow-[inset_0_1px_1px_rgb(255_255_255/0.08)]" />
        <span aria-hidden className="label-mono mt-1 text-[0.58rem] text-paper/45">
          {c.till} · {phase === "print" ? c.printing : c.ready}
        </span>
        <span aria-hidden className="bs-receipt-led mt-1 size-1.5 rounded-full bg-[var(--ok)] shadow-[0_0_6px_var(--ok)]" />
      </div>
    </section>
  );
}
