import Link from "next/link";
import { site, siteEn, stats, statsEn } from "@/content/site";
import { getLocale } from "@/i18n/server";
import { Accent, SectionHead } from "@/components/ui/section-head";
import { Reveal } from "@/components/ui/reveal";
import { XrayButton } from "@/components/fun/extras";
import { nn } from "./story/typo";

const COPY = {
  pl: {
    steps: [
      { name: "Rozmowa", note: "telefon albo wiadomość" },
      { name: "Wycena w 24h", note: "konkretna kwota, bez gwiazdek" },
      { name: "Projekt", note: "widzisz stronę przed startem" },
      { name: "Wdrożenie", note: "domena, Google, gotowe" },
      { name: "Wsparcie", note: "30 dni gratis, gdyby coś przestało działać" },
    ],
    eyebrow: "O mnie",
    title: (
      <>
        Jedna osoba od pierwszego telefonu do&nbsp;<Accent>startu strony</Accent>.
      </>
    ),
    base: "Baza",
    baseText: "Podlasie: Białystok, Sokółka",
    work: "Pracuję",
    workText: <>z&nbsp;firmami z&nbsp;całej Polski, zdalnie</>,
    phone: "Telefon",
    story: (
      <>
        Cześć, jestem Bartek. Robię strony i&nbsp;sklepy internetowe. Mieszkam na Podlasiu, pracuję dla firm
        z&nbsp;całej Polski. Dzwonisz do mnie, rozmawiasz ze mną i&nbsp;to ja projektuję oraz koduję Twoją stronę.{" "}
        <span className="text-mute">
          Nikt niczego nie przekazuje dalej, nic nie ginie po drodze. Żadnego głuchego telefonu jak w&nbsp;agencji.
        </span>
      </>
    ),
    how: "Jak pracuję",
    devs: "Dla programistów:",
    thisSite: "Ta strona: Next.js 16, React 19, Tailwind 4, bez szablonu.",
  },
  en: {
    steps: [
      { name: "A call", note: "phone or message" },
      { name: "Quote in 24h", note: "a specific amount, no asterisks" },
      { name: "Design", note: "you see the site before launch" },
      { name: "Launch", note: "domain, Google, done" },
      { name: "Support", note: "30 days free, in case anything stops working" },
    ],
    eyebrow: "About me",
    title: (
      <>
        One person from the first call to&nbsp;<Accent>launch day</Accent>.
      </>
    ),
    base: "Based in",
    baseText: "Podlasie: Białystok, Sokółka",
    work: "Working",
    workText: <>with businesses all over Poland, remotely</>,
    phone: "Phone",
    story: (
      <>
        Hi, I’m Bartek. I build websites and online stores. I live in Podlasie, in north-eastern Poland, and work for
        businesses all over the country. You call me, you talk to me, and I’m the one who designs and codes your site.{" "}
        <span className="text-mute">
          Nothing gets handed on, nothing gets lost along the way. No game of telephone like at an agency.
        </span>
      </>
    ),
    how: "How I work",
    devs: "For developers:",
    thisSite: "This site: Next.js 16, React 19, Tailwind 4, no template.",
  },
};

export const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind",
  "Node",
  "Python/Django",
  "PHP/Laravel",
  "WordPress",
  "GSAP",
  "Figma",
  "API modeli AI/LLM",
];

export function About({ index }: { index?: string }) {
  const en = getLocale() === "en";
  const c = COPY[en ? "en" : "pl"];
  return (
    <section id="o-mnie" className="bg-paper">
      <div className="container-x py-24 md:py-32">
        <SectionHead
          index={index}
          eyebrow={c.eyebrow}
          title={c.title}
        />

        <div className="mt-14 grid gap-14 md:mt-20 md:grid-cols-12 md:gap-x-10">
          <aside className="md:col-span-4 lg:col-span-3">
            <div className="md:sticky md:top-[calc(var(--header-h)+2rem)]">
              <p className="font-display text-[length:var(--text-huge)] font-semibold">
                Bartek<span className="text-signal">.</span>
              </p>
              <p className="mt-3 text-mute">{en ? siteEn.role : site.role}</p>
              <p className="mt-2 text-sm">
                <Link href={site.aboutPath} rel="author" className="underline decoration-signal decoration-2 underline-offset-4 hover:text-signal">
                  {site.fullName}
                </Link>
                <span className="text-mute"> · {en ? "more about me" : "więcej o mnie"}</span>
              </p>

              <dl className="mt-8 divide-y divide-line border-y hairline text-[0.95rem]">
                <div className="grid grid-cols-[6.5rem_1fr] gap-3 py-3">
                  <dt className="label-mono pt-0.5 text-mute">{c.base}</dt>
                  <dd>{c.baseText}</dd>
                </div>
                <div className="grid grid-cols-[6.5rem_1fr] gap-3 py-3">
                  <dt className="label-mono pt-0.5 text-mute">{c.work}</dt>
                  <dd>{c.workText}</dd>
                </div>
                <div className="grid grid-cols-[6.5rem_1fr] gap-3 py-3">
                  <dt className="label-mono pt-0.5 text-mute">{c.phone}</dt>
                  <dd>
                    <a href={site.phoneHref} className="underline decoration-ink/25 underline-offset-4 hover:decoration-signal">
                      {site.phone}
                    </a>
                  </dd>
                </div>
                <div className="grid grid-cols-[6.5rem_1fr] gap-3 py-3">
                  <dt className="label-mono pt-0.5 text-mute">E-mail</dt>
                  <dd className="min-w-0 break-words">
                    <a
                      href={`mailto:${site.email}`}
                      className="underline decoration-ink/25 underline-offset-4 hover:decoration-signal"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </aside>

          <div className="md:col-span-8 lg:col-span-9">
            <Reveal>
              <p className="max-w-[38ch] text-pretty text-[clamp(1.4rem,2.3vw,2.1rem)] leading-[1.25] tracking-tight">
                {c.story}
              </p>
            </Reveal>

            <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 md:mt-16 lg:grid-cols-3">
              {(en ? statsEn : stats).map((s) => (
                <div key={s.label} className="flex flex-col-reverse justify-end border-t hairline pt-4">
                  <dt className="mt-2 text-sm leading-snug text-mute">{s.label}</dt>
                  <dd className="font-display text-[length:var(--text-big)] font-semibold">{s.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-16 md:mt-20">
              <p className="label-mono text-mute">{c.how}</p>
              <ol className="mt-5 grid gap-px overflow-hidden rounded-[var(--radius)] border hairline bg-line sm:grid-cols-5">
                {c.steps.map((s, i) => (
                  <li key={s.name} className="grid grid-cols-[2.25rem_1fr] items-baseline bg-paper p-4 sm:block sm:p-5">
                    <span className="label-mono row-span-2 text-signal">{nn(i)}</span>
                    <span className="block font-medium sm:mt-6">{s.name}</span>
                    <span className="block text-sm text-mute sm:mt-1">{s.note}</span>
                  </li>
                ))}
              </ol>
            </div>

            <p className="mt-12 max-w-3xl font-mono text-[0.8rem] leading-relaxed text-mute">
              <span className="text-ink">{c.devs}</span> {stack.join(" · ")}. <span>{c.thisSite}</span>
            </p>
            <XrayButton className="mt-5" />
          </div>
        </div>
      </div>
    </section>
  );
}
