import { TOPICS } from './questions'

export const flashcards = [
  // Linear Equations & Inequalities
  { topic: TOPICS.LINEAR_EQUATIONS, term: 'Slope', definition: 'The rate of change of a line, calculated as rise over run: m = (y₂ − y₁)/(x₂ − x₁).' },
  { topic: TOPICS.LINEAR_EQUATIONS, term: 'Slope-Intercept Form', definition: 'y = mx + b, where m is the slope and b is the y-intercept.' },
  { topic: TOPICS.LINEAR_EQUATIONS, term: 'y-intercept', definition: 'The point where a line crosses the y-axis; found by setting x = 0.' },
  { topic: TOPICS.LINEAR_EQUATIONS, term: 'x-intercept', definition: 'The point where a line crosses the x-axis; found by setting y = 0.' },
  { topic: TOPICS.LINEAR_EQUATIONS, term: 'Inequality', definition: 'A mathematical statement that compares two expressions using symbols like <, >, ≤, or ≥.' },

  // Functions & Relations
  { topic: TOPICS.FUNCTIONS, term: 'Function', definition: 'A relation in which every input (x-value) maps to exactly one output (y-value).' },
  { topic: TOPICS.FUNCTIONS, term: 'Domain', definition: 'The set of all valid input (x) values for a function.' },
  { topic: TOPICS.FUNCTIONS, term: 'Range', definition: 'The set of all output (y) values produced by a function.' },
  { topic: TOPICS.FUNCTIONS, term: 'Vertical Line Test', definition: 'A graphical test to determine if a curve represents a function: if any vertical line crosses the graph more than once, it is not a function.' },
  { topic: TOPICS.FUNCTIONS, term: 'Function Notation', definition: 'The notation f(x) (read "f of x") used to represent the output of function f at input x.' },

  // Systems of Equations
  { topic: TOPICS.SYSTEMS, term: 'System of Equations', definition: 'A set of two or more equations with the same variables; the solution satisfies all equations simultaneously.' },
  { topic: TOPICS.SYSTEMS, term: 'Substitution Method', definition: 'A method of solving a system by isolating one variable in one equation and substituting into the other.' },
  { topic: TOPICS.SYSTEMS, term: 'Elimination Method', definition: 'A method of solving a system by adding or subtracting equations to eliminate one variable.' },
  { topic: TOPICS.SYSTEMS, term: 'Parallel Lines', definition: 'Lines with the same slope but different y-intercepts; they never intersect and represent a system with no solution.' },
  { topic: TOPICS.SYSTEMS, term: 'Coincident Lines', definition: 'Two equations that represent the exact same line, yielding infinitely many solutions.' },

  // Polynomials & Factoring
  { topic: TOPICS.POLYNOMIALS, term: 'Polynomial', definition: 'An algebraic expression with one or more terms, each consisting of a coefficient and a non-negative integer exponent.' },
  { topic: TOPICS.POLYNOMIALS, term: 'Degree', definition: 'The highest exponent of the variable in a polynomial.' },
  { topic: TOPICS.POLYNOMIALS, term: 'FOIL', definition: 'A method for multiplying two binomials: First, Outer, Inner, Last.' },
  { topic: TOPICS.POLYNOMIALS, term: 'Difference of Squares', definition: 'The factoring pattern a² − b² = (a + b)(a − b).' },
  { topic: TOPICS.POLYNOMIALS, term: 'GCF (Greatest Common Factor)', definition: 'The largest factor that divides every term of a polynomial; always factor the GCF first.' },

  // Quadratic Functions
  { topic: TOPICS.QUADRATICS, term: 'Quadratic Function', definition: 'A function of the form f(x) = ax² + bx + c, where a ≠ 0, whose graph is a parabola.' },
  { topic: TOPICS.QUADRATICS, term: 'Vertex', definition: 'The maximum or minimum point of a parabola, located at x = −b/(2a).' },
  { topic: TOPICS.QUADRATICS, term: 'Axis of Symmetry', definition: 'The vertical line x = −b/(2a) that divides a parabola into two mirror-image halves.' },
  { topic: TOPICS.QUADRATICS, term: 'Discriminant', definition: 'The expression b² − 4ac; determines the number and type of roots of a quadratic equation.' },
  { topic: TOPICS.QUADRATICS, term: 'Zero (Root)', definition: 'An x-value where f(x) = 0; a point where the parabola crosses the x-axis.' },

  // Statistics & Probability
  { topic: TOPICS.STATISTICS, term: 'Mean', definition: 'The arithmetic average: sum of all values divided by the number of values.' },
  { topic: TOPICS.STATISTICS, term: 'Median', definition: 'The middle value of a data set when arranged in order; resistant to outliers.' },
  { topic: TOPICS.STATISTICS, term: 'Interquartile Range (IQR)', definition: 'Q3 − Q1; the spread of the middle 50% of data, resistant to outliers.' },
  { topic: TOPICS.STATISTICS, term: 'Correlation', definition: 'A measure of the strength and direction of the linear relationship between two variables.' },
  { topic: TOPICS.STATISTICS, term: 'Outlier', definition: 'A data value that is significantly higher or lower than the rest of the data set.' },

  // Using the Graphing Calculator
  { topic: TOPICS.CALCULATOR, term: '▶Frac', definition: 'MATH ▶ 1: ▶Frac converts a decimal answer to an exact fraction — handy for matching fraction answer choices.' },
  { topic: TOPICS.CALCULATOR, term: '(-) Negation Key', definition: 'The gray (-) key enters a negative number; the blue − key subtracts. Using the wrong one causes a SYNTAX ERROR.' },
  { topic: TOPICS.CALCULATOR, term: 'Y= Editor', definition: 'Where you type functions to graph (Y1, Y2, …). Press GRAPH afterward to display them.' },
  { topic: TOPICS.CALCULATOR, term: 'ZStandard', definition: 'ZOOM ▶ 6: ZStandard resets the window to −10 to 10 on both axes — a reliable default view.' },
  { topic: TOPICS.CALCULATOR, term: '2nd CALC', definition: 'The CALCULATE menu (2nd TRACE): value, zero, minimum, maximum, and intersect — tools for reading key points off a graph.' },
  { topic: TOPICS.CALCULATOR, term: 'zero', definition: '2nd CALC ▶ 2: zero finds an x-intercept (root) of a graph using a left bound, right bound, and guess.' },
  { topic: TOPICS.CALCULATOR, term: 'intersect', definition: '2nd CALC ▶ 5: intersect finds where two graphs meet — the graphical solution to a system of equations.' },
  { topic: TOPICS.CALCULATOR, term: 'LinReg(ax+b)', definition: 'STAT ▶ CALC ▶ 4: LinReg fits a line y = ax + b to data in lists L1/L2; r reports how strong the fit is.' },
]

export const FLASHCARD_TOPIC_LIST = Object.values(TOPICS)
