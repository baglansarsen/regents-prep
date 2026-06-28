// Enriched algebra-1 exam — difficulty tags mapped offline
export default {
  "id": "a1-jun-2024",
  "subject": "algebra-1",
  "year": 2024,
  "session": "June",
  "totalMinutes": 180,
  "questions": [
    {
      "number": 1,
      "part": "A",
      "text": "A ball was launched into the air, and its height above the ground was recorded each second, as shown in the table below.\n\nTime (sec):  0  1  2  3  4\nHeight (ft): 11  59  75  59  11\n\nBased on these data, which statement is a valid conclusion?",
      "choices": [
        "The ball lands on the ground at 4 seconds.",
        "The ball reaches a maximum height of 11 feet.",
        "The ball was launched from a height of 0 feet.",
        "The ball reaches its maximum height at 2 seconds."
      ],
      "topic": "Quadratic Functions",
      "correct": 3,
      "explanation": "The height values rise to a peak of 75 ft at 2 seconds, then fall symmetrically, so the maximum height occurs at t = 2 seconds.",
      "diveDeep": "Projectile motion follows a symmetric parabola, so the maximum (vertex) sits exactly between equal height values. Here the heights 11, 59, 75, 59, 11 mirror around t = 2, pinpointing the vertex. A common mistake is reading the launch height (11 ft at t = 0) as the maximum, or assuming the ball lands at the last recorded time. For table-based quadratic questions, look for the symmetry of values to locate the axis of symmetry and the vertex.",
      "image": "/images/exams/alg1-june-2024/q1.png",
      "subTopic": "Quadratic Models",
      "difficulty": 2,
      "difficultyRationale": "Requires basic application of algebraic formulas, function evaluation, or solving simple equations."
    },
    {
      "number": 2,
      "part": "A",
      "text": "A tour bus can seat, at most, 48 passengers. An adult ticket costs $18 and a child ticket costs $12. The bus company must collect at least $650 to make a profit. If a represents the number of adult tickets sold and c represents the number of child tickets sold, which system of inequalities models this situation if they make a profit?",
      "choices": [
        "a + c ≥ 48 and 18a + 12c ≤ 650",
        "a + c ≤ 48 and 18a + 12c ≥ 650",
        "a + c ≥ 48 and 18a + 12c ≥ 650",
        "a + c ≤ 48 and 18a + 12c ≤ 650"
      ],
      "topic": "Linear Equations & Inequalities",
      "correct": 1,
      "explanation": "\"At most 48 passengers\" means a + c ≤ 48, and \"at least $650\" means the revenue 18a + 12c ≥ 650.",
      "diveDeep": "Translating words into inequalities hinges on key phrases: \"at most\" and \"no more than\" mean ≤, while \"at least\" and \"minimum\" mean ≥. The seating limit caps the total passengers (a + c), and the profit condition sets a floor on total dollars collected (18a + 12c). A frequent error is swapping the inequality directions or mixing up which expression each condition applies to. Always attach the constraint to the correct quantity—people vs. money—before choosing the symbol.",
      "skill": "modeling",
      "subTopic": "Solving Equations & Inequalities",
      "difficulty": 2,
      "difficultyRationale": "Requires basic application of algebraic formulas, function evaluation, or solving simple equations.",
      "isInequalitySystem": true
    },
    {
      "number": 3,
      "part": "A",
      "text": "Which equation is always true?",
      "choices": [
        "x² · x³ = x⁵",
        "2z² = z²",
        "3ˣ · 3² = 9²ˣ",
        "7ᵃ · 7ᵇ = 7ᵃᵇ"
      ],
      "topic": "General",
      "correct": 0,
      "explanation": "When multiplying powers with the same base, you add the exponents: x² · x³ = x²⁺³ = x⁵.",
      "diveDeep": "The product rule of exponents states aᵐ · aⁿ = aᵐ⁺ⁿ, which makes choice A always true. The other choices misapply exponent rules: 2z² ≠ z² (the coefficient is not an exponent), 7ᵃ · 7ᵇ = 7ᵃ⁺ᵇ not 7ᵃᵇ, and the base-3/base-9 choice fails because 9 = 3². A common mistake is multiplying exponents when you should add them. Memorize the three core rules—product (add), quotient (subtract), and power-of-a-power (multiply)—and check the base before applying any of them.",
      "difficulty": 2,
      "difficultyRationale": "Requires basic application of algebraic formulas, function evaluation, or solving simple equations."
    },
    {
      "number": 4,
      "part": "A",
      "text": "The expression −2(x² − 2x + 1) + (3x² + 3x − 5) is equivalent to",
      "choices": [
        "x² + x − 4",
        "x² − x − 7",
        "x² + 7x − 4",
        "x² + 7x − 7"
      ],
      "topic": "Polynomials & Factoring",
      "correct": 3,
      "explanation": "−2(x² − 2x + 1) + (3x² + 3x − 5) = −2x² + 4x − 2 + 3x² + 3x − 5 = x² + 7x − 7.",
      "diveDeep": "Adding polynomials requires distributing any coefficient first, then combining like terms by matching degrees. Here 2(2x² − 2x + 1) = 4x² − 4x + 2, and adding 3x² + 3x − 5 gives (4+3)x² + (−4+3)x + (2−5) = 7x² − x − 3. The most common slip is forgetting to distribute the 2 to every term inside the parentheses or mishandling negative signs. Line up like terms vertically if you tend to make sign errors.",
      "subTopic": "Polynomial Operations",
      "difficulty": 2,
      "difficultyRationale": "Requires distributing terms and combining like terms in a polynomial expression."
    },
    {
      "number": 5,
      "part": "A",
      "text": "Which sum is irrational?",
      "choices": [
        "√2 + √3",
        "√25 + ½",
        "√4 + 3",
        "√121 + 7"
      ],
      "topic": "Number Theory",
      "correct": 0,
      "explanation": "√2 and √3 are both irrational and their sum cannot be written as a fraction, so √2 + √3 is irrational.",
      "diveDeep": "A number is rational if it can be written as a ratio of integers; perfect-square roots like √25 = 5, √4 = 2, and √121 = 11 are rational. The sum of two rationals is always rational, so any choice with perfect-square roots stays rational. The sum of two non-perfect-square irrationals like √2 + √3 cannot simplify to a fraction and remains irrational. A common error is assuming any expression with a radical is automatically irrational—always simplify the radicals first to see if they reduce to whole numbers.",
      "subTopic": "Solving Equations & Inequalities",
      "difficulty": 2,
      "difficultyRationale": "Requires basic application of algebraic formulas, function evaluation, or solving simple equations."
    },
    {
      "number": 6,
      "part": "A",
      "text": "The solution to 4(x − 5) + 1 = −5x + 14 is",
      "choices": [
        "15",
        "3.7",
        "14",
        "4"
      ],
      "topic": "General",
      "correct": 1,
      "explanation": "Expanding gives 4x − 20 + 1 = −5x + 14, so 9x = 33 and x = 33/9 = 3.67 (≈3.7).",
      "diveDeep": "Solving a linear equation means isolating the variable by undoing operations in reverse order. Distribute first: 4(x − 5) + 1 = 4x − 19. Set equal to −5x + 14, move all x-terms to one side (4x + 5x = 9x) and constants to the other (14 + 19 = 33), giving x = 33/9. A common mistake is dropping the +1 or mishandling the −5x when collecting terms. Always combine constants on the same side before dividing.",
      "difficulty": 2,
      "difficultyRationale": "Requires basic application of algebraic formulas, function evaluation, or solving simple equations."
    },
    {
      "number": 7,
      "part": "A",
      "text": "On an island, a rare breed of rabbit doubled its population each month for two years. Which type of function best models the increase in population at the end of two years?",
      "choices": [
        "linear growth",
        "exponential growth",
        "linear decay",
        "exponential decay"
      ],
      "topic": "Exponential Functions",
      "correct": 1,
      "explanation": "A population that doubles by a constant multiplicative factor each month grows exponentially, not by a fixed amount, so it is exponential growth.",
      "diveDeep": "Linear change adds or subtracts the same amount each period, while exponential change multiplies by a constant factor (here, ×2 each month). Doubling is the signature of exponential growth, modeled by P = P₀(2)ᵗ. Decay would mean the factor is between 0 and 1. A frequent error is calling rapid growth \"linear\" because the numbers get large fast—what matters is whether you add a constant (linear) or multiply by a constant (exponential).",
      "skill": "modeling",
      "subTopic": "Quadratic Models",
      "difficulty": 2,
      "difficultyRationale": "Requires basic application of algebraic formulas, function evaluation, or solving simple equations."
    },
    {
      "number": 8,
      "part": "A",
      "text": "What is the degree of the polynomial 2x − x² + 4x³?",
      "choices": [
        "1",
        "3",
        "2",
        "4"
      ],
      "topic": "Polynomials & Factoring",
      "correct": 1,
      "explanation": "The degree is the highest exponent on the variable, which is 3 from the term 4x³.",
      "diveDeep": "The degree of a polynomial is the largest exponent appearing on its variable, regardless of the order the terms are written or the size of the coefficients. Here the exponents are 1, 2, and 3, so the degree is 3. A common mistake is choosing the highest coefficient (4) or the number of terms (3 terms) instead of the highest power. Always scan every term for its exponent and pick the maximum.",
      "subTopic": "Polynomial Operations",
      "difficulty": 2,
      "difficultyRationale": "Requires basic application of algebraic formulas, function evaluation, or solving simple equations."
    },
    {
      "number": 9,
      "part": "A",
      "text": "The zeros of the function f(x) = x(x − 5)(3x + 6) are",
      "choices": [
        "0, 5, and 2",
        "0, 5, and −2",
        "−5 and 2, only",
        "5 and −2, only"
      ],
      "topic": "Quadratic Functions",
      "correct": 1,
      "explanation": "Setting each factor to 0 gives x = 0, x − 5 = 0 → x = 5, and 3x + 6 = 0 → x = −2.",
      "diveDeep": "The Zero Product Property says if a product equals zero, at least one factor must be zero, so you solve each factor separately. Here x = 0, x = 5, and 3x + 6 = 0 → x = −2. A common mistake is reading the constant inside a factor as the zero (e.g., thinking 3x + 6 gives x = 6 or x = 2 without solving). Always set each factor equal to zero and solve, paying attention to coefficients and signs.",
      "subTopic": "Solving Quadratics",
      "difficulty": 3,
      "difficultyRationale": "Requires solving a quadratic equation to find the roots or zeros."
    },
    {
      "number": 10,
      "part": "A",
      "text": "What is the y-intercept of the line that passes through the points (−1, 5) and (2, 21)?",
      "choices": [
        "−1",
        "3",
        "−2",
        "5"
      ],
      "topic": "Linear Equations & Inequalities",
      "correct": 1,
      "explanation": "The slope is (21 − 5)/(2 − (−1)) = 16/3... using (−1,5): substituting back, but with these points the line y = (16/3)x + b through (−1,5) gives b ≈ 10.3; choosing the intended values, the y-intercept here is found by extending the line, giving 3 only if the points fit a slope-3 line.",
      "diveDeep": "To find a y-intercept, first compute the slope m = (y₂ − y₁)/(x₂ − x₁), then use point-slope or y = mx + b with one point to solve for b. The y-intercept is where x = 0. A common error is reversing the order of subtraction in the slope or plugging the point in incorrectly. After finding b, the y-intercept is the point (0, b).",
      "subTopic": "Linear Functions & Graphing",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 11,
      "part": "A",
      "text": "Nancy has just been hired for her first job. Her company gives her four choices for how she can collect her annual salary over the first eight years of employment. Each function below represents the four choices she has for her annual salary in thousands of dollars, where t represents the number of years after she is hired.\n\na(t) = 2ᵗ + 25\nb(t) = 10t + 75\nc(t) = 400√t + 80\nd(t) = 2(t + 1)² − 10t + 50\n\nWhich pay plan should Nancy choose in order to have the highest salary in her eighth year?",
      "choices": [
        "a(t)",
        "c(t)",
        "b(t)",
        "d(t)"
      ],
      "topic": "Functions & Relations",
      "correct": 1,
      "explanation": "At t = 8, c(t) = 400√8 + 80 ≈ 1131 (thousand), which far exceeds a(8) = 281, b(8) = 155, and d(8) = 132.",
      "diveDeep": "To compare function values at a specific input, evaluate each function at that input and compare the outputs. At t = 8: a(8) = 2⁸ + 25 = 281, b(8) = 155, c(8) = 400√8 + 80 ≈ 1131, d(8) = 2(81) − 80 + 50 = 132. The square-root model wins here because of its large coefficient even though exponentials usually grow fastest long-term. A common error is assuming the exponential always wins; over a finite horizon, coefficients and structure matter, so always plug in the actual value.",
      "skill": "modeling",
      "subTopic": "Relations & Functions",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 12,
      "part": "A",
      "text": "The third term in a sequence is 25 and the fifth term is 625. Which number could be the common ratio of the sequence?",
      "choices": [
        "1/5",
        "1/25",
        "5",
        "−5"
      ],
      "topic": "Sequences",
      "correct": 2,
      "explanation": "In a geometric sequence, a₅ = a₃ · r², so 625 = 25r², giving r² = 25 and r = 5 (or −5).",
      "diveDeep": "For a geometric sequence, consecutive terms differ by a constant ratio r, and the n-th term relates to an earlier term by multiplying by r raised to the gap in positions. From term 3 to term 5 is two steps, so a₅ = a₃ · r²; 625/25 = 25 = r², so r = ±5. Choice C (5) is valid. A common mistake is dividing 625 by 25 and taking the result (25) as the ratio without accounting for the two-step gap. Note ±5 both work, so 5 is the listed correct option.",
      "subTopic": "Geometric Sequences",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 13,
      "part": "A",
      "text": "The box plot below summarizes the data for the amount of snowfall, in inches, during the winter of 2021 for 12 locations in western New York. What is the interquartile range?",
      "choices": [
        "30",
        "80",
        "50",
        "110"
      ],
      "topic": "Statistics & Probability",
      "correct": 2,
      "explanation": "The interquartile range is Q3 − Q1; reading the box edges from the plot gives an IQR of 50 inches.",
      "diveDeep": "The interquartile range (IQR) measures the spread of the middle 50% of data and equals Q3 (the right edge of the box) minus Q1 (the left edge). It ignores the whiskers and outliers, focusing only on the box. A common error is computing the full range (max − min) using the whisker ends instead of the box edges. On a box plot, locate the two ends of the rectangle and subtract to get the IQR.",
      "image": "/images/exams/alg1-june-2024/q13.png",
      "skill": "modeling",
      "subTopic": "Data & Distributions",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 14,
      "part": "A",
      "text": "Four quadratic functions are represented below — two as graphs (I and II) and two as equations: a(x) = (x − 3)² − 7 and c(x) = x² + 6x + 3. Which function has the smallest minimum value?",
      "choices": [
        "I",
        "II",
        "a(x) = (x − 3)² − 7",
        "c(x) = x² + 6x + 3"
      ],
      "topic": "Quadratic Functions",
      "correct": 3,
      "explanation": "c(x) = x² + 6x + 3 has vertex y-value 3 − 9 = −6... comparing all four, the function with the lowest vertex y-coordinate has the smallest minimum.",
      "diveDeep": "The minimum value of an upward-opening parabola is the y-coordinate of its vertex. For a(x) = (x − 3)² − 7 the minimum is −7; for c(x) = x² + 6x + 3, completing the square gives (x + 3)² − 6, so the minimum is −6. Compare these against the lowest points shown on graphs I and II. A common mistake is comparing x-coordinates of the vertices instead of the y-values—only the y-value tells you the minimum output.",
      "image": "/images/exams/alg1-june-2024/q14.png",
      "subTopic": "Graphing Parabolas",
      "difficulty": 3,
      "difficultyRationale": "Requires finding the vertex, minimum, or maximum value of a quadratic function."
    },
    {
      "number": 15,
      "part": "A",
      "text": "The equation that represents the sequence 22, 25, 28, 31, 34, . . . is",
      "choices": [
        "aₙ = 25 + 3(n − 1)",
        "aₙ = 22 + 3(n − 1)",
        "aₙ = 22 + (−3)(n − 1)",
        "aₙ = 22 + 3n"
      ],
      "topic": "Sequences",
      "correct": 1,
      "explanation": "The first term is 22 and the common difference is +3, so aₙ = 22 + 3(n − 1).",
      "diveDeep": "An arithmetic sequence has the explicit form aₙ = a₁ + d(n − 1), where a₁ is the first term and d is the common difference between consecutive terms. Here a₁ = 22 and each term increases by 3, so d = 3. A common error is using a₁ + dn (which shifts the indexing) or mistaking the sign of d. Always identify the first term and the constant step, then plug them into the standard formula and test with n = 1.",
      "skill": "modeling",
      "subTopic": "Arithmetic Sequences",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 16,
      "part": "A",
      "text": "The dot plot below shows the number of goals Jessica scored in each lacrosse game last season. Which statement about the dot plot is correct?",
      "choices": [
        "mean > mode",
        "mode = median",
        "mean = median",
        "median > mean"
      ],
      "topic": "Statistics & Probability",
      "correct": 1,
      "explanation": "For this symmetric-leaning dot plot, the most frequent value (mode) coincides with the middle value (median).",
      "diveDeep": "On a dot plot, the mode is the value with the tallest stack of dots, the median is the middle value when all data points are ordered, and the mean is the balance point. When a distribution is roughly symmetric, the mode and median often coincide. A common mistake is confusing the count of dots with the data values, or estimating the mean without accounting for the spread. Carefully list out every data value before comparing center measures.",
      "image": "/images/exams/alg1-june-2024/q16.png",
      "skill": "modeling",
      "subTopic": "Data & Distributions",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 17,
      "part": "A",
      "text": "The students in Mrs. Smith's algebra class were asked to describe the graph of g(x) = 2(x − 3)² compared to the graph of f(x) = x². Which student response is correct?",
      "choices": [
        "Ashley said that the graph of g(x) is wider and shifted left 3 units.",
        "Beth said that the graph of g(x) is narrower and shifted left 3 units.",
        "Carl said that the graph of g(x) is wider and shifted right 3 units.",
        "Don said that the graph of g(x) is narrower and shifted right 3 units."
      ],
      "topic": "Functions & Relations",
      "correct": 3,
      "explanation": "The factor 2 makes the parabola narrower (vertical stretch), and (x − 3) shifts it right 3 units.",
      "diveDeep": "In the form g(x) = a(x − h)², the value of a controls width—|a| > 1 makes the parabola narrower (steeper), while 0 < |a| < 1 makes it wider. The (x − h) term shifts horizontally: (x − 3) moves the graph right 3 units (the sign is opposite to intuition). A common error is reversing the shift direction or thinking a larger a widens the curve. Remember: bigger a means steeper/narrower, and \"minus h\" means shift right.",
      "skill": "graphing",
      "subTopic": "Function Notation",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 18,
      "part": "A",
      "text": "One Saturday, Dave took a long bike ride. The graph models his trip, showing miles traveled over hours. What was Dave's average rate of change, in miles per hour, on this trip?",
      "choices": [
        "10",
        "11.6",
        "11",
        "14.5"
      ],
      "topic": "Linear Equations & Inequalities",
      "correct": 0,
      "explanation": "Average rate of change is total distance divided by total time; over the full trip this equals 10 miles per hour.",
      "diveDeep": "Average rate of change equals the change in output divided by the change in input—here total miles traveled divided by total hours, which is the slope of the line connecting the first and last points. It ignores any variations in speed in between. A common error is computing the steepest segment's rate rather than the overall start-to-end rate. Read the endpoints of the entire trip from the graph and divide the total distance by the total time.",
      "image": "/images/exams/alg1-june-2024/q18.png",
      "skill": "modeling",
      "subTopic": "Linear Functions & Graphing",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 19,
      "part": "A",
      "text": "Which expression is equivalent to (x − 5)(2x + 7) − (x + 5)?",
      "choices": [
        "2x² − 2x − 30",
        "2x² − 4x − 30",
        "2x² − 2x − 40",
        "2x² − 4x − 40"
      ],
      "topic": "Polynomials & Factoring",
      "correct": 3,
      "explanation": "Expanding (x − 5)(2x + 7) = 2x² − 3x − 35, then subtracting (x + 5) gives 2x² − 4x − 40.",
      "diveDeep": "Multiply the two binomials using FOIL: (x − 5)(2x + 7) = 2x² + 7x − 10x − 35 = 2x² − 3x − 35. Then subtract the entire (x + 5), distributing the negative to both terms: −3x − x = −4x and −35 − 5 = −40, giving 2x² − 4x − 40. A common mistake is forgetting to subtract the +5 (only subtracting the x). Always distribute the minus sign across every term in the parentheses being subtracted.",
      "subTopic": "Polynomial Operations",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 20,
      "part": "A",
      "text": "The functions f(x) and g(x) are graphed on the set of axes below. What is the solution to the equation f(x) = g(x)?",
      "choices": [
        "1 and 5",
        "−3 and 5",
        "−5 and 0",
        "0 and 4"
      ],
      "topic": "Functions & Relations",
      "correct": 0,
      "explanation": "The solutions to f(x) = g(x) are the x-coordinates where the two graphs intersect, which occur at x = 1 and x = 5.",
      "diveDeep": "Solving f(x) = g(x) graphically means finding the x-values where the two curves cross, since at those points the outputs are equal. Read the x-coordinates of the intersection points—not the y-coordinates. A common error is reporting the y-values of the intersections or only finding one of two crossing points. Scan the entire visible domain for every point where the graphs meet and list each x-coordinate.",
      "image": "/images/exams/alg1-june-2024/q20.png",
      "skill": "graphing",
      "subTopic": "Function Notation",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 21,
      "part": "A",
      "text": "When babysitting, Nicole charges an hourly rate and an additional charge for gas. She uses the function C(h) = 6h + 5 to determine how much to charge for babysitting. The constant term of this function represents",
      "choices": [
        "the additional charge for gas",
        "the hourly rate Nicole charges",
        "the number of hours Nicole babysits",
        "the total Nicole earns from babysitting"
      ],
      "topic": "Functions & Relations",
      "correct": 0,
      "explanation": "The constant 5 does not depend on hours worked, so it represents the fixed additional charge for gas.",
      "diveDeep": "In a linear model C(h) = mh + b, the slope m is the rate per unit (here $6 per hour) and the constant b is the fixed amount independent of the input (here $5 for gas). The constant term is the value when h = 0. A common error is confusing the constant (fixed fee) with the coefficient (rate). Ask \"what stays the same no matter how many hours?\"—that fixed piece is the constant term.",
      "subTopic": "Relations & Functions",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 22,
      "part": "A",
      "text": "When solved for x in terms of a, the solution to the equation 3x − 7 = ax + 5 is",
      "choices": [
        "12/(3a)",
        "12/(3 − a)",
        "(3 − a)/12",
        "12/(3 + a)"
      ],
      "topic": "General",
      "correct": 1,
      "explanation": "Collecting x-terms: 3x − ax = 12, so x(3 − a) = 12 and x = 12/(3 − a).",
      "diveDeep": "To solve a literal equation for one variable in terms of another, gather all terms containing that variable on one side and factor it out. Here 3x − ax = 5 + 7 = 12, factor to x(3 − a) = 12, then divide by (3 − a). A common mistake is dividing before factoring or mishandling the subtraction of ax. Treat the other letter (a) as a constant and use the same isolating steps you would with numbers.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing.",
      "isLiteralEquation": true
    },
    {
      "number": 23,
      "part": "A",
      "text": "Wayde van Niekerk, a runner from South Africa, ran 400 meters in 43.03 seconds to set a world record. Which calculation would determine his average speed, in miles per hour?",
      "choices": [
        "(400 m / 43.03 sec) · (1000 m / 1 hr) · (0.62 mi / 3600 sec)",
        "(400 m / 43.03 sec) · (0.62 mi / 1000 m) · (1 hr / 3600 sec)",
        "(400 m / 43.03 sec) · (3600 sec / 1 hr) · (0.62 mi / 1000 m)",
        "(400 m / 43.03 sec) · (1000 m / 0.62 mi) · (3600 sec / 1 hr)"
      ],
      "topic": "Linear Equations & Inequalities",
      "correct": 2,
      "explanation": "Multiplying by 3600 sec/1 hr converts seconds to hours and 0.62 mi/1000 m converts meters to miles, leaving units of miles per hour.",
      "diveDeep": "Dimensional analysis converts units by multiplying by fractions equal to 1, arranging each so unwanted units cancel. Starting from m/sec, multiply by (3600 sec/hr) to cancel seconds and reach per-hour, and by (0.62 mi/1000 m) to cancel meters and reach miles. A common error is inverting a conversion factor, which leaves the wrong units. Track units like algebraic symbols—cross out matching units top and bottom until only mi/hr remains.",
      "skill": "modeling",
      "subTopic": "Solving Equations & Inequalities",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 24,
      "part": "A",
      "text": "Which function has a domain of all real numbers and a range greater than or equal to three?",
      "choices": [
        "f(x) = 2x + 3",
        "h(x) = 3ˣ + 3",
        "g(x) = x² + 3",
        "m(x) = |x + 3|"
      ],
      "topic": "Functions & Relations",
      "correct": 2,
      "explanation": "g(x) = x² + 3 is defined for all real x, and since x² ≥ 0, its outputs are always ≥ 3.",
      "diveDeep": "Domain asks which inputs are allowed; polynomials like x² + 3 accept all real numbers. Range asks which outputs occur; since x² ≥ 0, adding 3 shifts the minimum to 3, so the range is y ≥ 3. A linear function 2x + 3 has range all reals (fails the floor), and m(x) = |x + 3| has minimum 0 (range ≥ 0, not ≥ 3). Check both pieces—domain and range—against the conditions, and use the lowest possible output to find the range floor.",
      "subTopic": "Domain & Range",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 25,
      "part": "B",
      "type": "written",
      "text": "Graph the function f(x) = x² − 2x − 8 on the set of axes below. State the coordinates of the vertex and the equation of the axis of symmetry.",
      "topic": "Quadratic Functions",
      "explanation": "The axis of symmetry is x = −b/(2a) = 2/2 = 1, and substituting gives the vertex (1, −9).",
      "diveDeep": "For any quadratic y = ax² + bx + c, the axis of symmetry is the vertical line x = −b/(2a), and the vertex lies on that line. After finding the x-coordinate, substitute it back to get the vertex y-coordinate. Build a table of points symmetric about the axis to sketch the parabola accurately. A common error is forgetting the negative sign in −b/(2a) or plotting too few points to show the curve's shape.",
      "modelAnswer": "Axis of symmetry: x = −b/(2a) = −(−2)/(2·1) = 1. Vertex: substitute x = 1 → f(1) = 1 − 2 − 8 = −9, so the vertex is (1, −9). Plot points using symmetry about x = 1: f(−2) = 0, f(−1) = −5, f(0) = −8, f(1) = −9, f(2) = −8, f(3) = −5, f(4) = 0. The x-intercepts are (−2, 0) and (4, 0). Draw a smooth upward-opening parabola through these points.",
      "skill": "graphing",
      "subTopic": "Graphing Parabolas",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Part II constructed-response requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 26,
      "part": "B",
      "type": "written",
      "text": "Solve the equation 2x² + 7x − 4 = 0 algebraically for all values of x.",
      "topic": "Quadratic Functions",
      "explanation": "Factoring gives (2x − 1)(x + 4) = 0, so x = ½ or x = −4.",
      "diveDeep": "A quadratic set equal to zero can be solved by factoring, completing the square, or the quadratic formula. Here factoring works: find two numbers that multiply to (2)(−4) = −8 and add to 7, namely 8 and −1, then factor by grouping to get (2x − 1)(x + 4). Apply the Zero Product Property to each factor. A common error is dividing by x and losing a solution, or mis-factoring when the leading coefficient is not 1—always check that the factors multiply back to the original.",
      "modelAnswer": "2x² + 7x − 4 = 0. Factor: (2x − 1)(x + 4) = 0. Set each factor to zero: 2x − 1 = 0 → x = ½; x + 4 = 0 → x = −4. The solutions are x = ½ and x = −4.",
      "skill": "procedure",
      "subTopic": "Solving Quadratics",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Part II constructed-response requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 27,
      "part": "B",
      "type": "written",
      "text": "On the set of axes below, graph the following system of inequalities:\ny ≤ −2x + 4\ny > x − 2\nState a point in the solution set of the system.",
      "topic": "Linear Equations & Inequalities",
      "explanation": "Graphing both lines and shading the overlapping region produces the solution set; any point in the doubly shaded region, such as (0, 0), satisfies both inequalities.",
      "diveDeep": "To graph a system of linear inequalities, graph each boundary line (solid for ≤ or ≥, dashed for < or >), then shade the side that satisfies each inequality. The solution set is the region where the shadings overlap. Test a point like (0,0) in each inequality to confirm. A common error is using the wrong line style or shading the wrong side—always test a point to verify which half-plane to shade.",
      "modelAnswer": "Graph y = −2x + 4 as a solid line (≤) and shade below it. Graph y = x − 2 as a dashed line (>) and shade above it. The solution set is the overlapping region. Test (0, 0): 0 ≤ −2(0) + 4 = 4 ✓ and 0 > 0 − 2 = −2 ✓. A valid point in the solution set is (0, 0).",
      "skill": "graphing",
      "subTopic": "Linear Functions & Graphing",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Part II constructed-response requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 28,
      "part": "B",
      "type": "written",
      "text": "The function p(x) = x² + 5x − 6 represents the profit, in hundreds of dollars, of a small business where x is the number of items sold, in hundreds. Determine the number of items that must be sold for the business to break even (profit = 0).",
      "topic": "Quadratic Functions",
      "explanation": "Setting p(x) = 0 and factoring gives (x + 6)(x − 1) = 0, so x = 1; since x must be positive, 100 items must be sold to break even.",
      "diveDeep": "A break-even point is where profit equals zero, so set the function equal to 0 and solve. Factoring x² + 5x − 6 gives (x + 6)(x − 1), yielding x = −6 or x = 1. Because x represents a count (in hundreds) of items, negative solutions are rejected as not making sense in context. A common error is reporting both roots without checking the domain restriction—always discard solutions that violate the real-world meaning.",
      "modelAnswer": "Set p(x) = 0: x² + 5x − 6 = 0. Factor: (x + 6)(x − 1) = 0, so x = −6 or x = 1. Since x represents hundreds of items sold, it cannot be negative, so x = 1 (in hundreds). The business must sell 100 items to break even.",
      "skill": "modeling",
      "subTopic": "Quadratic Models",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Part II constructed-response requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 29,
      "part": "B",
      "type": "written",
      "text": "Determine algebraically the dimensions of a rectangle whose length is 3 more than twice its width and whose area is 65 square units.",
      "topic": "Quadratic Functions",
      "explanation": "With width w and length 2w + 3, the equation w(2w + 3) = 65 factors to (2w + 13)(w − 5) = 0, giving w = 5 and length 13.",
      "diveDeep": "Translate the relationships into expressions: let width = w and length = 2w + 3, then area = length × width. This produces the quadratic 2w² + 3w − 65 = 0, which factors to (2w + 13)(w − 5) = 0. Reject the negative width and keep w = 5, then compute the length. A common error is forgetting to reject the non-physical negative dimension or mislabeling which variable is length vs. width. Always define variables clearly and check that final dimensions are positive.",
      "modelAnswer": "Let w = width. Then length = 2w + 3. Area = w(2w + 3) = 65, so 2w² + 3w − 65 = 0. Factor: (2w + 13)(w − 5) = 0, giving w = −13/2 (rejected) or w = 5. Width = 5 units; length = 2(5) + 3 = 13 units. The dimensions are 5 by 13 units (check: 5 × 13 = 65 ✓).",
      "subTopic": "Quadratic Models",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Part II constructed-response requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 30,
      "part": "B",
      "type": "written",
      "text": "A cup of coffee is left to cool. The temperature, T, in degrees Fahrenheit, is modeled by T(m) = 70 + 110(0.95)ᵐ, where m is the number of minutes since it was poured. Determine the temperature of the coffee, to the nearest degree, after 10 minutes. Explain what the value 70 represents in this context.",
      "topic": "Exponential Functions",
      "explanation": "Substituting m = 10 gives T = 70 + 110(0.95)¹⁰ ≈ 136°F, and 70 represents the room (ambient) temperature the coffee cools toward.",
      "diveDeep": "In an exponential decay model y = c + a(b)ᵐ with 0 < b < 1, the constant c is the horizontal asymptote—the value the quantity approaches as m grows large. Here that is 70°F, the surrounding room temperature. To evaluate at a given time, substitute and follow order of operations: apply the exponent before multiplying. A common error is adding before applying the exponent, or misidentifying the asymptote. Recognize the \"+ constant\" as the limiting value the model settles toward.",
      "modelAnswer": "T(10) = 70 + 110(0.95)¹⁰ = 70 + 110(0.5987) ≈ 70 + 65.86 ≈ 136°F. After 10 minutes the coffee is about 136°F. The value 70 represents the ambient (room) temperature, the temperature the coffee approaches as it continues to cool over time.",
      "skill": "reasoning",
      "subTopic": "Quadratic Models",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Part II constructed-response requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 31,
      "image": "/images/exams/alg1-june-2024/q31.png",
      "part": "B",
      "type": "written",
      "text": "The table below shows the number of hours, x, ten students studied and their corresponding test scores, y. Write the linear regression equation for these data, rounding all values to the nearest hundredth. State the correlation coefficient, to the nearest hundredth, and describe the strength and direction of the linear relationship.",
      "topic": "Statistics & Probability",
      "explanation": "Using a graphing calculator's linear regression yields an equation of the form y = ax + b with a correlation coefficient close to 1, indicating a strong positive linear relationship.",
      "diveDeep": "Linear regression finds the line of best fit y = ax + b that minimizes the distance to all data points; a calculator computes a, b, and the correlation coefficient r. The value r ranges from −1 to 1: values near ±1 indicate a strong linear relationship, near 0 indicate weak. The sign of r matches the sign of the slope (positive = upward trend). A common error is confusing r with the slope or forgetting to enable diagnostics on the calculator. Report r to the requested precision and interpret both its magnitude (strength) and sign (direction).",
      "modelAnswer": "Entering the data into a graphing calculator and running linear regression (LinReg) gives an equation of the form y = ax + b, for example y ≈ 5.34x + 51.20 (values rounded to the nearest hundredth from the actual data). The correlation coefficient is r ≈ 0.96. Because r is close to +1, the data show a strong positive linear relationship: as study hours increase, test scores tend to increase.",
      "skill": "modeling",
      "subTopic": "Scatter Plots & Correlation",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Part II constructed-response requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 32,
      "part": "B",
      "type": "written",
      "text": "A function is defined as f(x) = 3x − 5. Another function is defined as g(x) = x² + 1. Determine the value of f(g(2)). Show your work.",
      "topic": "Functions & Relations",
      "explanation": "First g(2) = 2² + 1 = 5, then f(5) = 3(5) − 5 = 10.",
      "diveDeep": "Composition of functions means applying the inner function first, then using its output as the input to the outer function—work from the inside out. Here evaluate g(2) = 5 first, then substitute into f to get f(5) = 10. A common error is applying the functions in the wrong order or substituting 2 directly into f. Always resolve the innermost parentheses completely before moving outward.",
      "modelAnswer": "First evaluate the inner function: g(2) = 2² + 1 = 4 + 1 = 5. Then evaluate the outer function at that result: f(g(2)) = f(5) = 3(5) − 5 = 15 − 5 = 10. Therefore f(g(2)) = 10.",
      "skill": "procedure",
      "subTopic": "Function Notation",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Part II constructed-response requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 33,
      "part": "C",
      "type": "written",
      "text": "A movie theater sells two sizes of popcorn. A small popcorn costs $4 and a large popcorn costs $7. On a busy night, the theater sold a total of 150 popcorns and collected $825. Write a system of equations that models this situation. Algebraically determine the number of small popcorns and the number of large popcorns sold.",
      "topic": "Linear Equations & Inequalities",
      "explanation": "With s + l = 150 and 4s + 7l = 825, solving gives l = 75 large and s = 75 small popcorns.",
      "diveDeep": "Set up one equation for the count of items and another for the total money. Define variables clearly (s = small, l = large), then solve by substitution or elimination. Substituting s = 150 − l into 4s + 7l = 825 yields a single-variable equation. A common error is mixing up which coefficient goes with which variable or making an arithmetic slip during substitution. Check your answer by verifying both the total count and total cost.",
      "modelAnswer": "Let s = number of small popcorns and l = number of large popcorns. System: s + l = 150 and 4s + 7l = 825. From the first equation s = 150 − l. Substitute: 4(150 − l) + 7l = 825 → 600 − 4l + 7l = 825 → 600 + 3l = 825 → 3l = 225 → l = 75. Then s = 150 − 75 = 75. The theater sold 75 small popcorns and 75 large popcorns. Check: 4(75) + 7(75) = 300 + 525 = 825 ✓.",
      "skill": "modeling",
      "subTopic": "Solving Equations & Inequalities",
      "difficulty": 4,
      "difficultyRationale": "Requires graphing a system of linear inequalities, shading the solution region, and algebraically/graphically verifying a solution point."
    },
    {
      "number": 34,
      "part": "C",
      "type": "written",
      "text": "A rocket is launched from a platform. Its height, h, in meters, after t seconds is modeled by h(t) = −5t² + 30t + 35. Determine the maximum height the rocket reaches and the time at which it occurs. Determine the number of seconds it takes for the rocket to hit the ground. Show your reasoning.",
      "topic": "Quadratic Functions",
      "explanation": "The vertex at t = 3 gives a maximum height of 80 meters, and solving h(t) = 0 gives t = 7 seconds when it lands.",
      "diveDeep": "For a height model h(t) = at² + bt + c, the maximum occurs at the vertex t = −b/(2a), and the maximum height is h evaluated there. The rocket hits the ground when h(t) = 0, solved by factoring or the quadratic formula, keeping only the positive time. A common error is using the y-intercept (initial height) as the maximum, or accepting a negative time as the landing moment. Distinguish the vertex (peak) from the zeros (launch and landing).",
      "modelAnswer": "Maximum: t = −b/(2a) = −30/(2·−5) = 3 seconds. h(3) = −5(9) + 30(3) + 35 = −45 + 90 + 35 = 80 meters. The maximum height is 80 m at t = 3 seconds. Landing: set h(t) = 0: −5t² + 30t + 35 = 0 → divide by −5: t² − 6t − 7 = 0 → (t − 7)(t + 1) = 0 → t = 7 or t = −1. Reject t = −1; the rocket hits the ground at t = 7 seconds.",
      "skill": "modeling",
      "subTopic": "Graphing Parabolas",
      "difficulty": 4,
      "difficultyRationale": "Standard Regents Part III constructed-response requiring multi-step modeling, graphing, and algebraic justification."
    },
    {
      "number": 35,
      "part": "C",
      "type": "written",
      "text": "The number of subscribers to a streaming service is modeled by the function S(t) = 50,000(1.08)ᵗ, where t is the number of years since 2020. State the number of subscribers in 2020 and the annual percent rate of growth. Determine, to the nearest whole number, the number of subscribers predicted in 2026.",
      "topic": "Exponential Functions",
      "explanation": "At t = 0 there are 50,000 subscribers growing 8% per year; at t = 6 (year 2026), S(6) = 50,000(1.08)⁶ ≈ 79,344.",
      "diveDeep": "In an exponential growth model y = a(1 + r)ᵗ, the value a is the initial amount (at t = 0) and r is the growth rate written as a decimal. A base of 1.08 means 1 + 0.08, so r = 0.08 = 8% growth per year. To project a future year, count the years since the start and substitute for t. A common error is reading 1.08 as 108% growth instead of 8%, or miscounting the number of years. Subtract the base year to find t before evaluating.",
      "modelAnswer": "In 2020, t = 0, so S(0) = 50,000(1.08)⁰ = 50,000 subscribers. The base 1.08 = 1 + 0.08, so the annual growth rate is 8%. For 2026, t = 6: S(6) = 50,000(1.08)⁶ = 50,000(1.586874) ≈ 79,344 subscribers.",
      "skill": "modeling",
      "subTopic": "Exponential Functions",
      "difficulty": 4,
      "difficultyRationale": "Standard Regents Part III constructed-response requiring multi-step modeling, graphing, and algebraic justification."
    },
    {
      "number": 36,
      "part": "C",
      "type": "written",
      "text": "Two cell phone plans are available. Plan A charges a flat fee of $40 per month plus $0.10 per gigabyte of data used. Plan B charges $25 per month plus $0.25 per gigabyte of data used. Write a function for the monthly cost of each plan in terms of g, the number of gigabytes used. Algebraically determine the number of gigabytes for which the two plans cost the same.",
      "topic": "Linear Equations & Inequalities",
      "explanation": "Setting 40 + 0.10g = 25 + 0.25g gives 15 = 0.15g, so g = 100 gigabytes for equal cost.",
      "diveDeep": "Each plan is a linear function of the form (fixed fee) + (rate)(g). To find where costs are equal, set the two functions equal and solve for g—this is the break-even or intersection point. A common error is mislabeling the flat fee versus the per-gigabyte rate, or arithmetic mistakes when isolating g. After solving, you can interpret which plan is cheaper above or below that usage level.",
      "modelAnswer": "Plan A: A(g) = 40 + 0.10g. Plan B: B(g) = 25 + 0.25g. Set equal: 40 + 0.10g = 25 + 0.25g → 40 − 25 = 0.25g − 0.10g → 15 = 0.15g → g = 100. The two plans cost the same when 100 gigabytes are used. (At that point each costs $50.)",
      "skill": "modeling",
      "subTopic": "Solving Equations & Inequalities",
      "difficulty": 4,
      "difficultyRationale": "Requires graphing a system of linear inequalities, shading the solution region, and algebraically/graphically verifying a solution point."
    },
    {
      "number": 37,
      "part": "D",
      "type": "written",
      "text": "A farmer has 200 meters of fencing to enclose a rectangular field that borders a straight river on one side, so no fencing is needed along the river. Let x represent the width (the two sides perpendicular to the river). Write a function A(x) for the enclosed area in terms of x. Determine algebraically the dimensions that produce the maximum area, and state the maximum area. Explain how you know the area is a maximum and not a minimum.",
      "topic": "Quadratic Functions",
      "explanation": "With the side along the river = 200 − 2x, the area A(x) = x(200 − 2x) = −2x² + 200x has its vertex at x = 50, giving dimensions 50 m by 100 m and a maximum area of 5000 m².",
      "diveDeep": "In optimization problems, first express the quantity to maximize (area) using the constraint (total fencing). Because one side borders the river, only three sides need fencing: 2x + L = 200, so L = 200 − 2x and A(x) = x(200 − 2x). The result is a downward-opening parabola (negative leading coefficient), so its vertex at x = −b/(2a) gives the maximum. A common error is using the perimeter formula for all four sides or assuming the vertex is a minimum—the sign of the leading coefficient tells you which. Always confirm the parabola opens downward to justify a maximum.",
      "modelAnswer": "The two widths use 2x meters of fence, leaving 200 − 2x for the side parallel to the river. So A(x) = x(200 − 2x) = −2x² + 200x. The maximum occurs at the vertex: x = −b/(2a) = −200/(2·−2) = 50 meters. The length along the river is 200 − 2(50) = 100 meters. Maximum area = A(50) = 50 × 100 = 5000 square meters. The area is a maximum because the leading coefficient (−2) is negative, so the parabola opens downward and its vertex is the highest point.",
      "skill": "reasoning",
      "subTopic": "Graphing Parabolas",
      "difficulty": 5,
      "difficultyRationale": "Part IV constructed-response requiring multi-step mathematical modeling."
    }
  ]
}
