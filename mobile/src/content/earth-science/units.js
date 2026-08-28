import { TOPICS, TOPIC_ICONS } from './questions'
import { makeLessonApi } from '../_shared/lessonEngine'
import { orderByDifficulty } from '../_shared/difficulty'
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
import { hazardsExam, climateChangeExam } from './authored/ess3'

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
  // Authored, not NYSED — see authored/ess3.js. Kept in a separate append
  // rather than interleaved above so "every posted NYSED exam" stays literally
  // true of the block above it.
  hazardsExam, climateChangeExam,
]

// Exported so index.js's Stimulus Practice pool can share this instead of
// keeping a second, driftable copy.
export const ES_TOPIC_MAP = {
  // Every raw exam topic below is fully dissolved into sub-topic units via
  // SUBTOPIC_UNITS, which filters by the raw question's `subTopic` field
  // independently of this map. A hand-enrichment pass (no ANTHROPIC_API_KEY
  // in this environment, so done by reading and tagging each question
  // directly) gave every question a subTopic — the untagged residue of each
  // raw topic now folds into MIXED_REVIEW rather than being dropped or left
  // in a near-empty whole-topic unit. Only MIXED_REVIEW itself remains
  // whole-topic-routed.
  'Geology':             TOPICS.MIXED_REVIEW,
  'Astronomy':           TOPICS.MIXED_REVIEW,
  'Plate Tectonics':     TOPICS.MIXED_REVIEW,
  'Geologic Time':       TOPICS.MIXED_REVIEW,
  'Meteorology':         TOPICS.MIXED_REVIEW,
  'Climate':             TOPICS.MIXED_REVIEW,
  'Water Cycle':         TOPICS.MIXED_REVIEW,
  'Oceanography':        TOPICS.MIXED_REVIEW,
  'Maps':                TOPICS.MIXED_REVIEW,   // thin (9 Q) — merged; map SKILL feeds Science Practices
  'General':             TOPICS.MIXED_REVIEW,
  'General Review':      TOPICS.MIXED_REVIEW,
  'Earth Science Skills':TOPICS.MIXED_REVIEW,
  // Authored ESS3 questions already carry their final topic value (no raw
  // exam-topic string to normalize), so these map to themselves.
  [TOPICS.HAZARDS]:        TOPICS.HAZARDS,
  [TOPICS.CLIMATE_CHANGE]: TOPICS.CLIMATE_CHANGE,
}

const LESSON_SIZE = 20
const _api = makeLessonApi({ exams: ES_EXAMS, topicMap: ES_TOPIC_MAP, lessonSize: LESSON_SIZE })

const SUBTOPIC_UNITS = [
  TOPICS.ROCKS, TOPICS.SURFACE_PROCESSES, TOPICS.MINERALS, TOPICS.SOLAR_SYSTEM, TOPICS.COSMOS,
  TOPICS.RELATIVE_DATING, TOPICS.RADIOACTIVE_DATING, TOPICS.FOSSILS,
  TOPICS.PLATE_BOUNDARIES, TOPICS.EARTHQUAKES, TOPICS.EARTH_INTERIOR,
  TOPICS.WEATHER_VARIABLES, TOPICS.MOISTURE, TOPICS.AIR_MASSES_FRONTS, TOPICS.STORMS,
  TOPICS.WATER_CYCLE_PROCESS, TOPICS.GROUNDWATER, TOPICS.CLIMATE_FACTORS,
]
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
// examWeight values below are from scripts/compute-es-weights.mjs, run after
// the hand-enrichment pass that gave Plate Tectonics and Geologic Time (like
// Geology/Astronomy before them) real per-subtopic pools — that's what makes
// the six new units below (es-plateboundaries through es-fossils) fundable;
// re-run the script and update these after any future exam import.
//
// prereqs now genuinely drives unlocking (hooks/useUnitUnlocks.js, Step 4f),
// not just array position, so this list's ORDER is presentation only — the
// dependency chain below is what actually gates progression.
export const UNITS = [
  // ── Geology, split ──
  { id: 'es-rocks',   title: 'Rocks & the Rock Cycle',           icon: TOPIC_ICONS[TOPICS.ROCKS],             color: '#92400e', darkColor: '#78350f', topic: TOPICS.ROCKS,             lessonCount: 3, strand: 'ESS2', essCodes: ['HS-ESS2-1'],              examWeight: 0.136, prereqs: [] },
  // ── Science practices early: data/map/reference reading recurs across every unit ──
  { id: 'es-sp',      title: 'Data, Maps & Reference Tables',    icon: TOPIC_ICONS[TOPICS.SCIENCE_PRACTICES], color: '#0891b2', darkColor: '#0e7490', topic: TOPICS.SCIENCE_PRACTICES, lessonCount: 3, skillPool: SP_SKILLS, strand: 'PRACTICE', essCodes: [],              examWeight: null,  prereqs: ['es-rocks'] },
  { id: 'es-surface', title: 'Weathering, Erosion & Deposition', icon: TOPIC_ICONS[TOPICS.SURFACE_PROCESSES], color: '#a16207', darkColor: '#854d0e', topic: TOPICS.SURFACE_PROCESSES, lessonCount: 3, strand: 'ESS2', essCodes: ['HS-ESS2-1', 'HS-ESS2-5'], examWeight: 0.068, prereqs: ['es-sp'] },
  { id: 'es-min',     title: 'Minerals',                         icon: TOPIC_ICONS[TOPICS.MINERALS],          color: '#7c3aed', darkColor: '#6d28d9', topic: TOPICS.MINERALS,          lessonCount: 2, strand: 'ESS2', essCodes: ['HS-ESS2-1'],              examWeight: 0.038, prereqs: ['es-surface'] },
  // ── Plate Tectonics, split (was one whole-topic unit; the hand-enrichment
  //    pass gave each of these three its own real, well-populated pool) ──
  { id: 'es-plateboundaries', title: 'Plate Boundaries',        icon: TOPIC_ICONS[TOPICS.PLATE_BOUNDARIES], color: '#b45309', darkColor: '#92400e', topic: TOPICS.PLATE_BOUNDARIES, lessonCount: 1, strand: 'ESS2', essCodes: ['HS-ESS1-5', 'HS-ESS2-1', 'HS-ESS2-3'], examWeight: 0.020, prereqs: ['es-min'] },
  { id: 'es-earthquakes',     title: 'Earthquakes & Seismic Waves', icon: TOPIC_ICONS[TOPICS.EARTHQUAKES],  color: '#e11d48', darkColor: '#9f1239', topic: TOPICS.EARTHQUAKES,      lessonCount: 1, strand: 'ESS2', essCodes: ['HS-ESS2-1'],              examWeight: 0.024, prereqs: ['es-plateboundaries'] },
  { id: 'es-interior',        title: "Evidence for Earth's Interior", icon: TOPIC_ICONS[TOPICS.EARTH_INTERIOR], color: '#6b21a8', darkColor: '#581c87', topic: TOPICS.EARTH_INTERIOR, lessonCount: 2, strand: 'ESS2', essCodes: ['HS-ESS1-6'],              examWeight: 0.031, prereqs: ['es-earthquakes'] },
  // ── Geologic Time, split (same reason as Plate Tectonics above) ──
  { id: 'es-reldate',   title: 'Relative Dating',                icon: TOPIC_ICONS[TOPICS.RELATIVE_DATING],    color: '#9333ea', darkColor: '#7e22ce', topic: TOPICS.RELATIVE_DATING,    lessonCount: 2, strand: 'ESS1', essCodes: ['HS-ESS1-5', 'HS-ESS1-6'], examWeight: 0.060, prereqs: ['es-interior'] },
  { id: 'es-radiodate', title: 'Radioactive Dating',             icon: TOPIC_ICONS[TOPICS.RADIOACTIVE_DATING], color: '#c026d3', darkColor: '#a21caf', topic: TOPICS.RADIOACTIVE_DATING, lessonCount: 1, strand: 'ESS1', essCodes: ['HS-ESS1-6'],              examWeight: 0.016, prereqs: ['es-reldate'] },
  { id: 'es-fossils',   title: 'Fossils & Correlation',          icon: TOPIC_ICONS[TOPICS.FOSSILS],            color: '#78350f', darkColor: '#451a03', topic: TOPICS.FOSSILS,            lessonCount: 2, strand: 'ESS1', essCodes: ['HS-ESS1-6'],              examWeight: 0.039, prereqs: ['es-radiodate'] },
  // ── Meteorology, split (was one whole-topic unit; same hand-enrichment
  //    treatment as Plate Tectonics/Geologic Time above) ──
  { id: 'es-weathervar', title: 'Weather Variables',            icon: TOPIC_ICONS[TOPICS.WEATHER_VARIABLES], color: '#0369a1', darkColor: '#075985', topic: TOPICS.WEATHER_VARIABLES, lessonCount: 4, strand: 'ESS2', essCodes: ['HS-ESS2-2'], examWeight: 0.096, prereqs: ['es-fossils'] },
  { id: 'es-moisture',   title: 'Moisture & Humidity',          icon: TOPIC_ICONS[TOPICS.MOISTURE],          color: '#0e7490', darkColor: '#155e75', topic: TOPICS.MOISTURE,          lessonCount: 2, strand: 'ESS2', essCodes: ['HS-ESS2-2'], examWeight: 0.037, prereqs: ['es-weathervar'] },
  { id: 'es-fronts',     title: 'Air Masses, Fronts & Maps',    icon: TOPIC_ICONS[TOPICS.AIR_MASSES_FRONTS], color: '#1e40af', darkColor: '#1e3a8a', topic: TOPICS.AIR_MASSES_FRONTS, lessonCount: 2, strand: 'ESS2', essCodes: ['HS-ESS2-2'], examWeight: 0.050, prereqs: ['es-moisture'] },
  { id: 'es-storms',     title: 'Storms & Severe Weather',      icon: TOPIC_ICONS[TOPICS.STORMS],            color: '#7c2d12', darkColor: '#431407', topic: TOPICS.STORMS,            lessonCount: 1, strand: 'ESS2', essCodes: ['HS-ESS2-2', 'HS-ESS3-1'], examWeight: 0.015, prereqs: ['es-fronts'] },
  // ── Water Cycle, split (same reason as above) ──
  { id: 'es-water',      title: 'The Water Cycle',              icon: TOPIC_ICONS[TOPICS.WATER_CYCLE_PROCESS], color: '#0284c7', darkColor: '#0369a1', topic: TOPICS.WATER_CYCLE_PROCESS, lessonCount: 2, strand: 'ESS2', essCodes: ['HS-ESS2-5'], examWeight: 0.066, prereqs: ['es-storms'] },
  { id: 'es-groundwater',title: 'Groundwater & Porosity',       icon: TOPIC_ICONS[TOPICS.GROUNDWATER],       color: '#155e75', darkColor: '#164e63', topic: TOPICS.GROUNDWATER,       lessonCount: 1, strand: 'ESS2', essCodes: ['HS-ESS2-5'], examWeight: 0.019, prereqs: ['es-water'] },
  // ── Climate, split (same reason as above; Climate Change and Insolation
  //    stayed too thin — 10 and 4 questions bank-wide — to fund their own
  //    units, so their residue folds into Mixed Review instead) ──
  { id: 'es-climatefactors', title: 'Climate Factors',          icon: TOPIC_ICONS[TOPICS.CLIMATE_FACTORS],   color: '#0f766e', darkColor: '#0d9488', topic: TOPICS.CLIMATE_FACTORS,   lessonCount: 2, strand: 'ESS2', essCodes: ['HS-ESS2-4'], examWeight: 0.042, prereqs: ['es-groundwater'] },
  // ── Astronomy, split ──
  { id: 'es-solar',   title: 'Solar System & Earth Motions',     icon: TOPIC_ICONS[TOPICS.SOLAR_SYSTEM],      color: '#1d4ed8', darkColor: '#1e40af', topic: TOPICS.SOLAR_SYSTEM,      lessonCount: 4, strand: 'ESS1', essCodes: ['HS-ESS1-4'],              examWeight: 0.156, prereqs: ['es-climatefactors'] },
  { id: 'es-cosmos',  title: 'Moon, Stars & the Universe',       icon: TOPIC_ICONS[TOPICS.COSMOS],            color: '#4f46e5', darkColor: '#4338ca', topic: TOPICS.COSMOS,            lessonCount: 3, strand: 'ESS1', essCodes: ['HS-ESS1-1', 'HS-ESS1-2', 'HS-ESS1-3'], examWeight: 0.085, prereqs: ['es-solar'] },
  { id: 'es-u9',      title: 'Earth and Space Sciences Mixed Review', icon: TOPIC_ICONS[TOPICS.MIXED_REVIEW], color: '#6b7280', darkColor: '#4b5563', topic: TOPICS.MIXED_REVIEW,      lessonCount: 3, strand: 'MIXED', essCodes: [],              examWeight: null,  prereqs: ['es-cosmos'] },
  // ── ESS3, authored (see authored/ess3.js) ──
  // Conceptually these don't depend on the geology/astronomy sequence at
  // all; prereqs is set to just the practice unit so they unlock much
  // earlier than the old positional-only scheme could have allowed.
  { id: 'es-hazards',   title: 'Natural Hazards & Risk',    icon: TOPIC_ICONS[TOPICS.HAZARDS],        color: '#dc2626', darkColor: '#991b1b', topic: TOPICS.HAZARDS,        lessonCount: 1, strand: 'ESS3', essCodes: ['HS-ESS3-1', 'HS-ESS3-2', 'HS-ESS3-4'], examWeight: null, prereqs: ['es-sp'] },
  { id: 'es-climchange',title: 'Global Climate Change',     icon: TOPIC_ICONS[TOPICS.CLIMATE_CHANGE], color: '#ea580c', darkColor: '#9a3412', topic: TOPICS.CLIMATE_CHANGE, lessonCount: 1, strand: 'ESS3', essCodes: ['HS-ESS3-5', 'HS-ESS3-6'],              examWeight: null, prereqs: ['es-sp'] },
]

// _api's MIXED_REVIEW bucket (General/Maps/etc + the untagged Geology/
// Astronomy residue, see ES_TOPIC_MAP above) also picks up every
// subtopic-tagged Geology/Astronomy question, because topic normalization
// runs per raw exam topic independently of subTopic. Excluded here so a
// rock/mineral/astronomy question already homed in its own subtopic unit
// doesn't also show up in Mixed Review.
function getMixedReviewPool() {
  return _api.getByTopic(TOPICS.MIXED_REVIEW).filter((q) => !SUBTOPIC_UNITS.includes(q.subTopic))
}

// Mirrors lessonEngine.js's own sliceLessons math (kept local rather than
// exported from the shared engine, since this is the one unit whose pool
// isn't just `getExamPool(topic)`).
function sliceMixedReviewLessons(pool, lessonIndex, lessonCount) {
  if (!(lessonCount >= 1) || lessonIndex >= lessonCount) return orderByDifficulty(pool)
  const chunkSize = Math.ceil(pool.length / lessonCount)
  const start = lessonIndex * chunkSize
  const slice = pool.slice(start, start + chunkSize)
  return orderByDifficulty([...slice].sort(() => Math.random() - 0.5).slice(0, LESSON_SIZE))
}

// Route each unit to its pool: sub-topic split, skill pool, mixed review, or whole topic.
export function getLessonQuestions(topic, lessonIndex, lessonCount) {
  if (topic === TOPICS.SCIENCE_PRACTICES) return _api.getSkillLessonQuestions(SP_SKILLS, lessonIndex, lessonCount)
  if (SUBTOPIC_UNITS.includes(topic))     return _api.getSubTopicLessonQuestions(topic, lessonIndex, lessonCount)
  if (topic === TOPICS.MIXED_REVIEW)      return sliceMixedReviewLessons(getMixedReviewPool(), lessonIndex, lessonCount)
  return _api.getLessonQuestions(topic, lessonIndex, lessonCount)
}
export function getByTopic(topic) {
  if (topic === TOPICS.SCIENCE_PRACTICES) return SP_SKILLS.flatMap((sk) => _api.getBySkill(sk))
  if (SUBTOPIC_UNITS.includes(topic))     return _api.getBySubTopic(topic)
  if (topic === TOPICS.MIXED_REVIEW)      return getMixedReviewPool()
  return _api.getByTopic(topic)
}
export const buildDiagnosticSet = _api.buildDiagnosticSet
export const allQuestions       = _api.allQuestions
export const getWritten         = _api.getWritten
export const getBySkill         = _api.getBySkill
