import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/button";
import { CtaBand } from "@/components/ui/cta-band";
import { JsonLd } from "@/components/ui/json-ld";
import { Accent, SectionHead } from "@/components/ui/section-head";
import { EditorialList, RelatedGrid, Section } from "@/components/seo/blocks";
import { FaqSection } from "@/components/seo/faq-list";
import { H1Parts, PageHero } from "@/components/seo/page-hero";
import { PreviewCta } from "@/components/seo/preview-cta";
import { ProjectsSection } from "@/components/seo/projects-section";
import { industrySchema } from "@/components/seo/schema";
import { nbsp } from "@/components/seo/text";
import { getPost } from "@/content/blog/posts";
import { cities } from "@/content/cities";
import { getIndustry, industries } from "@/content/industries";
import { projects, projectsByIndustry } from "@/content/projects";
import { formatPLN, getService } from "@/content/services";
import { breadcrumbs, pageMeta } from "@/lib/seo";
import { contactHref } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const i = getIndustry(slug);
  if (!i) return {};
  return pageMeta({ title: i.metaTitle, description: i.metaDescription, path: `/branze/${i.slug}`, ogImage: false });
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = getIndustry(slug);
  if (!i) notFound();

  const service = getService(i.serviceSlug);
  const own = projectsByIndustry(i.slug);
  const similar = own.length
    ? []
    : projects.filter((p) => ["transport", "budowlanka", "gabinety"].includes(p.industry)).slice(0, 3);
  const posts = i.relatedPosts.flatMap((p) => getPost(p) ?? []);
  const otherIndustries = industries.filter((o) => o.slug !== i.slug);

  const crumbs = [
    { name: "Start", path: "/" },
    { name: "Branże", path: "/branze" },
    { name: i.name, path: `/branze/${i.slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbs(crumbs)} />
      {service && <JsonLd data={industrySchema(i, service)} />}

      <PageHero
        crumbs={crumbs}
        eyebrow={`Strony internetowe dla ${i.forName}`}
        title={<H1Parts {...i.h1} />}
        lead={<p>{nbsp(i.intro)}</p>}
        aside={
          <div className="flex flex-col items-start gap-3">
            <ButtonLink href={`/twoja-strona?b=${i.slug}`} variant="signal" size="lg" arrow>
              Zobacz, jak mogłaby wyglądać Twoja strona
            </ButtonLink>
            <ButtonLink href={contactHref({ zrodlo: "branza", branza: i.slug })} variant="ghost" size="lg">
              Poproś o wycenę
            </ButtonLink>
            {service && (
              <p className="label-mono mt-3 text-mute">
                {service.name} {service.priceFrom ? `od ${formatPLN(service.priceFrom)}` : ""} · {service.timeline}
              </p>
            )}
          </div>
        }
      />

      <Section tone="paper-2">
        <SectionHead
          index="01"
          eyebrow="Typowe problemy"
          title={
            <>
              Co zwykle <Accent>nie działa</Accent>
            </>
          }
          lead={`Cztery rzeczy, które widzę najczęściej na stronach ${i.forName}, i dlaczego kosztują klientów.`}
        />
        <EditorialList className="mt-12" items={i.problems} />
      </Section>

      <Section>
        <SectionHead
          index="02"
          eyebrow="Co musi mieć strona"
          title={
            <>
              Sekcje i funkcje, bez których <Accent>ani rusz</Accent>
            </>
          }
          lead={`Lista dla ${i.forName}. Zaczynam od tego, co przekłada się na telefon i zapytania, a nie od ozdobników.`}
        />
        <EditorialList className="mt-12" items={i.mustHave} />
      </Section>

      <PreviewCta industrySlug={i.slug} industryName={i.name} />

      <ProjectsSection
        tone="paper-2"
        index="03"
        eyebrow="Realizacje"
        title={
          own.length ? (
            <>
              Strony, które już <Accent>działają</Accent>
            </>
          ) : (
            <>
              Podobne <Accent>realizacje</Accent>
            </>
          )
        }
        lead={
          own.length
            ? `Prawdziwe strony firm z tej branży.`
            : "Nie mam jeszcze w portfolio osobnej realizacji dla tej branży, więc pokazuję strony lokalnych firm z podobnymi potrzebami: telefon, oferta, opinie, widoczność w Google."
        }
        projects={own.length ? own : similar}
      />

      <Section>
        <SectionHead
          index="04"
          eyebrow="Widoczność i koszt"
          title={
            <>
              Jak Cię znajdą i <Accent>ile to kosztuje</Accent>
            </>
          }
        />
        <div className="mt-12 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="label-mono text-mute">Tak szukają klienci (przykłady)</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {i.searchPhrases.map((p) => (
                <li key={p} className="rounded-full border border-ink/20 px-4 py-2 text-[0.95rem]">
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-mute">
              Strona i wizytówka w Google muszą odpowiadać na takie zapytania. Jak to ułożyć, opisuję w artykule{" "}
              <Link href="/blog/klienci-z-google-w-swoim-miescie" className="underline underline-offset-4 hover:text-signal">
                o pozyskiwaniu klientów z Google
              </Link>
              .
            </p>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="label-mono text-mute">Cena</p>
            <p className="mt-3 text-lg leading-relaxed text-pretty text-ink/80">{nbsp(i.priceNote)}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {service && (
                <ButtonLink href={`/oferta/${service.slug}`} variant="ink" arrow>
                  {service.name}
                </ButtonLink>
              )}
              <ButtonLink href="/cennik" variant="ghost">
                Cennik
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      <FaqSection tone="paper-2" index="05" items={i.faq} />

      <Section>
        <SectionHead
          index="06"
          eyebrow="Zobacz też"
          title={
            <>
              Powiązane <Accent>tematy</Accent>
            </>
          }
        />
        <RelatedGrid
          className="mt-12"
          groups={[
            {
              title: "Usługa",
              items: service ? [{ href: `/oferta/${service.slug}`, label: service.name }] : [],
            },
            {
              title: "Z bloga",
              items: posts.map((p) => ({ href: `/blog/${p.slug}`, label: p.title })),
            },
            {
              title: "Lokalnie",
              items: cities.slice(0, 3).map((c) => ({
                href: `/strony-internetowe/${c.slug}`,
                label: `Strony internetowe ${c.inName}`,
              })),
            },
            {
              title: "Inne branże",
              items: otherIndustries.slice(0, 4).map((o) => ({ href: `/branze/${o.slug}`, label: o.name })),
            },
          ]}
        />
      </Section>

      <CtaBand source="branza" extra={{ branza: i.slug }} />
    </>
  );
}
