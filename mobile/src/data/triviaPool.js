export function getDayQuestion(pool) {
  if (!pool?.length) return null
  const eligible = pool.filter((q) => Array.isArray(q.choices) && q.choices.length > 0)
  if (!eligible.length) return null
  const dayIndex = Math.floor(Date.now() / 86_400_000)
  return eligible[dayIndex % eligible.length]
}
