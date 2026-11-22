import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { FullPreview } from "@/components/signature/full-preview";
import { displayName, parsePreviewParams } from "@/components/signature/preview-model";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const state = parsePreviewParams(await searchParams);
  const name = displayName(state);
  return pageMeta({
    title: `Podgląd strony: ${name}`,
    description: `Zobacz koncepcję strony internetowej dla ${name}, złożoną na żywo przez bartekstrony.pl. Podoba Ci się? Wycena prawdziwej wersji w 24 godziny.`,
    path: "/twoja-strona",
    noindex: true,
  });
}

export default async function TwojaStronaPage({ searchParams }: Props) {
  const initial = parsePreviewParams(await searchParams);
  return <FullPreview key={`${initial.industry}|${initial.vibe}|${initial.name}|${initial.city}`} initial={initial} />;
}
