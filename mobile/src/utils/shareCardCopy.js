/**
 * shareCardCopy — pure content specs for every Regentify share card variant.
 * ShareCard renders from these; ShareCardSheet uses sheetTitle/fallbackMessage.
 *
 * Variants (readiness-focused):
 *   quiz_result          — a quiz score (the original card, copy unchanged)
 *   predicted_up         — predicted Regents score improved
 *   goal_committed       — Regents goal committed (spec behind CommitmentCard)
 *   practice_exam        — practice exam completed (low scores framed positively)
 *   streak_milestone     — study streak milestone
 *   weak_topic_mastered  — a weak topic turned into a mastered one
 *
 * Privacy: specs only ever include the subject, the chosen metric, streak,
 * and a topic title — never names, emails, schools, or exam-day info.
 */

// Fixed brand palette (matches ShareCard/CommitmentCard rendering colors)
export const CARD_COLORS = {
  brand:  '#1FC36B',
  warn:   '#FFC93C',
  fire:   '#FF9600',
  purple: '#7C5CFC',
}

const PASS_SCORE = 65

/**
 * @param {string} variant
 * @param {object} p  variant props (pct, correct, total, streak, topic,
 *                    scaled, from, to, target, subjectName, …)
 * @returns {{
 *   sheetTitle, kicker, ringValue, ringLabel, ringColor,
 *   copy, subCopy, footerLine, fallbackMessage, showStreak,
 * }}
 */
export function shareCardContent(variant = 'quiz_result', p = {}) {
  const subjectName = p.subjectName ?? 'Regents'

  switch (variant) {
    case 'predicted_up': {
      const from = p.from ?? 0
      const to   = p.to ?? 0
      const delta = Math.max(0, to - from)
      return {
        sheetTitle: 'Show your climb 📈',
        kicker:     'PREDICTED REGENTS SCORE',
        ringValue:  `${to}`,
        ringLabel:  delta > 0 ? `▲ up ${delta} points` : 'and climbing',
        ringColor:  CARD_COLORS.brand,
        copy:       'My predicted score is climbing 📈',
        subCopy:    delta > 0 ? `${from} → ${to} and not done yet` : null,
        footerLine: 'Watch me pass this thing.',
        fallbackMessage:
          `My predicted ${subjectName} Regents score climbed from ${from} to ${to} on Regentify 📈`,
        showStreak: true,
      }
    }

    case 'goal_committed': {
      const target = p.target ?? 65
      return {
        sheetTitle: 'Make it official 🤝',
        kicker:     'MY REGENTS GOAL',
        ringValue:  `${target}`,
        ringLabel:  'target score',
        ringColor:  CARD_COLORS.warn,
        copy:       "I'm committing to it. 🎯",
        subCopy:    null,
        footerLine: 'Hold me to it. 🤝',
        fallbackMessage:
          `I'm committing to a ${target} on the ${subjectName} Regents. Hold me to it. 🎯`,
        showStreak: true,
      }
    }

    case 'practice_exam': {
      const scaled = p.scaled ?? null
      const passed = scaled != null && scaled >= PASS_SCORE
      if (passed) {
        return {
          sheetTitle: 'Flex your exam 💪',
          kicker:     'PRACTICE REGENTS EXAM',
          ringValue:  `${scaled}`,
          ringLabel:  'scaled score',
          ringColor:  scaled >= 85 ? CARD_COLORS.brand : CARD_COLORS.warn,
          copy:       scaled >= 85 ? 'Crushed a full practice exam 🏆' : 'Passed a full practice exam ✅',
          subCopy:    'The real thing won\'t know what hit it.',
          footerLine: 'Think you can beat me? 👀',
          fallbackMessage:
            `I scored ${scaled} on a full ${subjectName} practice Regents in Regentify ✅`,
          showStreak: true,
        }
      }
      // Low / not-yet-passing score → positive framing, no number on the card
      return {
        sheetTitle: 'Share the grind 💪',
        kicker:     'PRACTICE REGENTS EXAM',
        ringValue:  '✓',
        ringLabel:  'exam complete',
        ringColor:  CARD_COLORS.fire,
        copy:       'I found my weak spots 🔍',
        subCopy:    'Practice exam complete — now I know exactly what to fix.',
        footerLine: 'The grind is the flex. 📚',
        fallbackMessage:
          `Practice exam complete — I found my weak spots on the ${subjectName} Regents. Now I fix them. 💪`,
        showStreak: true,
      }
    }

    case 'streak_milestone': {
      const streak = p.streak ?? 0
      return {
        sheetTitle: 'Flex your streak 🔥',
        kicker:     'STUDY STREAK',
        ringValue:  `${streak}`,
        ringLabel:  streak === 1 ? 'day in a row' : 'days in a row',
        ringColor:  CARD_COLORS.fire,
        copy:       `${streak} straight days of Regents prep 🔥`,
        subCopy:    'Showing up is the whole game.',
        footerLine: 'Bet you can\'t keep up. 👀',
        fallbackMessage:
          `${streak}-day ${subjectName} study streak on Regentify 🔥 — bet you can't keep up.`,
        showStreak: false,   // the ring IS the streak — no duplicate pill
      }
    }

    case 'weak_topic_mastered': {
      const topic = p.topic ?? 'my weakest topic'
      return {
        sheetTitle: 'Flex the comeback 💪',
        kicker:     'TOPIC MASTERED',
        ringValue:  p.pct != null ? `${p.pct}%` : '★',
        ringLabel:  'mastered',
        ringColor:  CARD_COLORS.brand,
        copy:       'Turned my weakest topic into a win 💪',
        subCopy:    topic,
        footerLine: 'Weak spots don\'t stay weak. 📈',
        fallbackMessage:
          `Just mastered ${topic} — my weakest ${subjectName} topic — on Regentify 💪`,
        showStreak: true,
      }
    }

    // ── Default: the original quiz-result card (copy unchanged) ─────────────
    case 'quiz_result':
    default: {
      const pct = p.pct ?? 0
      return {
        sheetTitle: 'Flex your score 💪',
        kicker:     null,
        ringValue:  `${pct}%`,
        ringLabel:  `${p.correct ?? 0} / ${p.total ?? 0} correct`,
        ringColor:  pct >= 85 ? CARD_COLORS.brand : pct >= 65 ? CARD_COLORS.warn : CARD_COLORS.fire,
        copy:
          pct >= 95 ? 'Certified genius 🧠' :
          pct >= 85 ? 'Mastered it 🏆' :
          pct >= 65 ? 'Passed it ✅' :
          'Grinding 📚',
        subCopy:    p.topic ?? null,
        footerLine: 'Think you can beat me? 👀',
        fallbackMessage:
          `I just scored ${pct}% on ${subjectName} in Regentify 🎯` +
          ((p.streak ?? 0) > 0 ? ` (${p.streak}-day streak 🔥)` : '') +
          ' — think you can beat me?',
        showStreak: true,
      }
    }
  }
}
