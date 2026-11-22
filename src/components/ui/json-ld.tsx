import type { Graph, Thing, WithContext } from "schema-dts";
import { jsonLdString } from "@/lib/seo";

export function JsonLd({ data }: { data: Thing | WithContext<Thing> | Graph }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(data) }} />;
}
