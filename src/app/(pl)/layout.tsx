import type { Metadata, Viewport } from "next";
import { defaultOgImage } from "@/lib/seo";
import { site } from "@/content/site";
import { RootDocument } from "@/components/site/root-document";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Strony internetowe i sklepy, które przynoszą klientów | bartekstrony.pl",
    template: "%s | bartekstrony.pl",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.fullName, url: new URL(site.aboutPath, site.url).toString() }],
  creator: site.fullName,
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    url: site.url,
    title: "Strony internetowe i sklepy, które przynoszą klientów",
    description: site.description,
    images: [defaultOgImage("pl")],
  },
  twitter: { card: "summary_large_image", images: [defaultOgImage("pl")] },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#fafaf7",
  colorScheme: "light",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <RootDocument locale="pl">{children}</RootDocument>;
}
