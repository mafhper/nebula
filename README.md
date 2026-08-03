# Nebula

[![CI](https://github.com/mafhper/nebula/actions/workflows/ci.yml/badge.svg)](https://github.com/mafhper/nebula/actions/workflows/ci.yml)
[![CodeQL](https://github.com/mafhper/nebula/actions/workflows/codeql.yml/badge.svg)](https://github.com/mafhper/nebula/actions/workflows/codeql.yml)
[![GitHub Pages](https://github.com/mafhper/nebula/actions/workflows/pages.yml/badge.svg)](https://github.com/mafhper/nebula/actions/workflows/pages.yml)

Shader-first WebGL effects for React interfaces.

Nebula is an open-source React and WebGL project focused on a small set of
polished, educational and reusable GPU effects. It is not a game engine and it
is not a shader graph. The public app is a showcase and playground for effects
that can be explored as visuals, understood as rendering lessons and reused as
React component shapes.

The packages in this repository are private workspaces used by the showcase. They are not yet
published to npm.

## Effects

| Effect          | Technique                                                | Status  |
| --------------- | -------------------------------------------------------- | ------- |
| Aurora Field    | Simplex-noise, fragment shader, animated gradients       | Stable  |
| Fluid Gradient  | UV distortion and color interpolation                    | Stable  |
| Starfield 3D    | Depth particles with Z-axis travel                       | Stable  |
| Particle Galaxy | Spiral arms, rotation, procedural colors                 | Stable  |
| Spiral Vortex   | Polar coordinates, FBM noise, spiral tunnel              | Preview |
| Wave Plane      | Vertex shader displacement and normals                   | Preview |
| Plasma Field    | Plasma algorithm, HSV cycling, layered noise             | Preview |
| Geometric Shape | Three.js primitives with vertex pulsing and fresnel glow | Preview |
| Lava Lamp       | Metaball SDF, edge glow, additive blending               | Preview |

The project currently exposes **50 curated presets** across these 9 effects.

[Open the live demo](https://mafhper.github.io/nebula/)

## Stack

- React, Vite and TypeScript
- Three.js and React Three Fiber
- Tailwind CSS
- GLSL shaders loaded with `vite-plugin-glsl`
- npm workspaces and Turborepo
- GitHub Actions and GitHub Pages

## Getting Started

Prerequisites:

- Node.js 24
- npm 11 (the repository records `npm@11.12.1` as its package manager)

```powershell
git clone https://github.com/mafhper/nebula.git
cd nebula
npm ci
npm run dev
```

The development server is available at <http://localhost:5173/nebula/>. Use `npm ci` for a clean,
reproducible install from `package-lock.json`; use `npm install` only when intentionally changing
dependencies.

## Commands

| Command                                               | Purpose                                               |
| ----------------------------------------------------- | ----------------------------------------------------- |
| `npm run dev`                                         | Start the Vite development server on port 5173        |
| `npm run format:check`                                | Check formatting with Prettier                        |
| `npm run lint`                                        | Run ESLint                                            |
| `npm run type-check`                                  | Type-check every workspace                            |
| `npm test`                                            | Run workspace unit tests with Vitest                  |
| `npm exec playwright -- install --with-deps chromium` | Install Chromium and its system dependencies          |
| `npm run test:visual`                                 | Run Playwright checks on desktop and mobile projects  |
| `npm run build`                                       | Build and type-check all workspaces through Turborepo |
| `npm run clean`                                       | Remove workspace build output                         |

## Validation and Security

Pull requests and pushes to `main` run formatting, linting, type checking, unit tests, Playwright
visual tests and the full build. Pull requests also run Dependency Guard, which verifies npm
registry signatures, rejects high-severity vulnerabilities and reviews dependency changes.

CodeQL analyzes JavaScript and TypeScript on pull requests, pushes to `main` and a weekly schedule.
GitHub Actions are pinned to full commit SHAs, and successful changes on `main` are deployed to
GitHub Pages.

Run the same core checks locally before opening a pull request:

```powershell
npm run format:check
npm run lint
npm run type-check
npm test
npm run test:visual
npm run build
```

## Repository Layout

```txt
apps/web              Showcase and playground app
packages/core         Shared rendering types and constants
packages/effects      Reusable visual effects
packages/shaders      Shared GLSL chunks
packages/materials    Shader material helpers
packages/math         TypeScript math utilities with Vitest coverage
packages/ui           Shared React UI components
packages/docs         Reserved workspace for future MDX documentation
```

## Contributing

Create a branch from `main`, keep the change focused, run the validation commands above and open a
pull request. The protected `main` branch requires the `Validate` and `Dependency Guard` checks to
pass before merge.

## License

MIT &mdash; see [LICENSE](LICENSE).
