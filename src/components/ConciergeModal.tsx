/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { WatchModel } from '../data/watchCatalogue';
import { X, CheckCircle2, Shield, Calendar, MapPin } from 'lucide-react';

interface ConciergeModalProps {
  initialWatch: WatchModel | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ConciergeModal: React.FC<ConciergeModalProps> = ({
  initialWatch,
  isOpen,
  onClose,
}) => {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [salonCity, setSalonCity] = useState<string>('Geneva Salon (Rue du Rhône)');
  const [message, setMessage] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl bg-[#082C22] text-[#FBF8EE] border border-[#FFCC53]/25 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 luxury-card-shadow">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded bg-white/[0.05] hover:bg-white/[0.1] text-[#8EAA9F] hover:text-[#FBF8EE] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#FFCC53]/20 text-[#FFCC53] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h3 className="text-2xl font-serif-luxury font-light text-[#FBF8EE]">
              Salon Appointment Requested
            </h3>

            <p className="text-xs text-[#8EAA9F] max-w-md mx-auto leading-relaxed">
              Thank you, <span className="text-[#FBF8EE] font-medium">{fullName}</span>. An atelier client advisor from our {salonCity} has received your inquiry reference{' '}
              <span className="font-mono-num text-[#FFCC53]">#KRN-2026-INQ</span> and will contact you within 4 hours.
            </p>

            <div className="pt-4">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 bg-[#FFCC53] text-[#041A14] text-xs font-semibold rounded cursor-pointer hover:bg-[#FFE082] transition-colors shadow-md"
              >
                Return to Catalogue
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <span className="text-xs font-mono-num uppercase tracking-widest text-[#FFCC53] block mb-1">
                PRIVATE CLIENT ADVISORY
              </span>
              <h3 className="text-2xl font-serif-luxury font-light text-[#FBF8EE]">
                Request Private Salon Viewing & Allocation
              </h3>
              <p className="text-xs text-[#8EAA9F] mt-1 font-light">
                Schedule a confidential consultation with an authorized horological advisor.
              </p>
            </div>

            {/* Timepiece Context Banner if pre-selected */}
            {initialWatch && (
              <div className="flex items-center gap-3 p-3 bg-[#041A14]/75 rounded-lg border border-[#FFCC53]/15">
                <img
                  src={initialWatch.image}
                  alt={initialWatch.name}
                  className="w-12 h-12 rounded object-cover bg-[#041A14] border border-[#FFCC53]/20"
                  referrerPolicy="no-referrer"
                />
                <div className="text-xs font-mono-num min-w-0">
                  <span className="text-[#FFCC53] uppercase block text-[10px]">
                    {initialWatch.maison} · {initialWatch.reference}
                  </span>
                  <span className="text-[#FBF8EE] font-medium block truncate">
                    {initialWatch.name}
                  </span>
                  <span className="text-[#8EAA9F]">{initialWatch.priceFormatted}</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono-num">
              <div>
                <label className="text-[#8EAA9F] block mb-1.5 uppercase text-[10px]">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lord Marcus Vance"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#0D3E31] border border-[#FFCC53]/20 rounded px-3 py-2 text-[#FBF8EE] focus:outline-none focus:border-[#FFCC53]"
                />
              </div>

              <div>
                <label className="text-[#8EAA9F] block mb-1.5 uppercase text-[10px]">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0D3E31] border border-[#FFCC53]/20 rounded px-3 py-2 text-[#FBF8EE] focus:outline-none focus:border-[#FFCC53]"
                />
              </div>

              <div>
                <label className="text-[#8EAA9F] block mb-1.5 uppercase text-[10px]">
                  Direct Contact Number
                </label>
                <input
                  type="tel"
                  placeholder="+41 22 819 1800"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#0D3E31] border border-[#FFCC53]/20 rounded px-3 py-2 text-[#FBF8EE] focus:outline-none focus:border-[#FFCC53]"
                />
              </div>

              <div>
                <label className="text-[#8EAA9F] block mb-1.5 uppercase text-[10px]">
                  Preferred Salon
                </label>
                <select
                  value={salonCity}
                  onChange={(e) => setSalonCity(e.target.value)}
                  className="w-full bg-[#0D3E31] border border-[#FFCC53]/20 rounded px-3 py-2 text-[#FBF8EE] focus:outline-none focus:border-[#FFCC53] cursor-pointer"
                >
                  <option value="Geneva Salon (Rue du Rhône)">Geneva Salon (Rue du Rhône)</option>
                  <option value="Tokyo Salon (Ginza District)">Tokyo Salon (Ginza District)</option>
                  <option value="London Salon (New Bond Street)">London Salon (New Bond Street)</option>
                  <option value="Paris Salon (Place Vendôme)">Paris Salon (Place Vendôme)</option>
                  <option value="New York Salon (Madison Avenue)">New York Salon (Madison Avenue)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[#8EAA9F] block mb-1.5 text-xs font-mono-num uppercase text-[10px]">
                Specific Questions / Acquisition Inquiries (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Indicate your preferred appointment timing or bespoke strap configurations..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#0D3E31] border border-[#FFCC53]/20 rounded px-3 py-2 text-xs text-[#FBF8EE] focus:outline-none focus:border-[#FFCC53]"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-[#8EAA9F] font-mono-num flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#FFCC53]" />
                Confidentiality Guaranteed
              </span>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#FFCC53] hover:bg-[#FFE082] text-[#041A14] text-xs font-semibold rounded uppercase tracking-wider transition-colors cursor-pointer shadow-md"
              >
                Submit Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
