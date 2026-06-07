import React, { useEffect, useRef, useState } from 'react';
import { Coffee, MapPin, Star, CalendarDays, ShoppingBag, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';

function useParallax(speed = 0.12) {
  const ref = useRef(null);
  const [off, setOff] = useState(0);
  useEffect(() => {
    if (window.innerWidth < 768) return;
    const fn = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      setOff((r.top + r.height / 2 - window.innerHeight / 2) * speed);
    };
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, [speed]);
  return [ref, off];
}

export default function Hero() {
  const statsRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [pRef, off] = useParallax(0.12);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Custom Cursor — desktop only
  useEffect(() => {
    if (isMobile) return;
    const cursor = document.getElementById('cursor');
    const trail = document.getElementById('cursor-trail');
    let mx = 0, my = 0, tx = 0, ty = 0;
    const onMouseMove = (e) => {
      mx = e.clientX; my = e.clientY;
      if (cursor) cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
    };
    const updateTrail = () => {
      tx += (mx - tx) * 0.12; ty += (my - ty) * 0.12;
      if (trail) trail.style.transform = `translate(${tx - 18}px, ${ty - 18}px)`;
      requestAnimationFrame(updateTrail);
    };
    window.addEventListener('mousemove', onMouseMove);
    const rafId = requestAnimationFrame(updateTrail);
    const onMouseOver = (e) => {
      setHovered(!!(e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')));
    };
    window.addEventListener('mouseover', onMouseOver);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  useEffect(() => {
    if (!statsRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(statsRef.current.children, { y: 20, opacity: 0, stagger: 0.15, duration: 0.8, delay: 1, ease: 'power3.out' });
    }, statsRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" className="relative w-full bg-black overflow-hidden flex flex-col justify-between" style={{ minHeight: '100svh' }}>
      <style>{`
        @keyframes scroll-hint-anim {
          0%   { transform: scaleY(0); transform-origin: top; }
          50%  { transform: scaleY(1); transform-origin: top; }
          50.1%{ transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
        @keyframes text-in {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .text-in-1 { opacity:0; animation: text-in 0.8s 0.15s cubic-bezier(0.16,1,0.3,1) forwards; }
        .text-in-2 { opacity:0; animation: text-in 0.8s 0.3s  cubic-bezier(0.16,1,0.3,1) forwards; }
        .text-in-3 { opacity:0; animation: text-in 0.8s 0.5s  cubic-bezier(0.16,1,0.3,1) forwards; }
        .text-in-4 { opacity:0; animation: text-in 0.8s 0.7s  cubic-bezier(0.16,1,0.3,1) forwards; }
      `}</style>

      {/* Desktop cursor */}
      <div id="cursor"       className="hidden md:block" style={{ position:'fixed',left:0,top:0,width:'12px',height:'12px',backgroundColor:hovered?'transparent':'#C9A84C',border:hovered?'1.5px solid #C9A84C':'none',borderRadius:'50%',pointerEvents:'none',zIndex:9999,transform:'translate(-100px,-100px)',transition:'background-color 0.2s,border 0.2s' }} />
      <div id="cursor-trail" className="hidden md:block" style={{ position:'fixed',left:0,top:0,width:'36px',height:'36px',border:'1.5px solid #C9A84C',borderRadius:'50%',pointerEvents:'none',zIndex:9998,opacity:hovered?0:0.6,transform:'translate(-100px,-100px)',transition:'opacity 0.2s' }} />

      {/* ── Background Video Container (Universal) ── */}
      <div ref={pRef} className="absolute inset-0" style={{ transform: `translateY(${off}px) scale(${isMobile ? 1.08 : 1.18})`, zIndex: 0 }}>
        <video
          src="/coffee.mp4"
          autoPlay
          loop
          muted
          playsInline
          ref={(el) => {
            if (el) {
              el.muted = true;
              el.defaultMuted = true;
              el.play().catch(err => console.log('Video play error:', err));
            }
          }}
          className="w-full h-full object-cover"
          style={{ 
            opacity: isMobile ? 0.85 : 0.65,
            objectPosition: isMobile ? '68% center' : 'center center'
          }}
        />
      </div>

      {/* Gradients & ambient overlays to ensure text readability */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: 'linear-gradient(to bottom, rgba(6,4,12,0.45) 0%, transparent 28%, transparent 52%, rgba(6,4,12,0.88) 82%, rgba(6,4,12,1) 100%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: isMobile ? 'rgba(6,4,12,0.18)' : 'linear-gradient(to right, rgba(6,4,12,0.72) 0%, transparent 55%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2, backdropFilter: isMobile ? 'none' : 'blur(8px)', WebkitBackdropFilter: isMobile ? 'none' : 'blur(8px)', maskImage: 'linear-gradient(to top, black 0%, black 12%, transparent 32%)', WebkitMaskImage: 'linear-gradient(to top, black 0%, black 12%, transparent 32%)' }} />
      {!isMobile && <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)', width: '600px', height: '600px', zIndex: 1 }} />}

      {/* ── Main Content Area (Unified Layout) ── */}
      <div className="flex-1 w-full px-6 md:px-12 flex flex-col justify-between items-center md:items-start relative z-20 pt-24 pb-20 md:pb-32">
        <div className="w-full md:w-[50%] flex-1 flex flex-col items-center md:items-start justify-between md:justify-center md:gap-8">
          
          {/* Top block (Text) */}
          <div className="flex flex-col items-center md:items-start pt-4 md:pt-0">
            {/* Tags */}
            <div className="flex flex-wrap gap-4 mb-4 text-[10px] text-white/50 font-body font-medium tracking-wider uppercase justify-center md:justify-start text-in-1">
              <span className="flex items-center gap-1.5 text-[#C9A84C]">
                <Coffee size={11} /> Specialty Coffee
              </span>
              <span className="flex items-center gap-1.5 text-white/40">
                <Star size={11} className="fill-current text-[#C9A84C]" /> 4.9 · 2.4k
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-light text-[3.2rem] md:text-[5.5rem] lg:text-[6.5rem] text-white leading-[0.92] md:leading-[0.9] tracking-[-0.02em] mb-6 text-in-2 text-center md:text-left" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.85)' }}>
              Crafted<br />
              <em className="not-italic italic shimmer-text">With Intent</em>
            </h1>

            {/* Subtitle */}
            <p className="font-body text-[13.5px] md:text-base text-white/75 font-light max-w-sm mb-0 leading-relaxed text-in-3 text-center md:text-left" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}>
              From volcanic highlands to your cup. Precision-extracted at 93°C, served exactly as nature intended.
            </p>
          </div>

          {/* Middle Spacer for mobile only (to leave the background video cup visible in the center) */}
          <div className="h-32 md:hidden" />

          {/* Bottom block (Buttons) */}
          <div className="flex gap-4 items-center justify-center md:justify-start text-in-4 pb-4 md:pb-0">
            <a href="#menu" className="group flex items-center gap-2 bg-[#C9A84C] text-black rounded-full font-semibold px-7 py-3 md:px-9 md:py-3.5 text-xs md:text-sm tracking-widest uppercase hover:bg-[#e0a820] transition-all gold-glow font-body">
              <ShoppingBag size={13} /> Order Online <ArrowRight size={13} className="hidden md:inline transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#reserve" className="glass flex items-center gap-2 rounded-full px-7 py-3 md:px-9 md:py-3.5 text-xs md:text-sm text-white font-medium tracking-widest uppercase hover:bg-white/[0.08] transition-all font-body">
              <CalendarDays size={13} /> Reserve Table
            </a>
          </div>
        </div>
      </div>

      {/* ── Stats Bar (Universal) ── */}
      <div className="border-t border-white/[0.08] bg-black/60 backdrop-blur-md relative z-20">
        <div className="w-full px-6 md:px-12 py-5 md:py-8 flex justify-between items-center" ref={statsRef}>
          {[{ val: '50+', label: 'Varieties' }, { val: '2K+', label: 'Customers' }, { val: '4.9★', label: 'Rating' }, { val: '93°C', label: 'Precision' }].map((s, i) => (
            <div key={s.label} className={`flex-1 text-center md:text-left ${i !== 0 ? 'border-l border-[#C9A84C]/30 pl-4 md:pl-6' : ''}`}>
              <p className="font-body text-xl md:text-3xl font-bold text-[#C9A84C] tracking-tight">{s.val}</p>
              <p className="font-body text-[8px] md:text-[9px] text-white/40 uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator for desktop */}
      {!isMobile && (
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none">
          <span className="font-body text-[9px] tracking-[0.3em] uppercase text-[#C9A84C]">Scroll</span>
          <div className="w-[1.5px] h-8 bg-amber-500/20 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full bg-[#C9A84C]" style={{ animation: 'scroll-hint-anim 2.2s cubic-bezier(0.16,1,0.3,1) infinite' }} />
          </div>
        </div>
      )}
    </section>
  );
}
