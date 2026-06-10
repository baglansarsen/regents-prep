import ghJun2025 from '../regents-exams/global-history/june-2025'
import ghJan2026 from '../regents-exams/global-history/january-2026'
import ghAug2024 from '../regents-exams/global-history/august-2024'
import ghJun2024 from '../regents-exams/global-history/june-2024'
import ghJan2025 from '../regents-exams/global-history/january-2025'
import ghJan2024 from '../regents-exams/global-history/january-2024'
import ghAug2023 from '../regents-exams/global-history/august-2023'
import ghJun2023 from '../regents-exams/global-history/june-2023'
import ghJan2023 from '../regents-exams/global-history/january-2023'
import ghJun2022 from '../regents-exams/global-history/june-2022'
import ghAug2022 from '../regents-exams/global-history/august-2022'
import ghJun2019 from '../regents-exams/global-history/june-2019'

const EXAMS = [
  ghJun2025, ghJan2026, ghAug2024, ghJun2024, ghJan2025, ghJan2024, ghAug2023, ghJun2023,
  ghJan2023, ghJun2022, ghAug2022, ghJun2019,
]

export const UNITS = [
  { id: 'global-history-u1', title: 'Ancient & Classical Civilizations', icon: '🏛️', color: '#0ea5e9', darkColor: '#0284c7', lessonCount: 2 },
  { id: 'global-history-u2', title: 'Medieval & Early Modern Europe', icon: '🏰', color: '#38bdf8', darkColor: '#0ea5e9', lessonCount: 2 },
  { id: 'global-history-u3', title: 'Age of Imperialism & Industry', icon: '🌍', color: '#06b6d4', darkColor: '#0891b2', lessonCount: 2 },
  { id: 'global-history-u4', title: '20th Century Global Conflict', icon: '⚔️', color: '#14b8a6', darkColor: '#0d9488', lessonCount: 2 },
  { id: 'global-history-u5', title: 'Contemporary Global Issues', icon: '🌐', color: '#10b981', darkColor: '#059669', lessonCount: 2 },
]

const LESSON_SIZE = 25

function getExamsByTopic(topicIndex) {
  // Only choice-based questions: the lesson UI can't render written/essay
  // prompts (no choices array), which would trap the user with no way to advance.
  const totalQuestions = EXAMS.flatMap(exam => exam.questions || [])
    .filter(q => Array.isArray(q.choices) && q.choices.length > 0)
  const questionsPerTopic = Math.ceil(totalQuestions.length / 5)
  const startIdx = topicIndex * questionsPerTopic
  const endIdx = startIdx + questionsPerTopic
  return totalQuestions.slice(startIdx, endIdx)
}

export function getLessonQuestions(unitId, lessonIndex, lessonCount) {
  let examPool = []

  if (unitId === 'global-history-u1') {
    examPool = getExamsByTopic(0)
  } else if (unitId === 'global-history-u2') {
    examPool = getExamsByTopic(1)
  } else if (unitId === 'global-history-u3') {
    examPool = getExamsByTopic(2)
  } else if (unitId === 'global-history-u4') {
    examPool = getExamsByTopic(3)
  } else if (unitId === 'global-history-u5') {
    examPool = getExamsByTopic(4)
  }

  if (lessonIndex >= lessonCount) {
    return examPool.sort(() => Math.random() - 0.5)
  }

  const eChunk = Math.ceil(examPool.length / lessonCount)
  const examSlice = examPool.slice(lessonIndex * eChunk, lessonIndex * eChunk + eChunk)

  return examSlice.sort(() => Math.random() - 0.5).slice(0, LESSON_SIZE)
}
