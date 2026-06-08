// Geometry Regents — June 2021 (Part I: Multiple Choice)
export default {
  id: 'geo-jun-2021',
  subject: 'geometry',
  year: 2021,
  session: 'June',
  totalMinutes: 180,
  questions: [
    {
      number: 1,
      part: 'A',
      text: 'Two triangles are congruent. One has angles 40°, 60°, and 80°. Which must be true of the other triangle?',
      choices: [
        'It has sides 40, 60, and 80',
        'Its angles are also 40°, 60°, and 80°',
        'It has area equal to the original',
        'Both B and C'
      ],
      topic: 'Congruence & Transformations',
      correct: 3,
      explanation: 'Congruent triangles have all corresponding angles and sides equal, so the other triangle must have the same angle measures AND the same area.',
      diveDeep: 'Congruence means all six corresponding parts (3 sides and 3 angles) are equal. The CPCTC theorem (Corresponding Parts of Congruent Triangles are Congruent) guarantees both angle measures and side lengths match. Because the triangles are identical in shape and size, their areas are also equal. A common mistake is to think only sides or only angles are guaranteed — but congruence gives you everything. Choice A is wrong because 40, 60, 80 would be side lengths, not angles.'
    },
    {
      number: 2,
      part: 'A',
      text: 'In a right triangle, the altitude from the right angle to the hypotenuse has length 6. The two segments of the hypotenuse are 4 and x. What is x?',
      choices: ['6', '7', '8', '9'],
      topic: 'Similarity & Proof',
      correct: 3,
      explanation: 'The geometric mean relationship states that the altitude² equals the product of the two hypotenuse segments: 6² = 4 · x, so 36 = 4x and x = 9.',
      diveDeep: 'When an altitude is drawn from the right angle to the hypotenuse, it creates two smaller triangles that are each similar to the original and to each other. The key relationship is: (altitude)² = (segment 1) × (segment 2). Here 6² = 4 · x gives x = 9. Also note that each leg equals the geometric mean of the hypotenuse and the adjacent segment. A common error is applying the Pythagorean theorem instead of the geometric mean theorem.'
    },
    {
      number: 3,
      part: 'A',
      text: 'What is the measure of an arc intercepted by an inscribed angle of 35°?',
      choices: ['17.5°', '35°', '70°', '145°'],
      topic: 'Circles',
      correct: 2,
      explanation: 'An inscribed angle equals half the intercepted arc, so the arc measures 2 × 35° = 70°.',
      diveDeep: 'The Inscribed Angle Theorem states that an inscribed angle is half the central angle that intercepts the same arc, and therefore half the arc measure. This is one of the most frequently tested circle theorems. Do not confuse inscribed angles with central angles — a central angle equals the arc directly. Also remember that two inscribed angles intercepting the same arc are congruent, a useful corollary for proving triangles similar inside circles.'
    },
    {
      number: 4,
      part: 'A',
      text: 'What is the slope of the line connecting (−4, 2) and (2, −4)?',
      choices: ['1', '−1', '2', '−2'],
      topic: 'Coordinate Geometry',
      correct: 1,
      explanation: 'Slope = (−4 − 2) / (2 − (−4)) = −6 / 6 = −1.',
      diveDeep: 'The slope formula is m = (y₂ − y₁) / (x₂ − x₁). Always subtract in the same order for both numerator and denominator. A slope of −1 means for every unit you move right you move one unit down — this line makes a 45° angle with the x-axis going downward. Lines with slope −1 are perpendicular to lines with slope 1. Watch for sign errors, which are the most common mistakes on slope problems.'
    },
    {
      number: 5,
      part: 'A',
      text: 'A right cylinder with radius 5 and height 8 is filled with water. If the water is poured into a cube with side 10, what fraction of the cube is filled?',
      choices: ['π/5', '2π/5', 'π/4', '5π/8'],
      topic: '3D Geometry & Volume',
      correct: 0,
      explanation: 'Cylinder volume = π(5²)(8) = 200π. Cube volume = 10³ = 1000. Fraction = 200π / 1000 = π/5.',
      diveDeep: 'This problem tests two volume formulas: V_cylinder = πr²h and V_cube = s³. The fraction is found by dividing one volume by the other. Note that since π ≈ 3.14, the fraction π/5 ≈ 0.628, so about 63% of the cube is filled — a reasonable answer. A common mistake is forgetting to square the radius when computing cylinder volume. Always double-check that you are dividing the smaller volume by the larger one to get a fraction less than 1.'
    },
    {
      number: 6,
      part: 'A',
      text: 'In △ABC with right angle at C, if ∠A = 28°, which expression gives side AB if BC = 15?',
      choices: ['15/sin(28°)', '15 sin(28°)', '15/cos(28°)', '15 cos(28°)'],
      topic: 'Trigonometry',
      correct: 0,
      explanation: 'sin(28°) = opposite/hypotenuse = BC/AB = 15/AB, so AB = 15/sin(28°).',
      diveDeep: 'SOH-CAH-TOA: sin = opposite/hypotenuse. With ∠A = 28°, BC is opposite to A and AB is the hypotenuse. Setting up sin(28°) = 15/AB and solving gives AB = 15/sin(28°). A common error is using cos or confusing which side is opposite vs. adjacent. Always draw and label the triangle before applying trig ratios. Note that AB is the hypotenuse, so it must be longer than either leg.'
    },
    {
      number: 7,
      part: 'A',
      text: 'Which property is preserved under a dilation but NOT preserved under all rigid motions?',
      choices: ['Angle measure', 'Side length ratios', 'Distance between points', 'Orientation'],
      topic: 'Congruence & Transformations',
      correct: 1,
      explanation: 'A dilation changes the size of a figure but preserves angle measures and side length ratios (shape), whereas rigid motions preserve actual distances.',
      diveDeep: 'Rigid motions (reflections, rotations, translations) preserve distance, angle measure, and shape. A dilation multiplies all lengths by a scale factor k but does NOT preserve individual distances unless k = 1. However, it does preserve angle measures and the ratios of corresponding side lengths. This is why dilations produce similar figures. A key exam concept: dilation preserves shape (proportionality) but not size. Side length ratios are preserved in similarity, not congruence.'
    },
    {
      number: 8,
      part: 'A',
      text: 'In △ABC, ∠A = 70° and ∠C = 40°. The side opposite ∠A is 18. What is the length of the side opposite ∠C?',
      choices: ['18 sin(40°)/sin(70°)', '18 sin(70°)/sin(40°)', '18 sin(40°)/sin(50°)', '18 sin(70°)/sin(50°)'],
      topic: 'Similarity & Proof',
      correct: 0,
      explanation: 'By the Law of Sines, a/sin(A) = c/sin(C), so c = 18 · sin(40°)/sin(70°).',
      diveDeep: 'The Law of Sines states a/sin(A) = b/sin(B) = c/sin(C). To find the side opposite ∠C, set up the proportion c/sin(40°) = 18/sin(70°), and solve for c = 18 sin(40°)/sin(70°). Always identify which angle is opposite which side before setting up the ratio. A common error is swapping the sine values in the ratio. The Law of Sines is especially useful when you know two angles and a side (AAS or ASA).'
    },
    {
      number: 9,
      part: 'A',
      text: 'A circle has center (3, −1). A tangent is drawn at the point (7, −1). What is the equation of the tangent line?',
      choices: ['x = 7', 'y = −1', 'y = x − 8', 'x + y = 6'],
      topic: 'Circles',
      correct: 0,
      explanation: 'The radius to (7, −1) is horizontal (both points have y = −1), so the tangent, being perpendicular to the radius, is the vertical line x = 7.',
      diveDeep: 'A tangent to a circle is perpendicular to the radius at the point of tangency. The radius from (3, −1) to (7, −1) is horizontal with slope 0. A line perpendicular to a horizontal line is vertical, so the tangent is x = 7. If the radius had a non-zero slope m, the tangent would have slope −1/m (negative reciprocal). Always find the slope of the radius first to determine the tangent slope.'
    },
    {
      number: 10,
      part: 'A',
      text: 'The point (3, 4) is reflected over the line y = 2. What are the new coordinates?',
      choices: ['(3, 0)', '(3, −2)', '(3, −4)', '(1, 4)'],
      topic: 'Coordinate Geometry',
      correct: 0,
      explanation: 'The point is 2 units above y = 2, so its reflection is 2 units below y = 2, giving (3, 0).',
      diveDeep: 'To reflect over a horizontal line y = k, keep the x-coordinate unchanged and replace y with 2k − y. Here y = 2, so new y = 2(2) − 4 = 0, giving (3, 0). For reflection over a vertical line x = k, use 2k − x for the x-coordinate and keep y the same. A common mistake is reflecting over y = 0 (the x-axis) instead of y = 2. Always measure the perpendicular distance from the point to the mirror line and go the same distance on the other side.'
    },
    {
      number: 11,
      part: 'A',
      text: 'What is the volume of a pyramid with a rectangular base 8 × 6 and height 5?',
      choices: ['60', '80', '90', '120'],
      topic: '3D Geometry & Volume',
      correct: 1,
      explanation: 'V = (1/3) × base area × height = (1/3) × (8 × 6) × 5 = (1/3) × 48 × 5 = 80.',
      diveDeep: 'The volume formula for any pyramid is V = (1/3)Bh, where B is the base area and h is the perpendicular height. This factor of 1/3 distinguishes pyramids from prisms (V = Bh). The base area here is 8 × 6 = 48, so V = (1/3)(48)(5) = 80. A common error is forgetting the 1/3 factor, which would give 240. The same formula applies to cones, with B = πr².'
    },
    {
      number: 12,
      part: 'A',
      text: 'In a right triangle, if one leg is 5 and the hypotenuse is 13, what is tan of the acute angle opposite the leg of length 5?',
      choices: ['5/13', '12/13', '5/12', '12/5'],
      topic: 'Trigonometry',
      correct: 2,
      explanation: 'The other leg = √(13² − 5²) = √(169 − 25) = √144 = 12. tan = opposite/adjacent = 5/12.',
      diveDeep: 'First find the missing leg using the Pythagorean theorem: a² + b² = c², so 5² + b² = 13², giving b = 12. This is the classic 5-12-13 Pythagorean triple. For the angle opposite the leg of length 5: tan = opposite/adjacent = 5/12. A common mistake is using 5/13 (which is sin) or 12/13 (which is cos). Remember: SOH = sin = opp/hyp, CAH = cos = adj/hyp, TOA = tan = opp/adj.'
    },
    {
      number: 13,
      part: 'A',
      text: 'A rotation of 90° clockwise about the origin maps (x, y) to',
      choices: ['(−y, x)', '(y, −x)', '(−x, −y)', '(−y, −x)'],
      topic: 'Congruence & Transformations',
      correct: 1,
      explanation: 'A 90° clockwise rotation maps (x, y) to (y, −x).',
      diveDeep: 'Memorize the four standard rotation rules about the origin: 90° counterclockwise: (x, y) → (−y, x); 90° clockwise (or 270° CCW): (x, y) → (y, −x); 180°: (x, y) → (−x, −y); 270° CCW (or 90° CW): same as 90° clockwise. A helpful check: apply the rule to (1, 0); a 90° clockwise rotation should send it to (0, −1), which matches (y, −x) = (0, −1). These rules are frequently tested on the Regents.'
    },
    {
      number: 14,
      part: 'A',
      text: 'Two triangles are proven similar by SAS~. What must be true?',
      choices: [
        'Three pairs of proportional sides',
        'Two pairs of proportional sides and the included angle congruent',
        'Two congruent angles',
        'Two sides equal and one angle equal'
      ],
      topic: 'Similarity & Proof',
      correct: 1,
      explanation: 'SAS~ (Side-Angle-Side Similarity) requires two pairs of proportional sides with the included angle congruent between them.',
      diveDeep: 'The three similarity criteria are: AA (two pairs of congruent angles), SAS~ (two pairs of proportional sides with the included angle congruent), and SSS~ (all three pairs of sides proportional). SAS~ specifically requires the angle to be between the two proportional sides — this is the "included" angle. A common confusion is between SAS congruence (sides equal) and SAS~ similarity (sides proportional). AA is usually the easiest to apply in proofs because you only need two angles.'
    },
    {
      number: 15,
      part: 'A',
      text: 'A secant and a tangent are drawn from the same external point. The tangent length is 6 and the secant has an external segment of 3. What is the length of the entire secant?',
      choices: ['9', '12', '15', '18'],
      topic: 'Circles',
      correct: 1,
      explanation: 'Tangent² = external segment × whole secant: 6² = 3 × whole, so 36 = 3 × whole, giving whole secant = 12.',
      diveDeep: 'The tangent-secant relationship from an external point is: (tangent)² = (external segment) × (whole secant). Here 6² = 36 = 3 × whole, so the whole secant is 12. This means the chord inside the circle has length 12 − 3 = 9. A related rule is the secant-secant rule: (ext₁)(whole₁) = (ext₂)(whole₂). These power-of-a-point theorems are all derived from similar triangles formed by the intersecting lines and chords.'
    },
    {
      number: 16,
      part: 'A',
      text: 'What is the equation of the line that is the perpendicular bisector of the segment joining (0, 4) and (6, 0)?',
      choices: ['y = (3/2)x − (5/2)', 'y = (3/2)x − 1', 'y = −(2/3)x + 4', 'y = (3/2)x − 7/2'],
      topic: 'Coordinate Geometry',
      correct: 0,
      explanation: 'Midpoint = (3, 2); slope of segment = (0−4)/(6−0) = −2/3; perpendicular slope = 3/2; line: y − 2 = (3/2)(x − 3), which simplifies to y = (3/2)x − 5/2.',
      diveDeep: 'To find a perpendicular bisector: (1) find the midpoint of the segment, (2) find the slope of the segment, (3) take the negative reciprocal for the perpendicular slope, (4) write the equation using point-slope form through the midpoint. The midpoint of (0,4) and (6,0) is (3,2). The segment slope is −2/3, so the perpendicular slope is 3/2. Using point-slope: y − 2 = (3/2)(x − 3) = (3/2)x − 9/2, so y = (3/2)x − 5/2. Every point on this line is equidistant from the two endpoints.'
    },
    {
      number: 17,
      part: 'A',
      text: 'A solid is formed by rotating a rectangle of width 3 and height 5 about one of its longer sides. What type of solid is formed?',
      choices: ['Sphere', 'Cylinder', 'Cone', 'Prism'],
      topic: '3D Geometry & Volume',
      correct: 1,
      explanation: 'Rotating a rectangle about one of its sides sweeps out a cylinder with radius equal to the width (3) and height equal to the longer side (5).',
      diveDeep: 'When a 2D figure is rotated about an axis (a line), it generates a 3D solid of revolution. Rotating a rectangle about a side generates a cylinder; rotating a right triangle about a leg generates a cone; rotating a semicircle about its diameter generates a sphere. Here the rectangle has width 3 (perpendicular distance from the axis) and height 5 (along the axis), producing a cylinder with r = 3 and h = 5. This concept connects 2D and 3D geometry and appears often in Regents questions about volume of revolution.'
    },
    {
      number: 18,
      part: 'A',
      text: 'An isosceles right triangle has legs of length 7. What is the exact length of the hypotenuse?',
      choices: ['7', '7√2', '7√3', '14'],
      topic: 'Trigonometry',
      correct: 1,
      explanation: 'By the Pythagorean theorem: hypotenuse = √(7² + 7²) = √98 = 7√2.',
      diveDeep: 'An isosceles right triangle (45-45-90 triangle) has legs in ratio 1:1:√2 with the hypotenuse. If each leg is 7, the hypotenuse is 7√2 ≈ 9.9. This is one of two special right triangles to memorize: 45-45-90 (legs: leg: leg√2) and 30-60-90 (sides: x : x√3 : 2x). These ratios let you find all sides without trigonometry or the Pythagorean theorem. A common error is choosing 14, which would be the diameter of a circle with radius 7, not the hypotenuse here.'
    },
    {
      number: 19,
      part: 'A',
      text: 'If a figure undergoes a translation and then a rotation, the result is a(n)',
      choices: ['Enlargement', 'Isometry', 'Dilation', 'Reflection'],
      topic: 'Congruence & Transformations',
      correct: 1,
      explanation: 'Both translations and rotations are rigid motions (isometries) that preserve size and shape, so the composition is also an isometry.',
      diveDeep: 'An isometry is a transformation that preserves all distances and angles — the image is congruent to the pre-image. The three rigid motions (translations, rotations, reflections) are all isometries. Any composition (sequence) of isometries is also an isometry. Dilations are NOT isometries unless the scale factor is 1. The composition of two rotations is also a rotation (or translation if the angles sum to 360°). Understanding isometry is key to all congruence arguments on the Regents.'
    },
    {
      number: 20,
      part: 'A',
      text: 'In right triangle ABC, the altitude from C to hypotenuse AB divides it into segments of length 4 (adjacent to A) and 9 (adjacent to B). What is the length of leg BC?',
      choices: ['√13', '√36', '3√13', '√117'],
      topic: 'Similarity & Proof',
      correct: 3,
      explanation: 'Each leg is the geometric mean of the hypotenuse and its adjacent segment: BC = √(AB × 9) = √((4+9) × 9) = √(13 × 9) = √117 = 3√13.',
      diveDeep: 'The geometric mean (leg) theorem: each leg of the right triangle equals the geometric mean of the hypotenuse and the adjacent hypotenuse segment. BC² = AB × BD = 13 × 9 = 117, so BC = √117 = 3√13. Similarly, AC² = AB × AD = 13 × 4 = 52 = 2√13. These relationships come from the three similar triangles: △ABC ~ △ACD ~ △CBD. A common mistake is using the altitude geometric mean formula (altitude² = product of the two segments) for a leg instead.'
    },
    {
      number: 21,
      part: 'A',
      text: 'In a circle, two parallel chords are on opposite sides of the center. Their intercepted arcs are 120° and 80°. What are the two arcs between the parallel chords?',
      choices: ['80° each', '100° and 60°', '40° each', '200° each'],
      topic: 'Circles',
      correct: 0,
      explanation: 'The total circle is 360°. The arcs between the parallel chords are equal by symmetry: each = (360° − 120° − 80°)/2 = 160°/2 = 80°.',
      diveDeep: 'When two chords are parallel, the arcs between them (the two "side" arcs) are equal. The four arcs must sum to 360°. Here the two known arcs are 120° and 80°, leaving 360° − 200° = 160° for the two equal arcs between them, so each is 80°. This equal-arc property follows from the fact that parallel chords intercept equal arcs between them. This principle is also used to prove that a trapezoid inscribed in a circle with parallel sides is isosceles.'
    },
    {
      number: 22,
      part: 'A',
      text: 'Which equation represents the axis of symmetry of a parabola with vertex at (3, −2)?',
      choices: ['x = 3', 'x = −2', 'y = 3', 'y = −2'],
      topic: 'Coordinate Geometry',
      correct: 0,
      explanation: 'A vertical parabola has its axis of symmetry as a vertical line through the vertex: x = 3.',
      diveDeep: 'For a parabola of the form y = a(x − h)² + k, the vertex is (h, k) and the axis of symmetry is the vertical line x = h. Here vertex = (3, −2) so the axis is x = 3. For a horizontal parabola x = a(y − k)² + h, the axis would be y = k. In Regents Geometry, parabolas are almost always vertical (opening up or down), so the axis of symmetry is always a vertical line through the x-coordinate of the vertex.'
    },
    {
      number: 23,
      part: 'A',
      text: 'A cube has a surface area of 150 square units. What is its volume?',
      choices: ['25', '75', '125', '225'],
      topic: '3D Geometry & Volume',
      correct: 2,
      explanation: 'Surface area of a cube = 6s², so 6s² = 150, s² = 25, s = 5. Volume = s³ = 125.',
      diveDeep: 'A cube has 6 congruent square faces, so total surface area = 6s². Setting 6s² = 150 gives s = 5, and then V = s³ = 125. A common mistake is forgetting to divide by 6 when solving for s, or squaring instead of cubing when finding volume. The relationship between surface area and volume of a cube is important in real-world applications like packaging and heat transfer. Note that doubling the side length increases surface area by a factor of 4 and volume by a factor of 8.'
    },
    {
      number: 24,
      part: 'A',
      text: 'The angle of elevation from a point 60 feet from the base of a tree to its top is 45°. How tall is the tree?',
      choices: ['30 ft', '60 ft', '60√2 ft', '30√2 ft'],
      topic: 'Trigonometry',
      correct: 1,
      explanation: 'tan(45°) = height/60. Since tan(45°) = 1, height = 60 feet.',
      diveDeep: 'The angle of elevation is measured from the horizontal up to the line of sight. tan(angle) = opposite/adjacent = height/horizontal distance. With 45° and horizontal distance 60: tan(45°) = 1 = height/60, so height = 60 ft. The 45° case is special: opposite = adjacent, so the triangle is isosceles. A common mistake is using sin or cos instead of tan. Note that for angles greater than 45°, the height exceeds the horizontal distance, and for angles less than 45° the height is less.'
    }
  ]
}
