import { wavePlanePresets } from './presets';

export const wavePlaneControls = {
  color1: wavePlanePresets.ocean.color1,
  color2: wavePlanePresets.ocean.color2,
  color3: wavePlanePresets.ocean.color3,
  speed: { value: wavePlanePresets.ocean.speed, min: 0, max: 1.5, step: 0.01 },
  amplitude: { value: wavePlanePresets.ocean.amplitude, min: 0, max: 1, step: 0.01 },
  frequency: { value: wavePlanePresets.ocean.frequency, min: 0.2, max: 4, step: 0.1 },
  complexity: { value: wavePlanePresets.ocean.complexity, min: 1, max: 6, step: 1 },
};
