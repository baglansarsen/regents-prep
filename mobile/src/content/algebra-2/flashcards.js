import { TOPICS } from './questions'

export const flashcards = [
  // Polynomial Functions
  { topic: TOPICS.POLYNOMIAL_FUNCTIONS, term: 'Remainder Theorem', definition: 'When p(x) is divided by (x − a), the remainder equals p(a).' },
  { topic: TOPICS.POLYNOMIAL_FUNCTIONS, term: 'Factor Theorem', definition: '(x − a) is a factor of p(x) if and only if p(a) = 0.' },
  { topic: TOPICS.POLYNOMIAL_FUNCTIONS, term: 'End Behavior', definition: 'The behavior of a polynomial as x approaches +∞ or −∞; determined by the leading term.' },
  { topic: TOPICS.POLYNOMIAL_FUNCTIONS, term: 'Difference of Cubes', definition: 'a³ − b³ = (a − b)(a² + ab + b²).' },
  { topic: TOPICS.POLYNOMIAL_FUNCTIONS, term: 'Turning Point', definition: 'A local maximum or minimum on a polynomial graph; a degree-n polynomial has at most n − 1 turning points.' },

  // Rational & Radical Expressions
  { topic: TOPICS.RATIONAL_RADICAL, term: 'Rational Expression', definition: 'A fraction where the numerator and/or denominator is a polynomial; undefined when denominator = 0.' },
  { topic: TOPICS.RATIONAL_RADICAL, term: 'Extraneous Solution', definition: 'A value that satisfies a transformed equation but not the original; always check solutions in radical/rational equations.' },
  { topic: TOPICS.RATIONAL_RADICAL, term: 'Rational Exponent', definition: 'x^(m/n) = ⁿ√(xᵐ); the denominator is the root index and the numerator is the power.' },
  { topic: TOPICS.RATIONAL_RADICAL, term: 'Rationalizing the Denominator', definition: 'Multiplying by a conjugate or appropriate form to eliminate radicals from the denominator.' },
  { topic: TOPICS.RATIONAL_RADICAL, term: 'Like Radicals', definition: 'Radical expressions with the same index and radicand; they can be added or subtracted directly.' },

  // Exponential & Logarithmic Functions
  { topic: TOPICS.EXPONENTIAL_LOG, term: 'Logarithm', definition: 'log_b(x) = y means b^y = x; the logarithm is the exponent to which the base must be raised.' },
  { topic: TOPICS.EXPONENTIAL_LOG, term: 'Product Rule', definition: 'log_b(MN) = log_b(M) + log_b(N).' },
  { topic: TOPICS.EXPONENTIAL_LOG, term: 'Quotient Rule', definition: 'log_b(M/N) = log_b(M) − log_b(N).' },
  { topic: TOPICS.EXPONENTIAL_LOG, term: 'Change of Base Formula', definition: 'log_b(x) = log(x)/log(b) = ln(x)/ln(b); used to evaluate logarithms on a calculator.' },
  { topic: TOPICS.EXPONENTIAL_LOG, term: 'Natural Logarithm (ln)', definition: 'log base e; the inverse of the natural exponential function eˣ.' },

  // Trigonometric Functions
  { topic: TOPICS.TRIGONOMETRY, term: 'Radian', definition: 'A unit of angle measurement; 2π radians = 360°, so 1 radian ≈ 57.3°.' },
  { topic: TOPICS.TRIGONOMETRY, term: 'Amplitude', definition: 'The maximum displacement from the midline of a sinusoidal function; |a| in f(x) = a·sin(bx).' },
  { topic: TOPICS.TRIGONOMETRY, term: 'Period', definition: 'The length of one full cycle of a sinusoidal function; 2π/|b| for f(x) = sin(bx).' },
  { topic: TOPICS.TRIGONOMETRY, term: 'Pythagorean Identity', definition: 'sin²θ + cos²θ = 1; derived from the Pythagorean theorem on the unit circle.' },
  { topic: TOPICS.TRIGONOMETRY, term: 'Reference Angle', definition: 'The acute angle formed between the terminal side of an angle and the nearest x-axis; always between 0° and 90°.' },

  // Statistics & Probability
  { topic: TOPICS.STATISTICS, term: 'Normal Distribution', definition: 'A symmetric, bell-shaped distribution characterized by its mean (μ) and standard deviation (σ).' },
  { topic: TOPICS.STATISTICS, term: 'z-score', definition: 'z = (x − μ)/σ; measures how many standard deviations a value is above or below the mean.' },
  { topic: TOPICS.STATISTICS, term: '68-95-99.7 Rule', definition: 'In a normal distribution: 68% of data is within 1σ, 95% within 2σ, 99.7% within 3σ of the mean.' },
  { topic: TOPICS.STATISTICS, term: 'Combination C(n,r)', definition: 'The number of ways to choose r items from n without regard to order: n!/(r!(n−r)!).' },
  { topic: TOPICS.STATISTICS, term: 'Independent Events', definition: 'Events where P(A and B) = P(A) · P(B); knowing one occurred does not change the probability of the other.' },

  // Complex Numbers
  { topic: TOPICS.COMPLEX_NUMBERS, term: 'Imaginary Unit (i)', definition: 'i = √(−1); defined so that i² = −1.' },
  { topic: TOPICS.COMPLEX_NUMBERS, term: 'Complex Number', definition: 'A number of the form a + bi where a is the real part and b is the imaginary part.' },
  { topic: TOPICS.COMPLEX_NUMBERS, term: 'Complex Conjugate', definition: 'The conjugate of (a + bi) is (a − bi); their product is always a real number: a² + b².' },
  { topic: TOPICS.COMPLEX_NUMBERS, term: 'Powers of i', definition: 'i¹ = i, i² = −1, i³ = −i, i⁴ = 1; the pattern repeats every 4 powers.' },
  { topic: TOPICS.COMPLEX_NUMBERS, term: 'Discriminant and Complex Roots', definition: 'When b² − 4ac < 0, the quadratic has two complex conjugate roots of the form p ± qi.' },

  // Using the Graphing Calculator
  { topic: TOPICS.CALCULATOR, term: 'Radian/Degree MODE', definition: 'MODE sets the angle units. Match it to the problem — sin(30) is 0.5 only in Degree mode.' },
  { topic: TOPICS.CALCULATOR, term: 'i (imaginary unit)', definition: '2nd [.] enters i. Set MODE to a+bi so complex results display correctly.' },
  { topic: TOPICS.CALCULATOR, term: 'e^(', definition: '2nd [LN] gives e^( for base-e exponentials; e ≈ 2.718.' },
  { topic: TOPICS.CALCULATOR, term: 'logBASE(', definition: 'MATH ▶ A: logBASE( evaluates a log of any base, e.g. logBASE(8,2) = 3. Otherwise use log(x)/log(b).' },
  { topic: TOPICS.CALCULATOR, term: 'ZTrig', definition: 'ZOOM ▶ 7: ZTrig sets the x-window in multiples of π/2 — ideal for sine and cosine graphs.' },
  { topic: TOPICS.CALCULATOR, term: 'intersect', definition: '2nd CALC ▶ 5: intersect solves an equation graphically by finding where Y1 and Y2 meet.' },
  { topic: TOPICS.CALCULATOR, term: 'ExpReg / SinReg', definition: 'STAT ▶ CALC fits a model to data: 0: ExpReg for growth/decay, C: SinReg for periodic data.' },
  { topic: TOPICS.CALCULATOR, term: 'sin⁻¹', definition: '2nd [SIN] gives the inverse sine — the angle whose sine is a given value.' },
]

export const FLASHCARD_TOPIC_LIST = Object.values(TOPICS)
