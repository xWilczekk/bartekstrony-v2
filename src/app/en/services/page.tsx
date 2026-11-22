import { setLocale } from "@/i18n/server";
import { ServicesPage, servicesMeta } from "@/components/pages/services-page";

export const metadata = servicesMeta.en;

export default function Page() {
  setLocale("en");
  return <ServicesPage />;
}
