import Link from "next/link";
import { Arrow } from "@/components/ui/button";
import type { Post } from "@/content/blog/posts";
import { cn } from "@/lib/utils";
import { formatDatePL, nbsp } from "./text";

export function PostRow({ post, featured }: { post: Post; featured?: boolean }) {
  return (
    <article className="border-b hairline">
      <Link href={`/blog/${post.slug}`} className={cn("group grid gap-x-8 gap-y-4 md:grid-cols-12", featured ? "py-12 md:py-16" : "py-8 md:py-10")}>
        <div className="md:col-span-3">
          <time dateTime={post.date} className="label-mono text-mute">
            {formatDatePL(post.date)}
          </time>
          <ul className="label-mono mt-3 flex flex-wrap gap-x-3 gap-y-1 text-signal">
            {post.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-7">
          <h2
            className={cn(
              "font-display leading-[1.02] font-semibold tracking-tight text-balance transition-colors duration-300 group-hover:text-signal",
              featured ? "text-[length:var(--text-big)]" : "text-2xl md:text-3xl",
            )}
          >
            {nbsp(post.title)}
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-pretty text-ink/75 md:text-[1.05rem]">
            {nbsp(post.description)}
          </p>
        </div>
        <div className="flex items-start justify-between gap-4 md:col-span-2 md:flex-col md:items-end">
          <span className="label-mono text-mute">{post.readingTime} czytania</span>
          <Arrow className="size-6 group-hover:text-signal" />
        </div>
      </Link>
    </article>
  );
}

export function PostList({ posts, featuredFirst }: { posts: Post[]; featuredFirst?: boolean }) {
  return (
    <div className="border-t hairline">
      {posts.map((p, i) => (
        <PostRow key={p.slug} post={p} featured={featuredFirst && i === 0} />
      ))}
    </div>
  );
}
