import { type EffectId, effectRegistry } from '../effectRegistry';

interface EffectsGalleryProps {
  effectIds: EffectId[];
  selectedEffect: EffectId;
  onSelectEffect: (effectId: EffectId) => void;
}

export function EffectsGallery({ effectIds, selectedEffect, onSelectEffect }: EffectsGalleryProps) {
  return (
    <section id="effects" className="project-section effects-section">
      <div className="section-heading">
        <p className="section-kicker">Effects</p>
        <h2>Small catalog, high signal.</h2>
        <p>
          Each effect has a distinct rendering idea, curated presets and a component API intended
          for reuse rather than one-off demos.
        </p>
      </div>

      <div className="effect-card-grid">
        {effectIds.map((effectId) => {
          const effect = effectRegistry[effectId];

          return (
            <article
              key={effect.id}
              className="effect-card"
              data-active={selectedEffect === effectId}
            >
              <div>
                <span>{effect.status}</span>
                <h3>{effect.label}</h3>
                <p>{effect.tagline}</p>
              </div>
              <dl>
                <div>
                  <dt>Technique</dt>
                  <dd>{effect.technique}</dd>
                </div>
                <div>
                  <dt>Best for</dt>
                  <dd>{effect.bestFor.join(', ')}</dd>
                </div>
                <div>
                  <dt>Presets</dt>
                  <dd>{effect.presetCount}</dd>
                </div>
              </dl>
              <a href="#playground" onClick={() => onSelectEffect(effectId)}>
                Open {effect.label}
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}
