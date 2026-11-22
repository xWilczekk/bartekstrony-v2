export const LEAD_KEYS = [
  "zrodlo",
  "firma",
  "branza",
  "miasto",
  "usluga",
  "budzet",
  "url",
  "wynik",
  "podglad",
  "opis",
  "jezyk",
] as const;
export type LeadKey = (typeof LEAD_KEYS)[number];
export type Lead = Record<LeadKey, string>;

export const emptyLead: Lead = {
  zrodlo: "",
  firma: "",
  branza: "",
  miasto: "",
  usluga: "",
  budzet: "",
  url: "",
  wynik: "",
  podglad: "",
  opis: "",
  jezyk: "",
};

const MESSAGES_EN: Record<string, string> = {
  "Za długie": "Too long",
  "Sprawdź adres e-mail": "Check the e-mail address",
  "Sprawdź numer telefonu": "Check the phone number",
  "Podaj swoje imię": "Enter your name",
  "Zaznacz zgodę, żebym mógł odpowiedzieć": "Tick the consent box so I can reply",
  "Podaj e-mail albo telefon": "Enter an e-mail or a phone number",
  "Napisz kilka słów o tym, czego potrzebujesz": "Write a few words about what you need",
};
export const messageEn = (pl: string) => MESSAGES_EN[pl] ?? pl;
