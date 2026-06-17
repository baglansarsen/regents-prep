// Enriched Algebra 2 exam — tagged with skill + subTopic (see content/_shared/lessonEngine.js)
export default {
  "id": "a2-aug-2022",
  "subject": "algebra-2",
  "year": 2022,
  "session": "August",
  "totalMinutes": 180,
  "questions": [
    {
      "number": 1,
      "part": "A",
      "text": "Given i is the imaginary unit, (2 + 3i)² is equivalent to",
      "choices": [
        "13",
        "13 + 12i",
        "−5",
        "−5 + 12i"
      ],
      "topic": "Complex Numbers",
      "correct": 3,
      "explanation": "Expanding (2 + 3i)² = 4 + 12i + 9i², and since i² = −1, this becomes 4 + 12i − 9 = −5 + 12i.",
      "diveDeep": "Squaring a complex binomial uses the same (a + b)² = a² + 2ab + b² pattern as real numbers, but you must replace i² with −1 at the end. A very common mistake is forgetting that 9i² = −9 (not +9), which leads students to pick 13 + 12i. Always isolate the real part (from the 4 and the i² term) and the imaginary part (the 2ab middle term) separately before combining.",
      "subTopic": "Complex Operations"
    },
    {
      "number": 2,
      "part": "A",
      "text": "The expression 16x⁴ − 64 can be factored completely as",
      "choices": [
        "16(x² − 2)(x² + 2)",
        "16(x² + 2)²",
        "(4x² − 8)(4x² + 8)",
        "16(x − 2)(x + 2)(x² + 2)"
      ],
      "topic": "Polynomial Functions",
      "correct": 0,
      "explanation": "Factor out 16 to get 16(x⁴ − 4), then treat x⁴ − 4 as a difference of squares: (x² − 2)(x² + 2).",
      "diveDeep": "Always pull out the greatest common factor first — here 16 — before applying any special-product patterns. The result is a difference of squares since x⁴ = (x²)² and 4 = 2². Note that x² − 2 cannot factor further over the rationals (2 is not a perfect square), so the answer stays as a difference involving radicals only if you allow irrational factors. Choice (C) is wrong because it leaves a common factor of 4 in each binomial, so it is not factored completely.",
      "subTopic": "Polynomial Operations & Factoring"
    },
    {
      "number": 3,
      "part": "A",
      "text": "Which expression is equivalent to ⁵√(x²)?",
      "choices": [
        "x^(5/2)",
        "x^(2/5)",
        "x^10",
        "x^(−3)"
      ],
      "topic": "Rational & Radical",
      "correct": 1,
      "explanation": "A radical converts to a rational exponent as the n-th root of x^m equals x^(m/n), so ⁵√(x²) = x^(2/5).",
      "diveDeep": "The conversion rule is ⁿ√(xᵐ) = x^(m/n): the index of the radical becomes the denominator of the exponent, and the power inside becomes the numerator. A common error is flipping these and writing x^(5/2). Rewriting radicals as rational exponents is essential for combining or simplifying expressions, since exponent rules (adding, multiplying) only apply once everything is in exponent form.",
      "subTopic": "Radical Expressions & Equations"
    },
    {
      "number": 4,
      "part": "A",
      "text": "If f(x) = 2x³ − 3x − 1, then f(−2) is equal to",
      "choices": [
        "−11",
        "21",
        "−23",
        "9"
      ],
      "topic": "Polynomial Functions",
      "correct": 0,
      "explanation": "Substitute x = −2: 2(−8) − 3(−2) − 1 = −16 + 6 − 1 = −11.",
      "diveDeep": "Function evaluation means replacing every x with the given input and following order of operations carefully — exponents before multiplication. The biggest pitfall with negative inputs is sign errors: (−2)³ = −8, and −3 times −2 is +6. Use parentheses around the substituted value to avoid dropping signs, especially with odd powers, which preserve the negative sign.",
      "subTopic": "Polynomial Operations & Factoring"
    },
    {
      "number": 5,
      "part": "A",
      "text": "After a televised singing competition, Liem wanted to determine if more animated singers received louder applause. He watched several nights of auditions and found that the more animated singers did receive louder applause. The study Liem conducted would be best described as",
      "choices": [
        "experimental",
        "a sample survey",
        "observational",
        "a random assignment"
      ],
      "topic": "Statistics & Probability",
      "correct": 2,
      "explanation": "Liem only watched and recorded what naturally happened without assigning treatments or manipulating any variable, which is the definition of an observational study.",
      "diveDeep": "The key distinction is whether the researcher imposes a treatment (experiment) or merely observes existing conditions (observational study). Because Liem did not control which singers were animated or randomly assign anyone to a group, there is no experiment or random assignment. A sample survey would involve asking respondents questions. Observational studies can reveal associations but cannot establish cause-and-effect, since lurking variables are not controlled.",
      "subTopic": "Data Analysis"
    },
    {
      "number": 6,
      "part": "A",
      "text": "Which equation represents a polynomial function with zeros at x = 3, x = −1, and x = 2?",
      "choices": [
        "f(x) = (x + 3)(x − 1)(x + 2)",
        "f(x) = (x − 3)(x + 1)(x − 2)",
        "f(x) = (x − 3)(x − 1)(x − 2)",
        "f(x) = (x + 3)(x + 1)(x + 2)"
      ],
      "topic": "Polynomial Functions",
      "correct": 1,
      "explanation": "A zero at x = a corresponds to the factor (x − a), so zeros at 3, −1, and 2 give factors (x − 3), (x + 1), and (x − 2).",
      "diveDeep": "The Factor Theorem states that x = a is a zero of a polynomial exactly when (x − a) is a factor. The sign inside each factor is the opposite of the zero: a zero of −1 produces the factor (x + 1). Many students reverse the sign, choosing (x − 3)(x − 1)(x − 2). To check, substitute each zero back in and confirm the product equals 0.",
      "subTopic": "Polynomial Graphs, Zeros & Conics"
    },
    {
      "number": 7,
      "part": "A",
      "text": "The solutions to the equation x² + 6x + 13 = 0 are",
      "choices": [
        "−3 ± 2i",
        "3 ± 2i",
        "−3 ± 4i",
        "−6 ± 2i"
      ],
      "topic": "Complex Numbers",
      "correct": 0,
      "explanation": "Completing the square gives (x + 3)² = −4, so x + 3 = ±2i and x = −3 ± 2i.",
      "diveDeep": "When the discriminant b² − 4ac is negative (here 36 − 52 = −16), the solutions are a complex-conjugate pair. Using the quadratic formula, x = (−6 ± √(−16))/2 = (−6 ± 4i)/2 = −3 ± 2i. Remember √(−16) = 4i, and divide both the real part and the imaginary part by the denominator. Complex roots always come in conjugate pairs for real-coefficient polynomials.",
      "subTopic": "Complex Operations"
    },
    {
      "number": 8,
      "part": "A",
      "text": "The expression log(a²b³) is equivalent to",
      "choices": [
        "2 log a + 3 log b",
        "6 log(ab)",
        "log a² + log b³ as a product",
        "2 log a · 3 log b"
      ],
      "topic": "Exponential & Logarithmic",
      "correct": 0,
      "explanation": "The product rule splits log(a²b³) into log a² + log b³, and the power rule brings exponents down as coefficients: 2 log a + 3 log b.",
      "diveDeep": "Three log rules drive this: the product rule log(MN) = log M + log N, the power rule log(Mᵖ) = p log M, and the quotient rule for division. Apply the product rule first to separate the factors, then the power rule to lower each exponent. A frequent error is multiplying the resulting terms (2 log a · 3 log b) instead of adding them — the logs of a product become a sum, never a product.",
      "subTopic": "Logarithms"
    },
    {
      "number": 9,
      "part": "A",
      "text": "A study of bee colonies showed the population could be modeled by P(t) = 5000(1.04)ᵗ, where t is time in years. What is the approximate percent rate of growth per year?",
      "choices": [
        "0.04%",
        "1.04%",
        "4%",
        "40%"
      ],
      "topic": "Exponential & Logarithmic",
      "correct": 2,
      "explanation": "In the model y = a(b)ᵗ the base 1.04 equals 1 + r, so r = 0.04, which is a 4% annual growth rate.",
      "diveDeep": "For exponential models written as a(1 + r)ᵗ, the growth rate r is found by subtracting 1 from the base. Here 1.04 − 1 = 0.04 = 4%. Bases greater than 1 indicate growth; bases between 0 and 1 indicate decay (e.g., 0.96 would be 4% decay). Do not confuse the decimal 0.04 with 0.04% — converting to a percent means multiplying by 100, giving 4%.",
      "skill": "modeling",
      "subTopic": "Exponential Models"
    },
    {
      "number": 10,
      "part": "A",
      "text": "What is the total number of points of intersection of the graphs of the equations y = eˣ and xy = 20?",
      "choices": [
        "1",
        "3",
        "2",
        "0"
      ],
      "topic": "Systems & Inequalities",
      "correct": 0,
      "explanation": "Substituting gives x·eˣ = 20; this product is negative or near zero for x ≤ 0 and grows past 20 for one positive x, so the curves cross exactly once.",
      "diveDeep": "Solving a system graphically means finding where two curves meet. Here y = eˣ is always positive, so xy = 20 forces x > 0 (positive times positive equals positive 20). On the positive side, x·eˣ increases steadily from 0 toward infinity, passing through 20 exactly one time. Sketching or using a graphing calculator confirms a single intersection; the hyperbola branch in the third quadrant never meets the always-positive exponential.",
      "subTopic": "Systems & Inequalities"
    },
    {
      "number": 11,
      "part": "A",
      "text": "The amount of a substance, A(t), in grams, remaining after t days is modeled by A(t) = 50(0.5)^(t/3). Which statement is false?",
      "choices": [
        "In 20 days, there is no substance remaining.",
        "After two half-lives, there is 25% of the substance remaining.",
        "The half-life of the substance is 3 days.",
        "The initial amount of the substance is 50 grams."
      ],
      "topic": "Exponential & Logarithmic",
      "correct": 0,
      "explanation": "At t = 20, A(20) = 50(0.5)^(20/3) ≈ 0.49 grams — a small amount still remains, so the claim that none remains is false.",
      "diveDeep": "Exponential decay never reaches exactly zero; it only approaches zero asymptotically, so any statement that the substance fully disappears at a finite time is false. The exponent t/3 shows the half-life is 3 days (each 3-day block multiplies by 0.5), the coefficient 50 is the initial amount, and after two half-lives the amount is (0.5)² = 25%. Always test each statement by substituting values or reading the structure of the model.",
      "skill": "modeling",
      "subTopic": "Exponential Models"
    },
    {
      "number": 12,
      "part": "A",
      "text": "A parabola that has a vertex at (2, 1) and a focus of (2, −3) has an equation of",
      "choices": [
        "y = (1/16)(x − 2)² + 1",
        "y = −(1/16)(x − 2)² + 1",
        "y = −(1/16)(x + 2)² − 1",
        "y = −(1/16)(x − 2)² − 3"
      ],
      "topic": "Polynomial Functions",
      "correct": 1,
      "explanation": "The focus (2, −3) lies below the vertex (2, 1), so the parabola opens downward with p = 4, giving a = −1/(4p) = −1/16 and vertex form y = −(1/16)(x − 2)² + 1.",
      "diveDeep": "For a vertical parabola in vertex form y = a(x − h)² + k, the vertex is (h, k) and a = 1/(4p) where p is the directed distance from vertex to focus. Here the focus is 4 units below the vertex, so the parabola opens down (a is negative) and |p| = 4 gives |a| = 1/16. The vertex (2, 1) fills in h = 2 and k = 1. The direction of opening (sign of a) is the most commonly missed piece — a focus below the vertex always means a downward-opening, negative-a parabola.",
      "subTopic": "Polynomial Graphs, Zeros & Conics"
    },
    {
      "number": 13,
      "part": "A",
      "text": "The expression (2b√(a)) · (3√(a) − 4√(b)) is equivalent to",
      "choices": [
        "6ab − 8b√(ab)",
        "6ab",
        "−2√(ab)",
        "6√(a)b − 8b√(ab)"
      ],
      "topic": "Rational & Radical",
      "correct": 0,
      "explanation": "Distributing 2b√a gives 2b√a·3√a = 6ab and 2b√a·(−4√b) = −8b√(ab), so the result is 6ab − 8b√(ab).",
      "diveDeep": "Multiplying radical expressions follows the distributive property combined with the rule √a · √a = a and √a · √b = √(ab). The first product, 2b·3·(√a·√a) = 6b·a = 6ab, has no remaining radical because √a·√a = a. The second product keeps a radical, √(ab). Keep the rational coefficients and the radical parts separate as you multiply, and only combine like radical terms at the end.",
      "subTopic": "Radical Expressions & Equations"
    },
    {
      "number": 14,
      "part": "A",
      "text": "Given f(x) = 3^(x−1) + 2, as x → −∞,",
      "choices": [
        "f(x) → −1",
        "f(x) → 2",
        "f(x) → 0",
        "f(x) → −∞"
      ],
      "topic": "Exponential & Logarithmic",
      "correct": 1,
      "explanation": "As x → −∞, 3^(x−1) → 0, so f(x) → 0 + 2 = 2, the horizontal asymptote.",
      "diveDeep": "For exponential functions of the form a·bˣ + k with b > 1, the term bˣ shrinks toward 0 as x heads to negative infinity, leaving the constant k as the horizontal asymptote. Here k = 2, so the end behavior on the left is f(x) → 2. The vertical shift +2 is what moves the asymptote off the x-axis; without it the function would approach 0. Identifying the constant added to the exponential is the fast way to read off the left-end behavior.",
      "subTopic": "Exponential Models"
    },
    {
      "number": 15,
      "part": "A",
      "text": "For all values of x for which the expression is defined, (x² + 3x)/(x² + 5x + 6) is equivalent to",
      "choices": [
        "(1 − x)/(x + 2)",
        "(3x)/(5x + 6)",
        "x/(x + 2)",
        "1 + 1/(2x + 6)"
      ],
      "topic": "Rational & Radical",
      "correct": 2,
      "explanation": "Factor numerator to x(x + 3) and denominator to (x + 2)(x + 3); the common (x + 3) cancels, leaving x/(x + 2).",
      "diveDeep": "Simplifying a rational expression requires factoring both numerator and denominator completely, then cancelling identical factors — never individual terms. Here x² + 3x = x(x + 3) and x² + 5x + 6 = (x + 2)(x + 3), so the (x + 3) factors cancel. You cannot simply cancel an x or a 3 across a plus sign; only whole factors cancel. The simplified form is valid for all x except where the original denominator was zero (x ≠ −2 and x ≠ −3).",
      "subTopic": "Rational Expressions & Equations"
    },
    {
      "number": 16,
      "part": "A",
      "text": "A recursive formula for the sequence 64, 48, 36, … is",
      "choices": [
        "aₙ = 64(0.75)ⁿ⁻¹",
        "aₙ = 64 + (n − 1)(−16)",
        "a₁ = 64, aₙ = aₙ₋₁ + 0.75",
        "a₁ = 64, aₙ = 0.75·aₙ₋₁"
      ],
      "topic": "Sequences & Series",
      "correct": 3,
      "explanation": "Each term is 0.75 times the previous one (48/64 = 36/48 = 0.75), so the recursive rule is a₁ = 64 with aₙ = 0.75·aₙ₋₁.",
      "diveDeep": "A recursive formula defines each term using the term(s) before it and must include a starting value. This sequence is geometric with common ratio r = 0.75, found by dividing any term by the one before it. Choices (A) is the explicit (closed) form, not recursive, and choice (B) describes an arithmetic sequence with a constant difference, which this is not. The defining feature of a recursive geometric rule is multiplying the previous term by the common ratio.",
      "subTopic": "Sequences"
    },
    {
      "number": 17,
      "part": "A",
      "text": "Which expression is equivalent to (x³ − 2)/(x − 2)?",
      "choices": [
        "x²",
        "x² − 2",
        "x² + 2x + 4 + 6/(x − 2)",
        "x² − 2x + 4 − 10/(x − 2)"
      ],
      "topic": "Polynomial Functions",
      "correct": 2,
      "explanation": "Dividing x³ − 2 by x − 2 gives quotient x² + 2x + 4 with remainder 6, so the expression equals x² + 2x + 4 + 6/(x − 2).",
      "diveDeep": "Polynomial long division or synthetic division produces a quotient plus a remainder over the divisor. Using synthetic division with 2: bring down coefficients 1, 0, 0, −2; you get 1, 2, 4 with remainder 6. By the Remainder Theorem, the remainder equals the dividend evaluated at x = 2: (2)³ − 2 = 6, confirming the remainder. Write the result as quotient + remainder/divisor, and double-check the remainder using direct substitution.",
      "subTopic": "Polynomial Operations & Factoring"
    },
    {
      "number": 18,
      "part": "A",
      "text": "What is the solution set of the equation 4/(k² − 8k + 12) = k/(k − 2) + 1/(k − 6)?",
      "choices": [
        "{−1, 6}",
        "{−1}",
        "{1, −6}",
        "{1}"
      ],
      "topic": "Rational & Radical",
      "correct": 3,
      "explanation": "Factoring the denominator (k − 2)(k − 6) and clearing fractions gives k² − 5k + 4 = 0; the roots are 1 and 4, but checking shows only k = 1 (k = 6 would be extraneous), leaving {1}.",
      "diveDeep": "Rational equations are solved by multiplying through by the least common denominator — here (k − 2)(k − 6) — to clear the fractions, then solving the resulting polynomial. Crucially, you must reject any solution that makes an original denominator zero (k = 2 or k = 6), called an extraneous solution. Always factor the denominators first to identify these restrictions, solve the cleared equation, and then verify each candidate against the domain restrictions.",
      "subTopic": "Rational Expressions & Equations"
    },
    {
      "number": 19,
      "part": "A",
      "text": "Given the polynomial identity x⁶ + y⁶ = (x² + y²)(x⁴ − x²y² + y⁴), which equation must also be true for all values of x and y?",
      "choices": [
        "x⁶ + y⁶ = x²(x⁴ − x²y² + y⁴) + y²(x⁴ − x²y² + y⁴)",
        "x⁶ + y⁶ = (x² + y²)(x² − y²)(x² − y²)",
        "(x³ + y³)² = (x² + y²)(x⁴ − x²y² + y⁴)",
        "(x⁶ + y⁶) − (x² + y²) = x⁴ − x²y² + y⁴"
      ],
      "topic": "Polynomial Functions",
      "correct": 0,
      "explanation": "Distributing (x² + y²) across the second factor gives x²(x⁴ − x²y² + y⁴) + y²(x⁴ − x²y² + y⁴), which is just the distributive property applied to the given identity.",
      "diveDeep": "An identity remains true under any valid algebraic transformation, and the distributive property a(b) = a·b + (split) is one such transformation. Choice (A) simply distributes the binomial factor (x² + y²) term-by-term across the trinomial, so it must hold for all x and y. The other choices change the structure incorrectly — for example (C) wrongly squares x³ + y³. To verify an identity claim, test with simple values like x = 1, y = 1, but recognize that pure distribution is always valid.",
      "subTopic": "Polynomial Operations & Factoring"
    },
    {
      "number": 20,
      "part": "A",
      "text": "Given p(θ) = 3sin(½θ) on the interval −π ≤ θ ≤ π, the function p",
      "choices": [
        "decreases, then increases",
        "decreases throughout the interval",
        "increases, then decreases",
        "increases throughout the interval"
      ],
      "topic": "Trigonometric Functions",
      "correct": 3,
      "explanation": "Over −π to π the argument ½θ ranges from −π/2 to π/2, where sine increases the whole way, so p increases throughout the interval.",
      "diveDeep": "For a sine function, behavior depends on the inner argument. Here ½θ spans only −π/2 to π/2 as θ goes from −π to π, and sine rises monotonically from −1 to 1 across that quarter-to-quarter span. The amplitude 3 stretches the values but does not change whether the function increases or decreases. Track the range of the inner expression (½θ) against the known increasing/decreasing intervals of sine to determine monotonic behavior.",
      "subTopic": "Unit Circle & Radians"
    },
    {
      "number": 21,
      "part": "A",
      "text": "A company fired several employees in order to save money. The amount of money the company saved per year over five years following the loss of employees is shown in the table below. The savings form a geometric sequence: 59,000, 64,900, 71,390, 78,529, 86,381.90. Which expression determines the total amount of money saved by the company over 5 years?",
      "choices": [
        "(59,000 − 59,000(1.1)⁵)/(1 − 1.1)",
        "59,000(1.1)ⁿ",
        "(59,000 − 59,000(0.1)⁵)/(1 − 0.1)",
        "59,000(0.1)ⁿ⁻¹"
      ],
      "topic": "Sequences & Series",
      "correct": 0,
      "image": "/images/exams/alg2-august-2022/q21.png",
      "explanation": "The yearly savings are geometric with first term 59,000 and ratio 1.1; the sum of 5 terms is a₁(1 − rⁿ)/(1 − r) = (59,000 − 59,000(1.1)⁵)/(1 − 1.1).",
      "diveDeep": "The geometric series sum formula is Sₙ = a₁(1 − rⁿ)/(1 − r). First identify the common ratio by dividing consecutive terms (64,900/59,000 = 1.1), confirming r = 1.1, not 0.1. Then plug a₁ = 59,000, r = 1.1, and n = 5 into the formula. Choices using 0.1 mistake the percent increase for the ratio itself — the ratio is 1 + 0.1 = 1.1, not 0.1.",
      "skill": "modeling",
      "subTopic": "Sequences"
    },
    {
      "number": 22,
      "part": "A",
      "text": "A rush-hour commuter train has arrived on time 64 of its first 80 days. As arrivals continue, which equation can be used to find x, the number of consecutive days that the train must arrive on schedule to raise its on-time performance rate to 90%?",
      "choices": [
        "64/(80 + x) = 90/100",
        "(64 + x)/(80 + x) = 90/100",
        "(64 + x)/80 = 90/100",
        "x/(80 + x) = 90/100"
      ],
      "topic": "Rational & Radical",
      "correct": 1,
      "explanation": "Each additional on-time day increases both the on-time count (64 + x) and the total days (80 + x), so the rate equation is (64 + x)/(80 + x) = 90/100.",
      "diveDeep": "A performance rate is on-time days divided by total days. Adding x consecutive on-time days raises the numerator to 64 + x AND the denominator to 80 + x, because every new day counts in both totals. The most common mistake is updating only one part of the fraction. Setting the new ratio equal to the target 90/100 and solving gives x = 80, meaning 80 more on-time days are needed.",
      "skill": "modeling",
      "subTopic": "Rational Expressions & Equations"
    },
    {
      "number": 23,
      "part": "A",
      "text": "Given f(x) = 2 − 5x + 4, restated as f(x) = −5x + 6, which statement is true of the inverse function f⁻¹(x)?",
      "choices": [
        "f⁻¹(x) is a line with slope 2.",
        "f⁻¹(x) is a line with slope −5.",
        "f⁻¹(x) passes through the point (6, −5).",
        "f⁻¹(x) has a y-intercept at (0, −24)."
      ],
      "topic": "Functions",
      "correct": 2,
      "explanation": "Because f(0) = 6 (the point (0, 6) is on f), the inverse contains the swapped point (6, 0)... and more directly, since f maps to give the point, the inverse reflects ordered pairs over y = x, so (−5, 6) on f gives (6, −5) on f⁻¹.",
      "diveDeep": "The inverse function reverses every ordered pair: if (a, b) is on f, then (b, a) is on f⁻¹, a reflection over the line y = x. For a linear function, the inverse is also linear, and its slope is the reciprocal of the original slope (not the same or the negative). To test whether a point lies on f⁻¹, swap its coordinates and check whether that swapped point lies on f. This swapping rule is the fastest way to verify inverse-function statements.",
      "subTopic": "Polynomial Operations & Factoring"
    },
    {
      "number": 24,
      "part": "A",
      "text": "The amount of a substance, A(t), that remains after t days can be given by the equation A(t) = A₀(0.5)^(t/0.0803), where A₀ represents the initial amount of the substance. An equivalent form of this equation is",
      "choices": [
        "A(t) = A₀(0.000178)ᵗ",
        "A(t) = A₀(0.04015)ᵗ",
        "A(t) = A₀(0.945861)ᵗ",
        "A(t) = A₀(1.08361)ᵗ"
      ],
      "topic": "Exponential & Logarithmic",
      "correct": 0,
      "explanation": "Rewrite (0.5)^(t/0.0803) as ((0.5)^(1/0.0803))ᵗ; since 0.5^(1/0.0803) ≈ 0.000178, the equivalent base is 0.000178.",
      "diveDeep": "To change the base of an exponential model, use the power-of-a-power rule: b^(t/c) = (b^(1/c))ᵗ. Here you compute 0.5 raised to the power 1/0.0803 ≈ 12.45, which equals about 0.000178. The extremely small base reflects very rapid decay (a short half-life of about 0.0803 days). Always isolate the t exponent by factoring out the constant in the denominator into the base, then evaluate the new base on a calculator.",
      "skill": "modeling",
      "subTopic": "Exponential Models"
    },
    {
      "number": 25,
      "part": "B",
      "type": "written",
      "text": "Given y = 9, express √(−81) − (y + i)² in simplest a + bi form.",
      "topic": "Complex Numbers",
      "explanation": "√(−81) = 9i, and (9 + i)² = 81 + 18i + i² = 80 + 18i, so 9i − (80 + 18i) = −80 − 9i.",
      "diveDeep": "Working with complex numbers requires converting √(negative) into i form (√(−81) = 9i) before any arithmetic, and replacing i² with −1 when expanding squares. Distribute the subtraction carefully across both the real and imaginary parts of the squared binomial. Group all real terms and all imaginary terms separately to reach the standard a + bi form. A sign slip on the subtracted parenthesis is the most common scoring error here.",
      "modelAnswer": "First, √(−81) = √(81)·√(−1) = 9i. Next expand (9 + i)² = 9² + 2(9)(i) + i² = 81 + 18i + (−1) = 80 + 18i. Now subtract: 9i − (80 + 18i) = 9i − 80 − 18i = −80 − 9i. In simplest a + bi form the answer is −80 − 9i.",
      "skill": "procedure",
      "subTopic": "Complex Operations"
    },
    {
      "number": 26,
      "part": "B",
      "type": "written",
      "text": "Show why x = 4 is a solution to the equation x³ − 6x² + 3x + 4 = −4 by using the Remainder Theorem.",
      "topic": "Polynomial Functions",
      "explanation": "Evaluating the polynomial at x = 4 gives 64 − 96 + 12 + 4 = −16... so we test the equation form: bringing −4 to the left gives x³ − 6x² + 3x + 8, and substituting 4 yields 0, confirming x = 4 is a root.",
      "diveDeep": "The Remainder Theorem says that dividing a polynomial p(x) by (x − a) leaves a remainder equal to p(a); when that remainder is 0, x = a is a solution. To apply it to an equation, first move everything to one side so it equals zero, then evaluate at the candidate value. If the result is 0, the value is a verified solution. This avoids long division entirely — direct substitution gives the remainder instantly.",
      "modelAnswer": "Rewrite the equation with all terms on one side: x³ − 6x² + 3x + 4 = −4 becomes x³ − 6x² + 3x + 8 = 0. By the Remainder Theorem, x = 4 is a solution if substituting 4 makes the polynomial equal 0. Compute: (4)³ − 6(4)² + 3(4) + 8 = 64 − 6(16) + 12 + 8 = 64 − 96 + 12 + 8 = 0. Since the value is 0, the remainder upon dividing by (x − 4) is 0, so x = 4 is a solution to the equation.",
      "subTopic": "Polynomial Operations & Factoring"
    },
    {
      "number": 27,
      "part": "B",
      "type": "written",
      "text": "Find the quotient when 6x³ + 11x² − 4x − 9 is divided by 3x − 2.",
      "topic": "Polynomial Functions",
      "explanation": "Polynomial long division gives 2x² + 5x + 2 with a remainder of −5, so the quotient is 2x² + 5x + 2 − 5/(3x − 2).",
      "diveDeep": "When the divisor is not in the form (x − a), use polynomial long division rather than synthetic division. Divide the leading term of the dividend by the leading term of the divisor at each step (6x³ ÷ 3x = 2x²), multiply back, subtract, and bring down the next term. Keep terms aligned by degree to avoid arithmetic slips. The final answer is the quotient plus the remainder written over the divisor.",
      "modelAnswer": "Use polynomial long division. 6x³ ÷ 3x = 2x²; multiply 2x²(3x − 2) = 6x³ − 4x²; subtract to get 15x² − 4x. Next, 15x² ÷ 3x = 5x; multiply 5x(3x − 2) = 15x² − 10x; subtract to get 6x − 9. Then 6x ÷ 3x = 2; multiply 2(3x − 2) = 6x − 4; subtract to get a remainder of −5. The quotient is 2x² + 5x + 2 with remainder −5, written as 2x² + 5x + 2 − 5/(3x − 2).",
      "subTopic": "Polynomial Operations & Factoring"
    },
    {
      "number": 28,
      "part": "B",
      "type": "written",
      "text": "A study tracked the temperature of a cup of coffee as it cooled in a room. Determine the regression model that best fits the cooling data and explain why an exponential model is more appropriate than a linear model for describing how the coffee approaches room temperature.",
      "topic": "Statistics & Probability",
      "explanation": "Cooling slows as the coffee nears room temperature, producing a curved decline that levels off — behavior captured by an exponential (decay) model, not a constant-rate linear model.",
      "diveDeep": "Newton's Law of Cooling produces an exponential approach toward the ambient temperature, where the rate of cooling is proportional to the temperature difference. A linear model assumes a constant rate of change, which would predict the coffee cooling forever below room temperature — physically impossible. The residual plot for a linear fit on cooling data shows a clear curved pattern, indicating poor fit, while the exponential model's residuals are randomly scattered. Choosing a model means matching the shape of the data and the underlying real-world behavior.",
      "modelAnswer": "An exponential decay model of the form T(t) = a·bᵗ + r (where r is room temperature) best fits the data. As the coffee cools, the temperature difference between the coffee and the room shrinks, so the coffee cools more slowly over time and the curve flattens toward room temperature rather than continuing to drop at a steady rate. A linear model assumes a constant rate of cooling, which would incorrectly predict the temperature falling below room temperature and continuing indefinitely. The exponential model is more appropriate because it reflects the leveling-off behavior and yields a higher correlation coefficient and more randomly scattered residuals than the linear model.",
      "skill": "reasoning",
      "subTopic": "Data Analysis"
    },
    {
      "number": 29,
      "part": "B",
      "type": "written",
      "text": "Algebraically solve for all values of x: √(2x + 1) − 1 = x − 2. State whether any solutions are extraneous and justify your answer.",
      "topic": "Rational & Radical",
      "explanation": "Isolating the radical and squaring gives x² − 8x + 8 = 0... after correct setup the valid solution is x = 4, while a second candidate is extraneous because it fails the original equation.",
      "diveDeep": "Solving radical equations requires isolating the radical, squaring both sides, and then solving the resulting polynomial. Squaring can introduce extraneous solutions because it can turn a false statement into a true one, so every candidate must be checked in the ORIGINAL equation. Reject any value that makes the radicand negative or fails to balance the equation. The check step is not optional — it is part of earning full credit on these problems.",
      "modelAnswer": "Isolate the radical: √(2x + 1) = x − 1. Square both sides: 2x + 1 = (x − 1)² = x² − 2x + 1. Bring all terms to one side: 0 = x² − 4x, so 0 = x(x − 4), giving x = 0 or x = 4. Check x = 4: √(2·4 + 1) − 1 = √9 − 1 = 3 − 1 = 2, and x − 2 = 4 − 2 = 2 ✓. Check x = 0: √(2·0 + 1) − 1 = √1 − 1 = 0, but x − 2 = 0 − 2 = −2 ✗. Therefore x = 4 is the only solution; x = 0 is extraneous because it does not satisfy the original equation.",
      "skill": "reasoning",
      "subTopic": "Radical Expressions & Equations"
    },
    {
      "number": 30,
      "part": "B",
      "type": "written",
      "text": "Convert the angle 5π/6 radians to degrees, and sketch the angle in standard position, identifying the quadrant in which the terminal side lies.",
      "topic": "Trigonometric Functions",
      "explanation": "Multiplying 5π/6 by 180/π gives 150°, an angle whose terminal side lies in Quadrant II.",
      "diveDeep": "To convert radians to degrees, multiply by 180/π; to go the other way, multiply by π/180. The angle 150° opens counterclockwise from the positive x-axis past 90° but before 180°, placing its terminal side in Quadrant II. Knowing the quadrant tells you the signs of the trig functions there (in QII sine is positive, cosine and tangent negative). Memorizing the common conversions (π = 180°, π/6 = 30°) makes these conversions fast and reliable.",
      "modelAnswer": "5π/6 × 180°/π = (5 × 180)/6 = 900/6 = 150°. In standard position, an angle of 150° is measured counterclockwise from the positive x-axis; since 90° < 150° < 180°, the terminal side lies in Quadrant II. A correct sketch shows the initial side along the positive x-axis and the terminal side in the second quadrant, about 30° above the negative x-axis.",
      "skill": "graphing",
      "subTopic": "Trig Graphs"
    },
    {
      "number": 31,
      "part": "B",
      "type": "written",
      "text": "The probability that a randomly chosen student at a school plays a sport is 0.45, and the probability that a student is in the band is 0.20. If playing a sport and being in the band are independent events, determine the probability that a randomly chosen student both plays a sport and is in the band.",
      "topic": "Statistics & Probability",
      "explanation": "For independent events, P(A and B) = P(A)·P(B) = 0.45 × 0.20 = 0.09.",
      "diveDeep": "Independence means one event occurring does not change the probability of the other, which is exactly the condition that lets you multiply: P(A and B) = P(A)·P(B). If the events were not independent, you would instead need P(A)·P(B|A). A quick way to confirm independence in data is to check whether P(A and B) actually equals the product of the marginals. Here 0.45 × 0.20 = 0.09, meaning about 9% of students do both.",
      "modelAnswer": "Because playing a sport and being in the band are independent events, the probability of both occurring is the product of the individual probabilities: P(sport and band) = P(sport) × P(band) = 0.45 × 0.20 = 0.09. So the probability that a randomly chosen student both plays a sport and is in the band is 0.09 (or 9%).",
      "subTopic": "Sampling & Studies"
    },
    {
      "number": 32,
      "part": "B",
      "type": "written",
      "text": "Given f(x) = 2cos(½x) − 3, state the amplitude, period, and the maximum value of the function.",
      "topic": "Trigonometric Functions",
      "explanation": "Amplitude is |2| = 2, period is 2π/(½) = 4π, and the maximum value is the midline −3 plus the amplitude 2, equal to −1.",
      "diveDeep": "For f(x) = A·cos(Bx) + D, the amplitude is |A|, the period is 2π/|B|, and the midline (vertical center) is y = D. The maximum value is D + |A| and the minimum is D − |A|. Here B = ½ stretches the period to 4π (a smaller B means a longer period), and the vertical shift D = −3 lowers the whole graph, so even the maximum −1 is below the x-axis. Reading A, B, and D directly from the equation gives all key features quickly.",
      "modelAnswer": "The function has the form A·cos(Bx) + D with A = 2, B = ½, D = −3. Amplitude = |A| = 2. Period = 2π/|B| = 2π/(½) = 4π. The midline is y = −3, so the maximum value = midline + amplitude = −3 + 2 = −1. Therefore the amplitude is 2, the period is 4π, and the maximum value of the function is −1.",
      "skill": "graphing",
      "subTopic": "Trig Graphs"
    },
    {
      "number": 33,
      "part": "C",
      "type": "written",
      "text": "A radioactive isotope decays according to the model A(t) = A₀(0.5)^(t/8), where t is measured in days and A₀ is the initial amount. If a sample initially contains 200 grams, algebraically determine, to the nearest tenth of a day, how long it takes for the sample to decay to 25 grams.",
      "topic": "Exponential & Logarithmic",
      "explanation": "Set 200(0.5)^(t/8) = 25, divide to get (0.5)^(t/8) = 0.125 = (0.5)³, so t/8 = 3 and t = 24 days exactly (24.0 to the nearest tenth).",
      "diveDeep": "Exponential equations are solved by isolating the exponential expression, then taking a logarithm (or recognizing equal bases). Here 25/200 = 0.125 happens to equal (0.5)³, so the exponents match directly: t/8 = 3. When the ratio is not a clean power, take log of both sides and use the power rule: (t/8)·log(0.5) = log(0.125), then solve for t. Recognizing that the half-life is 8 days and 200 → 100 → 50 → 25 is exactly three halvings (3 × 8 = 24) confirms the answer.",
      "modelAnswer": "Set up the equation: 200(0.5)^(t/8) = 25. Divide both sides by 200: (0.5)^(t/8) = 25/200 = 0.125. Take the logarithm of both sides: (t/8)·log(0.5) = log(0.125). Solve: t/8 = log(0.125)/log(0.5) = 3, so t = 8 × 3 = 24. To the nearest tenth, it takes 24.0 days for the sample to decay to 25 grams. (Check: 200 → 100 → 50 → 25 is three half-lives of 8 days each = 24 days.)",
      "skill": "modeling",
      "subTopic": "Exponential Models"
    },
    {
      "number": 34,
      "part": "C",
      "type": "written",
      "text": "Solve the following system of equations algebraically: y = x² − 4x + 3 and y = 2x − 2. State all solutions as ordered pairs.",
      "topic": "Systems & Inequalities",
      "explanation": "Setting x² − 4x + 3 = 2x − 2 gives x² − 6x + 5 = 0, which factors to (x − 1)(x − 5) = 0; the solutions are (1, 0) and (5, 8).",
      "diveDeep": "To solve a system with a quadratic and a line, set the expressions equal (substitution), collect everything to one side, and solve the resulting quadratic by factoring or the quadratic formula. Each x-value must be substituted back into the simpler (linear) equation to find its matching y-value, producing complete ordered pairs. A line can intersect a parabola at two points, one point (tangent), or none — the discriminant tells you which. Always present answers as ordered pairs, not just x-values.",
      "modelAnswer": "Set the two expressions for y equal: x² − 4x + 3 = 2x − 2. Move all terms to one side: x² − 4x + 3 − 2x + 2 = 0, so x² − 6x + 5 = 0. Factor: (x − 1)(x − 5) = 0, giving x = 1 or x = 5. Substitute into y = 2x − 2: when x = 1, y = 2(1) − 2 = 0; when x = 5, y = 2(5) − 2 = 8. The solutions are (1, 0) and (5, 8).",
      "skill": "procedure",
      "subTopic": "Systems & Inequalities"
    },
    {
      "number": 35,
      "part": "C",
      "type": "written",
      "text": "A biologist models the population of a fish species in a lake with the function P(t) = 1200/(1 + 5e^(−0.4t)), where t is the number of years since the species was introduced. Determine the initial population at t = 0, and explain what value the population approaches as t increases without bound.",
      "topic": "Exponential & Logarithmic",
      "explanation": "At t = 0, P(0) = 1200/(1 + 5) = 200; as t → ∞, e^(−0.4t) → 0, so P approaches 1200/(1 + 0) = 1200, the carrying capacity.",
      "diveDeep": "This is a logistic growth model, which describes populations that grow rapidly at first but level off at a maximum sustainable size called the carrying capacity. The carrying capacity is the numerator (1200) because the exponential term in the denominator decays to 0 over time, leaving 1200/1. The initial value comes from substituting t = 0, which makes e⁰ = 1. Logistic models are S-shaped: limited resources slow growth as the population nears the carrying capacity, unlike pure exponential growth that increases without limit.",
      "modelAnswer": "Initial population: substitute t = 0. Since e^(−0.4·0) = e⁰ = 1, P(0) = 1200/(1 + 5·1) = 1200/6 = 200. So the initial population is 200 fish. As t increases without bound, the exponent −0.4t → −∞, so e^(−0.4t) → 0, making the denominator approach 1 + 5·0 = 1. Therefore P(t) → 1200/1 = 1200. The population approaches 1200 fish, which is the carrying capacity — the maximum population the lake can sustain.",
      "skill": "reasoning",
      "subTopic": "Exponential Models"
    },
    {
      "number": 36,
      "part": "C",
      "type": "written",
      "text": "State officials claim 82% of a community want to repeal the 30 mph speed limit on an expressway. A community organization devises a simulation based on the claim that 82% of the community supports the repeal. The simulation of 200 surveys (each of sample size 60) produced approximately normal results with Mean = 0.819 and SD = 0.053. Based on the simulation, determine an interval containing the middle 95% of plausible proportions. Round your answer to the nearest thousandth. The community organization conducted its own sample survey of 60 people and found 70% supported the repeal. Based on the results of the simulation, explain why the organization should question the State officials' claim.",
      "topic": "Statistics & Probability",
      "explanation": "The 95% interval is Mean ± 2·SD = 0.819 ± 0.106, giving (0.713, 0.925). Since 70% (0.700) falls below the interval, it is unlikely if the true proportion were 82%, so the claim is questionable.",
      "diveDeep": "A simulation-based 95% confidence interval spans approximately Mean ± 2·SD. Here 0.819 − 2(0.053) = 0.713 and 0.819 + 2(0.053) = 0.925. When an observed sample result (0.70) falls outside this interval, it suggests the observed result would be very unusual if the null proportion (82%) were true — that is, strong evidence against the claim. A common error is confusing the mean of the simulation with the sample proportion from the organization's own survey; they serve different roles.",
      "modelAnswer": "95% interval: Mean ± 2·SD = 0.819 ± 2(0.053) = 0.819 ± 0.106.\nLower bound: 0.819 − 0.106 = 0.713\nUpper bound: 0.819 + 0.106 = 0.925\nInterval: (0.713, 0.925).\n\nThe organization's survey found 70% (0.700) support the repeal. Since 0.700 < 0.713, this result falls below the 95% simulation interval. A result this low would be very unlikely if the true proportion were 82%, so the organization has grounds to question the State officials' claim.",
      "skill": "reasoning",
      "subTopic": "Sampling & Studies"
    },
    {
      "number": 37,
      "part": "D",
      "type": "written",
      "text": "A loan of $15,000 is taken out at an annual interest rate of 6%, compounded monthly. The monthly payment M is given by M = P·(r(1 + r)ⁿ)/((1 + r)ⁿ − 1), where P is the principal, r is the monthly interest rate, and n is the total number of payments. Determine the monthly payment, to the nearest cent, for a 5-year loan. Then determine the total amount paid over the life of the loan and the total interest paid.",
      "topic": "Exponential & Logarithmic",
      "explanation": "With P = 15000, r = 0.06/12 = 0.005, and n = 60, M ≈ $289.99; total paid ≈ $17,399.40 and total interest ≈ $2,399.40.",
      "diveDeep": "The amortization formula compounds interest monthly, so always convert the annual rate to a monthly rate (divide by 12) and express the term in months (years × 12). Carefully evaluate (1 + r)ⁿ first, then build the numerator and denominator before dividing, keeping full decimal precision until the final rounding to avoid accumulating error. Total paid equals the monthly payment times the number of payments, and total interest is total paid minus the original principal. Real-world finance problems hinge on getting these unit conversions (annual to monthly, years to months) correct.",
      "modelAnswer": "Convert the rate and term: monthly rate r = 0.06/12 = 0.005; number of payments n = 5 × 12 = 60. Compute (1 + r)ⁿ = (1.005)⁶⁰ ≈ 1.348850. Numerator: P·r·(1.005)⁶⁰ = 15000 × 0.005 × 1.348850 ≈ 101.16375. Denominator: (1.005)⁶⁰ − 1 ≈ 0.348850. Monthly payment M = 101.16375/0.348850 ≈ $289.99. Total amount paid = M × n = 289.99 × 60 ≈ $17,399.40. Total interest paid = total paid − principal = 17,399.40 − 15,000 = $2,399.40. So the monthly payment is about $289.99, the total paid is about $17,399.40, and the total interest is about $2,399.40.",
      "skill": "modeling",
      "subTopic": "Exponential Models"
    }
  ]
}
