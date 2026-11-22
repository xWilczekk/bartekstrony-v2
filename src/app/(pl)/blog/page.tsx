import { CtaBand } from "@/components/ui/cta-band";
import { JsonLd } from "@/components/ui/json-ld";
import { Section } from "@/components/seo/blocks";
import { H1Parts, PageHero } from "@/components/seo/page-hero";
import { PostList } from "@/components/seo/post-list";
import { itemListSchema } from "@/components/seo/schema";
import { posts } from "@/content/blog/posts";
import { breadcrumbs, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Blog: strony internetowe, Google, klienci",
  description:
    "Poradniki dla właścicieli firm: ile kosztuje strona, Facebook czy strona, sklep czy Allegro, SEO lokalne, szybkość strony, checklista dla restauracji.",
  path: "/blog",
});

const crumbs = [
  { name: "Start", path: "/" },
  { name: "Blog", path: "/blog" },
];

export default function BlogPage() {
  return (
    <>
      <JsonLd data={breadcrumbs(crumbs)} />
      <JsonLd
        data={itemListSchema(
          "Blog bartekstrony.pl",
          posts.map((p) => ({ name: p.title, path: `/blog/${p.slug}` })),
        )}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow="Blog"
        title={<H1Parts a="Poradniki o stronach, Google i" accent="klientach" />}
        lead={
          <p>
            Piszę o tym, o co pytają mnie właściciele firm: ile to kosztuje, czy to się opłaca i jak sprawić, żeby klient
            znalazł właśnie Ciebie. Z własnego doświadczenia, bez straszenia i bez wymyślonych statystyk.
          </p>
        }
      />

      <Section className="pt-0 md:pt-0">
        <PostList posts={posts} featuredFirst />
      </Section>

      <CtaBand source="blog" />
    </>
  );
}
