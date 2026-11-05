import type { CSSProperties } from 'react';

interface AboutProps {
  bio: string[];
}

export default function About({ bio }: AboutProps) {
  return (
    <section className="section" id="about">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="sec-num mono">01&nbsp;/</span>
          <h2>ABOUT&nbsp;ME</h2>
        </div>

        <p className="statement reveal" style={{ '--d': '.05s' } as CSSProperties}>
          Backend at heart, <mark>full-stack by habit</mark> — I ship APIs that
          don't 500 and frontends that don't jank.
        </p>

        <div className="about-grid">
          <div className="bio">
            {bio.map((paragraph, i) => (
              <p
                key={i}
                className="reveal"
                style={{ '--d': `${i * 0.06}s` } as CSSProperties}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="facts">
            <div className="fact reveal">
              <span className="mono">LOCATION</span>
              <strong>West Bengal, India</strong>
            </div>
            <div className="fact reveal" style={{ '--d': '.05s' } as CSSProperties}>
              <span className="mono">FOCUS</span>
              <strong>Full-Stack Dev</strong>
            </div>
            <div className="fact reveal" style={{ '--d': '.1s' } as CSSProperties}>
              <span className="mono">PRIMARY STACK</span>
              <strong>Laravel · Node.js</strong>
            </div>
            <div className="fact reveal" style={{ '--d': '.15s' } as CSSProperties}>
              <span className="mono">STATUS</span>
              <strong>Open to roles</strong>
            </div>
            <div className="currently reveal" style={{ '--d': '.2s' } as CSSProperties}>
              <span className="mono">CURRENTLY</span>
              <p>
                Building Voice AI RAG agents &amp; GenAI image generation tools at <strong>Remedio Technologies</strong> —
                Laravel + Node.js e-commerce, real-time audio WebSocket pipelines, and FastAPI × Gemini microservices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
