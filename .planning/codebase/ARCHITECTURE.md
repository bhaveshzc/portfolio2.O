<!-- refreshed: 2026-09-23 -->
# Architecture

**Analysis Date:** 2026-09-23

## System Overview

```text
+--------------------------------------------------------------------------------------------------+
|                                    Client Browser & User Device                                  |
+--------------------------------------------------------------------------------------------------+
                                                 |
                                                 v
+--------------------------------------------------------------------------------------------------+
|                           Application Shell & Routing (src/App.jsx)                              |
|                           [Navbar]        [ScrollToTop]       [Routes]                           |
+--------------------------------------------------------------------------------------------------+
         |                                |                                   |
         v                                v                                   v
+------------------+             +------------------+               +--------------------+
|  Home Page (/)   |             | Journey (/journey)|              |  Projects & Contact |
|  [HomePage.jsx]  |             | [JourneyPage.jsx] |              |  [ProjectsPage.jsx]|
|  - Hero (pinned) |             | - AboutMe         |              |  [ContactPage.jsx] |
|  - Introduction  |             | - Experience      |              |  - FeaturedProjects|
|  - ContactSection|             | - ContactSection  |              |  - OriginCalendar  |
+------------------+             +------------------+               +--------------------+
         |                                |                                   |
         +--------------------------------+-----------------------------------+
                                          |
                                          v
+--------------------------------------------------------------------------------------------------+
|                             Interactive Graphic & Simulation Engines                             |
|  - WebGL OGL Shaders: `src/components/SpecularButton.jsx`, `src/components/ContactButtonOGL.jsx`  |
|  - Matter.js 2D Rigid Physics: `src/components/TechStack.jsx`                                    |
|  - HTML5 Canvas Particle Engine: `src/components/ParticleText.jsx`                              |
|  - Motion v13 Springs & Tickers: `src/components/ui/number-ticker.jsx`                           |
+--------------------------------------------------------------------------------------------------+
                                          |
                                          v
+--------------------------------------------------------------------------------------------------+
|                              Backend Serverless Layer (api/)                                     |
|  - Upstash Redis Counter Endpoint: `api/visitor-count.js`                                        |
+--------------------------------------------------------------------------------------------------+
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| `App` | Root component with browser router, global navigation, and scroll restoration | `src/App.jsx` |
| `Navbar` | Adaptive sticky header with desktop navigation, specular button, and mobile hamburger overlay | `src/components/navbar.jsx` |
| `HamburgerMenuOverlay` | Fullscreen mobile navigation drawer with spring animations and backdrop blur | `src/components/lightswind/hamburger-menu-overlay.jsx` |
| `Hero` | Multi-phase pinned scroll hero section with dynamic scale, opacity, and typography morphing | `src/components/hero.jsx` |
| `Introduction` | Personal introduction bento grid, rotating designer/developer title, and live visitor badge | `src/components/Introduction.jsx` |
| `VisitorBadge` | Real-time visitor badge pill with refresh animation and ordinal numbering | `src/components/VisitorBadge.jsx` |
| `TechStack` | Interactive Matter.js gravity simulation container displaying interactive technology cards | `src/components/TechStack.jsx` |
| `AboutMe` | Glassmorphic bento cards explaining engineering philosophy and core development principles | `src/components/AboutMe.jsx` |
| `Experience` | Vertical career and educational timeline with milestone nodes and verified company logos | `src/components/Experience.jsx` |
| `FeaturedProjects` | Showcase cards for flagship production applications with live/code repository links | `src/components/FeaturedProjects.jsx` |
| `ContactSection` | Shared footer contact block with message form, direct mail copy, and social links | `src/components/ContactSection.jsx` |
| `ContactPage` | Dedicated contact page supporting message dispatch and interactive scheduling tabs | `src/pages/ContactPage.jsx` |
| `OriginCalendar` | Custom interactive booking calendar with time-slot selection and duration switching | `src/components/ui/OriginCalendar.jsx` |
| `SpecularButton` | Custom WebGL-based button rendering real-time specular highlights via OGL shaders | `src/components/SpecularButton.jsx` |
| `ContactButtonOGL` | Secondary WebGL OGL shader button variant with radial lighting effects | `src/components/ContactButtonOGL.jsx` |
| `ParticleText` | Canvas-based text rasterizer converting letters to interactive floating particle systems | `src/components/ParticleText.jsx` |

## Pattern Overview

**Overall:** Component-Driven Single Page Architecture (SPA) with Hybrid Micro-Simulations.

**Key Characteristics:**
- **Scroll-Driven Interpolation:** The Hero component implements a custom requestAnimationFrame loop computing normalized `scrollProgress` (0.0 to 1.0) and translates layout layers without third-party timeline bloat.
- **Micro-Simulation Islands:** Dedicated WebGL (`ogl`), 2D rigid physics (`matter-js`), and 2D canvas (`ParticleText`) components are encapsulated in isolated React lifecycles (`useEffect` mounts with cleanup handlers).
- **CSS-Driven Design System:** Component styles are written in dedicated CSS files relying on shared OKLCH CSS tokens, glassmorphism filters (`backdrop-filter: blur()`), and responsive media queries.

## Layers

**Application Layer:**
- Purpose: Application bootstrapping and URL-based route orchestration.
- Location: `src/main.jsx`, `src/App.jsx`
- Contains: React root mounting, router configuration, global wrappers.
- Depends on: `react-router-dom`, `src/pages/*`, `src/components/navbar.jsx`.
- Used by: Browser DOM root (`index.html`).

**Pages Layer:**
- Purpose: High-level view aggregation and route destinations.
- Location: `src/pages/`
- Contains: `HomePage.jsx`, `JourneyPage.jsx`, `ProjectsPage.jsx`, `ContactPage.jsx`.
- Depends on: Feature components in `src/components/`.
- Used by: `src/App.jsx` routes.

**Feature Components Layer:**
- Purpose: Self-contained domain sections with business markup, layout, and visual presentation.
- Location: `src/components/`
- Contains: `hero.jsx`, `Introduction.jsx`, `AboutMe.jsx`, `Experience.jsx`, `FeaturedProjects.jsx`, `ContactSection.jsx`, `TechStack.jsx`.
- Depends on: UI primitives (`src/components/ui/`), asset imports (`src/assets/`), and utility functions.
- Used by: Pages in `src/pages/`.

**UI Primitives & Graphics Engine Layer:**
- Purpose: Low-level reusable UI controls, shader canvas elements, and physics simulations.
- Location: `src/components/ui/`, `src/components/SpecularButton.jsx`, `src/components/ContactButtonOGL.jsx`, `src/components/ParticleText.jsx`
- Contains: Radix/shadcn inspired controls, WebGL shaders, Matter.js world instances.
- Depends on: `ogl`, `matter-js`, `motion`, `src/lib/utils.js`.
- Used by: Feature components and pages.

**Serverless API Layer:**
- Purpose: Backend cloud functions executing outside client browser bundle.
- Location: `api/`
- Contains: `api/visitor-count.js`.
- Depends on: `@upstash/redis`.
- Used by: Client fetch requests.

## Data Flow

### Primary Request Path

1. User visits `/` entry point (`src/main.jsx:6`).
2. `BrowserRouter` activates `HomePage` (`src/App.jsx:17`).
3. `HomePage` mounts `Hero`, `Introduction`, and `ContactSection` (`src/pages/HomePage.jsx:8-10`).
4. `Introduction` renders `VisitorBadge` which queries local storage or triggers visitor count increment (`src/components/VisitorBadge.jsx:24`).

### Contact Form Submission Flow

1. User inputs details into `ContactSection` or `ContactPage` form inputs (`src/components/ContactSection.jsx:68`).
2. User clicks submit button (`src/components/ui/send-button.jsx:7`).
3. Form validation verifies `name`, `email`, and `message` strings (`src/components/ContactSection.jsx:40`).
4. Component toggles `submitted = true`, displaying success state and triggering timed reset (`src/components/ContactSection.jsx:41-45`).

**State Management:**
- Pure local React state (`useState`, `useRef`, `useMemo`) for component-level UI interactions.
- URL-driven navigation state via `useLocation` from `react-router-dom`.
- Client persistence via `localStorage` for offline visitor count state.

## Key Abstractions

**Custom WebGL Shader Buttons:**
- Purpose: Hardware-accelerated dynamic light sheen on interactive buttons.
- Examples: `src/components/SpecularButton.jsx`, `src/components/ContactButtonOGL.jsx`.
- Pattern: Canvas ref binding + OGL `Renderer`, `Program`, and `Mesh` lifecycle management with automatic cleanup on unmount.

**Physics Simulation World:**
- Purpose: 2D falling cards physics interaction in the tech stack section.
- Examples: `src/components/TechStack.jsx`.
- Pattern: Matter.js `Engine.create()` + `Runner.run()` + `Composite.add()` with animation frame synchronization and cleanup.

**Utility Styling Composer:**
- Purpose: Safe Tailwind class name concatenation and conditional merging.
- Examples: `src/lib/utils.js` (`cn` helper).
- Pattern: Class variance authority (`clsx` + `twMerge`).

## Entry Points

**Web Client Entry Point:**
- Location: `index.html` -> `src/main.jsx`
- Triggers: Browser loading the application.
- Responsibilities: Mounts React `StrictMode` root, loads global stylesheet `src/index.css`, renders `App`.

**Serverless API Route:**
- Location: `api/visitor-count.js`
- Triggers: HTTP GET/POST to `/api/visitor-count`.
- Responsibilities: Validates Upstash Redis credentials, executes atomic `redis.incr("portfolio:visitors")`, returns JSON response.

## Architectural Constraints

- **Client-Side Rendering (CSR):** Built as a pure Vite SPA. SEO relies on client-rendered meta tags in `index.html` unless pre-rendered.
- **WebGL Context Limits:** Multiple WebGL canvases running simultaneously (`SpecularButton`, `ContactButtonOGL`) consume GPU contexts. Ensure unmount cleanup destroys renderers.
- **Global CSS Clashes:** Components use individual `.css` files rather than scoped CSS Modules or pure Tailwind classes. Class names must follow distinctive prefix conventions (e.g., `luxury-*`, `hero-*`, `timeline-*`).

## Anti-Patterns

### Unscoped Global Class Names

**What happens:** Styles in component CSS files (e.g. `src/components/hero.css`, `src/components/AboutMe.css`) are loaded globally via standard imports.
**Why it's wrong:** Class names can bleed across routes and components if names are too generic.
**Do this instead:** Prefix component selectors with distinct namespaces or adopt CSS Modules / Tailwind utilities directly.

### Dual TypeScript and JavaScript File Co-existence

**What happens:** `src/components/ui/send-button.jsx` and `src/components/ui/send-button.tsx` both exist in the same folder with identical logic.
**Why it's wrong:** Vite bundler ambiguity and confusion over which implementation is active.
**Do this instead:** Standardize on `.jsx` across the project and delete redundant `.tsx` stubs.

## Error Handling

**Strategy:** Defensive try/catch wrappers around browser APIs (`localStorage`, `navigator.clipboard`) and graceful fallbacks for serverless environments.

**Patterns:**
- Local storage fallback: `src/components/VisitorBadge.jsx:32` catches storage access errors in private browsing modes.
- Environment variable fallback: `api/visitor-count.js:11-17` returns mock response when cloud database credentials are not yet configured.

## Cross-Cutting Concerns

**Logging:** Standard browser `console.error` and Node runtime logging; no external telemetry.
**Validation:** Form input field presence checking on submit in `src/pages/ContactPage.jsx` and `src/components/ContactSection.jsx`.
**Accessibility:** ARIA labels on buttons (`aria-label`), `aria-hidden="true"` on decorative icons, keyboard-navigable links.

---

*Architecture analysis: 2026-09-23*
