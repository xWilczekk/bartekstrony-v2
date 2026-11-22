"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

const CSS = `
.bs-kinetic__ch{display:inline-block;font-weight:var(--kw-base);font-stretch:var(--ks-base);transition:font-weight .55s cubic-bezier(.16,1,.3,1),font-stretch .55s cubic-bezier(.16,1,.3,1)}
@keyframes bs-kinetic-wave{0%,100%{font-weight:var(--kw-base);font-stretch:var(--ks-base)}45%{font-weight:var(--kw-peak);font-stretch:var(--ks-peak)}}
@media (prefers-reduced-motion:no-preference){.bs-kinetic[data-wave] .bs-kinetic__ch{animation:bs-kinetic-wave 1.5s cubic-bezier(.65,0,.35,1);animation-delay:calc(var(--i) * 85ms)}}`;

export function KineticText({
  text,
  className,
  baseWeight = 760,
  peakWeight = 260,
  baseStretch = 100,
  peakStretch = 75,
}: {
  text: string;
  className?: string;
  baseWeight?: number;
  peakWeight?: number;
  baseStretch?: number;
  peakStretch?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const letters = Array.from(root.querySelectorAll<HTMLElement>("[data-ch]"));
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let px = -1e5;
    let py = -1e5;
    let raf = 0;
    let listening = false;

    const render = () => {
      raf = 0;
      const radius = Math.max(120, root.getBoundingClientRect().height * 1.35);
      for (const el of letters) {
        const r = el.getBoundingClientRect();
        const d = Math.hypot(px - (r.left + r.width / 2), py - (r.top + r.height / 2));
        const p = Math.max(0, 1 - d / radius);
        if (p === 0) {
          el.style.fontWeight = "";
          el.style.fontStretch = "";
          continue;
        }
        const e = p * p * (3 - 2 * p);
        el.style.fontWeight = String(Math.round(baseWeight + (peakWeight - baseWeight) * e));
        el.style.fontStretch = `${(baseStretch + (peakStretch - baseStretch) * e).toFixed(1)}%`;
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };
    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      schedule();
    };
    const onLeave = () => {
      px = py = -1e5;
      schedule();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          root.setAttribute("data-wave", "");
          if (fine && !listening) {
            listening = true;
            window.addEventListener("pointermove", onMove, { passive: true });
            document.documentElement.addEventListener("pointerleave", onLeave);
          }
        } else if (listening) {
          listening = false;
          window.removeEventListener("pointermove", onMove);
          document.documentElement.removeEventListener("pointerleave", onLeave);
          onLeave();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(root);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [baseWeight, peakWeight, baseStretch, peakStretch]);

  const vars = {
    "--kw-base": baseWeight,
    "--kw-peak": peakWeight,
    "--ks-base": `${baseStretch}%`,
    "--ks-peak": `${peakStretch}%`,
  } as CSSProperties;

  return (
    <span ref={ref} className={cn("bs-kinetic inline-block whitespace-nowrap", className)} style={vars}>
      <style href="bs-kinetic" precedence="medium">
        {CSS}
      </style>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {Array.from(text).map((ch, i) => (
          <span key={i} data-ch className="bs-kinetic__ch" style={{ "--i": i } as CSSProperties}>
            {ch === " " ? " " : ch}
          </span>
        ))}
      </span>
    </span>
  );
}
