import type { Color, IUniform } from 'three';

export type GeometricShape = 'torusknot' | 'icosahedron' | 'torus' | 'octahedron';

export interface GeometricEffectProps {
  color1?: string;
  color2?: string;
  color3?: string;
  speed?: number;
  intensity?: number;
  scale?: number;
  rotation?: number;
  glow?: number;
  shape?: GeometricShape;
}

export interface GeometricPreset {
  label: string;
  concept: string;
  color1: string;
  color2: string;
  color3: string;
  speed: number;
  intensity: number;
  scale: number;
  rotation: number;
  glow: number;
  shape: GeometricShape;
}

export interface GeometricUniforms extends Record<string, IUniform<unknown>> {
  uTime: IUniform<number>;
  uColor1: IUniform<Color>;
  uColor2: IUniform<Color>;
  uColor3: IUniform<Color>;
  uSpeed: IUniform<number>;
  uIntensity: IUniform<number>;
  uGlow: IUniform<number>;
}
