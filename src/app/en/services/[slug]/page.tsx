import type { Metadata } from "next";
import { ServicePage, serviceMeta } from "@/components/pages/service-page";
import { services } from "@/content/services";
import { enServiceSlug, plServiceSlug } from "@/i18n/config";
import { setLocale } from "@/i18n/server";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: enServiceSlug(s.slug) }));
}

export async function generateMetadata({ params }: PageProps<"/en/services/[slug]">): Promise<Metadata> {
  return serviceMeta(plServiceSlug((await params).slug), "en");
}

export default async function Page({ params }: PageProps<"/en/services/[slug]">) {
  setLocale("en");
  return <ServicePage slug={plServiceSlug((await params).slug)} />;
}
