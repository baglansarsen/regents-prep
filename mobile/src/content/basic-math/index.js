// Level 0 — Basic Math subject module. Mirrors the index shape of the Regents
// subjects so the existing Home/Quiz screens render it with no new screens.
import { TOPICS } from './questions'
import { allQuestions } from './units'

export { TOPICS, TOPIC_ICONS } from './questions'
export {
  UNITS, getLessonQuestions, getByTopic, getEasyPool, getWritten,
  buildDiagnosticSet, allQuestions, writtenLabel,
} from './units'

// Topic sequence (only authored topics for now).
export const TOPIC_ORDER = [TOPICS.INTEGERS, TOPICS.FRACTIONS]

// Materialized pool (parity with the Regents subject indexes).
export const questions = allQuestions()

// Safe empty defaults for screens that optionally read these on a subject.
export const flashcards = []
export const FLASHCARD_TOPIC_LIST = []
export const strategies = []
export const achievements = []
