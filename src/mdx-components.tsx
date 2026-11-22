import Link from "next/link";
import { isValidElement, type ReactNode } from "react";
import type { MDXComponents } from "mdx/types";
import { Callout, Checklist, Cta, SeeAlso } from "@/components/seo/mdx";
import { slugify } from "@/components/seo/text";

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return "";
}

const components: MDXComponents = {
  h2: ({ children }) => {
    const id = slugify(textOf(children));
    return (
      <h2
        id={id}
        className="mt-20 mb-6 scroll-mt-24 font-display text-[2rem] leading-[1.02] font-semibold tracking-tight text-balance [counter-increment:sec] before:mb-4 before:block before:border-t before:border-ink/15 before:pt-4 before:font-mono before:text-[0.72rem] before:font-normal before:tracking-[0.08em] before:text-signal before:content-[counter(sec,decimal-leading-zero)] md:text-[2.6rem]"
      >
        {children}
      </h2>
    );
  },
  h3: ({ children }) => (
    <h3 className="mt-12 mb-3 font-display text-2xl leading-tight font-semibold tracking-tight text-balance md:text-[1.75rem]">
      {children}
    </h3>
  ),
  p: ({ children }) => <p className="my-6 text-[1.1875rem] leading-[1.75] text-pretty">{children}</p>,
  a: ({ href = "#", children }) => {
    const cls =
      "font-medium underline decoration-signal decoration-2 underline-offset-4 transition-colors hover:text-signal";
    if (href.startsWith("/") || href.startsWith("#")) {
      return (
        <Link href={href} className={cls}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  },
  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  ul: ({ children }) => (
    <ul className="my-6 space-y-3 text-[1.1875rem] leading-[1.7] [&>li]:relative [&>li]:pl-7 [&>li]:before:absolute [&>li]:before:top-[0.85em] [&>li]:before:left-0 [&>li]:before:h-px [&>li]:before:w-4 [&>li]:before:bg-signal [&>li]:before:content-['']">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-6 space-y-3 text-[1.1875rem] leading-[1.7] [counter-reset:n] [&>li]:relative [&>li]:pl-10 [&>li]:[counter-increment:n] [&>li]:before:absolute [&>li]:before:top-[0.35em] [&>li]:before:left-0 [&>li]:before:font-mono [&>li]:before:text-sm [&>li]:before:text-signal [&>li]:before:content-[counter(n,decimal-leading-zero)]">
      {children}
    </ol>
  ),
  li: ({ children }) => <li>{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-14 border-l-2 border-signal pl-6 font-serif-accent text-[2rem] leading-[1.15] text-balance md:-ml-10 md:pl-10 md:text-[2.6rem] [&_p]:m-0 [&_p]:[font-size:inherit] [&_p]:[line-height:inherit]">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-14 border-0 border-t border-ink/15" />,
  code: ({ children }) => (
    <code className="rounded bg-paper-2 px-1.5 py-0.5 font-mono text-[0.9em]">{children}</code>
  ),
  table: ({ children }) => (
    <div className="my-10 overflow-x-auto rounded-[var(--radius)] border border-ink/10">
      <table className="w-full min-w-[34rem] border-collapse text-left text-[1rem]">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-paper-2">{children}</thead>,
  th: ({ children }) => (
    <th className="px-4 py-3 font-mono text-[0.72rem] font-normal tracking-[0.08em] text-mute uppercase">
      {children}
    </th>
  ),
  td: ({ children }) => <td className="border-t border-ink/10 px-4 py-3 align-top">{children}</td>,
  Callout,
  Cta,
  Checklist,
  SeeAlso,
};

export function useMDXComponents(): MDXComponents {
  return components;
}

