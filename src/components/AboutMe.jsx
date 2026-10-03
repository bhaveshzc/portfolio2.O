import { useState } from "react";
import { motion } from "motion/react";
import SkillsTechnologies from "./SkillsTechnologies";
import "./AboutMe.css";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

export default function AboutMe() {
  const [principlesExpanded, setPrinciplesExpanded] = useState(false);
  return (
    <section className="about-luxury-section" id="about">
      <motion.div 
        className="about-luxury-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        variants={staggerContainer}
      >

        {/* Section Header */}
        <motion.div 
          className="section-header-center"
          variants={fadeUpVariants}
        >
          <h3 className="section-main-heading">About Me</h3>
        </motion.div>

        {/* ── Row 1: Story Card (Full Width) ── */}
        <motion.div 
          className="luxury-glass-card about-story-card"
          variants={fadeUpVariants}
        >
          {/* Left: Text */}
          <div className="about-story-text-col">
            <div className="about-card-icon-tag">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              <span>MY STORY</span>
            </div>

            <h4 className="about-card-title">
              It started with a simple<br />
              <span className="about-title-accent">curiosity.</span>
            </h4>

            <p className="about-card-body">
              I would look at a website and wonder how one click could change the entire screen in a second. It felt like magic to me, and I wanted to know what was actually happening behind it. That question stayed with me longer than I expected.
            </p>
            <p className="about-card-body">
              That interest eventually turned into direction. I completed my <strong>Bachelor of Computer Applications</strong> to build a proper base in programming, and from there I kept learning — one language at a time — until I could take an idea and turn it into a working website on my own.
            </p>
            <p className="about-card-body">
              I'm <strong>Bhavesh Bisht</strong>, a full stack developer who builds, designs, and updates websites. I help turn whatever you're working with right now into something better.
            </p>


          </div>

          {/* Right: Profile Image */}
          <div className="about-story-image-col">
            <div className="about-profile-frame">
              <img
                src="/profile.png"
                alt="Bhavesh Bisht – Full Stack Developer"
                className="about-profile-img"
                loading="lazy"
                decoding="async"
              />
              <div className="about-profile-glow" />

            </div>
          </div>
        </motion.div>

        {/* ── Row 2: Two cards ── */}
        <motion.div 
          className={`about-grid ${principlesExpanded ? 'is-expanded' : ''}`}
          variants={fadeUpVariants}
        >

          {/* Card: What I Build For */}
          <div className="luxury-glass-card about-card about-card--philosophy">
            <div className="about-card-icon-tag">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
              </svg>
              <span>WHAT I BUILD FOR</span>
            </div>
            <h4 className="about-card-title">Good websites feel different.</h4>
            <p className="about-card-body">
              For me, a good website isn't just about looking clean. It should feel smooth to use, load fast, stay secure, and give people a reason to stay instead of leaving in a few seconds.
            </p>
            <p className="about-card-body">
              That's the gap between a good UI and an <em>addictive UI</em> — one people actually want to come back to.
            </p>
          </div>

          {/* Card: Core Principles */}
          <div className="luxury-glass-card about-card about-card--principles">
            <div className="about-card-icon-tag">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
              <span>CORE PRINCIPLES</span>
            </div>
            <h4 className="about-card-title">What drives my work.</h4>
            <ul className="about-principles-list">
              <li>
                <span className="principle-bullet">✦</span>
                <div>
                  <strong>Architecture First</strong><br />
                  Clean, modular codebases designed for maintainability and scale — not just the deadline.
                </div>
              </li>
              <li>
                <span className="principle-bullet">✦</span>
                <div>
                  <strong>Security &amp; Performance</strong><br />
                  Fast load times, secure authentication, and optimized queries from day one.
                </div>
              </li>
            </ul>

            {/* Collapsible extra items */}
            <div className={`principles-extra-wrapper ${principlesExpanded ? 'is-expanded' : ''}`}>
              <ul className="about-principles-list principles-extra-list">
                <li>
                  <span className="principle-bullet">✦</span>
                  <div>
                    <strong>Right Expert for the Right Job</strong><br />
                    I work with a team of specialists across design, backend, and deployment, so every part of your project is handled by someone who actually knows that field.
                  </div>
                </li>
                <li>
                  <span className="principle-bullet">✦</span>
                  <div>
                    <strong>End-to-End Ownership</strong><br />
                    From design to code to deployment, my team and I handle the full build — so you're not left managing multiple freelancers for one website.
                  </div>
                </li>
                <li>
                  <span className="principle-bullet">✦</span>
                  <div>
                    <strong>Built with Care</strong><br />
                    If you want a website that holds up over time, that's the kind of work I take on.
                  </div>
                </li>
              </ul>
            </div>
            {!principlesExpanded ? (
              <button
                className="principles-expand-btn-small"
                onClick={() => setPrinciplesExpanded(true)}
                aria-label="Show all principles"
              >
                <span>Show more</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            ) : (
              <button
                className="principles-expand-btn-small"
                onClick={() => setPrinciplesExpanded(false)}
                aria-label="Show fewer principles"
              >
                <span>Show less</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15" />
                </svg>
              </button>
            )}
          </div>

        </motion.div>

        {/* Skills & Technologies Bento Marquee Table */}
        <motion.div 
          className="tech-stack-wrapper"
          variants={fadeUpVariants}
        >
          <SkillsTechnologies />
        </motion.div>

      </motion.div>
    </section>
  );
}
