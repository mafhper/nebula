import { plasmaPresets } from './presets';

export const plasmaControls = {
  color1: plasmaPresets.nebula.color1,
  color2: plasmaPresets.nebula.color2,
  color3: plasmaPresets.nebula.color3,
  speed: { value: plasmaPresets.nebula.speed, min: 0, max: 1.5, step: 0.01 },
  intensity: { value: plasmaPresets.nebula.intensity, min: 0, max: 2, step: 0.01 },
  scale: { value: plasmaPresets.nebula.scale, min: 0.3, max: 2.5, step: 0.1 },
  complexity: { value: plasmaPresets.nebula.complexity, min: 1, max: 6, step: 1 },
  saturation: { value: plasmaPresets.nebula.saturation, min: 0.2, max: 2, step: 0.1 },
};
