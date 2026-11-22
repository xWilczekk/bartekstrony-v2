import { Hero } from "@/components/signature/hero";
import { PreviewSection } from "@/components/signature/preview-section";
import { WorkShowcase } from "@/components/home/work-showcase";
import { PricingSection } from "@/components/pricing/pricing-section";
import { AuditTeaser } from "@/components/audit/audit-teaser";
import { About } from "@/components/home/about";
import { Faq } from "@/components/home/faq";
import { setLocale } from "@/i18n/server";
import { pageMeta } from "@/lib/seo";
import { siteEn } from "@/content/site";

export const metadata = pageMeta({
  title: "Websites and online stores that bring in customers",
  description: siteEn.description,
  path: "/en",
});

export default function HomePageEn() {
  setLocale("en");
  return (
    <>
      <Hero />
      <PreviewSection />
      <WorkShowcase />
      <PricingSection />
      <AuditTeaser />
      <About />
      <Faq />
    </>
  );
}
