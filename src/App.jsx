import { useState, useEffect } from 'react';
import { CalendarDays, ShoppingBag, Menu, X, ChevronRight } from 'lucide-react';

// Import modular components
import Hero from './components/Hero';
import SignatureShowcase from './components/SignatureShowcase';
import ScrollCinematic from './components/ScrollCinematic';
import Specials from './components/Specials';
import MenuSection from './components/Menu';
import OriginParallax from './components/OriginParallax';
import Reserve from './components/Reserve';
import FindUs from './components/FindUs';
import Reviews from './components/Reviews';
import Instagram from './components/Instagram';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';


const NAV = [
  { label: 'Specials', href: '#specials' },
  { label: 'Menu',     href: '#menu'     },
  { label: 'Reserve',  href: '#reserve'  },
  { label: 'Find Us',  href: '#find'     },
  { label: 'Reviews',  href: '#reviews'  },
];

const MARQUEE_ITEMS = ['Single Origin','Specialty Grade','Volcanic Soil','Direct Trade','Hand Picked','Small Batch','Slow Roasted','93° Precision'];

function MarqueeStrip({ light = false }) {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className={`overflow-hidden border-y py-3 ${light ? 'border-amber-900/20 bg-amber-950/30' : 'border-white/[0.05] bg-[#070508] relative z-10'}`}>
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className={`flex items-center gap-5 px-6 text-[10px] tracking-[0.32em] uppercase whitespace-nowrap font-body ${light ? 'text-amber-400/50' : 'text-white/25'}`}>
            <span className="text-[#c89010]">✦</span>{item}
          </span>
        ))}
      </div>
    </div>
  );
}

function useIsOpen() {
  const h = new Date().getHours();
  return h >= 7 && h < 22;
}

function ScrollBar() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => { const m = document.documentElement.scrollHeight - window.innerHeight; setP(m > 0 ? window.scrollY / m : 0); };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return <div className="scroll-progress" style={{ width: `${p * 100}%` }} />;
}

function Navbar({ scrolled }) {
  const [open, setOpen] = useState(false);
  const isOpen = useIsOpen();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-4 md:py-5 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(6,4,12,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
      }}
    >
      {/* Logo */}
      <a href="#hero" className="font-display font-semibold text-xl md:text-2xl text-[#c89010] uppercase tracking-[0.32em] select-none hover:text-[#e0a820] transition-colors blur-fade-up delay-0">
        OBSIDIAN
      </a>

      {/* Desktop links */}
      <ul className="hidden lg:flex gap-8">
        {NAV.map(({ label, href }) => (
          <li key={label}><a href={href} className="nav-link font-body text-[11px] font-medium text-white/60 hover:text-white transition-colors tracking-[0.1em] uppercase">{label}</a></li>
        ))}
      </ul>

      {/* Right */}
      <div className="hidden sm:flex items-center gap-3">
        {/* Open indicator */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="open-dot" />
            <div className="open-dot-ring" />
          </div>
          <span className="font-body text-[10px] text-green-400 tracking-wider uppercase">{isOpen ? 'Open Now' : 'Closed'}</span>
          {isOpen && <span className="font-body text-[10px] text-white/30">· Closes 10pm</span>}
        </div>
        <div className="gold-line-v h-5 opacity-30 mx-1" />
        <a href="#reserve" className="glass flex items-center gap-2 rounded-full px-5 py-2 text-[11px] font-body font-medium text-white hover:bg-white/10 transition-all tracking-wider uppercase blur-fade-up delay-300">
          <CalendarDays size={13} /> Reserve
        </a>
        <a href="#menu" className="bg-[#c89010] flex items-center gap-2 rounded-full px-5 py-2 text-[11px] font-body font-semibold text-black hover:bg-[#e0a820] transition-colors gold-glow blur-fade-up delay-400 tracking-wider uppercase">
          <ShoppingBag size={13} /> Order
        </a>
      </div>

      {/* Mobile toggle */}
      <button
        className="lg:hidden glass w-9 h-9 rounded-full flex items-center justify-center text-white transition-all duration-400"
        style={{ transform: open ? 'rotate(90deg)' : 'none' }}
        onClick={() => setOpen(v => !v)}
      >
        {open ? <X size={16} /> : <Menu size={16} />}
      </button>

      {/* Mobile dropdown */}
      <div className="absolute left-0 right-0 bg-black/96 backdrop-blur-2xl border-b border-white/[0.05]"
        style={{ top: '100%', transform: open ? 'translateY(0)' : 'translateY(-10px)', opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none', transition: 'all 350ms cubic-bezier(0.16,1,0.3,1)' }}
      >
        {NAV.map(({ label, href }) => (
          <a key={label} href={href} onClick={() => setOpen(false)} className="flex items-center justify-between px-6 py-4 text-sm font-body text-white/60 hover:text-[#c89010] border-t border-white/[0.04] uppercase tracking-[0.1em] group transition-colors">
            {label}<ChevronRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        ))}
        <div className="flex gap-3 px-6 py-5 border-t border-white/[0.04]">
          <a href="#reserve" className="glass rounded-full px-5 py-2 text-xs font-body text-white tracking-wider uppercase">Reserve</a>
          <a href="#menu" className="bg-[#c89010] rounded-full px-5 py-2 text-xs font-body font-semibold text-black tracking-wider uppercase">Order Online</a>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <main className="bg-black text-white grain-overlay overflow-x-hidden min-h-screen">
      <ScrollBar />
      <Navbar scrolled={scrolled} />

      <Hero />
      <SignatureShowcase />
      <ScrollCinematic />
      <Specials />
      <MarqueeStrip />
      <MenuSection />
      <OriginParallax />
      <Reserve />
      <FindUs />
      <Reviews />
      <Instagram />
      <Footer />

      <WhatsAppButton />
    </main>
  );
}
