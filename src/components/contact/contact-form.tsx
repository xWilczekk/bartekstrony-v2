"use client";

import { useId, useMemo, useRef, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import { localizeHref } from "@/i18n/config";
import { useLocale } from "@/i18n/client";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { buildPlainText, buildSubject, leadFacts } from "./lead-text";
import { LEAD_KEYS, emptyLead, messageEn, type Lead, type LeadKey } from "./lead";
import type { ContactInput } from "./schema";

type Status = "idle" | "submitting" | "success" | "error" | "unavailable";

function readLead(get: (k: string) => string | null): Lead {
  const lead: Lead = { ...emptyLead };
  for (const key of LEAD_KEYS) lead[key] = (get(key) ?? "").trim().slice(0, key === "opis" ? 1500 : 300);
  if (!lead.podglad.startsWith("/") || lead.podglad.startsWith("//")) lead.podglad = "";
  if (lead.budzet && !/^\d{1,9}$/.test(lead.budzet)) lead.budzet = "";
  if (lead.wynik && !/^\d{1,3}$/.test(lead.wynik)) lead.wynik = "";
  return lead;
}

const inputCls =
  "block w-full rounded-[var(--radius)] border border-line bg-paper-2/60 px-4 text-base text-ink transition-colors placeholder:text-mute/70 hover:border-ink/50 focus:border-ink aria-[invalid=true]:border-signal aria-[invalid=true]:border-2";

function Field({
  id,
  label,
  optional,
  optionalLabel,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  optionalLabel: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between gap-3 text-[0.95rem] font-medium">
        <span>{label}</span>
        {optional && <span className="label-mono font-normal text-mute">{optionalLabel}</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-mute">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-sm font-medium text-ink before:mr-2 before:text-signal before:content-['●']">
          {error}
        </p>
      )}
    </div>
  );
}

const COPY = {
  pl: {
    optional: "opcjonalnie",
    rateLimited: "Wysłano już kilka wiadomości. Spróbuj za kilka minut albo zadzwoń.",
    noName: "bez imienia",
    sent: "Wysłane",
    thanks: "Dzięki",
    gotIt: "Mam Twoje zapytanie.",
    willRead: "Przeczytam je osobiście i odezwę się w ciągu 24 godzin.",
    steps: [
      ["01", "Czytam Twoją wiadomość", "Jeśli czegoś nie rozumiem, dopytam krótko."],
      ["02", "W 24 godziny dostajesz odpowiedź", "Z konkretną wyceną albo propozycją 15-minutowej rozmowy."],
      ["03", "Pilna sprawa? Zadzwoń", `${site.phone}. Nie musisz czekać na mail.`],
    ],
    callNow: "Zadzwoń teraz",
    seeWork: "Zobacz realizacje, póki czekasz",
    yourRequest: "Twoje zapytanie",
    seePreview: "zobacz podgląd",
    remove: "Usuń z zapytania",
    opis: "Opis (możesz go zmienić)",
    fix: (n: number) => `Popraw ${n === 1 ? "jedno pole" : `pola (${n})`}, żeby wysłać wiadomość.`,
    name: "Imię",
    emailHint: "Wystarczy e-mail albo telefon.",
    phone: "Telefon",
    phoneHint: "Oddzwonię, kiedy Ci pasuje.",
    message: "Wiadomość",
    messageHintMore: "Dopisz, co jeszcze warto wiedzieć.",
    messageHint: "Czym zajmuje się firma i czego potrzebujesz? Kilka zdań wystarczy.",
    company: "Firma",
    url: "Link do obecnej strony",
    urlPlaceholder: "twojafirma.pl",
    trap: "Nie wypełniaj tego pola",
    consent: "Zgadzam się na przetwarzanie moich danych osobowych w celu odpowiedzi na to zapytanie. Szczegóły:",
    privacy: "polityka prywatności",
    unavailable: "Formularz chwilowo nie wysyła wiadomości.",
    failed: "Nie udało się wysłać wiadomości.",
    notLost: "Nic nie szkodzi, Twoje dane nie przepadły.",
    fallback: "Wyślij to samo jednym kliknięciem z własnej poczty albo zadzwoń.",
    openMail: "Otwórz gotowego maila",
    call: "Zadzwoń",
    sending: "Wysyłam…",
    retry: "Spróbuj jeszcze raz",
    send: "Wyślij zapytanie",
    reply: "Odpowiadam w ciągu 24 godzin.",
  },
  en: {
    optional: "optional",
    rateLimited: "Several messages have already been sent. Try again in a few minutes or call me.",
    noName: "no name",
    sent: "Sent",
    thanks: "Thanks",
    gotIt: "I’ve got your enquiry.",
    willRead: "I’ll read it personally and get back to you within 24 hours.",
    steps: [
      ["01", "I read your message", "If something’s unclear, I’ll ask a quick question."],
      ["02", "You get a reply within 24 hours", "With a specific quote or a suggestion for a 15-minute call."],
      ["03", "Urgent? Call me", `${site.phone}. No need to wait for an e-mail.`],
    ],
    callNow: "Call now",
    seeWork: "See my work while you wait",
    yourRequest: "Your enquiry",
    seePreview: "see the preview",
    remove: "Remove from the enquiry",
    opis: "Description (you can edit it)",
    fix: (n: number) => `Fix ${n === 1 ? "one field" : `${n} fields`} to send the message.`,
    name: "Name",
    emailHint: "An e-mail or a phone number is enough.",
    phone: "Phone",
    phoneHint: "I’ll call back when it suits you.",
    message: "Message",
    messageHintMore: "Add anything else worth knowing.",
    messageHint: "What does your business do and what do you need? A few sentences are enough.",
    company: "Company",
    url: "Link to your current website",
    urlPlaceholder: "yourcompany.com",
    trap: "Leave this field empty",
    consent: "I agree to the processing of my personal data in order to reply to this enquiry. Details:",
    privacy: "privacy policy",
    unavailable: "The form can’t send messages right now.",
    failed: "The message couldn’t be sent.",
    notLost: "No problem, nothing you typed is lost.",
    fallback: "Send the same thing with one click from your own e-mail, or call me.",
    openMail: "Open a ready e-mail",
    call: "Call",
    sending: "Sending…",
    retry: "Try again",
    send: "Send enquiry",
    reply: "I reply within 24 hours.",
  },
};

export function ContactForm() {
  const locale = useLocale();
  const en = locale === "en";
  const c = COPY[locale];
  const sp = useSearchParams();
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);

  const [lead, setLead] = useState<Lead>(() => ({ ...readLead((k) => sp.get(k)), jezyk: en ? "en" : "" }));
  const [v, setV] = useState({ name: "", email: "", phone: "", message: "", consent: false, trap: "" });
  const [rawErrors, setErrors] = useState<Record<string, string>>({});
  const errors = en ? Object.fromEntries(Object.entries(rawErrors).map(([k, m]) => [k, messageEn(m)])) : rawErrors;
  const [status, setStatus] = useState<Status>("idle");
  const [sentName, setSentName] = useState("");

  const [hadOpis] = useState(lead.opis !== "");
  const facts = useMemo(() => leadFacts(lead, locale), [lead, locale]);
  const showSummary = facts.length > 0 || hadOpis;

  const id = (name: string) => `${uid}-${name}`;
  const describe = (name: string, hasHint = false) =>
    errors[name] ? `${id(name)}-err` : hasHint ? `${id(name)}-hint` : undefined;

  const payload = () => ({ ...v, lead });

  function mailtoHref() {
    const input: ContactInput = { ...v, consent: true, lead };
    const subject = buildSubject({ ...input, name: input.name || c.noName });
    return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildPlainText(input))}`;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const { contactSchema, fieldErrors } = await import("./schema");
    const parsed = contactSchema.safeParse(payload());
    if (!parsed.success) {
      flushSync(() => setErrors(fieldErrors(parsed.error)));
      formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }
    setErrors({});
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const body = (await res.json().catch(() => null)) as { code?: string; fields?: Record<string, string> } | null;

      if (res.ok) {
        track("zapytanie-wyslane", { zrodlo: lead.zrodlo || "kontakt", usluga: lead.usluga, jezyk: locale });
        setSentName(parsed.data.name.split(/\s+/)[0]);
        setStatus("success");
        requestAnimationFrame(() => successRef.current?.focus());
        return;
      }
      if (res.status === 400 && body?.fields) {
        flushSync(() => {
          setErrors(body.fields!);
          setStatus("idle");
        });
        formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
        return;
      }
      setStatus(body?.code === "EMAIL_NOT_CONFIGURED" ? "unavailable" : "error");
      if (body?.code === "RATE_LIMITED") setErrors({ form: c.rateLimited });
      requestAnimationFrame(() => fallbackRef.current?.focus());
    } catch {
      setStatus("error");
      requestAnimationFrame(() => fallbackRef.current?.focus());
    }
  }

  const removeLead = (key: LeadKey) => setLead((l) => ({ ...l, [key]: "" }));
  const errorCount = Object.keys(errors).filter((k) => k !== "form").length;

  if (status === "success") {
    return (
      <div className="rounded-[var(--radius)] bg-ink p-7 text-paper md:p-10" role="status">
        <p className="label-mono text-mute-ink">{c.sent}</p>
        <h2
          ref={successRef}
          tabIndex={-1}
          className="mt-4 font-display text-[length:var(--text-huge)] font-semibold text-balance outline-none"
        >
          {c.thanks}
          {sentName ? `, ${sentName}` : ""}. <span className="font-serif-accent text-signal">{c.gotIt}</span>
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-mute-ink">
          {c.willRead}
        </p>
        <ol className="mt-8 space-y-4 border-t border-line-ink pt-6">
          {c.steps.map(([n, t, d]) => (
            <li key={n} className="grid grid-cols-[2.5rem_1fr]">
              <span className="label-mono pt-1 text-signal">{n}</span>
              <span>
                <span className="block font-medium">{t}</span>
                <span className="block text-sm text-mute-ink">{d}</span>
              </span>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={site.phoneHref}
            className="inline-flex h-12 items-center rounded-full bg-paper px-6 font-medium text-ink transition-colors hover:bg-signal hover:text-paper"
          >
            {c.callNow}
          </a>
          <Link href={localizeHref("/realizacje", locale)} className="label-mono inline-flex min-h-11 items-center text-paper/80 underline-offset-4 hover:text-paper hover:underline">
            {c.seeWork}
          </Link>
        </div>
      </div>
    );
  }

  const failed = status === "error" || status === "unavailable";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-8">
      {showSummary && (
        <section aria-labelledby={`${uid}-sum`} className="rounded-[var(--radius)] border border-line bg-paper-2 p-4 sm:p-6">
          <h2 id={`${uid}-sum`} className="label-mono text-mute">
            <span className="text-signal">●</span> {c.yourRequest}
          </h2>
          {facts.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {facts.map((f) => (
                <li
                  key={f.key}
                  className="flex min-h-9 items-center gap-1 rounded-full border border-ink/20 bg-paper py-1 pr-1 pl-3 text-sm"
                >
                  <span className="text-mute">{f.label}:</span>
                  {f.key === "podglad" ? (
                    <a href={f.value} target="_blank" rel="noopener" className="font-medium underline underline-offset-2">
                      {c.seePreview}
                    </a>
                  ) : (
                    <span className="font-medium">{f.value}</span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeLead(f.key)}
                    aria-label={`${c.remove}: ${f.label} ${f.value}`}
                    className="grid size-7 place-items-center rounded-full text-mute transition-colors hover:bg-ink hover:text-paper"
                  >
                    <svg aria-hidden viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="m3 3 6 6M9 3 3 9" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
          {hadOpis && (
            <div className="mt-4">
              <label htmlFor={id("opis")} className="label-mono mb-2 block text-mute">
                {c.opis}
              </label>
              <textarea
                id={id("opis")}
                value={lead.opis}
                onChange={(e) => setLead((l) => ({ ...l, opis: e.target.value }))}
                rows={4}
                maxLength={1500}
                className={cn(inputCls, "min-h-28 resize-y bg-paper py-3 text-[0.95rem] leading-relaxed")}
              />
            </div>
          )}
        </section>
      )}

      <div id={`${uid}-status`} aria-live="assertive" aria-atomic="true">
        {errorCount > 0 && (
          <p className="rounded-[var(--radius)] border border-signal px-4 py-3 text-sm font-medium">
            {c.fix(errorCount)}
          </p>
        )}
        {errors.form && <p className="text-sm font-medium">{errors.form}</p>}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field id={id("name")} label={c.name} optionalLabel={c.optional} error={errors.name}>
            <input
              id={id("name")}
              name="name"
              autoComplete="given-name"
              value={v.name}
              onChange={(e) => setV({ ...v, name: e.target.value })}
              aria-invalid={!!errors.name}
              aria-describedby={describe("name")}
              aria-required
              className={cn(inputCls, "h-14")}
            />
          </Field>
        </div>
        <Field id={id("email")} label="E-mail" optionalLabel={c.optional} error={errors.email} hint={c.emailHint}>
          <input
            id={id("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            value={v.email}
            onChange={(e) => setV({ ...v, email: e.target.value })}
            aria-invalid={!!errors.email}
            aria-describedby={describe("email", true)}
            className={cn(inputCls, "h-14")}
          />
        </Field>
        <Field id={id("phone")} label={c.phone} optionalLabel={c.optional} error={errors.phone} hint={c.phoneHint}>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={v.phone}
            onChange={(e) => setV({ ...v, phone: e.target.value })}
            aria-invalid={!!errors.phone}
            aria-describedby={describe("phone", true)}
            className={cn(inputCls, "h-14")}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field
            id={id("message")}
            label={c.message}
            optional={showSummary}
            optionalLabel={c.optional}
            error={errors.message}
            hint={showSummary ? c.messageHintMore : c.messageHint}
          >
            <textarea
              id={id("message")}
              name="message"
              rows={5}
              maxLength={5000}
              value={v.message}
              onChange={(e) => setV({ ...v, message: e.target.value })}
              aria-invalid={!!errors.message}
              aria-describedby={describe("message", true)}
              className={cn(inputCls, "min-h-36 resize-y py-3.5 leading-relaxed")}
            />
          </Field>
        </div>
        <Field id={id("firma")} label={c.company} optional optionalLabel={c.optional}>
          <input
            id={id("firma")}
            name="firma"
            autoComplete="organization"
            value={lead.firma}
            onChange={(e) => setLead((l) => ({ ...l, firma: e.target.value }))}
            className={cn(inputCls, "h-14")}
          />
        </Field>
        <Field id={id("url")} label={c.url} optional optionalLabel={c.optional}>
          <input
            id={id("url")}
            name="url"
            inputMode="url"
            autoCapitalize="none"
            autoComplete="url"
            placeholder={c.urlPlaceholder}
            value={lead.url}
            onChange={(e) => setLead((l) => ({ ...l, url: e.target.value }))}
            className={cn(inputCls, "h-14")}
          />
        </Field>
      </div>

      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={id("trap")}>{c.trap}</label>
        <input
          id={id("trap")}
          name="trap"
          tabIndex={-1}
          autoComplete="off"
          value={v.trap}
          onChange={(e) => setV({ ...v, trap: e.target.value })}
        />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={v.consent}
            onChange={(e) => setV({ ...v, consent: e.target.checked })}
            aria-invalid={!!errors.consent}
            aria-describedby={describe("consent")}
            className="peer mt-0.5 size-6 shrink-0 cursor-pointer accent-[var(--ink)] aria-[invalid=true]:outline aria-[invalid=true]:outline-2 aria-[invalid=true]:outline-signal"
          />
          <span className="text-sm leading-relaxed text-mute">
            {c.consent}{" "}
            <Link
              href={localizeHref("/polityka-prywatnosci", locale)}
              target="_blank"
              className="text-ink underline decoration-signal underline-offset-4 hover:text-signal"
            >
              {c.privacy}
            </Link>
            .
          </span>
        </label>
        {errors.consent && (
          <p id={`${id("consent")}-err`} className="mt-1.5 pl-9 text-sm font-medium text-ink before:mr-2 before:text-signal before:content-['●']">
            {errors.consent}
          </p>
        )}
      </div>

      {failed && (
        <div
          ref={fallbackRef}
          tabIndex={-1}
          role="alert"
          className="rounded-[var(--radius)] border border-ink bg-paper-2 p-5 outline-none"
        >
          <p className="font-medium">
            {status === "unavailable" ? c.unavailable : c.failed} {c.notLost}
          </p>
          <p className="mt-1 text-sm text-mute">{c.fallback}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href={mailtoHref()}
              className="inline-flex h-12 items-center rounded-full bg-ink px-6 font-medium text-paper transition-colors hover:bg-signal"
            >
              {c.openMail}
            </a>
            <a
              href={site.phoneHref}
              className="inline-flex h-12 items-center rounded-full border border-ink/25 px-6 font-medium transition-colors hover:border-ink"
            >
              {c.call}: {site.phone}
            </a>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" variant="signal" size="lg" arrow disabled={status === "submitting"}>
          {status === "submitting" ? c.sending : failed ? c.retry : c.send}
        </Button>
        <p className="text-sm text-mute">{c.reply}</p>
      </div>
    </form>
  );
}
