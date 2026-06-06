import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function OriginParallax() {
  const containerRef = useRef(null);
  const col1Ref = useRef(null);
  const col2Ref = useRef(null);
  const col3Ref = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);

    // Staggered column offsets relative to viewport scroll
    const a1 = gsap.to(col1Ref.current, {
      y: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    const a2 = gsap.to(col2Ref.current, {
      y: -120,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    });

    const a3 = gsap.to(col3Ref.current, {
      y: -180,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      },
    });

    return () => {
      if (a1.scrollTrigger) a1.scrollTrigger.kill();
      a1.kill();
      if (a2.scrollTrigger) a2.scrollTrigger.kill();
      a2.kill();
      if (a3.scrollTrigger) a3.scrollTrigger.kill();
      a3.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center py-28 md:py-36 px-6 md:px-12"
      style={{
        backgroundImage: `
          repeating-linear-gradient(0deg, rgba(201, 168, 76, 0.02) 0px, rgba(201, 168, 76, 0.02) 1px, transparent 1px, transparent 50px),
          repeating-linear-gradient(90deg, rgba(201, 168, 76, 0.02) 0px, rgba(201, 168, 76, 0.02) 1px, transparent 1px, transparent 50px)
        `,
        backgroundSize: '50px 50px',
      }}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-[10%] w-96 h-96 rounded-full bg-[#C9A84C]/5 filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[10%] w-96 h-96 rounded-full bg-[#C9A84C]/5 filter blur-[100px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center relative z-10 max-w-xl mx-auto mb-16 md:mb-24">
        <span className="font-body text-[10px] tracking-[0.45em] text-[#C9A84C] uppercase block mb-3">DISCOVER THE ORIGINS</span>
        <h2 className="font-display font-light text-3xl md:text-5xl text-white tracking-tight leading-none mb-6">
          Single-Origin <em className="not-italic shimmer-text">Terroirs</em>
        </h2>
        <p className="font-body text-xs md:text-sm text-white/40 leading-relaxed">
          Every harvest tells a story of its unique microclimate, volcanic soil, and altitude. We trace every bean to single estates that prioritize organic, regenerative farming.
        </p>
      </div>

      {/* 3 Columns Card Grid */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 items-start relative z-10 gap-10 md:gap-8">
        
        {/* Card 1 */}
        <div ref={col1Ref} className="will-change-transform">
          <div className="glass-warm bg-white/[0.01] border border-white/[0.05] hover:border-[#C9A84C]/25 rounded-[32px] overflow-hidden p-5 flex flex-col transition-all duration-500 shadow-2xl relative group cursor-pointer hover:-translate-y-2 hover:shadow-[#C9A84C]/5">
            {/* Outline background number */}
            <span className="absolute top-2 right-6 font-display text-[5.5rem] font-bold text-transparent select-none opacity-15 transition-opacity duration-500 group-hover:opacity-25"
                  style={{ WebkitTextStroke: '1.5px #C9A84C' }}>
              01
            </span>

            {/* Image Container */}
            <div className="w-full h-56 md:h-64 overflow-hidden rounded-2xl relative mb-6 shadow-xl border border-white/[0.03]">
              <img
                src="/img/ethiopia_origin.png"
                alt="Ethiopia Yirgacheffe"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="px-2.5 py-1 rounded-full bg-black/60 border border-white/10 text-[9px] font-body tracking-widest text-[#C9A84C] uppercase">
                  YIRGACHEFFE
                </span>
              </div>
            </div>

            {/* Info details */}
            <h3 className="font-display text-white text-xl md:text-2xl font-semibold mb-2 group-hover:text-[#C9A84C] transition-colors">
              Ethiopia Yirgacheffe
            </h3>
            <p className="font-body text-xs text-[#C9A84C] tracking-widest uppercase mb-4">
              2,100m Altitude · Heirloom
            </p>
            <p className="font-body text-[12.5px] text-white/55 leading-relaxed">
              Cultivated in misty highlands, offering a clean, tea-like body, jasmine fragrance, and complex notes of dark chocolate and fresh berry finish.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div ref={col2Ref} className="will-change-transform mt-0 md:mt-12">
          <div className="glass-warm bg-white/[0.01] border border-white/[0.05] hover:border-[#C9A84C]/25 rounded-[32px] overflow-hidden p-5 flex flex-col transition-all duration-500 shadow-2xl relative group cursor-pointer hover:-translate-y-2 hover:shadow-[#C9A84C]/5">
            <span className="absolute top-2 right-6 font-display text-[5.5rem] font-bold text-transparent select-none opacity-15 transition-opacity duration-500 group-hover:opacity-25"
                  style={{ WebkitTextStroke: '1.5px #C9A84C' }}>
              02
            </span>

            <div className="w-full h-56 md:h-64 overflow-hidden rounded-2xl relative mb-6 shadow-xl border border-white/[0.03]">
              <img
                src="/img/colombia_origin.png"
                alt="Colombia Huila"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="px-2.5 py-1 rounded-full bg-black/60 border border-white/10 text-[9px] font-body tracking-widest text-[#C9A84C] uppercase">
                  HUILA VALLEY
                </span>
              </div>
            </div>

            <h3 className="font-display text-white text-xl md:text-2xl font-semibold mb-2 group-hover:text-[#C9A84C] transition-colors">
              Colombia Huila
            </h3>
            <p className="font-body text-xs text-[#C9A84C] tracking-widest uppercase mb-4">
              1,750m Altitude · Caturra
            </p>
            <p className="font-body text-[12.5px] text-white/55 leading-relaxed">
              Balanced and rich with warm caramel sweetness and toasted hazelnut undertones, harvested along the warm, sun-kissed slopes of the Huila river basin.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div ref={col3Ref} className="will-change-transform mt-0 md:mt-6">
          <div className="glass-warm bg-white/[0.01] border border-white/[0.05] hover:border-[#C9A84C]/25 rounded-[32px] overflow-hidden p-5 flex flex-col transition-all duration-500 shadow-2xl relative group cursor-pointer hover:-translate-y-2 hover:shadow-[#C9A84C]/5">
            <span className="absolute top-2 right-6 font-display text-[5.5rem] font-bold text-transparent select-none opacity-15 transition-opacity duration-500 group-hover:opacity-25"
                  style={{ WebkitTextStroke: '1.5px #C9A84C' }}>
              03
            </span>

            <div className="w-full h-56 md:h-64 overflow-hidden rounded-2xl relative mb-6 shadow-xl border border-white/[0.03]">
              <img
                src="/img/yemen_origin.png"
                alt="Yemen Mocha"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="px-2.5 py-1 rounded-full bg-black/60 border border-white/10 text-[9px] font-body tracking-widest text-[#C9A84C] uppercase">
                  HARAZ TERRACES
                </span>
              </div>
            </div>

            <h3 className="font-display text-white text-xl md:text-2xl font-semibold mb-2 group-hover:text-[#C9A84C] transition-colors">
              Yemen Mocha
            </h3>
            <p className="font-body text-xs text-[#C9A84C] tracking-widest uppercase mb-4">
              2,200m Altitude · Udaini
            </p>
            <p className="font-body text-[12.5px] text-white/55 leading-relaxed">
              Traced to ancient mountain terraces. Naturally sun-dried, offering a dense, heavy body with exotic wine-like complexity and spiced fruit notes.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
