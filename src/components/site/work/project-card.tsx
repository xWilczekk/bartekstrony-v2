import Image from "next/image";
import { ViewTransition } from "react";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { localizeHref } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { Reveal } from "@/components/ui/reveal";
import { shotAlt } from "./data";

export function ProjectCard({ project: p, num, index = 0 }: { project: Project; num: string; index?: number }) {
  const locale = getLocale();
  const en = locale === "en";
  return (
    <li className="group/card relative">
      <Reveal from={index % 2 ? "right" : "left"} delay={(index % 4) * 0.06}>
      <Link href={localizeHref(`/realizacje/${p.slug}`, locale)} className="block rounded-[var(--radius)]">
        <div className="overflow-hidden rounded-[var(--radius)] border border-white/10 bg-ink-2 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.7)] transition-[translate,border-color] duration-500 ease-[var(--ease-out)] group-hover/card:-translate-y-1 group-hover/card:border-white/25">
          <div aria-hidden className="flex h-7 items-center gap-1.5 border-b border-white/10 px-3">
            <span className="size-2 rounded-full bg-white/15" />
            <span className="size-2 rounded-full bg-white/15" />
            <span className="size-2 rounded-full bg-white/15" />
            <span className="ml-auto size-2 rounded-[2px]" style={{ background: p.palette[0] }} />
          </div>
          <ViewTransition name={`shot-${p.slug}`} share="morph" default="none">
            <Image
              src={p.shot.src}
              width={p.shot.width}
              height={p.shot.height}
              alt={shotAlt(p, locale)}
              data-lens
              sizes="(min-width: 1440px) 320px, (min-width: 1024px) 23vw, calc(50vw - 28px)"
              className="bs-parallax aspect-[16/10] w-full object-cover object-top"
            />
          </ViewTransition>
        </div>

        <div className="mt-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="label-mono flex items-center gap-2 text-mute">
              <span className="text-signal tabular-nums">{num}</span>
              {p.city && <span className="truncate">{p.city}</span>}
            </p>
            <h3 className="mt-2 font-display text-[clamp(1.3rem,2vw,1.75rem)] font-semibold">{p.title}</h3>
            <p className="mt-1.5 line-clamp-2 text-sm leading-snug text-mute">{p.category}</p>
          </div>
          <span
            aria-hidden
            className="mt-1 hidden size-9 shrink-0 items-center justify-center rounded-full border hairline transition-[background-color,border-color] duration-300 group-hover/card:border-signal group-hover/card:bg-signal sm:inline-flex"
          >
            <svg
              viewBox="0 0 16 16"
              className="size-3.5 transition-transform duration-300 ease-[var(--ease-out)] group-hover/card:-translate-y-px group-hover/card:translate-x-px"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M4 12 12 4M5.5 4H12v6.5" />
            </svg>
          </span>
        </div>
      </Link>

      {p.liveUrl && (
        <a
          href={p.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="label-mono mt-1 inline-flex min-h-10 items-center gap-1.5 text-mute underline-offset-4 hover:text-paper hover:underline"
        >
          {en ? "Live" : "Na żywo"}
          <span className="sr-only">
            : {p.title} {en ? "(opens in a new tab)" : "(otwiera się w nowej karcie)"}
          </span>
          <svg aria-hidden viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M4 12 12 4M5.5 4H12v6.5" />
          </svg>
        </a>
      )}
      </Reveal>
    </li>
  );
}
