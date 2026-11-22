"use client";

import {
  useCallback,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";
import type { IndustrySlug } from "@/content/projects";
import { Button, ButtonLink } from "@/components/ui/button";
import { localizeHref } from "@/i18n/config";
import { useLocale } from "@/i18n/client";
import { contactHref } from "@/lib/utils";
import { PreviewControls } from "./controls";
import {
  DEFAULT_STATE,
  INDUSTRY_CHIP_EN,
  VIBES,
  VIBE_TEXT_EN,
  detectIndustry,
  displayName,
  metaFor,
  parsePreviewParams,
  previewPath,
  resolveVariant,
  type Device,
  type PreviewState,
} from "./preview-model";
import { Toast, useShareLink } from "./share";
import { DeviceToggle, Stage } from "./stage";
import { prefersReducedMotion, useMedia } from "./use-media";

const noopSubscribe = () => () => {};
const PREVIEW_KEYS = ["n", "b", "m", "s"];

const COPY = {
  pl: {
    ready: (name: string, chip: string, vibe: string) => `Podgląd gotowy: strona ${name} — ${chip}, styl ${vibe}.`,
    detected: "rozpoznana po nazwie",
    see: "Zobacz swoją stronę",
    building: "Składam Twoją stronę…",
    live: "Podgląd na żywo",
    want: "Chcę taką stronę",
    share: "Wyślij link",
    full: "Pełny podgląd",
    newTab: " (otwiera się w nowej karcie)",
    note: <>Szkic z&nbsp;Twojej branży. Prawdziwy projekt robię od zera.</>,
  },
  en: {
    ready: (name: string, chip: string, vibe: string) => `Preview ready: ${name} website — ${chip}, ${vibe} style.`,
    detected: "recognised from the name",
    see: "See your website",
    building: "Building your website…",
    live: "Live preview",
    want: "I want this website",
    share: "Send link",
    full: "Full preview",
    newTab: " (opens in a new tab)",
    note: <>A sketch for your industry, in Polish — as your customers in Poland would see it. The real one I design from scratch, in any language.</>,
  },
};

export function Generator({ intro }: { intro?: ReactNode }) {
  const locale = useLocale();
  const en = locale === "en";
  const c = COPY[locale];
  const search = useSyncExternalStore(noopSubscribe, () => window.location.search, () => "");
  const urlState = useMemo(() => {
    const p = new URLSearchParams(search);
    return PREVIEW_KEYS.some((k) => p.has(k)) ? parsePreviewParams(p) : null;
  }, [search]);
  const urlLocksIndustry = useMemo(() => new URLSearchParams(search).has("b"), [search]);

  const [own, setOwn] = useState<PreviewState | null>(null);
  const state = own ?? urlState ?? DEFAULT_STATE;
  const update = (patch: Partial<PreviewState>) => setOwn({ ...state, ...patch });

  const [industryTouched, setIndustryTouched] = useState(false);
  const [detected, setDetected] = useState<IndustrySlug | null>(null);
  const [userDevice, setUserDevice] = useState<Device | null>(null);
  const wide = useMedia("(min-width: 1024px)", true);
  const device: Device = userDevice ?? (wide ? "desktop" : "mobile");

  const [settled, setSettled] = useState({ name: state.name, city: state.city });
  const onSettle = useEffectEvent((name: string, city: string) => {
    setSettled({ name, city });
    if (industryTouched || urlLocksIndustry) return;
    const guess = detectIndustry(name);
    if (guess && guess !== state.industry) {
      setOwn({ ...state, industry: guess });
      setDetected(guess);
    }
  });
  useEffect(() => {
    const t = window.setTimeout(() => onSettle(state.name, state.city), 150);
    return () => window.clearTimeout(t);
  }, [state.name, state.city]);

  const previewState: PreviewState = { ...state, name: settled.name, city: settled.city };

  const [armed, setArmed] = useState(false);
  const stageWrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (armed) return;
    const el = stageWrap.current;
    if (!el) return;
    let cancelIdle = () => {};
    const armWhenIdle = () => {
      const go = () => setArmed(true);
      if (typeof window.requestIdleCallback === "function") {
        const id = window.requestIdleCallback(go, { timeout: 1500 });
        cancelIdle = () => window.cancelIdleCallback(id);
      } else {
        const id = setTimeout(go, 250);
        cancelIdle = () => clearTimeout(id);
      }
    };
    const onLoad = () => armWhenIdle();
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        if (document.readyState === "complete") armWhenIdle();
        else window.addEventListener("load", onLoad, { once: true });
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.removeEventListener("load", onLoad);
      cancelIdle();
    };
  }, [armed]);

  const name = displayName(previewState);
  const buildKey = `${previewState.industry}:${resolveVariant(previewState.industry, name) ?? "base"}:${previewState.vibe}:${device}`;
  const [builtKey, setBuiltKey] = useState<string | null>(null);
  const keyRef = useRef(buildKey);
  useEffect(() => {
    keyRef.current = buildKey;
  }, [buildKey]);
  const onBuildDone = useCallback(() => setBuiltKey(keyRef.current), []);
  const building = armed && builtKey !== buildKey;

  const [interacted, setInteracted] = useState(false);
  const [announce, setAnnounce] = useState("");
  const chip = en ? INDUSTRY_CHIP_EN[previewState.industry] : metaFor(previewState.industry).chip;
  const vibeLabel = en ? VIBE_TEXT_EN[previewState.vibe].label : (VIBES.find((v) => v.slug === previewState.vibe)?.label ?? "");
  const ready = c.ready;
  useEffect(() => {
    if (!interacted) return;
    const t = window.setTimeout(() => setAnnounce(ready(name, chip, vibeLabel)), 1300);
    return () => window.clearTimeout(t);
  }, [interacted, name, chip, vibeLabel, ready]);

  const touch = () => {
    if (!armed) setArmed(true);
    if (!interacted) setInteracted(true);
  };

  const { share, toast } = useShareLink();
  const path = localizeHref(previewPath(state), locale);
  const contact = localizeHref(contactHref({
    zrodlo: "podglad",
    firma: state.name.trim() || undefined,
    branza: state.industry,
    miasto: state.city.trim() || undefined,
    podglad: path,
  }), locale);

  const revealStage = () => {
    if (wide) return;
    (document.activeElement as HTMLElement | null)?.blur();
    stageWrap.current?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  };

  const hint =
    detected && detected === state.industry && !industryTouched ? (
      <span className="ml-auto inline-flex items-center gap-1.5 tracking-normal normal-case text-ink/70">
        <span className="size-1.5 rounded-full bg-signal" aria-hidden="true" />
        {c.detected}
      </span>
    ) : null;

  return (
    <div
      id="podglad"
      className="grid scroll-mt-[calc(var(--header-h)+1rem)] grid-cols-1 gap-y-10 [--stage-h:clamp(420px,calc(100svh-var(--header-h)-10.5rem),700px)] lg:grid-cols-12 lg:gap-x-10 xl:gap-x-14"
    >
      <div className="min-w-0 lg:col-span-5">
        {intro}
        <div
          className="sg-fade mt-7"
          style={{ "--d": "0.45s" } as CSSProperties}
          onFocusCapture={touch}
          onPointerDownCapture={touch}
        >
          <PreviewControls
            id="gen"
            size="compact"
            state={state}
            hint={hint}
            onName={(name) => update({ name })}
            onIndustry={(industry) => {
              setIndustryTouched(true);
              setDetected(null);
              update({ industry });
            }}
            onCity={(city) => update({ city })}
            onVibe={(vibe) => update({ vibe })}
            onSubmit={revealStage}
            after={
              <a
                href="#podglad-stage"
                onClick={touch}
                className="mt-4 inline-flex items-center gap-2 text-[0.95rem] font-medium text-ink underline decoration-signal decoration-2 underline-offset-4 lg:hidden"
              >
                {c.see}
                <span aria-hidden="true">↓</span>
              </a>
            }
          />
        </div>
      </div>

      <div
        ref={stageWrap}
        id="podglad-stage"
        className="sg-fade min-w-0 scroll-mt-[calc(var(--header-h)+0.75rem)] lg:sticky lg:top-[calc(var(--header-h)+1rem)] lg:col-span-7 lg:self-start"
        style={{ "--d": "0.3s" } as CSSProperties}
      >
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <p className="label-mono flex items-center gap-2.5 text-mute">
            <span className="sg-live" aria-hidden="true" />
            <span>{building ? c.building : c.live}</span>
          </p>
          <DeviceToggle
            id="gen"
            device={device}
            onChange={(d) => {
              touch();
              setUserDevice(d);
            }}
          />
        </div>

        <Stage
          state={previewState}
          brand={!own && !urlState}
          device={device}
          armed={armed}
          onBuildDone={onBuildDone}
          overlay={
            <div className="pointer-events-none sticky bottom-5 z-10 -mt-[60px] flex h-[60px] items-start justify-end pr-4 max-lg:hidden">
              <ButtonLink
                href={contact}
                variant="ink"
                arrow
                className="pointer-events-auto shadow-[0_18px_40px_-16px_rgb(0_0_0/0.55)]"
              >
                {c.want}
              </ButtonLink>
            </div>
          }
        />

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <ButtonLink href={contact} variant="ink" size="lg" arrow className="w-full sm:w-auto lg:hidden">
            {c.want}
          </ButtonLink>
          <Button type="button" variant="ghost" onClick={() => share(path, displayName(state))}>
            <ShareIcon />
            {c.share}
          </Button>
          <ButtonLink href={path} variant="ghost" target="_blank" rel="noopener" prefetch={false}>
            {c.full}
            <span className="sr-only">{c.newTab}</span>
            <span aria-hidden="true">↗</span>
          </ButtonLink>
          <p className="ml-auto max-w-[34ch] text-[0.8rem] leading-snug text-mute max-sm:mt-1 max-sm:ml-0">
            {c.note}
          </p>
        </div>
        <p className="sr-only" aria-live="polite">
          {announce}
        </p>
      </div>

      <Toast message={toast} />
    </div>
  );
}

const ShareIcon = () => (
  <svg viewBox="0 0 16 16" className="mr-0.5 inline size-4 align-[-2px]" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M8 10V2.5M5 5.5l3-3 3 3M3.5 8.5v4a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1v-4" />
  </svg>
);

