// Level 0 — Basic Math (pre-algebra fundamentals).
//
// Authored content (NOT from the Regents bank — those exams assume this
// foundation). Every answer key here was computed and verified by hand. Each
// item carries an explicit `difficulty` (1–2) so the shared difficultyOf()
// honors it directly, and `explanation` + `diveDeep` so Dive Deeper works.
//
// Pipeline-validation scope: the first unit (Integers & Order of Operations) is
// authored in full; the remaining units are declared in TOPICS for sequencing
// and will be authored next.

export const TOPICS = {
  INTEGERS:  'Integers & Order of Operations',
  FRACTIONS: 'Fractions, Decimals & Percents',
  RATIOS:    'Ratios & Proportions',
  EQUATIONS: 'Expressions & One/Two-Step Equations',
  GRAPHING:  'Coordinate Plane & Basic Graphing',
}

export const TOPIC_ICONS = {
  [TOPICS.INTEGERS]:  '➕',
  [TOPICS.FRACTIONS]: '🍕',
  [TOPICS.RATIOS]:    '⚖️',
  [TOPICS.EQUATIONS]: '🟰',
  [TOPICS.GRAPHING]:  '📈',
}

// Helper to keep authored items terse; part 'A' + ascending number gives the
// engine a stable position, and difficulty is explicit.
const q = (number, text, choices, correct, difficulty, explanation, diveDeep) =>
  ({ number, part: 'A', topic: TOPICS.INTEGERS, text, choices, correct, difficulty, explanation, diveDeep })

export const QUESTIONS = [
  q(1, 'What is −7 + 12?', ['−19', '−5', '5', '19'], 2, 1,
    'Adding a positive to a negative moves right on the number line: 12 − 7 = 5.',
    'When signs differ, subtract the smaller absolute value from the larger and keep the sign of the larger. |12| > |−7|, so the answer is positive: 12 − 7 = 5.'),
  q(2, 'What is −8 − (−3)?', ['−11', '−5', '5', '11'], 1, 1,
    'Subtracting a negative is the same as adding: −8 + 3 = −5.',
    'Two minus signs in a row become a plus: a − (−b) = a + b. So −8 − (−3) = −8 + 3 = −5.'),
  q(3, 'What is 6 × (−4)?', ['−24', '−10', '10', '24'], 0, 1,
    'A positive times a negative is negative: 6 × 4 = 24, so 6 × (−4) = −24.',
    'Sign rule for multiplication: same signs → positive, different signs → negative. One factor is negative here, so the product is negative.'),
  q(4, 'What is −20 ÷ (−5)?', ['−100', '−4', '4', '100'], 2, 1,
    'A negative divided by a negative is positive: 20 ÷ 5 = 4.',
    'Division follows the same sign rule as multiplication. Same signs (both negative) give a positive quotient: −20 ÷ (−5) = 4.'),
  q(5, 'What is −5 + (−9)?', ['−14', '14', '−4', '4'], 0, 1,
    'Adding two negatives: add the values and keep the negative sign: −(5 + 9) = −14.',
    'Same signs → add the absolute values and keep the common sign. Both are negative, so −5 + (−9) = −14.'),
  q(6, 'Which number is the greatest: −7, −3, −1, 0?', ['−7', '−3', '−1', '0'], 3, 1,
    'On a number line, numbers increase to the right. 0 is farthest right, so it is greatest.',
    'For negatives, the one closest to zero is largest, and 0 beats every negative. Order: −7 < −3 < −1 < 0.'),
  q(7, 'What is |−6|?', ['−6', '6', '0', '12'], 1, 1,
    'Absolute value is distance from zero, always non-negative: |−6| = 6.',
    'The bars mean "how far from 0," regardless of direction. |−6| = 6 and |6| = 6.'),
  q(8, 'What is −3 × (−3)?', ['−9', '9', '−6', '6'], 1, 1,
    'A negative times a negative is positive: 3 × 3 = 9.',
    'Different from addition: −3 + (−3) = −6, but −3 × (−3) = +9. Watch whether you are adding or multiplying.'),
  q(9, 'Evaluate: 3 + 4 × 2', ['10', '11', '14', '24'], 1, 2,
    'Multiply before adding (order of operations): 4 × 2 = 8, then 3 + 8 = 11.',
    'PEMDAS: multiplication comes before addition. Doing 3 + 4 first (= 7, then ×2 = 14) is the classic mistake — the × binds tighter than the +.'),
  q(10, 'Evaluate: (3 + 4) × 2', ['10', '11', '14', '24'], 2, 2,
    'Parentheses first: 3 + 4 = 7, then 7 × 2 = 14.',
    'Parentheses override the usual order, so the addition happens first here. Compare with 3 + 4 × 2 = 11 — the parentheses change the answer.'),
  q(11, 'Evaluate: 12 − 2 × 5', ['2', '50', '−2', '10'], 0, 2,
    'Multiply first: 2 × 5 = 10, then 12 − 10 = 2.',
    'Multiplication outranks subtraction. Subtracting first (12 − 2 = 10, then ×5 = 50) ignores order of operations.'),
  q(12, 'Evaluate: 2³ + 1', ['7', '9', '6', '16'], 1, 2,
    'Exponent first: 2³ = 8, then 8 + 1 = 9.',
    'Exponents come before addition in PEMDAS. 2³ means 2 × 2 × 2 = 8, not 2 × 3.'),
  q(13, 'Evaluate: 18 − (4 + 5)', ['9', '19', '27', '7'], 0, 2,
    'Parentheses first: 4 + 5 = 9, then 18 − 9 = 9.',
    'Always resolve what is inside parentheses before the outside operation. Here 18 − 9 = 9.'),
  q(14, 'Evaluate: 2 + 3²', ['25', '11', '13', '36'], 1, 2,
    'Exponent first: 3² = 9, then 2 + 9 = 11.',
    'Apply the exponent only to its base (3), then add. Squaring the whole sum (2 + 3 = 5, 5² = 25) is incorrect.'),
  q(15, 'Evaluate: 10 − 3 + 2', ['5', '9', '11', '15'], 1, 2,
    'Addition and subtraction are done left to right: 10 − 3 = 7, then 7 + 2 = 9.',
    'When only + and − remain, work left to right — they have equal priority. Doing 3 + 2 first (10 − 5 = 5) breaks that rule.'),
  q(16, 'Evaluate: 4 × (2 + 1)²', ['36', '49', '100', '13'], 0, 2,
    'Parentheses then exponent then multiply: (2 + 1) = 3, 3² = 9, 4 × 9 = 36.',
    'PEMDAS order in action: parentheses (3), exponent (9), multiplication (36). Each step waits for the higher-priority one.'),
]
