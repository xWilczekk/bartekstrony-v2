import { CtaBand } from "@/components/ui/cta-band";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { Section } from "@/components/seo/blocks";
import { H1Parts, PageHero } from "@/components/seo/page-hero";
import { ProjectsExplorer } from "@/components/seo/projects-explorer";
import { itemListSchema } from "@/components/seo/schema";
import { industries, industryName } from "@/content/industries";
import { projectsFor } from "@/content/projects";
import { localizeHref } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { breadcrumbs, pageMeta } from "@/lib/seo";

export const workMeta = {
  pl: pageMeta({
    title: "Realizacje: strony i sklepy dla firm",
    description:
      "Prawdziwe strony prawdziwych firm: hotel, wypożyczalnia aut, restauracje, firmy remontowe, gabinet weterynaryjny, platforma AI. Zakres prac i opinie.",
    path: "/realizacje",
  }),
  en: pageMeta({
    title: "Work: websites and online stores for businesses",
    description:
      "Real websites for real businesses: a hotel, a car rental, restaurants, renovation companies, a veterinary clinic, an AI platform. Scope of work and reviews.",
    path: "/en/work",
  }),
};

const COPY = {
  pl: {
    home: "Start",
    crumb: "Realizacje",
    list: "Realizacje bartekstrony.pl",
    title: <H1Parts a="Strony, które już" accent="pracują" />,
    lead: "Hotel, wypożyczalnia aut, restauracje, firmy remontowe, gabinet weterynaryjny, taxi i platforma AI. Każdy projekt to prawdziwy klient. Otwórz dowolny, żeby zobaczyć, co dokładnie zbudowałem i jak wygląda cała strona.",
    cta: "Chcę taką stronę",
    all: "Wszystkie realizacje",
  },
  en: {
    home: "Home",
    crumb: "Work",
    list: "Work by bartekstrony.pl",
    title: <H1Parts a="Websites that are already" accent="working" />,
    lead: "A hotel, a car rental, restaurants, renovation companies, a veterinary clinic, a taxi and an AI platform. Every project is a real client. Open any of them to see exactly what I built and what the whole site looks like.",
    cta: "I want a site like this",
    all: "All projects",
  },
};

export function WorkPage() {
  const locale = getLocale();
  const c = COPY[locale];
  const projects = projectsFor(locale);
  const href = (h: string) => localizeHref(h, locale);
  const crumbs = [
    { name: c.home, path: href("/") },
    { name: c.crumb, path: href("/realizacje") },
  ];

  return (
    <>
      <JsonLd data={breadcrumbs(crumbs)} />
      <JsonLd
        data={itemListSchema(
          c.list,
          projects.map((p) => ({ name: `${p.title}: ${p.category}`, path: href(`/realizacje/${p.slug}`) })),
        )}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow={c.crumb}
        size="giant"
        title={c.title}
        lead={<p>{c.lead}</p>}
        aside={
          <ButtonLink href={href("/wycena")} variant="signal" size="lg" arrow>
            {c.cta}
          </ButtonLink>
        }
      />

      <Section className="pt-0 md:pt-0">
        <h2 className="sr-only">{c.all}</h2>
        <ProjectsExplorer
          projects={projects}
          industries={industries.map((i) => ({ slug: i.slug, name: industryName(i.slug, locale) }))}
        />
      </Section>

      <CtaBand source="realizacja" />
    </>
  );
}
