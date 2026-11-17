/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Eye, Sun, Crosshair, Layers, ZoomIn, Info, Terminal } from 'lucide-react';

type FinishingSample = 'anglage' | 'zaratsu' | 'stamped';

interface SampleInfo {
  title: string;
  subtitle: string;
  maisons: string;
  technique: string;
  tolerances: string;
  description: string;
}

const SAMPLE_DETAILS: Record<FinishingSample, SampleInfo> = {
  anglage: {
    title: 'Swiss Classical Hand Anglage',
    subtitle: 'Convex Bombé & Hand-Filed Interior Angles',
    maisons: 'Breguet · F.P. Journe · Patek Philippe',
    technique: 'Hand-filed with diamond paste files and finished with cured wild alpine gentian wood pegs soaked in diamond lapping compound.',
    tolerances: 'Curved convex profile (bombé) with seamless rounded transitions at sharp interior angles (<90°), free of machine chatter.',
    description: 'Notice how the rounded bevel catches light as a continuous luminous ribbon without harsh step breaks. Each bridge takes 8-12 hours of manual polishing.'
  },
  zaratsu: {
    title: 'Japanese Zaratsu Black Polishing',
    subtitle: 'Distortion-Free Flat Mirror Reflection (Poli Noir)',
    maisons: 'Grand Seiko · Credor Micro Artist Studio',
    technique: 'Hand-held against the flat front of a high-speed rotating tin lap disc without visual guidance—artisan relies on tactile feedback.',
    tolerances: 'Planar deviation < 0.05 µm. Zero edge rounding; intersecting planes meet at razor-sharp microscopic boundaries.',
    description: 'Under 10x magnification, the mirror surface reflects incoming light perfectly in a single direction; when viewed off-axis, it appears pitch black (poli noir).'
  },
  stamped: {
    title: 'Machine Stamped Production Bevel',
    subtitle: 'Industrial CNC Automated Stamping',
    maisons: 'Standard Commercial Production',
    technique: 'High-speed stamping die followed by automated chemical tumbling or mass vibrating ceramic beads.',
    tolerances: 'Edge radius 0.2–0.5 mm with visible microscopic shear tear lines and tool burrs along the bottom perimeter.',
    description: 'Examining under 10x reveals jagged striations, tool chatter marks, and rounded boundary edges where the die sheared the brass plate.'
  }
};

export const ForensicLoupe: React.FC = () => {
  const [activeSample, setActiveSample] = useState<FinishingSample>('anglage');
  const [rakingLightAngle, setRakingLightAngle] = useState<number>(25); // degrees
  const [isLoupeActive, setIsLoupeActive] = useState<boolean>(true);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 260, y: 160 });
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
    setMousePos({ x, y });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Calculate light vector
    const lightRad = (rakingLightAngle * Math.PI) / 180;
    const lightX = Math.cos(lightRad);
    const lightY = Math.sin(lightRad);

    // Background baseplate render: deep matrix malachite obsidian
    const bgGrad = ctx.createLinearGradient(0, 0, w, h);
    bgGrad.addColorStop(0, '#062316');
    bgGrad.addColorStop(1, '#020B06');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Draw realistic bridge specimen according to activeSample
    if (activeSample === 'anglage') {
      drawSwissAnglageBridge(ctx, w, h, lightX, lightY);
    } else if (activeSample === 'zaratsu') {
      drawZaratsuLug(ctx, w, h, lightX, lightY);
    } else {
      drawStampedPlate(ctx, w, h, lightX, lightY);
    }
  }, [activeSample, rakingLightAngle]);

  const drawSwissAnglageBridge = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    lx: number,
    ly: number
  ) => {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(60, 60);
    ctx.bezierCurveTo(200, 40, 360, 90, 480, 70);
    ctx.lineTo(540, 240);
    ctx.bezierCurveTo(400, 260, 240, 210, 100, 250);
    ctx.closePath();

    // Côtes de Genève waves with subtle royal emerald tint
    const bridgeGrad = ctx.createLinearGradient(60, 60, 540, 240);
    bridgeGrad.addColorStop(0, '#104A35');
    bridgeGrad.addColorStop(0.5, '#2D7D5E');
    bridgeGrad.addColorStop(1, '#0E3B2A');
    ctx.fillStyle = bridgeGrad;
    ctx.fill();

    // Waves
    ctx.clip();
    for (let x = 40; x < 600; x += 18) {
      const stripeGrad = ctx.createLinearGradient(x, 0, x + 18, 0);
      stripeGrad.addColorStop(0, 'rgba(0,255,102,0.08)');
      stripeGrad.addColorStop(0.5, 'rgba(0,0,0,0.25)');
      stripeGrad.addColorStop(1, 'rgba(0,255,102,0.08)');
      ctx.fillStyle = stripeGrad;
      ctx.fillRect(x, 0, 18, h);
    }
    ctx.restore();

    // Hand-finished Anglage Bevel (bombé / mirror)
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(60, 60);
    ctx.bezierCurveTo(200, 40, 360, 90, 480, 70);
    ctx.lineWidth = 10;
    const bevelGrad = ctx.createLinearGradient(60, 60, 480, 70);
    const highlight = Math.min(1, Math.max(0.2, (lx + ly) * 0.9));
    bevelGrad.addColorStop(0, `rgba(212, 175, 55, ${highlight * 0.9})`);
    bevelGrad.addColorStop(0.3, 'rgba(0, 255, 102, 0.4)');
    bevelGrad.addColorStop(0.7, `rgba(255, 255, 255, ${highlight})`);
    bevelGrad.addColorStop(1, 'rgba(212, 175, 55, 0.4)');
    ctx.strokeStyle = bevelGrad;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(480, 70);
    ctx.lineTo(540, 240);
    ctx.lineWidth = 9;
    ctx.strokeStyle = `rgba(0, 255, 102, ${highlight * 0.8})`;
    ctx.stroke();

    // Jewel sink with diamond cut mirror countersink
    ctx.beginPath();
    ctx.arc(280, 140, 28, 0, Math.PI * 2);
    ctx.fillStyle = '#020B06';
    ctx.fill();
    ctx.lineWidth = 6;
    ctx.strokeStyle = `rgba(0, 255, 102, ${highlight * 0.85})`;
    ctx.stroke();

    // Ruby Jewel with Matrix Core
    ctx.beginPath();
    ctx.arc(280, 140, 18, 0, Math.PI * 2);
    const rubyGrad = ctx.createRadialGradient(275, 135, 2, 280, 140, 18);
    rubyGrad.addColorStop(0, '#00FF66');
    rubyGrad.addColorStop(0.5, '#059669');
    rubyGrad.addColorStop(1, '#022C22');
    ctx.fillStyle = rubyGrad;
    ctx.fill();

    // Gold chaton rim
    ctx.beginPath();
    ctx.arc(280, 140, 21, 0, Math.PI * 2);
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.restore();
  };

  const drawZaratsuLug = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    lx: number,
    ly: number
  ) => {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(120, 80);
    ctx.lineTo(460, 80);
    ctx.lineTo(410, 200);
    ctx.lineTo(170, 200);
    ctx.closePath();
    ctx.fillStyle = '#062316';
    ctx.fill();

    ctx.clip();
    for (let x = 120; x < 460; x += 4) {
      ctx.strokeStyle = 'rgba(0,255,102,0.06)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, 80);
      ctx.lineTo(x, 200);
      ctx.stroke();
    }
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(460, 80);
    ctx.lineTo(540, 140);
    ctx.lineTo(470, 250);
    ctx.lineTo(410, 200);
    ctx.closePath();

    const reflectionFactor = Math.abs(lx - 0.5) * 2;
    const mirrorGrad = ctx.createLinearGradient(460, 80, 470, 250);
    if (reflectionFactor > 0.6) {
      mirrorGrad.addColorStop(0, '#FFFFFF');
      mirrorGrad.addColorStop(0.4, '#D1FAE5');
      mirrorGrad.addColorStop(1, '#00FF66');
    } else {
      mirrorGrad.addColorStop(0, '#020B06');
      mirrorGrad.addColorStop(0.5, '#03140C');
      mirrorGrad.addColorStop(1, '#020B06');
    }
    ctx.fillStyle = mirrorGrad;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(460, 80);
    ctx.lineTo(410, 200);
    ctx.strokeStyle = '#00FF66';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    ctx.restore();
  };

  const drawStampedPlate = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    lx: number,
    ly: number
  ) => {
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(100, 70, 400, 160, 14);
    ctx.fillStyle = '#1E293B';
    ctx.fill();

    ctx.clip();
    for (let y = 70; y < 230; y += 6) {
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(100, y + (Math.sin(y) * 2));
      ctx.lineTo(500, y + (Math.sin(y) * 2));
      ctx.stroke();
    }

    ctx.strokeStyle = '#64748B';
    ctx.lineWidth = 7;
    ctx.stroke();

    for (let x = 110; x < 490; x += 8) {
      ctx.beginPath();
      ctx.moveTo(x, 70);
      ctx.lineTo(x + 2, 67);
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    ctx.restore();
  };

  const currentInfo = SAMPLE_DETAILS[activeSample];

  return (
    <section id="caliber-loupe" className="py-20 px-6 max-w-7xl mx-auto border-t border-[#00FF66]/20">
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <span className="font-mono-ledger text-xs tracking-widest text-[#00FF66] uppercase block mb-2">
          &gt; COMPONENT 01 · FORENSIC OPTICAL MATRIX
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-[#ECFDF5] mb-4">
          The 10x Forensic Loupe & Finishing Atelier
        </h2>
        <p className="text-emerald-100/80 text-sm md:text-base leading-relaxed">
          Hover across the horological specimen to engage the virtual brass-rimmed inspection loupe with Neo-Matrix holographic reticle. Observe how microscopic hand-filing, wood-peg anglage, and tin-lap Zaratsu reflect light with zero optical distortion.
        </p>
      </div>

      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-[#03140C]/90 border border-[#00FF66]/30 rounded-lg shadow-[0_0_20px_rgba(0,255,102,0.06)]">
        {/* Sample Selection */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-emerald-300 font-mono-ledger uppercase tracking-wider hidden sm:inline">
            SPECIMEN:
          </span>
          <div className="flex bg-[#020B06] p-1 border border-emerald-950 rounded">
            <button
              onClick={() => setActiveSample('anglage')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${activeSample === 'anglage' ? 'bg-[#00FF66] text-[#020B06] font-bold shadow-[0_0_10px_#00FF66]' : 'text-emerald-100/70 hover:text-white'}`}
            >
              Swiss Anglage
            </button>
            <button
              onClick={() => setActiveSample('zaratsu')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${activeSample === 'zaratsu' ? 'bg-[#00FF66] text-[#020B06] font-bold shadow-[0_0_10px_#00FF66]' : 'text-emerald-100/70 hover:text-white'}`}
            >
              Zaratsu Mirror
            </button>
            <button
              onClick={() => setActiveSample('stamped')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${activeSample === 'stamped' ? 'bg-[#00FF66] text-[#020B06] font-bold shadow-[0_0_10px_#00FF66]' : 'text-emerald-100/70 hover:text-white'}`}
            >
              Machine Stamped
            </button>
          </div>
        </div>

        {/* Light Raking Slider */}
        <div className="flex items-center gap-3">
          <Sun className="w-4 h-4 text-[#00FF66]" />
          <span className="text-xs text-emerald-300 font-mono-ledger">LASER RAKE ANGLE:</span>
          <input
            type="range"
            min="10"
            max="80"
            value={rakingLightAngle}
            onChange={(e) => setRakingLightAngle(Number(e.target.value))}
            className="w-32 accent-[#00FF66] cursor-pointer"
          />
          <span className="text-xs font-mono-ledger text-[#00FF66] font-bold">{rakingLightAngle}°</span>
        </div>

        {/* Loupe Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsLoupeActive(!isLoupeActive)}
            className={`px-3 py-1.5 text-xs font-medium border rounded transition-all cursor-pointer flex items-center gap-1.5 ${isLoupeActive ? 'bg-[#062316] text-[#00FF66] border-[#00FF66] shadow-[0_0_12px_rgba(0,255,102,0.3)]' : 'border-emerald-950 text-emerald-500'}`}
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span>{isLoupeActive ? 'LOUPE ENGAGED (10x)' : 'ENGAGE LOUPE'}</span>
          </button>
        </div>
      </div>

      {/* Main Inspection Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="lg:col-span-2 relative w-full h-[400px] md:h-[480px] bg-[#020B06] border border-[#00FF66]/30 rounded-lg overflow-hidden cursor-crosshair shadow-2xl"
        >
          {/* Base Specimen Canvas */}
          <canvas
            ref={canvasRef}
            width={600}
            height={480}
            className="w-full h-full object-cover"
          />

          {/* 10x Forensic Loupe Simulation Overlay */}
          {isLoupeActive && (
            <div
              className="absolute pointer-events-none rounded-full border-4 border-[#00FF66] shadow-[0_0_35px_rgba(0,255,102,0.5)] overflow-hidden transition-transform duration-75"
              style={{
                width: '320px',
                height: '320px',
                left: `${mousePos.x - 160}px`,
                top: `${mousePos.y - 160}px`,
                background: 'rgba(2, 11, 6, 0.96)',
                boxShadow: 'inset 0 0 35px rgba(0,0,0,0.9), 0 0 25px rgba(0,255,102,0.4)'
              }}
            >
              {/* Loupe Magnified Canvas Clone */}
              <div
                className="w-[1800px] h-[1440px] absolute"
                style={{
                  transform: `translate(${-mousePos.x * 3 + 160}px, ${-mousePos.y * 3 + 160}px) scale(3)`,
                  transformOrigin: '0 0'
                }}
              >
                <canvas
                  ref={(node) => {
                    if (!node || !canvasRef.current) return;
                    const ctx = node.getContext('2d');
                    if (!ctx) return;
                    ctx.drawImage(canvasRef.current, 0, 0, 600, 480);
                  }}
                  width={600}
                  height={480}
                  className="w-[600px] h-[480px]"
                />
              </div>

              {/* Optical Reticle & Futuristic Hologram Ring */}
              <div className="absolute inset-0 border border-[#D4AF37]/50 rounded-full pointer-events-none">
                <div className="absolute inset-x-0 top-1/2 h-[1px] bg-[#00FF66]/70 shadow-[0_0_4px_#00FF66]" />
                <div className="absolute inset-y-0 left-1/2 w-[1px] bg-[#00FF66]/70 shadow-[0_0_4px_#00FF66]" />
                <div className="absolute inset-10 border border-[#00FF66]/30 rounded-full border-dashed" />
                <div className="absolute inset-20 border border-[#D4AF37]/30 rounded-full" />

                <div className="absolute bottom-4 inset-x-0 text-center font-mono-ledger text-[10px] text-[#00FF66] tracking-widest uppercase drop-shadow-[0_0_6px_#00FF66]">
                  10x HOLOGRAPHIC LOUPE · RETICLE Φ = 350µm
                </div>
              </div>
            </div>
          )}

          {/* Canvas HUD */}
          <div className="absolute top-3 left-3 bg-[#020B06]/90 border border-[#00FF66]/40 px-3 py-1.5 rounded text-xs font-mono-ledger text-emerald-100 pointer-events-none shadow-[0_0_10px_rgba(0,255,102,0.15)]">
            SPECIMEN: <span className="text-[#00FF66] font-semibold">{currentInfo.title}</span>
          </div>
          <div className="absolute bottom-3 right-3 bg-[#020B06]/90 border border-emerald-900 px-3 py-1.5 rounded text-[11px] font-mono-ledger text-[#D4AF37] pointer-events-none">
            &gt; DRAG CURSOR TO SCAN MICRO-TOPOLOGY
          </div>
        </div>

        {/* Micro-Forensic Analysis Dossier */}
        <div className="space-y-6 bg-[#03140C]/85 border border-[#00FF66]/30 p-6 rounded-lg shadow-[0_0_20px_rgba(0,255,102,0.06)]">
          <div>
            <span className="text-xs font-mono-ledger uppercase tracking-wider text-[#00FF66] block mb-1">
              &gt; CURATORIAL FORENSICS
            </span>
            <h3 className="text-xl font-serif font-bold text-white mb-1">
              {currentInfo.title}
            </h3>
            <p className="text-xs text-[#D4AF37] font-mono-ledger">
              {currentInfo.subtitle}
            </p>
          </div>

          <div className="space-y-3 text-xs leading-relaxed text-emerald-100/80">
            <div>
              <span className="text-emerald-400 block font-semibold mb-0.5">Seminal Maisons:</span>
              <span className="text-white font-mono-ledger">{currentInfo.maisons}</span>
            </div>

            <div>
              <span className="text-emerald-400 block font-semibold mb-0.5">Finishing Protocol:</span>
              <p>{currentInfo.technique}</p>
            </div>

            <div>
              <span className="text-emerald-400 block font-semibold mb-0.5">Tolerance & Geometry:</span>
              <p className="font-mono-ledger text-[#00FF66]">{currentInfo.tolerances}</p>
            </div>

            <div className="p-3 bg-[#020B06] border border-[#00FF66]/20 rounded">
              <span className="text-[#D4AF37] block font-semibold mb-1">10x Lens Observation:</span>
              <p className="italic text-emerald-100/90">{currentInfo.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
