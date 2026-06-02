import type { WavePlanePreset } from './types';

export const wavePlanePresets = {
  ocean: {
    label: 'Ocean',
    concept: 'Ondas suaves azul profundo com cristais brancas e movimento fluido.',
    color1: '#0c4a6e',
    color2: '#38bdf8',
    color3: '#e0f2fe',
    speed: 0.34,
    amplitude: 0.28,
    frequency: 1.2,
    complexity: 3,
  },
  radio: {
    label: 'Radio',
    concept: 'Frequências vibrantes com picos verdes e vales roxos.',
    color1: '#4c1d95',
    color2: '#10b981',
    color3: '#fde047',
    speed: 0.5,
    amplitude: 0.42,
    frequency: 2.4,
    complexity: 5,
  },
  ripple: {
    label: 'Ripple',
    concept: 'Ondulações concêntricas suaves com gradiente ciano-magenta.',
    color1: '#0891b2',
    color2: '#ec4899',
    color3: '#fbcfe8',
    speed: 0.2,
    amplitude: 0.16,
    frequency: 0.8,
    complexity: 2,
  },
  mountain: {
    label: 'Mountain',
    concept: 'Picos agudos e vales profundos em tons terrosos e dourados.',
    color1: '#78350f',
    color2: '#f59e0b',
    color3: '#fef3c7',
    speed: 0.1,
    amplitude: 0.56,
    frequency: 1.6,
    complexity: 6,
  },
} satisfies Record<string, WavePlanePreset>;

export type WavePlanePresetId = keyof typeof wavePlanePresets;
