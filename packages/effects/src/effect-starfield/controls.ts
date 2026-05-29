import { starfieldPresets } from './presets';

export const starfieldControls = {
  color1: starfieldPresets.cruise.color1,
  color2: starfieldPresets.cruise.color2,
  speed: {
    value: starfieldPresets.cruise.speed,
    min: 0,
    max: 1.2,
    step: 0.01,
  },
  intensity: {
    value: starfieldPresets.cruise.intensity,
    min: 0,
    max: 1.6,
    step: 0.01,
  },
  density: {
    value: starfieldPresets.cruise.density,
    min: 300,
    max: 1800,
    step: 50,
  },
  depth: {
    value: starfieldPresets.cruise.depth,
    min: 8,
    max: 32,
    step: 1,
  },
  spread: {
    value: starfieldPresets.cruise.spread,
    min: 7,
    max: 18,
    step: 0.5,
  },
  pointSize: {
    value: starfieldPresets.cruise.pointSize,
    min: 8,
    max: 28,
    step: 1,
  },
};
