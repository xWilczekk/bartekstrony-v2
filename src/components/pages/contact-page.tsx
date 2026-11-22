import { Suspense } from "react";
import Link from "next/link";
import { ContactForm } from "@/components/contact/contact-form";
import { JsonLd } from "@/components/ui/json-ld";
import { Accent } from "@/components/ui/section-head";
import { site, siteEn } from "@/content/site";
import { localizeHref } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { breadcrumbs, pageMeta } from "@/lib/seo";

export const contactMeta = {
  pl: pageMeta({
    title: "Kontakt — bezpłatna wycena strony w 24h",
    description:
      "Zadzwoń pod +48 509 973 600 albo napisz kilka zdań o swojej firmie. Odpowiadam w 24 godziny z konkretną wyceną strony internetowej lub sklepu. Cała Polska, zdalnie.",
    path: "/kontakt",
  }),
  en: pageMeta({
    title: "Contact — free website quote within 24h",
    description:
      "Call +48 509 973 600 or write a few sentences about your business. I reply within 24 hours with a specific quote for a website or online store. All of Poland, remotely.",
    path: "/en/contact",
  }),
};

const COPY = {
  pl: {
    home: "Strona główna",
    crumb: "Kontakt",
    eyebrow: "(Kontakt)",
    eyebrowText: "Bezpłatna wycena w 24h",
    title: (
      <>
        Opowiedz mi o swojej <Accent>firmie</Accent>.
      </>
    ),
    fastest: "Najszybciej: zadzwoń",
    reply: "Odpowiedź",
    replyText: "W ciągu 24 godzin. Wycena jest bezpłatna i bez zobowiązań.",
    where: "Gdzie",
    area: site.serviceArea,
    calcBefore: "Wolisz najpierw sprawdzić cenę?",
    calcLink: "Policz ją w kalkulatorze",
    calcAfter: "— wynik możesz stąd wysłać jednym kliknięciem.",
    write: "Albo napisz: kilka zdań wystarczy",
  },
  en: {
    home: "Home",
    crumb: "Contact",
    eyebrow: "(Contact)",
    eyebrowText: "Free quote within 24h",
    title: (
      <>
        Tell me about your <Accent>business</Accent>.
      </>
    ),
    fastest: "Fastest: call me",
    reply: "Reply",
    replyText: "Within 24 hours. The quote is free, with no strings attached.",
    where: "Where",
    area: siteEn.serviceArea,
    calcBefore: "Prefer to check the price first?",
    calcLink: "Work it out in the calculator",
    calcAfter: "— you can send me the result from there with one click.",
    write: "Or write: a few sentences are enough",
  },
};

function FormSkeleton() {
  return (
    <div aria-hidden className="space-y-6">
      <div className="h-14 rounded-[var(--radius)] bg-paper-2" />
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="h-14 rounded-[var(--radius)] bg-paper-2" />
        <div className="h-14 rounded-[var(--radius)] bg-paper-2" />
      </div>
      <div className="h-36 rounded-[var(--radius)] bg-paper-2" />
    </div>
  );
}

export function ContactPage() {
  const locale = getLocale();
  const c = COPY[locale];
  const href = (h: string) => localizeHref(h, locale);

  return (
    <>
      <JsonLd
        data={breadcrumbs([
          { name: c.home, path: href("/") },
          { name: c.crumb, path: href("/kontakt") },
        ])}
      />

      <section className="container-x pt-[calc(var(--header-h)+3rem)] pb-24 md:pb-32">
        <p className="label-mono text-mute">
          <span className="text-signal">{c.eyebrow}</span> {c.eyebrowText}
        </p>
        <h1 className="mt-5 max-w-5xl font-display text-[length:var(--text-giant)] font-semibold text-balance">{c.title}</h1>

        <div className="mt-12 grid gap-14 md:mt-16 lg:grid-cols-12 lg:gap-16">
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+24px)]">
              <p className="label-mono text-mute">{c.fastest}</p>
              <a
                href={site.phoneHref}
                className="mt-3 inline-block font-display text-[clamp(2.25rem,9vw,4.5rem)] font-semibold tracking-tight whitespace-nowrap underline decoration-signal decoration-2 underline-offset-[0.12em] transition-colors hover:text-signal"
              >
                {site.phone}
              </a>

              <dl className="mt-10 divide-y divide-line border-y hairline">
                <div className="grid grid-cols-[7rem_1fr] gap-x-4 py-4">
                  <dt className="label-mono pt-0.5 text-mute">E-mail</dt>
                  <dd>
                    <a
                      href={`mailto:${site.email}`}
                      className="inline-flex min-h-6 items-center break-all underline underline-offset-4 decoration-line hover:decoration-signal"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
                {site.socials.map((s) => (
                  <div key={s.href} className="grid grid-cols-[7rem_1fr] gap-x-4 py-4">
                    <dt className="label-mono pt-0.5 text-mute">{s.label}</dt>
                    <dd>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="me noopener noreferrer"
                        className="inline-flex min-h-6 items-center break-all underline underline-offset-4 decoration-line hover:decoration-signal"
                      >
                        {s.href.replace(/^https:\/\/(www\.)?/, "")}
                      </a>
                    </dd>
                  </div>
                ))}
                <div className="grid grid-cols-[7rem_1fr] gap-x-4 py-4">
                  <dt className="label-mono pt-0.5 text-mute">{c.reply}</dt>
                  <dd>{c.replyText}</dd>
                </div>
                <div className="grid grid-cols-[7rem_1fr] gap-x-4 py-4">
                  <dt className="label-mono pt-0.5 text-mute">{c.where}</dt>
                  <dd>{c.area}</dd>
                </div>
              </dl>

              <p className="mt-8 max-w-sm text-sm leading-relaxed text-mute">
                {c.calcBefore}{" "}
                <Link href={href("/wycena")} className="text-ink underline underline-offset-4 decoration-signal hover:text-signal">
                  {c.calcLink}
                </Link>{" "}
                {c.calcAfter}
              </p>
            </div>
          </aside>

          <div className="lg:col-span-7">
            <p className="label-mono mb-6 text-mute">{c.write}</p>
            <Suspense fallback={<FormSkeleton />}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
