/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sliders, Compass, Award, Shield, Cpu, Terminal } from 'lucide-react';
import { PersonaType } from '../types/horology';
import { MAISONS_DATA } from '../data/maisons';

interface ApertureProps {
  currentPersona: PersonaType;
  onSelectPersona: (persona: PersonaType) => void;
  onJumpToMaison: (maisonId: string) => void;
}

export const CelestialAperture: React.FC<ApertureProps> = ({
  currentPersona,
  onSelectPersona,
  onJumpToMaison
}) => {
  const [frequencyIndex, setFrequencyIndex] = useState<number>(2); // default 3 Hz (21,600 vph)
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const matrixBgCanvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const frequencies = [
    { label: '2.5 Hz', vph: 18000, desc: 'Breguet No. 160 · Longines 13ZN', isContinuous: false },
    { label: '2.75 Hz', vph: 19800, desc: 'Audemars Piguet 2121 · Rolex 1520', isContinuous: false },
    { label: '3.0 Hz', vph: 21600, desc: 'Patek Philippe 240 · F.P. Journe 1499.3', isContinuous: false },
    { label: '4.0 Hz', vph: 28800, desc: 'Hublot Unico · Modern Haute Horlogerie', isContinuous: false },
    { label: '5.0 Hz', vph: 36000, desc: 'Grand Seiko 9S85 Hi-Beat Escapement', isContinuous: false },
    { label: '360 kHz', vph: 0, desc: 'Credor Spring Drive Tri-Synchro Glide (0 dB)', isContinuous: true },
  ];

  const currentFreq = frequencies[frequencyIndex];

  // Synthesize escapement acoustic click with subtle futuristic resonance
  const playEscapementTick = () => {
    if (!isAudioEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(3200 + Math.random() * 200, ctx.currentTime);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.035);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.035);
    } catch {
      // Audio autoplay policy
    }
  };

  // Subtle background Matrix Stream (digital glyphs falling quietly)
  useEffect(() => {
    const canvas = matrixBgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const glyphs = '0123456789ABCDEFΦΩΨΔЖБKRONOS1783';
    const fontSize = 12;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -50));

    const renderMatrix = () => {
      ctx.fillStyle = 'rgba(2, 11, 6, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00FF66';
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = glyphs[Math.floor(Math.random() * glyphs.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillStyle = Math.random() > 0.85 ? '#FFFFFF' : Math.random() > 0.4 ? 'rgba(0, 255, 102, 0.45)' : 'rgba(6, 78, 59, 0.25)';
        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animId = requestAnimationFrame(renderMatrix);
    };

    renderMatrix();
    return () => cancelAnimationFrame(animId);
  }, []);

  // Main kinetic balance wheel with futuristic Neo Matrix HUD & Royal Gold accents
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;
    let lastTickTime = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.016;

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = 140;

      // Calculate balance wheel rotation angle
      let angle: number;
      if (currentFreq.isContinuous) {
        angle = t * (Math.PI * 2) * 0.4;
      } else {
        const hz = parseFloat(currentFreq.label);
        angle = Math.sin(t * hz * (Math.PI * 2)) * 0.95;

        const ticksPerSec = hz * 2;
        const tickInterval = 1 / ticksPerSec;
        if (t - lastTickTime >= tickInterval) {
          playEscapementTick();
          lastTickTime = t;
        }
      }

      // Outer futuristic Matrix HUD reticle
      ctx.save();
      // Outer subtle emerald ring
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 28, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 255, 102, 0.15)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.stroke();

      // Royal Gold framing ring
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 16, 0, Math.PI * 2);
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([]);
      ctx.stroke();

      // Millimeter & digital laser division indices
      for (let i = 0; i < 60; i++) {
        const th = (i * Math.PI) / 30;
        const isMajor = i % 5 === 0;
        const len = isMajor ? 12 : 5;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(th) * (radius + 5), cy + Math.sin(th) * (radius + 5));
        ctx.lineTo(cx + Math.cos(th) * (radius + 5 + len), cy + Math.sin(th) * (radius + 5 + len));
        ctx.strokeStyle = isMajor ? '#00FF66' : 'rgba(212, 175, 55, 0.45)';
        ctx.lineWidth = isMajor ? 1.8 : 0.8;
        ctx.stroke();
      }

      // 4 Matrix corner targeting brackets
      const bracketDist = radius + 32;
      ctx.strokeStyle = '#00FF66';
      ctx.lineWidth = 1.5;
      // TL
      ctx.strokeRect(cx - bracketDist - 4, cy - bracketDist - 4, 12, 12);
      // TR
      ctx.strokeRect(cx + bracketDist - 8, cy - bracketDist - 4, 12, 12);
      // BL
      ctx.strokeRect(cx - bracketDist - 4, cy + bracketDist - 8, 12, 12);
      // BR
      ctx.strokeRect(cx + bracketDist - 8, cy + bracketDist - 8, 12, 12);
      ctx.restore();

      // Kinetic Balance Wheel Structure
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);

      // Outer balance wheel rim (Royal Gold with green inner phosphor)
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.lineWidth = 5;
      ctx.strokeStyle = '#D4AF37';
      ctx.shadowColor = '#00FF66';
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Gold Inertial Poising Screws along perimeter with glowing emerald center
      const screwCount = 16;
      for (let i = 0; i < screwCount; i++) {
        const th = (i * Math.PI * 2) / screwCount;
        const sx = Math.cos(th) * (radius - 1);
        const sy = Math.sin(th) * (radius - 1);
        ctx.beginPath();
        ctx.arc(sx, sy, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#00FF66';
        ctx.fill();
        ctx.strokeStyle = '#D4AF37';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 4 Balance Spokes with aerodynamic cutouts
      for (let i = 0; i < 4; i++) {
        const th = (i * Math.PI) / 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(th) * radius, Math.sin(th) * radius);
        ctx.strokeStyle = '#D4AF37';
        ctx.lineWidth = 3.5;
        ctx.stroke();

        // Neon emerald wireframe down spoke center
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(th) * (radius - 4), Math.sin(th) * (radius - 4));
        ctx.strokeStyle = '#00FF66';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Phosphor Neo Matrix Hairspring (Spirale Breguet in glowing green)
      ctx.beginPath();
      const coils = 9;
      for (let a = 0; a < Math.PI * 2 * coils; a += 0.1) {
        const r = (a / (Math.PI * 2 * coils)) * (radius * 0.65);
        const breath = 1 + Math.sin(angle) * 0.12;
        const px = Math.cos(a + angle * 0.8) * (r * breath);
        const py = Math.sin(a + angle * 0.8) * (r * breath);
        if (a === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = '#00FF66';
      ctx.shadowColor = '#00FF66';
      ctx.shadowBlur = 8;
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Center Collet & Royal Ruby-Emerald Jewel Cap
      ctx.beginPath();
      ctx.arc(0, 0, 16, 0, Math.PI * 2);
      ctx.fillStyle = '#020B06';
      ctx.fill();
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#00FF66';
      ctx.shadowColor = '#00FF66';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [frequencyIndex, isAudioEnabled]);

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center px-6 pt-24 pb-16 overflow-hidden matrix-grid-bg">
      {/* Background Matrix Digital Rain Canvas */}
      <canvas
        ref={matrixBgCanvasRef}
        width={1440}
        height={900}
        className="absolute inset-0 w-full h-full object-cover opacity-25 pointer-events-none"
      />

      {/* Royal Emerald & Matrix Phosphor Radial Aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] matrix-radial-glow blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Curatorial Thesis & Manifesto */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-3 text-xs tracking-widest uppercase font-mono-ledger text-[#00FF66]">
            <span className="flex items-center gap-1.5 text-[#D4AF37] font-subhead">
              <Terminal className="w-3.5 h-3.5 text-[#00FF66]" />
              Invenit et Fecit
            </span>
            <span aria-hidden="true" className="text-emerald-800">/</span>
            <span>MMXXVI</span>
            <span aria-hidden="true" className="text-emerald-800">/</span>
            <span className="text-emerald-300">Museum-Grade Institute</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif text-[#ECFDF5] font-light leading-[1.05] tracking-tight text-balance">
            The Architecture of <span className="italic font-normal text-[#00FF66] drop-shadow-[0_0_20px_rgba(0,255,102,0.4)]">Absolute Time</span>
          </h1>

          <p className="text-base sm:text-lg text-emerald-100/80 font-light leading-relaxed max-w-2xl text-pretty">
            Modern horology websites have largely devolved into commercial e-boutiques designed to process credit cards, protect retail margins, or manufacture waitlist scarcity. KRONOS operates as an authoritative, museum-grade digital institute documenting, deconstructing, and preserving the eleven seminal Maisons across Western Haute Horlogerie and Japanese Micro-Artistry.
          </p>

          {/* Persona Behavioral Mapping Switcher */}
          <div className="pt-2">
            <span className="text-xs font-mono-ledger uppercase tracking-wider text-[#00FF66] block mb-2">
              &gt; SELECT CURATORIAL INGRESS (BEHAVIORAL MAPPING):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { id: 'purist', label: 'Persona A: The Purist', sub: 'Calibers · Anglage · VPH' },
                { id: 'architect', label: 'Persona B: The Architect', sub: 'Geometry · Genta · Zaratsu' },
                { id: 'scholar', label: 'Persona C: The Scholar', sub: 'Patent Codex · Context' }
              ].map(p => (
                <button
                  key={p.id}
                  onClick={() => onSelectPersona(p.id as PersonaType)}
                  className={`p-3 text-left border rounded transition-all cursor-pointer ${currentPersona === p.id ? 'bg-[#062316] border-[#00FF66] text-white shadow-[0_0_18px_rgba(0,255,102,0.25)]' : 'bg-[#020B06]/80 border-emerald-950 text-stone-400 hover:border-[#00FF66]/40 hover:text-white'}`}
                >
                  <span className={`text-xs font-semibold block ${currentPersona === p.id ? 'text-[#00FF66]' : 'text-white'}`}>{p.label}</span>
                  <span className="text-[10px] text-[#D4AF37] font-mono-ledger">{p.sub}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: The Celestial Aperture Kinetic Balance Wheel */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative w-[340px] h-[340px] sm:w-[380px] sm:h-[380px] flex items-center justify-center">
            {/* Ambient matrix phosphor glow */}
            <div className="absolute inset-4 rounded-full bg-[#00FF66]/10 blur-2xl pointer-events-none" />

            <canvas
              ref={canvasRef}
              width={380}
              height={380}
              className="w-full h-full object-contain cursor-pointer"
              onClick={() => setFrequencyIndex((frequencyIndex + 1) % frequencies.length)}
              title="Click to advance escapement frequency"
            />

            {/* Audio Toggle Button in Center */}
            <div className="absolute top-2 right-2">
              <button
                onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                className={`p-2 rounded-full border transition-all cursor-pointer ${isAudioEnabled ? 'bg-[#00FF66] text-[#020B06] border-[#00FF66] shadow-[0_0_12px_#00FF66]' : 'bg-[#020B06]/85 text-emerald-400/60 border-emerald-900 hover:text-[#00FF66] hover:border-[#00FF66]'}`}
                title={isAudioEnabled ? 'Mute Escapement Audio' : 'Synthesize Escapement Ticks'}
              >
                {isAudioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Variable Frequency Selector Slider */}
          <div className="w-full max-w-sm mt-4 bg-[#03140C]/90 border border-[#00FF66]/30 rounded-lg p-4 space-y-2 shadow-[0_0_20px_rgba(0,255,102,0.1)]">
            <div className="flex justify-between items-center text-xs">
              <span className="font-mono-ledger uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#00FF66]" />
                FREQUENCY:
              </span>
              <span className="font-mono-ledger text-[#00FF66] font-semibold text-sm drop-shadow-[0_0_8px_rgba(0,255,102,0.6)]">
                {currentFreq.label} {currentFreq.vph > 0 ? `(${currentFreq.vph.toLocaleString()} VPH)` : ''}
              </span>
            </div>

            <input
              type="range"
              min="0"
              max={frequencies.length - 1}
              step="1"
              value={frequencyIndex}
              onChange={(e) => setFrequencyIndex(Number(e.target.value))}
              className="w-full accent-[#00FF66] cursor-pointer"
            />

            <div className="text-[11px] font-mono-ledger text-[#D4AF37] text-center">
              {currentFreq.desc}
            </div>
          </div>
        </div>
      </div>

      {/* Instant Reference Jump Matrix (Direct Access to all 11 Reference Profiles) */}
      <div className="max-w-7xl mx-auto w-full mt-14 pt-8 border-t border-[#00FF66]/20">
        <span className="text-[11px] font-mono-ledger uppercase tracking-widest text-[#00FF66] block mb-3 text-center sm:text-left">
          &gt; INSTANT REFERENCE JUMP MATRIX · 11 SEMINAL MAISONS
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
          {MAISONS_DATA.map((m) => (
            <button
              key={m.id}
              onClick={() => onJumpToMaison(m.id)}
              className="p-2.5 text-left bg-[#03140C]/80 hover:bg-[#062316] border border-emerald-950 hover:border-[#00FF66] rounded transition-all group cursor-pointer"
            >
              <span className="text-xs font-semibold text-emerald-100 group-hover:text-[#00FF66] transition-colors block truncate">
                {m.maison}
              </span>
              <span className="text-[10px] text-[#D4AF37] block truncate font-mono-ledger">
                {m.referenceNumber}
              </span>
            </button>
          ))}
          <a
            href="#the-maisons"
            className="p-2.5 flex items-center justify-center bg-[#00FF66]/10 hover:bg-[#00FF66]/20 border border-[#00FF66]/40 rounded text-xs font-mono-ledger text-[#00FF66] transition-colors shadow-[0_0_10px_rgba(0,255,102,0.15)]"
          >
            Explore All 11 →
          </a>
        </div>
      </div>
    </section>
  );
};
