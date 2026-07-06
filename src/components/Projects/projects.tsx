interface Project {
  badge: string;
  name: string;
  description: string;
  stack: string;
  is_wip: boolean;
  website_link?: string;
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
          {project.website_link === "" ? (
            <div className="project-name">{project.name}</div>
          ) : (
            <a
              href={project.website_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="project-name">{project.name}</div>
            </a>
          )}
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