"use client";

import Link from "next/link";
import { Fragment, useId, useState, type CSSProperties } from "react";
import { formatPLN, type Service as FullService } from "@/content/services";
import { Arrow, ButtonLink } from "@/components/ui/button";
import { cn, contactHref } from "@/lib/utils";
import { nbsp, nn } from "./typo";

export type Service = Pick<FullService, "slug" | "name" | "promise" | "forWho" | "priceFrom" | "timeline" | "includes">;

const DESKTOP = "(min-width: 1024px)";
const isDesktop = () => typeof window !== "undefined" && window.matchMedia(DESKTOP).matches;

const priceLabel = (s: Service) => (s.priceFrom ? `od ${formatPLN(s.priceFrom)}` : "wycena indywidualna");

export function ServiceRows({ services }: { services: Service[] }) {
  const [active, setActive] = useState<number | null>(0);
  const uid = useId();

  const preview = (i: number) => {
    if (isDesktop()) setActive(i);
  };
  const toggle = (i: number) => {
    const desktop = isDesktop();
    setActive((a) => (a === i && !desktop ? null : i));
  };

  return (
    <div
      className="grid border-b hairline lg:grid-cols-12 lg:grid-rows-[repeat(var(--n),auto)] lg:gap-x-10"
      style={{ "--n": services.length } as CSSProperties}
    >
      {services.map((s, i) => {
        const open = active === i;
        const btnId = `${uid}-row-${i}`;
        const panelId = `${uid}-panel-${i}`;
        return (
          <Fragment key={s.slug}>
            <h3
              className="border-t hairline lg:col-span-7 lg:col-start-1 lg:[grid-row:var(--row)]"
              style={{ "--row": i + 1 } as CSSProperties}
            >
              <button
                type="button"
                id={btnId}
                aria-expanded={open}
                aria-controls={panelId}
                data-active={open}
                onClick={() => toggle(i)}
                onFocus={() => preview(i)}
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse") preview(i);
                }}
                className="group grid w-full cursor-pointer grid-cols-[2.6rem_1fr_auto] items-start gap-x-3 py-6 text-left md:grid-cols-[5.5rem_1fr_auto] md:gap-x-4 md:py-8"
              >
                <span
                  aria-hidden
                  className="font-display text-[length:var(--text-big)] font-light text-mute tabular-nums transition-colors duration-300 group-hover:text-ink group-data-[active=true]:text-signal"
                >
                  {nn(i)}
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-[length:var(--text-big)] font-semibold transition-transform duration-500 ease-[var(--ease-out)] lg:group-data-[active=true]:translate-x-2">
                    {s.name}
                  </span>
                  <span className="mt-2.5 block max-w-xl text-pretty text-mute md:text-lg">{nbsp(s.promise)}</span>
                  <span className="label-mono mt-3 block text-ink/70">
                    {priceLabel(s)} <span className="text-mute">· {s.timeline}</span>
                  </span>
                </span>
                <span aria-hidden className="relative mt-2 grid size-9 place-items-center rounded-full border hairline md:mt-3">
                  <svg
                    viewBox="0 0 16 16"
                    className="size-3.5 transition-transform duration-500 ease-[var(--ease-out)] group-data-[active=true]:rotate-45 lg:hidden"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <path d="M8 2v12M2 8h12" />
                  </svg>
                  <svg
                    viewBox="0 0 16 16"
                    className="hidden size-3.5 text-mute transition-[color,translate] duration-300 group-data-[active=true]:translate-x-0.5 group-data-[active=true]:text-signal lg:block"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <path d="M2 8h11M9 4l4 4-4 4" />
                  </svg>
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              inert={!open}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out)]",
                "lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:col-span-5 lg:col-start-8 lg:row-[1/-1] lg:grid-rows-[1fr] lg:self-start lg:pt-8",
                open ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <ServiceDetail service={s} index={i} />
              </div>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}

function ServiceDetail({ service: s, index }: { service: Service; index: number }) {
  return (
    <div className="pb-8 pl-[calc(2.6rem+0.75rem)] md:pl-[calc(5.5rem+1rem)] lg:pb-0 lg:pl-0">
      <div className="lg:rounded-[var(--radius)] lg:bg-paper-2 lg:p-8 xl:p-10">
        <p className="label-mono hidden text-mute lg:block">
          <span className="text-signal">{nn(index)}</span> — {s.name}
        </p>

        <p className="label-mono text-mute lg:mt-8">Dla kogo</p>
        <p className="mt-2 text-pretty text-lg leading-snug">{nbsp(s.forWho)}</p>

        <p className="label-mono mt-7 text-mute">Co dostajesz</p>
        <ul className="mt-3 space-y-2">
          {s.includes.map((item) => (
            <li key={item} className="flex gap-3 leading-snug">
              <span aria-hidden className="mt-[0.55em] h-px w-3 shrink-0 bg-signal" />
              <span>{nbsp(item)}</span>
            </li>
          ))}
        </ul>

        <dl className="mt-8 grid grid-cols-2 gap-4 border-t hairline pt-5">
          <div>
            <dt className="label-mono text-mute">Cena</dt>
            <dd className="mt-2 font-display text-[1.9rem] font-semibold">
              {s.priceFrom ? (
                <>
                  <span className="font-sans text-base font-normal text-mute">od </span>
                  {formatPLN(s.priceFrom)}
                </>
              ) : (
                <span className="text-[1.35rem] leading-tight">Wycena indywidualna</span>
              )}
            </dd>
          </div>
          <div>
            <dt className="label-mono text-mute">Czas</dt>
            <dd className="mt-2 font-display text-[1.9rem] font-semibold">{s.timeline}</dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
          <ButtonLink href={`/oferta/${s.slug}`} variant="ink" arrow>
            Szczegóły usługi
          </ButtonLink>
          <Link
            href={contactHref({ zrodlo: "oferta", usluga: s.slug })}
            className="group/btn inline-flex min-h-11 items-center gap-1.5 font-medium underline decoration-ink/25 underline-offset-4 transition-colors hover:decoration-signal"
          >
            Zapytaj o wycenę
            <Arrow />
          </Link>
        </div>
      </div>
    </div>
  );
}
