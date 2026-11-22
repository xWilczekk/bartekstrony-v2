"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { prefersReducedMotion } from "./use-media";

export function TypeText({
  text,
  render,
  className,
}: {
  text: string;
  render?: (visible: string) => ReactNode;
  className?: string;
}) {
  const [shown, setShown] = useState(text);
  const [typing, setTyping] = useState(false);
  const shownRef = useRef(text);

  useEffect(() => {
    if (shownRef.current === text) return;
    let timer = 0;

    if (prefersReducedMotion()) {
      timer = window.setTimeout(() => {
        shownRef.current = text;
        setShown(text);
      }, 0);
      return () => window.clearTimeout(timer);
    }

    const from = shownRef.current;
    let common = 0;
    while (common < from.length && common < text.length && from[common] === text[common]) common++;
    const steps = from.length - common + (text.length - common);
    const delay = Math.max(14, Math.min(42, 700 / Math.max(steps, 1)));

    const step = () => {
      const cur = shownRef.current;
      if (cur === text) {
        timer = window.setTimeout(() => setTyping(false), 450);
        return;
      }
      const next = text.startsWith(cur) ? text.slice(0, cur.length + 1) : cur.slice(0, -1);
      shownRef.current = next;
      setShown(next);
      timer = window.setTimeout(step, text.startsWith(next) ? delay : delay * 0.6);
    };

    timer = window.setTimeout(() => {
      setTyping(true);
      step();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [text]);

  return (
    <span className={className}>
      {render ? render(shown) : shown}
      {typing && <span className="pv-caret" aria-hidden="true" />}
    </span>
  );
}
