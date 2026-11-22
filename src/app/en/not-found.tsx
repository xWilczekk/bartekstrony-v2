import type { Metadata } from "next";
import { setLocale } from "@/i18n/server";
import { NotFoundView, notFoundMeta } from "@/components/site/not-found-view";

export const metadata: Metadata = notFoundMeta.en;

export default function NotFound() {
  setLocale("en");
  return <NotFoundView locale="en" />;
}
