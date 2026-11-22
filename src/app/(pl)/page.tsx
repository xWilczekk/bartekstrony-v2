import { Hero } from "@/components/signature/hero";
import { PreviewSection } from "@/components/signature/preview-section";
import { WorkShowcase } from "@/components/home/work-showcase";
import { PricingSection } from "@/components/pricing/pricing-section";
import { AuditTeaser } from "@/components/audit/audit-teaser";
import { About } from "@/components/home/about";
import { Faq } from "@/components/home/faq";

export default function HomePage() {
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
