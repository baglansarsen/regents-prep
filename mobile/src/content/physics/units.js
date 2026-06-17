import { TOPICS, TOPIC_ICONS } from './questions'
import { makeLessonApi } from '../_shared/lessonEngine'
import physJun2016 from '../regents-exams/physics/june-2016'
import physJun2017 from '../regents-exams/physics/june-2017'
import physJun2018 from '../regents-exams/physics/june-2018'
import physJun2019 from '../regents-exams/physics/june-2019'
import physJun2022 from '../regents-exams/physics/june-2022'
import physJun2023 from '../regents-exams/physics/june-2023'
import physJun2024 from '../regents-exams/physics/june-2024'
import physJun2025 from '../regents-exams/physics/june-2025'

// Expanded from 3 → 8 exams (2016–2025) to match the other sciences' pool depth
// (~540 questions) and fill the new sub-topic units.
const PHYS_EXAMS = [physJun2016, physJun2017, physJun2018, physJun2019, physJun2022, physJun2023, physJun2024, physJun2025]

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
  'Measurement & Math':    TOPICS.MIXED_REVIEW,
  'Measurement':           TOPICS.MIXED_REVIEW,
  'General':               TOPICS.MIXED_REVIEW,
  'General Review':        TOPICS.MIXED_REVIEW,
}

const _api = makeLessonApi({ exams: PHYS_EXAMS, topicMap: PHYS_TOPIC_MAP, lessonSize: 20 })

const SUBTOPIC_UNITS = [
  TOPICS.KINEMATICS, TOPICS.FORCES, TOPICS.CIRCUITS, TOPICS.ELECTROSTATICS, TOPICS.WAVES_SOUND, TOPICS.LIGHT_OPTICS,
]
// Physics is formula/graph/diagram-driven (Reference Table, motion graphs,
// free-body/ray/circuit diagrams) — these skills define the exam.
const SP_SKILLS = ['data', 'model', 'reference', 'experiment']

export const UNITS = [
  // ── Mechanics, split ──
  { id: 'physics-kin',  title: 'Kinematics & Projectile Motion',   icon: TOPIC_ICONS[TOPICS.KINEMATICS],     color: '#f59e0b', darkColor: '#d97706', topic: TOPICS.KINEMATICS,        lessonCount: 3 },
  { id: 'physics-frc',  title: 'Forces, Gravity & Momentum',       icon: TOPIC_ICONS[TOPICS.FORCES],         color: '#ea580c', darkColor: '#c2410c', topic: TOPICS.FORCES,           lessonCount: 3 },
  { id: 'physics-u2',   title: 'Energy, Work & Power',             icon: TOPIC_ICONS[TOPICS.ENERGY_AND_POWER], color: '#fb8c00', darkColor: '#e65100', topic: TOPICS.ENERGY_AND_POWER, lessonCount: 3 },
  // Science practices early: motion graphs / formulas / diagrams recur throughout.
  { id: 'physics-sp',   title: 'Formulas, Graphs & Diagrams',      icon: TOPIC_ICONS[TOPICS.SCIENCE_PRACTICES], color: '#0891b2', darkColor: '#0e7490', topic: TOPICS.SCIENCE_PRACTICES, lessonCount: 3, skillPool: SP_SKILLS },
  // ── Electricity & Magnetism, split ──
  { id: 'physics-cir',  title: 'Circuits',                         icon: TOPIC_ICONS[TOPICS.CIRCUITS],       color: '#d97706', darkColor: '#b45309', topic: TOPICS.CIRCUITS,         lessonCount: 3 },
  { id: 'physics-est',  title: 'Electrostatics, Fields & Magnetism', icon: TOPIC_ICONS[TOPICS.ELECTROSTATICS], color: '#7c3aed', darkColor: '#6d28d9', topic: TOPICS.ELECTROSTATICS,   lessonCount: 2 },
  // ── Waves & Optics, split ──
  { id: 'physics-wav',  title: 'Waves & Sound',                    icon: TOPIC_ICONS[TOPICS.WAVES_SOUND],    color: '#0284c7', darkColor: '#0369a1', topic: TOPICS.WAVES_SOUND,      lessonCount: 3 },
  { id: 'physics-opt',  title: 'Light & Optics',                   icon: TOPIC_ICONS[TOPICS.LIGHT_OPTICS],   color: '#0ea5e9', darkColor: '#0284c7', topic: TOPICS.LIGHT_OPTICS,     lessonCount: 2 },
  { id: 'physics-u5',   title: 'Modern Physics',                   icon: TOPIC_ICONS[TOPICS.MODERN_PHYSICS], color: '#9333ea', darkColor: '#7e22ce', topic: TOPICS.MODERN_PHYSICS,   lessonCount: 2 },
  { id: 'physics-u9',   title: 'Physics Mixed Review',             icon: TOPIC_ICONS[TOPICS.MIXED_REVIEW],   color: '#6b7280', darkColor: '#4b5563', topic: TOPICS.MIXED_REVIEW,     lessonCount: 1 },
]

export function getLessonQuestions(topic, lessonIndex, lessonCount) {
  if (topic === TOPICS.SCIENCE_PRACTICES) return _api.getSkillLessonQuestions(SP_SKILLS, lessonIndex, lessonCount)
  if (SUBTOPIC_UNITS.includes(topic))     return _api.getSubTopicLessonQuestions(topic, lessonIndex, lessonCount)
  return _api.getLessonQuestions(topic, lessonIndex, lessonCount)
}
export function getByTopic(topic) {
  if (topic === TOPICS.SCIENCE_PRACTICES) return SP_SKILLS.flatMap((sk) => _api.getBySkill(sk))
  if (SUBTOPIC_UNITS.includes(topic))     return _api.getBySubTopic(topic)
  return _api.getByTopic(topic)
}
export const buildDiagnosticSet = _api.buildDiagnosticSet
export const allQuestions       = _api.allQuestions
export const getWritten         = _api.getWritten
export const getBySkill         = _api.getBySkill
