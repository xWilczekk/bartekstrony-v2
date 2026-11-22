import { ImageResponse } from "next/og";
import { BrandMark } from "@/components/site/brand-mark";

const SIZES = [32, 48, 96, 192, 512] as const;

export function generateImageMetadata() {
  return SIZES.map((s) => ({
    id: String(s),
    size: { width: s, height: s },
    contentType: "image/png",
  }));
}

export default async function Icon({ id }: { id: Promise<string | number> }) {
  const size = Number(await id) || 32;
  const tab = size <= 96;
  return new ImageResponse(
    <BrandMark size={size} rounded={tab} glyphScale={tab ? 1 : 0.78} />,
    { width: size, height: size },
  );
}
