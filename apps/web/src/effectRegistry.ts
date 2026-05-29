import {
  auroraPresets,
  fluidGradientPresets,
  starfieldPresets,
  type AuroraPresetId,
  type FluidGradientPresetId,
  type StarfieldPresetId,
} from '@nebula/effects';

export type EffectId = 'aurora' | 'fluid-gradient' | 'starfield';
export type EffectStatus = 'stable' | 'preview' | 'planned';

export interface EffectMeta {
  id: EffectId;
  label: string;
  shortLabel: string;
  componentName: string;
  status: EffectStatus;
  tagline: string;
  concept: string;
  technique: string;
  bestFor: string[];
  presetCount: number;
  defaultPreset: string;
  docsPath?: string;
  githubPath: string;
}

export const auroraPresetIds = Object.keys(auroraPresets) as AuroraPresetId[];
export const fluidPresetIds = Object.keys(fluidGradientPresets) as FluidGradientPresetId[];
export const starfieldPresetIds = Object.keys(starfieldPresets) as StarfieldPresetId[];

export const effectRegistry = {
  aurora: {
    id: 'aurora',
    label: 'Aurora Field',
    shortLabel: 'Aurora',
    componentName: 'AuroraEffect',
    status: 'stable',
    tagline: 'Luminous curtain shader',
    concept: 'Cortinas de luz com bandas, noise e curvas verticais.',
    technique: 'Fragment shader, procedural noise and additive light ribbons.',
    bestFor: ['Hero backgrounds', 'Launch pages', 'Editorial product surfaces'],
    presetCount: auroraPresetIds.length,
    defaultPreset: 'polar',
    docsPath: '#learn',
    githubPath: 'packages/effects/src/effect-aurora',
  },
  'fluid-gradient': {
    id: 'fluid-gradient',
    label: 'Fluid Gradient',
    shortLabel: 'Fluid',
    componentName: 'FluidGradientEffect',
    status: 'stable',
    tagline: 'Liquid fullscreen shader',
    concept: 'Gradientes liquidos em fullscreen quad com distorcao UV.',
    technique: 'Fullscreen ShaderMaterial with radial flow and layered noise.',
    bestFor: ['Immersive sections', 'Ambient interfaces', 'Motion systems'],
    presetCount: fluidPresetIds.length,
    defaultPreset: 'prism',
    docsPath: '#learn',
    githubPath: 'packages/effects/src/effect-fluid-gradient',
  },
  starfield: {
    id: 'starfield',
    label: 'Starfield 3D',
    shortLabel: 'Stars',
    componentName: 'StarfieldEffect',
    status: 'stable',
    tagline: 'Depth particles',
    concept: 'Particulas deterministicas com profundidade e viagem no eixo Z.',
    technique: 'Points geometry, deterministic buffers and shader-driven travel.',
    bestFor: ['Space scenes', 'Technical dashboards', 'Depth and motion studies'],
    presetCount: starfieldPresetIds.length,
    defaultPreset: 'cruise',
    docsPath: '#learn',
    githubPath: 'packages/effects/src/effect-starfield',
  },
} satisfies Record<EffectId, EffectMeta>;

export const effectIds = Object.keys(effectRegistry) as EffectId[];
export const totalPresetCount =
  auroraPresetIds.length + fluidPresetIds.length + starfieldPresetIds.length;

export const milestones = [
  {
    title: 'Foundation',
    status: 'Ready',
    items: ['npm workspace monorepo', 'R3F rendering shell', 'CI, Pages and validation gates'],
  },
  {
    title: 'Core Effects',
    status: 'Ready',
    items: ['Aurora Field', 'Fluid Gradient', 'Starfield 3D'],
  },
  {
    title: 'Playground',
    status: 'Ready',
    items: ['Effect switching', 'Curated presets', 'Live snippets'],
  },
  {
    title: 'Next',
    status: 'Planned',
    items: ['Wave Plane', 'Particle Galaxy', 'Authoring docs'],
  },
];

export const effectRoadmap = [
  {
    name: 'Aurora Field',
    status: 'Stable',
    concept: 'Simplex-like noise, fragment shader, animated gradients.',
  },
  {
    name: 'Fluid Gradient',
    status: 'Stable',
    concept: 'UV distortion and color interpolation on a fullscreen quad.',
  },
  {
    name: 'Starfield 3D',
    status: 'Stable',
    concept: 'Lightweight particles, depth and Z-axis travel.',
  },
  {
    name: 'Wave Plane',
    status: 'Next',
    concept: 'Vertex shader displacement and normals.',
  },
  {
    name: 'Particle Galaxy',
    status: 'Planned',
    concept: 'Instancing, buffers and mouse/touch interaction.',
  },
];

export const architecture = [
  'React controls',
  'R3F Canvas',
  'Effect registry',
  'ShaderMaterial',
  'GLSL / GPU',
];
