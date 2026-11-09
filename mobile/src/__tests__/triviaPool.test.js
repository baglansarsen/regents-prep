// The pet trivia question changes at local midnight, not UTC midnight.
import { getDayQuestion } from '../data/triviaPool'

const POOL = Array.from({ length: 7 }, (_, i) => ({ id: i, choices: ['a', 'b'] }))
const at = (...args) => { jest.setSystemTime(new Date(...args)); return getDayQuestion(POOL).id }

beforeEach(() => jest.useFakeTimers())
afterEach(() => jest.useRealTimers())

test('same question all local day, including the evening', () => {
  const morning = at(2026, 10, 8, 9, 0)
  expect(at(2026, 10, 8, 19, 30)).toBe(morning)
  expect(at(2026, 10, 8, 23, 59)).toBe(morning)
})

test('a new question after local midnight', () => {
  expect(at(2026, 10, 9, 0, 1)).not.toBe(at(2026, 10, 8, 12, 0))
})

test('skips questions without choices; empty pool is null', () => {
  jest.setSystemTime(new Date(2026, 10, 8, 12))
  expect(getDayQuestion([{ id: 'x' }])).toBeNull()
  expect(getDayQuestion([])).toBeNull()
})
