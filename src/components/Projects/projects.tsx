interface Project {
  badge:       string;
  name:        string;
  description: string;
  stack:       string;
  is_wip:      boolean;
}

export default function Projects({ data }: { data: Project[] }) {
  return (
    <div className="project-grid">
      {data.map((project, i) => (
        <div className="project-card reveal" key={i}>
          <div className="project-header">
            <span className={`project-badge ${project.is_wip ? 'wip' : ''}`}>
              {project.badge}
            </span>
          </div>
          <div className="project-name">{project.name}</div>
          <p className="project-desc">{project.description}</p>
          <div className="stack-chips">
            {project.stack.split(',').map((tech, j) => (
              <span className="chip" key={j}>{tech.trim()}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}