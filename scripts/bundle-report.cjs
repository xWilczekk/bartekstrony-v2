const fs = require("node:fs");
const lines = fs.readFileSync(process.argv[2], "utf8").split("\n").filter(Boolean);
const by = new Map();
let total = 0;
for (const l of lines) {
  const r = JSON.parse(l);
  if (r.type !== "part" || !r.filename.includes("/static/chunks/")) continue;
  const p = r.source_path.replace("[project]/", "");
  let key;
  const nm = p.match(/node_modules\/((?:@[^/]+\/)?[^/]+)/);
  if (nm) key = "pkg  " + nm[1] + (nm[1] === "next" ? "/" + (p.split("node_modules/next/")[1] ?? "").split("/").slice(0, 3).join("/") : "");
  else key = "src  " + p.split("/").slice(0, 4).join("/");
  const size = r.compressed_size ?? 0;
  total += size;
  by.set(key, (by.get(key) ?? 0) + size);
}
console.log("client JS (compressed) total:", Math.round(total / 1024), "KB");
for (const [k, v] of [...by].sort((a, b) => b[1] - a[1]).slice(0, 30)) console.log(String(Math.round(v / 102.4) / 10).padStart(7), "KB ", k);
