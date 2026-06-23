// Per-exam configuration. NY Regents exams have a uniform 3-hour (180-minute)
// time limit across subjects; the exam screen previously hardcoded 85 minutes,
// which under-counted every exam. Kept as a per-subject map so an individual
// subject can be overridden later without touching the screen.

const DEFAULT_EXAM_MINUTES = 180

const EXAM_MINUTES_BY_SUBJECT = {
  'living-environment': 180,
  'earth-science':      180,
  'chemistry':          180,
  'physics':            180,
  'algebra-1':          180,
  'algebra-2':          180,
  'geometry':           180,
  'life-science':       180,
  'english':            180,
  'global-history':     180,
  'us-history':         180,
}

/** Time limit (minutes) for a subject's Regents exam. Defaults to 180. */
export function examMinutes(subject) {
  return EXAM_MINUTES_BY_SUBJECT[subject] ?? DEFAULT_EXAM_MINUTES
}
