/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { WatchModel, MAISON_FILTERS, CATEGORY_FILTERS } from '../data/watchCatalogue';
import { Bookmark, Eye, ArrowUpDown, Plus, Check, RotateCw, Layers } from 'lucide-react';
import FlipCard from './FlipCard';

interface CatalogueGridProps {
  watches: WatchModel[];
  onSelectWatch: (watch: WatchModel) => void;
  savedWatchIds: string[];
  onToggleSave: (id: string) => void;
  comparedWatchIds: string[];
  onToggleCompare: (id: string) => void;
  searchQuery: string;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const CatalogueGrid: React.FC<CatalogueGridProps> = ({
  watches,
  onSelectWatch,
  savedWatchIds,
  onToggleSave,
  comparedWatchIds,
  onToggleCompare,
  searchQuery,
  selectedCategory,
  onSelectCategory,
}) => {
  const [selectedMaison, setSelectedMaison] = useState<string>('All Maisons');
  const [selectedMovement, setSelectedMovement] = useState<string>('All Movements');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'diameter-asc' | 'diameter-desc'>('default');

  const filteredWatches = useMemo(() => {
    return watches
      .filter((w) => {
        const matchesCategory =
          selectedCategory === 'All Categories' || w.category === selectedCategory;
        const matchesMaison =
          selectedMaison === 'All Maisons' || w.maison === selectedMaison;
        const matchesMovement =
          selectedMovement === 'All Movements' || w.movementType === selectedMovement;
        const matchesSearch =
          !searchQuery ||
          w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          w.maison.toLowerCase().includes(searchQuery.toLowerCase()) ||
          w.reference.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesMaison && matchesMovement && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-desc') return b.priceUsd - a.priceUsd;
        if (sortBy === 'price-asc') return a.priceUsd - b.priceUsd;
        if (sortBy === 'diameter-desc') return b.diameterMm - a.diameterMm;
        if (sortBy === 'diameter-asc') return a.diameterMm - b.diameterMm;
        return 0;
      });
  }, [watches, selectedCategory, selectedMaison, selectedMovement, searchQuery, sortBy]);

  return (
    <section id="catalogue" className="py-14 px-6 max-w-7xl mx-auto">
      {/* Title & Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-[#082C22]/15 pb-6">
        <div>
          <span className="font-mono-num text-[11px] uppercase tracking-[0.25em] text-[#8C640A] font-semibold block mb-1">
            MANUFACTURE COLLECTION
          </span>
          <h2 className="text-3xl md:text-4xl font-serif-luxury font-light text-[#041A14]">
            Timepiece Catalogue
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono-num text-[#082C22]/80">
          <span className="w-2 h-2 rounded-full bg-[#082C22] animate-pulse" />
          <span>Showing <span className="text-[#041A14] font-bold">{filteredWatches.length}</span> Masterpieces</span>
          <span className="text-[#082C22]/25">·</span>
          <span className="text-[11px] text-[#8C640A] font-medium hidden sm:inline">Click any card to flip & view specs</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="space-y-4 mb-8">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORY_FILTERS.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#082C22] text-[#FFCC53] font-semibold shadow-md border border-[#FFCC53]/40'
                    : 'bg-[#FAF6ED]/80 backdrop-blur-md text-[#041A14] hover:text-[#082C22] hover:bg-white border border-[#082C22]/15'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Dropdowns Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#082C22]/95 backdrop-blur-md border border-[#FFCC53]/25 rounded-xl shadow-md">
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={selectedMaison}
              onChange={(e) => setSelectedMaison(e.target.value)}
              className="bg-[#0D3E31] border border-[#FFCC53]/20 text-xs text-[#FBF8EE] rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#FFCC53] cursor-pointer"
            >
              {MAISON_FILTERS.map((m) => (
                <option key={m} value={m} className="bg-[#082C22] text-[#FBF8EE]">
                  {m}
                </option>
              ))}
            </select>

            <select
              value={selectedMovement}
              onChange={(e) => setSelectedMovement(e.target.value)}
              className="bg-[#0D3E31] border border-[#FFCC53]/20 text-xs text-[#FBF8EE] rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#FFCC53] cursor-pointer"
            >
              <option value="All Movements" className="bg-[#082C22] text-[#FBF8EE]">All Movements</option>
              <option value="Automatic" className="bg-[#082C22] text-[#FBF8EE]">Automatic</option>
              <option value="Manual" className="bg-[#082C22] text-[#FBF8EE]">Manual Wind</option>
              <option value="Spring Drive" className="bg-[#082C22] text-[#FBF8EE]">Spring Drive</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#FFCC53]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#0D3E31] border border-[#FFCC53]/20 text-xs text-[#FBF8EE] rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#FFCC53] cursor-pointer"
            >
              <option value="default" className="bg-[#082C22] text-[#FBF8EE]">Default Sort</option>
              <option value="price-desc" className="bg-[#082C22] text-[#FBF8EE]">Price: High to Low</option>
              <option value="price-asc" className="bg-[#082C22] text-[#FBF8EE]">Price: Low to High</option>
              <option value="diameter-desc" className="bg-[#082C22] text-[#FBF8EE]">Diameter: Largest</option>
              <option value="diameter-asc" className="bg-[#082C22] text-[#FBF8EE]">Diameter: Smallest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of 3D FlipCards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredWatches.map((watch) => {
          const isSaved = savedWatchIds.includes(watch.id);
          const isCompared = comparedWatchIds.includes(watch.id);

          return (
            <FlipCard
              key={watch.id}
              axis="y"
              flipOnClick={true}
              draggable={true}
              tilt={true}
              tiltMax={10}
              glare={true}
              glareOpacity={0.22}
              hoverScale={1.02}
              perspective={1100}
              stiffness={180}
              damping={22}
              width="100%"
              height={510}
              radius={20}
              background="#082C22"
              color="#FBF8EE"
              shadow={true}
              shadowColor="#041A14"
              shadowOpacity={0.32}
              ariaLabel={`Flip card for ${watch.name}`}
              className="w-full"
              front={
                <div className="h-full w-full flex flex-col justify-between p-4 bg-[#082C22] text-[#FBF8EE] relative select-none">
                  {/* Top Image Showcase */}
                  <div className="relative aspect-[4/3] w-full bg-[#041A14] rounded-xl overflow-hidden border border-[#FFCC53]/15">
                    <img
                      src={watch.image}
                      alt={watch.name}
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />

                    {/* Top Badges & Save Button */}
                    <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between">
                      {watch.badge ? (
                        <span className="text-[10px] font-mono-num uppercase tracking-wider text-[#FFCC53] bg-[#041A14]/90 backdrop-blur-md px-2.5 py-1 rounded border border-[#FFCC53]/30">
                          {watch.badge}
                        </span>
                      ) : <span />}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleSave(watch.id);
                        }}
                        className={`p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                          isSaved
                            ? 'bg-[#FFCC53] text-[#041A14]'
                            : 'bg-[#041A14]/80 text-[#8EAA9F] hover:text-[#FFCC53] border border-[#FFCC53]/25'
                        }`}
                        title={isSaved ? 'Bookmarked' : 'Save Watch'}
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Subtle Flip Hint Ribbon */}
                    <div className="absolute bottom-2 inset-x-2 flex justify-center pointer-events-none">
                      <span className="bg-[#041A14]/85 text-[#FFCC53] text-[10px] font-mono-num px-3 py-1 rounded-full backdrop-blur-md border border-[#FFCC53]/30 flex items-center gap-1.5 shadow-md">
                        <RotateCw className="w-3 h-3 text-[#FFCC53]" />
                        <span>Click or Drag to Flip</span>
                      </span>
                    </div>
                  </div>

                  {/* Middle Content */}
                  <div className="py-2.5 space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono-num">
                      <span className="text-[11px] uppercase tracking-widest text-[#FFCC53] font-semibold">
                        {watch.maison}
                      </span>
                      <span className="text-[11px] text-[#8EAA9F]">
                        {watch.reference}
                      </span>
                    </div>

                    <h3 className="text-lg font-serif-luxury text-[#FBF8EE] font-medium truncate">
                      {watch.name}
                    </h3>

                    <div className="text-xs text-[#8EAA9F] font-mono-num flex items-center gap-2 pt-0.5">
                      <span>{watch.diameterMm} mm</span>
                      <span className="text-white/20">·</span>
                      <span className="truncate">{watch.caseMaterial.split('&')[0]}</span>
                      <span className="text-white/20">·</span>
                      <span>{watch.caliber}</span>
                    </div>
                  </div>

                  {/* Bottom Price & Controls */}
                  <div className="pt-3 border-t border-[#FFCC53]/15 flex items-center justify-between">
                    <span className="text-base font-mono-num font-semibold text-[#FFCC53]">
                      {watch.priceFormatted}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleCompare(watch.id);
                        }}
                        className={`px-2.5 py-1 text-xs font-mono-num rounded border transition-colors flex items-center gap-1 cursor-pointer ${
                          isCompared
                            ? 'bg-[#FFCC53]/20 border-[#FFCC53] text-[#FFCC53]'
                            : 'border-[#FFCC53]/25 text-[#8EAA9F] hover:text-[#FBF8EE] hover:border-[#FFCC53]/50'
                        }`}
                      >
                        {isCompared ? <Check className="w-3 h-3 text-[#FFCC53]" /> : <Plus className="w-3 h-3" />}
                        <span className="text-[11px]">{isCompared ? 'Comparing' : 'Compare'}</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectWatch(watch);
                        }}
                        className="p-1.5 rounded bg-[#FFCC53]/15 hover:bg-[#FFCC53] text-[#FFCC53] hover:text-[#041A14] transition-colors cursor-pointer border border-[#FFCC53]/30"
                        title="Open 10x Macro Loupe Inspection"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              }
              back={
                <div className="h-full w-full flex flex-col justify-between p-5 bg-gradient-to-b from-[#082C22] via-[#05221A] to-[#041A14] text-[#FBF8EE] relative select-none">
                  {/* Back Header */}
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-[#FFCC53]/15">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono-num text-[#FFCC53] uppercase font-semibold">
                        <span>{watch.maison}</span>
                        <span className="text-white/20">·</span>
                        <span className="text-[#8EAA9F]">{watch.reference}</span>
                      </div>

                      <span className="text-[10px] font-mono-num text-[#FFCC53] bg-[#FFCC53]/10 px-2 py-0.5 rounded border border-[#FFCC53]/30 flex items-center gap-1">
                        <RotateCw className="w-2.5 h-2.5" />
                        <span>Flip Front</span>
                      </span>
                    </div>

                    <h3 className="text-xl font-serif-luxury text-[#FBF8EE] font-light mt-2.5">
                      {watch.name}
                    </h3>
                    <p className="text-[11px] font-mono-num text-[#8EAA9F]">
                      Category: {watch.category}
                    </p>
                  </div>

                  {/* Specifications Matrix Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono-num bg-[#041A14]/85 p-3 rounded-lg border border-[#FFCC53]/15 my-2">
                    <div>
                      <span className="text-[9px] text-[#8EAA9F] uppercase block">Calibre</span>
                      <span className="text-[#FBF8EE] font-medium truncate block">{watch.caliber}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-[#8EAA9F] uppercase block">Movement</span>
                      <span className="text-[#FBF8EE] font-medium">{watch.movementType}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-[#8EAA9F] uppercase block">Power Reserve</span>
                      <span className="text-[#FBF8EE] font-medium">{watch.powerReserveHours} Hours</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-[#8EAA9F] uppercase block">Frequency</span>
                      <span className="text-[#FBF8EE] font-medium">{watch.vph.toLocaleString()} VPH</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-[#8EAA9F] uppercase block">Dimensions</span>
                      <span className="text-[#FBF8EE] font-medium">{watch.diameterMm}mm × {watch.thicknessMm}mm</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-[#8EAA9F] uppercase block">Water Resistance</span>
                      <span className="text-[#FBF8EE] font-medium">{watch.waterResistanceAtm} ATM</span>
                    </div>
                  </div>

                  {/* Atelier Highlights */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono-num uppercase tracking-wider text-[#FFCC53] block">
                      Atelier Features
                    </span>
                    <ul className="space-y-1 text-xs text-[#8EAA9F] font-mono-num">
                      {watch.highlights.slice(0, 2).map((h, i) => (
                        <li key={i} className="flex items-center gap-1.5 truncate">
                          <span className="text-[#FFCC53]">•</span>
                          <span className="truncate">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Actions */}
                  <div className="pt-3 border-t border-[#FFCC53]/15 flex items-center justify-between gap-2">
                    <span className="text-base font-mono-num font-semibold text-[#FFCC53]">
                      {watch.priceFormatted}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectWatch(watch);
                      }}
                      className="px-3.5 py-1.5 bg-[#FFCC53] hover:bg-[#FFE082] text-[#041A14] text-xs font-semibold rounded flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#041A14]" />
                      <span>Inspect 10x Macro</span>
                    </button>
                  </div>
                </div>
              }
            />
          );
        })}
      </div>
    </section>
  );
};
