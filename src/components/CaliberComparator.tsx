/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { MAISONS_DATA } from '../data/maisons';
import { HorologicalMasterwork } from '../types/horology';
import { ArrowLeftRight, Activity, Gauge, UserCheck, Award, Layers, Terminal } from 'lucide-react';

export const CaliberComparator: React.FC = () => {
  const [watchA, setWatchA] = useState<HorologicalMasterwork>(MAISONS_DATA[0]); // Breguet
  const [watchB, setWatchB] = useState<HorologicalMasterwork>(MAISONS_DATA[7]); // Credor Eichi II
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Live side-by-side oscillation simulation with matrix phosphor balance
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.016;

      const w = canvas.width;
      const h = canvas.height;
      const cy = h / 2;
      const r = 42;

      const freqA = watchA.caliberProfile.frequencyHz;
      let rotA: number;
      if (watchA.caliberProfile.windingType === 'Spring Drive' || watchA.caliberProfile.windingType === 'Digital Quartz') {
        rotA = t * (Math.PI * 2) * 0.5;
      } else {
        rotA = Math.sin(t * freqA * 2) * 0.85;
      }

      const freqB = watchB.caliberProfile.frequencyHz;
      let rotB: number;
      if (watchB.caliberProfile.windingType === 'Spring Drive' || watchB.caliberProfile.windingType === 'Digital Quartz') {
        rotB = t * (Math.PI * 2) * 0.5;
      } else {
        rotB = Math.sin(t * freqB * 2) * 0.85;
      }

      drawBalanceOscillator(ctx, w * 0.25, cy, r, rotA, '#D4AF37', watchA.maison, `${watchA.caliberProfile.frequencyVph.toLocaleString()} VPH`);
      drawBalanceOscillator(ctx, w * 0.75, cy, r, rotB, '#00FF66', watchB.maison, `${watchB.caliberProfile.frequencyVph.toLocaleString()} VPH`);

      animId = requestAnimationFrame(render);
    };

    const drawBalanceOscillator = (
      context: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      radius: number,
      rot: number,
      color: string,
      label: string,
      speedText: string
    ) => {
      context.save();
      context.translate(cx, cy);

      context.rotate(rot);
      context.beginPath();
      context.arc(0, 0, radius, 0, Math.PI * 2);
      context.strokeStyle = color;
      context.lineWidth = 2.5;
      context.shadowColor = color;
      context.shadowBlur = 8;
      context.stroke();
      context.shadowBlur = 0;

      for (let i = 0; i < 4; i++) {
        const th = (i * Math.PI) / 2;
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(Math.cos(th) * radius, Math.sin(th) * radius);
        context.strokeStyle = color;
        context.lineWidth = 1.5;
        context.stroke();
      }

      for (let i = 0; i < 4; i++) {
        const th = (i * Math.PI) / 2 + Math.PI / 4;
        context.beginPath();
        context.arc(Math.cos(th) * (radius - 2), Math.sin(th) * (radius - 2), 2.5, 0, Math.PI * 2);
        context.fillStyle = color;
        context.fill();
      }

      context.restore();

      context.font = '10px "Cinzel", serif';
      context.fillStyle = '#FFFFFF';
      context.textAlign = 'center';
      context.fillText(label, cx, cy + radius + 18);
      context.font = '9px "JetBrains Mono", monospace';
      context.fillStyle = color;
      context.fillText(speedText, cx, cy + radius + 32);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [watchA, watchB]);

  const densityA = watchA.caseEngineering.waterResistanceAtm / watchA.dimensions.caseThicknessMm;
  const densityB = watchB.caseEngineering.waterResistanceAtm / watchB.dimensions.caseThicknessMm;

  return (
    <section id="the-archive" className="py-20 px-6 max-w-7xl mx-auto border-t border-[#00FF66]/20">
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <span className="font-mono-ledger text-xs tracking-widest text-[#00FF66] uppercase block mb-2">
          &gt; COMPONENT 03 · DUAL-INSPECTOR COMPARATIVE MATRIX
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-[#ECFDF5] mb-4">
          Caliber Dissection Matrix & Architectural Comparator
        </h2>
        <p className="text-emerald-100/80 text-sm md:text-base leading-relaxed">
          Select any two references from the 11 Maisons to cross-examine balance oscillation frequency, human hand finishing vs. CNC automation, and case engineering density.
        </p>
      </div>

      {/* Selectors Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-4 bg-[#03140C]/90 border border-[#00FF66]/30 rounded-lg shadow-[0_0_20px_rgba(0,255,102,0.06)]">
        <div>
          <label className="text-xs font-mono-ledger uppercase tracking-wider text-emerald-300 block mb-1">
            REFERENCE ALPHA:
          </label>
          <select
            value={watchA.id}
            onChange={(e) => {
              const found = MAISONS_DATA.find(m => m.id === e.target.value);
              if (found) setWatchA(found);
            }}
            className="w-full bg-[#020B06] border border-emerald-900 text-white px-3 py-2 text-xs rounded focus:border-[#00FF66] focus:outline-none cursor-pointer"
          >
            {MAISONS_DATA.map(m => (
              <option key={m.id} value={m.id}>
                {m.maison} — {m.commonName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-mono-ledger uppercase tracking-wider text-emerald-300 block mb-1">
            REFERENCE BETA:
          </label>
          <select
            value={watchB.id}
            onChange={(e) => {
              const found = MAISONS_DATA.find(m => m.id === e.target.value);
              if (found) setWatchB(found);
            }}
            className="w-full bg-[#020B06] border border-emerald-900 text-white px-3 py-2 text-xs rounded focus:border-[#00FF66] focus:outline-none cursor-pointer"
          >
            {MAISONS_DATA.map(m => (
              <option key={m.id} value={m.id}>
                {m.maison} — {m.commonName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Dual Comparative Board */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Specimen A Card */}
        <div className="lg:col-span-4 bg-[#03140C] border border-[#00FF66]/30 rounded-lg p-5 space-y-4 shadow-xl">
          <div className="border-b border-emerald-950 pb-3">
            <span className="text-xs font-mono-ledger tracking-widest text-[#D4AF37] block uppercase">
              {watchA.maison}
            </span>
            <h3 className="text-xl font-serif font-bold text-white mt-1">
              {watchA.commonName}
            </h3>
            <span className="text-xs font-mono-ledger text-emerald-400">
              {watchA.referenceNumber} · {watchA.yearIntroduced}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-emerald-500 block">Caliber Designation:</span>
              <span className="font-mono-ledger text-white font-medium">{watchA.caliberProfile.designation}</span>
            </div>
            <div>
              <span className="text-emerald-500 block">Winding & Escapement:</span>
              <span className="text-emerald-100/80">{watchA.caliberProfile.windingType} · {watchA.caliberProfile.escapementType}</span>
            </div>
            <div>
              <span className="text-emerald-500 block">Case Metallurgy & Architecture:</span>
              <span className="text-emerald-100/80">{watchA.caseEngineering.material} ({watchA.caseEngineering.constructionType})</span>
            </div>
            <div>
              <span className="text-emerald-500 block">Dimensions:</span>
              <span className="font-mono-ledger text-emerald-100/90">
                Ø {watchA.dimensions.caseDiameterMm} mm × {watchA.dimensions.caseThicknessMm} mm | Lug-to-Lug {watchA.dimensions.lugToLugMm} mm
              </span>
            </div>
          </div>
        </div>

        {/* Center: Live Oscillation & Comparative Metrics */}
        <div className="lg:col-span-4 bg-[#062316]/70 border border-[#00FF66]/40 rounded-lg p-5 space-y-6 shadow-[0_0_20px_rgba(0,255,102,0.1)]">
          <div className="text-center">
            <span className="text-xs font-mono-ledger uppercase tracking-wider text-[#00FF66] block mb-1">
              &gt; FREQUENCY RESONANCE CHAMBER
            </span>
            <canvas ref={canvasRef} width={320} height={150} className="w-full bg-[#020B06] rounded border border-emerald-900 shadow-inner" />
          </div>

          {/* Metric Comparison 1 */}
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between items-center text-emerald-300">
              <span className="flex items-center gap-1 font-mono-ledger">
                <UserCheck className="w-3.5 h-3.5 text-[#00FF66]" />
                Human Finishing Index (% Hand File vs CNC)
              </span>
            </div>
            <div className="flex items-center justify-between font-mono-ledger text-[11px] mb-1">
              <span className="text-[#D4AF37] font-semibold">{watchA.humanInterventionIndex}% ({watchA.maison})</span>
              <span className="text-[#00FF66] font-semibold">{watchB.humanInterventionIndex}% ({watchB.maison})</span>
            </div>
            <div className="grid grid-cols-2 gap-1 h-2 bg-black rounded overflow-hidden border border-emerald-950">
              <div className="h-full bg-[#D4AF37] transition-all" style={{ width: `${watchA.humanInterventionIndex}%` }} />
              <div className="h-full bg-[#00FF66] transition-all ml-auto shadow-[0_0_8px_#00FF66]" style={{ width: `${watchB.humanInterventionIndex}%` }} />
            </div>
          </div>

          {/* Metric Comparison 2 */}
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between items-center text-emerald-300">
              <span className="flex items-center gap-1 font-mono-ledger">
                <Award className="w-3.5 h-3.5 text-[#00FF66]" />
                Cultural Impact & Pedigree Score
              </span>
            </div>
            <div className="flex items-center justify-between font-mono-ledger text-[11px] mb-1">
              <span className="text-[#D4AF37] font-semibold">{watchA.culturalImpactScore} / 100</span>
              <span className="text-[#00FF66] font-semibold">{watchB.culturalImpactScore} / 100</span>
            </div>
            <div className="grid grid-cols-2 gap-1 h-2 bg-black rounded overflow-hidden border border-emerald-950">
              <div className="h-full bg-[#D4AF37] transition-all" style={{ width: `${watchA.culturalImpactScore}%` }} />
              <div className="h-full bg-[#00FF66] transition-all ml-auto shadow-[0_0_8px_#00FF66]" style={{ width: `${watchB.culturalImpactScore}%` }} />
            </div>
          </div>

          {/* Metric Comparison 3: Engineering Density Ratio */}
          <div className="p-3 bg-[#020B06] border border-emerald-900 rounded font-mono-ledger text-[11px] space-y-2">
            <span className="text-emerald-400 block text-[10px] uppercase font-mono-ledger">
              ENGINEERING DENSITY (ATM WATER RESISTANCE / THICKNESS MM)
            </span>
            <div className="flex justify-between">
              <span className="text-stone-300">{watchA.maison}:</span>
              <span className="text-[#D4AF37] font-semibold">{densityA.toFixed(2)} ATM/mm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-300">{watchB.maison}:</span>
              <span className="text-[#00FF66] font-semibold">{densityB.toFixed(2)} ATM/mm</span>
            </div>
          </div>
        </div>

        {/* Right: Specimen B Card */}
        <div className="lg:col-span-4 bg-[#03140C] border border-[#00FF66]/30 rounded-lg p-5 space-y-4 shadow-xl">
          <div className="border-b border-emerald-950 pb-3">
            <span className="text-xs font-mono-ledger tracking-widest text-[#00FF66] block uppercase">
              {watchB.maison}
            </span>
            <h3 className="text-xl font-serif font-bold text-white mt-1">
              {watchB.commonName}
            </h3>
            <span className="text-xs font-mono-ledger text-emerald-400">
              {watchB.referenceNumber} · {watchB.yearIntroduced}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-emerald-500 block">Caliber Designation:</span>
              <span className="font-mono-ledger text-white font-medium">{watchB.caliberProfile.designation}</span>
            </div>
            <div>
              <span className="text-emerald-500 block">Winding & Escapement:</span>
              <span className="text-emerald-100/80">{watchB.caliberProfile.windingType} · {watchB.caliberProfile.escapementType}</span>
            </div>
            <div>
              <span className="text-emerald-500 block">Case Metallurgy & Architecture:</span>
              <span className="text-emerald-100/80">{watchB.caseEngineering.material} ({watchB.caseEngineering.constructionType})</span>
            </div>
            <div>
              <span className="text-emerald-500 block">Dimensions:</span>
              <span className="font-mono-ledger text-emerald-100/90">
                Ø {watchB.dimensions.caseDiameterMm} mm × {watchB.dimensions.caseThicknessMm} mm | Lug-to-Lug {watchB.dimensions.lugToLugMm} mm
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
