import sharp from "sharp";
import { renderOg } from "@/components/seo/og";

export const dynamic = "force-static";

export function generateStaticParams() {
  return ["pl", "en"].map((locale) => ({ locale }));
}

export async function GET(_: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const image =
    locale === "en"
      ? await renderOg({
          eyebrow: "Websites and online stores",
          title: "Websites that bring in customers",
          accent: "customers",
          footer: "Białystok · Sokółka · all of Poland · quote within 24h",
          portrait: true,
        })
      : await renderOg({
          eyebrow: "Strony i sklepy internetowe",
          title: "Strony, które przynoszą klientów",
          accent: "klientów",
          footer: "Białystok · Sokółka · cała Polska · wycena w 24h",
          portrait: true,
        });
  const jpeg = await sharp(Buffer.from(await image.arrayBuffer()))
    .jpeg({ quality: 90, progressive: false, chromaSubsampling: "4:2:0" })
    .toBuffer();
  return new Response(new Uint8Array(jpeg), {
    headers: { "Content-Type": "image/jpeg", "Cache-Control": "public, max-age=86400, must-revalidate" },
  });
}
