/**
 * Regents exam dates by subject.
 *
 * Official dates come from data/regentsCalendar.js (NYSED's published
 * schedules). Sessions NYSED hasn't published yet are estimated from the usual
 * pattern (Tuesday of the 4th week of January, 3rd week of June, 2nd week of
 * August) and flagged `estimated` so the UI can say so.
 */
import { REGENTS_SESSIONS, CALENDAR_SUBJECT_ALIAS, LAST_PUBLISHED_SESSION } from '../data/regentsCalendar'

// Estimates only: which sessions a subject is offered in. Physics has no
// August exam; every other subject sits January, June and August (NYSED 2027).
const NO_AUGUST = ['physics']

function nextTuesdayOfWeek(year, month, targetWeek) {
  // Find the first Monday of the given month, then jump to the target week
  const d = new Date(year, month - 1, 1)
  while (d.getDay() !== 1) d.setDate(d.getDate() + 1)
  d.setDate(d.getDate() + (targetWeek - 1) * 7)
  d.setDate(d.getDate() + 1)   // the Tuesday of that week
  return d
}

const pad2 = (n) => String(n).padStart(2, '0')
const ymd = (d) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`
const localDate = (dateStr) => { const [y, m, d] = dateStr.split('-').map(Number); return new Date(y, m - 1, d) }

/**
 * Every known session for a subject, soonest first:
 *   { dateStr, label ("June 2027"), time ("9:15 a.m."|null), estimated, draft }
 * Official sessions first, then estimates for sessions after the last
 * published one (this year through three years out).
 */
export function examSessionsFor(subject = 'living-environment') {
  const key = CALENDAR_SUBJECT_ALIAS[subject] ?? subject
  const official = REGENTS_SESSIONS
    .filter((sn) => sn.exams[key])
    .map((sn) => ({ dateStr: sn.exams[key].date, label: sn.label, time: sn.exams[key].time, estimated: false, draft: !!sn.draft }))

  const estimates = []
  const year = new Date().getFullYear()
  for (const y of [year, year + 1, year + 2, year + 3]) {
    for (const [month, week] of [[1, 4], [6, 3], [8, 2]]) {
      if (`${y}-${pad2(month)}` <= LAST_PUBLISHED_SESSION) continue
      if (month === 8 && NO_AUGUST.includes(key)) continue
      const d = nextTuesdayOfWeek(y, month, week)
      estimates.push({
        dateStr: ymd(d),
        label: d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        time: null, estimated: true, draft: false,
      })
    }
  }
  return [...official, ...estimates].sort((a, b) => (a.dateStr < b.dateStr ? -1 : 1))
}

/**
 * Goals saved before the official calendar hold a computed date (e.g. June 22
 * for every subject). Move such a date to the official date of the same
 * session (same month and year); anything else is returned unchanged.
 */
export function officialSessionDate(subject, examDateStr) {
  if (!examDateStr) return examDateStr
  const month = examDateStr.slice(0, 7)
  const match = examSessionsFor(subject).find((sn) => !sn.estimated && sn.dateStr.slice(0, 7) === month)
  return match ? match.dateStr : examDateStr
}

/** Upcoming sessions (today or later) for a subject; never empty. */
function upcomingSessions(subject) {
  const all = examSessionsFor(subject)
  const future = all.filter((sn) => daysUntil(sn.dateStr) >= 0)
  return future.length ? future : all.slice(-1)
}

/** Upcoming session dates for a subject (soonest first), as local Dates. */
function upcomingExamDates(subject = 'living-environment') {
  return upcomingSessions(subject).map((sn) => localDate(sn.dateStr))
}

/** The next upcoming Regents session date for a subject, as a local Date. */
export function getNextExamDate(subject = 'living-environment') {
  return upcomingExamDates(subject)[0]
}

function toDateStr(d) {
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

/**
 * The next few valid sessions a student can target for this subject, for the
 * goal-setup session picker. Each: { dateStr (YYYY-MM-DD), label ("June 2027"),
 * days (whole days from today) }. Only sessions the subject is actually offered in.
 */
export function getUpcomingExamSessions(subject = 'living-environment', count = 3) {
  return upcomingSessions(subject).slice(0, count).map((sn) => ({
    dateStr:   sn.dateStr,
    label:     sn.label,
    days:      daysUntil(sn.dateStr),
    time:      sn.time,
    estimated: sn.estimated,
  }))
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

/** "June" for '2027-06-22' — the session a goal date belongs to. */
export function sessionMonthOf(dateStr) {
  if (!dateStr) return null
  const [y, m] = dateStr.split('-').map(Number)
  if (!y || !m) return null
  return new Date(y, m - 1, 1).toLocaleDateString('en-US', { month: 'long' })
}

/** True once the student's committed exam date is in the past. */
export function isGoalDatePassed(goalExamDateStr) {
  return !!goalExamDateStr && daysUntil(goalExamDateStr) < 0
}

/**
 * Countdown copy. With `sessionDateStr` (the student's committed session) the
 * label names it — "228 days to your June Regents" — instead of implying it's
 * the next sitting, which it may not be (they can pick a later session).
 */
export function getExamLabel(subject = 'living-environment', days = getDaysUntilExam(subject), sessionDateStr = null) {
  const month = sessionMonthOf(sessionDateStr)
  if (month) {
    if (days === 0) return `📅 Your ${month} Regents is today!`
    if (days === 1) return `📅 Your ${month} Regents is tomorrow!`
    return `📅 ${days} days to your ${month} Regents`
  }
  if (days === 0) return '📅 Exam is today!'
  if (days === 1) return '📅 Exam tomorrow!'
  if (days <= 14) return `📅 ${days} days until Regents`
  if (days <= 30) return `📅 ${days} days to Regents`
  return `📅 ${days} days to next Regents`
}
