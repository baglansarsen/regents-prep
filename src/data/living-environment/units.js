import { TOPICS, TOPIC_ICONS, getByTopic } from '../questions'

export const UNITS = [
  { id: 'le-u1', title: 'Cell Biology',       icon: TOPIC_ICONS[TOPICS.CELL_BIOLOGY],  color: '#16a34a', darkColor: '#15803d', topic: TOPICS.CELL_BIOLOGY,  lessonCount: 3 },
  { id: 'le-u2', title: 'Genetics',            icon: TOPIC_ICONS[TOPICS.GENETICS],      color: '#7c3aed', darkColor: '#6d28d9', topic: TOPICS.GENETICS,     lessonCount: 3 },
  { id: 'le-u3', title: 'Evolution',           icon: TOPIC_ICONS[TOPICS.EVOLUTION],     color: '#b45309', darkColor: '#92400e', topic: TOPICS.EVOLUTION,    lessonCount: 3 },
  { id: 'le-u4', title: 'Ecology',             icon: TOPIC_ICONS[TOPICS.ECOLOGY],       color: '#0369a1', darkColor: '#075985', topic: TOPICS.ECOLOGY,      lessonCount: 3 },
  { id: 'le-u5', title: 'Human Body',          icon: TOPIC_ICONS[TOPICS.HUMAN_BODY],    color: '#be123c', darkColor: '#9f1239', topic: TOPICS.HUMAN_BODY,   lessonCount: 3 },
  { id: 'le-u6', title: 'Reproduction',        icon: TOPIC_ICONS[TOPICS.REPRODUCTION],  color: '#0f766e', darkColor: '#0d9488', topic: TOPICS.REPRODUCTION, lessonCount: 3 },
]

const LESSON_SIZE = 10

export function getLessonQuestions(topic, lessonIndex, lessonCount) {
  const pool = getByTopic(topic)
  const sorted = [...pool].sort((a, b) => a.id - b.id)

  if (lessonIndex >= lessonCount) {
    return [...pool].sort(() => Math.random() - 0.5)
  }

  const chunkSize = Math.ceil(sorted.length / lessonCount)
  const start = lessonIndex * chunkSize
  const slice = sorted.slice(start, start + chunkSize)
  return slice.slice(0, LESSON_SIZE)
}
