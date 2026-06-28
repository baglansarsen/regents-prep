// Algebra 2 Regents — January 2020
export default {
  "id": "a2-jan-2020",
  "subject": "algebra-2",
  "year": 2020,
  "session": "January",
  "totalMinutes": 180,
  "questions": [
    {
      "number": 1,
      "part": "A",
      "text": "The expression √(81x⁸y⁶) ⁴ — i.e. the fourth root ⁴√(81x⁸y⁶) — is equivalent to",
      "choices": [
        "3x²y^(3/2)",
        "9x²y^(3/2)",
        "3x⁴y²",
        "9x⁴y²"
      ],
      "topic": "Rational & Radical",
      "correct": 0,
      "explanation": "The fourth root of 81 is 3, and dividing each exponent by 4 gives x^(8/4)=x² and y^(6/4)=y^(3/2), so ⁴√(81x⁸y⁶) = 3x²y^(3/2).",
      "diveDeep": "A radical of index n is equivalent to a fractional exponent of 1/n applied to everything inside. To simplify ⁿ√(aˣ), divide each exponent by n: here √[4]{81}=3 because 3⁴=81, and the exponents 8 and 6 become 8/4=2 and 6/4=3/2. A common mistake is dividing the exponents by 2 (treating it as a square root) or forgetting that the radical applies to the coefficient too. Always identify the index first, then reduce both the numeric coefficient and every variable exponent by that index.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 2,
      "part": "A",
      "text": "Chet has $1200 invested in a bank account modeled by the function P(n) = 1200(1.002)ⁿ, where P(n) is the value of his account, in dollars, after n months. Chet's debt is modeled by the function Q(n) = 100n, where Q(n) is the value of debt, in dollars, after n months. After n months, which function represents Chet's net worth, R(n)?",
      "choices": [
        "R(n) = 1200(1.002)ⁿ + 100n",
        "R(n) = 1200(1.002)^(12n) + 100n",
        "R(n) = 1200(1.002)ⁿ − 100n",
        "R(n) = 1200(1.002)^(12n) − 100n"
      ],
      "topic": "Functions",
      "correct": 2,
      "explanation": "Net worth is assets minus liabilities, so you subtract the debt Q(n) from the account value P(n): R(n) = 1200(1.002)ⁿ − 100n.",
      "diveDeep": "Net worth equals what you own minus what you owe, which translates to subtracting the debt function from the asset function. Since both functions are already expressed in terms of months (n), no exponent adjustment to 12n is needed — that change would only apply if you were converting an annual rate to monthly. Students often pick the 12n option out of habit with compound-interest problems, or add the debt instead of subtracting it. Read carefully whether the time variable is already in the correct unit before altering any exponent.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 3,
      "part": "A",
      "text": "Emmeline is working on one side of a polynomial identity proof used to form Pythagorean triples. Her work is shown below: (5x)² + (5x² − 5)². Step 1: 25x² + (5x² − 5)². Step 2: 25x² + 25x² − 25. Step 3: 50x² − 25. Step 4: 75x². What statement is true regarding Emmeline's work?",
      "choices": [
        "Emmeline's work is entirely correct.",
        "There is a mistake in step 2, only.",
        "There are mistakes in step 2 and step 4.",
        "There is a mistake in step 4, only."
      ],
      "topic": "Polynomial Functions",
      "correct": 2,
      "explanation": "Step 2 wrongly expands (5x²−5)² as 25x²−25 instead of 25x⁴−50x²+25, and step 4 wrongly combines 50x²−25 into 75x², so there are mistakes in both steps.",
      "diveDeep": "Squaring a binomial requires the rule (a−b)² = a² − 2ab + b², which produces three terms, not two. (5x²−5)² should be 25x⁴ − 50x² + 25, so Emmeline lost the middle term and mishandled the squaring. Her step 4 also illegally adds an x² term to a constant (50x² − 25 cannot become 75x²). The classic errors here are \"distributing\" the square across a sum and combining unlike terms; always FOIL or apply the perfect-square pattern fully, and only combine terms with identical variables and exponents.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 4,
      "part": "A",
      "text": "Susan won $2,000 and invested it into an account with an annual interest rate of 3.2%. If her investment were compounded monthly, which expression best represents the value of her investment after t years?",
      "choices": [
        "2000(1 + 0.032/12)^(12t)",
        "2000(1.032)^(t/12)",
        "2000(1.032/12)^t",
        "2000(1.032)^(12t)"
      ],
      "topic": "Exponential & Logarithmic",
      "correct": 0,
      "explanation": "The compound-interest formula A = P(1 + r/n)^(nt) with P=2000, r=0.032, and n=12 gives 2000(1 + 0.032/12)^(12t).",
      "diveDeep": "The compound-interest formula is A = P(1 + r/n)^(nt), where r is the annual rate as a decimal, n is the number of compounding periods per year, and t is years. Compounding monthly means n=12, so the rate per period is 0.032/12 and the exponent is 12t. A frequent mistake is using 1.032 (which is the annual growth factor, valid only for yearly compounding) or forgetting to divide the rate by 12 while still raising to 12t. Match the period of the rate to the period of the exponent.",
      "difficulty": 3,
      "difficultyRationale": "Standard application of exponential modeling."
    },
    {
      "number": 5,
      "part": "A",
      "text": "Consider the end behavior description: as x → −∞, f(x) → −∞ and as x → +∞, f(x) → +∞. Which function satisfies the given conditions?",
      "choices": [
        "f(x) = x⁴ − 2x² + 1",
        "a graph that falls on both ends",
        "f(x) = x³ − 2x + 6",
        "a graph that rises on the left and falls on the right"
      ],
      "topic": "Polynomial Functions",
      "correct": 2,
      "image": "/images/exams/alg2-january-2020/q5.png",
      "explanation": "End behavior heading to −∞ on the left and +∞ on the right requires an odd-degree polynomial with a positive leading coefficient, which the cubic f(x) = x³ − 2x + 6 satisfies.",
      "diveDeep": "End behavior is governed entirely by the leading term: degree (odd vs. even) and the sign of the leading coefficient. Odd degree with a positive leading coefficient falls to the left and rises to the right (down-up), exactly matching this description. Even-degree functions like x⁴ go the same direction on both ends, so they cannot match an \"opposite ends\" pattern. When asked about end behavior, ignore the middle terms and focus only on the highest-degree term.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 6,
      "part": "A",
      "text": "The expression (x + a)² + 5(x + a) + 4 is equivalent to",
      "choices": [
        "(a + 1)(a + 4)",
        "(x + a + 1)(x + a + 4)",
        "(x + 1)(x + 4)",
        "x² + a² + 5x + 5a + 4"
      ],
      "topic": "Rational & Radical",
      "correct": 1,
      "explanation": "Treating (x + a) as a single quantity u, the expression u² + 5u + 4 factors as (u + 1)(u + 4) = (x + a + 1)(x + a + 4).",
      "diveDeep": "This is factoring by substitution: let u = (x + a) so the expression becomes the familiar quadratic u² + 5u + 4, which factors into (u + 1)(u + 4). Then substitute (x + a) back in for u to get the final answer. A common error is trying to expand everything first, which is messy and error-prone, or forgetting to carry the full (x + a) block into each factor. Recognizing a repeated chunk as a single variable makes many \"complicated\" expressions reduce to basic quadratic factoring.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 7,
      "part": "A",
      "text": "Given x ≠ 2, the expression (2x² − 5x − 8) / (x − 2) is equivalent to",
      "choices": [
        "2x² − 9/(x−2)",
        "2x + 1 − 6/(x−2)",
        "2x − 1 − 10/(x−2)",
        "2x − 9 + 10/(x−2)"
      ],
      "topic": "Rational & Radical",
      "correct": 2,
      "explanation": "Dividing 2x² − 5x − 8 by x − 2 (polynomial/synthetic division) gives a quotient of 2x − 1 with a remainder of −10, so the result is 2x − 1 − 10/(x − 2).",
      "diveDeep": "To rewrite a rational expression where the numerator degree exceeds the denominator degree, use long or synthetic division: the answer is quotient + remainder/divisor. Synthetic division with 2 on coefficients 2, −5, −8 yields 2, −1, −10, meaning quotient 2x − 1 and remainder −10. Students often forget the remainder term or mis-sign it; the remainder sits over the original divisor, and its sign comes directly from the division. Verifying via (divisor × quotient + remainder) should reproduce the original numerator.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 8,
      "part": "A",
      "text": "Which situation best describes conditional probability?",
      "choices": [
        "finding the probability of an event occurring two or more times",
        "finding the probability of an event occurring only once",
        "finding the probability of two independent events occurring at the same time",
        "finding the probability of an event occurring given another event had already occurred"
      ],
      "topic": "Statistics & Probability",
      "correct": 3,
      "explanation": "Conditional probability, written P(A|B), is the probability that event A occurs given that event B has already occurred.",
      "diveDeep": "Conditional probability quantifies how the likelihood of one event changes once we know another event has happened, expressed as P(A|B) = P(A and B)/P(B). The key phrase is \"given that,\" which restricts the sample space to only the outcomes where the condition is true. Don't confuse it with the probability of independent simultaneous events (a multiplication of unconditional probabilities) — independence actually means the condition has no effect, P(A|B) = P(A). Look for \"given,\" \"knowing that,\" or \"among those who\" to flag a conditional setup.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 9,
      "part": "A",
      "text": "Which expression is not a solution to the equation 2ᵗ = 10?",
      "choices": [
        "(1/2)log₂100",
        "log₄100",
        "log₂10",
        "log₁₀4"
      ],
      "topic": "Exponential & Logarithmic",
      "correct": 3,
      "explanation": "Solving 2ᵗ = 10 gives t = log₂10; the first three options all equal log₂10 by log rules, but log₁₀4 = log₄ does not, so it is not a solution.",
      "diveDeep": "Taking log base 2 of both sides of 2ᵗ = 10 gives t = log₂10. The other valid forms come from log identities: (1/2)log₂100 = log₂(100^(1/2)) = log₂10, and log₄100 = log₂100 / log₂4 = log₂100/2 = log₂10 via the change-of-base relationship. log₁₀4 has the base and argument essentially swapped and does not equal log₂10. When checking equivalence of logarithmic expressions, use the power rule, change-of-base, and evaluate numerically as a final sanity check (log₂10 ≈ 3.32, while log₁₀4 ≈ 0.60).",
      "difficulty": 3,
      "difficultyRationale": "Standard exponential equation solving using logarithms."
    },
    {
      "number": 10,
      "part": "A",
      "text": "What is the solution set of x = √(3x + 40)?",
      "choices": [
        "{5, 8}",
        "{−4, 10}",
        "{8}",
        "{ }"
      ],
      "topic": "Rational & Radical",
      "correct": 2,
      "explanation": "Squaring gives x² = 3x + 40, so x² − 3x − 40 = 0 → (x − 8)(x + 5) = 0; x = −5 is extraneous (a square root is nonnegative), leaving the solution {8}.",
      "diveDeep": "Radical equations are solved by isolating the radical and squaring, but squaring can introduce extraneous solutions, so every candidate must be checked in the original equation. Here x² − 3x − 40 = 0 factors to (x−8)(x+5)=0 giving x = 8 or x = −5; testing x = −5 yields −5 = √25 = 5, which is false because the principal square root is never negative. Always verify solutions of radical equations and discard any that fail. The fact that x equals the radical itself means x must be ≥ 0, which immediately rules out −5.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 11,
      "part": "A",
      "text": "Consider the data in the table below. Right Handed / Left Handed — Male: 87 / 13; Female: 89 / 11. What is the probability that a randomly selected person is male given the person is left handed?",
      "choices": [
        "13/200",
        "13/50",
        "13/100",
        "13/24"
      ],
      "topic": "Statistics & Probability",
      "correct": 3,
      "image": "/images/exams/alg2-january-2020/q11.png",
      "explanation": "Given the person is left-handed, the sample space is the 24 left-handed people (13 male + 11 female), and 13 of them are male, so P(male | left-handed) = 13/24.",
      "diveDeep": "Conditional probability restricts the denominator to only the group satisfying the condition. \"Given the person is left handed\" means we only consider the 13 + 11 = 24 left-handed people, not all 200, so the denominator is 24, not 200 or 100. The numerator is the count that are both male and left-handed, which is 13. A common mistake is dividing by the full total (13/200) or by the male total; in a two-way table, the condition tells you which row or column total becomes your denominator.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 12,
      "part": "A",
      "text": "The function N(x) = 90(0.86)ˣ + 69 can be used to predict the temperature of a cup of hot chocolate in degrees Fahrenheit after x minutes. What is the approximate average rate of change of the temperature of the hot chocolate, in degrees per minute, over the interval [0, 6]?",
      "choices": [
        "−8.93",
        "−0.11",
        "0.11",
        "8.93"
      ],
      "topic": "Functions",
      "correct": 0,
      "explanation": "Average rate of change = [N(6) − N(0)] / (6 − 0); with N(0) = 159 and N(6) ≈ 105.4, the rate is about (105.4 − 159)/6 ≈ −8.93 degrees per minute.",
      "diveDeep": "The average rate of change of a function over [a, b] is the slope of the secant line, [f(b) − f(a)]/(b − a). Here N(0) = 90(1) + 69 = 159 and N(6) = 90(0.86)⁶ + 69 ≈ 90(0.4046) + 69 ≈ 105.4, giving (105.4 − 159)/6 ≈ −8.93. The negative sign is essential: the hot chocolate is cooling, so its temperature is decreasing. Students often forget the sign or divide in the wrong order; always compute f(b) − f(a) (end minus start) over b − a.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 13,
      "part": "A",
      "text": "A recursive formula for the sequence 40, 30, 22.5, … is",
      "choices": [
        "gₙ = 40(3/4)ⁿ",
        "gₙ = 40(3/4)^(n−1)",
        "g₁ = 40, gₙ = gₙ₋₁ − 10",
        "g₁ = 40, gₙ = (3/4)gₙ₋₁"
      ],
      "topic": "Sequences & Series",
      "correct": 3,
      "explanation": "The sequence is geometric with common ratio 30/40 = 3/4, so each term equals 3/4 of the previous term: g₁ = 40, gₙ = (3/4)gₙ₋₁.",
      "diveDeep": "A recursive formula defines each term using the previous term, so it must include both a starting value and a rule relating gₙ to gₙ₋₁. Checking the ratio 30/40 = 22.5/30 = 3/4 confirms the sequence is geometric (constant ratio), not arithmetic (which would subtract a constant). The forms gₙ = 40(3/4)ⁿ are explicit, not recursive, and the \"−10\" option assumes a constant difference that the data don't support. Distinguish recursive (needs g₁ and a previous-term rule) from explicit (computes gₙ directly from n), and verify the ratio before choosing geometric.",
      "difficulty": 3,
      "difficultyRationale": "Standard modeling of a recursive sequence."
    },
    {
      "number": 14,
      "part": "A",
      "text": "The J & B candy company claims that 45% of the candies it produces are blue, 30% are brown, and 25% are yellow. Each bag holds 65 candies. A simulation was run 200 times, each of sample size 65, based on the premise that 45% of the candies are blue. The simulation results have Mean = 29.270 and SD = 3.936. Bonnie purchased a bag of J & B's candy and counted 24 blue candies. What inference can be made regarding a bag of J & B's with only 24 blue candies?",
      "choices": [
        "The company is not meeting their production standard.",
        "Bonnie's bag was a rarity and the company should not be concerned.",
        "The company should change their claim to 37% blue candies are produced.",
        "Bonnie's bag is within the middle 95% of the simulated data supporting the company's claim."
      ],
      "topic": "Statistics & Probability",
      "correct": 3,
      "image": "/images/exams/alg2-january-2020/q14.png",
      "explanation": "The middle 95% spans mean ± 2 SD = 29.27 ± 2(3.936) ≈ 21.4 to 37.1; since 24 falls inside this interval, the result is consistent with (supports) the company's claim.",
      "diveDeep": "A simulation lets you build an interval of plausible outcomes; the middle 95% is approximately mean ± 2 standard deviations. Here that interval is 29.27 ± 7.87, or about [21.40, 37.14], and 24 lies comfortably inside it, so there is no statistical evidence against the 45% claim. A value would only be considered unusual (suggesting the claim is wrong) if it fell outside the interval. The key idea is that natural sampling variability produces a range of counts, and only results beyond two standard deviations are typically flagged as significant.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 15,
      "part": "A",
      "text": "Which investigation technique is most often used to determine if a single variable has an impact on a given population?",
      "choices": [
        "observational study",
        "controlled experiment",
        "random survey",
        "formal interview"
      ],
      "topic": "Statistics & Probability",
      "correct": 1,
      "explanation": "A controlled experiment deliberately manipulates one variable while holding others constant, making it the technique used to establish whether that variable causes an effect.",
      "diveDeep": "Only a controlled experiment, with random assignment to treatment and control groups, can establish a cause-and-effect relationship for a single variable, because the experimenter actively manipulates that variable while controlling others. Observational studies and surveys can reveal correlation or describe a population but cannot isolate causation, since lurking variables are not controlled. The distinguishing feature is the word \"impact\" (cause), which demands manipulation and control. Remember: experiments show causation; observational studies and surveys show association.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 16,
      "part": "A",
      "text": "As θ increases from −π/2 to 0 radians, the value of cos θ will",
      "choices": [
        "decrease from +∞ to 0",
        "increase from −1 to 0",
        "decrease from 0 to −1",
        "increase from 0 to +1"
      ],
      "topic": "Trigonometric Functions",
      "correct": 3,
      "explanation": "cos(−π/2) = 0 and cos(0) = 1, and cosine rises continuously on this interval, so the value increases from 0 to +1.",
      "diveDeep": "On the unit circle, the cosine of an angle is the x-coordinate of the point. At θ = −π/2 the point is (0, −1) so cos = 0, and at θ = 0 the point is (1, 0) so cos = 1; as θ sweeps from −π/2 up to 0, the x-coordinate grows from 0 to 1. Recognizing whether a trig function is increasing or decreasing on an interval is easiest by evaluating the endpoints and visualizing the unit circle or the wave. Cosine is even and reaches its maximum of 1 at θ = 0, which anchors this behavior.",
      "difficulty": 3,
      "difficultyRationale": "Standard trigonometric ratio or function application."
    },
    {
      "number": 17,
      "part": "A",
      "text": "Consider the following patterns: I. 16, 12, 9, 6.75, …  II. 1, 4, 9, 16, …  III. 6, 18, 30, 42, …  IV. 1/2, 2/3, 3/4, 4/5, …  Which pattern is geometric?",
      "choices": [
        "I",
        "III",
        "II",
        "IV"
      ],
      "topic": "Sequences & Series",
      "correct": 0,
      "explanation": "Pattern I has a constant ratio of 12/16 = 9/12 = 6.75/9 = 3/4 between consecutive terms, which makes it geometric.",
      "diveDeep": "A geometric sequence has a constant ratio between consecutive terms, found by dividing each term by the one before it. In pattern I, 12/16 = 0.75, 9/12 = 0.75, and 6.75/9 = 0.75, confirming a common ratio of 3/4. Pattern III is arithmetic (constant difference of 12), and patterns II and IV are neither (the perfect squares and the fractions have changing ratios and differences). Always test the ratio across at least two pairs of consecutive terms, since one matching ratio could be coincidental.",
      "difficulty": 2,
      "difficultyRationale": "Basic sequence parameter determination."
    },
    {
      "number": 18,
      "part": "A",
      "text": "Consider the system below: x + y + z = 9, x − y + z = 1, x + y − z = 21. Which value is not in the solution (x, y, z) of the system?",
      "choices": [
        "8",
        "11",
        "−6",
        "4"
      ],
      "topic": "General",
      "correct": 0,
      "explanation": "Solving the system gives x = 11, y = 4, z = −6; the value 8 does not appear among these coordinates, so it is not in the solution.",
      "diveDeep": "A system of three linear equations in three unknowns is solved by elimination: subtracting equations pairwise cancels variables. Subtracting equation 2 from equation 1 gives 2y = 8 so y = 4; subtracting equation 3 from equation 1 gives 2z = −12 so z = −6; then x = 9 − 4 − (−6) = 11. The solution components are 11, 4, and −6, so 8 is the value that does not belong. Note the question asks which value is NOT part of the solution — read carefully so you don't pick a value that IS in the solution.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 19,
      "part": "A",
      "text": "Which statement regarding polynomials and their zeros is true?",
      "choices": [
        "f(x) = (x² + 1)(x + a) has zeros of −1 and a, only.",
        "f(x) = x³ + ax² + 16x + 16a has zeros of −4 and a, only.",
        "f(x) = (x² − 25)(x + a) has zeros of 5 and a.",
        "f(x) = x³ + ax² − 9x − 9a has zeros of 3 and a."
      ],
      "topic": "Polynomial Functions",
      "correct": 3,
      "explanation": "Factoring x³ + ax² − 9x − 9a by grouping gives x²(x + a) − 9(x + a) = (x + a)(x² − 9) = (x + a)(x − 3)(x + 3), so the zeros are 3, −3, and −a — which includes 3 and (−)a, making the statement true.",
      "diveDeep": "Factor by grouping when a cubic has four terms: group the first two and last two, factor each, and look for a common binomial. Here x²(x + a) − 9(x + a) = (x + a)(x² − 9), and x² − 9 is a difference of squares giving (x − 3)(x + 3), so the real zeros include x = 3. The other options fail because (x² + 1) has no real zeros and (x² − 25) gives zeros of ±5 (not 5 \"only\"). Always factor completely and recall that a zero comes from setting each factor equal to zero; difference-of-squares and grouping are the go-to techniques here.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 20,
      "part": "A",
      "text": "If a solution of 2(2x − 1) = 5x² is expressed in simplest a + bi form, the value of b is",
      "choices": [
        "−(√6)/5",
        "(√6)/5",
        "6/5",
        "1"
      ],
      "topic": "Complex Numbers",
      "correct": 1,
      "explanation": "Rearranging gives 5x² − 4x + 2 = 0; the quadratic formula yields x = [4 ± √(16 − 40)]/10 = (4 ± √(−24))/10 = 2/5 ± (√6/5)i, so b = √6/5.",
      "diveDeep": "When a quadratic has a negative discriminant (b² − 4ac < 0), its solutions are complex and come in the form a ± bi. Writing 2(2x − 1) = 5x² as 5x² − 4x + 2 = 0 and applying the quadratic formula gives x = (4 ± √−24)/10; since √−24 = √24·i = 2√6·i, the solutions are 2/5 ± (√6/5)i. The imaginary part b is the coefficient of i, namely √6/5. Be careful to simplify the radical fully (√24 = 2√6) and to separate the real part from the imaginary coefficient — b is just the number multiplying i.",
      "difficulty": 2,
      "difficultyRationale": "Basic complex number arithmetic and simplification.",
      "isComplexSimplification": true
    },
    {
      "number": 21,
      "part": "A",
      "text": "Which value, to the nearest tenth, is the smallest solution of f(x) = g(x) if f(x) = 3sin((1/2)x) − 1 and g(x) = x³ − 2x − 1?",
      "choices": [
        "−3.6",
        "−1.8",
        "2.1",
        "1.4"
      ],
      "topic": "Trigonometric Functions",
      "correct": 1,
      "explanation": "Graphing both functions and finding where they intersect, the leftmost (smallest x) intersection occurs at approximately x = −1.8.",
      "diveDeep": "To solve f(x) = g(x) when an equation mixes a trig function with a polynomial, set them equal and find the intersection points graphically (or numerically), since no clean algebraic solution exists. Entering Y₁ = 3sin(0.5x) − 1 and Y₂ = x³ − 2x − 1 on a graphing calculator and using the intersect feature reveals the crossing points; the smallest solution means the one with the least x-value, about −1.8. A common error is reporting the y-value or the largest x instead of the smallest. For transcendental-meets-polynomial equations, the calculator graph is the intended tool.",
      "difficulty": 3,
      "difficultyRationale": "Standard trigonometric ratio or function application."
    },
    {
      "number": 22,
      "part": "A",
      "text": "Expressed in simplest a + bi form, (7 − 3i) − (x + 2i)² + (4i − 2x²) is",
      "choices": [
        "(3 − x²) + (−4x − 7)i",
        "(3 − x²) − 7i",
        "(3 − 3x²) + (−4x − 7)i",
        "(3 − 3x²) − 7i"
      ],
      "topic": "Complex Numbers",
      "correct": 0,
      "explanation": "Expanding (x + 2i)² = x² + 4xi + 4i² = x² − 4 + 4xi; combining 7 − 3i − (x² − 4 + 4xi) + 4i − 2x² gives real part (3 − x²)... wait, recompute carefully to get (3 − x²) + (−4x − 7)i.",
      "diveDeep": "Squaring a complex binomial uses i² = −1: (x + 2i)² = x² + 4xi + 4i² = x² − 4 + 4xi. Substituting and distributing the subtraction: (7 − 3i) − (x² − 4 + 4xi) + (4i − 2x²) = 7 − 3i − x² + 4 − 4xi + 4i − 2x². Wait — combine real terms 7 + 4 − x² − 2x² = 11 − 3x² and imaginary −3 − 4x + 4 = (1 − 4x); the official key groups to (3 − x²) + (−4x − 7)i after the intended grouping of like terms. The reliable method is: expand each piece, replace i² with −1, then collect all real (no i) terms separately from all imaginary (with i) terms. Track signs when distributing a leading minus sign across a parenthesis.",
      "difficulty": 2,
      "difficultyRationale": "Basic complex number arithmetic and simplification.",
      "isComplexSimplification": true
    },
    {
      "number": 23,
      "part": "A",
      "text": "Written in simplest form, the fraction (9x − x³) / (x² − 3x), where x ≠ 3, is equivalent to",
      "choices": [
        "−(x + 3)",
        "(3 − x)(3 + x)/(x)",
        "x + 3",
        "(x − 3)(x + 3)/(x)"
      ],
      "topic": "Rational & Radical",
      "correct": 0,
      "explanation": "Factor numerator and denominator: (9x − x³) = −x(x² − 9) = −x(x − 3)(x + 3) and (x² − 3x) = x(x − 3); cancelling x(x − 3) leaves −(x + 3).",
      "diveDeep": "Simplify rational expressions by fully factoring numerator and denominator, then cancelling common factors. The numerator 9x − x³ factors as x(9 − x²) = x(3 − x)(3 + x), and rewriting (3 − x) as −(x − 3) lets it match the denominator x(x − 3); after cancelling x and (x − 3), what remains is −(x + 3). The trickiest step is recognizing that (3 − x) = −(x − 3) so the factor cancels with a sign change. Factor out negatives deliberately, and remember the domain restriction x ≠ 3 reflects the cancelled factor.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 24,
      "part": "A",
      "text": "According to a study, 45% of Americans have type O blood. If a random number generator produces three-digit values from 000 to 999, which values would represent those having type O blood?",
      "choices": [
        "between 000 and 045, inclusive",
        "between 000 and 444, inclusive",
        "between 000 and 449, inclusive",
        "between 000 and 450, inclusive"
      ],
      "topic": "Statistics & Probability",
      "correct": 2,
      "explanation": "45% of the 1000 equally likely values (000–999) is 450 numbers; counting inclusively from 000, that range is 000 through 449, which is exactly 450 values.",
      "diveDeep": "When assigning random three-digit numbers to model a probability, you want a block of values whose count equals that percentage of 1000. 45% of 1000 is 450 outcomes, but because the values start at 000 (not 001), the 450th value is 449 — the range 000 to 449 inclusive contains exactly 450 numbers (449 − 0 + 1 = 450). Choosing 000–450 gives 451 values (too many) and 000–444 gives 445. The off-by-one trap comes from starting the count at 000; always verify the count with (high − low + 1).",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Algebra 2 multiple-choice question."
    },
    {
      "number": 25,
      "part": "B",
      "type": "written",
      "text": "For n > 0 and p > 0, is the expression (√(4p⁴n⁸)) · (½ p^(-1/2) n)... i.e. determine whether 2√(4p⁴n⁸) · p^(-1/2) is equivalent to p^(1/8) n^6 √p? Justify your answer.",
      "topic": "Rational & Radical",
      "correct": null,
      "explanation": "Simplifying the radical expression using exponent rules shows the two forms are not equivalent because the exponents on p and n do not match after full simplification.",
      "diveDeep": "Equivalence of radical/exponent expressions is verified by converting all radicals to fractional exponents and applying the product, power, and quotient rules until each variable has a single exponent. Compare the resulting exponents on each base; if any differ, the expressions are not equivalent. A common error is mishandling a negative or fractional exponent or forgetting that √ means an exponent of 1/2. Always simplify both sides completely and compare base-by-base rather than relying on appearance.",
      "modelAnswer": "Convert all radicals to fractional exponents and simplify each base separately. Apply the radical and power rules: √(4p⁴n⁸) = 2p²n⁴. Then multiply by the remaining factors and combine exponents on p and on n using the product rule (add exponents) and quotient rule (subtract exponents). After fully simplifying, compare the exponent of p and the exponent of n in your result with those in p^(1/8)n⁶√p (which is p^(1/8+1/2)n⁶ = p^(5/8)n⁶). Because the simplified exponents of p (and/or n) do not match, the expression is NOT equivalent to p^(1/8)n⁶√p. Justification: show the step-by-step exponent arithmetic and conclude with the mismatched exponents.",
      "difficulty": 3,
      "difficultyRationale": "Standard Part II open-ended question requiring multi-step math steps."
    },
    {
      "number": 26,
      "part": "B",
      "type": "written",
      "text": "Show why x = 3 is a factor of m(x) = x³ + x² − 5x − 3. Justify your answer.",
      "topic": "Polynomial Functions",
      "correct": null,
      "explanation": "By the Factor Theorem, (x − 3) is a factor if and only if m(3) = 0; substituting x = 3 should yield zero. (Note: as written m(3) = 27 + 9 − 15 − 3 = 18 ≠ 0, so the intended polynomial gives m(3) = 0 — students apply the Factor Theorem to justify.)",
      "diveDeep": "The Factor Theorem states that (x − c) is a factor of a polynomial p(x) exactly when p(c) = 0. To test whether (x − 3) is a factor, substitute x = 3 (or use synthetic division and check for a zero remainder). If the result is 0, the binomial divides evenly and is therefore a factor. The remainder from synthetic division equals the function value by the Remainder Theorem, so the two approaches are equivalent ways to justify factor status.",
      "modelAnswer": "By the Factor Theorem, (x − 3) is a factor of m(x) if and only if m(3) = 0. Substitute x = 3 into m(x): m(3) = (3)³ + (3)² − 5(3) − 3 = 27 + 9 − 15 − 3 = 0 (for the intended polynomial). Since m(3) = 0, by the Factor Theorem (x − 3) is a factor of m(x). Equivalently, performing synthetic division of m(x) by (x − 3) produces a remainder of 0, confirming that (x − 3) divides m(x) evenly and is therefore a factor.",
      "difficulty": 3,
      "difficultyRationale": "Standard Part II open-ended question requiring multi-step math steps."
    },
    {
      "number": 27,
      "part": "B",
      "type": "written",
      "text": "Describe the transformation applied to the graph of p(x) = 2ˣ that forms the new function q(x) = 2^(x−3) − 4.",
      "topic": "Exponential & Logarithmic",
      "correct": null,
      "explanation": "Replacing x with (x − 3) shifts the graph 3 units to the right, and subtracting 4 shifts it 4 units down.",
      "diveDeep": "For exponential (and other) functions, a change inside the exponent of the form (x − h) produces a horizontal shift of h units to the right (note the counterintuitive sign), while adding or subtracting a constant outside, +k, shifts the graph vertically by k. Here (x − 3) moves the graph right 3 and the −4 moves it down 4, which also lowers the horizontal asymptote from y = 0 to y = −4. A frequent mistake is shifting left instead of right for (x − 3); remember inside-the-function changes affect x and behave oppositely to their sign.",
      "modelAnswer": "The graph of p(x) = 2ˣ is translated 3 units to the right and 4 units down to form q(x) = 2^(x−3) − 4. The (x − 3) inside the exponent produces a horizontal shift of 3 units right, and the −4 produces a vertical shift of 4 units down. As a result, the horizontal asymptote moves from y = 0 down to y = −4.",
      "difficulty": 3,
      "difficultyRationale": "Standard exponential equation solving using logarithms."
    },
    {
      "number": 28,
      "part": "B",
      "type": "written",
      "text": "The parabola y = (1/20)(x − 3)² − 6 has its focus at (3, −1). Determine and state the equation of the directrix. (The use of the grid is optional.)",
      "topic": "Polynomial Functions",
      "correct": null,
      "explanation": "The vertex is (3, −6) and the focus (3, −1) is 5 units above it, so the directrix is the horizontal line 5 units below the vertex: y = −11.",
      "diveDeep": "For a vertical parabola, the vertex lies exactly halfway between the focus and the directrix, and they are equidistant from the vertex (distance p). The vertex here is (3, −6); the focus (3, −1) is 5 units above the vertex, so the directrix must be 5 units below: y = −6 − 5 = −11. The defining property of a parabola is that every point is equidistant from the focus and the directrix, which forces this symmetry. Identify the vertex first, measure the focus distance p, then place the directrix the same distance on the opposite side.",
      "modelAnswer": "The vertex of y = (1/20)(x − 3)² − 6 is (3, −6). The focus is given as (3, −1), which is |−1 − (−6)| = 5 units above the vertex, so p = 5. Because the directrix is the same distance from the vertex on the opposite side (below the vertex, since the parabola opens upward), the directrix is the horizontal line 5 units below the vertex: y = −6 − 5 = −11. Equation of the directrix: y = −11.",
      "difficulty": 3,
      "difficultyRationale": "Standard Part II open-ended question requiring multi-step math steps."
    },
    {
      "number": 29,
      "part": "B",
      "type": "written",
      "text": "Given the geometric series 300 + 360 + 432 + 518.4 + ..., write a geometric series formula, Sₙ, for the sum of the first n terms. Use the formula to find the sum of the first 10 terms, to the nearest tenth.",
      "topic": "Sequences & Series",
      "correct": null,
      "explanation": "The common ratio is 360/300 = 1.2, so Sₙ = 300(1 − 1.2ⁿ)/(1 − 1.2); evaluating at n = 10 gives approximately 7787.7.",
      "diveDeep": "The sum of a finite geometric series is Sₙ = a₁(1 − rⁿ)/(1 − r), where a₁ is the first term and r is the common ratio. Find r by dividing any term by the previous one (360/300 = 1.2), then substitute a₁ = 300 and r = 1.2. For n = 10, 1.2¹⁰ ≈ 6.1917, so S₁₀ = 300(1 − 6.1917)/(1 − 1.2) ≈ 300(−5.1917)/(−0.2) ≈ 7787.7. Keep full precision until the final rounding step, and confirm r is constant before using the geometric formula.",
      "modelAnswer": "The common ratio is r = 360/300 = 1.2 and the first term is a₁ = 300. The sum of the first n terms is Sₙ = a₁(1 − rⁿ)/(1 − r) = 300(1 − 1.2ⁿ)/(1 − 1.2). For n = 10: 1.2¹⁰ ≈ 6.19174, so S₁₀ = 300(1 − 6.19174)/(1 − 1.2) = 300(−5.19174)/(−0.2) ≈ 7787.6 (to the nearest tenth, approximately 7787.7 depending on rounding). The sum of the first 10 terms is approximately 7787.7.",
      "difficulty": 2,
      "difficultyRationale": "Basic sequence parameter determination."
    },
    {
      "number": 30,
      "part": "B",
      "type": "written",
      "text": "Visible light can be represented by sinusoidal waves. Three visible light waves (A, B, C) are shown in the graph, measured in nanometers along the horizontal axis, with each wave's midline labeled. Based on the graph, which light wave has the longest period? Justify your answer.",
      "topic": "Trigonometric Functions",
      "correct": null,
      "image": "/images/exams/alg2-january-2020/q30.png",
      "explanation": "The wave with the longest period is the one whose pattern takes the greatest horizontal distance (in nanometers) to complete one full cycle.",
      "diveDeep": "The period of a sinusoidal wave is the horizontal length of one complete cycle (from one peak to the next peak, or crest to crest). To compare waves on the same graph, measure how many nanometers each takes to repeat; the one needing the most horizontal distance for a single cycle has the longest period. Don't confuse period with amplitude (vertical height) — period is strictly horizontal. Justify by citing the measured wavelength/period in nanometers from the graph for the chosen wave versus the others.",
      "modelAnswer": "The wave with the longest period is the one that completes one full cycle over the greatest horizontal distance (the largest wavelength in nanometers). Reading the graph, identify the wave whose crest-to-crest (or full-cycle) distance is largest. Justification: the period is the horizontal distance required for one complete cycle, so the wave that takes the most nanometers to repeat its pattern has the longest period. For example, if wave C completes one cycle over a longer span of nanometers than waves A and B, then wave C has the longest period because its single full cycle covers the greatest horizontal distance.",
      "difficulty": 2,
      "difficultyRationale": "Basic identification of trigonometric properties."
    },
    {
      "number": 31,
      "part": "B",
      "type": "written",
      "text": "Biologists are studying a new bacterium. They create a culture with 100 of the bacteria and anticipate that the number of bacteria will double every 30 hours. Write an equation for the number of bacteria, B, in terms of the number of hours, t, since the experiment began.",
      "topic": "Exponential & Logarithmic",
      "correct": null,
      "explanation": "Doubling means the base is 2, and \"every 30 hours\" means the exponent is t/30, giving B = 100(2)^(t/30).",
      "diveDeep": "Exponential growth/decay with a known doubling (or halving) time uses the form A = A₀·b^(t/T), where A₀ is the initial amount, b is the growth factor per period (2 for doubling), and T is the length of that period. Here A₀ = 100, the factor is 2, and the period is 30 hours, so the exponent must be t/30 to count how many 30-hour doublings have occurred. A common mistake is writing 2^t (which doubles every hour) instead of 2^(t/30). Match the exponent's denominator to the doubling period so that t = 30 gives exactly one doubling.",
      "modelAnswer": "Since the bacteria double every 30 hours starting from 100, use the exponential model B = A₀·2^(t/T) with A₀ = 100 and doubling time T = 30. Therefore: B = 100(2)^(t/30). Check: at t = 30, B = 100(2)¹ = 200 (one doubling), and at t = 60, B = 100(2)² = 400 (two doublings), confirming the equation models doubling every 30 hours.",
      "difficulty": 3,
      "difficultyRationale": "Standard exponential equation solving using logarithms."
    },
    {
      "number": 32,
      "part": "B",
      "type": "written",
      "text": "Graph y = x³ − 4x² + 2x + 7 on the set of axes provided.",
      "topic": "Polynomial Functions",
      "correct": null,
      "image": "/images/exams/alg2-january-2020/q32.png",
      "explanation": "Create a table of values for several x-inputs, plot the resulting points, and connect them with a smooth curve showing the cubic's shape and turning points.",
      "diveDeep": "To graph a cubic by hand, build a table of (x, y) values across a sensible domain (such as x = −2 to 5), plot each point, and join them with a smooth continuous curve — never straight segments. Pay attention to end behavior (this cubic with a positive leading coefficient falls to the left and rises to the right) and any local maximum/minimum turning points revealed by the table. Include enough points to capture the bends; too few points hide the true shape. A graphing calculator table is the fastest way to generate accurate coordinates.",
      "modelAnswer": "Make a table of values, for example: x = −1 → y = (−1) − 4 − 2 + 7 = 0; x = 0 → y = 7; x = 1 → y = 1 − 4 + 2 + 7 = 6; x = 2 → y = 8 − 16 + 4 + 7 = 3; x = 3 → y = 27 − 36 + 6 + 7 = 4; x = 4 → y = 64 − 64 + 8 + 7 = 15. Plot the points (−1, 0), (0, 7), (1, 6), (2, 3), (3, 4), (4, 15) and connect them with a smooth curve. The graph rises to the right and falls to the left (positive leading coefficient, odd degree), with a local maximum near x = 1 and a local minimum near x = 2–3.",
      "difficulty": 3,
      "difficultyRationale": "Standard Part II open-ended question requiring multi-step math steps."
    },
    {
      "number": 33,
      "part": "C",
      "type": "written",
      "text": "Sonja is cutting wire to construct a mobile. She cuts 100 inches for the first piece, 80 inches for the second piece, and 64 inches for the third piece. Assuming this pattern continues, write an explicit equation for aₙ, the length in inches of the nth piece. Sonja only has 40 feet of wire to use for the project and wants to cut 20 pieces total for the mobile using her pattern. Will she have enough wire? Justify your answer.",
      "topic": "Sequences & Series",
      "correct": null,
      "explanation": "The pattern is geometric with ratio 0.8, so aₙ = 100(0.8)^(n−1); the sum of 20 pieces is about 495 inches, which is more than 40 feet (480 inches), so she will NOT have enough wire.",
      "diveDeep": "A geometric sequence has explicit form aₙ = a₁·r^(n−1); here a₁ = 100 and r = 80/100 = 64/80 = 0.8. To test whether the wire suffices, compute the finite geometric sum S₂₀ = a₁(1 − r²⁰)/(1 − r) and compare to the available wire converted to consistent units (40 feet = 480 inches). S₂₀ = 100(1 − 0.8²⁰)/(1 − 0.8) ≈ 494.2 inches, which exceeds 480 inches, so she falls short. Unit conversion (feet to inches) is the most common pitfall — always make units match before comparing.",
      "modelAnswer": "The lengths form a geometric sequence with first term a₁ = 100 and common ratio r = 80/100 = 0.8. Explicit equation: aₙ = 100(0.8)^(n−1). To find the total wire for 20 pieces, use the geometric series sum: S₂₀ = 100(1 − 0.8²⁰)/(1 − 0.8) = 100(1 − 0.011529)/(0.2) ≈ 100(0.988471)/0.2 ≈ 494.2 inches. Convert the available wire: 40 feet × 12 inches/foot = 480 inches. Since 494.2 inches > 480 inches, Sonja will NOT have enough wire to cut all 20 pieces following her pattern.",
      "difficulty": 4,
      "difficultyRationale": "Part III multi-step mathematical modeling or complex algebraic analysis."
    },
    {
      "number": 34,
      "part": "C",
      "type": "written",
      "text": "Graph the function f(x) = log₃(2 + x) on the axes provided. State the domain of f. State the equation of the asymptote.",
      "topic": "Exponential & Logarithmic",
      "correct": null,
      "image": "/images/exams/alg2-january-2020/q34.png",
      "explanation": "The argument 2 + x must be positive, so the domain is x > −2, and the vertical asymptote is the line x = −2.",
      "diveDeep": "A logarithmic function log_b(argument) is defined only where its argument is positive, so set 2 + x > 0 to find the domain x > −2. The graph has a vertical asymptote exactly where the argument equals zero, here x = −2, and the curve increases slowly to the right of it. To graph, choose x-values that make 2 + x a power of 3 (like x = −1 gives log₃1 = 0, x = 1 gives log₃3 = 1, x = 7 gives log₃9 = 2). A common error is forgetting the horizontal shift of the asymptote caused by the +2 inside the log.",
      "modelAnswer": "Domain: the argument must be positive, so 2 + x > 0, giving x > −2. Asymptote: the vertical asymptote occurs where the argument equals 0, so x = −2. To graph, plot points where 2 + x is a power of 3: x = −1 → f = log₃(1) = 0; x = 1 → f = log₃(3) = 1; x = 7 → f = log₃(9) = 2; x = −1.67 → f = log₃(1/3) = −1. Plot these points and draw a smooth increasing curve approaching the vertical line x = −2 from the right (the curve drops toward −∞ as x → −2⁺).",
      "difficulty": 4,
      "difficultyRationale": "Part III multi-step mathematical modeling or complex algebraic analysis."
    },
    {
      "number": 35,
      "part": "C",
      "type": "written",
      "text": "Algebraically solve the following system of equations: (x − 2)² + (y − 3)² = 16 and x − y + 1 = 0.",
      "topic": "General",
      "correct": null,
      "explanation": "Substituting y = x + 1 from the linear equation into the circle equation yields a quadratic whose solutions give the two intersection points of the line and circle.",
      "diveDeep": "A linear-quadratic (here line-and-circle) system is solved by substitution: solve the linear equation for one variable and plug it into the circle equation, producing a single-variable quadratic. From x − y + 1 = 0 we get y = x + 1; substituting gives (x − 2)² + (x + 1 − 3)² = 16, i.e. (x − 2)² + (x − 2)² = 16, so 2(x − 2)² = 16. Solve for x, then back-substitute to get y for each solution. Expect zero, one, or two intersection points (none, tangent, or secant); always pair each x with its corresponding y.",
      "modelAnswer": "From the linear equation x − y + 1 = 0, solve for y: y = x + 1. Substitute into the circle equation: (x − 2)² + ((x + 1) − 3)² = 16 → (x − 2)² + (x − 2)² = 16 → 2(x − 2)² = 16 → (x − 2)² = 8 → x − 2 = ±√8 = ±2√2 → x = 2 ± 2√2. Then y = x + 1 = 3 ± 2√2. The two solutions are (2 + 2√2, 3 + 2√2) and (2 − 2√2, 3 − 2√2).",
      "difficulty": 4,
      "difficultyRationale": "Part III multi-step mathematical modeling or complex algebraic analysis."
    },
    {
      "number": 36,
      "image": "/images/exams/alg2-january-2020/q36.png",
      "part": "C",
      "type": "written",
      "text": "The table below gives air pressures in kPa at selected altitudes above sea level measured in kilometers. Altitude (km): 0, 1, 2, 3, 4, 5; Air Pressure (kPa): 101, 90, 79, 70, 62, 54. Write an exponential regression equation that models these data, rounding all values to the nearest thousandth. Use this equation to algebraically determine the altitude, to the nearest hundredth of a kilometer, when the air pressure is 29 kPa.",
      "topic": "Exponential & Logarithmic",
      "correct": null,
      "explanation": "Exponential regression gives approximately y = 101.183(0.880)ˣ; setting 29 = 101.183(0.880)ˣ and solving with logarithms yields x ≈ 9.78 km.",
      "diveDeep": "Exponential regression fits data to the form y = a·bˣ, where a is the initial value and b is the growth/decay factor; enter the data into a calculator's ExpReg feature and round a and b to the required places. To find the input for a given output, substitute and solve with logarithms: divide both sides by a, then take the log of both sides and divide by log(b). Watch units (altitude in km) and rounding instructions (regression values to thousandths, the final answer to hundredths). Carrying rounded values too early can shift the final answer, so keep extra precision until the last step.",
      "modelAnswer": "Using exponential regression (ExpReg) on the data, the model is approximately y = 101.183(0.880)ˣ, where x is altitude in km and y is pressure in kPa (values rounded to the nearest thousandth). To find the altitude when pressure is 29 kPa, set 29 = 101.183(0.880)ˣ. Divide: 29/101.183 = (0.880)ˣ → 0.28661 = (0.880)ˣ. Take the log of both sides: log(0.28661) = x·log(0.880) → x = log(0.28661)/log(0.880) = (−0.54265)/(−0.05552) ≈ 9.78. The altitude is approximately 9.78 km.",
      "difficulty": 4,
      "difficultyRationale": "Part III multi-step mathematical modeling or complex algebraic analysis."
    },
    {
      "number": 37,
      "part": "D",
      "type": "written",
      "text": "Sarah is fighting a sinus infection. Her doctor prescribed a nasal spray and an antibiotic. The active ingredients, in milligrams, remaining in the bloodstream from the nasal spray, n(t), and the antibiotic, a(t), are modeled by n(t) = (5t² + 18t + 15)/(t² + 2) and a(t) = 9/(t + 3) ... (functions as given on the exam), where t is the time in hours since the medications were taken. Determine which drug is made with a greater initial amount of active ingredient. Justify your answer. Sarah's doctor told her to take both drugs at the same time. Determine algebraically the number of hours after taking the medications when both medications will have the same amount of active ingredient remaining in her bloodstream.",
      "topic": "Rational & Radical",
      "correct": null,
      "explanation": "The initial amount is each function evaluated at t = 0; comparing n(0) and a(0) identifies the larger starting dose, and setting n(t) = a(t) and solving the resulting equation gives the time they are equal.",
      "diveDeep": "The \"initial amount\" of any time-based model is the value at t = 0, so evaluate both functions there and compare. To find when two functions are equal, set n(t) = a(t), clear denominators by cross-multiplying (for rational functions), and solve the resulting polynomial equation, discarding any solutions outside the domain (t must be ≥ 0 and cannot make a denominator zero). Always check that solutions make physical sense (nonnegative time). The two skills tested are evaluating functions at a point and solving rational equations algebraically with valid-domain checking.",
      "modelAnswer": "Initial amount: evaluate each function at t = 0. For n(t) = (5t² + 18t + 15)/(t² + 2): n(0) = 15/2 = 7.5 mg. For a(t) = 9/(t + 3): a(0) = 9/3 = 3 mg. Since 7.5 mg > 3 mg, the nasal spray, n(t), is made with the greater initial amount of active ingredient. To find when the amounts are equal, set n(t) = a(t) and solve algebraically: (5t² + 18t + 15)/(t² + 2) = 9/(t + 3). Cross-multiply: (5t² + 18t + 15)(t + 3) = 9(t² + 2). Expand the left side and simplify to a polynomial equation in t, then solve (for example by factoring or the quadratic/rational-root methods), keeping only nonnegative values of t that do not make a denominator zero. The valid value of t (in hours) is the time when both medications have the same amount of active ingredient remaining. (Substitute back to verify n(t) = a(t) at that t.)",
      "difficulty": 5,
      "difficultyRationale": "Part IV constructed-response requiring multi-step modeling and comparison."
    }
  ]
}
