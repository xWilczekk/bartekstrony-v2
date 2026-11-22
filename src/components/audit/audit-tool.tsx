"use client";

import dynamic from "next/dynamic";
import { Suspense, useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { Button, buttonClass, ButtonLink } from "@/components/ui/button";
import { site } from "@/content/site";
import { localizeHref, type Locale } from "@/i18n/config";
import { useLocale } from "@/i18n/client";
import { scrollToY } from "@/components/motion/lenis-store";
import { track } from "@/lib/analytics";
import { contactHref } from "@/lib/utils";
import { normalizeUrl } from "./url";
import type { AuditData, AuditErrorKind } from "./psi";

const AuditProgress = dynamic(() => import("./audit-progress").then((m) => m.AuditProgress));
const AuditResult = dynamic(() => import("./audit-result").then((m) => m.AuditResult));

type State =
  | { status: "idle" }
  | { status: "running"; url: string; display: string }
  | { status: "done"; data: AuditData }
  | { status: "error"; url: string; display: string; kind: AuditErrorKind };

const CACHE_TTL_MS = 30 * 60 * 1000;
const cacheKey = (url: string, locale: Locale) => `audyt:v1:${locale}:${url}`;

function readCache(url: string, locale: Locale): AuditData | null {
  try {
    const raw = sessionStorage.getItem(cacheKey(url, locale));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuditData;
    return Date.now() - parsed.fetchedAt < CACHE_TTL_MS ? parsed : null;
  } catch {
    return null;
  }
}

function writeCache(data: AuditData, locale: Locale) {
  try {
    sessionStorage.setItem(cacheKey(data.url, locale), JSON.stringify(data));
  } catch {
  }
}

function QueryRunner({ onUrl }: { onUrl: (raw: string) => void }) {
  const raw = useSearchParams().get("url");
  const handled = useRef(false);
  useEffect(() => {
    if (handled.current || !raw) return;
    handled.current = true;
    onUrl(raw);
    return () => {
      handled.current = false;
    };
  }, [raw, onUrl]);
  return null;
}

const ERROR_COPY_EN: Record<AuditErrorKind, { title: string; body: string; retry: boolean }> = {
  unreachable: {
    title: "I couldn’t open this website.",
    body: "The test from Google’s servers didn’t reach this address. Check that the address is right and the site works. If it opens fine for you but not here — the site may block external tests or respond very slowly.",
    retry: true,
  },
  timeout: {
    title: "This site loads so slowly that the test couldn’t read it in time.",
    body: "That’s a result in itself — customers on phones most likely wait just as long. Try again, or leave this one to me.",
    retry: true,
  },
  quota: {
    title: "Today’s limit of free tests has run out.",
    body: "Google limits the number of automated tests per day. Come back tomorrow, or leave the address — I’ll do the audit by hand.",
    retry: false,
  },
  config: {
    title: "The automated test is temporarily unavailable.",
    body: "That’s a fault on my side, not yours. Leave the address — I’ll do the audit by hand.",
    retry: false,
  },
  network: {
    title: "No connection to the test server.",
    body: "Check your internet (or turn off ad blockers for this site) and try again.",
    retry: true,
  },
  unknown: {
    title: "The test didn’t work.",
    body: "Google returned an unexpected error. Trying again in a moment usually helps.",
    retry: true,
  },
};

const ERROR_COPY: Record<AuditErrorKind, { title: string; body: string; retry: boolean }> = {
  unreachable: {
    title: "Nie mogłem otworzyć tej strony.",
    body: "Test z serwerów Google nie dotarł pod ten adres. Sprawdź, czy adres jest poprawny i czy strona działa. Jeśli u Ciebie otwiera się normalnie, a tu nie — strona może blokować zewnętrzne testy albo odpowiadać bardzo wolno.",
    retry: true,
  },
  timeout: {
    title: "Ta strona ładuje się tak wolno, że test nie zdążył jej przeczytać.",
    body: "To już jest wynik — klienci na telefonie najpewniej czekają równie długo. Spróbuj jeszcze raz albo zostaw ten przypadek mnie.",
    retry: true,
  },
  quota: {
    title: "Dzisiejszy limit darmowych testów jest wyczerpany.",
    body: "Google ogranicza liczbę automatycznych testów dziennie. Wróć jutro albo zostaw adres — zrobię audyt ręcznie.",
    retry: false,
  },
  config: {
    title: "Automatyczny test jest chwilowo niedostępny.",
    body: "To awaria po mojej stronie, nie Twojej. Zostaw adres — zrobię audyt ręcznie.",
    retry: false,
  },
  network: {
    title: "Brak połączenia z serwerem testów.",
    body: "Sprawdź internet (albo wyłącz blokery reklam dla tej strony) i spróbuj ponownie.",
    retry: true,
  },
  unknown: {
    title: "Test nie wyszedł.",
    body: "Google zwróciło nieoczekiwany błąd. Zwykle pomaga ponowna próba za chwilę.",
    retry: true,
  },
};

export function AuditTool() {
  const locale = useLocale();
  const en = locale === "en";
  const errors = en ? ERROR_COPY_EN : ERROR_COPY;
  const [state, setState] = useState<State>({ status: "idle" });
  const [input, setInput] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  useEffect(() => {
    if (state.status === "idle") return;
    const id = requestAnimationFrame(() => {
      const el = outputRef.current;
      if (!el) return;
      const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 64;
      scrollToY(Math.max(0, el.getBoundingClientRect().top + window.scrollY - header - 16));
    });
    return () => cancelAnimationFrame(id);
  }, [state.status]);

  const run = useCallback(async (raw: string) => {
    const check = normalizeUrl(raw, locale);
    if (!check.ok) {
      setFieldError(check.reason);
      inputRef.current?.focus();
      return;
    }
    setFieldError(null);
    setInput(check.display);
    try {
      window.history.replaceState(null, "", localizeHref(`/audyt?url=${encodeURIComponent(check.display)}`, locale));
    } catch {
    }

    abortRef.current?.abort();
    const ctl = new AbortController();
    abortRef.current = ctl;

    const cached = readCache(check.url, locale);
    if (cached) {
      setState({ status: "done", data: cached });
      return;
    }

    setState({ status: "running", url: check.url, display: check.display });
    track("audyt-start", { jezyk: locale });
    try {
      const { runAudit } = await import("./psi");
      const data = await runAudit(check.url, check.display, ctl.signal, locale);
      if (ctl.signal.aborted) return;
      writeCache(data, locale);
      setState({ status: "done", data });
    } catch (err) {
      if (ctl.signal.aborted) return;
      const kind = (err as { kind?: AuditErrorKind }).kind ?? "unknown";
      setState({ status: "error", url: check.url, display: check.display, kind });
    }
  }, [locale]);

  const cancel = useCallback(() => {
    abortRef.current?.abort();
    setState({ status: "idle" });
    inputRef.current?.focus();
  }, []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setState({ status: "idle" });
    setInput("");
    try {
      window.history.replaceState(null, "", localizeHref("/audyt", locale));
    } catch {
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 300);
  }, [locale]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void run(input);
  }

  const busy = state.status === "running";

  return (
    <div>
      <Suspense fallback={null}>
        <QueryRunner onUrl={run} />
      </Suspense>

      <form onSubmit={onSubmit} noValidate className="max-w-4xl">
        <label htmlFor="audit-url" className="label-mono text-mute">
          {en ? "Your website address" : "Adres Twojej strony"}
        </label>
        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end">
          <input
            ref={inputRef}
            id="audit-url"
            name="url"
            type="text"
            inputMode="url"
            autoComplete="url"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            placeholder={en ? "yourcompany.com" : "twojafirma.pl"}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (fieldError) setFieldError(null);
            }}
            aria-invalid={fieldError ? true : undefined}
            aria-describedby={fieldError ? "audit-url-error" : "audit-url-help"}
            className="h-16 w-full min-w-0 border-b-2 border-ink bg-transparent font-display text-[length:var(--text-big)] font-medium tracking-tight placeholder:text-ink/25 focus:outline-none focus-visible:border-signal"
          />
          <Button type="submit" variant="signal" size="lg" arrow disabled={busy} className="shrink-0">
            {busy ? (en ? "Testing…" : "Testuję…") : en ? "Check the site" : "Sprawdź stronę"}
          </Button>
        </div>
        {fieldError ? (
          <p id="audit-url-error" role="alert" className="mt-3 flex items-center gap-2 text-sm font-medium">
            <i aria-hidden className="size-2 rounded-full bg-signal" />
            {fieldError}
          </p>
        ) : (
          <p id="audit-url-help" className="mt-3 text-sm text-mute">
            {en
              ? "No sign-up and no e-mail needed. Just the address, e.g. yourcompany.com."
              : "Bez rejestracji i bez podawania maila. Wystarczy sam adres, np. twojafirma.pl."}
          </p>
        )}
      </form>

      <div ref={outputRef} className="mt-14" aria-busy={busy}>
        {state.status === "running" && <AuditProgress display={state.display} onCancel={cancel} />}

        {state.status === "error" && (
          <div role="alert" className="border-t hairline pt-8">
            <p className="label-mono text-mute">
              {en ? "It didn’t work" : "Nie udało się"} · {state.display}
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-[length:var(--text-big)] font-semibold text-balance">
              {errors[state.kind].title}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-mute">{errors[state.kind].body}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink
                href={localizeHref(
                  contactHref({
                    zrodlo: "audyt",
                    url: state.url,
                    usluga: "redesign-strony",
                    opis: en
                      ? "Please audit this site by hand — the automated test didn’t work."
                      : "Proszę o ręczny audyt tej strony — automatyczny test nie zadziałał.",
                  }),
                  locale,
                )}
                variant="signal"
                size="lg"
                arrow
              >
                {en ? "I’ll do this audit by hand and send it within 24h" : "Zrobię ten audyt ręcznie i odeślę w 24h"}
              </ButtonLink>
              {errors[state.kind].retry && (
                <Button variant="ghost" size="lg" onClick={() => void run(state.url)}>
                  {en ? "Try again" : "Spróbuj ponownie"}
                </Button>
              )}
              <a href={site.phoneHref} className={buttonClass("ghost", "lg")}>
                <span className="relative">{en ? "Call" : "Zadzwoń"}</span>
              </a>
            </div>
          </div>
        )}

        {state.status === "done" && <AuditResult data={state.data} onReset={reset} />}
      </div>
    </div>
  );
}
