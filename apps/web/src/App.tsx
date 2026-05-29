import { useMemo, useState } from 'react';
import {
  AuroraEffect,
  FluidGradientEffect,
  StarfieldEffect,
  auroraPresets,
  fluidGradientPresets,
  starfieldPresets,
  type AuroraEffectProps,
  type AuroraPresetId,
  type FluidGradientEffectProps,
  type FluidGradientPresetId,
  type StarfieldEffectProps,
  type StarfieldPresetId,
} from '@nebula/effects';
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
  effectIds,
  effectRegistry,
  fluidPresetIds,
  starfieldPresetIds,
  totalPresetCount,
  type EffectId,
} from './effectRegistry';

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

export function App() {
  const [selectedEffect, setSelectedEffect] = useState<EffectId>('aurora');
  const [auroraPreset, setAuroraPreset] = useState<AuroraPresetId>('polar');
  const [fluidPreset, setFluidPreset] = useState<FluidGradientPresetId>('prism');
  const [starfieldPreset, setStarfieldPreset] = useState<StarfieldPresetId>('cruise');
  const [auroraSettings, setAuroraSettings] = useState<Required<AuroraEffectProps>>(() =>
    auroraToSettings('polar'),
  );
  const [fluidSettings, setFluidSettings] = useState<Required<FluidGradientEffectProps>>(() =>
    fluidToSettings('prism'),
  );
  const [starfieldSettings, setStarfieldSettings] = useState<Required<StarfieldEffectProps>>(() =>
    starfieldToSettings('cruise'),
  );

  const activeEffect = effectRegistry[selectedEffect];
  const activePreset = getActivePreset();
  const activeVisual = renderEffect();

  const snippet = useMemo(() => {
    if (selectedEffect === 'fluid-gradient') {
      return `<FluidGradientEffect preset="${fluidPreset}" color1="${fluidSettings.color1}" color2="${fluidSettings.color2}" speed={${fluidSettings.speed.toFixed(2)}} intensity={${fluidSettings.intensity.toFixed(2)}} />`;
    }

    if (selectedEffect === 'starfield') {
      return `<StarfieldEffect preset="${starfieldPreset}" density={${starfieldSettings.density}} speed={${starfieldSettings.speed.toFixed(2)}} pointSize={${starfieldSettings.pointSize}} />`;
    }

    return `<AuroraEffect preset="${auroraPreset}" color1="${auroraSettings.color1}" color2="${auroraSettings.color2}" speed={${auroraSettings.speed.toFixed(2)}} intensity={${auroraSettings.intensity.toFixed(2)}} />`;
  }, [
    auroraPreset,
    auroraSettings.color1,
    auroraSettings.color2,
    auroraSettings.intensity,
    auroraSettings.speed,
    fluidPreset,
    fluidSettings.color1,
    fluidSettings.color2,
    fluidSettings.intensity,
    fluidSettings.speed,
    selectedEffect,
    starfieldPreset,
    starfieldSettings.density,
    starfieldSettings.pointSize,
    starfieldSettings.speed,
  ]);

  function getActivePreset() {
    if (selectedEffect === 'fluid-gradient') {
      return fluidGradientPresets[fluidPreset];
    }

    if (selectedEffect === 'starfield') {
      return starfieldPresets[starfieldPreset];
    }

    return auroraPresets[auroraPreset];
  }

  function renderEffect() {
    if (selectedEffect === 'fluid-gradient') {
      return <FluidGradientEffect {...fluidSettings} />;
    }

    if (selectedEffect === 'starfield') {
      return <StarfieldEffect {...starfieldSettings} />;
    }

    return <AuroraEffect {...auroraSettings} />;
  }

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
    if (selectedEffect === 'fluid-gradient') {
      return fluidPresetIds.map((presetId) => {
        const preset = fluidGradientPresets[presetId];

        return (
          <button
            key={presetId}
            type="button"
            className="preset-button"
            aria-pressed={presetId === fluidPreset}
            onClick={() => {
              setFluidPreset(presetId);
              setFluidSettings(fluidToSettings(presetId));
            }}
          >
            <span
              className="preset-swatch"
              style={{
                background: `linear-gradient(135deg, ${preset.color1}, ${preset.color2} 55%, ${preset.color3})`,
              }}
            />
            <span>{preset.label}</span>
          </button>
        );
      });
    }

    if (selectedEffect === 'starfield') {
      return starfieldPresetIds.map((presetId) => {
        const preset = starfieldPresets[presetId];

        return (
          <button
            key={presetId}
            type="button"
            className="preset-button"
            aria-pressed={presetId === starfieldPreset}
            onClick={() => {
              setStarfieldPreset(presetId);
              setStarfieldSettings(starfieldToSettings(presetId));
            }}
          >
            <span
              className="preset-swatch star-swatch"
              style={{
                background: `radial-gradient(circle, ${preset.color1}, ${preset.color2} 42%, transparent 72%)`,
              }}
            />
            <span>{preset.label}</span>
          </button>
        );
      });
    }

    return auroraPresetIds.map((presetId) => {
      const preset = auroraPresets[presetId];

      return (
        <button
          key={presetId}
          type="button"
          className="preset-button"
          aria-pressed={presetId === auroraPreset}
          onClick={() => {
            setAuroraPreset(presetId);
            setAuroraSettings(auroraToSettings(presetId));
          }}
        >
          <span
            className="preset-swatch"
            style={{
              background: `linear-gradient(135deg, ${preset.color1}, ${preset.color2} 55%, ${preset.color3})`,
            }}
          />
          <span>{preset.label}</span>
        </button>
      );
    });
  }

  function renderControls() {
    if (selectedEffect === 'fluid-gradient') {
      return (
        <ControlPanel label="Fluid Gradient controls">
          <RangeControl
            label="Speed"
            min={0}
            max={1.2}
            step={0.01}
            value={fluidSettings.speed}
            onChange={(value) => setFluidSettings((current) => ({ ...current, speed: value }))}
          />
          <RangeControl
            label="Intensity"
            min={0}
            max={1.8}
            step={0.01}
            value={fluidSettings.intensity}
            onChange={(value) => setFluidSettings((current) => ({ ...current, intensity: value }))}
          />
          <RangeControl
            label="Scale"
            min={0.5}
            max={2}
            step={0.01}
            value={fluidSettings.scale}
            onChange={(value) => setFluidSettings((current) => ({ ...current, scale: value }))}
          />
          <RangeControl
            label="Distortion"
            min={0}
            max={1.2}
            step={0.01}
            value={fluidSettings.distortion}
            onChange={(value) => setFluidSettings((current) => ({ ...current, distortion: value }))}
          />
        </ControlPanel>
      );
    }

    if (selectedEffect === 'starfield') {
      return (
        <ControlPanel label="Starfield controls">
          <RangeControl
            label="Speed"
            min={0}
            max={1.2}
            step={0.01}
            value={starfieldSettings.speed}
            onChange={(value) => setStarfieldSettings((current) => ({ ...current, speed: value }))}
          />
          <RangeControl
            label="Density"
            min={300}
            max={1800}
            step={50}
            value={starfieldSettings.density}
            onChange={(value) =>
              setStarfieldSettings((current) => ({ ...current, density: value }))
            }
          />
          <RangeControl
            label="Depth"
            min={8}
            max={32}
            step={1}
            value={starfieldSettings.depth}
            onChange={(value) => setStarfieldSettings((current) => ({ ...current, depth: value }))}
          />
          <RangeControl
            label="Point size"
            min={8}
            max={28}
            step={1}
            value={starfieldSettings.pointSize}
            onChange={(value) =>
              setStarfieldSettings((current) => ({ ...current, pointSize: value }))
            }
          />
        </ControlPanel>
      );
    }

    return (
      <ControlPanel label="Aurora controls">
        <RangeControl
          label="Speed"
          min={0}
          max={1.5}
          step={0.01}
          value={auroraSettings.speed}
          onChange={(value) => setAuroraSettings((current) => ({ ...current, speed: value }))}
        />
        <RangeControl
          label="Intensity"
          min={0}
          max={1.8}
          step={0.01}
          value={auroraSettings.intensity}
          onChange={(value) => setAuroraSettings((current) => ({ ...current, intensity: value }))}
        />
        <RangeControl
          label="Bands"
          min={0.4}
          max={2.2}
          step={0.01}
          value={auroraSettings.bandScale}
          onChange={(value) => setAuroraSettings((current) => ({ ...current, bandScale: value }))}
        />
        <RangeControl
          label="Distortion"
          min={0}
          max={1.2}
          step={0.01}
          value={auroraSettings.distortion}
          onChange={(value) => setAuroraSettings((current) => ({ ...current, distortion: value }))}
        />
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
