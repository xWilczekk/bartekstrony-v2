import type { Metadata } from "next";
import { CaseStudyPage, caseStudyMeta } from "@/components/pages/case-study-page";
import { projects } from "@/content/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/realizacje/[slug]">): Promise<Metadata> {
  return caseStudyMeta((await params).slug, "pl");
}

export default async function Page({ params }: PageProps<"/realizacje/[slug]">) {
  return <CaseStudyPage slug={(await params).slug} />;
}
