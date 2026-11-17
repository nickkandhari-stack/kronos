/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HorologicalMasterwork } from '../types/horology';

export const MAISONS_DATA: HorologicalMasterwork[] = [
  {
    id: 'breguet',
    referenceNumber: 'No. 160 ("Marie-Antoinette")',
    commonName: 'The Queen of Complications',
    maison: 'Breguet',
    group: 'inceptors',
    establishedYear: 1775,
    originLocation: 'Paris / Vallée de Joux',
    epitaph: 'The Father of Modern Horological Science',
    yearIntroduced: 1783,
    historicalSignificance: 'Commissioned in 1783 for Queen Marie-Antoinette with an unlimited budget and explicit directive that gold replace brass across all mechanical friction points. Completed in 1827 after 44 years of atelier labor.',
    culturalImpactScore: 99,
    humanInterventionIndex: 98,
    paletteAccent: '#D4AF37', // English Gilt
    dimensions: {
      caseDiameterMm: 63.0,
      caseThicknessMm: 24.5,
      lugToLugMm: 78.0,
      lugWidthMm: 0, // Pocket watch bow
    },
    caseEngineering: {
      material: '18k Solid Yellow Gold & Natural Rock Crystal',
      constructionType: 'Three-Piece',
      waterResistanceAtm: 0,
      magneticResistanceGauss: 25,
    },
    caliberProfile: {
      designation: 'Caliber Marie-Antoinette Perpetual',
      windingType: 'Manual',
      frequencyVph: 18000,
      frequencyHz: 2.5,
      jewelCount: 23,
      powerReserveHours: 48,
      escapementType: 'Ruby Cylinder Lever with Natural Escapement Principles',
      balanceSpringType: 'Bimetallic Balance with Gold Screws & Platinum Inertial Weights',
      finishingProtocols: [
        'Solid rock crystal transparent dial and exhibition plates',
        'Polished unplated blued steel springs and levers',
        'Hand-turned engine guilloché sub-registers',
        'Tempered cornflower blue hands at 300°C'
      ],
    },
    keyInnovations: [
      {
        title: 'The Tourbillon',
        year: 1801,
        description: 'Brevet No. 282: Counteracting the gravitational rate errors of pocket watches worn vertically in waistcoat pockets via a rotating mobile cage.'
      },
      {
        title: 'The Breguet Overcoil',
        year: 1795,
        description: 'Uplifting the terminal curve of the balance spring into a third geometric dimension to ensure concentric breathing and eliminates isochronal deviation.'
      },
      {
        title: 'Pare-Chute Shock Suspension',
        year: 1790,
        description: 'Cone-shaped pivot held by a spring-mounted leaf jewel; the foundational shock-absorption ancestor of modern Incabloc.'
      },
      {
        title: 'Engine-Turned Guilloché Silver Dials',
        year: 1786,
        description: 'Hand-operated rose engine lathes cutting geometric micro-grooves that dramatically reduced optical sun glare while defining discrete zones.'
      }
    ],
    curatorialNarrative: 'Abraham-Louis Breguet stripped away baroque excess to invent modern functional horology. The No. 160 was an open-budget commission for Queen Marie-Antoinette stipulating that gold must replace brass wherever feasible. It contains 823 individual hand-filed components, perpetual calendar, minute repeater, thermometer, equation of time, independent seconds, and a bimetallic balance.',
    visualDirectives: {
      dialCue: 'Pure silvered dial plate lit with raking side light (15° angle) to reveal the sharp relief of hand-turned guilloché grooves. Hands tempered to royal cornflower blue via controlled heating at 300°C.',
      movementCue: 'Exhibition view of the Marie-Antoinette escapement; polished unplated steel levers, ruby cylinder, and solid rock-crystal transparent plates.',
      caseCue: 'Fluted coin-edge case flanks hand-chiseled into solid 18k yellow gold with pocket watch suspension bow.'
    },
    uniqueInteractionId: 'rose-engine'
  },
  {
    id: 'patek-philippe',
    referenceNumber: 'Ref. 3738 / Ref. 1518',
    commonName: 'Golden Ellipse & The Serially Produced Perpetual',
    maison: 'Patek Philippe',
    group: 'inceptors',
    establishedYear: 1839,
    originLocation: 'Geneva',
    epitaph: 'The Sovereign of Pure Proportion and High Complication',
    yearIntroduced: 1968,
    historicalSignificance: 'The Golden Ellipse (1968) rejected traditional round and rectangular shapes, deriving its geometry from the ancient golden ratio (1:1.6181). Ref. 1518 (1941) was the world’s first serially produced perpetual calendar chronograph wristwatch.',
    culturalImpactScore: 98,
    humanInterventionIndex: 94,
    paletteAccent: '#D4AF37',
    dimensions: {
      caseDiameterMm: 31.0,
      caseThicknessMm: 5.9,
      lugToLugMm: 35.6,
      lugWidthMm: 18.0,
    },
    caseEngineering: {
      material: '18k Yellow Gold / Chemically Cobalt Blue Dial',
      constructionType: 'Three-Piece',
      waterResistanceAtm: 3,
      magneticResistanceGauss: 60,
    },
    caliberProfile: {
      designation: 'Caliber 240 Micro-Rotor',
      windingType: 'Micro-Rotor',
      frequencyVph: 21600,
      frequencyHz: 3.0,
      jewelCount: 27,
      powerReserveHours: 48,
      escapementType: 'Swiss Anker Escapement with Gyromax Collets',
      balanceSpringType: 'Spiromax® in Silinvar (Monocrystalline Silicon)',
      finishingProtocols: [
        'Poinçon de Genève / Patek Philippe Seal criteria',
        '22k solid gold off-centered recessed micro-rotor with engraved Calatrava cross',
        'Hand-chamfered bridges with mirror-polished anglage',
        'Circular Côtes de Genève stripes on bridge tops'
      ],
    },
    keyInnovations: [
      {
        title: 'Keyless Stem Winding & Hand-Setting',
        year: 1845,
        description: 'Adrien Philippe liberated watches from separate brass winding keys, patenting the integrated crown winding mechanism.'
      },
      {
        title: 'The Gyromax Balance',
        year: 1949,
        description: 'Free-sprung balance with rotatable eccentric weights on the balance rim, allowing fine rate adjustment without disrupting hairspring active length.'
      },
      {
        title: 'Linear Miniaturized Perpetual Calendar',
        year: 1925,
        description: 'World’s first wristwatch with a perpetual calendar mechanism miniaturized from pocket watch format (Caliber 97975).'
      }
    ],
    curatorialNarrative: 'Patek Philippe represents the absolute standard of Genevan classical restraint. The Golden Ellipse rejected traditional round and rectangular shapes, deriving its geometry from the ancient divine ratio. Its dial was produced using a proprietary chemical cobalt blue treatment on a solid 18k gold plate.',
    visualDirectives: {
      dialCue: 'Deep cobalt blue dial with sunburst brush strokes radiating from the absolute center. Applied faceted baton indices in 18k yellow gold without luminescence.',
      movementCue: 'Ultra-thin Caliber 240 with sunken 22k gold micro-rotor flush with bridge surface, hand-beveled anglage on every interior contour.',
      caseCue: 'Strict top-down architectural layout emphasizing the seamless curve between the oval and rectangle. Zero visible lug pins.'
    },
    uniqueInteractionId: 'golden-ratio'
  },
  {
    id: 'audemars-piguet',
    referenceNumber: 'Ref. 5402ST ("The Jumbo")',
    commonName: 'Royal Oak Original 1972',
    maison: 'Audemars Piguet',
    group: 'architects',
    establishedYear: 1875,
    originLocation: 'Le Brassus, Vallée de Joux',
    epitaph: 'The Disruptors of Form, Geometry, and Steel Horology',
    yearIntroduced: 1972,
    historicalSignificance: 'Designed overnight by Gérald Genta before Baselworld 1972. The watch that saved the Swiss mechanical industry by treating surgical stainless steel with finishing techniques previously reserved for platinum.',
    culturalImpactScore: 97,
    humanInterventionIndex: 88,
    paletteAccent: '#8A9EA7', // Steel Slate
    dimensions: {
      caseDiameterMm: 39.0,
      caseThicknessMm: 7.05,
      lugToLugMm: 48.0,
      lugWidthMm: 28.0, // Integrated
    },
    caseEngineering: {
      material: '316L Stainless Steel Monobloc',
      constructionType: 'Monobloc',
      waterResistanceAtm: 5,
      magneticResistanceGauss: 70,
    },
    caliberProfile: {
      designation: 'Caliber 2121 (Based on JLC 920)',
      windingType: 'Automatic Central Rotor',
      frequencyVph: 19800,
      frequencyHz: 2.75,
      jewelCount: 36,
      powerReserveHours: 40,
      escapementType: 'Direct Swiss Lever with Beryllium Copper Balance Ring',
      balanceSpringType: 'Free-sprung Glucydur balance with mobile stud carrier',
      finishingProtocols: [
        'Central 21k gold skeletonized rotor suspended on peripheral ruby rollers',
        'Hand-polished screw recesses and satin-brushed bridge surfaces',
        'Fine circular graining (perlage) on mainplate base',
        'Hand-finished anglage along every structural bridge contour'
      ],
    },
    keyInnovations: [
      {
        title: 'Monobloc Luxury Steel Architecture',
        year: 1972,
        description: 'First high-horology timepiece to utilize high-grade surgical stainless steel treated with diamond abrasives matching solid platinum finish.'
      },
      {
        title: 'Visible Structural Bolt Bezel',
        year: 1972,
        description: 'Eight functional white-gold hexagonal bolts running through the octagonal bezel, case, and caseback, celebrating engineering mechanics.'
      },
      {
        title: 'Ultra-Thin Caliber 2121',
        year: 1970,
        description: 'At 3.05mm thickness with central rotor, it remained the thinnest full-rotor automatic movement with date for decades.'
      }
    ],
    curatorialNarrative: 'At Baselworld 1972, high watchmaking was exclusively gold, small, and conservative. Audemars Piguet launched an industrial steel watch that was priced higher than a solid-gold dress watch. Inspired by traditional brass deep-sea diving helmets, the octagonal bezel with eight exposed hexagonal white gold screws transformed the sports watch into high art.',
    visualDirectives: {
      dialCue: 'Hand-guilloché "Petite Tapisserie" square pyramidal relief cut via 19th-century pantograph copying lathe.',
      movementCue: 'Caliber 2121 rotor supported by four synthetic ruby roller wheels mounted on the outer perimeter ring.',
      caseCue: 'Vertical satin-brush finish across flat octagonal bezel top, contrasted sharply against hand-mirror-polished bevel edges (anglage).'
    },
    uniqueInteractionId: 'tapisserie'
  },
  {
    id: 'fp-journe',
    referenceNumber: 'Chronomètre à Résonance',
    commonName: 'Dual Resonance Chronometer',
    maison: 'FP Journe',
    group: 'architects',
    establishedYear: 1999,
    originLocation: 'Geneva',
    epitaph: 'Invenit et Fecit — Independent Mechanical Purism',
    yearIntroduced: 2000,
    historicalSignificance: 'The first wristwatch in human history to utilize the physical phenomenon of acoustic resonance between two freely suspended balances oscillating in close mechanical proximity.',
    culturalImpactScore: 95,
    humanInterventionIndex: 96,
    paletteAccent: '#C5A059',
    dimensions: {
      caseDiameterMm: 40.0,
      caseThicknessMm: 9.0,
      lugToLugMm: 48.0,
      lugWidthMm: 20.0,
    },
    caseEngineering: {
      material: 'Platinum 950 / Solid 18k Rose Gold Caliber',
      constructionType: 'Three-Piece',
      waterResistanceAtm: 3,
      magneticResistanceGauss: 80,
    },
    caliberProfile: {
      designation: 'Caliber 1499.3 (Solid 18k Rose Gold Baseplate)',
      windingType: 'Manual',
      frequencyVph: 21600,
      frequencyHz: 3.0,
      jewelCount: 36,
      powerReserveHours: 42,
      escapementType: 'Dual Independent Swiss Levers with Acoustic Sympathy Coupling',
      balanceSpringType: 'Twin Free-Sprung Balances with 4 Inertial Gold Weights each',
      finishingProtocols: [
        'Solid 18k rose gold plates and bridges machined completely in-house',
        'Circular Côtes de Genève radiating across the dual balance platforms',
        'Black mirror polish (poli noir) on balance bridges and screw heads',
        'Hand-chamfered anglage on all bridges'
      ],
    },
    keyInnovations: [
      {
        title: 'Double Balance Acoustic Resonance',
        year: 2000,
        description: 'Dual balances positioned less than 0.2mm apart, transferring vibrational energy through the shared baseplate to lock into mutual counter-phase synchronization.'
      },
      {
        title: 'Solid 18k Rose Gold Movements',
        year: 2004,
        description: 'First modern manufacturer to machine baseplates, cocks, and bridges entirely from solid 18k rose gold rather than plated brass.'
      },
      {
        title: 'Remontoir d’Égalité Constant Force',
        year: 1999,
        description: 'A secondary hairspring rewound every second to deliver uniform torque to the escapement irrespective of mainspring tension.'
      }
    ],
    curatorialNarrative: 'Operating under the Latin motto Invenit et Fecit ("Invented and Made"), François-Paul Journe designs, regulates, and machines calibers entirely in-house. While Christiaan Huygens observed resonance in pendulums in 1665 and Antide Janvier applied it to clocks, Journe was the first to package acoustic synchronization inside a 40mm wristwatch case.',
    visualDirectives: {
      dialCue: 'Raw silver guilloché twin sub-dials anchored by screwed-down steel sub-dial rings, with Journe signature tapered blued hands.',
      movementCue: 'Warm reflection of solid 18k rose gold plates adorned with circular Côtes de Genève; steel balance bridges polished to a mirror black finish (poli noir).',
      caseCue: 'Slender rounded bezel in cold Platinum 950 with twin knurled winding crowns at 12 and 4 o’clock.'
    },
    uniqueInteractionId: 'resonance'
  },
  {
    id: 'rolex',
    referenceNumber: 'Submariner Ref. 5513 / Oyster 1926',
    commonName: 'The Hermetic Diver Archetype',
    maison: 'Rolex',
    group: 'titans',
    establishedYear: 1905,
    originLocation: 'Geneva / Biel',
    epitaph: 'The Benchmark of Hermeticity, Chronometry, and Utilitarian Pedigree',
    yearIntroduced: 1962,
    historicalSignificance: 'Rolex transformed the wristwatch from an ornamental, fragile jewelry piece into an indestructible, hermetic scientific instrument tested in the English Channel (1927) and the Mariana Trench (1960).',
    culturalImpactScore: 99,
    humanInterventionIndex: 65,
    paletteAccent: '#06231A', // Deep Malachite
    dimensions: {
      caseDiameterMm: 40.0,
      caseThicknessMm: 12.5,
      lugToLugMm: 47.5,
      lugWidthMm: 20.0,
    },
    caseEngineering: {
      material: 'Oystersteel 904L / Cerachrom Ceramic Bezel',
      constructionType: 'Three-Piece',
      waterResistanceAtm: 30, // 300 meters
      magneticResistanceGauss: 1000,
    },
    caliberProfile: {
      designation: 'Caliber 1520 / 3130 Chronometer',
      windingType: 'Automatic Central Rotor',
      frequencyVph: 19800,
      frequencyHz: 2.75,
      jewelCount: 26,
      powerReserveHours: 48,
      escapementType: 'Swiss Lever with Microstella Variable Inertia Nuts',
      balanceSpringType: 'Blue Parachrom Hairspring (Paramagnetic Niobium-Zirconium Oxide)',
      finishingProtocols: [
        'Superlative Chronometer Certification (-2/+2 seconds per day)',
        'Rhodium-plated bridges with circular graining',
        'Sunburst graining on automatic winding ratchet wheel',
        'Laser-welded Breguet overcoil on Parachrom spring'
      ],
    },
    keyInnovations: [
      {
        title: 'Hermetic Screw-Down Oyster Case',
        year: 1926,
        description: 'Patent for threaded fluted bezel and screw-down caseback sealing the movement hermetically against water and dust.'
      },
      {
        title: 'Perpetual Automatic Rotor',
        year: 1931,
        description: 'Patented 360-degree free-winding rotor mechanism that captured wrist motion to continuously wind the mainspring.'
      },
      {
        title: 'Triplock Triple-Gasket Crown System',
        year: 1970,
        description: 'Four O-ring seals creating three distinct hermetic barriers capable of withstanding extreme hydrostatic pressures up to 3,900 meters in Deepsea references.'
      }
    ],
    curatorialNarrative: 'Rolex’s historical significance lies in transforming the wristwatch from an ornamental, fragile piece of jewelry into an indestructible, hermetic navigation instrument. Proven on the wrist of Mercedes Gleitze swimming the English Channel (1927) and strapped to the hull of the Trieste submarine descending 10,916 meters into the Mariana Trench (1960).',
    visualDirectives: {
      dialCue: 'Maxi dial markers filled with Chromalight luminescent compound glowing vibrant cyan blue (480 nm emission wavelength).',
      movementCue: 'High-inertia Microstella balance wheel regulated with 4 gold screws inside the rim, Parachrom hairspring with distinct metallic blue sheen.',
      caseCue: 'Directional brushwork along the lugs of 904L Oystersteel, highlighting the chemical corrosion resistance against saltwater pitting.'
    },
    uniqueInteractionId: 'triplock'
  },
  {
    id: 'longines',
    referenceNumber: 'Lindbergh Hour Angle Watch (1931)',
    commonName: 'The Aerial Navigation Chronometer',
    maison: 'Longines',
    group: 'inceptors',
    establishedYear: 1832,
    originLocation: 'Saint-Imier, Switzerland',
    epitaph: 'Pioneers of Global Aviation, Navigation, and High-Speed Timing',
    yearIntroduced: 1931,
    historicalSignificance: 'Designed in direct collaboration with Col. Charles A. Lindbergh following his 1927 solo transatlantic flight. Revolutionized oceanic air navigation by enabling instantaneous Greenwich Hour Angle longitude calculation.',
    culturalImpactScore: 92,
    humanInterventionIndex: 82,
    paletteAccent: '#0A1128',
    dimensions: {
      caseDiameterMm: 47.5,
      caseThicknessMm: 16.3,
      lugToLugMm: 56.0,
      lugWidthMm: 24.0,
    },
    caseEngineering: {
      material: 'Polished Stainless Steel with Hinged Officer Caseback',
      constructionType: 'Three-Piece',
      waterResistanceAtm: 3,
      magneticResistanceGauss: 60,
    },
    caliberProfile: {
      designation: 'Caliber 18.69N / Caliber 13ZN Flyback',
      windingType: 'Manual',
      frequencyVph: 18000,
      frequencyHz: 2.5,
      jewelCount: 15,
      powerReserveHours: 42,
      escapementType: 'Straight-Line Swiss Lever Escapement',
      balanceSpringType: 'Breguet Steel Overcoil Hairspring',
      finishingProtocols: [
        'High-grade Saint-Imier chronometer regulation',
        'Geneva stripes across mainplates and bridges',
        'Beveled steel chronograph clutch levers',
        'Mirror-polished column wheel teeth'
      ],
    },
    keyInnovations: [
      {
        title: 'Hour Angle Longitude Calculation System',
        year: 1931,
        description: 'Direct conversion of Greenwich Mean Time into arc degrees (15° = 1 hour) and minutes on rotatable inner silver dial, eliminating navigational math.'
      },
      {
        title: 'Caliber 13ZN Flyback Chronograph',
        year: 1936,
        description: 'First serially produced wristwatch chronograph with instantaneous flyback reset, critical for pilots timing consecutive course legs.'
      },
      {
        title: 'Photogentic Photocell Timing',
        year: 1952,
        description: 'Developed automated photocell gates measuring Olympic sprint finishes to the 1/100th of a second.'
      }
    ],
    curatorialNarrative: 'Longines provided the computational navigation backbone for early aviation. Before GPS, aviators flying over open oceans calculated longitude using a sextant and a marine chronometer. The Lindbergh Hour Angle allowed pilots to read arc degrees and minutes directly from the dial and rotatable inner chapter ring, reducing calculation time from minutes to seconds.',
    visualDirectives: {
      dialCue: 'Oversized onion crown engineered for thick flight gloves, white lacquered dial with Breguet-style numerals, blue and black painted degree scales, and rotatable central dial.',
      movementCue: 'Classic large pocket-watch scale movement architecture with open bridges, screw balance, and mirror-finished click spring.',
      caseCue: 'Officer-style hinged dust cover caseback opening to display the mechanical escapement.'
    },
    uniqueInteractionId: 'hour-angle'
  },
  {
    id: 'hublot',
    referenceNumber: 'Big Bang 44mm (2005) / Classic 1980',
    commonName: 'The Art of Material Fusion',
    maison: 'Hublot',
    group: 'architects',
    establishedYear: 1980,
    originLocation: 'Nyon, Lake Geneva',
    epitaph: 'The Art of Fusion — Structural Heterodoxy and Material Alchemy',
    yearIntroduced: 2005,
    historicalSignificance: 'Carlo Crocco paired solid gold with natural rubber in 1980. In 2005, Jean-Claude Biver escalated this into the "Art of Fusion", uniting ceramic, titanium, Kevlar, and tungsten in a 70-component sandwich case.',
    culturalImpactScore: 90,
    humanInterventionIndex: 72,
    paletteAccent: '#B23B23', // Crimson Accent
    dimensions: {
      caseDiameterMm: 44.0,
      caseThicknessMm: 14.5,
      lugToLugMm: 52.0,
      lugWidthMm: 25.0,
    },
    caseEngineering: {
      material: 'Titanium, Black Ceramic, Kevlar Resin & Magic Gold',
      constructionType: 'Sandwich',
      waterResistanceAtm: 10,
      magneticResistanceGauss: 90,
    },
    caliberProfile: {
      designation: 'Caliber HUB4100 / Unico In-House Flyback',
      windingType: 'Automatic Central Rotor',
      frequencyVph: 28800,
      frequencyHz: 4.0,
      jewelCount: 28,
      powerReserveHours: 72,
      escapementType: 'Silicon Swiss Lever Escapement with Dial-Side Column Wheel',
      balanceSpringType: 'Glucydur balance with flat balance spring',
      finishingProtocols: [
        'Openworked skeleton dial exposing horizontal double clutch',
        'Tungsten carbide black PVD rotor with ruthenium treatment',
        'Micro-blasted bridges with sandblasted graphite coating',
        'Dial-side column wheel visible through sapphire crystal'
      ],
    },
    keyInnovations: [
      {
        title: 'Material Fusion: Rubber on Noble Gold',
        year: 1980,
        description: 'First watchmaker to strap an 18k gold case to vanilla-scented vulcanized natural rubber, defying Swiss orthodoxy.'
      },
      {
        title: 'Magic Gold Scratch-Proof Alloy',
        year: 2011,
        description: 'World’s first 18k gold alloy infiltrated with boron carbide ceramic, achieving 1,000 Vickers hardness completely impervious to scratches.'
      },
      {
        title: 'The Multi-Component Sandwich Chassis',
        year: 2005,
        description: 'Over 70 discrete case components mechanically bolted via 6 H-shaped titanium screws through composite lateral inserts.'
      }
    ],
    curatorialNarrative: 'Carlo Crocco shook the Basel Fair in 1980 by daring to attach a simple black rubber strap to a precious gold case—a design choice rejected by the industry that later became the modern luxury-sport standard. Jean-Claude Biver escalated this in 2005 with the "Art of Fusion," constructing cases from upwards of 70 discrete components made of disparate industrial elements.',
    visualDirectives: {
      dialCue: 'Skeletonized dial with carbon-fiber lattice base, stamped indices with red luminescent core, and visible chronograph levers.',
      movementCue: 'Dark anthracite ruthenium-treated baseplates with tungsten oscillating weight and visible silicon escapement fork.',
      caseCue: '6 H-shaped functional titanium bezel screws contrasting against satin-brushed black ceramic bezel and composite resin lateral bumpers.'
    },
    uniqueInteractionId: 'disassembler'
  },
  {
    id: 'credor',
    referenceNumber: 'Credor Eichi II (Caliber 7R14)',
    commonName: 'The Silent Zenith of Japanese Micro-Artistry',
    maison: 'Credor',
    group: 'masters-east',
    establishedYear: 1974,
    originLocation: 'Micro Artist Studio, Shiojiri, Nagano',
    epitaph: 'The Zenith of Japanese Micro-Artistry and Silent Mechanics',
    yearIntroduced: 2014,
    historicalSignificance: 'Manufactured by the elite ten-craftsman Micro Artist Studio in Shiojiri. Unites hand-painted Noritake porcelain with the world’s most refined convex bombé bridge anglage and completely silent Spring Drive motion.',
    culturalImpactScore: 94,
    humanInterventionIndex: 99,
    paletteAccent: '#2E0814', // Coronation Burgundy
    dimensions: {
      caseDiameterMm: 39.0,
      caseThicknessMm: 10.3,
      lugToLugMm: 45.0,
      lugWidthMm: 19.0,
    },
    caseEngineering: {
      material: 'Platinum 950 / Cold Enamel / Pure Noritake Porcelain',
      constructionType: 'Three-Piece',
      waterResistanceAtm: 3,
      magneticResistanceGauss: 4800,
    },
    caliberProfile: {
      designation: 'Caliber 7R14 Spring Drive Manual',
      windingType: 'Spring Drive',
      frequencyVph: 28800, // Equivalent continuous
      frequencyHz: 4.0,
      jewelCount: 41,
      powerReserveHours: 60,
      escapementType: 'Tri-Synchro Regulator with Electromagnetic Glide Wheel Braking',
      balanceSpringType: 'Spron 510 Mainspring with Zero Mechanical Balance Tick',
      finishingProtocols: [
        'Convex rounded mirror anglage beveled with cured alpine gentian wood pegs',
        'Pure nickel-silver (German silver) bridges with hand-brushed circular grain',
        'Blued steel heat-tempered screws and hand-polished countersinks',
        'Caseback power reserve indicator hand-engraved into bridge plate'
      ],
    },
    keyInnovations: [
      {
        title: 'Micro Artist Studio Peg Anglage',
        year: 2008,
        description: 'Finishing bevels using dry stalks of wild gentian wood harvested on the mountains of Nagano, creating distortion-free mirror-rounded edges.'
      },
      {
        title: 'Hand-Painted Noritake Bone China Dial',
        year: 2014,
        description: 'Pure white porcelain dial where each of the 12 baton indices and the Credor logo are painted by a master artisan using a single hair brush.'
      },
      {
        title: 'Silent Spring Drive Tri-Synchro Regulator',
        year: 1999,
        description: 'A quartz crystal and IC brake an unwinding mechanical spring via electro-magnetism, producing 0 dB glide motion with no mechanical clicks.'
      }
    ],
    curatorialNarrative: 'Credor (Créte d’Or - "Crest of Gold") is Japan’s quiet response to Philippe Dufour and Philippe Patek. Produced by the elite Micro Artist Studio in Shiojiri, the Eichi II features a pure white porcelain dial where each hour marker and the Credor logo are painted by a single artisan with a fine hair brush. Its Spring Drive movement glides with uninterrupted continuity, completely devoid of mechanical ticking.',
    visualDirectives: {
      dialCue: 'Diffused soft lighting over translucent white porcelain, capturing the convex depth of wet cobalt blue lacquer on the hand-painted indices.',
      movementCue: 'Ultra-close macro of thick nickel-silver bridges, highlighting the rounded, mirror-polished bevels (bombé) meeting at sharp interior angles.',
      caseCue: 'Mirror-polished cold Platinum 950 case with curved flanks and understated crown engraved with Credor golden crest.'
    },
    uniqueInteractionId: 'fluid-glide'
  },
  {
    id: 'grand-seiko',
    referenceNumber: 'Grand Seiko 44GS (1967) / SBGA211 "Snowflake"',
    commonName: 'The Grammar of Design & Zaratsu Mirror Polish',
    maison: 'Grand Seiko',
    group: 'masters-east',
    establishedYear: 1881,
    originLocation: 'Tokyo / Suwa / Shizukuishi, Japan',
    epitaph: 'The Grammar of Design, High-Beat Escapements, and Quartz Hegemony',
    yearIntroduced: 1967,
    historicalSignificance: 'Taro Tanaka’s 1967 "Grammar of Design" dictated flat, distortion-free mirror surfaces meeting at razor edges to reflect light like cut diamonds. In 1969, Seiko launched the Astron, sparking the global Quartz revolution.',
    culturalImpactScore: 98,
    humanInterventionIndex: 89,
    paletteAccent: '#D4AF37',
    dimensions: {
      caseDiameterMm: 40.0,
      caseThicknessMm: 12.5,
      lugToLugMm: 46.2,
      lugWidthMm: 19.0,
    },
    caseEngineering: {
      material: 'High-Intensity Titanium / Zaratsu Polished 316L',
      constructionType: 'Three-Piece',
      waterResistanceAtm: 10,
      magneticResistanceGauss: 4800,
    },
    caliberProfile: {
      designation: 'Caliber 9R65 Spring Drive / 9S85 Hi-Beat 36,000',
      windingType: 'Spring Drive',
      frequencyVph: 36000,
      frequencyHz: 5.0,
      jewelCount: 37,
      powerReserveHours: 72,
      escapementType: 'Dual-Impulse High-Efficiency Escapement / Tri-Synchro Brake',
      balanceSpringType: 'Spron 610 Magnetic-Resistant Co-Cr Alloy',
      finishingProtocols: [
        'Zaratsu blade-polishing on rotating tin lap disc',
        'Diamond-cut multi-faceted hands and indices catching microscopic light',
        'Tokyo stripes (Geneva wave variant) across mainplate bridges',
        'Perlage and thermal blued glide second hand'
      ],
    },
    keyInnovations: [
      {
        title: 'Zaratsu Blade Polishing',
        year: 1960,
        description: 'Hand-holding case flanks against the flat front of a high-speed rotating tin lap disc to create distortion-free mirror surfaces.'
      },
      {
        title: 'Tanaka’s "Grammar of Design"',
        year: 1967,
        description: 'Nine strict aesthetic rules: every surface flat and uncurved, two-dimensional surfaces meeting at sharp ridges, faceted bezels.'
      },
      {
        title: 'High-Beat 36,000 vph Calibers',
        year: 1968,
        description: 'Caliber 61GS and 45GS oscillating at 10 beats per second to minimize rate perturbation caused by physical impacts.'
      },
      {
        title: 'Seiko Quartz Astron 35SQ',
        year: 1969,
        description: 'World’s first commercial quartz wristwatch, delivering 5 seconds/month accuracy and transforming the global watchmaking landscape.'
      }
    ],
    curatorialNarrative: 'In the 1960s, Seiko entered the Swiss Neuchâtel and Geneva Observatory competitions, systematically out-performing Swiss chronometer manufacturers. In 1967, designer Taro Tanaka established the "Grammar of Design": every surface must be flat, uncurved, and distortion-free so that Grand Seiko timepieces glitter like diamonds from any angle. In 1969, Seiko launched the Astron, democratizing chronometric accuracy across the globe.',
    visualDirectives: {
      dialCue: 'Side-lit macro photography of the "Snowflake" dial, revealing the micro-ridges of dial stamping that evoke wind-carved winter snowfields.',
      movementCue: 'Caliber 9R65 with visible glide wheel rotating silently 8 times per second, bridge cutouts adorned with Tokyo stripes.',
      caseCue: 'Diamond-cut hour and minute hands featuring three-dimensional multi-angled bevels that catch the faintest ray of light in darkened rooms.'
    },
    uniqueInteractionId: 'zaratsu'
  },
  {
    id: 'orient',
    referenceNumber: 'Fineness Ultramatic (1967) / Multi-Year (1976)',
    commonName: 'Accessible Mechanical Miniaturization',
    maison: 'Orient',
    group: 'masters-east',
    establishedYear: 1950,
    originLocation: 'Tokyo, Japan',
    epitaph: 'Accessible Mechanical Sovereignty and Industrial Engineering',
    yearIntroduced: 1967,
    historicalSignificance: 'The Fineness Ultramatic (1967) was the world’s thinnest automatic day-date watch of its era (3.9mm movement). The Multi-Year Calendar (1976) and Caliber 46 series brought reliable automatic movements to over 100 million people worldwide.',
    culturalImpactScore: 88,
    humanInterventionIndex: 68,
    paletteAccent: '#06231A',
    dimensions: {
      caseDiameterMm: 42.0,
      caseThicknessMm: 11.8,
      lugToLugMm: 47.0,
      lugWidthMm: 22.0,
    },
    caseEngineering: {
      material: 'Brushed & Polished Stainless Steel',
      constructionType: 'Three-Piece',
      waterResistanceAtm: 5,
      magneticResistanceGauss: 4800,
    },
    caliberProfile: {
      designation: 'Caliber 46 Series / Caliber F6922',
      windingType: 'Automatic Central Rotor',
      frequencyVph: 21600,
      frequencyHz: 3.0,
      jewelCount: 22,
      powerReserveHours: 40,
      escapementType: 'Swiss Lever with "Magic Lever" Bi-Directional Autowinding',
      balanceSpringType: 'Nivarox Alloy Flat Hairspring',
      finishingProtocols: [
        'Pawl-lever automatic winding mechanism optimized for high shock resistance',
        'Brushed nickel-plated rotor with Orient crest engraving',
        'High-torque day-date stepping wheel for complex planetary calendar disc',
        'Direct balance stud carrier for field regulation'
      ],
    },
    keyInnovations: [
      {
        title: 'Fineness Ultramatic Thin Day-Date',
        year: 1967,
        description: 'World’s thinnest automatic day-date caliber at 3.9mm, miniaturizing planetary gear reduction systems.'
      },
      {
        title: 'Multi-Year Mechanical Calendar Wheel',
        year: 1976,
        description: 'Multi-disc architectural dial calculating year, month, day, and date across four decades via mechanical crown actuation.'
      },
      {
        title: 'Caliber 46 Tractor Architecture',
        year: 1971,
        description: 'Rugged in-house mechanical movement manufactured continuously for over 45 years with over 100 million units produced.'
      }
    ],
    curatorialNarrative: 'While Swiss watchmakers consolidated into luxury conglomerates and Japanese peers pivoted heavily toward quartz, Orient maintained an uninterrupted tradition of in-house mechanical watchmaking for everyday citizens. The Fineness proved that Japanese mechanical miniaturization could beat Swiss ultra-thin records, while the Multi-Year Calendar created an iconic, instantly recognizable dial architecture.',
    visualDirectives: {
      dialCue: 'Complex multi-aperture dial layout with concentric printed text rings, metallic sunburst finish, and dual crown pushers.',
      movementCue: 'Exploded render of the robust Caliber 46 gear train, emphasizing the heavy-duty balance bridge and simplified autowind pawl-lever system.',
      caseCue: 'Cushion-shaped retro steel chassis with integrated crown at 3 and dedicated calendar advancement pusher at 2 o’clock.'
    },
    uniqueInteractionId: 'multi-year'
  },
  {
    id: 'casio',
    referenceNumber: 'G-Shock DW-5000C (1983) / Casiotron (1974)',
    commonName: 'The Indestructible Floating Module',
    maison: 'Casio',
    group: 'titans',
    establishedYear: 1957,
    originLocation: 'Tokyo, Japan',
    epitaph: 'The Indestructible Module and The Democratic Tool Revolution',
    yearIntroduced: 1983,
    historicalSignificance: 'Kikuo Ibe dropped 200 prototypes from third-story windows to create "Triple 10" durability (10m drop, 10 bar water, 10-year battery). Revolutionized tool watch engineering by suspending the electronic module within an elastomer shock cradle.',
    culturalImpactScore: 99,
    humanInterventionIndex: 40,
    paletteAccent: '#D9381E', // Utility Amber / Red
    dimensions: {
      caseDiameterMm: 42.8,
      caseThicknessMm: 13.4,
      lugToLugMm: 48.9,
      lugWidthMm: 16.0,
    },
    caseEngineering: {
      material: 'Hollow Stainless Steel Core & Polyurethane Shock Bezel',
      constructionType: 'Hollow Module',
      waterResistanceAtm: 20, // 200 meters
      magneticResistanceGauss: 4800,
    },
    caliberProfile: {
      designation: 'Module 240 / 3229 Digital Quartz Core',
      windingType: 'Digital Quartz',
      frequencyVph: 32768, // 32,768 Hz quartz resonator
      frequencyHz: 32768,
      jewelCount: 0,
      powerReserveHours: 87600, // 10 years
      escapementType: '32.768 kHz Tuning-Fork Quartz Oscillator with CMOS Divider',
      balanceSpringType: 'Piezoelectric Monocrystalline Synthetic Quartz',
      finishingProtocols: [
        'Hollow elastomer cradle supporting circuit board on 5 point-contact dampeners',
        'Direct laser-welded quartz capsule in sealed vacuum tube',
        'Gold-plated PCB conductive contacts',
        'Diamond-cut stainless steel screw-down caseback with DLC coating'
      ],
    },
    keyInnovations: [
      {
        title: 'Hollow-Case Floating Module',
        year: 1983,
        description: 'Module suspended with minimal rubber contact points inside a hollow urethane case; absorbs kinetic drops of 10+ meters with zero shock transmitted to quartz crystal.'
      },
      {
        title: 'Casiotron Auto-Calendar Digital',
        year: 1974,
        description: 'World’s first digital watch with automated electronic calendar computing leap years and month lengths.'
      },
      {
        title: 'Tough Solar & Multi-Band 6 Atomic Sync',
        year: 2002,
        description: 'Solar micro-cells under LCD paired with radio antenna syncing to atomic clocks across Japan, North America, Europe, and China.'
      }
    ],
    curatorialNarrative: 'In 1981, Casio engineer Kikuo Ibe dropped a mechanical pocket watch gifted by his father, breaking it into pieces. He formed "Project Team Tough" with a single goal: build a watch based on the "Triple 10" criteria (survive a 10-meter drop, endure 10 atmospheres of water pressure, and boast a 10-year battery life). After dropping over 200 prototypes from third-story bathroom windows, Ibe conceived the hollow-structure case inspired by a rubber ball bouncing down the road.',
    visualDirectives: {
      dialCue: 'High-legibility 7-segment digital LCD matrix backlit with vibrant emerald electro-luminescence (EL Backlight) framed by brick pattern dial border.',
      movementCue: 'High-contrast cutaway showing red urethane shock absorbers, stainless steel inner case, and floating circuit board with quartz tuning fork.',
      caseCue: 'Iconic octagonal stepped polyurethane resin bezel with raised protective ridges guarding mineral crystal glass against abrasive face-down drops.'
    },
    uniqueInteractionId: 'drop-test'
  }
];
