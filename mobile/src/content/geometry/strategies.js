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

  'geometry-u2': {
    mentalPrep: [
      'Two triangles are similar if angles are equal; sides are in proportion.',
      'Scale factor: if sides are in ratio k:1, areas are in ratio k²:1, volumes are in ratio k³:1.',
      'The Midsegment of a triangle is always half the parallel base — a frequently tested theorem.'
    ],
    answeringTechniques: [
      'For shadow/pole problems, set up a proportion: object height / shadow length = known object height / known shadow length.',
      'Altitude to hypotenuse: the altitude is the geometric mean of the two hypotenuse segments.'
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
      'For midsegment theorem: just halve the base. This is one calculation, not a multi-step process.'
    ]
  },

  'geometry-u3': {
    mentalPrep: [
      'Inscribed Angle = (1/2) × Intercepted Arc — this is the single most tested circle theorem.',
      'Tangent-radius angle is always 90°; use the Pythagorean theorem for tangent segment lengths.',
      'Intersecting chords: AP · PB = CP · PD. Secants from external point: whole · external = whole · external.'
    ],
    answeringTechniques: [
      'Circle equation (x−h)² + (y−k)² = r²: center is (h,k) and radius is √(right side).',
      'Arc Length = (central angle/360°) × 2πr. Sector Area = (central angle/360°) × πr².'
    ],
    guessingStrategy: [
      'An inscribed angle in a semicircle is always 90° — the diameter creates a 180° arc, so the inscribed angle is 90°.',
      'For tangent problems from an external point, both tangent segments from that point are equal.'
    ],
    processOfElimination: [
      'Eliminate circle equations where the center does not match (h,k) from the given center.',
      'For arc length answers, eliminate anything not involving π unless the question asks for a decimal approximation.'
    ],
    timeManagement: [
      'Inscribed/central angle questions are solved in one or two steps — prioritize them.',
      'Chord intersection products (AP · PB = CP · PD) are simple multiplications — set up and solve in under a minute.'
    ]
  },

  'geometry-u4': {
    mentalPrep: [
      'Memorize: Distance Formula = √((Δx)² + (Δy)²), Midpoint = (average x, average y).',
      'Parallel slopes are equal; perpendicular slopes multiply to −1.',
      'To classify quadrilaterals, compute all four slopes — two pairs of parallel sides means parallelogram.'
    ],
    answeringTechniques: [
      'Centroid = average of all three vertices: ((x₁+x₂+x₃)/3, (y₁+y₂+y₃)/3).',
      'To write the equation of a perpendicular bisector: find midpoint, find perpendicular slope, write y = mx + b.'
    ],
    guessingStrategy: [
      'For "what type of quadrilateral" questions, start by checking if both pairs of opposite sides are parallel (parallelogram test).',
      'Squares and rhombuses have perpendicular diagonals; rectangles and squares have equal-length diagonals.'
    ],
    processOfElimination: [
      'Eliminate "perpendicular" if the slopes do not multiply to −1.',
      'For midpoint questions, check that the answer is between the two given points — not outside them.'
    ],
    timeManagement: [
      'Distance and midpoint formulas are direct calculations — write them down and plug in immediately.',
      'For quadrilateral classification, two slope calculations per pair of sides = four calculations total.'
    ]
  },

  'geometry-u5': {
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

  'geometry-u6': {
    mentalPrep: [
      'SOH-CAH-TOA: Sin = Opposite/Hypotenuse, Cos = Adjacent/Hypotenuse, Tan = Opposite/Adjacent.',
      'Special triangles: 30-60-90 (sides x, x√3, 2x) and 45-45-90 (sides x, x, x√2).',
      'Law of Sines: a/sin A = b/sin B — use when you know a side-angle pair.',
      'Law of Cosines: a² = b² + c² − 2bc·cos A — use for SAS or SSS situations.'
    ],
    answeringTechniques: [
      'For angle of elevation/depression problems, draw a right triangle and label opposite/adjacent sides before applying trig.',
      'Inverse trig functions (sin⁻¹, cos⁻¹, tan⁻¹) find angle measures from side ratios.'
    ],
    guessingStrategy: [
      'If no angles are given and all three sides are known, use the Law of Cosines.',
      'If two angles and one side are known (AAS/ASA), use the Law of Sines.'
    ],
    processOfElimination: [
      'Eliminate answers that mix up opposite and adjacent — check your triangle orientation.',
      'For 30-60-90 triangles, the side opposite 30° is always the shortest — eliminate choices where it is not.'
    ],
    timeManagement: [
      'SOH-CAH-TOA questions are one-formula calculations — set up the ratio immediately.',
      'Law of Sines and Law of Cosines questions require substitution and algebra; budget about 2 minutes each.'
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
  }
}
