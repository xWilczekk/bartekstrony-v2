"use client";

import { useTween } from "@/components/motion/tween";
import { formatPrice } from "@/content/services";
import { useLocale } from "@/i18n/client";

export function AnimatedNumber({
  value,
  format,
  className,
}: {
  value: number;
  format?: (n: number) => string;
  className?: string;
}) {
  const locale = useLocale();
  const v = useTween(value, { duration: 0.7 });
  const fmt = format ?? ((n: number) => formatPrice(n, locale));
  return <span className={className}>{fmt(Math.round(v / 10) * 10)}</span>;
}
