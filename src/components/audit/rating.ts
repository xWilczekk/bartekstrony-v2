import type { Locale } from "@/i18n/config";

export type Rating = "good" | "needs-work" | "poor";

export const RATING_LABEL: Record<Locale, Record<Rating, string>> = {
  pl: { good: "Dobrze", "needs-work": "Do poprawy", poor: "Słabo" },
  en: { good: "Good", "needs-work": "Needs work", poor: "Poor" },
};

export function rateScore(score: number | null): Rating | null {
  if (score === null) return null;
  if (score >= 90) return "good";
  if (score >= 50) return "needs-work";
  return "poor";
}
