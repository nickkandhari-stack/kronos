/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { WatchModel } from '../data/watchCatalogue';
import { X, Trash2, ArrowRight, Bookmark } from 'lucide-react';

interface VaultModalProps {
  savedWatches: WatchModel[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveWatch: (id: string) => void;
  onSelectWatch: (watch: WatchModel) => void;
  onOpenConcierge: (watch?: WatchModel) => void;
}

export const SavedVaultModal: React.FC<VaultModalProps> = ({
  savedWatches,
  isOpen,
  onClose,
  onRemoveWatch,
  onSelectWatch,
  onOpenConcierge,
}) => {
  if (!isOpen) return null;

  const totalVaultValue = savedWatches.reduce((acc, w) => acc + w.priceUsd, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-3xl bg-[#082C22] text-[#FBF8EE] border border-[#FFCC53]/25 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 luxury-card-shadow">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#FFCC53]/15 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <Bookmark className="w-5 h-5 text-[#FFCC53]" />
            <div>
              <h3 className="text-xl font-serif-luxury font-light text-[#FBF8EE]">
                Personal Watch Vault
              </h3>
              <span className="text-xs font-mono-num text-[#8EAA9F]">
                {savedWatches.length} {savedWatches.length === 1 ? 'Timepiece' : 'Timepieces'} Bookmarked
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded bg-white/[0.05] hover:bg-white/[0.1] text-[#8EAA9F] hover:text-[#FBF8EE] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        {savedWatches.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <p className="text-base text-[#FBF8EE] font-serif-luxury">Your vault is currently empty</p>
            <p className="text-xs text-[#8EAA9F] max-w-sm mx-auto">
              Save timepieces from the catalogue to compare specifications, calculate portfolio value, or request private salon viewing.
            </p>
            <button
              onClick={onClose}
              className="mt-2 px-5 py-2.5 bg-[#FFCC53] text-[#041A14] text-xs font-semibold rounded cursor-pointer hover:bg-[#FFE082] transition-colors"
            >
              Browse Catalogue
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* List */}
            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-2">
              {savedWatches.map((w) => (
                <div
                  key={w.id}
                  className="flex items-center justify-between p-3.5 bg-[#041A14]/75 rounded-xl border border-[#FFCC53]/15 hover:border-[#FFCC53]/40 transition-all gap-4"
                >
                  <div
                    onClick={() => {
                      onClose();
                      onSelectWatch(w);
                    }}
                    className="flex items-center gap-4 cursor-pointer flex-1 min-w-0"
                  >
                    <img
                      src={w.image}
                      alt={w.name}
                      className="w-14 h-14 rounded-lg object-cover bg-[#041A14] shrink-0 border border-[#FFCC53]/20"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <div className="text-[10px] font-mono-num uppercase text-[#FFCC53]">
                        {w.maison} · {w.reference}
                      </div>
                      <h4 className="text-sm font-serif-luxury text-[#FBF8EE] truncate font-normal">
                        {w.name}
                      </h4>
                      <div className="text-xs font-mono-num font-semibold text-[#FFCC53] mt-0.5">
                        {w.priceFormatted}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onRemoveWatch(w.id)}
                      className="p-2 text-[#8EAA9F] hover:text-red-400 rounded hover:bg-white/[0.04] transition-colors cursor-pointer"
                      title="Remove from vault"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Value & Concierge Booking */}
            <div className="pt-4 border-t border-[#FFCC53]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono-num uppercase text-[#8EAA9F] block">
                  Aggregate Portfolio Value
                </span>
                <span className="text-xl font-mono-num font-semibold text-[#FFCC53]">
                  ${totalVaultValue.toLocaleString()}
                </span>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenConcierge();
                }}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#FFCC53] hover:bg-[#FFE082] text-[#041A14] text-xs font-semibold rounded uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Request Private Viewing</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
