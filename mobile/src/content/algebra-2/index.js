export { TOPICS, TOPIC_ICONS, shuffled } from './questions'
export { flashcards, FLASHCARD_TOPIC_LIST } from './flashcards'
export { ACHIEVEMENTS as achievements } from './achievements'
export { UNITS, getLessonQuestions, getByTopic, buildDiagnosticSet, getWritten, getBySkill, writtenLabel, getEasyPool } from './units'
export { STRATEGIES as strategies } from './strategies'

import { TOPICS } from './questions'
import { allQuestions, getByTopic } from './units'

export const questions = allQuestions()

export const TOPIC_ORDER = [
  TOPICS.POLY_OPS,
  TOPICS.POLY_GRAPHS,
  TOPICS.RATIONAL_RADICAL,
  TOPICS.EXPONENTIAL_LOG,
  TOPICS.TRIGONOMETRY,
  TOPICS.PROBLEM_SOLVING,
  TOPICS.STATISTICS,
  TOPICS.COMPLEX_NUMBERS,
  TOPICS.SEQUENCES,
  TOPICS.SYSTEMS_INEQUALITIES,
]

export function getExamContextQuestions(topic) {
  return getByTopic(topic).filter((q) => q.context).sort(() => Math.random() - 0.5)
}
