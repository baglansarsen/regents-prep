/**
 * studyConstants — shared study-plan thresholds. Single source of truth so the
 * mission picker, smart quest, and mastery logic can't drift apart.
 */

// Mastery bar: a unit counts as mastered at this quiz percentage
export const MASTERY_MIN = 85

// Within this many days of the exam, a first practice exam becomes the top priority
export const PRACTICE_EXAM_WINDOW_DAYS = 14
