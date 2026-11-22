export const CONSENT_KEY = "bs-consent";
export const CONSENT_EVENT = "bs:consent";
export const CONSENT_OPEN_EVENT = "bs:consent-open";

const MAX_AGE = 365 * 86_400_000;

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-MDNK5612M2";
export const CONSENT_ENABLED = Boolean(GA_ID) || process.env.NODE_ENV === "development";

export type Consent = { v: 1; analytics: boolean; at: string };

export function rawConsent(): string {
  try {
    return localStorage.getItem(CONSENT_KEY) ?? "";
  } catch {
    return "";
  }
}

export function parseConsent(raw: string): Consent | null {
  try {
    const c = JSON.parse(raw || "null") as Consent | null;
    if (c?.v !== 1 || Date.now() - Date.parse(c.at) > MAX_AGE) return null;
    return c;
  } catch {
    return null;
  }
}

export const readConsent = () => parseConsent(rawConsent());

export function subscribeConsent(cb: () => void) {
  window.addEventListener(CONSENT_EVENT, cb);
  return () => window.removeEventListener(CONSENT_EVENT, cb);
}

export function saveConsent(analytics: boolean) {
  const c: Consent = { v: 1, analytics, at: new Date().toISOString() };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(c));
  } catch {
  }
  window.dispatchEvent(new CustomEvent<Consent>(CONSENT_EVENT, { detail: c }));
}

export const consentPending = () => CONSENT_ENABLED && !readConsent();

export const openConsent = () => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
