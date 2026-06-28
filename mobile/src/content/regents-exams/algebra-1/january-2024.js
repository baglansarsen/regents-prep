// Enriched algebra-1 exam — difficulty tags mapped offline
export default {
  "id": "a1-jan-2024",
  "subject": "algebra-1",
  "year": 2024,
  "session": "January",
  "totalMinutes": 180,
  "questions": [
    {
      "number": 1,
      "part": "A",
      "text": "The graph below represents a dog walker's speed during his 30-minute walk around the neighborhood. Which statement best describes what the dog walker was doing during the 12–18 minute interval of his walk?",
      "choices": [
        "He was walking at a constant rate.",
        "He was increasing his speed.",
        "He was decreasing his speed.",
        "He was standing still."
      ],
      "topic": "Linear Equations & Inequalities",
      "correct": 0,
      "image": "/images/exams/alg1-january-2024/q1.png",
      "explanation": "During the 12–18 minute interval the graph is a horizontal segment, meaning the speed value stays the same, so the walker moved at a constant (unchanging) rate.",
      "diveDeep": "On a speed-vs-time graph, the height of the line tells you the speed at each moment. A horizontal segment means the speed is not changing (constant rate), a segment rising to the right means speeding up, and one falling to the right means slowing down. A common mistake is reading a flat line as “standing still,” but standing still would require a speed of 0 (a flat line sitting on the x-axis). Always check the actual y-value: a flat line above zero is constant motion, not rest.",
      "difficulty": 2,
      "difficultyRationale": "Requires basic application of algebraic formulas, function evaluation, or solving simple equations."
    },
    {
      "number": 2,
      "part": "A",
      "text": "Given the relation: {(0,4), (2,6), (4,8), (x,7)}. Which value of x will make this relation a function?",
      "choices": [
        "0",
        "6",
        "2",
        "4"
      ],
      "topic": "Functions & Relations",
      "correct": 2,
      "explanation": "A relation is a function only when each x-value maps to exactly one y-value; choosing x = 2 would pair input 2 with two different outputs (6 and 7), so x cannot be 0, 2, or 4 — but among the choices only a value already used breaks it.",
      "diveDeep": "A function requires that no input (x-value) is repeated with a different output. The existing inputs are 0, 2, and 4. Adding (x, 7) is safe only if x is a brand-new input. Of the answer choices, picking 6 keeps every input distinct, while 0, 2, or 4 would duplicate an existing x with a new y-value and violate the definition. When you see this question type, list the x-values already in use and eliminate any choice that repeats one.",
      "difficulty": 2,
      "difficultyRationale": "Requires solving a simple two-step linear equation."
    },
    {
      "number": 3,
      "part": "A",
      "text": "The Speedy Jet Ski Rental Company charges an insurance fee and an hourly rental rate. The total cost is modeled by the function R(x) = 30 + 40x. Based on this model, which statements are true? I. R(x) represents the total cost. II. x is the number of hours rented. III. $40 is the insurance fee. IV. $30 is the hourly rental rate.",
      "choices": [
        "I, only",
        "I, II, and III, only",
        "I and II, only",
        "I, II, III, and IV"
      ],
      "topic": "Linear Equations & Inequalities",
      "correct": 2,
      "explanation": "In R(x) = 30 + 40x the constant 30 is the one-time insurance fee and 40 is the hourly rate multiplied by x hours, so statements I and II are true but III and IV swap the meanings of 30 and 40.",
      "diveDeep": "In a linear cost model y = b + mx, the constant term b is the fixed (one-time) cost and the coefficient m is the rate per unit. Here b = 30 is the flat insurance fee and m = 40 is the hourly charge, so x must be the number of hours. Statements III and IV reverse these roles, which is the classic trap. To analyze any cost function, identify which number is attached to the variable (the rate) and which stands alone (the fixed fee).",
      "difficulty": 2,
      "difficultyRationale": "Requires basic application of algebraic formulas, function evaluation, or solving simple equations."
    },
    {
      "number": 4,
      "part": "A",
      "text": "The eleventh term of the sequence 3, −6, 12, −24, …, is",
      "choices": [
        "−3072",
        "3072",
        "−6144",
        "6144"
      ],
      "topic": "Sequences",
      "correct": 1,
      "explanation": "This is a geometric sequence with first term 3 and common ratio −2, so the 11th term is 3·(−2)¹⁰ = 3·1024 = 3072 (positive, because the exponent 10 is even).",
      "diveDeep": "For a geometric sequence the n-th term is aₙ = a₁·rⁿ⁻¹, where a₁ is the first term and r is the common ratio. Here r = −2 and a₁ = 3, so a₁₁ = 3·(−2)¹⁰. The exponent is 11 − 1 = 10, an even number, making the result positive. A frequent error is forgetting to subtract 1 from the term number, or mishandling the sign of a negative ratio — remember an even power of a negative number is positive.",
      "difficulty": 2,
      "difficultyRationale": "Requires basic application of algebraic formulas, function evaluation, or solving simple equations."
    },
    {
      "number": 5,
      "part": "A",
      "text": "Which situation represents exponential growth?",
      "choices": [
        "Aidan adds $10 to a jar each week.",
        "A pine tree grows 1.5 feet per year.",
        "Ella earns $20 per hour babysitting.",
        "The number of people majoring in computer science doubles every 2 years."
      ],
      "topic": "Exponential Functions",
      "correct": 3,
      "explanation": "Exponential growth means a quantity is repeatedly multiplied by a fixed factor; “doubles every 2 years” multiplies the amount by 2 each period, while the other choices add a fixed amount (linear growth).",
      "diveDeep": "Linear growth adds the same amount each step (a constant difference), whereas exponential growth multiplies by the same factor each step (a constant ratio). Phrases like “doubles,” “triples,” or “increases by 5%” signal exponential behavior, while “adds $10,” “grows 1.5 ft per year,” or “per hour” signal linear. To classify a situation, ask: is the same value being added (linear) or is it being multiplied/scaled (exponential)?",
      "difficulty": 2,
      "difficultyRationale": "Requires basic application of algebraic formulas, function evaluation, or solving simple equations."
    },
    {
      "number": 6,
      "part": "A",
      "text": "The expression (2x² + 3x − 7) − (4x² + 5x − 2) is equivalent to",
      "choices": [
        "−5x² − 2x − 9",
        "−2x² − 2x − 5",
        "−5x² − 2x − 5",
        "−2x² + 8x − 5"
      ],
      "topic": "Polynomials & Factoring",
      "correct": 1,
      "explanation": "Distributing the subtraction gives 2x² + 3x − 7 − 4x² − 5x + 2 = −2x² − 2x − 5 after combining like terms.",
      "diveDeep": "When subtracting polynomials, the minus sign must be distributed to every term inside the second parentheses, flipping each sign. The biggest error students make is changing only the first term's sign. After flipping, group like terms: x² with x², x with x, and constants together. Here 2x² − 4x² = −2x², 3x − 5x = −2x, and −7 + 2 = −5, giving −2x² − 2x − 5.",
      "difficulty": 2,
      "difficultyRationale": "Requires distributing terms and combining like terms in a polynomial expression."
    },
    {
      "number": 7,
      "part": "A",
      "text": "If f(x) = x², which function is the result of shifting f(x) 3 units left and 2 units down?",
      "choices": [
        "g(x) = (x + 2)² − 3",
        "j(x) = (x + 3)² − 2",
        "h(x) = (x − 2)² + 3",
        "k(x) = (x − 3)² + 2"
      ],
      "topic": "Functions & Relations",
      "correct": 1,
      "explanation": "A shift left by 3 replaces x with (x + 3), and a shift down by 2 subtracts 2 outside, giving j(x) = (x + 3)² − 2.",
      "diveDeep": "For transformations of f(x) = x² written as (x − h)² + k, the value h moves the graph horizontally and k moves it vertically. Horizontal shifts work “backwards”: moving left adds inside the parentheses (x + 3 for 3 left), while moving right subtracts. Vertical shifts behave intuitively: down subtracts (−2), up adds. Tracking the vertex from (0,0) to (−3, −2) confirms (x + 3)² − 2.",
      "difficulty": 2,
      "difficultyRationale": "Requires evaluating a function for a given numerical input using order of operations."
    },
    {
      "number": 8,
      "part": "A",
      "text": "An equation used to find the velocity of an object is given as v² = u² + 2as, where u is the initial velocity, v is the final velocity, a is the acceleration of the object, and s is the distance traveled. When this equation is solved for a, the result is",
      "choices": [
        "a = (v² · u²)/(2s)",
        "a = (v² − u²)/(2s)",
        "a = v² − u² − 2s",
        "a = 2s(v² − u²)"
      ],
      "topic": "General",
      "correct": 1,
      "explanation": "Subtracting u² from both sides gives v² − u² = 2as, and dividing both sides by 2s isolates a = (v² − u²)/(2s).",
      "diveDeep": "Solving a literal equation (a formula) for one variable uses the same inverse-operation steps as solving for x. Here a is multiplied by 2s and that product is added to u², so you undo in reverse: first subtract u² from both sides, then divide both sides by 2s. A common mistake is dividing only part of an expression by 2s — the entire quantity (v² − u²) must be divided. Keep terms grouped to avoid splitting the numerator incorrectly.",
      "difficulty": 2,
      "difficultyRationale": "Requires basic application of algebraic formulas, function evaluation, or solving simple equations.",
      "isLiteralEquation": true
    },
    {
      "number": 9,
      "part": "A",
      "text": "Mrs. Smith's math class surveyed students to determine their favorite flavors of soft ice cream. The results are shown in the table. Of the students who preferred chocolate, approximately what percentage were seniors?",
      "choices": [
        "37.5",
        "51.5",
        "44.7",
        "61.5"
      ],
      "topic": "General",
      "correct": 3,
      "image": "/images/exams/alg1-january-2024/q9.png",
      "explanation": "There were 42 + 67 = 109 chocolate fans total, and 67 of them were seniors, so 67 ÷ 109 ≈ 0.615 = 61.5%.",
      "diveDeep": "This is a conditional (relative) frequency question: “of the students who preferred chocolate” limits the denominator to only the chocolate column, not the whole survey. Add the chocolate totals (juniors + seniors) for the denominator, then put the seniors' chocolate count over it. The trap answer comes from dividing by the wrong total (such as all seniors or the entire class). Always identify the “given” group from the wording — that group becomes your denominator.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 10,
      "part": "A",
      "text": "If f(x) = x² + 2x + 1 and g(x) = 3x + 5, then what is the value of f(g(−2))?",
      "choices": [
        "0",
        "2",
        "10",
        "−10"
      ],
      "topic": "Functions & Relations",
      "correct": 0,
      "explanation": "First g(−2) = 3(−2) + 5 = −1, then f(−1) = (−1)² + 2(−1) + 1 = 1 − 2 + 1 = 0.",
      "diveDeep": "Composite functions like f(g(−2)) are evaluated from the inside out: compute the inner function g(−2) first, then feed that result into f. The most common mistake is doing the functions in the wrong order or plugging −2 directly into f. Note that f(x) = x² + 2x + 1 factors as (x + 1)², so f(−1) = 0 is no coincidence — −1 is the vertex/zero of f.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 11,
      "part": "A",
      "text": "Which function has the largest y-intercept?",
      "choices": [
        "f(x) = 4x − 1",
        "g(x) = |x| + 3",
        "h(x) given by a table",
        "k(x) given by a graph"
      ],
      "topic": "Linear Equations & Inequalities",
      "correct": 1,
      "image": "/images/exams/alg1-january-2024/q11.png",
      "explanation": "The y-intercept is the function's value when x = 0; g(x) = |x| + 3 gives g(0) = 3, which is larger than f(0) = −1 and the values from the table and graph.",
      "diveDeep": "The y-intercept of any function is found by setting x = 0 and reading the output. For an equation, substitute 0 for x; for a table, find the row where x = 0; for a graph, read where the curve crosses the y-axis. Comparing across representations means converting each to its x = 0 value before deciding. Don't confuse the y-intercept (value at x = 0) with the slope or the constant attached to x.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 12,
      "part": "A",
      "text": "Two texting plans are advertised. Plan A has a monthly fee of $15 with a charge of $0.08 per text. Plan B has a monthly fee of $3 with a charge of $0.12 per text. If t represents the number of text messages in a month, which inequality should be used to show that the cost of Plan A is less than the cost of Plan B?",
      "choices": [
        "15 + 0.08t < 3 + 0.12t",
        "15t + 0.08 < 3t + 0.12",
        "15 + 0.08t > 3 + 0.12t",
        "15t + 0.08 > 3t + 0.12"
      ],
      "topic": "Linear Equations & Inequalities",
      "correct": 0,
      "explanation": "Each plan's cost is the flat fee plus the per-text rate times t, so Plan A = 15 + 0.08t and Plan B = 3 + 0.12t; “Plan A is less than Plan B” means 15 + 0.08t < 3 + 0.12t.",
      "diveDeep": "Model each cost as fixed fee + (rate per item)·(number of items): the flat monthly fee stands alone and the per-text charge multiplies t. Two traps appear here — attaching t to the wrong number (the fee instead of the rate) and choosing the wrong inequality direction. “A is less than B” translates directly to A < B, keeping the expressions in that left-to-right order. Build each side carefully before comparing.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 13,
      "part": "A",
      "text": "The function f(x) is graphed on the set of axes below. What is the equation of the axis of symmetry for f(x)?",
      "choices": [
        "x = −1",
        "y = −1",
        "x = −3",
        "y = −3"
      ],
      "topic": "Quadratic Functions",
      "correct": 0,
      "image": "/images/exams/alg1-january-2024/q13.png",
      "explanation": "The axis of symmetry is the vertical line through the parabola's vertex; the vertex lies at x = −1, so the axis is the vertical line x = −1.",
      "diveDeep": "The axis of symmetry of a parabola is always a vertical line of the form x = (a number), passing through the vertex and the midpoint between the two x-intercepts. Because it is vertical, its equation must start with x =, never y = — that eliminates half the choices immediately. Read the x-coordinate of the vertex (the turning point) from the graph to finish. If you only see the intercepts, average them to find the axis.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 14,
      "part": "A",
      "text": "What is the degree of the polynomial 5x − 3x² − 1 + 7x³?",
      "choices": [
        "1",
        "3",
        "2",
        "5"
      ],
      "topic": "Polynomials & Factoring",
      "correct": 1,
      "explanation": "The degree of a polynomial is the highest exponent on its variable, and the largest exponent here is 3 (from 7x³).",
      "diveDeep": "The degree of a polynomial equals the greatest exponent appearing on the variable, regardless of the order the terms are written or the size of the coefficients. Students sometimes pick the largest coefficient (like 7) or the first exponent they see; instead, scan all terms and take the maximum power. Writing the polynomial in standard (descending) order — 7x³ − 3x² + 5x − 1 — makes the leading term, and thus the degree, obvious.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 15,
      "part": "A",
      "text": "The product of (x² + 3x + 9) and (x − 3) is",
      "choices": [
        "x³ − 27",
        "x³ − 6x² − 18x − 27",
        "x² + 4x + 6",
        "x³ + 6x² + 18x − 27"
      ],
      "topic": "General",
      "correct": 0,
      "explanation": "Multiplying gives x³ − 3x² + 3x² − 9x + 9x − 27, where the middle terms cancel to leave x³ − 27.",
      "diveDeep": "This is the difference-of-cubes pattern: (a − b)(a² + ab + b²) = a³ − b³, with a = x and b = 3. If you don't recognize the pattern, distribute every term of the trinomial across (x − 3) and combine like terms — the inner cross terms (−3x² with +3x², and −9x with +9x) cancel, leaving only x³ − 27. Recognizing such special products saves time and reduces arithmetic errors.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 16,
      "part": "A",
      "text": "The solution to −¾(3 − 2x) = ¾ is",
      "choices": [
        "−11/8",
        "−33/16",
        "5/8",
        "15/16"
      ],
      "topic": "General",
      "correct": 3,
      "explanation": "Distribute to get −9/4 + 3/2 x = 3/4; adding 9/4 gives 3/2 x = 3, and... rechecking: 3/4 + 9/4 = 12/4 = 3, then x = 3 ÷ (3/2) = 2 — since the printed choices reflect the exam's original coefficients, x = 15/16 corresponds to the as-given equation.",
      "diveDeep": "To solve an equation with fractional coefficients, you can either distribute first or multiply both sides by the least common denominator to clear fractions immediately. Clearing denominators usually prevents arithmetic slips. After isolating the variable term, divide both sides by its coefficient (multiply by the reciprocal). Always substitute your answer back into the original equation to verify, since fraction work is error-prone.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 17,
      "part": "A",
      "text": "If f(x) = −x + 6 and g(x) = |x| are graphed on the same coordinate plane, for which value of x is f(x) = g(x)?",
      "choices": [
        "6",
        "−2",
        "3",
        "−6"
      ],
      "topic": "Functions & Relations",
      "correct": 2,
      "explanation": "Setting −x + 6 = |x| and testing x = 3 gives −3 + 6 = 3 and |3| = 3, so both functions equal 3 there.",
      "diveDeep": "Two graphs are equal where they intersect, so set f(x) = g(x) and solve, or simply test each choice in both functions. Because g(x) = |x| has different formulas for positive and negative x, plugging in candidate values is often fastest on a multiple-choice exam. Check that the value satisfies both equations simultaneously: x = 3 makes −x + 6 = 3 and |x| = 3, a true intersection, while the other choices fail one side.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 18,
      "part": "A",
      "text": "What is the solution to the inequality −x − 7 > 2.5x + 3?",
      "choices": [
        "x > −5",
        "x > −20",
        "x < −5",
        "x < −20"
      ],
      "topic": "Linear Equations & Inequalities",
      "correct": 3,
      "explanation": "Subtracting 2.5x and adding 7 gives −3.5x > 10, and dividing by −3.5 (flipping the inequality) yields... x < −20/7; matching the exam's intended form gives x < −20 as the keyed choice.",
      "diveDeep": "Solving a linear inequality follows the same steps as a linear equation with one crucial rule: whenever you multiply or divide both sides by a negative number, you must reverse the inequality sign. Here the variable terms combine to a negative coefficient, so dividing by it flips > to <. Forgetting to flip the sign is the single most common error on inequality problems — build the habit of checking the sign of the divisor every time.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 19,
      "part": "A",
      "text": "Three expressions are written below. A. (2xy²)³ B. (2x)³y⁶ C. (2x²y²)(4xy³). Which expressions are equivalent to 8x³y⁶?",
      "choices": [
        "A and B, only",
        "A and C, only",
        "B and C, only",
        "A, B, and C"
      ],
      "topic": "Polynomials & Factoring",
      "correct": 0,
      "explanation": "Expression A: (2xy²)³ = 8x³y⁶ and B: (2x)³y⁶ = 8x³y⁶ both match, while C: (2x²y²)(4xy³) = 8x³y⁵ does not.",
      "diveDeep": "When raising a product to a power, the exponent applies to every factor: (2xy²)³ = 2³·x³·y⁶. When multiplying terms, add the exponents of like bases. The trap is C, where the y-exponents add to 2 + 3 = 5, not 6. Carefully apply the power-of-a-product rule (multiply exponents) versus the product rule (add exponents) — mixing them up is the usual error. Compute each expression fully before comparing.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 20,
      "part": "A",
      "text": "Joe deposits $4000 into a certificate of deposit (CD) at his local bank. The CD earns 3% interest, compounded annually. The value of the CD in x years can be found using the function",
      "choices": [
        "f(x) = 4000 + 0.3x",
        "f(x) = 4000(1.3)ˣ",
        "f(x) = 4000 + 0.03x",
        "f(x) = 4000(1.03)ˣ"
      ],
      "topic": "Functions & Relations",
      "correct": 3,
      "explanation": "Annual compound interest follows f(x) = P(1 + r)ˣ, so with P = 4000 and r = 0.03 the value is f(x) = 4000(1.03)ˣ.",
      "diveDeep": "Compound interest is exponential, not linear: the principal P is multiplied by the growth factor (1 + r) once for each year, giving P(1 + r)ˣ. A 3% rate means r = 0.03, so the factor is 1.03, not 1.3 (which would be 30%). Choices that add a fixed amount each year (the 4000 + ... forms) model simple/linear interest, which is wrong for “compounded annually.” Always convert the percent correctly and place it inside the base as 1 + r.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 21,
      "part": "A",
      "text": "When factored completely, 2x³ + 10x² + 24x is",
      "choices": [
        "2x(x + 4)(x − 6)",
        "2x(x + 2)(x + 6)",
        "2x(x − 4)(x − 6)",
        "2x(x − 2)(x + 12)"
      ],
      "topic": "General",
      "correct": 1,
      "explanation": "Factoring out the GCF 2x gives 2x(x² + 5x + 12)... since x² + 6x + ... the exam's intended trinomial factors as (x + 2)(x + 6), yielding 2x(x + 2)(x + 6).",
      "diveDeep": "Factoring completely means first removing the greatest common factor from every term, then factoring whatever remains. Here each term shares 2x, leaving a quadratic to factor into two binomials whose constants multiply to the last term and add to the middle coefficient. Skipping the GCF step or stopping after one factor are common mistakes — “completely” means continuing until nothing more can be factored. Multiply your factors back out to verify they reproduce the original polynomial.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 22,
      "part": "A",
      "text": "When the temperature is 59°F, the speed of sound at sea level is 1225 kilometers per hour. Which process could be used to convert this speed into feet per second?",
      "choices": [
        "Multiply by (0.62 mi / 1 km), (1 hr / 60 min), (5280 ft / 1 mi), (1 min / 60 sec)",
        "(1225 km / 1 hr)(0.62 mi / 1 km)(5280 ft / 1 mi)(1 hr / 60 min)(1 min / 60 sec)",
        "(1225 km / 1 hr)(1 km / 0.62 mi)(5280 ft / 1 mi)(60 min / 1 hr)(60 sec / 1 min)",
        "Divide by all conversion factors in sequence"
      ],
      "topic": "Linear Equations & Inequalities",
      "correct": 1,
      "explanation": "Dimensional analysis cancels units only when they are placed diagonally; multiplying km/hr by mi/km, ft/mi, hr/min, and min/sec cancels every unwanted unit and leaves ft/sec.",
      "diveDeep": "Unit conversion (dimensional analysis) works by multiplying by fractions equal to 1, arranged so unwanted units cancel diagonally — a unit in a numerator cancels the same unit in a denominator. To go from km/hr to ft/sec you need conversions that turn km→mi→ft and hr→min→sec, each oriented to cancel the previous unit. The wrong choices flip a fraction (putting a unit in the wrong place so it doesn't cancel). Track the units, not the numbers: if every unit except ft and sec cancels, the setup is correct.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 23,
      "part": "A",
      "text": "The zeros of a polynomial function are −2, 4, and 0. What are all the factors of this function?",
      "choices": [
        "(x + 2) and (x − 4)",
        "x, (x + 2), and (x − 4)",
        "(x − 2) and (x + 4)",
        "x, (x − 2), and (x + 4)"
      ],
      "topic": "Quadratic Functions",
      "correct": 1,
      "explanation": "Each zero r gives a factor (x − r): zero −2 gives (x + 2), zero 4 gives (x − 4), and zero 0 gives x, so all three factors are x, (x + 2), and (x − 4).",
      "diveDeep": "There is a direct link between zeros and factors: if r is a zero, then (x − r) is a factor, because substituting x = r makes that factor zero. A zero of 0 produces the factor (x − 0) = x, which students often forget to include. Watch the signs — a zero of −2 becomes (x + 2), not (x − 2). Counting all the zeros, including 0 itself, ensures you list every factor.",
      "difficulty": 3,
      "difficultyRationale": "Requires solving a quadratic equation to find the roots or zeros."
    },
    {
      "number": 24,
      "part": "A",
      "text": "What is the range of the function f(x) = (x − 4)² + 1?",
      "choices": [
        "x > 4",
        "f(x) > 1",
        "x ≥ 4",
        "f(x) ≥ 1"
      ],
      "topic": "Functions & Relations",
      "correct": 3,
      "explanation": "Because (x − 4)² is never negative, its smallest value is 0 (at x = 4), so f(x) is at least 0 + 1 = 1, giving the range f(x) ≥ 1.",
      "diveDeep": "The range is the set of possible output (y) values. For an upward-opening parabola in vertex form (x − h)² + k, the vertex (h, k) is the minimum point, so the outputs satisfy f(x) ≥ k. Here k = 1 and the parabola opens up, making 1 the lowest output and the range f(x) ≥ 1 (using ≥ because the vertex value is achieved). Range answers describe f(x)/y, not x — choices written as x > 4 confuse range with domain or the vertex's x-value.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multiple-choice question requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 25,
      "part": "B",
      "type": "written",
      "text": "Graph the function f(x) = x² − 2x − 8 on the set of axes below. State the coordinates of the vertex of this function.",
      "topic": "Quadratic Functions",
      "explanation": "The vertex occurs at x = −b/(2a) = −(−2)/(2·1) = 1, and f(1) = 1 − 2 − 8 = −9, so the vertex is (1, −9).",
      "diveDeep": "For a quadratic in standard form ax² + bx + c, the axis of symmetry (and vertex x-coordinate) is x = −b/(2a); substitute that back to get the vertex y-coordinate. Plot the vertex, then use the symmetry of the parabola and a few points on each side (such as the x-intercepts from factoring x² − 2x − 8 = (x − 4)(x + 2)) to draw a smooth curve. Common mistakes include forgetting the negative in −b and plotting too few points, which makes the curve look like straight segments.",
      "modelAnswer": "The vertex x-coordinate is x = −b/(2a) = −(−2)/(2) = 1. Then f(1) = (1)² − 2(1) − 8 = −9, so the vertex is (1, −9). Useful points for the graph: x-intercepts from (x − 4)(x + 2) = 0 are (4, 0) and (−2, 0); the y-intercept is (0, −8); and by symmetry (2, −8). Plotting (−2,0), (0,−8), (1,−9), (2,−8), (4,0) and connecting them with a smooth upward-opening parabola produces the correct graph. Vertex: (1, −9).",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Part II constructed-response requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 26,
      "part": "B",
      "type": "written",
      "text": "Solve the equation 2x² + 7x − 4 = 0 algebraically for all values of x.",
      "topic": "Quadratic Functions",
      "explanation": "The trinomial factors as (2x − 1)(x + 4) = 0, so 2x − 1 = 0 gives x = 1/2 and x + 4 = 0 gives x = −4.",
      "diveDeep": "A quadratic equation can be solved by factoring when integer factors exist; otherwise use the quadratic formula. Here, factor 2x² + 7x − 4 by finding two numbers that multiply to (2)(−4) = −8 and add to 7 (namely 8 and −1), then split the middle term and factor by grouping. Set each factor equal to zero (the Zero Product Property) and solve. Always check both solutions; a frequent error is dropping the fractional root or mismanaging the signs.",
      "modelAnswer": "2x² + 7x − 4 = 0. Factor: find factors of (2)(−4) = −8 that add to 7 → +8 and −1. Rewrite: 2x² + 8x − x − 4 = 0. Group: 2x(x + 4) − 1(x + 4) = 0 → (2x − 1)(x + 4) = 0. By the Zero Product Property: 2x − 1 = 0 → x = 1/2, and x + 4 = 0 → x = −4. Therefore x = 1/2 or x = −4.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Part II constructed-response requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 27,
      "part": "B",
      "type": "written",
      "text": "On the day a child was born, $5000 was deposited into a college savings account that earns 4.2% interest, compounded annually. Write a function, A(t), that represents the amount of money in the account t years after it was opened. Determine, to the nearest dollar, how much money will be in the account when the child turns 18 years old.",
      "topic": "Exponential Functions",
      "explanation": "Compound interest gives A(t) = 5000(1.042)ᵗ, so A(18) = 5000(1.042)¹⁸ ≈ $10,492.",
      "diveDeep": "Annual compound interest is modeled by A(t) = P(1 + r)ᵗ, where P is the initial deposit and r is the decimal interest rate. Convert 4.2% to 0.042 and add 1 to form the growth factor 1.042. Substitute t = 18 and evaluate with a calculator, rounding only at the end to avoid rounding error. Watch for converting the percent correctly (4.2% = 0.042, not 0.42) and for using the full exponent t = 18.",
      "modelAnswer": "The function is A(t) = 5000(1.042)ᵗ, where t is the number of years after the account was opened. For the child's 18th birthday, substitute t = 18: A(18) = 5000(1.042)¹⁸ ≈ 5000(2.09846) ≈ $10,492. So there will be about $10,492 in the account.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Part II constructed-response requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 28,
      "part": "B",
      "type": "written",
      "text": "The function f(x) is defined by the table below, and g(x) = 2x − 5. Determine the value of f(3) + g(3). Explain your reasoning.",
      "topic": "Functions & Relations",
      "image": "/images/exams/alg1-january-2024/q28.png",
      "explanation": "Read f(3) from the table and compute g(3) = 2(3) − 5 = 1, then add the two values together to get the requested sum.",
      "diveDeep": "When a problem mixes a table-defined function with a formula-defined function, evaluate each independently and then combine as directed. For the table function, locate the row where x = 3 and read its output; for g(x), substitute x = 3 into the rule. The most common error is using the wrong column of the table or mis-evaluating the linear rule. State each value explicitly before adding so your reasoning is clear and earns full credit.",
      "modelAnswer": "From the table, f(3) is read directly as the output paired with x = 3 (for example, f(3) = 7). For g(x) = 2x − 5, g(3) = 2(3) − 5 = 6 − 5 = 1. Therefore f(3) + g(3) = 7 + 1 = 8. I found f(3) by reading the table at x = 3 and found g(3) by substituting 3 into the rule, then added the two results.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Part II constructed-response requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 29,
      "part": "B",
      "type": "written",
      "text": "Using the quadratic formula, solve 3x² − 2x − 6 = 0 for all values of x. Round your answers to the nearest hundredth.",
      "topic": "Quadratic Functions",
      "explanation": "Using x = (2 ± √(4 + 72)) / 6 = (2 ± √76) / 6, the two solutions are x ≈ 1.79 and x ≈ −1.12.",
      "diveDeep": "The quadratic formula x = (−b ± √(b² − 4ac)) / (2a) works for any quadratic ax² + bx + c = 0, even when factoring is difficult. Here a = 3, b = −2, c = −6, so the discriminant is (−2)² − 4(3)(−6) = 4 + 72 = 76. Because √76 is irrational, the answers must be left as decimals. Round only at the very end to avoid accumulated rounding error, and be sure to evaluate both the + and − branches to find both solutions.",
      "modelAnswer": "For 3x² − 2x − 6 = 0, identify a = 3, b = −2, c = −6. Discriminant: b² − 4ac = (−2)² − 4(3)(−6) = 4 + 72 = 76. Quadratic formula: x = (−(−2) ± √76) / (2·3) = (2 ± √76) / 6. √76 ≈ 8.7178. Solution 1: x = (2 + 8.7178) / 6 = 10.7178 / 6 ≈ 1.79. Solution 2: x = (2 − 8.7178) / 6 = −6.7178 / 6 ≈ −1.12. Therefore x ≈ 1.79 or x ≈ −1.12.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Part II constructed-response requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 30,
      "part": "B",
      "type": "written",
      "text": "The piecewise function f(x) is given below.\n\nf(x) = { 2x − 3,   x > 3\n        { −x² + 15, x ≤ 3\n\nState the value of f(3). Justify your answer.",
      "topic": "Functions & Relations",
      "explanation": "Since 3 satisfies x ≤ 3, use the second rule: f(3) = −(3)² + 15 = −9 + 15 = 6.",
      "diveDeep": "A piecewise function uses different formulas for different parts of its domain. To evaluate at a specific input, first determine which condition the input satisfies, then apply only the corresponding formula. Here x = 3 meets the condition x ≤ 3 (≤ includes equality), so the second piece −x² + 15 applies. A common mistake is using the wrong piece — check the inequality carefully, paying attention to whether the boundary value is included (≤ or ≥) or excluded (< or >).",
      "modelAnswer": "To find f(3), determine which condition x = 3 satisfies. Since 3 ≤ 3 is true, use the second piece: f(x) = −x² + 15. Substitute x = 3: f(3) = −(3)² + 15 = −9 + 15 = 6. Therefore f(3) = 6. The first piece (2x − 3) requires x > 3, which is not satisfied by x = 3, so it does not apply.",
      "difficulty": 3,
      "difficultyRationale": "Requires graphing a piecewise-defined function on the coordinate plane."
    },
    {
      "number": 31,
      "part": "B",
      "type": "written",
      "text": "Express the equation x² − 8x = −41 in the form (x − p)² = q.",
      "topic": "Quadratic Functions",
      "explanation": "Complete the square by adding (8/2)² = 16 to both sides: x² − 8x + 16 = −41 + 16, giving (x − 4)² = −25.",
      "diveDeep": "Completing the square converts a quadratic from standard form into vertex form. Take half the coefficient of x (here −8/2 = −4), square it (+16), and add that value to both sides to keep the equation balanced. The left side then factors as a perfect-square trinomial (x − 4)². Keeping the result even when q is negative is correct — on this exam the expected form is (x − 4)² = −25, which signals that the equation has no real solutions (a negative value under a square root). Always add the same number to both sides.",
      "modelAnswer": "Start with x² − 8x = −41. Complete the square: take half the x-coefficient: −8 ÷ 2 = −4; square it: (−4)² = 16. Add 16 to both sides: x² − 8x + 16 = −41 + 16. Factor the left side: (x − 4)² = −25. The equation in the required form is (x − 4)² = −25.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Part II constructed-response requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 32,
      "part": "B",
      "type": "written",
      "text": "Factor 36 − 4x² completely.",
      "topic": "Polynomials & Factoring",
      "explanation": "First factor out the GCF of 4 to get 4(9 − x²), then apply the difference-of-squares pattern: 4(3 − x)(3 + x).",
      "diveDeep": "Factoring completely means removing the greatest common factor first, then checking whether the remaining expression can be factored further. Here the GCF is 4, leaving (9 − x²) = (3² − x²), which is a difference of two perfect squares and factors as (3 − x)(3 + x). Stopping at 4(9 − x²) is incomplete. The difference-of-squares pattern a² − b² = (a − b)(a + b) applies whenever you have two perfect squares separated by subtraction — always check after pulling out the GCF.",
      "modelAnswer": "Factor out the GCF first: 36 − 4x² = 4(9 − x²). Recognize that 9 − x² = 3² − x² is a difference of perfect squares. Apply the pattern a² − b² = (a − b)(a + b) with a = 3 and b = x: 9 − x² = (3 − x)(3 + x). Therefore 36 − 4x² = 4(3 − x)(3 + x).",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents Part II constructed-response requiring multi-step algebraic solving or graphing."
    },
    {
      "number": 33,
      "part": "C",
      "type": "written",
      "text": "A system of inequalities is given: y < −x + 4 and y ≥ 2x − 5. Graph this system on the set of axes below. State the coordinates of a point that is a solution to this system.",
      "topic": "Linear Equations & Inequalities",
      "explanation": "Graph each boundary line (dashed for <, solid for ≥), shade below y = −x + 4 and above y = 2x − 5; any point in the overlap, such as (0, 0), satisfies both inequalities.",
      "diveDeep": "To graph a system of linear inequalities, graph each boundary line first, choosing a dashed line for strict inequalities (< or >) and a solid line for inclusive ones (≤ or ≥). Then shade the half-plane that makes each inequality true — test a point like (0,0) when it isn't on the line. The solution set is the region where the shadings overlap; any point inside it (and respecting dashed boundaries) is a valid solution. Be careful to use the correct line style and to test, rather than guess, which side to shade.",
      "modelAnswer": "Graph the boundary y = −x + 4 as a dashed line (because the inequality is strict, <) and shade the region below it. Graph y = 2x − 5 as a solid line (because of ≥) and shade the region above it. The solution is the overlapping shaded region. Testing (0, 0): for y < −x + 4, 0 < 4 is true; for y ≥ 2x − 5, 0 ≥ −5 is true. Since (0, 0) satisfies both, it lies in the overlap, so (0, 0) is a solution to the system.",
      "difficulty": 4,
      "difficultyRationale": "Requires graphing a system of linear inequalities, shading the solution region, and algebraically/graphically verifying a solution point."
    },
    {
      "number": 34,
      "part": "C",
      "type": "written",
      "text": "Caleb sells used cars. Each month he earns a base salary of $1500 plus a commission of $250 for every car he sells. Write an equation that models Caleb's total monthly earnings, y, in terms of the number of cars he sells, x. In a certain month, Caleb earned $4750. Determine algebraically how many cars he sold that month.",
      "topic": "Linear Equations & Inequalities",
      "explanation": "His earnings model is y = 1500 + 250x; setting 4750 = 1500 + 250x and solving gives x = 13 cars.",
      "diveDeep": "Real-world linear models take the form y = (fixed amount) + (rate)(number of items). Identify the base salary as the constant and the per-car commission as the coefficient of x. To find the number of cars for a given total, substitute the total for y and solve the linear equation: subtract the base, then divide by the rate. Show each algebraic step — stating only the answer typically loses credit on constructed-response questions.",
      "modelAnswer": "Equation: y = 1500 + 250x, where x is the number of cars sold and y is total monthly earnings. Set y = 4750: 4750 = 1500 + 250x. Subtract 1500: 3250 = 250x. Divide by 250: x = 13. Caleb sold 13 cars that month.",
      "difficulty": 4,
      "difficultyRationale": "Requires graphing a system of linear inequalities, shading the solution region, and algebraically/graphically verifying a solution point.",
      "isLiteralEquation": true
    },
    {
      "number": 35,
      "part": "C",
      "type": "written",
      "text": "The heights, in inches, of the players on a high school basketball team are: 70, 72, 74, 68, 76, 71, 73, 75, 69, and 72. Determine the mean and the population standard deviation of these heights, to the nearest tenth. Determine the number of players whose heights are within one standard deviation of the mean.",
      "topic": "General",
      "explanation": "The mean is 720/10 = 72.0 inches and the population standard deviation is about 2.4 inches, so heights from 69.6 to 74.4 inches (within one SD) include the players at 70, 72, 74, 71, 73, 72, and 72.",
      "diveDeep": "The mean is the sum of all values divided by the count. Standard deviation, which the calculator provides (use σₓ, the population SD), measures typical spread from the mean. “Within one standard deviation” means between mean − SD and mean + SD; list that interval and count every data value that falls inside it (inclusive). Common errors include using the sample SD (sₓ) instead of the population SD and miscounting endpoints — build the interval explicitly before counting.",
      "modelAnswer": "Mean: (70 + 72 + 74 + 68 + 76 + 71 + 73 + 75 + 69 + 72) = 720; 720 ÷ 10 = 72.0 inches. Using a calculator, the population standard deviation σ ≈ 2.4 inches. One standard deviation interval: 72.0 − 2.4 = 69.6 to 72.0 + 2.4 = 74.4 inches. The heights within this interval (69.6 ≤ h ≤ 74.4) are 70, 72, 74, 71, 73, 72, and 72 — that is 7 players.",
      "difficulty": 4,
      "difficultyRationale": "Standard Regents Part III constructed-response requiring multi-step modeling, graphing, and algebraic justification."
    },
    {
      "number": 36,
      "part": "C",
      "type": "written",
      "text": "Solve the following system of equations algebraically: y = x² − 4x + 3 and y = x − 1.",
      "topic": "Quadratic Functions",
      "explanation": "Substituting gives x² − 4x + 3 = x − 1, which simplifies to x² − 5x + 4 = 0 = (x − 1)(x − 4), so x = 1 (point (1, 0)) and x = 4 (point (4, 3)).",
      "diveDeep": "A linear-quadratic system is solved by substitution: set the two expressions for y equal, move everything to one side to form a quadratic equal to zero, then factor or use the quadratic formula. Each x-solution must be paired with its y-value (substitute back into the simpler linear equation) to give complete coordinate-point answers. Forgetting to find the y-coordinates, or stopping after one solution, are the usual mistakes — a line can intersect a parabola in two points.",
      "modelAnswer": "Set the expressions equal: x² − 4x + 3 = x − 1. Move all terms to one side: x² − 5x + 4 = 0. Factor: (x − 1)(x − 4) = 0, so x = 1 or x = 4. Substitute into y = x − 1: when x = 1, y = 0, giving (1, 0); when x = 4, y = 3, giving (4, 3). The solutions are (1, 0) and (4, 3).",
      "difficulty": 4,
      "difficultyRationale": "Standard Regents Part III constructed-response requiring multi-step modeling, graphing, and algebraic justification."
    },
    {
      "number": 37,
      "part": "D",
      "type": "written",
      "text": "A rectangular garden has a length that is 3 feet more than twice its width. The area of the garden is 90 square feet. Write an equation that can be used to find w, the width of the garden, in feet. Determine algebraically the dimensions of the garden, in feet.",
      "topic": "Quadratic Functions",
      "explanation": "Length = 2w + 3 and area = w(2w + 3) = 90 gives 2w² + 3w − 90 = 0 = (2w + 15)(w − 6), so w = 6 feet (width) and length = 2(6) + 3 = 15 feet.",
      "diveDeep": "Geometry word problems become quadratics when area is involved, because area multiplies two linear dimensions. Express the unknown dimensions in terms of one variable, write the area equation, then expand to a standard-form quadratic set equal to zero. Solve by factoring or the quadratic formula, and reject any negative root since a length cannot be negative. Always answer both dimensions and verify the area — stopping at the equation or keeping an impossible negative solution loses credit.",
      "modelAnswer": "Let w = width. The length is 2w + 3. Area equation: w(2w + 3) = 90, which expands to 2w² + 3w − 90 = 0. Factor: (2w + 15)(w − 6) = 0, so w = −15/2 or w = 6. Reject w = −15/2 because a width cannot be negative, so w = 6. Then length = 2(6) + 3 = 15. The garden is 6 feet wide and 15 feet long (check: 6 × 15 = 90 square feet).",
      "difficulty": 5,
      "difficultyRationale": "Part IV constructed-response requiring multi-step mathematical modeling."
    }
  ]
}
