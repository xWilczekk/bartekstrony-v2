"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
const prefersReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useTween(
  target: number,
  { duration = 0.7, delay = 0, enabled = true, from }: { duration?: number; delay?: number; enabled?: boolean; from?: number } = {},
) {
  const [value, setValue] = useState(from ?? target);
  const current = useRef(from ?? target);

  useEffect(() => {
    if (!enabled) return;
    const instant = prefersReduced();
    const start = current.current;
    let raf = 0;
    let t0 = 0;
    const step = (now: number) => {
      if (!t0) t0 = now + (instant ? 0 : delay * 1000);
      const t = instant ? 1 : Math.max(0, (now - t0) / (duration * 1000));
      const v = start + (target - start) * easeOutExpo(t);
      current.current = v;
      setValue(v);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, delay, enabled]);

  return value;
}

export function useInViewOnce(ref: RefObject<Element | null>, rootMargin = "0px 0px -8% 0px") {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        io.disconnect();
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);
  return inView;
}
