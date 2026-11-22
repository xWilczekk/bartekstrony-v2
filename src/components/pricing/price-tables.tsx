import { pricingFor, type Addon } from "@/content/pricing";
import { formatPrice } from "@/content/services";
import type { Locale } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { cn } from "@/lib/utils";

const COPY = {
  pl: {
    yes: "tak",
    no: "nie",
    extra: "dopłata",
    from: "od",
    quote: "wycena",
    caption: "Porównanie tego, co zawiera każdy pakiet",
    price: "Cena",
    time: "Czas realizacji",
    month: " / mies.",
    shop: "sklep",
    groups: ["Funkcje stron i sklepów", "Tylko w sklepie", "Treści, wygląd i termin", "SEO", "Po starcie"],
  },
  en: {
    yes: "yes",
    no: "no",
    extra: "extra",
    from: "from",
    quote: "quote",
    caption: "Comparison of what each package includes",
    price: "Price",
    time: "Delivery time",
    month: " / month",
    shop: "store",
    groups: ["Website and store features", "Store only", "Content, look and timing", "SEO", "After launch"],
  },
};

function Cell({ value, locale }: { value: string; locale: Locale }) {
  const c = COPY[locale];
  if (value === "tak")
    return (
      <>
        <svg aria-hidden viewBox="0 0 12 12" className="size-4 text-ink" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="m2 6.5 2.6 2.5L10 3.5" />
        </svg>
        <span className="sr-only">{c.yes}</span>
      </>
    );
  if (value === "nie")
    return (
      <>
        <span aria-hidden className="text-mute">—</span>
        <span className="sr-only">{c.no}</span>
      </>
    );
  if (value === "opcja") return <span className="label-mono text-mute">{c.extra}</span>;
  return <span>{value}</span>;
}

function packCell(slug: string, locale: Locale) {
  const c = COPY[locale];
  const p = pricingFor(locale).packages.find((x) => x.slug === slug)!;
  return { price: p.priceFrom ? `${c.from} ${formatPrice(p.priceFrom, locale)}` : c.quote, time: p.timeline };
}

const colIndex = [0, 1, 2] as const;

export function ComparisonTable() {
  const locale = getLocale();
  const c = COPY[locale];
  const { comparisonCols, comparisonRows } = pricingFor(locale);
  return (
    <>
      <div className="hidden md:block">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">{c.caption}</caption>
          <thead>
            <tr>
              <th scope="col" className="w-[34%] pb-4" />
              {comparisonCols.map((c) => (
                <th
                  key={c.slug}
                  scope="col"
                  className={cn(
                    "px-4 pb-4 align-bottom font-display text-2xl font-semibold",
                    c.slug === "strona-firmowa" && "rounded-t-[var(--radius)] bg-paper-2",
                  )}
                >
                  {c.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-t hairline">
              <th scope="row" className="label-mono py-4 pr-4 font-normal text-mute">
                {c.price}
              </th>
              {comparisonCols.map((c) => (
                <td
                  key={c.slug}
                  className={cn(
                    "px-4 py-4 font-display text-2xl font-semibold tabular-nums",
                    c.slug === "strona-firmowa" && "bg-paper-2",
                  )}
                >
                  {packCell(c.slug, locale).price}
                </td>
              ))}
            </tr>
            <tr className="border-t hairline">
              <th scope="row" className="label-mono py-4 pr-4 font-normal text-mute">
                {c.time}
              </th>
              {comparisonCols.map((c) => (
                <td key={c.slug} className={cn("px-4 py-4", c.slug === "strona-firmowa" && "bg-paper-2")}>
                  {packCell(c.slug, locale).time}
                </td>
              ))}
            </tr>
            {comparisonRows.map((r, ri) => (
              <tr key={r.label} className="border-t hairline">
                <th scope="row" className="py-4 pr-4 font-normal">
                  {r.label}
                </th>
                {colIndex.map((i) => (
                  <td
                    key={i}
                    className={cn(
                      "px-4 py-4 text-[0.95rem]",
                      comparisonCols[i].slug === "strona-firmowa" && "bg-paper-2",
                      ri === comparisonRows.length - 1 && comparisonCols[i].slug === "strona-firmowa" && "rounded-b-[var(--radius)]",
                    )}
                  >
                    <Cell value={r.values[i]} locale={locale} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 md:hidden">
        {comparisonCols.map((col, i) => (
          <details
            key={col.slug}
            open={col.slug === "strona-firmowa"}
            className={cn(
              "group rounded-[var(--radius)] border border-line",
              col.slug === "strona-firmowa" && "bg-paper-2",
            )}
          >
            <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 p-4 [&::-webkit-details-marker]:hidden">
              <span>
                <span className="block font-display text-2xl font-semibold">{col.name}</span>
                <span className="label-mono text-mute">
                  {packCell(col.slug, locale).price} · {packCell(col.slug, locale).time}
                </span>
              </span>
              <svg
                aria-hidden
                viewBox="0 0 16 16"
                className="size-4 shrink-0 transition-transform duration-300 group-open:rotate-180"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="m3 6 5 5 5-5" />
              </svg>
            </summary>
            <dl className="divide-y divide-line border-t hairline px-4">
              {comparisonRows.map((r) => (
                <div key={r.label} className="flex items-center justify-between gap-4 py-3 text-[0.95rem]">
                  <dt className="text-mute">{r.label}</dt>
                  <dd className="flex items-center text-right">
                    <Cell value={r.values[i]} locale={locale} />
                  </dd>
                </div>
              ))}
            </dl>
          </details>
        ))}
      </div>
    </>
  );
}

function priceLabel(a: Addon, locale: Locale) {
  const c = COPY[locale];
  const unit = a.recurring ? c.month : "";
  const base = `${a.from ? `${c.from} ` : ""}${formatPrice(a.price, locale)}${unit}`;
  const shop = a.priceFor?.["sklep-internetowy"];
  if (shop !== undefined && a.for.length > 1) return `${base} (${c.shop}: ${formatPrice(shop, locale)}${unit})`;
  return base;
}

const siteIds = (a: Addon) => a.for.some((s) => s === "landing-page" || s === "strona-firmowa" || s === "redesign-strony");

function groupsFor(locale: Locale): { title: string; items: { label: string; hint?: string; price: string }[] }[] {
  const { addons, extraPriceItems } = pricingFor(locale);
  const [sites, shop, content, seo, after] = COPY[locale].groups;
  const row = (a: Addon) => ({ label: a.label, hint: a.hint, price: priceLabel(a, locale) });
  return [
    { title: sites, items: addons.filter((a) => siteIds(a) && !a.recurring).map(row) },
    { title: shop, items: addons.filter((a) => a.for.length === 1 && a.for[0] === "sklep-internetowy").map(row) },
    { title: content, items: extraPriceItems.map((e) => ({ label: e.label, hint: e.note, price: e.price })) },
    { title: seo, items: addons.filter((a) => a.for.length === 1 && a.for[0] === "pozycjonowanie-seo").map(row) },
    { title: after, items: addons.filter((a) => a.id === "opieka").map(row) },
  ];
}

export function AddonsTable() {
  const groups = groupsFor(getLocale());
  return (
    <div className="gap-x-16 lg:columns-2">
      {groups.map((g, gi) => (
        <section key={g.title} aria-labelledby={`addons-group-${gi}`} className="mb-12 break-inside-avoid last:mb-0">
          <h3 id={`addons-group-${gi}`} className="label-mono border-b hairline pb-3 text-mute">
            {g.title}
          </h3>
          <ul className="divide-y divide-line">
            {g.items.map((it) => (
              <li
                key={it.label}
                className="grid gap-x-8 gap-y-1 py-4 sm:grid-cols-[1fr_auto] sm:items-baseline"
              >
                <div>
                  <p className="font-medium">{it.label}</p>
                  {it.hint && <p className="mt-0.5 max-w-xl text-sm text-mute">{it.hint}</p>}
                </div>
                <p className="font-display text-xl font-semibold tabular-nums sm:text-right">{it.price}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
