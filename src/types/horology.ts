/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type MaisonId =
  | 'Breguet'
  | 'Patek Philippe'
  | 'Audemars Piguet'
  | 'FP Journe'
  | 'Rolex'
  | 'Longines'
  | 'Hublot'
  | 'Credor'
  | 'Grand Seiko'
  | 'Orient'
  | 'Casio';

export type CuratorialGroup =
  | 'inceptors'      // The Inceptors of Classical Science & Complications (Breguet, Patek Philippe, Longines)
  | 'architects'    // The Architects of Avant-Garde Form & Physical Mastery (Audemars Piguet, Hublot, F.P. Journe)
  | 'masters-east'  // The Masters of Eastern Precision & Micro-Artistry (Credor, Grand Seiko, Orient)
  | 'titans';       // The Titans of Uncompromising Utilitarianism (Rolex, Casio)

export type PersonaType = 'purist' | 'architect' | 'scholar';

export interface HorologicalMasterwork {
  id: string;
  referenceNumber: string;
  commonName: string;
  maison: MaisonId;
  group: CuratorialGroup;
  establishedYear: number;
  originLocation: string;
  epitaph: string;
  yearIntroduced: number;
  historicalSignificance: string;
  culturalImpactScore: number; // Scale 1-100
  humanInterventionIndex: number; // Percentage 0-100 (hand finished file/wood peg vs automated CNC)
  paletteAccent: string; // Hex color for thematic lighting
  dimensions: {
    caseDiameterMm: number;
    caseThicknessMm: number;
    lugToLugMm: number;
    lugWidthMm: number;
  };
  caseEngineering: {
    material: string;
    constructionType: 'Monobloc' | 'Three-Piece' | 'Hollow Module' | 'Sandwich';
    waterResistanceAtm: number;
    magneticResistanceGauss: number;
  };
  caliberProfile: {
    designation: string;
    windingType: 'Manual' | 'Automatic Central Rotor' | 'Micro-Rotor' | 'Spring Drive' | 'Digital Quartz';
    frequencyVph: number;
    frequencyHz: number;
    jewelCount: number;
    powerReserveHours: number;
    escapementType: string;
    balanceSpringType: string;
    finishingProtocols: string[];
  };
  keyInnovations: {
    title: string;
    year: number;
    description: string;
  }[];
  curatorialNarrative: string;
  visualDirectives: {
    dialCue: string;
    movementCue: string;
    caseCue: string;
  };
  uniqueInteractionId:
    | 'rose-engine'
    | 'golden-ratio'
    | 'tapisserie'
    | 'resonance'
    | 'triplock'
    | 'hour-angle'
    | 'disassembler'
    | 'fluid-glide'
    | 'zaratsu'
    | 'multi-year'
    | 'drop-test';
}

export interface HistoricPatent {
  id: string;
  year: number;
  patentNumber: string;
  title: string;
  maison: MaisonId;
  watchmaker: string;
  significanceScore: number; // 1-100
  summary: string;
  engineeringImpact: string;
  schematicType: 'escapement' | 'case' | 'winding' | 'module' | 'calendar' | 'resonance';
  blueprintSvgPath?: string;
}
