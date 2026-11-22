import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { Accent, SectionHead } from "@/components/ui/section-head";
import { faqFor, type FaqItem } from "@/content/faq";
import { site } from "@/content/site";
import { localizeHref } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { faqSchema } from "@/lib/seo";
import { contactHref } from "@/lib/utils";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const locale = getLocale();
  return (
    <div className="border-b hairline">
      {items.map((it, i) => (
        <details key={it.q} className="group border-t hairline">
          <summary className="flex min-h-[4.5rem] cursor-pointer list-none items-start gap-4 py-5 md:gap-6 [&::-webkit-details-marker]:hidden">
            <span className="label-mono w-6 shrink-0 pt-[0.45rem] text-mute">{String(i + 1).padStart(2, "0")}</span>
            <span className="flex-1 font-display text-[clamp(1.2rem,2.1vw,1.7rem)] leading-[1.15]! font-semibold text-balance transition-colors group-hover:text-signal">
              {it.q}
            </span>
            <span aria-hidden className="relative mt-1.5 size-5 shrink-0">
              <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
              <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-current transition-transform duration-300 ease-[var(--ease-out)] group-open:scale-y-0" />
            </span>
          </summary>
          <div className="pr-9 pb-8 pl-10 md:pl-12">
            <p className="max-w-2xl text-pretty leading-relaxed text-ink/80">{it.a}</p>
            {it.link && (
              <Link
                href={localizeHref(it.link.href, locale)}
                className="label-mono mt-4 inline-block text-ink underline underline-offset-4 decoration-signal hover:text-signal"
              >
                {it.link.label} →
              </Link>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}

const COPY = {
  pl: {
    eyebrow: "Pytania",
    title: (
      <>
        To, o co <Accent>pytają</Accent> przed zleceniem.
      </>
    ),
    lead: "Krótko i bez żargonu. Jeśli czegoś tu brakuje, zadzwoń albo napisz — odpowiem szczerze.",
    missing: "Nie ma tu Twojego pytania?",
    tell: "Opowiedz, co potrzebujesz. Odpowiadam w ciągu 24 godzin.",
    ask: "Zadaj pytanie",
    call: "lub zadzwoń:",
  },
  en: {
    eyebrow: "Questions",
    title: (
      <>
        What people <Accent>ask</Accent> before hiring me.
      </>
    ),
    lead: "Short and jargon-free. If something’s missing, call or write — I’ll give you an honest answer.",
    missing: "Your question isn’t here?",
    tell: "Tell me what you need. I reply within 24 hours.",
    ask: "Ask a question",
    call: "or call:",
  },
};

export function Faq({ index }: { index?: string }) {
  const locale = getLocale();
  const c = COPY[locale];
  const faq = faqFor(locale);
  return (
    <section id="faq" className="container-x py-24 md:py-32">
      <JsonLd data={faqSchema(faq)} />
      <SectionHead index={index} eyebrow={c.eyebrow} title={c.title} lead={c.lead} />

      <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12">
        <aside className="md:col-span-4">
          <div className="md:sticky md:top-[calc(var(--header-h)+24px)]">
            <p className="font-display text-2xl leading-tight! font-semibold text-balance">{c.missing}</p>
            <p className="mt-3 text-mute">{c.tell}</p>
            <div className="mt-6 flex flex-col items-start gap-3">
              <ButtonLink href={localizeHref(contactHref({ zrodlo: "footer" }), locale)} variant="ink" arrow>
                {c.ask}
              </ButtonLink>
              <a
                href={site.phoneHref}
                className="label-mono inline-flex min-h-11 items-center text-mute underline-offset-4 hover:text-ink hover:underline"
              >
                {c.call} {site.phone}
              </a>
            </div>
          </div>
        </aside>
        <div className="md:col-span-8">
          <FaqAccordion items={faq} />
        </div>
      </div>
    </section>
  );
}
