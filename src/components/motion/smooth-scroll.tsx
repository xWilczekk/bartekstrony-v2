"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type { LenisOptions } from "lenis";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { gsap, ScrollTrigger } from "@/components/motion/gsap";
import { setLenis } from "@/components/motion/lenis-store";

const OPTIONS: LenisOptions = {
  autoRaf: false,
  lerp: 0.1,
  smoothWheel: true,
  anchors: true,
  stopInertiaOnNavigate: true,
  allowNestedScroll: true,
};

function LenisBridge() {
  const lenis = useLenis(ScrollTrigger.update);
  const pathname = usePathname();

  useEffect(() => {
    setLenis(lenis ?? null);
    return () => setLenis(null);
  }, [lenis]);

  useEffect(() => {
    if (!lenis) return;
    lenis.resize();
    lenis.scrollTo(window.scrollY, { immediate: true, force: true });
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname, lenis]);

  return null;
}

export default function SmoothScroll() {
  const ref = useRef<LenisRef>(null);

  useEffect(() => {
    const update = (time: number) => ref.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(update);
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, []);

  return (
    <>
      <ReactLenis root options={OPTIONS} ref={ref} />
      <LenisBridge />
    </>
  );
}
