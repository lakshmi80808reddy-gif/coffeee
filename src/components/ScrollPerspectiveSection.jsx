import React, { useEffect, useRef, useState } from 'react';

export default function ScrollPerspectiveSection({ children, id = '', className = '' }) {
  const containerRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState({});

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setTransformStyle({});
      return;
    }

    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const distanceFromCenter = sectionCenter - viewportCenter;
      
      const normalizedDistance = distanceFromCenter / viewportCenter;
      const cappedDistance = Math.max(-1.5, Math.min(1.5, normalizedDistance));
      
      const rotateX = cappedDistance * -2.5;
      const translateZ = Math.abs(cappedDistance) * -20;
      const scale = 1 - Math.abs(cappedDistance) * 0.015;
      const opacity = 1 - Math.abs(cappedDistance) * 0.12;

      setTransformStyle({
        transform: `perspective(1400px) rotateX(${rotateX}deg) translateZ(${translateZ}px) scale(${scale})`,
        opacity: Math.max(0.7, opacity),
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} id={id} className={`scroll-3d-container ${className}`}>
      <div className="scroll-3d-child" style={transformStyle}>
        {children}
      </div>
    </div>
  );
}
