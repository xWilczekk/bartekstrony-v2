import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — strony internetowe i sklepy`,
    short_name: site.name,
    description: site.description,
    lang: "pl-PL",
    start_url: "/",
    scope: "/",
    display: "browser",
    background_color: "#fafaf7",
    theme_color: "#fafaf7",
    icons: [
      { src: "/icon/192", sizes: "192x192", type: "image/png" },
      { src: "/icon/512", sizes: "512x512", type: "image/png" },
      { src: "/icon/512", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
