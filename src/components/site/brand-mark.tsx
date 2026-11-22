const INK = "#10201a";
const LIME = "#c6f36b";

export function BrandMark({
  size,
  rounded,
  glyphScale = 1,
}: {
  size: number;
  rounded: boolean;
  glyphScale?: number;
}) {
  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      <svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx={rounded ? 7 : 0} fill={LIME} />
        <g transform={`translate(16 16) scale(${glyphScale}) translate(-16 -16)`}>
          <rect x="6" y="5" width="4" height="21" fill={INK} />
          <circle cx="13" cy="19" r="7" fill={INK} />
          <circle cx="13" cy="19" r="3" fill={LIME} />
          <rect x="22" y="22" width="4" height="4" fill={INK} />
        </g>
      </svg>
    </div>
  );
}
