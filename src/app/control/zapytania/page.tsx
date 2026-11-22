import Link from "next/link";
import { formatDateTime, leadTitle, PageTitle, Shell, STATUS_LABEL, StatusChip } from "@/components/control/ui";
import { LoginScreen } from "@/components/control/login-screen";
import { leadFacts, sourceLabels } from "@/components/contact/lead-text";
import { isAuthed } from "@/lib/control-auth";
import { LEAD_STATUSES, listLeads, type LeadStatus } from "@/lib/leads";
import { cn } from "@/lib/utils";

export const metadata = { title: "Zapytania" };

export default async function LeadsPage({ searchParams }: PageProps<"/control/zapytania">) {
  if (!(await isAuthed())) return <LoginScreen />;

  const sp = await searchParams;
  const filter = LEAD_STATUSES.includes(sp.status as LeadStatus) ? (sp.status as LeadStatus) : null;
  const leads = await listLeads();
  const visible = filter ? leads.filter((l) => l.status === filter) : leads;
  const count = (s: LeadStatus) => leads.filter((l) => l.status === s).length;

  const tab = (active: boolean) =>
    cn("label-mono flex h-9 items-center gap-2 rounded-full px-3.5 whitespace-nowrap", active ? "bg-ink text-paper" : "border hairline text-mute hover:text-ink");

  return (
    <Shell active="zapytania" newCount={count("nowe")}>
      <PageTitle title="Zapytania">
        <p className="label-mono text-mute">{leads.length} łącznie</p>
      </PageTitle>

      {sp.usunieto && <p className="mt-6 rounded-[var(--radius)] bg-paper-2 p-4 text-sm">Zapytanie zostało usunięte.</p>}

      <nav aria-label="Filtr statusu" className="-mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
        <Link href="/control/zapytania" aria-current={!filter ? "true" : undefined} className={tab(!filter)}>
          Wszystkie <span className="opacity-60">{leads.length}</span>
        </Link>
        {LEAD_STATUSES.map((s) => (
          <Link key={s} href={`/control/zapytania?status=${s}`} aria-current={filter === s ? "true" : undefined} className={tab(filter === s)}>
            {STATUS_LABEL[s]} <span className="opacity-60">{count(s)}</span>
          </Link>
        ))}
      </nav>

      {visible.length === 0 ? (
        <p className="mt-10 text-mute">{leads.length === 0 ? "Jeszcze nie ma zapytań. Pojawią się tu od razu po wysłaniu formularza." : "Brak zapytań z tym statusem."}</p>
      ) : (
        <ul className="mt-6 grid gap-3">
          {visible.map((l) => {
            const facts = leadFacts(l.lead).filter((f) => f.key !== "zrodlo" && f.key !== "podglad");
            return (
              <li key={l.id}>
                <Link
                  href={`/control/zapytania/${l.id}`}
                  className="group grid gap-3 rounded-[var(--radius)] border hairline p-4 transition-colors hover:border-ink/40 sm:p-5 md:grid-cols-[1fr_auto]"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <StatusChip status={l.status} />
                      <span className="font-display text-xl font-semibold group-hover:text-signal">{leadTitle(l)}</span>
                      {l.lead.jezyk === "en" && <span className="label-mono rounded-full border hairline px-2 py-0.5">EN</span>}
                    </div>
                    <p className="mt-2 text-sm text-mute">
                      {[l.email, l.phone].filter(Boolean).join(" · ")}
                      {facts.length > 0 && <> · {facts.map((f) => f.value).join(" · ")}</>}
                    </p>
                    {(l.message || l.lead.opis) && <p className="mt-2 line-clamp-2 max-w-3xl text-[0.95rem] text-ink/80">{l.message || l.lead.opis}</p>}
                    {l.note && <p className="mt-2 text-sm text-mute">📝 {l.note}</p>}
                  </div>
                  <div className="label-mono flex gap-4 text-mute md:flex-col md:items-end md:gap-1">
                    <span>{formatDateTime(l.createdAt)}</span>
                    <span>{sourceLabels[l.lead.zrodlo] ?? "Kontakt"}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </Shell>
  );
}
