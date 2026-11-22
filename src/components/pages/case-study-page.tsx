import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow, ButtonLink, buttonClass } from "@/components/ui/button";
import { CtaBand } from "@/components/ui/cta-band";
import { JsonLd } from "@/components/ui/json-ld";
import { Accent, SectionHead } from "@/components/ui/section-head";
import { Section } from "@/components/seo/blocks";
import { BrowserShot } from "@/components/seo/browser-shot";
import { PageHero } from "@/components/seo/page-hero";
import { ProjectsSection } from "@/components/seo/projects-section";
import { projectSchema } from "@/components/seo/schema";
import { clip, nbsp } from "@/components/seo/text";
import { getCity } from "@/content/cities";
import { getIndustry, industryName } from "@/content/industries";
import { getProjectFor, projectsFor } from "@/content/projects";
import { getServiceFor } from "@/content/services";
import { localizeHref, type Locale } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { breadcrumbs, pageMeta } from "@/lib/seo";
import { contactHref } from "@/lib/utils";

export function caseStudyMeta(slug: string, locale: Locale): Metadata {
  const p = getProjectFor(slug, locale);
  if (!p) return {};
  return pageMeta({
    title: `${p.title} — ${p.category}`,
    description: clip(p.description),
    path: localizeHref(`/realizacje/${p.slug}`, locale),
    ogImage: false,
    noindex: true,
  });
}

const COPY = {
  pl: {
    home: "Start",
    crumb: "Realizacje",
    eyebrow: "Realizacja",
    subtitle: "Strona internetowa —",
    client: "Klient",
    category: "Kategoria",
    industry: "Branża",
    place: "Miejsce",
    area: "Obszar",
    scrollHint: "Przewiń podgląd, żeby zobaczyć całą stronę",
    built: "Co zbudowałem",
    colors: "Kolory strony",
    live: "Zobacz na żywo",
    similar: "Chcę podobną stronę",
    similarEyebrow: "Podobny projekt",
    similarTitle: (
      <>
        Chcesz <Accent>coś takiego</Accent>?
      </>
    ),
    similarLead: (industry?: string) =>
      industry
        ? `Dla branży „${industry.toLowerCase()}” opisałem, co musi mieć strona i ile to kosztuje. Wycenę dostaniesz w 24 godziny.`
        : "Wycenę dostaniesz w 24 godziny.",
    sitesFor: "Strony dla",
    prevNext: "Poprzednia i następna realizacja",
    prev: "Poprzednia",
    next: "Następna",
    more: (
      <>
        Więcej <Accent>realizacji</Accent>
      </>
    ),
  },
  en: {
    home: "Home",
    crumb: "Work",
    eyebrow: "Case study",
    subtitle: "Website —",
    client: "Client",
    category: "Category",
    industry: "Industry",
    place: "Location",
    area: "Scope",
    scrollHint: "Scroll the preview to see the whole site",
    built: "What I built",
    colors: "Site colours",
    live: "See it live",
    similar: "I want a similar site",
    similarEyebrow: "A similar project",
    similarTitle: (
      <>
        Want <Accent>something like this</Accent>?
      </>
    ),
    similarLead: () => "You’ll get a quote within 24 hours.",
    sitesFor: "",
    prevNext: "Previous and next project",
    prev: "Previous",
    next: "Next",
    more: (
      <>
        More <Accent>work</Accent>
      </>
    ),
  },
};

export function CaseStudyPage({ slug }: { slug: string }) {
  const locale = getLocale();
  const en = locale === "en";
  const c = COPY[locale];
  const href = (h: string) => localizeHref(h, locale);
  const projects = projectsFor(locale);
  const p = getProjectFor(slug, locale);
  if (!p) notFound();

  const idx = projects.findIndex((x) => x.slug === p.slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  const industry = getIndustry(p.industry);
  const service = industry ? getServiceFor(industry.serviceSlug, locale) : undefined;
  const city = p.citySlug ? getCity(p.citySlug) : undefined;

  const same = projects.filter((x) => x.industry === p.industry && x.slug !== p.slug);
  const others = projects.filter((x) => x.industry !== p.industry && x.slug !== p.slug);
  const related = [...same, ...others].slice(0, 3);

  const crumbs = [
    { name: c.home, path: href("/") },
    { name: c.crumb, path: href("/realizacje") },
    { name: p.title, path: href(`/realizacje/${p.slug}`) },
  ];

  return (
    <>
      <JsonLd data={breadcrumbs(crumbs)} />
      <JsonLd data={projectSchema(p, locale)} />

      <PageHero
        crumbs={crumbs}
        eyebrow={`${c.eyebrow} · ${p.category}`}
        title={
          <>
            {p.title}
            <span className="mt-5 block font-sans text-lg leading-snug font-normal tracking-normal text-mute md:text-2xl">
              {c.subtitle} {p.category.toLowerCase()}
            </span>
          </>
        }
        lead={<p>{nbsp(p.description)}</p>}
        aside={
          <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 border-t hairline pt-4 text-[0.95rem]">
            <dt className="label-mono text-mute">{c.client}</dt>
            <dd>{p.client}</dd>
            <dt className="label-mono text-mute">{c.category}</dt>
            <dd>{p.category}</dd>
            {industry && (
              <>
                <dt className="label-mono text-mute">{c.industry}</dt>
                <dd>
                  {en ? (
                    industryName(industry.slug, locale)
                  ) : (
                    <Link href={`/branze/${industry.slug}`} className="underline underline-offset-4 hover:text-signal">
                      {industry.name}
                    </Link>
                  )}
                </dd>
              </>
            )}
            {p.city && (
              <>
                <dt className="label-mono text-mute">{c.place}</dt>
                <dd>
                  {city && !en ? (
                    <Link
                      href={`/strony-internetowe/${city.slug}`}
                      className="underline underline-offset-4 hover:text-signal"
                    >
                      {p.city}
                    </Link>
                  ) : (
                    p.city
                  )}
                </dd>
              </>
            )}
            <dt className="label-mono text-mute">{c.area}</dt>
            <dd>{p.tags.join(" · ")}</dd>
          </dl>
        }
      />

      <Section tone="paper-2" className="pt-14 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <BrowserShot project={p} priority />
            {p.shot.kind === "fullpage" && <p className="label-mono mt-4 text-center text-mute">{c.scrollHint}</p>}
          </div>

          <div className="lg:sticky lg:top-28 lg:col-span-4 lg:col-start-9 lg:self-start">
            <p className="label-mono text-mute">{c.built}</p>
            <ul className="mt-4 border-t hairline">
              {p.scope.map((s) => (
                <li key={s} className="flex gap-4 border-b hairline py-4 leading-snug">
                  <span aria-hidden className="mt-[0.7em] h-px w-5 shrink-0 bg-signal" />
                  {s}
                </li>
              ))}
            </ul>

            <p className="label-mono mt-10 text-mute">{c.colors}</p>
            <ul className="mt-4 flex gap-3">
              {p.palette.map((color) => (
                <li key={color} className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="size-9 rounded-full border border-ink/15"
                    style={{ backgroundColor: color }}
                  />
                  <span className="label-mono text-mute">{color}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              {p.liveUrl && (
                <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className={buttonClass("ink", "md")}>
                  {c.live}
                  <Arrow />
                </a>
              )}
              <ButtonLink
                href={href(contactHref({ zrodlo: "realizacja", branza: p.industry, miasto: p.city }))}
                variant={p.liveUrl ? "ghost" : "signal"}
                arrow
              >
                {c.similar}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead
          index="01"
          eyebrow={c.similarEyebrow}
          title={c.similarTitle}
          lead={c.similarLead(industry?.name)}
        />
        <div className="mt-10 flex flex-wrap gap-3">
          {industry && !en && (
            <ButtonLink href={`/branze/${industry.slug}`} variant="ink" arrow>
              {c.sitesFor} {industry.forName}
            </ButtonLink>
          )}
          {service && (
            <ButtonLink href={href(`/oferta/${service.slug}`)} variant={en ? "ink" : "ghost"} arrow={en}>
              {service.name}
            </ButtonLink>
          )}
        </div>
      </Section>

      <Section tone="paper-2" className="py-0 md:py-0">
        <nav aria-label={c.prevNext} className="grid border-y hairline md:grid-cols-2">
          {[
            { label: c.prev, project: prev, align: "left" as const },
            { label: c.next, project: next, align: "right" as const },
          ].map(({ label, project, align }) => (
            <Link
              key={label}
              href={href(`/realizacje/${project.slug}`)}
              className={
                align === "right"
                  ? "group block border-t hairline py-12 md:border-t-0 md:border-l md:pl-10 md:text-right"
                  : "group block py-12 md:pr-10"
              }
            >
              <p className="label-mono text-mute">{label}</p>
              <p className="mt-4 font-display text-[length:var(--text-big)] leading-none font-semibold tracking-tight transition-colors duration-300 group-hover:text-signal">
                {project.title}
              </p>
              <p className="mt-3 text-mute">{project.category}</p>
            </Link>
          ))}
        </nav>
      </Section>

      <ProjectsSection index="02" title={c.more} projects={related} />

      <CtaBand source="realizacja" extra={{ branza: p.industry }} />
    </>
  );
}
