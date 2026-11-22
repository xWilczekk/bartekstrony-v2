"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/i18n/client";
import { cn } from "@/lib/utils";

export function CopyEmail({ email, className }: { email: string; className?: string }) {
  const en = useLocale() === "en";
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      window.location.href = `mailto:${email}`;
      return;
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2600);
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className={cn(
          "label-mono inline-flex h-10 items-center gap-2 rounded-full border hairline px-4 transition-colors duration-300 hover:border-current noscript:hidden",
          className,
        )}
      >
        <svg aria-hidden viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
          {copied ? <path d="m3 8.5 3 3 7-7" /> : <path d="M5.5 5.5V3h7.5v7.5h-2.5M3 5.5h7.5V13H3z" />}
        </svg>
        <span>{copied ? (en ? "Copied" : "Skopiowano") : en ? "Copy" : "Kopiuj"}</span>
        <span className="sr-only">{en ? " e-mail address" : " adres e-mail"}</span>
      </button>

      <span role="status" className="sr-only">
        {copied ? (en ? `Copied ${email}` : `Skopiowano adres ${email}`) : ""}
      </span>

      <div
        aria-hidden
        className={cn(
          "pointer-events-none fixed inset-x-0 bottom-5 z-[70] flex justify-center px-4 transition-[opacity,translate] duration-500 ease-[var(--ease-out)]",
          copied ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
        )}
      >
        <p className="flex items-center gap-3 rounded-full bg-paper px-5 py-3 text-sm text-ink shadow-[0_18px_40px_-14px_rgb(0_0_0/0.55)]">
          <span className="size-2 shrink-0 rounded-full bg-signal" />
          <span>
            {en ? "Copied: " : "Skopiowane: "}
            <strong className="font-medium">{email}</strong>
            {en ? " — paste it into a new message." : " — wklej w nowej wiadomości."}
          </span>
        </p>
      </div>
    </>
  );
}
