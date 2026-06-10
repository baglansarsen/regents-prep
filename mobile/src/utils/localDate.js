/**
 * localDate — day-boundary helpers anchored to the device's LOCAL timezone.
 *
 * The app's entire audience is in New York. Using `new Date().toISOString()`
 * (UTC) to derive "today" flips the day at 7–8 PM Eastern, which silently
 * broke streaks, daily goals, quests, and the streak calendar for anyone who
 * studied in the evening. Every "what day is it" decision must go through here
 * so the boundary is local midnight, not UTC midnight.
 *
 * Date keys keep the same `YYYY-MM-DD` string format used throughout storage,
 * so lexicographic comparison stays chronological and existing persisted data
 * remains compatible.
 */

const pad = (n) => String(n).padStart(2, '0')

/** A Date → `YYYY-MM-DD` using LOCAL calendar fields (not UTC). */
export function toLocalDateStr(d) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

/** Today as a local `YYYY-MM-DD` string. */
export function localDateStr() {
  return toLocalDateStr(new Date())
}

/** The local date `n` days before today as a `YYYY-MM-DD` string. */
export function daysAgoStr(n) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return toLocalDateStr(d)
}

export function yesterdayStr() { return daysAgoStr(1) }
export function twoDaysAgoStr() { return daysAgoStr(2) }

/** The last 7 local dates, oldest → newest (today is last). */
export function last7Days() {
  return Array.from({ length: 7 }, (_, i) => daysAgoStr(6 - i))
}

/**
 * A stable integer index for "today" in local time, changing exactly at local
 * midnight. Replaces `Math.floor(Date.now() / 86_400_000)`, which changes at
 * UTC midnight and is offset by the timezone. Use for daily rotations (quests,
 * pet messages) so they roll over with the calendar day the user sees.
 */
export function localDayIndex() {
  const d = new Date()
  // Shift the epoch by the local offset so integer division lands on the local
  // midnight boundary.
  return Math.floor((d.getTime() - d.getTimezoneOffset() * 60_000) / 86_400_000)
}
