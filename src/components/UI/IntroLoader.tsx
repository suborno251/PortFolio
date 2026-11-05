import { useEffect, useState } from 'react';

export default function IntroLoader() {
  const [removed, setRemoved] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });
  const [num, setNum] = useState<number>(0);
  const [isDone, setIsDone] = useState<boolean>(false);

  useEffect(() => {
    if (removed) return;

    const t0 = performance.now();
    let frameId: number;

    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / 750);
      const p = Math.floor(100 * (1 - Math.pow(1 - k, 3)));
      setNum(p);

      if (k < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setIsDone(true);
        setTimeout(() => {
          setRemoved(true);
        }, 700);
      }
    };

    frameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [removed]);

  if (removed) return null;

  return (
    <div id="loader" className={isDone ? 'done' : ''} aria-hidden="true">
      <div className="loader-box">
        <span id="loadNum">{num}</span>
        <span className="loader-label">LOADING&nbsp;PORTFOLIO</span>
      </div>
    </div>
  );
}
