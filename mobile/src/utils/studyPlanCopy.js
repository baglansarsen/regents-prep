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
