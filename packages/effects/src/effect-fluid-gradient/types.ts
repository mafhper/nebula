import type { Color, IUniform } from 'three';

export interface FluidGradientEffectProps {
  color1?: string;
  color2?: string;
  color3?: string;
  speed?: number;
  intensity?: number;
  scale?: number;
  distortion?: number;
  contrast?: number;
}

export interface FluidGradientPreset {
  label: string;
  concept: string;
  color1: string;
  color2: string;
  color3: string;
  speed: number;
  intensity: number;
  scale: number;
  distortion: number;
  contrast: number;
}

export interface FluidGradientUniforms extends Record<string, IUniform<unknown>> {
  uTime: IUniform<number>;
  uColor1: IUniform<Color>;
  uColor2: IUniform<Color>;
  uColor3: IUniform<Color>;
  uSpeed: IUniform<number>;
  uIntensity: IUniform<number>;
  uScale: IUniform<number>;
  uDistortion: IUniform<number>;
  uContrast: IUniform<number>;
}
