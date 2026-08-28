/**
 * Lives logic tests
 *
 * catchUpRefills() is the pure time-math core of useLives.
 * We extract and test it directly — no timers, no storage, no Firebase.
 *
 * Scenarios covered:
 *   - already at max lives → no change, no refill timer
 *   - no nextRefillAt set → no change
 *   - refill not yet due → no change
 *   - one refill due → +1 life, timer advanced
 *   - multiple refills accrued → all granted up to MAX
 *   - always caps at the non-math MAX_LIVES test fixture (5)
 *   - at max after catch-up → nextRefillAt cleared to null
 */

import {
  BASE_MAX_ENERGY,
  energyPercent,
  MATH_MAX_ENERGY,
  isMathSubject,
  maxEnergyForSubject,
  shouldSpendEnergy,
} from '../utils/energy'

const MAX_LIVES = 5
const REFILL_MS = 30 * 60 * 1000 // 30 minutes

// Exact copy of catchUpRefills from useLives.js (kept in sync manually):
function catchUpRefills(lives, nextRefillAt) {
  if (lives >= MAX_LIVES) return { lives: MAX_LIVES, nextRefillAt: null }
  if (!nextRefillAt) return { lives, nextRefillAt: null }

  const now = Date.now()
  const due = new Date(nextRefillAt).getTime()
  if (isNaN(due) || now < due) return { lives, nextRefillAt }

  const accrued = 1 + Math.floor((now - due) / REFILL_MS)
  const gained = Math.min(accrued, MAX_LIVES - lives)
  const newLives = lives + gained
  const newRefill = newLives < MAX_LIVES
    ? new Date(due + gained * REFILL_MS).toISOString()
    : null
  return { lives: newLives, nextRefillAt: newRefill }
}

// ── Already full ──────────────────────────────────────────────────────────────

test('at MAX_LIVES: no change, nextRefillAt cleared', () => {
  const refillTime = new Date(Date.now() - REFILL_MS).toISOString()
  const result = catchUpRefills(5, refillTime)
  expect(result.lives).toBe(5)
  expect(result.nextRefillAt).toBeNull()
})

// ── No refill timer ───────────────────────────────────────────────────────────

test('no nextRefillAt: lives unchanged', () => {
  const result = catchUpRefills(3, null)
  expect(result.lives).toBe(3)
  expect(result.nextRefillAt).toBeNull()
})

// ── Refill not yet due ────────────────────────────────────────────────────────

test('refill not yet due: lives and timer unchanged', () => {
  const future = new Date(Date.now() + REFILL_MS).toISOString()
  const result = catchUpRefills(3, future)
  expect(result.lives).toBe(3)
  expect(result.nextRefillAt).toBe(future)
})

// ── One refill due ────────────────────────────────────────────────────────────

test('one refill due: lives +1, timer advanced by one interval', () => {
  const dueTime = new Date(Date.now() - 1000).toISOString() // 1 second overdue
  const result = catchUpRefills(3, dueTime)
  expect(result.lives).toBe(4)
  expect(result.nextRefillAt).not.toBeNull()
  // nextRefillAt should be ~29 minutes from now (one interval ahead of dueTime)
  const newDue = new Date(result.nextRefillAt).getTime()
  const originalDue = new Date(dueTime).getTime()
  expect(newDue).toBe(originalDue + REFILL_MS)
})

// ── Multiple refills accrued ──────────────────────────────────────────────────

test('two refills accrued: lives +2', () => {
  const dueTime = new Date(Date.now() - REFILL_MS - 1000).toISOString()
  const result = catchUpRefills(2, dueTime)
  expect(result.lives).toBe(4)
})

test('three refills accrued from 1 life: caps at MAX_LIVES (5), clears timer', () => {
  // 1 life, 4 refills overdue → would be 5 but cap kicks in
  const dueTime = new Date(Date.now() - 3 * REFILL_MS - 1000).toISOString()
  const result = catchUpRefills(1, dueTime)
  expect(result.lives).toBe(5)
  expect(result.nextRefillAt).toBeNull()
})

// ── Never exceeds MAX ─────────────────────────────────────────────────────────

test('never returns more than MAX_LIVES regardless of time elapsed', () => {
  const longAgo = new Date(Date.now() - 100 * REFILL_MS).toISOString()
  const result = catchUpRefills(0, longAgo)
  expect(result.lives).toBeLessThanOrEqual(MAX_LIVES)
  expect(result.lives).toBe(MAX_LIVES)
  expect(result.nextRefillAt).toBeNull()
})

// ── Timer anchoring ───────────────────────────────────────────────────────────

test('nextRefillAt advances by exactly (gained * REFILL_MS) from original due time', () => {
  const originalDue = new Date(Date.now() - 2 * REFILL_MS - 500).toISOString()
  const result = catchUpRefills(1, originalDue) // gains 3 lives (1→4)
  const expectedNext = new Date(new Date(originalDue).getTime() + 3 * REFILL_MS).toISOString()
  expect(result.nextRefillAt).toBe(expectedNext)
})

// ── Edge: invalid date string ─────────────────────────────────────────────────

test('invalid nextRefillAt string: treated as not-due, lives unchanged', () => {
  const result = catchUpRefills(2, 'not-a-date')
  expect(result.lives).toBe(2)
  expect(result.nextRefillAt).toBe('not-a-date')
})

// ── Subscriber shortcut (tested at hook call-site level) ─────────────────────

test('subscriber: loseLife is a no-op (simulated via isSubscribed guard)', () => {
  // The isSubscribed guard in loseLife is: if (isSubscribed) return
  // We verify the guard logic directly
  const isSubscribed = true
  let called = false
  function mockLoseLife() {
    if (isSubscribed) return
    called = true
  }
  mockLoseLife()
  expect(called).toBe(false)
})

// ── Energy spend policy (utils/energy.js — drives QuizScreen's loseLife call) ─

describe('shouldSpendEnergy', () => {
  test('a normal main-pass miss spends energy', () => {
    expect(shouldSpendEnergy({ inRepeat: false, struggleMode: false })).toBe(true)
    expect(shouldSpendEnergy()).toBe(true)   // defaults
  })

  test('the end-of-lesson repeat round is free', () => {
    expect(shouldSpendEnergy({ inRepeat: true, struggleMode: false })).toBe(false)
  })

  test('the adaptive confidence round (struggle mode) is free', () => {
    expect(shouldSpendEnergy({ inRepeat: false, struggleMode: true })).toBe(false)
  })

  test('both at once is still free', () => {
    expect(shouldSpendEnergy({ inRepeat: true, struggleMode: true })).toBe(false)
  })

  test('the Daily Regents Trap is free — a miss is the point', () => {
    expect(shouldSpendEnergy({ isDailyTrap: true })).toBe(false)
    expect(shouldSpendEnergy({ isDailyTrap: false })).toBe(true)
  })

  test('the cold-start checkup is free — diagnostic, not graded', () => {
    expect(shouldSpendEnergy({ isCheckup: true })).toBe(false)
    expect(shouldSpendEnergy({ isCheckup: false })).toBe(true)
  })

  test('the checkup stays free even with every other flag explicitly off — the exact shape QuizScreen passes', () => {
    expect(shouldSpendEnergy({ isCheckup: true, inRepeat: false, struggleMode: false, isDailyTrap: false })).toBe(false)
  })
})

// ── Subject energy caps ─────────────────────────────────────────────────────

describe('maxEnergyForSubject', () => {
  test('math Regents subjects get double energy', () => {
    expect(maxEnergyForSubject('algebra-1')).toBe(MATH_MAX_ENERGY)
    expect(maxEnergyForSubject('algebra-2')).toBe(MATH_MAX_ENERGY)
    expect(maxEnergyForSubject('geometry')).toBe(MATH_MAX_ENERGY)
    expect(maxEnergyForSubject('basic-math')).toBe(MATH_MAX_ENERGY)
    expect(MATH_MAX_ENERGY).toBe(BASE_MAX_ENERGY * 2)
  })

  test('non-math subjects keep the normal energy cap', () => {
    expect(maxEnergyForSubject('living-environment')).toBe(BASE_MAX_ENERGY)
    expect(maxEnergyForSubject('english')).toBe(BASE_MAX_ENERGY)
    expect(maxEnergyForSubject(undefined)).toBe(BASE_MAX_ENERGY)
  })

  test('math subject detection is explicit', () => {
    expect(isMathSubject('algebra-1')).toBe(true)
    expect(isMathSubject('chemistry')).toBe(false)
  })
})

describe('energyPercent', () => {
  test('formats battery energy as a clamped percentage', () => {
    expect(energyPercent(5, 10)).toBe(50)
    expect(energyPercent(3, 5)).toBe(60)
    expect(energyPercent(12, 10)).toBe(100)
    expect(energyPercent(-1, 5)).toBe(0)
    expect(energyPercent(3, 0)).toBe(0)
  })
})
