/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenConcierge: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConcierge }) => {
  return (
    <footer className="border-t border-[#FFCC53]/15 bg-[#041A14]/95 text-[#8EAA9F] py-14 px-6 text-xs relative z-10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        {/* Brand statement */}
        <div className="space-y-3">
          <div className="text-xl font-serif-luxury font-medium text-[#FBF8EE] tracking-widest flex items-center gap-2">
            <span className="text-[#FFCC53] font-subhead">KRONOS</span>
          </div>
          <p className="text-xs text-[#8EAA9F] leading-relaxed max-w-xs font-light">
            Premier digital catalogue documenting the world’s most distinguished mechanical chronometers, perpetual calendars, and haute horlogerie masterworks.
          </p>
        </div>

        {/* Global Ateliers */}
        <div>
          <span className="font-mono-num uppercase tracking-wider text-[#FBF8EE] text-xs block mb-3 font-semibold">
            Global Salons
          </span>
          <ul className="space-y-1.5 text-xs text-[#8EAA9F]">
            <li>Geneva · Rue du Rhône 42</li>
            <li>Tokyo · Ginza 6-Chome</li>
            <li>London · New Bond Street 14</li>
            <li>Paris · Place Vendôme 18</li>
            <li>New York · Madison Avenue 640</li>
          </ul>
        </div>

        {/* Curation */}
        <div>
          <span className="font-mono-num uppercase tracking-wider text-[#FBF8EE] text-xs block mb-3 font-semibold">
            Atelier Services
          </span>
          <ul className="space-y-1.5 text-xs text-[#8EAA9F]">
            <li>
              <button onClick={onOpenConcierge} className="hover:text-[#FFCC53] transition-colors cursor-pointer">
                Private Client Salon Viewing
              </button>
            </li>
            <li>
              <button onClick={onOpenConcierge} className="hover:text-[#FFCC53] transition-colors cursor-pointer">
                Atelier Allocation Requests
              </button>
            </li>
            <li>Verified Manufacturer Provenance</li>
            <li>Certified Chronometer Standards</li>
          </ul>
        </div>

        {/* Guarantee */}
        <div>
          <span className="font-mono-num uppercase tracking-wider text-[#FBF8EE] text-xs block mb-3 font-semibold">
            Client Assurance
          </span>
          <p className="text-xs text-[#8EAA9F] leading-relaxed font-light">
            Every listed timepiece is indexed directly with certified atelier calibres, confirmed tolerances, and manufacturer reference specifications.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-[#FFCC53]/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-num text-[11px] text-[#8EAA9F]/70">
        <div>
          © 2026 KRONOS Watch Catalogue · All Masterwork Rights Reserved
        </div>
        <div className="flex items-center gap-2 text-[#FFCC53]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#FFCC53]" />
          <span>Certified Horological Registry</span>
        </div>
      </div>
    </footer>
  );
};
