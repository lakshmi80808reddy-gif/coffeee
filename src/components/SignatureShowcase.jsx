import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag } from 'lucide-react';
import InteractiveCup from './InteractiveCup';

const DRINKS = [
  {
    id: 'latte',
    img: '/img/latte_render.png',
    name: 'Obsidian Latte',
    bgText: 'LATTE',
    tag: 'SIGNATURE',
    tagline: 'Microfoam precision. Rosetta art.',
    desc: 'Single-origin espresso pulled at 93°C, blended with velvety oat microfoam. Every cup is an artisanal canvas.',
    price: '₹320',
    temp: '62°C',
    ratio: '30ml + 180ml',
    beans: 'Ethiopian Heirloom',
    themeColor: '#C9A84C',
    glow: 'rgba(201,168,76,0.25)',
    glowAlt: 'rgba(201,168,76,0.08)',
  },
  {
    id: 'espresso',
    img: '/img/espresso_render.png',
    name: 'Volcanic Espresso',
    bgText: 'ESPRESSO',
    tag: 'BESTSELLER',
    tagline: '9 bars. 93°C. Pure crema.',
    desc: 'Ethiopia Yirgacheffe dark roast pulled at 9 bars. Thick hazelnut crema, intense cocoa depth, 25ml of pure energy.',
    price: '₹280',
    temp: '93°C',
    ratio: '25ml · 18g dose',
    beans: 'Yirgacheffe Single',
    themeColor: '#ff6414',
    glow: 'rgba(255,100,20,0.28)',
    glowAlt: 'rgba(255,100,20,0.08)',
  },
  {
    id: 'coldbrew',
    img: '/img/coldbrew_render.png',
    name: 'Volcanic Cold Brew',
    bgText: 'BREW',
    tag: '24HR STEEP',
    tagline: 'Cold slow. Stone fruit. No heat.',
    desc: '24-hour slow steep in chilled volcanic-filtered water. Zero bitterness, low acidity, finished with hints of caramel.',
    price: '₹380',
    temp: '4°C',
    ratio: '300ml · 18h steep',
    beans: 'Volcanic Highlands Blend',
    themeColor: '#3b82f6',
    glow: 'rgba(59,130,246,0.22)',
    glowAlt: 'rgba(59,130,246,0.06)',
  },
  {
    id: 'flatwhite',
    img: '/img/flatwhite_render.png',
    name: 'Rosetta Flat White',
    bgText: 'WHITE',
    tag: 'BARISTA PICK',
    tagline: 'Double ristretto. Velvet texture.',
    desc: 'Bold double ristretto layered under a thin, glossy head of wet milk foam. Punchy, textured, and rich.',
    price: '₹340',
    temp: '65°C',
    ratio: '40ml + 100ml',
    beans: 'Sidamo Washed',
    themeColor: '#c084fc',
    glow: 'rgba(192,132,252,0.22)',
    glowAlt: 'rgba(192,132,252,0.06)',
  },
  {
    id: 'cappuccino',
    img: '/img/cappuccino_render.png',
    name: 'Obsidian Cappuccino',
    bgText: 'CAPPU',
    tag: 'TRADITIONAL',
    tagline: 'Thick foam dust. Rich body.',
    desc: 'Equal parts espresso, steamed milk, and heavy foam, dusted with high-grade organic raw cocoa powder.',
    price: '₹330',
    temp: '66°C',
    ratio: '30ml + 150ml',
    beans: 'Guatemala Antigua',
    themeColor: '#f59e0b',
    glow: 'rgba(245,158,11,0.25)',
    glowAlt: 'rgba(245,158,11,0.08)',
  },
  {
    id: 'macchiato',
    img: '/img/macchiato_render.png',
    name: 'Caramel Macchiato',
    bgText: 'CARAMEL',
    tag: 'BARISTA ART',
    tagline: 'Caramel drizzle. Layered espresso.',
    desc: 'Creamy steamed milk marked with rich espresso, finished with a generous crosshatch of custom house caramel.',
    price: '₹360',
    temp: '68°C',
    ratio: '30ml + 210ml',
    beans: 'Obsidian Signature Blend',
    themeColor: '#fbbf24',
    glow: 'rgba(251,191,36,0.25)',
    glowAlt: 'rgba(251,191,36,0.08)',
  }
];

function FloatingBean({ className, style }) {
  return (
    <div className={`absolute pointer-events-none z-10 ${className}`} style={style}>
      <svg width="18" height="24" viewBox="0 0 24 32" fill="none" className="opacity-40 select-none">
        <path d="M12 0C18.6274 0 24 7.16344 24 16C24 24.8366 18.6274 32 12 32C5.37258 32 0 24.8366 0 16C0 7.16344 5.37258 0 12 0Z" fill="#5A3A22" />
        <path d="M12 0C10 8 14 24 12 32" stroke="#2B180A" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function FloatingLeaf({ className, style }) {
  return (
    <div className={`absolute pointer-events-none z-10 ${className}`} style={style}>
      <svg width="28" height="28" viewBox="0 0 40 40" fill="none" className="opacity-35 select-none">
        <path d="M20 0C32 8 40 20 40 32C40 38 34 40 30 40C20 40 8 32 0 20C0 8 8 0 20 0Z" fill="#3D5F2D" />
        <path d="M20 0C18 10 24 30 30 40" stroke="#243D17" strokeWidth="2" />
      </svg>
    </div>
  );
}

export default function SignatureShowcase() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // 3D Drag Gesture State — use refs to avoid stale closures in global event handlers
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false); // for CSS transition only
  const isDraggingRef = useRef(false);
  const dragOffsetRef = useRef(0);
  const startXRef = useRef(0);

  const next = () => setActive((a) => (a + 1) % DRINKS.length);
  const prev = () => setActive((a) => (a - 1 + DRINKS.length) % DRINKS.length);

  // Mouse Parallax movement values
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const fn = (e) => {
      const r = el.getBoundingClientRect();
      setMouse({
        x: ((e.clientX - r.left) / r.width - 0.5) * 2,
        y: ((e.clientY - r.top) / r.height - 0.5) * 2,
      });
    };
    el.addEventListener('mousemove', fn, { passive: true });
    return () => el.removeEventListener('mousemove', fn);
  }, []);

  // Drag-Swipe Gesture Handlers — refs ensure no stale closure on desktop
  const handleDragStart = (clientX) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    startXRef.current = clientX;
    dragOffsetRef.current = 0;
  };

  const handleDragMove = (clientX) => {
    if (!isDraggingRef.current) return;
    const offset = clientX - startXRef.current;
    dragOffsetRef.current = offset;
    setDragOffset(offset);
  };

  const handleDragEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    const threshold = 65; // px displacement to slide to next drink
    if (dragOffsetRef.current < -threshold) {
      next();
    } else if (dragOffsetRef.current > threshold) {
      prev();
    }
    dragOffsetRef.current = 0;
    setDragOffset(0);
  };

  // Bind mouse drag event handlers to window once, persistent — reads refs so always fresh
  useEffect(() => {
    const onMouseMove = (e) => handleDragMove(e.clientX);
    const onMouseUp = () => handleDragEnd();

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  const d = DRINKS[active];

  const handleOrder = () => {
    const target = document.getElementById('menu');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="signature"
      className="sig-section relative w-full overflow-hidden bg-black flex flex-col items-center justify-center py-20 px-6 select-none"
      style={{
        background: `radial-gradient(circle at center, ${d.glowAlt} 0%, #040208 80%)`,
        transition: 'background 0.8s ease',
      }}
    >
      <style>{`
        /* ── SECTION CORE ── */
        .sig-section {
          min-height: 95vh;
        }

        /* ── BACKGROUND GIANT TEXT ── */
        .sig-bg-text-container {
          position: absolute;
          width: 100%;
          display: flex;
          justify-content: center;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }
        .sig-bg-text {
          font-family: 'Outfit', sans-serif;
          font-weight: 900;
          text-transform: uppercase;
          color: transparent;
          letter-spacing: 0.05em;
          line-height: none;
          white-space: nowrap;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease;
        }

        /* ── FLOATING ANIMATIONS ── */
        @keyframes sig-float-bean1 {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          50%      { transform: translate(-10px, -15px) rotate(25deg); }
        }
        @keyframes sig-float-bean2 {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          50%      { transform: translate(12px, 10px) rotate(-15deg); }
        }
        @keyframes sig-float-leaf1 {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          50%      { transform: translate(-8px, 12px) rotate(-20deg); }
        }
        @keyframes sig-float-leaf2 {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          50%      { transform: translate(15px, -12px) rotate(30deg); }
        }
        .float-bean-1 { animation: sig-float-bean1 8s ease-in-out infinite; }
        .float-bean-2 { animation: sig-float-bean2 7s ease-in-out infinite; }
        .float-leaf-1 { animation: sig-float-leaf1 9s ease-in-out infinite; }
        .float-leaf-2 { animation: sig-float-leaf2 10s ease-in-out infinite; }

        /* ── DETAILS PANEL ── */
        .sig-details-panel {
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .sig-details-panel:hover {
          border-color: rgba(200, 144, 16, 0.25);
          box-shadow: 0 30px 70px rgba(0,0,0,0.7), 0 0 35px rgba(200, 144, 16, 0.08);
        }
      `}</style>

      {/* Section Header */}
      <div className="text-center relative z-10 max-w-xl mx-auto mb-8 md:mb-16">
        <span className="font-body text-[10px] tracking-[0.45em] text-[#C9A84C] uppercase block mb-3">SELECT YOUR BLEND</span>
        <h2 className="font-display font-light text-3xl md:text-5xl text-white tracking-tight leading-none">
          Drinks That <em className="not-italic shimmer-text">Define Us</em>
        </h2>
      </div>

      {/* Main Grid Wrapper: Left Column details, Right Column 3D Cup */}
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 relative z-10">
        
        {/* LEFT COLUMN: Text and Specs */}
        <div className="w-full lg:w-[48%] flex flex-col text-center lg:text-left order-2 lg:order-1">
          {/* Details & Action Panel */}
          <div className="sig-details-panel w-full bg-white/[0.02] border border-white/[0.05] backdrop-blur-md rounded-[28px] p-6 md:p-8 shadow-2xl relative">
            {/* Info Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/[0.06]">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-[9px] font-body text-[#C9A84C] uppercase tracking-widest font-semibold mb-2">
                  {d.tag}
                </div>
                <h3 className="font-display text-2xl text-white font-medium leading-none">{d.name}</h3>
                <p className="font-body text-[10px] text-white/30 tracking-wider uppercase mt-1.5">{d.tagline}</p>
              </div>
              <div className="text-left sm:text-right">
                <span className="font-display text-3xl text-[#C9A84C] font-semibold">{d.price}</span>
                <p className="font-body text-[8px] text-white/20 uppercase tracking-widest mt-1">Direct Trade Value</p>
              </div>
            </div>

            {/* Description */}
            <div className="py-5">
              <p className="font-body text-xs text-white/50 leading-relaxed">{d.desc}</p>
            </div>

            {/* Brew Spec Cards */}
            <div className="grid grid-cols-3 gap-3 pt-2 pb-5 border-t border-white/[0.06]">
              <div className="text-center bg-white/[0.012] border border-white/[0.04] rounded-xl py-3 px-1">
                <p className="font-body text-[8px] text-white/25 uppercase tracking-widest mb-1">Temp</p>
                <p className="font-display text-sm text-white font-medium">{d.temp}</p>
              </div>
              <div className="text-center bg-white/[0.012] border border-white/[0.04] rounded-xl py-3 px-1">
                <p className="font-body text-[8px] text-white/25 uppercase tracking-widest mb-1">Volume</p>
                <p className="font-display text-sm text-[#C9A84C] font-medium">{d.ratio}</p>
              </div>
              <div className="text-center bg-white/[0.012] border border-white/[0.04] rounded-xl py-3 px-1">
                <p className="font-body text-[8px] text-white/25 uppercase tracking-widest mb-1">Bean Origin</p>
                <p className="font-display text-[11px] text-white font-medium truncate px-1" title={d.beans}>{d.beans}</p>
              </div>
            </div>

            {/* Main CTA: Order direct */}
            <button
              onClick={handleOrder}
              className="w-full flex items-center justify-center gap-2 bg-[#C9A84C] text-black font-body font-bold text-xs uppercase tracking-widest rounded-full py-4 hover:bg-[#e0a820] transition-colors gold-glow cursor-pointer mt-2"
            >
              <ShoppingBag size={13} /> Order {d.name} Direct
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center lg:justify-start gap-2.5 mt-6">
            {DRINKS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === active ? 'bg-[#C9A84C] w-6' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive 3D Cup Swipe Area */}
        <div className="w-full lg:w-[48%] flex flex-col items-center justify-center relative min-h-[320px] md:min-h-[380px] lg:min-h-[500px] order-1 lg:order-2">
          {/* Huge Background Text inside Right Column */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden" style={{ transform: 'translateY(-20px)' }}>
            <span
              className="sig-bg-text font-black text-transparent select-none text-[8rem] md:text-[12rem] lg:text-[14rem]"
              style={{
                WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.04)',
                transform: `translateX(${mouse.x * -35 + dragOffset * 0.3}px)`,
                opacity: 0.88,
              }}
            >
              {d.bgText}
            </span>
          </div>

          {/* Central Swipe Gallery rendering InteractiveCup */}
          <div
            className="w-full flex items-center justify-center relative z-10 cursor-grab active:cursor-grabbing py-8"
            onMouseDown={(e) => {
              e.preventDefault();
              handleDragStart(e.clientX);
            }}
            onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
            onTouchEnd={handleDragEnd}
          >
            {/* Floating Coffee Leaves & Beans */}
            <FloatingBean className="float-bean-1" style={{ top: '10%', left: '8%', transform: `translate(${mouse.x * 20 + dragOffset * 0.15}px, ${mouse.y * 20}px) scale(0.9)` }} />
            <FloatingBean className="float-bean-2" style={{ bottom: '15%', right: '10%', transform: `translate(${mouse.x * -25 + dragOffset * 0.15}px, ${mouse.y * -25}px) scale(1.1)` }} />
            <FloatingLeaf className="float-leaf-1" style={{ bottom: '10%', left: '10%', transform: `translate(${mouse.x * -15 + dragOffset * 0.2}px, ${mouse.y * 15}px) rotate(-15deg)` }} />
            <FloatingLeaf className="float-leaf-2" style={{ top: '15%', right: '12%', transform: `translate(${mouse.x * 25 + dragOffset * 0.2}px, ${mouse.y * -15}px) rotate(45deg)` }} />

            {/* Swipeable Container */}
            <div
              style={{
                transform: `translate3d(${dragOffset + mouse.x * 15}px, ${mouse.y * 15}px, ${-Math.abs(dragOffset) * 0.25}px) rotateY(${dragOffset * 0.22 + mouse.x * 12}deg) rotateX(${mouse.y * -12}deg)`,
                transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                transformStyle: 'preserve-3d',
              }}
            >
              <InteractiveCup
                img={d.img}
                name={d.name}
                drinkId={d.id}
              />
            </div>
          </div>

          {/* Swipe gesture help hint */}
          <div className="flex items-center gap-2 mt-4 opacity-50 pointer-events-none select-none relative z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-ping" />
            <span className="font-body text-[9px] uppercase tracking-[0.25em] text-[#C9A84C]">Drag / Swipe Cup To Spin Blends</span>
          </div>
        </div>

      </div>
    </section>
  );
}
