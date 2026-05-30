export const TOPICS = {
  POLYNOMIAL_FUNCTIONS:   'Polynomial Functions',
  RATIONAL_RADICAL:       'Rational & Radical Expressions',
  EXPONENTIAL_LOG:        'Exponential & Logarithmic Functions',
  TRIGONOMETRY:           'Trigonometric Functions',
  STATISTICS:             'Statistics & Probability',
  COMPLEX_NUMBERS:        'Complex Numbers',
}

export const TOPIC_ICONS = {
  [TOPICS.POLYNOMIAL_FUNCTIONS]: '📈',
  [TOPICS.RATIONAL_RADICAL]:     '➗',
  [TOPICS.EXPONENTIAL_LOG]:      '📉',
  [TOPICS.TRIGONOMETRY]:         '📐',
  [TOPICS.STATISTICS]:           '🎲',
  [TOPICS.COMPLEX_NUMBERS]:      '🔮',
}

export const questions = [
  // ── Polynomial Functions ─────────────────────────────────────────────────────
  {
    id: 2001,
    topic: TOPICS.POLYNOMIAL_FUNCTIONS,
    text: 'How many turning points can a polynomial of degree n have at most?',
    choices: ['n', 'n + 1', 'n − 1', '2n'],
    correct: 2,
    explanation: 'A polynomial of degree n has at most n − 1 turning points (local maxima/minima).'
  },
  {
    id: 2002,
    topic: TOPICS.POLYNOMIAL_FUNCTIONS,
    text: 'What are all the zeros of f(x) = x³ − x² − 6x?',
    choices: ['x = 0, 2, −3', 'x = 0, −2, 3', 'x = 0, 3, −2', 'x = 1, 2, 3'],
    correct: 2,
    explanation: 'Factor out x: x(x² − x − 6) = x(x − 3)(x + 2). Setting each factor to zero: x = 0, x = 3, x = −2.'
  },
  {
    id: 2003,
    topic: TOPICS.POLYNOMIAL_FUNCTIONS,
    text: 'Which of the following is a factor of p(x) = x³ − 8?',
    choices: ['(x − 2)', '(x + 2)', '(x − 4)', '(x² + 4)'],
    correct: 0,
    explanation: 'x³ − 8 is a difference of cubes: (x − 2)(x² + 2x + 4). Therefore (x − 2) is a factor.'
  },
  {
    id: 2004,
    topic: TOPICS.POLYNOMIAL_FUNCTIONS,
    text: 'According to the Remainder Theorem, if p(x) is divided by (x − 3), the remainder equals',
    choices: ['p(0)', 'p(3)', 'p(−3)', 'the degree of p(x)'],
    correct: 1,
    explanation: 'The Remainder Theorem states that when p(x) is divided by (x − a), the remainder is p(a). Here a = 3, so the remainder is p(3).'
  },
  {
    id: 2005,
    topic: TOPICS.POLYNOMIAL_FUNCTIONS,
    text: 'The end behavior of f(x) = −2x⁴ + 3x − 1 is',
    choices: [
      'rises left, rises right',
      'falls left, falls right',
      'rises left, falls right',
      'falls left, rises right'
    ],
    correct: 1,
    explanation: 'The leading term is −2x⁴. Even degree, negative leading coefficient: both ends fall (falls left, falls right).'
  },
  {
    id: 2006,
    topic: TOPICS.POLYNOMIAL_FUNCTIONS,
    text: 'Given that (x − 2) is a factor of x³ − 7x + 6, what are the other two factors?',
    choices: ['(x − 1)(x + 3)', '(x + 1)(x − 3)', '(x − 3)(x + 1)', '(x + 2)(x − 3)'],
    correct: 1,
    explanation: 'Dividing x³ − 7x + 6 by (x − 2) gives x² + 2x − 3 = (x + 3)(x − 1). The other factors are (x + 3) and (x − 1), matching choice B.'
  },

  // ── Rational & Radical Expressions ───────────────────────────────────────────
  {
    id: 2007,
    topic: TOPICS.RATIONAL_RADICAL,
    text: 'Simplify: √75',
    choices: ['5√3', '3√5', '15√3', '5√15'],
    correct: 0,
    explanation: '√75 = √(25 · 3) = √25 · √3 = 5√3.'
  },
  {
    id: 2008,
    topic: TOPICS.RATIONAL_RADICAL,
    text: 'Which value must be excluded from the domain of f(x) = (x + 1)/(x − 4)?',
    choices: ['x = 1', 'x = −1', 'x = 4', 'x = −4'],
    correct: 2,
    explanation: 'The denominator cannot equal zero. x − 4 = 0 → x = 4. So x = 4 is excluded.'
  },
  {
    id: 2009,
    topic: TOPICS.RATIONAL_RADICAL,
    text: 'Solve: √(2x + 3) = 5',
    choices: ['x = 11', 'x = 22', 'x = 1', 'x = 16'],
    correct: 0,
    explanation: 'Square both sides: 2x + 3 = 25. Solve: 2x = 22 → x = 11. Check: √(22+3) = √25 = 5. ✓'
  },
  {
    id: 2010,
    topic: TOPICS.RATIONAL_RADICAL,
    text: 'Which expression is equivalent to x^(2/3)?',
    choices: ['∛(x²)', '√(x³)', 'x²/3', '(√x)³'],
    correct: 0,
    explanation: 'x^(m/n) = ⁿ√(xᵐ). So x^(2/3) = ∛(x²) — the cube root of x squared.'
  },
  {
    id: 2011,
    topic: TOPICS.RATIONAL_RADICAL,
    text: 'Add the rational expressions: 2/x + 3/(x+1)',
    choices: ['5/(2x+1)', '(5x+2)/(x(x+1))', '(2x+5)/(x(x+1))', '5/(x(x+1))'],
    correct: 1,
    explanation: 'Common denominator is x(x+1): 2(x+1)/[x(x+1)] + 3x/[x(x+1)] = (2x+2+3x)/[x(x+1)] = (5x+2)/[x(x+1)].'
  },
  {
    id: 2012,
    topic: TOPICS.RATIONAL_RADICAL,
    text: 'What is the solution to the radical equation √(x − 1) = x − 3?',
    choices: ['x = 2', 'x = 5', 'x = 2 and x = 5', 'x = 10'],
    correct: 1,
    explanation: 'Square both sides: x − 1 = x² − 6x + 9 → x² − 7x + 10 = 0 → (x−5)(x−2) = 0. Check x=5: √4=2=5−3 ✓. Check x=2: √1=1 but 2−3=−1 ✗. Only x=5 works.'
  },

  // ── Exponential & Logarithmic Functions ──────────────────────────────────────
  {
    id: 2013,
    topic: TOPICS.EXPONENTIAL_LOG,
    text: 'What is log₂(32)?',
    choices: ['4', '5', '6', '16'],
    correct: 1,
    explanation: 'log₂(32) asks: 2 to what power equals 32? 2⁵ = 32, so the answer is 5.'
  },
  {
    id: 2014,
    topic: TOPICS.EXPONENTIAL_LOG,
    text: 'Which is equivalent to log(AB)?',
    choices: ['log A − log B', 'log A + log B', 'log A · log B', '(log A)/(log B)'],
    correct: 1,
    explanation: 'Product Rule of logarithms: log(AB) = log A + log B.'
  },
  {
    id: 2015,
    topic: TOPICS.EXPONENTIAL_LOG,
    text: 'A population grows according to P = 500·e^(0.03t). Approximately how long (in years) does it take to double?',
    choices: ['About 12 years', 'About 23 years', 'About 33 years', 'About 50 years'],
    correct: 1,
    explanation: 'Double when e^(0.03t) = 2 → 0.03t = ln 2 ≈ 0.693 → t ≈ 23 years.'
  },
  {
    id: 2016,
    topic: TOPICS.EXPONENTIAL_LOG,
    text: 'Solve for x: 3^x = 81',
    choices: ['x = 3', 'x = 4', 'x = 27', 'x = 9'],
    correct: 1,
    explanation: '81 = 3⁴, so 3^x = 3⁴ → x = 4.'
  },
  {
    id: 2017,
    topic: TOPICS.EXPONENTIAL_LOG,
    text: 'Which function represents exponential decay?',
    choices: ['f(x) = 3·(1.5)^x', 'f(x) = 3·(0.8)^x', 'f(x) = −3·(1.5)^x', 'f(x) = 3·2^x'],
    correct: 1,
    explanation: 'Exponential decay occurs when the base (growth factor) is between 0 and 1. Only 0.8 satisfies 0 < b < 1.'
  },
  {
    id: 2018,
    topic: TOPICS.EXPONENTIAL_LOG,
    text: 'log₅(x) = 3 means x equals',
    choices: ['15', '125', '243', '8'],
    correct: 1,
    explanation: 'log₅(x) = 3 means 5³ = x. 5³ = 125.'
  },

  // ── Trigonometric Functions ───────────────────────────────────────────────────
  {
    id: 2019,
    topic: TOPICS.TRIGONOMETRY,
    text: 'What is the period of f(x) = sin(2x)?',
    choices: ['4π', '2π', 'π', 'π/2'],
    correct: 2,
    explanation: 'Period = 2π/|b| where b is the coefficient of x. Period = 2π/2 = π.'
  },
  {
    id: 2020,
    topic: TOPICS.TRIGONOMETRY,
    text: 'In a unit circle, the angle θ = π/3 radians is equivalent to',
    choices: ['30°', '45°', '60°', '90°'],
    correct: 2,
    explanation: 'π/3 radians × (180°/π) = 60°.'
  },
  {
    id: 2021,
    topic: TOPICS.TRIGONOMETRY,
    text: 'What is the amplitude of f(x) = −4 cos(x)?',
    choices: ['−4', '4', '2', 'π'],
    correct: 1,
    explanation: 'Amplitude is the absolute value of the leading coefficient: |−4| = 4.'
  },
  {
    id: 2022,
    topic: TOPICS.TRIGONOMETRY,
    text: 'Which identity is correct?',
    choices: [
      'sin²θ − cos²θ = 1',
      'sin²θ + cos²θ = 1',
      'tan θ = cos θ / sin θ',
      '1 + tan²θ = sin²θ'
    ],
    correct: 1,
    explanation: 'The Pythagorean identity: sin²θ + cos²θ = 1 for all angles θ.'
  },
  {
    id: 2023,
    topic: TOPICS.TRIGONOMETRY,
    text: 'For a right triangle with legs 3 and 4 and hypotenuse 5, sin(θ) where θ is opposite the leg of length 3 is',
    choices: ['3/4', '4/5', '3/5', '5/3'],
    correct: 2,
    explanation: 'sin(θ) = opposite/hypotenuse = 3/5.'
  },
  {
    id: 2024,
    topic: TOPICS.TRIGONOMETRY,
    text: 'Which of the following is the reference angle for 210°?',
    choices: ['30°', '60°', '150°', '210°'],
    correct: 0,
    explanation: '210° is in Quadrant III (180° to 270°). Reference angle = 210° − 180° = 30°.'
  },

  // ── Statistics & Probability ──────────────────────────────────────────────────
  {
    id: 2025,
    topic: TOPICS.STATISTICS,
    text: 'In a normal distribution, approximately what percentage of data falls within one standard deviation of the mean?',
    choices: ['50%', '68%', '95%', '99.7%'],
    correct: 1,
    explanation: 'The 68-95-99.7 rule states that 68% of data falls within ±1σ, 95% within ±2σ, and 99.7% within ±3σ.'
  },
  {
    id: 2026,
    topic: TOPICS.STATISTICS,
    text: 'A z-score of 2.0 means a data value is',
    choices: [
      '2 units above the mean',
      '2 standard deviations above the mean',
      'in the 2nd percentile',
      'twice the mean'
    ],
    correct: 1,
    explanation: 'z-score = (value − mean)/standard deviation. A z = 2.0 means the value is 2 standard deviations above the mean.'
  },
  {
    id: 2027,
    topic: TOPICS.STATISTICS,
    text: 'Two events A and B are independent if',
    choices: [
      'P(A and B) = P(A) + P(B)',
      'P(A and B) = P(A) · P(B)',
      'P(A|B) = P(B)',
      'P(A) = P(B)'
    ],
    correct: 1,
    explanation: 'Events are independent when P(A ∩ B) = P(A) · P(B), meaning knowing B occurs does not change the probability of A.'
  },
  {
    id: 2028,
    topic: TOPICS.STATISTICS,
    text: 'Which measure best describes the variability of a data set?',
    choices: ['Mean', 'Median', 'Standard deviation', 'Mode'],
    correct: 2,
    explanation: 'Standard deviation measures how spread out values are around the mean — it is the primary measure of variability.'
  },
  {
    id: 2029,
    topic: TOPICS.STATISTICS,
    text: 'A survey is conducted on a random sample of 500 students. The margin of error is ±3%. This means',
    choices: [
      'the true value is exactly 3% off',
      'the sample result could differ from the true population value by up to 3%',
      '3% of students were not surveyed',
      'the standard deviation is 3'
    ],
    correct: 1,
    explanation: 'Margin of error indicates the range within which the true population parameter is likely to fall, given sampling variability.'
  },
  {
    id: 2030,
    topic: TOPICS.STATISTICS,
    text: 'In how many ways can a committee of 3 be chosen from a group of 7 people?',
    choices: ['21', '35', '210', '343'],
    correct: 1,
    explanation: 'Combinations: C(7,3) = 7!/(3!·4!) = (7·6·5)/(3·2·1) = 35.'
  },

  // ── Complex Numbers ───────────────────────────────────────────────────────────
  {
    id: 2031,
    topic: TOPICS.COMPLEX_NUMBERS,
    text: 'What is the value of i²?',
    choices: ['1', '−1', 'i', '0'],
    correct: 1,
    explanation: 'By definition, i = √(−1), so i² = −1.'
  },
  {
    id: 2032,
    topic: TOPICS.COMPLEX_NUMBERS,
    text: 'Simplify: (3 + 2i) + (1 − 5i)',
    choices: ['4 + 7i', '4 − 3i', '2 + 3i', '4 − 7i'],
    correct: 1,
    explanation: 'Add real parts: 3 + 1 = 4. Add imaginary parts: 2i + (−5i) = −3i. Result: 4 − 3i.'
  },
  {
    id: 2033,
    topic: TOPICS.COMPLEX_NUMBERS,
    text: 'What is the complex conjugate of 5 − 3i?',
    choices: ['5 + 3i', '−5 + 3i', '3 − 5i', '−5 − 3i'],
    correct: 0,
    explanation: 'The conjugate of (a + bi) is (a − bi). The conjugate of (5 − 3i) is (5 + 3i).'
  },
  {
    id: 2034,
    topic: TOPICS.COMPLEX_NUMBERS,
    text: 'Simplify: (2 + i)(3 − i)',
    choices: ['6 − i', '7 + i', '5 + i', '6 + i'],
    correct: 1,
    explanation: 'FOIL: 6 − 2i + 3i − i² = 6 + i − (−1) = 6 + i + 1 = 7 + i.'
  },
  {
    id: 2035,
    topic: TOPICS.COMPLEX_NUMBERS,
    text: 'The quadratic equation x² + 4 = 0 has solutions',
    choices: ['x = ±2', 'x = ±2i', 'x = 4i', 'No solution'],
    correct: 1,
    explanation: 'x² = −4 → x = ±√(−4) = ±√4 · √(−1) = ±2i.'
  },
  {
    id: 2036,
    topic: TOPICS.COMPLEX_NUMBERS,
    text: 'What is i⁴?',
    choices: ['i', '−1', '1', '−i'],
    correct: 2,
    explanation: 'Powers of i cycle: i¹=i, i²=−1, i³=−i, i⁴=1. The pattern repeats every 4 powers.'
  },

  // ── Visual Questions ──────────────────────────────────────────────────────────
  {
    id: 2101,
    topic: TOPICS.TRIGONOMETRY,
    text: 'Based on the graph of f(x) = 2 sin(2x), what is the period of the function?',
    choices: ['2π', 'π', 'π/2', '4π'],
    correct: 1,
    explanation: 'The period of f(x) = a·sin(bx) is 2π/|b|. With b = 2: period = 2π/2 = π. The graph confirms one full cycle completes at x = π.',
    diagram: { type: 'sinewave-a2' },
  },
  {
    id: 2102,
    topic: TOPICS.POLYNOMIAL_FUNCTIONS,
    text: 'How many real zeros does the polynomial function shown in the graph have?',
    choices: ['1', '2', '3', '4'],
    correct: 2,
    explanation: 'The graph of f(x) = (x+2)(x−1)(x−3) crosses the x-axis at three distinct points: x = −2, x = 1, and x = 3.',
    diagram: { type: 'polycubic-a2' },
  },
  {
    id: 2103,
    topic: TOPICS.EXPONENTIAL_LOG,
    text: 'The graph shows f(x) = 100·(0.5)ˣ. Which best describes the function?',
    choices: ['Exponential growth', 'Exponential decay', 'Linear decrease', 'Quadratic decrease'],
    correct: 1,
    explanation: 'The base 0.5 is between 0 and 1, so the function decreases as x increases — this is exponential decay. The y-value is halved each time x increases by 1.',
    diagram: { type: 'expdecay-a2' },
  },
  {
    id: 2104,
    topic: TOPICS.STATISTICS,
    text: 'Using the histogram, in which score interval does the median of the 34 test scores fall?',
    choices: ['50–60', '60–70', '70–80', '80–90'],
    correct: 2,
    explanation: 'There are 34 data values. The median is between the 17th and 18th values. Cumulative counts: 50–60: 3, 60–70: 10 (total 13), 70–80: 12 (total 25). The 17th and 18th values both fall in the 70–80 interval.',
    diagram: { type: 'histogram-a2' },
  },
]

export function getByTopic(topic) {
  return questions.filter(q => q.topic === topic)
}

export function getContextual() {
  return questions.filter(q => q.context)
}

export function buildDiagnosticSet() {
  return Object.values(TOPICS).flatMap(topic => {
    const pool = getByTopic(topic)
    return pool.sort(() => Math.random() - 0.5).slice(0, 3)
  })
}

export function shuffled(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}
