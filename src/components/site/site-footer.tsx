import Link from "next/link";
import { cities } from "@/content/cities";
import { industries } from "@/content/industries";
import { servicesFor } from "@/content/services";
import { site, siteEn, type LeadSource } from "@/content/site";
import { localizeHref, type Locale } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { ButtonLink } from "@/components/ui/button";
import { KineticText } from "@/components/motion/kinetic-text";
import { Magnetic } from "@/components/motion/magnetic";
import { contactHref } from "@/lib/utils";
import { BackToTop } from "./back-to-top";
import { CookieSettingsButton } from "./cookie-settings-button";
import { CopyEmail } from "./copy-email";
import { LanguageSwitch } from "./language-switch";
import { LocalTime } from "./local-time";
import { MobileActionBar } from "./mobile-action-bar";
import { QUOTE_HREF } from "./nav-utils";
import { LogoLink } from "./wordmark";

const SOURCE: LeadSource = "footer";
const YEAR = new Date().getFullYear();

type Column = { title: string; links: { label: string; href: string }[] };

const columnsPl: Column[] = [
  {
    title: "Oferta",
    links: [
      ...servicesFor("pl").map((s) => ({ label: s.name, href: `/oferta/${s.slug}` })),
      { label: "Wszystkie usługi", href: "/oferta" },
    ],
  },
  {
    title: "Branże",
    links: [
      ...industries.map((i) => ({ label: i.name, href: `/branze/${i.slug}` })),
      { label: "Wszystkie branże", href: "/branze" },
    ],
  },
  {
    title: "Miasta",
    links: [
      ...cities.map((c) => ({ label: c.name, href: `/strony-internetowe/${c.slug}` })),
      { label: "Wszystkie miasta", href: "/strony-internetowe" },
    ],
  },
  {
    title: "Narzędzia",
    links: [
      { label: "Podgląd Twojej strony", href: "/twoja-strona" },
      { label: "Darmowy audyt strony", href: "/audyt" },
      { label: "Wycena online", href: "/wycena" },
    ],
  },
  {
    title: "Strona",
    links: [
      { label: "Realizacje", href: "/realizacje" },
      { label: "Cennik", href: "/cennik" },
      { label: "Blog", href: "/blog" },
      { label: "Kontakt", href: "/kontakt" },
    ],
  },
];

const columnsEn: Column[] = [
  {
    title: "Services",
    links: [
      ...servicesFor("en").map((s) => ({ label: s.name, href: `/oferta/${s.slug}` })),
      { label: "All services", href: "/oferta" },
    ],
  },
  {
    title: "Tools",
    links: [
      { label: "Preview your website", href: "/twoja-strona" },
      { label: "Free website audit", href: "/audyt" },
      { label: "Online quote", href: "/wycena" },
    ],
  },
  {
    title: "Site",
    links: [
      { label: "Work", href: "/realizacje" },
      { label: "Pricing", href: "/cennik" },
      { label: "Contact", href: "/kontakt" },
    ],
  },
];

const COPY = {
  pl: {
    eyebrow: "(Kontakt)",
    title: "Masz projekt albo pytanie?",
    reply: "Odpowiadam w 24h · bez zobowiązań",
    word: "Napisz.",
    wordSr: " — formularz kontaktowy",
    phone: "Telefon",
    quote: "Wyceń stronę",
    quoteNote: "Widełki cenowe w 30 sekund, dokładna wycena w 24h.",
    sitemap: "Mapa strony",
    legal: " · działalność nierejestrowana",
    privacy: "Polityka prywatności",
    cookies: "Ustawienia cookies",
    time: "Teraz jest",
  },
  en: {
    eyebrow: "(Contact)",
    title: "Got a project or a question?",
    reply: "I reply within 24h · no strings attached",
    word: "Say hi.",
    wordSr: " — contact form",
    phone: "Phone",
    quote: "Get a quote",
    quoteNote: "A price range in 30 seconds, an exact quote within 24h.",
    sitemap: "Sitemap",
    legal: "",
    privacy: "Privacy policy",
    cookies: "Cookie settings",
    time: "In Poland it’s",
  },
} satisfies Record<Locale, Record<string, string>>;

export function SiteFooter() {
  const locale = getLocale();
  const c = COPY[locale];
  const columns = locale === "en" ? columnsEn : columnsPl;
  const href = (h: string) => localizeHref(h, locale);
  return (
    <>
      <footer data-site-footer aria-labelledby="footer-title" className="theme-ink relative overflow-hidden">
        <div className="container-x pt-20 md:pt-28">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t hairline pt-5">
            <h2 id="footer-title" className="label-mono text-mute">
              <span className="text-signal">{c.eyebrow}</span> {c.title}
            </h2>
            <p className="label-mono text-mute">{c.reply}</p>
          </div>

          <Link
            href={href(contactHref({ zrodlo: SOURCE }))}
            className="group/write mt-6 flex w-fit max-w-full items-end gap-[3vw] rounded-sm md:mt-10"
          >
            <KineticText
              text={c.word}
              className="font-display text-[clamp(4.75rem,26vw,19.5rem)] leading-[0.84] tracking-[-0.05em]"
            />
            <span className="sr-only">{c.wordSr}</span>
            <span
              aria-hidden
              className="mb-[0.9vw] hidden size-[clamp(3.25rem,6.5vw,6.5rem)] shrink-0 items-center justify-center rounded-full bg-signal text-paper transition-transform duration-500 ease-[var(--ease-out)] group-hover/write:rotate-45 md:flex"
            >
              <svg viewBox="0 0 16 16" className="size-[38%]" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M4 12 12 4M5.5 4H12v6.5" />
              </svg>
            </span>
          </Link>

          <div className="mt-12 grid gap-10 border-t hairline pt-10 md:mt-16 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-6 lg:col-span-5">
              <p className="label-mono text-mute">E-mail</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-3">
                <a
                  href={`mailto:${site.email}`}
                  className="-my-2 py-2 font-display text-[clamp(1.5rem,3vw,2.5rem)] font-medium underline decoration-transparent decoration-1 underline-offset-[0.18em] transition-[text-decoration-color] duration-300 hover:decoration-current"
                >
                  {site.email}
                </a>
                <CopyEmail email={site.email} />
              </div>
              {site.socials.length > 0 && (
                <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  <Link
                    href={site.aboutPath}
                    rel="author"
                    className="-my-2 py-2 text-mute underline decoration-transparent underline-offset-4 transition-colors duration-300 hover:text-current hover:decoration-current"
                  >
                    {site.fullName} · web developer
                  </Link>
                  {site.socials.map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      target="_blank"
                      rel="me noopener noreferrer"
                      className="-my-2 inline-flex items-center gap-1.5 py-2 text-mute underline decoration-transparent underline-offset-4 transition-colors duration-300 hover:text-current hover:decoration-current"
                    >
                      {s.label}
                      <svg aria-hidden viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M4 12 12 4M5.5 4H12v6.5" />
                      </svg>
                    </a>
                  ))}
                </p>
              )}
            </div>

            <div className="md:col-span-6 lg:col-span-4">
              <p className="label-mono text-mute">{c.phone}</p>
              <a
                href={site.phoneHref}
                className="mt-1 -mb-2 inline-block py-2 font-display text-[clamp(1.5rem,3vw,2.5rem)] font-medium underline decoration-transparent decoration-1 underline-offset-[0.18em] transition-[text-decoration-color] duration-300 hover:decoration-current"
              >
                {site.phone}
              </a>
              <p className="mt-2 max-w-sm text-sm text-mute">{locale === "en" ? siteEn.serviceArea : site.serviceArea}</p>
            </div>

            <div className="flex flex-col items-start gap-3 md:col-span-12 lg:col-span-3 lg:items-end">
              <Magnetic>
                <ButtonLink href={href(QUOTE_HREF)} variant="signal" size="lg" arrow className="hover:bg-paper hover:text-ink">
                  {c.quote}
                </ButtonLink>
              </Magnetic>
              <p className="text-sm text-mute lg:text-right">{c.quoteNote}</p>
            </div>
          </div>

          <nav
            id="mapa-strony"
            aria-label={c.sitemap}
            className={`mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t hairline pt-10 sm:grid-cols-3 ${locale === "en" ? "" : "lg:grid-cols-5"}`}
          >
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="label-mono text-mute">{col.title}</h3>
                <ul className="mt-4 grid gap-0.5 md:gap-1.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={href(l.href)}
                        className="inline-flex min-h-10 items-center text-[0.95rem] text-paper/80 transition-colors duration-300 hover:text-signal md:min-h-0 md:py-0.5"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="mt-16 grid gap-6 border-t hairline py-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-6">
              <LogoLink locale={locale} />
              <p className="label-mono mt-2 text-mute">
                © {YEAR} {site.name}
                {c.legal} ·{" "}
                <Link href={href("/polityka-prywatnosci")} className="underline-offset-4 hover:text-paper hover:underline">
                  {c.privacy}
                </Link>{" "}
                ·{" "}
                <Link href={href("/mapa-strony")} className="underline-offset-4 hover:text-paper hover:underline">
                  {c.sitemap}
                </Link>{" "}
                ·{" "}
                <CookieSettingsButton className="[text-transform:inherit] underline-offset-4 hover:text-paper hover:underline">{c.cookies}</CookieSettingsButton>
              </p>
            </div>
            <div className="flex items-center justify-between gap-6 md:col-span-6 md:justify-end">
              <p className="label-mono text-mute">
                {c.time} <LocalTime className="text-paper tabular-nums" />
              </p>
              <div className="flex items-center gap-3">
                <LanguageSwitch />
                <BackToTop />
              </div>
            </div>
          </div>
        </div>
      </footer>
      <MobileActionBar />
    </>
  );
}
