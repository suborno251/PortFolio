import './App.css'
import { useEffect } from 'react';
import Projects from './components/Projects/projects';
import Contact from './components/Contact/contact';
import { usePortfolioData, type Skill } from './hooks/usePortfolioData';

export default function App() {

  const { projects, skills, experience, bio, loading } = usePortfolioData();

  const skillGroups = skills.reduce((acc: Record<string, Skill[]>, skill: Skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const spy = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          navLinks.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(s => spy.observe(s));

    const reveals = document.querySelectorAll('.reveal');
    const ro = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('on'), i * 60);
          ro.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    reveals.forEach(el => ro.observe(el));

    return () => {
      spy.disconnect();
      ro.disconnect();
    };
  }, []);

  if (loading) return <div style={{ padding: '2rem', fontFamily: 'monospace' }}>Loading...</div>;

  return (
    <>
      {/* NAV */}
      <nav>
        <a href="#hero" className="nav-logo">S<span>.</span>Das</a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section id="hero">
        <p className="hero-eyebrow">// full-stack developer</p>
        <h1 className="hero-name">Suborno Das<span className="cursor">_</span></h1>
        <p className="hero-role">I build things for the web.</p>
        <p className="hero-bio">
          Crafting reliable backends and clean frontends — from Laravel APIs and Node.js services
          to real-time, AI-integrated web apps. Based in West Bengal, India.
        </p>
        <div className="btn-row">
          <a href="#projects" className="btn btn-primary">View Projects</a>
          <a href="#contact" className="btn btn-ghost">Get in Touch</a>
        </div>
        <div className="hero-scroll">
          <span className="scroll-line"></span>
          scroll to explore
        </div>
      </section>

      <hr className="soft" />

      {/* ABOUT */}
      <section id="about">
        <p className="section-eyebrow reveal">01 / about</p>
        <h2 className="section-title reveal">A bit about me</h2>

        <div className="about-grid">
          <div className="about-text reveal">
            {bio.map((b, i) => (
              <div key={i} dangerouslySetInnerHTML={{ __html: b.paragraph }} />
            ))}
          </div>

          <div className="fact-grid reveal">
            <div className="fact-card">
              <div className="fact-label">Location</div>
              <div className="fact-value">West Bengal, India</div>
            </div>
            <div className="fact-card">
              <div className="fact-label">Focus</div>
              <div className="fact-value">Full-Stack Dev</div>
            </div>
            <div className="fact-card">
              <div className="fact-label">Primary Stack</div>
              <div className="fact-value">Laravel · Node.js</div>
            </div>
            <div className="fact-card">
              <div className="fact-label">Status</div>
              <div className="fact-value">Open to roles</div>
            </div>
          </div>
        </div>
      </section>

      <hr className="soft" />

      {/* SKILLS */}
      <section id="skills">
        <p className="section-eyebrow reveal">02 / skills</p>
        <h2 className="section-title reveal">What I work with</h2>

        <div className="skill-groups">
          {Object.entries(skillGroups).map(([category, tags], i) => (
            <div className="reveal" key={i}>
              <div className="skill-group-label">{category}</div>
              <div className="skill-tags">
                {tags.map((skill, j) => (
                  <span className={`tag ${skill.is_learning ? 'learning' : ''}`} key={j}>
                    {skill.tag}{skill.is_learning ? ' ↗' : ''}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="soft" />

      {/* PROJECTS */}
      <section id="projects">
        <p className="section-eyebrow reveal">03 / projects</p>
        <h2 className="section-title reveal">Selected work</h2>
        <Projects data={projects} />
      </section>

      <hr className="soft" />

      {/* EXPERIENCE*/}
      <section id="experience">
        <p className="section-eyebrow reveal">04 / experience</p>
        <h2 className="section-title reveal">Where I've worked</h2>

        <div className="timeline">
          {experience.map((exp, i) => (
            <div className="tl-item reveal" key={i}>
              <div className="tl-date">{exp.date_range}</div>
              <div className="tl-body">
                <div className="tl-role">{exp.role}</div>
                <div className="tl-company">{exp.company}</div>
                <div
                  className="tl-points"
                  dangerouslySetInnerHTML={{ __html: exp.points }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="soft" />
      <Contact />
      <footer>
        <span>© 2026 Suborno Das</span>
        <span>Designed &amp; built by me</span>
      </footer>
    </>
  );
}