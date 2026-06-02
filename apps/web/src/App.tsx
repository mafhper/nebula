import {
  auroraPresets,
  fluidGradientPresets,
  geometricPresets,
  lavaLampPresets,
  particleGalaxyPresets,
  plasmaPresets,
  starfieldPresets,
  vortexPresets,
  wavePlanePresets,
} from '@nebula/effects';
import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';

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
  lavaLampPresetIds,
  particleGalaxyPresetIds,
  plasmaPresetIds,
  starfieldPresetIds,
  totalPresetCount,
  vortexPresetIds,
  wavePlanePresetIds,
} from './effectRegistry';
import { effectSettingsMap } from './effectSettings';

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
  'lava-lamp': { ids: lavaLampPresetIds, presets: lavaLampPresets, swatch: 'radial' },
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

const effectComponents: Record<
  string,
  React.LazyExoticComponent<React.ComponentType<Record<string, unknown>>>
> = {
  aurora: lazy(() => import('@nebula/effects/aurora').then((m) => ({ default: m.AuroraEffect }))),
  'fluid-gradient': lazy(() =>
    import('@nebula/effects/fluid-gradient').then((m) => ({ default: m.FluidGradientEffect })),
  ),
  geometric: lazy(() =>
    import('@nebula/effects/geometric').then((m) => ({ default: m.GeometricEffect })),
  ),
  'lava-lamp': lazy(() =>
    import('@nebula/effects/lava-lamp').then((m) => ({ default: m.LavaLampEffect })),
  ),
  'particle-galaxy': lazy(() =>
    import('@nebula/effects/particle-galaxy').then((m) => ({ default: m.ParticleGalaxyEffect })),
  ),
  plasma: lazy(() => import('@nebula/effects/plasma').then((m) => ({ default: m.PlasmaEffect }))),
  starfield: lazy(() =>
    import('@nebula/effects/starfield').then((m) => ({ default: m.StarfieldEffect })),
  ),
  vortex: lazy(() => import('@nebula/effects/vortex').then((m) => ({ default: m.VortexEffect }))),
  'wave-plane': lazy(() =>
    import('@nebula/effects/wave-plane').then((m) => ({ default: m.WavePlaneEffect })),
  ),
};

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
  'lava-lamp': [
    { label: 'Speed', key: 'speed', min: 0, max: 1.2, step: 0.01 },
    { label: 'Intensity', key: 'intensity', min: 0, max: 2, step: 0.01 },
    { label: 'Blobs', key: 'blobCount', min: 3, max: 8, step: 1 },
    { label: 'Scale', key: 'scale', min: 0.4, max: 2, step: 0.1 },
    { label: 'Glow', key: 'glow', min: 0, max: 1.5, step: 0.01 },
  ],
};

type EffectState = {
  preset: string;
  settings: Record<string, unknown>;
};

function initialEffectsState(): Record<EffectId, EffectState> {
  return {
    aurora: { preset: 'polar', settings: effectSettingsMap.aurora.toSettings('polar') },
    'fluid-gradient': {
      preset: 'prism',
      settings: effectSettingsMap['fluid-gradient'].toSettings('prism'),
    },
    'particle-galaxy': {
      preset: 'nebula',
      settings: effectSettingsMap['particle-galaxy'].toSettings('nebula'),
    },
    starfield: { preset: 'cruise', settings: effectSettingsMap.starfield.toSettings('cruise') },
    vortex: { preset: 'whirlpool', settings: effectSettingsMap.vortex.toSettings('whirlpool') },
    'wave-plane': {
      preset: 'ocean',
      settings: effectSettingsMap['wave-plane'].toSettings('ocean'),
    },
    plasma: { preset: 'nebula', settings: effectSettingsMap.plasma.toSettings('nebula') },
    geometric: {
      preset: 'nebulaKnot',
      settings: effectSettingsMap.geometric.toSettings('nebulaKnot'),
    },
    'lava-lamp': {
      preset: 'retro',
      settings: effectSettingsMap['lava-lamp'].toSettings('retro'),
    },
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
      const adapter = effectSettingsMap[id];
      setEffects((prev) => ({
        ...prev,
        [id]: { preset: presetId, settings: adapter.toSettings(presetId) },
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
    <Suspense fallback={null}>
      <EffectComponent {...current.settings} />
      {showMetrics && <PerformanceMetrics />}
    </Suspense>
  );

  const snippet = useMemo(() => {
    const adapter = effectSettingsMap[selectedEffect];
    return adapter.toSnippet(current.preset, current.settings);
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
                    [selectedEffect]: { preset: id, settings: cp.settings },
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
