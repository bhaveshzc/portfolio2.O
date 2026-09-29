# Coding Conventions

**Analysis Date:** 2026-09-23

## Naming Patterns

**Files:**
- Component Files: PascalCase preferred for new components (e.g., `AboutMe.jsx`, `ContactPage.jsx`, `SpecularButton.jsx`), with legacy lowercase components retained (e.g., `hero.jsx`, `navbar.jsx`).
- Stylesheets: Exactly match the component name with `.css` extension (e.g., `SpecularButton.css`, `hero.css`, `ContactPage.css`).
- UI Primitives: kebab-case (e.g., `send-button.jsx`, `number-ticker.jsx`) or PascalCase (e.g., `OriginCalendar.jsx`).
- Utilities: camelCase (e.g., `src/lib/utils.js`, `src/lib/ease.js`).
- Assets: Mixed kebab-case, snake_case, and spaced names for font directories and logos (e.g., `the flat factory.jpg`, `DIT_University_Dehradun_Logo.jpg`).

**Functions:**
- Component Functions: PascalCase matching the file concept (e.g., `export default function FeaturedProjects()`).
- Event Handlers: `handle` prefix in camelCase (e.g., `handleSubmit`, `handleCopyEmail`, `handleRefresh`, `handleScroll`).
- Helper / Math Functions: camelCase (e.g., `clamp`, `mapRange`, `formatNumberWithCommas`, `getOrdinalSuffix`, `easeOutCubic`).

**Variables:**
- State Hooks: Standard React pattern `[value, setValue]` in camelCase (e.g., `const [visitorCount, setVisitorCount] = useState(35856)`).
- Refs: `containerRef`, `canvasRef`, `buttonRef` with `Ref` suffix.
- Constants: UPPER_SNAKE_CASE for static arrays/constants (e.g., `MONTH_NAMES`, `DAYS_OF_WEEK`, `SLOTS_30M_12H`, `PAD`), or camelCase for component-level configuration datasets (`experiences`, `projects`, `techIconsList`).

**Types / Schemas:**
- In TypeScript components (`src/components/ui/send-button.tsx`): PascalCase with `Props` suffix (e.g., `interface SendButtonProps`).

## Code Style

**Formatting:**
- Indentation: 2 spaces.
- Semicolons: Consistent use of semicolons across all JS/JSX files.
- Quotes: Double quotes for JSX attributes and strings in React components; single quotes in config files (`vite.config.js`, `eslint.config.js`).

**Linting:**
- Tool: ESLint v10 (Flat Config in `eslint.config.js`).
- Rulesets:
  - `@eslint/js` (`js.configs.recommended`)
  - `eslint-plugin-react-hooks` (`reactHooks.configs.flat.recommended`)
  - `eslint-plugin-react-refresh` (`reactRefresh.configs.vite`)
- Globals: `globals.browser` for `src/`, `globals.node` for `api/`.
- Dist directory ignored globally (`globalIgnores(['dist'])`).

## Import Organization

**Order:**
1. React core & standard library hooks (`useState`, `useEffect`, `useRef`, `useMemo`).
2. Third-party packages (`react-router-dom`, `ogl`, `matter-js`, `lucide-react`, `react-icons/*`).
3. Internal application components and UI primitives (`@/components/ui/...` or `../components/...`).
4. Static assets (images, logos).
5. Component stylesheet (`./ComponentName.css`).

**Example from `src/components/navbar.jsx`:**
```javascript
import { Link, useLocation } from "react-router-dom";
import HamburgerMenuOverlay from "./lightswind/hamburger-menu-overlay";
import SpecularButton from "./SpecularButton";
import "./navbar.css";
```

**Path Aliases:**
- Configured in `vite.config.js` and `jsconfig.json`:
  - `@` resolves to `./src`
  - Example: `import { cn } from "@/lib/utils"`

## Error Handling

**Patterns:**
- Local Storage Access: Always wrapped in `try/catch` to guard against `SecurityError` in incognito or restricted web views:
```javascript
try {
  const stored = localStorage.getItem("portfolio_visitor_count");
  if (stored) setVisitorCount(parseInt(stored, 10));
} catch {
  // Graceful fallback without crashing UI
}
```
- Serverless API Routes: Wrapped in `try/catch` returning appropriate HTTP status codes:
```javascript
try {
  const redis = new Redis({ url, token });
  const count = await redis.incr("portfolio:visitors");
  return res.status(200).json({ count });
} catch (error) {
  console.error("Error updating visitor count:", error);
  return res.status(500).json({ error: "Failed to update visitor count" });
}
```
- Missing Environment Variables: Early return pattern with explanatory developer note (`api/visitor-count.js:11-17`).

## Logging

**Framework:**
- Native `console.error` and `console.warn` for unexpected runtime failures. No client telemetry framework is currently attached.

**Patterns:**
- No extraneous `console.log` statements in production components.

## Comments

**When to Comment:**
- Physics engine setup and coordinate translations (`src/components/TechStack.jsx`).
- WebGL shader calculations and math algorithms (`src/components/SpecularButton.jsx`).
- Mobile vs Desktop layout delineation (`src/components/navbar.jsx`).

**JSDoc/TSDoc:**
- Minimal JSDoc used. Parameter documentation is primarily handled via prop descriptions or TypeScript interface types when present.

## Function Design

**Size:**
- Presentational components remain concise (50–150 lines). Complex visual engines (`SpecularButton.jsx`, `OriginCalendar.jsx`, `TechStack.jsx`) range from 250–470 lines due to inline shaders and calendar matrix logic.

**Parameters:**
- Destructured props with default values (e.g., `export default function OriginCalendar({ calUsername = "bhaveshzc", calEventSlug = "30min" })`).

**Return Values:**
- JSX elements for components.
- Primitives or mathematical scalars for helpers (`clamp`, `mapRange`).

## Module Design

**Exports:**
- Primary components: `export default function ComponentName()`.
- UI Primitives: Dual export pattern (named export + default export) for maximum consumer flexibility:
```javascript
export { NumberTicker };
export default NumberTicker;
```

**Barrel Files:**
- Not currently used. Components are imported directly from their respective file locations.

---

*Convention analysis: 2026-09-23*
