import { effectRegistry, type EffectId } from '../effectRegistry';

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
          The public page should help visitors evaluate the visual result first, then understand the
          rendering concept and where the source lives.
        </p>
      </div>

      <div className="developer-grid">
        <div className="install-panel">
          <p>Current usage shape</p>
          <pre>{`import { AuroraEffect } from '@nebula/effects';\n\n<Canvas>\n  <AuroraEffect speed={0.32} intensity={1.08} />\n</Canvas>`}</pre>
          <span>
            Package publishing is intentionally not promised before versioning is decided.
          </span>
        </div>

        <div className="source-list" aria-label="Effect source locations">
          {effectIds.map((effectId) => {
            const effect = effectRegistry[effectId];

            return (
              <article key={effect.id}>
                <span>{effect.componentName}</span>
                <h3>{effect.label}</h3>
                <p>{effect.technique}</p>
                <code>{effect.githubPath}</code>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
