import { auroraPresets } from './presets';

export const auroraControls = {
  color1: auroraPresets.polar.color1,
  color2: auroraPresets.polar.color2,
  color3: auroraPresets.polar.color3,
  speed: {
    value: auroraPresets.polar.speed,
    min: 0,
    max: 1.5,
    step: 0.01,
  },
  intensity: {
    value: auroraPresets.polar.intensity,
    min: 0,
    max: 1.8,
    step: 0.01,
  },
  bandScale: {
    value: auroraPresets.polar.bandScale,
    min: 0.4,
    max: 2.2,
    step: 0.01,
  },
  distortion: {
    value: auroraPresets.polar.distortion,
    min: 0,
    max: 1.2,
    step: 0.01,
  },
  contrast: {
    value: auroraPresets.polar.contrast,
    min: 0.6,
    max: 1.7,
    step: 0.01,
  },
};
