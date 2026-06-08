/**
 * Next Regents exam dates by subject.
 * June session: 3rd full week of June (starts Monday)
 * August session: 2nd full week of August
 * Returns days until the next upcoming session for the given subject.
 */

// Subjects that sit the August session
const HAS_AUGUST = ['living-environment', 'earth-science', 'chemistry', 'physics']

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

export function getDaysUntilExam(subject = 'living-environment') {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const year  = today.getFullYear()

  // June session: 3rd week of June → Tuesday
  const juneExam = nextTuesdayOfWeek(year, 6, 3)
  // August session: 2nd week of August → Tuesday
  const augExam  = nextTuesdayOfWeek(year, 8, 2)
  // Next year's June if both are past
  const nextJune = nextTuesdayOfWeek(year + 1, 6, 3)

  const hasAugust = HAS_AUGUST.includes(subject)
  const candidates = hasAugust
    ? [juneExam, augExam, nextJune]
    : [juneExam, nextJune]

  const upcoming = candidates.find((d) => d >= today) ?? nextJune
  const diffMs   = upcoming - today
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24))
}

export function getExamLabel(subject = 'living-environment') {
  const days = getDaysUntilExam(subject)
  if (days === 0) return '📅 Exam is today!'
  if (days === 1) return '📅 Exam tomorrow!'
  if (days <= 14) return `📅 ${days} days until Regents`
  if (days <= 30) return `📅 ${days} days to Regents`
  return `📅 ${days} days to next Regents`
}
