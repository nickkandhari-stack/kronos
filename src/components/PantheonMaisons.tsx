/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MAISONS_DATA } from '../data/maisons';
import { HorologicalMasterwork, CuratorialGroup } from '../types/horology';
import { MaisonLaboratory } from './MaisonLaboratories';
import { ChevronRight, Award, Compass, Sliders, Layers, Sparkles, BookOpen, Terminal } from 'lucide-react';

interface PantheonProps {
  onOpenDossier: (maison: HorologicalMasterwork) => void;
}

const GROUP_LABELS: Record<CuratorialGroup, { title: string; subtitle: string; color: string }> = {
  inceptors: {
    title: 'The Inceptors of Classical Science & Complications',
    subtitle: 'Breguet · Patek Philippe · Longines',
    color: '#00FF66'
  },
  architects: {
    title: 'The Architects of Avant-Garde Form & Physical Mastery',
    subtitle: 'Audemars Piguet · Hublot · F.P. Journe',
    color: '#34D399'
  },
  'masters-east': {
    title: 'The Masters of Eastern Precision & Micro-Artistry',
    subtitle: 'Credor · Grand Seiko · Orient',
    color: '#D4AF37'
  },
  titans: {
    title: 'The Titans of Uncompromising Utilitarianism',
    subtitle: 'Rolex · Casio',
    color: '#10B981'
  }
};

export const PantheonMaisons: React.FC<PantheonProps> = ({ onOpenDossier }) => {
  const [selectedGroup, setSelectedGroup] = useState<CuratorialGroup | 'all'>('all');
  const [activeMaisonId, setActiveMaisonId] = useState<string>(MAISONS_DATA[0].id);

  const displayedMaisons = selectedGroup === 'all'
    ? MAISONS_DATA
    : MAISONS_DATA.filter(m => m.group === selectedGroup);

  const activeMaison = MAISONS_DATA.find(m => m.id === activeMaisonId) || MAISONS_DATA[0];

  return (
    <section id="the-maisons" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <span className="font-mono-ledger text-xs tracking-widest text-[#00FF66] uppercase block mb-2">
          &gt; SECTION 02 · THE ROYAL NEO-MATRIX ARCHIVE
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-[#ECFDF5] mb-4">
          Le Panthéon des Onze Maisons
        </h2>
        <p className="text-emerald-100/80 text-sm md:text-base leading-relaxed">
          Exhaustive curatorial profiles across Western Haute Horlogerie and Japanese Micro-Artistry, documenting raw escapement geometry, metallurgic breakthroughs, and interactive bench experiments.
        </p>
      </div>

      {/* Curatorial Group Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        <button
          onClick={() => setSelectedGroup('all')}
          className={`px-4 py-2 text-xs font-mono-ledger uppercase tracking-wider rounded border transition-all cursor-pointer ${selectedGroup === 'all' ? 'bg-[#00FF66] text-[#020B06] font-bold border-[#00FF66] shadow-[0_0_12px_rgba(0,255,102,0.4)]' : 'border-emerald-950 text-emerald-300 hover:text-white bg-[#020B06]'}`}
        >
          All 11 Maisons
        </button>
        {(Object.keys(GROUP_LABELS) as CuratorialGroup[]).map(key => (
          <button
            key={key}
            onClick={() => setSelectedGroup(key)}
            className={`px-4 py-2 text-xs font-mono-ledger uppercase tracking-wider rounded border transition-all cursor-pointer ${selectedGroup === key ? 'bg-[#00FF66] text-[#020B06] font-bold border-[#00FF66] shadow-[0_0_12px_rgba(0,255,102,0.4)]' : 'border-emerald-950 text-emerald-300 hover:text-white bg-[#020B06]'}`}
          >
            {GROUP_LABELS[key].title.split(' ')[1]} ({GROUP_LABELS[key].subtitle.split('·')[0].trim()})
          </button>
        ))}
      </div>

      {/* Main Layout: Master Selector Column & Interactive Pavilion */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 11 Maisons List */}
        <div className="lg:col-span-4 space-y-2 max-h-[820px] overflow-y-auto pr-2">
          {displayedMaisons.map((maison) => {
            const isSelected = activeMaison.id === maison.id;
            return (
              <div
                key={maison.id}
                id={`maison-${maison.id}`}
                onClick={() => setActiveMaisonId(maison.id)}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${isSelected ? 'bg-[#062316] border-[#00FF66] shadow-[0_0_20px_rgba(0,255,102,0.2)]' : 'bg-[#03140C]/80 border-emerald-950 hover:border-[#00FF66]/40'}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono-ledger text-[#00FF66] font-semibold">
                    Est. {maison.establishedYear} · {maison.originLocation}
                  </span>
                  <span className="text-[11px] font-mono-ledger text-[#D4AF37]">
                    Impact {maison.culturalImpactScore}/100
                  </span>
                </div>

                <h3 className="text-lg font-serif font-bold text-white mb-0.5">
                  {maison.maison}
                </h3>
                <div className="text-xs text-emerald-100/90 font-medium">
                  {maison.commonName}
                </div>
                <div className="text-[11px] text-stone-400 font-mono-ledger mt-1">
                  Ref: {maison.referenceNumber}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Full Curatorial Pavilion of the Active Maison */}
        <div className="lg:col-span-8 bg-[#03140C] border border-[#00FF66]/35 rounded-lg p-6 sm:p-8 space-y-8 shadow-[0_0_30px_rgba(0,255,102,0.08)]">
          {/* Header & Monograph Epitaph */}
          <div className="border-b border-emerald-950 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
              <div>
                <span className="text-xs font-mono-ledger uppercase tracking-widest text-[#00FF66] block">
                  &gt; {GROUP_LABELS[activeMaison.group].title}
                </span>
                <h3 className="text-3xl sm:text-4xl font-serif text-white mt-1">
                  {activeMaison.maison}
                </h3>
                <div className="text-sm font-subhead uppercase tracking-wider text-[#D4AF37] mt-1">
                  "{activeMaison.epitaph}"
                </div>
              </div>

              <button
                onClick={() => onOpenDossier(activeMaison)}
                className="px-4 py-2 bg-[#00FF66] hover:bg-[#34D399] text-[#020B06] font-bold text-xs rounded transition-all flex items-center gap-2 whitespace-nowrap self-start sm:self-auto shadow-[0_0_15px_rgba(0,255,102,0.3)] cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#020B06]" />
                <span>Examine Scholarly Dossier</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-4 text-xs font-mono-ledger text-emerald-300/70 pt-2 border-t border-emerald-950/60 mt-4">
              <span>Foundation: <strong className="text-white">{activeMaison.establishedYear}</strong></span>
              <span aria-hidden="true" className="text-emerald-900">·</span>
              <span>Origin: <strong className="text-white">{activeMaison.originLocation}</strong></span>
              <span aria-hidden="true" className="text-emerald-900">·</span>
              <span>Pivotal Ref: <strong className="text-white">{activeMaison.referenceNumber} ({activeMaison.yearIntroduced})</strong></span>
              <span aria-hidden="true" className="text-emerald-900">·</span>
              <span>Hand Finishing Index: <strong className="text-[#00FF66]">{activeMaison.humanInterventionIndex}%</strong></span>
            </div>
          </div>

          {/* Curatorial Narrative (with Classical Drop-Cap) */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono-ledger uppercase tracking-widest text-[#00FF66]">
              &gt; CURATORIAL NARRATIVE & HISTORICAL THESIS
            </h4>
            <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:font-normal first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#00FF66] first-letter:drop-shadow-[0_0_10px_rgba(0,255,102,0.6)]">
              {activeMaison.curatorialNarrative}
            </p>
          </div>

          {/* Dedicated Interactive Bench Experiment / Laboratory */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-ledger uppercase tracking-widest text-[#00FF66] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#00FF66]" />
                BENCH EXPERIMENT · UNIQUE INTERACTIVE TOOL
              </span>
            </div>
            <MaisonLaboratory maison={activeMaison} />
          </div>

          {/* Key Inventions & Patents */}
          <div className="space-y-4 pt-4 border-t border-emerald-950">
            <h4 className="text-xs font-mono-ledger uppercase tracking-widest text-[#00FF66]">
              &gt; HISTORICAL INVENTIONS & TECHNICAL MILESTONES
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeMaison.keyInnovations.map((inv, idx) => (
                <div key={idx} className="p-4 bg-[#062316]/50 border border-emerald-900/50 rounded hover:border-[#00FF66]/30 transition-colors">
                  <div className="flex items-center justify-between text-xs font-mono-ledger mb-1">
                    <span className="text-white font-semibold">{inv.title}</span>
                    <span className="text-[#00FF66] font-bold">{inv.year}</span>
                  </div>
                  <p className="text-xs text-emerald-100/75 leading-relaxed">
                    {inv.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specifications Ledger Table */}
          <div className="space-y-4 pt-4 border-t border-emerald-950">
            <h4 className="text-xs font-mono-ledger uppercase tracking-widest text-[#00FF66]">
              &gt; TECHNICAL SPECIFICATIONS & CALIBER LEDGER
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono-ledger text-xs">
              <div className="p-3 bg-[#062316]/40 border border-emerald-900/60 rounded">
                <span className="text-emerald-400/60 block text-[10px] uppercase">Caliber Designation</span>
                <span className="text-white font-medium">{activeMaison.caliberProfile.designation}</span>
              </div>
              <div className="p-3 bg-[#062316]/40 border border-emerald-900/60 rounded">
                <span className="text-emerald-400/60 block text-[10px] uppercase">Winding & Reserve</span>
                <span className="text-white">{activeMaison.caliberProfile.windingType} · {activeMaison.caliberProfile.powerReserveHours} Hours</span>
              </div>
              <div className="p-3 bg-[#062316]/40 border border-emerald-900/60 rounded">
                <span className="text-emerald-400/60 block text-[10px] uppercase">Frequency & Jewels</span>
                <span className="text-[#00FF66]">{activeMaison.caliberProfile.frequencyVph.toLocaleString()} VPH ({activeMaison.caliberProfile.frequencyHz} Hz) · {activeMaison.caliberProfile.jewelCount} Jewels</span>
              </div>
              <div className="p-3 bg-[#062316]/40 border border-emerald-900/60 rounded">
                <span className="text-emerald-400/60 block text-[10px] uppercase">Escapement & Spring</span>
                <span className="text-white">{activeMaison.caliberProfile.escapementType}</span>
              </div>
              <div className="p-3 bg-[#062316]/40 border border-emerald-900/60 rounded">
                <span className="text-emerald-400/60 block text-[10px] uppercase">Case Dimensions</span>
                <span className="text-white">Ø {activeMaison.dimensions.caseDiameterMm} mm × {activeMaison.dimensions.caseThicknessMm} mm</span>
              </div>
              <div className="p-3 bg-[#062316]/40 border border-emerald-900/60 rounded">
                <span className="text-emerald-400/60 block text-[10px] uppercase">Tolerances & Resistance</span>
                <span className="text-[#00FF66]">{activeMaison.caseEngineering.waterResistanceAtm} ATM · {activeMaison.caseEngineering.magneticResistanceGauss} Gauss</span>
              </div>
            </div>

            {/* Finishing Protocols */}
            <div className="p-4 bg-[#062316]/30 border border-emerald-900/50 rounded text-xs space-y-2">
              <span className="text-[#D4AF37] font-mono-ledger uppercase tracking-wider block text-[10px]">
                &gt; ATELIER FINISHING PROTOCOLS:
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-emerald-100/80">
                {activeMaison.caliberProfile.finishingProtocols.map((protocol, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#00FF66] mt-0.5">•</span>
                    <span>{protocol}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Visual Directives Cues */}
          <div className="space-y-3 pt-4 border-t border-emerald-950 text-xs">
            <h4 className="text-xs font-mono-ledger uppercase tracking-widest text-[#00FF66]">
              &gt; OFFICIAL VISUAL DIRECTIVES & MACRO CUES
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-[#020B06] border border-emerald-900/60 rounded">
                <span className="text-[#00FF66] font-semibold block mb-1">Dial Macro Cue:</span>
                <p className="text-emerald-100/75 italic">{activeMaison.visualDirectives.dialCue}</p>
              </div>
              <div className="p-3 bg-[#020B06] border border-emerald-900/60 rounded">
                <span className="text-[#00FF66] font-semibold block mb-1">Movement Profile:</span>
                <p className="text-emerald-100/75 italic">{activeMaison.visualDirectives.movementCue}</p>
              </div>
              <div className="p-3 bg-[#020B06] border border-emerald-900/60 rounded">
                <span className="text-[#00FF66] font-semibold block mb-1">Case Architecture:</span>
                <p className="text-emerald-100/75 italic">{activeMaison.visualDirectives.caseCue}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
