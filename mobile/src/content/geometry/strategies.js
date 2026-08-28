export const STRATEGIES = {
  'geometry-lat': { // Lines, Angles & Transformations (covers the Congruence split)
    mentalPrep: [
      'Know all four isometries by name: translation (slide), reflection (flip), rotation (turn), glide reflection.',
      'For congruence proofs, identify the shortcut first (SSS, SAS, ASA, AAS, HL) before writing the proof.',
      'CPCTC ("Corresponding Parts of Congruent Triangles are Congruent") is always a reason used AFTER proving triangles congruent.'
    ],
    answeringTechniques: [
      'For coordinate transformations: Translation (x+a, y+b), Reflection over x-axis (x, −y), Reflection over y-axis (−x, y), Rotation 90° CCW (−y, x), Rotation 180° (−x, −y).',
      'To verify congruence from coordinates, calculate all side lengths using the distance formula.'
    ],
    guessingStrategy: [
      'SSA is NOT a congruence shortcut — eliminate any answer claiming SSA proves triangles congruent.',
      'Dilations are NOT isometries — they change size, so they do not preserve congruence.'
    ],
    processOfElimination: [
      'For transformation questions, test one vertex and see which choice produces the right image.',
      'Eliminate any shortcut that requires more information than what is labeled in the diagram.'
    ],
    timeManagement: [
      'Transformation coordinate rules are direct substitutions — no calculation needed once you memorize the rules.',
      'For proof questions, identify the given information and what you need to prove before writing the first step.'
    ]
  },

  'geometry-tc': { // Triangle Congruence & Constructions (covers the Congruence split)
    mentalPrep: [
      'Know the five congruence shortcuts cold: SSS, SAS, ASA, AAS, HL — and that SSA and AAA do NOT prove congruence.',
      'A compass-and-straightedge construction must use ONLY the construction tools shown — no measuring with a ruler or protractor.',
      'CPCTC always comes AFTER triangles are proven congruent, never before.'
    ],
    answeringTechniques: [
      'To identify a valid shortcut, mark which sides/angles the givens provide, then check if they match SSS/SAS/ASA/AAS/HL exactly.',
      'For construction questions, work through the steps in order: the arcs/circles drawn always show the exact intended construction.'
    ],
    guessingStrategy: [
      'If the givens include a right angle plus one leg and the hypotenuse, think HL.',
      'If a construction shows two arcs of the same radius intersecting, it\'s very likely a perpendicular bisector or an angle bisector.'
    ],
    processOfElimination: [
      'Eliminate any shortcut claiming SSA or AAA proves congruence — neither ever does.',
      'Eliminate construction answers where the compass width visibly changes between corresponding arcs.'
    ],
    timeManagement: [
      'Shortcut-identification questions are fast once the givens are marked — do that first, every time.',
      'Construction questions reward re-tracing the arcs shown rather than guessing from the final figure alone.'
    ]
  },

  'geometry-sim': { // Similarity (split out of Similarity & Proof)
    mentalPrep: [
      'Two triangles are similar if angles are equal; sides are in proportion.',
      'Scale factor: if sides are in ratio k:1, areas are in ratio k²:1, volumes are in ratio k³:1.',
      'AA is the fastest similarity proof: two pairs of congruent angles is enough — the third pair is automatic.'
    ],
    answeringTechniques: [
      'Dilation questions: a scale factor of k stretches/shrinks every length by k, but angle measures never change.',
      'For shadow/pole problems, set up a proportion: object height / shadow length = known object height / known shadow length.'
    ],
    guessingStrategy: [
      'For AA Similarity, you only need two pairs of congruent angles — the third is automatic.',
      'Similar figures have proportional perimeters but their areas scale as the square of the ratio.'
    ],
    processOfElimination: [
      'Eliminate answers where the ratio of sides is not consistent across all corresponding pairs.',
      'For scale factor problems, check that the ratio makes sense (the larger triangle should have larger sides).'
    ],
    timeManagement: [
      'Proportion equations are algebraic — cross-multiply quickly to solve.',
      'Dilation-effect questions (on length, angle, area) are one-fact recall — answer immediately.'
    ]
  },

  'geometry-tri': { // Triangle Relationships (split out of Similarity & Proof)
    mentalPrep: [
      'The Midsegment of a triangle is always half the parallel base — a frequently tested theorem.',
      'Triangle Proportionality Theorem: a line parallel to one side of a triangle divides the other two sides proportionally.',
      'Altitude to hypotenuse: the altitude is the geometric mean of the two hypotenuse segments it creates.'
    ],
    answeringTechniques: [
      'If a segment inside a triangle is drawn parallel to one side, set up a proportion between the two sides it cuts.',
      'Altitude-to-hypotenuse geometric mean: altitude² = (segment 1)(segment 2); leg² = (adjacent segment)(whole hypotenuse).'
    ],
    guessingStrategy: [
      'A segment described as "parallel to one side" of a triangle almost always signals the Triangle Proportionality Theorem.',
      'An altitude drawn specifically "to the hypotenuse" of a right triangle almost always signals the geometric mean relationship.'
    ],
    processOfElimination: [
      'Eliminate proportions that pair non-corresponding segments — match each side of the smaller triangle to its counterpart.',
      'For altitude/geometric-mean questions, eliminate answers that use the wrong pair of segments in the product.'
    ],
    timeManagement: [
      'Midsegment questions are a single halving calculation — answer immediately.',
      'Geometric-mean setups take a moment to identify the right segment pair; write the relationship before solving.'
    ]
  },

  'geometry-eqcirc': { // Equations of Circles (split out of Circles)
    mentalPrep: [
      'Standard form: (x−h)² + (y−k)² = r² — center is (h,k), radius is √(right side).',
      'To find the center/radius from an expanded equation (x²+y²+Dx+Ey+F=0), complete the square on x and y separately.',
      'A tangent line to a circle is perpendicular to the radius at the point of tangency.'
    ],
    answeringTechniques: [
      'Given center and radius, plug directly into (x−h)² + (y−k)² = r² — no algebra needed.',
      'Given an expanded equation, group x-terms and y-terms, complete the square on each, then read off (h,k) and r.'
    ],
    guessingStrategy: [
      'If the equation is already in (x−h)² + (y−k)² = r² form, the center is the OPPOSITE sign of what appears inside each parenthesis.',
      'A "radius" answer choice must always be the square root of the right-hand side, never the right-hand side itself.'
    ],
    processOfElimination: [
      'Eliminate circle equations where the center does not match (h,k) from the given center.',
      'Eliminate any radius answer that is not itself a square root of the constant term.'
    ],
    timeManagement: [
      'Center/radius-from-standard-form questions are direct reads — answer immediately.',
      'Complete-the-square questions take a moment; write out the grouped x and y terms before completing each square.'
    ]
  },

  'geometry-arcs': { // Arcs & Angles (split out of Circles)
    mentalPrep: [
      'Inscribed Angle = (1/2) × Intercepted Arc — this is the single most tested circle theorem.',
      'Central Angle = its Intercepted Arc (they are numerically equal, unlike an inscribed angle).',
      'An inscribed angle in a semicircle is always 90° — the diameter creates a 180° arc.'
    ],
    answeringTechniques: [
      'Arc Length = (central angle/360°) × 2πr. Sector Area = (central angle/360°) × πr².',
      'Angle formed by two secants/tangent-secant from an external point = (1/2)(difference of the two intercepted arcs).',
      'Angle formed by two chords intersecting inside the circle = (1/2)(sum of the two intercepted arcs).'
    ],
    guessingStrategy: [
      'An inscribed angle in a semicircle is always 90° — no calculation needed if you spot the diameter.',
      'Two secants/tangents from the SAME external point always use the DIFFERENCE of arcs, never the sum.'
    ],
    processOfElimination: [
      'Eliminate answers that use the sum of arcs for an external-point angle — that formula is for angles formed INSIDE the circle.',
      'For arc length/sector answers, eliminate anything not involving π unless the question asks for a decimal approximation.'
    ],
    timeManagement: [
      'Inscribed/central angle questions are solved in one or two steps — prioritize them.',
      'External-point angle questions (two secants, tangent+secant) take a moment to identify which two arcs to subtract.'
    ]
  },

  'geometry-segs': { // Circle Segments & Lines (split out of Circles)
    mentalPrep: [
      'Intersecting chords: AP · PB = CP · PD — the products of the two pieces of each chord are equal.',
      'Two secants from the same external point: (whole secant 1)(external piece 1) = (whole secant 2)(external piece 2).',
      'Tangent-secant from an external point: (tangent)² = (whole secant)(external piece).'
    ],
    answeringTechniques: [
      'For tangent problems from an external point, both tangent segments from that point are always equal.',
      'Identify whether the setup is chord-chord, secant-secant, or tangent-secant BEFORE picking a formula — each uses a different product relationship.'
    ],
    guessingStrategy: [
      'If both segments touch the circle at exactly one point each, it is tangent-secant — square the tangent.',
      'If both lines cross entirely through the circle, it is secant-secant — use whole times external for each.'
    ],
    processOfElimination: [
      'Eliminate any answer applying the chord-chord product rule to a secant drawn from OUTSIDE the circle — that\'s the wrong formula.',
      'Eliminate tangent-length answers that aren\'t the square root of (whole secant × external piece).'
    ],
    timeManagement: [
      'Chord intersection products (AP · PB = CP · PD) are simple multiplications — set up and solve in under a minute.',
      'Secant/tangent problems take longer to set up correctly; identify the whole and external pieces before substituting.'
    ]
  },

  'geometry-slope': { // Lines & Slope (split out of Coordinate Geometry)
    mentalPrep: [
      'Parallel lines have equal slopes; perpendicular lines have slopes that multiply to −1 (negative reciprocals).',
      'A perpendicular bisector passes through the midpoint of a segment at a slope perpendicular to it.',
      'To classify a quadrilateral by slope, compute all four side slopes — two pairs of parallel sides means at least a parallelogram.'
    ],
    answeringTechniques: [
      'To write a line perpendicular through a point: find the negative reciprocal of the given slope, then use point-slope form.',
      'To write the equation of a perpendicular bisector: find the segment\'s midpoint, find the perpendicular slope, then write y = mx + b.'
    ],
    guessingStrategy: [
      'If two slopes multiply to exactly −1, the lines are perpendicular — no other check needed.',
      'For "what type of quadrilateral" questions, start by checking if both pairs of opposite sides are parallel.'
    ],
    processOfElimination: [
      'Eliminate "perpendicular" answers where the slopes do not multiply to −1.',
      'Eliminate "parallel" answers where the slopes are not exactly equal.'
    ],
    timeManagement: [
      'Slope-from-two-points and parallel/perpendicular slope questions are one-formula calculations — answer immediately.',
      'Perpendicular-bisector questions stack two steps (midpoint, then perpendicular slope) — write both before forming the equation.'
    ]
  },

  'geometry-coordproof': { // Coordinate Proofs (split out of Coordinate Geometry)
    mentalPrep: [
      'Memorize: Distance Formula = √((Δx)² + (Δy)²), Midpoint = (average x, average y).',
      'Coordinate proofs combine distance (for lengths/congruence), slope (for parallel/perpendicular), and midpoint (for bisection) — decide which tool the "Prove" statement needs.',
      'A directed segment partition point divides AB in a given ratio using the section formula — not just the midpoint.'
    ],
    answeringTechniques: [
      'Centroid = average of all three vertices: ((x₁+x₂+x₃)/3, (y₁+y₂+y₃)/3).',
      'To prove a triangle is isosceles/equilateral, compute all relevant side lengths with the distance formula and compare.',
      'To find a point that divides a segment in ratio a:b, use P = (x₁ + a/(a+b)·(x₂−x₁), y₁ + a/(a+b)·(y₂−y₁)).'
    ],
    guessingStrategy: [
      'A "prove congruent/isosceles" prompt almost always wants the distance formula on multiple sides, then a comparison.',
      'A "prove parallelogram" prompt usually wants either slope (opposite sides parallel) or midpoint (diagonals bisect each other).'
    ],
    processOfElimination: [
      'For midpoint questions, check that the answer lies between the two given points — never outside them.',
      'For partition-ratio questions, eliminate any point that would land outside the segment or match the wrong ratio direction.'
    ],
    timeManagement: [
      'Distance and midpoint formulas are direct calculations — write them down and plug in immediately.',
      'Full coordinate proofs (prove a shape\'s classification) take longer; decide the single fastest sufficient test before computing everything.'
    ]
  },

  'geometry-crosssec': { // Cross-Sections & Solids of Revolution (split out of 3D Geometry & Volume)
    mentalPrep: [
      'Rotating a 2-D shape around an axis (a line) sweeps out a 3-D solid of revolution: a rectangle → cylinder, a triangle → cone, a semicircle → sphere.',
      'A cross-section is the 2-D shape you\'d see if you sliced through a 3-D solid — the slice shape depends on the angle and location of the cut.',
      'Rotating a right triangle about one leg produces a cone whose radius and height come from that triangle\'s two legs.'
    ],
    answeringTechniques: [
      'To find the solid of revolution, identify the axis of rotation first — it becomes the solid\'s central axis (height for a cone/cylinder).',
      'For cross-section questions, picture (or sketch) the cutting plane relative to the solid\'s symmetry before naming the resulting shape.'
    ],
    guessingStrategy: [
      'A rectangle rotated about one of its sides always produces a cylinder — that side becomes the height.',
      'A triangle rotated about an altitude or a leg always produces a cone.'
    ],
    processOfElimination: [
      'Eliminate answers that name a solid whose curvature doesn\'t match the rotated shape\'s straight/curved edges.',
      'Eliminate cross-section answers that ignore the stated angle or location of the cut.'
    ],
    timeManagement: [
      'Solid-of-revolution identification is fast recall (rectangle→cylinder, triangle→cone, semicircle→sphere) — answer immediately.',
      'Cross-section questions benefit from a quick sketch; don\'t try to visualize a complex cut purely in your head.'
    ]
  },

  'geometry-vol': { // Volume & Surface Area (split out of 3D Geometry & Volume)
    mentalPrep: [
      'Volume formulas to know: cylinder πr²h, cone (1/3)πr²h, sphere (4/3)πr³, prism (base area × height).',
      'Surface area of a cube is 6s²; lateral surface area of a cylinder is 2πrh.',
      'Scale factor k → surface area scales k², volume scales k³.'
    ],
    answeringTechniques: [
      'For composite solids, decompose into simpler shapes and add or subtract volumes.',
      'Similar solids: identify the linear scale factor first, then cube it for the volume ratio.'
    ],
    guessingStrategy: [
      'A cone is always 1/3 of the cylinder with the same dimensions — a common comparison question.',
      'Sphere volume (4/3)πr³ — the "4/3" is easy to forget; double-check your formula.'
    ],
    processOfElimination: [
      'For volume answers, eliminate any without π unless the problem says to use π ≈ 3.14 and round.',
      'Eliminate answers where the volume of a cone is greater than or equal to its matching cylinder.'
    ],
    timeManagement: [
      'Volume calculations follow a direct formula — write the formula, substitute, and simplify.',
      'If the problem involves similar solids, cube the ratio first, then multiply — no need to find the individual volumes.'
    ]
  },

  'geometry-density': { // Density & Modeling (split out of 3D Geometry & Volume)
    mentalPrep: [
      'Density = mass ÷ volume — a real-world modeling question almost always wants you to compute volume first, then apply a rate (density, cost, capacity) to it.',
      'Modeling a real object as a solid (a building as a cylinder, a tank as a prism) means the object\'s dimensions ARE the solid\'s dimensions — extract them from the word problem carefully.',
      'Watch for unit conversions (feet vs. inches, gallons vs. cubic feet) — real-world modeling problems frequently hide a conversion step.'
    ],
    answeringTechniques: [
      'Multi-part modeling problems: compute the geometric volume first, then apply whatever real-world rate (density, price per unit, fill percentage) the problem gives.',
      'For "how many of X fit in Y" problems, divide the container\'s volume by the individual item\'s volume, then round down to a whole number if the context requires it.'
    ],
    guessingStrategy: [
      'If the answer choices include units like "pounds," "dollars," or "gallons" rather than pure length/volume, you\'re missing a rate-application step.',
      'A "how many trips/units/containers" question almost always rounds to a whole number in the direction that makes physical sense (round up if you need enough, round down if you\'re counting complete units).'
    ],
    processOfElimination: [
      'Eliminate answers that skip the geometric volume step and jump straight to the real-world quantity.',
      'Eliminate answers with the wrong units for what\'s being asked (e.g. a volume unit when the question asks for a rate).'
    ],
    timeManagement: [
      'These problems have more reading than math — extract the shape and its dimensions first, then compute.',
      'Multi-step modeling problems reward writing down each intermediate quantity (volume, then rate-applied result) rather than trying to chain it all mentally.'
    ]
  },

  'geometry-rttrig': { // Right Triangle Trig (split out of Trigonometry)
    mentalPrep: [
      'SOH-CAH-TOA: Sin = Opposite/Hypotenuse, Cos = Adjacent/Hypotenuse, Tan = Opposite/Adjacent.',
      'Angle of elevation is measured UP from horizontal; angle of depression is measured DOWN from horizontal — they\'re equal for a line of sight between two points.',
      'sin(x°) = cos(90°−x°) — complementary angles in a right triangle always satisfy this co-function identity.'
    ],
    answeringTechniques: [
      'For angle of elevation/depression problems, draw a right triangle and label opposite/adjacent sides before applying trig.',
      'Inverse trig functions (sin⁻¹, cos⁻¹, tan⁻¹) find angle measures from side ratios.',
      'For sin(A) = cos(B) equations in a right triangle, set A + B = 90° and solve.'
    ],
    guessingStrategy: [
      'A real-world word problem mentioning a ladder, ramp, shadow, or line of sight to an object is almost always angle of elevation/depression.',
      'If two angle expressions are set equal via sin/cos, they are complementary — their sum is 90°.'
    ],
    processOfElimination: [
      'Eliminate answers that mix up opposite and adjacent — check your triangle orientation relative to the reference angle.',
      'Eliminate co-function equations that don\'t sum to 90°.'
    ],
    timeManagement: [
      'SOH-CAH-TOA questions are one-formula calculations — set up the ratio immediately.',
      'Word problems take longer to set up than to solve; sketch and label the triangle before reaching for a formula.'
    ]
  },

  'geometry-special': { // Pythagorean & Special Triangles (split out of Trigonometry)
    mentalPrep: [
      'Special triangles: 45-45-90 (sides x, x, x√2) and 30-60-90 (sides x, x√3, 2x) — memorize both ratios cold.',
      'Altitude to the hypotenuse of a right triangle creates two smaller triangles similar to the original AND to each other — the geometric mean relationships follow from that similarity.',
      'The Pythagorean theorem (a² + b² = c²) applies to every right triangle, special or not.'
    ],
    answeringTechniques: [
      'In a 45-45-90 triangle, the legs are equal and the hypotenuse is leg × √2 — recognize this instantly from an isosceles right triangle.',
      'In a 30-60-90 triangle, the shortest side (opposite 30°) is half the hypotenuse; the longer leg is (shortest side) × √3.',
      'Altitude-to-hypotenuse geometric mean: altitude² = (segment 1)(segment 2); each leg² = (its adjacent hypotenuse segment)(whole hypotenuse).'
    ],
    guessingStrategy: [
      'An isosceles right triangle is always 45-45-90 — apply the x, x, x√2 ratio directly.',
      'For 30-60-90 triangles, the side opposite 30° is always the shortest — eliminate choices where it is not.'
    ],
    processOfElimination: [
      'Eliminate 45-45-90 answers where the hypotenuse isn\'t exactly leg × √2.',
      'Eliminate 30-60-90 answers where the longer leg isn\'t exactly (shortest side) × √3.'
    ],
    timeManagement: [
      'Special-triangle ratio questions are one-formula recalls — answer immediately once you spot the triangle type.',
      'Geometric-mean setups take a moment to identify the right segment pair; write the relationship before solving.'
    ]
  },

  'geometry-pr': { // Proofs & Reasoning (two-column / coordinate proofs + justify)
    mentalPrep: [
      'A proof is a chain: every statement needs a reason. Start from the Given, end exactly at the Prove — no gaps.',
      'Before writing, mark the diagram: tick congruent sides, arc congruent angles, note shared (reflexive) parts.',
      'Know your triangle shortcuts cold: SSS, SAS, ASA, AAS, HL prove congruence; SSA and AAA do NOT.',
    ],
    answeringTechniques: [
      'Decide the goal first: to prove segments/angles congruent, usually prove the triangles congruent, then CPCTC.',
      'Coordinate proofs: use distance (lengths), slope (parallel = equal, perpendicular = opposite reciprocal), midpoint — state the formula and what it shows.',
      'Constructed-response proofs earn partial credit for correct statements/reasons — write what you CAN justify even if you can\'t finish.',
    ],
    guessingStrategy: [
      'A shared side/angle between two triangles is almost always used with the Reflexive Property.',
      '"Justify/explain" multiple-choice: pick the reason that names the exact theorem or definition shown in the diagram.',
    ],
    processOfElimination: [
      'Eliminate reasons that cite a shortcut the givens do not support (e.g. claiming SAS when the angle is not included).',
      'Drop CPCTC if the triangles have not yet been proven congruent in the proof.',
    ],
    timeManagement: [
      'Proofs are the highest-value constructed-response items — leave time to set them up, and show the diagram markings.',
    ],
  },

  'geometry-u7': { // Quadrilaterals & Polygons
    mentalPrep: [
      'Know the hierarchy: parallelogram → rectangle/rhombus → square. Every rectangle and rhombus is a parallelogram; every square is both.',
      'Diagonals of a parallelogram bisect each other; a rectangle\'s diagonals are also equal in length; a rhombus\'s diagonals are also perpendicular.',
      'Interior angle sum of any n-gon = (n−2)·180°; each interior angle of a REGULAR n-gon = (n−2)·180°/n.'
    ],
    answeringTechniques: [
      'To classify a quadrilateral, test properties in order of strength: opposite sides parallel (parallelogram) → equal diagonals (rectangle) OR perpendicular diagonals (rhombus) → both (square).',
      'For regular-polygon angle questions, plug n directly into (n−2)·180°/n rather than deriving from scratch each time.'
    ],
    guessingStrategy: [
      'If a quadrilateral\'s diagonals are both equal AND perpendicular, it must be a square.',
      'A trapezoid needs only ONE pair of parallel sides — don\'t assume both pairs.'
    ],
    processOfElimination: [
      'Eliminate "rhombus" if the diagonals are not perpendicular; eliminate "rectangle" if they are not equal in length.',
      'Eliminate polygon angle-sum answers that don\'t match (n−2)·180° for the stated number of sides.'
    ],
    timeManagement: [
      'Angle-sum formula plug-ins are one-step calculations — answer immediately.',
      'Classification questions reward checking properties in the strongest-to-weakest order above rather than testing randomly.'
    ]
  }
}
