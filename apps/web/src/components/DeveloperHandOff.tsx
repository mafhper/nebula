import { type EffectId, effectRegistry } from '../effectRegistry';

interface DeveloperHandOffProps {
  effectIds: EffectId[];
}

export function DeveloperHandOff({ effectIds }: DeveloperHandOffProps) {
  return (
    <section id="learn" className="project-section developer-section">
      <div className="section-heading">
        <p className="section-kicker">Developer hand-off</p>
        <h2>The demo maps directly to implementation files.</h2>
        <p>
          The page should teach by proximity: the visible effect, the chosen props and the source
          location stay close enough for a developer to move from exploration to code.
        </p>
      </div>

      <div className="developer-grid">
        <div className="install-panel">
          <p>Usage now</p>
          <pre>{`import { AuroraEffect } from '@nebula/effects/aurora';

<Canvas>
  <AuroraEffect speed={0.32} intensity={1.08} />
</Canvas>`}</pre>
          <span>Examples currently point at the workspace package shape used by the demo.</span>

          <div className="npm-plan" aria-label="Planned npm package">
            <span>Future package</span>
            <strong>@nebula/effects</strong>
            <p>
              The project is being shaped to become an npm package after the API, presets,
              versioning and release gates are stable enough for external use.
            </p>
          </div>
        </div>

        <div className="developer-notes">
          <div className="handoff-points" aria-label="Implementation notes">
            <p>Implementation model</p>
            <ul>
              <li>Each effect owns a component, preset adapter and shader/material boundary.</li>
              <li>The playground exposes only stable numeric controls for quick comparison.</li>
              <li>Visual tests sample canvas pixels before any release branch is merged.</li>
            </ul>
          </div>

          <div className="source-directory" aria-label="Effect source locations">
            <p>Source directory</p>
            <div>
              <span>Component</span>
              <span>Path</span>
            </div>
            {effectIds.map((effectId) => {
              const effect = effectRegistry[effectId];

              return (
                <a
                  key={effect.id}
                  href={`https://github.com/mafhper/nebula/tree/main/${effect.githubPath}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <strong>{effect.componentName}</strong>
                  <code>{effect.githubPath}</code>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
