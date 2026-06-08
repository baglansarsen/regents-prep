export const TOPICS = {
  CONGRUENCE:         'Congruence & Transformations',
  SIMILARITY:         'Similarity & Proof',
  CIRCLES:            'Circles',
  COORDINATE_GEO:     'Coordinate Geometry',
  SOLID_GEOMETRY:     '3D Geometry & Volume',
  TRIGONOMETRY:       'Trigonometry',
}

export const TOPIC_ICONS = {
  [TOPICS.CONGRUENCE]:     '🔄',
  [TOPICS.SIMILARITY]:     '📐',
  [TOPICS.CIRCLES]:        '⭕',
  [TOPICS.COORDINATE_GEO]: '🗺️',
  [TOPICS.SOLID_GEOMETRY]: '📦',
  [TOPICS.TRIGONOMETRY]:   '📏',
}

export const questions = [
  // ── Congruence & Transformations ─────────────────────────────────────────────
  {
    id: 3001,
    topic: TOPICS.CONGRUENCE,
    text: 'Which transformation preserves both shape and size (is an isometry)?',
    choices: ['Dilation', 'Translation', 'Horizontal stretch', 'None of the above'],
    correct: 1,
    explanation: 'Translation (slide) is an isometry — it moves every point the same distance and direction without changing shape or size. Dilations change size.'
  },
  {
    id: 3002,
    topic: TOPICS.CONGRUENCE,
    text: 'Two triangles are congruent by SAS if they have',
    choices: [
      'two pairs of congruent angles and one pair of congruent sides',
      'two pairs of congruent sides and the included angle congruent',
      'all three pairs of sides congruent',
      'two pairs of congruent sides and a non-included angle congruent'
    ],
    correct: 1,
    explanation: 'SAS (Side-Angle-Side) requires two pairs of congruent sides with the angle between them (included angle) also congruent.'
  },
  {
    id: 3003,
    topic: TOPICS.CONGRUENCE,
    text: 'A point P(3, −2) is reflected across the x-axis. What are the coordinates of its image?',
    choices: ['(−3, −2)', '(3, 2)', '(−3, 2)', '(2, −3)'],
    correct: 1,
    explanation: 'Reflection across the x-axis maps (x, y) → (x, −y). So P(3, −2) → (3, 2).'
  },
  {
    id: 3004,
    topic: TOPICS.CONGRUENCE,
    text: 'Which congruence shortcut does NOT exist for triangles?',
    choices: ['SSS', 'ASA', 'SSA', 'AAS'],
    correct: 2,
    explanation: 'SSA (Side-Side-Angle) does not guarantee congruence — it is the "ambiguous case" that can produce 0, 1, or 2 triangles. SSS, ASA, and AAS are all valid congruence shortcuts.'
  },
  {
    id: 3005,
    topic: TOPICS.CONGRUENCE,
    text: 'A rotation of 180° about the origin maps (x, y) to',
    choices: ['(y, x)', '(−x, y)', '(x, −y)', '(−x, −y)'],
    correct: 3,
    explanation: 'A 180° rotation about the origin maps every point (x, y) to (−x, −y).'
  },
  {
    id: 3006,
    topic: TOPICS.CONGRUENCE,
    text: 'In a proof, the reason "Reflexive Property" means',
    choices: [
      'Two angles that form a linear pair are supplementary',
      'A segment or angle is congruent to itself',
      'Angles in a triangle sum to 180°',
      'Corresponding parts of congruent triangles are congruent'
    ],
    correct: 1,
    explanation: 'The Reflexive Property states that any geometric figure is congruent to itself (AB ≅ AB, ∠A ≅ ∠A).'
  },

  // ── Similarity & Proof ────────────────────────────────────────────────────────
  {
    id: 3007,
    topic: TOPICS.SIMILARITY,
    text: 'Two triangles are similar by AA if they have',
    choices: [
      'two pairs of congruent sides and one congruent angle',
      'two pairs of congruent angles',
      'three pairs of proportional sides',
      'one pair of congruent angles and proportional adjacent sides'
    ],
    correct: 1,
    explanation: 'AA (Angle-Angle) Similarity: if two angles of one triangle are congruent to two angles of another, the triangles are similar (the third angle is automatically equal).'
  },
  {
    id: 3008,
    topic: TOPICS.SIMILARITY,
    text: 'A tree casts a 15-foot shadow while a 6-foot pole casts a 4-foot shadow. How tall is the tree?',
    choices: ['10 ft', '22.5 ft', '20 ft', '18 ft'],
    correct: 1,
    explanation: 'Set up a proportion: tree/pole = tree-shadow/pole-shadow → h/6 = 15/4 → h = 6·(15/4) = 22.5 ft.'
  },
  {
    id: 3009,
    topic: TOPICS.SIMILARITY,
    text: 'If △ABC ~ △DEF with a scale factor of 3:1, and AB = 9, what is DE?',
    choices: ['27', '3', '6', '12'],
    correct: 1,
    explanation: 'Scale factor 3:1 means AB/DE = 3/1 → 9/DE = 3 → DE = 3.'
  },
  {
    id: 3010,
    topic: TOPICS.SIMILARITY,
    text: 'The midsegment of a triangle is parallel to the third side and has a length equal to',
    choices: ['the third side', 'twice the third side', 'half the third side', 'one-third the third side'],
    correct: 2,
    explanation: 'The Triangle Midsegment Theorem: the segment connecting the midpoints of two sides is parallel to the third side and half its length.'
  },
  {
    id: 3011,
    topic: TOPICS.SIMILARITY,
    text: 'In a right triangle, the altitude drawn to the hypotenuse creates two triangles that are each similar to the original triangle. This is known as the',
    choices: [
      'Pythagorean Theorem',
      'Geometric Mean (Altitude) Theorem',
      'Triangle Proportionality Theorem',
      'SAS Similarity Theorem'
    ],
    correct: 1,
    explanation: 'The Geometric Mean (Altitude) Theorem states that the altitude to the hypotenuse of a right triangle is the geometric mean of the two hypotenuse segments it creates.'
  },
  {
    id: 3012,
    topic: TOPICS.SIMILARITY,
    text: 'In △PQR, if a line parallel to QR intersects PQ at S and PR at T, then PS/PQ equals',
    choices: ['QR/ST', 'PT/PR', 'ST/PQ', 'PR/PT'],
    correct: 1,
    explanation: 'By the Triangle Proportionality Theorem, ST ∥ QR means the sides are divided proportionally: PS/PQ = PT/PR = ST/QR.'
  },

  // ── Circles ───────────────────────────────────────────────────────────────────
  {
    id: 3013,
    topic: TOPICS.CIRCLES,
    text: 'An inscribed angle is half the measure of the',
    choices: [
      'adjacent central angle',
      'intercepted arc',
      'radius of the circle',
      'tangent-chord angle'
    ],
    correct: 1,
    explanation: 'The Inscribed Angle Theorem: an inscribed angle equals half the intercepted arc. If the arc is 100°, the inscribed angle is 50°.'
  },
  {
    id: 3014,
    topic: TOPICS.CIRCLES,
    text: 'A central angle of 90° intercepts an arc in a circle with radius 6. What is the arc length?',
    choices: ['3π', '6π', '9π', 'π'],
    correct: 0,
    explanation: 'Arc length = (θ/360°) · 2πr = (90/360) · 2π·6 = (1/4) · 12π = 3π.'
  },
  {
    id: 3015,
    topic: TOPICS.CIRCLES,
    text: 'A tangent to a circle is perpendicular to the radius drawn to the point of tangency. If a radius is 5 and the tangent from an external point is 12, how long is the segment from the external point to the center?',
    choices: ['7', '13', '17', '√119'],
    correct: 1,
    explanation: 'The radius, tangent, and external segment form a right triangle. Hypotenuse² = 5² + 12² = 25 + 144 = 169. Hypotenuse = 13.'
  },
  {
    id: 3016,
    topic: TOPICS.CIRCLES,
    text: 'Two chords AB and CD intersect inside a circle at point P. If AP = 3, PB = 8, and CP = 4, what is PD?',
    choices: ['6', '9', '32', '2.67'],
    correct: 0,
    explanation: 'Intersecting Chords Theorem: AP · PB = CP · PD → 3 · 8 = 4 · PD → 24 = 4 · PD → PD = 6.'
  },
  {
    id: 3017,
    topic: TOPICS.CIRCLES,
    text: 'The equation of a circle with center (2, −3) and radius 5 is',
    choices: [
      '(x − 2)² + (y + 3)² = 25',
      '(x + 2)² + (y − 3)² = 25',
      '(x − 2)² + (y − 3)² = 5',
      '(x + 2)² + (y + 3)² = 25'
    ],
    correct: 0,
    explanation: 'Standard form: (x − h)² + (y − k)² = r². With center (2, −3) and r = 5: (x − 2)² + (y − (−3))² = 25 → (x − 2)² + (y + 3)² = 25.'
  },
  {
    id: 3018,
    topic: TOPICS.CIRCLES,
    text: 'A semicircle has a diameter of 10. What is the area of the semicircle?',
    choices: ['25π', '50π', '12.5π', '5π'],
    correct: 2,
    explanation: 'Radius = 5. Area of full circle = π·5² = 25π. Area of semicircle = 25π/2 = 12.5π.'
  },

  // ── Coordinate Geometry ───────────────────────────────────────────────────────
  {
    id: 3019,
    topic: TOPICS.COORDINATE_GEO,
    text: 'What is the distance between points A(1, 2) and B(4, 6)?',
    choices: ['3', '5', '7', '√7'],
    correct: 1,
    explanation: 'd = √((4−1)² + (6−2)²) = √(9 + 16) = √25 = 5.'
  },
  {
    id: 3020,
    topic: TOPICS.COORDINATE_GEO,
    text: 'The midpoint of segment with endpoints (−2, 4) and (6, −8) is',
    choices: ['(2, −2)', '(4, −4)', '(2, −4)', '(4, −2)'],
    correct: 0,
    explanation: 'Midpoint = ((x₁+x₂)/2, (y₁+y₂)/2) = ((−2+6)/2, (4+(−8))/2) = (4/2, −4/2) = (2, −2).'
  },
  {
    id: 3021,
    topic: TOPICS.COORDINATE_GEO,
    text: 'Two lines are perpendicular if their slopes satisfy',
    choices: ['m₁ = m₂', 'm₁ · m₂ = −1', 'm₁ + m₂ = 0', 'm₁ − m₂ = 1'],
    correct: 1,
    explanation: 'Perpendicular lines have slopes that are negative reciprocals of each other: m₁ · m₂ = −1.'
  },
  {
    id: 3022,
    topic: TOPICS.COORDINATE_GEO,
    text: 'The centroid of a triangle with vertices (0,0), (6,0), and (0,9) is located at',
    choices: ['(2, 3)', '(3, 3)', '(3, 4.5)', '(2, 4.5)'],
    correct: 0,
    explanation: 'Centroid = ((x₁+x₂+x₃)/3, (y₁+y₂+y₃)/3) = ((0+6+0)/3, (0+0+9)/3) = (2, 3).'
  },
  {
    id: 3023,
    topic: TOPICS.COORDINATE_GEO,
    text: 'Which classification best describes a quadrilateral with vertices A(0,0), B(4,0), C(5,3), D(1,3)?',
    choices: ['Rectangle', 'Trapezoid', 'Parallelogram', 'Rhombus'],
    correct: 2,
    explanation: 'AB has slope 0 (horizontal); DC has slope 0 (horizontal) — one pair parallel. AD has slope 3/1=3; BC has slope 3/1=3 — both pairs parallel. This is a parallelogram.'
  },
  {
    id: 3024,
    topic: TOPICS.COORDINATE_GEO,
    text: 'What is the slope of a line perpendicular to the line 2x − 4y = 8?',
    choices: ['2', '−2', '1/2', '−1/2'],
    correct: 1,
    explanation: 'Rewrite: 4y = 2x − 8 → y = (1/2)x − 2. Slope is 1/2. Perpendicular slope = −1/(1/2) = −2.'
  },

  // ── 3D Geometry & Volume ──────────────────────────────────────────────────────
  {
    id: 3025,
    topic: TOPICS.SOLID_GEOMETRY,
    text: 'What is the volume of a cylinder with radius 3 and height 8?',
    choices: ['24π', '72π', '48π', '96π'],
    correct: 1,
    explanation: 'V = πr²h = π(3²)(8) = π(9)(8) = 72π.'
  },
  {
    id: 3026,
    topic: TOPICS.SOLID_GEOMETRY,
    text: 'A cone has the same base and height as a cylinder. The volume of the cone compared to the cylinder is',
    choices: ['equal', 'half', 'one-third', 'one-quarter'],
    correct: 2,
    explanation: 'V(cone) = (1/3)πr²h, V(cylinder) = πr²h. The cone is one-third the volume of the cylinder with the same base and height.'
  },
  {
    id: 3027,
    topic: TOPICS.SOLID_GEOMETRY,
    text: 'What is the surface area of a cube with side length 4?',
    choices: ['64', '96', '48', '24'],
    correct: 1,
    explanation: 'A cube has 6 faces, each with area s² = 16. Total SA = 6 × 16 = 96.'
  },
  {
    id: 3028,
    topic: TOPICS.SOLID_GEOMETRY,
    text: 'A sphere has a radius of 3. What is its volume?',
    choices: ['36π', '12π', '27π', '4π'],
    correct: 0,
    explanation: 'V = (4/3)πr³ = (4/3)π(3³) = (4/3)π(27) = 36π.'
  },
  {
    id: 3029,
    topic: TOPICS.SOLID_GEOMETRY,
    text: 'If two similar solids have a linear scale factor of 2:1, what is the ratio of their volumes?',
    choices: ['2:1', '4:1', '8:1', '6:1'],
    correct: 2,
    explanation: 'Volume scales as the cube of the linear scale factor: 2³:1³ = 8:1.'
  },
  {
    id: 3030,
    topic: TOPICS.SOLID_GEOMETRY,
    text: 'A rectangular prism has dimensions 3 × 4 × 5. What is its volume?',
    choices: ['47', '60', '120', '94'],
    correct: 1,
    explanation: 'V = l × w × h = 3 × 4 × 5 = 60.'
  },

  // ── Trigonometry ──────────────────────────────────────────────────────────────
  {
    id: 3031,
    topic: TOPICS.TRIGONOMETRY,
    text: 'In a right triangle, sin(θ) is defined as',
    choices: ['adjacent/hypotenuse', 'opposite/adjacent', 'opposite/hypotenuse', 'hypotenuse/opposite'],
    correct: 2,
    explanation: 'SOH-CAH-TOA: Sin = Opposite/Hypotenuse; Cos = Adjacent/Hypotenuse; Tan = Opposite/Adjacent.'
  },
  {
    id: 3032,
    topic: TOPICS.TRIGONOMETRY,
    text: 'A ladder leans against a wall at an angle of 60° with the ground. If the ladder is 10 feet long, how high up the wall does it reach?',
    choices: ['5 ft', '5√3 ft', '10√3 ft', '5√2 ft'],
    correct: 1,
    explanation: 'sin(60°) = opposite/hypotenuse = height/10 → height = 10·sin(60°) = 10·(√3/2) = 5√3.'
  },
  {
    id: 3033,
    topic: TOPICS.TRIGONOMETRY,
    text: 'Using the Law of Sines, which equation is correct for triangle ABC?',
    choices: [
      'a/sin A = b/sin B = c/sin C',
      'sin A/a = sin B/b = cos C/c',
      'a² = b² + c² − 2bc·cos A',
      'a/cos A = b/cos B'
    ],
    correct: 0,
    explanation: 'The Law of Sines: a/sin A = b/sin B = c/sin C. It relates sides to the sines of their opposite angles.'
  },
  {
    id: 3034,
    topic: TOPICS.TRIGONOMETRY,
    text: 'The Law of Cosines is most useful when you know',
    choices: [
      'two angles and one side (AAS)',
      'two sides and the included angle (SAS)',
      'one side and one angle',
      'all three angles'
    ],
    correct: 1,
    explanation: 'The Law of Cosines (a² = b² + c² − 2bc·cos A) is used for SAS or SSS triangles — it works when you have two sides and the included angle or all three sides.'
  },
  {
    id: 3035,
    topic: TOPICS.TRIGONOMETRY,
    text: 'What is the value of cos(45°)?',
    choices: ['1/2', '√2/2', '√3/2', '1'],
    correct: 1,
    explanation: 'cos(45°) = √2/2 ≈ 0.707. This is also the same as sin(45°), since a 45-45-90 triangle has equal legs.'
  },
  {
    id: 3036,
    topic: TOPICS.TRIGONOMETRY,
    text: 'An observer looks up at a 30° angle of elevation to see the top of a 50-foot building. How far is the observer from the base of the building?',
    choices: ['50√3 ft', '25 ft', '100 ft', '50/√3 ft'],
    correct: 0,
    explanation: 'tan(30°) = opposite/adjacent = 50/d → d = 50/tan(30°) = 50/(1/√3) = 50√3 ft.'
  },

  // ── Visual Questions ──────────────────────────────────────────────────────────
  {
    id: 3101,
    topic: TOPICS.CONGRUENCE,
    text: 'In the diagram, ℓ₁ ∥ ℓ₂. What is the value of x?',
    choices: ['45°', '55°', '65°', '115°'],
    correct: 2,
    explanation: 'When parallel lines are cut by a transversal, alternate interior angles are congruent. The marked 65° angle and x° are alternate interior angles, so x = 65.',
    diagram: { type: 'parallellines-geo' },
  },
  {
    id: 3102,
    topic: TOPICS.CIRCLES,
    text: 'In the diagram, arc AB measures 120°. What is the measure of inscribed angle ACB?',
    choices: ['120°', '60°', '30°', '240°'],
    correct: 1,
    explanation: 'The Inscribed Angle Theorem: an inscribed angle equals half the intercepted arc. Inscribed angle ACB = 120°/2 = 60°.',
    diagram: { type: 'inscribedangle-geo' },
  },
  {
    id: 3103,
    topic: TOPICS.SIMILARITY,
    text: 'In the diagram, △ABC ~ △DEF. What is the length of EF?',
    choices: ['8', '6', '4', '3'],
    correct: 2,
    explanation: 'Scale factor = AB/DE = 6/3 = 2. So EF = BC ÷ 2 = 8 ÷ 2 = 4.',
    diagram: { type: 'similartriangles-geo' },
  },
  {
    id: 3104,
    topic: TOPICS.TRIGONOMETRY,
    text: 'Using the right triangle shown, what is the value of sin(θ)?',
    choices: ['12/13', '5/13', '5/12', '13/5'],
    correct: 1,
    explanation: 'sin(θ) = opposite/hypotenuse. The side opposite θ is BC = 5, and the hypotenuse is AC = 13. So sin(θ) = 5/13.',
    diagram: { type: 'righttrigtrig-geo' },
  },
  {
    id: 3105,
    topic: TOPICS.CIRCLES,
    text: 'Chords AB and CD intersect at point P inside a circle. If AP = 4, PB = 6, and CP = 3, what is PD?',
    choices: ['2', '4', '8', '9'],
    correct: 2,
    explanation: 'Intersecting Chords Theorem: AP · PB = CP · PD → 4 · 6 = 3 · PD → 24 = 3 · PD → PD = 8.',
    diagram: { type: 'circlechord-geo' },
  },
]

export function getByTopic(topic) {
  return questions.filter(q => q.topic === topic)
}

export function getContextual() {
  return questions.filter(q => q.context)
}

export function buildDiagnosticSet() {
  return Object.values(TOPICS).flatMap(topic => {
    const pool = getByTopic(topic)
    return pool.sort(() => Math.random() - 0.5).slice(0, 3)
  })
}

export function shuffled(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}
