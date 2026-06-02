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
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

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

const STORAGE_KEY_CUSTOM = 'nebula:customPresets';

interface CustomPresetEntry {
  label: string;
  effectId: EffectId;
  preset: string;
  settings: Record<string, number | string>;
}

function loadCustomPresets(): Record<string, CustomPresetEntry> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CUSTOM);
    return raw ? (JSON.parse(raw) as Record<string, CustomPresetEntry>) : {};
  } catch {
    return {};
  }
}

function saveCustomPresets(presets: Record<string, CustomPresetEntry>) {
  try {
    localStorage.setItem(STORAGE_KEY_CUSTOM, JSON.stringify(presets));
  } catch {
    /* storage full or unavailable */
  }
}

export function App() {
  const [selectedEffect, setSelectedEffect] = useState<EffectId>('aurora');
  const [effects, setEffects] = useState(initialEffectsState);
  const [showMetrics, toggleMetrics] = usePerformanceToggle();
  const [fading, setFading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [customPresets, setCustomPresets] = useState(loadCustomPresets);
  const [savingName, setSavingName] = useState('');
  const prevEffectRef = useRef(selectedEffect);

  useEffect(() => {
    if (prevEffectRef.current !== selectedEffect) {
      setFading(true);
      const timer = setTimeout(() => setFading(false), 280);
      prevEffectRef.current = selectedEffect;
      return () => clearTimeout(timer);
    }
  }, [selectedEffect]);

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
    const filtered = effectIds.filter((effectId) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      const e = effectRegistry[effectId];
      return (
        e.label.toLowerCase().includes(q) ||
        e.shortLabel.toLowerCase().includes(q) ||
        e.concept.toLowerCase().includes(q) ||
        e.technique.toLowerCase().includes(q) ||
        e.tagline.toLowerCase().includes(q)
      );
    });

    return (
      <>
        <input
          type="search"
          className="effect-search"
          placeholder="Filter effects…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search effects"
        />
        <div className="effect-switcher" aria-label="Effect selection">
          {filtered.map((effectId) => {
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
      </>
    );
  }

  function renderPresetGrid() {
    const config = presetConfig[selectedEffect];
    const effectPresets = config.presets;
    const customForEffect = Object.entries(customPresets).filter(
      ([, cp]) => cp.effectId === selectedEffect,
    );

    const handleSaveCustom = () => {
      const label = savingName.trim() || `Custom ${Date.now() % 10000}`;
      const id = `custom:${selectedEffect}:${label}`;
      const s = current.settings as unknown as Record<string, number | string>;
      const serialized: Record<string, number | string> = {};
      for (const control of controlConfig[selectedEffect]) {
        const v = s[control.key];
        if (v !== undefined) serialized[control.key] = v;
      }

      const updated = {
        ...customPresets,
        [id]: { label, effectId: selectedEffect, preset: current.preset, settings: serialized },
      };
      setCustomPresets(updated);
      saveCustomPresets(updated);
      setSavingName('');
    };

    const handleDeleteCustom = (id: string) => {
      const updated = { ...customPresets };
      delete updated[id];
      setCustomPresets(updated);
      saveCustomPresets(updated);
    };

    return (
      <>
        {config.ids.map((presetId) => {
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
        })}
        {customForEffect.map(([id, cp]) => {
          const isActive = id === current.preset;
          return (
            <div key={id} className="preset-button preset-button--custom">
              <button
                type="button"
                className="preset-button-inner"
                aria-pressed={isActive}
                onClick={() => {
                  setCurrentPreset(id);
                  setEffects((prev) => ({
                    ...prev,
                    [selectedEffect]: { preset: id as never, settings: cp.settings as never },
                  }));
                }}
              >
                <span className="preset-swatch preset-swatch--custom">★</span>
                <span>{cp.label}</span>
              </button>
              <button
                type="button"
                className="preset-delete"
                aria-label={`Delete ${cp.label}`}
                onClick={() => handleDeleteCustom(id)}
              >
                ×
              </button>
            </div>
          );
        })}
        <div className="preset-save-row">
          <input
            type="text"
            className="preset-save-input"
            placeholder="Save current as…"
            value={savingName}
            onChange={(e) => setSavingName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSaveCustom();
            }}
          />
          <button type="button" className="preset-save-btn" onClick={handleSaveCustom}>
            Save
          </button>
        </div>
      </>
    );
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
          <VisualCanvas className="hero-visual" fading={fading} label="Featured WebGL effect">
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
          <VisualCanvas
            className="playground-canvas"
            fading={fading}
            label="Interactive effect preview"
          >
            {activeVisual}
          </VisualCanvas>
        }
      />

      <DeveloperHandOff effectIds={effectIds} />
      <ProjectRoadmap />
    </main>
  );
}
