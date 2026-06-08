import { UNITS as RAW_UNITS, getLessonQuestions } from './units'

// Add topic = id so HomeScreen's sd.getLessonQuestions(unit.topic, ...) resolves correctly
export const UNITS = RAW_UNITS.map((u) => ({ ...u, topic: u.id }))
export { getLessonQuestions }

// Stubs — English is exam-only; these features belong to science/math subjects
export const questions = []
export function getByTopic() { return [] }
export function getExamContextQuestions() { return [] }
