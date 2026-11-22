import Link from "next/link";
import { industries } from "@/content/industries";
import { projectsByIndustry } from "@/content/projects";
import { Accent, SectionHead } from "@/components/ui/section-head";
import { Arrow } from "@/components/ui/button";
import { IndustryList, type IndustryItem } from "./story/industry-list";

export function IndustriesStrip({ index }: { index?: string }) {
  const items: IndustryItem[] = industries.map((ind) => {
    const list = projectsByIndustry(ind.slug).sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    const p = list[0];
    return {
      slug: ind.slug,
      name: ind.name,
      hook: ind.hook,
      count: list.length,
      project: p
        ? {
            title: p.title,
            category: p.category,
            city: p.city,
            liveUrl: p.liveUrl,
            shot: { src: p.shot.src, width: p.shot.width, height: p.shot.height },
          }
        : null,
    };
  });

  return (
    <section className="bg-paper-2">
      <div className="container-x py-24 md:py-36">
        <SectionHead
          index={index}
          eyebrow="Branże"
          title={
            <>
              Robię strony dla firm <Accent>takich jak Twoja</Accent>.
            </>
          }
          lead={
            <>
              Taxi w&nbsp;Sokółce, kebab w&nbsp;Wyszkowie, wypożyczalnia aut w&nbsp;Białymstoku, hotel z&nbsp;salą
              weselną. Każda branża sprzedaje inaczej — strona też musi.
            </>
          }
        />

        <div className="mt-14 md:mt-20">
          <IndustryList items={items} />
        </div>

        <div className="mt-12 flex flex-col gap-5 md:mt-16 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-pretty text-xl leading-snug">
            Nie widzisz swojej branży?{" "}
            <Link
              href="/twoja-strona"
              className="group/btn inline-flex items-baseline gap-1.5 font-medium underline decoration-signal decoration-2 underline-offset-[0.2em] transition-colors hover:text-signal"
            >
              Wpisz ją w&nbsp;generatorze
              <Arrow className="self-center" />
            </Link>{" "}
            <span className="text-mute">i&nbsp;zobacz swoją stronę, zanim cokolwiek zapłacisz.</span>
          </p>
          <Link
            href="/branze"
            className="label-mono group/btn inline-flex min-h-11 items-center gap-2 self-start text-mute transition-colors hover:text-ink md:self-auto"
          >
            Wszystkie branże
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
