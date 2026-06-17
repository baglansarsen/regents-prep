export const STRATEGIES = {
  'algebra-1-solve': { // Solving Equations & Inequalities (covers the Linear split)
    mentalPrep: [
      'Isolate the variable by performing inverse operations in reverse order of PEMDAS.',
      'Remember to flip the inequality sign when multiplying or dividing by a negative number.',
      'Slope-intercept form (y = mx + b) is the most useful form for graphing quickly.'
    ],
    answeringTechniques: [
      'For multi-step equations, distribute first, then combine like terms, then isolate the variable.',
      'Substitute your answer back into the original equation to verify it.'
    ],
    guessingStrategy: [
      'If you are stuck, plug each answer choice into the equation — the one that makes both sides equal is correct.',
      'For slope problems, identify two clear points on the graph and count rise over run.'
    ],
    processOfElimination: [
      'Eliminate choices with the wrong sign — check whether the slope should be positive or negative first.',
      'Discard any answer that would make the equation clearly unbalanced.'
    ],
    timeManagement: [
      'Linear equation questions are usually among the quickest — solve these early in the exam.',
      'For word problems, underline key numbers and relationships before writing any equation.'
    ]
  },

  'algebra-1-u2': {
    mentalPrep: [
      'A relation is a function only if every x-value maps to exactly one y-value.',
      'Use the vertical line test on graphs: if a vertical line hits the graph more than once, it is not a function.',
      'Remember: domain = inputs (x), range = outputs (y).'
    ],
    answeringTechniques: [
      'For f(x) evaluation, replace every x in the expression with the given value.',
      'Watch for negative inputs squared: (−2)² = 4, not −4.'
    ],
    guessingStrategy: [
      'For "which is a function" questions, look for any repeated x-value — that eliminates the choice immediately.',
      'If range questions are tricky, evaluate f(x) at the boundary values of the domain.'
    ],
    processOfElimination: [
      'Circles and vertical lines are never functions — eliminate them immediately.',
      'If a table has a repeated x with different y-values, it is not a function.'
    ],
    timeManagement: [
      'Function notation substitution is direct arithmetic — do not overthink it.',
      'Mapping diagrams and tables are faster to check than graphs for function vs. non-function.'
    ]
  },

  'algebra-1-u3': {
    mentalPrep: [
      'Know all three solution types: one solution (intersecting), no solution (parallel), infinitely many (same line).',
      'For substitution, isolate the variable that has a coefficient of 1 first to minimize fractions.',
      'For elimination, scale equations so one pair of coefficients are opposites before adding.'
    ],
    answeringTechniques: [
      'After solving, always substitute back into both original equations to check the solution.',
      'For word problems, define your variables clearly before writing equations.'
    ],
    guessingStrategy: [
      'Check if the two equations have the same slope — if so, they are either parallel (no solution) or identical (infinite solutions).',
      'For multiple-choice system problems, try plugging each answer pair into both equations.'
    ],
    processOfElimination: [
      'Eliminate "no solution" if the slopes are different (different slopes always intersect).',
      'Eliminate "infinite solutions" unless both equations simplify to exactly the same line.'
    ],
    timeManagement: [
      'Substitution is often faster when one equation is already solved for a variable (like x = ...).',
      'Elimination is faster when both equations have integer coefficients that cancel easily.'
    ]
  },

  'algebra-1-u4': {
    mentalPrep: [
      'Always factor out the GCF first before applying other factoring techniques.',
      'For trinomials x² + bx + c, find two numbers that multiply to c and add to b.',
      'Recognize the difference of squares: a² − b² = (a − b)(a + b).'
    ],
    answeringTechniques: [
      'FOIL check: expand your factored answer to verify it matches the original polynomial.',
      'For degree, look at the largest exponent — coefficient size does not affect degree.'
    ],
    guessingStrategy: [
      'For "factor completely" questions, check if your factors can be factored again.',
      'Difference of squares questions have no middle term — look for this pattern quickly.'
    ],
    processOfElimination: [
      'After factoring, multiply your chosen answer back out — eliminate any choice that does not match.',
      'Discard factored forms with signs that do not satisfy the original multiplication.'
    ],
    timeManagement: [
      'Factoring trinomials can require trial and error — list factor pairs of c systematically.',
      'GCF extraction is always the first and fastest step — do it automatically.'
    ]
  },

  'algebra-1-u5': {
    mentalPrep: [
      'The vertex formula is x = −b/(2a); always find x first, then substitute to find y.',
      'The direction of opening depends on the sign of a: positive a opens up, negative a opens down.',
      'The discriminant b² − 4ac tells you: >0 two roots, =0 one root, <0 no real roots.'
    ],
    answeringTechniques: [
      'For maximum/minimum word problems, find the vertex — the y-coordinate is the max/min value.',
      'Zeros can be found by factoring, completing the square, or the quadratic formula.'
    ],
    guessingStrategy: [
      'If a parabola opens downward, its vertex is a maximum — maximum value problems usually have negative leading coefficients.',
      'For "how many solutions" questions, compute the discriminant mentally without solving fully.'
    ],
    processOfElimination: [
      'Eliminate any vertex with an x-coordinate that does not match −b/(2a).',
      'Eliminate roots that do not satisfy the original equation when substituted back.'
    ],
    timeManagement: [
      'The quadratic formula always works but is slower — factor first if the trinomial factors easily.',
      'Axis of symmetry and vertex calculations are quick formulas — memorize them.'
    ]
  },

  'algebra-1-u6': {
    mentalPrep: [
      'Know the five summary statistics: min, Q1, median, Q3, max (used in box plots).',
      'Mean is affected by outliers; median is not.',
      'For probability, P(event) = number of favorable outcomes / total outcomes.'
    ],
    answeringTechniques: [
      'To find IQR, order the data, find Q1 (median of lower half) and Q3 (median of upper half), then subtract.',
      'For scatter plots, identify the overall trend (positive/negative/none) before estimating the line of best fit.'
    ],
    guessingStrategy: [
      'If a data set has an obvious extreme value, the mean will be pulled toward it — the median will be more central.',
      'For probability fractions, reduce to lowest terms and compare to answer choices.'
    ],
    processOfElimination: [
      'Eliminate "negative correlation" if the scatter plot trends upward from left to right.',
      'Discard any probability greater than 1 — that is always wrong.'
    ],
    timeManagement: [
      'Median and mode can be found quickly from an ordered list — order the data immediately.',
      'Probability questions with equally likely outcomes are straightforward counting problems.'
    ]
  },

  'algebra-1-u7': {
    mentalPrep: [
      'You are issued a graphing calculator — reset it to a known view with ZOOM 6: ZStandard before each graphing problem.',
      'Use the gray (-) key for negatives and the blue − key for subtraction; mixing them is the most common cause of SYNTAX ERROR.',
      'When a question wants an exact fraction, finish with MATH ▶ ▶Frac to convert your decimal.'
    ],
    answeringTechniques: [
      'To solve an equation graphically, enter each side as Y1 and Y2 and use 2nd CALC ▶ 5: intersect.',
      'For a parabola, use 2: zero for the roots and 3: minimum / 4: maximum for the vertex instead of solving by hand.'
    ],
    guessingStrategy: [
      'Test answer choices by plugging them into Y= or the home screen — the calculator can confirm answers you cannot derive.',
      'For line-of-best-fit questions, run LinReg and match the slope and intercept to the choices.'
    ],
    processOfElimination: [
      'Graph the function and eliminate any choice whose intercept, vertex, or end behavior the screen contradicts.',
      'If your result is a messy decimal but the choices are clean fractions, convert with ▶Frac before eliminating.'
    ],
    timeManagement: [
      'Store repeated values with STO▶ instead of retyping them — it is faster and avoids typos.',
      'Build a TABLE (2nd GRAPH) to scan many input/output pairs at once rather than evaluating one at a time.'
    ]
  },

  'algebra-1-psm': { // Problem-Solving & Modeling (word problems + justify/explain)
    mentalPrep: [
      'Word problems: define your variable in words first ("let x = …"), then translate each sentence into an equation/expression.',
      'On the Regents, constructed-response is graded on WORK, not just the answer — show every step so you earn method credit even if the final number slips.',
      'For "explain/justify" parts, answer in a sentence that names the math reason (e.g. "because the slopes are equal, the lines are parallel").',
    ],
    answeringTechniques: [
      'Identify what is asked, list the givens, choose a model (equation, inequality, system, or function), solve, then answer in context with units.',
      'Check reasonableness: a negative time, a fractional person, or a price of $0 means re-read the problem.',
      'Graphing-required parts: label axes and scale, plot accurately, and state the requested feature (vertex, intercept, solution point).',
    ],
    guessingStrategy: [
      'Rate problems are usually linear (y = mx + b); growth/decay or "doubling" problems are usually exponential.',
      'If a problem gives two conditions about two unknowns, it is almost always a system of equations.',
    ],
    processOfElimination: [
      'For multiple choice modeling, plug the scenario\'s numbers into each equation and discard ones that do not fit the given values.',
    ],
    timeManagement: [
      'Constructed-response is worth the most points — budget time to show full work rather than rushing the MC.',
      'If stuck on the algebra, still set up the model and label the graph; partial credit is real on the Regents.',
    ],
  }
}
