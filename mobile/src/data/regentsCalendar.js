/**
 * Official NYSED Regents exam schedule, by session and subject.
 *
 * Source of truth for exam dates. Sessions not listed here (later years) fall
 * back to computed estimates in utils/examDates.js, shown as "estimated".
 *
 * Checked 2026-11-08 against the NYSED schedule PDFs:
 *   index:  https://www.nysed.gov/state-assessment/regents-examination-schedules
 *   memo:   https://www.nysed.gov/sites/default/files/programs/state-assessment/memo-regents-exam-dates-2027.pdf
 * January and June start at 9:15 a.m. / 1:15 p.m.; August at 8:30 a.m. / 12:30 p.m.
 *
 * Subject ids map to the exam a student actually sits in that session:
 *   chemistry / physics → Physical Science: Chemistry / Physics (NYSP12SLS);
 *     the old Physical Setting exams run the same slot through June 2027.
 *   earth-science       → Earth and Space Sciences.
 *   living-environment  → Life Science: Biology. Living Environment's last
 *     administration was June 2026; its students now sit the biology exam.
 *
 * When NYSED publishes a new session, add it here (dates only from NYSED).
 */

export const REGENTS_SESSIONS = [
  {
    id: '2027-01',
    label: 'January 2027',
    // The only January 2027 PDF NYSED links still carries a "(DRAFT" mark;
    // its dates match the final-dates memo. Re-check before the session.
    draft: true,
    source: 'https://www.nysed.gov/sites/default/files/programs/state-assessment/regents-exams-schedule-january-2027.pdf',
    exams: {
      'english':        { date: '2027-01-26', time: '9:15 a.m.' },
      'earth-science':  { date: '2027-01-26', time: '1:15 p.m.' },
      'chemistry':      { date: '2027-01-26', time: '1:15 p.m.' },
      'us-history':     { date: '2027-01-27', time: '9:15 a.m.' },
      'algebra-1':      { date: '2027-01-27', time: '1:15 p.m.' },
      'physics':        { date: '2027-01-27', time: '1:15 p.m.' },
      'global-history': { date: '2027-01-28', time: '9:15 a.m.' },
      'geometry':       { date: '2027-01-28', time: '1:15 p.m.' },
      'life-science':   { date: '2027-01-29', time: '9:15 a.m.' },
      'algebra-2':      { date: '2027-01-29', time: '9:15 a.m.' },
    },
  },
  {
    id: '2027-06',
    label: 'June 2027',
    source: 'https://www.nysed.gov/sites/default/files/programs/state-assessment/regents-exams-schedule-june-2027.pdf',
    exams: {
      'english':        { date: '2027-06-15', time: '9:15 a.m.' },
      'earth-science':  { date: '2027-06-15', time: '1:15 p.m.' },
      'global-history': { date: '2027-06-16', time: '9:15 a.m.' },
      'algebra-1':      { date: '2027-06-16', time: '1:15 p.m.' },
      'life-science':   { date: '2027-06-17', time: '9:15 a.m.' },
      'algebra-2':      { date: '2027-06-17', time: '1:15 p.m.' },
      'us-history':     { date: '2027-06-22', time: '9:15 a.m.' },
      'geometry':       { date: '2027-06-22', time: '1:15 p.m.' },
      'chemistry':      { date: '2027-06-23', time: '9:15 a.m.' },
      'physics':        { date: '2027-06-24', time: '9:15 a.m.' },
    },
  },
  {
    id: '2027-08',
    label: 'August 2027',
    source: 'https://www.nysed.gov/sites/default/files/programs/state-assessment/regents-exams-schedule-august-2027.pdf',
    // No physics in August.
    exams: {
      'algebra-1':      { date: '2027-08-17', time: '8:30 a.m.' },
      'english':        { date: '2027-08-17', time: '8:30 a.m.' },
      'algebra-2':      { date: '2027-08-17', time: '12:30 p.m.' },
      'global-history': { date: '2027-08-17', time: '12:30 p.m.' },
      'earth-science':  { date: '2027-08-18', time: '8:30 a.m.' },
      'chemistry':      { date: '2027-08-18', time: '8:30 a.m.' },
      'us-history':     { date: '2027-08-18', time: '8:30 a.m.' },
      'geometry':       { date: '2027-08-18', time: '12:30 p.m.' },
      'life-science':   { date: '2027-08-18', time: '12:30 p.m.' },
    },
  },
]

/** The exam a subject's students sit (see header). */
export const CALENDAR_SUBJECT_ALIAS = { 'living-environment': 'life-science' }

/** Last session NYSED has published; computed estimates start after it. */
export const LAST_PUBLISHED_SESSION = REGENTS_SESSIONS[REGENTS_SESSIONS.length - 1].id
