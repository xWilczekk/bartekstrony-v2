import { setLocale } from "@/i18n/server";
import { WorkPage, workMeta } from "@/components/pages/work-page";

export const metadata = workMeta.en;

export default function Page() {
  setLocale("en");
  return <WorkPage />;
}
