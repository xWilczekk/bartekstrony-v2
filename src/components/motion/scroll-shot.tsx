import Image from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

const CSS = `
.bs-shot{position:relative;overflow:hidden;aspect-ratio:var(--ar);--shot-y:var(--y);view-timeline:--bs-shot block}
@media (min-width:768px){.bs-shot[data-md]{aspect-ratio:var(--ar-md);--shot-y:var(--y-md)}}
.bs-shot__img{position:absolute;top:0;left:0;width:100%;height:auto;transform:translate3d(0,0,0)}
@keyframes bs-shot-scroll{from{transform:translate3d(0,0,0)}to{transform:translate3d(0,var(--shot-y),0)}}
@media (prefers-reduced-motion:no-preference) and (hover:hover) and (pointer:fine){
.bs-shot:is([data-trigger=auto],[data-trigger=hover]) .bs-shot__img{transition:transform 1.1s cubic-bezier(.16,1,.3,1)}
.bs-shot:is([data-trigger=auto],[data-trigger=hover]):hover .bs-shot__img,
[data-shot-hover]:is(:hover,:focus-visible) .bs-shot:is([data-trigger=auto],[data-trigger=hover]) .bs-shot__img{transform:translate3d(0,var(--shot-y),0);transition:transform var(--shot-dur) cubic-bezier(.45,.05,.55,.95)}
}
@supports (animation-timeline:view()){
@media (prefers-reduced-motion:no-preference){
.bs-shot[data-trigger=scroll] .bs-shot__img{animation:bs-shot-scroll linear both;animation-timeline:--bs-shot;animation-range:contain 0% contain 100%}
}
@media (prefers-reduced-motion:no-preference) and (hover:none),(prefers-reduced-motion:no-preference) and (pointer:coarse){
.bs-shot[data-trigger=auto] .bs-shot__img{animation:bs-shot-scroll linear both;animation-timeline:--bs-shot;animation-range:contain 0% contain 100%}
}
}`;

function travel(width: number, height: number, aspect: number) {
  const visible = width / (height * aspect);
  return visible >= 0.995 ? 0 : -(1 - visible) * 100;
}

export type ScrollShotProps = {
  src: string;
  width: number;
  height: number;
  alt: string;
  sizes: string;
  aspect?: number;
  mdAspect?: number;
  trigger?: "auto" | "hover" | "scroll" | "none";
  loading?: "lazy" | "eager";
  className?: string;
};

export function ScrollShot({
  src,
  width,
  height,
  alt,
  sizes,
  aspect = 4 / 5,
  mdAspect,
  trigger = "auto",
  loading,
  className,
}: ScrollShotProps) {
  const y = travel(width, height, aspect);
  const yMd = mdAspect ? travel(width, height, mdAspect) : y;
  const scrolls = y < 0 && yMd < 0;
  const duration = Math.min(9, Math.max(2.6, (-Math.min(y, yMd) / 100) * 8));

  const style = {
    "--ar": aspect,
    "--ar-md": mdAspect ?? aspect,
    "--y": `${y.toFixed(2)}%`,
    "--y-md": `${yMd.toFixed(2)}%`,
    "--shot-dur": `${duration.toFixed(2)}s`,
  } as CSSProperties;

  return (
    <div
      className={cn("bs-shot", className)}
      data-trigger={scrolls ? trigger : "none"}
      data-md={mdAspect ? "" : undefined}
      style={style}
    >
      <style href="bs-scroll-shot" precedence="medium">
        {CSS}
      </style>
      {scrolls ? (
        <Image src={src} width={width} height={height} alt={alt} sizes={sizes} loading={loading} className="bs-shot__img" />
      ) : (
        <Image src={src} fill alt={alt} sizes={sizes} loading={loading} className="object-cover object-top" />
      )}
    </div>
  );
}
