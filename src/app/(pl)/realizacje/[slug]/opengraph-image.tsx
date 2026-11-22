import { renderOg } from "@/components/seo/og";
import { getProject, projects } from "@/content/projects";

export const alt = "Realizacja — bartekstrony.pl";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return renderOg({ eyebrow: "Realizacje", title: "Realizacje" });
  return renderOg({
    eyebrow: "Realizacja",
    title: p.title,
    footer: p.category,
    swatches: p.palette,
  });
}
