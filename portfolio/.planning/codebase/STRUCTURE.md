# Codebase Structure

**Analysis Date:** 2026-09-23

## Directory Layout

```text
portfolio/
├── .env.example                     # Environment template for Upstash Redis
├── .gitignore                       # Git ignore definitions
├── components.json                  # shadcn UI registry and alias configuration
├── eslint.config.js                 # Flat ESLint linter configuration
├── index.html                       # HTML5 template, Google fonts & root DOM container
├── jsconfig.json                    # JavaScript compiler options & path aliases
├── package.json                     # Dependency manifests & npm scripts
├── vite.config.js                   # Vite dev server, Tailwind plugin & path aliases
├── api/                             # Serverless cloud API functions (Vercel)
│   └── visitor-count.js             # Upstash Redis atomic visitor counter endpoint
├── public/                          # Static public assets served directly
│   └── favicon.svg                  # Brand favicon icon
├── src/                             # Main frontend application source code
│   ├── App.css                      # App shell layout & global page styling
│   ├── App.jsx                      # Router root & master layout
│   ├── index.css                    # Tailwind v4 import, OKLCH theme tokens & base styles
│   ├── main.jsx                     # React DOM entry point
│   ├── assets/                      # Binary assets, fonts, and imagery
│   │   ├── hero.png                 # Hero portrait avatar
│   │   ├── fonts/                   # Custom local display & script fonts
│   │   └── logos/                   # Company, university & client identity logos
│   ├── components/                  # Domain and presentation UI components
│   │   ├── AboutMe.css / .jsx       # Engineering philosophy bento card section
│   │   ├── ContactButtonOGL.css/.jsx# WebGL OGL radial light button
│   │   ├── ContactSection.css / .jsx# Shared contact footer with message form
│   │   ├── CurvedLoop.css / .jsx    # SVG curved looping headline animation
│   │   ├── Experience.css / .jsx    # Career & education vertical timeline
│   │   ├── FeaturedProjects.css/.jsx# Production projects showcase cards
│   │   ├── hero.css / .jsx          # Pinned multi-stage interactive scroll hero
│   │   ├── Introduction.css / .jsx  # Introduction bento grid & rotating titles
│   │   ├── navbar.css / .jsx        # Desktop navbar & mobile trigger
│   │   ├── ParticleText.css / .jsx  # Interactive 2D canvas particle text effect
│   │   ├── ScrollToTop.jsx          # Route change scroll-reset listener
│   │   ├── SkillsSection.css / .jsx # Skill marquee badge section
│   │   ├── SkillsTechnologies.css/.jsx# Categorized technology marquees
│   │   ├── SpecularButton.css / .jsx# WebGL OGL specular highlight button
│   │   ├── TechStack.css / .jsx     # Matter.js 2D falling physics cards section
│   │   ├── TextPressure.jsx         # Variable font pressure interaction
│   │   ├── VisitorBadge.css / .jsx  # Live visitor counter badge
│   │   ├── lightswind/              # Lightswind animated mobile menu components
│   │   │   └── hamburger-menu-overlay.jsx
│   │   ├── motion/                  # Motion wrapper utilities
│   │   │   └── number-ticker.jsx    # Re-export of UI number ticker
│   │   └── ui/                      # Reusable UI controls and widgets
│   │       ├── OriginCalendar.css / .jsx # Interactive booking calendar
│   │       ├── button.jsx           # Blank button stub (0 bytes)
│   │       ├── number-ticker.jsx    # Framer Motion animated number ticker
│   │       ├── send-button.css      # Sliding paper-airplane submit button CSS
│   │       ├── send-button.jsx      # Sliding paper-airplane submit button (JSX)
│   │       ├── send-button.tsx      # Duplicate TypeScript component stub
│   │       ├── text-loop.css / .jsx # Vertical rotating text loop
│   │       └── text-reveal.jsx      # Word-by-word scroll/fade reveal
│   ├── lib/                         # Shared utilities and mathematical helpers
│   │   ├── ease.js                  # Cubic bezier easing curves
│   │   └── utils.js                 # Class name merge utility (`cn`)
│   └── pages/                       # Route views
│       ├── ContactPage.css / .jsx   # Dedicated contact & meeting calendar page
│       ├── HomePage.jsx             # Landing page (Hero + Intro + Contact)
│       ├── JourneyPage.jsx          # About & Experience page
│       ├── Pages.css                # Shared styling for dedicated subpages
│       └── ProjectsPage.jsx         # Dedicated projects showcase page
└── .planning/                       # GSD meta-prompting & project planning artifacts
    ├── PROJECT.md                   # Project overview & goals
    ├── REQUIREMENTS.md              # Requirements baseline & verification
    ├── ROADMAP.md                   # Phase execution roadmap
    ├── STATE.md                     # Current state tracking & milestone progress
    ├── config.json                  # GSD runtime configuration
    └── codebase/                    # Codebase mapping documentation (7 documents)
```

## Directory Purposes

**`src/components/`:**
- Purpose: Visual presentation blocks and interactive feature sections.
- Contains: React components (`.jsx`) paired with dedicated CSS stylesheets (`.css`).
- Key files: `src/components/hero.jsx`, `src/components/Introduction.jsx`, `src/components/TechStack.jsx`, `src/components/SpecularButton.jsx`.

**`src/components/ui/`:**
- Purpose: Atomic and composite reusable interactive widgets.
- Contains: Calendar selectors, specialized animated buttons, text loopers, and number tickers.
- Key files: `src/components/ui/OriginCalendar.jsx`, `src/components/ui/send-button.jsx`, `src/components/ui/number-ticker.jsx`.

**`src/pages/`:**
- Purpose: Page-level routing views assembled from section components.
- Contains: Single-page views corresponding directly to React Router routes.
- Key files: `src/pages/HomePage.jsx`, `src/pages/JourneyPage.jsx`, `src/pages/ProjectsPage.jsx`, `src/pages/ContactPage.jsx`.

**`src/lib/`:**
- Purpose: Pure functional utility scripts and helper algorithms.
- Contains: Classname concatenation (`cn`), easing math.
- Key files: `src/lib/utils.js`, `src/lib/ease.js`.

**`api/`:**
- Purpose: Serverless cloud backend routes for Vercel deployment.
- Contains: Node.js serverless functions with standard `(req, res)` signature.
- Key files: `api/visitor-count.js`.

## Key File Locations

**Entry Points:**
- `index.html`: Web document host with external Google fonts and `#root` container.
- `src/main.jsx`: React DOM initialization with `createRoot`.
- `src/App.jsx`: Main application router setup.

**Configuration:**
- `package.json`: NPM dependencies and scripts.
- `vite.config.js`: Build and dev server configuration.
- `eslint.config.js`: ESLint rules and environments.
- `components.json`: shadcn component configuration.
- `jsconfig.json`: Path alias definitions.

**Core Logic & Physics:**
- `src/components/hero.jsx`: Scroll calculation loop.
- `src/components/TechStack.jsx`: Matter.js 2D physics engine.
- `src/components/SpecularButton.jsx`: WebGL OGL shader button.

## Naming Conventions

**Files:**
- React Components: PascalCase (e.g., `src/components/SpecularButton.jsx`, `src/pages/ContactPage.jsx`). Some legacy components use lowercase (e.g., `src/components/hero.jsx`, `src/components/navbar.jsx`).
- CSS Stylesheets: Paired matching PascalCase or lowercase corresponding to component (e.g., `SpecularButton.css`, `hero.css`).
- UI Primitives: kebab-case (e.g., `src/components/ui/send-button.jsx`, `src/components/ui/number-ticker.jsx`) or PascalCase (e.g., `OriginCalendar.jsx`).
- Utility Modules: camelCase (e.g., `src/lib/utils.js`, `src/lib/ease.js`).
- Serverless Routes: kebab-case (e.g., `api/visitor-count.js`).

**Directories:**
- Subdirectories: lowercase or kebab-case (e.g., `src/components/ui`, `src/components/lightswind`, `src/components/motion`).

## Where to Add New Code

**New Page / Route:**
- View Component: Create `src/pages/NewPage.jsx` and `src/pages/NewPage.css`.
- Route Binding: Add route mapping in `src/App.jsx` under `<Routes>`.
- Navigation Link: Add entry to `navItems` array in `src/components/navbar.jsx`.

**New Feature Section:**
- Implementation: Create `src/components/NewSection.jsx` and `src/components/NewSection.css`.
- Mounting: Import and embed inside target page in `src/pages/`.

**New UI Primitive / Control:**
- Implementation: Add to `src/components/ui/` with matching styling.
- Ensure only `.jsx` is added (avoid adding uncompiled `.tsx` files without TypeScript build configuration).

**New Backend API Endpoint:**
- Implementation: Add a new handler file under `api/<endpoint-name>.js` exporting a default `async function handler(req, res)` function.

**Shared Utility Helper:**
- Implementation: Export pure function from `src/lib/utils.js` or create a new helper in `src/lib/`.

## Special Directories

**`.planning/`:**
- Purpose: Stores GSD meta-prompting plans, roadmaps, state files, and codebase documentation.
- Generated: Semi-automated by GSD workflows.
- Committed: Recommended for project tracking.

**`dist/`:**
- Purpose: Production build artifacts generated by `npm run build`.
- Generated: Yes.
- Committed: No (ignored by `.gitignore`).

**`node_modules/`:**
- Purpose: Installed dependencies.
- Generated: Yes.
- Committed: No (ignored by `.gitignore`).

---

*Structure analysis: 2026-09-23*
