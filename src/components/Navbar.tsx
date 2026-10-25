import React, { useState } from 'react';
import { AppTab } from '../types';
import { SPA_INFO } from '../data/spaData';
import { SpaIcon } from './SpaIcon';
import { Volume2, VolumeX, Menu, X, CalendarCheck, PhoneCall } from 'lucide-react';

interface NavbarProps {
  currentTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  bookingCount?: number;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  bookingCount = 0,
  isAudioPlaying,
  onToggleAudio,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const phoneNumber = '+917875431212';
  const whatsappUrl = `https://wa.me/917875431212?text=${encodeURIComponent(
    'Hello Sanj Spa Baner, I would like to inquire about booking a treatment.'
  )}`;

  const handleNav = (tab: AppTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="docked full-width top-0 sticky backdrop-blur-md shadow-xs bg-white/95 z-50 transition-all duration-300 border-b border-[#dde3eb]/70">
      <div className="flex justify-between items-center w-full px-4 sm:px-6 lg:px-8 max-w-[1360px] mx-auto h-[72px]">
        {/* Brand Logo */}
        <div
          id="navbar-brand"
          onClick={() => handleNav('home')}
          className="flex items-center gap-3 group cursor-pointer select-none shrink-0"
        >
          <div className="text-[#334537] group-hover:scale-105 transition-transform duration-300">
            <SpaIcon className="w-7 h-7" />
          </div>
          <span className="font-serif text-xl sm:text-[22px] tracking-[0.16em] text-[#334537] m-0 font-bold leading-none whitespace-nowrap">
            SANJ SPA BANER
          </span>
        </div>

        {/* Desktop Navigation Menu */}
        <nav className="hidden md:flex gap-6 lg:gap-9 items-center font-sans text-[15px]">
          <a
            id="nav-home-btn"
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNav('home');
            }}
            className={`transition-colors duration-200 py-1 font-medium relative ${
              currentTab === 'home'
                ? 'text-[#735c00] font-semibold border-b-2 border-[#735c00]'
                : 'text-[#434843] hover:text-[#161c22]'
            }`}
          >
            Home
          </a>
          <a
            id="nav-services-btn"
            href="/services"
            onClick={(e) => {
              e.preventDefault();
              handleNav('services');
            }}
            className={`transition-colors duration-200 py-1 font-medium relative ${
              currentTab === 'services'
                ? 'text-[#735c00] font-semibold border-b-2 border-[#735c00]'
                : 'text-[#434843] hover:text-[#161c22]'
            }`}
          >
            Services
          </a>
          <a
            id="nav-blog-btn"
            href="/blog"
            onClick={(e) => {
              e.preventDefault();
              handleNav('blog');
            }}
            className={`transition-colors duration-200 py-1 font-medium relative ${
              currentTab === 'blog'
                ? 'text-[#735c00] font-semibold border-b-2 border-[#735c00]'
                : 'text-[#434843] hover:text-[#161c22]'
            }`}
          >
            Wellness Blog
          </a>
          <a
            id="nav-contact-btn"
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              handleNav('contact');
            }}
            className={`transition-colors duration-200 py-1 font-medium relative ${
              currentTab === 'contact'
                ? 'text-[#735c00] font-semibold border-b-2 border-[#735c00]'
                : 'text-[#434843] hover:text-[#161c22]'
            }`}
          >
            Contact
          </a>
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-2.5 lg:gap-3 shrink-0">
          {/* Quick WhatsApp Connect */}
          <a
            id="navbar-whatsapp-btn"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-[#eaf8f0] hover:bg-[#25D366] text-[#1e954c] hover:text-white border border-[#a3e4be] px-3.5 py-1.5 rounded-full font-sans text-xs font-semibold transition-all duration-200 shadow-2xs"
            title="Chat on WhatsApp +91 78754 31212"
          >
            <svg
              className="w-3.5 h-3.5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.8 14.1c-.24.68-1.2 1.25-1.83 1.32-.47.05-1.08.09-3.15-.77-2.64-1.1-4.34-3.79-4.47-3.97-.13-.17-1.07-1.42-1.07-2.71s.67-1.92.91-2.18c.24-.26.52-.33.7-.33.17 0 .35 0 .5.01.16.01.37-.06.58.44.22.52.74 1.8.8 1.93.07.13.11.28.02.45-.09.18-.13.29-.26.44-.13.15-.28.34-.4.45-.13.13-.27.27-.12.53.15.26.68 1.12 1.46 1.81 1 .89 1.84 1.17 2.1 1.3.26.13.41.11.57-.07.15-.17.65-.76.83-1.02.17-.26.35-.22.59-.13.24.09 1.52.72 1.78.85.26.13.43.2.5.3.06.11.06.63-.18 1.31z" />
            </svg>
            <span>WhatsApp</span>
          </a>

          {/* Quick Call Button */}
          <a
            id="navbar-call-btn"
            href={`tel:${phoneNumber}`}
            className="flex items-center gap-1.5 bg-[#fff9e6] hover:bg-[#fed65b] text-[#8a6800] border border-[#f0d480] px-3.5 py-1.5 rounded-full font-sans text-xs font-semibold transition-all duration-200 shadow-2xs"
            title="Call +91 78754 31212"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call</span>
          </a>

          {/* Ambient Soundscape Toggle */}
          <button
            id="ambient-sound-toggle-btn"
            onClick={onToggleAudio}
            title={isAudioPlaying ? 'Pause Ambient Sound' : 'Play Soothing Spa Soundscape'}
            className={`w-8 h-8 rounded-full transition-all duration-300 flex items-center justify-center border ${
              isAudioPlaying
                ? 'bg-[#d3e8d5] text-[#0e1f13] border-[#b7ccb9]'
                : 'bg-white text-[#5d645e] border-[#dde3eb] hover:bg-[#eff4fc]'
            }`}
          >
            {isAudioPlaying ? (
              <Volume2 className="w-3.5 h-3.5 text-[#334537] animate-pulse" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-[#737872]" />
            )}
          </button>

          {/* Book Now Button */}
          <a
            id="nav-book-now-btn"
            href="/booking"
            onClick={(e) => {
              e.preventDefault();
              handleNav('booking');
            }}
            className="bg-[#2d3b2f] hover:bg-[#3d4f40] text-white font-sans text-xs font-bold tracking-wider uppercase px-5 py-2 rounded-full transition-all duration-300 shadow-xs hover:shadow-md active:scale-95 flex items-center gap-2 whitespace-nowrap"
          >
            <span>BOOK NOW</span>
            {bookingCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#fed65b] text-[#745c00] text-[10px] font-bold flex items-center justify-center">
                {bookingCount}
              </span>
            )}
          </a>
        </div>

        {/* Mobile Hamburger & Controls */}
        <div className="flex md:hidden items-center gap-2">
          {/* Quick Call Icon on Mobile Header */}
          <a
            href={`tel:${phoneNumber}`}
            className="p-2 bg-[#fed65b] text-[#263529] rounded-full shadow-xs active:scale-90 transition-transform"
            aria-label="Direct Call +91 78754 31212"
          >
            <PhoneCall className="w-4 h-4" />
          </a>

          <button
            onClick={onToggleAudio}
            className={`p-2 rounded-full border text-xs ${
              isAudioPlaying ? 'bg-[#d3e8d5] text-[#334537] border-[#b7ccb9]' : 'bg-white text-[#737872] border-[#dde3eb]'
            }`}
            aria-label="Toggle spa sound"
          >
            {isAudioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#334537] rounded-lg hover:bg-[#eff4fc] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel-white border-t border-[#dde3eb] px-6 py-6 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top duration-300">
          {/* Mobile Fast Connect Action Highlight */}
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#dde3eb]">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 px-3 rounded-xl font-sans text-xs font-bold shadow-xs"
            >
              <svg
                className="w-4 h-4 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.8 14.1c-.24.68-1.2 1.25-1.83 1.32-.47.05-1.08.09-3.15-.77-2.64-1.1-4.34-3.79-4.47-3.97-.13-.17-1.07-1.42-1.07-2.71s.67-1.92.91-2.18c.24-.26.52-.33.7-.33.17 0 .35 0 .5.01.16.01.37-.06.58.44.22.52.74 1.8.8 1.93.07.13.11.28.02.45-.09.18-.13.29-.26.44-.13.15-.28.34-.4.45-.13.13-.27.27-.12.53.15.26.68 1.12 1.46 1.81 1 .89 1.84 1.17 2.1 1.3.26.13.41.11.57-.07.15-.17.65-.76.83-1.02.17-.26.35-.22.59-.13.24.09 1.52.72 1.78.85.26.13.43.2.5.3.06.11.06.63-.18 1.31z" />
              </svg>
              <span>WhatsApp</span>
            </a>
            <a
              href={`tel:${phoneNumber}`}
              className="flex items-center justify-center gap-2 bg-[#fed65b] text-[#263529] py-2.5 px-3 rounded-xl font-sans text-xs font-bold shadow-xs"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Now</span>
            </a>
          </div>

          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNav('home');
            }}
            className={`text-left py-2.5 px-3 rounded-lg font-sans text-base block ${
              currentTab === 'home' ? 'bg-[#eff4fc] text-[#735c00] font-semibold' : 'text-[#161c22]'
            }`}
          >
            Home
          </a>
          <a
            href="/services"
            onClick={(e) => {
              e.preventDefault();
              handleNav('services');
            }}
            className={`text-left py-2.5 px-3 rounded-lg font-sans text-base block ${
              currentTab === 'services' ? 'bg-[#eff4fc] text-[#735c00] font-semibold' : 'text-[#161c22]'
            }`}
          >
            Massage & Therapies
          </a>
          <a
            href="/blog"
            onClick={(e) => {
              e.preventDefault();
              handleNav('blog');
            }}
            className={`text-left py-2.5 px-3 rounded-lg font-sans text-base block ${
              currentTab === 'blog' ? 'bg-[#eff4fc] text-[#735c00] font-semibold' : 'text-[#161c22]'
            }`}
          >
            Wellness Blog & Insights
          </a>
          <a
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              handleNav('contact');
            }}
            className={`text-left py-2.5 px-3 rounded-lg font-sans text-base block ${
              currentTab === 'contact' ? 'bg-[#eff4fc] text-[#735c00] font-semibold' : 'text-[#161c22]'
            }`}
          >
            Contact & Directions
          </a>
          <a
            href="/booking"
            onClick={(e) => {
              e.preventDefault();
              handleNav('booking');
            }}
            className="w-full bg-[#334537] text-white font-sans font-semibold py-3.5 rounded-full text-center tracking-wider text-sm shadow-md mt-2 flex items-center justify-center gap-2"
          >
            <CalendarCheck className="w-4 h-4 text-[#fed65b]" />
            <span>Book Appointment</span>
            {bookingCount > 0 && (
              <span className="ml-1 bg-[#fed65b] text-[#745c00] text-xs px-2 py-0.5 rounded-full font-bold">
                {bookingCount} saved
              </span>
            )}
          </a>
        </div>
      )}
    </header>
  );
};

