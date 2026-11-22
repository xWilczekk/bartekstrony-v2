"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale } from "@/i18n/client";

export function useShareLink() {
  const en = useLocale() === "en";
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef(0);

  const show = useCallback((msg: string, ms = 3200) => {
    window.clearTimeout(timer.current);
    setToast(msg);
    timer.current = window.setTimeout(() => setToast(null), ms);
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const share = useCallback(
    async (path: string, name: string) => {
      const url = new URL(path, window.location.origin).toString();
      const title = en ? `Website preview: ${name}` : `Podgląd strony: ${name}`;
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      if (coarse && typeof navigator.share === "function") {
        try {
          await navigator.share({ title, text: en ? `See what the ${name} website could look like:` : `Zobacz, jak może wyglądać strona ${name}:`, url });
          return;
        } catch (err) {
          if (err instanceof DOMException && err.name === "AbortError") return;
        }
      }
      try {
        await navigator.clipboard.writeText(url);
        show(en ? "Link copied. Send it to your partner or save it for later." : "Link skopiowany. Wyślij go wspólnikowi albo zapisz na później.");
      } catch {
        show(en ? `Copy the link: ${url}` : `Skopiuj link: ${url}`, 8000);
      }
    },
    [show, en],
  );

  return { share, toast };
}

export function Toast({ message }: { message: string | null }) {
  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-5 z-[70] flex justify-center px-4">
      {message && (
        <p className="sg-toast pointer-events-auto max-w-[min(32rem,100%)] rounded-full bg-ink px-5 py-3 text-center text-[0.92rem] text-paper shadow-[0_20px_40px_-20px_rgb(0_0_0/0.5)] [overflow-wrap:anywhere]">
          {message}
        </p>
      )}
    </div>
  );
}
