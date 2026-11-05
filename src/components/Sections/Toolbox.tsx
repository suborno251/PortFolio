import type { CSSProperties } from 'react';
import type { CoreSkill, SkillCategory } from '../../hooks/usePortfolioData';

interface ToolboxProps {
  coreSkills: CoreSkill[];
  categories: SkillCategory[];
}

export default function Toolbox({ coreSkills, categories }: ToolboxProps) {
  return (
    <section className="section section-alt" id="skills">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="sec-num mono">02&nbsp;/</span>
          <h2>THE&nbsp;TOOLBOX</h2>
        </div>
        <p className="sec-sub reveal" style={{ '--d': '.05s' } as CSSProperties}>
          Hover the chips — they get nervous. Bars are a self-assessed comfort level, not a
          LinkedIn skill test.
        </p>

        <div className="skills-grid">
          <div className="card core-card reveal">
            <div className="card-head">
              <h3>CORE STACK</h3>
              <span className="tag mono">DAILY DRIVERS</span>
            </div>
            <div className="bars">
              {coreSkills.map((cs, i) => (
                <div className="bar-row" key={i}>
                  <div className="bar-top">
                    <span>{cs.name}</span>
                    <em className="mono">{cs.pct}%</em>
                  </div>
                  <div className="bar">
                    <i style={{ '--w': `${cs.pct}%` } as CSSProperties} />
                  </div>
                  <small>{cs.subtitle}</small>
                </div>
              ))}
            </div>
          </div>

          {categories.map((cat, idx) => (
            <div
              className="card reveal"
              style={{ '--d': `${0.05 + idx * 0.05}s` } as CSSProperties}
              key={idx}
            >
              <div className="card-head">
                <h3>{cat.title}</h3>
                <span className="mono count">{cat.count}</span>
              </div>
              <div className="chips">
                {cat.skills.map((skill, sIdx) => (
                  <span className="chip" data-cursor key={sIdx}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
