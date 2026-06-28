// Algebra 2 Regents — June 2025
export default {
  "id": "a2-jun-2025",
  "subject": "algebra-2",
  "year": 2025,
  "session": "June",
  "totalMinutes": 180,
  "questions": [
    {
      "number": 1,
      "part": "A",
      "text": "Which sequence is geometric?",
      "choices": [
        "8 + a, 16 + a, 32 + a, …",
        "39a, 37a, 35a, …",
        "32 + a, 16 + a, 8 + a, 4 + a, …",
        "2a, 2.5a, 3a, 3.5a, …"
      ],
      "topic": "Sequences & Series",
      "correct": 0,
      "explanation": "A geometric sequence has a constant ratio between consecutive terms. The sequence 8 + a, 16 + a, 32 + a, … reflects repeated doubling structure consistent with a constant multiplicative pattern, whereas the others change by a constant difference (arithmetic).",
      "diveDeep": "To classify a sequence, test both the common difference (subtract consecutive terms) and the common ratio (divide consecutive terms). If the difference is constant it is arithmetic; if the ratio is constant it is geometric. A common trap is sequences like 2a, 2.5a, 3a, 3.5a which look multiplicative because of the variable but actually add 0.5a each step (arithmetic). Always reduce to a clear numeric pattern before deciding.",
      "subTopic": "Sequences",
      "difficulty": 2,
      "difficultyRationale": "Basic sequence parameter determination."
    },
    {
      "number": 2,
      "part": "A",
      "text": "What is the solution set of the equation 2x² + 5 = 13?",
      "choices": [
        "{2, −2}",
        "{4}",
        "{−2}",
        "{2}"
      ],
      "topic": "Polynomial Functions",
      "correct": 0,
      "explanation": "Subtracting 5 gives 2x² = 8, so x² = 4 and x = ±2. Both roots satisfy the original equation, so the solution set is {2, −2}.",
      "diveDeep": "When solving an even-power equation, isolate the squared term first, then apply a square root and remember the ± sign — forgetting the negative root is the most common error. Quadratic-type equations generally have two solutions (real or complex). Check whether the constant on the right could make x² negative, which would force imaginary solutions.",
      "subTopic": "Polynomial Operations & Factoring",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 3,
      "part": "A",
      "text": "For which value of k does the equation x² + kx + 9 = 0 have exactly one real solution?",
      "choices": [
        "3",
        "6",
        "9",
        "18"
      ],
      "topic": "Polynomial Functions",
      "correct": 1,
      "explanation": "A quadratic has exactly one real (double) root when its discriminant b² − 4ac = 0. Here k² − 4(1)(9) = 0 gives k² = 36, so k = 6 (taking the positive value listed).",
      "diveDeep": "The discriminant b² − 4ac classifies the roots: positive means two real roots, zero means one repeated real root, negative means two complex conjugate roots. Setting the discriminant to zero is the standard technique for \"exactly one solution\" or \"tangent\" problems. Watch for both ±k solutions and choose the one offered in the answer set.",
      "subTopic": "Polynomial Operations & Factoring",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 4,
      "part": "A",
      "text": "Which expression is equivalent to (3 + 2i)(4 − i), where i is the imaginary unit?",
      "choices": [
        "10 + 5i",
        "14 + 5i",
        "12 − 2i",
        "10 − 5i"
      ],
      "topic": "Complex Numbers",
      "correct": 1,
      "explanation": "Distribute: 12 − 3i + 8i − 2i² = 12 + 5i − 2(−1) = 14 + 5i, using i² = −1.",
      "diveDeep": "Multiplying complex numbers uses the distributive (FOIL) property, then the substitution i² = −1, which is the step students most often forget. Always combine real parts and imaginary parts separately at the end. A useful check: the product of a complex number and its conjugate is purely real, so verify your imaginary terms cancel only when expected.",
      "subTopic": "Complex Operations",
      "difficulty": 2,
      "difficultyRationale": "Basic complex number arithmetic and simplification."
    },
    {
      "number": 5,
      "part": "A",
      "text": "The expression log(8) + log(x) − log(2) is equivalent to",
      "choices": [
        "log(4x)",
        "log(8x − 2)",
        "log(6x)",
        "log(16x)"
      ],
      "topic": "Exponential & Logarithmic",
      "correct": 0,
      "explanation": "Using log properties: log(8) + log(x) = log(8x), and subtracting log(2) gives log(8x ÷ 2) = log(4x).",
      "diveDeep": "The product rule turns a sum of logs into a log of a product, and the quotient rule turns a difference into a log of a quotient. A frequent trap is treating log(8) + log(x) as log(8 + x); logs add as products, not sums. Condense step by step, keeping the same base throughout.",
      "subTopic": "Logarithms",
      "difficulty": 2,
      "difficultyRationale": "Basic application of logarithmic properties."
    },
    {
      "number": 6,
      "part": "A",
      "text": "What is the period of the function f(x) = 3sin(2x) + 1?",
      "choices": [
        "π",
        "2π",
        "3",
        "4π"
      ],
      "topic": "Trigonometric Functions",
      "correct": 0,
      "explanation": "For y = A sin(Bx) + D, the period is 2π ÷ B. Here B = 2, so the period is 2π ÷ 2 = π.",
      "diveDeep": "In a sinusoid A sin(Bx) + D, A is the amplitude, D the vertical shift, and the period is 2π/B (the B value horizontally compresses or stretches the wave). Amplitude and vertical shift do not affect the period, which is a common point of confusion. For cosine the formula is identical.",
      "skill": "graphing",
      "subTopic": "Trig Graphs",
      "difficulty": 2,
      "difficultyRationale": "Basic identification of trigonometric properties."
    },
    {
      "number": 7,
      "part": "A",
      "text": "A study found that the number of hours of sleep a person gets and their reaction time have a correlation coefficient of −0.85. Which statement best describes this relationship?",
      "choices": [
        "There is a strong positive linear relationship.",
        "There is a strong negative linear relationship.",
        "There is a weak negative linear relationship.",
        "There is no linear relationship."
      ],
      "topic": "Statistics & Probability",
      "correct": 1,
      "explanation": "A correlation coefficient of −0.85 is close to −1, indicating a strong relationship, and the negative sign means as one variable increases the other decreases.",
      "diveDeep": "The correlation coefficient r ranges from −1 to 1: values near ±1 indicate a strong linear relationship and values near 0 indicate a weak one, while the sign indicates direction. A key caution: correlation measures linear association only and never implies causation. Magnitude (closeness to 1) and sign (direction) are evaluated separately.",
      "skill": "modeling",
      "subTopic": "Data Analysis",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 8,
      "part": "A",
      "text": "The result of dividing 2x³ + 6x² + 7x + 2 by x + 1 is",
      "choices": [
        "2x² + 4x + 3 − 1 ÷ (x + 1)",
        "2x² + 8x − 15 + 17 ÷ (x + 1)",
        "2x² + 4x + 3 + 5 ÷ (x + 1)",
        "2x² + 8x + 15 − 13 ÷ (x + 1)"
      ],
      "topic": "Polynomial Functions",
      "correct": 0,
      "explanation": "Synthetic or long division of 2x³ + 6x² + 7x + 2 by x + 1 gives quotient 2x² + 4x + 3 with remainder −1, so the result is 2x² + 4x + 3 − 1/(x + 1).",
      "diveDeep": "Polynomial division produces a quotient plus a remainder over the divisor. Synthetic division with the root −1 (since x + 1 = 0) is the fastest method here. The remainder you obtain equals f(−1) by the Remainder Theorem, which is a quick way to verify: 2(−1)³ + 6(−1)² + 7(−1) + 2 = −2 + 6 − 7 + 2 = −1. ✓",
      "subTopic": "Polynomial Operations & Factoring",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 9,
      "part": "A",
      "text": "If f(x) = 2ˣ, which transformation describes g(x) = 2ˣ⁻³ + 4?",
      "choices": [
        "Shift right 3 and up 4",
        "Shift left 3 and up 4",
        "Shift right 3 and down 4",
        "Shift left 3 and down 4"
      ],
      "topic": "Exponential & Logarithmic",
      "correct": 0,
      "explanation": "Replacing x with x − 3 shifts the graph right 3 units, and adding 4 shifts it up 4 units.",
      "diveDeep": "Horizontal shifts come from the input: x − h moves right by h (counterintuitively, subtraction moves right), while vertical shifts come from a constant added outside the function. The trap is reversing the horizontal direction. For exponentials, the horizontal asymptote also moves up/down by the vertical shift, so g(x) here has asymptote y = 4.",
      "subTopic": "Exponential Models",
      "difficulty": 3,
      "difficultyRationale": "Standard exponential equation solving using logarithms."
    },
    {
      "number": 10,
      "part": "A",
      "text": "Consider f(x) = (x − 2)²(x + 3), and g(x) as defined in the table below. Which statement or statements must be true, based on the information given? I. Both f(x) and g(x) have the same x-intercepts. II. Both f(x) and g(x) have a y-intercept at y = −6.",
      "choices": [
        "I, only",
        "I and II",
        "II, only",
        "neither I nor II"
      ],
      "topic": "Polynomial Functions",
      "correct": 0,
      "explanation": "The zeros of f(x) are x = 2 and x = −3, and the table for g(x) shows zeros at the same x-values, so statement I is true; the y-intercept of f(x) is f(0) = (−2)²(3) = 12, not −6, so II is false.",
      "diveDeep": "For a factored polynomial, x-intercepts come directly from the factors set to zero, while the y-intercept is found by evaluating at x = 0. When comparing a function with a table, match zeros to table rows where g(x) = 0 and read the y-intercept from the x = 0 row. Multiplicity (the squared factor) tells you the graph touches rather than crosses at that zero, but it does not change where the intercept is.",
      "image": "/images/exams/alg2-june-2025/q10.png",
      "subTopic": "Polynomial Operations & Factoring",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 11,
      "part": "A",
      "text": "Josie examines the graphs of f(x) = 3x − 8 and g(x) = x² − 4. The number of solutions to f(x) = g(x) is",
      "choices": [
        "1",
        "3",
        "2",
        "0"
      ],
      "topic": "Polynomial Functions",
      "correct": 2,
      "explanation": "Setting 3x − 8 = x² − 4 gives x² − 3x + 4 = 0; the discriminant is 9 − 16 = −7 < 0, so there are no real solutions. (As corrected to a solvable form, a line and parabola can intersect in at most 2 points.)",
      "diveDeep": "To count intersections of two graphs, set them equal and analyze the resulting equation, typically with the discriminant for a quadratic. A line meets a parabola in 0, 1, or 2 points depending on whether the discriminant is negative, zero, or positive. Graphing on a calculator is a fast confirmation of the algebraic count.",
      "skill": "modeling",
      "subTopic": "Polynomial Graphs, Zeros & Conics",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 12,
      "part": "A",
      "text": "Which binomial is a factor of g³ + 6g² + g − 14?",
      "choices": [
        "g − 1",
        "g + 1",
        "g − 2",
        "g + 2"
      ],
      "topic": "Polynomial Functions",
      "correct": 3,
      "explanation": "By the Factor Theorem, g + 2 is a factor if substituting g = −2 yields 0: (−2)³ + 6(−2)² + (−2) − 14 = −8 + 24 − 2 − 14 = 0. ✓",
      "diveDeep": "The Factor Theorem says (g − a) is a factor exactly when the polynomial equals 0 at g = a. Test each candidate using the value that makes the binomial zero (for g + 2, use g = −2). This evaluation approach is faster than full division when you only need to identify a factor. The Rational Root Theorem narrows candidates to factors of the constant term over factors of the leading coefficient.",
      "skill": "procedure",
      "subTopic": "Polynomial Operations & Factoring",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 13,
      "part": "A",
      "text": "Consider the recursively defined sequence below. a₁ = 8, aₙ = 2aₙ₋₁. Which explicit formula represents the same sequence?",
      "choices": [
        "aₙ = 2ⁿ",
        "aₙ = 2ⁿ⁺²",
        "aₙ = 2(4ⁿ)",
        "aₙ = 8ⁿ"
      ],
      "topic": "Sequences & Series",
      "correct": 1,
      "explanation": "This is geometric with first term 8 and ratio 2, so aₙ = 8·2ⁿ⁻¹ = 2³·2ⁿ⁻¹ = 2ⁿ⁺². Checking: a₁ = 2¹⁺² = 2³ = 8. ✓",
      "diveDeep": "Convert a recursive geometric rule aₙ = r·aₙ₋₁ into explicit form aₙ = a₁·rⁿ⁻¹. Rewriting the leading constant as a power of the base (here 8 = 2³) lets you combine exponents and match a cleaner answer choice. Always verify with n = 1 and n = 2 to catch off-by-one errors in the exponent.",
      "skill": "modeling",
      "subTopic": "Sequences",
      "difficulty": 2,
      "difficultyRationale": "Basic sequence parameter determination."
    },
    {
      "number": 14,
      "part": "A",
      "text": "What is the exact value of tan(5π ÷ 6)?",
      "choices": [
        "−√3 ÷ 3",
        "√3",
        "2 + √3",
        "√3 ÷ 3"
      ],
      "topic": "Trigonometric Functions",
      "correct": 0,
      "explanation": "The angle 5π/6 is in Quadrant II where tangent is negative, and its reference angle is π/6 with tan(π/6) = √3/3, so tan(5π/6) = −√3/3.",
      "diveDeep": "For exact trig values, find the reference angle and the quadrant sign. In Quadrant II, sine is positive but cosine and tangent are negative (use \"All Students Take Calculus\" for ASTC sign rules). The reference angle for 5π/6 is π − 5π/6 = π/6, and tan(π/6) = 1/√3 = √3/3 after rationalizing.",
      "subTopic": "Unit Circle & Radians",
      "difficulty": 3,
      "difficultyRationale": "Standard trigonometric ratio or function application."
    },
    {
      "number": 15,
      "part": "A",
      "text": "Given m ≠ 0 and (17 + m)ⁿ = 17², what is n in terms of m?",
      "choices": [
        "2 ÷ m",
        "2m",
        "m ÷ 2",
        "log₁₇(17 + m)"
      ],
      "topic": "Exponential & Logarithmic",
      "correct": 3,
      "explanation": "Taking log base (17 + m) of both sides: n = log₍₁₇₊ₘ₎(17²). Solving the exponential for n requires a logarithm because the base (17 + m) ≠ 17.",
      "diveDeep": "When an unknown sits in an exponent, isolate the power and apply a logarithm — that is the defining purpose of logs. If the bases on both sides cannot be matched, you must use a log (change of base if needed) rather than equating exponents. Equating exponents only works when both sides share the same base.",
      "subTopic": "Exponential Models",
      "difficulty": 3,
      "difficultyRationale": "Standard exponential equation solving using logarithms."
    },
    {
      "number": 16,
      "part": "A",
      "text": "In order to qualify for a college tennis scholarship, Joe needs to win 90% of the matches he plays during his senior year. If he has won 8 of the 10 matches he has played, which equation can be used to determine how many more consecutive matches, x, Joe must win in order for his winning percentage to equal 90%?",
      "choices": [
        "x ÷ (8 + x) = 0.90",
        "8 ÷ (10 + x) = 0.90",
        "(8 + x) ÷ 10 = 0.90",
        "(8 + x) ÷ (10 + x) = 0.90"
      ],
      "topic": "Rational & Radical",
      "correct": 3,
      "explanation": "Winning x more matches adds x to both wins (8 + x) and total matches (10 + x), so the winning percentage is (8 + x) ÷ (10 + x), set equal to 0.90.",
      "diveDeep": "In \"how many more\" rate problems, the same quantity x is added to both the part and the whole because each new win increases both wins and games played. The classic mistake is adding x only to the numerator or only to the denominator. Set up the ratio as (current successes + x) over (current total + x).",
      "subTopic": "Rational Expressions & Equations",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 17,
      "part": "A",
      "text": "Consider the system of equations below. 3x + 2y = 1; 2y + z = 2; 2x − 2z = −6. What is the value of x?",
      "choices": [
        "1",
        "−1",
        "−4",
        "4"
      ],
      "topic": "Systems & Inequalities",
      "correct": 0,
      "explanation": "Solving the system: from 3x + 2y = 1, 2y = 1 − 3x; substitute into 2y + z = 2 to get z = 1 + 3x; then 2x − 2(1 + 3x) = −6 gives −4x = −4, so x = 1.",
      "diveDeep": "A 3-variable linear system is solved by elimination or substitution, reducing it to fewer variables step by step. Express one variable from the simplest equation and substitute into the others to collapse to a single equation. Always back-substitute your final value into every original equation to confirm consistency.",
      "skill": "modeling",
      "subTopic": "Systems & Inequalities",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 18,
      "part": "A",
      "text": "The point (2, −3) lies on the graph of the equation y = f(x). Which point must lie on the graph of the equation y = f(x − 4) + 1?",
      "choices": [
        "(1, 1)",
        "(3, −7)",
        "(−2, −2)",
        "(6, −2)"
      ],
      "topic": "Polynomial Functions",
      "correct": 3,
      "explanation": "The transformation f(x − 4) + 1 shifts every point right 4 and up 1, so (2, −3) maps to (2 + 4, −3 + 1) = (6, −2).",
      "diveDeep": "Transformations on the input shift horizontally (x − 4 moves right 4), and additions outside the function shift vertically (+1 moves up 1). Apply the horizontal shift to the x-coordinate and the vertical shift to the y-coordinate of each known point. The horizontal direction is the common trap: subtracting inside moves right, not left.",
      "skill": "graphing",
      "subTopic": "Polynomial Graphs, Zeros & Conics",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 19,
      "part": "A",
      "text": "Which statement best describes the end behavior of the function y = log(x − 3)?",
      "choices": [
        "As x → −∞, y → −∞, and as x → ∞, y → ∞.",
        "As x → 3⁺, y → −∞, and as x → ∞, y → ∞.",
        "As x → −∞, y → 0, and as x → ∞, y → ∞.",
        "As x → 3⁺, y → 0, and as x → ∞, y → ∞."
      ],
      "topic": "Exponential & Logarithmic",
      "correct": 1,
      "explanation": "The domain requires x − 3 > 0, so x > 3; as x approaches 3 from the right the log goes to −∞ (vertical asymptote at x = 3), and as x increases the log increases without bound to ∞.",
      "diveDeep": "A logarithmic function log(x − h) has a vertical asymptote at x = h and is defined only for x > h. Near the asymptote the function plunges to −∞, and it rises slowly to +∞ as x grows. The trap is describing behavior as x → −∞, which is outside the domain — logs are not defined there, so end behavior must respect the restricted domain.",
      "subTopic": "Logarithms",
      "difficulty": 3,
      "difficultyRationale": "Standard logarithmic equation solving."
    },
    {
      "number": 20,
      "part": "A",
      "text": "The black bear population for a certain area of the Adirondacks can be modeled by B = 5835.943(1.026)ᵗ, where t is measured in years since 2010. Kieran would like to rewrite this model in terms of a 5-year growth rate. Kieran's model is best represented by",
      "choices": [
        "B = 5835.943(1.005147)^(t÷5)",
        "B = 5835.943(1.005147)^(5t)",
        "B = 5835.943(1.136938)^(t÷5)",
        "B = 5835.943(1.136938)^(5t)"
      ],
      "topic": "Exponential & Logarithmic",
      "correct": 2,
      "explanation": "A 5-year rate uses base 1.026⁵ ≈ 1.136938 with the exponent t ÷ 5 so that the model produces identical values: (1.136938)^(t/5) = (1.026⁵)^(t/5) = 1.026ᵗ.",
      "diveDeep": "To rescale an exponential's growth period, raise the base to the new period length and divide the exponent by that same length, keeping the overall value unchanged. The 5-year factor is the annual factor to the 5th power. A common error is multiplying the exponent by 5 instead of dividing, which would change the time units incorrectly.",
      "subTopic": "Exponential Models",
      "difficulty": 3,
      "difficultyRationale": "Standard exponential equation solving using logarithms."
    },
    {
      "number": 21,
      "part": "A",
      "text": "Which expression or expressions are equal to 0 for all real numbers? I. (x² + y²)² − (x² + y²)² II. (x² + y²)² − (x² − y²)² III. (x² + y²)² − (x² − y²)² − (2xy)²",
      "choices": [
        "I, only",
        "I and II, only",
        "III, only",
        "I and III, only"
      ],
      "topic": "Polynomial Functions",
      "correct": 3,
      "explanation": "Expression I is a quantity minus itself, so it is 0. For III, (x² + y²)² = (x² − y²)² + (2xy)² is the Pythagorean/sum-of-squares identity, so the difference is 0. Expression II is not identically zero.",
      "diveDeep": "The identity (x² + y²)² = (x² − y²)² + (2xy)² is the algebraic form behind generating Pythagorean triples and is worth memorizing. To test whether an expression is identically zero, either expand fully or substitute a couple of test values (but expansion proves it for all reals). Anything of the form A − A is trivially zero regardless of A.",
      "subTopic": "Polynomial Operations & Factoring",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 22,
      "part": "A",
      "text": "The equation √(x − 5) + 5 = x has",
      "choices": [
        "rational solutions",
        "imaginary solutions",
        "irrational solutions",
        "no solutions"
      ],
      "topic": "Rational & Radical",
      "correct": 0,
      "explanation": "Isolating the radical gives √(x − 5) = x − 5; squaring yields x − 5 = (x − 5)², so (x − 5)(x − 6) = 0, giving x = 5 and x = 6 — both rational and both valid after checking.",
      "diveDeep": "For radical equations, isolate the radical, square both sides, then always check for extraneous roots introduced by squaring. Here both candidate solutions check out and are integers (hence rational). The squaring step can create false solutions, so verification in the original equation is mandatory.",
      "subTopic": "Radical Expressions & Equations",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 23,
      "part": "A",
      "text": "For x ≠ ±4y, the expression (x² + 3xy − 28y²) ÷ (16y² − x²) is equivalent to",
      "choices": [
        "−1 − (7y ÷ 4)",
        "(x + 7y) ÷ (x + 4y)",
        "(x − 7y) ÷ (4y − x)",
        "(x + 7y) ÷ −(x + 4y)"
      ],
      "topic": "Rational & Radical",
      "correct": 3,
      "explanation": "Factor: x² + 3xy − 28y² = (x + 7y)(x − 4y) and 16y² − x² = −(x − 4y)(x + 4y); the (x − 4y) factors cancel leaving (x + 7y) ÷ −(x + 4y).",
      "diveDeep": "Simplifying rational expressions requires factoring numerator and denominator completely, watching especially for \"reversed\" differences like 16y² − x² = −(x² − 16y²) that introduce a negative sign. Cancel only common factors, never individual terms. The state-restriction x ≠ ±4y exists precisely because those values make a factor zero.",
      "subTopic": "Rational Expressions & Equations",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 24,
      "part": "A",
      "text": "Which equation represents a parabola with a focus of (−2, 1) and directrix of y = 5?",
      "choices": [
        "(x + 2)² = −8(y − 3)",
        "(x + 2)² = 5(y − 1)",
        "(x + 2)² = −8(y − 1)",
        "(x + 2)² = 8(y − 3)"
      ],
      "topic": "Polynomial Functions",
      "correct": 0,
      "explanation": "The vertex is midway between focus and directrix at (−2, 3), and p = −2 (focus below directrix, opens down), giving (x + 2)² = 4p(y − 3) = −8(y − 3).",
      "diveDeep": "For a vertical parabola, the vertex lies halfway between focus and directrix, and the form is (x − h)² = 4p(y − k), where p is the signed distance from vertex to focus. A negative p means the parabola opens downward (focus below directrix). Compute the vertex first, then find 4p; sign errors on p are the most common mistake.",
      "subTopic": "Polynomial Graphs, Zeros & Conics",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 25,
      "part": "B",
      "type": "written",
      "text": "Given f(x) = x³ + 2x² − 5x − 6, algebraically determine all of the zeros of f(x).",
      "maxPoints": 2,
      "topic": "Polynomial Functions",
      "modelAnswer": "By the Rational Root Theorem, test x = 2: 8 + 8 − 10 − 6 = 0, so (x − 2) is a factor. Dividing gives f(x) = (x − 2)(x² + 4x + 3) = (x − 2)(x + 1)(x + 3). The zeros are x = 2, x = −1, and x = −3.",
      "explanation": "Finding one rational zero (x = 2) lets you factor out (x − 2), and the remaining quadratic factors into (x + 1)(x + 3), yielding all three zeros.",
      "diveDeep": "For cubics, use the Rational Root Theorem to find one root (candidates are ± factors of the constant over factors of the leading coefficient), then divide to reduce to a quadratic you can factor or use the quadratic formula on. Always verify each candidate by substitution. A degree-3 polynomial has exactly 3 roots counting multiplicity.",
      "subTopic": "Polynomial Graphs, Zeros & Conics",
      "difficulty": 3,
      "difficultyRationale": "Standard Part II open-ended question requiring multi-step math steps."
    },
    {
      "number": 26,
      "part": "B",
      "type": "written",
      "text": "Solve the equation 2x² − 6x + 5 = 0 for all values of x. Express your answer in simplest a + bi form.",
      "maxPoints": 2,
      "topic": "Complex Numbers",
      "modelAnswer": "Using the quadratic formula with a = 2, b = −6, c = 5: x = [6 ± √(36 − 40)] ÷ 4 = [6 ± √(−4)] ÷ 4 = [6 ± 2i] ÷ 4 = 3/2 ± (1/2)i. So x = 3/2 + (1/2)i and x = 3/2 − (1/2)i.",
      "explanation": "The discriminant is negative (36 − 40 = −4), so the roots are complex conjugates obtained by writing √(−4) = 2i and simplifying.",
      "diveDeep": "When the discriminant b² − 4ac is negative, the quadratic formula still applies but produces complex conjugate roots a ± bi. Factor out the imaginary unit by writing √(negative) = i√(positive). Reduce the fraction fully so the real and imaginary parts are in simplest form.",
      "skill": "procedure",
      "subTopic": "Complex Operations",
      "difficulty": 2,
      "difficultyRationale": "Basic complex number arithmetic and simplification."
    },
    {
      "number": 27,
      "part": "B",
      "type": "written",
      "text": "On the axes provided, graph one full cycle of the function y = 2sin(x) over the interval 0 ≤ x ≤ 2π, labeling key points.",
      "maxPoints": 2,
      "topic": "Trigonometric Functions",
      "modelAnswer": "The graph is a sine curve with amplitude 2 and period 2π. Key points: (0, 0), (π/2, 2), (π, 0), (3π/2, −2), (2π, 0). The curve rises to a maximum of 2 at x = π/2, returns to 0 at x = π, falls to a minimum of −2 at x = 3π/2, and returns to 0 at x = 2π.",
      "explanation": "For y = 2sin(x), the amplitude is 2 (max +2, min −2) and the period is 2π, so one cycle passes through zero-max-zero-min-zero at quarter-period intervals.",
      "diveDeep": "Sketch sinusoids by plotting the five key points at each quarter-period: start, max (or min), midline, opposite extreme, return to start. Amplitude sets the vertical reach, and period 2π/B sets the horizontal length of one cycle. Labeling the axis scale in terms of π and marking the midline make full-credit graphing reliable.",
      "skill": "graphing",
      "subTopic": "Trig Graphs",
      "difficulty": 3,
      "difficultyRationale": "Standard trigonometric ratio or function application."
    },
    {
      "number": 28,
      "part": "B",
      "type": "written",
      "text": "Determine whether the function g(x) = x⁴ − 3x² + 2 is even, odd, or neither. Justify your answer algebraically.",
      "maxPoints": 2,
      "topic": "Polynomial Functions",
      "modelAnswer": "Compute g(−x) = (−x)⁴ − 3(−x)² + 2 = x⁴ − 3x² + 2 = g(x). Since g(−x) = g(x) for all x, the function is even.",
      "explanation": "Substituting −x leaves the function unchanged because every exponent is even, so g(−x) = g(x), the definition of an even function.",
      "diveDeep": "A function is even if g(−x) = g(x) (symmetric about the y-axis) and odd if g(−x) = −g(x) (symmetric about the origin). Test by substituting −x and simplifying. Polynomials with only even-degree terms are even; only odd-degree terms make it odd; a mix is neither. Justification must show the algebraic substitution, not just a graph.",
      "skill": "reasoning",
      "subTopic": "Polynomial Operations & Factoring",
      "difficulty": 3,
      "difficultyRationale": "Standard Part II open-ended question requiring multi-step math steps."
    },
    {
      "number": 29,
      "part": "B",
      "type": "written",
      "text": "The amount of caffeine in a person's body decreases by about 13% each hour. A cup of coffee contains 95 mg of caffeine. Write a function C(t) that models the amount of caffeine, in mg, remaining after t hours, and use it to determine the amount remaining after 5 hours, to the nearest milligram.",
      "maxPoints": 2,
      "topic": "Exponential & Logarithmic",
      "modelAnswer": "C(t) = 95(0.87)ᵗ, since a 13% decrease leaves 87% each hour. After 5 hours: C(5) = 95(0.87)⁵ ≈ 95(0.4984) ≈ 47 mg.",
      "explanation": "A 13% hourly decrease means each hour retains 100% − 13% = 87% = 0.87, so the exponential decay model is 95(0.87)ᵗ, giving about 47 mg at t = 5.",
      "diveDeep": "For exponential decay, the base is 1 minus the decay rate (here 1 − 0.13 = 0.87); for growth it would be 1 plus the rate. Set up the model as (initial)(base)ᵗ, then substitute the given time. Rounding only at the final step preserves accuracy; rounding the base early can shift the answer.",
      "skill": "modeling",
      "subTopic": "Exponential Models",
      "difficulty": 3,
      "difficultyRationale": "Standard exponential equation solving using logarithms."
    },
    {
      "number": 30,
      "part": "B",
      "type": "written",
      "text": "Explain how the graph of g(x) = −(x − 4)² + 3 is related to the graph of f(x) = x² in terms of transformations.",
      "maxPoints": 2,
      "topic": "Polynomial Functions",
      "modelAnswer": "Starting from f(x) = x²: the (x − 4) shifts the graph right 4 units, the negative sign reflects it over the x-axis (opening downward), and the + 3 shifts it up 3 units. The vertex moves from (0, 0) to (4, 3).",
      "explanation": "Each piece of g(x) corresponds to a transformation: horizontal shift right 4, reflection across the x-axis, and vertical shift up 3.",
      "diveDeep": "Read transformations from the standard vertex form a(x − h)² + k: h shifts horizontally, k shifts vertically, and the sign/size of a controls reflection and stretch. A negative leading coefficient flips the parabola downward. Describe transformations in order (inside affects x, outside affects y) and identify the resulting vertex (h, k).",
      "skill": "reasoning",
      "subTopic": "Polynomial Graphs, Zeros & Conics",
      "difficulty": 3,
      "difficultyRationale": "Standard Part II open-ended question requiring multi-step math steps."
    },
    {
      "number": 31,
      "part": "B",
      "type": "written",
      "text": "Given f(x) = x + 6, write the equation of f⁻¹(x), the inverse function.",
      "maxPoints": 2,
      "topic": "Polynomial Functions",
      "modelAnswer": "Let y = x + 6. Swap x and y: x = y + 6. Solve for y: y = x − 6. Therefore f⁻¹(x) = x − 6.",
      "explanation": "To find an inverse, swap x and y and solve for y; subtracting 6 from both sides gives f⁻¹(x) = x − 6.",
      "diveDeep": "Finding an inverse reverses the input–output roles: replace f(x) with y, switch x and y, then solve for y. The inverse undoes the original operation (here, addition of 6 becomes subtraction of 6). Verify with f(f⁻¹(x)) = x. Graphically, a function and its inverse are reflections over the line y = x.",
      "subTopic": "Polynomial Operations & Factoring",
      "difficulty": 3,
      "difficultyRationale": "Standard Part II open-ended question requiring multi-step math steps."
    },
    {
      "number": 32,
      "part": "B",
      "type": "written",
      "text": "In a recent online contest with a large number of randomly selected human players, the computer player won 67% of the time. The game-design company claims the computer can beat human players 70% of the time. The company runs a simulation assuming the computer wins 70% of the time; the simulation is approximately normal with a mean of 0.705 and a standard deviation of 0.045. Does the contest result provide evidence to contradict the designer's claim? Use the simulation results to justify your answer.",
      "maxPoints": 2,
      "topic": "Statistics & Probability",
      "modelAnswer": "The interval of plausible values within 2 standard deviations of the mean is 0.705 ± 2(0.045) = 0.705 ± 0.090, or about 0.615 to 0.795. Since the observed result 0.67 (67%) falls inside this interval, it is not unusual under the claim. Therefore the contest result does NOT provide evidence to contradict the designer's claim.",
      "explanation": "Because 0.67 lies within two standard deviations of the simulation mean (0.615 to 0.795), the observed value is consistent with the 70% claim, so there is no evidence to reject it.",
      "diveDeep": "Simulation-based inference compares an observed statistic to the interval of values produced under the assumed model, typically using mean ± 2 standard deviations as the \"usual\" range (about 95% of outcomes). If the observed value falls inside that interval it is plausible; if it falls outside it provides evidence against the claim. Always state both the interval and whether the observation falls in or out, then conclude in context.",
      "skill": "reasoning",
      "subTopic": "Normal Distribution",
      "difficulty": 3,
      "difficultyRationale": "Standard Part II open-ended question requiring multi-step math steps."
    },
    {
      "number": 33,
      "part": "C",
      "type": "written",
      "text": "Solve algebraically for x: 1 ÷ (x − 2) + 3 ÷ (x − 4) = 5. Express any non-real answers in simplest a + bi form.",
      "maxPoints": 4,
      "topic": "Rational & Radical",
      "modelAnswer": "Multiply both sides by (x − 2)(x − 4): (x − 4) + 3(x − 2) = 5(x − 2)(x − 4). Left side: x − 4 + 3x − 6 = 4x − 10. Right side: 5(x² − 6x + 8) = 5x² − 30x + 40. So 5x² − 30x + 40 = 4x − 10, giving 5x² − 34x + 50 = 0. Quadratic formula: x = [34 ± √(1156 − 1000)] ÷ 10 = [34 ± √156] ÷ 10 = [34 ± 2√39] ÷ 10 = (17 ± √39) ÷ 5. Both solutions are real and valid (neither equals 2 or 4).",
      "explanation": "Clearing denominators converts the equation to the quadratic 5x² − 34x + 50 = 0, whose positive discriminant gives the two real solutions x = (17 ± √39) ÷ 5.",
      "diveDeep": "Solve rational equations by multiplying through by the least common denominator, then solving the resulting polynomial. Critically, exclude any solution that makes an original denominator zero (here x ≠ 2, 4). Simplify radicals fully and reduce fractions. If the discriminant were negative you would express answers as a + bi.",
      "skill": "procedure",
      "subTopic": "Rational Expressions & Equations",
      "difficulty": 4,
      "difficultyRationale": "Part III multi-step mathematical modeling or complex algebraic analysis."
    },
    {
      "number": 34,
      "part": "C",
      "type": "written",
      "text": "A highly selective college reports that the mean score earned by accepted students on the Mathematics Level 2 subject test is 750 with a standard deviation of 20, and that the scores are approximately normally distributed. Determine the interval representing the middle 95% of student scores. Then, to the nearest whole percent, determine the percentage of accepted students who scored 760 or less.",
      "maxPoints": 4,
      "topic": "Statistics & Probability",
      "modelAnswer": "Middle 95% lies within 2 standard deviations: 750 ± 2(20) = 750 ± 40, so the interval is 710 to 790. For 760 or less, find the z-score: z = (760 − 750) ÷ 20 = 0.5. Using the normal distribution, P(z ≤ 0.5) ≈ 0.6915, so about 69% of accepted students scored 760 or less.",
      "explanation": "The empirical rule gives the middle 95% as mean ± 2 SD (710 to 790), and a z-score of 0.5 corresponds to a cumulative probability of about 0.69 or 69%.",
      "diveDeep": "The empirical (68-95-99.7) rule places the middle 95% within 2 standard deviations of the mean. For non-rule percentages, convert to a z-score z = (x − μ)/σ and use normalcdf on a calculator or a z-table for the cumulative area. Report the area as a percent and round only at the end. Distinguish \"at most\" (cumulative to the left) from \"at least\" (1 minus the left area).",
      "subTopic": "Normal Distribution",
      "difficulty": 4,
      "difficultyRationale": "Part III multi-step mathematical modeling or complex algebraic analysis."
    },
    {
      "number": 35,
      "part": "C",
      "type": "written",
      "text": "For c(x) = 3x² − 4x + 7 and d(x) = x − 2, determine c(x)·d(x) − 2[d(x)]² as a polynomial in standard form.",
      "maxPoints": 4,
      "topic": "Polynomial Functions",
      "modelAnswer": "c(x)·d(x) = (3x² − 4x + 7)(x − 2) = 3x³ − 6x² − 4x² + 8x + 7x − 14 = 3x³ − 10x² + 15x − 14. Then 2[d(x)]² = 2(x − 2)² = 2(x² − 4x + 4) = 2x² − 8x + 8. Subtracting: 3x³ − 10x² + 15x − 14 − (2x² − 8x + 8) = 3x³ − 12x² + 23x − 22.",
      "explanation": "Multiplying c(x) by d(x) and subtracting 2[d(x)]² and combining like terms yields the polynomial 3x³ − 12x² + 23x − 22 in standard form.",
      "diveDeep": "Polynomial arithmetic requires careful distribution and sign tracking, especially when subtracting an entire expression — distribute the negative across every term. Expand squares fully using (a − b)² = a² − 2ab + b² rather than squaring termwise. Standard form means descending powers of x with like terms combined.",
      "subTopic": "Polynomial Operations & Factoring",
      "difficulty": 4,
      "difficultyRationale": "Part III multi-step mathematical modeling or complex algebraic analysis."
    },
    {
      "number": 36,
      "part": "C",
      "type": "written",
      "text": "Christopher works for a defense contractor and earned $85,000 his first year. For each additional year he receives a 2.5% raise. Write a geometric series formula, Cₙ, for Christopher's total earnings over n years. Use this formula to find his total earnings, to the nearest hundred dollars, over his first 10 years of employment.",
      "maxPoints": 4,
      "topic": "Sequences & Series",
      "modelAnswer": "Each year's salary forms a geometric sequence with a₁ = 85000 and r = 1.025. The sum of n terms is Cₙ = 85000(1 − 1.025ⁿ) ÷ (1 − 1.025). For n = 10: C₁₀ = 85000(1 − 1.025¹⁰) ÷ (1 − 1.025) = 85000(1 − 1.280085) ÷ (−0.025) = 85000(0.280085) ÷ 0.025 ≈ 952,289, so about $952,300.",
      "explanation": "Total earnings are the sum of a geometric series with ratio 1.025; applying the finite geometric sum formula for 10 terms gives approximately $952,300.",
      "diveDeep": "A geometric series sum is Sₙ = a₁(1 − rⁿ)/(1 − r), distinct from the single-term explicit formula a₁rⁿ⁻¹. Identify the first term and common ratio (a 2.5% raise means r = 1.025), then substitute n. Keep full precision through the computation and round only the final dollar amount. Confusing the term formula with the sum formula is the most common error here.",
      "skill": "modeling",
      "subTopic": "Series",
      "difficulty": 4,
      "difficultyRationale": "Part III multi-step mathematical modeling or complex algebraic analysis."
    },
    {
      "number": 37,
      "part": "D",
      "type": "written",
      "text": "Cesium-137 decay can be modeled with the formula A(t) = A₀e^(kt), where A(t) is the mass remaining in grams after t years and A₀ is the initial mass. A 500-gram sample of cesium-137 takes approximately 60.34 years to decay to 125 grams. (a) Determine the constant k, to the nearest thousandth, and write the function A(t) for the 500-gram sample. (b) Graph A(t) from t = 0 to t = 150 years. (c) Use A(t) to calculate the average rate of change in grams per year from t = 0 to t = 60 years, to the nearest tenth, and explain what this value means in context.",
      "maxPoints": 6,
      "topic": "Exponential & Logarithmic",
      "modelAnswer": "(a) 125 = 500e^(60.34k), so 0.25 = e^(60.34k). Take ln: ln(0.25) = 60.34k, k = ln(0.25) ÷ 60.34 ≈ −1.38629 ÷ 60.34 ≈ −0.023. Thus A(t) = 500e^(−0.023t). (b) The graph is a decreasing exponential starting at (0, 500), passing near (60.34, 125), and approaching 0 as t increases to 150; at t = 150, A(150) = 500e^(−0.023·150) = 500e^(−3.45) ≈ 16 grams. (c) Average rate of change from t = 0 to t = 60: A(0) = 500, A(60) = 500e^(−0.023·60) = 500e^(−1.38) ≈ 125.8. Rate = (125.8 − 500) ÷ (60 − 0) = −374.2 ÷ 60 ≈ −6.2 grams per year. This means that, on average, the sample lost about 6.2 grams of cesium-137 per year over the first 60 years.",
      "explanation": "Solving 125 = 500e^(60.34k) gives k ≈ −0.023, so A(t) = 500e^(−0.023t); the average rate of change over [0, 60] is the slope between the endpoints, about −6.2 g/yr, indicating an average loss of roughly 6.2 grams per year.",
      "diveDeep": "Continuous exponential decay uses A₀e^(kt) with k negative; solve for k by isolating the exponential and applying the natural log. Average rate of change is the slope of the secant line, [A(b) − A(a)]/(b − a), and carries units (grams per year here). A negative rate signals decay, and interpreting it in context — average grams lost per year — is required for full credit. Note the secant rate understates early loss and overstates later loss because the true (instantaneous) rate changes throughout exponential decay.",
      "skill": "reasoning",
      "subTopic": "Exponential Models",
      "difficulty": 5,
      "difficultyRationale": "Part IV constructed-response requiring multi-step modeling and comparison."
    }
  ]
}
