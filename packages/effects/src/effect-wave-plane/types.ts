import type { Color, IUniform } from 'three';

export interface WavePlaneEffectProps {
  color1?: string;
  color2?: string;
  color3?: string;
  speed?: number;
  amplitude?: number;
  frequency?: number;
  complexity?: number;
  intensity?: number;
}

export interface WavePlanePreset {
  label: string;
  concept: string;
  color1: string;
  color2: string;
  color3: string;
  speed: number;
  amplitude: number;
  frequency: number;
  complexity: number;
}

export interface WavePlaneUniforms extends Record<string, IUniform<unknown>> {
  uTime: IUniform<number>;
  uColor1: IUniform<Color>;
  uColor2: IUniform<Color>;
  uColor3: IUniform<Color>;
  uSpeed: IUniform<number>;
  uAmplitude: IUniform<number>;
  uFrequency: IUniform<number>;
  uComplexity: IUniform<number>;
  uIntensity: IUniform<number>;
}
