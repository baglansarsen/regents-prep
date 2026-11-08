/**
 * combinedPlan — the week across every subject with a goal (study plan Phase 5).
 * Pure. Each subject keeps its own plan and study time; this adds them up and
 * flags the two things one subject's plan can't see: a heavy total day, and
 * exams close enough that their exam-prep weeks overlap.
 * Design: docs/designs/exam-date-study-plan.md §6.
 */

/** Above this many minutes a day in total, say so (two 40-min subjects is fine, three isn't). */
export const HEAVY_DAY_MINUTES = 90
/** Exams this close share exam prep (prep + final week = 21 days). */
export const OVERLAP_DAYS = 21

const dayNum = (ymd) => {
  const [y, m, d] = (ymd ?? '').split('-').map(Number)
  return y && m && d ? Math.round(Date.UTC(y, m - 1, d) / 86400000) : null
}

/**
 * @param {Array<{subject, name, goal, plan}>} entries  from useAllStudyPlans
 * @returns {{ rows, totalMinutesPerDay, totalMinutesPerWeek, warnings }}
 */
export function combinePlans(entries = []) {
  const rows = entries.map(({ subject, name, goal, plan }) => {
    if (!plan) {
      return { subject, name, examDateStr: goal.examDateStr, daysLeft: null, phase: 'passed', status: 'passed', minutesPerDay: 0, minutesPerWeek: 0 }
    }
    const { minutesPerDay, daysPerWeek } = plan.availability
    // A plan that doesn't fit really needs more than the student set aside.
    const perDay = plan.feasibility.fits ? minutesPerDay : Math.max(minutesPerDay, plan.feasibility.minutesNeededPerDay)
    return {
      subject, name, examDateStr: goal.examDateStr, daysLeft: plan.daysLeft,
      phase: plan.phase,
      status: plan.feasibility.fits ? plan.pace.status : 'at_risk',
      minutesPerDay: perDay,
      minutesPerWeek: perDay * daysPerWeek,
    }
  }).sort((a, b) => (a.daysLeft ?? Infinity) - (b.daysLeft ?? Infinity))

  const active = rows.filter((r) => r.status !== 'passed')
  const totalMinutesPerDay  = active.reduce((s, r) => s + r.minutesPerDay, 0)
  const totalMinutesPerWeek = active.reduce((s, r) => s + r.minutesPerWeek, 0)

  const warnings = []
  if (active.length > 1 && totalMinutesPerDay > HEAVY_DAY_MINUTES) {
    warnings.push({ type: 'heavy_day', minutes: totalMinutesPerDay })
  }
  for (let i = 0; i < active.length; i++) {
    for (let j = i + 1; j < active.length; j++) {
      const a = dayNum(active[i].examDateStr), b = dayNum(active[j].examDateStr)
      if (a == null || b == null) continue
      const apart = Math.abs(a - b)
      if (apart <= OVERLAP_DAYS) {
        const month = new Date(Date.UTC(1970, 0, 1) + Math.min(a, b) * 86400000).toLocaleDateString('en-US', { month: 'long', timeZone: 'UTC' })
        warnings.push({ type: 'exam_overlap', first: active[i].name, second: active[j].name, daysApart: apart, month })
      }
    }
  }
  for (const r of active.filter((x) => x.status === 'at_risk')) {
    warnings.push({ type: 'at_risk', name: r.name })
  }
  return { rows, totalMinutesPerDay, totalMinutesPerWeek, warnings }
}

/** "1h 15m", "45 min" */
export function formatMinutes(m) {
  if (m < 60) return `${m} min`
  const h = Math.floor(m / 60), r = m % 60
  return r ? `${h}h ${r}m` : `${h}h`
}

export function warningText(w) {
  switch (w.type) {
    case 'heavy_day':
      return `That's about ${formatMinutes(w.minutes)} a day across your subjects. If that's too much, lower the minutes for the subject whose exam is furthest away.`
    case 'exam_overlap':
      // Same date usually means the same session: exam dates are still computed
      // estimates (one Tuesday for every subject), so don't claim "same day".
      return w.daysApart === 0
        ? `${w.first} and ${w.second} are both in the ${w.month} session, so their exam prep overlaps. Start practice exams for one of them a week early.`
        : `${w.first} and ${w.second} are ${w.daysApart} ${w.daysApart === 1 ? 'day' : 'days'} apart, so their exam prep overlaps. Start practice exams for one of them a week early.`
    case 'at_risk':
      return `${w.name}'s plan doesn't fit its study time yet. Open it to pick a fix.`
    default:
      return null
  }
}
