import { TOPICS, TOPIC_ICONS, getByTopic } from './questions'
import a1Aug2019 from '../regents-exams/algebra-1/august-2019'
import a1Jun2019 from '../regents-exams/algebra-1/june-2019'
import a1Aug2021 from '../regents-exams/algebra-1/august-2021'
import a1Jun2021 from '../regents-exams/algebra-1/june-2021'
import a1Aug2022 from '../regents-exams/algebra-1/august-2022'
import a1Jun2022 from '../regents-exams/algebra-1/june-2022'
import a1Aug2023 from '../regents-exams/algebra-1/august-2023'
import a1Jun2023 from '../regents-exams/algebra-1/june-2023'
import a1Aug2024 from '../regents-exams/algebra-1/august-2024'
import a1Jun2024 from '../regents-exams/algebra-1/june-2024'
import a1Jun2025 from '../regents-exams/algebra-1/june-2025'

const A1_EXAMS = [a1Aug2019, a1Jun2019, a1Aug2021, a1Jun2021, a1Aug2022, a1Jun2022, a1Aug2023, a1Jun2023, a1Aug2024, a1Jun2024, a1Jun2025]

export const UNITS = [
  { id: 'algebra-1-u1', title: 'Linear Equations & Inequalities', icon: TOPIC_ICONS[TOPICS.LINEAR_EQUATIONS], color: '#8b5cf6', darkColor: '#6d28d9', topic: TOPICS.LINEAR_EQUATIONS, lessonCount: 3 },
  { id: 'algebra-1-u2', title: 'Functions & Relations',           icon: TOPIC_ICONS[TOPICS.FUNCTIONS],        color: '#7c3aed', darkColor: '#5b21b6', topic: TOPICS.FUNCTIONS,        lessonCount: 3 },
  { id: 'algebra-1-u3', title: 'Systems of Equations',           icon: TOPIC_ICONS[TOPICS.SYSTEMS],          color: '#6d28d9', darkColor: '#4c1d95', topic: TOPICS.SYSTEMS,          lessonCount: 3 },
  { id: 'algebra-1-u4', title: 'Polynomials & Factoring',        icon: TOPIC_ICONS[TOPICS.POLYNOMIALS],      color: '#a855f7', darkColor: '#7e22ce', topic: TOPICS.POLYNOMIALS,      lessonCount: 3 },
  { id: 'algebra-1-u5', title: 'Quadratic Functions',            icon: TOPIC_ICONS[TOPICS.QUADRATICS],       color: '#9333ea', darkColor: '#6b21a8', topic: TOPICS.QUADRATICS,       lessonCount: 3 },
  { id: 'algebra-1-u6', title: 'Statistics & Probability',       icon: TOPIC_ICONS[TOPICS.STATISTICS],       color: '#c084fc', darkColor: '#9333ea', topic: TOPICS.STATISTICS,       lessonCount: 3 },
  { id: 'algebra-1-u7', title: 'Using the Graphing Calculator',  icon: TOPIC_ICONS[TOPICS.CALCULATOR],       color: '#14b8a6', darkColor: '#0f766e', topic: TOPICS.CALCULATOR,       lessonCount: 3 },
]

const LESSON_SIZE = 20

function getExamPool(topic) {
  return A1_EXAMS.flatMap((exam) => (exam.questions ?? []).filter((q) => q.topic === topic && Array.isArray(q.choices) && q.choices.length > 0))
}

export function getLessonQuestions(topic, lessonIndex, lessonCount) {
  const practicePool = getByTopic(topic)
  const examPool     = getExamPool(topic)

  if (lessonIndex >= lessonCount) {
    return [...practicePool, ...examPool].sort(() => Math.random() - 0.5)
  }

  const sorted = [...practicePool].sort((a, b) => a.id - b.id)
  const pChunk = Math.ceil(sorted.length / lessonCount)
  const practiceSlice = sorted.slice(lessonIndex * pChunk, lessonIndex * pChunk + pChunk)

  const eChunk = Math.ceil(examPool.length / lessonCount)
  const examSlice = examPool.slice(lessonIndex * eChunk, lessonIndex * eChunk + eChunk)

  return [...practiceSlice, ...examSlice].sort(() => Math.random() - 0.5).slice(0, LESSON_SIZE)
}
