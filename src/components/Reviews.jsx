import React from 'react';
import { Star, ExternalLink } from 'lucide-react';
import ScrollPerspectiveSection from './ScrollPerspectiveSection';
import useReveal from '../hooks/useReveal';

const REVIEWS = [
  { name: 'Priya M.',   rating: 5, text: 'Obsidian is where I start every morning. The pour-over is flawless — you can tell they actually care about where the bean comes from. Worth every rupee.', ago: '2 weeks ago' },
  { name: 'Arjun K.',   rating: 5, text: 'The Volcanic Cold Brew hit different. Deep, smooth, no bitterness. Paired with the avocado toast — legitimately one of the best café mornings I\'ve had in Bangalore.', ago: '1 month ago' },
  { name: 'Sneha R.',   rating: 5, text: 'Beautiful space, even more beautiful coffee. The baristas actually talked me through the single-origin options. I left with a bag of beans AND a new obsession.', ago: '3 weeks ago' },
];

function StarRow({ n = 5 }) {
  return <span className="flex gap-0.5">{Array.from({ length: n }).map((_, i) => <Star key={i} size={12} className="fill-amber-400 text-amber-400" />)}</span>;
}

function ReviewCard({ review, index }) {
  const [ref, vis] = useReveal(0.15);
  return (
    <div ref={ref} className={`pop-scale ${vis ? 'open' : ''}`} style={{ transitionDelay: `${index * 120}ms` }}>
      <div className="glass review-card rounded-3xl p-7 h-full flex flex-col">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c89010] to-[#8a6008] flex items-center justify-center font-display text-black font-semibold text-lg shrink-0">
              {review.name[0]}
            </div>
            <div className="min-w-0">
              <p className="font-body text-sm font-semibold text-white truncate">{review.name}</p>
              <p className="font-body text-[10px] text-white/30">{review.ago}</p>
            </div>
          </div>
          <div className="shrink-0 pt-1"><StarRow /></div>
        </div>
        <p className="font-body text-sm text-white/55 leading-[1.8] flex-1 italic">"{review.text}"</p>
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-white/[0.05]">
          <div className="w-4 h-4"><svg viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg></div>
          <span className="font-body text-[10px] text-white/25">Posted on Google</span>
        </div>
      </div>
    </div>
  );
}

export default function Reviews() {
  const [hRef, hVis] = useReveal(0.2);

  return (
    <ScrollPerspectiveSection id="reviews" className="bg-[#06040c] py-24 md:py-32 px-6 md:px-12 relative overflow-hidden scene">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 55% 50% at 50% 0%, rgba(200,144,16,0.04) 0%, transparent 65%)' }} />

      {/* Header */}
      <div ref={hRef} className={`text-center mb-16 door-reveal ${hVis ? 'open' : ''}`}>
        <p className="text-[11px] tracking-[0.42em] uppercase font-body mb-4 text-[#c89010]">
          WHAT THEY SAY
        </p>
        
        {/* Rating hero */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-10 mb-14 relative z-10">
          {/* Average Rating Block */}
          <div className="flex items-center gap-4">
            <p className="font-body text-5xl md:text-6xl font-bold text-white leading-none">4.9</p>
            <div className="flex flex-col items-start gap-1.5">
              <div className="flex gap-0.5">
                {Array.from({length:5}).map((_,i)=>(
                  <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="font-body text-[9px] text-white/40 uppercase tracking-[0.2em] font-semibold">Average Rating</p>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="hidden sm:block gold-line-v h-12 opacity-20" />

          {/* Review Count Block */}
          <div className="flex items-center gap-4">
            <p className="font-body text-5xl md:text-6xl font-bold text-[#c89010] leading-none">2.4K+</p>
            <div className="flex flex-col items-start gap-1">
              <p className="font-body text-[9px] text-white/40 uppercase tracking-[0.2em] font-semibold">Verified Reviews</p>
              <p className="font-body text-[9px] text-white/20 uppercase tracking-[0.2em] font-medium">On Google Maps</p>
            </div>
          </div>
        </div>
        <h2 className="font-display font-light text-4xl md:text-5xl text-white tracking-[-0.02em]">Real People. Real Coffee.</h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
        {REVIEWS.map((r, i) => <ReviewCard key={r.name} review={r} index={i} />)}
      </div>

      <div className="text-center">
        <a href="https://www.google.com/search?q=Obsidian+Coffee+Bangalore+reviews" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 glass rounded-full px-7 py-3 font-body text-xs text-white/50 uppercase tracking-wider hover:bg-white/10 transition-all">
          <ExternalLink size={12} /> See all reviews on Google
        </a>
      </div>
    </ScrollPerspectiveSection>
  );
}
