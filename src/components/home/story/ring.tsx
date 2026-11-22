"use client";

import { useRef, type ReactNode } from "react";
import { useInViewOnce } from "@/components/motion/tween";

export function Ring({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInViewOnce(ref, "0px");
  return (
    <span ref={ref} data-ring={inView ? "" : undefined} className="inline-block origin-[50%_85%] whitespace-nowrap">
      {children}
    </span>
  );
}
