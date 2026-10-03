import { useEffect, useRef, useState } from "react";
import TextPressure from "./TextPressure";
import CurvedLoop from "./CurvedLoop";
import "./hero.css";

function Hero() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;

          if (totalScrollable <= 0) {
            setScrollProgress(0);
            ticking = false;
            return;
          }

          // Calculate scroll progress from 0.0 (top) to 1.0 (fully scrolled)
          const currentScroll = -rect.top;
          const progress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Helper interpolation function with clamping
  const clamp = (val, min, max) => Math.min(Math.max(val, min), max);
  const mapRange = (val, inMin, inMax, outMin, outMax) => {
    const t = clamp((val - inMin) / (inMax - inMin), 0, 1);
    return outMin + (outMax - outMin) * t;
  };

  /* =========================================================================
     ANIMATION PROGRESS & SPEED CONFIGURATION
     Stage 1: Avatar rises into position & Full-Stack moves up (0.00 -> 0.30)
     Stage 2: Design (Left) & Develop (Right) slide in & settle (0.30 -> 0.65)
     Stage 3: Secure (Left) & Launch (Right) slide in & settle (0.65 -> 1.00)
     ========================================================================= */

  // 1. LAYER 1: Full-Stack text upward drift
  const targetFullStackY = isMobile ? -110 : -135;
  const fullStackY = isMobile ? 0 : mapRange(scrollProgress, 0.0, 0.32, 0, targetFullStackY);

  // 2. LAYER 2: Hero Profile Image (Rises into resting position by scroll ~0.30)
  const IMAGE_START_SCROLL = 0.01;
  const IMAGE_END_SCROLL = 0.30;
  const IMAGE_START_Y = 100; // 100% translateY (below frame)
  const IMAGE_END_Y = 0;     // 0% translateY (resting position)

  const rawImageT = clamp((scrollProgress - IMAGE_START_SCROLL) / (IMAGE_END_SCROLL - IMAGE_START_SCROLL), 0, 1);
  const easedImageT = 1 - Math.pow(1 - rawImageT, 2); // Smooth ease-out deceleration
  const imageY = isMobile ? 0 : IMAGE_START_Y + (IMAGE_END_Y - IMAGE_START_Y) * easedImageT;
  const imageOpacity = isMobile ? 1 : mapRange(scrollProgress, 0.01, 0.18, 0, 1);

  // 3. MULTI-STAGE FLOATING WORDS:
  // Phase 1: Design (from Left) & Develop (from Right)
  let designX = -130;
  let designY = 0;
  let designOpacity = 0;
  let developX = 130;
  let developY = 0;
  let developOpacity = 0;

  if (scrollProgress >= 0.28 && scrollProgress <= 0.65) {
    if (scrollProgress <= 0.44) {
      // Slide in from sides
      const t = (scrollProgress - 0.28) / (0.44 - 0.28);
      const eased = 1 - Math.pow(1 - t, 3);
      designX = -130 * (1 - eased);
      designOpacity = t;
      developX = 130 * (1 - eased);
      developOpacity = t;
    } else if (scrollProgress <= 0.54) {
      // Hold in place flanking the head
      designX = 0;
      designOpacity = 1;
      developX = 0;
      developOpacity = 1;
    } else {
      // Transition out
      const t = (scrollProgress - 0.54) / (0.65 - 0.54);
      designX = 0;
      designY = -24 * t;
      designOpacity = Math.max(1 - t * 1.2, 0);
      developX = 0;
      developY = -24 * t;
      developOpacity = Math.max(1 - t * 1.2, 0);
    }
  } else if (scrollProgress < 0.28) {
    designX = -130;
    designOpacity = 0;
    developX = 130;
    developOpacity = 0;
  }

  // Phase 2: Secure (from Left) & Launch (from Right)
  let secureX = -130;
  let secureOpacity = 0;
  let launchX = 130;
  let launchOpacity = 0;

  if (scrollProgress >= 0.62) {
    if (scrollProgress <= 0.78) {
      // Slide in from sides
      const t = (scrollProgress - 0.62) / (0.78 - 0.62);
      const eased = 1 - Math.pow(1 - t, 3);
      secureX = -130 * (1 - eased);
      secureOpacity = t;
      launchX = 130 * (1 - eased);
      launchOpacity = t;
    } else {
      // Hold in place at final scroll
      secureX = 0;
      secureOpacity = 1;
      launchX = 0;
      launchOpacity = 1;
    }
  }

  return (
    <div className="hero-scroll-container" ref={containerRef} id="home">
      <div className="hero-sticky-frame">

        {/* =====================================================
            LAYER 1 (Deepest Background / z-index: 1): Full-Stack
            Moves upward to the top as user scrolls
            ===================================================== */}
        <div
          className="hero-fullstack-layer"
          style={{
            transform: `translateY(${fullStackY}px)`,
          }}
        >
          <span className="Full-Stak">Full-Stack</span>
        </div>

        {/* =====================================================
            LAYER 2 (Middle / z-index: 2): Profile Image
            Moves up from below, layered in front of Full-Stack
            and behind DEVELOPER
            ===================================================== */}
        <div
          className="hero-image-layer"
          style={{
            transform: `translateY(${imageY}%)`,
            opacity: imageOpacity,
          }}
        >
          <img
            src="/profile.png"
            alt="Bhavesh"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            width="900"
            height="1200"
          />
        </div>

        {/* =====================================================
            LAYER 2.5 (z-index: 4): Floating Text Animations
            (Design & Develop -> Secure & Launch)
            ===================================================== */}
        <div className="hero-words-layer" aria-hidden="true">
          <div className="hero-words-container">
            {/* Left Slot: Design & Secure */}
            <div className="hero-word-slot slot-left">
              {/* Design */}
              <div
                className="hero-word-card word-design"
                style={{
                  transform: `translateX(${designX}%) translateY(${designY}px)`,
                  opacity: designOpacity,
                  visibility: designOpacity > 0 ? "visible" : "hidden",
                }}
              >
                <span className="hero-word-number">01 // CRAFT</span>
                <span className="hero-word-main">
                  Design<span className="hero-word-dot">.</span>
                </span>
              </div>

              {/* Secure */}
              <div
                className="hero-word-card word-secure"
                style={{
                  transform: `translateX(${secureX}%)`,
                  opacity: secureOpacity,
                  visibility: secureOpacity > 0 ? "visible" : "hidden",
                }}
              >
                <span className="hero-word-number">03 // ARCHITECT</span>
                <span className="hero-word-main">
                  Secure<span className="hero-word-dot">.</span>
                </span>
              </div>
            </div>

            {/* Right Slot: Develop & Launch */}
            <div className="hero-word-slot slot-right">
              {/* Develop */}
              <div
                className="hero-word-card word-develop"
                style={{
                  transform: `translateX(${developX}%) translateY(${developY}px)`,
                  opacity: developOpacity,
                  visibility: developOpacity > 0 ? "visible" : "hidden",
                }}
              >
                <span className="hero-word-number">02 // BUILD</span>
                <span className="hero-word-main">
                  Develop<span className="hero-word-dot">.</span>
                </span>
              </div>

              {/* Launch */}
              <div
                className="hero-word-card word-launch"
                style={{
                  transform: `translateX(${launchX}%)`,
                  opacity: launchOpacity,
                  visibility: launchOpacity > 0 ? "visible" : "hidden",
                }}
              >
                <span className="hero-word-number">04 // SHIP</span>
                <span className="hero-word-main">
                  Launch<span className="hero-word-dot">.</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            LAYER 3 (Foreground / z-index: 3): DEVELOPER
            Desktop: Interactive variable TextPressure
            Mobile: React Bits Curved Loop animation
            ===================================================== */}
        <div className="hero-developer-layer">
          <div className="developer-pressure-wrapper">
            {isMobile ? (
              <div className="hero-developer-mobile-curved">
                <CurvedLoop
                  marqueeText="DEVELOPER ✦ DEVELOPER ✦ DEVELOPER ✦ DEVELOPER ✦ "
                  speed={1}
                  curveAmount={800}
                  curveDirection="down"
                  direction="right"
                  fontSize={50}
                  fontWeight={800}
                  interactive={true}
                  textColor="#000000"
                />
              </div>
            ) : (
              <TextPressure
                text="DEVELOPER"
                flex={true}
                alpha={false}
                stroke={false}
                width={true}
                weight={true}
                italic={true}
                textColor="#000000"
                minFontSize={20}
              />
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Hero;