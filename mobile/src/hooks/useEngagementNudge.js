export function getEngagementNudge(context, data) {
  if (context === 'home') {
    return getHomeNudge(data)
  } else if (context === 'results') {
    return getResultsNudge(data)
  } else if (context === 'profile') {
    return getProfileNudge(data)
  }
  return null
}

function getHomeNudge({ streak, studiedToday, hasFreeze, weekDays, todayXP, goal, goalMet }) {
  // Skip if freeze banner would show
  if (streak >= 3 && !studiedToday && !hasFreeze) {
    return null
  }

  // Skip if milestone modal would show
  if ([3, 7, 14, 30].includes(streak) && studiedToday) {
    return null
  }

  // Priority rules
  if (!studiedToday && streak === 0) {
    return { message: 'Start your first streak today!', emoji: '🌱', type: 'info' }
  }

  if (!studiedToday && streak > 0) {
    return { message: `Keep your ${streak}-day streak alive!`, emoji: '🔥', type: 'warning' }
  }

  if (studiedToday && goalMet) {
    return { message: `Daily goal crushed — ${todayXP} XP today!`, emoji: '🎯', type: 'success' }
  }

  if (studiedToday && !goalMet) {
    const remaining = Math.max(0, goal - todayXP)
    return {
      message: `${todayXP} XP so far — ${remaining} more to hit your goal!`,
      emoji: '⚡',
      type: 'info',
    }
  }

  return null
}

function getResultsNudge({ pct, xpEarned, rp  level }) {
  // Check if close to next level
  if (level.next && level.next.min - rp <= 100 && level.next.min - rp > 0) {
    const gap = level.next.min - xp
    return {
      message: `Only ${gap} XP to reach ${level.next.name}!`,
      emoji: '⬆️',
      type: 'info',
    }
  }

  if (pct >= 85) {
    return {
      message: `Top score! ${xpEarned} XP earned. 🔥`,
      emoji: '🌟',
      type: 'success',
    }
  }

  if (pct >= 65) {
    return {
      message: `Nice work! ${xpEarned} XP added.`,
      emoji: '✅',
      type: 'success',
    }
  }

  return {
    message: "Review the misses and try again — you've got this!",
    emoji: '💪',
    type: 'warning',
  }
}

function getProfileNudge({ streak, longestStreak, weeklyXP }) {
  if (streak >= longestStreak && streak > 0) {
    return {
      message: `Personal best: ${streak}-day streak!`,
      emoji: '🏆',
      type: 'success',
    }
  }

  if (weeklyXP >= 200) {
    return {
      message: `${weeklyXP} XP this week — great momentum!`,
      emoji: '📈',
      type: 'success',
    }
  }

  const streakText = streak > 0 ? `${streak}-day streak` : 'No streak yet'
  return {
    message: `${streakText} · ${weeklyXP} XP this week`,
    emoji: '📊',
    type: 'info',
  }
}
