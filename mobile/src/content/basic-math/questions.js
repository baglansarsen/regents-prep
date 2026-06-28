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

// Helpers — one per topic so the engine sees the correct topic string.
const q = (number, text, choices, correct, difficulty, explanation, diveDeep) =>
  ({ number, part: 'A', topic: TOPICS.INTEGERS, text, choices, correct, difficulty, explanation, diveDeep })

const qf = (number, text, choices, correct, difficulty, explanation, diveDeep) =>
  ({ number, part: 'A', topic: TOPICS.FRACTIONS, text, choices, correct, difficulty, explanation, diveDeep })

const INTEGERS_QUESTIONS = [
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

const FRACTIONS_QUESTIONS = [
  qf(1, 'What is 1/2 as a decimal?', ['0.12', '0.25', '0.5', '2.0'], 2, 1,
    'Divide the numerator by the denominator: 1 ÷ 2 = 0.5.',
    '1/2 means "1 divided by 2." All fractions convert to decimals this way. Memorise the common ones: 1/2 = 0.5, 1/4 = 0.25, 3/4 = 0.75.'),
  qf(2, 'What is 3/4 as a decimal?', ['0.25', '0.34', '0.43', '0.75'], 3, 1,
    'Divide: 3 ÷ 4 = 0.75.',
    '3/4 = 3 × (1/4) = 3 × 0.25 = 0.75. You can also do long division: 3.00 ÷ 4 = 0.75.'),
  qf(3, 'What is 0.25 as a fraction in lowest terms?', ['1/2', '1/4', '2/5', '25/10'], 1, 1,
    '0.25 = 25/100. Divide top and bottom by 25: 25/100 = 1/4.',
    '0.25 is "25 hundredths" = 25/100. To simplify, find the GCF of 25 and 100 (which is 25) and divide both: 1/4.'),
  qf(4, 'What is 50% written as a decimal?', ['0.005', '0.05', '0.5', '5.0'], 2, 1,
    'Divide the percent by 100: 50 ÷ 100 = 0.5.',
    'Percent means "per hundred." Move the decimal two places left: 50.% → 0.50. So 50% = 0.5.'),
  qf(5, 'What is 0.6 as a percent?', ['0.6%', '6%', '60%', '600%'], 2, 1,
    'Multiply by 100: 0.6 × 100 = 60%.',
    'To convert a decimal to a percent, move the decimal two places right and add the % sign: 0.6 → 60%.'),
  qf(6, 'Simplify the fraction 6/8.', ['1/2', '2/3', '3/4', '6/8'], 2, 1,
    'The GCF of 6 and 8 is 2. Divide both: 6÷2 / 8÷2 = 3/4.',
    'A fraction is fully simplified when the numerator and denominator share no common factor other than 1. GCF(6,8)=2, so 6/8 = 3/4.'),
  qf(7, 'What is 2 1/2 written as an improper fraction?', ['3/2', '4/2', '5/2', '22/2'], 2, 1,
    'Multiply the whole number by the denominator and add the numerator: 2×2 + 1 = 5, so 5/2.',
    'Mixed number → improper fraction: (whole × denominator + numerator) / denominator = (2×2+1)/2 = 5/2.'),
  qf(8, 'What is 1/4 + 1/4?', ['1/8', '2/8', '1/2', '2/4'], 2, 1,
    'Same denominator: add the numerators. 1+1=2, so 2/4 = 1/2.',
    'When denominators match, just add the tops: 1/4 + 1/4 = 2/4. Then simplify: GCF(2,4)=2 → 1/2.'),
  qf(9, 'What is 2/3 + 1/3?', ['1/3', '1/2', '1', '3/6'], 2, 1,
    'Same denominator: 2+1=3, so 3/3 = 1.',
    'Like fractions (same bottom): add tops. 2/3 + 1/3 = 3/3. Any number divided by itself equals 1.'),
  qf(10, 'What is 3/4 of 20?', ['5', '12', '15', '18'], 2, 1,
    '"Of" means multiply: 3/4 × 20 = 60/4 = 15.',
    '3/4 × 20 = (3 × 20) / 4 = 60/4 = 15. Alternatively: 1/4 of 20 = 5, then multiply by 3 → 15.'),
  qf(11, 'What is 1/2 × 1/3?', ['1/6', '1/5', '2/3', '2/6'], 0, 1,
    'Multiply straight across: 1×1=1 (top), 2×3=6 (bottom) → 1/6.',
    'Fraction multiplication: multiply numerators together and denominators together. 1/2 × 1/3 = (1×1)/(2×3) = 1/6.'),
  qf(12, 'What is 1/2 ÷ 1/4?', ['1/8', '1/4', '1/2', '2'], 3, 2,
    'Dividing by a fraction = multiplying by its reciprocal: 1/2 × 4/1 = 4/2 = 2.',
    'Keep–Change–Flip (KCF): keep the first fraction, change ÷ to ×, flip the second. 1/2 ÷ 1/4 → 1/2 × 4/1 = 4/2 = 2.'),
  qf(13, 'What is 1/3 + 1/4?', ['2/7', '5/12', '7/12', '4/12'], 2, 2,
    'LCD of 3 and 4 is 12. 1/3 = 4/12, 1/4 = 3/12. Sum: 4/12 + 3/12 = 7/12.',
    'Unlike denominators require a common denominator. LCM(3,4)=12. Convert: 1/3=4/12, 1/4=3/12. Add: 7/12. Adding the tops directly (2/7) is the classic error.'),
  qf(14, 'What is 3/4 − 1/3?', ['1/3', '2/7', '5/12', '8/12'], 2, 2,
    'LCD = 12. 3/4 = 9/12, 1/3 = 4/12. 9/12 − 4/12 = 5/12.',
    'Find LCD(4,3)=12. Rewrite: 3/4=9/12, 1/3=4/12. Subtract tops: 9−4=5. Answer: 5/12.'),
  qf(15, 'What is 5/8 as a decimal?', ['0.58', '0.6', '0.625', '0.65'], 2, 2,
    'Divide: 5 ÷ 8 = 0.625.',
    '5 ÷ 8: 8 goes into 5.000 → 0.625. Or: 5/8 = 5×125/1000 = 625/1000 = 0.625.'),
  qf(16, 'What is 75% of 40?', ['20', '25', '30', '35'], 2, 2,
    '75% = 0.75. 0.75 × 40 = 30.',
    '75% of 40 = 75/100 × 40 = 3/4 × 40 = 30. Or: 10% of 40=4, so 75%=7.5×4=30.'),
  qf(17, '15 is what percent of 60?', ['15%', '20%', '25%', '40%'], 2, 2,
    'Divide and multiply by 100: 15/60 = 0.25 = 25%.',
    'Percent formula: (part/whole) × 100 = percent. 15/60 = 1/4 = 0.25 → 25%.'),
  qf(18, 'What fraction of 1 hour is 15 minutes?', ['1/6', '1/5', '1/4', '1/3'], 2, 1,
    '15 out of 60 minutes: 15/60 = 1/4.',
    '1 hour = 60 minutes. 15/60 — simplify by dividing both by 15: 1/4. So 15 minutes is 1/4 of an hour.'),
  qf(19, 'A shirt costs $40 and is on sale for 25% off. What is the sale price?', ['$10', '$20', '$25', '$30'], 3, 2,
    '25% of $40 = $10 discount. Sale price: $40 − $10 = $30.',
    '25% off means you pay 75% of the original. 0.75 × $40 = $30. Or find the discount (0.25×40=$10) and subtract.'),
  qf(20, 'Which is largest: 1/2, 2/5, 3/8, 7/20?', ['2/5', '3/8', '7/20', '1/2'], 3, 2,
    'Convert to the same denominator (LCD=40): 20/40, 16/40, 15/40, 14/40. Largest is 20/40 = 1/2.',
    'To compare unlike fractions, find a common denominator. LCD(2,5,8,20)=40. 1/2=20/40, 2/5=16/40, 3/8=15/40, 7/20=14/40. So 1/2 wins.'),
]

export const QUESTIONS = [...INTEGERS_QUESTIONS, ...FRACTIONS_QUESTIONS]
