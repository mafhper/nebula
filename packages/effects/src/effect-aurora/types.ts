import type { Color, IUniform } from 'three';

export interface AuroraEffectProps {
  color1?: string;
  color2?: string;
  color3?: string;
  speed?: number;
  intensity?: number;
  bandScale?: number;
  distortion?: number;
  contrast?: number;
}

export interface AuroraPreset {
  label: string;
  concept: string;
  color1: string;
  color2: string;
  color3: string;
  speed: number;
  intensity: number;
  bandScale: number;
  distortion: number;
  contrast: number;
}

export interface AuroraUniforms extends Record<string, IUniform<unknown>> {
  uTime: IUniform<number>;
  uColor1: IUniform<Color>;
  uColor2: IUniform<Color>;
  uColor3: IUniform<Color>;
  uSpeed: IUniform<number>;
  uIntensity: IUniform<number>;
  uBandScale: IUniform<number>;
  uDistortion: IUniform<number>;
  uContrast: IUniform<number>;
}
