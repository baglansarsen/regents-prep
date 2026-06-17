/**
 * Next Regents exam dates by subject.
 * January session: 4th full week of January (Tue–Fri)
 * June session: 3rd full week of June (starts Monday)
 * August session: 2nd full week of August
 * Returns days until the next upcoming session for the given subject.
 */

// Subjects that sit the August session
const HAS_AUGUST = ['living-environment', 'earth-science', 'chemistry', 'physics']

// Subjects NOT offered in the January session (lab sciences are June/August only
// in the NYSED calendar). Everything else has a January administration.
const NO_JANUARY = ['chemistry', 'physics']

function nextTuesdayOfWeek(year, month, targetWeek) {
  // Find the first Monday of the given month, then jump to the target week
  const d = new Date(year, month - 1, 1)
  // Advance to Monday
  while (d.getDay() !== 1) d.setDate(d.getDate() + 1)
  // Jump to target week (1-indexed)
  d.setDate(d.getDate() + (targetWeek - 1) * 7)
  // Regents are typically on Tuesday of the exam week
  d.setDate(d.getDate() + 1)
  return d
}

/** The next upcoming Regents session date for a subject, as a local Date. */
export function getNextExamDate(subject = 'living-environment') {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const year  = today.getFullYear()

  const hasAugust  = HAS_AUGUST.includes(subject)
  const hasJanuary = !NO_JANUARY.includes(subject)

  // Build every plausible upcoming session across this year and next, then pick
  // the soonest one still in the future. Spanning two years covers the Sept–Jan
  // window where this year's sessions are all past but next January is next up.
  const candidates = []
  for (const y of [year, year + 1]) {
    if (hasJanuary) candidates.push(nextTuesdayOfWeek(y, 1, 4))  // 4th week of Jan
    candidates.push(nextTuesdayOfWeek(y, 6, 3))                  // 3rd week of June
    if (hasAugust)  candidates.push(nextTuesdayOfWeek(y, 8, 2))  // 2nd week of August
  }
  candidates.sort((a, b) => a - b)

  return candidates.find((d) => d >= today) ?? candidates[candidates.length - 1]
}

/** Whole days from today (local midnight) until the given Date or YYYY-MM-DD string. */
export function daysUntil(dateOrStr) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  let target
  if (typeof dateOrStr === 'string') {
    const [y, m, d] = dateOrStr.split('-').map(Number)
    target = new Date(y, m - 1, d)
  } else {
    target = new Date(dateOrStr)
    target.setHours(0, 0, 0, 0)
  }
  return Math.ceil((target - today) / (1000 * 60 * 60 * 24))
}

export function getDaysUntilExam(subject = 'living-environment') {
  return daysUntil(getNextExamDate(subject))
}

/**
 * Whole days to the student's *upcoming* exam. A Regents goal freezes its
 * `examDateStr` at commit time; once that session has passed the raw countdown
 * goes negative. Prefer the committed date while it's still in the future, and
 * once it's passed roll to the next scheduled session for the subject so the
 * countdown never shows a negative number.
 */
export function daysUntilExam(subject = 'living-environment', goalExamDateStr = null) {
  if (goalExamDateStr) {
    const d = daysUntil(goalExamDateStr)
    if (d >= 0) return d
  }
  return getDaysUntilExam(subject)
}

/** The exam date (YYYY-MM-DD) to display: committed date if still upcoming, else next session. */
export function effectiveExamDateStr(subject = 'living-environment', goalExamDateStr = null) {
  if (goalExamDateStr && daysUntil(goalExamDateStr) >= 0) return goalExamDateStr
  const d = getNextExamDate(subject)
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export function getExamLabel(subject = 'living-environment') {
  const days = getDaysUntilExam(subject)
  if (days === 0) return '📅 Exam is today!'
  if (days === 1) return '📅 Exam tomorrow!'
  if (days <= 14) return `📅 ${days} days until Regents`
  if (days <= 30) return `📅 ${days} days to Regents`
  return `📅 ${days} days to next Regents`
}
