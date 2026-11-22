import type { MetadataRoute } from "next";
import { sitemapEntries } from "@/lib/sitemap";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapEntries()
    .filter((e) => !e.noindex)
    .map(({ url, lastModified, changeFrequency, priority, languages }) => ({
      url,
      lastModified,
      changeFrequency,
      priority,
      ...(languages ? { alternates: { languages } } : {}),
    }));
}
