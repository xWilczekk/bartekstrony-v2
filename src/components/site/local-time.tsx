"use client";

import { useSyncExternalStore } from "react";

const clock = new Intl.DateTimeFormat("pl-PL", {
  timeZone: "Europe/Warsaw",
  hour: "2-digit",
  minute: "2-digit",
});

const read = () => clock.format(new Date());
const subscribe = (tick: () => void) => {
  const id = window.setInterval(tick, 10_000);
  return () => window.clearInterval(id);
};

export function LocalTime({ className }: { className?: string }) {
  const time = useSyncExternalStore(subscribe, read, () => null);
  return <time className={className}>{time ?? "--:--"}</time>;
}
