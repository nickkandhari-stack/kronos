import React from 'react';
import { ArrowRight, Sparkles, Layers, Sliders } from 'lucide-react';
import MorphSlider, { MorphSliderItem } from './MorphSlider';
import { WatchModel, WATCH_CATALOGUE } from '../data/watchCatalogue';

interface HeroProps {
  totalCount: number;
  onExploreClick: () => void;
  onSelectCategory: (category: string) => void;
  onSelectWatch?: (watch: WatchModel) => void;
  watches?: WatchModel[];
}

export const CatalogueHero: React.FC<HeroProps> = ({
  totalCount,
  onExploreClick,
  onSelectCategory,
  onSelectWatch,
  watches = WATCH_CATALOGUE,
}) => {
  // Convert catalogue watches to MorphSlider items
  const sliderItems: MorphSliderItem[] = [
    {
      id: 'hero',
      image: '/src/assets/images/hero_luxury_watch_catalogue_1793879205986.jpg',
      caption: 'KRONOS Master Chronometer',
      maison: 'Haute Horlogerie',
      reference: 'Ref. CHR-2026',
      price: '$185,000',
      category: 'Grand Complications'
    },
    ...watches.map((w) => ({
      id: w.id,
      image: w.image,
      caption: w.name,
      maison: w.maison,
      reference: w.reference,
      price: w.priceFormatted,
      category: w.category
    }))
  ];

  const handleSelectSlide = (item: MorphSliderItem) => {
    if (!onSelectWatch) return;
    const matched = watches.find((w) => w.id === item.id) || watches[0];
    if (matched) {
      onSelectWatch(matched);
    }
  };

  return (
    <section className="relative w-full pt-4 pb-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-6">
      {/* Top Editorial Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#082C22] animate-pulse" />
            <span className="font-mono-num text-[11px] uppercase tracking-[0.25em] text-[#8C640A] font-semibold">
              HAUTE HORLOGERIE ARCHIVE · 2026 EDITIONS
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury font-light text-[#041A14] leading-[1.1]">
            Curated Timepiece <span className="italic font-normal text-[#8C640A]">Gallery</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onExploreClick}
            className="px-5 py-2.5 bg-[#082C22] hover:bg-[#0D3E31] text-[#FFCC53] font-bold text-xs tracking-wider uppercase rounded-lg transition-all flex items-center gap-2 shadow-lg border border-[#FFCC53]/30 cursor-pointer"
          >
            <span>Catalogue ({totalCount})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Primary Interactive WebGL MorphSlider Showcase */}
      <div className="relative w-full h-[460px] sm:h-[520px] md:h-[580px] rounded-2xl overflow-hidden border border-[#082C22]/20 shadow-2xl bg-[#041A14] luxury-card-shadow">
        <MorphSlider
          items={sliderItems}
          transition="melt"
          duration={1.1}
          intensity={0.55}
          aberration={0.35}
          drift={0.4}
          autoplay={true}
          autoplayDelay={4.5}
          loop={true}
          radius={16}
          overlayColor="#041A14"
          showCaptions={true}
          showControls={true}
          showIndicators={true}
          onSelectSlide={handleSelectSlide}
          className="w-full h-full"
        />
      </div>

      {/* Category Shortcuts strip */}
      <div className="flex items-center justify-between flex-wrap gap-3 pt-1">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-mono-num text-[#082C22]/75 uppercase tracking-wider pr-2 hidden sm:inline font-semibold">
            Direct Filter:
          </span>
          {['All Categories', 'Grand Complications', 'Iconic Sports', 'Haute Horlogerie', 'Artistic Craft'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                onSelectCategory(cat);
                onExploreClick();
              }}
              className="px-3.5 py-1.5 text-xs font-mono-num rounded-lg bg-[#082C22]/90 hover:bg-[#041A14] text-[#FBF8EE] hover:text-[#FFCC53] border border-[#FFCC53]/25 hover:border-[#FFCC53]/60 transition-all cursor-pointer whitespace-nowrap shadow-sm"
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="text-xs font-mono-num text-[#082C22]/80 flex items-center gap-2 font-medium">
          <span className="w-2 h-2 rounded-full bg-[#082C22]" />
          <span>Interactive GPU Shader: Drag or Swipe to Morph</span>
        </div>
      </div>
    </section>
  );
};
