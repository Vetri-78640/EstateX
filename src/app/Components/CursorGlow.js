'use client';
import { useEffect, useRef, useState } from 'react';

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const glowRef = useRef();

  useEffect(() => {
    const handleMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div
      ref={glowRef}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: pos.x - 100,
          top: pos.y - 100,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #fff 0%, #fff8 40%, #2226 100%)',
          filter: 'blur(32px)',
          opacity: 0.38,
          pointerEvents: 'none',
          transition: 'background 0.18s, filter 0.18s, opacity 0.18s',
        }}
      />
    </div>
  );
} 