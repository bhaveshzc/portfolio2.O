"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export interface CoverflowSlide {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  meta?: { label: string; value: string }[];
  link?: string;
  github?: string;
  category?: string;
}

export interface CoverflowCarouselProps {
  slides: CoverflowSlide[];
  /** Degrees the first neighbour tilts. */
  rotate?: number;
  /** How far the first neighbour recedes, as a fraction of card width. */
  depth?: number;
  /** Viewer distance as a multiple of card width — smaller is a wider lens. */
  perspective?: number;
  /** Exponent on distance. Below 1 the rake eases off as cards travel out. */
  falloff?: number;
  /** Opacity lost per step from the centre. */
  fade?: number;
  /** Any CSS length. Everything else is derived from it, so the rake scales. */
  cardWidth?: string;
  /** Aspect ratio of the card container (e.g., '16/10', '16/8', '1/1'). */
  cardAspect?: string;
  /** Space between cards, as a fraction of card width. */
  gap?: number;
  loop?: boolean;
  showCaption?: boolean;
  showPagination?: boolean;
  showNavigation?: boolean;
  /** Names the carousel for assistive tech. */
  label?: string;
  className?: string;
  cardClassName?: string;
  initialIndex?: number;
  onSelect?: (index: number) => void;
  onCardClick?: (slide: CoverflowSlide, index: number) => void;
}

// Cubic ease-out function for buttery smooth 60/120fps motion
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function CoverflowCarousel({
  slides,
  rotate = 38,
  depth = 0.52,
  perspective = 3,
  falloff = 0.55,
  fade = 0.12,
  cardWidth = "clamp(280px, 36vw, 480px)",
  cardAspect = "16 / 8",
  gap = 0.08,
  loop = true,
  showCaption = false,
  showPagination = false,
  showNavigation = true,
  label = "Cover carousel",
  className,
  cardClassName,
  initialIndex = 0,
  onSelect,
  onCardClick,
}: CoverflowCarouselProps) {
  const count = slides.length;

  const frameRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  /** Fractional card index at the centre. The single source of truth. */
  const posRef = React.useRef(initialIndex);
  /** Where the current settle is headed. */
  const targetRef = React.useRef(initialIndex);
  const widthRef = React.useRef(0);
  const rafRef = React.useRef<number | null>(null);
  const dragRef = React.useRef<{
    id: number;
    startX: number;
    startY: number;
    x: number;
    pos: number;
    v: number;
    t: number;
    moved: boolean;
  } | null>(null);

  const [selected, setSelected] = React.useState(initialIndex);

  /** Nearest whole card, folded back into 0..count-1. */
  const indexAt = React.useCallback(
    (pos: number) => ((Math.round(pos) % count) + count) % count,
    [count],
  );

  // Paint straight to the DOM with GPU acceleration
  const paint = React.useCallback(() => {
    const width = widthRef.current;
    if (!width) return;
    const pitch = width * (1 + gap);
    const pos = posRef.current;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      let offset = index - pos;
      if (loop) {
        offset = ((offset % count) + count) % count;
        if (offset > count / 2) offset -= count;
      }

      const distance = Math.abs(offset);
      const ramp = Math.pow(distance, falloff);
      const tilt = Math.min(rotate * ramp, 80) * Math.sign(offset);

      // Hardware accelerated transform
      card.style.transform = `translate3d(calc(-50% + ${offset * pitch}px), 0px, ${-depth * width * ramp}px) rotateY(${-tilt}deg)`;

      const edge = loop ? Math.min(1, Math.max(0, count / 2 - distance)) : 1;
      card.style.opacity = String(Math.max(0, 1 - fade * distance) * edge);
      card.style.zIndex = String(100 - Math.round(distance));
    });
  }, [count, depth, fade, falloff, gap, loop, rotate]);

  // Timestamp-based deterministic animation loop (fluid 60/120fps)
  const settle = React.useCallback(
    (target: number, duration = 420) => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      targetRef.current = target;
      const nextIdx = indexAt(target);
      setSelected(nextIdx);
      onSelect?.(nextIdx);

      const startPos = posRef.current;
      const distance = target - startPos;
      if (Math.abs(distance) < 0.0005) {
        posRef.current = target;
        paint();
        return;
      }

      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const ease = easeOutCubic(progress);

        posRef.current = startPos + distance * ease;
        paint();

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          posRef.current = target;
          paint();
          rafRef.current = null;
        }
      };

      rafRef.current = requestAnimationFrame(step);
    },
    [indexAt, onSelect, paint],
  );

  const clamp = React.useCallback(
    (pos: number) => (loop ? pos : Math.max(0, Math.min(count - 1, pos))),
    [count, loop],
  );

  const goTo = React.useCallback(
    (index: number) => {
      const target = loop
        ? index + Math.round((targetRef.current - index) / count) * count
        : index;
      settle(clamp(target), 450);
    },
    [clamp, count, loop, settle],
  );

  const nudge = React.useCallback(
    (by: number) => settle(clamp(Math.round(targetRef.current) + by), 380),
    [clamp, settle],
  );

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    targetRef.current = posRef.current;
    dragRef.current = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      x: event.clientX,
      pos: posRef.current,
      v: 0,
      t: performance.now(),
      moved: false,
    };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;

    const pitch = widthRef.current * (1 + gap);
    if (!pitch) return;

    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (Math.hypot(dx, dy) > 5) {
      drag.moved = true;
    }

    const now = performance.now();
    const previous = posRef.current;
    posRef.current = clamp(drag.pos - (event.clientX - drag.x) / pitch);
    drag.v = ((posRef.current - previous) / Math.max(now - drag.t, 1)) * 1000;
    drag.t = now;

    paint();
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    const hadMoved = drag.moved;
    const velocity = drag.v;
    dragRef.current = null;

    if (hadMoved) {
      // Throw inertia capped to 1-2 slides
      const carried = Math.max(-1.5, Math.min(1.5, velocity * 0.16));
      const target = clamp(Math.round(posRef.current + carried));
      const duration = Math.min(500, Math.max(300, Math.abs(target - posRef.current) * 350));
      settle(target, duration);
    } else {
      settle(clamp(Math.round(posRef.current)), 300);
    }
  };

  const handleCardClick = (index: number) => {
    if (index === selected) {
      if (onCardClick) {
        onCardClick(slides[index], index);
      } else if (slides[index].link) {
        window.open(slides[index].link, "_blank");
      }
    } else {
      goTo(index);
    }
  };

  // Measure card width whenever size changes
  useIsoLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const measure = () => {
      const card = cardRefs.current[0];
      if (!card) return;
      widthRef.current = card.offsetWidth;
      paint();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [paint]);

  React.useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  const active = slides[selected];

  return (
    <div
      className={cn("w-full select-none", className)}
      style={{
        ["--cf-card" as string]: cardWidth,
        ["--cf-aspect" as string]: cardAspect,
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div className="relative">
        <div
          ref={frameRef}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              nudge(-1);
            } else if (event.key === "ArrowRight") {
              event.preventDefault();
              nudge(1);
            }
          }}
          className="cursor-grab overflow-hidden py-8 md:py-12 outline-none ring-0 active:cursor-grabbing"
          style={{
            perspective: `calc(var(--cf-card) * ${perspective})`,
            touchAction: "pan-y",
          }}
        >
          <div
            className="relative select-none"
            style={{
              width: "100%",
              height: "calc(var(--cf-card) / (var(--cf-aspect, 16 / 8)))",
              transformStyle: "preserve-3d",
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${count}`}
                onClick={() => handleCardClick(index)}
                className={cn(
                  "absolute left-1/2 top-0 overflow-hidden rounded-2xl bg-[#141416] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] will-change-transform cursor-pointer hover:border-white/30",
                  cardClassName,
                )}
                style={{
                  width: "var(--cf-card)",
                  aspectRatio: "var(--cf-aspect)",
                  backfaceVisibility: "hidden",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.src}
                  alt={slide.alt}
                  draggable={false}
                  className="h-full w-full select-none object-cover object-top pointer-events-none"
                />
              </div>
            ))}
          </div>
        </div>

        {showNavigation && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => nudge(-1)}
              className="absolute left-2 md:left-6 top-1/2 z-[200] -translate-y-1/2 rounded-full bg-neutral-900/80 p-3 text-white border border-neutral-700/60 backdrop-blur-md transition-all hover:bg-neutral-800 hover:scale-110 active:scale-95 shadow-xl cursor-pointer"
            >
              <ChevronLeft className="size-5 md:size-6" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => nudge(1)}
              className="absolute right-2 md:right-6 top-1/2 z-[200] -translate-y-1/2 rounded-full bg-neutral-900/80 p-3 text-white border border-neutral-700/60 backdrop-blur-md transition-all hover:bg-neutral-800 hover:scale-110 active:scale-95 shadow-xl cursor-pointer"
            >
              <ChevronRight className="size-5 md:size-6" />
            </button>
          </>
        )}
      </div>

      {showCaption && active?.title && (
        <div
          key={selected}
          className="mt-3 flex flex-col items-center px-6 duration-300 animate-in fade-in"
        >
          <p className="text-xl font-bold tracking-tight text-white">
            {active.title}
          </p>
          {active.subtitle && (
            <p className="mt-1 text-sm text-neutral-400">
              {active.subtitle}
            </p>
          )}
        </div>
      )}

      {showPagination && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === selected}
              onClick={() => goTo(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300 cursor-pointer",
                index === selected
                  ? "w-7 bg-[#e00101]"
                  : "w-2 bg-neutral-600 hover:bg-neutral-400",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
