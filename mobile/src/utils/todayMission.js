/**
 * todayMission — picks the single highest-priority action a student should
 * take right now, based on their Regents goal state, predicted score, exam
 * countdown, mistake queue, and lesson path progress.
 *
 * Pure function (constants-only imports, no side effects) — mirrors the
 * pattern of predictedScore.js and smartQuest.js so it stays unit-testable.
 *
 * Callers supply all inputs; HomeScreen drives it via useMemo.
 */

import { MASTERY_MIN, PRACTICE_EXAM_WINDOW_DAYS } from './studyConstants'

const ICONS = {
  set_goal:       '🎯',
  checkup:        '🔍',
  practice_exam:  '📝',
  review_mistakes:'🩹',
  weak_unit_quiz: '💪',
  next_lesson:    '▶️',
}

/**
 * @param {object} args
 * @param {boolean} args.hasGoal              — a Regents goal has been committed
 * @param {boolean} args.coldStart            — no quiz/exam history yet (prediction unavailable)
 * @param {number|null} args.daysToExam       — days until the committed (or next) exam session
 * @param {boolean} args.hasTakenPracticeExam — any practice-exam score recorded for this subject
 * @param {number}  args.dueCount             — number of mistake-queue items currently due
 * @param {{topic:string, title:string, pct:number|null, attempts:number}|null} args.weakestUnit
 *   — the weakest ATTEMPTED unit (weakestAttemptedUnitOf); null until the student
 *     has attempted at least one unit, so fresh topics fall through to next_lesson.
 *
 * @returns {{
 *   id:              string,
 *   icon:            string,
 *   title:           string,
 *   subtitle:        string,
 *   cta:             string,
 *   priority:        number,     // 1 = highest
 *   actionType:      string,     // 'set_goal' | 'checkup' | 'practice_exam' |
 *                                //  'review_mistakes' | 'weak_unit_quiz' | 'next_lesson'
 *   topic:           string|null, // set only for weak_unit_quiz
 *   estimatedMinutes: number,
 * }}
 */
export function pickTodayMission({
  hasGoal              = false,
  coldStart            = false,
  daysToExam           = null,
  hasTakenPracticeExam = false,
  dueCount             = 0,
  weakestUnit          = null,
} = {}) {
  // ① No goal set — nothing else is actionable without one
  if (!hasGoal) {
    return {
      id:               'set_goal',
      icon:             ICONS.set_goal,
      title:            'Set your Regents goal',
      subtitle:         'Tell me your target score and exam date to unlock personalized missions.',
      cta:              'Set Goal',
      priority:         1,
      actionType:       'set_goal',
      topic:            null,
      estimatedMinutes: 1,
    }
  }

  // ② Cold start — student has a goal but no data to estimate from yet
  if (coldStart) {
    return {
      id:               'checkup',
      icon:             ICONS.checkup,
      title:            'Take a quick checkup',
      subtitle:         'Answer a few questions so I can estimate where you stand.',
      cta:              'Start Checkup',
      priority:         2,
      actionType:       'checkup',
      topic:            null,
      estimatedMinutes: 10,
    }
  }

  // ③ Exam is close and they've never taken a full practice exam
  if (daysToExam != null && daysToExam <= PRACTICE_EXAM_WINDOW_DAYS && !hasTakenPracticeExam) {
    return {
      id:               'practice_exam',
      icon:             ICONS.practice_exam,
      title:            'Take a practice Regents exam',
      subtitle:         `${daysToExam} day${daysToExam === 1 ? '' : 's'} to go — find out where you really stand.`,
      cta:              'Start Practice Exam',
      priority:         3,
      actionType:       'practice_exam',
      topic:            null,
      estimatedMinutes: 90,
    }
  }

  // ④ Mistakes are queued — clear gaps before learning new material
  if (dueCount > 0) {
    return {
      id:               'review_mistakes',
      icon:             ICONS.review_mistakes,
      title:            'Review your mistakes',
      subtitle:         `${dueCount} ${dueCount === 1 ? 'item' : 'items'} queued — close the gaps first.`,
      cta:              'Review Now',
      priority:         4,
      actionType:       'review_mistakes',
      topic:            null,
      estimatedMinutes: 8,
    }
  }

  // ⑤ There's an attempted but under-mastered topic — drill it
  if (weakestUnit && weakestUnit.pct != null && weakestUnit.pct < MASTERY_MIN) {
    return {
      id:               `weak_unit_${weakestUnit.topic}`,
      icon:             ICONS.weak_unit_quiz,
      title:            `Strengthen ${weakestUnit.title}`,
      subtitle:         `Your weakest topic right now — a focused quiz will move the needle fast.`,
      cta:              'Start Quiz',
      priority:         5,
      actionType:       'weak_unit_quiz',
      topic:            weakestUnit.topic,
      estimatedMinutes: 10,
    }
  }

  // ⑥ All clear — keep moving forward on the learning path
  return {
    id:               'next_lesson',
    icon:             ICONS.next_lesson,
    title:            'Continue your lessons',
    subtitle:         'Keep making progress on the learning path.',
    cta:              'Continue',
    priority:         6,
    actionType:       'next_lesson',
    topic:            null,
    estimatedMinutes: 5,
  }
}

// ── Today's Pass Plan ────────────────────────────────────────────────────────

const PLAN_ICONS = {
  ...ICONS,
  drill_set:   '🎯',
  flashcards:  '🃏',
  study_notes: '📖',
}

/** Free, energy-exempt work — what to offer when the tank is empty. */
const RECOVERY_ACTIONS = new Set(['flashcards', 'study_notes', 'review_mistakes'])

function task(over) {
  return {
    icon: PLAN_ICONS[over.actionType] ?? '•',
    topic: null,
    estimatedMinutes: 5,
    ...over,
  }
}

/**
 * Build the day's plan: up to three concrete tasks instead of one, headlined by
 * the score gap so the work is visibly attached to the outcome the student
 * cares about ("+8 points to reach 75").
 *
 * Composition — one of each, so the day mixes recall, instruction, and practice:
 *   ① fix     — the weakest skill or the queued mistakes
 *   ② learn   — the next lesson, or notes when energy is low
 *   ③ practice— a short question set
 *
 * Energy shapes the OFFER, not the gate: at `recover` the plan only proposes
 * work that costs nothing, so a student at zero energy is never handed a task
 * that dead-ends in a refill sheet.
 *
 * Pure — no storage, no navigation. HomeScreen maps actionType → runMission.
 *
 * @param {number|null} predicted  — current predicted scaled score
 * @param {number|null} target     — the committed goal score
 * @param {'recover'|'steady'|'push'} band — from energyBand()
 * @param {number} setSize         — questions in the practice set
 * @returns {{ pointsToGo:number|null, headline:string, tasks:Array }}
 */
export function buildTodayPlan({
  hasGoal              = false,
  coldStart            = false,
  daysToExam           = null,
  hasTakenPracticeExam = false,
  dueCount             = 0,
  weakestUnit          = null,
  nextLessonTopic      = null,
  predicted            = null,
  target               = null,
  band                 = 'steady',
  setSize              = 5,
} = {}) {
  const lead = pickTodayMission({ hasGoal, coldStart, daysToExam, hasTakenPracticeExam, dueCount, weakestUnit })

  // Before a goal or any data exists there is no plan to build — the single
  // onboarding action IS the plan, and inventing two more would be noise.
  if (lead.actionType === 'set_goal' || lead.actionType === 'checkup') {
    return { pointsToGo: null, headline: lead.title, tasks: [task(lead)], lead }
  }

  const pointsToGo = predicted != null && target != null ? Math.max(0, Math.round(target - predicted)) : null
  const headline =
    pointsToGo == null ? 'Your plan for today'
    : pointsToGo === 0 ? `You're at ${target} — hold it there`
    : `You need +${pointsToGo} to reach ${target}`

  const recovering = band === 'recover'
  const tasks = []

  // ① Fix — queued mistakes first (they're free and already diagnosed), else
  //    drill the weakest attempted topic.
  if (dueCount > 0) {
    tasks.push(task({
      id: 'plan_review', actionType: 'review_mistakes',
      title: 'Clear your gaps',
      subtitle: `${dueCount} ${dueCount === 1 ? 'item' : 'items'} due — the fastest points you'll get.`,
      cta: 'Review', estimatedMinutes: 8,
    }))
  } else if (weakestUnit?.topic) {
    tasks.push(task({
      id: `plan_weak_${weakestUnit.topic}`,
      actionType: recovering ? 'flashcards' : 'weak_unit_quiz',
      title: recovering ? `Flashcards: ${weakestUnit.title}` : `Drill ${weakestUnit.title}`,
      subtitle: recovering
        ? 'Low energy — recall practice costs nothing and still counts.'
        : 'Your weakest topic — the single biggest score mover.',
      cta: recovering ? 'Practice' : 'Drill it',
      topic: weakestUnit.topic, estimatedMinutes: 8,
    }))
  }

  // ② Learn — one piece of new instruction, or notes if energy is low.
  tasks.push(task({
    id: recovering ? 'plan_study' : 'plan_lesson',
    actionType: recovering ? 'study_notes' : 'next_lesson',
    title: recovering ? 'Read one concept' : 'One mini lesson',
    subtitle: recovering
      ? 'No energy needed — build the idea now, drill it when you recharge.'
      : 'Keep the learning path moving.',
    cta: recovering ? 'Read' : 'Start',
    topic: nextLessonTopic, estimatedMinutes: 6,
  }))

  // ③ Practice — a short set to convert the day's work into retrieval.
  //    Skipped entirely while recovering; it would hit the energy gate.
  if (!recovering) {
    tasks.push(task({
      id: 'plan_set', actionType: 'drill_set',
      title: `${setSize}-question set`,
      subtitle: band === 'push'
        ? 'Full tank — mixed questions under exam conditions.'
        : 'A quick mixed set to lock in today.',
      cta: 'Practice', topic: weakestUnit?.topic ?? null, estimatedMinutes: 6,
    }))
  }

  // Never propose the same action twice (e.g. weak-topic drill + set on the
  // same topic reads as one task listed twice).
  const seen = new Set()
  const deduped = tasks.filter((t) => {
    const k = `${t.actionType}:${t.topic ?? ''}`
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })

  return { pointsToGo, headline, tasks: deduped.slice(0, 3), lead }
}

/** True when an action can run with an empty energy tank. */
export function isEnergyFree(actionType) {
  return RECOVERY_ACTIONS.has(actionType)
}

/**
 * Which of today's tasks are already done.
 *
 * DERIVED, deliberately — not a checklist the app writes when you tap a task.
 * Launching something isn't finishing it, and a stored "done" flag would drift
 * from reality the first time a student backs out of a quiz. Everything here is
 * read from work the student actually completed today.
 *
 *   topicsQuizzedToday — topics with a quiz result recorded today ('' for mixed)
 *   lessonDoneToday    — a lesson-linked quiz was completed today
 *   dueCount           — items still due in the mistake queue (0 ⇒ gaps cleared)
 *
 * Actions with no completion signal (flashcards, reading, a 90-minute practice
 * exam that spans sessions) are intentionally never marked done rather than
 * guessed at — a false checkmark is worse than none.
 *
 * @returns {{ doneIds: Set<string>, done: number, total: number }}
 */
export function planProgress(tasks = [], { topicsQuizzedToday = [], lessonDoneToday = false, dueCount = 0 } = {}) {
  const quizzed = new Set(topicsQuizzedToday)
  const anyQuizToday = quizzed.size > 0
  const doneIds = new Set()

  for (const t of tasks) {
    switch (t.actionType) {
      case 'review_mistakes':
        if (dueCount === 0) doneIds.add(t.id)
        break
      case 'weak_unit_quiz':
        if (t.topic && quizzed.has(t.topic)) doneIds.add(t.id)
        break
      case 'drill_set':
      case 'checkup':
        if (anyQuizToday) doneIds.add(t.id)
        break
      case 'next_lesson':
        if (lessonDoneToday) doneIds.add(t.id)
        break
      default:
        break   // no reliable signal — leave unmarked
    }
  }

  return { doneIds, done: doneIds.size, total: tasks.length }
}
