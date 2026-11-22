import { renderOg } from "@/components/seo/og";
import { getProjectFor, projects } from "@/content/projects";

export const alt = "Case study — bartekstrony.pl";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProjectFor(slug, "en");
  if (!p) return renderOg({ eyebrow: "Work", title: "Work" });
  return renderOg({
    eyebrow: "Case study",
    title: p.title,
    footer: p.category,
    swatches: p.palette,
  });
}
