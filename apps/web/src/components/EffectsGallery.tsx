import { type EffectId, effectRegistry } from '../effectRegistry';

interface EffectsGalleryProps {
  effectIds: EffectId[];
  selectedEffect: EffectId;
  onSelectEffect: (effectId: EffectId) => void;
}

const effectLenses: Array<{ label: string; description: string; effects: EffectId[] }> = [
  {
    label: 'Immersive sections',
    description: 'Soft full-bleed motion for landing pages and product moments.',
    effects: ['aurora', 'fluid-gradient', 'particle-galaxy'],
  },
  {
    label: 'Depth and motion',
    description: 'Spatial scenes when the page needs distance, travel or terrain.',
    effects: ['starfield', 'vortex', 'wave-plane'],
  },
  {
    label: 'Abstract systems',
    description: 'Expressive procedural visuals for ambient UI and experiments.',
    effects: ['plasma', 'geometric', 'lava-lamp'],
  },
];

export function EffectsGallery({ effectIds, selectedEffect, onSelectEffect }: EffectsGalleryProps) {
  return (
    <section id="effects" className="project-section effects-section">
      <div className="section-heading">
        <p className="section-kicker">Field guide</p>
        <h2>Choose by visual behavior, not by component name.</h2>
        <p>
          The catalog stays flat so every option is visible, but the labels group effects by the
          decision a designer or developer is likely making.
        </p>
      </div>

      <div className="field-guide-layout">
        <aside className="effect-lenses" aria-label="Effect use cases">
          {effectLenses.map((lens) => (
            <div key={lens.label} className="effect-lens">
              <p>{lens.label}</p>
              <span>{lens.description}</span>
              <div>
                {lens.effects.map((effectId) => {
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
            </div>
          ))}
        </aside>

        <div className="effect-index">
          {effectIds.map((effectId) => {
            const effect = effectRegistry[effectId];

            return (
              <article
                key={effect.id}
                className="effect-row"
                data-active={selectedEffect === effectId}
              >
                <button
                  type="button"
                  className="effect-row-main"
                  aria-pressed={selectedEffect === effectId}
                  onClick={() => onSelectEffect(effectId)}
                >
                  <span>{effect.status}</span>
                  <strong>{effect.label}</strong>
                  <small>{effect.tagline}</small>
                </button>

                <dl className="effect-row-details">
                  <div>
                    <dt>Best fit</dt>
                    <dd>{effect.bestFor.slice(0, 2).join(', ')}</dd>
                  </div>
                  <div>
                    <dt>Rendering idea</dt>
                    <dd>{effect.concept}</dd>
                  </div>
                  <div>
                    <dt>Presets</dt>
                    <dd>{effect.presetCount}</dd>
                  </div>
                </dl>

                <a
                  href="#playground"
                  aria-label={`Open ${effect.label}`}
                  onClick={() => onSelectEffect(effectId)}
                >
                  Open
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
