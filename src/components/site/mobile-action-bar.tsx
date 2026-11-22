"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site, type LeadSource } from "@/content/site";
import { localizeHref } from "@/i18n/config";
import { useLocale } from "@/i18n/client";
import { contactHref } from "@/lib/utils";

const HIDDEN_ON = ["/kontakt", "/wycena", "/twoja-strona", "/en/contact", "/en/quote", "/en/your-site"];
const SOURCE: LeadSource = "hero";

export function MobileActionBar() {
  const pathname = usePathname();
  const locale = useLocale();
  const en = locale === "en";
  const off = HIDDEN_ON.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  const [visible, setVisible] = useState(false);

  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setVisible(false);
  }

  useEffect(() => {
    if (off) return;
    let raf = 0;
    let footerInView = false;
    let typing = false;

    const update = () => {
      raf = 0;
      setVisible(window.scrollY > window.innerHeight * 0.85 && !footerInView && !typing);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const footer = document.querySelector("[data-site-footer]");
    const io = new IntersectionObserver(
      ([entry]) => {
        footerInView = Boolean(entry?.isIntersecting);
        schedule();
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    if (footer) io.observe(footer);

    const isField = (t: EventTarget | null) =>
      t instanceof HTMLElement && t.matches("input, textarea, select, [contenteditable='true']");
    const onFocusIn = (e: FocusEvent) => {
      if (!isField(e.target)) return;
      typing = true;
      schedule();
    };
    const onFocusOut = (e: FocusEvent) => {
      if (!isField(e.target)) return;
      typing = false;
      schedule();
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, [off]);

  if (off) return null;

  return (
    <div
      data-visible={visible}
      inert={!visible}
      className="fixed inset-x-0 bottom-0 z-40 translate-y-[calc(100%+1rem)] [body:has([data-bottom-card])_&]:invisible px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 transition-[translate] duration-500 ease-[var(--ease-out)] data-[visible=true]:translate-y-0 md:hidden"
    >
      <nav
        aria-label={en ? "Quick contact" : "Szybki kontakt"}
        className="grid grid-cols-2 gap-1.5 rounded-[calc(var(--radius)+6px)] border border-line-ink bg-ink p-1.5 shadow-[0_18px_40px_-12px_rgb(14_14_13/0.5)]"
      >
        <a
          href={site.phoneHref}
          className="flex h-13 items-center justify-center gap-2 rounded-[var(--radius)] text-[1.02rem] font-medium text-paper ring-1 ring-inset ring-white/15 transition-transform active:scale-[0.97]"
        >
          <svg aria-hidden viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5.6 2.5H3.4a1 1 0 0 0-1 1.1A10.5 10.5 0 0 0 12.4 13.6a1 1 0 0 0 1.1-1v-2.2a1 1 0 0 0-.8-1l-2-.5a1 1 0 0 0-1 .3l-.8.9a8 8 0 0 1-3.4-3.4l.9-.8a1 1 0 0 0 .3-1l-.5-2a1 1 0 0 0-1-.8Z" />
          </svg>
          {en ? "Call" : "Zadzwoń"}
        </a>
        <Link
          href={localizeHref(contactHref({ zrodlo: SOURCE }), locale)}
          className="flex h-13 items-center justify-center gap-2 rounded-[var(--radius)] bg-signal text-[1.02rem] font-medium text-paper transition-transform active:scale-[0.97]"
        >
          {en ? "Quote in 24h" : "Wycena 24h"}
          <svg aria-hidden viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M4 12 12 4M5.5 4H12v6.5" />
          </svg>
        </Link>
      </nav>
    </div>
  );
}
