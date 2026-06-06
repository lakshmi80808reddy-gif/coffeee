import React from 'react';

const NAV = [
  { label: 'Specials', href: '#specials' },
  { label: 'Menu',     href: '#menu'     },
  { label: 'Reserve',  href: '#reserve'  },
  { label: 'Find Us',  href: '#find'     },
  { label: 'Reviews',  href: '#reviews'  },
];

export default function Footer() {
  return (
    <footer className="bg-[#06040c] border-t border-white/[0.04] py-12 px-6 md:px-12 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 justify-between items-start md:items-center">
        <div>
          <p className="font-display font-semibold text-xl text-[#c89010] uppercase tracking-[0.3em] mb-2">OBSIDIAN</p>
          <p className="font-body text-xs text-white/25 tracking-widest uppercase">Coffee Roasters · Bangalore</p>
        </div>
        <div className="flex flex-wrap gap-6 font-body text-xs text-white/30 uppercase tracking-wider">
          {NAV.map(({ label, href }) => <a key={label} href={href} className="hover:text-[#c89010] transition-colors">{label}</a>)}
        </div>
        <p className="font-body text-[10px] text-white/15 tracking-widest uppercase">© 2026 Obsidian Coffee Roasters · Crafted with precision</p>
      </div>
    </footer>
  );
}
