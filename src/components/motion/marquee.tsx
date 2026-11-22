import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

const CSS = `
.bs-marquee{display:flex;overflow:hidden}
.bs-marquee[data-fade]{-webkit-mask-image:linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent);mask-image:linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)}
.bs-marquee__group{display:flex;flex:none;align-items:center;justify-content:space-around;gap:var(--marquee-gap);min-width:100%;margin:0;padding:0 var(--marquee-gap) 0 0;list-style:none;animation:bs-marquee var(--marquee-duration) linear infinite;will-change:transform}
.bs-marquee[data-reverse] .bs-marquee__group{animation-direction:reverse}
.bs-marquee[data-hover-pause]:hover .bs-marquee__group,.bs-marquee:focus-within .bs-marquee__group,.bs-marquee[data-paused] .bs-marquee__group{animation-play-state:paused}
@keyframes bs-marquee{to{transform:translate3d(-100%,0,0)}}
@media (prefers-reduced-motion:reduce){
.bs-marquee{-webkit-mask-image:none;mask-image:none}
.bs-marquee__group{flex:1 1 auto;flex-wrap:wrap;justify-content:flex-start;row-gap:.75rem;padding-right:0;animation:none;will-change:auto}
.bs-marquee__group[aria-hidden]{display:none}
}`;

type MarqueeProps = {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  gap?: string;
  pauseOnHover?: boolean;
  fade?: boolean;
  as?: "div" | "ul";
  label?: string;
  id?: string;
  className?: string;
};

export function Marquee({
  children,
  duration = 40,
  reverse = false,
  gap = "3rem",
  pauseOnHover = true,
  fade = true,
  as: Group = "div",
  label,
  id,
  className,
}: MarqueeProps) {
  return (
    <div
      id={id}
      className={cn("bs-marquee", className)}
      data-reverse={reverse ? "" : undefined}
      data-hover-pause={pauseOnHover ? "" : undefined}
      data-fade={fade ? "" : undefined}
      style={{ "--marquee-duration": `${duration}s`, "--marquee-gap": gap } as CSSProperties}
    >
      <style href="bs-marquee" precedence="medium">
        {CSS}
      </style>
      <Group className="bs-marquee__group" aria-label={label}>
        {children}
      </Group>
      <Group className="bs-marquee__group" aria-hidden inert>
        {children}
      </Group>
    </div>
  );
}
