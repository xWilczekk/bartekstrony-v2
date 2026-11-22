const base = process.argv[2] ?? "http://localhost:3100";
const SITE = "https://bartekstrony.pl";

const sm = await (await fetch(base + "/sitemap.xml")).text();
const queue = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE, "") || "/");
const seen = new Set(queue);
const pages = [];
const problems = [];
const linkStatus = new Map();

const attr = (tag, name) => tag.match(new RegExp(`${name}="([^"]*)"`))?.[1];

while (queue.length) {
  const path = queue.shift();
  const res = await fetch(base + path, { redirect: "manual" });
  if (res.status !== 200) { problems.push(`${res.status} ${path}`); continue; }
  const html = await res.text();
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
  const canon = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? "";
  const robots = html.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? "";
  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
  const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  const noAlt = imgs.filter((t) => attr(t, "alt") === undefined).length;
  const ld = (html.match(/application\/ld\+json/g) ?? []).length;
  pages.push({ path, title, desc, canon, robots, h1s, noAlt, ld, kb: Math.round(html.length / 1024) });

  if (h1s !== 1) problems.push(`h1=${h1s} ${path}`);
  if (!title) problems.push(`no title ${path}`);
  if (title.length > 70) problems.push(`long title (${title.length}) ${path}: ${title}`);
  if (!desc) problems.push(`no description ${path}`);
  else if (desc.length > 170 || desc.length < 70) problems.push(`desc len ${desc.length} ${path}`);
  if (!robots.includes("noindex") && canon !== SITE + (path === "/" ? "" : path) && canon !== SITE + path) problems.push(`canonical ${canon} on ${path}`);
  if (noAlt) problems.push(`${noAlt} img without alt ${path}`);
  if (/href="#"/.test(html)) problems.push(`dead href="#" on ${path}`);

  for (const m of html.matchAll(/href="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
    const href = m[1];
    if (/^\/(_next|icon|apple-icon|opengraph-image|manifest|work|brand)/.test(href) || /\.(png|jpg|webp|svg|ico|css|js|xml|txt)$/.test(href)) continue;
    if (!seen.has(href)) { seen.add(href); queue.push(href); }
  }
}

const dup = (k) => {
  const m = new Map();
  for (const p of pages) { if (!p[k]) continue; m.set(p[k], [...(m.get(p[k]) ?? []), p.path]); }
  return [...m].filter(([, v]) => v.length > 1);
};
for (const [t, ps] of dup("title")) problems.push(`duplicate title "${t}": ${ps.join(", ")}`);
for (const [t, ps] of dup("desc")) problems.push(`duplicate desc: ${ps.join(", ")}`);

console.log(`pages crawled: ${pages.length}`);
console.log(`biggest HTML: ${pages.sort((a, b) => b.kb - a.kb).slice(0, 3).map((p) => `${p.path} ${p.kb}KB`).join(", ")}`);
console.log(`pages without JSON-LD: ${pages.filter((p) => !p.ld).map((p) => p.path).join(", ") || "none"}`);
console.log(`problems (${problems.length}):`);
for (const p of problems) console.log(" -", p);
