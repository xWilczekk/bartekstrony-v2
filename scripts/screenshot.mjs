import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const [base, outDir, ...paths] = process.argv.slice(2);
fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();
const viewports = [
  { name: "desktop", width: 1440, height: 900, isMobile: false },
  { name: "mobile", width: 390, height: 844, isMobile: true },
];
const only = process.env.VP;
const full = process.env.FULL !== "0";
for (const vp of viewports.filter((v) => !only || v.name === only)) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    isMobile: vp.isMobile,
    hasTouch: vp.isMobile,
    reducedMotion: process.env.RM === "1" ? "reduce" : "no-preference",
  });
  for (const p of paths) {
    const page = await ctx.newPage();
    const errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push("PAGEERROR " + e.message));
    const res = await page.goto(base + p, { waitUntil: "networkidle", timeout: 60000 }).catch((e) => ({ status: () => "ERR " + e.message }));
    if (full) {
      await page.evaluate(async () => {
        const h = document.documentElement.scrollHeight;
        for (let y = 0; y < h; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
        window.scrollTo(0, 0); await new Promise((r) => setTimeout(r, 600));
      });
    } else {
      await page.waitForTimeout(1500);
    }
    const file = path.join(outDir, `${vp.name}${p.replace(/[/?=&]/g, "_") || "_home"}.png`);
    await page.screenshot({ path: file, fullPage: full });
    console.log(vp.name, p, "status", res?.status?.(), "errors", errors.length ? JSON.stringify(errors.slice(0, 5)) : "none", "->", file);
    await page.close();
  }
  await ctx.close();
}
await browser.close();
