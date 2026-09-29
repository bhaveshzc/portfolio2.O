import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VisitorBadge from "./VisitorBadge";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiMongodb,
  SiDocker,
  SiGit,
  SiGithub,
  SiSupabase,
  SiCloudflare,
  SiNginx,
  SiPostman,
  SiNextdotjs,
  SiTypescript,
} from "react-icons/si";
import { FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { VscCode } from "react-icons/vsc";
import "./Introduction.css";

// Unique tech stack icons list in pure bright vector format (JS used only once)
const techIconsList = [
  { name: "React", Icon: SiReact },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "Express.js", Icon: SiExpress },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "HTML5", Icon: SiHtml5 },
  { name: "CSS3", Icon: SiCss },
  { name: "MySQL", Icon: SiMysql },
  { name: "MongoDB", Icon: SiMongodb },
  { name: "Docker", Icon: SiDocker },
  { name: "Git", Icon: SiGit },
  { name: "GitHub", Icon: SiGithub },
  { name: "VS Code", Icon: VscCode },
  { name: "Supabase", Icon: SiSupabase },
  { name: "Cloudflare", Icon: SiCloudflare },
  { name: "Nginx", Icon: SiNginx },
  { name: "Postman", Icon: SiPostman },
];

const roles = ["DESIGNER.", "WEB DEVELOPER."];

export default function Introduction() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Transition between DESIGNER and WEB DEVELOPER with smooth left-to-right reveal
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setIsTransitioning(false);
      }, 350);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="intro-luxury-section" id="intro">
      <div className="intro-luxury-wrapper">

        {/* ====================================================================
            1. VISITOR COUNT BADGE (Centered Above Bento Grid)
            ==================================================================== */}
        <VisitorBadge />

        {/* ====================================================================
            2. BENTO GRID CONTAINER
            Layout: Top Full-Width Profile Card + Bottom 50/50 Split Cards
            ==================================================================== */}
        <div className="intro-bento-vertical-flow">

          {/* ==================================================================
              TOP CARD (Full-Width Profile Card)
              ================================================================== */}
          <div className="luxury-glass-card top-profile-fullwidth-card">

            {/* Top Row: Square Avatar, Animated Role Label, Name, Marquee Right Below Name */}
            <div className="profile-top-row">
              <div className="profile-avatar-container square-avatar-ring">
                <img
                  src="/profile.png"
                  alt="Bhavesh Bisht"
                  className="profile-avatar-img square-avatar-img"
                  loading="eager"
                />
              </div>

              <div className="profile-identity">
                <div className="profile-role-label-container">
                  <span className={`profile-role-label ${isTransitioning ? "reveal-exit" : "reveal-enter"}`}>
                    {roles[roleIndex]}
                  </span>
                </div>
                <h1 className="profile-name">
                  Bhavesh Bisht
                </h1>

                {/* Floating Tech Icons Marquee placed directly below Name */}
                <div className="tech-marquee-wrapper" aria-label="Tech Stack Icons Marquee">
                  <div className="marquee-track">
                    {/* Track 1 */}
                    {techIconsList.map((item, idx) => {
                      const IconComp = item.Icon;
                      return (
                        <div
                          key={`track1-${idx}`}
                          className="marquee-icon-item"
                          title={item.name}
                        >
                          <IconComp className="tech-bright-icon" />
                        </div>
                      );
                    })}
                    {/* Track 2 (Seamless loop) */}
                    {techIconsList.map((item, idx) => {
                      const IconComp = item.Icon;
                      return (
                        <div
                          key={`track2-${idx}`}
                          className="marquee-icon-item"
                          title={item.name}
                        >
                          <IconComp className="tech-bright-icon" />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Description Text positioned below marquee */}
                <p className="profile-description">
                  I build modern full-stack web applications, scalable SaaS products and premium digital experiences using React, Node.js and cloud technologies.
                </p>
              </div>
            </div>
          </div>

          {/* ==================================================================
              BOTTOM ROW (Two Equal 50/50 Cards: My Journey & My Projects)
              ================================================================== */}
          <div className="bottom-split-cards-row">

            {/* Card 1: My Journey (Left 50%) -> Navigates to /journey */}
            <Link to="/journey" className="luxury-glass-card mini-action-card card-journey">
              <h3 className="script-title">My Journey</h3>
              <div className="card-action-bottom">
                <div className="action-tag-group">
                  <span className="action-category-label">CREATOR</span>
                  <span className="action-subtitle">The Career</span>
                </div>
              </div>
            </Link>

            {/* Card 2: My Projects (Right 50%) -> Navigates to /projects */}
            <Link to="/projects" className="luxury-glass-card mini-action-card card-portfolio">
              <h3 className="script-title">My Projects</h3>
              <div className="card-action-bottom">
                <div className="action-tag-group">
                  <span className="action-category-label">CREATIONS</span>
                  <span className="action-subtitle">The Craft</span>
                </div>
              </div>
            </Link>

          </div>

          {/* ==================================================================
              SOCIAL BADGES ROW (Profile pill centered between 4 icons)
              ================================================================== */}
          <div className="intro-badges-row">
            {/* Left 2 Icons */}
            <a href="https://www.linkedin.com/in/bhavesh-bisht-99142a383/" target="_blank" rel="noopener noreferrer" className="social-icon-bubble-btn" aria-label="LinkedIn" title="LinkedIn">
              <FaLinkedinIn size={16} />
            </a>
            <a href="https://www.instagram.com/biztxcle/?__d=1%2FHolzbau%2BPiotrowicz" target="_blank" rel="noopener noreferrer" className="social-icon-bubble-btn" aria-label="Instagram" title="Instagram">
              <FaInstagram size={16} />
            </a>

            {/* Center: Profile Identity Pill */}
            <div className="profile-identity-pill">
              <div className="profile-avatar-box">
                <img src="/profile.png" alt="Bhavesh" className="profile-img-thumb" />
              </div>
              <div className="profile-text-group">
                <div className="profile-name-row">
                  <span className="profile-name-badge">bhavesh</span>
                  <span className="profile-verified-badge">✦</span>
                </div>
                <span className="profile-handle">@bhaveshzc</span>
              </div>
              <a
                href="https://github.com/bhaveshzc"
                target="_blank"
                rel="noopener noreferrer"
                className="connect-action-pill"
              >
                <span>Connect on GitHub</span>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>
            </div>

            {/* Right 2 Icons */}
            <a href="https://t.me/+916398854475" target="_blank" rel="noopener noreferrer" className="social-icon-bubble-btn" aria-label="Telegram" title="Telegram">
              <FaTelegramPlane size={16} />
            </a>
            <a href="https://github.com/bhaveshzc" target="_blank" rel="noopener noreferrer" className="social-icon-bubble-btn" aria-label="GitHub" title="GitHub">
              <FaGithub size={16} />
            </a>
          </div>

          {/* ==================================================================
              NEW CARDS ROW: Explore My Services & Let's Work Together
              Text-only cards, same size as Journey/Projects
              ================================================================== */}
          <div className="bottom-split-cards-row">

            {/* Card 3: Explore My Services */}
            <Link to="/services" className="luxury-glass-card mini-action-card gradient-text-card">
              <h3 className="gradient-card-title">
                Explore my<br /><span className="red-accent">services.</span>
              </h3>
            </Link>

            {/* Card 4: Let's Work Together */}
            <Link to="/contact" className="luxury-glass-card mini-action-card gradient-text-card">
              <h3 className="gradient-card-title">
                Let's work<br /><span className="red-accent">together.</span>
              </h3>
            </Link>

          </div>



        </div>


      </div>
    </section>
  );
}
