import { TOPICS } from './questions'

export const flashcards = [
  // Atomic Structure
  { topic: TOPICS.ATOMIC_STRUCTURE, term: 'Proton', definition: 'A subatomic particle located in the nucleus with a charge of +1 and a mass of approximately 1 amu.' },
  { topic: TOPICS.ATOMIC_STRUCTURE, term: 'Electron', definition: 'A subatomic particle orbiting the nucleus with a charge of -1 and negligible mass (1/1836 amu).' },
  { topic: TOPICS.ATOMIC_STRUCTURE, term: 'Neutron', definition: 'A neutral subatomic particle located in the nucleus with a mass of 1 amu.' },
  { topic: TOPICS.ATOMIC_STRUCTURE, term: 'Isotope', definition: 'Atoms of the same element with the same atomic number but different mass numbers due to a different number of neutrons.' },
  { topic: TOPICS.ATOMIC_STRUCTURE, term: 'Excited State', definition: 'A state in which one or more electrons of an atom have absorbed energy and jumped to higher energy levels.' },

  // Periodic Table
  { topic: TOPICS.PERIODIC_TABLE, term: 'Electronegativity', definition: 'A measure of an atom\'s ability to attract electrons in a chemical bond.' },
  { topic: TOPICS.PERIODIC_TABLE, term: 'Ionization Energy', definition: 'The amount of energy required to remove the most loosely bound electron from an atom in the gas phase.' },
  { topic: TOPICS.PERIODIC_TABLE, term: 'Metalloid', definition: 'An element that exhibits both metallic and nonmetallic properties, located along the staircase line on the Periodic Table.' },
  { topic: TOPICS.PERIODIC_TABLE, term: 'Noble Gas', definition: 'An extremely stable, unreactive Group 18 element with a full valence shell (octet).' },
  { topic: TOPICS.PERIODIC_TABLE, term: 'Alkali Metal', definition: 'A highly reactive Group 1 element that forms +1 ions by losing its single valence electron.' },

  // Chemical Bonding
  { topic: TOPICS.CHEMICAL_BONDING, term: 'Ionic Bond', definition: 'A chemical bond formed by the transfer of electrons from a metal to a nonmetal, creating electrostatic attractions.' },
  { topic: TOPICS.CHEMICAL_BONDING, term: 'Covalent Bond', definition: 'A chemical bond formed by the sharing of valence electrons between nonmetal atoms.' },
  { topic: TOPICS.CHEMICAL_BONDING, term: 'Metallic Bond', definition: 'A strong attraction formed by a lattice of metal cations immersed in a mobile "sea of electrons."' },
  { topic: TOPICS.CHEMICAL_BONDING, term: 'Hydrogen Bond', definition: 'A strong intermolecular force between molecules containing hydrogen bonded directly to N, O, or F.' },
  { topic: TOPICS.CHEMICAL_BONDING, term: 'Octet Rule', definition: 'The tendency of atoms to gain, lose, or share electrons to obtain a stable set of 8 valence electrons.' },

  // Classification of Matter
  { topic: TOPICS.CLASSIFICATION, term: 'Element', definition: 'A pure substance made of only one kind of atom that cannot be broken down by physical or chemical means.' },
  { topic: TOPICS.CLASSIFICATION, term: 'Compound', definition: 'A pure substance made of two or more elements chemically combined in a fixed, definite ratio.' },
  { topic: TOPICS.CLASSIFICATION, term: 'Homogeneous Mixture', definition: 'A mixture with uniform composition throughout, such as a solution — components cannot be visually distinguished.' },
  { topic: TOPICS.CLASSIFICATION, term: 'Heterogeneous Mixture', definition: 'A mixture with visibly distinct parts or phases, such as sand in water.' },
  { topic: TOPICS.CLASSIFICATION, term: 'Physical Change', definition: 'A change in a substance\'s form or state (melting, dissolving, cutting) that does not alter its chemical identity.' },

  // Matter & Energy
  { topic: TOPICS.ENERGY_PHASES, term: 'Temperature', definition: 'A measure of the average kinetic energy of the particles in a sample of matter.' },
  { topic: TOPICS.GAS_LAWS, term: 'Ideal Gas', definition: 'A theoretical gas whose molecules have no volume and exert no attractive forces on each other.' },
  { topic: TOPICS.ENERGY_PHASES, term: 'Endothermic', definition: 'A process that absorbs heat energy from its surroundings, resulting in a positive change in enthalpy (+ΔH).' },
  { topic: TOPICS.ENERGY_PHASES, term: 'Exothermic', definition: 'A process that releases heat energy into its surroundings, resulting in a negative change in enthalpy (-ΔH).' },

  // Mole & Stoichiometry
  { topic: TOPICS.MOLE_STOICH, term: 'Mole', definition: 'The SI unit for amount of substance, equal to 6.02 × 10²³ particles (Avogadro\'s number).' },
  { topic: TOPICS.MOLE_STOICH, term: 'Gram-Formula Mass', definition: 'The mass, in grams, of one mole of a substance — found by summing the atomic masses in the formula.' },
  { topic: TOPICS.MOLE_STOICH, term: 'Empirical Formula', definition: 'The simplest whole-number ratio of atoms of each element in a compound.' },
  { topic: TOPICS.MOLE_STOICH, term: 'Percent Composition', definition: 'The percentage by mass that each element contributes to the total gram-formula mass of a compound.' },

  // Balancing & Reaction Types
  { topic: TOPICS.BALANCING_RXN, term: 'Law of Conservation of Mass', definition: 'Matter is neither created nor destroyed in a chemical reaction — atoms of each element must balance on both sides of the equation.' },
  { topic: TOPICS.BALANCING_RXN, term: 'Synthesis Reaction', definition: 'A reaction in which two or more simpler substances combine to form a single, more complex product (A + B → AB).' },
  { topic: TOPICS.BALANCING_RXN, term: 'Single-Replacement Reaction', definition: 'A reaction in which one element replaces another in a compound; use Table J (Activity Series) to predict if it is spontaneous.' },
  { topic: TOPICS.BALANCING_RXN, term: 'Double-Replacement Reaction', definition: 'A reaction in which the positive ions of two compounds swap places, usually forming a precipitate, water, or a gas.' },

  // Kinetics & Equilibrium
  { topic: TOPICS.KINETICS_EQUIL, term: 'Collision Theory', definition: 'Reactant particles must collide with proper orientation and sufficient energy (≥ activation energy) for a reaction to occur.' },
  { topic: TOPICS.KINETICS_EQUIL, term: 'Activation Energy', definition: 'The minimum energy needed for reactant particles to form the activated complex and react.' },
  { topic: TOPICS.KINETICS_EQUIL, term: 'Catalyst', definition: 'A substance that speeds up a reaction by providing an alternate pathway with lower activation energy, without being consumed.' },
  { topic: TOPICS.KINETICS_EQUIL, term: 'Le Chatelier\'s Principle', definition: 'A system at equilibrium shifts to partially counteract any stress (concentration, temperature, or pressure change) applied to it.' },
  { topic: TOPICS.KINETICS_EQUIL, term: 'Dynamic Equilibrium', definition: 'A state where the forward and reverse reaction rates are equal, so the concentrations of reactants and products remain constant.' },

  // Nuclear Chemistry
  { topic: TOPICS.NUCLEAR_CHEM, term: 'Half-Life', definition: 'The time required for half of a radioactive sample to decay; the remaining fraction after n half-lives is (1/2)ⁿ.' },
  { topic: TOPICS.NUCLEAR_CHEM, term: 'Alpha Decay', definition: 'Nuclear decay emitting a helium nucleus (2 protons, 2 neutrons) — decreases the atomic number by 2 and mass number by 4.' },
  { topic: TOPICS.NUCLEAR_CHEM, term: 'Beta Decay', definition: 'Nuclear decay in which a neutron converts to a proton and an electron is emitted, increasing the atomic number by 1.' },
  { topic: TOPICS.NUCLEAR_CHEM, term: 'Fission', definition: 'The splitting of a large, unstable nucleus into smaller nuclei, releasing a large amount of energy.' },

  // Solutions & Concentration
  { topic: TOPICS.SOLUTIONS_CONC, term: 'Molarity', definition: 'A measure of concentration equal to moles of solute divided by liters of solution.' },
  { topic: TOPICS.SOLUTIONS_CONC, term: 'Electrolyte', definition: 'A substance that dissociates into ions in solution, allowing the solution to conduct electricity.' },
  { topic: TOPICS.SOLUTIONS_CONC, term: 'Saturated Solution', definition: 'A solution containing the maximum amount of dissolved solute at a given temperature, as shown on a Table G solubility curve.' },
  { topic: TOPICS.SOLUTIONS_CONC, term: 'Solubility', definition: 'The maximum amount of solute that can dissolve in a given amount of solvent at a specific temperature.' },

  // Acids, Bases & pH
  { topic: TOPICS.ACIDS_BASES_PH, term: 'Arrhenius Acid', definition: 'A substance that produces hydrogen ions (H⁺, as H₃O⁺) when dissolved in water.' },
  { topic: TOPICS.ACIDS_BASES_PH, term: 'Arrhenius Base', definition: 'A substance that produces hydroxide ions (OH⁻) when dissolved in water.' },
  { topic: TOPICS.ACIDS_BASES_PH, term: 'pH Scale', definition: 'A scale measuring [H⁺]; pH < 7 is acidic, pH = 7 is neutral, pH > 7 is basic — each unit change is a 10× change in [H⁺].' },
  { topic: TOPICS.ACIDS_BASES_PH, term: 'Titration', definition: 'A lab procedure that determines the concentration of an unknown acid or base by neutralizing it with a solution of known concentration.' },
  { topic: TOPICS.ACIDS_BASES_PH, term: 'Buffer', definition: 'A solution containing a conjugate acid-base pair that resists changes in pH when small amounts of acid or base are added.' },

  // Redox & Electrochemistry
  { topic: TOPICS.REDOX_ELECTRO, term: 'Oxidation', definition: 'The loss of electrons by a species, resulting in an increase in oxidation number.' },
  { topic: TOPICS.REDOX_ELECTRO, term: 'Reduction', definition: 'The gain of electrons by a species, resulting in a decrease in oxidation number.' },
  { topic: TOPICS.REDOX_ELECTRO, term: 'Voltaic Cell', definition: 'An electrochemical cell that generates electrical energy from a spontaneous redox reaction.' },
  { topic: TOPICS.REDOX_ELECTRO, term: 'Electrolytic Cell', definition: 'An electrochemical cell that uses an external electrical energy source to force a non-spontaneous redox reaction.' },
  { topic: TOPICS.REDOX_ELECTRO, term: 'Anode / Cathode', definition: 'Oxidation always occurs at the anode; reduction always occurs at the cathode — true in both voltaic and electrolytic cells.' },

  // ── Reference Tables & Data (science practices) ──
  { topic: TOPICS.SCIENCE_PRACTICES, term: 'Chemistry Reference Tables', definition: 'Your key tool: Table S (properties), Table F (solubility guidelines), Table G (solubility curves), Table I (heats of reaction), Table J (activity series), Tables K/L/M (acids/bases/indicators), Table T (formulas). Know what each holds.' },
  { topic: TOPICS.SCIENCE_PRACTICES, term: 'Solubility curve (Table G)', definition: 'Grams of solute per 100 g water vs. temperature. On the line = saturated; below = unsaturated; above = supersaturated.' },
  { topic: TOPICS.SCIENCE_PRACTICES, term: 'Heating/cooling curve', definition: 'Temperature vs. heat added. Flat plateaus = phase changes (PE changes, KE constant); slopes = temperature change within one phase.' },
  { topic: TOPICS.SCIENCE_PRACTICES, term: 'Potential energy diagram', definition: 'PE vs. reaction path: activation energy = peak − reactants; ΔH = products − reactants; a catalyst lowers activation energy only.' },
  { topic: TOPICS.SCIENCE_PRACTICES, term: 'Reading a data table', definition: 'Identify variables + units, then the trend, then pick the choice the data actually supports — most answers come straight from the table.' },

  // Organic Chemistry
  { topic: TOPICS.ORGANIC_CHEMISTRY, term: 'Hydrocarbon', definition: 'An organic compound containing only carbon and hydrogen atoms.' },
  { topic: TOPICS.ORGANIC_CHEMISTRY, term: 'Isomer', definition: 'Compounds that share the same molecular formula but have different structural shapes and chemical properties.' },
  { topic: TOPICS.ORGANIC_CHEMISTRY, term: 'Saponification', definition: 'An organic reaction in which a fat and a strong base react to produce soap and glycerol.' },
  { topic: TOPICS.ORGANIC_CHEMISTRY, term: 'Polymerization', definition: 'A chemical reaction in which small monomer units are linked together to form a long chain polymer.' },

  // ── Chemistry Mixed Review ──
  { topic: TOPICS.MIXED_REVIEW, term: 'Significant Figures', definition: 'The digits in a measurement that carry meaning — used to express the precision of a lab measurement or calculated result.' },
  { topic: TOPICS.MIXED_REVIEW, term: 'Independent vs. Dependent Variable', definition: 'The independent variable is what the experimenter changes; the dependent variable is what is measured in response.' }
]

export const FLASHCARD_TOPIC_LIST = Object.values(TOPICS)
