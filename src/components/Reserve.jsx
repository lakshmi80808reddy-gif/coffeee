import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, CalendarDays, ExternalLink } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const WHATSAPP = 'https://wa.me/918000000000?text=Hi%20Obsidian!%20I%20want%20to%20reserve%20a%20table.';

function Users2({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}

function FloatingInput({ label, type = 'text', value, onChange, required = true, ...props }) {
  const [focused, setFocused] = useState(false);
  const isFloating = focused || value !== '' || type === 'date';

  return (
    <div className="relative w-full" style={{ paddingTop: '20px' }}>
      <label
        className="absolute left-0 transition-all duration-300 uppercase tracking-widest font-body pointer-events-none z-10"
        style={{
          top: isFloating ? '0px' : '28px',
          fontSize: isFloating ? '9px' : '11px',
          color: isFloating ? '#C9A84C' : 'rgba(255,255,255,0.38)',
        }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className="w-full bg-transparent border-b border-white/10 border-t-0 border-x-0 rounded-none py-2.5 px-0 focus:border-[#C9A84C] focus:bg-transparent focus:ring-0 focus:shadow-none transition-all duration-300 outline-none text-white font-body text-sm"
        style={{ caretColor: '#C9A84C' }}
        {...props}
      />
    </div>
  );
}

function FloatingSelect({ label, value, onChange, options, required = true }) {
  const [focused, setFocused] = useState(false);
  const isFloating = true; // Always float selects to prevent overlapping with browser native arrows/options

  return (
    <div className="relative pt-4 w-full">
      <select
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className="w-full bg-transparent border-b border-white/10 border-t-0 border-x-0 rounded-none py-3 px-0 focus:border-[#C9A84C] focus:bg-transparent focus:ring-0 focus:shadow-none transition-all duration-300 outline-none text-white font-body text-sm cursor-pointer"
        style={{ colorScheme: 'dark' }}
      >
        <option value="" disabled className="bg-neutral-950 text-white/40"></option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-neutral-950 text-white">
            {o}
          </option>
        ))}
      </select>
      <label
        className={`absolute left-0 pointer-events-none transition-all duration-300 uppercase tracking-widest font-body ${
          isFloating
            ? 'top-0 text-[9px] text-[#C9A84C]'
            : 'top-7 text-xs text-white/40'
        }`}
      >
        {label}
      </label>
    </div>
  );
}

export default function Reserve() {
  const [form, setForm] = useState({ date: '', time: '', guests: '2', name: '', phone: '' });
  const [sent, setSent] = useState(false);
  
  const leftTextRef = useRef(null);
  const formRef = useRef(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = encodeURIComponent(`Hi Obsidian! I'd like to reserve a table.\n\nName: ${form.name}\nDate: ${form.date}\nTime: ${form.time}\nGuests: ${form.guests}\nPhone: ${form.phone}`);
    window.open(`https://wa.me/918000000000?text=${msg}`, '_blank');
    setSent(true);
  };

  const TIMES = ['7:00 AM','7:30 AM','8:00 AM','8:30 AM','9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','12:30 PM','1:00 PM','1:30 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM','4:00 PM','4:30 PM','5:00 PM','5:30 PM','6:00 PM','6:30 PM','7:00 PM','7:30 PM','8:00 PM','8:30 PM','9:00 PM','9:30 PM'];

  const titleString = "Reserve Your Table";
  const chars = titleString.split('');

  useEffect(() => {
    const leftTextEl = leftTextRef.current;
    const formEl = formRef.current;
    if (!leftTextEl || !formEl) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const charsElements = leftTextEl.querySelectorAll('.reserve-char');
      if (charsElements.length > 0) {
        // 1. Left side title: animate letter-by-letter on scroll
        gsap.from(charsElements, {
          opacity: 0,
          rotateY: 90,
          stagger: 0.04,
          duration: 0.8,
          ease: 'power2.out',
          transformPerspective: 600,
          scrollTrigger: {
            trigger: leftTextEl,
            start: 'top 80%',
          },
        });
      }

      // 2. Right side form: slide in from right
      gsap.from(formEl, {
        x: 100,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formEl,
          start: 'top 75%',
        },
      });
    }, leftTextEl);

    return () => ctx.revert();
  }, []);

  return (
    <section id="reserve" className="bg-[#06040c] py-24 md:py-32 px-6 md:px-12 relative overflow-hidden scene">
      {/* Background radial gold ambient */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 55% at 50% 50%, rgba(200,144,16,0.04) 0%, transparent 65%)' }} />

      <style>{`
        .reserve-submit-btn {
          position: relative;
          overflow: hidden;
          color: #C9A84C;
          border: 1px solid #C9A84C;
          background: transparent;
          z-index: 1;
          transition: color 0.35s ease, transform 0.1s ease;
        }
        .reserve-submit-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #C9A84C;
          z-index: -1;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reserve-submit-btn:hover {
          color: #000;
        }
        .reserve-submit-btn:hover::before {
          transform: scaleX(1);
        }
        .reserve-submit-btn:active {
          transform: scale(0.96);
        }
      `}</style>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 md:gap-20 items-start">
        
        {/* Left side text */}
        <div ref={leftTextRef} className="flex-1 w-full">
          <p className="text-[11px] tracking-[0.42em] uppercase font-body mb-4 text-[#C9A84C]">
            BOOK A SEAT
          </p>
          <h2 className="font-display font-light text-4xl md:text-6xl text-white tracking-[-0.02em] mb-4 leading-tight flex flex-wrap">
            {chars.map((char, i) => (
              <span
                key={i}
                className="reserve-char inline-block"
                style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
              >
                {char}
              </span>
            ))}
          </h2>
          <div className="gold-line mb-8 max-w-[200px] opacity-30" />
          <p className="font-body text-sm text-white/40 leading-relaxed max-w-xs mb-8">
            Secure your spot at Obsidian. We'll confirm instantly via WhatsApp — no waiting, no spam.
          </p>
          
          {/* Benefits */}
          {[
            { icon: MessageCircle, text: 'Instant WhatsApp confirmation' },
            { icon: CalendarDays,  text: 'Reserve up to 7 days ahead' },
            { icon: Users2,        text: 'Groups up to 12 welcome' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3 mb-4">
              <div className="glass-warm rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                <Icon size={14} className="text-[#C9A84C]" />
              </div>
              <span className="font-body text-sm text-white/50">{text}</span>
            </div>
          ))}
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 font-body text-xs text-[#C9A84C] hover:text-[#e0a820] transition-colors tracking-wider uppercase">
            Or message directly on WhatsApp <ExternalLink size={11} />
          </a>
        </div>

        {/* Right side form */}
        <div ref={formRef} className="flex-1 w-full">
          {sent ? (
            <div className="glass rounded-3xl p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-5">
                <MessageCircle size={28} className="text-green-400" />
              </div>
              <h3 className="font-display text-3xl text-white mb-3">We got it! ✓</h3>
              <p className="font-body text-sm text-white/40 mb-6">We've received your request. Expect a WhatsApp confirmation in minutes.</p>
              <button onClick={() => setSent(false)} className="glass rounded-full px-6 py-2.5 font-body text-xs text-white/60 uppercase tracking-wider hover:bg-white/10 transition-all">Make another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 md:p-10 space-y-6">
              <h3 className="font-display text-2xl text-white mb-2">Your details</h3>
              
              <div className="grid grid-cols-2 gap-6">
                <FloatingInput
                  label="Date"
                  type="date"
                  value={form.date}
                  onChange={(e) => set('date', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
                <FloatingSelect
                  label="Time"
                  value={form.time}
                  onChange={(e) => set('time', e.target.value)}
                  options={TIMES}
                />
              </div>

              <div>
                <label className="font-body text-[10px] text-white/40 uppercase tracking-wider mb-2 block">Party Size</label>
                <div className="flex gap-2 flex-wrap">
                  {['1','2','3','4','5','6','7','8+'].map(n => (
                    <button
                      type="button"
                      key={n}
                      onClick={() => set('guests', n)}
                      className={`w-10 h-10 rounded-xl font-body text-sm font-medium transition-all cursor-pointer ${
                        form.guests === n
                          ? 'bg-[#C9A84C] text-black font-semibold'
                          : 'glass text-white/50 hover:text-white'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <FloatingInput
                label="Your Name"
                type="text"
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder="e.g. Priya Sharma"
              />

              <FloatingInput
                label="WhatsApp Number"
                type="tel"
                value={form.phone}
                onChange={(e) => set('phone', e.target.value)}
                placeholder="+91 98765 43210"
              />

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-2xl py-4 font-body font-semibold text-sm uppercase tracking-widest cursor-pointer reserve-submit-btn mt-2"
              >
                <MessageCircle size={15} /> Confirm via WhatsApp
              </button>
              <p className="font-body text-[10px] text-white/25 text-center">We'll reply within 5 minutes during opening hours</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
