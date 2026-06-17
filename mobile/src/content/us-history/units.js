import { TOPICS, TOPIC_ICONS } from './questions'
import { makeLessonApi } from '../_shared/lessonEngine'
import usJun2025 from '../regents-exams/us-history/june-2025'
import usJan2026 from '../regents-exams/us-history/january-2026'
import usAug2025 from '../regents-exams/us-history/august-2025'
import usAug2024 from '../regents-exams/us-history/august-2024'
import usJun2024 from '../regents-exams/us-history/june-2024'
import usJan2025 from '../regents-exams/us-history/january-2025'
import usJan2024 from '../regents-exams/us-history/january-2024'
import usAug2023 from '../regents-exams/us-history/august-2023'
import usJun2023 from '../regents-exams/us-history/june-2023'

const US_EXAMS = [usJun2025, usJan2026, usAug2025, usAug2024, usJun2024, usJan2025, usJan2024, usAug2023, usJun2023]

// Questions are tagged with `topic` = the source-analysis skill unit (identity map).
const US_TOPIC_MAP = {
  [TOPICS.DOCUMENTS]: TOPICS.DOCUMENTS,
  [TOPICS.CAUSATION]: TOPICS.CAUSATION,
  [TOPICS.IMAGES]:    TOPICS.IMAGES,
  [TOPICS.MAPS]:      TOPICS.MAPS,
  [TOPICS.THEMES]:    TOPICS.THEMES,
}

const _api = makeLessonApi({ exams: US_EXAMS, topicMap: US_TOPIC_MAP, lessonSize: 20 })

export const UNITS = [
  { id: 'us-history-doc', title: 'Document & Source Analysis', icon: TOPIC_ICONS[TOPICS.DOCUMENTS], color: '#a855f7', darkColor: '#7e22ce', topic: TOPICS.DOCUMENTS, lessonCount: 3 },
  { id: 'us-history-cau', title: 'Causation & Turning Points', icon: TOPIC_ICONS[TOPICS.CAUSATION], color: '#d946ef', darkColor: '#a855f7', topic: TOPICS.CAUSATION, lessonCount: 3 },
  { id: 'us-history-thm', title: 'Themes & Review',             icon: TOPIC_ICONS[TOPICS.THEMES],    color: '#3b82f6', darkColor: '#1d4ed8', topic: TOPICS.THEMES,    lessonCount: 3 },
  { id: 'us-history-img', title: 'Images & Political Cartoons', icon: TOPIC_ICONS[TOPICS.IMAGES],    color: '#f97316', darkColor: '#d97706', topic: TOPICS.IMAGES,    lessonCount: 2 },
  { id: 'us-history-map', title: 'Maps & Geography',            icon: TOPIC_ICONS[TOPICS.MAPS],      color: '#ca8a04', darkColor: '#a16207', topic: TOPICS.MAPS,      lessonCount: 1 },
]

export const getLessonQuestions = _api.getLessonQuestions
export const getByTopic         = _api.getByTopic
export const buildDiagnosticSet = _api.buildDiagnosticSet
export const allQuestions       = _api.allQuestions
export const getWritten         = _api.getWritten
export const getBySkill         = _api.getBySkill
export const writtenLabel       = 'Essay Practice'
