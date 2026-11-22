"use client";

import type { ReactNode } from "react";
import { cities } from "@/content/cities";
import type { IndustrySlug } from "@/content/projects";
import { useLocale } from "@/i18n/client";
import { cn } from "@/lib/utils";
import {
  CITY_MAX,
  INDUSTRY_CHIP_EN,
  INDUSTRY_META,
  NAME_MAX,
  VIBES,
  VIBE_TEXT_EN,
  cleanText,
  metaFor,
  type PreviewState,
  type VibeSlug,
} from "./preview-model";

const COPY = {
  pl: { name: "Nazwa Twojej firmy", eg: "np.", clear: "Wyczyść nazwę firmy", industry: "Branża", city: "Miasto", optional: "(opcjonalnie)", style: "Styl" },
  en: { name: "Your business name", eg: "e.g.", clear: "Clear the business name", industry: "Industry", city: "Town", optional: "(optional)", style: "Style" },
};

export function PreviewControls({
  id,
  state,
  onName,
  onIndustry,
  onCity,
  onVibe,
  onSubmit,
  size = "hero",
  hint,
  after,
}: {
  id: string;
  state: PreviewState;
  onName: (v: string) => void;
  onIndustry: (v: IndustrySlug) => void;
  onCity: (v: string) => void;
  onVibe: (v: VibeSlug) => void;
  onSubmit?: () => void;
  size?: "hero" | "compact" | "panel";
  hint?: ReactNode;
  after?: ReactNode;
}) {
  const en = useLocale() === "en";
  const c = COPY[en ? "en" : "pl"];
  const compact = size === "compact";
  const hero = size === "hero" || compact;
  const sample = metaFor(state.industry).sample;

  return (
    <form
      className="min-w-0"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
    >
      <label htmlFor={`${id}-n`} className="label-mono block text-mute">
        {c.name}
      </label>
      <div className="relative mt-1.5">
        <input
          id={`${id}-n`}
          name="firma"
          type="text"
          value={state.name}
          onChange={(e) => onName(cleanText(e.target.value, NAME_MAX))}
          placeholder={`${c.eg} ${sample}`}
          autoComplete="organization"
          autoCapitalize="words"
          enterKeyHint="go"
          spellCheck={false}
          maxLength={NAME_MAX}
          className={cn(
            "w-full rounded-none border-0 border-b-2 border-ink bg-transparent pr-11 font-display tracking-[-0.03em] text-ink transition-colors placeholder:text-ink/30 focus-visible:border-signal focus-visible:outline-none",
            compact
              ? "h-12 text-[clamp(1.4rem,1.9vw,1.75rem)] font-semibold"
              : hero
                ? "h-14 text-[clamp(1.55rem,2.3vw,2.1rem)] font-semibold"
                : "h-12 text-2xl font-semibold",
          )}
        />
        {state.name && (
          <button
            type="button"
            onClick={() => onName("")}
            aria-label={c.clear}
            className="absolute top-1/2 right-0 grid size-10 -translate-y-1/2 place-items-center rounded-full text-mute transition-colors hover:bg-ink/5 hover:text-ink"
          >
            <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        )}
      </div>

      <fieldset className={cn("min-w-0", compact ? "mt-5" : hero ? "mt-6" : "mt-5")}>
        <legend className="label-mono flex w-full items-center gap-3 text-mute">
          <span>{c.industry}</span>
          {hint}
        </legend>
        <div
          className={cn(
            "mt-2.5 flex",
            compact ? "gap-1.5" : "gap-2",
            hero
              ? "-mx-[var(--gutter)] overflow-x-auto px-[var(--gutter)] pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
              : "flex-wrap",
          )}
        >
          {INDUSTRY_META.map((m) => (
            <label key={m.slug} className="relative shrink-0 cursor-pointer">
              <input
                type="radio"
                name={`${id}-b`}
                value={m.slug}
                checked={state.industry === m.slug}
                onChange={() => onIndustry(m.slug)}
                className="peer sr-only"
              />
              <span
                className={cn(
                  "inline-flex items-center rounded-full border border-ink/15 font-medium whitespace-nowrap text-ink transition-[background-color,border-color,color] duration-200 select-none hover:border-ink/60 peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-signal",
                  compact ? "h-10 px-3 text-[0.85rem]" : "h-11 px-3.5 text-[0.9rem]",
                )}
              >
                {en ? INDUSTRY_CHIP_EN[m.slug] : m.chip}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {after}

      <div className={cn("grid gap-x-5 gap-y-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end", compact ? "mt-5" : hero ? "mt-6" : "mt-5")}>
        <div className="min-w-0">
          <label htmlFor={`${id}-m`} className="label-mono block text-mute">
            {c.city} <span className="tracking-normal normal-case">{c.optional}</span>
          </label>
          <input
            id={`${id}-m`}
            name="miasto"
            type="text"
            list={`${id}-cities`}
            value={state.city}
            onChange={(e) => onCity(cleanText(e.target.value, CITY_MAX))}
            placeholder={`${c.eg} Białystok`}
            autoComplete="address-level2"
            enterKeyHint="go"
            maxLength={CITY_MAX}
            className="mt-1.5 h-10 w-full rounded-none border-0 border-b border-ink/30 bg-transparent text-lg text-ink transition-colors placeholder:text-ink/30 focus-visible:border-b-2 focus-visible:border-signal focus-visible:outline-none"
          />
          <datalist id={`${id}-cities`}>
            {cities.map((c) => (
              <option key={c.slug} value={c.name} />
            ))}
          </datalist>
        </div>
        <fieldset className="min-w-0">
          <legend className="label-mono text-mute">{c.style}</legend>
          <div className="mt-1.5 inline-flex rounded-full border border-ink/15 p-0.5">
            {VIBES.map((v) => (
              <label key={v.slug} className="relative cursor-pointer" title={en ? VIBE_TEXT_EN[v.slug].hint : v.hint}>
                <input
                  type="radio"
                  name={`${id}-s`}
                  value={v.slug}
                  checked={state.vibe === v.slug}
                  onChange={() => onVibe(v.slug)}
                  className="peer sr-only"
                />
                <span className="inline-flex h-10 items-center rounded-full px-3.5 text-[0.85rem] font-medium text-ink/75 transition-[background-color,color] duration-200 select-none hover:text-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-signal">
                  {en ? VIBE_TEXT_EN[v.slug].label : v.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>
    </form>
  );
}
