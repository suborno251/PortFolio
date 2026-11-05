import { useRef, type CSSProperties, type ReactNode } from 'react';

interface DraggableStickerProps {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export default function DraggableSticker({
  className = '',
  style = {},
  children,
}: DraggableStickerProps) {
  const stickerRef = useRef<HTMLDivElement>(null);
  const isDownRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0 });
  const originPosRef = useRef({ x: 0, y: 0 });
  const currentPosRef = useRef({ x: 0, y: 0 });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDownRef.current = true;
    const el = stickerRef.current;
    if (!el) return;

    el.setPointerCapture(e.pointerId);

    const tr = el.style.transform.match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/);
    const curX = tr ? parseFloat(tr[1]) : 0;
    const curY = tr ? parseFloat(tr[2]) : 0;

    currentPosRef.current = { x: curX, y: curY };
    originPosRef.current = { x: curX, y: curY };
    startPosRef.current = { x: e.clientX, y: e.clientY };

    e.preventDefault();
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDownRef.current || !stickerRef.current) return;
    const dx = e.clientX - startPosRef.current.x;
    const dy = e.clientY - startPosRef.current.y;
    const newX = originPosRef.current.x + dx;
    const newY = originPosRef.current.y + dy;
    currentPosRef.current = { x: newX, y: newY };
    stickerRef.current.style.transform = `translate(${newX}px, ${newY}px) rotate(0deg)`;
  };

  const onPointerUp = () => {
    isDownRef.current = false;
  };

  return (
    <div
      ref={stickerRef}
      className={`sticker ${className}`.trim()}
      style={style}
      data-drag
      data-cursor
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {children}
    </div>
  );
}
