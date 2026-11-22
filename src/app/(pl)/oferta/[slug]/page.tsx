import type { Metadata } from "next";
import { ServicePage, serviceMeta } from "@/components/pages/service-page";
import { services } from "@/content/services";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/oferta/[slug]">): Promise<Metadata> {
  return serviceMeta((await params).slug, "pl");
}

export default async function Page({ params }: PageProps<"/oferta/[slug]">) {
  return <ServicePage slug={(await params).slug} />;
}
