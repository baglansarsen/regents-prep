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
  TOPICS.POLYNOMIAL_FUNCTIONS,
  TOPICS.RATIONAL_RADICAL,
  TOPICS.EXPONENTIAL_LOG,
  TOPICS.TRIGONOMETRY,
  TOPICS.STATISTICS,
  TOPICS.COMPLEX_NUMBERS,
  TOPICS.CALCULATOR,
]

export function getExamContextQuestions(topic) {
  return questions.filter((q) => q.context && q.topic === topic).sort(() => Math.random() - 0.5)
}
