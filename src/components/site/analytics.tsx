"use client";

import dynamic from "next/dynamic";
import Script from "next/script";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { site } from "@/content/site";
import { track } from "@/lib/analytics";
import {
  CONSENT_ENABLED,
  CONSENT_EVENT,
  CONSENT_OPEN_EVENT,
  GA_ID,
  parseConsent,
  rawConsent,
  readConsent,
  subscribeConsent,
  type Consent,
} from "@/lib/consent";

const CookieReceipt = dynamic(() => import("./cookie-receipt"), { ssr: false });

const HOST = new URL(site.url).hostname;
const PROD_HOSTS = [HOST, `www.${HOST}`];
const noop = () => () => {};
const INPUTS = ["scroll", "pointerdown", "keydown", "touchstart", "wheel"] as const;
const isProdHost = () => PROD_HOSTS.includes(location.hostname);

const GA_INIT = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'granted'});
gtag('js',new Date());gtag('config','${GA_ID}',{allow_google_signals:false,allow_ad_personalization_signals:false});`;

function revokeGa() {
  (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = true;
  (window as { gtag?: (...a: unknown[]) => void }).gtag?.("consent", "update", { analytics_storage: "denied" });
  for (const c of document.cookie.split(";")) {
    const name = c.split("=")[0].trim();
    if (!/^_ga(_|$)/.test(name)) continue;
    for (const domain of ["", `; domain=.${HOST}`, `; domain=${location.hostname}`]) {
      document.cookie = `${name}=; max-age=0; path=/${domain}`;
    }
  }
}

export function Analytics() {
  const raw = useSyncExternalStore(subscribeConsent, rawConsent, () => "");
  const consent = useMemo(() => parseConsent(raw), [raw]);
  const prodHost = useSyncExternalStore(noop, isProdHost, () => false);
  const [receipt, setReceipt] = useState<"first" | "again" | null>(null);

  useEffect(() => {
    if (!CONSENT_ENABLED) return;
    let t = 0;
    const show = () => {
      INPUTS.forEach((ev) => window.removeEventListener(ev, show));
      window.clearTimeout(t);
      t = window.setTimeout(() => setReceipt((r) => r ?? "first"), 500);
    };
    if (!readConsent()) {
      INPUTS.forEach((ev) => window.addEventListener(ev, show, { passive: true, once: true }));
      t = window.setTimeout(show, 12_000);
    }
    const onChoice = (e: Event) => {
      if (!(e as CustomEvent<Consent>).detail.analytics && GA_ID) revokeGa();
    };
    const onOpen = () => setReceipt("again");
    window.addEventListener(CONSENT_EVENT, onChoice);
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => {
      window.clearTimeout(t);
      INPUTS.forEach((ev) => window.removeEventListener(ev, show));
      window.removeEventListener(CONSENT_EVENT, onChoice);
      window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
    };
  }, []);

  const granted = Boolean(consent?.analytics);
  useEffect(() => {
    if (!granted) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      const href = a?.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) track("telefon", { strona: location.pathname });
      else if (href.startsWith("mailto:")) track("email", { strona: location.pathname });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [granted]);

  return (
    <>
      {GA_ID && prodHost && granted && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
          <Script id="ga-init" strategy="lazyOnload">
            {GA_INIT}
          </Script>
        </>
      )}
      {receipt && <CookieReceipt key={receipt} current={receipt === "again" ? consent : null} onDone={() => setReceipt(null)} />}
    </>
  );
}
