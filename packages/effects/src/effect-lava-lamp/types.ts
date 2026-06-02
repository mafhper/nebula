import type { Color, IUniform } from 'three';

export interface LavaLampEffectProps {
  color1?: string;
  color2?: string;
  color3?: string;
  speed?: number;
  intensity?: number;
  blobCount?: number;
  scale?: number;
  glow?: number;
}

export interface LavaLampPreset {
  label: string;
  concept: string;
  color1: string;
  color2: string;
  color3: string;
  speed: number;
  intensity: number;
  blobCount: number;
  scale: number;
  glow: number;
}

export interface LavaLampUniforms extends Record<string, IUniform<unknown>> {
  uTime: IUniform<number>;
  uColor1: IUniform<Color>;
  uColor2: IUniform<Color>;
  uColor3: IUniform<Color>;
  uSpeed: IUniform<number>;
  uIntensity: IUniform<number>;
  uBlobCount: IUniform<number>;
  uScale: IUniform<number>;
  uGlow: IUniform<number>;
  uResolution: IUniform<[number, number]>;
}
