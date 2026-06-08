// Topic constants for Chemistry — kept for flashcards, achievements, and navigation.
// Practice questions removed; lessons are now sourced from the Regents exam bank.
// See units.js (makeLessonApi) and _shared/lessonEngine.js

export const TOPICS = {
  ATOMIC_STRUCTURE:   'Atomic Structure',
  PERIODIC_TABLE:     'Periodic Table',
  CHEMICAL_BONDING:   'Chemical Bonding',
  MATTER_AND_ENERGY:  'Matter & Energy',
  ORGANIC_CHEMISTRY:  'Organic Chemistry',
  REACTIONS_KINETICS: 'Reactions, Kinetics & Stoichiometry',
  NUCLEAR_SOLUTIONS:  'Nuclear Chemistry & Solutions',
  ACIDS_REDOX:        'Acids, Bases & Redox',
}

export const TOPIC_ICONS = {
  [TOPICS.ATOMIC_STRUCTURE]:   '⚛️',
  [TOPICS.PERIODIC_TABLE]:     '📊',
  [TOPICS.CHEMICAL_BONDING]:   '🤝',
  [TOPICS.MATTER_AND_ENERGY]:  '🔥',
  [TOPICS.ORGANIC_CHEMISTRY]:  '🌿',
  [TOPICS.REACTIONS_KINETICS]: '⚗️',
  [TOPICS.NUCLEAR_SOLUTIONS]:  '☢️',
  [TOPICS.ACIDS_REDOX]:        '🧪',
}

export function shuffled(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}
