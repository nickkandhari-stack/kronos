/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HorologicalMasterwork } from '../types/horology';
import { X, Printer, Download, BookOpen, ExternalLink, ShieldCheck, Terminal } from 'lucide-react';

interface DossierProps {
  maison: HorologicalMasterwork | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ScholarlyDossierModal: React.FC<DossierProps> = ({ maison, isOpen, onClose }) => {
  if (!isOpen || !maison) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#020B06] text-[#ECFDF5] border-2 border-[#00FF66] shadow-[0_0_50px_rgba(0,255,102,0.25)] rounded-lg p-6 sm:p-10 my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-emerald-400 hover:text-white rounded-full bg-[#062316] border border-[#00FF66]/40 transition-colors no-print cursor-pointer"
          title="Close Dossier"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Action Controls for Printing & Export */}
        <div className="flex items-center justify-between border-b border-emerald-950 pb-4 mb-6 no-print">
          <div className="flex items-center gap-2 text-xs font-mono-ledger text-[#00FF66]">
            <ShieldCheck className="w-4 h-4 text-[#00FF66]" />
            <span>KRONOS NEO-MATRIX CODEX · CURATORIAL CERTIFICATION</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#00FF66] hover:bg-[#34D399] text-[#020B06] font-bold text-xs rounded transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,255,102,0.4)] cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#020B06]" />
              <span>Print / Export PDF Monograph</span>
            </button>
          </div>
        </div>

        {/* Printable Monograph Body */}
        <div className="space-y-8">
          <div className="text-center border-b border-[#00FF66]/40 pb-6">
            <span className="text-[11px] font-mono-ledger uppercase tracking-widest text-[#00FF66] block mb-1">
              &gt; INSTITUT INTERNATIONAL D'HAUTE HORLOGERIE · CODEX KRN-{maison.id.toUpperCase()}-2026
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-light text-white my-2">
              {maison.maison}
            </h1>
            <p className="text-sm font-subhead uppercase tracking-wider text-[#D4AF37]">
              "{maison.epitaph}"
            </p>
            <div className="flex justify-center items-center gap-3 text-xs font-mono-ledger text-emerald-300 mt-3">
              <span>Foundation Anno {maison.establishedYear}</span>
              <span aria-hidden="true" className="text-emerald-800">·</span>
              <span>{maison.originLocation}</span>
              <span aria-hidden="true" className="text-emerald-800">·</span>
              <span>Masterwork: {maison.referenceNumber}</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-mono-ledger uppercase tracking-widest text-[#00FF66]">
              I. Curatorial Thesis & Historical Monograph
            </h3>
            <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:font-normal first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#00FF66] first-letter:drop-shadow-[0_0_10px_rgba(0,255,102,0.5)]">
              {maison.curatorialNarrative}
            </p>
            <p className="text-emerald-200/80 text-xs sm:text-sm leading-relaxed">
              Historical Significance: {maison.historicalSignificance}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-mono-ledger uppercase tracking-widest text-[#00FF66]">
              II. Caliber Engineering Ledger
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono-ledger text-xs bg-[#062316]/50 p-4 border border-emerald-900 rounded">
              <div>
                <span className="text-emerald-500 block text-[10px] uppercase">Caliber</span>
                <span className="text-white font-medium">{maison.caliberProfile.designation}</span>
              </div>
              <div>
                <span className="text-emerald-500 block text-[10px] uppercase">Winding Type</span>
                <span className="text-white">{maison.caliberProfile.windingType}</span>
              </div>
              <div>
                <span className="text-emerald-500 block text-[10px] uppercase">Frequency</span>
                <span className="text-[#00FF66] font-semibold">{maison.caliberProfile.frequencyVph.toLocaleString()} VPH ({maison.caliberProfile.frequencyHz} Hz)</span>
              </div>
              <div>
                <span className="text-emerald-500 block text-[10px] uppercase">Power Reserve</span>
                <span className="text-white">{maison.caliberProfile.powerReserveHours} Hours</span>
              </div>
              <div>
                <span className="text-emerald-500 block text-[10px] uppercase">Jewel Count</span>
                <span className="text-white">{maison.caliberProfile.jewelCount} Jewels</span>
              </div>
              <div>
                <span className="text-emerald-500 block text-[10px] uppercase">Escapement Architecture</span>
                <span className="text-white">{maison.caliberProfile.escapementType}</span>
              </div>
              <div>
                <span className="text-emerald-500 block text-[10px] uppercase">Balance Spring Alloy</span>
                <span className="text-white">{maison.caliberProfile.balanceSpringType}</span>
              </div>
              <div>
                <span className="text-emerald-500 block text-[10px] uppercase">Human Hand Finishing</span>
                <span className="text-[#00FF66] font-semibold">{maison.humanInterventionIndex}% Ateliers</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-mono-ledger uppercase tracking-widest text-[#00FF66]">
              III. Certified Horological Patents & Inventions
            </h3>
            <div className="space-y-2">
              {maison.keyInnovations.map((inv, idx) => (
                <div key={idx} className="p-3 bg-[#062316]/30 border border-emerald-900/60 rounded text-xs">
                  <div className="flex justify-between font-mono-ledger font-semibold text-white mb-0.5">
                    <span>{inv.title}</span>
                    <span className="text-[#00FF66]">{inv.year}</span>
                  </div>
                  <p className="text-emerald-200/80 text-[11px]">{inv.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3 border-t border-emerald-950 pt-6">
            <h3 className="text-xs font-mono-ledger uppercase tracking-widest text-[#00FF66]">
              IV. Curatorial Bibliography & Museum Repositories
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-emerald-100/80">
              <div className="p-3 bg-[#03140C] border border-emerald-950 rounded">
                <span className="text-[#00FF66] font-semibold block mb-1">Permanent Public Exhibitions:</span>
                <ul className="space-y-1 text-[11px]">
                  <li>• Musée International d’Horlogerie (MIH), La Chaux-de-Fonds</li>
                  <li>• Patek Philippe Museum, Rue des Vieux-Grenadiers, Geneva</li>
                  <li>• The Seiko Museum Ginza, Tokyo, Japan</li>
                  <li>• British Museum Clocks and Watches Gallery, London</li>
                </ul>
              </div>
              <div className="p-3 bg-[#03140C] border border-emerald-950 rounded">
                <span className="text-[#00FF66] font-semibold block mb-1">Primary Literature & Archival Sources:</span>
                <ul className="space-y-1 text-[11px]">
                  <li>• Daniels, George. <em>Watchmaking</em>. Sotheby's Publications, 1981.</li>
                  <li>• Meis, Reinhard. <em>Das Tourbillon</em>. Callwey Verlag, 1993.</li>
                  <li>• Tanaka, Taro. <em>The Grammar of Design</em>. Tokyo, 1967.</li>
                  <li>• Ibe, Kikuo. <em>Project Team Tough Technical Dossier</em>. Casio Computer Co., 1983.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-emerald-950 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono-ledger text-emerald-500">
            <div>
              Archival Registry: KRONOS Horological Institute · Certified Curatorial Record
            </div>
            <div className="mt-2 sm:mt-0 text-[#00FF66]">
              Preserved in Perpetuity for Human Civilization
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
