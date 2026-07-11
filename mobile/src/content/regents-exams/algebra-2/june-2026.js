// Algebra 2 Regents — June 2026
export default {
  "id": "a2-jun-2026",
  "subject": "algebra-2",
  "year": 2026,
  "session": "June",
  "totalMinutes": 180,
  "questions": [
    {
      "number": 1,
      "part": "A",
      "text": "Which value is a zero of a(x) = x^3 + 3x^2 − 4x − 12?",
      "choices": [
        "−12",
        "−3",
        "3",
        "0"
      ],
      "topic": "Polynomial Functions",
      "correct": 1,
      "explanation": "A zero makes the function equal 0. Substituting x = −3: (−3)^3 + 3(−3)^2 − 4(−3) − 12 = −27 + 27 + 12 − 12 = 0, so −3 is a zero. The other values do not give 0 when substituted.",
      "subTopic": "Polynomial Graphs, Zeros & Conics"
    },
    {
      "number": 2,
      "part": "A",
      "text": "Annie, Brianna, Chandra, Dee, Evan, and Fe are the six candidates running for office in Parkway High School's student organization. If Brianna and Dee are running for president and P is the set of candidates running for president, what is P′, the complement of P?",
      "choices": [
        "{ }",
        "{Annie, Brianna, Chandra, Dee, Evan, Fe}",
        "{Brianna, Dee}",
        "{Annie, Chandra, Evan, Fe}"
      ],
      "topic": "Statistics & Probability",
      "correct": 3,
      "explanation": "The complement P′ contains every element of the universal set that is NOT in P. Since P = {Brianna, Dee}, the complement is the remaining four candidates: {Annie, Chandra, Evan, Fe}."
    },
    {
      "number": 3,
      "part": "A",
      "text": "A man wants to have his car repaired but does not want to spend more than $1500 for the repairs. The mechanic says that the parts needed will cost $930 and the labor will cost an additional $65 per hour. Which inequality could be used to find the greatest number of hours, h, the mechanic can work without exceeding this man's budget?",
      "choices": [
        "995h ≤ 1500",
        "65 + 930h > 505",
        "930 + 65h ≤ 1500",
        "930 + 65h > 1500"
      ],
      "topic": "Systems & Inequalities",
      "correct": 2,
      "explanation": "The total cost is the fixed $930 for parts plus $65 for each of h hours of labor, giving 930 + 65h. Staying within the budget means the total must be at most $1500, so 930 + 65h ≤ 1500.",
      "subTopic": "Systems & Inequalities"
    },
    {
      "number": 4,
      "part": "A",
      "text": "Given x ≠ −1, (x^3 + 5x^2 + 2x − 8) ÷ (x + 1) is equivalent to",
      "choices": [
        "x^2 + 4x + 2 − 10 ÷ (x + 1)",
        "x^2 + 6x + 8",
        "x^2 + 6x − 4 − 4 ÷ (x + 1)",
        "x^2 + 4x − 2 − 6 ÷ (x + 1)"
      ],
      "topic": "Polynomial Functions",
      "correct": 3,
      "explanation": "Synthetic division with root −1 on coefficients 1, 5, 2, −8 gives 1, 4, −2 with remainder −6. So the quotient is x^2 + 4x − 2 with remainder −6, i.e., x^2 + 4x − 2 − 6/(x + 1). Check via the Remainder Theorem: f(−1) = −1 + 5 − 2 − 8 = −6.",
      "subTopic": "Polynomial Operations & Factoring"
    },
    {
      "number": 5,
      "part": "A",
      "text": "The expression k^3 · ∛(8k^2) can be rewritten as",
      "choices": [
        "2k^(11/3)",
        "2k^5",
        "24k^2",
        "4k^(11/3)"
      ],
      "topic": "Rational & Radical",
      "correct": 0,
      "explanation": "The cube root of 8k^2 is 8^(1/3) · k^(2/3) = 2k^(2/3). Multiplying by k^3 adds the exponents: k^3 · 2k^(2/3) = 2k^(3 + 2/3) = 2k^(11/3).",
      "subTopic": "Radical Expressions & Equations"
    },
    {
      "number": 6,
      "part": "A",
      "text": "Consider the graph of y = f(x) shown. Which graph represents y = f(x + 2) − 3?",
      "choices": [
        "Graph (1)",
        "Graph (2)",
        "Graph (3)",
        "Graph (4)"
      ],
      "topic": "Polynomial Functions",
      "correct": 1,
      "explanation": "Replacing x with x + 2 shifts the graph of f left 2 units, and subtracting 3 shifts it down 3 units. The correct choice is the graph showing every point of f moved left 2 and down 3.",
      "subTopic": "Polynomial Graphs, Zeros & Conics"
    },
    {
      "number": 7,
      "part": "A",
      "text": "What is the growth rate of the function y = 475(1.038)^x?",
      "choices": [
        "1.038%",
        "0.038%",
        "3.8%",
        "38%"
      ],
      "topic": "Exponential & Logarithmic",
      "correct": 2,
      "explanation": "In an exponential model y = a(1 + r)^x, the base 1.038 means 1 + r = 1.038, so r = 0.038. Written as a percent, the growth rate is 3.8%.",
      "subTopic": "Exponential Models"
    },
    {
      "number": 8,
      "part": "A",
      "text": "What are the solutions to the system of equations below? (x − 5)^2 + y^2 − 16 = 0; x + y − 9 = 0",
      "choices": [
        "x = 5 and x = 9",
        "(5, 4), only",
        "(9, 0), only",
        "(5, 4) and (9, 0)"
      ],
      "topic": "Systems & Inequalities",
      "correct": 3,
      "explanation": "From the line, y = 9 − x. Substituting: (x − 5)^2 + (9 − x)^2 = 16 simplifies to 2x^2 − 28x + 90 = 0, or (x − 5)(x − 9) = 0, so x = 5 or x = 9. The corresponding points are (5, 4) and (9, 0), and both satisfy the circle equation.",
      "subTopic": "Systems & Inequalities"
    },
    {
      "number": 9,
      "part": "A",
      "text": "The sum of the first five terms of the geometric sequence 800, 600, 450, … is",
      "choices": [
        "253.125",
        "300",
        "2440.625",
        "2500"
      ],
      "topic": "Sequences & Series",
      "correct": 2,
      "explanation": "The common ratio is 600 ÷ 800 = 0.75. Using Sₙ = a₁(1 − rⁿ) ÷ (1 − r): S₅ = 800(1 − 0.75^5) ÷ (1 − 0.75) = 800(0.7626953125) ÷ 0.25 = 2440.625.",
      "subTopic": "Series"
    },
    {
      "number": 10,
      "part": "A",
      "text": "The number of hours per day of total screen time on electronic devices for the 3000 students at Lakeside High School is approximately normally distributed with a mean of 4.6 hours and a standard deviation of 2.5 hours. Approximately how many students at the school spent more than 5 hours per day on electronic devices?",
      "choices": [
        "1691",
        "1309",
        "880",
        "863"
      ],
      "topic": "Statistics & Probability",
      "correct": 1,
      "explanation": "The z-score for 5 hours is (5 − 4.6) ÷ 2.5 = 0.16. The area above z = 0.16 is about 0.4364, so approximately 0.4364 × 3000 ≈ 1309 students spent more than 5 hours per day.",
      "subTopic": "Normal Distribution"
    },
    {
      "number": 11,
      "part": "A",
      "text": "What is the solution set to the equation 4x ÷ (4x − 3) + 2 ÷ x = 3 ÷ (4x − 3)?",
      "choices": [
        "{−2}",
        "{3/4}",
        "{−2, 3/4}",
        "{ }"
      ],
      "topic": "Rational & Radical",
      "correct": 0,
      "explanation": "Multiplying both sides by x(4x − 3) gives 4x^2 + 2(4x − 3) = 3x, which simplifies to 4x^2 + 5x − 6 = 0, or (4x − 3)(x + 2) = 0, so x = 3/4 or x = −2. But x = 3/4 makes the denominator 4x − 3 equal 0, so it is extraneous, leaving {−2}.",
      "subTopic": "Rational Expressions & Equations"
    },
    {
      "number": 12,
      "part": "A",
      "text": "The cubic polynomial function b(x) is graphed. Which statement is true for this function?",
      "choices": [
        "The leading coefficient of this function is negative.",
        "A real root is repeated since it has a multiplicity greater than 1.",
        "The function is increasing over the domain −3 < x < 1.",
        "As x → −∞, b(x) → ∞."
      ],
      "topic": "Polynomial Functions",
      "correct": 1,
      "explanation": "The graph touches the x-axis and turns around at one of its zeros rather than crossing it, which happens exactly when a real root is repeated (multiplicity greater than 1). The end behavior and increasing/decreasing intervals shown rule out the other statements.",
      "subTopic": "Polynomial Graphs, Zeros & Conics"
    },
    {
      "number": 13,
      "part": "A",
      "text": "Consider a diagram where θ is an angle in standard position with its terminal side in Quadrant IV, and 0 ≤ θ < 2π. Which value could represent the radian measure of θ?",
      "choices": [
        "5π/6",
        "5π/3",
        "4π/3",
        "−π/3"
      ],
      "topic": "Trigonometric Functions",
      "correct": 1,
      "explanation": "An angle terminating in Quadrant IV must measure between 3π/2 and 2π. Only 5π/3 falls in that range; 5π/6 is in Quadrant II, 4π/3 is in Quadrant III, and −π/3 is not in the required interval 0 ≤ θ < 2π.",
      "subTopic": "Unit Circle & Radians"
    },
    {
      "number": 14,
      "part": "A",
      "text": "The graph of the sinusoidal function f(x) is shown, with a maximum of 5 over the interval −2π ≤ x ≤ 2π. The function g is defined by the equation g(x) = 2sin(3x). Which statement is true?",
      "choices": [
        "f has a greater maximum and a higher frequency than g.",
        "f has a smaller maximum and a higher frequency than g.",
        "f has a greater maximum and a lower frequency than g.",
        "f has a smaller maximum and a lower frequency than g."
      ],
      "topic": "Trigonometric Functions",
      "correct": 2,
      "explanation": "The graphed function f reaches a maximum of 5, greater than g's maximum of 2 (amplitude 2). Since g(x) = 2sin(3x) completes 3 cycles in 2π while f completes fewer cycles over the same interval, f has a lower frequency than g.",
      "subTopic": "Trig Graphs"
    },
    {
      "number": 15,
      "part": "A",
      "text": "The expression (1 ÷ x^2)^(−3/4), x ≠ 0, is equivalent to",
      "choices": [
        "(⁴√(x^2))^3",
        "(³√(x^2))^4",
        "(⁴√(1 ÷ x^2))^3",
        "(³√(1 ÷ x^2))^4"
      ],
      "topic": "Rational & Radical",
      "correct": 0,
      "explanation": "The negative exponent flips the fraction: (1/x^2)^(−3/4) = (x^2)^(3/4). A 3/4 power means the fourth root raised to the third power, so this equals (⁴√(x^2))^3 = x^(3/2).",
      "subTopic": "Radical Expressions & Equations"
    },
    {
      "number": 16,
      "part": "A",
      "text": "The expression 3xy − 27x^3y^3 is equivalent to",
      "choices": [
        "3xy(1 + 9x^2y^2)",
        "3xy(1 + 9xy)(1 − 9xy)",
        "3xy(1 + xy)(1 − xy)",
        "3xy(1 + 3xy)(1 − 3xy)"
      ],
      "topic": "Polynomial Functions",
      "correct": 3,
      "explanation": "Factor out the GCF: 3xy − 27x^3y^3 = 3xy(1 − 9x^2y^2). The remaining factor is a difference of squares, 1 − (3xy)^2 = (1 + 3xy)(1 − 3xy), giving 3xy(1 + 3xy)(1 − 3xy).",
      "subTopic": "Polynomial Operations & Factoring"
    },
    {
      "number": 17,
      "part": "A",
      "text": "If f(x) = (x^2 + x + 3) and g(x) = (x^2 − 8x + 1), then f(x) · g(x) is equal to",
      "choices": [
        "x^4 − 9x^3 − 4x^2 − 23x + 3",
        "x^4 − 7x^3 + 5x^2 − 23x + 3",
        "x^4 − 7x^3 − 4x^2 − 25x + 3",
        "x^4 − 7x^3 − 4x^2 − 23x + 3"
      ],
      "topic": "Polynomial Functions",
      "correct": 3,
      "explanation": "Distribute each term: (x^2 + x + 3)(x^2 − 8x + 1) = x^4 − 8x^3 + x^2 + x^3 − 8x^2 + x + 3x^2 − 24x + 3. Combining like terms gives x^4 − 7x^3 − 4x^2 − 23x + 3.",
      "subTopic": "Polynomial Operations & Factoring"
    },
    {
      "number": 18,
      "part": "A",
      "text": "Researchers want to see if drivers are more distracted by talking on a cell phone than talking to a passenger. From a group of 100 college students, half were randomly assigned to drive in a simulator while talking on a cell phone. The other half drove in a simulator while talking to a passenger. Researchers recorded whether or not the drivers safely exited a simulated highway at the designated exit. Is this an observational study?",
      "choices": [
        "No, because researchers randomly assigned a treatment on students.",
        "Yes, because the researchers observed what students were doing while driving.",
        "No, because the researchers should have randomly assigned some students to drive without talking.",
        "Yes, because the students were divided into two groups of equal size."
      ],
      "topic": "Statistics & Probability",
      "correct": 0,
      "explanation": "Because the researchers randomly assigned each student to a treatment (cell phone or passenger), this is an experiment, not an observational study. In an observational study, researchers record data without imposing any treatment.",
      "subTopic": "Data Analysis"
    },
    {
      "number": 19,
      "part": "A",
      "text": "If f(x) = 3^x, then f⁻¹(x) equals",
      "choices": [
        "log_3(x)",
        "log_3(3)",
        "3^(−x)",
        "x^3"
      ],
      "topic": "Exponential & Logarithmic",
      "correct": 0,
      "explanation": "The inverse of an exponential function is the logarithm with the same base. Swapping x and y in y = 3^x gives x = 3^y, and solving for y yields y = log_3(x).",
      "subTopic": "Logarithms"
    },
    {
      "number": 20,
      "part": "A",
      "text": "Given f(x) = |x + 1| − 2 and g(x) = −∛(x − 3), what are the solutions to the equation f(x) = g(x)?",
      "choices": [
        "{−3, 1, 3}",
        "{2, 3}",
        "{−5, 2}",
        "{−5, 1, 2}"
      ],
      "topic": "Rational & Radical",
      "correct": 2,
      "explanation": "Check x = −5: f(−5) = |−4| − 2 = 2 and g(−5) = −∛(−8) = 2, so it works. Check x = 2: f(2) = |3| − 2 = 1 and g(2) = −∛(−1) = 1, so it also works. The graphs intersect only at these two points, so the solution set is {−5, 2}.",
      "subTopic": "Radical Expressions & Equations"
    },
    {
      "number": 21,
      "part": "A",
      "text": "The expression 3xi^2 − 2yi^3 + 7xi^6 − 4yi^5, in simplest a + bi form, is",
      "choices": [
        "−10x − 2yi",
        "10x + 2yi",
        "10x − 6y",
        "4xyi^16"
      ],
      "topic": "Complex Numbers",
      "correct": 0,
      "explanation": "Using the powers of i: i^2 = −1, i^3 = −i, i^5 = i, i^6 = −1. So the expression becomes −3x + 2yi − 7x − 4yi = −10x − 2yi.",
      "subTopic": "Complex Operations"
    },
    {
      "number": 22,
      "part": "A",
      "text": "Which values of a and b will make the function f(x) = sin(ax) + b an odd function?",
      "choices": [
        "a = 1, b = 0",
        "a = 1, b = 4",
        "a = 3, b = 1",
        "a = 3, b = 4"
      ],
      "topic": "Trigonometric Functions",
      "correct": 0,
      "explanation": "An odd function satisfies f(−x) = −f(x). Since sin(−ax) = −sin(ax), the sine term is odd for any a, but adding a nonzero constant b breaks the symmetry because −f(x) would require −b = b. So b must be 0, making a = 1, b = 0 correct.",
      "subTopic": "Trig Graphs"
    },
    {
      "number": 23,
      "part": "A",
      "text": "When solved for x, what is the solution to the equation a(10^x) = 60, where a > 1?",
      "choices": [
        "x = log(60) ÷ a",
        "x = log(60) ÷ log(10a)",
        "x = log(60)",
        "x = log(60 ÷ a)"
      ],
      "topic": "Exponential & Logarithmic",
      "correct": 3,
      "explanation": "Divide both sides by a to isolate the exponential: 10^x = 60/a. Taking the common logarithm of both sides gives x = log(60 ÷ a).",
      "subTopic": "Logarithms"
    },
    {
      "number": 24,
      "part": "A",
      "text": "Potassium-42 is a radioisotope of potassium that has a half-life of 12.4 hours. Which expression approximates the amount of a 500-gram sample of potassium-42 remaining after t hours?",
      "choices": [
        "500(0.1670)^t",
        "500(0.9456)^t",
        "500(1.0575)^t",
        "500(1.5609)^t"
      ],
      "topic": "Exponential & Logarithmic",
      "correct": 1,
      "explanation": "The half-life model is 500(1/2)^(t/12.4), which can be rewritten with an hourly base: (1/2)^(1/12.4) ≈ 0.9456. So the amount remaining is approximately 500(0.9456)^t.",
      "subTopic": "Exponential Models"
    }
  ]
}
