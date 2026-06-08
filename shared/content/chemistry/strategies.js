export const STRATEGIES = {
  'chemistry-u1': { // Atomic Structure
    mentalPrep: [
      'Locate Table S (Properties of Selected Elements) in the Reference Tables to lookup atomic numbers, mass numbers, and electron shells.',
      'Remember: protons + neutrons = mass number, protons = atomic number.',
      'Ground state configurations are shown on the Periodic Table—excited states have the same number of electrons but arranged differently.'
    ],
    answeringTechniques: [
      'For excited state questions, sum the numbers in the configuration to confirm the element (e.g., 2-7-2 adds up to 11, which is Sodium).',
      'For nuclear charge questions, nuclear charge is always equal to the atomic number (number of protons).'
    ],
    guessingStrategy: [
      'Gold foil experiment deflections = dense, positive nucleus; straight paths = empty space.',
      'Isotopes always share the exact same chemical properties because they have the same electron configuration.'
    ],
    processOfElimination: [
      'Eliminate any choices that suggest electrons have significant mass (they are practically weightless compared to nucleons).',
      'Discard choices that claim isotopes have a different number of protons (different protons means a different element).'
    ],
    timeManagement: [
      'Calculating subatomic counts is direct and fast—answer these first.',
      'Don\'t waste time looking up mass numbers for common isotopes when they are already given in hyphenated form (e.g., C-14).'
    ]
  },

  'chemistry-u2': { // Periodic Table
    mentalPrep: [
      'Prepare to use Table S and the Periodic Table constantly for ionic charge, groups, and trends.',
      'Recall Group 1 = alkali metals, Group 2 = alkaline earth, Group 17 = halogens, Group 18 = noble gases.',
      'Recall periodic trends: ionization energy and electronegativity increase UP and RIGHT; atomic radius increases DOWN and LEFT.'
    ],
    answeringTechniques: [
      'When comparing atomic radii or electronegativities, look up their exact values in Table S rather than guessing.',
      'Transition metals (Groups 3-12) form colorful ions/compounds in aqueous solutions.'
    ],
    guessingStrategy: [
      'If an element is described as a gas at STP and highly unreactive, it must be a noble gas (Group 18).',
      'Metal radii shrink when they become ions (lose valence electrons); nonmetals expand (gain valence electrons).'
    ],
    processOfElimination: [
      'Eliminate noble gases if the question asks for reactive elements.',
      'Discard metals if the question describes high electronegativity or low electrical conductivity.'
    ],
    timeManagement: [
      'Reference table lookups take about 15-20 seconds—locate Table S early and keep it open.'
    ]
  },

  'chemistry-u3': { // Chemical Bonding
    mentalPrep: [
      'Remember the acronym BARF: Break Absorb, Release Form (breaking bonds is endothermic, forming bonds is exothermic).',
      'Recall ionic bonds = metal + nonmetal; covalent bonds = nonmetal + nonmetal; metallic = metal + metal.'
    ],
    answeringTechniques: [
      'Symmetric molecules (like CO2, CH4) are nonpolar overall, even if their individual bonds are polar.',
      'Asymmetric molecules (like H2O, NH3) are polar molecules.'
    ],
    guessingStrategy: [
      'Hydrogen bonding occurs specifically in molecules where H is bonded to N, O, or F—look for H2O, NH3, or HF.',
      'Metallic bonds feature a "sea of mobile valence electrons" which enables ductility and conductivity.'
    ],
    processOfElimination: [
      'Eliminate covalent structures if the substance is ionic (e.g. NaCl has a high melting point and conducts when liquid).'
    ],
    timeManagement: [
      'Bond category questions are quick identification tasks—solve them first to save time.'
    ]
  },

  'chemistry-u4': { // Matter & Energy
    mentalPrep: [
      'Locate Table T for thermal and gas formulas: q = mCΔT, q = mHf, q = mHv, and the Combined Gas Law.',
      'Know the difference between phase change heat: Hf is for melting/freezing; Hv is for boiling/condensation.'
    ],
    answeringTechniques: [
      'For heating/cooling curves, flat plateaus represent phase changes (potential energy changes, kinetic energy remains constant).',
      'Slanted lines represent single phases warming up or cooling down (kinetic energy changes, potential energy remains constant).'
    ],
    guessingStrategy: [
      'Ideal gases behave most like real gases under high temperature and low pressure conditions.'
    ],
    processOfElimination: [
      'Eliminate choices that mix kinetic and potential energy adjustments for the same plateau/slope section on a phase graph.'
    ],
    timeManagement: [
      'Calculation questions are highly predictable—write down the formula and plug in variables quickly.'
    ]
  },

  'chemistry-u5': { // Organic Chemistry
    mentalPrep: [
      'Locate Tables P, Q, and R in the Reference Tables immediately—they contain prefix names, hydrocarbon formulas, and organic functional groups.',
      'Organic compounds must always contain Carbon.'
    ],
    answeringTechniques: [
      'Use Table Q to check structural patterns: alkanes (single bonds, C_n H_2n+2), alkenes (double bond, C_n H_2n), alkynes (triple bond, C_n H_2n-2).',
      'Match organic functional groups exactly to the structures shown in Table R.'
    ],
    guessingStrategy: [
      'Isomers have the same chemical count but different shapes—if two structures look different but count up to the same formula, they are isomers.'
    ],
    processOfElimination: [
      'Eliminate any choice that contains elements or structures not matching the functional group represented in the formula.'
    ],
    timeManagement: [
      'Table R matches are visual and rapid—use it to quickly confirm the classification and move forward.'
    ]
  }
}
