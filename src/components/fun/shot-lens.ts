const SIZE = 116;
const ZOOM = 2.5;
const HANDLE = 30;

let started = false;

function sharpSrc(img: HTMLImageElement, needed: number) {
  const list = img.srcset
    .split(/,\s+/)
    .map((c) => {
      const [url, w] = c.trim().split(/\s+/);
      return { url, w: parseInt(w, 10) || 0 };
    })
    .filter((c) => c.url && c.w)
    .sort((a, b) => a.w - b.w);
  return (list.find((c) => c.w >= needed) ?? list[list.length - 1])?.url ?? img.currentSrc;
}

export function startLens(x: number, y: number) {
  if (started) return;
  started = true;
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const lens = document.createElement("div");
  lens.setAttribute("aria-hidden", "true");
  Object.assign(lens.style, {
    position: "fixed",
    left: "0",
    top: "0",
    zIndex: "60",
    width: `${SIZE}px`,
    height: `${SIZE}px`,
    borderRadius: "50%",
    pointerEvents: "none",
    backgroundColor: "#16130f",
    backgroundRepeat: "no-repeat",
    boxShadow: "0 0 0 2px #fff, 0 0 0 3px rgb(0 0 0 / 0.12), inset 0 0 18px rgb(0 0 0 / 0.18), 0 22px 44px -14px rgb(0 0 0 / 0.6)",
    opacity: "0",
    scale: "0.4",
    transition: calm ? "opacity 0.15s" : "opacity 0.18s, scale 0.32s cubic-bezier(0.16, 1, 0.3, 1)",
    willChange: "transform",
  } satisfies Partial<CSSStyleDeclaration>);

  const rim = SIZE / 2 + (SIZE / 2) * Math.SQRT1_2;
  const handle = document.createElement("span");
  Object.assign(handle.style, {
    position: "absolute",
    left: `${rim - HANDLE / 2 + 4}px`,
    top: `${rim - HANDLE / 2 + 4}px`,
    width: `${HANDLE}px`,
    height: `${HANDLE}px`,
    display: "grid",
    placeItems: "center",
    borderRadius: "50%",
    background: "var(--signal)",
    color: "#fff",
    boxShadow: "0 0 0 2px #fff",
  } satisfies Partial<CSSStyleDeclaration>);
  handle.innerHTML =
    '<svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 12 12 4M5.5 4H12v6.5"/></svg>';
  lens.append(handle);
  document.body.append(lens);

  let active: HTMLImageElement | null = null;
  let frame = 0;

  const hide = (instant = false) => {
    if (active) active.style.cursor = "";
    active = null;
    if (instant) lens.style.transition = "none";
    lens.style.opacity = "0";
    lens.style.scale = "0.4";
    if (instant) requestAnimationFrame(() => (lens.style.transition = calm ? "opacity 0.15s" : "opacity 0.18s, scale 0.32s cubic-bezier(0.16, 1, 0.3, 1)"));
  };

  const update = () => {
    frame = 0;
    const img = document.elementFromPoint(x, y)?.closest<HTMLImageElement>("img[data-lens]") ?? null;
    if (!img || !img.naturalWidth) return hide();

    const r = img.getBoundingClientRect();
    const fit = Math.max(r.width / img.naturalWidth, r.height / img.naturalHeight);
    const w = img.naturalWidth * fit;
    const h = img.naturalHeight * fit;
    const ox = (r.width - w) / 2;
    const px = (x - r.left - ox) * ZOOM - SIZE / 2;
    const py = (y - r.top) * ZOOM - SIZE / 2;

    if (img !== active) {
      if (active) active.style.cursor = "";
      active = img;
      img.style.cursor = "none";
      const hi = sharpSrc(img, w * ZOOM * Math.min(window.devicePixelRatio || 1, 2));
      lens.style.backgroundImage = `url("${hi}"), url("${img.currentSrc}")`;
    }
    lens.style.backgroundSize = `${w * ZOOM}px ${h * ZOOM}px`;
    lens.style.backgroundPosition = `${-px}px ${-py}px`;
    lens.style.transform = `translate3d(${x - SIZE / 2}px, ${y - SIZE / 2}px, 0)`;
    lens.style.opacity = "1";
    lens.style.scale = "1";
  };

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  window.addEventListener(
    "pointermove",
    (e) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      schedule();
    },
    { passive: true },
  );
  window.addEventListener("scroll", schedule, { passive: true });
  document.documentElement.addEventListener("pointerleave", () => hide());
  window.addEventListener("pointerdown", () => hide(true), { capture: true });

  schedule();
}
