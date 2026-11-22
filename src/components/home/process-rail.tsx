"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function ProcessRail({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    const bar = fill.current;
    if (!root || !bar) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      bar.style.transform = "scaleY(1)";
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = root.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = r.top - vh * 0.7;
      const end = r.bottom - vh * 0.6;
      const p = Math.min(1, Math.max(0, -start / (end - start)));
      bar.style.transform = `scaleY(${p.toFixed(4)})`;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <div aria-hidden className="absolute top-3 bottom-3 left-[5px] w-px bg-line" />
      <div
        ref={fill}
        aria-hidden
        className="absolute top-3 bottom-3 left-[5px] w-px origin-top scale-y-0 bg-signal"
      />
      {children}
    </div>
  );
}
