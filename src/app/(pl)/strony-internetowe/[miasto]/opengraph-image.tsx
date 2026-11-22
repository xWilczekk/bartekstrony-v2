import { renderOg } from "@/components/seo/og";
import { cities, getCity } from "@/content/cities";

export const alt = "Strony internetowe w Twoim mieście — bartekstrony.pl";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return cities.map((c) => ({ miasto: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ miasto: string }> }) {
  const { miasto } = await params;
  const c = getCity(miasto);
  if (!c) return renderOg({ eyebrow: "Strony internetowe", title: "Strony internetowe" });
  return renderOg({
    eyebrow: `Strony internetowe · ${c.name}`,
    title: `Strony internetowe ${c.inName}`,
    accent: c.inName,
    footer: "od 500 zł · wycena w 24h · zdalnie i na miejscu",
  });
}
