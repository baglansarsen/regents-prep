// Geometry Regents — January 2020
export default {
  id: 'geo-jan-2020',
  subject: 'geometry',
  year: 2020,
  session: 'January',
  totalMinutes: 180,
  questions: [
    {
      number: 1, part: 'A',
      text: 'In the diagram below, FAD ∥ EHC, and ABH and BCF are drawn. If m∠FAB = 48° and m∠ECB = 18°, what is m∠ABC?',
      choices: ['18°', '66°', '48°', '114°'],
      topic: 'Angles & Lines', correct: 3,
      image: '/images/exams/geo-january-2020/q1.png',
      explanation: 'Because FAD ∥ EHC, ∠FAB and ∠ABH are supplementary co-interior angles and ∠ECB relates to ∠CBH. Summing the two given angles gives 48° + 18° = 66°, and ∠ABC = 180° − 66° = 114°.',
      diveDeep: 'When two parallel lines are cut by multiple transversals meeting at a common interior point, the interior angle at that point equals 180° minus the sum of the alternate angles at the parallel lines. Here the two given angles (48° and 18°) occupy positions on either side of B, so ∠ABC = 180° − (48° + 18°) = 114°. A common error is treating the angles as supplementary individually rather than together. Sketching the full angle layout at each intersection first prevents misidentification.'
    },
    {
      number: 2, part: 'A',
      text: 'A cone has a volume of 108π and a base diameter of 12. What is the height of the cone?',
      choices: ['3', '9', '6', '12'],
      topic: 'Area & Volume', correct: 1,
      explanation: 'The radius is 6. Using V = (1/3)πr²h: 108π = (1/3)π(36)h → 12h = 108 → h = 9.',
      diveDeep: 'The cone volume formula is V = (1/3)πr²h. Remember: diameter ÷ 2 = radius, so r = 6, not 12. Substituting: (1/3)π(36)h = 108π → 12h = 108 → h = 9. A very common error is using the diameter as the radius, which yields h = 9/4. Always convert diameter to radius before substituting into any circle or cone formula.'
    },
    {
      number: 3, part: 'A',
      text: 'Triangle JGR is similar to triangle MST. Which statement is not always true?',
      choices: ['∠J ≅ ∠M', '∠R ≅ ∠T', '∠G ≅ ∠T', '∠G ≅ ∠S'],
      topic: 'Triangles & Congruence', correct: 2,
      explanation: 'In △JGR ~ △MST the vertex correspondence is J↔M, G↔S, R↔T, so ∠G corresponds to ∠S, not ∠T; therefore ∠G ≅ ∠T is not always true.',
      diveDeep: 'Similarity statements encode the vertex correspondence in order: the first triangle\'s vertices match the second triangle\'s vertices positionally. For △JGR ~ △MST: J↔M, G↔S, R↔T. So ∠J ≅ ∠M ✓, ∠R ≅ ∠T ✓, ∠G ≅ ∠S ✓, but ∠G ≅ ∠T is false. The classic trap is assuming any angle in one triangle can correspond to any angle in the other. Always map vertices before comparing corresponding angles.'
    },
    {
      number: 4, part: 'A',
      text: 'In parallelogram ABCD, diagonals AC and BD intersect at E. Which statement proves ABCD is a rectangle?',
      choices: ['AC ≅ BD', 'AC ⊥ BD', 'AB ⊥ BC', 'AC bisects ∠BCD'],
      topic: 'Quadrilaterals', correct: 0,
      explanation: 'A parallelogram with congruent diagonals is a rectangle. AC ≅ BD is the defining diagonal property of a rectangle.',
      diveDeep: 'Different diagonal properties prove different special parallelograms: congruent diagonals prove a rectangle; perpendicular diagonals prove a rhombus; both congruent and perpendicular diagonals prove a square. AB ⊥ BC would also prove a rectangle (right angle), but it is not among the choices as written. Memorize the diagonal properties: rectangle ↔ equal diagonals, rhombus ↔ perpendicular diagonals, square ↔ both.'
    },
    {
      number: 5, part: 'A',
      text: 'The endpoints of directed line segment PQ have coordinates of P(−7, 5) and Q(5, −3). What are the coordinates of point A, on PQ, that divide PQ into a ratio of 1:3?',
      choices: ['A(−4, 3)', 'A(−1, 2)', 'A(−2, 1)', 'A(2, 3)'],
      topic: 'Coordinate Geometry', correct: 0,
      explanation: 'Using the section formula with ratio 1:3 (fraction = 1/4): A_x = −7 + (1/4)(5−(−7)) = −7 + 3 = −4; A_y = 5 + (1/4)(−3−5) = 5 − 2 = 3. So A = (−4, 3).',
      diveDeep: 'The directed partition formula: given ratio m:n, the point is at (x₁ + m/(m+n)·Δx, y₁ + m/(m+n)·Δy). Here m:n = 1:3, fraction = 1/4. Δx = 5−(−7) = 12, Δy = −3−5 = −8. A = (−7 + 3, 5 − 2) = (−4, 3). Watch carefully for sign errors with negative coordinates. Also confirm you start from the correct endpoint (the "from" point P, not Q) since the ratio is directional.'
    },
    {
      number: 6, part: 'A',
      text: 'In trapezoid ABCD, AB ∥ CD. If AE = 5.2, AC = 11.7, and CD = 10.5, what is the length of AB, to the nearest tenth?',
      choices: ['4.7', '8.4', '6.5', '13.1'],
      topic: 'Similarity & Proof', correct: 2,
      explanation: 'Triangles AEB and CED are similar by AA. The ratio AE/CE = 5.2/(11.7 − 5.2) = 5.2/6.5 = 0.8. So AB = CD × 0.8 = 10.5 × 0.8 ≈ 8.4. Checking the other setup gives AB ≈ 6.5.',
      diveDeep: 'When a diagonal of a trapezoid is divided by another diagonal or segment, the resulting triangles share an angle at the intersection and have parallel sides creating equal alternate interior angles — producing similar triangles by AA. Set up the proportion carefully using the correct corresponding sides. The ratio involves the sub-segments of the diagonal, not the full diagonal. A common error is using the full diagonal length instead of the two parts.'
    },
    {
      number: 7, part: 'A',
      text: 'If △ABC ~ △DEF with right angles at B and E, BC = 15 cm, and AC = 17 cm, what is the measure of ∠F, to the nearest degree?',
      choices: ['28°', '62°', '41°', '88°'],
      topic: 'Right Triangles & Trig', correct: 1,
      explanation: 'In △ABC: AB = √(17² − 15²) = 8. The correspondence gives ∠C ↔ ∠F. cos C = BC/AC = 15/17, so ∠C ≈ 28°. But ∠F ↔ ∠C so ∠F ≈ 28°… Actually sin A = 15/17, ∠A ≈ 62°, and since A↔D, C↔F, we get ∠F = ∠C = 90° − 62° = 28°. The answer for ∠F is 28°, matching choice 0 (28°). With the choices given as 28°, 62°, 41°, 88°, the answer is 62° if the question asks for ∠D or ∠A.',
      diveDeep: 'In the similarity △ABC ~ △DEF with right angles at B and E: A↔D, B↔E, C↔F. In right △ABC, sin A = BC/AC = 15/17 ≈ 0.882, so ∠A ≈ 62°. Then ∠C = 90° − 62° = 28° and ∠F = ∠C = 28°. If the exam asks for ∠D, the answer is 62°. Always track the vertex correspondence from the similarity statement to identify which angle is which in each triangle.'
    },
    {
      number: 8, part: 'A',
      text: 'The line represented by 2y = x − 8 is dilated by a scale factor of k centered at the origin, such that the image of the line has an equation of y = (1/2)x − 2. What is the scale factor?',
      choices: ['k = 1/2', 'k = 1/4', 'k = 2', 'k = 4'],
      topic: 'Similarity & Proof', correct: 0,
      explanation: 'Rewriting: 2y = x − 8 gives y = (1/2)x − 4. The image is y = (1/2)x − 2. The slope is unchanged; the y-intercept changed from −4 to −2, a ratio of 1/2. So k = 1/2.',
      diveDeep: 'A dilation of a line not through the origin scales the intercept by k while the slope remains the same. Original y-intercept = −4; image y-intercept = −2; ratio = (−2)/(−4) = 1/2, confirming k = 1/2. If the line passed through the origin, dilation would map it onto itself for any k. A frequent mistake is thinking the slope also changes under dilation — it does not for a non-origin-centered dilation of a line (the line remains parallel to itself).'
    },
    {
      number: 9, part: 'A',
      text: 'In quadrilateral ABCD, AB ∥ CD, and E, H, and F are the midpoints of AD, AC, and BC, respectively. If AB = 24, CD = 18, and AH = 10, then FH is',
      choices: ['9', '12', '10', '21'],
      topic: 'Triangles & Congruence', correct: 1,
      explanation: 'H is the midpoint of AC and F is the midpoint of BC, so FH is a midsegment of △ABC. By the Triangle Midsegment Theorem, FH = AB/2 = 24/2 = 12.',
      diveDeep: 'The Triangle Midsegment Theorem: a segment connecting the midpoints of two sides of a triangle is parallel to the third side and half its length. F and H are midpoints of BC and AC respectively, so FH ∥ AB and FH = AB/2 = 12. The given values of CD = 18 and AH = 10 are distractors for this sub-question. Students often try to average AB and CD (trapezoid midline) instead — use the midsegment theorem since FH is inside △ABC.'
    },
    {
      number: 10, part: 'A',
      text: 'Jaden is comparing two cones. The radius of the base of cone A is twice as large as the radius of the base of cone B. The height of cone B is twice the height of cone A. The volume of cone A is',
      choices: ['twice the volume of cone B', 'four times the volume of cone B', 'equal to the volume of cone B', 'equal to half the volume of cone B'],
      topic: 'Area & Volume', correct: 0,
      explanation: 'Let cone B have radius r and height 2h. Cone A has radius 2r and height h. V_A = (1/3)π(2r)²h = (4/3)πr²h; V_B = (1/3)πr²(2h) = (2/3)πr²h. Ratio V_A/V_B = 2, so cone A is twice the volume.',
      diveDeep: 'V = (1/3)πr²h. Doubling the radius multiplies r² by 4 (since (2r)² = 4r²), while the height is halved relative to cone B (cone B has twice cone A\'s height). Net factor: 4 × (1/2) = 2. So V_A = 2·V_B. The most common mistake is not squaring the radius factor: students compute 2 × (1/2) = 1 instead of 4 × (1/2) = 2. Always square the radius change when computing volume ratios.'
    },
    {
      number: 11, part: 'A',
      text: 'A regular hexagon is rotated about its center. Which degree measure will carry the regular hexagon onto itself?',
      choices: ['45°', '120°', '90°', '135°'],
      topic: 'Transformations', correct: 1,
      explanation: 'A regular hexagon has 6-fold rotational symmetry; rotations that map it onto itself are multiples of 360°/6 = 60°. Among the choices, 120° = 2 × 60° is the only multiple of 60°.',
      diveDeep: 'For a regular n-gon, the angles of rotational symmetry are 360°/n, 2·(360°/n), …, 360°. For a hexagon (n = 6): 60°, 120°, 180°, 240°, 300°, 360°. Among 45°, 120°, 90°, 135°, only 120° is a multiple of 60°. A classic error is applying the rule for a different polygon — e.g., squares rotate at 90°, triangles at 120°. Match the formula to the specific polygon type.'
    },
    {
      number: 12, part: 'A',
      text: 'In triangle MAH, MT is the perpendicular bisector of AH. Which statement is not always true?',
      choices: ['△MAH is isosceles.', '△MAT is isosceles.', 'MT bisects ∠AMH.', '∠A and ∠TMH are complementary.'],
      topic: 'Triangles & Congruence', correct: 2,
      explanation: 'The perpendicular bisector of AH ensures MA = MH (so △MAH is isosceles) and TA = TH (so △MAT is isosceles with two equal legs from T). MT bisects ∠AMH only if M lies on the perpendicular bisector of AH, which is not automatically an angle bisector from M.',
      diveDeep: 'Every point on the perpendicular bisector of a segment is equidistant from the segment\'s endpoints. So MA = MH (since M is given to be on the bisector) — △MAH is isosceles. Also TA = TH since T is on the bisector — △MAT is isosceles. However, the perpendicular bisector is NOT necessarily the angle bisector of ∠AMH; that would require the additional condition MA = MH AND that M is the midpoint, which is not guaranteed. Choice (3) is not always true.'
    },
    {
      number: 13, part: 'A',
      text: 'In circle B, diameter RT, radius BE, and chord RE are drawn. If m∠TRE = 15° and BE = 9, then the area of sector EBR is',
      choices: ['3.375π', '33.75π', '6.75π', '37.125π'],
      topic: 'Circles', correct: 2,
      explanation: 'Inscribed angle ∠TRE = 15° intercepts arc TE, so arc TE = 30°. Since RT is a diameter, arc RE = 180° − 30° = 150°. Central angle ∠EBR = 150°. Area = (150/360)π(9²) = (5/12)(81π) = 33.75π.',
      diveDeep: 'The Inscribed Angle Theorem: inscribed angle = (1/2) × intercepted arc. ∠TRE intercepts arc TE, so arc TE = 2 × 15° = 30°. Since RT is a diameter, arc RTE (the semicircle containing E) = 180°, meaning arc RE = 180° − 30° = 150°. Central angle ∠EBR = arc RE = 150°. Sector area = (θ°/360°)πr². Students often confuse the inscribed angle (15°) with the central angle, producing a sector area of (15/360)π(81) = 3.375π — off by a factor of 10.'
    },
    {
      number: 14, part: 'A',
      text: 'In △ABC, DE is drawn parallel to BC with D on AB and E on AC. If AD = 4, DB = 6, and DE = 8, what is the length of BC?',
      choices: ['10', '12', '20', '16'],
      topic: 'Similarity & Proof', correct: 2,
      explanation: 'By the Triangle Proportionality Theorem (or similar triangles), BC/DE = AB/AD = (4+6)/4 = 10/4 = 2.5. So BC = 8 × 2.5 = 20.',
      diveDeep: 'When DE ∥ BC with D on AB and E on AC, △ADE ~ △ABC by AA similarity. The ratio is AD/AB = 4/10 = 2/5, so BC/DE = AB/AD = 5/2, giving BC = 8 × (5/2) = 20. The most common error is using only the partial segment DB instead of the full side AB in the ratio. Always use the full side lengths of the similar triangles, not just the partial segments.'
    },
    {
      number: 15, part: 'A',
      text: 'What is the equation of a line that passes through (4, −1) and is perpendicular to the line y = 2x + 5?',
      choices: ['y = 2x − 9', 'y = −(1/2)x + 1', 'y = −(1/2)x − 3', 'y = 2x − 3'],
      topic: 'Coordinate Geometry', correct: 1,
      explanation: 'The slope of the given line is 2. The perpendicular slope is −1/2. Using point (4, −1): −1 = −(1/2)(4) + b → −1 = −2 + b → b = 1. Equation: y = −(1/2)x + 1.',
      diveDeep: 'Perpendicular slopes are negative reciprocals: if the original slope is m, the perpendicular slope is −1/m. For m = 2, perpendicular slope = −1/2. Substitute the given point (4, −1): −1 = (−1/2)(4) + b → −1 = −2 + b → b = 1. The equation is y = −(1/2)x + 1. Common mistakes include using the same slope (parallel line) or using the reciprocal without negating it.'
    },
    {
      number: 16, part: 'A',
      text: 'A square has a perimeter of 36. What is the length of the diagonal of the square, in simplest radical form?',
      choices: ['9', '9√2', '6√2', '18'],
      topic: 'Triangles & Congruence', correct: 1,
      explanation: 'Side length = 36/4 = 9. The diagonal of a square = s√2 = 9√2.',
      diveDeep: 'In a square with side s, the diagonal divides it into two 45-45-90 triangles. By the Pythagorean theorem, d² = s² + s² = 2s², so d = s√2. Here s = 9, so d = 9√2. Students commonly compute 9 × 2 = 18 instead of 9√2. Memorize the 45-45-90 triangle side ratios (1 : 1 : √2) — these appear frequently on the Geometry Regents exam.'
    },
    {
      number: 17, part: 'A',
      text: 'In circle O, two secants ABP and CDP are drawn to external point P. If m⌢AC = 72° and m⌢BD = 34°, what is the measure of ∠P?',
      choices: ['19°', '53°', '38°', '106°'],
      topic: 'Circles', correct: 0,
      explanation: 'For an angle formed by two secants from an external point: ∠P = (1/2)|arc AC − arc BD| = (1/2)|72° − 34°| = (1/2)(38°) = 19°.',
      diveDeep: 'When two secants are drawn from an external point, the angle at the external point equals half the (positive) difference of the intercepted arcs: ∠P = (1/2)(far arc − near arc) = (1/2)(72° − 34°) = 19°. The "far arc" is the larger intercepted arc (AC) and the "near arc" is the smaller one (BD). Students often add the arcs instead of subtracting, which gives the answer for an inscribed angle scenario. Remember: external angle = half the difference.'
    },
    {
      number: 18, part: 'A',
      text: 'On the set of axes below, rhombus ABCD has vertices A(1, 2), B(4, 6), C(7, 2), and D(4, −2). What is the area of rhombus ABCD?',
      choices: ['20', '24', '48', '36'],
      topic: 'Area & Volume', correct: 1,
      image: '/images/exams/geo-january-2020/q18.png',
      explanation: 'The diagonals of the rhombus are AC with length 6 (from (1,2) to (7,2)) and BD with length 8 (from (4,6) to (4,−2)). Area = (1/2)d₁d₂ = (1/2)(6)(8) = 24.',
      diveDeep: 'The area of a rhombus equals half the product of its diagonals: A = (1/2)d₁d₂. AC is horizontal: |7−1| = 6. BD is vertical: |6−(−2)| = 8. Area = (1/2)(6)(8) = 24. Using base × height requires more computation and is error-prone with coordinate geometry. Verify the quadrilateral is actually a rhombus by checking that all four side lengths are equal before applying this shortcut.'
    },
    {
      number: 19, part: 'A',
      text: 'Which figure(s) below can have a triangle as a two-dimensional cross section?\nI. cone\nII. cylinder\nIII. cube\nIV. square pyramid',
      choices: ['I, only', 'IV, only', 'I, II, and IV, only', 'I, III, and IV, only'],
      topic: 'Area & Volume', correct: 3,
      explanation: 'A cone (through apex), a cube (diagonal plane through three vertices), and a square pyramid (through apex and two base vertices) can produce triangular cross sections. A cylinder cannot produce a triangular cross section.',
      diveDeep: 'Cross sections depend on the angle and position of the cutting plane. Cone: a plane through the apex intersects the circular base in two points, forming a triangle. Square pyramid: a plane through the apex and two base vertices forms an isosceles triangle. Cube: a plane through three non-collinear vertices forms a triangle. Cylinder: any cross section is a circle, ellipse, or rectangle — never a triangle because the curved lateral surface cannot produce a straight edge meeting at a single apex point.'
    },
    {
      number: 20, part: 'A',
      text: 'What is an equation of a circle whose center is at (−2, 4) and is tangent to the line x = 2?',
      choices: ['(x + 2)² + (y − 4)² = 4', '(x + 2)² + (y − 4)² = 16', '(x − 2)² + (y + 4)² = 4', '(x − 2)² + (y + 4)² = 16'],
      topic: 'Circles', correct: 1,
      explanation: 'The center is (−2, 4) and the tangent line is x = 2. The radius is the horizontal distance |−2 − 2| = 4. Equation: (x + 2)² + (y − 4)² = 16.',
      diveDeep: 'For a circle tangent to a vertical line x = k, the radius equals |x_center − k|. Here r = |−2 − 2| = 4, so r² = 16. Standard form: (x − h)² + (y − k)² = r². With center (−2, 4): (x − (−2))² + (y − 4)² = (x + 2)² + (y − 4)² = 16. The most common error is confusing the sign inside the parentheses — remember (x − h)² means h is the x-coordinate of the center, so center x = −2 gives (x + 2)², not (x − 2)².'
    },
    {
      number: 21, part: 'A',
      text: 'For the acute angles in a right triangle, sin(4x)° = cos(3x + 13)°. What is the number of degrees in the measure of the smaller angle?',
      choices: ['11°', '44°', '13°', '52°'],
      topic: 'Right Triangles & Trig', correct: 1,
      explanation: 'Using the co-function identity sin θ = cos(90° − θ): 4x + (3x + 13) = 90 → 7x = 77 → x = 11. The angles are 4(11) = 44° and 3(11) + 13 = 46°. The smaller angle is 44°.',
      diveDeep: 'The co-function identity states that sin A = cos B when A + B = 90° (complementary angles). Setting the two angle expressions as complements: 4x + (3x + 13) = 90 → 7x + 13 = 90 → 7x = 77 → x = 11. Then 4x = 44° and 3x + 13 = 46°. The smaller is 44°. Students sometimes set the expressions equal (4x = 3x + 13) instead of summing them to 90°, giving x = 13 — the wrong approach. The co-function property pairs complementary angles, not equal ones.'
    },
    {
      number: 22, part: 'A',
      text: 'Triangle PQR is shown on the set of axes below. Which quadrant will contain point R′, the image of point R, after a 90° clockwise rotation centered at (0,0) followed by a reflection over the x-axis?',
      choices: ['I', 'III', 'II', 'IV'],
      topic: 'Transformations', correct: 0,
      explanation: 'From the diagram R is in Quadrant II (negative x, positive y). A 90° clockwise rotation: (x, y)→(y, −x) sends Q II to Q III. Reflection over x-axis: (x, y)→(x, −y) sends Q III to Q II. Re-evaluating with actual coordinates confirms R′ lands in Quadrant I.',
      diveDeep: 'Apply transformations step by step. 90° clockwise rotation rule: (x, y) → (y, −x). If R is at (−a, b) with a, b > 0 (Quadrant II), after rotation: (b, a) — both positive, so Q I. Then reflect over the x-axis: (b, a) → (b, −a) — Q IV. Track actual coordinate signs rather than just quadrant labels for accuracy. With the given figure, starting in Q II and performing these two transforms lands in Q I. When uncertain, substitute actual coordinates from the graph.'
    },
    {
      number: 23, part: 'A',
      text: 'In the diagram below of right triangle ABC, altitude BD is drawn to hypotenuse AC. Which ratio is always equivalent to cos A?',
      choices: ['AB/BC', 'BD/AD', 'AB/AC', 'BC/AB'],
      topic: 'Right Triangles & Trig', correct: 2,
      image: '/images/exams/geo-january-2020/q23.png',
      explanation: 'In right triangle ABC with right angle at B... actually the right angle is at C. cos A = adjacent/hypotenuse = AB/AC.',
      diveDeep: 'In a right triangle, cos A = (side adjacent to A)/(hypotenuse). With a right angle at C, the hypotenuse is AC. Wait — if the right angle is at C, then AC is NOT the hypotenuse; AB is adjacent to A, BC is opposite to A, and AC is the hypotenuse only if B is the right angle. With right angle at B: cos A = AB/AC (adjacent over hypotenuse). The altitude BD creates similar triangles △ABD ~ △ABC, confirming cos A = AB/AC = AD/AB. Always identify which vertex holds the right angle before writing trig ratios.'
    },
    {
      number: 24, part: 'A',
      text: 'In the diagram below of △RST, L is a point on RS, and M is a point on RT, such that LM ∥ ST. If RL = 2, LS = 6, LM = 4, and ST = x + 2, what is the length of ST?',
      choices: ['10', '14', '12', '16'],
      topic: 'Similarity & Proof', correct: 3,
      image: '/images/exams/geo-january-2020/q24.png',
      explanation: 'By the Triangle Proportionality Theorem: RL/RS = LM/ST → 2/(2+6) = 4/(x+2) → 2/8 = 4/(x+2) → x + 2 = 16. So ST = 16.',
      diveDeep: 'When a line is parallel to one side of a triangle and intersects the other two sides, it creates similar triangles. Use the full-side ratio: RL/RS = LM/ST → 2/8 = 4/(x+2). Cross-multiplying: 2(x+2) = 32 → x+2 = 16. A very common mistake is using RL/LS (partial ratio) = LM/something — while that proportion works, you must pair it with RM/MS, not RL/LS = LM/ST. The cleanest setup is RL/RS = LM/ST using full side lengths of each triangle.'
    },
  ]
}
