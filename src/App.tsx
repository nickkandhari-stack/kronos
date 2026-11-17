/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import MoltenMetal from './components/MoltenMetal';
import { CatalogueHero } from './components/CatalogueHero';
import { FeaturedShowcase } from './components/FeaturedShowcase';
import { CatalogueGrid } from './components/CatalogueGrid';
import { MaisonsMarquee } from './components/MaisonsMarquee';
import { WatchDetailModal } from './components/WatchDetailModal';
import { WatchCompareDrawer } from './components/WatchCompareDrawer';
import { SavedVaultModal } from './components/SavedVaultModal';
import { ConciergeModal } from './components/ConciergeModal';
import { Footer } from './components/Footer';
import { WATCH_CATALOGUE, WatchModel } from './data/watchCatalogue';

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [activeWatch, setActiveWatch] = useState<WatchModel | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [savedWatchIds, setSavedWatchIds] = useState<string[]>(['patek-5740', 'ap-royal-oak-jumbo']);
  const [comparedWatchIds, setComparedWatchIds] = useState<string[]>(['patek-5740', 'ap-royal-oak-jumbo']);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);
  const [isVaultOpen, setIsVaultOpen] = useState<boolean>(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState<boolean>(false);
  const [conciergeTargetWatch, setConciergeTargetWatch] = useState<WatchModel | null>(null);

  // Toggle Save / Wishlist
  const handleToggleSave = (id: string) => {
    setSavedWatchIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Toggle Compare
  const handleToggleCompare = (id: string) => {
    setComparedWatchIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        // limit comparison to 3 models
        return [...prev.slice(1), id];
      }
      return [...prev, id];
    });
  };

  const handleOpenDetail = (watch: WatchModel) => {
    setActiveWatch(watch);
    setIsDetailOpen(true);
  };

  const handleOpenConcierge = (watch?: WatchModel) => {
    setConciergeTargetWatch(watch || activeWatch || null);
    setIsConciergeOpen(true);
  };

  const handleExploreClick = () => {
    const el = document.getElementById('catalogue');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const savedWatches = WATCH_CATALOGUE.filter((w) => savedWatchIds.includes(w.id));
  const comparedWatches = WATCH_CATALOGUE.filter((w) => comparedWatchIds.includes(w.id));

  return (
    <div className="relative min-h-screen bg-[#F5EFE2] text-[#041A14] flex flex-col font-sans selection:bg-[#FFCC53]/40 selection:text-[#041A14]">
      {/* Fullscreen Silk Ivory Cloth Shader Background (MoltenMetal) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <MoltenMetal
          colors={['#EAE0CB', '#F3ECE0', '#FAF6ED', '#FFF8E7']}
          coreColor="#FFFFFF"
          backgroundColor="#DDD0B8"
          speed={0.24}
          scale={3.0}
          detail={3}
          glow={2.3}
          thickness={1.25}
          swirl={1.15}
          turbulence={0.22}
          haze={0.84}
          brightness={1.7}
          colorMode="molten"
          drift={0.38}
          grain={0.035}
          mouseInteraction={true}
          mouseStrength={0.75}
          flareOnClick={true}
          opacity={1}
          className="w-full h-full"
        />

        {/* Soft Silk Ivory Edge Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 30%, transparent 45%, rgba(226, 214, 192, 0.35) 88%, rgba(210, 196, 170, 0.5) 100%)'
          }}
        />
      </div>

      {/* 3-Zone Luxury Top Bar */}
      <Header
        savedCount={savedWatchIds.length}
        onOpenSaved={() => setIsVaultOpen(true)}
        onOpenConcierge={() => handleOpenConcierge()}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="relative z-10 flex-1">
        {/* Visual Hero Campaign Gallery with GPU MorphSlider */}
        <CatalogueHero
          totalCount={WATCH_CATALOGUE.length}
          watches={WATCH_CATALOGUE}
          onSelectWatch={handleOpenDetail}
          onExploreClick={handleExploreClick}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            handleExploreClick();
          }}
        />

        {/* Featured Benchmark Timepieces */}
        <FeaturedShowcase
          watches={WATCH_CATALOGUE}
          onSelectWatch={handleOpenDetail}
        />

        {/* Primary Watch Catalogue Grid */}
        <CatalogueGrid
          watches={WATCH_CATALOGUE}
          onSelectWatch={handleOpenDetail}
          savedWatchIds={savedWatchIds}
          onToggleSave={handleToggleSave}
          comparedWatchIds={comparedWatchIds}
          onToggleCompare={handleToggleCompare}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Master Maisons Directory */}
        <MaisonsMarquee
          onSelectMaison={(maison) => {
            setSearchQuery(maison);
            handleExploreClick();
          }}
        />
      </main>

      {/* Global Minimalist Footer */}
      <Footer onOpenConcierge={() => handleOpenConcierge()} />

      {/* Product Detail Modal (PDP) with 10x Macro Loupe Inspection */}
      <WatchDetailModal
        watch={activeWatch}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        isSaved={activeWatch ? savedWatchIds.includes(activeWatch.id) : false}
        onToggleSave={handleToggleSave}
        onOpenConcierge={(w) => {
          setIsDetailOpen(false);
          handleOpenConcierge(w);
        }}
      />

      {/* Side-by-Side Comparison Drawer & Bar */}
      <WatchCompareDrawer
        comparedWatches={comparedWatches}
        onRemoveWatch={handleToggleCompare}
        onClearAll={() => setComparedWatchIds([])}
        isOpen={isCompareOpen}
        onToggleOpen={() => setIsCompareOpen(!isCompareOpen)}
        onSelectWatch={handleOpenDetail}
      />

      {/* Personal Watch Vault Modal */}
      <SavedVaultModal
        savedWatches={savedWatches}
        isOpen={isVaultOpen}
        onClose={() => setIsVaultOpen(false)}
        onRemoveWatch={handleToggleSave}
        onSelectWatch={handleOpenDetail}
        onOpenConcierge={handleOpenConcierge}
      />

      {/* Private Salon & Allocation Inquiry Concierge Modal */}
      <ConciergeModal
        initialWatch={conciergeTargetWatch}
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
      />
    </div>
  );
}
