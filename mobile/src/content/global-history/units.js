import { TOPICS, TOPIC_ICONS } from './questions'
import { makeLessonApi } from '../_shared/lessonEngine'
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

const GH_EXAMS = [
  ghJun2025, ghJan2026, ghAug2024, ghJun2024, ghJan2025, ghJan2024, ghAug2023, ghJun2023,
  ghJan2023, ghJun2022, ghAug2022, ghJun2019,
]

// Questions are tagged with `topic` = the source-analysis skill unit (identity map).
const GH_TOPIC_MAP = {
  [TOPICS.DOCUMENTS]: TOPICS.DOCUMENTS,
  [TOPICS.CAUSATION]: TOPICS.CAUSATION,
  [TOPICS.IMAGES]:    TOPICS.IMAGES,
  [TOPICS.MAPS]:      TOPICS.MAPS,
  [TOPICS.THEMES]:    TOPICS.THEMES,
}

const _api = makeLessonApi({ exams: GH_EXAMS, topicMap: GH_TOPIC_MAP, lessonSize: 20 })

export const UNITS = [
  { id: 'global-history-doc', title: 'Document & Source Analysis', icon: TOPIC_ICONS[TOPICS.DOCUMENTS], color: '#0ea5e9', darkColor: '#0284c7', topic: TOPICS.DOCUMENTS, lessonCount: 4 },
  { id: 'global-history-cau', title: 'Causation & Turning Points', icon: TOPIC_ICONS[TOPICS.CAUSATION], color: '#38bdf8', darkColor: '#0ea5e9', topic: TOPICS.CAUSATION, lessonCount: 3 },
  { id: 'global-history-img', title: 'Images & Political Cartoons', icon: TOPIC_ICONS[TOPICS.IMAGES],    color: '#06b6d4', darkColor: '#0891b2', topic: TOPICS.IMAGES,    lessonCount: 3 },
  { id: 'global-history-map', title: 'Maps & Geography',            icon: TOPIC_ICONS[TOPICS.MAPS],      color: '#14b8a6', darkColor: '#0d9488', topic: TOPICS.MAPS,      lessonCount: 2 },
  { id: 'global-history-thm', title: 'Themes & Review',             icon: TOPIC_ICONS[TOPICS.THEMES],    color: '#10b981', darkColor: '#059669', topic: TOPICS.THEMES,    lessonCount: 3 },
]

export const getLessonQuestions = _api.getLessonQuestions
export const getByTopic         = _api.getByTopic
export const buildDiagnosticSet = _api.buildDiagnosticSet
export const allQuestions       = _api.allQuestions
export const getWritten         = _api.getWritten
export const getBySkill         = _api.getBySkill
export const writtenLabel       = 'Essay Practice'
