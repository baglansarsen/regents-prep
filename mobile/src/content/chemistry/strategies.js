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

  'chemistry-sp': { // Reference Tables & Data (science practices)
    mentalPrep: [
      'The Chemistry Reference Tables answer most questions — know what each holds (S, F, G, I, J, K/L/M, T) so you can find data fast.',
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

  'chemistry-cls': { // Classification of Matter
    mentalPrep: [
      'Sort matter top-down: is it a pure substance (element or compound) or a mixture (homogeneous or heterogeneous)?',
      'Compounds have a fixed, definite composition; mixtures can vary in proportion.'
    ],
    answeringTechniques: [
      'A homogeneous mixture (solution) looks uniform throughout; a heterogeneous mixture has visibly distinct parts or phases.',
      'Physical changes (dissolving, melting, cutting) do not change the identity of the substance; chemical changes (burning, rusting) form a new substance.'
    ],
    guessingStrategy: [
      'If a diagram shows particles of only one kind, it is an element; two or more chemically bonded kinds in fixed ratio is a compound.'
    ],
    processOfElimination: [
      'Eliminate "compound" for anything described as separable by physical means (filtering, evaporating) — that is a mixture trait.'
    ],
    timeManagement: [
      'Classification questions are quick pattern-matches — decide element/compound/mixture first, then answer.'
    ]
  },

  'chemistry-eng': { // Energy & Phase Changes
    mentalPrep: [
      'Use Table T: q = mCΔT for temperature change, q = mHf for melting/freezing, q = mHv for boiling/condensing.',
      'Heating/cooling curve plateaus = phase change (potential energy changes, temperature constant); slanted segments = single phase warming/cooling (kinetic energy changes).'
    ],
    answeringTechniques: [
      'Temperature is a measure of average kinetic energy — it does not change during a phase change even though heat is still flowing.',
      'Exothermic reactions release energy (products lower PE than reactants); endothermic reactions absorb energy (products higher PE).'
    ],
    guessingStrategy: [
      'If a question describes heat flowing while temperature stays constant, it is describing a phase change, not a temperature change.'
    ],
    processOfElimination: [
      'Eliminate any answer that assigns a temperature change to a plateau region of a heating/cooling curve.'
    ],
    timeManagement: [
      'q = mCΔT-style calculations are formulaic — write the formula, plug in Table T values, and solve without second-guessing.'
    ]
  },

  'chemistry-gas': { // Gas Laws
    mentalPrep: [
      'Know the Combined Gas Law (Table T) and that STP is 1 atm / 273 K — most gas problems are unit conversions into this equation.',
      'Kinetic Molecular Theory: ideal gas particles have no volume and no attraction between them — real gases deviate most at high pressure and low temperature.'
    ],
    answeringTechniques: [
      'At constant temperature, pressure and volume are inversely related (Boyle\'s Law); at constant pressure, volume and temperature are directly related (Charles\'s Law).',
      'Always convert Celsius to Kelvin before plugging into a gas law equation.'
    ],
    guessingStrategy: [
      'A gas behaves most ideally at low pressure and high temperature (particles are far apart, so their own size/attraction matters less).'
    ],
    processOfElimination: [
      'Eliminate answers that leave temperature in Celsius in a gas law calculation — that is the most common trap.'
    ],
    timeManagement: [
      'Combined Gas Law problems are plug-and-solve — set up the equation first, then compute.'
    ]
  },

  'chemistry-mole': { // Mole & Stoichiometry
    mentalPrep: [
      'One mole = 6.02 × 10²³ particles (Avogadro\'s number) = gram-formula mass in grams = 22.4 L of gas at STP.',
      'Percent composition and empirical formula problems both start from gram-formula mass — locate it or compute it first.'
    ],
    answeringTechniques: [
      'For mole-ratio (stoichiometry) problems, always start from the coefficients of the balanced equation — they give the mole ratio directly.',
      'Empirical formula = simplest whole-number ratio; molecular formula = empirical formula × a whole-number multiplier found from the given molar mass.'
    ],
    guessingStrategy: [
      'If a question gives grams and asks for moles (or vice versa), divide or multiply by gram-formula mass — no other formula is needed.'
    ],
    processOfElimination: [
      'Eliminate any mole-ratio answer that does not match the coefficients of the balanced equation given.'
    ],
    timeManagement: [
      'Mole conversions are single-step plug-ins — solve them before spending time on multi-step stoichiometry problems.'
    ]
  },

  'chemistry-rxn': { // Balancing & Reaction Types
    mentalPrep: [
      'Balancing conserves atoms, not molecules — count each element on both sides before adjusting coefficients.',
      'The five reaction types: synthesis (A+B→AB), decomposition (AB→A+B), single replacement, double replacement, and combustion.'
    ],
    answeringTechniques: [
      'In a single-replacement reaction, use Table J (Activity Series) to check whether the free element can actually displace the one in the compound.',
      'A double-replacement reaction usually produces a precipitate, water, or a gas — look for a solid, "(s)", or bubbles being formed.'
    ],
    guessingStrategy: [
      'If one reactant is an element and the products include that element combined into a compound, it is synthesis or single-replacement.'
    ],
    processOfElimination: [
      'Eliminate any "spontaneous" single-replacement answer where Table J ranks the replacing metal below the metal being replaced.'
    ],
    timeManagement: [
      'Classify the reaction type first (fast pattern match), then use that to answer the harder follow-up question.'
    ]
  },

  'chemistry-kin': { // Kinetics & Equilibrium
    mentalPrep: [
      'Collision theory: a reaction needs particles to collide with proper orientation AND enough energy (≥ activation energy).',
      'Le Chatelier\'s Principle: a system at equilibrium shifts to partially counteract any stress (concentration, temperature, or pressure change).'
    ],
    answeringTechniques: [
      'On a potential energy diagram, activation energy is measured from reactants (or products, for the reverse reaction) up to the peak — never from the baseline.',
      'A catalyst lowers activation energy and speeds up both the forward and reverse reactions equally — it does not change the heat of reaction.'
    ],
    guessingStrategy: [
      'Increasing temperature, concentration, or surface area (for solids), or adding a catalyst, all increase reaction rate — increasing them shifts an exothermic equilibrium toward the side that absorbs the added energy.'
    ],
    processOfElimination: [
      'Eliminate any answer where a catalyst is said to change the equilibrium position or the products formed — it only changes how fast equilibrium is reached.'
    ],
    timeManagement: [
      'Le Chatelier shift questions are rule-based — identify the stress, apply the counteracting-shift rule, and move on.'
    ]
  },

  'chemistry-nuc': { // Nuclear Chemistry
    mentalPrep: [
      'Use Table N (Selected Radioisotopes) for half-lives and decay modes; alpha loses 2 protons/2 neutrons, beta converts a neutron to a proton (or vice versa for positron).',
      'Half-life problems: the remaining fraction is (1/2)ⁿ where n is the number of half-lives elapsed.'
    ],
    answeringTechniques: [
      'In a nuclear equation, both mass number and atomic number must balance on both sides — use that to solve for an unknown particle.',
      'Alpha particles have the greatest mass and least penetrating power; gamma has no mass/charge and the greatest penetrating power.'
    ],
    guessingStrategy: [
      'Carbon-14 dating and other "age of a once-living organism" questions always point to a radioisotope used for archeological/geological dating (Table N).'
    ],
    processOfElimination: [
      'Eliminate any nuclear equation answer where the sum of mass numbers or atomic numbers does not match on both sides.'
    ],
    timeManagement: [
      'Half-life fraction problems are formulaic — count the number of half-lives elapsed first, then apply (1/2)ⁿ.'
    ]
  },

  'chemistry-sol': { // Solutions & Concentration
    mentalPrep: [
      'Use Table G (solubility curves) for saturation questions and Table F for whether a compound is soluble or insoluble in water.',
      'Molarity (M) = moles of solute / liters of solution — most concentration problems reduce to this one relationship.'
    ],
    answeringTechniques: [
      'Electrolytes are ionic compounds (or acids/bases) that dissociate into ions in solution and conduct electricity; molecular compounds like glucose do not.',
      'Adding solute to a solvent (increasing concentration) raises boiling point and lowers freezing point compared to the pure solvent.'
    ],
    guessingStrategy: [
      'If a solubility-curve point falls above the curve for a given temperature, the solution is supersaturated/has undissolved excess; below the curve, it is unsaturated.'
    ],
    processOfElimination: [
      'Eliminate any "electrolyte" answer that is a purely molecular (covalent) compound — those don\'t ionize in water.'
    ],
    timeManagement: [
      'Table G reads are visual and fast — locate the curve, find the temperature, read off the solubility before doing any math.'
    ]
  },

  'chemistry-ab': { // Acids, Bases & pH
    mentalPrep: [
      'Arrhenius acids produce H⁺ (H₃O⁺) in water; Arrhenius bases produce OH⁻. pH = -log[H⁺]; each whole-number drop in pH means a 10× increase in [H⁺].',
      'Neutralization: acid + base → salt + water; the net ionic equation is always H⁺ + OH⁻ → H₂O.'
    ],
    answeringTechniques: [
      'For titration problems, use MacidVacid = MbaseVbase at the equivalence point (moles of H⁺ = moles of OH⁻).',
      'A buffer resists pH change because it contains a conjugate acid-base pair that can absorb added H⁺ or OH⁻.'
    ],
    guessingStrategy: [
      'A solution with pH < 7 is acidic, pH = 7 is neutral, pH > 7 is basic — sort straight from the pH value before reasoning further.'
    ],
    processOfElimination: [
      'Eliminate any titration answer that doesn\'t balance moles of acid against moles of base (MV = MV).'
    ],
    timeManagement: [
      'pH-to-[H⁺] conversions are a quick exponent read — don\'t recompute the log by hand, just count the places.'
    ]
  },

  'chemistry-redox': { // Redox & Electrochemistry
    mentalPrep: [
      'LEO the lion says GER: Lose Electrons = Oxidation, Gain Electrons = Reduction. Oxidation number increases when a species is oxidized, decreases when reduced.',
      'Voltaic cells generate electricity from a spontaneous redox reaction; electrolytic cells use electrical energy to force a non-spontaneous reaction.'
    ],
    answeringTechniques: [
      'Use Table J (Activity Series) to determine whether a single-replacement / metal-displacement redox reaction occurs spontaneously.',
      'In both cell types, oxidation always occurs at the anode and reduction always occurs at the cathode — only the sign of the electrodes differs between voltaic and electrolytic cells.'
    ],
    guessingStrategy: [
      'If electrons are said to "transfer" between species, or an oxidation number changes, the reaction is redox — otherwise it isn\'t.'
    ],
    processOfElimination: [
      'Eliminate any "spontaneous" answer for a metal reacting with an ion of a metal ranked above it on Table J.'
    ],
    timeManagement: [
      'Oxidation-number questions are quick lookups on the reaction — assign numbers before choosing among the answers.'
    ]
  },

  'chemistry-u9': { // Chemistry Mixed Review
    mentalPrep: [
      'This unit mixes lab/measurement and general-review questions that don\'t fit neatly into one Regents core idea — expect a bit of everything.',
      'Keep the Reference Tables open; most mixed-review items are answered by a quick table lookup rather than a formula.'
    ],
    answeringTechniques: [
      'Read the question stem first to identify which reference table or topic it is really testing, then apply that unit\'s rules.'
    ],
    guessingStrategy: [
      'When in doubt on a measurement/lab question, favor the answer consistent with correct significant-figure and unit conventions.'
    ],
    processOfElimination: [
      'Eliminate any answer that mixes units (e.g., grams with moles) without a conversion step shown.'
    ],
    timeManagement: [
      'These are review items — don\'t overthink; apply the fastest matching rule from earlier units.'
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
