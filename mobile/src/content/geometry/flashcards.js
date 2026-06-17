import { TOPICS } from './questions'

export const flashcards = [
  // Congruence & Transformations
  { topic: TOPICS.LINES_ANGLES, term: 'Isometry', definition: 'A transformation that preserves shape and size (distance and angle measures); includes translations, reflections, and rotations.' },
  { topic: TOPICS.TRIANGLE_CONG, term: 'SAS (Side-Angle-Side)', definition: 'A triangle congruence shortcut: two sides and the included (between them) angle are congruent.' },
  { topic: TOPICS.TRIANGLE_CONG, term: 'Reflexive Property', definition: 'A geometric figure is congruent to itself; used in proofs to identify a shared side or angle.' },
  { topic: TOPICS.TRIANGLE_CONG, term: 'CPCTC', definition: 'Corresponding Parts of Congruent Triangles are Congruent; used after proving triangles congruent.' },
  { topic: TOPICS.LINES_ANGLES, term: 'Rotation of 180°', definition: 'Maps every point (x, y) to (−x, −y) about the origin.' },

  // Similarity & Proof
  { topic: TOPICS.SIMILARITY, term: 'AA Similarity', definition: 'If two angles of one triangle are congruent to two angles of another, the triangles are similar.' },
  { topic: TOPICS.SIMILARITY, term: 'Scale Factor', definition: 'The ratio of corresponding lengths in similar figures; used to find missing side lengths.' },
  { topic: TOPICS.SIMILARITY, term: 'Midsegment Theorem', definition: 'The segment connecting midpoints of two sides of a triangle is parallel to and half the length of the third side.' },
  { topic: TOPICS.SIMILARITY, term: 'Geometric Mean', definition: 'For segments p and q, the geometric mean is √(pq); appears in the altitude-to-hypotenuse theorem.' },
  { topic: TOPICS.SIMILARITY, term: 'Triangle Proportionality Theorem', definition: 'If a line is parallel to one side of a triangle and intersects the other two sides, it divides those sides proportionally.' },

  // Circles
  { topic: TOPICS.CIRCLES, term: 'Inscribed Angle', definition: 'An angle formed by two chords with the vertex on the circle; equals half the intercepted arc.' },
  { topic: TOPICS.CIRCLES, term: 'Central Angle', definition: 'An angle with its vertex at the center of a circle; its measure equals the intercepted arc.' },
  { topic: TOPICS.CIRCLES, term: 'Tangent', definition: 'A line that touches a circle at exactly one point (the point of tangency) and is perpendicular to the radius at that point.' },
  { topic: TOPICS.CIRCLES, term: 'Intersecting Chords', definition: 'When two chords intersect inside a circle at point P: segment₁·segment₂ = segment₃·segment₄ (AP·PB = CP·PD).' },
  { topic: TOPICS.CIRCLES, term: 'Arc Length', definition: 'The portion of a circle\'s circumference; Arc Length = (θ/360°)·2πr.' },

  // Coordinate Geometry
  { topic: TOPICS.COORDINATE_GEO, term: 'Distance Formula', definition: 'd = √((x₂−x₁)² + (y₂−y₁)²); derived from the Pythagorean theorem.' },
  { topic: TOPICS.COORDINATE_GEO, term: 'Midpoint Formula', definition: 'M = ((x₁+x₂)/2, (y₁+y₂)/2); the average of the x-coordinates and the average of the y-coordinates.' },
  { topic: TOPICS.COORDINATE_GEO, term: 'Perpendicular Slopes', definition: 'Two lines are perpendicular when m₁ · m₂ = −1 (slopes are negative reciprocals).' },
  { topic: TOPICS.COORDINATE_GEO, term: 'Centroid', definition: 'The intersection of the three medians of a triangle; located at the average of the three vertices\' coordinates.' },
  { topic: TOPICS.COORDINATE_GEO, term: 'Standard Circle Equation', definition: '(x − h)² + (y − k)² = r²; center at (h, k), radius r.' },

  // 3D Geometry & Volume
  { topic: TOPICS.SOLID_GEOMETRY, term: 'Volume of Cylinder', definition: 'V = πr²h; a prism with a circular base.' },
  { topic: TOPICS.SOLID_GEOMETRY, term: 'Volume of Cone', definition: 'V = (1/3)πr²h; one-third the volume of a cylinder with the same base and height.' },
  { topic: TOPICS.SOLID_GEOMETRY, term: 'Volume of Sphere', definition: 'V = (4/3)πr³.' },
  { topic: TOPICS.SOLID_GEOMETRY, term: 'Similar Solids', definition: 'If linear scale factor is k, surface area scales by k², and volume scales by k³.' },
  { topic: TOPICS.SOLID_GEOMETRY, term: 'Surface Area of Cube', definition: 'SA = 6s²; six congruent square faces.' },

  // Trigonometry
  { topic: TOPICS.TRIGONOMETRY, term: 'SOH-CAH-TOA', definition: 'Mnemonic for trig ratios: Sin=Opposite/Hypotenuse, Cos=Adjacent/Hypotenuse, Tan=Opposite/Adjacent.' },
  { topic: TOPICS.TRIGONOMETRY, term: 'Angle of Elevation', definition: 'The angle measured upward from the horizontal to a line of sight toward an object above the observer.' },
  { topic: TOPICS.TRIGONOMETRY, term: 'Law of Sines', definition: 'a/sin A = b/sin B = c/sin C; used with AAS, ASA, or SSA triangles.' },
  { topic: TOPICS.TRIGONOMETRY, term: 'Law of Cosines', definition: 'a² = b² + c² − 2bc·cos A; used with SAS or SSS triangles.' },
  { topic: TOPICS.TRIGONOMETRY, term: '45-45-90 Triangle', definition: 'Legs are equal (x); hypotenuse = x√2. Values: sin 45° = cos 45° = √2/2.' },

  // ── Proofs & Reasoning ──
  { topic: TOPICS.PROOFS_REASONING, term: 'Two-column proof', definition: 'Statements on the left, reasons on the right. Every statement needs a reason (given, definition, postulate, or theorem) — start from the Given, end at the Prove.' },
  { topic: TOPICS.PROOFS_REASONING, term: 'CPCTC', definition: 'Corresponding Parts of Congruent Triangles are Congruent — use it ONLY after you have proven the triangles congruent.' },
  { topic: TOPICS.PROOFS_REASONING, term: 'Reflexive Property', definition: 'A segment or angle is congruent to itself — the go-to reason for a shared side/angle between two triangles in a proof.' },
  { topic: TOPICS.PROOFS_REASONING, term: 'Triangle congruence shortcuts', definition: 'SSS, SAS, ASA, AAS, HL prove triangles congruent. SSA / AAA do NOT. Match which parts the givens provide.' },
  { topic: TOPICS.PROOFS_REASONING, term: 'Coordinate proof', definition: 'Prove a property with coordinates: distance (lengths), slope (parallel = equal, perpendicular = opposite reciprocal), midpoint. State the formula and what it shows.' },
]

export const FLASHCARD_TOPIC_LIST = Object.values(TOPICS)
