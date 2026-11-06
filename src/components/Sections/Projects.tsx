import { useState, type CSSProperties } from 'react';
import TiltCard from '../Visuals/TiltCard';
import type { Project } from '../../hooks/usePortfolioData';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [viewModes, setViewModes] = useState<Record<number, 'preview' | 'breakdown'>>({});

  const toggleView = (idx: number, mode: 'preview' | 'breakdown') => {
    setViewModes(prev => ({ ...prev, [idx]: mode }));
  };

  const onMagneticMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduceMotion) return;

    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
  };

  const onMagneticLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = '';
  };

  return (
    <section className="section" id="projects">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="sec-num mono">03&nbsp;/</span>
          <h2>SELECTED&nbsp;WORK</h2>
        </div>
        <p className="sec-sub reveal" style={{ '--d': '.05s' } as CSSProperties}>
          Interactive previews of live production builds, multi-agent AI pipelines, and industrial IoT dashboards. Toggle between live UI and architecture breakdown.
        </p>

        {projects.map((proj, idx) => {
          const isFlip = idx % 2 === 1;
          const currentMode = viewModes[idx] ?? 'preview';

          return (
            <article
              key={idx}
              className={`project ${isFlip ? 'flip' : ''} reveal`}
            >
              <div className="p-visual">
                <TiltCard className="tilt-browser">
                  <div className="pv-browser">
                    <div className="pv-browser-bar">
                      <div className="pv-browser-dots">
                        <span />
                        <span />
                        <span />
                      </div>
                      <div className="pv-browser-url mono">
                        <svg
                          className="pv-lock-icon"
                          viewBox="0 0 24 24"
                          width="12"
                          height="12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <span>
                          {proj.previewUrl ||
                            proj.liveUrl?.replace(/^https?:\/\//, '').replace(/\/$/, '') ||
                            'app.production'}
                        </span>
                      </div>
                      <div className="pv-browser-controls">
                        {proj.image && (
                          <div className="pv-tabs mono">
                            <button
                              type="button"
                              className={`pv-tab ${currentMode === 'preview' ? 'active' : ''}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleView(idx, 'preview');
                              }}
                              title="Show live site preview"
                            >
                              SITE
                            </button>
                            <button
                              type="button"
                              className={`pv-tab ${currentMode === 'breakdown' ? 'active' : ''}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleView(idx, 'breakdown');
                              }}
                              title="Show technical architecture"
                            >
                              LOGIC
                            </button>
                          </div>
                        )}
                        <span className="pv-browser-live mono">LIVE</span>
                      </div>
                    </div>

                    {currentMode === 'preview' && proj.image ? (
                      <a
                        href={proj.liveUrl || proj.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="pv-browser-canvas"
                        data-cursor
                      >
                        <img
                          src={proj.image}
                          alt={`${proj.name} live site preview`}
                          loading="lazy"
                          className="pv-screenshot"
                        />
                        <div className="pv-highlight-overlay">
                          <span className="pv-preview-badge mono">VISIT LIVE SITE ↗</span>
                          {proj.badgeText && (
                            <div className="pv-stamp mono">{proj.badgeText}</div>
                          )}
                        </div>
                      </a>
                    ) : (
                      <div className="pv-breakdown-body">
                        {proj.visualType === 'whistle' ? (
                          <div className="pv-whistle">
                            <div className="pv-whistle-head">
                              <span className="mono pv-whistle-ep">
                                POST /api/v1/consultations/book
                              </span>
                              <span className="mono pv-whistle-badge">CLINIC DISPATCH</span>
                            </div>
                            <div className="pv-whistle-card">
                              <div className="pv-whistle-row">
                                <span className="mono pv-label">SERVICE</span>
                                <strong>Whistle Invisible Aligners</strong>
                              </div>
                              <div className="pv-whistle-row">
                                <span className="mono pv-label">SCAN TYPE</span>
                                <span>3D Intraoral · Home / In-Clinic</span>
                              </div>
                              <div className="pv-whistle-row">
                                <span className="mono pv-label">STATUS</span>
                                <span className="pv-status mono">
                                  CONFIRMED · DOCTOR ASSIGNED
                                </span>
                              </div>
                            </div>
                            <div className="pv-whistle-progress">
                              <div className="pv-whistle-step done">
                                <span className="mono">01</span>
                                <span>3D Scan</span>
                              </div>
                              <div className="pv-whistle-step done">
                                <span className="mono">02</span>
                                <span>Smile Plan</span>
                              </div>
                              <div className="pv-whistle-step active">
                                <span className="mono">03</span>
                                <span>Fabrication</span>
                              </div>
                              <div className="pv-whistle-step">
                                <span className="mono">04</span>
                                <span>Aligner Care</span>
                              </div>
                            </div>
                            <div className="pv-stamp mono">DEMO — WHISTLE</div>
                          </div>
                        ) : proj.visualType === 'predictor' ? (
                          <div className="pv-ticket">
                            <p className="mono pv-endpoint">POST /api/v1/predict</p>
                            <p className="pv-value">
                              median_house_value ≈ <strong>$418,700</strong>
                            </p>
                            <div className="pv-conf">
                              <i style={{ width: '94%' }} />
                              <span className="mono">conf 0.94</span>
                            </div>
                            <div className="pv-bars">
                              <i style={{ '--h': '38%' } as CSSProperties} />
                              <i style={{ '--h': '55%' } as CSSProperties} />
                              <i style={{ '--h': '44%' } as CSSProperties} />
                              <i style={{ '--h': '68%' } as CSSProperties} />
                              <i style={{ '--h': '52%' } as CSSProperties} />
                              <i style={{ '--h': '79%' } as CSSProperties} />
                              <i style={{ '--h': '64%' } as CSSProperties} />
                              <i style={{ '--h': '88%' } as CSSProperties} />
                              <i style={{ '--h': '72%' } as CSSProperties} />
                              <i style={{ '--h': '95%' } as CSSProperties} />
                            </div>
                          </div>
                        ) : proj.visualType === 'verbatim' ? (
                          <div className="pv-verbatim">
                            <div className="pv-verbatim-head">
                              <span className="mono pv-verbatim-ep">
                                POST /api/verify-quote · ENGINE
                              </span>
                              <span className="mono pv-verbatim-badge">HALLUCINATION GUARD</span>
                            </div>
                            <div className="pv-verbatim-card">
                              <div className="pv-verbatim-row">
                                <span className="mono pv-label">DOCUMENT</span>
                                <strong>Master_Agreement.pdf</strong>
                              </div>
                              <div className="pv-verbatim-row">
                                <span className="mono pv-label">RAW EXCERPT</span>
                                <span className="mono pv-excerpt">
                                  “...either party may terminate upon 30 days...”
                                </span>
                              </div>
                              <div className="pv-verbatim-row">
                                <span className="mono pv-label">CITATION</span>
                                <span className="pv-verbatim-status mono">
                                  ✓ EXACT MATCH · PAGE 14 § 9.2
                                </span>
                              </div>
                            </div>
                            <div className="pv-verbatim-metrics">
                              <div className="pv-verbatim-metric">
                                <span className="mono">PDF PARSER</span>
                                <strong>Hierarchical</strong>
                              </div>
                              <div className="pv-verbatim-metric">
                                <span className="mono">DIFF ENGINE</span>
                                <strong>Clause-Level</strong>
                              </div>
                              <div className="pv-verbatim-metric">
                                <span className="mono">VERIFICATION</span>
                                <strong style={{ color: '#10b981' }}>100% GROUNDED</strong>
                              </div>
                            </div>
                            <div className="pv-stamp mono">VERIFIED — VERBATIM.AI</div>
                          </div>
                        ) : proj.visualType === 'factoryiq' ? (
                          <div className="pv-factory">
                            <div className="pv-factory-head">
                              <span className="mono pv-factory-ep">
                                POST /api/events · CCTV INGESTION
                              </span>
                              <span className="mono pv-factory-badge">AI STREAM</span>
                            </div>
                            <div className="pv-factory-card">
                              <div className="pv-factory-row">
                                <span className="mono pv-label">PIPELINE</span>
                                <strong>CCTV Vision Event Ingestion</strong>
                              </div>
                              <div className="pv-factory-row">
                                <span className="mono pv-label">STORAGE</span>
                                <span>PostgreSQL via Knex.js · Dockerized</span>
                              </div>
                              <div className="pv-factory-row">
                                <span className="mono pv-label">METRICS</span>
                                <span className="pv-factory-status mono">
                                  98.4% PRODUCTIVITY INDEX
                                </span>
                              </div>
                            </div>
                            <div className="pv-factory-telemetry">
                              <div className="pv-telemetry-box">
                                <span className="mono">ACTIVE CAMS</span>
                                <strong>12 / 12</strong>
                              </div>
                              <div className="pv-telemetry-box">
                                <span className="mono">EVENTS / MIN</span>
                                <strong>~420</strong>
                              </div>
                              <div className="pv-telemetry-box">
                                <span className="mono">ANOMALIES</span>
                                <strong style={{ color: 'var(--accent)' }}>0 DETECTED</strong>
                              </div>
                            </div>
                            <div className="pv-stamp mono">VERIFIED — FACTORYIQ</div>
                          </div>
                        ) : (
                          <div className="pv-debate">
                            <div className="pv-msg">
                              <span className="mono">model_a · gemini</span>“The claim checks
                              out — sources agree.”
                            </div>
                            <div className="pv-msg b">
                              <span className="mono">model_b · deepseek</span>“Disagree — figure
                              3 says otherwise.”
                            </div>
                            <div className="pv-stamp mono">VERIFIED — NO YES-MAN</div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </TiltCard>
              </div>

              <div className="p-info">
                <p className="mono p-meta">{proj.meta}</p>
                <h3>{proj.name}</h3>
                <p>{proj.description}</p>

                {proj.highlights && proj.highlights.length > 0 && (
                  <div className="p-highlights">
                    <span className="mono p-highlights-label">CORE HIGHLIGHTS:</span>
                    <ul className="p-highlights-list">
                      {proj.highlights.map((item, hIdx) => (
                        <li key={hIdx}>
                          <span className="p-check">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <ul className="tags">
                  {proj.tags.map((tag, tIdx) => (
                    <li key={tIdx}>{tag}</li>
                  ))}
                </ul>
                <div className="p-actions">
                  {proj.liveUrl && (
                    <a
                      className="btn btn-primary btn-small magnetic"
                      data-cursor
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      onMouseMove={onMagneticMove}
                      onMouseLeave={onMagneticLeave}
                    >
                      LIVE SITE ↗
                    </a>
                  )}
                  {proj.sourceUrl && proj.sourceUrl !== proj.liveUrl && (
                    <a
                      className="btn btn-small magnetic"
                      data-cursor
                      href={proj.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      onMouseMove={onMagneticMove}
                      onMouseLeave={onMagneticLeave}
                    >
                      SOURCE ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}

        <p className="more-link mono reveal">
          More experiments on{' '}
          <a
            href="https://github.com/suborno251?tab=repositories"
            target="_blank"
            rel="noreferrer"
          >
            GITHUB →
          </a>
        </p>
      </div>
    </section>
  );
}
