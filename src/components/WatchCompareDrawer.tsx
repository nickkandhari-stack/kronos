/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { WatchModel } from '../data/watchCatalogue';
import { X, ArrowRight, Check, SlidersHorizontal } from 'lucide-react';

interface CompareDrawerProps {
  comparedWatches: WatchModel[];
  onRemoveWatch: (id: string) => void;
  onClearAll: () => void;
  isOpen: boolean;
  onToggleOpen: () => void;
  onSelectWatch: (watch: WatchModel) => void;
}

export const WatchCompareDrawer: React.FC<CompareDrawerProps> = ({
  comparedWatches,
  onRemoveWatch,
  onClearAll,
  isOpen,
  onToggleOpen,
  onSelectWatch,
}) => {
  if (comparedWatches.length === 0) return null;

  return (
    <>
      {/* Floating Sticky Bottom Bar when minimized */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40 bg-[#082C22]/90 backdrop-blur-md border border-[#FFCC53]/40 rounded-full py-2.5 px-5 shadow-2xl flex items-center gap-4 text-xs font-mono-num luxury-card-shadow">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FFCC53] animate-pulse" />
            <span className="text-[#FBF8EE] font-medium">
              Comparing {comparedWatches.length} {comparedWatches.length === 1 ? 'Timepiece' : 'Timepieces'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleOpen}
              className="px-3.5 py-1.5 bg-[#FFCC53] text-[#041A14] font-semibold rounded-full hover:bg-[#FFE082] transition-colors cursor-pointer shadow-sm"
            >
              View Comparison
            </button>
            <button
              onClick={onClearAll}
              className="text-[#8EAA9F] hover:text-[#FFCC53] p-1 cursor-pointer"
              title="Clear Comparison"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Expanded Comparison Stage Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="fixed inset-0" onClick={onToggleOpen} />

          <div className="relative z-10 w-full max-w-5xl bg-[#082C22] text-[#FBF8EE] border border-[#FFCC53]/25 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden my-8 luxury-card-shadow">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#FFCC53]/15 pb-4 mb-6">
              <div>
                <span className="text-xs font-mono-num text-[#FFCC53] uppercase tracking-widest block">
                  TECHNICAL SPECIFICATION AUDIT
                </span>
                <h3 className="text-2xl font-serif-luxury font-light text-[#FBF8EE]">
                  Comparative Inspection
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onClearAll}
                  className="text-xs font-mono-num text-[#8EAA9F] hover:text-[#FFCC53] transition-colors cursor-pointer"
                >
                  Clear All ({comparedWatches.length})
                </button>
                <button
                  onClick={onToggleOpen}
                  className="p-2 rounded bg-white/[0.05] hover:bg-white/[0.1] text-[#8EAA9F] hover:text-[#FBF8EE] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Comparison Grid Table */}
            <div className="overflow-x-auto">
              <div
                className="grid gap-4"
                style={{
                  gridTemplateColumns: `repeat(${comparedWatches.length}, minmax(260px, 1fr))`,
                }}
              >
                {comparedWatches.map((w) => (
                  <div
                    key={w.id}
                    className="bg-[#041A14]/75 p-5 rounded-xl border border-[#FFCC53]/15 space-y-4 flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Remove Action */}
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[11px] font-mono-num text-[#FFCC53] uppercase font-semibold">
                          {w.maison}
                        </span>
                        <button
                          onClick={() => onRemoveWatch(w.id)}
                          className="text-[#8EAA9F] hover:text-[#FFCC53] p-1 rounded transition-colors cursor-pointer"
                          title="Remove from comparison"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Photo */}
                      <div
                        onClick={() => onSelectWatch(w)}
                        className="w-full aspect-square rounded-lg overflow-hidden bg-[#041A14] border border-[#FFCC53]/15 mb-3 cursor-pointer group"
                      >
                        <img
                          src={w.image}
                          alt={w.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Name & Reference */}
                      <h4
                        onClick={() => onSelectWatch(w)}
                        className="text-base font-serif-luxury text-[#FBF8EE] hover:text-[#FFCC53] transition-colors cursor-pointer font-normal"
                      >
                        {w.name}
                      </h4>
                      <p className="text-[11px] font-mono-num text-[#8EAA9F] mt-0.5">
                        {w.reference}
                      </p>

                      <div className="text-sm font-mono-num font-semibold text-[#FFCC53] mt-2 pb-3 border-b border-[#FFCC53]/10">
                        {w.priceFormatted}
                      </div>

                      {/* Comparison Attributes Definition List */}
                      <div className="space-y-2 text-xs font-mono-num pt-3">
                        <div className="flex justify-between">
                          <span className="text-[#8EAA9F]">Case Diameter:</span>
                          <span className="text-[#FBF8EE] font-medium">{w.diameterMm} mm</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#8EAA9F]">Thickness:</span>
                          <span className="text-[#FBF8EE] font-medium">{w.thicknessMm} mm</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#8EAA9F]">Movement:</span>
                          <span className="text-[#FBF8EE]">{w.movementType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#8EAA9F]">Power Reserve:</span>
                          <span className="text-[#FBF8EE]">{w.powerReserveHours} Hours</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#8EAA9F]">Water Resistance:</span>
                          <span className="text-[#FBF8EE]">{w.waterResistanceAtm} ATM ({w.waterResistanceAtm * 10}m)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#8EAA9F]">Frequency:</span>
                          <span className="text-[#FBF8EE]">{w.vph.toLocaleString()} VPH</span>
                        </div>
                        <div className="flex justify-between pt-1 border-t border-[#FFCC53]/10">
                          <span className="text-[#8EAA9F]">Material:</span>
                          <span className="text-[#FBF8EE] text-right truncate max-w-[130px]">{w.caseMaterial}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectWatch(w)}
                      className="w-full py-2 bg-white/[0.06] hover:bg-[#FFCC53] text-[#FBF8EE] hover:text-[#041A14] text-xs font-medium rounded transition-colors cursor-pointer"
                    >
                      View Full Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
