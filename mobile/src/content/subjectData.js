/**
 * subjectData — one map from subject id → that subject's content module
 * (questions, UNITS, getByTopic, …). Several screens were each rebuilding
 * this 11-import map locally; new goal screens share this one.
 */
import * as leData    from './living-environment/index'
import * as esData    from './earth-science/index'
import * as chemData  from './chemistry/index'
import * as physData  from './physics/index'
import * as a1Data    from './algebra-1/index'
import * as a2Data    from './algebra-2/index'
import * as geoData   from './geometry/index'
import * as lsData    from './life-science/index'
import * as engData   from './english/index'
import * as ghData    from './global-history/index'
import * as ushData   from './us-history/index'

export const SUBJECT_DATA = {
  'living-environment': leData,
  'earth-science':      esData,
  'chemistry':          chemData,
  'physics':            physData,
  'algebra-1':          a1Data,
  'algebra-2':          a2Data,
  'geometry':           geoData,
  'life-science':       lsData,
  'english':            engData,
  'global-history':     ghData,
  'us-history':         ushData,
}

export function subjectData(subject) {
  return SUBJECT_DATA[subject] ?? leData
}
