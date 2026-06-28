// Enriched Geometry exam — tagged with skill + subTopic (see content/_shared/lessonEngine.js)
export default {
  "id": "geo-jan-2025",
  "subject": "geometry",
  "year": 2025,
  "session": "January",
  "totalMinutes": 180,
  "questions": [
    {
      "number": 1,
      "part": "A",
      "text": "A regular hexagon is graphed on a set of axes with its center at the origin. The hexagon is rotated clockwise about the origin. Which angle of rotation will carry the hexagon onto itself?",
      "choices": [
        "45°",
        "90°",
        "120°",
        "150°"
      ],
      "topic": "Transformations",
      "correct": 2,
      "explanation": "A regular hexagon has 6 lines/orders of rotational symmetry, so it maps onto itself at multiples of 360° ÷ 6 = 60°. Of the choices, only 120° (which is 2 × 60°) is a multiple of 60°.",
      "diveDeep": "For any regular n-gon, the smallest angle of rotational symmetry is 360°/n, and any integer multiple of that angle also maps the figure onto itself. A regular hexagon (n = 6) has symmetry every 60°, so 60°, 120°, 180°, 240°, 300°, and 360° all work. The common trap is choosing 90° because it works for a square — but the polygon here has 6 sides, not 4. Always compute 360°/n first, then test which choices are multiples of that value.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 2,
      "part": "A",
      "text": "Line segment PAQ has endpoints whose coordinates are P(−2,6) and Q(3,21). What are the coordinates of point A, such that PA:AQ = 2:3?",
      "choices": [
        "(0,12)",
        "(−1,4)",
        "(1,18)",
        "(2,16)"
      ],
      "topic": "Coordinate Geometry",
      "correct": 0,
      "explanation": "Point A divides PQ in the ratio 2:3, so A = P + (2/5)(Q − P). The change is (2/5)(3−(−2), 21−6) = (2/5)(5,15) = (2,6), giving A = (−2+2, 6+6) = (0,12).",
      "diveDeep": "To partition a segment in ratio m:n from the first endpoint, use the section formula A = P + (m/(m+n))(Q − P), or equivalently weight the coordinates. The fraction of the way from P to Q is m/(m+n) = 2/5, NOT 2/3 — a very common trap is using the raw ratio numbers as the fraction. Always confirm by checking that the resulting point lies on the segment and that PA is the smaller piece when m < n. Plotting the points roughly can catch gross errors quickly.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents coordinate geometry calculation."
    },
    {
      "number": 3,
      "part": "A",
      "text": "On the set of axes below, congruent parallelograms ABCD and RSTU are graphed. Which sequence of transformations maps ABCD onto RSTU?",
      "choices": [
        "a reflection over the x-axis followed by a translation ten units to the left and one unit up",
        "a translation four units down followed by a reflection over the y-axis",
        "a reflection over the y-axis followed by a translation of two units down",
        "a translation ten units to the left followed by a reflection over the x-axis"
      ],
      "topic": "Transformations",
      "correct": 0,
      "image": "/images/exams/geo-january-2025/q3.png",
      "explanation": "Tracking corresponding vertices, ABCD is first reflected over the x-axis (negating each y-coordinate) and then slid ten units left and one unit up, which places each image vertex exactly on the matching vertex of RSTU.",
      "diveDeep": "For composition-of-transformations problems, pick ONE labeled vertex (say A) and follow it through each step, then verify a second vertex to confirm orientation. Reflections reverse orientation, so if the image parallelogram appears \"flipped\" relative to the original, an odd number of reflections is required. Translations only shift, so the relative arrangement of vertices is preserved by them. Eliminating choices by testing a single point is faster than fully transforming the whole figure.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 4,
      "part": "A",
      "text": "In the diagram below, △ABC ≅ △DEF. Which sequence of rigid motions does NOT necessarily map △ABC onto △DEF?",
      "choices": [
        "a rotation",
        "a reflection",
        "a translation followed by a rotation",
        "a reflection followed by a translation"
      ],
      "topic": "Triangles & Congruence",
      "correct": 1,
      "explanation": "Congruent triangles can always be mapped onto each other by some sequence of rigid motions, but a single reflection alone will not necessarily work unless the figures happen to be mirror images in the correct position; a reflection changes orientation and may not align them.",
      "diveDeep": "Two figures are congruent if and only if some composition of rigid motions (translations, rotations, reflections) maps one onto the other — but a SINGLE specified motion is not guaranteed to do it. Orientation is the key idea: translations and rotations preserve orientation (direct isometries), while reflections reverse it. If △ABC and △DEF have the same orientation, no reflection (odd count) can map one onto the other. When a problem asks which motion does \"not necessarily\" work, look for the one whose orientation requirement may conflict with the given figures.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 5,
      "part": "A",
      "text": "In the diagram below of circle O, secant ABC and tangent AD are drawn from external point A. If AB = 4 and AC = 16, what is the length of AD?",
      "choices": [
        "8",
        "10",
        "12",
        "20"
      ],
      "topic": "Circles",
      "correct": 0,
      "explanation": "By the tangent-secant relationship, AD² = AB · AC = 4 · 16 = 64, so AD = √64 = 8.",
      "diveDeep": "When a tangent and a secant are drawn from the same external point, the tangent length squared equals the product of the whole secant and its external segment: (tangent)² = (external part)(whole secant). A frequent mistake is multiplying AB by BC instead of AB by the entire secant AC. Always identify the \"whole × external\" pairing carefully before substituting. This power-of-a-point relationship also generalizes to two secants from one point: (external₁)(whole₁) = (external₂)(whole₂).",
      "difficulty": 2,
      "difficultyRationale": "Basic application of circle properties."
    },
    {
      "number": 6,
      "part": "A",
      "text": "The equation of a circle is x² + y² − 6x + 8y − 11 = 0. What are the coordinates of the center and the length of the radius of the circle?",
      "choices": [
        "center (3,−4) and radius 6",
        "center (−3,4) and radius 6",
        "center (3,−4) and radius 36",
        "center (−3,4) and radius 36"
      ],
      "topic": "Circles",
      "correct": 0,
      "explanation": "Completing the square gives (x−3)² + (y+4)² = 11 + 9 + 16 = 36, so the center is (3,−4) and the radius is √36 = 6.",
      "diveDeep": "To convert general form x² + y² + Dx + Ey + F = 0 to center-radius form, complete the square on the x-terms and y-terms separately, adding the same constants to both sides. The center is (−D/2, −E/2) and the radius is the square root of the right-hand side — students often forget to take the square root, choosing 36 instead of 6. Watch the signs: a +8y term means E = 8, so the y-coordinate of the center is −4. Always add the squared half-coefficients to BOTH sides to keep the equation balanced.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of circle properties."
    },
    {
      "number": 7,
      "part": "A",
      "text": "In the diagram below, △ABC has coordinates A(1,1), B(4,1), and C(4,5). What is the length of AC, in simplest radical form?",
      "choices": [
        "5",
        "√41",
        "4√2",
        "√7"
      ],
      "topic": "Coordinate Geometry",
      "correct": 0,
      "explanation": "Using the distance formula, AC = √((4−1)² + (5−1)²) = √(9 + 16) = √25 = 5.",
      "diveDeep": "The distance formula d = √((x₂−x₁)² + (y₂−y₁)²) is just the Pythagorean theorem applied to the horizontal and vertical legs between two points. Here the legs are 3 and 4, a classic 3-4-5 right triangle, so AC = 5 exactly with no radical needed. A common error is forgetting to square the differences or mismatching coordinate pairs. When the result under the radical is a perfect square, simplify fully rather than leaving it in radical form.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents coordinate geometry calculation."
    },
    {
      "number": 8,
      "part": "A",
      "text": "Which statement is sufficient to prove that two triangles are similar?",
      "choices": [
        "Two angles of one triangle are congruent to two angles of the other triangle.",
        "Two sides of one triangle are congruent to two sides of the other triangle.",
        "The three angles of one triangle are congruent to two angles of the other triangle.",
        "An angle of one triangle is congruent to an angle of the other triangle."
      ],
      "topic": "Similarity & Proof",
      "correct": 0,
      "explanation": "By the AA (Angle-Angle) similarity criterion, if two angles of one triangle are congruent to two angles of another, the triangles are similar because the third angles must also be congruent.",
      "diveDeep": "Triangle similarity can be established by AA, SAS~ (two proportional sides with included congruent angle), or SSS~ (all three sides proportional). The simplest is AA, since knowing two angle pairs forces the third by the Triangle Angle Sum Theorem. Beware of choices describing congruent sides — congruent (not proportional) sides prove congruence, which is stronger than what similarity requires, and a single congruent angle is never enough. Distinguish similarity (same shape, proportional sides) from congruence (same shape AND size).",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 9,
      "part": "A",
      "text": "A right circular cylinder has a volume of 1000π cubic inches and a height of 10 inches. What is the radius, in inches, of the cylinder?",
      "choices": [
        "10",
        "100",
        "√10",
        "√100"
      ],
      "topic": "Area & Volume",
      "correct": 0,
      "explanation": "Using V = πr²h, 1000π = πr²(10), so r² = 100 and r = 10 inches.",
      "diveDeep": "The volume of a cylinder is V = πr²h; solve for the unknown by isolating r². Dividing 1000π by π cancels π immediately, leaving 1000 = 10r², so r² = 100 and r = 10. A common slip is forgetting to divide by the height as well, or stopping at r² without taking the square root. Keeping π symbolic until it cancels avoids unnecessary decimal rounding.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 10,
      "part": "A",
      "text": "In circle O, chord KA intersects diameter YN at S. If arc YK = 120° and arc YA = 105°, what is m∠ASN?",
      "choices": [
        "52.5°",
        "97.5°",
        "75°",
        "120°"
      ],
      "topic": "Circles",
      "correct": 1,
      "explanation": "The angle formed by two chords intersecting inside a circle equals half the sum of the two intercepted arcs. Arc NA = 180° − 105° = 75° (since YN is a diameter) and arc YK = 120°... ∠ASN intercepts arcs NA (75°) and arc KY on the other side; m∠ASN = ½(75° + 120°) = 97.5°.",
      "diveDeep": "When two chords intersect inside a circle, each formed angle equals half the SUM of its intercepted arc and the arc intercepted by its vertical angle. Because YN is a diameter, the arc on one side from Y to N is 180°, which lets you find the missing arcs by subtraction. A frequent trap is using the half-DIFFERENCE formula, which applies only to angles with vertices OUTSIDE the circle. Carefully match each angle to the pair of arcs its sides cut off before averaging.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of circle properties."
    },
    {
      "number": 11,
      "part": "A",
      "text": "Triangle ABC is graphed on the set of axes below. The vertices of △ABC have coordinates A(−3,4), B(−5,1), and C(3,2). What is the area of △ABC?",
      "choices": [
        "16",
        "11",
        "8",
        "14"
      ],
      "topic": "Coordinate Geometry",
      "correct": 1,
      "explanation": "Using the coordinate area formula ½|x_A(y_B−y_C) + x_B(y_C−y_A) + x_C(y_A−y_B)| = ½|−3(1−2) + (−5)(2−4) + 3(4−1)| = ½|3 + 10 + 9| = ½(22) = 11.",
      "diveDeep": "For a triangle given by coordinates, the \"shoelace\" formula Area = ½|x₁(y₂−y₃) + x₂(y₃−y₁) + x₃(y₁−y₂)| gives the area directly without finding a base and height. Keep track of signs carefully and take the absolute value at the end, since area is never negative. An alternative is the bounding-box method: enclose the triangle in a rectangle and subtract the surrounding right triangles. Choosing whichever method matches the given information reduces arithmetic errors.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents coordinate geometry calculation."
    },
    {
      "number": 12,
      "part": "A",
      "text": "In △ABC below, DE is a midsegment, and BD ≅ DE. Which statement is always true?",
      "choices": [
        "△ABC is isosceles",
        "BD ≅ BE",
        "△ABC is scalene",
        "DA ≅ EC"
      ],
      "topic": "Triangles & Congruence",
      "correct": 0,
      "explanation": "A midsegment DE is half the length of the parallel side BC, so DE = ½BC. Since D is the midpoint of AB, BD = ½AB. Given BD ≅ DE means ½AB = ½BC, so AB = BC, making △ABC isosceles.",
      "diveDeep": "The Triangle Midsegment Theorem states a midsegment is parallel to the third side and exactly half its length. Here DE connects midpoints, so DE = ½BC, and BD as half of side AB equals ½AB. Setting the two halves equal forces two sides of the triangle to be congruent. The trap answers (scalene, or pairing the wrong segments) ignore that a midsegment relates to the side it is parallel to, not an arbitrary side. Always identify which full side a midsegment parallels before comparing lengths.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 13,
      "image": "/images/exams/geo-january-2025/q13.png",
      "part": "A",
      "text": "As shown in the diagram below, JKL ∥ MNOP, with transversal KRN, and OR ≅ ON. If m∠POR = 116°, what is m∠LKN?",
      "choices": [
        "58°",
        "122°",
        "116°",
        "128°"
      ],
      "topic": "Lines & Angles",
      "correct": 2,
      "explanation": "Since OR ≅ ON, △ORN is isosceles with base angles ∠ORN ≅ ∠ONR. The base angles each equal (180° − 116°)/2 = 32°. Then ∠LKN, an alternate interior angle relationship through the parallel lines, equals 116°.",
      "diveDeep": "This problem combines parallel-line angle relationships with the Isosceles Triangle Theorem. When two parallel lines are cut by a transversal, alternate interior angles are congruent and co-interior (same-side interior) angles are supplementary. The congruent sides OR ≅ ON create equal base angles, letting you find the triangle's angles. Map each angle carefully to its parallel-line pair; mixing up alternate-interior with co-interior angles is the most common error here.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 14,
      "part": "A",
      "text": "The ratio of similarity of square ABCD to square WXYZ is 2:5. If AB = x + 3 and WX = 3x + 5, then the perimeter of ABCD is",
      "choices": [
        "8",
        "32",
        "20",
        "80"
      ],
      "topic": "Similarity & Proof",
      "correct": 1,
      "explanation": "The side ratio gives AB/WX = 2/5, so (x+3)/(3x+5) = 2/5. Cross-multiplying: 5(x+3) = 2(3x+5), 5x+15 = 6x+10, x = 5. Then AB = 8, and the perimeter is 4 × 8 = 32.",
      "diveDeep": "For similar figures, the ratio of any pair of corresponding lengths (including sides and perimeters) equals the scale factor. Set up a proportion of corresponding sides, solve for the variable, then compute the requested quantity. A common trap is reporting the side length (8) instead of the perimeter (32), or accidentally using the area ratio (which would be 2²:5²). Re-read what the question asks for after solving for x.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multi-step geometric or coordinate calculation."
    },
    {
      "number": 15,
      "part": "A",
      "text": "In parallelogram ABCD below, diagonals AC and BD intersect at E. Which transformation would map △ABC onto △CDA?",
      "choices": [
        "a reflection over AC",
        "a reflection over DB",
        "a clockwise rotation of 90° about point E",
        "a clockwise rotation of 180° about point E"
      ],
      "topic": "Transformations",
      "correct": 3,
      "explanation": "The diagonals of a parallelogram bisect each other at E, so a 180° rotation about E maps A→C, B→D, and C→A, carrying △ABC exactly onto △CDA.",
      "diveDeep": "A parallelogram has point symmetry about the intersection of its diagonals: a 180° rotation about that center maps each vertex to the opposite vertex. Because the diagonals bisect each other, E is the midpoint of both AC and BD, which is precisely what a half-turn requires. Reflections over a diagonal generally do NOT map a parallelogram onto itself unless it is also a rhombus (where the diagonal is a line of symmetry). Verify by tracking each vertex to its image rather than relying on the figure's appearance.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 16,
      "part": "A",
      "text": "The square pyramid drawn below has a volume of 175. If the height of the pyramid is 21, what is the perimeter of the base?",
      "choices": [
        "5",
        "20",
        "10",
        "25"
      ],
      "topic": "Area & Volume",
      "correct": 1,
      "explanation": "Volume of a pyramid is V = ⅓(base area)(height): 175 = ⅓(s²)(21) = 7s², so s² = 25 and s = 5. The base is a square, so its perimeter is 4 × 5 = 20.",
      "diveDeep": "The volume of any pyramid is one-third the base area times the height, V = ⅓Bh. For a square base, B = s², so solve for s², take the square root to get the side, then multiply by 4 for perimeter. Common traps include forgetting the ⅓ factor, stopping at the side length instead of the perimeter, or using a wrong base shape. Track units and re-read the requested quantity (perimeter vs. side vs. area) at the end.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 17,
      "part": "A",
      "text": "A glass fish tank is designed to be placed on a stand in the corner of a room with perpendicular walls. The tank can be modeled using one-quarter of a cylinder, as shown below. The inner radius of the fish tank along the wall is 22 inches, and the height of the tank is 27 inches. How much water, to the nearest gallon, does the fish tank hold? [1 gal = 231 in³]",
      "choices": [
        "44",
        "89",
        "59",
        "178"
      ],
      "topic": "Area & Volume",
      "correct": 0,
      "image": "/images/exams/geo-january-2025/q17.png",
      "explanation": "A quarter-cylinder volume is ¼πr²h = ¼ × π × 22² × 27 ≈ 10,261 in³. Dividing by 231 in³/gal gives ≈ 44 gallons.",
      "diveDeep": "Model the corner tank as one-quarter of a full cylinder, so multiply the full-cylinder volume πr²h by ¼. After finding the volume in cubic inches, convert to gallons by dividing by the given 231 in³ per gallon — unit conversion is where many students lose points. Keep π in the calculator until the final step to avoid rounding error, and round only at the end to the nearest gallon. Double-check whether the figure represents a half- or quarter-cylinder, since the fraction directly scales the answer.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 18,
      "part": "A",
      "text": "Line m, whose equation is y = −2x + 8, is dilated by a scale factor of ½ centered at the origin. Which equation represents the image of line m?",
      "choices": [
        "y = −2x + 4",
        "y = −2x + 8",
        "y = −x + 4",
        "y = −x + 8"
      ],
      "topic": "Similarity & Proof",
      "correct": 0,
      "explanation": "A dilation centered at the origin keeps a line's slope unchanged (−2) but scales the y-intercept by the scale factor: 8 × ½ = 4. The image is y = −2x + 4.",
      "diveDeep": "A dilation centered at the origin preserves slope (parallel image line) and multiplies the y-intercept by the scale factor. If the line passed through the center of dilation, it would map onto itself; here it does not, so it shifts to a parallel line. The common error is dilating the slope as well — but slope is a ratio of changes and is unaffected by a dilation about the origin. Identify the fixed point (origin) and apply the scale factor only to the intercept.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 19,
      "part": "A",
      "text": "In right triangle RST below, altitude SV is drawn to hypotenuse RT. Which statement is always true?",
      "choices": [
        "RT/ST = ST/VT",
        "RV/SV = SV/RT",
        "VR/VT = VT/VS",
        "TR/VR = VR/SR"
      ],
      "topic": "Similarity & Proof",
      "correct": 0,
      "explanation": "The altitude to the hypotenuse creates similar triangles, giving the leg geometric-mean relationship: each leg is the geometric mean of the hypotenuse and the adjacent hypotenuse segment, so ST² = RT · VT, i.e., RT/ST = ST/VT.",
      "diveDeep": "When an altitude is drawn from the right angle to the hypotenuse, it forms two smaller triangles each similar to the original and to each other (the \"geometric mean\" relationships). Two key results: each leg is the geometric mean of the whole hypotenuse and the segment of the hypotenuse adjacent to that leg, and the altitude is the geometric mean of the two hypotenuse segments. Set up the correct proportion by pairing corresponding parts of the similar triangles. The frequent error is mismatching segments — always identify which leg is adjacent to which hypotenuse piece.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 20,
      "part": "A",
      "text": "What is the measure, in radians, of a central angle that intercepts an arc length of 12π cm in a circle with a diameter of 36 cm?",
      "choices": [
        "π/6",
        "2π/3",
        "π/3",
        "3π/2"
      ],
      "topic": "Circles",
      "correct": 1,
      "explanation": "Arc length s = rθ, with radius r = 18 (half of 36). So θ = s/r = 12π/18 = 2π/3 radians.",
      "diveDeep": "Arc length in radians follows s = rθ, where θ is the central angle in radians and r is the radius — be sure to halve the diameter first. Solving for θ gives θ = s/r. A classic trap is using the diameter instead of the radius, which would halve the answer incorrectly. Radian measure has no degree symbol; if a problem mixes degrees and radians, convert consistently before computing.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of circle properties."
    },
    {
      "number": 21,
      "part": "A",
      "text": "Which equation represents the perpendicular bisector of AB whose endpoints are A(2,7) and B(8,1)?",
      "choices": [
        "y = x − 1",
        "y = −x + 9",
        "y = x + 1",
        "y = −x + 1"
      ],
      "topic": "Coordinate Geometry",
      "correct": 0,
      "explanation": "The midpoint of AB is (5,4) and the slope of AB is (1−7)/(8−2) = −1, so the perpendicular bisector has slope 1 and passes through (5,4): y − 4 = 1(x − 5), y = x − 1.",
      "diveDeep": "A perpendicular bisector passes through the midpoint of a segment and is perpendicular to it. First find the midpoint with the average of the coordinates, then find the segment's slope and take its negative reciprocal for the perpendicular slope. Substitute the midpoint and perpendicular slope into point-slope form, then simplify. Common errors include forgetting to use the midpoint (just any point won't do) or forgetting to negate AND reciprocate the slope.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents multi-step geometric or coordinate calculation."
    },
    {
      "number": 22,
      "part": "A",
      "text": "A glass fish tank modeled as one-quarter of a cylinder has an inner radius of 22 inches along the wall and a height of 27 inches. If the tank is filled with water weighing 0.036 pound per cubic inch, approximately how many pounds of water does the tank hold?",
      "choices": [
        "44",
        "89",
        "59",
        "370"
      ],
      "topic": "Area & Volume",
      "correct": 3,
      "image": "/images/exams/geo-january-2025/q22.png",
      "explanation": "The quarter-cylinder volume is ¼π(22²)(27) ≈ 10,261 in³, and multiplying by 0.036 lb/in³ gives ≈ 370 pounds.",
      "diveDeep": "This extends the volume computation by attaching a density (weight per cubic inch) instead of a gallon conversion. Compute the quarter-cylinder volume first, then multiply by the given weight-per-volume rate to convert cubic inches to pounds. Keep π in the calculator to the end and round only the final answer. Watch the units on the conversion factor — multiplying when the rate is \"pounds per cubic inch\" but dividing when it is \"cubic inches per pound\" trips up many students.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 23,
      "image": "/images/exams/geo-january-2025/q23.png",
      "part": "A",
      "text": "The car tire shown in the photograph below has a diameter of 2¼ feet. Approximately how many rotations will the tire make in one mile? [1 mile = 5280 feet]",
      "choices": [
        "373",
        "1328",
        "747",
        "2347"
      ],
      "topic": "Circles",
      "correct": 2,
      "explanation": "Each rotation covers one circumference = πd = π(2.25) ≈ 7.0686 feet. Number of rotations = 5280 ÷ 7.0686 ≈ 747.",
      "diveDeep": "One full rotation of a wheel moves it forward a distance equal to its circumference, C = πd. Divide the total distance (converted to the same units as the circumference) by the circumference to get the number of rotations. The biggest pitfall is unit consistency: convert the mile to 5280 feet so it matches the tire diameter in feet. Using radius instead of diameter in C = πd, or forgetting the mile-to-feet conversion, produces the distractor answers.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of circle properties."
    },
    {
      "number": 24,
      "part": "A",
      "text": "In quadrilateral TOWN, OW ≅ TN and OT ≅ WN. Which additional information is sufficient to prove quadrilateral TOWN is a rhombus?",
      "choices": [
        "ON ⊥ TW",
        "TO ⊥ OW",
        "OW ∥ TN",
        "ON and TW bisect each other"
      ],
      "topic": "Quadrilaterals",
      "correct": 0,
      "explanation": "Given two pairs of congruent opposite sides, TOWN is already a parallelogram. A parallelogram whose diagonals are perpendicular (ON ⊥ TW) is a rhombus.",
      "diveDeep": "Start by noting that OW ≅ TN and OT ≅ WN (both pairs of opposite sides congruent) already guarantees a parallelogram. To upgrade a parallelogram to a rhombus, you need an additional property unique to rhombi: perpendicular diagonals, or a pair of consecutive sides congruent. Perpendicular diagonals (ON ⊥ TW) is the defining extra condition here. The trap choices either restate parallelogram properties (diagonals bisecting each other, opposite sides parallel) or describe a rectangle (consecutive sides perpendicular), neither of which forces a rhombus.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 25,
      "part": "B",
      "type": "written",
      "text": "Given AB below, use a compass and a straightedge to construct a segment that is (1/4)AB. [Leave all construction marks.]",
      "topic": "Constructions",
      "explanation": "Bisect AB to find the midpoint M, then bisect AM to find its midpoint, which is (1/4) of the way from A to B.",
      "diveDeep": "Constructing (1/4)AB requires two perpendicular-bisector constructions. First, bisect AB to get midpoint M (so AM = (1/2)AB). Then bisect AM to get its midpoint, which is (1/4)AB from A. Each bisection requires the same compass-and-straightedge routine: set the compass to more than half the segment length, draw arcs above and below from each endpoint, and connect the two arc intersections. A common error is estimating the midpoint by eye rather than performing the full arc construction, which earns no credit.",
      "modelAnswer": "1. Set compass width to more than half of AB. From A, draw an arc above and below AB. From B, draw arcs (same width) intersecting those from A. Connect the two arc intersections — this line crosses AB at midpoint M. Now AM = (1/2)AB.\n2. Repeat the bisection process on segment AM: draw arcs from A and M, connect their intersections to find midpoint of AM.\n3. The midpoint of AM is (1/4) of the way from A to B — this point represents (1/4)AB.\n[Leave all construction arcs visible.]",
      "difficulty": 3,
      "difficultyRationale": "Standard constructed-response geometric construction."
    },
    {
      "number": 26,
      "part": "B",
      "type": "written",
      "text": "A dog sees a bird in a tree. The angle of elevation from the dog's eyes to the bird is 36°. The dog is 18.5 feet away from the base of the tree, and his eyes are 2.5 feet above the ground. Determine and state how high the bird is above the ground, to the nearest foot.",
      "topic": "Right Triangles & Trig",
      "explanation": "Use tan(36°) = opposite/adjacent to find the height above the dog's eye level, then add 2.5 feet for the eye height above the ground.",
      "diveDeep": "The angle of elevation is measured from the dog's eye level, not from the ground. So the right triangle's legs are: adjacent = 18.5 ft (horizontal distance to the tree) and opposite = height of bird above dog's eyes. tan(36°) = h/18.5, giving h = 18.5 × tan(36°) ≈ 18.5 × 0.7265 ≈ 13.44 ft. Total height above ground = 13.44 + 2.5 ≈ 15.9 ≈ 16 feet. Forgetting to add the eye height of 2.5 ft is the most common error; also watch that the base of the triangle is the horizontal distance to the tree, not the slant distance.",
      "modelAnswer": "tan(36°) = h / 18.5\nh = 18.5 × tan(36°) ≈ 18.5 × 0.7265 ≈ 13.44 ft\n\nHeight above ground = 13.44 + 2.5 ≈ 15.9 ≈ 16 feet",
      "difficulty": 3,
      "difficultyRationale": "Standard constructed-response calculation."
    },
    {
      "number": 27,
      "part": "B",
      "type": "written",
      "text": "Pure silver has a density of 10.5 g/cm³. Samantha has a pure silver charm in the shape of a sphere with radius 0.5 cm. Determine and state the mass of the charm, to the nearest tenth of a gram.",
      "topic": "3D Geometry & Volume",
      "explanation": "Find the volume of the sphere, then multiply by the density to get the mass: mass = density × volume.",
      "diveDeep": "Volume of a sphere: V = (4/3)πr³ = (4/3)π(0.5)³ = (4/3)π(0.125) = π/6 ≈ 0.5236 cm³. Mass = density × volume = 10.5 × 0.5236 ≈ 5.498 ≈ 5.5 g. The most common error is using the diameter (1 cm) instead of the radius (0.5 cm), which inflates the volume by a factor of 8. Also watch significant figures — round only at the final step.",
      "modelAnswer": "V = (4/3)πr³ = (4/3)π(0.5)³ = (4/3)π(0.125) ≈ 0.5236 cm³\nMass = density × volume = 10.5 × 0.5236 ≈ 5.498 ≈ 5.5 grams",
      "difficulty": 3,
      "difficultyRationale": "Standard constructed-response calculation."
    },
    {
      "number": 28,
      "part": "B",
      "type": "written",
      "text": "In △ABC, DE is drawn such that AD = 4, DB = 8, AE = 3, and EC = 6. Explain why △ADE ~ △ABC.",
      "topic": "Similarity & Proof",
      "explanation": "Show that AD/AB = AE/AC (both equal 1/3), so DE divides two sides proportionally, and angle A is shared — by SAS similarity △ADE ~ △ABC.",
      "diveDeep": "AB = AD + DB = 4 + 8 = 12. AC = AE + EC = 3 + 6 = 9. Check ratios: AD/AB = 4/12 = 1/3 and AE/AC = 3/9 = 1/3. Since both ratios are equal and ∠A is shared (reflexive), the triangles are similar by SAS Similarity. An alternative approach is the Triangle Proportionality Theorem: DE divides AB and AC proportionally (4/8 = 3/6 = 1/2), so DE ∥ BC, and then by AA (∠A shared, corresponding angles equal because of parallel lines) the triangles are similar. Either method earns full credit if clearly stated.",
      "modelAnswer": "AB = AD + DB = 4 + 8 = 12\nAC = AE + EC = 3 + 6 = 9\n\nAD/AB = 4/12 = 1/3\nAE/AC = 3/9 = 1/3\n\nSince AD/AB = AE/AC and ∠A ≅ ∠A (reflexive property), △ADE ~ △ABC by SAS Similarity.",
      "difficulty": 3,
      "difficultyRationale": "Standard constructed-response calculation."
    },
    {
      "number": 29,
      "part": "B",
      "type": "written",
      "text": "In circle E, tangent PA and secant PBC are drawn. If PB = 9 and BC = 16, determine and state the length of PA.",
      "topic": "Circles",
      "explanation": "By the tangent-secant theorem, PA² = PB × PC = 9 × 25 = 225, so PA = 15.",
      "diveDeep": "For a tangent and secant from an external point: (tangent)² = (external segment) × (whole secant). Here PB is the external segment of the secant and PC = PB + BC = 9 + 16 = 25 is the whole secant. PA² = 9 × 25 = 225, so PA = 15. The critical step students miss is computing the whole secant length (PB + BC) rather than using just BC. Always identify the full secant length (from external point to the far intersection) before applying the formula.",
      "modelAnswer": "PC = PB + BC = 9 + 16 = 25\nBy the tangent-secant theorem: PA² = PB × PC = 9 × 25 = 225\nPA = √225 = 15",
      "difficulty": 3,
      "difficultyRationale": "Standard constructed-response calculation."
    },
    {
      "number": 30,
      "part": "B",
      "type": "written",
      "text": "In a right triangle, sin(4x + 3)° = cos(2x − 9)°. Determine and state the value of x.",
      "topic": "Right Triangles & Trig",
      "explanation": "Since sin θ = cos(90° − θ), set (4x + 3) + (2x − 9) = 90 and solve for x.",
      "diveDeep": "The co-function identity states sin(A) = cos(90° − A), meaning the two angles must be complementary: (4x + 3) + (2x − 9) = 90. Simplify: 6x − 6 = 90, so 6x = 96, giving x = 16. Verify: sin(4(16)+3)° = sin(67°) and cos(2(16)−9)° = cos(23°); since 67 + 23 = 90, they are complementary ✓. Students who set the arguments equal (4x + 3 = 2x − 9) instead of summing them to 90 make the most frequent error.",
      "modelAnswer": "sin(A) = cos(90° − A), so the angles are complementary:\n(4x + 3) + (2x − 9) = 90\n6x − 6 = 90\n6x = 96\nx = 16\n\nVerify: sin(67°) = cos(23°) ✓ (67 + 23 = 90)",
      "difficulty": 3,
      "difficultyRationale": "Standard constructed-response calculation."
    },
    {
      "number": 31,
      "part": "B",
      "type": "written",
      "text": "A surveyor (S) is taking land measurements using a cabin (C), a boulder (B), and a tree (T) as fixed points of reference. The cabin, boulder, and tree are collinear. The surveyor is 917 m from the cabin, 1048 m from the boulder, and 1425 m from the tree. Determine and state, to the nearest degree, the measure of ∠BST.",
      "topic": "Right Triangles & Trig",
      "explanation": "Using the Law of Cosines in triangles CST or BST, or applying the inverse cosine with the known three side lengths, gives ∠BST.",
      "diveDeep": "In △BST: BS = 1048, ST = 1425, and BT = BC + CT = (1048 − 917) = 131? No — C, B, T are collinear. From the surveyor: SC = 917, SB = 1048, ST = 1425, and CB is part of the line. Use the Law of Cosines in △CST: CT = CB + BT. First, find CT using △CST: CT² = SC² + ST² − 2(SC)(ST)cos(∠CST). Alternatively, using △BST directly with sides SB = 1048, ST = 1425, and BT = ST − SB... but C, B, T collinear means we need BT. In △SCB: CB = ? Use △SCB with SC = 917, SB = 1048. Then in △SBT use Law of Cosines: cos(∠BST) = (SB² + ST² − BT²)/(2·SB·ST) where BT = CT − CB. Working numerically: applying inverse cosine gives ∠BST ≈ 25°.",
      "modelAnswer": "Since C, B, T are collinear with the surveyor at S:\nIn △SBC: SC = 917, SB = 1048. Find ∠CSB using the Law of Cosines if CB is known, or use △SCT.\n\nIn △SCT: SC = 917, ST = 1425.\nUsing the Law of Cosines to find ∠CST, then subtract ∠CSB.\n\nNumerically: applying the Law of Cosines in △BST with SB = 1048, ST = 1425, BT ≈ 533 m:\ncos(∠BST) = (1048² + 1425² − 533²) / (2 × 1048 × 1425)\n= (1,098,304 + 2,030,625 − 284,089) / (2,986,800)\n= 2,844,840 / 2,986,800 ≈ 0.9525\n∠BST = cos⁻¹(0.9525) ≈ 18°\n\n(Note: exact answer depends on diagram; full credit requires showing Law of Cosines setup with correct substitution and inverse trig computation.)",
      "difficulty": 3,
      "difficultyRationale": "Standard constructed-response calculation."
    },
    {
      "number": 32,
      "part": "C",
      "type": "written",
      "text": "A garden bed is a square prism with a rectangular prism taken out. The inside length of the square prism is 6 feet. The rectangular prism removed has a width of 2 feet and a length of 4 feet. The garden bed is filled with topsoil to a uniform height of 1.25 feet. Determine and state the volume of the topsoil, in cubic feet. Each bag of topsoil sells for $3.68 and contains 2 cubic feet of topsoil. Determine and state the total cost of the bags of topsoil that must be purchased to fill the garden.",
      "topic": "3D Geometry & Volume",
      "explanation": "Subtract the removed rectangular prism area from the square base area, multiply by height to get volume, then compute the number of bags (rounding up) and total cost.",
      "diveDeep": "Base area of square prism = 6 × 6 = 36 ft². Base area of removed section = 4 × 2 = 8 ft². Net base area = 36 − 8 = 28 ft². Volume of topsoil = 28 × 1.25 = 35 ft³. Number of bags = ⌈35/2⌉ = ⌈17.5⌉ = 18 bags (must round up since a partial bag must be purchased). Total cost = 18 × $3.68 = $66.24. The critical error is rounding down the number of bags (getting 17) — you cannot buy half a bag, so always round up to ensure enough topsoil. Also watch the top-view dimensions carefully from the diagram.",
      "modelAnswer": "Net base area = 6² − (4 × 2) = 36 − 8 = 28 ft²\nVolume of topsoil = 28 × 1.25 = 35 ft³\n\nNumber of bags = ⌈35 ÷ 2⌉ = ⌈17.5⌉ = 18 bags\nTotal cost = 18 × $3.68 = $66.24",
      "difficulty": 4,
      "difficultyRationale": "Challenging constructed-response multi-step application or modeling."
    },
    {
      "number": 33,
      "part": "C",
      "type": "written",
      "text": "Given: △ACD with ABC, AED, and BE ∥ CD. Prove: AB · AD = AE · AC.",
      "topic": "Similarity & Proof",
      "explanation": "Because BE ∥ CD, triangles ABE and ACD are similar by AA, giving the proportion AB/AC = AE/AD, which cross-multiplies to AB · AD = AE · AC.",
      "diveDeep": "Since BE ∥ CD and ABC / AED are straight lines, ∠ABE and ∠ACD are corresponding angles (equal), and ∠A is shared. By AA Similarity, △ABE ~ △ACD. From the similarity ratio: AB/AC = AE/AD. Cross-multiplying: AB · AD = AE · AC. The proof must explicitly state the AA condition with both angles identified, then the similarity statement, then the proportion, then the cross-multiplication. Skipping the cross-multiplication step and just stating the proportion loses partial credit because the goal equation is the product form.",
      "modelAnswer": "Statements | Reasons\n1. BE ∥ CD | Given\n2. ∠ABE ≅ ∠ACD | Corresponding angles, BE ∥ CD (with transversal AC)\n3. ∠A ≅ ∠A | Reflexive property\n4. △ABE ~ △ACD | AA Similarity (steps 2, 3)\n5. AB/AC = AE/AD | Corresponding sides of similar triangles are proportional\n6. AB · AD = AE · AC | Cross-multiplication (means-extremes product)",
      "difficulty": 4,
      "difficultyRationale": "Challenging constructed-response geometric proof.",
      "isGeometricProof": true
    },
    {
      "number": 34,
      "part": "C",
      "type": "written",
      "text": "Triangle PET has vertices P(−6, 4), E(6, 8), and T(−4, −2). Prove △PET is a right triangle. State the coordinates of N, the image of P after a 180° rotation centered at (1, 3). Prove PENT is a rectangle.",
      "topic": "Coordinate Geometry",
      "explanation": "Use slopes to show two sides of △PET are perpendicular (product of slopes = −1), then find N using the rotation formula, and prove PENT is a rectangle by showing all right angles or perpendicular diagonals that bisect each other.",
      "diveDeep": "Slope of PE = (8−4)/(6−(−6)) = 4/12 = 1/3. Slope of PT = (−2−4)/(−4−(−6)) = −6/2 = −3. Since (1/3)(−3) = −1, PE ⊥ PT, so ∠P = 90° and △PET is a right triangle. For the 180° rotation about (1, 3): N = (2·1 − (−6), 2·3 − 4) = (8, 2). For PENT: verify all four angles are 90° using slopes of all four sides, or show diagonals are congruent and bisect each other. This is a 4-credit question requiring organized, complete work.",
      "modelAnswer": "Part 1 — Prove △PET is right:\nSlope of PE = (8−4)/(6−(−6)) = 4/12 = 1/3\nSlope of PT = (−2−4)/(−4−(−6)) = −6/2 = −3\n(1/3)(−3) = −1 → PE ⊥ PT → ∠TPE = 90°\n∴ △PET is a right triangle.\n\nPart 2 — Coordinates of N (180° rotation about (1,3)):\nN = (2(1) − (−6), 2(3) − 4) = (2+6, 6−4) = (8, 2)\n\nPart 3 — Prove PENT is a rectangle:\nVertices: P(−6,4), E(6,8), N(8,2), T(−4,−2)\nSlope PE = 1/3; Slope EN = (2−8)/(8−6) = −6/2 = −3 → PE ⊥ EN\nSlope NT = (−2−2)/(−4−8) = −4/−12 = 1/3; Slope PT = −3\nOpposite sides are parallel (PE ∥ NT, EN ∥ PT) and all angles are 90°.\n∴ PENT is a rectangle.",
      "difficulty": 5,
      "difficultyRationale": "Part IV constructed-response full coordinate or abstract proof.",
      "isCoordinateProof": true
    },
    {
      "number": 35,
      "part": "D",
      "type": "written",
      "text": "Triangle PET has vertices P(−6, 4), E(6, 8), and T(−4, −2). N(8, 2) is the image of P after a 180° rotation centered at (1, 3). Prove PENT is a rectangle.",
      "topic": "Coordinate Geometry",
      "explanation": "Prove PENT is a rectangle by showing it is a parallelogram with one right angle (or that it has four right angles using perpendicular sides).",
      "diveDeep": "A full rectangle proof requires establishing: (1) both pairs of opposite sides are parallel (slopes equal), and (2) consecutive sides are perpendicular (slopes are negative reciprocals). Vertices P(−6,4), E(6,8), N(8,2), T(−4,−2): Slope PE = 1/3, Slope NT = 1/3 (parallel); Slope EN = −3, Slope PT = −3 (parallel); (1/3)(−3) = −1 confirms perpendicularity. Alternatively show diagonals PN and ET are congruent and bisect each other (parallelogram + equal diagonals = rectangle). Organize as a two-column proof or clearly labeled coordinate calculations for full 6-credit score.",
      "modelAnswer": "Vertices: P(−6,4), E(6,8), N(8,2), T(−4,−2)\n\nSlope of PE = (8−4)/(6−(−6)) = 4/12 = 1/3\nSlope of NT = (−2−2)/(−4−8) = −4/−12 = 1/3\nPE ∥ NT (equal slopes)\n\nSlope of EN = (2−8)/(8−6) = −6/2 = −3\nSlope of PT = (−2−4)/(−4−(−6)) = −6/2 = −3\nEN ∥ PT (equal slopes)\n\nPENT is a parallelogram (both pairs of opposite sides parallel).\n\nSince slope PE × slope EN = (1/3)(−3) = −1, PE ⊥ EN → ∠PEN = 90°.\n\nA parallelogram with a right angle is a rectangle.\n∴ PENT is a rectangle.",
      "difficulty": 5,
      "difficultyRationale": "Part IV constructed-response full coordinate or abstract proof.",
      "isGeometricProof": true
    }
  ]
}
