import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { nbsp } from "./text";

export function Section({
  tone = "paper",
  children,
  className,
  id,
}: {
  tone?: "paper" | "paper-2" | "ink";
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(tone === "paper-2" && "bg-paper-2", tone === "ink" && "theme-ink")}
    >
      <div className={cn("container-x py-20 md:py-28", className)}>{children}</div>
    </section>
  );
}

export function FactStrip({ facts, className }: { facts: { label: string; value: ReactNode }[]; className?: string }) {
  return (
    <dl className={cn("grid grid-cols-2 border-t hairline", className)}>
      {facts.map((f, i) => (
        <div
          key={f.label}
          className={cn("border-b hairline py-4", i % 2 === 0 ? "pr-4" : "border-l pl-4")}
        >
          <dt className="label-mono text-mute">{f.label}</dt>
          <dd className="mt-2 font-display text-2xl font-semibold tracking-tight md:text-3xl">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function EditorialList({
  items,
  start = 1,
  className,
  showMeta,
}: {
  items: { title: string; text: string; meta?: string }[];
  start?: number;
  className?: string;
  showMeta?: boolean;
}) {
  return (
    <ol className={cn("border-t hairline", className)}>
      {items.map((it, i) => (
        <li key={it.title}>
          <div className="grid gap-x-8 gap-y-3 border-b hairline py-7 md:grid-cols-12 md:py-9">
            <span className="label-mono text-mute md:col-span-1">{String(start + i).padStart(2, "0")}</span>
            <h3 className="font-display text-2xl leading-[1.05] font-semibold tracking-tight text-balance md:col-span-4 md:text-3xl">
              {nbsp(it.title)}
            </h3>
            <p
              className={cn(
                "max-w-xl leading-relaxed text-pretty text-ink/75 md:col-start-6 md:text-[1.05rem]",
                showMeta ? "md:col-span-5" : "md:col-span-6",
              )}
            >
              {nbsp(it.text)}
            </p>
            {showMeta && it.meta && (
              <span className="label-mono text-signal md:col-span-1 md:col-start-12 md:text-right">{it.meta}</span>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function LinkList({
  items,
  className,
  compact,
}: {
  items: { href: string; label: string; hint?: string; tag?: string }[];
  className?: string;
  compact?: boolean;
}) {
  return (
    <ul className={cn("border-t hairline", className)}>
      {items.map((it) => (
        <li key={it.href}>
          <Link
            href={it.href}
            className={cn(
              "group/btn flex items-baseline gap-4 border-b hairline transition-colors duration-300 hover:text-signal",
              compact ? "py-4" : "py-5",
            )}
          >
            <span
              className={cn(
                "font-display font-semibold tracking-tight text-balance",
                compact ? "text-lg leading-snug md:text-xl" : "text-xl md:text-2xl",
              )}
            >
              {it.label}
            </span>
            <span className="hidden min-w-0 flex-1 truncate text-sm text-mute sm:block">{it.hint}</span>
            {it.tag && <span className="label-mono text-mute">{it.tag}</span>}
            <Arrow className="ml-auto shrink-0 self-center sm:ml-0" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

type LinkItem = { href: string; label: string; hint?: string; tag?: string };

export function RelatedGrid({
  groups,
  className,
}: {
  groups: { title: string; items: LinkItem[] }[];
  className?: string;
}) {
  const visible = groups.filter((g) => g.items.length > 0);
  return (
    <div
      className={cn(
        "grid items-start gap-x-10 gap-y-12 md:grid-cols-2",
        visible.length === 3 && "lg:grid-cols-3",
        visible.length >= 4 && "lg:grid-cols-4",
        className,
      )}
    >
      {visible.map((g) => (
        <div key={g.title}>
          <h3 className="label-mono mb-4 text-mute">{g.title}</h3>
          <LinkList items={g.items} compact />
        </div>
      ))}
    </div>
  );
}
