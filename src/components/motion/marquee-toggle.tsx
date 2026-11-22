"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function MarqueeToggle({
  target,
  label = "Zatrzymaj przewijanie",
  className,
}: {
  target: string;
  label?: string;
  className?: string;
}) {
  const [paused, setPaused] = useState(false);

  const toggle = () => {
    const next = !paused;
    document.getElementById(target)?.toggleAttribute("data-paused", next);
    setPaused(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-controls={target}
      aria-pressed={paused}
      title={paused ? "Wznów" : "Zatrzymaj"}
      className={cn(
        "relative inline-flex size-7 shrink-0 items-center justify-center rounded-full border hairline text-mute transition-colors duration-300 hover:text-current motion-reduce:hidden noscript:hidden",
        "before:absolute before:-inset-2.5 before:content-['']",
        className,
      )}
    >
      <span className="sr-only">{label}</span>
      {paused ? (
        <svg aria-hidden viewBox="0 0 10 10" className="size-2.5 translate-x-px" fill="currentColor">
          <path d="M2 1.2v7.6L8.6 5z" />
        </svg>
      ) : (
        <svg aria-hidden viewBox="0 0 10 10" className="size-2.5" fill="currentColor">
          <path d="M2 1.5h2v7H2zM6 1.5h2v7H6z" />
        </svg>
      )}
    </button>
  );
}
