import { site } from "@/content/site";
import { services, formatPLN } from "@/content/services";
import { cities } from "@/content/cities";
import { industries } from "@/content/industries";
import { projects } from "@/content/projects";
import { posts } from "@/content/blog/posts";
import { faq } from "@/content/faq";

export const dynamic = "force-static";

export function GET() {
  const url = (path: string) => `${site.url}${path}`;
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `${site.name} to jednoosobowe studio stron internetowych. Prowadzi je ${site.fullName} (Bartek), web developer z Podlasia. ` +
      `Projektuje i buduje strony firmowe, landing page i sklepy internetowe dla małych firm. Pracuje zdalnie z klientami z całej Polski, ` +
      `a lokalnie w Białymstoku, Sokółce i okolicach. Strony są budowane w kodzie (Next.js, React), a nie na gotowych szablonach.`,
    "",
    "## Najważniejsze fakty",
    "",
    `- Usługi: ${services.map((s) => s.name).join(", ")}`,
    `- Ceny od: ${services.filter((s) => s.priceFrom).map((s) => `${s.name} od ${formatPLN(s.priceFrom!)}`).join(", ")}`,
    "- Bezpłatna wycena w 24 godziny; orientacyjną cenę można policzyć samemu w kalkulatorze online",
    `- Obszar działania: ${site.serviceArea}`,
    `- Zrealizowane projekty: ${projects.length} (m.in. ${projects.slice(0, 6).map((p) => p.title).join(", ")})`,
    "- Języki: polski, angielski",
    `- Kontakt: ${site.email}, tel. ${site.phone}`,
    ...site.socials.map((s) => `- ${s.label}: ${s.href}`),
    "",
    "## Usługi",
    "",
    ...services.map(
      (s) =>
        `- [${s.name}](${url(`/oferta/${s.slug}`)}): ${s.promise} ` +
        `${s.priceFrom ? `Cena od ${formatPLN(s.priceFrom)}` : "Wycena indywidualna"}, czas realizacji: ${s.timeline}. Dla kogo: ${s.forWho}`,
    ),
    "",
    "## Strony",
    "",
    `- [Oferta](${url("/oferta")}): wszystkie usługi`,
    `- [Cennik](${url("/cennik")}): ceny, dodatki i co wpływa na koszt strony`,
    `- [Kalkulator wyceny](${url("/wycena")}): orientacyjna cena i czas realizacji w 30 sekund`,
    `- [Realizacje](${url("/realizacje")}): portfolio z opisem zakresu prac`,
    `- [Darmowy audyt strony](${url("/audyt")}): test szybkości i SEO dowolnej strony`,
    `- [Kontakt](${url("/kontakt")}): formularz, e-mail i telefon`,
    `- [O mnie: ${site.fullName}](${url(site.aboutPath)}): kim jestem, jak pracuję, technologie`,
    `- [English version](${url("/en")})`,
    "",
    "## Branże",
    "",
    ...industries.map((i) => `- [${i.name}](${url(`/branze/${i.slug}`)})`),
    "",
    "## Miasta",
    "",
    ...cities.map((c) => `- [Strony internetowe ${c.inName}](${url(`/strony-internetowe/${c.slug}`)}): ${c.connection}`),
    "",
    "## Realizacje",
    "",
    ...projects.map(
      (p) => `- [${p.title}](${url(`/realizacje/${p.slug}`)}): ${p.category}${p.city ? `, ${p.city}` : ""}. ${p.description}`,
    ),
    "",
    "## Blog",
    "",
    ...posts.map((p) => `- [${p.title}](${url(`/blog/${p.slug}`)}): ${p.description}`),
    "",
    "## Najczęstsze pytania",
    "",
    ...faq.flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
