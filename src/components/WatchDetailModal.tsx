/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { WatchModel } from '../data/watchCatalogue';
import { X, Bookmark, Crosshair, ShieldCheck, ArrowRight, Share2 } from 'lucide-react';

interface WatchDetailModalProps {
  watch: WatchModel | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onOpenConcierge: (watch: WatchModel) => void;
}

export const WatchDetailModal: React.FC<WatchDetailModalProps> = ({
  watch,
  isOpen,
  onClose,
  isSaved,
  onToggleSave,
  onOpenConcierge,
}) => {
  const [isLoupeActive, setIsLoupeActive] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 200, y: 200 });
  const [copied, setCopied] = useState<boolean>(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !watch) return null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
    setMousePos({ x, y });
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}#${watch.id}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-4xl bg-[#082C22] text-[#FBF8EE] border border-[#FFCC53]/25 rounded-2xl shadow-2xl overflow-hidden my-8 luxury-card-shadow">
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-[#FFCC53]/15 bg-[#041A14]/85">
          <div className="flex items-center gap-2 text-xs font-mono-num text-[#FFCC53]">
            <span>{watch.maison.toUpperCase()}</span>
            <span className="text-white/20">·</span>
            <span>{watch.reference}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded bg-white/[0.05] hover:bg-white/[0.1] text-[#8EAA9F] hover:text-[#FFCC53] transition-colors cursor-pointer text-xs flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded bg-white/[0.05] hover:bg-white/[0.1] text-[#8EAA9F] hover:text-[#FBF8EE] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2-Column Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8">
          {/* Left: Product Visual & 10x Macro Loupe */}
          <div className="lg:col-span-6 space-y-3">
            <div
              ref={imageContainerRef}
              onMouseMove={handleMouseMove}
              className="relative w-full aspect-square bg-[#041A14] rounded-xl overflow-hidden border border-[#FFCC53]/15 cursor-crosshair select-none"
            >
              <img
                src={watch.image}
                alt={watch.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />

              {/* 10x Macro Inspection Loupe */}
              {isLoupeActive && (
                <div
                  className="absolute pointer-events-none rounded-full border-2 border-[#FFCC53] shadow-[0_0_30px_rgba(255,204,83,0.4)] overflow-hidden transition-transform duration-75"
                  style={{
                    width: '220px',
                    height: '220px',
                    left: `${mousePos.x - 110}px`,
                    top: `${mousePos.y - 110}px`,
                    boxShadow: 'inset 0 0 25px rgba(0,0,0,0.8), 0 0 20px rgba(255,204,83,0.3)',
                    backgroundColor: '#041A14',
                  }}
                >
                  <div
                    className="w-[800px] h-[800px] absolute"
                    style={{
                      transform: `translate(${-mousePos.x * 2.5 + 110}px, ${-mousePos.y * 2.5 + 110}px) scale(2.5)`,
                      transformOrigin: '0 0',
                    }}
                  >
                    <img
                      src={watch.image}
                      alt={watch.name}
                      className="w-[800px] h-[800px] object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute inset-x-0 top-1/2 h-[1px] bg-[#FFCC53]/50" />
                  <div className="absolute inset-y-0 left-1/2 w-[1px] bg-[#FFCC53]/50" />
                  <div className="absolute bottom-2 inset-x-0 text-center font-mono-num text-[9px] text-[#FFCC53] tracking-widest uppercase font-semibold">
                    10x MACRO ZOOM
                  </div>
                </div>
              )}

              <button
                onClick={() => setIsLoupeActive(!isLoupeActive)}
                className={`absolute bottom-3 left-3 px-3 py-1.5 rounded text-xs font-mono-num flex items-center gap-1.5 backdrop-blur-md transition-all cursor-pointer ${
                  isLoupeActive
                    ? 'bg-[#FFCC53] text-[#041A14] font-semibold shadow-md'
                    : 'bg-[#041A14]/85 text-[#FBF8EE] border border-[#FFCC53]/30'
                }`}
              >
                <Crosshair className="w-3.5 h-3.5 text-[#FFCC53]" />
                <span>{isLoupeActive ? 'Macro Active' : 'Inspect 10x Macro'}</span>
              </button>
            </div>

            <div className="flex items-center justify-between text-xs font-mono-num text-[#8EAA9F] p-3 bg-[#041A14]/70 rounded-lg border border-[#FFCC53]/10">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#FFCC53]" />
                Certified Authenticity
              </span>
              <span>5-Year Manufacture Warranty</span>
            </div>
          </div>

          {/* Right: Technical Specs & Acquisition */}
          <div className="lg:col-span-6 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="font-mono-num text-xs tracking-widest text-[#FFCC53] uppercase block">
                  {watch.maison} · {watch.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif-luxury text-[#FBF8EE] font-normal mt-1">
                  {watch.name}
                </h2>
                <div className="flex items-baseline justify-between mt-3 pb-3 border-b border-[#FFCC53]/15">
                  <span className="text-2xl font-mono-num font-semibold text-[#FFCC53]">
                    {watch.priceFormatted}
                  </span>
                  <span className="text-xs font-mono-num text-[#FFCC53] bg-[#FFCC53]/10 px-2 py-0.5 rounded border border-[#FFCC53]/20">
                    {watch.availability}
                  </span>
                </div>
              </div>

              {/* Technical Specifications Matrix */}
              <div>
                <span className="text-[11px] font-mono-num uppercase tracking-wider text-[#FFCC53] block mb-2">
                  Technical Specifications
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono-num bg-[#041A14]/75 p-3.5 rounded-lg border border-[#FFCC53]/15">
                  <div>
                    <span className="text-[#8EAA9F] block text-[10px] uppercase">Diameter</span>
                    <span className="text-[#FBF8EE] font-medium">{watch.diameterMm} mm</span>
                  </div>
                  <div>
                    <span className="text-[#8EAA9F] block text-[10px] uppercase">Thickness</span>
                    <span className="text-[#FBF8EE] font-medium">{watch.thicknessMm} mm</span>
                  </div>
                  <div>
                    <span className="text-[#8EAA9F] block text-[10px] uppercase">Calibre</span>
                    <span className="text-[#FBF8EE] font-medium truncate block">{watch.caliber}</span>
                  </div>
                  <div>
                    <span className="text-[#8EAA9F] block text-[10px] uppercase">Power Reserve</span>
                    <span className="text-[#FBF8EE] font-medium">{watch.powerReserveHours} Hours</span>
                  </div>
                  <div>
                    <span className="text-[#8EAA9F] block text-[10px] uppercase">Water Resistance</span>
                    <span className="text-[#FBF8EE] font-medium">{watch.waterResistanceAtm} ATM ({watch.waterResistanceAtm * 10}m)</span>
                  </div>
                  <div>
                    <span className="text-[#8EAA9F] block text-[10px] uppercase">Frequency</span>
                    <span className="text-[#FBF8EE] font-medium">{watch.vph.toLocaleString()} VPH</span>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-[#FFCC53]/10">
                    <span className="text-[#8EAA9F] block text-[10px] uppercase">Material & Dial</span>
                    <span className="text-[#FBF8EE]">{watch.caseMaterial} · {watch.dialColor}</span>
                  </div>
                </div>
              </div>

              {/* Craftsmanship Highlights (Short 3-bullet points) */}
              <div>
                <span className="text-[11px] font-mono-num uppercase tracking-wider text-[#FFCC53] block mb-2">
                  Atelier Highlights
                </span>
                <ul className="space-y-1.5 text-xs text-[#FBF8EE]/90 font-mono-num">
                  {watch.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-[#FFCC53]">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#FFCC53]/15 flex items-center gap-3">
              <button
                onClick={() => onOpenConcierge(watch)}
                className="flex-1 py-3 px-4 bg-[#FFCC53] hover:bg-[#FFE082] text-[#041A14] font-semibold text-xs tracking-wider uppercase rounded transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Request Salon Viewing</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onToggleSave(watch.id)}
                className={`py-3 px-4 border rounded text-xs font-mono-num flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  isSaved
                    ? 'bg-[#FFCC53]/20 border-[#FFCC53] text-[#FFCC53]'
                    : 'border-[#FFCC53]/20 text-[#8EAA9F] hover:text-[#FBF8EE] hover:border-[#FFCC53]/50'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>{isSaved ? 'Saved' : 'Save'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
