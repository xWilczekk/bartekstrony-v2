"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePrefersReducedMotion } from "@/components/motion/use-media-query";
import { Arrow } from "@/components/ui/button";
import { BrowserFrame } from "@/components/ui/browser-frame";
import { cn, plural } from "@/lib/utils";
import { nn } from "./typo";

export type IndustryItem = {
  slug: string;
  name: string;
  hook: string;
  count: number;
  project: {
    title: string;
    category: string;
    city?: string;
    liveUrl?: string;
    shot: { src: string; width: number; height: number };
  } | null;
};

const FRAME_RATIO = 5 / 4;

export function IndustryList({ items }: { items: IndustryItem[] }) {
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState<number[]>([0]);
  const reduce = usePrefersReducedMotion();

  const activate = (i: number) => {
    setActive(i);
    setSeen((s) => (s.includes(i) ? s : [...s, i]));
  };

  const current = items[active];

  return (
    <div className="grid gap-x-12 lg:grid-cols-12">
      <ul className="border-b hairline lg:col-span-7">
        {items.map((it, i) => (
          <li key={it.slug} className="border-t hairline">
            <Link
              href={`/branze/${it.slug}`}
              data-active={active === i}
              onFocus={() => activate(i)}
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") activate(i);
              }}
              className="group grid grid-cols-[2rem_1fr_auto] items-baseline gap-x-3 py-5 md:grid-cols-[3.5rem_1fr_auto] md:gap-x-4 md:py-6"
            >
              <span className="label-mono text-mute transition-colors duration-300 lg:group-data-[active=true]:text-signal">
                {nn(i)}
              </span>
              <span className="min-w-0">
                <span className="block font-display text-[clamp(1.65rem,3.4vw,3.25rem)] font-medium [font-stretch:100%] transition-[font-weight,font-stretch,translate] duration-500 ease-[var(--ease-out)] lg:group-data-[active=true]:translate-x-2 lg:group-data-[active=true]:font-extrabold lg:group-data-[active=true]:[font-stretch:84%]">
                  {it.name}
                </span>
                <span className="mt-2 block text-pretty text-[0.95rem] text-mute lg:text-base">{it.hook}</span>
              </span>
              <span className="flex items-center gap-3 self-center">
                {it.count > 0 && (
                  <span className="label-mono hidden text-mute sm:inline">
                    {it.count} {plural(it.count, ["realizacja", "realizacje", "realizacji"])}
                  </span>
                )}
                <Arrow className="text-mute transition-colors group-hover:text-signal lg:group-data-[active=true]:text-signal" />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="hidden lg:col-span-5 lg:block">
        <figure className="sticky top-[calc(var(--header-h)+2rem)] pt-6">
          <BrowserFrame url={current.project?.liveUrl?.replace(/^https?:\/\//, "")}>
            <div className="relative aspect-[4/5] overflow-hidden bg-paper-3">
              {items.map((it, i) =>
                seen.includes(i) ? (
                  <PreviewLayer key={it.slug} item={it} active={i === active} reduce={reduce} />
                ) : null,
              )}
            </div>
          </BrowserFrame>
          <figcaption className="mt-4 flex items-baseline justify-between gap-4">
            {current.project ? (
              <>
                <span>
                  <span className="font-medium">{current.project.title}</span>
                  <span className="text-mute">
                    {" "}
                    — {current.project.category}
                    {current.project.city ? `, ${current.project.city}` : ""}
                  </span>
                </span>
                {current.count > 1 && (
                  <span className="label-mono shrink-0 text-mute">+{current.count - 1} w&nbsp;tej branży</span>
                )}
              </>
            ) : (
              <span className="text-mute">Tu jeszcze nie ma realizacji — może będzie Twoja.</span>
            )}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

function PreviewLayer({ item, active, reduce }: { item: IndustryItem; active: boolean; reduce: boolean }) {
  const p = item.project;
  const layer = cn(
    "absolute inset-0 transition-opacity duration-500 ease-[var(--ease-out)]",
    active ? "opacity-100" : "opacity-0",
  );

  if (!p) {
    return (
      <div aria-hidden={!active} className={cn(layer, "flex flex-col justify-end bg-paper-2 p-8 xl:p-10")}>
        <p className="font-display text-[length:var(--text-big)] font-semibold text-balance">
          Tu może stać <span className="font-serif-accent text-signal">Twoja</span> strona.
        </p>
        <p className="mt-4 max-w-sm text-pretty text-mute">
          Wpisz nazwę firmy i&nbsp;branżę w&nbsp;generatorze — projekt złoży się na Twoich oczach.
        </p>
      </div>
    );
  }

  const { src, width, height } = p.shot;
  const tall = height / width > FRAME_RATIO;
  const shift = tall ? (1 - (FRAME_RATIO * width) / height) * 100 : 0;
  const scroll = active && tall && !reduce;

  return (
    <div aria-hidden={!active} className={layer}>
      <Image
        src={src}
        width={width}
        height={height}
        alt={`Strona ${p.title} — ${p.category.toLowerCase()}`}
        sizes="(min-width: 1440px) 540px, 36vw"
        className={tall ? "h-auto w-full will-change-transform" : "size-full object-cover object-left-top"}
        style={
          tall
            ? {
                transform: scroll ? `translateY(-${shift.toFixed(2)}%)` : "translateY(0)",
                transition: scroll
                  ? `transform ${Math.max(4, shift / 8).toFixed(1)}s cubic-bezier(0.65, 0, 0.35, 1) 0.6s`
                  : "transform 0s linear 0.5s",
              }
            : undefined
        }
      />
    </div>
  );
}
