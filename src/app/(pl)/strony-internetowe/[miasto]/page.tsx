import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/button";
import { CtaBand } from "@/components/ui/cta-band";
import { JsonLd } from "@/components/ui/json-ld";
import { Accent, SectionHead } from "@/components/ui/section-head";
import { EditorialList, FactStrip, LinkList, RelatedGrid, Section } from "@/components/seo/blocks";
import { FaqSection } from "@/components/seo/faq-list";
import { H1Parts, PageHero } from "@/components/seo/page-hero";
import { ProjectsSection } from "@/components/seo/projects-section";
import { citySchema } from "@/components/seo/schema";
import { nbsp } from "@/components/seo/text";
import { cities, getCity } from "@/content/cities";
import { getIndustry } from "@/content/industries";
import { projects, projectsByCity } from "@/content/projects";
import { formatPLN, services } from "@/content/services";
import { site } from "@/content/site";
import { breadcrumbs, pageMeta } from "@/lib/seo";
import { contactHref } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((c) => ({ miasto: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ miasto: string }> }): Promise<Metadata> {
  const { miasto } = await params;
  const c = getCity(miasto);
  if (!c) return {};
  return pageMeta({ title: c.metaTitle, description: c.metaDescription, path: `/strony-internetowe/${c.slug}`, ogImage: false });
}

export default async function CityPage({ params }: { params: Promise<{ miasto: string }> }) {
  const { miasto } = await params;
  const c = getCity(miasto);
  if (!c) notFound();

  const local = projectsByCity(c.slug);
  const podlasie = c.region === "podlaskie";
  const fallback = podlasie
    ? projects.filter((p) => p.citySlug === "bialystok" || p.citySlug === "sokolka")
    : projects.filter((p) => p.featured).slice(0, 3);

  const industries = c.focusIndustries.flatMap((s) => getIndustry(s) ?? []);
  const otherCities = cities.filter((o) => o.slug !== c.slug);
  const price = (slug: string) => services.find((s) => s.slug === slug)?.priceFrom ?? 0;

  const crumbs = [
    { name: "Start", path: "/" },
    { name: "Strony internetowe", path: "/strony-internetowe" },
    { name: c.name, path: `/strony-internetowe/${c.slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbs(crumbs)} />
      <JsonLd data={citySchema(c)} />

      <PageHero
        crumbs={crumbs}
        eyebrow={`Strony internetowe ${c.inName} · ${c.region}`}
        title={<H1Parts {...c.h1} />}
        lead={<p>{nbsp(c.intro)}</p>}
        aside={
          <div>
            <FactStrip
              facts={[
                { label: "Landing page", value: `od ${formatPLN(price("landing-page"))}` },
                { label: "Strona firmowa", value: `od ${formatPLN(price("strona-firmowa"))}` },
                { label: "Sklep internetowy", value: `od ${formatPLN(price("sklep-internetowy"))}` },
                { label: "Wycena", value: "w 24 h" },
              ]}
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={contactHref({ zrodlo: "miasto", miasto: c.name })} variant="signal" size="lg" arrow>
                Bezpłatna wycena
              </ButtonLink>
              <ButtonLink href="/realizacje" variant="ghost" size="lg">
                Realizacje
              </ButtonLink>
            </div>
          </div>
        }
      />

      <Section tone="paper-2">
        <SectionHead
          index="01"
          eyebrow={`Rynek ${c.inName}`}
          title={
            <>
              Jak to wygląda <Accent>lokalnie</Accent>
            </>
          }
          lead={c.connection}
        />
        <EditorialList className="mt-12" items={c.market} />
      </Section>

      <ProjectsSection
        index="02"
        eyebrow="Realizacje"
        title={
          local.length ? (
            <>
              Strony, które już działają <Accent>{c.inName}</Accent>
            </>
          ) : podlasie ? (
            <>
              Realizacje z <Accent>Podlasia</Accent>
            </>
          ) : (
            <>
              Wybrane <Accent>realizacje</Accent>
            </>
          )
        }
        lead={
          local.length
            ? "Strony, które zrobiłem dla firm z tego miasta."
            : podlasie
              ? "Nie chwalę się tu realizacją z samego miasta, ale pracuję z firmami z Podlasia, a oto przykłady z najbliższych miejscowości."
              : "Pracuję z firmami z całej Polski, zdalnie. Oto kilka wybranych realizacji."
        }
        projects={local.length ? local : fallback}
      />

      <Section tone="ink">
        <SectionHead
          index="03"
          eyebrow="Jak pracujemy"
          title={
            <>
              {c.meeting.mode === "local" ? (
                <>
                  Na miejscu <Accent>albo</Accent> zdalnie
                </>
              ) : (
                <>
                  Zdalnie, <Accent>bez tracenia czasu</Accent>
                </>
              )}
            </>
          }
        />
        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="label-mono text-signal">{c.meeting.title}</p>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <p className="text-xl leading-relaxed text-pretty md:text-2xl">{nbsp(c.meeting.text)}</p>
            <p className="label-mono mt-8 text-mute">{site.phone} · {site.email}</p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead
          index="04"
          eyebrow="SEO lokalne"
          title={
            <>
              Jak być widocznym <Accent>{c.inName}</Accent>
            </>
          }
          lead="Praktyczne rzeczy, które możesz zrobić niezależnie od tego, kto zrobi Ci stronę."
        />
        <EditorialList className="mt-12" items={c.localSeo} />
      </Section>

      <Section tone="paper-2">
        <SectionHead
          index="05"
          eyebrow="Oferta"
          title={
            <>
              Co mogę dla Ciebie <Accent>zrobić</Accent>
            </>
          }
          lead="Te same ceny w całej Polsce. Dla firm z Podlasia dodatkowo możliwe spotkanie na miejscu."
        />
        <LinkList
          className="mt-12"
          items={services.map((s) => ({
            href: `/oferta/${s.slug}`,
            label: s.name,
            hint: s.promise,
            tag: s.priceFrom ? `od ${formatPLN(s.priceFrom)}` : "indywidualnie",
          }))}
        />
      </Section>

      <FaqSection index="06" items={c.faq} />

      <Section tone="paper-2">
        <SectionHead
          index="07"
          eyebrow="Zobacz też"
          title={
            <>
              Branże i <Accent>inne miasta</Accent>
            </>
          }
        />
        <RelatedGrid
          className="mt-12"
          groups={[
            { title: "Branże, które znam", items: industries.map((i) => ({ href: `/branze/${i.slug}`, label: i.name })) },
            {
              title: "Inne miasta",
              items: otherCities.map((o) => ({ href: `/strony-internetowe/${o.slug}`, label: o.name })),
            },
            {
              title: "Z bloga",
              items: [
                {
                  href: "/blog/klienci-z-google-w-swoim-miescie",
                  label: "Jak zdobywać klientów z Google w swoim mieście",
                },
                { href: "/blog/ile-kosztuje-strona-internetowa", label: "Ile kosztuje strona internetowa w 2026?" },
              ],
            },
          ]}
        />
      </Section>

      <CtaBand source="miasto" extra={{ miasto: c.name }} />
    </>
  );
}
