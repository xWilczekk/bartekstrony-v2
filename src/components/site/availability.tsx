"use client";

import { useSyncExternalStore } from "react";
import { useLocale } from "@/i18n/client";
import { cn } from "@/lib/utils";

const MONTHS = [
  "styczeń",
  "luty",
  "marzec",
  "kwiecień",
  "maj",
  "czerwiec",
  "lipiec",
  "sierpień",
  "wrzesień",
  "październik",
  "listopad",
  "grudzień",
];

const MONTHS_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const noop = () => () => {};
const nextMonthPl = () => MONTHS[(new Date().getMonth() + 1) % 12];
const nextMonthEn = () => MONTHS_EN[(new Date().getMonth() + 1) % 12];

export function Availability({ className }: { className?: string }) {
  const en = useLocale() === "en";
  const month = useSyncExternalStore(noop, en ? nextMonthEn : nextMonthPl, () => null);

  return (
    <p
      className={cn(
        "label-mono inline-flex h-8 items-center gap-2.5 whitespace-nowrap rounded-full border hairline px-3 text-[0.68rem]",
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-signal motion-safe:animate-pulse" />
      <span>
        {en ? "Taking projects" : "Przyjmuję zlecenia"}
        {month && <span className="text-mute"> · {month}</span>}
      </span>
    </p>
  );
}
