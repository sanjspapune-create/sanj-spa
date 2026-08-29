import React from 'react';
import { Phone, PhoneCall, MessageCircle, Calendar } from 'lucide-react';
import { SPA_INFO } from '../data/spaData';

interface StickyContactBarProps {
  onBookClick?: () => void;
}

export const StickyContactBar: React.FC<StickyContactBarProps> = ({ onBookClick }) => {
  const phoneNumber = '+917875431212';
  const displayPhone = '+91 78754 31212';
  const whatsappUrl = `https://wa.me/917875431212?text=${encodeURIComponent(
    'Hello Sanj Spa Baner, I would like to inquire about booking a spa therapy / treatment.'
  )}`;

  return (
    <>
      {/* ========================================================================= */}
      {/* MOBILE STICKY BOTTOM BAR (Always fixed at the bottom on mobile screens)   */}
      {/* ========================================================================= */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#161c22]/95 backdrop-blur-lg border-t border-white/10 px-3 py-2.5 shadow-[0_-8px_30px_rgba(0,0,0,0.35)] animate-in slide-in-from-bottom duration-300">
        <div className="max-w-md mx-auto grid grid-cols-2 gap-2.5">
          {/* WhatsApp Direct Action */}
          <a
            id="mobile-sticky-whatsapp-btn"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-sans text-xs font-bold py-3 px-3 rounded-xl shadow-md active:scale-95 transition-all duration-200 tracking-wide text-center"
            aria-label="Chat on WhatsApp +91 78754 31212"
          >
            {/* WhatsApp Vector Icon */}
            <svg
              className="w-4 h-4 fill-current shrink-0"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.8 14.1c-.24.68-1.2 1.25-1.83 1.32-.47.05-1.08.09-3.15-.77-2.64-1.1-4.34-3.79-4.47-3.97-.13-.17-1.07-1.42-1.07-2.71s.67-1.92.91-2.18c.24-.26.52-.33.7-.33.17 0 .35 0 .5.01.16.01.37-.06.58.44.22.52.74 1.8.8 1.93.07.13.11.28.02.45-.09.18-.13.29-.26.44-.13.15-.28.34-.4.45-.13.13-.27.27-.12.53.15.26.68 1.12 1.46 1.81 1 .89 1.84 1.17 2.1 1.3.26.13.41.11.57-.07.15-.17.65-.76.83-1.02.17-.26.35-.22.59-.13.24.09 1.52.72 1.78.85.26.13.43.2.5.3.06.11.06.63-.18 1.31z" />
            </svg>
            <span className="truncate">WhatsApp Us</span>
          </a>

          {/* Direct Call Action */}
          <a
            id="mobile-sticky-call-btn"
            href={`tel:${phoneNumber}`}
            className="flex items-center justify-center gap-2 bg-[#fed65b] hover:bg-[#ffe088] text-[#263529] font-sans text-xs font-bold py-3 px-3 rounded-xl shadow-md active:scale-95 transition-all duration-200 tracking-wide text-center"
            aria-label="Call Sanj Spa Baner +91 78754 31212"
          >
            <PhoneCall className="w-4 h-4 shrink-0 text-[#263529]" />
            <span className="truncate">Call Now</span>
          </a>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP / TABLET FLOATING CONTACT WIDGET (Bottom Right)                    */}
      {/* ========================================================================= */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-50 flex-col items-end gap-3 pointer-events-auto">
        {/* Call Pill Card */}
        <a
          id="desktop-floating-call-btn"
          href={`tel:${phoneNumber}`}
          className="group flex items-center gap-3 bg-white/95 hover:bg-white text-[#2a3c2e] px-4 py-2.5 rounded-full shadow-xl border border-[#dde3eb] hover:border-[#fed65b] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          title="Call Sanj Spa Baner directly"
        >
          <div className="w-9 h-9 rounded-full bg-[#fed65b] text-[#263529] flex items-center justify-center shadow-sm group-hover:rotate-12 transition-transform duration-300">
            <PhoneCall className="w-4 h-4" />
          </div>
          <div className="text-left font-sans pr-1">
            <div className="text-[10px] uppercase tracking-wider text-[#737872] font-semibold leading-tight">
              Direct Phone Call
            </div>
            <div className="text-xs font-bold text-[#161c22]">
              {displayPhone}
            </div>
          </div>
        </a>

        {/* WhatsApp Pill Card */}
        <a
          id="desktop-floating-whatsapp-btn"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-3 rounded-full shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(37,211,102,0.45)]"
          title="Chat with our concierge on WhatsApp"
        >
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.8 14.1c-.24.68-1.2 1.25-1.83 1.32-.47.05-1.08.09-3.15-.77-2.64-1.1-4.34-3.79-4.47-3.97-.13-.17-1.07-1.42-1.07-2.71s.67-1.92.91-2.18c.24-.26.52-.33.7-.33.17 0 .35 0 .5.01.16.01.37-.06.58.44.22.52.74 1.8.8 1.93.07.13.11.28.02.45-.09.18-.13.29-.26.44-.13.15-.28.34-.4.45-.13.13-.27.27-.12.53.15.26.68 1.12 1.46 1.81 1 .89 1.84 1.17 2.1 1.3.26.13.41.11.57-.07.15-.17.65-.76.83-1.02.17-.26.35-.22.59-.13.24.09 1.52.72 1.78.85.26.13.43.2.5.3.06.11.06.63-.18 1.31z" />
            </svg>
          </div>
          <div className="text-left font-sans">
            <div className="text-[10px] uppercase tracking-widest text-white/80 font-medium leading-none mb-1">
              WhatsApp Concierge
            </div>
            <div className="text-sm font-bold text-white leading-tight flex items-center gap-1.5">
              <span>Chat Now</span>
              <span className="inline-block w-2 h-2 rounded-full bg-white animate-ping"></span>
            </div>
          </div>
        </a>
      </div>
    </>
  );
};
