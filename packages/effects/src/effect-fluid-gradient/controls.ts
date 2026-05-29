import { fluidGradientPresets } from './presets';

export const fluidGradientControls = {
  color1: fluidGradientPresets.prism.color1,
  color2: fluidGradientPresets.prism.color2,
  color3: fluidGradientPresets.prism.color3,
  speed: {
    value: fluidGradientPresets.prism.speed,
    min: 0,
    max: 1.2,
    step: 0.01,
  },
  intensity: {
    value: fluidGradientPresets.prism.intensity,
    min: 0,
    max: 1.8,
    step: 0.01,
  },
  scale: {
    value: fluidGradientPresets.prism.scale,
    min: 0.5,
    max: 2,
    step: 0.01,
  },
  distortion: {
    value: fluidGradientPresets.prism.distortion,
    min: 0,
    max: 1.2,
    step: 0.01,
  },
  contrast: {
    value: fluidGradientPresets.prism.contrast,
    min: 0.6,
    max: 1.7,
    step: 0.01,
  },
};
