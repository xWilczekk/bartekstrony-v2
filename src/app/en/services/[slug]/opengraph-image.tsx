import { renderOg } from "@/components/seo/og";
import { formatPrice, getServiceFor, services } from "@/content/services";
import { enServiceSlug, plServiceSlug } from "@/i18n/config";

export const alt = "Services — bartekstrony.pl";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return services.map((s) => ({ slug: enServiceSlug(s.slug) }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getServiceFor(plServiceSlug(slug), "en");
  if (!s) return renderOg({ eyebrow: "Services", title: "Services" });
  return renderOg({
    eyebrow: `Services · ${s.name}`,
    title: `${s.h1.a} ${s.h1.accent}${s.h1.b ?? ""}`,
    accent: s.h1.accent,
    footer: s.priceFrom ? `from ${formatPrice(s.priceFrom, "en")} · ${s.timeline} · quote within 24h` : "Individual quote · bartekstrony.pl",
  });
}
