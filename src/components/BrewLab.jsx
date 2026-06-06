import React, { useState, useRef, useEffect } from 'react';
import InteractiveCup from './InteractiveCup';
import ScrollPerspectiveSection from './ScrollPerspectiveSection';
import useReveal from '../hooks/useReveal';
import { Coffee, Flame, Snowflake, Sparkles } from 'lucide-react';

const COFFEE_STYLES = [
  {
    id: 'espresso',
    name: 'Obsidian Espresso',
    desc: 'Double shot of pure volcanic single-origin espresso. High concentration of coffee oils, thick hazelnut crema, and intense dark cocoa notes.',
    img: '/img/espresso_render.png',
    liquidColor: 0x1c0b02,
    liquidLevel: 0.35,
    steamOpacity: 1.0,
    beanSpeed: 1.6,
    temp: '93°C',
    volume: '45ml',
    ratio: '100% Espresso',
    time: '26s extraction',
    icon: Flame,
    colorClass: 'text-red-400',
  },
  {
    id: 'latte',
    name: 'Signature Latte',
    desc: 'A shot of sweet espresso blended with smooth textured microfoam, finished with rosetta art. Creamy mouthfeel with sweet caramel notes.',
    img: '/img/latte_render.png',
    liquidColor: 0xa8764a,
    liquidLevel: 0.95,
    steamOpacity: 0.7,
    beanSpeed: 1.0,
    temp: '68°C',
    volume: '240ml',
    ratio: '30% Espresso · 60% Steamed Milk · 10% Foam',
    time: 'Flat texture',
    icon: Coffee,
    colorClass: 'text-amber-400',
  },
  {
    id: 'coldbrew',
    name: 'Volcanic Cold Brew',
    desc: 'Slow-steeped for 24 hours in cold volcanic-filtered water. Naturally sweet, low acidity, featuring hints of stone fruit and a smooth chocolate finish.',
    img: '/img/coldbrew_render.png',
    liquidColor: 0x0f0501,
    liquidLevel: 0.88,
    steamOpacity: 0.0,
    beanSpeed: 0.4,
    temp: '4°C',
    volume: '300ml',
    ratio: '100% 24hr Cold-Steeped',
    time: 'Chilled over ice',
    icon: Snowflake,
    colorClass: 'text-blue-400',
  },
  {
    id: 'flatwhite',
    name: 'Rosetta Flat White',
    desc: 'Double ristretto espresso topped with a thin layer of velvety wet milk foam. Delivers a punchy coffee flavor balanced by delicate sweetness.',
    img: '/img/flatwhite_render.png',
    liquidColor: 0x8a582f,
    liquidLevel: 0.82,
    steamOpacity: 0.85,
    beanSpeed: 1.2,
    temp: '65°C',
    volume: '180ml',
    ratio: '40% Espresso · 50% Wet Milk · 10% Microfoam',
    time: 'Velvet foam',
    icon: Sparkles,
    colorClass: 'text-yellow-400',
  }
];

export default function BrewLab() {
  const [activeStyle, setActiveStyle] = useState(COFFEE_STYLES[1]); // Signature Latte default
  const [hRef, hVis] = useReveal(0.2);
  const [cRef, cVis] = useReveal(0.12);

  // Drag/Swipe Gesture State
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);

  const handleDragStart = (clientX) => {
    setIsDragging(true);
    startXRef.current = clientX;
  };

  const handleDragMove = (clientX) => {
    if (!isDragging) return;
    setDragOffset(clientX - startXRef.current);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 60; // px to switch style
    const currentIndex = COFFEE_STYLES.findIndex(s => s.id === activeStyle.id);
    if (dragOffset < -threshold) {
      // Swipe Left -> Next Style
      const nextIndex = (currentIndex + 1) % COFFEE_STYLES.length;
      setActiveStyle(COFFEE_STYLES[nextIndex]);
    } else if (dragOffset > threshold) {
      // Swipe Right -> Prev Style
      const prevIndex = (currentIndex - 1 + COFFEE_STYLES.length) % COFFEE_STYLES.length;
      setActiveStyle(COFFEE_STYLES[prevIndex]);
    }
    setDragOffset(0);
  };

  // Bind mouse drag to document for release outside of area
  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e) => handleDragMove(e.clientX);
    const onMouseUp = () => handleDragEnd();

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging]);

  return (
    <ScrollPerspectiveSection
      id="brew-lab"
      className="bg-gradient-to-b from-[#06040c] via-[#160f08] to-[#06040c] py-20 px-6 relative overflow-hidden scene"
    >
      {/* Background blur decoration */}
      <div className="absolute right-[-10%] top-1/3 w-[450px] h-[450px] bg-[#C9A84C]/[0.055] filter blur-3xl pointer-events-none rounded-full" />
      <div className="absolute left-[-10%] bottom-1/4 w-[350px] h-[350px] bg-[#C9A84C]/[0.03] filter blur-3xl pointer-events-none rounded-full" />

      {/* Header */}
      <div ref={hRef} className={`text-center mb-10 door-reveal ${hVis ? 'open' : ''}`}>
        <p className="text-[11px] tracking-[0.42em] uppercase font-body mb-4 text-[#c89010]">
          3D BREWING LABORATORY
        </p>
        <h2 className="font-display font-light text-3xl md:text-5xl text-white tracking-[-0.02em] mb-3">
          Explore Your Cup
        </h2>
        <p className="font-body text-sm text-white/30 max-w-sm mx-auto hidden md:block">
          Select a coffee recipe to interactively view the drink layers, temperature, and extraction speed in real-time.
        </p>
        <p className="font-body text-xs text-white/30 max-w-xs mx-auto md:hidden">
          Swipe the cup to inspect layers, temperature, and recipe composition.
        </p>
      </div>

      {/* Main Grid */}
      <div
        ref={cRef}
        className={`max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 items-center rise ${cVis ? 'open' : ''}`}
      >
        {/* Selection Controls (Left) — Hidden on Mobile, Visible on Desktop */}
        <div className="hidden lg:flex lg:col-span-5 flex-col gap-4">
          {COFFEE_STYLES.map((style) => {
            const isActive = style.id === activeStyle.id;
            const Icon = style.icon;
            return (
              <button
                key={style.id}
                onClick={() => setActiveStyle(style)}
                className={`text-left p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer relative group overflow-hidden ${
                  isActive
                    ? 'bg-white/[0.04] border-[#c89010] shadow-[0_10px_30px_rgba(200,144,16,0.1)]'
                    : 'bg-transparent border-white/[0.05] hover:border-white/20'
                }`}
              >
                {/* Gold gradient sweep on hover */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-500/0 via-amber-500/[0.02] to-amber-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

                <div className={`p-3 rounded-xl bg-white/[0.03] transition-all duration-300 shrink-0 ${
                  isActive ? 'bg-[#c89010]/10 text-[#c89010]' : 'text-white/40 group-hover:text-white/80'
                }`}>
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className={`font-display text-lg font-medium transition-colors ${
                    isActive ? 'text-white' : 'text-white/60 group-hover:text-white'
                  }`}>
                    {style.name}
                  </h3>
                  <p className="font-body text-xs text-white/40 mt-1 leading-relaxed line-clamp-2">
                    {style.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* 3D Viewer & Stats (Right) */}
        <div className="lg:col-span-7 flex flex-col md:flex-row items-center justify-between p-5 md:p-8 rounded-3xl border border-white/[0.05] bg-gradient-to-br from-white/[0.02] to-white/[0.005] backdrop-blur-md shadow-2xl relative select-none">
          
          {/* Swipable 3D Image Container */}
          <div 
            className="flex-1 flex flex-col justify-center items-center cursor-grab active:cursor-grabbing"
            onMouseDown={(e) => handleDragStart(e.clientX)}
            onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
            onTouchEnd={handleDragEnd}
          >
            {/* 3D Floating Image Card */}
            <div 
              style={{
                transform: `translate3d(${dragOffset}px, 0, 0) rotateY(${dragOffset * 0.22}deg)`,
                transition: isDragging ? 'none' : 'transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }}
            >
              <InteractiveCup
                img={activeStyle.img}
                name={activeStyle.name}
                drinkId={activeStyle.id}
              />
            </div>

            {/* Drag Help hint — Mobile only */}
            <div className="flex items-center gap-1.5 mt-2 opacity-50 pointer-events-none select-none lg:hidden">
              <span className="w-1 h-1 rounded-full bg-[#c89010] animate-ping" />
              <span className="font-body text-[8px] uppercase tracking-[0.2em] text-[#c89010]">Swipe Cup to Swap Recipes</span>
            </div>

            {/* Dots navigation — Mobile only */}
            <div className="flex justify-center gap-2.5 mt-4 mb-6 lg:hidden">
              {COFFEE_STYLES.map((style, i) => (
                <button
                  key={style.id}
                  onClick={() => setActiveStyle(style)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    style.id === activeStyle.id ? 'bg-[#c89010] w-5' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Extract Metrics Panel */}
          <div className="w-full md:w-[220px] shrink-0 border-t md:border-t-0 md:border-l border-white/[0.08] pt-6 md:pt-0 md:pl-8 flex flex-col justify-center gap-6">
            <div>
              <p className="font-body text-[9px] tracking-widest text-[#c89010] uppercase">
                Brew Extraction
              </p>
              <h4 className="font-display text-xl text-white font-medium mt-1">
                {activeStyle.name}
              </h4>
              <p className="font-body text-xs text-white/40 mt-2 leading-relaxed lg:hidden">
                {activeStyle.desc}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
              {[
                { label: 'TEMP', val: activeStyle.temp },
                { label: 'VOLUME', val: activeStyle.volume },
                { label: 'RATIO', val: activeStyle.ratio },
                { label: 'NOTE', val: activeStyle.time },
              ].map((m) => (
                <div key={m.label} className="border-l border-[#c89010]/30 pl-3">
                  <span className="font-body text-[8px] text-white/30 tracking-widest uppercase block">
                    {m.label}
                  </span>
                  <span className="font-display text-sm text-white font-light mt-0.5 block truncate">
                    {m.val}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-[10px] font-body text-white/20 uppercase tracking-widest text-right md:text-left mt-2 select-none">
              ✦ Real-time 3D Shader
            </div>
          </div>

        </div>
      </div>
    </ScrollPerspectiveSection>
  );
}
