# Development Workflow

## Branch Strategy
- All changes must go through **PR branches**, never pushed directly to `main`.
- Create a feature branch from `main`, push it, open a PR, verify CI passes, then merge.

## CI
- CI runs on both `push` and `pull_request` to `main` (`.github/workflows/ci.yml`).
- Validates: format → lint → type-check → unit tests → Playwright visual tests → build.
- The Visual test step runs Playwright against the Vite dev server. Flaky pixel-sampling failures can be addressed by increasing timeouts or sample density in `tests/visual-helpers.ts`.

## Key Commands
- `npm run dev` — start Vite dev server (served at `/nebula/` base path)
- `npm run build` — full build (all 8 effect libs + web app)
- `npm test` — run unit tests (vitest, 245+ tests)
- `npm run test:visual` — run Playwright visual tests (20 tests across desktop + mobile)
- `npm run lint` — ESLint check
- `npm run type-check` — TypeScript type check
- `npm run format:check` — Prettier formatting check
