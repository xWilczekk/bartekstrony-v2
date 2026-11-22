import { setLocale } from "@/i18n/server";
import { QuotePage, quoteMeta } from "@/components/pages/quote-page";

export const metadata = quoteMeta.en;

export default function Page() {
  setLocale("en");
  return <QuotePage />;
}
