import { useEffect, useState, useRef } from 'react';
import { triggerConfetti } from '../../utils/confetti';
import { showToast } from '../../utils/toast';

export default function Footer() {
  const [timeStr, setTimeStr] = useState('--:--:--');
  const boomBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tickClock = () => {
      try {
        const str = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date());
        setTimeStr(str);
      } catch {
        setTimeStr(new Date().toLocaleTimeString());
      }
    };

    tickClock();
    const interval = setInterval(tickClock, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleBoom = () => {
    const btn = boomBtnRef.current;
    if (btn) {
      const r = btn.getBoundingClientRect();
      triggerConfetti(r.left + r.width / 2, r.top + r.height / 2);
    }
    showToast('TOLD YOU NOT TO.', 'ok');
  };

  return (
    <footer className="footer">
      <div className="wrap foot-grid">
        <div>
          <p className="foot-logo">
            SD<em>.</em>DAS
          </p>
          <p className="foot-tag">
            Full-stack developer. Reliable backends, clean frontends, based in West Bengal, India.
          </p>
        </div>

        <nav className="foot-nav" aria-label="Footer">
          <a href="#about">ABOUT</a>
          <a href="#skills">TOOLBOX</a>
          <a href="#projects">WORK</a>
          <a href="#experience">EXPERIENCE</a>
          <a href="#contact">CONTACT</a>
        </nav>

        <div className="foot-right">
          <p className="mono">MY LOCAL TIME (IST)</p>
          <p className="clock" id="clock">
            {timeStr}
          </p>
          <button
            ref={boomBtnRef}
            className="btn btn-danger"
            id="boomBtn"
            data-cursor
            onClick={handleBoom}
            type="button"
          >
            DO NOT PRESS
          </button>
        </div>
      </div>

      <div className="wrap foot-bottom">
        <p className="mono">© 2026 SUBORNO DAS</p>
        <p className="mono">DESIGNED &amp; BUILT BY ME — NO TEMPLATES, NO PAGE BUILDERS</p>
      </div>
    </footer>
  );
}
