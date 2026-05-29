import { architecture, effectRoadmap, milestones } from '../effectRegistry';

export function ProjectRoadmap() {
  return (
    <section id="roadmap" className="project-section roadmap-section">
      <div className="section-heading">
        <p className="section-kicker">Roadmap</p>
        <h2>Quality gates before more effects.</h2>
        <p>
          Nebula stays useful by keeping the catalog small, documented and visually distinct.
          Contribution details live below the product experience, where contributors expect them.
        </p>
      </div>

      <div className="milestone-grid">
        {milestones.map((milestone) => (
          <article key={milestone.title} className="milestone-card">
            <div>
              <span>{milestone.status}</span>
              <h3>{milestone.title}</h3>
            </div>
            <ul>
              {milestone.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
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
