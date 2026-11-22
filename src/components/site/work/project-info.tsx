import type { Project } from "@/content/projects";
import { ButtonLink } from "@/components/ui/button";
import { localizeHref } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { cn } from "@/lib/utils";

export function ProjectInfo({
  project: p,
  num,
  variant = "list",
}: {
  project: Project;
  num: string;
  variant?: "list" | "stage";
}) {
  const stage = variant === "stage";
  const locale = getLocale();
  const en = locale === "en";

  return (
    <div className={stage ? "max-w-[34rem]" : "max-w-xl"}>
      <p className="label-mono flex flex-wrap items-center gap-x-2.5 gap-y-1 text-mute">
        <span className="text-signal tabular-nums">{num}</span>
        <span aria-hidden className="h-px w-5 bg-current opacity-40" />
        <span>{p.category}</span>
        {p.city && (
          <>
            <span aria-hidden>·</span>
            <span>{p.city}</span>
          </>
        )}
      </p>

      <h3
        className={cn(
          "mt-4 font-display font-semibold text-balance",
          stage ? "text-[clamp(2.4rem,min(4.5vw,7.4vh),4.75rem)]" : "text-[length:var(--text-big)]",
        )}
      >
        {p.title}
      </h3>

      <p
        className={cn(
          "mt-4 max-w-md leading-relaxed text-pretty text-mute",
          stage && "text-[1.05rem] [@media(max-height:760px)]:line-clamp-3",
        )}
      >
        {p.description}
      </p>

      <ul
        aria-label={en ? "What I built" : "Co zbudowałem"}
        className={cn(
          "mt-6 grid-cols-2 gap-x-6 gap-y-2 border-t hairline pt-4 text-[0.92rem] leading-snug",
          stage ? "grid [@media(max-height:860px)]:hidden" : "hidden md:grid",
        )}
      >
        {p.scope.map((s) => (
          <li key={s} className="flex gap-2.5">
            <span aria-hidden className="mt-[0.5em] size-1 shrink-0 rotate-45 bg-signal" />
            {s}
          </li>
        ))}
      </ul>

      <div className={cn("mt-6 flex flex-wrap items-center gap-2", stage && "[@media(max-height:720px)]:hidden")}>
        {p.tags.map((t) => (
          <span key={t} className="label-mono rounded-full border hairline px-2.5 py-1 text-[0.64rem]">
            {t}
          </span>
        ))}
        <span
          aria-hidden
          title={`${en ? "Client palette" : "Paleta klienta"}: ${p.palette.join(", ")}`}
          className="label-mono ml-1 inline-flex items-center gap-2 text-[0.64rem] text-mute"
        >
          <span className="flex">
            <span className="size-2.5 rounded-[2px] ring-1 ring-white/20" style={{ background: p.palette[0] }} />
            <span className="-ml-0.5 size-2.5 rounded-[2px] ring-1 ring-white/20" style={{ background: p.palette[1] }} />
          </span>
          {stage ? p.palette.join(" / ") : en ? "Palette" : "Paleta"}
        </span>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <ButtonLink href={localizeHref(`/realizacje/${p.slug}`, locale)} variant="paper" arrow>
          {en ? "See the project" : "Zobacz realizację"}
          <span className="sr-only">: {p.title}</span>
        </ButtonLink>
        {p.liveUrl && (
          <a
            href={p.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="label-mono inline-flex min-h-11 items-center gap-1.5 underline-offset-4 hover:underline"
          >
            {en ? "Live" : "Na żywo"}
            <svg aria-hidden viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M4 12 12 4M5.5 4H12v6.5" />
            </svg>
            <span className="sr-only">{en ? " (opens in a new tab)" : " (otwiera się w nowej karcie)"}</span>
          </a>
        )}
      </div>
    </div>
  );
}
