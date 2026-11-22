import Link from "next/link";
import type { ReactNode } from "react";
import { logout } from "@/app/control/actions";
import { Wordmark } from "@/components/site/wordmark";
import type { LeadStatus, StoredLead } from "@/lib/leads";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/control", label: "Pulpit", key: "pulpit" },
  { href: "/control/zapytania", label: "Zapytania", key: "zapytania" },
] as const;

export function Shell({ active, newCount, children }: { active: "pulpit" | "zapytania"; newCount?: number; children: ReactNode }) {
  return (
    <div className="lg:grid lg:min-h-dvh lg:grid-cols-[15rem_1fr]">
      <aside className="theme-ink flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 lg:sticky lg:top-0 lg:h-dvh lg:flex-col lg:flex-nowrap lg:items-stretch lg:px-5 lg:py-6">
        <Link href="/control" className="flex items-baseline gap-2">
          <Wordmark className="text-[1.15rem]" />
          <span className="label-mono text-mute max-lg:hidden">panel</span>
        </Link>
        <nav aria-label="Panel" className="flex gap-1 max-lg:order-last max-lg:w-full lg:mt-10 lg:flex-col">
          {NAV.map((n) => (
            <Link
              key={n.key}
              href={n.href}
              aria-current={active === n.key ? "page" : undefined}
              className={cn(
                "flex h-10 items-center justify-between gap-3 rounded-full px-4 text-[0.95rem] transition-colors",
                active === n.key ? "bg-paper text-ink" : "text-paper/75 hover:bg-white/10 hover:text-paper",
              )}
            >
              {n.label}
              {n.key === "zapytania" && newCount ? (
                <span className="grid min-w-6 place-items-center rounded-full bg-[var(--highlight)] px-1.5 text-xs font-semibold text-ink">
                  {newCount}
                </span>
              ) : null}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1 lg:mt-auto lg:ml-0 lg:flex-col lg:items-stretch">
          <Link href="/" target="_blank" className="label-mono flex h-10 items-center rounded-full px-4 text-paper/60 hover:text-paper max-sm:hidden">
            Strona ↗
          </Link>
          <form action={logout}>
            <button type="submit" className="label-mono flex h-10 w-full items-center rounded-full px-4 text-paper/60 hover:text-paper">
              Wyloguj
            </button>
          </form>
        </div>
      </aside>
      <main className="min-w-0 px-4 py-8 sm:px-6 lg:px-10 lg:py-10">{children}</main>
    </div>
  );
}

export function PageTitle({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b hairline pb-5">
      <h1 className="font-display text-[clamp(1.9rem,3vw,2.6rem)] leading-none font-semibold tracking-tight">{title}</h1>
      {children}
    </div>
  );
}

export function Card({ title, children, className, aside }: { title?: string; children: ReactNode; className?: string; aside?: ReactNode }) {
  return (
    <section className={cn("rounded-[var(--radius)] border hairline bg-paper p-5", className)}>
      {(title || aside) && (
        <div className="mb-4 flex items-baseline justify-between gap-3">
          {title && <h2 className="label-mono text-mute">{title}</h2>}
          {aside}
        </div>
      )}
      {children}
    </section>
  );
}

export function Kpi({ label, value, hint, accent }: { label: string; value: ReactNode; hint?: ReactNode; accent?: boolean }) {
  return (
    <div className={cn("rounded-[var(--radius)] border hairline p-5", accent ? "border-transparent bg-ink text-paper" : "bg-paper")}>
      <p className={cn("label-mono", accent ? "text-paper/60" : "text-mute")}>{label}</p>
      <p className="mt-3 font-display text-[clamp(2rem,3vw,2.6rem)] leading-none font-semibold tracking-tight tabular-nums">{value}</p>
      {hint && <p className={cn("mt-2 text-sm", accent ? "text-paper/60" : "text-mute")}>{hint}</p>}
    </div>
  );
}

export function BarList({ items, empty = "Brak danych" }: { items: { label: string; value: number }[] | null; empty?: string }) {
  if (!items || items.length === 0) return <p className="text-sm text-mute">{empty}</p>;
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <ul className="grid gap-1.5">
      {items.map((i) => (
        <li key={i.label} className="relative flex items-center justify-between gap-3 overflow-hidden rounded-md px-2.5 py-1.5 text-sm">
          <span aria-hidden className="absolute inset-y-0 left-0 rounded-md bg-ink/[0.06]" style={{ width: `${(i.value / max) * 100}%` }} />
          <span className="relative min-w-0 truncate">{i.label}</span>
          <span className="relative font-medium tabular-nums">{i.value}</span>
        </li>
      ))}
    </ul>
  );
}

export function DailyChart({ days }: { days: { date: string; visitors: number | null; leads: number }[] }) {
  const max = Math.max(...days.map((d) => d.visitors ?? 0), 1);
  const dense = days.length > 31;
  return (
    <div>
      <div className="flex h-44 items-end gap-[2px]" role="img" aria-label="Odwiedzający i zapytania dzień po dniu">
        {days.map((d) => (
          <div key={d.date} className="group relative flex h-full flex-1 flex-col justify-end" title={`${d.date}: ${d.visitors ?? "—"} odw., ${d.leads} zapyt.`}>
            {d.leads > 0 && (
              <span className="mb-1 grid h-4 place-items-center self-center rounded-sm bg-[var(--highlight)] px-1 text-[10px] font-semibold text-ink">
                {dense ? "" : d.leads}
              </span>
            )}
            <span className="block rounded-t-sm bg-ink/80 transition-colors group-hover:bg-signal" style={{ height: `${((d.visitors ?? 0) / max) * 100}%`, minHeight: d.visitors ? 2 : 0 }} />
          </div>
        ))}
      </div>
      <div className="label-mono mt-2 flex justify-between text-mute">
        <span>{shortDate(days[0]?.date)}</span>
        <span className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <i className="size-2.5 rounded-sm bg-ink/80" /> odwiedzający
          </span>
          <span className="flex items-center gap-1.5">
            <i className="size-2.5 rounded-sm bg-[var(--highlight)]" /> zapytania
          </span>
        </span>
        <span>{shortDate(days[days.length - 1]?.date)}</span>
      </div>
    </div>
  );
}

export const STATUS_LABEL: Record<LeadStatus, string> = {
  nowe: "Nowe",
  "w-rozmowie": "W rozmowie",
  wygrane: "Wygrane",
  przegrane: "Przegrane",
};

export function StatusChip({ status }: { status: LeadStatus }) {
  return (
    <span
      className={cn(
        "label-mono inline-flex h-7 items-center rounded-full px-2.5 whitespace-nowrap",
        status === "nowe" && "bg-[var(--highlight)] text-ink",
        status === "w-rozmowie" && "border border-ink/30",
        status === "wygrane" && "bg-ink text-paper",
        status === "przegrane" && "bg-ink/5 text-mute",
      )}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

const TZ = "Europe/Warsaw";
export const dayKey = (d: Date | string | number) => new Date(d).toLocaleDateString("sv-SE", { timeZone: TZ });
export const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString("pl-PL", { timeZone: TZ, day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
function shortDate(key?: string) {
  if (!key) return "";
  const [, m, d] = key.split("-");
  return `${Number(d)}.${m}`;
}

export const leadTitle = (l: StoredLead) => (l.lead.firma ? `${l.name} · ${l.lead.firma}` : l.name);
