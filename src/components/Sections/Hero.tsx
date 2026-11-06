import { useEffect, useState, useRef, type CSSProperties } from 'react';
import IcosahedronCanvas from '../Visuals/IcosahedronCanvas';
import DraggableSticker from '../Visuals/DraggableSticker';
import type { StatItem } from '../../hooks/usePortfolioData';

interface HeroProps {
  stats: StatItem[];
}

export default function Hero({ stats }: HeroProps) {
  const [scrambleText, setScrambleText] = useState('FULL-STACK DEVELOPER');
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));
  const statsRef = useRef<HTMLDivElement>(null);

  // Scramble text animation
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const roles = [
      'FULL-STACK DEVELOPER',
      'LARAVEL & NODE.JS GUY',
      'GENAI MICROSERVICE BUILDER',
      'API ARCHITECT',
    ];
    const glyphs = '!<>-_\\/[]{}=+*^?#____';
    let ri = 0;

    const scrambleTo = (word: string, currentText: string) => {
      const len = Math.max(currentText.length, word.length);
      let frame = 0;
      const total = 26;

      const tick = () => {
        let out = '';
        for (let i = 0; i < len; i++) {
          const done = Math.floor((frame / total) * len);
          if (i < done && i < word.length) {
            out += word[i];
          } else if (i < word.length) {
            out += glyphs[Math.floor(Math.random() * glyphs.length)];
          }
        }
        setScrambleText(out || word);
        frame++;
        if (frame <= total) {
          setTimeout(tick, 34);
        }
      };
      tick();
    };

    let curWord = 'FULL-STACK DEVELOPER';
    const timer = setInterval(() => {
      ri = (ri + 1) % roles.length;
      const nextWord = roles[ri];
      scrambleTo(nextWord, curWord);
      curWord = nextWord;
    }, 3200);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Stats counting animation on intersection
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = statsRef.current;
    if (!el) return;

    const animateCount = (idx: number, target: number) => {
      if (reduceMotion) {
        setCounts((prev) => {
          const next = [...prev];
          next[idx] = target;
          return next;
        });
        return;
      }

      const t0 = performance.now();
      const dur = 1100;

      const hasDecimal = target % 1 !== 0;
      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / dur);
        const progress = 1 - Math.pow(1 - k, 3);
        const rawVal = target * progress;
        const val = k >= 1 ? target : (hasDecimal ? Number(rawVal.toFixed(1)) : Math.round(rawVal));
        setCounts((prev) => {
          const next = [...prev];
          next[idx] = val;
          return next;
        });
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          stats.forEach((st, i) => animateCount(i, st.value));
          io.unobserve(en.target);
        });
      },
      { threshold: 0.4 }
    );

    io.observe(el);

    return () => {
      io.disconnect();
    };
  }, [stats]);

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
    <section className="hero" id="hero">
      <div className="hero-inner">
        <div className="hero-left">
          <p className="badge reveal">● OPEN TO ROLES — WEST BENGAL, IN</p>
          <h1 className="hero-title">
            <span className="line solid reveal">SUBORNO</span>
            <span className="line outline reveal" style={{ '--d': '.08s' } as CSSProperties}>
              DAS<em>.</em>
            </span>
          </h1>
          <p className="hero-role mono reveal" style={{ '--d': '.16s' } as CSSProperties}>
            &gt;&nbsp;<span id="scramble">{scrambleText}</span>
            <span className="caret" aria-hidden="true"></span>
          </p>
          <p className="hero-desc reveal" style={{ '--d': '.22s' } as CSSProperties}>
            I build things for the web — reliable Laravel APIs, Node.js services and
            AI-integrated apps that don't fall over when real users show up.
          </p>
          <div className="hero-cta reveal" style={{ '--d': '.3s' } as CSSProperties}>
            <a
              href="#projects"
              className="btn btn-primary magnetic"
              data-cursor
              onMouseMove={onMagneticMove}
              onMouseLeave={onMagneticLeave}
            >
              SEE THE WORK
            </a>
            <a
              href="#contact"
              className="btn magnetic"
              data-cursor
              onMouseMove={onMagneticMove}
              onMouseLeave={onMagneticLeave}
            >
              SAY HELLO
            </a>
          </div>
        </div>

        <div className="hero-right reveal" style={{ '--d': '.2s' } as CSSProperties}>
          <IcosahedronCanvas />
          <p className="drag-hint mono">— DRAG THE SHAPE, IT SPINS —</p>
        </div>
      </div>

      {/* draggable stickers */}
      <DraggableSticker
        className="st-accent"
        style={{ top: '18%', right: '34%' }}
      >
        OPEN
        <br />
        TO&nbsp;WORK
      </DraggableSticker>
      <DraggableSticker
        className="st-yellow"
        style={{ top: '64%', right: '6%' }}
      >
        2.9&nbsp;YRS
        <br />
        XP
      </DraggableSticker>
      <DraggableSticker
        className="st-ink"
        style={{ top: '12%', left: '44%' }}
      >
        EST.&nbsp;2024
        <br />
        STILL&nbsp;CURIOUS
      </DraggableSticker>

      {/* stats */}
      <div className="stats" id="stats" ref={statsRef}>
        {stats.map((st, i) => (
          <div className="stat" key={i}>
            <strong>
              <span>
                {counts[i]}
                {st.suffix || ''}
              </span>
            </strong>
            <span className="stat-label mono">{st.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
