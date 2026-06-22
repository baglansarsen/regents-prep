/**
 * useEssayGrader — AI grading for a written / constructed-response answer.
 *
 * Calls the `gradeWriting` Cloud Function (which holds the Anthropic key). The
 * question's authoritative modelAnswer + explanation are sent as context, so the
 * grader scores against them rather than deciding the answer itself. Returns a
 * score out of the question's points plus targeted feedback.
 *
 * Mirrors useTutor. The session cache is keyed by question + the exact answer
 * text, so re-grading an unchanged answer is instant and free; a different answer
 * is a fresh grade (each student answer is unique — the function does not cache).
 */
import { useCallback, useState } from 'react'
import { httpsCallable } from 'firebase/functions'
import { functions } from '../firebase'
import { questionKey } from '../utils/reviewQueue'

const callGrade = httpsCallable(functions, 'gradeWriting')

const sessionCache = new Map()

export function useEssayGrader() {
  const [state, setState] = useState({ loading: false, data: null, error: null })

  const grade = useCallback(async (question, studentAnswer, subject = '') => {
    const answer = (studentAnswer ?? '').trim()
    if (!answer) return null

    const key = `${questionKey(question)}__${answer}`
    if (sessionCache.has(key)) {
      const data = sessionCache.get(key)
      setState({ loading: false, data, error: null })
      return data
    }

    setState({ loading: true, data: null, error: null })
    try {
      const { data } = await callGrade({
        questionKey: questionKey(question),
        question: question.text,
        studentAnswer: answer,
        modelAnswer: question.modelAnswer ?? '',
        explanation: question.explanation ?? '',
        diveDeep: question.diveDeep ?? '',
        subTopic: question.subTopic ?? question.topic ?? '',
        maxPoints: question.maxPoints ?? 1,
        subject,
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

  return { ...state, grade, reset }
}
