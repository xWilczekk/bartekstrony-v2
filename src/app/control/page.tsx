import Link from "next/link";
import { BarList, Card, DailyChart, dayKey, formatDateTime, Kpi, leadTitle, PageTitle, Shell, StatusChip } from "@/components/control/ui";
import { LoginScreen } from "@/components/control/login-screen";
import { sourceLabels } from "@/components/contact/lead-text";
import { isAuthed } from "@/lib/control-auth";
import { listLeads } from "@/lib/leads";
import { gaConfigured, getDailyVisitors, getMetrics, getStats, rangeOf, type Metric } from "@/lib/ga";
import { cn } from "@/lib/utils";

export const metadata = { title: "Pulpit" };

const RANGES = [7, 30, 90] as const;

const EVENT_LABEL: Record<string, string> = {
  zapytanie_wyslane: "Wysłane zapytania",
  telefon: "Kliknięcia w telefon",
  email: "Kliknięcia w e-mail",
  wycena_wynik: "Wyniki kalkulatora",
  audyt_start: "Uruchomione audyty",
};

const SOURCE_LABEL: Record<string, string> = { "(direct)": "Wpisany adres / zakładka", "(not set)": "Nieznane", "(bez danych)": "Nieznane" };

const pct = (a: number, b: number) => (b ? `${((a / b) * 100).toLocaleString("pl-PL", { maximumFractionDigits: 1 })}%` : "—");
const fmt = (n: number | null | undefined) => (n == null ? "—" : n.toLocaleString("pl-PL"));
const toBars = (m: Metric[] | null, label: (x: string) => string = (x) => x) =>
  m?.map((i) => ({ label: label(i.x && i.x !== "(not set)" ? i.x : "(bez danych)"), value: i.y })) ?? null;

export default async function Dashboard({ searchParams }: PageProps<"/control">) {
  if (!(await isAuthed())) return <LoginScreen />;

  const r = Number((await searchParams).r);
  const days = RANGES.includes(r as (typeof RANGES)[number]) ? r : 30;
  const range = rangeOf(days);

  const [leads, stats, daily, pages, refs, devices, countries, events] = await Promise.all([
    listLeads(),
    getStats(range),
    getDailyVisitors(range),
    getMetrics(range, "path"),
    getMetrics(range, "referrer"),
    getMetrics(range, "device", 5),
    getMetrics(range, "country", 6),
    getMetrics(range, "event", 10),
  ]);

  const inRange = leads.filter((l) => Date.parse(l.createdAt) >= range.startAt);
  const newCount = leads.filter((l) => l.status === "nowe").length;
  const won = inRange.filter((l) => l.status === "wygrane").length;
  const event = (name: string) => events?.find((e) => e.x === name)?.y ?? 0;

  const leadsPerDay = new Map<string, number>();
  for (const l of inRange) leadsPerDay.set(dayKey(l.createdAt), (leadsPerDay.get(dayKey(l.createdAt)) ?? 0) + 1);
  const chart = Array.from({ length: days }, (_, i) => {
    const date = dayKey(range.startAt + i * 86_400_000 + 12 * 3_600_000);
    return { date, visitors: daily ? (daily.get(date) ?? 0) : null, leads: leadsPerDay.get(date) ?? 0 };
  });

  const bySource = new Map<string, number>();
  for (const l of inRange) {
    const k = sourceLabels[l.lead.zrodlo] ?? (l.lead.zrodlo || "Kontakt");
    bySource.set(k, (bySource.get(k) ?? 0) + 1);
  }

  return (
    <Shell active="pulpit" newCount={newCount}>
      <PageTitle title="Pulpit">
        <nav aria-label="Zakres" className="flex rounded-full border hairline p-1">
          {RANGES.map((d) => (
            <Link
              key={d}
              href={`/control?r=${d}`}
              aria-current={d === days ? "true" : undefined}
              className={cn("label-mono rounded-full px-3.5 py-1.5", d === days ? "bg-ink text-paper" : "text-mute hover:text-ink")}
            >
              {d} dni
            </Link>
          ))}
        </nav>
      </PageTitle>

      {gaConfigured() ? (
        <p className="label-mono mt-6 text-mute">
          Odwiedziny z Google Analytics — tylko osoby, które zgodziły się na statystyki. Dane z opóźnieniem do kilku godzin.
        </p>
      ) : (
        <p className="mt-6 rounded-[var(--radius)] bg-paper-2 p-4 text-sm leading-relaxed">
          Statystyki odwiedzin pojawią się po podłączeniu Google Analytics: ustaw{" "}
          <code className="font-mono">GA_PROPERTY_ID</code>, <code className="font-mono">GA_CLIENT_EMAIL</code> i{" "}
          <code className="font-mono">GA_PRIVATE_KEY</code> w Vercelu. Zapytania działają już teraz.
        </p>
      )}

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi accent label="Zapytania" value={fmt(inRange.length)} hint={`${newCount} czeka na odpowiedź`} />
        <Kpi label="Odwiedzający" value={fmt(stats?.visitors)} hint={stats ? `${fmt(stats.pageviews)} wyświetleń` : "brak danych z GA"} />
        <Kpi label="Konwersja" value={stats ? pct(inRange.length, stats.visitors) : "—"} hint="zapytania / odwiedzający" />
        <Kpi label="Wygrane" value={fmt(won)} hint={inRange.length ? `${pct(won, inRange.length)} zapytań` : "w tym okresie"} />
      </div>

      <div className="mt-3 grid gap-3 xl:grid-cols-3">
        <Card title={`Ostatnie ${days} dni`} className="xl:col-span-2">
          <DailyChart days={chart} />
        </Card>
        <Card title="Działania na stronie">
          <BarList
            items={
              events
                ? Object.keys(EVENT_LABEL).map((k) => ({ label: EVENT_LABEL[k], value: event(k) }))
                : null
            }
            empty="Pojawi się po podłączeniu Google Analytics."
          />
          {stats && (
            <dl className="mt-5 grid grid-cols-2 gap-3 border-t hairline pt-4 text-sm">
              <div>
                <dt className="label-mono text-mute">Odrzucenia</dt>
                <dd className="mt-1 font-medium">{stats.bounceRate}%</dd>
              </div>
              <div>
                <dt className="label-mono text-mute">Średni czas</dt>
                <dd className="mt-1 font-medium">
                  {Math.floor(stats.avgSeconds / 60)} min {stats.avgSeconds % 60} s
                </dd>
              </div>
            </dl>
          )}
        </Card>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <Card title="Najczęstsze podstrony">
          <BarList items={toBars(pages)} />
        </Card>
        <Card title="Skąd przychodzą">
          <BarList items={toBars(refs, (x) => SOURCE_LABEL[x] ?? x)} />
        </Card>
        <Card title="Zapytania według źródła">
          <BarList items={[...bySource].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value)} empty="Brak zapytań w tym okresie." />
        </Card>
        <Card title="Urządzenia i kraje">
          <BarList items={toBars(devices, (x) => ({ mobile: "Telefon", desktop: "Komputer", tablet: "Tablet", laptop: "Laptop" })[x] ?? x)} />
          <div className="mt-4 border-t hairline pt-4">
            <BarList items={toBars(countries)} />
          </div>
        </Card>
      </div>

      <Card
        title="Ostatnie zapytania"
        className="mt-3"
        aside={
          <Link href="/control/zapytania" className="label-mono underline-offset-4 hover:underline">
            Wszystkie →
          </Link>
        }
      >
        {leads.length === 0 ? (
          <p className="text-sm text-mute">Jeszcze nic — zapytania z formularza pojawią się tutaj.</p>
        ) : (
          <ul className="divide-y divide-line">
            {leads.slice(0, 6).map((l) => (
              <li key={l.id}>
                <Link href={`/control/zapytania/${l.id}`} className="flex flex-wrap items-center gap-x-4 gap-y-1 py-3 hover:text-signal">
                  <StatusChip status={l.status} />
                  <span className="min-w-0 flex-1 truncate font-medium">{leadTitle(l)}</span>
                  <span className="label-mono text-mute">{sourceLabels[l.lead.zrodlo] ?? "Kontakt"}</span>
                  <span className="label-mono text-mute">{formatDateTime(l.createdAt)}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </Shell>
  );
}
