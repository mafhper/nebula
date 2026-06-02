import type { Color, IUniform } from 'three';

export interface ParticleGalaxyEffectProps {
  color1?: string;
  color2?: string;
  speed?: number;
  intensity?: number;
  arms?: number;
  size?: number;
  spread?: number;
}

export interface ParticleGalaxyPreset {
  label: string;
  concept: string;
  color1: string;
  color2: string;
  speed: number;
  intensity: number;
  arms: number;
  size: number;
  spread: number;
}

export interface ParticleGalaxyUniforms extends Record<string, IUniform<unknown>> {
  uTime: IUniform<number>;
  uColor1: IUniform<Color>;
  uColor2: IUniform<Color>;
  uSpeed: IUniform<number>;
  uIntensity: IUniform<number>;
  uArms: IUniform<number>;
  uSize: IUniform<number>;
  uSpread: IUniform<number>;
}
