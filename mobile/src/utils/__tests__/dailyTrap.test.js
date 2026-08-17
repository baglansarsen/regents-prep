import { pickDailyTrap, trapDoneKey, trapHookFor } from '../dailyTrap'

const bare      = { text: 'plain', choices: ['a', 'b', 'c', 'd'], correct: 0 }
const explained = { text: 'expl',  choices: ['a', 'b', 'c', 'd'], correct: 1, explanation: 'why' }
const rich      = { text: 'rich',  choices: ['a', 'b', 'c', 'd'], correct: 2, explanation: 'why', diveDeep: 'deep' }
const richer    = { text: 'trap',  choices: ['a', 'b', 'c', 'd'], correct: 3, explanation: 'why', diveDeep: 'deep', difficulty: 'hard' }

describe('pickDailyTrap', () => {
  test('prefers the most metadata-rich tier', () => {
    const q = pickDailyTrap({
      questions: [bare, explained, rich, richer],
      subject: 'living-environment',
      dateStr: '2026-07-12',
    })
    expect(q).toBe(richer)
  })

  test('deterministic for the same subject + date, varies across days', () => {
    const pool = Array.from({ length: 30 }, (_, i) => ({
      text: `q${i}`, choices: ['a', 'b', 'c', 'd'], correct: i % 4, explanation: 'e', diveDeep: 'd',
    }))
    const a1 = pickDailyTrap({ questions: pool, subject: 'chemistry', dateStr: '2026-07-12' })
    const a2 = pickDailyTrap({ questions: pool, subject: 'chemistry', dateStr: '2026-07-12' })
    expect(a1).toBe(a2)
    const days = new Set(
      ['2026-07-12', '2026-07-13', '2026-07-14', '2026-07-15', '2026-07-16']
        .map((d) => pickDailyTrap({ questions: pool, subject: 'chemistry', dateStr: d }).text),
    )
    expect(days.size).toBeGreaterThan(1)   // rotates across days
  })

  test('skips written and malformed questions', () => {
    const q = pickDailyTrap({
      questions: [
        { text: 'w', type: 'written' },
        { text: 'no-correct', choices: ['a', 'b'] },
        bare,
      ],
      subject: 'english', dateStr: '2026-07-12',
    })
    expect(q).toBe(bare)
  })

  test('accepts correctIndex-style questions', () => {
    const ci = { text: 'ci', choices: ['a', 'b'], correctIndex: 1 }
    expect(pickDailyTrap({ questions: [ci], subject: 's', dateStr: 'd' })).toBe(ci)
  })

  test('empty pool → null', () => {
    expect(pickDailyTrap({ questions: [], subject: 's', dateStr: 'd' })).toBeNull()
    expect(pickDailyTrap()).toBeNull()
  })
})

describe('storage key + hooks', () => {
  test('key includes uid, subject, and local date', () => {
    expect(trapDoneKey('u1', 'algebra-1', '2026-07-12')).toBe('@dailyTrap_v1_u1_algebra-1_2026-07-12')
  })

  test('every subject has a hook, unknown subjects get the fallback', () => {
    expect(trapHookFor('physics')).toContain('units')
    expect(typeof trapHookFor('not-a-subject')).toBe('string')
    expect(trapHookFor('not-a-subject').length).toBeGreaterThan(10)
  })
})
