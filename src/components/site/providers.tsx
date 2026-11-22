"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { useMediaQuery } from "@/components/motion/use-media-query";

const SmoothScroll = dynamic(() => import("@/components/motion/smooth-scroll"), { ssr: false });

const SMOOTH_SCROLL_QUERY = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

export function Providers({ children }: { children: ReactNode }) {
  const smooth = useMediaQuery(SMOOTH_SCROLL_QUERY);

  return (
    <>
      {smooth && <SmoothScroll />}
      {children}
    </>
  );
}
