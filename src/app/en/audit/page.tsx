import { setLocale } from "@/i18n/server";
import { AuditPage, auditMeta } from "@/components/pages/audit-page";

export const metadata = auditMeta.en;

export default function Page() {
  setLocale("en");
  return <AuditPage />;
}
