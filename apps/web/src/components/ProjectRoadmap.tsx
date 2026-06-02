import { architecture, effectRoadmap } from '../effectRegistry';

export function ProjectRoadmap() {
  return (
    <section id="roadmap" className="project-section roadmap-section">
      <div className="section-heading">
        <p className="section-kicker">Roadmap</p>
        <h2>Quality gates before more effects.</h2>
        <p>A small, documented and visually distinct catalog — not a quantity play.</p>
      </div>

      <div className="roadmap-list">
        {effectRoadmap.map((effect, index) => (
          <article key={effect.name} className="roadmap-row">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{effect.name}</h3>
            <p>{effect.concept}</p>
            <strong>{effect.status}</strong>
          </article>
        ))}
      </div>

      <div className="architecture-flow">
        {architecture.map((step) => (
          <div key={step}>{step}</div>
        ))}
      </div>
    </section>
  );
}
