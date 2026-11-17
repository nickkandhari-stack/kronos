/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Eye, Shield, Compass, Sparkles, Layers, Sliders, Activity, Terminal } from 'lucide-react';
import { HorologicalMasterwork } from '../types/horology';

interface LabProps {
  maison: HorologicalMasterwork;
}

export const MaisonLaboratory: React.FC<LabProps> = ({ maison }) => {
  switch (maison.uniqueInteractionId) {
    case 'rose-engine':
      return <RoseEngineLab />;
    case 'golden-ratio':
      return <GoldenRatioLab />;
    case 'tapisserie':
      return <TapisserieLab />;
    case 'resonance':
      return <ResonanceLab />;
    case 'triplock':
      return <TriplockLab />;
    case 'hour-angle':
      return <HourAngleLab />;
    case 'disassembler':
      return <DisassemblerLab />;
    case 'fluid-glide':
      return <FluidGlideLab />;
    case 'zaratsu':
      return <ZaratsuLab />;
    case 'multi-year':
      return <MultiYearLab />;
    case 'drop-test':
      return <DropTestLab />;
    default:
      return null;
  }
};

/* -------------------------------------------------------------
   01. BREGUET: Engine-Turning Lathe Simulator (Rose Engine)
   ------------------------------------------------------------- */
function RoseEngineLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pattern, setPattern] = useState<'clous' | 'grain'>('clous');
  const [pressure, setPressure] = useState<number>(65); // 0-100%
  const [lightAngle, setLightAngle] = useState<number>(30); // 0-90 deg
  const [isEngraving, setIsEngraving] = useState<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let rotation = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = 130;

      // Outer gold & emerald dial plate
      const grad = ctx.createRadialGradient(cx - 30, cy - 30, 10, cx, cy, radius);
      grad.addColorStop(0, '#F5E6B3');
      grad.addColorStop(0.5, '#D4AF37');
      grad.addColorStop(1, '#064E3B');

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#00FF66';
      ctx.shadowColor = '#00FF66';
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.clip();

      // Draw hand-turned Guilloché pattern
      ctx.translate(cx, cy);
      if (isEngraving) {
        rotation += 0.005;
      }
      ctx.rotate(rotation);

      const grooveDepth = (pressure / 100) * 18; // microns
      const lightFactor = Math.cos((lightAngle * Math.PI) / 180);
      const strokeAlpha = 0.35 + (pressure / 200) * lightFactor;

      if (pattern === 'clous') {
        const step = 10;
        ctx.strokeStyle = `rgba(10, 30, 20, ${strokeAlpha})`;
        ctx.lineWidth = Math.max(0.6, (grooveDepth / 18) * 1.6);
        for (let x = -radius; x <= radius; x += step) {
          ctx.beginPath();
          ctx.moveTo(x, -radius);
          ctx.lineTo(x, radius);
          ctx.stroke();
        }
        for (let y = -radius; y <= radius; y += step) {
          ctx.beginPath();
          ctx.moveTo(-radius, y);
          ctx.lineTo(radius, y);
          ctx.stroke();
        }
        // Micro highlights with subtle emerald gleam
        ctx.strokeStyle = `rgba(0, 255, 102, ${0.45 * lightFactor})`;
        ctx.lineWidth = 0.8;
        for (let x = -radius; x <= radius; x += step) {
          for (let y = -radius; y <= radius; y += step) {
            ctx.strokeRect(x - 1, y - 1, 2, 2);
          }
        }
      } else {
        const rings = 18;
        ctx.strokeStyle = `rgba(6, 40, 25, ${strokeAlpha})`;
        ctx.lineWidth = Math.max(0.7, (grooveDepth / 18) * 1.5);
        for (let r = 15; r < radius; r += 7) {
          ctx.beginPath();
          const wavePoints = 48;
          for (let i = 0; i <= wavePoints; i++) {
            const th = (i / wavePoints) * Math.PI * 2;
            const wave = Math.sin(th * 12) * 2.5;
            const px = (r + wave) * Math.cos(th);
            const py = (r + wave) * Math.sin(th);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();
        }
      }

      ctx.restore();

      // Rose engine guide chisel
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.fillStyle = '#020B06';
      ctx.fill();
      ctx.strokeStyle = '#00FF66';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [pattern, pressure, lightAngle, isEngraving]);

  return (
    <div className="bg-[#03140C]/90 border border-[#00FF66]/30 rounded-lg p-5">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="relative flex-shrink-0">
          <canvas ref={canvasRef} width={280} height={280} className="rounded-full shadow-[0_0_25px_rgba(0,255,102,0.2)] border border-[#00FF66]/40 bg-[#020B06]" />
          <div className="absolute top-2 right-2 text-[10px] font-mono-ledger bg-[#020B06]/90 text-[#00FF66] px-2 py-0.5 border border-[#00FF66]/40">
            GROOVE: {((pressure / 100) * 18).toFixed(1)} µm
          </div>
        </div>

        <div className="flex-1 w-full space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-mono-ledger uppercase tracking-wider text-[#00FF66]">&gt; ROSE ENGINE LATHE MATRIX</span>
            <button
              onClick={() => setIsEngraving(!isEngraving)}
              className="text-[#00FF66] hover:text-white flex items-center gap-1.5 border border-[#00FF66]/40 px-2 py-1 rounded transition-colors cursor-pointer"
            >
              {isEngraving ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isEngraving ? 'Halt Lathe' : 'Engage Lathe'}</span>
            </button>
          </div>

          <div>
            <label className="block text-emerald-300 mb-1">Guilloché Pattern Rosette</label>
            <div className="flex gap-2">
              <button
                onClick={() => setPattern('clous')}
                className={`flex-1 py-1.5 px-3 border transition-colors cursor-pointer ${pattern === 'clous' ? 'bg-[#00FF66] text-[#020B06] font-bold border-[#00FF66]' : 'border-emerald-950 text-emerald-300 hover:border-[#00FF66]/50'}`}
              >
                Clous de Paris
              </button>
              <button
                onClick={() => setPattern('grain')}
                className={`flex-1 py-1.5 px-3 border transition-colors cursor-pointer ${pattern === 'grain' ? 'bg-[#00FF66] text-[#020B06] font-bold border-[#00FF66]' : 'border-emerald-950 text-emerald-300 hover:border-[#00FF66]/50'}`}
              >
                Grain d'Orge
              </button>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-emerald-300 mb-1">
              <span>Artisan Hand Pressure (Groove Depth)</span>
              <span className="font-mono-ledger text-[#00FF66]">{pressure}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={pressure}
              onChange={(e) => setPressure(Number(e.target.value))}
              className="w-full accent-[#00FF66] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-emerald-300 mb-1">
              <span>Raking Incident Light Angle</span>
              <span className="font-mono-ledger text-[#00FF66]">{lightAngle}°</span>
            </div>
            <input
              type="range"
              min="5"
              max="85"
              value={lightAngle}
              onChange={(e) => setLightAngle(Number(e.target.value))}
              className="w-full accent-[#00FF66] cursor-pointer"
            />
          </div>
          <p className="text-[11px] text-emerald-200/60 italic">
            "By varying the chisel pressure against the gold plate on a hand-turned rose lathe, Breguet eliminated 90% of reflective dial glare."
          </p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   02. PATEK PHILIPPE: The Divine Proportion Caliper Tool
   ------------------------------------------------------------- */
function GoldenRatioLab() {
  const [caliperWidth, setCaliperWidth] = useState<number>(31.0);
  const goldenRatio = 1.6180339887;
  const idealHeight = caliperWidth * goldenRatio;
  const currentHeight = 35.6;

  return (
    <div className="bg-[#03140C]/90 border border-[#00FF66]/30 rounded-lg p-5">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="relative w-56 h-64 bg-[#020B06] border border-[#00FF66]/40 rounded-lg flex items-center justify-center overflow-hidden">
          <div
            className="border-2 border-[#00FF66] shadow-[0_0_20px_rgba(0,255,102,0.3)] relative flex items-center justify-center transition-all duration-300"
            style={{
              width: `${caliperWidth * 3.4}px`,
              height: `${(caliperWidth * 1.15) * 3.4}px`,
              borderRadius: '45%',
              background: 'radial-gradient(ellipse at center, #064E3B 0%, #03140C 75%, #020B06 100%)'
            }}
          >
            <div className="absolute inset-0 opacity-25 pointer-events-none" style={{
              backgroundImage: 'repeating-conic-gradient(#00FF66 0% 1%, transparent 1% 4%)'
            }} />
            <div
              className="absolute inset-0 border border-dashed border-[#D4AF37] pointer-events-none"
              style={{ borderRadius: '45%' }}
            />
            <div className="text-[9px] font-mono-ledger text-[#00FF66] bg-black/80 px-1 py-0.5 rounded border border-[#00FF66]/40">
              Φ = 1 : 1.618
            </div>
          </div>
          <div className="absolute bottom-2 left-2 text-[10px] font-mono-ledger text-emerald-400">
            Harmonic Balance: 99.4%
          </div>
        </div>

        <div className="flex-1 w-full space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-mono-ledger uppercase tracking-wider text-[#00FF66]">&gt; DIVINE PROPORTION CALIPER</span>
            <span className="font-mono-ledger text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 border border-[#D4AF37]/30">Ref. 3738</span>
          </div>

          <p className="text-emerald-100/80 leading-relaxed">
            In 1968, Patek Philippe manifested the divine proportion discovered by ancient Greek mathematicians (1 : 1.6181). Drag the caliper to test the geometric equilibrium.
          </p>

          <div>
            <div className="flex justify-between text-emerald-300 mb-1">
              <span>Case Width Caliper Setting</span>
              <span className="font-mono-ledger text-[#00FF66]">{caliperWidth.toFixed(1)} mm</span>
            </div>
            <input
              type="range"
              min="24"
              max="38"
              step="0.2"
              value={caliperWidth}
              onChange={(e) => setCaliperWidth(Number(e.target.value))}
              className="w-full accent-[#00FF66] cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 bg-[#020B06] p-3 border border-emerald-950 rounded font-mono-ledger text-[11px]">
            <div>
              <span className="text-emerald-500 block">Case Width (x)</span>
              <span className="text-white font-semibold">{caliperWidth.toFixed(1)} mm</span>
            </div>
            <div>
              <span className="text-emerald-500 block">Case Length (y)</span>
              <span className="text-[#D4AF37] font-semibold">{currentHeight.toFixed(1)} mm</span>
            </div>
            <div>
              <span className="text-emerald-500 block">Golden Ratio Target</span>
              <span className="text-white">{idealHeight.toFixed(1)} mm</span>
            </div>
            <div>
              <span className="text-emerald-500 block">Harmonic Matrix</span>
              <span className="text-[#00FF66] font-semibold">1:1.618 Equilibrium</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   03. AUDEMARS PIGUET: Tapisserie Dial Stamping Machine
   ------------------------------------------------------------- */
function TapisserieLab() {
  const [pyramidCount, setPyramidCount] = useState<number>(14);
  const [reliefDepth, setReliefDepth] = useState<number>(75);
  const [isStamping, setIsStamping] = useState<boolean>(false);

  const triggerStamp = () => {
    setIsStamping(true);
    setTimeout(() => setIsStamping(false), 500);
  };

  return (
    <div className="bg-[#03140C]/90 border border-[#00FF66]/30 rounded-lg p-5">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className={`relative w-60 h-60 bg-[#020B06] border-2 ${isStamping ? 'border-[#00FF66] scale-[0.98]' : 'border-emerald-800'} rounded-lg p-3 transition-all duration-200 shadow-2xl overflow-hidden`}>
          <div
            className="w-full h-full grid gap-[1.5px] p-2 bg-[#062316] rounded border border-emerald-900"
            style={{
              gridTemplateColumns: `repeat(${pyramidCount}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: pyramidCount * pyramidCount }).map((_, i) => (
              <div
                key={i}
                className="aspect-square transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, rgba(0,255,102, ${reliefDepth / 130}) 0%, rgba(2,11,6, 0.95) 100%)`,
                  boxShadow: `inset 1px 1px 0 rgba(0,255,102, ${reliefDepth / 260})`
                }}
              />
            ))}
          </div>
          {isStamping && (
            <div className="absolute inset-0 bg-[#00FF66]/20 pointer-events-none animate-pulse flex items-center justify-center font-mono-ledger text-[#00FF66] text-xs font-bold tracking-widest uppercase">
              PANTOGRAPH MATRIX STRIKE
            </div>
          )}
          <div className="absolute bottom-1 right-2 text-[9px] font-mono-ledger text-emerald-400">
            Pyramids: {pyramidCount * pyramidCount}
          </div>
        </div>

        <div className="flex-1 w-full space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-mono-ledger uppercase tracking-wider text-[#00FF66]">&gt; PANTOGRAPH TAPISSERIE ENGINE</span>
            <button
              onClick={triggerStamp}
              className="bg-[#062316] hover:bg-[#0B3A25] text-[#00FF66] border border-[#00FF66]/50 px-3 py-1 rounded transition-colors font-medium flex items-center gap-1.5 cursor-pointer shadow-[0_0_10px_rgba(0,255,102,0.2)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#00FF66]" />
              Strike Pantograph Die
            </button>
          </div>

          <p className="text-emerald-100/80 leading-relaxed">
            In 1972, Audemars Piguet adopted 19th-century mechanical copying lathes. A diamond cutter traces a large master disc, simultaneously engraving the square pyramidal relief while carving fine circular graining into the grooves.
          </p>

          <div>
            <div className="flex justify-between text-emerald-300 mb-1">
              <span>Grid Density ("Petite" vs "Grande" Tapisserie)</span>
              <span className="font-mono-ledger text-[#00FF66]">{pyramidCount} x {pyramidCount} squares</span>
            </div>
            <input
              type="range"
              min="8"
              max="20"
              value={pyramidCount}
              onChange={(e) => setPyramidCount(Number(e.target.value))}
              className="w-full accent-[#00FF66] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-emerald-300 mb-1">
              <span>Pyramidal Relief Depth (Diamond Pressure)</span>
              <span className="font-mono-ledger text-[#00FF66]">{reliefDepth}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={reliefDepth}
              onChange={(e) => setReliefDepth(Number(e.target.value))}
              className="w-full accent-[#00FF66] cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   04. F.P. JOURNE: The Dynamic Resonance Oscillator
   ------------------------------------------------------------- */
function ResonanceLab() {
  const [distance, setDistance] = useState<number>(0.5);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isLocked = distance <= 0.2;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.05;

      const cy = canvas.height / 2;
      const r = 40;
      const centerDist = 60 + distance * 80;

      const x1 = canvas.width / 2 - centerDist / 2;
      const x2 = canvas.width / 2 + centerDist / 2;

      let angle1: number;
      let angle2: number;

      if (isLocked) {
        angle1 = Math.sin(time * 3) * 0.9;
        angle2 = -angle1;
      } else {
        angle1 = Math.sin(time * 3.1) * 0.9;
        angle2 = Math.sin(time * 2.8 + 1.2) * 0.9;
      }

      // Draw acoustic wave currents in glowing green
      if (isLocked) {
        ctx.save();
        ctx.strokeStyle = '#00FF66';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 3]);
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          ctx.arc(canvas.width / 2, cy, 15 + i * 8, -Math.PI / 3, Math.PI / 3);
          ctx.stroke();
        }
        ctx.restore();
      }

      drawBalance(ctx, x1, cy, r, angle1, '#D4AF37');
      drawBalance(ctx, x2, cy, r, angle2, '#00FF66');

      animId = requestAnimationFrame(render);
    };

    const drawBalance = (
      context: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      radius: number,
      rot: number,
      color: string
    ) => {
      context.save();
      context.translate(cx, cy);
      context.rotate(rot);

      context.beginPath();
      context.arc(0, 0, radius, 0, Math.PI * 2);
      context.lineWidth = 3;
      context.strokeStyle = color;
      context.stroke();

      for (let i = 0; i < 4; i++) {
        const th = (i * Math.PI) / 2;
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(Math.cos(th) * radius, Math.sin(th) * radius);
        context.lineWidth = 1.8;
        context.strokeStyle = color;
        context.stroke();
      }

      for (let i = 0; i < 8; i++) {
        const th = (i * Math.PI) / 4;
        context.beginPath();
        context.arc(Math.cos(th) * (radius - 1), Math.sin(th) * (radius - 1), 2.5, 0, Math.PI * 2);
        context.fillStyle = '#00FF66';
        context.fill();
      }

      context.beginPath();
      for (let a = 0; a < Math.PI * 6; a += 0.2) {
        const spiralR = (a / (Math.PI * 6)) * (radius * 0.55);
        const px = Math.cos(a + rot * 1.5) * spiralR;
        const py = Math.sin(a + rot * 1.5) * spiralR;
        if (a === 0) context.moveTo(px, py);
        else context.lineTo(px, py);
      }
      context.strokeStyle = color;
      context.lineWidth = 1;
      context.stroke();

      context.restore();
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [distance, isLocked]);

  return (
    <div className="bg-[#03140C]/90 border border-[#00FF66]/30 rounded-lg p-5">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="relative w-64 h-56 bg-[#020B06] border border-[#00FF66]/40 rounded-lg overflow-hidden flex flex-col items-center justify-center">
          <canvas ref={canvasRef} width={256} height={180} />
          <div className={`px-2 py-0.5 rounded text-[10px] font-mono-ledger ${isLocked ? 'bg-emerald-950 text-[#00FF66] border border-[#00FF66]' : 'bg-red-950 text-red-300 border border-red-700'}`}>
            {isLocked ? 'ACOUSTIC SYNCHRONIZATION LOCKED (< 0.20 mm)' : 'DISCORDANT PHASE DRIFT'}
          </div>
        </div>

        <div className="flex-1 w-full space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-mono-ledger uppercase tracking-wider text-[#00FF66]">&gt; RESONANCE CHAMBER MATRIX</span>
            <span className="font-mono-ledger text-[#D4AF37]">Caliber 1499.3</span>
          </div>

          <p className="text-emerald-100/80 leading-relaxed">
            When the physical gap between the two balance wheels falls below <strong className="text-[#00FF66]">0.20 mm</strong>, acoustic air turbulence and shared baseplate vibrations lock them into sympathetic counter-oscillation.
          </p>

          <div>
            <div className="flex justify-between text-emerald-300 mb-1">
              <span>Proximity Gap Between Balances</span>
              <span className={`font-mono-ledger font-bold ${isLocked ? 'text-[#00FF66]' : 'text-amber-400'}`}>
                {distance.toFixed(2)} mm
              </span>
            </div>
            <input
              type="range"
              min="0.05"
              max="1.20"
              step="0.02"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full accent-[#00FF66] cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDistance(0.12)}
              className="px-2.5 py-1 text-[11px] bg-[#00FF66]/20 hover:bg-[#00FF66]/30 text-[#00FF66] border border-[#00FF66]/40 rounded transition-colors cursor-pointer"
            >
              Snap to Resonance (0.12 mm)
            </button>
            <button
              onClick={() => setDistance(0.85)}
              className="px-2.5 py-1 text-[11px] bg-emerald-950 hover:bg-emerald-900 text-stone-300 border border-emerald-900 rounded transition-colors cursor-pointer"
            >
              Decouple (0.85 mm)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   05. ROLEX: The Triplock Hermetic Pressure Chamber
   ------------------------------------------------------------- */
function TriplockLab() {
  const [depthMeters, setDepthMeters] = useState<number>(300);
  const maxDepth = 3900;
  const barPressure = (depthMeters / 10).toFixed(1);
  const gasketCompressionPercent = Math.min(96, Math.floor(25 + (depthMeters / maxDepth) * 70));

  return (
    <div className="bg-[#03140C]/90 border border-[#00FF66]/30 rounded-lg p-5">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="relative w-60 h-60 bg-[#020B06] border-2 border-[#00FF66]/50 rounded-full flex flex-col items-center justify-center p-4 shadow-[0_0_25px_rgba(0,255,102,0.2)]">
          <div className="absolute inset-2 border border-dashed border-[#00FF66]/30 rounded-full" />
          <div className="text-emerald-400 text-[10px] uppercase font-mono-ledger">HYDROSTATIC MATRIX</div>
          <div className="text-3xl font-mono-ledger font-bold text-[#00FF66] my-1 drop-shadow-[0_0_8px_#00FF66]">
            {depthMeters} <span className="text-xs text-emerald-400">M</span>
          </div>
          <div className="text-xs font-mono-ledger text-[#D4AF37]">
            {barPressure} BAR · {((depthMeters * 3.28) * 0.433).toFixed(0)} PSI
          </div>

          <div className="mt-3 w-4/5 bg-emerald-950 h-2 rounded-full overflow-hidden border border-emerald-800">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-[#00FF66] to-yellow-400 transition-all duration-300 shadow-[0_0_8px_#00FF66]"
              style={{ width: `${(depthMeters / maxDepth) * 100}%` }}
            />
          </div>
          <div className="text-[9px] text-emerald-300/70 mt-1 font-mono-ledger">
            SEAL COMPRESSION: {gasketCompressionPercent}%
          </div>
        </div>

        <div className="flex-1 w-full space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-mono-ledger uppercase tracking-wider text-[#00FF66]">&gt; TRIPLOCK HYPERBARIC TEST</span>
            <span className="font-mono-ledger text-[#00FF66] bg-emerald-950 px-2 py-0.5 border border-[#00FF66]/40">
              Oystersteel 904L
            </span>
          </div>

          <p className="text-emerald-100/80 leading-relaxed">
            The patented Triplock winding crown features ten discrete components and four rubber O-ring seals. As ocean depth increases, external hydrostatic pressure pushes the crystal and seals tighter against the 904L steel chassis.
          </p>

          <div>
            <div className="flex justify-between text-emerald-300 mb-1">
              <span>Hyperbaric Test Depth</span>
              <span className="font-mono-ledger text-[#00FF66]">{depthMeters} m ({barPressure} ATM)</span>
            </div>
            <input
              type="range"
              min="0"
              max={maxDepth}
              step="50"
              value={depthMeters}
              onChange={(e) => setDepthMeters(Number(e.target.value))}
              className="w-full accent-[#00FF66] cursor-pointer"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {[0, 300, 1220, 3900].map((depth) => (
              <button
                key={depth}
                onClick={() => setDepthMeters(depth)}
                className={`px-2.5 py-1 text-[11px] border rounded transition-colors cursor-pointer ${depthMeters === depth ? 'bg-[#00FF66] text-[#020B06] font-bold border-[#00FF66]' : 'bg-[#020B06] text-emerald-200 border-emerald-900 hover:border-[#00FF66]/50'}`}
              >
                {depth === 0 ? 'Surface (0m)' : depth === 300 ? 'Submariner (300m)' : depth === 1220 ? 'Sea-Dweller (1220m)' : 'Deepsea (3900m)'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   06. LONGINES: The Sextant & Hour Angle Longitude Calculator
   ------------------------------------------------------------- */
function HourAngleLab() {
  const [gmtHours, setGmtHours] = useState<number>(14);
  const [gmtMinutes, setGmtMinutes] = useState<number>(30);
  const [solarArcDeg, setSolarArcDeg] = useState<number>(180);

  const ghaTotalDegrees = (gmtHours * 15 + (gmtMinutes / 60) * 15).toFixed(1);
  const calculatedLongitude = (Number(ghaTotalDegrees) - solarArcDeg).toFixed(1);

  return (
    <div className="bg-[#03140C]/90 border border-[#00FF66]/30 rounded-lg p-5">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="relative w-60 h-60 bg-[#020B06] text-[#ECFDF5] rounded-full border-4 border-[#00FF66] flex flex-col items-center justify-center p-3 shadow-[0_0_25px_rgba(0,255,102,0.25)] overflow-hidden">
          <div className="absolute inset-1 border border-dashed border-[#00FF66]/40 rounded-full" />
          <div className="text-[10px] font-mono-ledger tracking-widest text-[#00FF66]">LINDBERGH HUD</div>
          <div className="text-xl font-mono-ledger font-bold text-white my-1">
            {gmtHours.toString().padStart(2, '0')}:{gmtMinutes.toString().padStart(2, '0')} <span className="text-xs text-[#00FF66]">GMT</span>
          </div>
          <div className="w-28 h-28 rounded-full bg-[#062316] border border-[#00FF66]/50 flex flex-col items-center justify-center p-1 text-center shadow-inner">
            <span className="text-[9px] font-mono-ledger uppercase text-emerald-400">Greenwich Arc</span>
            <span className="text-sm font-mono-ledger font-bold text-[#00FF66]">{ghaTotalDegrees}° GHA</span>
          </div>
          <div className="text-[9px] font-mono-ledger mt-2 text-[#D4AF37]">
            Arc: 1h = 15°
          </div>
        </div>

        <div className="flex-1 w-full space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-mono-ledger uppercase tracking-wider text-[#00FF66]">&gt; AERIAL NAVIGATION COMPUTER</span>
            <span className="font-mono-ledger text-[#D4AF37]">Patent 1,927,405</span>
          </div>

          <p className="text-emerald-100/80 leading-relaxed">
            In 1931, Col. Charles Lindbergh created this navigation dial after crossing the Atlantic. Pilots align Greenwich Mean Time with solar transit to read degrees of longitude directly off the watch face without logarithmic tables.
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-emerald-300 block mb-1">Greenwich Time (GMT Hours)</label>
              <input
                type="range"
                min="0"
                max="23"
                value={gmtHours}
                onChange={(e) => setGmtHours(Number(e.target.value))}
                className="w-full accent-[#00FF66] cursor-pointer"
              />
            </div>
            <div>
              <label className="text-emerald-300 block mb-1">GMT Minutes</label>
              <input
                type="range"
                min="0"
                max="59"
                value={gmtMinutes}
                onChange={(e) => setGmtMinutes(Number(e.target.value))}
                className="w-full accent-[#00FF66] cursor-pointer"
              />
            </div>
          </div>

          <div className="bg-[#020B06] p-3 border border-emerald-950 rounded font-mono-ledger text-[11px] space-y-1">
            <div className="flex justify-between">
              <span className="text-emerald-400/80">Greenwich Hour Angle (GHA):</span>
              <span className="text-[#00FF66] font-semibold">{ghaTotalDegrees}° Arc</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-400/80">Aircraft Longitude Over Atlantic:</span>
              <span className="text-[#D4AF37] font-semibold">{calculatedLongitude}° W</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   07. HUBLOT: Material Fusion Exploded Disassembler
   ------------------------------------------------------------- */
function DisassemblerLab() {
  const [explosionGap, setExplosionGap] = useState<number>(35);
  const [highlightLayer, setHighlightLayer] = useState<string | null>(null);

  const layers = [
    { id: 'bezel', name: 'Black Ceramic & Magic Gold Bezel', color: '#00FF66', desc: '1,000 Vickers scratch-proof boron carbide gold' },
    { id: 'screws', name: '6 H-Shaped Titanium Screws', color: '#D4AF37', desc: 'Functional Grade 5 titanium chassis fasteners' },
    { id: 'resin', name: 'Composite Lateral Kevlar Inserts', color: '#10B981', desc: 'Black vulcanized resin shock absorbers' },
    { id: 'chassis', name: 'Micro-Blasted Titanium Chassis', color: '#059669', desc: 'Structural sandwich housing the Unico caliber' },
    { id: 'strap', name: 'Vulcanized Ribbed Rubber Strap', color: '#022C22', desc: 'Vanilla-scented natural elastomer strap' }
  ];

  return (
    <div className="bg-[#03140C]/90 border border-[#00FF66]/30 rounded-lg p-5">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="relative w-64 h-64 bg-[#020B06] border border-emerald-950 rounded-lg flex flex-col items-center justify-center overflow-hidden">
          <div className="relative w-44 flex flex-col items-center gap-1">
            {layers.map((layer, idx) => {
              const offset = (idx - 2) * (explosionGap * 0.85);
              const isSelected = highlightLayer === layer.id;
              return (
                <div
                  key={layer.id}
                  onClick={() => setHighlightLayer(layer.id)}
                  className={`w-full py-2.5 px-3 rounded border text-center transition-all duration-300 cursor-pointer text-[10px] font-mono-ledger ${isSelected ? 'border-[#00FF66] bg-[#00FF66]/20 shadow-[0_0_15px_#00FF66] scale-105 text-white' : 'border-emerald-950 bg-[#062316]/80 text-emerald-200'}`}
                  style={{
                    transform: `translateY(${offset}px)`
                  }}
                >
                  {layer.name}
                </div>
              );
            })}
          </div>
          <div className="absolute top-2 left-2 text-[9px] font-mono-ledger text-emerald-500">
            Explosion Delta: {explosionGap}%
          </div>
        </div>

        <div className="flex-1 w-full space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-mono-ledger uppercase tracking-wider text-[#00FF66]">&gt; BIG BANG SANDWICH DISASSEMBLER</span>
            <span className="font-mono-ledger text-[#00FF66] bg-emerald-950 px-2 py-0.5 border border-[#00FF66]/30">
              70+ Parts
            </span>
          </div>

          <p className="text-emerald-100/80 leading-relaxed">
            Unlike traditional monobloc or screw-down cases, Hublot's "Art of Fusion" employs a sandwich architecture combining disparate materials (titanium, ceramic, natural rubber, and gold).
          </p>

          <div>
            <div className="flex justify-between text-emerald-300 mb-1">
              <span>Explosion Separation Slider</span>
              <span className="font-mono-ledger text-[#00FF66]">{explosionGap}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={explosionGap}
              onChange={(e) => setExplosionGap(Number(e.target.value))}
              className="w-full accent-[#00FF66] cursor-pointer"
            />
          </div>

          <div className="bg-[#020B06] p-3 border border-emerald-950 rounded text-[11px]">
            <span className="text-emerald-400 block mb-1">Selected Component Analysis:</span>
            {highlightLayer ? (
              <div>
                <span className="text-[#00FF66] font-semibold">{layers.find(l => l.id === highlightLayer)?.name}</span>
                <p className="text-emerald-200/80 mt-0.5">{layers.find(l => l.id === highlightLayer)?.desc}</p>
              </div>
            ) : (
              <span className="text-emerald-500 italic">Click any component layer on the left to inspect its metallurgy.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   08. CREDOR: The Fluid Glide vs. Mechanical Beat Comparator
   ------------------------------------------------------------- */
function FluidGlideLab() {
  const [isPlayingSound, setIsPlayingSound] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const playClick = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(2800, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Audio
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;
    let lastStep = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      const w = canvas.width;
      const h = canvas.height;
      const r = 50;

      const currentStep = Math.floor(time * 8);
      if (currentStep !== lastStep && isPlayingSound) {
        playClick();
        lastStep = currentStep;
      }
      const steppedAngle = (currentStep / 8) * (Math.PI * 2) * 0.1;
      const fluidAngle = time * (Math.PI * 2) * 0.1;

      drawDial(ctx, w * 0.28, h * 0.45, r, steppedAngle, '#64748B', 'SWISS LEVER (28,800 VPH)', '8 STEPS / SEC · 54 dB');
      drawDial(ctx, w * 0.72, h * 0.45, r, fluidAngle, '#00FF66', 'CREDOR SPRING DRIVE', 'FLUID GLIDE · 0 dB (SILENT)');

      animId = requestAnimationFrame(render);
    };

    const drawDial = (
      context: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      radius: number,
      angle: number,
      color: string,
      title: string,
      subtitle: string
    ) => {
      context.save();
      context.beginPath();
      context.arc(cx, cy, radius, 0, Math.PI * 2);
      context.fillStyle = '#020B06';
      context.fill();
      context.strokeStyle = color;
      context.lineWidth = 2;
      context.stroke();

      for (let i = 0; i < 12; i++) {
        const th = (i * Math.PI) / 6;
        context.beginPath();
        context.moveTo(cx + Math.cos(th) * (radius - 5), cy + Math.sin(th) * (radius - 5));
        context.lineTo(cx + Math.cos(th) * radius, cy + Math.sin(th) * radius);
        context.strokeStyle = 'rgba(0,255,102,0.3)';
        context.lineWidth = 1;
        context.stroke();
      }

      context.beginPath();
      context.moveTo(cx, cy);
      context.lineTo(cx + Math.sin(angle) * (radius - 8), cy - Math.cos(angle) * (radius - 8));
      context.strokeStyle = color;
      context.lineWidth = 2.5;
      context.stroke();

      context.beginPath();
      context.arc(cx, cy, 3, 0, Math.PI * 2);
      context.fillStyle = color;
      context.fill();

      context.font = '10px "Plus Jakarta Sans", sans-serif';
      context.fillStyle = '#FFFFFF';
      context.textAlign = 'center';
      context.fillText(title, cx, cy + radius + 18);
      context.font = '9px "JetBrains Mono", monospace';
      context.fillStyle = color === '#00FF66' ? '#00FF66' : '#D4AF37';
      context.fillText(subtitle, cx, cy + radius + 32);

      context.restore();
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isPlayingSound]);

  return (
    <div className="bg-[#03140C]/90 border border-[#00FF66]/30 rounded-lg p-5">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="relative w-72 h-56 bg-[#020B06] border border-[#00FF66]/40 rounded-lg overflow-hidden flex flex-col items-center justify-center">
          <canvas ref={canvasRef} width={288} height={200} />
          <div className="absolute top-2 right-2">
            <button
              onClick={() => setIsPlayingSound(!isPlayingSound)}
              className="p-1.5 bg-black/80 border border-[#00FF66]/40 text-[#00FF66] rounded hover:text-white transition-colors cursor-pointer"
              title="Toggle Acoustic Tick Audio"
            >
              {isPlayingSound ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-stone-500" />}
            </button>
          </div>
        </div>

        <div className="flex-1 w-full space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-mono-ledger uppercase tracking-wider text-[#00FF66]">&gt; FLUID GLIDE OSCILLOSCOPE</span>
            <span className="font-mono-ledger text-[#D4AF37]">Caliber 7R14</span>
          </div>

          <p className="text-emerald-100/80 leading-relaxed">
            Classical mechanical watches stutter at 5 to 10 jumps every second, emitting acoustic pallet clicks. Credor's Spring Drive utilizes a silent electromagnetic brake on the glide wheel, delivering the only continuous, unbroken sweep in horological history at absolute zero decibels.
          </p>

          <div className="grid grid-cols-2 gap-3 bg-[#020B06] p-3 border border-emerald-950 rounded font-mono-ledger text-[11px]">
            <div>
              <span className="text-emerald-500 block">Swiss Lever Movement</span>
              <span className="text-stone-300">28,800 vph (4 Hz)</span>
              <span className="text-stone-500 block text-[9px]">8 acoustic impacts/sec</span>
            </div>
            <div>
              <span className="text-emerald-500 block">Credor Spring Drive</span>
              <span className="text-[#00FF66] font-semibold">Continuous Glide</span>
              <span className="text-[#00FF66]/70 block text-[9px]">0 dB acoustic signature</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   09. GRAND SEIKO: The Zaratsu Distortion-Free Light Test
   ------------------------------------------------------------- */
function ZaratsuLab() {
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [gridOffset, setGridOffset] = useState<number>(50);
  const [polishType, setPolishType] = useState<'zaratsu' | 'standard'>('zaratsu');

  return (
    <div className="bg-[#03140C]/90 border border-[#00FF66]/30 rounded-lg p-5">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="relative w-64 h-64 bg-[#020B06] border border-[#00FF66]/40 rounded-lg flex items-center justify-center overflow-hidden shadow-2xl">
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(to right, #00FF66 1px, transparent 1px), linear-gradient(to bottom, #00FF66 1px, transparent 1px)',
              backgroundSize: '16px 16px',
              transform: `translateX(${gridOffset}px)`
            }}
          />

          <div
            className="w-36 h-48 relative border-2 transition-all duration-200 overflow-hidden"
            style={{
              transform: `rotate(${rotationAngle}deg)`,
              backgroundColor: '#062316',
              borderColor: polishType === 'zaratsu' ? '#00FF66' : '#64748B',
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
            }}
          >
            <div
              className={`absolute inset-0 transition-all ${polishType === 'zaratsu' ? 'filter-none' : 'blur-[1.5px]'}`}
              style={{
                backgroundImage: 'linear-gradient(to right, #000 2px, transparent 2px), linear-gradient(to bottom, #000 2px, transparent 2px)',
                backgroundSize: '14px 14px',
                transform: polishType === 'zaratsu'
                  ? `translateX(${-gridOffset * 1.2}px)`
                  : `translateX(${-gridOffset * 1.2}px) skewX(12deg) scaleY(1.15)`,
                opacity: 0.85
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#00FF66]/20 to-transparent pointer-events-none" />
          </div>

          <div className="absolute bottom-2 left-2 text-[10px] font-mono-ledger text-[#00FF66] bg-black/80 px-2 py-0.5 border border-[#00FF66]/30">
            {polishType === 'zaratsu' ? 'ZARATSU: 0% OPTICAL WARP' : 'STAMPED: PERIPHERAL CURVATURE'}
          </div>
        </div>

        <div className="flex-1 w-full space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-mono-ledger uppercase tracking-wider text-[#00FF66]">&gt; ZARATSU TIN-PLATE TEST</span>
            <div className="flex gap-2">
              <button
                onClick={() => setPolishType('zaratsu')}
                className={`px-2.5 py-1 text-[11px] border rounded transition-colors cursor-pointer ${polishType === 'zaratsu' ? 'bg-[#00FF66] text-[#020B06] font-bold border-[#00FF66]' : 'border-emerald-950 text-emerald-200'}`}
              >
                Zaratsu Tin Lap
              </button>
              <button
                onClick={() => setPolishType('standard')}
                className={`px-2.5 py-1 text-[11px] border rounded transition-colors cursor-pointer ${polishType === 'standard' ? 'bg-[#00FF66] text-[#020B06] font-bold border-[#00FF66]' : 'border-emerald-950 text-emerald-200'}`}
              >
                Standard Machine
              </button>
            </div>
          </div>

          <p className="text-emerald-100/80 leading-relaxed">
            Tanaka’s 1967 Grammar of Design requires two-dimensional surfaces that meet at razor-sharp ridges with zero rounded distortion. Artisans press the case by hand against the flat face of a rotating tin disc.
          </p>

          <div>
            <div className="flex justify-between text-emerald-300 mb-1">
              <span>Case Rotation Angle</span>
              <span className="font-mono-ledger text-[#00FF66]">{rotationAngle}°</span>
            </div>
            <input
              type="range"
              min="-45"
              max="45"
              value={rotationAngle}
              onChange={(e) => setRotationAngle(Number(e.target.value))}
              className="w-full accent-[#00FF66] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-emerald-300 mb-1">
              <span>Background Matrix Test Grid Slide</span>
              <span className="font-mono-ledger text-[#00FF66]">{gridOffset} px</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={gridOffset}
              onChange={(e) => setGridOffset(Number(e.target.value))}
              className="w-full accent-[#00FF66] cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   10. ORIENT: The Multi-Year Calendar Disc Wheel
   ------------------------------------------------------------- */
function MultiYearLab() {
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [selectedMonth, setSelectedMonth] = useState<number>(9);

  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
  const mondayOffset = (firstDay + 6) % 7;

  return (
    <div className="bg-[#03140C]/90 border border-[#00FF66]/30 rounded-lg p-5">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="relative w-64 h-64 bg-[#020B06] border-2 border-[#00FF66]/60 rounded-full p-4 flex flex-col items-center justify-center text-center shadow-[0_0_25px_rgba(0,255,102,0.2)]">
          <div className="text-[10px] font-mono-ledger tracking-widest text-[#00FF66]">ORIENT MULTI-YEAR</div>
          <div className="text-lg font-mono-ledger font-bold text-white my-1">
            {months[selectedMonth]} {selectedYear}
          </div>

          <div className="grid grid-cols-7 gap-1 w-full text-[9px] font-mono-ledger text-[#00FF66] border-b border-[#00FF66]/30 pb-1">
            {daysOfWeek.map((d, i) => (
              <span key={i} className={i >= 5 ? 'text-[#D4AF37]' : ''}>{d}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 w-full text-[9px] font-mono-ledger text-emerald-100/90 pt-1">
            {Array.from({ length: 31 }).map((_, idx) => {
              const dayNum = idx + 1;
              const col = (mondayOffset + idx) % 7;
              return (
                <span
                  key={idx}
                  className={`py-0.5 rounded ${col >= 5 ? 'text-[#D4AF37] font-semibold' : ''}`}
                >
                  {dayNum}
                </span>
              );
            })}
          </div>
        </div>

        <div className="flex-1 w-full space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-mono-ledger uppercase tracking-wider text-[#00FF66]">&gt; MULTI-YEAR CALENDAR MATRIX</span>
            <span className="font-mono-ledger text-emerald-400">Caliber 46943</span>
          </div>

          <p className="text-emerald-100/80 leading-relaxed">
            First introduced in 1976, Orient's mechanical multi-year calendar allows the user to rotate the planetary wheel via the 2 o'clock crown, aligning any year across 40 years to instantly read the entire month's weekday matrix.
          </p>

          <div>
            <div className="flex justify-between text-emerald-300 mb-1">
              <span>Historical Planetary Year</span>
              <span className="font-mono-ledger text-[#00FF66]">{selectedYear}</span>
            </div>
            <input
              type="range"
              min="1976"
              max="2050"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="w-full accent-[#00FF66] cursor-pointer"
            />
          </div>

          <div>
            <label className="text-emerald-300 block mb-1">Calendar Month Selection</label>
            <div className="grid grid-cols-6 gap-1">
              {months.map((m, idx) => (
                <button
                  key={m}
                  onClick={() => setSelectedMonth(idx)}
                  className={`py-1 text-[10px] font-mono-ledger border rounded transition-colors cursor-pointer ${selectedMonth === idx ? 'bg-[#00FF66] text-[#020B06] font-bold border-[#00FF66]' : 'border-emerald-950 text-emerald-400 hover:text-white'}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   11. CASIO: The 10-Meter Drop & Shock Absorption Visualizer
   ------------------------------------------------------------- */
function DropTestLab() {
  const [isDropping, setIsDropping] = useState<boolean>(false);
  const [impactG, setImpactG] = useState<number>(0);
  const [moduleG, setModuleG] = useState<number>(0);

  const triggerDrop = () => {
    setIsDropping(true);
    setImpactG(0);
    setModuleG(0);

    setTimeout(() => {
      setImpactG(482);
      setModuleG(0);
      setIsDropping(false);
    }, 700);
  };

  return (
    <div className="bg-[#03140C]/90 border border-[#00FF66]/30 rounded-lg p-5">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="relative w-64 h-64 bg-[#020B06] border border-emerald-950 rounded-lg flex flex-col items-center justify-between p-4 overflow-hidden shadow-2xl">
          <div className="text-[10px] font-mono-ledger text-[#00FF66]">
            TEST TOWER: 10.0 METERS
          </div>

          <div
            className={`w-28 py-3 bg-[#062316] border-2 border-[#00FF66] rounded-md flex flex-col items-center justify-center transition-all duration-700 shadow-[0_0_15px_rgba(0,255,102,0.3)] ${isDropping ? 'translate-y-24 rotate-12 scale-90' : 'translate-y-0'}`}
          >
            <div className="w-16 h-8 bg-[#020B06] border border-[#00FF66]/70 rounded flex items-center justify-center font-mono-ledger text-[#00FF66] text-xs font-bold tracking-widest shadow-inner">
              10:58:50
            </div>
            <div className="text-[8px] font-mono-ledger text-[#D4AF37] mt-1 font-bold">PROTECTION</div>
          </div>

          <div className="w-full border-t-2 border-emerald-900 pt-1 text-center">
            <span className="text-[9px] font-mono-ledger text-emerald-600">SOLID REINFORCED CONCRETE</span>
          </div>

          {impactG > 0 && (
            <div className="absolute inset-0 bg-[#00FF66]/10 pointer-events-none flex items-center justify-center">
              <span className="text-[10px] font-mono-ledger text-[#00FF66] bg-black/95 px-2 py-1 border border-[#00FF66] rounded shadow-[0_0_15px_#00FF66]">
                KINETIC IMPACT: {impactG} G ABSORPTION
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 w-full space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-mono-ledger uppercase tracking-wider text-[#00FF66]">&gt; 10M DROP KINETIC VISUALIZER</span>
            <button
              onClick={triggerDrop}
              disabled={isDropping}
              className="bg-[#00FF66] hover:bg-[#34D399] disabled:opacity-50 text-[#020B06] font-bold px-3 py-1.5 rounded transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(0,255,102,0.3)]"
            >
              <Activity className="w-3.5 h-3.5" />
              Execute 10m Drop Test
            </button>
          </div>

          <p className="text-emerald-100/80 leading-relaxed">
            In 1981, Kikuo Ibe formulated the "Triple 10" doctrine (10m drop, 10 bar water, 10-year battery life). The quartz circuit board is suspended inside a hollow urethane cradle on minimal contact points, causing the outer shell to absorb all deceleration G-force while the module floats unharmed.
          </p>

          <div className="grid grid-cols-2 gap-3 bg-[#020B06] p-3 border border-emerald-950 rounded font-mono-ledger text-[11px]">
            <div>
              <span className="text-emerald-500 block">Bezel Kinetic Shock Impact</span>
              <span className="text-amber-400 font-bold text-sm">{impactG > 0 ? `${impactG} G` : '0 G (Standby)'}</span>
              <span className="text-emerald-500 block text-[9px]">Polyurethane compression</span>
            </div>
            <div>
              <span className="text-emerald-500 block">Floating Quartz Core Shock</span>
              <span className="text-[#00FF66] font-bold text-sm">{impactG > 0 ? `${moduleG} G` : '0 G (Rest)'}</span>
              <span className="text-emerald-500 block text-[9px]">Zero damaging deceleration</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
