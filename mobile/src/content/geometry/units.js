import { TOPICS, TOPIC_ICONS, getByTopic } from './questions'
import geoAug2019 from '../regents-exams/geometry/august-2019'
import geoJun2019 from '../regents-exams/geometry/june-2019'
import geoAug2021 from '../regents-exams/geometry/august-2021'
import geoJun2021 from '../regents-exams/geometry/june-2021'
import geoAug2022 from '../regents-exams/geometry/august-2022'
import geoJun2022 from '../regents-exams/geometry/june-2022'
import geoAug2023 from '../regents-exams/geometry/august-2023'
import geoJun2023 from '../regents-exams/geometry/june-2023'
import geoAug2024 from '../regents-exams/geometry/august-2024'
import geoJun2024 from '../regents-exams/geometry/june-2024'
import geoJun2025 from '../regents-exams/geometry/june-2025'

const GEO_EXAMS = [geoAug2019, geoJun2019, geoAug2021, geoJun2021, geoAug2022, geoJun2022, geoAug2023, geoJun2023, geoAug2024, geoJun2024, geoJun2025]

export const UNITS = [
  { id: 'geometry-u1', title: 'Congruence & Transformations', icon: TOPIC_ICONS[TOPICS.CONGRUENCE],     color: '#10b981', darkColor: '#059669', topic: TOPICS.CONGRUENCE,     lessonCount: 3 },
  { id: 'geometry-u2', title: 'Similarity & Proof',           icon: TOPIC_ICONS[TOPICS.SIMILARITY],     color: '#34d399', darkColor: '#10b981', topic: TOPICS.SIMILARITY,     lessonCount: 3 },
  { id: 'geometry-u3', title: 'Circles',                      icon: TOPIC_ICONS[TOPICS.CIRCLES],        color: '#6ee7b7', darkColor: '#34d399', topic: TOPICS.CIRCLES,        lessonCount: 3 },
  { id: 'geometry-u4', title: 'Coordinate Geometry',          icon: TOPIC_ICONS[TOPICS.COORDINATE_GEO], color: '#059669', darkColor: '#047857', topic: TOPICS.COORDINATE_GEO, lessonCount: 3 },
  { id: 'geometry-u5', title: '3D Geometry & Volume',         icon: TOPIC_ICONS[TOPICS.SOLID_GEOMETRY], color: '#047857', darkColor: '#065f46', topic: TOPICS.SOLID_GEOMETRY, lessonCount: 3 },
  { id: 'geometry-u6', title: 'Trigonometry',                 icon: TOPIC_ICONS[TOPICS.TRIGONOMETRY],   color: '#065f46', darkColor: '#064e3b', topic: TOPICS.TRIGONOMETRY,   lessonCount: 3 },
]

const LESSON_SIZE = 20

function getExamPool(topic) {
  return GEO_EXAMS.flatMap((exam) => (exam.questions ?? []).filter((q) => q.topic === topic))
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
