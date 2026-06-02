# Nebula

Shader-first WebGL effects for React interfaces.

Nebula is an open-source React and WebGL project focused on a small set of
polished, educational and reusable GPU effects. It is not a game engine and it
is not a shader graph. The public app is a showcase and playground for effects
that can be explored as visuals, understood as rendering lessons and reused as
React component shapes.

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

The project currently exposes **55 curated presets** across these 8 effects.

[🔗 Live demo](https://mafhper.github.io/nebula/)

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
packages/math         TypeScript math utilities with Vitest coverage
packages/ui           Shared React UI components
packages/docs         Documentation package placeholder
```

## License

MIT &mdash; see [LICENSE](LICENSE).
