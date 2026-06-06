import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Check, Award, ShieldAlert } from 'lucide-react';

/* ── MOBILE: feature checklist comparison ── */
function MobileComparison() {
  const FEATURES = [
    { label: 'Weekly Fresh Roast'     },
    { label: 'Single Origin Beans'    },
    { label: 'PID Temp Control 93°C'  },
    { label: 'Hand-crafted Latte Art' },
    { label: 'Bean Traceability'      },
    { label: 'Barista Excellence'     },
  ];

  return (
    <section id="difference" className="md:hidden bg-[#06040c] py-14 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 40% at 50% 30%, rgba(201,168,76,0.05) 0%, transparent 70%)'
      }} />

      {/* Header */}
      <div className="text-center mb-8">
        <span className="font-body text-[9px] tracking-[0.42em] text-[#C9A84C] uppercase block mb-2">The Craft Comparison</span>
        <h2 className="font-display font-light text-[1.9rem] text-white leading-tight tracking-[-0.02em]">
          Why Obsidian<br /><em className="not-italic shimmer-text">Wins Every Time</em>
        </h2>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-[1fr_60px_60px] items-end px-4 pb-2 mb-1">
        <span className="font-body text-[8px] text-white/25 uppercase tracking-widest">Feature</span>
        <div className="text-center">
          <p className="font-body text-[8px] text-[#C9A84C] uppercase tracking-widest">Obsidian</p>
          <p className="font-display text-[13px] text-[#C9A84C] font-bold">4.9★</p>
        </div>
        <div className="text-center">
          <p className="font-body text-[8px] text-white/25 uppercase tracking-widest">Standard</p>
          <p className="font-display text-[13px] text-red-500/60 font-bold">2.5★</p>
        </div>
      </div>

      {/* Feature rows */}
      <div className="rounded-2xl overflow-hidden border border-white/[0.06] divide-y divide-white/[0.04]">
        {FEATURES.map((f, i) => (
          <div
            key={f.label}
            className={`grid grid-cols-[1fr_60px_60px] items-center px-4 py-3.5 ${i % 2 === 0 ? 'bg-white/[0.018]' : ''}`}
          >
            <span className="font-body text-[12px] text-white/55">{f.label}</span>

            {/* Obsidian — gold check */}
            <div className="flex justify-center">
              <div className="w-7 h-7 rounded-full bg-[#C9A84C]/12 border border-[#C9A84C]/35 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7l3.5 3.5 5.5-6" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Standard — red X */}
            <div className="flex justify-center">
              <div className="w-7 h-7 rounded-full bg-red-950/40 border border-red-900/25 flex items-center justify-center">
                <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                  <path d="M2 2l6 6M8 2l-6 6" stroke="#ef4444" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Winner banner */}
      <div className="mt-4 rounded-2xl border border-[#C9A84C]/22 bg-gradient-to-r from-[#C9A84C]/10 to-transparent px-5 py-4 flex items-center justify-between">
        <div>
          <p className="font-body text-[8px] text-[#C9A84C]/55 uppercase tracking-widest mb-1">Clear winner</p>
          <p className="font-display text-[17px] text-[#C9A84C] font-semibold leading-none">Obsidian Coffee</p>
        </div>
        <div className="text-right">
          <p className="font-display text-[32px] text-[#C9A84C] font-bold leading-none">6/6</p>
          <p className="font-body text-[8px] text-[#C9A84C]/45 uppercase tracking-wider">categories</p>
        </div>
      </div>
    </section>
  );
}

/* ── DESKTOP: original GSAP pinned split ── */
export default function ObsidianDifference() {
  const sectionRef = useRef(null);
  const leftCardRef = useRef(null);
  const centerCardRef = useRef(null);
  const rightCardRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    gsap.registerPlugin(ScrollTrigger);
    const el = sectionRef.current;
    if (!el) return;

    const left = leftCardRef.current;
    const center = centerCardRef.current;
    const right = rightCardRef.current;
    const title = titleRef.current;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: '+=150%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      tl.to(left,   { x: '-110%', rotateY: -15, z: -50, ease: 'power1.out' }, 0)
        .to(right,  { x: '110%',  rotateY:  15, z: -50, ease: 'power1.out' }, 0)
        .to(center, { y: -20, scale: 1.05, z: 30, ease: 'power1.out' }, 0)
        .to(title,  { opacity: 1, y: 0, scale: 1, ease: 'power2.out' }, 0.1);

      const details = el.querySelectorAll('.card-details');
      tl.to(details, { opacity: 1, y: 0, duration: 0.5, stagger: 0.05 }, 0.2);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <MobileComparison />

      <section
        ref={sectionRef}
        id="difference-desktop"
        className="hidden md:flex relative w-full h-screen bg-gradient-to-b from-[#06040c] via-[#140b05] to-[#06040c] flex-col justify-center items-center overflow-hidden px-12"
        style={{ perspective: '1500px', transformStyle: 'preserve-3d' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/[0.025] filter blur-3xl pointer-events-none rounded-full" />

        <div ref={titleRef} className="text-center mb-16 relative z-10 opacity-0 -translate-y-6 scale-95 will-change-transform max-w-xl mx-auto">
          <span className="font-body text-[10px] tracking-[0.45em] text-[#C9A84C] uppercase mb-3 block">THE CRAFT COMPARISON</span>
          <h2 className="font-display font-light text-5xl text-white tracking-tight leading-none">How Obsidian Redefines Excellence</h2>
        </div>

        <div className="relative w-full max-w-5xl h-[420px] flex items-center justify-center select-none" style={{ transformStyle: 'preserve-3d' }}>

          {/* LEFT: Standard cafe */}
          <div ref={leftCardRef} className="absolute w-[310px] rounded-3xl overflow-hidden border border-red-500/10 bg-black/80 backdrop-blur-md shadow-[0_25px_60px_rgba(0,0,0,0.8)] will-change-transform flex flex-col" style={{ zIndex: 10, transform: 'translateX(0px) rotateY(0deg) scale(0.98)', transformOrigin: 'right center' }}>
            <div className="h-32 relative overflow-hidden">
              <img src="/img/flatwhite.png" alt="Standard automated coffee" className="w-full h-full object-cover grayscale opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-red-950/60 border border-red-800/40 rounded-full px-3 py-1 text-[9px] font-body text-red-400 uppercase tracking-widest">
                <ShieldAlert size={10} /> Mass Market
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-lg text-white/70 font-semibold mb-1 flex justify-between items-center">Standard Cafe <span>2.5★</span></h3>
                <p className="font-body text-[10px] text-white/30 uppercase tracking-wider mb-4">The Automated Standard</p>
                <div className="space-y-4 mt-2">
                  {[{ label: 'Freshness', val: 15, note: 'Roasted months ago (oily/stale)' }, { label: 'Temp Precision', val: 30, note: 'Fluctuating boiler (scalds flavor)' }, { label: 'Milk Texture', val: 20, note: 'Flat, bubbly foam (machine press)' }].map(m => (
                    <div key={m.label} className="card-details opacity-0 translate-y-4">
                      <div className="flex justify-between text-[11px] mb-1 font-body"><span className="text-white/40">{m.label}</span><span className="text-red-400 font-semibold">{m.val}%</span></div>
                      <div className="w-full bg-white/[0.06] rounded-full h-1.5 overflow-hidden"><div className="bg-red-500 h-full rounded-full" style={{ width: `${m.val}%` }} /></div>
                      <span className="text-[9px] text-white/25 block mt-1 font-body">{m.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CENTER: Obsidian Latte */}
          <div ref={centerCardRef} className="absolute w-[320px] rounded-3xl overflow-hidden border border-[#C9A84C]/25 bg-black/80 backdrop-blur-md shadow-[0_30px_70px_rgba(200,144,16,0.15)] will-change-transform flex flex-col" style={{ zIndex: 30, transform: 'translateX(0px) rotateY(0deg) scale(1)' }}>
            <div className="h-36 relative overflow-hidden">
              <img src="/img/latte.png" alt="Obsidian Signature Latte" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-[#C9A84C]/20 border border-[#C9A84C]/40 rounded-full px-3 py-1 text-[9px] font-body text-[#C9A84C] uppercase tracking-widest">
                <Award size={10} /> The Gold Standard
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-xl text-white font-semibold mb-1 flex justify-between items-center">Obsidian Latte <span className="text-[#C9A84C]">4.9★</span></h3>
                <p className="font-body text-[10px] text-[#C9A84C] uppercase tracking-wider mb-4">Artisanal Craft</p>
                <div className="space-y-4 mt-2">
                  {[{ label: 'Roast Freshness', val: 98, note: 'Roasted weekly in micro-batches' }, { label: 'Extraction Temp', val: 99, note: 'PID dual boilers locked at 93.0°C' }, { label: 'Microfoam Texture', val: 96, note: 'Velvety microfoam textured at 65°C' }].map(m => (
                    <div key={m.label} className="card-details opacity-0 translate-y-4">
                      <div className="flex justify-between text-[11px] mb-1 font-body"><span className="text-white/60">{m.label}</span><span className="text-[#C9A84C] font-semibold">{m.val}%</span></div>
                      <div className="w-full bg-white/[0.06] rounded-full h-1.5 overflow-hidden"><div className="bg-gradient-to-r from-amber-500 to-[#C9A84C] h-full rounded-full" style={{ width: `${m.val}%` }} /></div>
                      <span className="text-[9px] text-[#C9A84C]/60 block mt-1 font-body">{m.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Cold Brew */}
          <div ref={rightCardRef} className="absolute w-[310px] rounded-3xl overflow-hidden border border-[#C9A84C]/10 bg-black/80 backdrop-blur-md shadow-[0_25px_60px_rgba(0,0,0,0.8)] will-change-transform flex flex-col" style={{ zIndex: 10, transform: 'translateX(0px) rotateY(0deg) scale(0.98)', transformOrigin: 'left center' }}>
            <div className="h-32 relative overflow-hidden">
              <img src="/img/coldbrew.png" alt="Obsidian Volcanic Cold Brew" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-amber-950/60 border border-amber-800/40 rounded-full px-3 py-1 text-[9px] font-body text-amber-400 uppercase tracking-widest">
                <Check size={10} /> 24hr Slow Steep
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-lg text-white/70 font-semibold mb-1 flex justify-between items-center">Obsidian Brew <span>4.8★</span></h3>
                <p className="font-body text-[10px] text-white/30 uppercase tracking-wider mb-4">Slow Extraction</p>
                <div className="space-y-4 mt-2">
                  {[{ label: 'Slow Infusion', val: 100, note: '24-hour steep in volcanic water' }, { label: 'Acidity Reduction', val: 95, note: '60% lower acidity than hot brews' }, { label: 'Flavor Purity', val: 90, note: 'Notes of stone fruit & cocoa nibs' }].map(m => (
                    <div key={m.label} className="card-details opacity-0 translate-y-4">
                      <div className="flex justify-between text-[11px] mb-1 font-body"><span className="text-white/50">{m.label}</span><span className="text-amber-400 font-semibold">{m.val}%</span></div>
                      <div className="w-full bg-white/[0.06] rounded-full h-1.5 overflow-hidden"><div className="bg-gradient-to-r from-amber-600 to-amber-400 h-full rounded-full" style={{ width: `${m.val}%` }} /></div>
                      <span className="text-[9px] text-white/30 block mt-1 font-body">{m.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center pointer-events-none select-none">
          <span className="font-body text-[8px] text-white/25 uppercase tracking-[0.3em]">Scroll to Split</span>
        </div>
      </section>
    </>
  );
}
