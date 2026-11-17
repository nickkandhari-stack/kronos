/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Bookmark, Sparkles, Search } from 'lucide-react';

interface HeaderProps {
  savedCount: number;
  onOpenSaved: () => void;
  onOpenConcierge: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  savedCount,
  onOpenSaved,
  onOpenConcierge,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#041A14]/92 backdrop-blur-md border-b border-[#FFCC53]/20 shadow-[0_4px_30px_rgba(4,26,20,0.6)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Luxury Wordmark with #FFCC53 Gold */}
        <a
          href="#"
          className="text-2xl font-serif-luxury tracking-[0.2em] text-[#FBF8EE] hover:text-[#FFCC53] transition-colors whitespace-nowrap shrink-0 flex items-center gap-3"
        >
          <span className="font-subhead font-bold text-[#FFCC53] drop-shadow-[0_0_12px_rgba(255,204,83,0.35)]">
            KRONOS
          </span>
          <span className="text-[11px] font-mono-num text-[#8EAA9F] tracking-widest border-l border-[#FFCC53]/30 pl-3 hidden sm:inline">
            PHTHALO WATCH REPOSITORY
          </span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-medium tracking-wider uppercase text-[#8EAA9F]">
          <a
            href="#catalogue"
            className="hover:text-[#FFCC53] transition-colors whitespace-nowrap shrink-0"
          >
            All Watches
          </a>
          <a
            href="#featured"
            className="hover:text-[#FFCC53] transition-colors whitespace-nowrap shrink-0"
          >
            Featured Icons
          </a>
          <a
            href="#maisons"
            className="hover:text-[#FFCC53] transition-colors whitespace-nowrap shrink-0"
          >
            Maisons
          </a>
          <button
            onClick={onOpenSaved}
            className="hover:text-[#FFCC53] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-[#FFCC53]" />
            <span>Vault ({savedCount})</span>
          </button>
        </nav>

        {/* Zone 3: Search input & Concierge Primary CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative hidden md:block w-48">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8EAA9F]" />
            <input
              type="text"
              placeholder="Search reference..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-[#082C22]/80 border border-[#FFCC53]/25 rounded px-3 pl-8 py-1.5 text-xs text-[#FBF8EE] placeholder-[#8EAA9F] focus:outline-none focus:border-[#FFCC53] transition-colors"
            />
          </div>

          <button
            onClick={onOpenConcierge}
            className="px-4 py-2 text-xs font-bold text-[#041A14] bg-[#FFCC53] hover:bg-[#FFE082] rounded transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,204,83,0.35)] cursor-pointer"
          >
            <span>Private Concierge</span>
          </button>
        </div>
      </div>
    </header>
  );
};
