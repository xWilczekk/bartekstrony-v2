const sharp = require("sharp");
const fs = require("node:fs");
const path = require("node:path");

(async () => {
  const [src, outDir, th = "1600", w = "1000"] = process.argv.slice(2);
  fs.mkdirSync(outDir, { recursive: true });
  const meta = await sharp(src).metadata();
  const tileH = Number(th);
  const base = path.basename(src, ".png");
  let i = 0;
  for (let top = 0; top < meta.height; top += tileH, i++) {
    const height = Math.min(tileH, meta.height - top);
    const out = path.join(outDir, `${base}-${String(i).padStart(2, "0")}.png`);
    await sharp(src).extract({ left: 0, top, width: meta.width, height }).resize({ width: Math.min(Number(w), meta.width) }).toFile(out);
    console.log(out);
  }
})();
