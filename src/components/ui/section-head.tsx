import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHead({
  index,
  eyebrow,
  title,
  lead,
  className,
  align = "stack",
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
  align?: "split" | "stack" | "center";
}) {
  const center = align === "center";
  return (
    <header
      className={cn(
        "grid gap-6 border-t hairline pt-5",
        align === "split" && "md:grid-cols-12",
        center && "justify-items-center pt-10 text-center md:pt-14",
        className,
      )}
    >
      <p className={cn("label-mono flex gap-3 text-mute", align === "split" && "md:col-span-3")}>
        {index && <span className="text-signal">({index})</span>}
        <span>{eyebrow}</span>
      </p>
      <div className={cn(align === "split" && "md:col-span-9")}>
        <h2 className="font-display text-[length:var(--text-huge)] font-semibold text-balance">{title}</h2>
        {lead && (
          <p className={cn("mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-mute", center && "mx-auto")}>{lead}</p>
        )}
      </div>
    </header>
  );
}

export function Accent({ children, className }: { children: ReactNode; className?: string }) {
  return <em className={cn("font-serif-accent text-signal-display", className)}>{children}</em>;
}
