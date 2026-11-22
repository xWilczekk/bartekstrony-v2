"use client";

import { Suspense, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Project } from "@/content/projects";
import { useLocale } from "@/i18n/client";
import { cn, plural } from "@/lib/utils";
import { ProjectGrid } from "./project-card";

type Option = { slug: string; name: string };

export function ProjectsExplorer({ projects, industries }: { projects: Project[]; industries: Option[] }) {
  const locale = useLocale();
  return (
    <Suspense fallback={<ProjectGrid projects={projects} priorityCount={3} locale={locale} />}>
      <Explorer projects={projects} industries={industries} />
    </Suspense>
  );
}

function Explorer({ projects, industries }: { projects: Project[]; industries: Option[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const locale = useLocale();
  const en = locale === "en";

  const options = useMemo(
    () =>
      industries
        .map((i) => ({ ...i, count: projects.filter((p) => p.industry === i.slug).length }))
        .filter((i) => i.count > 0),
    [industries, projects],
  );

  const requested = params.get("branza");
  const active = options.some((o) => o.slug === requested) ? requested : null;
  const visible = active ? projects.filter((p) => p.industry === active) : projects;

  function select(slug: string | null) {
    const q = new URLSearchParams(params.toString());
    if (slug) q.set("branza", slug);
    else q.delete("branza");
    const qs = q.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const chip = (selected: boolean) =>
    cn(
      "inline-flex h-11 items-center gap-2 rounded-full border px-4 text-[0.95rem] transition-colors duration-300",
      selected
        ? "border-ink bg-ink text-paper"
        : "border-ink/20 text-ink hover:border-ink",
    );

  return (
    <div>
      <div
        role="group"
        aria-label={en ? "Filter projects by industry" : "Filtruj realizacje według branży"}
        className="flex flex-wrap gap-2"
      >
        <button type="button" aria-pressed={!active} className={chip(!active)} onClick={() => select(null)}>
          {en ? "All" : "Wszystkie"}
          <span className="label-mono opacity-60">{projects.length}</span>
        </button>
        {options.map((o) => (
          <button
            key={o.slug}
            type="button"
            aria-pressed={active === o.slug}
            className={chip(active === o.slug)}
            onClick={() => select(o.slug)}
          >
            {o.name}
            <span className="label-mono opacity-60">{o.count}</span>
          </button>
        ))}
      </div>

      <p className="label-mono mt-8 text-mute" aria-live="polite">
        {visible.length}{" "}
        {en
          ? visible.length === 1
            ? "project"
            : "projects"
          : plural(visible.length, ["realizacja", "realizacje", "realizacji"])}
      </p>

      <ProjectGrid key={active ?? "all"} projects={visible} className="mt-6" priorityCount={3} locale={locale} />
    </div>
  );
}
