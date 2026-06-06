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
      className="relative w-full min-h-screen bg-black overflow-hidden flex items-center justify-center py-32 px-6 md:px-12"
      style={{
        backgroundImage: `
          repeating-linear-gradient(0deg, rgba(201, 168, 76, 0.02) 0px, rgba(201, 168, 76, 0.02) 1px, transparent 1px, transparent 50px),
          repeating-linear-gradient(90deg, rgba(201, 168, 76, 0.02) 0px, rgba(201, 168, 76, 0.02) 1px, transparent 1px, transparent 50px)
        `,
        backgroundSize: '50px 50px',
      }}
    >
      {/* 3 Columns Side by Side */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-5 items-stretch relative z-10 gap-6 md:gap-0">
        
        {/* Column 1 */}
        <div className="md:col-span-1 flex flex-col justify-center py-8">
          <div ref={col1Ref} className="will-change-transform">
            <span className="font-display text-[7rem] md:text-[8rem] font-light text-[#C9A84C] leading-none block mb-2 select-none">
              01
            </span>
            <h3 className="font-display text-white text-xl md:text-2xl font-medium mb-3">
              Ethiopia Yirgacheffe
            </h3>
            <p className="font-body text-xs md:text-sm text-white/50 leading-relaxed">
              Dark chocolate · Berry finish · 2100m altitude
            </p>
          </div>
        </div>

        {/* Divider 1 */}
        <div className="hidden md:flex justify-center items-center md:col-span-1">
          <div className="w-[1.5px] h-[75%] bg-[#C9A84C]/20" />
        </div>

        {/* Column 2 */}
        <div className="md:col-span-1 flex flex-col justify-center py-8">
          <div ref={col2Ref} className="will-change-transform">
            <span className="font-display text-[7rem] md:text-[8rem] font-light text-[#C9A84C] leading-none block mb-2 select-none">
              02
            </span>
            <h3 className="font-display text-white text-xl md:text-2xl font-medium mb-3">
              Colombia Huila
            </h3>
            <p className="font-body text-xs md:text-sm text-white/50 leading-relaxed">
              Caramel · Hazelnut · Washed process
            </p>
          </div>
        </div>

        {/* Divider 2 */}
        <div className="hidden md:flex justify-center items-center md:col-span-1">
          <div className="w-[1.5px] h-[75%] bg-[#C9A84C]/20" />
        </div>

        {/* Column 3 */}
        <div className="md:col-span-1 flex flex-col justify-center py-8">
          <div ref={col3Ref} className="will-change-transform">
            <span className="font-display text-[7rem] md:text-[8rem] font-light text-[#C9A84C] leading-none block mb-2 select-none">
              03
            </span>
            <h3 className="font-display text-white text-xl md:text-2xl font-medium mb-3">
              Yemen Mocha
            </h3>
            <p className="font-body text-xs md:text-sm text-white/50 leading-relaxed">
              Ancient varietals · Wine-like complexity
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
