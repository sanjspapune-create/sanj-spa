import React, { useState } from 'react';
import { AppTab, Service } from '../types';
import { SERVICES_DATA } from '../data/spaData';
import { ArrowRight, Sparkles, Clock, Check, Info, X } from 'lucide-react';

interface ServicesScreenProps {
  onSelectTab: (tab: AppTab) => void;
  onBookService: (serviceId: string) => void;
}

export const ServicesScreen: React.FC<ServicesScreenProps> = ({
  onBookService,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalService, setActiveModalService] = useState<Service | null>(null);

  const filteredServices = SERVICES_DATA.filter((service) => {
    if (selectedCategory === 'all') return true;
    return service.category === selectedCategory;
  });

  return (
    <div className="w-full max-w-[1200px] mx-auto px-5 md:px-8 pt-10 pb-20">
      {/* Page Header */}
      <section className="text-center mb-14 max-w-3xl mx-auto">
        <span className="font-sans text-xs font-semibold text-[#735c00] tracking-[0.2em] uppercase block mb-3">
          HOLISTIC SANCTUARY MENU
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#334537] mb-5 leading-tight">
          Massage Therapies
        </h1>
        <p className="font-sans text-base sm:text-lg text-[#434843] leading-relaxed">
          Restore balance to your body and mind with our curated selection of premium massage therapies, designed to provide a sanctuary from urban intensity.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
              selectedCategory === 'all'
                ? 'bg-[#334537] text-white shadow-sm'
                : 'bg-white/80 text-[#434843] border border-[#dde3eb] hover:bg-[#eff4fc]'
            }`}
          >
            All Treatments ({SERVICES_DATA.length})
          </button>
          <button
            onClick={() => setSelectedCategory('massage')}
            className={`px-5 py-2 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
              selectedCategory === 'massage'
                ? 'bg-[#334537] text-white shadow-sm'
                : 'bg-white/80 text-[#434843] border border-[#dde3eb] hover:bg-[#eff4fc]'
            }`}
          >
            Body & Massage
          </button>
          <button
            onClick={() => setSelectedCategory('facial')}
            className={`px-5 py-2 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
              selectedCategory === 'facial'
                ? 'bg-[#334537] text-white shadow-sm'
                : 'bg-white/80 text-[#434843] border border-[#dde3eb] hover:bg-[#eff4fc]'
            }`}
          >
            Radiance Facials
          </button>
          <button
            onClick={() => setSelectedCategory('ritual')}
            className={`px-5 py-2 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
              selectedCategory === 'ritual'
                ? 'bg-[#334537] text-white shadow-sm'
                : 'bg-white/80 text-[#434843] border border-[#dde3eb] hover:bg-[#eff4fc]'
            }`}
          >
            Restorative Rituals
          </button>
        </div>
      </section>

      {/* Services Grid (Screen 2 2-column layout) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
        {filteredServices.map((service, index) => (
          <article
            key={service.id}
            id={`service-card-${service.id}`}
            className="flex flex-col group hover:-translate-y-1.5 transition-all duration-500 hover:shadow-xl rounded-2xl bg-white/75 border border-[#dde3eb] p-4 ambient-shadow"
          >
            {/* Image Container with Zoom and Floating Price */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#eff4fc] ambient-shadow mb-6">
              <img
                src={service.image}
                alt={service.altText}
                className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
              />
              {/* Floating Price Pill */}
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md rounded-full px-4 py-1.5 shadow-md border border-[#dde3eb]/70 transition-transform duration-300 group-hover:scale-105">
                <span className="font-serif text-lg font-bold text-[#735c00]">
                  {service.price}
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="flex-grow flex flex-col px-2 pb-2">
              <div className="flex justify-between items-start mb-3 gap-2">
                <h2 className="font-serif text-2xl font-bold text-[#334537] group-hover:text-[#506354] transition-colors">
                  {service.title}
                </h2>
                <span className="bg-[#d3e8d5] text-[#394b3d] font-sans text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap tracking-wider">
                  {service.duration}
                </span>
              </div>

              <p className="font-sans text-sm text-[#434843] leading-relaxed mb-6 flex-grow">
                {service.description}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-[#dde3eb]/70 mt-auto">
                <button
                  onClick={() => setActiveModalService(service)}
                  className="font-sans text-xs text-[#737872] hover:text-[#334537] flex items-center gap-1 transition-colors"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>View Benefits</span>
                </button>

                <button
                  id={`book-btn-${service.id}`}
                  onClick={() => onBookService(service.id)}
                  className="self-start border border-[#334537] text-[#334537] hover:bg-[#334537] hover:text-white font-sans text-xs font-semibold px-6 py-2.5 rounded-full transition-all duration-300 flex items-center gap-2 group/btn active:scale-95 shadow-xs"
                >
                  <span>Book Session</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Spa Etiquette & Consultation Note */}
      <section className="mt-20 glass-panel-white ambient-shadow rounded-2xl p-8 border border-[#dde3eb] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[#fed65b]/40 flex items-center justify-center shrink-0 text-[#745c00]">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-[#334537] mb-1">
              Need Assistance Choosing Your Treatment?
            </h3>
            <p className="font-sans text-sm text-[#434843]">
              Our lead wellness consultant is available daily to tailor your treatment sequence to your unique tension patterns.
            </p>
          </div>
        </div>
        <a
          href="tel:+917875431212"
          className="shrink-0 bg-[#334537] text-white hover:bg-[#4a5d4e] font-sans text-xs font-semibold px-6 py-3 rounded-full uppercase tracking-wider transition-colors shadow-sm"
        >
          Call +91 78754 31212
        </a>
      </section>

      {/* Service Detail Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="glass-panel-white bg-white rounded-2xl max-w-xl w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto shadow-2xl border border-[#dde3eb] relative">
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#eff4fc] text-[#434843] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#d3e8d5] text-[#394b3d] text-xs font-semibold px-3 py-1 rounded-full font-sans uppercase tracking-wider">
                {activeModalService.duration}
              </span>
              <span className="font-serif text-lg font-bold text-[#735c00]">
                {activeModalService.price}
              </span>
            </div>

            <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#334537] mb-3">
              {activeModalService.title}
            </h3>

            <p className="font-sans text-sm text-[#434843] leading-relaxed mb-6">
              {activeModalService.description}
            </p>

            <div className="mb-6">
              <h4 className="font-serif text-base font-bold text-[#334537] mb-2.5">
                Key Therapeutic Benefits
              </h4>
              <ul className="space-y-2">
                {activeModalService.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs font-sans text-[#434843]">
                    <Check className="w-4 h-4 text-[#334537] shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6 bg-[#eff4fc] p-4 rounded-xl">
              <span className="font-sans text-xs font-bold text-[#334537] block mb-1 uppercase tracking-wider">
                Recommended For:
              </span>
              <p className="font-sans text-xs text-[#434843]">
                {activeModalService.recommendedFor}
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#dde3eb]">
              <button
                onClick={() => setActiveModalService(null)}
                className="px-5 py-2.5 rounded-full font-sans text-xs text-[#434843] hover:bg-[#eff4fc]"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const sId = activeModalService.id;
                  setActiveModalService(null);
                  onBookService(sId);
                }}
                className="bg-[#334537] hover:bg-[#263529] text-white font-sans text-xs font-semibold px-6 py-2.5 rounded-full uppercase tracking-wider shadow-md"
              >
                Proceed to Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
