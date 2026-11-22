import { ImageResponse } from "next/og";
import { BrandMark } from "@/components/site/brand-mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(<BrandMark size={180} rounded={false} glyphScale={0.86} />, { ...size });
}
