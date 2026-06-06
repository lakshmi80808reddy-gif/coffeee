import React, { useState, useEffect, useRef } from 'react';
import { Coffee, Snowflake, UtensilsCrossed, Heart, ShoppingBag } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const MENU_TABS = ['Hot Coffee', 'Cold Brew', 'Food', 'Desserts'];

const MENU_DATA = {
  'Hot Coffee': [
    { img: '/img/latte.png',    name: 'Obsidian Espresso',  desc: 'Ethiopia Yirgacheffe · Dark chocolate',  price: '₹280', diet: [{l:'VEG',c:'tag-veg'}] },
    { img: '/img/flatwhite.png',name: 'Rosetta Flat White', desc: 'Kenya AA · Velvet oat milk foam',         price: '₹360', diet: [{l:'VEG',c:'tag-veg'},{l:'SIG',c:'tag-new'}] },
    { img: '/img/latte.png',    name: 'Altitude Pour Over', desc: 'Yemen Mocha · Cardamom notes',            price: '₹480', diet: [{l:'VEG',c:'tag-veg'},{l:'LTD',c:'tag-spicy'}] },
    { img: '/img/flatwhite.png',name: 'Volcanic Americano', desc: 'Colombia · Bright & clean finish',        price: '₹240', diet: [{l:'VEG',c:'tag-veg'}] },
  ],
  'Cold Brew': [
    { img: '/img/coldbrew.png', name: 'Volcanic Cold Brew', desc: '24hr steep · Stone fruit, caramel',       price: '₹380', diet: [{l:'VEG',c:'tag-veg'},{l:'NEW',c:'tag-new'}] },
    { img: '/img/coldbrew.png', name: 'Nitro Cold Brew',    desc: 'Nitrogen-infused · Creamy, smooth',       price: '₹420', diet: [{l:'VEG',c:'tag-veg'}] },
    { img: '/img/latte.png',    name: 'Iced Signature',     desc: 'Chilled espresso · Oat milk, vanilla',    price: '₹340', diet: [{l:'VEGAN',c:'tag-vegan'}] },
  ],
  'Food': [
    { img: '/img/toast.png',    name: 'Avocado Toast',      desc: 'Sourdough · Poached egg, microgreens',    price: '₹420', diet: [{l:'VEG',c:'tag-veg'}] },
    { img: '/img/croissant.png',name: 'Butter Croissant',   desc: 'French-style · Flaky, golden layers',     price: '₹180', diet: [{l:'VEG',c:'tag-veg'}] },
    { img: '/img/toast.png',    name: 'Bruschetta',         desc: 'Roma tomatoes · Basil, parmesan, EVOO',   price: '₹280', diet: [{l:'VEG',c:'tag-veg'}] },
    { img: '/img/croissant.png',name: 'Club Sandwich',      desc: 'Multigrain · Grilled chicken, coleslaw',  price: '₹380', diet: [{l:'SPICY',c:'tag-spicy'}] },
  ],
  'Desserts': [
    { img: '/img/croissant.png',name: 'Cinder Affogato',    desc: 'Espresso · Dark gelato, almond crumble',  price: '₹350', diet: [{l:'VEG',c:'tag-veg'},{l:'NEW',c:'tag-new'}] },
    { img: '/img/latte.png',    name: 'Tiramisu',           desc: 'Classic Italian · Mascarpone, coffee',    price: '₹320', diet: [{l:'VEG',c:'tag-veg'}] },
    { img: '/img/croissant.png',name: 'Dark Choc Tart',     desc: 'Belgian chocolate · Hazelnut praline',    price: '₹280', diet: [{l:'VEG',c:'tag-veg'}] },
  ],
};

function DietTag({ label, cls }) {
  return <span className={`diet-tag ${cls}`}>{label}</span>;
}

function MenuItemCard({ item }) {
  return (
    <div
      className="menu-item-row flex items-center gap-4 py-4 px-3 -mx-3 rounded-xl border-l-[0px] border-l-[#C9A84C] border-b border-white/[0.05] last:border-0 group cursor-pointer hover:border-l-[3px] hover:pl-4 transition-all duration-300 relative"
    >
      <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-[#160e04]">
        <img
          src={item.img}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-display text-lg text-white group-hover:text-[#C9A84C] transition-colors truncate">
          {item.name}
        </p>
        <p className="font-body text-[11px] text-white/35 truncate">
          {item.desc}
        </p>
        <div className="flex gap-1 mt-1">
          {item.diet.map((d) => (
            <DietTag key={d.l} label={d.l} cls={d.c} />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className="font-display text-lg text-white group-hover:text-[#C9A84C] transition-colors duration-300">
          {item.price}
        </span>
        <button className="glass rounded-full w-8 h-8 flex items-center justify-center text-white/40 group-hover:text-[#C9A84C] group-hover:border-[#C9A84C]/30 transition-all">
          <ShoppingBag size={13} />
        </button>
      </div>
    </div>
  );
}

export default function Menu() {
  const [tab, setTab] = useState('Hot Coffee');
  const [currentItems, setCurrentItems] = useState(MENU_DATA['Hot Coffee']);
  
  const titleRef = useRef(null);
  const containerRef = useRef(null);
  const itemsContainerRef = useRef(null);
  const bgBean1Ref = useRef(null);
  const bgBean2Ref = useRef(null);
  const bgBean3Ref = useRef(null);
  const gridLine1Ref = useRef(null);
  const gridLine2Ref = useRef(null);

  const TAB_ICONS = {
    'Hot Coffee': Coffee,
    'Cold Brew': Snowflake,
    'Food': UtensilsCrossed,
    'Desserts': Heart,
  };

  const titleString = "The Full Menu";
  const chars = titleString.split('');

  // 1. Title split entrance animation
  useEffect(() => {
    const titleEl = titleRef.current;
    if (!titleEl) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const titleCharsElements = titleEl.querySelectorAll('.title-char');
      gsap.from(titleCharsElements, {
        y: 60,
        opacity: 0,
        stagger: 0.03,
        rotateY: 90,
        duration: 0.8,
        ease: 'back.out(1.5)',
        transformPerspective: 800,
        scrollTrigger: {
          trigger: titleEl,
          start: 'top 80%',
        },
      });
    }, titleEl);

    return () => ctx.revert();
  }, []);

  // 2. Parallax background elements scroll animation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (bgBean1Ref.current) {
        gsap.to(bgBean1Ref.current, {
          y: -140,
          rotate: 35,
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }
      if (bgBean2Ref.current) {
        gsap.to(bgBean2Ref.current, {
          y: -220,
          rotate: -60,
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2.0,
          },
        });
      }
      if (bgBean3Ref.current) {
        gsap.to(bgBean3Ref.current, {
          y: -100,
          rotate: 45,
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.0,
          },
        });
      }
      if (gridLine1Ref.current) {
        gsap.to(gridLine1Ref.current, {
          y: -50,
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }
      if (gridLine2Ref.current) {
        gsap.to(gridLine2Ref.current, {
          y: -80,
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.4,
          },
        });
      }
    }, container);

    return () => ctx.revert();
  }, []);

  // 3. Tab switching animation handler
  const handleTabChange = (newTab) => {
    if (newTab === tab) return;
    const container = itemsContainerRef.current;
    if (!container) {
      setTab(newTab);
      setCurrentItems(MENU_DATA[newTab]);
      return;
    }

    const rows = container.querySelectorAll('.menu-item-wrapper');

    // Anim OUT
    gsap.to(rows, {
      y: -20,
      opacity: 0,
      stagger: 0.04,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        setTab(newTab);
        setCurrentItems(MENU_DATA[newTab]);
      },
    });
  };

  // 4. Animate new items IN
  useEffect(() => {
    const container = itemsContainerRef.current;
    if (!container) return;
    const rows = container.querySelectorAll('.menu-item-wrapper');

    gsap.fromTo(
      rows,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.06, duration: 0.3, ease: 'power2.out' }
    );
  }, [currentItems]);

  return (
    <section
      id="menu"
      className="bg-gradient-to-b from-[#06040c] via-[#0f0a06] to-[#06040c] py-24 md:py-32 px-6 md:px-12 relative overflow-hidden scene"
      ref={containerRef}
    >
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.012]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Warm golden ambient lights */}
      <div className="absolute top-0 left-[-10%] w-[350px] h-[350px] bg-[#C9A84C]/[0.02] filter blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-[-10%] w-[350px] h-[350px] bg-[#C9A84C]/[0.02] filter blur-3xl pointer-events-none rounded-full" />

      {/* Parallax Background Elements */}
      <div ref={bgBean1Ref} className="absolute left-[5%] top-[15%] w-24 h-24 opacity-15 pointer-events-none filter blur-[2px] hidden md:block">
        <img src="/img/flatwhite_render.png" className="w-full h-full object-contain rotate-12" style={{ transform: 'scale(0.5)' }} alt="bean" />
      </div>
      <div ref={bgBean2Ref} className="absolute right-[8%] top-[45%] w-28 h-28 opacity-10 pointer-events-none filter blur-[3px] hidden md:block">
        <img src="/img/flatwhite_render.png" className="w-full h-full object-contain -rotate-45" style={{ transform: 'scale(0.6)' }} alt="bean" />
      </div>
      <div ref={bgBean3Ref} className="absolute left-[12%] bottom-[10%] w-20 h-20 opacity-15 pointer-events-none filter blur-[1px] hidden md:block">
        <img src="/img/flatwhite_render.png" className="w-full h-full object-contain rotate-[105deg]" style={{ transform: 'scale(0.4)' }} alt="bean" />
      </div>

      {/* Parallax Grid lines */}
      <div ref={gridLine1Ref} className="gold-line-v opacity-[0.04] absolute left-[20%] top-[-10%] bottom-[-10%] pointer-events-none hidden md:block" />
      <div ref={gridLine2Ref} className="gold-line-v opacity-[0.04] absolute right-[25%] top-[-10%] bottom-[-10%] pointer-events-none hidden md:block" />

      <div className="max-w-6xl mx-auto">
        <div className="mb-12" ref={titleRef}>
          <p className="text-[11px] tracking-[0.42em] uppercase font-body mb-4 text-[#C9A84C]">
            WHAT WE SERVE
          </p>
          <h2 className="font-display font-light text-4xl md:text-6xl text-white tracking-[-0.02em] mb-2 flex flex-wrap">
            {chars.map((char, index) => (
              <span
                key={index}
                className="title-char inline-block"
                style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
              >
                {char}
              </span>
            ))}
          </h2>
          <p className="font-body text-sm text-white/30">
            Ethically sourced · Precision crafted · Honestly priced
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 flex-wrap mb-10 relative z-20">
          {MENU_TABS.map((t) => {
            const Icon = TAB_ICONS[t];
            return (
              <button
                key={t}
                onClick={() => handleTabChange(t)}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-body font-medium transition-all duration-300 tracking-wider uppercase cursor-pointer ${
                  tab === t
                    ? 'bg-[#C9A84C] text-black font-semibold gold-glow-sm scale-105'
                    : 'glass text-white/50 hover:text-white hover:scale-105'
                }`}
              >
                <Icon size={12} />
                {t}
              </button>
            );
          })}
        </div>

        {/* 2-column layout: list + featured panel */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">

          {/* LEFT: Items list */}
          <div className="flex-1 min-w-0">
            <div ref={itemsContainerRef} className="divide-y divide-white/[0.04]">
              {currentItems.map((item) => (
                <div key={item.name} className="menu-item-wrapper">
                  <MenuItemCard item={item} />
                </div>
              ))}
            </div>

            {/* Full menu CTA */}
            <div className="mt-10 pt-8 border-t border-white/[0.05] flex flex-wrap gap-3 items-center justify-between">
              <p className="font-body text-sm text-white/30">
                View our complete seasonal menu
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="glass rounded-full px-6 py-2.5 text-[11px] font-body text-white uppercase tracking-wider hover:bg-white/10 transition-all"
                >
                  Download PDF
                </a>
                <a
                  href="#"
                  className="bg-[#C9A84C] rounded-full px-6 py-2.5 text-[11px] font-body font-semibold text-black uppercase tracking-wider hover:bg-[#e0a820] transition-all gold-glow"
                >
                  Order Online
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: Featured panel */}
          <div className="w-full lg:w-[290px] xl:w-[320px] shrink-0 lg:sticky lg:top-28 flex flex-col gap-5">
            {/* Featured item image card */}
            <div className="relative rounded-3xl overflow-hidden border border-white/[0.07] shadow-[0_24px_60px_rgba(0,0,0,0.75)]" style={{ aspectRatio: '4/5' }}>
              <img
                key={currentItems[0]?.name}
                src={currentItems[0]?.img || '/img/latte.png'}
                alt={currentItems[0]?.name}
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.8) saturate(1.2)', transition: 'opacity 0.5s ease' }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
              {/* Category badge top-left */}
              <div className="absolute top-4 left-4">
                <span className="text-[9px] bg-[#C9A84C]/20 text-[#C9A84C] rounded-full px-3 py-1 font-body uppercase tracking-widest border border-[#C9A84C]/25 backdrop-blur-md">
                  {tab}
                </span>
              </div>
              {/* Diet tags top-right */}
              <div className="absolute top-4 right-4 flex gap-1 flex-wrap justify-end">
                {currentItems[0]?.diet?.map(d => (
                  <span key={d.l} className={`diet-tag ${d.c}`}>{d.l}</span>
                ))}
              </div>
              {/* Item info bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-display text-xl text-white mb-0.5 leading-tight">{currentItems[0]?.name}</p>
                <p className="font-body text-[11px] text-white/50 mb-3 leading-relaxed">{currentItems[0]?.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl text-[#C9A84C] font-bold">{currentItems[0]?.price}</span>
                  <button className="flex items-center gap-1.5 bg-[#C9A84C] text-black rounded-full px-4 py-2 text-[10px] font-body font-semibold uppercase tracking-wider hover:bg-[#e0a820] transition-all shadow-md">
                    <ShoppingBag size={11} /> Add
                  </button>
                </div>
              </div>
            </div>

            {/* Chef's note card */}
            <div className="glass-warm rounded-2xl p-5">
              <p className="text-[9px] tracking-[0.3em] uppercase font-body text-[#C9A84C] mb-2">Chef's Note</p>
              <p className="font-body text-xs text-white/55 leading-relaxed">
                {tab === 'Hot Coffee' && 'Our espresso is extracted at exactly 93°C with 9 bars of pressure — the sweet spot for balanced acidity and sweetness.'}
                {tab === 'Cold Brew' && 'Steeped for 24 hours in filtered water at 4°C. No heat, no bitterness — just silky smooth coffee with stone fruit notes.'}
                {tab === 'Food' && 'All our sourdough is baked fresh each morning. We source eggs from free-range farms within 100km of Bangalore.'}
                {tab === 'Desserts' && 'Our gelato is made in-house daily with single-origin espresso. The Affogato is our most-ordered item — you must try it.'}
              </p>
            </div>

            {/* Opening hours mini pill */}
            <div className="glass rounded-2xl px-5 py-4 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)] shrink-0" />
              <div>
                <p className="font-body text-[10px] text-white/60 uppercase tracking-wider">Open Now</p>
                <p className="font-body text-xs text-white/90">Mon–Sun · 7 AM – 10 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
