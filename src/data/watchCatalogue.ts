/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface WatchModel {
  id: string;
  name: string;
  maison: string;
  reference: string;
  category: 'Grand Complications' | 'Iconic Sports' | 'Dress & Ultra-Thin' | 'High-Beat & Innovation' | 'Professional Diver';
  caseMaterial: string;
  diameterMm: number;
  thicknessMm: number;
  waterResistanceAtm: number;
  caliber: string;
  movementType: 'Automatic' | 'Manual' | 'Spring Drive' | 'Digital Quartz';
  powerReserveHours: number;
  vph: number;
  priceUsd: number;
  priceFormatted: string;
  dialColor: string;
  strap: string;
  image: string;
  badge?: string;
  highlights: string[];
  availability: 'In Salon' | 'Allocation Request' | 'Limited Edition' | 'Available';
}

export const WATCH_CATALOGUE: WatchModel[] = [
  {
    id: 'patek-5740',
    name: 'Perpetual Calendar',
    maison: 'Patek Philippe',
    reference: 'Ref. 5740/1G-001',
    category: 'Grand Complications',
    caseMaterial: '18k White Gold',
    diameterMm: 40.0,
    thicknessMm: 8.42,
    waterResistanceAtm: 6,
    caliber: 'Calibre 240 Q',
    movementType: 'Automatic',
    powerReserveHours: 48,
    vph: 21600,
    priceUsd: 145000,
    priceFormatted: '$145,000',
    dialColor: 'Sunburst Royal Blue',
    strap: 'Integrated 18k White Gold',
    image: '/src/assets/images/watch_patek_grand_complication_1793879206933.jpg',
    badge: 'Grand Complication',
    highlights: [
      'Perpetual Calendar with Moon Phase',
      'Solid 18k White Gold Architecture',
      'Ultra-Thin 22k Gold Micro-Rotor'
    ],
    availability: 'Allocation Request'
  },
  {
    id: 'ap-royal-oak-jumbo',
    name: "Royal Oak 'Jumbo' Extra-Thin",
    maison: 'Audemars Piguet',
    reference: 'Ref. 16202ST.OO.1240ST.02',
    category: 'Iconic Sports',
    caseMaterial: '316L Stainless Steel',
    diameterMm: 39.0,
    thicknessMm: 8.1,
    waterResistanceAtm: 5,
    caliber: 'Calibre 7121',
    movementType: 'Automatic',
    powerReserveHours: 55,
    vph: 28800,
    priceUsd: 33200,
    priceFormatted: '$33,200',
    dialColor: 'Bleu Nuit, Nuage 50',
    strap: 'Integrated Satin Steel',
    image: '/src/assets/images/watch_royal_oak_steel_1793879209048.jpg',
    badge: 'Iconic Steel',
    highlights: [
      'Petite Tapisserie Guilloché Dial',
      'Satin & Polished Chamfered Edges',
      'Exposed White Gold Octagonal Screws'
    ],
    availability: 'Allocation Request'
  },
  {
    id: 'rolex-submariner-date',
    name: 'Submariner Date 41',
    maison: 'Rolex',
    reference: 'Ref. 126610LN',
    category: 'Professional Diver',
    caseMaterial: 'Oystersteel 904L',
    diameterMm: 41.0,
    thicknessMm: 12.3,
    waterResistanceAtm: 30,
    caliber: 'Calibre 3235',
    movementType: 'Automatic',
    powerReserveHours: 70,
    vph: 28800,
    priceUsd: 10250,
    priceFormatted: '$10,250',
    dialColor: 'Gloss Black',
    strap: 'Oystersteel Glidelock',
    image: '/src/assets/images/watch_rolex_submariner_1793879207784.jpg',
    badge: 'Certified Diver',
    highlights: [
      'Cerachrom Ceramic Rotatable Bezel',
      'Paramagnetic Blue Parachrom Hairspring',
      'Triplock Waterproofness (300m)'
    ],
    availability: 'In Salon'
  },
  {
    id: 'breguet-classique-tourbillon',
    name: 'Classique Double Tourbillon',
    maison: 'Breguet',
    reference: 'Ref. 5345PT/1S/9X6',
    category: 'Grand Complications',
    caseMaterial: 'Platinum 950',
    diameterMm: 46.0,
    thicknessMm: 16.8,
    waterResistanceAtm: 3,
    caliber: 'Calibre 588N2',
    movementType: 'Manual',
    powerReserveHours: 50,
    vph: 18000,
    priceUsd: 635000,
    priceFormatted: '$635,000',
    dialColor: 'Engine-Turned Guilloché Silver',
    strap: 'Midnight Alligator Leather',
    image: '/src/assets/images/watch_breguet_tourbillon_1793879753393.jpg',
    badge: 'Haute Horlogerie',
    highlights: [
      'Twin Revolving Tourbillon Cages',
      'Rose-Engine Hand Guilloché Dial',
      'Tempered Blued Steel Breguet Hands'
    ],
    availability: 'Allocation Request'
  },
  {
    id: 'grand-seiko-snowflake',
    name: 'Heritage Spring Drive "Snowflake"',
    maison: 'Grand Seiko',
    reference: 'Ref. SBGA211',
    category: 'High-Beat & Innovation',
    caseMaterial: 'High-Intensity Titanium',
    diameterMm: 41.0,
    thicknessMm: 12.5,
    waterResistanceAtm: 10,
    caliber: 'Calibre 9R65',
    movementType: 'Spring Drive',
    powerReserveHours: 72,
    vph: 28800,
    priceUsd: 6200,
    priceFormatted: '$6,200',
    dialColor: 'Hotaka Snow Texture',
    strap: 'Titanium Zaratsu Bracelet',
    image: '/src/assets/images/watch_grand_seiko_snowflake_1793879754127.jpg',
    badge: 'Zaratsu Polish',
    highlights: [
      'Wind-Carved Snowfield Dial Relief',
      'Distortion-Free Zaratsu Blade Polish',
      'Silent Continuous Glide Seconds'
    ],
    availability: 'Available'
  },
  {
    id: 'credor-eichi-2',
    name: 'Eichi II Pure Porcelain',
    maison: 'Credor',
    reference: 'Ref. GBLT999',
    category: 'Dress & Ultra-Thin',
    caseMaterial: 'Platinum 950',
    diameterMm: 39.0,
    thicknessMm: 10.3,
    waterResistanceAtm: 3,
    caliber: 'Calibre 7R14',
    movementType: 'Spring Drive',
    powerReserveHours: 60,
    vph: 28800,
    priceUsd: 54000,
    priceFormatted: '$54,000',
    dialColor: 'Noritake Bone China Porcelain',
    strap: 'Navy Alligator Leather',
    image: '/src/assets/images/watch_credor_eichi_porcelain_1793879754757.jpg',
    badge: 'Micro Artist Studio',
    highlights: [
      'Hand-Painted Cobalt Blue Indices',
      'Gentian Wood Peg Convex Anglage',
      'Zero Decibel Silent Tri-Synchro Brake'
    ],
    availability: 'Limited Edition'
  },
  {
    id: 'hublot-big-bang-integral',
    name: 'Big Bang Integral Ceramic',
    maison: 'Hublot',
    reference: 'Ref. 451.CX.1170.CX',
    category: 'Iconic Sports',
    caseMaterial: 'Black Zirconium Ceramic',
    diameterMm: 42.0,
    thicknessMm: 13.45,
    waterResistanceAtm: 10,
    caliber: 'Calibre HUB1280 Unico',
    movementType: 'Automatic',
    powerReserveHours: 72,
    vph: 28800,
    priceUsd: 24100,
    priceFormatted: '$24,100',
    dialColor: 'Matte Skeleton Sapphire',
    strap: 'Integrated Satin Black Ceramic',
    image: '/src/assets/images/watch_hublot_big_bang_black_1793879754775.jpg',
    badge: 'Full Ceramic',
    highlights: [
      'Scratch-Proof 1,500 Vickers Ceramic',
      'Dial-Side Visible Column Wheel',
      'Integrated Monobloc Bracelet'
    ],
    availability: 'In Salon'
  },
  {
    id: 'fp-journe-resonance',
    name: 'Chronomètre à Résonance',
    maison: 'F.P. Journe',
    reference: 'Ref. RT 42 Pt',
    category: 'Grand Complications',
    caseMaterial: 'Platinum 950',
    diameterMm: 42.0,
    thicknessMm: 11.0,
    waterResistanceAtm: 3,
    caliber: 'Calibre 1520 Solid Gold',
    movementType: 'Manual',
    powerReserveHours: 42,
    vph: 21600,
    priceUsd: 138000,
    priceFormatted: '$138,000',
    dialColor: 'Grained Silver & White Gold',
    strap: 'Matte Alligator Leather',
    image: '/src/assets/images/hero_luxury_watch_catalogue_1793879205986.jpg',
    badge: 'Dual Resonance',
    highlights: [
      'Two Balances Locked in Acoustic Resonance',
      'Solid 18k Rose Gold Baseplate & Bridges',
      'Remontoir d’Égalité Constant Force'
    ],
    availability: 'Limited Edition'
  }
];

export const MAISON_FILTERS = [
  'All Maisons',
  'Patek Philippe',
  'Audemars Piguet',
  'Rolex',
  'Breguet',
  'Grand Seiko',
  'Credor',
  'Hublot',
  'F.P. Journe'
];

export const CATEGORY_FILTERS = [
  'All Categories',
  'Grand Complications',
  'Iconic Sports',
  'Dress & Ultra-Thin',
  'High-Beat & Innovation',
  'Professional Diver'
];
