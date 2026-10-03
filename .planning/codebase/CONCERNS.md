# Codebase Concerns

**Analysis Date:** 2026-09-23

## Tech Debt

**Unused Heavy 3D Graphics Dependencies:**
- Issue: `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/rapier`, and `meshline` are listed as core dependencies in `package.json`, but are never imported in `src/`. All 3D button rendering is handled independently by `ogl`.
- Files: `package.json`, `package-lock.json`
- Impact: Substantial installation bloat (hundreds of MB in `node_modules`), prolonged CI install times, and potential vulnerability alerts on unused packages.
- Fix approach: Remove unused Three.js packages (`npm uninstall three @react-three/fiber @react-three/drei @react-three/rapier meshline`).

**Redundant and Duplicate UI Files:**
- Issue: `src/components/ui/button.jsx` is a completely empty 0-byte file. `src/components/ui/send-button.jsx` and `src/components/ui/send-button.tsx` exist side-by-side with overlapping implementations. `src/components/motion/number-ticker.jsx` is a redundant proxy re-export.
- Files: `src/components/ui/button.jsx`, `src/components/ui/send-button.tsx`, `src/components/motion/number-ticker.jsx`
- Impact: Code clutter, module ambiguity during build resolution, and maintenance friction.
- Fix approach: Delete `button.jsx` (or populate with standard Radix button), delete `send-button.tsx`, and consolidate references to `src/components/ui/number-ticker.jsx`.

**Simulated Contact Submissions & Placeholder Links:**
- Issue: Contact form submissions in both `src/components/ContactSection.jsx` and `src/pages/ContactPage.jsx` use client-side `setTimeout` mocks without dispatching messages to an email API (e.g., Resend, Formspree). `src/components/FeaturedProjects.jsx` contains placeholder links (`https://github.com/yourusername`, `liveUrl: "#"`).
- Files: `src/components/ContactSection.jsx:41`, `src/pages/ContactPage.jsx:46`, `src/components/FeaturedProjects.jsx:18-50`
- Impact: Visitors cannot successfully deliver messages, and project demo links lead nowhere.
- Fix approach: Integrate an email dispatch service or serverless route, and update project URLs with live deployment links.

## Disconnected Features & Discrepancies

**Unconnected Upstash Redis Visitor Count API:**
- Symptoms: `api/visitor-count.js` contains a complete Upstash Redis serverless handler, but `src/components/VisitorBadge.jsx` relies exclusively on client `localStorage` with a seeded number (`35856`).
- Files: `api/visitor-count.js`, `src/components/VisitorBadge.jsx:24`
- Trigger: Loading the homepage.
- Fix approach: Connect `VisitorBadge.jsx` to fetch `/api/visitor-count` on component mount, falling back to local storage if offline or when variables are absent.

## Security Considerations

**Unprotected Public Serverless API:**
- Risk: `/api/visitor-count` has no IP rate limiting or request throttling. A malicious script could flood requests and exhaust Upstash free tier monthly request quotas.
- Files: `api/visitor-count.js`
- Current mitigation: None (executes `redis.incr()` on every request).
- Recommendations: Introduce Upstash Ratelimit (`@upstash/ratelimit`) or IP debouncing in middleware.

**Contact Form Spam Vulnerability:**
- Risk: Once real email dispatch is connected, lack of Honeypot or CAPTCHA validation could lead to automated spam bot abuse.
- Files: `src/components/ContactSection.jsx`, `src/pages/ContactPage.jsx`
- Recommendations: Add an invisible honeypot form field or Cloudflare Turnstile token validation prior to message dispatch.

## Performance Bottlenecks

**Multiple Active WebGL Canvases:**
- Problem: `src/components/SpecularButton.jsx` and `src/components/ContactButtonOGL.jsx` initialize individual WebGL renderers and animation loops per button element.
- Files: `src/components/SpecularButton.jsx`, `src/components/ContactButtonOGL.jsx`
- Cause: Independent OGL `Renderer` and `requestAnimationFrame` instances per component mount.
- Improvement path: Ensure WebGL contexts are properly disposed on unmount, and disable active rendering loop when buttons are outside the visible viewport (via `IntersectionObserver`).

**Heavy Uncompressed Font Assets in Repository:**
- Problem: `src/assets/fonts/` contains large desktop font files (`.otf`, `.ttf`), license PDFs, and image preview PNGs (`Striker Personal Use Only - Preview.png`, `01.png`).
- Files: `src/assets/fonts/**`
- Cause: Font bundles copied in their entirety from font vendor downloads.
- Improvement path: Convert fonts to modern `.woff2` web font formats, strip preview images/PDFs from the `src/` tree, and subset glyphs where appropriate.

## Fragile Areas

**Scroll Progress Interpolation in Hero:**
- Files: `src/components/hero.jsx:24-55`
- Why fragile: Computes scroll progress based on `containerRef.current.offsetHeight - window.innerHeight`. On mobile devices where browser address bars dynamically collapse and expand, viewport recalculations can cause noticeable layout jumps or flickering.
- Safe modification: Cache dimensions, use `dvh` / `svh` units, and verify behavior with simulated touch scrolling across various mobile viewports.

**Missing WebGL Context Loss Handling:**
- Files: `src/components/SpecularButton.jsx`, `src/components/ContactButtonOGL.jsx`
- Why fragile: If a mobile device triggers GPU memory reclamation while in the background, WebGL context loss occurs without recovery handlers, resulting in blank button frames.
- Safe modification: Attach `webglcontextlost` and `webglcontextrestored` event listeners to recreate shader programs gracefully.

## Scaling Limits

**Upstash Free Tier Request Limits:**
- Current capacity: 10,000 daily commands on Upstash Redis free tier.
- Limit: Traffic spikes or automated crawlers refreshing pages can exhaust daily quota.
- Scaling path: Cache visitor count reads in browser session storage for 10-15 minutes per unique visitor session.

## Test Coverage Gaps

**Form Validation & Submission Logic:**
- What's not tested: Field validation regex, submission error handling, and form clearing.
- Files: `src/components/ContactSection.jsx`, `src/pages/ContactPage.jsx`
- Risk: Input regressions or broken submit flows could silently block customer inquiries.
- Priority: High

**Visitor Counter & Utility Helpers:**
- What's not tested: `src/lib/utils.js` (`cn`), `src/lib/ease.js`, `api/visitor-count.js`.
- Files: `src/lib/utils.js`, `api/visitor-count.js`
- Risk: Edge-case crashes in utility helper calls.
- Priority: Medium

---

*Concerns audit: 2026-09-23*
