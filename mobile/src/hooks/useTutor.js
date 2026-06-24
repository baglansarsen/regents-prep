/**
 * useTutor — grounded "why was I wrong?" explanations for a missed question.
 *
 * Calls the `explainMistake` Cloud Function (which holds the Anthropic key and
 * does the Firestore result-caching). The question's authoritative answer +
 * explanation are sent as context, so the tutor personalizes — it never
 * decides the answer. Returns three escalating levels: nudge → method →
 * explanation (a Socratic ladder the UI reveals progressively).
 */
import { useCallback, useState } from 'react'
import { httpsCallable } from 'firebase/functions'
import { functions } from '../firebase'
import { correctIndexOf } from '../utils/question'
import { questionKey } from '../utils/reviewQueue'

const callExplain = httpsCallable(functions, 'explainMistake')

// Process-lifetime cache so re-opening the same mistake in a session is instant
// and free (the function also caches in Firestore across users/sessions).
const sessionCache = new Map()

export function useTutor() {
  const [state, setState] = useState({ loading: false, data: null, error: null })

  const explain = useCallback(async (question, wrongIdx, { hard = false, mode = 'mistake' } = {}) => {
    // Concept mode (correct answer, "go deeper") has one shared result per
    // question; mistake mode is keyed per wrong choice. Match the backend.
    const key = `${questionKey(question)}__${mode === 'concept' ? 'concept' : wrongIdx}`
    if (sessionCache.has(key)) {
      const data = sessionCache.get(key)
      setState({ loading: false, data, error: null })
      return data
    }

    setState({ loading: true, data: null, error: null })
    try {
      const { data } = await callExplain({
        questionKey: questionKey(question),
        wrongIdx,
        correctIdx: correctIndexOf(question),
        question: question.text,
        choices: question.choices,
        context: question.context ?? '',
        explanation: question.explanation ?? '',
        diveDeep: question.diveDeep ?? '',
        subTopic: question.subTopic ?? question.topic ?? '',
        hard,
        mode,
      })
      sessionCache.set(key, data)
      setState({ loading: false, data, error: null })
      return data
    } catch (error) {
      setState({ loading: false, data: null, error })
      return null
    }
  }, [])

  const reset = useCallback(() => setState({ loading: false, data: null, error: null }), [])

  return { ...state, explain, reset }
}
