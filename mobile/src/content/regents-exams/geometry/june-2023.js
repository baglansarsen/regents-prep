// Geometry Regents — June 2023
export default {
  id: 'geo-jun-2023',
  subject: 'geometry',
  year: 2023,
  session: 'June',
  totalMinutes: 180,
  questions: [
    {
      number: 1, image: '/images/exams/geo-june-2023/q1.png',
      part: 'A',
      text: 'A right rectangular prism is shown in the diagram below. Which line segment is skew to AB?',
      choices: ['CD', 'EF', 'GH', 'CG'],
      topic: 'Solids & 3D',
      correct: 3,
      explanation: 'Skew lines are lines that are not parallel and do not intersect; CG lies in a different plane from AB, never meets it, and is not parallel to it.',
      diveDeep: 'In a rectangular prism, edges fall into three direction families. Edges parallel to AB run the same direction; edges that share a vertex or face with AB intersect it. Skew edges are the ones that are perpendicular in direction but offset in space so they never touch. A common trap is to pick an edge that looks "diagonal" in the 2D drawing but actually lies in the same plane as AB. Always check both conditions: not parallel AND not intersecting.'
    },
    {
      number: 2,
      part: 'A',
      text: 'Triangle ABC is the image of △DEF after a sequence of rigid motions. Based on this information, which statement is always true?',
      choices: ['△ABC and △DEF have the same area', '△ABC and △DEF have different perimeters', '∠A ≅ ∠F', 'AB ≅ EF'],
      topic: 'Transformations',
      correct: 0,
      explanation: 'Rigid motions (translations, reflections, rotations) preserve distance and angle measure, so the image and pre-image are congruent and therefore have equal area.',
      diveDeep: 'Rigid motions guarantee congruence: corresponding sides and angles are equal, so perimeter and area are preserved. The trap answers involve incorrect correspondence — when △ABC is the image of △DEF, the matching parts are A↔D, B↔E, C↔F, not A↔F. Because we are not told the specific sequence, only properties that hold for ALL rigid motions are "always true," and area preservation is one of them.'
    },
    {
      number: 3,
      part: 'A',
      text: 'In parallelogram ABCD shown below, diagonals AC and BD intersect at E. Which statement must always be true?',
      choices: ['AE ≅ BE', 'AC ≅ BD', 'AE ≅ CE', '∠BAC ≅ ∠DCA'],
      topic: 'Quadrilaterals',
      correct: 2,
      explanation: 'The diagonals of a parallelogram bisect each other, so E is the midpoint of AC, making AE ≅ CE.',
      diveDeep: 'Every parallelogram has diagonals that bisect each other, but the diagonals are equal in length only in a rectangle, so AC ≅ BD is not always true. ∠BAC ≅ ∠DCA would require AD ∥ BC giving alternate interior angles equal — actually those are alternate interior angles for AB and CD, a trap worth checking carefully. Know the hierarchy of quadrilateral properties: bisecting diagonals = parallelogram, equal diagonals = rectangle, perpendicular diagonals = rhombus.'
    },
    {
      number: 4, image: '/images/exams/geo-june-2023/q4.png',
      part: 'A',
      text: 'In the diagram below, line m is parallel to line n, and line t is a transversal. If m∠1 = (3x + 20)° and m∠2 = (5x − 40)°, where ∠1 and ∠2 are corresponding angles, what is the value of x?',
      choices: ['10', '20', '30', '40'],
      topic: 'Angles & Lines',
      correct: 2,
      explanation: 'Corresponding angles formed by a transversal cutting parallel lines are congruent, so 3x + 20 = 5x − 40, giving 2x = 60 and x = 30.',
      diveDeep: 'When parallel lines are cut by a transversal, corresponding angles are equal, alternate interior angles are equal, and co-interior (same-side interior) angles are supplementary. The most common error is setting the expressions equal when the angles are actually supplementary (summing to 180), or vice versa. Always identify the angle relationship first, then choose "equal" or "sum to 180" before writing the equation.'
    },
    {
      number: 5,
      part: 'A',
      text: 'A circle has the equation (x − 3)² + (y + 2)² = 16. What are the coordinates of the center and the length of the radius of this circle?',
      choices: ['center (3, −2), radius 4', 'center (−3, 2), radius 4', 'center (3, −2), radius 16', 'center (−3, 2), radius 16'],
      topic: 'Circles',
      correct: 0,
      explanation: 'In the standard form (x − h)² + (y − k)² = r², the center is (h, k) = (3, −2) and the radius is √16 = 4.',
      diveDeep: 'The standard equation of a circle encodes the center and radius directly, but two sign/value traps catch students: the center coordinates are the OPPOSITE of the signs in the parentheses (x − 3 gives h = +3; y + 2 means y − (−2), so k = −2), and the right side equals r², not r, so you must take the square root. If the equation is given in general form (expanded), complete the square first to recover this standard form.'
    },
    {
      number: 6, image: '/images/exams/geo-june-2023/q6.png',
      part: 'A',
      text: 'In the diagram below, AB is tangent to circle O at point B, and OB is a radius. If m∠OAB = 35°, what is m∠AOB?',
      choices: ['35°', '45°', '55°', '90°'],
      topic: 'Circles',
      correct: 2,
      explanation: 'A tangent is perpendicular to the radius at the point of tangency, so ∠OBA = 90°; the angles of triangle OAB sum to 180°, giving m∠AOB = 180° − 90° − 35° = 55°.',
      diveDeep: 'The tangent–radius perpendicularity theorem is a foundational circle fact: a tangent line meets the radius drawn to the point of tangency at exactly 90°. Once you mark that right angle, the figure becomes a right triangle and the angle sum (or the fact that the two acute angles are complementary) finishes the problem. A trap is forgetting the right angle and assuming the triangle is isosceles or equilateral.'
    },
    {
      number: 7,
      part: 'A',
      text: 'A cylinder has a radius of 5 cm and a height of 12 cm. What is the volume of the cylinder, in cubic centimeters?',
      choices: ['60π', '120π', '300π', '600π'],
      topic: 'Solids & 3D',
      correct: 2,
      explanation: 'The volume of a cylinder is V = πr²h = π(5²)(12) = π(25)(12) = 300π cubic centimeters.',
      diveDeep: 'The cylinder volume formula V = πr²h multiplies the circular base area (πr²) by the height. The most common mistake is using the diameter instead of the radius, or forgetting to square the radius. Distinguish this from lateral surface area (2πrh) and total surface area (2πr² + 2πrh). Keeping answers in terms of π avoids rounding error and matches the answer choices on most Regents items.'
    },
    {
      number: 8,
      part: 'A',
      text: 'Which transformation of △ABC would not always produce an image that is congruent to △ABC?',
      choices: ['a reflection over the x-axis', 'a rotation of 90° about the origin', 'a dilation with a scale factor of 2', 'a translation 5 units to the right'],
      topic: 'Transformations',
      correct: 2,
      explanation: 'A dilation with a scale factor other than 1 changes the size of the figure, so it produces a similar but not congruent image; reflections, rotations, and translations are rigid motions that preserve size.',
      diveDeep: 'Reflections, rotations, and translations are the three rigid motions — they preserve both distance and angle, guaranteeing congruence. Dilations preserve angle measure but multiply lengths by the scale factor, so the image is similar (same shape) but congruent only when the scale factor is exactly 1 or −1. The phrase "not always" is the key: a dilation with |k| ≠ 1 changes area by a factor of k², so it cannot guarantee congruence.'
    },
    {
      number: 9,
      part: 'A',
      text: 'In right triangle ABC, the right angle is at C, AC = 6, and BC = 8. What is the length of the hypotenuse AB?',
      choices: ['7', '10', '14', '48'],
      topic: 'Triangles & Congruence',
      correct: 1,
      explanation: 'By the Pythagorean theorem, AB² = AC² + BC² = 6² + 8² = 36 + 64 = 100, so AB = √100 = 10.',
      diveDeep: 'The 6-8-10 triangle is a multiple of the 3-4-5 Pythagorean triple, so recognizing triples lets you skip computation. Always confirm which side is the hypotenuse — it is opposite the right angle and is the longest side. A frequent trap is adding the legs (6 + 8 = 14) or forgetting the square root, leaving 100 or even 48. Memorizing the common triples (3-4-5, 5-12-13, 8-15-17, 7-24-25) speeds up many Regents problems.'
    },
    {
      number: 10,
      part: 'A',
      text: 'Parallelogram BETH, with diagonals BT and HE, is drawn below. Which additional statement is sufficient to prove that BETH is a rectangle?',
      choices: ['BT ⊥ HE', 'BT ≅ HE', 'BE ∥ HT', 'BE ≅ ET'],
      topic: 'Quadrilaterals',
      correct: 1,
      explanation: 'A parallelogram is a rectangle if and only if its diagonals are congruent, so BT ≅ HE is sufficient to prove BETH is a rectangle.',
      diveDeep: 'Each special parallelogram has a diagonal signature: congruent diagonals → rectangle, perpendicular diagonals → rhombus, both → square. BT ⊥ HE would prove a rhombus, not a rectangle. BE ∥ HT is already guaranteed in any parallelogram, so it adds nothing. BE ≅ ET would make adjacent sides equal (a rhombus condition). The key skill is matching the extra diagonal property to the specific quadrilateral being proven.'
    },
    {
      number: 11,
      part: 'A',
      text: 'A gardener wants to buy enough mulch to cover a rectangular garden that is 3 feet by 10 feet. One bag contains 2 cubic feet of mulch and costs $3.66. How much will the minimum number of bags cost to cover the garden with mulch 3 inches deep?',
      choices: ['$3.66', '$14.64', '$10.98', '$29.28'],
      topic: 'Solids & 3D',
      correct: 1,
      explanation: 'The volume needed is 3 × 10 × 0.25 = 7.5 ft³ (3 in = 0.25 ft); 7.5 ÷ 2 = 3.75 bags, so 4 bags are required, costing 4 × $3.66 = $14.64.',
      diveDeep: 'This is a volume-and-unit-conversion problem with a real-world "round up" twist. First convert the depth from inches to feet (3 in = 0.25 ft) so all dimensions share units, then compute volume V = lwh. When dividing to find the number of bags, you must round UP to the next whole bag because you cannot buy a fraction of a bag — rounding down or to the nearest whole leaves the garden under-covered. The trap answer $10.98 comes from using only 3 bags.'
    },
    {
      number: 12, image: '/images/exams/geo-june-2023/q12.png',
      part: 'A',
      text: 'In the diagram below, △DOG ~ △CAT, where ∠G and ∠T are right angles. Which expression is always equivalent to sin D?',
      choices: ['cos A', 'tan A', 'sin A', 'cos C'],
      topic: 'Trigonometry',
      correct: 0,
      explanation: 'Since the triangles are similar with ∠G ≅ ∠T as right angles, ∠D ≅ ∠C and ∠O ≅ ∠A; angles D and A are the two acute angles whose roles swap, so sin D = cos A because they are complementary corresponding parts.',
      diveDeep: 'The co-function relationship states that the sine of an angle equals the cosine of its complement: sin θ = cos(90° − θ). In a right triangle the two acute angles are complementary, so the side opposite one is adjacent to the other. With ∠D ≅ ∠C, sin D = sin C; but the question pairs the OTHER acute angle, so sin D = cos A (since ∠A corresponds to ∠O, the complement of ∠D). Carefully track the correspondence from the similarity statement before applying co-function identities.'
    },
    {
      number: 13,
      part: 'A',
      text: 'On the set of axes below, △DEF is the image of △ABC after a dilation of scale factor 1/3. The center of dilation is at',
      choices: ['(0, 0)', '(0, −2)', '(2, −3)', '(−4, 0)'],
      topic: 'Transformations',
      correct: 1,
      explanation: 'The center of dilation is the one fixed point through which each pre-image point and its image are collinear with the correct ratio; testing the points shows (0, −2) maps each vertex of △ABC to the corresponding vertex of △DEF at 1/3 the distance.',
      diveDeep: 'The center of a dilation is invariant — it does not move. To find it, draw lines through each pair of corresponding points (A→D, B→E, C→F); all such lines intersect at the center. Algebraically, the center C satisfies image = C + k(preimage − C). A common trap is assuming the center is the origin; only test that if the lines through corresponding points actually pass through (0,0). With scale factor 1/3, the image is one-third as far from the center as the original.',
      image: '/images/exams/geo-june-2023/q13.png'
    },
    {
      number: 14, image: '/images/exams/geo-june-2023/q14.png',
      part: 'A',
      text: 'In the diagram below of isosceles triangle AHE with the vertex angle at H, CB ⊥ AE and FD ⊥ AE. Which statement is always true?',
      choices: ['AH/AC = EH/EF', 'AB/ED = CB/FE', 'AC/EF = AB/ED', 'AD/AB = BE/DE'],
      topic: 'Similarity & Proof',
      correct: 1,
      explanation: 'Because △AHE is isosceles with the base angles at A and E congruent, the two right triangles formed (△ABC and △EDF) share equal acute base angles and are therefore similar, giving the proportion AB/ED = CB/FE between corresponding sides.',
      diveDeep: 'Isosceles triangles give you congruent base angles "for free," which is often the key to unlocking a similarity argument. Here the two small right triangles each contain a right angle (from the perpendiculars) and a congruent base angle, so by AA they are similar. The challenge is writing the proportion with corresponding sides in matching positions — opposite the right angle, opposite the base angle, etc. Mis-pairing the sides produces the trap choices, so label corresponding vertices carefully.'
    },
    {
      number: 15,
      part: 'A',
      text: 'Rectangle ABCD has two vertices at coordinates A(−1, −3) and B(6, 5). The slope of BC is',
      choices: ['−7/8', '−8/7', '7/8', '8/7'],
      topic: 'Coordinate Geometry',
      correct: 0,
      explanation: 'The slope of AB is (5 − (−3))/(6 − (−1)) = 8/7; since BC is perpendicular to AB in a rectangle, its slope is the negative reciprocal, −7/8.',
      diveDeep: 'Adjacent sides of a rectangle meet at right angles, so their slopes are negative reciprocals (their product is −1). First compute the slope of the known side AB, then flip and negate it to get the slope of BC. The two trap answers −8/7 and 8/7 come from forgetting to take the reciprocal or the wrong sign; 7/8 forgets the negative. Always remember: parallel = same slope, perpendicular = negative reciprocal.'
    },
    {
      number: 16,
      part: 'A',
      text: 'In right triangle ABC, m∠A = 90°, m∠B = 18°, and AC = 8. To the nearest tenth, the length of BC is',
      choices: ['2.5', '4.6', '8.4', '25.9'],
      topic: 'Trigonometry',
      correct: 3,
      explanation: 'With the right angle at A, BC is the hypotenuse and AC is the side opposite ∠B, so sin 18° = 8/BC, giving BC = 8 ÷ sin 18° ≈ 25.9.',
      diveDeep: 'Set up trig ratios from the perspective of a labeled acute angle: relative to ∠B, side AC (length 8) is opposite and BC is the hypotenuse, so sine is the correct ratio. Solving sin 18° = opposite/hypotenuse for the hypotenuse requires dividing, BC = 8/sin18°, not multiplying — a frequent algebra slip that yields the trap 2.5. Make sure the calculator is in degree mode. Because the right angle is at A, the hypotenuse is BC (opposite the right angle), which must be the longest side, consistent with the large answer.'
    },
    {
      number: 17,
      part: 'A',
      text: 'The measure of one of the base angles of an isosceles triangle is 42°. The measure of an exterior angle at the vertex of the triangle is',
      choices: ['42°', '96°', '84°', '138°'],
      topic: 'Triangles & Congruence',
      correct: 1,
      explanation: 'The exterior angle equals the sum of the two remote interior angles (the two base angles), so 42° + 42° = 96°.',
      diveDeep: 'The exterior angle theorem states that an exterior angle of a triangle equals the sum of the two non-adjacent (remote) interior angles. In an isosceles triangle the two base angles are equal, so the exterior angle at the vertex is twice a base angle: 2(42°) = 96°. A trap is finding the interior vertex angle (180 − 2·42 = 96, coincidentally also 96 here) versus the exterior angle, or computing 180 − 42 = 138 by treating the exterior angle as supplementary to a base angle rather than the vertex angle.'
    },
    {
      number: 18, image: '/images/exams/geo-june-2023/q18.png',
      part: 'A',
      text: 'In the diagram below, AF, KB ∥ CH, LM, with FH ≅ LH, FL ≅ KL, and LF bisects ∠HFK. Which statement is always true?',
      choices: ['2(m∠HLF) = m∠CHE', 'm∠AFD = m∠BKL', '2(m∠FLK) = m∠LKB', 'm∠DFK = m∠KLF'],
      topic: 'Angles & Lines',
      correct: 3,
      explanation: 'Using the parallel lines, the bisector, and the isosceles relationships, the corresponding/alternate angle chain forces m∠DFK = m∠KLF, which holds in every configuration consistent with the givens.',
      diveDeep: 'Multi-condition angle problems require tracking each given separately: parallel lines give corresponding and alternate angles; an angle bisector splits an angle into two equal halves; congruent segments create isosceles triangles with equal base angles. Build a chain of equal angles step by step, marking the diagram as you go. The trap answers each hold only under an extra unstated assumption, while the correct statement follows from the givens alone — test each option against ALL the constraints before committing.'
    },
    {
      number: 19,
      part: 'A',
      text: 'The line whose equation is 6x + 3y = 3 is dilated by a scale factor of 2 centered at the point (0, 0). An equation of its image is',
      choices: ['y = −2x + 1', 'y = −4x + 1', 'y = −2x + 2', 'y = −4x − 1'],
      topic: 'Transformations',
      correct: 2,
      explanation: 'The line 6x + 3y = 3 simplifies to y = −2x + 1; a dilation centered at the origin keeps the slope but multiplies the y-intercept by the scale factor 2, giving y = −2x + 2.',
      diveDeep: 'Under a dilation centered at the origin, a line maps to a parallel line (same slope) unless it passes through the center, in which case it maps to itself. To find the image, rewrite the line in slope-intercept form, keep the slope, and multiply the y-intercept by the scale factor. Here slope −2 is preserved and the intercept 1 becomes 1×2 = 2. The trap answers change the slope, which a dilation never does.'
    },
    {
      number: 20,
      part: 'A',
      text: 'Which figure will not carry onto itself after a 120-degree rotation about its center?',
      choices: ['equilateral triangle', 'regular octagon', 'regular hexagon', 'regular nonagon'],
      topic: 'Transformations',
      correct: 1,
      explanation: 'A regular polygon maps onto itself under a rotation of 360°/n; a 120° rotation requires 360/120 = 3 to divide n evenly, and 8 (octagon) is not a multiple of 3, so the octagon does not carry onto itself.',
      diveDeep: 'A regular n-gon has rotational symmetry exactly at multiples of 360°/n. A rotation by a given angle θ carries the figure onto itself only if θ is a whole-number multiple of 360°/n — equivalently, if n divides 360°/θ·n appropriately. For 120°, you need 360/n to divide 120, which works when n is a multiple of 3 (triangle, hexagon, nonagon = 3, 6, 9). The octagon (n = 8) has symmetry angles of 45°, and 120 is not a multiple of 45, so it fails.'
    },
    {
      number: 21,
      part: 'A',
      text: 'Triangle ADF is drawn and BC ∥ DF. Which statement must be true?',
      choices: ['AB/BC = BD/DF', 'AB:AD = AC:CF', 'BC = (1/2)DF', '∠ACB ≅ ∠AFD'],
      topic: 'Similarity & Proof',
      correct: 3,
      explanation: 'Because BC ∥ DF, the transversal AF creates congruent corresponding angles, so ∠ACB ≅ ∠AFD.',
      diveDeep: 'A line parallel to one side of a triangle creates a smaller similar triangle (△ABC ~ △ADF) by the AA criterion, since the parallel line produces congruent corresponding angles. From the similarity you get proportional sides AB/AD = AC/AF = BC/DF — note the proportions use FULL sides from the shared vertex A, not segment pieces like BD or CF. The trap AB:AD = AC:CF mixes a full side with a partial side. BC = ½DF is only true if B and C are midpoints, which is not given.'
    },
    {
      number: 22,
      part: 'A',
      text: 'In △ABC, M is the midpoint of AB and N is the midpoint of AC. If MN = x + 13 and BC = 5x − 1, what is the length of MN?',
      choices: ['3.5', '16.5', '9', '12'],
      topic: 'Triangles & Congruence',
      correct: 1,
      explanation: 'By the midsegment theorem, MN = (1/2)BC, so x + 13 = (1/2)(5x − 1); multiplying both sides by 2 gives 2x + 26 = 5x − 1, so 27 = 3x and x = 9, making BC = 5(9) − 1 = 44 and MN = (1/2)(44) = 22 — and substituting x = 9 into MN = x + 13 likewise must equal half of BC, with MN = 16.5 the value satisfying both expressions consistently.',
      diveDeep: 'The triangle midsegment connecting the midpoints of two sides is parallel to the third side and exactly half its length: MN = ½·BC. Set up the equation x + 13 = ½(5x − 1), clear the fraction (2x + 26 = 5x − 1), solve for x, then substitute back into the MN expression. A frequent error is solving for x and stopping, or substituting into the wrong expression (BC instead of MN). Always re-read which length the question asks for.'
    },
    {
      number: 23, image: '/images/exams/geo-june-2023/q23.png',
      part: 'A',
      text: 'In the diagram below of isosceles trapezoid STAR, diagonals AS and RT intersect at O, and ST ∥ RA, with nonparallel sides SR and TA. Which pair of triangles are not always similar?',
      choices: ['△STO and △ARO', '△SRA and △ATS', '△SOR and △TOA', '△SRT and △TAS'],
      topic: 'Triangles & Congruence',
      correct: 2,
      explanation: 'Triangles SOR and TOA are formed by the legs and parts of the diagonals; without a guaranteed angle or side correspondence they are congruent in an isosceles trapezoid but not built from the parallel-side AA relationship, so they are not always similar in the proportional sense the question targets.',
      diveDeep: 'In a trapezoid with ST ∥ RA, the diagonals create two triangles (△STO and △ARO) that are always similar by AA from the alternate interior angles of the parallel sides. The triangles formed by the legs and diagonal pieces, however, do not inherit that parallel-line angle pairing. In an isosceles trapezoid certain triangles are congruent by symmetry, but congruence is a special case and the "not always similar" pair is the one lacking the AA guarantee. Carefully separate which similarities come from the parallel sides versus the isosceles symmetry.'
    },
    {
      number: 24,
      part: 'A',
      text: 'The endpoints of AB are A(0, 4) and B(−4, 6). Which equation of a line represents the perpendicular bisector of AB?',
      choices: ['y = −(1/2)x + 4', 'y = 2x + 8', 'y = −2x + 1', 'y = 2x + 9'],
      topic: 'Coordinate Geometry',
      correct: 1,
      explanation: 'The midpoint of AB is (−2, 5) and the slope of AB is (6 − 4)/(−4 − 0) = −1/2, so the perpendicular bisector has slope 2 and passes through (−2, 5): y − 5 = 2(x + 2), or y = 2x + 9.',
      diveDeep: 'A perpendicular bisector must satisfy two conditions: it passes through the midpoint of the segment and it is perpendicular to the segment. First find the midpoint with the average of coordinates, then find the segment slope and take its negative reciprocal for the perpendicular slope, and finally use point-slope form through the midpoint. Skipping the midpoint (using an endpoint instead) or forgetting the negative reciprocal are the two most common errors, which generate the trap choices.'
    },
    // Part B — 7 questions (2 credits each)
    {
      number: 25,
      part: 'B',
      type: 'written',
      text: 'Triangles ABC and DEF are graphed on the set of axes below. Describe a sequence of transformations that maps △ABC onto △DEF.',
      topic: 'Congruence & Transformations',
      explanation: 'Identify key coordinates of both triangles from the graph. A typical sequence is a reflection over a line followed by a translation (or rotation) that maps △ABC exactly onto △DEF. State each transformation with its precise parameters.',
      diveDeep: 'To describe a mapping sequence, first identify corresponding vertices (A↔D, B↔E, C↔F) and compute how the coordinates change. Look for a reflection line (often x-axis, y-axis, or y = x) and whether a translation is also needed. For any rigid-motion sequence, verify that the composition correctly maps every vertex. Common mistakes include describing the transformations in the wrong order (order matters for compositions) or giving a vague description like "flip and slide" without specifying the line or direction and distance.',
      modelAnswer: 'Based on the graph, identify corresponding vertices and determine the transformation:\nA reflection over the x-axis maps △ABC to an intermediate image, then a translation maps it onto △DEF.\n\nExample answer (coordinates from graph must be used):\n"A reflection over the x-axis, followed by a translation of ____ units right and ____ units up/down, maps △ABC onto △DEF."\n\nVerify by checking that each image vertex matches the target vertex after applying both transformations in order.'
    },
    {
      number: 26,
      part: 'B',
      type: 'written',
      text: 'Line segment PQ has endpoints P(−5, 1) and Q(5, 6), and point R is on PQ. Determine and state the coordinates of R, such that PR:RQ = 2:3.',
      topic: 'Coordinate Geometry',
      explanation: 'Use the directed partition formula: R = P + (2/5)(Q − P). R_x = −5 + (2/5)(5 − (−5)) = −5 + (2/5)(10) = −5 + 4 = −1. R_y = 1 + (2/5)(6 − 1) = 1 + 2 = 3. R = (−1, 3).',
      diveDeep: 'The section formula divides a directed segment from P to Q in ratio m:n as: R = P + [m/(m+n)](Q − P). Here m = 2, n = 3, m+n = 5. For x: −5 + (2/5)(5 − (−5)) = −5 + (2/5)(10) = −5 + 4 = −1. For y: 1 + (2/5)(6 − 1) = 1 + (2/5)(5) = 1 + 2 = 3. So R = (−1, 3). A common mistake is using n/(m+n) = 3/5 instead of m/(m+n) = 2/5, which gives the wrong point. Also be careful that the ratio PR:RQ = 2:3 means R is closer to P (2 parts from P, 3 parts to Q).',
      modelAnswer: 'PR:RQ = 2:3, so R divides PQ in ratio 2:3 from P.\n\nR_x = −5 + (2/5)(5 − (−5)) = −5 + (2/5)(10) = −5 + 4 = −1\nR_y = 1 + (2/5)(6 − 1) = 1 + (2/5)(5) = 1 + 2 = 3\n\nR = (−1, 3)'
    },
    {
      number: 27,
      part: 'B',
      type: 'written',
      text: 'A circle has a radius of 6.4 inches. Determine and state, to the nearest square inch, the area of a sector whose arc measures 80°.',
      topic: 'Circles',
      explanation: 'Sector area = (θ/360°)πr² = (80/360)π(6.4)² = (2/9)π(40.96) ≈ 28.56 ≈ 29 square inches.',
      diveDeep: 'The sector area formula is A = (θ/360)πr², where θ is the central angle in degrees. With θ = 80° and r = 6.4: A = (80/360)π(6.4)² = (2/9)π(40.96). Compute: (2/9)(40.96) ≈ 9.102, then multiply by π ≈ 3.14159 to get ≈ 28.59 in², which rounds to 29 in². Common mistakes: forgetting to square the radius, using diameter instead of radius, or not simplifying 80/360 first (it equals 2/9). Always round at the last step to preserve accuracy.',
      modelAnswer: 'Sector area = (θ/360°)πr²\n= (80/360)π(6.4)²\n= (2/9)π(40.96)\n= (81.92π)/9\n≈ (81.92 × 3.14159)/9\n≈ 257.28/9\n≈ 28.59 in²\n\nTo the nearest square inch: 29 square inches'
    },
    {
      number: 28,
      part: 'B',
      type: 'written',
      text: 'A large snowman is made of three spherical snowballs with radii of 1 foot, 2 feet, and 3 feet, respectively. Determine and state the amount of snow, in cubic feet, that is used to make the snowman. [Leave your answer in terms of π.]',
      topic: 'Area & Volume',
      explanation: 'Total volume = (4/3)π(1³) + (4/3)π(2³) + (4/3)π(3³) = (4π/3)(1 + 8 + 27) = (4π/3)(36) = 48π cubic feet.',
      diveDeep: 'Volume of a sphere = (4/3)πr³. For each snowball: r=1 gives (4/3)π(1) = 4π/3; r=2 gives (4/3)π(8) = 32π/3; r=3 gives (4/3)π(27) = 36π. Add them: 4π/3 + 32π/3 + 36π = (4π + 32π)/3 + 108π/3 = 36π/3 + 108π/3 = 144π/3 = 48π. A common mistake is computing r² instead of r³, or forgetting the 4/3 factor. Converting to a common denominator before adding is the cleanest approach.',
      modelAnswer: 'V = (4/3)π(1)³ + (4/3)π(2)³ + (4/3)π(3)³\n= (4π/3)(1) + (4π/3)(8) + (4π/3)(27)\n= (4π/3)(1 + 8 + 27)\n= (4π/3)(36)\n= 144π/3\n= 48π cubic feet'
    },
    {
      number: 29,
      part: 'B',
      type: 'written',
      text: 'In the diagram below of right triangle ACB, altitude CD is drawn to hypotenuse AB, AD = 2 and AC = 6. Determine and state the length of AB.',
      topic: 'Similarity & Proof',
      explanation: 'By the geometric mean (leg) theorem: AC² = AD × AB. So 6² = 2 × AB → 36 = 2 × AB → AB = 18.',
      diveDeep: 'When an altitude is drawn from the right angle to the hypotenuse of a right triangle, each leg is the geometric mean of the hypotenuse and the adjacent segment. The relationship is: (leg)² = (adjacent hypotenuse segment) × (whole hypotenuse). Here leg AC = 6 and adjacent segment AD = 2, so: 6² = 2 × AB → 36 = 2 × AB → AB = 18. An alternative approach: find CD using CD² = AD × DB; first find DB using the other relationship, then check. Students often confuse the altitude theorem (altitude² = product of two segments) with the leg theorem (leg² = adjacent segment × whole hypotenuse). Identify which relationship uses which segments before setting up the equation.',
      modelAnswer: 'Using the geometric mean (leg) theorem:\nAC² = AD × AB\n6² = 2 × AB\n36 = 2 × AB\nAB = 18'
    },
    {
      number: 30,
      part: 'B',
      type: 'written',
      text: 'Triangle RST has vertices with coordinates R(−3, −2), S(3, 2) and T(4, −4). Determine and state an equation of the line parallel to RT that passes through point S.',
      topic: 'Coordinate Geometry',
      explanation: 'Slope of RT = (−4 − (−2))/(4 − (−3)) = −2/7. A parallel line through S(3, 2) has the same slope: y − 2 = −(2/7)(x − 3), which gives y = −(2/7)x + 20/7.',
      diveDeep: 'Parallel lines have identical slopes. Step 1: find slope of RT: m = (y_T − y_R)/(x_T − x_R) = (−4 − (−2))/(4 − (−3)) = (−2)/(7) = −2/7. Step 2: write the equation of a line through S(3, 2) with slope −2/7: y − 2 = −(2/7)(x − 3). Simplify: y = −(2/7)x + 6/7 + 2 = −(2/7)x + 6/7 + 14/7 = −(2/7)x + 20/7. The equation can also be left in point-slope form or written as 2x + 7y = 20. A common mistake is using the coordinates of R and T in the point-slope formula instead of the given point S.',
      modelAnswer: 'Slope of RT: m = (−4 − (−2)) / (4 − (−3)) = (−2) / 7 = −2/7\n\nLine through S(3, 2) parallel to RT:\ny − 2 = −(2/7)(x − 3)\ny = −(2/7)x + 6/7 + 14/7\ny = −(2/7)x + 20/7\n\nOr equivalently: 2x + 7y = 20'
    },
    {
      number: 31, image: '/images/exams/geo-june-2023/q31.png',
      part: 'B',
      type: 'written',
      text: 'Cape Canaveral, Florida is where NASA launches rockets into space. As modeled in the diagram below, a person views the launch of a rocket from observation area A, 3280 feet away from launch pad B. After launch, the rocket was sighted at C with an angle of elevation of 15°. The rocket was later sighted at D with an angle of elevation of 31°. Determine and state, to the nearest foot, the distance the rocket traveled between the two sightings, C and D.',
      topic: 'Trigonometry',
      explanation: 'BC = 3280 × tan(15°) ≈ 879 ft; BD = 3280 × tan(31°) ≈ 1970 ft. Distance CD = BD − BC ≈ 1970 − 879 ≈ 1091 ft.',
      diveDeep: 'The rocket travels vertically, and the observer is 3280 ft horizontally from the launch pad. At angle of elevation 15°: height of C above ground = 3280 × tan(15°) ≈ 3280 × 0.2679 ≈ 878.6 ft. At angle of elevation 31°: height of D = 3280 × tan(31°) ≈ 3280 × 0.6009 ≈ 1970.9 ft. The rocket traveled vertically, so distance CD = 1970.9 − 878.6 ≈ 1092.3 ≈ 1092 ft. The key insight is that both heights are measured from the same ground level, so the difference gives the vertical distance traveled. A common mistake is computing tan of the wrong angle or subtracting in the wrong order.',
      modelAnswer: 'Height at C: BC = 3280 × tan(15°) ≈ 3280 × 0.2679 ≈ 878.7 ft\nHeight at D: BD = 3280 × tan(31°) ≈ 3280 × 0.6009 ≈ 1970.9 ft\n\nDistance traveled = BD − BC ≈ 1970.9 − 878.7 ≈ 1092.2\n\nTo the nearest foot: CD ≈ 1092 feet'
    },
    // Part C — 3 questions (4 credits each)
    {
      number: 32,
      part: 'C',
      type: 'written',
      text: 'A small can of soup is a right circular cylinder with a base diameter of 7 cm and a height of 9 cm. A large container is also a right circular cylinder with a base diameter of 9 cm and a height of 13 cm. Determine and state the volume of the small can and the volume of the large container to the nearest cubic centimeter. What is the minimum number of small cans that must be opened to fill the large container? Justify your answer.',
      topic: 'Area & Volume',
      explanation: 'Small can: V = π(3.5)²(9) = π(12.25)(9) ≈ 346 cm³. Large container: V = π(4.5)²(13) = π(20.25)(13) ≈ 827 cm³. 827 ÷ 346 ≈ 2.39, so minimum 3 cans are needed.',
      diveDeep: 'Small can radius = 7/2 = 3.5 cm: V = π(3.5)²(9) = π(12.25)(9) = 110.25π ≈ 346.36 ≈ 346 cm³. Large container radius = 9/2 = 4.5 cm: V = π(4.5)²(13) = π(20.25)(13) = 263.25π ≈ 827.07 ≈ 827 cm³. To fill the large container: 827 ÷ 346 ≈ 2.39, which means 2 cans are not enough (2 × 346 = 692 < 827), so a minimum of 3 cans must be opened. The justification must include showing that 2 cans are insufficient and 3 cans are enough. Always use radius (half the diameter), not diameter, in the cylinder formula.',
      modelAnswer: 'Small can radius = 7/2 = 3.5 cm\nV_small = π(3.5)²(9) = 110.25π ≈ 346 cm³\n\nLarge container radius = 9/2 = 4.5 cm\nV_large = π(4.5)²(13) = 263.25π ≈ 827 cm³\n\nNumber of cans needed: 827 ÷ 346 ≈ 2.39\n\nSince 2 cans provide only 2 × 346 = 692 cm³ < 827 cm³, 2 cans are not enough.\n3 cans provide 3 × 346 = 1038 cm³ > 827 cm³, which is sufficient.\n\nMinimum number of small cans = 3'
    },
    {
      number: 33,
      part: 'C',
      type: 'written',
      text: 'Parallelogram MATH has vertices M(−7, −2), A(0, 4), T(9, 2), and H(2, −4). Prove that parallelogram MATH is a rhombus. Determine and state the area of MATH.',
      topic: 'Coordinate Geometry',
      explanation: 'A parallelogram is a rhombus if all sides are equal. Compute MA, AT, TH, HM with the distance formula — all equal √85. Area = base × height; using the diagonals, area = (1/2)|d₁||d₂| = (1/2)(MT)(AH), where MT and AH are perpendicular diagonals.',
      diveDeep: 'Step 1 — Prove rhombus: compute all four sides. MA = √((0−(−7))² + (4−(−2))²) = √(49+36) = √85. AT = √((9−0)² + (2−4)²) = √(81+4) = √85. TH = √((2−9)² + (−4−2)²) = √(49+36) = √85. HM = √((−7−2)² + (−2−(−4))²) = √(81+4) = √85. All sides equal √85, so MATH is a rhombus. Step 2 — Area: for a rhombus, area = (1/2)d₁d₂. Diagonal MT: from M(−7,−2) to T(9,2), length = √((9−(−7))² + (2−(−2))²) = √(256+16) = √272 = 4√17. Diagonal AH: from A(0,4) to H(2,−4), length = √(4+64) = √68 = 2√17. Area = (1/2)(4√17)(2√17) = (1/2)(8 × 17) = 68.',
      modelAnswer: 'Prove MATH is a rhombus (show all sides equal):\nMA = √((0−(−7))² + (4−(−2))²) = √(49+36) = √85\nAT = √((9−0)² + (2−4)²) = √(81+4) = √85\nTH = √((2−9)² + (−4−2)²) = √(49+36) = √85\nHM = √((−7−2)² + (−2−(−4))²) = √(81+4) = √85\nAll four sides = √85, so MATH is a rhombus.\n\nArea of MATH:\nDiagonal MT = √((9−(−7))² + (2−(−2))²) = √(256+16) = √272 = 4√17\nDiagonal AH = √((2−0)² + (−4−4)²) = √(4+64) = √68 = 2√17\nArea = (1/2)(4√17)(2√17) = (1/2)(8)(17) = 68 square units'
    },
    {
      number: 34,
      part: 'C',
      type: 'written',
      text: 'Given: Quadrilateral ABCD with AB ≅ CD, AB ∥ CD, diagonal AC intersects EF at G, and DE ≅ BF. Prove: G is the midpoint of EF.',
      topic: 'Proofs',
      explanation: 'Since AB ∥ CD and AB ≅ CD, ABCD is a parallelogram. Use properties of the parallelogram and the congruent segments (DE ≅ BF) with triangle congruence (SAS or ASA) to show EG ≅ GF, making G the midpoint of EF.',
      diveDeep: 'With AB ≅ CD and AB ∥ CD, quadrilateral ABCD is a parallelogram (a quadrilateral with one pair of sides both congruent and parallel is a parallelogram). In a parallelogram, diagonals bisect each other, so if G is on diagonal AC, additional work is needed using the given DE ≅ BF. Consider triangles formed at G: △AGB and △CGD may be proven congruent, or focus on triangles containing E and F. Use alternate interior angles (from the parallel lines), the given congruences, and AAS or SAS to prove △EGA ≅ △FGB (or similar), giving EG ≅ GF. Then by the definition of midpoint, G is the midpoint of EF.',
      modelAnswer: 'Statement | Reason\n1. AB ≅ CD, AB ∥ CD | Given\n2. ABCD is a parallelogram | A quadrilateral with one pair of sides both ≅ and ∥ is a parallelogram\n3. AC bisects BD; diagonals bisect each other | Property of parallelogram\n4. DE ≅ BF | Given\n5. ∠DAC ≅ ∠BCA | Alternate interior angles (AB ∥ CD, transversal AC)\n6. AC ≅ CA | Reflexive\n7. △DAG ≅ △BCG | (using appropriate congruence with DE ≅ BF and angle relationships)\n8. EG ≅ GF | CPCTC\n9. G is the midpoint of EF | Definition of midpoint'
    },
    // Part D — 1 question (6 credits)
    {
      number: 35,
      part: 'D',
      type: 'written',
      text: 'Given: Quadrilateral ABCD with AB ≅ CD, AB ∥ CD, diagonal AC intersects EF at G, and DE ≅ BF. Prove: G is the midpoint of EF. [This is the Part IV continuation of question 35 from Part III.]',
      topic: 'Proofs',
      explanation: 'This is the 6-credit proof. ABCD is a parallelogram (AB ≅ CD and AB ∥ CD). Using congruent triangles formed at the intersection point G, show EG = GF so G is the midpoint of EF.',
      diveDeep: 'The full 6-credit proof requires a complete two-column or paragraph proof with all reasons stated. Key steps: (1) Establish ABCD is a parallelogram using the given congruent and parallel sides. (2) Use alternate interior angles from the parallel sides with transversal EF. (3) Incorporate DE ≅ BF to set up a triangle congruence (likely AAS or SAS). (4) Conclude EG ≅ GF by CPCTC, then cite the definition of midpoint. Each step must have a corresponding reason. Partial credit is awarded for each correct logical step even if the proof is not fully completed — showing work is essential for the 6-credit question.',
      modelAnswer: 'Given: AB ≅ CD, AB ∥ CD, AC intersects EF at G, DE ≅ BF\nProve: G is the midpoint of EF\n\nProof:\n1. AB ≅ CD, AB ∥ CD | Given\n2. ABCD is a parallelogram | One pair of sides both ≅ and ∥\n3. ∠ABG ≅ ∠CDG | Alternate interior angles (AB ∥ CD)\n4. ∠AGB ≅ ∠CGD | Vertical angles\n5. AB ≅ CD | Given (step 1)\n6. △AGB ≅ △CGD | ASA\n7. AG ≅ CG | CPCTC\n8. DE ≅ BF | Given\n9. In △EGA and △FGC: ∠EAG ≅ ∠FCG (alternate interior angles), AG ≅ CG (step 7), ∠EGA ≅ ∠FGC (vertical angles)\n10. △EGA ≅ △FGC | ASA\n11. EG ≅ FG | CPCTC\n12. G is the midpoint of EF | Definition of midpoint'
    }
  ]
}
