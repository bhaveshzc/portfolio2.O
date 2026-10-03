import { motion } from "motion/react";
import "./ServicesHero.css";

/* ── Framer Motion Variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const annotationReveal = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.6 },
  },
};

/**
 * ServicesHero — Editorial hero section for the Services page.
 *
 * The right-side visual area is intentionally empty.
 * To add your image later, place it inside the `.services-hero__image-slot` div:
 *
 *   <img src="/your-image.jpg" alt="..." />
 *   — or —
 *   <YourComponent />
 */
export default function ServicesHero() {
  return (
    <section className="services-hero">
      {/* Subtle grid background */}
      <div className="services-hero__grid" />

      <motion.div
        className="services-hero__container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
      >
        {/* Subtle watermark spanning from left to right behind everything */}
        <div className="services-hero__visual-watermark" aria-hidden="true">
          HIRE ME
        </div>
        {/* ================================================================
            LEFT COLUMN — Text Content
            ================================================================ */}
        <div className="services-hero__text-col">

          {/* Section indicator */}
          <motion.span className="services-hero__label" variants={fadeUp}>
            01 / BEHIND THE WORK
          </motion.span>

          {/* Main headline */}
          <motion.h1 className="services-hero__headline" variants={fadeUp}>
            <span className="services-hero__headline-line">
              i don't just make a good ui.
            </span>
            <span className="services-hero__headline-line services-hero__headline-line--accent">
              i build addictive ui.
            </span>
          </motion.h1>

          {/* Introduction copy */}
          <motion.div className="services-hero__intro" variants={fadeUp}>
            <p>
              I'm Bhavesh Bisht, a full stack developer and designer helping
              local businesses, creators, and brands turn good offers into
              digital experiences people actually want to buy from.
            </p>
            <p>
              I work where strategy, code, and design meet.
            </p>
            <p>
              That means I'm not here to throw pretty sections on a page and
              call it a conversion strategy.
            </p>
          </motion.div>

          {/* Service philosophy */}
          <motion.div className="services-hero__philosophy" variants={fadeUp}>
            <div className="services-hero__philosophy-label">
              I think about:
            </div>
            <ul className="services-hero__philosophy-items">
              <li>THE OFFER.</li>
              <li>THE CUSTOMER.</li>
              <li>THE BUYING JOURNEY.</li>
              <li>THE FRICTION.</li>
              <li>THE MONEY.</li>
            </ul>
          </motion.div>

          {/* Secondary paragraph */}
          <motion.div className="services-hero__secondary" variants={fadeUp}>
            <p>
              For local businesses, that means getting found, looking
              trustworthy, and making it easy to call, book, or buy. For
              creators and brands, it means turning attention into customers.
            </p>
            <p>
              Then I design and build around what actually needs to happen.
            </p>
            <p>
              And whether the project lives inside a funnel builder or needs
              something completely custom, the rule stays the same:
            </p>
          </motion.div>

          {/* Bold statement */}
          <motion.p className="services-hero__bold-statement" variants={fadeUp}>
            If it doesn't help the business move forward, it doesn't belong.
          </motion.p>

          {/* Credential / Service card */}
          <motion.div className="services-hero__card" variants={fadeUp}>
            {/* Row 1: Experience */}
            <div className="services-hero__card-row">
              <div className="services-hero__card-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="8" r="7" />
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                </svg>
              </div>
              <div className="services-hero__card-info">
                <span className="services-hero__card-title">
                  2 YEARS OF EXPERIENCE
                </span>
                <span className="services-hero__card-sub">
                  BUILDING &bull; SHIPPING &bull; GROWING
                </span>
              </div>
            </div>

            <div className="services-hero__card-divider" />

            {/* Row 2: Web Experiences */}
            <div className="services-hero__card-row">
              <div className="services-hero__card-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <div className="services-hero__card-info">
                <span className="services-hero__card-title">
                  WEB EXPERIENCES
                </span>
                <span className="services-hero__card-sub">
                  WEBSITES &bull; E-COMMERCE &bull; WEB APPS
                </span>
              </div>
            </div>

            <div className="services-hero__card-divider" />

            {/* Row 3: Custom Systems */}
            <div className="services-hero__card-row">
              <div className="services-hero__card-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </div>
              <div className="services-hero__card-info">
                <span className="services-hero__card-title">
                  CUSTOM SYSTEMS
                </span>
                <span className="services-hero__card-sub">
                  APIs &bull; AUTOMATIONS &bull; INTEGRATIONS
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ================================================================
            RIGHT COLUMN — Visual Area + Annotations
            ================================================================ */}
        <motion.div className="services-hero__visual-col" variants={fadeIn}>

          {/* Visual frame (empty — ready for future image) */}
          <div className="services-hero__visual-frame">

            {/* 
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              IMAGE SLOT — Insert your image/component here:
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            */}
            <div className="services-hero__image-slot">
              <img src="/profile for service sec.png" alt="Bhavesh Bisht Profile" />
            </div>
          </div>

          {/* ── Annotation Labels (desktop) ── */}
          <div className="services-hero__annotations">
            {/* Top-left: FRONTEND DEVELOPMENT */}
            <motion.div
              className="services-hero__annotation services-hero__annotation--tl"
              variants={annotationReveal}
            >
              <span className="services-hero__annotation-text">FRONTEND</span>
              <span className="services-hero__annotation-text">DEVELOPMENT</span>
              <div className="services-hero__annotation-line" />
            </motion.div>

            {/* Top-right: BACKEND SYSTEMS */}
            <motion.div
              className="services-hero__annotation services-hero__annotation--tr"
              variants={annotationReveal}
            >
              <div className="services-hero__annotation-line" />
              <span className="services-hero__annotation-text">BACKEND</span>
              <span className="services-hero__annotation-text">SYSTEMS</span>
            </motion.div>

            {/* Mid-right: APIs & INTEGRATIONS */}
            <motion.div
              className="services-hero__annotation services-hero__annotation--mr"
              variants={annotationReveal}
            >
              <div className="services-hero__annotation-line--horizontal" />
              <div className="services-hero__annotation-text-group">
                <span className="services-hero__annotation-text">APIs &</span>
                <span className="services-hero__annotation-text">INTEGRATIONS</span>
              </div>
            </motion.div>

            {/* Bottom-left: DATABASE & ARCHITECTURE */}
            <motion.div
              className="services-hero__annotation services-hero__annotation--bl"
              variants={annotationReveal}
            >
              <div className="services-hero__annotation-text-group">
                <span className="services-hero__annotation-text">DATABASE &</span>
                <span className="services-hero__annotation-text">ARCHITECTURE</span>
              </div>
              <div className="services-hero__annotation-line--horizontal" />
            </motion.div>

            {/* Bottom-right: AUTOMATION & WORKFLOWS */}
            <motion.div
              className="services-hero__annotation services-hero__annotation--br"
              variants={annotationReveal}
            >
              <div className="services-hero__annotation-line" />
              <span className="services-hero__annotation-text">AUTOMATION</span>
              <span className="services-hero__annotation-text">& WORKFLOWS</span>
            </motion.div>
          </div>

          {/* ── Mobile Annotation Tags (visible < 768px) ── */}
          <div className="services-hero__annotations-mobile">
            <span className="services-hero__annotation-mobile-tag">Frontend</span>
            <span className="services-hero__annotation-mobile-tag">Backend</span>
            <span className="services-hero__annotation-mobile-tag">APIs</span>
            <span className="services-hero__annotation-mobile-tag">Database</span>
            <span className="services-hero__annotation-mobile-tag">Automation</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
