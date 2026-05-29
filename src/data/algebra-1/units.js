import { TOPICS, TOPIC_ICONS, getByTopic } from './questions'

export const UNITS = [
  { id: 'algebra-1-u1', title: 'Linear Equations & Inequalities', icon: TOPIC_ICONS[TOPICS.LINEAR_EQUATIONS], color: '#8b5cf6', darkColor: '#6d28d9', topic: TOPICS.LINEAR_EQUATIONS, lessonCount: 3 },
  { id: 'algebra-1-u2', title: 'Functions & Relations',           icon: TOPIC_ICONS[TOPICS.FUNCTIONS],        color: '#7c3aed', darkColor: '#5b21b6', topic: TOPICS.FUNCTIONS,        lessonCount: 3 },
  { id: 'algebra-1-u3', title: 'Systems of Equations',           icon: TOPIC_ICONS[TOPICS.SYSTEMS],          color: '#6d28d9', darkColor: '#4c1d95', topic: TOPICS.SYSTEMS,          lessonCount: 3 },
  { id: 'algebra-1-u4', title: 'Polynomials & Factoring',        icon: TOPIC_ICONS[TOPICS.POLYNOMIALS],      color: '#a855f7', darkColor: '#7e22ce', topic: TOPICS.POLYNOMIALS,      lessonCount: 3 },
  { id: 'algebra-1-u5', title: 'Quadratic Functions',            icon: TOPIC_ICONS[TOPICS.QUADRATICS],       color: '#9333ea', darkColor: '#6b21a8', topic: TOPICS.QUADRATICS,       lessonCount: 3 },
  { id: 'algebra-1-u6', title: 'Statistics & Probability',       icon: TOPIC_ICONS[TOPICS.STATISTICS],       color: '#c084fc', darkColor: '#9333ea', topic: TOPICS.STATISTICS,       lessonCount: 3 },
]

const LESSON_SIZE = 10

export function getLessonQuestions(topic, lessonIndex, lessonCount) {
  const pool = getByTopic(topic)
  const sorted = [...pool].sort((a, b) => a.id - b.id)
  if (lessonIndex >= lessonCount) return [...pool].sort(() => Math.random() - 0.5)
  const chunkSize = Math.ceil(sorted.length / lessonCount)
  const start = lessonIndex * chunkSize
  return sorted.slice(start, start + chunkSize).slice(0, LESSON_SIZE)
}
