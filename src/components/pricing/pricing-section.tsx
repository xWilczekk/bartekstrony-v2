import Link from "next/link";
import { Accent, SectionHead } from "@/components/ui/section-head";
import { Reveal } from "@/components/ui/reveal";
import { pricingFor } from "@/content/pricing";
import { localizeHref } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { PackageList } from "./package-list";
import { QuoteTeaser } from "./quote-teaser";

export function PricingSection({ index }: { index?: string }) {
  const locale = getLocale();
  const en = locale === "en";
  return (
    <section id="cennik" className="container-x py-24 md:py-32">
      <SectionHead
        index={index}
        align="center"
        eyebrow={en ? "Pricing" : "Cennik"}
        title={
          en ? (
            <>
              Prices up front, <Accent>not</Accent> hidden behind a form.
            </>
          ) : (
            <>
              Ceny na wierzchu, <Accent>bez</Accent> chowania ich za formularzem.
            </>
          )
        }
        lead={
          en
            ? "“From” prices are for a typical, simple scope. You get the exact amount in a quote within 24 hours, before we start anything."
            : "Ceny „od” dotyczą typowego, prostego zakresu. Dokładną kwotę dostajesz w wycenie w 24 godziny, zanim cokolwiek zaczniemy."
        }
      />

      <div className="mt-12 md:mt-16">
        <PackageList packs={pricingFor(locale).packages} />
      </div>

      <Reveal className="mt-12 md:mt-16">
        <QuoteTeaser />
      </Reveal>

      <p className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-mute">
        <span>{en ? "Add-ons, the package comparison and what affects the price:" : "Dodatki, porównanie pakietów i to, co wpływa na cenę:"}</span>
        <Link
          href={localizeHref("/cennik", locale)}
          className="label-mono text-ink underline underline-offset-4 decoration-signal hover:text-signal"
        >
          {en ? "Full price list →" : "Pełny cennik →"}
        </Link>
      </p>
    </section>
  );
}
