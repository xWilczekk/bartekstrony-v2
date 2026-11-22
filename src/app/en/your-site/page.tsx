import type { Metadata } from "next";
import { setLocale } from "@/i18n/server";
import { pageMeta } from "@/lib/seo";
import { FullPreview } from "@/components/signature/full-preview";
import { displayName, parsePreviewParams } from "@/components/signature/preview-model";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const state = parsePreviewParams(await searchParams);
  const name = displayName(state);
  return pageMeta({
    title: `Website preview: ${name}`,
    description: `See a website concept for ${name}, assembled live by bartekstrony.pl. Like it? A quote for the real thing within 24 hours.`,
    path: "/en/your-site",
    noindex: true,
  });
}

export default async function YourSitePage({ searchParams }: Props) {
  setLocale("en");
  const initial = parsePreviewParams(await searchParams);
  return <FullPreview key={`${initial.industry}|${initial.vibe}|${initial.name}|${initial.city}`} initial={initial} />;
}
