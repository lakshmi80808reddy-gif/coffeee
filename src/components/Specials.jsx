import React, { useEffect, useRef } from 'react';
import { ShoppingBag } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SPECIALS = [
  { img: '/img/latte.png',    name: 'Obsidian Signature Latte', desc: 'Single-origin espresso, velvety microfoam, rosetta art', price: '₹320', tag: 'BESTSELLER', badge: 'tag-new',  diet: [{l:'VEG',c:'tag-veg'}] },
  { img: '/img/coldbrew.png', name: 'Volcanic Cold Brew',       desc: '24-hour cold steep, caramel finish, over ice',         price: '₹380', tag: '24HR STEEP', badge: 'tag-veg', diet: [{l:'VEG',c:'tag-veg'},{l:'NEW',c:'tag-new'}] },
  { img: '/img/toast.png',    name: 'Garden Avocado Toast',     desc: 'Sourdough, smashed avocado, poached egg, microgreens',  price: '₹420', tag: 'CHEF\'S PICK', badge: 'tag-spicy', diet: [{l:'VEG',c:'tag-veg'},{l:'SPICY',c:'tag-spicy'}] },
];

function DietTag({ label, cls }) {
  return <span className={`diet-tag ${cls}`}>{label}</span>;
}

function WireframeStarOutline({ className = '', scale = 1 }) {
  return (
    <div className={`absolute pointer-events-none z-0 ${className}`} style={{ transform: `scale(${scale})` }}>
      <svg width="220" height="220" viewBox="0 0 200 200" className="wireframe-star">
        <path d="M100 0 L125 75 L200 100 L125 125 L100 200 L75 125 L0 100 L75 75 Z" />
        <path d="M100 20 L118 82 L180 100 L118 118 L100 180 L82 118 L20 100 L82 82 Z" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <circle cx="100" cy="100" r="45" stroke="var(--gold)" strokeDasharray="3, 5" opacity="0.25" />
      </svg>
      <svg width="220" height="220" viewBox="0 0 200 200" className="wireframe-star-solid">
        <path d="M100 15 L120 80 L185 100 L120 120 L100 185 L80 120 L15 100 L80 80 Z" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

import useReveal from '../hooks/useReveal';

function SpecialsCard({ item, index, parentVisible }) {
  const cardRef = useRef(null);

  // Card Mouse Move Tilt effect
  const onMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(800px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg) translateY(-8px)`;
  };

  const onMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'none';
  };

  return (
    <div className="specials-card-wrapper flex-1">
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={`glass-cream rounded-3xl overflow-hidden group h-full shadow-lg border border-[#d4860a]/20 transition-all duration-[1000ms] ease-out transform ${
          parentVisible 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-16 scale-95'
        }`}
        style={{ 
          transformStyle: 'preserve-3d',
          transitionDelay: `${index * 180}ms`
        }}
      >
        {/* Photo Container with Offset Wireframe Star */}
        <div className="relative h-56 md:h-64 overflow-visible flex items-center justify-center bg-transparent mt-4" style={{ perspective: '800px', perspectiveOrigin: '50% 50%' }}>
          <WireframeStarOutline className="-top-2 -left-2 opacity-45" scale={0.85} />
          <div
            className={`w-[85%] h-[85%] rounded-2xl overflow-hidden bg-[#160e04] relative border border-[#d4860a]/30 shadow-2xl group-hover:rotate-2 group-hover:scale-105 transition-[rotate,scale] duration-500 ${index % 2 === 0 ? 'float-3d' : 'float-3d-reverse'}`}
            style={{ animationDelay: `${index * 1.1}s` }}
          >
            <div className="w-full h-full absolute">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute top-3 left-3">
              <span className={`diet-tag ${item.badge} text-[9px]`}>{item.tag}</span>
            </div>
            <div className="absolute bottom-3 left-3 flex gap-1">
              {item.diet.map(d => <DietTag key={d.l} label={d.l} cls={d.c} />)}
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 text-[#120a02]">
          <h3 className="font-display font-semibold text-xl text-[#120a02] mb-1 group-hover:text-[#c89010] transition-colors">
            {item.name}
          </h3>
          <p className="font-body text-xs text-amber-950/70 italic mb-5 leading-relaxed">
            {item.desc}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-display text-2xl text-[#c89010] font-bold">
              {item.price}
            </span>
            <button className="flex items-center gap-2 bg-[#c89010] text-black rounded-full px-5 py-2 text-[11px] font-body font-semibold uppercase tracking-wider hover:bg-[#e0a820] transition-all shadow-md">
              <ShoppingBag size={12} /> Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Specials() {
  const [sectionRef, vis] = useReveal(0.08);

  return (
    <section
      id="specials"
      className="skew-panel-outer bg-black py-24 md:py-32 px-6 md:px-12 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Skewed background panel */}
      <div className="skew-panel-bg bg-gradient-to-br from-[#f5ede0] to-[#e8d5bc] shadow-inner" />

      {/* Content wrapper */}
      <div className="skew-panel-content max-w-6xl mx-auto relative z-10 text-neutral-900">
        <div 
          className={`text-center mb-20 transition-all duration-[1000ms] ease-out transform ${
            vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-[11px] tracking-[0.42em] uppercase font-body mb-4 text-[#c89010]">
            TODAY'S SPECIALS
          </p>
          <h2 className="font-display font-light text-4xl md:text-6xl text-[#120a02] tracking-[-0.02em] mb-3">
            Fresh From the Bar
          </h2>
          <p className="font-body text-sm text-amber-950/60 max-w-xs mx-auto">
            Hand-picked by our head barista every morning.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {SPECIALS.map((s, i) => (
            <SpecialsCard key={s.name} item={s} index={i} parentVisible={vis} />
          ))}
        </div>
      </div>
    </section>
  );
}
