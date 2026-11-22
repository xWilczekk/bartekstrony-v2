"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { nav, navEn } from "@/content/site";
import { localizeHref } from "@/i18n/config";
import { useLocale } from "@/i18n/client";
import { Arrow, buttonClass } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { useMediaQuery } from "@/components/motion/use-media-query";
import { cn } from "@/lib/utils";
import { Availability } from "./availability";
import { SearchButton } from "@/components/fun/extras";
import { LanguageSwitch } from "./language-switch";
import { MobileMenu } from "./mobile-menu";
import { ariaCurrent, isActive, QUOTE_HREF } from "./nav-utils";
import { LogoLink } from "./wordmark";

type Tone = "paper" | "ink";

const SOLID_CSS = `
.bs-site-header{--header-bg:var(--paper)}
.bs-site-header[data-tone="ink"]{--header-bg:var(--ink)}
@supports (animation-timeline: scroll()){
  .bs-site-header{animation:bs-header-solid linear both;animation-timeline:scroll(root);animation-range:0 8px}
}
@keyframes bs-header-solid{from{background-color:transparent;border-color:transparent}to{background-color:var(--header-bg);border-color:var(--line)}}`;

function toneUnder(header: HTMLElement): Tone {
  const stack = document.elementsFromPoint(window.innerWidth / 2, header.offsetHeight / 2);
  for (const el of stack) {
    if (header.contains(el) || el.closest("[data-mobile-menu]")) continue;
    return el.closest(".theme-ink, [data-header-tone='ink']") ? "ink" : "paper";
  }
  return "paper";
}

export function SiteHeader() {
  const pathname = usePathname();
  const locale = useLocale();
  const en = locale === "en";
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [tone, setTone] = useState<Tone>("paper");
  const [focusWithin, setFocusWithin] = useState(false);

  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
  }
  const desktop = useMediaQuery("(min-width: 1024px)");
  if (desktop && menuOpen) setMenuOpen(false);

  const closeMenu = useCallback((restoreFocus: boolean) => {
    setMenuOpen(false);
    if (restoreFocus) requestAnimationFrame(() => menuButtonRef.current?.focus());
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    let lastY = window.scrollY;
    let raf = 0;

    const update = () => {
      raf = 0;
      const y = Math.max(0, window.scrollY);
      const dy = y - lastY;
      setScrolled(y > 8);
      if (y < 120) {
        setHidden(false);
        lastY = y;
      } else if (Math.abs(dy) > 6) {
        setHidden(dy > 0);
        lastY = y;
      }
      setTone(toneUnder(header));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const id = requestAnimationFrame(() => setTone(toneUnder(header)));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  const concealed = hidden && !menuOpen && !focusWithin;

  return (
    <>
      <style href="bs-site-header" precedence="medium">
        {SOLID_CSS}
      </style>
      <a
        href="#main"
        data-skip-link
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[80] focus:inline-flex focus:h-11 focus:items-center focus:rounded-full focus:bg-ink focus:px-5 focus:text-paper"
      >
        {en ? "Skip to content" : "Przejdź do treści"}
      </a>

      <header
        ref={headerRef}
        data-scrolled={scrolled}
        data-tone={tone}
        data-hidden={concealed}
        onFocus={(e) => setFocusWithin(e.target.matches(":focus-visible"))}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocusWithin(false);
        }}
        className={cn(
          "bs-site-header group/header fixed inset-x-0 top-0 z-50 h-[var(--header-h)] border-b border-transparent text-ink",
          "transition-[translate,background-color,border-color,color] duration-500 ease-[var(--ease-out)]",
          "data-[tone=ink]:text-paper data-[tone=ink]:[--line:var(--line-ink)] data-[tone=ink]:[--mute:var(--mute-ink)]",
          "data-[scrolled=true]:border-line data-[scrolled=true]:bg-paper data-[scrolled=true]:data-[tone=ink]:bg-ink",
          "data-[hidden=true]:-translate-y-full",
          "noscript:border-line noscript:bg-paper",
        )}
      >
        <div className="container-x flex h-full items-center gap-5">
          <LogoLink locale={locale} />
          <Availability className="hidden xl:inline-flex" />

          <nav aria-label={en ? "Main navigation" : "Główna nawigacja"} className="ml-auto hidden lg:block">
            <ul className="flex items-center">
              {(en ? navEn : nav).map((item) => (
                <li key={item.href}>
                  <NavLink
                    href={localizeHref(item.href, locale)}
                    label={item.label}
                    active={isActive(pathname, localizeHref(item.href, locale))}
                    current={ariaCurrent(pathname, localizeHref(item.href, locale))}
                  />
                </li>
              ))}
            </ul>
          </nav>

          <SearchButton className="hidden lg:inline-flex" />
          <LanguageSwitch className="-mr-2 hidden lg:flex" />

          <Magnetic className="hidden lg:inline-block">
            <Link
              href={localizeHref(QUOTE_HREF, locale)}
              className={buttonClass(
                "signal",
                "md",
                "h-10 pl-5 pr-4 group-data-[tone=ink]/header:hover:bg-paper group-data-[tone=ink]/header:hover:text-ink",
              )}
            >
              <span className="relative">{en ? "Get a quote" : "Wyceń stronę"}</span>
              <Arrow />
            </Link>
          </Magnetic>

          <a
            href="#mapa-strony"
            className="label-mono -mr-3 ml-auto hidden h-11 items-center rounded-full px-3 noscript:inline-flex lg:noscript:hidden"
          >
            Menu
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-haspopup="dialog"
            className="-mr-3 ml-auto inline-flex h-11 items-center gap-3 rounded-full px-3 noscript:hidden lg:hidden"
          >
            <span className="label-mono">Menu</span>
            <span aria-hidden className="flex w-6 flex-col gap-[5px]">
              <span className="h-[1.5px] w-full bg-current" />
              <span className="h-[1.5px] w-2/3 self-end bg-current" />
            </span>
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} pathname={pathname} onClose={closeMenu} />
    </>
  );
}

function NavLink({
  href,
  label,
  active,
  current,
}: {
  href: string;
  label: string;
  active: boolean;
  current?: "page" | "true";
}) {
  return (
    <Link
      href={href}
      aria-current={current}
      className="group/nav relative flex h-11 items-center rounded-full px-3.5 text-[0.94rem] font-medium tracking-tight"
    >
      <span
        aria-hidden
        className={cn(
          "absolute left-1 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-signal transition-[scale,opacity] duration-500 ease-[var(--ease-out)]",
          active ? "scale-100 opacity-100" : "scale-0 opacity-0",
        )}
      />
      <span className="relative block overflow-hidden leading-[1.4]">
        <span className="block transition-transform duration-500 ease-[var(--ease-out)] group-hover/nav:-translate-y-full">
          {label}
        </span>
        <span
          aria-hidden
          className="absolute left-0 top-full block transition-transform duration-500 ease-[var(--ease-out)] group-hover/nav:-translate-y-full"
        >
          {label}
        </span>
      </span>
    </Link>
  );
}
