"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useLocale } from "@/i18n/client";
import { PALETTE_EVENT, XRAY_EVENT } from "./events";

const CommandPalette = dynamic(() => import("./command-palette"), { ssr: false });
const XRay = dynamic(() => import("./xray"), { ssr: false });

const isTyping = (t: EventTarget | null) =>
  t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));

const AWAY = { pl: "Halo, strona czeka 👋", en: "Hey, the page is waiting 👋" };

function consoleHello(en: boolean) {
  const w = window as unknown as { __bsHello?: boolean };
  if (w.__bsHello) return;
  w.__bsHello = true;
  const logo = [
    "  _                _       _          _                        ",
    " | |__   __ _ _ __| |_ ___| | _____ _| |_ _ __ ___  _ __  _   _ ",
    " | '_ \\ / _` | '__| __/ _ \\ |/ / __|_   _| '__/ _ \\| '_ \\| | | |",
    " | |_) | (_| | |  | ||  __/   <\\__ \\ | | | | | (_) | | | | |_| |",
    " |_.__/ \\__,_|_|   \\__\\___|_|\\_\\___/ |_| |_|  \\___/|_| |_|\\__, |",
    "                                                          |___/ ",
  ].join("\n");
  const big = "font: 600 15px/1.5 system-ui, sans-serif; color: #10201a; background: #c6f36b; padding: 6px 12px; border-radius: 6px";
  const body = "font: 13px/1.6 system-ui, sans-serif; color: inherit";
  console.log(`%c${logo}`, "font-family: monospace; color: #2f8f6c");
  console.log(`%c${en ? "Peeking at the code? I like people like you." : "Zaglądasz w kod? Lubię takich ludzi."}`, big);
  console.log(
    `%c${
      en
        ? "Next.js 16 · React 19 · Tailwind 4 · TypeScript — hand-made, no template.\nPress Ctrl+K on the page 😉\nkontakt@bartekstrony.pl"
        : "Next.js 16 · React 19 · Tailwind 4 · TypeScript — ręcznie, bez szablonu.\nWciśnij Ctrl+K na stronie 😉\nkontakt@bartekstrony.pl"
    }`,
    body,
  );
}

export function FunLayer() {
  const locale = useLocale();
  const [palette, setPalette] = useState(false);
  const [xray, setXray] = useState(false);

  useEffect(() => {
    const en = locale === "en";
    consoleHello(en);

    let saved = "";
    const onVisibility = () => {
      if (document.hidden) {
        saved = document.title;
        document.title = AWAY[locale];
      } else if (saved && document.title === AWAY[locale]) {
        document.title = saved;
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setPalette((v) => !v);
        return;
      }
      if (e.key === "/" && !isTyping(e.target) && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setPalette(true);
      }
    };

    let clicks: number[] = [];
    const onClick = (e: MouseEvent) => {
      const logo = (e.target as Element | null)?.closest?.("a[data-logo]");
      if (!logo) return;
      const now = Date.now();
      clicks = [...clicks.filter((t) => now - t < 1400), now];
      if (clicks.length >= 3) e.preventDefault();
      if (clicks.length >= 5) {
        clicks = [];
        void import("./logo-toy").then((m) => m.scatterLogo(logo as HTMLElement));
      }
    };

    let lensLoaded = false;
    const onOver = (e: PointerEvent) => {
      if (lensLoaded || e.pointerType !== "mouse" || !(e.target as Element | null)?.closest?.("img[data-lens]")) return;
      lensLoaded = true;
      const { clientX, clientY } = e;
      void import("./shot-lens").then((m) => m.startLens(clientX, clientY));
    };

    const openXray = () => setXray(true);
    const openPalette = () => setPalette(true);

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick, { capture: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener(XRAY_EVENT, openXray);
    window.addEventListener(PALETTE_EVENT, openPalette);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick, { capture: true });
      document.removeEventListener("pointerover", onOver);
      window.removeEventListener(XRAY_EVENT, openXray);
      window.removeEventListener(PALETTE_EVENT, openPalette);
    };
  }, [locale]);

  return (
    <>
      {palette && (
        <CommandPalette
          onClose={() => setPalette(false)}
          onXray={() => {
            setPalette(false);
            setXray(true);
          }}
        />
      )}
      {xray && <XRay onClose={() => setXray(false)} />}
    </>
  );
}
