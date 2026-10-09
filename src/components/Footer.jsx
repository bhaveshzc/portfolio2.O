import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaLinkedinIn, FaInstagram, FaTelegramPlane } from "react-icons/fa";
import { motion } from "motion/react";
import "./Footer.css";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/journey" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/bhavesh-bisht-99142a383/",
    icon: <FaLinkedinIn size={15} />,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/biztxcle/?__d=1%2FHolzbau%2BPiotrowicz",
    icon: <FaInstagram size={15} />,
  },
  {
    name: "Telegram",
    url: "https://t.me/+916398854475",
    icon: <FaTelegramPlane size={15} />,
  },
];

export default function Footer() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const location = useLocation();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("bhaveshsb45@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <footer className="site-footer">
      <motion.div
        className="footer-inner"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -50px 0px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >

        {/* ── Top Divider Line ── */}
        <div className="footer-top-divider" />

        {/* ── Row 1: Profile Badge + Social Icons ── */}
        <div className="footer-badges-row">
          {/* Profile identity pill */}
          <div className="footer-profile-pill">
            <div className="footer-avatar-box">
              <img src="/profile.png" alt="Biztxcle" className="footer-avatar-img" />
            </div>
            <div className="footer-profile-text">
              <div className="footer-name-row">
                <span className="footer-profile-name">Biztxcle</span>
                <span className="footer-verified">✦</span>
              </div>
              <span className="footer-handle">@bhaveshzc</span>
            </div>
            <a
              href="https://github.com/bhaveshzc"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-connect-pill"
            >
              <span>Connect on GitHub</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>

          {/* Social icon bubbles */}
          <div className="footer-social-bubbles">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label={s.name}
                title={s.name}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── Row 2: Email Capsule ── */}
        <div className="footer-email-row">
          <div className="footer-email-capsule">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="footer-email-copy-btn"
              title="Click to copy email"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span className="footer-email-text">bhaveshsb45@gmail.com</span>
            </button>
            {copiedEmail && <span className="footer-copied-hint">Copied!</span>}
            <a
              href="mailto:bhaveshsb45@gmail.com"
              className="footer-email-ext-link"
              title="Open email app"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>
        </div>

        {/* ── Row 3: Navigation Links ── */}
        <nav className="footer-nav-row" aria-label="Footer navigation">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`footer-nav-link ${location.pathname === link.href ? "footer-nav-active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ── Row 4: Copyright ── */}
        <div className="footer-copyright-row">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Biztxcle. Crafted with precision &amp; scalability.
          </p>
        </div>

      </motion.div>
    </footer>
  );
}
