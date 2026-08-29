import React, { useState, useEffect } from 'react';
import { AppTab } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/HomeScreen';
import { ServicesScreen } from './components/ServicesScreen';
import { BookingScreen } from './components/BookingScreen';
import { BlogScreen } from './components/BlogScreen';
import { ContactScreen } from './components/ContactScreen';
import { LegalModal } from './components/LegalModals';
import { StickyContactBar } from './components/StickyContactBar';
import { toggleSpaAmbientAudio } from './utils/spaAudio';
import { Calendar, Volume2, VolumeX, Sparkles, X, Play } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<AppTab>('home');
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | null>(null);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [bookingCount, setBookingCount] = useState<number>(0);
  const [videoTourOpen, setVideoTourOpen] = useState(false);

  // Sync booking count from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('sanj_spa_bookings');
      if (saved) {
        const parsed = JSON.parse(saved);
        setBookingCount(parsed.length || 0);
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentTab]);

  const handleSelectTab = (tab: AppTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookService = (serviceId: string) => {
    setPreselectedServiceId(serviceId);
    setCurrentTab('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleAudio = () => {
    toggleSpaAmbientAudio((playing) => {
      setIsAudioPlaying(playing);
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9ff] text-[#161c22] font-sans antialiased selection:bg-[#fed65b] selection:text-[#745c00] relative">
      {/* Top Header / Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        bookingCount={bookingCount}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
      />

      {/* Main Content View Switcher */}
      <main className="flex-grow w-full pb-20 md:pb-0">
        {currentTab === 'home' && (
          <HomeScreen
            onSelectTab={handleSelectTab}
            onBookService={handleBookService}
            onOpenVideoTour={() => setVideoTourOpen(true)}
          />
        )}

        {currentTab === 'services' && (
          <ServicesScreen
            onSelectTab={handleSelectTab}
            onBookService={handleBookService}
          />
        )}

        {currentTab === 'booking' && (
          <BookingScreen
            onSelectTab={handleSelectTab}
            preselectedServiceId={preselectedServiceId}
            onClearPreselectedService={() => setPreselectedServiceId(null)}
          />
        )}

        {currentTab === 'blog' && (
          <BlogScreen
            onSelectTab={handleSelectTab}
            onBookService={handleBookService}
          />
        )}

        {currentTab === 'contact' && (
          <ContactScreen
            onSelectTab={handleSelectTab}
          />
        )}
      </main>

      {/* Sticky Call & WhatsApp Connect Bars (Mobile & Desktop) */}
      <StickyContactBar onBookClick={() => handleSelectTab('booking')} />

      {/* Virtual Tour Modal */}
      {videoTourOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="glass-panel-white bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-[#dde3eb] relative">
            <button
              onClick={() => setVideoTourOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#eff4fc] text-[#434843] transition-colors"
              aria-label="Close video tour"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="font-sans text-xs font-semibold text-[#735c00] tracking-widest uppercase">
                SANCTUARY PREVIEW
              </span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#334537] mb-4">
              Virtual Sanctuary Experience
            </h3>

            <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#334537] mb-6 flex items-center justify-center shadow-inner">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNrGD8vptSTrM-SXk-dYH2fnnIXrwKGsJJALQZXeRNMe-y9V7J7IpkaMuyydaKtW9HsyAm7WQoIhjdom5HpPIcq2fKg52JJout0tpppMUSBN1djtwK7wn7ky8p-O3zU-94YsqwrnwWEtzVPSVx3nKzx8v8ZzT49X2CZrPivTNEp07CyKej5fcaHg14p0b1WChqrFLnZitl35IR_g33qTRr9wheaMxJ1bZxHap3g7JDbobgqJjhcmtFhA"
                alt="Sanj Spa Baner Ambient Sanctuary"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6 bg-black/30">
                <div className="w-16 h-16 rounded-full bg-[#fed65b] text-[#745c00] flex items-center justify-center mb-3 shadow-lg">
                  <Play className="w-7 h-7 fill-current ml-1" />
                </div>
                <p className="font-serif text-lg font-semibold">
                  Acoustic Stillness & Quiet Luxury in Baner
                </p>
                <p className="font-sans text-xs text-[#d3e8d5] max-w-sm mt-1">
                  Experience the soothing water channels, private aroma suites, and tailored botanical treatments.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setVideoTourOpen(false)}
                className="px-5 py-2.5 rounded-full font-sans text-xs text-[#434843] hover:bg-[#eff4fc]"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  setVideoTourOpen(false);
                  handleSelectTab('booking');
                }}
                className="bg-[#334537] text-white px-6 py-2.5 rounded-full font-sans text-xs font-semibold uppercase tracking-wider"
              >
                Book Your Visit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy & Terms Modals */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      {/* Global Footer */}
      <Footer
        onSelectTab={handleSelectTab}
        onOpenPrivacyModal={() => setLegalModalType('privacy')}
        onOpenTermsModal={() => setLegalModalType('terms')}
      />
    </div>
  );
}
