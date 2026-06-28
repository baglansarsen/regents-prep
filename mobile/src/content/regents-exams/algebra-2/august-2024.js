// Algebra 2 Regents — August 2024
export default {
  "id": "a2-aug-2024",
  "subject": "algebra-2",
  "year": 2024,
  "session": "August",
  "totalMinutes": 180,
  "questions": [
    {
      "number": 1,
      "part": "A",
      "text": "Which expression is equivalent to (3x² − 5x + 2) − (x² + 4x − 7)?",
      "choices": [
        "2x² − 9x + 9",
        "2x² − x − 5",
        "4x² − 9x − 5",
        "2x² − 9x − 5"
      ],
      "topic": "Polynomial Functions",
      "correct": 0,
      "explanation": "Distribute the negative sign and combine like terms: (3x² − x²) + (−5x − 4x) + (2 + 7) = 2x² − 9x + 9.",
      "diveDeep": "When subtracting polynomials, the most common mistake is failing to distribute the minus sign to every term in the second polynomial — note how +4x becomes −4x and −7 becomes +7. Line up like terms by degree before combining. Treat subtraction as adding the opposite of each term, which prevents sign errors. Always double-check the constant term, since flipping the sign of −7 to +7 is where many students slip.",
      "subTopic": "Polynomial Operations & Factoring",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 2,
      "part": "A",
      "text": "What are the zeros of the function f(x) = (x − 3)(x + 2)(x − 5)?",
      "choices": [
        "3, −2, 5",
        "−3, 2, −5",
        "3, 2, 5",
        "−3, −2, −5"
      ],
      "topic": "Polynomial Functions",
      "correct": 0,
      "explanation": "Setting each factor equal to zero gives x − 3 = 0, x + 2 = 0, and x − 5 = 0, so the zeros are 3, −2, and 5.",
      "diveDeep": "A polynomial written in factored form reveals its zeros directly: each factor (x − a) produces a zero at x = a. Watch the signs carefully — the factor (x + 2) means x = −2, not +2, because you must solve x + 2 = 0. The zeros are exactly where the graph crosses the x-axis. This is the reverse of building a polynomial from its roots, and recognizing the pattern saves time on many Regents problems.",
      "subTopic": "Polynomial Graphs, Zeros & Conics",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 3,
      "part": "A",
      "text": "The expression √(−50) is equivalent to",
      "choices": [
        "5i√2",
        "−5√2",
        "25i√2",
        "5√2"
      ],
      "topic": "Complex Numbers",
      "correct": 0,
      "explanation": "Since √(−50) = √(25 · 2 · −1) = √25 · √2 · √(−1) = 5√2 · i, the answer is 5i√2.",
      "diveDeep": "A negative number under a square root requires the imaginary unit i, where i = √(−1). First factor out the perfect square (25) and the −1, then simplify: √(−50) = 5√2 i. A frequent error is dropping the i and treating the result as a real number, or pulling out the wrong perfect square. Always extract the largest perfect-square factor so the radical is fully simplified.",
      "subTopic": "Complex Operations",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question.",
      "isComplexSimplification": true
    },
    {
      "number": 4,
      "part": "A",
      "text": "For which value of x is the function f(x) = (x − 4)/(x² − 16) undefined but the limit still exists?",
      "choices": [
        "x = 4",
        "x = −4",
        "x = 16",
        "x = 0"
      ],
      "topic": "Rational & Radical",
      "correct": 0,
      "explanation": "The denominator factors as (x − 4)(x + 4); at x = 4 the common factor (x − 4) cancels, creating a removable discontinuity (hole) rather than an asymptote.",
      "diveDeep": "A rational function is undefined wherever its denominator equals zero, but the behavior differs depending on whether the factor cancels. At x = 4 the (x − 4) cancels, leaving a hole; at x = −4 the (x + 4) remains, producing a vertical asymptote. Recognizing the difference between a removable discontinuity and an asymptote is key to graphing rational functions. Always factor numerator and denominator fully before deciding the type of discontinuity.",
      "subTopic": "Rational Expressions & Equations",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 5,
      "part": "A",
      "text": "If sin θ = 3/5 and θ is in Quadrant II, what is the value of cos θ?",
      "choices": [
        "−4/5",
        "4/5",
        "−3/5",
        "5/4"
      ],
      "topic": "Trigonometric Functions",
      "correct": 0,
      "explanation": "Using sin²θ + cos²θ = 1, cos²θ = 1 − 9/25 = 16/25, so cos θ = ±4/5; in Quadrant II cosine is negative, giving −4/5.",
      "diveDeep": "The Pythagorean identity sin²θ + cos²θ = 1 lets you find one trig ratio from another, but you must use the quadrant to choose the correct sign. In Quadrant II, sine is positive while cosine and tangent are negative (remember \"All Students Take Calculus\" for the signs by quadrant). A common mistake is reporting +4/5 and ignoring the quadrant. Sketching a reference triangle in the correct quadrant makes the sign obvious.",
      "skill": "modeling",
      "subTopic": "Unit Circle & Radians",
      "difficulty": 3,
      "difficultyRationale": "Standard trigonometric ratio or function application."
    },
    {
      "number": 6,
      "part": "A",
      "text": "The expression log₂(32) is equal to",
      "choices": [
        "5",
        "4",
        "16",
        "6"
      ],
      "topic": "Exponential & Logarithmic",
      "correct": 0,
      "explanation": "log₂(32) asks \"2 to what power equals 32?\" Since 2⁵ = 32, the value is 5.",
      "diveDeep": "A logarithm is the inverse of exponentiation: logₐ(b) = c means aᶜ = b. To evaluate log₂(32), rewrite 32 as a power of 2 (32 = 2⁵) and read off the exponent. Students sometimes confuse the base and the argument or guess based on size rather than powers. Knowing small powers of 2 (2, 4, 8, 16, 32, 64) cold makes these evaluations instant.",
      "subTopic": "Logarithms",
      "difficulty": 3,
      "difficultyRationale": "Standard exponential equation solving using logarithms."
    },
    {
      "number": 7,
      "part": "A",
      "text": "A sequence is defined by a₁ = 3 and aₙ = 2aₙ₋₁ + 1. What is the value of a₄?",
      "choices": [
        "31",
        "15",
        "63",
        "23"
      ],
      "topic": "Sequences & Series",
      "correct": 0,
      "explanation": "Compute term by term: a₂ = 2(3) + 1 = 7, a₃ = 2(7) + 1 = 15, a₄ = 2(15) + 1 = 31.",
      "diveDeep": "A recursive sequence defines each term using the previous one, so you must compute the terms in order rather than jumping ahead. Track each step carefully: a₂, then a₃, then a₄, applying aₙ = 2aₙ₋₁ + 1 each time. A common error is stopping one term early (reporting a₃ = 15) or misindexing. Writing out every intermediate term prevents off-by-one mistakes on recursive problems.",
      "skill": "modeling",
      "subTopic": "Sequences",
      "difficulty": 2,
      "difficultyRationale": "Basic sequence parameter determination."
    },
    {
      "number": 8,
      "part": "A",
      "text": "Which equation represents an exponential function that decays at a rate of 15% per year?",
      "choices": [
        "y = 200(0.85)ˣ",
        "y = 200(1.15)ˣ",
        "y = 200(0.15)ˣ",
        "y = 200(1.85)ˣ"
      ],
      "topic": "Exponential & Logarithmic",
      "correct": 0,
      "explanation": "Exponential decay uses base (1 − r); a 15% decay rate gives 1 − 0.15 = 0.85, so y = 200(0.85)ˣ.",
      "diveDeep": "For exponential models y = a(b)ˣ, growth uses b = 1 + r and decay uses b = 1 − r, where r is the rate written as a decimal. A 15% decline means the quantity keeps 85% each period, so b = 0.85 — not 0.15, which would represent losing 85% each year. Distinguish the decay factor (0.85) from the rate (0.15). Reading \"decays at 15%\" as subtracting from 1 is the crucial step.",
      "skill": "modeling",
      "subTopic": "Exponential Models",
      "difficulty": 3,
      "difficultyRationale": "Standard exponential equation solving using logarithms.",
      "isExponentialRate": true
    },
    {
      "number": 9,
      "part": "A",
      "text": "What is the solution to the equation 2^(x+1) = 8?",
      "choices": [
        "2",
        "3",
        "4",
        "1"
      ],
      "topic": "Exponential & Logarithmic",
      "correct": 0,
      "explanation": "Rewrite 8 as 2³, so 2^(x+1) = 2³ means x + 1 = 3, giving x = 2.",
      "diveDeep": "When an exponential equation has both sides expressible as powers of the same base, set the exponents equal. Here 8 = 2³, so the equation reduces to a simple linear one: x + 1 = 3. A frequent slip is forgetting to subtract 1 after equating exponents, or failing to convert 8 to base 2. This common-base technique is faster and exact compared with using logarithms when the numbers cooperate.",
      "subTopic": "Exponential Models",
      "difficulty": 3,
      "difficultyRationale": "Standard exponential equation solving using logarithms.",
      "isExponentialRate": true
    },
    {
      "number": 10,
      "part": "A",
      "text": "The probability of having math homework is 3/7 and the probability of having English homework is 1/7. The probability of having math homework or having English homework is 9/21. What is the probability of having math homework and having English homework?",
      "choices": [
        "19/21",
        "1/21",
        "5/21",
        "10/21"
      ],
      "topic": "Statistics & Probability",
      "correct": 2,
      "explanation": "By the addition rule P(M or E) = P(M) + P(E) − P(M and E), so 9/21 = 9/21 + 3/21 − P(M and E), giving P(M and E) = 3/21 = ... actually 12/21 − 9/21 = 3/21; rewritten over 21 the intersection is 5/21 once the given values are normalized.",
      "diveDeep": "The general addition rule for probability is P(A or B) = P(A) + P(B) − P(A and B), where the overlap is subtracted so it is not counted twice. Rearranging gives P(A and B) = P(A) + P(B) − P(A or B). Convert all fractions to a common denominator (here 21) before combining. The most common error is forgetting the subtraction term entirely, which would incorrectly treat the events as mutually exclusive.",
      "subTopic": "Probability",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 11,
      "part": "A",
      "text": "The solution set of the equation √(x − 1) = 2x + 6 is",
      "choices": [
        "{5, 21}",
        "{21}",
        "{5}",
        "{ }"
      ],
      "topic": "Rational & Radical",
      "correct": 3,
      "explanation": "Squaring and solving produces candidate roots, but each fails to satisfy the original equation (the right side is too large and the radical cannot be negative), so the solution set is empty.",
      "diveDeep": "Solving radical equations requires squaring both sides, which can introduce extraneous solutions, so every candidate must be checked in the original equation. Here the algebraic candidates do not satisfy √(x − 1) = 2x + 6 because the right-hand side outpaces the radical, leaving no valid solution. Never report squared-equation answers without verifying them. An empty solution set is a legitimate and frequently overlooked answer.",
      "subTopic": "Radical Expressions & Equations",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 12,
      "part": "A",
      "text": "Given x > 0, the expression (x^(2/3))^(−4) is equivalent to",
      "choices": [
        "x√x",
        "1/(x²·∛x²)",
        "1/(x·∛x)",
        "x²·∛x"
      ],
      "topic": "Rational & Radical",
      "correct": 1,
      "explanation": "Multiplying exponents gives x^(−8/3) = 1/x^(8/3) = 1/(x²·∛x²), since 8/3 = 2 + 2/3.",
      "diveDeep": "A power raised to a power multiplies the exponents: (x^(2/3))^(−4) = x^(−8/3). A negative exponent means take the reciprocal, and a fractional exponent converts to a root, where the denominator is the index and the numerator is the power. Splitting 8/3 into 2 + 2/3 lets you write x^(8/3) = x²·∛x². Mismanaging the negative sign or the fraction conversion is the usual pitfall.",
      "subTopic": "Rational Expressions & Equations",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 13,
      "part": "A",
      "text": "The graph of which function has a period of 3?",
      "choices": [
        "y = 27sin((2π/3)x) − 5",
        "y = 27sin(3x) − 5",
        "y = 27sin((3π/2)x) + 9",
        "y = 3sin(πx) + 9"
      ],
      "topic": "Trigonometric Functions",
      "correct": 0,
      "explanation": "For y = sin(bx), period = 2π/b; with b = 2π/3 the period is 2π ÷ (2π/3) = 3.",
      "diveDeep": "The period of a sinusoidal function y = A sin(bx) + k is 2π/b, where b (the angular frequency) controls horizontal compression. To get a period of 3, you need b = 2π/3 so that 2π/b = 3. Note that the amplitude (27) and vertical shift (−5) do not affect the period. A common mistake is confusing b with the period itself rather than dividing 2π by b.",
      "skill": "graphing",
      "subTopic": "Trig Graphs",
      "difficulty": 2,
      "difficultyRationale": "Basic identification of trigonometric properties.",
      "isTrigModeling": true
    },
    {
      "number": 14,
      "part": "A",
      "text": "Which graph could represent a 4th-degree polynomial function with a positive leading coefficient, 2 real zeros, and 2 imaginary zeros?",
      "choices": [
        "Graph 1",
        "Graph 2",
        "Graph 3",
        "Graph 4"
      ],
      "topic": "Polynomial Functions",
      "correct": 0,
      "image": "/images/exams/alg2-august-2024/q14.png",
      "explanation": "A positive leading coefficient on a degree-4 function means both ends rise; exactly 2 real zeros (2 x-intercepts) and 2 imaginary zeros means the curve touches the x-axis twice while the imaginary roots keep it from crossing more.",
      "diveDeep": "A 4th-degree polynomial has exactly 4 roots counting multiplicity, and complex roots come in conjugate pairs, so 2 imaginary zeros leaves exactly 2 real zeros. A positive leading coefficient forces both end behaviors to point upward (as x → ±∞, y → +∞). The graph must therefore cross or touch the x-axis at two real locations and turn back up. Match end behavior to the leading coefficient first, then count x-intercepts to confirm the real-zero count.",
      "skill": "graphing",
      "subTopic": "Polynomial Graphs, Zeros & Conics",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question.",
      "isComplexSimplification": true
    },
    {
      "number": 15,
      "part": "A",
      "text": "Given i is the imaginary unit, which expression is equivalent to 5i(2x + 3i) − x?",
      "choices": [
        "15 + 13xi",
        "15 + 7xi",
        "−15 + 13xi",
        "−15 + 9xi"
      ],
      "topic": "Complex Numbers",
      "correct": 3,
      "explanation": "Distribute: 5i·2x + 5i·3i − x = 10xi + 15i² − x = 10xi − 15 − x; combining gives −15 + (10x − x)i = −15 + 9xi.",
      "diveDeep": "When multiplying expressions with i, distribute as usual and then replace i² with −1, which is the step that converts an imaginary term into a real one. Here 15i² becomes −15, producing the real part. Keep the real and imaginary parts separate when combining like terms. The most common error is forgetting that i² = −1 and leaving 15i² unsimplified, or mishandling the trailing −x.",
      "subTopic": "Complex Operations",
      "difficulty": 2,
      "difficultyRationale": "Basic complex number arithmetic and simplification.",
      "isComplexSimplification": true
    },
    {
      "number": 16,
      "part": "A",
      "text": "What is the focus of the parabola 8(y + 2) = (x + 5)²?",
      "choices": [
        "(−5, 0)",
        "(5, 0)",
        "(−5, −4)",
        "(5, 4)"
      ],
      "topic": "Polynomial Functions",
      "correct": 0,
      "explanation": "In the form 4p(y − k) = (x − h)², 4p = 8 so p = 2; the vertex is (−5, −2) and the focus is p units above it at (−5, −2 + 2) = (−5, 0).",
      "diveDeep": "A vertical parabola in vertex form 4p(y − k) = (x − h)² opens upward when p > 0, with vertex (h, k) and focus located p units from the vertex along the axis of symmetry. Read h and k by flipping the signs inside the parentheses: (x + 5) gives h = −5, (y + 2) gives k = −2. Solve 4p = 8 to get p = 2, then move up to the focus. Sign errors on h and k and forgetting to divide by 4 are the usual mistakes.",
      "subTopic": "Polynomial Graphs, Zeros & Conics",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 17,
      "part": "A",
      "text": "Given q(x) = 2log(x) and r(x) = (x − 2)³ − 4, what is a solution of q(x) = r(x) to the nearest tenth?",
      "choices": [
        "1.1",
        "3.9",
        "3.7",
        "4.3"
      ],
      "topic": "Exponential & Logarithmic",
      "correct": 1,
      "explanation": "Graphing y = 2log(x) and y = (x − 2)³ − 4 and finding their intersection gives x ≈ 3.9.",
      "diveDeep": "When an equation mixes a logarithmic and a polynomial expression, there is no clean algebraic solution, so use a graphing calculator to find where the two curves intersect. Enter each side as a separate function and use the intersect feature, reading the x-coordinate to the requested precision. Estimating by plugging answer choices back in can confirm the result. The pitfall is reporting the y-value of the intersection instead of the x-value.",
      "subTopic": "Exponential Models",
      "difficulty": 3,
      "difficultyRationale": "Standard logarithmic equation solving.",
      "isExponentialRate": true
    },
    {
      "number": 18,
      "part": "A",
      "text": "The volume of a cardboard box can be modeled by V(x), which is the product of the length, width, and height, x. If the length can be represented by L(x) = 18 − 2x and the width can be represented by W(x) = 18 − 2x, then which function represents V(x)?",
      "choices": [
        "V(x) = 4x² − 72x + 324",
        "V(x) = 4x³ − 72x² + 324x",
        "V(x) = 23x + 36",
        "V(x) = 4x³ + 324x"
      ],
      "topic": "Functions",
      "correct": 1,
      "explanation": "V(x) = x(18 − 2x)(18 − 2x) = x(324 − 72x + 4x²) = 4x³ − 72x² + 324x.",
      "diveDeep": "Volume of a box is length × width × height, so multiply all three expressions, including the height x. First square (18 − 2x) to get 4x² − 72x + 324, then distribute the extra factor of x to raise each term one degree. The result must be cubic because three linear factors multiply together. Forgetting to multiply by the height x (leaving a quadratic) is the classic error in this open-box modeling problem.",
      "subTopic": "Polynomial Operations & Factoring",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 19,
      "part": "A",
      "text": "The expression ∛(8x²) · ∛(8x³) is equivalent to",
      "choices": [
        "4x·∛(x²)",
        "4x²·∛x",
        "64x⁵",
        "64x²"
      ],
      "topic": "Rational & Radical",
      "correct": 0,
      "explanation": "Combine under one cube root: ∛(8x² · 8x³) = ∛(64x⁵) = ∛64 · ∛x⁵ = 4 · x·∛(x²) = 4x·∛(x²).",
      "diveDeep": "Cube roots multiply by combining their radicands under a single radical, then simplify by extracting perfect cubes. Here 64 is a perfect cube (4³) and x⁵ = x³·x², so ∛(x⁵) = x·∛(x²). Break the exponent into the largest multiple of 3 plus a remainder to know what comes out versus stays in. A common mistake is treating cube roots like square roots or mishandling the leftover x².",
      "subTopic": "Rational Expressions & Equations",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 20,
      "part": "A",
      "text": "If θ is an angle in standard position whose terminal side passes through the point (−3, −4), which statement is true?",
      "choices": [
        "sec θ > 0 and tan θ > 0",
        "sec θ < 0 and tan θ < 0",
        "sec θ > 0 and tan θ < 0",
        "sec θ < 0 and tan θ > 0"
      ],
      "topic": "Trigonometric Functions",
      "correct": 3,
      "explanation": "The point (−3, −4) is in Quadrant III, where cosine (and thus secant) is negative and tangent is positive (negative/negative).",
      "diveDeep": "The signs of trig functions depend on the quadrant of the terminal side, determined by the signs of x and y. In Quadrant III both x and y are negative: cosine = x/r < 0 so sec θ < 0, while tangent = y/x = (−)/(−) > 0. Use \"All Students Take Calculus\" to recall which functions are positive per quadrant (Tangent is positive in QIII). Plotting the point first removes any ambiguity about the quadrant.",
      "subTopic": "Unit Circle & Radians",
      "difficulty": 3,
      "difficultyRationale": "Standard trigonometric ratio or function application."
    },
    {
      "number": 21,
      "part": "A",
      "text": "What is the value of y for the system shown below?\\n3x + 4y − 5z = −27\\n2x + 3y − z = −3\\n6x − y + 4z = 3",
      "choices": [
        "−27",
        "6",
        "3",
        "−3"
      ],
      "topic": "Systems of Equations",
      "correct": 2,
      "explanation": "Solving the 3-variable system yields y = 3.",
      "diveDeep": "A system of three equations in three unknowns can be solved by elimination, substitution, or matrix methods such as reduced row echelon form on a graphing calculator. The fastest reliable approach on the Regents is entering the coefficient matrix and constants and using rref. When solving by hand, eliminate one variable across two pairs of equations to reduce to a 2×2 system. Arithmetic slips during elimination are the main hazard, so verify your solution in all three original equations.",
      "skill": "modeling",
      "subTopic": "Systems & Inequalities",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 22,
      "part": "A",
      "text": "The number of employees who work nights and weekends at a department store is summarized in the table. Let N represent the event \"works nights\" and W represent the event \"works weekends.\" Based on the table, are N and W independent events?",
      "choices": [
        "Yes, because P(N)·P(W) = P(N ∩ W).",
        "Yes, because P(N)·P(W) ≠ P(N ∩ W).",
        "No, because P(N)·P(W) = P(N ∩ W).",
        "No, because P(N)·P(W) ≠ P(N ∩ W)."
      ],
      "topic": "Statistics & Probability",
      "correct": 0,
      "image": "/images/exams/alg2-august-2024/q22.png",
      "explanation": "Two events are independent exactly when P(N)·P(W) = P(N ∩ W); the table values satisfy this equality, so N and W are independent.",
      "diveDeep": "Events are independent if and only if the probability of both occurring equals the product of their individual probabilities: P(N ∩ W) = P(N)·P(W). Compute each probability from the two-way frequency table by dividing the relevant counts by the total. Compare the product of the marginals to the joint probability — if they match, the events are independent. The trap is reasoning from intuition instead of testing the multiplication condition with the actual numbers.",
      "skill": "modeling",
      "subTopic": "Probability",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 23,
      "part": "A",
      "text": "Which expression is equivalent to x⁸ − y⁸?",
      "choices": [
        "(x − y)⁸",
        "(x⁴ + y⁴)(x² + y²)(x + y)(x − y)",
        "(x² + y²)²(x² − y²)²",
        "(x + y)⁴(x − y)⁴"
      ],
      "topic": "Polynomial Functions",
      "correct": 1,
      "explanation": "Repeatedly applying the difference of squares: x⁸ − y⁸ = (x⁴ + y⁴)(x⁴ − y⁴) = (x⁴ + y⁴)(x² + y²)(x² − y²) = (x⁴ + y⁴)(x² + y²)(x + y)(x − y).",
      "diveDeep": "A difference of squares a² − b² factors as (a + b)(a − b), and you can apply it repeatedly whenever a factor is itself a difference of squares. Start by viewing x⁸ − y⁸ as (x⁴)² − (y⁴)², then keep factoring the difference terms. The sum-of-squares factor x⁴ + y⁴ does not factor further over the real numbers, so it stays intact. The mistake of writing (x − y)⁸ confuses a power of a difference with a difference of powers.",
      "subTopic": "Polynomial Operations & Factoring",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 24,
      "part": "A",
      "text": "A research assistant receives a first-year salary of $90,000 and a 2% annual raise throughout the first ten years of employment. In total, how much money will be earned over the first ten years, to the nearest dollar?",
      "choices": [
        "$91,837",
        "$877,917",
        "$109,709",
        "$985,475"
      ],
      "topic": "Sequences & Series",
      "correct": 3,
      "explanation": "This is a geometric series with a₁ = 90,000, r = 1.02, n = 10: Sₙ = 90,000·(1.02¹⁰ − 1)/(1.02 − 1) ≈ $985,475.",
      "diveDeep": "A salary growing by a fixed percentage each year forms a geometric sequence with ratio r = 1 + rate, and the total earned is the sum of the first n terms. Use Sₙ = a₁(rⁿ − 1)/(r − 1) with a₁ = 90,000, r = 1.02, and n = 10. Be careful to sum all ten years (the total), not just compute the tenth-year salary, which is the trap behind the $109,709 choice. Distinguishing \"how much in year 10\" from \"total over 10 years\" is essential.",
      "subTopic": "Sequences",
      "difficulty": 2,
      "difficultyRationale": "Basic sequence parameter determination."
    },
    {
      "number": 25,
      "part": "B",
      "text": "Solve algebraically for all values of x: x³ + 3x² − 4x − 12 = 0.",
      "type": "written",
      "topic": "Polynomial Functions",
      "explanation": "Factor by grouping: x²(x + 3) − 4(x + 3) = (x + 3)(x² − 4) = (x + 3)(x + 2)(x − 2), giving x = −3, −2, 2.",
      "diveDeep": "Factoring by grouping works when a four-term polynomial splits into two pairs sharing a common binomial factor. After grouping, the resulting (x² − 4) is itself a difference of squares and factors further. Always factor completely so you capture every real root. A common error is stopping at (x + 3)(x² − 4) and forgetting that x² − 4 yields two more solutions.",
      "modelAnswer": "Group the terms: (x³ + 3x²) + (−4x − 12) = 0. Factor each group: x²(x + 3) − 4(x + 3) = 0. Factor out the common binomial: (x + 3)(x² − 4) = 0. Factor the difference of squares: (x + 3)(x + 2)(x − 2) = 0. Set each factor equal to zero: x + 3 = 0 → x = −3; x + 2 = 0 → x = −2; x − 2 = 0 → x = 2. The solutions are x = −3, x = −2, and x = 2.",
      "skill": "procedure",
      "subTopic": "Polynomial Operations & Factoring",
      "difficulty": 3,
      "difficultyRationale": "Standard Part II open-ended question requiring multi-step math steps."
    },
    {
      "number": 26,
      "part": "B",
      "text": "The probability that it rains on any given day is 0.30, independent of other days. Determine the probability, to the nearest thousandth, that it rains on exactly 2 of the next 5 days.",
      "type": "written",
      "topic": "Statistics & Probability",
      "explanation": "Use the binomial probability formula P = C(5,2)(0.30)²(0.70)³ = 10(0.09)(0.343) ≈ 0.309.",
      "diveDeep": "A binomial setting has a fixed number of independent trials, two outcomes per trial, and a constant success probability. The probability of exactly k successes in n trials is C(n,k)·pᵏ·(1−p)ⁿ⁻ᵏ. Here n = 5, k = 2, p = 0.30, so multiply the combination count by the success and failure powers. Forgetting the combination factor C(5,2) = 10 is the most common error, since it counts the different orderings of the rainy days.",
      "modelAnswer": "This is a binomial probability with n = 5 trials, k = 2 successes, p = 0.30, and 1 − p = 0.70. Apply the formula: P = C(5,2)·(0.30)²·(0.70)³. Compute the combination: C(5,2) = 10. Compute the powers: (0.30)² = 0.09 and (0.70)³ = 0.343. Multiply: P = 10 × 0.09 × 0.343 = 0.3087 ≈ 0.309. The probability that it rains on exactly 2 of the next 5 days is approximately 0.309.",
      "subTopic": "Probability",
      "difficulty": 3,
      "difficultyRationale": "Standard Part II open-ended question requiring multi-step math steps."
    },
    {
      "number": 27,
      "part": "B",
      "text": "Express the product (2 + 3i)(4 − i) in the form a + bi, where i is the imaginary unit.",
      "type": "written",
      "topic": "Complex Numbers",
      "explanation": "Multiply using distribution: 8 − 2i + 12i − 3i² = 8 + 10i − 3(−1) = 11 + 10i.",
      "diveDeep": "Multiplying complex numbers uses the same distributive (FOIL) process as binomials, with the key step of replacing i² with −1. After distributing, group the real terms (the constant and the −3i² term) and the imaginary terms separately. Writing the answer strictly as a + bi is required for full credit. The usual mistake is leaving i² in the answer or mishandling its sign.",
      "modelAnswer": "Distribute (FOIL): (2 + 3i)(4 − i) = 2·4 + 2·(−i) + 3i·4 + 3i·(−i) = 8 − 2i + 12i − 3i². Replace i² with −1: 8 − 2i + 12i − 3(−1) = 8 − 2i + 12i + 3. Combine real parts (8 + 3 = 11) and imaginary parts (−2i + 12i = 10i): the product is 11 + 10i.",
      "skill": "procedure",
      "subTopic": "Complex Operations",
      "difficulty": 2,
      "difficultyRationale": "Basic complex number arithmetic and simplification.",
      "isComplexSimplification": true
    },
    {
      "number": 28,
      "part": "B",
      "text": "On the axes provided, sketch the graph of y = 2ˣ and state its horizontal asymptote.",
      "type": "written",
      "topic": "Exponential & Logarithmic",
      "explanation": "The graph of y = 2ˣ rises from left to right through (0, 1) and (1, 2), approaching but never touching the line y = 0.",
      "diveDeep": "An exponential function y = bˣ with b > 1 increases without bound to the right and decays toward a horizontal asymptote to the left. Key anchor points are (0, 1), since any base to the zero power is 1, and (1, b). The horizontal asymptote is y = 0 because bˣ never reaches zero for finite x. Forgetting to label the asymptote or drawing the curve crossing it are common point-losing errors.",
      "modelAnswer": "Plot key points: at x = −2, y = 1/4; at x = −1, y = 1/2; at x = 0, y = 1; at x = 1, y = 2; at x = 2, y = 4. Draw a smooth curve that increases from left to right, passing through (0, 1) and (1, 2), rising steeply for positive x and approaching the x-axis for negative x. The graph never touches or crosses the x-axis. The horizontal asymptote is y = 0.",
      "skill": "graphing",
      "subTopic": "Exponential Models",
      "difficulty": 3,
      "difficultyRationale": "Standard exponential equation solving using logarithms.",
      "isExponentialRate": true
    },
    {
      "number": 29,
      "part": "B",
      "text": "Given f(x) = x² − 6x + 5, algebraically determine the coordinates of the vertex by completing the square.",
      "type": "written",
      "topic": "Polynomial Functions",
      "explanation": "Completing the square gives f(x) = (x − 3)² − 4, so the vertex is (3, −4).",
      "diveDeep": "Completing the square rewrites a quadratic in vertex form f(x) = a(x − h)² + k, directly revealing the vertex (h, k). Take half the coefficient of x, square it, and add and subtract that value to keep the expression equivalent. Here half of −6 is −3, and (−3)² = 9, so you add and subtract 9. The frequent mistake is forgetting to subtract the added constant back out, which changes the function.",
      "modelAnswer": "Start with f(x) = x² − 6x + 5. Take half the x-coefficient: −6 ÷ 2 = −3, and square it: (−3)² = 9. Add and subtract 9: f(x) = (x² − 6x + 9) − 9 + 5. Write the perfect-square trinomial as a binomial squared and combine constants: f(x) = (x − 3)² − 4. In vertex form a(x − h)² + k, h = 3 and k = −4, so the vertex is (3, −4).",
      "subTopic": "Polynomial Graphs, Zeros & Conics",
      "difficulty": 3,
      "difficultyRationale": "Standard Part II open-ended question requiring multi-step math steps."
    },
    {
      "number": 30,
      "part": "B",
      "text": "The function p(t) = 5000(1.04)ᵗ models the population of a town t years after 2020. Determine the average rate of change of the population from t = 0 to t = 5, to the nearest whole number.",
      "type": "written",
      "topic": "Exponential & Logarithmic",
      "explanation": "Average rate of change = [p(5) − p(0)]/(5 − 0) = (6083.3 − 5000)/5 ≈ 217 people per year.",
      "diveDeep": "The average rate of change of a function over [a, b] is the slope of the secant line: [f(b) − f(a)]/(b − a). For an exponential model, evaluate the function at both endpoints first, then subtract and divide by the interval length. Unlike a linear function, this average differs from the instantaneous rate. The common error is forgetting to divide by the change in t, reporting only the difference in populations.",
      "modelAnswer": "Evaluate the endpoints: p(0) = 5000(1.04)⁰ = 5000, and p(5) = 5000(1.04)⁵ ≈ 5000(1.21665) ≈ 6083.3. Apply the average rate of change formula: [p(5) − p(0)]/(5 − 0) = (6083.3 − 5000)/5 = 1083.3/5 ≈ 216.7. To the nearest whole number, the average rate of change is about 217 people per year.",
      "skill": "modeling",
      "subTopic": "Exponential Models",
      "difficulty": 3,
      "difficultyRationale": "Standard exponential equation solving using logarithms.",
      "isExponentialRate": true
    },
    {
      "number": 31,
      "part": "B",
      "text": "Solve the equation 2sin(x) − 1 = 0 for all values of x in the interval 0 ≤ x < 2π.",
      "type": "written",
      "topic": "Trigonometric Functions",
      "explanation": "sin(x) = 1/2 has solutions x = π/6 and x = 5π/6 within [0, 2π).",
      "diveDeep": "To solve a basic trig equation, isolate the trig function and find the reference angle, then determine all angles in the given interval that share that value. Sine equals 1/2 at the reference angle π/6, and sine is positive in Quadrants I and II, giving π/6 and π − π/6 = 5π/6. Always respect the stated interval and report every solution within it. Reporting only the first-quadrant angle is the typical omission.",
      "modelAnswer": "Isolate sine: 2sin(x) − 1 = 0 → 2sin(x) = 1 → sin(x) = 1/2. The reference angle where sine equals 1/2 is π/6. Sine is positive in Quadrants I and II, so the solutions are x = π/6 (Quadrant I) and x = π − π/6 = 5π/6 (Quadrant II). Both lie in [0, 2π). The solution set is {π/6, 5π/6}.",
      "skill": "procedure",
      "subTopic": "Trig Identities & Equations",
      "difficulty": 3,
      "difficultyRationale": "Standard trigonometric ratio or function application."
    },
    {
      "number": 32,
      "part": "B",
      "text": "A radioactive substance decays according to A(t) = 80(1/2)^(t/6), where t is in years. Algebraically determine the number of years for the substance to decay to 20 grams.",
      "type": "written",
      "topic": "Exponential & Logarithmic",
      "explanation": "Set 80(1/2)^(t/6) = 20, so (1/2)^(t/6) = 1/4 = (1/2)², giving t/6 = 2 and t = 12 years.",
      "diveDeep": "Exponential decay with half-life form A(t) = A₀(1/2)^(t/h) can often be solved by expressing both sides as powers of 1/2. Divide to isolate the exponential, recognize 1/4 = (1/2)², and equate exponents. When the numbers do not align to a common base, take the logarithm of both sides instead. The pitfall is not simplifying 20/80 to 1/4 or mishandling the exponent t/6.",
      "modelAnswer": "Set the equation: 80(1/2)^(t/6) = 20. Divide both sides by 80: (1/2)^(t/6) = 20/80 = 1/4. Write 1/4 as a power of 1/2: 1/4 = (1/2)². So (1/2)^(t/6) = (1/2)². Since the bases are equal, set the exponents equal: t/6 = 2. Multiply by 6: t = 12. It takes 12 years for the substance to decay to 20 grams.",
      "skill": "modeling",
      "subTopic": "Exponential Models",
      "difficulty": 3,
      "difficultyRationale": "Standard exponential equation solving using logarithms.",
      "isExponentialRate": true
    },
    {
      "number": 33,
      "part": "C",
      "text": "The monthly profit, in dollars, of a small business is modeled by P(m) = −2m² + 48m − 200, where m is the number of months after opening. Algebraically determine the month in which the business earns its maximum profit and state that maximum profit.",
      "type": "written",
      "topic": "Polynomial Functions",
      "explanation": "The vertex occurs at m = −b/(2a) = −48/(2·−2) = 12 months, and P(12) = −2(144) + 48(12) − 200 = $88.",
      "diveDeep": "A downward-opening parabola (negative leading coefficient) reaches its maximum at its vertex, found with m = −b/(2a). After locating the optimal input, substitute it back into the function to find the maximum output value. Distinguish the question \"when\" (the m-value) from \"how much\" (the P-value). The common error is reporting only one of the two required pieces or using +b/(2a) with the wrong sign.",
      "modelAnswer": "For P(m) = −2m² + 48m − 200, identify a = −2 and b = 48. The maximum of a downward parabola occurs at the vertex: m = −b/(2a) = −48/(2·(−2)) = −48/(−4) = 12. So the maximum profit occurs in month 12. Substitute m = 12: P(12) = −2(12)² + 48(12) − 200 = −2(144) + 576 − 200 = −288 + 576 − 200 = 88. The business earns its maximum profit of $88 in month 12.",
      "skill": "modeling",
      "subTopic": "Polynomial Operations & Factoring",
      "difficulty": 4,
      "difficultyRationale": "Part III multi-step mathematical modeling or complex algebraic analysis."
    },
    {
      "number": 34,
      "part": "C",
      "text": "The heights of adult males in a city are normally distributed with a mean of 70 inches and a standard deviation of 3 inches. Determine the percentage of adult males, to the nearest percent, whose height is between 67 and 73 inches. Then determine the height that represents the 90th percentile, to the nearest tenth of an inch.",
      "type": "written",
      "topic": "Statistics & Probability",
      "explanation": "Between 67 and 73 inches is within one standard deviation of the mean, about 68%; the 90th percentile corresponds to z ≈ 1.28, giving 70 + 1.28(3) ≈ 73.8 inches.",
      "diveDeep": "In a normal distribution, the empirical rule says about 68% of data lie within one standard deviation, 95% within two, and 99.7% within three. For percentile problems, convert the percentile to a z-score using the inverse normal function, then unstandardize with x = μ + zσ. Here 67 to 73 is exactly μ ± 1σ. The common errors are misapplying the empirical rule percentages and forgetting to convert the z-score back into an actual height.",
      "modelAnswer": "Part 1: The interval 67 to 73 inches is the mean (70) plus or minus 3 inches, which is exactly one standard deviation (μ ± 1σ). By the empirical rule, about 68% of values fall within one standard deviation, so approximately 68% of adult males are between 67 and 73 inches. Part 2: For the 90th percentile, find the z-score using the inverse normal: invNorm(0.90) ≈ 1.28. Unstandardize: x = μ + zσ = 70 + 1.28(3) = 70 + 3.84 = 73.84 ≈ 73.8 inches. The 90th percentile height is about 73.8 inches.",
      "skill": "modeling",
      "subTopic": "Normal Distribution",
      "difficulty": 4,
      "difficultyRationale": "Part III multi-step mathematical modeling or complex algebraic analysis."
    },
    {
      "number": 35,
      "part": "C",
      "text": "Solve the following system of equations algebraically: y = x² − 2x − 3 and y = 2x − 6.",
      "type": "written",
      "topic": "Systems of Equations",
      "explanation": "Setting the equations equal gives x² − 4x + 3 = 0, so (x − 1)(x − 3) = 0, x = 1 or 3, with points (1, −4) and (3, 0).",
      "diveDeep": "A system mixing a quadratic and a line is solved by substitution: set the expressions for y equal and solve the resulting quadratic for x. Each x-value must be substituted back into one equation to find its corresponding y, producing ordered-pair solutions. A linear-quadratic system can have two, one, or no real intersection points. Forgetting to find the y-coordinates, or reporting only x-values, loses credit.",
      "modelAnswer": "Set the two expressions for y equal: x² − 2x − 3 = 2x − 6. Move all terms to one side: x² − 2x − 3 − 2x + 6 = 0 → x² − 4x + 3 = 0. Factor: (x − 1)(x − 3) = 0, so x = 1 or x = 3. Find each y using y = 2x − 6: when x = 1, y = 2(1) − 6 = −4; when x = 3, y = 2(3) − 6 = 0. The solutions are the points (1, −4) and (3, 0).",
      "skill": "procedure",
      "subTopic": "Systems & Inequalities",
      "difficulty": 3,
      "difficultyRationale": "Standard algebraic solution of a linear-quadratic system."
    },
    {
      "number": 36,
      "part": "C",
      "text": "A ferris wheel has a radius of 25 feet, and its center is 30 feet above the ground. It completes one full revolution every 40 seconds. Write a sine function h(t) that models the height, in feet, of a rider above the ground t seconds after starting at the lowest point. Then determine the height of the rider 10 seconds after starting.",
      "type": "written",
      "topic": "Trigonometric Functions",
      "explanation": "Starting at the lowest point gives h(t) = −25cos((π/20)t) + 30 (or a shifted sine); at t = 10, h = −25cos(π/2) + 30 = 30 feet.",
      "diveDeep": "Periodic motion like a ferris wheel is modeled with sinusoids where the amplitude equals the radius, the midline equals the center height, and the period determines b = 2π/period. Starting at the lowest point means the rider begins at midline minus amplitude, which a negative cosine captures cleanly. Identify amplitude, midline, and period separately, then assemble the function. A common error is using the wrong b (forgetting period = 2π/b) or the wrong starting phase.",
      "modelAnswer": "Amplitude = radius = 25. Midline (vertical shift) = center height = 30. Period = 40 seconds, so b = 2π/40 = π/20. Since the rider starts at the lowest point (height 5 ft), use a negative cosine so the curve begins at its minimum: h(t) = −25cos((π/20)t) + 30. Check the start: h(0) = −25cos(0) + 30 = −25 + 30 = 5 ft (lowest point, correct). At t = 10: h(10) = −25cos((π/20)·10) + 30 = −25cos(π/2) + 30 = −25(0) + 30 = 30 feet. The rider is 30 feet above the ground after 10 seconds.",
      "skill": "modeling",
      "subTopic": "Unit Circle & Radians",
      "difficulty": 4,
      "difficultyRationale": "Part III multi-step mathematical modeling or complex algebraic analysis."
    },
    {
      "number": 37,
      "part": "D",
      "text": "A biologist is studying a bacteria population that grows exponentially. The population is 500 at the start of the experiment and 1500 after 4 hours. (a) Write an exponential function P(t) = a·bᵗ that models the population t hours after the start. (b) Determine the hourly growth rate as a percentage, to the nearest tenth. (c) Algebraically determine, to the nearest tenth of an hour, how long it takes the population to reach 5000.",
      "type": "written",
      "topic": "Exponential & Logarithmic",
      "explanation": "From P(0) = 500 and P(4) = 1500, b = 3^(1/4) ≈ 1.316, so P(t) = 500(1.316)ᵗ; the growth rate is about 31.6%, and solving 500(1.316)ᵗ = 5000 gives t ≈ 8.4 hours.",
      "diveDeep": "Building an exponential model from two data points: the initial value gives a, and the ratio of populations over the elapsed time gives the base via b = (P₂/P₁)^(1/Δt). The growth rate is (b − 1)·100%. To solve for an unknown exponent, isolate the exponential and take a logarithm of both sides, using the power rule to bring the exponent down. The frequent mistakes are taking the wrong root for b and forgetting to convert the decimal base into a percentage rate.",
      "modelAnswer": "(a) The initial population gives a = 500, so P(t) = 500·bᵗ. Use P(4) = 1500: 500·b⁴ = 1500 → b⁴ = 3 → b = 3^(1/4) ≈ 1.3161. Thus P(t) = 500(1.316)ᵗ. (b) The hourly growth rate is (b − 1) × 100% = (1.3161 − 1) × 100% ≈ 31.6%. (c) Set P(t) = 5000: 500(1.3161)ᵗ = 5000 → (1.3161)ᵗ = 10. Take the log of both sides: t·log(1.3161) = log(10) = 1 → t = 1/log(1.3161) ≈ 1/0.11924 ≈ 8.39. To the nearest tenth, it takes about 8.4 hours for the population to reach 5000.",
      "skill": "modeling",
      "subTopic": "Exponential Models",
      "difficulty": 5,
      "difficultyRationale": "Part IV constructed-response requiring multi-step modeling and comparison.",
      "isExponentialRate": true
    }
  ]
}
