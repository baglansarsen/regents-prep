export const STRATEGIES = {
  'algebra-2-u1': {
    mentalPrep: [
      'Know the three factoring patterns: difference of squares, sum/difference of cubes, and trinomial factoring.',
      'End behavior is determined solely by the leading term — coefficient sign and exponent parity.',
      'The Remainder and Factor Theorems let you test factors without long division: p(a) = 0 means (x − a) is a factor.'
    ],
    answeringTechniques: [
      'For zero-finding questions, look for common factors first, then factor the resulting polynomial.',
      'Verify end behavior: even degree with positive leading coefficient → both ends rise.'
    ],
    guessingStrategy: [
      'A polynomial of degree n has exactly n roots (counting multiplicity, including complex ones).',
      'If a zero is given, divide it out to find a simpler factor to work with.'
    ],
    processOfElimination: [
      'Eliminate end behaviors that contradict the sign of the leading coefficient.',
      'Discard factored forms that do not expand back to the original polynomial.'
    ],
    timeManagement: [
      'Synthetic division is faster than long division for testing rational roots.',
      'Sketch the end behavior and approximate zeros mentally before solving for exact values.'
    ]
  },

  'algebra-2-u2': {
    mentalPrep: [
      'Always identify excluded values (where the denominator = 0) before simplifying a rational expression.',
      'To add/subtract rational expressions, find the least common denominator (LCD) first.',
      'For radical equations, isolate the radical, square both sides, then CHECK for extraneous solutions.'
    ],
    answeringTechniques: [
      'Simplify rational expressions by factoring numerator and denominator, then cancel common factors.',
      'For x^(m/n), the denominator n is the root and the numerator m is the power.'
    ],
    guessingStrategy: [
      'Extraneous solutions arise when squaring introduces solutions that do not satisfy the original radical equation — always verify.',
      'For domain questions: set denominator ≠ 0 and/or radicand ≥ 0 (for even roots).'
    ],
    processOfElimination: [
      'Eliminate any solution that makes the original denominator zero.',
      'For radical equations, check the sign: √(something) ≥ 0, so eliminate negative answers if the equation says √x = negative.'
    ],
    timeManagement: [
      'LCD calculations for two-term denominators can be done mentally by multiplying both denominators.',
      'Simplify the radical first (e.g., √75 = 5√3) before performing further operations.'
    ]
  },

  'algebra-2-u3': {
    mentalPrep: [
      'Recall the three log rules: Product Rule (log AB = log A + log B), Quotient Rule, and Power Rule (log Aᵖ = p·log A).',
      'log_b(x) = y ↔ b^y = x — convert between log and exponential form freely.',
      'Know the inverse relationship: b^(log_b x) = x and log_b(b^x) = x.'
    ],
    answeringTechniques: [
      'For exponential equations, take log of both sides if bases cannot be equated directly.',
      'For log equations, consolidate into a single log, then convert to exponential form.'
    ],
    guessingStrategy: [
      'For exponential growth/decay: if the base > 1, it grows; if 0 < base < 1, it decays.',
      'Doubling time: set the exponent equal to ln 2 / rate when using e^(rate·t) models.'
    ],
    processOfElimination: [
      'Eliminate log of a negative or zero — the domain of logarithms is x > 0.',
      'For exponential equations, eliminate bases that cannot be rewritten to match.'
    ],
    timeManagement: [
      'Simple exponential equations (same base) are solved instantly by equating exponents.',
      'Use the Change of Base formula (log_b x = log x / log b) on the calculator for non-standard bases.'
    ]
  },

  'algebra-2-u4': {
    mentalPrep: [
      'Memorize key unit circle angles: 0, π/6, π/4, π/3, π/2 and their sine/cosine values.',
      'Period = 2π/|b|, Amplitude = |a|, Phase shift = −c/b in f(x) = a·sin(bx + c) + d.',
      'The Pythagorean identity sin²θ + cos²θ = 1 is the foundation — derive others from it.'
    ],
    answeringTechniques: [
      'To find a reference angle: subtract from 180° (Quadrant II), 180° (Quadrant III), or 360° (Quadrant IV).',
      'Convert between radians and degrees with the factor π/180 or 180/π.'
    ],
    guessingStrategy: [
      'ASTC (All Students Take Calculus): All positive Q1, Sin positive Q2, Tan positive Q3, Cos positive Q4.',
      'If the amplitude doubles, the graph stretches vertically — the period is unchanged.'
    ],
    processOfElimination: [
      'Eliminate periods that do not match 2π/|b|.',
      'Discard amplitudes that are negative — amplitude is always a positive value.'
    ],
    timeManagement: [
      'Unit circle recall is faster than using identities to re-derive values.',
      'Period and amplitude questions are usually two-step calculations — set them up quickly.'
    ]
  },

  'algebra-2-u5': {
    mentalPrep: [
      'Know the 68-95-99.7 rule for normal distributions: 68% within 1σ, 95% within 2σ, 99.7% within 3σ.',
      'z = (x − μ)/σ — the z-score standardizes values to compare them across different distributions.',
      'Combinations C(n,r) = n!/(r!(n−r)!); use when order does not matter.'
    ],
    answeringTechniques: [
      'For probability of independent events, multiply: P(A and B) = P(A) · P(B).',
      'For P(A or B), use the addition rule: P(A or B) = P(A) + P(B) − P(A and B).'
    ],
    guessingStrategy: [
      'If a question asks about variability or spread, the answer is almost always standard deviation.',
      'For "within two standard deviations" problems with a normal distribution, the answer is 95%.'
    ],
    processOfElimination: [
      'Probability answers must be between 0 and 1 inclusive — eliminate any choice outside this range.',
      'Eliminate combinations when the question states "arranged in order" — that requires permutations.'
    ],
    timeManagement: [
      'Standard normal/68-95-99.7 problems do not require a calculator — solve by reasoning.',
      'Combination calculations with small numbers (C(7,3)) can be computed mentally.'
    ]
  },

  'algebra-2-u6': {
    mentalPrep: [
      'Remember: i¹=i, i²=−1, i³=−i, i⁴=1 — the pattern repeats every 4 powers.',
      'To multiply complex numbers, use FOIL and substitute i²=−1.',
      'The conjugate of (a+bi) is (a−bi); their product is the real number a²+b².'
    ],
    answeringTechniques: [
      'To add/subtract complex numbers, add/subtract real parts and imaginary parts separately.',
      'To divide complex numbers, multiply numerator and denominator by the conjugate of the denominator.'
    ],
    guessingStrategy: [
      'When discriminant < 0, solutions come in conjugate pairs: p + qi and p − qi.',
      'Any power of i can be simplified: divide the exponent by 4 and use the remainder to find which of i, −1, −i, or 1 applies.'
    ],
    processOfElimination: [
      'Eliminate choices with isolated i² terms — they should be replaced with −1.',
      'If the answer should be a real number (e.g., multiplying a complex number by its conjugate), eliminate any complex answer choices.'
    ],
    timeManagement: [
      'Powers of i reduction is a two-second operation: find the remainder when dividing by 4.',
      'FOIL of two complex binomials takes about 30 seconds — a predictable, manageable calculation.'
    ]
  },

  'algebra-2-u7': {
    mentalPrep: [
      'Check MODE first: Degree vs Radian must match the question, and a+bi mode is needed for complex-number work.',
      'Reset trig graphs with ZOOM 7: ZTrig and other graphs with ZOOM 0: ZoomFit before reading values.',
      'For a logarithm of an unusual base, use MATH ▶ A: logBASE( or the change-of-base formula log(x)/log(b).'
    ],
    answeringTechniques: [
      'Solve log, exponential, and trig equations graphically: enter each side as Y1/Y2 and use 2nd CALC ▶ 5: intersect.',
      'Identify the data pattern before choosing a regression — ExpReg for growth/decay, SinReg for periodic, QuadReg for parabolic.'
    ],
    guessingStrategy: [
      'Plug answer choices into Y= and graph or evaluate them; the calculator can confirm an answer you cannot solve algebraically.',
      'For "which model fits" questions, run the matching regression and compare r (or R²) — the value closest to 1 wins.'
    ],
    processOfElimination: [
      'Graph the function and eliminate choices whose domain, asymptote, or end behavior the screen contradicts (log is only defined for x > 0).',
      'Eliminate trig answers that ignore the MODE — a Degree-mode value will not match a Radian-mode choice.'
    ],
    timeManagement: [
      'Use 2nd TABLE to scan many function values at once instead of evaluating them one at a time.',
      'Store messy intermediate results with STO▶ rather than retyping long decimals — faster and less error-prone.'
    ]
  }
}
