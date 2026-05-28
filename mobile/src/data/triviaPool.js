import { questions } from './questions'

export const TRIVIA_POOL = questions.slice(0, 50)

export function getDayQuestion() {
  const dayIndex = Math.floor(Date.now() / 86_400_000)
  return TRIVIA_POOL[dayIndex % TRIVIA_POOL.length]
}
