# Technology Stack

**Analysis Date:** 2026-09-23

## Languages

**Primary:**
- JavaScript (ES2022+ / JSX) - Entire frontend application logic, components (`src/**/*.jsx`), API serverless functions (`api/visitor-count.js`), and build configurations (`vite.config.js`, `eslint.config.js`).

**Secondary:**
- TypeScript (TSX) - Component typing template in `src/components/ui/send-button.tsx`.
- CSS3 (Vanilla & Tailwind CSS v4) - Custom component-scoped stylesheets (`src/components/*.css`, `src/pages/*.css`) with modern CSS variables, OKLCH color space, animations, and `@theme` tokens.
- GLSL (WebGL Shaders) - Custom vertex and fragment shaders in `src/components/SpecularButton.jsx` and `src/components/ContactButtonOGL.jsx`.

## Runtime

**Environment:**
- Node.js (v20+ recommended for Vite 8 & React 19)
- Browser environment: Evergreen modern browsers supporting WebGL (WebGL 1 & WebGL 2), CSS `@container`, OKLCH, and Canvas 2D.

**Package Manager:**
- npm (v10+)
- Lockfile: `package-lock.json` present and committed.

## Frameworks

**Core:**
- React (v19.2.8) - Core UI library powering modern concurrent root (`createRoot` in `src/main.jsx`), function components, and custom hooks.
- React DOM (v19.2.8) - DOM rendering backend for React.
- React Router DOM (v7.18.4) - Client-side SPA routing (`BrowserRouter`, `Routes`, `Route`, `Link`, `useLocation` in `src/App.jsx`).

**Testing:**
- None detected - No test runner configured in `package.json` scripts or dependencies.

**Build/Dev:**
- Vite (v8.2.0) - Next-generation frontend tooling and local dev server (`vite.config.js`).
- `@vitejs/plugin-react` (v6.0.4) - Fast Refresh and JSX transformation.
- `@tailwindcss/vite` (v4.3.3) - Tailwind CSS v4 Vite compiler plugin.
- ESLint (v10.8.0) - Flat configuration linter (`eslint.config.js`) with `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, and `globals`.

## Key Dependencies

**Critical:**
- `tailwindcss` (v4.3.3) - Modern utility-first CSS engine configured via CSS `@import "tailwindcss";` in `src/index.css`.
- `motion` (v13.2.0) - Motion animation engine (Framer Motion v13) utilized in UI micro-interactions (`src/components/ui/number-ticker.jsx`).
- `ogl` (v1.0.11) - Ultra-lightweight WebGL library powering custom procedural shader buttons (`src/components/SpecularButton.jsx`, `src/components/ContactButtonOGL.jsx`).
- `matter-js` (v0.20.0) - 2D physics engine powering gravity-simulated interactive tech stack cards in `src/components/TechStack.jsx`.
- `lucide-react` (v1.32.0) & `react-icons` (v5.7.0) - Comprehensive iconography library suite for technology badges and UI action buttons.
- `clsx` (v2.1.1) & `tailwind-merge` (v3.6.0) & `class-variance-authority` (v0.7.1) - Utility class composer helpers (`src/lib/utils.js`).

**Infrastructure & Serverless:**
- `@upstash/redis` (v1.38.4) - Serverless Redis REST client for persistent visitor count incrementing in `api/visitor-count.js`.

**Unused / Declared Dependencies (Bloat Risk):**
- `three` (v0.185.1) - Three.js core 3D library (declared in `package.json` but not imported in `src/`).
- `@react-three/fiber` (v9.7.0) - React renderer for Three.js (declared in `package.json` but not imported in `src/`).
- `@react-three/drei` (v10.7.8) - Three.js helper components (declared in `package.json` but not imported in `src/`).
- `@react-three/rapier` (v2.2.0) - Rapier physics integration for R3F (declared in `package.json` but not imported in `src/`).
- `meshline` (v3.3.1) - MeshLine rendering for Three.js (declared in `package.json` but not imported in `src/`).
- `radix-ui` (v1.6.7) & `shadcn` (v4.18.0) - Base primitive libraries configured via `components.json`.

## Configuration

**Environment:**
- Local `.env` (presence detected, never logged) and `.env.example`.
- Required environment variables:
  - `UPSTASH_REDIS_REST_URL` - Endpoint URL for Upstash Redis database.
  - `UPSTASH_REDIS_REST_TOKEN` - REST authentication token for Upstash Redis database.

**Build:**
- `vite.config.js` - Defines React and Tailwind plugins, sets `@` alias to `./src`, and enables `server.host: true` for mobile LAN testing.
- `jsconfig.json` - Defines compiler options and path aliases (`@/*` -> `./src/*`).
- `components.json` - Configuration for shadcn UI component registry pointing to `src/index.css` with `radix-vega` style and `lucide` icon library.
- `eslint.config.js` - Flat ESLint configuration defining browser globals for `**/*.{js,jsx}` and Node globals for `api/**/*.{js,mjs}`.

## Platform Requirements

**Development:**
- Node.js 18+ or 20+
- Web browser supporting WebGL1/WebGL2 and Canvas 2D
- Host network binding enabled (`server.host: true`) for mobile testing over local WiFi (`http://<local-ip>:5173`)

**Production:**
- Vercel (or Netlify/Cloudflare Pages) - Supports static frontend asset hosting (`dist/`) alongside Node/Edge serverless API routes (`api/visitor-count.js`).

---

*Stack analysis: 2026-09-23*
