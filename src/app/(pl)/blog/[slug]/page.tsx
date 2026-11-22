import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/button";
import { CtaBand } from "@/components/ui/cta-band";
import { JsonLd } from "@/components/ui/json-ld";
import { Accent, SectionHead } from "@/components/ui/section-head";
import { Section } from "@/components/seo/blocks";
import { Breadcrumbs } from "@/components/seo/page-hero";
import { PostList } from "@/components/seo/post-list";
import { articleSchema } from "@/components/seo/schema";
import { clip, formatDatePL, nbsp } from "@/components/seo/text";
import { Toc } from "@/components/seo/toc";
import { getArticleFacts } from "@/content/blog/headings";
import { getPost, posts, relatedPosts } from "@/content/blog/posts";
import { site } from "@/content/site";
import { breadcrumbs, pageMeta } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const base = pageMeta({ title: post.seoTitle ?? post.title, description: clip(post.description), path: `/blog/${post.slug}`, ogImage: false });
  return {
    ...base,
    keywords: post.tags,
    authors: [{ name: site.fullName, url: site.aboutPath }],
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [site.fullName],
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { headings, words } = await getArticleFacts(post.slug);
  const more = relatedPosts(post.slug, 3);
  const Content = post.Content;

  const crumbs = [
    { name: "Start", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbs(crumbs)} />
      <JsonLd data={articleSchema(post, words)} />

      <header className="container-x pt-[calc(var(--header-h)+2rem)] pb-12 md:pb-16">
        <Breadcrumbs items={crumbs} />
        <ul className="label-mono mt-14 flex flex-wrap gap-x-4 gap-y-1 text-signal md:mt-20">
          {post.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <h1 className="mt-5 max-w-[24ch] font-display text-[length:var(--text-huge)] font-semibold text-balance">
          {nbsp(post.title)}
        </h1>
        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-pretty text-ink/75">{nbsp(post.description)}</p>
        <p className="label-mono mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 border-t hairline pt-5 text-mute">
          <Link href={site.aboutPath} rel="author" className="text-ink underline-offset-4 hover:underline">
            {site.fullName}
          </Link>
          <span aria-hidden>/</span>
          <time dateTime={post.date}>{formatDatePL(post.date)}</time>
          {post.updated && post.updated !== post.date && (
            <span>
              zaktualizowano <time dateTime={post.updated}>{formatDatePL(post.updated)}</time>
            </span>
          )}
          <span aria-hidden>/</span>
          <span>{post.readingTime} czytania</span>
        </p>
      </header>

      <div className="container-x pb-20 md:pb-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <Toc headings={headings} />
          </aside>

          <article className="min-w-0 lg:col-span-8 lg:col-start-4 xl:col-span-7">
            <div className="max-w-[68ch] [counter-reset:sec] [&>p:first-child]:mt-0 [&>p:first-child]:text-[1.4rem] [&>p:first-child]:leading-[1.5] md:[&>p:first-child]:text-[1.55rem]">
              <Content />
            </div>

            <footer className="mt-20 max-w-[68ch] border-t hairline pt-8">
              <p className="label-mono text-mute">O autorze</p>
              <p className="mt-4 text-lg leading-relaxed">
                Cześć, jestem Bartek. Robię strony internetowe, sklepy i aplikacje dla firm z Podlasia i całej Polski.
                Jeśli ten artykuł podsunął Ci pomysł na własną stronę, <Link href="/wycena" className="font-medium underline decoration-signal decoration-2 underline-offset-4 hover:text-signal">policzę ją dla Ciebie w 24 godziny</Link>.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/oferta" variant="ink" arrow>
                  Zobacz ofertę
                </ButtonLink>
                <ButtonLink href="/audyt" variant="ghost">
                  Darmowy audyt strony
                </ButtonLink>
              </div>
            </footer>
          </article>
        </div>
      </div>

      <Section tone="paper-2">
        <SectionHead
          index="01"
          eyebrow="Czytaj dalej"
          title={
            <>
              Więcej <Accent>poradników</Accent>
            </>
          }
        />
        <div className="mt-12">
          <PostList posts={more} />
        </div>
      </Section>

      <CtaBand source="blog" />
    </>
  );
}
