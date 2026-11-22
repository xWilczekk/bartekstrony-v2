import { services } from "@/content/services";
import { Accent, SectionHead } from "@/components/ui/section-head";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { ServiceRows } from "./story/service-rows";

const rowServices = services.map(({ slug, name, promise, forWho, priceFrom, timeline, includes }) => ({
  slug,
  name,
  promise,
  forWho,
  priceFrom,
  timeline,
  includes,
}));

export function ServicesOverview({ index }: { index?: string }) {
  return (
    <section className="bg-paper">
      <div className="container-x py-24 md:py-36">
        <SectionHead
          index={index}
          eyebrow="Oferta"
          title={
            <>
              Co robię i&nbsp;<Accent>ile to kosztuje</Accent>.
            </>
          }
          lead={
            <>
              Od prostej strony za 500&nbsp;zł po sklep i&nbsp;aplikację z&nbsp;AI. Ceny „od” są prawdziwe, terminy
              konkretne, a&nbsp;całość robię sam — od projektu do startu.
            </>
          }
        />

        <Reveal className="mt-14 md:mt-20">
          <ServiceRows services={rowServices} />
        </Reveal>

        <div className="mt-14 grid gap-6 md:mt-16 md:grid-cols-12 md:items-end">
          <p className="max-w-2xl text-pretty text-xl leading-snug md:col-span-12 lg:col-span-7">
            Nie wiesz, co wybrać?{" "}
            <span className="text-mute">
              Zaznacz w&nbsp;konfiguratorze, czego potrzebujesz — orientacyjną cenę zobaczysz od razu, bez czekania na
              maila.
            </span>
          </p>
          <div className="flex flex-wrap gap-3 md:col-span-12 lg:col-span-5 lg:justify-end">
            <ButtonLink href="/wycena" variant="signal" arrow>
              Policz cenę
            </ButtonLink>
            <ButtonLink href="/cennik" variant="ghost">
              Pełny cennik
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
