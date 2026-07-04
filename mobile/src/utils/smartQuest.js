/**
 * smartQuest — picks today's daily quest based on the student's Regents goal,
 * calendar context, and study habits. Pure function; returns null when the
 * regular QUEST_TYPES rotation should be used instead (e.g. no goal set), so
 * non-goal users see exactly the behavior they had before.
 *
 * Returned quest defs are self-describing ({id,label,goal,icon,action,rp,topic?})
 * and get persisted into the daily quest record by usePet.getTodayQuest, so a
 * quest in progress survives day-context changes.
 */

import { PRACTICE_EXAM_WINDOW_DAYS } from './studyConstants'

/**
 * @param {object} args
 * @param {boolean} args.hasGoal
 * @param {boolean} args.coldStart             no quiz/exam history yet
 * @param {number}  args.daysToExam            days until the goal's exam date
 * @param {number}  args.dayOfWeek             new Date().getDay() — 0 Sun … 6 Sat
 * @param {boolean} args.studiedYesterday
 * @param {boolean} args.hasTakenPracticeExam  any exam score recorded for this subject
 * @param {{topic:string, title:string}|null} args.weakestUnit  weakest ATTEMPTED unit
 * @returns {object|null} quest def, or null → fall back to the standard rotation
 */
export function pickSmartQuest({
  hasGoal = false,
  coldStart = false,
  daysToExam = 999,
  dayOfWeek = new Date().getDay(),
  studiedYesterday = true,
  hasTakenPracticeExam = false,
  weakestUnit = null,
} = {}) {
  if (!hasGoal) return null

  // Cold start — no data means no smart advice; the Today's Mission card owns
  // this state (checkup), and a smart quest here would contradict it.
  if (coldStart) return null

  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

  // ① Exam is close and they've never sat a practice exam — nothing predicts
  //    readiness better than a real attempt. In the final week, resurface a
  //    practice exam every other day even if they've taken one.
  if (daysToExam <= PRACTICE_EXAM_WINDOW_DAYS && !hasTakenPracticeExam) {
    return {
      id: 'practice_exam', icon: '📝', action: 'complete_exam', goal: 1, rp: 60,
      label: 'Take a practice Regents exam',
    }
  }
  if (daysToExam <= 7 && hasTakenPracticeExam && dayOfWeek % 2 === 0) {
    return {
      id: 'practice_exam', icon: '📝', action: 'complete_exam', goal: 1, rp: 60,
      label: 'Take another practice exam — lock it in',
    }
  }

  // ② Missed yesterday — a gentle on-ramp beats a guilt trip.
  if (!studiedYesterday) {
    return {
      id: 'comeback', icon: '🌱', action: 'answer_correct', goal: 3, rp: 30,
      label: 'Ease back in — 3 correct answers',
    }
  }

  // ③ Weekend — more time, bigger quest, bigger reward.
  if (isWeekend) {
    return {
      id: 'weekend_grind', icon: '💪', action: 'answer_correct', goal: 10, rp: 50,
      label: 'Weekend grind — 10 correct answers',
    }
  }

  // ④ Weekday — chip away at the weakest topic.
  if (weakestUnit?.topic) {
    return {
      id: `focus_${weakestUnit.topic}`, icon: '🎯', action: 'complete_quiz_topic',
      topic: weakestUnit.topic, goal: 1, rp: 30,
      label: `Complete a ${weakestUnit.title ?? 'weak-topic'} quiz`,
    }
  }

  // ⑤ Nothing smarter to say — use the regular rotation.
  return null
}
