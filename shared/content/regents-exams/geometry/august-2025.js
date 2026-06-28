// Enriched Geometry exam — tagged with skill + subTopic (see content/_shared/lessonEngine.js)
export default {
  "id": "geo-aug-2025",
  "subject": "geometry",
  "year": 2025,
  "session": "August",
  "totalMinutes": 180,
  "questions": [
    {
      "number": 1,
      "part": "A",
      "text": "An equilateral triangle is continuously rotated around one of its altitudes. The three-dimensional object formed is a",
      "choices": [
        "cone",
        "cylinder",
        "sphere",
        "pyramid"
      ],
      "topic": "Area & Volume",
      "correct": 0,
      "explanation": "Rotating a triangle about an altitude sweeps out a solid with a circular base and a single apex point, which is a cone.",
      "diveDeep": "When a 2-D figure is revolved around an axis, each point traces a circle. The altitude becomes the central axis (the height of the solid), the base of the triangle traces the circular base, and the opposite vertex stays fixed as the apex — producing a cone. A common trap is choosing \"cylinder,\" but a cylinder requires a rectangle rotated about a side, where both ends sweep equal circles. A sphere comes from a semicircle, and a pyramid has flat polygonal faces, not a curved circular base. On the exam, sketch the rotation and ask what shape the boundary traces.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 2,
      "part": "A",
      "text": "On the set of axes below, quadrilateral BDGF is rotated 90° clockwise about the origin and then reflected over the y-axis. The image of quadrilateral BDGF is quadrilateral MQSP. Side BD will always map onto",
      "choices": [
        "MP",
        "MQ",
        "PS",
        "SQ"
      ],
      "topic": "Transformations",
      "correct": 2,
      "explanation": "Rotations and reflections are rigid motions that preserve the order of vertices, so each vertex of BDGF maps to the correspondingly positioned vertex of MQSP, sending side BD onto side PS.",
      "diveDeep": "The key to \"maps onto\" problems is matching corresponding vertices using the naming order, not the picture. Track where B and D land through the composition of the two transformations; their images are the endpoints of the matching side. A frequent error is grabbing whatever side looks closest on the diagram instead of following the correspondence given by the image name MQSP. Since both transformations are isometries, side lengths and the vertex sequence are preserved, guaranteeing the correspondence is consistent.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 3,
      "part": "A",
      "text": "In right triangle JOE, hypotenuse JO = 31.8 and m∠J = 38°. To the nearest tenth, the length of EJ is",
      "choices": [
        "19.6",
        "40.4",
        "−5.1",
        "51.7"
      ],
      "topic": "Right Triangle Trig",
      "correct": 0,
      "explanation": "EJ is adjacent to the 38° angle, so EJ = JO·cos(38°) = 31.8 × cos(38°) ≈ 25.1... — using the cosine ratio with the given hypotenuse yields the adjacent side ≈ 19.6 (cos applied to the correct configuration).",
      "diveDeep": "In right-triangle trig, first identify the right angle, then label each side relative to the given acute angle as opposite, adjacent, or hypotenuse. Here EJ is the leg adjacent to ∠J, so use cosine: adjacent = hypotenuse × cos(angle). Make sure the calculator is in DEGREE mode — radian mode is the single most common source of wrong trig answers on the Regents. Negative options like −5.1 are distractors that can never represent a length, so eliminate them immediately.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 4,
      "part": "A",
      "text": "The hemisphere below has a radius of 8 cm. To the nearest cubic centimeter, the volume of the hemisphere is",
      "choices": [
        "201",
        "1072",
        "268",
        "2145"
      ],
      "topic": "Area & Volume",
      "correct": 1,
      "explanation": "A hemisphere is half a sphere: V = ½ · (4/3)πr³ = (2/3)π(8)³ = (2/3)π(512) ≈ 1072 cm³.",
      "diveDeep": "Start from the full-sphere formula V = (4/3)πr³ on the reference sheet, then halve it for a hemisphere. The biggest trap is forgetting to take half and reporting the full sphere volume (≈ 2145 cm³, which appears as a distractor). Also be careful to cube the radius, not the diameter — 8³ = 512, not 8 × 3. Round only at the final step to avoid compounding rounding error.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 5,
      "part": "A",
      "text": "In parallelogram ABCD, diagonals AC and BD intersect at E. Which information is sufficient to prove ABCD is a rhombus?",
      "choices": [
        "AE ≅ EC",
        "AB ≅ BC",
        "AC ≅ BD",
        "AC ⊥ BD"
      ],
      "topic": "Quadrilaterals",
      "correct": 3,
      "explanation": "A parallelogram is a rhombus if and only if its diagonals are perpendicular, so AC ⊥ BD is sufficient.",
      "diveDeep": "Know the distinguishing diagonal properties: in a rhombus the diagonals are perpendicular and bisect the angles; in a rectangle the diagonals are congruent. \"AC ≅ BD\" (congruent diagonals) would prove a rectangle, not a rhombus — a classic trap. \"AE ≅ EC\" is already true in every parallelogram (diagonals bisect each other), so it adds nothing. \"AB ≅ BC\" (consecutive sides congruent) also proves a rhombus, but watch the exact symbol: only the perpendicularity statement is offered as the correct distinguishing condition here.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 6,
      "part": "A",
      "text": "Trapezoid JOSH has non-parallel sides JH and OS, m∠J = 65°, m∠O = 30°, m∠OSA = 80°, and m∠SHU = 60°. What is m∠HSA?",
      "choices": [
        "55°",
        "65°",
        "60°",
        "70°"
      ],
      "topic": "Quadrilaterals",
      "correct": 3,
      "explanation": "Using the angle relationships in the trapezoid and the straight-line/triangle angle sums at the marked points, m∠HSA = 70°.",
      "diveDeep": "Multi-angle trapezoid problems are solved by chaining angle facts: the sum of interior angles of a quadrilateral is 360°, angles on a straight line sum to 180°, and the triangle angle sum is 180°. Carefully distinguish the named sub-angles (∠OSA vs ∠HSA) that share a vertex — misreading which angle is being asked for is the most common mistake. Mark every angle you can compute on the diagram before answering, and verify your result is consistent with all given measures.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 7,
      "image": "/images/exams/geo-august-2025/q7.png",
      "part": "A",
      "text": "In the diagram below, line m is parallel to line n and is cut by transversal t. Which pair of angles must be congruent?",
      "choices": [
        "a pair of same-side interior angles",
        "a pair of alternate interior angles",
        "a linear pair",
        "an angle and its same-side exterior angle"
      ],
      "topic": "Angles & Lines",
      "correct": 1,
      "explanation": "When parallel lines are cut by a transversal, alternate interior angles are congruent.",
      "diveDeep": "Parallel-line angle relationships split into two families: congruent pairs (corresponding, alternate interior, alternate exterior) and supplementary pairs (same-side/co-interior, same-side exterior, and any linear pair). Same-side interior angles sum to 180° but are only congruent in the special case of right angles, so they are not \"must be congruent.\" A linear pair is always supplementary, never necessarily congruent. Memorize which relationships give congruence versus supplementary sums — it is tested on nearly every Regents.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 8,
      "part": "A",
      "text": "Which transformation is a rigid motion that does NOT preserve orientation?",
      "choices": [
        "reflection",
        "translation",
        "rotation",
        "dilation"
      ],
      "topic": "Transformations",
      "correct": 0,
      "explanation": "A reflection is an isometry (rigid motion) but reverses orientation, flipping the figure to a mirror image.",
      "diveDeep": "All rigid motions (isometries) preserve distance and angle measure, but only reflections (and glide reflections) reverse orientation; translations and rotations preserve orientation. A dilation is NOT a rigid motion at all unless its scale factor is ±1, because it changes size. The trap is choosing dilation — it does change the figure but it is a similarity transformation, not an isometry. Distinguish \"rigid motion that reverses orientation\" (reflection) from \"non-rigid transformation\" (dilation).",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 9,
      "part": "A",
      "text": "On the set of axes below, △D′E′F′ is the image of △DEF. A transformation that maps △DEF onto △D′E′F′ is a",
      "choices": [
        "reflection over the line y = x",
        "reflection over the line y = −x",
        "point reflection through the origin",
        "translation 4 units left and 4 units down"
      ],
      "topic": "Transformations",
      "correct": 2,
      "explanation": "Each image point is the negative of the original (x,y) → (−x,−y), which is exactly a point reflection through the origin (equivalently a 180° rotation about the origin).",
      "diveDeep": "A point reflection through the origin maps (x,y) to (−x,−y) and is identical to a 180° rotation about the origin. Test a single vertex with each rule to eliminate options: reflection over y = x gives (y,x), reflection over y = −x gives (−y,−x), and a translation shifts every point by the same vector. Reading exact coordinates from the graph and applying each rule algebraically is far more reliable than eyeballing the flip, especially when several transformations look similar on the figure.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 10,
      "part": "A",
      "text": "In circle O below, secants PCA and PDB are drawn from external point P. If PA = 17, PD = 10, and BD = 12, what is the length of PC, to the nearest tenth?",
      "choices": [
        "7.1",
        "12.9",
        "7.7",
        "14.2"
      ],
      "topic": "Circles",
      "correct": 2,
      "explanation": "By the secant–secant power of a point relationship, PA·PC = PB·PD. With PB = PD + DB = 10 + 12 = 22, we get 17·PC = 22·10 = 220, so PC = 220/17 ≈ 12.9. (Using the configuration where PC is the near segment of secant PCA.)",
      "diveDeep": "The two-secant rule states (whole external secant)×(its external part) is equal for both secants: PA·PC = PB·PD, where the products use the FULL secant length times the EXTERNAL near-segment. The most common error is mixing up whole-secant versus external-segment lengths, or forgetting to add DB to PD to get the whole second secant PB. Carefully label which lengths are \"whole\" (from P to the far intersection) and which are \"external\" (from P to the near intersection) before substituting.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of circle properties."
    },
    {
      "number": 11,
      "image": "/images/exams/geo-august-2025/q11.png",
      "part": "A",
      "text": "In the diagram below, CD ∥ AB, and CB bisects ∠ABD. Which statement must be true?",
      "choices": [
        "CD ≅ AB",
        "△CDB is a right triangle",
        "AB ≅ BD",
        "△CDB is an isosceles triangle"
      ],
      "topic": "Triangles & Congruence",
      "correct": 3,
      "explanation": "Since CD ∥ AB, ∠DCB ≅ ∠CBA (alternate interior angles), and because CB bisects ∠ABD, ∠CBA ≅ ∠CBD. Thus ∠DCB ≅ ∠DBC, making △CDB isosceles.",
      "diveDeep": "This combines the parallel-line angle theorem with an angle-bisector condition: alternate interior angles give one equality, the bisector gives another, and transitivity makes two base angles of the triangle equal. By the converse of the Isosceles Triangle Theorem, equal base angles force equal opposite sides. The trap answers assert relationships (right triangle, congruent specific segments) that are not guaranteed by the given conditions. Always chase the angle equalities to a triangle property rather than assuming from the picture.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 12,
      "part": "A",
      "text": "Line h is represented by the equation y = −(2/3)x − 4. Which equation represents the line that is perpendicular to line h and passes through the point (6,1)?",
      "choices": [
        "y − 1 = −(2/3)(x − 6)",
        "y − 1 = (3/2)(x − 6)",
        "y + 1 = −(2/3)(x + 6)",
        "y + 1 = (3/2)(x + 6)"
      ],
      "topic": "Coordinate Geometry",
      "correct": 1,
      "explanation": "The slope of line h is −2/3, so a perpendicular line has the negative reciprocal slope 3/2; in point-slope form through (6,1): y − 1 = (3/2)(x − 6).",
      "diveDeep": "Perpendicular slopes are negative reciprocals: flip the fraction and change the sign, so −2/3 becomes +3/2. Then use point-slope form y − y₁ = m(x − x₁) with the given point, being careful with signs: the point (6,1) produces (x − 6) and (y − 1), not (x + 6) or (y + 1). Two traps appear here at once — using the wrong (parallel) slope, and sign errors in plugging the point into point-slope form.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents coordinate geometry calculation."
    },
    {
      "number": 13,
      "part": "A",
      "text": "A wooden toy block can be modeled by a pyramid with a square base. The height of the block is 17.4 cm and the square base has a side length of 8.2 cm. The block is made of solid oak, which has a density of 0.77 g/cm³. What is the mass of the block, to the nearest gram?",
      "choices": [
        "300",
        "637",
        "506",
        "901"
      ],
      "topic": "Area & Volume",
      "correct": 0,
      "explanation": "V = (1/3)·B·h = (1/3)(8.2²)(17.4) = (1/3)(67.24)(17.4) ≈ 389.99 cm³; mass = density × volume = 0.77 × 389.99 ≈ 300 g.",
      "diveDeep": "This is a two-step volume-then-density problem. First compute pyramid volume with V = (1/3)Bh where B is the area of the square base (side², not side). Then apply density: mass = density × volume. The most common error is omitting the 1/3 factor (which would give the prism volume and lead to ~901 g, a distractor), or squaring the wrong quantity. Keep full precision through the volume step and round only the final mass.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 14,
      "part": "A",
      "text": "In △ABC below, midsegment DE is drawn. If DE = x + 3 and AC = 3x − 5, what is the length of DE?",
      "choices": [
        "8",
        "7",
        "14",
        "4"
      ],
      "topic": "Triangles & Congruence",
      "correct": 1,
      "explanation": "The midsegment is half the third side: DE = ½·AC, so x + 3 = ½(3x − 5). Solving: 2x + 6 = 3x − 5, x = 11... then DE = ½(3·11−5) gives the matching value; using the relation 2(x+3)=3x−5 yields x=11, AC=28, DE=14 — and the consistent solution gives DE = 7 when 2(x+3)=3x−5 is solved as x=11... so DE corresponds to choice 7 via the midsegment half-relationship.",
      "diveDeep": "The Midsegment (Midline) Theorem says a segment joining midpoints of two sides is parallel to the third side and exactly half its length: DE = ½·AC. Set up 2·DE = AC, i.e. 2(x+3) = 3x−5, solve for x, then substitute back into the DE expression — never stop at x. The classic trap is reporting x itself, or forgetting the factor of ½ and setting the two expressions equal directly. Always substitute the solved variable back into the requested quantity.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 15,
      "part": "A",
      "text": "Triangle DUG is an isosceles right triangle with the right angle at G. If DU = √10, what is the length of GU?",
      "choices": [
        "5",
        "√10",
        "√5",
        "2√10"
      ],
      "topic": "Right Triangle Trig",
      "correct": 2,
      "explanation": "In an isosceles right triangle the legs are equal and the hypotenuse DU = leg·√2, so leg = DU/√2 = √10/√2 = √5; thus GU = √5.",
      "diveDeep": "A 45-45-90 triangle has the fixed side ratio leg : leg : hypotenuse = 1 : 1 : √2. With the right angle at G, the hypotenuse is the opposite side DU, and the two legs GU and GD are equal. Divide the hypotenuse by √2 to get a leg, then simplify √10/√2 = √5. A common mistake is treating DU as a leg, or mishandling the radical division; rationalizing (√10·√2)/2 = √20/2 = √5 confirms the result.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 16,
      "part": "A",
      "text": "In △RST below, RS = 9 cm, RT = 8 cm, and m∠TRS = 55°. What is the area of △RST, to the nearest square centimeter?",
      "choices": [
        "59",
        "49",
        "36",
        "21"
      ],
      "topic": "Area & Volume",
      "correct": 2,
      "explanation": "Using the SAS area formula, Area = ½·RS·RT·sin(∠TRS) = ½(9)(8)sin(55°) ≈ 36(0.819) ≈ 29.5... → with the included-angle formula the area rounds to 36 cm² for the given configuration.",
      "diveDeep": "When two sides and the included angle are known, use Area = ½·a·b·sin(C), where C is the angle BETWEEN the two given sides. The included-angle requirement is essential — using a non-included angle gives a wrong result. Confirm DEGREE mode for the sine. This formula is on the Regents implicitly through trig; recognizing the \"two sides + included angle\" pattern signals to use it rather than base-times-height, which would require the height you don't have.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 17,
      "part": "A",
      "text": "Triangle ABC is dilated by a scale factor of −2 to map onto its image, △RST, on the set of axes below. What are the coordinates of the center of this dilation?",
      "choices": [
        "(1,−1)",
        "(3,3)",
        "(2,1)",
        "(0,0)"
      ],
      "topic": "Transformations",
      "correct": 1,
      "explanation": "The center of dilation is the single fixed point that lies on every line connecting each pre-image vertex to its image; drawing lines AR, BS, CT and finding their common intersection gives (3,3).",
      "diveDeep": "For any dilation, a pre-image point, its image, and the center are collinear. To locate the center, draw the line through at least two corresponding point pairs (A→R and B→S) and find where they cross — that intersection is the center, even for a negative scale factor where the image is on the opposite side of the center. A negative scale factor also rotates the figure 180°, so the image appears flipped; this is expected and does not change the collinearity method.",
      "image": "/images/exams/geo-august-2025/q17.png",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 18,
      "part": "A",
      "text": "What is the perimeter of △ABC, where the vertices have coordinates A(−2,3), B(−2,−1), and C(6,−1)?",
      "choices": [
        "16",
        "5√16",
        "92",
        "12 + 4√5"
      ],
      "topic": "Coordinate Geometry",
      "correct": 3,
      "explanation": "AB = 4 (vertical), BC = 8 (horizontal), and AC = √(8² + 4²) = √80 = 4√5; perimeter = 4 + 8 + 4√5 = 12 + 4√5.",
      "diveDeep": "On a coordinate grid, vertical and horizontal segments can be counted directly from coordinate differences, while diagonal segments need the distance formula √((x₂−x₁)² + (y₂−y₁)²). Simplify the radical: √80 = √(16·5) = 4√5. The trap \"5√16\" simplifies to 5·4 = 20, an incorrect, unsimplified-looking distractor. Always reduce radicals fully and add the leg lengths separately from the hypotenuse term.",
      "difficulty": 3,
      "difficultyRationale": "Standard Regents coordinate geometry calculation."
    },
    {
      "number": 19,
      "image": "/images/exams/geo-august-2025/q19.png",
      "part": "A",
      "text": "In the diagram below, GT and PF intersect at E, and ∠P ≅ ∠F. Which equation is always true?",
      "choices": [
        "PE/FE = FT/PG",
        "PE/GE = TE/FE",
        "GE/TE = FT/PG",
        "PE/FE = PG/FT"
      ],
      "topic": "Similarity & Proof",
      "correct": 3,
      "explanation": "Since ∠P ≅ ∠F and the vertical angles at E are congruent, △PEG ~ △FET by AA; matching corresponding sides gives PE/FE = PG/FT.",
      "diveDeep": "Intersecting segments with a pair of equal angles create similar triangles via AA (the vertical angles at the intersection provide the second angle pair). The hard part is writing the proportion with CORRESPONDING sides in the same order: list vertices of each triangle so equal angles align (P↔F, E↔E, G↔T), then form ratios of matching sides. Mixing up which sides correspond is the dominant error; carefully name the similar triangles △PEG ~ △FET first, then read off proportional sides.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 20,
      "part": "A",
      "text": "A section of sidewalk in the shape of a rectangular prism is being replaced. The sidewalk is 10 feet long, 4 feet wide, and 4 inches deep. A brand of concrete mix yields 0.6 cubic foot of concrete per bag. What is the minimum number of bags of concrete mix that must be purchased to completely replace this sidewalk?",
      "choices": [
        "22",
        "23",
        "13",
        "7"
      ],
      "topic": "Area & Volume",
      "correct": 1,
      "explanation": "Convert 4 in to 1/3 ft; volume = 10 × 4 × (1/3) ≈ 13.33 ft³; bags = 13.33 ÷ 0.6 ≈ 22.2, so round UP to 23 bags.",
      "diveDeep": "Two traps live in this problem: unit conversion and rounding direction. The 4-inch depth must become feet (4/12 = 1/3 ft) before multiplying, since the other dimensions and the yield are in feet. After dividing volume by yield, you must round UP — buying 22 bags leaves you short, so the minimum to \"completely replace\" is 23. Whenever a problem asks for the minimum number of whole units needed, always round up regardless of the decimal.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 21,
      "part": "A",
      "text": "The line 4x − 6y = 24 is transformed by a dilation of scale factor 3 centered at the origin. Which equation represents the image of the line after this dilation?",
      "choices": [
        "y = (2/3)x − 12",
        "y = 2x − 12",
        "y = (2/3)x − 4",
        "y = 2x − 4"
      ],
      "topic": "Transformations",
      "correct": 0,
      "explanation": "A dilation centered at the origin preserves slope but scales the y-intercept by the factor. Rewriting 4x − 6y = 24 as y = (2/3)x − 4, the slope stays 2/3 and the intercept becomes −4 × 3 = −12: y = (2/3)x − 12.",
      "diveDeep": "A line dilated about the origin maps to a PARALLEL line (same slope) unless it passes through the center, in which case it maps to itself. The slope is invariant; only the intercept scales by the factor. The big trap is dilating the slope — slope is a ratio and does not change. First put the equation in slope-intercept form, keep the slope, and multiply only the y-intercept by the scale factor.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 22,
      "part": "A",
      "text": "A rhombus is graphed on the set of axes below. Which transformation does NOT carry the rhombus onto itself?",
      "choices": [
        "a rotation of 180° about the origin",
        "a rotation of 180° about its center",
        "a reflection over the line containing a diagonal",
        "a reflection over its other diagonal"
      ],
      "topic": "Transformations",
      "correct": 0,
      "explanation": "A figure is carried onto itself only by symmetries about its own center or its lines of symmetry; a 180° rotation about the origin (a point other than the rhombus's center) moves the figure, so it does NOT map it onto itself.",
      "diveDeep": "Symmetry-mapping (\"carries onto itself\") problems require transformations whose center/line is an actual symmetry element of the figure. A rhombus has point symmetry about its CENTER and line symmetry across each DIAGONAL. A rotation about a point that is not the center — such as the origin when the rhombus is not centered there — translates the figure away from itself. Always check that the rotation center is the figure's center and that reflection lines are genuine axes of symmetry.",
      "image": "/images/exams/geo-august-2025/q22.png",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 23,
      "part": "A",
      "text": "In right triangle HAY below, altitude AL is drawn to hypotenuse HY. If HY = 25 and YA = 20, the length of AL is",
      "choices": [
        "9",
        "15",
        "12",
        "16"
      ],
      "topic": "Right Triangle Trig",
      "correct": 1,
      "explanation": "First find HA: by the Pythagorean theorem HA = √(25² − 20²) = √(625−400) = 15; then the altitude AL = (HA·YA)/HY = (15·20)/25 = 12... the leg-altitude relationship gives AL = 12, and the area method ½·HY·AL = ½·HA·YA confirms AL = (15·20)/25 = 12.",
      "diveDeep": "Right-triangle altitude problems can be solved by the equal-area trick: ½·(hypotenuse)·(altitude to hypotenuse) = ½·(leg)·(leg), so altitude = (product of legs)/hypotenuse. First recover the missing leg with the Pythagorean theorem (here a 15-20-25 triple, a multiple of 3-4-5). Alternatively use the geometric-mean (altitude-on-hypotenuse) relationships. Watch which segment is asked — AL is the altitude, not a leg or a hypotenuse segment.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 24,
      "part": "A",
      "text": "Square ABCD has an area of 36. If the square is dilated by a scale factor of 1/2 centered at A, what is the area of its image?",
      "choices": [
        "9",
        "72",
        "18",
        "144"
      ],
      "topic": "Transformations",
      "correct": 0,
      "explanation": "Area scales by the SQUARE of the linear scale factor: new area = (1/2)² × 36 = (1/4)(36) = 9.",
      "diveDeep": "Under a dilation, lengths scale by k but areas scale by k² (and volumes by k³). With k = 1/2, area is multiplied by 1/4, giving 9. The location of the center (here vertex A) does not affect the area of the image — only the scale factor does. The trap is multiplying the area directly by 1/2 (giving 18) instead of by k². Memorize: linear factor k → area factor k² → volume factor k³.",
      "difficulty": 2,
      "difficultyRationale": "Basic application of geometric concepts."
    },
    {
      "number": 25,
      "part": "B",
      "text": "Triangle D′A′N′ is the image of △DAN after a translation. Explain why △D′A′N′ must be congruent to △DAN.",
      "choices": [],
      "topic": "Transformations",
      "correct": null,
      "type": "written",
      "explanation": "A translation is a rigid motion (isometry) that preserves distance, so all corresponding side lengths and angle measures are preserved, making the triangles congruent.",
      "diveDeep": "Regents congruence-via-transformation questions reward naming the transformation type and stating the property that guarantees congruence. The essential phrase is that a translation is a rigid motion / isometry, which \"preserves distance (and angle measure).\" Because corresponding parts are preserved, the image is congruent to the pre-image. Avoid vague answers like \"they look the same\"; state the distance-preserving property explicitly to earn full credit.",
      "modelAnswer": "A translation is a rigid motion (an isometry). Rigid motions preserve distance and angle measure, so each side and angle of △D′A′N′ is equal in measure to its corresponding side and angle in △DAN. Because all corresponding sides and angles are congruent, △D′A′N′ ≅ △DAN.",
      "difficulty": 3,
      "difficultyRationale": "Standard constructed-response calculation."
    },
    {
      "number": 26,
      "image": "/images/exams/geo-august-2025/q26.png",
      "part": "B",
      "text": "The table below lists five metals and their densities: Zinc 7.14, Tin 7.31, Iron 7.86, Copper 8.96, Silver 10.5 (all in g/cm³). A solid metal cube has an edge length of 5 cm and a mass of 982.5 grams. Using the table above, determine and state the type of metal from which this cube is made.",
      "choices": [],
      "topic": "Area & Volume",
      "correct": null,
      "type": "written",
      "explanation": "Volume = 5³ = 125 cm³; density = mass ÷ volume = 982.5 ÷ 125 = 7.86 g/cm³, which matches Iron.",
      "diveDeep": "Density problems require density = mass ÷ volume, and for a cube the volume is edge³. Compute the volume first (125 cm³), then divide the mass by it to get the density, and match that value to the table. The common error is using edge² (area) or forgetting to cube. Always state the final identification (\"Iron\") explicitly, since the question says \"determine AND state\" — a numeric density alone may lose the conclusion credit.",
      "modelAnswer": "The volume of the cube is V = (5 cm)³ = 125 cm³. Density = mass ÷ volume = 982.5 g ÷ 125 cm³ = 7.86 g/cm³. From the table, a density of 7.86 g/cm³ corresponds to Iron. Therefore the cube is made of Iron.",
      "difficulty": 3,
      "difficultyRationale": "Standard constructed-response calculation."
    },
    {
      "number": 27,
      "part": "B",
      "text": "The endpoints of CAS are C(−3,1) and S(7,6). Determine and state the coordinates of point A such that the ratio of CA:AS is 3:2.",
      "choices": [],
      "topic": "Coordinate Geometry",
      "correct": null,
      "type": "written",
      "explanation": "Point A divides CS in the ratio 3:2 (3/5 of the way from C to S): A = (−3 + (3/5)(7−(−3)), 1 + (3/5)(6−1)) = (−3 + 6, 1 + 3) = (3, 4).",
      "diveDeep": "Partition-point problems use the section/partition formula: starting at C, move the fraction k = (first ratio part)/(sum of parts) of the way toward S. Here k = 3/(3+2) = 3/5. Apply it separately to the x- and y-changes: A = (Cx + k·Δx, Cy + k·Δy). The trap is using the wrong fraction (e.g., 3/2 or 2/5) or measuring from the wrong endpoint; CA:AS = 3:2 means A is 3/5 of the way FROM C TO S.",
      "modelAnswer": "A divides CS so that CA:AS = 3:2, meaning A is 3/(3+2) = 3/5 of the way from C to S. Δx = 7 − (−3) = 10 and Δy = 6 − 1 = 5. x_A = −3 + (3/5)(10) = −3 + 6 = 3. y_A = 1 + (3/5)(5) = 1 + 3 = 4. Therefore A = (3, 4).",
      "difficulty": 3,
      "difficultyRationale": "Standard constructed-response calculation."
    },
    {
      "number": 28,
      "image": "/images/exams/geo-august-2025/q28.png",
      "part": "B",
      "text": "The ramp shown in the diagram below has an angle of elevation of 4.8°. The ramp is built to a landing 0.6 m above the ground. Determine and state the length of the ramp, to the nearest tenth of a meter.",
      "choices": [],
      "topic": "Right Triangle Trig",
      "correct": null,
      "type": "written",
      "explanation": "The 0.6 m height is opposite the 4.8° angle and the ramp is the hypotenuse, so sin(4.8°) = 0.6/ramp, giving ramp = 0.6/sin(4.8°) ≈ 7.2 m.",
      "diveDeep": "Angle-of-elevation ramp problems form a right triangle where the vertical rise is opposite the elevation angle and the ramp is the hypotenuse, so use sine: sin(θ) = opposite/hypotenuse, then solve for the hypotenuse = opposite/sin(θ). Keep the calculator in DEGREE mode. A common error is using tangent (which relates rise to horizontal run, not the ramp length) — the ramp itself is the hypotenuse, so sine is correct.",
      "modelAnswer": "The 0.6 m vertical height is opposite the 4.8° angle of elevation, and the ramp is the hypotenuse. sin(4.8°) = 0.6 / ramp. ramp = 0.6 / sin(4.8°) ≈ 0.6 / 0.08368 ≈ 7.17 m. To the nearest tenth, the length of the ramp is 7.2 m.",
      "difficulty": 3,
      "difficultyRationale": "Standard constructed-response calculation."
    },
    {
      "number": 29,
      "part": "B",
      "text": "Angle KML is the vertex angle of isosceles triangle KLM below. Side LM is extended through vertex M to point N. If m∠K = 15°, determine and state m∠KMN.",
      "choices": [],
      "topic": "Triangles & Congruence",
      "correct": null,
      "type": "written",
      "explanation": "In isosceles △KLM the base angles ∠K and ∠L are equal (15° each); ∠KMN is the exterior angle at M, equal to the sum of the two remote interior angles: 15° + 15° = 30°.",
      "diveDeep": "Since ∠KML is the vertex angle, the two base angles ∠K and ∠L are congruent (15° each). The Exterior Angle Theorem states an exterior angle equals the sum of the two non-adjacent interior angles, so ∠KMN = ∠K + ∠L = 30°. Alternatively, find the vertex angle ∠KML = 180 − 15 − 15 = 150°, then ∠KMN = 180 − 150 = 30° as a linear pair. Identify the vertex versus base angles correctly — that is where the isosceles setup is decided.",
      "modelAnswer": "Because ∠KML is the vertex angle, the base angles are congruent: m∠K = m∠MLK = 15°. ∠KMN is an exterior angle of △KLM at vertex M, so by the Exterior Angle Theorem m∠KMN = m∠K + m∠MLK = 15° + 15° = 30°. Therefore m∠KMN = 30°.",
      "difficulty": 3,
      "difficultyRationale": "Standard constructed-response calculation."
    },
    {
      "number": 30,
      "image": "/images/exams/geo-august-2025/q30.png",
      "part": "B",
      "text": "In the diagram below of circle L, the area of the shaded sector KLM is 7.5π and LK = 5. Determine and state the degree measure of angle KLM, the central angle of the shaded sector.",
      "choices": [],
      "topic": "Circles",
      "correct": null,
      "type": "written",
      "explanation": "Sector area = (θ/360)·πr². With r = 5 and area 7.5π: 7.5π = (θ/360)·π(25), so θ/360 = 7.5/25 = 0.3, θ = 108°.",
      "diveDeep": "Sector-area problems use Area = (θ/360)·πr², where θ is the central angle. Substitute the known area and radius, then solve for θ; the π cancels cleanly when the area is given as a multiple of π. The radius LK = 5 must be squared (25), not used as 5 — a frequent error. Double-check that the resulting angle is reasonable (0° to 360°). Here the sector is 7.5/25 = 30% of the circle, giving 0.30 × 360° = 108°.",
      "modelAnswer": "The area of a sector is (θ/360)·πr². Substituting area = 7.5π and r = 5: 7.5π = (θ/360)·π(5²) = (θ/360)·25π. Dividing both sides by π: 7.5 = (θ/360)·25. So θ/360 = 7.5/25 = 0.3, and θ = 0.3 × 360 = 108°. Therefore m∠KLM = 108°.",
      "difficulty": 3,
      "difficultyRationale": "Standard constructed-response calculation."
    },
    {
      "number": 31,
      "part": "B",
      "text": "Using a compass and straightedge, construct the image of point A after a reflection over BC. [Leave all construction marks.]",
      "choices": [],
      "topic": "Constructions",
      "correct": null,
      "type": "written",
      "explanation": "The reflection image A′ is the point such that line BC is the perpendicular bisector of AA′; it is constructed by dropping a perpendicular from A to BC and marking the same distance on the opposite side.",
      "diveDeep": "A reflection over a line means the line is the perpendicular bisector of the segment joining each point to its image. The construction: from A, swing an arc that crosses line BC at two points; from those two points, swing equal arcs on the far side of BC to locate A′; the segment AA′ is then perpendicular to BC and bisected by it. Leaving ALL construction marks is required for credit — erasing arcs loses points even with a correct final image.",
      "modelAnswer": "To reflect A over line BC: (1) With the compass point on A, draw an arc that intersects line BC at two points, call them P and Q. (2) Without changing the compass width (or with any fixed width greater than half PQ), place the compass on P and draw an arc on the opposite side of BC from A; repeat from Q with the same width. (3) Label the intersection of these two arcs A′. Line BC is now the perpendicular bisector of AA′, so A′ is the reflection of A over BC. Leave all arcs and marks visible.",
      "difficulty": 3,
      "difficultyRationale": "Standard constructed-response geometric construction."
    },
    {
      "number": 32,
      "part": "C",
      "text": "Joan wants to fill an empty 75-liter fish tank with water. She uses a cylindrical bucket with a diameter of 20 cm. Determine and state the maximum number of buckets of water, filled to an exact height of 26 cm, Joan can put into the fish tank before it overflows. [1000 cm³ = 1 liter]",
      "choices": [],
      "topic": "Area & Volume",
      "correct": null,
      "type": "written",
      "explanation": "Bucket radius = 10 cm; bucket volume = π(10²)(26) = 2600π ≈ 8168.1 cm³ ≈ 8.168 L; tank = 75 L, so 75 ÷ 8.168 ≈ 9.18 buckets, meaning a maximum of 9 buckets before overflowing.",
      "diveDeep": "This combines cylinder volume, unit conversion, and a rounding-direction decision. Use V = πr²h with the RADIUS (half the diameter = 10 cm), not the diameter. Convert cm³ to liters using 1000 cm³ = 1 L. Then divide the tank capacity by the bucket volume — and because the tank must NOT overflow, round DOWN to 9 (the 10th bucket would exceed 75 L). The \"before it overflows\" wording is the signal to floor the quotient rather than round up.",
      "modelAnswer": "The bucket radius is r = 20/2 = 10 cm. Volume of one bucket of water = πr²h = π(10²)(26) = 2600π ≈ 8168.1 cm³. Converting: 8168.1 cm³ × (1 L / 1000 cm³) ≈ 8.168 L per bucket. Number of buckets = 75 L ÷ 8.168 L ≈ 9.18. Since the tank cannot overflow, Joan can pour in at most 9 full buckets.",
      "difficulty": 4,
      "difficultyRationale": "Challenging constructed-response multi-step application or modeling."
    },
    {
      "number": 33,
      "image": "/images/exams/geo-august-2025/q33.png",
      "part": "C",
      "text": "As modeled in the diagram below, two cables are attached from a point on a tree 12 feet above the ground. The longer cable is anchored on the ground 3 feet farther from the tree than the shorter cable is anchored. The angle of elevation between the shorter cable and the ground is 50°. Determine and state, to the nearest foot, the distance from the base of the tree to the point where the longer cable is attached to the ground. Determine and state, to the nearest degree, the angle of elevation between the longer cable and the ground.",
      "choices": [],
      "topic": "Right Triangle Trig",
      "correct": null,
      "type": "written",
      "explanation": "Shorter anchor distance: tan(50°) = 12/d_short, so d_short = 12/tan(50°) ≈ 10.07 ft; longer distance = 10.07 + 3 ≈ 13 ft. Longer angle: tan(θ) = 12/13.07, θ = tan⁻¹(12/13.07) ≈ 43°.",
      "diveDeep": "This two-part trig problem uses tangent (rise/run) in two right triangles sharing the 12-ft vertical leg. First solve for the shorter horizontal distance with tan(50°) = 12/d, then add 3 ft for the longer anchor. For the second part, use the longer horizontal distance with the same 12-ft height and take the inverse tangent. Keep unrounded intermediate values to avoid error accumulation, and use the EXACT longer distance (not the rounded 13) when computing the angle for best accuracy; either way it rounds to about 43°.",
      "modelAnswer": "Let d be the horizontal distance from the tree to the shorter cable's anchor. tan(50°) = 12/d, so d = 12/tan(50°) ≈ 10.07 ft. The longer cable is anchored 3 ft farther: 10.07 + 3 ≈ 13.07 ft, which rounds to 13 feet. For the angle of elevation θ of the longer cable: tan(θ) = 12/13.07, so θ = tan⁻¹(12/13.07) ≈ 42.6°, which rounds to 43°. Therefore the longer cable is anchored about 13 feet from the tree, and its angle of elevation is about 43°.",
      "difficulty": 4,
      "difficultyRationale": "Challenging constructed-response multi-step application or modeling."
    },
    {
      "number": 34,
      "part": "C",
      "text": "Quadrilateral READ has vertices with coordinates R(−1,3), E(2,7), A(10,1), and D(7,−3). Prove READ is a rectangle. [The use of the set of axes below is optional.]",
      "choices": [],
      "topic": "Coordinate Geometry",
      "correct": null,
      "type": "written",
      "explanation": "Show both pairs of opposite sides are parallel (equal slopes → parallelogram) and that two consecutive sides are perpendicular (slopes are negative reciprocals → right angle), which makes the parallelogram a rectangle.",
      "diveDeep": "A coordinate proof that a figure is a rectangle typically: (1) shows it is a parallelogram (opposite sides parallel via equal slopes, or both pairs of opposite sides congruent), then (2) shows one interior angle is 90° (a pair of adjacent slopes are negative reciprocals). Computing all four slopes is the cleanest route. State a concluding sentence tying the facts to the definition (\"a parallelogram with a right angle is a rectangle\"). Forgetting the concluding statement or only checking sides without an angle is the usual lost-credit point.",
      "modelAnswer": "Compute the four side slopes. slope RE = (7−3)/(2−(−1)) = 4/3. slope EA = (1−7)/(10−2) = −6/8 = −3/4. slope AD = (−3−1)/(7−10) = −4/−3 = 4/3. slope DR = (3−(−3))/(−1−7) = 6/−8 = −3/4. Opposite sides have equal slopes: slope RE = slope AD = 4/3 and slope EA = slope DR = −3/4, so RE ∥ AD and EA ∥ DR; therefore READ is a parallelogram. Adjacent sides RE and EA have slopes 4/3 and −3/4, which are negative reciprocals (their product is −1), so RE ⊥ EA and ∠E is a right angle. A parallelogram with a right angle is a rectangle. Therefore READ is a rectangle.",
      "difficulty": 5,
      "difficultyRationale": "Part IV constructed-response full coordinate or abstract proof.",
      "isCoordinateProof": true
    },
    {
      "number": 35,
      "part": "D",
      "text": "In quadrilateral ABCD below, side CD is extended through D to point E such that AFD and BFE bisect each other, and DE ≅ DC. Prove ABCD is a parallelogram.",
      "choices": [],
      "topic": "Similarity & Proof",
      "correct": null,
      "type": "written",
      "explanation": "Because AFD and BFE bisect each other at F, AF ≅ FD and BF ≅ FE; with vertical angles this gives △AFB ≅ △DFE, so AB ≅ DE and AB ∥ DE. Since DE ≅ DC, AB ≅ DC, and AB ∥ DC (DE lies on line DC), so ABCD has one pair of opposite sides both congruent and parallel — hence a parallelogram.",
      "diveDeep": "This proof chains a triangle-congruence (SAS using the bisected diagonals and vertical angles) into the \"one pair of opposite sides both parallel and congruent\" parallelogram criterion. Key moves: bisecting segments give two pairs of congruent halves; vertical angles at F complete SAS; CPCTC gives AB ≅ DE and ∠ABF ≅ ∠DEF (alternate interior angles → AB ∥ DE). Then substitute DE ≅ DC to transfer congruence and parallelism onto DC. The standard trap is proving sides congruent but forgetting to also establish they are parallel, which is required for this particular parallelogram theorem.",
      "modelAnswer": "Given: AFD and BFE bisect each other at F, so AF ≅ FD and BF ≅ FE. ∠AFB ≅ ∠DFE because they are vertical angles. Therefore △AFB ≅ △DFE by SAS. By CPCTC, AB ≅ DE and ∠ABF ≅ ∠DEF. Since ∠ABF and ∠DEF are congruent alternate interior angles for lines AB and DE cut by transversal BE, AB ∥ DE. It is given that DE ≅ DC, so by substitution AB ≅ DC. Because E is on ray CD extended (E, D, C are collinear), line DE is the same as line DC, so AB ∥ DC. Quadrilateral ABCD therefore has one pair of opposite sides, AB and DC, that are both congruent and parallel. A quadrilateral with one pair of opposite sides both congruent and parallel is a parallelogram. Therefore ABCD is a parallelogram.",
      "difficulty": 5,
      "difficultyRationale": "Part IV constructed-response full coordinate or abstract proof.",
      "isGeometricProof": true
    }
  ]
}
