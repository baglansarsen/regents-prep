/**
 * jev — TypeSafe Jev helper for explainMistake's shadow-mode classification.
 *
 * Asks Jev the same question Claude answers as `mistakeType` (which of the five
 * MISTAKE_TYPES explains this miss) so the two can be compared offline before
 * anything depends on Jev. Fails open: any error, timeout or malformed answer
 * returns null and never affects the tutor response.
 *
 * Only public Regents question content is sent — never a uid or any student data.
 * Docs: https://docs.typesafe.ai/api.md
 */

const ENDPOINT = 'https://api.typesafe.ai/v1/systemone'
const MODEL = 'jev-latest'
const TIMEOUT_MS = 4000
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

// Keep in sync with MISTAKE_TYPES in index.js (and mobile/src/utils/reviewQueue.js).
const MISTAKE_CRITERIA = {
  concept_gap: "The student doesn't yet understand the underlying idea.",
  careless: 'The student knew the method but slipped (sign, arithmetic, transcription).',
  reading_trap: 'The student misread the question or answered a different question than the one asked.',
  formula_setup: 'Right concept, but the wrong formula, setup, or units.',
  test_strategy: 'A testing error: ran out of patience, guessed, or fell for the most familiar-looking choice.',
}

export function buildMistakeRequest({ question, choices, correctIdx, wrongIdx, explanation = '', context = '', subTopic = '' }) {
  return {
    model: MODEL,
    state: {
      stimulus: context || undefined,
      topic: subTopic || undefined,
      question,
      choices: choices.map((c, i) => `${LETTERS[i]}. ${c}`),
      correctChoice: LETTERS[correctIdx],
      studentChoice: LETTERS[wrongIdx],
      officialExplanation: explanation || undefined,
    },
    questions: {
      mistakeType: {
        type: 'choice',
        instructions:
          "Why did the student pick the wrong choice? Pick the single best fit; if several fit equally, prefer the one a teacher would coach first.",
        criteria: MISTAKE_CRITERIA,
      },
    },
  }
}

/**
 * @returns {Promise<{choice: string, probabilities: object, confidence: number}|null>}
 */
export async function classifyMistake({ apiKey, input, fetchImpl = fetch, timeoutMs = TIMEOUT_MS }) {
  if (!apiKey) return null
  try {
    const res = await fetchImpl(ENDPOINT, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(buildMistakeRequest(input)),
      signal: AbortSignal.timeout(timeoutMs),
    })
    if (!res.ok) return null
    const answer = (await res.json())?.answers?.mistakeType
    if (answer?.type !== 'choice' || !(answer.choice in MISTAKE_CRITERIA)) return null
    return { choice: answer.choice, probabilities: answer.probabilities ?? {}, confidence: answer.confidence ?? null }
  } catch {
    return null
  }
}
