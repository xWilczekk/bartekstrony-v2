import "./signature.css";
import type { CSSProperties } from "react";
import { heroStats, heroStatsEn, site } from "@/content/site";
import { ButtonLink } from "@/components/ui/button";
import { projectsFor } from "@/content/projects";
import { localizeHref, type Locale } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { cn, contactHref, plural } from "@/lib/utils";
import { Count } from "@/components/motion/count";
import { KineticHeadline } from "./kinetic-headline";

const GUARANTEES: Record<Locale, { title: string; note: string }[]> = {
  pl: [
    { title: "Wycena w 24h", note: "konkretna kwota, bez gwiazdek" },
    { title: "Widzisz projekt przed startem", note: "akceptujesz wygląd, zanim strona wejdzie do sieci" },
    { title: "30 dni wsparcia technicznego", note: "gdyby coś przestało działać, naprawiam bez dopłat" },
    { title: "Domena i strona są Twoje", note: "rejestrujesz je na siebie, masz pełną kontrolę" },
  ],
  en: [
    { title: "Quote within 24h", note: "a specific amount, no asterisks" },
    { title: "You see the design before launch", note: "you approve the look before the site goes live" },
    { title: "30 days of technical support", note: "if something stops working, I fix it at no extra cost" },
    { title: "The domain and site are yours", note: "registered in your name, under your full control" },
  ],
};

const COPY = {
  pl: {
    portraitAlt: "Bartek, który projektuje i koduje strony na bartekstrony.pl",
    h1: (
      <>
        Strony internetowe i&nbsp;sklepy dla firm{" "}
        <span className="text-mute">z&nbsp;Białegostoku, Sokółki i&nbsp;całej Polski</span>
      </>
    ),
    pitch: (
      <>
        <strong className="font-semibold text-ink">
          Projektuję strony, które przynoszą telefony, rezerwacje i&nbsp;zamówienia.
        </strong>{" "}
        Szybkie, widoczne w&nbsp;Google i&nbsp;zrobione pod Twoich klientów, a&nbsp;nie tylko ładne.
      </>
    ),
    cta: "Wyceń stronę",
    orCall: "albo zadzwoń do mnie",
    callSr: "Zadzwoń: ",
    trusted: "Zaufali mi:",
    and: "i",
    others: (n: number) => `${n} ${plural(n, ["inna firma", "inne firmy", "innych firm"])}`,
    preview: "Zobacz swoją stronę, zanim zapłacisz",
  },
  en: {
    portraitAlt: "Bartek, who designs and codes the websites at bartekstrony.pl",
    h1: (
      <>
        Websites and online stores for businesses{" "}
        <span className="text-mute">in&nbsp;Białystok, Sokółka and all of&nbsp;Poland</span>
      </>
    ),
    pitch: (
      <>
        <strong className="font-semibold text-ink">I design websites that bring in calls, bookings and&nbsp;orders.</strong>{" "}
        Fast, visible on Google and built for your customers, not just pretty.
      </>
    ),
    cta: "Get a quote",
    orCall: "or give me a call",
    callSr: "Call: ",
    trusted: "Trusted by:",
    and: "and",
    others: (n: number) => `${n} other ${n === 1 ? "business" : "businesses"}`,
    preview: "See your website before you pay",
  },
};

const Check = () => (
  <span aria-hidden="true" className="mt-0.5 grid size-5 shrink-0 place-items-center bg-[var(--highlight,var(--signal))] text-ink">
    <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M2.5 6.2l2.3 2.3 4.7-5" />
    </svg>
  </span>
);

const PORTRAIT: "card" | "circle" = "circle";

const figureClass =
  "relative mx-auto mb-10 w-full max-w-[30rem] lg:col-span-5 lg:-ml-[12%] lg:mb-14 lg:w-[112%] lg:max-w-none lg:self-center";

const PORTRAIT_SIZES = [640, 768, 1080, 1464];
const portraitSrc = (w: number) => `/portrait/bartek-${w}.webp`;

const PortraitImage = ({ className, style }: { className?: string; style?: CSSProperties }) => (
  // eslint-disable-next-line @next/next/no-img-element -- pre-sized files, see above
  <img
    src={portraitSrc(1080)}
    srcSet={PORTRAIT_SIZES.map((w) => `${portraitSrc(w)} ${w}w`).join(", ")}
    sizes="(min-width: 1440px) 620px, (min-width: 1024px) 45vw, (min-width: 540px) 480px, calc(100vw - 32px)"
    width={976}
    height={1024}
    alt={COPY[getLocale()].portraitAlt}
    fetchPriority="high"
    decoding="async"
    className={cn("relative h-auto w-full", className)}
    style={style}
  />
);

function PortraitCard() {
  return (
    <figure className={cn(figureClass, "[--card-r:2rem] lg:[--card-r:2.75rem]")}>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[17%] bottom-0 rounded-[var(--card-r)]"
        style={{ background: "radial-gradient(75% 55% at 60% 12%, var(--signal-2), transparent 72%), var(--signal)" }}
      />
      <PortraitImage className="[clip-path:inset(-20%_0_0_0_round_0_0_var(--card-r)_var(--card-r))]" />
    </figure>
  );
}

const CIRCLE_MASK =
  "linear-gradient(#000 0 0) top / 100% 50.78% no-repeat, radial-gradient(40.98% 39.06% at 59.02% 50.78%, #000 99.4%, transparent 100%)";

function PortraitCircle() {
  return (
    <figure className={cn(figureClass, "mb-[calc(2.5rem-10.6%)] max-lg:-translate-x-[9%] lg:mb-[calc(3.5rem-10.6%)]")}>
      <div
        aria-hidden="true"
        className="absolute top-[13.5%] left-[15.5%] aspect-square w-[81.97%] rounded-full border border-ink/25"
      />
      <div
        aria-hidden="true"
        className="absolute top-[11.72%] left-[18.03%] aspect-square w-[81.97%] rounded-full"
        style={{ background: "radial-gradient(70% 60% at 50% 22%, var(--signal-2), transparent 75%), var(--signal)" }}
      />
      <PortraitImage style={{ mask: CIRCLE_MASK, WebkitMask: CIRCLE_MASK }} />
    </figure>
  );
}

export function Hero() {
  const locale = getLocale();
  const c = COPY[locale];
  const projects = projectsFor(locale);
  const localPhone = site.phone.replace(/^\+48\s*/, "");
  const trusted = projects.filter((p) => p.featured);
  const others = projects.length - trusted.length;

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-x-clip bg-paper pt-[calc(var(--header-h)+1rem)] md:pt-[calc(var(--header-h)+1.5rem)]"
    >
      <div className="container-x grid gap-x-10 lg:grid-cols-12 xl:gap-x-16">
        <div className="min-w-0 pb-10 lg:col-span-7 lg:self-center lg:pb-14">
          <h1
            id="hero-title"
            className="flex max-w-[56ch] items-baseline gap-3 text-[0.95rem] leading-snug font-medium tracking-tight text-ink"
          >
            <span aria-hidden="true" className="relative -top-[0.12em] inline-block size-2 shrink-0 bg-signal" />
            <span>{c.h1}</span>
          </h1>

          <KineticHeadline className="sg-kinetic-xl mt-5 lg:mt-6" />

          <p className="mt-6 max-w-[36rem] text-base leading-relaxed text-pretty text-mute sm:text-lg lg:mt-7">
            {c.pitch}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 lg:mt-8">
            <ButtonLink
              href={localizeHref(contactHref({ zrodlo: "hero" }), locale)}
              variant="signal"
              size="lg"
              arrow
              className="max-sm:h-12 max-sm:px-5"
            >
              {c.cta}
            </ButtonLink>
            <a href={site.phoneHref} className="group inline-flex min-h-11 items-center gap-2.5 rounded-full pr-1 text-ink">
              <span className="grid size-11 shrink-0 place-items-center rounded-full border border-ink/15 transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
                </svg>
              </span>
              <span className="leading-tight">
                <span className="label-mono hidden text-mute sm:block">{c.orCall}</span>
                <span className="sr-only sm:hidden">{c.callSr}</span>
                <span className="font-display text-[1.15rem] font-semibold tracking-[-0.02em] whitespace-nowrap tabular-nums sm:text-[1.3rem]">
                  {localPhone}
                </span>
              </span>
            </a>
          </div>

          <dl className="mt-9 grid max-w-[34rem] grid-cols-3 divide-x divide-line border-y hairline lg:mt-10">
            {(locale === "en" ? heroStatsEn : heroStats).map((s) => (
              <div key={s.label} className="flex flex-col-reverse justify-end px-3 py-4 first:pl-0 sm:px-5">
                <dt className="mt-1.5 text-[0.8rem] leading-snug text-mute">{s.label}</dt>
                <dd className="font-display text-[clamp(2rem,3vw,2.75rem)] leading-none font-semibold tracking-[-0.035em] text-ink tabular-nums">
                  <Count value={s.value} />
                  <span className="text-signal-display">{s.suffix}</span>
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-5 max-w-[34rem] text-[0.95rem] leading-relaxed text-mute">
            {c.trusted}{" "}
            {trusted.map((p, i) => (
              <span key={p.slug}>
                <span className="font-medium text-ink">{p.title}</span>
                {i < trusted.length - 1 ? ", " : " "}
              </span>
            ))}
            {c.and}{" "}
            <a href="#realizacje" className="text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
              {c.others(others)}
            </a>
            .
          </p>

          <a
            href="#podglad"
            className="mt-5 inline-flex items-center gap-2 text-[0.95rem] font-medium text-ink underline decoration-signal decoration-2 underline-offset-4"
          >
            {c.preview}
            <span aria-hidden="true">↓</span>
          </a>
        </div>

        {PORTRAIT === "circle" ? <PortraitCircle /> : <PortraitCard />}
      </div>

      <div className="border-t hairline">
        <ul className="container-x grid gap-x-8 gap-y-4 py-7 sm:grid-cols-2 lg:grid-cols-4">
          {GUARANTEES[locale].map((g) => (
            <li key={g.title} className="flex gap-3">
              <Check />
              <p className="leading-snug">
                <span className="block font-medium text-ink">{g.title}</span>
                <span className="block text-[0.9rem] text-mute">{g.note}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
