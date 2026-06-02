import {
  AuroraEffect,
  type AuroraEffectProps,
  type AuroraPresetId,
  auroraPresets,
  FluidGradientEffect,
  type FluidGradientEffectProps,
  type FluidGradientPresetId,
  fluidGradientPresets,
  GeometricEffect,
  type GeometricEffectProps,
  type GeometricPresetId,
  geometricPresets,
  ParticleGalaxyEffect,
  type ParticleGalaxyEffectProps,
  type ParticleGalaxyPresetId,
  particleGalaxyPresets,
  PlasmaEffect,
  type PlasmaEffectProps,
  type PlasmaPresetId,
  plasmaPresets,
  StarfieldEffect,
  type StarfieldEffectProps,
  type StarfieldPresetId,
  starfieldPresets,
  VortexEffect,
  type VortexEffectProps,
  type VortexPresetId,
  vortexPresets,
  WavePlaneEffect,
  type WavePlaneEffectProps,
  type WavePlanePresetId,
  wavePlanePresets,
} from '@nebula/effects';
import { useCallback, useMemo, useState } from 'react';

import { ControlPanel } from './components/ControlPanel';
import { DeveloperHandOff } from './components/DeveloperHandOff';
import { EffectPlayground } from './components/EffectPlayground';
import { EffectsGallery } from './components/EffectsGallery';
import { HeroExperience } from './components/HeroExperience';
import { PerformanceMetrics, usePerformanceToggle } from './components/PerformanceMetrics';
import { ProjectRoadmap } from './components/ProjectRoadmap';
import { RangeControl } from './components/RangeControl';
import { VisualCanvas } from './components/VisualCanvas';
import {
  auroraPresetIds,
  type EffectId,
  effectIds,
  effectRegistry,
  fluidPresetIds,
  geometricPresetIds,
  particleGalaxyPresetIds,
  plasmaPresetIds,
  starfieldPresetIds,
  totalPresetCount,
  vortexPresetIds,
  wavePlanePresetIds,
} from './effectRegistry';

const presetConfig: Record<
  EffectId,
  {
    ids: readonly string[];
    presets: Record<
      string,
      { color1: string; color2: string; color3?: string; label: string; concept: string }
    >;
    swatch: 'linear' | 'radial';
  }
> = {
  aurora: { ids: auroraPresetIds, presets: auroraPresets, swatch: 'linear' },
  'fluid-gradient': { ids: fluidPresetIds, presets: fluidGradientPresets, swatch: 'linear' },
  geometric: { ids: geometricPresetIds, presets: geometricPresets, swatch: 'radial' },
  'particle-galaxy': {
    ids: particleGalaxyPresetIds,
    presets: particleGalaxyPresets,
    swatch: 'radial',
  },
  plasma: { ids: plasmaPresetIds, presets: plasmaPresets, swatch: 'linear' },
  starfield: { ids: starfieldPresetIds, presets: starfieldPresets, swatch: 'radial' },
  vortex: { ids: vortexPresetIds, presets: vortexPresets, swatch: 'radial' },
  'wave-plane': { ids: wavePlanePresetIds, presets: wavePlanePresets, swatch: 'linear' },
};

const effectComponents = {
  aurora: AuroraEffect,
  'fluid-gradient': FluidGradientEffect,
  geometric: GeometricEffect,
  'particle-galaxy': ParticleGalaxyEffect,
  plasma: PlasmaEffect,
  starfield: StarfieldEffect,
  vortex: VortexEffect,
  'wave-plane': WavePlaneEffect,
} as const;

type ControlConfig = ReadonlyArray<{
  label: string;
  key: string;
  min: number;
  max: number;
  step: number;
}>;

const controlConfig: Record<EffectId, ControlConfig> = {
  aurora: [
    { label: 'Speed', key: 'speed', min: 0, max: 1.5, step: 0.01 },
    { label: 'Intensity', key: 'intensity', min: 0, max: 1.8, step: 0.01 },
    { label: 'Bands', key: 'bandScale', min: 0.4, max: 2.2, step: 0.01 },
    { label: 'Distortion', key: 'distortion', min: 0, max: 1.2, step: 0.01 },
  ],
  'fluid-gradient': [
    { label: 'Speed', key: 'speed', min: 0, max: 1.2, step: 0.01 },
    { label: 'Intensity', key: 'intensity', min: 0, max: 1.8, step: 0.01 },
    { label: 'Scale', key: 'scale', min: 0.5, max: 2, step: 0.01 },
    { label: 'Distortion', key: 'distortion', min: 0, max: 1.2, step: 0.01 },
  ],
  'particle-galaxy': [
    { label: 'Speed', key: 'speed', min: 0, max: 1.5, step: 0.01 },
    { label: 'Intensity', key: 'intensity', min: 0, max: 2, step: 0.01 },
    { label: 'Arms', key: 'arms', min: 2, max: 6, step: 1 },
    { label: 'Size', key: 'size', min: 0.5, max: 6, step: 0.1 },
    { label: 'Spread', key: 'spread', min: 0.3, max: 2.5, step: 0.1 },
  ],
  starfield: [
    { label: 'Speed', key: 'speed', min: 0, max: 1.2, step: 0.01 },
    { label: 'Density', key: 'density', min: 300, max: 1800, step: 50 },
    { label: 'Depth', key: 'depth', min: 8, max: 32, step: 1 },
    { label: 'Point size', key: 'pointSize', min: 8, max: 28, step: 1 },
  ],
  vortex: [
    { label: 'Speed', key: 'speed', min: 0, max: 1.5, step: 0.01 },
    { label: 'Intensity', key: 'intensity', min: 0, max: 2, step: 0.01 },
    { label: 'Arms', key: 'arms', min: 1, max: 8, step: 1 },
    { label: 'Twist', key: 'twist', min: 0, max: 2.5, step: 0.01 },
    { label: 'Zoom', key: 'zoom', min: 0.3, max: 2.5, step: 0.1 },
  ],
  'wave-plane': [
    { label: 'Speed', key: 'speed', min: 0, max: 1.5, step: 0.01 },
    { label: 'Amplitude', key: 'amplitude', min: 0, max: 1, step: 0.01 },
    { label: 'Frequency', key: 'frequency', min: 0.2, max: 4, step: 0.1 },
    { label: 'Complexity', key: 'complexity', min: 1, max: 6, step: 1 },
  ],
  plasma: [
    { label: 'Speed', key: 'speed', min: 0, max: 1.5, step: 0.01 },
    { label: 'Intensity', key: 'intensity', min: 0, max: 2, step: 0.01 },
    { label: 'Scale', key: 'scale', min: 0.3, max: 2.5, step: 0.1 },
    { label: 'Complexity', key: 'complexity', min: 1, max: 6, step: 1 },
    { label: 'Saturation', key: 'saturation', min: 0.2, max: 2, step: 0.1 },
  ],
  geometric: [
    { label: 'Speed', key: 'speed', min: 0, max: 1.5, step: 0.01 },
    { label: 'Intensity', key: 'intensity', min: 0, max: 2, step: 0.01 },
    { label: 'Scale', key: 'scale', min: 0.3, max: 2.5, step: 0.1 },
    { label: 'Rotation', key: 'rotation', min: 0, max: 2, step: 0.1 },
    { label: 'Glow', key: 'glow', min: 0, max: 1.5, step: 0.01 },
  ],
};

function auroraToSettings(presetId: AuroraPresetId): Required<AuroraEffectProps> {
  const preset = auroraPresets[presetId];
  return {
    color1: preset.color1,
    color2: preset.color2,
    color3: preset.color3,
    speed: preset.speed,
    intensity: preset.intensity,
    bandScale: preset.bandScale,
    distortion: preset.distortion,
    contrast: preset.contrast,
  };
}

function fluidToSettings(presetId: FluidGradientPresetId): Required<FluidGradientEffectProps> {
  const preset = fluidGradientPresets[presetId];
  return {
    color1: preset.color1,
    color2: preset.color2,
    color3: preset.color3,
    speed: preset.speed,
    intensity: preset.intensity,
    scale: preset.scale,
    distortion: preset.distortion,
    contrast: preset.contrast,
  };
}

function starfieldToSettings(presetId: StarfieldPresetId): Required<StarfieldEffectProps> {
  const preset = starfieldPresets[presetId];
  return {
    color1: preset.color1,
    color2: preset.color2,
    speed: preset.speed,
    intensity: preset.intensity,
    density: preset.density,
    depth: preset.depth,
    spread: preset.spread,
    pointSize: preset.pointSize,
  };
}

function particleGalaxyToSettings(
  presetId: ParticleGalaxyPresetId,
): Required<ParticleGalaxyEffectProps> {
  const preset = particleGalaxyPresets[presetId];
  return {
    color1: preset.color1,
    color2: preset.color2,
    speed: preset.speed,
    intensity: preset.intensity,
    arms: preset.arms,
    size: preset.size,
    spread: preset.spread,
  };
}

function vortexToSettings(presetId: VortexPresetId): Required<VortexEffectProps> {
  const preset = vortexPresets[presetId];
  return {
    color1: preset.color1,
    color2: preset.color2,
    color3: preset.color3,
    speed: preset.speed,
    intensity: preset.intensity,
    arms: preset.arms,
    twist: preset.twist,
    zoom: preset.zoom,
  };
}

function wavePlaneToSettings(presetId: WavePlanePresetId): Required<WavePlaneEffectProps> {
  const preset = wavePlanePresets[presetId];
  return {
    color1: preset.color1,
    color2: preset.color2,
    color3: preset.color3,
    speed: preset.speed,
    amplitude: preset.amplitude,
    frequency: preset.frequency,
    complexity: preset.complexity,
  };
}

function plasmaToSettings(presetId: PlasmaPresetId): Required<PlasmaEffectProps> {
  const preset = plasmaPresets[presetId];
  return {
    color1: preset.color1,
    color2: preset.color2,
    color3: preset.color3,
    speed: preset.speed,
    intensity: preset.intensity,
    scale: preset.scale,
    complexity: preset.complexity,
    saturation: preset.saturation,
  };
}

function geometricToSettings(presetId: GeometricPresetId): Required<GeometricEffectProps> {
  const preset = geometricPresets[presetId];
  return {
    color1: preset.color1,
    color2: preset.color2,
    color3: preset.color3,
    speed: preset.speed,
    intensity: preset.intensity,
    scale: preset.scale,
    rotation: preset.rotation,
    glow: preset.glow,
    shape: preset.shape,
  };
}

type EffectState = {
  preset:
    | AuroraPresetId
    | FluidGradientPresetId
    | ParticleGalaxyPresetId
    | StarfieldPresetId
    | VortexPresetId
    | WavePlanePresetId
    | PlasmaPresetId
    | GeometricPresetId;
  settings: Required<
    | AuroraEffectProps
    | FluidGradientEffectProps
    | ParticleGalaxyEffectProps
    | StarfieldEffectProps
    | VortexEffectProps
    | WavePlaneEffectProps
    | PlasmaEffectProps
    | GeometricEffectProps
  >;
};

function initialEffectsState(): Record<EffectId, EffectState> {
  return {
    aurora: { preset: 'polar' as const, settings: auroraToSettings('polar') },
    'fluid-gradient': { preset: 'prism' as const, settings: fluidToSettings('prism') },
    'particle-galaxy': { preset: 'nebula' as const, settings: particleGalaxyToSettings('nebula') },
    starfield: { preset: 'cruise' as const, settings: starfieldToSettings('cruise') },
    vortex: { preset: 'whirlpool' as const, settings: vortexToSettings('whirlpool') },
    'wave-plane': { preset: 'ocean' as const, settings: wavePlaneToSettings('ocean') },
    plasma: { preset: 'nebula' as const, settings: plasmaToSettings('nebula') },
    geometric: { preset: 'nebulaKnot' as const, settings: geometricToSettings('nebulaKnot') },
  };
}

export function App() {
  const [selectedEffect, setSelectedEffect] = useState<EffectId>('aurora');
  const [effects, setEffects] = useState(initialEffectsState);
  const [showMetrics, toggleMetrics] = usePerformanceToggle();

  const current = effects[selectedEffect];

  const setCurrentPreset = useCallback(
    (presetId: string) => {
      const id = selectedEffect;
      const toSettings =
        id === 'aurora'
          ? auroraToSettings
          : id === 'fluid-gradient'
            ? fluidToSettings
            : id === 'particle-galaxy'
              ? particleGalaxyToSettings
              : id === 'vortex'
                ? vortexToSettings
                : id === 'wave-plane'
                  ? wavePlaneToSettings
                  : id === 'plasma'
                    ? plasmaToSettings
                    : id === 'geometric'
                      ? geometricToSettings
                      : starfieldToSettings;

      setEffects((prev) => ({
        ...prev,
        [id]: { preset: presetId as never, settings: toSettings(presetId as never) },
      }));
    },
    [selectedEffect],
  );

  const setCurrentSetting = useCallback(
    <K extends string>(key: K, value: number) => {
      setEffects((prev) => ({
        ...prev,
        [selectedEffect]: {
          ...prev[selectedEffect],
          settings: { ...prev[selectedEffect].settings, [key]: value },
        },
      }));
    },
    [selectedEffect],
  );

  const activeEffect = effectRegistry[selectedEffect];
  const activePreset = presetConfig[selectedEffect].presets[current.preset];
  const EffectComponent = effectComponents[selectedEffect];
  const activeVisual = (
    <>
      <EffectComponent {...(current.settings as unknown as Record<string, unknown>)} />
      {showMetrics && <PerformanceMetrics />}
    </>
  );

  const snippet = useMemo(() => {
    const s = current.settings;
    const p = current.preset;

    if (selectedEffect === 'fluid-gradient') {
      const fs = s as Required<FluidGradientEffectProps>;
      return `<FluidGradientEffect preset="${p}" color1="${fs.color1}" color2="${fs.color2}" speed={${fs.speed.toFixed(2)}} intensity={${fs.intensity.toFixed(2)}} />`;
    }

    if (selectedEffect === 'starfield') {
      const ss = s as Required<StarfieldEffectProps>;
      return `<StarfieldEffect preset="${p}" density={${ss.density}} speed={${ss.speed.toFixed(2)}} pointSize={${ss.pointSize}} />`;
    }

    if (selectedEffect === 'particle-galaxy') {
      const gs = s as Required<ParticleGalaxyEffectProps>;
      return `<ParticleGalaxyEffect preset="${p}" color1="${gs.color1}" color2="${gs.color2}" speed={${gs.speed.toFixed(2)}} arms={${gs.arms}} />`;
    }

    if (selectedEffect === 'vortex') {
      const vs = s as Required<VortexEffectProps>;
      return `<VortexEffect preset="${p}" color1="${vs.color1}" color2="${vs.color2}" speed={${vs.speed.toFixed(2)}} arms={${vs.arms}} twist={${vs.twist.toFixed(2)}} />`;
    }

    if (selectedEffect === 'wave-plane') {
      const ws = s as Required<WavePlaneEffectProps>;
      return `<WavePlaneEffect preset="${p}" color1="${ws.color1}" color2="${ws.color2}" speed={${ws.speed.toFixed(2)}} amplitude={${ws.amplitude.toFixed(2)}} frequency={${ws.frequency.toFixed(1)}} />`;
    }

    if (selectedEffect === 'plasma') {
      const ps = s as Required<PlasmaEffectProps>;
      return `<PlasmaEffect preset="${p}" color1="${ps.color1}" color2="${ps.color2}" speed={${ps.speed.toFixed(2)}} complexity={${ps.complexity}} />`;
    }

    if (selectedEffect === 'geometric') {
      const gs = s as Required<GeometricEffectProps>;
      return `<GeometricEffect preset="${p}" color1="${gs.color1}" color2="${gs.color2}" speed={${gs.speed.toFixed(2)}} glow={${gs.glow.toFixed(2)}} />`;
    }

    const as = s as Required<AuroraEffectProps>;
    return `<AuroraEffect preset="${p}" color1="${as.color1}" color2="${as.color2}" speed={${as.speed.toFixed(2)}} intensity={${as.intensity.toFixed(2)}} />`;
  }, [current, selectedEffect]);

  function renderEffectTabs() {
    return (
      <div className="effect-switcher" aria-label="Effect selection">
        {effectIds.map((effectId) => {
          const effect = effectRegistry[effectId];

          return (
            <button
              key={effectId}
              type="button"
              aria-pressed={selectedEffect === effectId}
              onClick={() => setSelectedEffect(effectId)}
            >
              <span>{effect.shortLabel}</span>
              <small>{effect.presetCount} presets</small>
            </button>
          );
        })}
      </div>
    );
  }

  function renderPresetGrid() {
    const config = presetConfig[selectedEffect];
    const effectPresets = config.presets;

    return config.ids.map((presetId) => {
      const preset = effectPresets[presetId];
      const isActive = presetId === current.preset;
      const background =
        config.swatch === 'radial'
          ? `radial-gradient(circle, ${preset.color1}, ${preset.color2} 42%, transparent 72%)`
          : `linear-gradient(135deg, ${preset.color1}, ${preset.color2} 55%, ${preset.color3 ?? preset.color1})`;

      return (
        <button
          key={presetId}
          type="button"
          className="preset-button"
          aria-pressed={isActive}
          onClick={() => setCurrentPreset(presetId)}
        >
          <span
            className={`preset-swatch${config.swatch === 'radial' ? ' star-swatch' : ''}`}
            style={{ background }}
          />
          <span>{preset.label}</span>
        </button>
      );
    });
  }

  function renderControls() {
    const controls = controlConfig[selectedEffect];
    const s = current.settings as unknown as Record<string, number>;

    return (
      <ControlPanel label={`${activeEffect.label} controls`}>
        {controls.map(({ label, key, min, max, step }) => (
          <RangeControl
            key={key}
            label={label}
            min={min}
            max={max}
            step={step}
            value={s[key]}
            onChange={(value) => setCurrentSetting(key, value)}
          />
        ))}
      </ControlPanel>
    );
  }

  return (
    <main id="top" className="app-shell">
      <HeroExperience
        activeEffect={activeEffect}
        effectIds={effectIds}
        selectedEffect={selectedEffect}
        totalPresetCount={totalPresetCount}
        visual={
          <VisualCanvas className="hero-visual" label="Featured WebGL effect">
            {activeVisual}
          </VisualCanvas>
        }
        onSelectEffect={setSelectedEffect}
      />

      <EffectsGallery
        effectIds={effectIds}
        selectedEffect={selectedEffect}
        onSelectEffect={setSelectedEffect}
      />

      <EffectPlayground
        activeEffect={activeEffect}
        activePresetLabel={activePreset.label}
        activePresetConcept={activePreset.concept}
        controls={renderControls()}
        effectTabs={renderEffectTabs()}
        metricsToggle={
          <button
            type="button"
            className="metrics-toggle"
            aria-pressed={showMetrics}
            onClick={toggleMetrics}
          >
            {showMetrics ? 'Hide' : 'Show'} FPS
          </button>
        }
        presets={renderPresetGrid()}
        snippet={snippet}
        visual={
          <VisualCanvas className="playground-canvas" label="Interactive effect preview">
            {activeVisual}
          </VisualCanvas>
        }
      />

      <DeveloperHandOff effectIds={effectIds} />
      <ProjectRoadmap />
    </main>
  );
}
