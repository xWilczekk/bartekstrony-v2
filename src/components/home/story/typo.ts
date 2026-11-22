const ORPHAN = /(^|[\s(„ ])([aiouwzAIOUWZ])\s+/g;

export function nbsp(text: string) {
  return text.replace(ORPHAN, "$1$2 ").replace(ORPHAN, "$1$2 ");
}

export const nn = (i: number) => String(i + 1).padStart(2, "0");
