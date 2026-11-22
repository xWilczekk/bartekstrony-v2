import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function BrowserFrame({
  url,
  children,
  className,
  dark,
}: {
  url?: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[var(--radius)] border shadow-[0_30px_80px_-30px_rgb(0_0_0/0.35)]",
        dark ? "border-white/10 bg-ink-2" : "border-ink/10 bg-paper",
        className,
      )}
    >
      <div className={cn("flex h-9 items-center gap-2 border-b px-3", dark ? "border-white/10" : "border-ink/10")}>
        <span className="flex gap-1.5" aria-hidden>
          <i className="size-2.5 rounded-full bg-current opacity-20" />
          <i className="size-2.5 rounded-full bg-current opacity-20" />
          <i className="size-2.5 rounded-full bg-current opacity-20" />
        </span>
        {url && (
          <span
            className={cn(
              "mx-auto max-w-[60%] truncate rounded-full px-3 py-0.5 font-mono text-[11px]",
              dark ? "bg-white/5 text-white/65" : "bg-ink/5 text-ink/60",
            )}
          >
            {url}
          </span>
        )}
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
