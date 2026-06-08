import { architecture, effectRoadmap } from '../effectRegistry';

export function ProjectRoadmap() {
  return (
    <section id="roadmap" className="project-section roadmap-section">
      <div className="section-heading">
        <p className="section-kicker">Roadmap</p>
        <h2>Grow the library without turning it into a grab bag.</h2>
        <p>
          New effects only belong here when they add a distinct rendering behavior, usable presets
          and repeatable validation.
        </p>
      </div>

      <div className="quality-flow" aria-label="Release quality flow">
        {architecture.map((step) => (
          <span key={step}>{step}</span>
        ))}
      </div>

      <div className="roadmap-list">
        {effectRoadmap.map((effect, index) => (
          <article key={effect.name} className="roadmap-card">
            <span className="roadmap-num">{String(index + 1).padStart(2, '0')}</span>
            <h3>{effect.name}</h3>
            <p>{effect.concept}</p>
            <span className="status-badge" data-status={effect.status.toLowerCase()}>
              {effect.status}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
