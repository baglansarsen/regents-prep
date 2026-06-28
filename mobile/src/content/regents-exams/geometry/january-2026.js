// Enriched Geometry exam — tagged with skill + subTopic (see content/_shared/lessonEngine.js)
export default {
  "id": "geo-jan-2026",
  "subject": "geometry",
  "year": 2026,
  "session": "January",
  "totalMinutes": 180,
  "questions": [
    {
      "number": 1,
      "image": "/images/exams/geo-january-2026/q1.png",
      "part": "A",
      "text": "In the diagram below, lines m and n intersect at point P. If the measure of one of the angles formed is 65°, what is the measure of its vertical angle?",
      "choices": [
        "25°",
        "65°",
        "115°",
        "130°"
      ],
      "topic": "General",
      "correct": 1,
      "explanation": "Vertical angles are formed by two intersecting lines and are always congruent, so the vertical angle also measures 65°.",
      "diveDeep": "Vertical angles are the non-adjacent angles formed when two lines cross; they are always equal in measure. A common trap is confusing vertical angles with linear-pair (supplementary) angles — the 115° choice is the supplement (180° − 65°). On the exam, identify whether two angles share a vertex but no side (vertical, equal) or share a side and form a straight line (linear pair, sum to 180°). Always sketch and label the relationship before computing.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 2,
      "part": "A",
      "text": "Which transformation does NOT always preserve distance?",
      "choices": [
        "a translation",
        "a rotation",
        "a line reflection",
        "a dilation"
      ],
      "topic": "Transformations",
      "correct": 3,
      "explanation": "A dilation changes the size of a figure by a scale factor, so it does not preserve distance unless the scale factor is 1.",
      "diveDeep": "Translations, rotations, and reflections are rigid motions (isometries) that preserve both distance and angle measure, so the image is always congruent to the pre-image. A dilation preserves angle measure and shape but multiplies all lengths by the scale factor, producing a similar (not congruent) figure. A frequent error is assuming dilations preserve everything — remember that only when k = 1 is a dilation an isometry. Know the difference between congruence-preserving rigid motions and similarity-preserving dilations.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 3,
      "part": "A",
      "text": "A regular hexagon is rotated about its center. The minimum number of degrees needed to carry the hexagon onto itself is",
      "choices": [
        "30°",
        "45°",
        "60°",
        "72°"
      ],
      "topic": "Transformations",
      "correct": 2,
      "explanation": "A regular hexagon has 6-fold rotational symmetry, so the smallest rotation that maps it onto itself is 360° ÷ 6 = 60°.",
      "diveDeep": "For any regular n-sided polygon, the minimum rotation that carries it onto itself is 360°/n. A hexagon has n = 6, giving 60°. The trap choice 72° is the answer for a pentagon (360/5), and 45° corresponds to an octagon (360/8). On the exam, count the sides carefully and divide 360 by that number; multiples of that smallest angle also work, but the question asks for the minimum.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 4,
      "part": "A",
      "text": "A right triangle has legs of 4 cm and 7 cm. When the triangle is rotated continuously about the leg measuring 4 cm, the solid formed is",
      "choices": [
        "a cone with a height of 4 cm and a radius of 7 cm",
        "a cone with a height of 4 cm and a radius of 14 cm",
        "a pyramid with a height of 4 cm and a base length of 7 cm",
        "a pyramid with a height of 4 cm and a base length of 14 cm"
      ],
      "topic": "Area & Volume",
      "correct": 0,
      "explanation": "Rotating a right triangle 360° about one leg sweeps out a cone whose height equals that leg (4 cm) and whose radius equals the other leg (7 cm).",
      "diveDeep": "Rotating a 2-D figure about an axis generates a 3-D solid of revolution. A right triangle spun about a leg always produces a cone: the leg on the axis becomes the height, and the perpendicular leg becomes the radius of the circular base. A common trap is doubling the leg to 14 cm (treating it as a diameter) — the radius equals the leg itself, not twice it. Visualize the path the far vertex traces as it spins; that circle is the base.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 5,
      "part": "A",
      "text": "Which equation represents a circle with center (−3, 5) and a radius of 4?",
      "choices": [
        "(x − 3)² + (y + 5)² = 16",
        "(x + 3)² + (y − 5)² = 16",
        "(x − 3)² + (y + 5)² = 4",
        "(x + 3)² + (y − 5)² = 4"
      ],
      "topic": "Circles",
      "correct": 1,
      "explanation": "The standard form is (x − h)² + (y − k)² = r², so center (−3, 5) gives (x + 3)² + (y − 5)² and r² = 4² = 16.",
      "diveDeep": "In the equation (x − h)² + (y − k)² = r², the center is (h, k) and the right side is the radius squared, not the radius. The signs flip: a center x-coordinate of −3 appears as (x + 3). The classic traps here are forgetting to square the radius (using 4 instead of 16) and mishandling the negative sign of the center. Always double-check both the sign reversal and the squaring of the radius.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of circle properties."
    },
    {
      "number": 6,
      "part": "A",
      "text": "Triangle DEF is similar to triangle JKL with a scale factor of 2:3. If the area of triangle DEF is 20 square units, what is the area of triangle JKL?",
      "choices": [
        "30",
        "45",
        "13.3",
        "40"
      ],
      "topic": "Similarity & Proof",
      "correct": 1,
      "explanation": "Areas of similar figures scale by the square of the linear scale factor, so (3/2)² × 20 = 9/4 × 20 = 45 square units.",
      "diveDeep": "When two figures are similar with linear ratio a:b, their areas are in ratio a²:b² and their volumes in ratio a³:b³. Here the linear ratio 2:3 gives an area ratio 4:9, so the larger triangle has area 20 × 9/4 = 45. A common mistake is multiplying area by the linear factor (3/2) instead of its square. Always square the scale factor for area and cube it for volume.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 7,
      "part": "A",
      "text": "A right triangle has legs of 4 cm and 14 cm. When the triangle is rotated continuously about the leg measuring 4 cm, the solid formed is",
      "choices": [
        "a cone with a height of 4 cm and a radius of 7 cm",
        "a cone with a height of 4 cm and a radius of 14 cm",
        "a pyramid with a height of 4 cm and a base length of 7 cm",
        "a pyramid with a height of 4 cm and a base length of 14 cm"
      ],
      "topic": "Area & Volume",
      "correct": 1,
      "explanation": "Rotating the right triangle about the 4 cm leg produces a cone whose height is 4 cm and whose radius equals the other leg, 14 cm.",
      "diveDeep": "A solid of revolution from a right triangle spun about one of its legs is always a cone, with that leg as the height and the perpendicular leg as the radius. The trap of halving 14 to 7 (treating it as a diameter) is wrong — the radius equals the full perpendicular leg. Picture the far vertex tracing a circle of radius 14 as the triangle sweeps a full turn.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 8,
      "part": "A",
      "text": "In a circle with a radius of 32 cm, a central angle measures 140°. What is the length of the arc AB it intercepts, to the nearest centimeter?",
      "choices": [
        "10",
        "50",
        "64",
        "78"
      ],
      "topic": "Circles",
      "correct": 3,
      "explanation": "Arc length = (central angle/360°) × 2πr = (140/360) × 2π(32) ≈ 78 cm.",
      "diveDeep": "Arc length is a fraction of the full circumference, where the fraction is the central angle over 360°. Compute (140/360) × 2π × 32 ≈ 0.3889 × 201.06 ≈ 78.2 cm. A frequent error is confusing arc length (a distance) with sector area (a region using πr²) — be sure to use circumference 2πr for arc length. Keep the calculator in degree mode and don't round until the end.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of circle properties."
    },
    {
      "number": 9,
      "part": "A",
      "text": "In parallelogram ABCD, the diagonals AC and BD intersect at point E. Which statement must be true?",
      "choices": [
        "AC ≅ BD",
        "AE ≅ EC",
        "AC ⊥ BD",
        "AB ≅ BC"
      ],
      "topic": "Triangles & Congruence",
      "correct": 1,
      "explanation": "In any parallelogram the diagonals bisect each other, so E is the midpoint of AC, making AE ≅ EC.",
      "diveDeep": "A defining property of all parallelograms is that the diagonals bisect each other (each diagonal cuts the other in half). The traps describe properties of special parallelograms: congruent diagonals (AC ≅ BD) hold only for rectangles, perpendicular diagonals (AC ⊥ BD) only for rhombi, and adjacent congruent sides (AB ≅ BC) only for rhombi. Always distinguish properties that hold for every parallelogram from those reserved for rectangles, rhombi, or squares.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 10,
      "part": "A",
      "text": "The face of a shed is modeled below. The rectangular section of the face, BFGK, is 10 feet wide. The triangular section of the face, FEG, is an isosceles triangle with vertex angle FEG and a height of 6 feet. What is m∠EGD, to the nearest degree?",
      "choices": [
        "34°",
        "50°",
        "40°",
        "56°"
      ],
      "topic": "Right Triangles & Trig",
      "correct": 2,
      "explanation": "Half the 10 ft base is 5 ft, so the base angle satisfies tan(∠EGF) = 6/5, giving about 50°; then ∠EGD = 90° − 50° ≈ 40°.",
      "diveDeep": "Drop the altitude of the isosceles triangle from E to the midpoint of FG, creating a right triangle with horizontal leg 5 ft and vertical leg 6 ft. The base angle of the triangle is arctan(6/5) ≈ 50°. Since GD is the vertical side of the rectangle (90° from the horizontal base), ∠EGD = 90° − 50° ≈ 40°. The trap choice 50° is the triangle's base angle itself; read carefully which angle the question asks for relative to the rectangle.",
      "image": "/images/exams/geo-january-2026/q10.png",
      "difficulty": 2,
      "difficultyRationale": "Basic right triangle trigonometry application."
    },
    {
      "number": 11,
      "part": "A",
      "text": "Triangles ABC, A'B'C', and A''B''C'' are graphed on the set of axes below. Which sequence of transformations maps △ABC onto △A'B'C', and then maps △A'B'C' onto △A''B''C''?",
      "choices": [
        "a translation followed by a rotation",
        "a rotation followed by a translation",
        "a line reflection followed by a rotation",
        "a translation followed by a line reflection"
      ],
      "topic": "Transformations",
      "correct": 0,
      "explanation": "The first image preserves orientation and slides position (a translation), and the second turns the figure while preserving congruence (a rotation).",
      "diveDeep": "Identifying a sequence of transformations relies on tracking orientation (the order of labeled vertices) and position. A translation preserves orientation and merely shifts the figure; a rotation preserves congruence but turns it; a reflection reverses orientation (flips it like a mirror). Check whether vertex order stays clockwise/counterclockwise: if it never flips, no reflection occurred, eliminating the reflection choices. Compare corresponding vertices step by step to confirm slide vs. turn.",
      "image": "/images/exams/geo-january-2026/q11.png",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 12,
      "part": "A",
      "text": "A line contains the points (−1, −4) and (3, −1). An equation of a line perpendicular to this line is",
      "choices": [
        "y + 4 = ¾(x + 1)",
        "y − 1 = −¾(x + 3)",
        "y − 4 = 4⁄3(x − 1)",
        "y + 1 = −4⁄3(x − 3)"
      ],
      "topic": "Coordinate Geometry",
      "correct": 3,
      "explanation": "The given line has slope (−1 − (−4))/(3 − (−1)) = 3/4, so a perpendicular line must have the negative reciprocal slope −4/3, matching the last choice.",
      "diveDeep": "Perpendicular lines have slopes that are negative reciprocals (their product is −1). First find the slope of the given line: rise over run = 3/4. The perpendicular slope is −4/3. The trap choices keep the original slope 3/4 or use the wrong reciprocal; only the equation with slope −4/3 qualifies. Point-slope form y − y₁ = m(x − x₁) is being used, so focus on matching the slope rather than the point.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents coordinate geometry calculation."
    },
    {
      "number": 13,
      "part": "A",
      "text": "In the diagram below of right triangles DAY and NIT, AD = 6, DY = 6, IT = 16, and △DAY ∼ △NIT. The length of TN is",
      "choices": [
        "8",
        "8√2",
        "16√2",
        "32"
      ],
      "topic": "Right Triangles & Trig",
      "correct": 1,
      "explanation": "In right triangle DAY, hypotenuse DY corresponds to TN; since AD = DY = 6 the triangle is isosceles with the scale factor giving TN = 8√2.",
      "diveDeep": "Similar right triangles have proportional corresponding sides. With AD = 6 and DY = 6 in △DAY, and IT = 16 corresponding to a leg, the scale factor is determined by matching corresponding parts (the ratio is 16/6 reduced appropriately). The hypotenuse of the smaller triangle is 6√2, so the corresponding hypotenuse TN scales to 8√2. A common error is misidentifying which sides correspond — always match vertices in the similarity statement order (D↔N, A↔I, Y↔T).",
      "image": "/images/exams/geo-january-2026/q13.png",
      "difficulty": 2,
      "difficultyRationale": "Basic right triangle trigonometry application."
    },
    {
      "number": 14,
      "part": "A",
      "text": "The volume of a sphere is 333 cm³. To the nearest tenth of a centimeter, the diameter of the sphere is",
      "choices": [
        "4.3",
        "8.6",
        "5.2",
        "10.4"
      ],
      "topic": "Circles",
      "correct": 1,
      "explanation": "From V = (4/3)πr³ = 333, r³ = 333 × 3/(4π) ≈ 79.5, so r ≈ 4.3 cm and the diameter is 2r ≈ 8.6 cm.",
      "diveDeep": "Use the sphere volume formula V = (4/3)πr³ and solve for r by isolating r³ = 3V/(4π). Here r³ ≈ 79.5, so r ≈ 4.3 cm; the question asks for the diameter, which is twice the radius (≈ 8.6 cm). The trap choice 4.3 is the radius — read whether the problem wants radius or diameter. Take the cube root carefully and double at the end.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of circle properties."
    },
    {
      "number": 15,
      "part": "A",
      "text": "Line BTS is parallel to line MAVR, as shown in the diagram below, and AE ⊥ TV. If m∠STE = 38°, what is the measure of ∠VAE?",
      "choices": [
        "38°",
        "128°",
        "52°",
        "142°"
      ],
      "topic": "General",
      "correct": 1,
      "explanation": "Since AE ⊥ TV, ∠EAV is part of a right angle relationship; using the parallel lines and the 38° angle, ∠VAE = 90° + 38° = 128°.",
      "diveDeep": "When a transversal crosses parallel lines, alternate interior and corresponding angles are equal, and co-interior angles are supplementary. Combine the parallel-line angle relationships with the given perpendicular (AE ⊥ TV creates a 90° angle) to build ∠VAE. The 38° transfers via the parallel lines, then adds to the 90° from the perpendicular to give 128°. Carefully track which angle is being asked and whether to add or subtract the 90°.",
      "image": "/images/exams/geo-january-2026/q15.png",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 16,
      "part": "A",
      "text": "Segment RAZ has endpoints with coordinates R(6, 6) and Z(−12, −3). If A divides RZ such that RA:AZ = 5:4, then the coordinates of A are",
      "choices": [
        "(−6, 0)",
        "(0, 3)",
        "(−2, 2)",
        "(−4, 1)"
      ],
      "topic": "Coordinate Geometry",
      "correct": 3,
      "explanation": "Using the section formula, A = R + (5/9)(Z − R) = (6 + (5/9)(−18), 6 + (5/9)(−9)) = (−4, 1).",
      "diveDeep": "To find a point dividing a segment in ratio m:n from R toward Z, use A = R + (m/(m+n))(Z − R). Here m:n = 5:4, so the fraction is 5/9 of the way from R to Z. Compute each coordinate separately: x = 6 + (5/9)(−18) = −4 and y = 6 + (5/9)(−9) = 1. A common trap is reversing the ratio direction (going from Z to R) — anchor at the first-named endpoint R and move toward Z.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents coordinate geometry calculation."
    },
    {
      "number": 17,
      "part": "A",
      "text": "In △ABC below, points D and E are on AB and CB respectively, such that DE ∥ AC. If BD = 9, DA = 3, and EC = 4, what is the length of BC?",
      "choices": [
        "10",
        "14",
        "12",
        "16"
      ],
      "topic": "Similarity & Proof",
      "correct": 3,
      "explanation": "By the Side-Splitter Theorem, BD/DA = BE/EC, so 9/3 = BE/4 gives BE = 12, and BC = BE + EC = 12 + 4 = 16.",
      "diveDeep": "A line parallel to one side of a triangle divides the other two sides proportionally (the Side-Splitter Theorem): BD/DA = BE/EC. Solving 9/3 = BE/4 yields BE = 12. The question asks for the full side BC, so add EC: BC = 12 + 4 = 16. The trap answer 12 stops at BE — remember BC is the entire side, not just the upper segment. Set up the proportion with matching segments on the same sides.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 18,
      "part": "A",
      "text": "Triangle ABC is mapped onto △A'B'C' after a sequence of rigid motions. Which statement is always true?",
      "choices": [
        "Segment AB is parallel to segment A'B'.",
        "Segment AB is congruent to segment A'B'.",
        "The measure of angle A is the same as the measure of angle B'.",
        "The orientation of △ABC is the same as the orientation of △A'B'C'."
      ],
      "topic": "Triangles & Congruence",
      "correct": 1,
      "explanation": "Rigid motions preserve distance, so corresponding segments are always congruent: AB ≅ A′B′.",
      "diveDeep": "Rigid motions (translations, rotations, reflections) preserve length and angle measure, guaranteeing the image is congruent to the pre-image — so AB ≅ A′B′ always holds. Parallelism (AB ∥ A′B′) fails for rotations and reflections; matching A to B′ confuses corresponding parts (A corresponds to A′, not B′); and orientation reverses under reflection. Focus on the invariants of isometries: distance and angle measure, hence congruence of corresponding parts.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 19,
      "part": "A",
      "text": "What are the coordinates of the center and the length of the radius of the circle whose equation is x² − 16x + y² + 20y = −155?",
      "choices": [
        "center (8, −10) and radius 9",
        "center (−8, 10) and radius 9",
        "center (8, −10) and radius 3",
        "center (−8, 10) and radius 3"
      ],
      "topic": "Circles",
      "correct": 2,
      "explanation": "Completing the square gives (x − 8)² + (y + 10)² = −155 + 64 + 100 = 9, so the center is (8, −10) and the radius is √9 = 3.",
      "diveDeep": "To convert general form to center-radius form, complete the square on x and y separately. Half of −16 is −8, squared is 64; half of 20 is 10, squared is 100; add both to each side: −155 + 64 + 100 = 9. So (x − 8)² + (y + 10)² = 9, giving center (8, −10) and radius √9 = 3. Two classic traps: forgetting to take the square root of the right side (using 9 as the radius) and mishandling the sign of the center coordinates.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of circle properties."
    },
    {
      "number": 20,
      "part": "A",
      "text": "State populations and land areas from the 2020 US Census are shown in the table below. Connecticut: population 3,605,944, land area 4,842 mi²; New Jersey: population 9,288,994, land area 7,354 mi²; New York: population 20,201,249, land area 47,126 mi²; Pennsylvania: population 13,002,700, land area 44,743 mi². Which list shows the state population densities, in order from smallest to largest?",
      "choices": [
        "Pennsylvania, New York, Connecticut, New Jersey",
        "Connecticut, New Jersey, Pennsylvania, New York",
        "New York, Pennsylvania, New Jersey, Connecticut",
        "New Jersey, Connecticut, New York, Pennsylvania"
      ],
      "topic": "Area & Volume",
      "correct": 0,
      "explanation": "Density = population ÷ land area: PA ≈ 291, NY ≈ 429, CT ≈ 745, NJ ≈ 1263 people/mi², ordered smallest to largest as Pennsylvania, New York, Connecticut, New Jersey.",
      "diveDeep": "Population density is a rate found by dividing population by land area. Compute each: PA 13,002,700/44,743 ≈ 291; NY 20,201,249/47,126 ≈ 429; CT 3,605,944/4,842 ≈ 745; NJ 9,288,994/7,354 ≈ 1263. A trap is ordering by population or area alone — density combines both, so a small dense state (NJ) outranks a large populous one (NY). This models the Regents emphasis on density as mass/volume or count/area; always divide and then sort.",
      "image": "/images/exams/geo-january-2026/q20.png",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 21,
      "part": "A",
      "text": "Line t is represented by the equation y = 2x − 1. If the line is dilated by a scale factor of 3 centered at the origin, which equation represents the image of line t after the dilation?",
      "choices": [
        "y = 2x − 3",
        "y = 2x − 1",
        "y = 6x − 3",
        "y = 6x − 1"
      ],
      "topic": "Similarity & Proof",
      "correct": 0,
      "explanation": "A dilation preserves slope but scales the y-intercept by the factor 3, so the image is y = 2x − 3 (since the line does not pass through the center, it moves parallel to itself).",
      "diveDeep": "Dilating a line not through the center of dilation produces a parallel image: the slope stays the same and the y-intercept multiplies by the scale factor. Here slope 2 is unchanged, and the intercept −1 becomes −1 × 3 = −3, giving y = 2x − 3. The trap choices change the slope to 6 — but dilation never alters slope (parallelism is preserved). If a line passes through the center of dilation, it maps onto itself entirely.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 22,
      "part": "A",
      "text": "Quadrilateral ABCD is a parallelogram. Which additional statement is sufficient to prove ABCD is a rhombus?",
      "choices": [
        "AC ≅ BD",
        "AB ≅ BC",
        "AD ∥ BC",
        "∠ADC ≅ ∠ABC"
      ],
      "topic": "Triangles & Congruence",
      "correct": 1,
      "explanation": "A parallelogram with two consecutive sides congruent (AB ≅ BC) must have all four sides congruent, which defines a rhombus.",
      "diveDeep": "A rhombus is a parallelogram with all sides congruent; since opposite sides of a parallelogram are already congruent, proving one pair of consecutive sides congruent (AB ≅ BC) forces all four equal. Congruent diagonals (AC ≅ BD) would prove a rectangle, not a rhombus. Properties like AD ∥ BC and ∠ADC ≅ ∠ABC are already true of every parallelogram and add nothing. Identify which extra condition uniquely upgrades the parallelogram to the target shape.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 23,
      "part": "A",
      "text": "In right triangle ABC below, m∠ABC = 90°, and BD ⊥ AC. If AD = 3 and CD = 12, the length of AB is",
      "choices": [
        "6",
        "5√3",
        "9",
        "3√5"
      ],
      "topic": "Right Triangles & Trig",
      "correct": 3,
      "explanation": "By the geometric mean (leg) relationship, AB² = AD × AC = 3 × 15 = 45, so AB = √45 = 3√5.",
      "diveDeep": "When the altitude is drawn to the hypotenuse of a right triangle, each leg is the geometric mean between the whole hypotenuse and the segment adjacent to that leg: AB² = AD × AC. Here AC = AD + CD = 3 + 12 = 15, so AB² = 3 × 15 = 45 and AB = √45 = 3√5. A common trap is using BD² = AD × CD (the altitude relationship) instead of the leg relationship — match the leg to its adjacent hypotenuse segment, not the two segments to each other.",
      "difficulty": 2,
      "difficultyRationale": "Basic right triangle trigonometry application."
    },
    {
      "number": 24,
      "part": "A",
      "text": "In △GBT shown below, GXM, BXR, and TXE are drawn such that point X is the centroid. Which statement is always true?",
      "choices": [
        "MX + GX = 5",
        "BX = 2RX",
        "TX − EX = 1",
        "TM = TR"
      ],
      "topic": "Triangles & Congruence",
      "correct": 1,
      "explanation": "The centroid divides each median in a 2:1 ratio from vertex to midpoint, so BX = 2RX.",
      "diveDeep": "The centroid is the intersection of a triangle's three medians and divides each median so the portion from the vertex is twice the portion to the opposite midpoint (a 2:1 ratio). With BR a median, BX (vertex side) = 2 × RX (midpoint side). The other choices use arbitrary numerical relationships that need not hold. Memorize the centroid's defining 2:1 partition and that medians connect a vertex to the midpoint of the opposite side.",
      "image": "/images/exams/geo-january-2026/q24.png",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 25,
      "part": "B",
      "type": "written",
      "text": "A cylindrical bucket has an inside diameter of 10 inches and a height of 15 inches. If the topsoil weighs 0.0231 pound per cubic inch, determine and state the weight of the topsoil in the bucket when the bucket is full, to the nearest pound.",
      "topic": "3D Geometry & Volume",
      "explanation": "Find the volume of the cylinder using V = πr²h, then multiply by the weight density to get the total weight.",
      "diveDeep": "Radius = diameter/2 = 10/2 = 5 inches. V = π(5²)(15) = π(25)(15) = 375π ≈ 1178.1 in³. Weight = 1178.1 × 0.0231 ≈ 27.21 ≈ 27 pounds. Using the diameter (10) instead of the radius (5) in the formula — giving V = π(10²)(15) — quadruples the volume and is the most common error. Also, keep π in the calculation until the final step to preserve accuracy before rounding.",
      "modelAnswer": "r = 10/2 = 5 inches\nV = πr²h = π(5²)(15) = 375π ≈ 1178.097 in³\nWeight = 1178.097 × 0.0231 ≈ 27.21 ≈ 27 pounds",
      "difficulty": 3,
      "difficultyRationale": "Standard constructed-response calculation."
    },
    {
      "number": 26,
      "part": "B",
      "type": "written",
      "text": "In right triangle SRT, m∠R = 90°, m∠S = 27°, and ST = 31.8. Determine and state the length of SR, to the nearest tenth.",
      "topic": "Right Triangles & Trig",
      "explanation": "Since ∠R = 90° and ∠S = 27°, SR is adjacent to angle S and ST is the hypotenuse, so cos(27°) = SR/ST; SR = 31.8 × cos(27°).",
      "diveDeep": "In right triangle SRT with ∠R = 90°: ST is the hypotenuse (opposite the right angle), SR is the leg adjacent to ∠S, and RT is the leg opposite ∠S. Using cosine: cos(27°) = adjacent/hypotenuse = SR/31.8, so SR = 31.8 cos(27°) ≈ 31.8 × 0.8910 ≈ 28.3. A common error is using sin instead of cos (sin(27°) gives RT, not SR). Draw and label the triangle first to clearly identify which trig ratio applies to each side.",
      "modelAnswer": "cos(27°) = SR/ST = SR/31.8\nSR = 31.8 × cos(27°) ≈ 31.8 × 0.8910 ≈ 28.3",
      "difficulty": 3,
      "difficultyRationale": "Standard constructed-response calculation."
    },
    {
      "number": 27,
      "part": "B",
      "type": "written",
      "text": "In △LET, LE = 7.5, ET = 9.3, and m∠LET = 115°. Determine and state the area of △LET, to the nearest tenth.",
      "topic": "Triangles & Congruence",
      "explanation": "Use the area formula for a triangle given two sides and the included angle: Area = (1/2)(LE)(ET)sin(∠LET).",
      "diveDeep": "The two-sides-and-included-angle area formula is Area = (1/2)ab sin(C), where a and b are the two known sides and C is the angle between them. Here a = LE = 7.5, b = ET = 9.3, and C = 115°. Area = (1/2)(7.5)(9.3)sin(115°) = (1/2)(69.75)(0.9063) ≈ (1/2)(63.21) ≈ 31.6 square units. sin(115°) = sin(180° − 115°) = sin(65°) ≈ 0.9063 since 115° is obtuse — failing to account for the obtuse angle (e.g., using sin(65°) directly) still works because of this identity, but confusing 115° with 65° by miscalculating is a common slip.",
      "modelAnswer": "Area = (1/2)(LE)(ET)sin(∠LET)\n= (1/2)(7.5)(9.3)sin(115°)\n= (1/2)(69.75)(0.9063)\n≈ (1/2)(63.21)\n≈ 31.6 square units",
      "difficulty": 3,
      "difficultyRationale": "Standard constructed-response calculation."
    },
    {
      "number": 28,
      "part": "B",
      "type": "written",
      "text": "A pool owner has a circular deck that surrounds her circular pool. The pool has a diameter of 24 feet. The distance from the edge of the pool to the outer edge of the deck is 8 feet. Determine and state the number of square feet of the deck, to the nearest square foot.",
      "topic": "Circles",
      "explanation": "The deck area is the area of the large circle (pool + deck) minus the area of the pool: π(20²) − π(12²).",
      "diveDeep": "Pool radius = 24/2 = 12 ft. Outer radius = 12 + 8 = 20 ft. Deck area = π(20²) − π(12²) = 400π − 144π = 256π ≈ 804.25 ≈ 804 ft². The ring (annulus) area formula is π(R² − r²) where R is the outer radius and r is the inner radius. A common error is adding 8 to the diameter instead of the radius when computing the outer circle, giving radius 20 correctly but sometimes students use diameter 24 + 8 = 32 as the outer diameter (radius 16) incorrectly.",
      "modelAnswer": "Pool radius = 24/2 = 12 ft\nOuter radius = 12 + 8 = 20 ft\nDeck area = π(20²) − π(12²) = 400π − 144π = 256π ≈ 804 ft²",
      "difficulty": 3,
      "difficultyRationale": "Standard constructed-response calculation."
    },
    {
      "number": 29,
      "image": "/images/exams/geo-january-2026/q29.png",
      "part": "B",
      "type": "written",
      "text": "Use a compass and straightedge to construct an equilateral triangle with AB, shown below, as one of the sides. [Leave all construction marks.]",
      "topic": "Constructions",
      "explanation": "Set the compass to the length AB, draw arcs of the same radius from both A and B, and connect the intersection point to A and B to complete the equilateral triangle.",
      "diveDeep": "An equilateral triangle has all three sides equal to the given segment AB. Set the compass width equal to AB. From point A, draw a wide arc above the segment. From point B with the same compass width, draw another arc. The two arcs intersect at point C. Connect A to C and B to C with straight lines — all three sides AB = AC = BC = AB, forming the equilateral triangle. The compass width must not be changed between the two arcs; even a small adjustment makes the triangle non-equilateral and earns no credit.",
      "modelAnswer": "1. Set compass width equal to the length of AB.\n2. Place compass point at A; draw an arc above AB.\n3. Without changing the compass width, place compass point at B; draw another arc intersecting the first — label the intersection C.\n4. Draw segments AC and BC with a straightedge.\n5. △ABC is equilateral with AB = AC = BC.\n[Leave all construction arcs visible.]",
      "difficulty": 3,
      "difficultyRationale": "Standard constructed-response geometric construction."
    },
    {
      "number": 30,
      "part": "B",
      "type": "written",
      "text": "In the diagram below, right triangle ABC is inscribed in the circle with right angle ABC. Explain why AC must be a diameter of the circle.",
      "topic": "Circles",
      "explanation": "By the Inscribed Angle Theorem, an inscribed angle is half the intercepted arc; ∠ABC = 90° intercepts arc AC, so arc AC = 180°, meaning AC is a diameter.",
      "diveDeep": "The Inscribed Angle Theorem states: the measure of an inscribed angle equals half the measure of its intercepted arc. ∠ABC is inscribed in the circle and equals 90°, so the intercepted arc AC = 2 × 90° = 180°. An arc of 180° is a semicircle, which means AC is a diameter (a chord that passes through the center, dividing the circle into two semicircles). The converse (Thales' Theorem) is equally useful to cite: any angle inscribed in a semicircle is a right angle. Answers that say \"AC looks like it goes through the center\" without citing the Inscribed Angle Theorem earn no credit.",
      "modelAnswer": "Since ∠ABC is an inscribed angle that intercepts arc AC:\nm(arc AC) = 2 × m∠ABC = 2 × 90° = 180°\nAn arc of 180° is a semicircle.\nA chord that subtends a semicircle must pass through the center, so AC is a diameter of the circle.",
      "difficulty": 3,
      "difficultyRationale": "Standard constructed-response calculation."
    },
    {
      "number": 31,
      "part": "B",
      "type": "written",
      "text": "In isosceles triangle ABC, AD is an altitude drawn to base BC. If m∠BAC = 80° and AD = 8, determine and state the perimeter of △ABC, to the nearest tenth.",
      "topic": "Triangles & Congruence",
      "explanation": "The altitude to the base of an isosceles triangle bisects the vertex angle, creating two congruent right triangles; use trigonometry to find the legs AB and the half-base BD.",
      "diveDeep": "Since △ABC is isosceles with the altitude AD to the base, AD bisects ∠BAC: ∠BAD = 40°. In right △ABD: tan(40°) = BD/AD → BD = 8 tan(40°) ≈ 6.713. So BC = 2 × BD ≈ 13.426. Also cos(40°) = AD/AB → AB = 8/cos(40°) ≈ 10.443. Perimeter = AB + AB + BC ≈ 10.443 + 10.443 + 13.426 ≈ 34.3. Note that ∠BAD = 40° because the full vertex angle is 80° and the altitude bisects it. A common error is using the full 80° angle in the right triangle instead of the half-angle 40°.",
      "modelAnswer": "∠BAD = 80°/2 = 40° (altitude bisects vertex angle in isosceles △)\n\nIn right △ABD:\ntan(40°) = BD/AD → BD = 8 tan(40°) ≈ 6.713\nBC = 2 × BD ≈ 13.426\n\ncos(40°) = AD/AB → AB = 8/cos(40°) ≈ 10.443\n\nPerimeter = AB + AB + BC ≈ 10.443 + 10.443 + 13.426 ≈ 34.3",
      "difficulty": 3,
      "difficultyRationale": "Standard constructed-response calculation."
    },
    {
      "number": 32,
      "part": "C",
      "type": "written",
      "text": "In quadrilateral SMIL, diagonals IS and ML intersect at point E, MS ∥ IL, and MS ≅ IL. Prove: △MIE ≅ △LSE.",
      "topic": "Triangles & Congruence",
      "explanation": "With MS ∥ IL, alternate interior angles are congruent; with MS ≅ IL, use AAS or ASA to prove the triangles congruent.",
      "diveDeep": "MS ∥ IL gives: ∠MIS ≅ ∠LIS... more precisely, with transversals IS and ML, ∠IMS ≅ ∠SLI (alternate interior angles, MS ∥ IL cut by ML) and ∠MIS ≅ ∠LSI (alternate interior angles, MS ∥ IL cut by IS). MS ≅ IL (given). By AAS: ∠IMS ≅ ∠ILS, MS ≅ IL, ∠MSI ≅ ∠LIS → △MIE ≅ △LSE. Alternatively, use ASA with ∠MIE ≅ ∠LSE, IE... careful labeling of which angles and sides correspond is essential for full credit.",
      "modelAnswer": "Statements | Reasons\n1. MS ∥ IL | Given\n2. MS ≅ IL | Given\n3. ∠IMS ≅ ∠LIS | Alternate interior angles (MS ∥ IL, transversal ML... wait — transversal MI)\n   ∠MIS ≅ ∠LSI | Alternate interior angles (MS ∥ IL, transversal IS)\n4. In △MIE and △LSE:\n   ∠EMI ≅ ∠ELS | Alternate interior angles (step 3)\n   MS ≅ IL | Given (step 2)\n   ∠MSI ≅ ∠LIS | Alternate interior angles (step 3)\n5. △MIE ≅ △LSE | AAS (two pairs of angles and the non-included side MS ≅ IL)",
      "difficulty": 4,
      "difficultyRationale": "Challenging constructed-response geometric proof."
    },
    {
      "number": 33,
      "part": "C",
      "type": "written",
      "text": "A solid glass trophy is composed of a rectangular prism and a rectangular pyramid. The rectangular prism has a length of 12 cm, a width of 6 cm, and a height of 3 cm. The height of the pyramid is 10 cm. If the density of glass is 2.5 grams per cubic centimeter, determine and state the mass of the trophy, in grams.",
      "topic": "3D Geometry & Volume",
      "explanation": "Compute the volume of both solids (prism + pyramid, sharing the same rectangular base), add them, and multiply by the density to find the mass.",
      "diveDeep": "V_prism = l × w × h = 12 × 6 × 3 = 216 cm³. The pyramid sits on the same 12 × 6 base: V_pyramid = (1/3)(12 × 6)(10) = (1/3)(720) = 240 cm³. Total volume = 216 + 240 = 456 cm³. Mass = 456 × 2.5 = 1140 grams. The two most common errors: forgetting the 1/3 factor in the pyramid volume (giving 720 instead of 240), and using the wrong base dimensions for the pyramid (the pyramid shares the prism's top face, so its base is also 12 × 6).",
      "modelAnswer": "V_prism = 12 × 6 × 3 = 216 cm³\nV_pyramid = (1/3)(12 × 6)(10) = (1/3)(720) = 240 cm³\nTotal volume = 216 + 240 = 456 cm³\nMass = 456 × 2.5 = 1140 grams",
      "difficulty": 4,
      "difficultyRationale": "Challenging constructed-response multi-step application or modeling."
    },
    {
      "number": 34,
      "part": "C",
      "type": "written",
      "text": "Quadrilateral ABCD has vertices A(−3, 1), B(−3, −7), C(6, 5), and D(0, 5). Segment EF has endpoints E(−3, −3) and F(3, 5). Prove ABCD is a trapezoid. Use coordinate geometry to prove EF is parallel to AD and BC. Is EF = (1/2)(AD + BC)? Use coordinate geometry to justify your answer.",
      "topic": "Coordinate Geometry",
      "explanation": "Compute slopes to show exactly one pair of opposite sides of ABCD is parallel (making it a trapezoid), then verify EF's slope matches, and compare lengths to check the midsegment formula.",
      "diveDeep": "Slope of AD: (5−1)/(0−(−3)) = 4/3. Slope of BC: (5−(−7))/(6−(−3)) = 12/9 = 4/3. Slope of AB: (−7−1)/(−3−(−3)) = undefined (vertical). Slope of DC: (5−5)/(6−0) = 0 (horizontal). Since AD ∥ BC (same slope 4/3) but AB is not parallel to DC (vertical vs. horizontal), ABCD is a trapezoid. Slope of EF = (5−(−3))/(3−(−3)) = 8/6 = 4/3 = slope of AD and BC, so EF ∥ AD ∥ BC. AD = √((0−(−3))² + (5−1)²) = √(9+16) = 5. BC = √((6−(−3))² + (5−(−7))²) = √(81+144) = √225 = 15. EF = √((3−(−3))² + (5−(−3))²) = √(36+64) = √100 = 10. (1/2)(AD + BC) = (1/2)(5+15) = 10 = EF ✓. EF is the midsegment.",
      "modelAnswer": "Part 1 — Prove ABCD is a trapezoid:\nSlope AD = (5−1)/(0−(−3)) = 4/3\nSlope BC = (5−(−7))/(6−(−3)) = 12/9 = 4/3\nAD ∥ BC (equal slopes)\n\nSlope AB = (−7−1)/(−3−(−3)) = undefined (vertical)\nSlope DC = (5−5)/(6−0) = 0 (horizontal)\nAB is not parallel to DC.\n\nExactly one pair of opposite sides is parallel → ABCD is a trapezoid.\n\nPart 2 — EF ∥ AD and BC:\nSlope EF = (5−(−3))/(3−(−3)) = 8/6 = 4/3\nSince slope EF = slope AD = slope BC = 4/3, EF ∥ AD ∥ BC.\n\nPart 3 — Is EF = (1/2)(AD + BC)?\nAD = √((0+3)² + (5−1)²) = √(9+16) = 5\nBC = √((6+3)² + (5+7)²) = √(81+144) = 15\nEF = √((3+3)² + (5+3)²) = √(36+64) = 10\n(1/2)(AD + BC) = (1/2)(5+15) = 10 = EF ✓\nYes, EF = (1/2)(AD + BC).",
      "difficulty": 5,
      "difficultyRationale": "Part IV constructed-response full coordinate or abstract proof."
    },
    {
      "number": 35,
      "part": "D",
      "type": "written",
      "text": "Quadrilateral ABCD has vertices A(−3, 1), B(−3, −7), C(6, 5), and D(0, 5). Segment EF has endpoints E(−3, −3) and F(3, 5). Prove ABCD is a trapezoid. Prove EF is parallel to AD and BC. Determine whether EF = (1/2)(AD + BC) using coordinate geometry.",
      "topic": "Coordinate Geometry",
      "explanation": "This 6-credit question requires proving the trapezoid, proving EF is a midsegment (parallel to the bases), and confirming the midsegment length formula EF = (1/2)(AD + BC).",
      "diveDeep": "A full 6-credit response must address all three parts with justified coordinate calculations. Trapezoid: show exactly one pair of opposite sides parallel (AD ∥ BC but AB not parallel to DC). EF parallel: compute slope of EF and compare to slopes of AD and BC. Midsegment formula: compute all three lengths using the distance formula and verify (1/2)(5 + 15) = 10 = EF. Organize the work clearly, labeling each part. Losing points on this question usually comes from incomplete justification — computing lengths or slopes without explicitly stating the conclusion drawn from each calculation.",
      "modelAnswer": "Trapezoid proof:\nSlope AD = 4/3, Slope BC = 4/3 → AD ∥ BC\nSlope AB = undefined, Slope DC = 0 → AB not ∥ DC\n→ Exactly one pair parallel → ABCD is a trapezoid.\n\nEF ∥ AD and BC:\nSlope EF = (5−(−3))/(3−(−3)) = 8/6 = 4/3 = slope AD = slope BC ✓\n\nMidsegment check:\nAD = √(3² + 4²) = √25 = 5\nBC = √(9² + 12²) = √(81+144) = √225 = 15\nEF = √(6² + 8²) = √(36+64) = √100 = 10\n(1/2)(AD + BC) = (1/2)(20) = 10 = EF ✓\nYes, EF satisfies the midsegment theorem.",
      "difficulty": 5,
      "difficultyRationale": "Part IV constructed-response full coordinate or abstract proof."
    }
  ]
}
