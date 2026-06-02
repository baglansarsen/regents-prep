// Algebra 1 Regents — June 2023
export default {
  id: 'a1-jun-2023',
  subject: 'algebra-1',
  year: 2023,
  session: 'June',
  totalMinutes: 180,
  questions: [
    {
      number: 1,
      part: 'A',
      text: 'A factory has the capacity to produce 30,000 items in a week. The factory runs continuously, 24 hours a day, 7 days a week. Which expression correctly converts the production rate of 30,000 items per week into items per minute?',
      choices: [
        '(30,000 items / 1 week) · (1 week / 7 days) · (1 day / 24 hr) · (1 hr / 60 min)',
        '(30,000 items / 1 week) · (7 days / 1 week) · (24 hr / 1 day) · (60 min / 1 hr)',
        '(30,000 items / 1 week) · (1 week / 7 days) · (24 hr / 1 day) · (1 hr / 60 min)',
        '(30,000 items / 1 week) · (7 days / 1 week) · (1 day / 24 hr) · (60 min / 1 hr)'
      ],
      topic: 'Linear Equations & Inequalities',
      correct: 0,
      explanation: 'To convert items per week to items per minute, each unit you want to cancel must appear in the denominator of one factor and the numerator of the next, so weeks, days, and hours all cancel and minutes remain in the denominator.',
      diveDeep: 'This is a dimensional-analysis (unit-conversion) problem. The key is to set up each conversion factor so unwanted units cancel diagonally: "1 week" in the denominator of the start cancels "1 week" in the numerator of the next factor, and so on down to minutes. A common mistake is flipping a conversion factor, which leaves units that do not cancel — always check that the only unit surviving on top is "items" and on the bottom is "min." For similar problems, write the units explicitly and cross out matching pairs before multiplying any numbers.'
    },
    {
      number: 2,
      part: 'A',
      text: 'When (2x² − 3x + 4) is subtracted from (5x² + 7x − 1), the result is',
      choices: ['3x² + 10x − 5', '−3x² − 10x + 5', '3x² + 4x + 3', '7x² + 4x + 3'],
      topic: 'Polynomials & Factoring',
      correct: 0,
      explanation: 'Subtracting means distributing the negative: (5x² + 7x − 1) − (2x² − 3x + 4) = 5x² − 2x² + 7x + 3x − 1 − 4 = 3x² + 10x − 5.',
      diveDeep: 'The most frequent error in polynomial subtraction is failing to distribute the minus sign to every term in the second polynomial. Rewrite the subtraction as adding the opposite of each term, then combine like terms by degree. Line up x², x, and constant terms in columns if it helps avoid sign mistakes. Always double-check the sign of the middle and constant terms, since those are where students lose points most often.'
    },
    {
      number: 3,
      part: 'A',
      text: 'Which situation can be modeled by a linear function?',
      choices: [
        'The amount of money in a savings account that earns interest compounded annually.',
        'The population of bacteria that doubles every hour.',
        'The total cost of a gym membership with a one-time fee plus a fixed monthly charge.',
        'The value of a car that depreciates by 15% each year.'
      ],
      topic: 'Functions & Relations',
      correct: 2,
      explanation: 'A gym membership with a fixed monthly charge increases by a constant amount each month, which is the defining feature of a linear function (constant rate of change).',
      diveDeep: 'Linear functions have a constant rate of change (add the same amount each step), while exponential functions multiply by the same factor each step. Compound interest, bacterial doubling, and percentage depreciation all involve repeated multiplication, making them exponential. The phrase "fixed monthly charge" signals a constant additive rate, so it is linear. When classifying, ask: "Am I adding the same thing each time (linear) or multiplying by the same thing (exponential)?"'
    },
    {
      number: 4,
      part: 'A',
      text: 'The expression 4x² − 25 is equivalent to',
      choices: ['(2x − 5)(2x + 5)', '(2x − 5)(2x − 5)', '(4x − 5)(x + 5)', '(2x + 5)(2x + 5)'],
      topic: 'Polynomials & Factoring',
      correct: 0,
      explanation: 'This is a difference of two squares: 4x² − 25 = (2x)² − 5² = (2x − 5)(2x + 5).',
      diveDeep: 'The difference of squares pattern a² − b² = (a − b)(a + b) appears constantly on the Regents. To recognize it, check that both terms are perfect squares and they are subtracted: 4x² = (2x)² and 25 = 5². The factors are conjugates — one with a minus and one with a plus — so the middle terms cancel when you FOIL back. Note that a SUM of squares (like 4x² + 25) does NOT factor over the real numbers.'
    },
    {
      number: 5,
      part: 'A',
      text: 'The graph of the function f(x) = √x is translated to create the graph of g(x) = √(x − 3) + 2. Which statement describes this transformation?',
      choices: [
        'a shift 3 units left and 2 units down',
        'a shift 3 units right and 2 units up',
        'a shift 3 units right and 2 units down',
        'a shift 3 units left and 2 units up'
      ],
      topic: 'Functions & Relations',
      correct: 1,
      explanation: 'Replacing x with (x − 3) shifts the graph 3 units right, and adding 2 outside shifts it 2 units up.',
      diveDeep: 'For transformations of the form g(x) = f(x − h) + k, the value h shifts horizontally and k shifts vertically. The horizontal shift is counterintuitive: (x − 3) moves the graph RIGHT (toward positive x), not left. The vertical shift "+2" behaves as expected, moving the graph up. A reliable check is to track a single point, such as the starting point of √x at (0, 0), which moves to (3, 2) under this transformation.'
    },
    {
      number: 6,
      part: 'A',
      text: 'A system of equations is given below. y = 2x + 1 and y = x² − 2. How many solutions does this system have?',
      choices: ['1', '2', '0', '3'],
      topic: 'Quadratic Functions',
      correct: 1,
      explanation: 'Setting 2x + 1 = x² − 2 gives x² − 2x − 3 = 0, which factors to (x − 3)(x + 1) = 0, yielding two real solutions, so the line and parabola intersect at 2 points.',
      diveDeep: 'A linear-quadratic system can have 0, 1, or 2 solutions, depending on whether the line misses, is tangent to, or crosses the parabola. Solve by substitution: set the expressions equal, move everything to one side, and count the real roots of the resulting quadratic. The discriminant b² − 4ac tells you the count: positive means 2 solutions, zero means 1, negative means 0. Here the discriminant is (−2)² − 4(1)(−3) = 16 > 0, confirming two intersection points.'
    },
    {
      number: 7,
      part: 'A',
      text: 'What are the roots of the equation x² + 4x − 12 = 0?',
      choices: ['2 and −6', '−2 and 6', '3 and −4', '−3 and 4'],
      topic: 'Quadratic Functions',
      correct: 0,
      explanation: 'Factoring gives (x + 6)(x − 2) = 0, so x = −6 or x = 2 — two numbers that multiply to −12 and add to 4.',
      diveDeep: 'To factor a quadratic of the form x² + bx + c, find two numbers that multiply to c and add to b. Here you need a product of −12 and a sum of +4, which are +6 and −2. Setting each factor equal to zero (the zero-product property) gives the roots. A common slip is mixing up the signs of the roots versus the signs inside the factors — the roots are the values that make each factor zero, so (x + 6) gives x = −6.'
    },
    {
      number: 8,
      part: 'A',
      text: 'The table below shows the number of hours, x, that a plant is exposed to light and its growth, y, in centimeters. The data is best modeled by a linear regression with equation y = 0.8x + 1.2. Based on this model, what is the predicted growth when the plant is exposed to 10 hours of light?',
      choices: ['8.0 cm', '9.2 cm', '10.0 cm', '12.0 cm'],
      topic: 'Statistics & Probability',
      correct: 1,
      explanation: 'Substituting x = 10 into y = 0.8x + 1.2 gives y = 0.8(10) + 1.2 = 8 + 1.2 = 9.2 cm.',
      diveDeep: 'A regression equation lets you predict an output for a given input by simply substituting the x-value. The slope (0.8) represents the predicted growth per additional hour of light, and the y-intercept (1.2) is the predicted growth at zero hours. Be careful to follow order of operations: multiply before adding. Predictions within the range of the data (interpolation) are generally more reliable than predictions far outside it (extrapolation).'
    },
    {
      number: 9,
      part: 'A',
      text: 'Which expression is equivalent to 3(x − 4) + 2x?',
      choices: ['5x − 12', '5x − 4', '6x − 12', '5x + 12'],
      topic: 'Polynomials & Factoring',
      correct: 0,
      explanation: 'Distribute the 3: 3x − 12 + 2x, then combine like terms 3x + 2x to get 5x − 12.',
      diveDeep: 'Simplifying expressions requires distributing factors across parentheses first, then combining like terms. The most common error is forgetting to multiply the 3 by both terms inside the parentheses (especially the −4). After distributing, group terms with the same variable and degree together. Constants combine separately from variable terms, so the −12 stays on its own.'
    },
    {
      number: 10,
      part: 'A',
      text: 'A function is graphed below. A possible equation for this function is',
      choices: [
        'f(x) = (x + 2)(x − 3)',
        'f(x) = (x − 2)²(x + 3)',
        'f(x) = (x − 2)(x + 3)',
        'f(x) = (x − 2)(x + 3)(x − 1)'
      ],
      topic: 'Functions & Relations',
      correct: 2,
      explanation: 'The graph crosses the x-axis at x = 2 and x = −3, which correspond to factors (x − 2) and (x + 3), matching a quadratic with those two zeros.',
      diveDeep: 'The x-intercepts (zeros) of a polynomial reveal its factors: a zero at x = a corresponds to a factor (x − a). The shape and number of turns indicate the degree — a single U-shaped parabola is degree 2 with two factors, while an S-curve is degree 3. A doubled factor like (x − 2)² makes the graph touch (not cross) the axis at that point. Match the zeros AND the end behavior/degree to eliminate wrong choices.',
      image: '/images/exams/alg1-june-2023/q10.png'
    },
    {
      number: 11,
      part: 'A',
      text: 'If g(x) = 2x² − x + 5, then g(−4) is equal to',
      choices: ['−15', '41', '−7', '−5'],
      topic: 'Functions & Relations',
      correct: 1,
      explanation: 'Substitute x = −4: 2(−4)² − (−4) + 5 = 2(16) + 4 + 5 = 32 + 4 + 5 = 41.',
      diveDeep: 'Evaluating a function means replacing every x with the given value and simplifying using order of operations. The biggest pitfall is squaring a negative: (−4)² = +16, not −16, because the negative is also squared. Use parentheses around the substituted value to keep signs correct, and remember that subtracting a negative (−(−4)) becomes addition. Work through exponents first, then multiplication, then addition and subtraction.'
    },
    {
      number: 12,
      part: 'A',
      text: 'A movie theater’s popcorn box is a rectangular prism with a base that measures 6 inches by 4 inches and has a height of 8 inches. To create a larger box, both the length and the width will be increased by x inches. The height will remain the same. Which function represents the volume, V(x), of the larger box?',
      choices: [
        'V(x) = (6 + x)(4 + x)(8 + x)',
        'V(x) = (6 + x)(4 + x)(8)',
        'V(x) = (6 + x) + (4 + x) + (8 + x)',
        'V(x) = (6 + x) + (4 + x) + (8)'
      ],
      topic: 'Functions & Relations',
      correct: 1,
      explanation: 'Volume of a rectangular prism is length × width × height; the length and width each grow by x while the height stays 8, giving V(x) = (6 + x)(4 + x)(8).',
      diveDeep: 'Volume is always a PRODUCT of three dimensions, never a sum, so any choice using addition between dimensions can be eliminated immediately. Read carefully which dimensions change: here both base dimensions increase by x, but the height is explicitly unchanged at 8. Translating word problems into expressions hinges on identifying what stays constant versus what varies. Expanding this product would give a quadratic in x, which models how volume grows as the base expands.'
    },
    {
      number: 13,
      part: 'A',
      text: 'The expression 300(4)^(x + 3) is equivalent to',
      choices: ['19,200(4)^x', '300(4)^x · 3', '64(4)^x', '1200^(x + 3)'],
      topic: 'Polynomials & Factoring',
      correct: 0,
      explanation: 'Using the product rule for exponents, 4^(x + 3) = 4^x · 4³ = 64 · 4^x, so 300 · 64 · 4^x = 19,200(4)^x.',
      diveDeep: 'The exponent rule a^(m + n) = a^m · a^n lets you split a sum in the exponent into a product of powers. Here the constant power 4³ = 64 can be calculated and combined with the coefficient 300. A common mistake is multiplying 300 by 3 instead of by 4³, or adding exponents incorrectly. Rewriting exponential expressions in the form a · b^x is useful for identifying the initial value and growth factor.'
    },
    {
      number: 14,
      part: 'A',
      text: 'Ashley only has 7 quarters and some dimes in her purse. She needs at least $3.00 to pay for lunch. Which inequality could be used to determine the number of dimes, d, she needs in her purse to be able to pay for lunch?',
      choices: [
        '1.75 + d ≤ 3.00',
        '1.75 + d ≥ 3.00',
        '1.75 + 0.10d ≤ 3.00',
        '1.75 + 0.10d ≥ 3.00'
      ],
      topic: 'Linear Equations & Inequalities',
      correct: 3,
      explanation: 'Seven quarters equal $1.75, each dime is $0.10 so d dimes are 0.10d, and "at least $3.00" means the total must be greater than or equal to 3.00.',
      diveDeep: 'Modeling with inequalities requires translating both the monetary values and the comparison phrase correctly. Each dime is worth $0.10, so d dimes contribute 0.10d dollars — not just d. The phrase "at least" means "greater than or equal to" (≥), while "at most" would mean ≤. Watch for both pitfalls: using the wrong coin value (d vs. 0.10d) and the wrong inequality direction.'
    },
    {
      number: 15,
      part: 'A',
      text: 'The formula for the area of a trapezoid is A = ½(b₁ + b₂)h. The height, h, of the trapezoid may be expressed as',
      choices: [
        'h = 2A − b₁ − b₂',
        'h = A / (2(b₁ + b₂))',
        'h = 2A / (b₁ + b₂)',
        'h = (b₁ + b₂) / 2A'
      ],
      topic: 'Linear Equations & Inequalities',
      correct: 2,
      explanation: 'Solving A = ½(b₁ + b₂)h for h: multiply both sides by 2 to get 2A = (b₁ + b₂)h, then divide by (b₁ + b₂) to get h = 2A / (b₁ + b₂).',
      diveDeep: 'Rearranging a formula (literal equation) uses the same inverse-operation steps as solving for a number. To isolate h, first undo the fraction ½ by multiplying both sides by 2, then undo the multiplication by (b₁ + b₂) through division. Treat (b₁ + b₂) as a single grouped quantity. A frequent error is distributing or splitting that sum incorrectly — keep it together as one factor throughout.'
    },
    {
      number: 16,
      part: 'A',
      text: 'The function f(x) = |x| is multiplied by k to create the new function g(x) = k|x|. Which statement is true about the graphs of f(x) and g(x) if k = 2?',
      choices: [
        'g(x) is a reflection of f(x) over the y-axis.',
        'g(x) is a reflection of f(x) over the x-axis.',
        'g(x) is wider than f(x).',
        'g(x) is narrower than f(x).'
      ],
      topic: 'Functions & Relations',
      correct: 3,
      explanation: 'Multiplying by k = 2 stretches the graph vertically, making the V-shape steeper and therefore narrower than the parent function f(x) = |x|.',
      diveDeep: 'Multiplying a function by a constant k vertically stretches it when |k| > 1 (narrower) and vertically compresses it when 0 < |k| < 1 (wider). A negative k would also reflect the graph over the x-axis. For the absolute-value V, a larger k means steeper sides. Test a point to confirm: at x = 1, f(1) = 1 but g(1) = 2, so the graph rises faster and looks narrower.'
    },
    {
      number: 17,
      part: 'A',
      text: 'Some adults were surveyed to find out if they would prefer to buy a sports utility vehicle (SUV) or a sports car. The results of the survey are summarized in the table. Of the number of adults that preferred sports cars, approximately what percent were males?',
      choices: ['15.8', '45.2', '64.4', '82.6'],
      topic: 'Statistics & Probability',
      correct: 1,
      explanation: 'Of the 84 adults who preferred sports cars, 38 were male, so 38/84 ≈ 0.452 = 45.2%.',
      diveDeep: 'Two-way frequency tables let you compute conditional percentages — the key is identifying the correct total (the denominator). Here the condition is "preferred sports cars," so the denominator is the sports-car column total (84), not the male row total or the grand total. A classic mistake is dividing by the wrong total. Always reread which group the question restricts to, then divide the count in your category by that group’s total.',
      image: '/images/exams/alg1-june-2023/q17.png'
    },
    {
      number: 18,
      part: 'A',
      text: 'The solution to 2x² = 72 is',
      choices: ['{9, 4}', '{6}', '{6, −6}', '{36}'],
      topic: 'Quadratic Functions',
      correct: 2,
      explanation: 'Dividing both sides by 2 gives x² = 36, and taking the square root gives x = ±6, so the solution set is {6, −6}.',
      diveDeep: 'When solving x² = c by taking square roots, you must include BOTH the positive and negative root, because both 6² and (−6)² equal 36. First isolate x² (here, divide by 2) before taking the root. The most common error is reporting only the positive solution. The presence of two solutions reflects that a parabola y = 2x² − 72 crosses the x-axis at two points.'
    },
    {
      number: 19,
      part: 'A',
      text: 'Three quadratic functions are given below. I. f(x) = (x + 2)² + 5 II. g(x) given by a table with vertex at (−2, 5) III. h(x) graphed with vertex at (−2, 5). Which of these functions have the same vertex?',
      choices: ['I and II, only', 'I and III, only', 'II and III, only', 'I, II, and III'],
      topic: 'Quadratic Functions',
      correct: 3,
      explanation: 'Function I in vertex form (x + 2)² + 5 has vertex (−2, 5), and both the table and the graph also have their minimum at (−2, 5), so all three share the same vertex.',
      diveDeep: 'The vertex of a quadratic can be read from three representations: vertex form f(x) = a(x − h)² + k gives vertex (h, k); a table shows the vertex as the point where outputs reverse direction (minimum or maximum); and a graph shows it as the turning point. Note the sign flip in vertex form — (x + 2)² means h = −2. Comparing across representations is a core Regents skill; convert each to its vertex coordinates before comparing.',
      image: '/images/exams/alg1-june-2023/q19.png'
    },
    {
      number: 20,
      part: 'A',
      text: 'The domain of the function f(x) = x² + x − 12 is',
      choices: ['(−∞, −4]', '[−4, 3]', '(−∞, ∞)', '[3, ∞)'],
      topic: 'Functions & Relations',
      correct: 2,
      explanation: 'A polynomial function is defined for every real number, so its domain is all real numbers, written (−∞, ∞).',
      diveDeep: 'The domain is the set of all x-values for which a function is defined. Polynomials (including quadratics) have no division by zero and no square roots of negatives, so they accept every real input — domain (−∞, ∞). Restrictions on domain arise only from denominators (cannot equal zero) or even roots (cannot be negative inside). Do not confuse domain with range; the values −4 and 3 here are actually the x-intercepts, which are a distractor, not the domain.'
    },
    {
      number: 21,
      part: 'A',
      text: 'A father makes a deal with his son regarding his weekly allowance. The first year, he agrees to pay his son a weekly allowance of $10. Every subsequent year, the allowance is recalculated by doubling the previous year’s weekly allowance and then subtracting 8. Which recursive formula could be used to calculate the son’s weekly allowance in future years?',
      choices: [
        'a₁ = 10, aₙ = 2aₙ₋₁ + 8',
        'a₁ = 10, aₙ = 2aₙ₋₁ − 8',
        'a₁ = 8, aₙ = 2aₙ₋₁ − 10',
        'a₁ = 10, aₙ = 2(aₙ − 8)'
      ],
      topic: 'Sequences',
      correct: 1,
      explanation: 'The starting value is a₁ = 10, and each year doubles the previous term and subtracts 8, giving aₙ = 2aₙ₋₁ − 8.',
      diveDeep: 'A recursive formula needs two parts: an initial term and a rule expressing each term in terms of the previous one (aₙ₋₁). Translate the words literally: "doubling the previous year’s allowance" is 2aₙ₋₁, and "subtracting 8" gives − 8. A correct recursive definition must reference aₙ₋₁ (the prior term), not n itself — formulas using n directly are explicit, not recursive. Always confirm the initial condition matches the stated starting value of $10.'
    },
    {
      number: 22,
      part: 'A',
      text: 'What is the solution to the inequality (1/3)x + 4 ≥ 2x − 11?',
      choices: ['x ≤ 9', 'x ≤ −15', 'x ≥ 9', 'x ≥ −15'],
      topic: 'Linear Equations & Inequalities',
      correct: 0,
      explanation: 'Subtracting (1/3)x and adding 11 gives 15 ≥ (5/3)x; multiplying both sides by 3/5 gives 9 ≥ x, i.e., x ≤ 9.',
      diveDeep: 'Solving linear inequalities mirrors solving equations, with one critical rule: multiplying or dividing both sides by a NEGATIVE number flips the inequality sign. To avoid fractions, you can multiply the whole inequality by 3 at the start: x + 12 ≥ 6x − 33, then 45 ≥ 5x, so x ≤ 9. Be careful when rewriting "9 ≥ x" as "x ≤ 9" — the variable’s relationship is preserved, but reading it from the variable’s side avoids confusion.'
    },
    {
      number: 23,
      part: 'A',
      text: 'Which equation represents a line that is parallel to the line y = (2/3)x + 5 and passes through the point (3, 1)?',
      choices: [
        'y = (2/3)x − 1',
        'y = −(3/2)x + 1',
        'y = (2/3)x + 1',
        'y = (3/2)x − 1'
      ],
      topic: 'Linear Equations & Inequalities',
      correct: 0,
      explanation: 'Parallel lines share the same slope 2/3; using point-slope with (3, 1) gives y − 1 = (2/3)(x − 3), which simplifies to y = (2/3)x − 1.',
      diveDeep: 'Parallel lines have equal slopes, while perpendicular lines have slopes that are negative reciprocals. Here the target slope is 2/3, eliminating any choice with a different slope. To find the intercept, substitute the given point into y = (2/3)x + b: 1 = (2/3)(3) + b = 2 + b, so b = −1. Distinguishing parallel (same slope) from perpendicular (opposite reciprocal, here −3/2) is essential to avoid the distractor answers.'
    },
    {
      number: 24,
      part: 'A',
      text: 'The function P(t) = 5000(1.03)^t models the population of a town t years after 2020. What is the best interpretation of the value 1.03 in this function?',
      choices: [
        'The population increases by 3% each year.',
        'The population increases by 103 people each year.',
        'The population started at 1.03 people.',
        'The population decreases by 3% each year.'
      ],
      topic: 'Functions & Relations',
      correct: 0,
      explanation: 'In an exponential model a(b)^t, the base 1.03 means the population is multiplied by 1.03 each year, equivalent to a 3% annual increase.',
      diveDeep: 'In exponential growth/decay of the form a(b)^t, the coefficient a is the initial amount (here 5000) and the base b is the growth factor. A base greater than 1 indicates growth; b = 1.03 means 100% of the previous value plus 3% more, so a 3% increase per year. A base between 0 and 1, like 0.97, would mean a 3% decrease. Do not confuse the multiplicative factor (1.03) with an additive constant (103 people) — exponential change is percentage-based, not a fixed number per period.',
      image: '/images/exams/alg1-june-2023/q24.png'
    },

    // ── Part B (Part II) – 2 credits each ────────────────────────────────────
    {
      number: 25,
      part: 'B',
      type: 'written',
      text: 'Solve for x: 2(x − 3) + 5 = 3x − 4',
      topic: 'Linear Equations & Inequalities',
      explanation: 'Distribute to get 2x − 6 + 5 = 3x − 4, then simplify to 2x − 1 = 3x − 4, and solve to get x = 3.',
      diveDeep: 'Start by distributing the 2 across the parentheses: 2·x and 2·(−3). After combining like terms on the left (−6 + 5 = −1), move all variable terms to one side and constants to the other. Subtracting 2x from both sides and adding 4 to both sides isolates x. Always substitute your answer back into the original equation to verify: 2(3 − 3) + 5 = 5 and 3(3) − 4 = 5 ✓.',
      modelAnswer: 'Step 1: Distribute — 2x − 6 + 5 = 3x − 4.\nStep 2: Combine like terms on left — 2x − 1 = 3x − 4.\nStep 3: Subtract 2x from both sides — −1 = x − 4.\nStep 4: Add 4 to both sides — x = 3.\nCheck: 2(3 − 3) + 5 = 5 and 3(3) − 4 = 5 ✓'
    },
    {
      number: 26,
      part: 'B',
      type: 'written',
      text: 'The function f(x) is graphed on the set of axes below. The graph shows a curve passing through the x-axis at x = −3, x = 1, and x = 4.\n\nState the zeros of f(x). Explain your reasoning.',
      topic: 'Functions & Relations',
      explanation: 'The zeros of f(x) are x = −3, x = 1, and x = 4 because those are the x-values where the graph crosses the x-axis, meaning f(x) = 0 at those points.',
      diveDeep: 'The zeros (also called roots or x-intercepts) of a function are the x-values that make f(x) = 0. On a graph, these are exactly the points where the curve crosses or touches the horizontal axis. Each x-intercept corresponds to a factor of the function — for example, a zero at x = 4 means (x − 4) is a factor. Students sometimes confuse zeros with y-intercepts; remember that zeros occur where y = 0, while the y-intercept is where x = 0.',
      modelAnswer: 'The zeros of f(x) are x = −3, x = 1, and x = 4.\n\nReasoning: The zeros of a function are the x-values at which f(x) = 0. On the graph, f(x) = 0 where the curve intersects the x-axis. The graph crosses the x-axis at x = −3, x = 1, and x = 4, so those are the three zeros.'
    },
    {
      number: 27,
      part: 'B',
      type: 'written',
      text: 'Breanna creates the pattern of blocks below in her art class.\n\nPattern I: 4 blocks, Pattern II: 8 blocks, Pattern III: 12 blocks, Pattern IV: 16 blocks.\n\nA friend tells her that the number of blocks in the pattern is increasing exponentially. Is her friend correct? Explain your reasoning.',
      topic: 'Functions & Relations',
      explanation: 'The friend is incorrect. The pattern increases by 4 blocks each time (constant rate of change), which is linear growth, not exponential growth.',
      diveDeep: 'Exponential growth requires the number of blocks to be multiplied by the same factor each step, such as doubling (×2). Instead, each pattern adds exactly 4 more blocks than the previous one: 4, 8, 12, 16 — a constant difference of 4. This is arithmetic (linear) growth. To confirm: for exponential growth, the ratio of consecutive terms must be constant. Here the ratios are 8/4 = 2, 12/8 = 1.5, 16/12 ≈ 1.33 — they are not equal, so growth is not exponential.',
      modelAnswer: 'No, the friend is not correct. The pattern is increasing linearly, not exponentially.\n\nReasoning: \n• Pattern I: 4 blocks\n• Pattern II: 8 blocks (4 more)\n• Pattern III: 12 blocks (4 more)\n• Pattern IV: 16 blocks (4 more)\n\nThe number of blocks increases by a constant difference of 4 each time. Exponential growth requires multiplication by a constant factor each step (e.g., doubling), not constant addition. Therefore, this pattern is linear (arithmetic), not exponential.'
    },
    {
      number: 28,
      part: 'B',
      type: 'written',
      text: 'The data set 20, 36, 52, 56, 24, 16, 40, 4, 28 represents the number of books purchased by nine book club members in a year.\n\nConstruct a box plot for these data on the number line below.',
      topic: 'Statistics & Probability',
      explanation: 'Order the data: 4, 16, 20, 24, 28, 36, 40, 52, 56. The five-number summary is minimum = 4, Q1 = 18, median = 28, Q3 = 46, maximum = 56, and the box plot is drawn using these values.',
      diveDeep: 'To construct a box plot, first arrange all values in order from least to greatest. Identify the five-number summary: minimum, first quartile (Q1 = median of the lower half), median (Q2), third quartile (Q3 = median of the upper half), and maximum. With 9 values, the median is the 5th value (28). The lower half is {4, 16, 20, 24}, giving Q1 = (16 + 20)/2 = 18. The upper half is {36, 40, 52, 56}, giving Q3 = (40 + 52)/2 = 46. Draw the box from Q1 to Q3 with a line at the median, and extend whiskers to the min and max.',
      modelAnswer: 'Step 1: Order the data — 4, 16, 20, 24, 28, 36, 40, 52, 56.\nStep 2: Five-number summary:\n  • Minimum = 4\n  • Q1 = (16 + 20) / 2 = 18\n  • Median (Q2) = 28 (5th value)\n  • Q3 = (40 + 52) / 2 = 46\n  • Maximum = 56\nStep 3: Draw the box plot:\n  • Left whisker from 4 to 18\n  • Box from 18 to 46\n  • Vertical line inside box at 28\n  • Right whisker from 46 to 56'
    },
    {
      number: 29,
      part: 'B',
      type: 'written',
      text: 'Given:\nA = x + 5\nB = x² − 18\n\nExpress A² + B in standard form.',
      topic: 'Polynomials & Factoring',
      explanation: 'A² = (x + 5)² = x² + 10x + 25, then A² + B = x² + 10x + 25 + x² − 18 = 2x² + 10x + 7.',
      diveDeep: 'To square a binomial, use the rule (a + b)² = a² + 2ab + b². Here (x + 5)² = x² + 2(x)(5) + 25 = x² + 10x + 25. A very common mistake is writing (x + 5)² = x² + 25, forgetting the middle term 2ab. After expanding, add B = x² − 18 by combining like terms by degree: x² + x² = 2x², the 10x has no like term, and 25 + (−18) = 7. Standard form means writing in descending degree order.',
      modelAnswer: 'Step 1: Square A.\n  A² = (x + 5)² = x² + 2(x)(5) + 5² = x² + 10x + 25\n\nStep 2: Add B.\n  A² + B = (x² + 10x + 25) + (x² − 18)\n\nStep 3: Combine like terms.\n  = 2x² + 10x + 7\n\nA² + B = 2x² + 10x + 7'
    },
    {
      number: 30,
      part: 'B',
      type: 'written',
      text: 'The two relations shown below are not functions.\n\nRelation I: A graph of a curve that fails the vertical line test.\nRelation II: {(−5, −2), (−4, 0), (−2, 1), (−1, 3), (−4, 4)}\n\nExplain how you could change each relation so that they each become a function.',
      topic: 'Functions & Relations',
      explanation: 'For Relation I, remove or adjust the portion of the graph that causes it to fail the vertical line test so each x-value has only one y-value. For Relation II, remove one of the two ordered pairs with x = −4 (either (−4, 0) or (−4, 4)) so each x-value maps to exactly one y-value.',
      diveDeep: 'A relation is a function if and only if every x-value (input) is paired with exactly one y-value (output). Relation I fails the vertical line test — a vertical line can cross its graph at more than one point, meaning one x produces multiple y-values. Relation II contains the ordered pairs (−4, 0) and (−4, 4), so x = −4 maps to two outputs, violating the function definition. For the set, simply remove one of the conflicting pairs. For the graph, any edit that makes it pass the vertical line test is valid.',
      modelAnswer: 'Relation I: Change the graph by removing the portion that causes a vertical line to intersect the graph more than once, so that every vertical line crosses the graph at most once (passes the vertical line test). This ensures each x-value corresponds to exactly one y-value.\n\nRelation II: The pair (−4, 0) and (−4, 4) both have x = −4, which means one input maps to two outputs — not a function. Remove one of those ordered pairs. For example, remove (−4, 4) so that Relation II becomes {(−5, −2), (−4, 0), (−2, 1), (−1, 3)}, which is a function.'
    },
    {
      number: 31,
      part: 'B',
      type: 'written',
      text: 'Factor 2x² + 16x − 18 completely.',
      topic: 'Polynomials & Factoring',
      explanation: 'Factor out the GCF of 2 first: 2(x² + 8x − 9), then factor the trinomial to get 2(x + 9)(x − 1).',
      diveDeep: '"Completely" signals that you must factor out the greatest common factor (GCF) before factoring the trinomial — leaving the 2 inside is a common error that loses a credit. After pulling out 2, find two numbers that multiply to −9 and add to 8: those are +9 and −1. Always check by expanding: 2(x + 9)(x − 1) = 2(x² − x + 9x − 9) = 2(x² + 8x − 9) = 2x² + 16x − 18 ✓.',
      modelAnswer: 'Step 1: Find the GCF.\n  GCF of 2x², 16x, and −18 is 2.\n\nStep 2: Factor out 2.\n  2(x² + 8x − 9)\n\nStep 3: Factor the trinomial x² + 8x − 9.\n  Need two numbers that multiply to −9 and add to 8: +9 and −1.\n  x² + 8x − 9 = (x + 9)(x − 1)\n\nStep 4: Write the complete factorization.\n  2x² + 16x − 18 = 2(x + 9)(x − 1)'
    },
    {
      number: 32,
      part: 'B',
      type: 'written',
      text: 'Solve 3d² − 8d + 3 = 0 algebraically for all values of d, rounding to the nearest tenth.',
      topic: 'Quadratic Functions',
      explanation: 'Using the quadratic formula with a = 3, b = −8, c = 3: d = (8 ± √(64 − 36)) / 6 = (8 ± √28) / 6, giving d ≈ 2.2 and d ≈ 0.5.',
      diveDeep: 'This trinomial does not factor over the integers, so the quadratic formula is required: d = (−b ± √(b² − 4ac)) / (2a). Compute the discriminant first: (−8)² − 4(3)(3) = 64 − 36 = 28. Since 28 > 0, there are two real solutions. √28 ≈ 5.292. Two solutions: d = (8 + 5.292)/6 ≈ 13.292/6 ≈ 2.2 and d = (8 − 5.292)/6 ≈ 2.708/6 ≈ 0.5. Always carry extra decimal places in intermediate steps to avoid rounding errors in the final answer.',
      modelAnswer: 'Step 1: Identify a, b, c.\n  a = 3, b = −8, c = 3\n\nStep 2: Apply the quadratic formula.\n  d = (−b ± √(b² − 4ac)) / (2a)\n  d = (8 ± √(64 − 36)) / 6\n  d = (8 ± √28) / 6\n  d = (8 ± 5.2915…) / 6\n\nStep 3: Solve for both values.\n  d = (8 + 5.2915) / 6 ≈ 13.2915 / 6 ≈ 2.2\n  d = (8 − 5.2915) / 6 ≈ 2.7085 / 6 ≈ 0.5\n\nd ≈ 2.2 and d ≈ 0.5'
    },

    // ── Part C (Part III) – 4 credits each ───────────────────────────────────
    {
      number: 33,
      part: 'C',
      type: 'written',
      text: 'Graph f(x) = |x| + 1 and g(x) = −x² + 6x + 1 on the set of axes below.\n\nBased on your graph, determine all values of x for which f(x) = g(x).',
      topic: 'Functions & Relations',
      explanation: 'After graphing both functions, the curves intersect at x = 0 and x = 5, so f(x) = g(x) when x = 0 and x = 5.',
      diveDeep: 'Graph f(x) = |x| + 1 by shifting the absolute-value V up 1 unit; it has vertex (0, 1) and arms with slope ±1. Graph g(x) = −x² + 6x + 1 by finding its vertex: x = −6/(2·(−1)) = 3, y = −9 + 18 + 1 = 10, so vertex (3, 10), opening downward. Set the equations equal to find intersections algebraically: for x ≥ 0, |x| + 1 = x + 1, so x + 1 = −x² + 6x + 1 → x² − 5x = 0 → x(x − 5) = 0 → x = 0 or x = 5. Check x < 0: −x + 1 = −x² + 6x + 1 → x² − 7x = 0 → x = 0 or x = 7 (not negative). So x = 0 and x = 5.',
      modelAnswer: 'Step 1: Graph f(x) = |x| + 1.\n  Vertex at (0, 1); slopes of +1 (right) and −1 (left).\n  Points: (−3, 4), (−2, 3), (−1, 2), (0, 1), (1, 2), (2, 3), (3, 4).\n\nStep 2: Graph g(x) = −x² + 6x + 1.\n  Vertex: x = −6/(2·(−1)) = 3; y = −9 + 18 + 1 = 10 → vertex (3, 10).\n  Points: (0, 1), (1, 6), (2, 9), (3, 10), (4, 9), (5, 6), (6, 1).\n\nStep 3: Identify intersection points from the graph.\n  The graphs intersect at (0, 1) and (5, 6).\n\nThe values of x for which f(x) = g(x) are x = 0 and x = 5.'
    },
    {
      number: 34,
      part: 'C',
      type: 'written',
      text: 'Jean recorded temperatures over a 24-hour period one day in August in Syracuse, NY. Her results are shown in the table below.\n\nTime (hour): 0, 3, 6, 9, 12, 15, 18, 21, 24\nTemperature (°F): 80, 75, 70, 78, 92, 89, 85, 80, 74\n\nHer data are modeled on the graph.\n\n(a) State the entire interval over which the temperature is increasing.\n(b) State the three-hour interval that has the greatest rate of change in temperature.\n(c) State the average rate of change from hour 12 to hour 24. Explain what this means in the context of the problem.',
      topic: 'Functions & Relations',
      explanation: 'The temperature increases from hour 6 to hour 12. The greatest three-hour rate of change is from hour 6 to hour 9 (rise of 8°F) or hour 9 to hour 12 (rise of 14°F) — it is from hour 9 to hour 12 with a change of 14°F in 3 hours. The average rate of change from hour 12 to 24 is (74 − 92)/(24 − 12) = −18/12 = −1.5°F per hour.',
      diveDeep: 'Rate of change = (change in temperature) / (change in time). Calculate all three-hour intervals: 0→3: −5, 3→6: −5, 6→9: +8, 9→12: +14, 12→15: −3, 15→18: −4, 18→21: −5, 21→24: −6. The greatest (largest absolute rise) is 9→12 at +14°F/3 hr. For the increasing interval, the temperature must be going up continuously — from hour 6 (70°F) to hour 12 (92°F). The average rate from hour 12 to 24 is −1.5°F per hour, meaning the temperature was decreasing on average by 1.5 degrees per hour during that 12-hour afternoon-to-midnight span.',
      modelAnswer: '(a) Interval where temperature is increasing:\n  From the table, temperature decreases from hour 0–6, then increases from 70°F at hour 6 to 92°F at hour 12.\n  The temperature is increasing on the interval [6, 12].\n\n(b) Greatest three-hour rate of change:\n  Calculate each 3-hour interval:\n  6 to 9: (78 − 70)/3 = 8/3 ≈ 2.67°F per hour\n  9 to 12: (92 − 78)/3 = 14/3 ≈ 4.67°F per hour ← greatest\n  The interval from hour 9 to hour 12 has the greatest rate of change.\n\n(c) Average rate of change from hour 12 to hour 24:\n  Rate = (74 − 92) / (24 − 12) = −18 / 12 = −1.5°F per hour\n\n  In context: The temperature decreased at an average rate of 1.5°F per hour from noon to midnight.'
    },
    {
      number: 35,
      part: 'C',
      type: 'written',
      text: 'Solve the following system of inequalities graphically on the set of axes below. Label the solution set S.\n\n2x + 3y ≥ −6\nx < 3y + 6\n\nIs the point (4, −2) in the solution set? Explain your answer.',
      topic: 'Linear Equations & Inequalities',
      explanation: 'Graph both boundary lines, shade the correct half-planes, and label the overlapping region S. The point (4, −2) is NOT in the solution set because it does not satisfy x < 3y + 6 (4 < 3(−2) + 6 → 4 < 0, which is false).',
      diveDeep: 'For the first inequality 2x + 3y ≥ −6, rewrite as y ≥ (−2x − 6)/3. The boundary line is solid (≥) and you shade above it. For x < 3y + 6, rewrite as x − 6 < 3y, or y > (x − 6)/3; the boundary is dashed (<) and you shade above it. To check a point, substitute into BOTH inequalities — a point is in the solution set only if it satisfies both. For (4, −2): check inequality 1: 2(4) + 3(−2) = 2 ≥ −6 ✓; check inequality 2: 4 < 3(−2) + 6 = 0, so 4 < 0 is FALSE. Since one inequality fails, (4, −2) is not in S.',
      modelAnswer: 'Step 1: Graph 2x + 3y ≥ −6.\n  Boundary line: 2x + 3y = −6 (solid, since ≥)\n  Rewrite: y = (−2x − 6)/3\n  x-intercept: (−3, 0); y-intercept: (0, −2)\n  Shade above the line (where y values are larger).\n\nStep 2: Graph x < 3y + 6.\n  Boundary line: x = 3y + 6 (dashed, since <)\n  Rewrite: y = (x − 6)/3\n  x-intercept: (6, 0); y-intercept: (0, −2)\n  Shade to the left (where x < 3y + 6).\n\nStep 3: Label the overlapping shaded region S.\n\nStep 4: Check (4, −2).\n  Inequality 1: 2(4) + 3(−2) = 8 − 6 = 2 ≥ −6 ✓\n  Inequality 2: 4 < 3(−2) + 6 = −6 + 6 = 0 → 4 < 0 ✗\n\nThe point (4, −2) is NOT in the solution set because it does not satisfy the second inequality.'
    },
    {
      number: 36,
      part: 'C',
      type: 'written',
      text: 'Suzanna collected information about a group of ponies and horses. She made a table showing the height, measured in hands (hh), and the weight, measured in pounds (lbs), of each pony and horse.\n\nHeight (hh) x: 11, 12, 13, 14, 15, 16, 17\nWeight (lbs) y: 264, 638, 700, 850, 1000, 1230, 1495\n\n(a) Write the linear regression equation for this set of data. Round all values to the nearest hundredth.\n(b) State the correlation coefficient for the linear regression. Round your answer to the nearest hundredth.\n(c) Explain what the correlation coefficient indicates about the linear fit of the data in the context of the problem.',
      topic: 'Statistics & Probability',
      explanation: 'Using linear regression, the equation is approximately y = 205.14x − 2106.07, the correlation coefficient r ≈ 0.99, indicating a very strong positive linear relationship between a horse\'s height and weight.',
      diveDeep: 'Enter the data into a graphing calculator (STAT → EDIT → L1, L2) and run LinReg(ax + b) under STAT CALC. The slope a ≈ 205.14 means that for each additional hand of height, the weight increases by about 205.14 pounds. The y-intercept b ≈ −2106.07 is the theoretical weight at height 0, which has no practical meaning here. The correlation coefficient r close to 1 signals a very strong, nearly perfect positive linear association — taller animals are heavier in a highly consistent, near-linear pattern.',
      modelAnswer: '(a) Linear regression equation:\n  Using a graphing calculator with the given data:\n  ŷ = 205.14x − 2106.07\n  (where x = height in hands, y = predicted weight in pounds)\n\n(b) Correlation coefficient:\n  r ≈ 0.99\n\n(c) Interpretation:\n  A correlation coefficient of r ≈ 0.99 is very close to 1, indicating a very strong positive linear relationship between the height and weight of ponies and horses. This means that as height increases, weight increases in a nearly linear pattern with very little scatter around the regression line.'
    },

    // ── Part D (Part IV) – 6 credits ─────────────────────────────────────────
    {
      number: 37,
      part: 'D',
      type: 'written',
      text: 'Dana went shopping for plants to put in her garden. She bought three roses and two daisies for $31.88. Later that day, she went back and bought two roses and one daisy for $18.92.\n\nIf r represents the cost of one rose and d represents the cost of one daisy, write a system of equations that models this situation.\n\nUse your system of equations to algebraically determine both the cost of one rose and the cost of one daisy.\n\nIf Dana had waited until the plants were on sale, she would have paid $4.50 for each rose and $6.50 for each daisy. Determine the total amount of money she would have saved by buying all of her flowers during the sale.',
      topic: 'Linear Equations & Inequalities',
      explanation: 'The system is 3r + 2d = 31.88 and 2r + d = 18.92. Solving gives r = $5.96 and d = $7.00. At sale prices, Dana would pay 3($4.50) + 2($6.50) = $26.50, saving $31.88 − $26.50 = $5.38 for the first trip, and 2($4.50) + 1($6.50) = $15.50, saving $18.92 − $15.50 = $3.42 for the second trip, for a total savings of $8.80.',
      diveDeep: 'Setting up the system is the first critical step: each shopping trip gives one equation. Multiplying the second equation by 2 gives 4r + 2d = 37.84, and subtracting the first equation eliminates d: r = 5.96. Back-substitute to find d: 2(5.96) + d = 18.92 → d = 18.92 − 11.92 = 7.00. For the savings calculation, compute the total paid on each trip at sale prices, subtract from the original price, and add the two savings together. Watch for the question asking for TOTAL savings across BOTH trips combined, not just one.',
      modelAnswer: 'Step 1: Write the system of equations.\n  Trip 1: 3r + 2d = 31.88\n  Trip 2: 2r + d = 18.92\n\nStep 2: Solve the system algebraically (elimination).\n  Multiply equation 2 by 2:\n    4r + 2d = 37.84\n  Subtract equation 1:\n    (4r + 2d) − (3r + 2d) = 37.84 − 31.88\n    r = 5.96\n\n  Substitute r = 5.96 into 2r + d = 18.92:\n    2(5.96) + d = 18.92\n    11.92 + d = 18.92\n    d = 7.00\n\n  Check trip 1: 3(5.96) + 2(7.00) = 17.88 + 14.00 = 31.88 ✓\n  Check trip 2: 2(5.96) + 1(7.00) = 11.92 + 7.00 = 18.92 ✓\n\n  One rose costs $5.96 and one daisy costs $7.00.\n\nStep 3: Calculate savings at sale prices.\n  Dana bought: 3 roses + 2 daisies (trip 1) and 2 roses + 1 daisy (trip 2).\n\n  Trip 1 at sale price: 3($4.50) + 2($6.50) = $13.50 + $13.00 = $26.50\n    Savings: $31.88 − $26.50 = $5.38\n\n  Trip 2 at sale price: 2($4.50) + 1($6.50) = $9.00 + $6.50 = $15.50\n    Savings: $18.92 − $15.50 = $3.42\n\n  Total savings: $5.38 + $3.42 = $8.80\n\nDana would have saved $8.80 by buying all her flowers during the sale.'
    }
  ]
}
