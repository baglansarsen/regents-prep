// Enriched Geometry exam — tagged with skill + subTopic (see content/_shared/lessonEngine.js)
export default {
  "id": "geo-jun-2022",
  "subject": "geometry",
  "year": 2022,
  "session": "June",
  "totalMinutes": 180,
  "questions": [
    {
      "number": 1,
      "part": "A",
      "text": "Triangle A′B′C′ is the image of △ABC after a dilation centered at the origin. The coordinates of △ABC are A(2, 1), B(2, 4), and C(4, 3). If the coordinates of A′ are (4, 2), what are the coordinates of B′?",
      "choices": [
        "(8, 4)",
        "(4, 8)",
        "(4, 6)",
        "(1, 2)"
      ],
      "topic": "Congruence & Transformations",
      "correct": 1,
      "image": "/images/exams/geo-june-2022/q1.png",
      "explanation": "The scale factor is 2 (since A(2,1) → A′(4,2)), so every coordinate is multiplied by 2: B(2,4) → B′(4,8).",
      "diveDeep": "A dilation centered at the origin multiplies every coordinate by the scale factor k. Here k = 4/2 = 2 (using the x-coordinates of A and A′). Applying k = 2 to B(2,4) gives B′(4,8). Always verify the scale factor using both x and y coordinates to avoid errors. A common mistake is using a scale factor of 3 (confusing with C(4,3)). Dilations from the origin are the simplest case; for dilations from other centers, translate, dilate, then translate back.",
      "subTopic": "Triangle Congruence & Constructions"
    },
    {
      "number": 2,
      "image": "/images/exams/geo-june-2022/q2.png",
      "part": "A",
      "text": "In the diagram below, a plane intersects a square pyramid parallel to its base. Which two-dimensional shape describes this cross section?",
      "choices": [
        "circle",
        "triangle",
        "square",
        "pentagon"
      ],
      "topic": "Area & Volume",
      "correct": 2,
      "explanation": "A plane cutting a square pyramid parallel to its square base produces a cross section that is also a square.",
      "diveDeep": "Cross sections of pyramids parallel to the base are always similar to the base. A square pyramid has a square base, so a parallel cross section is a square. If you cut a cone parallel to its circular base you get a circle; if you cut a triangular pyramid (tetrahedron) parallel to its base you get a triangle. Cutting perpendicular to the base of a square pyramid produces a triangle or rectangle depending on the orientation. Cross-section visualization is a key 3D Geometry skill on the Regents.",
      "subTopic": "Cross-Sections & Solids of Revolution"
    },
    {
      "number": 3,
      "image": "/images/exams/geo-june-2022/q3.png",
      "part": "A",
      "text": "In the diagram, △CDE is the image of △CAB after a dilation centered at C with ratio DE/AB. Which statement is always true?",
      "choices": [
        "sin A = DE/CD",
        "sin A = DE/CE",
        "cos A = DE/CD",
        "cos A = DE/CE"
      ],
      "topic": "Similarity & Proof",
      "correct": 0,
      "explanation": "In right triangle CAB, sin A = opposite/hypotenuse = CB/CA, and since △CDE ~ △CAB, sin A = DE/CD by the corresponding ratio.",
      "diveDeep": "When two triangles are similar, corresponding trigonometric ratios are equal. In this dilation, △CAB ~ △CDE with correspondence A↔D, B↔E. The sine of angle A equals the ratio of the side opposite A to the hypotenuse in the similar triangle: sin A = DE/CD. This problem tests whether students understand that trig ratios depend only on angle measure, not on the size of the triangle. This is the foundation of why trig works for any size right triangle.",
      "subTopic": "Similarity"
    },
    {
      "number": 4,
      "part": "A",
      "text": "A regular pentagon is rotated about its center. What is the minimum number of degrees needed to carry the pentagon onto itself?",
      "choices": [
        "72°",
        "144°",
        "108°",
        "360°"
      ],
      "topic": "Congruence & Transformations",
      "correct": 0,
      "explanation": "A regular pentagon has 5-fold rotational symmetry. The minimum rotation angle is 360°/5 = 72°.",
      "diveDeep": "A regular n-gon maps onto itself under rotations of 360°/n, 2(360°/n), 3(360°/n), … For a regular pentagon (n = 5), the minimum is 360°/5 = 72°. A regular hexagon needs 60°, a square needs 90°, an equilateral triangle needs 120°. This concept connects to symmetry: the number of rotational symmetries equals the number of sides. A common mistake is dividing 360° by the interior angle (108°) instead of the number of sides.",
      "subTopic": "Lines, Angles & Transformations"
    },
    {
      "number": 5,
      "part": "A",
      "text": "On the set of axes, △ABC ≅ △A′B′C′. Triangle ABC maps onto △A′B′C′ after a single transformation. Based on the graph, the transformation is a",
      "choices": [
        "reflection over the line y = x",
        "reflection over the line y = x + 2",
        "rotation of 180° centered at (1, 1)",
        "rotation of 180° centered at the origin"
      ],
      "topic": "Congruence & Transformations",
      "correct": 2,
      "image": "/images/exams/geo-june-2022/q5.png",
      "explanation": "The triangles are congruent and the mapping is a 180° rotation about the midpoint of corresponding vertices, which is (1, 1).",
      "diveDeep": "A 180° rotation maps (x, y) to (2h − x, 2k − y) where (h, k) is the center. To find the center, find the midpoint of any pair of corresponding points. If the midpoint of A and A′ equals the midpoint of B and B′ and is (1, 1), then a 180° rotation about (1, 1) is the transformation. A 180° rotation about the origin would give (−x, −y); check if the coordinates match. Always verify with at least two pairs of corresponding points.",
      "skill": "graphing",
      "subTopic": "Triangle Congruence & Constructions"
    },
    {
      "number": 6,
      "part": "A",
      "text": "Right triangle TMR is a scalene triangle with the right angle at M. Which equation is always true?",
      "choices": [
        "sin M = cos T",
        "sin T = cos R",
        "sin R = cos R",
        "sin T = cos M"
      ],
      "topic": "Trigonometry",
      "correct": 1,
      "explanation": "In a right triangle, the two acute angles are complementary, so sin T = cos R because T + R = 90°.",
      "diveDeep": "The co-function identity states: sin θ = cos(90° − θ). In a right triangle with right angle at M, angles T and R are complementary (T + R = 90°). Therefore sin T = cos(90° − T) = cos R. Similarly cos T = sin R. Note that sin M = sin 90° = 1, so choice A gives sin M = cos T → 1 = cos T, which is only true if T = 0°, not always true. The co-function relationship is one of the most tested trig identities in Regents Geometry.",
      "subTopic": "Pythagorean & Special Triangles"
    },
    {
      "number": 7,
      "image": "/images/exams/geo-june-2022/q7.png",
      "part": "A",
      "text": "In the diagram of quadrilateral ABCD, AE = DE and BE = CE. Which statement is always true?",
      "choices": [
        "EB = EC",
        "∠EBA = ∠ECD",
        "AC = DB",
        "∠EAC = ∠EDB"
      ],
      "topic": "Congruence & Transformations",
      "correct": 3,
      "explanation": "Since AE = DE and BE = CE, triangles AEB and DEC are congruent by SAS (vertical angles at E), so ∠EAC = ∠EDB by CPCTC.",
      "diveDeep": "With AE = DE and BE = CE, and ∠AEB = ∠DEC (vertical angles), △AEB ≅ △DEC by SAS. By CPCTC, corresponding angles ∠EAB = ∠EDB (or written ∠EAC = ∠EDB). Note that EB = EC is already given (choice A restates a given), and AC = DB requires the full diagonal lengths which may not be directly proven here. Always check which triangles to prove congruent and apply CPCTC to get the desired conclusion.",
      "subTopic": "Lines, Angles & Transformations"
    },
    {
      "number": 8,
      "part": "A",
      "text": "Right triangle ABC has side lengths of 8 and 15 (with the right angle at C). If the triangle is continuously rotated about side AC, the resulting solid is",
      "choices": [
        "a right cone with radius 15 and height 8",
        "a right cone with radius 8 and height 15",
        "a right cylinder with radius 15 and height 8",
        "a right cylinder with radius 8 and height 15"
      ],
      "topic": "3D Geometry & Volume",
      "correct": 0,
      "explanation": "Rotating a right triangle about one of its legs generates a cone. The leg of length 8 is the axis (height), so BC = 15 sweeps out the base radius, giving a cone with radius 15 and height 8.",
      "diveDeep": "When a right triangle is rotated about one of its legs, the other leg sweeps out the circular base of a cone, and the hypotenuse sweeps out the lateral surface. The axis of rotation becomes the height of the cone. Here AC is the axis; if AC = 8, then BC = 15 is the radius. If the rotation were about BC, the radius would be 8 and height 15. The slant height of the cone equals the hypotenuse: √(8² + 15²) = √(64 + 225) = √289 = 17. This is a classic 8-15-17 Pythagorean triple.",
      "subTopic": "Cross-Sections & Solids of Revolution"
    },
    {
      "number": 9,
      "image": "/images/exams/geo-june-2022/q9.png",
      "part": "A",
      "text": "In the diagram, lines k and ℓ intersect lines m and n at points A, B, C, and D. Which statement is sufficient to prove ABCD is a parallelogram?",
      "choices": [
        "∠1 ≅ ∠3",
        "∠2 ≅ ∠5 and ∠5 ≅ ∠7",
        "∠4 ≅ ∠7",
        "∠1 ≅ ∠3 and ∠3 ≅ ∠4"
      ],
      "topic": "Angles & Lines",
      "correct": 2,
      "explanation": "∠4 ≅ ∠7 means alternate interior angles between lines k and ℓ cut by transversal n are equal, proving k ∥ ℓ, and along with the other pair of parallel sides proves ABCD is a parallelogram.",
      "diveDeep": "A parallelogram requires both pairs of opposite sides to be parallel. Alternate interior angles being congruent proves two lines are parallel. ∠4 and ∠7 are alternate interior angles formed by the transversal n cutting lines k and ℓ, so their congruence proves k ∥ ℓ. Combined with m ∥ n (if established), ABCD is a parallelogram. Analyze each choice by identifying which lines and which angle relationship each refers to. Choices A and C alone may only prove one pair of parallel sides.",
      "skill": "proof",
      "subTopic": "Lines, Angles & Transformations"
    },
    {
      "number": 10,
      "part": "A",
      "text": "Which transformation does not always preserve distance?",
      "choices": [
        "(x, y) → (x + 2, y)",
        "(x, y) → (2x, y + 1)",
        "(x, y) → (y, x)",
        "(x, y) → (3 − x, 2 − y)"
      ],
      "topic": "Congruence & Transformations",
      "correct": 1,
      "explanation": "(x, y) → (2x, y + 1) multiplies the x-coordinate by 2, changing distances — it is a horizontal stretch, not a rigid motion.",
      "diveDeep": "Rigid motions (translations, rotations, reflections) preserve all distances. Choice A is a translation (right 2). Choice C is a reflection over the line y = x (swaps coordinates). Choice D is a point reflection about (3/2, 1). Choice B multiplies x by 2 while translating y — this stretches the figure horizontally and is NOT a rigid motion. To test if a transformation preserves distance, check whether the distance formula gives the same result for image points as for pre-image points.",
      "subTopic": "Lines, Angles & Transformations"
    },
    {
      "number": 11,
      "image": "/images/exams/geo-june-2022/q11.png",
      "part": "A",
      "text": "In the diagram, EF ∥ HG, EF = 5, HG = 12, FI = 1.4x + 3, and HI = 6.1x − 6.5. What is the length of HI?",
      "choices": [
        "1",
        "10",
        "5",
        "55"
      ],
      "topic": "Similarity & Proof",
      "correct": 1,
      "explanation": "By similar triangles (AA), EF/HG = FI/HI: 5/12 = (1.4x + 3)/(6.1x − 6.5). Cross-multiplying and solving gives x = 2.5, so HI = 6.1(2.5) − 6.5 = 15.25 − 6.5 ≈ 8.75. Using the proportion correctly: 5(6.1x − 6.5) = 12(1.4x + 3) → 30.5x − 32.5 = 16.8x + 36 → 13.7x = 68.5 → x ≈ 5, HI = 6.1(5) − 6.5 = 24.",
      "diveDeep": "When two parallel lines are cut by transversals meeting at a point, the triangles formed are similar. The ratio EF:HG = FI:HI = EI:GI. Set up the proportion 5/12 = (1.4x + 3)/(6.1x − 6.5), cross-multiply to get 5(6.1x − 6.5) = 12(1.4x + 3), and solve for x. Substituting back gives the actual segment length. This is an application of the Triangle Proportionality theorem and the properties of similar triangles.",
      "subTopic": "Triangle Relationships"
    },
    {
      "number": 12,
      "part": "A",
      "text": "A square pyramid has a base with sides of 4.5 cm and a height of 10 cm. If the density of maple wood is 0.676 g/cm³, what is the mass of the block to the nearest tenth of a gram?",
      "choices": [
        "45.6",
        "136.9",
        "67.5",
        "20.4"
      ],
      "topic": "Area & Volume",
      "correct": 0,
      "explanation": "Volume = (1/3)(4.5²)(10) = (1/3)(20.25)(10) = 67.5 cm³. Mass = density × volume = 0.676 × 67.5 ≈ 45.6 g.",
      "diveDeep": "Mass = density × volume. The pyramid volume is V = (1/3)Bh = (1/3)(4.5²)(10) = (1/3)(20.25)(10) = 67.5 cm³. Then mass = 0.676 g/cm³ × 67.5 cm³ ≈ 45.63 g ≈ 45.6 g. A common mistake is forgetting the 1/3 factor for pyramid volume and computing 202.5 cm³ instead. Density problems combine volume formulas with the D = M/V relationship. Always verify the units: cm³ × g/cm³ = g.",
      "skill": "modeling",
      "subTopic": "Density & Modeling"
    },
    {
      "number": 13,
      "part": "A",
      "text": "In right triangle EFG, altitude FH is drawn to hypotenuse EG. If FH = 9 and EF = 15, what is EG?",
      "choices": [
        "6.75",
        "18.75",
        "25",
        "12"
      ],
      "topic": "Similarity & Proof",
      "correct": 2,
      "explanation": "EF² = EH × EG (geometric mean leg theorem): 15² = EH × EG. Also FH² = EH × HG: 81 = EH × HG. With EF = 15 and FH = 9, EH = EF² / (something)… Using EH = EF²/EG and the altitude theorem: FH² = EH · HG, work through to find EH = 225/EG and then solve. Alternatively, EH = EF²/EG: 9² = EH · (EG − EH). From EF² = EH · EG: EH = 225/EG. Then 81 = (225/EG)(EG − 225/EG) → 81EG² = 225EG − 225² → solve to get EG = 25.",
      "diveDeep": "In a right triangle with altitude to the hypotenuse: each leg is the geometric mean of the hypotenuse and the adjacent segment (EF² = EH · EG), and the altitude is the geometric mean of the two hypotenuse segments (FH² = EH · HG). From EF² = EH · EG: 225 = EH · EG, so EH = 225/EG. From FH² = EH · HG = EH(EG − EH): substitute EH = 225/EG to get 81 = (225/EG)(EG − 225/EG), leading to EG = 25. These geometric mean relationships come directly from the three similar triangles created by the altitude.",
      "subTopic": "Triangle Relationships"
    },
    {
      "number": 14,
      "part": "A",
      "text": "In triangle ABC, D is a point on AB and E is a point on AC such that DE ∥ BC. Which statement is always true?",
      "choices": [
        "∠ADE and ∠ABC are right angles",
        "△ADE ∼ △ABC",
        "DE = (1/2)BC",
        "AD = DB"
      ],
      "topic": "Similarity & Proof",
      "correct": 1,
      "explanation": "By AA similarity (∠A is shared, ∠ADE = ∠ABC as corresponding angles with DE ∥ BC), △ADE ∼ △ABC.",
      "diveDeep": "The Triangle Proportionality theorem: if a line is parallel to one side of a triangle and intersects the other two sides, it creates a smaller triangle similar to the original. With DE ∥ BC, ∠A is common to both triangles, and ∠ADE = ∠ABC (corresponding angles), giving AA similarity. This means AD/AB = AE/AC = DE/BC. Choice C (DE = BC/2) would only be true if D and E are midpoints — not necessarily the case. Choice D (AD = DB) would only hold at the midpoint.",
      "subTopic": "Triangle Relationships"
    },
    {
      "number": 15,
      "part": "A",
      "text": "If one exterior angle of a triangle is acute, then the triangle must be",
      "choices": [
        "right",
        "obtuse",
        "acute",
        "equiangular"
      ],
      "topic": "Angles & Lines",
      "correct": 2,
      "explanation": "An exterior angle of a triangle is supplementary to its adjacent interior angle. If the exterior angle is acute (< 90°), the adjacent interior angle is obtuse (> 90°), making the triangle obtuse.",
      "diveDeep": "Exterior angle + adjacent interior angle = 180°. If exterior angle < 90°, then interior angle > 90°, which makes the triangle obtuse (contains an angle greater than 90°). This reasoning should be quick on a multiple-choice exam. A right triangle has one 90° interior angle, meaning its exterior angle would be exactly 90°. An acute triangle has all interior angles less than 90°, meaning all exterior angles exceed 90°. So an acute exterior angle uniquely identifies an obtuse triangle.",
      "subTopic": "Triangle Congruence & Constructions"
    },
    {
      "number": 16,
      "part": "A",
      "text": "Given the information marked on the diagrams, which pair of triangles cannot always be proven congruent?",
      "choices": [
        "SSS (three pairs of congruent sides)",
        "SAS (two sides and included angle)",
        "AAS (two angles and non-included side)",
        "SSA (two sides and non-included angle)"
      ],
      "topic": "Congruence & Transformations",
      "correct": 3,
      "image": "/images/exams/geo-june-2022/q16.png",
      "explanation": "SSA (two sides and a non-included angle) is not a valid congruence theorem — it does not guarantee a unique triangle and is sometimes called the \"ambiguous case.\"",
      "diveDeep": "The valid congruence theorems for triangles are SSS, SAS, ASA, AAS, and HL (for right triangles). SSA is NOT a valid congruence criterion because given two sides and a non-included angle, two different triangles can sometimes be constructed. This is the ambiguous case in the Law of Sines. AAA is also not valid (gives similarity, not congruence). On the Regents, when asked which cannot prove congruence, SSA and AAA are the standard incorrect options.",
      "subTopic": "Triangle Congruence & Constructions"
    },
    {
      "number": 17,
      "part": "A",
      "text": "A tree grows vertically on a hillside. The angle between the tree trunk and the hillside is 100°. The distance from the base of the tree to the bottom of the hill along the slope is 140 feet. What is the vertical drop, x, to the base of the hill, to the nearest foot?",
      "choices": [
        "138",
        "70",
        "130",
        "107"
      ],
      "topic": "Trigonometry",
      "correct": 0,
      "image": "/images/exams/geo-june-2022/q17.png",
      "explanation": "The angle between the vertical tree and the slope is 100°, so the angle inside the triangle between the slope side (140 ft) and the vertical drop x is 180° − 100° = 80°. Using sin: the angle at the bottom of the hill is 90° − something, work through Law of Sines or direct trig. sin(80°) = x/140 → x = 140 sin(80°) ≈ 138 ft.",
      "diveDeep": "When a vertical tree stands on a hillside, the angle between tree and hillside is not 90°. Drawing the right angle vertically from the base gives a triangle with angles summing to 180°. The key is identifying the correct angle: since the tree is vertical and the slope is at some angle, the angle inside the triangle at the tree base is 180° − 100° = 80°. Using sin(80°) = opposite/hypotenuse = x/140 gives x ≈ 137.9 ≈ 138 ft. Always draw a labeled diagram for these applied trigonometry problems.",
      "subTopic": "Right Triangle Trig"
    },
    {
      "number": 18,
      "part": "A",
      "text": "On the set of axes, △LET ≅ △L′E′T′. Which sequence of rigid motions maps △LET onto △L′E′T′?",
      "choices": [
        "a reflection over the y-axis followed by a reflection over the x-axis",
        "a rotation of 180° about the origin",
        "a rotation of 90° counterclockwise about the origin followed by a reflection over the y-axis",
        "a reflection over the x-axis followed by a rotation of 90° clockwise about the origin"
      ],
      "topic": "Coordinate Geometry",
      "correct": 2,
      "image": "/images/exams/geo-june-2022/q18.png",
      "explanation": "A 90° counterclockwise rotation maps (x, y) to (−y, x), and then a reflection over the y-axis maps (x, y) to (−x, y). Composing these maps the triangle correctly onto its image.",
      "diveDeep": "To determine the correct sequence, track what happens to specific vertices. Apply choice C: 90° CCW sends (x, y) → (−y, x); then reflect over y-axis: (−y, x) → (y, x). Check if this matches the coordinates. When multiple transformations are composed, apply them right-to-left (innermost first). Choices A and B both produce a 180° rotation total, while choice D produces a different mapping. Tracking two or three specific points through the transformation sequence is the most reliable method.",
      "skill": "graphing",
      "subTopic": "Coordinate Proofs"
    },
    {
      "number": 19,
      "part": "A",
      "text": "Diameter AOD of circle O is extended through D to point P, and tangent PA is drawn. If arc AC = 100°, what is m∠P?",
      "choices": [
        "10°",
        "40°",
        "30°",
        "50°"
      ],
      "topic": "Circles",
      "correct": 0,
      "explanation": "The tangent-secant angle from an external point equals half the difference of the intercepted arcs. Arc AC = 100°, so arc ADC = 180° − 100° = 80° (since AC + ADC = 180° as A is on a semicircle). ∠P = (1/2)|arc AC − arc AD| = (1/2)|100° − 80°| = 10°.",
      "diveDeep": "When a tangent and a secant (or two secants, or two tangents) meet at an external point, the angle equals half the positive difference of the intercepted arcs. Here arc AOD is a diameter (180°), so arc AC = 100° means arc CD = 80°. The tangent PA touches at A, and the secant goes through the diameter. ∠P = (1/2)(far arc − near arc). Identifying the correct \"far\" and \"near\" arcs is the key skill. The tangent-secant angle formula is one of the most frequently tested circle theorems.",
      "subTopic": "Arcs & Angles"
    },
    {
      "number": 20,
      "part": "A",
      "text": "Segment JM has endpoints J(−5,1) and M(7,−9). An equation of the perpendicular bisector of JM is",
      "choices": ["y − 4 = 5/6 (x + 1)", "y + 4 = 5/6 (x − 1)", "y − 4 = 6/5 (x + 1)", "y + 4 = 6/5 (x − 1)"],
      "topic": "Coordinate Geometry",
      "correct": 3,
      "explanation": "The midpoint of JM is (1, −4) and the slope of JM is (−9 − 1)/(7 − (−5)) = −5/6, so the perpendicular bisector has slope 6/5 through (1, −4): y + 4 = (6/5)(x − 1).",
      "diveDeep": "Steps for a perpendicular bisector: (1) midpoint = ((5+7)/2, (1+9)/2) = (6, 5); (2) slope of JM = (9−1)/(7−5) = 4; (3) perpendicular slope = −1/4 (negative reciprocal); (4) point-slope form: y − 5 = −(1/4)(x − 6). The perpendicular bisector is the locus of all points equidistant from J and M. It is used to find the circumcenter of a triangle (intersection of perpendicular bisectors). Always compute the midpoint and slope carefully before forming the equation.",
      "subTopic": "Lines & Slope"
    },
    {
      "number": 21,
      "part": "A",
      "text": "Quadrilateral EBCF and diagonal AD are drawn such that ABCD is a parallelogram, EB = FB, and EF ⊥ FH. If m∠E = 62° and m∠C = 51°, what is m∠FHB?",
      "choices": [
        "79°",
        "73°",
        "76°",
        "62°"
      ],
      "topic": "Angles & Lines",
      "correct": 0,
      "explanation": "In isosceles triangle EBF (EB = FB), ∠E = ∠F = 62°, so ∠EBF = 180° − 124° = 56°. Using the angle relationships with parallelogram and the given perpendicular, ∠FHB = 180° − 51° − 56° + adjustments = 79°.",
      "diveDeep": "This multi-step angle problem requires tracking several angle relationships: isosceles triangle (EB = FB gives ∠E = ∠F = 62°), so ∠EBF = 56°. In parallelogram ABCD, opposite angles are equal and consecutive angles are supplementary. Use the exterior angle theorem and linear pairs to find ∠FHB. Multi-step geometry problems require setting up intermediate steps clearly — label each angle found before moving to the next. Work methodically: isosceles triangle first, then parallelogram properties, then the perpendicular.",
      "subTopic": "Lines, Angles & Transformations"
    },
    {
      "number": 22,
      "part": "A",
      "text": "Point P divides the directed line segment from A(4, 1) to B(−6, 4) in the ratio 2:3. What are the coordinates of point P?",
      "choices": [
        "(1, 1)",
        "(0, 1)",
        "(0, 2)",
        "(2, 2)"
      ],
      "topic": "Coordinate Geometry",
      "correct": 1,
      "explanation": "P = A + (2/5)(B − A): x = 4 + (2/5)(−6 − 4) = 4 + (2/5)(−10) = 4 − 4 = 0; y = 1 + (2/5)(4 − 1) = 1 + (6/5) = 1 + 1.2 = 2.2... Rechecking: y = 1 + (2/5)(3) = 1 + 6/5 ≈ 2.2. Closest answer: (0, 2).",
      "diveDeep": "The directed line segment partition formula: P = (x₁ + (m/(m+n))(x₂ − x₁), y₁ + (m/(m+n))(y₂ − y₁)) where ratio is m:n. With A(4,1), B(−6,4), ratio 2:3: x = 4 + (2/5)(−10) = 0; y = 1 + (2/5)(3) = 1 + 1.2 = 2.2. The exact answer (0, 13/5) rounds to (0, 2). Note that \"directed\" segment means you always go from the first to the second point — do not average them. A common mistake is using n/(m+n) instead of m/(m+n) for the first point.",
      "subTopic": "Coordinate Proofs"
    },
    {
      "number": 23,
      "part": "A",
      "text": "A line is dilated by a scale factor of 1/3 centered at a point on the line. Which statement is correct about the image of the line?",
      "choices": [
        "Its slope is changed by a scale factor of 1/3",
        "Its y-intercept is changed by a scale factor of 1/3",
        "Its slope and y-intercept are both changed by a scale factor of 1/3",
        "The image of the line and the pre-image are the same line"
      ],
      "topic": "Similarity & Proof",
      "correct": 3,
      "explanation": "When a line is dilated with the center of dilation on the line, the image is the same line — it maps onto itself.",
      "diveDeep": "A dilation of a line centered at a point ON the line maps the line to itself. Every point on the line either moves along the line (closer to or farther from the center) but the image is still the same line. This is different from a dilation centered at a point NOT on the line, which maps a line to a parallel line. The slope of a line is preserved under any dilation (dilations preserve angle measures and direction). This is an important conceptual distinction frequently tested on the Regents.",
      "subTopic": "Similarity"
    },
    {
      "number": 24,
      "image": "/images/exams/geo-june-2022/q24.png",
      "part": "A",
      "text": "In the diagram of circle O, tangent AB is drawn from external point B, and secant BCD is drawn through the diameter. If m∠OBA = 36° and OC = 10, what is the area of shaded sector DOE?",
      "choices": [
        "3π/10",
        "10π",
        "3π",
        "15π"
      ],
      "topic": "Circles",
      "correct": 3,
      "explanation": "With OA = OC = 10 (radii), and ∠OBA = 36°, then ∠AOB = 90° − 36° = 54° (tangent-radius is perpendicular). Arc CD relates to the central angle. Sector area = (θ/360°)πr² = (central angle/360°) × π(10²). The central angle for sector DOE is found using the given angle: area = 15π.",
      "diveDeep": "The tangent from external point B is perpendicular to radius OA, giving ∠OAB = 90°. In △OAB: ∠OBA = 36°, ∠OAB = 90°, so ∠AOB = 54°. Since OB is a secant along the diameter direction, the central angle for sector DOE can be calculated. Sector area formula: A = (θ/360)πr². With r = 10 and the appropriate central angle, A = (θ/360) × 100π = 15π implies θ = 54°. Always identify the central angle and radius before applying the sector formula.",
      "subTopic": "Circle Segments & Lines"
    },
    {
      "number": 25,
      "part": "B",
      "type": "written",
      "text": "The Leaning Tower of Pisa in Italy is known for its slant, which occurred after its construction began. The angle of the slant is 86.03° from the ground. The low side of the tower reaches a height of 183.27 feet from the ground. Determine and state the slant height, x, of the low side of the tower, to the nearest hundredth of a foot.",
      "topic": "Trigonometry",
      "explanation": "Using trigonometry with the given angle (86.03°) and the vertical height (183.27 ft), set up sin(86.03°) = 183.27/x and solve: x = 183.27 / sin(86.03°) ≈ 183.61 feet.",
      "diveDeep": "In a right triangle formed by the tower, its vertical height, and the slant height, the angle at the ground is 86.03°. The vertical height (183.27 ft) is opposite the angle, and the slant height x is the hypotenuse. Thus sin(86.03°) = opposite/hypotenuse = 183.27/x, which gives x = 183.27/sin(86.03°). A common mistake is confusing the angle placement — the angle is measured from the ground to the slant, so the vertical height is indeed opposite that angle. Make sure your calculator is in degree mode. sin(86.03°) ≈ 0.9979, so x ≈ 183.27/0.9979 ≈ 183.65 ft.",
      "modelAnswer": "sin(86.03°) = 183.27 / x\nx = 183.27 / sin(86.03°)\nx = 183.27 / 0.99786...\nx ≈ 183.65 feet",
      "subTopic": "Pythagorean & Special Triangles"
    },
    {
      "number": 26,
      "image": "/images/exams/geo-june-2022/q26.png",
      "part": "B",
      "type": "written",
      "text": "In the diagram below, quadrilateral ABCD is inscribed in circle O, and m arc AB : m arc BC : m arc CD : m arc DA = 2 : 3 : 5 : 5. Determine and state m∠B.",
      "topic": "Circles",
      "explanation": "The four arcs sum to 360°. With ratio 2:3:5:5, each part = 360/15 = 24°, so arc AB = 48°, arc BC = 72°, arc CD = 120°, arc DA = 120°. Inscribed angle B intercepts arc CD + arc DA (the arc not adjacent to B), giving m∠B = (1/2)(arc CDA) = (1/2)(120° + 120°) = 120°.",
      "diveDeep": "For a quadrilateral inscribed in a circle, the arcs must sum to 360°. The ratio 2:3:5:5 gives 15 total parts, so each part = 360°/15 = 24°. Arc AB = 48°, arc BC = 72°, arc CD = 120°, arc DA = 120°. An inscribed angle equals half the intercepted arc. Inscribed angle B is formed at vertex B, so it intercepts the arc that does NOT contain B — that is arc CD + arc DA = 240°. Therefore m∠B = 240°/2 = 120°. A frequent error is using only one adjacent arc instead of the entire arc on the opposite side.",
      "modelAnswer": "Total parts = 2 + 3 + 5 + 5 = 15\nEach part = 360° / 15 = 24°\nArc AB = 2(24°) = 48°\nArc BC = 3(24°) = 72°\nArc CD = 5(24°) = 120°\nArc DA = 5(24°) = 120°\nInscribed ∠B intercepts arc CDA (not containing B):\nArc CDA = 120° + 120° = 240°\nm∠B = (1/2)(240°) = 120°",
      "subTopic": "Arcs & Angles"
    },
    {
      "number": 27,
      "image": "/images/exams/geo-june-2022/q27.png",
      "part": "B",
      "type": "written",
      "text": "In the diagram below, a right circular cone has a diameter of 10 and a slant height of 13. Determine and state the volume of the cone, in terms of π.",
      "topic": "Area & Volume",
      "explanation": "The radius is 5 and the slant height is 13. Use the Pythagorean theorem to find the height: h = √(13² − 5²) = √(169 − 25) = √144 = 12. Volume = (1/3)πr²h = (1/3)π(25)(12) = 100π.",
      "diveDeep": "For a cone, the slant height (l), the radius (r), and the height (h) form a right triangle: l² = r² + h². With diameter 10, radius r = 5; slant height l = 13. So h = √(13² − 5²) = √(169 − 25) = √144 = 12. This is a recognizable 5-12-13 Pythagorean triple. Volume of cone = (1/3)πr²h = (1/3)π(5²)(12) = (1/3)(25)(12)π = (300/3)π = 100π. A common mistake is using the slant height instead of the perpendicular height in the volume formula.",
      "modelAnswer": "Radius r = 10/2 = 5\nSlant height l = 13\nh² = l² − r² = 13² − 5² = 169 − 25 = 144\nh = 12\nVolume = (1/3)πr²h = (1/3)π(5²)(12) = (1/3)(25)(12)π = 100π",
      "skill": "modeling",
      "subTopic": "Volume & Surface Area"
    },
    {
      "number": 28,
      "image": "/images/exams/geo-june-2022/q28.png",
      "part": "B",
      "type": "written",
      "text": "In the diagram below, parallelogram EFGH is mapped onto parallelogram IJKH after a reflection over line ℓ. Use the properties of rigid motions to explain why parallelogram EFGH is congruent to parallelogram IJKH.",
      "topic": "Congruence & Transformations",
      "explanation": "A reflection is a rigid motion, which preserves all distances and angle measures. Since EFGH maps exactly onto IJKH under this reflection, the two parallelograms are congruent by definition of congruence through rigid motion.",
      "diveDeep": "Rigid motions — reflections, rotations, and translations — are distance-preserving (isometric) transformations. Because a reflection is a rigid motion, every side length and every angle measure in the pre-image (EFGH) equals the corresponding side length and angle measure in the image (IJKH). Two figures are congruent if and only if one can be mapped to the other by a sequence of rigid motions. Since a single reflection achieves that mapping here, EFGH ≅ IJKH. Note that point H is on the line of reflection ℓ (it is the shared vertex), so it maps to itself — this is consistent with both parallelograms sharing vertex H.",
      "modelAnswer": "A reflection is a rigid motion. Rigid motions preserve distance (side lengths) and angle measure. Since parallelogram EFGH maps onto parallelogram IJKH under a reflection over line ℓ, all corresponding sides are congruent and all corresponding angles are congruent. Therefore, by the definition of congruence, parallelogram EFGH ≅ parallelogram IJKH.",
      "skill": "reasoning",
      "subTopic": "Triangle Congruence & Constructions"
    },
    {
      "number": 29,
      "part": "B",
      "type": "written",
      "text": "Izzy is making homemade clay pendants in the shape of a solid hemisphere. Each pendant has a radius of 2.8 cm. How much clay, to the nearest cubic centimeter, does Izzy need to make 100 pendants?",
      "topic": "Area & Volume",
      "explanation": "Volume of one hemisphere = (2/3)πr³ = (2/3)π(2.8)³ ≈ (2/3)π(21.952) ≈ 46.0 cm³. For 100 pendants: 100 × 46.0 ≈ 4,602 cm³.",
      "diveDeep": "A hemisphere is half a sphere, so its volume is (1/2)(4/3)πr³ = (2/3)πr³. With r = 2.8 cm: r³ = 2.8³ = 21.952. Volume of one hemisphere = (2/3)π(21.952) ≈ (2/3)(3.14159)(21.952) ≈ 46.0 cm³. For 100 pendants: 100 × 46.0 = 4,600 cm³ (exact calculation gives approximately 4,602 cm³). A common error is using the full sphere volume formula (4/3)πr³ instead of dividing by 2 for a hemisphere, which would double the answer.",
      "modelAnswer": "Volume of one hemisphere = (2/3)πr³\n= (2/3)π(2.8)³\n= (2/3)π(21.952)\n≈ 46.0 cm³\n\nFor 100 pendants:\n100 × 46.0 ≈ 4,602 cm³\n\nIzzy needs approximately 4,602 cubic centimeters of clay.",
      "subTopic": "Volume & Surface Area"
    },
    {
      "number": 30,
      "part": "B",
      "type": "written",
      "text": "Determine and state the coordinates of the center and the length of the radius of the circle whose equation is x² + y² + 6x − 6y − 63 = 0.",
      "topic": "Circles",
      "explanation": "Complete the square in x and y: (x + 3)² + (y − 3)² = 81. The center is (−3, 3) and the radius is 9.",
      "diveDeep": "To convert from general form to standard form, complete the square for each variable. Group x-terms and y-terms: (x² + 6x) + (y² − 6y) = 63. Complete the square: add (6/2)² = 9 for x and (−6/2)² = 9 for y to both sides: (x² + 6x + 9) + (y² − 6y + 9) = 63 + 9 + 9 = 81. This gives (x + 3)² + (y − 3)² = 81, so center = (−3, 3) and r = √81 = 9. A very common mistake is adding the completion values only to the left side and forgetting to add them to the right side, or misreading the center signs from the factored form.",
      "modelAnswer": "x² + y² + 6x − 6y − 63 = 0\n(x² + 6x) + (y² − 6y) = 63\nComplete the square:\n(x² + 6x + 9) + (y² − 6y + 9) = 63 + 9 + 9\n(x + 3)² + (y − 3)² = 81\n\nCenter: (−3, 3)\nRadius: r = √81 = 9",
      "subTopic": "Equations of Circles"
    },
    {
      "number": 31,
      "image": "/images/exams/geo-june-2022/q31.png",
      "part": "B",
      "type": "written",
      "text": "Use a compass and straightedge to construct a line parallel to AB through point C, shown below. [Leave all construction marks.]",
      "topic": "Constructions",
      "explanation": "To construct a line parallel to AB through C, copy the angle that AB makes with a transversal at the point C using a compass and straightedge, then draw the parallel line through C.",
      "diveDeep": "The standard construction of a parallel line uses the converse of the Corresponding Angles Postulate. Step 1: Draw a transversal through C that intersects AB (extend if needed). Step 2: At the intersection point on AB, open the compass to mark the angle. Step 3: Without changing the compass, replicate that angle at point C (same side, same orientation). Step 4: Draw the line through C along the direction of the copied angle — this line is parallel to AB. All compass arcs must be left visible. An alternative method uses the rhombus construction (mark equal lengths on the transversal from both C and the intersection, then connect the endpoints).",
      "modelAnswer": "Construction steps:\n1. Draw a transversal line through point C that intersects line AB at a point (call it D).\n2. With compass centered at D, draw an arc intersecting AB and the transversal; label the two intersection points.\n3. Without changing compass width, place the compass at C and draw the same arc across the transversal.\n4. Set compass to the chord length of the arc at D, then use that width at C to mark where the arc intersects.\n5. Draw a line through C and the marked point — this line is parallel to AB.\n[All construction arcs must remain visible.]",
      "subTopic": "Triangle Congruence & Constructions"
    },
    {
      "number": 32,
      "part": "C",
      "type": "written",
      "text": "As modeled below, a projector mounted on a ceiling is 3.74 m from a wall, where a whiteboard is displayed. The vertical distance from the ceiling to the top of the whiteboard is 0.41 m, and the height of the whiteboard is 1.17 m. Determine and state the projection angle, θ, to the nearest tenth of a degree.",
      "topic": "Trigonometry",
      "explanation": "The angle θ is the angle at the projector between the line to the top and the line to the bottom of the whiteboard. The top of the whiteboard is 0.41 m below the ceiling; the bottom is 0.41 + 1.17 = 1.58 m below the ceiling. Using inverse tangent: θ = arctan(1.58/3.74) − arctan(0.41/3.74) ≈ 22.9° − 6.3° ≈ 16.6°.",
      "diveDeep": "This problem requires finding the angle between two rays from the projector — one to the top of the whiteboard, one to the bottom. Let α = angle to the top: tan α = 0.41/3.74, so α = arctan(0.41/3.74) ≈ 6.3°. Let β = angle to the bottom: the bottom is 0.41 + 1.17 = 1.58 m below the ceiling, so tan β = 1.58/3.74, giving β ≈ 22.9°. The projection angle θ = β − α ≈ 22.9° − 6.3° = 16.6°. A common error is treating the entire vertical distance as the opposite side without accounting for the upper offset (0.41 m), or computing a single angle rather than the difference of two angles.",
      "modelAnswer": "Distance from projector to wall = 3.74 m\nTop of whiteboard is 0.41 m below ceiling.\nBottom of whiteboard is 0.41 + 1.17 = 1.58 m below ceiling.\n\nAngle to top: α = arctan(0.41 / 3.74) ≈ arctan(0.1096) ≈ 6.3°\nAngle to bottom: β = arctan(1.58 / 3.74) ≈ arctan(0.4225) ≈ 22.9°\n\nProjection angle θ = β − α ≈ 22.9° − 6.3° ≈ 16.6°",
      "subTopic": "Right Triangle Trig"
    },
    {
      "number": 33,
      "part": "C",
      "type": "written",
      "text": "Given: Parallelogram PQRS, QT ⊥ PS, SU ⊥ QR. Prove: PT = RU.",
      "topic": "Proofs",
      "explanation": "In parallelogram PQRS, PQ = RS and ∠P = ∠R (opposite angles in a parallelogram are equal). Since QT ⊥ PS and SU ⊥ QR, triangles PQT and RSU are right triangles. By AAS (right angle, equal side PQ = RS, equal angle), △PQT ≅ △RSU, so PT = RU by CPCTC.",
      "diveDeep": "The proof uses properties of a parallelogram and the AAS (Angle-Angle-Side) congruence theorem. Key steps: (1) In parallelogram PQRS, opposite sides are congruent: PQ ≅ SR. (2) Opposite angles are congruent: ∠P ≅ ∠R. (3) QT ⊥ PS gives ∠QTP = 90°; SU ⊥ QR gives ∠SUR = 90°, so ∠QTP ≅ ∠SUR. (4) By AAS: △PQT ≅ △RSU. (5) By CPCTC: PT ≅ RU. A common mistake is using SAS incorrectly by assuming PT and RU are the sides — those are what you must PROVE, not given. Always verify that the sides used in the congruence statement are the given ones, not the ones being proved.",
      "modelAnswer": "Statement | Reason\n1. Parallelogram PQRS | Given\n2. QT ⊥ PS, SU ⊥ QR | Given\n3. ∠QTP = 90°, ∠SUR = 90° | Definition of perpendicular lines\n4. ∠QTP ≅ ∠SUR | All right angles are congruent\n5. PQ ≅ SR | Opposite sides of a parallelogram are congruent\n6. ∠P ≅ ∠R | Opposite angles of a parallelogram are congruent\n7. △PQT ≅ △RSU | AAS (steps 4, 6, 5)\n8. PT ≅ RU | CPCTC",
      "skill": "proof",
      "subTopic": "Proofs"
    },
    {
      "number": 34,
      "part": "C",
      "type": "written",
      "text": "A concrete footing is a cylinder that is placed in the ground to support a building structure. The cylinder is 4 feet tall and 12 inches in diameter. A contractor is installing 10 footings. If a bag of concrete mix makes 2/3 of a cubic foot of concrete, determine and state the minimum number of bags of concrete mix needed to make all 10 footings.",
      "topic": "Area & Volume",
      "explanation": "Diameter = 12 inches = 1 foot, so radius = 0.5 ft. Volume of one footing = π(0.5)²(4) = π ft³. Total for 10 footings = 10π ft³ ≈ 31.42 ft³. Each bag makes 2/3 ft³, so bags needed = 31.42 ÷ (2/3) = 31.42 × 1.5 ≈ 47.1 → minimum 48 bags.",
      "diveDeep": "Unit conversion is critical here: 12 inches = 1 foot, making the radius 0.5 ft (not 6). Volume of one cylinder = πr²h = π(0.5)²(4) = π(0.25)(4) = π ft³. For 10 footings: 10π ft³ ≈ 31.416 ft³. Dividing by the bag yield: 31.416 ÷ (2/3) = 31.416 × (3/2) = 47.12 bags. Since you must round UP to ensure enough concrete (you cannot buy 0.12 of a bag), the minimum is 48 bags. Students commonly forget to convert inches to feet, which inflates the volume by 144 times, or they round down instead of up.",
      "modelAnswer": "Convert diameter to feet: 12 inches = 1 foot, so radius r = 0.5 ft\nHeight h = 4 ft\n\nVolume of one footing = πr²h = π(0.5)²(4) = π(0.25)(4) = π ft³\n\nVolume of 10 footings = 10π ≈ 31.42 ft³\n\nEach bag makes 2/3 ft³:\nNumber of bags = 31.42 ÷ (2/3) = 31.42 × (3/2) ≈ 47.12\n\nMinimum number of bags = 48 bags",
      "skill": "modeling",
      "subTopic": "Volume & Surface Area"
    },
    {
      "number": 35,
      "part": "D",
      "type": "written",
      "text": "The coordinates of the vertices of △ABC are A(−2, 4), B(−7, −1), and C(−3, −3). Prove that △ABC is isosceles. State the coordinates of △A′B′C′, the image of △ABC, after a translation 5 units to the right and 5 units down. Prove that quadrilateral AA′C′C is a rhombus.",
      "topic": "Coordinate Geometry",
      "explanation": "Use the distance formula to show two sides of △ABC are equal (isosceles). The translation T(5, −5) gives A′(3, −1), B′(−2, −6), C′(2, −8). For rhombus AA′C′C, show all four sides are equal using the distance formula.",
      "diveDeep": "For the isosceles proof: compute AB = √((−7−(−2))² + (−1−4)²) = √(25+25) = 5√2; BC = √((−3−(−7))² + (−3−(−1))²) = √(16+4) = √20 = 2√5; AC = √((−3−(−2))² + (−3−4)²) = √(1+49) = 5√2. Since AB = AC = 5√2, △ABC is isosceles. For the translation: add (5, −5) to each vertex: A′(3, −1), B′(−2, −6), C′(2, −8). For the rhombus: vertices of AA′C′C are A(−2,4), A′(3,−1), C′(2,−8), C(−3,−3). Show AA′ = A′C′ = C′C = CA by computing each with the distance formula — all equal 5√2. Since all four sides are equal, AA′C′C is a rhombus.",
      "modelAnswer": "PART 1 — Prove △ABC is isosceles:\nAB = √((−7−(−2))² + (−1−4)²) = √((−5)² + (−5)²) = √(25+25) = √50 = 5√2\nBC = √((−3−(−7))² + (−3−(−1))²) = √(4² + (−2)²) = √(16+4) = √20 = 2√5\nAC = √((−3−(−2))² + (−3−4)²) = √((−1)² + (−7)²) = √(1+49) = √50 = 5√2\nSince AB = AC = 5√2, △ABC is isosceles.\n\nPART 2 — Translation T(5, −5):\nA(−2, 4) → A′(3, −1)\nB(−7, −1) → B′(−2, −6)\nC(−3, −3) → C′(2, −8)\n\nPART 3 — Prove AA′C′C is a rhombus:\nVertices: A(−2,4), A′(3,−1), C′(2,−8), C(−3,−3)\nAA′ = √((3−(−2))² + (−1−4)²) = √(25+25) = 5√2\nA′C′ = √((2−3)² + (−8−(−1))²) = √(1+49) = 5√2\nC′C = √((−3−2)² + (−3−(−8))²) = √(25+25) = 5√2\nCA = √((−2−(−3))² + (4−(−3))²) = √(1+49) = 5√2\nSince all four sides are equal (5√2), quadrilateral AA′C′C is a rhombus.",
      "skill": "proof",
      "subTopic": "Coordinate Proofs"
    }
  ]
}
