import {
  type AuroraPresetId,
  auroraPresets,
  type FluidGradientPresetId,
  fluidGradientPresets,
  type GeometricPresetId,
  geometricPresets,
  type LavaLampPresetId,
  lavaLampPresets,
  type ParticleGalaxyPresetId,
  particleGalaxyPresets,
  type PlasmaPresetId,
  plasmaPresets,
  type StarfieldPresetId,
  starfieldPresets,
  type VortexPresetId,
  vortexPresets,
  type WavePlanePresetId,
  wavePlanePresets,
} from '@nebula/effects';

export type EffectId =
  | 'aurora'
  | 'fluid-gradient'
  | 'geometric'
  | 'lava-lamp'
  | 'particle-galaxy'
  | 'plasma'
  | 'starfield'
  | 'vortex'
  | 'wave-plane';

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
export const geometricPresetIds = Object.keys(geometricPresets) as GeometricPresetId[];
export const lavaLampPresetIds = Object.keys(lavaLampPresets) as LavaLampPresetId[];
export const particleGalaxyPresetIds = Object.keys(
  particleGalaxyPresets,
) as ParticleGalaxyPresetId[];
export const plasmaPresetIds = Object.keys(plasmaPresets) as PlasmaPresetId[];
export const starfieldPresetIds = Object.keys(starfieldPresets) as StarfieldPresetId[];
export const vortexPresetIds = Object.keys(vortexPresets) as VortexPresetId[];
export const wavePlanePresetIds = Object.keys(wavePlanePresets) as WavePlanePresetId[];

export const effectRegistry: Record<EffectId, EffectMeta> = {
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
  'particle-galaxy': {
    id: 'particle-galaxy',
    label: 'Particle Galaxy',
    shortLabel: 'Galaxy',
    componentName: 'ParticleGalaxyEffect',
    status: 'stable',
    tagline: 'Spiral particles',
    concept: 'Galáxia procedural com braços espirais e rotação diferencial.',
    technique: 'Points geometry, spiral arm offset, additive blending.',
    bestFor: ['Cosmic backgrounds', 'Hero sections', 'Ambient motion'],
    presetCount: particleGalaxyPresetIds.length,
    defaultPreset: 'nebula',
    docsPath: '#learn',
    githubPath: 'packages/effects/src/effect-particle-galaxy',
  },
  vortex: {
    id: 'vortex',
    label: 'Spiral Vortex',
    shortLabel: 'Vortex',
    componentName: 'VortexEffect',
    status: 'preview',
    tagline: 'Tunnel of light',
    concept: 'Túnel espiral com profundidade, braços e pulsação radial.',
    technique: 'Fullscreen shader with polar coordinates and fbm noise.',
    bestFor: ['Portal scenes', 'Psychedelic sections', 'Depth illusions'],
    presetCount: vortexPresetIds.length,
    defaultPreset: 'whirlpool',
    docsPath: '#learn',
    githubPath: 'packages/effects/src/effect-vortex',
  },
  'wave-plane': {
    id: 'wave-plane',
    label: 'Wave Plane',
    shortLabel: 'Waves',
    componentName: 'WavePlaneEffect',
    status: 'preview',
    tagline: 'Vertex displacement',
    concept: 'Plano com ondulação via vertex shader, iluminação dinâmica.',
    technique: 'Vertex shader displacement, plane geometry, normal calculation.',
    bestFor: ['Topographic visuals', 'Data viz backgrounds', 'Ambient landscapes'],
    presetCount: wavePlanePresetIds.length,
    defaultPreset: 'ocean',
    docsPath: '#learn',
    githubPath: 'packages/effects/src/effect-wave-plane',
  },
  plasma: {
    id: 'plasma',
    label: 'Plasma Field',
    shortLabel: 'Plasma',
    componentName: 'PlasmaEffect',
    status: 'preview',
    tagline: 'Organic noise',
    concept: 'Manchas orgânicas animadas com plasma clássico e HSV.',
    technique: 'Fragment shader, plasma algorithm, layered noise, HSV conversion.',
    bestFor: ['Retro aesthetics', 'Music visualizers', 'Abstract backgrounds'],
    presetCount: plasmaPresetIds.length,
    defaultPreset: 'nebula',
    docsPath: '#learn',
    githubPath: 'packages/effects/src/effect-plasma',
  },
  geometric: {
    id: 'geometric',
    label: 'Geometric Shape',
    shortLabel: 'Geo',
    componentName: 'GeometricEffect',
    status: 'preview',
    tagline: '3D primitives',
    concept: 'Primitivas 3D com shader customizado, pulsação e fresnel glow.',
    technique: 'Three.js geometries, vertex pulsing, fresnel edge glow.',
    bestFor: ['Hero 3D', 'Product display', 'Tech showcases'],
    presetCount: geometricPresetIds.length,
    defaultPreset: 'nebulaKnot',
    docsPath: '#learn',
    githubPath: 'packages/effects/src/effect-geometric',
  },
  'lava-lamp': {
    id: 'lava-lamp',
    label: 'Lava Lamp',
    shortLabel: 'Lava',
    componentName: 'LavaLampEffect',
    status: 'preview',
    tagline: 'Merging metaballs',
    concept: 'Blobs orgânicos que se fundem com metaballs e glow.',
    technique: 'Fullscreen shader, metaball SDF, edge glow and additive blending.',
    bestFor: ['Ambient backgrounds', 'Retro UI', 'Relaxation interfaces'],
    presetCount: lavaLampPresetIds.length,
    defaultPreset: 'retro',
    docsPath: '#learn',
    githubPath: 'packages/effects/src/effect-lava-lamp',
  },
};

export const effectIds = Object.keys(effectRegistry) as EffectId[];
export const totalPresetCount =
  auroraPresetIds.length +
  fluidPresetIds.length +
  geometricPresetIds.length +
  lavaLampPresetIds.length +
  particleGalaxyPresetIds.length +
  plasmaPresetIds.length +
  starfieldPresetIds.length +
  vortexPresetIds.length +
  wavePlanePresetIds.length;

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
    title: 'Expansion',
    status: 'Preview',
    items: [
      'Particle Galaxy',
      'Spiral Vortex',
      'Wave Plane',
      'Plasma Field',
      'Geometric Shape',
      'Lava Lamp',
    ],
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
    name: 'Particle Galaxy',
    status: 'Stable',
    concept: 'Spiral arms, rotation, procedural colors.',
  },
  {
    name: 'Spiral Vortex',
    status: 'Preview',
    concept: 'Polar coordinates, fbm noise, spiral tunnel.',
  },
  {
    name: 'Wave Plane',
    status: 'Preview',
    concept: 'Vertex shader displacement and normals.',
  },
  {
    name: 'Plasma Field',
    status: 'Preview',
    concept: 'Plasma algorithm, HSV cycling, layered noise.',
  },
  {
    name: 'Geometric Shape',
    status: 'Preview',
    concept: 'Three.js primitives with vertex pulsing and fresnel glow.',
  },
  {
    name: 'Lava Lamp',
    status: 'Preview',
    concept: 'Metaball blobs, edge glow, additive blending.',
  },
];

export const architecture = [
  'React controls',
  'R3F Canvas',
  'Effect registry',
  'ShaderMaterial',
  'GLSL / GPU',
];
