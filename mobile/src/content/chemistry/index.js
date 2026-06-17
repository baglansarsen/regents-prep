export { TOPICS, TOPIC_ICONS, shuffled } from './questions'
export { flashcards, FLASHCARD_TOPIC_LIST } from './flashcards'
export { ACHIEVEMENTS as achievements } from './achievements'
export { UNITS, getLessonQuestions, getByTopic, buildDiagnosticSet, getWritten, getBySkill } from './units'
export { STRATEGIES as strategies } from './strategies'

import { TOPICS } from './questions'
import { allQuestions, getByTopic } from './units'

export const questions = allQuestions()

export const TOPIC_ORDER = [
  TOPICS.ATOMIC_STRUCTURE,
  TOPICS.PERIODIC_TABLE,
  TOPICS.CHEMICAL_BONDING,
  TOPICS.SCIENCE_PRACTICES,
  TOPICS.CLASSIFICATION,
  TOPICS.ENERGY_PHASES,
  TOPICS.GAS_LAWS,
  TOPICS.REACTIONS_KINETICS,
  TOPICS.NUCLEAR_SOLUTIONS,
  TOPICS.ACIDS_REDOX,
  TOPICS.ORGANIC_CHEMISTRY,
  TOPICS.MIXED_REVIEW,
]

export function getExamContextQuestions(topic) {
  return getByTopic(topic).filter((q) => q.context).sort(() => Math.random() - 0.5)
}
