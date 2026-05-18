export {
  questions,
  TOPICS,
  TOPIC_ICONS,
  LAB_TYPES,
  getByTopic,
  getContextual,
  buildDiagnosticSet,
  shuffled,
} from './questions'

export { flashcards, FLASHCARD_TOPIC_LIST } from './flashcards'
export { ACHIEVEMENTS as achievements } from './achievements'

import { TOPICS } from './questions'

export const TOPIC_ORDER = [
  TOPICS.GEOLOGY,
  TOPICS.PLATE_TECTONICS,
  TOPICS.GEOLOGIC_TIME,
  TOPICS.METEOROLOGY,
  TOPICS.CLIMATE,
  TOPICS.ASTRONOMY,
  TOPICS.WATER_CYCLE,
  TOPICS.MAPS,
]
