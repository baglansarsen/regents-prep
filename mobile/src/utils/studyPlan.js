/**
 * studyPlan — turns the exam date a student picked into a plan they can follow.
 * Pure and deterministic: same inputs, same plan. Nothing here is stored; the
 * plan is recomputed from the goal + progress + today's date every time, so it
 * re-plans itself after missed days, score changes or a new date.
 *
 * Design: docs/designs/exam-date-study-plan.md (§3, Phase 1).
 *
 *   days before exam:  …………… learn ……………|… strengthen …|… exam prep …|final week| exam
 *                      today          coverage        −7−prep        −7        0
 *
 *   final week   last 7 days (or everything that's left when ≤ 7 days remain)
 *   exam prep    up to 14 days before the final week (half of what's left, rounded up, when short)
 *   strengthen   a fixed window before exam prep, sized by unit count (2 days/unit,
 *                7–42 days), so the coverage date doesn't drift as days pass
 *   learn        everything before that, while lessons remain
 */

// ── Defaults and constants ───────────────────────────────────────────────────
export const DEFAULT_AVAILABILITY = Object.freeze({ daysPerWeek: 5, minutesPerDay: 15 })
export const MINUTES_PER_DAY_OPTIONS = [10, 15, 25, 40, 60]
export const DEFAULT_MINUTES_PER_LESSON = 8   // matches rescuePlan's short-session sizing
export const FINAL_WEEK_DAYS = 7
export const MAX_PREP_DAYS = 14
export const PRACTICE_EXAM_MINUTES = 90
export const WEAK_UNIT_MINUTES = 20            // two focused quizzes per weak unit
export const MISTAKE_MINUTES = 1.5             // per due mistake
export const TARGET_TIERS = [65, 75, 85]

// ── Date math on calendar days (UTC day numbers: no DST or timezone drift) ───
function dayNumber(ymd) {
  if (typeof ymd !== 'string') return null
  const [y, m, d] = ymd.split('-').map(Number)
  if (!y || !m || !d) return null
  return Math.round(Date.UTC(y, m - 1, d) / 86400000)
}
function ymdOf(dayNum) {
  const dt = new Date(dayNum * 86400000)
  const p = (n) => String(n).padStart(2, '0')
  return `${dt.getUTCFullYear()}-${p(dt.getUTCMonth() + 1)}-${p(dt.getUTCDate())}`
}
/** Study days available in `calendarDays` days at `daysPerWeek` (rounded, ≥ 0). */
export function studyDaysIn(calendarDays, daysPerWeek) {
  if (calendarDays <= 0) return 0
  const dpw = Math.min(7, Math.max(1, daysPerWeek))
  return Math.max(calendarDays >= 1 ? 1 : 0, Math.round(calendarDays * dpw / 7))
}

const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n))

/**
 * Phase windows, in days from today. Exported for the timeline and for tests.
 * @returns {{ finalWeek:number, prep:number, strengthen:number, learn:number }}
 */
export function phaseWindows(daysLeft, unitCount, lessonsLeft) {
  if (daysLeft <= 0) return { finalWeek: 0, prep: 0, strengthen: 0, learn: 0 }
  if (daysLeft <= FINAL_WEEK_DAYS) return { finalWeek: daysLeft, prep: 0, strengthen: 0, learn: 0 }
  const finalWeek = FINAL_WEEK_DAYS
  const beforeFinal = daysLeft - finalWeek
  const prep = Math.min(MAX_PREP_DAYS, Math.ceil(beforeFinal / 2))
  const pre = beforeFinal - prep
  const fullStrengthen = clamp(2 * unitCount, 7, 42)
  let strengthen
  if (lessonsLeft <= 0) strengthen = pre                        // nothing new to learn
  else if (pre >= fullStrengthen * 4) strengthen = fullStrengthen // normal timeline: fixed window
  else strengthen = Math.floor(pre * 0.25)                       // short timeline: compress
  return { finalWeek, prep, strengthen, learn: pre - strengthen }
}

/**
 * Build the student's plan.
 *
 * @param {object} a
 * @param {string} a.today                 'YYYY-MM-DD' (local)
 * @param {string} a.examDateStr           'YYYY-MM-DD' — the committed session
 * @param {number} a.target                65 | 75 | 85
 * @param {{daysPerWeek:number, minutesPerDay:number}} [a.availability]
 * @param {Array<{id?, topic, title?, lessonCount?, examWeight?}>} a.units  in course order
 * @param {Object<string, number>} [a.lessonsDoneByTopic]   completed lessons per unit topic
 * @param {Array<{topic, pct:number|null, examWeight?}>} [a.topicBreakdown]  from predictRegentsScore
 * @param {number|null} [a.predicted]
 * @param {number} [a.dueCount]            mistakes due for review
 * @param {number} [a.practiceExamsTaken]
 * @param {boolean} [a.coldStart]          no data yet (checkup not taken)
 * @param {number} [a.minutesPerLesson]    measured from study time when available
 * @returns {object|null}  null when there is no usable exam date
 */
export function buildStudyPlan({
  today,
  examDateStr,
  target = 65,
  availability = DEFAULT_AVAILABILITY,
  units = [],
  lessonsDoneByTopic = {},
  topicBreakdown = [],
  predicted = null,
  dueCount = 0,
  practiceExamsTaken = 0,
  coldStart = false,
  minutesPerLesson = DEFAULT_MINUTES_PER_LESSON,
} = {}) {
  const t0 = dayNumber(today)
  const ex = dayNumber(examDateStr)
  if (t0 == null || ex == null) return null

  const avail = {
    daysPerWeek:   clamp(Math.round(availability?.daysPerWeek ?? DEFAULT_AVAILABILITY.daysPerWeek), 1, 7),
    minutesPerDay: Math.max(5, availability?.minutesPerDay ?? DEFAULT_AVAILABILITY.minutesPerDay),
  }
  const mpl = Math.max(1, minutesPerLesson || DEFAULT_MINUTES_PER_LESSON)
  const daysLeft = ex - t0

  // ── Coverage: lessons done / left, in course order ──────────────────────────
  const unitRows = units.map((u) => {
    const total = Math.max(0, u.lessonCount ?? 0)
    const done = clamp(lessonsDoneByTopic[u.topic] ?? 0, 0, total)
    return { unitId: u.id ?? u.topic, topic: u.topic, title: u.title ?? u.topic, total, done, left: total - done, examWeight: u.examWeight ?? 1 }
  })
  const lessonsTotal = unitRows.reduce((s, u) => s + u.total, 0)
  const lessonsDone  = unitRows.reduce((s, u) => s + u.done, 0)
  const lessonsLeft  = lessonsTotal - lessonsDone

  // Weak units: attempted and below the target, ranked by points available.
  const pctByTopic = new Map(topicBreakdown.map((b) => [b.topic, b]))
  const weakUnits = unitRows
    .map((u) => ({ ...u, pct: pctByTopic.get(u.topic)?.pct ?? null }))
    .filter((u) => u.pct != null && u.pct < target)
    .map((u) => ({ unitId: u.unitId, topic: u.topic, title: u.title, pct: u.pct, gap: target - u.pct, yield: (target - u.pct) * u.examWeight }))
    .sort((a, b) => b.yield - a.yield)

  // ── Passed / exam day: nothing to schedule ──────────────────────────────────
  if (daysLeft < 0 || daysLeft === 0) {
    return {
      daysLeft, studyDaysLeft: 0,
      phase: daysLeft < 0 ? 'passed' : 'exam_day',
      phases: [],
      pace: { lessonsTotal, lessonsDone, lessonsLeft, learnStudyDays: 0, lessonsPerStudyDay: 0, capacityPerStudyDay: 0, shortfallLessons: 0, status: daysLeft < 0 ? 'passed' : 'exam_day' },
      thisWeek: { units: [], weakUnits: [], reviews: 0, practiceExam: false },
      milestones: [],
      feasibility: { fits: true, minutesNeededPerDay: 0, suggestions: [] },
      todayBudgetMinutes: 0,
      availability: avail,
    }
  }

  // ── Phase windows → dates ───────────────────────────────────────────────────
  const w = phaseWindows(daysLeft, unitRows.length, lessonsLeft)
  const learnEnd      = t0 + w.learn                    // exclusive day numbers
  const strengthenEnd = learnEnd + w.strengthen
  const prepEnd       = strengthenEnd + w.prep          // = exam − finalWeek
  const phases = [
    { id: 'learn',      start: t0,            end: learnEnd },
    { id: 'strengthen', start: learnEnd,      end: strengthenEnd },
    { id: 'exam_prep',  start: strengthenEnd, end: prepEnd },
    { id: 'final_week', start: prepEnd,       end: ex },
  ].filter((p) => p.end > p.start)
   .map((p) => ({ id: p.id, start: ymdOf(p.start), end: ymdOf(p.end - 1), days: p.end - p.start }))
  const phase = phases[0]?.id ?? 'final_week'

  // ── Pace: can the learn window cover what's left at this student's minutes? ─
  const learnStudyDays      = studyDaysIn(w.learn, avail.daysPerWeek)
  const lessonsPerStudyDay  = lessonsLeft > 0 ? Math.ceil(lessonsLeft / Math.max(1, learnStudyDays)) : 0
  const capacityPerStudyDay = Math.max(1, Math.floor(avail.minutesPerDay / mpl))
  const shortfallLessons    = Math.max(0, lessonsLeft - capacityPerStudyDay * learnStudyDays)
  let status
  if (lessonsLeft === 0) status = 'on_track'
  else if (learnStudyDays === 0) status = 'at_risk'          // lessons left, no learn time
  else {
    const ratio = (lessonsPerStudyDay * mpl) / avail.minutesPerDay
    status = ratio <= 0.6 ? 'ahead' : ratio <= 1 ? 'on_track' : ratio <= 1.3 ? 'behind' : 'at_risk'
  }

  // ── Practice exams: one per full week of prep, up to 3 ──────────────────────
  const examsPlanned = (w.prep > 0 || w.finalWeek >= 3) ? Math.min(3, 1 + Math.floor(w.prep / 7)) : 0
  const examsLeft = Math.max(0, examsPlanned - practiceExamsTaken)

  // ── Feasibility over every study day until the exam ─────────────────────────
  const studyDaysLeft = studyDaysIn(daysLeft, avail.daysPerWeek)
  const minutesNeeded =
    lessonsLeft * mpl +
    weakUnits.length * WEAK_UNIT_MINUTES +
    examsLeft * PRACTICE_EXAM_MINUTES +
    Math.ceil(dueCount * MISTAKE_MINUTES)
  const minutesNeededPerDay = studyDaysLeft > 0 ? Math.ceil(minutesNeeded / studyDaysLeft) : minutesNeeded
  const fits = minutesNeededPerDay <= avail.minutesPerDay * 1.2
  const suggestions = fits ? [] : feasibilitySuggestions({
    minutesNeeded, minutesNeededPerDay, daysLeft, avail, target,
  })

  // ── This week ───────────────────────────────────────────────────────────────
  const weekStudyDays = Math.min(avail.daysPerWeek, daysLeft)
  const thisWeek = { units: [], weakUnits: [], reviews: 0, practiceExam: false }
  if (phase === 'learn') {
    let budget = lessonsPerStudyDay * weekStudyDays
    for (const u of unitRows) {
      if (budget <= 0) break
      if (u.left <= 0) continue
      const n = Math.min(u.left, budget)
      thisWeek.units.push({ unitId: u.unitId, topic: u.topic, title: u.title, lessons: n })
      budget -= n
    }
    thisWeek.reviews = Math.min(dueCount, weekStudyDays * 5)
  } else if (phase === 'strengthen') {
    thisWeek.weakUnits = weakUnits.slice(0, 2)
    thisWeek.reviews = Math.min(dueCount, weekStudyDays * 5)
  } else if (phase === 'exam_prep') {
    thisWeek.practiceExam = examsLeft > 0
    thisWeek.weakUnits = weakUnits.slice(0, 1)
    thisWeek.reviews = Math.min(dueCount, weekStudyDays * 8)
  } else {
    thisWeek.practiceExam = practiceExamsTaken === 0 && daysLeft >= 3
    thisWeek.reviews = dueCount
  }

  // ── Milestones ──────────────────────────────────────────────────────────────
  const milestones = []
  milestones.push({ id: 'checkup', date: ymdOf(t0), done: !coldStart })
  if (lessonsTotal > 0) {
    milestones.push({ id: 'all_units_covered', date: ymdOf(Math.max(t0, learnEnd - 1)), done: lessonsLeft === 0 })
  }
  const prepStart = strengthenEnd
  const examDates = [prepStart, prepStart + 7, prepStart + 14].slice(0, examsPlanned)
  examDates.forEach((d, i) => {
    milestones.push({ id: `practice_exam_${i + 1}`, date: ymdOf(Math.min(Math.max(t0, d), ex - 1)), done: practiceExamsTaken >= i + 1 })
  })
  milestones.push({ id: 'exam', date: ymdOf(ex), done: false })

  return {
    daysLeft,
    studyDaysLeft,
    phase,
    phases,
    pace: { lessonsTotal, lessonsDone, lessonsLeft, learnStudyDays, lessonsPerStudyDay, capacityPerStudyDay, shortfallLessons, status },
    thisWeek,
    milestones,
    feasibility: { fits, minutesNeededPerDay, suggestions },
    todayBudgetMinutes: avail.minutesPerDay,
    availability: avail,
    pointsToGo: predicted != null ? Math.max(0, target - predicted) : null,
  }
}

/**
 * Ways to make an infeasible plan fit, most direct first. Each names the exact
 * new value so the UI can offer it as one tap.
 */
function feasibilitySuggestions({ minutesNeeded, minutesNeededPerDay, daysLeft, avail, target }) {
  const out = []
  const minutesOption = MINUTES_PER_DAY_OPTIONS.find((m) => m >= minutesNeededPerDay && m > avail.minutesPerDay)
  if (minutesOption) out.push({ type: 'more_minutes', minutesPerDay: minutesOption })
  for (let d = avail.daysPerWeek + 1; d <= 7; d++) {
    const perDay = Math.ceil(minutesNeeded / studyDaysIn(daysLeft, d))
    if (perDay <= avail.minutesPerDay * 1.2) { out.push({ type: 'more_days', daysPerWeek: d }); break }
  }
  out.push({ type: 'later_session' })
  const lower = [...TARGET_TIERS].reverse().find((t) => t < target)
  if (lower != null) out.push({ type: 'lower_target', target: lower })
  return out
}
