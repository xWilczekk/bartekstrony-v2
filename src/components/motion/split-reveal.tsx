"use client";

import { createElement, useEffect, useRef, type ReactNode } from "react";

const CSS = `.bs-line-mask{padding-block:.14em;margin-block:-.14em}`;

type Tag = "div" | "span" | "p" | "h1" | "h2" | "h3" | "h4";

export function SplitReveal({
  as = "div",
  children,
  className,
  delay = 0,
  stagger = 0.09,
  duration = 1.1,
}: {
  as?: Tag;
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const below = () => el.getBoundingClientRect().top > window.innerHeight;
    if (!below()) return;

    let disposed = false;
    let dispose = () => {};

    const approach = new IntersectionObserver(
      async (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        approach.disconnect();
        const [{ gsap }, { SplitText }] = await Promise.all([import("gsap"), import("gsap/SplitText")]);
        if (disposed || !below()) return;
        gsap.registerPlugin(SplitText);

        let revealed = false;
        let tween: gsap.core.Tween | null = null;

        const split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "bs-line",
          tag: "span",
          aria: "none",
          autoSplit: true,
          onSplit: (self) => {
            tween = gsap.from(self.lines, {
              yPercent: 120,
              duration,
              delay,
              stagger,
              ease: "expo.out",
              paused: !revealed,
              onComplete: () =>
                requestAnimationFrame(() => {
                  split.kill();
                  split.revert();
                }),
            });
            return tween;
          },
        });

        const reveal = new IntersectionObserver(
          (es) => {
            if (!es.some((e) => e.isIntersecting)) return;
            reveal.disconnect();
            revealed = true;
            tween?.play();
          },
          { rootMargin: "0px 0px -12% 0px" },
        );
        reveal.observe(el);

        dispose = () => {
          reveal.disconnect();
          split.kill();
          split.revert();
        };
      },
      { rootMargin: "0px 0px 75% 0px" },
    );
    approach.observe(el);

    return () => {
      disposed = true;
      approach.disconnect();
      dispose();
    };
  }, [delay, stagger, duration]);

  return (
    <>
      <style href="bs-split-reveal" precedence="medium">
        {CSS}
      </style>
      {createElement(as, { ref, className }, children)}
    </>
  );
}
