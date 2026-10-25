import React from 'react';
import { AppTab } from '../types';
import { SPA_INFO } from '../data/spaData';
import { SpaIcon } from './SpaIcon';
import { Mail, Phone, MapPin, Instagram, Share2 } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: AppTab) => void;
  onOpenPrivacyModal?: () => void;
  onOpenTermsModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onOpenPrivacyModal,
  onOpenTermsModal,
}) => {
  const handleNav = (tab: AppTab) => {
    onSelectTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'SANJ SPA BANER',
          text: 'Experience True Serenity at Sanj Spa Baner, Pune.',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share dismissed', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <footer className="w-full rounded-t-2xl bg-[#e9eef6] mt-20 relative border-t border-[#dde3eb]/80 text-[#161c22]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-6 md:px-8 py-16 max-w-[1200px] mx-auto">
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
          <div
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 cursor-pointer group w-fit"
          >
            <div className="text-[#334537] group-hover:rotate-12 transition-transform duration-300">
              <SpaIcon className="w-7 h-7" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-wider text-[#334537]">
              {SPA_INFO.name}
            </span>
          </div>
          <p className="font-sans text-sm text-[#434843] leading-relaxed max-w-[280px]">
            A sanctuary of quiet luxury in the heart of Baner, Pune. Find your calm and restore vital harmony.
          </p>
          <div className="flex gap-4 mt-2">
            <button
              onClick={() => window.open('https://instagram.com', '_blank')}
              title="Instagram"
              className="w-9 h-9 rounded-full bg-white/80 border border-[#dde3eb] flex items-center justify-center text-[#434843] hover:text-[#334537] hover:bg-white hover:scale-105 transition-all shadow-xs"
              aria-label="Instagram link"
            >
              <Instagram className="w-4 h-4" />
            </button>
            <button
              onClick={handleShare}
              title="Share Sanj Spa"
              className="w-9 h-9 rounded-full bg-white/80 border border-[#dde3eb] flex items-center justify-center text-[#434843] hover:text-[#334537] hover:bg-white hover:scale-105 transition-all shadow-xs"
              aria-label="Share spa details"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleNav('contact')}
              title="Locate Us"
              className="w-9 h-9 rounded-full bg-white/80 border border-[#dde3eb] flex items-center justify-center text-[#434843] hover:text-[#334537] hover:bg-white hover:scale-105 transition-all shadow-xs"
              aria-label="Location on map"
            >
              <MapPin className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Explore and Legal Columns */}
        <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-8">
          {/* Explore Links */}
          <div className="flex flex-col gap-3">
            <span className="font-sans text-xs font-semibold text-[#161c22] tracking-[0.14em] uppercase mb-1">
              EXPLORE
            </span>
            <a
              href="/services"
              onClick={(e) => {
                e.preventDefault();
                handleNav('services');
              }}
              className="text-left font-sans text-sm text-[#434843] hover:text-[#334537] transition-colors underline opacity-85 hover:opacity-100 w-fit"
            >
              Services & Therapies
            </a>
            <a
              href="/blog"
              onClick={(e) => {
                e.preventDefault();
                handleNav('blog');
              }}
              className="text-left font-sans text-sm text-[#434843] hover:text-[#334537] transition-colors underline opacity-85 hover:opacity-100 w-fit"
            >
              Wellness Blog
            </a>
            <a
              href="/booking"
              onClick={(e) => {
                e.preventDefault();
                handleNav('booking');
              }}
              className="text-left font-sans text-sm text-[#434843] hover:text-[#334537] transition-colors underline opacity-85 hover:opacity-100 w-fit"
            >
              Book an Escape
            </a>
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                handleNav('contact');
              }}
              className="text-left font-sans text-sm text-[#434843] hover:text-[#334537] transition-colors underline opacity-85 hover:opacity-100 w-fit"
            >
              FAQ & Location
            </a>
          </div>

          {/* Legal Links */}
          <div className="flex flex-col gap-3">
            <span className="font-sans text-xs font-semibold text-[#161c22] tracking-[0.14em] uppercase mb-1">
              LEGAL
            </span>
            <button
              onClick={onOpenPrivacyModal}
              className="text-left font-sans text-sm text-[#434843] hover:text-[#334537] transition-colors underline opacity-85 hover:opacity-100 w-fit"
            >
              Privacy Policy
            </button>
            <button
              onClick={onOpenTermsModal}
              className="text-left font-sans text-sm text-[#434843] hover:text-[#334537] transition-colors underline opacity-85 hover:opacity-100 w-fit"
            >
              Terms of Service
            </button>
            <span className="text-xs text-[#737872] pt-2">
              Licensed Ayurvedic & Wellness Center • Reg. No. PN-2024-884
            </span>
          </div>
        </div>

        {/* Visit Us Column */}
        <div className="col-span-1 md:col-span-1 flex flex-col gap-3">
          <span className="font-sans text-xs font-semibold text-[#161c22] tracking-[0.14em] uppercase mb-1">
            VISIT US
          </span>
          <p className="font-sans text-sm text-[#434843] leading-relaxed">
            {SPA_INFO.address}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <Phone className="w-3.5 h-3.5 text-[#735c00]" />
            <a
              href={`tel:${SPA_INFO.phone}`}
              className="font-sans text-sm text-[#735c00] font-semibold hover:underline"
            >
              {SPA_INFO.phone}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-[#434843]" />
            <a
              href={`mailto:${SPA_INFO.email}`}
              className="font-sans text-xs text-[#434843] hover:underline"
            >
              {SPA_INFO.email}
            </a>
          </div>
          <span className="text-[11px] text-[#737872] mt-1">
            Hours: 8:00 AM – 9:30 PM (Daily)
          </span>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-[#dde3eb] px-6 py-6 text-center">
        <span className="font-sans text-xs text-[#737872]">
          © {new Date().getFullYear()} {SPA_INFO.name}. All Rights Reserved. Quiet Luxury in Pune.
        </span>
      </div>
    </footer>
  );
};
