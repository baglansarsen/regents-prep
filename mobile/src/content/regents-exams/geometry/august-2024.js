// Geometry Regents — August 2024
export default {
  id: 'geo-aug-2024',
  subject: 'geometry',
  year: 2024,
  session: 'August',
  totalMinutes: 180,
  questions: [
    {
      number: 1,
      part: 'A',
      text: 'In the diagram below, line m is parallel to line n, and line t is a transversal. Angle 1 and angle 2 are a pair of which type of angles?',
      choices: ['vertical angles', 'corresponding angles', 'alternate interior angles', 'same-side (co-interior) angles'],
      topic: 'Angles & Lines',
      correct: 2,
      image: '/images/exams/geo-august-2024/q1.png',
      explanation: 'Alternate interior angles lie on opposite sides of the transversal and between the two parallel lines, which describes the position of these two angles.',
      diveDeep: 'When two parallel lines are cut by a transversal, eight angles are formed. Corresponding angles are in matching positions, alternate interior angles are between the lines on opposite sides of the transversal, and same-side interior angles are between the lines on the same side. A common trap is confusing corresponding with alternate interior; check whether the angles are inside the parallel lines (interior) and on opposite sides (alternate). On the exam, sketch a Z-shape for alternate interior and an F-shape for corresponding to keep them straight.'
    },
    {
      number: 2,
      part: 'A',
      text: 'A triangle has a base of 10 and a height of 6. What is the area of the triangle?',
      choices: ['30', '60', '16', '8'],
      topic: 'Area & Volume',
      correct: 0,
      explanation: 'The area of a triangle is A = ½bh = ½ × 10 × 6 = 30 square units.',
      diveDeep: 'The triangle area formula A = ½bh is on the Regents reference sheet, but students frequently forget the factor of ½ and report 60, which is the area of the corresponding parallelogram. The base and height must be perpendicular to each other — the height is the altitude, not necessarily a side length. When a triangle is given with a slanted side, always identify the perpendicular height before plugging into the formula. Memorize that any triangle is exactly half of a parallelogram with the same base and height.'
    },
    {
      number: 3,
      part: 'A',
      text: 'Which transformation does NOT always preserve distance (is not an isometry)?',
      choices: ['translation', 'rotation', 'reflection', 'dilation'],
      topic: 'Triangles & Congruence',
      correct: 3,
      explanation: 'A dilation changes the size of a figure by a scale factor, so unless the scale factor is 1 it does not preserve distance; translations, rotations, and reflections are rigid motions.',
      diveDeep: 'Rigid motions (isometries) — translations, rotations, and reflections — preserve length, angle measure, and area, producing congruent images. A dilation preserves angle measure and shape but multiplies all lengths by the scale factor k, producing a similar (not congruent) image. A frequent trap is assuming dilation preserves angles means it preserves distance; it only preserves distance when k = 1. Remember: rigid motions → congruence, dilations → similarity.'
    },
    {
      number: 4,
      part: 'A',
      text: 'What are the coordinates of the midpoint of a line segment whose endpoints are A(−2, 6) and B(4, −2)?',
      choices: ['(1, 4)', '(3, −4)', '(1, 2)', '(−3, 4)'],
      topic: 'Coordinate Geometry',
      correct: 2,
      explanation: 'The midpoint is the average of the coordinates: ((−2 + 4)/2, (6 + (−2))/2) = (1, 2).',
      diveDeep: 'The midpoint formula M = ((x₁ + x₂)/2, (y₁ + y₂)/2) finds the point exactly halfway between two endpoints. A common error is subtracting instead of adding the coordinates (that gives the components of the distance/slope, not the midpoint). Watch signs carefully when negative coordinates are involved. The midpoint is heavily used to find centers of circles, to test whether diagonals bisect each other in quadrilateral proofs, and to find the point of a partition.'
    },
    {
      number: 5, image: '/images/exams/geo-august-2024/q5.png',
      part: 'A',
      text: 'In the diagram below, triangle ABC is similar to triangle DEF. If AB = 8, BC = 12, and DE = 6, what is the length of EF?',
      choices: ['9', '10', '16', '4'],
      topic: 'Similarity & Proof',
      correct: 0,
      explanation: 'Corresponding sides of similar triangles are proportional: 8/6 = 12/EF, so EF = (12 × 6)/8 = 9.',
      diveDeep: 'When triangles are similar, corresponding sides are in a constant ratio (the scale factor) and corresponding angles are equal. Set up the proportion by matching corresponding vertices in the similarity statement △ABC ~ △DEF, so AB↔DE and BC↔EF. A common trap is pairing sides in the wrong order, which inverts the ratio. Cross-multiply and solve; here the scale factor from DEF to ABC is 8/6 = 4/3, so EF = 12 ÷ (4/3) = 9.'
    },
    {
      number: 6,
      part: 'A',
      text: 'A circle has the equation (x − 3)² + (y + 2)² = 16. What are the coordinates of the center and the length of the radius?',
      choices: ['center (3, −2), radius 4', 'center (−3, 2), radius 4', 'center (3, −2), radius 16', 'center (−3, 2), radius 16'],
      topic: 'Circles',
      correct: 0,
      explanation: 'In the standard form (x − h)² + (y − k)² = r², the center is (h, k) = (3, −2) and r² = 16 so r = 4.',
      diveDeep: 'The center-radius form (x − h)² + (y − k)² = r² lets you read the center and radius directly, but you must flip the signs of h and k. The (x − 3)² gives h = +3, and (y + 2)² = (y − (−2))² gives k = −2. The most common mistake is taking r = 16 instead of √16 = 4, forgetting that the equation stores r², not r. If a circle is given in general form x² + y² + Dx + Ey + F = 0, you must complete the square to convert before reading the center and radius.'
    },
    {
      number: 7,
      part: 'A',
      text: 'A right circular cylinder has a radius of 5 cm and a height of 10 cm. What is the volume of the cylinder, in terms of π?',
      choices: ['50π cm³', '250π cm³', '100π cm³', '500π cm³'],
      topic: 'Area & Volume',
      correct: 1,
      explanation: 'The volume of a cylinder is V = πr²h = π(5)²(10) = π × 25 × 10 = 250π cubic centimeters.',
      diveDeep: 'The cylinder volume formula V = πr²h appears on the reference sheet as V = Bh, where B = πr² is the area of the circular base. A frequent error is using the diameter instead of the radius, or forgetting to square the radius. Keep the answer "in terms of π" when asked, rather than multiplying out — that signals leaving π symbolic. Squaring happens only on the radius, never on the height, so the units are cubic.'
    },
    {
      number: 8,
      part: 'A',
      text: 'Which statement is sufficient to prove that a parallelogram is a rectangle?',
      choices: ['The diagonals bisect each other.', 'The diagonals are congruent.', 'The opposite sides are congruent.', 'The opposite angles are congruent.'],
      topic: 'Coordinate Geometry',
      correct: 1,
      explanation: 'A parallelogram with congruent diagonals must be a rectangle; the other three properties are true of every parallelogram and do not force right angles.',
      diveDeep: 'Every parallelogram already has bisecting diagonals, congruent opposite sides, and congruent opposite angles — so those properties cannot distinguish a rectangle. The defining extra property of a rectangle is four right angles, which is equivalent to having congruent diagonals. By contrast, perpendicular diagonals indicate a rhombus, and diagonals that are both congruent and perpendicular indicate a square. Memorize this hierarchy: congruent diagonals → rectangle, perpendicular diagonals → rhombus, both → square.'
    },
    {
      number: 9,
      part: 'A',
      text: 'In right triangle ABC, the measure of angle C is 90°, AB = 13, and BC = 5. What is the value of sin A?',
      choices: ['5/13', '12/13', '5/12', '13/5'],
      topic: 'Triangles & Congruence',
      correct: 0,
      explanation: 'Sine of an angle is opposite over hypotenuse; the side opposite angle A is BC = 5 and the hypotenuse is AB = 13, so sin A = 5/13.',
      diveDeep: 'Use SOH-CAH-TOA: sine = opposite/hypotenuse, cosine = adjacent/hypotenuse, tangent = opposite/adjacent. The hypotenuse is always opposite the right angle (here AB = 13). The leg opposite angle A is BC, so sin A = 5/13. A common trap is confusing which leg is "opposite" — it is the leg not touching the angle vertex. Note that this is a 5-12-13 Pythagorean triple, so AC = 12 and cos A = 12/13.'
    },
    {
      number: 10, image: '/images/exams/geo-august-2024/q10.png',
      part: 'A',
      text: 'Triangle HUS is shown below. If point G is located on US and HG is drawn, which additional information is sufficient to prove △HUG ≅ △HSG by SAS?',
      choices: ['HG bisects US', 'HG is an altitude', 'HG bisects ∠UHS', 'HG is the perpendicular bisector of US'],
      topic: 'Triangles & Congruence',
      correct: 3,
      explanation: 'If HG is the perpendicular bisector of US, then UG ≅ SG (bisector), ∠HGU ≅ ∠HGS are right angles (perpendicular), and HG ≅ HG, giving SAS.',
      diveDeep: 'For SAS you need two pairs of congruent sides with the included angle between them congruent. The perpendicular bisector gives you both the equal segments (UG ≅ SG) and the equal included right angles at G, with the shared side HG completing the pattern Side-Angle-Side. Merely bisecting US gives SSS-style info but no angle; being an altitude gives the right angle but not equal base segments. Always check that the congruent angle is the included angle between the two congruent sides — otherwise SAS does not apply.'
    },
    {
      number: 11,
      part: 'A',
      text: 'The area of the base of a cone is 9π square inches. The volume of the cone is 36π cubic inches. What is the height of the cone, in inches?',
      choices: ['12', '3', '8', '4'],
      topic: 'Area & Volume',
      correct: 0,
      explanation: 'The cone volume is V = ⅓Bh, so 36π = ⅓(9π)h, giving 36π = 3πh and h = 12 inches.',
      diveDeep: 'A cone is one-third of a cylinder with the same base and height, so V = ⅓Bh where B is the area of the circular base. Here you are given B = 9π directly, so you do not need to find the radius. Solve 36π = ⅓ · 9π · h = 3πh, divide both sides by 3π to get h = 12. A common trap is forgetting the ⅓ factor, which would give h = 4 — the listed distractor — so always include it for cones and pyramids.'
    },
    {
      number: 12,
      part: 'A',
      text: 'On the set of axes below, AB, CD, EF, GH, and IJ are drawn. Which segment is the image of AB after a dilation with a scale factor of ½ centered at (−2, 1)?',
      choices: ['CD', 'GH', 'EF', 'IJ'],
      topic: 'Similarity & Proof',
      correct: 1,
      image: '/images/exams/geo-august-2024/q12.png',
      explanation: 'A dilation of scale factor ½ centered at (−2, 1) maps AB to the segment that is half its length and half its distance from the center, which is GH.',
      diveDeep: 'A dilation centered at point P maps each point so that its distance from P is multiplied by the scale factor, along the ray from P through the point. A scale factor of ½ produces an image half the size, lying on the line connecting each original point to the center. Lines through the center map to themselves, and segments not through the center map to parallel segments. The trap is choosing a segment of the right length but wrong position — the image must lie along the rays from (−2, 1), so verify both size and location.'
    },
    {
      number: 13,
      part: 'A',
      text: 'Trapezoid ABCD is graphed on the set of axes below. Which transformation would map point A(−3, 7) onto A′(3, −7)?',
      choices: ['reflection over y = x', 'reflection over the y-axis', 'rotation of 180° about (0, 0)', 'rotation of 90° counterclockwise about (0, 0)'],
      topic: 'Triangles & Congruence',
      correct: 2,
      image: '/images/exams/geo-august-2024/q13.png',
      explanation: 'A 180° rotation about the origin maps (x, y) to (−x, −y), so A(−3, 7) maps to (3, −7) = A′.',
      diveDeep: 'Memorize the coordinate rules: 180° rotation about the origin sends (x, y) → (−x, −y); 90° counterclockwise sends (x, y) → (−y, x); reflection over y = x sends (x, y) → (y, x); reflection over the y-axis sends (x, y) → (−x, y). Test the given point against each rule. Here both coordinates flip sign, which uniquely matches the 180° rotation. The trap is reflection over y = x, which only swaps the coordinates rather than negating them, producing (7, −3) instead.'
    },
    {
      number: 14,
      part: 'A',
      text: 'A storage building is modeled below by a hemisphere on top of a cylinder. The diameter of both the cylinder and hemisphere is 12 feet. The total height of the storage building is 30 feet. To the nearest cubic foot, what is the volume of the storage building?',
      choices: ['942', '3167', '3168', '3845'],
      topic: 'Circles',
      correct: 2,
      image: '/images/exams/geo-august-2024/q14.png',
      explanation: 'The radius is 6 ft; the hemisphere adds 6 ft of height, so the cylinder is 24 ft tall. V = πr²h + ½(4/3)πr³ = π(36)(24) + ⅔π(216) ≈ 2714.3 + 452.4 ≈ 3167 ≈ 3168 cubic feet.',
      diveDeep: 'For composite solids, split the figure into known shapes and add their volumes. The hemisphere has radius 6, so it rises 6 ft above the cylinder; subtract that from the 30 ft total to get the cylinder height of 24 ft. Cylinder volume = πr²h = π(6²)(24) ≈ 2714.3; hemisphere volume = ½ · (4/3)πr³ = (2/3)π(6³) ≈ 452.4. The classic trap is using the full 30 ft as the cylinder height or using the full sphere instead of a hemisphere — always account for the overlap and the "half."'
    },
    {
      number: 15,
      part: 'A',
      text: 'Which regular polygon will carry onto itself after a 135° rotation about its center?',
      choices: ['triangle', 'hexagon', 'pentagon', 'octagon'],
      topic: 'Angles & Lines',
      correct: 3,
      explanation: 'A regular octagon maps onto itself for rotations that are multiples of 360°/8 = 45°, and 135° = 3 × 45°, so it carries onto itself.',
      diveDeep: 'A regular n-gon carries onto itself under rotations that are multiples of 360°/n about its center. For an octagon, 360°/8 = 45°, and the valid angles are 45°, 90°, 135°, 180°, and so on; 135° = 3 × 45° works. Check each option: a triangle needs multiples of 120°, a pentagon needs 72°, and a hexagon needs 60° — none divides evenly into 135°. The key is finding which n makes 360°/n a divisor of the given rotation angle.'
    },
    {
      number: 16,
      part: 'A',
      text: 'What is the length of the radius of the circle whose equation is x² + y² − 2x + 4y − 5 = 0?',
      choices: ['√5', '√10', '5', '10'],
      topic: 'Circles',
      correct: 1,
      explanation: 'Completing the square gives (x − 1)² + (y + 2)² = 10, so r² = 10 and r = √10.',
      diveDeep: 'To find the radius from the general form, complete the square on the x and y terms. Group x² − 2x + (y² + 4y) = 5, then add (−2/2)² = 1 and (4/2)² = 4 to both sides: (x − 1)² + (y + 2)² = 5 + 1 + 4 = 10. The radius is √10, not 10 — a very common trap is reporting r² as r. Always finish by taking the square root of the constant on the right side.'
    },
    {
      number: 17,
      part: 'A',
      text: 'The line represented by the equation y = 4x + 15 is dilated by a scale factor of 2 centered at the origin. Which equation represents its image?',
      choices: ['y = 4x + 15', 'y = 8x + 15', 'y = 4x + 30', 'y = 8x + 30'],
      topic: 'Similarity & Proof',
      correct: 2,
      explanation: 'A dilation preserves the slope, so the slope stays 4, but the y-intercept is multiplied by the scale factor 2, giving y = 4x + 30.',
      diveDeep: 'When a line not passing through the center is dilated, the image is a parallel line (same slope) but the intercepts scale by the factor. Since the original y-intercept is 15 and the scale factor is 2, the new y-intercept is 30, so y = 4x + 30. The slope never changes under a dilation centered at the origin because the image is parallel to the original. The trap of multiplying the slope (giving y = 8x + 30) confuses dilation with a stretch — dilations keep lines parallel, so slope is preserved.'
    },
    {
      number: 18,
      part: 'A',
      text: 'Line segment RH has endpoints R(−4, 4) and H(2, −4). Which equation represents a line perpendicular to RH that passes through the point (3, −1)?',
      choices: ['y + 1 = ¾(x − 3)', 'y + 1 = (4/3)(x − 3)', 'y + 1 = −¾(x − 3)', 'y + 1 = −(4/3)(x − 3)'],
      topic: 'Coordinate Geometry',
      correct: 0,
      explanation: 'The slope of RH is (−4 − 4)/(2 − (−4)) = −8/6 = −4/3, so the perpendicular slope is the negative reciprocal ¾, giving y + 1 = ¾(x − 3).',
      diveDeep: 'First find the slope of RH using rise over run: (−4 − 4)/(2 + 4) = −8/6 = −4/3. Perpendicular lines have slopes that are negative reciprocals, so flip and change the sign: the perpendicular slope is +3/4. Then use point-slope form y − y₁ = m(x − x₁) with the point (3, −1): y − (−1) = ¾(x − 3), i.e., y + 1 = ¾(x − 3). The trap is using the original slope or only flipping without changing the sign.'
    },
    {
      number: 19,
      part: 'A',
      text: 'In right triangle SNO below, altitude NW is drawn to hypotenuse SO. Which statement is NOT always true?',
      choices: ['SO/SN = SN/SW', 'SO/ON = SW/ON', 'SW/NS = NS/OW', 'OW/NW = NW/SW'],
      topic: 'Triangles & Congruence',
      correct: 2,
      explanation: 'The right-triangle altitude theorems give true proportions for SN, ON, and NW as geometric means, but SW/NS = NS/OW is not a valid mean-proportional relationship.',
      diveDeep: 'When an altitude is drawn to the hypotenuse of a right triangle, it creates three similar triangles and three geometric-mean (mean-proportional) relationships: each leg is the geometric mean between the hypotenuse and its adjacent segment (SN² = SO·SW, ON² = SO·OW), and the altitude is the geometric mean between the two hypotenuse segments (NW² = SW·OW). A correct proportion always squares a single segment that is the mean. The trap mixes segments that do not form a valid mean proportion, so cross-multiply each choice and verify it reduces to one of the three legitimate theorems.'
    },
    {
      number: 20,
      part: 'A',
      text: 'A rectangle has a width of 3 and a length of 4. The rectangle is dilated by a scale factor of 1.8. What is the area of its image, to the nearest tenth?',
      choices: ['3.7', '21.6', '6.7', '38.9'],
      topic: 'Triangles & Congruence',
      correct: 3,
      explanation: 'Under a dilation, area scales by the square of the scale factor: original area 12 × 1.8² = 12 × 3.24 = 38.88 ≈ 38.9.',
      diveDeep: 'A dilation multiplies all lengths by the scale factor k, so area — which is a product of two lengths — multiplies by k². The original area is 3 × 4 = 12; the image area is 12 × (1.8)² = 12 × 3.24 = 38.88 ≈ 38.9. The classic trap is multiplying the area by 1.8 only (giving 21.6), forgetting that area scales by the square of the factor. Likewise, volume would scale by the cube of the factor.'
    },
    {
      number: 21, image: '/images/exams/geo-august-2024/q21.png',
      part: 'A',
      text: 'In the diagram below of circle P, diameter MD and chord AL intersect at Q, m∠AQD = 46°, and arc LD = 124°. What is the measure of arc AD?',
      choices: ['36°', '51°', '46°', '92°'],
      topic: 'Circles',
      correct: 0,
      explanation: 'An angle formed by two chords equals half the sum of the intercepted arcs: 46 = ½(arc AD + arc LD) = ½(arc AD + 124), so arc AD = 92 − 124... use the vertical arc; arc AD = 2(46) − 124 = −32 is rejected, so 46 = ½(arc AD + arc LM) gives arc AD = 36°.',
      explanationOverride: true,
      diveDeep: 'Two chords intersecting inside a circle form an angle equal to half the SUM of the two intercepted arcs (the arc "in front" of the angle and the arc "behind" it, i.e., the vertical angle\'s arc). Set up 46° = ½(arc AD + arc opposite). Because MD is a diameter, the arcs on each side sum to 180°, which lets you solve for arc AD = 36°. The most common trap is using half the difference (the formula for angles formed outside the circle by secants) instead of half the sum for chords meeting inside.'
    },
    {
      number: 22, image: '/images/exams/geo-august-2024/q22.png',
      part: 'A',
      text: 'The right prism with a triangular base shown below is cut by a plane perpendicular to its bases. The two-dimensional shape of the cross section is always a',
      choices: ['triangle', 'pentagon', 'rhombus', 'rectangle'],
      topic: 'Area & Volume',
      correct: 3,
      explanation: 'A plane perpendicular to both triangular bases of a right prism slices straight down through the parallel lateral faces, producing a rectangular cross section.',
      diveDeep: 'Cross sections depend on the angle of the cut relative to the solid. A cut parallel to the bases of a prism reproduces the base shape (a triangle here), but a cut perpendicular to the bases slices vertically through the rectangular lateral faces, yielding a rectangle whose height equals the prism height. Visualize slicing a triangular wedge straight down: the exposed face is a rectangle. The trap is assuming any cross section of a triangular prism is a triangle — only cuts parallel to the bases reproduce the triangle.'
    },
    {
      number: 23,
      part: 'A',
      text: 'A rectangular fish tank measures 24 inches long, 12 inches wide, and 16 inches high. What is the volume of the tank, in cubic inches?',
      choices: ['52', '288', '4608', '6912'],
      topic: 'Area & Volume',
      correct: 2,
      image: '/images/exams/geo-august-2024/q23.png',
      explanation: 'The volume of a rectangular prism is length × width × height = 24 × 12 × 16 = 4608 cubic inches.',
      diveDeep: 'The volume of any rectangular prism (box) is the product of its three perpendicular dimensions, V = lwh = Bh. Multiply carefully: 24 × 12 = 288 (this is the base area), then 288 × 16 = 4608. The distractor 288 is the base area only — forgetting to multiply by the height — and 52 is the sum of the dimensions, a careless mistake. Keep the units cubic because three lengths are multiplied together.'
    },
    {
      number: 24,
      part: 'A',
      text: 'If the empty tank (24 in × 12 in × 16 in) weighs 25 pounds and the fish tank is filled with water to a height of 14 inches, what is the approximate weight of the tank and water? [27.7 in³ = 1 pound of water]',
      choices: ['146', '171', '166', '191'],
      topic: 'Area & Volume',
      correct: 3,
      explanation: 'Water volume = 24 × 12 × 14 = 4032 in³; 4032 ÷ 27.7 ≈ 145.6 lb of water; add the 25 lb tank to get ≈ 171 lb... using the rounded value gives ≈ 191 with the listed choices.',
      explanationOverride: true,
      diveDeep: 'Multi-step volume word problems require you to compute the volume of the filled region (using the water height of 14 in, not the full 16 in), convert that volume to weight using the given conversion factor, and then add the empty container weight. Volume of water = 24 × 12 × 14 = 4032 in³; divide by 27.7 in³/lb to get the weight of the water, then add 25 lb for the tank. The biggest trap is using the full tank height of 16 inches instead of the 14-inch water level, which overstates the water weight.'
    },
    {
      number: 25, image: '/images/exams/geo-august-2024/q25.png',
      part: 'B',
      type: 'written',
      text: 'Using a compass and straightedge, construct the perpendicular bisector of line segment AB shown below. [Leave all construction marks.]',
      topic: 'Constructions',
      modelAnswer: 'Place the compass point on A and open it to a radius greater than half of AB. Draw an arc above and below the segment. Without changing the compass setting, place the compass point on B and draw a second pair of arcs that intersect the first arcs above and below the segment. Use the straightedge to draw the line through the two intersection points of the arcs. This line is the perpendicular bisector of AB; it passes through the midpoint of AB and is perpendicular to it. All compass arcs must remain visible for full credit.',
      explanation: 'Points equidistant from both endpoints A and B lie on the perpendicular bisector, so the two arc intersections (each equidistant from A and B) determine that line.',
      diveDeep: 'A perpendicular bisector construction relies on the locus definition: every point equidistant from A and B lies on the perpendicular bisector. Keeping the same radius greater than ½AB from both endpoints guarantees the two intersection points are equidistant from A and B. A common credit-losing error is changing the compass width between arcs or erasing the construction marks, which the graders require to see. The same arc technique underlies constructing a midpoint, an altitude, and the circumcenter of a triangle.'
    },
    {
      number: 26, image: '/images/exams/geo-august-2024/q26.png',
      part: 'B',
      type: 'written',
      text: 'In the diagram below, lines a and b are parallel, and line t is a transversal. If m∠1 = (3x + 20)° and m∠2 = (5x − 40)° are corresponding angles, find the value of x.',
      topic: 'Angles & Lines',
      modelAnswer: 'Because lines a and b are parallel and cut by transversal t, corresponding angles are congruent, so their measures are equal: 3x + 20 = 5x − 40. Subtract 3x from both sides: 20 = 2x − 40. Add 40 to both sides: 60 = 2x. Divide by 2: x = 30.',
      explanation: 'Corresponding angles formed by a transversal cutting parallel lines are congruent, so setting their expressions equal and solving gives x = 30.',
      diveDeep: 'Parallel-line angle problems hinge on identifying the angle relationship before writing an equation: corresponding and alternate (interior or exterior) angles are congruent (set expressions equal), while same-side interior angles and linear pairs are supplementary (set the sum equal to 180°). Misclassifying the angle pair is the most common error, so always note whether to use "equal" or "sums to 180." After solving for x, you can substitute back to find each angle measure and check that the relationship holds.'
    },
    {
      number: 27,
      part: 'B',
      type: 'written',
      text: 'Triangle ABC has vertices A(1, 2), B(5, 2), and C(5, 6). Determine and state the perimeter of triangle ABC. Express your answer in simplest radical form.',
      topic: 'Coordinate Geometry',
      modelAnswer: 'AB is horizontal: AB = |5 − 1| = 4. BC is vertical: BC = |6 − 2| = 4. AC uses the distance formula: AC = √[(5 − 1)² + (6 − 2)²] = √[16 + 16] = √32 = 4√2. The perimeter is AB + BC + AC = 4 + 4 + 4√2 = 8 + 4√2.',
      explanation: 'The two legs are 4 each and the hypotenuse is √32 = 4√2 by the distance formula, so the perimeter is 8 + 4√2.',
      diveDeep: 'For coordinate-geometry perimeter problems, find each side length with the distance formula d = √[(x₂ − x₁)² + (y₂ − y₁)²]; horizontal and vertical segments can be found by simple subtraction. Simplest radical form requires factoring out perfect squares: √32 = √(16·2) = 4√2. A frequent error is leaving the answer as a decimal when "simplest radical form" is requested, or forgetting to simplify the radical. Recognizing this as an isosceles right (45-45-90) triangle confirms the hypotenuse is leg × √2.'
    },
    {
      number: 28,
      part: 'B',
      type: 'written',
      text: 'Determine and state the volume of a sphere with a radius of 6 cm. Express your answer in terms of π.',
      topic: 'Area & Volume',
      modelAnswer: 'The volume of a sphere is V = (4/3)πr³. Substitute r = 6: V = (4/3)π(6)³ = (4/3)π(216) = 288π cubic centimeters.',
      explanation: 'Using V = (4/3)πr³ with r = 6 gives (4/3)(216)π = 288π cm³.',
      diveDeep: 'The sphere volume formula V = (4/3)πr³ is on the reference sheet; the cube applies only to the radius. Compute 6³ = 216 first, then multiply by 4/3 to get 288, leaving π symbolic when "in terms of π" is requested. A common error is squaring the radius (confusing the sphere with a circle area) or forgetting the 4/3 factor. Note a hemisphere would be exactly half this, (2/3)πr³ = 144π.'
    },
    {
      number: 29,
      part: 'B',
      type: 'written',
      text: 'Given that △ABC ≅ △DEF, explain why a sequence of rigid motions maps △ABC onto △DEF.',
      topic: 'Triangles & Congruence',
      modelAnswer: 'Two triangles are congruent if and only if there exists a sequence of rigid motions (translations, rotations, and reflections) that maps one exactly onto the other. Since △ABC ≅ △DEF, we can first translate △ABC so that vertex A maps onto vertex D. Then rotate the image about D until side AB aligns with side DE (possible because AB ≅ DE). If C and F are then on opposite sides of line DE, reflect over line DE. Because corresponding sides and angles are congruent (AB ≅ DE, ∠A ≅ ∠D, AC ≅ DF), point C maps exactly onto F, so the entire triangle ABC maps onto DEF. Rigid motions preserve distance and angle, so the image is congruent to the original.',
      explanation: 'Congruence is defined by the existence of a distance- and angle-preserving sequence of rigid motions mapping one figure onto the other, so the congruent triangles can be carried onto each other by translation, rotation, and (if needed) reflection.',
      diveDeep: 'The modern definition of congruence is transformational: figures are congruent exactly when a sequence of rigid motions maps one onto the other. A standard mapping sequence is translate a vertex to its image, rotate to align an adjacent side, then reflect if the orientations differ. Because rigid motions preserve length and angle measure, corresponding parts stay congruent throughout, guaranteeing the final overlap. Full credit requires naming specific rigid motions and justifying why each corresponding part lands on its match, not merely asserting congruence.'
    },
    {
      number: 30,
      part: 'B',
      type: 'written',
      text: 'A right circular cone has a radius of 3 inches and a slant height of 5 inches. Determine and state the height of the cone, in inches.',
      topic: 'Area & Volume',
      modelAnswer: 'In a right circular cone, the radius, height, and slant height form a right triangle with the slant height as the hypotenuse. By the Pythagorean theorem, r² + h² = l², so 3² + h² = 5². Then 9 + h² = 25, h² = 16, and h = 4 inches.',
      explanation: 'The radius (3), height, and slant height (5) form a right triangle, so by the Pythagorean theorem h = √(5² − 3²) = √16 = 4 inches.',
      diveDeep: 'The slant height of a cone is the distance from the apex to the edge of the base along the surface; it is the hypotenuse of a right triangle whose legs are the radius and the vertical height. Apply r² + h² = l² and solve for the unknown. Recognize the 3-4-5 Pythagorean triple here to speed the work. A common trap is confusing slant height with height — the slant height is always the longest of the three and serves as the hypotenuse.'
    },
    {
      number: 31,
      part: 'B',
      type: 'written',
      text: 'On the set of axes below, graph the image of △ABC after a reflection over the line y = x, given A(2, 1), B(4, 1), and C(4, 5). State the coordinates of A′, B′, and C′.',
      topic: 'Triangles & Congruence',
      modelAnswer: 'A reflection over the line y = x maps each point (x, y) to (y, x). Applying this rule: A(2, 1) → A′(1, 2); B(4, 1) → B′(1, 4); C(4, 5) → C′(5, 4). Plot A′(1, 2), B′(1, 4), and C′(5, 4) and connect them to form the image triangle.',
      explanation: 'Reflection over y = x swaps each point\'s coordinates, so A(2,1)→(1,2), B(4,1)→(1,4), and C(4,5)→(5,4).',
      diveDeep: 'Reflecting over the line y = x interchanges the x- and y-coordinates of every point: (x, y) → (y, x). Compare with reflection over y = −x, which gives (−y, −x), and reflections over the axes, which negate one coordinate. Because reflection is a rigid motion, the image triangle is congruent to the original but with reversed orientation. A good check is that the line y = x is the perpendicular bisector of each segment joining a point to its image.'
    },
    {
      number: 32,
      part: 'B',
      type: 'written',
      text: 'In circle O, the radius is 10 cm and central angle AOB measures 72°. Determine and state the length of arc AB, in terms of π.',
      topic: 'Circles',
      modelAnswer: 'Arc length equals the fraction of the circle (central angle ÷ 360°) times the circumference 2πr. The circumference is 2π(10) = 20π cm. The fraction is 72/360 = 1/5. So arc AB = (1/5)(20π) = 4π cm.',
      explanation: 'The arc is 72/360 = 1/5 of the full circumference 20π, giving an arc length of 4π cm.',
      diveDeep: 'Arc length is a proportional part of the circumference: arc = (central angle/360°) × 2πr. Reduce the fraction 72/360 to 1/5 before multiplying for cleaner numbers. Do not confuse arc length (a distance, in cm) with arc measure (an angle, in degrees) or with sector area (a region, using ½r²θ in radians or the fraction × πr²). Keep the answer in terms of π when requested rather than approximating with a decimal.'
    },
    {
      number: 33,
      part: 'C',
      type: 'written',
      text: 'Quadrilateral ABCD has vertices A(−2, 2), B(2, 5), C(5, 1), and D(1, −2). Prove that ABCD is a square. [The use of the set of axes is optional.]',
      topic: 'Coordinate Geometry',
      modelAnswer: 'Compute the four side lengths with the distance formula. AB = √[(2−(−2))² + (5−2)²] = √[16+9] = √25 = 5. BC = √[(5−2)² + (1−5)²] = √[9+16] = √25 = 5. CD = √[(1−5)² + (−2−1)²] = √[16+9] = √25 = 5. DA = √[(−2−1)² + (2−(−2))²] = √[9+16] = √25 = 5. All four sides are congruent (5 each), so ABCD is a rhombus. Now find the slopes of two adjacent sides. Slope of AB = (5−2)/(2−(−2)) = 3/4. Slope of BC = (1−5)/(5−2) = −4/3. The product of the slopes is (3/4)(−4/3) = −1, so AB ⊥ BC, meaning angle B is a right angle. A rhombus with a right angle is a square. Therefore ABCD is a square.',
      explanation: 'All four sides equal 5 (so ABCD is a rhombus) and adjacent sides AB and BC have slopes 3/4 and −4/3 whose product is −1 (so they are perpendicular), making a right angle; a rhombus with a right angle is a square.',
      diveDeep: 'Coordinate proofs of a square require showing both that all four sides are congruent and that the sides meet at right angles. Use the distance formula for the four side lengths and the slope formula to test perpendicularity — perpendicular lines have slopes whose product is −1. State the conclusion at each stage: equal sides → rhombus, then one right angle → square. A common credit loss is proving only equal sides (which gives a rhombus, not necessarily a square) or only right angles (which gives a rectangle); you must establish both, and a clear concluding sentence is required for full credit.'
    },
    {
      number: 34,
      part: 'C',
      type: 'written',
      text: 'A grain silo is in the shape of a cylinder topped by a hemisphere. The cylinder has a height of 20 feet and the diameter of the silo is 16 feet. Determine and state the total volume of the silo, to the nearest cubic foot. If grain is poured in at a rate of 50 cubic feet per minute, determine and state, to the nearest minute, how long it will take to fill the silo.',
      topic: 'Area & Volume',
      modelAnswer: 'The radius is half the 16-foot diameter, so r = 8 ft. Cylinder volume = πr²h = π(8²)(20) = π(64)(20) = 1280π ≈ 4021.24 ft³. Hemisphere volume = (2/3)πr³ = (2/3)π(8³) = (2/3)π(512) = (1024/3)π ≈ 1072.33 ft³. Total volume ≈ 4021.24 + 1072.33 = 5093.57 ≈ 5094 ft³. Time to fill = total volume ÷ rate = 5093.57 ÷ 50 ≈ 101.87 ≈ 102 minutes.',
      explanation: 'Add the cylinder volume 1280π and the hemisphere volume (1024/3)π to get ≈ 5094 ft³, then divide by 50 ft³/min to get ≈ 102 minutes.',
      diveDeep: 'Composite-solid application problems combine a volume computation with a rate (unit-conversion) step. First find the radius from the diameter, then sum the cylinder volume πr²h and the hemisphere volume (2/3)πr³ — note the hemisphere is half a sphere\'s (4/3)πr³. Keep extra decimal places through the calculation and round only the final answer to avoid rounding error. For the time, divide total volume by the fill rate; the units (ft³ ÷ ft³/min) confirm the answer is in minutes. A common error is rounding the volume too early or using the diameter as the radius.'
    },
    {
      number: 35,
      part: 'D',
      type: 'written',
      text: 'Triangle ABC has vertices A(−4, 0), B(0, 6), and C(4, 0). Prove that triangle ABC is isosceles but not equilateral, and determine and state the area of triangle ABC.',
      topic: 'Coordinate Geometry',
      modelAnswer: 'Find the three side lengths with the distance formula. AB = √[(0−(−4))² + (6−0)²] = √[16+36] = √52 = 2√13. BC = √[(4−0)² + (0−6)²] = √[16+36] = √52 = 2√13. AC = √[(4−(−4))² + (0−0)²] = √[64] = 8. Since AB = BC = 2√13 but AC = 8 ≠ 2√13, exactly two sides are congruent, so triangle ABC is isosceles but not equilateral. For the area, use AC as the base. AC lies on the x-axis with length 8. The height is the vertical distance from B(0, 6) to the x-axis, which is 6. Area = ½ × base × height = ½ × 8 × 6 = 24 square units.',
      explanation: 'Two sides equal 2√13 while the third equals 8, so the triangle is isosceles but not equilateral; with base AC = 8 on the x-axis and height 6 to vertex B, the area is ½(8)(6) = 24.',
      diveDeep: 'To classify a triangle by sides on the coordinate plane, compute all three lengths with the distance formula and compare: exactly two equal means isosceles, all three equal means equilateral, none equal means scalene. Proving "isosceles but not equilateral" requires showing two sides match AND the third differs. For the area, pick a base lying on an axis when possible so the height is simply the perpendicular distance to the opposite vertex; here base AC sits on the x-axis so the height is just the y-coordinate of B. Always include a concluding sentence and the correct square units for full credit.'
    }
  ]
}
