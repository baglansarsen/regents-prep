// Geometry Regents — January 2026
export default {
  id: 'geo-jan-2026',
  subject: 'geometry',
  year: 2026,
  session: 'January',
  totalMinutes: 180,
  questions: [
    {
      number: 1,
      part: 'A',
      text: 'In the diagram below, lines m and n intersect at point P. If the measure of one of the angles formed is 65°, what is the measure of its vertical angle?',
      choices: ['25°', '65°', '115°', '130°'],
      topic: 'General',
      correct: 1,
      explanation: 'Vertical angles are formed by two intersecting lines and are always congruent, so the vertical angle also measures 65°.',
      diveDeep: 'Vertical angles are the non-adjacent angles formed when two lines cross; they are always equal in measure. A common trap is confusing vertical angles with linear-pair (supplementary) angles — the 115° choice is the supplement (180° − 65°). On the exam, identify whether two angles share a vertex but no side (vertical, equal) or share a side and form a straight line (linear pair, sum to 180°). Always sketch and label the relationship before computing.'
    },
    {
      number: 2,
      part: 'A',
      text: 'Which transformation does NOT always preserve distance?',
      choices: ['a translation', 'a rotation', 'a line reflection', 'a dilation'],
      topic: 'Transformations',
      correct: 3,
      explanation: 'A dilation changes the size of a figure by a scale factor, so it does not preserve distance unless the scale factor is 1.',
      diveDeep: 'Translations, rotations, and reflections are rigid motions (isometries) that preserve both distance and angle measure, so the image is always congruent to the pre-image. A dilation preserves angle measure and shape but multiplies all lengths by the scale factor, producing a similar (not congruent) figure. A frequent error is assuming dilations preserve everything — remember that only when k = 1 is a dilation an isometry. Know the difference between congruence-preserving rigid motions and similarity-preserving dilations.'
    },
    {
      number: 3,
      part: 'A',
      text: 'A regular hexagon is rotated about its center. The minimum number of degrees needed to carry the hexagon onto itself is',
      choices: ['30°', '45°', '60°', '72°'],
      topic: 'Transformations',
      correct: 2,
      explanation: 'A regular hexagon has 6-fold rotational symmetry, so the smallest rotation that maps it onto itself is 360° ÷ 6 = 60°.',
      diveDeep: 'For any regular n-sided polygon, the minimum rotation that carries it onto itself is 360°/n. A hexagon has n = 6, giving 60°. The trap choice 72° is the answer for a pentagon (360/5), and 45° corresponds to an octagon (360/8). On the exam, count the sides carefully and divide 360 by that number; multiples of that smallest angle also work, but the question asks for the minimum.'
    },
    {
      number: 4,
      part: 'A',
      text: 'A right triangle has legs of 4 cm and 7 cm. When the triangle is rotated continuously about the leg measuring 4 cm, the solid formed is',
      choices: [
        'a cone with a height of 4 cm and a radius of 7 cm',
        'a cone with a height of 4 cm and a radius of 14 cm',
        'a pyramid with a height of 4 cm and a base length of 7 cm',
        'a pyramid with a height of 4 cm and a base length of 14 cm'
      ],
      topic: 'Area & Volume',
      correct: 0,
      explanation: 'Rotating a right triangle 360° about one leg sweeps out a cone whose height equals that leg (4 cm) and whose radius equals the other leg (7 cm).',
      diveDeep: 'Rotating a 2-D figure about an axis generates a 3-D solid of revolution. A right triangle spun about a leg always produces a cone: the leg on the axis becomes the height, and the perpendicular leg becomes the radius of the circular base. A common trap is doubling the leg to 14 cm (treating it as a diameter) — the radius equals the leg itself, not twice it. Visualize the path the far vertex traces as it spins; that circle is the base.'
    },
    {
      number: 5,
      part: 'A',
      text: 'Which equation represents a circle with center (−3, 5) and a radius of 4?',
      choices: [
        '(x − 3)² + (y + 5)² = 16',
        '(x + 3)² + (y − 5)² = 16',
        '(x − 3)² + (y + 5)² = 4',
        '(x + 3)² + (y − 5)² = 4'
      ],
      topic: 'Circles',
      correct: 1,
      explanation: 'The standard form is (x − h)² + (y − k)² = r², so center (−3, 5) gives (x + 3)² + (y − 5)² and r² = 4² = 16.',
      diveDeep: 'In the equation (x − h)² + (y − k)² = r², the center is (h, k) and the right side is the radius squared, not the radius. The signs flip: a center x-coordinate of −3 appears as (x + 3). The classic traps here are forgetting to square the radius (using 4 instead of 16) and mishandling the negative sign of the center. Always double-check both the sign reversal and the squaring of the radius.'
    },
    {
      number: 6,
      part: 'A',
      text: 'Triangle DEF is similar to triangle JKL with a scale factor of 2:3. If the area of triangle DEF is 20 square units, what is the area of triangle JKL?',
      choices: ['30', '45', '13.3', '40'],
      topic: 'Similarity & Proof',
      correct: 1,
      explanation: 'Areas of similar figures scale by the square of the linear scale factor, so (3/2)² × 20 = 9/4 × 20 = 45 square units.',
      diveDeep: 'When two figures are similar with linear ratio a:b, their areas are in ratio a²:b² and their volumes in ratio a³:b³. Here the linear ratio 2:3 gives an area ratio 4:9, so the larger triangle has area 20 × 9/4 = 45. A common mistake is multiplying area by the linear factor (3/2) instead of its square. Always square the scale factor for area and cube it for volume.'
    },
    {
      number: 7,
      part: 'A',
      text: 'A right triangle has legs of 4 cm and 14 cm. When the triangle is rotated continuously about the leg measuring 4 cm, the solid formed is',
      choices: [
        'a cone with a height of 4 cm and a radius of 7 cm',
        'a cone with a height of 4 cm and a radius of 14 cm',
        'a pyramid with a height of 4 cm and a base length of 7 cm',
        'a pyramid with a height of 4 cm and a base length of 14 cm'
      ],
      topic: 'Area & Volume',
      correct: 1,
      explanation: 'Rotating the right triangle about the 4 cm leg produces a cone whose height is 4 cm and whose radius equals the other leg, 14 cm.',
      diveDeep: 'A solid of revolution from a right triangle spun about one of its legs is always a cone, with that leg as the height and the perpendicular leg as the radius. The trap of halving 14 to 7 (treating it as a diameter) is wrong — the radius equals the full perpendicular leg. Picture the far vertex tracing a circle of radius 14 as the triangle sweeps a full turn.'
    },
    {
      number: 8,
      part: 'A',
      text: 'In a circle with a radius of 32 cm, a central angle measures 140°. What is the length of the arc AB it intercepts, to the nearest centimeter?',
      choices: ['10', '50', '64', '78'],
      topic: 'Circles',
      correct: 3,
      explanation: 'Arc length = (central angle/360°) × 2πr = (140/360) × 2π(32) ≈ 78 cm.',
      diveDeep: 'Arc length is a fraction of the full circumference, where the fraction is the central angle over 360°. Compute (140/360) × 2π × 32 ≈ 0.3889 × 201.06 ≈ 78.2 cm. A frequent error is confusing arc length (a distance) with sector area (a region using πr²) — be sure to use circumference 2πr for arc length. Keep the calculator in degree mode and don\'t round until the end.'
    },
    {
      number: 9,
      part: 'A',
      text: 'In parallelogram ABCD, the diagonals AC and BD intersect at point E. Which statement must be true?',
      choices: [
        'AC ≅ BD',
        'AE ≅ EC',
        'AC ⊥ BD',
        'AB ≅ BC'
      ],
      topic: 'Triangles & Congruence',
      correct: 1,
      explanation: 'In any parallelogram the diagonals bisect each other, so E is the midpoint of AC, making AE ≅ EC.',
      diveDeep: 'A defining property of all parallelograms is that the diagonals bisect each other (each diagonal cuts the other in half). The traps describe properties of special parallelograms: congruent diagonals (AC ≅ BD) hold only for rectangles, perpendicular diagonals (AC ⊥ BD) only for rhombi, and adjacent congruent sides (AB ≅ BC) only for rhombi. Always distinguish properties that hold for every parallelogram from those reserved for rectangles, rhombi, or squares.'
    },
    {
      number: 10,
      part: 'A',
      text: 'The face of a shed is modeled below. The rectangular section of the face, BFGK, is 10 feet wide. The triangular section of the face, FEG, is an isosceles triangle with vertex angle FEG and a height of 6 feet. What is m∠EGD, to the nearest degree?',
      choices: ['34°', '50°', '40°', '56°'],
      topic: 'Right Triangles & Trig',
      correct: 2,
      explanation: 'Half the 10 ft base is 5 ft, so the base angle satisfies tan(∠EGF) = 6/5, giving about 50°; then ∠EGD = 90° − 50° ≈ 40°.',
      diveDeep: 'Drop the altitude of the isosceles triangle from E to the midpoint of FG, creating a right triangle with horizontal leg 5 ft and vertical leg 6 ft. The base angle of the triangle is arctan(6/5) ≈ 50°. Since GD is the vertical side of the rectangle (90° from the horizontal base), ∠EGD = 90° − 50° ≈ 40°. The trap choice 50° is the triangle\'s base angle itself; read carefully which angle the question asks for relative to the rectangle.',
      image: '/images/exams/geo-january-2026/q10.png'
    },
    {
      number: 11,
      part: 'A',
      text: "Triangles ABC, A'B'C', and A''B''C'' are graphed on the set of axes below. Which sequence of transformations maps △ABC onto △A'B'C', and then maps △A'B'C' onto △A''B''C''?",
      choices: [
        'a translation followed by a rotation',
        'a rotation followed by a translation',
        'a line reflection followed by a rotation',
        'a translation followed by a line reflection'
      ],
      topic: 'Transformations',
      correct: 0,
      explanation: 'The first image preserves orientation and slides position (a translation), and the second turns the figure while preserving congruence (a rotation).',
      diveDeep: 'Identifying a sequence of transformations relies on tracking orientation (the order of labeled vertices) and position. A translation preserves orientation and merely shifts the figure; a rotation preserves congruence but turns it; a reflection reverses orientation (flips it like a mirror). Check whether vertex order stays clockwise/counterclockwise: if it never flips, no reflection occurred, eliminating the reflection choices. Compare corresponding vertices step by step to confirm slide vs. turn.',
      image: '/images/exams/geo-january-2026/q11.png'
    },
    {
      number: 12,
      part: 'A',
      text: 'A line contains the points (−1, −4) and (3, −1). An equation of a line perpendicular to this line is',
      choices: [
        'y + 4 = ¾(x + 1)',
        'y − 1 = −¾(x + 3)',
        'y − 4 = 4⁄3(x − 1)',
        'y + 1 = −4⁄3(x − 3)'
      ],
      topic: 'Coordinate Geometry',
      correct: 3,
      explanation: 'The given line has slope (−1 − (−4))/(3 − (−1)) = 3/4, so a perpendicular line must have the negative reciprocal slope −4/3, matching the last choice.',
      diveDeep: 'Perpendicular lines have slopes that are negative reciprocals (their product is −1). First find the slope of the given line: rise over run = 3/4. The perpendicular slope is −4/3. The trap choices keep the original slope 3/4 or use the wrong reciprocal; only the equation with slope −4/3 qualifies. Point-slope form y − y₁ = m(x − x₁) is being used, so focus on matching the slope rather than the point.'
    },
    {
      number: 13,
      part: 'A',
      text: 'In the diagram below of right triangles DAY and NIT, AD = 6, DY = 6, IT = 16, and △DAY ∼ △NIT. The length of TN is',
      choices: ['8', '8√2', '16√2', '32'],
      topic: 'Right Triangles & Trig',
      correct: 1,
      explanation: 'In right triangle DAY, hypotenuse DY corresponds to TN; since AD = DY = 6 the triangle is isosceles with the scale factor giving TN = 8√2.',
      diveDeep: 'Similar right triangles have proportional corresponding sides. With AD = 6 and DY = 6 in △DAY, and IT = 16 corresponding to a leg, the scale factor is determined by matching corresponding parts (the ratio is 16/6 reduced appropriately). The hypotenuse of the smaller triangle is 6√2, so the corresponding hypotenuse TN scales to 8√2. A common error is misidentifying which sides correspond — always match vertices in the similarity statement order (D↔N, A↔I, Y↔T).',
      image: '/images/exams/geo-january-2026/q13.png'
    },
    {
      number: 14,
      part: 'A',
      text: 'The volume of a sphere is 333 cm³. To the nearest tenth of a centimeter, the diameter of the sphere is',
      choices: ['4.3', '8.6', '5.2', '10.4'],
      topic: 'Circles',
      correct: 1,
      explanation: 'From V = (4/3)πr³ = 333, r³ = 333 × 3/(4π) ≈ 79.5, so r ≈ 4.3 cm and the diameter is 2r ≈ 8.6 cm.',
      diveDeep: 'Use the sphere volume formula V = (4/3)πr³ and solve for r by isolating r³ = 3V/(4π). Here r³ ≈ 79.5, so r ≈ 4.3 cm; the question asks for the diameter, which is twice the radius (≈ 8.6 cm). The trap choice 4.3 is the radius — read whether the problem wants radius or diameter. Take the cube root carefully and double at the end.'
    },
    {
      number: 15,
      part: 'A',
      text: 'Line BTS is parallel to line MAVR, as shown in the diagram below, and AE ⊥ TV. If m∠STE = 38°, what is the measure of ∠VAE?',
      choices: ['38°', '128°', '52°', '142°'],
      topic: 'General',
      correct: 1,
      explanation: 'Since AE ⊥ TV, ∠EAV is part of a right angle relationship; using the parallel lines and the 38° angle, ∠VAE = 90° + 38° = 128°.',
      diveDeep: 'When a transversal crosses parallel lines, alternate interior and corresponding angles are equal, and co-interior angles are supplementary. Combine the parallel-line angle relationships with the given perpendicular (AE ⊥ TV creates a 90° angle) to build ∠VAE. The 38° transfers via the parallel lines, then adds to the 90° from the perpendicular to give 128°. Carefully track which angle is being asked and whether to add or subtract the 90°.',
      image: '/images/exams/geo-january-2026/q15.png'
    },
    {
      number: 16,
      part: 'A',
      text: 'Segment RAZ has endpoints with coordinates R(6, 6) and Z(−12, −3). If A divides RZ such that RA:AZ = 5:4, then the coordinates of A are',
      choices: ['(−6, 0)', '(0, 3)', '(−2, 2)', '(−4, 1)'],
      topic: 'Coordinate Geometry',
      correct: 3,
      explanation: 'Using the section formula, A = R + (5/9)(Z − R) = (6 + (5/9)(−18), 6 + (5/9)(−9)) = (−4, 1).',
      diveDeep: 'To find a point dividing a segment in ratio m:n from R toward Z, use A = R + (m/(m+n))(Z − R). Here m:n = 5:4, so the fraction is 5/9 of the way from R to Z. Compute each coordinate separately: x = 6 + (5/9)(−18) = −4 and y = 6 + (5/9)(−9) = 1. A common trap is reversing the ratio direction (going from Z to R) — anchor at the first-named endpoint R and move toward Z.'
    },
    {
      number: 17,
      part: 'A',
      text: 'In △ABC below, points D and E are on AB and CB respectively, such that DE ∥ AC. If BD = 9, DA = 3, and EC = 4, what is the length of BC?',
      choices: ['10', '14', '12', '16'],
      topic: 'Similarity & Proof',
      correct: 3,
      explanation: 'By the Side-Splitter Theorem, BD/DA = BE/EC, so 9/3 = BE/4 gives BE = 12, and BC = BE + EC = 12 + 4 = 16.',
      diveDeep: 'A line parallel to one side of a triangle divides the other two sides proportionally (the Side-Splitter Theorem): BD/DA = BE/EC. Solving 9/3 = BE/4 yields BE = 12. The question asks for the full side BC, so add EC: BC = 12 + 4 = 16. The trap answer 12 stops at BE — remember BC is the entire side, not just the upper segment. Set up the proportion with matching segments on the same sides.'
    },
    {
      number: 18,
      part: 'A',
      text: "Triangle ABC is mapped onto △A'B'C' after a sequence of rigid motions. Which statement is always true?",
      choices: [
        "Segment AB is parallel to segment A'B'.",
        "Segment AB is congruent to segment A'B'.",
        "The measure of angle A is the same as the measure of angle B'.",
        "The orientation of △ABC is the same as the orientation of △A'B'C'."
      ],
      topic: 'Triangles & Congruence',
      correct: 1,
      explanation: 'Rigid motions preserve distance, so corresponding segments are always congruent: AB ≅ A′B′.',
      diveDeep: 'Rigid motions (translations, rotations, reflections) preserve length and angle measure, guaranteeing the image is congruent to the pre-image — so AB ≅ A′B′ always holds. Parallelism (AB ∥ A′B′) fails for rotations and reflections; matching A to B′ confuses corresponding parts (A corresponds to A′, not B′); and orientation reverses under reflection. Focus on the invariants of isometries: distance and angle measure, hence congruence of corresponding parts.'
    },
    {
      number: 19,
      part: 'A',
      text: 'What are the coordinates of the center and the length of the radius of the circle whose equation is x² − 16x + y² + 20y = −155?',
      choices: [
        'center (8, −10) and radius 9',
        'center (−8, 10) and radius 9',
        'center (8, −10) and radius 3',
        'center (−8, 10) and radius 3'
      ],
      topic: 'Circles',
      correct: 2,
      explanation: 'Completing the square gives (x − 8)² + (y + 10)² = −155 + 64 + 100 = 9, so the center is (8, −10) and the radius is √9 = 3.',
      diveDeep: 'To convert general form to center-radius form, complete the square on x and y separately. Half of −16 is −8, squared is 64; half of 20 is 10, squared is 100; add both to each side: −155 + 64 + 100 = 9. So (x − 8)² + (y + 10)² = 9, giving center (8, −10) and radius √9 = 3. Two classic traps: forgetting to take the square root of the right side (using 9 as the radius) and mishandling the sign of the center coordinates.',
      image: '/images/exams/geo-january-2026/q19.png'
    },
    {
      number: 20,
      part: 'A',
      text: 'State populations and land areas from the 2020 US Census are shown in the table below. Connecticut: population 3,605,944, land area 4,842 mi²; New Jersey: population 9,288,994, land area 7,354 mi²; New York: population 20,201,249, land area 47,126 mi²; Pennsylvania: population 13,002,700, land area 44,743 mi². Which list shows the state population densities, in order from smallest to largest?',
      choices: [
        'Pennsylvania, New York, Connecticut, New Jersey',
        'Connecticut, New Jersey, Pennsylvania, New York',
        'New York, Pennsylvania, New Jersey, Connecticut',
        'New Jersey, Connecticut, New York, Pennsylvania'
      ],
      topic: 'Area & Volume',
      correct: 0,
      explanation: 'Density = population ÷ land area: PA ≈ 291, NY ≈ 429, CT ≈ 745, NJ ≈ 1263 people/mi², ordered smallest to largest as Pennsylvania, New York, Connecticut, New Jersey.',
      diveDeep: 'Population density is a rate found by dividing population by land area. Compute each: PA 13,002,700/44,743 ≈ 291; NY 20,201,249/47,126 ≈ 429; CT 3,605,944/4,842 ≈ 745; NJ 9,288,994/7,354 ≈ 1263. A trap is ordering by population or area alone — density combines both, so a small dense state (NJ) outranks a large populous one (NY). This models the Regents emphasis on density as mass/volume or count/area; always divide and then sort.',
      image: '/images/exams/geo-january-2026/q20.png'
    },
    {
      number: 21,
      part: 'A',
      text: 'Line t is represented by the equation y = 2x − 1. If the line is dilated by a scale factor of 3 centered at the origin, which equation represents the image of line t after the dilation?',
      choices: [
        'y = 2x − 3',
        'y = 2x − 1',
        'y = 6x − 3',
        'y = 6x − 1'
      ],
      topic: 'Similarity & Proof',
      correct: 0,
      explanation: 'A dilation preserves slope but scales the y-intercept by the factor 3, so the image is y = 2x − 3 (since the line does not pass through the center, it moves parallel to itself).',
      diveDeep: 'Dilating a line not through the center of dilation produces a parallel image: the slope stays the same and the y-intercept multiplies by the scale factor. Here slope 2 is unchanged, and the intercept −1 becomes −1 × 3 = −3, giving y = 2x − 3. The trap choices change the slope to 6 — but dilation never alters slope (parallelism is preserved). If a line passes through the center of dilation, it maps onto itself entirely.'
    },
    {
      number: 22,
      part: 'A',
      text: 'Quadrilateral ABCD is a parallelogram. Which additional statement is sufficient to prove ABCD is a rhombus?',
      choices: [
        'AC ≅ BD',
        'AB ≅ BC',
        'AD ∥ BC',
        '∠ADC ≅ ∠ABC'
      ],
      topic: 'Triangles & Congruence',
      correct: 1,
      explanation: 'A parallelogram with two consecutive sides congruent (AB ≅ BC) must have all four sides congruent, which defines a rhombus.',
      diveDeep: 'A rhombus is a parallelogram with all sides congruent; since opposite sides of a parallelogram are already congruent, proving one pair of consecutive sides congruent (AB ≅ BC) forces all four equal. Congruent diagonals (AC ≅ BD) would prove a rectangle, not a rhombus. Properties like AD ∥ BC and ∠ADC ≅ ∠ABC are already true of every parallelogram and add nothing. Identify which extra condition uniquely upgrades the parallelogram to the target shape.'
    },
    {
      number: 23,
      part: 'A',
      text: 'In right triangle ABC below, m∠ABC = 90°, and BD ⊥ AC. If AD = 3 and CD = 12, the length of AB is',
      choices: ['6', '5√3', '9', '3√5'],
      topic: 'Right Triangles & Trig',
      correct: 3,
      explanation: 'By the geometric mean (leg) relationship, AB² = AD × AC = 3 × 15 = 45, so AB = √45 = 3√5.',
      diveDeep: 'When the altitude is drawn to the hypotenuse of a right triangle, each leg is the geometric mean between the whole hypotenuse and the segment adjacent to that leg: AB² = AD × AC. Here AC = AD + CD = 3 + 12 = 15, so AB² = 3 × 15 = 45 and AB = √45 = 3√5. A common trap is using BD² = AD × CD (the altitude relationship) instead of the leg relationship — match the leg to its adjacent hypotenuse segment, not the two segments to each other.'
    },
    {
      number: 24,
      part: 'A',
      text: 'In △GBT shown below, GXM, BXR, and TXE are drawn such that point X is the centroid. Which statement is always true?',
      choices: [
        'MX + GX = 5',
        'BX = 2RX',
        'TX − EX = 1',
        'TM = TR'
      ],
      topic: 'Triangles & Congruence',
      correct: 1,
      explanation: 'The centroid divides each median in a 2:1 ratio from vertex to midpoint, so BX = 2RX.',
      diveDeep: 'The centroid is the intersection of a triangle\'s three medians and divides each median so the portion from the vertex is twice the portion to the opposite midpoint (a 2:1 ratio). With BR a median, BX (vertex side) = 2 × RX (midpoint side). The other choices use arbitrary numerical relationships that need not hold. Memorize the centroid\'s defining 2:1 partition and that medians connect a vertex to the midpoint of the opposite side.',
      image: '/images/exams/geo-january-2026/q24.png'
    }
  ]
}
