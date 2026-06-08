import { TOPICS, TOPIC_ICONS, getByTopic } from './questions'

export const UNITS = [
  { id: 'life-science-u1', title: 'Cells & Cell Processes',        icon: TOPIC_ICONS[TOPICS.CELLS],          color: '#059669', darkColor: '#047857', topic: TOPICS.CELLS,          lessonCount: 3 },
  { id: 'life-science-u2', title: 'Genetics & Heredity',           icon: TOPIC_ICONS[TOPICS.GENETICS],       color: '#7c3aed', darkColor: '#6d28d9', topic: TOPICS.GENETICS,       lessonCount: 3 },
  { id: 'life-science-u3', title: 'Evolution & Natural Selection', icon: TOPIC_ICONS[TOPICS.EVOLUTION],      color: '#b45309', darkColor: '#92400e', topic: TOPICS.EVOLUTION,      lessonCount: 3 },
  { id: 'life-science-u4', title: 'Ecosystems & Ecology',          icon: TOPIC_ICONS[TOPICS.ECOSYSTEMS],     color: '#16a34a', darkColor: '#15803d', topic: TOPICS.ECOSYSTEMS,     lessonCount: 3 },
  { id: 'life-science-u5', title: 'Human Body Systems',            icon: TOPIC_ICONS[TOPICS.HUMAN_BODY],     color: '#dc2626', darkColor: '#b91c1c', topic: TOPICS.HUMAN_BODY,     lessonCount: 3 },
  { id: 'life-science-u6', title: 'Classification of Life',        icon: TOPIC_ICONS[TOPICS.CLASSIFICATION], color: '#0891b2', darkColor: '#0e7490', topic: TOPICS.CLASSIFICATION, lessonCount: 3 },
]

const LESSON_SIZE = 15

export function getLessonQuestions(topic, lessonIndex, lessonCount) {
  const pool = getByTopic(topic)

  if (lessonIndex >= lessonCount) {
    return [...pool].sort(() => Math.random() - 0.5)
  }

  const sorted = [...pool].sort((a, b) => a.id - b.id)
  const chunkSize = Math.ceil(sorted.length / lessonCount)
  const slice = sorted.slice(lessonIndex * chunkSize, lessonIndex * chunkSize + chunkSize)

  return [...slice].sort(() => Math.random() - 0.5).slice(0, LESSON_SIZE)
}
