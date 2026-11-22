import type { Metadata } from "next";
import { NotFoundView, notFoundMeta } from "@/components/site/not-found-view";

export const metadata: Metadata = notFoundMeta.pl;

export default function NotFound() {
  return <NotFoundView />;
}
