import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[280px] rounded-[2.4rem] bg-ink p-2.5 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.45)]",
        className,
      )}
    >
      <div className="relative aspect-[9/19] overflow-hidden rounded-[1.9rem] bg-paper-2">{children}</div>
      <span aria-hidden className="absolute top-[1.1rem] left-1/2 h-1.5 w-14 -translate-x-1/2 rounded-full bg-ink/90" />
    </div>
  );
}
