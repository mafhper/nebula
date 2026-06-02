import { vortexPresets } from './presets';

export const vortexControls = {
  color1: vortexPresets.whirlpool.color1,
  color2: vortexPresets.whirlpool.color2,
  color3: vortexPresets.whirlpool.color3,
  speed: { value: vortexPresets.whirlpool.speed, min: 0, max: 1.5, step: 0.01 },
  intensity: { value: vortexPresets.whirlpool.intensity, min: 0, max: 2, step: 0.01 },
  arms: { value: vortexPresets.whirlpool.arms, min: 1, max: 8, step: 1 },
  twist: { value: vortexPresets.whirlpool.twist, min: 0, max: 2.5, step: 0.01 },
  zoom: { value: vortexPresets.whirlpool.zoom, min: 0.3, max: 2.5, step: 0.1 },
};
