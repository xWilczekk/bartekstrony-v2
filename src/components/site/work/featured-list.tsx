import Image from "next/image";
import type { Project } from "@/content/projects";
import { BrowserFrame } from "@/components/ui/browser-frame";
import { ScrollShot } from "@/components/motion/scroll-shot";
import { cn } from "@/lib/utils";
import { getLocale } from "@/i18n/server";
import { pad, shotAlt } from "./data";
import { ProjectInfo } from "./project-info";

export function FeaturedList({ projects }: { projects: Project[] }) {
  return (
    <ol className="container-x grid gap-16 md:gap-24" aria-label="Wyróżnione realizacje">
      {projects.map((p, i) => (
        <li key={p.slug} className="grid items-center gap-8 md:grid-cols-12 md:gap-10">
          <div className={cn("md:col-span-7", i % 2 === 1 && "md:order-last")}>
            <div className="rounded-[calc(var(--radius)+6px)] bg-ink-2 p-3 sm:p-5 md:p-8">
              {p.shot.kind === "fullpage" ? (
                <BrowserFrame dark url={p.client} className="mx-auto max-w-[460px]">
                  <ScrollShot
                    src={p.shot.src}
                    width={p.shot.width}
                    height={p.shot.height}
                    alt={shotAlt(p, getLocale())}
                    sizes="(min-width: 768px) 460px, calc(100vw - 56px)"
                    aspect={1}
                    mdAspect={4 / 5}
                  />
                </BrowserFrame>
              ) : (
                <BrowserFrame dark url={p.client}>
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={p.shot.src}
                      fill
                      alt={shotAlt(p, getLocale())}
                      sizes="(min-width: 1280px) 720px, (min-width: 768px) 54vw, calc(100vw - 56px)"
                      className="object-cover object-top"
                    />
                  </div>
                </BrowserFrame>
              )}
            </div>
          </div>
          <div className="md:col-span-5">
            <ProjectInfo project={p} num={pad(i + 1)} />
          </div>
        </li>
      ))}
    </ol>
  );
}
