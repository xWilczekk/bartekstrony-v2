import { renderOg } from "@/components/seo/og";
import { getIndustry, industries } from "@/content/industries";

export const alt = "Strony internetowe dla branż — bartekstrony.pl";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = getIndustry(slug);
  if (!i) return renderOg({ eyebrow: "Branże", title: "Strony internetowe dla branż" });
  return renderOg({
    eyebrow: "Branże",
    title: `${i.h1.a} ${i.h1.accent}${i.h1.b ?? ""}`,
    accent: i.h1.accent,
    footer: `Strony internetowe dla ${i.forName}`,
  });
}
