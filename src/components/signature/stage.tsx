"use client";

import dynamic from "next/dynamic";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { useLocale } from "@/i18n/client";
import { cn } from "@/lib/utils";
import { resolveVariant, displayName, slugDomain, type Device, type PreviewState } from "./preview-model";
import { TypeText } from "./type-text";
import { prefersReducedMotion } from "./use-media";

const scrollEl = (el: HTMLElement | null, y: number) =>
  el?.scrollTo({ top: Math.max(0, y), behavior: prefersReducedMotion() ? "auto" : "smooth" });

const LazySite = dynamic(() => import("./preview-site").then((m) => m.PreviewSite), {
  ssr: false,
  loading: () => null,
});

const VIRTUAL: Record<Device, number> = { desktop: 1280, mobile: 390 };

function Skeleton({ device }: { device: Device }) {
  const desk = device === "desktop";
  return (
    <div className="sg-skel" aria-hidden="true">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <i className="size-6 rounded-md" />
          <i className="h-2.5 w-20" />
        </div>
        {desk ? (
          <div className="flex items-center gap-4">
            <i className="h-2 w-10" />
            <i className="h-2 w-10" />
            <i className="h-2 w-10" />
            <i className="h-6 w-20 rounded-full" />
          </div>
        ) : (
          <i className="size-6 rounded-md" />
        )}
      </div>
      <div className={cn("mt-[9%] grid gap-[6%]", desk ? "grid-cols-[1.1fr_0.9fr] items-center" : "grid-cols-1")}>
        <div className="space-y-3">
          <i className="h-3 w-24 rounded-full" />
          <i className="h-[clamp(1.2rem,4.2cqw,3rem)] w-[88%]" />
          <i className="h-[clamp(1.2rem,4.2cqw,3rem)] w-[64%]" />
          <i className="!mt-5 h-2 w-[80%]" />
          <i className="h-2 w-[60%]" />
          <div className="!mt-5 flex gap-2">
            <i className="h-7 w-24 rounded-full" />
            <i className="h-7 w-24 rounded-full" />
          </div>
        </div>
        <div className="sg-skel-img aspect-square w-full" />
      </div>
    </div>
  );
}

const DeviceIcon = ({ device }: { device: Device }) =>
  device === "desktop" ? (
    <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="2.5" y="3.5" width="15" height="10" rx="1.5" />
      <path d="M7 16.5h6M10 13.5v3" />
    </svg>
  ) : (
    <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="5.5" y="2.5" width="9" height="15" rx="2" />
      <path d="M9 14.5h2" />
    </svg>
  );

export function DeviceToggle({ id, device, onChange }: { id: string; device: Device; onChange: (d: Device) => void }) {
  const en = useLocale() === "en";
  return (
    <fieldset className="inline-flex rounded-full border border-ink/15 p-0.5">
      <legend className="sr-only">{en ? "Preview view" : "Widok podglądu"}</legend>
      {(["desktop", "mobile"] as const).map((d) => (
        <label key={d} className="cursor-pointer">
          <input type="radio" name={`${id}-device`} value={d} checked={device === d} onChange={() => onChange(d)} className="peer sr-only" />
          <span className="inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-[0.85rem] font-medium text-ink/70 transition-colors select-none hover:text-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-signal">
            <DeviceIcon device={d} />
            {d === "desktop" ? (en ? "Desktop" : "Komputer") : en ? "Phone" : "Telefon"}
          </span>
        </label>
      ))}
    </fieldset>
  );
}

export type SiteTheme = { bg: string; ink: string };

export function PhoneScreen({ theme, className, children }: { theme: SiteTheme | null; className?: string; children: ReactNode }) {
  return (
    <div className={cn("sg-phone", className)}>
      <div className="sg-phone-screen" style={theme ? { backgroundColor: theme.bg, color: theme.ink } : undefined}>
        <div className="sg-statusbar" aria-hidden="true">
          <span>9:41</span>
          <span className="flex items-center gap-1.5">
            <svg viewBox="0 0 18 12" fill="currentColor">
              <rect x="0" y="8" width="3" height="4" rx="1" />
              <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
              <rect x="10" y="3" width="3" height="9" rx="1" />
              <rect x="15" y="0" width="3" height="12" rx="1" />
            </svg>
            <svg viewBox="0 0 16 12" fill="currentColor">
              <path d="M8 2.2c2.4 0 4.6.9 6.2 2.5l1.3-1.4A10.6 10.6 0 0 0 8 .2 10.6 10.6 0 0 0 .5 3.3l1.3 1.4A8.7 8.7 0 0 1 8 2.2Zm0 3.8c1.4 0 2.6.5 3.6 1.4l1.3-1.4A7.1 7.1 0 0 0 8 4a7.1 7.1 0 0 0-4.9 2l1.3 1.4C5.4 6.5 6.6 6 8 6Zm0 3.6a1.6 1.6 0 0 0-1.2.5L8 11.4l1.2-1.3A1.6 1.6 0 0 0 8 9.6Z" />
            </svg>
            <svg viewBox="0 0 26 12" fill="none" stroke="currentColor">
              <rect x="0.5" y="0.5" width="22" height="11" rx="3" opacity="0.45" />
              <rect x="2.5" y="2.5" width="15" height="7" rx="1.5" fill="currentColor" stroke="none" />
              <path d="M24.5 4v4" strokeWidth="1.6" strokeLinecap="round" opacity="0.45" />
            </svg>
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

export type StageProps = {
  state: PreviewState;
  device: Device;
  armed: boolean;
  overlay?: ReactNode;
  className?: string;
  onBuildDone?: () => void;
  brand?: boolean;
};

export function Stage({ state, device, armed, overlay, className, onBuildDone, brand }: StageProps) {
  const en = useLocale() === "en";
  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [scroll, setScroll] = useState({ top: 0, max: 0 });
  const [theme, setTheme] = useState<SiteTheme | null>(null);
  const [styled, setStyled] = useState(false);
  const virtual = VIRTUAL[device];
  const scale = box.w ? box.w / virtual : 0;

  const onTheme = useCallback((t: SiteTheme) => {
    setTheme(t);
    const check = (tries: number) => {
      const pv = contentRef.current?.firstElementChild;
      if ((pv && getComputedStyle(pv).getPropertyValue("--pv-ready").trim() === "1") || tries > 300) setStyled(true);
      else requestAnimationFrame(() => check(tries + 1));
    };
    check(0);
  }, []);
  const live = armed && scale > 0 && styled;

  const name = displayName(state);
  const variant = resolveVariant(state.industry, name);
  const buildKey = `${state.industry}:${variant ?? "base"}:${state.vibe}:${device}`;

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setBox((b) => (Math.abs(b.w - width) < 0.5 && Math.abs(b.h - height) < 0.5 ? b : { w: width, h: height }));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [device]);

  const syncScroll = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const max = Math.max(0, el.scrollHeight - el.clientHeight);
    setScroll((s) => (Math.abs(s.top - el.scrollTop) < 0.5 && Math.abs(s.max - max) < 0.5 ? s : { top: el.scrollTop, max }));
  }, []);

  const [siteH, setSiteH] = useState(0);
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const ro = new ResizeObserver(() => setSiteH(content.offsetHeight));
    ro.observe(content);
    return () => ro.disconnect();
  }, [device]);
  useEffect(syncScroll, [syncScroll, siteH, scale]);

  useEffect(() => {
    const el = viewportRef.current;
    if (el) el.scrollTop = 0;
    const t = window.setTimeout(() => onBuildDone?.(), 1300);
    return () => window.clearTimeout(t);
  }, [buildKey, onBuildDone]);

  const goto = useCallback(
    (id: string) => {
      const el = viewportRef.current;
      if (!el || !scale) return;
      if (id === "top") return void scrollEl(el, 0);
      const sec = el.querySelector<HTMLElement>(`[data-sec="${CSS.escape(id)}"]`);
      if (sec) scrollEl(el, sec.offsetTop * scale);
    },
    [scale],
  );

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const el = viewportRef.current;
    if (!el) return;
    const page = el.clientHeight * 0.85;
    const map: Record<string, number> = {
      ArrowDown: 80,
      ArrowUp: -80,
      PageDown: page,
      PageUp: -page,
      " ": e.shiftKey ? -page : page,
    };
    if (e.key === "Home") scrollEl(el, 0);
    else if (e.key === "End") scrollEl(el, el.scrollHeight);
    else if (e.key in map) scrollEl(el, el.scrollTop + map[e.key]);
    else return;
    e.preventDefault();
  };

  const railRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ offset: number } | null>(null);
  const viewH = box.h || 1;
  const contentH = viewH + scroll.max;
  const thumbH = Math.max(36, (viewH / contentH) * (viewH - 16));
  const thumbTop = scroll.max ? (scroll.top / scroll.max) * (viewH - 16 - thumbH) : 0;

  const railToScroll = (clientY: number, offset: number) => {
    const rail = railRef.current;
    const el = viewportRef.current;
    if (!rail || !el) return;
    const r = rail.getBoundingClientRect();
    const span = r.height - thumbH;
    const ratio = span > 0 ? Math.min(1, Math.max(0, (clientY - r.top - offset) / span)) : 0;
    el.scrollTop = ratio * scroll.max;
  };
  const onRailDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const onThumb = e.clientY - r.top >= thumbTop && e.clientY - r.top <= thumbTop + thumbH;
    const offset = onThumb ? e.clientY - r.top - thumbTop : thumbH / 2;
    drag.current = { offset };
    e.currentTarget.setPointerCapture(e.pointerId);
    railToScroll(e.clientY, offset);
  };
  const onRailMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (drag.current) railToScroll(e.clientY, drag.current.offset);
  };
  const onRailUp = () => {
    drag.current = null;
  };

  const desktop = device === "desktop";
  const viewport = (
    <div className={cn("relative", !desktop && "flex min-h-0 flex-1 flex-col")}>
      <div
        ref={viewportRef}
        className={cn("sg-stage-viewport @container", desktop ? "h-[calc(100cqw*0.64)] lg:h-[calc(var(--stage-h)-2.5rem)]" : "w-full")}
        tabIndex={0}
        role="region"
        aria-label={en ? `Website preview: ${name}. Scroll with the arrow keys.` : `Podgląd strony ${name}. Przewijaj strzałkami.`}
        onKeyDown={onKeyDown}
        onScroll={syncScroll}
        style={{ "--scan-h": `${box.h}px` } as CSSProperties}
      >
        <div className="overflow-hidden" style={scale ? { height: siteH * scale } : undefined}>
          <div
            ref={contentRef}
            className="sg-stage-content"
            style={{ width: virtual, transform: scale ? `scale(${scale})` : undefined, visibility: live ? "visible" : "hidden" }}
            aria-hidden="true"
          >
            {armed && scale > 0 && <LazySite state={state} mode="frame" onGoto={goto} onTheme={onTheme} brand={brand} />}
          </div>
        </div>
        {!live && <Skeleton device={device} />}
        {live && (
          <div key={buildKey} className="sg-scan" aria-hidden="true">
            <span className="sg-scan-tag">{en ? "Building the site" : "Składam stronę"}</span>
          </div>
        )}
      </div>
      {scroll.max > 8 && (
        <div
          ref={railRef}
          className="sg-rail max-lg:hidden"
          onPointerDown={onRailDown}
          onPointerMove={onRailMove}
          onPointerUp={onRailUp}
          onPointerCancel={onRailUp}
          aria-hidden="true"
        >
          <div className="sg-thumb" style={{ top: thumbTop, height: thumbH }} />
        </div>
      )}
    </div>
  );

  return (
    <div className={cn("@container relative", className)}>
      {desktop ? (
        <div className="overflow-hidden rounded-[var(--radius)] border border-ink/12 bg-paper shadow-[0_40px_90px_-45px_rgb(0_0_0/0.45)]">
          <div className="flex h-10 items-center gap-3 border-b border-ink/10 bg-paper px-3.5">
            <span className="flex shrink-0 gap-1.5" aria-hidden="true">
              <i className="size-2.5 rounded-full bg-ink/15" />
              <i className="size-2.5 rounded-full bg-ink/15" />
              <i className="size-2.5 rounded-full bg-ink/15" />
            </span>
            <span className="mx-auto flex min-w-0 max-w-[70%] items-center gap-1.5 truncate rounded-full bg-ink/5 px-3 py-1 font-mono text-[11px] text-ink/60">
              <svg viewBox="0 0 12 12" className="size-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
                <rect x="2.5" y="5.5" width="7" height="5" rx="1" />
                <path d="M4 5.5V4a2 2 0 0 1 4 0v1.5" />
              </svg>
              <TypeText text={slugDomain(name)} className="truncate" />
            </span>
            <span className="w-[52px] shrink-0" aria-hidden="true" />
          </div>
          {viewport}
        </div>
      ) : (
        <div className="sg-backdrop flex items-center justify-center rounded-[var(--radius)] border border-ink/10 py-4 lg:h-[var(--stage-h)]">
          <PhoneScreen theme={live ? theme : null} className="aspect-[409/840] h-[min(560px,150vw)] lg:h-[calc(var(--stage-h)-2rem)]">
            {viewport}
          </PhoneScreen>
        </div>
      )}
      {overlay}
    </div>
  );
}
