// Algebra 1 Regents — June 2025
export default {
  id: 'a1-jun-2025',
  subject: 'algebra-1',
  year: 2025,
  session: 'June',
  totalMinutes: 180,
  questions: [
    {
      number: 1,
      part: 'A',
      text: 'Which expression is equivalent to 3(2x − 5) + 4x?',
      choices: ['10x − 15', '10x − 5', '6x − 15', '6x − 5'],
      topic: 'Linear Equations & Inequalities',
      correct: 0,
      explanation: 'Distribute 3 across (2x − 5) to get 6x − 15, then add 4x to combine like terms: 6x + 4x = 10x, leaving 10x − 15.',
      diveDeep: 'The distributive property a(b + c) = ab + ac is the foundation of simplifying expressions. A common mistake is forgetting to multiply the 3 by BOTH terms inside the parentheses, or combining the constant −15 with the variable terms. Always distribute completely first, then collect like terms (terms with the same variable and exponent). When you see a number directly outside a parenthesis, treat distribution as your first step before anything else.'
    },
    {
      number: 2,
      part: 'A',
      text: 'The expression x² − 49 is equivalent to',
      choices: ['(x − 7)(x − 7)', '(x + 7)(x + 7)', '(x − 7)(x + 7)', '(x − 49)(x + 1)'],
      topic: 'Polynomials & Factoring',
      correct: 2,
      explanation: 'This is a difference of two perfect squares, x² − 7², which always factors as (x − 7)(x + 7).',
      diveDeep: 'The difference of squares pattern a² − b² = (a − b)(a + b) appears constantly on the Regents. Recognize it when you see two perfect-square terms separated by a minus sign and no middle term. A frequent error is choosing (x − 7)(x − 7), which would multiply out to x² − 14x + 49 — note the extra middle term. The key is that the two binomial factors are identical except for opposite signs, which makes the middle terms cancel.'
    },
    {
      number: 3,
      part: 'A',
      text: 'If f(x) = 2x² − 3x + 1, what is the value of f(−2)?',
      choices: ['3', '11', '15', '−1'],
      topic: 'Functions & Relations',
      correct: 2,
      explanation: 'Substitute −2 for x: 2(−2)² − 3(−2) + 1 = 2(4) + 6 + 1 = 8 + 6 + 1 = 15.',
      diveDeep: 'Evaluating a function means substituting the input value everywhere x appears and following order of operations. The most common mistake is mishandling the negative inside the squared term: (−2)² = 4 (positive), not −4. Use parentheses around the substituted value to keep signs correct, and remember that −3(−2) = +6 because a negative times a negative is positive.'
    },
    {
      number: 4,
      part: 'A',
      text: 'Which situation could be modeled by an exponential function?',
      choices: ['A car travels at a constant speed of 60 miles per hour.', 'A savings account earns 3% interest compounded annually.', 'A plumber charges a $50 fee plus $40 per hour.', 'A phone plan costs $30 per month.'],
      topic: 'Exponential Functions',
      correct: 1,
      explanation: 'Compound interest grows by a constant percentage (a constant multiplier) each period, which is the defining feature of exponential growth.',
      diveDeep: 'Linear models change by a constant ADDED amount per step, while exponential models change by a constant MULTIPLIED factor (percentage) per step. Constant speed, flat fees plus hourly rates, and fixed monthly costs all add equal amounts, making them linear. Interest "compounded annually" multiplies the balance by 1.03 each year, so the increase itself grows over time — the hallmark of exponential behavior. Ask yourself: is the quantity adding the same number, or multiplying by the same number?'
    },
    {
      number: 5,
      part: 'A',
      text: 'The solution to the inequality 4 − 2x < 10 is',
      choices: ['x < −3', 'x > −3', 'x < 3', 'x > 3'],
      topic: 'Linear Equations & Inequalities',
      correct: 1,
      explanation: 'Subtract 4 from both sides to get −2x < 6, then divide by −2 and flip the inequality sign to get x > −3.',
      diveDeep: 'The single most important rule for inequalities: whenever you multiply or divide both sides by a negative number, you must reverse the inequality symbol. Here dividing by −2 changes < to >. Students who forget this get x < −3, which is the wrong half of the number line. You can always check your answer by testing a value — try x = 0: 4 − 2(0) = 4 < 10 is true, and 0 > −3 is also true, confirming the solution.'
    },
    {
      number: 6,
      part: 'A',
      text: 'Which point lies on the line whose equation is y = 3x − 5?',
      choices: ['(2, 1)', '(1, 2)', '(0, 5)', '(5, 0)'],
      topic: 'Linear Equations & Inequalities',
      correct: 0,
      explanation: 'Substituting x = 2 gives y = 3(2) − 5 = 6 − 5 = 1, so the point (2, 1) satisfies the equation.',
      diveDeep: 'A point lies on a line only if its coordinates make the equation true. Test each candidate by substituting the x-value and checking whether the result equals the given y-value. Be careful with ordered-pair order: (2, 1) means x = 2 and y = 1, while (1, 2) means x = 1 and y = 2 — swapping them is a classic error. When a point fails, the left and right sides simply won\'t balance.'
    },
    {
      number: 7,
      part: 'A',
      text: 'What is the slope of the line that passes through the points (−1, 4) and (3, −8)?',
      choices: ['−3', '3', '−1/3', '1/3'],
      topic: 'Linear Equations & Inequalities',
      correct: 0,
      explanation: 'Slope = (y₂ − y₁)/(x₂ − x₁) = (−8 − 4)/(3 − (−1)) = −12/4 = −3.',
      diveDeep: 'Slope measures the change in y over the change in x ("rise over run"). The two most common errors are subtracting the coordinates in inconsistent orders (you must keep the same point first in both numerator and denominator) and mishandling the negatives, especially 3 − (−1) = 4. A negative slope means the line falls from left to right, which makes sense here since y dropped from 4 to −8 as x increased.'
    },
    {
      number: 8,
      part: 'A',
      text: 'The expression (2x³)(4x²) is equivalent to',
      choices: ['6x⁵', '8x⁵', '6x⁶', '8x⁶'],
      topic: 'Polynomials & Factoring',
      correct: 1,
      explanation: 'Multiply the coefficients (2 × 4 = 8) and add the exponents of like bases (x³ · x² = x⁵), giving 8x⁵.',
      diveDeep: 'When multiplying powers with the same base, you ADD the exponents: xᵃ · xᵇ = xᵃ⁺ᵇ. The coefficients are multiplied normally. A frequent mistake is multiplying the exponents (3 × 2 = 6) instead of adding them, or adding the coefficients. Keep the two operations separate: coefficients multiply, exponents add. This contrasts with the power-of-a-power rule (xᵃ)ᵇ = xᵃᵇ where exponents DO multiply.'
    },
    {
      number: 9,
      part: 'A',
      text: 'Which equation represents a line parallel to the line whose equation is 2y = 4x + 6?',
      choices: ['y = −2x + 3', 'y = 2x + 1', 'y = −1/2 x + 5', 'y = 1/2 x − 4'],
      topic: 'Linear Equations & Inequalities',
      correct: 1,
      explanation: 'Dividing 2y = 4x + 6 by 2 gives y = 2x + 3, with slope 2; a parallel line must have the same slope of 2, which is y = 2x + 1.',
      diveDeep: 'Parallel lines have equal slopes but different y-intercepts. First put the given equation into slope-intercept form (y = mx + b) by isolating y so the slope is clearly visible. Here the slope is 2. Perpendicular lines, by contrast, have slopes that are negative reciprocals (the perpendicular slope would be −1/2). Don\'t confuse the two — the answer y = −1/2 x + 5 is a perpendicular slope, a tempting distractor.'
    },
    {
      number: 10,
      part: 'A',
      text: 'When 8x² + 2x is divided by 2x, the result is',
      choices: ['4x', '4x²', '4x + 1', '4x² + 1'],
      topic: 'Polynomials & Factoring',
      correct: 2,
      explanation: 'Divide each term by 2x: 8x² ÷ 2x = 4x and 2x ÷ 2x = 1, giving 4x + 1.',
      diveDeep: 'To divide a polynomial by a monomial, split the fraction so each term of the numerator is divided separately by the denominator. A very common error is forgetting that 2x ÷ 2x = 1 (not 0 and not just x), which would lose the "+ 1" term. When dividing powers of the same base you subtract exponents: x² ÷ x¹ = x¹. Always check by multiplying your answer back by 2x to recover the original expression.'
    },
    {
      number: 11,
      part: 'A',
      text: 'Which equation is equivalent to x² − 6x = 27?',
      choices: ['(x − 3)² = 27 − 9', '(x − 3)² = 27 + 9', '(x − 3)² = 27 + 36', '(x − 3)² = 27 − 36'],
      topic: 'Quadratic Functions',
      correct: 1,
      image: '/images/exams/alg1-june-2025/q11.png',
      explanation: 'Completing the square adds (−6/2)² = 9 to both sides: x² − 6x + 9 = 27 + 9, and the left side factors as (x − 3)².',
      diveDeep: 'Completing the square turns x² + bx into a perfect-square trinomial by adding (b/2)². Here b = −6, so (b/2)² = (−3)² = 9. Crucially, whatever you add to one side you must add to the OTHER side to keep the equation balanced — that is why the right side becomes 27 + 9, not 27 − 9. This technique underlies the quadratic formula and is essential for finding the vertex form of a parabola.'
    },
    {
      number: 12,
      part: 'A',
      text: 'The box plots below summarize the ages of athletes on the swim team and the track team. Based on the box plots, which statement must be true?',
      choices: ['The IQR of both teams is the same.', 'There are more athletes on the swim team than on the track team.', 'The median age of the swim team is less than the median age of the track team.', 'The range of ages of the swim team is smaller than the range of the track team.'],
      topic: 'Statistics & Probability',
      correct: 0,
      image: '/images/exams/alg1-june-2025/q12.png',
      explanation: 'The interquartile range (IQR) is the width of the box (Q3 − Q1); when both boxes span the same distance, the IQRs are equal even if the centers differ.',
      diveDeep: 'A box plot displays a five-number summary: minimum, Q1, median, Q3, and maximum. The IQR is the length of the box, the range is the distance from minimum to maximum (whisker to whisker), and the median is the line inside the box. Box plots show the distribution of values but NOT how many data points there are, so you can never conclude which team has more athletes. Always match each statement to the specific feature of the plot it describes.'
    },
    {
      number: 13,
      part: 'A',
      text: 'The graph of f(x) is shown below. The domain of this function is',
      choices: ['[0, 12]', '0 ≤ x ≤ 12', '[15, 45]', '15 ≤ x ≤ 45'],
      topic: 'Functions & Relations',
      correct: 2,
      image: '/images/exams/alg1-june-2025/q13.png',
      explanation: 'The domain is the set of all x-values the graph covers; the graph spans from x = 15 to x = 45, written in interval notation as [15, 45].',
      diveDeep: 'Domain refers to all possible input (x) values, while range refers to all output (y) values — students frequently swap them. Read the domain by looking at how far the graph extends left and right (its horizontal span). Interval notation uses square brackets [ ] for included endpoints and parentheses ( ) for excluded endpoints. Here both endpoints are part of the graph, so brackets are used: [15, 45].'
    },
    {
      number: 14,
      part: 'A',
      text: 'The sum of 3 and √2 is',
      choices: ['rational, since the sum can be expressed as an integer', 'rational, since the sum can be expressed as a nonterminating decimal', 'irrational, since the sum can be expressed as a terminating decimal', 'irrational, since the sum cannot be expressed as a terminating or repeating decimal'],
      topic: 'Real Number System',
      correct: 3,
      explanation: 'Adding a rational number (3) to an irrational number (√2) always produces an irrational number, whose decimal neither terminates nor repeats.',
      diveDeep: 'A rational number can be written as a fraction of integers and has a decimal that either terminates or repeats; an irrational number (like √2 or π) cannot, and its decimal goes on forever without repeating. The sum of a rational and an irrational is always irrational. Watch the wording carefully: "terminating decimal" describes a rational number, so any choice using that phrase to justify "irrational" is internally contradictory. The correct reasoning must pair "irrational" with "cannot be expressed as a terminating or repeating decimal."'
    },
    {
      number: 15,
      part: 'A',
      text: 'Which expression is equivalent to a⁸ − b⁶?',
      choices: ['(a⁴ − b³)²', '(a⁴)² − (b³)²', '(a⁶ − b⁴)²', '(a⁶)² − (b⁴)²'],
      topic: 'Polynomials & Factoring',
      correct: 1,
      explanation: 'Since a⁸ = (a⁴)² and b⁶ = (b³)², the expression equals (a⁴)² − (b³)², a difference of squares.',
      diveDeep: 'Recognizing perfect squares hidden in exponents is key: (a⁴)² = a⁴·² = a⁸ and (b³)² = b³·² = b⁶, because the power-of-a-power rule multiplies exponents. The trap answer (a⁴ − b³)² is NOT equal, since squaring a binomial produces a middle term: (a⁴ − b³)² = a⁸ − 2a⁴b³ + b⁶. The expression a⁸ − b⁶ is a difference of two squares but written as the difference of the squared terms, not a single squared binomial.'
    },
    {
      number: 16,
      part: 'A',
      text: 'The sum of √27 and √12 is',
      choices: ['5√3', '5√6', '√39', '√6'],
      topic: 'Real Number System',
      correct: 0,
      explanation: 'Simplify each radical: √27 = 3√3 and √12 = 2√3, so the sum is 3√3 + 2√3 = 5√3.',
      diveDeep: 'To add radicals you must first simplify each one to find like radical terms — only radicals with the same radicand (the number under the root) can be combined. Factor out perfect squares: 27 = 9 · 3 so √27 = 3√3, and 12 = 4 · 3 so √12 = 2√3. A common error is adding the radicands (27 + 12) under one root, which is invalid. Treat √3 like a variable: 3√3 + 2√3 = 5√3, just as 3x + 2x = 5x.'
    },
    {
      number: 17,
      part: 'A',
      text: 'The sum of Tim’s age and Jack’s age is 44. Tim’s age is 4 less than 7 times Jack’s age, x. An equation that could be used to model this scenario is',
      choices: ['(7x − 4) + x = 44', '7x − 4 = 44', '(4 − 7x) + x = 44', '4 − 7x = 44'],
      topic: 'Linear Equations & Inequalities',
      correct: 0,
      explanation: 'Jack’s age is x, Tim’s age is "4 less than 7 times Jack’s age" = 7x − 4, and their sum is 44, giving (7x − 4) + x = 44.',
      diveDeep: 'Translating words into algebra requires careful attention to phrasing. "4 less than 7 times x" means start with 7x and subtract 4, written 7x − 4, NOT 4 − 7x (the order of subtraction matters). Then "the sum of Tim and Jack" means add both ages together and set equal to 44. Build each person\'s expression separately before combining, and reread the problem to confirm the subtraction order.'
    },
    {
      number: 18,
      part: 'A',
      text: 'Given the function g(x) = x² − 2x + 3, what is the value of g(−2)?',
      choices: ['11', '−1', '3', '−5'],
      topic: 'Functions & Relations',
      correct: 0,
      explanation: 'Substitute −2: (−2)² − 2(−2) + 3 = 4 + 4 + 3 = 11.',
      diveDeep: 'When substituting a negative input, always wrap it in parentheses to handle signs correctly. Here (−2)² = 4 (a negative squared is positive) and −2(−2) = +4 (negative times negative). Forgetting that the squared term is positive, or mishandling the double negative in the middle term, are the usual mistakes. Follow order of operations: exponents first, then multiplication, then addition.'
    },
    {
      number: 19,
      part: 'A',
      text: 'Four graphs are shown below. Which of the graphs represent(s) a function?',
      choices: ['A, only', 'A and B, only', 'A, B, and C, only', 'A, B, C, and D'],
      topic: 'Functions & Relations',
      correct: 2,
      image: '/images/exams/alg1-june-2025/q19.png',
      explanation: 'A graph represents a function if it passes the vertical line test; graphs A, B, and C each have at most one y-value per x-value, while D fails (a vertical line crosses it more than once).',
      diveDeep: 'The vertical line test is the quickest way to identify a function from a graph: if any vertical line crosses the graph more than once, that x-value maps to multiple y-values, so it is NOT a function. Sideways parabolas, circles, and other relations fail this test. The definition of a function is that each input has exactly one output — graphs like A, B, and C satisfy this, while D does not.'
    },
    {
      number: 20,
      part: 'A',
      text: 'The formula to calculate kinetic energy is K = ½mv², where K is kinetic energy, m is mass, and v is velocity. When m is written in terms of K and v, the equation is',
      choices: ['m = 2K/v²', 'm = 2Kv²', 'm = K/(2v²)', 'm = Kv²/2'],
      topic: 'Linear Equations & Inequalities',
      correct: 0,
      explanation: 'Starting from K = ½mv², multiply both sides by 2 to get 2K = mv², then divide both sides by v² to isolate m = 2K/v².',
      diveDeep: 'Solving a formula for a different variable (literal equation) uses the same inverse-operation logic as solving for x. To undo multiplication by ½, multiply by 2; to undo multiplication by v², divide by v². Perform the inverse operations in reverse order of operations to peel away everything attached to the target variable. The result m = 2K/v² keeps K and v² where they belong — a common error is leaving v² in the numerator instead of the denominator.'
    },
    {
      number: 21,
      part: 'A',
      text: 'The solution to the equation ⅔(3x − 21) = x − 1 is',
      choices: ['13', '4', '−13', '−4'],
      topic: 'Linear Equations & Inequalities',
      correct: 0,
      explanation: 'Distribute: 2x − 14 = x − 1, then subtract x from both sides to get x − 14 = −1, so x = 13.',
      diveDeep: 'When a fraction multiplies a parenthesis, distribute it across each term: ⅔ · 3x = 2x and ⅔ · 21 = 14. Then move variable terms to one side and constants to the other using inverse operations. A common slip is mis-multiplying ⅔ by 3x or by 21. Always verify by substituting back: ⅔(3·13 − 21) = ⅔(18) = 12, and 13 − 1 = 12 — both sides match, confirming x = 13.'
    },
    {
      number: 22,
      part: 'A',
      text: 'Which equation represents the sequence 12, 6, 3, 1.5, …, where a₁ = 12?',
      choices: ['aₙ = 12·(½)ⁿ⁻¹', 'aₙ = 12·(½)ⁿ', 'aₙ = 12 − 6(n − 1)', 'aₙ = 12·2ⁿ⁻¹'],
      topic: 'Sequences',
      correct: 0,
      image: '/images/exams/alg1-june-2025/q22.png',
      explanation: 'Each term is half the previous one, so the common ratio is ½ and the explicit geometric formula is aₙ = a₁·rⁿ⁻¹ = 12·(½)ⁿ⁻¹.',
      diveDeep: 'A geometric sequence multiplies by a constant ratio each step; find r by dividing any term by the one before it (6 ÷ 12 = ½). The explicit formula is aₙ = a₁ · rⁿ⁻¹, where the exponent is n − 1 so that the first term (n = 1) gives a₁ · r⁰ = a₁. Using exponent n instead of n − 1 shifts the whole sequence and is a frequent mistake. Check: a₂ = 12·(½)¹ = 6, which matches the second term.'
    },
    {
      number: 23,
      part: 'A',
      text: 'The axis of symmetry is x = −2 for which quadratic function?',
      choices: ['f(x) = x² − 4x − 5', 'g(x) = x² + 4x + 3', 'h(x) = x² + 2x', 'j(x) = 2x² − 8x'],
      topic: 'Quadratic Functions',
      correct: 1,
      image: '/images/exams/alg1-june-2025/q23.png',
      explanation: 'The axis of symmetry is x = −b/(2a); for g(x) = x² + 4x + 3, that is −4/(2·1) = −2.',
      diveDeep: 'Every parabola is symmetric about the vertical line x = −b/(2a), where a and b come from the standard form ax² + bx + c. This line passes through the vertex. Be careful with signs: the formula already includes a negative, so a positive b gives a negative axis. For g(x), b = +4 yields x = −4/2 = −2. The other choices give different axes: f(x) gives x = 2, h(x) gives x = −1, and j(x) gives x = 2.'
    },
    {
      number: 24,
      part: 'A',
      text: 'Each day, a freight train passes by Anna’s house. This freight train travels at 49 miles per hour. Each railroad car is 56 feet long. Which expression represents the number of railroad cars that pass by Anna’s house per minute? (1 mile = 5280 feet)',
      choices: [
        '(49 mi/hr)·(5280 ft/mi)·(1 car/56 ft)·(60 min/hr)',
        '(49 mi/hr)·(5280 ft/mi)·(1 car/56 ft)·(1 hr/60 min)',
        '(49 mi/hr)·(1 mi/5280 ft)·(1 car/56 ft)·(60 min/hr)',
        '(49 mi/hr)·(1 mi/5280 ft)·(1 car/56 ft)·(1 hr/60 min)'
      ],
      topic: 'Linear Equations & Inequalities',
      correct: 1,
      image: '/images/exams/alg1-june-2025/q24.png',
      explanation: 'Dimensional analysis: 49 mi/hr × 5280 ft/mi cancels miles to ft/hr, × 1 car/56 ft cancels feet to cars/hr, × 1 hr/60 min cancels hours to give cars/min.',
      diveDeep: 'Unit conversion (dimensional analysis) works by multiplying conversion factors arranged so unwanted units cancel diagonally — one unit in a numerator cancels the same unit in a denominator. To convert miles to feet you multiply by 5280 ft/mi (feet on top). To convert per-hour to per-minute, you must DIVIDE by 60, which means multiplying by (1 hr/60 min) so hours cancel and minutes land in the denominator. Track each unit carefully and confirm the final answer has the units "cars per minute."'
    },
    {
      number: 25,
      part: 'B',
      type: 'written',
      text: 'Solve the following system of equations algebraically for x and y: y = x² + 4x − 5 and y = 2x − 2.',
      topic: 'Quadratic Functions',
      explanation: 'Setting the expressions equal gives x² + 4x − 5 = 2x − 2, which simplifies to x² + 2x − 3 = 0, factoring to (x + 3)(x − 1) = 0, so x = −3 or x = 1, with corresponding y-values of −8 and 0.',
      diveDeep: 'To solve a linear-quadratic system algebraically, use substitution: set the two expressions for y equal to each other, then collect all terms on one side to form a quadratic equal to zero. Factor (or use the quadratic formula) to find the x-values, then substitute each back into the simpler linear equation to get its y-value. The solutions are the intersection points of the parabola and the line — there can be two, one, or zero real solutions depending on how they meet.',
      modelAnswer: 'Set the two expressions for y equal:\nx² + 4x − 5 = 2x − 2\nMove all terms to one side:\nx² + 4x − 5 − 2x + 2 = 0\nx² + 2x − 3 = 0\nFactor:\n(x + 3)(x − 1) = 0\nSo x = −3 or x = 1.\nSubstitute into y = 2x − 2:\nWhen x = −3: y = 2(−3) − 2 = −8, giving (−3, −8).\nWhen x = 1: y = 2(1) − 2 = 0, giving (1, 0).\nThe solutions are (−3, −8) and (1, 0).'
    },
    {
      number: 26,
      part: 'B',
      type: 'written',
      text: 'A function is defined by f(x) = 3(2)ˣ. State the y-intercept of the function. Explain whether the function represents growth or decay, and justify your answer.',
      topic: 'Exponential Functions',
      explanation: 'The y-intercept is found by evaluating f(0) = 3(2)⁰ = 3, and because the base 2 is greater than 1, the function represents exponential growth.',
      diveDeep: 'For an exponential function in the form f(x) = a·bˣ, the value a is the y-intercept (since b⁰ = 1) and b is the growth/decay factor. If b > 1 the function grows; if 0 < b < 1 it decays. The base controls direction and the multiplier a controls starting height. A common mistake is thinking 2⁰ = 0 — any nonzero base raised to the power 0 equals 1, so f(0) = a.',
      modelAnswer: 'The y-intercept is found by evaluating f(0):\nf(0) = 3(2)⁰ = 3(1) = 3.\nSo the y-intercept is (0, 3).\nThe function represents growth because the base of the exponent, 2, is greater than 1. Since each time x increases by 1 the output is multiplied by 2, the value of the function increases, which is exponential growth.'
    },
    {
      number: 27,
      part: 'B',
      type: 'written',
      text: 'Factor completely: 3x³ − 12x.',
      topic: 'Polynomials & Factoring',
      explanation: 'Factor out the greatest common factor 3x to get 3x(x² − 4), then factor the difference of squares x² − 4 = (x + 2)(x − 2), giving 3x(x + 2)(x − 2).',
      diveDeep: 'Factoring completely means continuing until no factor can be broken down further. Always start by pulling out the greatest common factor (GCF) — here both terms share 3x. After factoring out the GCF, examine what remains for additional patterns; x² − 4 is a difference of squares. Stopping at 3x(x² − 4) is incomplete and loses credit. The complete answer must show every factor fully reduced.',
      modelAnswer: 'First, factor out the greatest common factor, 3x:\n3x³ − 12x = 3x(x² − 4)\nThe remaining factor x² − 4 is a difference of two perfect squares (x² − 2²), which factors as (x + 2)(x − 2):\n3x(x² − 4) = 3x(x + 2)(x − 2)\nThe complete factorization is 3x(x + 2)(x − 2).'
    },
    {
      number: 28,
      part: 'B',
      type: 'written',
      text: 'The table below shows the number of bacteria in a sample over time. State whether a linear or an exponential model best fits the data, and justify your choice. Time (hours): 0, 1, 2, 3. Bacteria: 100, 200, 400, 800.',
      topic: 'Exponential Functions',
      explanation: 'The data is multiplied by 2 each hour (100→200→400→800) rather than increasing by a constant amount, so an exponential model best fits.',
      diveDeep: 'To decide between linear and exponential, compare consecutive data values. If the differences are constant (same amount added each step), the data is linear; if the ratios are constant (same factor multiplied each step), it is exponential. Here the differences (100, 200, 400) keep changing, but the ratios (200/100 = 2, 400/200 = 2, 800/400 = 2) are all equal to 2. Constant ratio means exponential.',
      modelAnswer: 'An exponential model best fits the data.\nJustification: From hour to hour the number of bacteria is multiplied by a constant factor rather than increased by a constant amount.\n200 ÷ 100 = 2, 400 ÷ 200 = 2, 800 ÷ 400 = 2.\nSince the data increases by a common ratio of 2 each hour (not a common difference), the growth is exponential, not linear.'
    },
    {
      number: 29,
      part: 'B',
      type: 'written',
      text: 'Graph the function f(x) = x² − 2x − 3 on the interval −2 ≤ x ≤ 4. State the coordinates of the vertex.',
      topic: 'Quadratic Functions',
      explanation: 'The axis of symmetry is x = −(−2)/(2·1) = 1, and f(1) = 1 − 2 − 3 = −4, so the vertex is (1, −4); plotting points across the interval produces an upward parabola.',
      diveDeep: 'To graph a parabola, first find the axis of symmetry x = −b/(2a) to locate the vertex (the turning point), then build a table of values on either side. Because parabolas are symmetric, points equidistant from the axis share the same y-value, which speeds up plotting. With a = 1 > 0 the parabola opens upward, so the vertex is a minimum. Always label the vertex and at least a few points to earn full credit.',
      modelAnswer: 'Find the axis of symmetry: x = −b/(2a) = −(−2)/(2·1) = 1.\nFind the vertex by evaluating f(1): f(1) = (1)² − 2(1) − 3 = 1 − 2 − 3 = −4.\nVertex: (1, −4).\nTable of values:\nx = −2: f(−2) = 4 + 4 − 3 = 5 → (−2, 5)\nx = −1: f(−1) = 1 + 2 − 3 = 0 → (−1, 0)\nx = 0: f(0) = 0 − 0 − 3 = −3 → (0, −3)\nx = 1: f(1) = −4 → (1, −4)\nx = 2: f(2) = 4 − 4 − 3 = −3 → (2, −3)\nx = 3: f(3) = 9 − 6 − 3 = 0 → (3, 0)\nx = 4: f(4) = 16 − 8 − 3 = 5 → (4, 5)\nPlot these points and draw a smooth upward-opening parabola. The vertex is (1, −4).'
    },
    {
      number: 30,
      part: 'B',
      type: 'written',
      text: 'The first term of an arithmetic sequence is 7 and the common difference is 4. Write an explicit formula for the nth term, then find the value of the 10th term.',
      topic: 'Sequences',
      explanation: 'The explicit formula is aₙ = 7 + 4(n − 1); substituting n = 10 gives a₁₀ = 7 + 4(9) = 7 + 36 = 43.',
      diveDeep: 'An arithmetic sequence adds a constant common difference d each step. Its explicit formula is aₙ = a₁ + d(n − 1), where the (n − 1) ensures the first term equals a₁ when n = 1. Confusing arithmetic with geometric sequences (which multiply) is a common error — arithmetic uses addition and a linear formula. To find a specific term, substitute its position number for n and simplify.',
      modelAnswer: 'For an arithmetic sequence, aₙ = a₁ + d(n − 1), where a₁ = 7 and d = 4.\nExplicit formula: aₙ = 7 + 4(n − 1).\nThis can also be written as aₙ = 4n + 3.\nFind the 10th term by substituting n = 10:\na₁₀ = 7 + 4(10 − 1) = 7 + 4(9) = 7 + 36 = 43.\nThe 10th term is 43.'
    },
    {
      number: 31,
      part: 'B',
      type: 'written',
      text: 'A rectangular garden has a length that is 3 feet more than twice its width. If the perimeter of the garden is 66 feet, find the dimensions of the garden.',
      topic: 'Linear Equations & Inequalities',
      explanation: 'Let width = w and length = 2w + 3; the perimeter equation 2(w) + 2(2w + 3) = 66 simplifies to 6w + 6 = 66, so w = 10 and length = 23.',
      diveDeep: 'Word problems with geometric figures require defining a variable, translating relationships into expressions, and applying the correct formula (perimeter = 2l + 2w for a rectangle). Define the width as the simplest unknown and express the length in terms of it. Carefully translate "3 more than twice the width" as 2w + 3. After solving for the variable, remember to find BOTH dimensions and include units.',
      modelAnswer: 'Let w = the width of the garden in feet.\nThen the length = 2w + 3.\nThe perimeter of a rectangle is P = 2(length) + 2(width):\n2(2w + 3) + 2(w) = 66\n4w + 6 + 2w = 66\n6w + 6 = 66\n6w = 60\nw = 10\nThe width is 10 feet.\nThe length is 2(10) + 3 = 23 feet.\nThe garden is 10 feet wide and 23 feet long.'
    },
    {
      number: 32,
      part: 'B',
      type: 'written',
      text: 'Solve the quadratic equation 2x² + 5x − 3 = 0 algebraically.',
      topic: 'Quadratic Functions',
      explanation: 'Factoring gives (2x − 1)(x + 3) = 0, so 2x − 1 = 0 → x = ½ or x + 3 = 0 → x = −3.',
      diveDeep: 'For quadratics where a ≠ 1, factor using the AC method: multiply a·c (here 2·−3 = −6) and find two numbers that multiply to −6 and add to the middle coefficient 5 (those are 6 and −1). Then split the middle term and factor by grouping, or use the quadratic formula if factoring is difficult. Once factored, apply the zero-product property: if a product equals zero, at least one factor must be zero. Solve each factor separately.',
      modelAnswer: 'Factor 2x² + 5x − 3 using the AC method.\na·c = 2·(−3) = −6. Find two numbers that multiply to −6 and add to 5: those are 6 and −1.\nSplit the middle term:\n2x² + 6x − x − 3 = 0\nFactor by grouping:\n2x(x + 3) − 1(x + 3) = 0\n(2x − 1)(x + 3) = 0\nSet each factor equal to zero:\n2x − 1 = 0 → x = ½\nx + 3 = 0 → x = −3\nThe solutions are x = ½ and x = −3.'
    }
  ]
}
