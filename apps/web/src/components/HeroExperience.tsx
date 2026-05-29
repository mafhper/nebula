import type { ReactNode } from 'react';
import { effectRegistry, type EffectId, type EffectMeta } from '../effectRegistry';

interface HeroExperienceProps {
  activeEffect: EffectMeta;
  effectIds: EffectId[];
  selectedEffect: EffectId;
  totalPresetCount: number;
  visual: ReactNode;
  onSelectEffect: (effectId: EffectId) => void;
}

export function HeroExperience({
  activeEffect,
  effectIds,
  selectedEffect,
  totalPresetCount,
  visual,
  onSelectEffect,
}: HeroExperienceProps) {
  return (
    <section className="hero-section" aria-label="Nebula introduction">
      {visual}

      <div className="site-nav" aria-label="Primary navigation">
        <a href="#top" className="brand-mark">
          Nebula
        </a>
        <nav>
          <a href="#effects">Effects</a>
          <a href="#playground">Playground</a>
          <a href="#learn">Learn</a>
          <a href="https://github.com/mafhper/nebula" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </nav>
      </div>

      <div className="hero-content">
        <div className="hero-copy">
          <p className="product-kicker">Shader-first visual library</p>
          <h1>WebGL effects for React interfaces.</h1>
          <p>
            Nebula is an open-source collection of polished GPU effects that can be explored, tuned
            and reused as React components.
          </p>

          <div className="hero-status" aria-label="Project facts">
            <span>{effectIds.length} active effects</span>
            <span>{totalPresetCount} curated presets</span>
            <span>React + R3F + GLSL</span>
          </div>

          <div className="hero-actions" aria-label="Primary actions">
            <a href="#effects">Explore effects</a>
            <a href="https://github.com/mafhper/nebula" target="_blank" rel="noreferrer">
              View GitHub
            </a>
          </div>
        </div>

        <aside className="hero-effect-panel" aria-label="Featured effect">
          <p>Featured effect</p>
          <h2>{activeEffect.label}</h2>
          <span>{activeEffect.tagline}</span>
          <div className="hero-effect-switcher" aria-label="Change featured effect">
            {effectIds.map((effectId) => {
              const effect = effectRegistry[effectId];

              return (
                <button
                  key={effectId}
                  type="button"
                  aria-pressed={selectedEffect === effectId}
                  onClick={() => onSelectEffect(effectId)}
                >
                  {effect.shortLabel}
                </button>
              );
            })}
          </div>
        </aside>
      </div>
    </section>
  );
}
