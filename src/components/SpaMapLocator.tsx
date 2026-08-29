import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, Phone, MessageCircle, Calendar, ExternalLink, Sparkles, CheckCircle2, Compass } from 'lucide-react';
import { SPA_INFO } from '../data/spaData';

interface SpaMapLocatorProps {
  onBookClick?: () => void;
}

export const SpaMapLocator: React.FC<SpaMapLocatorProps> = ({ onBookClick }) => {
  const locatorContainerRef = useRef<HTMLDivElement>(null);
  const [useCustomElement, setUseCustomElement] = useState(false);
  const apiKey = (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY || '';

  const lat = SPA_INFO.mapCoordinates.lat; // 18.5613842
  const lng = SPA_INFO.mapCoordinates.lng; // 73.7859743
  const placeId = SPA_INFO.placeId || 'ChIJyXGTJqO_wjsRfG81VrK1pTw';
  
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${placeId}`;
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'New Sanj Spa & Massage - Best Spa in Baner, 1-A SN 77/1, Sun Flower Baner, Pune'
  )}&query_place_id=${placeId}`;
  const embedMapUrl = `https://maps.google.com/maps?q=${lat},${lng}&hl=en&z=17&output=embed`;

  useEffect(() => {
    // If an API key is available, initialize Google Maps Extended Component Library for gmpx-store-locator
    if (apiKey && apiKey !== 'YOUR_API_KEY_HERE') {
      const scriptId = 'google-maps-extended-library';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.type = 'module';
        script.src = 'https://ajax.googleapis.com/ajax/libs/@googlemaps/extended-component-library/0.6.15/index.min.js';
        script.onload = () => {
          setUseCustomElement(true);
        };
        document.head.appendChild(script);
      } else {
        setUseCustomElement(true);
      }
    }
  }, [apiKey]);

  useEffect(() => {
    if (useCustomElement && locatorContainerRef.current) {
      const configuration = {
        locations: [
          {
            title: 'New Sanj Spa & Massage - Best Spa in Baner',
            address1: '1-A SN 77/1, Sun Flower Baner',
            address2: 'Pune, Maharashtra, India',
            coords: { lat, lng },
            placeId: placeId,
            actions: [
              {
                label: 'Book appointment',
                defaultUrl: '#booking',
              },
            ],
          },
        ],
        mapOptions: {
          center: { lat, lng },
          fullscreenControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          zoom: 16,
          zoomControl: true,
          maxZoom: 19,
          mapId: '',
        },
        mapsApiKey: apiKey,
        capabilities: {
          input: true,
          autocomplete: true,
          directions: true,
          distanceMatrix: true,
          details: true,
          actions: true,
        },
      };

      try {
        const locatorEl = locatorContainerRef.current.querySelector('gmpx-store-locator');
        if (locatorEl && (locatorEl as any).configureFromQuickBuilder) {
          (locatorEl as any).configureFromQuickBuilder(configuration);
        }
      } catch (err) {
        console.warn('Could not configure store locator web component:', err);
      }
    }
  }, [useCustomElement, apiKey, lat, lng, placeId]);

  return (
    <div className="w-full space-y-6">
      {/* Store Locator Card Container */}
      <div className="bg-white rounded-3xl overflow-hidden border border-[#dde3eb] shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
          
          {/* Left Panel: Store Information & Quick Actions */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#fbfcff] border-b lg:border-b-0 lg:border-r border-[#dde3eb]">
            <div className="space-y-5">
              {/* Badge */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-[#fed65b]/30 text-[#745c00] text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-[#fed65b]/50">
                  <MapPin className="w-3.5 h-3.5" />
                  Verified Location
                </span>
                <span className="text-[11px] text-[#25D366] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Open Now (Until 9:30 PM)
                </span>
              </div>

              {/* Title & Address */}
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#161c22] leading-snug">
                  SANJ SPA BANER
                </h3>
                <p className="text-xs font-semibold text-[#735c00] tracking-wide uppercase mt-0.5">
                  Luxury Wellness & Massage Retreat
                </p>
                <div className="mt-3 text-sm text-[#434843] leading-relaxed flex items-start gap-2.5">
                  <Compass className="w-4 h-4 text-[#735c00] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#161c22]">1-A SN 77/1, Sun Flower Baner</strong><br />
                    Baner - Mahalunge Road, Baner<br />
                    Pune, Maharashtra 411045, India
                  </div>
                </div>
              </div>

              {/* Coordinates Pill */}
              <div className="bg-white p-3 rounded-xl border border-[#dde3eb] flex items-center justify-between text-xs font-mono text-[#5d645e]">
                <span>GPS: {lat.toFixed(5)}° N, {lng.toFixed(5)}° E</span>
                <span className="text-[10px] uppercase font-sans font-bold bg-[#eff4fc] text-[#334537] px-2 py-0.5 rounded">
                  Place ID: {placeId.substring(0, 10)}...
                </span>
              </div>
            </div>

            {/* Interactive Location Action Buttons */}
            <div className="mt-6 pt-6 border-t border-[#dde3eb] space-y-3">
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  id="map-directions-btn"
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#334537] hover:bg-[#435948] text-white font-sans text-xs font-bold py-3 px-3 rounded-xl transition-all shadow-sm hover:shadow-md"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>

                <a
                  id="map-open-google-btn"
                  href={mapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white hover:bg-[#eff4fc] text-[#334537] border border-[#dde3eb] font-sans text-xs font-bold py-3 px-3 rounded-xl transition-all shadow-2xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                </a>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  id="map-whatsapp-btn"
                  href={`https://wa.me/917875431212?text=${encodeURIComponent(
                    'Hello Sanj Spa Baner, I am navigating to your spa at Sun Flower Baner and would like to check available slots.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-sans text-xs font-bold py-2.5 px-3 rounded-xl transition-all shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Desk</span>
                </a>

                {onBookClick ? (
                  <button
                    id="map-book-appointment-btn"
                    onClick={onBookClick}
                    className="flex items-center justify-center gap-2 bg-[#fed65b] hover:bg-[#ffe088] text-[#263529] font-sans text-xs font-bold py-2.5 px-3 rounded-xl transition-all shadow-xs"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Session</span>
                  </button>
                ) : (
                  <a
                    href="tel:+917875431212"
                    className="flex items-center justify-center gap-2 bg-[#fed65b] hover:bg-[#ffe088] text-[#263529] font-sans text-xs font-bold py-2.5 px-3 rounded-xl transition-all shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call +91 78754</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel: Interactive Google Map / Extended Locator */}
          <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[460px] bg-[#e5e9ef]" ref={locatorContainerRef}>
            {useCustomElement && apiKey && apiKey !== 'YOUR_API_KEY_HERE' ? (
              <div className="w-full h-full min-h-[460px]">
                {/* @ts-ignore */}
                <gmpx-api-loader key={apiKey} solution-channel="GMP_QB_locatorplus_v11_cABDF" />
                {/* @ts-ignore */}
                <gmpx-store-locator map-id="DEMO_MAP_ID" class="w-full h-full" />
              </div>
            ) : (
              <div className="w-full h-full relative">
                {/* Live Responsive Interactive Google Map Frame */}
                <iframe
                  title="New Sanj Spa Baner Location Map"
                  src={embedMapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '380px', width: '100%', height: '100%' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full min-h-[380px] lg:min-h-[460px]"
                />

                {/* Floating Interactive Map Header Bar */}
                <div className="absolute top-4 left-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-[#dde3eb] flex items-center justify-between pointer-events-auto">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <div className="w-7 h-7 rounded-full bg-[#735c00] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-bold text-[#161c22] truncate">
                        SANJ SPA BANER
                      </div>
                      <div className="text-[11px] text-[#5d645e] truncate">
                        Sun Flower Baner, Baner - Mahalunge Rd
                      </div>
                    </div>
                  </div>

                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 bg-[#334537] hover:bg-[#4a5e4f] text-white font-sans text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1 transition-all"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Navigate</span>
                  </a>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
