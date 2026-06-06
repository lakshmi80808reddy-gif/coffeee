import React from 'react';
import { Heart } from 'lucide-react';
import ScrollPerspectiveSection from './ScrollPerspectiveSection';
import useReveal from '../hooks/useReveal';

const INSTA_ITEMS = [
  { img: '/img/latte.png',       caption: 'Saturday vibes ✨',          likes: 621 },
  { img: '/img/coldbrew.png',    caption: 'Cold brew season 🧊',        likes: 289 },
  { img: '/img/flatwhite.png',   caption: 'Rosetta art at its finest ☕', likes: 412 },
  { img: '/img/harvest.png',     caption: 'Where the beans live 🌱',    likes: 487 },
  { img: '/img/croissant.png',   caption: 'Baked fresh daily 🥐',       likes: 378 },
  { img: '/img/toast.png',       caption: 'Avocado on sourdough 🍞',    likes: 553 },
];

function InstagramIcon({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/>
    </svg>
  );
}

export default function Instagram() {
  const [hRef, hVis] = useReveal(0.2);
  const [gRef, gVis] = useReveal(0.1);

  return (
    <ScrollPerspectiveSection id="instagram" className="bg-[#070508] py-24 md:py-28 px-6 md:px-12 relative overflow-hidden scene">
      <div ref={hRef} className={`text-center mb-12 door-reveal ${hVis ? 'open' : ''}`}>
        <p className="text-[11px] tracking-[0.42em] uppercase font-body mb-4 text-[#c89010]">
          FOLLOW THE STORY
        </p>
        <h2 className="font-display font-light text-4xl md:text-5xl text-white tracking-[-0.02em] mb-3">@ObsidianBangalore</h2>
        <p className="font-body text-sm text-white/30">Real atmosphere. Real drinks. Real people.</p>
      </div>

      <div ref={gRef} className={`grid grid-cols-2 md:grid-cols-3 gap-2 max-w-5xl mx-auto rise ${gVis ? 'open' : ''}`}>
        {INSTA_ITEMS.map((item, i) => (
          <div key={i} className={`insta-item rounded-2xl overflow-hidden pop-scale ${gVis ? 'open' : ''}`} style={{ transitionDelay: `${i * 80}ms` }}>
            <img
              src={item.img}
              alt={item.caption}
              className="w-full h-full object-cover scale-[1.08] transition-transform duration-500 hover:scale-[1.15]"
              style={{ minHeight: '220px' }}
            />
            <div className="insta-overlay rounded-2xl">
              <div className="text-center">
                <div className="flex items-center gap-1 text-white font-body text-sm mb-1">
                  <Heart size={14} className="fill-white" />{item.likes}
                </div>
                <p className="font-body text-xs text-white/70">{item.caption}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#c89010] to-[#e0a820] text-black rounded-full px-8 py-3 font-body text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-all gold-glow">
          <InstagramIcon size={14} /> Follow on Instagram
        </a>
      </div>
    </ScrollPerspectiveSection>
  );
}
