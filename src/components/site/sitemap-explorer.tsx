"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useLocale } from "@/i18n/client";
import type { SitemapGroup } from "@/lib/sitemap";
import { cn } from "@/lib/utils";

const COPY = {
  pl: {
    search: "Szukaj podstrony, np. Białystok, sklep, blog…",
    label: "Szukaj podstrony",
    sections: "Sekcje",
    other: "EN",
    otherTitle: "English version",
    empty: "Nic nie pasuje. Spróbuj innego słowa.",
  },
  en: {
    search: "Search pages, e.g. store, pricing, audit…",
    label: "Search pages",
    sections: "Sections",
    other: "PL",
    otherTitle: "Polska wersja",
    empty: "Nothing matches. Try another word.",
  },
};

const norm = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ł/g, "l");

export function SitemapExplorer({ groups }: { groups: SitemapGroup[] }) {
  const c = COPY[useLocale()];
  const [q, setQ] = useState("");
  const query = norm(q.trim());

  const visible = useMemo(
    () =>
      groups
        .map((g) => ({ ...g, links: g.links.filter((l) => !query || norm(`${l.label} ${l.path} ${g.title}`).includes(query)) }))
        .filter((g) => g.links.length),
    [groups, query],
  );

  return (
    <>
      <div className="sticky top-[var(--header-h)] z-20 border-y hairline bg-paper/90 backdrop-blur-md transition-[top] duration-500 ease-[var(--ease-out)] [body:has(.bs-site-header[data-hidden=true])_&]:top-0">
        <div className="container-x flex flex-wrap items-center gap-3 py-3">
          <label className="flex h-11 min-w-0 flex-[1_1_260px] items-center gap-2.5 rounded-full border hairline bg-white px-4 focus-within:border-ink">
            <svg aria-hidden viewBox="0 0 16 16" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="7" cy="7" r="4.5" />
              <path d="m10.5 10.5 3 3" />
            </svg>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={c.search}
              aria-label={c.label}
              className="w-full min-w-0 bg-transparent outline-none"
            />
          </label>
          <nav aria-label={c.sections} className="-mx-1 flex max-w-full gap-1.5 overflow-x-auto px-1 [scrollbar-width:none]">
            {groups.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border hairline px-3.5 text-[0.9rem] font-medium transition-colors duration-300 hover:border-ink hover:bg-white"
              >
                {g.title} <span className="text-mute tabular-nums">{g.links.length}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="container-x pb-24 md:pb-32">
        {visible.map((g) => (
          <section key={g.id} id={g.id} className="scroll-mt-[calc(var(--header-h)+80px)] pt-14 md:pt-20">
            <div className="flex items-baseline gap-4 border-b-[1.5px] border-ink pb-3.5">
              <span className="label-mono text-signal">{String(groups.findIndex((x) => x.id === g.id) + 1).padStart(2, "0")}</span>
              <h2 className="font-display text-[clamp(1.6rem,3.2vw,2.5rem)] leading-tight font-semibold tracking-tight">{g.title}</h2>
              <span className="label-mono ml-auto text-mute tabular-nums">{g.links.length}</span>
            </div>
            <ol>
              {g.links.map((l, i) => (
                <li
                  key={l.href}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 border-b hairline py-3.5 transition-colors duration-300 hover:bg-[linear-gradient(90deg,color-mix(in_srgb,var(--highlight,var(--signal))_35%,transparent),transparent_70%)] sm:grid-cols-[2.5rem_minmax(0,1fr)_auto]"
                >
                  <span className="label-mono hidden text-mute tabular-nums sm:block">{String(i + 1).padStart(2, "0")}</span>
                  <span className="min-w-0">
                    <Link href={l.href} className="block text-[1.05rem] leading-snug font-semibold underline-offset-4 hover:underline">
                      {l.label}
                    </Link>
                    <span className="mt-0.5 block truncate font-mono text-[0.78rem] text-mute">{l.path}</span>
                  </span>
                  {l.other ? (
                    <Link
                      href={l.other}
                      hrefLang={c.other.toLowerCase()}
                      title={c.otherTitle}
                      className={cn(
                        "label-mono rounded-full border hairline px-2.5 py-1 transition-colors duration-300",
                        "hover:border-[var(--highlight,var(--signal))] hover:bg-[var(--highlight,var(--signal))] hover:text-ink",
                      )}
                    >
                      {c.other} ↗
                    </Link>
                  ) : (
                    <span />
                  )}
                </li>
              ))}
            </ol>
          </section>
        ))}
        {visible.length === 0 && <p className="py-24 text-center text-lg text-mute">{c.empty}</p>}
      </div>
    </>
  );
}
