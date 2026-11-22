import { ButtonLink } from "@/components/ui/button";
import { Accent } from "@/components/ui/section-head";

export function PreviewCta({ industrySlug, industryName }: { industrySlug: string; industryName: string }) {
  return (
    <section className="bg-signal text-ink">
      <div className="container-x grid gap-10 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-8">
          <p className="label-mono">Zanim cokolwiek zamówisz</p>
          <h2 className="mt-5 font-display text-[length:var(--text-huge)] font-semibold text-balance">
            Zobacz, jak mogłaby wyglądać <Accent className="text-paper">Twoja</Accent> strona
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-snug text-ink/80">
            Wpisz nazwę firmy i miasto, a w kilka sekund zobaczysz własną stronę w branży „{industryName.toLowerCase()}”.
            Jeśli się spodoba, wysyłasz zapytanie jednym kliknięciem.
          </p>
        </div>
        <div className="flex items-end md:col-span-4 md:justify-end">
          <ButtonLink
            href={`/twoja-strona?b=${industrySlug}`}
            variant="ink"
            size="lg"
            arrow
            className="hover:bg-paper hover:text-ink"
          >
            Pokaż mi moją stronę
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
