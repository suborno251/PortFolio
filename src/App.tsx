import './App.css'
import { useEffect } from 'react';
import Projects from './components/Projects/projects';
import Contact from './components/Contact/contact';

export default function App() {
      useEffect(() => {
        // Scroll-spy nav
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

        // Reveal on scroll
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

        // Cleanup on unmount
        return () => {
          spy.disconnect();
          ro.disconnect();
        };
      }, []);


  return (
    <>

      {/* NAV  */}
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

      {/* HERO  */}
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

      <hr className="soft"/>

      {/* ABOUT  */}
      <section id="about">
        <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
        }}>

          <p className="section-eyebrow reveal">01 / about</p>
          <h2 className="section-title reveal">A bit about me</h2>
        </div>

        <div className="about-grid">
          <div className="about-text reveal">
            <p>
              I'm a full-stack developer with a strong foundation in PHP and Laravel, and growing
              professional experience in Node.js, Express, and Angular. I enjoy the whole stack —
              designing a database schema in the morning and tweaking a UI animation in the afternoon.
            </p>
            <p>
              Most of my recent work lives at the intersection of traditional web development and
              modern AI integration: building image generation pipelines, real-time streaming APIs,
              and tools that make complex things feel simple.
            </p>
            <p>
              When I'm not writing code, I'm probably thinking about the next side project,
              exploring Linux configurations, or researching something niche on the internet.
            </p>
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

      <hr className="soft"/>

      {/* SKILLS */}
      <section id="skills">
        <p className="section-eyebrow reveal">02 / skills</p>
        <h2 className="section-title reveal">What I work with</h2>

        <div className="skill-groups">
          <div className="reveal">
            <div className="skill-group-label">Backend</div>
            <div className="skill-tags">
              <span className="tag">PHP</span>
              <span className="tag">Laravel</span>
              <span className="tag">Node.js</span>
              <span className="tag">Express.js</span>
              <span className="tag">TypeScript</span>
              <span className="tag">Python</span>
              <span className="tag">FastAPI</span>
            </div>
          </div>

          <div className="reveal">
            <div className="skill-group-label">Frontend</div>
            <div className="skill-tags">
              <span className="tag">HTML / CSS</span>
              <span className="tag">JavaScript</span>
              <span className="tag">jQuery</span>
              <span className="tag">Angular</span>
              <span className="tag">Bootstrap</span>
              <span className="tag learning">React ↗</span>
            </div>
          </div>

          <div className="reveal">
            <div className="skill-group-label">Tools &amp; DevOps</div>
            <div className="skill-tags">
              <span className="tag">Docker</span>
              <span className="tag">AWS S3</span>
              <span className="tag">Git</span>
              <span className="tag">Linux (Arch)</span>
              <span className="tag">Hostinger</span>
              <span className="tag">Gemini API</span>
              <span className="tag">SSE / Streams</span>
            </div>
          </div>
        </div>
      </section>

      <hr className="soft"/>

      {/* PROJECTS  */}
      <section id="projects">
        <p className="section-eyebrow reveal">03 / projects</p>
        <h2 className="section-title reveal">Selected work</h2>

        <Projects/>
      </section>

      <hr className="soft"/>

      {/* EXPERIENCE */}
      <section id="experience">
        <p className="section-eyebrow reveal">04 / experience</p>
        <h2 className="section-title reveal">Where I've worked</h2>

        <div className="timeline">

          <div className="tl-item reveal">
            <div className="tl-date">2024 — Present</div>
            <div className="tl-body">
              <div className="tl-role">Full-Stack Developer</div>
              <div className="tl-company">Zefa International / Remedio</div>
              <ul className="tl-points">
                <li>Built an AI image generation pipeline using Gemini API with real-time SSE streaming</li>
                <li>Developed AWS S3-integrated asset management with canvas-based watermarking</li>
                <li>Created barcode scanner and product inventory UI connected to internal APIs</li>
                <li>Maintained and extended Laravel backend services and REST APIs</li>
                <li>Handled Docker deployments and resolved production-critical streaming issues on Render</li>
              </ul>
            </div>
          </div>

          <div className="tl-item reveal">
            <div className="tl-date">Earlier</div>
            <div className="tl-body">
              <div className="tl-role">PHP & Laravel Developer</div>
              <div className="tl-company">Freelance / Contract</div>
              <ul className="tl-points">
                <li>Developed custom web applications in Laravel for various clients</li>
                <li>Built responsive frontends with Bootstrap, jQuery, and vanilla JS</li>
                <li>Managed shared hosting deployments and MySQL database design</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      <hr className="soft"/>
        <Contact/>
        <footer>
          <span>© 2026 Suborno Das</span>
          <span>Designed &amp; built by me</span>
        </footer>

      </>
      )
    }
