/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HISTORIC_PATENTS } from '../data/patents';
import { HistoricPatent } from '../types/horology';
import { Download, Search, FileText, CheckCircle2, ChevronRight, Sparkles, Terminal } from 'lucide-react';

export const PatentsCodex: React.FC = () => {
  const [selectedPatent, setSelectedPatent] = useState<HistoricPatent>(HISTORIC_PATENTS[0]);
  const [schematicFilter, setSchematicFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPatents = schematicFilter === 'all'
    ? HISTORIC_PATENTS
    : HISTORIC_PATENTS.filter(p => p.schematicType === schematicFilter);

  const downloadSvgBlueprint = (patent: HistoricPatent) => {
    const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
  <rect width="600" height="400" fill="#020B06"/>
  <defs>
    <pattern id="matrixgrid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#00FF66" stroke-width="0.3" stroke-opacity="0.3"/>
    </pattern>
  </defs>
  <rect width="600" height="400" fill="url(#matrixgrid)" />
  <rect x="20" y="20" width="560" height="360" fill="none" stroke="#00FF66" stroke-width="1.5"/>
  <text x="40" y="55" fill="#00FF66" font-family="monospace" font-size="16" font-weight="bold">${patent.patentNumber}</text>
  <text x="40" y="80" fill="#ECFDF5" font-family="serif" font-size="16">${patent.title} (${patent.year})</text>
  <text x="40" y="105" fill="#D4AF37" font-family="monospace" font-size="11">Inventor: ${patent.watchmaker} | Maison: ${patent.maison}</text>
  <circle cx="300" cy="230" r="110" fill="none" stroke="#00FF66" stroke-width="2" stroke-dasharray="4 2"/>
  <circle cx="300" cy="230" r="85" fill="none" stroke="#D4AF37" stroke-width="1.5"/>
  <line x1="300" y1="90" x2="300" y2="370" stroke="#00FF66" stroke-width="0.8" stroke-opacity="0.5"/>
  <line x1="160" y1="230" x2="440" y2="230" stroke="#00FF66" stroke-width="0.8" stroke-opacity="0.5"/>
  <text x="40" y="340" fill="#A7F3D0" font-family="monospace" font-size="10">Significance Score: ${patent.significanceScore} / 100</text>
  <text x="40" y="360" fill="#6EE7B7" font-family="monospace" font-size="9">${patent.engineeringImpact}</text>
</svg>`;

    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${patent.id}_matrix_blueprint_${patent.year}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setCopiedId(patent.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="the-inventions" className="py-20 px-6 max-w-7xl mx-auto border-t border-[#00FF66]/20">
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <span className="font-mono-ledger text-xs tracking-widest text-[#00FF66] uppercase block mb-2">
          &gt; COMPONENT 02 · HISTORIC PATENT CODEX MATRIX
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-[#ECFDF5] mb-4">
          The Codex of Historic Patents
        </h2>
        <p className="text-emerald-100/80 text-sm md:text-base leading-relaxed">
          From Abraham-Louis Breguet’s 1795 Tourbillon patent to F.P. Journe’s dual-balance resonance, trace the monumental engineering blueprints that defined the measurement of human time.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-3 bg-[#03140C]/90 border border-[#00FF66]/30 rounded-lg shadow-[0_0_20px_rgba(0,255,102,0.06)]">
        <div className="flex items-center gap-2">
          <span className="text-xs text-emerald-300 font-mono-ledger uppercase tracking-wider hidden sm:inline">
            DOMAIN:
          </span>
          <div className="flex flex-wrap gap-1 bg-[#020B06] p-1 border border-emerald-950 rounded">
            {[
              { id: 'all', label: 'All 11 Inventions' },
              { id: 'escapement', label: 'Escapements' },
              { id: 'case', label: 'Case Architecture' },
              { id: 'module', label: 'Electronic & Quartz' },
              { id: 'resonance', label: 'Resonance' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSchematicFilter(tab.id)}
                className={`px-3 py-1 text-xs font-mono-ledger rounded transition-all cursor-pointer ${schematicFilter === tab.id ? 'bg-[#00FF66] text-[#020B06] font-bold shadow-[0_0_10px_#00FF66]' : 'text-emerald-300/70 hover:text-white'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <span className="text-xs font-mono-ledger text-[#00FF66]">
          ARCHIVE COUNT: {filteredPatents.length}
        </span>
      </div>

      {/* Timeline Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Scrollable Chronology Rail */}
        <div className="lg:col-span-5 space-y-3 max-h-[620px] overflow-y-auto pr-2">
          {filteredPatents.map((patent) => {
            const isSelected = selectedPatent.id === patent.id;
            return (
              <div
                key={patent.id}
                onClick={() => setSelectedPatent(patent)}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${isSelected ? 'bg-[#062316] border-[#00FF66] shadow-[0_0_20px_rgba(0,255,102,0.2)]' : 'bg-[#03140C]/80 border-emerald-950 hover:border-[#00FF66]/40'}`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono-ledger font-bold text-[#00FF66]">
                    Anno {patent.year}
                  </span>
                  <span className="text-[11px] font-mono-ledger text-[#D4AF37]">
                    Significance {patent.significanceScore}/100
                  </span>
                </div>

                <h4 className="text-sm font-semibold text-white mb-1">
                  {patent.title}
                </h4>

                <div className="flex items-center gap-2 text-xs text-emerald-200/70">
                  <span className="text-white font-medium">{patent.maison}</span>
                  <span aria-hidden="true" className="text-emerald-800">·</span>
                  <span>{patent.watchmaker}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Blueprint Schematic Stage */}
        <div className="lg:col-span-7 bg-[#03140C] border border-[#00FF66]/35 rounded-lg p-6 shadow-[0_0_25px_rgba(0,255,102,0.1)] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-950 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono-ledger text-[#00FF66] font-bold">
                  {selectedPatent.patentNumber}
                </span>
                <span className="text-xs font-mono-ledger text-[#D4AF37]">
                  Registered {selectedPatent.year}
                </span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-white">
                {selectedPatent.title}
              </h3>
            </div>

            <button
              onClick={() => downloadSvgBlueprint(selectedPatent)}
              className="px-3.5 py-2 bg-[#00FF66] hover:bg-[#34D399] text-[#020B06] font-bold text-xs rounded transition-all flex items-center gap-2 whitespace-nowrap self-start sm:self-auto shadow-[0_0_15px_rgba(0,255,102,0.3)] cursor-pointer"
            >
              {copiedId === selectedPatent.id ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#020B06]" />
                  <span>Blueprint Downloaded</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-[#020B06]" />
                  <span>Download SVG Blueprint</span>
                </>
              )}
            </button>
          </div>

          {/* Blueprint SVG Vector Canvas Display */}
          <div className="relative w-full h-64 bg-[#020B06] border border-dashed border-[#00FF66]/40 rounded flex items-center justify-center p-4 overflow-hidden">
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(to right, #00FF66 1px, transparent 1px), linear-gradient(to bottom, #00FF66 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}
            />

            <div className="relative z-10 flex flex-col items-center justify-center text-center">
              <div className="relative w-36 h-36 border-2 border-[#00FF66] rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(0,255,102,0.35)]">
                <div className="w-24 h-24 border border-dashed border-[#D4AF37] rounded-full flex items-center justify-center">
                  <div className="w-12 h-12 border border-[#00FF66] rotate-45 flex items-center justify-center shadow-[0_0_10px_#00FF66]">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                </div>
                <span className="absolute -top-3 text-[9px] font-mono-ledger text-[#00FF66] bg-black/90 px-1 border border-[#00FF66]/40">
                  FIG. 1 / ARCH. {selectedPatent.year}
                </span>
              </div>
              <div className="text-[11px] font-mono-ledger text-emerald-300 mt-3">
                {selectedPatent.patentNumber} · {selectedPatent.maison}
              </div>
            </div>

            <div className="absolute bottom-2 left-2 text-[9px] font-mono-ledger text-[#00FF66]">
              MATRIX SCALE: 10:1 MICRON GEOMETRY
            </div>
          </div>

          <div className="space-y-4 text-xs leading-relaxed">
            <div>
              <span className="text-emerald-400 block font-mono-ledger mb-1">&gt; ARCHIVAL ABSTRACT:</span>
              <p className="text-emerald-100/85">{selectedPatent.summary}</p>
            </div>

            <div>
              <span className="text-emerald-400 block font-mono-ledger mb-1">&gt; LONG-TERM IMPACT:</span>
              <p className="text-[#00FF66] font-mono-ledger">{selectedPatent.engineeringImpact}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-emerald-950 text-[11px] font-mono-ledger">
              <div>
                <span className="text-emerald-500 block">Chief Watchmaker</span>
                <span className="text-white font-medium">{selectedPatent.watchmaker}</span>
              </div>
              <div>
                <span className="text-emerald-500 block">Horological Significance</span>
                <span className="text-[#00FF66] font-bold">{selectedPatent.significanceScore} / 100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
