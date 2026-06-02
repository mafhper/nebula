import { particleGalaxyPresets } from './presets';

export const particleGalaxyControls = {
  color1: particleGalaxyPresets.nebula.color1,
  color2: particleGalaxyPresets.nebula.color2,
  speed: {
    value: particleGalaxyPresets.nebula.speed,
    min: 0,
    max: 1.5,
    step: 0.01,
  },
  intensity: {
    value: particleGalaxyPresets.nebula.intensity,
    min: 0,
    max: 2,
    step: 0.01,
  },
  arms: {
    value: particleGalaxyPresets.nebula.arms,
    min: 2,
    max: 6,
    step: 1,
  },
  size: {
    value: particleGalaxyPresets.nebula.size,
    min: 0.5,
    max: 6,
    step: 0.1,
  },
  spread: {
    value: particleGalaxyPresets.nebula.spread,
    min: 0.3,
    max: 2.5,
    step: 0.1,
  },
};
