// Topic constants for Chemistry — kept for flashcards, achievements, and navigation.
// Practice questions removed; lessons are now sourced from the Regents exam bank.
// See units.js (makeLessonApi) and _shared/lessonEngine.js

export const TOPICS = {
  ATOMIC_STRUCTURE:   'Atomic Structure',
  PERIODIC_TABLE:     'Periodic Table',
  CHEMICAL_BONDING:   'Chemical Bonding',
  // MATTER_AND_ENERGY stays for exam-topic mapping, but is no longer a unit —
  // split into the 3 sub-topic units below.
  MATTER_AND_ENERGY:  'Matter & Energy',
  CLASSIFICATION:     'Classification of Matter',
  ENERGY_PHASES:      'Energy & Phase Changes',
  GAS_LAWS:           'Gas Laws',
  ORGANIC_CHEMISTRY:  'Organic Chemistry',
  // REACTIONS_KINETICS/NUCLEAR_SOLUTIONS/ACIDS_REDOX stay for exam-topic
  // mapping, but are no longer units — split into the sub-topic units below.
  REACTIONS_KINETICS: 'Reactions, Kinetics & Stoichiometry',
  MOLE_STOICH:        'Mole & Stoichiometry',
  BALANCING_RXN:      'Balancing & Reaction Types',
  KINETICS_EQUIL:     'Kinetics & Equilibrium',
  NUCLEAR_SOLUTIONS:  'Nuclear Chemistry & Solutions',
  NUCLEAR_CHEM:       'Nuclear Chemistry',
  SOLUTIONS_CONC:     'Solutions & Concentration',
  ACIDS_REDOX:        'Acids, Bases & Redox',
  ACIDS_BASES_PH:     'Acids, Bases & pH',
  REDOX_ELECTRO:      'Redox & Electrochemistry',
  SCIENCE_PRACTICES:  'Reference Tables & Data',
  MIXED_REVIEW:       'Chemistry Mixed Review',
}

export const TOPIC_ICONS = {
  [TOPICS.ATOMIC_STRUCTURE]:   '⚛️',
  [TOPICS.PERIODIC_TABLE]:     '📋',
  [TOPICS.CHEMICAL_BONDING]:   '🤝',
  [TOPICS.MATTER_AND_ENERGY]:  '🔥',
  [TOPICS.CLASSIFICATION]:     '🧊',
  [TOPICS.ENERGY_PHASES]:      '🔥',
  [TOPICS.GAS_LAWS]:           '💨',
  [TOPICS.ORGANIC_CHEMISTRY]:  '🌿',
  [TOPICS.REACTIONS_KINETICS]: '⚗️',
  [TOPICS.MOLE_STOICH]:        '⚖️',
  [TOPICS.BALANCING_RXN]:      '🔄',
  [TOPICS.KINETICS_EQUIL]:     '⏱️',
  [TOPICS.NUCLEAR_SOLUTIONS]:  '☢️',
  [TOPICS.NUCLEAR_CHEM]:       '☢️',
  [TOPICS.SOLUTIONS_CONC]:     '💧',
  [TOPICS.ACIDS_REDOX]:        '🧪',
  [TOPICS.ACIDS_BASES_PH]:     '🧫',
  [TOPICS.REDOX_ELECTRO]:      '🔋',
  [TOPICS.SCIENCE_PRACTICES]:  '📊',
  [TOPICS.MIXED_REVIEW]:       '📚',
}

export function shuffled(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}
