"use client";

import { scrollToY } from "@/components/motion/lenis-store";
import { useLocale } from "@/i18n/client";
import { cn } from "@/lib/utils";

export function BackToTop({ className }: { className?: string }) {
  const en = useLocale() === "en";
  return (
    <button
      type="button"
      onClick={() => scrollToY(0)}
      className={cn(
        "label-mono group/top inline-flex h-11 items-center gap-2 rounded-full border hairline px-4 transition-colors duration-300 hover:border-current noscript:hidden",
        className,
      )}
    >
      {en ? "Back to top" : "Do góry"}
      <svg
        aria-hidden
        viewBox="0 0 16 16"
        className="size-3.5 transition-transform duration-300 ease-[var(--ease-out)] group-hover/top:-translate-y-0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" />
      </svg>
    </button>
  );
}
