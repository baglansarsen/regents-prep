import { TOPICS, TOPIC_ICONS } from './questions'
import { makeLessonApi } from '../_shared/lessonEngine'
import enAugust2014 from '../regents-exams/english/august-2014'
import enAugust2015 from '../regents-exams/english/august-2015'
import enAugust2016 from '../regents-exams/english/august-2016'
import enAugust2017 from '../regents-exams/english/august-2017'
import enAugust2018 from '../regents-exams/english/august-2018'
import enAugust2019 from '../regents-exams/english/august-2019'
import enAugust2022 from '../regents-exams/english/august-2022'
import enAugust2023 from '../regents-exams/english/august-2023'
import enAugust2024 from '../regents-exams/english/august-2024'
import enAugust2025 from '../regents-exams/english/august-2025'
import enJanuary2015 from '../regents-exams/english/january-2015'
import enJanuary2016 from '../regents-exams/english/january-2016'
import enJanuary2017 from '../regents-exams/english/january-2017'
import enJanuary2018 from '../regents-exams/english/january-2018'
import enJanuary2019 from '../regents-exams/english/january-2019'
import enJanuary2020 from '../regents-exams/english/january-2020'
import enJanuary2023 from '../regents-exams/english/january-2023'
import enJanuary2024 from '../regents-exams/english/january-2024'
import enJanuary2025 from '../regents-exams/english/january-2025'
import enJanuary2026 from '../regents-exams/english/january-2026'
import enJune2014 from '../regents-exams/english/june-2014'
import enJune2015 from '../regents-exams/english/june-2015'
import enJune2016 from '../regents-exams/english/june-2016'
import enJune2017 from '../regents-exams/english/june-2017'
import enJune2018 from '../regents-exams/english/june-2018'
import enJune2019 from '../regents-exams/english/june-2019'
import enJune2021 from '../regents-exams/english/june-2021'
import enJune2022 from '../regents-exams/english/june-2022'
import enJune2023 from '../regents-exams/english/june-2023'
import enJune2024 from '../regents-exams/english/june-2024'
import enJune2025 from '../regents-exams/english/june-2025'

// Expanded to all 31 available exams (2014–2026).
const EN_EXAMS = [enAugust2014, enAugust2015, enAugust2016, enAugust2017, enAugust2018, enAugust2019, enAugust2022, enAugust2023, enAugust2024, enAugust2025, enJanuary2015, enJanuary2016, enJanuary2017, enJanuary2018, enJanuary2019, enJanuary2020, enJanuary2023, enJanuary2024, enJanuary2025, enJanuary2026, enJune2014, enJune2015, enJune2016, enJune2017, enJune2018, enJune2019, enJune2021, enJune2022, enJune2023, enJune2024, enJune2025]

// Questions are tagged with `topic` = the reading-analysis skill unit (identity map).
const EN_TOPIC_MAP = {
  [TOPICS.CLOSE_READING]: TOPICS.CLOSE_READING,
  [TOPICS.CRAFT_TONE]:    TOPICS.CRAFT_TONE,
  [TOPICS.CENTRAL_IDEA]:  TOPICS.CENTRAL_IDEA,
  [TOPICS.INFERENCE]:     TOPICS.INFERENCE,
  [TOPICS.VOCAB_CONTEXT]: TOPICS.VOCAB_CONTEXT,
  [TOPICS.ARGUMENT]:      TOPICS.ARGUMENT,
}

const _api = makeLessonApi({ exams: EN_EXAMS, topicMap: EN_TOPIC_MAP, lessonSize: 20 })

export const UNITS = [
  { id: 'english-cr',  title: 'Close Reading',            icon: TOPIC_ICONS[TOPICS.CLOSE_READING], color: '#ef4444', darkColor: '#dc2626', topic: TOPICS.CLOSE_READING, lessonCount: 4 },
  { id: 'english-cft', title: "Author's Craft & Tone",    icon: TOPIC_ICONS[TOPICS.CRAFT_TONE],    color: '#f87171', darkColor: '#ef4444', topic: TOPICS.CRAFT_TONE,    lessonCount: 3 },
  { id: 'english-ci',  title: 'Central Idea & Theme',     icon: TOPIC_ICONS[TOPICS.CENTRAL_IDEA],  color: '#fb923c', darkColor: '#f97316', topic: TOPICS.CENTRAL_IDEA,  lessonCount: 3 },
  { id: 'english-inf', title: 'Inference',                icon: TOPIC_ICONS[TOPICS.INFERENCE],     color: '#fca5a5', darkColor: '#f87171', topic: TOPICS.INFERENCE,     lessonCount: 3 },
  { id: 'english-voc', title: 'Word Meaning in Context',  icon: TOPIC_ICONS[TOPICS.VOCAB_CONTEXT], color: '#f59e0b', darkColor: '#d97706', topic: TOPICS.VOCAB_CONTEXT, lessonCount: 2 },
  { id: 'english-arg', title: 'Argument & Structure',     icon: TOPIC_ICONS[TOPICS.ARGUMENT],      color: '#fbbf24', darkColor: '#f59e0b', topic: TOPICS.ARGUMENT,      lessonCount: 2 },
]

export const getLessonQuestions = _api.getLessonQuestions
export const getByTopic         = _api.getByTopic
export const buildDiagnosticSet = _api.buildDiagnosticSet
export const allQuestions       = _api.allQuestions
export const getWritten         = _api.getWritten
export const getBySkill         = _api.getBySkill
