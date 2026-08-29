import React from 'react';
import { X, Shield, FileText } from 'lucide-react';
import { SPA_INFO } from '../data/spaData';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 max-h-[85vh] overflow-y-auto shadow-2xl border border-[#dde3eb] relative font-sans">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#eff4fc] text-[#434843] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'privacy' ? (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#d3e8d5] flex items-center justify-center text-[#334537]">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#334537]">Privacy Policy</h3>
                <span className="text-xs text-[#737872]">Last Updated: August 2024</span>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#434843] leading-relaxed">
              <p>
                At <strong>{SPA_INFO.name}</strong>, we consider the privacy and confidentiality of our sanctuary guests paramount.
              </p>
              <h4 className="font-serif font-bold text-[#334537] text-base pt-2">1. Information Collection</h4>
              <p>
                We only collect information strictly required to facilitate your wellness consultations and appointments (e.g. name, contact number, email, and treatment preferences).
              </p>
              <h4 className="font-serif font-bold text-[#334537] text-base pt-2">2. Confidentiality of Health Consultations</h4>
              <p>
                All medical declarations, tension patterns, and essential oil sensitivities disclosed to therapists remain strictly confidential and are not shared with third parties.
              </p>
              <h4 className="font-serif font-bold text-[#334537] text-base pt-2">3. Communications</h4>
              <p>
                Appointment confirmations and reminders are delivered via secure channels. You may opt out of promotional wellness dispatches at any time.
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#d3e8d5] flex items-center justify-center text-[#334537]">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#334537]">Terms of Service</h3>
                <span className="text-xs text-[#737872]">Sanj Spa Baner Sanctuary Guidelines</span>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#434843] leading-relaxed">
              <h4 className="font-serif font-bold text-[#334537] text-base pt-2">1. Arrival & Sanctuary Etiquette</h4>
              <p>
                To preserve the tranquil atmosphere of our Baner retreat, we kindly request mobile devices be switched to silent mode upon arrival. Please arrive 15 minutes prior to your treatment.
              </p>
              <h4 className="font-serif font-bold text-[#334537] text-base pt-2">2. Cancellations & Rescheduling</h4>
              <p>
                We request a minimum 24-hour advance notification for single appointments and 48 hours for group packages to allow our therapists to reallocate session rooms.
              </p>
              <h4 className="font-serif font-bold text-[#334537] text-base pt-2">3. Health Considerations</h4>
              <p>
                Guests with cardiovascular conditions, acute skin sensitivities, or pregnancy should inform our front desk team during check-in for tailored therapy protocols.
              </p>
            </div>
          </div>
        )}

        <div className="pt-6 mt-6 border-t border-[#dde3eb] flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#334537] text-white px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
