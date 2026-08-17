/**
 * dailyTrap — one tricky question per subject per day ("Daily Regents Trap").
 *
 * Selection is deterministic for (subject, local date): everyone with the same
 * content sees the same trap on the same day, and re-renders can't reshuffle
 * it. Questions carrying richer teaching metadata (diveDeep, explanation,
 * difficulty, common-mistake notes) are preferred — those are the ones written
 * around the mistakes students actually make.
 *
 * Pure module (no imports). Completion storage key: uid + subject + local date.
 */

// AsyncStorage key for today's completion — value is 'correct' | 'wrong'
export function trapDoneKey(uid, subject, dateStr) {
  return `@dailyTrap_v1_${uid}_${subject}_${dateStr}`
}

// Subject-specific one-line hooks — short, teen-friendly, no doom
const HOOKS = {
  'living-environment': 'The question most students get wrong on bio day.',
  'earth-science':      'One sneaky question — reference tables ready?',
  'chemistry':          "Today's most-missed chem question. Trust nothing.",
  'physics':            'Looks easy. The units say otherwise.',
  'algebra-1':          'One problem. One classic wrong answer to avoid.',
  'algebra-2':          "The kind of question that ends a streak of W's.",
  'geometry':           'One figure, one trap — check before you pick.',
  'english':            'Two answers look right. Only one survives.',
  'global-history':     'One document, one detail everyone skims past.',
  'us-history':         'A question the test writers love to sneak in.',
  'life-science':       'The question most students get wrong on bio day.',
}
export function trapHookFor(subject) {
  return HOOKS[subject] ?? "One tricky question, once a day. That's the game."
}

// Cheap deterministic string hash (FNV-1a-ish) — stable across sessions
function hashStr(s) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

// Prefer questions with the teaching metadata that marks "trap" material
function trapScore(q) {
  let score = 0
  if (q.diveDeep)                            score += 2
  if (q.explanation)                         score += 1
  if (q.commonMistake || q.commonMistakes)   score += 2
  if (q.difficulty === 'hard')               score += 2
  else if (q.difficulty != null)             score += 1
  if (q.skill)                               score += 1
  return score
}

/**
 * Pick today's trap for a subject. Deterministic in (subject, dateStr).
 *
 * @param {object} args
 * @param {Array}  args.questions  the subject's full MC pool (sd.questions)
 * @param {string} args.subject
 * @param {string} args.dateStr    localDateStr() — 'YYYY-MM-DD'
 * @returns question object or null when the pool is empty
 */
export function pickDailyTrap({ questions = [], subject = '', dateStr = '' } = {}) {
  const pool = questions.filter(
    (q) => q && q.type !== 'written' && Array.isArray(q.choices) && q.choices.length >= 2 &&
           (q.correct != null || q.correctIndex != null),
  )
  if (!pool.length) return null

  // Keep only the highest-scoring tier so metadata-rich questions always win,
  // falling back gracefully when a subject has no enriched content.
  const scored = pool.map((q) => ({ q, s: trapScore(q) }))
  const max    = Math.max(...scored.map((x) => x.s))
  const tier   = scored.filter((x) => x.s === max).map((x) => x.q)

  return tier[hashStr(`${subject}|${dateStr}`) % tier.length]
}
