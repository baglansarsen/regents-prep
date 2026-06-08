export function getDayQuestion(pool) {
  if (!pool?.length) return null
  const dayIndex = Math.floor(Date.now() / 86_400_000)
  return pool[dayIndex % pool.length]
}
