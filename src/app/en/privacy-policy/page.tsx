import { setLocale } from "@/i18n/server";
import { PrivacyPage, privacyMeta } from "@/components/pages/privacy-page";

export const metadata = privacyMeta.en;

export default function Page() {
  setLocale("en");
  return <PrivacyPage />;
}
