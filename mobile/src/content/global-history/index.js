import { UNITS as RAW_UNITS, getLessonQuestions } from './units'

export const UNITS = RAW_UNITS.map((u) => ({ ...u, topic: u.id }))
export { getLessonQuestions }

export const questions = []
export function getByTopic() { return [] }
export function getExamContextQuestions() { return [] }
