"use client";

import "./signature.css";
import { useEffect, useState } from "react";
import type { IndustrySlug } from "@/content/projects";
import { Button, ButtonLink } from "@/components/ui/button";
import { CtaBand } from "@/components/ui/cta-band";
import { Accent } from "@/components/ui/section-head";
import { localizeHref } from "@/i18n/config";
import { useLocale } from "@/i18n/client";
import { contactHref } from "@/lib/utils";
import { PreviewControls } from "./controls";
import { displayName, previewPath, slugDomain, type Device, type PreviewState } from "./preview-model";
import { PreviewSite } from "./preview-site";
import { Toast, useShareLink } from "./share";
import { DeviceToggle, PhoneScreen, type SiteTheme } from "./stage";
import { useMedia } from "./use-media";

const COPY = {
  pl: {
    for: "Podgląd strony dla ",
    by: " · przygotowany przez bartekstrony.pl",
    done: "Gotowe",
    edit: "Zmień",
    share: "Wyślij link",
    want: "Chcę taką stronę",
    note: (
      <>
        To koncepcja demo, złożona automatycznie na podstawie branży. Prawdziwy projekt powstaje indywidualnie — pod Twoją firmę,
        Twoje zdjęcia i&nbsp;Twoich klientów.
      </>
    ),
    title: (
      <>
        Podoba Ci się? Zróbmy <Accent>prawdziwą</Accent>.
      </>
    ),
    lead: "Napisz albo zadzwoń — w 24 godziny dostaniesz wycenę i plan strony dla Twojej firmy. Bez zobowiązań.",
  },
  en: {
    for: "Website preview for ",
    by: " · prepared by bartekstrony.pl",
    done: "Done",
    edit: "Change",
    share: "Send link",
    want: "I want this website",
    note: (
      <>
        A demo concept, assembled automatically from your industry — in Polish, as your customers in Poland would see it. The
        real project is made individually: for your business, your photos and your customers, in any language you need.
      </>
    ),
    title: (
      <>
        Like it? Let’s make the <Accent>real one</Accent>.
      </>
    ),
    lead: "Write or call — within 24 hours you’ll get a quote and a plan for your business’s website. No strings attached.",
  },
};

export function FullPreview({ initial }: { initial: PreviewState }) {
  const locale = useLocale();
  const c = COPY[locale];
  const [state, setState] = useState(initial);
  const [editing, setEditing] = useState(false);
  const [device, setDevice] = useState<Device>("desktop");
  const [theme, setTheme] = useState<SiteTheme | null>(null);
  const wide = useMedia("(min-width: 900px)");
  const phone = wide && device === "mobile";
  const { share, toast } = useShareLink();

  const [settled, setSettled] = useState({ name: initial.name, city: initial.city });
  useEffect(() => {
    const t = window.setTimeout(() => setSettled({ name: state.name, city: state.city }), 150);
    return () => window.clearTimeout(t);
  }, [state.name, state.city]);
  const site: PreviewState = { ...state, name: settled.name, city: settled.city };

  const path = localizeHref(previewPath(state), locale);
  useEffect(() => {
    const t = window.setTimeout(() => {
      if (path !== window.location.pathname + window.location.search) window.history.replaceState(null, "", path);
    }, 400);
    return () => window.clearTimeout(t);
  }, [path]);

  const name = displayName(state);
  const lead = {
    firma: state.name.trim() || undefined,
    branza: state.industry,
    miasto: state.city.trim() || undefined,
    podglad: path,
  };
  const contact = localizeHref(contactHref({ zrodlo: "podglad", ...lead }), locale);
  const update = (patch: Partial<PreviewState>) => setState((s) => ({ ...s, ...patch }));

  return (
    <div className="pt-[var(--header-h)]">
      <div className="sticky top-[var(--header-h)] z-40 border-b hairline bg-paper transition-[translate] duration-500 ease-[var(--ease-out)] [body:has(header[data-hidden=true])_&]:-translate-y-(--header-h)">
        <div className="container-x flex min-h-16 items-center gap-2 py-2.5 sm:gap-3">
          <p className="min-w-0 flex-1 text-[0.95rem] leading-snug">
            <span className="text-mute">{c.for}</span>
            <strong className="font-semibold">{name}</strong>
            <span className="text-mute max-lg:hidden">{c.by}</span>
          </p>
          <Button
            type="button"
            variant="ghost"
            aria-expanded={editing}
            aria-controls="podglad-edycja"
            onClick={() => setEditing((v) => !v)}
            className="max-sm:px-4"
          >
            {editing ? c.done : c.edit}
          </Button>
          <Button type="button" variant="ghost" onClick={() => share(path, name)} className="max-md:hidden">
            {c.share}
          </Button>
          <ButtonLink href={contact} variant="signal" arrow className="max-sm:hidden">
            {c.want}
          </ButtonLink>
        </div>
        {editing && (
          <div id="podglad-edycja" className="border-t hairline">
            <div className="container-x grid gap-6 py-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <PreviewControls
                id="edit"
                size="panel"
                state={state}
                onName={(name) => update({ name })}
                onIndustry={(industry: IndustrySlug) => update({ industry })}
                onCity={(city) => update({ city })}
                onVibe={(vibe) => update({ vibe })}
                onSubmit={() => setEditing(false)}
              />
              <div className="flex flex-wrap items-center gap-2">
                {wide && <DeviceToggle id="edit" device={device} onChange={setDevice} />}
                <Button type="button" variant="ghost" onClick={() => share(path, name)} className="md:hidden">
                  {c.share}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="container-x flex flex-wrap items-center justify-between gap-3 py-4">
        <p className="max-w-[70ch] text-sm leading-relaxed text-mute">{c.note}</p>
        <ButtonLink href={contact} variant="signal" size="md" arrow className="sm:hidden">
          {c.want}
        </ButtonLink>
      </div>

      {phone ? (
        <div className="sg-backdrop flex justify-center border-y hairline py-10">
          <PhoneScreen theme={theme} className="aspect-[409/840] h-[min(860px,calc(100svh-180px))]">
            <div className="sg-stage-viewport w-full overflow-y-auto" data-lenis-prevent>
              <PreviewSite state={site} mode="page" onTheme={setTheme} />
            </div>
          </PhoneScreen>
        </div>
      ) : (
        <div className="sm:container-x">
          <div className="overflow-hidden border-y hairline bg-paper sm:rounded-[var(--radius)] sm:border sm:border-ink/12 sm:shadow-[0_40px_90px_-50px_rgb(0_0_0/0.45)]">
            <div className="flex h-10 items-center gap-3 border-b border-ink/10 px-3.5" aria-hidden="true">
              <span className="flex shrink-0 gap-1.5">
                <i className="size-2.5 rounded-full bg-ink/15" />
                <i className="size-2.5 rounded-full bg-ink/15" />
                <i className="size-2.5 rounded-full bg-ink/15" />
              </span>
              <span className="mx-auto max-w-[70%] truncate rounded-full bg-ink/5 px-3 py-1 font-mono text-[11px] text-ink/60">
                {slugDomain(displayName(site))}
              </span>
              <span className="w-[52px] shrink-0" />
            </div>
            <PreviewSite state={site} mode="page" />
          </div>
        </div>
      )}

      <div className="mt-16">
        <CtaBand
          source="podglad"
          extra={Object.fromEntries(Object.entries(lead).filter(([, v]) => v)) as Record<string, string>}
          title={c.title}
          lead={c.lead}
        />
      </div>
      <Toast message={toast} />
    </div>
  );
}
