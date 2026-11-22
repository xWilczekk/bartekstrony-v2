import type { CSSProperties } from "react";

export function Count({ value, onView, className }: { value: string; onView?: boolean; className?: string }) {
  const m = /^(\d+)(.*)$/.exec(value);
  if (!m) return <span className={className}>{value}</span>;
  const [, digits, rest] = m;
  return (
    <span className={className} data-view={onView ? "" : undefined}>
      <span className="sr-only">{value}</span>
      <span aria-hidden className="bs-count-num tabular-nums" style={{ "--to": Number(digits) } as CSSProperties} />
      {rest && <span aria-hidden>{rest}</span>}
    </span>
  );
}
