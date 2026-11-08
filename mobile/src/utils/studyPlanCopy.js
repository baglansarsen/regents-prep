/**
 * Words for a study plan (utils/studyPlan.js) — kept pure so the preview card,
 * Home and reminders say the same thing and it can be tested without a screen.
 * Design: docs/designs/exam-date-study-plan.md (Phase 2).
 */
import { GOAL_TIERS } from '../data/goalConfig'

/** 'Mar 3' for '2027-03-03' (local calendar date, no timezone shift). */
export function shortDate(ymd) {
  if (!ymd) return ''
  const [y, m, d] = ymd.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export const STATUS_LABELS = {
  ahead:    'Ahead of pace',
  on_track: 'On track',
  behind:   'A bit tight',
  at_risk:  "Won't fit yet",
}

const plural = (n, one, many = `${one}s`) => `${n} ${n === 1 ? one : many}`

/**
 * @param {object|null} plan  buildStudyPlan output
 * @returns {{ headline:string, detail:string, statusLabel:string|null, status:string|null, fits:boolean }|null}
 */
export function describePlan(plan) {
  if (!plan) return null
  const { pace, phases, milestones, feasibility, availability } = plan
  const exams = milestones.filter((m) => m.id.startsWith('practice_exam')).length
  const time = `About ${availability.minutesPerDay} min, ${plural(availability.daysPerWeek, 'day')} a week.`

  if (plan.phase === 'passed') {
    return { headline: 'This exam date has passed', detail: 'Pick your next session to get a new plan.', statusLabel: null, status: null, fits: true }
  }
  if (plan.phase === 'exam_day') {
    return { headline: 'Exam day', detail: "No new studying today. You've got this.", statusLabel: null, status: null, fits: true }
  }

  if (!feasibility.fits) {
    return {
      headline: `This plan needs about ${feasibility.minutesNeededPerDay} min a day`,
      detail: `You have ${availability.minutesPerDay} min, ${plural(availability.daysPerWeek, 'day')} a week. Pick a fix:`,
      statusLabel: STATUS_LABELS.at_risk,
      status: 'at_risk',
      fits: false,
    }
  }

  const learn = phases.find((p) => p.id === 'learn')
  const examsText = exams ? `, then ${plural(exams, 'practice exam')}` : ''
  let headline
  if (pace.lessonsLeft > 0 && learn) {
    headline = pace.lessonsDone === 0
      ? `Finish all ${plural(pace.unitsLeft, 'unit')} by ${shortDate(learn.end)}${examsText}`
      : `Finish the last ${plural(pace.unitsLeft, 'unit')} by ${shortDate(learn.end)}${examsText}`
  } else if (plan.phase === 'strengthen') {
    headline = `Every unit is covered. Next: your weakest units${examsText}`
  } else if (plan.phase === 'exam_prep') {
    headline = exams ? `Exam prep: ${plural(exams, 'practice exam')} and mistake review` : 'Exam prep: mistake review'
  } else {
    headline = 'Final week: short reviews, no new units'
  }
  return {
    headline,
    detail: time,
    statusLabel: STATUS_LABELS[pace.status] ?? null,
    status: pace.status,
    fits: true,
  }
}

/**
 * Button text for a feasibility fix. `later_session` needs the next session's
 * label ("August 2027"); without one it has no button (returns null).
 */
export function suggestionLabel(s, { nextSessionLabel = null } = {}) {
  switch (s.type) {
    case 'more_minutes': return `Study ${s.minutesPerDay} min a day`
    case 'more_days':    return `Study ${s.daysPerWeek} days a week`
    case 'later_session': return nextSessionLabel ? `Take the ${nextSessionLabel} Regents instead` : null
    case 'lower_target': {
      const tier = GOAL_TIERS.find((t) => t.value === s.target)
      return `Aim for ${tier?.label ?? s.target} (${s.target})`
    }
    default: return null
  }
}

// ── Phase 3: Home line and My Plan screen ─────────────────────────────────────

export const PHASE_INFO = {
  learn:      { title: 'Learn',       blurb: 'First pass through every unit, in order.' },
  strengthen: { title: 'Strengthen',  blurb: 'Drill the units furthest below your goal.' },
  exam_prep:  { title: 'Exam prep',   blurb: 'Practice exams and mistake review.' },
  final_week: { title: 'Final week',  blurb: 'Short reviews. No new units.' },
}

const MILESTONE_TITLES = {
  checkup:           'Take the checkup',
  all_units_covered: 'Every unit covered',
  practice_exam_1:   'Practice exam 1',
  practice_exam_2:   'Practice exam 2',
  practice_exam_3:   'Practice exam 3',
  exam:              'Regents exam',
}
export const milestoneTitle = (id) => MILESTONE_TITLES[id] ?? id

const dayNum = (ymd) => {
  const [y, m, d] = (ymd ?? '').split('-').map(Number)
  return y && m && d ? Math.round(Date.UTC(y, m - 1, d) / 86400000) : null
}

/**
 * One line for Home under the countdown: "Week 6 of 33 · On track".
 * Week numbers count from when the goal was set (committedAt); without it the
 * line is just the pace. Behind / at risk name the lesson shortfall when known.
 */
export function planProgressLine(plan, { committedAt = null, today } = {}) {
  if (!plan || plan.phase === 'passed' || plan.phase === 'exam_day') return null
  let pace
  if (!plan.feasibility.fits) pace = 'Plan needs more time'
  else if ((plan.pace.status === 'behind' || plan.pace.status === 'at_risk') && plan.pace.shortfallLessons > 0) {
    pace = `${plural(plan.pace.shortfallLessons, 'lesson')} behind`
  } else pace = STATUS_LABELS[plan.pace.status] ?? null

  const start = committedAt ? dayNum(committedAt.slice(0, 10)) : null
  const now = dayNum(today)
  const exam = now != null ? now + plan.daysLeft : null
  if (start != null && now != null && exam > start && now >= start) {
    const totalWeeks = Math.max(1, Math.ceil((exam - start) / 7))
    const week = Math.min(totalWeeks, Math.floor((now - start) / 7) + 1)
    return pace ? `Week ${week} of ${totalWeeks} · ${pace}` : `Week ${week} of ${totalWeeks}`
  }
  return pace
}

/** A one-line catch-up hint for My Plan when the pace is behind. */
export function catchUpHint(plan) {
  if (!plan || plan.pace.shortfallLessons <= 0) return null
  const fix = plan.feasibility.suggestions?.find((s) => s.type === 'more_minutes' || s.type === 'more_days')
  if (fix?.type === 'more_minutes') return `To catch up, study ${fix.minutesPerDay} min a day, or add a weekend session.`
  if (fix?.type === 'more_days') return `To catch up, study ${fix.daysPerWeek} days a week.`
  return 'To catch up, add a weekend session or pick a later exam date.'
}
