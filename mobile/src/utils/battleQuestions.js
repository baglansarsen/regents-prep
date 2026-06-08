// Battle question source — pulls a flat MCQ pool per subject (same `questions`
// export the rest of the app uses) and returns a randomized set for a battle.

import * as leData    from '../content/living-environment/index'
import * as esData    from '../content/earth-science/index'
import * as chemData  from '../content/chemistry/index'
import * as physData  from '../content/physics/index'
import * as a1Data    from '../content/algebra-1/index'
import * as a2Data    from '../content/algebra-2/index'
import * as geoData   from '../content/geometry/index'
import * as lsData    from '../content/life-science/index'
import * as engData   from '../content/english/index'
import * as ghData    from '../content/global-history/index'
import * as ushData   from '../content/us-history/index'

const SUBJECT_DATA = {
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

export const BATTLE_SIZE = 10

function correctIndex(q) {
  return q.correct ?? q.correctIndex
}

// Only multiple-choice questions with a valid answer index can be battled.
function isBattleable(q) {
  const ci = correctIndex(q)
  return Array.isArray(q.choices) && q.choices.length > 1 &&
         Number.isInteger(ci) && ci >= 0 && ci < q.choices.length
}

// Fisher–Yates shuffle (non-mutating).
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Strip each question down to what a battle needs, so the Firestore challenge
// doc stays small and both players render an identical set.
function slim(q) {
  return {
    text:    q.text ?? q.question ?? '',
    choices: q.choices,
    correct: correctIndex(q),
    ...(q.image   ? { image: q.image }     : {}),
    ...(q.context ? { context: q.context } : {}),
  }
}

/**
 * getBattleQuestions(subject, n = BATTLE_SIZE)
 * Returns up to `n` randomized, slimmed MCQs for the subject.
 * Falls back to Living Environment if the subject has no usable pool.
 */
export function getBattleQuestions(subject, n = BATTLE_SIZE) {
  const pool = (SUBJECT_DATA[subject] ?? leData).questions ?? []
  let eligible = pool.filter(isBattleable)
  if (eligible.length === 0) {
    eligible = (leData.questions ?? []).filter(isBattleable)
  }
  return shuffle(eligible).slice(0, n).map(slim)
}
