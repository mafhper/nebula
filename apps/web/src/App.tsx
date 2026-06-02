import {
  AuroraEffect,
  type AuroraEffectProps,
  type AuroraPresetId,
  auroraPresets,
  FluidGradientEffect,
  type FluidGradientEffectProps,
  type FluidGradientPresetId,
  fluidGradientPresets,
  StarfieldEffect,
  type StarfieldEffectProps,
  type StarfieldPresetId,
  starfieldPresets,
} from '@nebula/effects';
import { useCallback, useMemo, useState } from 'react';

import { ControlPanel } from './components/ControlPanel';
import { DeveloperHandOff } from './components/DeveloperHandOff';
import { EffectPlayground } from './components/EffectPlayground';
import { EffectsGallery } from './components/EffectsGallery';
import { HeroExperience } from './components/HeroExperience';
import { ProjectRoadmap } from './components/ProjectRoadmap';
import { RangeControl } from './components/RangeControl';
import { VisualCanvas } from './components/VisualCanvas';
import {
  auroraPresetIds,
  type EffectId,
  effectIds,
  effectRegistry,
  fluidPresetIds,
  starfieldPresetIds,
  totalPresetCount,
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
  starfield: { ids: starfieldPresetIds, presets: starfieldPresets, swatch: 'radial' },
};

const effectComponents = {
  aurora: AuroraEffect,
  'fluid-gradient': FluidGradientEffect,
  starfield: StarfieldEffect,
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
  starfield: [
    { label: 'Speed', key: 'speed', min: 0, max: 1.2, step: 0.01 },
    { label: 'Density', key: 'density', min: 300, max: 1800, step: 50 },
    { label: 'Depth', key: 'depth', min: 8, max: 32, step: 1 },
    { label: 'Point size', key: 'pointSize', min: 8, max: 28, step: 1 },
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

type EffectState = {
  preset: AuroraPresetId | FluidGradientPresetId | StarfieldPresetId;
  settings: Required<AuroraEffectProps | FluidGradientEffectProps | StarfieldEffectProps>;
};

function initialEffectsState(): Record<EffectId, EffectState> {
  return {
    aurora: { preset: 'polar' as const, settings: auroraToSettings('polar') },
    'fluid-gradient': { preset: 'prism' as const, settings: fluidToSettings('prism') },
    starfield: { preset: 'cruise' as const, settings: starfieldToSettings('cruise') },
  };
}

export function App() {
  const [selectedEffect, setSelectedEffect] = useState<EffectId>('aurora');
  const [effects, setEffects] = useState(initialEffectsState);

  const current = effects[selectedEffect];

  const setCurrentPreset = useCallback(
    (presetId: string) => {
      const id = selectedEffect;
      const toSettings =
        id === 'aurora'
          ? auroraToSettings
          : id === 'fluid-gradient'
            ? fluidToSettings
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
    <EffectComponent {...(current.settings as unknown as Record<string, unknown>)} />
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
