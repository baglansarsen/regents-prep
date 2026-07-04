/**
 * smartQuest tests — the priority matrix for the goal-aware daily quest.
 */
import { pickSmartQuest } from '../utils/smartQuest'

const WEAK = { topic: 'genetics', title: 'Genetics' }

// A baseline weekday context where nothing special applies except the focus quest.
const base = {
  hasGoal: true,
  daysToExam: 60,
  dayOfWeek: 2,              // Tuesday
  studiedYesterday: true,
  hasTakenPracticeExam: true,
  weakestUnit: WEAK,
}

describe('pickSmartQuest', () => {
  test('no goal → null (regular rotation, behavior unchanged)', () => {
    expect(pickSmartQuest({ ...base, hasGoal: false })).toBeNull()
  })

  test('cold start → null even with exam close (mission card owns the checkup)', () => {
    expect(pickSmartQuest({
      ...base, coldStart: true, daysToExam: 10, hasTakenPracticeExam: false,
    })).toBeNull()
  })

  test('exam ≤14 days + never took a practice exam → practice-exam quest (beats everything)', () => {
    const q = pickSmartQuest({
      ...base, daysToExam: 10, hasTakenPracticeExam: false,
      studiedYesterday: false, dayOfWeek: 6,   // would otherwise be comeback/weekend
    })
    expect(q.id).toBe('practice_exam')
    expect(q.action).toBe('complete_exam')
    expect(q.rp).toBe(60)
  })

  test('final week: practice exam resurfaces on even days even when one was taken', () => {
    expect(pickSmartQuest({ ...base, daysToExam: 5, dayOfWeek: 2 }).id).toBe('practice_exam')
    // odd day → falls through to the weekday focus quest
    expect(pickSmartQuest({ ...base, daysToExam: 5, dayOfWeek: 3 }).id).toBe('focus_genetics')
  })

  test('missed yesterday → gentle comeback quest', () => {
    const q = pickSmartQuest({ ...base, studiedYesterday: false })
    expect(q.id).toBe('comeback')
    expect(q.goal).toBe(3)
  })

  test('weekend → bigger quest with bigger reward', () => {
    const sat = pickSmartQuest({ ...base, dayOfWeek: 6 })
    const sun = pickSmartQuest({ ...base, dayOfWeek: 0 })
    expect(sat.id).toBe('weekend_grind')
    expect(sun.id).toBe('weekend_grind')
    expect(sat.goal).toBe(10)
    expect(sat.rp).toBe(50)
  })

  test('weekday → weakest-topic focus quest, topic-scoped action', () => {
    const q = pickSmartQuest(base)
    expect(q.id).toBe('focus_genetics')
    expect(q.action).toBe('complete_quiz_topic')
    expect(q.topic).toBe('genetics')
    expect(q.label).toContain('Genetics')
  })

  test('priority: comeback beats weekend', () => {
    const q = pickSmartQuest({ ...base, dayOfWeek: 0, studiedYesterday: false })
    expect(q.id).toBe('comeback')
  })

  test('weekday with no weakest unit → null (rotation)', () => {
    expect(pickSmartQuest({ ...base, weakestUnit: null })).toBeNull()
  })
})
