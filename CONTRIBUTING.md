# Contributing

Nebula favors a few excellent effects over many unfinished experiments.

## Pull Request Baseline

- Keep each PR focused on one effect, package or infrastructure change.
- Run `npm run format:check`, `npm run lint`, `npm run type-check`, `npm test`
  and `npm run build` before opening a PR.
- Do not add generated citation artifacts, local agent files or secrets.
- Do not use `setState` inside `useFrame`; update refs and uniforms directly.
- Document every effect with controls, presets, performance notes and the
  rendering concept it teaches.

## Effect Template

```txt
effect-name/
  index.ts
  EffectName.tsx
  vertex.glsl
  fragment.glsl
  controls.ts
  presets.ts
  types.ts
  README.md
```

Per-effect shader files are named `vertex.glsl` and `fragment.glsl`. Shared
GLSL chunks use kebab-case, for example `simplex-noise.glsl`.
