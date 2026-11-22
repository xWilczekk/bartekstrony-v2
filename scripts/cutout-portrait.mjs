import sharp from "sharp";

const [input, out, cropX = "0"] = process.argv.slice(2);
const x0 = Number(cropX);
const meta = await sharp(input).metadata();
const { data, info } = await sharp(input)
  .extract({ left: x0, top: 0, width: meta.width - x0, height: meta.height })
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width: w, height: h } = info;

const LO = Number(process.env.LO ?? 222), SPREAD = Number(process.env.SPREAD ?? 22);
const CROWN_Y = Number(process.env.CROWN_Y ?? 150), CROWN_LO = 208, CROWN_SPREAD = 42;
const minC = new Uint8Array(w * h);
const cand = new Uint8Array(w * h);
for (let i = 0; i < w * h; i++) {
  const r = data[i * 3], g = data[i * 3 + 1], b = data[i * 3 + 2];
  const lo = Math.min(r, g, b), hi = Math.max(r, g, b);
  minC[i] = lo;
  const crown = i < CROWN_Y * w;
  cand[i] = lo >= (crown ? CROWN_LO : LO) && hi - lo < (crown ? CROWN_SPREAD : SPREAD) ? 1 : 0;
}

const bg = new Uint8Array(w * h);
const queue = new Int32Array(w * h);
let head = 0, tail = 0;
const seed = (i) => { if (cand[i] && !bg[i]) { bg[i] = 1; queue[tail++] = i; } };
for (let x = 0; x < w; x++) { seed(x); seed((h - 1) * w + x); }
for (let y = 0; y < h; y++) { seed(y * w); seed(y * w + w - 1); }
while (head < tail) {
  const i = queue[head++], x = i % w;
  if (x > 0) seed(i - 1);
  if (x < w - 1) seed(i + 1);
  if (i >= w) seed(i - w);
  if (i < w * (h - 1)) seed(i + w);
}

const BAND = Number(process.env.BAND ?? 6);
const near = new Uint8Array(w * h);
for (let y = 0; y < h; y++)
  for (let x = 0; x < w; x++) {
    if (!bg[y * w + x]) continue;
    for (let dy = -BAND; dy <= BAND; dy++)
      for (let dx = -BAND; dx <= BAND; dx++) {
        const yy = y + dy, xx = x + dx;
        if (yy >= 0 && yy < h && xx >= 0 && xx < w) near[yy * w + xx] = 1;
      }
  }

const FG = Number(process.env.FG ?? 185);
const KNEE = Number(process.env.KNEE ?? 14);
const CHOKE = Number(process.env.CHOKE ?? 0.45);
const HAIR_Y = Number(process.env.HAIR_Y ?? 330);
const rgba = Buffer.alloc(w * h * 4);
for (let i = 0; i < w * h; i++) {
  let a = 1;
  if (near[i] && (bg[i] || i < HAIR_Y * w)) a = Math.min(1, Math.max(0, (255 - minC[i] - KNEE) / (255 - FG - KNEE)));
  if (a > 0 && !bg[i]) {
    const x = i % w;
    if ((x > 0 && bg[i - 1]) || (x < w - 1 && bg[i + 1]) || (i >= w && bg[i - w]) || (i < w * (h - 1) && bg[i + w])) a *= CHOKE;
  }
  for (let c = 0; c < 3; c++) {
    const v = data[i * 3 + c];
    rgba[i * 4 + c] = a > 0.02 ? Math.max(0, Math.min(255, Math.round((v - (1 - a) * 255) / a))) : 0;
  }
  rgba[i * 4 + 3] = Math.round(a * 255);
}

await sharp(rgba, { raw: { width: w, height: h, channels: 4 } }).png().toFile(out);
console.log("ok", w, h);
