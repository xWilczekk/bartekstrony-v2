import sharp from "sharp";

const K = 1.5;
const W = 976 * K;
const CX = 576 * K, CY = 520 * K, R = 400 * K;
const RING_CX = 551 * K, RING_CY = 538 * K;
const H = Math.ceil(CY + R + 6);
const OUT_W = 760;

const art = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <radialGradient id="g" cx="50%" cy="22%" r="70%">
      <stop offset="0" stop-color="#ddf8a3"/>
      <stop offset="0.75" stop-color="#c6f36b"/>
    </radialGradient>
  </defs>
  <circle cx="${RING_CX}" cy="${RING_CY}" r="${R}" fill="none" stroke="rgba(16,32,26,0.25)" stroke-width="${2 * K}"/>
  <circle cx="${CX}" cy="${CY}" r="${R}" fill="url(#g)"/>
</svg>`);

const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect x="0" y="0" width="${W}" height="${CY}" fill="#fff"/>
  <circle cx="${CX}" cy="${CY}" r="${R}" fill="#fff"/>
</svg>`);

const portrait = await sharp("public/portrait/bartek-1464.webp")
  .extract({ left: 0, top: 0, width: W, height: H })
  .composite([{ input: mask, blend: "dest-in" }])
  .png()
  .toBuffer();

const full = await sharp(art).composite([{ input: portrait }]).png().toBuffer();
await sharp(full)
  .resize(OUT_W)
  .png({ compressionLevel: 9, palette: false })
  .toFile("public/portrait/og-portrait.png");

console.log("ok", OUT_W, Math.round((H * OUT_W) / W));
