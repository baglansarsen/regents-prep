import { SUBJECTS } from '../content/subjects'
import * as leData from '../content/living-environment/index'
import * as esData from '../content/earth-science/index'
import * as chemData from '../content/chemistry/index'
import * as physicsData from '../content/physics/index'
import * as algebra1Data from '../content/algebra-1/index'
import * as algebra2Data from '../content/algebra-2/index'
import * as geometryData from '../content/geometry/index'
import * as lifeScienceData from '../content/life-science/index'
import * as englishData from '../content/english/index'
import * as globalHistoryData from '../content/global-history/index'
import * as usHistoryData from '../content/us-history/index'

/**
 * Resolve the question-bank module for a subject. Shared so HomeScreen and the
 * Exams tab's Quick Practice both build practice sessions from the same source.
 * Falls back to Living Environment for unknown subjects.
 */
const SUBJECT_DATA = {
  [SUBJECTS.LIVING_ENVIRONMENT]: leData,
  [SUBJECTS.EARTH_SCIENCE]:      esData,
  [SUBJECTS.CHEMISTRY]:          chemData,
  [SUBJECTS.PHYSICS]:            physicsData,
  [SUBJECTS.ALGEBRA_1]:          algebra1Data,
  [SUBJECTS.ALGEBRA_2]:          algebra2Data,
  [SUBJECTS.GEOMETRY]:           geometryData,
  [SUBJECTS.LIFE_SCIENCE]:       lifeScienceData,
  [SUBJECTS.ENGLISH]:            englishData,
  [SUBJECTS.GLOBAL_HISTORY]:     globalHistoryData,
  [SUBJECTS.US_HISTORY]:         usHistoryData,
}

export function getSubjectData(subject) {
  return SUBJECT_DATA[subject] ?? leData
}
