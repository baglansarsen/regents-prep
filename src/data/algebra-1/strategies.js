export const STRATEGIES = {
  'algebra-1-u1': {
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
  }
}
