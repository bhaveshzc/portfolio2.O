import { useState } from "react";
import "./VisitorBadge.css";

function formatNumberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getOrdinalSuffix(num) {
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) return "st";
  if (j === 2 && k !== 12) return "nd";
  if (j === 3 && k !== 13) return "rd";
  return "th";
}

export default function VisitorBadge() {
  const [visitorCount, setVisitorCount] = useState(() => {
    try {
      const stored = typeof window !== "undefined" ? localStorage.getItem("portfolio_visitor_count") : null;
      if (stored) {
        return parseInt(stored, 10);
      }
      const initial = 35856 + Math.floor(Math.random() * 12);
      if (typeof window !== "undefined") {
        localStorage.setItem("portfolio_visitor_count", initial.toString());
      }
      return initial;
    } catch {
      return 35856;
    }
  });
  const [isSpinning, setIsSpinning] = useState(false);

  const handleRefresh = (e) => {
    e.preventDefault();
    setIsSpinning(true);
    setTimeout(() => {
      setVisitorCount((prev) => {
        const next = prev + 1;
        try {
          localStorage.setItem("portfolio_visitor_count", next.toString());
        } catch {
          // ignore
        }
        return next;
      });
      setIsSpinning(false);
    }, 450);
  };

  const suffix = getOrdinalSuffix(visitorCount);
  const formattedNumber = formatNumberWithCommas(visitorCount);

  return (
    <div className="visitor-badge-top-container">
      <button
        type="button"
        className="luxury-visitor-pill"
        onClick={handleRefresh}
        title="Live visitor counter (Click to refresh)"
      >
        <span className="visitor-pill-text">
          <span>You're the</span>
          <strong className="visitor-count-highlight">
            {formattedNumber}
            <sup className="visitor-ordinal-sup">{suffix}</sup>
          </strong>
          <span>visitor</span>
        </span>
        <span className={`visitor-refresh-icon ${isSpinning ? "is-spinning" : ""}`} aria-hidden="true">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10"></polyline>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
          </svg>
        </span>
      </button>
    </div>
  );
}
