export {
  questions,
  TOPICS,
  TOPIC_ICONS,
  getByTopic,
  getContextual,
  buildDiagnosticSet,
  shuffled,
} from './questions'

export { flashcards, FLASHCARD_TOPIC_LIST } from './flashcards'
export { ACHIEVEMENTS as achievements } from './achievements'
export { UNITS, getLessonQuestions } from './units'
export { STRATEGIES as strategies } from './strategies'

import { TOPICS, questions } from './questions'

export const TOPIC_ORDER = [
  TOPICS.ATOMIC_STRUCTURE,
  TOPICS.PERIODIC_TABLE,
  TOPICS.CHEMICAL_BONDING,
  TOPICS.MATTER_AND_ENERGY,
  TOPICS.ORGANIC_CHEMISTRY,
]

export function getExamContextQuestions(topic) {
  return questions.filter((q) => q.context && q.topic === topic).sort(() => Math.random() - 0.5)
}
