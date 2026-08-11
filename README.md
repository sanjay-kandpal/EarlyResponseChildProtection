# Early Response Child Protection

Next.js baseline for the Early Response Child Protection project. Feature work is pending further instructions.

## Stack

- **Next.js** 16 (App Router)
- **React** 19
- **TypeScript**
- **Tailwind CSS** 4
- **ESLint** (`eslint-config-next`)
- **npm** package manager
- Source under `src/` with import alias `@/*`

## Project layout

```
src/app/
  layout.tsx                 # Root layout (PrivaSapien stylesheet)
  page.tsx                   # Injects captured homepage HTML
  globals.css
src/content/
  privasapien-home.html      # Static clone of privasapien.com homepage
public/
next.config.ts
tsconfig.json
```

## Scripts

| Command         | Purpose                          |
|-----------------|----------------------------------|
| `npm run dev`   | Start development server         |
| `npm run build` | Production build                 |
| `npm start`     | Serve production build           |
| `npm run lint`  | Run ESLint                       |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What’s done so far

1. Scaffolded with `create-next-app` (TypeScript, App Router, Tailwind, ESLint, `src/`, `@/*`).
2. Package name: `early-response-child-protection` (npm-safe; folder name may differ).
3. Verified `npm run build` succeeds.
4. Homepage renders a static PrivaSapien DOM clone from `src/content/privasapien-home.html`.
5. Header nav labels replaced (desktop + mobile) with: About NeoStats, Solution Architecture, Stories, Analysis use Case (hash anchors for now).
6. Header logo uses local `/brand/neostats-logo.png` (green NEO + black STATS on light bar) — remote `white.png` plus dark CSS frame made STATS unreadable.
7. Hero privacy-risk circle (`#hero-orbit`): restored center shield + score (capture had `opacity: 0`); `HeroOrbitScript` restores click/autoplay — green arc rotates (needs `transform !important` vs remote CSS), active node turns emerald, others fade.
8. DPDP lifecycle curved tabs (`#lifecycle-tabs`): static capture only had the Data Collection panel — added the other four panels + `LifecycleTabsScript` so stage buttons switch the detail card (inline `display` toggle + scroll card into view on click). Do not invent new Tailwind utilities in the HTML — styling comes from PrivaSapien’s remote CSS; use `globals.css` for local overrides.
9. Hero “Trusted across the world by leaders” logo marquee (`#trusted-leaders`) hidden for now (`display:none` + `globals.css`).

## Next

Awaiting further product/feature requirements.
