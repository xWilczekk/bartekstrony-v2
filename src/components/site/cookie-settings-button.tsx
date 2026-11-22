"use client";

import { openConsent } from "@/lib/consent";

export function CookieSettingsButton({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <button type="button" onClick={openConsent} className={className}>
      {children}
    </button>
  );
}
