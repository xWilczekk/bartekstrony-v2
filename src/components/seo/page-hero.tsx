import Link from "next/link";
import type { ReactNode } from "react";
import { Accent } from "@/components/ui/section-head";
import { cn } from "@/lib/utils";
import { getLocale } from "@/i18n/server";
import { nbsp } from "./text";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label={getLocale() === "en" ? "Breadcrumbs" : "Ścieżka nawigacji"} className={className}>
      <ol className="label-mono flex flex-wrap items-center gap-x-2 gap-y-1 text-mute">
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={it.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-ink">
                  {it.name}
                </span>
              ) : (
                <>
                  <Link href={it.path} className="underline-offset-4 hover:text-ink hover:underline">
                    {it.name}
                  </Link>
                  <span aria-hidden>/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function H1Parts({ a, accent, b }: { a: string; accent: string; b?: string }) {
  return (
    <>
      {nbsp(a)} <Accent>{nbsp(accent)}</Accent>
      {b ? nbsp(b) : null}
    </>
  );
}

export function PageHero({
  crumbs,
  eyebrow,
  title,
  lead,
  aside,
  size = "huge",
  className,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  aside?: ReactNode;
  size?: "huge" | "giant";
  className?: string;
}) {
  return (
    <section className={cn("container-x pt-[calc(var(--header-h)+2rem)] pb-14 md:pb-20", className)}>
      <Breadcrumbs items={crumbs} />
      <p className="label-mono mt-14 flex gap-3 text-mute md:mt-20">
        <span className="text-signal" aria-hidden>
          ●
        </span>
        <span>{eyebrow}</span>
      </p>
      <h1
        className={cn(
          "mt-5 max-w-[19ch] font-display font-semibold text-balance",
          size === "giant" ? "text-[length:var(--text-giant)]" : "text-[length:var(--text-huge)]",
          size === "huge" && "max-w-[22ch]",
        )}
      >
        {title}
      </h1>
      {(lead || aside) && (
        <div className="mt-10 grid gap-10 border-t hairline pt-8 md:grid-cols-12 md:mt-14">
          {lead && (
            <div className="max-w-2xl text-lg leading-relaxed text-pretty text-ink/80 md:col-span-7 md:text-xl">
              {lead}
            </div>
          )}
          {aside && <div className="md:col-span-5 md:col-start-8">{aside}</div>}
        </div>
      )}
    </section>
  );
}
