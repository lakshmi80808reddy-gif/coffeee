import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CHAPTERS = [
  {
    num: '01',
    label: 'Chapter 01 · Harvest',
    img: '/img/harvest.png',
    imgAlt: 'Volcanic soil harvest',
    words: ['From', 'volcanic', 'highlands.'],
    imgSide: 'left',
  },
  {
    num: '02',
    label: 'Chapter 02 · Extraction',
    img: '/img/extraction.png',
    imgAlt: 'Precision espresso extraction',
    words: ['Precision', 'extracted.'],
    imgSide: 'right',
  },
  {
    num: '03',
    label: 'Chapter 03 · Served',
    img: '/img/latte.png',
    imgAlt: 'Craft latte served',
    words: ['Served', 'exactly', 'as', 'nature', 'intended.'],
    imgSide: 'left',
  },
];

/* ── MOBILE version: simple stacked image + text ── */
function ChapterMobile({ chapter }) {
  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)]" style={{ aspectRatio: '4/3' }}>
      <img
        src={chapter.img}
        alt={chapter.imgAlt}
        className="w-full h-full object-cover"
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Text overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-[1.5px] bg-[#C9A84C]" />
          <span className="font-body text-[9px] tracking-[0.38em] uppercase text-[#C9A84C]">{chapter.label}</span>
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-0">
          {chapter.words.map((w, i) => (
            <span key={i} className="font-display font-light text-white leading-tight" style={{ fontSize: 'clamp(2rem, 9vw, 3rem)' }}>
              {w}
            </span>
          ))}
        </div>
      </div>

      {/* Chapter number watermark */}
      <div className="absolute top-4 right-5 pointer-events-none select-none">
        <span className="font-display text-[6rem] text-[#C9A84C] font-light leading-none opacity-[0.12]">
          {chapter.num}
        </span>
      </div>
    </div>
  );
}

/* ── DESKTOP version: split side-by-side ── */
function ChapterSlide({ chapter, slideRef, isFirst = false }) {
  const isLeft = chapter.imgSide === 'left';

  const imageBlock = (
    <div className={`relative w-[44%] md:w-[46%] h-full shrink-0 ${isLeft ? '' : 'order-2'}`}>
      <div className="absolute top-24 bottom-10 left-10 right-10 rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.85)]">
        <img
          src={chapter.img}
          alt={chapter.imgAlt}
          className="w-full h-full object-cover rounded-3xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none rounded-3xl" />
      </div>
      <div className="absolute top-28 left-14 w-5 h-5 border-t-2 border-l-2 border-[#C9A84C]/60 pointer-events-none" />
      <div className="absolute bottom-14 right-14 w-5 h-5 border-b-2 border-r-2 border-[#C9A84C]/60 pointer-events-none" />
    </div>
  );

  const textBlock = (
    <div className={`flex-1 relative flex flex-col justify-center ${isLeft ? 'pl-14 pr-8' : 'pr-14 pl-8 order-1'}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-[1.5px] bg-[#C9A84C]" />
        <span className="font-body text-[10px] tracking-[0.38em] uppercase text-[#C9A84C]">{chapter.label}</span>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {chapter.words.map((w, i) => (
          <span key={i} className="chapter-word font-display font-light leading-[1.05] text-white" style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}>
            {w}
          </span>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-display text-[20vw] text-[#C9A84C] font-light leading-none opacity-[0.055]">
          {chapter.num}
        </span>
      </div>
    </div>
  );

  const divider = (
    <div className="w-[1px] bg-gradient-to-b from-transparent via-[#C9A84C]/20 to-transparent self-stretch shrink-0 my-12" />
  );

  return (
    <div ref={slideRef} className="absolute inset-0 flex items-stretch" style={{ opacity: isFirst ? 1 : 0 }}>
      {isLeft ? <>{imageBlock}{divider}{textBlock}</> : <>{textBlock}{divider}{imageBlock}</>}
    </div>
  );
}

export default function ScrollCinematic() {
  const sectionRef = useRef(null);
  const lineRef    = useRef(null);
  const slide1Ref  = useRef(null);
  const slide2Ref  = useRef(null);
  const slide3Ref  = useRef(null);
  const desktopWrapRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    // Only run pinned GSAP scroll on desktop and when reduced motion is not preferred
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (window.innerWidth < 768 || reduced) return;

    const el = sectionRef.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const s1 = slide1Ref.current;
      const s2 = slide2Ref.current;
      const s3 = slide3Ref.current;
      const line = lineRef.current;

      gsap.set(s2, { x: 50, opacity: 0 });
      gsap.set(s3, { x: 50, opacity: 0 });

      const w2 = s2?.querySelectorAll('.chapter-word');
      const w3 = s3?.querySelectorAll('.chapter-word');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: '+=250%',
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(line, { width: '100%', duration: 3, ease: 'none' }, 0);
      // s1 starts visible (opacity: 1), so we just animate its exit transition
      tl.to(s1, { opacity: 0, x: -50, duration: 0.35, ease: 'power2.in' }, 0.95);
      tl.to(s2, { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' }, 1.1);
      tl.fromTo(w2, { opacity: 0, y: 35 }, { opacity: 1, y: 0, stagger: 0.14, duration: 0.5, ease: 'power3.out' }, 1.15);
      tl.to(s2, { opacity: 0, x: -50, duration: 0.35, ease: 'power2.in' }, 1.9);
      tl.to(el, { backgroundColor: '#f5edd6', duration: 0.35 }, 2.0);
      tl.to(s3, { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' }, 2.05);
      tl.to(w3, { color: '#160e04', duration: 0.2 }, 2.05);
      tl.fromTo(w3, { opacity: 0, y: 35 }, { opacity: 1, y: 0, stagger: 0.09, duration: 0.5, ease: 'power3.out' }, 2.1);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── MOBILE & REDUCED MOTION: simple stacked cards ── */}
      <section className={`${prefersReducedMotion ? 'block py-24 px-6 md:px-12 max-w-6xl mx-auto' : 'md:hidden'} bg-black py-16 px-5 relative overflow-hidden`}>
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="font-body text-[10px] tracking-[0.42em] uppercase text-[#C9A84C] mb-3">Our Story</p>
          <h2 className="font-display font-light text-3xl text-white tracking-[-0.02em]">
            From Bean<br /><em className="not-italic shimmer-text">To Cup</em>
          </h2>
        </div>
        {/* Gold progress line (decorative) */}
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent mb-8" />
        <div className={prefersReducedMotion ? 'grid grid-cols-1 md:grid-cols-3 gap-8' : 'flex flex-col gap-5'}>
          {CHAPTERS.map((ch) => (
            <ChapterMobile key={ch.num} chapter={ch} />
          ))}
        </div>
      </section>

      {/* ── DESKTOP: pinned GSAP scroll ── */}
      <div
        ref={sectionRef}
        id="scroll-cinematic"
        className={`${prefersReducedMotion ? 'hidden' : 'hidden md:block'} relative w-full h-screen bg-black overflow-hidden`}
      >
        <div ref={lineRef} className="absolute top-0 left-0 h-[2.5px] bg-[#C9A84C] z-40" style={{ width: '0%' }} />
        <div className="absolute bottom-7 right-8 z-30 flex items-center gap-2 opacity-25 pointer-events-none">
          <span className="font-body text-[9px] tracking-[0.3em] uppercase text-white">Scroll</span>
          <div className="w-10 h-[1px] bg-white" />
        </div>
        <ChapterSlide chapter={CHAPTERS[0]} slideRef={slide1Ref} isFirst={true} />
        <ChapterSlide chapter={CHAPTERS[1]} slideRef={slide2Ref} />
        <ChapterSlide chapter={CHAPTERS[2]} slideRef={slide3Ref} />
      </div>
    </>
  );
}
