import { TOPICS, TOPIC_ICONS, getByTopic } from '../questions'
import leAug2019 from '../regents-exams/living-environment/august-2019'
import leJun2019 from '../regents-exams/living-environment/june-2019'
import leAug2021 from '../regents-exams/living-environment/august-2021'
import leJun2021 from '../regents-exams/living-environment/june-2021'
import leAug2022 from '../regents-exams/living-environment/august-2022'
import leJun2022 from '../regents-exams/living-environment/june-2022'
import leAug2023 from '../regents-exams/living-environment/august-2023'
import leJun2023 from '../regents-exams/living-environment/june-2023'
import leAug2024 from '../regents-exams/living-environment/august-2024'
import leJun2024 from '../regents-exams/living-environment/june-2024'
import leJun2025 from '../regents-exams/living-environment/june-2025'

const LE_EXAMS = [leAug2019, leJun2019, leAug2021, leJun2021, leAug2022, leJun2022, leAug2023, leJun2023, leAug2024, leJun2024, leJun2025]

const LE_TOPIC_MAP = {
  'Cell Biology':  TOPICS.CELL_BIOLOGY,
  'Genetics':      TOPICS.GENETICS,
  'Evolution':     TOPICS.EVOLUTION,
  'Ecology':       TOPICS.ECOLOGY,
  'Human Body':    TOPICS.HUMAN_BODY,
  'Reproduction':  TOPICS.REPRODUCTION,
}

export const UNITS = [
  { id: 'le-u1', title: 'Cell Biology',       icon: TOPIC_ICONS[TOPICS.CELL_BIOLOGY],  color: '#16a34a', darkColor: '#15803d', topic: TOPICS.CELL_BIOLOGY,  lessonCount: 3 },
  { id: 'le-u2', title: 'Genetics',            icon: TOPIC_ICONS[TOPICS.GENETICS],      color: '#7c3aed', darkColor: '#6d28d9', topic: TOPICS.GENETICS,     lessonCount: 3 },
  { id: 'le-u3', title: 'Evolution',           icon: TOPIC_ICONS[TOPICS.EVOLUTION],     color: '#b45309', darkColor: '#92400e', topic: TOPICS.EVOLUTION,    lessonCount: 3 },
  { id: 'le-u4', title: 'Ecology',             icon: TOPIC_ICONS[TOPICS.ECOLOGY],       color: '#0369a1', darkColor: '#075985', topic: TOPICS.ECOLOGY,      lessonCount: 3 },
  { id: 'le-u5', title: 'Human Body',          icon: TOPIC_ICONS[TOPICS.HUMAN_BODY],    color: '#be123c', darkColor: '#9f1239', topic: TOPICS.HUMAN_BODY,   lessonCount: 3 },
  { id: 'le-u6', title: 'Reproduction',        icon: TOPIC_ICONS[TOPICS.REPRODUCTION],  color: '#0f766e', darkColor: '#0d9488', topic: TOPICS.REPRODUCTION, lessonCount: 3 },
]

const LESSON_SIZE = 20

function getExamPool(topic) {
  return LE_EXAMS.flatMap((exam) =>
    (exam.questions ?? []).filter((q) => LE_TOPIC_MAP[q.topic] === topic && Array.isArray(q.choices) && q.choices.length > 0 && q.choices.every((c) => String(c ?? '').trim() !== ''))
  )
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
