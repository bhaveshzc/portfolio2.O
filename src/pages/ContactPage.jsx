import { useState } from "react";
import { FaLinkedinIn, FaInstagram, FaTelegramPlane } from "react-icons/fa";
import SendButton from "../components/ui/send-button";
import OriginCalendar from "../components/ui/OriginCalendar";
import "./ContactPage.css";
import "./Pages.css";

export default function ContactPage() {
  // Tab state: "message" or "meeting"
  const [activeTab, setActiveTab] = useState("message");
  
  // Email copy state
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Message Form State
  const [messageForm, setMessageForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    botcheck: false,
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', message: string }

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleCopyEmail = (emailText) => {
    navigator.clipboard.writeText(emailText);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    // Basic sanitization & validation (Security best practices)
    const sanitize = (str) => str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const sName = sanitize(messageForm.name.trim());
    const sEmail = sanitize(messageForm.email.trim());
    const sSubject = sanitize(messageForm.subject.trim());
    const sMessage = sanitize(messageForm.message.trim());

    if (!sName) errors.name = "Full name is required";
    if (!sEmail) {
      errors.email = "Enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sEmail)) {
      errors.email = "Enter a valid email address";
    }
    if (!sSubject) errors.subject = "Subject is required";
    if (!sMessage) errors.message = "Enter your message";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      if (!accessKey) {
        throw new Error("Web3Forms Access Key is missing. Please add it to your .env file.");
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: sName,
          email: sEmail,
          from_name: `${sName} via Portfolio`,
          replyto: sEmail,
          subject: `[Portfolio Contact] ${sSubject}`,
          phone: messageForm.phone,
          message: sMessage,
          botcheck: messageForm.botcheck,
        }),
      });

      const result = await response.json();

      if (response.status === 200) {
        setMessageForm({ name: "", email: "", phone: "", subject: "", message: "", botcheck: false });
        showToast("success", "Message sent! I'll get back to you soon.");
      } else {
        console.error("Web3Forms error:", result);
        showToast("error", "Something went wrong. Please try again or email me directly.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      showToast("error", "Something went wrong. Please try again or email me directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialIcons = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/bhavesh-bisht-99142a383/",
      icon: <FaLinkedinIn size={16} />,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/biztxcle/?__d=1%2FHolzbau%2BPiotrowicz",
      icon: <FaInstagram size={16} />,
    },
    {
      name: "Telegram",
      url: "https://t.me/+916398854475",
      icon: <FaTelegramPlane size={16} />,
    },
  ];

  return (
    <main className="dedicated-page-container contact-clean-root">
      
      <div className="contact-clean-wrapper">

        {/* =====================================================================
            1. TOP BAR: PROFILE BADGE + SOCIAL ICON BUTTONS (SOLID BORDERS)
           ===================================================================== */}
        <div className="contact-top-badges-row">
          
          {/* Left Capsule: Profile Badge */}
          <div className="profile-identity-pill">
            <div className="profile-avatar-box">
              <img src="/profile.png" alt="Biztxcle" className="profile-img-thumb" />
            </div>
            <div className="profile-text-group">
              <div className="profile-name-row">
                <span className="profile-name">Biztxcle</span>
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

          {/* Right: Clean Social Icons (Icons Only + Direct Links, Solid Border) */}
          <div className="social-icon-bubbles-group">
            {socialIcons.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-bubble-btn"
                aria-label={s.name}
                title={s.name}
              >
                {s.icon}
              </a>
            ))}
          </div>

        </div>


        {/* =====================================================================
            2. SIMPLE & SMALL EMAIL CAPSULE PILL (SOLID BORDER)
           ===================================================================== */}
        <div className="contact-email-capsule-row">
          <div className="clean-email-capsule">
            <button
              type="button"
              onClick={() => handleCopyEmail("bhaveshsb45@gmail.com")}
              className="capsule-copy-trigger"
              title="Click to copy email"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              <span className="capsule-email-text">bhaveshsb45@gmail.com</span>
            </button>

            {copiedEmail && <span className="capsule-copied-hint">Copied!</span>}

            <a
              href="mailto:bhaveshsb45@gmail.com"
              className="capsule-ext-link"
              title="Open email app"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
          </div>
        </div>


        {/* =====================================================================
            3. TAB SWITCHER (GLASS CAPSULE & SLIDING INDICATOR)
           ===================================================================== */}
        <div className="clean-switcher-center-box">
          <div className="clean-switcher-capsule">
            <div
              className={`switcher-slider-bg ${activeTab === "meeting" ? "slide-right" : "slide-left"}`}
              aria-hidden="true"
            />
            <button
              type="button"
              className={`switcher-pill-btn ${activeTab === "message" ? "is-active" : ""}`}
              onClick={() => setActiveTab("message")}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>Send a message</span>
            </button>

            <button
              type="button"
              className={`switcher-pill-btn ${activeTab === "meeting" ? "is-active" : ""}`}
              onClick={() => setActiveTab("meeting")}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>Book a meeting</span>
            </button>
          </div>
        </div>


        {/* =====================================================================
            4. TAB 1: SEND A MESSAGE
           ===================================================================== */}
        {activeTab === "message" && (
          <div className="clean-tab-pane">
            <div className="clean-message-card">
              
              {/* Title */}
              <h2 className="conversation-card-title">
                Start a <span className="text-crimson-accent">conversation.</span>
              </h2>

              <form onSubmit={handleMessageSubmit} className="conversation-clean-form" noValidate>

                {/* Honeypot Spam Protection */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: "none" }}
                  checked={messageForm.botcheck}
                  onChange={(e) => setMessageForm({ ...messageForm, botcheck: e.target.checked })}
                />

                {/* Field 1: Name */}
                <div className="conversation-input-box">
                  <input
                    type="text"
                    id="form-name"
                    placeholder="Name *"
                    value={messageForm.name}
                    maxLength="100"
                    onChange={(e) => {
                      setMessageForm({ ...messageForm, name: e.target.value });
                      if (formErrors.name) setFormErrors({ ...formErrors, name: null });
                    }}
                  />
                </div>
                {formErrors.name && <span className="field-error-text">{formErrors.name}</span>}

                {/* Field 2: Email */}
                <div className="conversation-input-box">
                  <input
                    type="email"
                    id="form-email"
                    placeholder="Email *"
                    value={messageForm.email}
                    maxLength="100"
                    onChange={(e) => {
                      setMessageForm({ ...messageForm, email: e.target.value });
                      if (formErrors.email) setFormErrors({ ...formErrors, email: null });
                    }}
                  />
                </div>
                {formErrors.email && <span className="field-error-text">{formErrors.email}</span>}

                {/* Field 2.5: Phone (Optional) */}
                <div className="conversation-input-box">
                  <input
                    type="tel"
                    id="form-phone"
                    placeholder="Phone (Optional)"
                    value={messageForm.phone}
                    maxLength="20"
                    onChange={(e) => {
                      const sanitized = e.target.value.replace(/[^\d+\-()\s]/g, "");
                      setMessageForm({ ...messageForm, phone: sanitized });
                    }}
                  />
                </div>

                {/* Field 3: Subject */}
                <div className="conversation-input-box">
                  <input
                    type="text"
                    id="form-subject"
                    placeholder="Your Subject *"
                    value={messageForm.subject}
                    maxLength="150"
                    onChange={(e) => {
                      setMessageForm({ ...messageForm, subject: e.target.value });
                      if (formErrors.subject) setFormErrors({ ...formErrors, subject: null });
                    }}
                  />
                </div>
                {formErrors.subject && <span className="field-error-text">{formErrors.subject}</span>}

                {/* Field 4: Message */}
                <div className="conversation-input-box textarea-box">
                  <textarea
                    id="form-message"
                    rows="6"
                    placeholder="Your Message *"
                    value={messageForm.message}
                    maxLength="3000"
                    onChange={(e) => {
                      setMessageForm({ ...messageForm, message: e.target.value });
                      if (formErrors.message) setFormErrors({ ...formErrors, message: null });
                    }}
                  />
                </div>
                {formErrors.message && <span className="field-error-text">{formErrors.message}</span>}

                {/* Send Button */}
                <div className="conversation-submit-row">
                  <SendButton
                    disabled={isSubmitting}
                    text={isSubmitting ? "SENDING..." : "Send"}
                    type="submit"
                    style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? "not-allowed" : "pointer" }}
                  />
                </div>

              </form>

            </div>
          </div>
        )}


        {/* =====================================================================
            5. TAB 2: BOOK A MEETING (EXACT 3-COLUMN UNIFIED CARD LAYOUT)
           ===================================================================== */}
        {activeTab === "meeting" && (
          <div className="clean-tab-pane">
            <OriginCalendar />
          </div>
        )}

      </div>

      {/* =====================================================================
          TOAST NOTIFICATION
         ===================================================================== */}
      {toast && (
        <div className={`contact-toast contact-toast--${toast.type}`}>
          <span className="contact-toast__icon">
            {toast.type === "success" ? "✓" : "✕"}
          </span>
          <span className="contact-toast__msg">{toast.message}</span>
          <button className="contact-toast__close" onClick={() => setToast(null)} aria-label="Dismiss">×</button>
        </div>
      )}

    </main>
  );
}
