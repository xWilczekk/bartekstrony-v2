"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/i18n/client";

const COPY = {
  pl: {
    title: "Tryb rentgena",
    sub: "Tak zbudowana jest ta strona. Najedź na dowolny element, żeby go zbadać.",
    elements: "elementów DOM",
    sections: "sekcji",
    load: "załadowano w",
    weight: "przesłano",
    close: "Wyłącz",
    stack: "Next.js 16 · React 19 · Tailwind 4 · TypeScript",
  },
  en: {
    title: "X-ray mode",
    sub: "This is how this site is built. Hover any element to inspect it.",
    elements: "DOM elements",
    sections: "sections",
    load: "loaded in",
    weight: "transferred",
    close: "Turn off",
    stack: "Next.js 16 · React 19 · Tailwind 4 · TypeScript",
  },
};

const CSS = `
html[data-xray] main section, html[data-xray] body > header, html[data-xray] footer[data-site-footer] {
  outline: 1.5px dashed #c6f36b !important; outline-offset: -1.5px; position: relative;
}
html[data-xray] main :is(h1, h2, h3, p, img, ul, ol, dl, form, article, figure, a[class*="rounded"], button) {
  outline: 1px solid rgb(198 243 107 / 0.55) !important; outline-offset: 0;
}
html[data-xray] main .container-x { box-shadow: inset 0 0 0 1px rgb(79 70 229 / 0.25); }
.bs-xray-tag {
  position: absolute; z-index: 60; top: 0; left: 0; pointer-events: none;
  font: 600 11px/1 ui-monospace, SFMono-Regular, Menlo, monospace; color: #10201a;
  background: #c6f36b; padding: 4px 6px; border-bottom-right-radius: 6px; white-space: nowrap;
}
.bs-xray-grid { position: fixed; inset: 0; z-index: 55; pointer-events: none; }
.bs-xray-grid > div { height: 100%; display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 1.5rem; }
.bs-xray-grid i { background: rgb(79 70 229 / 0.06); border-inline: 1px solid rgb(79 70 229 / 0.18); }
.bs-xray-box { position: fixed; z-index: 85; pointer-events: none; border: 1.5px solid #4f46e5; background: rgb(79 70 229 / 0.1); transition: all 80ms linear; }
.bs-xray-tip {
  position: fixed; z-index: 86; pointer-events: none; max-width: min(420px, calc(100vw - 24px));
  font: 12px/1.4 ui-monospace, SFMono-Regular, Menlo, monospace; color: #fff; background: #1e1b4b;
  padding: 6px 8px; border-radius: 6px; box-shadow: 0 10px 30px -10px rgb(0 0 0 / .5);
}
.bs-xray-tip b { color: #c6f36b; font-weight: 600; }
.bs-xray-tip span { color: #a5b4fc; }
`;

function labelFor(el: HTMLElement) {
  const tag = el.tagName.toLowerCase();
  const name =
    el.id ||
    el.getAttribute("aria-label") ||
    el.querySelector("h1, h2")?.textContent?.trim().slice(0, 32) ||
    (tag === "header" ? "SiteHeader" : tag === "footer" ? "SiteFooter" : "");
  const r = el.getBoundingClientRect();
  return `<${tag}>${name ? ` ${name}` : ""} · ${Math.round(r.width)}×${Math.round(r.height)}`;
}

export default function XRay({ onClose }: { onClose: () => void }) {
  const locale = useLocale();
  const c = COPY[locale];
  const closeRef = useRef<HTMLButtonElement>(null);
  const [stats, setStats] = useState({ elements: 0, sections: 0, loadMs: 0, kb: 0 });

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.xray = "";

    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);

    const targets = [
      ...document.querySelectorAll<HTMLElement>("body > header, main section, footer[data-site-footer]"),
    ].filter((el) => el.getBoundingClientRect().height > 40);
    const tags = targets.map((el) => {
      const t = document.createElement("span");
      t.className = "bs-xray-tag";
      t.textContent = labelFor(el);
      el.appendChild(t);
      return t;
    });

    const grid = document.createElement("div");
    grid.className = "bs-xray-grid";
    grid.innerHTML = `<div class="container-x">${"<i></i>".repeat(12)}</div>`;
    document.body.appendChild(grid);

    const box = document.createElement("div");
    box.className = "bs-xray-box";
    const tip = document.createElement("div");
    tip.className = "bs-xray-tip";
    tip.style.display = "none";
    box.style.display = "none";
    document.body.append(box, tip);
    let raf = 0;
    let px = 0;
    let py = 0;
    const inspect = () => {
      raf = 0;
      const el = document.elementFromPoint(px, py) as HTMLElement | null;
      if (!el || el.closest(".bs-xray-hud") || el === document.body || el === root) {
        box.style.display = tip.style.display = "none";
        return;
      }
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      Object.assign(box.style, { display: "block", left: `${r.left}px`, top: `${r.top}px`, width: `${r.width}px`, height: `${r.height}px` });
      const cls = [...el.classList].filter((k) => !k.startsWith("bs-")).slice(0, 4).join(".");
      tip.innerHTML = "";
      const b = document.createElement("b");
      b.textContent = el.tagName.toLowerCase() + (cls ? `.${cls}` : "");
      const meta = document.createElement("span");
      meta.textContent = ` ${Math.round(r.width)}×${Math.round(r.height)} · ${cs.fontSize} ${cs.fontFamily.split(",")[0].replace(/["']/g, "")}${cs.display === "grid" ? " · grid" : cs.display === "flex" ? " · flex" : ""}`;
      tip.append(b, meta);
      tip.style.display = "block";
      const tw = tip.offsetWidth;
      const th = tip.offsetHeight;
      tip.style.left = `${Math.min(window.innerWidth - tw - 12, Math.max(12, r.left))}px`;
      tip.style.top = `${r.top - th - 6 > 8 ? r.top - th - 6 : Math.min(window.innerHeight - th - 8, r.bottom + 6)}px`;
    };
    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!raf) raf = requestAnimationFrame(inspect);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(inspect);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);

    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const bytes = (performance.getEntriesByType("resource") as PerformanceResourceTiming[]).reduce(
      (sum, r) => sum + (r.transferSize || 0),
      nav?.transferSize ?? 0,
    );
    const id = requestAnimationFrame(() =>
      setStats({
        elements: document.querySelectorAll("body *").length,
        sections: targets.length,
        loadMs: nav ? Math.round(nav.loadEventEnd || nav.domContentLoadedEventEnd) : 0,
        kb: Math.round(bytes / 1024),
      }),
    );
    closeRef.current?.focus();

    return () => {
      cancelAnimationFrame(id);
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      tags.forEach((t) => t.remove());
      [style, grid, box, tip].forEach((n) => n.remove());
      delete root.dataset.xray;
    };
  }, [onClose]);

  const n = (v: number) => v.toLocaleString(locale === "en" ? "en-US" : "pl-PL");
  return (
    <div
      role="dialog"
      aria-label={c.title}
      className="bs-xray-hud fixed bottom-4 left-4 z-[96] w-[min(22rem,calc(100vw-2rem))] rounded-[calc(var(--radius)+4px)] bg-[#1e1b4b] p-4 font-mono text-[12px] leading-relaxed text-white shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)]"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 font-semibold text-[#c6f36b]">
          <span className="size-2 rounded-full bg-[#c6f36b] motion-safe:animate-pulse" />
          {c.title}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="rounded-md border border-white/20 px-2 py-1 text-white/80 transition-colors hover:border-white hover:text-white"
        >
          {c.close} · Esc
        </button>
      </div>
      <p className="mt-2 text-white/70">{c.sub}</p>
      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 border-t border-white/15 pt-3">
        <div>
          <dt className="text-white/50">{c.elements}</dt>
          <dd className="text-base font-semibold">{n(stats.elements)}</dd>
        </div>
        <div>
          <dt className="text-white/50">{c.sections}</dt>
          <dd className="text-base font-semibold">{n(stats.sections)}</dd>
        </div>
        <div>
          <dt className="text-white/50">{c.load}</dt>
          <dd className="text-base font-semibold">{stats.loadMs ? `${(stats.loadMs / 1000).toFixed(2)} s` : "—"}</dd>
        </div>
        <div>
          <dt className="text-white/50">{c.weight}</dt>
          <dd className="text-base font-semibold">{stats.kb ? `${n(stats.kb)} KB` : "—"}</dd>
        </div>
      </dl>
      <p className="mt-3 border-t border-white/15 pt-3 text-white/60">{c.stack}</p>
    </div>
  );
}
