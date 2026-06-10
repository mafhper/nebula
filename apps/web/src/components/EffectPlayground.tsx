import type { ReactNode } from 'react';

import type { EffectMeta } from '../effectRegistry';
import { SnippetPanel } from './SnippetPanel';

interface EffectPlaygroundProps {
  activeEffect: EffectMeta;
  activePresetLabel: string;
  activePresetConcept: string;
  controls: ReactNode;
  effectTabs: ReactNode;
  metricsToggle: ReactNode;
  presets: ReactNode;
  colors: ReactNode;
  snippet: string;
  visual: ReactNode;
}

export function EffectPlayground({
  activeEffect,
  activePresetLabel,
  activePresetConcept,
  controls,
  effectTabs,
  metricsToggle,
  presets,
  colors,
  snippet,
  visual,
}: EffectPlaygroundProps) {
  return (
    <section id="playground" className="project-section playground-section">
      <div className="playground-intro">
        <div className="section-heading">
          <p className="section-kicker">Playground</p>
          <h2>Tune the effect, then take the component.</h2>
          <p>
            Use this space as the first hands-on moment: choose an effect, test presets, adjust the
            motion and copy a React-ready snippet.
          </p>
        </div>

        <div className="studio-summary" aria-label="Current playground selection">
          <span>{activeEffect.status}</span>
          <strong>{activeEffect.label}</strong>
          <p>{activePresetLabel}</p>
        </div>
      </div>

      <div className="studio-flow" aria-label="Playground workflow">
        <span>1. Select effect</span>
        <span>2. Try presets</span>
        <span>3. Tune motion</span>
        <span>4. Copy component</span>
      </div>

      <div className="playground-layout">
        <div className="playground-stage">
          <div className="playground-visual">
            <div className="stage-toolbar">
              <div>
                <p>{activeEffect.tagline}</p>
                <h3>{activeEffect.label}</h3>
              </div>
              {metricsToggle}
            </div>
            {visual}
          </div>
        </div>

        <aside className="control-deck" aria-label="Effects, presets and controls">
          <div className="control-deck-scroll">
            <div className="effect-selector-block">
              <div className="deck-header">
                <div>
                  <p>Effect</p>
                  <strong className="deck-title">{activeEffect.label}</strong>
                </div>
                <span className="status-badge" data-status={activeEffect.status.toLowerCase()}>
                  {activeEffect.status}
                </span>
              </div>
              {effectTabs}
              <p className="preset-description">{activePresetConcept || activeEffect.concept}</p>
            </div>

            <div className="deck-block">
              <p className="deck-label">
                <span>Presets</span>
                <span className="deck-label-hint">{activePresetLabel}</span>
              </p>
              <div className="preset-grid" aria-label="Preset selection">
                {presets}
              </div>
            </div>

            <div className="deck-block">
              <p className="deck-label">Colors</p>
              {colors}
            </div>

            <div className="deck-block">
              <p className="deck-label">Motion</p>
              {controls}
            </div>

            <div className="deck-block">
              <SnippetPanel snippet={snippet} />
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
