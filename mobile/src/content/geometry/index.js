export { TOPICS, TOPIC_ICONS, shuffled } from './questions'
export { flashcards, FLASHCARD_TOPIC_LIST } from './flashcards'
export { ACHIEVEMENTS as achievements } from './achievements'
export { UNITS, getLessonQuestions, getByTopic, buildDiagnosticSet, getWritten, getBySkill, writtenLabel, getEasyPool } from './units'
export { STRATEGIES as strategies } from './strategies'

import { TOPICS } from './questions'
import { allQuestions, getByTopic } from './units'

export const questions = allQuestions()

export const TOPIC_ORDER = [
  TOPICS.LINES_ANGLES,
  TOPICS.TRIANGLE_CONG,
  TOPICS.PROOFS_REASONING,
  TOPICS.SIMILARITY_RATIOS,
  TOPICS.TRIANGLE_RELATIONSHIPS,
  TOPICS.CIRCLE_EQUATIONS,
  TOPICS.ARCS_ANGLES,
  TOPICS.CIRCLE_SEGMENTS,
  TOPICS.LINES_SLOPE,
  TOPICS.COORDINATE_PROOFS,
  TOPICS.CROSS_SECTIONS,
  TOPICS.VOLUME_SA,
  TOPICS.DENSITY_MODELING,
  TOPICS.RIGHT_TRIANGLE_TRIG,
  TOPICS.SPECIAL_TRIANGLES,
  TOPICS.QUADRILATERALS,
]

export function getExamContextQuestions(topic) {
  return getByTopic(topic).filter((q) => q.context).sort(() => Math.random() - 0.5)
}
