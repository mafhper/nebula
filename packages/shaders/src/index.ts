export const shaderChunkNames = ['simplex-noise'] as const;

export type ShaderChunkName = (typeof shaderChunkNames)[number];
