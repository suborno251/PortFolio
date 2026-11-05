import { useEffect, useRef } from 'react';

export default function IcosahedronCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const PHI = (1 + Math.sqrt(5)) / 2;
    const V = [
      [-1, PHI, 0],
      [1, PHI, 0],
      [-1, -PHI, 0],
      [1, -PHI, 0],
      [0, -1, PHI],
      [0, 1, PHI],
      [0, -1, -PHI],
      [0, 1, -PHI],
      [PHI, 0, -1],
      [PHI, 0, 1],
      [-PHI, 0, -1],
      [-PHI, 0, 1],
    ];

    const E: [number, number][] = [];
    for (let i = 0; i < V.length; i++) {
      for (let j = i + 1; j < V.length; j++) {
        const dx = V[i][0] - V[j][0];
        const dy = V[i][1] - V[j][1];
        const dz = V[i][2] - V[j][2];
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < 2.1) {
          E.push([i, j]);
        }
      }
    }

    let ax = 0.4;
    let ay = 0.6;
    let vx = 0;
    let vy = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let hoverK = 0;
    let animId: number;

    const css = (name: string) => {
      return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    };

    const sizeCanvas = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = canvas.clientWidth || 520;
      canvas.width = w * dpr;
      canvas.height = w * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    sizeCanvas();
    window.addEventListener('resize', sizeCanvas);

    const draw = () => {
      const w = canvas.clientWidth || 520;
      const cx = w / 2;
      const cy = w / 2;
      const scale = w * 0.3 * (1 + hoverK * 0.08);
      const dist = 3.4;
      ctx.clearRect(0, 0, w, w);

      const ay2 = ay;
      const ax2 = ax;
      const cosY = Math.cos(ay2);
      const sinY = Math.sin(ay2);
      const cosX = Math.cos(ax2);
      const sinX = Math.sin(ax2);

      const pts = V.map((v) => {
        const x = v[0] * cosY + v[2] * sinY;
        const z1 = -v[0] * sinY + v[2] * cosY;
        const y = v[1] * cosX - z1 * sinX;
        const z = v[1] * sinX + z1 * cosX;
        const k = scale / (dist - z * 0.35);
        return { x: cx + x * k, y: cy + y * k, z };
      });

      const ink = css('--ink') || '#161513';
      const accent = css('--accent') || '#ff4d00';

      // edges — back ones faint, front ones solid
      E.forEach((e) => {
        const a = pts[e[0]];
        const b = pts[e[1]];
        const zm = (a.z + b.z) / 2;
        const alpha = 0.25 + 0.75 * ((zm + 1.9) / 3.8);
        ctx.strokeStyle = ink;
        ctx.globalAlpha = alpha * 0.9;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      });

      // vertices
      ctx.globalAlpha = 1;
      pts.forEach((pt) => {
        const r = 3 + ((pt.z + 2) / 4) * 3.5;
        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      // orbit ring
      ctx.globalAlpha = 0.35;
      ctx.setLineDash([4, 7]);
      ctx.strokeStyle = ink;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.ellipse(cx, cy, scale * 1.35, scale * 0.42, -0.35, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
    };

    const physics = () => {
      if (!dragging) {
        ay += reduceMotion ? 0.0008 : 0.0035 + vy * 0.02;
        ax += vx * 0.02;
        vx *= 0.95;
        vy *= 0.95;
        ax = Math.max(-1.2, Math.min(1.2, ax));
      }
      draw();
      animId = requestAnimationFrame(physics);
    };

    physics();

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      vx = 0;
      vy = 0;
      canvas.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dX = e.clientX - lastX;
      const dY = e.clientY - lastY;
      ay += dX * 0.008;
      ax += dY * 0.006;
      vx = dY * 0.4;
      vy = dX * 0.4;
      ax = Math.max(-1.2, Math.min(1.2, ax));
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const onPointerUp = () => {
      dragging = false;
    };

    const onPointerEnter = () => {
      hoverK = 1;
    };

    const onPointerLeave = () => {
      hoverK = 0;
      dragging = false;
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);
    canvas.addEventListener('pointerenter', onPointerEnter);
    canvas.addEventListener('pointerleave', onPointerLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', sizeCanvas);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
      canvas.removeEventListener('pointerenter', onPointerEnter);
      canvas.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <canvas
      id="ico"
      ref={canvasRef}
      width={520}
      height={520}
      aria-label="Interactive wireframe icosahedron — drag to spin"
    />
  );
}
