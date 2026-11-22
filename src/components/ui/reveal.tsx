"use client";

import { useEffect, useRef, type CSSProperties, type ComponentProps } from "react";

export function Reveal({
  delay = 0,
  y = 24,
  from = "up",
  style,
  ...props
}: ComponentProps<"div"> & { delay?: number; y?: number; from?: "up" | "left" | "right" }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.in = "";
        io.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const x = from === "left" ? -56 : from === "right" ? 56 : 0;
  return (
    <div
      ref={ref}
      data-reveal=""
      style={
        {
          "--reveal-x": `${x}px`,
          "--reveal-y": `${from === "up" ? y : 0}px`,
          "--reveal-delay": `${delay}s`,
          ...style,
        } as CSSProperties
      }
      {...props}
    />
  );
}
