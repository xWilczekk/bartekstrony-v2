import { setLocale } from "@/i18n/server";
import { SitemapPage, sitemapMeta } from "@/components/pages/sitemap-page";

export const metadata = sitemapMeta.en;

export default function Page() {
  setLocale("en");
  return <SitemapPage />;
}
