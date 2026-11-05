import type { CSSProperties } from 'react';
import type { ExperienceItem } from '../../hooks/usePortfolioData';

interface ExperienceProps {
  experiences: ExperienceItem[];
}

export default function Experience({ experiences }: ExperienceProps) {
  return (
    <section className="section section-alt" id="experience">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="sec-num mono">04&nbsp;/</span>
          <h2>EXPERIENCE</h2>
        </div>

        <ol className="timeline">
          {experiences.map((exp, idx) => (
            <li
              key={idx}
              className="reveal"
              style={{ '--d': `${idx * 0.08}s` } as CSSProperties}
            >
              <div
                className={`tl-node ${exp.isCurrent ? 'now' : ''}`}
                aria-hidden="true"
              />
              <div className="tl-card">
                <div className="tl-top">
                  <div>
                    <h3>{exp.role}</h3>
                    <p className="tl-co">{exp.company}</p>
                  </div>
                  <span className={`period mono ${exp.isCurrent ? 'now' : ''}`}>
                    {exp.period}
                  </span>
                </div>
                <ul className="tl-points">
                  {exp.points.map((pt, pIdx) => (
                    <li key={pIdx}>{pt}</li>
                  ))}
                </ul>
                <ul className="tags">
                  {exp.tags.map((tag, tIdx) => (
                    <li key={tIdx}>{tag}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
