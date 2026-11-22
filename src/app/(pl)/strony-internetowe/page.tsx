import { CtaBand } from "@/components/ui/cta-band";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { LinkList, Section } from "@/components/seo/blocks";
import { H1Parts, PageHero } from "@/components/seo/page-hero";
import { itemListSchema } from "@/components/seo/schema";
import { cities } from "@/content/cities";
import { breadcrumbs, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Strony internetowe w Twoim mieście",
  description:
    "Robię strony internetowe dla firm z całej Polski, zdalnie, a na Podlasiu także na miejscu. Wybierz miasto i zobacz realizacje, lokalne podpowiedzi i ceny.",
  path: "/strony-internetowe",
});

const crumbs = [
  { name: "Start", path: "/" },
  { name: "Strony internetowe", path: "/strony-internetowe" },
];

export default function CitiesPage() {
  return (
    <>
      <JsonLd data={breadcrumbs(crumbs)} />
      <JsonLd
        data={itemListSchema(
          "Strony internetowe w miastach",
          cities.map((c) => ({ name: `Strony internetowe ${c.inName}`, path: `/strony-internetowe/${c.slug}` })),
        )}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow="Lokalnie i w całej Polsce"
        title={<H1Parts a="Strony internetowe w" accent="Twoim mieście" />}
        lead={
          <p>
            Mieszkam i pracuję na Podlasiu, więc w Białymstoku, Sokółce, Suwałkach i Augustowie mogę spotkać się
            osobiście. Z firmami z reszty Polski, na przykład z Warszawy i Wyszkowa, pracuję zdalnie. Ceny są takie
            same wszędzie, a każde z tych miejsc opisałem osobno, bo lokalny rynek wygląda inaczej.
          </p>
        }
        aside={
          <ButtonLink href="/wycena" variant="signal" size="lg" arrow>
            Policz wycenę
          </ButtonLink>
        }
      />

      <Section className="pt-0 md:pt-0">
        <LinkList
          items={cities.map((c) => ({
            href: `/strony-internetowe/${c.slug}`,
            label: c.name,
            hint: c.connection,
            tag: c.region,
          }))}
        />
      </Section>

      <CtaBand source="miasto" />
    </>
  );
}
