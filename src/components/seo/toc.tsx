import type { Heading } from "@/content/blog/headings";

export function Toc({ headings }: { headings: Heading[] }) {
  if (headings.length < 3) return null;
  return (
    <nav aria-label="Spis treści" className="lg:sticky lg:top-28">
      <p className="label-mono text-mute">Spis treści</p>
      <ol className="mt-4 border-t hairline">
        {headings.map((h, i) => (
          <li key={h.id} className="border-b hairline">
            <a
              href={`#${h.id}`}
              className="flex gap-3 py-3 text-[0.95rem] leading-snug transition-colors duration-300 hover:text-signal"
            >
              <span className="label-mono pt-0.5 text-mute">{String(i + 1).padStart(2, "0")}</span>
              <span>{h.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
