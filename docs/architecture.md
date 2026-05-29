# Architecture

Nebula uses a small monorepo organized around reusable rendering packages.

```txt
React UI
  -> React Three Fiber scene
  -> isolated effect component
  -> ShaderMaterial uniforms
  -> GLSL vertex and fragment shaders
  -> GPU pipeline
```

Rules:

- Effects are independent React components with typed props.
- Uniforms use `u` plus camelCase, for example `uTime`.
- Shaders are first-class source files, not inline strings.
- Geometry, material and texture objects are never created inside frame loops.
- Shared GLSL belongs in `packages/shaders`; JavaScript math belongs in
  `packages/math`.
