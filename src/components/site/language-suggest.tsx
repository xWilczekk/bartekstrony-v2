"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { counterpart, LOCALE_PREF_KEY, type Locale } from "@/i18n/config";
import { CONSENT_EVENT, consentPending } from "@/lib/consent";
import { useLocale } from "@/i18n/client";
import { rememberLocale } from "./language-switch";

const COPY: Record<Locale, { text: string; go: string; stay: string }> = {
  en: { text: "This site is also available in English.", go: "Switch to English", stay: "No thanks" },
  pl: { text: "Ta strona jest też dostępna po polsku.", go: "Przejdź na polski", stay: "Nie, dzięki" },
};

function browserLocale(): Locale | null {
  for (const tag of navigator.languages ?? [navigator.language]) {
    const lang = tag.toLowerCase().split("-")[0];
    if (lang === "pl") return "pl";
    if (lang === "en") return "en";
  }
  return navigator.languages?.length ? "en" : null;
}

export function LanguageSuggest() {
  const pathname = usePathname();
  const locale = useLocale();
  const [suggest, setSuggest] = useState<Locale | null>(null);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(LOCALE_PREF_KEY);
    } catch {}
    if (stored) return;
    const wanted = browserLocale();
    if (!wanted || wanted === locale) return;
    let t = 0;
    const show = () => (t = window.setTimeout(() => setSuggest(wanted), 1200));
    if (!consentPending()) show();
    else window.addEventListener(CONSENT_EVENT, show, { once: true });
    return () => {
      window.clearTimeout(t);
      window.removeEventListener(CONSENT_EVENT, show);
    };
  }, [locale]);

  if (!suggest) return null;
  const c = COPY[suggest];
  const dismiss = () => {
    rememberLocale(locale);
    setSuggest(null);
  };

  return (
    <aside
      data-bottom-card
      lang={suggest}
      aria-label={c.text}
      className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[65] flex flex-wrap items-center gap-x-4 gap-y-3 rounded-[calc(var(--radius)+4px)] bg-ink p-4 text-paper shadow-[0_24px_60px_-20px_rgb(0_0_0/0.6)] sm:inset-x-auto sm:right-5 sm:max-w-md transition-[opacity,translate] duration-700 ease-[var(--ease-out)] starting:translate-y-4 starting:opacity-0"
    >
      <p className="min-w-0 flex-1 basis-56 text-[0.95rem] leading-snug">{c.text}</p>
      <div className="flex items-center gap-2">
        <a
          href={counterpart(pathname, suggest)}
          hrefLang={suggest}
          onClick={() => rememberLocale(suggest)}
          className="inline-flex h-10 items-center rounded-full bg-signal px-4 text-[0.92rem] font-medium text-ink transition-colors duration-300 hover:bg-paper"
        >
          {c.go}
        </a>
        <button
          type="button"
          onClick={dismiss}
          className="inline-flex h-10 items-center rounded-full px-3 text-[0.92rem] text-paper/75 transition-colors duration-300 hover:text-paper"
        >
          {c.stay}
        </button>
      </div>
    </aside>
  );
}
