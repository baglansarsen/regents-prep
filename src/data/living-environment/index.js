export {
  questions,
  TOPICS,
  TOPIC_ICONS,
  LAB_TYPES,
  getByTopic,
  getContextual,
  getLabQuestions,
  buildDiagnosticSet,
  shuffled,
} from '../questions'

export { flashcards, FLASHCARD_TOPIC_LIST } from '../flashcards'
export { ACHIEVEMENTS as achievements } from '../achievements'

import { TOPICS } from '../questions'

export const TOPIC_ORDER = [
  TOPICS.CELL_BIOLOGY,
  TOPICS.GENETICS,
  TOPICS.EVOLUTION,
  TOPICS.ECOLOGY,
  TOPICS.HUMAN_BODY,
  TOPICS.REPRODUCTION,
]
