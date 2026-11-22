import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/projects";
import { shotAlt } from "@/components/site/work/data";
import { plural } from "@/lib/utils";

export function ClientMarquee() {
  const shown = projects.filter((p) => p.featured).slice(0, 5);
  const others = projects.length - shown.length;

  return (
    <section aria-labelledby="clients-label" className="border-y hairline">
      <div className="container-x py-10 md:py-12">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h2 id="clients-label" className="label-mono text-ink">
            Zaufali mi
          </h2>
          <Link
            href="/realizacje"
            className="text-sm text-mute underline-offset-4 hover:text-ink hover:underline"
          >
            i {others} {plural(others, ["inna firma", "inne firmy", "innych firm"])} z całej Polski →
          </Link>
        </div>

        <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-5">
          {shown.map((p, i) => (
            <li key={p.slug} className={i === 4 ? "max-sm:hidden" : undefined}>
              <Link href={`/realizacje/${p.slug}`} className="group block">
                <div className="overflow-hidden rounded-[calc(var(--radius)-2px)] border hairline bg-paper-2 transition-[translate,border-color] duration-500 ease-[var(--ease-out)] group-hover:-translate-y-1 group-hover:border-ink/30">
                  <div aria-hidden className="flex h-5 items-center gap-1 border-b hairline px-2">
                    <span className="size-1.5 rounded-full bg-ink/15" />
                    <span className="size-1.5 rounded-full bg-ink/15" />
                    <span className="size-1.5 rounded-full bg-ink/15" />
                  </div>
                  <Image
                    src={p.shot.src}
                    width={p.shot.width}
                    height={p.shot.height}
                    alt={shotAlt(p)}
                    sizes="(min-width: 1440px) 270px, (min-width: 1024px) 19vw, (min-width: 640px) 31vw, 46vw"
                    className="aspect-[16/10] w-full object-cover object-top"
                  />
                </div>
                <p className="mt-3 font-display font-semibold tracking-[-0.01em] text-ink">{p.title}</p>
                <p className="text-sm text-mute">{p.city ?? p.category}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
