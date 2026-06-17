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

  // Matter & Energy
  { topic: TOPICS.ENERGY_PHASES, term: 'Temperature', definition: 'A measure of the average kinetic energy of the particles in a sample of matter.' },
  { topic: TOPICS.GAS_LAWS, term: 'Ideal Gas', definition: 'A theoretical gas whose molecules have no volume and exert no attractive forces on each other.' },
  { topic: TOPICS.ENERGY_PHASES, term: 'Endothermic', definition: 'A process that absorbs heat energy from its surroundings, resulting in a positive change in enthalpy (+ΔH).' },
  { topic: TOPICS.ENERGY_PHASES, term: 'Exothermic', definition: 'A process that releases heat energy into its surroundings, resulting in a negative change in enthalpy (-ΔH).' },

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
  { topic: TOPICS.ORGANIC_CHEMISTRY, term: 'Polymerization', definition: 'A chemical reaction in which small monomer units are linked together to form a long chain polymer.' }
]

export const FLASHCARD_TOPIC_LIST = Object.values(TOPICS)
