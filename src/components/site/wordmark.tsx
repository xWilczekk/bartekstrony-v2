import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline font-display text-[1.4rem] leading-none tracking-[-0.045em]",
        className,
      )}
    >
      <span className="font-[430]">bartek</span>
      <span className="font-[780]">strony</span>
      <span
        aria-hidden
        className="ml-[0.07em] inline-block size-[0.21em] bg-signal transition-transform duration-500 ease-[var(--ease-out)] group-hover/wm:rotate-45"
      />
      <span
        aria-hidden
        className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-500 ease-[var(--ease-out)] group-hover/wm:grid-cols-[1fr]"
      >
        <span className="overflow-hidden">
          <span className="block pl-[0.05em] font-[430] text-mute">pl</span>
        </span>
      </span>
    </span>
  );
}

export function LogoLink({ className, onClick, locale = "pl" }: { className?: string; onClick?: () => void; locale?: Locale }) {
  return (
    <Link
      href={locale === "en" ? "/en" : "/"}
      onClick={onClick}
      aria-label={locale === "en" ? "bartekstrony.pl — home" : "bartekstrony.pl — strona główna"}
      data-logo=""
      className={cn("group/wm inline-flex h-11 shrink-0 items-center rounded-sm", className)}
    >
      <Wordmark />
    </Link>
  );
}
