import { TOPICS } from './questions'

export const flashcards = [
  // Congruence & Transformations
  { topic: TOPICS.LINES_ANGLES, term: 'Isometry', definition: 'A transformation that preserves shape and size (distance and angle measures); includes translations, reflections, and rotations.' },
  { topic: TOPICS.TRIANGLE_CONG, term: 'SAS (Side-Angle-Side)', definition: 'A triangle congruence shortcut: two sides and the included (between them) angle are congruent.' },
  { topic: TOPICS.TRIANGLE_CONG, term: 'Reflexive Property', definition: 'A geometric figure is congruent to itself; used in proofs to identify a shared side or angle.' },
  { topic: TOPICS.TRIANGLE_CONG, term: 'CPCTC', definition: 'Corresponding Parts of Congruent Triangles are Congruent; used after proving triangles congruent.' },
  { topic: TOPICS.LINES_ANGLES, term: 'Rotation of 180°', definition: 'Maps every point (x, y) to (−x, −y) about the origin.' },

  // Similarity
  { topic: TOPICS.SIMILARITY_RATIOS, term: 'AA Similarity', definition: 'If two angles of one triangle are congruent to two angles of another, the triangles are similar.' },
  { topic: TOPICS.SIMILARITY_RATIOS, term: 'Scale Factor', definition: 'The ratio of corresponding lengths in similar figures; used to find missing side lengths.' },

  // Triangle Relationships
  { topic: TOPICS.TRIANGLE_RELATIONSHIPS, term: 'Midsegment Theorem', definition: 'The segment connecting midpoints of two sides of a triangle is parallel to and half the length of the third side.' },
  { topic: TOPICS.TRIANGLE_RELATIONSHIPS, term: 'Geometric Mean', definition: 'For segments p and q, the geometric mean is √(pq); appears in the altitude-to-hypotenuse theorem.' },
  { topic: TOPICS.TRIANGLE_RELATIONSHIPS, term: 'Triangle Proportionality Theorem', definition: 'If a line is parallel to one side of a triangle and intersects the other two sides, it divides those sides proportionally.' },

  // Arcs & Angles
  { topic: TOPICS.ARCS_ANGLES, term: 'Inscribed Angle', definition: 'An angle formed by two chords with the vertex on the circle; equals half the intercepted arc.' },
  { topic: TOPICS.ARCS_ANGLES, term: 'Central Angle', definition: 'An angle with its vertex at the center of a circle; its measure equals the intercepted arc.' },
  { topic: TOPICS.ARCS_ANGLES, term: 'Arc Length', definition: 'The portion of a circle\'s circumference; Arc Length = (θ/360°)·2πr.' },

  // Circle Segments & Lines
  { topic: TOPICS.CIRCLE_SEGMENTS, term: 'Tangent', definition: 'A line that touches a circle at exactly one point (the point of tangency) and is perpendicular to the radius at that point.' },
  { topic: TOPICS.CIRCLE_SEGMENTS, term: 'Intersecting Chords', definition: 'When two chords intersect inside a circle at point P: segment₁·segment₂ = segment₃·segment₄ (AP·PB = CP·PD).' },

  // Equations of Circles
  { topic: TOPICS.CIRCLE_EQUATIONS, term: 'Standard Circle Equation', definition: '(x − h)² + (y − k)² = r²; center at (h, k), radius r.' },

  // Lines & Slope
  { topic: TOPICS.LINES_SLOPE, term: 'Perpendicular Slopes', definition: 'Two lines are perpendicular when m₁ · m₂ = −1 (slopes are negative reciprocals).' },

  // Coordinate Proofs
  { topic: TOPICS.COORDINATE_PROOFS, term: 'Distance Formula', definition: 'd = √((x₂−x₁)² + (y₂−y₁)²); derived from the Pythagorean theorem.' },
  { topic: TOPICS.COORDINATE_PROOFS, term: 'Midpoint Formula', definition: 'M = ((x₁+x₂)/2, (y₁+y₂)/2); the average of the x-coordinates and the average of the y-coordinates.' },
  { topic: TOPICS.COORDINATE_PROOFS, term: 'Centroid', definition: 'The intersection of the three medians of a triangle; located at the average of the three vertices\' coordinates.' },

  // Cross-Sections & Solids of Revolution
  { topic: TOPICS.CROSS_SECTIONS, term: 'Solid of Revolution', definition: 'The 3-D solid swept out by rotating a 2-D shape about an axis: a rectangle → cylinder, a triangle → cone, a semicircle → sphere.' },

  // Volume & Surface Area
  { topic: TOPICS.VOLUME_SA, term: 'Volume of Cylinder', definition: 'V = πr²h; a prism with a circular base.' },
  { topic: TOPICS.VOLUME_SA, term: 'Volume of Cone', definition: 'V = (1/3)πr²h; one-third the volume of a cylinder with the same base and height.' },
  { topic: TOPICS.VOLUME_SA, term: 'Volume of Sphere', definition: 'V = (4/3)πr³.' },
  { topic: TOPICS.VOLUME_SA, term: 'Similar Solids', definition: 'If linear scale factor is k, surface area scales by k², and volume scales by k³.' },
  { topic: TOPICS.VOLUME_SA, term: 'Surface Area of Cube', definition: 'SA = 6s²; six congruent square faces.' },

  // Density & Modeling
  { topic: TOPICS.DENSITY_MODELING, term: 'Density', definition: 'Density = mass ÷ volume; real-world modeling problems compute the geometric volume first, then apply this or another rate.' },

  // Right Triangle Trig
  { topic: TOPICS.RIGHT_TRIANGLE_TRIG, term: 'SOH-CAH-TOA', definition: 'Mnemonic for trig ratios: Sin=Opposite/Hypotenuse, Cos=Adjacent/Hypotenuse, Tan=Opposite/Adjacent.' },
  { topic: TOPICS.RIGHT_TRIANGLE_TRIG, term: 'Angle of Elevation', definition: 'The angle measured upward from the horizontal to a line of sight toward an object above the observer.' },

  // Pythagorean & Special Triangles
  { topic: TOPICS.SPECIAL_TRIANGLES, term: '45-45-90 Triangle', definition: 'Legs are equal (x); hypotenuse = x√2. Values: sin 45° = cos 45° = √2/2.' },
  { topic: TOPICS.SPECIAL_TRIANGLES, term: '30-60-90 Triangle', definition: 'Sides are in ratio x : x√3 : 2x, opposite the 30°, 60°, and 90° angles respectively.' },

  // ── Proofs & Reasoning ──
  { topic: TOPICS.PROOFS_REASONING, term: 'Two-column proof', definition: 'Statements on the left, reasons on the right. Every statement needs a reason (given, definition, postulate, or theorem) — start from the Given, end at the Prove.' },
  { topic: TOPICS.PROOFS_REASONING, term: 'CPCTC', definition: 'Corresponding Parts of Congruent Triangles are Congruent — use it ONLY after you have proven the triangles congruent.' },
  { topic: TOPICS.PROOFS_REASONING, term: 'Reflexive Property', definition: 'A segment or angle is congruent to itself — the go-to reason for a shared side/angle between two triangles in a proof.' },
  { topic: TOPICS.PROOFS_REASONING, term: 'Triangle congruence shortcuts', definition: 'SSS, SAS, ASA, AAS, HL prove triangles congruent. SSA / AAA do NOT. Match which parts the givens provide.' },
  { topic: TOPICS.PROOFS_REASONING, term: 'Coordinate proof', definition: 'Prove a property with coordinates: distance (lengths), slope (parallel = equal, perpendicular = opposite reciprocal), midpoint. State the formula and what it shows.' },

  // Quadrilaterals & Polygons
  { topic: TOPICS.QUADRILATERALS, term: 'Quadrilateral Hierarchy', definition: 'Parallelogram → Rectangle/Rhombus → Square. Every rectangle and rhombus is a parallelogram; a square is both a rectangle and a rhombus.' },
  { topic: TOPICS.QUADRILATERALS, term: 'Polygon Interior Angle Sum', definition: 'The sum of interior angles of any n-gon is (n−2)·180°; each angle of a REGULAR n-gon is (n−2)·180°/n.' },
]

export const FLASHCARD_TOPIC_LIST = Object.values(TOPICS)
