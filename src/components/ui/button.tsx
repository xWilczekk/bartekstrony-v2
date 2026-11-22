import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "signal" | "ink" | "ghost" | "paper";
type Size = "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-tight transition-[transform,background-color,color,border-color] duration-300 ease-[var(--ease-out)] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  signal: "bg-signal text-ink hover:bg-ink hover:text-paper [.theme-ink_&]:hover:bg-paper [.theme-ink_&]:hover:text-ink",
  ink: "bg-ink text-paper hover:bg-signal",
  paper: "bg-paper text-ink hover:bg-signal hover:text-paper",
  ghost: "border border-current/25 text-current hover:border-current",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-14 px-7 text-[1.05rem]",
};

export function buttonClass(variant: Variant = "ink", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className={cn(
        "size-4 transition-transform duration-300 ease-[var(--ease-out)] group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5",
        className,
      )}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M4 12 12 4M5.5 4H12v6.5" />
    </svg>
  );
}

type LinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  arrow?: boolean;
};

export function ButtonLink({ variant = "ink", size = "md", className, children, arrow, ...props }: LinkProps) {
  return (
    <Link className={buttonClass(variant, size, className)} {...props}>
      <span className="relative">{children}</span>
      {arrow && <Arrow />}
    </Link>
  );
}

type BtnProps = ComponentProps<"button"> & { variant?: Variant; size?: Size; arrow?: boolean };

export function Button({ variant = "ink", size = "md", className, children, arrow, ...props }: BtnProps) {
  return (
    <button className={buttonClass(variant, size, className)} {...props}>
      <span className="relative">{children}</span>
      {arrow && <Arrow />}
    </button>
  );
}
