import { TOPICS, TOPIC_ICONS } from './questions'
import { makeLessonApi } from '../_shared/lessonEngine'
import { isEasy } from '../_shared/difficulty'
import geoAug2019 from '../regents-exams/geometry/august-2019'
import geoJun2019 from '../regents-exams/geometry/june-2019'
import geoJan2020 from '../regents-exams/geometry/january-2020'
import geoAug2022 from '../regents-exams/geometry/august-2022'
import geoJun2022 from '../regents-exams/geometry/june-2022'
import geoAug2023 from '../regents-exams/geometry/august-2023'
import geoJun2023 from '../regents-exams/geometry/june-2023'
import geoJan2023 from '../regents-exams/geometry/january-2023'
import geoAug2024 from '../regents-exams/geometry/august-2024'
import geoJun2024 from '../regents-exams/geometry/june-2024'
import geoJan2024 from '../regents-exams/geometry/january-2024'
import geoAug2025 from '../regents-exams/geometry/august-2025'
import geoJun2025 from '../regents-exams/geometry/june-2025'
import geoJan2025 from '../regents-exams/geometry/january-2025'
import geoJan2026 from '../regents-exams/geometry/january-2026'
import geoJun2026 from '../regents-exams/geometry/june-2026'

// Every posted NYSED Geometry exam we have on disk — 7 more than before
// (august-2025, january-2020/23/24/25/26, june-2026) were sitting unused.
const GEO_EXAMS = [
  geoAug2019, geoJun2019,
  geoJan2020,
  geoAug2022, geoJun2022,
  geoAug2023, geoJun2023, geoJan2023,
  geoAug2024, geoJun2024, geoJan2024,
  geoAug2025, geoJun2025, geoJan2025,
  geoJan2026, geoJun2026,
]

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

const SUBTOPIC_UNITS = [
  TOPICS.LINES_ANGLES, TOPICS.TRIANGLE_CONG,
  TOPICS.SIMILARITY_RATIOS, TOPICS.TRIANGLE_RELATIONSHIPS,
  TOPICS.CIRCLE_EQUATIONS, TOPICS.ARCS_ANGLES, TOPICS.CIRCLE_SEGMENTS,
  TOPICS.LINES_SLOPE, TOPICS.COORDINATE_PROOFS,
  TOPICS.CROSS_SECTIONS, TOPICS.VOLUME_SA, TOPICS.DENSITY_MODELING,
  TOPICS.RIGHT_TRIANGLE_TRIG, TOPICS.SPECIAL_TRIANGLES,
]
// Geometry's distinctive practice is the two-column / paragraph PROOF, plus
// justify/explain reasoning — the items students lose the most points on.
const PR_SKILLS = ['proof', 'reasoning']

// examWeight values are each unit's share of the 382-question wired pool
// (excluding geometry-pr, an overlapping skill tag counted inside its
// questions' own topic unit — same convention as content/earth-science/
// units.js). Re-run the classification pass and update these after any
// future exam import. strand/essCodes use the NY Geometry Regents' own
// course strands (G.CO congruence, G.SRT similarity/right-triangles, G.C
// circles, G.GPE coordinate geometry, G.GMD geometric measurement &
// dimension, G.MG modeling).
export const UNITS = [
  // ── Congruence & Transformations, split ──
  { id: 'geometry-lat',  title: 'Lines, Angles & Transformations',    icon: TOPIC_ICONS[TOPICS.LINES_ANGLES],     color: '#10b981', darkColor: '#059669', topic: TOPICS.LINES_ANGLES,     lessonCount: 3, strand: 'G.CO', essCodes: ['G.CO.1', 'G.CO.6'], examWeight: 0.196, prereqs: [] },
  { id: 'geometry-tc',   title: 'Triangle Congruence & Constructions', icon: TOPIC_ICONS[TOPICS.TRIANGLE_CONG],    color: '#34d399', darkColor: '#10b981', topic: TOPICS.TRIANGLE_CONG,    lessonCount: 2, strand: 'G.CO', essCodes: ['G.CO.7', 'G.CO.8', 'G.CO.12'], examWeight: 0.162, prereqs: ['geometry-lat'] },
  // Proofs & Reasoning: cross-topic proof + justify/explain practice.
  // Few proof items are multiple-choice (most are written → surfaced in Worked
  // Examples), so the in-path unit is a single focused lesson.
  { id: 'geometry-pr',   title: 'Proofs & Reasoning',                 icon: TOPIC_ICONS[TOPICS.PROOFS_REASONING], color: '#2563eb', darkColor: '#1d4ed8', topic: TOPICS.PROOFS_REASONING, lessonCount: 1, skillPool: PR_SKILLS, strand: 'PRACTICE', essCodes: [], examWeight: null, prereqs: ['geometry-tc'] },
  // ── Similarity & Proof, split ──
  { id: 'geometry-sim',  title: 'Similarity',                        icon: TOPIC_ICONS[TOPICS.SIMILARITY_RATIOS],      color: '#6ee7b7', darkColor: '#34d399', topic: TOPICS.SIMILARITY_RATIOS,      lessonCount: 1, strand: 'G.SRT', essCodes: ['G.SRT.2', 'G.SRT.3'], examWeight: 0.058, prereqs: ['geometry-pr'] },
  { id: 'geometry-tri',  title: 'Triangle Relationships',            icon: TOPIC_ICONS[TOPICS.TRIANGLE_RELATIONSHIPS], color: '#4ade80', darkColor: '#22c55e', topic: TOPICS.TRIANGLE_RELATIONSHIPS, lessonCount: 1, strand: 'G.SRT', essCodes: ['G.SRT.4', 'G.SRT.5'], examWeight: 0.060, prereqs: ['geometry-sim'] },
  // ── Circles, split ──
  { id: 'geometry-eqcirc', title: 'Equations of Circles',            icon: TOPIC_ICONS[TOPICS.CIRCLE_EQUATIONS], color: '#059669', darkColor: '#047857', topic: TOPICS.CIRCLE_EQUATIONS, lessonCount: 1, strand: 'G.GPE', essCodes: ['G.GPE.1'], examWeight: 0.042, prereqs: ['geometry-tri'] },
  { id: 'geometry-arcs',   title: 'Arcs & Angles',                   icon: TOPIC_ICONS[TOPICS.ARCS_ANGLES],      color: '#10b981', darkColor: '#059669', topic: TOPICS.ARCS_ANGLES,      lessonCount: 1, strand: 'G.C',   essCodes: ['G.C.2', 'G.C.5'], examWeight: 0.042, prereqs: ['geometry-eqcirc'] },
  { id: 'geometry-segs',   title: 'Circle Segments & Lines',         icon: TOPIC_ICONS[TOPICS.CIRCLE_SEGMENTS],  color: '#0d9488', darkColor: '#0f766e', topic: TOPICS.CIRCLE_SEGMENTS,  lessonCount: 1, strand: 'G.C',   essCodes: ['G.C.2'],           examWeight: 0.050, prereqs: ['geometry-arcs'] },
  // ── Coordinate Geometry, split ──
  { id: 'geometry-slope',      title: 'Lines & Slope',               icon: TOPIC_ICONS[TOPICS.LINES_SLOPE],       color: '#047857', darkColor: '#065f46', topic: TOPICS.LINES_SLOPE,       lessonCount: 1, strand: 'G.GPE', essCodes: ['G.GPE.5'], examWeight: 0.045, prereqs: ['geometry-segs'] },
  { id: 'geometry-coordproof', title: 'Coordinate Proofs',           icon: TOPIC_ICONS[TOPICS.COORDINATE_PROOFS], color: '#065f46', darkColor: '#064e3b', topic: TOPICS.COORDINATE_PROOFS, lessonCount: 1, strand: 'G.GPE', essCodes: ['G.GPE.4', 'G.GPE.6', 'G.GPE.7'], examWeight: 0.052, prereqs: ['geometry-slope'] },
  // ── 3D Geometry & Volume, split ──
  { id: 'geometry-crosssec', title: 'Cross-Sections & Solids of Revolution', icon: TOPIC_ICONS[TOPICS.CROSS_SECTIONS], color: '#064e3b', darkColor: '#022c22', topic: TOPICS.CROSS_SECTIONS, lessonCount: 1, strand: 'G.GMD', essCodes: ['G.GMD.4'], examWeight: 0.034, prereqs: ['geometry-coordproof'] },
  { id: 'geometry-vol',      title: 'Volume & Surface Area',                 icon: TOPIC_ICONS[TOPICS.VOLUME_SA],       color: '#065f46', darkColor: '#064e3b', topic: TOPICS.VOLUME_SA,       lessonCount: 2, strand: 'G.GMD', essCodes: ['G.GMD.1', 'G.GMD.3'], examWeight: 0.089, prereqs: ['geometry-crosssec'] },
  { id: 'geometry-density',  title: 'Density & Modeling',                    icon: TOPIC_ICONS[TOPICS.DENSITY_MODELING], color: '#0f766e', darkColor: '#115e59', topic: TOPICS.DENSITY_MODELING, lessonCount: 1, strand: 'G.MG',  essCodes: ['G.MG.1', 'G.MG.2', 'G.MG.3'], examWeight: 0.034, prereqs: ['geometry-vol'] },
  // ── Trigonometry, split ──
  { id: 'geometry-rttrig',  title: 'Right Triangle Trig',            icon: TOPIC_ICONS[TOPICS.RIGHT_TRIANGLE_TRIG], color: '#0d9488', darkColor: '#0f766e', topic: TOPICS.RIGHT_TRIANGLE_TRIG, lessonCount: 1, strand: 'G.SRT', essCodes: ['G.SRT.6', 'G.SRT.8'], examWeight: 0.042, prereqs: ['geometry-density'] },
  { id: 'geometry-special', title: 'Pythagorean & Special Triangles', icon: TOPIC_ICONS[TOPICS.SPECIAL_TRIANGLES], color: '#14b8a6', darkColor: '#0d9488', topic: TOPICS.SPECIAL_TRIANGLES,  lessonCount: 1, strand: 'G.SRT', essCodes: ['G.SRT.4', 'G.SRT.8'], examWeight: 0.045, prereqs: ['geometry-rttrig'] },
  { id: 'geometry-u7',   title: 'Quadrilaterals & Polygons',          icon: TOPIC_ICONS[TOPICS.QUADRILATERALS],   color: '#14b8a6', darkColor: '#0d9488', topic: TOPICS.QUADRILATERALS,   lessonCount: 1, strand: 'G.CO',  essCodes: ['G.CO.11'], examWeight: 0.050, prereqs: ['geometry-special'] },
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
