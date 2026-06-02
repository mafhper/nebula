export const shaderChunkNames = ['simplex-noise'] as const;

export type ShaderChunkName = (typeof shaderChunkNames)[number];

/**
 * Shader chunks are plain GLSL files in src/chunks/.
 * Use `#include "chunk-name"` in effect shaders to inline them at build time.
 * vite-plugin-glsl resolves includes relative to the importing file, then src/, then node_modules/.
 */
