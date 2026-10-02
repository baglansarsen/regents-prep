// Run with: node --test scripts/compare-jev-mistake-type.test.mjs
import test from 'node:test'
import assert from 'node:assert/strict'
import { summarize, render } from './compare-jev-mistake-type.mjs'

const doc = (id, claude, jev, confidence) => ({
  id,
  data: { result: { mistakeType: claude }, ...(jev ? { jev: { choice: jev, confidence } } : {}) },
})

test('counts agreement, confusion and bands; skips docs missing a label', () => {
  const s = summarize([
    doc('a', 'concept_gap', 'concept_gap', 0.95),
    doc('b', 'careless', 'concept_gap', 0.88),
    doc('c', 'careless', 'careless', 0.4),
    doc('d', 'careless', null),                       // pre-shadow entry, no jev
    { id: 'e', data: { result: { nudge: 'x' }, jev: { choice: 'careless', confidence: 0.9 } } }, // concept mode: no mistakeType
  ])
  assert.equal(s.n, 3)
  assert.equal(s.skipped, 2)
  assert.equal(s.agree, 2)
  assert.equal(s.confusion.careless.concept_gap, 1)
  const byBand = Object.fromEntries(s.bands.map((b) => [b.band, b]))
  assert.equal(byBand['high (>0.9)'].n, 1)
  assert.equal(byBand['medium (0.5-0.9)'].agree, 0)
  assert.equal(byBand['low (<0.5)'].rate, 1)
})

test('empty input renders without throwing', () => {
  const s = summarize([])
  assert.equal(s.rate, null)
  assert.match(render(s), /Compared: 0 documents/)
})

test('--list output flags disagreements', () => {
  const out = render(summarize([doc('x', 'careless', 'concept_gap', 0.7)]), { list: true })
  assert.match(out, /x {2}careless \/ concept_gap \/ 0.7 {2}<- differ/)
})
