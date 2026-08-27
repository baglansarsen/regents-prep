import { TOPICS, TOPIC_ICONS } from './questions'
import { makeLessonApi } from '../_shared/lessonEngine'
import esAug2019 from '../regents-exams/earth-science/august-2019'
import esJun2019 from '../regents-exams/earth-science/june-2019'
import esAug2022 from '../regents-exams/earth-science/august-2022'
import esJun2022 from '../regents-exams/earth-science/june-2022'
import esAug2023 from '../regents-exams/earth-science/august-2023'
import esJun2023 from '../regents-exams/earth-science/june-2023'
import esAug2024 from '../regents-exams/earth-science/august-2024'
import esJun2024 from '../regents-exams/earth-science/june-2024'
import esJun2025 from '../regents-exams/earth-science/june-2025'

const ES_EXAMS = [esAug2019, esJun2019, esAug2022, esJun2022, esAug2023, esJun2023, esAug2024, esJun2024, esJun2025]

const ES_TOPIC_MAP = {
  'Geology':             TOPICS.GEOLOGY,        // split into 3 sub-topic units
  'Plate Tectonics':     TOPICS.PLATE_TECTONICS,
  'Geologic Time':       TOPICS.GEOLOGIC_TIME,
  'Meteorology':         TOPICS.METEOROLOGY,
  'Climate':             TOPICS.CLIMATE,
  'Astronomy':           TOPICS.ASTRONOMY,      // split into 2 sub-topic units
  'Water Cycle':         TOPICS.WATER_CYCLE,
  'Oceanography':        TOPICS.WATER_CYCLE,
  'Maps':                TOPICS.MIXED_REVIEW,   // thin (9 Q) — merged; map SKILL feeds Science Practices
  'General':             TOPICS.MIXED_REVIEW,
  'General Review':      TOPICS.MIXED_REVIEW,
  'Earth Science Skills':TOPICS.MIXED_REVIEW,
}

const _api = makeLessonApi({ exams: ES_EXAMS, topicMap: ES_TOPIC_MAP, lessonSize: 20 })

const SUBTOPIC_UNITS = [TOPICS.ROCKS, TOPICS.SURFACE_PROCESSES, TOPICS.MINERALS, TOPICS.SOLAR_SYSTEM, TOPICS.COSMOS]
// Earth and Space Sciences is a data/map/reference-table exam — these skills define it.
const SP_SKILLS = ['data', 'map', 'reference', 'experiment']

export const UNITS = [
  // ── Geology, split ──
  { id: 'es-rocks',   title: 'Rocks & the Rock Cycle',           icon: TOPIC_ICONS[TOPICS.ROCKS],             color: '#92400e', darkColor: '#78350f', topic: TOPICS.ROCKS,             lessonCount: 3 },
  // ── Science practices early: data/map/reference reading recurs across every unit ──
  { id: 'es-sp',      title: 'Data, Maps & Reference Tables',    icon: TOPIC_ICONS[TOPICS.SCIENCE_PRACTICES], color: '#0891b2', darkColor: '#0e7490', topic: TOPICS.SCIENCE_PRACTICES, lessonCount: 3, skillPool: SP_SKILLS },
  { id: 'es-surface', title: 'Weathering, Erosion & Deposition', icon: TOPIC_ICONS[TOPICS.SURFACE_PROCESSES], color: '#a16207', darkColor: '#854d0e', topic: TOPICS.SURFACE_PROCESSES, lessonCount: 2 },
  { id: 'es-min',     title: 'Minerals',                         icon: TOPIC_ICONS[TOPICS.MINERALS],          color: '#7c3aed', darkColor: '#6d28d9', topic: TOPICS.MINERALS,          lessonCount: 1 },
  { id: 'es-u2',      title: 'Plate Tectonics',                  icon: TOPIC_ICONS[TOPICS.PLATE_TECTONICS],   color: '#b45309', darkColor: '#92400e', topic: TOPICS.PLATE_TECTONICS,   lessonCount: 2 },
  { id: 'es-u3',      title: 'Geologic Time',                    icon: TOPIC_ICONS[TOPICS.GEOLOGIC_TIME],     color: '#9333ea', darkColor: '#7e22ce', topic: TOPICS.GEOLOGIC_TIME,     lessonCount: 2 },
  { id: 'es-u4',      title: 'Meteorology',                      icon: TOPIC_ICONS[TOPICS.METEOROLOGY],       color: '#0369a1', darkColor: '#075985', topic: TOPICS.METEOROLOGY,       lessonCount: 3 },
  { id: 'es-u5',      title: 'Climate',                          icon: TOPIC_ICONS[TOPICS.CLIMATE],           color: '#0f766e', darkColor: '#0d9488', topic: TOPICS.CLIMATE,           lessonCount: 2 },
  { id: 'es-u7',      title: 'Water Cycle & Oceans',             icon: TOPIC_ICONS[TOPICS.WATER_CYCLE],       color: '#0284c7', darkColor: '#0369a1', topic: TOPICS.WATER_CYCLE,       lessonCount: 2 },
  // ── Astronomy, split ──
  { id: 'es-solar',   title: 'Solar System & Earth Motions',     icon: TOPIC_ICONS[TOPICS.SOLAR_SYSTEM],      color: '#1d4ed8', darkColor: '#1e40af', topic: TOPICS.SOLAR_SYSTEM,      lessonCount: 3 },
  { id: 'es-cosmos',  title: 'Moon, Stars & the Universe',       icon: TOPIC_ICONS[TOPICS.COSMOS],            color: '#4f46e5', darkColor: '#4338ca', topic: TOPICS.COSMOS,            lessonCount: 2 },
  { id: 'es-u9',      title: 'Earth and Space Sciences Mixed Review', icon: TOPIC_ICONS[TOPICS.MIXED_REVIEW], color: '#6b7280', darkColor: '#4b5563', topic: TOPICS.MIXED_REVIEW,      lessonCount: 3 },
]

// Route each unit to its pool: sub-topic split, skill pool, or whole topic.
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
