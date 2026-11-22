export type AnalyticsEvent =
  | "zapytanie-wyslane"
  | "telefon"
  | "email"
  | "audyt-start"
  | "wycena-wynik";

export const gaEventName = (e: AnalyticsEvent) => e.replaceAll("-", "_");

type Gtag = (command: "event", name: string, params?: Record<string, string | number>) => void;

export function track(event: AnalyticsEvent, data?: Record<string, string | number | undefined>) {
  const gtag = (globalThis as { gtag?: Gtag }).gtag;
  if (!gtag) return;
  const clean = data && Object.fromEntries(Object.entries(data).filter(([, v]) => v !== undefined && v !== "")) as Record<string, string | number>;
  try {
    gtag("event", gaEventName(event), clean);
  } catch {
  }
}
