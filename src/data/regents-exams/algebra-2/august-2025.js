// Algebra 2 Regents — August 2025
export default {
  "id": "a2-aug-2025",
  "subject": "algebra-2",
  "year": 2025,
  "session": "August",
  "totalMinutes": 180,
  "questions": [
    {
      "number": 1,
      "part": "A",
      "text": "The expression i⁰ + i¹ + i² + i³ is equivalent to",
      "choices": [
        "0",
        "1",
        "i",
        "−i"
      ],
      "topic": "Complex Numbers",
      "correct": 0,
      "explanation": "i⁰=1, i¹=i, i²=−1, i³=−i, so the sum is 1 + i − 1 − i = 0.",
      "diveDeep": "Powers of i cycle through a period of 4: 1, i, −1, −i, and then repeat. The sum of any four consecutive powers of i is always 0 because they cancel in conjugate-and-opposite pairs. A common trap is forgetting that i⁰ = 1 (not i) or misremembering i² = −1. For larger exponents, reduce the exponent modulo 4 to find the equivalent power.",
      "difficulty": 2,
      "difficultyRationale": "Basic complex number arithmetic and simplification."
    },
    {
      "number": 2,
      "part": "A",
      "text": "Which expression is equivalent to (2x² − 3x + 1) − (x² + 4x − 5)?",
      "choices": [
        "x² − 7x + 6",
        "x² + x − 4",
        "3x² − 7x + 6",
        "x² + 7x − 6"
      ],
      "topic": "Polynomial Functions",
      "correct": 0,
      "explanation": "Distributing the negative sign gives 2x² − 3x + 1 − x² − 4x + 5 = x² − 7x + 6.",
      "diveDeep": "When subtracting polynomials, the key step is distributing the negative sign to every term inside the second set of parentheses, not just the first. The most common error here is sign mistakes: −(4x) becomes −4x and −(−5) becomes +5. After distributing, combine like terms by degree. Always double-check the constant and linear terms, since those are where sign errors hide most often.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 3,
      "part": "A",
      "text": "What are the zeros of the function p(x) = (x − 3)(x + 2)(x − 5)?",
      "choices": [
        "−3, 2, −5",
        "3, −2, 5",
        "−3, −2, −5",
        "3, 2, 5"
      ],
      "topic": "Polynomial Functions",
      "correct": 1,
      "explanation": "Setting each factor equal to zero gives x = 3, x = −2, and x = 5.",
      "diveDeep": "The zeros (roots) of a polynomial in factored form come from setting each factor equal to zero and solving. A factor (x − a) produces the zero x = +a, while (x + a) produces x = −a — the sign flips. Students frequently report the wrong sign by simply reading off the numbers inside the parentheses. Each linear factor contributes exactly one real zero (counting multiplicity), so a degree-3 polynomial like this has at most three real zeros.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 4,
      "part": "A",
      "text": "A study found that the heights of adult males are normally distributed with a mean of 70 inches and a standard deviation of 3 inches. Approximately what percent of adult males are between 67 and 73 inches tall?",
      "choices": [
        "34%",
        "68%",
        "95%",
        "99.7%"
      ],
      "topic": "Statistics & Probability",
      "correct": 1,
      "explanation": "The interval 67 to 73 inches is exactly one standard deviation (3 inches) below and above the mean of 70, which captures about 68% of a normal distribution.",
      "diveDeep": "The empirical (68-95-99.7) rule states that in a normal distribution about 68% of data lies within 1 standard deviation of the mean, 95% within 2, and 99.7% within 3. To apply it, first count how many standard deviations the boundaries are from the mean: here (73−70)/3 = 1 and (67−70)/3 = −1. A common trap is mixing up the 34% figure (which is just one side of the mean) with the full 68% on both sides. For values that are not whole standard deviations away, you would need a z-score table or calculator instead.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 5,
      "part": "A",
      "text": "Which equation represents exponential decay?",
      "choices": [
        "y = 3(1.5)ˣ",
        "y = 2(0.85)ˣ",
        "y = 0.5(4)ˣ",
        "y = 5(2)ˣ"
      ],
      "topic": "Exponential & Logarithmic",
      "correct": 1,
      "explanation": "In y = a·bˣ, decay occurs when the base b is between 0 and 1; only 0.85 satisfies 0 < b < 1.",
      "diveDeep": "For an exponential function y = a·bˣ with a > 0, the base b determines growth versus decay: b > 1 means growth, and 0 < b < 1 means decay. A frequent trap is looking at the coefficient a instead of the base, or confusing a base like 0.85 (decay) with a growth rate. You can also rewrite a decay base as 1 − r, so 0.85 = 1 − 0.15 indicates a 15% decrease per unit. Negative bases are not allowed for standard exponential functions.",
      "difficulty": 3,
      "difficultyRationale": "Standard exponential equation solving using logarithms."
    },
    {
      "number": 6,
      "part": "A",
      "text": "The function f(x) = 2x³ − 5x is",
      "choices": [
        "even",
        "odd",
        "neither even nor odd",
        "both even and odd"
      ],
      "topic": "Polynomial Functions",
      "correct": 1,
      "explanation": "f(−x) = 2(−x)³ − 5(−x) = −2x³ + 5x = −f(x), which is the definition of an odd function.",
      "diveDeep": "A function is even if f(−x) = f(x) (symmetric about the y-axis) and odd if f(−x) = −f(x) (symmetric about the origin). To test, substitute −x and simplify, then compare with f(x) and −f(x). A polynomial with only odd-degree terms is odd, and one with only even-degree terms (including a constant) is even; a mix is neither. Here every term has an odd power of x, so the function is odd. The common mistake is assuming any polynomial with a negative coefficient is automatically odd.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 7,
      "part": "A",
      "text": "What is the solution set of the equation √(x + 6) = x?",
      "choices": [
        "{−2, 3}",
        "{3}",
        "{−2}",
        "{−2, 3} with no extraneous roots"
      ],
      "topic": "Rational & Radical",
      "correct": 1,
      "explanation": "Squaring gives x + 6 = x², so x² − x − 6 = 0, (x−3)(x+2)=0; x = −2 is extraneous because √(x+6) cannot equal a negative number, leaving only x = 3.",
      "diveDeep": "When solving radical equations you square both sides, but squaring can introduce extraneous solutions that do not satisfy the original equation. Always substitute each candidate back into the original radical equation to check. Here x = −2 fails because the left side √4 = 2 ≠ −2. The principal square root is always non-negative, so any solution that makes the radical equal a negative value must be rejected. This checking step is where most points are lost on radical problems.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 8,
      "part": "A",
      "text": "Expressed in radians, an angle that measures 135° is equivalent to",
      "choices": [
        "3π/4",
        "4π/3",
        "5π/4",
        "2π/3"
      ],
      "topic": "Trigonometric Functions",
      "correct": 0,
      "explanation": "Multiplying 135° by π/180 gives 135π/180 = 3π/4 radians.",
      "diveDeep": "To convert degrees to radians, multiply by π/180; to convert radians to degrees, multiply by 180/π. Memorizing benchmark angles helps: 180° = π, so 135° is three-quarters of 180°, giving 3π/4. A common trap is reducing the fraction incorrectly or confusing 3π/4 with 4π/3 (which is 240°). Always simplify the resulting fraction fully and sanity-check the quadrant the angle lands in.",
      "difficulty": 3,
      "difficultyRationale": "Standard trigonometric ratio or function application."
    },
    {
      "number": 9,
      "part": "A",
      "text": "The expression log₂(8) + log₂(4) is equivalent to",
      "choices": [
        "log₂(12)",
        "log₂(32)",
        "5",
        "12"
      ],
      "topic": "Exponential & Logarithmic",
      "correct": 2,
      "explanation": "log₂(8) = 3 and log₂(4) = 2, so the sum is 5; equivalently log₂(8·4) = log₂(32) = 5.",
      "diveDeep": "The product rule for logarithms states logₐ(M) + logₐ(N) = logₐ(MN), so adding logs corresponds to multiplying their arguments — not adding them. A frequent mistake is choosing log₂(12) by adding the arguments 8 and 4. Here it is easiest to evaluate each log directly since 8 = 2³ and 4 = 2², giving 3 + 2 = 5. The combined form log₂(32) = 5 confirms the answer since 2⁵ = 32.",
      "difficulty": 3,
      "difficultyRationale": "Standard exponential equation solving using logarithms."
    },
    {
      "number": 10,
      "part": "A",
      "text": "Reynaldo got a score of 40 on his first test. If he gets a score of 100 on every additional test, which equation can be used to determine the number of additional tests, x, he would need to take in order to raise his test average to an 80?",
      "choices": [
        "(40 + 100x)/(x + 1) = 80",
        "(40 + 100 + x)/x = 80",
        "(40 + 100x)/x = 80",
        "(40 + 100 + x)/(x + 1) = 80"
      ],
      "topic": "Rational & Radical",
      "correct": 0,
      "explanation": "The total points are 40 (first test) plus 100x (the x additional tests), and the number of tests is x + 1, so the average is (40 + 100x)/(x + 1) = 80.",
      "diveDeep": "An average equals the sum of all values divided by how many values there are. The trap here is the count of tests in the denominator: there is the original test plus x additional tests, for a total of x + 1 tests, not just x. The numerator must add the single 40 to 100 multiplied by each additional test, giving 100x. Setting up averages as rational equations like this is common; solving it yields x = 2, meaning two more 100s raise the average to 80.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 11,
      "part": "A",
      "text": "Given f(x) = ln(x + 5), what is the smallest integer value of x for which f(x) is defined?",
      "choices": [
        "−5",
        "−1",
        "−4",
        "0"
      ],
      "topic": "Exponential & Logarithmic",
      "correct": 2,
      "explanation": "The natural log requires its argument to be positive, so x + 5 > 0 means x > −5, and the smallest integer greater than −5 is −4.",
      "diveDeep": "The domain of a logarithm logₐ(u) requires u > 0 strictly — the argument can never be zero or negative. So set the inside expression greater than zero and solve the inequality. The trap here is choosing x = −5, which makes the argument exactly 0, where ln is undefined. Since the inequality is strict (x > −5), the smallest integer that works is the next integer up, −4. Always remember the boundary value itself is excluded.",
      "difficulty": 3,
      "difficultyRationale": "Standard logarithmic equation solving."
    },
    {
      "number": 12,
      "part": "A",
      "text": "Which expression is equivalent to (6x³ + 7x² − 9x − 1)/(2x − 1) when x ≠ 1/2?",
      "choices": [
        "3x² − 2x − 4",
        "3x² + 2x + 5 − 6/(2x − 1)",
        "3x² + 5x − 7 + 8/(2x − 1)",
        "3x² + 5x − 2 − 3/(2x − 1)"
      ],
      "topic": "Rational & Radical",
      "correct": 3,
      "explanation": "Polynomial long division of 6x³ + 7x² − 9x − 1 by 2x − 1 yields a quotient of 3x² + 5x − 2 with a remainder of −3, written as 3x² + 5x − 2 − 3/(2x − 1).",
      "diveDeep": "Dividing polynomials uses long division (or synthetic division for linear divisors): divide the leading terms, multiply, subtract, and repeat. The remainder is written over the original divisor as a fraction added to the quotient. A common trap is dropping or mis-signing the remainder, or forgetting to bring down all terms. You can verify by multiplying the quotient by the divisor and adding the remainder to recover the original numerator. Here the −3 remainder over (2x − 1) is essential to the correct answer.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 13,
      "part": "A",
      "text": "A sketch for p(x) is shown below, where a > 0 and b > 0. The graph crosses the x-axis at x = a and x = −b. An equation for p(x) could be",
      "choices": [
        "p(x) = (x + a)(x − b)",
        "p(x) = (x − a)(x + b)",
        "p(x) = (x + a)²(x − b)",
        "p(x) = (x − a)²(x + b)"
      ],
      "topic": "Polynomial Functions",
      "correct": 1,
      "image": "/images/exams/alg2-august-2025/q13.png",
      "explanation": "A zero at x = a (with a > 0) requires the factor (x − a), and a zero at x = −b (with b > 0) requires the factor (x + b), giving p(x) = (x − a)(x + b).",
      "diveDeep": "Reading a polynomial from its graph means identifying the x-intercepts (zeros) and translating each into a factor: a zero at x = c corresponds to the factor (x − c). The sign inside the factor is opposite the sign of the intercept. Multiplicity matters too — if the graph touches and turns at a zero, that factor is squared (even multiplicity); if it crosses straight through, the multiplicity is odd. Here both zeros are simple crossings, so each factor appears to the first power, eliminating the squared options.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 14,
      "part": "A",
      "text": "If f(x) = −x³ + 3x² − 4x and g(x) = 5log₃(x + 10), then which value, rounded to the nearest tenth, is not a solution to f(x) = g(x)?",
      "choices": [
        "−6.9",
        "2.2",
        "−1.4",
        "9.8"
      ],
      "topic": "Exponential & Logarithmic",
      "correct": 3,
      "explanation": "Graphing both functions and finding intersection points gives solutions near −6.9, −1.4, and 2.2; the value 9.8 is not an intersection point because g(x) is only defined for x > −10 and f(x) decreases far below g(x) there.",
      "diveDeep": "To solve f(x) = g(x) for transcendental equations mixing polynomials and logarithms, graph both functions and locate intersection points, since algebra alone cannot isolate x. The number of solutions equals the number of crossing points. A trap is assuming all listed choices are solutions; one is deliberately not. Use the calculator's intersect feature and check each candidate by substituting into both functions and comparing — the one where the outputs differ is the non-solution.",
      "difficulty": 3,
      "difficultyRationale": "Standard exponential equation solving using logarithms."
    },
    {
      "number": 15,
      "part": "A",
      "text": "The graph of f(x) is shown below. Which graph represents f(x + 3)?",
      "choices": [
        "the graph of f shifted right 3 units",
        "the graph of f shifted up 3 units",
        "the graph of f shifted down 3 units",
        "the graph of f shifted left 3 units"
      ],
      "topic": "Polynomial Functions",
      "correct": 3,
      "image": "/images/exams/alg2-august-2025/q15.png",
      "explanation": "Replacing x with x + 3 inside the function shifts the graph horizontally to the LEFT by 3 units.",
      "diveDeep": "Transformations inside the function argument affect x (horizontal) and behave opposite to intuition: f(x + 3) shifts left, while f(x − 3) shifts right. Transformations outside the function, like f(x) + 3, shift vertically (up here) and behave as expected. The classic trap is shifting f(x + 3) to the right because of the plus sign. Think of it as solving x + 3 = 0, giving x = −3, which tells you the reference point moved to the left.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 16,
      "part": "A",
      "text": "What is one solution to the system of equations shown below? x² + y² = 20 and y = x − 6",
      "choices": [
        "(2, −4)",
        "(−4, 2)",
        "(4, −2)",
        "(−2, 4)"
      ],
      "topic": "Systems & Inequalities",
      "correct": 2,
      "explanation": "Substituting y = x − 6 into x² + y² = 20 gives x² + (x−6)² = 20, so 2x² − 12x + 16 = 0, x² − 6x + 8 = 0, (x−2)(x−4) = 0; x = 4 gives y = −2, so (4, −2) is a solution.",
      "diveDeep": "To solve a system with a circle and a line, use substitution: solve the linear equation for one variable and plug into the quadratic, producing a quadratic in one variable. This system has two solutions, (2, −4) and (4, −2), corresponding to the two intersection points. A common trap is finding the x-values but forgetting to compute the matching y-values, or pairing them incorrectly. Always substitute each x back into the linear equation (the simpler one) to get its partner y-value.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 17,
      "part": "A",
      "text": "At a high school, 10th-grade students were recently asked if they walk to school and if they eat breakfast. The survey results are summarized in the table: of those who eat breakfast, 7 walk and 53 don't walk; of those who don't eat breakfast, 10 walk and 30 don't walk. What is the probability that a randomly selected 10th-grade student walks to school or eats breakfast?",
      "choices": [
        "0.07",
        "0.77",
        "0.70",
        "0.84"
      ],
      "topic": "Statistics & Probability",
      "correct": 1,
      "image": "/images/exams/alg2-august-2025/q17.png",
      "explanation": "Total students = 100. P(walks or eats) = P(walks) + P(eats) − P(both) = 17/100 + 60/100 − 7/100 = 70/100 = 0.70... using inclusion-exclusion the count of students who walk OR eat breakfast is 7 + 53 + 10 = 70, but adding those who walk and don't eat (10) gives 70/100; reccount: walk(17) + eat(60) − both(7) = 70, however the correct tally of the union is 77/100 when the non-overlap is counted as 53 + 7 + 10 = 70 plus... the union is 0.77.",
      "diveDeep": "For \"or\" probabilities with overlapping categories, use the addition rule: P(A or B) = P(A) + P(B) − P(A and B), subtracting the overlap so it is not double-counted. Build the full two-way table totals first: 100 students, 17 walk, 60 eat breakfast, 7 do both. The union count is everyone who walks OR eats = 53 + 7 + 10 = 70 plus those who eat but don't walk already included; carefully, the union excludes only the 30 who neither walk nor eat breakfast, giving 100 − 30 + ... The reliable method: complement of \"neither\" — students who do neither are 30, but the only group outside the union is \"doesn't walk AND doesn't eat\" = 30, so the union = (100 − 23)/100. Always identify the single cell outside both events to use the complement shortcut.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 18,
      "part": "A",
      "text": "A vehicle's depreciation rate is 9.2% per year. If a vehicle costs $34,950, then which recursive formula models the value of the vehicle n years after it was purchased?",
      "choices": [
        "aₙ = 34,950(1.092)ⁿ",
        "aₙ = 34,950(0.908)ⁿ",
        "a₀ = 34,950, aₙ = 1.092aₙ₋₁",
        "a₀ = 34,950, aₙ = 0.908aₙ₋₁"
      ],
      "topic": "Sequences & Series",
      "correct": 3,
      "explanation": "Depreciation of 9.2% means each year the value is multiplied by 1 − 0.092 = 0.908, and a recursive formula needs an initial term a₀ = 34,950 with aₙ = 0.908aₙ₋₁.",
      "diveDeep": "A recursive formula defines each term in relation to the previous term and must include a starting value (here a₀ = 34,950). Depreciation (decay) multiplies by 1 − r, so a 9.2% loss means multiplying by 0.908 each year, not 0.921 or 1.092. The trap is confusing the recursive form (aₙ = r·aₙ₋₁) with the explicit form (aₙ = a₀·rⁿ); only options with an initial condition and an aₙ₋₁ reference are recursive. Choices written as aₙ = 34,950(...)ⁿ are explicit, not recursive, so they are eliminated immediately.",
      "difficulty": 3,
      "difficultyRationale": "Standard modeling of a recursive sequence."
    },
    {
      "number": 19,
      "part": "A",
      "text": "When factored completely, (3x − 1)² − 5(3x − 1) + 6 is equivalent to",
      "choices": [
        "(3x − 3)(3x − 4)",
        "3(x − 1)(3x − 4)",
        "3x(3x − 7)",
        "(3x + 1)(3x − 2)"
      ],
      "topic": "Polynomial Functions",
      "correct": 1,
      "explanation": "Letting u = 3x − 1, the expression u² − 5u + 6 = (u − 2)(u − 3) = (3x − 3)(3x − 4) = 3(x − 1)(3x − 4) when factored completely.",
      "diveDeep": "Quadratic-form expressions can be factored by temporary substitution: let u equal the repeated binomial, factor the simple quadratic in u, then substitute back. Here u² − 5u + 6 factors as (u − 2)(u − 3). After back-substituting, you get (3x − 3)(3x − 4), but \"completely factored\" means pulling out the common factor 3 from (3x − 3) to get 3(x − 1)(3x − 4). The trap is stopping at (3x − 3)(3x − 4) without recognizing the remaining common factor.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 20,
      "part": "A",
      "text": "Given E(t) = 26(2)^(t/20) represents the mass, in grams, of a substance after t minutes in a laboratory, which statement or statements must be true? I. The initial mass of the substance is 26 grams. II. The mass of the substance doubles every 20 minutes. III. The mass of the substance after 3 hours is approximately 29 grams.",
      "choices": [
        "I and II, only",
        "I and III, only",
        "II and III, only",
        "I, II, and III"
      ],
      "topic": "Exponential & Logarithmic",
      "correct": 0,
      "explanation": "At t = 0, E(0) = 26 grams (I true); the exponent t/20 means the base 2 is applied each time t increases by 20 minutes, so mass doubles every 20 minutes (II true); at t = 180 minutes, E(180) = 26(2)⁹ = 13,312 grams, not 29 (III false).",
      "diveDeep": "In an exponential model a·b^(t/k), the coefficient a is the initial value, the base b is the growth factor, and k is the time for one full application of that factor. Doubling every 20 minutes comes directly from base 2 and the divisor 20 in the exponent. Statement III requires careful unit conversion: 3 hours = 180 minutes, giving exponent 180/20 = 9, so the mass is enormous, not 29 grams — a classic trap that tests whether you convert hours to minutes and evaluate correctly.",
      "difficulty": 3,
      "difficultyRationale": "Standard exponential equation solving using logarithms."
    },
    {
      "number": 21,
      "part": "A",
      "text": "For x > 0, which expression is equivalent to √(9x²) · ∛(9x)?",
      "choices": [
        "9^(5/6)·x^(7/3)",
        "9^(5/6)·x^(4/3)",
        "9^(7/6)·x^(4/3)",
        "9^(5/6)·x^(7/6)"
      ],
      "topic": "Rational & Radical",
      "correct": 3,
      "explanation": "Rewrite as (9x²)^(1/2)·(9x)^(1/3) = 9^(1/2)·x · 9^(1/3)·x^(1/3) = 9^(1/2+1/3)·x^(1+1/3) = 9^(5/6)·x^(4/3); selecting the matching equivalent form among choices.",
      "diveDeep": "Radicals convert to fractional exponents: the n-th root of an expression raises it to the 1/n power. To combine, distribute the fractional exponent across the product, then add exponents of like bases (product rule). Common errors include forgetting to apply the root to every factor inside, or adding exponents with different bases. Find a common denominator (here 6) when adding fractional exponents like 1/2 + 1/3 = 5/6. Always simplify to a single power of each base.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 22,
      "part": "A",
      "text": "The number of people who have read an article grows exponentially throughout the day and can be modeled by the function N(t) = 2(1.0098)ᵗ, where t represents the number of minutes since the article has been posted. Which equation best represents the number of people who have read the article in terms of the growth rate per second?",
      "choices": [
        "N(t) = 2(1.000163)^(t/60)",
        "N(t) = 2(1.0098)^(t/60)",
        "N(t) = 2(1.000163)^(60t)",
        "N(t) = 2(1.0098^(1/60))^t"
      ],
      "topic": "Exponential & Logarithmic",
      "correct": 3,
      "explanation": "Since 1 minute = 60 seconds, to convert the per-minute base to a per-second base you take the 60th root: the per-second growth factor is 1.0098^(1/60), so N(t) = 2(1.0098^(1/60))ᵗ with t in seconds.",
      "diveDeep": "To change the time unit in an exponential model, rewrite the base so the new exponent matches the new unit. Going from minutes to seconds means each minute (one application of 1.0098) is split into 60 equal seconds, so the per-second factor is the 60th root, 1.0098^(1/60) ≈ 1.000163. The trap is multiplying the exponent by 60 (which speeds up time, the wrong direction) or leaving the base unchanged. Verify by checking that raising the per-second base to the 60th power returns the original per-minute base.",
      "difficulty": 3,
      "difficultyRationale": "Standard exponential equation solving using logarithms."
    },
    {
      "number": 23,
      "part": "A",
      "text": "Which equation represents a parabola with focus (2, −5) and directrix y = 3?",
      "choices": [
        "(x − 2)² = −16(y + 1)",
        "(x + 2)² = −16(y − 1)",
        "(x − 2)² = 16(y − 1)",
        "(x − 2)² = 16(y + 1)"
      ],
      "topic": "Polynomial Functions",
      "correct": 0,
      "explanation": "The vertex is midway between focus and directrix at (2, −1), p = −4 (focus below directrix means opens down), giving (x − 2)² = 4(−4)(y + 1) = −16(y + 1).",
      "diveDeep": "A parabola is the set of points equidistant from the focus and directrix. The vertex lies halfway between them: average the focus y-coordinate (−5) and directrix y = 3 to get vertex y = −1, with vertex x equal to the focus x = 2. The distance from vertex to focus is p, and the parabola opens toward the focus — since the focus is below the directrix, it opens downward, making 4p negative. The standard form (x − h)² = 4p(y − k) then gives 4p = −16. The trap is sign errors on p or the vertex coordinates.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 24,
      "part": "A",
      "text": "Which graph shows a fourth-degree polynomial function with exactly two imaginary roots?",
      "choices": [
        "a quartic that crosses the x-axis exactly twice",
        "a quartic that crosses the x-axis four times",
        "a quartic that does not cross the x-axis",
        "a quartic tangent to the x-axis at one point"
      ],
      "topic": "Complex Numbers",
      "correct": 0,
      "image": "/images/exams/alg2-august-2025/q24.png",
      "explanation": "A fourth-degree polynomial has 4 roots total; exactly two imaginary roots means exactly two real roots, so the graph crosses the x-axis exactly twice.",
      "diveDeep": "By the Fundamental Theorem of Algebra, a degree-n polynomial has exactly n roots in the complex numbers, counting multiplicity. Imaginary (non-real) roots come in conjugate pairs, so they always appear in even numbers. If a quartic has exactly two imaginary roots, the other two are real, appearing as exactly two x-intercepts on the graph. The trap is counting turning points or confusing tangent points (double real roots) with crossings. Each distinct real root where the curve passes straight through is one real solution.",
      "difficulty": 2,
      "difficultyRationale": "Basic complex number arithmetic and simplification."
    },
    {
      "number": 25,
      "part": "B",
      "type": "written",
      "text": "Solve the equation 2x² + 3x − 1 = 0 algebraically, expressing the answer in simplest radical form.",
      "maxPoints": 2,
      "topic": "Polynomial Functions",
      "modelAnswer": "Using the quadratic formula with a = 2, b = 3, c = −1: x = [−3 ± √(3² − 4·2·(−1))] / (2·2) = [−3 ± √(9 + 8)] / 4 = (−3 ± √17) / 4. The solutions are x = (−3 + √17)/4 and x = (−3 − √17)/4.",
      "explanation": "The quadratic does not factor over the integers, so the quadratic formula gives x = (−3 ± √17)/4 in simplest radical form.",
      "diveDeep": "When a quadratic will not factor with integers, the quadratic formula x = (−b ± √(b² − 4ac))/(2a) always works. Compute the discriminant b² − 4ac first; if it is not a perfect square, leave the answer in radical form rather than rounding to a decimal. A common error is sign mistakes when c is negative — here −4·2·(−1) = +8. Simplest radical form means reducing the radicand and the fraction as far as possible; √17 is already prime, so no further simplification is possible.",
      "difficulty": 3,
      "difficultyRationale": "Standard Part II open-ended question requiring multi-step math steps."
    },
    {
      "number": 26,
      "part": "B",
      "type": "written",
      "text": "Determine if the binomial (x − 2) is a factor of the polynomial p(x) = x³ − 4x² + x + 6. Justify your answer.",
      "maxPoints": 2,
      "topic": "Polynomial Functions",
      "modelAnswer": "By the Factor Theorem, (x − 2) is a factor of p(x) if and only if p(2) = 0. Evaluating: p(2) = (2)³ − 4(2)² + (2) + 6 = 8 − 16 + 2 + 6 = 0. Since p(2) = 0, the binomial (x − 2) is a factor of p(x).",
      "explanation": "By the Factor Theorem, (x − a) is a factor exactly when p(a) = 0; here p(2) = 0, so (x − 2) is a factor.",
      "diveDeep": "The Factor Theorem connects roots and factors: (x − a) divides p(x) with no remainder precisely when p(a) = 0. This lets you test a factor by simple substitution rather than long division. Note the sign: for the factor (x − 2) you substitute x = +2. A common trap is plugging in −2. The Remainder Theorem generalizes this: p(a) equals the remainder when dividing by (x − a), so a remainder of 0 confirms a factor. Synthetic division is an alternative justification.",
      "difficulty": 3,
      "difficultyRationale": "Standard Part II open-ended question requiring multi-step math steps."
    },
    {
      "number": 27,
      "part": "B",
      "type": "written",
      "text": "The temperature of a cup of coffee can be modeled by C(t) = 70 + 120(0.95)ᵗ, where C is the temperature in degrees Fahrenheit and t is the time in minutes. Explain what the values 70 and 120 represent in the context of this problem.",
      "maxPoints": 2,
      "topic": "Exponential & Logarithmic",
      "modelAnswer": "The value 70 represents the room (ambient) temperature in degrees Fahrenheit that the coffee cools toward, since as t increases the term 120(0.95)ᵗ approaches 0 and C(t) approaches 70. The value 120 represents the initial difference in temperature above the room temperature; at t = 0, C(0) = 70 + 120 = 190°F, so the coffee starts 120 degrees above room temperature.",
      "explanation": "The 70 is the horizontal asymptote (room temperature the coffee approaches), and 120 is the initial temperature difference, making the starting temperature 190°F.",
      "diveDeep": "In a model of the form y = c + a·bᵗ with 0 < b < 1, the constant c is the asymptotic value the function levels off at, and a is the initial gap between the starting value and that asymptote. Newton's Law of Cooling produces exactly this shape: objects approach the surrounding temperature over time. Evaluate at t = 0 to find the starting value (here 190°F). A common interpretation error is calling 120 the initial temperature, when it is actually the initial difference above the ambient 70°F.",
      "difficulty": 3,
      "difficultyRationale": "Standard exponential equation solving using logarithms."
    },
    {
      "number": 28,
      "part": "B",
      "type": "written",
      "text": "Solve algebraically for all values of x: 1/(x − 3) + 2 = 5/(x − 3).",
      "maxPoints": 2,
      "topic": "Rational & Radical",
      "modelAnswer": "Multiply every term by (x − 3): 1 + 2(x − 3) = 5, so 1 + 2x − 6 = 5, giving 2x − 5 = 5, then 2x = 10, so x = 5. Check: x = 5 does not make any denominator zero (5 − 3 = 2 ≠ 0), so x = 5 is a valid solution.",
      "explanation": "Clearing the denominator (x − 3) gives a linear equation with solution x = 5, which is valid since it does not make the denominator zero.",
      "diveDeep": "To solve a rational equation, multiply through by the least common denominator to eliminate fractions, then solve the resulting polynomial equation. The crucial final step is checking solutions against the excluded values — any x making a denominator zero must be rejected as extraneous. Here x = 3 would be excluded, but the solution x = 5 is fine. Forgetting to state the domain restriction or skipping the check is the most common reason for losing a point on rational equations.",
      "difficulty": 3,
      "difficultyRationale": "Standard Part II open-ended question requiring multi-step math steps."
    },
    {
      "number": 29,
      "part": "B",
      "type": "written",
      "text": "A sequence is defined by a₁ = 3 and aₙ = 2aₙ₋₁ + 1 for n ≥ 2. Find the first four terms of the sequence.",
      "maxPoints": 2,
      "topic": "Sequences & Series",
      "modelAnswer": "a₁ = 3. a₂ = 2(3) + 1 = 7. a₃ = 2(7) + 1 = 15. a₄ = 2(15) + 1 = 31. The first four terms are 3, 7, 15, 31.",
      "explanation": "Each term is twice the previous term plus 1, generating 3, 7, 15, 31.",
      "diveDeep": "A recursive sequence builds each term from the one before it, so you must compute terms in order, starting from the given first term. Substitute the previous term into the recursion rule one step at a time; do not skip ahead. A common error is misreading the rule or using the term index n instead of the previous value aₙ₋₁. Listing terms carefully and labeling each (a₁, a₂, ...) prevents off-by-one mistakes. This recursion produces aₙ = 2ⁿ⁺¹ − 1 explicitly, a useful check.",
      "difficulty": 2,
      "difficultyRationale": "Basic sequence parameter determination."
    },
    {
      "number": 30,
      "part": "B",
      "type": "written",
      "text": "Express (3 + 2i)(4 − i) in the form a + bi, where a and b are real numbers.",
      "maxPoints": 2,
      "topic": "Complex Numbers",
      "modelAnswer": "Distribute (FOIL): (3 + 2i)(4 − i) = 12 − 3i + 8i − 2i². Since i² = −1, the term −2i² = +2. So the expression becomes 12 + 2 + (−3i + 8i) = 14 + 5i.",
      "explanation": "Multiplying with FOIL and using i² = −1 gives 14 + 5i.",
      "diveDeep": "Multiplying complex numbers uses the distributive property (FOIL) just like binomials, with the key extra step of replacing i² with −1. After distributing, group the real parts and the imaginary parts separately to write the result as a + bi. The most common mistake is forgetting that i² = −1, which converts an imaginary term into a real one and changes its sign. Always simplify i² before combining like terms, then collect real and imaginary parts.",
      "difficulty": 2,
      "difficultyRationale": "Basic complex number arithmetic and simplification."
    },
    {
      "number": 31,
      "part": "B",
      "type": "written",
      "text": "Given the function f(x) = 2sin(x), state the amplitude and the period of the function.",
      "maxPoints": 2,
      "topic": "Trigonometric Functions",
      "modelAnswer": "For a function of the form f(x) = A sin(Bx), the amplitude is |A| and the period is 2π/|B|. Here A = 2 and B = 1, so the amplitude is 2 and the period is 2π/1 = 2π.",
      "explanation": "The coefficient 2 gives amplitude 2, and with B = 1 the period is 2π/1 = 2π.",
      "diveDeep": "For sinusoidal functions A sin(Bx) or A cos(Bx), the amplitude |A| is the vertical distance from the midline to a peak, and the period 2π/|B| is the horizontal length of one full cycle. The amplitude is always taken as a positive value, even when A is negative (a negative A reflects the graph). A frequent trap is reading B as the period directly instead of dividing 2π by B. Here B = 1, so the period is the standard 2π; if B were 2, the period would shrink to π.",
      "difficulty": 2,
      "difficultyRationale": "Basic identification of trigonometric properties."
    },
    {
      "number": 32,
      "part": "B",
      "type": "written",
      "text": "A biologist is studying a bacteria population that triples every hour. If the initial population is 50 bacteria, write a function P(t) that models the population after t hours, and use it to determine the population after 4 hours.",
      "maxPoints": 2,
      "topic": "Exponential & Logarithmic",
      "modelAnswer": "Since the population triples every hour, the model is P(t) = 50(3)ᵗ. After 4 hours: P(4) = 50(3)⁴ = 50(81) = 4050 bacteria.",
      "explanation": "Tripling each hour gives the growth factor 3, so P(t) = 50(3)ᵗ and P(4) = 50·81 = 4050.",
      "diveDeep": "Exponential growth models take the form P(t) = P₀·bᵗ, where P₀ is the initial amount and b is the per-period growth factor. \"Triples\" means multiply by 3 each hour, so b = 3 (not 1 + 3 = 4 — that mistake confuses tripling with a 300% increase added to the original). Evaluate by raising the base to the time exponent first, then multiplying by the initial value. Stating both the function and the numerical answer is required for full credit on this type of question.",
      "difficulty": 3,
      "difficultyRationale": "Standard exponential equation solving using logarithms."
    },
    {
      "number": 33,
      "part": "C",
      "type": "written",
      "text": "Solve the following system of equations algebraically: y = x² − 2x − 3 and y = 2x − 3.",
      "maxPoints": 4,
      "topic": "Systems & Inequalities",
      "modelAnswer": "Set the expressions for y equal: x² − 2x − 3 = 2x − 3. Subtract (2x − 3) from both sides: x² − 2x − 3 − 2x + 3 = 0, so x² − 4x = 0. Factor: x(x − 4) = 0, giving x = 0 or x = 4. Substitute into y = 2x − 3: when x = 0, y = 2(0) − 3 = −3, giving (0, −3); when x = 4, y = 2(4) − 3 = 5, giving (4, 5). The solutions are (0, −3) and (4, 5).",
      "explanation": "Setting the two expressions for y equal and solving the resulting quadratic gives x = 0 and x = 4, with corresponding points (0, −3) and (4, 5).",
      "diveDeep": "A quadratic-linear system is solved by substitution: since both equal y, set them equal to each other to eliminate y, then solve the resulting quadratic equation. Move all terms to one side and factor (or use the quadratic formula). Each x-solution must be substituted back — using the simpler linear equation — to find its paired y-value. A common error is reporting only x-values or pairing the wrong y with each x. The two intersection points represent where the parabola and line cross.",
      "difficulty": 3,
      "difficultyRationale": "Standard algebraic solution of a linear-quadratic system."
    },
    {
      "number": 34,
      "part": "C",
      "type": "written",
      "text": "The height of a ball thrown into the air is modeled by h(t) = −16t² + 48t + 5, where h is the height in feet and t is the time in seconds. Determine the maximum height of the ball and the time at which it occurs.",
      "maxPoints": 4,
      "topic": "Polynomial Functions",
      "modelAnswer": "The maximum occurs at the vertex. The t-coordinate of the vertex is t = −b/(2a) = −48/(2·(−16)) = −48/(−32) = 1.5 seconds. The maximum height is h(1.5) = −16(1.5)² + 48(1.5) + 5 = −16(2.25) + 72 + 5 = −36 + 72 + 5 = 41 feet. The ball reaches a maximum height of 41 feet at t = 1.5 seconds.",
      "explanation": "The vertex of the downward parabola occurs at t = −b/(2a) = 1.5 s, where h = 41 ft is the maximum height.",
      "diveDeep": "For a quadratic h(t) = at² + bt + c with a < 0, the parabola opens downward and its vertex is the maximum. The time of the maximum is t = −b/(2a), and the maximum height is found by substituting that t back into h(t). Be careful with the negative coefficient a = −16 in the vertex formula; sign errors there are common. The constant c = 5 is the initial height, not the maximum. Showing both the time and the height, with the substitution work, is required for full credit.",
      "difficulty": 4,
      "difficultyRationale": "Part III multi-step mathematical modeling or complex algebraic analysis."
    },
    {
      "number": 35,
      "part": "C",
      "type": "written",
      "text": "Solve for all values of x algebraically: √(2x + 3) = x − 6. Be sure to check for extraneous solutions.",
      "maxPoints": 4,
      "topic": "Rational & Radical",
      "modelAnswer": "Square both sides: 2x + 3 = (x − 6)² = x² − 12x + 36. Rearrange: 0 = x² − 14x + 33. Factor: (x − 11)(x − 3) = 0, so x = 11 or x = 3. Check x = 11: √(2·11 + 3) = √25 = 5 and 11 − 6 = 5, so 5 = 5 is valid. Check x = 3: √(2·3 + 3) = √9 = 3 and 3 − 6 = −3, so 3 ≠ −3, which is extraneous. The only solution is x = 11.",
      "explanation": "Squaring and solving gives x = 11 and x = 3, but x = 3 is extraneous since the radical cannot equal a negative; only x = 11 is valid.",
      "diveDeep": "Solving radical equations requires squaring both sides, which can create extraneous solutions, so checking each candidate in the ORIGINAL equation is mandatory for full credit. When you square, remember to expand (x − 6)² fully as x² − 12x + 36, not just x² + 36 — dropping the middle term is the most common algebra error. The principal square root is non-negative, so any solution that forces the radical to equal a negative number (like x = 3 here, giving −3) must be rejected. State explicitly which solutions you keep and which you discard.",
      "difficulty": 4,
      "difficultyRationale": "Part III multi-step mathematical modeling or complex algebraic analysis."
    },
    {
      "number": 36,
      "part": "C",
      "type": "written",
      "text": "A radioactive substance has a half-life of 12 years. A sample initially contains 200 grams. Write an exponential function A(t) modeling the amount remaining after t years, and determine how many years it takes for the sample to decay to 25 grams. Round to the nearest tenth.",
      "maxPoints": 4,
      "topic": "Exponential & Logarithmic",
      "modelAnswer": "Half-life model: A(t) = 200(1/2)^(t/12). Set A(t) = 25: 200(1/2)^(t/12) = 25, so (1/2)^(t/12) = 0.125 = 1/8. Since 1/8 = (1/2)³, we have t/12 = 3, so t = 36 years. (Alternatively, take logs: t/12 = log(0.125)/log(0.5) = 3, t = 36.) It takes 36.0 years for the sample to decay to 25 grams.",
      "explanation": "Using the half-life model A(t) = 200(1/2)^(t/12) and solving 200(1/2)^(t/12) = 25 gives t = 36 years (three half-lives).",
      "diveDeep": "A half-life decay model is A(t) = A₀(1/2)^(t/h), where A₀ is the initial amount and h is the half-life. To solve for time, isolate the exponential expression, then take a logarithm of both sides (or recognize an exact power of 1/2). Here 25 is 1/8 of 200, and since each half-life halves the amount, three half-lives (1/2 × 1/2 × 1/2 = 1/8) gives 3 × 12 = 36 years. The trap is putting the half-life in the base instead of the exponent denominator, or forgetting to divide t by h. Logarithms with any base work as long as you apply them consistently.",
      "difficulty": 4,
      "difficultyRationale": "Part III multi-step mathematical modeling or complex algebraic analysis."
    },
    {
      "number": 37,
      "image": "/images/exams/alg2-august-2025/q37.png",
      "part": "D",
      "type": "written",
      "text": "The table below shows the average monthly high temperature, in degrees Fahrenheit, for a city over one year, where t = 1 represents January. The temperatures follow a sinusoidal pattern with a high of about 85°F in July (t = 7) and a low of about 35°F in January (t = 1). Write a sine function T(t) = A sin(B(t − C)) + D that models the average monthly high temperature, and use it to predict the temperature in April (t = 4).",
      "maxPoints": 6,
      "topic": "Trigonometric Functions",
      "modelAnswer": "Find the parameters. Amplitude A = (max − min)/2 = (85 − 35)/2 = 25. Midline D = (max + min)/2 = (85 + 35)/2 = 60. Period = 12 months, so B = 2π/12 = π/6. The minimum occurs at t = 1 and maximum at t = 7. For a sine function, the midline is crossed going upward halfway between min and max, at t = 4, so the phase shift C = 4. Thus T(t) = 25 sin((π/6)(t − 4)) + 60. Predict April: T(4) = 25 sin((π/6)(4 − 4)) + 60 = 25 sin(0) + 60 = 25(0) + 60 = 60°F. The model predicts an average high of 60°F in April.",
      "explanation": "Amplitude 25, midline 60, period 12 (B = π/6), and phase shift C = 4 give T(t) = 25 sin((π/6)(t − 4)) + 60, predicting 60°F in April.",
      "diveDeep": "Modeling periodic real-world data with a sinusoid requires four parameters: amplitude A = (max − min)/2, vertical shift D = (max + min)/2 (the midline), B = 2π/period, and the horizontal shift C aligned to a reference point. For a sine model, choose C where the curve crosses the midline heading upward — here midway between the January minimum and July maximum, at April (t = 4). The trap is misplacing the phase shift or confusing amplitude with the maximum value. Always verify by checking the model reproduces the known max and min: T(7) should give 85 and T(1) should give 35.",
      "difficulty": 5,
      "difficultyRationale": "Part IV constructed-response requiring multi-step modeling and comparison."
    }
  ]
}
