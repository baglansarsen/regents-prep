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
      // Carry `skill` and `subTopic` through normalization so the Science
      // Practices unit (skill pool) and finer Smart Review buckets can use them.
      .map((q) => ({ ...q, topic: topicMap[q.topic] }))
  )

  // Parallel pool of open-ended (written) questions — the inverse of the MC
  // filter above. One of these is appended as a capstone reflection to each
  // normal lesson (see getLessonQuestions). Require modelAnswer so the reveal
  // always has something to show.
  const writtenPool = exams.flatMap((exam) =>
    (exam.questions ?? [])
      .filter((q) => topicMap[q.topic] != null && q.type === 'written' && q.modelAnswer)
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

  /** Cross-topic pool of questions exercising a given science-practice skill. */
  function getBySkill(skill) {
    return pool.filter((q) => q.skill === skill)
  }

  /** Pool filtered to a finer content sub-topic tag. */
  function getBySubTopic(subTopic) {
    return pool.filter((q) => q.subTopic === subTopic)
  }

  /** Written/constructed-response pool, optionally filtered to a unit topic. */
  function getWritten(unitTopic = null) {
    return unitTopic ? writtenPool.filter((q) => q.topic === unitTopic) : writtenPool
  }

  /**
   * Lessons for a skill-based unit (e.g. Science Practices). Mirrors
   * getLessonQuestions but slices a skill pool instead of a topic pool.
   * Accepts a single skill or an array of skills.
   */
  function getSkillLessonQuestions(skill, lessonIndex, lessonCount) {
    const skills = Array.isArray(skill) ? skill : [skill]
    const skillPool = pool.filter((q) => skills.includes(q.skill))
    if (lessonIndex >= lessonCount) {
      return [...skillPool].sort(() => Math.random() - 0.5)
    }
    const chunkSize = Math.ceil(skillPool.length / lessonCount) || 1
    const slice = skillPool.slice(lessonIndex * chunkSize, lessonIndex * chunkSize + chunkSize)
    return [...slice].sort(() => Math.random() - 0.5).slice(0, lessonSize)
  }

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

    const mc = [...slice].sort(() => Math.random() - 0.5).slice(0, lessonSize)

    // Capstone: append exactly one open-ended question for this topic. Picked
    // deterministically by lessonIndex so re-attempting a lesson shows the same
    // prompt while different lessons of the unit differ. Skipped silently when
    // the topic has no written question (keeps the lesson pure MC as before).
    const wPool = writtenPool.filter((q) => q.topic === unitTopic)
    const written = wPool.length ? wPool[lessonIndex % wPool.length] : null

    return written ? [...mc, written] : mc
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

  return {
    getExamPool, getLessonQuestions, getByTopic, buildDiagnosticSet, allQuestions,
    getBySkill, getBySubTopic, getWritten, getSkillLessonQuestions,
  }
}
