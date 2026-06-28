import { TOPICS, TOPIC_ICONS } from './questions'
import { makeLessonApi } from '../_shared/lessonEngine'
import { isEasy } from '../_shared/difficulty'
import geoAug2019 from '../regents-exams/geometry/august-2019'
import geoJun2019 from '../regents-exams/geometry/june-2019'
import geoAug2022 from '../regents-exams/geometry/august-2022'
import geoJun2022 from '../regents-exams/geometry/june-2022'
import geoAug2023 from '../regents-exams/geometry/august-2023'
import geoJun2023 from '../regents-exams/geometry/june-2023'
import geoAug2024 from '../regents-exams/geometry/august-2024'
import geoJun2024 from '../regents-exams/geometry/june-2024'
import geoJun2025 from '../regents-exams/geometry/june-2025'

const GEO_EXAMS = [geoAug2019, geoJun2019, geoAug2022, geoJun2022, geoAug2023, geoJun2023, geoAug2024, geoJun2024, geoJun2025]

const GEO_TOPIC_MAP = {
  'Congruence & Transformations': TOPICS.CONGRUENCE,
  'Triangles & Congruence':       TOPICS.CONGRUENCE,
  'Transformations':              TOPICS.CONGRUENCE,
  'Angles & Lines':               TOPICS.CONGRUENCE,
  'Constructions':                TOPICS.CONGRUENCE,
  'Lines & Angles':               TOPICS.CONGRUENCE,
  'Parallel Lines & Angles':      TOPICS.CONGRUENCE,
  'Similarity & Proof':           TOPICS.SIMILARITY,
  'Proofs':                       TOPICS.SIMILARITY,
  'Circles':                      TOPICS.CIRCLES,
  'Coordinate Geometry':          TOPICS.COORDINATE_GEO,
  'Area & Volume':                TOPICS.SOLID_GEOMETRY,
  '3D Geometry & Volume':         TOPICS.SOLID_GEOMETRY,
  'Solids & 3D':                  TOPICS.SOLID_GEOMETRY,
  'Trigonometry':                 TOPICS.TRIGONOMETRY,
  'Right Triangles & Trig':       TOPICS.TRIGONOMETRY,
  'Right Triangle Trig':          TOPICS.TRIGONOMETRY,
  'Right Triangle Trigonometry':  TOPICS.TRIGONOMETRY,
  'Quadrilaterals':               TOPICS.QUADRILATERALS,
}

const _api = makeLessonApi({ exams: GEO_EXAMS, topicMap: GEO_TOPIC_MAP, lessonSize: 20 })

const SUBTOPIC_UNITS = [TOPICS.LINES_ANGLES, TOPICS.TRIANGLE_CONG]
// Geometry's distinctive practice is the two-column / paragraph PROOF, plus
// justify/explain reasoning — the items students lose the most points on.
const PR_SKILLS = ['proof', 'reasoning']

export const UNITS = [
  // ── Congruence & Transformations, split ──
  { id: 'geometry-lat',  title: 'Lines, Angles & Transformations',    icon: TOPIC_ICONS[TOPICS.LINES_ANGLES],     color: '#10b981', darkColor: '#059669', topic: TOPICS.LINES_ANGLES,     lessonCount: 3 },
  { id: 'geometry-tc',   title: 'Triangle Congruence & Constructions', icon: TOPIC_ICONS[TOPICS.TRIANGLE_CONG],    color: '#34d399', darkColor: '#10b981', topic: TOPICS.TRIANGLE_CONG,    lessonCount: 2 },
  { id: 'geometry-u2',   title: 'Similarity & Proof',                 icon: TOPIC_ICONS[TOPICS.SIMILARITY],       color: '#6ee7b7', darkColor: '#34d399', topic: TOPICS.SIMILARITY,       lessonCount: 2 },
  // Proofs & Reasoning: cross-topic proof + justify/explain practice.
  // Few proof items are multiple-choice (most are written → surfaced in Worked
  // Examples), so the in-path unit is a single focused lesson.
  { id: 'geometry-pr',   title: 'Proofs & Reasoning',                 icon: TOPIC_ICONS[TOPICS.PROOFS_REASONING], color: '#2563eb', darkColor: '#1d4ed8', topic: TOPICS.PROOFS_REASONING, lessonCount: 1, skillPool: PR_SKILLS },
  { id: 'geometry-u3',   title: 'Circles',                            icon: TOPIC_ICONS[TOPICS.CIRCLES],          color: '#059669', darkColor: '#047857', topic: TOPICS.CIRCLES,          lessonCount: 2 },
  { id: 'geometry-u4',   title: 'Coordinate Geometry',                icon: TOPIC_ICONS[TOPICS.COORDINATE_GEO],   color: '#047857', darkColor: '#065f46', topic: TOPICS.COORDINATE_GEO,   lessonCount: 2 },
  { id: 'geometry-u5',   title: '3D Geometry & Volume',               icon: TOPIC_ICONS[TOPICS.SOLID_GEOMETRY],   color: '#065f46', darkColor: '#064e3b', topic: TOPICS.SOLID_GEOMETRY,   lessonCount: 3 },
  { id: 'geometry-u6',   title: 'Trigonometry',                       icon: TOPIC_ICONS[TOPICS.TRIGONOMETRY],     color: '#0d9488', darkColor: '#0f766e', topic: TOPICS.TRIGONOMETRY,     lessonCount: 2 },
  { id: 'geometry-u7',   title: 'Quadrilaterals & Polygons',          icon: TOPIC_ICONS[TOPICS.QUADRILATERALS],   color: '#14b8a6', darkColor: '#0d9488', topic: TOPICS.QUADRILATERALS,   lessonCount: 1 },
]

export function getLessonQuestions(topic, lessonIndex, lessonCount) {
  if (topic === TOPICS.PROOFS_REASONING) return _api.getSkillLessonQuestions(PR_SKILLS, lessonIndex, lessonCount)
  if (SUBTOPIC_UNITS.includes(topic))    return _api.getSubTopicLessonQuestions(topic, lessonIndex, lessonCount)
  return _api.getLessonQuestions(topic, lessonIndex, lessonCount)
}
export function getByTopic(topic) {
  if (topic === TOPICS.PROOFS_REASONING) return PR_SKILLS.flatMap((sk) => _api.getBySkill(sk))
  if (SUBTOPIC_UNITS.includes(topic))    return _api.getBySubTopic(topic)
  return _api.getByTopic(topic)
}
export const buildDiagnosticSet = _api.buildDiagnosticSet
export const allQuestions       = _api.allQuestions
export const getWritten         = _api.getWritten
export const getBySkill         = _api.getBySkill
export const writtenLabel       = 'Worked Examples'
export function getEasyPool(topic) { return getByTopic(topic).filter(isEasy) }
