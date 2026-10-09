import { motion } from "motion/react";
import { Link } from "react-router-dom";
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
          H I R E ME
        </div>
        {/* ================================================================
            LEFT COLUMN — Text Content
            ================================================================ */}
        <div className="services-hero__text-col">

          {/* Section indicator */}
          <motion.div className="services-hero__label" variants={fadeUp}>
            <span className="label-num">01 / </span>
            <span className="label-text">BEHIND THE WORK</span>
          </motion.div>

          {/* Main headline */}
          <motion.h1 className="services-hero__headline" variants={fadeUp}>
            <span className="services-hero__headline-line">
              I don't just make a Good UI.
            </span>
            <span className="services-hero__headline-line services-hero__headline-line--accent">
              I build Adictive UI.
            </span>
          </motion.h1>

          {/* Introduction copy */}
          <motion.div className="services-hero__intro" variants={fadeUp}>
            <p>
              I'm <Link to="/about" className="services-hero__highlight-link">Bhavesh Bisht</Link>, a full stack developer and designer helping
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
              <li>The Offer.</li>
              <li>The Customer.</li>
              <li>The Buying Journey.</li>
              <li>The Friction.</li>
              <li>The Money.</li>
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
              <div className="services-hero__annotation-line-group">
                <div className="services-hero__annotation-line-v" />
                <div className="services-hero__annotation-line-d services-hero__annotation-line-d--right" />
              </div>
            </motion.div>

            {/* Top-right: BACKEND SYSTEMS */}
            <motion.div
              className="services-hero__annotation services-hero__annotation--tr"
              variants={annotationReveal}
            >
              <span className="services-hero__annotation-text">BACKEND</span>
              <span className="services-hero__annotation-text">SYSTEMS</span>
              <div className="services-hero__annotation-line-group">
                <div className="services-hero__annotation-line-v" />
                <div className="services-hero__annotation-line-d services-hero__annotation-line-d--left" />
              </div>
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

            {/* Mid-Right-2: DATABASE & ARCHITECTURE (Neck) */}
            <motion.div
              className="services-hero__annotation services-hero__annotation--bl"
              variants={annotationReveal}
            >
              <div className="services-hero__annotation-line--horizontal" />
              <div className="services-hero__annotation-text-group">
                <span className="services-hero__annotation-text">DATABASE &</span>
                <span className="services-hero__annotation-text">ARCHITECTURE</span>
              </div>
            </motion.div>

            {/* Bottom-left-2: AUTOMATION & WORKFLOWS */}
            <motion.div
              className="services-hero__annotation services-hero__annotation--br"
              variants={annotationReveal}
            >
              <div className="services-hero__annotation-text-group">
                <span className="services-hero__annotation-text">AUTOMATION</span>
                <span className="services-hero__annotation-text">& WORKFLOWS</span>
              </div>
              <div className="services-hero__annotation-line--horizontal" />
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
