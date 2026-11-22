const r = require(require("node:path").resolve(process.argv[2]));
console.log(Object.entries(r.categories).map(([k, v]) => `${k} ${Math.round(v.score * 100)}`).join(" | "));
console.log(
  ["first-contentful-paint", "largest-contentful-paint", "total-blocking-time", "cumulative-layout-shift", "speed-index"]
    .map((id) => `${id}: ${r.audits[id].displayValue}`)
    .join(" | "),
);
const bad = Object.values(r.audits).filter(
  (a) => a.score !== null && a.score < 0.9 && !["informative", "manual", "notApplicable"].includes(a.scoreDisplayMode),
);
for (const a of bad) {
  console.log(" ✗", a.id, a.displayValue || "");
  for (const it of (a.details?.items ?? []).slice(0, 4)) {
    const n = it.node ?? {};
    if (n.snippet) console.log("     ", n.snippet.slice(0, 150), "|", (n.explanation ?? "").split("\n")[1]?.slice(0, 130) ?? "");
    else if (it.url) console.log("     ", it.url, it.wastedBytes ?? it.totalBytes ?? "");
  }
}
const lcpEl = r.audits["lcp-breakdown-insight"]?.details?.items?.find((i) => i.type === "node");
if (lcpEl) console.log("LCP element:", lcpEl.selector, "—", lcpEl.nodeLabel);
const phases = r.audits["lcp-breakdown-insight"]?.details?.items?.[0]?.items;
if (phases) console.log("LCP phases:", phases.map((p) => `${p.label} ${Math.round(p.duration)}ms`).join(", "));
