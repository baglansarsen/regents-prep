/**
 * goalNotifications — identifier-based local notifications for the Regents
 * goal system. Every entry point lazy-requires expo-notifications and no-ops
 * when the native module is absent (web / Expo Go / stripped builds) — same
 * guard pattern as hooks/useNotifications.js.
 *
 * Identifier scheme (each schedule call replaces its own identifier, so these
 * never collide with the daily reminder or pet notifications):
 *   goal-exam-30 / -14 / -7 / -3 / -1   one-shot exam countdown alerts
 *   goal-streak-risk                    one-shot "streak ends tonight"
 *   goal-weekly-report                  repeating Sunday-evening summary
 */

let Notifications = null
function getNotifications() {
  if (Notifications) return Notifications
  try {
    Notifications = require('expo-notifications')
    return Notifications
  } catch (e) {
    return null
  }
}

const COUNTDOWN_DAYS = [30, 14, 7, 3, 1]
const GOAL_IDS = [
  ...COUNTDOWN_DAYS.map((d) => `goal-exam-${d}`),
  'goal-streak-risk',
  'goal-weekly-report',
]

async function cancelId(N, identifier) {
  try { await N.cancelScheduledNotificationAsync(identifier) } catch {}
}

/**
 * One-shot countdown alerts at 4 PM local, N days before the exam.
 * Past trigger dates are skipped (e.g. goal set 10 days out → only 7/3/1 fire).
 */
export async function scheduleExamCountdowns({ examDateStr, target, subjectName }) {
  const N = getNotifications()
  if (!N || !examDateStr) return
  const [y, m, d] = examDateStr.split('-').map(Number)

  for (const days of COUNTDOWN_DAYS) {
    const id = `goal-exam-${days}`
    await cancelId(N, id)
    const fireAt = new Date(y, m - 1, d - days, 16, 0, 0)   // 4 PM local
    if (fireAt <= new Date()) continue
    try {
      await N.scheduleNotificationAsync({
        identifier: id,
        content: {
          title: days === 1 ? '🚨 Regents tomorrow!' : `⏳ ${days} days until your Regents`,
          body:  days === 1
            ? `${subjectName} is tomorrow. Light review tonight, then rest — you've got this.`
            : `${subjectName} Regents in ${days} days — goal: ${target}. A session today keeps you on track.`,
          sound: true,
        },
        trigger: { date: fireAt },
      })
    } catch {}
  }
}

/**
 * "Streak ends at midnight" — one-shot at 8 PM local, today only.
 * Re-evaluated on every scheduler pass: cancelled the moment today's study
 * happens, (re)scheduled while it hasn't.
 */
export async function scheduleStreakRisk({ studiedToday, streak }) {
  const N = getNotifications()
  if (!N) return
  await cancelId(N, 'goal-streak-risk')
  if (studiedToday || streak <= 0) return

  const fireAt = new Date()
  fireAt.setHours(20, 0, 0, 0)   // 8 PM local
  if (fireAt <= new Date()) return   // already past 8 PM — don't nag late
  try {
    await N.scheduleNotificationAsync({
      identifier: 'goal-streak-risk',
      content: {
        title: '🔥 Streak at risk!',
        body:  `Your ${streak}-day streak ends at midnight — 5 minutes of practice saves it.`,
        sound: true,
      },
      trigger: { date: fireAt },
    })
  } catch {}
}

/**
 * Weekly progress report — Sunday 5 PM local, repeating.
 * Body is baked at schedule time; the scheduler bridge re-runs this daily so
 * the numbers stay at most a day stale.
 * NOTE: expo-notifications calendar weekday is 1 = Sunday.
 */
export async function scheduleWeeklyReport({ body }) {
  const N = getNotifications()
  if (!N) return
  await cancelId(N, 'goal-weekly-report')
  try {
    await N.scheduleNotificationAsync({
      identifier: 'goal-weekly-report',
      content: {
        title: '📈 Your week in review',
        body,
        sound: true,
      },
      trigger: { weekday: 1, hour: 17, minute: 0, repeats: true },
    })
  } catch {}
}

/** Remove every goal-system notification (goal cleared / notifications off). */
export async function cancelGoalNotifications() {
  const N = getNotifications()
  if (!N) return
  for (const id of GOAL_IDS) await cancelId(N, id)
}
