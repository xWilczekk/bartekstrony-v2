import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const [outDir, base = "http://localhost:3100"] = process.argv.slice(2);
fs.mkdirSync(outDir, { recursive: true });
const shot = (page, name) => page.screenshot({ path: path.join(outDir, name + ".png") });
const browser = await chromium.launch();
const errors = [];
const results = [];
const ok = (name, cond, extra = "") => results.push(`${cond ? "PASS" : "FAIL"}  ${name}${extra ? "  — " + extra : ""}`);

{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on("pageerror", (e) => errors.push("home: " + e.message));
  await page.goto(base + "/", { waitUntil: "load" });
  const name = page.getByLabel(/nazwa twojej firmy/i).first();
  await name.fill("Warsztat Kowalski");
  await page.getByRole("button", { name: /motoryzacja/i }).first().click().catch(() => {});
  await page.getByLabel(/miasto/i).first().fill("Białystok");
  await page.waitForTimeout(2500);
  await page.locator("#podglad").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await shot(page, "1-generator");
  const stageText = await page.locator("#podglad-stage").innerText();
  ok("generator renders typed business name", stageText.includes("Warsztat Kowalski"), stageText.slice(0, 80).replace(/\n/g, " "));
  ok("generator domain slug", /warsztatkowalski\.pl/i.test(stageText));
  const fullHref = await page.getByRole("link", { name: /pełny podgląd/i }).first().getAttribute("href");
  const wantHref = await page.getByRole("link", { name: /chcę taką stronę/i }).first().getAttribute("href");
  ok("full preview link carries params", /\/twoja-strona\?.*n=/.test(fullHref ?? ""), fullHref);
  ok("CTA carries lead params", /zrodlo=podglad/.test(wantHref ?? "") && /firma=/.test(wantHref ?? ""), wantHref);
  await page.close();

  const p2 = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  p2.on("pageerror", (e) => errors.push("twoja-strona: " + e.message));
  await p2.goto(base + fullHref, { waitUntil: "load" });
  await p2.waitForTimeout(2500);
  await shot(p2, "2-twoja-strona-mobile");
  const t2 = await p2.locator("body").innerText();
  ok("/twoja-strona shows the business", t2.includes("Warsztat Kowalski"));
  const robots = await p2.locator('meta[name="robots"]').getAttribute("content").catch(() => null);
  ok("/twoja-strona is noindex", /noindex/.test(robots ?? ""), robots ?? "no meta");
  await p2.close();

  const p3 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  p3.on("pageerror", (e) => errors.push("kontakt: " + e.message));
  await p3.goto(base + wantHref, { waitUntil: "load" });
  await p3.waitForTimeout(1500);
  const t3 = await p3.locator("main").innerText();
  ok("contact shows lead summary", /Warsztat Kowalski/.test(t3) && /Białystok/.test(t3));
  await p3.getByLabel(/imię/i).first().fill("Test Testowy");
  await p3.getByLabel(/e-?mail/i).first().fill("test@example.com");
  await p3.getByLabel(/wiadomość/i).first().fill("To jest test formularza z automatycznego sprawdzenia.");
  const consent = p3.getByRole("checkbox").first();
  if (await consent.count()) await consent.check();
  const apiResp = p3.waitForResponse((r) => r.url().includes("/api/contact"), { timeout: 15000 }).catch(() => null);
  await p3.getByRole("button", { name: /wyślij/i }).first().click();
  const resp = await apiResp;
  await p3.waitForTimeout(1500);
  await shot(p3, "3-kontakt-after-submit");
  const t3b = await p3.locator("main").innerText();
  ok("API answered", !!resp, resp ? `${resp.status()}` : "no request");
  ok("no-key fallback offers mailto/phone", resp?.status() !== 503 || /mailto|zadzwoń|509 973 600/i.test(t3b + (await p3.content())));
  await p3.close();
}

{
  const bad = await fetch(base + "/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name: "" }) });
  ok("API rejects invalid payload", bad.status === 400 || bad.status === 422, String(bad.status));
}

await browser.close();
console.log(results.join("\n"));
console.log("page errors:", errors.length ? errors : "none");
