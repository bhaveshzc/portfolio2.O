# External Integrations

**Analysis Date:** 2026-09-23

## APIs & External Services

**Database & Analytics:**
- Upstash Redis REST API - Key-value serverless store for tracking atomic global portfolio visitor count (`portfolio:visitors`).
  - SDK/Client: `@upstash/redis` (`api/visitor-count.js`)
  - Auth: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`
  - Current Status: Backend endpoint implemented in `api/visitor-count.js`, but frontend `src/components/VisitorBadge.jsx` currently runs on client-side `localStorage` mock simulation without live fetch.

**Scheduling & Calendaring:**
- Cal.com / External Meeting Booking - Configurable meeting booking scheduler integration.
  - Integration: `src/components/ui/OriginCalendar.jsx` accepts `calUsername="bhaveshzc"` and `calEventSlug="30min"`.

**Typography & Web Fonts:**
- Google Fonts CDN - Preconnected and imported via `index.html`:
  - `Alex Brush`, `Bebas Neue`, `Cormorant Garamond`, `Dancing Script`, `Inter`, `Roboto Flex`, `Syne`.
- Fontsource Self-Hosted:
  - `@fontsource-variable/inter` imported in `src/index.css`.
- Local Custom Fonts:
  - Stored in `src/assets/fonts/` (`OkayA-Uncut`, `LTAvocado`, `Korvich-Slam`, `Dirtyline`, `SaltySans`, `Bierika`, `Prospect`, `GervindDEMO`, `Striker`).

**External Social & Professional Profiles:**
- LinkedIn: `https://www.linkedin.com/in/bhavesh-bisht-99142a383/` (`src/components/ContactSection.jsx`, `src/pages/ContactPage.jsx`, `src/components/Introduction.jsx`).
- GitHub: `https://github.com/bhaveshzc` (`src/components/ContactSection.jsx`, `src/pages/ContactPage.jsx`).
- Instagram: `https://www.instagram.com/biztxcle/...` (`src/components/ContactSection.jsx`, `src/pages/ContactPage.jsx`).
- Telegram: `https://t.me/+916398854475` (`src/components/ContactSection.jsx`, `src/pages/ContactPage.jsx`).

## Data Storage

**Databases:**
- Upstash Redis (Serverless Cloud Redis)
  - Connection: `process.env.UPSTASH_REDIS_REST_URL`
  - Auth: `process.env.UPSTASH_REDIS_REST_TOKEN`
  - Client: `@upstash/redis` instantiated in `api/visitor-count.js`

**File Storage:**
- Local filesystem only (`src/assets/` containing brand logos, avatars, and font binaries).

**Caching:**
- HTTP Cache Control: Explicitly disabled on serverless counter (`res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate")` in `api/visitor-count.js`).
- Client-side storage: `localStorage` key `portfolio_visitor_count` used as fallback in `src/components/VisitorBadge.jsx`.

## Authentication & Identity

**Auth Provider:**
- None / Public portfolio application. No user authentication session required for public visitors.

## Monitoring & Observability

**Error Tracking:**
- None detected - Client console warnings and serverless function `try/catch` with `console.error` in `api/visitor-count.js`.

**Logs:**
- Standard runtime console logging (`console.error` in `api/visitor-count.js`).

## CI/CD & Deployment

**Hosting:**
- Vercel (Configured for Vercel Serverless Functions via the root `/api` directory convention and Vite build output).

**CI Pipeline:**
- None detected - Local npm scripts (`npm run build`, `npm run lint`).

## Environment Configuration

**Required env vars:**
- `UPSTASH_REDIS_REST_URL` - Database endpoint URL.
- `UPSTASH_REDIS_REST_TOKEN` - REST authentication token.

**Secrets location:**
- Local `.env` (development) and Vercel Project Environment Variables (production). `.env.example` provides template definitions.

## Webhooks & Callbacks

**Incoming:**
- `/api/visitor-count` - Serverless HTTP GET/POST handler (`api/visitor-count.js`) returning JSON `{ count: number }`.

**Outgoing:**
- None.

---

*Integration audit: 2026-09-23*
