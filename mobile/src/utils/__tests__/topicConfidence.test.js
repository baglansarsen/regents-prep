import { topicConfidence, CONFIDENCE_TIERS } from '../predictedScore'

const NOW = new Date('2026-08-18T12:00:00Z').getTime()
const DAY = 86_400_000
const ago = (days) => new Date(NOW - days * DAY).toISOString()

const row = (pct, days = 0) => ({ pct, timestamp: ago(days) })

describe('topicConfidence', () => {
  it('reports weak with no attempts at all', () => {
    const c = topicConfidence([], NOW)
    expect(c.tier).toBe('weak')
    expect(c.score).toBeNull()
    expect(c.attempts).toBe(0)
  })

  it('will not call a single attempt Ready, however good', () => {
    const c = topicConfidence([row(100)], NOW)
    expect(c.attempts).toBe(1)
    expect(c.tier).toBe('building')
  })

  it('reaches Ready on repeated recent high scores', () => {
    const c = topicConfidence([row(90, 3), row(95, 1)], NOW)
    expect(c.tier).toBe('ready')
    expect(c.label).toBe('Ready')
  })

  it('weights recent attempts above old ones — the core fix', () => {
    // Best-ever pct would call both of these 100. Confidence must not.
    const improving = topicConfidence([row(40, 10), row(100, 1)], NOW)
    const declining = topicConfidence([row(100, 10), row(40, 1)], NOW)
    expect(improving.score).toBeGreaterThan(declining.score)
  })

  it('does not let one old good score mask a run of recent misses', () => {
    const c = topicConfidence([row(100, 30), row(30, 3), row(35, 1)], NOW)
    expect(c.tier).toBe('weak')
  })

  it('decays a stale topic out of Ready even with perfect scores', () => {
    const fresh = topicConfidence([row(100, 2), row(100, 1)], NOW)
    const stale = topicConfidence([row(100, 40), row(100, 39)], NOW)
    expect(fresh.tier).toBe('ready')
    expect(stale.tier).not.toBe('ready')
    expect(stale.score).toBeLessThan(fresh.score)
    expect(stale.daysSince).toBe(39)
  })

  it('treats a row with no timestamp as today — optimistic rows are newest', () => {
    const c = topicConfidence([{ pct: 90 }, { pct: 95 }], NOW)
    expect(c.daysSince).toBe(0)
    expect(c.tier).toBe('ready')
  })

  it('survives a malformed timestamp instead of producing NaN', () => {
    const c = topicConfidence([{ pct: 80, timestamp: 'not-a-date' }, row(80, 1)], NOW)
    expect(Number.isFinite(c.score)).toBe(true)
  })

  it('accepts a Firestore Timestamp-shaped value', () => {
    const ts = { toDate: () => new Date(NOW - DAY) }
    const c = topicConfidence([{ pct: 88, timestamp: ts }, { pct: 92, timestamp: ts }], NOW)
    expect(c.daysSince).toBe(1)
    expect(Number.isFinite(c.score)).toBe(true)
  })

  it('clamps out-of-range percentages', () => {
    const c = topicConfidence([row(-50), row(150)], NOW)
    expect(c.score).toBeGreaterThanOrEqual(0)
    expect(c.score).toBeLessThanOrEqual(100)
  })

  it('returns a tier descriptor the UI can render directly', () => {
    const c = topicConfidence([row(50, 1), row(55, 0)], NOW)
    expect(c.tier).toBe('weak')
    expect(c.emoji).toBe(CONFIDENCE_TIERS.weak.emoji)
    expect(c.color).toBe(CONFIDENCE_TIERS.weak.color)
  })
})
