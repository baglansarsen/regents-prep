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
  TOPICS.CONGRUENCE,
  TOPICS.SIMILARITY,
  TOPICS.CIRCLES,
  TOPICS.COORDINATE_GEO,
  TOPICS.SOLID_GEOMETRY,
  TOPICS.TRIGONOMETRY,
]

export function getExamContextQuestions(topic) {
  return questions.filter((q) => q.context && q.topic === topic).sort(() => Math.random() - 0.5)
}
