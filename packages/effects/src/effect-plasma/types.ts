import type { Color, IUniform } from 'three';

export interface PlasmaEffectProps {
  color1?: string;
  color2?: string;
  color3?: string;
  speed?: number;
  intensity?: number;
  scale?: number;
  complexity?: number;
  saturation?: number;
}

export interface PlasmaPreset {
  label: string;
  concept: string;
  color1: string;
  color2: string;
  color3: string;
  speed: number;
  intensity: number;
  scale: number;
  complexity: number;
  saturation: number;
}

export interface PlasmaUniforms extends Record<string, IUniform<unknown>> {
  uTime: IUniform<number>;
  uColor1: IUniform<Color>;
  uColor2: IUniform<Color>;
  uColor3: IUniform<Color>;
  uSpeed: IUniform<number>;
  uIntensity: IUniform<number>;
  uScale: IUniform<number>;
  uComplexity: IUniform<number>;
  uSaturation: IUniform<number>;
}
