"use client";

import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

const DIGIT_HEIGHT_EM = 1.1;
// 2 full sets of 0..9 so rolling can do a complete slot-machine shuffle/spin before locking onto the digit
const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export function NumberTicker({
  value,
  pad,
  duration = 1.0,
  stagger = 0.08,
  startOnView = true,
  prefix,
  suffix,
  blur = true,
  className,
  digitClassName,
  locale = false,
  format,
}) {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, amount: 0.5 });
  const armed = !startOnView || inView;

  const text = useMemo(() => {
    const rounded = Math.round(value);
    const formatted = format
      ? format(rounded)
      : locale
        ? rounded.toLocaleString()
        : rounded.toString();
    return pad ? formatted.padStart(pad, "0") : formatted;
  }, [value, pad, format, locale]);

  const glyphs = useMemo(() => {
    const chars = text.split("");
    return chars.map((char, i) => ({ char, id: `g-${chars.length - 1 - i}` }));
  }, [text]);

  const readableText = `${prefix ?? ""}${text}${suffix ?? ""}`;

  // Stagger is applied on initial entrance shuffle/spin. Once entered, subsequent updates roll directly.
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    if (!armed || entered) return;
    const total = (duration + glyphs.length * stagger) * 1000;
    const t = window.setTimeout(() => setEntered(true), total);
    return () => window.clearTimeout(t);
  }, [armed, entered, duration, stagger, glyphs.length]);

  return (
    <span
      ref={containerRef}
      className={cn("inline-flex items-center tabular-nums", className)}
      style={{ lineHeight: 1 }}
    >
      <span className="sr-only">{readableText}</span>
      <span aria-hidden="true" className="inline-flex items-center" style={{ lineHeight: 1 }}>
        {prefix ? <span className="inline-flex items-center">{prefix}</span> : null}
        {glyphs.map(({ char, id }, i) => {
          const isDigit = /\d/.test(char);
          if (!isDigit) {
            return (
              <span key={id} className="inline-flex items-center">
                {char}
              </span>
            );
          }
          const digit = Number(char);
          return (
            <Digit
              key={id}
              digit={armed ? digit : 0}
              delay={entered ? 0 : i * stagger}
              duration={duration}
              blur={blur}
              className={digitClassName}
              armed={armed}
            />
          );
        })}
        {suffix ? <span className="inline-flex items-center">{suffix}</span> : null}
      </span>
    </span>
  );
}

function Digit({
  digit,
  delay,
  duration,
  blur,
  className,
  armed,
}) {
  const reduce = useReducedMotion();
  const columnRef = useRef(null);

  // Target index: armed uses the 2nd cycle (10 + digit) to create full slot-machine roll through 0..9
  const targetIndex = armed ? 10 + digit : 0;

  useEffect(() => {
    if (reduce || !blur || !columnRef.current || !Number.isFinite(digit) || !armed) {
      return;
    }

    const node = columnRef.current;
    const controls = animate(
      node,
      { filter: ["blur(4px)", "blur(0px)"] },
      {
        duration: Math.min(duration * 0.75, 0.45),
        delay,
        ease: EASE_OUT,
      }
    );

    return () => {
      controls.stop();
      if (node) node.style.filter = "blur(0px)";
    };
  }, [blur, delay, digit, duration, reduce, armed]);

  return (
    <span
      className={cn("relative inline-flex items-center justify-center overflow-hidden", className)}
      style={{
        height: `${DIGIT_HEIGHT_EM}em`,
        width: "0.62em",
        minWidth: "0.62em",
        lineHeight: 1,
      }}
    >
      <motion.span
        ref={columnRef}
        initial={{ y: 0 }}
        animate={{ y: `-${targetIndex * DIGIT_HEIGHT_EM}em` }}
        transition={
          reduce
            ? { duration: 0 }
            : { duration, delay, ease: EASE_OUT }
        }
        className="absolute inset-x-0 top-0 flex flex-col items-center will-change-[transform,filter]"
      >
        {DIGITS.map((n, idx) => (
          <span
            key={idx}
            className="flex items-center justify-center leading-none select-none text-center"
            style={{ height: `${DIGIT_HEIGHT_EM}em`, lineHeight: `${DIGIT_HEIGHT_EM}em` }}
          >
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export default NumberTicker;
