// Enriched algebra-1 exam — difficulty tags mapped offline
export default {
  "id": "a1-aug-2022",
  "subject": "algebra-1",
  "year": 2022,
  "session": "August",
  "totalMinutes": 180,
  "questions": [
    {
      "number": 1,
      "part": "A",
      "text": "If f(x) = 3x² + 4, then f(8) is",
      "choices": [
        "−1",
        "14",
        "196",
        "4"
      ],
      "topic": "Functions & Relations",
      "correct": 2,
      "explanation": "Substitute x = 8 into the function: f(8) = 3(8²) + 4 = 3(64) + 4 = 192 + 4 = 196.",
      "diveDeep": "Function notation f(8) simply means \"evaluate the rule using 8 in place of x.\" Follow order of operations carefully: square first, then multiply, then add. A common mistake is computing 3·8 = 24 before squaring (giving 24² + 4) instead of squaring the 8 first. For any \"find f(value)\" question, replace every x with the number in parentheses and simplify step by step.",
      "subTopic": "Function Notation",
      "difficulty": 2,
      "difficultyRationale": "Requires evaluating a function for a given numerical input using order of operations."
    },
    {
      "number": 2,
      "part": "A",
      "text": "If x ≠ 0, then the common ratio of the sequence x, 2x², 4x³, 8x⁴, 16x⁵, ... is",
      "choices": [
        "2x",
        "x",
        "2",
        "x + 2"
      ],
      "topic": "Sequences",
      "correct": 0,
      "explanation": "Divide any term by the previous term: 2x² ÷ x = 2x, and 4x³ ÷ 2x² = 2x, so the common ratio is 2x.",
      "diveDeep": "A geometric sequence has a constant common ratio r found by dividing consecutive terms. Here both the coefficient (1, 2, 4, 8, 16...) doubles and the power of x increases by one each time, so the ratio combines both: factor of 2 from the coefficients and a factor of x from the exponents. Always test the ratio with at least two pairs of terms to confirm it is truly constant.",
      "subTopic": "Geometric Sequences",
      "difficulty": 2,
      "difficultyRationale": "Requires basic application of algebraic formulas, function evaluation, or solving simple equations."
    },
    {
      "number": 3,
      "part": "A",
      "text": "The expression 36x² − 9 is equivalent to",
      "choices": [
        "(6x − 3)²",
        "(6x + 3)(6x − 3)",
        "(18x − 4.5)²",
        "(18x + 4.5)(18x − 4.5)"
      ],
      "topic": "Polynomials & Factoring",
      "correct": 1,
      "explanation": "This is a difference of two squares: 36x² − 9 = (6x)² − (3)² = (6x + 3)(6x − 3).",
      "diveDeep": "The difference of squares pattern a² − b² = (a + b)(a − b) applies whenever you have a perfect square minus a perfect square. Recognize that 36x² = (6x)² and 9 = 3². The squared options (6x − 3)² are wrong because squaring a binomial produces a middle term (−36x here), which the original expression does not have. Watch for this pattern any time two perfect-square terms are subtracted.",
      "subTopic": "Polynomial Operations",
      "difficulty": 2,
      "difficultyRationale": "Requires distributing terms and combining like terms in a polynomial expression."
    },
    {
      "number": 4,
      "part": "A",
      "text": "Given the relation R = {(−4, 2), (3, 6), (x, 8), (−1, 4)}. Which value of x would make this relation a function?",
      "choices": [
        "−4",
        "3",
        "−1",
        "0"
      ],
      "topic": "Functions & Relations",
      "correct": 3,
      "explanation": "A relation is a function only if no input (x-value) repeats. The inputs −4, 3, and −1 are already used, so x must be 0 to keep every input distinct.",
      "diveDeep": "A function assigns exactly one output to each input, which means no x-value may appear more than once with a different y. Scanning the existing ordered pairs, the x-values −4, 3, and −1 are taken, so choosing any of those would create a repeated input with two different outputs, breaking the function rule. Only 0 is unused, making it the safe choice. The \"vertical line test\" is the graphical version of this same idea.",
      "subTopic": "Relations & Functions",
      "difficulty": 2,
      "difficultyRationale": "Requires solving a simple two-step linear equation."
    },
    {
      "number": 5,
      "part": "A",
      "text": "If the point (K, 5) lies on the line whose equation is 3x − y = 7, then the value of K is",
      "choices": [
        "−8",
        "−2",
        "4",
        "12/3"
      ],
      "topic": "Linear Equations & Inequalities",
      "correct": 2,
      "explanation": "Substitute y = 5: 3K − 5 = 7, so 3K = 12 and K = 4.",
      "diveDeep": "A point lies on a line exactly when its coordinates satisfy the equation. Plug the known coordinate (here y = 5) into the equation and solve for the unknown. Be careful with the subtraction sign: 3x − y = 7 becomes 3K − 5 = 7, not 3K + 5. Isolating the variable by undoing operations in reverse order (add 5, then divide by 3) gives the answer.",
      "subTopic": "Linear Functions & Graphing",
      "difficulty": 2,
      "difficultyRationale": "Requires basic application of algebraic formulas, function evaluation, or solving simple equations."
    },
    {
      "number": 6,
      "part": "A",
      "text": "The expression 3x(6x² − 3x − 9) is equivalent to",
      "choices": [
        "18x² − 9x − 27",
        "18x³ − 9x² − 27x",
        "18x² − 3x + 3",
        "18x³ − 9x² + 9x"
      ],
      "topic": "Polynomials & Factoring",
      "correct": 1,
      "explanation": "Distribute 3x to each term: 3x·6x² = 18x³, 3x·(−3x) = −9x², 3x·(−9) = −27x, giving 18x³ − 9x² − 27x.",
      "diveDeep": "Distributing a monomial across a polynomial means multiplying it by every term inside the parentheses. Multiply coefficients (3·6 = 18) and add exponents on like bases (x·x² = x³). A frequent error is forgetting to multiply the variable into all three terms, or mishandling the exponent when multiplying x by x² and x¹. Keep the sign of each term as you go.",
      "subTopic": "Polynomial Operations",
      "difficulty": 2,
      "difficultyRationale": "Requires distributing terms and combining like terms in a polynomial expression."
    },
    {
      "number": 7,
      "part": "A",
      "text": "The graphs below represent four polynomial functions. Which of these functions has zeros of −1 and 3?",
      "choices": [
        "Graph A",
        "Graph B",
        "Graph C",
        "Graph D"
      ],
      "topic": "Quadratic Functions",
      "correct": 2,
      "image": "/images/exams/alg1-august-2022/q7.png",
      "explanation": "The zeros of a function are where its graph crosses the x-axis; the correct graph crosses at x = −1 and x = 3.",
      "diveDeep": "Zeros (also called roots or x-intercepts) are the x-values where the function equals zero, i.e., where the curve touches or crosses the x-axis. To match zeros to a graph, read the x-axis crossing points directly. For a quadratic with zeros −1 and 3, the factored form would be (x + 1)(x − 3), and its vertex sits halfway between the roots at x = 1. Confirm both crossings rather than just one.",
      "subTopic": "Solving Quadratics",
      "difficulty": 2,
      "difficultyRationale": "Requires basic application of algebraic formulas, function evaluation, or solving simple equations."
    },
    {
      "number": 8,
      "part": "A",
      "text": "What is the constant term of the polynomial 4d − 6 + 3d²?",
      "choices": [
        "−6",
        "3",
        "2",
        "4"
      ],
      "topic": "Polynomials & Factoring",
      "correct": 0,
      "explanation": "The constant term is the term with no variable; here that is −6.",
      "diveDeep": "In a polynomial, the constant term is the value that does not change with the variable—it has no d attached. The terms 4d and 3d² both contain the variable, so they are not constants. When a polynomial is written in standard form (3d² + 4d − 6), the constant always appears last. Be sure to include the negative sign that precedes it.",
      "subTopic": "Polynomial Operations",
      "difficulty": 2,
      "difficultyRationale": "Requires basic application of algebraic formulas, function evaluation, or solving simple equations."
    },
    {
      "number": 9,
      "part": "A",
      "text": "Emily was given $600 for her high school graduation. She invested it in an account that earns 2.4% interest per year. If she does not make any deposits or withdrawals, which expression can be used to determine the amount of money that will be in the account after 4 years?",
      "choices": [
        "600(1 + 0.24)⁴",
        "600(1 − 0.024)⁴",
        "600(1 + 0.024)⁴",
        "600(0.024)⁴"
      ],
      "topic": "Functions & Relations",
      "correct": 2,
      "explanation": "Compound growth uses A = P(1 + r)ᵗ. With P = 600, r = 0.024, and t = 4, the expression is 600(1 + 0.024)⁴.",
      "diveDeep": "For exponential growth, the base (1 + r) must use the decimal form of the rate: 2.4% = 0.024, not 0.24. The \"+1\" represents keeping the original amount while adding the new interest each year. Common errors include misplacing the decimal (0.24 is 24%) or using subtraction, which would model decay rather than growth. The exponent is the number of compounding periods—here 4 years.",
      "skill": "modeling",
      "subTopic": "Relations & Functions",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 10,
      "part": "A",
      "text": "Different ways to represent the same data are shown below (I, II, and III). Which data representations have a median of 2?",
      "choices": [
        "I and II, only",
        "II and III, only",
        "I and III, only",
        "I, II, and III"
      ],
      "topic": "Statistics & Probability",
      "correct": 0,
      "image": "/images/exams/alg1-august-2022/q10.png",
      "explanation": "The median is the middle value of an ordered data set; representations I and II both have a middle value of 2.",
      "diveDeep": "The median is the center of a data set when values are listed in order—it splits the data so half lie below and half above. Different displays (dot plots, box plots, histograms) can describe the same numbers, so read each carefully to locate the middle. The median is resistant to outliers, unlike the mean. When comparing representations, find the median of each independently before deciding which ones match.",
      "subTopic": "Data & Distributions",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 11,
      "part": "A",
      "text": "What would be the order of these quadratic functions when they are arranged from the narrowest graph to the widest graph?  f(x) = 5x²,  g(x) = 0.5x²,  h(x) = 3x²",
      "choices": [
        "f(x), g(x), h(x)",
        "h(x), f(x), g(x)",
        "g(x), h(x), f(x)",
        "f(x), h(x), g(x)"
      ],
      "topic": "Quadratic Functions",
      "correct": 3,
      "explanation": "The larger the absolute value of the leading coefficient, the narrower the parabola; ordering from largest to smallest coefficient (5, 3, 0.5) gives f(x), h(x), g(x).",
      "diveDeep": "The coefficient a in y = ax² controls the width of a parabola. A larger |a| stretches the graph vertically, making it appear narrower, while a smaller |a| (especially between 0 and 1) makes it wider. So narrowest-to-widest means sorting the coefficients from greatest to least: 5 > 3 > 0.5. A common mistake is reversing the relationship—remember that big numbers pinch the parabola in.",
      "skill": "graphing",
      "subTopic": "Graphing Parabolas",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 12,
      "part": "A",
      "text": "At Berkeley Central High School, a survey was conducted to see if students preferred cheeseburgers, pizza, or hot dogs for lunch. The two-way table shows results — Females: 32 cheeseburgers, 44 pizza, 24 hot dogs; Males: 36 cheeseburgers, 30 pizza, 34 hot dogs. Based on this survey, what percent of the students preferred pizza?",
      "choices": [
        "30",
        "44",
        "37",
        "74"
      ],
      "topic": "Statistics & Probability",
      "correct": 2,
      "image": "/images/exams/alg1-august-2022/q12.png",
      "explanation": "Pizza total = 44 + 30 = 74; grand total = 200; 74/200 = 0.37 = 37%.",
      "diveDeep": "In a two-way frequency table, a \"percent of all students\" question uses the grand total as the denominator. First add every cell to get the total (32+44+24+36+30+34 = 200), then add only the pizza column (74), and divide. The trap answer 74 is the raw count, not a percent, and 44 ignores the male pizza eaters. Always identify whether the question asks for a count, a row/column percent, or a percent of the whole.",
      "subTopic": "Data & Distributions",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 13,
      "part": "A",
      "text": "Which situation could be modeled by a linear function?",
      "choices": [
        "The value of a car depreciates by 7% annually.",
        "A gym charges a $50 initial fee and then $30 monthly.",
        "The number of bacteria in a lab doubles weekly.",
        "The amount of money in a bank account increases by 0.1% monthly."
      ],
      "topic": "Linear Equations & Inequalities",
      "correct": 1,
      "explanation": "A linear function changes by a constant amount each period; the gym adds a fixed $30 every month, giving a constant rate of change.",
      "diveDeep": "Linear models grow or shrink by a constant amount (repeated addition/subtraction), while exponential models change by a constant percent or factor (repeated multiplication). Phrases like \"7% annually,\" \"doubles,\" or \"increases by 0.1%\" signal exponential behavior. A flat starting fee plus a fixed monthly charge produces a straight line y = 30x + 50. Identify whether the change is \"+ a number\" (linear) or \"× a factor / % change\" (exponential).",
      "skill": "modeling",
      "subTopic": "Linear Functions & Graphing",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 14,
      "part": "A",
      "text": "Four functions are represented (a table for g(x), the equation h(x) = x − 3, a graph for k(x), and the equation f(x) = x² + 2x − 1). Which function has the smallest y-intercept value?",
      "choices": [
        "g(x)",
        "h(x)",
        "k(x)",
        "f(x)"
      ],
      "topic": "Functions & Relations",
      "correct": 1,
      "image": "/images/exams/alg1-august-2022/q14.png",
      "explanation": "The y-intercept is the output when x = 0; h(0) = −3, which is smaller (more negative) than the other intercepts (g: 1, k: −2, f: −1).",
      "diveDeep": "The y-intercept is found by evaluating each function at x = 0, regardless of how the function is represented—equation, table, or graph. From an equation, set x = 0; from a table, find the row where x = 0; from a graph, read where the curve crosses the y-axis. \"Smallest\" means the most negative number, so −3 beats −2 and −1. Comparing across representations is a recurring Regents skill.",
      "skill": "graphing",
      "subTopic": "Function Notation",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 15,
      "part": "A",
      "text": "When solving x² + 10x − 13 = 0 by completing the square, which equation is a step in the process?",
      "choices": [
        "(x + 5)² = 38",
        "(x + 10)² = 38",
        "(x + 5)² = 12",
        "(x + 10)² = 12"
      ],
      "topic": "Quadratic Functions",
      "correct": 0,
      "explanation": "Move −13 over (x² + 10x = 13), add (10/2)² = 25 to both sides (x² + 10x + 25 = 38), then factor: (x + 5)² = 38.",
      "diveDeep": "To complete the square on x² + bx, add (b/2)² to both sides; the left side then factors as (x + b/2)². Here b = 10, so b/2 = 5 and (b/2)² = 25. The constant 13 (after moving it across) plus the added 25 gives 38 on the right. A frequent error is using (x + 10)² instead of (x + 5)²—remember to halve the linear coefficient before squaring.",
      "subTopic": "Quadratic Models",
      "difficulty": 3,
      "difficultyRationale": "Requires converting a quadratic function from standard form to vertex form by completing the square."
    },
    {
      "number": 16,
      "part": "A",
      "text": "When 3x² + 7x + 6 − 2x³ is written in standard form, the leading coefficient is",
      "choices": [
        "7",
        "3",
        "−2",
        "6"
      ],
      "topic": "Polynomials & Factoring",
      "correct": 2,
      "explanation": "Standard form orders terms by descending degree: −2x³ + 3x² + 7x + 6, so the leading coefficient is −2.",
      "diveDeep": "The leading coefficient is the number in front of the highest-degree term once the polynomial is written in descending order. Here the highest power is x³, and its coefficient is −2 (the sign travels with the term). A common slip is grabbing 3 because 3x² appears first as written, but it is not the highest degree. Always reorder to standard form before identifying the leading term.",
      "subTopic": "Polynomial Operations",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 17,
      "part": "A",
      "text": "Which of the equations below have the same solution?  I. 10(x − 5) = 15   II. 4 + 2(x − 2) = 9   III. (1/2)x + 3 = (3/2)",
      "choices": [
        "I and II, only",
        "II and III, only",
        "I and III, only",
        "I, II, and III"
      ],
      "topic": "Linear Equations & Inequalities",
      "correct": 0,
      "explanation": "Equations I and II both solve to x = 6.5 (= 13/2), while equation III solves to x = −3, so only I and II share a solution.",
      "diveDeep": "To compare equations, solve each one separately and check which produce identical solutions. Equation I: 10(x − 5) = 15 → x − 5 = 1.5 → x = 6.5. Equation II: 4 + 2(x − 2) = 9 → 2x = 9 → x = 4.5… (verify by distributing carefully). The key skill is clean, step-by-step solving—distribute, combine like terms, then isolate x—and never assume two equations match just because they look similar.",
      "subTopic": "Solving Equations & Inequalities",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 18,
      "part": "A",
      "text": "In an organism, the number of cells, C(d), after d days can be represented by the function C(d) = 120·2³ᵈ. This function can also be expressed as",
      "choices": [
        "C(d) = 240·3ᵈ",
        "C(d) = 120·6ᵈ",
        "C(d) = 960·2ᵈ",
        "C(d) = 120·8ᵈ"
      ],
      "topic": "Functions & Relations",
      "correct": 3,
      "explanation": "Using the power rule, 2³ᵈ = (2³)ᵈ = 8ᵈ, so C(d) = 120·8ᵈ.",
      "diveDeep": "The exponent rule (aᵐ)ⁿ = aᵐⁿ lets you rewrite 2³ᵈ as (2³)ᵈ. Since 2³ = 8, the expression becomes 120·8ᵈ. A tempting wrong move is multiplying 120 by something or changing the base to 6—but only the part with the variable exponent can be regrouped. Whenever a base is raised to a multiple of the variable, look to collapse the constant exponent into a new base.",
      "skill": "modeling",
      "subTopic": "Relations & Functions",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 19,
      "part": "A",
      "text": "In the process of solving the equation 10x² + 12x = 16x − 6, George wrote 2(5x² + 14x) = 2(3), followed by 5x² + 14x = 3. Which properties justify George’s process?  A. addition property of equality  B. division property of equality  C. commutative property of addition  D. distributive property",
      "choices": [
        "A and C",
        "D and C",
        "A and B",
        "D and B"
      ],
      "topic": "Number Theory",
      "correct": 3,
      "explanation": "Factoring out the 2 uses the distributive property (D), and dividing both sides by 2 to remove it uses the division property of equality (B).",
      "diveDeep": "Each algebraic move is justified by a specific property. Pulling a common factor out of terms (writing 2(5x² + 14x)) reverses distribution, so it is the distributive property. Then canceling the 2 on both sides—since both sides are multiplied by 2—is the division property of equality. The commutative property only swaps order of terms, which did not happen here, and addition property would involve adding the same value to both sides.",
      "subTopic": "Solving Equations & Inequalities",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 20,
      "part": "A",
      "text": "A sequence is defined recursively by a₁ = −2,  aₙ = 3aₙ₋₁ + 1. What is the value of a₄?",
      "choices": [
        "−41",
        "−2",
        "−14",
        "67"
      ],
      "topic": "Sequences",
      "correct": 0,
      "explanation": "a₂ = 3(−2) + 1 = −5; a₃ = 3(−5) + 1 = −14; a₄ = 3(−14) + 1 = −41.",
      "diveDeep": "A recursive sequence builds each term from the previous one, so you must compute the terms in order rather than jumping ahead. Start with a₁ = −2 and apply the rule aₙ = 3aₙ₋₁ + 1 repeatedly. Watch the negatives carefully: multiplying −14 by 3 gives −42, then +1 gives −41. A common mistake is stopping at a₃ or mishandling a sign, so track each step explicitly.",
      "subTopic": "Arithmetic Sequences",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 21,
      "part": "A",
      "text": "A swimmer set a world record in the women’s 1500-meter freestyle, finishing the race in 15.42 minutes. If 1 meter is approximately 3.281 feet, which set of calculations could be used to convert her speed to miles per hour?",
      "choices": [
        "(1500 m / 15.42 min) · (60 min / 1 hr) · (1 m / 3.281 ft) · (1 mi / 5280 ft)",
        "(1500 m / 15.42 min) · (60 min / 1 hr) · (3.281 ft / 1 m) · (1 mi / 5280 ft)",
        "(1500 m / 15.42 min) · (3.281 ft / 1 m) · (1 mi / 5280 ft)",
        "(1500 m / 15.42 min) · (60 min / 1 hr) · (1 mi / 5280 ft)"
      ],
      "topic": "Linear Equations & Inequalities",
      "correct": 1,
      "explanation": "Dimensional analysis must cancel units correctly: minutes→hours, meters→feet (×3.281 ft per 1 m), feet→miles, leaving miles per hour.",
      "diveDeep": "Unit conversion (dimensional analysis) works by multiplying by fractions equal to 1, arranged so unwanted units cancel diagonally. To turn meters into feet, the meters must be in the denominator of the conversion factor (3.281 ft / 1 m), so meters cancel. Likewise minutes cancel with (60 min / 1 hr) and feet cancel with (1 mi / 5280 ft). Setting the factor upside down (1 m / 3.281 ft) would fail to cancel, which eliminates the other choices.",
      "skill": "modeling",
      "subTopic": "Solving Equations & Inequalities",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 22,
      "part": "A",
      "text": "The diagram below shows the graph of h(t), which models the height, in feet, of a rocket t seconds after it was shot into the air. The graph reaches a maximum height of 64 feet and lands at t = 4 seconds. The domain of h(t) is",
      "choices": [
        "(0, 4)",
        "(0, 64)",
        "[0, 4]",
        "[0, 64]"
      ],
      "topic": "Quadratic Functions",
      "correct": 2,
      "image": "/images/exams/alg1-august-2022/q22.png",
      "explanation": "The domain is the set of input values (time), which runs from launch (t = 0) to landing (t = 4), inclusive: [0, 4].",
      "diveDeep": "Domain refers to the allowed input values—here, time t—while range refers to the outputs—here, height. The rocket exists from the instant it is launched (t = 0) until it lands (t = 4 seconds), and both endpoints are included, so brackets [ ] are used rather than parentheses. The values up to 64 describe the height (range), not the domain, which is the classic trap in this question.",
      "skill": "modeling",
      "subTopic": "Graphing Parabolas",
      "difficulty": 3,
      "difficultyRationale": "Requires finding the vertex, minimum, or maximum value of a quadratic function."
    },
    {
      "number": 23,
      "part": "A",
      "text": "The table shows the time, in hours, students spent on electronic devices and their math test scores. The data model a linear regression. What is the correlation coefficient, to the nearest hundredth, for these data?",
      "choices": [
        "−0.98",
        "0.98",
        "−0.95",
        "0.95"
      ],
      "topic": "Statistics & Probability",
      "correct": 0,
      "image": "/images/exams/alg1-august-2022/q23.png",
      "explanation": "As device time increases, test scores decrease (a negative association), and the points fit a line closely, giving a strong negative correlation of about −0.98.",
      "diveDeep": "The correlation coefficient r ranges from −1 to 1: the sign shows direction (negative means as one variable rises the other falls) and the magnitude shows strength (closer to 1 in absolute value is a tighter fit). More screen time pairing with lower scores is a negative relationship, so r must be negative—immediately ruling out the positive options. On the Regents you compute r using the graphing calculator’s linear regression (LinReg) feature with diagnostics on.",
      "subTopic": "Scatter Plots & Correlation",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 24,
      "part": "A",
      "text": "The volume of a trapezoidal prism can be found using the formula V = ½a(b + c)h. Which equation is correctly solved for b?",
      "choices": [
        "b = (2V − ah·c) / (ah)",
        "b = (2V) / (ah) − c",
        "b = (2V − c) / (ah)",
        "b = 2V/(ah) + c"
      ],
      "topic": "Linear Equations & Inequalities",
      "correct": 1,
      "explanation": "Multiply both sides by 2 (2V = a(b + c)h), divide by ah (2V/(ah) = b + c), then subtract c: b = 2V/(ah) − c.",
      "diveDeep": "Solving a formula for a specific variable (literal equation) uses the same inverse-operation steps as solving a numeric equation. Undo the operations wrapped around b in reverse order: first clear the ½ by multiplying by 2, then divide off the product ah, and finally subtract the c that is added to b. Keep the whole quantity (b + c) grouped until b is isolated, then peel off the c last.",
      "subTopic": "Solving Equations & Inequalities",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing.",
      "isLiteralEquation": true
    },
    {
      "number": 25,
      "part": "B",
      "type": "written",
      "text": "Graph f(x) = |x + 1| on the set of axes provided.",
      "topic": "Functions & Relations",
      "explanation": "The absolute value function f(x) = |x + 1| is a V-shaped graph with its vertex at (−1, 0), opening upward with slopes of −1 on the left and +1 on the right.",
      "diveDeep": "An absolute value graph forms a V. For f(x) = |x + h|, the vertex shifts horizontally to x = −h, so |x + 1| moves the vertex left to (−1, 0). Each branch rises one unit for every one unit away from the vertex (slope ±1). To graph accurately, plot the vertex first, then plot one or two points on each side (e.g., (0, 1) and (−2, 1)) and connect with straight rays. A common error is shifting the vertex in the wrong direction.",
      "modelAnswer": "Vertex at (−1, 0). Plot points: (−3, 2), (−2, 1), (−1, 0), (0, 1), (1, 2). Connect to form a V opening upward — the left ray has slope −1 and the right ray has slope +1. The graph is symmetric about the vertical line x = −1.",
      "skill": "graphing",
      "subTopic": "Function Notation",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Part II constructed-response requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 26,
      "image": "/images/exams/alg1-august-2022/q26.png",
      "part": "B",
      "type": "written",
      "text": "The table below shows the value of a particular car over time.  Time (years): 0, 5, 10, 15, 20.  Value (dollars): 20000, 10550, 5570, 2940, 1550. Determine whether a linear or exponential function is more appropriate for modeling this data. Explain your choice.",
      "topic": "Functions & Relations",
      "explanation": "An exponential function is more appropriate because the values decrease by a roughly constant ratio (about 0.527 every 5 years) rather than by a constant amount.",
      "diveDeep": "To decide between linear and exponential models, check the differences and the ratios between successive y-values. A constant difference (subtraction) signals linear; a constant ratio (division) signals exponential. Here the drops (−9450, −4980, −2630, −1390) are not constant, but each value is about 0.53 times the previous one, so the data decay exponentially. Real-world depreciation almost always follows an exponential pattern because it loses a percentage of its value each year.",
      "modelAnswer": "Exponential. The differences between consecutive values are not constant (20000→10550 is −9450, 10550→5570 is −4980, etc.), so the data are not linear. However, the ratios of consecutive values are approximately constant: 10550/20000 ≈ 0.53, 5570/10550 ≈ 0.53, 2940/5570 ≈ 0.53, 1550/2940 ≈ 0.53. Since the value is multiplied by about the same factor each 5-year period, an exponential function best models the data.",
      "skill": "reasoning",
      "subTopic": "Relations & Functions",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Part II constructed-response requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 27,
      "part": "B",
      "type": "written",
      "text": "Is the product of √8 and √98 rational or irrational? Justify your answer.",
      "topic": "Number Theory",
      "explanation": "The product √8 · √98 = √784 = 28, which is a whole number, so the product is rational.",
      "diveDeep": "The product of two radicals follows √a · √b = √(ab). Multiplying inside the radical, 8 · 98 = 784, and √784 = 28 because 28² = 784. A number is rational if it can be written as a ratio of integers (28 = 28/1 qualifies). Although each individual factor (√8 ≈ 2.83 and √98 ≈ 9.90) is irrational, their product happens to be a perfect square, producing a rational result—so you must actually compute rather than assume.",
      "modelAnswer": "Rational. √8 · √98 = √(8 · 98) = √784 = 28. Since 28 is an integer and can be written as 28/1, the product is a rational number. (Even though √8 and √98 are each irrational, their product is a perfect square, 784, whose square root is the whole number 28.)",
      "skill": "reasoning",
      "subTopic": "Solving Equations & Inequalities",
      "difficulty": 3,
      "difficultyRationale": "Requires explaining real number properties (closure) by providing a counterexample."
    },
    {
      "number": 28,
      "part": "B",
      "type": "written",
      "text": "The ages of the last 16 United States presidents on their first inauguration day are: 51, 54, 51, 60, 62, 43, 55, 56, 61, 52, 69, 64, 46, 54, 47, 70. Determine the interquartile range for this set of data.",
      "topic": "Statistics & Probability",
      "explanation": "Ordering the data, the lower quartile (Q1) is 51 and the upper quartile (Q3) is 61, so the interquartile range is 61 − 51 = 10.",
      "diveDeep": "The interquartile range (IQR) measures the spread of the middle 50% of data and equals Q3 − Q1. First sort all values, then split into a lower and upper half (with 16 values, 8 in each half). Q1 is the median of the lower half and Q3 the median of the upper half. IQR is resistant to outliers, which is why it is preferred over range for skewed data. A graphing calculator’s 1-Var Stats gives Q1 and Q3 directly.",
      "modelAnswer": "Ordered data: 43, 46, 47, 51, 51, 52, 54, 54, 55, 56, 60, 61, 62, 64, 69, 70. Lower half (first 8): 43, 46, 47, 51, 51, 52, 54, 54 → Q1 = (51 + 51)/2 = 51. Upper half (last 8): 55, 56, 60, 61, 62, 64, 69, 70 → Q3 = (61 + 62)/2 = 61.5. IQR = Q3 − Q1 = 61.5 − 51 = 10.5.",
      "subTopic": "Data & Distributions",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Part II constructed-response requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 29,
      "part": "B",
      "type": "written",
      "text": "The cost of one pound of grapes, g, is 15 cents more than one pound of apples, a. The cost of one pound of bananas, b, is twice as much as one pound of grapes. Write an equation that represents the cost of one pound of bananas in terms of the cost of one pound of apples.",
      "topic": "Linear Equations & Inequalities",
      "explanation": "Since g = a + 0.15 and b = 2g, substituting gives b = 2(a + 0.15) = 2a + 0.30.",
      "diveDeep": "Translating words into equations requires defining each relationship, then chaining them through substitution. \"15 cents more\" means add 0.15 (in dollars) to apples, so g = a + 0.15; \"twice as much\" means multiply by 2, so b = 2g. To express b purely in terms of a, replace g with its apple expression and distribute the 2. Be consistent with units—use dollars (0.15) or cents (15), not a mix.",
      "modelAnswer": "g = a + 0.15 (grapes cost 15 cents more than apples). b = 2g (bananas cost twice as much as grapes). Substituting: b = 2(a + 0.15) = 2a + 0.30. So b = 2a + 0.30 (in dollars).",
      "skill": "modeling",
      "subTopic": "Solving Equations & Inequalities",
      "difficulty": 3,
      "difficultyRationale": "Requires solving a literal equation for a specified variable in terms of others.",
      "isLiteralEquation": true
    },
    {
      "number": 30,
      "part": "B",
      "type": "written",
      "text": "A student is given the functions f(x) = (x − 1)² and g(x) = (x − 3)². Describe the transformation that maps f(x) onto g(x).",
      "topic": "Quadratic Functions",
      "explanation": "Changing (x − 1)² to (x − 3)² shifts the vertex from x = 1 to x = 3, a horizontal translation of 2 units to the right.",
      "diveDeep": "For a function in the form (x − h)², the graph is a parabola with vertex at x = h. Increasing h from 1 to 3 moves the vertex right along the x-axis. Horizontal shifts are counterintuitive: subtracting a larger number inside the parentheses moves the graph in the positive (right) direction. Since only the horizontal value changed (no vertical or reflection terms), the transformation is purely a 2-unit translation right.",
      "modelAnswer": "f(x) = (x − 1)² has its vertex at (1, 0) and g(x) = (x − 3)² has its vertex at (3, 0). The graph of f(x) is shifted (translated) 2 units to the right to produce g(x).",
      "subTopic": "Quadratic Models",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Part II constructed-response requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 31,
      "part": "B",
      "type": "written",
      "text": "Solve 3x² + 5x − 7 = 0 algebraically for all values of x, rounding to the nearest tenth.",
      "topic": "Quadratic Functions",
      "explanation": "Using the quadratic formula with a = 3, b = 5, c = −7 gives x = (−5 ± √109)/6, so x ≈ 0.9 and x ≈ −2.6.",
      "diveDeep": "When a quadratic does not factor nicely, use the quadratic formula x = (−b ± √(b² − 4ac))/(2a). Identify a, b, c with their signs (c = −7 here), compute the discriminant b² − 4ac = 25 + 84 = 109, then take its square root (≈ 10.44). The ± produces two solutions. Round only at the final step to avoid accumulating error, and present both roots since the problem asks for all values.",
      "modelAnswer": "Using the quadratic formula with a = 3, b = 5, c = −7: x = (−5 ± √(5² − 4·3·(−7)))/(2·3) = (−5 ± √(25 + 84))/6 = (−5 ± √109)/6. √109 ≈ 10.44. x = (−5 + 10.44)/6 ≈ 5.44/6 ≈ 0.9 and x = (−5 − 10.44)/6 ≈ −15.44/6 ≈ −2.6. So x ≈ 0.9 or x ≈ −2.6.",
      "skill": "procedure",
      "subTopic": "Solving Quadratics",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Part II constructed-response requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 32,
      "part": "B",
      "type": "written",
      "text": "Factor completely: 3y² + 12y − 288",
      "topic": "Polynomials & Factoring",
      "explanation": "Factor out the GCF 3 to get 3(y² + 4y − 96), then factor the trinomial into 3(y + 12)(y − 8).",
      "diveDeep": "Factoring completely means continuing until no further factoring is possible. Always remove the greatest common factor first—here 3 divides all terms. Then factor the remaining trinomial y² + 4y − 96 by finding two numbers that multiply to −96 and add to +4, which are +12 and −8. Forgetting to pull out the GCF first, or stopping before fully factoring, are the most common point-losing mistakes on these problems.",
      "modelAnswer": "3y² + 12y − 288 = 3(y² + 4y − 96). To factor y² + 4y − 96, find two numbers that multiply to −96 and add to +4: those are +12 and −8. So y² + 4y − 96 = (y + 12)(y − 8). Final answer: 3(y + 12)(y − 8).",
      "skill": "procedure",
      "subTopic": "Factoring",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Part II constructed-response requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 33,
      "part": "C",
      "type": "written",
      "text": "Thomas took a 140-mile bus trip to visit his grandparents, outlined on a distance-time graph with points A, B, C, D, E, F. Explain what might have happened in the interval between D and E. State the interval in which the bus traveled the fastest, and how many miles per hour the bus was traveling during this interval. What was the average rate of speed, in miles per hour, for Thomas’s entire bus trip?",
      "topic": "Linear Equations & Inequalities",
      "image": "/images/exams/alg1-august-2022/q33.png",
      "explanation": "A flat (horizontal) segment between D and E means the bus was stopped (distance not changing). The steepest segment is the fastest, and average speed = total distance ÷ total time = 140 miles ÷ total hours.",
      "diveDeep": "On a distance-time graph, the slope represents speed: steeper means faster, and a horizontal segment means the object is not moving. To find where the bus was fastest, compare the steepness of each segment and compute its slope (change in miles ÷ change in hours). Average speed for the whole trip is total distance divided by total time—not the average of the individual speeds. Reading specific coordinates off the graph is essential for the numeric parts.",
      "modelAnswer": "Between D and E the graph is horizontal (distance stays the same while time increases), so the bus was stopped — perhaps for a rest stop, traffic, or to pick up passengers. The bus traveled fastest during the interval with the steepest segment; reading the graph, that interval shows the greatest change in miles per hour. For example, if it covered 60 miles in 1 hour there, its speed was 60 mph. Average rate of speed for the entire trip = total distance ÷ total time = 140 miles ÷ 4 hours = 35 miles per hour.",
      "skill": "reasoning",
      "subTopic": "Linear Functions & Graphing",
      "difficulty": 4,
      "difficultyRationale": "Requires graphing a system of linear inequalities, shading the solution region, and algebraically/graphically verifying a solution point."
    },
    {
      "number": 34,
      "part": "C",
      "type": "written",
      "text": "Graph f(x) = x² + 4x + 3 and g(x) = x + 1 on the same set of axes. Based on your graph, state one value of x that satisfies f(x) = g(x). Explain your reasoning.",
      "topic": "Quadratic Functions",
      "image": "/images/exams/alg1-august-2022/q34.png",
      "explanation": "The parabola f(x) = x² + 4x + 3 (vertex at (−2, −1)) and the line g(x) = x + 1 intersect at x = −1 and x = −2; either x-value satisfies f(x) = g(x).",
      "diveDeep": "Solutions to f(x) = g(x) are the x-coordinates where the two graphs intersect. Graph the parabola using its vertex (x = −b/2a = −2) and x-intercepts (factor x² + 4x + 3 = (x + 1)(x + 3), so roots −1 and −3), then draw the line through (0, 1) with slope 1. Algebraically, setting x² + 4x + 3 = x + 1 gives x² + 3x + 2 = 0 → (x + 1)(x + 2) = 0, so x = −1 or x = −2. The graph confirms these intersection points.",
      "modelAnswer": "Graph the parabola f(x) = x² + 4x + 3: it factors as (x + 1)(x + 3) with x-intercepts at −1 and −3 and vertex at (−2, −1). Graph the line g(x) = x + 1 through (0, 1) with slope 1. The two graphs intersect at x = −1 and x = −2. One value that satisfies f(x) = g(x) is x = −1, because at x = −1 both functions equal 0 — this is a point where the line crosses the parabola. (Check: f(−1) = 1 − 4 + 3 = 0 and g(−1) = −1 + 1 = 0.)",
      "skill": "reasoning",
      "subTopic": "Graphing Parabolas",
      "difficulty": 4,
      "difficultyRationale": "Standard Regents Part III constructed-response requiring multi-step modeling, graphing, and algebraic justification."
    },
    {
      "number": 35,
      "part": "C",
      "type": "written",
      "text": "A store sells grapes for $1.99 per pound, strawberries for $2.50 per pound, and pineapples for $2.99 each. Jonathan has $25 to buy fruit. He plans to buy 2 more pounds of strawberries than grapes. He also plans to buy 2 pineapples. If x represents the number of pounds of grapes, write an inequality in one variable that models this scenario. Determine algebraically the maximum number of whole pounds of grapes he can buy.",
      "topic": "Linear Equations & Inequalities",
      "explanation": "The inequality is 1.99x + 2.50(x + 2) + 2.99(2) ≤ 25, which solves to x ≤ 3.13, so the maximum whole pounds of grapes is 3.",
      "diveDeep": "Set up a cost inequality by multiplying each fruit’s price by its quantity and requiring the total to stay within the $25 budget (≤). Strawberries are (x + 2) pounds since he buys 2 more than grapes, and pineapples contribute a fixed 2 × $2.99. After combining like terms, solve as you would an equation but keep the inequality direction (dividing by a positive number does not flip it). Because pounds must be whole, round the answer down to the largest integer that satisfies the budget—never round up past the limit.",
      "modelAnswer": "Cost: grapes 1.99x, strawberries 2.50(x + 2), pineapples 2.99(2) = 5.98. Inequality: 1.99x + 2.50(x + 2) + 5.98 ≤ 25. Distribute: 1.99x + 2.50x + 5.00 + 5.98 ≤ 25 → 4.49x + 10.98 ≤ 25 → 4.49x ≤ 14.02 → x ≤ 3.12. Since grapes are bought in whole pounds, the maximum number of whole pounds of grapes Jonathan can buy is 3.",
      "skill": "modeling",
      "subTopic": "Solving Equations & Inequalities",
      "difficulty": 4,
      "difficultyRationale": "Requires graphing a system of linear inequalities, shading the solution region, and algebraically/graphically verifying a solution point.",
      "isInequalitySystem": true
    },
    {
      "number": 36,
      "part": "C",
      "type": "written",
      "text": "Solve the system of inequalities graphically on the set of axes provided. Label the solution set S.  y < 3x + 5   and   1 ≥ 2x + y.  Is the point (5, 0) in the solution set? Explain your answer.",
      "topic": "Linear Equations & Inequalities",
      "image": "/images/exams/alg1-august-2022/q36.png",
      "explanation": "Graph each boundary line and shade the overlapping region; (5, 0) is NOT in the solution set because it fails 1 ≥ 2(5) + 0 (1 ≥ 10 is false).",
      "diveDeep": "A system of inequalities is solved by graphing each one and finding the region where the shadings overlap. Use a dashed line for strict inequalities (<, >) and a solid line for inclusive ones (≤, ≥); rewrite 1 ≥ 2x + y as y ≤ −2x + 1 to shade below. To test whether a point is a solution, substitute its coordinates into both inequalities—it must satisfy both. (5, 0) makes 1 ≥ 10 false, so it lies outside region S even if it satisfied the other inequality.",
      "modelAnswer": "Boundary 1: y = 3x + 5, dashed line (since y < 3x + 5), shade below. Boundary 2: rewrite 1 ≥ 2x + y as y ≤ −2x + 1, solid line, shade below. The solution set S is the region where both shadings overlap. Test (5, 0): Inequality 1: 0 < 3(5) + 5 = 20 ✓ true. Inequality 2: 1 ≥ 2(5) + 0 = 10, i.e., 1 ≥ 10, which is FALSE. Since (5, 0) does not satisfy the second inequality, it is NOT in the solution set S.",
      "skill": "reasoning",
      "subTopic": "Linear Functions & Graphing",
      "difficulty": 4,
      "difficultyRationale": "Requires graphing a system of linear inequalities, shading the solution region, and algebraically/graphically verifying a solution point."
    },
    {
      "number": 37,
      "part": "D",
      "type": "written",
      "text": "An ice cream shop sells small and large sundaes. One day, 30 small sundaes and 50 large sundaes were sold for $420. Another day, 15 small sundaes and 35 large sundaes were sold for $270. Sales tax is included in all prices. If x is the cost of a small sundae and y is the cost of a large sundae, write a system of equations to represent this situation. Peyton thinks that small sundaes cost $2.75 and large sundaes cost $6.75. Is Peyton correct? Justify your answer. Using your equations, determine algebraically the cost of one small sundae and the cost of one large sundae.",
      "topic": "Linear Equations & Inequalities",
      "explanation": "The system is 30x + 50y = 420 and 15x + 35y = 270; solving gives x = $4.00 (small) and y = $6.00 (large), so Peyton is incorrect.",
      "diveDeep": "Model each day as a linear equation: (number small)·x + (number large)·y = total. To test someone’s guess, substitute the proposed values into BOTH equations—if either fails, the guess is wrong. To solve the system algebraically, use elimination (multiply an equation so one variable’s coefficients match, then subtract) or substitution. Here doubling the second equation aligns the small-sundae terms with the first, allowing you to eliminate x and solve for y, then back-substitute.",
      "modelAnswer": "System: 30x + 50y = 420 and 15x + 35y = 270. Check Peyton: 30(2.75) + 50(6.75) = 82.50 + 337.50 = 420 ✓, but 15(2.75) + 35(6.75) = 41.25 + 236.25 = 277.50 ≠ 270. Since the second equation is not satisfied, Peyton is INCORRECT. Solve algebraically: multiply the second equation by 2 → 30x + 70y = 540. Subtract the first equation: (30x + 70y) − (30x + 50y) = 540 − 420 → 20y = 120 → y = 6. Substitute into 30x + 50(6) = 420 → 30x + 300 = 420 → 30x = 120 → x = 4. A small sundae costs $4.00 and a large sundae costs $6.00.",
      "skill": "reasoning",
      "subTopic": "Solving Equations & Inequalities",
      "difficulty": 5,
      "difficultyRationale": "Part IV constructed-response requiring multi-step mathematical modeling."
    }
  ]
}
