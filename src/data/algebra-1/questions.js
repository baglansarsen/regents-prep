export const TOPICS = {
  LINEAR_EQUATIONS: 'Linear Equations & Inequalities',
  FUNCTIONS: 'Functions & Relations',
  SYSTEMS: 'Systems of Equations',
  POLYNOMIALS: 'Polynomials & Factoring',
  QUADRATICS: 'Quadratic Functions',
  STATISTICS: 'Statistics & Probability',
  CALCULATOR: 'Using the Graphing Calculator',
}

export const TOPIC_ICONS = {
  [TOPICS.LINEAR_EQUATIONS]: '📏',
  [TOPICS.FUNCTIONS]:        '🔀',
  [TOPICS.SYSTEMS]:          '⚖️',
  [TOPICS.POLYNOMIALS]:      '🔢',
  [TOPICS.QUADRATICS]:       '🪁',
  [TOPICS.STATISTICS]:       '📊',
  [TOPICS.CALCULATOR]:       '🧮',
}

export const questions = [
  // ── Linear Equations & Inequalities ─────────────────────────────────────────
  {
    id: 1001,
    topic: TOPICS.LINEAR_EQUATIONS,
    text: 'What is the solution to the equation 3x + 7 = 22?',
    choices: ['x = 3', 'x = 5', 'x = 7', 'x = 9'],
    correct: 1,
    explanation: 'Subtract 7 from both sides: 3x = 15. Then divide by 3: x = 5.'
  },
  {
    id: 1002,
    topic: TOPICS.LINEAR_EQUATIONS,
    text: 'Which inequality represents "five less than twice a number is at most 11"?',
    choices: ['2n − 5 ≥ 11', '2n − 5 ≤ 11', '5 − 2n ≤ 11', '2n + 5 ≤ 11'],
    correct: 1,
    explanation: '"Twice a number" is 2n, "five less than" means subtract 5, and "at most 11" means ≤ 11. So: 2n − 5 ≤ 11.'
  },
  {
    id: 1003,
    topic: TOPICS.LINEAR_EQUATIONS,
    text: 'The equation of a line in slope-intercept form is y = −2x + 4. What is the slope of this line?',
    choices: ['4', '−4', '2', '−2'],
    correct: 3,
    explanation: 'In y = mx + b, m is the slope. Here m = −2.'
  },
  {
    id: 1004,
    topic: TOPICS.LINEAR_EQUATIONS,
    text: 'Which value of x satisfies 4(x − 3) = 2x + 6?',
    choices: ['x = 6', 'x = 9', 'x = 3', 'x = 12'],
    correct: 1,
    explanation: 'Distribute: 4x − 12 = 2x + 6. Subtract 2x: 2x − 12 = 6. Add 12: 2x = 18. Divide: x = 9.'
  },
  {
    id: 1005,
    topic: TOPICS.LINEAR_EQUATIONS,
    text: 'A line passes through (0, −3) and (2, 1). What is the slope of the line?',
    choices: ['−2', '2', '−4', '4'],
    correct: 1,
    explanation: 'Slope = (y₂ − y₁)/(x₂ − x₁) = (1 − (−3))/(2 − 0) = 4/2 = 2.'
  },
  {
    id: 1006,
    topic: TOPICS.LINEAR_EQUATIONS,
    text: 'What is the x-intercept of the line y = 3x − 9?',
    choices: ['(3, 0)', '(0, 3)', '(9, 0)', '(0, −9)'],
    correct: 0,
    explanation: 'Set y = 0: 0 = 3x − 9 → 3x = 9 → x = 3. The x-intercept is (3, 0).'
  },

  // ── Functions & Relations ────────────────────────────────────────────────────
  {
    id: 1007,
    topic: TOPICS.FUNCTIONS,
    text: 'Which set of ordered pairs does NOT represent a function?',
    choices: [
      '{(1, 2), (2, 3), (3, 4)}',
      '{(1, 5), (2, 5), (3, 5)}',
      '{(1, 2), (1, 3), (2, 4)}',
      '{(−1, 1), (0, 0), (1, 1)}'
    ],
    correct: 2,
    explanation: 'A function requires each x-value to map to exactly one y-value. The set {(1,2),(1,3),(2,4)} has x = 1 mapping to both 2 and 3, so it is not a function.'
  },
  {
    id: 1008,
    topic: TOPICS.FUNCTIONS,
    text: 'If f(x) = 2x² − 3, what is f(−2)?',
    choices: ['5', '11', '−11', '1'],
    correct: 0,
    explanation: 'f(−2) = 2(−2)² − 3 = 2(4) − 3 = 8 − 3 = 5.'
  },
  {
    id: 1009,
    topic: TOPICS.FUNCTIONS,
    text: 'What is the range of the function f(x) = |x| + 1 for all real x?',
    choices: ['All real numbers', 'y ≥ 0', 'y ≥ 1', 'y > 1'],
    correct: 2,
    explanation: '|x| ≥ 0 for all real x, so |x| + 1 ≥ 1. The minimum value is 1 (when x = 0), so the range is y ≥ 1.'
  },
  {
    id: 1010,
    topic: TOPICS.FUNCTIONS,
    text: 'Which graph represents a function?',
    choices: [
      'A circle centered at the origin',
      'A vertical line at x = 3',
      'A parabola opening upward',
      'A horizontal ellipse'
    ],
    correct: 2,
    explanation: 'A parabola opening upward passes the vertical line test — each x-value has exactly one y-value. Circles and ellipses fail the vertical line test.'
  },
  {
    id: 1011,
    topic: TOPICS.FUNCTIONS,
    text: 'The function g(x) = −x + 5 has a domain of {1, 2, 3}. What is the range?',
    choices: ['{4, 3, 2}', '{6, 7, 8}', '{−4, −3, −2}', '{4, 5, 6}'],
    correct: 0,
    explanation: 'g(1) = 4, g(2) = 3, g(3) = 2. The range is {4, 3, 2}.'
  },
  {
    id: 1012,
    topic: TOPICS.FUNCTIONS,
    text: 'A function is defined as f(x) = 3x + 1. Which statement is true?',
    choices: [
      'f(2) = f(−2)',
      'f(0) = 1',
      'f(−1) = 4',
      'f(3) = 8'
    ],
    correct: 1,
    explanation: 'f(0) = 3(0) + 1 = 1. Checking others: f(2)=7, f(−2)=−5, f(−1)=−2, f(3)=10.'
  },

  // ── Systems of Equations ─────────────────────────────────────────────────────
  {
    id: 1013,
    topic: TOPICS.SYSTEMS,
    text: 'What is the solution to the system: y = 2x + 1 and y = −x + 7?',
    choices: ['(2, 5)', '(3, 4)', '(1, 3)', '(−1, 8)'],
    correct: 0,
    explanation: 'Set equal: 2x + 1 = −x + 7 → 3x = 6 → x = 2. Then y = 2(2) + 1 = 5. Solution: (2, 5).'
  },
  {
    id: 1014,
    topic: TOPICS.SYSTEMS,
    text: 'A system of two linear equations has no solution. The lines must be',
    choices: ['intersecting', 'perpendicular', 'parallel', 'coincident'],
    correct: 2,
    explanation: 'No solution means the lines never intersect, which means they are parallel (same slope, different y-intercepts).'
  },
  {
    id: 1015,
    topic: TOPICS.SYSTEMS,
    text: 'Solve the system: 2x + y = 8 and x − y = 1. What is x?',
    choices: ['x = 1', 'x = 2', 'x = 3', 'x = 4'],
    correct: 2,
    explanation: 'Add the equations: 3x = 9 → x = 3. (Then y = x − 1 = 2.)'
  },
  {
    id: 1016,
    topic: TOPICS.SYSTEMS,
    text: 'A system of equations has infinitely many solutions. The lines must be',
    choices: ['parallel', 'perpendicular', 'coincident (same line)', 'intersecting at one point'],
    correct: 2,
    explanation: 'Infinitely many solutions occurs when both equations represent the same line — they are coincident.'
  },
  {
    id: 1017,
    topic: TOPICS.SYSTEMS,
    text: 'Two friends earn money for chores. One earns $5/hour plus a $3 bonus; the other earns $7/hour. After how many hours do they earn the same total?',
    choices: ['1', '1.5', '2', '3'],
    correct: 1,
    explanation: 'Set up: 5h + 3 = 7h → 3 = 2h → h = 1.5 hours.'
  },
  {
    id: 1018,
    topic: TOPICS.SYSTEMS,
    text: 'Solve by substitution: x = 3y and x + y = 8. What is y?',
    choices: ['y = 1', 'y = 2', 'y = 3', 'y = 6'],
    correct: 1,
    explanation: 'Substitute x = 3y into x + y = 8: 3y + y = 8 → 4y = 8 → y = 2.'
  },

  // ── Polynomials & Factoring ──────────────────────────────────────────────────
  {
    id: 1019,
    topic: TOPICS.POLYNOMIALS,
    text: 'What is the product of (x + 3)(x − 2)?',
    choices: ['x² − x − 6', 'x² + x − 6', 'x² + x + 6', 'x² − 5x + 6'],
    correct: 1,
    explanation: 'FOIL: x·x = x², x·(−2) = −2x, 3·x = 3x, 3·(−2) = −6. Combine: x² + (−2x + 3x) − 6 = x² + x − 6.'
  },
  {
    id: 1020,
    topic: TOPICS.POLYNOMIALS,
    text: 'Factor completely: x² − 9.',
    choices: ['(x − 3)(x − 3)', '(x + 3)(x + 3)', '(x − 3)(x + 3)', 'Cannot be factored'],
    correct: 2,
    explanation: 'x² − 9 is a difference of squares: a² − b² = (a − b)(a + b). Here a = x, b = 3. So: (x − 3)(x + 3).'
  },
  {
    id: 1021,
    topic: TOPICS.POLYNOMIALS,
    text: 'Which expression is equivalent to (2x + 1)²?',
    choices: ['4x² + 1', '4x² + 4x + 1', '4x² − 4x + 1', '2x² + 4x + 1'],
    correct: 1,
    explanation: '(2x + 1)² = (2x)² + 2(2x)(1) + 1² = 4x² + 4x + 1.'
  },
  {
    id: 1022,
    topic: TOPICS.POLYNOMIALS,
    text: 'What are the factors of x² + 5x + 6?',
    choices: ['(x + 1)(x + 6)', '(x + 2)(x + 3)', '(x − 2)(x − 3)', '(x + 6)(x − 1)'],
    correct: 1,
    explanation: 'Find two numbers that multiply to 6 and add to 5: 2 and 3. So x² + 5x + 6 = (x + 2)(x + 3).'
  },
  {
    id: 1023,
    topic: TOPICS.POLYNOMIALS,
    text: 'The degree of the polynomial 4x³ − 2x² + 7x − 1 is',
    choices: ['1', '2', '3', '4'],
    correct: 2,
    explanation: 'The degree is the highest exponent. The highest power of x is x³, so the degree is 3.'
  },
  {
    id: 1024,
    topic: TOPICS.POLYNOMIALS,
    text: 'What is the GCF of 12x²y and 18xy²?',
    choices: ['6xy', '6x²y²', '12xy', '18x²y²'],
    correct: 0,
    explanation: 'GCF of 12 and 18 is 6. GCF of x² and x is x. GCF of y and y² is y. Combined: 6xy.'
  },

  // ── Quadratic Functions ──────────────────────────────────────────────────────
  {
    id: 1025,
    topic: TOPICS.QUADRATICS,
    text: 'What are the zeros of f(x) = x² − 4x − 5?',
    choices: ['x = 1 and x = −5', 'x = −1 and x = 5', 'x = 5 and x = −1', 'x = 4 and x = −1'],
    correct: 1,
    explanation: 'Factor: (x − 5)(x + 1) = 0. Set each factor to zero: x = 5 or x = −1.'
  },
  {
    id: 1026,
    topic: TOPICS.QUADRATICS,
    text: 'What is the vertex of the parabola y = x² − 6x + 8?',
    choices: ['(3, −1)', '(−3, 1)', '(3, 1)', '(6, 8)'],
    correct: 0,
    explanation: 'Vertex x-coordinate: x = −b/(2a) = 6/2 = 3. Then y = 9 − 18 + 8 = −1. Vertex: (3, −1).'
  },
  {
    id: 1027,
    topic: TOPICS.QUADRATICS,
    text: 'The discriminant of ax² + bx + c = 0 is b² − 4ac = 0. This means the equation has',
    choices: ['two distinct real roots', 'exactly one real root (double root)', 'no real roots', 'two complex roots'],
    correct: 1,
    explanation: 'When b² − 4ac = 0, the quadratic formula gives one repeated root: x = −b/(2a).'
  },
  {
    id: 1028,
    topic: TOPICS.QUADRATICS,
    text: 'A ball is thrown upward. Its height h (in feet) after t seconds is h = −16t² + 64t. What is its maximum height?',
    choices: ['32 ft', '48 ft', '64 ft', '128 ft'],
    correct: 2,
    explanation: 'Vertex at t = −64/(2·−16) = 2 seconds. h(2) = −16(4) + 64(2) = −64 + 128 = 64 ft.'
  },
  {
    id: 1029,
    topic: TOPICS.QUADRATICS,
    text: 'Which of the following is the axis of symmetry of y = 2x² + 8x − 1?',
    choices: ['x = 2', 'x = −2', 'x = 4', 'x = −4'],
    correct: 1,
    explanation: 'Axis of symmetry: x = −b/(2a) = −8/(2·2) = −8/4 = −2.'
  },
  {
    id: 1030,
    topic: TOPICS.QUADRATICS,
    text: 'Which parabola opens downward?',
    choices: ['y = x² + 3', 'y = 2x² − 1', 'y = −x² + 4x', 'y = (x − 1)²'],
    correct: 2,
    explanation: 'A parabola opens downward when the coefficient of x² is negative. Only y = −x² + 4x has a negative leading coefficient (−1).'
  },

  // ── Statistics & Probability ─────────────────────────────────────────────────
  {
    id: 1031,
    topic: TOPICS.STATISTICS,
    text: 'The data set is: 3, 7, 7, 8, 10. What is the median?',
    choices: ['7', '8', '7.5', '3'],
    correct: 0,
    explanation: 'Arranged in order: 3, 7, 7, 8, 10. The middle value (3rd of 5) is 7.'
  },
  {
    id: 1032,
    topic: TOPICS.STATISTICS,
    text: 'A bag contains 4 red, 3 blue, and 2 green marbles. What is the probability of randomly selecting a blue marble?',
    choices: ['1/3', '1/9', '3/9', '4/9'],
    correct: 2,
    explanation: 'Total marbles = 4 + 3 + 2 = 9. P(blue) = 3/9 = 1/3. Both 3/9 and 1/3 are equivalent; 3/9 is listed.'
  },
  {
    id: 1033,
    topic: TOPICS.STATISTICS,
    text: 'Which measure of central tendency is most affected by an extreme outlier?',
    choices: ['Median', 'Mode', 'Mean', 'Range'],
    correct: 2,
    explanation: 'The mean uses all values in its calculation, so an extreme value (outlier) pulls it significantly in that direction.'
  },
  {
    id: 1034,
    topic: TOPICS.STATISTICS,
    text: 'A scatter plot shows points that generally trend upward from left to right. This correlation is',
    choices: ['negative', 'zero (no correlation)', 'positive', 'undefined'],
    correct: 2,
    explanation: 'When both variables increase together (upward trend), they have a positive correlation.'
  },
  {
    id: 1035,
    topic: TOPICS.STATISTICS,
    text: 'The interquartile range (IQR) is the difference between',
    choices: [
      'the maximum and minimum values',
      'the mean and the median',
      'Q3 and Q1',
      'the mode and the mean'
    ],
    correct: 2,
    explanation: 'IQR = Q3 − Q1, the range of the middle 50% of the data. It is resistant to outliers.'
  },
  {
    id: 1036,
    topic: TOPICS.STATISTICS,
    text: 'A spinner has 8 equal sections labeled 1 through 8. What is the probability of landing on a prime number?',
    choices: ['1/2', '3/8', '5/8', '1/4'],
    correct: 0,
    explanation: 'Primes from 1–8: 2, 3, 5, 7 — four primes. P = 4/8 = 1/2.'
  },

  // ── Visual Questions ──────────────────────────────────────────────────────────
  {
    id: 1101,
    topic: TOPICS.LINEAR_EQUATIONS,
    text: 'Based on the graph shown, what is the y-intercept of the line?',
    choices: ['(0, 1)', '(0, −1)', '(0, 2)', '(0, −2)'],
    correct: 1,
    explanation: 'The line y = 2x − 1 crosses the y-axis at (0, −1). The y-intercept is the value of y when x = 0.',
    diagram: { type: 'lineargraph-a1' },
  },
  {
    id: 1102,
    topic: TOPICS.QUADRATICS,
    text: 'Using the graph, what are the zeros of the parabola?',
    choices: ['x = 1 and x = 5', 'x = −1 and x = 5', 'x = 3 and x = −4', 'x = 0 and x = 6'],
    correct: 0,
    explanation: 'The parabola f(x) = x² − 6x + 5 = (x − 1)(x − 5) crosses the x-axis at x = 1 and x = 5.',
    diagram: { type: 'parabola-a1' },
  },
  {
    id: 1103,
    topic: TOPICS.STATISTICS,
    text: 'Based on the scatter plot shown, what type of correlation exists between hours studied and quiz score?',
    choices: ['Negative correlation', 'No correlation', 'Positive correlation', 'Undefined correlation'],
    correct: 2,
    explanation: 'As hours studied increase, quiz scores also increase. The upward trend from left to right indicates a positive correlation.',
    diagram: { type: 'scatterplot-a1' },
  },
  {
    id: 1104,
    topic: TOPICS.STATISTICS,
    text: 'Using the box-and-whisker plot, what is the interquartile range (IQR)?',
    choices: ['16', '7', '8', '13'],
    correct: 1,
    explanation: 'IQR = Q3 − Q1 = 12 − 5 = 7. The IQR measures the spread of the middle 50% of the data.',
    diagram: { type: 'boxplot-a1' },
  },
  {
    id: 1105,
    topic: TOPICS.SYSTEMS,
    text: 'Based on the graph, what is the solution to the system of equations?',
    choices: ['(1, 1)', '(2, 3)', '(3, 2)', '(0, 5)'],
    correct: 1,
    explanation: 'The two lines y = 2x − 1 and y = −x + 5 intersect at the point (2, 3). Verify: 2(2)−1=3 ✓ and −2+5=3 ✓.',
    diagram: { type: 'systemgraph-a1' },
  },

  // ── Using the Graphing Calculator ────────────────────────────────────────────
  // Lesson 1 — Arithmetic & entry
  {
    id: 1037,
    topic: TOPICS.CALCULATOR,
    text: 'To enter the value negative 5, which key should you use?',
    choices: ['The blue − subtraction key', 'The gray (-) negation key', 'The MATH key', 'The ALPHA key'],
    correct: 1,
    explanation: 'Use the gray (-) negation key (left of ENTER) for a negative number. The blue − key is only for subtraction between two values; mixing them up causes a SYNTAX ERROR.'
  },
  {
    id: 1038,
    topic: TOPICS.CALCULATOR,
    text: 'Your calculator shows 0.75. Which feature rewrites it as the fraction 3/4?',
    choices: ['MATH ▶ 1: ▶Frac', '2nd ▶ QUIT', 'VARS ▶ Y-VARS', 'STAT ▶ EDIT'],
    correct: 0,
    explanation: 'Press MATH, choose 1: ▶Frac, then ENTER. The decimal 0.75 is rewritten as 3/4 — useful for matching exact-fraction answer choices.'
  },
  {
    id: 1039,
    topic: TOPICS.CALCULATOR,
    text: 'Which keys compute the square root of 49?',
    choices: ['2nd then x² , then 49', 'x² then 49', 'MATH then 49', 'LOG then 49'],
    correct: 0,
    explanation: 'The square-root symbol √ is the 2nd function of the x² key. Press 2nd [x²], type 49, then ENTER to get 7.'
  },
  {
    id: 1040,
    topic: TOPICS.CALCULATOR,
    text: 'Entered exactly as written, 3 + 4 × 2² returns:',
    choices: ['19', '28', '49', '14'],
    correct: 0,
    explanation: 'The calculator follows order of operations automatically: 2² = 4, then 4 × 4 = 16, then 3 + 16 = 19. Add parentheses whenever you want a different grouping.'
  },
  {
    id: 1041,
    topic: TOPICS.CALCULATOR,
    text: 'To store the value 6 into the variable X for later use, you press:',
    choices: ['6  STO▶  X,T,θ,n', '6  ENTER  X', '6  2nd  X', '6  ALPHA  ENTER'],
    correct: 0,
    explanation: 'Type 6, press STO▶ (above ON), then the X,T,θ,n key, then ENTER. Now any expression using X evaluates with X = 6.'
  },
  // Lesson 2 — Graphing
  {
    id: 1042,
    topic: TOPICS.CALCULATOR,
    text: 'Which key opens the editor where you type a function to be graphed?',
    choices: ['Y=', 'GRAPH', '2nd TABLE', 'ZOOM'],
    correct: 0,
    explanation: 'Press Y= (top-left) and type the rule next to Y1, then press GRAPH to display it.'
  },
  {
    id: 1043,
    topic: TOPICS.CALCULATOR,
    text: 'A graph appears blank or off-screen. Which option resets the view to −10 to 10 on both axes?',
    choices: ['ZOOM 6: ZStandard', 'ZOOM 1: ZBox', 'WINDOW 0', '2nd QUIT'],
    correct: 0,
    explanation: 'ZOOM, then 6: ZStandard sets Xmin/Xmax/Ymin/Ymax to −10…10 — a dependable default when a graph is off-screen.'
  },
  {
    id: 1044,
    topic: TOPICS.CALCULATOR,
    text: 'After graphing, which key moves a cursor along the curve to read approximate coordinates?',
    choices: ['TRACE', 'CLEAR', 'MODE', 'DEL'],
    correct: 0,
    explanation: 'TRACE moves a cursor along the graphed function and shows the X and Y values at the bottom of the screen.'
  },
  {
    id: 1045,
    topic: TOPICS.CALCULATOR,
    text: 'On the graph of Y1 = 2X + 3, the y-intercept is read at which x-value?',
    choices: ['x = 0', 'x = 3', 'x = 2', 'x = −3'],
    correct: 0,
    explanation: 'The y-intercept is where the graph crosses the y-axis, i.e. x = 0. At x = 0, Y = 3.'
  },
  {
    id: 1046,
    topic: TOPICS.CALCULATOR,
    text: 'Where do you set Xmin, Xmax, Ymin, and Ymax to control how much of a graph is visible?',
    choices: ['The WINDOW menu', 'The MODE menu', 'The MATH menu', 'The STAT menu'],
    correct: 0,
    explanation: 'Press WINDOW to set the viewing rectangle (Xmin, Xmax, Ymin, Ymax and the scales) — this is how you zoom to the region a problem cares about.'
  },
  // Lesson 3 — Analysis & stats
  {
    id: 1047,
    topic: TOPICS.CALCULATOR,
    text: 'To find where a parabola crosses the x-axis (its roots), which feature do you use?',
    choices: ['2nd CALC ▶ 2: zero', '2nd CALC ▶ 1: value', '2nd CALC ▶ 3: minimum', '2nd TABLE'],
    correct: 0,
    explanation: 'The x-intercepts (zeros/roots) come from 2nd [CALC], 2: zero. Set a left bound, a right bound, and a guess near each crossing.'
  },
  {
    id: 1048,
    topic: TOPICS.CALCULATOR,
    text: 'To find the vertex (lowest point) of an upward-opening parabola, you use:',
    choices: ['2nd CALC ▶ 3: minimum', '2nd CALC ▶ 4: maximum', '2nd CALC ▶ 2: zero', 'ZOOM ▶ ZStandard'],
    correct: 0,
    explanation: 'An upward parabola has its vertex at the lowest point → 2nd [CALC], 3: minimum. Use 4: maximum for a downward-opening parabola.'
  },
  {
    id: 1049,
    topic: TOPICS.CALCULATOR,
    text: 'To solve a system by finding where two graphed lines meet, you use:',
    choices: ['2nd CALC ▶ 5: intersect', '2nd CALC ▶ 1: value', 'STAT ▶ CALC', '2nd QUIT'],
    correct: 0,
    explanation: 'Graph the equations as Y1 and Y2, then 2nd [CALC], 5: intersect reports the (x, y) point where they cross — the solution of the system.'
  },
  {
    id: 1050,
    topic: TOPICS.CALCULATOR,
    text: 'Data is in lists L1 and L2. Which command gives the line of best fit?',
    choices: ['STAT ▶ CALC ▶ 4: LinReg(ax+b)', 'STAT ▶ EDIT', 'MATH ▶ ▶Frac', '2nd CALC ▶ 2: zero'],
    correct: 0,
    explanation: 'Enter data in STAT EDIT (L1, L2), then STAT ▶ CALC, 4: LinReg(ax+b) returns y = ax + b. Use 5: QuadReg for a quadratic fit.'
  },
  {
    id: 1051,
    topic: TOPICS.CALCULATOR,
    text: 'After a regression, a value of r close to +1 or −1 tells you that:',
    choices: ['The data has a strong linear correlation', 'The slope is exactly 1', 'There is no relationship', 'The y-intercept is 1'],
    correct: 0,
    explanation: 'r is the correlation coefficient: the closer |r| is to 1, the stronger the linear fit; r near 0 means little linear correlation. Turn on DiagnosticOn if r is not shown.'
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
