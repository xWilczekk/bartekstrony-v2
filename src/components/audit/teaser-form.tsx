"use client";

import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { localizeHref } from "@/i18n/config";
import { useLocale } from "@/i18n/client";
import { normalizeUrl } from "./url";

export function TeaserForm() {
  const router = useRouter();
  const locale = useLocale();
  const en = locale === "en";
  const id = useId();
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const check = normalizeUrl(value, locale);
    if (!check.ok) {
      setError(check.reason);
      return;
    }
    router.push(localizeHref(`/audyt?url=${encodeURIComponent(check.display)}`, locale));
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <label htmlFor={id} className="label-mono text-mute">
        {en ? "Your website address" : "Adres Twojej strony"}
      </label>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <input
          id={id}
          type="text"
          inputMode="url"
          autoComplete="url"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          placeholder={en ? "yourcompany.com" : "twojafirma.pl"}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError(null);
          }}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-err` : undefined}
          className="h-14 w-full min-w-0 rounded-full border border-current/25 bg-transparent px-6 text-lg placeholder:text-current/35 focus:border-current focus:outline-none focus-visible:border-signal"
        />
        <Button type="submit" variant="signal" size="lg" arrow className="shrink-0">
          {en ? "Check for free" : "Sprawdź za darmo"}
        </Button>
      </div>
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-3 flex items-center gap-2 text-sm">
          <i aria-hidden className="size-2 rounded-full bg-signal" />
          {error}
        </p>
      )}
    </form>
  );
}
