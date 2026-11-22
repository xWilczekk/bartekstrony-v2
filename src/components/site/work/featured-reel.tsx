"use client";

import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { useMediaQuery } from "@/components/motion/use-media-query";
import type { StageProject } from "./data";

const FeaturedStage = lazy(() => import("./featured-stage"));

const INTENT = ["scroll", "wheel", "pointerdown", "keydown", "touchstart"] as const;

const STAGE_QUERY = "(min-width: 1024px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)";

const FALLBACK_CSS = `@media (scripting: enabled) and ${STAGE_QUERY} {
  .bs-featured-fallback { visibility: hidden; animation: bs-featured-show 0s 4s forwards; }
}
@keyframes bs-featured-show { to { visibility: visible; } }`;

export function FeaturedReel({
  list,
  projects,
  panels,
}: {
  list: ReactNode;
  projects: StageProject[];
  panels: ReactNode[];
}) {
  const stage = useMediaQuery(STAGE_QUERY);
  const sentinel = useRef<HTMLSpanElement>(null);
  const [wanted, setWanted] = useState(false);

  useEffect(() => {
    if (!stage || wanted) return;
    const go = () => setWanted(true);
    const io = new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && go(), { rootMargin: "100% 0px" });
    if (sentinel.current) io.observe(sentinel.current);
    INTENT.forEach((ev) => window.addEventListener(ev, go, { passive: true, once: true }));
    return () => {
      io.disconnect();
      INTENT.forEach((ev) => window.removeEventListener(ev, go));
    };
  }, [stage, wanted]);

  const marker = <span ref={sentinel} aria-hidden className="block h-0" />;
  const fallback = (
    <>
      <style href="bs-featured-fallback" precedence="medium">
        {FALLBACK_CSS}
      </style>
      <div className={projects.length < 2 ? undefined : "bs-featured-fallback"}>{list}</div>
    </>
  );
  if (!stage || !wanted || projects.length < 2) {
    return (
      <>
        {marker}
        {fallback}
      </>
    );
  }
  return (
    <>
      {marker}
      <Suspense fallback={fallback}>
        <FeaturedStage projects={projects} panels={panels} />
      </Suspense>
    </>
  );
}
