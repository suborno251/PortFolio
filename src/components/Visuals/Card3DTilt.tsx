import React, { useRef, useState } from 'react';

interface Card3DTiltProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export const Card3DTilt: React.FC<Card3DTiltProps> = ({
  children,
  className = '',
  maxTilt = 7,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: 'transform 0.4s cubic-bezier(0.03, 0.98, 0.52, 0.99), box-shadow 0.4s ease',
  });
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({
    opacity: 0,
    transform: 'translate(-50%, -50%)',
  });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`,
      transition: 'transform 0.1s ease-out, box-shadow 0.2s ease',
    });

    setGlareStyle({
      opacity: 0.12,
      left: `${x}px`,
      top: `${y}px`,
      transform: 'translate(-50%, -50%)',
      transition: 'opacity 0.2s ease',
    });
  };

  const handlePointerLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
      transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease',
    });
    setGlareStyle({
      opacity: 0,
      transform: 'translate(-50%, -50%)',
      transition: 'opacity 0.4s ease',
    });
  };

  return (
    <div
      ref={cardRef}
      className={`card-3d-tilt ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        ...style,
        position: 'relative',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {/* Dynamic Specular Glare */}
      <div
        className="card-3d-glare"
        style={{
          ...glareStyle,
          position: 'absolute',
          width: '260px',
          height: '260px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79, 110, 247, 0.45) 0%, rgba(6, 182, 212, 0.2) 40%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />
      {children}
    </div>
  );
};

export default Card3DTilt;
