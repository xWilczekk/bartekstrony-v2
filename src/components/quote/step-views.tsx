"use client";

import type { ReactNode } from "react";
import { addonPrice, addonsForLocale, contentOptions, express, pricingFor, quoteServiceOrder } from "@/content/pricing";
import { formatPrice, getServiceFor } from "@/content/services";
import type { Locale } from "@/i18n/config";
import { useLocale } from "@/i18n/client";
import { cn, plural } from "@/lib/utils";

const COPY = {
  pl: {
    from: "od",
    quote: "wycena",
    less: "Mniej",
    more: "Więcej",
    included: (n: string) => `W cenie bazowej: ${n}.`,
    surcharge: (n: string) => `Dopłata za ${n} ponad pakiet:`,
    each: (p: string) => `Każda kolejna: ok. ${p}.`,
    products: "produktów",
    inPrice: "w cenie",
    shopIncl: "Płatności, kurierzy, panel zamówień i SEO produktów są już w cenie sklepu. Tu zaznacz tylko to, co ponad.",
    monthly: "miesięcznie",
    noneOk: "Nic nie musisz zaznaczać. Brak funkcji też jest dobrym wyborem na start.",
    spec: "Specyfikacja",
    specHave: ["Mam opis lub makiety", "Choćby szkic na kartce albo dokument."],
    specHelp: ["Pomóż mi to doprecyzować", "Opowiesz o pomyśle, a ja zadam pytania."],
    texts: "Teksty na stronie",
    textsHave: "Mam własne teksty",
    textsHelp: ["Napisz je za mnie", "Opowiesz o firmie, a ja przygotuję teksty."],
    photos: "Zdjęcia",
    photosNote: "Sesja zdjęciowa u fotografa to osobny koszt — mogę polecić sprawdzone osoby.",
    photosHave: "Mam własne zdjęcia",
    photosHelp: ["Pomóż dobrać i obrobić", "Wybiorę najlepsze, poprawię kadr i światło."],
    logo: "Logo i kolory",
    logoHave: "Mam logo",
    logoNeed: ["Potrzebuję logo", "Logo plus kolory i fonty pod stronę."],
    standard: "Standardowo",
    standardHint: (d: string) => `Spokojna praca, ok. ${d}.`,
    standardApps: "kilku tygodni",
    express: "Ekspres",
    expressHint: (d: string) => `Przesuwam inne zlecenia, ok. ${d}. Termin potwierdzam w wycenie.`,
    expressApps: "połowa czasu",
  },
  en: {
    from: "from",
    quote: "quote",
    less: "Fewer",
    more: "More",
    included: (n: string) => `Included in the base price: ${n}.`,
    surcharge: (n: string) => `Extra for ${n} beyond the package:`,
    each: (p: string) => `Each extra one: about ${p}.`,
    products: "products",
    inPrice: "included",
    shopIncl: "Payments, couriers, the order panel and product SEO are already in the store price. Only tick what goes beyond that.",
    monthly: "per month",
    noneOk: "You don’t have to tick anything. No extras is a fine way to start, too.",
    spec: "Specification",
    specHave: ["I have a description or mock-ups", "Even a sketch on paper or a document."],
    specHelp: ["Help me define it", "You tell me about the idea, I ask the questions."],
    texts: "Website copy",
    textsHave: "I have my own copy",
    textsHelp: ["Write it for me", "You tell me about the business, I prepare the copy."],
    photos: "Photos",
    photosNote: "A professional photo shoot is a separate cost — I can recommend people I trust.",
    photosHave: "I have my own photos",
    photosHelp: ["Help me choose and edit them", "I’ll pick the best ones and fix framing and light."],
    logo: "Logo and colours",
    logoHave: "I have a logo",
    logoNeed: ["I need a logo", "A logo plus colours and fonts for the site."],
    standard: "Standard",
    standardHint: (d: string) => `Calm, steady work, about ${d}.`,
    standardApps: "a few weeks",
    express: "Express",
    expressHint: (d: string) => `I move other jobs around, about ${d}. I confirm the date in the quote.`,
    expressApps: "half the time",
  },
} satisfies Record<Locale, unknown>;
import { computeQuote, defaultScope, formatDays, type QuoteState } from "./calc";

export type StepProps = {
  state: QuoteState;
  set: (patch: Partial<QuoteState>) => void;
  labelId: string;
};

function Option({
  type,
  name,
  value,
  checked,
  onChange,
  title,
  hint,
  aside,
  className,
}: {
  type: "radio" | "checkbox";
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  title: ReactNode;
  hint?: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("relative block cursor-pointer", className)}>
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <span
        className={cn(
          "flex h-full min-h-[4.25rem] items-start gap-4 rounded-[var(--radius)] border p-4 transition-[border-color,background-color] duration-200 sm:p-5",
          "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-signal",
          checked ? "border-ink bg-paper-2" : "border-line hover:border-ink/50",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "mt-0.5 grid size-5 shrink-0 place-items-center border transition-colors",
            type === "radio" ? "rounded-full" : "rounded-[5px]",
            checked ? "border-ink bg-ink text-paper" : "border-ink/30",
          )}
        >
          {checked &&
            (type === "radio" ? (
              <span className="size-1.5 rounded-full bg-paper" />
            ) : (
              <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m2 6.5 2.6 2.5L10 3.5" />
              </svg>
            ))}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-medium leading-snug">{title}</span>
          {hint && <span className="mt-1 block text-sm leading-snug text-mute">{hint}</span>}
        </span>
        {aside && <span className="shrink-0 pl-2 text-right text-sm font-medium tabular-nums">{aside}</span>}
      </span>
    </label>
  );
}

export function StepService({ state, set, labelId }: StepProps) {
  const locale = useLocale();
  const c = COPY[locale];
  const { quoteServices } = pricingFor(locale);
  return (
    <div role="radiogroup" aria-labelledby={labelId} className="grid gap-3 sm:grid-cols-2">
      {quoteServiceOrder.map((slug) => {
        const svc = getServiceFor(slug, locale);
        const q = quoteServices[slug];
        return (
          <Option
            key={slug}
            type="radio"
            name="usluga"
            value={slug}
            checked={state.service === slug}
            onChange={() =>
              set({
                service: slug,
                scope: defaultScope(slug),
                addons: state.service === slug ? state.addons : [],
              })
            }
            title={q.label}
            hint={svc?.forWho}
            aside={q.base ? <>{`${c.from} ${formatPrice(q.base, locale)}`}</> : <>{c.quote}</>}
          />
        );
      })}
    </div>
  );
}

export function StepScope({ state, set, labelId }: StepProps) {
  const locale = useLocale();
  const c = COPY[locale];
  const money = (n: number) => formatPrice(n, locale);
  const svc = state.service ? pricingFor(locale).quoteServices[state.service] : null;
  if (!svc) return null;
  const sc = svc.scope;

  if (sc.kind === "slider") {
    const n = state.scope;
    const extra = Math.max(0, n - sc.included);
    const dec = () => set({ scope: Math.max(sc.min, n - 1) });
    const inc = () => set({ scope: Math.min(sc.max, n + 1) });
    const stepBtn =
      "grid size-14 shrink-0 place-items-center rounded-full border border-line text-2xl leading-none transition-colors hover:border-ink disabled:opacity-30 disabled:hover:border-line";
    return (
      <div role="group" aria-labelledby={labelId}>
        <div className="flex items-center justify-between gap-4 rounded-[var(--radius)] border border-line bg-paper-2 p-4 sm:p-6">
          <button type="button" onClick={dec} disabled={n <= sc.min} className={stepBtn} aria-label={c.less}>
            −
          </button>
          <p className="text-center" aria-live="polite">
            <span className="block font-display text-[clamp(3.5rem,12vw,5.5rem)] font-semibold leading-none tabular-nums">
              {n}
            </span>
            <span className="label-mono mt-2 block text-mute">{plural(n, sc.unit)}</span>
          </p>
          <button type="button" onClick={inc} disabled={n >= sc.max} className={stepBtn} aria-label={c.more}>
            +
          </button>
        </div>
        <input
          type="range"
          min={sc.min}
          max={sc.max}
          step={1}
          value={n}
          onChange={(e) => set({ scope: Number(e.target.value) })}
          aria-label={sc.question}
          className="mt-6 h-11 w-full cursor-pointer accent-[var(--signal)]"
        />
        <div className="label-mono flex justify-between text-mute">
          <span>{sc.min}</span>
          <span>{sc.max}</span>
        </div>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-mute">
          {c.included(`${sc.included} ${plural(sc.included, sc.unit)}`)}{" "}
          {extra > 0 ? (
            <>
              {c.surcharge(`${extra} ${plural(extra, sc.unit)}`)}{" "}
              <strong className="font-medium text-ink">{money(extra * sc.perExtra)}</strong>.
            </>
          ) : (
            <>{c.each(money(sc.perExtra))}</>
          )}
        </p>
      </div>
    );
  }

  if (sc.kind === "steps") {
    return (
      <div role="radiogroup" aria-labelledby={labelId} className="grid gap-3 sm:grid-cols-2">
        {sc.steps.map((s, i) => (
          <Option
            key={s.label}
            type="radio"
            name="zakres"
            value={String(i)}
            checked={state.scope === i}
            onChange={() => set({ scope: i })}
            title={`${s.label} ${c.products}`}
            aside={s.add > 0 ? `+ ${money(s.add)}` : c.inPrice}
          />
        ))}
      </div>
    );
  }

  return (
    <div role="radiogroup" aria-labelledby={labelId} className="grid gap-3">
      {sc.options.map((o, i) => (
        <Option
          key={o.label}
          type="radio"
          name="zakres"
          value={String(i)}
          checked={state.scope === i}
          onChange={() => set({ scope: i })}
          title={o.label}
          hint={o.hint}
        />
      ))}
    </div>
  );
}

export function StepAddons({ state, set, labelId }: StepProps) {
  const locale = useLocale();
  const c = COPY[locale];
  if (!state.service) return null;
  const slug = state.service;
  const priced = pricingFor(locale).quoteServices[slug].base !== null;
  const list = addonsForLocale(slug, locale);
  const toggle = (id: string) =>
    set({ addons: state.addons.includes(id) ? state.addons.filter((a) => a !== id) : [...state.addons, id] });

  return (
    <div role="group" aria-labelledby={labelId}>
      {slug === "sklep-internetowy" && (
        <p className="mb-4 max-w-xl text-sm leading-relaxed text-mute">
          {c.shopIncl}
        </p>
      )}
      <div className="grid gap-3 sm:grid-cols-2">
        {list.map((a) => (
          <Option
            key={a.id}
            type="checkbox"
            name="funkcje"
            value={a.id}
            checked={state.addons.includes(a.id)}
            onChange={() => toggle(a.id)}
            title={a.label}
            hint={a.hint}
            aside={
              priced ? (
                <>
                  + {a.from ? `${c.from} ` : ""}
                  {formatPrice(addonPrice(a, slug), locale)}
                  {a.recurring && <span className="block text-xs font-normal text-mute">{c.monthly}</span>}
                </>
              ) : undefined
            }
          />
        ))}
      </div>
      <p className="mt-5 text-sm text-mute">{c.noneOk}</p>
    </div>
  );
}

function Question({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <fieldset className="min-w-0">
      <legend className="label-mono mb-3 text-mute">{title}</legend>
      <div className="grid gap-3 sm:grid-cols-2">{children}</div>
      {note && <p className="mt-2 text-sm text-mute">{note}</p>}
    </fieldset>
  );
}

export function StepContent({ state, set, labelId }: StepProps) {
  const locale = useLocale();
  const c = COPY[locale];
  const money = (n: number) => formatPrice(n, locale);
  if (!state.service) return null;
  const svc = pricingFor(locale).quoteServices[state.service];

  if (svc.slug === "aplikacje-ai") {
    return (
      <div role="group" aria-labelledby={labelId}>
        <Question title={c.spec}>
          <Option
            type="radio"
            name="teksty"
            value="have"
            checked={state.texts === "have"}
            onChange={() => set({ texts: "have" })}
            title={c.specHave[0]}
            hint={c.specHave[1]}
          />
          <Option
            type="radio"
            name="teksty"
            value="help"
            checked={state.texts === "help"}
            onChange={() => set({ texts: "help" })}
            title={c.specHelp[0]}
            hint={c.specHelp[1]}
          />
        </Question>
      </div>
    );
  }

  const sc = svc.scope;
  const pages = sc.kind === "slider" ? state.scope : (svc.copyFlat ?? 1);
  const textsPrice = Math.max(contentOptions.texts.min, contentOptions.texts.perPage * pages);

  return (
    <div role="group" aria-labelledby={labelId} className="space-y-8">
      <Question title={c.texts}>
        <Option
          type="radio"
          name="teksty"
          value="have"
          checked={state.texts === "have"}
          onChange={() => set({ texts: "have" })}
          title={c.textsHave}
          aside={c.inPrice}
        />
        <Option
          type="radio"
          name="teksty"
          value="help"
          checked={state.texts === "help"}
          onChange={() => set({ texts: "help" })}
          title={c.textsHelp[0]}
          hint={c.textsHelp[1]}
          aside={`+ ${money(textsPrice)}`}
        />
      </Question>
      <Question title={c.photos} note={c.photosNote}>
        <Option
          type="radio"
          name="zdjecia"
          value="have"
          checked={state.photos === "have"}
          onChange={() => set({ photos: "have" })}
          title={c.photosHave}
          aside={c.inPrice}
        />
        <Option
          type="radio"
          name="zdjecia"
          value="help"
          checked={state.photos === "help"}
          onChange={() => set({ photos: "help" })}
          title={c.photosHelp[0]}
          hint={c.photosHelp[1]}
          aside={`+ ${money(contentOptions.photos.help)}`}
        />
      </Question>
      <Question title={c.logo}>
        <Option
          type="radio"
          name="logo"
          value="have"
          checked={state.logo === "have"}
          onChange={() => set({ logo: "have" })}
          title={c.logoHave}
          aside={c.inPrice}
        />
        <Option
          type="radio"
          name="logo"
          value="need"
          checked={state.logo === "need"}
          onChange={() => set({ logo: "need" })}
          title={c.logoNeed[0]}
          hint={c.logoNeed[1]}
          aside={`+ ${money(contentOptions.logo.need)}`}
        />
      </Question>
    </div>
  );
}

export function StepSpeed({ state, set, labelId }: StepProps) {
  const locale = useLocale();
  const c = COPY[locale];
  const std = computeQuote({ ...state, speed: "standard" }, locale);
  const exp = computeQuote({ ...state, speed: "express" }, locale);
  const priced = !!std?.priced;
  return (
    <div role="radiogroup" aria-labelledby={labelId} className="grid gap-3 sm:grid-cols-2">
      <Option
        type="radio"
        name="termin"
        value="standard"
        checked={state.speed === "standard"}
        onChange={() => set({ speed: "standard" })}
        title={c.standard}
        hint={std ? c.standardHint(priced ? formatDays(std.days, locale) : c.standardApps) : undefined}
        aside={c.inPrice}
      />
      <Option
        type="radio"
        name="termin"
        value="express"
        checked={state.speed === "express"}
        onChange={() => set({ speed: "express" })}
        title={c.express}
        hint={exp ? c.expressHint(priced ? formatDays(exp.days, locale) : c.expressApps) : undefined}
        aside={priced ? `+ ${Math.round(express.surcharge * 100)}%` : undefined}
      />
    </div>
  );
}
