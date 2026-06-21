import { useCallback, useState } from 'react'
import { httpsCallable } from 'firebase/functions'
import { functions } from '../firebase'

const callExplain = httpsCallable(functions, 'explainMistake')

const sessionCache = new Map()

export function questionKey(q) {
  return q.id ?? q.text?.slice(0, 60) ?? String(q.number ?? Math.random())
}

export function correctIndexOf(q) {
  return q.correct ?? q.correctIndex ?? 0
}

export function useTutor() {
  const [state, setState] = useState({ loading: false, data: null, error: null })

  const explain = useCallback(async (question, wrongIdx, { hard = false } = {}) => {
    const qKey = questionKey(question)
    const key = `${qKey}__${wrongIdx}`
    if (sessionCache.has(key)) {
      const data = sessionCache.get(key)
      setState({ loading: false, data, error: null })
      return data
    }

    setState({ loading: true, data: null, error: null })
    try {
      const { data } = await callExplain({
        questionKey: qKey,
        wrongIdx,
        correctIdx: correctIndexOf(question),
        question: question.text,
        choices: question.choices,
        context: question.context ?? '',
        explanation: question.explanation ?? '',
        diveDeep: question.diveDeep ?? '',
        subTopic: question.subTopic ?? question.topic ?? '',
        hard,
      })
      sessionCache.set(key, data)
      setState({ loading: false, data, error: null })
      return data
    } catch (error) {
      console.warn('[useTutor] explain callable failed:', error)
      setState({ loading: false, data: null, error })
      return null
    }
  }, [])

  const reset = useCallback(() => setState({ loading: false, data: null, error: null }), [])

  return { ...state, explain, reset }
}
