import { lavaLampPresets } from './presets';

export const lavaLampControls = {
  color1: lavaLampPresets.retro.color1,
  color2: lavaLampPresets.retro.color2,
  color3: lavaLampPresets.retro.color3,
  speed: {
    value: lavaLampPresets.retro.speed,
    min: 0,
    max: 1.2,
    step: 0.01,
  },
  intensity: {
    value: lavaLampPresets.retro.intensity,
    min: 0,
    max: 2,
    step: 0.01,
  },
  blobCount: {
    value: lavaLampPresets.retro.blobCount,
    min: 3,
    max: 8,
    step: 1,
  },
  scale: {
    value: lavaLampPresets.retro.scale,
    min: 0.4,
    max: 2,
    step: 0.1,
  },
  glow: {
    value: lavaLampPresets.retro.glow,
    min: 0,
    max: 1.5,
    step: 0.01,
  },
};
