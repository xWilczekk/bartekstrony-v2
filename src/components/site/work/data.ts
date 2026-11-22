import type { Project } from "@/content/projects";
import type { Locale } from "@/i18n/config";

export type StageProject = {
  slug: string;
  title: string;
  client: string;
  city?: string;
  num: string;
  kind: "fullpage" | "viewport";
  src: string;
  width: number;
  height: number;
  alt: string;
  swatch: string;
};

export const pad = (n: number) => String(n).padStart(2, "0");

export function shotAlt(p: Project, locale: Locale = "pl") {
  if (locale === "en")
    return p.shot.kind === "fullpage"
      ? `The whole ${p.client} website (${p.category}) — from header to footer`
      : `${p.client} homepage (${p.category})`;
  return p.shot.kind === "fullpage"
    ? `Cała strona internetowa ${p.client} (${p.category}) — od nagłówka po stopkę`
    : `Strona główna ${p.client} (${p.category})`;
}

export function toStageProject(p: Project, index: number, locale: Locale = "pl"): StageProject {
  return {
    slug: p.slug,
    title: p.title,
    client: p.client,
    city: p.city,
    num: pad(index + 1),
    kind: p.shot.kind,
    src: p.shot.src,
    width: p.shot.width,
    height: p.shot.height,
    alt: shotAlt(p, locale),
    swatch: p.palette[0],
  };
}
