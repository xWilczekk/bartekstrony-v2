"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { projectsFor } from "@/content/projects";
import { servicesFor } from "@/content/services";
import { site } from "@/content/site";
import { counterpart, localizeHref } from "@/i18n/config";
import { useLocale } from "@/i18n/client";
import { lockScroll, scrollToY, unlockScroll } from "@/components/motion/lenis-store";
import { cn } from "@/lib/utils";

type Command = { id: string; group: string; label: string; hint?: string; keywords?: string; run: () => void };

const COPY = {
  pl: {
    placeholder: "Dokąd chcesz przejść? Wpisz np. cennik, audyt, taxi…",
    pages: "Strony",
    actions: "Akcje",
    services: "Usługi",
    work: "Realizacje",
    empty: "Nic nie pasuje. Spróbuj „cennik” albo „kontakt”.",
    hint: "↑↓ wybór · Enter otwórz · Esc zamknij",
    label: "Szybka nawigacja",
  },
  en: {
    placeholder: "Where to? Try pricing, audit, taxi…",
    pages: "Pages",
    actions: "Actions",
    services: "Services",
    work: "Work",
    empty: "Nothing matches. Try “pricing” or “contact”.",
    hint: "↑↓ select · Enter open · Esc close",
    label: "Quick navigation",
  },
};

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ł/g, "l");

export default function CommandPalette({ onClose, onXray }: { onClose: () => void; onXray: () => void }) {
  const router = useRouter();
  const locale = useLocale();
  const en = locale === "en";
  const c = COPY[locale];
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const commands = useMemo<Command[]>(() => {
    const go = (href: string) => () => {
      onClose();
      router.push(localizeHref(href, locale));
    };
    const pages: [string, string, string?][] = en
      ? [
          ["Home", "/", "start"],
          ["Work", "/realizacje", "portfolio projects"],
          ["Services", "/oferta", "offer"],
          ["Pricing", "/cennik", "price cost"],
          ["Online quote", "/wycena", "calculator estimate"],
          ["Free website audit", "/audyt", "speed pagespeed test"],
          ["Preview your website", "/twoja-strona", "demo generator"],
          ["Contact", "/kontakt", "write message form"],
          ["Privacy policy", "/polityka-prywatnosci", "gdpr data"],
        ]
      : [
          ["Strona główna", "/", "start home"],
          ["Realizacje", "/realizacje", "portfolio projekty"],
          ["Oferta", "/oferta", "uslugi"],
          ["Cennik", "/cennik", "ceny koszt ile kosztuje"],
          ["Wycena online", "/wycena", "kalkulator"],
          ["Darmowy audyt strony", "/audyt", "test szybkosci pagespeed"],
          ["Podgląd Twojej strony", "/twoja-strona", "demo generator"],
          ["Kontakt", "/kontakt", "napisz formularz"],
          ["Blog", "/blog", "artykuly poradnik"],
          ["Branże", "/branze", "restauracje hotele warsztaty"],
          ["Polityka prywatności", "/polityka-prywatnosci", "rodo dane"],
        ];

    return [
      ...pages.map(([label, href, keywords]) => ({ id: `p:${href}`, group: c.pages, label, keywords, hint: localizeHref(href, locale), run: go(href) })),
      {
        id: "a:call",
        group: c.actions,
        label: en ? "Call me" : "Zadzwoń",
        hint: site.phone,
        keywords: "telefon phone",
        run: () => {
          onClose();
          window.location.href = site.phoneHref;
        },
      },
      {
        id: "a:mail",
        group: c.actions,
        label: en ? "Copy my e-mail" : "Skopiuj mój e-mail",
        hint: site.email,
        keywords: "mail email adres",
        run: () => {
          void navigator.clipboard?.writeText(site.email);
          onClose();
        },
      },
      {
        id: "a:xray",
        group: c.actions,
        label: en ? "X-ray: show how this site is built" : "Rentgen: pokaż, jak zbudowana jest ta strona",
        keywords: "xray rentgen kod code dev",
        run: onXray,
      },
      {
        id: "a:lang",
        group: c.actions,
        label: en ? "Przełącz na polski" : "Switch to English",
        keywords: "jezyk language english polski",
        run: () => {
          onClose();
          window.location.assign(counterpart(window.location.pathname, en ? "pl" : "en"));
        },
      },
      {
        id: "a:top",
        group: c.actions,
        label: en ? "Back to top" : "Do góry",
        keywords: "top gora",
        run: () => {
          onClose();
          scrollToY(0);
        },
      },
      ...servicesFor(locale).map((s) => ({
        id: `s:${s.slug}`,
        group: c.services,
        label: s.name,
        hint: s.priceFrom ? (en ? `from PLN ${s.priceFrom}` : `od ${s.priceFrom} zł`) : undefined,
        keywords: s.keyword,
        run: go(`/oferta/${s.slug}`),
      })),
      ...projectsFor(locale).map((p) => ({
        id: `w:${p.slug}`,
        group: c.work,
        label: p.title,
        hint: p.category,
        keywords: `${p.client} ${p.city ?? ""} ${p.tags.join(" ")}`,
        run: go(`/realizacje/${p.slug}`),
      })),
    ];
  }, [c, en, locale, onClose, onXray, router]);

  const results = useMemo(() => {
    const q = norm(query.trim());
    if (!q) return commands.filter((cmd) => cmd.group !== c.work).slice(0, 14);
    const words = q.split(/\s+/);
    return commands
      .map((cmd) => {
        const hay = norm(`${cmd.label} ${cmd.keywords ?? ""} ${cmd.hint ?? ""}`);
        const label = norm(cmd.label);
        if (!words.every((w) => hay.includes(w))) return null;
        return { cmd, score: label.startsWith(words[0]) ? 0 : label.includes(words[0]) ? 1 : 2 };
      })
      .filter((r): r is { cmd: Command; score: number } => r !== null)
      .sort((a, b) => a.score - b.score)
      .slice(0, 12)
      .map((r) => r.cmd);
  }, [commands, query, c.work]);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    lockScroll();
    inputRef.current?.focus();
    return () => {
      unlockScroll();
      previous?.focus?.();
    };
  }, []);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      results[active]?.run();
    } else if (e.key === "Tab") {
      e.preventDefault();
    }
  };

  return (
    <div className="fixed inset-0 z-[95] flex items-start justify-center bg-ink/40 px-3 pt-[12vh] backdrop-blur-[2px]" onMouseDown={onClose} data-lenis-prevent>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={c.label}
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={onKey}
        className="w-full max-w-xl overflow-hidden rounded-[calc(var(--radius)+6px)] bg-paper text-ink shadow-[0_40px_100px_-30px_rgb(0_0_0/0.6)] ring-1 ring-ink/10 motion-safe:animate-[bs-palette-in_0.22s_var(--ease-out)]"
      >
        <style>{`@keyframes bs-palette-in{from{opacity:0;transform:translateY(-8px) scale(.98)}}`}</style>
        <div className="flex items-center gap-3 border-b hairline px-4">
          <svg aria-hidden viewBox="0 0 16 16" className="size-4 shrink-0 text-mute" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="7" cy="7" r="4.5" />
            <path d="m10.5 10.5 3 3" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder={c.placeholder}
            aria-label={c.label}
            aria-controls="bs-palette-list"
            aria-activedescendant={results[active] ? `bs-cmd-${active}` : undefined}
            role="combobox"
            aria-expanded="true"
            className="h-14 w-full bg-transparent text-[1.05rem] outline-none placeholder:text-mute"
          />
          <kbd className="label-mono shrink-0 rounded border hairline px-1.5 py-0.5 text-mute">Esc</kbd>
        </div>
        <ul id="bs-palette-list" role="listbox" ref={listRef} className="max-h-[min(60vh,26rem)] overflow-y-auto p-2">
          {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-mute">{c.empty}</li>}
          {results.map((cmd, i) => {
            const header = i === 0 || results[i - 1].group !== cmd.group ? cmd.group : null;
            return (
              <li key={cmd.id} role="presentation">
                {header && <p className="label-mono px-3 pt-3 pb-1.5 text-mute">{header}</p>}
                <button
                  type="button"
                  id={`bs-cmd-${i}`}
                  role="option"
                  aria-selected={i === active}
                  data-index={i}
                  onMouseMove={() => setActive(i)}
                  onClick={() => cmd.run()}
                  className={cn(
                    "flex w-full items-center justify-between gap-4 rounded-[var(--radius)] px-3 py-2.5 text-left",
                    i === active ? "bg-ink text-paper" : "hover:bg-ink/5",
                  )}
                >
                  <span className="truncate font-medium">{cmd.label}</span>
                  {cmd.hint && <span className={cn("label-mono shrink-0 truncate", i === active ? "text-paper/60" : "text-mute")}>{cmd.hint}</span>}
                </button>
              </li>
            );
          })}
        </ul>
        <p className="label-mono border-t hairline px-4 py-2.5 text-mute">{c.hint}</p>
      </div>
    </div>
  );
}
