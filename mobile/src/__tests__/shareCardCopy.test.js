/**
 * shareCardCopy tests — content specs for the Regentify share card variants.
 * Guards the two contracts that matter: the original quiz-result copy is
 * unchanged, and low practice-exam scores are framed positively (no number).
 */
import { shareCardContent } from '../utils/shareCardCopy'

describe('quiz_result (default) — original card copy preserved', () => {
  test('ring, flex line, footer and fallback match the original card', () => {
    const spec = shareCardContent('quiz_result', {
      pct: 92, correct: 11, total: 12, streak: 5, subjectName: 'Algebra II', topic: 'Polynomials',
    })
    expect(spec.ringValue).toBe('92%')
    expect(spec.ringLabel).toBe('11 / 12 correct')
    expect(spec.copy).toBe('Mastered it 🏆')
    expect(spec.subCopy).toBe('Polynomials')
    expect(spec.footerLine).toBe('Think you can beat me? 👀')
    expect(spec.fallbackMessage).toBe(
      'I just scored 92% on Algebra II in Regentify 🎯 (5-day streak 🔥) — think you can beat me?'
    )
  })

  test('unknown variant falls back to quiz_result', () => {
    expect(shareCardContent('nonsense', { pct: 70 }).ringValue).toBe('70%')
  })

  test('flex line tiers', () => {
    expect(shareCardContent('quiz_result', { pct: 96 }).copy).toBe('Certified genius 🧠')
    expect(shareCardContent('quiz_result', { pct: 70 }).copy).toBe('Passed it ✅')
    expect(shareCardContent('quiz_result', { pct: 40 }).copy).toBe('Grinding 📚')
  })
})

describe('practice_exam — positive framing', () => {
  test('passing score shows the number', () => {
    const spec = shareCardContent('practice_exam', { scaled: 78, subjectName: 'Chemistry' })
    expect(spec.ringValue).toBe('78')
    expect(spec.copy).toContain('Passed')
  })

  test('85+ gets the crushed-it copy', () => {
    expect(shareCardContent('practice_exam', { scaled: 91 }).copy).toContain('Crushed')
  })

  test('low score: no number on the card, weak-spots framing', () => {
    const spec = shareCardContent('practice_exam', { scaled: 48, subjectName: 'Chemistry' })
    expect(spec.ringValue).toBe('✓')                       // completion, not the score
    expect(spec.ringLabel).toBe('exam complete')
    expect(spec.copy).toBe('I found my weak spots 🔍')
    expect(spec.subCopy).toContain('Practice exam complete')
    expect(spec.fallbackMessage).not.toContain('48')       // score never leaks
  })
})

describe('predicted_up', () => {
  test('shows the new score and the delta', () => {
    const spec = shareCardContent('predicted_up', { from: 58, to: 71, subjectName: 'Living Environment' })
    expect(spec.ringValue).toBe('71')
    expect(spec.ringLabel).toBe('▲ up 13 points')
    expect(spec.subCopy).toBe('58 → 71 and not done yet')
    expect(spec.fallbackMessage).toContain('58 to 71')
  })
})

describe('goal_committed', () => {
  test('target score with commitment copy', () => {
    const spec = shareCardContent('goal_committed', { target: 85, subjectName: 'Geometry' })
    expect(spec.ringValue).toBe('85')
    expect(spec.copy).toBe("I'm committing to it. 🎯")
    expect(spec.fallbackMessage).toContain('85 on the Geometry Regents')
  })
})

describe('streak_milestone', () => {
  test('streak is the ring; no duplicate streak pill', () => {
    const spec = shareCardContent('streak_milestone', { streak: 30, subjectName: 'Earth Science' })
    expect(spec.ringValue).toBe('30')
    expect(spec.ringLabel).toBe('days in a row')
    expect(spec.showStreak).toBe(false)
    expect(spec.copy).toContain('30 straight days')
  })

  test('singular day label', () => {
    expect(shareCardContent('streak_milestone', { streak: 1 }).ringLabel).toBe('day in a row')
  })
})

describe('weak_topic_mastered', () => {
  test('topic + mastery framing', () => {
    const spec = shareCardContent('weak_topic_mastered', { topic: 'Genetics', pct: 90, subjectName: 'Living Environment' })
    expect(spec.ringValue).toBe('90%')
    expect(spec.copy).toBe('Turned my weakest topic into a win 💪')
    expect(spec.subCopy).toBe('Genetics')
    expect(spec.fallbackMessage).toContain('Genetics')
  })
})

describe('privacy — specs never include personal identity', () => {
  const VARIANTS = ['quiz_result', 'predicted_up', 'goal_committed', 'practice_exam', 'streak_milestone', 'weak_topic_mastered']
  test('name/email/school props never surface in any text field', () => {
    for (const v of VARIANTS) {
      const spec = shareCardContent(v, {
        pct: 50, scaled: 50, from: 50, to: 60, target: 65, streak: 3, topic: 'Ecology',
        subjectName: 'Biology',
        name: 'Aisha Khan', email: 'aisha@school.org', school: 'Stuyvesant',
      })
      const text = [spec.copy, spec.subCopy, spec.footerLine, spec.fallbackMessage, spec.kicker].join(' ')
      expect(text).not.toContain('Aisha')
      expect(text).not.toContain('aisha@school.org')
      expect(text).not.toContain('Stuyvesant')
    }
  })
})
