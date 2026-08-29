import React, { useState } from 'react';
import { AppTab, FAQItem } from '../types';
import { FAQS_DATA, SPA_INFO } from '../data/spaData';
import { SpaIcon } from './SpaIcon';
import { MapPin, Phone, Mail, ChevronDown, Send, CheckCircle2, Navigation, Clock } from 'lucide-react';
import { SpaMapLocator } from './SpaMapLocator';

interface ContactScreenProps {
  onSelectTab: (tab: AppTab) => void;
}

export const ContactScreen: React.FC<ContactScreenProps> = ({ onSelectTab }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('booking');
  const [message, setMessage] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setExpandedFaqId(expandedFaqId === id ? null : id);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !message.trim()) return;
    setInquirySubmitted(true);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-5 md:px-8 py-10">
      {/* Page Header */}
      <section className="text-center max-w-2xl mx-auto space-y-4 mb-14">
        <span className="font-sans text-xs font-semibold text-[#735c00] tracking-[0.2em] uppercase block">
          COMMUNICATION & CONCIERGE
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#334537]">
          Get in Touch
        </h1>
        <p className="font-sans text-base sm:text-lg text-[#434843] leading-relaxed">
          We&apos;re here to answer any questions about our treatments or help you schedule your visit to our sanctuary.
        </p>
      </section>

      {/* Bento Grid Layout for Contact Info and Form (Screen 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
        {/* Contact Details Column (Left - 5 Cols) */}
        <div className="lg:col-span-5 space-y-4 h-full flex flex-col">
          <div className="glass-panel-white ambient-shadow p-6 md:p-8 rounded-2xl border border-[#dde3eb] flex-1 flex flex-col justify-center space-y-5">
            {/* Visit Us */}
            <div
              onClick={() => {
                const mapEl = document.getElementById('map-section');
                if (mapEl) mapEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-start gap-4 p-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#eff4fc] cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full bg-[#d3e8d5] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 text-[#334537]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#334537] mb-1">
                  Visit Us
                </h3>
                <p className="font-sans text-sm text-[#434843] leading-relaxed">
                  Baner - Mahalunge Road<br />
                  Baner, Pune, Maharashtra 411045
                </p>
                <span className="text-[11px] text-[#735c00] font-medium flex items-center gap-1 mt-1">
                  <Navigation className="w-3 h-3" /> View Map Below
                </span>
              </div>
            </div>

            {/* Call Us */}
            <a
              href="tel:+917875431212"
              className="flex items-start gap-4 p-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#eff4fc] cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full bg-[#fed65b]/40 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 text-[#745c00]">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#334537] mb-1">
                  Direct Phone
                </h3>
                <p className="font-sans text-sm text-[#161c22] font-bold">
                  +91 78754 31212
                </p>
                <span className="text-[11px] text-[#737872] block mt-0.5">
                  Available daily: 8:00 AM – 9:30 PM (Direct Call)
                </span>
              </div>
            </a>

            {/* WhatsApp Us */}
            <a
              href="https://wa.me/917875431212?text=Hello%20Sanj%20Spa%20Baner,%20I%20would%20like%20to%20inquire%20about%20booking%20a%20treatment."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#25D366]/10 cursor-pointer group border border-[#25D366]/30 bg-[#25D366]/5"
            >
              <div className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-sm">
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.8 14.1c-.24.68-1.2 1.25-1.83 1.32-.47.05-1.08.09-3.15-.77-2.64-1.1-4.34-3.79-4.47-3.97-.13-.17-1.07-1.42-1.07-2.71s.67-1.92.91-2.18c.24-.26.52-.33.7-.33.17 0 .35 0 .5.01.16.01.37-.06.58.44.22.52.74 1.8.8 1.93.07.13.11.28.02.45-.09.18-.13.29-.26.44-.13.15-.28.34-.4.45-.13.13-.27.27-.12.53.15.26.68 1.12 1.46 1.81 1 .89 1.84 1.17 2.1 1.3.26.13.41.11.57-.07.15-.17.65-.76.83-1.02.17-.26.35-.22.59-.13.24.09 1.52.72 1.78.85.26.13.43.2.5.3.06.11.06.63-.18 1.31z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-lg font-bold text-[#334537] mb-0">
                    WhatsApp Concierge
                  </h3>
                  <span className="bg-[#25D366] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Instant
                  </span>
                </div>
                <p className="font-sans text-sm text-[#128C7E] font-bold mt-1">
                  +91 78754 31212
                </p>
                <span className="text-[11px] text-[#737872] block mt-0.5">
                  Tap to chat immediately for appointments & queries
                </span>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${SPA_INFO.email}`}
              className="flex items-start gap-4 p-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#eff4fc] cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full bg-[#d3e8d5] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 text-[#334537]">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#334537] mb-1">
                  Email
                </h3>
                <p className="font-sans text-sm text-[#434843]">
                  {SPA_INFO.email}
                </p>
                <span className="text-[11px] text-[#737872] block mt-0.5">
                  Response within 2-4 business hours
                </span>
              </div>
            </a>
          </div>

          {/* Quick Hours Note */}
          <div className="bg-[#eff4fc] p-5 rounded-2xl border border-[#dde3eb] flex items-center gap-3 text-xs font-sans text-[#434843]">
            <Clock className="w-4 h-4 text-[#334537] shrink-0" />
            <span>
              <strong>Spa Timings:</strong> Monday to Sunday, 8:00 AM – 9:30 PM. Walk-ins welcome based on therapist availability.
            </span>
          </div>
        </div>

        {/* Contact Form Column (Right - 7 Cols) */}
        <div className="lg:col-span-7 glass-panel-white ambient-shadow p-6 md:p-8 rounded-2xl border border-[#dde3eb]">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#334537] mb-6">
            Send an Inquiry
          </h2>

          {inquirySubmitted ? (
            <div className="bg-[#d3e8d5]/40 border border-[#b7ccb9] rounded-2xl p-8 text-center animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-full bg-[#d3e8d5] text-[#334537] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#334537] mb-2">
                Inquiry Sent Successfully
              </h3>
              <p className="font-sans text-sm text-[#434843] mb-6 max-w-md mx-auto">
                Thank you, {fullName}. Our sanctuary guest concierge has received your note and will contact you promptly at {email}.
              </p>
              <button
                onClick={() => {
                  setInquirySubmitted(false);
                  setMessage('');
                }}
                className="bg-[#334537] text-white font-sans text-xs font-semibold px-6 py-2.5 rounded-full uppercase tracking-wider"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="space-y-6 font-sans">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-name"
                    className="font-sans text-xs font-semibold text-[#434843] block uppercase tracking-wider"
                  >
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-[#c3c8c1] focus:border-[#735c00] focus:ring-0 px-0 py-2 text-sm text-[#161c22] transition-colors outline-none placeholder:text-[#737872]/60"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-email"
                    className="font-sans text-xs font-semibold text-[#434843] block uppercase tracking-wider"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-[#c3c8c1] focus:border-[#735c00] focus:ring-0 px-0 py-2 text-sm text-[#161c22] transition-colors outline-none placeholder:text-[#737872]/60"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-subject"
                  className="font-sans text-xs font-semibold text-[#434843] block uppercase tracking-wider"
                >
                  Subject
                </label>
                <select
                  id="contact-subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-transparent border-0 border-b border-[#c3c8c1] focus:border-[#735c00] focus:ring-0 px-0 py-2 text-sm text-[#161c22] transition-colors outline-none cursor-pointer"
                >
                  <option value="booking" className="bg-white">Booking Inquiry</option>
                  <option value="services" className="bg-white">Service & Treatment Details</option>
                  <option value="corporate" className="bg-white">Corporate or Couple Retreats</option>
                  <option value="feedback" className="bg-white">Feedback</option>
                  <option value="other" className="bg-white">Other</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="font-sans text-xs font-semibold text-[#434843] block uppercase tracking-wider"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="How can we help you?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-transparent border-0 border-b border-[#c3c8c1] focus:border-[#735c00] focus:ring-0 px-0 py-2 text-sm text-[#161c22] transition-colors outline-none resize-none placeholder:text-[#737872]/60"
                ></textarea>
              </div>

              <button
                id="contact-submit-btn"
                type="submit"
                className="w-full md:w-auto bg-[#334537] text-white hover:bg-[#263529] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95 px-8 py-3 rounded-full font-sans text-xs font-semibold uppercase tracking-wider mt-2 flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Frequently Asked Questions Section (Screen 5) */}
      <section className="space-y-8 mb-20">
        <div className="text-center max-w-2xl mx-auto">
          <span className="font-sans text-xs font-semibold text-[#735c00] tracking-[0.2em] uppercase block mb-2">
            PRE-ARRIVAL GUIDE
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#334537] mb-3">
            Frequently Asked Questions
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#434843]">
            Everything you need to know before your visit to our sanctuary.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {FAQS_DATA.map((faq) => {
            const isExpanded = expandedFaqId === faq.id;
            return (
              <div
                key={faq.id}
                onClick={() => toggleFaq(faq.id)}
                className="glass-panel-white p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:bg-white border border-[#dde3eb] ambient-shadow-sm select-none"
              >
                <div className="flex justify-between items-center gap-4">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#334537] mb-0">
                    {faq.question}
                  </h3>
                  <span
                    className={`transform transition-transform duration-300 text-[#334537] ${
                      isExpanded ? 'rotate-180 text-[#735c00]' : ''
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </span>
                </div>
                {isExpanded && (
                  <div className="animate-in slide-in-from-top-2 duration-200">
                    <p className="font-sans text-sm sm:text-base text-[#434843] mt-4 leading-relaxed pt-3 border-t border-[#dde3eb]/60">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Map Section (Store Locator & Neighborhood Map) */}
      <section id="map-section" className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-2">
          <div>
            <span className="font-sans text-xs font-semibold text-[#735c00] tracking-[0.2em] uppercase block mb-1">
              STORE LOCATOR & MAP
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#334537]">
              Visit Our Spa in Baner
            </h2>
          </div>
          <p className="text-xs text-[#5d645e] font-sans">
            Conveniently situated on Baner - Mahalunge Road with dedicated valet & client parking
          </p>
        </div>

        <SpaMapLocator onBookClick={() => onSelectTab('booking')} />
      </section>
    </div>
  );
};
