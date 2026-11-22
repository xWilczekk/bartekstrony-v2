import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { slugify } from "@/components/seo/text";

export type Heading = { id: string; title: string };

export async function getArticleFacts(slug: string): Promise<{ headings: Heading[]; words: number }> {
  const raw = await readFile(join(process.cwd(), "src", "content", "blog", `${slug}.mdx`), "utf8");
  const body = raw.replace(/^export const metadata = \{[\s\S]*?\n\};\n/, "");
  const headings: Heading[] = [];
  let inFence = false;
  for (const line of body.split("\n")) {
    if (line.startsWith("```")) inFence = !inFence;
    const m = !inFence && line.match(/^##\s+(.+?)\s*$/);
    if (m) headings.push({ id: slugify(m[1]), title: m[1] });
  }
  const words = body
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
  return { headings, words };
}
