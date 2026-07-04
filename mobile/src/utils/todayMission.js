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
