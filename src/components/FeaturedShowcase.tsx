/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { WatchModel } from '../data/watchCatalogue';
import { ArrowRight } from 'lucide-react';

interface FeaturedShowcaseProps {
  watches: WatchModel[];
  onSelectWatch: (watch: WatchModel) => void;
}

export const FeaturedShowcase: React.FC<FeaturedShowcaseProps> = ({
  watches,
  onSelectWatch,
}) => {
  const patek = watches.find((w) => w.id === 'patek-5740');
  const ap = watches.find((w) => w.id === 'ap-royal-oak-jumbo');
  const rolex = watches.find((w) => w.id === 'rolex-submariner-date');

  const featuredList = [patek, ap, rolex].filter(Boolean) as WatchModel[];

  return (
    <section id="featured" className="py-14 px-6 max-w-7xl mx-auto border-t border-[#082C22]/15">
      <div className="flex items-end justify-between mb-8">
        <div>
          <span className="font-mono-num text-[11px] uppercase tracking-[0.25em] text-[#8C640A] font-semibold block mb-1">
            EXEMPLARY PIECES
          </span>
          <h2 className="text-3xl md:text-4xl font-serif-luxury font-light text-[#041A14]">
            Manufacture Highlights
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {featuredList.map((watch) => (
          <div
            key={watch.id}
            onClick={() => onSelectWatch(watch)}
            className="group relative bg-[#082C22]/95 backdrop-blur-md rounded-2xl overflow-hidden border border-[#FFCC53]/25 hover:border-[#FFCC53]/70 transition-all duration-300 p-5 flex flex-col justify-between cursor-pointer luxury-card-shadow luxury-card-hover"
          >
            <div className="space-y-4">
              {/* Product Photo */}
              <div className="aspect-square w-full rounded-xl overflow-hidden bg-[#041A14] border border-[#FFCC53]/10">
                <img
                  src={watch.image}
                  alt={watch.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <span className="font-mono-num text-[11px] uppercase tracking-widest text-[#FFCC53] block">
                  {watch.maison} · {watch.reference}
                </span>
                <h3 className="text-xl font-serif-luxury text-[#FBF8EE] mt-1 font-normal group-hover:text-[#FFCC53] transition-colors">
                  {watch.name}
                </h3>
                <div className="text-xs text-[#8EAA9F] font-mono-num mt-1 flex items-center gap-2">
                  <span>{watch.diameterMm} mm</span>
                  <span className="text-white/20">·</span>
                  <span>{watch.caliber}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#FFCC53]/10 flex items-center justify-between mt-4">
              <span className="text-base font-mono-num font-semibold text-[#FFCC53]">
                {watch.priceFormatted}
              </span>
              <span className="text-xs font-mono-num text-[#FFCC53] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
