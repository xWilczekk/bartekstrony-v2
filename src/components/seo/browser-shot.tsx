import Image from "next/image";
import { ViewTransition } from "react";
import { BrowserFrame } from "@/components/ui/browser-frame";
import type { Project } from "@/content/projects";
import { getLocale } from "@/i18n/server";
import { cn } from "@/lib/utils";
import { projectAlt } from "./project-card";

export function BrowserShot({
  project,
  className,
  priority,
}: {
  project: Project;
  className?: string;
  priority?: boolean;
}) {
  const locale = getLocale();
  const { shot } = project;
  const tall = shot.kind === "fullpage";
  const host = project.liveUrl ? new URL(project.liveUrl).host : project.client;
  return (
    <ViewTransition name={`shot-${project.slug}`} share="morph" default="none">
      <BrowserFrame
        url={host}
        className={cn("w-full", tall && "mx-auto max-w-[620px]", className)}
      >
        {tall ? (
          <div
            tabIndex={0}
            role="region"
            aria-label={
              locale === "en"
                ? `${project.client} website preview — scrollable`
                : `Podgląd strony ${project.client} — przewijany`
            }
            data-lenis-prevent
            className="max-h-[min(78vh,860px)] overflow-y-auto overscroll-contain bg-paper"
          >
            <Image
              src={shot.src}
              alt={projectAlt(project, locale)}
              width={shot.width}
              height={shot.height}
              sizes="(min-width: 1024px) 620px, 100vw"
              priority={priority}
              className="h-auto w-full"
            />
          </div>
        ) : (
          <Image
            src={shot.src}
            alt={projectAlt(project, locale)}
            width={shot.width}
            height={shot.height}
            sizes="(min-width: 1280px) 900px, 100vw"
            priority={priority}
            className="h-auto w-full"
          />
        )}
      </BrowserFrame>
    </ViewTransition>
  );
}
