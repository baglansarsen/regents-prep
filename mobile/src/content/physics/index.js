export { TOPICS, TOPIC_ICONS, shuffled } from './questions'
export { flashcards, FLASHCARD_TOPIC_LIST } from './flashcards'
export { ACHIEVEMENTS as achievements } from './achievements'
export { UNITS, getLessonQuestions, getByTopic, buildDiagnosticSet, getWritten, getBySkill } from './units'
export { STRATEGIES as strategies } from './strategies'

import { TOPICS } from './questions'
import { allQuestions, getByTopic } from './units'

export const questions = allQuestions()

export const TOPIC_ORDER = [
  TOPICS.KINEMATICS,
  TOPICS.FORCES,
  TOPICS.ENERGY_AND_POWER,
  TOPICS.SCIENCE_PRACTICES,
  TOPICS.CIRCUITS,
  TOPICS.ELECTROSTATICS,
  TOPICS.WAVES_SOUND,
  TOPICS.LIGHT_OPTICS,
  TOPICS.MODERN_PHYSICS,
  TOPICS.MIXED_REVIEW,
]

export function getExamContextQuestions(topic) {
  return getByTopic(topic).filter((q) => q.context).sort(() => Math.random() - 0.5)
}
