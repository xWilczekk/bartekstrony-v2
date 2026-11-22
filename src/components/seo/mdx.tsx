import Link from "next/link";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Callout({ title, children, className }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <aside
      className={cn(
        "my-10 rounded-[var(--radius)] border border-ink/10 bg-paper-2 p-6 md:p-8 [&>p:last-child]:mb-0 [&>p]:my-3",
        className,
      )}
    >
      {title && (
        <p className="label-mono mb-4 flex items-center gap-2 text-ink">
          <span aria-hidden className="size-1.5 rounded-full bg-signal" />
          {title}
        </p>
      )}
      {children}
    </aside>
  );
}

export function Cta({
  title,
  href = "/wycena",
  label = "Wyceń moją stronę",
  children,
}: {
  title: string;
  href?: string;
  label?: string;
  children?: ReactNode;
}) {
  return (
    <aside className="theme-ink my-14 rounded-[var(--radius)] p-7 md:p-10">
      <p className="label-mono text-mute">Następny krok</p>
      <p className="mt-4 max-w-xl font-display text-3xl leading-[1.02] font-semibold tracking-tight text-balance md:text-4xl">
        {title}
      </p>
      {children && <div className="mt-4 max-w-xl text-mute [&>p]:my-2">{children}</div>}
      <div className="mt-7">
        <ButtonLink href={href} variant="signal" arrow>
          {label}
        </ButtonLink>
      </div>
    </aside>
  );
}

type CheckItem = string | { title: string; text?: string };

export function Checklist({ title, items }: { title?: string; items: CheckItem[] }) {
  return (
    <div className="my-8">
      {title && <p className="label-mono mb-3 text-mute">{title}</p>}
      <ul className="border-t hairline">
        {items.map((it) => {
          const t = typeof it === "string" ? { title: it } : it;
          return (
            <li key={t.title} className="flex gap-4 border-b hairline py-4">
              <span aria-hidden className="mt-1 size-5 shrink-0 rounded-[4px] border-[1.5px] border-ink/40" />
              <span className="leading-snug">
                <strong className="font-semibold">{t.title}</strong>
                {t.text ? <span className="text-ink/70"> — {t.text}</span> : null}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function SeeAlso({ href, children }: { href: string; children: ReactNode }) {
  return (
    <p className="my-8 border-t border-b hairline py-4">
      <span className="label-mono mr-3 text-mute">Zobacz też</span>
      <Link href={href} className="font-medium underline decoration-signal decoration-2 underline-offset-4 hover:text-signal">
        {children}
      </Link>
    </p>
  );
}
