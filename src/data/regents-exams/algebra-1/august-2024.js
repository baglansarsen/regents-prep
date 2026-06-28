// Enriched algebra-1 exam — difficulty tags mapped offline
export default {
  "id": "a1-aug-2024",
  "subject": "algebra-1",
  "year": 2024,
  "session": "August",
  "totalMinutes": 180,
  "questions": [
    {
      "number": 1,
      "part": "A",
      "text": "What is the correct factorization of x² + 4x − 12?",
      "choices": [
        "(x + 3)(x − 4)",
        "(x + 2)(x − 6)",
        "(x − 3)(x + 4)",
        "(x − 2)(x + 6)"
      ],
      "topic": "Polynomials & Factoring",
      "correct": 3,
      "explanation": "You need two numbers that multiply to −12 and add to +4; those are +6 and −2, giving (x − 2)(x + 6).",
      "diveDeep": "When factoring x² + bx + c, find a pair of factors of c that sum to b. Here c = −12 (one factor positive, one negative) and b = +4, so the larger-magnitude factor must be positive: +6 and −2. A common mistake is mixing up the signs, e.g. choosing (x + 2)(x − 6) which gives a middle term of −4x instead of +4x. Always FOIL your answer back out to confirm the middle term matches.",
      "subTopic": "Factoring",
      "difficulty": 1,
      "difficultyRationale": "Requires foundational factoring of a basic difference of two perfect squares."
    },
    {
      "number": 2,
      "part": "A",
      "text": "Which situation can be modeled by a linear function?",
      "choices": [
        "A printer can print one page every three seconds.",
        "A bank account earns 0.5% interest each year, compounded annually.",
        "The number of cells in an organism doubles every four days.",
        "The attendance at a professional sports team’s games decreases by 1.5% each year."
      ],
      "topic": "Linear Equations & Inequalities",
      "correct": 0,
      "explanation": "Printing one page every three seconds is a constant rate of change (one page per 3 s), which is the defining feature of a linear function.",
      "diveDeep": "Linear functions change by a constant amount per unit (constant slope), while exponential functions change by a constant percent/ratio. Compound interest, doubling cells, and percentage decreases all multiply by a fixed factor each period, making them exponential. To tell them apart, ask: does the quantity go up/down by the SAME amount each step (linear) or by the same PERCENT each step (exponential)?",
      "skill": "modeling",
      "subTopic": "Linear Functions & Graphing",
      "difficulty": 2,
      "difficultyRationale": "Requires basic application of algebraic formulas, function evaluation, or solving simple equations."
    },
    {
      "number": 3,
      "part": "A",
      "text": "Which expression is equivalent to 3(x² − 2x + 3) − (4x² + 3x − 1)?",
      "choices": [
        "2x² + x − 12",
        "2x² − 3x + 8",
        "2x² − 8x + 7",
        "−x² − 9x + 10"
      ],
      "topic": "Polynomials & Factoring",
      "correct": 3,
      "explanation": "Distributing gives 3x² − 6x + 9 − 4x² − 3x + 1; combining like terms yields −x² − 9x + 10.",
      "diveDeep": "Carefully distribute the leading coefficient and, crucially, the negative sign across every term in the second parentheses: −(4x² + 3x − 1) = −4x² − 3x + 1. The most common error is forgetting to flip the sign on the −1 (making it −1 instead of +1) or on the 3x. Combine x² terms (3 − 4 = −1), x terms (−6 − 3 = −9), and constants (9 + 1 = 10) separately to stay organized.",
      "subTopic": "Polynomial Operations",
      "difficulty": 2,
      "difficultyRationale": "Requires distributing terms and combining like terms in a polynomial expression."
    },
    {
      "number": 4,
      "part": "A",
      "text": "At Adelynn’s first birthday party, each guest brought $1 in coins for her piggy bank. Guests brought nickels, dimes, and quarters for a total of $28. There were twice as many dimes as nickels and 12 more quarters than nickels. Which equation could be used to determine the number of nickels, x, that her guests brought to her party?",
      "choices": [
        "0.05x + 0.10x + 0.25x = 28",
        "0.05x + 0.10(2x) + 0.25(x + 12) = 28",
        "0.05(2x) + 0.10x + 0.25(x + 12) = 28",
        "0.05(x + 12) + 0.10(2x) + 0.25x = 28"
      ],
      "topic": "Linear Equations & Inequalities",
      "correct": 1,
      "explanation": "With x nickels, there are 2x dimes and (x + 12) quarters, so the value equation is 0.05x + 0.10(2x) + 0.25(x + 12) = 28.",
      "diveDeep": "Translate each phrase into algebra using x as the base quantity (nickels): \"twice as many dimes\" → 2x dimes, \"12 more quarters than nickels\" → x + 12 quarters. Then multiply each coin count by its dollar value (nickel = $0.05, dime = $0.10, quarter = $0.25) and sum to the total. A frequent mistake is multiplying the value by the wrong coin’s count; always match the coin value to its own quantity.",
      "skill": "modeling",
      "subTopic": "Solving Equations & Inequalities",
      "difficulty": 2,
      "difficultyRationale": "Requires basic application of algebraic formulas, function evaluation, or solving simple equations."
    },
    {
      "number": 5,
      "part": "A",
      "text": "A student creates a fourth-degree trinomial with a leading coefficient of −2 and a constant value of 5. The trinomial could be",
      "choices": [
        "−2x⁴ + 3x² + 5",
        "−4x² − 3x + 5",
        "−2x⁴ + 5x + 3",
        "−4x³ − 5x² + 3"
      ],
      "topic": "Polynomials & Factoring",
      "correct": 0,
      "explanation": "A fourth-degree trinomial needs exactly three terms with the highest power 4; −2x⁴ + 3x² + 5 has degree 4, a leading coefficient of −2, three terms, and a constant of 5.",
      "diveDeep": "Decode each requirement separately: \"fourth-degree\" means the highest exponent is 4, \"trinomial\" means exactly three terms, \"leading coefficient −2\" is the number on the highest-power term, and \"constant value 5\" is the term with no variable. Check all four conditions; choices with degree 2 or 3, the wrong constant, or only the wrong number of terms fail. The leading term must be −2x⁴.",
      "subTopic": "Factoring",
      "difficulty": 2,
      "difficultyRationale": "Requires basic application of algebraic formulas, function evaluation, or solving simple equations."
    },
    {
      "number": 6,
      "part": "A",
      "text": "When solving the equation 4x² − 16 = 0, Laura wrote 4x² = 16 as her first step. Which property justifies Laura’s first step?",
      "choices": [
        "distributive property of multiplication over addition",
        "multiplication property of equality",
        "commutative property of addition",
        "addition property of equality"
      ],
      "topic": "Linear Equations & Inequalities",
      "correct": 3,
      "explanation": "Adding 16 to both sides of the equation is justified by the addition property of equality.",
      "diveDeep": "The addition property of equality says you may add the same value to both sides of an equation without changing its solution. Laura moved the −16 to the right side by adding 16 to each side. Don’t confuse this with the multiplication property (multiplying both sides) — the next step, dividing by 4, would use the multiplication/division property instead.",
      "subTopic": "Solving Equations & Inequalities",
      "difficulty": 2,
      "difficultyRationale": "Requires basic application of algebraic formulas, function evaluation, or solving simple equations."
    },
    {
      "number": 7,
      "part": "A",
      "text": "Which expression results in an irrational number?",
      "choices": [
        "√3 · √3",
        "-⅔ + ¼",
        "5 · √81",
        "⅓ + √3"
      ],
      "topic": "Number Theory",
      "correct": 3,
      "explanation": "√3 · √3 = 3, −⅔ + ¼, and 5 · √81 = 45 are all rational; only ⅓ + √3 (rational plus irrational) is irrational.",
      "diveDeep": "A rational plus an irrational is always irrational, while products like √3 · √3 = 3 and √5 · √81 = 9√5... note √81 = 9 is rational but √5 is irrational, so check carefully. Sums and products of two rationals (like ¼ + ⅔) stay rational. The key rule: rational ± irrational = irrational. Watch for perfect-square radicals (√81 = 9) that quietly simplify to rational numbers.",
      "subTopic": "Solving Equations & Inequalities",
      "difficulty": 2,
      "difficultyRationale": "Requires basic application of algebraic formulas, function evaluation, or solving simple equations."
    },
    {
      "number": 8,
      "part": "A",
      "text": "Which equation has the same solutions as x² + 6x − 18 = 0?",
      "choices": [
        "(x + 3)² = 24",
        "(x + 6)² = 24",
        "(x + 3)² = 27",
        "(x + 6)² = 27"
      ],
      "topic": "Quadratic Functions",
      "correct": 2,
      "explanation": "Completing the square: x² + 6x = 18, then add (6/2)² = 9 to both sides so x² + 6x + 9 = 18 + 9 = 27, giving (x + 3)² = 27.",
      "diveDeep": "To complete the square on x² + bx, take half of b, square it, and add to both sides. Here half of 6 is 3, and 3² = 9, so the left side becomes (x + 3)² and the right side becomes 18 + 9 = 27. The binomial is always (x + b/2), so the correct form is (x + 3)² = 27. A common error is using (x + 6) instead of (x + 3) or forgetting to add 9 to the right side.",
      "subTopic": "Quadratic Models",
      "difficulty": 2,
      "difficultyRationale": "Requires basic application of algebraic formulas, function evaluation, or solving simple equations."
    },
    {
      "number": 9,
      "part": "A",
      "text": "The heights, in inches, of eight football players are given below: 76, 70, 72, 70, 69, 71, 78, 74. Which box plot represents these data?",
      "choices": [
        "",
        "",
        "",
        "65  70  75  80  85"
      ],
      "topic": "Statistics & Probability",
      "correct": 2,
      "image": "/images/exams/alg1-august-2024/q9.png",
      "explanation": "Ordering the data (69, 70, 70, 71, 72, 74, 76, 78) gives minimum 69, Q1 = 70, median 71.5, Q3 = 75, maximum 78, which matches the box plot in choice (3).",
      "diveDeep": "To build a box plot, first sort the data, then find the five-number summary: minimum, first quartile (Q1, median of lower half), median, third quartile (Q3, median of upper half), and maximum. With 8 values the median is the average of the 4th and 5th values (71 and 72 → 71.5). Match each of these five marks to the whiskers and box edges; a wrong choice usually has a misplaced quartile or median line.",
      "skill": "graphing",
      "subTopic": "Data & Distributions",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 10,
      "part": "A",
      "text": "A bookstore owner recorded the number of books sold and the profit made selling the books. (100 books, $50.00), (250 books, $275.00), (300 books, $350.00), (350 books, $425.00). What is the average rate of change, in dollars per book, between 100 and 350 books sold?",
      "choices": [
        "0.50",
        "1.50",
        "0.67",
        "2.00"
      ],
      "topic": "Linear Equations & Inequalities",
      "correct": 2,
      "image": "/images/exams/alg1-august-2024/q10.png",
      "explanation": "Average rate of change = (425 − 50) / (350 − 100) = 375 / 250 = 1.50 dollars per book.",
      "diveDeep": "The average rate of change between two points is the slope: (change in output) / (change in input). Use only the endpoints of the interval (100, $50) and (350, $425), not the values in between. Compute Δprofit ÷ Δbooks = 375 ÷ 250 = 1.5. A common mistake is to use intermediate data points or to invert the fraction (books over dollars).",
      "skill": "modeling",
      "subTopic": "Linear Functions & Graphing",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 11,
      "part": "A",
      "text": "If f(x) = x², then which function represents a shift of the graph of f(x) 4 units to the right and 3 units down?",
      "choices": [
        "g(x) = (x + 4)² + 3",
        "h(x) = (x − 4)² − 3",
        "j(x) = (x + 4)² − 3",
        "k(x) = (x − 4)² + 3"
      ],
      "topic": "Functions & Relations",
      "correct": 1,
      "explanation": "A shift 4 units right replaces x with (x − 4) and a shift 3 units down subtracts 3, giving h(x) = (x − 4)² − 3.",
      "diveDeep": "For transformations of f(x) = x², horizontal shifts go inside the parentheses and are counterintuitive: right by h means (x − h), left by h means (x + h). Vertical shifts go outside: up by k adds k, down by k subtracts k. So \"4 right, 3 down\" = (x − 4)² − 3. The most common error is flipping the horizontal sign (writing x + 4 for a right shift).",
      "skill": "graphing",
      "subTopic": "Function Notation",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 12,
      "part": "A",
      "text": "The amount of money a plumber charges is represented by the function p(h) = 45 + 90h. The best interpretation of the y-intercept of this function is that the plumber charges",
      "choices": [
        "$45 to come to the house",
        "$45 per hour that he works",
        "$90 to come to the house",
        "$90 per hour that he works"
      ],
      "topic": "Linear Equations & Inequalities",
      "correct": 0,
      "explanation": "The y-intercept is the value when h = 0, which is $45 — a flat fee charged just to show up, before any hours are worked.",
      "diveDeep": "In a linear model y = b + mx, the y-intercept b is the starting/fixed value (here a flat $45 service charge at 0 hours) and the slope m is the rate per unit (here $90 per hour). Plug in h = 0 to isolate the intercept’s meaning. Don’t confuse the intercept (one-time fee) with the slope (hourly rate); the per-hour interpretation describes the 90h term, not the 45.",
      "skill": "modeling",
      "subTopic": "Linear Functions & Graphing",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 13,
      "part": "A",
      "text": "What is the solution to the inequality 2m − 4 ≤ 3(2m + 4)?",
      "choices": [
        "m ≤ −2",
        "m ≤ −4",
        "m ≥ −2",
        "m ≥ −4"
      ],
      "topic": "Linear Equations & Inequalities",
      "correct": 3,
      "explanation": "Distributing gives 2m − 4 ≤ 6m + 12; subtracting 6m gives −4m − 4 ≤ 12, then −4m ≤ 16, and dividing by −4 (flipping the sign) gives m ≥ −4.",
      "diveDeep": "Solve inequalities like equations but remember the critical rule: when you multiply or divide both sides by a negative number, you must reverse the inequality symbol. After distributing and collecting terms you reach −4m ≤ 16; dividing by −4 flips ≤ to ≥, giving m ≥ −4. Forgetting to flip the sign is the single most common error on these problems.",
      "subTopic": "Solving Equations & Inequalities",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 14,
      "part": "A",
      "text": "A survey of students at West High School was taken to determine a theme for the prom. Results: Girls — Beach Party 86, Hollywood 112, Broadway 68. Boys — Beach Party 123, Hollywood 77, Broadway 79. Approximately what percentage of the students who chose the Broadway theme were girls?",
      "choices": [
        "16",
        "46",
        "47",
        "68"
      ],
      "topic": "Statistics & Probability",
      "correct": 2,
      "image": "/images/exams/alg1-august-2024/q14.png",
      "explanation": "Total Broadway = 68 girls + 79 boys = 147; girls are 68/147 ≈ 0.463 ≈ 46%... rounding gives about 46–47%, and 68/147 = 46.3% rounds to 46%.",
      "diveDeep": "This is a conditional percentage from a two-way table: \"percentage of Broadway choosers who were girls\" means girls who chose Broadway divided by the TOTAL who chose Broadway. The denominator is the column total (68 + 79 = 147), not the grand total of all students. Compute 68 ÷ 147 ≈ 46.3%. A common mistake is dividing by the wrong total (all girls, or all students) instead of the Broadway column.",
      "subTopic": "Data & Distributions",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 15,
      "part": "A",
      "text": "The sum of √54 and √6 is",
      "choices": [
        "√60",
        "√48",
        "√324",
        "4√6"
      ],
      "topic": "Number Theory",
      "correct": 3,
      "explanation": "Since √54 = √(9·6) = 3√6, the sum is 3√6 + √6 = 4√6.",
      "diveDeep": "To add radicals you must first simplify each so they share the same radicand (the number under the root), then add the coefficients like terms. √54 simplifies because 54 = 9 · 6 and 9 is a perfect square, giving 3√6. Then 3√6 + 1√6 = 4√6. You cannot simply add the numbers under the roots (√54 + √6 ≠ √60); always simplify and look for matching radicands first.",
      "subTopic": "Solving Equations & Inequalities",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 16,
      "part": "A",
      "text": "The functions f(x) = x² − 5x − 14 and g(x) = x − 14 are graphed on the same set of axes. What are the solutions to the equation f(x) = g(x)?",
      "choices": [
        "−14 and 0",
        "−2 and 8",
        "0 and 6",
        "−2 and 7"
      ],
      "topic": "Functions & Relations",
      "correct": 2,
      "explanation": "Setting x² − 5x − 14 = x − 14 gives x² − 6x = 0, so x(x − 6) = 0 and the solutions are x = 0 and x = 6.",
      "diveDeep": "The solutions to f(x) = g(x) are the x-values where the two graphs intersect, found algebraically by setting the expressions equal and solving. Here subtracting g(x) from both sides cancels the −14 and gives x² − 6x = 0; factor out x to get x(x − 6) = 0. Be sure to set the equation to zero and factor rather than guessing; the two roots are x = 0 and x = 6.",
      "skill": "graphing",
      "subTopic": "Function Notation",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 17,
      "part": "A",
      "text": "If x = 4a² − a + 3 and y = a − 5, then which polynomial is equivalent to the product of x and y?",
      "choices": [
        "−17a² − 2a − 15",
        "4a³ − 21a² − 2a − 15",
        "−17a² + 8a − 15",
        "4a³ − 21a² + 8a − 15"
      ],
      "topic": "Polynomials & Factoring",
      "correct": 3,
      "explanation": "Multiplying (4a² − a + 3)(a − 5) = 4a³ − 20a² − a² + 5a + 3a − 15 = 4a³ − 21a² + 8a − 15.",
      "diveDeep": "To multiply a trinomial by a binomial, distribute each term of the binomial across the trinomial and combine like terms. Multiply a by each term (4a³ − a² + 3a), then −5 by each term (−20a² + 5a − 15), then add. Stay organized by aligning powers: a³ term (4a³), a² terms (−1 − 20 = −21), a terms (3 + 5 = 8), constant (−15). Sign errors on the −5 distribution are the usual pitfall.",
      "subTopic": "Polynomial Operations",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 18,
      "part": "A",
      "text": "What is an equation of the line that passes through (3, 7) and has a slope of 2?",
      "choices": [
        "y − 7 = 2(x − 3)",
        "y + 7 = 2(x + 3)",
        "y − 3 = 2(x − 7)",
        "y + 3 = 2(x + 7)"
      ],
      "topic": "Linear Equations & Inequalities",
      "correct": 0,
      "explanation": "Point-slope form y − y₁ = m(x − x₁) with point (3, 7) and slope 2 gives y − 7 = 2(x − 3).",
      "diveDeep": "Point-slope form is y − y₁ = m(x − x₁), where (x₁, y₁) is the given point and m is the slope. Substitute carefully: the y-coordinate 7 and x-coordinate 3 are subtracted, giving y − 7 = 2(x − 3). A frequent error is swapping the coordinates (putting x in the y-spot) or getting the subtraction signs wrong; the point’s values are always subtracted, not added.",
      "subTopic": "Linear Functions & Graphing",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 19,
      "part": "A",
      "text": "A geometric sequence with a common ratio of 3 is",
      "choices": [
        "−10, −7, −4, −1, ...",
        "−2, −6, −18, −54, ...",
        "14, 11, 8, 5, ...",
        "4, −12, 36, −108, ..."
      ],
      "topic": "Sequences",
      "correct": 1,
      "explanation": "In −2, −6, −18, −54, each term is the previous term times 3 (−2·3 = −6, −6·3 = −18), so the common ratio is 3.",
      "diveDeep": "A geometric sequence multiplies by a constant ratio r each step (rₙ = tₙ₊₁ / tₙ), while an arithmetic sequence adds a constant difference. To find r, divide any term by the one before it; −6 / −2 = 3 consistently. Sequences that change by adding (like −10, −7, −4) are arithmetic, and a ratio of 3 must be positive 3, not −3, so the alternating-sign sequence (4, −12, 36) has ratio −3, not 3.",
      "subTopic": "Geometric Sequences",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 20,
      "part": "A",
      "text": "When the equation 6 − ax = ax − 2 is solved for x in terms of a, and a ≠ 0, the result is",
      "choices": [
        "x = 4a",
        "x = 4/(2a)",
        "x = 4/a",
        "x = 2/a"
      ],
      "topic": "Linear Equations & Inequalities",
      "correct": 2,
      "explanation": "Adding ax to both sides: 6 = 2ax − 2, then 8 = 2ax, so x = 8/(2a) = 4/a.",
      "diveDeep": "Treat a as a constant and isolate x as usual. Collect the ax terms on one side (6 = 2ax − 2), move constants (8 = 2ax), then divide both sides by the coefficient of x, which is 2a, giving x = 8/(2a) = 4/a. The key step is recognizing 2ax as a single term with coefficient 2a; divide by the entire coefficient, not just a, and simplify the fraction.",
      "subTopic": "Solving Equations & Inequalities",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 21,
      "part": "A",
      "text": "Which function has the zeros −1, 3, and −4?",
      "choices": [
        "f(x) = (x + 1)(x − 3)(x − 4)",
        "g(x) = (x − 1)(x + 3)(x − 4)",
        "h(x) = (x + 1)(x − 3)(x + 4)",
        "k(x) = (x − 1)(x + 3)(x + 4)"
      ],
      "topic": "Functions & Relations",
      "correct": 2,
      "explanation": "Each zero r corresponds to a factor (x − r): zero −1 gives (x + 1), zero 3 gives (x − 3), zero −4 gives (x + 4), so h(x) = (x + 1)(x − 3)(x + 4).",
      "diveDeep": "A polynomial’s zeros (x-intercepts) are the values that make each factor equal zero. For a zero of r, the factor is (x − r), so a zero of −1 becomes (x − (−1)) = (x + 1) and a zero of −4 becomes (x + 4). Notice the sign flips: a negative zero produces a plus inside the factor. Set each factor to 0 and solve to verify you recover the listed zeros.",
      "subTopic": "Relations & Functions",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 22,
      "part": "A",
      "text": "The expression 5^(a + 2b) is equivalent to",
      "choices": [
        "5^a · 5² · 5^b",
        "5^a · 25^b",
        "5^a · 2 · 5^b",
        "5^a + 25^b"
      ],
      "topic": "Polynomials & Factoring",
      "correct": 1,
      "explanation": "Using the product rule for exponents, 5^(a + 2b) = 5^a · 5^(2b) = 5^a · (5²)^b = 5^a · 25^b.",
      "diveDeep": "The product rule for exponents states x^(m+n) = x^m · x^n, so the exponent a + 2b splits into 5^a · 5^(2b). Then the power-of-a-power rule gives 5^(2b) = (5²)^b = 25^b. The result is 5^a · 25^b. Be careful: 5^(2b) is NOT 5² · 5^b unless the exponent were 2 + b; the 2b is a single product in the exponent, so it becomes (5²)^b.",
      "subTopic": "Polynomial Operations",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 23,
      "part": "A",
      "text": "In an arithmetic sequence, the first term is 4 and the third term is 22. What is the common difference?",
      "choices": [
        "1",
        "3",
        "9",
        "6"
      ],
      "topic": "Sequences",
      "correct": 2,
      "explanation": "The third term equals the first term plus two common differences: 4 + 2d = 22, so 2d = 18 and d = 9.",
      "diveDeep": "In an arithmetic sequence the nth term is a₁ + (n − 1)d. The third term is a₁ + 2d, so set 4 + 2d = 22, giving 2d = 18 and d = 9. The common difference is the constant amount added each step, and going from term 1 to term 3 spans TWO steps, so you divide the total change (22 − 4 = 18) by 2, not by 3. Dividing by the wrong number of steps is the typical mistake.",
      "subTopic": "Arithmetic Sequences",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 24,
      "part": "A",
      "text": "Joe is ordering water for his swimming pool. He determines the volume of his pool to be about 3240 cubic feet. There are approximately 7.5 gallons of water in 1 cubic foot. A truck load holds 6000 gallons of water. Which expression would allow Joe to correctly calculate the number of truck loads of water he needs to fill his pool?",
      "choices": [
        "(3240 ft³ / 1) · (1 ft³ / 7.5 gal) · (1 truck load / 6000 gal)",
        "(3240 ft³ / 1) · (7.5 gal / 1 ft³) · (6000 gal / 1 truck load)",
        "(3240 ft³ / 1) · (1 ft³ / 7.5 gal) · (6000 gal / 1 truck load)",
        "(3240 ft³ / 1) · (7.5 gal / 1 ft³) · (1 truck load / 6000 gal)"
      ],
      "topic": "General",
      "correct": 3,
      "explanation": "Using dimensional analysis, ft³ × (gal/ft³) cancels to gallons, then × (truck load/gal) cancels to truck loads: 3240 · 7.5 · (1/6000) ≈ 4.05 truck loads.",
      "diveDeep": "Dimensional analysis (unit conversion by chaining fractions) requires placing each conversion factor so unwanted units cancel diagonally. Start with ft³, multiply by (7.5 gal / 1 ft³) so ft³ cancels and you have gallons, then multiply by (1 truck load / 6000 gal) so gallons cancel and you are left with truck loads. The correct setup keeps the target unit (truck loads) in the numerator at the end; flipping any factor leaves you with the wrong units.",
      "skill": "modeling",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 25,
      "part": "B",
      "type": "written",
      "text": "Solve the equation 2x² − 5x − 3 = 0 algebraically.",
      "topic": "Quadratic Functions",
      "explanation": "Factor the quadratic as (2x + 1)(x − 3) = 0, giving x = −½ and x = 3.",
      "diveDeep": "For ax² + bx + c with a ≠ 1, you can factor by grouping (find two numbers that multiply to a·c = −6 and add to b = −5: those are −6 and +1) or use the quadratic formula. Factoring 2x² − 6x + x − 3 = 2x(x − 3) + 1(x − 3) = (2x + 1)(x − 3). Set each factor to zero. Always show algebraic work, not just a graph, since the question says \"algebraically.\"",
      "modelAnswer": "2x² − 5x − 3 = 0\nFactor by grouping: 2x² − 6x + x − 3 = 0\n2x(x − 3) + 1(x − 3) = 0\n(2x + 1)(x − 3) = 0\nSet each factor equal to zero:\n2x + 1 = 0  →  x = −½\nx − 3 = 0  →  x = 3\nThe solutions are x = −½ and x = 3.",
      "skill": "procedure",
      "subTopic": "Solving Quadratics",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Part II constructed-response requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 26,
      "part": "B",
      "type": "written",
      "text": "Graph the function f(x) = |x − 2| + 1 on the set of axes provided over the interval −2 ≤ x ≤ 6.",
      "topic": "Functions & Relations",
      "explanation": "The graph is a V-shaped absolute-value function with its vertex at (2, 1), opening upward with slopes of −1 (left branch) and +1 (right branch).",
      "diveDeep": "The parent function |x| has a vertex at the origin and a V shape. The form |x − h| + k shifts the vertex to (h, k); here (2, 1). Build a table of values across the given domain (e.g., x = −2 gives 5, x = 2 gives 1, x = 6 gives 5) and plot points symmetric about the vertex. The arms have slope ±1. Always plot the vertex first, then a couple of points on each side.",
      "modelAnswer": "Vertex at (2, 1). Table of values: (−2, 5), (0, 3), (2, 1), (4, 3), (6, 5). Plot these points and connect with two straight rays forming a V that opens upward, with the vertex at (2, 1). The left branch goes up-left with slope −1 and the right branch goes up-right with slope +1.",
      "skill": "graphing",
      "subTopic": "Function Notation",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Part II constructed-response requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 27,
      "part": "B",
      "type": "written",
      "text": "A study compared the number of hours of sleep students get and their test scores. State whether the correlation coefficient r = 0.92 indicates a weak, moderate, or strong correlation, and explain what this means in the context of the data.",
      "topic": "Statistics & Probability",
      "explanation": "An r-value of 0.92 indicates a strong positive correlation, meaning more hours of sleep are strongly associated with higher test scores.",
      "diveDeep": "The correlation coefficient r ranges from −1 to 1; values near ±1 indicate strong linear relationships, near ±0.5 moderate, and near 0 weak. The sign tells direction: positive means both variables increase together. Remember correlation does not prove causation — a strong r shows association, not that sleep directly causes higher scores. When interpreting in context, name both the strength and the direction.",
      "modelAnswer": "An r-value of 0.92 indicates a strong positive correlation. This means that as the number of hours of sleep students get increases, their test scores tend to increase as well, and the data points fall close to a straight line. (Note: this association does not by itself prove that more sleep causes higher scores.)",
      "skill": "reasoning",
      "subTopic": "Scatter Plots & Correlation",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Part II constructed-response requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 28,
      "part": "B",
      "type": "written",
      "text": "Determine algebraically the zeros of the function g(x) = x² − 7x + 10.",
      "topic": "Quadratic Functions",
      "explanation": "Factoring gives (x − 2)(x − 5) = 0, so the zeros are x = 2 and x = 5.",
      "diveDeep": "The zeros of a function are the x-values where g(x) = 0. Factor the quadratic by finding two numbers that multiply to +10 and add to −7: those are −2 and −5. Set each factor to zero and solve. \"Algebraically\" means you must factor or use the quadratic formula and show work rather than reading values off a graph.",
      "modelAnswer": "Set g(x) = 0:  x² − 7x + 10 = 0\nFactor: (x − 2)(x − 5) = 0\nx − 2 = 0  →  x = 2\nx − 5 = 0  →  x = 5\nThe zeros of g(x) are x = 2 and x = 5.",
      "subTopic": "Solving Quadratics",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Part II constructed-response requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 29,
      "part": "B",
      "type": "written",
      "text": "The table shows the value of a car over time. Year 0: $24,000; Year 1: $20,400; Year 2: $17,340. Write an exponential function V(t) that models the value of the car after t years.",
      "topic": "Functions & Relations",
      "explanation": "The value multiplies by 20,400/24,000 = 0.85 each year, so V(t) = 24,000(0.85)ᵗ.",
      "diveDeep": "An exponential model has the form V(t) = a · bᵗ, where a is the initial value (t = 0) and b is the constant multiplier per period. Find b by dividing any term by the previous one (20,400 ÷ 24,000 = 0.85), and confirm it stays constant (17,340 ÷ 20,400 = 0.85). A multiplier of 0.85 means a 15% annual decrease (depreciation). Always verify the ratio is constant before using an exponential model.",
      "modelAnswer": "Initial value a = 24,000 (value at t = 0).\nCommon ratio b = 20,400 ÷ 24,000 = 0.85 (confirmed: 17,340 ÷ 20,400 = 0.85).\nExponential function: V(t) = 24,000(0.85)ᵗ\nThis represents a 15% annual depreciation in the car’s value.",
      "skill": "modeling",
      "subTopic": "Relations & Functions",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Part II constructed-response requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 30,
      "part": "B",
      "type": "written",
      "text": "Solve the following system of equations algebraically: y = x² − 2x − 3 and y = 2x − 3.",
      "topic": "Quadratic Functions",
      "explanation": "Setting x² − 2x − 3 = 2x − 3 gives x² − 4x = 0, so x = 0 (y = −3) and x = 4 (y = 5).",
      "diveDeep": "To solve a linear-quadratic system algebraically, substitute one equation into the other. Since both equal y, set them equal: x² − 2x − 3 = 2x − 3. Move all terms to one side (x² − 4x = 0), factor (x(x − 4) = 0), and solve for x. Then substitute each x back into the simpler linear equation to find y. Always state your answers as ordered pairs (x, y).",
      "modelAnswer": "Set the equations equal: x² − 2x − 3 = 2x − 3\nx² − 4x = 0\nx(x − 4) = 0\nx = 0  or  x = 4\nSubstitute into y = 2x − 3:\nWhen x = 0: y = 2(0) − 3 = −3  →  (0, −3)\nWhen x = 4: y = 2(4) − 3 = 5  →  (4, 5)\nThe solutions are (0, −3) and (4, 5).",
      "skill": "procedure",
      "subTopic": "Solving Quadratics",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Part II constructed-response requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 31,
      "part": "B",
      "type": "written",
      "text": "The first term of a sequence is 5, and each term after the first is found by multiplying the previous term by 3 and then subtracting 2. Find the first four terms of this sequence.",
      "topic": "Sequences",
      "explanation": "Applying tₙ = 3tₙ₋₁ − 2 repeatedly from 5 gives 5, 13, 37, 109.",
      "diveDeep": "This is a recursive sequence: each term depends on the one before it via the rule tₙ = 3·tₙ₋₁ − 2. Start with the given first term and apply the rule step by step, using your last answer as the input each time. Follow order of operations: multiply by 3 first, then subtract 2. Keep your work organized so an arithmetic slip in an early term doesn’t propagate through the rest.",
      "modelAnswer": "t₁ = 5\nt₂ = 3(5) − 2 = 15 − 2 = 13\nt₃ = 3(13) − 2 = 39 − 2 = 37\nt₄ = 3(37) − 2 = 111 − 2 = 109\nThe first four terms are 5, 13, 37, and 109.",
      "subTopic": "Arithmetic Sequences",
      "difficulty": 3,
      "difficultyRationale": "Requires solving a literal equation for a specified variable in terms of others."
    },
    {
      "number": 32,
      "part": "B",
      "type": "written",
      "text": "Express the product of (3x − 4) and (2x + 5) as a trinomial in standard form.",
      "topic": "Polynomials & Factoring",
      "explanation": "Multiplying using FOIL: 6x² + 15x − 8x − 20 = 6x² + 7x − 20.",
      "diveDeep": "To multiply two binomials, use FOIL (First, Outer, Inner, Last): First 3x·2x = 6x², Outer 3x·5 = 15x, Inner −4·2x = −8x, Last −4·5 = −20. Combine the two middle (Outer + Inner) terms: 15x − 8x = 7x. Standard form lists terms from highest to lowest degree. Watch signs carefully on the Inner and Last products.",
      "modelAnswer": "(3x − 4)(2x + 5)\nFirst: 3x · 2x = 6x²\nOuter: 3x · 5 = 15x\nInner: −4 · 2x = −8x\nLast: −4 · 5 = −20\nCombine: 6x² + 15x − 8x − 20 = 6x² + 7x − 20\nThe product is 6x² + 7x − 20.",
      "skill": "procedure",
      "subTopic": "Factoring",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Part II constructed-response requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 33,
      "part": "C",
      "type": "written",
      "text": "A rectangular garden has a length that is 3 feet more than twice its width. The area of the garden is 65 square feet. Determine the dimensions of the garden algebraically.",
      "topic": "Quadratic Functions",
      "explanation": "Let width = w; then length = 2w + 3 and w(2w + 3) = 65, giving 2w² + 3w − 65 = 0, which factors to (2w + 13)(w − 5) = 0, so w = 5 ft and length = 13 ft.",
      "diveDeep": "Model word problems by defining a variable for the unknown described in terms of itself (width), then write the second quantity (length) in terms of it. Area = length × width gives a quadratic equation; set it equal to zero and factor or use the quadratic formula. Reject any negative solution because a length cannot be negative — here w = −6.5 is discarded. Always state both dimensions with units and check that length × width equals the given area.",
      "modelAnswer": "Let w = width. Then length = 2w + 3.\nArea = length × width:\nw(2w + 3) = 65\n2w² + 3w − 65 = 0\nFactor: (2w + 13)(w − 5) = 0\nw = −13/2 (rejected, width cannot be negative) or w = 5\nWidth = 5 feet, Length = 2(5) + 3 = 13 feet.\nCheck: 5 × 13 = 65 ft². The garden is 5 feet by 13 feet.",
      "subTopic": "Quadratic Models",
      "difficulty": 4,
      "difficultyRationale": "Standard Regents Part III constructed-response requiring multi-step modeling, graphing, and algebraic justification."
    },
    {
      "number": 34,
      "part": "C",
      "type": "written",
      "text": "Two cell phone plans are being compared. Plan A charges a $30 monthly fee plus $0.10 per minute. Plan B charges a $50 monthly fee plus $0.05 per minute. Write a system of equations and determine the number of minutes for which the two plans cost the same.",
      "topic": "Linear Equations & Inequalities",
      "explanation": "With A = 30 + 0.10m and B = 50 + 0.05m, setting them equal gives 0.05m = 20, so m = 400 minutes.",
      "diveDeep": "Set up a cost equation for each plan as cost = fixed fee + (rate)(minutes). The plans cost the same where the two equations are equal, so set them equal and solve for the variable (minutes). Subtract to collect the minute terms on one side and constants on the other. Interpreting the result: below 400 minutes Plan A is cheaper, above 400 minutes Plan B is cheaper. Always answer the actual question (minutes where costs are equal) with units.",
      "modelAnswer": "Let m = number of minutes.\nPlan A: A = 30 + 0.10m\nPlan B: B = 50 + 0.05m\nSet equal: 30 + 0.10m = 50 + 0.05m\n0.10m − 0.05m = 50 − 30\n0.05m = 20\nm = 400\nThe two plans cost the same at 400 minutes (each costing $70).",
      "skill": "modeling",
      "subTopic": "Solving Equations & Inequalities",
      "difficulty": 4,
      "difficultyRationale": "Requires graphing a system of linear inequalities, shading the solution region, and algebraically/graphically verifying a solution point."
    },
    {
      "number": 35,
      "part": "C",
      "type": "written",
      "text": "The function h(t) = −16t² + 64t + 80 models the height, in feet, of a ball t seconds after it is thrown. Determine the maximum height of the ball and the time at which it occurs. Then determine, to the nearest tenth of a second, when the ball hits the ground.",
      "topic": "Quadratic Functions",
      "explanation": "The vertex occurs at t = −64/(2·−16) = 2 s, where h(2) = 144 ft; the ball hits the ground when h(t) = 0, at t = 5 s.",
      "diveDeep": "For a quadratic h(t) = at² + bt + c, the maximum (when a < 0) occurs at the vertex time t = −b/(2a); substitute that t back to get the maximum height. The ball hits the ground when height equals 0, so solve −16t² + 64t + 80 = 0 (divide by −16 to simplify to t² − 4t − 5 = 0, factor to (t − 5)(t + 1) = 0). Reject negative time. Label units (feet, seconds) and answer every part of the multi-part question.",
      "modelAnswer": "Maximum height occurs at the vertex:\nt = −b/(2a) = −64/(2·−16) = 2 seconds\nh(2) = −16(2)² + 64(2) + 80 = −64 + 128 + 80 = 144 feet\nMaximum height is 144 feet at t = 2 seconds.\n\nBall hits the ground when h(t) = 0:\n−16t² + 64t + 80 = 0\nDivide by −16: t² − 4t − 5 = 0\n(t − 5)(t + 1) = 0\nt = 5 or t = −1 (rejected)\nThe ball hits the ground at t = 5.0 seconds.",
      "skill": "modeling",
      "subTopic": "Graphing Parabolas",
      "difficulty": 4,
      "difficultyRationale": "Standard Regents Part III constructed-response requiring multi-step modeling, graphing, and algebraic justification."
    },
    {
      "number": 36,
      "part": "C",
      "type": "written",
      "text": "A scientist measures the population of bacteria in a culture. The population starts at 200 and increases by 25% each hour. Write a function P(t) modeling the population after t hours, and use it to determine the population after 5 hours, to the nearest whole number.",
      "topic": "Functions & Relations",
      "explanation": "P(t) = 200(1.25)ᵗ; after 5 hours P(5) = 200(1.25)⁵ ≈ 610.",
      "diveDeep": "Exponential growth uses P(t) = a(1 + r)ᵗ, where a is the initial amount and r is the growth rate as a decimal. A 25% increase means r = 0.25, so the multiplier (1 + r) = 1.25. Substitute t = 5 and evaluate 200 · 1.25⁵. Round only at the final step to avoid rounding error. Distinguish growth (1 + r) from decay (1 − r); here the population is increasing, so add.",
      "modelAnswer": "Initial population a = 200; growth rate r = 25% = 0.25, so multiplier = 1.25.\nP(t) = 200(1.25)ᵗ\nAfter 5 hours:\nP(5) = 200(1.25)⁵ = 200(3.0517578…) ≈ 610.35\nTo the nearest whole number, the population is 610 bacteria.",
      "skill": "modeling",
      "subTopic": "Relations & Functions",
      "difficulty": 4,
      "difficultyRationale": "Standard Regents Part III constructed-response requiring multi-step modeling, graphing, and algebraic justification."
    },
    {
      "number": 37,
      "part": "D",
      "type": "written",
      "text": "A company sells T-shirts. The revenue, in dollars, from selling the shirts is modeled by R(x) = −2x² + 120x, where x is the price per shirt in dollars. Determine the price that maximizes revenue and the maximum revenue. Then determine algebraically all prices for which the revenue is at least $1600. Explain what this interval means in the context of the problem.",
      "topic": "Quadratic Functions",
      "explanation": "Revenue is maximized at the vertex x = −120/(2·−2) = $30, giving R(30) = $1800; revenue is at least $1600 when −2x² + 120x ≥ 1600, i.e. 20 ≤ x ≤ 40.",
      "diveDeep": "A downward parabola R(x) = ax² + bx + c reaches its maximum at the vertex x = −b/(2a). For the \"at least\" condition, set up an inequality R(x) ≥ 1600, move everything to one side, factor, and find the boundary roots; the revenue stays at or above the target BETWEEN the roots because the parabola opens downward. Solve −2x² + 120x − 1600 ≥ 0, divide by −2 (flip the sign) to get x² − 60x + 800 ≤ 0, factor to (x − 20)(x − 40) ≤ 0, giving 20 ≤ x ≤ 40. Interpret in context: any price from $20 to $40 per shirt yields revenue of at least $1600.",
      "modelAnswer": "Maximum revenue (vertex):\nx = −b/(2a) = −120/(2·−2) = −120/−4 = $30\nR(30) = −2(30)² + 120(30) = −1800 + 3600 = $1800\nThe price that maximizes revenue is $30 per shirt, giving a maximum revenue of $1800.\n\nRevenue at least $1600:\n−2x² + 120x ≥ 1600\n−2x² + 120x − 1600 ≥ 0\nDivide by −2 (reverse inequality): x² − 60x + 800 ≤ 0\nFactor: (x − 20)(x − 40) ≤ 0\nSolution: 20 ≤ x ≤ 40\n\nInterpretation: The company earns revenue of at least $1600 when the price per shirt is between $20 and $40, inclusive.",
      "skill": "reasoning",
      "subTopic": "Graphing Parabolas",
      "difficulty": 5,
      "difficultyRationale": "Part IV constructed-response requiring multi-step mathematical modeling."
    }
  ]
}
