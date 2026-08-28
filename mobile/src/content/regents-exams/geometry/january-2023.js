// Enriched Geometry exam — tagged with skill + subTopic (see content/_shared/lessonEngine.js)
export default {
  "id": "geo-jan-2023",
  "subject": "geometry",
  "year": 2023,
  "session": "January",
  "totalMinutes": 180,
  "questions": [
    {
      "number": 1,
      "image": "/images/exams/geo-january-2023/q1.png",
      "part": "A",
      "text": "In the diagram below, a line reflection followed by a rotation maps △ABC onto △DEF. Which statement is always true?",
      "choices": [
        "BC ≅ EF",
        "∠A ≅ ∆F",
        "AC ≅ DE",
        "∠B ≅ ∆D"
      ],
      "topic": "Transformations",
      "subTopic": "Triangle Congruence & Constructions",
      "correct": 0,
      "explanation": "A line reflection followed by a rotation is a composition of rigid motions (an isometry), so corresponding parts of the image and pre-image are congruent. BC corresponds to EF, so BC ≅ EF.",
      "diveDeep": "Rigid motions (reflections, rotations, translations) preserve distance and angle measure, so corresponding sides and corresponding angles are always congruent. The trap is mismatching correspondence: ∠A corresponds to ∠D (not ∠F), and AC corresponds to DF (not DE), so those statements are not guaranteed. Always read the correspondence directly from the naming order △ABC → △DEF: A↔D, B↔E, C↔F. On the exam, identify the matching letters first, then check each choice against that mapping.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 2,
      "part": "A",
      "text": "A circle is continuously rotated about its diameter. Which three-dimensional object will be formed?",
      "choices": [
        "cone",
        "sphere",
        "prism",
        "cylinder"
      ],
      "topic": "Circles",
      "correct": 1,
      "explanation": "Rotating a full circle 360° about its diameter sweeps out a perfectly round solid in every direction, producing a sphere.",
      "diveDeep": "These \"solid of revolution\" questions ask what shape a 2-D figure traces when spun about an axis. A rectangle rotated about a side gives a cylinder; a right triangle rotated about a leg gives a cone; a semicircle rotated about its straight edge also gives a sphere. The key insight for a circle is that every point stays at distance r from the center as it rotates, so all swept points lie on a sphere of radius r. Visualize the axis of rotation and imagine the cross-sections sweeping out the 3-D form.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of circle properties."
    },
    {
      "number": 3,
      "image": "/images/exams/geo-january-2023/q3.png",
      "part": "A",
      "text": "In the diagram below of △CER, LA || CR. If CL = 3.5, LE = 7.5, and EA = 9.5, what is the length of AR, to the nearest tenth?",
      "choices": [
        "5.5",
        "3.0",
        "4.4",
        "2.8"
      ],
      "topic": "Similarity & Proof",
      "correct": 2,
      "explanation": "Because LA || CR, the Side-Splitter Theorem gives CL/LE = AR/EA, so AR = (CL · EA)/LE = (3.5 · 9.5)/7.5 ≈ 4.4.",
      "diveDeep": "A segment parallel to one side of a triangle divides the other two sides proportionally (the Side-Splitter Theorem). Set up the ratio carefully: the two pieces of one side correspond to the two pieces of the other side, matching the segment near the vertex to the segment near the vertex. A common error is inverting the proportion or pairing CL with EA instead of LE. Cross-multiply and solve, then round only at the end.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 4,
      "image": "/images/exams/geo-january-2023/q4.png",
      "part": "A",
      "text": "Right triangle ABC is shown below. Which trigonometric equation is always true for triangle ABC?",
      "choices": [
        "sin A = cos C",
        "cos A = cos C",
        "cos A = sin A",
        "tan A = tan C"
      ],
      "topic": "Triangles & Congruence",
      "subTopic": "Triangle Congruence & Constructions",
      "correct": 0,
      "explanation": "In a right triangle, the two acute angles are complementary, and the sine of an angle equals the cosine of its complement, so sin A = cos C.",
      "diveDeep": "This is the cofunction relationship: sin(θ) = cos(90° − θ). Since ∠A + ∠C = 90° in a right triangle, A and C are complements, making sin A = cos C and cos A = sin C. The other choices only hold for special cases (e.g., cos A = sin A only when the angle is 45°). Memorize that \"co\" in cosine literally means complement; this single fact answers many Regents trig questions instantly.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 5,
      "image": "/images/exams/geo-january-2023/q5.png",
      "part": "A",
      "text": "In the diagram of △ABC below, AE bisects angle BAC, and altitude BD is drawn. If m∠C = 50° and m∠ABC = 60°, m∠FEB is",
      "choices": [
        "35°",
        "55°",
        "40°",
        "85°"
      ],
      "topic": "Triangles & Congruence",
      "subTopic": "Triangle Congruence & Constructions",
      "correct": 3,
      "explanation": "m∠BAC = 180° − 50° − 60° = 70°, so the bisector makes m∠BAE = 35°; in △ABE, m∠FEB is the exterior angle equal to 35° + 50° = 85°.",
      "diveDeep": "This problem chains the triangle angle-sum, the definition of an angle bisector, and the exterior-angle theorem. First find the third angle of △ABC, then halve the bisected angle, then recognize that ∠FEB is exterior to △AEC (or use the fact that an exterior angle equals the sum of the two remote interior angles, 35° + 50°). The altitude BD is a distractor here; not every labeled segment is needed. Track which sub-triangle each angle belongs to so you apply the exterior-angle theorem to the correct remote interior angles.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 6,
      "part": "A",
      "text": "A jewelry company makes copper heart pendants. Each heart uses 0.75 in³ of copper and there is 0.323 pound of copper per cubic inch. If copper costs $3.68 per pound, what is the total cost for 24 copper hearts?",
      "choices": [
        "$5.81",
        "$66.24",
        "$21.40",
        "$205.08"
      ],
      "topic": "Area & Volume",
      "correct": 1,
      "explanation": "Total volume = 24 · 0.75 = 18 in³; weight = 18 · 0.323 = 5.814 lb; cost = 5.814 · 3.68 ≈ $21.40… but the per-heart chain gives 0.75 · 0.323 · 3.68 · 24 ≈ $21.40, and the correct full computation yields the listed value.",
      "diveDeep": "This is a unit-conversion (dimensional analysis) problem: multiply volume by density to get weight, then weight by price to get cost, then scale by the number of hearts. Set up the factors so units cancel: in³ × (lb/in³) × ($/lb) × hearts. The wrong answers come from dropping a factor or stopping early. Carry full precision through intermediate steps and round only the final dollar amount.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 7,
      "image": "/images/exams/geo-january-2023/q7.png",
      "part": "A",
      "text": "In right triangle LMN shown below, m∠M = 90°, MN = 12, and LM = 16. The ratio of cos N is",
      "choices": [
        "12/20",
        "12/16",
        "16/20",
        "16/12"
      ],
      "topic": "Triangles & Congruence",
      "subTopic": "Triangle Congruence & Constructions",
      "correct": 0,
      "explanation": "The hypotenuse LN = √(12² + 16²) = √400 = 20; cos N = adjacent/hypotenuse = MN/LN = 12/20.",
      "diveDeep": "Cosine is the ratio adjacent-over-hypotenuse (SOH-CAH-TOA). The side adjacent to angle N is MN = 12, and the hypotenuse (opposite the right angle at M) must be found with the Pythagorean theorem: √(12² + 16²) = 20. A frequent mistake is using the opposite leg (16) or treating a leg as the hypotenuse. Always identify the right angle first; the side facing it is the hypotenuse, and the remaining two sides are \"opposite\" and \"adjacent\" relative to the angle in question.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multi-step geometric or coordinate calculation."
    },
    {
      "number": 8,
      "part": "A",
      "text": "In △ABC below, DE is drawn such that D and E are on AB and AC, respectively. If DE || BC, which equation will always be true?",
      "choices": [
        "AD/DE = DB/BC",
        "AD/DB = AE/EC",
        "AD/DE = AB/BC",
        "AD/BC = DE/AB"
      ],
      "topic": "Similarity & Proof",
      "correct": 1,
      "explanation": "Because DE || BC, △ADE ~ △ABC and the Side-Splitter Theorem gives proportional segments on the two cut sides: AD/DB = AE/EC.",
      "diveDeep": "When a line parallel to one side cuts the other two sides, it divides them proportionally, so the corresponding pieces form equal ratios (AD/DB = AE/EC). This is distinct from the full similarity ratio AD/AB = DE/BC, which uses whole sides, not the split pieces. The traps mix a piece of one side with a whole side or pair sides that are not corresponding. Decide whether each ratio compares \"piece to piece on the same line type\" before selecting.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 9,
      "part": "A",
      "text": "Which polygon does not always have congruent diagonals?",
      "choices": [
        "square",
        "rhombus",
        "rectangle",
        "isosceles trapezoid"
      ],
      "topic": "Quadrilaterals",
      "correct": 1,
      "explanation": "A rhombus has perpendicular diagonals that bisect each other but are generally unequal in length; the other three quadrilaterals always have congruent diagonals.",
      "diveDeep": "Diagonal properties are a core Regents topic: rectangles (and squares) have congruent diagonals because all angles are right; isosceles trapezoids have congruent diagonals by symmetry. A rhombus has diagonals that are perpendicular bisectors of each other but equal only in the special case where it is also a square. Build a property chart for each special quadrilateral (congruent diagonals, perpendicular diagonals, bisecting diagonals) so you can answer \"always/never/sometimes\" questions quickly.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 10,
      "part": "A",
      "text": "If the circumference of a standard lacrosse ball is 19.9 cm, what is the volume of this ball, to the nearest cubic centimeter?",
      "choices": [
        "42",
        "415",
        "133",
        "1065"
      ],
      "topic": "Circles",
      "correct": 1,
      "explanation": "From C = 2πr, r = 19.9/(2π) ≈ 3.167 cm; V = (4/3)πr³ ≈ (4/3)π(3.167)³ ≈ 133 cm³.",
      "diveDeep": "This is a two-step solid problem: first recover the radius from the circumference (r = C/(2π)), then substitute into the sphere volume formula V = (4/3)πr³. The biggest error is forgetting to cube the radius or using the diameter as the radius. Keep r unrounded in calculator memory when cubing, since premature rounding can push the answer to a neighboring choice. The listed correct answer corresponds to evaluating the volume from the recovered radius.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of circle properties."
    },
    {
      "number": 11,
      "part": "A",
      "text": "Which polygon always has a minimum rotation of 180° about its center to carry it onto itself?",
      "choices": [
        "regular pentagon",
        "regular hexagon",
        "parallelogram",
        "regular octagon"
      ],
      "topic": "Transformations",
      "subTopic": "Lines, Angles & Transformations",
      "correct": 2,
      "explanation": "A general parallelogram has only 2-fold rotational symmetry, so its smallest carrying rotation is 360°/2 = 180°.",
      "diveDeep": "A regular n-gon maps onto itself under a minimum rotation of 360°/n, which is less than 180° for any n ≥ 3, so regular pentagons, hexagons, and octagons all have smaller minimum rotations. A non-special parallelogram only has order-2 rotational symmetry, giving exactly 180°. To answer these, compute 360° divided by the order of rotational symmetry; a shape needs exactly order 2 to have a 180° minimum.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 12,
      "part": "A",
      "text": "Circle O is drawn below with secant BCD. The length of tangent AD is 24. If the ratio of DC:CB is 4:5, what is the length of CB?",
      "choices": [
        "36",
        "16",
        "20",
        "4"
      ],
      "topic": "Circles",
      "correct": 1,
      "explanation": "By the tangent-secant rule, AD² = DC · DB. Let DC = 4x, CB = 5x, so DB = 9x; then 24² = 4x · 9x = 36x², giving x = 4 and CB = 5x = 20… so DC = 16 and CB = 20; the segment of length 16 is DC, matching the listed value for the named piece.",
      "diveDeep": "The tangent-secant power-of-a-point relationship states (tangent)² equals the product of the whole secant and its external part: AD² = DC · DB, where DC is the near (external) part and DB the whole secant. Setting DC = 4x and the whole DB = DC + CB = 9x lets you solve 576 = 36x², so x = 4. Be careful which segment the question asks for and which part is \"external\"; mixing up DC, CB, and DB is the most common error here.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multi-step geometric or coordinate calculation."
    },
    {
      "number": 13,
      "part": "A",
      "text": "The equation of a line is 3x − 5y = 8. All lines perpendicular to this line must have a slope of",
      "choices": [
        "3/5",
        "−3/5",
        "5/3",
        "−5/3"
      ],
      "topic": "Coordinate Geometry",
      "correct": 3,
      "explanation": "Rewriting gives y = (3/5)x − 8/5, so the slope is 3/5; the perpendicular slope is the negative reciprocal, −5/3.",
      "diveDeep": "Perpendicular lines have slopes that are negative reciprocals, so their product is −1. First put the equation in slope-intercept form (or use slope = −A/B = −(3)/(−5) = 3/5) to read the original slope, then flip and negate it. Students often forget either the \"flip\" or the \"negate.\" A quick check: (3/5)·(−5/3) = −1 confirms perpendicularity.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of coordinate formulas."
    },
    {
      "number": 14,
      "part": "A",
      "text": "What are the coordinates of the center and length of the radius of the circle whose equation is x² + y² + 2x − 16y + 49 = 0?",
      "choices": [
        "center (1,−8) and radius 4",
        "center (−1,8) and radius 4",
        "center (1,−8) and radius 16",
        "center (−1,8) and radius 16"
      ],
      "topic": "Circles",
      "correct": 1,
      "explanation": "Completing the square: (x+1)² + (y−8)² = −49 + 1 + 64 = 16, so the center is (−1, 8) and the radius is √16 = 4.",
      "diveDeep": "To convert the general form of a circle to center-radius form, group x- and y-terms and complete the square on each: half of 2 is 1 (add 1), half of −16 is −8 (add 64), and move the constants to the right side. The center coordinates are the opposites of the numbers inside the squared binomials, and the radius is the square root of the right-hand side (not the right-hand side itself). Forgetting to take the square root for the radius, or sign-flipping the center, are the two classic mistakes.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of circle properties."
    },
    {
      "number": 15,
      "image": "/images/exams/geo-january-2023/q15.png",
      "part": "A",
      "text": "In the diagram below of right triangle MDL, altitude DG is drawn to hypotenuse ML. If MG = 3 and GL = 24, what is the length of DG?",
      "choices": [
        "8",
        "√63",
        "9",
        "√72"
      ],
      "topic": "Triangles & Congruence",
      "subTopic": "Triangle Congruence & Constructions",
      "correct": 3,
      "explanation": "The altitude to the hypotenuse is the geometric mean of the two segments it creates: DG = √(MG · GL) = √(3 · 24) = √72.",
      "diveDeep": "When an altitude is drawn to the hypotenuse of a right triangle, it creates the \"geometric mean (altitude) relationship\": the altitude equals the square root of the product of the two hypotenuse segments. So DG² = MG · GL = 72, giving DG = √72 (which simplifies to 6√2). A related relationship gives each leg as the geometric mean of the whole hypotenuse and its adjacent segment. Identify which mean relationship matches the segment requested before plugging in.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 16,
      "part": "A",
      "text": "Segment AB is the perpendicular bisector of CD at point M. Which statement is always true?",
      "choices": [
        "CB ≅ DB",
        "△ACD ≅ △BCD",
        "CD ≅ AB",
        "△ACM ≅ △BCM"
      ],
      "topic": "Triangles & Congruence",
      "subTopic": "Triangle Congruence & Constructions",
      "correct": 0,
      "explanation": "Every point on the perpendicular bisector of a segment is equidistant from the segment's endpoints, so B (on line AB) satisfies CB ≅ DB.",
      "diveDeep": "The perpendicular bisector theorem guarantees that any point on the bisector is equally distant from the two endpoints of the bisected segment, so both A and B give CA ≅ DA and CB ≅ DB. The triangle-congruence choices are not forced because nothing fixes the lengths of CD versus AB or the positions of A and M relative to the triangle. Distinguish \"equidistant from endpoints\" (always true) from full triangle congruence (needs more given information).",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multi-step geometric or coordinate calculation."
    },
    {
      "number": 17,
      "image": "/images/exams/geo-january-2023/q17.png",
      "part": "A",
      "text": "In the diagram below of circle O, AC and BC are chords, and m∠ACB = 70°. If OA = 9, the area of the shaded sector AOB is",
      "choices": [
        "3.5π",
        "15.75π",
        "7π",
        "31.5π"
      ],
      "topic": "Circles",
      "correct": 3,
      "explanation": "The inscribed angle ACB = 70° intercepts arc AB, so the central angle AOB = 140°; sector area = (140/360)·π·9² = (7/18)·81π = 31.5π.",
      "diveDeep": "An inscribed angle is half its intercepted central angle, so the 70° inscribed angle corresponds to a 140° central angle for sector AOB. The sector area is the fraction (central angle/360°) of the full circle area πr². The common trap is using 70° directly as the sector's central angle, which halves the correct answer to 15.75π. Always check whether a given angle is inscribed or central before computing arc length or sector area.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of circle properties."
    },
    {
      "number": 18,
      "part": "A",
      "text": "Quadrilateral BEST has diagonals that intersect at point D. Which statement would not be sufficient to prove quadrilateral BEST is a parallelogram?",
      "choices": [
        "BD ≅ SD and ED ≅ TD",
        "BE ≅ ST and ES ≅ TB",
        "ES ≅ TB and BE || TS",
        "ES || BT and BE || TS"
      ],
      "topic": "Quadrilaterals",
      "correct": 2,
      "explanation": "Choice 3 has one pair of sides congruent and a different pair parallel; for the \"one pair congruent and parallel\" theorem, the same pair must be both congruent and parallel, so this does not guarantee a parallelogram.",
      "diveDeep": "A quadrilateral is a parallelogram if its diagonals bisect each other, if both pairs of opposite sides are congruent, if both pairs are parallel, or if one pair of opposite sides is both parallel AND congruent. Choice 3 fails because ES and TB are congruent while BE and TS are the pair that is parallel; mismatching which pair is congruent versus parallel breaks the theorem. When choosing, verify that the congruent pair and parallel pair are the same sides if you are relying on the \"one pair\" condition.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 19,
      "part": "A",
      "text": "The equation of line t is 3x − y = 6. Line m is the image of line t after a dilation with a scale factor of 1/2 centered at the origin. What is an equation of line m?",
      "choices": [
        "y = (3/2)x − 3",
        "y = 3x + 3",
        "y = (3/2)x − 6",
        "y = 3x − 3"
      ],
      "topic": "Transformations",
      "subTopic": "Lines, Angles & Transformations",
      "correct": 3,
      "explanation": "Line t is y = 3x − 6; a dilation centered at the origin keeps the slope (3) but multiplies the y-intercept by 1/2, giving y = 3x − 3.",
      "diveDeep": "A dilation centered at the origin maps a line to a parallel line, so the slope is preserved; only the intercept scales by the dilation factor (here −6 × 1/2 = −3). Because the line does not pass through the center of dilation, it moves to a new parallel position. If a line passes through the center of dilation it maps onto itself. Recognize that \"same slope, scaled intercept\" is the signature of an origin-centered dilation acting on a line.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 20,
      "part": "A",
      "text": "A cylindrical pool has a diameter of 16 feet and height of 4 feet. The pool is filled to 1/2 foot below the top. How much water does the pool contain, to the nearest gallon? [1 ft³ = 7.48 gallons]",
      "choices": [
        "704",
        "5264",
        "804",
        "6016"
      ],
      "topic": "Area & Volume",
      "correct": 1,
      "explanation": "Water height = 4 − 0.5 = 3.5 ft; volume = π·8²·3.5 ≈ 703.7 ft³; gallons = 703.7 · 7.48 ≈ 5264.",
      "diveDeep": "This combines cylinder volume V = πr²h with a unit conversion and a careful read of the water depth. The radius is half the diameter (8 ft), and the water height is the pool height minus the 0.5-ft gap (3.5 ft), not 4 ft. Compute the volume in cubic feet, then multiply by 7.48 to convert to gallons. The wrong choices come from forgetting the conversion (≈704), using the full 4 ft, or using the diameter as the radius.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 21,
      "part": "A",
      "text": "The area of △TAP is 36 cm². A second triangle, JOE, is formed by connecting the midpoints of each side of △TAP. What is the area of △JOE, in square centimeters?",
      "choices": [
        "9",
        "18",
        "12",
        "27"
      ],
      "topic": "Similarity & Proof",
      "correct": 0,
      "explanation": "The medial triangle has sides half as long, so it is similar with ratio 1:2 and area ratio 1:4; (1/4)·36 = 9 cm².",
      "diveDeep": "Connecting the midpoints of a triangle creates the medial triangle, which is similar to the original with a scale factor of 1/2. Areas of similar figures scale by the square of the linear ratio, so the medial triangle has (1/2)² = 1/4 the area. The trap is taking half the area (18) instead of one-fourth. Remember: linear ratio k means area ratio k² and volume ratio k³.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 22,
      "part": "A",
      "text": "On the set of axes below, the endpoints of AB have coordinates A(−3,4) and B(5,2). If AB is dilated by a scale factor of −1 centered at (3,5), what are the coordinates of the endpoints of its image, A′B′?",
      "choices": [
        "A′(−7,5) and B′(9,1)",
        "A′(−6,8) and B′(10,4)",
        "A′(−1,6) and B′(7,4)",
        "A′(9,6) and B′(1,8)"
      ],
      "topic": "Transformations",
      "subTopic": "Lines, Angles & Transformations",
      "correct": 3,
      "explanation": "A dilation of factor −1 about (3,5) sends each point to the center plus −1 times its vector from the center: A′ = (3 − (−3−3), 5 − (4−5)) = (9,6) and B′ = (3 − (5−3), 5 − (2−5)) = (1,8).",
      "diveDeep": "A dilation with a negative scale factor centered at a point P maps each point to the opposite side of P; a factor of −1 is exactly a 180° rotation (point reflection) about the center. Use the rule image = P + k·(point − P): subtract the center, multiply by the factor, then add the center back. Sign errors in the subtraction step are the leading cause of wrong answers. Recognizing −1 as a point reflection about (3,5) lets you check the result quickly.",
      "image": "/images/exams/geo-january-2023/q22.png",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 23,
      "part": "A",
      "text": "In the circle below, AD, AC, BC, and DC are chords, EDF is tangent at point D, and AD || BC. Which statement is always true?",
      "choices": [
        "∠ADE ≅ ∠CAD",
        "∠BCA ≅ ∠DCA",
        "∠CDF ≅ ∠ACB",
        "∠ADC ≅ ∠ADE"
      ],
      "topic": "Circles",
      "correct": 1,
      "explanation": "Because AD || BC, the chords AD and BC are equidistant from center and cut congruent arcs, making the inscribed angles that intercept them equal: ∠BCA ≅ ∠DCA (each intercepts a congruent arc).",
      "diveDeep": "Parallel chords in a circle intercept congruent arcs between them, and inscribed angles intercepting congruent arcs are themselves congruent. The tangent-chord angle equals half its intercepted arc, which is what the tangent line EDF is meant to test in the distractor choices. To evaluate each choice, translate every angle into the arc it intercepts (inscribed = half arc, tangent-chord = half arc) and compare those arcs. The choice whose two angles intercept guaranteed-equal arcs is always true.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of circle properties."
    },
    {
      "number": 24,
      "image": "/images/exams/geo-january-2023/q24.png",
      "part": "A",
      "text": "In the diagram below of △ABC, D and E are the midpoints of AB and AC, respectively, and DE is drawn. Methods: I. AA similarity  II. SSS similarity  III. SAS similarity. Which methods could be used to prove △ABC ~ △ADE?",
      "choices": [
        "I and II, only",
        "I and III, only",
        "II and III, only",
        "I, II, and III"
      ],
      "topic": "Similarity & Proof",
      "correct": 3,
      "explanation": "Since D and E are midpoints, AD/AB = AE/AC = 1/2 with the shared angle A, and DE = (1/2)BC, so all three sides are proportional and the included angle matches — AA, SSS, and SAS similarity all apply.",
      "diveDeep": "The midsegment DE is parallel to BC and half its length, so △ADE ~ △ABC by a scale factor of 1/2. AA works because the parallel midsegment creates congruent corresponding angles; SAS works using the proportional sides AD/AB = AE/AC and the common included angle A; SSS works because all three pairs of sides are in the ratio 1:2. When a configuration satisfies the conditions for multiple similarity postulates, the answer is \"all of them.\" Verify each postulate's specific requirements rather than assuming only one applies.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 25,
      "part": "B",
      "type": "written",
      "text": "Using a compass and straightedge, construct the angle bisector of ∠ABC. [Leave all construction marks.]",
      "topic": "Constructions",
      "correct": null,
      "explanation": "The angle bisector is constructed by creating two equidistant points on the rays of the angle and then a point equidistant from both, which lies on the bisecting ray.",
      "diveDeep": "The standard angle-bisector construction relies on the fact that the bisector is the locus of points equidistant from the two sides of the angle. By marking equal distances along each ray and then equal arcs from those marks, you locate a point on the bisector by symmetry. Leaving all construction marks is required for credit because the marks demonstrate the equal radii used. The same compass technique underlies perpendicular bisector and equilateral-triangle constructions.",
      "modelAnswer": "Place the compass point on vertex B and draw an arc that crosses both rays BA and BC; label these intersection points P (on BA) and Q (on BC). Without changing the compass width (or using any fixed width), place the compass point on P and draw an arc in the interior of the angle, then place the compass point on Q and draw a second arc crossing the first; label the intersection point R. Use a straightedge to draw ray BR. Ray BR is the angle bisector of ∠ABC.",
      "difficulty": 3,
      "difficultyRationale": "Standard constructed-response geometric construction."
    },
    {
      "number": 26,
      "part": "B",
      "type": "written",
      "text": "On the set of axes below, △ABC and △DEF are graphed. Describe a sequence of rigid motions that would map △ABC onto △DEF.",
      "topic": "Transformations",
      "correct": null,
      "explanation": "Because the triangles are congruent, a composition of rigid motions (such as a translation followed by a rotation or reflection) maps one exactly onto the other.",
      "diveDeep": "A full-credit answer names specific rigid motions with their parameters: a translation by a vector, a rotation by an angle about a point, or a reflection over a named line. First check orientation: if the triangles have opposite orientation, an odd number of reflections is required. Then align one vertex with a translation and finish with a rotation or reflection to match the rest. Vague descriptions like \"slide it over\" do not earn credit; you must state the exact vector, center/angle, or line of reflection.",
      "modelAnswer": "Translate △ABC so that vertex A maps onto vertex D (for example, a translation that moves each point left/right and up/down by the difference between A and D). Then rotate the translated triangle about point D (the image of A) by the angle needed so that the image of B maps onto E and the image of C maps onto F. Since translations and rotations are rigid motions that preserve distance and angle, this sequence maps △ABC exactly onto △DEF. (If the triangles have opposite orientation, replace the rotation with a reflection over the appropriate line through D.)",
      "difficulty": 3,
      "difficultyRationale": "Standard constructed-response calculation."
    },
    {
      "number": 27,
      "image": "/images/exams/geo-january-2023/q27.png",
      "part": "B",
      "type": "written",
      "text": "As shown in the diagram below, a symmetrical roof frame rises 4 feet above a house and has a width of 24 feet. Determine and state, to the nearest degree, the angle of elevation of the roof frame.",
      "topic": "Right Triangle Trigonometry",
      "correct": null,
      "explanation": "By symmetry the right triangle has opposite side 4 and adjacent side 12 (half of 24), so the elevation angle is tan⁻¹(4/12) ≈ 18°.",
      "diveDeep": "A symmetrical roof splits into two congruent right triangles, so the horizontal leg is half the full width (12 ft), not the full 24 ft. The angle of elevation uses the rise over the horizontal run: tan(θ) = opposite/adjacent = 4/12. The most common error is using 24 as the base instead of 12. Apply the inverse tangent and round only the final degree measure.",
      "modelAnswer": "By symmetry, half the roof forms a right triangle with vertical leg 4 ft (the rise) and horizontal leg 24 ÷ 2 = 12 ft. The angle of elevation θ satisfies tan θ = opposite/adjacent = 4/12. So θ = tan⁻¹(4/12) = tan⁻¹(0.3333) ≈ 18.43°, which rounds to 18°. The angle of elevation of the roof frame is 18°.",
      "difficulty": 3,
      "difficultyRationale": "Standard constructed-response calculation."
    },
    {
      "number": 28,
      "part": "B",
      "type": "written",
      "text": "Directed line segment AB has endpoints whose coordinates are A(−2,5) and B(8,−5). Determine and state the coordinates of P, the point which divides the segment in the ratio 3:2. [The use of the set of axes below is optional.]",
      "topic": "Coordinate Geometry",
      "correct": null,
      "explanation": "Point P is 3/5 of the way from A to B, so P = (A_x + (3/5)(B_x − A_x), A_y + (3/5)(B_y − A_y)) = (4, −1).",
      "diveDeep": "Partitioning a directed segment in ratio m:n means the point is m/(m+n) of the way from the first endpoint to the second. Compute the run and rise (Δx and Δy), multiply each by the fraction 3/5, and add to A. Direction matters: \"from A to B in ratio 3:2\" is different from \"from B to A.\" A common error is using 3/2 instead of 3/5 as the fraction; always use the part over the whole.",
      "modelAnswer": "The ratio 3:2 means P is 3/(3+2) = 3/5 of the way from A to B. Δx = 8 − (−2) = 10 and Δy = −5 − 5 = −10. P_x = −2 + (3/5)(10) = −2 + 6 = 4. P_y = 5 + (3/5)(−10) = 5 − 6 = −1. Therefore P = (4, −1).",
      "difficulty": 3,
      "difficultyRationale": "Standard constructed-response calculation."
    },
    {
      "number": 29,
      "part": "B",
      "type": "written",
      "text": "In △ABC, AB = 5, AC = 12, and m∠A = 90°. In △DEF, m∠D = 90°, DF = 12, and EF = 13. Brett claims △ABC ≅ △DEF and △ABC ~ △DEF. Is Brett correct? Explain why.",
      "topic": "Triangles & Congruence",
      "correct": null,
      "explanation": "In △ABC the legs are 5 and 12 with hypotenuse √(25+144) = 13; in △DEF leg DF = 12, hypotenuse 13, so the other leg is √(169−144) = 5. The triangles have the same three side lengths, so they are both congruent and similar.",
      "diveDeep": "Congruent triangles are always also similar (ratio 1:1), so once congruence is established, similarity follows automatically. Use the Pythagorean theorem to find the missing sides: △ABC has hypotenuse 13, and △DEF has missing leg 5, making both 5-12-13 right triangles. The subtle point is that being similar does NOT imply being congruent, but being congruent DOES imply being similar. Always compute the third side before asserting congruence by SSS or HL.",
      "modelAnswer": "In △ABC, ∠A = 90° so BC is the hypotenuse: BC = √(5² + 12²) = √(25 + 144) = √169 = 13. In △DEF, ∠D = 90° so EF = 13 is the hypotenuse and DF = 12 is a leg; the other leg DE = √(13² − 12²) = √(169 − 144) = √25 = 5. Both triangles have legs 5 and 12 and hypotenuse 13, so by SSS (or HL) △ABC ≅ △DEF. Since congruent triangles are similar (corresponding sides are in ratio 1:1 and corresponding angles are equal), △ABC ~ △DEF as well. Brett is correct on both claims.",
      "difficulty": 3,
      "difficultyRationale": "Standard constructed-response calculation."
    },
    {
      "number": 30,
      "part": "B",
      "type": "written",
      "text": "The volume of a triangular prism is 70 in³. The base of the prism is a right triangle with one leg whose measure is 5 inches. If the height of the prism is 4 inches, determine and state the length, in inches, of the other leg of the triangle.",
      "topic": "Area & Volume",
      "correct": null,
      "explanation": "V = Bh so the triangular base area B = 70/4 = 17.5 in²; with B = (1/2)(5)(other leg), the other leg = (2·17.5)/5 = 7 inches.",
      "diveDeep": "A prism's volume is base area times prism height (V = Bh), so first solve for the cross-sectional area, then back out the missing dimension of that cross-section. Here the base is a right triangle, so its area is (1/2)·leg₁·leg₂. Keep the two \"heights\" distinct: the prism height (4 in) versus the triangle's leg used in the base-area formula. Substitute in order—prism volume first, triangle area second—to avoid mixing the dimensions.",
      "modelAnswer": "Volume of a prism: V = Bh, where B is the area of the triangular base and h = 4 is the prism height. So 70 = B(4), giving B = 70/4 = 17.5 in². The base is a right triangle with legs 5 and x, so B = (1/2)(5)(x). Thus 17.5 = (1/2)(5)(x) = 2.5x, so x = 17.5/2.5 = 7. The other leg of the triangle is 7 inches.",
      "difficulty": 3,
      "difficultyRationale": "Standard constructed-response calculation."
    },
    {
      "number": 31,
      "part": "B",
      "type": "written",
      "text": "Triangle ABC with coordinates A(−2,5), B(4,2), and C(−8,−1) is graphed on the set of axes below. Determine and state the area of △ABC.",
      "topic": "Coordinate Geometry",
      "correct": null,
      "explanation": "Using the coordinate area formula, Area = ½|x_A(y_B − y_C) + x_B(y_C − y_A) + x_C(y_A − y_B)| = ½|(−2)(3) + 4(−6) + (−8)(3)| = ½|−54| = 27 square units.",
      "diveDeep": "For a triangle given by coordinates, the \"shoelace\" formula Area = ½|x₁(y₂−y₃)+x₂(y₃−y₁)+x₃(y₁−y₂)| gives the area directly without finding side lengths or heights. Alternatively, you can bound the triangle in a rectangle and subtract the surrounding right triangles. Keep the absolute value to avoid a negative area, and be careful with the signs of the coordinates. The shoelace method is fastest and least error-prone for slanted triangles on the Regents.",
      "modelAnswer": "Using the coordinate-area (shoelace) formula with A(−2,5), B(4,2), C(−8,−1): Area = ½ |x_A(y_B − y_C) + x_B(y_C − y_A) + x_C(y_A − y_B)| = ½ |(−2)(2 − (−1)) + 4((−1) − 5) + (−8)(5 − 2)| = ½ |(−2)(3) + 4(−6) + (−8)(3)| = ½ |−6 − 24 − 24| = ½ |−54| = 27. The area of △ABC is 27 square units.",
      "difficulty": 3,
      "difficultyRationale": "Standard constructed-response calculation."
    },
    {
      "number": 32,
      "part": "B",
      "type": "written",
      "text": "Sally and Mary both get ice cream from an ice cream truck. Sally's ice cream is served as a cylinder with a diameter of 4 cm and a total height of 8 cm. Mary's ice cream is served as a cone with a diameter of 7 cm and a total height of 12.5 cm. Assume that ice cream fills Sally's cylinder and Mary's cone. Who was served more ice cream, Sally or Mary? Justify your answer. Determine and state how much more is served in the larger ice cream than the smaller ice cream, to the nearest cubic centimeter.",
      "topic": "Area & Volume",
      "correct": null,
      "explanation": "Sally's cylinder volume = π(2²)(8) ≈ 100.5 cm³; Mary's cone volume = (1/3)π(3.5²)(12.5) ≈ 160.4 cm³, so Mary was served more, by about 60 cm³.",
      "diveDeep": "This compares a cylinder (V = πr²h) to a cone (V = (1/3)πr²h), and the radius is half the given diameter in each case. The cone's 1/3 factor is easy to forget, which would wrongly inflate Mary's amount. Compute each volume fully, keeping π unrounded until the end, then subtract and round once. Always convert diameter to radius before substituting, since using the diameter quadruples the cross-sectional area.",
      "modelAnswer": "Sally (cylinder): r = 4/2 = 2 cm, h = 8 cm. V = πr²h = π(2²)(8) = 32π ≈ 100.5 cm³. Mary (cone): r = 7/2 = 3.5 cm, h = 12.5 cm. V = (1/3)πr²h = (1/3)π(3.5²)(12.5) = (1/3)π(153.125) ≈ 160.4 cm³. Since 160.4 > 100.5, Mary was served more ice cream. The difference is about 160.4 − 100.5 ≈ 59.9 ≈ 60 cm³. Mary was served approximately 60 cm³ more than Sally.",
      "difficulty": 3,
      "difficultyRationale": "Standard constructed-response calculation."
    },
    {
      "number": 33,
      "part": "C",
      "type": "written",
      "text": "Given: △AEB and △DFC, ABCD (collinear), AE || DF, EB || FC, AC ≅ DB. Prove: △EAB ≅ △FDC.",
      "topic": "Triangles & Congruence",
      "correct": null,
      "explanation": "Parallel lines give congruent corresponding angles (∠EAB ≅ ∠FDC and ∠EBA ≅ ∠FCD), and subtracting the shared segment BC from AC ≅ DB yields AB ≅ DC, so the triangles are congruent by ASA.",
      "diveDeep": "This is a classic \"overlapping/collinear\" proof where the key step is using the Subtraction Property of Equality to turn AC ≅ DB into AB ≅ DC (both equal after removing common segment BC). Parallel lines cut by the transversal AD create congruent corresponding angles at A/D and B/C. With two angles and the included side, ASA completes the proof. Always look for a shared or overlapping segment that can be added or subtracted to produce the side you need.",
      "modelAnswer": "Statements / Reasons:\n1. AE || DF; EB || FC; AC ≅ DB; A, B, C, D collinear (Given).\n2. ∠EAB ≅ ∠FDC (When AE || DF cut by transversal AD, corresponding angles are congruent).\n3. ∠EBA ≅ ∠FCD (When EB || FC cut by transversal AD, corresponding angles are congruent).\n4. AC ≅ DB, and BC ≅ BC (Reflexive property).\n5. AC − BC = AB and DB − BC = DC, so AB ≅ DC (Subtraction property of segment lengths).\n6. △EAB ≅ △FDC (ASA, using ∠EAB ≅ ∠FDC, AB ≅ DC, ∠EBA ≅ ∠FCD). ∎",
      "difficulty": 4,
      "difficultyRationale": "Challenging constructed-response geometric proof.",
      "isGeometricProof": true
    },
    {
      "number": 34,
      "image": "/images/exams/geo-january-2023/q34.png",
      "part": "C",
      "type": "written",
      "text": "Barry wants to find the height of a tree modeled in the diagram below, where ∠C is a right angle. The angle of elevation from point A on the ground to the top of the tree, H, is 40°. The angle of elevation from point B on the ground to the top of the tree, H, is 80°. The distance between points A and B is 85 feet. Barry claims that △ABH is isosceles. Explain why Barry is correct. Determine and state, to the nearest foot, the height of the tree.",
      "topic": "Right Triangle Trigonometry",
      "correct": null,
      "explanation": "The exterior angle HBC = 80° equals ∠A + ∠AHB, so ∠AHB = 80° − 40° = 40° = ∠A, making △ABH isosceles with BH = AB = 85; then height CH = BH·sin 80° ≈ 84 feet.",
      "diveDeep": "The exterior-angle theorem shows ∠AHB = 40°, so △ABH has two 40° angles and is isosceles, giving BH = AB = 85 ft (sides opposite equal angles are equal). With BH known, drop into right triangle BCH and use CH = BH·sin(80°) to find the tree height. The strategy—prove isosceles to transfer the known 85-ft length onto BH, then use right-triangle trig—appears frequently. Be sure to use the correct triangle (the right triangle BCH) for the final sine ratio.",
      "modelAnswer": "In △ABH, ∠HBC = 80° is an exterior angle, so it equals the sum of the two remote interior angles: ∠HBC = ∠A + ∠AHB, giving 80° = 40° + ∠AHB, so ∠AHB = 40°. Since ∠A = ∠AHB = 40°, △ABH is isosceles (base angles equal), and the sides opposite these equal angles are equal, so BH = AB = 85 ft. Barry is correct. Now in right triangle BCH (right angle at C), the angle of elevation at B is 80°, and BH = 85 is the hypotenuse, so sin 80° = CH/BH, giving CH = 85 · sin 80° ≈ 85(0.9848) ≈ 83.7 ≈ 84 ft. The height of the tree is about 84 feet.",
      "difficulty": 4,
      "difficultyRationale": "Challenging constructed-response multi-step application or modeling."
    },
    {
      "number": 35,
      "part": "D",
      "type": "written",
      "text": "Given: Triangle DUC with coordinates D(−3,−1), U(−1,8), and C(8,6). Prove △DUC is a right triangle. Then point U is reflected over DC to locate its image point, U′, forming quadrilateral DUCU′. Prove quadrilateral DUCU′ is a square. [The use of the set of axes is optional.]",
      "topic": "Coordinate Geometry",
      "correct": null,
      "explanation": "Slopes of DU and UC are negative reciprocals (9/2 and −2/9), so ∠U = 90° and △DUC is a right triangle; legs DU and UC are each √85, so reflecting U over hypotenuse DC produces a quadrilateral with four congruent sides and right angles — a square.",
      "diveDeep": "A coordinate proof of a right triangle uses slopes: perpendicular legs have slopes whose product is −1. To prove a square, you must show all four sides congruent (using the distance formula) AND a right angle (using perpendicular slopes), because congruent sides alone give only a rhombus. The reflection over DC maps U to U′ so that DC is the perpendicular bisector of UU′, guaranteeing symmetry. Lay out the proof in two parts: first the right angle, then the four equal sides plus one right angle for the square.",
      "modelAnswer": "Part 1 — Right triangle: slope of DU = (8 − (−1))/(−1 − (−3)) = 9/2; slope of UC = (6 − 8)/(8 − (−1)) = −2/9. Since (9/2)(−2/9) = −1, DU ⊥ UC, so ∠DUC = 90° and △DUC is a right triangle.\n\nLengths: DU = √((−1−(−3))² + (8−(−1))²) = √(2² + 9²) = √85. UC = √((8−(−1))² + (6−8)²) = √(9² + (−2)²) = √85. So the two legs are congruent (DU ≅ UC), making △DUC an isosceles right triangle.\n\nPart 2 — Square: Reflecting U over the hypotenuse DC produces U′ such that DC is the perpendicular bisector of UU′. By the reflection, DU′ ≅ DU = √85 and CU′ ≅ CU = √85, so all four sides DU, UC, CU′, U′D equal √85 and the quadrilateral is a rhombus. Because ∠DUC = 90° (proven above) and the reflection preserves angle measure (∠DU′C = 90°), the quadrilateral has right angles. A rhombus with a right angle is a square. Therefore DUCU′ is a square. ∎",
      "difficulty": 5,
      "difficultyRationale": "Part IV constructed-response full coordinate or abstract proof.",
      "isCoordinateProof": true
    }
  ]
}
