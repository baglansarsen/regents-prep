// Run with: cd functions && node --test
import test from 'node:test'
import assert from 'node:assert/strict'
import { buildMistakeRequest, classifyMistake } from './jev.js'

const input = {
  question: 'What is 2+2?', choices: ['3', '4', '5'], correctIdx: 1, wrongIdx: 2,
  explanation: 'Basic addition.', subTopic: 'arithmetic',
}

const okResponse = (answer) => ({ ok: true, json: async () => ({ answers: { mistakeType: answer } }) })

test('request carries no uid and maps indices to letters', () => {
  const body = buildMistakeRequest(input)
  assert.equal(body.state.correctChoice, 'B')
  assert.equal(body.state.studentChoice, 'C')
  assert.deepEqual(Object.keys(body.questions.mistakeType.criteria), [
    'concept_gap', 'careless', 'reading_trap', 'formula_setup', 'test_strategy',
  ])
  assert.ok(!JSON.stringify(body).includes('uid'))
})

test('returns choice, probabilities and confidence', async () => {
  const fetchImpl = async () => okResponse({ type: 'choice', choice: 'careless', probabilities: { careless: 0.9 }, confidence: 0.8 })
  const out = await classifyMistake({ apiKey: 'k', input, fetchImpl })
  assert.deepEqual(out, { choice: 'careless', probabilities: { careless: 0.9 }, confidence: 0.8 })
})

test('fails open: no key, HTTP error, throw, unknown label', async () => {
  const warn = () => {}
  assert.equal(await classifyMistake({ apiKey: '', input, warn, fetchImpl: async () => assert.fail('no call') }), null)
  assert.equal(await classifyMistake({ apiKey: 'k', input, warn, fetchImpl: async () => ({ ok: false }) }), null)
  assert.equal(await classifyMistake({ apiKey: 'k', input, warn, fetchImpl: async () => { throw new Error('net') } }), null)
  const bad = async () => okResponse({ type: 'choice', choice: 'nonsense' })
  assert.equal(await classifyMistake({ apiKey: 'k', input, warn, fetchImpl: bad }), null)
})

test('logs the failure reason without leaking the key or question content', async () => {
  const lines = []
  const warn = (m) => lines.push(m)
  const secret = 'sk-SECRET-123'
  await classifyMistake({ apiKey: '', input, warn })
  await classifyMistake({ apiKey: secret, input, warn, fetchImpl: async () => ({ ok: false, status: 401 }) })
  const timeout = Object.assign(new Error(`aborted ${secret}`), { name: 'TimeoutError' })
  await classifyMistake({ apiKey: secret, input, warn, fetchImpl: async () => { throw timeout } })
  await classifyMistake({ apiKey: secret, input, warn, fetchImpl: async () => okResponse({ type: 'choice', choice: 'nonsense' }) })
  assert.deepEqual(lines, [
    '[jev] skipped: no API key',
    '[jev] unavailable: HTTP 401',
    '[jev] unavailable: TimeoutError',
    '[jev] unusable answer: type=choice choice=nonsense',
  ])
  const all = lines.join('\n')
  assert.ok(!all.includes(secret) && !all.includes(input.question))
})
