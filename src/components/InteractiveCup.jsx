import React, { useRef, useEffect, useState } from 'react';

// Accent colors per drink
const DRINK_COLORS = {
  espresso:  { primary: 'rgba(255,100,20,0.7)',  secondary: 'rgba(200,80,10,0.25)',  ring: '#ff6414' },
  latte:     { primary: 'rgba(201,168,76,0.7)',  secondary: 'rgba(180,140,30,0.25)', ring: '#C9A84C' },
  coldbrew:  { primary: 'rgba(40,130,220,0.7)',  secondary: 'rgba(20,90,180,0.25)',  ring: '#3b82f6' },
  flatwhite: { primary: 'rgba(160,100,220,0.7)', secondary: 'rgba(120,60,180,0.25)', ring: '#c084fc' },
};

export default function InteractiveCup({ img = '/img/espresso_render.png', name = 'Obsidian Espresso', drinkId = 'espresso' }) {
  const containerRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const colors = DRINK_COLORS[drinkId] || DRINK_COLORS.espresso;
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const handleMouseMove = (e) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setCoords({ x, y });
    };
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave  = () => { setIsHovered(false); setCoords({ x: 0, y: 0 }); };
    const c = containerRef.current;
    if (c) {
      c.addEventListener('mousemove', handleMouseMove);
      c.addEventListener('mouseenter', handleMouseEnter);
      c.addEventListener('mouseleave', handleMouseLeave);
    }
    return () => {
      if (c) {
        c.removeEventListener('mousemove', handleMouseMove);
        c.removeEventListener('mouseenter', handleMouseEnter);
        c.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const rotateX = isHovered && !prefersReducedMotion ? -coords.y * 8 : 0;
  const rotateY = isHovered && !prefersReducedMotion ? coords.x * 8 : 0;
  const floatClass = prefersReducedMotion ? "" : "ic-float";

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center w-[290px] h-[290px] md:w-[440px] md:h-[440px] mx-auto relative select-none cursor-pointer"
      style={{ perspective: '1400px' }}
    >
      <style>{`
        /* ── FLOATING ANIMATION ── */
        @keyframes ic-float {
          0%,100% { transform: translateY(0px)   rotateZ(0deg)    scale(1.00); }
          25%      { transform: translateY(-4px) rotateZ(0.2deg)  scale(1.01); }
          50%      { transform: translateY(-7px) rotateZ(-0.1deg) scale(1.02); }
          75%      { transform: translateY(-3px) rotateZ(0.1deg)  scale(1.01); }
        }
        .ic-float { animation: ic-float 6.5s ease-in-out infinite; }

        /* ── ORBIT RINGS ── */
        @keyframes ic-orbit1 { from { transform: rotateZ(0deg);   } to { transform: rotateZ(360deg);  } }
        @keyframes ic-orbit2 { from { transform: rotateZ(0deg);   } to { transform: rotateZ(-360deg); } }
        @keyframes ic-orbit3 { from { transform: rotateZ(45deg);  } to { transform: rotateZ(405deg);  } }
        .ic-ring1 { animation: ic-orbit1 10s linear infinite; }
        .ic-ring2 { animation: ic-orbit2 14s linear infinite; }
        .ic-ring3 { animation: ic-orbit3 18s linear infinite; }

        /* ── SCAN LINE ── */
        @keyframes ic-scan {
          0%   { top: 0%;    opacity: 0; }
          5%   { opacity: 0.6; }
          48%  { top: 90%;   opacity: 0.5; }
          50%  { top: 90%;   opacity: 0; }
          100% { top: 0%;    opacity: 0; }
        }
        .ic-scan { animation: ic-scan 4s ease-in-out infinite; }

        /* ── GLOW PULSE ── */
        @keyframes ic-glow {
          0%,100% { opacity:0.4; transform:scale(0.85); }
          50%     { opacity:0.8; transform:scale(1.05); }
        }
        .ic-glow { animation: ic-glow 3s ease-in-out infinite alternate; }

        /* ── PARTICLE DOTS ── */
        @keyframes ic-dot {
          0%,100% { opacity:0; transform:translateY(0px) scale(0); }
          30%     { opacity:1; transform:translateY(-18px) scale(1); }
          60%     { opacity:0.4; transform:translateY(-36px) scale(0.7); }
          80%     { opacity:0; transform:translateY(-50px) scale(0); }
        }
        .ic-dot1 { animation: ic-dot 3.2s ease-in-out infinite; animation-delay:0s; }
        .ic-dot2 { animation: ic-dot 3.2s ease-in-out infinite; animation-delay:0.8s; }
        .ic-dot3 { animation: ic-dot 3.2s ease-in-out infinite; animation-delay:1.6s; }
        .ic-dot4 { animation: ic-dot 3.2s ease-in-out infinite; animation-delay:2.4s; }

        /* ── BRACKET PULSE ── */
        @keyframes ic-bracket { 0%,100%{opacity:0.25} 50%{opacity:0.7} }
        .ic-bracket { animation: ic-bracket 2.5s ease-in-out infinite; }

        /* ── DATA BLINK ── */
        @keyframes ic-blink { 0%,100%{opacity:0.3} 50%{opacity:1} }
        .ic-blink { animation: ic-blink 1.8s ease-in-out infinite; }
      `}</style>

      {/* ── OUTER ORBIT RING 1 ── */}
      <div className={`${prefersReducedMotion ? '' : 'ic-ring1'} absolute inset-[-8px] rounded-full pointer-events-none`} style={{ border: `1px solid ${colors.ring}30` }}>
        {/* Orbital dot */}
        {!prefersReducedMotion && (
          <div className="absolute top-0 left-1/2 w-2.5 h-2.5 rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{ background: colors.ring, boxShadow: `0 0 8px 3px ${colors.ring}` }} />
        )}
      </div>

      {/* ── OUTER ORBIT RING 2 (reverse) ── */}
      <div className={`${prefersReducedMotion ? '' : 'ic-ring2'} absolute inset-[-22px] rounded-full pointer-events-none`} style={{ border: `1px dashed ${colors.ring}20` }}>
        {!prefersReducedMotion && (
          <div className="absolute top-1/2 right-0 w-1.5 h-1.5 rounded-full translate-x-1/2 -translate-y-1/2"
            style={{ background: colors.ring, boxShadow: `0 0 6px 2px ${colors.ring}`, opacity: 0.7 }} />
        )}
      </div>

      {/* ── INNER RING 3 (tilted) ── */}
      <div className={`${prefersReducedMotion ? '' : 'ic-ring3'} absolute inset-[12px] rounded-full pointer-events-none`}
        style={{ border: `1px solid ${colors.ring}15`, transform: 'rotateX(70deg)' }}>
      </div>

      {/* ── MAIN 3D TILT WRAPPER ── */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-transform duration-100 ease-out"
        style={{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`, transformStyle: 'preserve-3d' }}
      >
        {/* Bottom glow */}
        <div className={`${prefersReducedMotion ? '' : 'ic-glow'} absolute bottom-4 left-[15%] right-[15%] h-8 rounded-full pointer-events-none`}
          style={{ background: `radial-gradient(ellipse, ${colors.primary}, transparent 70%)`, filter: 'blur(14px)' }} />

        {/* Ambient center glow */}
        <div className="absolute inset-[20%] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${colors.secondary}, transparent 70%)`, filter: 'blur(20px)' }} />

        {/* ── FLOATING PRODUCT IMAGE ── */}
        <div className={`${floatClass} w-full h-full flex items-center justify-center relative`}>
          <div style={{ clipPath: 'inset(0 0 8% 0)', width: '82%', height: '82%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={img}
              alt={name}
              draggable="false"
              className="w-full h-full object-contain pointer-events-none"
              style={{
                filter: `drop-shadow(0 18px 40px rgba(0,0,0,0.85)) drop-shadow(0 0 18px ${colors.ring}30)`,
                transform: isHovered && !prefersReducedMotion ? 'translateZ(18px)' : 'translateZ(0)',
                transition: 'transform 0.3s ease-out',
              }}
            />
          </div>
        </div>

        {/* ── SCAN LINE sweeping up ── */}
        {!prefersReducedMotion && (
          <div className="ic-scan absolute left-[8%] right-[8%] h-[1.5px] pointer-events-none z-20"
            style={{ background: `linear-gradient(90deg, transparent, ${colors.primary}, transparent)`, filter: 'blur(1px)' }} />
        )}

        {/* ── CORNER BRACKETS ── */}
        <div className={`${prefersReducedMotion ? '' : 'ic-bracket'} absolute top-[8%] left-[8%] w-5 h-5 border-t-2 border-l-2 pointer-events-none`} style={{ borderColor: colors.ring }} />
        <div className={`${prefersReducedMotion ? '' : 'ic-bracket'} absolute top-[8%] right-[8%] w-5 h-5 border-t-2 border-r-2 pointer-events-none`} style={{ borderColor: colors.ring }} />
        <div className={`${prefersReducedMotion ? '' : 'ic-bracket'} absolute bottom-[8%] left-[8%] w-5 h-5 border-b-2 border-l-2 pointer-events-none`} style={{ borderColor: colors.ring }} />
        <div className={`${prefersReducedMotion ? '' : 'ic-bracket'} absolute bottom-[8%] right-[8%] w-5 h-5 border-b-2 border-r-2 pointer-events-none`} style={{ borderColor: colors.ring }} />

        {/* ── FLOATING PARTICLE DOTS ── */}
        {!prefersReducedMotion && (
          <>
            <div className="ic-dot1 absolute pointer-events-none w-1.5 h-1.5 rounded-full" style={{ left: '25%', bottom: '25%', background: colors.ring, boxShadow: `0 0 6px 2px ${colors.ring}` }} />
            <div className="ic-dot2 absolute pointer-events-none w-1 h-1 rounded-full" style={{ left: '65%', bottom: '28%', background: colors.ring, boxShadow: `0 0 5px 2px ${colors.ring}` }} />
            <div className="ic-dot3 absolute pointer-events-none w-1.5 h-1.5 rounded-full" style={{ left: '40%', bottom: '20%', background: colors.ring, boxShadow: `0 0 6px 2px ${colors.ring}` }} />
            <div className="ic-dot4 absolute pointer-events-none w-1 h-1 rounded-full" style={{ left: '75%', bottom: '32%', background: colors.ring, boxShadow: `0 0 5px 2px ${colors.ring}` }} />
          </>
        )}

        {/* ── HUD DATA LABEL ── */}
        <div className="absolute top-[6%] left-[12%] pointer-events-none z-20">
          <span className={`${prefersReducedMotion ? '' : 'ic-blink'} font-body text-[8px] tracking-[0.25em] uppercase`} style={{ color: colors.ring }}>
            ◉ {prefersReducedMotion ? '3D VIEW' : 'LIVE 3D'}
          </span>
        </div>
      </div>
    </div>
  );
}
