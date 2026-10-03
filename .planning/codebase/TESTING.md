# Testing Patterns

**Analysis Date:** 2026-09-23

## Test Framework

**Runner:**
- None detected - No automated test runner (such as Vitest or Jest) is currently configured in `package.json`.

**Assertion Library:**
- None currently installed.

**Run Commands:**
```bash
# Code quality & build verification commands currently available:
npm run lint           # Run ESLint across all JS/JSX files
npm run build          # Execute Vite production bundle build & syntax verification
npm run preview        # Preview production build locally
```

## Recommended Framework Setup

To introduce unit and component testing, install Vitest and React Testing Library:

```bash
npm install -D vitest @testing-library/react @testing-library/dom jsdom
```

Recommended configuration addition in `vite.config.js`:
```javascript
export default defineConfig({
  // ... existing plugins
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
})
```

## Test File Organization

**Location:**
- Co-located pattern recommended: place test files alongside components under test.

**Naming:**
- `*.test.jsx` or `*.spec.jsx` for React components.
- `*.test.js` or `*.spec.js` for utility functions.

**Structure:**
```text
src/
├── components/
│   ├── SpecularButton.jsx
│   └── SpecularButton.test.jsx
├── lib/
│   ├── utils.js
│   └── utils.test.js
```

## Test Structure

**Suite Organization (Standard Convention):**
```javascript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SendButton from "@/components/ui/send-button";

describe("SendButton", () => {
  it("renders default text when not submitted", () => {
    render(<SendButton text="SUBMIT" submitted={false} />);
    expect(screen.getByText("SUBMIT")).toBeInTheDocument();
  });

  it("renders SENT! text when submitted", () => {
    render(<SendButton text="SUBMIT" submitted={true} />);
    expect(screen.getByText("SENT!")).toBeInTheDocument();
  });
});
```

**Utility Unit Test Pattern:**
```javascript
import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn utility", () => {
  it("merges conditional tailwind classes correctly", () => {
    const result = cn("p-4", false && "hidden", "text-red-500");
    expect(result).toBe("p-4 text-red-500");
  });
});
```

## Mocking

**What to Mock:**
- WebGL Context: Canvas `getContext('webgl')` and `getContext('webgl2')` when testing components using OGL (`SpecularButton`, `ContactButtonOGL`).
- Physics Engine: Matter.js engine execution when testing container mounting without rendering loops.
- Browser APIs: `window.matchMedia`, `window.requestAnimationFrame`, `navigator.clipboard`.
- Upstash Redis: Mock `@upstash/redis` client in API route tests.

**What NOT to Mock:**
- Component children and standard React state transitions.
- Pure utility functions (`src/lib/utils.js`, `src/lib/ease.js`).

## Fixtures and Factories

**Test Data:**
- Mock Project Data: Can mirror schema from `src/components/FeaturedProjects.jsx`:
```javascript
export const mockProject = {
  id: "test-project",
  title: "Test Platform",
  category: "Full-Stack App",
  description: "Test description",
  technologies: ["React", "Node.js"],
  liveUrl: "https://example.com",
  githubUrl: "https://github.com/example/test",
};
```

## Coverage

**Requirements:** None enforced.
**Target Recommendation:** 80% coverage on core utilities (`src/lib/*`) and form validation logic (`src/components/ContactSection.jsx`, `src/pages/ContactPage.jsx`).

## Test Types

**Unit Tests:**
- Scope: Helper functions in `src/lib/utils.js`, `src/lib/ease.js`, and calendar calculations in `src/components/ui/OriginCalendar.jsx`.

**Component / Integration Tests:**
- Scope: Form submission workflows, tab switching on `ContactPage.jsx`, and mobile navigation toggling in `src/components/navbar.jsx`.

**End-to-End (E2E) Tests:**
- Not currently configured. Playwright recommended for cross-browser visual verification of WebGL effects and mobile responsiveness.

---

*Testing analysis: 2026-09-23*
