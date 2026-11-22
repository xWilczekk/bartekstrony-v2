import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button";
import { SectionHead } from "@/components/ui/section-head";
import type { Project } from "@/content/projects";
import { localizeHref } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { Section } from "./blocks";
import { ProjectGrid } from "./project-card";

export function ProjectsSection({
  index,
  eyebrow,
  title,
  lead,
  projects,
  tone = "paper",
  showAllLink = true,
}: {
  index?: string;
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  projects: Project[];
  tone?: "paper" | "paper-2";
  showAllLink?: boolean;
}) {
  if (projects.length === 0) return null;
  const locale = getLocale();
  const en = locale === "en";
  return (
    <Section tone={tone}>
      <SectionHead index={index} eyebrow={eyebrow ?? (en ? "Work" : "Realizacje")} title={title} lead={lead} />
      <ProjectGrid
        projects={projects}
        className="mt-12"
        columns={projects.length === 2 ? 2 : 3}
        locale={locale}
      />
      {showAllLink && (
        <div className="mt-12">
          <ButtonLink href={localizeHref("/realizacje", locale)} variant="ghost" arrow>
            {en ? "All projects" : "Wszystkie realizacje"}
          </ButtonLink>
        </div>
      )}
    </Section>
  );
}
