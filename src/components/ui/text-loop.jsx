import { useState, useEffect, Children, isValidElement } from "react";
import "./text-loop.css";

/**
 * TextLoop Component
 * Smoothly loops through an array of words/elements with a vertical slide and blur transition.
 */
export function TextLoop({
  children,
  words = ["DEVELOPER", "ENGINEER", "CREATOR", "DESIGNER"],
  interval = 2400,
  className = "",
}) {
  const items = children ? Children.toArray(children) : words;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prevIndex, setPrevIndex] = useState(null);

  useEffect(() => {
    if (items.length <= 1) return;

    let finishTimer;
    const intervalTimer = setInterval(() => {
      setCurrentIndex((prev) => {
        setPrevIndex(prev);
        setIsTransitioning(true);
        return (prev + 1) % items.length;
      });

      finishTimer = setTimeout(() => {
        setIsTransitioning(false);
        setPrevIndex(null);
      }, 550);
    }, interval);

    return () => {
      clearInterval(intervalTimer);
      if (finishTimer) clearTimeout(finishTimer);
    };
  }, [items.length, interval]);

  const currentItem = items[currentIndex];
  const prevItem = prevIndex !== null ? items[prevIndex] : null;

  return (
    <div className={`text-loop-container ${className}`} aria-live="polite">
      <div className="text-loop-track">
        {isTransitioning && prevItem && (
          <span className="text-loop-item text-loop-exit" aria-hidden="true">
            {isValidElement(prevItem) ? prevItem : prevItem}
          </span>
        )}
        <span className={`text-loop-item ${isTransitioning ? "text-loop-enter" : "text-loop-active"}`}>
          {isValidElement(currentItem) ? currentItem : currentItem}
        </span>
      </div>
    </div>
  );
}

export default TextLoop;
