import Link from "next/link";
import { CtaBand } from "@/components/ui/cta-band";
import { ButtonLink, Arrow } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { Accent } from "@/components/ui/section-head";
import { Section } from "@/components/seo/blocks";
import { H1Parts, PageHero } from "@/components/seo/page-hero";
import { itemListSchema } from "@/components/seo/schema";
import { nbsp } from "@/components/seo/text";
import { industries } from "@/content/industries";
import { projectsByIndustry } from "@/content/projects";
import { breadcrumbs, pageMeta } from "@/lib/seo";
import { plural } from "@/lib/utils";

export const metadata = pageMeta({
  title: "Strony internetowe dla Twojej branży",
  description:
    "Strony szyte pod branżę: restauracje, budowlanka, motoryzacja, gabinety, hotele, transport, sklepy i OZE. Co musi mieć strona i ile kosztuje.",
  path: "/branze",
});

const crumbs = [
  { name: "Start", path: "/" },
  { name: "Branże", path: "/branze" },
];

export default function BranzePage() {
  return (
    <>
      <JsonLd data={breadcrumbs(crumbs)} />
      <JsonLd
        data={itemListSchema(
          "Strony internetowe dla branż",
          industries.map((i) => ({ name: `Strony internetowe dla ${i.forName}`, path: `/branze/${i.slug}` })),
        )}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow="Branże"
        title={<H1Parts a="Strona szyta pod" accent="Twoją branżę" />}
        lead={
          <p>
            Restauracja potrzebuje menu i rezerwacji, hotel galerii i zapytań o terminy, ekipa remontowa realizacji i
            formularza wyceny. Dlatego dla każdej branży, z którą pracuję, opisałem, czego brakuje najczęściej, co
            musi się znaleźć na stronie i ile to kosztuje.
          </p>
        }
        aside={
          <ButtonLink href="/twoja-strona" variant="signal" size="lg" arrow>
            Zobacz, jak mogłaby wyglądać Twoja strona
          </ButtonLink>
        }
      />

      <Section className="pt-0 md:pt-0">
        <ul className="grid border-t hairline md:grid-cols-2">
          {industries.map((i, idx) => {
            const count = projectsByIndustry(i.slug).length;
            return (
              <li key={i.slug} className="border-b hairline md:odd:border-r md:odd:pr-10 md:even:pl-10">
                <Link href={`/branze/${i.slug}`} className="group block py-10 md:py-14">
                  <p className="label-mono flex justify-between text-mute">
                    <span>{String(idx + 1).padStart(2, "0")}</span>
                    <span>
                      {count > 0
                        ? `${count} ${plural(count, ["realizacja", "realizacje", "realizacji"])}`
                        : "branża usługowa"}
                    </span>
                  </p>
                  <h2 className="mt-8 font-display text-[length:var(--text-big)] leading-none font-semibold tracking-tight text-balance transition-colors duration-300 group-hover:text-signal">
                    {nbsp(i.name)}
                  </h2>
                  <p className="mt-3 text-mute">Dla {i.forName}</p>
                  <p className="mt-5 flex items-end justify-between gap-6 text-lg leading-snug text-ink/80">
                    <span className="max-w-sm">{nbsp(i.hook)}</span>
                    <Arrow className="size-6 shrink-0 group-hover:text-signal" />
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      <CtaBand
        source="branza"
        title={
          <>
            Nie ma Twojej branży? <Accent>Napisz.</Accent>
          </>
        }
        lead="Pracuję też z firmami, które nie mieszczą się na tej liście. Opisz, czym się zajmujesz, a powiem, czego potrzebuje Twoja strona."
      />
    </>
  );
}
