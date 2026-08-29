import React, { useState, useEffect } from 'react';
import { AppTab, Booking, Service } from '../types';
import { SERVICES_DATA, SPA_INFO } from '../data/spaData';
import { ArrowRight, CheckCircle2, Calendar, Clock, User, Phone, Mail, Sparkles, Download, Trash2, Plus } from 'lucide-react';

interface BookingScreenProps {
  onSelectTab: (tab: AppTab) => void;
  preselectedServiceId?: string | null;
  onClearPreselectedService?: () => void;
}

export const BookingScreen: React.FC<BookingScreenProps> = ({
  onSelectTab,
  preselectedServiceId,
  onClearPreselectedService,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [email, setEmail] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState(preselectedServiceId || 'swedish-massage');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  
  const [bookingConfirmed, setBookingConfirmed] = useState<Booking | null>(null);
  const [existingBookings, setExistingBookings] = useState<Booking[]>([]);
  const [showMyBookings, setShowMyBookings] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Set default date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    setDate(`${yyyy}-${mm}-${dd}`);
    setTime('12:00');
  }, []);

  // Update selected service if preselected passed
  useEffect(() => {
    if (preselectedServiceId) {
      setSelectedServiceId(preselectedServiceId);
    }
  }, [preselectedServiceId]);

  // Load existing bookings from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('sanj_spa_bookings');
      if (saved) {
        setExistingBookings(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saveBookingsToStorage = (bookings: Booking[]) => {
    setExistingBookings(bookings);
    try {
      localStorage.setItem('sanj_spa_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.error(e);
    }
  };

  const currentService = SERVICES_DATA.find((s) => s.id === selectedServiceId) || SERVICES_DATA[0];

  const handleAddonToggle = (addonName: string) => {
    if (selectedAddons.includes(addonName)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== addonName));
    } else {
      setSelectedAddons([...selectedAddons, addonName]);
    }
  };

  const handleQuickDate = (daysAhead: number) => {
    const target = new Date();
    target.setDate(target.getDate() + daysAhead);
    const yyyy = target.getFullYear();
    const mm = String(target.getMonth() + 1).padStart(2, '0');
    const dd = String(target.getDate()).padStart(2, '0');
    setDate(`${yyyy}-${mm}-${dd}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !email.trim() || !date || !time) {
      setToastMessage('Please complete all contact, date, and time fields.');
      setTimeout(() => setToastMessage(null), 3500);
      return;
    }

    const randomRefNum = Math.floor(1000 + Math.random() * 9000);
    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      bookingRef: `SANJ-${randomRefNum}`,
      fullName,
      phone,
      email,
      serviceId: currentService.id,
      serviceName: currentService.title,
      servicePrice: currentService.price,
      serviceDuration: currentService.duration,
      date,
      time,
      guests,
      addOns: selectedAddons,
      specialRequests: specialRequests.trim() || undefined,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    const updated = [newBooking, ...existingBookings];
    saveBookingsToStorage(updated);
    setBookingConfirmed(newBooking);
    if (onClearPreselectedService) onClearPreselectedService();
  };

  const handleDeleteBooking = (id: string) => {
    const updated = existingBookings.filter((b) => b.id !== id);
    saveBookingsToStorage(updated);
    setToastMessage('Booking cancelled.');
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleDownloadPass = (booking: Booking) => {
    const content = `===========================================
SANJ SPA BANER - APPOINTMENT PASS
Baner - Mahalunge Road, Baner, Pune, Maharashtra 411045
Ph: +91 78754 31212
===========================================
Booking Reference : ${booking.bookingRef}
Guest Name        : ${booking.fullName}
Phone             : ${booking.phone}
Email             : ${booking.email}
Therapy           : ${booking.serviceName}
Duration          : ${booking.serviceDuration}
Date & Time       : ${booking.date} at ${booking.time}
Guests            : ${booking.guests}
Add-ons           : ${booking.addOns.length ? booking.addOns.join(', ') : 'None'}
Status            : Confirmed
===========================================
Please arrive 15 minutes early to enjoy complimentary herbal infusion.`;

    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${booking.bookingRef}-SanjSpa-Pass.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-5 md:px-8 py-10">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#334537] text-white px-6 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-[#dde3eb]/40 animate-in slide-in-from-top duration-300">
          <Sparkles className="w-4 h-4 text-[#fed65b]" />
          <span className="font-sans text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Confirmation Modal / Screen */}
      {bookingConfirmed ? (
        <div className="max-w-2xl mx-auto glass-panel-white ambient-shadow-lg rounded-3xl p-8 md:p-12 border border-[#dde3eb] text-center animate-in fade-in zoom-in-95 duration-400">
          <div className="w-16 h-16 bg-[#d3e8d5] text-[#334537] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="font-sans text-xs font-semibold text-[#735c00] tracking-[0.2em] uppercase block mb-2">
            APPOINTMENT CONFIRMED
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#334537] mb-3">
            We Look Forward to Welcoming You
          </h2>
          <p className="font-sans text-sm text-[#434843] max-w-md mx-auto mb-8">
            Your sanctuary session is reserved at Sanj Spa Baner. A confirmation SMS and email have been dispatched.
          </p>

          {/* Ticket / Pass Summary Card */}
          <div className="bg-[#f7f9ff] border border-[#dde3eb] rounded-2xl p-6 text-left mb-8 space-y-3 font-sans text-sm">
            <div className="flex justify-between items-center pb-3 border-b border-[#dde3eb]">
              <div>
                <span className="text-xs text-[#737872] uppercase block">Booking Reference</span>
                <span className="font-serif font-bold text-lg text-[#334537]">
                  {bookingConfirmed.bookingRef}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#737872] uppercase block">Status</span>
                <span className="bg-[#d3e8d5] text-[#394b3d] text-xs font-bold px-3 py-1 rounded-full">
                  Confirmed
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <span className="text-xs text-[#737872] block">Therapy</span>
                <span className="font-semibold text-[#161c22]">{bookingConfirmed.serviceName}</span>
                <span className="text-xs text-[#737872] block">({bookingConfirmed.serviceDuration})</span>
              </div>
              <div>
                <span className="text-xs text-[#737872] block">Date & Time</span>
                <span className="font-semibold text-[#161c22]">
                  {bookingConfirmed.date} at {bookingConfirmed.time}
                </span>
              </div>
              <div>
                <span className="text-xs text-[#737872] block">Guest Name</span>
                <span className="text-[#161c22]">{bookingConfirmed.fullName}</span>
              </div>
              <div>
                <span className="text-xs text-[#737872] block">Phone</span>
                <span className="text-[#161c22]">{bookingConfirmed.phone}</span>
              </div>
            </div>

            {bookingConfirmed.addOns.length > 0 && (
              <div className="pt-2 border-t border-[#dde3eb]">
                <span className="text-xs text-[#737872] block">Enhancements:</span>
                <span className="text-xs text-[#334537] font-medium">
                  {bookingConfirmed.addOns.join(', ')}
                </span>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleDownloadPass(bookingConfirmed)}
              className="w-full sm:w-auto bg-[#334537] text-white hover:bg-[#263529] font-sans text-xs font-semibold px-6 py-3.5 rounded-full flex items-center justify-center gap-2 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Pass (.TXT)</span>
            </button>
            <button
              onClick={() => {
                setBookingConfirmed(null);
                setFullName('');
                setSpecialRequests('');
              }}
              className="w-full sm:w-auto border border-[#dde3eb] bg-white hover:bg-[#eff4fc] text-[#334537] font-sans text-xs font-semibold px-6 py-3.5 rounded-full transition-all"
            >
              Book Another Treatment
            </button>
          </div>
        </div>
      ) : (
        <div>
          {/* Top Toggle for Existing Bookings */}
          {existingBookings.length > 0 && (
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setShowMyBookings(!showMyBookings)}
                className="bg-white/80 border border-[#dde3eb] text-[#334537] hover:bg-[#eff4fc] font-sans text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-2 shadow-xs transition-colors"
              >
                <Calendar className="w-3.5 h-3.5 text-[#735c00]" />
                <span>My Appointments ({existingBookings.length})</span>
              </button>
            </div>
          )}

          {/* Existing Bookings Drawer / List */}
          {showMyBookings && existingBookings.length > 0 && (
            <div className="mb-12 glass-panel-white p-6 rounded-2xl border border-[#dde3eb] ambient-shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-serif text-xl font-bold text-[#334537]">
                  Your Scheduled Visits
                </h3>
                <button
                  onClick={() => setShowMyBookings(false)}
                  className="text-xs text-[#737872] hover:text-[#334537] underline"
                >
                  Hide
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {existingBookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white p-4 rounded-xl border border-[#dde3eb] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-serif font-bold text-base text-[#334537]">
                          {b.serviceName}
                        </span>
                        <span className="text-xs font-mono font-bold text-[#735c00]">
                          {b.bookingRef}
                        </span>
                      </div>
                      <p className="text-xs text-[#434843]">
                        {b.date} at {b.time} • {b.serviceDuration}
                      </p>
                      <p className="text-xs text-[#737872] mt-1">Guest: {b.fullName}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#dde3eb]">
                      <button
                        onClick={() => handleDownloadPass(b)}
                        className="text-xs text-[#334537] hover:underline flex items-center gap-1 font-medium"
                      >
                        <Download className="w-3 h-3" /> Pass
                      </button>
                      <button
                        onClick={() => handleDeleteBooking(b.id)}
                        className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" /> Cancel
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main 2-Column Booking Layout (Matching Screen 3) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column: Context & Droplet Image */}
            <div className="flex flex-col gap-6">
              <div>
                <span className="font-sans text-xs font-semibold text-[#735c00] tracking-[0.2em] uppercase block mb-3">
                  APPOINTMENT RESERVATION
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#334537] mb-5 leading-tight">
                  Reserve Your Escape
                </h1>
                <p className="font-sans text-base sm:text-lg text-[#434843] leading-relaxed">
                  Experience tranquility in the heart of Baner. Secure your appointment for a restorative journey designed to rejuvenate your mind, body, and spirit in our serene, minimalist sanctuary.
                </p>
              </div>

              {/* Macro droplet on stone image */}
              <div className="rounded-2xl overflow-hidden shadow-md h-64 md:h-80 relative bg-[#eff4fc] border border-[#dde3eb]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRtIE5s3mmJw6RQ5WSfexdgutHoa7IH_ZsVtPo3vDRiVuMP1DfWvtd2Nylh7Odsj0lUM0MAx2gCWFkIrOSNOF7qG3acuw0W6jDTykTJ1yGkWARMRWHEw0PWzzgw9FnVZKFuQPLlXwOziDEjbYgnBiBaH5hPaVOJQQ1jVBDhOAy5w2CR2io16kGtvPMXuswUBAVFHijPCTpbel3V_MYt28dphY_W8s-WxxQYZatO7_KZYGqiFGyZvh-Dw"
                  alt="A macro shot of essential oils dripping onto a smooth, warm grey river stone resting on pristine white linen."
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-xl p-3 border border-[#dde3eb] flex items-center justify-between text-xs font-sans">
                  <div>
                    <span className="font-bold text-[#334537] block">{SPA_INFO.name}</span>
                    <span className="text-[#434843]">123 Wellness Avenue, Baner</span>
                  </div>
                  <span className="text-[#735c00] font-semibold font-mono">Open Daily</span>
                </div>
              </div>

              {/* Instant Call / WhatsApp Booking Assistance Highlight */}
              <div className="bg-gradient-to-r from-[#2a3c2e] to-[#1a281e] text-white p-5 rounded-2xl shadow-lg border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[11px] font-bold tracking-widest uppercase text-[#fed65b]">
                    INSTANT CONCIERGE DESK
                  </span>
                  <span className="inline-block w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
                </div>
                <p className="font-sans text-xs text-white/90 leading-relaxed">
                  Need a customized package, immediate same-day slot, or prefer booking over the phone?
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href="https://wa.me/917875431212?text=Hello%20Sanj%20Spa%20Baner,%20I%20would%20like%20to%20book%20a%20spa%20session."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#20bd5a] text-white py-2.5 px-3 rounded-xl font-sans text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md"
                  >
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href="tel:+917875431212"
                    className="bg-[#fed65b] hover:bg-[#ffe088] text-[#263529] py-2.5 px-3 rounded-xl font-sans text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>+91 78754 31212</span>
                  </a>
                </div>
              </div>

              {/* Inclusions summary */}
              <div className="bg-[#eff4fc] rounded-2xl p-5 border border-[#dde3eb]/70 space-y-2 text-xs font-sans text-[#434843]">
                <span className="font-semibold text-[#334537] uppercase tracking-wider block">
                  Every Session Includes:
                </span>
                <p>• Complimentary Valet Parking directly at entrance</p>
                <p>• Pre-treatment botanical consultation & herbal infusion</p>
                <p>• Access to private rainfall shower & organic amenities</p>
              </div>
            </div>

            {/* Right Column: Booking Form */}
            <div className="glass-panel-white ambient-shadow rounded-2xl p-6 md:p-8 border border-[#dde3eb]">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="booking-name"
                      className="font-sans text-xs font-semibold text-[#434843] uppercase tracking-wider"
                    >
                      Full Name
                    </label>
                    <input
                      id="booking-name"
                      type="text"
                      placeholder="Enter your name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="bg-transparent border-b border-[#c3c8c1] px-0 py-2 focus:border-[#334537] focus:ring-0 focus:outline-none transition-colors font-sans text-sm text-[#161c22] placeholder:text-[#737872]/60"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="booking-phone"
                      className="font-sans text-xs font-semibold text-[#434843] uppercase tracking-wider"
                    >
                      Phone Number
                    </label>
                    <input
                      id="booking-phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="bg-transparent border-b border-[#c3c8c1] px-0 py-2 focus:border-[#334537] focus:ring-0 focus:outline-none transition-colors font-sans text-sm text-[#161c22] placeholder:text-[#737872]/60"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="booking-email"
                    className="font-sans text-xs font-semibold text-[#434843] uppercase tracking-wider"
                  >
                    Email Address
                  </label>
                  <input
                    id="booking-email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-transparent border-b border-[#c3c8c1] px-0 py-2 focus:border-[#334537] focus:ring-0 focus:outline-none transition-colors font-sans text-sm text-[#161c22] placeholder:text-[#737872]/60"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="booking-service"
                      className="font-sans text-xs font-semibold text-[#434843] uppercase tracking-wider"
                    >
                      Preferred Service
                    </label>
                    <span className="font-serif font-bold text-sm text-[#735c00]">
                      {currentService.price} ({currentService.duration})
                    </span>
                  </div>
                  <select
                    id="booking-service"
                    value={selectedServiceId}
                    onChange={(e) => setSelectedServiceId(e.target.value)}
                    className="bg-transparent border-b border-[#c3c8c1] px-0 py-2 focus:border-[#334537] focus:ring-0 focus:outline-none transition-colors font-sans text-sm text-[#161c22]"
                  >
                    {SERVICES_DATA.map((s) => (
                      <option key={s.id} value={s.id} className="bg-white text-[#161c22]">
                        {s.title} — {s.price} ({s.duration})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date & Time Select */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <label
                        htmlFor="booking-date"
                        className="font-sans text-xs font-semibold text-[#434843] uppercase tracking-wider"
                      >
                        Date
                      </label>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => handleQuickDate(1)}
                          className="text-[10px] text-[#735c00] hover:underline"
                        >
                          Tomorrow
                        </button>
                      </div>
                    </div>
                    <input
                      id="booking-date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="bg-transparent border-b border-[#c3c8c1] px-0 py-2 focus:border-[#334537] focus:ring-0 focus:outline-none transition-colors font-sans text-sm text-[#161c22]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="booking-time"
                      className="font-sans text-xs font-semibold text-[#434843] uppercase tracking-wider"
                    >
                      Time Slot
                    </label>
                    <select
                      id="booking-time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                      className="bg-transparent border-b border-[#c3c8c1] px-0 py-2 focus:border-[#334537] focus:ring-0 focus:outline-none transition-colors font-sans text-sm text-[#161c22]"
                    >
                      <option value="10:00" className="bg-white">10:00 AM (Morning Calm)</option>
                      <option value="12:00" className="bg-white">12:00 PM (Midday Rest)</option>
                      <option value="14:00" className="bg-white">02:00 PM (Afternoon Reset)</option>
                      <option value="16:00" className="bg-white">04:00 PM (Sunset Serenity)</option>
                      <option value="18:00" className="bg-white">06:00 PM (Evening Unwind)</option>
                      <option value="19:30" className="bg-white">07:30 PM (Twilight Recovery)</option>
                    </select>
                  </div>
                </div>

                {/* Optional Enhancements / Add-ons */}
                <div className="pt-2">
                  <span className="font-sans text-xs font-semibold text-[#434843] uppercase tracking-wider block mb-2.5">
                    Optional Sanctuary Enhancements
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      { name: '15-min Scalp Acupressure', fee: '+₹600' },
                      { name: 'Private Steam & Sauna Suite', fee: '+₹800' },
                      { name: 'Organic Body Polish Finish', fee: '+₹950' },
                      { name: 'Custom Essential Oil Roll-On', fee: '+₹550' },
                    ].map((addon) => {
                      const isSelected = selectedAddons.includes(addon.name);
                      return (
                        <button
                          key={addon.name}
                          type="button"
                          onClick={() => handleAddonToggle(addon.name)}
                          className={`text-left p-2.5 rounded-xl border text-xs font-sans flex justify-between items-center transition-all ${
                            isSelected
                              ? 'bg-[#d3e8d5] border-[#334537] text-[#0e1f13] font-medium'
                              : 'bg-[#eff4fc]/50 border-[#dde3eb] text-[#434843] hover:bg-[#eff4fc]'
                          }`}
                        >
                          <span>{addon.name}</span>
                          <span className="text-[#735c00] font-semibold">{addon.fee}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Special Requests */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="booking-notes"
                    className="font-sans text-xs font-semibold text-[#434843] uppercase tracking-wider"
                  >
                    Special Requests or Pressure Preference (Optional)
                  </label>
                  <input
                    id="booking-notes"
                    type="text"
                    placeholder="e.g. Focus on neck and shoulder knots, prefer gentle pressure"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="bg-transparent border-b border-[#c3c8c1] px-0 py-2 focus:border-[#334537] focus:ring-0 focus:outline-none transition-colors font-sans text-sm text-[#161c22] placeholder:text-[#737872]/60"
                  />
                </div>

                {/* Submit Button */}
                <button
                  id="confirm-booking-submit-btn"
                  type="submit"
                  className="mt-2 bg-[#334537] hover:bg-[#263529] text-white w-full py-4 rounded-xl font-serif text-lg font-bold transition-all active:scale-[0.98] duration-200 shadow-md flex items-center justify-center gap-2 shimmer-btn"
                >
                  <span>Confirm Booking</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <p className="text-center font-sans text-xs text-[#737872] mt-1">
                  Sanj Spa Baner • A sanctuary of quiet luxury. No advance deposit required.
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
