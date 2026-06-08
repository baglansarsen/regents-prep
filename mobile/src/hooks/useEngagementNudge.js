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

function getHomeNudge({ streak, studiedToday, hasFreeze, weekDays, todayRP, goal, goalMet }) {
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
    return { message: `Daily goal crushed — ${todayRP} RP today!`, emoji: '🎯', type: 'success' }
  }

  if (studiedToday && !goalMet) {
    const remaining = Math.max(0, goal - todayRP)
    return {
      message: `${todayRP} RP so far — ${remaining} more to hit your goal!`,
      emoji: '⚡',
      type: 'info',
    }
  }

  return null
}

function getResultsNudge({ pct, rpEarned, rp, level }) {
  // Check if close to next level
  if (level.next && level.next.min - rp <= 100 && level.next.min - rp > 0) {
    const gap = level.next.min - rp
    return {
      message: `Only ${gap} RP to reach ${level.next.name}!`,
      emoji: '⬆️',
      type: 'info',
    }
  }

  if (pct >= 85) {
    return {
      message: `Top score! ${rpEarned} RP earned. 🔥`,
      emoji: '🌟',
      type: 'success',
    }
  }

  if (pct >= 65) {
    return {
      message: `Nice work! ${rpEarned} RP added.`,
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

function getProfileNudge({ streak, longestStreak, weeklyRP }) {
  if (streak >= longestStreak && streak > 0) {
    return {
      message: `Personal best: ${streak}-day streak!`,
      emoji: '🏆',
      type: 'success',
    }
  }

  if (weeklyRP >= 200) {
    return {
      message: `${weeklyRP} RP this week — great momentum!`,
      emoji: '📈',
      type: 'success',
    }
  }

  const streakText = streak > 0 ? `${streak}-day streak` : 'No streak yet'
  return {
    message: `${streakText} · ${weeklyRP} RP this week`,
    emoji: '📊',
    type: 'info',
  }
}

