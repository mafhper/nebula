# Aurora Field

Aurora Field is the first canonical Nebula effect. It demonstrates a
shader-first rendering path with custom vertex and fragment shaders, typed
uniforms and externally controlled props.

## Concept

- Fragment shader bands driven by procedural noise.
- Vertex displacement for subtle curtain motion.
- Uniform updates through refs inside `useFrame`.

## Props

- `color1`: primary aurora color.
- `color2`: secondary aurora color.
- `speed`: animation speed.
- `intensity`: brightness and displacement strength.

## Performance Notes

The effect uses one mesh and one `ShaderMaterial`. No geometry, material or
texture objects are created inside the frame loop.
