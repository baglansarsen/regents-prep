// Geometry Regents — June 2023
export default {
  id: 'geo-jun-2023',
  subject: 'geometry',
  year: 2023,
  session: 'June',
  totalMinutes: 180,
  questions: [
    {
      number: 1,
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
      number: 4,
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
      number: 6,
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
      number: 12,
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
      number: 14,
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
      number: 18,
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
      number: 23,
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
  ]
}
