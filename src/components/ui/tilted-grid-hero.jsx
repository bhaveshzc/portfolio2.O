"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SLICES = 16;
const CAMERA = 1.6;

function arc(bend) {
  return (CAMERA - 1 + Math.cos(bend)) / (2 * CAMERA * Math.sin(bend));
}

const MAX_WIDTH = 55;

function measure(width, height, tile, aspect, gap, bend) {
  const h = Math.min((tile / 100) * height, ((MAX_WIDTH / 100) * width) / aspect);
  const radius = width * arc(bend);
  if (!(h > 0) || !(radius > 0)) return { unit: 0, pitch: 0 };
  const deg = (rad) => (rad * 180) / Math.PI;
  const unit = deg(h / radius);
  const pitch = (aspect + gap / 100) * unit;
  return {
    unit: +unit.toFixed(4),
    pitch: +pitch.toFixed(4),
  };
}

export function TiltedGridHero({
  images,
  tileHeight = 40, // Increased size of the cards
  aspectRatio = 16 / 9,
  gap = 8,
  axis = 40, // Moved up to leave more space at the bottom for text
  curve = 75, // Slightly less aggressive curve
  className,
  children,
  ...props
}) {
  const ref = React.useRef(null);
  const bend = (Math.min(85, Math.max(5, curve)) * Math.PI) / 180;

  const [layout, setLayout] = React.useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const next = measure(width, height, tileHeight, aspectRatio, gap, bend);
      setLayout((prev) => (prev?.unit === next.unit ? prev : next));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [tileHeight, aspectRatio, gap, bend]);

  React.useEffect(() => {
    for (const { src } of images) {
      if (src) new Image().src = src;
    }
  }, [images]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const { unit, pitch } = layout ?? measure(1200, 700, tileHeight, aspectRatio, gap, bend);

  const u = (n) => `calc(${+n.toFixed(4)} * min(${tileHeight}cqh, ${+(MAX_WIDTH / aspectRatio).toFixed(4)}cqw))`;

  const r = 100 * arc(bend);
  const radius = `${+r.toFixed(3)}cqw`;
  const turn = (deg) => `translateZ(${radius}) rotateY(${+deg.toFixed(4)}deg) translateZ(-${radius})`;

  const share = aspectRatio / SLICES;

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden flex flex-col items-center justify-between", className)}
      {...props}
      style={{ containerType: "size", ...props.style, minHeight: "650px" }}
    >
      <div className="absolute top-0 w-full pointer-events-none z-30">
        {children}
      </div>

      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: layout ? 1 : 0,
          perspective: `${+(r * CAMERA).toFixed(3)}cqw`,
          perspectiveOrigin: `50% ${axis}%`,
        }}
      >
        {images.map((img, t) => {
          // Circular logic for the 3D angle
          const diff = t - activeIndex;
          let offset = diff;

          if (diff > images.length / 2) offset -= images.length;
          if (diff < -images.length / 2) offset += images.length;

          const angle = offset * pitch;
          const isActive = offset === 0;

          return (
            <div
              key={t}
              className="absolute"
              style={{
                left: `calc(50% - ${u(aspectRatio / 2)})`,
                top: `calc(${axis}% - ${u(0.5)})`,
                width: u(aspectRatio),
                height: u(1),
                transformStyle: "preserve-3d",
                transform: turn(angle),
                transition: "transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
                opacity: Math.abs(offset) > 1 ? 0 : 1, // Hide the ones in the back
                zIndex: isActive ? 20 : 10,
              }}
            >
              {Array.from({ length: SLICES }, (_, k) => (
                <div
                  key={k}
                  className={cn(
                    "absolute top-0 overflow-hidden bg-muted",
                    k === 0 && "rounded-l-lg",
                    k === SLICES - 1 && "rounded-r-lg"
                  )}
                  style={{
                    left: u((aspectRatio - share) / 2),
                    width: k === SLICES - 1 ? u(share) : `calc(${u(share)} + 1px)`,
                    height: u(1),
                    transform: turn((aspectRatio / 2 - (k + 0.5) * share) * unit),
                  }}
                >
                  <img
                    src={img.src}
                    alt={k === 0 ? (img.alt ?? "") : ""}
                    draggable={false}
                    className="absolute top-0 max-w-none object-cover transition-all duration-700"
                    style={{
                      left: u(-k * share),
                      width: u(aspectRatio),
                      height: u(1),
                      filter: isActive ? "brightness(1)" : "brightness(0.3)",
                    }}
                  />
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Navigation and Details Container positioned below the 3D cards */}
      <div className="absolute bottom-8 w-full flex flex-col items-center justify-center px-4 z-40">

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center"
          >
            <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-6">
              {images[activeIndex]?.alt}
            </h3>
            {images[activeIndex]?.link && (
              <a
                href={images[activeIndex].link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-black bg-white hover:bg-gray-200 px-6 py-3 rounded-full transition-colors font-medium shadow-xl"
              >
                View Live Project <ExternalLink size={18} />
              </a>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="flex gap-6 mt-8">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-colors backdrop-blur-md"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="p-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-colors backdrop-blur-md"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TiltedGridHero;
