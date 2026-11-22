import { site } from "@/content/site";
import { contactHref } from "@/lib/utils";
import { Accent } from "@/components/ui/section-head";
import { Arrow, ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Ring } from "./story/ring";

const promises = ["Odpowiadam w 24h", "Bez zobowiązań", "Landing page od 500 zł", "Cała Polska — zdalnie"];

export function FinalCta() {
  const [prefix, ...rest] = site.phone.split(" ");
  const local = rest.join(" ");

  return (
    <section
      aria-labelledby="final-cta-title"
      className="bg-signal text-ink selection:bg-ink selection:text-signal [&_*:focus-visible]:outline-ink"
    >
      <div className="container-x pt-20 pb-14 md:pt-32 md:pb-20">
        <p className="label-mono flex items-center gap-3">
          <span aria-hidden className="size-2 rounded-full bg-ink" />
          <span>Ostatni krok — najprostszy</span>
        </p>

        <h2
          id="final-cta-title"
          className="mt-8 max-w-[15ch] font-display text-[clamp(3rem,8.6vw,9.5rem)] font-semibold text-balance md:mt-10"
        >
          Zróbmy stronę, po&nbsp;której{" "}
          <Ring>
            <Accent className="pr-[0.06em] text-ink">dzwoni telefon</Accent>
          </Ring>
          .
        </h2>

        <div className="mt-16 grid border-t border-ink/25 md:mt-24 md:grid-cols-3">
          <Reveal className="flex flex-col border-b border-ink/25 py-8 md:border-r md:border-b-0 md:py-10 md:pr-8">
            <p className="label-mono">01 — Napisz</p>
            <h3 className="mt-5 font-display text-[length:var(--text-big)] font-semibold">Wyceń stronę</h3>
            <p className="mt-3 max-w-sm text-pretty text-lg leading-snug">
              Opisz w&nbsp;paru zdaniach, czego potrzebujesz. Konkretną wycenę dostaniesz w&nbsp;24h.
            </p>
            <div className="mt-auto pt-8">
              <ButtonLink
                href={contactHref({ zrodlo: "footer" })}
                variant="ink"
                size="lg"
                arrow
                className="hover:bg-paper hover:text-ink"
              >
                Wyceń moją stronę
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal
            delay={0.08}
            className="flex flex-col border-b border-ink/25 py-8 md:border-r md:border-b-0 md:px-8 md:py-10"
          >
            <p className="label-mono">02 — Zadzwoń</p>
            <h3 className="sr-only">Zadzwoń</h3>
            <a
              href={site.phoneHref}
              className="group/btn mt-5 inline-flex flex-col self-start font-display font-semibold"
              aria-label={`Zadzwoń: ${site.phone}`}
            >
              <span className="text-[1.1rem] font-medium tracking-normal">{prefix}</span>
              <span className="text-[clamp(2.4rem,4.4vw,4.25rem)] whitespace-nowrap underline decoration-ink/30 decoration-[0.06em] underline-offset-[0.12em] transition-colors group-hover/btn:decoration-ink">
                {local}
              </span>
            </a>
            <p className="mt-4 max-w-sm text-pretty text-lg leading-snug">
              Wolisz pogadać niż pisać? Dzwoń śmiało — odbieram sam, bez sekretariatu.
            </p>
          </Reveal>

          <Reveal delay={0.16} className="flex flex-col py-8 md:py-10 md:pl-8">
            <p className="label-mono">03 — Zobacz</p>
            <h3 className="mt-5 font-display text-[length:var(--text-big)] font-semibold">Twoja strona za darmo</h3>
            <p className="mt-3 max-w-sm text-pretty text-lg leading-snug">
              Wpisz nazwę firmy i&nbsp;branżę. Generator złoży projekt Twojej strony na żywo — zanim wydasz złotówkę.
            </p>
            <div className="mt-auto pt-8">
              <ButtonLink
                href="/twoja-strona"
                variant="paper"
                size="lg"
                arrow
                className="hover:bg-ink hover:text-paper"
              >
                Zobacz swoją stronę
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <div className="mt-6 flex flex-col gap-5 border-t border-ink/25 pt-6 md:mt-0 md:flex-row md:items-center md:justify-between">
          <ul className="label-mono flex flex-wrap gap-x-6 gap-y-2">
            {promises.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <span aria-hidden className="size-1.5 bg-ink" />
                {p}
              </li>
            ))}
          </ul>
          <a
            href={`mailto:${site.email}`}
            className="group/btn inline-flex min-h-11 items-center gap-1.5 self-start font-medium underline decoration-ink/30 underline-offset-4 hover:decoration-ink md:self-auto"
          >
            albo napisz: {site.email}
            <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
