import type { ReactNode } from "react";
import type { ArtKey, CarBody, PatternKey, ProductShape, Thumb } from "@/content/preview-kits";

function Svg({ w = 400, h = 400, children, className }: { w?: number; h?: number; children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid slice"
      className={className ?? "pv-svg"}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

const Spark = ({ x, y, r, className }: { x: number; y: number; r: number; className: string }) => (
  <path
    className={className}
    d={`M${x} ${y - r} C${x + r * 0.18} ${y - r * 0.18} ${x + r * 0.18} ${y - r * 0.18} ${x + r} ${y} C${x + r * 0.18} ${y + r * 0.18} ${x + r * 0.18} ${y + r * 0.18} ${x} ${y + r} C${x - r * 0.18} ${y + r * 0.18} ${x - r * 0.18} ${y + r * 0.18} ${x - r} ${y} C${x - r * 0.18} ${y - r * 0.18} ${x - r * 0.18} ${y - r * 0.18} ${x} ${y - r} Z`}
  />
);

function Plate() {
  return (
    <Svg>
      <rect width="400" height="400" className="f-sur" />
      <g transform="rotate(-10 70 320)">
        <rect x="-10" y="230" width="170" height="170" rx="4" className="f-bg" />
        {range(6).flatMap((i) =>
          range(6).map((j) =>
            (i + j) % 2 === 0 ? <rect key={`${i}-${j}`} x={-10 + i * 28.4} y={230 + j * 28.4} width="28.4" height="28.4" className="f-acc" opacity="0.82" /> : null,
          ),
        )}
      </g>
      <g transform="rotate(28 345 250)">
        <rect x="337" y="180" width="14" height="190" rx="7" className="f-ink2" />
        <ellipse cx="344" cy="168" rx="24" ry="34" className="f-ink2" />
      </g>
      <circle cx="214" cy="196" r="136" className="f-ink" opacity="0.12" />
      <circle cx="206" cy="186" r="136" className="f-bg" />
      <circle cx="206" cy="186" r="112" className="f-none s-ink3" strokeWidth="3" />
      <circle cx="206" cy="186" r="98" fill="#e9d2a2" />
      <circle cx="206" cy="186" r="98" fill="#d9b47a" opacity="0.35" />
      <g transform="rotate(-18 172 170)">
        <ellipse cx="172" cy="170" rx="30" ry="22" fill="#fffaf0" />
        <circle cx="172" cy="170" r="12" fill="#f2b632" />
      </g>
      <g transform="rotate(24 238 214)">
        <ellipse cx="238" cy="214" rx="30" ry="22" fill="#fffaf0" />
        <circle cx="238" cy="214" r="12" fill="#f2b632" />
      </g>
      {[
        [236, 148],
        [262, 176],
        [170, 222],
        [200, 246],
      ].map(([x, y]) => (
        <g key={`${x}`}>
          <circle cx={x} cy={y} r="15" fill="#c98466" />
          <circle cx={x} cy={y} r="9" fill="#e0a98e" />
        </g>
      ))}
      {[
        [198, 140, 20],
        [214, 196, -30],
        [150, 196, 60],
        [276, 210, 10],
        [226, 262, -60],
        [190, 120, 80],
      ].map(([x, y, r]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="14" height="4" rx="2" fill="#5f8f3e" transform={`rotate(${r} ${x} ${y})`} />
      ))}
    </Svg>
  );
}

function Pizza() {
  return (
    <Svg>
      <rect width="400" height="400" className="f-sur" />
      <circle cx="356" cy="52" r="120" className="f-acc3" />
      <rect x="292" y="196" width="120" height="34" rx="17" fill="#a87543" transform="rotate(-24 292 196)" />
      <circle cx="198" cy="214" r="168" fill="#c8955f" />
      <circle cx="198" cy="214" r="168" className="f-none" stroke="#a87543" strokeWidth="6" />
      <circle cx="198" cy="214" r="146" fill="#e3a65a" />
      <circle cx="198" cy="214" r="128" fill="#c8432b" />
      {[
        [150, 170, 34],
        [236, 160, 30],
        [262, 238, 34],
        [180, 268, 32],
        [120, 236, 24],
        [214, 216, 26],
      ].map(([x, y, r]) => (
        <circle key={`${x}`} cx={x} cy={y} r={r} fill="#f6e7c1" />
      ))}
      {[
        [196, 130],
        [286, 196],
        [132, 290],
        [246, 300],
        [104, 186],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="17" fill="#9e2b25" />
          <circle cx={x - 5} cy={y - 4} r="3" fill="#d8665a" />
          <circle cx={x + 6} cy={y + 3} r="2.5" fill="#d8665a" />
        </g>
      ))}
      {[
        [168, 206, -30],
        [238, 196, 40],
        [208, 258, -70],
        [260, 140, 10],
      ].map(([x, y, r]) => (
        <ellipse key={`${x}`} cx={x} cy={y} rx="16" ry="9" fill="#3f7d3a" transform={`rotate(${r} ${x} ${y})`} />
      ))}
      <g stroke="#9b3b25" strokeOpacity="0.35" strokeWidth="3">
        <line x1="198" y1="68" x2="198" y2="360" />
        <line x1="52" y1="214" x2="344" y2="214" />
        <line x1="95" y1="111" x2="301" y2="317" />
        <line x1="301" y1="111" x2="95" y2="317" />
      </g>
    </Svg>
  );
}

function Grill() {
  return (
    <Svg>
      <rect width="400" height="400" className="f-sur" />
      <circle cx="200" cy="200" r="150" className="f-acc3" />
      <path d="M90 360 C70 300 120 290 110 240 C150 270 150 300 160 320 C170 280 190 270 186 220 C230 260 240 300 232 330 C250 300 270 296 280 262 C310 300 320 330 310 360 Z" className="f-acc" />
      <path d="M130 360 C126 330 150 318 150 290 C170 312 176 330 172 346 C190 330 200 312 206 292 C226 318 232 340 226 360 Z" fill="#ffc35a" />
      <rect x="196" y="28" width="8" height="330" rx="4" className="f-ink2" />
      <path d="M128 70 H272 L238 290 H162 Z" fill="#9a5a34" />
      {range(9).map((i) => (
        <path key={i} d={`M${132 + i * 3.8} ${92 + i * 22} H${268 - i * 3.8}`} stroke="#c47f4e" strokeWidth="7" strokeLinecap="round" opacity={0.75} />
      ))}
      <path d="M128 70 H272 L262 132 H138 Z" fill="#7a4428" opacity="0.5" />
      <ellipse cx="200" cy="70" rx="72" ry="12" fill="#b46d3f" />
      <g transform="rotate(-24 300 140)">
        <path d="M286 64 C306 70 312 120 304 170 H290 Z" className="f-bg" />
        <rect x="288" y="168" width="18" height="70" rx="6" className="f-ink" />
      </g>
    </Svg>
  );
}

function Sushi() {
  const maki = (x: number, y: number, key: string) => (
    <g key={key}>
      <circle cx={x} cy={y + 6} r="34" className="f-ink" opacity="0.18" />
      <circle cx={x} cy={y} r="34" fill="#1f2a24" />
      <circle cx={x} cy={y} r="27" fill="#f7f3ea" />
      <circle cx={x - 4} cy={y - 2} r="11" fill="#ef7b5a" />
      <circle cx={x + 8} cy={y + 7} r="6" fill="#8bbf6a" />
    </g>
  );
  return (
    <Svg>
      <rect width="400" height="400" className="f-sur" />
      <rect x="36" y="96" width="330" height="220" rx="14" fill="#c8955f" transform="rotate(-8 200 206)" />
      <rect x="36" y="300" width="330" height="16" rx="8" fill="#a87543" transform="rotate(-8 200 206)" />
      {maki(110, 196, "a")}
      {maki(186, 184, "b")}
      {maki(126, 266, "c")}
      {[
        [252, 168],
        [282, 236],
      ].map(([x, y]) => (
        <g key={x} transform={`rotate(-14 ${x} ${y})`}>
          <rect x={x - 46} y={y - 4} width="92" height="34" rx="17" fill="#f7f3ea" />
          <path d={`M${x - 50} ${y + 2} C${x - 40} ${y - 26} ${x + 40} ${y - 26} ${x + 50} ${y + 2} C${x + 30} ${y + 8} ${x - 30} ${y + 8} ${x - 50} ${y + 2} Z`} fill="#f08a5d" />
          {range(4).map((i) => (
            <path key={i} d={`M${x - 30 + i * 18} ${y - 14} l10 14`} stroke="#ffd4bf" strokeWidth="3" strokeLinecap="round" />
          ))}
        </g>
      ))}
      <circle cx="318" cy="330" r="34" className="f-bg" />
      <circle cx="318" cy="330" r="24" fill="#3b1f14" />
      <rect x="40" y="40" width="300" height="9" rx="4.5" className="f-ink" transform="rotate(10 40 40)" />
      <rect x="40" y="62" width="300" height="9" rx="4.5" className="f-ink" transform="rotate(7 40 62)" />
    </Svg>
  );
}

function Burger() {
  return (
    <Svg>
      <rect width="400" height="400" className="f-sur" />
      <circle cx="200" cy="214" r="160" className="f-acc3" />
      <ellipse cx="200" cy="330" rx="140" ry="16" className="f-ink" opacity="0.14" />
      <rect x="80" y="278" width="240" height="46" rx="22" fill="#d9913f" />
      <rect x="70" y="236" width="260" height="48" rx="24" fill="#5b3121" />
      <path d="M76 226 H324 L310 246 L292 236 L270 262 L252 238 L224 252 L210 236 L180 258 L160 238 L132 256 L112 236 L90 248 Z" fill="#f4c430" />
      <rect x="86" y="208" width="228" height="22" rx="11" fill="#d9452e" />
      <path d="M70 206 C90 186 104 214 124 196 C144 180 158 212 180 194 C200 178 216 210 238 194 C258 180 274 212 296 196 C312 186 326 200 332 206 C320 216 80 218 70 206 Z" fill="#7cb342" />
      <path d="M78 196 C78 112 140 84 200 84 C260 84 322 112 322 196 Z" fill="#e2a04f" />
      <path d="M100 168 C110 124 150 102 196 100" stroke="#f4c27c" strokeWidth="10" strokeLinecap="round" fill="none" />
      {[
        [150, 130, -20],
        [196, 116, 0],
        [244, 132, 20],
        [126, 166, -40],
        [222, 154, 10],
        [270, 166, 40],
        [176, 152, -10],
      ].map(([x, y, r]) => (
        <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="7" ry="4" fill="#fbe7bf" transform={`rotate(${r} ${x} ${y})`} />
      ))}
      <rect x="198" y="44" width="5" height="60" className="f-ink" />
      <path d="M203 46 L246 58 L203 70 Z" className="f-acc" />
    </Svg>
  );
}

function Cup() {
  return (
    <Svg>
      <rect width="400" height="400" className="f-sur" />
      <g transform="rotate(-20 96 300)">
        <path d="M30 300 C40 240 150 240 162 300 C150 288 130 286 120 296 C106 278 84 278 72 296 C62 286 42 288 30 300 Z" fill="#d99a4e" />
        <path d="M72 296 C80 270 112 270 120 296" stroke="#b9772f" strokeWidth="4" fill="none" />
      </g>
      <circle cx="226" cy="178" r="150" className="f-ink" opacity="0.1" />
      <circle cx="220" cy="170" r="150" className="f-bg" />
      <circle cx="220" cy="170" r="118" className="f-none s-ink3" strokeWidth="3" />
      <rect x="320" y="150" width="70" height="40" rx="20" className="f-bg" />
      <circle cx="220" cy="170" r="104" className="f-bg" />
      <circle cx="220" cy="170" r="104" className="f-none s-ink3" strokeWidth="6" />
      <circle cx="220" cy="170" r="88" fill="#6b4226" />
      <circle cx="220" cy="170" r="88" fill="#8a5a3a" opacity="0.5" />
      <path d="M220 222 C170 188 168 146 196 140 C210 137 218 146 220 156 C222 146 230 137 244 140 C272 146 270 188 220 222 Z" fill="#ead6b8" />
      <path d="M220 200 C196 182 196 162 208 160 C214 159 218 164 220 170 C222 164 226 159 232 160 C244 162 244 182 220 200 Z" fill="#8a5a3a" opacity="0.55" />
      <rect x="40" y="88" width="150" height="10" rx="5" className="f-ink2" transform="rotate(-24 40 88)" />
      <ellipse cx="44" cy="96" rx="20" ry="13" className="f-ink2" transform="rotate(-24 44 96)" />
      {[
        [330, 330],
        [300, 360],
        [350, 290],
      ].map(([x, y]) => (
        <g key={x} transform={`rotate(30 ${x} ${y})`}>
          <ellipse cx={x} cy={y} rx="12" ry="16" fill="#4a2c1d" />
          <path d={`M${x} ${y - 13} C${x - 5} ${y - 4} ${x + 5} ${y + 4} ${x} ${y + 13}`} stroke="#7a4e35" strokeWidth="2.5" fill="none" />
        </g>
      ))}
    </Svg>
  );
}

function Build() {
  return (
    <Svg>
      <rect width="400" height="400" className="f-sur" />
      <g className="s-ink3" strokeWidth="1">
        {range(21).map((i) => (
          <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="400" />
        ))}
        {range(21).map((i) => (
          <line key={`h${i}`} x1="0" y1={i * 20} x2="400" y2={i * 20} />
        ))}
      </g>
      <g className="f-none s-ink" strokeWidth="4" strokeLinejoin="round">
        <path d="M80 330 V190 L200 100 L320 190 V330 Z" className="f-bg s-ink" />
        <rect x="176" y="250" width="48" height="80" />
        <rect x="104" y="214" width="50" height="46" />
        <rect x="246" y="214" width="50" height="46" />
        <line x1="129" y1="214" x2="129" y2="260" />
        <line x1="271" y1="214" x2="271" y2="260" />
        <line x1="60" y1="330" x2="340" y2="330" />
      </g>
      <rect x="250" y="120" width="26" height="46" className="f-ink" />
      <g className="s-acc" strokeWidth="2.5">
        <line x1="80" y1="356" x2="320" y2="356" />
        <line x1="80" y1="348" x2="80" y2="364" />
        <line x1="320" y1="348" x2="320" y2="364" />
        <line x1="352" y1="190" x2="352" y2="330" />
        <line x1="344" y1="190" x2="360" y2="190" />
        <line x1="344" y1="330" x2="360" y2="330" />
      </g>
      <rect x="168" y="346" width="64" height="20" className="f-sur" />
      <text x="200" y="361" textAnchor="middle" className="pv-svgtext f-ink">8,40 m</text>
      <g transform="rotate(-14 70 70)">
        <rect x="30" y="40" width="96" height="96" className="f-acc" />
        <rect x="30" y="112" width="96" height="24" className="f-bg" />
      </g>
      <g transform="rotate(12 300 60)">
        <rect x="240" y="40" width="150" height="30" className="f-acc" />
        {range(13).map((i) => (
          <line key={i} x1={248 + i * 11} y1="40" x2={248 + i * 11} y2={i % 2 ? 50 : 56} className="s-ink" strokeWidth="2" />
        ))}
      </g>
    </Svg>
  );
}

function Roof() {
  return (
    <Svg>
      <rect width="400" height="400" className="f-sur" />
      <circle cx="320" cy="90" r="46" className="f-acc3" />
      <defs>
        <pattern id="pv-roof-tiles" width="30" height="20" patternUnits="userSpaceOnUse">
          <rect width="30" height="20" className="f-acc" />
          <path d="M0 20 C0 6 30 6 30 20" className="f-none s-ink" strokeOpacity="0.35" strokeWidth="2" />
        </pattern>
      </defs>
      <rect x="250" y="96" width="34" height="80" className="f-ink2" />
      <path d="M30 220 L200 80 L370 220 Z" fill="url(#pv-roof-tiles)" />
      <path d="M30 220 L200 80 L370 220" className="f-none s-ink" strokeWidth="6" strokeLinejoin="round" />
      <rect x="70" y="220" width="260" height="140" className="f-bg" />
      <rect x="62" y="216" width="276" height="12" rx="6" className="f-ink2" />
      <rect x="110" y="256" width="56" height="54" className="f-ink3" />
      <rect x="234" y="256" width="56" height="54" className="f-ink3" />
      <rect x="0" y="356" width="400" height="44" className="f-ink3" />
    </Svg>
  );
}

function Paving() {
  return (
    <Svg>
      <defs>
        <pattern id="pv-paving" width="60" height="40" patternUnits="userSpaceOnUse">
          <rect width="60" height="40" className="f-ink3" />
          <rect x="1.5" y="1.5" width="27" height="17" rx="2" className="f-bg" />
          <rect x="31.5" y="1.5" width="27" height="17" rx="2" className="f-sur" />
          <rect x="-13.5" y="21.5" width="27" height="17" rx="2" className="f-sur" />
          <rect x="16.5" y="21.5" width="27" height="17" rx="2" className="f-bg" />
          <rect x="46.5" y="21.5" width="27" height="17" rx="2" className="f-sur" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill="#8fae5b" />
      <path d="M150 400 C160 300 200 230 300 180 L400 160 V400 Z" fill="url(#pv-paving)" />
      <path d="M150 400 C160 300 200 230 300 180 L400 160" className="f-none s-ink2" strokeWidth="8" />
      {[
        [80, 90, 56],
        [150, 60, 40],
        [60, 200, 38],
      ].map(([x, y, r]) => (
        <g key={x}>
          <circle cx={x} cy={y} r={r} fill="#6c8f3f" />
          <circle cx={x - r * 0.3} cy={y - r * 0.3} r={r * 0.45} fill="#86a94f" />
        </g>
      ))}
      <rect x="280" y="40" width="100" height="70" rx="6" className="f-acc" />
      <rect x="292" y="52" width="76" height="8" rx="4" className="f-on" opacity="0.7" />
    </Svg>
  );
}

const CAR_BODY: Record<CarBody, { body: string; glass: string; wheels: [number, number]; y: number; r: number }> = {
  hatch: {
    body: "M30 112 V90 C30 84 33 80 38 76 L58 56 C62 52 67 50 73 50 H190 C198 50 204 52 210 57 L236 78 L270 83 C280 85 286 92 286 101 V112 C286 115 284 117 281 117 H35 C32 117 30 115 30 112 Z",
    glass: "M68 58 H190 C195 58 199 60 203 63 L222 78 H52 Z",
    wheels: [86, 234],
    y: 117,
    r: 19,
  },
  kombi: {
    body: "M24 112 V86 C24 80 27 76 32 74 L44 56 C47 52 51 50 56 50 H196 C204 50 210 52 216 57 L242 78 L274 83 C284 85 290 92 290 101 V112 C290 115 288 117 285 117 H29 C26 117 24 115 24 112 Z",
    glass: "M52 58 H196 C201 58 205 60 209 63 L228 78 H42 Z",
    wheels: [82, 240],
    y: 117,
    r: 19,
  },
  suv: {
    body: "M26 108 V78 C26 72 29 68 34 66 L48 42 C51 37 56 35 62 35 H192 C200 35 206 38 211 43 L238 68 L272 74 C283 76 290 84 290 94 V108 C290 112 288 114 284 114 H31 C28 114 26 112 26 108 Z",
    glass: "M58 44 H190 C195 44 199 46 203 50 L224 67 H44 Z",
    wheels: [86, 236],
    y: 114,
    r: 22,
  },
  van: {
    body: "M20 112 V44 C20 38 24 34 30 34 H214 C222 34 228 37 232 43 L256 76 L280 82 C290 85 296 92 296 102 V112 C296 115 294 117 291 117 H25 C22 117 20 115 20 112 Z",
    glass: "M220 44 L244 76 H206 V44 Z",
    wheels: [72, 250],
    y: 117,
    r: 19,
  },
};

const CAR_TONES = ["var(--pv-accent)", "#c8ccd2", "#2c4766", "#3a3c40"];

function CarShape({ body, tone, x = 0, y = 0, scale = 1 }: { body: CarBody; tone: number; x?: number; y?: number; scale?: number }) {
  const c = CAR_BODY[body];
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="158" cy={c.y + 4} rx="138" ry="9" fill="#000" opacity="0.16" />
      <path d={c.body} style={{ fill: CAR_TONES[tone % CAR_TONES.length] }} />
      <path d={c.glass} fill="#1b222b" opacity="0.86" />
      {body !== "van" && <rect x={body === "kombi" ? 112 : 124} y="52" width="7" height="28" style={{ fill: CAR_TONES[tone % CAR_TONES.length] }} />}
      {body === "van" && (
        <>
          <rect x="140" y="44" width="54" height="26" rx="3" fill="#1b222b" opacity="0.86" />
          <line x1="132" y1="40" x2="132" y2="112" stroke="#000" strokeOpacity="0.18" strokeWidth="2" />
        </>
      )}
      <rect x="270" y="90" width="14" height="6" rx="3" fill="#fff6d8" />
      <rect x={body === "van" ? 20 : 26} y="88" width="8" height="10" rx="2" fill="#d4402c" />
      {c.wheels.map((wx) => (
        <g key={wx}>
          <circle cx={wx} cy={c.y} r={c.r} fill="#1c1d1f" />
          <circle cx={wx} cy={c.y} r={c.r * 0.45} fill="#c9ccd1" />
          <circle cx={wx} cy={c.y} r={c.r * 0.15} fill="#1c1d1f" />
        </g>
      ))}
    </g>
  );
}

function Car() {
  return (
    <Svg>
      <rect width="400" height="400" className="f-sur" />
      <circle cx="270" cy="150" r="118" className="f-acc3" />
      <rect x="0" y="292" width="400" height="108" className="f-ink2" />
      {range(6).map((i) => (
        <rect key={i} x={i * 80 - 10} y="340" width="44" height="7" rx="3.5" className="f-bg" opacity="0.8" />
      ))}
      <g className="s-ink3" strokeWidth="4" strokeLinecap="round">
        <line x1="12" y1="214" x2="64" y2="214" />
        <line x1="0" y1="240" x2="44" y2="240" />
        <line x1="24" y1="266" x2="70" y2="266" />
      </g>
      <CarShape body="hatch" tone={0} x={38} y={168} scale={1.12} />
    </Svg>
  );
}

function Garage() {
  const teeth = range(10).map((i) => {
    const a = (i / 10) * Math.PI * 2;
    return { x: 200 + Math.cos(a) * 118, y: 196 + Math.sin(a) * 118, deg: (a * 180) / Math.PI };
  });
  return (
    <Svg>
      <rect width="400" height="400" className="f-sur" />
      {teeth.map((t, i) => (
        <rect key={i} x={t.x - 20} y={t.y - 20} width="40" height="40" rx="6" className="f-acc" transform={`rotate(${t.deg + 45} ${t.x} ${t.y})`} />
      ))}
      <circle cx="200" cy="196" r="116" className="f-acc" />
      <circle cx="200" cy="196" r="54" className="f-sur" />
      <g transform="rotate(-40 200 196)">
        <rect x="186" y="80" width="28" height="240" rx="14" className="f-ink" />
        <path d="M168 70 C168 40 232 40 232 70 V96 C232 112 168 112 168 96 Z" className="f-ink" />
        <rect x="190" y="40" width="20" height="44" className="f-acc" />
      </g>
      {[
        [66, 70],
        [340, 330],
        [60, 330],
      ].map(([x, y]) => (
        <path key={x} d={`M${x - 20} ${y} L${x - 10} ${y - 17} H${x + 10} L${x + 20} ${y} L${x + 10} ${y + 17} H${x - 10} Z`} className="f-ink2" />
      ))}
    </Svg>
  );
}

function Care() {
  return (
    <Svg>
      <rect width="400" height="400" className="f-acc3" />
      <path d="M80 400 V180 C80 104 140 54 200 54 C260 54 320 104 320 180 V400 Z" className="f-sur" />
      <circle cx="200" cy="168" r="58" className="f-acc" />
      <path d="M150 230 C130 230 122 256 130 290 C136 318 140 350 156 350 C170 350 168 316 184 308 C192 304 208 304 216 308 C232 316 230 350 244 350 C260 350 264 318 270 290 C278 256 270 230 250 230 C232 230 222 240 200 240 C178 240 168 230 150 230 Z" className="f-bg" />
      <path d="M150 230 C130 230 122 256 130 290 C136 318 140 350 156 350 C170 350 168 316 184 308 C192 304 208 304 216 308 C232 316 230 350 244 350 C260 350 264 318 270 290 C278 256 270 230 250 230 C232 230 222 240 200 240 C178 240 168 230 150 230 Z" className="f-none s-ink3" strokeWidth="3" />
      <Spark x={292} y={232} r={18} className="f-acc" />
      <Spark x={118} y={128} r={11} className="f-bg" />
      <path d="M40 400 C40 330 70 300 110 290 C110 340 90 380 40 400 Z" className="f-acc2" />
      <path d="M360 400 C350 340 320 316 286 312 C292 356 318 386 360 400 Z" className="f-acc2" />
    </Svg>
  );
}

function Paw() {
  return (
    <Svg>
      <rect width="400" height="400" className="f-sur" />
      <circle cx="200" cy="210" r="160" className="f-acc3" />
      <g className="f-acc">
        <ellipse cx="200" cy="246" rx="74" ry="62" />
        <ellipse cx="118" cy="170" rx="30" ry="38" transform="rotate(-18 118 170)" />
        <ellipse cx="172" cy="128" rx="30" ry="40" transform="rotate(-6 172 128)" />
        <ellipse cx="236" cy="128" rx="30" ry="40" transform="rotate(6 236 128)" />
        <ellipse cx="288" cy="172" rx="30" ry="38" transform="rotate(18 288 172)" />
      </g>
      <g transform="rotate(-20 300 330)">
        <rect x="250" y="320" width="100" height="22" rx="11" className="f-bg" />
        <circle cx="250" cy="320" r="15" className="f-bg" />
        <circle cx="250" cy="342" r="15" className="f-bg" />
        <circle cx="350" cy="320" r="15" className="f-bg" />
        <circle cx="350" cy="342" r="15" className="f-bg" />
      </g>
      <path d="M70 330 C70 312 92 306 100 322 C108 306 130 312 130 330 C130 350 100 366 100 366 C100 366 70 350 70 330 Z" className="f-ink" />
    </Svg>
  );
}

function Stay() {
  return (
    <Svg>
      <rect width="400" height="400" className="f-acc3" />
      <circle cx="318" cy="84" r="34" className="f-acc" />
      <circle cx="40" cy="300" r="56" className="f-ink2" />
      <circle cx="372" cy="306" r="50" className="f-ink2" />
      <rect x="64" y="118" width="272" height="250" className="f-sur" />
      <rect x="54" y="104" width="292" height="20" className="f-ink" />
      <rect x="150" y="80" width="100" height="28" className="f-ink" />
      {range(2).flatMap((row) =>
        range(4).map((col) => {
          const x = 88 + col * 62;
          const y = 148 + row * 74;
          return (
            <g key={`${row}-${col}`}>
              <path d={`M${x} ${y + 48} V${y + 18} C${x} ${y + 4} ${x + 34} ${y + 4} ${x + 34} ${y + 18} V${y + 48} Z`} className="f-ink2" />
              {(row + col) % 3 === 0 && <path d={`M${x + 4} ${y + 44} V${y + 19} C${x + 4} ${y + 9} ${x + 30} ${y + 9} ${x + 30} ${y + 19} V${y + 44} Z`} className="f-acc" opacity="0.85" />}
            </g>
          );
        }),
      )}
      <path d="M170 368 V318 C170 296 230 296 230 318 V368 Z" className="f-ink" />
      <rect x="150" y="300" width="100" height="10" className="f-acc" />
      <rect x="0" y="366" width="400" height="34" className="f-ink" />
    </Svg>
  );
}

function StayWide() {
  return (
    <Svg w={800} h={500}>
      <rect width="800" height="500" className="f-acc3" />
      <circle cx="652" cy="104" r="42" className="f-acc" />
      {range(14).map((i) => (
        <circle key={i} cx={i * 62 + 10} cy={360 - ((i * 37) % 30)} r={46 + ((i * 13) % 18)} className="f-ink2" opacity="0.35" />
      ))}
      <rect x="196" y="160" width="408" height="290" className="f-sur" />
      <rect x="182" y="142" width="436" height="22" className="f-ink" />
      <rect x="320" y="104" width="160" height="40" className="f-ink" />
      <rect x="348" y="118" width="104" height="10" rx="5" className="f-acc" />
      {range(2).flatMap((row) =>
        range(6).map((col) => {
          const x = 220 + col * 62;
          const y = 186 + row * 92;
          if (row === 1 && (col === 2 || col === 3)) return null;
          return (
            <g key={`${row}-${col}`}>
              <path d={`M${x} ${y + 60} V${y + 22} C${x} ${y + 4} ${x + 38} ${y + 4} ${x + 38} ${y + 22} V${y + 60} Z`} className="f-ink2" />
              {(row * 6 + col) % 4 === 1 && <path d={`M${x + 4} ${y + 56} V${y + 23} C${x + 4} ${y + 10} ${x + 34} ${y + 10} ${x + 34} ${y + 23} V${y + 56} Z`} className="f-acc" opacity="0.9" />}
              <rect x={x - 4} y={y + 60} width="46" height="6" className="f-ink" opacity="0.25" />
            </g>
          );
        }),
      )}
      <rect x="338" y="350" width="124" height="12" className="f-acc" />
      <path d="M356 450 V392 C356 362 444 362 444 392 V450 Z" className="f-ink" />
      <path d="M368 450 V396 C368 376 432 376 432 396 V450 Z" className="f-acc" opacity="0.35" />
      {[
        [120, 380, 74],
        [62, 420, 52],
        [690, 384, 70],
        [748, 424, 50],
      ].map(([x, y, r]) => (
        <g key={x}>
          <rect x={x - 5} y={y} width="10" height={470 - y} className="f-ink" />
          <circle cx={x} cy={y - r * 0.4} r={r} className="f-ink2" />
        </g>
      ))}
      <rect x="0" y="450" width="800" height="50" className="f-ink" />
      <path d="M356 450 H444 L500 500 H300 Z" className="f-sur" opacity="0.5" />
    </Svg>
  );
}

function Route() {
  return (
    <Svg>
      <rect width="400" height="400" className="f-sur" />
      {[
        [30, 40, 90, 60],
        [250, 30, 120, 70],
        [40, 260, 70, 100],
        [290, 250, 90, 60],
        [160, 300, 60, 70],
      ].map(([x, y, w, h]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx="6" className="f-ink3" />
      ))}
      <path d="M-20 330 C80 330 90 210 190 200 C290 190 300 90 420 70" className="f-none s-ink2" strokeWidth="54" strokeLinecap="round" />
      <path d="M-20 330 C80 330 90 210 190 200 C290 190 300 90 420 70" className="f-none s-bg" strokeWidth="4" strokeDasharray="16 14" />
      <circle cx="60" cy="318" r="14" className="f-bg" />
      <circle cx="60" cy="318" r="7" className="f-ink" />
      <path d="M300 160 C300 110 250 100 250 60 C250 32 272 12 300 12 C328 12 350 32 350 60 C350 100 300 110 300 160 Z" className="f-acc" />
      <circle cx="300" cy="60" r="16" className="f-bg" />
      <g transform="translate(110 104) rotate(-8)">
        <path d="M0 40 L12 0 H108 L120 40 Z" className="f-acc" />
        {range(6).map((i) => (
          <rect key={i} x={14 + i * 16} y="26" width="8" height="8" className="f-ink" />
        ))}
        {range(6).map((i) => (
          <rect key={`b${i}`} x={22 + i * 16} y="18" width="8" height="8" className="f-ink" />
        ))}
      </g>
    </Svg>
  );
}

function Tow() {
  return (
    <Svg>
      <rect width="400" height="400" className="f-sur" />
      <circle cx="300" cy="120" r="90" className="f-acc3" />
      <rect x="0" y="300" width="400" height="100" className="f-ink2" />
      <rect x="40" y="224" width="230" height="22" className="f-ink" />
      <path d="M270 246 V170 C270 162 276 156 284 156 H330 C338 156 344 160 348 166 L372 206 V246 Z" className="f-acc" />
      <path d="M296 168 H330 L350 202 H296 Z" fill="#1b222b" opacity="0.85" />
      <rect x="282" y="140" width="26" height="12" rx="4" className="f-ink" />
      <rect x="40" y="246" width="332" height="26" className="f-acc" />
      {[90, 160, 320].map((x) => (
        <g key={x}>
          <circle cx={x} cy="278" r="24" fill="#1c1d1f" />
          <circle cx={x} cy="278" r="10" fill="#c9ccd1" />
        </g>
      ))}
      <CarShape body="hatch" tone={1} x={42} y={110} scale={0.74} />
      <path d="M60 330 L90 380 H30 Z" className="f-acc" />
      <path d="M60 346 V364" className="s-ink" strokeWidth="4" strokeLinecap="round" />
    </Svg>
  );
}

function Van() {
  return (
    <Svg>
      <rect width="400" height="400" className="f-sur" />
      <rect x="0" y="300" width="400" height="100" className="f-ink3" />
      {[
        [262, 196, 90, 70],
        [276, 132, 64, 64],
        [300, 86, 46, 46],
      ].map(([x, y, w, h]) => (
        <g key={y}>
          <rect x={x} y={y} width={w} height={h} fill="#c8955f" />
          <rect x={x + w / 2 - 6} y={y} width="12" height={h} fill="#e3c08f" />
        </g>
      ))}
      <rect x="250" y="266" width="114" height="10" className="f-ink" />
      <CarShape body="van" tone={0} x={-6} y={168} scale={0.86} />
    </Svg>
  );
}

const TONE_FILL = ["var(--pv-accent)", "color-mix(in oklab, var(--pv-ink) 75%, var(--pv-bg))", "color-mix(in oklab, var(--pv-accent) 45%, var(--pv-bg))", "color-mix(in oklab, var(--pv-ink) 25%, var(--pv-surface))"];
const tone = (t: number) => ({ fill: TONE_FILL[t % TONE_FILL.length] });

function ProductShapeSvg({ shape, t }: { shape: ProductShape; t: number }) {
  switch (shape) {
    case "jar":
    case "jar-tall": {
      const h = shape === "jar" ? 96 : 124;
      const top = 180 - h;
      return (
        <g>
          <rect x="58" y={top} width="84" height={h} rx="14" className="f-bg" opacity="0.95" />
          <rect x="62" y={top + 20} width="76" height={h - 24} rx="10" fill="#efe6d6" />
          <rect x="58" y={top + h * 0.42} width="84" height={h * 0.34} style={tone(t)} />
          <rect x="70" y={top + h * 0.52} width="60" height="5" rx="2.5" className="f-bg" opacity="0.8" />
          <rect x="58" y={top} width="84" height={h} rx="14" className="f-none s-ink3" strokeWidth="2.5" />
          <line x1="100" y1={top + 22} x2="100" y2={top + 8} className="s-ink" strokeWidth="2.5" />
          <path d={`M100 ${top - 22} C110 ${top - 10} 108 ${top + 6} 100 ${top + 8} C92 ${top + 6} 90 ${top - 10} 100 ${top - 22} Z`} fill="#f4b342" />
          <path d={`M100 ${top - 10} C104 ${top - 4} 104 ${top + 4} 100 ${top + 6} C96 ${top + 4} 96 ${top - 4} 100 ${top - 10} Z`} fill="#ffe08a" />
        </g>
      );
    }
    case "bottle":
      return (
        <g>
          {[-14, -4, 6, 14].map((d, i) => (
            <line key={i} x1={100 + d * 0.3} y1="60" x2={100 + d * 2.2} y2="8" className="s-ink2" strokeWidth="3" strokeLinecap="round" />
          ))}
          <rect x="86" y="54" width="28" height="22" rx="4" className="f-ink" />
          <path d="M70 92 C70 78 82 74 100 74 C118 74 130 78 130 92 V170 C130 176 126 180 120 180 H80 C74 180 70 176 70 170 Z" style={tone(t)} />
          <rect x="80" y="112" width="40" height="40" rx="4" className="f-bg" opacity="0.9" />
          <rect x="88" y="124" width="24" height="4" rx="2" className="f-ink2" />
          <rect x="88" y="134" width="16" height="4" rx="2" className="f-ink3" />
        </g>
      );
    case "dropper":
      return (
        <g>
          <path d="M92 40 C92 26 108 26 108 40 V62 H92 Z" className="f-ink" />
          <rect x="86" y="62" width="28" height="22" rx="3" className="f-ink2" />
          <path d="M76 98 C76 88 84 84 100 84 C116 84 124 88 124 98 V172 C124 177 120 180 115 180 H85 C80 180 76 177 76 172 Z" style={tone(t)} opacity="0.92" />
          <rect x="84" y="118" width="32" height="34" rx="3" className="f-bg" opacity="0.92" />
        </g>
      );
    case "box":
      return (
        <g>
          <rect x="44" y="92" width="112" height="88" rx="4" style={tone(t)} />
          <rect x="40" y="80" width="120" height="22" rx="4" style={tone(t)} />
          <rect x="40" y="80" width="120" height="22" rx="4" className="f-ink" opacity="0.12" />
          <rect x="92" y="80" width="16" height="100" className="f-bg" opacity="0.9" />
          <path d="M100 80 C86 56 62 62 72 76 C78 84 92 82 100 80 C108 82 122 84 128 76 C138 62 114 56 100 80 Z" className="f-bg" />
        </g>
      );
    case "tube":
      return (
        <g transform="rotate(-18 100 120)">
          <rect x="82" y="150" width="36" height="28" rx="4" className="f-ink" />
          <path d="M72 46 H128 L120 150 H80 Z" style={tone(t)} />
          <rect x="72" y="40" width="56" height="10" rx="2" style={tone(t)} />
          <rect x="88" y="80" width="24" height="40" rx="3" className="f-bg" opacity="0.85" />
        </g>
      );
    case "bag":
      return (
        <g>
          <path d="M60 64 H140 L146 180 H54 Z" style={tone(t)} />
          <path d="M60 64 H140 L136 44 H64 Z" className="f-ink" opacity="0.18" />
          <rect x="60" y="56" width="80" height="10" style={tone(t)} />
          <rect x="72" y="100" width="56" height="50" rx="3" className="f-bg" />
          <rect x="80" y="110" width="40" height="5" rx="2.5" className="f-ink" />
          <rect x="80" y="121" width="28" height="4" rx="2" className="f-ink3" />
          <circle cx="100" cy="86" r="6" className="f-ink" opacity="0.35" />
        </g>
      );
    case "grinder":
      return (
        <g>
          <rect x="74" y="80" width="52" height="100" rx="8" style={tone(t)} />
          <rect x="70" y="72" width="60" height="14" rx="4" className="f-ink" />
          <line x1="100" y1="72" x2="100" y2="46" className="s-ink" strokeWidth="5" />
          <line x1="100" y1="46" x2="146" y2="40" className="s-ink" strokeWidth="5" strokeLinecap="round" />
          <circle cx="150" cy="40" r="9" className="f-acc" />
          <rect x="74" y="120" width="52" height="8" className="f-bg" opacity="0.4" />
        </g>
      );
    case "tee":
    case "sweater":
    case "hoodie":
      return (
        <g>
          <path
            d={
              shape === "tee"
                ? "M70 46 L46 58 L30 92 L56 102 L62 88 V178 H138 V88 L144 102 L170 92 L154 58 L130 46 C124 60 76 60 70 46 Z"
                : "M70 46 L46 58 L26 150 L50 156 L62 100 V178 H138 V100 L150 156 L174 150 L154 58 L130 46 C124 60 76 60 70 46 Z"
            }
            style={tone(t)}
          />
          {shape === "hoodie" && <path d="M70 46 C72 22 128 22 130 46 C124 64 76 64 70 46 Z" style={tone(t)} />}
          {shape === "hoodie" && <path d="M80 46 C84 34 116 34 120 46 C112 54 88 54 80 46 Z" className="f-ink" opacity="0.25" />}
          {shape === "sweater" && range(4).map((i) => <line key={i} x1="62" y1={110 + i * 16} x2="138" y2={110 + i * 16} className="s-bg" strokeWidth="2" opacity="0.5" />)}
          {shape === "tee" && <path d="M76 50 C84 62 116 62 124 50" className="f-none s-ink" strokeOpacity="0.2" strokeWidth="3" />}
          <rect x="62" y="166" width="76" height="12" className="f-ink" opacity="0.12" />
        </g>
      );
    case "pants":
      return (
        <g>
          <path d="M64 30 H136 L150 180 H110 L100 80 L90 180 H50 Z" style={tone(t)} />
          <rect x="64" y="30" width="72" height="12" className="f-ink" opacity="0.15" />
        </g>
      );
    case "cap":
      return (
        <g>
          <path d="M48 150 C48 84 152 84 152 150 Z" style={tone(t)} />
          <rect x="44" y="146" width="112" height="24" rx="8" style={tone(t)} />
          <rect x="44" y="146" width="112" height="24" rx="8" className="f-ink" opacity="0.15" />
          <circle cx="100" cy="82" r="16" className="f-bg" />
        </g>
      );
    case "tote":
      return (
        <g>
          <path d="M76 70 C76 30 124 30 124 70" className="f-none s-ink2" strokeWidth="6" />
          <rect x="54" y="66" width="92" height="114" rx="4" style={tone(t)} />
          <circle cx="100" cy="122" r="18" className="f-bg" opacity="0.85" />
        </g>
      );
  }
}

function ShopScene({ items }: { items: [ProductShape, number][] }) {
  return (
    <Svg>
      <rect width="400" height="400" className="f-sur" />
      <circle cx="200" cy="200" r="150" className="f-acc3" />
      <rect x="60" y="300" width="280" height="100" className="f-bg" />
      <rect x="110" y="250" width="180" height="56" className="f-ink3" />
      <rect x="60" y="300" width="280" height="6" className="f-ink" opacity="0.08" />
      <g transform="translate(16 128) scale(0.9)">
        <ProductShapeSvg shape={items[0][0]} t={items[0][1]} />
      </g>
      <g transform="translate(110 54) scale(1.06)">
        <ProductShapeSvg shape={items[1][0]} t={items[1][1]} />
      </g>
      <g transform="translate(212 128) scale(0.9)">
        <ProductShapeSvg shape={items[2][0]} t={items[2][1]} />
      </g>
    </Svg>
  );
}

function Sun() {
  return (
    <Svg>
      <rect width="400" height="400" className="f-sur" />
      <g className="s-acc" strokeWidth="6" strokeLinecap="round">
        {range(12).map((i) => {
          const a = (i / 12) * Math.PI * 2;
          return <line key={i} x1={300 + Math.cos(a) * 64} y1={96 + Math.sin(a) * 64} x2={300 + Math.cos(a) * 84} y2={96 + Math.sin(a) * 84} />;
        })}
      </g>
      <circle cx="300" cy="96" r="50" className="f-acc" />
      <path d="M20 400 V250 L170 150 L320 250 V400 Z" className="f-bg" />
      <path d="M0 262 L170 140 L340 262" className="f-none s-ink" strokeWidth="10" strokeLinejoin="round" />
      <g transform="matrix(1 -0.72 0 1 0 0)">
        {range(3).flatMap((row) =>
          range(4).map((col) => (
            <rect key={`${row}-${col}`} x={36 + col * 32} y={290 + row * 30} width="29" height="27" fill="#1d3557" />
          )),
        )}
      </g>
      <g transform="matrix(1 -0.72 0 1 0 0)" stroke="#6f8fb5" strokeWidth="1.5" opacity="0.6">
        {range(3).flatMap((row) => range(4).map((col) => <line key={`${row}-${col}`} x1={36 + col * 32} y1={304 + row * 30} x2={65 + col * 32} y2={304 + row * 30} />))}
      </g>
      <rect x="140" y="310" width="60" height="90" className="f-ink2" />
      <rect x="236" y="290" width="54" height="50" className="f-ink3" />
      <path d="M352 300 L332 344 H354 L340 390 L380 330 H358 L372 300 Z" className="f-acc" />
    </Svg>
  );
}

function HeatPump() {
  return (
    <Svg>
      <rect width="400" height="400" className="f-sur" />
      <rect x="0" y="0" width="150" height="400" className="f-ink3" />
      {range(9).map((i) => (
        <line key={i} x1="0" y1={i * 46 + 20} x2="150" y2={i * 46 + 20} className="s-sur" strokeWidth="4" />
      ))}
      <rect x="120" y="150" width="230" height="170" rx="10" className="f-bg" />
      <rect x="120" y="150" width="230" height="170" rx="10" className="f-none s-ink3" strokeWidth="4" />
      <circle cx="210" cy="235" r="62" className="f-ink3" />
      {range(5).map((i) => (
        <path key={i} d="M210 235 C214 205 236 190 246 200 C240 216 226 228 210 235 Z" className="f-ink2" transform={`rotate(${i * 72} 210 235)`} />
      ))}
      <circle cx="210" cy="235" r="10" className="f-ink" />
      {range(6).map((i) => (
        <rect key={i} x="292" y={176 + i * 20} width="40" height="6" rx="3" className="f-ink3" />
      ))}
      <rect x="140" y="320" width="20" height="30" className="f-ink2" />
      <rect x="310" y="320" width="20" height="30" className="f-ink2" />
      <circle cx="330" cy="70" r="34" className="f-acc" />
      <g className="s-ink2" strokeWidth="5" strokeLinecap="round">
        {range(3).map((i) => (
          <line key={i} x1="70" y1="50" x2="70" y2="110" transform={`rotate(${i * 60} 70 80)`} />
        ))}
      </g>
    </Svg>
  );
}

function Scissors() {
  return (
    <Svg>
      <rect width="400" height="400" className="f-sur" />
      <circle cx="210" cy="190" r="150" className="f-acc3" />
      <path d="M40 360 C120 320 160 380 230 340 C300 300 330 360 400 330" className="f-none s-acc" strokeWidth="6" strokeLinecap="round" />
      <path d="M20 330 C100 290 150 350 220 310" className="f-none s-acc" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
      <g transform="rotate(-30 200 200)">
        <path d="M196 196 L170 40 C168 30 176 26 180 34 L214 196 Z" className="f-ink" />
        <path d="M204 196 L230 40 C232 30 224 26 220 34 L186 196 Z" className="f-ink2" />
        <circle cx="200" cy="196" r="9" className="f-acc" />
        <circle cx="172" cy="270" r="40" className="f-none s-ink" strokeWidth="14" />
        <circle cx="228" cy="270" r="40" className="f-none s-ink2" strokeWidth="14" />
        <path d="M196 200 L180 236" className="s-ink" strokeWidth="14" />
        <path d="M204 200 L220 236" className="s-ink2" strokeWidth="14" />
      </g>
      <g transform="rotate(14 300 90)">
        <rect x="236" y="70" width="140" height="26" rx="6" className="f-acc" />
        {range(14).map((i) => (
          <rect key={i} x={242 + i * 9.6} y="94" width="5" height="34" rx="2" className="f-acc" />
        ))}
      </g>
    </Svg>
  );
}

function Ledger() {
  return (
    <Svg>
      <rect width="400" height="400" className="f-sur" />
      <g transform="rotate(-8 150 210)">
        <rect x="60" y="80" width="190" height="250" rx="6" className="f-ink3" />
      </g>
      <rect x="72" y="70" width="190" height="250" rx="6" className="f-bg" />
      <rect x="96" y="100" width="100" height="10" rx="5" className="f-ink" />
      {range(7).map((i) => (
        <g key={i}>
          <rect x="96" y={130 + i * 22} width="96" height="6" rx="3" className="f-ink3" />
          <rect x={206} y={130 + i * 22} width="32" height="6" rx="3" className={i === 6 ? "f-acc" : "f-ink3"} />
        </g>
      ))}
      <rect x="226" y="40" width="150" height="120" rx="8" className="f-ink" />
      {[40, 64, 52, 86].map((h, i) => (
        <rect key={i} x={246 + i * 30} y={140 - h} width="18" height={h} rx="2" className={i === 3 ? "f-acc" : "f-acc2"} />
      ))}
      <rect x="236" y="196" width="130" height="170" rx="12" className="f-ink" />
      <rect x="252" y="212" width="98" height="34" rx="4" className="f-acc3" />
      {range(3).flatMap((r) =>
        range(3).map((c) => <rect key={`${r}${c}`} x={254 + c * 34} y={260 + r * 32} width="26" height="24" rx="4" className={r === 2 && c === 2 ? "f-acc" : "f-ink2"} />),
      )}
    </Svg>
  );
}

function Wrench() {
  return (
    <Svg>
      <rect width="400" height="400" className="f-sur" />
      <rect x="0" y="250" width="260" height="40" className="f-ink3" />
      <rect x="220" y="80" width="40" height="210" className="f-ink3" />
      <rect x="200" y="236" width="80" height="68" rx="8" className="f-ink2" />
      <rect x="208" y="70" width="64" height="24" rx="6" className="f-ink2" />
      <path d="M240 120 C240 120 210 160 210 180 C210 197 223 210 240 210 C257 210 270 197 270 180 C270 160 240 120 240 120 Z" className="f-acc" opacity="0.9" />
      <g transform="rotate(38 140 170)">
        <rect x="124" y="120" width="32" height="220" rx="16" className="f-ink" />
        <path d="M104 92 C104 52 176 52 176 92 V124 C176 140 104 140 104 124 Z" className="f-ink" />
        <rect x="128" y="50" width="24" height="48" className="f-sur" />
      </g>
      <path d="M338 40 L300 112 H332 L312 178 L366 96 H334 L354 40 Z" className="f-acc" />
    </Svg>
  );
}

function Sparkle() {
  return (
    <Svg>
      <rect width="400" height="400" className="f-sur" />
      <circle cx="200" cy="210" r="150" className="f-acc3" />
      <path d="M150 170 H250 V340 C250 352 242 360 230 360 H170 C158 360 150 352 150 340 Z" className="f-acc" />
      <rect x="170" y="210" width="60" height="70" rx="6" className="f-bg" opacity="0.9" />
      <rect x="180" y="226" width="40" height="6" rx="3" className="f-ink2" />
      <rect x="180" y="240" width="28" height="5" rx="2.5" className="f-ink3" />
      <rect x="176" y="136" width="48" height="34" className="f-ink" />
      <path d="M176 136 H120 C110 136 104 128 110 120 L128 100 H224 V136 Z" className="f-ink" />
      <path d="M150 170 L170 136" className="s-ink" strokeWidth="10" />
      {[
        [90, 110, 16],
        [70, 160, 10],
        [104, 70, 9],
        [300, 280, 22],
        [330, 220, 12],
      ].map(([x, y, r]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={r} className="f-bg s-ink3" strokeWidth="3" />
      ))}
      <Spark x={300} y={110} r={30} className="f-acc" />
      <Spark x={346} y={160} r={14} className="f-ink" />
      <Spark x={60} y={290} r={18} className="f-acc" />
    </Svg>
  );
}

export function HeroArt({ kind, wide }: { kind: ArtKey; wide?: boolean }) {
  if (wide && kind === "stay") return <StayWide />;
  switch (kind) {
    case "plate": return <Plate />;
    case "pizza": return <Pizza />;
    case "grill": return <Grill />;
    case "sushi": return <Sushi />;
    case "burger": return <Burger />;
    case "cup": return <Cup />;
    case "build": return <Build />;
    case "roof": return <Roof />;
    case "paving": return <Paving />;
    case "car": return <Car />;
    case "garage": return <Garage />;
    case "care": return <Care />;
    case "paw": return <Paw />;
    case "stay": return <Stay />;
    case "route": return <Route />;
    case "tow": return <Tow />;
    case "van": return <Van />;
    case "shop": return <ShopScene items={[["jar", 1], ["jar-tall", 0], ["bottle", 2]]} />;
    case "coffee": return <ShopScene items={[["bag", 1], ["bag", 0], ["grinder", 3]]} />;
    case "fashion": return <ShopScene items={[["tee", 2], ["hoodie", 0], ["cap", 1]]} />;
    case "cosmetics": return <ShopScene items={[["dropper", 1], ["jar", 0], ["tube", 2]]} />;
    case "sun": return <Sun />;
    case "heatpump": return <HeatPump />;
    case "scissors": return <Scissors />;
    case "ledger": return <Ledger />;
    case "wrench": return <Wrench />;
    case "sparkle": return <Sparkle />;
  }
}

function PatternThumb({ pattern }: { pattern: PatternKey }) {
  const W = 320;
  const H = 220;
  switch (pattern) {
    case "tiles":
      return (
        <Svg w={W} h={H} className="pv-svg">
          <rect width={W} height={H} className="f-bg" />
          {range(6).flatMap((c) => range(4).map((r) => <rect key={`${c}${r}`} x={c * 56 - 8} y={r * 60 - 10} width="54" height="58" className={(c + r) % 4 === 0 ? "f-ink3" : "f-sur"} />))}
          <rect x="196" y="40" width="80" height="96" rx="40" className="f-acc3" />
          <rect x="196" y="40" width="80" height="96" rx="40" className="f-none s-ink2" strokeWidth="3" />
          <rect x="180" y="150" width="112" height="22" rx="4" className="f-ink2" />
          <rect x="196" y="172" width="80" height="48" className="f-ink3" />
          <rect x="30" y="30" width="10" height="140" className="f-ink2" />
          <circle cx="58" cy="44" r="18" className="f-ink2" />
        </Svg>
      );
    case "kitchen":
      return (
        <Svg w={W} h={H} className="pv-svg">
          <rect width={W} height={H} className="f-sur" />
          {range(5).map((i) => (
            <rect key={i} x={20 + i * 58} y="24" width="52" height="56" rx="3" className="f-bg" />
          ))}
          <rect x="0" y="96" width={W} height="10" className="f-ink2" />
          {range(5).map((i) => (
            <g key={i}>
              <rect x={20 + i * 58} y="112" width="52" height="66" rx="3" className="f-bg" />
              <rect x={40 + i * 58} y="124" width="12" height="3" rx="1.5" className="f-ink2" />
            </g>
          ))}
          <rect x="70" y="178" width="180" height="42" className="f-ink" />
          <rect x="62" y="170" width="196" height="10" className="f-acc" />
          <rect x="140" y="48" width="44" height="30" rx="4" className="f-ink3" />
        </Svg>
      );
    case "planks":
      return (
        <Svg w={W} h={H} className="pv-svg">
          <rect width={W} height={H} className="f-sur" />
          <rect x="190" y="18" width="100" height="110" className="f-acc3" />
          <line x1="240" y1="18" x2="240" y2="128" className="s-sur" strokeWidth="5" />
          <line x1="190" y1="73" x2="290" y2="73" className="s-sur" strokeWidth="5" />
          <rect x="30" y="80" width="130" height="60" rx="10" className="f-ink2" />
          <rect x="22" y="62" width="146" height="28" rx="10" className="f-ink2" />
          <rect x="40" y="70" width="40" height="22" rx="6" className="f-acc" />
          {range(6).map((r) => (
            <g key={r}>
              <rect x="0" y={150 + r * 12} width={W} height="11" fill="#b98a5a" opacity={0.75 + (r % 2) * 0.15} />
              <line x1={(r * 97) % 260} y1={150 + r * 12} x2={(r * 97) % 260} y2={161 + r * 12} stroke="#8a6238" strokeWidth="1.5" />
            </g>
          ))}
        </Svg>
      );
    case "bricks":
      return (
        <Svg w={W} h={H} className="pv-svg">
          <rect width={W} height={H} className="f-ink3" />
          {range(11).flatMap((r) =>
            range(8).map((c) => <rect key={`${r}${c}`} x={c * 44 - (r % 2) * 22} y={r * 20} width="41" height="17" className={(c * 3 + r) % 5 === 0 ? "f-acc2" : "f-sur"} />),
          )}
          <rect x="110" y="56" width="100" height="90" className="f-ink2" />
          <rect x="116" y="62" width="88" height="78" className="f-acc3" />
          <line x1="160" y1="62" x2="160" y2="140" className="s-ink2" strokeWidth="5" />
          <rect x="100" y="146" width="120" height="10" className="f-bg" />
        </Svg>
      );
    case "roof":
      return (
        <Svg w={W} h={H} className="pv-svg">
          <defs>
            <pattern id="pv-thumb-roof" width="24" height="16" patternUnits="userSpaceOnUse">
              <rect width="24" height="16" className="f-acc" />
              <path d="M0 16 C0 5 24 5 24 16" className="f-none s-ink" strokeOpacity="0.3" strokeWidth="2" />
            </pattern>
          </defs>
          <rect width={W} height={H} className="f-acc3" />
          <path d="M0 220 L130 40 L320 120 V220 Z" fill="url(#pv-thumb-roof)" />
          <path d="M0 220 L130 40 L320 120" className="f-none s-ink" strokeWidth="6" />
          <rect x="200" y="50" width="30" height="50" className="f-ink2" />
        </Svg>
      );
    case "paving":
      return (
        <Svg w={W} h={H} className="pv-svg">
          <rect width={W} height={H} className="f-ink3" />
          {range(12).flatMap((r) =>
            range(9).map((c) => <rect key={`${r}${c}`} x={c * 40 - (r % 2) * 20 + 1} y={r * 20 + 1} width="38" height="18" rx="2" className={(r + c) % 3 === 0 ? "f-sur" : "f-bg"} />),
          )}
          <path d="M0 160 C80 150 200 210 320 170 V220 H0 Z" fill="#8fae5b" />
        </Svg>
      );
    case "panels":
      return (
        <Svg w={W} h={H} className="pv-svg">
          <rect width={W} height={H} className="f-acc3" />
          <circle cx="270" cy="40" r="22" className="f-acc" />
          <path d="M-10 220 L120 70 L340 140 V220 Z" className="f-ink2" />
          <g transform="matrix(1 0.32 -0.42 1 0 0)">
            {range(3).flatMap((r) => range(5).map((c) => <rect key={`${r}${c}`} x={150 + c * 34} y={44 + r * 30} width="31" height="27" fill="#1d3557" />))}
          </g>
        </Svg>
      );
    case "garden":
      return (
        <Svg w={W} h={H} className="pv-svg">
          <rect width={W} height={H} fill="#8fae5b" />
          {range(7).map((i) => (
            <ellipse key={i} cx={40 + i * 42} cy={170 - i * 16} rx="22" ry="12" className="f-sur" />
          ))}
          {[
            [60, 50, 34],
            [250, 150, 40],
            [280, 50, 26],
          ].map(([x, y, r]) => (
            <circle key={x} cx={x} cy={y} r={r} fill="#6c8f3f" />
          ))}
        </Svg>
      );
    case "fence":
      return (
        <Svg w={W} h={H} className="pv-svg">
          <rect width={W} height={H} className="f-sur" />
          <rect y="170" width={W} height="50" fill="#8fae5b" />
          <rect y="150" width={W} height="24" className="f-ink2" />
          {range(11).map((i) => (
            <rect key={i} x={6 + i * 30} y="40" width="18" height="114" className="f-ink" />
          ))}
          <rect y="70" width={W} height="8" className="f-ink" />
          <rect y="118" width={W} height="8" className="f-ink" />
        </Svg>
      );
  }
}

function RoomThumb({ variant }: { variant: number }) {
  const twin = variant === 1;
  return (
    <Svg w={320} h={220} className="pv-svg">
      <rect width="320" height="220" className="f-sur" />
      <rect y="168" width="320" height="52" className="f-ink3" />
      {variant === 2 ? (
        <g>
          <rect x="200" y="20" width="96" height="148" className="f-acc3" />
          <line x1="248" y1="20" x2="248" y2="168" className="s-sur" strokeWidth="5" />
          <circle cx="270" cy="60" r="14" className="f-acc" />
        </g>
      ) : (
        <g>
          <rect x="214" y="36" width="80" height="70" className="f-acc3" />
          <line x1="254" y1="36" x2="254" y2="106" className="s-sur" strokeWidth="4" />
        </g>
      )}
      {(twin ? [24, 112] : [40]).map((x) => (
        <g key={x}>
          <rect x={x} y="88" width={twin ? 76 : 146} height="40" rx="6" className="f-ink2" />
          <rect x={x + 4} y="120" width={twin ? 68 : 138} height="44" rx="6" className="f-bg" />
          <rect x={x + 4} y="138" width={twin ? 68 : 138} height="26" rx="4" className="f-acc" />
          <rect x={x + 10} y="108" width={twin ? 30 : 56} height="18" rx="8" className="f-bg" />
          {!twin && <rect x={x + 76} y="108" width="56" height="18" rx="8" className="f-bg" />}
        </g>
      ))}
      <rect x={twin ? 196 : 196} y="132" width="22" height="34" className="f-ink2" />
      <path d={`M${twin ? 199 : 199} 132 L207 112 L215 132 Z`} className="f-acc" />
    </Svg>
  );
}

function HallThumb({ variant }: { variant: number }) {
  return (
    <Svg w={320} h={220} className="pv-svg">
      <rect width="320" height="220" className={variant ? "f-sur" : "f-ink3"} />
      {range(4).map((i) => (
        <path key={i} d={`M${30 + i * 76} 120 V58 C${30 + i * 76} 30 ${78 + i * 76} 30 ${78 + i * 76} 58 V120 Z`} className="f-bg" opacity="0.7" />
      ))}
      <line x1="160" y1="0" x2="160" y2="30" className="s-ink2" strokeWidth="2" />
      {range(5).map((i) => (
        <circle key={i} cx={136 + i * 12} cy="36" r="5" className="f-acc" />
      ))}
      <rect y="140" width="320" height="80" className="f-ink2" opacity="0.35" />
      {[
        [70, 168],
        [160, 182],
        [250, 168],
      ].map(([x, y]) => (
        <g key={x}>
          <ellipse cx={x} cy={y} rx="40" ry="14" className="f-bg" />
          {range(6).map((k) => (
            <circle key={k} cx={x - 40 + k * 16} cy={y + (k % 2 ? 16 : -14)} r="5" className="f-ink2" />
          ))}
          <circle cx={x} cy={y - 4} r="5" className="f-acc" />
        </g>
      ))}
    </Svg>
  );
}

export function ThumbArt({ thumb }: { thumb: Thumb }) {
  switch (thumb.kind) {
    case "pattern":
      return <PatternThumb pattern={thumb.pattern} />;
    case "car":
      return (
        <Svg w={320} h={190} className="pv-svg">
          <rect width="320" height="190" className="f-sur" />
          <rect y="150" width="320" height="40" className="f-ink3" />
          <CarShape body={thumb.body} tone={thumb.tone} x={8} y={40} scale={0.95} />
        </Svg>
      );
    case "room":
      return <RoomThumb variant={thumb.variant} />;
    case "hall":
      return <HallThumb variant={thumb.variant} />;
    case "product":
      return (
        <Svg w={200} h={200} className="pv-svg">
          <rect width="200" height="200" className={thumb.tone % 2 ? "f-sur" : "f-acc3"} />
          <ellipse cx="100" cy="182" rx="56" ry="7" className="f-ink" opacity="0.12" />
          <ProductShapeSvg shape={thumb.shape} t={thumb.tone} />
        </Svg>
      );
  }
}

export function MapArt({ label }: { label: string }) {
  return (
    <Svg w={480} h={320} className="pv-svg">
      <rect width="480" height="320" className="f-sur" />
      {[
        [20, 20, 120, 80],
        [170, 10, 90, 60],
        [300, 30, 150, 70],
        [30, 140, 90, 120],
        [330, 150, 120, 50],
        [190, 210, 110, 90],
        [350, 240, 110, 70],
      ].map(([x, y, w, h]) => (
        <rect key={`${x}${y}`} x={x} y={y} width={w} height={h} rx="6" className="f-ink3" />
      ))}
      <rect x="150" y="100" width="160" height="90" rx="10" fill="#9cbf72" opacity="0.55" />
      <path d="M-10 120 C120 128 200 108 490 130" className="f-none s-bg" strokeWidth="18" />
      <path d="M150 -10 C160 120 140 220 170 330" className="f-none s-bg" strokeWidth="14" />
      <path d="M320 -10 L300 330" className="f-none s-bg" strokeWidth="10" />
      <path d="M0 230 C140 222 330 228 490 214" className="f-none s-bg" strokeWidth="10" />
      <path d="M240 330 C252 270 300 240 330 236" className="f-none s-acc" strokeWidth="5" strokeDasharray="2 10" strokeLinecap="round" />
      <g transform="translate(240 150)">
        <ellipse cx="0" cy="6" rx="18" ry="6" className="f-ink" opacity="0.2" />
        <path d="M0 4 C0 -22 -26 -28 -26 -52 C-26 -68 -14 -80 0 -80 C14 -80 26 -68 26 -52 C26 -28 0 -22 0 4 Z" className="f-acc" />
        <circle cx="0" cy="-52" r="10" className="f-bg" />
      </g>
      <g transform="translate(276 64)">
        <rect width={Math.min(190, 30 + label.length * 9)} height="34" rx="6" className="f-bg" />
        <text x="14" y="22" className="pv-svgtext f-ink">{label.length > 18 ? `${label.slice(0, 17)}…` : label}</text>
      </g>
    </Svg>
  );
}
