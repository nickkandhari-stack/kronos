/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MAISON_FILTERS } from '../data/watchCatalogue';

interface MaisonsSectionProps {
  onSelectMaison: (maison: string) => void;
}

const MAISON_CITIES: Record<string, string> = {
  'Patek Philippe': 'Geneva',
  'Audemars Piguet': 'Le Brassus',
  'Rolex': 'Geneva',
  'Breguet': 'Vallée de Joux',
  'Grand Seiko': 'Shizukuishi',
  'Credor': 'Shiojiri',
  'Hublot': 'Nyon',
  'F.P. Journe': 'Geneva'
};

export const MaisonsMarquee: React.FC<MaisonsSectionProps> = ({ onSelectMaison }) => {
  const activeMaisons = MAISON_FILTERS.filter((m) => m !== 'All Maisons');

  return (
    <section id="maisons" className="py-14 px-6 max-w-7xl mx-auto border-t border-[#082C22]/15">
      <div className="flex items-end justify-between mb-8">
        <div>
          <span className="font-mono-num text-[11px] uppercase tracking-[0.25em] text-[#8C640A] font-semibold block mb-1">
            MANUFACTURE HOUSES
          </span>
          <h2 className="text-3xl md:text-4xl font-serif-luxury font-light text-[#041A14]">
            The Maisons
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {activeMaisons.map((maison) => {
          const city = MAISON_CITIES[maison] || 'Switzerland';
          return (
            <div
              key={maison}
              onClick={() => {
                onSelectMaison(maison);
                const el = document.getElementById('catalogue');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="p-5 bg-[#082C22]/95 backdrop-blur-md rounded-xl border border-[#FFCC53]/25 hover:border-[#FFCC53]/70 hover:bg-[#0D3E31] transition-all cursor-pointer group flex flex-col justify-between luxury-card-shadow"
            >
              <span className="text-[10px] font-mono-num uppercase tracking-wider text-[#8EAA9F] block mb-2">
                {city}
              </span>
              <h3 className="text-base font-serif-luxury text-[#FBF8EE] group-hover:text-[#FFCC53] transition-colors font-medium">
                {maison}
              </h3>
            </div>
          );
        })}
      </div>
    </section>
  );
};
