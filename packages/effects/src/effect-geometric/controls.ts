import { geometricPresets } from './presets';

export const geometricControls = {
  color1: geometricPresets.nebulaKnot.color1,
  color2: geometricPresets.nebulaKnot.color2,
  color3: geometricPresets.nebulaKnot.color3,
  speed: { value: geometricPresets.nebulaKnot.speed, min: 0, max: 1.5, step: 0.01 },
  intensity: { value: geometricPresets.nebulaKnot.intensity, min: 0, max: 2, step: 0.01 },
  scale: { value: geometricPresets.nebulaKnot.scale, min: 0.3, max: 2.5, step: 0.1 },
  rotation: { value: geometricPresets.nebulaKnot.rotation, min: 0, max: 2, step: 0.1 },
  glow: { value: geometricPresets.nebulaKnot.glow, min: 0, max: 1.5, step: 0.01 },
};
