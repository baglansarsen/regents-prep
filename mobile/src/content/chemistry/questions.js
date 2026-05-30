import chemJun2025 from '../regents-exams/chemistry/june-2025'
import chemJun2024 from '../regents-exams/chemistry/june-2024'
import chemAug2024 from '../regents-exams/chemistry/august-2024'
import chemJun2023 from '../regents-exams/chemistry/june-2023'

export const TOPICS = {
  ATOMIC_STRUCTURE: 'Atomic Structure',
  PERIODIC_TABLE: 'Periodic Table',
  CHEMICAL_BONDING: 'Chemical Bonding',
  MATTER_AND_ENERGY: 'Matter & Energy',
  ORGANIC_CHEMISTRY: 'Organic Chemistry',
}

export const TOPIC_ICONS = {
  [TOPICS.ATOMIC_STRUCTURE]: '⚛️',
  [TOPICS.PERIODIC_TABLE]: '📊',
  [TOPICS.CHEMICAL_BONDING]: '🤝',
  [TOPICS.MATTER_AND_ENERGY]: '🔥',
  [TOPICS.ORGANIC_CHEMISTRY]: '🌿',
}

export const questions = [
  // ── Atomic Structure ────────────────────────────────────────────────────────
  {
    id: 101,
    topic: TOPICS.ATOMIC_STRUCTURE,
    text: 'Which subatomic particle has a negative charge and negligible mass?',
    choices: ['Proton', 'Neutron', 'Electron', 'Positron'],
    correct: 2,
    explanation: 'Electrons carry a charge of -1 and have a tiny mass (about 1/1836th of a proton), which is considered negligible.'
  },
  {
    id: 102,
    topic: TOPICS.ATOMIC_STRUCTURE,
    text: 'Rutherford\'s gold foil experiment led to the conclusion that atoms are mostly empty space and contain a',
    choices: ['positively charged, diffuse cloud', 'negatively charged, dense nucleus', 'neutral, massive core', 'positively charged, dense nucleus'],
    correct: 3,
    explanation: 'Rutherford observed that most alpha particles passed straight through the foil, but a few deflected at sharp angles, indicating a small, dense, positively charged nucleus.'
  },
  {
    id: 103,
    topic: TOPICS.ATOMIC_STRUCTURE,
    text: 'An atom of carbon-14 contains how many neutrons?',
    choices: ['6', '8', '14', '12'],
    correct: 1,
    explanation: 'Carbon has an atomic number of 6 (6 protons). Carbon-14 has a mass number of 14. Neutrons = Mass Number - Atomic Number = 14 - 6 = 8.'
  },
  {
    id: 104,
    topic: TOPICS.ATOMIC_STRUCTURE,
    text: 'What represents an electron configuration of a sodium atom in an excited state?',
    choices: ['2-8-1', '2-8-2', '2-7-2', '2-7-1'],
    correct: 2,
    explanation: 'Sodium in the ground state has configuration 2-8-1 (11 electrons). An excited state occurs when an electron jumps to a higher level without changing the total count (e.g., 2-7-2 still has 11 electrons, but one moved from the second shell to the third).'
  },
  {
    id: 105,
    topic: TOPICS.ATOMIC_STRUCTURE,
    text: 'An isotope of an element must have the same number of',
    choices: ['neutrons, but different number of protons', 'protons, but different number of neutrons', 'protons, but different number of electrons', 'electrons, but different number of protons'],
    correct: 1,
    explanation: 'Isotopes are atoms of the same element (same protons/atomic number) with different masses (different numbers of neutrons).'
  },

  // ── Periodic Table ──────────────────────────────────────────────────────────
  {
    id: 106,
    topic: TOPICS.PERIODIC_TABLE,
    text: 'Which group on the Periodic Table contains the alkali metals?',
    choices: ['Group 1', 'Group 2', 'Group 17', 'Group 18'],
    correct: 0,
    explanation: 'Group 1 elements (except Hydrogen) are the highly reactive alkali metals. Group 2 are alkaline earth metals, Group 17 are halogens, and Group 18 are noble gases.'
  },
  {
    id: 107,
    topic: TOPICS.PERIODIC_TABLE,
    text: 'As elements in Group 17 are considered from top to bottom, electronegativity generally',
    choices: ['increases', 'decreases', 'remains the same', 'increases then decreases'],
    correct: 1,
    explanation: 'Electronegativity decreases down a group because the valence shell is further from the nucleus, increasing shielding and decreasing the nucleus\'s pull on bonding electrons.'
  },
  {
    id: 108,
    topic: TOPICS.PERIODIC_TABLE,
    text: 'Which element is classified as a metalloid (semimetal)?',
    choices: ['Silicon (Si)', 'Sodium (Na)', 'Sulfur (S)', 'Copper (Cu)'],
    correct: 0,
    explanation: 'Silicon lies on the staircase boundary line of the periodic table and possesses properties of both metals and nonmetals, classifying it as a metalloid.'
  },
  {
    id: 109,
    topic: TOPICS.PERIODIC_TABLE,
    text: 'Compared to the atomic radius of a neutral sodium atom, the radius of a sodium ion (Na+) is',
    choices: ['larger, because it gained an electron', 'smaller, because it lost an electron', 'the same', 'larger, because it lost a proton'],
    correct: 1,
    explanation: 'Sodium loses its single valence electron to form a Na+ cation, losing its outermost energy level entirely, making the ion significantly smaller than the neutral atom.'
  },
  {
    id: 110,
    topic: TOPICS.PERIODIC_TABLE,
    text: 'Which group contains elements that are chemically unreactive monoatomic gases at STP?',
    choices: ['Group 1', 'Group 16', 'Group 17', 'Group 18'],
    correct: 3,
    explanation: 'Group 18 (Noble Gases) have complete valence shells (stable octets), making them extremely stable and chemically inert under normal conditions.'
  },

  // ── Chemical Bonding ────────────────────────────────────────────────────────
  {
    id: 111,
    topic: TOPICS.CHEMICAL_BONDING,
    text: 'What type of bond is formed when valence electrons are transferred from a metal to a nonmetal?',
    choices: ['Covalent bond', 'Ionic bond', 'Metallic bond', 'Hydrogen bond'],
    correct: 1,
    explanation: 'An ionic bond is characterized by the complete transfer of valence electrons, creating oppositely charged ions that attract electrostatically.'
  },
  {
    id: 112,
    topic: TOPICS.CHEMICAL_BONDING,
    text: 'Which molecule contains a polar covalent bond but is a nonpolar molecule due to its symmetrical shape?',
    choices: ['H2O', 'NH3', 'CO2', 'HCl'],
    correct: 2,
    explanation: 'Carbon dioxide (CO2) has polar C=O bonds, but because the molecule is linear and highly symmetrical, the bond dipoles cancel out, making the overall molecule nonpolar.'
  },
  {
    id: 113,
    topic: TOPICS.CHEMICAL_BONDING,
    text: 'What type of bonding explains the high electrical conductivity of solid copper?',
    choices: ['Ionic bonding', 'Network covalent bonding', 'Metallic bonding', 'Van der Waals forces'],
    correct: 2,
    explanation: 'Metallic bonding consists of a lattice of positive metal ions immersed in a "mobile sea of valence electrons" that can conduct electricity readily.'
  },
  {
    id: 114,
    topic: TOPICS.CHEMICAL_BONDING,
    text: 'Which compound has the strongest hydrogen bonding between its molecules?',
    choices: ['H2O', 'H2S', 'H2Se', 'H2Te'],
    correct: 0,
    explanation: 'Hydrogen bonding is a particularly strong dipole-dipole attraction that occurs when hydrogen is bonded to a highly electronegative atom (N, O, or F). Oxygen is highly electronegative, so water has very strong hydrogen bonding.'
  },
  {
    id: 115,
    topic: TOPICS.CHEMICAL_BONDING,
    text: 'The process of breaking a chemical bond always results in the',
    choices: ['absorption of energy (endothermic)', 'release of energy (exothermic)', 'creation of new mass', 'conservation of temperature'],
    correct: 0,
    explanation: 'Breaking a bond is always an endothermic process—it requires the input/absorption of energy to pull the bonded atoms apart ("BARF": Break Absorb, Release Form).'
  },

  // ── Matter & Energy ─────────────────────────────────────────────────────────
  {
    id: 116,
    topic: TOPICS.MATTER_AND_ENERGY,
    text: 'Which state of matter has a definite volume but takes the shape of its container?',
    choices: ['Solid', 'Liquid', 'Gas', 'Plasma'],
    correct: 1,
    explanation: 'Liquids have a constant volume due to close particle packing, but they flow and take the shape of their container due to weak intermolecular alignment.'
  },
  {
    id: 117,
    topic: TOPICS.MATTER_AND_ENERGY,
    text: 'How much heat is required to raise the temperature of 50.0 grams of water by 10.0°C? (Specific heat capacity of water = 4.18 J/g·°C)',
    choices: ['50.0 J', '418 J', '2090 J', '5000 J'],
    correct: 2,
    explanation: 'Using q = mCΔT: q = (50.0 g) * (4.18 J/g·°C) * (10.0°C) = 2090 Joules.'
  },
  {
    id: 118,
    topic: TOPICS.MATTER_AND_ENERGY,
    text: 'Under which conditions of temperature and pressure does a real gas behave most like an ideal gas?',
    choices: ['High temperature and low pressure', 'Low temperature and high pressure', 'High temperature and high pressure', 'Low temperature and low pressure'],
    correct: 0,
    explanation: 'Gases behave most ideally when their molecules are far apart and moving rapidly, minimizing IMF interactions—which occurs at high temperatures and low pressures.'
  },
  {
    id: 119,
    topic: TOPICS.MATTER_AND_ENERGY,
    text: 'The temperature of a substance is a direct measure of its particles\' average',
    choices: ['potential energy', 'kinetic energy', 'activation energy', 'entropy'],
    correct: 1,
    explanation: 'Temperature is defined as the measure of the average kinetic energy of the particles in a sample.'
  },
  {
    id: 120,
    topic: TOPICS.MATTER_AND_ENERGY,
    text: 'What represents a chemical change?',
    choices: ['Melting of ice', 'Dissolving sugar in water', 'Rusting of an iron nail', 'Crushing a copper can'],
    correct: 2,
    explanation: 'Rusting involves iron reacting with oxygen to form a new substance (iron oxide), which is a chemical change. The others are physical changes of state or form.'
  },

  // ── Organic Chemistry ───────────────────────────────────────────────────────
  {
    id: 121,
    topic: TOPICS.ORGANIC_CHEMISTRY,
    text: 'An organic compound containing a carbon-carbon double bond belongs to which class of hydrocarbons?',
    choices: ['Alkanes', 'Alkenes', 'Alkynes', 'Arenes'],
    correct: 1,
    explanation: 'Alkanes contain only single bonds, alkenes contain at least one double bond, and alkynes contain at least one triple bond.'
  },
  {
    id: 122,
    topic: TOPICS.ORGANIC_CHEMISTRY,
    text: 'What functional group is found in organic acids?',
    choices: ['-OH (hydroxyl)', '-CHO (aldehyde)', '-COOH (carboxyl)', '-O- (ether)'],
    correct: 2,
    explanation: 'Organic acids (carboxylic acids) contain the carboxyl group (-COOH), which releases H+ ions in solution.'
  },
  {
    id: 123,
    topic: TOPICS.ORGANIC_CHEMISTRY,
    text: 'Two organic molecules are isomers of each other if they have the same',
    choices: ['structural formula but different molecular formulas', 'molecular formula but different structural formulas', 'physical properties but different chemical properties', 'functional groups but different molar masses'],
    correct: 1,
    explanation: 'Isomers are compounds that share the exact same molecular formula (same number and type of atoms) but have different structural configurations and properties.'
  },
  {
    id: 124,
    topic: TOPICS.ORGANIC_CHEMISTRY,
    text: 'Which reaction describes the commercial process of making soap from fats and a strong base?',
    choices: ['Saponification', 'Fermentation', 'Polymerization', 'Esterification'],
    correct: 0,
    explanation: 'Saponification is the alkaline hydrolysis of fats/lipids with a base (such as NaOH) to produce soap and glycerol.'
  },
  {
    id: 125,
    topic: TOPICS.ORGANIC_CHEMISTRY,
    text: 'Organic compounds must always contain which element?',
    choices: ['Oxygen', 'Nitrogen', 'Carbon', 'Halogen'],
    correct: 2,
    explanation: 'Organic chemistry is defined as the study of carbon-containing compounds (with a few inorganic exceptions like CO2 and carbonates).'
  }
]

// Dynamically distribute past exam questions into topics
const CHEM_EXAMS = [chemJun2025, chemJun2024, chemAug2024, chemJun2023]
let chemNextId = 200
CHEM_EXAMS.forEach((exam) => {
  if (!exam || !exam.questions) return
  exam.questions.forEach((q) => {
    questions.push({
      id: chemNextId++,
      topic: q.topic, // Maps perfectly to existing 'Atomic Structure', 'Periodic Table', etc.
      text: q.text,
      choices: q.choices,
      correct: q.correct,
      explanation: `From the ${exam.session} ${exam.year} Chemistry Regents Exam. Part ${q.part}, Question ${q.number}.`,
      context: q.context,
      image: q.image,
    })
  })
})

export function getByTopic(topic) {
  return questions.filter(q => q.topic === topic)
}

export function getContextual() {
  return questions.filter(q => q.context)
}

export function buildDiagnosticSet() {
  // Get 3 questions from each topic
  return Object.values(TOPICS).flatMap(topic => {
    const pool = getByTopic(topic)
    return pool.sort(() => Math.random() - 0.5).slice(0, 3)
  })
}

export function shuffled(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}
