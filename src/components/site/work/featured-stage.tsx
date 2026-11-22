"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/components/motion/gsap";
import { scrollToY } from "@/components/motion/lenis-store";
import { useLocale } from "@/i18n/client";
import { pad, type StageProject } from "./data";

const CHROME = 36;
const BORDER = 2;
const VH_PER_UNIT = 0.42;
const DWELL = { viewport: 0.9, fullpage: 1.7 } as const;
const MORPH = 0.85;

export default function FeaturedStage({ projects, panels }: { projects: StageProject[]; panels: ReactNode[] }) {
  const en = useLocale() === "en";
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const n = projects.length;

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const pin = pinRef.current;
      if (!wrap || !pin) return;

      const q = gsap.utils.selector(pin);
      const one = (sel: string) => q(sel)[0] as HTMLElement;
      const all = (sel: string) => q(sel) as HTMLElement[];
      const stage = one("[data-stage]");
      const frame = one("[data-frame]");
      const counter = one("[data-counter]");
      const load = one("[data-load]");
      const layers = all("[data-layer]");
      const shots = all("[data-shot]");
      const tabs = all("[data-tab]");
      const panelEls = all("[data-panel]");
      const bars = all("[data-rail-bar]");
      const railItems = all("[data-rail-item]");

      const size = (i: number) => {
        const p = projects[i];
        const { width: W, height: H } = stage.getBoundingClientRect();
        if (p.kind === "viewport") {
          const a = p.width / p.height;
          const w = Math.min(W, (H - CHROME - BORDER) * a + BORDER);
          return { w, h: (w - BORDER) / a + CHROME + BORDER };
        }
        const h = Math.min(H, 940);
        return { w: Math.min(W, h * 0.6, 520), h };
      };
      const travel = (i: number) => {
        const p = projects[i];
        const s = size(i);
        const imgH = (s.w - BORDER) * (p.height / p.width);
        const viewH = s.h - CHROME - BORDER;
        return -Math.max(0, (1 - viewH / imgH) * 100);
      };

      let active = -1;
      const setActive = (idx: number) => {
        if (idx === active) return;
        active = idx;
        railItems.forEach((el, k) => {
          el.toggleAttribute("data-active", k === idx);
          if (k === idx) el.setAttribute("aria-current", "step");
          else el.removeAttribute("aria-current");
        });
      };

      const s0 = size(0);
      gsap.set(frame, { width: s0.w, height: s0.h });
      gsap.set(layers, { clipPath: (i: number) => (i === 0 ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)") });
      gsap.set(panelEls, { autoAlpha: (i: number) => (i === 0 ? 1 : 0) });
      gsap.set(tabs, { autoAlpha: (i: number) => (i === 0 ? 1 : 0) });
      gsap.set(bars, { scaleX: 0, transformOrigin: "0% 50%" });
      gsap.set(load, { scaleX: 0, autoAlpha: 0, transformOrigin: "0% 50%" });
      setActive(0);

      const mids: number[] = [];
      const total = projects.reduce((sum, p, i) => sum + DWELL[p.kind] + (i < n - 1 ? MORPH : 0), 0);

      const tl = gsap.timeline({
        defaults: { ease: "none", immediateRender: false },
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${Math.round(total * VH_PER_UNIT * window.innerHeight)}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 1,
          onUpdate: (self) => {
            const t = self.animation?.time() ?? 0;
            let idx = 0;
            while (idx < mids.length && t >= mids[idx]) idx++;
            setActive(idx);
          },
          onRefresh: (self) => {
            if (self.progress > 0) return;
            const s = size(0);
            gsap.set(frame, { width: s.w, height: s.h });
          },
        },
      });

      let t = 0;
      projects.forEach((p, i) => {
        const dwell = DWELL[p.kind];
        tl.addLabel(`p${i}`, t);
        tl.fromTo(
          frame,
          { width: () => size(i).w, height: () => size(i).h },
          { width: () => size(i).w, height: () => size(i).h, duration: dwell },
          t,
        );
        if (p.kind === "fullpage") {
          tl.fromTo(shots[i], { yPercent: 0 }, { yPercent: () => travel(i), duration: dwell, ease: "power1.inOut" }, t);
        } else {
          tl.fromTo(shots[i], { scale: 1 }, { scale: 1.05, duration: dwell }, t);
        }
        tl.fromTo(bars[i], { scaleX: 0 }, { scaleX: 1, duration: dwell }, t);
        t += dwell;

        if (i === n - 1) return;
        const j = i + 1;
        mids.push(t + MORPH / 2);

        tl.fromTo(
          frame,
          { width: () => size(i).w, height: () => size(i).h },
          { width: () => size(j).w, height: () => size(j).h, duration: MORPH, ease: "power3.inOut" },
          t,
        );
        tl.fromTo(
          layers[j],
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: MORPH, ease: "power3.inOut" },
          t,
        );
        tl.fromTo(layers[i], { scale: 1, autoAlpha: 1 }, { scale: 0.92, autoAlpha: 0.25, duration: MORPH, ease: "power2.in" }, t);
        tl.fromTo(load, { scaleX: 0, autoAlpha: 1 }, { scaleX: 1, autoAlpha: 1, duration: MORPH * 0.8, ease: "power2.out" }, t);
        tl.fromTo(load, { autoAlpha: 1 }, { autoAlpha: 0, duration: MORPH * 0.2 }, t + MORPH * 0.8);
        tl.fromTo(panelEls[i], { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -28, duration: MORPH * 0.45, ease: "power2.in" }, t);
        tl.fromTo(panelEls[j], { autoAlpha: 0, y: 36 }, { autoAlpha: 1, y: 0, duration: MORPH * 0.5, ease: "power3.out" }, t + MORPH * 0.5);
        tl.fromTo(tabs[i], { autoAlpha: 1, yPercent: 0 }, { autoAlpha: 0, yPercent: -70, duration: MORPH * 0.4 }, t + MORPH * 0.1);
        tl.fromTo(tabs[j], { autoAlpha: 0, yPercent: 70 }, { autoAlpha: 1, yPercent: 0, duration: MORPH * 0.4 }, t + MORPH * 0.5);
        tl.fromTo(
          counter,
          { yPercent: (-100 / n) * i },
          { yPercent: (-100 / n) * j, duration: MORPH * 0.6, ease: "power3.inOut" },
          t + MORPH * 0.2,
        );
        t += MORPH;
      });

      tlRef.current = tl;
      ScrollTrigger.refresh();
    },
    { scope: pinRef, dependencies: [projects], revertOnUpdate: true },
  );

  const goTo = (i: number) => {
    const tl = tlRef.current;
    const st = tl?.scrollTrigger;
    if (!tl || !st) return;
    const at = tl.labels[`p${i}`] ?? 0;
    scrollToY(Math.ceil(st.start + (st.end - st.start) * (at / tl.duration())) + (i === 0 ? 0 : 1));
  };

  return (
    <div ref={wrapRef} className="relative">
      <div ref={pinRef} className="relative h-screen overflow-hidden">
        <div className="container-x relative grid h-full grid-cols-12 grid-rows-[minmax(0,1fr)] gap-x-8 pb-8 pt-[calc(var(--header-h)+1.75rem)] xl:gap-x-12">
          <div className="col-span-5 flex min-h-0 flex-col">
            <p className="label-mono flex items-center gap-3 text-mute">
              <span>{en ? "Featured" : "Wyróżnione"}</span>
              <span aria-hidden className="h-px w-8 bg-current opacity-40" />
              <span className="inline-flex items-baseline gap-1.5 tabular-nums">
                <span className="relative inline-block h-[1.2em] overflow-hidden text-paper">
                  <span data-counter className="block">
                    {projects.map((p) => (
                      <span key={p.slug} className="block h-[1.2em] leading-[1.2em]">
                        {p.num}
                      </span>
                    ))}
                  </span>
                </span>
                <span>/ {pad(n)}</span>
              </span>
            </p>

            <div className="grid min-h-0 flex-1 items-center py-6 [@media(max-height:760px)]:py-4">
              {panels.map((panel, i) => (
                <div key={projects[i]?.slug ?? i} data-panel className="col-start-1 row-start-1">
                  {panel}
                </div>
              ))}
            </div>

            <ol aria-label={en ? "Go to project" : "Przejdź do realizacji"} className="grid border-t hairline">
              {projects.map((p, i) => (
                <li key={p.slug}>
                  <button
                    type="button"
                    data-rail-item
                    onClick={() => goTo(i)}
                    className="label-mono relative grid h-9 w-full grid-cols-[2.25rem_minmax(0,1fr)_auto] items-center gap-3 text-left text-mute transition-colors duration-300 hover:text-paper data-[active]:text-paper [@media(max-height:760px)]:h-7"
                  >
                    <span className="tabular-nums">{p.num}</span>
                    <span className="truncate">
                      <span className="sr-only">Pokaż: </span>
                      {p.title}
                    </span>
                    <span className="text-[0.62rem] opacity-60">{p.city}</span>
                    <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-line">
                      <span data-rail-bar className="block h-full bg-signal" />
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div data-stage className="col-span-7 flex min-h-0 items-center justify-center">
            <div
              data-frame
              className="relative overflow-hidden rounded-[var(--radius)] border border-white/10 bg-ink-2 shadow-[0_60px_140px_-50px_rgb(0_0_0/0.9)]"
            >
              <div className="relative flex h-9 items-center gap-3 border-b border-white/10 px-3">
                <span aria-hidden className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-white/15" />
                  <span className="size-2.5 rounded-full bg-white/15" />
                  <span className="size-2.5 rounded-full bg-white/15" />
                </span>
                <span aria-hidden className="relative h-4 min-w-0 flex-1 overflow-hidden">
                  {projects.map((p) => (
                    <span
                      key={p.slug}
                      data-tab
                      className="absolute inset-0 flex items-center gap-2 font-mono text-[11px] text-white/55"
                    >
                      <span className="size-2 shrink-0 rounded-[2px]" style={{ background: p.swatch }} />
                      <span className="truncate">{p.client}</span>
                    </span>
                  ))}
                </span>
                <span data-load aria-hidden className="absolute inset-x-0 -bottom-px h-0.5 bg-signal" />
              </div>

              <div className="relative h-[calc(100%-2.25rem)] overflow-hidden">
                {projects.map((p) => (
                  <div key={p.slug} data-layer className="absolute inset-0 overflow-hidden bg-ink-2">
                    {p.kind === "fullpage" ? (
                      <Image
                        data-shot
                        src={p.src}
                        width={p.width}
                        height={p.height}
                        alt={p.alt}
                        sizes="520px"
                        className="absolute left-0 top-0 h-auto w-full"
                      />
                    ) : (
                      <Image
                        data-shot
                        src={p.src}
                        fill
                        alt={p.alt}
                        sizes="(min-width: 1440px) 820px, 58vw"
                        className="object-cover object-top"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
