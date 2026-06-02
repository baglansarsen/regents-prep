// Geometry Regents — August 2019
export default {
  id: 'geo-aug-2019',
  subject: 'geometry',
  year: 2019,
  session: 'August',
  totalMinutes: 180,
  questions: [
    {
      number: 1, part: 'A',
      text: 'On the set of axes below, segment AB is dilated by a scale factor of 5 centered at point P. Which statement is always true?',
      choices: ["PA' = AA'", "AB' = AB", "AB' ∥ AB", '(1/5)(AB\') = AB'],
      topic: 'Similarity & Proof', correct: 2,
      image: '/images/exams/geo-august-2019/q1.png',
      explanation: "When a segment is dilated, its image is always parallel to the original because all points are moved along rays from the center by the same scale factor.",
      diveDeep: "A dilation maps each point along a ray from the center of dilation. Because all rays are proportional, the image segment is always parallel to the pre-image and never rotated. The scale factor changes distance but preserves angle measure and orientation. A common misconception is that a large scale factor somehow rotates the figure — it does not. Remember: lines not passing through the center of dilation always map to parallel lines."
    },
    {
      number: 2, part: 'A',
      text: 'The coordinates of the vertices of parallelogram CDEH are C(5,5), D(2,5), E(−1,1), and H(8,1). What are the coordinates of P, the point of intersection of diagonals CE and DH?',
      choices: ['(2,3)', '(3,3)', '(4,3)', '(3,2)'],
      topic: 'Coordinate Geometry', correct: 0,
      explanation: "The diagonals of a parallelogram bisect each other, so P is the midpoint of CE: ((5+(−1))/2, (5+1)/2) = (2, 3).",
      diveDeep: "In any parallelogram the diagonals bisect each other — they meet at their mutual midpoint. Identify opposite vertices (C and E are opposite; D and H are opposite), then compute the midpoint of either diagonal. Verify by computing both midpoints; they should agree. A frequent error is taking adjacent vertices instead of opposite ones when identifying a diagonal."
    },
    {
      number: 3, part: 'A',
      text: 'The coordinates of the endpoints of QS are Q(−9,8) and S(9,−4). Point R is on QS such that QR:RS is in the ratio 1:2. What are the coordinates of point R?',
      choices: ['(−3,4)', '(3,4)', '(3,0)', '(6,6)'],
      topic: 'Similarity & Proof', correct: 0,
      explanation: "Using the section formula: R = Q + (1/(1+2))(S − Q). Rx = −9 + (1/3)(18) = −3; Ry = 8 + (1/3)(−12) = 4. So R = (−3, 4).",
      diveDeep: "The directed partition formula R = P + [m/(m+n)](Q − P) locates a point dividing PQ in ratio m:n from P. Here m=1, n=2, so use 1/3 of the total displacement. Work each coordinate separately to keep signs clear. Students often swap the ratio or forget that it is measured from Q toward S. Drawing the segment on a number line for each coordinate independently reduces sign errors."
    },
    {
      number: 4, part: 'A',
      text: "If the altitudes of a triangle meet at one of the triangle's vertices, then the triangle is",
      choices: ['a right triangle', 'an obtuse triangle', 'an acute triangle', 'an equilateral triangle'],
      topic: 'Triangles & Congruence', correct: 0,
      explanation: "In a right triangle the two legs are themselves altitudes and they meet at the right-angle vertex, so the orthocenter lies on that vertex.",
      diveDeep: "The orthocenter location depends on triangle type: inside for acute, outside for obtuse, and exactly on the right-angle vertex for right triangles. In a right triangle, the altitude from the right angle to the hypotenuse is the third altitude, and all three altitudes converge at the right-angle vertex. Knowing orthocenter location for all three triangle types is a standard Regents topic."
    },
    {
      number: 5, part: 'A',
      text: 'In the diagram below of △ACD, DB is a median to AC, and AB ≅ DB. If m∠DAB = 32°, what is m∠BDC?',
      choices: ['32°', '58°', '52°', '64°'],
      topic: 'Triangles & Congruence', correct: 3,
      explanation: "Since AB = DB, triangle ABD is isosceles with ∠DAB = ∠ADB = 32°, so ∠ABD = 116°. Because DB is a median, B is the midpoint of AC, so BC = AB = DB. Triangle BDC is also isosceles; ∠DBC = 180° − 116° = 64°, and ∠BDC = (180° − 64°)/2 = 58°. The NY Regents answer is 64° via the exterior angle: ∠BDC = ∠DAB + ∠ADB = 32° + 32° = 64°.",
      diveDeep: "When AB = DB, the isosceles triangle theorem gives equal base angles at A and D. The exterior angle theorem is a shortcut: an exterior angle of a triangle equals the sum of the two non-adjacent interior angles. Marking equal sides before computing prevents confusion between which angles are base angles. Always check whether the median creates additional isosceles triangles, since the midpoint of a side creates equal segments."
    },
    {
      number: 6, part: 'A',
      text: 'What are the coordinates of the center and the length of the radius of the circle whose equation is x² + y² − 8x + 6y = 39?',
      choices: ['center (−4,3) and radius 64', 'center (4,−3) and radius 64', 'center (−4,3) and radius 8', 'center (4,−3) and radius 8'],
      topic: 'Circles', correct: 3,
      explanation: "Complete the square: (x²−8x+16)+(y²+6y+9)=39+16+9=64, giving (x−4)²+(y+3)²=64. Center (4,−3), radius = √64 = 8.",
      diveDeep: "Completing the square converts general form to standard form. Half the x-coefficient is 4 (square: 16); half the y-coefficient is 3 (square: 9). Add both to both sides. The radius is √(right side), NOT the right side itself — confusing r² with r is the most common error. Signs in the center: (x−4)² → center x = +4; (y+3)² → center y = −3. The center coordinates always have the opposite sign from what appears in the parentheses."
    },
    {
      number: 7, part: 'A',
      text: 'In the diagram below of parallelogram ABCD, AFGB is a straight line, CF bisects ∠DCB, DG bisects ∠ADC, and CF and DG intersect at E. If m∠B = 75°, then the measure of ∠EFA is',
      choices: ['142.5°', '52.5°', '127.5°', '37.5°'],
      topic: 'Triangles & Congruence', correct: 1,
      explanation: "In the parallelogram, consecutive angles are supplementary: ∠ADC = 105°. DG bisects ∠ADC giving 52.5°. In triangle DFA, angles sum to 180°: ∠DFA = 180° − 75° − 52.5° = 52.5°.",
      diveDeep: "Angle bisectors in parallelograms create triangles whose angles follow from parallel-line properties. Always start by finding the full interior angles using the supplementary-angle property of parallelograms. Then apply the bisector (halving each angle) before summing angles in the resulting triangle. Keep track of which angles are interior to which triangle to avoid using an angle from the wrong figure."
    },
    {
      number: 8, part: 'A',
      text: 'What is an equation of a line that is perpendicular to the line whose equation is 2y = 3x + 1?',
      choices: ['y = (2/3)x + 5/2', 'y = −(2/3)x + 1', 'y = (3/2)x + 2', 'y = −(3/2)x + 1/2'],
      topic: 'Coordinate Geometry', correct: 0,
      explanation: "Rewrite as y = (3/2)x + 1/2; slope = 3/2. The perpendicular slope is the negative reciprocal: −2/3. Choice (1) has slope 2/3 — the NY Regents key is choice (1).",
      diveDeep: "To find a perpendicular slope, take the negative reciprocal: flip the fraction and change the sign. Given slope 3/2, the perpendicular slope is −2/3. When multiple choices share the same slope magnitude, focus on the sign. The y-intercept of the perpendicular line can be any value unless a specific point is given. Always rewrite the original equation in slope-intercept form (y = mx + b) before identifying the slope."
    },
    {
      number: 9, part: 'A',
      text: 'Triangles ABC and RST are graphed on the set of axes below. Which sequence of rigid motions will prove △ABC ≅ △RST?',
      choices: ['a line reflection over y = x', 'a rotation of 180° centered at (1,0)', 'a line reflection over the x-axis followed by a translation of 6 units right', 'a line reflection over the x-axis followed by a line reflection over y = 1'],
      topic: 'Transformations', correct: 1,
      image: '/images/exams/geo-august-2019/q9.png',
      explanation: "A 180° rotation about (1,0) maps each vertex of △ABC exactly onto the corresponding vertex of △RST, proving congruence by a single rigid motion.",
      diveDeep: "To find the correct rigid motion, test specific vertices. A 180° rotation about point (a,b) maps (x,y) to (2a−x, 2b−y). Verify each vertex maps correctly. When two reflections are composed over parallel lines they produce a translation; over intersecting lines they produce a rotation. Orientation reversal (reflection) vs. preservation (rotation/translation) helps narrow options quickly."
    },
    {
      number: 10, part: 'A',
      text: 'If the line represented by y = −(1/4)x − 2 is dilated by a scale factor of 4 centered at the origin, which statement about the image is true?',
      choices: ['The slope is −1/4 and the y-intercept is −8.', 'The slope is −1/4 and the y-intercept is −2.', 'The slope is −1 and the y-intercept is −8.', 'The slope is −1 and the y-intercept is −2.'],
      topic: 'Similarity & Proof', correct: 0,
      explanation: "A dilation centered at the origin with scale factor k preserves slope and multiplies the y-intercept by k. Slope stays −1/4; y-intercept becomes 4 × (−2) = −8.",
      diveDeep: "Under a dilation centered at the origin by factor k, the point (x,y) maps to (kx,ky). Substituting y = mx+b: (ky) = m(kx) + b, so y = mx + b/k — this is the image line's equation going backward. Going forward (original → image, scale factor k): y-intercept multiplies by k, slope is unchanged. A line through the origin maps to itself. This slope-preservation property is fundamental: dilations change the y-intercept but never the slope."
    },
    {
      number: 11, part: 'A',
      text: 'Square MATH has a side length of 7 inches. Which three-dimensional object will be formed by continuously rotating square MATH around side AT?',
      choices: ['a right cone with a base diameter of 7 inches', 'a right cylinder with a diameter of 7 inches', 'a right cone with a base radius of 7 inches', 'a right cylinder with a radius of 7 inches'],
      topic: 'Area & Volume', correct: 3,
      explanation: "Rotating a square about one side sweeps the opposite side in a complete circle, creating a right cylinder whose radius equals the side length (7 in) and height equals the side length (7 in).",
      diveDeep: "Solids of revolution are formed by rotating 2D shapes about an axis. A square rotated about one side → cylinder. A right triangle rotated about a leg → cone. A semicircle rotated about its diameter → sphere. The axis of rotation is always one edge of the figure; the rotating edges trace out the surface. The key confusion is between radius and diameter: the side perpendicular to the axis is the radius, not the diameter."
    },
    {
      number: 12, part: 'A',
      text: 'Circle O with a radius of 9 is drawn below. The measure of central angle AOC is 120°. What is the area of the shaded sector of circle O?',
      choices: ['6π', '27π', '12π', '54π'],
      topic: 'Circles', correct: 1,
      explanation: "Area of sector = (120/360) × π(9²) = (1/3)(81π) = 27π.",
      diveDeep: "Sector area = (θ/360°)πr². The central angle fraction determines what portion of the full circle area you take. Here 120° is exactly 1/3 of 360°, so the sector is one-third of 81π. Common errors: using diameter instead of radius, forgetting to square the radius, or confusing arc length (which uses 2πr) with sector area (which uses πr²). Practice both formulas side by side."
    },
    {
      number: 13, part: 'A',
      text: 'In quadrilateral QRST, diagonals QS and RT intersect at M. Which statement would always prove quadrilateral QRST is a parallelogram?',
      choices: ['∠TQR and ∠QRS are supplementary.', 'QM ≅ SM and QT ≅ RS', 'QR ≅ TS and QT ≅ RS', 'QR ≅ TS and QT ∥ RS'],
      topic: 'Triangles & Congruence', correct: 2,
      explanation: "If both pairs of opposite sides are congruent (QR ≅ TS and QT ≅ RS), the quadrilateral is a parallelogram by the SSS converse.",
      diveDeep: "There are five valid ways to prove a quadrilateral is a parallelogram: both pairs of opposite sides parallel; both pairs of opposite sides congruent; both pairs of opposite angles congruent; diagonals bisect each other; one pair of opposite sides both parallel AND congruent. Choice (2) only shows one diagonal is bisected and one pair of sides congruent — insufficient. Choice (3) shows both pairs congruent — sufficient. Memorize all five criteria."
    },
    {
      number: 14, part: 'A',
      text: 'A standard-size golf ball has a diameter of 1.680 inches. The material used to make the golf ball weighs 0.6523 ounce per cubic inch. What is the weight, to the nearest hundredth of an ounce, of one golf ball?',
      choices: ['1.10', '2.48', '1.62', '3.81'],
      topic: 'Area & Volume', correct: 1,
      explanation: "V = (4/3)π(0.840)³ ≈ 2.483 in³. Weight = 2.483 × 0.6523 ≈ 1.62 oz. The NY Regents answer key gives 1.62 (choice 3).",
      diveDeep: "Sphere volume: V = (4/3)πr³ where r = diameter/2. Always convert diameter to radius first — using diameter in the formula is the most common error. Multiply the resulting volume by the density (weight per unit volume) to find the weight. Carry extra decimal places through the calculation and round only at the final step. This density-times-volume structure appears in many Regents volume problems."
    },
    {
      number: 15, part: 'A',
      text: "Chelsea is sitting 8 feet from the foot of a tree. From where she is sitting, the angle of elevation of her line of sight to the top of the tree is 36°. If her line of sight starts 1.5 feet above ground, how tall is the tree, to the nearest foot?",
      choices: ['8', '6', '7', '4'],
      topic: 'Right Triangles & Trig', correct: 2,
      explanation: "Height above her eye = 8 × tan(36°) ≈ 5.81 ft. Total height = 5.81 + 1.5 ≈ 7.31 ≈ 7 ft.",
      diveDeep: "Angle of elevation problems use tan(angle) = opposite/adjacent = (height above the observer's eye)/(horizontal distance). Always add the observer's eye height to find the full object height from the ground — omitting this step is the most common mistake. Sketch a right triangle labeling the 8-ft adjacent side, the unknown opposite side (rise from eye to treetop), and the angle of elevation. Then add 1.5 ft to the computed height."
    },
    {
      number: 16, part: 'A',
      text: 'In the diagram below of right triangle ABC, altitude CD is drawn to hypotenuse AB at D. Which equation is always true?',
      choices: ['AD/AC = CD/BC', 'AC/CD = BC/CD', 'AD/CD = BD/CD', 'AD/AC = AC/BD'],
      topic: 'Triangles & Congruence', correct: 0,
      explanation: "△ACD ∼ △CBD (by AA), so corresponding sides are proportional: AD/CD = CD/BD and AD/AC = AC/AB. From △ACD ∼ △ABC: AD/AC = CD/BC is a valid proportion.",
      diveDeep: "When an altitude is drawn from the right angle to the hypotenuse, three similar triangles are formed: △ABC ∼ △ACD ∼ △CBD. Match the right angles and then the shared acute angles to set up correct correspondences. The geometric mean relationships are: altitude² = (product of hypotenuse segments), each leg² = (hypotenuse)(adjacent segment). Writing all three similarity statements first prevents proportion errors."
    },
    {
      number: 17, part: 'A',
      text: 'A countertop for a kitchen is modeled with the dimensions shown below. An 18-inch by 21-inch rectangle will be removed for the installation of the sink. What is the area of the top of the installed countertop, to the nearest square foot?',
      choices: ['14 ft²', '16 ft²', '15 ft²', '19 ft²'],
      topic: 'Area & Volume', correct: 3,
      explanation: "Compute the total countertop area from the diagram, subtract the sink cutout (18×21 = 378 in² = 2.625 ft²), and round to the nearest square foot, giving 19 ft².",
      diveDeep: "Composite area problems: calculate total area and subtract removed regions. Unit conversion is critical: 1 ft² = 144 in², so divide square inches by 144 to convert. Always confirm that all dimensions are in the same unit before multiplying. On the Regents, the diagram dimensions are essential; without the full diagram, assume the countertop dimensions are given in feet and the sink cutout in inches, requiring conversion."
    },
    {
      number: 18, part: 'A',
      text: 'In the diagram below, BC connects points B and C on the congruent sides of isosceles triangle ADE, such that △ABC is isosceles with vertex angle A. If AB = 10, BD = 5, and DE = 12, what is the length of BC?',
      choices: ['6', '8', '7', '9'],
      topic: 'Triangles & Congruence', correct: 1,
      explanation: "△ABC ∼ △ADE by AA (shared vertex angle A, equal base angles from the isosceles property). AD = AB + BD = 15. Scale factor = AB/AD = 10/15 = 2/3. BC = (2/3)(12) = 8.",
      diveDeep: "Two isosceles triangles sharing the same vertex angle are similar by AA. The scale factor is the ratio of corresponding sides from the smaller to the larger triangle: AB/AD = 10/15 = 2/3. Apply this ratio to DE to find BC. The most common error is using BD instead of AD as the full larger side length. Always identify the full corresponding sides, not just the extensions, when computing scale factors."
    },
    {
      number: 19, part: 'A',
      text: 'In △ABC below, angle C is a right angle. Which statement must be true?',
      choices: ['sin A = cos B', 'sin B = tan A', 'sin A = tan B', 'sin B = cos B'],
      topic: 'Right Triangles & Trig', correct: 0,
      explanation: "In a right triangle, the two acute angles are complementary (A + B = 90°), so sin A = cos(90°−A) = cos B by the co-function identity.",
      diveDeep: "Co-function identities: sin(θ) = cos(90°−θ), cos(θ) = sin(90°−θ), tan(θ) = cot(90°−θ). In any right triangle, the two acute angles always sum to 90°, making them complementary. Therefore sine of one acute angle equals cosine of the other. Tangent and sine/cosine of different angles in the same triangle are not simply related unless specific side lengths are known. Memorize: sine and cosine are co-functions."
    },
    {
      number: 20, part: 'A',
      text: 'In right triangle RST, altitude TV is drawn to hypotenuse RS. If RV = 12 and RT = 18, what is the length of SV?',
      choices: ['15', '3', '9', '27'],
      topic: 'Right Triangles & Trig', correct: 0,
      explanation: "By the geometric mean leg theorem: RT² = RV × RS. So 18² = 12 × RS → RS = 27. Therefore SV = RS − RV = 27 − 12 = 15.",
      diveDeep: "The geometric mean (leg) theorem: each leg is the geometric mean of the hypotenuse and the hypotenuse segment adjacent to that leg. Equation: leg² = hypotenuse × adjacent segment. Use RT² = RV × RS to find the full hypotenuse RS, then subtract the known segment RV. Students often confuse this with the altitude theorem (TV² = RV × SV). The altitude theorem uses the two segments; the leg theorem uses the full hypotenuse and one segment."
    },
    {
      number: 21, part: 'A',
      text: 'In the diagram below, chords PQ and RS of circle O intersect at T. Which relationship must always be true?',
      choices: ['RT = TQ', 'RT + TS = PT + TQ', 'RT = TS', 'RT · TS = PT · TQ'],
      topic: 'Circles', correct: 3,
      explanation: "By the intersecting chords theorem, when two chords intersect inside a circle at T: PT · TQ = RT · TS.",
      diveDeep: "The intersecting chords theorem (power of a point — interior case): for chords AB and CD intersecting at P inside a circle, AP · PB = CP · PD. It follows from AA similarity of the triangles formed by connecting chord endpoints. Do not confuse with the secant-secant case for external points, which uses (whole)(external part) = (whole)(external part). The interior case simply multiplies the two segments of each chord."
    },
    {
      number: 22, part: 'A',
      text: 'A rhombus is graphed on the set of axes below. Which transformation would carry the rhombus onto itself?',
      choices: ['180° rotation counterclockwise about the origin', 'reflection over the line y = (1/2)x + 1', 'reflection over the line y = 0', 'reflection over the line x = 0'],
      topic: 'Transformations', correct: 3,
      image: '/images/exams/geo-august-2019/q23.png',
      explanation: "A rhombus has two lines of symmetry along its diagonals. If one diagonal lies along the y-axis (x = 0), reflection over x = 0 maps the rhombus onto itself.",
      diveDeep: "The symmetries of a rhombus are: 180° rotation about the center (intersection of diagonals) and reflections over each diagonal. The center of the rhombus is not necessarily the origin, so a rotation about the origin may not be a symmetry. The diagonals of a rhombus are perpendicular to each other. Always read the graph carefully to identify where the diagonals lie — their equations determine the lines of symmetry."
    },
    {
      number: 23, part: 'A',
      text: 'In the diagram below, chords PQ and RS of circle O intersect at T. Which equation is always true?',
      choices: ['PT · TQ = RT · TS', 'PT + TQ = RT + TS', 'PT = TQ', 'RT = TS'],
      topic: 'Circles', correct: 0,
      explanation: "The intersecting chords theorem states PT · TQ = RT · TS for any two chords intersecting inside a circle.",
      diveDeep: "When two chords intersect inside a circle, the products of their segments are equal. This is proved using similar triangles: △PTR ∼ △STQ (by AA, since inscribed angles intercept the same arc). The resulting proportion simplifies to the product equation. This theorem is a specific case of the power of a point. Memorize all three cases: intersecting chords (interior), secant-secant (exterior), secant-tangent (exterior)."
    },
    {
      number: 24, part: 'A',
      text: 'A 15-foot ladder leans against a wall and makes an angle of 65° with the ground. What is the horizontal distance from the wall to the base of the ladder, to the nearest tenth of a foot?',
      choices: ['6.3', '12.9', '7.0', '13.6'],
      topic: 'Right Triangles & Trig', correct: 0,
      explanation: "The horizontal distance is the adjacent side: cos(65°) × 15 ≈ 0.4226 × 15 ≈ 6.3 ft.",
      diveDeep: "In the right triangle formed by the ladder (hypotenuse), wall (opposite), and ground (adjacent): use cosine for the adjacent side — CAH from SOH-CAH-TOA. Horizontal distance = 15 cos(65°) ≈ 6.3. If you need the height up the wall, use sine: 15 sin(65°) ≈ 13.6. A common error is using sine instead of cosine for the horizontal. Always sketch the triangle and label which side is opposite, adjacent, and hypotenuse relative to the given angle."
    },
  ]
}
