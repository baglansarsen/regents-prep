export { TOPICS, TOPIC_ICONS, shuffled } from './questions'
export { flashcards, FLASHCARD_TOPIC_LIST } from './flashcards'
export { ACHIEVEMENTS as achievements } from './achievements'
export { UNITS, getLessonQuestions, getByTopic, buildDiagnosticSet, getWritten, getBySkill, writtenLabel } from './units'
export { STRATEGIES as strategies } from './strategies'

import { TOPICS } from './questions'
import { allQuestions, getByTopic } from './units'

export const questions = allQuestions()

export const TOPIC_ORDER = [
  TOPICS.LINEAR_SOLVING,
  TOPICS.LINEAR_FUNCTIONS,
  TOPICS.FUNCTIONS,
  TOPICS.PROBLEM_SOLVING,
  TOPICS.SYSTEMS,
  TOPICS.POLYNOMIALS,
  TOPICS.QUADRATICS,
  TOPICS.STATISTICS,
  TOPICS.SEQUENCES,
  TOPICS.MIXED_REVIEW,
]

export function getExamContextQuestions(topic) {
  return getByTopic(topic).filter((q) => q.context).sort(() => Math.random() - 0.5)
}
