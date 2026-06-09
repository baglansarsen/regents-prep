/**
 * makeLessonApi({ exams, topicMap, lessonSize })
 *
 * Factory that builds the lesson/practice API for a subject sourced entirely
 * from the Regents exam bank. Every returned question carries both `explanation`
 * and `diveDeep`, making the Dive Deep button work in lessons.
 *
 * @param {object[]} exams      Array of exam objects, each with a `questions` array
 * @param {object}   topicMap   Maps raw exam topic string → normalized unit topic string.
 *                              Questions whose exam topic has no mapping are omitted.
 * @param {number}   lessonSize Maximum questions returned per lesson chunk (default 20)
 *
 * @returns {object} { getExamPool, getLessonQuestions, getByTopic, buildDiagnosticSet, allQuestions }
 */
export function makeLessonApi({ exams, topicMap, lessonSize = 20 }) {
  // Flatten all exam questions and normalize topics once at construction time.
  const pool = exams.flatMap((exam) =>
    (exam.questions ?? [])
      // Exclude written/constructed-response questions (no choices array): the
      // lesson UI only renders selectable choices, so a choice-less question
      // leaves the user with no way to answer or advance. Must match the
      // predicate in shared/content/*/units.js (parity across content copies).
      .filter((q) => topicMap[q.topic] != null && Array.isArray(q.choices) && q.choices.length > 0)
      .map((q) => ({ ...q, topic: topicMap[q.topic] }))
  )

  /** All enriched exam questions with normalized unit topics */
  function allQuestions() {
    return pool
  }

  /** Questions belonging to a specific unit topic */
  function getExamPool(unitTopic) {
    return pool.filter((q) => q.topic === unitTopic)
  }

  /** Alias so index.js can re-export as getByTopic (used by HomeScreen quiz/study modes) */
  const getByTopic = getExamPool

  /**
   * Distribute the unit's exam pool across lessonCount lesson slots.
   * lessonIndex >= lessonCount means "challenge lesson" — return full shuffled pool.
   * Normal lessons: evenly slice the pool and randomly cap at lessonSize.
   */
  function getLessonQuestions(unitTopic, lessonIndex, lessonCount) {
    const topicPool = getExamPool(unitTopic)

    if (lessonIndex >= lessonCount) {
      return [...topicPool].sort(() => Math.random() - 0.5)
    }

    const chunkSize = Math.ceil(topicPool.length / lessonCount)
    const start = lessonIndex * chunkSize
    const slice = topicPool.slice(start, start + chunkSize)

    return [...slice].sort(() => Math.random() - 0.5).slice(0, lessonSize)
  }

  /**
   * Diagnostic / placement set: up to 3 random questions per unit topic.
   * Matches the shape of the old practice-pool buildDiagnosticSet().
   */
  function buildDiagnosticSet() {
    const byTopic = {}
    pool.forEach((q) => {
      if (!byTopic[q.topic]) byTopic[q.topic] = []
      byTopic[q.topic].push(q)
    })
    return Object.values(byTopic).flatMap((topicPool) =>
      [...topicPool].sort(() => Math.random() - 0.5).slice(0, 3)
    )
  }

  return { getExamPool, getLessonQuestions, getByTopic, buildDiagnosticSet, allQuestions }
}
