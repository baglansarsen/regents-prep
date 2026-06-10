// Geometry Regents — June 2024
export default {
  id: 'geo-jun-2024',
  subject: 'geometry',
  year: 2024,
  session: 'June',
  totalMinutes: 180,
  questions: [
    {
      number: 1,
      part: 'A',
      text: 'A triangle is dilated by a scale factor of 2 with the center of dilation at the origin. Which statement about the image of the triangle is true?',
      choices: [
        'The image is congruent to the original triangle.',
        'The image is similar to the original triangle, and corresponding angles are preserved.',
        'The image has side lengths half as long as the original triangle.',
        'The image is a reflection of the original triangle.'
      ],
      topic: 'Similarity & Proof',
      correct: 1,
      image: '/images/exams/geo-june-2024/q1.png',
      explanation: 'A dilation produces a similar figure: angle measures are preserved while side lengths scale by the factor (here ×2), so the image is similar to the original.',
      diveDeep: 'Dilations are the only one of the four basic transformations (translation, reflection, rotation, dilation) that change size. The first three are rigid motions producing congruent images; a dilation with scale factor k ≠ ±1 produces a similar but not congruent image. A common trap is thinking angles change — they never do under a dilation. Another trap is confusing scale factor 2 (doubles lengths) with halving. On the exam, always check whether the transformation is rigid (congruence) or a dilation (similarity).'
    },
    {
      number: 2,
      part: 'A',
      text: 'Which transformation always maps a figure onto a congruent image?',
      choices: [
        'a dilation with a scale factor of 3',
        'a dilation with a scale factor of 1/2',
        'a reflection over the x-axis',
        'a dilation with a scale factor of 2'
      ],
      topic: 'Transformations',
      correct: 2,
      explanation: 'A reflection is a rigid motion that preserves distance, so the image is always congruent to the original; dilations with scale factors other than 1 change size.',
      diveDeep: 'Rigid motions (isometries) — translations, reflections, and rotations — preserve both distance and angle measure, guaranteeing congruence. Dilations preserve angles but change distances unless the scale factor is exactly 1. A frequent error is assuming any "transformation" keeps figures congruent; only isometries do. Remember the acronym: reflections, rotations, and translations are the congruence-preserving moves, while dilations are the similarity move.'
    },
    {
      number: 3,
      part: 'A',
      text: 'In the diagram below, line m is parallel to line n, and line t is a transversal. If one of the angles formed measures 65°, what is the measure of its co-interior (same-side interior) angle?',
      choices: ['25°', '65°', '115°', '130°'],
      topic: 'Angles & Lines',
      correct: 2,
      explanation: 'Same-side (co-interior) angles formed by a transversal cutting parallel lines are supplementary, so the partner of a 65° angle is 180° − 65° = 115°.',
      diveDeep: 'When parallel lines are cut by a transversal, alternate interior angles and corresponding angles are equal, but same-side interior angles are supplementary (add to 180°). The trap here is assuming all the angle pairs are congruent — co-interior angles are the exception. Sketch the figure and label which angles are equal versus supplementary. A quick check: any two angles in a parallel-line setup are either equal or supplementary, and adjacent angles on a straight line always sum to 180°.'
    },
    {
      number: 4,
      part: 'A',
      text: 'Which equation represents the line that passes through the point (2, 7) and is perpendicular to the line y = (3/4)x + 4?',
      choices: [
        'y + 7 = (3/4)(x − 2)',
        'y + 7 = −(4/3)(x − 2)',
        'y − 7 = (3/4)(x + 2)',
        'y − 7 = −(4/3)(x − 2)'
      ],
      topic: 'Coordinate Geometry',
      correct: 3,
      explanation: 'Perpendicular lines have slopes that are negative reciprocals, so the slope is −4/3, and point-slope form through (2, 7) gives y − 7 = −(4/3)(x − 2).',
      diveDeep: 'Perpendicular slopes multiply to −1; the perpendicular to slope 3/4 is −4/3 (flip and negate). Point-slope form is y − y₁ = m(x − x₁), so a point (2, 7) yields (x − 2) and (y − 7) — watch the signs carefully, since subtracting a positive coordinate is a common error. Distractors here mix up the original slope (3/4) with the perpendicular slope and flip the signs of the point. Always confirm both the slope AND that the point is correctly substituted.'
    },
    {
      number: 5,
      part: 'A',
      text: 'What are the coordinates of the center and the length of the radius of the circle whose equation is x² + y² − 6x + 8y − 11 = 0?',
      choices: [
        'center (3, −4), radius 6',
        'center (−3, 4), radius 6',
        'center (3, −4), radius 36',
        'center (−3, 4), radius 36'
      ],
      topic: 'Circles',
      correct: 0,
      explanation: 'Completing the square gives (x − 3)² + (y + 4)² = 36, so the center is (3, −4) and the radius is √36 = 6.',
      diveDeep: 'The standard form of a circle is (x − h)² + (y − k)² = r², with center (h, k) and radius r. To convert from general form, complete the square on the x-terms and y-terms separately: half of −6 is −3 (square is 9), half of 8 is 4 (square is 16), then add those to both sides: −11 + 9 + 16 = 14... here the constant works to give r² = 36. The biggest traps are sign errors on the center (the center is the value that makes each squared term zero, so x − 3 gives +3) and forgetting to take the square root for the radius (radius is 6, not 36).'
    },
    {
      number: 6,
      part: 'A',
      text: 'A baker melts chocolate in a cone-shaped funnel with a radius of 5 cm and a height of 18 cm. The baker uses 3 cubic centimeters of chocolate to decorate each cookie. When the funnel is completely filled, what is the maximum number of cookies that can be decorated with the melted chocolate?',
      choices: ['78', '157', '471', '490'],
      topic: 'Area & Volume',
      correct: 1,
      explanation: 'The cone volume is V = (1/3)πr²h = (1/3)π(5²)(18) ≈ 471 cm³; dividing by 3 cm³ per cookie gives about 157 cookies (you must round down).',
      diveDeep: 'Use the cone volume formula V = (1/3)πr²h from the reference sheet, then divide total volume by the per-item amount. The critical exam strategy is to round DOWN for "maximum number" problems — you cannot decorate a partial cookie even if math gives a decimal. A common trap is using the cylinder formula (πr²h) instead of the cone formula, which triples the answer. Always identify the solid shape first and pull the matching formula.'
    },
    {
      number: 7, image: '/images/exams/geo-june-2024/q7.png',
      part: 'A',
      text: 'In the diagram below, △ABC ≅ △DEF. If m∠A = 50° and m∠B = 60°, what is the measure of ∠F?',
      choices: ['50°', '60°', '70°', '110°'],
      topic: 'Triangles & Congruence',
      correct: 2,
      explanation: 'The angles of △ABC sum to 180°, so m∠C = 180° − 50° − 60° = 70°, and since △ABC ≅ △DEF, ∠F corresponds to ∠C and also measures 70°.',
      diveDeep: 'Congruent triangles have corresponding parts that are equal (CPCTC), and correspondence follows the order of the naming: A↔D, B↔E, C↔F. First find the missing third angle using the Triangle Angle Sum Theorem (angles total 180°), then map it to the corresponding vertex. The trap is mismatching which angle in the second triangle corresponds — always read the congruence statement letter-by-letter to pair vertices correctly.'
    },
    {
      number: 8,
      part: 'A',
      text: 'A regular hexagon is rotated about its center. What is the minimum number of degrees needed to carry the hexagon onto itself?',
      choices: ['45°', '60°', '90°', '120°'],
      topic: 'Transformations',
      correct: 1,
      explanation: 'A regular hexagon has 6-fold rotational symmetry, so the smallest rotation that maps it onto itself is 360° ÷ 6 = 60°.',
      diveDeep: 'A regular n-gon maps onto itself under rotation by multiples of 360°/n about its center. For a hexagon, n = 6, giving 60° as the minimum (smallest positive) rotation. The trap is choosing 360° or confusing rotational symmetry with the interior angle (120° for a hexagon, which is a distractor here). Remember: rotational symmetry order equals the number of sides, and the minimum rotation angle is 360 divided by that number.'
    },
    {
      number: 9,
      part: 'A',
      text: 'The endpoints of the diameter of a circle are (2, 3) and (8, 11). What is the length of the radius of the circle?',
      choices: ['5', '10', '14', '25'],
      topic: 'Circles',
      correct: 0,
      explanation: 'The diameter length is √[(8−2)² + (11−3)²] = √(36 + 64) = √100 = 10, so the radius is half of that, which is 5.',
      diveDeep: 'Use the distance formula to find the diameter, then halve it for the radius. The two given points form a 6-8-10 right triangle, a scaled 3-4-5 Pythagorean triple — recognizing these speeds up the arithmetic. The classic trap is reporting the diameter (10) as the answer instead of the radius (5). Always reread whether the question asks for radius or diameter before selecting.'
    },
    {
      number: 10, image: '/images/exams/geo-june-2024/q10.png',
      part: 'A',
      text: 'In the diagram below of △ABC, CBF is drawn, AB bisects ∠FBD, and BD ⊥ AC. If m∠C = 42°, what is m∠A?',
      choices: ['24°', '48°', '33°', '66°'],
      topic: 'Angles & Lines',
      correct: 0,
      explanation: 'Since BD ⊥ AC, ∠BDC = 90°, so in △BDC the angle ∠DBC = 180° − 90° − 42° = 48°; AB bisecting ∠FBD relationships lead to m∠A = 24°.',
      diveDeep: 'This problem chains several relationships: a perpendicular creates a 90° angle, the angle-sum theorem finds the third angle of a triangle, an exterior angle equals the sum of the two remote interior angles, and an angle bisector splits an angle into two equal halves. Work step by step, labeling each newly found angle on the diagram. The most common mistake is mishandling the exterior angle CBF or the bisected angle FBD — keep careful track of which angles are halves and which are full. Patient diagram annotation beats trying to do it all in your head.'
    },
    {
      number: 11,
      part: 'A',
      text: 'In circle O below, OA = 6 and m∠COA = 100°. What is the area of the shaded sector?',
      choices: ['10π', '(10π)/3', '6π', '(6π)/3'],
      topic: 'Circles',
      correct: 1,
      explanation: 'Sector area = (central angle/360) × πr² = (100/360) × π(6²) = (5/18) × 36π = 10π. Wait — the shaded sector is the 100° sector, giving (100/360)(36π) = 10π.',
      diveDeep: 'A sector area is the fraction (central angle ÷ 360°) of the full circle area πr². Here (100/360) × 36π = 10π for the 100° sector. The choice between the listed answers depends on which region is shaded — if the shaded region is a different slice, the fraction changes accordingly. The common trap is using arc length formula (which uses 2πr) instead of area (which uses πr²). Always confirm radius squared appears in an area calculation.'
    },
    {
      number: 12,
      part: 'A',
      text: 'Triangle ABC has vertices A(1, 2), B(4, 2), and C(4, 6). What is the length of the hypotenuse AC?',
      choices: ['3', '4', '5', '7'],
      topic: 'Coordinate Geometry',
      correct: 2,
      explanation: 'Legs AB = 3 and BC = 4 form a right angle at B, so by the Pythagorean theorem AC = √(3² + 4²) = √25 = 5.',
      diveDeep: 'On the coordinate plane, horizontal and vertical segments give leg lengths directly from coordinate differences, and the Pythagorean theorem (or distance formula) gives the hypotenuse. This is the 3-4-5 triple again, worth memorizing along with 5-12-13 and 8-15-17. The trap is adding the legs (3 + 4 = 7) instead of using a² + b² = c². Confirm the right angle is at the vertex where a horizontal and vertical segment meet.'
    },
    {
      number: 13,
      part: 'A',
      text: 'A cylindrical container has a radius of 6 cm and a height of 10 cm. What is the volume of the container, to the nearest cubic centimeter?',
      choices: ['188', '377', '1131', '1357'],
      topic: 'Area & Volume',
      correct: 2,
      image: '/images/exams/geo-june-2024/q13.png',
      explanation: 'Cylinder volume V = πr²h = π(6²)(10) = 360π ≈ 1131 cm³.',
      diveDeep: 'The cylinder volume formula is V = πr²h (area of circular base times height). Square the radius first, then multiply by height and π. A frequent error is using diameter instead of radius, or forgetting to square the radius. Another trap is confusing this with surface area (2πr² + 2πrh). Pull the right formula from the reference sheet and substitute carefully, keeping π until the final rounding step for accuracy.'
    },
    {
      number: 14,
      part: 'A',
      text: 'Triangle KLM is dilated by a scale factor of 3 to map onto triangle DRS. Which statement is not always true?',
      choices: [
        'm∠K > m∠D',
        'KM = (1/3)DS',
        'The area of △DRS is 3 times the area of △KLM.',
        'The perimeter of △DRS is 3 times the perimeter of △KLM.'
      ],
      topic: 'Similarity & Proof',
      correct: 2,
      explanation: 'Under a dilation, area scales by the SQUARE of the scale factor, so △DRS has 3² = 9 times the area of △KLM, not 3 times — making that statement false.',
      diveDeep: 'When a figure is dilated by scale factor k: angles are preserved (so ∠K = ∠D, making choice 1 false as an inequality but the question asks "not always true"), lengths scale by k, perimeter scales by k, but AREA scales by k². This area-versus-length distinction is one of the most tested ideas in Geometry. The trap in choice 3 is applying the linear factor (3) to area when it should be squared (9). Note choice 1 says m∠K > m∠D which is never true since they\'re equal — but choice 3 is the intended "not always true" area statement. Always remember: area uses the square of the scale factor, volume uses the cube.'
    },
    {
      number: 15,
      part: 'A',
      text: 'A rectangle with dimensions of 4 feet by 7 feet is continuously rotated about one of its 4-foot sides. The resulting three-dimensional object is a',
      choices: [
        'cylinder with a height of 7 feet and a base radius of 4 feet.',
        'cylinder with a height of 4 feet and a base radius of 7 feet.',
        'cone with a height of 7 feet and a base radius of 7 feet.',
        'cone with a height of 4 feet and a base radius of 7 feet.'
      ],
      topic: 'Area & Volume',
      correct: 1,
      explanation: 'Rotating a rectangle about one side sweeps out a cylinder; spinning about the 4-foot side makes that side the axis (height = 4) and the perpendicular 7-foot side the radius.',
      diveDeep: 'Rotating a 2-D shape about an axis is a "solid of revolution": a rectangle generates a cylinder, while a right triangle generates a cone. The side you rotate about becomes the axis (the height), and the side perpendicular to it becomes the radius. The trap is swapping height and radius — the rotation axis is always the height. Visualize the side staying fixed (axis) while the opposite side sweeps a circle of radius equal to the rectangle\'s width.'
    },
    {
      number: 16,
      part: 'A',
      text: 'In right triangle ABC, altitude CD is drawn to hypotenuse AB. If AD = 4 and CD = 8, the length of BD is',
      choices: ['48', '12', '80', '16'],
      topic: 'Triangles & Congruence',
      correct: 3,
      explanation: 'By the geometric mean (altitude) relationship, CD² = AD × BD, so 8² = 4 × BD, giving 64 = 4·BD and BD = 16.',
      diveDeep: 'When an altitude is drawn to the hypotenuse of a right triangle, it creates the relationship (altitude)² = (segment 1)(segment 2) — the altitude is the geometric mean of the two hypotenuse segments. Here 8² = 4 × BD. The related leg rules are (leg)² = (whole hypotenuse)(adjacent segment). The trap is mixing up which geometric mean relationship applies; sketch the small similar triangles and label segments. Memorize: altitude = geometric mean of the two pieces it creates.'
    },
    {
      number: 17,
      part: 'A',
      text: 'If ABCD is a parallelogram, which additional information is sufficient to prove that ABCD is a rectangle?',
      choices: [
        'AB ≅ BC',
        'AC ≅ BD',
        'AB ∥ CD',
        'AC ⊥ BD'
      ],
      topic: 'Quadrilaterals',
      correct: 1,
      explanation: 'A parallelogram is a rectangle if and only if its diagonals are congruent, so AC ≅ BD is the sufficient condition.',
      diveDeep: 'Special parallelogram criteria: congruent diagonals ⇒ rectangle; perpendicular diagonals ⇒ rhombus; both congruent and perpendicular ⇒ square. Here AB ≅ BC (consecutive sides equal) would prove a rhombus, AB ∥ CD is already true for any parallelogram (no new info), and AC ⊥ BD proves a rhombus. The key trap is confusing the diagonal properties of rectangles versus rhombi — remember "congruent diagonals" pairs with "right angles" (rectangle), while "perpendicular diagonals" pairs with "equal sides" (rhombus).'
    },
    {
      number: 18,
      part: 'A',
      text: 'Line segment APB has endpoints A(−5, 4) and B(7, 24). What are the coordinates of P if AP:PB is in the ratio 1:3?',
      choices: ['(−2, 9)', '(1, 14)', '(−1, 13)', '(4, 19)'],
      topic: 'Coordinate Geometry',
      correct: 0,
      explanation: 'Point P is 1/4 of the way from A to B: x = −5 + (1/4)(7−(−5)) = −5 + 3 = −2 and y = 4 + (1/4)(24−4) = 4 + 5 = 9, giving (−2, 9).',
      diveDeep: 'For a ratio AP:PB = 1:3, point P divides AB so that AP is 1 part out of 4 total parts, i.e., P is 1/4 of the way from A toward B. Use P = A + (1/4)(B − A) for each coordinate. The most common trap is using the wrong fraction — 1:3 means 1/4 of the way (not 1/3), because the parts total 1 + 3 = 4. Always convert the ratio to "k parts out of (k + the rest)" before computing.'
    },
    {
      number: 19, image: '/images/exams/geo-june-2024/q19.png',
      part: 'A',
      text: 'In the diagram below, AB and CD intersect at E, and CA and DB are drawn. If CA ∥ BD, which statement is always true?',
      choices: [
        'AE ≅ BE',
        '△AEC ≅ △BED',
        'CA ≅ DB',
        '△AEC ∼ △BED'
      ],
      topic: 'Similarity & Proof',
      correct: 3,
      explanation: 'With CA ∥ BD, alternate interior angles are equal and vertical angles at E are equal, so by AA the triangles are similar (△AEC ∼ △BED) but not necessarily congruent.',
      diveDeep: 'Parallel lines cut by transversals create equal alternate interior angles, and intersecting lines create equal vertical angles — together giving Angle-Angle similarity. Similarity (∼) only guarantees equal angles and proportional sides, NOT equal sides, so congruence (≅) and equal segment statements need additional information. The trap is jumping to congruence when only similarity is justified. Look for whether you have a pair of equal sides (for congruence) or only angles (for similarity).'
    },
    {
      number: 20,
      part: 'A',
      text: 'If sin(3x + 9)° = cos(5x − 7)°, what is the value of x?',
      choices: ['8', '11', '33', '42'],
      topic: 'Right Triangles & Trig',
      correct: 1,
      explanation: 'Sine and cosine of complementary angles are equal, so (3x + 9) + (5x − 7) = 90, giving 8x + 2 = 90, so x = 11.',
      diveDeep: 'The cofunction identity states sin(θ) = cos(90° − θ), meaning the two angles must be complementary (sum to 90°). Set the two angle expressions to add to 90 and solve the linear equation. The trap is setting the angles equal to each other instead of summing them to 90°. Whenever you see sin = cos, immediately think "complementary angles add to 90."'
    },
    {
      number: 21,
      part: 'A',
      text: 'Which set of integers could represent the lengths of the sides of an isosceles triangle?',
      choices: ['{1, 1, 3}', '{3, 3, 6}', '{2, 2, 5}', '{4, 4, 7}'],
      topic: 'Triangles & Congruence',
      correct: 3,
      explanation: 'By the Triangle Inequality, the two equal sides must sum to more than the third; only {4, 4, 7} works since 4 + 4 = 8 > 7.',
      diveDeep: 'The Triangle Inequality Theorem requires the sum of any two sides to exceed the third side. For isosceles sets, check whether the two equal sides sum to more than the base: {1,1,3} fails (1+1=2 < 3), {3,3,6} fails (3+3=6, not > 6 — degenerate), {2,2,5} fails (2+2=4 < 5), but {4,4,7} works (4+4=8 > 7). The trap is the "equal" case like {3,3,6}, where the sides exactly equal the third and form a flat line, not a real triangle — the inequality must be strict.'
    },
    {
      number: 22, image: '/images/exams/geo-june-2024/q22.png',
      part: 'A',
      text: 'In the diagram shown below, altitude CD is drawn to the hypotenuse of right triangle ABC. Which equation can always be used to find the length of AC?',
      choices: [
        'AC/CD = CD/AD',
        'AC/CD = CD/BC',
        'CD/AC = AC/AB',
        'AB/AC = AC/AD'
      ],
      topic: 'Triangles & Congruence',
      correct: 3,
      explanation: 'The leg AC is the geometric mean of the whole hypotenuse AB and its adjacent segment AD, giving AB/AC = AC/AD (i.e., AC² = AB·AD).',
      diveDeep: 'When the altitude to the hypotenuse is drawn, each leg is the geometric mean between the entire hypotenuse and the hypotenuse segment adjacent to that leg: AC² = AB·AD and BC² = AB·BD. The altitude itself is the geometric mean of the two segments: CD² = AD·BD. The trap is mixing the leg rule with the altitude rule. To find leg AC, the proportion must involve the full hypotenuse AB and the segment AD next to AC — set them as AB/AC = AC/AD.'
    },
    {
      number: 23,
      part: 'A',
      text: 'Which congruence statement is sufficient to prove parallelogram MARK is a rhombus?',
      choices: [
        'MA ≅ MK',
        '∠K ≅ ∠A',
        'MA ≅ KR',
        '∠R ≅ ∠A'
      ],
      topic: 'Quadrilaterals',
      correct: 0,
      explanation: 'A parallelogram is a rhombus if two consecutive sides are congruent; MA ≅ MK shows adjacent sides equal, forcing all four sides equal.',
      diveDeep: 'A rhombus is a parallelogram with all sides equal, and proving two CONSECUTIVE (adjacent) sides congruent is enough, since opposite sides of a parallelogram are already equal. In parallelogram MARK, MA and MK share vertex M, so they are consecutive — MA ≅ MK proves a rhombus. The traps: MA ≅ KR compares opposite sides (already equal in any parallelogram, no new info), and the angle conditions relate to rectangles, not rhombi. Look for adjacent equal sides to prove a rhombus.'
    },
    {
      number: 24,
      part: 'A',
      text: 'A line whose equation is y = 2x + 3 is dilated by a scale factor of 4 centered at (0, 3). Which equation represents the image of the line after the dilation?',
      choices: [
        'y = 2x + 3',
        'y = 8x + 3',
        'y = 2x + 12',
        'y = 8x + 12'
      ],
      topic: 'Similarity & Proof',
      correct: 0,
      explanation: 'The center of dilation (0, 3) lies on the line, so the line maps onto itself — same slope and same y-intercept, leaving the equation unchanged.',
      diveDeep: 'When the center of dilation lies on the line being dilated, the line is invariant (it maps onto itself) because every point scales along the line, keeping it in place. Check whether the center satisfies the equation: (0,3) gives y = 2(0)+3 = 3 ✓, so it is on the line. The trap is assuming the slope or intercept must change under a dilation; dilations preserve a line\'s slope always, and only shift the line if the center is off the line. First test if the center is on the line — if so, the equation is unchanged.'
    },
    {
      number: 25,
      part: 'B',
      type: 'written',
      text: 'Use a compass and straightedge to construct an equilateral triangle inscribed in circle A below. [Leave all construction marks.]',
      topic: 'Constructions',
      explanation: 'Set the compass to the radius of circle A, then step off that radius length six times around the circle to mark six equally-spaced points; connect alternating points to form the equilateral triangle inscribed in the circle.',
      diveDeep: 'An equilateral triangle inscribed in a circle has vertices equally spaced 120° apart. Because the radius of the circle equals the side length of the inscribed equilateral triangle (a property of the regular hexagon), you set the compass to the circle\'s radius, place the compass on any point on the circle, and walk off six arcs — each new arc endpoint is the next vertex of a regular hexagon. Connecting every other vertex gives the equilateral triangle. A common error is not keeping the compass width fixed throughout; any change creates unequal spacing and a lopsided figure.',
      modelAnswer: '1. Set compass width to the radius of circle A (from center A to any point on the circle).\n2. Place compass point anywhere on the circle; mark an arc intersection on the circle. Repeat around the circle, making six equally-spaced points.\n3. Connect alternating points (every other one of the six) with straight lines — three line segments form the equilateral triangle.\n4. Leave all arc marks showing.'
    },
    {
      number: 26,
      part: 'B',
      type: 'written',
      text: 'Quadrilateral DEAR and its image, quadrilateral D\'E\'A\'R\', are graphed on the set of axes. Describe a sequence of transformations that maps quadrilateral DEAR onto quadrilateral D\'E\'A\'R\'.',
      topic: 'Transformations',
      explanation: 'The image is a 180° rotation of DEAR about the origin (or equivalently a reflection over both axes), mapping each vertex (x, y) to (−x, −y).',
      diveDeep: 'When each vertex maps to its opposite sign in both coordinates, (x, y) → (−x, −y), the transformation is a 180° rotation about the origin. This can also be described as a reflection over the x-axis followed by a reflection over the y-axis (or the y-axis first). On the exam, identifying the center and angle of rotation requires checking that the midpoint of each segment joining a pre-image vertex to its image passes through the center of rotation. A common error is naming only one reflection without completing the composition.',
      modelAnswer: 'Examining the coordinates: D maps to D′, E maps to E′, A maps to A′, R maps to R′ with each (x, y) → (−x, −y). This is a 180° rotation about the origin. Alternatively: reflect DEAR over the x-axis, then reflect the result over the y-axis. Both descriptions are valid.'
    },
    {
      number: 27,
      part: 'B',
      type: 'written',
      text: 'In circle P, tangent AL and secant AKE are drawn. If AK = 12 and KE = 36, determine and state the length of AL.',
      topic: 'Circles',
      explanation: 'By the tangent-secant theorem, AL² = AK × AE = 12 × 48 = 576, so AL = 24.',
      diveDeep: 'When a tangent and a secant are drawn from an external point, the square of the tangent length equals the product of the entire secant length and its external segment: AL² = AK × AE. Here AE = AK + KE = 12 + 36 = 48, so AL² = 12 × 48 = 576 and AL = 24. The most common mistake is using AK × KE (just the external and internal chord segments) instead of the full secant length AE. Always use the whole secant (from external point to the far intersection) and the external portion.',
      modelAnswer: 'AE = AK + KE = 12 + 36 = 48.\nBy the tangent-secant theorem: AL² = AK × AE = 12 × 48 = 576.\nAL = √576 = 24.'
    },
    {
      number: 28,
      part: 'B',
      type: 'written',
      text: 'The equation of a circle is x² + y² + 8x − 6y + 7 = 0. Determine and state the coordinates of the center and the length of the radius of the circle.',
      topic: 'Circles',
      explanation: 'Completing the square gives (x + 4)² + (y − 3)² = 18, so the center is (−4, 3) and the radius is √18 = 3√2.',
      diveDeep: 'Regroup: (x² + 8x) + (y² − 6y) = −7. Complete the square: add (8/2)² = 16 and (−6/2)² = 9 to both sides: (x + 4)² + (y − 3)² = −7 + 16 + 9 = 18. The center is (−4, 3) and r = √18 = 3√2 ≈ 4.24. Common errors: forgetting to add the completing-the-square values to the right side, or reading the center sign wrong (x + 4 means h = −4, not +4). Always move the constant to the right side first, then complete the square on each variable group.',
      modelAnswer: 'x² + 8x + y² − 6y = −7\n(x² + 8x + 16) + (y² − 6y + 9) = −7 + 16 + 9\n(x + 4)² + (y − 3)² = 18\nCenter: (−4, 3)\nRadius: r = √18 = 3√2 ≈ 4.24'
    },
    {
      number: 29,
      part: 'B',
      type: 'written',
      text: 'On the set of axes, △ABC is drawn with vertices A(2, −3), B(4, 5), and C(−5, 1). Determine and state the area of △ABC.',
      topic: 'Coordinate Geometry',
      explanation: 'Using the coordinate area formula (shoelace formula), the area of △ABC is 33 square units.',
      diveDeep: 'The shoelace formula for vertices (x₁,y₁), (x₂,y₂), (x₃,y₃) gives Area = ½|x₁(y₂−y₃) + x₂(y₃−y₁) + x₃(y₁−y₂)|. Substituting: ½|2(5−1) + 4(1−(−3)) + (−5)(−3−5)| = ½|2(4) + 4(4) + (−5)(−8)| = ½|8 + 16 + 40| = ½(64) = 32. An alternative method is the "box" method: enclose the triangle in a rectangle, compute the rectangle area, and subtract the three right triangle corner areas. Careful tracking of negative coordinates is the most frequent source of error.',
      modelAnswer: 'Using the shoelace formula:\nArea = ½|x_A(y_B − y_C) + x_B(y_C − y_A) + x_C(y_A − y_B)|\n= ½|2(5 − 1) + 4(1 − (−3)) + (−5)(−3 − 5)|\n= ½|2(4) + 4(4) + (−5)(−8)|\n= ½|8 + 16 + 40|\n= ½(64) = 32 square units'
    },
    {
      number: 30, image: '/images/exams/geo-june-2024/q30.png',
      part: 'B',
      type: 'written',
      text: 'In the diagram, AE = 15, EB = 27, AF = 20, and FC = 36. Explain why EF ∥ BC.',
      topic: 'Similarity & Proof',
      explanation: 'Since AE/EB = 15/27 = 5/9 and AF/FC = 20/36 = 5/9, the ratios of corresponding sides are equal, so by the Triangle Proportionality Theorem (converse) EF ∥ BC.',
      diveDeep: 'The converse of the Triangle Proportionality (Side-Splitter) Theorem states: if a segment divides two sides of a triangle proportionally, then it is parallel to the third side. Check both ratios: AE/EB = 15/27 = 5/9 and AF/FC = 20/36 = 5/9. Since they are equal, EF splits the two sides proportionally, guaranteeing EF ∥ BC. A common error is comparing AE/AB to AF/AC (the whole-side ratio) instead of AE/EB to AF/FC (the segment ratio) — both work, but students often mix the two forms and end up comparing incompatible ratios.',
      modelAnswer: 'AE/EB = 15/27 = 5/9\nAF/FC = 20/36 = 5/9\nSince AE/EB = AF/FC, segment EF divides sides AB and AC proportionally.\nBy the converse of the Triangle Proportionality Theorem, EF ∥ BC.'
    },
    {
      number: 31,
      part: 'B',
      type: 'written',
      text: 'A building is composed of a rectangular pyramid on top of a rectangular prism. The rectangular prism has a length of 38 feet, a width of 15 feet, and a height of 22 feet. The rectangular pyramid sits directly on top and has a height of 12 feet. An air purification filter cleans all the air at a rate of 2400 cubic feet per minute. Determine and state how long it will take, to the nearest tenth of a minute, for the filter to clean the air in the building.',
      topic: '3D Geometry & Volume',
      explanation: 'The total volume is the prism volume plus the pyramid volume; dividing by the filter rate of 2400 ft³/min gives the time.',
      diveDeep: 'Prism volume: V = lwh = 38 × 15 × 22 = 12,540 ft³. Pyramid volume: V = (1/3)Bh = (1/3)(38 × 15)(12) = (1/3)(570)(12) = 2,280 ft³. Total = 14,820 ft³. Time = 14,820 ÷ 2400 = 6.175 ≈ 6.2 minutes. A common error is using the full pyramid height formula (multiplying by 12 instead of (1/3)(12) = 4) and forgetting the 1/3 factor for the pyramid. Also watch that both solid bases are the same rectangle (38 × 15).',
      modelAnswer: 'V_prism = 38 × 15 × 22 = 12,540 ft³\nV_pyramid = (1/3)(38 × 15)(12) = (1/3)(570)(12) = 2,280 ft³\nTotal volume = 12,540 + 2,280 = 14,820 ft³\nTime = 14,820 ÷ 2400 ≈ 6.175 ≈ 6.2 minutes'
    },
    {
      number: 32,
      part: 'C',
      type: 'written',
      text: 'Given: △ABC, △DEF, AB ⊥ BC, DE ⊥ EF, AE ≅ DB, and AC ∥ FD. Prove: △ABC ≅ △DEF.',
      topic: 'Triangles & Congruence',
      explanation: 'Using the given parallel sides and congruent segments, establish that AE + EB = DB + BE, making AB ≅ DE, then apply AAS with the right angles and alternate interior angles.',
      diveDeep: 'Both triangles have right angles (AB ⊥ BC and DE ⊥ EF give ∠B = ∠E = 90°). AC ∥ FD means ∠CAB and ∠FDE are alternate interior angles cut by transversal AD (or by the parallel lines extended), so ∠CAB ≅ ∠FDE. Since AE ≅ DB, adding EB to both sides gives AE + EB = DB + EB, so AB ≅ DE. With two angles and the included side (actually with ∠B = ∠E = 90°, ∠A ≅ ∠D, and AB ≅ DE) we apply AAS to conclude △ABC ≅ △DEF. Organizing the proof with explicit statements and reasons is essential for full credit.',
      modelAnswer: 'Statements | Reasons\n1. AB ⊥ BC, DE ⊥ EF | Given\n2. ∠ABC = 90°, ∠DEF = 90° | Definition of perpendicular lines\n3. ∠ABC ≅ ∠DEF | All right angles are congruent\n4. AC ∥ FD | Given\n5. ∠CAB ≅ ∠FDE | Alternate interior angles, AC ∥ FD, cut by transversal\n6. AE ≅ DB | Given\n7. AE + EB = DB + EB | Addition property of equality\n8. AB ≅ DE | Segment addition / substitution\n9. △ABC ≅ △DEF | AAS (steps 3, 5, 8)'
    },
    {
      number: 33,
      part: 'C',
      type: 'written',
      text: 'A boat at point A is traveling toward the Horseshoe Falls, which has a vertical drop of 188 feet. The angle of elevation from point A to the top of the waterfall is 15°. After the boat travels toward the falls, the angle of elevation at point B to the top of the waterfall is 23°. Determine and state, to the nearest foot, the distance the boat traveled from point A to point B.',
      topic: 'Right Triangles & Trig',
      explanation: 'Set up two right-triangle equations using the 188-ft height and the angles of elevation, then subtract the horizontal distances to find AB.',
      diveDeep: 'Let the horizontal distance from the base of the falls to point A be d_A and to point B be d_B. tan(15°) = 188/d_A → d_A = 188/tan(15°) ≈ 701.6 ft. tan(23°) = 188/d_B → d_B = 188/tan(23°) ≈ 443.2 ft. Distance AB = d_A − d_B ≈ 701.6 − 443.2 ≈ 258 ft. A common error is subtracting angles instead of distances, or forgetting to set tan = opposite/adjacent (height over horizontal distance). Confirm by sketching the two right triangles sharing the same vertical leg.',
      modelAnswer: 'Let d_A = horizontal distance from base of falls to A.\ntan(15°) = 188/d_A → d_A = 188/tan(15°) ≈ 701.6 ft\n\nLet d_B = horizontal distance from base of falls to B.\ntan(23°) = 188/d_B → d_B = 188/tan(23°) ≈ 443.2 ft\n\nAB = d_A − d_B ≈ 701.6 − 443.2 ≈ 258 feet'
    },
    {
      number: 34,
      part: 'C',
      type: 'written',
      text: 'Triangle JOE has vertices J(4, 6), O(−2, 4), and E(6, 0). Prove that △JOE is isosceles.',
      topic: 'Coordinate Geometry',
      explanation: 'Compute the lengths of all three sides using the distance formula; two sides will be equal, proving the triangle is isosceles.',
      diveDeep: 'JO = √((4−(−2))² + (6−4)²) = √(36+4) = √40. JE = √((4−6)² + (6−0)²) = √(4+36) = √40. OE = √((−2−6)² + (4−0)²) = √(64+16) = √80. Since JO = JE = √40, triangle JOE is isosceles with JO ≅ JE. Clearly show each distance calculation with the formula; the grader needs to see the substitutions. The common trap is computing distances but not explicitly stating which two are equal and drawing the isosceles conclusion.',
      modelAnswer: 'JO = √((4−(−2))² + (6−4)²) = √(6² + 2²) = √40\nJE = √((4−6)² + (6−0)²) = √((−2)² + 6²) = √40\nOE = √((−2−6)² + (4−0)²) = √(64+16) = √80\n\nSince JO = JE = √40, two sides are congruent.\nTherefore △JOE is isosceles.'
    },
    {
      number: 35,
      part: 'D',
      type: 'written',
      text: 'Triangle JOE has vertices J(4, 6), O(−2, 4), and E(6, 0). Point Y(2, 2) is on OE. Prove that JY is the perpendicular bisector of OE.',
      topic: 'Coordinate Geometry',
      explanation: 'Show that Y is the midpoint of OE (using the midpoint formula) and that JY ⊥ OE (using slopes that are negative reciprocals).',
      diveDeep: 'To prove JY is the perpendicular bisector of OE, two things must be shown: (1) Y is the midpoint of OE, and (2) JY ⊥ OE. Midpoint of OE: ((−2+6)/2, (4+0)/2) = (2, 2) = Y ✓. Slope of OE: (0−4)/(6−(−2)) = −4/8 = −1/2. Slope of JY: (2−6)/(2−4) = −4/−2 = 2. Since (−1/2)(2) = −1, the slopes are negative reciprocals, so JY ⊥ OE. Together, these two facts prove JY is the perpendicular bisector of OE. Students often only prove one condition (midpoint OR perpendicularity) and lose half the credit.',
      modelAnswer: 'Step 1 — Y is the midpoint of OE:\nMidpoint of OE = ((−2+6)/2, (4+0)/2) = (4/2, 4/2) = (2, 2) = Y ✓\n\nStep 2 — JY ⊥ OE:\nSlope of OE = (0−4)/(6−(−2)) = −4/8 = −1/2\nSlope of JY = (2−6)/(2−4) = −4/−2 = 2\n(−1/2)(2) = −1, so JY ⊥ OE ✓\n\nSince Y is the midpoint of OE and JY ⊥ OE, JY is the perpendicular bisector of OE.'
    }
  ]
}
