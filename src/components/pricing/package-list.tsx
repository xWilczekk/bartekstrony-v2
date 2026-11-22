import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { pricingFor, type Pack } from "@/content/pricing";
import { formatPrice } from "@/content/services";
import { localizeHref, type Locale } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { contactHref, cn } from "@/lib/utils";

const COPY = {
  pl: {
    recommended: "Polecany na start",
    from: "od",
    quote: "wycena",
    time: "Czas:",
    calc: "Policz to",
    calcAria: "Policz dokładnie:",
    describe: "Opisz pomysł",
    biggerTitle: "Coś większego?",
    biggerText: "Aplikacje, AI, panele klienta, własne narzędzia.",
  },
  en: {
    recommended: "Best place to start",
    from: "from",
    quote: "custom",
    time: "Time:",
    calc: "Price it",
    calcAria: "Get an exact price:",
    describe: "Describe your idea",
    biggerTitle: "Something bigger?",
    biggerText: "Apps, AI, client panels, custom tools.",
  },
} satisfies Record<Locale, Record<string, string>>;

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-[0.95rem] leading-snug">
      {items.map((b) => (
        <li key={b} className="flex gap-3">
          <span aria-hidden className="mt-[0.55em] h-px w-3 shrink-0 bg-current opacity-50" />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}

function PackRow({ pack, locale }: { pack: Pack; locale: Locale }) {
  const c = COPY[locale];
  const hl = pack.highlight;
  const price = pack.priceFrom;
  return (
    <article
      className={cn(
        "grid gap-x-8 gap-y-6 py-8 md:grid-cols-12 md:py-10",
        hl ? "theme-ink -mx-4 rounded-[var(--radius)] px-4 md:-mx-8 md:px-8" : "border-t hairline",
      )}
    >
      <div className="md:col-span-4">
        {hl && <p className="label-mono mb-3 text-signal">{c.recommended}</p>}
        <h3 className="font-display text-[clamp(1.9rem,3.4vw,2.75rem)] font-semibold">{pack.name}</h3>
        <p className="mt-3 max-w-xs text-pretty text-mute">{pack.forWho}</p>
      </div>

      <div className="md:col-span-3">
        <p className="flex items-baseline gap-2">
          {price ? (
            <>
              <span className="label-mono text-mute">{c.from}</span>
              <span className="font-display text-[clamp(2.6rem,5vw,3.75rem)] font-semibold leading-none tabular-nums">
                {formatPrice(price, locale)}
              </span>
            </>
          ) : (
            <span className="font-display text-[clamp(2.6rem,5vw,3.75rem)] font-semibold leading-none">{c.quote}</span>
          )}
        </p>
        <p className="mt-2 text-sm text-mute">{pack.priceNote}</p>
        <p className="label-mono mt-5 text-mute">
          {c.time} <span className={hl ? "text-paper" : "text-ink"}>{pack.timeline}</span>
        </p>
      </div>

      <div className="md:col-span-3">
        <Bullets items={pack.bullets} />
      </div>

      <div className="flex items-end md:col-span-2 md:justify-end">
        {price ? (
          <ButtonLink
            href={localizeHref(`/wycena?u=${pack.slug}`, locale)}
            variant={hl ? "paper" : "ink"}
            arrow
            className="w-full md:w-auto"
            aria-label={`${c.calcAria} ${pack.name}`}
          >
            {c.calc}
          </ButtonLink>
        ) : (
          <ButtonLink
            href={localizeHref(contactHref({ zrodlo: "cennik", usluga: pack.slug }), locale)}
            variant="ink"
            arrow
            className="w-full md:w-auto"
          >
            {c.describe}
          </ButtonLink>
        )}
      </div>
    </article>
  );
}

function BiggerRow({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  const { bigger } = pricingFor(locale);
  return (
    <article className="grid gap-x-8 gap-y-6 border-y hairline py-8 md:grid-cols-12 md:py-10">
      <div className="md:col-span-4">
        <h3 className="font-display text-[clamp(1.9rem,3.4vw,2.75rem)] font-semibold">{c.biggerTitle}</h3>
        <p className="mt-3 max-w-xs text-pretty text-mute">{c.biggerText}</p>
      </div>
      <div className="md:col-span-3">
        <p className="font-display text-[clamp(2.6rem,5vw,3.75rem)] font-semibold leading-none">{c.quote}</p>
        <p className="mt-2 text-sm text-mute">{bigger.priceNote}</p>
        <p className="label-mono mt-5 text-mute">
          {c.time} <span className="text-ink">{bigger.timeline}</span>
        </p>
      </div>
      <div className="md:col-span-3">
        <Bullets items={bigger.bullets} />
      </div>
      <div className="flex items-end md:col-span-2 md:justify-end">
        <ButtonLink
          href={localizeHref(contactHref({ zrodlo: "cennik", usluga: bigger.slug }), locale)}
          variant="ghost"
          arrow
          className="w-full md:w-auto"
        >
          {c.describe}
        </ButtonLink>
      </div>
    </article>
  );
}

export function PackageList({ packs }: { packs: Pack[] }) {
  const locale = getLocale();
  return (
    <div>
      {packs.map((p, i) => (
        <Reveal key={p.slug} from={i % 2 ? "right" : "left"}>
          <PackRow pack={p} locale={locale} />
        </Reveal>
      ))}
      <Reveal from={packs.length % 2 ? "right" : "left"}>
        <BiggerRow locale={locale} />
      </Reveal>
    </div>
  );
}
