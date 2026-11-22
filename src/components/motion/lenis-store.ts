import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrollToY(y: number, { immediate = false }: { immediate?: boolean } = {}) {
  const lenis = instance;
  if (lenis) {
    lenis.scrollTo(y, { immediate, duration: 1.2, force: true });
    return;
  }
  window.scrollTo({ top: y, behavior: immediate || prefersReducedMotion() ? "auto" : "smooth" });
}

export function scrollToElement(target: HTMLElement | string) {
  const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  if (!el) return;
  const lenis = instance;
  if (lenis) {
    lenis.scrollTo(el, { duration: 1.2, force: true });
    return;
  }
  el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
}

let locks = 0;

export function lockScroll() {
  locks += 1;
  if (locks > 1) return;
  document.documentElement.style.overflow = "hidden";
  instance?.stop();
}

export function unlockScroll() {
  if (locks === 0) return;
  locks -= 1;
  if (locks > 0) return;
  document.documentElement.style.overflow = "";
  instance?.start();
}
