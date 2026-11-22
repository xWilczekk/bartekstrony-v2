"use client";

import Link from "next/link";
import { useEffect, useRef, type KeyboardEvent } from "react";
import { nav, navEn, site } from "@/content/site";
import { localizeHref } from "@/i18n/config";
import { useLocale } from "@/i18n/client";
import { Arrow, buttonClass } from "@/components/ui/button";
import { lockScroll, unlockScroll } from "@/components/motion/lenis-store";
import { usePrefersReducedMotion } from "@/components/motion/use-media-query";
import { cn } from "@/lib/utils";
import { Availability } from "./availability";
import { SearchButton } from "@/components/fun/extras";
import { LanguageSwitch } from "./language-switch";
import { ariaCurrent, isActive, QUOTE_HREF } from "./nav-utils";
import { LogoLink } from "./wordmark";

const ITEMS = {
  pl: [...nav, { label: "Kontakt", href: "/kontakt" }],
  en: [...navEn, { label: "Contact", href: "/kontakt" }],
};

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function MobileMenu({
  open,
  pathname,
  onClose,
}: {
  open: boolean;
  pathname: string;
  onClose: (restoreFocus: boolean) => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const reduce = usePrefersReducedMotion();
  const locale = useLocale();
  const en = locale === "en";
  const items = ITEMS[locale].map((item) => ({ ...item, href: localizeHref(item.href, locale) }));

  useEffect(() => {
    if (!open) return;
    lockScroll();
    let id = requestAnimationFrame(() => {
      id = requestAnimationFrame(() => firstLinkRef.current?.focus({ preventScroll: true }));
    });
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(id);
      document.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [open, onClose]);

  const trapFocus = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const focusables = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (!first || !last) return;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const close = () => onClose(false);

  return (
    <div
      id="mobile-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      data-mobile-menu
      data-open={open}
      inert={!open}
      data-lenis-prevent
      onKeyDown={trapFocus}
      className={cn(
        "theme-ink group/menu fixed inset-0 z-[60] flex flex-col overflow-y-auto overscroll-contain lg:hidden",
        "invisible [clip-path:inset(0_0_100%_0)] transition-[clip-path,visibility] duration-700 ease-[var(--ease-out)]",
        "data-[open=true]:visible data-[open=true]:transition-[clip-path] data-[open=true]:[clip-path:inset(0_0_0_0)]",
      )}
    >
      <div className="container-x flex h-[var(--header-h)] shrink-0 items-center justify-between">
        <LogoLink onClick={close} locale={locale} />
        <button
          type="button"
          onClick={() => onClose(true)}
          className="-mr-3 inline-flex h-11 items-center gap-3 rounded-full px-3"
        >
          <span className="label-mono">{en ? "Close" : "Zamknij"}</span>
          <span aria-hidden className="relative block size-5">
            <span className="absolute left-0 top-1/2 h-[1.5px] w-full rotate-45 bg-current" />
            <span className="absolute left-0 top-1/2 h-[1.5px] w-full -rotate-45 bg-current" />
          </span>
          <span className="sr-only"> menu</span>
        </button>
      </div>

      <nav aria-label="Menu" className="container-x pt-3">
        <ol className="border-t hairline">
          {items.map((item, i) => (
            <li key={item.href} className="overflow-hidden border-b hairline">
              <Link
                ref={i === 0 ? firstLinkRef : undefined}
                href={item.href}
                onClick={close}
                aria-current={ariaCurrent(pathname, item.href)}
                className="flex translate-y-full items-baseline gap-4 py-2 transition-[translate] duration-700 ease-[var(--ease-out)] group-data-[open=true]/menu:translate-y-0"
                style={{ transitionDelay: open && !reduce ? `${110 + i * 55}ms` : "0ms" }}
              >
                <span className="label-mono w-7 shrink-0 text-mute tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span
                  className={cn(
                    "font-display text-[clamp(2.35rem,11vw,4.25rem)] font-semibold",
                    isActive(pathname, item.href) && "text-signal",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </nav>

      <div
        className="container-x mt-auto grid gap-7 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-10 opacity-0 transition-opacity duration-700 group-data-[open=true]/menu:opacity-100"
        style={{ transitionDelay: open && !reduce ? "380ms" : "0ms" }}
      >
        <Link
          href={localizeHref("/twoja-strona", locale)}
          onClick={close}
          className="flex items-center justify-between gap-4 rounded-[var(--radius)] border hairline px-4 py-3.5"
        >
          <span>
            <span className="label-mono block text-mute">{en ? "Live preview" : "Podgląd na żywo"}</span>
            <span className="mt-1 block font-medium">{en ? "See your website before you pay" : "Zobacz swoją stronę, zanim zapłacisz"}</span>
          </span>
          <svg aria-hidden viewBox="0 0 16 16" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M4 12 12 4M5.5 4H12v6.5" />
          </svg>
        </Link>

        <Link href={localizeHref(QUOTE_HREF, locale)} onClick={close} className={buttonClass("signal", "lg", "w-full justify-between hover:bg-paper hover:text-ink")}>
          <span className="relative">{en ? "Get a quote" : "Wyceń stronę"}</span>
          <Arrow />
        </Link>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <p className="label-mono text-mute">{en ? "Call" : "Zadzwoń"}</p>
            <a href={site.phoneHref} className="mt-1 inline-flex min-h-11 items-center font-display text-[clamp(1.9rem,8vw,2.5rem)] font-semibold">
              {site.phone}
            </a>
          </div>
          <div>
            <p className="label-mono text-mute">{en ? "Write" : "Napisz"}</p>
            <a href={`mailto:${site.email}`} className="mt-1 inline-flex min-h-11 items-center text-lg underline decoration-1 underline-offset-4">
              {site.email}
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <Availability className="w-fit" />
          <div className="flex items-center gap-2">
            <SearchButton wide />
            <LanguageSwitch className="-mr-1.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
