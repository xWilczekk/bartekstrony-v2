import { setLocale } from "@/i18n/server";
import { PricingPage, pricingMeta } from "@/components/pages/pricing-page";

export const metadata = pricingMeta.en;

export default function Page() {
  setLocale("en");
  return <PricingPage />;
}
