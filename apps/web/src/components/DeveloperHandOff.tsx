import { type EffectId, effectRegistry } from '../effectRegistry';

interface DeveloperHandOffProps {
  effectIds: EffectId[];
}

export function DeveloperHandOff({ effectIds }: DeveloperHandOffProps) {
  return (
    <section id="learn" className="project-section developer-section">
      <div className="section-heading">
        <p className="section-kicker">Developer hand-off</p>
        <h2>Built as components, documented as rendering lessons.</h2>
        <p>
          Each effect is a React component with typed props, curated presets and a clear rendering
          concept.
        </p>
      </div>

      <div className="developer-grid">
        <div className="install-panel">
          <p>Usage</p>
          <pre>{`import { AuroraEffect } from '@nebula/effects/aurora';

<Canvas>
  <AuroraEffect speed={0.32} intensity={1.08} />
</Canvas>`}</pre>
          <span>
            Package publishing is intentionally not promised before versioning is decided.
          </span>
        </div>

        <div className="source-grid" aria-label="Effect source locations">
          {effectIds.map((effectId) => {
            const effect = effectRegistry[effectId];

            return (
              <article key={effect.id} className="source-card">
                <span>{effect.componentName}</span>
                <h3>{effect.label}</h3>
                <code>{effect.githubPath}</code>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
