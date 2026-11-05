import { useEffect, useRef } from 'react';
import { registerConfettiTrigger } from '../../utils/confetti';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  rot: number;
  vr: number;
  c: string;
  life: number;
}

export default function ConfettiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const partsRef = useRef<Particle[]>([]);
  const runningRef = useRef<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const burst = (x: number, y: number) => {
      const colors = ['#ff4d00', '#ffd02f', '#161513', '#f4efe4'];
      for (let i = 0; i < 140; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = 6 + Math.random() * 10;
        partsRef.current.push({
          x,
          y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp - 6,
          w: 5 + Math.random() * 8,
          h: 4 + Math.random() * 6,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.3,
          c: colors[i % colors.length],
          life: 1,
        });
      }
      if (!runningRef.current) {
        runningRef.current = true;
        requestAnimationFrame(loop);
      }
    };

    const loop = () => {
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = Math.min(2, window.devicePixelRatio || 1);
      if (canvas.width !== window.innerWidth * dpr) {
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      partsRef.current = partsRef.current.filter(
        (p) => p.life > 0 && p.y < window.innerHeight + 40
      );

      partsRef.current.forEach((p) => {
        p.vy += 0.35;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.rot += p.vr;
        p.life -= 0.008;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      if (partsRef.current.length > 0) {
        requestAnimationFrame(loop);
      } else {
        runningRef.current = false;
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    };

    return registerConfettiTrigger(burst);
  }, []);

  return <canvas id="confetti" ref={canvasRef} aria-hidden="true" />;
}
