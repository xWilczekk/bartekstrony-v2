import { writeFile, mkdir } from "node:fs/promises";

const base = process.argv[2] ?? "http://localhost:3000";
await mkdir("public/share", { recursive: true });
for (const locale of ["pl", "en"]) {
  const res = await fetch(`${base}/og/${locale}`);
  if (!res.ok || res.headers.get("content-type") !== "image/jpeg") throw new Error(`/og/${locale}: ${res.status}`);
  const out = `public/share/bartekstrony-${locale}-v2.jpg`;
  await writeFile(out, Buffer.from(await res.arrayBuffer()));
  console.log(out);
}
