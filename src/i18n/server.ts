import { cache } from "react";
import { DEFAULT_LOCALE, type Locale } from "./config";

const store = cache(() => ({ locale: DEFAULT_LOCALE as Locale }));

export function setLocale(locale: Locale) {
  store().locale = locale;
}

export function getLocale(): Locale {
  return store().locale;
}
