import type { Metadata } from "next";
import { CaseStudyPage, caseStudyMeta } from "@/components/pages/case-study-page";
import { projects } from "@/content/projects";
import { setLocale } from "@/i18n/server";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/en/work/[slug]">): Promise<Metadata> {
  return caseStudyMeta((await params).slug, "en");
}

export default async function Page({ params }: PageProps<"/en/work/[slug]">) {
  setLocale("en");
  return <CaseStudyPage slug={(await params).slug} />;
}
