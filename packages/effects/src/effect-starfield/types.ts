import type { Color, IUniform } from 'three';

export interface StarfieldEffectProps {
  color1?: string;
  color2?: string;
  speed?: number;
  intensity?: number;
  density?: number;
  depth?: number;
  spread?: number;
  pointSize?: number;
}

export interface StarfieldPreset {
  label: string;
  concept: string;
  color1: string;
  color2: string;
  speed: number;
  intensity: number;
  density: number;
  depth: number;
  spread: number;
  pointSize: number;
}

export interface StarfieldUniforms extends Record<string, IUniform<unknown>> {
  uTime: IUniform<number>;
  uColor1: IUniform<Color>;
  uColor2: IUniform<Color>;
  uSpeed: IUniform<number>;
  uIntensity: IUniform<number>;
  uDepth: IUniform<number>;
  uSpread: IUniform<number>;
  uPointSize: IUniform<number>;
}
