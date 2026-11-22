import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteLeadAction, saveLeadAction } from "@/app/control/actions";
import { DeleteButton } from "@/components/control/delete-button";
import { Card, formatDateTime, leadTitle, PageTitle, Shell, STATUS_LABEL, StatusChip } from "@/components/control/ui";
import { LoginScreen } from "@/components/control/login-screen";
import { leadFacts } from "@/components/contact/lead-text";
import { Button, buttonClass } from "@/components/ui/button";
import { site } from "@/content/site";
import { isAuthed } from "@/lib/control-auth";
import { getLead, LEAD_STATUSES, listLeads } from "@/lib/leads";

export const metadata = { title: "Zapytanie" };

export default async function LeadPage({ params, searchParams }: PageProps<"/control/zapytania/[id]">) {
  if (!(await isAuthed())) return <LoginScreen />;

  const [{ id }, sp] = await Promise.all([params, searchParams]);
  const [lead, all] = await Promise.all([getLead(id), listLeads()]);
  if (!lead) notFound();

  const facts = leadFacts(lead.lead);
  const rows: { label: string; value: React.ReactNode }[] = [
    { label: "E-mail", value: lead.email ? <a className="underline underline-offset-4" href={`mailto:${lead.email}`}>{lead.email}</a> : "—" },
    { label: "Telefon", value: lead.phone ? <a className="underline underline-offset-4" href={`tel:${lead.phone.replace(/\s/g, "")}`}>{lead.phone}</a> : "—" },
    { label: "Firma", value: lead.lead.firma || "—" },
    { label: "Obecna strona", value: lead.lead.url ? <a className="underline underline-offset-4" href={/^https?:/.test(lead.lead.url) ? lead.lead.url : `https://${lead.lead.url}`} target="_blank" rel="noopener noreferrer">{lead.lead.url}</a> : "—" },
    ...facts.map((f) => ({
      label: f.label,
      value:
        f.key === "podglad" ? (
          f.value.startsWith("/") && !f.value.startsWith("//") ? (
            <a className="underline underline-offset-4" href={new URL(f.value, site.url).toString()} target="_blank" rel="noopener noreferrer">
              zobacz podgląd ↗
            </a>
          ) : (
            "—"
          )
        ) : (
          f.value
        ),
    })),
    { label: "Język", value: lead.lead.jezyk === "en" ? "angielski — odpisz po angielsku" : "polski" },
  ];

  const replySubject = encodeURIComponent(lead.lead.jezyk === "en" ? "Your website quote — bartekstrony.pl" : "Wycena strony — bartekstrony.pl");

  return (
    <Shell active="zapytania" newCount={all.filter((l) => l.status === "nowe").length}>
      <Link href="/control/zapytania" className="label-mono text-mute hover:text-ink">
        ← Wszystkie zapytania
      </Link>
      <div className="mt-4">
        <PageTitle title={leadTitle(lead)}>
          <StatusChip status={lead.status} />
        </PageTitle>
      </div>
      <p className="label-mono mt-3 text-mute">
        Wysłane {formatDateTime(lead.createdAt)}
        {lead.updatedAt !== lead.createdAt && <> · zmienione {formatDateTime(lead.updatedAt)}</>}
      </p>

      {sp.zapisano && <p className="mt-6 rounded-[var(--radius)] bg-[var(--highlight)]/40 p-4 text-sm font-medium">Zapisano.</p>}

      <div className="mt-6 flex flex-wrap gap-2">
        {lead.email && (
          <a href={`mailto:${lead.email}?subject=${replySubject}`} className={buttonClass("ink", "md")}>
            Odpisz mailem
          </a>
        )}
        {lead.phone && (
          <a href={`tel:${lead.phone.replace(/\s/g, "")}`} className={buttonClass("ghost", "md")}>
            Zadzwoń
          </a>
        )}
      </div>

      <div className="mt-6 grid gap-3 xl:grid-cols-[1fr_24rem]">
        <div className="grid content-start gap-3">
          {(lead.message || lead.lead.opis) && (
            <Card title="Wiadomość">
              {lead.message && <p className="max-w-3xl leading-relaxed whitespace-pre-line">{lead.message}</p>}
              {lead.lead.opis && (
                <div className={lead.message ? "mt-5 border-t hairline pt-4" : ""}>
                  <p className="label-mono text-mute">Z kalkulatora / audytu</p>
                  <p className="mt-2 max-w-3xl leading-relaxed whitespace-pre-line text-ink/80">{lead.lead.opis}</p>
                </div>
              )}
            </Card>
          )}
          <Card title="Szczegóły">
            <dl className="grid gap-x-6 gap-y-3 text-[0.95rem] sm:grid-cols-[10rem_1fr]">
              {rows.map((r) => (
                <div key={r.label} className="contents">
                  <dt className="label-mono pt-0.5 text-mute">{r.label}</dt>
                  <dd className="min-w-0 break-words">{r.value}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </div>

        <div className="grid content-start gap-3">
          <Card title="Status i notatka">
            <form action={saveLeadAction} className="grid gap-4">
              <input type="hidden" name="id" value={lead.id} />
              <fieldset className="grid grid-cols-2 gap-2">
                <legend className="sr-only">Status</legend>
                {LEAD_STATUSES.map((s) => (
                  <label key={s} className="relative cursor-pointer">
                    <input type="radio" name="status" value={s} defaultChecked={lead.status === s} className="peer sr-only" />
                    <span className="flex h-10 items-center justify-center rounded-full border hairline text-sm transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-signal">
                      {STATUS_LABEL[s]}
                    </span>
                  </label>
                ))}
              </fieldset>
              <label className="grid gap-2">
                <span className="label-mono text-mute">Notatka (tylko dla Ciebie)</span>
                <textarea
                  name="note"
                  defaultValue={lead.note}
                  rows={6}
                  maxLength={5000}
                  placeholder="np. dzwoniłem 31.10, wysłać wycenę do piątku"
                  className="rounded-[var(--radius)] border border-line bg-paper-2/60 p-3 text-[0.95rem] leading-relaxed focus:border-ink focus:outline-none"
                />
              </label>
              <Button type="submit" variant="signal" arrow>
                Zapisz
              </Button>
            </form>
          </Card>
          <Card title="Usuwanie (RODO)">
            <p className="text-sm leading-relaxed text-mute">Gdy ktoś poprosi o usunięcie danych albo minie 12 miesięcy bez zlecenia.</p>
            <form action={deleteLeadAction} className="mt-4">
              <input type="hidden" name="id" value={lead.id} />
              <DeleteButton />
            </form>
          </Card>
        </div>
      </div>
    </Shell>
  );
}
