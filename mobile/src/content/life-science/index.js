export {
  questions,
  TOPICS,
  TOPIC_ICONS,
  getByTopic,
  buildDiagnosticSet,
  shuffled,
} from './questions'

export { flashcards, FLASHCARD_TOPIC_LIST } from './flashcards'
export { ACHIEVEMENTS as achievements } from './achievements'
export { UNITS, getLessonQuestions } from './units'
export { STRATEGIES as strategies } from './strategies'

import { TOPICS, questions } from './questions'

export const TOPIC_ORDER = [
  TOPICS.CELLS,
  TOPICS.GENETICS,
  TOPICS.EVOLUTION,
  TOPICS.ECOSYSTEMS,
  TOPICS.HUMAN_BODY,
  TOPICS.CLASSIFICATION,
]

export function getExamContextQuestions(topic) {
  return questions.filter((q) => q.context && q.topic === topic).sort(() => Math.random() - 0.5)
}
