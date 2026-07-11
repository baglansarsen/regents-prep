/**
 * rescuePlan — a lightweight "get me ready" mode for students close to their
 * Regents. Two quick questions produce a plan profile:
 *
 *   { urgency: 'week' | 'month' | 'long', targetMode: 'pass' | 'boost' | 'mastery' }
 *
 * stored on the goal entry (GoalContext → goals[subject].rescuePlan).
 * pickRescueAction() then maps today's signals to ONE mission-shaped daily
 * recommendation — same actionTypes as pickTodayMission, so HomeScreen's
 * runMission dispatcher works unchanged.
 *
 * Pure module (no imports) — unit-testable like todayMission.js.
 * Copy rule: supportive and teen-friendly. Urgent ≠ scary.
 */

// ── Question options (rendered by the Rescue Plan sheet) ─────────────────────
export const URGENCY_OPTIONS = [
  { value: 'week',  label: 'This week',        blurb: "Crunch time — let's make every minute count", icon: '⚡' },
  { value: 'month', label: '2–4 weeks',        blurb: 'Enough time for a real glow-up',              icon: '📆' },
  { value: 'long',  label: 'More than a month', blurb: 'Plenty of runway — build it brick by brick', icon: '🌱' },
]

export const TARGET_MODE_OPTIONS = [
  { value: 'pass',    label: 'Just pass',  blurb: 'Get over the 65 line, no drama', icon: '✅' },
  { value: 'boost',   label: '75+',        blurb: 'A score you can be proud of',    icon: '🚀' },
  { value: 'mastery', label: '85+',        blurb: 'Going for mastery — respect',    icon: '🏆' },
]

// Sensible defaults so the sheet opens pre-answered (one tap to confirm)
export function urgencyFromDays(days) {
  if (days == null) return 'long'
  if (days <= 7) return 'week'
  if (days <= 30) return 'month'
  return 'long'
}

export function targetModeFromTarget(target) {
  if (target >= 85) return 'mastery'
  if (target >= 75) return 'boost'
  return 'pass'
}

// Plan headline shown on the mission card (kicker) — supportive, not scary
export function planLabelOf(plan) {
  if (!plan) return 'RESCUE PLAN'
  const { urgency, targetMode } = plan
  if (urgency === 'week') {
    return targetMode === 'pass' ? 'EMERGENCY PASS PLAN'
      : targetMode === 'boost' ? 'FINAL-WEEK 75+ PUSH'
      : 'FINAL-WEEK MASTERY PUSH'
  }
  if (urgency === 'month') {
    return targetMode === 'pass' ? 'PASS PLAN · 4 WEEKS'
      : targetMode === 'boost' ? '75+ PLAN · 4 WEEKS'
      : '85+ PLAN · 4 WEEKS'
  }
  return targetMode === 'pass' ? 'STEADY PASS PLAN'
    : targetMode === 'boost' ? 'STEADY 75+ PLAN'
    : 'STEADY 85+ PLAN'
}

// How weak does a topic have to be before the plan flags it?
// Pass mode only chases the worst gaps; mastery chases everything under 85.
const WEAK_THRESHOLD = { pass: 65, boost: 75, mastery: 85 }

// Focused-session length by urgency — crunch time means short, doable reps
const MINUTES = { week: 8, month: 12, long: 15 }

/**
 * One daily recommendation from the plan + today's signals.
 * Mission-shaped: { id, icon, title, subtitle, cta, actionType, topic,
 * estimatedMinutes, priority, rescue: true, planLabel }.
 *
 * @param {object} args
 * @param {{urgency:string,targetMode:string}} args.plan
 * @param {number|null} args.daysToExam
 * @param {{topic,title,pct,attempts}|null} args.weakestUnit  weakest ATTEMPTED unit
 * @param {number}  args.dueCount               mistake-queue items due
 * @param {boolean} args.hasTakenPracticeExam
 */
export function pickRescueAction({
  plan,
  daysToExam = null,
  weakestUnit = null,
  dueCount = 0,
  hasTakenPracticeExam = false,
} = {}) {
  const { urgency = 'month', targetMode = 'pass' } = plan ?? {}
  const minutes   = MINUTES[urgency] ?? 12
  const planLabel = planLabelOf({ urgency, targetMode })
  const base = { rescue: true, planLabel, priority: 1, topic: null }

  const weakIsActionable =
    weakestUnit && weakestUnit.pct != null && weakestUnit.pct < (WEAK_THRESHOLD[targetMode] ?? 75)

  // ── Crunch week: fastest points first — patch mistakes, then worst gap ─────
  if (urgency === 'week') {
    if (dueCount > 0) {
      return {
        ...base,
        id:               'rescue_mistakes',
        icon:             '🩹',
        title:            'Today: win back easy points',
        subtitle:         `${dueCount} ${dueCount === 1 ? 'question' : 'questions'} you've missed before — nailing them now is the fastest score boost there is.`,
        cta:              `Fix Them (${minutes} min)`,
        actionType:       'review_mistakes',
        estimatedMinutes: minutes,
      }
    }
    if (weakIsActionable) {
      return {
        ...base,
        id:               `rescue_weak_${weakestUnit.topic}`,
        icon:             '🎯',
        title:            'Today: fix your highest-value weak spot',
        subtitle:         `${weakestUnit.title} is where the most points are hiding. You need ${minutes} focused minutes — that's it.`,
        cta:              `Let's Go (${minutes} min)`,
        actionType:       'weak_unit_quiz',
        topic:            weakestUnit.topic,
        estimatedMinutes: minutes,
      }
    }
    if (!hasTakenPracticeExam && daysToExam != null && daysToExam >= 3) {
      return {
        ...base,
        id:               'rescue_exam',
        icon:             '📝',
        title:            'Today: one practice run',
        subtitle:         'One full practice exam shows exactly where your points are — no surprises on the real day.',
        cta:              'Start Practice Exam',
        actionType:       'practice_exam',
        estimatedMinutes: 90,
      }
    }
    return {
      ...base,
      id:               'rescue_reps',
      icon:             '💪',
      title:            'Today: quick confidence reps',
      subtitle:         `You're in good shape — a short mixed set keeps everything fresh. ${minutes} minutes and you're done.`,
      cta:              `Quick Reps (${minutes} min)`,
      actionType:       'next_lesson',
      estimatedMinutes: minutes,
    }
  }

  // ── 2–4 weeks / longer: diagnose first, then drill gaps, then patch ────────
  if (!hasTakenPracticeExam) {
    return {
      ...base,
      id:               'rescue_exam',
      icon:             '📝',
      title:            'Step 1: find your points',
      subtitle:         "A practice exam isn't a test of you — it's a map of exactly what to study next.",
      cta:              'Take the Practice Exam',
      actionType:       'practice_exam',
      estimatedMinutes: 90,
    }
  }
  if (weakIsActionable) {
    return {
      ...base,
      id:               `rescue_weak_${weakestUnit.topic}`,
      icon:             '🎯',
      title:            'Today: fix your highest-value weak spot',
      subtitle:         `${weakestUnit.title} is your biggest point mine right now. ${minutes} focused minutes moves the needle.`,
      cta:              `Let's Go (${minutes} min)`,
      actionType:       'weak_unit_quiz',
      topic:            weakestUnit.topic,
      estimatedMinutes: minutes,
    }
  }
  if (dueCount > 0) {
    return {
      ...base,
      id:               'rescue_mistakes',
      icon:             '🩹',
      title:            'Today: clean up old misses',
      subtitle:         `${dueCount} ${dueCount === 1 ? 'question' : 'questions'} queued for review — locking these in keeps your score climbing.`,
      cta:              `Review Now (${minutes} min)`,
      actionType:       'review_mistakes',
      estimatedMinutes: minutes,
    }
  }
  return {
    ...base,
    id:               'rescue_reps',
    icon:             '🌟',
    title:            "Today: keep the streak of W's",
    subtitle:         `Nothing urgent to patch — you're genuinely on track. A ${minutes}-minute session keeps it that way.`,
    cta:              `Keep Rolling (${minutes} min)`,
    actionType:       'next_lesson',
    estimatedMinutes: minutes,
  }
}
