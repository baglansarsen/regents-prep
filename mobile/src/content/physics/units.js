import { TOPICS, TOPIC_ICONS } from './questions'
import { makeLessonApi } from '../_shared/lessonEngine'
import physJun2023 from '../regents-exams/physics/june-2023'
import physJun2024 from '../regents-exams/physics/june-2024'
import physJun2025 from '../regents-exams/physics/june-2025'

const PHYS_EXAMS = [physJun2023, physJun2024, physJun2025]

const PHYS_TOPIC_MAP = {
  'Kinematics':            TOPICS.MECHANICS,
  'Forces & Newton':       TOPICS.MECHANICS,
  'Mechanics':             TOPICS.MECHANICS,
  'Gravity & Fields':      TOPICS.MECHANICS,
  'Energy & Work':         TOPICS.ENERGY_AND_POWER,
  'Energy & Power':        TOPICS.ENERGY_AND_POWER,
  'Electricity':           TOPICS.ELECTRICITY_AND_MAGNETISM,
  'Electricity & Magnetism': TOPICS.ELECTRICITY_AND_MAGNETISM,
  'Magnetism':             TOPICS.ELECTRICITY_AND_MAGNETISM,
  'Waves & Sound':         TOPICS.WAVES,
  'Waves & Light':         TOPICS.WAVES,
  'Light & Optics':        TOPICS.WAVES,
  'Modern Physics':        TOPICS.MODERN_PHYSICS,
}

const _api = makeLessonApi({ exams: PHYS_EXAMS, topicMap: PHYS_TOPIC_MAP, lessonSize: 20 })

export const UNITS = [
  { id: 'physics-u1', title: 'Mechanics & Motion',      icon: TOPIC_ICONS[TOPICS.MECHANICS],                 color: '#f59e0b', darkColor: '#d97706', topic: TOPICS.MECHANICS,                 lessonCount: 3 },
  { id: 'physics-u2', title: 'Energy, Work & Power',    icon: TOPIC_ICONS[TOPICS.ENERGY_AND_POWER],          color: '#fb8c00', darkColor: '#e65100', topic: TOPICS.ENERGY_AND_POWER,          lessonCount: 3 },
  { id: 'physics-u3', title: 'Electricity & Magnetism', icon: TOPIC_ICONS[TOPICS.ELECTRICITY_AND_MAGNETISM], color: '#f59e0b', darkColor: '#d97706', topic: TOPICS.ELECTRICITY_AND_MAGNETISM, lessonCount: 3 },
  { id: 'physics-u4', title: 'Waves & Optics',          icon: TOPIC_ICONS[TOPICS.WAVES],                     color: '#fb8c00', darkColor: '#e65100', topic: TOPICS.WAVES,                     lessonCount: 3 },
  { id: 'physics-u5', title: 'Modern Physics',          icon: TOPIC_ICONS[TOPICS.MODERN_PHYSICS],            color: '#f59e0b', darkColor: '#d97706', topic: TOPICS.MODERN_PHYSICS,            lessonCount: 3 },
]

export const getLessonQuestions = _api.getLessonQuestions
export const getByTopic         = _api.getByTopic
export const buildDiagnosticSet = _api.buildDiagnosticSet
export const allQuestions       = _api.allQuestions
