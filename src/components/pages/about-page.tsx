import Image from "next/image";
import Link from "next/link";
import type { ProfilePage } from "schema-dts";
import { Breadcrumbs } from "@/components/seo/page-hero";
import { EditorialList, LinkList, Section } from "@/components/seo/blocks";
import { CtaBand } from "@/components/ui/cta-band";
import { JsonLd } from "@/components/ui/json-ld";
import { Accent } from "@/components/ui/section-head";
import { stack } from "@/components/home/about";
import { heroStats, site } from "@/content/site";
import { services, formatPLN } from "@/content/services";
import { projects } from "@/content/projects";
import { absoluteUrl, breadcrumbs, pageMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";

const TITLE = `${site.fullName} — web developer z Podlasia`;
const DESCRIPTION = `${site.fullName} (Bartek) — web developer z Podlasia i twórca bartekstrony.pl. Projektuję i koduję strony internetowe, landing page i sklepy dla firm z całej Polski.`;

export const aboutMeta = pageMeta({ title: TITLE, description: DESCRIPTION, path: site.aboutPath });

const years = heroStats.find((s) => s.label.includes("doświadczenia"));

const steps = [
  { title: "Rozmowa", text: "Telefon albo wiadomość. Mówisz, czym się zajmujesz i czego potrzebujesz, ja dopytuję o konkrety." },
  { title: "Wycena w 24 godziny", text: "Konkretna kwota i termin, bez gwiazdek. Orientacyjną cenę policzysz też sam w kalkulatorze." },
  { title: "Projekt", text: "Pokazuję działającą stronę, nie obrazki w PDF. Uwagi zgłaszasz na żywo, poprawiam na bieżąco." },
  { title: "Wdrożenie", text: "Domena, hosting na Twoje dane, Google Search Console. Wszystko zostaje Twoje." },
  { title: "Wsparcie", text: "Przez 30 dni po starcie naprawiam bez dopłat wszystko, co przestałoby działać." },
];

export function AboutPage() {
  const crumbs = [
    { name: "Start", path: "/" },
    { name: site.fullName, path: site.aboutPath },
  ];
  const url = absoluteUrl(site.aboutPath);
  const profile: ProfilePage & { "@context": "https://schema.org" } = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${url}#profile`,
    url,
    name: TITLE,
    inLanguage: "pl-PL",
    mainEntity: { "@id": `${site.url}/#person` },
    about: { "@id": `${site.url}/#business` },
  };
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <JsonLd data={breadcrumbs(crumbs)} />
      <JsonLd data={profile} />

      <section className="container-x pt-[calc(var(--header-h)+2rem)] pb-14 md:pb-20">
        <Breadcrumbs items={crumbs} />
        <div className="mt-14 grid items-end gap-12 md:mt-20 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="label-mono flex gap-3 text-mute">
              <span className="text-signal" aria-hidden>
                ●
              </span>
              <span>O mnie</span>
            </p>
            <h1 className="mt-5 font-display text-[length:var(--text-giant)] font-semibold text-balance">
              {site.fullName}
            </h1>
            <p className="mt-6 max-w-xl text-xl leading-relaxed text-pretty text-ink/80">
              Web developer z&nbsp;Podlasia i&nbsp;twórca <Link href="/" className="underline decoration-signal decoration-2 underline-offset-4 hover:text-signal">bartekstrony.pl</Link>.
              Projektuję i&nbsp;koduję strony internetowe, landing page i&nbsp;sklepy dla firm z&nbsp;całej Polski. Na co dzień
              mówią do mnie po prostu Bartek.
            </p>
          </div>
          <div className="md:col-span-5">
            <Image
              src="/portrait/og-portrait.png"
              width={760}
              height={720}
              alt={`${site.fullName} — web developer, bartekstrony.pl`}
              sizes="(min-width: 768px) 38vw, 100vw"
              className="mx-auto w-full max-w-md"
              priority
            />
          </div>
        </div>
        <dl className="mt-12 grid grid-cols-2 border-t hairline md:grid-cols-4">
          {[
            { label: "Baza", value: "Podlasie" },
            { label: "Pracuję", value: "cała Polska" },
            { label: "Realizacje", value: String(projects.length) },
            { label: "Doświadczenie", value: years ? `${years.value}${years.suffix} lat` : "—" },
          ].map((f, i) => (
            <div
              key={f.label}
              className={cn(
                "border-b hairline py-4",
                i % 2 === 1 ? "border-l pl-4" : "pr-4",
                i === 2 && "md:border-l md:pl-4",
              )}
            >
              <dt className="label-mono text-mute">{f.label}</dt>
              <dd className="mt-2 font-display text-2xl font-semibold tracking-tight md:text-3xl">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <Section tone="paper-2">
        <div className="grid gap-10 md:grid-cols-12">
          <h2 className="font-display text-[length:var(--text-huge)] font-semibold md:col-span-4">
            Kim <Accent>jestem</Accent>
          </h2>
          <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-pretty text-ink/80 md:col-span-7 md:col-start-6">
            <p>
              Nazywam się {site.fullName}. Robię strony i&nbsp;sklepy internetowe. Mieszkam na Podlasiu, w&nbsp;okolicach
              Białegostoku i&nbsp;Sokółki, a&nbsp;pracuję dla firm z&nbsp;całej Polski, głównie zdalnie.
            </p>
            <p>
              Pod marką bartekstrony.pl działam sam. Dzwonisz do mnie, rozmawiasz ze mną i&nbsp;to ja projektuję oraz koduję
              Twoją stronę. Nikt niczego nie przekazuje dalej, więc nic nie ginie po drodze, jak to bywa w&nbsp;agencjach.
            </p>
            <p>
              Strony buduję w&nbsp;kodzie, a&nbsp;nie na gotowych szablonach. Dzięki temu są szybkie, dobrze działają na telefonie
              i&nbsp;od początku są przygotowane pod Google. Najważniejsze jest dla mnie to, żeby strona przynosiła klientom
              telefony i&nbsp;zapytania, a&nbsp;nie tylko ładnie wyglądała.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <h2 className="font-display text-[length:var(--text-huge)] font-semibold">
          Czym się <Accent>zajmuję</Accent>
        </h2>
        <LinkList
          className="mt-10"
          items={services.map((s) => ({
            href: `/oferta/${s.slug}`,
            label: s.name,
            hint: s.promise,
            tag: s.priceFrom ? `od ${formatPLN(s.priceFrom)}` : "wycena",
          }))}
        />
      </Section>

      <Section tone="paper-2">
        <h2 className="font-display text-[length:var(--text-huge)] font-semibold">
          Jak <Accent>pracuję</Accent>
        </h2>
        <EditorialList className="mt-10" items={steps} />
      </Section>

      <Section>
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="font-display text-[length:var(--text-huge)] font-semibold">
              <Accent>Technologie</Accent>
            </h2>
            <ul className="mt-8 flex flex-wrap gap-2">
              {stack.map((t) => (
                <li key={t} className="rounded-full border hairline px-3 py-1.5 text-sm">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <h2 className="font-display text-[length:var(--text-huge)] font-semibold">
              Wybrane <Accent>realizacje</Accent>
            </h2>
            <LinkList
              compact
              className="mt-8"
              items={[
                ...featured.map((p) => ({
                  href: `/realizacje/${p.slug}`,
                  label: p.title,
                  hint: [p.category, p.city].filter(Boolean).join(" · "),
                })),
                { href: "/realizacje", label: `Wszystkie realizacje (${projects.length})` },
              ]}
            />
          </div>
        </div>
      </Section>

      <Section tone="paper-2">
        <h2 className="font-display text-[length:var(--text-huge)] font-semibold">
          <Accent>Kontakt</Accent>
        </h2>
        <dl className="mt-10 max-w-2xl divide-y divide-line border-y hairline text-lg">
          <div className="grid grid-cols-[8rem_1fr] gap-x-4 py-4">
            <dt className="label-mono pt-1 text-mute">Telefon</dt>
            <dd>
              <a href={site.phoneHref} className="underline decoration-line underline-offset-4 hover:decoration-signal">
                {site.phone}
              </a>
            </dd>
          </div>
          <div className="grid grid-cols-[8rem_1fr] gap-x-4 py-4">
            <dt className="label-mono pt-1 text-mute">E-mail</dt>
            <dd>
              <a href={`mailto:${site.email}`} className="break-all underline decoration-line underline-offset-4 hover:decoration-signal">
                {site.email}
              </a>
            </dd>
          </div>
          {site.socials.map((s) => (
            <div key={s.href} className="grid grid-cols-[8rem_1fr] gap-x-4 py-4">
              <dt className="label-mono pt-1 text-mute">{s.label}</dt>
              <dd>
                <a
                  href={s.href}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="break-all underline decoration-line underline-offset-4 hover:decoration-signal"
                >
                  {s.href.replace(/^https:\/\/(www\.)?/, "")}
                </a>
              </dd>
            </div>
          ))}
          <div className="grid grid-cols-[8rem_1fr] gap-x-4 py-4">
            <dt className="label-mono pt-1 text-mute">Obszar</dt>
            <dd>{site.serviceArea}</dd>
          </div>
        </dl>
      </Section>

      <CtaBand source="o-mnie" />
    </>
  );
}
