import { renderOg } from "@/components/seo/og";
import { formatPLN, getService, services } from "@/content/services";

export const alt = "Oferta bartekstrony.pl";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return renderOg({ eyebrow: "Oferta", title: "Oferta" });
  return renderOg({
    eyebrow: `Oferta · ${s.name}`,
    title: `${s.h1.a} ${s.h1.accent}${s.h1.b ?? ""}`,
    accent: s.h1.accent,
    footer: s.priceFrom ? `od ${formatPLN(s.priceFrom)} · ${s.timeline} · wycena w 24h` : "Wycena indywidualna · bartekstrony.pl",
  });
}
