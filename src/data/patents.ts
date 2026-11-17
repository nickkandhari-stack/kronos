/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HistoricPatent } from '../types/horology';

export const HISTORIC_PATENTS: HistoricPatent[] = [
  {
    id: 'patent-1795',
    year: 1795,
    patentNumber: 'Brevet d’Invention No. 282',
    title: 'The Tourbillon & Uplifted Concentric Overcoil',
    maison: 'Breguet',
    watchmaker: 'Abraham-Louis Breguet',
    significanceScore: 99,
    summary: 'A mechanical mobile carriage containing the balance wheel and escapement revolving once per minute, counteracting gravitational error in vertical pocket watch positions.',
    engineeringImpact: 'Eliminated positional gravitational error in maritime and terrestrial precision timekeepers; introduced the overcoil terminal curve.',
    schematicType: 'escapement'
  },
  {
    id: 'patent-1845',
    year: 1845,
    patentNumber: 'French Patent Brevet No. 1317',
    title: 'The Stem Winding & Setting Mechanism',
    maison: 'Patek Philippe',
    watchmaker: 'Adrien Philippe',
    significanceScore: 96,
    summary: 'A sliding pinion and crown arbor system that eliminated the need for independent winding keys, preventing dust and moisture ingress into pocket watch cases.',
    engineeringImpact: 'Established modern crown operation: position 1 winds the mainspring, position 2 sets the hands.',
    schematicType: 'winding'
  },
  {
    id: 'patent-1926',
    year: 1926,
    patentNumber: 'British Patent GB 260554 & Swiss CH 114948',
    title: 'The Hermetic Screw-Down Oyster Case',
    maison: 'Rolex',
    watchmaker: 'Hans Wilsdorf & Paul Perregaux',
    significanceScore: 97,
    summary: 'A three-part hermetically sealed case structure utilizing screw-down fluted bezel, caseback, and a threaded twinlock winding crown against lead washers.',
    engineeringImpact: 'Created the modern water-resistant sports watch, proven in 1927 on Mercedes Gleitze’s 10-hour English Channel swim.',
    schematicType: 'case'
  },
  {
    id: 'patent-1931',
    year: 1931,
    patentNumber: 'US Patent No. 1,927,405',
    title: 'Aerial Navigation Hour Angle Dial',
    maison: 'Longines',
    watchmaker: 'Col. Charles A. Lindbergh & P.V.H. Weems',
    significanceScore: 93,
    summary: 'Concentric rotatable inner dials calibrating Greenwich Hour Angle (GHA) arc degrees directly against Greenwich Civil Time, reducing aerial navigation computation from 15 minutes to seconds.',
    engineeringImpact: 'Became standard navigational equipment across transatlantic aviation routes prior to radar and GPS.',
    schematicType: 'calendar'
  },
  {
    id: 'patent-1967',
    year: 1967,
    patentNumber: 'JPO Design Reg. 44GS-TK',
    title: 'The Grammar of Design & Zaratsu Mirror Faceting',
    maison: 'Grand Seiko',
    watchmaker: 'Taro Tanaka',
    significanceScore: 94,
    summary: 'Nine geometric commandments dictating flat planes with zero visual distortion, razor-sharp intersecting ridges, and multi-faceted diamond-cut hands to reflect ambient light.',
    engineeringImpact: 'Defined modern Japanese horological aesthetic philosophy; established tin-lap blade polishing as an art form.',
    schematicType: 'case'
  },
  {
    id: 'patent-1969',
    year: 1969,
    patentNumber: 'JP Patent 44-3259 / US 3,672,155',
    title: 'Commercial Quartz Frequency Watch Module (Astron 35SQ)',
    maison: 'Grand Seiko',
    watchmaker: 'Suwa Seikosha Engineering Team',
    significanceScore: 98,
    summary: 'Miniaturization of an 8,192 Hz quartz crystal resonator, hybrid IC divider, and open stepping motor inside a wearable 36mm wristwatch.',
    engineeringImpact: 'Triggered the global Quartz Revolution, increasing consumer timekeeping accuracy by two orders of magnitude.',
    schematicType: 'module'
  },
  {
    id: 'patent-1972',
    year: 1972,
    patentNumber: 'Swiss Patent CH 536442',
    title: 'The Monobloc Case & Exposed Structural Bolt Bezel',
    maison: 'Audemars Piguet',
    watchmaker: 'Gérald Genta',
    significanceScore: 96,
    summary: 'A front-loaded monobloc case held together by 8 functional through-bolts with visible hexagonal white gold heads sealing an octagonal water-resistant bezel.',
    engineeringImpact: 'Originated the luxury stainless-steel sports watch genre; elevated industrial steel to haute horlogerie parity with platinum.',
    schematicType: 'case'
  },
  {
    id: 'patent-1980',
    year: 1980,
    patentNumber: 'Swiss Patent CH 641887',
    title: 'The Fusion of Natural Rubber & Precious Noble Metal',
    maison: 'Hublot',
    watchmaker: 'Carlo Crocco',
    significanceScore: 91,
    summary: 'Chemical vulcanization and mechanical attachment of natural rubber strap sections directly onto an 18k solid gold porthole-shaped chassis.',
    engineeringImpact: 'Broke century-old Swiss conventions separating utilitarian rubber from fine jewelry, spawning the modern luxury sports aesthetic.',
    schematicType: 'case'
  },
  {
    id: 'patent-1983',
    year: 1983,
    patentNumber: 'Japan Patent JP 1419752',
    title: 'Hollow Floating Module Shock-Resistant Architecture',
    maison: 'Casio',
    watchmaker: 'Kikuo Ibe (Project Team Tough)',
    significanceScore: 98,
    summary: 'Suspension of a digital quartz circuit board on minimum-point elastomeric dampeners within a hollow urethane case, surviving 10-meter falls onto solid concrete.',
    engineeringImpact: 'Created the G-Shock category and the world’s most indestructible wearable timepiece, exceeding 140 million units worldwide.',
    schematicType: 'module'
  },
  {
    id: 'patent-1999',
    year: 1999,
    patentNumber: 'Japan Patent JP 3218541 / EP 0935177',
    title: 'Spring Drive Tri-Synchro Electro-Mechanical Regulator',
    maison: 'Credor',
    watchmaker: 'Yoshikazu Akahane',
    significanceScore: 97,
    summary: 'Generation of electrical energy from an unwinding mainspring to power a quartz crystal and IC, which electro-magnetically brakes a glide wheel to exactly 8 rotations per second without an escapement click.',
    engineeringImpact: 'Unified mechanical autonomy (spring-driven, zero battery) with quartz chronometric precision and 0 dB continuous glide seconds.',
    schematicType: 'escapement'
  },
  {
    id: 'patent-2000',
    year: 2000,
    patentNumber: 'WIPO Patent WO 2001/014941 A1',
    title: 'Wristwatch Dual-Balance Acoustic Resonance System',
    maison: 'FP Journe',
    watchmaker: 'François-Paul Journe',
    significanceScore: 95,
    summary: 'Two independent balance wheels mounted less than 0.2mm apart on a common solid 18k rose gold plate, transferring vibrational waves to lock into counter-phase synchronicity.',
    engineeringImpact: 'First successful implementation of physical acoustic resonance in a wristwatch, cancelling out positional and kinetic disruptions.',
    schematicType: 'resonance'
  }
];
