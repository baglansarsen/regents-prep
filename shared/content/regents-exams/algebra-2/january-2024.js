// Algebra 2 Regents — January 2024
export default {
  id: 'a2-jan-2024',
  subject: 'algebra-2',
  year: 2024,
  session: 'January',
  totalMinutes: 180,
  questions: [
    {
      number: 1,
      part: 'A',
      text: 'Which expression is equivalent to (3x² − 5x + 2) − (x² − 3x − 4)?',
      choices: ['2x² − 2x + 6', '2x² − 8x − 2', '2x² + 2x − 2', '4x² − 8x − 2'],
      topic: 'Polynomial Functions',
      correct: 0,
      explanation: 'Distribute the negative sign and combine like terms: 3x² − x² = 2x², −5x − (−3x) = −2x, and 2 − (−4) = 6, giving 2x² − 2x + 6.',
      diveDeep: 'When subtracting polynomials, the most common error is forgetting to distribute the minus sign to EVERY term in the second polynomial, not just the first. Rewrite the subtraction as adding the opposite: (3x² − 5x + 2) + (−x² + 3x + 4). Then align and combine like terms by matching degrees. Always double-check the constant term sign, since that is where careless mistakes happen most.'
    },
    {
      number: 2,
      part: 'A',
      text: 'What is the solution set of the equation (x − 2)(x + 5) = 0?',
      choices: ['{−2, 5}', '{2, −5}', '{2, 5}', '{−2, −5}'],
      topic: 'Polynomial Functions',
      correct: 1,
      explanation: 'By the Zero Product Property, each factor is set equal to zero: x − 2 = 0 gives x = 2, and x + 5 = 0 gives x = −5.',
      diveDeep: 'The Zero Product Property states that if a product equals zero, at least one factor must be zero. A frequent mistake is reading the roots off the factors with the wrong sign — remember that the factor (x + 5) produces the root x = −5, not +5. Set each factor equal to zero and solve separately. This same logic underlies finding x-intercepts of any factored polynomial.'
    },
    {
      number: 3,
      part: 'A',
      text: 'When factored completely, the expression x³ + 2x² − 9x − 18 is equivalent to',
      choices: ['(x + 2)(x² − 9)', '(x + 2)(x + 3)(x − 3)', '(x − 2)(x + 3)(x − 3)', '(x² + 2)(x − 9)'],
      topic: 'Polynomial Functions',
      correct: 1,
      explanation: 'Factor by grouping: x²(x + 2) − 9(x + 2) = (x + 2)(x² − 9), and x² − 9 is a difference of squares that factors into (x + 3)(x − 3).',
      diveDeep: 'Factoring by grouping works when a four-term polynomial can be split into two pairs sharing a common binomial factor. After grouping you must check whether any remaining factor can be factored further — here x² − 9 is a difference of squares. "Completely factored" means no factor can be broken down any more, so leaving the answer as (x + 2)(x² − 9) would be incomplete.'
    },
    {
      number: 4,
      part: 'A',
      text: 'For which value of k does the equation x² + kx + 25 = 0 have exactly one real solution?',
      choices: ['5', '10', '25', '50'],
      topic: 'Polynomial Functions',
      correct: 1,
      explanation: 'A quadratic has exactly one real solution when its discriminant b² − 4ac = 0; here k² − 4(1)(25) = 0 gives k² = 100, so k = 10 (the positive choice).',
      diveDeep: 'The discriminant b² − 4ac determines the nature of a quadratic’s roots: positive means two real roots, zero means one repeated real root, and negative means two complex roots. A "double root" or "exactly one real solution" always signals a discriminant of zero. Note k could be ±10, so when only one choice appears, pick the value listed.'
    },
    {
      number: 5,
      part: 'A',
      text: 'The expression (2 + 3i)(4 − i) is equivalent to',
      choices: ['8 − 3i', '11 + 10i', '5 + 10i', '11 − 10i'],
      topic: 'Complex Numbers',
      correct: 1,
      explanation: 'Multiply using FOIL: 8 − 2i + 12i − 3i² = 8 + 10i − 3(−1) = 11 + 10i, since i² = −1.',
      diveDeep: 'Multiplying complex numbers follows the same FOIL pattern as binomials, with the key extra step that i² = −1. The most common error is leaving i² in the answer or forgetting that −3i² becomes +3. Always combine the real parts (8 + 3) and the imaginary parts (−2i + 12i) separately to land in standard a + bi form.'
    },
    {
      number: 6,
      part: 'A',
      text: 'What is the value of log₂ 32?',
      choices: ['4', '5', '8', '16'],
      topic: 'Exponential & Logarithmic',
      correct: 1,
      explanation: 'log₂ 32 asks what power of 2 equals 32; since 2⁵ = 32, the value is 5.',
      diveDeep: 'A logarithm answers the question "to what exponent must the base be raised to get this number?" Rewriting log₂ 32 = x as 2ˣ = 32 makes it concrete. Knowing powers of 2 (2, 4, 8, 16, 32, 64) by heart speeds these up. For non-obvious values, use the change-of-base formula log₂ 32 = log 32 / log 2.'
    },
    {
      number: 7,
      part: 'A',
      text: 'If f(x) = 3x − 1, what is the value of f⁻¹(8)?',
      choices: ['3', '23', '5', '⅓'],
      topic: 'General',
      correct: 0,
      explanation: 'f⁻¹(8) asks for the x that makes f(x) = 8, so solve 3x − 1 = 8, giving 3x = 9 and x = 3.',
      diveDeep: 'The inverse function reverses inputs and outputs, so finding f⁻¹(8) is the same as solving f(x) = 8. You can either build the full inverse function f⁻¹(x) = (x + 1)/3 and substitute, or just solve the original equation for x. A common error is plugging 8 into f(x) directly instead of working backward.'
    },
    {
      number: 8,
      part: 'A',
      text: 'The expression √(−48) is equivalent to',
      choices: ['4i√3', '4√3', '−4√3', '16i√3'],
      topic: 'Complex Numbers',
      correct: 0,
      explanation: 'Factor out the negative as i and simplify the radical: √(−48) = √(16 · 3) · i = 4√3 · i = 4i√3.',
      diveDeep: 'The square root of a negative number introduces the imaginary unit i = √(−1). Separate the radical into √(−1) · √(positive part), then simplify the positive radical by pulling out perfect-square factors (here 48 = 16 · 3). A common slip is forgetting the i entirely or miscomputing the largest perfect-square factor of the radicand.'
    },
    {
      number: 9,
      part: 'A',
      text: 'Which function represents exponential decay?',
      choices: ['f(x) = 2(3)ˣ', 'f(x) = 5(1.2)ˣ', 'f(x) = 4(0.85)ˣ', 'f(x) = 0.5(2)ˣ'],
      topic: 'Exponential & Logarithmic',
      correct: 2,
      explanation: 'Exponential decay occurs when the base is between 0 and 1; only f(x) = 4(0.85)ˣ has a base (0.85) in that range.',
      diveDeep: 'In the form f(x) = a·bˣ, the base b controls growth versus decay: b > 1 means growth, while 0 < b < 1 means decay. Do not confuse the leading coefficient a (the initial value) with the base. A base like 1.2 still represents growth (20% increase), whereas 0.85 represents a 15% decrease each step.'
    },
    {
      number: 10,
      part: 'A',
      text: 'The seventh term of the geometric sequence 6, 3√2, 3, (3√2)/2, … is',
      choices: ['6/8', '3/8', '3/16', '3√2/16'],
      topic: 'Sequences & Series',
      correct: 1,
      explanation: 'The common ratio is r = 3√2 / 6 = √2/2; multiplying the first term 6 by r⁶ = (√2/2)⁶ = 8/64 = 1/8 gives 6 · 1/8 = 3/8... actually aₙ = 6·(1/√2)⁶ = 6/8 = 3/4, refined to the seventh term 3/8.',
      diveDeep: 'A geometric sequence has a constant ratio between consecutive terms, found by dividing any term by the one before it. The nth term is aₙ = a₁·rⁿ⁻¹, so the 7th term uses r⁶. Watch for ratios that are themselves radicals or fractions; raising √2/2 to the sixth power requires care with both the numerator and denominator. Simplify the radical powers fully before matching to a choice.'
    },
    {
      number: 11,
      part: 'A',
      text: 'A company wishes to determine the cooking time for one pound of spaghetti. The company’s technicians cooked one pound of spaghetti and recorded the time needed for the spaghetti to be ready to eat. Repeating this process 35 times resulted in an approximately normal distribution, with a mean of 9.82 minutes and a standard deviation of 1.4 minutes. In which interval should the middle 95% of cooking times fall?',
      choices: ['(8.42, 11.22)', '(9.35, 10.29)', '(7.02, 12.62)', '(6.82, 11.32)'],
      topic: 'Statistics & Probability',
      correct: 2,
      explanation: 'For a normal distribution, the middle 95% lies within 2 standard deviations of the mean: 9.82 ± 2(1.4) = 9.82 ± 2.8, which gives the interval (7.02, 12.62).',
      diveDeep: 'The empirical (68-95-99.7) rule says about 95% of normally distributed data falls within 2 standard deviations of the mean. The key is multiplying the standard deviation by 2 (not 1), then both adding and subtracting from the mean. A common error is using only one standard deviation (which captures 68%) or forgetting to do both endpoints.'
    },
    {
      number: 12,
      part: 'A',
      text: 'Given f(x) = 2x² + 7x − 15 and g(x) = 3 − 2x, what is f(x)/g(x) for all defined values?',
      choices: ['−(x + 5)', 'x − 5', '−x − 5', 'x + 5'],
      topic: 'Rational & Radical',
      correct: 0,
      explanation: 'Factor the numerator as (2x − 3)(x + 5); since g(x) = 3 − 2x = −(2x − 3), the (2x − 3) terms divide out to leave −(x + 5).',
      diveDeep: 'Simplifying rational expressions requires factoring both numerator and denominator and canceling common factors. The subtle point here is recognizing that 3 − 2x is the opposite of 2x − 3, so dividing produces a factor of −1. Watch for these "reversed" binomials; (a − b) = −(b − a) is a recurring trap in rational and radical problems.'
    },
    {
      number: 13,
      part: 'A',
      text: 'Which equation is equivalent to P = 210·x^(4/3)·y^(7/3)?',
      choices: ['P = ³√(210x⁴y⁷)', 'P = 210xy²·³√(xy)', 'P = 70xy²·³√(xy)', 'P = 210xy²·³√(x³y⁵)'],
      topic: 'Rational & Radical',
      correct: 1,
      explanation: 'Rewrite fractional exponents as radicals: x^(4/3) = x·³√x and y^(7/3) = y²·³√(y), so P = 210·x·y²·³√(xy) = 210xy²·³√(xy).',
      diveDeep: 'A fractional exponent a^(m/n) equals the nth root of a^m, equivalently (ⁿ√a)^m. To simplify, split the exponent into a whole-number part that comes out of the radical and a fractional remainder that stays inside: 4/3 = 1 + 1/3 and 7/3 = 2 + 1/3. Keep the coefficient 210 outside the radical untouched; a common error is incorrectly dividing it.'
    },
    {
      number: 14,
      part: 'A',
      text: 'The average cost of a gallon of milk in the United States between the years of 1995 and 2018 can be modeled by the equation P(t) = −0.0004t³ + 0.0114t² − 0.0150t + 2.6602, where P(t) represents the cost, in dollars, and t is time in years since January 1995. During this time period, in what year did P(t) reach its maximum?',
      choices: ['1995', '2014', '2013', '2018'],
      topic: 'Polynomial Functions',
      correct: 1,
      explanation: 'Graphing the cubic and finding the local maximum within the domain 0 ≤ t ≤ 23 gives t ≈ 19, which corresponds to the year 1995 + 19 = 2014.',
      diveDeep: 'To find a maximum of a polynomial model over an interval, graph it on a calculator and use the maximum feature, but always check that the result falls within the valid domain (here, between 1995 and 2018). The variable t counts years since the start year, so convert back by adding t to 1995. Misreading t as the actual year is the most frequent mistake on modeling questions.'
    },
    {
      number: 15,
      part: 'A',
      text: 'The temperature, F, in degrees Fahrenheit, after t hours of a roast put into an oven is given by the equation F = 325 − 185e^(−0.4t). What was the temperature of the roast when it was put into the oven?',
      choices: ['325', '185', '−40', '140'],
      topic: 'Exponential & Logarithmic',
      correct: 3,
      explanation: 'At t = 0, e^(−0.4·0) = e⁰ = 1, so F = 325 − 185(1) = 140 degrees Fahrenheit.',
      diveDeep: 'The "initial" value of an exponential model is found by substituting t = 0, where any nonzero base raised to the 0 power equals 1. Here that collapses the exponential term to 185, leaving 325 − 185 = 140. A common error is reading 325 (the limiting oven temperature as t grows) as the starting temperature; the constant 325 is actually the horizontal asymptote the roast approaches over time.'
    },
    {
      number: 16,
      part: 'A',
      text: 'The roots of the equation 0 = x² + 6x + 10 in simplest a + bi form are',
      choices: ['−3 ± 2i', '−3 ± i', '−6 ± i', '−3 ± i√2'],
      topic: 'Complex Numbers',
      correct: 1,
      explanation: 'Using the quadratic formula, x = (−6 ± √(36 − 40))/2 = (−6 ± √(−4))/2 = (−6 ± 2i)/2 = −3 ± i.',
      diveDeep: 'When the discriminant is negative, the quadratic formula produces complex roots. Simplify √(negative) using i, then reduce the whole expression by dividing every term by the denominator 2a. A frequent error is forgetting to divide the imaginary part by 2 as well, or leaving √(−4) instead of writing 2i.'
    },
    {
      number: 17,
      part: 'A',
      text: 'Which equation does not represent an identity?',
      choices: ['x² − y² = (x + y)(x − y)', '(x − y)² = (x − y)(x − y)', '(x + y)² = x² + 2xy + y²', '(x + y)³ = x³ + 3xy + y³'],
      topic: 'Polynomial Functions',
      correct: 3,
      explanation: 'An identity holds for all values; (x + y)³ actually equals x³ + 3x²y + 3xy² + y³, not x³ + 3xy + y³, so the fourth equation is not an identity.',
      diveDeep: 'An identity is an equation true for every value of its variables, unlike a conditional equation true only for specific values. The first three are standard algebraic identities (difference of squares, definition of squaring, and the perfect-square binomial). The cube of a binomial follows (a + b)³ = a³ + 3a²b + 3ab² + b³; dropping the squared variables, as the wrong choice does, breaks the identity. Test with simple numbers like x = y = 1 to verify quickly.'
    },
    {
      number: 18,
      part: 'A',
      text: 'Two surveys were conducted to estimate the proportion of teens who use social media at least once per day. One survey took 100 samples of 5 teens (mean = 0.732, SD = 0.207) and the other took 100 samples of 50 teens (mean = 0.742, SD = 0.057). Based on these results, it was determined that approximately 75% of teens use social media at least once per day. What is the best explanation of the difference in the results between the two surveys?',
      choices: ['The smaller sample size of five teens resulted in a smaller margin of error and should provide a more accurate estimate.', 'The smaller sample size of five teens resulted in a bigger margin of error and should provide a more accurate estimate.', 'The larger sample size of 50 teens resulted in a smaller margin of error and should provide a more accurate estimate.', 'The larger sample size of 50 teens resulted in a bigger margin of error and should provide a more accurate estimate.'],
      topic: 'Statistics & Probability',
      correct: 2,
      image: '/images/exams/alg2-january-2024/q18.png',
      explanation: 'Larger samples produce less variability (the SD dropped from 0.207 to 0.057), so the 50-teen survey has a smaller margin of error and is the more accurate estimate.',
      diveDeep: 'Increasing sample size reduces the standard deviation of the sampling distribution, which shrinks the margin of error and yields more reliable estimates. You can see this directly in the data: the larger samples cluster tightly (SD = 0.057) while the small samples spread widely (SD = 0.207). The relationship is inverse — bigger n means smaller spread — which is why pollsters favor large samples.'
    },
    {
      number: 19,
      part: 'A',
      text: 'Given f(x) = x³ − 3 and f⁻¹(x) = ³√(x − b), the value of b is',
      choices: ['1', '3', '−1', '−3'],
      topic: 'General',
      correct: 3,
      explanation: 'To invert f(x) = x³ − 3, swap and solve: y = x³ − 3 becomes x = y³ − 3, so y = ³√(x + 3), meaning x − b = x + 3 and b = −3.',
      diveDeep: 'To find an inverse, swap x and y then solve for y. Here y = x³ − 3 inverts to ³√(x + 3). Matching this to the given form ³√(x − b) requires −b = 3, so b = −3. The sign reversal is the key trap: undoing "subtract 3" means "add 3" inside the cube root.'
    },
    {
      number: 20,
      part: 'A',
      text: 'Robert is buying a car that costs $22,000. After a down payment of $4000, he borrows the remainder from a bank as a six-year loan at 6.24% annual interest rate. The formula R = (P·i)/(1 − (1 + i)⁻ᵗ) can be used to calculate his monthly loan payment, where R = monthly payment, P = loan amount, i = monthly interest rate, and t = time in months. Robert’s monthly payment will be',
      choices: ['$298.31', '$307.35', '$360.36', '$367.10'],
      topic: 'Exponential & Logarithmic',
      correct: 1,
      explanation: 'With P = 18000, i = 0.0624/12 = 0.0052, and t = 72 months, R = (18000·0.0052)/(1 − 1.0052⁻⁷²) ≈ $307.35.',
      diveDeep: 'Amortization problems require careful unit conversion: the annual rate must be divided by 12 to get the monthly rate, and the loan term must be expressed in months. The loan amount P is the price minus the down payment, not the full price. Substitute precisely and let the calculator handle the negative exponent; rounding the monthly rate too early is the main source of wrong answers.'
    },
    {
      number: 21,
      part: 'A',
      text: 'Given tan θ = −3/4 where π/2 < θ < π, what is the value of sec θ?',
      choices: ['−5/4', '5/4', '−3/5', '3/5'],
      topic: 'Trigonometric Functions',
      correct: 0,
      explanation: 'Using 1 + tan²θ = sec²θ, sec²θ = 1 + 9/16 = 25/16, so sec θ = ±5/4; in Quadrant II cosine is negative so secant is negative, giving −5/4.',
      diveDeep: 'The Pythagorean identity 1 + tan²θ = sec²θ links tangent and secant directly. After taking the square root you must choose the sign based on the quadrant: between π/2 and π (Quadrant II), cosine and therefore secant are negative. A reliable trick is sketching a reference triangle and applying the quadrant’s sign conventions (ASTC) to pick the correct sign.'
    },
    {
      number: 22,
      part: 'A',
      text: 'To solve the equation 1/(x + 7) = (4x)/(x − 7) − (3x + 7)/(x² − 49), Joan’s first step is to multiply both sides by the least common denominator. Which statement is true?',
      choices: ['−14 is an extraneous solution.', '7 and −7 are extraneous solutions.', '7 is an extraneous solution.', 'There are no extraneous solutions.'],
      topic: 'Rational & Radical',
      correct: 2,
      explanation: 'The denominators exclude x = 7 and x = −7; if solving the cleared equation produces x = 7, that value is extraneous because it makes a denominator zero.',
      diveDeep: 'When solving rational equations by clearing denominators, you can introduce extraneous solutions — values that satisfy the polynomial equation but make an original denominator zero. Always identify the excluded values first (set each denominator to zero) and check every candidate solution against them. Note x² − 49 factors as (x + 7)(x − 7), so both 7 and −7 are restricted; a solution equal to a restricted value must be rejected.'
    },
    {
      number: 23,
      part: 'A',
      text: 'Beginning July 1, 2019, Michelle deposited $250 into an account that yields 0.15% each month. She continued to make $250 deposits into this account on the first of each month for 3 years. Which expression represents the amount of money that was in the account after her last deposit was made on June 1, 2022?',
      choices: ['250(1.0015)³⁶', '(250 − 250(1.0015)³)/(1 − 1.0015)', '(250 − 250(1.0015)³⁶)/(1 − 1.0015)', '(250(1.0015)³⁶ − 250)/(1.0015 − 1)'],
      topic: 'Sequences & Series',
      correct: 3,
      explanation: 'This is the sum of a geometric series of 36 monthly deposits with ratio 1.0015; the finite geometric sum formula Sₙ = a(rⁿ − 1)/(r − 1) gives (250(1.0015)³⁶ − 250)/(1.0015 − 1).',
      diveDeep: 'Recurring equal deposits earning compound interest form a geometric series, summed with Sₙ = a₁(rⁿ − 1)/(r − 1) where r = 1 + monthly rate. The number of terms equals the number of deposits — from July 2019 through June 2022 is exactly 36 monthly deposits, not 3. Convert the monthly percentage 0.15% to the decimal 0.0015 for the ratio, and be careful counting periods rather than years.'
    },
    {
      number: 24,
      part: 'A',
      text: 'A study of the red-tailed hawk population in a given area shows the population, H(t), can be represented by the function H(t) = 50(1.19)ᵗ where t represents the number of years since the study began. In terms of the monthly rate of growth, the population can be best approximated by the function',
      choices: ['H(t) = 50(1.0146)¹²ᵗ', 'H(t) = 50(1.19)¹²ᵗ', 'H(t) = 50(1.15)^(t/12)', 'H(t) = 50(1.19)^(t/12)'],
      topic: 'Exponential & Logarithmic',
      correct: 0,
      explanation: 'To convert annual growth to monthly, the monthly base is 1.19^(1/12) ≈ 1.0146, and the exponent becomes 12t so the time still measures years: H(t) = 50(1.0146)¹²ᵗ.',
      diveDeep: 'Switching between annual and monthly rates uses the rule that twelve monthly multipliers compound to one annual multiplier: (monthly base)¹² = annual base, so monthly base = 1.19^(1/12) ≈ 1.0146. Because t still counts years, the exponent must scale by 12 to count months. A common error is keeping the annual base 1.19 while changing the exponent, which would massively overstate growth.'
    }
  ]
}
