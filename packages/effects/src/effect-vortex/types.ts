import type { Color, IUniform } from 'three';

export interface VortexEffectProps {
  color1?: string;
  color2?: string;
  color3?: string;
  speed?: number;
  intensity?: number;
  arms?: number;
  twist?: number;
  zoom?: number;
}

export interface VortexPreset {
  label: string;
  concept: string;
  color1: string;
  color2: string;
  color3: string;
  speed: number;
  intensity: number;
  arms: number;
  twist: number;
  zoom: number;
}

export interface VortexUniforms extends Record<string, IUniform<unknown>> {
  uTime: IUniform<number>;
  uColor1: IUniform<Color>;
  uColor2: IUniform<Color>;
  uColor3: IUniform<Color>;
  uSpeed: IUniform<number>;
  uIntensity: IUniform<number>;
  uArms: IUniform<number>;
  uTwist: IUniform<number>;
  uZoom: IUniform<number>;
}
