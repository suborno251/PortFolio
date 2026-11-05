import { useRef, type ReactNode } from 'react';

interface TiltCardProps {
  className?: string;
  children: ReactNode;
}

export default function TiltCard({ className = '', children }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;

    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduceMotion) return;

    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rY = (px - 0.5) * 10;
    const rX = (0.5 - py) * 10;

    el.style.transform = `rotateX(${rX}deg) rotateY(${rY}deg)`;
    el.style.setProperty('--gx', `${px * 100}%`);
    el.style.setProperty('--gy', `${py * 100}%`);
  };

  const onMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;

    el.style.transition = 'transform 0.4s ease';
    el.style.transform = '';
    setTimeout(() => {
      if (el) el.style.transition = '';
    }, 400);
  };

  return (
    <div
      ref={cardRef}
      className={`tilt ${className}`.trim()}
      data-cursor
      aria-hidden="true"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="glare" />
      {children}
    </div>
  );
}
