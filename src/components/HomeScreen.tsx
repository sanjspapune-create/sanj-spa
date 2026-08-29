import React from 'react';
import { AppTab, Service } from '../types';
import { SERVICES_DATA, SPA_INFO, TESTIMONIALS_DATA } from '../data/spaData';
import { PlayCircle, ArrowRight, Sparkles, ShieldCheck, Droplets, Wind, CheckCircle2 } from 'lucide-react';

interface HomeScreenProps {
  onSelectTab: (tab: AppTab) => void;
  onBookService: (serviceId: string) => void;
  onOpenVideoTour: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectTab,
  onBookService,
  onOpenVideoTour,
}) => {
  const featuredServices = SERVICES_DATA.slice(0, 4);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[640px] md:min-h-[760px] flex items-center justify-center px-5 py-20 overflow-hidden">
        {/* Background Image with Cinematic Transparency Gradient */}
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover object-center scale-100 transition-transform duration-1000 ease-out"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNrGD8vptSTrM-SXk-dYH2fnnIXrwKGsJJALQZXeRNMe-y9V7J7IpkaMuyydaKtW9HsyAm7WQoIhjdom5HpPIcq2fKg52JJout0tpppMUSBN1djtwK7wn7ky8p-O3zU-94YsqwrnwWEtzVPSVx3nKzx8v8ZzT49X2CZrPivTNEp07CyKej5fcaHg14p0b1WChqrFLnZitl35IR_g33qTRr9wheaMxJ1bZxHap3g7JDbobgqJjhcmtFhA"
            alt="A serene spa setting featuring a calm indoor pool with smooth dark stone surrounds and ambient warm light"
          />
          {/* Subtle cinematic darken layer so both pool image and text are vibrant and legible */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65 z-10"></div>
          {/* Bottom fade into background */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f7f9ff] to-transparent z-10"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-[1100px] mx-auto text-center flex flex-col items-center px-4">
          <span className="font-sans text-xs md:text-sm font-semibold text-[#fed65b] tracking-[0.24em] uppercase mb-5 py-2 px-5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 shadow-lg">
            WELCOME TO BANER&apos;S PREMIER RETREAT
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-bold text-white max-w-4xl mb-6 leading-[1.08] tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
            Experience True Serenity
          </h1>

          <p className="font-sans text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mb-10 leading-relaxed font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Escape the urban intensity. Discover a sanctuary of quiet luxury where tailored wellness treatments restore your mind, body, and spirit.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              id="hero-book-escape-btn"
              onClick={() => onSelectTab('booking')}
              className="bg-[#fed65b] hover:bg-[#ffe088] text-[#263529] transition-all duration-300 px-9 py-4 rounded-full font-sans text-xs font-bold tracking-widest uppercase shadow-xl hover:shadow-[0_0_24px_rgba(254,214,91,0.5)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
            >
              Book Your Escape
            </button>

            <button
              id="hero-explore-services-btn"
              onClick={() => onSelectTab('services')}
              className="bg-white/15 hover:bg-white/25 text-white border border-white/40 backdrop-blur-md transition-all duration-300 px-8 py-4 rounded-full font-sans text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2.5 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
            >
              <PlayCircle className="w-4 h-4 text-[#fed65b]" />
              <span>Explore Services</span>
            </button>
          </div>
        </div>
      </section>

      {/* Philosophy / Atmosphere Highlight Strip */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-8 -mt-6 relative z-30 mb-20">
        <div className="glass-panel-white ambient-shadow rounded-2xl p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border border-[#dde3eb]">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#d3e8d5] flex items-center justify-center shrink-0 text-[#334537]">
              <Wind className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-semibold text-[#334537] text-base mb-1">Acoustic Stillness</h3>
              <p className="font-sans text-xs text-[#434843] leading-relaxed">
                Engineered acoustic insulation isolates all urban city frequencies.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#d3e8d5] flex items-center justify-center shrink-0 text-[#334537]">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-semibold text-[#334537] text-base mb-1">Organic Botanicals</h3>
              <p className="font-sans text-xs text-[#434843] leading-relaxed">
                Cold-pressed therapeutic essential oils free of synthetic preservatives.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#d3e8d5] flex items-center justify-center shrink-0 text-[#334537]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-semibold text-[#334537] text-base mb-1">Master Therapists</h3>
              <p className="font-sans text-xs text-[#434843] leading-relaxed">
                Internationally certified practitioners with 8+ years clinical mastery.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#d3e8d5] flex items-center justify-center shrink-0 text-[#334537]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-semibold text-[#334537] text-base mb-1">Private Suites</h3>
              <p className="font-sans text-xs text-[#434843] leading-relaxed">
                Spacious climate-controlled chambers with individual rainfall showers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Therapies Section */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-8 mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="font-sans text-xs font-semibold text-[#735c00] tracking-[0.2em] uppercase block mb-2">
              CURATED HEALING
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#334537]">
              Signature Massage Therapies
            </h2>
          </div>
          <button
            onClick={() => onSelectTab('services')}
            className="mt-4 md:mt-0 font-sans text-xs font-semibold tracking-wider text-[#334537] hover:text-[#735c00] flex items-center gap-1.5 transition-colors uppercase"
          >
            <span>View All Treatments</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {featuredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white/80 rounded-2xl overflow-hidden border border-[#dde3eb] ambient-shadow flex flex-col group hover:-translate-y-1.5 transition-all duration-500 hover:shadow-xl"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#eff4fc]">
                <img
                  src={service.image}
                  alt={service.altText}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md rounded-full px-4 py-1.5 shadow-sm border border-[#dde3eb]">
                  <span className="font-serif text-lg font-bold text-[#735c00]">
                    {service.price}
                  </span>
                </div>
                <div className="absolute top-4 left-4 bg-[#334537]/85 backdrop-blur-md text-white font-sans text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  {service.duration}
                </div>
              </div>

              <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-2xl font-bold text-[#334537] group-hover:text-[#506354] transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  <p className="font-sans text-sm text-[#434843] leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#dde3eb]/60">
                  <span className="text-xs text-[#737872] font-sans">
                    Includes organic oils & towel ritual
                  </span>
                  <button
                    onClick={() => onBookService(service.id)}
                    className="border border-[#334537] text-[#334537] hover:bg-[#334537] hover:text-white font-sans text-xs font-semibold px-5 py-2.5 rounded-full transition-all duration-300 flex items-center gap-1.5 group/btn active:scale-95"
                  >
                    <span>Book Session</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ambient Video / Experience Banner */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-8 mb-24">
        <div className="relative rounded-3xl overflow-hidden ambient-shadow-lg bg-[#334537] text-white p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl z-10">
            <span className="font-sans text-xs font-semibold text-[#fed65b] tracking-[0.2em] uppercase block mb-3">
              YOUR PERSONAL REFUGE
            </span>
            <h3 className="font-serif text-3xl md:text-4xl font-bold leading-tight mb-4">
              Step Into Uncompromising Tranquility
            </h3>
            <p className="font-sans text-sm md:text-base text-[#c0d5c2] leading-relaxed mb-6">
              Located on 123 Wellness Avenue in Baner, our spa blends Scandinavian minimalism with ancient Ayurvedic touch therapies. Every detail is crafted for your total physical and mental restoration.
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-white/90">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#fed65b]" /> Valet Parking Included
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#fed65b]" /> Herbal Steam Suites
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#fed65b]" /> Couples Chambers
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center sm:items-end gap-3 z-10 shrink-0">
            <button
              onClick={() => onSelectTab('booking')}
              className="w-full sm:w-auto bg-[#fed65b] hover:bg-[#ffe088] text-[#263529] font-sans font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 shimmer-btn text-center"
            >
              Reserve An Appointment
            </button>
            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/917875431212?text=Hello%20Sanj%20Spa%20Baner,%20I%20would%20like%20to%20inquire%20about%20booking%20a%20treatment."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm transition-all"
              >
                <span>WhatsApp Us</span>
              </a>
              <a
                href="tel:+917875431212"
                className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 border border-white/30 transition-all"
              >
                <span>Call +91 78754 31212</span>
              </a>
            </div>
            <span className="text-[11px] text-[#c0d5c2]">Open daily 8:00 AM – 9:30 PM</span>
          </div>
        </div>
      </section>

      {/* Guest Testimonials */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-8 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-sans text-xs font-semibold text-[#735c00] tracking-[0.2em] uppercase block mb-2">
            GUEST EXPERIENCES
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#334537]">
            Words from Our Visitors
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((item) => (
            <div
              key={item.id}
              className="glass-panel-white p-7 rounded-2xl border border-[#dde3eb] flex flex-col justify-between ambient-shadow"
            >
              <div className="mb-4">
                <div className="flex text-[#735c00] text-sm mb-3">
                  {'★'.repeat(item.rating)}
                </div>
                <p className="font-sans text-sm text-[#434843] italic leading-relaxed">
                  &ldquo;{item.comment}&rdquo;
                </p>
              </div>
              <div className="pt-4 border-t border-[#dde3eb]/60 flex justify-between items-center text-xs">
                <div>
                  <h4 className="font-serif font-bold text-[#334537] text-sm">{item.name}</h4>
                  <span className="text-[#737872]">{item.neighborhood}</span>
                </div>
                <span className="bg-[#eff4fc] text-[#334537] px-2.5 py-1 rounded-full font-medium text-[11px]">
                  {item.service}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
