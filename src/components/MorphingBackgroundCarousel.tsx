/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Pause, Play, Compass, Sparkles } from 'lucide-react';

interface BackgroundSlide {
  id: string;
  name: string;
  maison: string;
  image: string;
}

const CAROUSEL_SLIDES: BackgroundSlide[] = [
  {
    id: 'hero',
    name: 'Master Chronometer',
    maison: 'Haute Horlogerie',
    image: '/src/assets/images/hero_luxury_watch_catalogue_1793879205986.jpg'
  },
  {
    id: 'patek',
    name: 'Perpetual Calendar',
    maison: 'Patek Philippe',
    image: '/src/assets/images/watch_patek_grand_complication_1793879206933.jpg'
  },
  {
    id: 'ap',
    name: 'Royal Oak Extra-Thin',
    maison: 'Audemars Piguet',
    image: '/src/assets/images/watch_royal_oak_steel_1793879209048.jpg'
  },
  {
    id: 'rolex',
    name: 'Submariner Date 41',
    maison: 'Rolex',
    image: '/src/assets/images/watch_rolex_submariner_1793879207784.jpg'
  },
  {
    id: 'breguet',
    name: 'Classique Double Tourbillon',
    maison: 'Breguet',
    image: '/src/assets/images/watch_breguet_tourbillon_1793879753393.jpg'
  },
  {
    id: 'grand-seiko',
    name: 'Snowflake Spring Drive',
    maison: 'Grand Seiko',
    image: '/src/assets/images/watch_grand_seiko_snowflake_1793879754127.jpg'
  },
  {
    id: 'credor',
    name: 'Eichi II Porcelain',
    maison: 'Credor',
    image: '/src/assets/images/watch_credor_eichi_porcelain_1793879754757.jpg'
  },
  {
    id: 'hublot',
    name: 'Big Bang Ceramic',
    maison: 'Hublot',
    image: '/src/assets/images/watch_hublot_big_bang_black_1793879754775.jpg'
  }
];

export const MorphingBackgroundCarousel: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const [manualIndex, setManualIndex] = useState<number | null>(null);
  const [ambientOffset, setAmbientOffset] = useState<number>(0);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const progress = Math.min(1, Math.max(0, window.scrollY / totalHeight));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ambient slow video drift (Ken Burns gentle breathing)
  useEffect(() => {
    let animId: number;
    let t = 0;

    const loop = () => {
      if (isAutoPlay) {
        t += 0.0025;
        setAmbientOffset(Math.sin(t) * 0.04);
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isAutoPlay]);

  // Compute slide transitions based on scroll
  const totalSlides = CAROUSEL_SLIDES.length;
  // If manual index is chosen, override; otherwise calculate smoothly from scroll
  const virtualProgress = manualIndex !== null
    ? manualIndex / (totalSlides - 1)
    : scrollProgress;

  const currentFloatIndex = virtualProgress * (totalSlides - 1);
  const baseIndex = Math.floor(currentFloatIndex);
  const nextIndex = Math.min(totalSlides - 1, baseIndex + 1);
  const fraction = currentFloatIndex - baseIndex;

  const currentSlide = CAROUSEL_SLIDES[Math.round(currentFloatIndex)];

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {/* Background Slides Stack */}
      {CAROUSEL_SLIDES.map((slide, idx) => {
        // Calculate visibility and zoom morphing for each slide
        let opacity = 0;
        let scale = 1.05 + ambientOffset;

        if (idx === baseIndex) {
          opacity = 1 - fraction;
          scale = 1.04 + fraction * 0.06 + ambientOffset;
        } else if (idx === nextIndex) {
          opacity = fraction;
          scale = 1.1 - (1 - fraction) * 0.06 + ambientOffset;
        }

        if (opacity <= 0.001) return null;

        return (
          <div
            key={slide.id}
            className="absolute inset-0 transition-opacity duration-300 ease-out will-change-transform"
            style={{
              opacity,
              transform: `scale(${scale})`,
              transformOrigin: 'center center'
            }}
          >
            <img
              src={slide.image}
              alt={slide.name}
              className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-[1.12] saturate-[0.9]"
              referrerPolicy="no-referrer"
            />
          </div>
        );
      })}

      {/* Cinematic Phthalo Green Color Grading Overlays */}
      {/* 1. Deep Phthalo Green Tint overlay */}
      <div className="absolute inset-0 bg-[#041A14]/75 mix-blend-multiply" />

      {/* 2. Rich Phthalo & Gold Vignette Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(18, 87, 68, 0.15) 0%, rgba(4, 26, 20, 0.85) 65%, #041A14 100%)'
        }}
      />

      {/* 3. Subtle Film Grain / Scanline Texture for Video Reel feel */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 204, 83, 0.8) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Floating HUD Controller in bottom-right corner (Interactive pointer-events enabled) */}
      <div className="absolute bottom-6 right-6 z-20 pointer-events-auto hidden md:flex items-center gap-3 bg-[#082C22]/85 backdrop-blur-md px-3.5 py-2 rounded-full border border-[#FFCC53]/30 shadow-2xl">
        <div className="flex items-center gap-2 text-[10px] font-mono-num text-[#8EAA9F]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFCC53] animate-pulse" />
          <span className="text-[#FFCC53] font-medium uppercase tracking-wider">
            {currentSlide.maison}
          </span>
          <span className="text-white/20">·</span>
          <span className="text-white font-light truncate max-w-[120px]">
            {currentSlide.name}
          </span>
        </div>

        {/* Slide navigation pips */}
        <div className="flex items-center gap-1 pl-2 border-l border-white/10">
          {CAROUSEL_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setManualIndex(manualIndex === i ? null : i);
              }}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                Math.round(currentFloatIndex) === i
                  ? 'w-4 bg-[#FFCC53] shadow-[0_0_8px_#FFCC53]'
                  : 'w-1.5 bg-white/25 hover:bg-white/60'
              }`}
              title={`Switch to ${CAROUSEL_SLIDES[i].name}`}
            />
          ))}
        </div>

        {/* Play/Pause Ambient Ken Burns animation */}
        <button
          onClick={() => {
            if (manualIndex !== null) setManualIndex(null);
            setIsAutoPlay(!isAutoPlay);
          }}
          className="p-1 text-[#8EAA9F] hover:text-[#FFCC53] transition-colors cursor-pointer"
          title={isAutoPlay ? 'Pause Background Reel' : 'Resume Background Reel'}
        >
          {isAutoPlay ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
        </button>
      </div>
    </div>
  );
};
