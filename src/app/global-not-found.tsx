import type { Metadata } from "next";
import { site } from "@/content/site";
import { NotFoundView, notFoundMeta } from "@/components/site/not-found-view";
import { RootDocument } from "@/components/site/root-document";

export const metadata: Metadata = { metadataBase: new URL(site.url), ...notFoundMeta.pl };

export default function GlobalNotFound() {
  return (
    <RootDocument locale="pl">
      <NotFoundView />
    </RootDocument>
  );
}
