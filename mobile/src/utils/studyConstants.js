/**
 * studyConstants — shared study-plan thresholds. Single source of truth so the
 * mission picker, smart quest, and mastery logic can't drift apart.
 */

// Mastery bar: a unit counts as mastered at this quiz percentage
export const MASTERY_MIN = 85

// Passing bar: the Regents pass line, and the floor for "Building" confidence.
// The same 65 is currently hardcoded in examScoring.topicIndicator and
// useLessonProgress — new code should use this constant.
export const PASSING_PCT = 65

// Within this many days of the exam, a first practice exam becomes the top priority
export const PRACTICE_EXAM_WINDOW_DAYS = 14
