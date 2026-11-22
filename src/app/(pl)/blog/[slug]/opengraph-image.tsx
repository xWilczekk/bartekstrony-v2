import { renderOg } from "@/components/seo/og";
import { getPost, posts } from "@/content/blog/posts";

export const alt = "Blog — bartekstrony.pl";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return renderOg({ eyebrow: "Blog", title: "Blog" });
  return renderOg({
    eyebrow: "Blog",
    title: post.title,
    footer: `Bartek · ${post.readingTime} czytania`,
  });
}
