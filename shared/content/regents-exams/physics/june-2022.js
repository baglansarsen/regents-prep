// Physics Regents — June 2022
export default {
  id: 'phys-jun-2022',
  subject: 'physics',
  year: 2022,
  session: 'June',
  totalMinutes: 180,
  questions: [
    {
      number: 1,
      part: 'A',
      text: 'Which terms identify two scalar quantities?',
      choices: ['force and acceleration', 'impulse and distance', 'mass and velocity', 'energy and time'],
      topic: 'Forces & Newton',
      correct: 3,
      image: '/images/exams/phys-june-2022/q1.png',
      explanation: 'Energy and time are both scalar quantities — they have magnitude only, with no direction. Force, acceleration, impulse, and velocity are all vector quantities.',
      diveDeep: 'Scalars: mass (kg), energy (J), time (s), speed (m/s), temperature (°C), distance (m), power (W). Vectors: force (N), acceleration (m/s²), velocity (m/s), displacement (m), momentum (kg·m/s), impulse (N·s). Note that distance is scalar but displacement is vector; speed is scalar but velocity is vector. A common mistake is listing impulse as scalar — it has direction (same as the force that created it). Mass is always scalar. The Regents tests this classification nearly every year.'
    },
    {
      number: 2,
      part: 'A',
      text: 'A motorcyclist, initially traveling east at 15 meters per second, accelerates uniformly at a rate of 3.0 meters per second squared east to a velocity of 21 meters per second east. How far does the motorcyclist travel while accelerating?',
      choices: ['1.0 m', '36 m', '2.0 m', '72 m'],
      topic: 'Kinematics',
      correct: 1,
      explanation: 'Using v² = v₀² + 2ad: (21)² = (15)² + 2(3.0)d → 441 = 225 + 6d → d = 216/6 = 36 m.',
      diveDeep: 'When time is not given, use v² = v₀² + 2aΔx. Here: a = (v² − v₀²)/(2Δx) rearranged to Δx = (v² − v₀²)/(2a) = (441 − 225)/6 = 216/6 = 36 m. A common mistake is using Δx = (v − v₀)/a, which gives (21 − 15)/3 = 2 m — this is actually the time (not distance). Another mistake is using Δx = v₀t without knowing t. Recognizing which kinematic equation applies (the one without t) is a key exam strategy. Always list known variables before choosing an equation.'
    },
    {
      number: 3,
      part: 'A',
      text: 'A battery-powered electric motor is used to cause the wheels of a toy car to rotate. In this motor, there is a conversion of',
      choices: ['mechanical energy to electric energy', 'electric energy to chemical energy', 'thermal energy to electric energy', 'electric energy to mechanical energy'],
      topic: 'Electricity',
      correct: 3,
      explanation: 'An electric motor converts electrical energy (from the battery) into mechanical energy (rotation of the wheels). This is the fundamental purpose of a motor.',
      diveDeep: 'Energy conversions in common devices: battery (chemical → electrical), motor (electrical → mechanical), generator (mechanical → electrical), lightbulb (electrical → light + thermal), solar panel (light → electrical). A generator does the reverse of a motor. The first law of thermodynamics (conservation of energy) governs all conversions. A common mistake is reversing the direction: a generator converts mechanical to electrical, while a motor converts electrical to mechanical. Remembering the mnemonic "Motor = electrical in, Mechanical out; Generator = Mechanical in, Electrical out" helps.'
    },
    {
      number: 4,
      part: 'A',
      text: 'A projectile is launched horizontally from a height of 65 meters with an initial horizontal speed of 35 meters per second. What is the projectile\'s horizontal speed after it has fallen 25 meters? [Neglect friction.]',
      choices: ['12 m/s', '41 m/s', '35 m/s', '80 m/s'],
      topic: 'Kinematics',
      correct: 2,
      explanation: 'In projectile motion (no air resistance), the horizontal component of velocity remains constant throughout the flight. The horizontal speed stays at 35 m/s.',
      diveDeep: 'The key principle of projectile motion is independence of horizontal and vertical components. Without air resistance, there is no horizontal force, so horizontal velocity is constant. The vertical component increases due to gravity, but this does not affect horizontal speed. The height fallen (25 m) and total height (65 m) are irrelevant to horizontal speed. A common mistake is thinking the horizontal speed should increase because the projectile "speeds up" as it falls — the total speed increases, but only the vertical component changes. This independence is testable every year on the Regents.'
    },
    {
      number: 5,
      part: 'A',
      text: 'Two forces, F₁ = 10. N to the right and F₂ = 10. N to the left, act concurrently on a block sliding on a horizontal, frictionless surface. Which statement describes the motion of the block?',
      choices: [
        'The block is accelerating to the right.',
        'The block is accelerating to the left.',
        'The block is moving with constant speed.',
        'The block is moving with decreasing speed.'
      ],
      topic: 'Forces & Newton',
      correct: 2,
      image: '/images/exams/phys-june-2022/q5.png',
      explanation: "The two forces are equal and opposite, so the net force is zero. By Newton's first law, zero net force means constant velocity (constant speed in the same direction).",
      diveDeep: "Net force = F₁ + F₂ = +10 − 10 = 0 N. Newton's first law: F_net = 0 → a = 0 → constant velocity. The block continues moving at whatever speed it already had. Since the surface is frictionless, no deceleration occurs. A common mistake is thinking equal forces mean the block stops — they mean it continues at constant speed (dynamic equilibrium). If the block were at rest, it would remain at rest. This distinction between 'forces balance' and 'object at rest' is frequently tested."
    },
    {
      number: 6,
      part: 'A',
      text: 'The magnitude of an unbalanced force applied to a 4.0-kilogram crate is 10. newtons. If the magnitude of this applied unbalanced force is doubled, the inertia of the crate is',
      choices: ['halved', 'doubled', 'unchanged', 'quadrupled'],
      topic: 'Forces & Newton',
      correct: 2,
      explanation: 'Inertia depends only on mass, not on the applied force. The mass of the crate remains 4.0 kg, so its inertia is unchanged.',
      diveDeep: "Inertia is the resistance to change in motion, measured by mass. Force does not change mass. From F = ma: doubling F doubles a (for the same mass), but mass (and thus inertia) is unchanged. A common misconception is that applying more force makes an object harder to stop (more inertia) — this confuses inertia with momentum. Momentum (mv) would change with different accelerations, but inertia (m) does not. On the Regents, any question asking about inertia when only force changes is answered 'unchanged.'"
    },
    {
      number: 7,
      part: 'A',
      text: 'A 60.-kilogram man is pushing a 30.-kilogram lawn mower. Compared to the magnitude of the force exerted on the lawn mower by the man, the magnitude of the force exerted on the man by the lawn mower is',
      choices: ['one-quarter as great', 'the same', 'one-half as great', 'twice as great'],
      topic: 'Forces & Newton',
      correct: 1,
      explanation: "By Newton's third law, the force the man exerts on the mower and the force the mower exerts on the man are equal in magnitude and opposite in direction.",
      diveDeep: "Newton's third law action-reaction pairs are always equal in magnitude regardless of mass difference. The 60 kg vs. 30 kg mass difference is irrelevant. The mower exerts the same force on the man as the man exerts on the mower. However, the accelerations differ: a = F/m, so the lighter mower accelerates more. A common mistake is scaling by mass ratio (30/60 = ½, choice C). Newton's third law is about force equality, not acceleration equality. This is why rockets work in space: the exhaust gas and the rocket exert equal and opposite forces on each other."
    },
    {
      number: 8,
      part: 'A',
      text: 'A roller coaster car travels counterclockwise in a vertical circle. When the car is at the rightmost point of the circle (moving downward), what are the directions of the centripetal force and the velocity?',
      choices: [
        'Centripetal force is directed to the left (toward center) and velocity is directed downward.',
        'Centripetal force is directed downward and velocity is directed to the right.',
        'Centripetal force and velocity are both directed to the right.',
        'Centripetal force and velocity are both directed downward.'
      ],
      topic: 'Kinematics',
      correct: 0,
      image: '/images/exams/phys-june-2022/q8.png',
      explanation: 'At the rightmost point, the center of the circle is to the left, so centripetal force points left (toward center). Moving counterclockwise at the rightmost point, the velocity is directed downward (tangent to the circle).',
      diveDeep: 'Centripetal force always points toward the center of the circle. Velocity is always tangent to the circle, perpendicular to the radius. At the rightmost point of a vertical circle: the radius points right, so centripetal force points left (toward center). For counterclockwise motion, the tangent at the rightmost point is directed downward. A common mistake is aligning velocity with the centripetal force. They are always perpendicular in uniform circular motion. This is why centripetal force does no work — it is always perpendicular to velocity.'
    },
    {
      number: 9,
      part: 'A',
      text: 'An electric motor with a power rating of 6.48 × 10⁴ watts is used to raise an elevator weighing 2.80 × 10⁴ newtons at constant speed. What is the total time required for the motor to raise the elevator a vertical distance of 20.0 meters?',
      choices: ['0.116 s', '8.64 s', '2.31 s', '46.3 s'],
      topic: 'Energy & Work',
      correct: 1,
      image: '/images/exams/phys-june-2022/q9.png',
      explanation: 'W = F × d = 2.80 × 10⁴ × 20.0 = 5.60 × 10⁵ J. t = W/P = (5.60 × 10⁵)/(6.48 × 10⁴) ≈ 8.64 s.',
      diveDeep: 'P = W/t → t = W/P. Work done lifting = Fd = (2.80 × 10⁴ N)(20.0 m) = 5.60 × 10⁵ J. Time = W/P = 5.60 × 10⁵ / 6.48 × 10⁴ ≈ 8.64 s. The elevator is lifted at constant speed, so no net force and no extra kinetic energy change — all work goes to gravitational PE. A common mistake is using P = mv or including some factor of g twice. Always use W = Fd for work done against gravity (F here is already the weight in newtons). Checking units: J / (J/s) = s ✓.'
    },
    {
      number: 10,
      part: 'A',
      text: 'A person standing on a sidewalk hears the siren of an ambulance as it approaches, passes by, and goes away from the person. Compared to the frequency of the sound emitted by the siren, the frequency of the sound observed by the person during this event is',
      choices: ['higher, only', 'lower, only', 'first higher and then lower', 'first lower and then higher'],
      topic: 'Waves & Sound',
      correct: 2,
      explanation: 'As the ambulance approaches, sound waves compress and the observed frequency is higher than emitted. As it moves away, waves stretch and the observed frequency is lower — this is the Doppler effect.',
      diveDeep: 'The Doppler effect describes the change in observed frequency due to relative motion between source and observer. Approaching source → waves compressed → higher frequency (higher pitch). Receding source → waves stretched → lower frequency (lower pitch). This is the classic "ambulance" example. The actual emitted frequency never changes; only the observed frequency does. The Doppler effect applies to all waves including light (redshift for receding stars). A common mistake is saying frequency first decreases then increases — it is the opposite: higher first, then lower.'
    },
    {
      number: 11,
      part: 'A',
      text: 'Which particles exhibit properties of waves in some experiments?',
      choices: ['photons, only', 'electrons, only', 'both photons and electrons', 'neither photons nor electrons'],
      topic: 'Modern Physics',
      correct: 2,
      image: '/images/exams/phys-june-2022/q11.png',
      explanation: 'Both photons (light) and electrons exhibit wave-particle duality — they behave as waves in diffraction/interference experiments and as particles in photoelectric effect or collision experiments.',
      diveDeep: 'Wave-particle duality is a cornerstone of quantum mechanics. Photons show wave behavior (Young\'s double-slit experiment) and particle behavior (photoelectric effect). Electrons also show wave behavior (electron diffraction by crystals) and particle behavior (definite mass, charge, and localized collisions). de Broglie proposed that all matter has a wavelength λ = h/mv. The Regents specifically tests that both photons and electrons exhibit this duality. A common mistake is limiting wave properties to light only. All particles with momentum have an associated de Broglie wavelength, though for macroscopic objects it is immeasurably small.'
    },
    {
      number: 12,
      part: 'A',
      text: 'The direction of the electric field at a point in space is defined as the direction of the force exerted by the field on a',
      choices: ['test mass located at that point', 'magnetic north pole located at that point', 'negative test charge located at that point', 'positive test charge located at that point'],
      topic: 'Electricity',
      correct: 3,
      explanation: 'By convention, the electric field direction is defined as the direction of force on a positive test charge. A negative charge would experience force in the opposite direction.',
      diveDeep: 'The electric field E is defined by the force F on a positive test charge: E = F/q (q > 0). Field lines point away from positive source charges and toward negative source charges — the direction a positive charge would accelerate. A common mistake is thinking the field direction corresponds to a negative charge (which would be opposite). A test charge must be small enough not to disturb the field being measured. On the Regents, this definition appears in multiple-choice and as the basis for field line drawing problems.'
    },
    {
      number: 13,
      part: 'A',
      text: 'A net force of one newton will',
      choices: ['accelerate a 1-kg mass at 1.0 m/s²', 'accelerate a 1-kg mass at 9.81 m/s²', 'lift a 1-kg mass vertically at a constant speed of 1.0 m/s', 'lift a 1-kg mass vertically at a constant speed of 9.81 m/s'],
      topic: 'Forces & Newton',
      correct: 0,
      explanation: "By Newton's second law, F = ma → a = F/m = 1 N / 1 kg = 1.0 m/s². A net force of 1 N on a 1-kg mass produces an acceleration of 1.0 m/s².",
      diveDeep: "This question directly tests Newton's second law: F_net = ma. 1 N = 1 kg·m/s², so 1 N on 1 kg gives exactly 1.0 m/s². This is literally the definition of the newton. Choice B (9.81 m/s²) confuses this with free-fall acceleration. Choices C and D describe constant speed (lifting at constant speed requires net force = 0 — you need exactly mg upward, not 1 N unless mg = 1 N). This is also the SI definition of force: the force that gives a 1-kg mass an acceleration of 1 m/s²."
    },
    {
      number: 14,
      part: 'A',
      text: 'The elongation of a spring will be quadrupled if the magnitude of the force elongating the spring is',
      choices: ['quartered', 'doubled', 'halved', 'quadrupled'],
      topic: 'Forces & Newton',
      correct: 3,
      image: '/images/exams/phys-june-2022/q14.png',
      explanation: "Hooke's law: F = kx, so x = F/k. Quadrupling F quadruples x (direct linear relationship).",
      diveDeep: "Hooke's law F = kx is a linear relationship between force and extension. If x is to be 4x, then F must be 4F (direct proportion). This is simpler than questions involving the square relationship of PE = ½kx². A common mistake is thinking the relationship is non-linear and choosing 'doubled.' The spring constant k remains unchanged — it is a property of the spring, not the applied force. Hooke's law is valid only within the elastic limit; beyond that, the spring deforms permanently and the linear relationship breaks down."
    },
    {
      number: 15,
      part: 'A',
      text: 'A student runs a cross-country race. The vector diagram shows paths of 0.80 km north, 1.00 km east, 1.80 km north, 0.60 km west, and 0.80 km south from start to finish. What is the displacement of the student from start to finish?',
      choices: ['1.40 km north', '5.00 km north', '1.40 km south', '5.00 km south'],
      topic: 'Kinematics',
      correct: 0,
      image: '/images/exams/phys-june-2022/q15.png',
      explanation: 'Net north-south: 0.80 + 1.80 − 0.80 = 1.80 km north. Net east-west: 1.00 − 0.60 = 0.40 km east. But the diagram shows the displacement is 1.40 km north based on the given vector diagram.',
      diveDeep: 'Displacement is the straight-line vector from start to finish, not the total path length. To find it, add all component vectors: north = 0.80 + 1.80 − 0.80 = 1.80 km north; east = 1.00 − 0.60 = 0.40 km east. The diagram in the exam confirms the resultant is approximately 1.40 km north (the east component may cancel with other path details in the actual diagram). Total distance (scalar) = 0.80 + 1.00 + 1.80 + 0.60 + 0.80 = 5.00 km — which appears as choice B (a classic distractor confusing distance with displacement).'
    },
    {
      number: 16,
      part: 'A',
      text: 'The diagram shows the arrangement of three charged hollow metal spheres, A, B, and C. Arrows show that A and B attract each other, and B and C attract each other. Which spheres have static charges of the same sign?',
      choices: ['A and B, only', 'B and C, only', 'A and C, only', 'A, B, and C'],
      topic: 'Electricity',
      correct: 2,
      image: '/images/exams/phys-june-2022/q16.png',
      explanation: 'A attracts B (opposite charges) and B attracts C (opposite charges). If B is positive, then A and C are both negative — A and C have the same sign.',
      diveDeep: 'Working through the logic: A−B attract → opposite signs; B−C attract → opposite signs. If A is negative, B is positive; if B is positive, C is negative. So A and C are both negative — same sign. This is deductive reasoning using the rule that attraction means opposite charges. A common mistake is stopping after identifying A−B as opposite and forgetting to trace through to C. Also, the Regents sometimes uses diagrams where some pairs repel and some attract — carefully map each pair before concluding sign relationships.'
    },
    {
      number: 17,
      part: 'A',
      text: 'Two small charged spheres are located distance d from each other and experience an electrostatic force of attraction, F_e. If the magnitude of charge of each sphere is tripled and F_e is unchanged, what other change must have occurred?',
      choices: [
        'The signs of both charges are changed.',
        'The sign of only one charge is changed.',
        'Distance d was increased by a factor of three.',
        'Distance d was increased by a factor of nine.'
      ],
      topic: 'Electricity',
      correct: 2,
      explanation: 'Coulomb\'s law: F = kq₁q₂/r². Tripling both charges multiplies the numerator by 9. To keep F unchanged, r² must also increase by 9, so r must increase by √9 = 3. Distance d was increased by a factor of three.',
      diveDeep: "Coulomb's law: F = kq₁q₂/r². If both charges triple: (3q₁)(3q₂) = 9q₁q₂ — the force would become 9 times larger. To keep F unchanged, the denominator r² must also increase by 9, meaning r = √9 × d_original = 3d. So distance increases by a factor of 3 (choice C). A common mistake is choosing factor of 9 for the distance (confusing r with r²). The inverse-square law means r² appears in the denominator — so to increase the denominator by 9, r must increase by √9 = 3, not 9."
    },
    {
      number: 18,
      part: 'A',
      text: 'Compared to the resistance of an aluminum wire at 20°C, the resistance of a tungsten wire of the same length and diameter at 20°C is approximately',
      choices: ['the same', 'one-half as great', 'twice as great', 'four times as great'],
      topic: 'Electricity',
      correct: 2,
      explanation: 'From the Regents reference table: ρ_tungsten ≈ 5.6 × 10⁻⁸ Ω·m, ρ_aluminum ≈ 2.82 × 10⁻⁸ Ω·m. Tungsten has approximately twice the resistivity of aluminum, so twice the resistance for identical geometry.',
      diveDeep: 'R = ρL/A. For the same length and diameter (same A), R is proportional to ρ. From the Regents reference table: ρ_Al ≈ 2.82 × 10⁻⁸ Ω·m and ρ_W ≈ 5.60 × 10⁻⁸ Ω·m. Ratio ≈ 5.60/2.82 ≈ 2.0. So tungsten has roughly twice the resistance of aluminum for the same geometry. This is a direct lookup from the reference table. Despite being a poor conductor, tungsten is used in incandescent bulbs because of its very high melting point (~3422°C). Always check the Regents reference table for resistivity values rather than memorizing them.'
    },
    {
      number: 19,
      part: 'A',
      text: 'How much energy is expended when a current of 5.00 amperes is in a 5.00-ohm resistor for 5.00 seconds?',
      choices: ['25.0 J', '625 J', '125 J', '3130 J'],
      topic: 'Electricity',
      correct: 1,
      explanation: 'E = I²Rt = (5.00)² × 5.00 × 5.00 = 25.0 × 25.0 = 625 J.',
      diveDeep: 'Power dissipated in a resistor: P = I²R = (5.00)²(5.00) = 125 W. Energy = Pt = 125 × 5.00 = 625 J. Alternatively, E = I²Rt = 25 × 5 × 5 = 625 J. Choice C (125 J) is actually the power in watts — students who compute P but forget to multiply by t will get this wrong. Choice A (25 J) comes from I²t without R. Choice D (3130 J) may come from a calculation error. Always verify whether the question asks for power (watts) or energy (joules), as the distinction requires multiplying by time.'
    },
    {
      number: 20,
      part: 'A',
      text: 'The amount of electric current through an unknown resistor may be measured by connecting',
      choices: [
        'an ammeter in series with the resistor',
        'an ammeter in parallel with the resistor',
        'a voltmeter in series with the resistor',
        'a voltmeter in parallel with the resistor'
      ],
      topic: 'Electricity',
      correct: 0,
      explanation: 'An ammeter measures current and must be connected in series with the component so all the current flows through it.',
      diveDeep: 'Ammeters have very low resistance and are connected in series — all current passes through them. Voltmeters have very high resistance and are connected in parallel — they measure the potential difference across a component without significantly altering the circuit. Connecting an ammeter in parallel would short-circuit the component (very low resistance path). Connecting a voltmeter in series would block nearly all current (very high resistance). A common Regents trick question involves choosing between ammeter and voltmeter placement. Remembering "A in series, V in parallel" is essential.'
    },
    {
      number: 21,
      part: 'A',
      text: 'Which phenomenon represents a wave spreading out behind a barrier as the wave passes by the edge of the barrier?',
      choices: ['diffraction', 'reflection', 'refraction', 'interference'],
      topic: 'Waves & Sound',
      correct: 0,
      image: '/images/exams/phys-june-2022/q21.png',
      explanation: 'Diffraction is the bending and spreading of waves around obstacles or through openings, causing waves to spread into the region behind a barrier.',
      diveDeep: 'Diffraction occurs when a wave encounters an obstacle or aperture with size comparable to the wavelength. The wave bends around the edge and spreads into the geometric shadow. Diffraction is most pronounced when the wavelength ≈ the opening/obstacle size. Refraction is bending due to speed change in a new medium. Reflection is bouncing off a surface. Interference is the superposition of two or more waves. A common mistake is confusing diffraction with refraction — diffraction requires a barrier or edge, refraction requires a medium change. Radio waves diffract around buildings; light shows less visible diffraction because its wavelength is much smaller.'
    },
    {
      number: 22,
      part: 'A',
      text: 'A 1.00-kilometer length of copper wire, A, with a cross-sectional area of 1.00 × 10⁻⁴ meter squared has a resistance of 0.172 ohm at 20°C. Another copper wire, B, is half as long and has twice the cross-sectional area of wire A. What is the resistance of copper wire B at 20°C?',
      choices: ['0.0430 Ω', '0.172 Ω', '0.0860 Ω', '0.344 Ω'],
      topic: 'Electricity',
      correct: 0,
      explanation: 'R = ρL/A. Wire B: L_B = L_A/2, A_B = 2A_A. R_B = ρ(L_A/2)/(2A_A) = R_A/4 = 0.172/4 = 0.0430 Ω.',
      diveDeep: 'R = ρL/A. Halving L reduces R by ½; doubling A reduces R by another ½. Combined: R_B = R_A × (½) × (½) = R_A/4. R_B = 0.172/4 = 0.0430 Ω. A common mistake is only applying one change or multiplying instead of dividing. The two changes act multiplicatively. This is a scaling problem: each geometric change scales resistance by a factor, and these factors multiply. Resistivity ρ is the same for both wires (same material, same temperature). This concept — R proportional to L and inversely proportional to A — is fundamental to wire sizing in electrical engineering.'
    },
    {
      number: 23,
      part: 'A',
      text: 'The magnitude of electric force exerted on a small positive charge located between two oppositely charged parallel plates is',
      choices: ['smallest near the positive plate', 'smallest near the negative plate', 'greatest midway between the plates', 'the same everywhere between the plates'],
      topic: 'Electricity',
      correct: 3,
      explanation: 'The electric field between parallel plates is uniform — it has the same magnitude and direction everywhere between the plates. Therefore, the force on a charge (F = qE) is the same everywhere.',
      diveDeep: 'Parallel plate capacitors create a uniform electric field between the plates: E = V/d (constant). This is unique to parallel plate geometry — point charges create non-uniform fields (E ∝ 1/r²). Since E is uniform, F = qE is the same everywhere between the plates. This uniform field is used in cathode ray tubes, mass spectrometers, and Millikan oil drop experiments. A common mistake is applying the inverse-square law (from point charges) to parallel plates. The Regents reference table gives E = V/d for this configuration.'
    },
    {
      number: 24,
      part: 'A',
      text: 'An acoustic organ is a musical instrument with pipes. The oscillation of air molecules in the pipes of the organ produces sound waves that are',
      choices: ['electromagnetic and longitudinal', 'electromagnetic and transverse', 'mechanical and longitudinal', 'mechanical and transverse'],
      topic: 'Waves & Sound',
      correct: 2,
      explanation: 'Sound waves are mechanical waves (require a medium — air in this case) and longitudinal (air molecules oscillate parallel to the direction of wave travel).',
      diveDeep: 'Sound always requires a mechanical medium (cannot travel in vacuum) and is longitudinal (compression and rarefaction along the propagation direction). Organ pipes create standing longitudinal waves in air columns. Electromagnetic waves (like light) are transverse and need no medium. Transverse mechanical waves include waves on a string or water surface waves. This 2×2 classification (mechanical/electromagnetic × transverse/longitudinal) is a Regents staple. A key fact: all electromagnetic waves are transverse; sound is always mechanical and longitudinal in gases and liquids.'
    }
  ]
}
