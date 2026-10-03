import { useState, useEffect } from "react";
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

// Module-level deduplication to prevent double-firing in React 18/19 StrictMode or multiple mounts
let initialFetchPromise = null;

async function doFetchVisitorCount() {
  try {
    const storedVisitorId = typeof window !== "undefined" ? localStorage.getItem("anon_visitor_id") : null;
    const headers = {};
    if (storedVisitorId) {
      headers["x-visitor-id"] = storedVisitorId;
    }

    const res = await fetch("/api/visitor-count", {
      credentials: "include",
      headers,
    });

    if (res.ok) {
      const data = await res.json();
      if (data?.visitorId && typeof window !== "undefined") {
        localStorage.setItem("anon_visitor_id", data.visitorId);
      }
      return data?.count || null;
    }
  } catch (err) {
    console.error("Failed to fetch visitor count:", err);
  }
  return null;
}

export default function VisitorBadge() {
  const [visitorCount, setVisitorCount] = useState(100);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    if (!initialFetchPromise) {
      initialFetchPromise = doFetchVisitorCount();
    }
    initialFetchPromise.then((count) => {
      if (count) {
        setVisitorCount(count);
      }
    });
  }, []);

  const handleRefresh = async (e) => {
    e.preventDefault();
    if (isSpinning) return;
    setIsSpinning(true);
    try {
      const count = await doFetchVisitorCount();
      if (count) {
        setVisitorCount(count);
      }
    } catch {
      // Graceful fallback on error
    } finally {
      setTimeout(() => setIsSpinning(false), 450);
    }
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
