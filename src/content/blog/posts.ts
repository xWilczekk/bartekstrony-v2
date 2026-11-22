import type { ComponentType } from "react";
import * as ileKosztuje from "./ile-kosztuje-strona-internetowa.mdx";
import * as facebook from "./strona-internetowa-czy-facebook.mdx";
import * as sklep from "./wlasny-sklep-czy-allegro.mdx";
import * as google from "./klienci-z-google-w-swoim-miescie.mdx";
import * as wolna from "./wolna-strona-kosztuje-klientow.mdx";
import * as restauracja from "./strona-restauracji-checklista.mdx";
import * as ai from "./firma-w-odpowiedziach-ai.mdx";

export type PostMeta = (typeof ileKosztuje)["metadata"];

export type Post = PostMeta & {
  slug: string;
  Content: ComponentType;
};

const make = (slug: string, mod: { default: ComponentType; metadata: PostMeta }): Post => ({
  slug,
  Content: mod.default,
  ...mod.metadata,
});

export const posts: Post[] = [
  make("ile-kosztuje-strona-internetowa", ileKosztuje),
  make("strona-internetowa-czy-facebook", facebook),
  make("wlasny-sklep-czy-allegro", sklep),
  make("klienci-z-google-w-swoim-miescie", google),
  make("wolna-strona-kosztuje-klientow", wolna),
  make("strona-restauracji-checklista", restauracja),
  make("firma-w-odpowiedziach-ai", ai),
].sort((a, b) => (a.date < b.date ? 1 : -1));

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export function relatedPosts(slug: string, count = 3): Post[] {
  const current = getPost(slug);
  const others = posts.filter((p) => p.slug !== slug);
  if (!current) return others.slice(0, count);
  const score = (p: Post) => p.tags.filter((t) => current.tags.includes(t)).length;
  return [...others].sort((a, b) => score(b) - score(a)).slice(0, count);
}
