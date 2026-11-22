"use client";

import type { ReactNode } from "react";
import { site, type LeadSource } from "@/content/site";
import { localizeHref } from "@/i18n/config";
import { useLocale } from "@/i18n/client";
import { contactHref } from "@/lib/utils";
import { ButtonLink } from "./button";
import { Accent } from "./section-head";

const COPY = {
  pl: {
    lead: "Bezpłatna wycena w 24h. Bez zobowiązań i bez technicznego żargonu.",
    eyebrow: "Następny krok",
    title: (
      <>
        Porozmawiajmy o Twojej <Accent>stronie</Accent>.
      </>
    ),
    cta: "Wyceń moją stronę",
    call: "lub zadzwoń:",
  },
  en: {
    lead: "A free quote within 24h. No strings attached and no technical jargon.",
    eyebrow: "Next step",
    title: (
      <>
        Let’s talk about your <Accent>website</Accent>.
      </>
    ),
    cta: "Get my quote",
    call: "or call:",
  },
};

export function CtaBand({
  source,
  title,
  lead,
  extra,
}: {
  source: LeadSource;
  title?: ReactNode;
  lead?: string;
  extra?: Record<string, string>;
}) {
  const locale = useLocale();
  const c = COPY[locale];
  return (
    <section className="theme-ink">
      <div className="container-x pt-24 pb-4 md:pt-32">
        <p className="label-mono text-mute">{c.eyebrow}</p>
        <h2 className="mt-6 max-w-5xl font-display text-[length:var(--text-giant)] font-semibold text-balance">
          {title ?? c.title}
        </h2>
        <p className="mt-6 max-w-xl text-lg text-mute">{lead ?? c.lead}</p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <ButtonLink href={localizeHref(contactHref({ zrodlo: source, ...extra }), locale)} variant="signal" size="lg" arrow>
            {c.cta}
          </ButtonLink>
          <a
            href={site.phoneHref}
            className="label-mono px-4 py-3 text-paper/80 underline-offset-4 hover:text-paper hover:underline"
          >
            {c.call} {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
