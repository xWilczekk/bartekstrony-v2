import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { industryName } from "@/content/industries";
import type { Project } from "@/content/projects";
import { Reveal } from "@/components/ui/reveal";
import { localizeHref, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

export const projectAlt = (p: Project, locale: Locale = "pl") =>
  locale === "en"
    ? `${p.client} website: ${p.category.toLowerCase()}`
    : `Strona internetowa ${p.client}: ${p.category.toLowerCase()}`;

export function ProjectCard({
  project,
  priority,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  className,
  locale = "pl",
}: {
  project: Project;
  priority?: boolean;
  sizes?: string;
  className?: string;
  locale?: Locale;
}) {
  return (
    <Link
      href={localizeHref(`/realizacje/${project.slug}`, locale)}
      className={cn("group block", className)}
    >
      <div className="overflow-hidden rounded-[var(--radius)] border hairline bg-paper-2 transition-[translate,border-color] duration-500 ease-[var(--ease-out)] group-hover:-translate-y-1 group-hover:border-ink/30">
        <div
          aria-hidden
          className="flex h-6 items-center gap-1.5 border-b hairline px-3"
        >
          <span className="size-2 rounded-full bg-ink/15" />
          <span className="size-2 rounded-full bg-ink/15" />
          <span className="size-2 rounded-full bg-ink/15" />
        </div>
        <ViewTransition
          name={`shot-${project.slug}`}
          share="morph"
          default="none"
        >
          <div
            className="relative aspect-[16/10]"
            style={{ backgroundColor: project.palette[1] }}
          >
            <Image
              src={project.shot.src}
              alt={projectAlt(project, locale)}
              fill
              sizes={sizes}
              priority={priority}
              data-lens
              className="bs-parallax object-cover object-top"
            />
          </div>
        </ViewTransition>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-display text-2xl leading-none font-semibold tracking-tight transition-colors duration-300 group-hover:text-signal">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-mute">{project.category}</p>
        </div>
        <p className="label-mono shrink-0 pt-1 text-right text-mute">
          {project.city ?? industryName(project.industry, locale).split(" ")[0]}
        </p>
      </div>
    </Link>
  );
}

export function ProjectGrid({
  projects,
  className,
  columns = 3,
  priorityCount = 0,
  locale = "pl",
}: {
  projects: Project[];
  className?: string;
  columns?: 2 | 3;
  priorityCount?: number;
  locale?: Locale;
}) {
  return (
    <div
      className={cn(
        "grid gap-x-6 gap-y-12 sm:grid-cols-2",
        columns === 3 && "lg:grid-cols-3",
        className,
      )}
    >
      {projects.map((p, i) => (
        <Reveal
          key={p.slug}
          from={i % 2 ? "right" : "left"}
          delay={(i % columns) * 0.07}
        >
          <ProjectCard
            project={p}
            sizes={
              columns === 3
                ? "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                : "(min-width: 640px) 50vw, 100vw"
            }
            priority={i < priorityCount}
            locale={locale}
          />
        </Reveal>
      ))}
    </div>
  );
}
