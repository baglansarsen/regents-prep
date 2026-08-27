import { TOPICS, TOPIC_ICONS } from './questions'
import { makeLessonApi } from '../_shared/lessonEngine'
import esAug2018 from '../regents-exams/earth-science/august-2018'
import esAug2019 from '../regents-exams/earth-science/august-2019'
import esAug2021 from '../regents-exams/earth-science/august-2021'
import esJun2018 from '../regents-exams/earth-science/june-2018'
import esJun2019 from '../regents-exams/earth-science/june-2019'
import esJun2021 from '../regents-exams/earth-science/june-2021'
import esJan2020 from '../regents-exams/earth-science/january-2020'
import esAug2022 from '../regents-exams/earth-science/august-2022'
import esJun2022 from '../regents-exams/earth-science/june-2022'
import esAug2023 from '../regents-exams/earth-science/august-2023'
import esJun2023 from '../regents-exams/earth-science/june-2023'
import esJan2023 from '../regents-exams/earth-science/january-2023'
import esAug2024 from '../regents-exams/earth-science/august-2024'
import esJun2024 from '../regents-exams/earth-science/june-2024'
import esJan2024 from '../regents-exams/earth-science/january-2024'
import esAug2025 from '../regents-exams/earth-science/august-2025'
import esJun2025 from '../regents-exams/earth-science/june-2025'
import esJan2025 from '../regents-exams/earth-science/january-2025'
import esJan2026 from '../regents-exams/earth-science/january-2026'
import esJun2026 from '../regents-exams/earth-science/june-2026'

// Every posted NYSED Earth Science / Earth and Space Sciences exam we have on
// disk. august-2021 has no `topic` tags yet (pre-enrichment) so it currently
// contributes 0 questions to the pool — harmless placeholder until tagged.
export const ES_EXAMS = [
  esAug2018, esJun2018,
  esAug2019, esJun2019,
  esJan2020,
  esAug2021, esJun2021,
  esAug2022, esJun2022,
  esAug2023, esJun2023, esJan2023,
  esAug2024, esJun2024, esJan2024,
  esAug2025, esJun2025, esJan2025,
  esJan2026, esJun2026,
]

// Exported so index.js's Stimulus Practice pool can share this instead of
// keeping a second, driftable copy.
export const ES_TOPIC_MAP = {
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

// Unit metadata added for goal-wiring (Step 4 of the unit-restructure plan):
//   strand     — which NYSSLS/NGSS strand the unit belongs to, for grouping
//                and progress-panel breakdowns ('PRACTICE' for cross-cutting
//                science-practices skills, not a DCI strand).
//   essCodes   — the HS-ESS performance expectations the unit covers, for
//                "why this matters" copy. Approximate/representative, not an
//                official NYSED crosswalk.
//   examWeight — this unit's share of real exam questions across the full
//                20-exam bank, computed by scripts/compute-es-weights.mjs.
//                null for es-sp (an overlapping skill tag counted inside its
//                questions' own topic, not a separate point allocation) and
//                Mixed Review (a catch-all, not a distinct DCI). The other
//                ten sum to 1.0 — re-run the script after any exam import or
//                enrichment pass and paste the new numbers back in here.
//   prereqs    — unit ids that must be completed first. Currently mirrors the
//                array order 1:1 (a simple chain) so unlocking behavior is
//                unchanged; hooks/useUnitUnlocks.js still unlocks positionally
//                today and doesn't read this yet — wiring it up is Step 4f.
export const UNITS = [
  // ── Geology, split ──
  { id: 'es-rocks',   title: 'Rocks & the Rock Cycle',           icon: TOPIC_ICONS[TOPICS.ROCKS],             color: '#92400e', darkColor: '#78350f', topic: TOPICS.ROCKS,             lessonCount: 3, strand: 'ESS2', essCodes: ['HS-ESS2-1'],              examWeight: 0.127, prereqs: [] },
  // ── Science practices early: data/map/reference reading recurs across every unit ──
  { id: 'es-sp',      title: 'Data, Maps & Reference Tables',    icon: TOPIC_ICONS[TOPICS.SCIENCE_PRACTICES], color: '#0891b2', darkColor: '#0e7490', topic: TOPICS.SCIENCE_PRACTICES, lessonCount: 3, skillPool: SP_SKILLS, strand: 'PRACTICE', essCodes: [],              examWeight: null,  prereqs: ['es-rocks'] },
  { id: 'es-surface', title: 'Weathering, Erosion & Deposition', icon: TOPIC_ICONS[TOPICS.SURFACE_PROCESSES], color: '#a16207', darkColor: '#854d0e', topic: TOPICS.SURFACE_PROCESSES, lessonCount: 2, strand: 'ESS2', essCodes: ['HS-ESS2-1', 'HS-ESS2-5'], examWeight: 0.051, prereqs: ['es-sp'] },
  { id: 'es-min',     title: 'Minerals',                         icon: TOPIC_ICONS[TOPICS.MINERALS],          color: '#7c3aed', darkColor: '#6d28d9', topic: TOPICS.MINERALS,          lessonCount: 1, strand: 'ESS2', essCodes: ['HS-ESS2-1'],              examWeight: 0.035, prereqs: ['es-surface'] },
  { id: 'es-u2',      title: 'Plate Tectonics',                  icon: TOPIC_ICONS[TOPICS.PLATE_TECTONICS],   color: '#b45309', darkColor: '#92400e', topic: TOPICS.PLATE_TECTONICS,   lessonCount: 2, strand: 'ESS2', essCodes: ['HS-ESS1-5', 'HS-ESS2-1', 'HS-ESS2-3'], examWeight: 0.085, prereqs: ['es-min'] },
  { id: 'es-u3',      title: 'Geologic Time',                    icon: TOPIC_ICONS[TOPICS.GEOLOGIC_TIME],     color: '#9333ea', darkColor: '#7e22ce', topic: TOPICS.GEOLOGIC_TIME,     lessonCount: 2, strand: 'ESS1', essCodes: ['HS-ESS1-5', 'HS-ESS1-6'], examWeight: 0.056, prereqs: ['es-u2'] },
  { id: 'es-u4',      title: 'Meteorology',                      icon: TOPIC_ICONS[TOPICS.METEOROLOGY],       color: '#0369a1', darkColor: '#075985', topic: TOPICS.METEOROLOGY,       lessonCount: 3, strand: 'ESS2', essCodes: ['HS-ESS2-2', 'HS-ESS2-4'], examWeight: 0.266, prereqs: ['es-u3'] },
  { id: 'es-u5',      title: 'Climate',                          icon: TOPIC_ICONS[TOPICS.CLIMATE],           color: '#0f766e', darkColor: '#0d9488', topic: TOPICS.CLIMATE,           lessonCount: 2, strand: 'ESS2', essCodes: ['HS-ESS2-4', 'HS-ESS3-5'], examWeight: 0.078, prereqs: ['es-u4'] },
  { id: 'es-u7',      title: 'Water Cycle & Oceans',             icon: TOPIC_ICONS[TOPICS.WATER_CYCLE],       color: '#0284c7', darkColor: '#0369a1', topic: TOPICS.WATER_CYCLE,       lessonCount: 2, strand: 'ESS2', essCodes: ['HS-ESS2-5'],              examWeight: 0.108, prereqs: ['es-u5'] },
  // ── Astronomy, split ──
  { id: 'es-solar',   title: 'Solar System & Earth Motions',     icon: TOPIC_ICONS[TOPICS.SOLAR_SYSTEM],      color: '#1d4ed8', darkColor: '#1e40af', topic: TOPICS.SOLAR_SYSTEM,      lessonCount: 3, strand: 'ESS1', essCodes: ['HS-ESS1-4'],              examWeight: 0.125, prereqs: ['es-u7'] },
  { id: 'es-cosmos',  title: 'Moon, Stars & the Universe',       icon: TOPIC_ICONS[TOPICS.COSMOS],            color: '#4f46e5', darkColor: '#4338ca', topic: TOPICS.COSMOS,            lessonCount: 2, strand: 'ESS1', essCodes: ['HS-ESS1-1', 'HS-ESS1-2', 'HS-ESS1-3'], examWeight: 0.069, prereqs: ['es-solar'] },
  { id: 'es-u9',      title: 'Earth and Space Sciences Mixed Review', icon: TOPIC_ICONS[TOPICS.MIXED_REVIEW], color: '#6b7280', darkColor: '#4b5563', topic: TOPICS.MIXED_REVIEW,      lessonCount: 3, strand: 'MIXED', essCodes: [],              examWeight: null,  prereqs: ['es-cosmos'] },
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
