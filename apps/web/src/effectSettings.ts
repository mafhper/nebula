import {
  type AuroraEffectProps,
  auroraPresets,
  type FluidGradientEffectProps,
  fluidGradientPresets,
  type GeometricEffectProps,
  geometricPresets,
  type LavaLampEffectProps,
  lavaLampPresets,
  type ParticleGalaxyEffectProps,
  particleGalaxyPresets,
  type PlasmaEffectProps,
  plasmaPresets,
  type StarfieldEffectProps,
  starfieldPresets,
  type VortexEffectProps,
  vortexPresets,
  type WavePlaneEffectProps,
  wavePlanePresets,
} from '@nebula/effects';

import type { EffectId } from './effectRegistry';

type ToSettings = (presetId: string) => Record<string, unknown>;
type ToSnippet = (preset: string, settings: Record<string, unknown>) => string;

interface EffectSettingsAdapter {
  toSettings: ToSettings;
  toSnippet: ToSnippet;
}

const aurora: EffectSettingsAdapter = {
  toSettings: (id) => {
    const p = auroraPresets[id as keyof typeof auroraPresets];
    return {
      color1: p.color1,
      color2: p.color2,
      color3: p.color3,
      speed: p.speed,
      intensity: p.intensity,
      bandScale: p.bandScale,
      distortion: p.distortion,
      contrast: p.contrast,
    };
  },
  toSnippet: (preset, s) => {
    const fs = s as Required<AuroraEffectProps>;
    return `<AuroraEffect preset="${preset}" color1="${fs.color1}" color2="${fs.color2}" speed={${fs.speed.toFixed(2)}} intensity={${fs.intensity.toFixed(2)}} />`;
  },
};

const fluidGradient: EffectSettingsAdapter = {
  toSettings: (id) => {
    const p = fluidGradientPresets[id as keyof typeof fluidGradientPresets];
    return {
      color1: p.color1,
      color2: p.color2,
      color3: p.color3,
      speed: p.speed,
      intensity: p.intensity,
      scale: p.scale,
      distortion: p.distortion,
      contrast: p.contrast,
    };
  },
  toSnippet: (preset, s) => {
    const fs = s as Required<FluidGradientEffectProps>;
    return `<FluidGradientEffect preset="${preset}" color1="${fs.color1}" color2="${fs.color2}" speed={${fs.speed.toFixed(2)}} intensity={${fs.intensity.toFixed(2)}} />`;
  },
};

const starfield: EffectSettingsAdapter = {
  toSettings: (id) => {
    const p = starfieldPresets[id as keyof typeof starfieldPresets];
    return {
      color1: p.color1,
      color2: p.color2,
      speed: p.speed,
      intensity: p.intensity,
      density: p.density,
      depth: p.depth,
      spread: p.spread,
      pointSize: p.pointSize,
    };
  },
  toSnippet: (preset, s) => {
    const ss = s as Required<StarfieldEffectProps>;
    return `<StarfieldEffect preset="${preset}" density={${ss.density}} speed={${ss.speed.toFixed(2)}} pointSize={${ss.pointSize}} />`;
  },
};

const particleGalaxy: EffectSettingsAdapter = {
  toSettings: (id) => {
    const p = particleGalaxyPresets[id as keyof typeof particleGalaxyPresets];
    return {
      color1: p.color1,
      color2: p.color2,
      speed: p.speed,
      intensity: p.intensity,
      arms: p.arms,
      size: p.size,
      spread: p.spread,
    };
  },
  toSnippet: (preset, s) => {
    const gs = s as Required<ParticleGalaxyEffectProps>;
    return `<ParticleGalaxyEffect preset="${preset}" color1="${gs.color1}" color2="${gs.color2}" speed={${gs.speed.toFixed(2)}} arms={${gs.arms}} />`;
  },
};

const vortex: EffectSettingsAdapter = {
  toSettings: (id) => {
    const p = vortexPresets[id as keyof typeof vortexPresets];
    return {
      color1: p.color1,
      color2: p.color2,
      color3: p.color3,
      speed: p.speed,
      intensity: p.intensity,
      arms: p.arms,
      twist: p.twist,
      zoom: p.zoom,
    };
  },
  toSnippet: (preset, s) => {
    const vs = s as Required<VortexEffectProps>;
    return `<VortexEffect preset="${preset}" color1="${vs.color1}" color2="${vs.color2}" speed={${vs.speed.toFixed(2)}} arms={${vs.arms}} twist={${vs.twist.toFixed(2)}} />`;
  },
};

const wavePlane: EffectSettingsAdapter = {
  toSettings: (id) => {
    const p = wavePlanePresets[id as keyof typeof wavePlanePresets];
    return {
      color1: p.color1,
      color2: p.color2,
      color3: p.color3,
      speed: p.speed,
      amplitude: p.amplitude,
      frequency: p.frequency,
      complexity: p.complexity,
    };
  },
  toSnippet: (preset, s) => {
    const ws = s as Required<WavePlaneEffectProps>;
    return `<WavePlaneEffect preset="${preset}" color1="${ws.color1}" color2="${ws.color2}" speed={${ws.speed.toFixed(2)}} amplitude={${ws.amplitude.toFixed(2)}} frequency={${ws.frequency.toFixed(1)}} />`;
  },
};

const plasma: EffectSettingsAdapter = {
  toSettings: (id) => {
    const p = plasmaPresets[id as keyof typeof plasmaPresets];
    return {
      color1: p.color1,
      color2: p.color2,
      color3: p.color3,
      speed: p.speed,
      intensity: p.intensity,
      scale: p.scale,
      complexity: p.complexity,
      saturation: p.saturation,
    };
  },
  toSnippet: (preset, s) => {
    const ps = s as Required<PlasmaEffectProps>;
    return `<PlasmaEffect preset="${preset}" color1="${ps.color1}" color2="${ps.color2}" speed={${ps.speed.toFixed(2)}} complexity={${ps.complexity}} />`;
  },
};

const geometric: EffectSettingsAdapter = {
  toSettings: (id) => {
    const p = geometricPresets[id as keyof typeof geometricPresets];
    return {
      color1: p.color1,
      color2: p.color2,
      color3: p.color3,
      speed: p.speed,
      intensity: p.intensity,
      scale: p.scale,
      rotation: p.rotation,
      glow: p.glow,
      shape: p.shape,
    };
  },
  toSnippet: (preset, s) => {
    const gs = s as Required<GeometricEffectProps>;
    return `<GeometricEffect preset="${preset}" color1="${gs.color1}" color2="${gs.color2}" speed={${gs.speed.toFixed(2)}} glow={${gs.glow.toFixed(2)}} />`;
  },
};

const lavaLamp: EffectSettingsAdapter = {
  toSettings: (id) => {
    const p = lavaLampPresets[id as keyof typeof lavaLampPresets];
    return {
      color1: p.color1,
      color2: p.color2,
      color3: p.color3,
      speed: p.speed,
      intensity: p.intensity,
      blobCount: p.blobCount,
      scale: p.scale,
      glow: p.glow,
    };
  },
  toSnippet: (preset, s) => {
    const ls = s as Required<LavaLampEffectProps>;
    return `<LavaLampEffect preset="${preset}" color1="${ls.color1}" color2="${ls.color2}" speed={${ls.speed.toFixed(2)}} blobCount={${ls.blobCount}} glow={${ls.glow.toFixed(2)}} />`;
  },
};

export const effectSettingsMap: Record<EffectId, EffectSettingsAdapter> = {
  aurora,
  'fluid-gradient': fluidGradient,
  geometric,
  'lava-lamp': lavaLamp,
  'particle-galaxy': particleGalaxy,
  plasma,
  starfield,
  vortex,
  'wave-plane': wavePlane,
};
