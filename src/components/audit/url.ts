export type UrlCheck =
  | { ok: true;  url: string;  display: string }
  | { ok: false; reason: string };

const IPV4 = /^\d{1,3}(\.\d{1,3}){3}$/;

const REASONS = {
  pl: {
    empty: "Wpisz adres swojej strony, np. twojafirma.pl.",
    spaces: "Adres nie może zawierać spacji.",
    plain: "Podaj zwykły adres strony, np. twojafirma.pl.",
    invalid: "Ten adres wygląda na niepoprawny. Spróbuj tak: twojafirma.pl.",
    public: "Podaj publiczny adres strony, np. twojafirma.pl.",
  },
  en: {
    empty: "Enter your website address, e.g. yourcompany.com.",
    spaces: "The address can’t contain spaces.",
    plain: "Enter a regular website address, e.g. yourcompany.com.",
    invalid: "This address doesn’t look right. Try like this: yourcompany.com.",
    public: "Enter a public website address, e.g. yourcompany.com.",
  },
};

export function normalizeUrl(raw: string, locale: "pl" | "en" = "pl"): UrlCheck {
  const r = REASONS[locale];
  let s = raw.trim();
  if (!s) return { ok: false, reason: r.empty };
  if (/\s/.test(s)) return { ok: false, reason: r.spaces };

  s = s.replace(/^(?:https?:)?\/\//i, "");
  if (/^[a-z][a-z0-9+.-]*:(?!\d)/i.test(s)) {
    return { ok: false, reason: r.plain };
  }

  let u: URL;
  try {
    u = new URL(`https://${s}`);
  } catch {
    return { ok: false, reason: r.invalid };
  }

  const host = u.hostname.toLowerCase();
  const labels = host.split(".");
  const tld = labels[labels.length - 1] ?? "";
  const validTld = /^[a-z]{2,}$/.test(tld) || tld.startsWith("xn--");
  if (
    labels.length < 2 ||
    !validTld ||
    IPV4.test(host) ||
    host === "localhost" ||
    host.endsWith(".local") ||
    u.username ||
    u.password
  ) {
    return { ok: false, reason: r.public };
  }

  u.hash = "";
  const path = u.pathname.replace(/\/+$/, "");
  const display = `${u.host}${path}${u.search}`;
  return { ok: true, url: u.toString(), display };
}
