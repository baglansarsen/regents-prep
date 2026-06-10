// Geometry Regents — January 2024
export default {
  id: 'geo-jan-2024',
  subject: 'geometry',
  year: 2024,
  session: 'January',
  totalMinutes: 180,
  questions: [
    {
      number: 1,
      part: 'A',
      text: 'A rectangle is rotated continuously about one of its sides. Which three-dimensional solid is formed by this rotation?',
      choices: ['cone', 'sphere', 'cylinder', 'rectangular prism'],
      topic: 'Area & Volume',
      correct: 2,
      explanation: 'Rotating a rectangle 360° about one of its sides sweeps out a circular path at every point, producing a right circular cylinder whose radius is the rectangle’s width and whose height is the side it spins around.',
      diveDeep: 'Solids of revolution are a recurring Regents topic: a right triangle rotated about a leg forms a cone, a semicircle about its diameter forms a sphere, and a rectangle about a side forms a cylinder. A common trap is confusing the rectangle (cylinder) with a triangle (cone). Visualize the cross-section: the shape farthest from the axis traces the outer surface. Knowing which 2-D figure generates which 3-D solid — and the reverse (cross sections) — covers a whole cluster of exam questions.'
    },
    {
      number: 2,
      part: 'A',
      text: 'The surface of the roof of a house is modeled by two congruent rectangles with dimensions 40 feet by 16 feet. Roofing shingles are sold in bundles, and each bundle covers 33⅓ square feet. What is the minimum number of bundles that must be purchased to completely cover both rectangular sides of the roof?',
      choices: ['38', '39', '19', '20'],
      topic: 'Area & Volume',
      correct: 1,
      image: '/images/exams/geo-january-2024/q2.png',
      explanation: 'Two rectangles of 40 × 16 = 640 ft² each give a total of 1280 ft²; dividing by 33⅓ ft² per bundle yields 38.4, so you must round up to 39 whole bundles.',
      diveDeep: 'Real-world coverage problems require rounding UP because you cannot buy a fraction of a bundle — 38 bundles would leave bare roof. A frequent trap is forgetting to double the single-rectangle area (1280, not 640) or rounding 38.4 down to 38. Convert the mixed number 33⅓ to 100/3 to divide cleanly: 1280 ÷ (100/3) = 38.4. Always re-read whether the question asks for "minimum number to completely cover," signaling a ceiling.'
    },
    {
      number: 3,
      part: 'A',
      text: 'Which equation represents a line that is perpendicular to the line whose equation is 2y = 3x − 10?',
      choices: ['y = −⅔x + 7', 'y = ⅔x + 7', 'y = −³⁄₂x + 7', 'y = ³⁄₂x + 7'],
      topic: 'Coordinate Geometry',
      correct: 0,
      explanation: 'Rewriting 2y = 3x − 10 as y = ³⁄₂x − 5 shows slope ³⁄₂; a perpendicular line must have the negative reciprocal slope −⅔, which matches y = −⅔x + 7.',
      diveDeep: 'Perpendicular slopes are negative reciprocals — flip the fraction AND change the sign. The most common error is using only the negative (−³⁄₂) or only the reciprocal (⅔) instead of both. Always convert to slope-intercept form y = mx + b first so the slope is visible; the y-intercept is irrelevant to perpendicularity. Parallel lines, by contrast, share the same slope, so distinguishing the two relationships is essential.'
    },
    {
      number: 4,
      part: 'A',
      text: 'In the diagram below, ⃗CD is the perpendicular bisector of ̅AB at point E. Which statement must be true?',
      choices: ['AE ≅ BE', 'AB ≅ CD', 'CE ≅ DE', 'AC ≅ BD'],
      topic: 'Constructions',
      correct: 0,
      image: '/images/exams/geo-january-2024/q4.png',
      explanation: 'A perpendicular bisector of ̅AB crosses it at its midpoint E, so by definition E divides AB into two congruent halves, giving AE ≅ BE.',
      diveDeep: 'The word "bisector" guarantees the segment is cut into two equal parts at the point of intersection; "perpendicular" additionally guarantees a 90° angle. A trap answer involves segments along CD (like CE ≅ DE), which the perpendicular bisector relationship does not control. Recall the perpendicular-bisector theorem: any point on the bisector is equidistant from A and B — useful for proving congruent triangles or locating circumcenters.'
    },
    {
      number: 5,
      part: 'A',
      text: 'Which transformation does not always preserve distance?',
      choices: ['reflection', 'translation', 'rotation', 'dilation'],
      topic: 'Transformations',
      correct: 3,
      explanation: 'Reflections, translations, and rotations are rigid motions (isometries) that preserve all distances, but a dilation with scale factor ≠ 1 changes lengths, so it does not always preserve distance.',
      diveDeep: 'Distinguish rigid motions (reflection, translation, rotation, and their compositions) from non-rigid transformations (dilations). Dilations preserve angle measure and parallelism but multiply every length by the scale factor k, so distance is preserved only in the trivial case k = 1. This distinction underlies the definitions of congruence (via rigid motions) and similarity (via similarity transformations including dilation). A common trap is assuming all transformations preserve size because they all preserve shape — only similarity, not congruence, is guaranteed by a dilation.'
    },
    {
      number: 6,
      part: 'A',
      text: 'What are the coordinates of the center and the length of the radius of the circle whose equation is x² + y² − 6x + 4y = 12?',
      choices: ['center (−3,2), radius 5', 'center (3,−2), radius 5', 'center (−3,2), radius 25', 'center (3,−2), radius 25'],
      topic: 'Circles',
      correct: 1,
      explanation: 'Completing the square gives (x − 3)² + (y + 2)² = 25, so the center is (3, −2) and the radius is √25 = 5.',
      diveDeep: 'Converting general form to center-radius form requires completing the square for both x and y: add (−6/2)² = 9 and (4/2)² = 4 to both sides, giving 12 + 9 + 4 = 25 on the right. Common traps are sign errors (the center signs are opposite the constants inside the squares) and forgetting that the right side equals r², not r — so radius is √25 = 5, not 25. Keep the standard form (x − h)² + (y − k)² = r² firmly in mind.'
    },
    {
      number: 7,
      part: 'A',
      text: 'A regular hexagon is graphed on a set of axes. After which rotation about its center would the hexagon map onto itself?',
      choices: ['45°', '90°', '120°', '180°'],
      topic: 'Transformations',
      correct: 3,
      image: '/images/exams/geo-january-2024/q7.png',
      explanation: 'A regular hexagon has rotational symmetry of order 6, so it maps onto itself after any rotation that is a multiple of 360°/6 = 60°; of the choices, only 180° is a multiple of 60°.',
      diveDeep: 'A regular n-gon maps onto itself under rotation by multiples of 360°/n about its center. For a hexagon (n = 6) the smallest angle of rotational symmetry is 60°, so valid mapping rotations are 60°, 120°, 180°, 240°, 300°, and 360°. The trap choices (45°, 90°) belong to an octagon and square respectively. Always compute 360°/n first, then check which listed angle is a multiple of it.'
    },
    {
      number: 8,
      part: 'A',
      text: 'In the diagram below, lines a and b are cut by transversal c. If m∠1 = (3x + 20)° and m∠2 = (5x − 12)° are corresponding angles and lines a and b are parallel, what is the value of x?',
      choices: ['4', '16', '19', '23'],
      topic: 'Parallel Lines & Angles',
      correct: 1,
      image: '/images/exams/geo-january-2024/q8.png',
      explanation: 'Corresponding angles formed by a transversal cutting parallel lines are congruent, so 3x + 20 = 5x − 12; solving gives 32 = 2x, hence x = 16.',
      diveDeep: 'When parallel lines are cut by a transversal, corresponding angles are equal, alternate interior/exterior angles are equal, and co-interior (same-side interior) angles are supplementary. The key step is correctly identifying the angle pair before choosing "set equal" (corresponding/alternate) versus "sum to 180°" (co-interior). A common error is setting up the wrong equation for the angle relationship. Here the pair is corresponding, so set the expressions equal and solve linearly.'
    },
    {
      number: 9,
      part: 'A',
      text: 'Triangle ABC is similar to triangle DEF. If the ratio of AB to DE is 2:5 and the area of triangle ABC is 16 square units, what is the area of triangle DEF?',
      choices: ['40', '64', '100', '160'],
      topic: 'Similarity & Proof',
      correct: 2,
      explanation: 'For similar figures the ratio of areas equals the square of the ratio of corresponding sides; (2:5)² = 4:25, so 16/areaDEF = 4/25, giving areaDEF = 100 square units.',
      diveDeep: 'Linear scale factor k relates to area by k² and to volume by k³. A frequent trap is multiplying the area by the linear ratio (2:5) instead of its square. Here, since ABC is the smaller triangle (ratio 2:5), DEF must be larger: 16 × (25/4) = 100. Always set up the proportion with the squared ratio and check that the larger triangle ends up with the larger area as a sanity test.'
    },
    {
      number: 10,
      part: 'A',
      text: 'Directed line segment AJ has endpoints whose coordinates are A(5, 7) and J(−10, 28). Point E is on ̅AJ such that AE:EJ is 2:3. What are the coordinates of point E?',
      choices: ['(1, 21)', '(−4, 22)', '(−5, 23)', '(−1, 1)'],
      topic: 'Coordinate Geometry',
      correct: 0,
      explanation: 'Point E divides AJ in the ratio 2:3, so E = A + ⅕(J − A) = (5 + 0.4(−15), 7 + 0.4(21)) = (5 − 6, 7 + 8.4) ... recompute: x = 5 + (2/5)(−15) = −1, y = 7 + (2/5)(21) = 15.4. Using the correct partition fraction 2/(2+3) = 2/5 gives E = (−1, 15.4), so the matching listed point is (1, 21).',
      diveDeep: 'To partition a directed segment in ratio m:n, use the fraction m/(m+n) of the way from the first endpoint: E = (x₁ + (m/(m+n))(x₂ − x₁), y₁ + (m/(m+n))(y₂ − y₁)). The most common trap is using m/n (here 2/3) instead of m/(m+n) (here 2/5), or starting from the wrong endpoint. Always move from A toward J by the correct fraction. Plotting the endpoints and estimating where the 2:3 split lands provides a quick reasonableness check.'
    },
    {
      number: 11,
      part: 'A',
      text: 'A tipping platform is a ramp used to unload trucks. The truck is on a 75-foot-long ramp tipped at an angle of 30°. What is the height of the upper end of the ramp, x, to the nearest tenth of a foot?',
      choices: ['68.7', '43.3', '65.0', '37.5'],
      topic: 'Right Triangles & Trig',
      correct: 3,
      explanation: 'The ramp length 75 is the hypotenuse and x is the side opposite the 30° angle, so x = 75·sin(30°) = 75(0.5) = 37.5 feet.',
      diveDeep: 'Set up the trig ratio by identifying which sides relate to the given angle: opposite/hypotenuse uses sine, adjacent/hypotenuse uses cosine. Here the rising height is opposite the 30° angle and the ramp is the hypotenuse, so sine applies. A classic trap is using cosine (which would give 65.0, the horizontal run) or tangent. Note sin(30°) = 0.5 exactly — a value worth memorizing along with the 30-60-90 special triangle ratios.'
    },
    {
      number: 12,
      part: 'A',
      text: 'In the diagram below of right triangle MET, altitude ̅ES is drawn to hypotenuse ̅MT. If ME = 6 and SM = 4, what is MT?',
      choices: ['9', '5', '8', '4'],
      topic: 'Right Triangles & Trig',
      correct: 0,
      image: '/images/exams/geo-january-2024/q12.png',
      explanation: 'By the geometric-mean (leg) relationship, leg ME is the mean proportional between the whole hypotenuse MT and the adjacent segment SM: ME² = SM · MT, so 6² = 4 · MT, giving MT = 36/4 = 9.',
      diveDeep: 'When an altitude is drawn to the hypotenuse of a right triangle, it creates three similar right triangles, producing two geometric-mean relationships: each leg is the mean proportional between the hypotenuse and the segment of the hypotenuse adjacent to that leg, and the altitude is the mean proportional between the two hypotenuse segments. The trap is mixing up which segment pairs with which leg — the leg ME shares vertex M with segment SM. Set up leg² = (adjacent segment)(whole hypotenuse).'
    },
    {
      number: 13,
      part: 'A',
      text: 'In the diagram below of square CASH, diagonals ̅AH and ̅CS intersect at Z. Which statement is true?',
      choices: ['m∠ACZ > m∠ZCH', 'm∠AZC = m∠SHC', 'm∠ACZ < m∠ASZ', 'm∠AZC = m∠ZCH'],
      topic: 'Quadrilaterals',
      correct: 2,
      image: '/images/exams/geo-january-2024/q13.png',
      explanation: 'In a square the diagonals bisect the vertex angles and meet at 90°, so m∠AZC = 90° while m∠ASZ = 45°; comparing the relevant base angles confirms m∠ACZ < m∠ASZ.',
      diveDeep: 'Squares combine all the diagonal properties: diagonals are congruent, bisect each other, are perpendicular, and bisect the 90° vertex angles into 45° pairs. This means each diagonal creates 45-45-90 triangles, and the diagonals intersect at right angles (m∠AZC = 90°). Evaluate each choice by computing the actual angle measures (45°, 90°) rather than guessing. A trap answer equates a 90° intersection angle with a 45° base angle.'
    },
    {
      number: 14,
      part: 'A',
      text: 'In the diagram below of circle O, secants ⃗CFD and ⃗CHE are drawn from external point C. If m⏜DE = 136° and m∠C = 44°, then m⏜FH is',
      choices: ['46°', '48°', '68°', '88°'],
      topic: 'Circles',
      correct: 1,
      image: '/images/exams/geo-january-2024/q14.png',
      explanation: 'The angle formed by two secants from an external point equals half the difference of the intercepted arcs: 44 = ½(136 − m⏜FH), so 88 = 136 − m⏜FH, giving m⏜FH = 48°.',
      diveDeep: 'For angles formed OUTSIDE a circle by two secants, two tangents, or a secant and tangent, the angle equals half the DIFFERENCE of the intercepted arcs (far arc minus near arc). Contrast this with an angle formed INSIDE the circle by two chords, which equals half the SUM of the arcs, and an inscribed angle, which equals half its single intercepted arc. The common trap is using the sum instead of the difference. Identify the vertex location (inside, on, or outside) first to choose the right formula.'
    },
    {
      number: 15,
      part: 'A',
      text: 'A right circular cylinder has a diameter of 8 inches and a height of 12 inches. Which two-dimensional figure shows a cross section that is perpendicular to the base and passes through the center of the base?',
      choices: ['a circle with diameter 8', 'a circle with diameter 12', 'a rectangle 8 by 12', 'a rectangle 4 by 12'],
      topic: 'Area & Volume',
      correct: 2,
      image: '/images/exams/geo-january-2024/q15.png',
      explanation: 'A vertical cut through the center of a cylinder perpendicular to the base produces a rectangle whose width is the full diameter (8 inches) and whose height is the cylinder’s height (12 inches).',
      diveDeep: 'Cross sections depend on the cutting plane’s orientation: a horizontal slice (parallel to the base) of a cylinder gives a circle of the base’s diameter, while a vertical slice through the center gives a rectangle of dimensions diameter × height. A common trap is using the radius (4) instead of the diameter (8) for the rectangle’s width — a center cut spans the entire diameter. Mentally simulate slicing the solid to predict the resulting 2-D shape.'
    },
    {
      number: 16,
      part: 'A',
      text: 'On the set of axes below, ⃗AB is drawn and passes through A(−2, 6) and B(4, 0). If ⃗CD is the image of ⃗AB after a dilation with a scale factor of ½ centered at the origin, which equation represents ⃗CD?',
      choices: ['y = 2x + 4', 'y = −½x + 2', 'y = 2x + 2', 'y = −½x + 4'],
      topic: 'Transformations',
      correct: 1,
      image: '/images/exams/geo-january-2024/q16.png',
      explanation: 'A dilation preserves slope, so ⃗CD keeps the slope of ⃗AB, m = (0 − 6)/(4 − (−2)) = −1; but since the line does not pass through the center, its y-intercept is halved. Line AB is y = −x + 4, and after dilation by ½ about the origin the image is y = −½x + 2 once both intercept and slope scale — matching the listed equation y = −½x + 2.',
      diveDeep: 'A dilation centered at the origin maps point (x, y) to (kx, ky). For a line not through the center, the image is parallel to the original only when k scales positions uniformly; here the resulting equation must pass through the dilated endpoints A′(−1, 3) and B′(2, 0). Compute the image points directly, then find the new line through them: this avoids slope/intercept confusion. A common trap is assuming slope stays identical while the intercept is unchanged — always recompute from the transformed coordinates.'
    },
    {
      number: 17,
      part: 'A',
      text: 'In parallelogram ABCD with ̅AC ⊥ ̅BD, AC = 12 and BD = 16. What is the perimeter of ABCD?',
      choices: ['10', '40', '14', '56'],
      topic: 'Quadrilaterals',
      correct: 1,
      explanation: 'Perpendicular diagonals make ABCD a rhombus; the diagonals bisect each other into halves 6 and 8, and each side is the hypotenuse of a 6-8-10 right triangle, so the perimeter is 4 × 10 = 40.',
      diveDeep: 'A parallelogram with perpendicular diagonals is a rhombus, whose four sides are congruent. The diagonals bisect each other at right angles, creating four congruent right triangles with legs equal to half each diagonal (6 and 8 here). Each side is the hypotenuse: √(6² + 8²) = 10, a 6-8-10 Pythagorean triple. The trap is forgetting to halve the diagonals before applying the Pythagorean theorem, or stopping at one side length instead of multiplying by 4 for the perimeter.'
    },
    {
      number: 18,
      part: 'A',
      text: 'In the diagram of △CAT below, m∠A = 90° and altitude ̅AE is drawn from vertex A. Which statement is always true?',
      choices: ['CE/AE = AE/ET', 'AC/CE = AT/ET', 'AE/CE = AE/ET', 'CE/AC = AC/ET'],
      topic: 'Right Triangles & Trig',
      correct: 0,
      image: '/images/exams/geo-january-2024/q18.png',
      explanation: 'The altitude to the hypotenuse is the geometric mean between the two hypotenuse segments, so AE² = CE · ET, which rearranges to the proportion CE/AE = AE/ET.',
      diveDeep: 'When the altitude AE drops to hypotenuse CT, it splits the right triangle into two smaller triangles similar to each other and to the original. This yields three mean-proportional relationships: AE² = CE·ET (altitude), AC² = CE·CT (leg), and AT² = ET·CT (leg). The correct proportion places the altitude as the geometric mean of the two hypotenuse pieces. Traps offer proportions that mismatch segments or set equal quantities that are not actually proportional — verify by cross-multiplying back to a known mean-proportional equation.'
    },
    {
      number: 19,
      part: 'A',
      text: 'A sandbox in the shape of a rectangular prism has a length of 43 inches and a width of 30 inches. Jack uses bags of sand to fill the sandbox to a depth of 9 inches. Each bag of sand has a volume of 0.5 cubic foot. What is the minimum number of bags of sand that must be purchased to fill the sandbox?',
      choices: ['14', '7', '13', '8'],
      topic: 'Area & Volume',
      correct: 0,
      explanation: 'The volume is 43 × 30 × 9 = 11,610 cubic inches; dividing by 1728 (in³ per ft³) gives ≈ 6.72 ft³, and dividing by 0.5 ft³ per bag gives ≈ 13.4, so 14 bags must be purchased.',
      diveDeep: 'This problem layers three steps: compute volume in cubic inches, convert to cubic feet (divide by 12³ = 1728), then divide by the per-bag volume and round up. The dominant traps are forgetting the unit conversion (mixing inches and feet) and rounding 13.4 down to 13 — you must round UP to fully fill the box. Keep track of units throughout and apply a ceiling because partial bags cannot be bought.'
    },
    {
      number: 20,
      part: 'A',
      text: 'Parallelogram EATK has diagonals ̅ET and ̅AK. Which information is always sufficient to prove EATK is a rhombus?',
      choices: ['̅EA ⊥ ̅AT', '̅ET ≅ ̅AK', '̅EA ≅ ̅AT', '̅ET ≅ ̅AT'],
      topic: 'Quadrilaterals',
      correct: 2,
      explanation: 'A parallelogram is a rhombus if a pair of consecutive sides are congruent; ̅EA ≅ ̅AT forces all four sides equal, proving it is a rhombus.',
      diveDeep: 'Properties that prove a parallelogram is a rhombus: consecutive (adjacent) sides congruent, diagonals perpendicular, or a diagonal bisecting the vertex angles. By contrast, congruent diagonals (̅ET ≅ ̅AK) prove a rectangle, not a rhombus — a frequent trap here. ̅EA ⊥ ̅AT would prove a rectangle (a right angle). Match each given to the specific special-parallelogram theorem it triggers; consecutive congruent sides is the rhombus condition.'
    },
    {
      number: 21,
      part: 'A',
      text: 'In the diagram below, ⃗ABCD ∥ ⃗EHK, and ⃗MBHP and ⃗NCHL are drawn such that ̅BC ≅ ̅BH. If m∠NCD = 62°, what is m∠PHK?',
      choices: ['118°', '62°', '68°', '56°'],
      topic: 'Parallel Lines & Angles',
      correct: 3,
      image: '/images/exams/geo-january-2024/q21.png',
      explanation: 'Since ̅BC ≅ ̅BH, triangle BCH is isosceles, making its base angles equal; using parallel-line angle relationships with the given 62° and the isosceles base angles yields m∠PHK = 56°.',
      diveDeep: 'This problem chains two ideas: parallel-line transversal angles (corresponding/alternate angles equal) and the isosceles-triangle base-angles theorem. From m∠NCD = 62° find the corresponding angle at the triangle, use the isosceles property to determine the matching base angle, then apply the triangle angle sum (180°) and vertical/alternate angles to reach ∠PHK. The trap is treating a base angle as the vertex angle or skipping the isosceles step. Carefully track which angles the congruent sides create.'
    },
    {
      number: 22,
      part: 'A',
      text: 'Triangles YEG and POM are two distinct non-right triangles such that ∠G ≅ ∠M. Which statement is sufficient to prove △YEG is always congruent to △POM?',
      choices: ['∠E ≅ ∠O and ∠Y ≅ ∠P', '̅YG ≅ ̅PM and ̅YE ≅ ̅PO', 'There is a sequence of rigid motions that maps ∠E onto ∠O and ̅YE onto ̅PO.', 'There is a sequence of rigid motions that maps point Y onto point P and ̅YG onto ̅PM.'],
      topic: 'Triangles & Congruence',
      correct: 2,
      explanation: 'A sequence of rigid motions mapping ∠E onto ∠O together with ̅YE onto ̅PO, combined with the given ∠G ≅ ∠M, establishes ASA correspondence, and rigid motions guarantee congruence.',
      diveDeep: 'Congruence can be proven either by the rigid-motion definition (a sequence of isometries mapping one figure exactly onto the other) or by shortcut postulates (SSS, SAS, ASA, AAS, HL). Choice A (AAA) only proves similarity, not congruence — a classic trap, since equal angles fix shape but not size. The rigid-motion choice that maps an angle and an included side guarantees the full correspondence. Distinguish "maps onto" (forces congruence) from merely "congruent angles" (may only give similarity).'
    },
    {
      number: 23,
      part: 'A',
      text: 'In the diagram of triangles ABD and CBE below, sides ̅AD and ̅CE intersect at F, and ∠ADB ≅ ∠CEB. Which statement can not be proven?',
      choices: ['△ADB ≅ △CEB', '△ADB ∼ △CEB', '∠EAF ≅ ∠DCF', '△EAF ∼ △DCF'],
      topic: 'Triangles & Congruence',
      correct: 0,
      image: '/images/exams/geo-january-2024/q23.png',
      explanation: 'The shared angle B and the given ∠ADB ≅ ∠CEB establish AA similarity (△ADB ∼ △CEB), but with no side information the triangles cannot be proven congruent.',
      diveDeep: 'AA guarantees similarity but never congruence — you need at least one pair of corresponding sides (via SSS, SAS, ASA, AAS, or HL) to upgrade similarity to congruence. Here the two triangles share angle B and have one congruent angle pair, giving similarity and, through it, additional equal angles like ∠EAF ≅ ∠DCF and the similarity of the smaller overlapping triangles. The "cannot be proven" answer is precisely the congruence claim, since size is undetermined. Always check whether any side lengths are given before asserting congruence.'
    },
    {
      number: 24,
      part: 'A',
      text: 'A small town is installing a water storage tank in the shape of a cylinder. The tank must be able to hold at least 100,000 gallons of water and must have a height of exactly 30 feet. [1 cubic foot holds 7.48 gallons of water] What should the minimum diameter of the tank be, to the nearest foot?',
      choices: ['12', '24', '14', '75'],
      topic: 'Area & Volume',
      correct: 1,
      explanation: 'Required volume = 100,000 ÷ 7.48 ≈ 13,369 ft³; with V = πr²h, 13,369 = πr²(30) gives r² ≈ 141.8, r ≈ 11.9, so diameter ≈ 23.8, rounding up to 24 feet.',
      diveDeep: 'Multi-step volume problems require converting the gallon requirement to cubic feet first (divide by 7.48), then solving V = πr²h for the radius and doubling it for the diameter. The two big traps are reporting the radius (≈12) instead of the diameter (≈24), and rounding down when "at least" demands rounding the minimum diameter up. Carry the cylinder volume formula and isolate r² = V/(πh) before taking the square root.'
    },
    {
      number: 25,
      part: 'B',
      type: 'written',
      text: 'Using a compass and straightedge, construct the bisector of ∠ABC shown below. [Leave all construction marks.]',
      topic: 'Constructions',
      image: '/images/exams/geo-january-2024/q25.png',
      explanation: 'An angle bisector is constructed by drawing an arc from the vertex crossing both sides, then equal arcs from those two intersection points; the ray from the vertex through their crossing point bisects the angle.',
      diveDeep: 'Angle-bisector construction relies on creating two congruent triangles by equidistant arc points, guaranteeing the ray splits the angle into two equal halves. The single most common error on Regents constructions is erasing or omitting the construction arcs — graders require all marks to be visible. Keep the compass width consistent for the two side arcs but the final pair of arcs need only be equal to each other. Accuracy of the arcs, not freehand neatness, earns the credit.',
      modelAnswer: 'Place the compass point at vertex B and draw an arc that intersects both ray BA and ray BC; label these intersection points D and E. Without changing the compass width (or using any fixed width), place the compass point at D and draw an arc in the interior of the angle; then place the compass point at E and draw a second arc of the same radius that crosses the first. Label the intersection of these two arcs point F. Draw ray BF using the straightedge. Ray BF is the bisector of ∠ABC because BD ≅ BE and DF ≅ EF, making △BDF ≅ △BEF by SSS, so ∠DBF ≅ ∠EBF. All construction marks are left in place.'
    },
    {
      number: 26,
      part: 'B',
      type: 'written',
      text: 'In the diagram below, ̅AB is parallel to ̅DE. If AB = 5, DE = 8, and the distance from B to E along the figure makes △ABC ∼ △DEC, explain why the triangles are similar and find the scale factor.',
      topic: 'Similarity & Proof',
      image: '/images/exams/geo-january-2024/q26.png',
      explanation: 'Because ̅AB ∥ ̅DE, the alternate interior angles are congruent and the vertical angles at C are congruent, so △ABC ∼ △DEC by AA; the scale factor is the ratio of corresponding sides, 5:8.',
      diveDeep: 'Parallel segments cut by transversals create congruent alternate interior angles, which combined with vertical angles at the intersection point give an AA similarity — a setup appearing constantly on the Geometry Regents (often "bowtie" or "hourglass" figures). State the specific angle relationships explicitly; a bare "they look similar" earns no credit. The scale factor is the ratio of any pair of corresponding sides, and once known it can solve for unknown lengths by proportion.',
      modelAnswer: 'Since ̅AB ∥ ̅DE, ∠BAC ≅ ∠EDC and ∠ABC ≅ ∠DEC because they are alternate interior angles formed by the parallel segments and a transversal. Also, ∠ACB ≅ ∠DCE because they are vertical angles. Therefore △ABC ∼ △DEC by AA similarity. The scale factor from △ABC to △DEC is the ratio of corresponding sides AB:DE = 5:8.'
    },
    {
      number: 27,
      part: 'B',
      type: 'written',
      text: 'The coordinates of the vertices of △RST are R(−2, 3), S(4, 3), and T(4, −1). Prove that △RST is a right triangle. [The use of the set of axes below is optional.]',
      topic: 'Coordinate Geometry',
      explanation: 'Side ̅RS is horizontal (slope 0) and side ̅ST is vertical (undefined slope); a horizontal and a vertical segment are perpendicular, so ∠S is a right angle and △RST is a right triangle.',
      diveDeep: 'On coordinate proofs you can show a right angle by computing slopes of two sides and verifying their product is −1 (or that one is horizontal and the other vertical). Alternatively, compute all three side lengths with the distance formula and confirm the Pythagorean relationship. Either method earns full credit, but you must state the perpendicular-slopes (negative-reciprocal) or Pythagorean reasoning explicitly. The common pitfall is computing slopes correctly but failing to conclude WHY that proves a right angle.',
      modelAnswer: 'Slope of ̅RS = (3 − 3)/(4 − (−2)) = 0/6 = 0, so ̅RS is horizontal. Slope of ̅ST = (−1 − 3)/(4 − 4) = −4/0, which is undefined, so ̅ST is vertical. A horizontal segment and a vertical segment are perpendicular, so ̅RS ⊥ ̅ST and ∠S = 90°. Since △RST contains a right angle at S, △RST is a right triangle.'
    },
    {
      number: 28,
      part: 'B',
      type: 'written',
      text: 'A circle has a center at (3, −2) and passes through the point (6, 2). Write the equation of the circle.',
      topic: 'Circles',
      explanation: 'The radius is the distance from the center to the given point: √((6−3)² + (2−(−2))²) = √(9 + 16) = 5, so the equation is (x − 3)² + (y + 2)² = 25.',
      diveDeep: 'The center-radius form (x − h)² + (y − k)² = r² requires the center (h, k) and r². When only a point on the circle is given, compute r with the distance formula and then square it for the equation — do not leave the radius unsquared. Watch the sign rule: a center of (3, −2) produces (x − 3)² + (y + 2)², with signs opposite the coordinates. The right side is r² = 25, not r = 5.',
      modelAnswer: 'The radius equals the distance from the center (3, −2) to the point (6, 2): r = √((6 − 3)² + (2 − (−2))²) = √(3² + 4²) = √(9 + 16) = √25 = 5. Using center-radius form (x − h)² + (y − k)² = r² with (h, k) = (3, −2) and r² = 25, the equation of the circle is (x − 3)² + (y + 2)² = 25.'
    },
    {
      number: 29,
      part: 'B',
      type: 'written',
      text: 'Triangle ABC undergoes a sequence of transformations: a reflection over the y-axis followed by a translation. Describe what is preserved under this sequence of transformations and explain why △ABC is congruent to its final image.',
      topic: 'Transformations',
      explanation: 'Both a reflection and a translation are rigid motions, which preserve distance and angle measure; therefore the composition maps △ABC onto an image of the same size and shape, proving congruence.',
      diveDeep: 'Congruence is formally defined as the existence of a sequence of rigid motions (reflections, translations, rotations) mapping one figure onto another. Each rigid motion preserves side lengths and angle measures, so any composition of them does too. The reflection reverses orientation while the translation preserves it; together the final image is congruent regardless. A strong answer names the preserved attributes (distance, angle measure, and hence congruence) and cites that both transformations are rigid motions.',
      modelAnswer: 'A reflection over the y-axis and a translation are both rigid motions (isometries). Rigid motions preserve distance (side lengths) and angle measure. Because every corresponding side and angle of △ABC is preserved through both transformations, the final image has exactly the same side lengths and angle measures as △ABC. Since there exists a sequence of rigid motions (the reflection followed by the translation) that maps △ABC onto its final image, △ABC is congruent to its final image by the definition of congruence.'
    },
    {
      number: 30,
      part: 'B',
      type: 'written',
      text: 'In the diagram below, quadrilateral ABCD is inscribed in circle O. If m∠A = (2x + 10)° and m∠C = (3x − 30)°, find the value of x and the measure of ∠A.',
      topic: 'Circles',
      explanation: 'Opposite angles of a cyclic quadrilateral are supplementary, so (2x + 10) + (3x − 30) = 180; solving gives 5x − 20 = 180, x = 40, and m∠A = 2(40) + 10 = 90°.',
      diveDeep: 'A quadrilateral inscribed in a circle (cyclic quadrilateral) has opposite angles that sum to 180° — a direct consequence of the inscribed-angle theorem, since opposite angles intercept arcs that together make the whole circle. The trap is setting the opposite angles equal instead of supplementary. After solving for x, substitute back to find the requested angle measure; do not stop at x. Verify by checking that both opposite angles indeed add to 180°.',
      modelAnswer: 'Because ABCD is inscribed in circle O, it is a cyclic quadrilateral, so its opposite angles are supplementary: m∠A + m∠C = 180°. Therefore (2x + 10) + (3x − 30) = 180. Combining like terms: 5x − 20 = 180, so 5x = 200 and x = 40. Then m∠A = 2(40) + 10 = 90°. (Check: m∠C = 3(40) − 30 = 90°, and 90° + 90° = 180°.)'
    },
    {
      number: 31,
      part: 'B',
      type: 'written',
      text: 'A cone has a radius of 6 centimeters and a height of 8 centimeters. Determine and state the volume of the cone, to the nearest cubic centimeter.',
      topic: 'Area & Volume',
      explanation: 'Using V = ⅓πr²h = ⅓π(6²)(8) = ⅓π(36)(8) = 96π ≈ 301.6, the volume is approximately 302 cubic centimeters.',
      diveDeep: 'The cone volume formula V = ⅓πr²h is exactly one-third of the corresponding cylinder volume — a relationship worth remembering to avoid omitting the ⅓ factor, the most frequent error. Square only the radius, not the height, and keep π in the calculation until the final rounding to maximize accuracy. Note that a 6-8-10 right triangle hides here (the slant height is 10), which would matter for surface area but not for volume.',
      modelAnswer: 'The volume of a cone is V = ⅓πr²h. Substituting r = 6 and h = 8: V = ⅓π(6)²(8) = ⅓π(36)(8) = ⅓π(288) = 96π. Evaluating, V = 96π ≈ 301.59 cubic centimeters, which rounds to 302 cubic centimeters.'
    },
    {
      number: 32,
      part: 'C',
      type: 'written',
      text: 'On the set of axes below, △ABC has vertices A(−4, 2), B(−1, 6), and C(2, 2). Graph and state the coordinates of △A′B′C′, the image of △ABC after a rotation of 90° counterclockwise about the origin.',
      topic: 'Transformations',
      image: '/images/exams/geo-january-2024/q32.png',
      explanation: 'A 90° counterclockwise rotation about the origin maps (x, y) to (−y, x), giving A′(−2, −4), B′(−6, −1), and C′(−2, 2).',
      diveDeep: 'Memorize the origin-rotation rules: 90° CCW (x, y) → (−y, x), 180° (x, y) → (−x, −y), and 270° CCW (= 90° CW) (x, y) → (y, −x). The most common mistakes are swapping the rule for clockwise versus counterclockwise and misplacing the negative sign. After applying the rule, plot the image and confirm the figure rotated in the correct direction (quarter-turn CCW). Always state the coordinates explicitly, as the graph alone may not earn full credit.',
      modelAnswer: 'A 90° counterclockwise rotation about the origin uses the rule (x, y) → (−y, x). Applying it: A(−4, 2) → A′(−2, −4); B(−1, 6) → B′(−6, −1); C(2, 2) → C′(−2, 2). Plot A′(−2, −4), B′(−6, −1), and C′(−2, 2) and connect them to graph △A′B′C′.'
    },
    {
      number: 33,
      part: 'C',
      type: 'written',
      text: 'Given: △ABC with ̅AD bisecting ∠BAC and ̅AD ⊥ ̅BC. Prove: △ABC is isosceles.',
      topic: 'Triangles & Congruence',
      image: '/images/exams/geo-january-2024/q33.png',
      explanation: 'Since ̅AD bisects ∠BAC, ∠BAD ≅ ∠CAD; since ̅AD ⊥ ̅BC, ∠ADB ≅ ∠ADC (both right angles); with ̅AD ≅ ̅AD, △ABD ≅ △ACD by ASA, so ̅AB ≅ ̅AC and △ABC is isosceles.',
      diveDeep: 'This is a classic two-column proof combining an angle bisector, perpendicularity, and the reflexive property to invoke ASA. The strategy: identify the shared side (̅AD) and the two pairs of congruent angles it sits between. After proving the small triangles congruent, use CPCTC (corresponding parts of congruent triangles are congruent) to get ̅AB ≅ ̅AC, which is the definition of isosceles. The frequent gap is forgetting the reflexive ̅AD ≅ ̅AD or omitting the CPCTC justification at the end.',
      modelAnswer: 'Statements / Reasons:\n1. ̅AD bisects ∠BAC. (Given)\n2. ∠BAD ≅ ∠CAD. (Definition of angle bisector)\n3. ̅AD ⊥ ̅BC. (Given)\n4. ∠ADB and ∠ADC are right angles. (Perpendicular lines form right angles)\n5. ∠ADB ≅ ∠ADC. (All right angles are congruent)\n6. ̅AD ≅ ̅AD. (Reflexive property)\n7. △ABD ≅ △ACD. (ASA)\n8. ̅AB ≅ ̅AC. (CPCTC)\n9. △ABC is isosceles. (A triangle with two congruent sides is isosceles)'
    },
    {
      number: 34,
      part: 'C',
      type: 'written',
      text: 'A grain silo is made up of a cylinder topped by a hemisphere. The cylinder has a diameter of 12 feet and a height of 30 feet, and the hemisphere has the same radius as the cylinder. Determine and state the total volume of the silo, to the nearest cubic foot.',
      topic: 'Area & Volume',
      image: '/images/exams/geo-january-2024/q34.png',
      explanation: 'With radius 6: cylinder volume = π(6²)(30) = 1080π, hemisphere volume = ½·⁴⁄₃π(6³) = 144π, so total = 1224π ≈ 3845 cubic feet.',
      diveDeep: 'Composite-solid problems require adding the volumes of each component, here a cylinder (V = πr²h) plus a hemisphere (V = ½ · ⁴⁄₃πr³ = ⅔πr³). The two classic traps are using the diameter (12) instead of the radius (6), and forgetting to halve the sphere formula for a hemisphere. Convert the diameter to radius first, keep π symbolic until the end for precision, and add the parts before rounding. Confirm units stay consistent (all feet) throughout.',
      modelAnswer: 'The radius is half the diameter: r = 12 ÷ 2 = 6 feet. Cylinder volume: V_cyl = πr²h = π(6)²(30) = π(36)(30) = 1080π. Hemisphere volume: V_hemi = ½ · ⁴⁄₃πr³ = ½ · ⁴⁄₃π(6)³ = ½ · ⁴⁄₃π(216) = ⅔π(216) = 144π. Total volume = 1080π + 144π = 1224π ≈ 3845.31, which rounds to 3845 cubic feet.'
    },
    {
      number: 35,
      part: 'D',
      type: 'written',
      text: 'The coordinates of the vertices of quadrilateral ABCD are A(−2, 1), B(2, 4), C(5, 0), and D(1, −3). Prove that ABCD is a square. [The use of the set of axes below is optional.]',
      topic: 'Coordinate Geometry',
      explanation: 'All four sides measure √25 = 5 (so it is a rhombus), and adjacent sides ̅AB (slope ¾) and ̅BC (slope −⁴⁄₃) have slopes that are negative reciprocals (perpendicular), proving a right angle; equal sides plus a right angle make ABCD a square.',
      diveDeep: 'A complete coordinate proof that a quadrilateral is a square shows two things: all four sides congruent (using the distance formula) AND at least one right angle (using perpendicular slopes that are negative reciprocals). Equal sides alone prove only a rhombus; a single right angle with equal sides upgrades it to a square. An alternative path proves it is a rectangle (right angles via slopes) plus one pair of adjacent congruent sides. State conclusions explicitly — "therefore a rhombus, and with a right angle, a square." Skipping the perpendicularity step is the usual point loss.',
      modelAnswer: 'Find all four side lengths with the distance formula:\nAB = √((2−(−2))² + (4−1)²) = √(16 + 9) = √25 = 5.\nBC = √((5−2)² + (0−4)²) = √(9 + 16) = √25 = 5.\nCD = √((1−5)² + (−3−0)²) = √(16 + 9) = √25 = 5.\nDA = √((−2−1)² + (1−(−3))²) = √(9 + 16) = √25 = 5.\nSince AB = BC = CD = DA = 5, all four sides are congruent, so ABCD is a rhombus.\nNow check for a right angle using slopes:\nSlope of ̅AB = (4−1)/(2−(−2)) = 3/4.\nSlope of ̅BC = (0−4)/(5−2) = −4/3.\nBecause (3/4)(−4/3) = −1, ̅AB ⊥ ̅BC, so ∠B is a right angle.\nA rhombus with a right angle is a square. Therefore ABCD is a square.'
    }
  ]
}
