const DIACRITICS: Record<string, string> = {
  ą: "a",
  ć: "c",
  ę: "e",
  ł: "l",
  ń: "n",
  ó: "o",
  ś: "s",
  ź: "z",
  ż: "z",
};

export function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[ąćęłńóśźż]/g, (c) => DIACRITICS[c] ?? c)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function nbsp(text: string) {
  return text
    .replace(/(^|[\s(„"])([wzioauWZIOAU]) (?=\S)/g, "$1$2\u00A0")
    .replace(/(\d) (zł|dni|dzień|h)(?!\p{L})/gu, "$1\u00A0$2");
}

const MONTHS = [
  "stycznia",
  "lutego",
  "marca",
  "kwietnia",
  "maja",
  "czerwca",
  "lipca",
  "sierpnia",
  "września",
  "października",
  "listopada",
  "grudnia",
];

export function formatDatePL(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

export function clip(text: string, max = 158) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:\s—-]+$/, "") + "…";
}
