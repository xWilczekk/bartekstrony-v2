"use client";

import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { counterpart, LOCALE_PREF_KEY, LOCALES, type Locale } from "@/i18n/config";
import { useLocale } from "@/i18n/client";
import { cn } from "@/lib/utils";

const NAMES: Record<Locale, string> = { pl: "Polski", en: "English" };

export function rememberLocale(locale: Locale) {
  try {
    localStorage.setItem(LOCALE_PREF_KEY, locale);
  } catch {}
}

export function LanguageSwitch({ className }: { className?: string }) {
  const pathname = usePathname();
  const locale = useLocale();

  const go = (target: Locale) => (e: MouseEvent<HTMLAnchorElement>) => {
    rememberLocale(target);
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    window.location.assign(e.currentTarget.pathname + window.location.search + window.location.hash);
  };

  return (
    <ul aria-label={locale === "en" ? "Language" : "Język"} className={cn("label-mono flex items-center", className)}>
      {LOCALES.map((l, i) => (
        <li key={l} className="flex items-center">
          {i > 0 && <span aria-hidden className="px-0.5 opacity-40">/</span>}
          {l === locale ? (
            <span aria-current="true" className="inline-flex h-11 items-center px-1.5">
              <span className="sr-only">{NAMES[l]}</span>
              <span aria-hidden>{l.toUpperCase()}</span>
            </span>
          ) : (
            <a
              href={counterpart(pathname, l)}
              hrefLang={l}
              lang={l}
              onClick={go(l)}
              className="inline-flex h-11 items-center px-1.5 opacity-55 transition-opacity duration-300 hover:opacity-100"
            >
              <span className="sr-only">{NAMES[l]}</span>
              <span aria-hidden>{l.toUpperCase()}</span>
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}
