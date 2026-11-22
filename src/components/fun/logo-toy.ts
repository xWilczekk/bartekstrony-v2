let playing = false;

export function scatterLogo(link: HTMLElement) {
  if (playing || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const parts = [...link.querySelectorAll<HTMLElement>("span > span")].filter((s) => /^[a-z]+$/.test(s.textContent ?? ""));
  if (!parts.length) return;
  playing = true;

  const originals = parts.map((p) => p.textContent ?? "");
  const animations: Animation[] = [];
  parts.forEach((part, pi) => {
    part.textContent = "";
    [...originals[pi]].forEach((ch, i) => {
      const s = document.createElement("span");
      s.textContent = ch;
      s.style.display = "inline-block";
      part.appendChild(s);
      const dx = (Math.random() - 0.5) * 160;
      const dy = (Math.random() - 0.35) * 140;
      const r = (Math.random() - 0.5) * 140;
      animations.push(
        s.animate(
          [
            { transform: "none" },
            { transform: `translate(${dx}px, ${dy}px) rotate(${r}deg) scale(1.15)`, offset: 0.32 },
            { transform: "none" },
          ],
          { duration: 1300, delay: (pi * 6 + i) * 18, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
        ),
      );
    });
  });

  void Promise.all(animations.map((a) => a.finished.catch(() => {}))).then(() => {
    parts.forEach((p, i) => (p.textContent = originals[i]));
    playing = false;
  });
}
