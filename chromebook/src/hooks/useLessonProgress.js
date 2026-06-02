import { useMemo } from 'react'

export function useLessonProgress(subjectHistory) {
  const lessonBest = useMemo(() => {
    const map = new Map()
    for (const h of subjectHistory) {
      if (h.lessonIndex == null) continue
      const key = `${h.topic}::${h.lessonIndex}`
      if ((h.pct ?? 0) > (map.get(key) ?? 0)) map.set(key, h.pct)
    }
    return map
  }, [subjectHistory])

  function lessonComplete(topic, lessonIndex) {
    return (lessonBest.get(`${topic}::${lessonIndex}`) ?? 0) >= 65
  }

  function unitLessonsCompleted(topic, lessonCount) {
    let count = 0
    for (let i = 0; i < lessonCount; i++) {
      if (lessonComplete(topic, i)) count++
    }
    return count
  }

  function unitComplete(topic, lessonCount) {
    return unitLessonsCompleted(topic, lessonCount) >= lessonCount
  }

  // L0 always open; Ln requires L(n-1) ≥65%
  function isLessonUnlocked(topic, lessonIdx) {
    if (lessonIdx === 0) return true
    return lessonComplete(topic, lessonIdx - 1)
  }

  return { lessonComplete, unitLessonsCompleted, unitComplete, isLessonUnlocked }
}
