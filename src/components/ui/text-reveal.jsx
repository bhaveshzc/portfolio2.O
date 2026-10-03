import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

/**
 * TextReveal Component
 * Scroll-driven progressive text reveal effect that highlights words as the user scrolls.
 * Preserves custom elements, flip words, and tags without altering color schemes.
 */
export function TextReveal({
  children,
  className = "",
  startOffset = 0.85,
  endOffset = 0.15,
}) {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const calculateProgress = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start revealing when container top reaches windowHeight * startOffset
      // Fully revealed when container top reaches windowHeight * endOffset
      const start = windowHeight * startOffset;
      const end = windowHeight * endOffset;

      const rawProgress = (start - rect.top) / (start - end);
      const clamped = Math.min(Math.max(rawProgress, 0), 1);
      setProgress(clamped);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(calculateProgress);
        ticking = true;
      }
    };

    calculateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [startOffset, endOffset]);

  return (
    <div ref={containerRef} className={className} data-scroll-progress={progress}>
      {typeof children === "function" ? children(progress) : children}
    </div>
  );
}

TextReveal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  className: PropTypes.string,
  startOffset: PropTypes.number,
  endOffset: PropTypes.number,
};

export default TextReveal;
