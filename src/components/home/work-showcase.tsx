import Link from "next/link";
import { projectsFor } from "@/content/projects";
import { localizeHref } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { ButtonLink } from "@/components/ui/button";
import { Accent, SectionHead } from "@/components/ui/section-head";
import { SplitReveal } from "@/components/motion/split-reveal";
import { pad, toStageProject } from "@/components/site/work/data";
import { FeaturedList } from "@/components/site/work/featured-list";
import { FeaturedReel } from "@/components/site/work/featured-reel";
import { ProjectCard } from "@/components/site/work/project-card";
import { ProjectInfo } from "@/components/site/work/project-info";
import { plural } from "@/lib/utils";

const COPY = {
  pl: {
    label: "Realizacje",
    title: (count: number) => (
      <>
        {count} {plural(count, ["projekt", "projekty", "projektów"])}. Zero <Accent>szablonów</Accent>.
      </>
    ),
    lead: (
      <>
        Firma DDD z&nbsp;Warszawy, termowizja budynków i&nbsp;farm PV, remonty, gabinet hipnoterapii,
        pracownia dekoracji okien, hotel z&nbsp;salą weselną i&nbsp;wypożyczalnia aut. Każda strona zaprojektowana od zera pod konkretną firmę.
      </>
    ),
    more: "Więcej realizacji",
    all: "Wszystkie realizacje",
    next: (
      <>
        Następna może być <Accent>Twoja</Accent>. Zobacz ją, zanim zapłacisz.
      </>
    ),
    preview: "Zobacz, jak mogłaby wyglądać Twoja",
  },
  en: {
    label: "Work",
    title: (count: number) => (
      <>
        {count} projects. Zero <Accent>templates</Accent>.
      </>
    ),
    lead: (
      <>
        A pest control company in Warsaw, thermal imaging of buildings and solar farms, renovations, a hypnotherapy
        practice, a window decor studio, a hotel with a wedding hall and a car rental. Every site designed from scratch
        for a specific business.
      </>
    ),
    more: "More projects",
    all: "All projects",
    next: (
      <>
        The next one could be <Accent>yours</Accent>. See it before you pay.
      </>
    ),
    preview: "See what yours could look like",
  },
};

export function WorkShowcase({ index }: { index?: string }) {
  const locale = getLocale();
  const c = COPY[locale];
  const href = (h: string) => localizeHref(h, locale);
  const projects = projectsFor(locale);
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const count = projects.length;

  return (
    <section id="realizacje" aria-label={c.label} className="theme-ink relative">
      <div className="container-x pt-24 md:pt-36">
        <SectionHead
          index={index}
          align="center"
          eyebrow={c.label}
          title={
            <SplitReveal as="span" className="block">
              {c.title(count)}
            </SplitReveal>
          }
          lead={c.lead}
        />
      </div>

      {featured.length > 0 && (
        <div className="mt-14 md:mt-20">
          <FeaturedReel
            list={<FeaturedList projects={featured} />}
            projects={featured.map((p, i) => toStageProject(p, i, locale))}
            panels={featured.map((p, i) => (
              <ProjectInfo key={p.slug} project={p} num={pad(i + 1)} variant="stage" />
            ))}
          />
        </div>
      )}

      <div className="container-x pb-24 md:pb-36">
        {rest.length > 0 && (
          <div className="mt-24 md:mt-32">
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-t hairline pt-5">
              <p className="label-mono text-mute">
                {c.more} <span className="text-paper tabular-nums">({pad(rest.length)})</span>
              </p>
              <Link
                href={href("/realizacje")}
                className="label-mono inline-flex min-h-11 items-center gap-2 underline-offset-4 hover:underline"
              >
                {c.all}
                <svg aria-hidden viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
            </div>
            <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-14">
              {rest.map((p, i) => (
                <ProjectCard key={p.slug} project={p} num={pad(featured.length + i + 1)} index={i} />
              ))}
            </ul>
          </div>
        )}

        <div className="mt-20 grid gap-8 border-t hairline pt-10 md:mt-28 md:grid-cols-12 md:items-end">
          <p className="font-display text-[length:var(--text-big)] font-semibold text-balance md:col-span-7">
            {c.next}
          </p>
          <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
            <ButtonLink href={href("/twoja-strona")} variant="signal" size="lg" arrow className="hover:bg-paper hover:text-ink">
              {c.preview}
            </ButtonLink>
            <ButtonLink href={href("/realizacje")} variant="ghost" size="lg">
              {c.all}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
