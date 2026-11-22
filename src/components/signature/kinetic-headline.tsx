"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import type { Locale } from "@/i18n/config";
import { useLocale } from "@/i18n/client";
import { cn } from "@/lib/utils";
import { REDUCED_MOTION } from "./use-media";

type Glyph = { ch: string; i: number };
const split = (text: string, start: number): Glyph[] => [...text].map((ch, k) => ({ ch, i: start + k }));

function words(a: string, b: string, accent: string) {
  return { text: `${a} ${b} ${accent}`, w: [split(a, 0), split(b, a.length), split(accent, a.length + b.length)] as const };
}
const HEADLINE: Record<Locale, ReturnType<typeof words>> = {
  pl: words("Strony,", "które", "zarabiają."),
  en: words("Websites", "that", "earn."),
};

const REST_W = 760;
const MIN_W = 200;
const REST_X = 100;
const MIN_X = 75;

function Letters({ glyphs, serif, word }: { glyphs: Glyph[]; serif?: boolean; word: number }) {
  return (
    <span className="sg-kw" style={{ "--w": word } as CSSProperties}>
      {glyphs.map((g, j) => (
        <span key={g.i} className={serif ? "sg-kl sg-kl-serif" : "sg-kl"} style={{ "--i": g.i, "--j": j } as CSSProperties}>
          {g.ch}
        </span>
      ))}
    </span>
  );
}

export function KineticHeadline({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { text, w: [W1, W2, W3] } = HEADLINE[useLocale()];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia(REDUCED_MOTION);
    if (!fine.matches || reduce.matches) return;

    const els = Array.from(root.querySelectorAll<HTMLElement>(".sg-kl"));
    const n = els.length;
    const serif = els.map((el) => el.classList.contains("sg-kl-serif"));
    const cx = new Float64Array(n);
    const cy = new Float64Array(n);
    const cur = new Float64Array(n);
    let radius = 220;
    let clientX = -1e5;
    let clientY = -1e5;
    let raf = 0;
    let visible = true;
    let measured = false;

    const measure = () => {
      if (cur.some((v) => v > 0.002)) return;
      const sx = window.scrollX;
      const sy = window.scrollY;
      for (let k = 0; k < n; k++) {
        const r = els[k].getBoundingClientRect();
        cx[k] = r.left + r.width / 2 + sx;
        cy[k] = r.top + r.height / 2 + sy;
      }
      const fs = parseFloat(getComputedStyle(els[0]).fontSize) || 120;
      radius = Math.max(140, fs * 1.9);
      measured = true;
    };

    const apply = (k: number, v: number) => {
      const el = els[k];
      if (serif[k]) {
        el.style.transform = v < 0.001 ? "" : `translateY(${(-0.1 * v).toFixed(4)}em) rotate(${(-6 * v).toFixed(3)}deg)`;
      } else if (v < 0.001) {
        el.style.fontVariationSettings = "";
      } else {
        const w = REST_W - (REST_W - MIN_W) * v;
        const x = REST_X - (REST_X - MIN_X) * v;
        el.style.fontVariationSettings = `"wght" ${w.toFixed(1)}, "wdth" ${x.toFixed(2)}`;
      }
    };

    const tick = () => {
      raf = 0;
      if (!visible || !measured) return;
      const px = clientX + window.scrollX;
      const py = clientY + window.scrollY;
      let moving = false;
      for (let k = 0; k < n; k++) {
        const d = Math.hypot(px - cx[k], (py - cy[k]) * 1.25);
        const t = d >= radius ? 0 : 1 - d / radius;
        const target = t * t * (3 - 2 * t);
        const prev = cur[k];
        let next = prev + (target - prev) * 0.14;
        if (Math.abs(target - next) < 0.0015) next = target;
        if (next !== prev) {
          cur[k] = next;
          apply(k, next);
          moving = true;
        }
      }
      if (moving) raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      clientX = e.clientX;
      clientY = e.clientY;
      kick();
    };
    const onLeave = () => {
      clientX = -1e5;
      clientY = -1e5;
      kick();
    };
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        cur.fill(0);
        for (let k = 0; k < n; k++) apply(k, 0);
        measured = false;
        requestAnimationFrame(measure);
      }, 150);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    io.observe(root);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", onResize);
    document.documentElement.addEventListener("pointerleave", onLeave);

    let settleTimer = 0;
    document.fonts?.ready.then(() => {
      measure();
      settleTimer = window.setTimeout(measure, 1900);
    });

    return () => {
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", onResize);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.clearTimeout(resizeTimer);
      window.clearTimeout(settleTimer);
      if (raf) cancelAnimationFrame(raf);
      for (let k = 0; k < n; k++) apply(k, 0);
    };
  }, []);

  return (
    <div ref={rootRef} className={cn("sg-kinetic", className)}>
      <p className="sr-only">{text}</p>
      <div aria-hidden="true" className="sg-kinetic-line">
        <Letters glyphs={W1} word={0} /> <Letters glyphs={W2} word={1} />
      </div>
      <div aria-hidden="true" className="sg-kinetic-line sg-kinetic-line-2">
        <Letters glyphs={W3} serif word={2} />
      </div>
    </div>
  );
}
