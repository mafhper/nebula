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
  snippet,
  visual,
}: EffectPlaygroundProps) {
  return (
    <section id="playground" className="project-section playground-section">
      <div className="section-heading">
        <p className="section-kicker">Playground</p>
        <h2>Tune the effect, then take the component.</h2>
        <p>
          Switch between effects, compare presets and inspect the component shape without leaving
          the page.
        </p>
      </div>

      <div className="playground-layout">
        <div className="playground-visual">{visual}</div>

        <aside className="control-deck" aria-label="Effects, presets and controls">
          {effectTabs}

          <div className="deck-header">
            <div>
              <p>{activeEffect.status}</p>
              <h3>{activeEffect.label}</h3>
            </div>
            <span>{activePresetLabel}</span>
          </div>

          <p className="preset-description">{activeEffect.concept}</p>
          <p className="preset-description compact-description">{activePresetConcept}</p>

          <div className="preset-grid" aria-label="Preset selection">
            {presets}
          </div>

          {controls}

          {metricsToggle}

          <SnippetPanel snippet={snippet} />
        </aside>
      </div>
    </section>
  );
}
