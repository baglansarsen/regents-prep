/**
 * schoolLeaderboard tests — the pure ranking + school-name logic behind the
 * weekly school leaderboard (hooks/useLeaderboard.js).
 */
import { normalizeSchoolName, rankSchoolWeekly } from '../utils/schoolLeaderboard'

const WEEK = '2026-W27'

describe('normalizeSchoolName', () => {
  test('a real school name passes through (trimmed)', () => {
    expect(normalizeSchoolName('Stuyvesant High School')).toBe('Stuyvesant High School')
    expect(normalizeSchoolName('  Bronx Science ')).toBe('Bronx Science')
  })

  test('the onboarding "skip" sentinel counts as no school', () => {
    expect(normalizeSchoolName('Independent')).toBeNull()
  })

  test('missing / empty values count as no school', () => {
    expect(normalizeSchoolName(null)).toBeNull()
    expect(normalizeSchoolName(undefined)).toBeNull()
    expect(normalizeSchoolName('')).toBeNull()
    expect(normalizeSchoolName('   ')).toBeNull()
  })
})

describe('rankSchoolWeekly', () => {
  test('ranks by this-week RP descending', () => {
    const rows = rankSchoolWeekly([
      { uid: 'a', displayName: 'Ana', weeklyXP: 50,  weekKey: WEEK, xp: 500 },
      { uid: 'b', displayName: 'Bo',  weeklyXP: 120, weekKey: WEEK, xp: 200 },
    ], WEEK)
    expect(rows.map((r) => r.uid)).toEqual(['b', 'a'])
    expect(rows[0].weeklyXP).toBe(120)
  })

  test('stale weeklyXP from a past week counts as 0', () => {
    const rows = rankSchoolWeekly([
      { uid: 'stale', displayName: 'Old', weeklyXP: 999, weekKey: '2026-W20', xp: 100 },
      { uid: 'live',  displayName: 'New', weeklyXP: 10,  weekKey: WEEK,       xp: 50 },
    ], WEEK)
    expect(rows[0].uid).toBe('live')
    expect(rows.find((r) => r.uid === 'stale').weeklyXP).toBe(0)
  })

  test('ties broken by all-time RP', () => {
    const rows = rankSchoolWeekly([
      { uid: 'lowTotal',  weeklyXP: 30, weekKey: WEEK, xp: 100 },
      { uid: 'highTotal', weeklyXP: 30, weekKey: WEEK, xp: 900 },
    ], WEEK)
    expect(rows.map((r) => r.uid)).toEqual(['highTotal', 'lowTotal'])
  })

  test('caps the result and defaults missing names', () => {
    const docs = Array.from({ length: 40 }, (_, i) => ({
      uid: `u${i}`, weeklyXP: i, weekKey: WEEK, xp: 0,
    }))
    const rows = rankSchoolWeekly(docs, WEEK, 25)
    expect(rows).toHaveLength(25)
    expect(rows[0].displayName).toBe('Student')
  })

  test('exposes only display-safe fields (no platform/subscription/tier leak)', () => {
    const rows = rankSchoolWeekly([
      {
        uid: 'a', displayName: 'Ana', weeklyXP: 10, weekKey: WEEK, xp: 100,
        platform: 'ios', isSubscribed: true, tier: 'gold', lastWeekXP: 77,
      },
    ], WEEK)
    expect(Object.keys(rows[0]).sort()).toEqual(['displayName', 'totalXP', 'uid', 'weeklyXP'])
  })

  test('empty input → empty ranking', () => {
    expect(rankSchoolWeekly([], WEEK)).toEqual([])
    expect(rankSchoolWeekly(undefined, WEEK)).toEqual([])
  })
})
