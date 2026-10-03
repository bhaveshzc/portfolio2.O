import { useEffect, useRef, useId } from "react";
import "./CurvedLoop.css";

/**
 * CurvedLoop Component (React Bits)
 * Renders an infinite, smoothly animated curved marquee loop along an SVG path.
 * 
 * Props:
 * - marqueeText: The text string to loop continuously
 * - speed: Animation speed (e.g. 1, 1.5, 2)
 * - curveAmount: Curvature intensity / bend depth (e.g. 100 to 450+)
 * - curveDirection: "down" (curves downward ⌣) or "up" (curves upward ⌢)
 * - direction: "left" or "right" marquee scroll direction
 * - fontSize: Font size (e.g. 34, 48, 60, "60px")
 * - fontWeight: Font weight (e.g. 600, 800, 900)
 * - letterSpacing: Letter spacing (e.g. 4, "5px")
 * - textColor: Font fill color
 * - interactive: Drag / touch momentum interaction
 */
export function CurvedLoop({
  marqueeText = "DEVELOPER ✦ DEVELOPER ✦ DEVELOPER ✦ DEVELOPER ✦ ",
  speed = 1,
  curveAmount = 250,
  curveDirection = "down", // "down" = downward arch ⌣, "up" = upward arch ⌢
  direction = "right",
  fontSize = 38,
  fontWeight = 800,
  letterSpacing = 4,
  interactive = true,
  textColor = "#EFE6DD",
  className = "",
}) {
  const pathId = useId();
  const textPathRef = useRef(null);
  const pathRef = useRef(null);
  const containerRef = useRef(null);

  const offsetRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastXRef = useRef(0);
  const velocityRef = useRef(0);
  const animFrameRef = useRef(null);
  const singleTextWidthRef = useRef(0);

  // Repeat text to make an infinite seamless curve
  const repeatedText = `${marqueeText} `.repeat(14);

  useEffect(() => {
    // Measure single segment length
    if (textPathRef.current) {
      try {
        const totalLength = textPathRef.current.getComputedTextLength();
        if (totalLength > 0) {
          singleTextWidthRef.current = totalLength / 14;
        }
      } catch {
        singleTextWidthRef.current = 600;
      }
    }

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    let lastTime = performance.now();
    let isIntersecting = true;
    let observer = null;

    const loop = (time) => {
      if (!isIntersecting) {
        animFrameRef.current = null;
        return;
      }

      const delta = (time - lastTime) / 16.666;
      lastTime = time;

      if (!isDraggingRef.current && !prefersReducedMotion) {
        // Apply friction to drag velocity
        if (Math.abs(velocityRef.current) > 0.05) {
          offsetRef.current += velocityRef.current * delta;
          velocityRef.current *= Math.pow(0.92, delta);
        }

        const moveSpeed = speed * (direction === "left" ? -1 : 1);
        offsetRef.current += moveSpeed * delta;
      }

      // Loop wrap-around
      const segment = singleTextWidthRef.current || 600;
      if (offsetRef.current <= -segment) {
        offsetRef.current += segment;
      } else if (offsetRef.current >= 0) {
        offsetRef.current -= segment;
      }

      if (textPathRef.current) {
        textPathRef.current.setAttribute("startOffset", `${offsetRef.current}px`);
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    if (typeof IntersectionObserver !== "undefined" && containerRef.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          const wasIntersecting = isIntersecting;
          isIntersecting = entry.isIntersecting;
          if (isIntersecting && !wasIntersecting && !animFrameRef.current) {
            lastTime = performance.now();
            animFrameRef.current = requestAnimationFrame(loop);
          }
        },
        { threshold: 0.05 }
      );
      observer.observe(containerRef.current);
    }

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (observer) observer.disconnect();
    };
  }, [speed, direction]);

  // Pointer Drag Handlers (Unified Pointer Events)
  const handlePointerDown = (e) => {
    if (!interactive) return;
    isDraggingRef.current = true;
    lastXRef.current = e.clientX;
    velocityRef.current = 0;
    try {
      e.currentTarget.setPointerCapture?.(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handlePointerMove = (e) => {
    if (!interactive || !isDraggingRef.current) return;
    const currentX = e.clientX;
    const dx = currentX - lastXRef.current;
    lastXRef.current = currentX;

    offsetRef.current += dx * 1.6;
    velocityRef.current = dx * 1.3;
  };

  const handlePointerUp = (e) => {
    if (!interactive) return;
    isDraggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture?.(e.pointerId);
    } catch {
      // ignore
    }
  };

  // SVG viewBox and curve coordinates (unclamped for unlimited deep bend)
  const isDown = curveDirection === "down";
  const baseY = isDown ? 40 : 40 + curveAmount;
  const controlY = isDown ? 40 + curveAmount : 40;
  const pathD = `M -600,${baseY} Q 300,${controlY} 1200,${baseY}`;
  const viewBoxHeight = Math.max(260, 80 + curveAmount);

  const formattedFontSize = typeof fontSize === "number" ? `${fontSize}px` : fontSize;
  const formattedLetterSpacing = typeof letterSpacing === "number" ? `${letterSpacing}px` : letterSpacing;

  return (
    <div
      ref={containerRef}
      className={`curved-loop-container ${interactive ? "is-interactive" : ""} ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      role="region"
      aria-label="Curved Text Loop"
    >
      <svg
        viewBox={`0 0 600 ${viewBoxHeight}`}
        preserveAspectRatio="xMidYMid meet"
        className="curved-loop-svg"
      >
        <defs>
          <path
            ref={pathRef}
            id={pathId}
            d={pathD}
            fill="none"
            stroke="transparent"
          />
        </defs>
        <text
          fill={textColor}
          className="curved-loop-text"
          style={{
            fontSize: formattedFontSize,
            fontWeight: fontWeight,
            letterSpacing: formattedLetterSpacing,
          }}
        >
          <textPath
            ref={textPathRef}
            href={`#${pathId}`}
            startOffset="0px"
          >
            {repeatedText}
          </textPath>
        </text>
      </svg>
    </div>
  );
}

export default CurvedLoop;
