# Nebula

Shader-first WebGL effects for React interfaces.

Nebula is an open-source React and WebGL project focused on a small set of
polished, educational and reusable GPU effects. It is not a game engine and it
is not a shader graph. The public app is a showcase and playground for effects
that can be explored as visuals, understood as rendering lessons and reused as
React component shapes.

## Current Effects

- **Aurora Field**: luminous curtain shader with procedural bands and noise.
- **Fluid Gradient**: liquid fullscreen shader with UV distortion and layered color.
- **Starfield 3D**: deterministic depth particles with shader-driven travel.

The project currently exposes 19 curated presets across these effects.

## Stack

- React, Vite and TypeScript
- Three.js and React Three Fiber
- GLSL shaders loaded with `vite-plugin-glsl`
- npm workspaces and Turborepo
- GitHub Actions and GitHub Pages

## Commands

```powershell
npm install
npm run dev
npm run format:check
npm run lint
npm run type-check
npm test
npm run build
npm run test:visual
```

## Repository Layout

```txt
apps/web              Showcase and playground app
packages/core         Shared rendering types and constants
packages/effects      Reusable visual effects
packages/shaders      Shared GLSL chunks
packages/materials    Shader material helpers
packages/math         TypeScript math utilities
packages/ui           Shared React UI components
packages/docs         Documentation package placeholder
```

Private planning and session notes live outside this Git repository in the
parent `.dev` directory.
