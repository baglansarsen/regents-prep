/**
 * streakCalendar — pure date helpers for the streak month calendar.
 *
 * No external date library: the app keeps date keys as `YYYY-MM-DD` strings
 * (e.g. StreakContext.studiedDates), and lexicographic order on that format is
 * chronological, so we compare strings directly. Cell strings are built from
 * calendar Y/M/D to match the stored keys.
 */

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

import { localDateStr } from './localDate'

const pad = (n) => String(n).padStart(2, '0')

/**
 * Today as a `YYYY-MM-DD` string (same convention as StreakContext keys).
 * Local-time so the "today" ring lands on the calendar cell the user sees —
 * monthMatrix() builds cells from local Y/M/D, so this must match.
 */
export function todayISO() {
  return localDateStr()
}

/** Shift a (year, 0-based month) by delta months. */
export function addMonths(year, month, delta) {
  const d = new Date(year, month + delta, 1)
  return { year: d.getFullYear(), month: d.getMonth() }
}

/** e.g. monthLabel(2026, 5) → "June 2026". `month` is 0-based. */
export function monthLabel(year, month) {
  return `${MONTHS[month]} ${year}`
}

/**
 * Build a month grid: an array of weeks, each a 7-cell array (Sun→Sat). Each
 * cell is either null (leading/trailing padding) or a `YYYY-MM-DD` string.
 * `month` is 0-based.
 */
export function monthMatrix(year, month) {
  const startDow     = new Date(year, month, 1).getDay()      // 0 Sun … 6 Sat
  const daysInMonth  = new Date(year, month + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < startDow; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(`${year}-${pad(month + 1)}-${pad(d)}`)
  while (cells.length % 7 !== 0) cells.push(null)

  const weeks = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
  return weeks
}

/**
 * Status for a single calendar cell.
 *   'frozen'  — a freeze saved this day        (🧊, checked first)
 *   'studied' — completed a lesson this day    (🔥)
 *   'today'   — today, not yet studied         (ring)
 *   'future'  — after today                    (dim)
 *   'missed'  — a gap day within the active range
 *   'blank'   — padding, or before first activity
 */
export function dayStatus(dateStr, { studiedSet, frozenSet, today, firstActive }) {
  if (!dateStr) return 'blank'
  if (frozenSet.has(dateStr))  return 'frozen'
  if (studiedSet.has(dateStr)) return 'studied'
  if (dateStr === today)       return 'today'
  if (dateStr > today)         return 'future'
  if (firstActive && dateStr >= firstActive) return 'missed'
  return 'blank'
}
