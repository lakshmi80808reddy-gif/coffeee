import React from 'react';
import { MapPin, Phone, Mail, Wifi, ParkingCircle, MessageCircle } from 'lucide-react';
import ScrollPerspectiveSection from './ScrollPerspectiveSection';
import useReveal from '../hooks/useReveal';

const WHATSAPP = 'https://wa.me/918000000000?text=Hi%20Obsidian!%20I%20want%20to%20reserve%20a%20table.';

export default function FindUs() {
  const [lRef, lVis] = useReveal(0.15);
  const [mRef, mVis] = useReveal(0.1);
  
  const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const today = dayNames[new Date().getDay()];

  return (
    <ScrollPerspectiveSection id="find" className="bg-black py-24 md:py-32 relative overflow-hidden scene">
      {/* Map Embed under reveal */}
      <div ref={mRef} className={`w-full h-72 md:h-96 overflow-hidden door-reveal ${mVis ? 'open' : ''}`} style={{ transitionDelay: '0ms' }}>
        <iframe
          title="Obsidian Coffee Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.130485742827!2d77.63827417467702!3d12.97843578732369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae178c76c13e4b%3A0x6c10e07edb621ef0!2sIndiranagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1717562400000!5m2!1sen!2sin"
          width="100%" height="100%"
          style={{ border: 0, filter: 'invert(0.88) hue-rotate(180deg) saturate(0.7) brightness(0.85)' }}
          allowFullScreen loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="px-6 md:px-12 py-14">
        <div ref={lRef} className={`max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 door-reveal ${lVis ? 'open' : ''}`} style={{ transitionDelay: '150ms' }}>
          
          {/* Come Visit Address */}
          <div>
            <p className="text-[11px] tracking-[0.42em] uppercase font-body mb-4 text-[#c89010]">
              FIND US
            </p>
            <h3 className="font-display text-2xl text-white mb-4">Come Visit</h3>
            <div className="space-y-3">
              {[
                { icon: MapPin, text: '42, 12th Main Rd, Indiranagar, Bangalore – 560038' },
                { icon: Phone, text: '+91 80 0000 0000' },
                { icon: Mail,  text: 'hello@obsidiancoffee.in' },
                { icon: Wifi,  text: 'Free high-speed Wi-Fi' },
                { icon: ParkingCircle, text: 'Street parking + 2-wheeler bay' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <Icon size={14} className="text-[#c89010] shrink-0 mt-0.5" />
                  <span className="font-body text-sm text-white/50 leading-relaxed">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Opening Hours Table */}
          <div>
            <p className="text-[11px] tracking-[0.42em] uppercase font-body mb-4 text-[#c89010]">
              OPENING HOURS
            </p>
            <h3 className="font-display text-2xl text-white mb-4">When We're Open</h3>
            <div className="space-y-2">
              {[
                { day: 'Monday – Friday', time: '7:00 am – 10:00 pm', key: 'Monday' },
                { day: 'Saturday',        time: '8:00 am – 11:00 pm', key: 'Saturday' },
                { day: 'Sunday',          time: '9:00 am – 9:00 pm',  key: 'Sunday' },
              ].map(h => {
                const isToday = h.key === today || (h.key === 'Monday' && ['Monday','Tuesday','Wednesday','Thursday','Friday'].includes(today));
                return (
                  <div key={h.day} className={`flex justify-between items-center px-3 py-2.5 rounded-lg ${isToday ? 'hours-row-today' : ''}`}>
                    <span className={`font-body text-sm ${isToday ? 'text-[#c89010]' : 'text-white/40'}`}>
                      {h.day}
                      {isToday && <span className="ml-2 text-[9px] bg-[#c89010]/20 text-[#c89010] rounded-full px-2 py-0.5 uppercase tracking-wider">Today</span>}
                    </span>
                    <span className={`font-display text-base ${isToday ? 'text-white' : 'text-white/50'}`}>
                      {h.time}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Get Directions */}
          <div>
            <p className="text-[11px] tracking-[0.42em] uppercase font-body mb-4 text-[#c89010]">
              GET THERE
            </p>
            <h3 className="font-display text-2xl text-white mb-4">Directions</h3>
            <p className="font-body text-sm text-white/40 leading-relaxed mb-6">
              5 minutes from Indiranagar Metro Station (Purple Line).<br />
              Take the 100ft Road exit, turn right on 12th Main.
            </p>
            <a href="https://maps.google.com/?q=Indiranagar,Bangalore" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#c89010] text-black rounded-full px-6 py-2.5 font-body text-xs font-semibold uppercase tracking-wider hover:bg-[#e0a820] transition-all gold-glow w-fit">
              <MapPin size={13} /> Open in Maps
            </a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 glass rounded-full px-6 py-2.5 font-body text-xs text-white/60 uppercase tracking-wider hover:bg-white/10 transition-all w-fit mt-3">
              <MessageCircle size={13} /> Ask on WhatsApp
            </a>
          </div>

        </div>
      </div>
    </ScrollPerspectiveSection>
  );
}
