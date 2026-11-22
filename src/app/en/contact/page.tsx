import { setLocale } from "@/i18n/server";
import { ContactPage, contactMeta } from "@/components/pages/contact-page";

export const metadata = contactMeta.en;

export default function Page() {
  setLocale("en");
  return <ContactPage />;
}
