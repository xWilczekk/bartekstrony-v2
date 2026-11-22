import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 } as const;
export const ogContentType = "image/png";

const PAPER = "#fafaf7";
const INK = "#10201a";
const LIME = "#c6f36b";
const MUTE = "#56645c";
const HIGHLIGHT = `linear-gradient(180deg, transparent 58%, ${LIME} 58%, ${LIME} 92%, transparent 92%)`;

const OLD_UA =
  "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1";

const fontCache = new Map<string, Promise<ArrayBuffer | null>>();

function loadDisplayFont(text: string): Promise<ArrayBuffer | null> {
  const glyphs = Array.from(
    new Set(`${text}ĄąĆćĘęŁłŃńÓóŚśŹźŻż0123456789 .,:;!?„”—–-/+%·()`),
  ).join("");
  const cached = fontCache.get(glyphs);
  if (cached) return cached;
  const job = (async () => {
    try {
      const css = await fetch(
        `https://fonts.googleapis.com/css2?family=Manrope:wght@800&text=${encodeURIComponent(glyphs)}`,
        { headers: { "User-Agent": OLD_UA } },
      ).then((r) => (r.ok ? r.text() : ""));
      const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
      if (!url) return null;
      const res = await fetch(url);
      return res.ok ? await res.arrayBuffer() : null;
    } catch {
      return null;
    }
  })();
  fontCache.set(glyphs, job);
  return job;
}

function titleSize(len: number) {
  if (len <= 22) return 112;
  if (len <= 40) return 92;
  if (len <= 64) return 76;
  if (len <= 96) return 62;
  return 52;
}

export type OgProps = {
  eyebrow: string;
  title: string;
  accent?: string;
  footer?: string;
  swatches?: string[];
  portrait?: boolean;
};

let portraitJob: Promise<string | null> | null = null;
function loadPortrait() {
  portraitJob ??= readFile(join(process.cwd(), "public/portrait/og-portrait.png"))
    .then((b) => `data:image/png;base64,${b.toString("base64")}`)
    .catch(() => null);
  return portraitJob;
}
const PORTRAIT_H = 600;
const PORTRAIT_W = Math.round((760 / 720) * PORTRAIT_H);

export async function renderOg({ eyebrow, title, accent, footer = "Wycena w 24h · bartekstrony.pl", swatches, portrait }: OgProps) {
  const font = await loadDisplayFont(`${eyebrow}${eyebrow.toUpperCase()}${title}${footer}bartekstrony.pl`);
  const family = font ? { fontFamily: "Display" } : {};

  const accentWords = new Set((accent ?? "").split(/\s+/).filter(Boolean));
  const words = title.split(/\s+/);
  const photo = portrait ? await loadPortrait() : null;
  const size = photo ? Math.min(titleSize(title.length), 80) : titleSize(title.length);
  const column = photo ? { maxWidth: 560 } : {};

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          color: INK,
          padding: "56px 72px",
          position: "relative",
          ...family,
        }}
      >
        {photo && (
          // eslint-disable-next-line @next/next/no-img-element -- Satori draws plain <img>
          <img
            src={photo}
            width={PORTRAIT_W}
            height={PORTRAIT_H}
            alt=""
            style={{ position: "absolute", right: -8, bottom: 0 }}
          />
        )}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 30 }}>
          <div style={{ display: "flex", fontWeight: 800, letterSpacing: -1 }}>
            <span>bartek</span>
            <span>strony</span>
            <span style={{ display: "flex", width: 10, height: 10, marginLeft: 3, marginTop: 16, background: LIME }} />
          </div>
          {!photo && (
            <div
              style={{
                display: "flex",
                fontSize: 22,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: MUTE,
              }}
            >
              {eyebrow}
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", ...column }}>
        {photo && (
          <div style={{ display: "flex", fontSize: 20, letterSpacing: 3, textTransform: "uppercase", color: MUTE, marginBottom: 22 }}>
            {eyebrow}
          </div>
        )}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            maxWidth: photo ? 560 : 1040,
            fontSize: size,
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: -size / 28,
          }}
        >
          {words.map((w, i) => (
            <span
              key={`${w}-${i}`}
              style={{
                display: "flex",
                marginRight: size * 0.24,
                ...(accentWords.has(w.replace(/[.,:;!?]$/, "")) ? { backgroundImage: HIGHLIGHT } : {}),
              }}
            >
              {w}
            </span>
          ))}
        </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid rgba(16,32,26,0.14)",
            paddingTop: 28,
            fontSize: photo ? 22 : 26,
            color: MUTE,
            ...column,
          }}
        >
          <div style={{ display: "flex" }}>{footer}</div>
          {swatches?.length ? (
            <div style={{ display: "flex", gap: 12 }}>
              {swatches.map((c) => (
                <div
                  key={c}
                  style={{ display: "flex", width: 44, height: 44, borderRadius: 22, background: c, border: "2px solid rgba(16,32,26,0.18)" }}
                />
              ))}
            </div>
          ) : photo ? null : (
            <div style={{ display: "flex", width: 20, height: 20, borderRadius: 10, background: LIME }} />
          )}
        </div>
      </div>
    ),
    {
      ...ogSize,
      ...(font ? { fonts: [{ name: "Display", data: font, style: "normal" as const, weight: 800 as const }] } : {}),
    },
  );
}
