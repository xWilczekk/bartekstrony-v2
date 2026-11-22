import type { Metadata, Viewport } from "next";
import { defaultOgImage } from "@/lib/seo";
import { site, siteEn } from "@/content/site";
import { setLocale } from "@/i18n/server";
import { RootDocument } from "@/components/site/root-document";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Websites and online stores that bring in customers | bartekstrony.pl",
    template: "%s | bartekstrony.pl",
  },
  description: siteEn.description,
  applicationName: site.name,
  authors: [{ name: site.fullName, url: new URL(site.aboutPath, site.url).toString() }],
  creator: site.fullName,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title: "Websites and online stores that bring in customers",
    description: siteEn.description,
    images: [defaultOgImage("en")],
  },
  twitter: { card: "summary_large_image", images: [defaultOgImage("en")] },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#fafaf7",
  colorScheme: "light",
  viewportFit: "cover",
};

export default function EnglishLayout({ children }: LayoutProps<"/en">) {
  setLocale("en");
  return <RootDocument locale="en">{children}</RootDocument>;
}
