import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SideRevealPhotos() {
  const containerRef = useRef(null);
  const leftPhotoRef = useRef(null);
  const rightPhotoRef = useRef(null);
  const centerTextRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const leftPhoto = leftPhotoRef.current;
    const rightPhoto = rightPhotoRef.current;
    const centerText = centerTextRef.current;

    if (!container || !leftPhoto || !rightPhoto || !centerText) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      gsap.set(leftPhoto, { x: '-40%', rotateY: 0, rotateZ: 0, scale: 1 });
      gsap.set(rightPhoto, { x: '40%', rotateY: 0, rotateZ: 0, scale: 1 });
      gsap.set(centerText, { opacity: 1, scale: 1, y: 0 });
      return;
    }

    // Create a scrubbed GSAP timeline driven by ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top bottom', // start animating when container top hits viewport bottom
        end: 'bottom top',   // end when container bottom leaves viewport top
        scrub: 0.5,          // smooth transition linked to scroll velocity (snappier scrub: 0.5)
      }
    });

    // Animate photos splitting outwards and rotating in 3D
    tl.to(leftPhoto, {
      x: '-45%',
      rotateY: -8,
      rotateZ: -2,
      scale: 0.98,
      ease: 'power1.out',
    }, 0)
    .to(rightPhoto, {
      x: '45%',
      rotateY: 8,
      rotateZ: 2,
      scale: 0.98,
      ease: 'power1.out',
    }, 0)
    .to(centerText, {
      opacity: 1,
      scale: 1,
      y: 0,
      ease: 'power2.out',
    }, 0.1);

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[80vh] md:h-screen bg-[#070508] flex items-center justify-center overflow-hidden px-6 md:px-12"
      style={{ perspective: '1200px' }}
    >
      {/* Background soft gold glow */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[350px] bg-gradient-to-r from-amber-500/0 via-amber-500/[0.04] to-amber-500/0 filter blur-3xl pointer-events-none" />

      {/* Floating Left Photo */}
      <div
        ref={leftPhotoRef}
        className="absolute w-[260px] sm:w-[320px] md:w-[400px] aspect-[4/5] rounded-3xl overflow-hidden z-20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/[0.06] transition-all will-change-transform pointer-events-none"
        style={{
          left: '50%',
          transform: 'translateX(-85%) rotateY(-5deg) scale(1.05)',
          transformOrigin: 'right center',
        }}
      >
        <img
          src="/img/latte.png"
          alt="Artisanal Latte Art"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Center Reveal Content */}
      <div
        ref={centerTextRef}
        className="text-center max-w-2xl px-4 z-10 opacity-0 scale-90 translate-y-8 will-change-transform"
      >
        <span className="font-body text-[11px] tracking-[0.45em] text-[#c89010] uppercase mb-4 block">
          THE OBSIDIAN WAY
        </span>
        <h2 className="font-display font-light text-4xl md:text-6xl text-white tracking-tight leading-[1.05] mb-6">
          Precision Roasted.<br />
          <em className="font-display italic text-[#c89010] not-italic">Artfully Poured.</em>
        </h2>
        <p className="font-body text-sm md:text-base text-white/50 leading-relaxed max-w-lg mx-auto">
          We source beans from volcanic micro-lots, roasting in micro-batches to bring out notes of stone fruit, vanilla, and chocolate. Every pour is a dedication to the craft.
        </p>
      </div>

      {/* Floating Right Photo */}
      <div
        ref={rightPhotoRef}
        className="absolute w-[260px] sm:w-[320px] md:w-[400px] aspect-[4/5] rounded-3xl overflow-hidden z-20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/[0.06] transition-all will-change-transform pointer-events-none"
        style={{
          right: '50%',
          transform: 'translateX(-15%) rotateY(5deg) scale(1.05)',
          transformOrigin: 'left center',
        }}
      >
        <img
          src="/img/coldbrew.png"
          alt="Signature Cold Brew"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>
    </section>
  );
}
