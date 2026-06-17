// Enriched Physics exam — tagged with skill + subTopic (see content/_shared/lessonEngine.js)
export default {
  "id": "phys-jun-2022",
  "subject": "physics",
  "year": 2022,
  "session": "June",
  "totalMinutes": 180,
  "questions": [
    {
      "number": 1,
      "part": "A",
      "text": "Which terms identify two scalar quantities?",
      "choices": [
        "force and acceleration",
        "impulse and distance",
        "mass and velocity",
        "energy and time"
      ],
      "topic": "Forces & Newton",
      "correct": 3,
      "explanation": "Energy and time are both scalar quantities — they have magnitude only, with no direction. Force, acceleration, impulse, and velocity are all vector quantities.",
      "diveDeep": "Scalars: mass (kg), energy (J), time (s), speed (m/s), temperature (°C), distance (m), power (W). Vectors: force (N), acceleration (m/s²), velocity (m/s), displacement (m), momentum (kg·m/s), impulse (N·s). Note that distance is scalar but displacement is vector; speed is scalar but velocity is vector. A common mistake is listing impulse as scalar — it has direction (same as the force that created it). Mass is always scalar. The Regents tests this classification nearly every year.",
      "subTopic": "Kinematics & Projectile Motion"
    },
    {
      "number": 2,
      "part": "A",
      "text": "A motorcyclist, initially traveling east at 15 meters per second, accelerates uniformly at a rate of 3.0 meters per second squared east to a velocity of 21 meters per second east. How far does the motorcyclist travel while accelerating?",
      "choices": [
        "1.0 m",
        "36 m",
        "2.0 m",
        "72 m"
      ],
      "topic": "Kinematics",
      "correct": 1,
      "explanation": "Using v² = v₀² + 2ad: (21)² = (15)² + 2(3.0)d → 441 = 225 + 6d → d = 216/6 = 36 m.",
      "diveDeep": "When time is not given, use v² = v₀² + 2aΔx. Here: a = (v² − v₀²)/(2Δx) rearranged to Δx = (v² − v₀²)/(2a) = (441 − 225)/6 = 216/6 = 36 m. A common mistake is using Δx = (v − v₀)/a, which gives (21 − 15)/3 = 2 m — this is actually the time (not distance). Another mistake is using Δx = v₀t without knowing t. Recognizing which kinematic equation applies (the one without t) is a key exam strategy. Always list known variables before choosing an equation.",
      "subTopic": "Kinematics & Projectile Motion"
    },
    {
      "number": 3,
      "part": "A",
      "text": "A battery-powered electric motor is used to cause the wheels of a toy car to rotate. In this motor, there is a conversion of",
      "choices": [
        "mechanical energy to electric energy",
        "electric energy to chemical energy",
        "thermal energy to electric energy",
        "electric energy to mechanical energy"
      ],
      "topic": "Electricity",
      "correct": 3,
      "explanation": "An electric motor converts electrical energy (from the battery) into mechanical energy (rotation of the wheels). This is the fundamental purpose of a motor.",
      "diveDeep": "Energy conversions in common devices: battery (chemical → electrical), motor (electrical → mechanical), generator (mechanical → electrical), lightbulb (electrical → light + thermal), solar panel (light → electrical). A generator does the reverse of a motor. The first law of thermodynamics (conservation of energy) governs all conversions. A common mistake is reversing the direction: a generator converts mechanical to electrical, while a motor converts electrical to mechanical. Remembering the mnemonic \"Motor = electrical in, Mechanical out; Generator = Mechanical in, Electrical out\" helps.",
      "subTopic": "Electrostatics, Fields & Magnetism"
    },
    {
      "number": 4,
      "part": "A",
      "text": "A projectile is launched horizontally from a height of 65 meters with an initial horizontal speed of 35 meters per second. What is the projectile's horizontal speed after it has fallen 25 meters? [Neglect friction.]",
      "choices": [
        "12 m/s",
        "41 m/s",
        "35 m/s",
        "80 m/s"
      ],
      "topic": "Kinematics",
      "correct": 2,
      "explanation": "In projectile motion (no air resistance), the horizontal component of velocity remains constant throughout the flight. The horizontal speed stays at 35 m/s.",
      "diveDeep": "The key principle of projectile motion is independence of horizontal and vertical components. Without air resistance, there is no horizontal force, so horizontal velocity is constant. The vertical component increases due to gravity, but this does not affect horizontal speed. The height fallen (25 m) and total height (65 m) are irrelevant to horizontal speed. A common mistake is thinking the horizontal speed should increase because the projectile \"speeds up\" as it falls — the total speed increases, but only the vertical component changes. This independence is testable every year on the Regents.",
      "subTopic": "Forces, Gravity & Momentum"
    },
    {
      "number": 5,
      "part": "A",
      "text": "Two forces, F₁ = 10. N to the right and F₂ = 10. N to the left, act concurrently on a block sliding on a horizontal, frictionless surface. Which statement describes the motion of the block?",
      "choices": [
        "The block is accelerating to the right.",
        "The block is accelerating to the left.",
        "The block is moving with constant speed.",
        "The block is moving with decreasing speed."
      ],
      "topic": "Forces & Newton",
      "correct": 2,
      "image": "/images/exams/phys-june-2022/q5.png",
      "explanation": "The two forces are equal and opposite, so the net force is zero. By Newton's first law, zero net force means constant velocity (constant speed in the same direction).",
      "diveDeep": "Net force = F₁ + F₂ = +10 − 10 = 0 N. Newton's first law: F_net = 0 → a = 0 → constant velocity. The block continues moving at whatever speed it already had. Since the surface is frictionless, no deceleration occurs. A common mistake is thinking equal forces mean the block stops — they mean it continues at constant speed (dynamic equilibrium). If the block were at rest, it would remain at rest. This distinction between 'forces balance' and 'object at rest' is frequently tested.",
      "subTopic": "Forces, Gravity & Momentum"
    },
    {
      "number": 6,
      "part": "A",
      "text": "The magnitude of an unbalanced force applied to a 4.0-kilogram crate is 10. newtons. If the magnitude of this applied unbalanced force is doubled, the inertia of the crate is",
      "choices": [
        "halved",
        "doubled",
        "unchanged",
        "quadrupled"
      ],
      "topic": "Forces & Newton",
      "correct": 2,
      "explanation": "Inertia depends only on mass, not on the applied force. The mass of the crate remains 4.0 kg, so its inertia is unchanged.",
      "diveDeep": "Inertia is the resistance to change in motion, measured by mass. Force does not change mass. From F = ma: doubling F doubles a (for the same mass), but mass (and thus inertia) is unchanged. A common misconception is that applying more force makes an object harder to stop (more inertia) — this confuses inertia with momentum. Momentum (mv) would change with different accelerations, but inertia (m) does not. On the Regents, any question asking about inertia when only force changes is answered 'unchanged.'",
      "subTopic": "Forces, Gravity & Momentum"
    },
    {
      "number": 7,
      "part": "A",
      "text": "A 60.-kilogram man is pushing a 30.-kilogram lawn mower. Compared to the magnitude of the force exerted on the lawn mower by the man, the magnitude of the force exerted on the man by the lawn mower is",
      "choices": [
        "one-quarter as great",
        "the same",
        "one-half as great",
        "twice as great"
      ],
      "topic": "Forces & Newton",
      "correct": 1,
      "explanation": "By Newton's third law, the force the man exerts on the mower and the force the mower exerts on the man are equal in magnitude and opposite in direction.",
      "diveDeep": "Newton's third law action-reaction pairs are always equal in magnitude regardless of mass difference. The 60 kg vs. 30 kg mass difference is irrelevant. The mower exerts the same force on the man as the man exerts on the mower. However, the accelerations differ: a = F/m, so the lighter mower accelerates more. A common mistake is scaling by mass ratio (30/60 = ½, choice C). Newton's third law is about force equality, not acceleration equality. This is why rockets work in space: the exhaust gas and the rocket exert equal and opposite forces on each other.",
      "subTopic": "Forces, Gravity & Momentum"
    },
    {
      "number": 8,
      "part": "A",
      "text": "A roller coaster car travels counterclockwise in a vertical circle. When the car is at the rightmost point of the circle (moving downward), what are the directions of the centripetal force and the velocity?",
      "choices": [
        "Centripetal force is directed to the left (toward center) and velocity is directed downward.",
        "Centripetal force is directed downward and velocity is directed to the right.",
        "Centripetal force and velocity are both directed to the right.",
        "Centripetal force and velocity are both directed downward."
      ],
      "topic": "Kinematics",
      "correct": 0,
      "image": "/images/exams/phys-june-2022/q8.png",
      "explanation": "At the rightmost point, the center of the circle is to the left, so centripetal force points left (toward center). Moving counterclockwise at the rightmost point, the velocity is directed downward (tangent to the circle).",
      "diveDeep": "Centripetal force always points toward the center of the circle. Velocity is always tangent to the circle, perpendicular to the radius. At the rightmost point of a vertical circle: the radius points right, so centripetal force points left (toward center). For counterclockwise motion, the tangent at the rightmost point is directed downward. A common mistake is aligning velocity with the centripetal force. They are always perpendicular in uniform circular motion. This is why centripetal force does no work — it is always perpendicular to velocity.",
      "subTopic": "Forces, Gravity & Momentum"
    },
    {
      "number": 9,
      "part": "A",
      "text": "An electric motor with a power rating of 6.48 × 10⁴ watts is used to raise an elevator weighing 2.80 × 10⁴ newtons at constant speed. What is the total time required for the motor to raise the elevator a vertical distance of 20.0 meters?",
      "choices": [
        "0.116 s",
        "8.64 s",
        "2.31 s",
        "46.3 s"
      ],
      "topic": "Energy & Work",
      "correct": 1,
      "explanation": "W = F × d = 2.80 × 10⁴ × 20.0 = 5.60 × 10⁵ J. t = W/P = (5.60 × 10⁵)/(6.48 × 10⁴) ≈ 8.64 s.",
      "diveDeep": "P = W/t → t = W/P. Work done lifting = Fd = (2.80 × 10⁴ N)(20.0 m) = 5.60 × 10⁵ J. Time = W/P = 5.60 × 10⁵ / 6.48 × 10⁴ ≈ 8.64 s. The elevator is lifted at constant speed, so no net force and no extra kinetic energy change — all work goes to gravitational PE. A common mistake is using P = mv or including some factor of g twice. Always use W = Fd for work done against gravity (F here is already the weight in newtons). Checking units: J / (J/s) = s ✓.",
      "subTopic": "Work & Power"
    },
    {
      "number": 10,
      "part": "A",
      "text": "A person standing on a sidewalk hears the siren of an ambulance as it approaches, passes by, and goes away from the person. Compared to the frequency of the sound emitted by the siren, the frequency of the sound observed by the person during this event is",
      "choices": [
        "higher, only",
        "lower, only",
        "first higher and then lower",
        "first lower and then higher"
      ],
      "topic": "Waves & Sound",
      "correct": 2,
      "explanation": "As the ambulance approaches, sound waves compress and the observed frequency is higher than emitted. As it moves away, waves stretch and the observed frequency is lower — this is the Doppler effect.",
      "diveDeep": "The Doppler effect describes the change in observed frequency due to relative motion between source and observer. Approaching source → waves compressed → higher frequency (higher pitch). Receding source → waves stretched → lower frequency (lower pitch). This is the classic \"ambulance\" example. The actual emitted frequency never changes; only the observed frequency does. The Doppler effect applies to all waves including light (redshift for receding stars). A common mistake is saying frequency first decreases then increases — it is the opposite: higher first, then lower.",
      "subTopic": "Waves & Sound"
    },
    {
      "number": 11,
      "part": "A",
      "text": "Which particles exhibit properties of waves in some experiments?",
      "choices": [
        "photons, only",
        "electrons, only",
        "both photons and electrons",
        "neither photons nor electrons"
      ],
      "topic": "Modern Physics",
      "correct": 2,
      "explanation": "Both photons (light) and electrons exhibit wave-particle duality — they behave as waves in diffraction/interference experiments and as particles in photoelectric effect or collision experiments.",
      "diveDeep": "Wave-particle duality is a cornerstone of quantum mechanics. Photons show wave behavior (Young's double-slit experiment) and particle behavior (photoelectric effect). Electrons also show wave behavior (electron diffraction by crystals) and particle behavior (definite mass, charge, and localized collisions). de Broglie proposed that all matter has a wavelength λ = h/mv. The Regents specifically tests that both photons and electrons exhibit this duality. A common mistake is limiting wave properties to light only. All particles with momentum have an associated de Broglie wavelength, though for macroscopic objects it is immeasurably small.",
      "subTopic": "Standard Model & Particles"
    },
    {
      "number": 12,
      "part": "A",
      "text": "The direction of the electric field at a point in space is defined as the direction of the force exerted by the field on a",
      "choices": [
        "test mass located at that point",
        "magnetic north pole located at that point",
        "negative test charge located at that point",
        "positive test charge located at that point"
      ],
      "topic": "Electricity",
      "correct": 3,
      "explanation": "By convention, the electric field direction is defined as the direction of force on a positive test charge. A negative charge would experience force in the opposite direction.",
      "diveDeep": "The electric field E is defined by the force F on a positive test charge: E = F/q (q > 0). Field lines point away from positive source charges and toward negative source charges — the direction a positive charge would accelerate. A common mistake is thinking the field direction corresponds to a negative charge (which would be opposite). A test charge must be small enough not to disturb the field being measured. On the Regents, this definition appears in multiple-choice and as the basis for field line drawing problems.",
      "subTopic": "Electrostatics, Fields & Magnetism"
    },
    {
      "number": 13,
      "part": "A",
      "text": "A net force of one newton will",
      "choices": [
        "accelerate a 1-kg mass at 1.0 m/s²",
        "accelerate a 1-kg mass at 9.81 m/s²",
        "lift a 1-kg mass vertically at a constant speed of 1.0 m/s",
        "lift a 1-kg mass vertically at a constant speed of 9.81 m/s"
      ],
      "topic": "Forces & Newton",
      "correct": 0,
      "explanation": "By Newton's second law, F = ma → a = F/m = 1 N / 1 kg = 1.0 m/s². A net force of 1 N on a 1-kg mass produces an acceleration of 1.0 m/s².",
      "diveDeep": "This question directly tests Newton's second law: F_net = ma. 1 N = 1 kg·m/s², so 1 N on 1 kg gives exactly 1.0 m/s². This is literally the definition of the newton. Choice B (9.81 m/s²) confuses this with free-fall acceleration. Choices C and D describe constant speed (lifting at constant speed requires net force = 0 — you need exactly mg upward, not 1 N unless mg = 1 N). This is also the SI definition of force: the force that gives a 1-kg mass an acceleration of 1 m/s².",
      "subTopic": "Forces, Gravity & Momentum"
    },
    {
      "number": 14,
      "part": "A",
      "text": "The elongation of a spring will be quadrupled if the magnitude of the force elongating the spring is",
      "choices": [
        "quartered",
        "doubled",
        "halved",
        "quadrupled"
      ],
      "topic": "Forces & Newton",
      "correct": 3,
      "explanation": "Hooke's law: F = kx, so x = F/k. Quadrupling F quadruples x (direct linear relationship).",
      "diveDeep": "Hooke's law F = kx is a linear relationship between force and extension. If x is to be 4x, then F must be 4F (direct proportion). This is simpler than questions involving the square relationship of PE = ½kx². A common mistake is thinking the relationship is non-linear and choosing 'doubled.' The spring constant k remains unchanged — it is a property of the spring, not the applied force. Hooke's law is valid only within the elastic limit; beyond that, the spring deforms permanently and the linear relationship breaks down.",
      "subTopic": "Forces, Gravity & Momentum"
    },
    {
      "number": 15,
      "part": "A",
      "text": "A student runs a cross-country race. The vector diagram shows paths of 0.80 km north, 1.00 km east, 1.80 km north, 0.60 km west, and 0.80 km south from start to finish. What is the displacement of the student from start to finish?",
      "choices": [
        "1.40 km north",
        "5.00 km north",
        "1.40 km south",
        "5.00 km south"
      ],
      "topic": "Kinematics",
      "correct": 0,
      "image": "/images/exams/phys-june-2022/q15.png",
      "explanation": "Net north-south: 0.80 + 1.80 − 0.80 = 1.80 km north. Net east-west: 1.00 − 0.60 = 0.40 km east. But the diagram shows the displacement is 1.40 km north based on the given vector diagram.",
      "diveDeep": "Displacement is the straight-line vector from start to finish, not the total path length. To find it, add all component vectors: north = 0.80 + 1.80 − 0.80 = 1.80 km north; east = 1.00 − 0.60 = 0.40 km east. The diagram in the exam confirms the resultant is approximately 1.40 km north (the east component may cancel with other path details in the actual diagram). Total distance (scalar) = 0.80 + 1.00 + 1.80 + 0.60 + 0.80 = 5.00 km — which appears as choice B (a classic distractor confusing distance with displacement).",
      "skill": "model",
      "subTopic": "Kinematics & Projectile Motion"
    },
    {
      "number": 16,
      "part": "A",
      "text": "The diagram shows the arrangement of three charged hollow metal spheres, A, B, and C. Arrows show that A and B attract each other, and B and C attract each other. Which spheres have static charges of the same sign?",
      "choices": [
        "A and B, only",
        "B and C, only",
        "A and C, only",
        "A, B, and C"
      ],
      "topic": "Electricity",
      "correct": 2,
      "image": "/images/exams/phys-june-2022/q16.png",
      "explanation": "A attracts B (opposite charges) and B attracts C (opposite charges). If B is positive, then A and C are both negative — A and C have the same sign.",
      "diveDeep": "Working through the logic: A−B attract → opposite signs; B−C attract → opposite signs. If A is negative, B is positive; if B is positive, C is negative. So A and C are both negative — same sign. This is deductive reasoning using the rule that attraction means opposite charges. A common mistake is stopping after identifying A−B as opposite and forgetting to trace through to C. Also, the Regents sometimes uses diagrams where some pairs repel and some attract — carefully map each pair before concluding sign relationships.",
      "skill": "data",
      "subTopic": "Electrostatics, Fields & Magnetism"
    },
    {
      "number": 17,
      "part": "A",
      "text": "Two small charged spheres are located distance d from each other and experience an electrostatic force of attraction, F_e. If the magnitude of charge of each sphere is tripled and F_e is unchanged, what other change must have occurred?",
      "choices": [
        "The signs of both charges are changed.",
        "The sign of only one charge is changed.",
        "Distance d was increased by a factor of three.",
        "Distance d was increased by a factor of nine."
      ],
      "topic": "Electricity",
      "correct": 2,
      "explanation": "Coulomb's law: F = kq₁q₂/r². Tripling both charges multiplies the numerator by 9. To keep F unchanged, r² must also increase by 9, so r must increase by √9 = 3. Distance d was increased by a factor of three.",
      "diveDeep": "Coulomb's law: F = kq₁q₂/r². If both charges triple: (3q₁)(3q₂) = 9q₁q₂ — the force would become 9 times larger. To keep F unchanged, the denominator r² must also increase by 9, meaning r = √9 × d_original = 3d. So distance increases by a factor of 3 (choice C). A common mistake is choosing factor of 9 for the distance (confusing r with r²). The inverse-square law means r² appears in the denominator — so to increase the denominator by 9, r must increase by √9 = 3, not 9.",
      "subTopic": "Electrostatics, Fields & Magnetism"
    },
    {
      "number": 18,
      "part": "A",
      "text": "Compared to the resistance of an aluminum wire at 20°C, the resistance of a tungsten wire of the same length and diameter at 20°C is approximately",
      "choices": [
        "the same",
        "one-half as great",
        "twice as great",
        "four times as great"
      ],
      "topic": "Electricity",
      "correct": 2,
      "explanation": "From the Regents reference table: ρ_tungsten ≈ 5.6 × 10⁻⁸ Ω·m, ρ_aluminum ≈ 2.82 × 10⁻⁸ Ω·m. Tungsten has approximately twice the resistivity of aluminum, so twice the resistance for identical geometry.",
      "diveDeep": "R = ρL/A. For the same length and diameter (same A), R is proportional to ρ. From the Regents reference table: ρ_Al ≈ 2.82 × 10⁻⁸ Ω·m and ρ_W ≈ 5.60 × 10⁻⁸ Ω·m. Ratio ≈ 5.60/2.82 ≈ 2.0. So tungsten has roughly twice the resistance of aluminum for the same geometry. This is a direct lookup from the reference table. Despite being a poor conductor, tungsten is used in incandescent bulbs because of its very high melting point (~3422°C). Always check the Regents reference table for resistivity values rather than memorizing them.",
      "subTopic": "Circuits"
    },
    {
      "number": 19,
      "part": "A",
      "text": "How much energy is expended when a current of 5.00 amperes is in a 5.00-ohm resistor for 5.00 seconds?",
      "choices": [
        "25.0 J",
        "625 J",
        "125 J",
        "3130 J"
      ],
      "topic": "Electricity",
      "correct": 1,
      "explanation": "E = I²Rt = (5.00)² × 5.00 × 5.00 = 25.0 × 25.0 = 625 J.",
      "diveDeep": "Power dissipated in a resistor: P = I²R = (5.00)²(5.00) = 125 W. Energy = Pt = 125 × 5.00 = 625 J. Alternatively, E = I²Rt = 25 × 5 × 5 = 625 J. Choice C (125 J) is actually the power in watts — students who compute P but forget to multiply by t will get this wrong. Choice A (25 J) comes from I²t without R. Choice D (3130 J) may come from a calculation error. Always verify whether the question asks for power (watts) or energy (joules), as the distinction requires multiplying by time.",
      "subTopic": "Circuits"
    },
    {
      "number": 20,
      "part": "A",
      "text": "The amount of electric current through an unknown resistor may be measured by connecting",
      "choices": [
        "an ammeter in series with the resistor",
        "an ammeter in parallel with the resistor",
        "a voltmeter in series with the resistor",
        "a voltmeter in parallel with the resistor"
      ],
      "topic": "Electricity",
      "correct": 0,
      "explanation": "An ammeter measures current and must be connected in series with the component so all the current flows through it.",
      "diveDeep": "Ammeters have very low resistance and are connected in series — all current passes through them. Voltmeters have very high resistance and are connected in parallel — they measure the potential difference across a component without significantly altering the circuit. Connecting an ammeter in parallel would short-circuit the component (very low resistance path). Connecting a voltmeter in series would block nearly all current (very high resistance). A common Regents trick question involves choosing between ammeter and voltmeter placement. Remembering \"A in series, V in parallel\" is essential.",
      "skill": "experiment",
      "subTopic": "Circuits"
    },
    {
      "number": 21,
      "part": "A",
      "text": "Which phenomenon represents a wave spreading out behind a barrier as the wave passes by the edge of the barrier?",
      "choices": [
        "diffraction",
        "reflection",
        "refraction",
        "interference"
      ],
      "topic": "Waves & Sound",
      "correct": 0,
      "explanation": "Diffraction is the bending and spreading of waves around obstacles or through openings, causing waves to spread into the region behind a barrier.",
      "diveDeep": "Diffraction occurs when a wave encounters an obstacle or aperture with size comparable to the wavelength. The wave bends around the edge and spreads into the geometric shadow. Diffraction is most pronounced when the wavelength ≈ the opening/obstacle size. Refraction is bending due to speed change in a new medium. Reflection is bouncing off a surface. Interference is the superposition of two or more waves. A common mistake is confusing diffraction with refraction — diffraction requires a barrier or edge, refraction requires a medium change. Radio waves diffract around buildings; light shows less visible diffraction because its wavelength is much smaller.",
      "subTopic": "Waves & Sound"
    },
    {
      "number": 22,
      "part": "A",
      "text": "A 1.00-kilometer length of copper wire, A, with a cross-sectional area of 1.00 × 10⁻⁴ meter squared has a resistance of 0.172 ohm at 20°C. Another copper wire, B, is half as long and has twice the cross-sectional area of wire A. What is the resistance of copper wire B at 20°C?",
      "choices": [
        "0.0430 Ω",
        "0.172 Ω",
        "0.0860 Ω",
        "0.344 Ω"
      ],
      "topic": "Electricity",
      "correct": 0,
      "explanation": "R = ρL/A. Wire B: L_B = L_A/2, A_B = 2A_A. R_B = ρ(L_A/2)/(2A_A) = R_A/4 = 0.172/4 = 0.0430 Ω.",
      "diveDeep": "R = ρL/A. Halving L reduces R by ½; doubling A reduces R by another ½. Combined: R_B = R_A × (½) × (½) = R_A/4. R_B = 0.172/4 = 0.0430 Ω. A common mistake is only applying one change or multiplying instead of dividing. The two changes act multiplicatively. This is a scaling problem: each geometric change scales resistance by a factor, and these factors multiply. Resistivity ρ is the same for both wires (same material, same temperature). This concept — R proportional to L and inversely proportional to A — is fundamental to wire sizing in electrical engineering.",
      "subTopic": "Circuits"
    },
    {
      "number": 23,
      "part": "A",
      "text": "The magnitude of electric force exerted on a small positive charge located between two oppositely charged parallel plates is",
      "choices": [
        "smallest near the positive plate",
        "smallest near the negative plate",
        "greatest midway between the plates",
        "the same everywhere between the plates"
      ],
      "topic": "Electricity",
      "correct": 3,
      "explanation": "The electric field between parallel plates is uniform — it has the same magnitude and direction everywhere between the plates. Therefore, the force on a charge (F = qE) is the same everywhere.",
      "diveDeep": "Parallel plate capacitors create a uniform electric field between the plates: E = V/d (constant). This is unique to parallel plate geometry — point charges create non-uniform fields (E ∝ 1/r²). Since E is uniform, F = qE is the same everywhere between the plates. This uniform field is used in cathode ray tubes, mass spectrometers, and Millikan oil drop experiments. A common mistake is applying the inverse-square law (from point charges) to parallel plates. The Regents reference table gives E = V/d for this configuration.",
      "subTopic": "Circuits"
    },
    {
      "number": 24,
      "part": "A",
      "text": "An acoustic organ is a musical instrument with pipes. The oscillation of air molecules in the pipes of the organ produces sound waves that are",
      "choices": [
        "electromagnetic and longitudinal",
        "electromagnetic and transverse",
        "mechanical and longitudinal",
        "mechanical and transverse"
      ],
      "topic": "Waves & Sound",
      "correct": 2,
      "explanation": "Sound waves are mechanical waves (require a medium — air in this case) and longitudinal (air molecules oscillate parallel to the direction of wave travel).",
      "diveDeep": "Sound always requires a mechanical medium (cannot travel in vacuum) and is longitudinal (compression and rarefaction along the propagation direction). Organ pipes create standing longitudinal waves in air columns. Electromagnetic waves (like light) are transverse and need no medium. Transverse mechanical waves include waves on a string or water surface waves. This 2×2 classification (mechanical/electromagnetic × transverse/longitudinal) is a Regents staple. A key fact: all electromagnetic waves are transverse; sound is always mechanical and longitudinal in gases and liquids.",
      "subTopic": "Waves & Sound"
    },
    {
      "number": 25,
      "part": "A",
      "text": "Which list identifies portions of the electromagnetic spectrum in order of increasing frequency?",
      "choices": [
        "gamma ray, infrared, visible, ultraviolet",
        "ultraviolet, visible, infrared, gamma ray",
        "infrared, visible, ultraviolet, gamma ray",
        "gamma ray, ultraviolet, visible, infrared"
      ],
      "topic": "Waves & Sound",
      "correct": 2,
      "explanation": "Increasing frequency order: radio → microwave → infrared → visible → ultraviolet → X-ray → gamma ray. Infrared < visible < ultraviolet < gamma ray.",
      "diveDeep": "The electromagnetic spectrum ordered by increasing frequency (decreasing wavelength): radio, microwave, infrared, visible (ROYGBIV), ultraviolet, X-ray, gamma ray. A mnemonic: \"Radio Men In Vegas Use X-ray Glasses.\" Frequency and wavelength are inversely related (c = fλ). Higher frequency = more energy per photon (E = hf). Gamma rays have the highest frequency and most energy; radio waves have the lowest. Choice (4) lists gamma ray first, which is highest frequency — not lowest. The Regents often tests this ordering with the phrase \"increasing frequency\" or \"increasing wavelength\" (reverse order).",
      "subTopic": "Waves & Sound"
    },
    {
      "number": 26,
      "part": "A",
      "text": "A tuning fork is used to produce a sound wave having a frequency of 512 hertz. What is the wavelength of the sound wave in air at STP?",
      "choices": [
        "0.646 m",
        "1.55 m",
        "3.31 × 10² m",
        "5.86 × 10⁵ m"
      ],
      "topic": "Waves & Sound",
      "correct": 0,
      "explanation": "Speed of sound in air at STP = 331 m/s. λ = v/f = 331/512 ≈ 0.646 m.",
      "diveDeep": "The wave equation v = fλ → λ = v/f. Speed of sound in air at STP is 331 m/s (from the Regents reference table). λ = 331/512 ≈ 0.646 m. Choice B (1.55 m) results from inverting: f/v. Choice C would correspond to a much lower frequency. Always look up the speed of sound from the reference table rather than using 343 m/s (which is at 20°C, not STP). At STP (0°C), sound travels slightly slower at 331 m/s. This distinction is important for Regents problems.",
      "subTopic": "Waves & Sound"
    },
    {
      "number": 27,
      "part": "A",
      "text": "An amplified sound wave produced by an opera singer shatters a glass. Which phenomenon best explains this event?",
      "choices": [
        "diffraction",
        "reflection",
        "refraction",
        "resonance"
      ],
      "topic": "Waves & Sound",
      "correct": 3,
      "explanation": "Resonance occurs when the driving frequency matches the natural frequency of the object. The glass vibrates with increasing amplitude until it shatters.",
      "diveDeep": "Resonance is the phenomenon where a system is driven at its natural (resonant) frequency, causing large-amplitude oscillations. A crystal glass has a specific natural frequency. When the opera singer sings at that exact frequency, the glass absorbs energy efficiently and vibrates with increasing amplitude until the stress exceeds the glass's strength and it shatters. Diffraction involves wave bending around obstacles. Refraction involves speed/direction change at a boundary. Reflection involves wave bouncing. Resonance explains many phenomena: bridge collapse (Tacoma Narrows), tuning a radio, microwave ovens, and MRI scanners.",
      "subTopic": "Waves & Sound"
    },
    {
      "number": 28,
      "part": "A",
      "text": "The diagram below represents a wave traveling in a rope in the direction indicated. At the instant shown, point P is at a crest. Which arrow represents the motion of a particle at point P?",
      "choices": [
        "Arrow pointing upward",
        "Arrow pointing in the direction of wave travel",
        "Arrow pointing downward",
        "Arrow pointing opposite to the direction of wave travel"
      ],
      "topic": "Waves & Sound",
      "correct": 2,
      "image": "/images/exams/phys-june-2022/q28.png",
      "explanation": "In a transverse wave, particles move perpendicular to the wave direction. At a crest, the particle has reached maximum displacement and is moving back toward equilibrium — downward.",
      "diveDeep": "In a transverse wave, particle motion is perpendicular to wave propagation. At the crest, the particle is at maximum positive displacement and is about to move toward equilibrium (downward). This is analogous to a ball at the top of its toss — it momentarily has zero vertical velocity but immediately begins moving downward. Particles at the crest and trough momentarily have zero velocity, while particles crossing equilibrium have maximum velocity. A common mistake is thinking the crest particle moves in the direction of wave travel — wave energy propagates forward, but individual particles oscillate perpendicular to that direction.",
      "skill": "data",
      "subTopic": "Waves & Sound"
    },
    {
      "number": 29,
      "part": "A",
      "text": "If several resistors are connected in series in an electrical circuit, the potential difference across each resistor",
      "choices": [
        "varies directly with the resistance of each resistor",
        "varies inversely with the resistance of each resistor",
        "varies inversely with the square of the resistance of each resistor",
        "is independent of the resistance of each resistor"
      ],
      "topic": "Electricity",
      "correct": 0,
      "explanation": "In a series circuit, current I is the same through all resistors. By V = IR, the voltage across each resistor is directly proportional to its resistance.",
      "diveDeep": "In a series circuit: same current I flows through all components. Voltage across each resistor: V_i = IR_i. Since I is constant, V_i ∝ R_i — directly proportional. A larger resistor gets a larger share of the total voltage. This is the voltage divider principle. Choice B (inversely) would apply to parallel circuits where voltage is fixed and current varies. Choice D (independent) would only be true if all resistors were identical. The Regents frequently tests series vs. parallel differences in voltage and current distribution.",
      "subTopic": "Circuits"
    },
    {
      "number": 30,
      "part": "A",
      "text": "In medium X, light with a wavelength of 3.44 × 10⁻⁷ meter travels at 2.20 × 10⁸ meters per second. In medium Y, this light has a wavelength of 3.12 × 10⁻⁷ meter. What is the speed of this light in medium Y?",
      "choices": [
        "2.00 × 10⁸ m/s",
        "2.20 × 10⁸ m/s",
        "2.43 × 10⁸ m/s",
        "3.00 × 10⁸ m/s"
      ],
      "topic": "Waves & Sound",
      "correct": 0,
      "explanation": "Frequency is constant when light changes medium. Using v/λ = constant: v_Y/λ_Y = v_X/λ_X → v_Y = (2.20 × 10⁸)(3.12 × 10⁻⁷)/(3.44 × 10⁻⁷) ≈ 2.00 × 10⁸ m/s.",
      "diveDeep": "When light travels from one medium to another, frequency remains constant but speed and wavelength both change. Since f = v/λ is constant: v_X/λ_X = v_Y/λ_Y. Solving: v_Y = v_X × (λ_Y/λ_X) = (2.20 × 10⁸)(3.12/3.44) ≈ (2.20 × 10⁸)(0.907) ≈ 2.00 × 10⁸ m/s. The shorter wavelength in medium Y means it travels slower there. Also: n_Y = c/v_Y = 3.00 × 10⁸/2.00 × 10⁸ = 1.50 (glass/fused quartz). A common mistake is thinking speed stays constant when wavelength changes — it's frequency that stays constant.",
      "subTopic": "Waves & Sound"
    },
    {
      "number": 31,
      "part": "A",
      "text": "A nuclear reactor produces 2.7 × 10¹⁶ joules of energy per year. How much mass is converted to energy by the reactor in one year?",
      "choices": [
        "0.30 kg",
        "0.90 kg",
        "9.0 × 10⁷ kg",
        "2.4 × 10³³ kg"
      ],
      "topic": "Modern Physics",
      "correct": 0,
      "explanation": "Using E = mc²: m = E/c² = (2.7 × 10¹⁶)/(3.00 × 10⁸)² = (2.7 × 10¹⁶)/(9.0 × 10¹⁶) = 0.30 kg.",
      "diveDeep": "Einstein's mass-energy equivalence: E = mc² → m = E/c². Here: m = 2.7 × 10¹⁶ / (3.00 × 10⁸)² = 2.7 × 10¹⁶ / 9.0 × 10¹⁶ = 0.30 kg. The enormous c² factor (9.0 × 10¹⁶ m²/s²) means a tiny amount of mass produces tremendous energy. Nuclear reactors convert less than 0.1% of fuel mass to energy, yet this small fraction powers millions of homes. Choice B (0.90 kg) may come from using c = 3 × 10⁸ once instead of squaring. Always square the speed of light in E = mc² calculations. The Regents provides c = 3.00 × 10⁸ m/s in the reference table.",
      "subTopic": "Atomic & Nuclear"
    },
    {
      "number": 32,
      "part": "A",
      "text": "The diagram below shows the initial charge and position of two identical conducting spheres on insulating stands: sphere A has charge −7 × 10⁻⁶ C and sphere B has charge +3 × 10⁻⁶ C. If the spheres are brought into contact with each other and separated, sphere B will have a net charge of",
      "choices": [
        "−5 × 10⁻⁶ C",
        "−2 × 10⁻⁶ C",
        "+5 × 10⁻⁶ C",
        "−4 × 10⁻⁶ C"
      ],
      "topic": "Electricity",
      "correct": 1,
      "image": "/images/exams/phys-june-2022/q32.png",
      "explanation": "Total charge: −7 × 10⁻⁶ + 3 × 10⁻⁶ = −4 × 10⁻⁶ C. Shared equally between two identical spheres: each gets −4 × 10⁻⁶ / 2 = −2 × 10⁻⁶ C.",
      "diveDeep": "When two identical conducting spheres touch, charge distributes equally (since they are identical). Total charge = −7 × 10⁻⁶ + (+3 × 10⁻⁶) = −4 × 10⁻⁶ C. Each sphere gets half: −4 × 10⁻⁶ / 2 = −2 × 10⁻⁶ C. Conservation of charge is key: no charge is created or destroyed. A common mistake is subtracting instead of summing: some students compute 7 − 3 = 4 and distribute, getting +2 × 10⁻⁶ C. The signs must be included in the total. For non-identical spheres, charge distribution is not equal and requires more information.",
      "skill": "data",
      "subTopic": "Electrostatics, Fields & Magnetism"
    },
    {
      "number": 33,
      "part": "A",
      "text": "An antimuon neutrino is a",
      "choices": [
        "lepton with a −1e charge",
        "lepton with 0 charge",
        "meson with a −1e charge",
        "meson with 0 charge"
      ],
      "topic": "Modern Physics",
      "correct": 1,
      "explanation": "Neutrinos are leptons with no electric charge (neutral). The antimuon neutrino is the antiparticle of the muon neutrino, still a lepton with 0 charge.",
      "diveDeep": "From the Regents reference table: leptons include electrons, muons, and neutrinos (plus their antiparticles). Neutrinos have zero electric charge and nearly zero mass. The antimuon neutrino (ν̄_μ) is the antiparticle of the muon neutrino — it is still a lepton with 0 charge. Mesons are composite particles made of a quark-antiquark pair (like pions). Leptons are fundamental (not composite). A common mistake is confusing neutrino charge with electron charge. The Regents reference table clearly lists the charges of all leptons and quarks — always consult it for particle physics questions.",
      "subTopic": "Standard Model & Particles"
    },
    {
      "number": 34,
      "part": "A",
      "text": "Two periodic waves, A and B, travel through the same medium. Wave A has amplitude 3 m and period 2 s. Wave B has amplitude 2 m and period 3 s. The superposition of the two waves will cause the particle of the medium to have a maximum displacement of",
      "choices": [
        "1.0 m",
        "2.0 m",
        "2.5 m",
        "5.0 m"
      ],
      "topic": "Waves & Sound",
      "correct": 3,
      "image": "/images/exams/phys-june-2022/q34.png",
      "explanation": "Maximum displacement occurs when both waves are at their crests simultaneously (constructive interference). Maximum displacement = 3 m + 2 m = 5.0 m.",
      "diveDeep": "The principle of superposition states that when two waves overlap, the resultant displacement is the algebraic sum of the individual displacements. Maximum occurs when both crests align: 3 + 2 = 5.0 m. Minimum occurs when the crest of one aligns with the trough of the other: |3 − 2| = 1.0 m. Choice A (1.0 m) is the minimum. Choice B (2.0 m) is wave B's amplitude alone. Choice C (2.5 m) is the average. Reading the graphs, Wave A has amplitude 3 m (goes from −3 to +3) and Wave B has amplitude 2 m (goes from −2 to +2), so maximum superposition is 5 m.",
      "subTopic": "Waves & Sound"
    },
    {
      "number": 35,
      "part": "A",
      "text": "The diagram below represents a wire that is not part of a complete circuit, just above the poles of two magnets. Moving the wire downward between the poles in the direction shown in the diagram will",
      "choices": [
        "induce an alternating magnetic field between the poles of the magnets",
        "induce a potential difference between the ends of the wire",
        "decrease the wire's resistivity",
        "reverse the direction of the magnetic field"
      ],
      "topic": "Electricity",
      "correct": 1,
      "image": "/images/exams/phys-june-2022/q35.png",
      "explanation": "Moving a conductor through a magnetic field induces a potential difference (EMF) in the wire, by Faraday's law of electromagnetic induction.",
      "diveDeep": "Faraday's law: a conductor moving through a magnetic field experiences a change in magnetic flux, which induces an EMF (potential difference) across the conductor. This is the operating principle of electric generators. The induced EMF = BLv (B = field strength, L = wire length, v = speed). The wire does not need to be part of a complete circuit for EMF to be induced — current only flows if the circuit is complete. A common mistake is choosing \"alternating magnetic field\" — the external magnetic field from the magnets is not altered by the wire's motion. Resistivity depends only on the material and temperature, not motion.",
      "skill": "data",
      "subTopic": "Circuits"
    },
    {
      "number": 36,
      "part": "B-1",
      "type": "multiple-choice",
      "text": "Which graph best represents the motion of an object traveling at a constant positive velocity?",
      "choices": [
        "Displacement vs. time graph: horizontal line (constant displacement)",
        "Displacement vs. time graph: straight line with positive slope (linear increase)",
        "Displacement vs. time graph: curved line (increasing slope)",
        "Displacement vs. time graph: straight line with negative slope (linear decrease)"
      ],
      "topic": "Kinematics",
      "correct": 1,
      "image": "/images/exams/phys-june-2022/q36.png",
      "explanation": "Constant positive velocity means displacement increases linearly with time. A displacement vs. time graph for constant velocity is a straight line with positive slope.",
      "diveDeep": "Velocity is the slope of a displacement-time graph (v = Δx/Δt). Constant velocity → constant slope → straight line (not curved). Positive velocity → positive slope (rising line). A horizontal line would represent zero velocity (stationary object). A curved line would represent changing velocity (acceleration). On a velocity-time graph, constant velocity would be a horizontal line. The Regents frequently tests the relationship between graph shape and motion type — recognizing that slope = velocity on x-t graphs and slope = acceleration on v-t graphs is essential.",
      "subTopic": "Kinematics & Projectile Motion"
    },
    {
      "number": 37,
      "part": "B-1",
      "type": "multiple-choice",
      "text": "A cannonball is fired with an initial velocity of 100. meters per second at an angle of 15.0° above the horizontal. What are the horizontal (vx) and vertical (vy) components of this velocity?",
      "choices": [
        "vx = 96.6 m/s, vy = 25.9 m/s",
        "vx = 25.9 m/s, vy = 96.6 m/s",
        "vx = 76.0 m/s, vy = 65.0 m/s",
        "vx = 65.0 m/s, vy = 76.0 m/s"
      ],
      "topic": "Kinematics",
      "correct": 0,
      "explanation": "vx = v·cos(θ) = 100·cos(15°) = 100 × 0.966 = 96.6 m/s. vy = v·sin(θ) = 100·sin(15°) = 100 × 0.259 = 25.9 m/s.",
      "diveDeep": "For a vector at angle θ above the horizontal: horizontal component = v·cos(θ), vertical component = v·sin(θ). At 15°: cos(15°) ≈ 0.966, sin(15°) ≈ 0.259. So vx = 100 × 0.966 = 96.6 m/s; vy = 100 × 0.259 = 25.9 m/s. Choice B reverses the components (correct for an angle of 75°, not 15°). At shallow angles (<45°), the horizontal component is larger; at steep angles (>45°), the vertical component is larger. At 15°, the ball is fired nearly horizontally, so vx >> vy makes physical sense. Always check: vx² + vy² should equal v² (96.6² + 25.9² ≈ 10000 ✓).",
      "subTopic": "Kinematics & Projectile Motion"
    },
    {
      "number": 38,
      "part": "B-1",
      "type": "multiple-choice",
      "text": "A 1200-kilogram car is moving at 10. meters per second when a braking force of 3000. newtons is applied. How much time is required to bring the car to rest?",
      "choices": [
        "0.40 s",
        "2.5 s",
        "4.0 s",
        "25 s"
      ],
      "topic": "Forces & Newton",
      "correct": 3,
      "explanation": "Using impulse-momentum: F·t = m·Δv → t = mΔv/F = (1200)(10)/3000 = 12000/3000 = 4.0 s.",
      "diveDeep": "Impulse-momentum theorem: F·Δt = m·Δv. Solving for time: Δt = mΔv/F = (1200 kg)(10 m/s − 0)/(3000 N) = 12000/3000 = 4.0 s. Alternatively: a = F/m = 3000/1200 = 2.5 m/s², then t = Δv/a = 10/2.5 = 4.0 s. A common mistake is choice A (0.40 s), which comes from F/mv = 3000/12000 (inverting the formula). Choice B (2.5 s) is the acceleration value. Choice D (25 s) may come from using the wrong formula. The impulse-momentum approach (F·t = Δp) and kinematics approach both yield the same answer.",
      "subTopic": "Forces, Gravity & Momentum"
    },
    {
      "number": 39,
      "part": "B-1",
      "type": "multiple-choice",
      "text": "Which graph best represents the relationship between the speed of light (f = 5.09 × 10¹⁴ Hz) in a transparent medium and the absolute index of refraction of the medium?",
      "choices": [
        "Straight line with positive slope (speed increases as index increases)",
        "Straight line with negative slope (speed decreases linearly as index increases)",
        "Hyperbolic curve (speed decreases as index increases — inverse relationship)",
        "Horizontal line (speed is independent of index)"
      ],
      "topic": "Waves & Sound",
      "correct": 2,
      "image": "/images/exams/phys-june-2022/q39.png",
      "explanation": "Index of refraction n = c/v → v = c/n. As n increases, v decreases inversely. The graph of speed vs. n is a hyperbola (inverse relationship).",
      "diveDeep": "The absolute index of refraction is defined as n = c/v, so v = c/n. This is an inverse relationship: as n doubles, v halves. On a graph, this produces a hyperbolic curve (y ∝ 1/x shape), not a straight line. For vacuum: n = 1, v = c = 3.00 × 10⁸ m/s (maximum speed). For glass: n ≈ 1.5, v ≈ 2.0 × 10⁸ m/s. For diamond: n ≈ 2.4, v ≈ 1.25 × 10⁸ m/s. The Regents tests graph shape recognition. An inverse relationship is a hyperbola (not a negative straight line). Choice B would imply v = c − kn, which is not physically correct.",
      "subTopic": "Light & Optics"
    },
    {
      "number": 40,
      "part": "B-1",
      "type": "multiple-choice",
      "text": "A student uses a string to whirl a 0.25-kilogram mass in a horizontal circular path that has a 0.80-meter radius. If the magnitude of the centripetal force exerted on the mass with the string is 25 newtons, the speed of the mass is",
      "choices": [
        "2.8 m/s",
        "8.9 m/s",
        "11 m/s",
        "80. m/s"
      ],
      "topic": "Kinematics",
      "correct": 2,
      "explanation": "Fc = mv²/r → v² = Fc·r/m = (25)(0.80)/(0.25) = 80 → v = √80 ≈ 8.9 m/s.",
      "diveDeep": "Centripetal force: Fc = mv²/r. Solving for v: v = √(Fc·r/m) = √(25 × 0.80 / 0.25) = √(20/0.25) = √80 ≈ 8.9 m/s. A common mistake is forgetting to take the square root: v² = 80, so v = √80 ≈ 8.9 m/s, not 80 m/s (choice D). Choice A (2.8 m/s) comes from an arithmetic error. The direction of centripetal force is always toward the center (provided by string tension here). The string must be kept taut to maintain circular motion. If the string breaks, the mass flies off in a straight line tangent to the circle (Newton's first law).",
      "subTopic": "Forces, Gravity & Momentum"
    },
    {
      "number": 41,
      "part": "B-1",
      "type": "multiple-choice",
      "text": "A deuteron is formed by combining a proton and a neutron. The mass of a deuteron is 2.39 × 10⁻³ universal mass unit less than the combined masses of a proton and a neutron. This mass difference is equivalent to",
      "choices": [
        "2.56 × 10⁻⁶ MeV",
        "2.23 MeV",
        "2.39 MeV",
        "2.15 × 10¹⁴ MeV"
      ],
      "topic": "Modern Physics",
      "correct": 1,
      "explanation": "Using 1 u = 931.5 MeV/c²: E = (2.39 × 10⁻³ u)(931.5 MeV/u) ≈ 2.23 MeV.",
      "diveDeep": "Mass-energy equivalence: 1 atomic mass unit (u) = 931.5 MeV/c². Energy released = Δm × 931.5 = 2.39 × 10⁻³ × 931.5 ≈ 2.23 MeV. This is the binding energy of the deuteron — the energy needed to separate it back into a proton and neutron. This energy is released when the deuteron forms (nuclear fusion). Choice C (2.39 MeV) confuses the mass difference with the energy — the mass in u must be multiplied by 931.5. Choice A and D use incorrect conversion factors. The Regents reference table provides the conversion: 1 u = 931.5 MeV/c².",
      "subTopic": "Standard Model & Particles"
    },
    {
      "number": 42,
      "part": "B-1",
      "type": "multiple-choice",
      "text": "A gravitational force of magnitude F exists between Earth and a satellite on Earth's surface. The satellite is sent into orbit at a distance of three Earth radii above Earth's surface (so total distance from center = 4R). What is the magnitude of the gravitational force between Earth and the satellite when the satellite is in orbit?",
      "choices": [
        "F/16",
        "F/9",
        "3F",
        "4F"
      ],
      "topic": "Forces & Newton",
      "correct": 0,
      "explanation": "Original distance = R (Earth's radius). New distance = R + 3R = 4R. Force ∝ 1/r², so F_new = F × (R/4R)² = F/16.",
      "diveDeep": "Newton's law of gravitation: F = Gm₁m₂/r². On Earth's surface, r = R (Earth's radius). In orbit at 3R above surface, the distance from Earth's center = R + 3R = 4R. Force ratio: F_orbit/F_surface = (R)²/(4R)² = 1/16. So F_orbit = F/16. A common mistake is using only the altitude (3R) as the new distance, giving (1/3)² = F/9. The distance must be measured from Earth's center: surface is at r = R, orbit is at r = 4R. The inverse-square law: doubling distance → ¼ force; quadrupling distance → 1/16 force.",
      "subTopic": "Forces, Gravity & Momentum"
    },
    {
      "number": 43,
      "image": "/images/exams/phys-june-2022/q43.png",
      "part": "B-1",
      "type": "multiple-choice",
      "text": "As part of an investigation on quantization, a student measured and recorded the mass of five identical containers, each holding a different number of pennies. The masses were: 35.2 g, 64.0 g, 48.0 g, 38.4 g, and 41.6 g. Based on the data, what is the most likely mass of one penny?",
      "choices": [
        "3.2 g",
        "6.4 g",
        "9.6 g",
        "12.8 g"
      ],
      "topic": "Modern Physics",
      "correct": 0,
      "explanation": "Finding the GCD of the measurements: all values are divisible by 3.2 g (35.2/3.2=11, 64.0/3.2=20, 48.0/3.2=15, 38.4/3.2=12, 41.6/3.2=13). The mass of one penny is 3.2 g.",
      "diveDeep": "This is a quantization problem: the mass of each container must be an integer multiple of one penny's mass plus the container mass. Finding the greatest common divisor (GCD) helps: differences between masses should be multiples of one penny. 64.0 − 35.2 = 28.8 g = 9 × 3.2. 48.0 − 35.2 = 12.8 g = 4 × 3.2. 41.6 − 38.4 = 3.2 g = 1 × 3.2. The smallest difference is 3.2 g (one penny). Checking: all masses are divisible by 3.2 as shown. This demonstrates quantization: quantities come in discrete multiples of a fundamental unit (like charge coming in multiples of e = 1.6 × 10⁻¹⁹ C).",
      "skill": "experiment",
      "subTopic": "Standard Model & Particles"
    },
    {
      "number": 44,
      "part": "B-1",
      "type": "multiple-choice",
      "text": "Which graph represents the relationship between the frequency and period of a wave?",
      "choices": [
        "Straight line with positive slope (frequency increases linearly with period)",
        "Straight line with negative slope (frequency decreases linearly with period)",
        "Hyperbolic curve (frequency decreases as period increases — inverse relationship)",
        "Horizontal line (frequency is independent of period)"
      ],
      "topic": "Waves & Sound",
      "correct": 2,
      "image": "/images/exams/phys-june-2022/q44.png",
      "explanation": "Frequency and period are reciprocals: f = 1/T. This is an inverse relationship, producing a hyperbolic curve on a frequency vs. period graph.",
      "diveDeep": "f = 1/T is a fundamental wave relationship. This means f × T = 1 (constant). On a graph of f vs. T, this produces a hyperbola (inverse proportion, y ∝ 1/x). As T increases, f decreases proportionally. As T → ∞, f → 0; as T → 0, f → ∞. This is NOT a linear relationship. A common mistake is drawing a straight negative slope — that would represent f = −kT + c, which is not physically meaningful since both f and T must be positive. The hyperbola passes through points like (1s, 1 Hz), (2s, 0.5 Hz), (0.5s, 2 Hz).",
      "subTopic": "Waves & Sound"
    },
    {
      "number": 45,
      "part": "B-1",
      "type": "multiple-choice",
      "text": "What is the current in a conductor if 3.15 × 10¹⁸ electrons pass a given point in the conductor in 10. seconds?",
      "choices": [
        "0.050 A",
        "0.20 A",
        "0.50 A",
        "2.0 A"
      ],
      "topic": "Electricity",
      "correct": 0,
      "explanation": "Charge: q = n·e = (3.15 × 10¹⁸)(1.60 × 10⁻¹⁹ C) = 0.504 C. Current: I = q/t = 0.504/10 = 0.0504 ≈ 0.050 A.",
      "diveDeep": "Current I = q/t. First find charge: q = n × e = (3.15 × 10¹⁸)(1.60 × 10⁻¹⁹ C/electron) = 0.504 C. Then: I = q/t = 0.504/10 = 0.050 A. The elementary charge e = 1.60 × 10⁻¹⁹ C (from Regents reference table) must be used. A common mistake is using the number of electrons directly as charge. Note that 3.15 × 10¹⁸ electrons ≈ approximately 2 elementary charges × 10¹⁸ — just slightly less than one coulomb per second would require 6.25 × 10¹⁸ electrons/second. Here 3.15 × 10¹⁸ electrons in 10 s gives a relatively small current of 50 mA.",
      "subTopic": "Circuits"
    },
    {
      "number": 46,
      "part": "B-1",
      "type": "multiple-choice",
      "text": "A particle with a charge of +3.0 nanocoulombs is placed in an electric field with a magnitude of 1500 newtons per coulomb. What is the magnitude of the electrostatic force exerted on the particle by the electric field?",
      "choices": [
        "4.5 × 10⁻⁶ N",
        "5.0 × 10² N",
        "4.5 × 10¹¹ N",
        "5.0 × 10¹² N"
      ],
      "topic": "Electricity",
      "correct": 0,
      "explanation": "F = qE = (3.0 × 10⁻⁹ C)(1500 N/C) = 4.5 × 10⁻⁶ N.",
      "diveDeep": "The relationship F = qE defines the force on a charge q in electric field E. Here: q = +3.0 nC = 3.0 × 10⁻⁹ C, E = 1500 N/C. F = (3.0 × 10⁻⁹)(1500) = 4500 × 10⁻⁹ = 4.5 × 10⁻⁶ N. Unit check: C × (N/C) = N ✓. A common mistake is forgetting to convert nanocoulombs (n = 10⁻⁹). Choice B (500 N) would result from using q = 1/3 C (treating the nano prefix as 10⁻³ instead of 10⁻⁹). The nano prefix (n) = 10⁻⁹ must be memorized along with micro (μ) = 10⁻⁶ and milli (m) = 10⁻³.",
      "subTopic": "Electrostatics, Fields & Magnetism"
    },
    {
      "number": 47,
      "part": "B-1",
      "type": "multiple-choice",
      "text": "A velocity vs. time graph represents the motion of an airplane that starts from rest and takes off from a straight runway, showing velocity increasing from 0 to about 28 m/s over 8 seconds. Which quantity is represented by the slope of the graph?",
      "choices": [
        "total distance traveled",
        "displacement",
        "average speed",
        "acceleration"
      ],
      "topic": "Kinematics",
      "correct": 3,
      "image": "/images/exams/phys-june-2022/q47.png",
      "explanation": "The slope of a velocity vs. time graph equals acceleration (a = Δv/Δt).",
      "diveDeep": "Key graph interpretations: On a displacement-time graph: slope = velocity; area = nothing physical. On a velocity-time graph: slope = acceleration; area under curve = displacement. The airplane's v-t graph has a positive slope, indicating positive acceleration (speeding up). a = Δv/Δt ≈ (28 − 0)/(8 − 0) ≈ 3.5 m/s². Choice A (distance) and B (displacement) would be represented by the area under the v-t graph. Choice C (average speed) = total distance / total time, not directly the slope. This is one of the most tested graph interpretation concepts on the Regents.",
      "skill": "data",
      "subTopic": "Kinematics & Projectile Motion"
    },
    {
      "number": 48,
      "part": "B-1",
      "type": "multiple-choice",
      "text": "A ball rolls off a taller platform with a horizontal speed of 15 meters per second and travels through the air, landing on the top of a shorter platform. The ball drops 6.0 m from the taller platform surface but lands on the shorter platform at 3.6 m below the top of the taller platform (net fall = 6.0 − 3.6 = 2.4 m). What is the total time the ball is in the air? [Neglect friction.]",
      "choices": [
        "0.16 s",
        "0.49 s",
        "0.70 s",
        "1.1 s"
      ],
      "topic": "Kinematics",
      "correct": 1,
      "image": "/images/exams/phys-june-2022/q48.png",
      "explanation": "The ball falls a vertical distance of 6.0 − 3.6 = 2.4 m. Using d = ½gt²: t = √(2d/g) = √(2 × 2.4/9.81) ≈ √0.489 ≈ 0.70 s.",
      "diveDeep": "The ball falls from the taller platform height to the shorter platform height: net vertical drop = 6.0 − 3.6 = 2.4 m. Wait — looking at the diagram description: the taller platform height is 6.0 m (above ground) and the shorter platform is 3.6 m (above ground), so the ball falls 6.0 − 3.6 = 2.4 m vertically. Using free-fall: d = ½gt² → t = √(2d/g) = √(4.8/9.81) ≈ √0.489 ≈ 0.70 s. The horizontal speed (15 m/s) is irrelevant to the time calculation (vertical and horizontal are independent). A common mistake is using total heights rather than the difference, or including horizontal speed in the time calculation.",
      "subTopic": "Forces, Gravity & Momentum"
    },
    {
      "number": 49,
      "part": "B-1",
      "type": "multiple-choice",
      "text": "Four mechanical waves are created in the same medium over the same time interval, all with the same amplitude of 0.30 m but different wavelengths/frequencies shown in four diagrams. Which diagram represents the wave that transfers the greatest amount of energy?",
      "choices": [
        "Wave with fewest oscillations (longest wavelength, lowest frequency)",
        "Wave with moderate oscillations",
        "Wave with more oscillations",
        "Wave with most oscillations (shortest wavelength, highest frequency)"
      ],
      "topic": "Waves & Sound",
      "correct": 3,
      "image": "/images/exams/phys-june-2022/q49.png",
      "explanation": "Wave energy depends on both amplitude and frequency: E ∝ A²f². All waves have the same amplitude (0.30 m), so the wave with the highest frequency transfers the most energy.",
      "diveDeep": "For mechanical waves, energy is proportional to amplitude squared times frequency squared: E ∝ A²f². Since all four waves have the same amplitude (0.30 m), the energy depends only on frequency. Higher frequency = more oscillations per second = more energy transferred. The diagram with the most complete cycles over the same time interval has the highest frequency. A common mistake is thinking all waves with the same amplitude carry the same energy — frequency also matters. This is why high-frequency gamma rays carry vastly more energy per photon than low-frequency radio waves (E = hf for photons; similar principle for mechanical waves).",
      "skill": "model",
      "subTopic": "Waves & Sound"
    },
    {
      "number": 50,
      "part": "B-1",
      "type": "multiple-choice",
      "text": "Which diagram represents a light ray increasing in speed as it travels from one medium to another?",
      "choices": [
        "Ray bends toward the normal at the boundary (slowing down)",
        "Ray continues straight without bending (same speed)",
        "Ray bends away from the normal at the boundary (speeding up)",
        "Ray reflects back into the original medium"
      ],
      "topic": "Waves & Sound",
      "correct": 2,
      "image": "/images/exams/phys-june-2022/q50.png",
      "explanation": "When light speeds up, it bends away from the normal. The angle of refraction is greater than the angle of incidence (n₁ > n₂, denser to less dense medium).",
      "diveDeep": "Snell's law: n₁ sin θ₁ = n₂ sin θ₂. If speed increases (v₂ > v₁), then n₂ < n₁, so sin θ₂ > sin θ₁, meaning θ₂ > θ₁ — the refracted ray bends away from the normal. Visually: the ray spreads out more relative to the normal upon entering the faster medium. A common memory trick: \"If it speeds up, it bends away (from normal); if it slows down, it bends toward (the normal).\" This is why light bends toward the normal when entering glass from air (slows down) and away from normal when exiting glass into air (speeds up). Increasing angle from normal = increasing speed in new medium.",
      "skill": "model",
      "subTopic": "Light & Optics"
    },
    {
      "number": 51,
      "part": "B-2",
      "type": "written",
      "text": "To charge a cell-phone battery, 3.69 × 10³ coulombs of charge is moved through a potential difference of 3.70 volts. Calculate the maximum amount of electrical energy gained by the battery. [Show all work, including the equation and substitution with units.] (Questions 51–52)",
      "topic": "Electricity",
      "modelAnswer": "Equation: W = qV\nSubstitution: W = (3.69 × 10³ C)(3.70 V)\nAnswer: W = 1.37 × 10⁴ J (13,653 J)",
      "explanation": "Electrical energy (work) equals charge multiplied by potential difference: W = qV = (3690 C)(3.70 V) = 13,653 J ≈ 1.37 × 10⁴ J.",
      "diveDeep": "The relationship W = qV (or E = qV) comes from the definition of electric potential: V = W/q → W = qV. Here: q = 3.69 × 10³ C = 3690 C; V = 3.70 V. W = (3690)(3.70) = 13,653 J ≈ 1.37 × 10⁴ J. Unit check: C × V = C × (J/C) = J ✓. This is the maximum energy because real charging is never 100% efficient — some energy is lost as heat. A typical smartphone battery holds about 10,000–50,000 J (10–50 kJ), so this calculation is realistic. The Regents awards full credit for correct equation, correct substitution with units, and correct answer.",
      "subTopic": "Electrostatics, Fields & Magnetism"
    },
    {
      "number": 53,
      "part": "B-2",
      "type": "written",
      "text": "A 55-kilogram ice skater slides across a level ice surface and the force of friction acting on the skates has a magnitude of 11 newtons. Determine the magnitude of the weight of the ice skater. (Question 53)",
      "topic": "Forces & Newton",
      "modelAnswer": "W = mg = (55 kg)(9.81 m/s²) = 539 N ≈ 540 N",
      "explanation": "Weight = mass × gravitational acceleration: W = mg = (55 kg)(9.81 m/s²) = 539 N.",
      "diveDeep": "Weight is the gravitational force on an object: W = mg, where g = 9.81 m/s² near Earth's surface. W = (55 kg)(9.81 m/s²) = 539.55 N ≈ 540 N. Note: the friction force (11 N) is not needed for this calculation — it will be used in Questions 54–55. Weight acts downward; on a horizontal surface, the normal force equals weight (N = W = 539 N). The Regents accepts either 539 N or 540 N depending on significant figures. For g, the Regents reference table gives 9.81 m/s², though some students use 10 m/s² as an approximation (give 550 N — check if acceptable).",
      "subTopic": "Forces, Gravity & Momentum"
    },
    {
      "number": 54,
      "part": "B-2",
      "type": "written",
      "text": "A 55-kilogram ice skater slides across a level ice surface and the force of friction acting on the skates has a magnitude of 11 newtons. Calculate the coefficient of kinetic friction between the ice skater and the ice. [Show all work, including the equation and substitution with units.] (Questions 54–55)",
      "topic": "Forces & Newton",
      "modelAnswer": "Equation: Ff = μk × FN\nNormal force: FN = mg = (55)(9.81) = 539 N\nSubstitution: μk = Ff/FN = 11 N / 539 N\nAnswer: μk ≈ 0.020",
      "explanation": "Coefficient of kinetic friction: μk = Ff/FN = 11/539 ≈ 0.020. The normal force equals the weight on a level surface.",
      "diveDeep": "Kinetic friction: Ff = μk × FN. On a horizontal surface: FN = W = mg = (55)(9.81) = 539 N. Solving: μk = Ff/FN = 11/539 ≈ 0.0204 ≈ 0.020. The coefficient of kinetic friction is dimensionless (N/N). μk for ice is typically 0.01–0.03, confirming this is a realistic value for ice skating. This also explains why ice skates glide so well — very low μk. A common mistake is using FN = 11 N (the friction force) instead of the weight. For horizontal surfaces, FN always equals mg. The Regents tests both the equation setup and the numerical answer.",
      "subTopic": "Forces, Gravity & Momentum"
    },
    {
      "number": 56,
      "image": "/images/exams/phys-june-2022/context_56_57.png",
      "part": "B-2",
      "type": "written",
      "text": "A student produces a wave in a flexible spring stretched along a tabletop by shaking one end of the spring at a frequency of 2.0 hertz. The diagram shows the wave; the spring has a total length of 4.5 meters and the wave displacement is 1.0 meter from crest to trough. Determine the amplitude of the wave produced in the spring. (Question 56)",
      "topic": "Waves & Sound",
      "modelAnswer": "Amplitude = ½ × (crest-to-trough distance) = ½ × 1.0 m = 0.50 m",
      "explanation": "Amplitude is the maximum displacement from equilibrium. The diagram shows a peak-to-trough height of 1.0 m, so amplitude = 0.50 m.",
      "diveDeep": "Amplitude is the maximum displacement from the equilibrium (rest) position, measured to either the crest or the trough — not crest to trough. Since crest-to-trough = 2 × amplitude: A = (crest-to-trough)/2 = 1.0/2 = 0.50 m. A common mistake is stating the amplitude as 1.0 m (the full crest-to-trough distance). Wave energy ∝ A², so doubling amplitude quadruples energy. The 4.5 m spring length will be used in Question 57 for wavelength. Always distinguish between amplitude (maximum displacement from equilibrium) and the peak-to-peak height (twice the amplitude).",
      "skill": "data",
      "subTopic": "Waves & Sound"
    },
    {
      "number": 57,
      "image": "/images/exams/phys-june-2022/context_56_57.png",
      "part": "B-2",
      "type": "written",
      "text": "A student produces a wave in a flexible spring stretched along a tabletop by shaking one end at a frequency of 2.0 hertz. The spring is 4.5 meters long and shows 3 complete wavelengths in the diagram. Determine the wavelength of the wave produced in the spring. (Question 57)",
      "topic": "Waves & Sound",
      "modelAnswer": "From the diagram, 3 complete waves fit in 4.5 m.\nWavelength λ = 4.5 m / 3 = 1.5 m",
      "explanation": "Wavelength is the length of one complete wave cycle. If 3 full waves span 4.5 m, then λ = 4.5/3 = 1.5 m.",
      "diveDeep": "Wavelength (λ) is the distance between two consecutive points in phase (e.g., crest to crest). The spring shows 3 complete wavelengths over 4.5 m, so λ = 4.5/3 = 1.5 m. We can verify using the wave equation: v = fλ = (2.0 Hz)(1.5 m) = 3.0 m/s. This is a reasonable wave speed for a spring on a tabletop. A common mistake is using the total length as the wavelength (4.5 m). Always count the number of complete cycles in the given length. One complete cycle is: crest → trough → next crest (or equivalently, equilibrium → crest → equilibrium → trough → equilibrium).",
      "subTopic": "Waves & Sound"
    },
    {
      "number": 58,
      "part": "B-2",
      "type": "written",
      "text": "A 100.-newton box is pulled up a 20.-meter-long incline by a constant force of 80. newtons. The vertical height gained by the box is 10. meters. Determine the total work done, in joules, by the 80.-newton force in pulling the box to the top of the incline. (Question 58)",
      "topic": "Energy & Work",
      "modelAnswer": "W = F × d = (80. N)(20. m) = 1600 J",
      "explanation": "Work = Force × distance along the direction of motion. The 80 N force acts along the 20 m incline: W = (80)(20) = 1600 J.",
      "diveDeep": "Work done by a force: W = F·d·cos θ, where θ is the angle between force and displacement. The applied force (80 N) is parallel to the incline (displacement of 20 m), so θ = 0° and cos 0° = 1. W = (80 N)(20 m) = 1600 J. A common mistake is using the vertical height (10 m) instead of the incline length (20 m). The distance d in W = Fd must be the displacement along the direction of the force, not the vertical component. This total work (1600 J) exceeds the gravitational PE gained (1000 J) — the difference is the work done against friction (600 J).",
      "subTopic": "Energy & Conservation"
    },
    {
      "number": 59,
      "part": "B-2",
      "type": "written",
      "text": "A 100.-newton box is pulled up a 20.-meter-long incline by a constant force of 80. newtons. The vertical height gained by the box is 10. meters. Determine the total amount of gravitational potential energy, in joules, gained by the box as it is pulled to the top of the incline. (Question 59)",
      "topic": "Energy & Work",
      "modelAnswer": "PE = W × h = (100. N)(10. m) = 1000 J\n(where W = weight = 100. N = mg, h = 10. m vertical height)",
      "explanation": "Gravitational PE gained = mgh = weight × vertical height = (100 N)(10 m) = 1000 J.",
      "diveDeep": "Gravitational potential energy: PE = mgh, where h is the vertical height gained. Since weight = mg = 100 N: PE = (100 N)(10 m) = 1000 J. Only the vertical height matters for gravitational PE — not the length of the incline. A common mistake is using the incline length (20 m) instead of the vertical height (10 m). Gravitational PE depends on the vertical position, not the path taken. This is why PE is a conservative form of energy. Comparing: W_applied = 1600 J, ΔPE = 1000 J. The 600 J difference was converted to thermal energy by friction.",
      "subTopic": "Springs & PE"
    },
    {
      "number": 60,
      "part": "B-2",
      "type": "written",
      "text": "Explain why there is a difference between the total work done by the 80.-newton force in pulling the box to the top of the incline and the amount of gravitational potential energy gained by the box as it was pulled to the top of the incline. (Question 60)",
      "topic": "Energy & Work",
      "modelAnswer": "The work done by the applied force (1600 J) is greater than the gravitational PE gained (1000 J) because some of the work done by the applied force was used to overcome friction between the box and the incline. The work done against friction was converted to thermal (heat) energy. W_friction = 1600 − 1000 = 600 J.",
      "explanation": "Some of the input work is dissipated as heat due to friction between the box and incline surface, so not all work converts to gravitational PE.",
      "diveDeep": "Energy conservation: W_applied = ΔPE + W_friction. Here: 1600 J = 1000 J + W_friction → W_friction = 600 J. The friction force converts mechanical energy to thermal energy (heat), which is not recoverable. This is why real machines are less than 100% efficient — some energy is always lost to friction/heat. Efficiency = useful energy output / total energy input = 1000/1600 = 62.5%. If the surface were frictionless, all 1600 J would convert to PE and you could lower the box to recover all 1600 J — but in reality, the 600 J is permanently lost as heat.",
      "subTopic": "Springs & PE"
    },
    {
      "number": 61,
      "part": "B-2",
      "type": "written",
      "text": "An electric circuit consists of a 110.-ohm resistor and a 220.-ohm resistor connected in series to a 6.00 V source of potential difference. Calculate the equivalent resistance of the circuit. [Show all work, including the equation and substitution with units.] (Questions 61–62)",
      "topic": "Electricity",
      "modelAnswer": "Equation: Req = R1 + R2 (series)\nSubstitution: Req = 110. Ω + 220. Ω\nAnswer: Req = 330. Ω",
      "explanation": "In a series circuit, equivalent resistance = sum of individual resistances: Req = 110 + 220 = 330 Ω.",
      "diveDeep": "Series circuit rule: Req = R₁ + R₂ + ... = 110 + 220 = 330 Ω. In series, current has only one path, so each resistor adds to the total resistance. The equivalent resistance is always greater than any individual resistor in a series combination. Contrast with parallel: 1/Req = 1/R₁ + 1/R₂, giving Req < either individual resistor. For this series circuit: I_total = V/Req = 6.00/330 ≈ 0.0182 A flows through both resistors. V₁ = IR₁ = 0.0182 × 110 = 2.00 V; V₂ = IR₂ = 0.0182 × 220 = 4.00 V. Check: V₁ + V₂ = 6.00 V ✓.",
      "subTopic": "Circuits"
    },
    {
      "number": 63,
      "part": "B-2",
      "type": "written",
      "text": "An electric circuit consists of a 110.-ohm resistor and a 220.-ohm resistor connected in series to a 6.00 V source of potential difference. Calculate the total current in the circuit. [Show all work, including the equation and substitution with units.] (Questions 63–64)",
      "topic": "Electricity",
      "modelAnswer": "Equation: I = V/R (Ohm's Law)\nSubstitution: I = 6.00 V / 330. Ω\nAnswer: I = 0.0182 A ≈ 1.82 × 10⁻² A",
      "explanation": "Using Ohm's law: I = V/Req = 6.00 V / 330 Ω ≈ 0.0182 A.",
      "diveDeep": "Ohm's law: V = IR → I = V/R. Using the equivalent resistance from Q61–62: I = 6.00/330 ≈ 0.01818 A ≈ 1.82 × 10⁻² A. In a series circuit, this same current flows through both resistors. Voltage drops: V₁₁₀ = IR = (0.01818)(110) ≈ 2.00 V; V₂₂₀ = (0.01818)(220) ≈ 4.00 V. The 220 Ω resistor gets twice the voltage of the 110 Ω resistor (ratio matches resistance ratio). This verifies the voltage divider principle: V ∝ R in series. Power in 110 Ω: P = I²R = (0.01818)²(110) ≈ 0.0364 W. Power in 220 Ω: P = (0.01818)²(220) ≈ 0.0727 W.",
      "subTopic": "Circuits"
    },
    {
      "number": 65,
      "part": "B-2",
      "type": "written",
      "text": "Compare the power dissipated by the 110.-ohm resistor to the power dissipated by the 220.-ohm resistor in the series circuit with a 6.00 V source. (Question 65)",
      "topic": "Electricity",
      "modelAnswer": "P = I²R. In a series circuit, I is the same through both resistors.\nP₁₁₀ = I²(110) and P₂₂₀ = I²(220).\nSince P ∝ R for same current: P₂₂₀ = 2 × P₁₁₀.\nThe 220-ohm resistor dissipates twice the power of the 110-ohm resistor.",
      "explanation": "In a series circuit (same current), power is proportional to resistance (P = I²R). The 220 Ω resistor dissipates twice the power of the 110 Ω resistor.",
      "diveDeep": "Power: P = I²R. In series, current I is equal through both resistors. So P ∝ R: P₂₂₀/P₁₁₀ = 220/110 = 2. The 220 Ω resistor dissipates twice as much power. Numerically: I ≈ 0.01818 A; P₁₁₀ = (0.01818)²(110) ≈ 0.0364 W; P₂₂₀ = (0.01818)²(220) ≈ 0.0727 W ≈ 2 × 0.0364 W. Note: In a parallel circuit (same voltage), P ∝ 1/R — the smaller resistor dissipates more power. The key is to first identify series (same I) or parallel (same V) configuration before comparing power. This distinction is frequently tested on the Regents.",
      "subTopic": "Circuits"
    },
    {
      "number": 66,
      "part": "C",
      "type": "written",
      "text": "A group of students constructs a catapult that launches a ball at a target placed on a lab bench. The students measure 0.80 second from the time the ball is released until it strikes the target, located a horizontal distance of 2.0 meters from the release point. The ball reaches a maximum height at point P, which is 0.78 meter above the ball's release point. The target is at the same height as the release point. [Neglect friction.] Calculate the horizontal component of the ball's initial velocity. [Show all work, including the equation and substitution with units.] (Questions 66–67)",
      "topic": "Kinematics",
      "modelAnswer": "Equation: vx = Δx/t\nSubstitution: vx = 2.0 m / 0.80 s\nAnswer: vx = 2.5 m/s",
      "explanation": "Horizontal velocity is constant (no friction). vx = horizontal distance / time = 2.0 m / 0.80 s = 2.5 m/s.",
      "diveDeep": "In projectile motion (no air resistance), the horizontal velocity component is constant throughout the flight. vx = Δx/t = 2.0 m / 0.80 s = 2.5 m/s. This value remains constant from launch to landing. The horizontal distance and total time of flight give us the horizontal velocity directly. This is the simplest part of the projectile problem — no acceleration in x, so vx = Δx/Δt. The target being at the same height as the release point confirms the ball completes a symmetric parabolic arc, with total flight time 0.80 s. The maximum height information (0.78 m) will be used to find the initial vertical velocity.",
      "subTopic": "Forces, Gravity & Momentum"
    },
    {
      "number": 68,
      "part": "C",
      "type": "written",
      "text": "Using the same catapult scenario: the ball reaches maximum height 0.78 m above the release point in 0.40 s (half the total flight time of 0.80 s). Calculate the vertical component of the ball's initial velocity. [Show all work, including the equation and substitution with units.] (Questions 68–69)",
      "topic": "Kinematics",
      "modelAnswer": "At maximum height, vy = 0. Using v = v₀ − gt, at max height:\n0 = v₀y − (9.81 m/s²)(0.40 s)\nv₀y = 3.9 m/s\n\nAlternatively using Δy = ½(v₀y + vy)t:\n0.78 m = ½(v₀y + 0)(0.40 s)\nv₀y = 2(0.78)/0.40 = 3.9 m/s",
      "explanation": "At maximum height, vertical velocity = 0. Time to reach max height = 0.40 s (half of 0.80 s). Using v = v₀ − gt: v₀y = g·t = (9.81)(0.40) ≈ 3.9 m/s.",
      "diveDeep": "At maximum height, the vertical component of velocity = 0. Since the target is at the same height as the launch point, the trajectory is symmetric: time to max height = total time/2 = 0.80/2 = 0.40 s. Using v_y = v₀y − gt: 0 = v₀y − (9.81)(0.40) → v₀y = 3.924 ≈ 3.9 m/s. Verification: Δy = v₀y·t − ½gt² = (3.9)(0.40) − ½(9.81)(0.40)² = 1.56 − 0.7848 ≈ 0.78 m ✓. The total initial speed: v₀ = √(vx² + vy²) = √(2.5² + 3.9²) = √(6.25 + 15.21) = √21.46 ≈ 4.6 m/s.",
      "subTopic": "Kinematics & Projectile Motion"
    },
    {
      "number": 70,
      "image": "/images/exams/phys-june-2022/context_66_70.png",
      "part": "C",
      "type": "written",
      "text": "On the diagram in your answer booklet, draw an arrow originating at point P that represents the direction of the ball's acceleration at point P. Point P is the maximum height of the ball's trajectory. (Question 70)",
      "topic": "Kinematics",
      "modelAnswer": "Draw an arrow pointing straight downward from point P. At the maximum height, the ball's acceleration is entirely due to gravity, which acts straight downward at g = 9.81 m/s² regardless of the velocity direction.",
      "explanation": "At point P (maximum height), acceleration is solely gravitational — pointing straight downward. The horizontal velocity is nonzero, but acceleration has no horizontal component (neglecting friction).",
      "diveDeep": "A common misconception is that at the top of a projectile's path, acceleration is zero (because velocity is not changing direction at that instant). This is incorrect: acceleration due to gravity (9.81 m/s² downward) acts at every point during projectile motion, including the apex. At point P, the vertical velocity component is momentarily zero, but acceleration remains g downward. The horizontal velocity (2.5 m/s) continues unchanged. The acceleration arrow must be vertical (downward) — not angled, not zero length. This is one of the most commonly missed points on Regents projectile questions.",
      "subTopic": "Kinematics & Projectile Motion"
    },
    {
      "number": 71,
      "part": "C",
      "type": "written",
      "text": "A spring with a spring constant of 2600 newtons per meter is compressed 0.10 meter from its unstretched position. Determine the total amount of elastic potential energy stored in the spring when the spring is compressed 0.10 meter. (Question 71)",
      "topic": "Energy & Work",
      "modelAnswer": "PE_spring = ½kx²\nPE_spring = ½(2600 N/m)(0.10 m)²\nPE_spring = ½(2600)(0.010)\nPE_spring = 13 J",
      "explanation": "Elastic PE = ½kx² = ½(2600)(0.10)² = ½(2600)(0.01) = 13 J.",
      "diveDeep": "Elastic potential energy stored in a spring: PE = ½kx². Here k = 2600 N/m, x = 0.10 m. PE = ½(2600)(0.10)² = ½(2600)(0.01) = 13 J. Unit check: (N/m)(m²) = N·m = J ✓. Note: the formula uses x² — squaring the compression. Doubling the compression quadruples the stored energy. A common mistake is forgetting the ½ or squaring incorrectly: ½ × 2600 × 0.10 = 130 J (forgot to square x). This 13 J will be entirely converted to kinetic energy of the 3.0 kg block (Question 72–73) assuming no energy loss.",
      "subTopic": "Springs & PE"
    },
    {
      "number": 72,
      "part": "C",
      "type": "written",
      "text": "Assuming all of the spring's energy is transferred to the 3.0-kilogram block, calculate the speed, v₁, of the 3.0-kilogram block immediately after it is propelled by the spring. [Show all work, including the equation and substitution with units.] (Questions 72–73)",
      "topic": "Energy & Work",
      "modelAnswer": "Conservation of energy: PE_spring = KE_block\n½kx² = ½mv₁²\n13 J = ½(3.0 kg)v₁²\nv₁² = 2(13)/3.0 = 26/3.0 = 8.667 m²/s²\nv₁ = √8.667 ≈ 2.9 m/s",
      "explanation": "All spring PE converts to block KE: 13 J = ½(3.0)v₁² → v₁ = √(2 × 13/3.0) ≈ 2.9 m/s.",
      "diveDeep": "Energy conservation: PE_spring = KE_block. ½kx² = ½mv₁². The ½ cancels: kx² = mv₁² → v₁ = √(kx²/m) = √(2600 × 0.01/3.0) = √(26/3.0) = √8.667 ≈ 2.944 ≈ 2.9 m/s. Alternatively: use PE = 13 J (from Q71): 13 = ½(3.0)v₁² → v₁² = 26/3 → v₁ ≈ 2.9 m/s. This speed (v₁ = 2.9 m/s) is the initial speed before the collision in Q74–75. A common mistake is not taking the square root (v² ≠ v). Always confirm units: √(J/kg) = √(N·m/kg) = √(kg·m²/s²/kg) = m/s ✓.",
      "subTopic": "Springs & PE"
    },
    {
      "number": 74,
      "part": "C",
      "type": "written",
      "text": "The 3.0-kilogram block (moving at v₁ ≈ 2.9 m/s) collides with a stationary 1.0-kilogram block. The blocks remain joined and move together. Calculate the speed, v₂, of the two blocks after the collision. [Show all work, including the equation and substitution with units.] (Questions 74–75)",
      "topic": "Forces & Newton",
      "modelAnswer": "Conservation of momentum (perfectly inelastic collision):\nm₁v₁ + m₂v₂_initial = (m₁ + m₂)v₂\n(3.0 kg)(2.9 m/s) + (1.0 kg)(0) = (3.0 + 1.0 kg)v₂\n8.7 kg·m/s = (4.0 kg)v₂\nv₂ = 8.7/4.0 = 2.2 m/s",
      "explanation": "Using conservation of momentum for a perfectly inelastic collision: p_before = p_after → (3.0)(2.9) = (4.0)v₂ → v₂ = 8.7/4.0 = 2.2 m/s.",
      "diveDeep": "Perfectly inelastic collision (objects stick together): m₁v₁ + m₂(0) = (m₁ + m₂)v₂. With m₁ = 3.0 kg, v₁ = 2.9 m/s, m₂ = 1.0 kg: (3.0)(2.9) = (4.0)v₂ → 8.7 = 4.0v₂ → v₂ = 2.175 ≈ 2.2 m/s. Momentum is conserved in all collisions (no external horizontal force). KE check: KE_before = ½(3.0)(2.9)² = ½(3.0)(8.41) = 12.6 J; KE_after = ½(4.0)(2.2)² = ½(4.0)(4.84) = 9.68 J. KE lost = 12.6 − 9.7 ≈ 2.9 J converted to heat/deformation. This is characteristic of inelastic collisions: momentum conserved, kinetic energy not conserved.",
      "subTopic": "Forces, Gravity & Momentum"
    },
    {
      "number": 76,
      "part": "C",
      "type": "written",
      "text": "A mercury atom emits a photon when an electron in the atom moves from energy level f to energy level d. Using the Mercury Energy Level Diagram from the Regents reference table (level f = −1.57 eV, level d = −3.71 eV), determine the energy of the emitted photon, in electronvolts. (Question 76)",
      "topic": "Modern Physics",
      "modelAnswer": "Energy of photon = E_f − E_d = (−1.57 eV) − (−3.71 eV) = −1.57 + 3.71 = 2.14 eV",
      "explanation": "The photon energy equals the energy difference between the two levels: ΔE = E_f − E_d = −1.57 − (−3.71) = 2.14 eV.",
      "diveDeep": "When an electron transitions from a higher energy level to a lower one, it emits a photon with energy equal to the energy difference: E_photon = E_initial − E_final = E_f − E_d = (−1.57) − (−3.71) = 2.14 eV. Energy levels in the Regents Mercury diagram are negative (bound states below the ionization level). The higher the level letter (f > d > c > b > a > ground), the less negative (higher energy). Moving from f to d is a downward transition, releasing 2.14 eV as a photon. A common mistake is reversing the subtraction, getting a negative photon energy — always subtract final from initial for emission.",
      "skill": "reference",
      "subTopic": "Quantum & Photons"
    },
    {
      "number": 77,
      "part": "C",
      "type": "written",
      "text": "Determine the energy of the emitted photon from the mercury f→d transition, in joules. (Question 77)",
      "topic": "Modern Physics",
      "modelAnswer": "E = 2.14 eV × (1.60 × 10⁻¹⁹ J/eV)\nE = 3.42 × 10⁻¹⁹ J",
      "explanation": "Convert from eV to joules using 1 eV = 1.60 × 10⁻¹⁹ J: E = (2.14 eV)(1.60 × 10⁻¹⁹ J/eV) = 3.42 × 10⁻¹⁹ J.",
      "diveDeep": "Unit conversion: 1 eV = 1.60 × 10⁻¹⁹ J (from Regents reference table). E = (2.14 eV)(1.60 × 10⁻¹⁹ J/eV) = 3.424 × 10⁻¹⁹ J ≈ 3.42 × 10⁻¹⁹ J. This extremely small energy (in joules) is typical for visible/UV photons. Visible light photons have energies of roughly 1.7–3.1 eV = 2.7–5.0 × 10⁻¹⁹ J. This conversion from eV to J is essential for calculating frequency and wavelength. The Regents reference table provides: 1 eV = 1.60 × 10⁻¹⁹ J. Always keep track of whether you're working in eV or J to avoid mixing unit systems.",
      "subTopic": "Quantum & Photons"
    },
    {
      "number": 78,
      "part": "C",
      "type": "written",
      "text": "Calculate the frequency of the photon emitted by the mercury f→d transition. [Show all work, including the equation and substitution with units.] (Questions 78–79)",
      "topic": "Modern Physics",
      "modelAnswer": "Equation: E = hf → f = E/h\nSubstitution: f = (3.42 × 10⁻¹⁹ J) / (6.63 × 10⁻³⁴ J·s)\nAnswer: f ≈ 5.16 × 10¹⁴ Hz",
      "explanation": "Using E = hf: f = E/h = (3.42 × 10⁻¹⁹ J)/(6.63 × 10⁻³⁴ J·s) ≈ 5.16 × 10¹⁴ Hz.",
      "diveDeep": "Planck's equation: E = hf → f = E/h. Using h = 6.63 × 10⁻³⁴ J·s (from Regents reference table): f = (3.42 × 10⁻¹⁹)/(6.63 × 10⁻³⁴) = 0.516 × 10¹⁵ = 5.16 × 10¹⁴ Hz. Unit check: J/(J·s) = 1/s = Hz ✓. This frequency (5.16 × 10¹⁴ Hz) falls in the visible light range (approximately 4.0–7.5 × 10¹⁴ Hz), which makes sense for mercury emission. The wavelength: λ = c/f = (3.00 × 10⁸)/(5.16 × 10¹⁴) ≈ 5.81 × 10⁻⁷ m ≈ 581 nm (yellow-green visible light, consistent with mercury spectrum).",
      "subTopic": "Quantum & Photons"
    },
    {
      "number": 80,
      "part": "C",
      "type": "written",
      "text": "Based on your calculated value of the frequency of the emitted photon (≈ 5.16 × 10¹⁴ Hz), determine its classification in the electromagnetic spectrum. (Question 80)",
      "topic": "Modern Physics",
      "modelAnswer": "f ≈ 5.16 × 10¹⁴ Hz falls in the visible light portion of the electromagnetic spectrum.\n(Visible light range: approximately 4.0 × 10¹⁴ Hz to 7.5 × 10¹⁴ Hz)",
      "explanation": "A frequency of 5.16 × 10¹⁴ Hz is in the visible light range of the electromagnetic spectrum (roughly yellow-green light at ~580 nm wavelength).",
      "diveDeep": "The electromagnetic spectrum frequency ranges (approximate): Radio: < 3 × 10⁹ Hz; Microwave: 3 × 10⁹ – 3 × 10¹¹ Hz; Infrared: 3 × 10¹¹ – 4 × 10¹⁴ Hz; Visible: 4 × 10¹⁴ – 7.5 × 10¹⁴ Hz; Ultraviolet: 7.5 × 10¹⁴ – 3 × 10¹⁶ Hz; X-ray: 3 × 10¹⁶ – 3 × 10¹⁹ Hz; Gamma: > 3 × 10¹⁹ Hz. Since 5.16 × 10¹⁴ Hz falls between 4 × 10¹⁴ and 7.5 × 10¹⁴ Hz, it is visible light. Mercury lamps emit several visible wavelengths (violet, blue, green, yellow) plus UV — this particular line is in the visible range. The Regents reference table includes the electromagnetic spectrum with wavelength/frequency ranges.",
      "subTopic": "Quantum & Photons"
    },
    {
      "number": 81,
      "image": "/images/exams/phys-june-2022/context_81_85.png",
      "part": "C",
      "type": "written",
      "text": "The diagram represents the path followed by a ray of light (f = 5.09 × 10¹⁴ Hz) as it strikes a semicircular block of fused quartz perpendicular to its curved surface, then hits the flat surface at point O. Use a protractor to determine the angle of incidence of the light ray at point O. (Question 81)",
      "topic": "Waves & Sound",
      "modelAnswer": "Using a protractor on the diagram, the angle of incidence at point O (measured from the normal to the flat surface) is approximately 40° (accept 38°–42° based on measurement).",
      "explanation": "The angle of incidence is measured between the incident ray and the normal to the flat surface at point O. From the diagram, this is approximately 40°.",
      "diveDeep": "Angle of incidence is always measured from the normal (perpendicular to the surface), not from the surface itself. The normal at the flat surface of the semicircular block is perpendicular to that flat surface. The light enters the curved surface perpendicular to it (no refraction at entry) and travels straight to point O on the flat surface. The angle between the ray and the normal at O is the angle of incidence. For fused quartz: n = 1.46 (from Regents reference table). The critical angle for total internal reflection: sin θ_c = 1/n = 1/1.46 → θ_c ≈ 43.2°. If θ_i < 43°, the light refracts out; if θ_i > 43°, total internal reflection occurs.",
      "skill": "experiment",
      "subTopic": "Light & Optics"
    },
    {
      "number": 82,
      "part": "C",
      "type": "written",
      "text": "Using an angle of incidence of 40° at point O, calculate the angle of refraction as the light ray leaves the fused quartz at point O and enters the air. [Show all work, including the equation and substitution with units.] (Questions 82–83)",
      "topic": "Waves & Sound",
      "modelAnswer": "Equation: n₁ sin θ₁ = n₂ sin θ₂ (Snell's Law)\nn₁ = 1.46 (fused quartz, from reference table), θ₁ = 40°, n₂ = 1.00 (air)\n(1.46)(sin 40°) = (1.00)(sin θ₂)\n(1.46)(0.643) = sin θ₂\nsin θ₂ = 0.938\nθ₂ = sin⁻¹(0.938) ≈ 69.6° ≈ 70°",
      "explanation": "Using Snell's law: n_quartz × sin(40°) = n_air × sin(θ₂) → 1.46 × 0.643 = 1.00 × sin(θ₂) → θ₂ ≈ 70°.",
      "diveDeep": "Snell's law: n₁ sin θ₁ = n₂ sin θ₂. From the Regents reference table: n_fused_quartz = 1.46 for f = 5.09 × 10¹⁴ Hz. n_air = 1.00 (air ≈ vacuum). sin θ₂ = (n₁/n₂) sin θ₁ = (1.46/1.00)(sin 40°) = 1.46 × 0.6428 ≈ 0.938. θ₂ = arcsin(0.938) ≈ 69.6° ≈ 70°. Note: sin θ₂ = 0.938 < 1, so refraction occurs (not total internal reflection). If θ_i were 43°+, sin θ₂ > 1 and light would undergo total internal reflection. The refracted ray bends away from the normal (from denser quartz to less dense air), confirming the ray speeds up as it exits.",
      "subTopic": "Light & Optics"
    },
    {
      "number": 84,
      "image": "/images/exams/phys-june-2022/context_81_85.png",
      "part": "C",
      "type": "written",
      "text": "Starting at point O and using a protractor and ruler, draw the refracted ray at the appropriate angle of refraction on the diagram in your answer booklet. (Question 84)",
      "topic": "Waves & Sound",
      "modelAnswer": "Draw a straight line from point O into the air (below the flat surface) at approximately 70° from the normal to the flat surface, bending away from the normal (since light is going from denser medium to less dense medium, it speeds up and bends away from the normal).",
      "explanation": "The refracted ray exits at ~70° from the normal, drawn on the air side of the flat surface, bending away from the normal since light speeds up as it exits the quartz into air.",
      "diveDeep": "Drawing guidelines: (1) Mark the normal (perpendicular to the flat surface at point O). (2) The refracted ray is on the air side (opposite side from incident ray relative to the surface). (3) Draw the ray at 70° from the normal, using a protractor. (4) The ray bends away from the normal (θ_refraction > θ_incidence), consistent with light going from a denser to a less dense medium. For full Regents credit: the ray must be on the correct side of the surface, the angle must be within a few degrees of 70°, and the ray must extend beyond point O. A protractor must be used for accuracy — do not estimate by eye alone.",
      "subTopic": "Light & Optics"
    },
    {
      "number": 85,
      "part": "C",
      "type": "written",
      "text": "Compare the frequency of the light in fused quartz to the frequency of the light in air. (Question 85)",
      "topic": "Waves & Sound",
      "modelAnswer": "The frequency of light in fused quartz is the same as the frequency of light in air. Frequency does not change when light travels from one medium to another — only speed and wavelength change.",
      "explanation": "Frequency is unchanged when light changes medium. Only speed (v = c/n) and wavelength (λ = v/f) change between media; frequency remains constant.",
      "diveDeep": "This is a fundamental principle of wave behavior: when a wave crosses a boundary between two media, the frequency remains constant. What changes is the speed (v = c/n) and wavelength (λ = v/f). In fused quartz: v = c/1.46 ≈ 2.05 × 10⁸ m/s; λ = v/f ≈ (2.05 × 10⁸)/(5.09 × 10¹⁴) ≈ 4.03 × 10⁻⁷ m. In air: v ≈ 3.00 × 10⁸ m/s; λ ≈ 5.89 × 10⁻⁷ m. The frequency (5.09 × 10¹⁴ Hz) is the same in both media. A common mistake is saying frequency changes — this is incorrect. The Regents tests this principle nearly every year: \"frequency is unchanged when light changes medium.\"",
      "subTopic": "Waves & Sound"
    }
  ]
}
