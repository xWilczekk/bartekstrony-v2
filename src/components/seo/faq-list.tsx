import type { ReactNode } from "react";
import { JsonLd } from "@/components/ui/json-ld";
import { SectionHead, Accent } from "@/components/ui/section-head";
import { getLocale } from "@/i18n/server";
import { faqSchema } from "@/lib/seo";
import { Section } from "./blocks";
import { nbsp } from "./text";

export function FaqSection({
  items,
  index,
  title,
  tone = "paper",
}: {
  items: { q: string; a: string }[];
  index?: string;
  title?: ReactNode;
  tone?: "paper" | "paper-2";
}) {
  const en = getLocale() === "en";
  return (
    <Section tone={tone}>
      <JsonLd data={faqSchema(items)} />
      <SectionHead
        index={index}
        eyebrow={en ? "Questions" : "Pytania"}
        title={
          title ??
          (en ? (
            <>
              Frequently asked <Accent>questions</Accent>
            </>
          ) : (
            <>
              Najczęstsze <Accent>pytania</Accent>
            </>
          ))
        }
      />
      <div className="mt-12">
        <div>
          {items.map((f) => (
            <details key={f.q} className="group border-b hairline first:border-t">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 font-display text-xl leading-tight font-semibold tracking-tight marker:content-none md:text-2xl [&::-webkit-details-marker]:hidden">
                <span className="text-balance">{nbsp(f.q)}</span>
                <span
                  aria-hidden
                  className="relative mt-1 size-6 shrink-0 before:absolute before:top-1/2 before:left-0 before:h-px before:w-full before:bg-current after:absolute after:top-0 after:left-1/2 after:h-full after:w-px after:bg-current after:transition-transform after:duration-300 group-open:after:scale-y-0"
                />
              </summary>
              <p className="max-w-2xl pb-7 leading-relaxed text-pretty text-ink/75 md:text-[1.05rem]">{nbsp(f.a)}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
