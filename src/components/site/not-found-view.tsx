import type { CSSProperties } from "react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Accent } from "@/components/ui/section-head";
import { localizeHref, type Locale } from "@/i18n/config";

const CSS = `
.bs-404 span{display:inline-block;font-weight:780;font-stretch:100%}
@media (prefers-reduced-motion:no-preference){
.bs-404 span{animation:bs-404-breathe 5.4s cubic-bezier(.65,0,.35,1) 3 both;animation-delay:calc(var(--i) * .45s)}
}
@keyframes bs-404-breathe{0%,100%{font-weight:780;font-stretch:100%}50%{font-weight:220;font-stretch:75%}}`;

export const notFoundMeta = {
  pl: {
    title: "Nie ma takiej strony (404)",
    description: "Ta podstrona nie istnieje. Wróć na stronę główną albo zobacz podgląd strony dla swojej firmy.",
  },
  en: {
    title: "Page not found (404)",
    description: "This page doesn't exist. Go back to the homepage or preview a website for your business.",
  },
};

const LINKS = {
  pl: [
    { label: "Realizacje", href: "/realizacje" },
    { label: "Oferta", href: "/oferta" },
    { label: "Cennik", href: "/cennik" },
    { label: "Darmowy audyt strony", href: "/audyt" },
    { label: "Kontakt", href: "/kontakt" },
  ],
  en: [
    { label: "Work", href: "/realizacje" },
    { label: "Services", href: "/oferta" },
    { label: "Pricing", href: "/cennik" },
    { label: "Free website audit", href: "/audyt" },
    { label: "Contact", href: "/kontakt" },
  ],
};

export function NotFoundView({ locale = "pl" }: { locale?: Locale }) {
  const en = locale === "en";
  const links = LINKS[locale];
  const href = (h: string) => localizeHref(h, locale);
  return (
    <section className="container-x flex min-h-[100svh] flex-col justify-center pb-20 pt-[calc(var(--header-h)+3rem)]">
      <style href="bs-404" precedence="medium">
        {CSS}
      </style>

      <p className="label-mono text-mute">
        <span className="text-signal">(404)</span> {en ? "Page not found" : "Nie znaleziono strony"}
      </p>
      <p
        aria-hidden
        className="bs-404 mt-4 select-none font-display text-[clamp(8rem,36vw,30rem)] leading-[0.8] tracking-[-0.06em]"
      >
        <span style={{ "--i": 0 } as CSSProperties}>4</span>
        <span className="text-signal" style={{ "--i": 1 } as CSSProperties}>
          0
        </span>
        <span style={{ "--i": 2 } as CSSProperties}>4</span>
      </p>

      <div className="mt-10 grid gap-12 border-t hairline pt-8 md:grid-cols-12">
        <div className="md:col-span-7">
          <h1 className="font-display text-[length:var(--text-big)] font-semibold text-balance">
            {en ? (
              <>
                No page here. Does <Accent>your</Accent> business have one yet?
              </>
            ) : (
              <>
                Nie ma tu strony. <Accent>Twoja</Accent> firma też jeszcze nie ma?
              </>
            )}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-pretty text-mute">
            {en ? (
              <>
                This address leads nowhere — the link may be old or missing a letter. But you can see a website for your
                business right now: type its name and industry, and the preview assembles before your eyes. Before you pay
                anything.
              </>
            ) : (
              <>
                Ten adres prowadzi donikąd — link mógł się zestarzeć albo zgubić literę. Za to stronę dla swojej firmy
                możesz zobaczyć od razu: wpisz nazwę i&nbsp;branżę, a&nbsp;podgląd złoży się na Twoich oczach. Zanim
                cokolwiek zapłacisz.
              </>
            )}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={href("/twoja-strona")} variant="signal" size="lg" arrow>
              {en ? "See your website" : "Zobacz swoją stronę"}
            </ButtonLink>
            <ButtonLink href={href("/")} variant="ghost" size="lg">
              {en ? "Homepage" : "Strona główna"}
            </ButtonLink>
          </div>
        </div>

        <nav aria-label={en ? "Useful links" : "Przydatne linki"} className="md:col-span-4 md:col-start-9">
          <p className="label-mono text-mute">{en ? "Or try these" : "Albo zajrzyj tu"}</p>
          <ul className="mt-4 border-t hairline">
            {links.map((l) => (
              <li key={l.href} className="border-b hairline">
                <Link
                  href={href(l.href)}
                  className="group/nf flex min-h-12 items-center justify-between gap-4 py-3 font-medium transition-colors duration-300 hover:text-signal"
                >
                  {l.label}
                  <svg
                    aria-hidden
                    viewBox="0 0 16 16"
                    className="size-3.5 transition-transform duration-300 ease-[var(--ease-out)] group-hover/nf:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
