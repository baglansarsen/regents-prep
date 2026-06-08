// Physics Regents — June 2024
export default {
  id: 'phys-jun-2024',
  subject: 'physics',
  year: 2024,
  session: 'June',
  totalMinutes: 180,
  questions: [
    {
      number: 1,
      part: 'A',
      text: 'Which quantity is a vector?',
      choices: ['electric field', 'electric potential difference', 'electric charge', 'electric power'],
      topic: 'Electricity',
      correct: 0,
      explanation: 'Electric field is a vector quantity — it has both magnitude (N/C) and direction (the direction of force on a positive test charge). Potential difference, charge, and power are all scalars.',
      diveDeep: 'Electric field E = F/q is a vector pointing in the direction of force on a positive test charge. Electric potential difference (voltage) is a scalar — it has magnitude (volts) but no direction. Electric charge is scalar (positive or negative value, no direction). Electric power P = IV is also scalar. Recognizing which electrical quantities are vectors vs. scalars is a recurring Regents topic. Other vector electrical/magnetic quantities include: magnetic field B and current density J.'
    },
    {
      number: 2,
      part: 'A',
      text: 'What is the magnitude of the eastward component of the velocity of an airplane flying at 612 kilometers per hour in a direction 40.0° north of east?',
      choices: ['393 km/h', '799 km/h', '469 km/h', '952 km/h'],
      topic: 'Kinematics',
      correct: 2,
      explanation: 'Eastward component = v cosθ = 612 × cos 40.0° = 612 × 0.766 ≈ 469 km/h.',
      diveDeep: 'For a vector at angle θ above horizontal (east), the eastward (horizontal) component is v cosθ and the northward (vertical) component is v sinθ. Here: v_E = 612 cos 40° ≈ 612 × 0.766 ≈ 469 km/h. Choice A (393 km/h) = 612 sin 40° — the northward component, not eastward. A common mistake is using sine for the horizontal component. Always associate cosine with the adjacent side (the direction the angle is measured from — here eastward). The original file incorrectly marks choice 1 (799 km/h), which has no physical basis.'
    },
    {
      number: 3,
      part: 'A',
      text: 'A car, initially traveling at 25 meters per second, is uniformly brought to rest as the brakes are applied over a distance of 40. meters. The magnitude of the average acceleration of the car while braking is',
      choices: ['0.31 m/s²', '7.8 m/s²', '0.63 m/s²', '16 m/s²'],
      topic: 'Kinematics',
      correct: 1,
      image: '/images/exams/phys-june-2024/q3.png',
      explanation: 'Using v² = v₀² + 2ad: 0 = (25)² + 2a(40) → a = −625/80 ≈ −7.8 m/s². Magnitude = 7.8 m/s².',
      diveDeep: 'The car decelerates from 25 m/s to rest over 40 m. Using v² = v₀² + 2aΔx: 0 = 625 + 80a → a = −7.81 m/s² (negative = deceleration). Magnitude = 7.8 m/s². Choice A (0.31) comes from a = v/d = 25/80. Choice D (16) might come from a = v²/d = 625/40 (forgetting the factor of 2). A common mistake is not squaring v₀ or forgetting the 2 in the kinematic equation. This is the v² = v₀² + 2aΔx equation applied with v_f = 0.'
    },
    {
      number: 4,
      part: 'A',
      text: 'A brick starts from rest and falls freely from the top of a building to the ground. As the brick falls, its acceleration',
      choices: ['increases and its speed increases', 'increases and its speed is constant', 'is constant and its speed increases', 'is constant and its speed is constant'],
      topic: 'Kinematics',
      correct: 2,
      image: '/images/exams/phys-june-2024/q4.png',
      explanation: 'In free fall, the only force is gravity, which produces a constant acceleration of 9.81 m/s² downward. With constant acceleration, speed increases continuously from rest.',
      diveDeep: "Free fall near Earth's surface: a = g = 9.81 m/s² = constant (gravity doesn't change over building heights). Since the brick starts from rest and has constant downward acceleration, speed increases linearly: v = gt. Many students incorrectly think acceleration increases as the brick speeds up — this confuses acceleration with speed. Acceleration is the rate of change of speed, not speed itself. With constant g and starting from rest, speed grows uniformly: v = 0 + gt. This contrasts with situations involving air resistance (terminal velocity), which is NOT assumed here."
    },
    {
      number: 5,
      part: 'A',
      text: 'Which object has the greatest inertia?',
      choices: ['a 0.10-kg baseball traveling at 30. m/s', 'a 70-kg sprinter traveling at 10. m/s', 'a 1000-kg car traveling at 50. m/s', 'a 2000-kg truck traveling at 20. m/s'],
      topic: 'Forces & Newton',
      correct: 3,
      explanation: 'Inertia is measured by mass alone. The 2000-kg truck has the greatest mass and therefore the greatest inertia.',
      diveDeep: 'Inertia depends only on mass, not on speed, velocity, or kinetic energy. Mass: baseball 0.10 kg, sprinter 70 kg, car 1000 kg, truck 2000 kg. The truck has the largest mass → greatest inertia. The speeds given are distractors — they affect momentum (mv) and kinetic energy (½mv²) but not inertia. A common mistake is computing momentum or KE and selecting the largest value. The question asks about inertia (resistance to change in motion) which is purely determined by mass. This is Newton\'s first law in the context of the measure of inertia.'
    },
    {
      number: 6,
      part: 'A',
      text: 'An unbalanced force is always necessary to',
      choices: ['keep a body at rest', 'keep a body moving with constant velocity', 'change the speed of a body', 'change the position of a body'],
      topic: 'Forces & Newton',
      correct: 2,
      explanation: "By Newton's second law, an unbalanced (net) force produces acceleration, which changes speed (and/or direction). Constant velocity and rest both require zero net force.",
      diveDeep: "Newton's second law: F_net = ma. An unbalanced (non-zero net) force produces acceleration — a change in velocity, which includes changing speed or direction. Keeping a body at rest or at constant velocity requires zero net force (Newton's first law). Changing position alone is possible with zero net force (constant velocity motion). A common mistake is thinking motion requires a net force. Only changing motion (acceleration) requires a net force. 'Change the speed' (choice C) is the only option that always requires an unbalanced force."
    },
    {
      number: 7,
      part: 'A',
      text: 'Space probes launched from Earth send information back to Earth from space in the form of',
      choices: ['mechanical waves', 'sound waves', 'longitudinal waves', 'electromagnetic waves'],
      topic: 'Waves & Sound',
      correct: 3,
      explanation: 'Radio waves (a form of electromagnetic radiation) are used to transmit data from space probes back to Earth. Electromagnetic waves can travel through the vacuum of space; mechanical waves cannot.',
      diveDeep: 'Mechanical waves (sound, water waves) require a medium and cannot travel through vacuum. Space is essentially a vacuum, so only electromagnetic waves can traverse it. Radio waves — the lowest frequency EM waves — are used for space communication because they can be generated, transmitted, and detected with relatively simple technology and penetrate Earth\'s atmosphere. Light, infrared, and X-rays are also electromagnetic and could travel through space, but radio frequencies are optimal for deep-space communication. The speed of all EM waves in vacuum is c = 3.00 × 10⁸ m/s.'
    },
    {
      number: 8,
      part: 'A',
      text: 'A ball is thrown from level ground at an angle of 55° above the horizontal and lands on level ground. Neglecting friction, if the ball is thrown again at the same angle but with a larger initial speed, the ball will travel',
      choices: ['higher and the same distance horizontally', 'to the same maximum height and farther horizontally', 'both higher and farther horizontally', 'to the same maximum height and the same distance horizontally'],
      topic: 'Kinematics',
      correct: 2,
      image: '/images/exams/phys-june-2024/q8.png',
      explanation: 'Increasing initial speed increases both the vertical component (greater height) and the horizontal component (greater range). Both maximum height and horizontal distance increase.',
      diveDeep: 'For a projectile at angle θ with speed v₀: max height H = (v₀sinθ)²/(2g) ∝ v₀², and range R = v₀²sin(2θ)/g ∝ v₀². Both H and R scale with v₀², so increasing v₀ increases both. The angle (55°) is unchanged. A common mistake is thinking only one dimension changes when speed increases. Since increasing v₀ increases both horizontal and vertical components simultaneously, both height and range increase. This is a conceptual question about how initial speed affects the full trajectory — both H and R scale as v₀².'
    },
    {
      number: 9,
      part: 'A',
      text: 'A photon collides with an electron. After the collision, the electron recoils and the photon is scattered in another direction with a longer wavelength than the incident photon. The increase in photon wavelength results because, during the collision, the photon',
      choices: ['loses energy to the electron', 'gains momentum from the electron', 'loses some speed', 'generates a magnetic field'],
      topic: 'Modern Physics',
      correct: 0,
      image: '/images/exams/phys-june-2024/q9.png',
      explanation: 'This describes the Compton effect. The photon transfers some of its energy to the electron. Since photon energy E = hc/λ, lower energy means longer wavelength.',
      diveDeep: 'The Compton effect demonstrates photon-electron collisions where photons behave as particles with momentum p = h/λ. When a photon collides with an electron, it transfers some energy and momentum to the electron. The scattered photon has less energy (E = hf = hc/λ), so its frequency decreases and wavelength increases. The photon\'s speed in vacuum always remains c — photons cannot "slow down" (eliminating choice C). A photon gaining momentum from the electron would mean a shorter wavelength, not longer. This experiment was crucial evidence for the particle nature of light.'
    },
    {
      number: 10,
      part: 'A',
      text: 'What is the weight of a 60.0-kilogram student on the surface of Earth?',
      choices: ['0.164 N', '60.0 N', '6.12 N', '589 N'],
      topic: 'Forces & Newton',
      correct: 3,
      explanation: 'Weight W = mg = 60.0 kg × 9.81 m/s² = 588.6 N ≈ 589 N.',
      diveDeep: 'Weight is the gravitational force on an object: W = mg. Here m = 60.0 kg and g = 9.81 m/s² (from the Regents reference table). W = 60.0 × 9.81 = 588.6 N ≈ 589 N. Choice B (60.0 N) confuses mass (kg) with weight (N). Choice C (6.12 N) comes from W = m/g (incorrectly dividing). Choice A (0.164 N) is nonsensical. Weight is always larger than mass numerically on Earth because g > 1. The distinction between mass (kg) and weight (N) is one of the most fundamental concepts in physics.'
    },
    {
      number: 11,
      part: 'A',
      text: 'A 120-newton box is pulled by a 48-newton horizontal force across a horizontal surface at constant velocity. The coefficient of kinetic friction between the box and the horizontal surface is',
      choices: ['0.041', '0.67', '0.40', '2.5'],
      topic: 'Forces & Newton',
      correct: 2,
      explanation: 'At constant velocity, the applied force equals the friction force: f_k = 48 N. μ_k = f_k / F_N = 48 N / 120 N = 0.40.',
      diveDeep: 'At constant velocity, net force = 0, so applied force = friction force = 48 N. Normal force F_N = weight = 120 N (horizontal surface). μ_k = f_k/F_N = 48/120 = 0.40. This is within the typical range for wood-on-wood (μ ≈ 0.20–0.50). A common mistake is using F_N = applied force instead of weight. On a horizontal surface with no vertical component of applied force, the normal force equals the object\'s weight. Choice D (2.5) comes from inverting the ratio: 120/48. The Regents reference table lists typical coefficients of friction for common material pairs.'
    },
    {
      number: 12,
      part: 'A',
      text: 'Box A has a mass of 10. kilograms and is at rest on a shelf that is 1.5 meters above the floor. Box B has a mass of 20. kilograms and is at rest on a shelf that is 3.0 meters above the floor. Compared to box A, box B has a gravitational potential energy relative to the floor that is',
      choices: ['one fourth as great', 'twice as great', 'the same', 'four times as great'],
      topic: 'Energy & Work',
      correct: 3,
      explanation: 'PE_A = m_A × g × h_A = 10 × g × 1.5 = 15g. PE_B = 20 × g × 3.0 = 60g. Ratio: PE_B/PE_A = 60g/15g = 4. Box B has four times the gravitational PE.',
      diveDeep: 'PE = mgh. PE_A = 10(g)(1.5) = 15g J; PE_B = 20(g)(3.0) = 60g J. Ratio = 60g/15g = 4. Both mass and height are doubled for box B, so each factor of 2 contributes: PE_B = (2m_A)(g)(2h_A) = 4(m_A × g × h_A) = 4 × PE_A. A common mistake is considering only mass or only height as doubled — students might say "twice as great." Both quantities are doubled, compounding the effect. This is a good example of how to handle two simultaneous changes in a proportional relationship.'
    },
    {
      number: 13,
      part: 'A',
      text: 'A 0.10-kilogram yo-yo is whirled at the end of a length of string in a horizontal circular path of radius 0.80 meter at a speed of 6.0 meters per second. The magnitude of the centripetal acceleration of the yo-yo is',
      choices: ['4.5 m/s²', '0.75 m/s²', '7.5 m/s²', '45 m/s²'],
      topic: 'Kinematics',
      correct: 3,
      explanation: 'a_c = v²/r = (6.0)²/0.80 = 36/0.80 = 45 m/s².',
      diveDeep: 'Centripetal acceleration a_c = v²/r. Here v = 6.0 m/s, r = 0.80 m: a_c = 36/0.80 = 45 m/s². The mass (0.10 kg) is a distractor — it is needed for centripetal force (F = mv²/r = 4.5 N) but not for centripetal acceleration. Choice A (4.5 m/s²) is actually the centripetal force in newtons — a common confusion. Choice C (7.5) comes from v/r = 6/0.8 (not squaring v). Always remember to square the speed in a_c = v²/r. This is ≈4.6g — a very large centripetal acceleration for a small object moving quickly in a tight circle.'
    },
    {
      number: 14,
      part: 'A',
      text: 'A 4.0-kilogram mass is initially at rest on a horizontal, frictionless surface. A constant 2.0-newton force to the east is applied to the mass for a 5.0-second interval. As a result of this action, the mass acquires a',
      choices: ['velocity of 10. m/s, east', 'velocity of 10. m/s, west', 'momentum of 10. kg·m/s, east', 'momentum of 10. kg·m/s, west'],
      topic: 'Forces & Newton',
      correct: 2,
      explanation: 'Impulse = FΔt = 2.0 N × 5.0 s = 10 N·s = 10 kg·m/s east (change in momentum). Initial momentum is zero, so final momentum = 10 kg·m/s east.',
      diveDeep: 'The impulse-momentum theorem: J = FΔt = Δp. J = 2.0 × 5.0 = 10 N·s = 10 kg·m/s east. Since initial momentum = 0, final p = 10 kg·m/s east. Velocity v = p/m = 10/4.0 = 2.5 m/s east (not 10 m/s). Choice A (10 m/s) confuses impulse with velocity — they have the same numerical value here but different units and meanings. Choice B and D (west) have wrong direction. The mass gains eastward momentum. This is one of the cleanest applications of J = Δp on the Regents.'
    },
    {
      number: 15,
      part: 'A',
      text: 'A motor lifts a 1.2 × 10⁴-newton elevator 9.0 meters in 15 seconds. The minimum power output of the motor is',
      choices: ['8.0 × 10² W', '7.2 × 10³ W', '1.0 × 10⁵ W', '1.6 × 10⁶ W'],
      topic: 'Energy & Work',
      correct: 1,
      explanation: 'W = Fd = (1.2 × 10⁴)(9.0) = 1.08 × 10⁵ J. P = W/t = 1.08 × 10⁵ / 15 = 7.2 × 10³ W.',
      diveDeep: 'P = W/t = Fd/t. W = 1.2 × 10⁴ × 9.0 = 1.08 × 10⁵ J. P = 1.08 × 10⁵ / 15 ≈ 7200 W = 7.2 × 10³ W. This is the minimum power — sufficient to lift at constant speed with no extra kinetic energy gain. Choice A (8.0 × 10²) uses F/d = 1.2 × 10⁴/15. Choice C (1.0 × 10⁵) is the work in joules (not power in watts). Always check units: N × m / s = W ✓. Power = 7200 W ≈ 9.6 horsepower — typical for a building elevator motor.'
    },
    {
      number: 16,
      part: 'A',
      text: 'A train blows its horn, which emits a uniform sound as the train approaches a stationary observer. The observer hears a sound that has a',
      choices: [
        'lower frequency than the emitted sound and is decreasing in amplitude',
        'lower frequency than the emitted sound and is increasing in amplitude',
        'higher frequency than the emitted sound and is decreasing in amplitude',
        'higher frequency than the emitted sound and is increasing in amplitude'
      ],
      topic: 'Waves & Sound',
      correct: 3,
      explanation: 'As the train approaches, the Doppler effect causes the observer to hear a higher frequency. As the train gets closer, the sound also gets louder (increasing amplitude).',
      diveDeep: 'The Doppler effect: approaching source → compressed wavefronts → higher observed frequency. Additionally, as the source approaches, the sound intensity increases (inverse square law: I ∝ 1/r²), so amplitude increases. Both effects occur simultaneously for an approaching source. The Regents often combines the Doppler frequency shift with amplitude/intensity changes. A common mistake is separating frequency and amplitude as independent concepts — for an approaching constant-speed source, frequency is constant but higher than emitted, and amplitude steadily increases as the source nears.'
    },
    {
      number: 17,
      part: 'A',
      text: 'A wood block is pulled at constant velocity across a horizontal wood floor. Which type of energy increases in this block-floor system as the block moves?',
      choices: ['gravitational potential', 'mechanical', 'kinetic', 'thermal'],
      topic: 'Energy & Work',
      correct: 3,
      explanation: 'At constant velocity on a horizontal surface, kinetic energy and gravitational PE are both constant. The work done against friction converts mechanical energy to thermal (heat) energy.',
      diveDeep: 'At constant velocity: KE is constant (constant speed), gravitational PE is constant (no height change), so mechanical energy is constant. The force applied to maintain constant speed does work against friction, converting mechanical energy to thermal energy (heat) in the block and floor surfaces. This is why rubbing your hands together warms them. A common mistake is choosing "kinetic" because the block is moving — but kinetic energy is constant (not increasing) since speed is constant. "Thermal" is the correct answer: friction is a dissipative force that always increases thermal energy.'
    },
    {
      number: 18,
      part: 'A',
      text: 'A total energy of 5.0 joules is used to move an electron from position A to position B in a uniform electric field. What is the potential difference between positions A and B?',
      choices: ['3.1 × 10¹⁹ V', '3.2 × 10⁻²⁰ V', '8.0 × 10⁻¹⁹ V', '3.1 × 10¹⁸ V'],
      topic: 'Electricity',
      correct: 0,
      explanation: 'V = W/q = 5.0 J / (1.6 × 10⁻¹⁹ C) = 3.125 × 10¹⁹ V ≈ 3.1 × 10¹⁹ V.',
      diveDeep: 'Potential difference V = W/q, where W is work done and q is charge. For an electron: q = 1.6 × 10⁻¹⁹ C. V = 5.0 / (1.6 × 10⁻¹⁹) = 3.125 × 10¹⁹ V. This is an astronomically large voltage! Moving a macroscopic amount of energy (5 J) with a single electron requires an enormous potential difference. Choice B (3.2 × 10⁻²⁰) comes from W × q instead of W/q (inverted formula). This question tests proper use of V = W/q and handling of very small charge values. The elementary charge e = 1.6 × 10⁻¹⁹ C must be on the Regents reference table.'
    },
    {
      number: 19,
      part: 'A',
      text: 'A 0.14-kilogram lacrosse ball, traveling west at 17 meters per second, is brought to rest with a lacrosse stick. If the force applied by the lacrosse stick on the ball is 220 newtons east, the force applied by the ball on the stick is',
      choices: ['150 N east', '220 N east', '220 N west', '150 N west'],
      topic: 'Forces & Newton',
      correct: 2,
      explanation: "By Newton's third law, the ball exerts a force on the stick equal in magnitude (220 N) and opposite in direction (west) to the force the stick exerts on the ball.",
      diveDeep: "Newton's third law: action-reaction forces are equal in magnitude and opposite in direction. The stick exerts 220 N east on the ball; the ball exerts 220 N west on the stick. The ball's mass (0.14 kg) and initial velocity (17 m/s west) are used to find the time of contact or verify impulse = Δp, but they are not needed for the Newton's third law answer. A common mistake is using Δp to find the force — but that gives the net force on the ball, not the reaction force. The reaction force equals the action force exactly: 220 N in the opposite direction."
    },
    {
      number: 20,
      part: 'A',
      text: 'Four wires are tested for electrical conductivity. All the wires have the same length and the same cross-sectional area, but are made of different metals. Which wire has the highest conductivity at 20°C?',
      choices: ['aluminum', 'gold', 'copper', 'silver'],
      topic: 'Electricity',
      correct: 3,
      explanation: 'Silver has the lowest electrical resistivity of any pure metal at room temperature (ρ ≈ 1.59 × 10⁻⁸ Ω·m), making it the best conductor and having the highest conductivity.',
      diveDeep: 'Electrical conductivity σ = 1/ρ (inverse of resistivity). From the Regents reference table resistivities at 20°C: silver ≈ 1.59, copper ≈ 1.72, gold ≈ 2.44, aluminum ≈ 2.82 (all × 10⁻⁸ Ω·m). Lower ρ = higher conductivity. Silver has the lowest ρ → highest conductivity. Copper is used in wiring because silver is too expensive, despite copper\'s slightly higher resistivity. Gold is used in electronic contacts because it does not corrode, not because it is the best conductor. This is a direct Regents reference table lookup question.'
    },
    {
      number: 21,
      part: 'A',
      text: 'The angle of incidence for a ray of light striking a plane mirror is 20°. What is the angle between the incident ray and the reflected ray?',
      choices: ['20°', '40°', '70°', '90°'],
      topic: 'Light & Optics',
      correct: 1,
      explanation: 'The angle of reflection = angle of incidence = 20°. The angle between the incident and reflected rays = 20° + 20° = 40°.',
      diveDeep: 'The law of reflection: angle of incidence = angle of reflection (both measured from the normal). The incident and reflected rays are each 20° from the normal, so the total angle between them is 20° + 20° = 40°. A common mistake is answering 20° (just the angle of incidence or reflection, not between the two rays). Another mistake is 70° (the complement: measured from the mirror surface instead of the normal). For any reflection, the angle between the two rays = 2 × angle of incidence. If the angle of incidence were 45°, the angle between rays would be 90° (retroreflector principle).'
    },
    {
      number: 22,
      part: 'A',
      text: 'A mass slides across a level, frictionless surface and strikes a spring, causing the spring to compress. As the mass moves from the point of first contact (position A) to maximum compression (position B), which statement best describes the energy conversion?',
      choices: [
        'Some of mass M\'s kinetic energy is converted to elastic potential energy.',
        'All of mass M\'s kinetic energy is converted to elastic potential energy.',
        'Some of mass M\'s kinetic energy is converted to gravitational potential energy.',
        'All of mass M\'s kinetic energy is converted to internal energy.'
      ],
      topic: 'Energy & Work',
      correct: 0,
      image: '/images/exams/phys-june-2024/q22.png',
      explanation: 'Between positions A and B, the mass is still moving at vf (slowed but not stopped), so it still has kinetic energy. Only some KE has been converted to elastic PE stored in the spring.',
      diveDeep: 'At position B the mass moves at a slower speed vf (not zero), so it still has kinetic energy — not all KE is converted. The spring stores elastic PE = ½kx². Since the surface is frictionless and horizontal, no gravitational PE or thermal energy is involved. The conversion is KE → elastic PE, but only partially. If the question stated the mass came to rest at B, then all KE would be converted (choice B). The key word "slower speed, vf" rather than "at rest" makes the answer "some" not "all." This is conservation of energy applied to a spring-mass system.'
    },
    {
      number: 23,
      part: 'A',
      text: 'A magnetic compass is placed between unlike magnetic poles (N on left, S on right). The north pole of the compass needle will point toward',
      choices: ['the south magnetic pole (right)', 'the north magnetic pole (left)', 'upward (perpendicular to the field)', 'downward (perpendicular to the field)'],
      topic: 'Electricity & Magnetism',
      correct: 0,
      image: '/images/exams/phys-june-2024/q23.png',
      explanation: 'Magnetic field lines go from north pole to south pole. The north pole of a compass needle aligns with the field direction — pointing toward the south pole (right).',
      diveDeep: 'External magnetic field lines go from N to S outside a magnet. A compass needle aligns with the field: its north pole points in the direction of the field lines (from N-pole to S-pole of the magnet). Between unlike poles, field lines run uniformly from left-N to right-S, so the compass north pole points right (toward S-pole). This seems counterintuitive — the compass N points toward the magnet\'s S. This is because unlike poles attract: the compass N is attracted toward the magnet\'s S. Earth\'s geographic north pole is actually a magnetic south pole, which is why compass needles point north.'
    },
    {
      number: 24,
      part: 'A',
      text: 'Which circuit diagram shows a lamp that will not have current passing through it until switch S is closed?',
      choices: [
        'Switch S in series with the lamp',
        'Switch S in parallel with the lamp',
        'Switch S in series with a different branch, not the lamp',
        'Switch S in parallel with the power source'
      ],
      topic: 'Electricity',
      correct: 0,
      image: '/images/exams/phys-june-2024/q24.png',
      explanation: 'When a switch is in series with the lamp, opening the switch breaks the circuit and no current flows through the lamp. Closing S completes the circuit and allows current through the lamp.',
      diveDeep: 'A switch in series with a component controls whether current flows through that component — opening the switch breaks the only current path. A switch in parallel with the lamp would short-circuit the lamp when closed (bypassing current away from the lamp), and when open would allow current through the lamp normally. For a lamp to have no current until S is closed, S must be in series with the lamp (or in series with the only path to the lamp). This is the basic principle behind light switches in homes. Understanding series vs. parallel switch placement is a fundamental circuit analysis skill.'
    },

    // ── Part B-1 (Q36–50) ──────────────────────────────────────────────────
    {
      number: 36,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'A light ray with a frequency of 5.09 × 10¹⁴ hertz has a wavelength of 2.44 × 10⁻⁷ meter in diamond. The wavelength of this light ray in sodium chloride is',
      choices: [
        '1.55 × 10⁻⁷ m',
        '2.44 × 10⁻⁷ m',
        '3.83 × 10⁻⁷ m',
        '5.89 × 10⁻⁷ m'
      ],
      correct: 2,
      topic: 'Waves & Light',
      explanation: 'In sodium chloride, n = 1.54. λ = c/(n·f) = (3.00 × 10⁸)/(1.54 × 5.09 × 10¹⁴) ≈ 3.83 × 10⁻⁷ m.',
      diveDeep: 'The frequency of light is constant as it passes from one medium to another; only speed and wavelength change. For any medium: λ = v/f = c/(n·f). For sodium chloride the index of refraction n = 1.54 (from the Regents reference table). λ_NaCl = (3.00 × 10⁸)/(1.54 × 5.09 × 10¹⁴) ≈ 3.83 × 10⁻⁷ m. The diamond wavelength (2.44 × 10⁻⁷ m) corresponds to n_diamond = 2.42, which gives a shorter wavelength than NaCl because diamond slows light more. A common mistake is using the diamond wavelength or confusing which medium has the larger index.'
    },
    {
      number: 37,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'The diagram shows resistors R1 (15 Ω), R2 (21 Ω), and R3 (24 Ω) connected to a 12-volt source, with R1 in series and R2 and R3 in parallel. The current flowing through resistor R3 is',
      choices: [
        '5.0 A',
        '2.0 A',
        '0.50 A',
        '0.20 A'
      ],
      correct: 3,
      topic: 'Electricity',
      explanation: 'R2 ∥ R3 = (21 × 24)/(21 + 24) ≈ 11.2 Ω. Total R = 15 + 11.2 = 26.2 Ω. I_total = 12/26.2 ≈ 0.458 A. V_parallel = 0.458 × 11.2 ≈ 5.13 V. I_R3 = 5.13/24 ≈ 0.21 A ≈ 0.20 A.',
      diveDeep: 'For R2 and R3 in parallel: 1/R_par = 1/21 + 1/24 = 45/504, so R_par ≈ 11.2 Ω. Series total: R_total = 15 + 11.2 = 26.2 Ω. Total current: I = 12/26.2 ≈ 0.458 A. The voltage across the parallel pair = I × R_par ≈ 0.458 × 11.2 ≈ 5.1 V. Current through R3: I_R3 = 5.1/24 ≈ 0.21 A, which rounds to 0.20 A. A common mistake is treating all three resistors as purely in series or purely in parallel. Recognize that R1 is in series with the parallel combination of R2 and R3.', image: '/images/exams/phys-june-2024/q37.png' },
    {
      number: 38,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'A charge of 25 coulombs moves past a point in a circuit in 2.5 seconds. What is the current at that point in the circuit?',
      choices: [
        '0.10 A',
        '10. A',
        '50. A',
        '63 A'
      ],
      correct: 1,
      topic: 'Electricity',
      explanation: 'I = Q/t = 25 C / 2.5 s = 10. A.',
      diveDeep: 'Electric current is defined as the rate of charge flow: I = ΔQ/Δt. Here Q = 25 C and t = 2.5 s, so I = 10 A. Choice A (0.10 A) comes from t/Q = 2.5/25 (inverted). Choice C (50 A) might come from adding Q + t. This is the most fundamental definition of current and should be a straightforward application of I = Q/t. The unit analysis also confirms: coulombs ÷ seconds = amperes (A).'
    },
    {
      number: 39,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'Which statement describes an object with constant kinetic energy?',
      choices: [
        'A car accelerates along a straight road.',
        'A runner decreases her speed along a curved path.',
        'A bicycle travels around a curve at constant speed.',
        'A sled travels down a frictionless, steep, straight hill.'
      ],
      correct: 2,
      topic: 'Energy & Work',
      explanation: 'KE = ½mv². For KE to be constant, speed must be constant. A bicycle traveling around a curve at constant speed has constant KE.',
      diveDeep: 'Kinetic energy KE = ½mv² depends only on mass (constant) and speed. For constant KE, speed must be constant. A car accelerating has increasing speed → increasing KE. A runner decreasing speed has decreasing KE. A sled on a frictionless downhill gains speed → increasing KE. Only the bicycle traveling at constant speed has constant KE. Note that velocity (a vector) changes as the bicycle curves, but speed (magnitude of velocity) is constant. This illustrates the important distinction between speed and velocity: KE depends on speed, not velocity direction.'
    },
    {
      number: 40,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'Which phrase describes a box in equilibrium?',
      choices: [
        'box in an elevator slowing down as it rises vertically',
        'box at rest on a stationary table',
        'box sliding down a frictionless ramp',
        'box in free fall'
      ],
      correct: 1,
      topic: 'Forces & Newton',
      explanation: 'Equilibrium means zero net force (and therefore zero acceleration). A box at rest on a stationary table has balanced normal force and gravity — net force = 0.',
      diveDeep: "Mechanical equilibrium means the net force on the object is zero, resulting in zero acceleration (it may still be moving at constant velocity). A box at rest on a table: F_N = F_g, net force = 0 — this is static equilibrium. An elevator slowing down has a net upward force (decelerating). A box on a frictionless ramp has a net force component along the ramp (gravity component − 0 friction). A box in free fall has a net downward force equal to gravity. The Regents definition of equilibrium aligns with Newton's first law: zero net force = constant velocity (including rest)."
    },
    {
      number: 41,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'Quarks may combine to produce a meson of charge',
      choices: [
        '−1/3 e',
        '+2 e',
        '+1/3 e',
        '0 e'
      ],
      correct: 3,
      topic: 'Modern Physics',
      explanation: 'A meson is a quark-antiquark pair. A quark of charge +2/3 e paired with an antiquark of charge −2/3 e gives a net charge of 0 e.',
      diveDeep: "Mesons consist of one quark and one antiquark. Quark charges are +2/3 e (up, charm, top) and −1/3 e (down, strange, bottom). Antiquarks have opposite charges: −2/3 e and +1/3 e. Possible meson charges: (+2/3) + (−2/3) = 0, (+2/3) + (+1/3) = +1e, (−1/3) + (−1/3) is not possible for quark-antiquark. The neutral pion (π⁰) is an example of a 0 charge meson. A charge of +2e would require three quarks of +2/3 each (a baryon, not a meson). The charge −1/3 e and +1/3 e are individual quark charges, not meson charges. Only 0 e and ±1 e are valid meson charges."
    },
    {
      number: 42,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'The diagram shows waves A and B traveling through the same medium. Wave A has a positive displacement and wave B has a negative displacement of the same amplitude. Which wave best represents the superposition of waves A and B?',
      choices: [
        'A wave with amplitude equal to the sum of A and B (constructive)',
        'A wave with amplitude equal to A minus B',
        'A flat line (complete destructive interference)',
        'A wave with double the frequency'
      ],
      correct: 2,
      topic: 'Waves & Sound',
      explanation: 'When wave A (positive) and wave B (negative) have equal amplitudes and are mirror images, their superposition results in complete destructive interference — a flat line (zero displacement).',
      diveDeep: 'The principle of superposition states that the net displacement at any point is the algebraic sum of the individual wave displacements. When waves A and B have equal amplitudes but opposite displacements (one crest aligns with the other\'s trough), they completely cancel: y_net = y_A + y_B = +A + (−A) = 0 everywhere. This is complete destructive interference. Partial destructive interference occurs when amplitudes are unequal. Constructive interference occurs when both waves have the same sign of displacement at each point. The Regents often tests superposition with diagrams showing peaks and troughs of equal amplitude overlapping.', image: '/images/exams/phys-june-2024/q42.png' },
    {
      number: 43,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'The diagrams show the direction of wave travel and the direction of medium particle vibration for different waves. Which diagram best represents the characteristics of a sound wave?',
      choices: [
        'Diagram 1 — transverse: vibration perpendicular to wave travel (horizontal)',
        'Diagram 2 — transverse: vibration perpendicular to wave travel (vertical)',
        'Diagram 3 — longitudinal: vibration parallel to wave travel',
        'Diagram 4 — longitudinal: vibration antiparallel to wave travel'
      ],
      correct: 2,
      topic: 'Waves & Sound',
      explanation: 'Sound is a longitudinal (compressional) wave. The medium particles vibrate parallel to the direction of wave travel.',
      diveDeep: 'Sound waves are longitudinal — the medium particles (air molecules) oscillate back and forth in the same direction as the wave travels, creating alternating compressions and rarefactions. This contrasts with transverse waves (light, water surface waves) where particle vibration is perpendicular to the wave travel direction. On a Regents diagram, a longitudinal wave is identified by arrows showing particle vibration parallel to the wave velocity arrow. Options 1 and 2 show transverse waves. The key identifier for sound: vibration direction ∥ wave travel direction.', image: '/images/exams/phys-june-2024/q43.png' },
    {
      number: 44,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'In a sample of gas, many excited hydrogen atoms are in the n = 4 energy level. What is the maximum number of different photon energies that can be emitted by these atoms as they return to the ground state?',
      choices: [
        '6',
        '5',
        '3',
        '4'
      ],
      correct: 0,
      topic: 'Modern Physics',
      explanation: 'From n = 4, atoms can fall to n = 3, 2, or 1; from n = 3 to n = 2 or 1; from n = 2 to n = 1. That is 3 + 2 + 1 = 6 possible transitions → 6 different photon energies.',
      diveDeep: 'The number of distinct transitions between n levels is given by n(n−1)/2. For n_max = 4: 4(3)/2 = 6. The specific transitions are: 4→3, 4→2, 4→1, 3→2, 3→1, 2→1. Each transition emits a photon of a unique energy ΔE = E_initial − E_final. This formula counts all paths in the energy level cascade. A common mistake is counting only direct transitions to ground state (4→1, 3→1, 2→1 = 3 transitions), missing the intermediate step transitions. The maximum is achieved when every possible stepwise combination occurs.'
    },
    {
      number: 45,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'Two students measured the acceleration of a freely falling object: distance fallen = 2.4 meters, time of fall = 0.71 second. Based on this data, the experimental value calculated for the object\'s acceleration is',
      choices: [
        '11 m/s²',
        '9.5 m/s²',
        '6.8 m/s²',
        '4.8 m/s²'
      ],
      correct: 1,
      topic: 'Kinematics',
      explanation: 'Using d = ½at² (starts from rest): a = 2d/t² = 2(2.4)/(0.71)² = 4.8/0.5041 ≈ 9.5 m/s².',
      diveDeep: 'For an object dropped from rest, d = ½at², so a = 2d/t². Substituting: a = 2(2.4)/(0.71)² = 4.8/0.5041 ≈ 9.5 m/s². This is close to but not exactly g = 9.81 m/s², consistent with small experimental error. Choice A (11 m/s²) comes from a = 2d/t (not squaring t). Choice D (4.8 m/s²) comes from a = 2d/t² using t = 1 s instead of 0.71 s. Always use t² in the kinematic formula for free fall from rest. The experimental result is within ~3% of the accepted value.'
    },
    {
      number: 46,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'The ideal value for the acceleration differs from the one obtained experimentally by the students. What is one possible cause of this discrepancy?',
      choices: [
        'The object was given some initial horizontal velocity.',
        'The force of gravity was much stronger outside the building than inside.',
        'Motion formulas should not be used in an experimental setting.',
        'There may have been errors in the measurement of distance and/or time.'
      ],
      correct: 3,
      topic: 'Kinematics',
      explanation: 'Measurement errors in distance or time are realistic sources of experimental discrepancy. Gravity does not vary significantly over small height changes, and horizontal initial velocity would not affect vertical acceleration.',
      diveDeep: 'Discrepancies between experimental and theoretical values in physics experiments arise from measurement errors, instrumental limitations, and uncontrolled variables. Here: (A) initial horizontal velocity does not affect vertical free-fall acceleration — the vertical and horizontal motions are independent. (B) Gravity is essentially constant within a building (g varies by only 0.03% from ground to top of a tall building). (C) Kinematic equations are valid experimental tools. (D) Errors in timing (e.g., reaction time) or measuring distance (e.g., estimating 2.4 m) directly affect the calculated a = 2d/t². This is the only physically realistic and correct explanation.'
    },
    {
      number: 47,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'Which graph represents the motion of an object falling freely from rest near the surface of the Moon?',
      choices: [
        'A curve showing distance increasing as a parabola with time',
        'A straight line showing distance increasing linearly with time',
        'A horizontal line showing constant distance',
        'A curve showing distance decreasing with time'
      ],
      correct: 0,
      topic: 'Kinematics',
      explanation: 'Free fall from rest: d = ½gt². Distance increases as a parabolic function of time, giving an upward-curving distance–time graph. This is true on the Moon (g_moon ≈ 1.62 m/s²) as well as Earth.',
      diveDeep: 'For free fall from rest: d = ½g_moon t², where g_moon ≈ 1.62 m/s². This is the equation of a parabola — distance increases proportionally to t². On a d-vs-t graph, this appears as an upward-curving curve starting at the origin. A straight diagonal line (choice B) would represent constant velocity, not acceleration. The shape of the curve is the same as on Earth — just with a smaller coefficient (less steep). Students sometimes confuse a d-vs-t graph with a v-vs-t graph; for constant acceleration, d-vs-t is parabolic while v-vs-t is linear.', image: '/images/exams/phys-june-2024/q47.png' },
    {
      number: 48,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'Four identical projectiles are launched from level ground at various angles: (1) v_i = 10. m/s at 30°, (2) v_i = 10. m/s at 45°, (3) v_i = 9.0 m/s at 45°, (4) v_i = 9.0 m/s at 60°. Which projectile will have the longest time of flight? [Neglect friction.]',
      choices: [
        'v_i = 10. m/s at 30°',
        'v_i = 10. m/s at 45°',
        'v_i = 9.0 m/s at 45°',
        'v_i = 9.0 m/s at 60°'
      ],
      correct: 3,
      topic: 'Kinematics',
      explanation: 'Time of flight T = 2v₀sinθ/g. Compare vertical components: (1) 10 sin30° = 5.00; (2) 10 sin45° ≈ 7.07; (3) 9.0 sin45° ≈ 6.36; (4) 9.0 sin60° ≈ 7.79. Projectile 4 has the largest vertical component → longest flight time.',
      diveDeep: 'Time of flight depends only on the vertical component of initial velocity: T = 2v_y/g = 2v₀sinθ/g. Calculate v₀sinθ for each option: (1) 10 × sin30° = 10 × 0.500 = 5.00 m/s; (2) 10 × sin45° = 10 × 0.707 = 7.07 m/s; (3) 9.0 × sin45° = 9.0 × 0.707 = 6.36 m/s; (4) 9.0 × sin60° = 9.0 × 0.866 = 7.79 m/s. Projectile 4 (9.0 m/s at 60°) has the largest vertical component (7.79 m/s) and therefore the longest time of flight. A common mistake is assuming the fastest or highest-angle projectile always has the longest flight time — here, the combination of speed and angle matters. Increasing the angle toward 90° maximizes the vertical component.', image: '/images/exams/phys-june-2024/q48.png' },
    {
      number: 49,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'Four forces act on a crate on a level floor: F_N = 150 N (up), F_g = 150 N (down), F_rope = 100 N (right), F_f = 50 N (left). At the instant shown, the crate is',
      choices: [
        'accelerating to the right',
        'accelerating to the left',
        'moving at constant velocity to the right',
        'remaining at rest'
      ],
      correct: 0,
      topic: 'Forces & Newton',
      explanation: 'Vertical: F_N = F_g → no vertical acceleration. Horizontal: net force = 100 N right − 50 N left = 50 N right → the crate accelerates to the right.',
      diveDeep: 'Apply Newton\'s second law in each direction. Vertical: F_N − F_g = 150 − 150 = 0 N → no vertical acceleration. Horizontal: F_net = F_rope − F_f = 100 − 50 = 50 N to the right. Since F_net ≠ 0, the crate accelerates in the direction of the net force: to the right. A common mistake is assuming the crate moves at constant velocity because some forces are balanced — but only the vertical forces are balanced, not the horizontal. The net horizontal force of 50 N produces a_x = F_net/m (unknown mass, but acceleration exists). Choice C (constant velocity) would require F_rope = F_f.', image: '/images/exams/phys-june-2024/q49.png' },
    {
      number: 50,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'A graph shows the relationship between the potential energy stored in a spring (PE_s) and the elongation of the spring (x). At x = 0.0400 m, PE_s = 0.200 J. The value of the spring constant is',
      choices: [
        '5.00 N/m',
        '10.0 N/m',
        '125 N/m',
        '250. N/m'
      ],
      correct: 3,
      topic: 'Energy & Work',
      explanation: 'PE_s = ½kx². At x = 0.0400 m, PE_s = 0.200 J: 0.200 = ½k(0.0400)². k = 2(0.200)/(0.0016) = 250. N/m.',
      diveDeep: 'The elastic potential energy formula: PE_s = ½kx². Solving for k: k = 2(PE_s)/x² = 2(0.200)/(0.0400)² = 0.400/0.0016 = 250 N/m. Alternatively, the slope of a PE_s vs. x² graph equals ½k — but this is a PE_s vs. x graph (not x²), so it appears parabolic. To find k from the graph, read a point and apply the formula. Choice C (125 N/m) comes from using k = PE_s/x² without the factor of 2 (forgetting the ½). Choice A (5.00) comes from k = PE_s/x = 0.200/0.04 = 5.0, forgetting to square x. Always remember the ½ and squaring x in Hooke\'s energy formula.', image: '/images/exams/phys-june-2024/q50.png' },

    // ── Part B-2 (Q51–65) ──────────────────────────────────────────────────
    {
      number: 51,
      part: 'B-2',
      type: 'written',
      text: 'Questions 51–52: Planet Nede has a mass of 6.50 × 10²³ kilograms and a radius of 2.96 × 10⁶ meters. The magnitude of the gravitational force of attraction exerted on a 5.00-kilogram object by planet Nede is 7.15 newtons when the object is located at a position 5.50 × 10⁶ meters from the center of Nede.\n\nCalculate the gravitational field strength of planet Nede at the position of the object. [Show all work, including the equation and substitution with units.] [2]',
      modelAnswer: 'Equation: g = F_g / m\nSubstitution: g = 7.15 N / 5.00 kg\nAnswer: g = 1.43 N/kg (or 1.43 m/s²)\n\nNote: Alternatively, g = GM/r² = (6.67 × 10⁻¹¹)(6.50 × 10²³)/(5.50 × 10⁶)² = (4.336 × 10¹³)/(3.025 × 10¹³) ≈ 1.43 N/kg ✓',
      topic: 'Gravity & Fields',
      explanation: 'Gravitational field strength g = F/m = 7.15 N / 5.00 kg = 1.43 N/kg, which is much less than Earth\'s 9.81 N/kg due to Nede\'s smaller mass.',
      diveDeep: 'Gravitational field strength (g) at a point in space is defined as the gravitational force per unit mass: g = F_g/m. This is both the field strength (N/kg) and the free-fall acceleration (m/s²) at that location. Using the given force: g = 7.15/5.00 = 1.43 N/kg. The planet\'s smaller mass (≈1/9 Earth\'s) and larger distance (5.50 × 10⁶ m vs. Earth\'s 6.37 × 10⁶ m radius) both reduce g. This is a classic Regents 2-point question: 1 point for correct equation with units, 1 point for correct numerical answer.'
    },
    {
      number: 53,
      part: 'B-2',
      type: 'written',
      text: 'Questions 53–54: A toy car, initially traveling at 1.0 meter per second, uniformly accelerates to a speed of 4.0 meters per second as it travels down a 5.0-meter-long slope.\n\nCalculate the time required for the toy car to travel the 5.0 meters from the top of the slope to the bottom. [Show all work, including the equation and substitution with units.] [2]',
      modelAnswer: 'Equation: d = ½(v_i + v_f)t  →  t = 2d/(v_i + v_f)\nSubstitution: t = 2(5.0 m) / (1.0 m/s + 4.0 m/s)\nt = 10.0 / 5.0\nAnswer: t = 2.0 s\n\nAlternative: First find a = (v_f − v_i)/t ... use d = v_i·t + ½at² or rearrange for t.',
      topic: 'Kinematics',
      explanation: 'Using the average-velocity formula: d = ½(v_i + v_f)t → t = 2d/(v_i + v_f) = 2(5.0)/(1.0 + 4.0) = 2.0 s.',
      diveDeep: 'For uniform acceleration, the average velocity = (v_i + v_f)/2, and d = v_avg × t. Solving for t: t = 2d/(v_i + v_f) = 10.0/5.0 = 2.0 s. This is the cleanest approach. Alternatively, find acceleration first: use v_f² = v_i² + 2ad → a = (16 − 1)/(2 × 5) = 1.5 m/s², then t = (v_f − v_i)/a = 3.0/1.5 = 2.0 s. Both methods give 2.0 s. A common mistake is using d = v·t with only the final or initial velocity, not the average. On the Regents, always show the equation, substitution with units, and final answer with units for full credit.', image: '/images/exams/phys-june-2024/q53.png' },
    {
      number: 55,
      part: 'B-2',
      type: 'written',
      text: 'Questions 55–56: Calculate the resistance of an incandescent lightbulb that operates at 20. watts of power when connected to a 12-volt battery. [Show all work, including the equation and substitution with units.] [2]',
      modelAnswer: 'Equation: P = V²/R  →  R = V²/P\nSubstitution: R = (12 V)² / (20. W) = 144 / 20.\nAnswer: R = 7.2 Ω',
      topic: 'Electricity',
      explanation: 'R = V²/P = (12)²/20. = 144/20. = 7.2 Ω. Alternatively, I = P/V = 20/12 = 1.67 A, then R = V/I = 12/1.67 = 7.2 Ω.',
      diveDeep: 'Power formulas: P = IV = I²R = V²/R. When given power and voltage, use R = V²/P = (12)²/20 = 144/20 = 7.2 Ω. Alternatively: I = P/V = 20/12 ≈ 1.667 A, R = V/I = 12/1.667 = 7.2 Ω. Both approaches are valid on the Regents — choose the one requiring fewer steps. At 12 V and 7.2 Ω, the current is 1.67 A, consistent with a small incandescent bulb. Incandescent bulbs typically have resistances of a few to tens of ohms when operating at rated power. The cold resistance is much lower because resistance increases with temperature for metals.'
    },
    {
      number: 57,
      part: 'B-2',
      type: 'written',
      text: 'Questions 57–59: The motion of a car traveling along a straight road is shown in a speed-versus-time graph. The car\'s speed increases from 0 to 10.0 m/s over 0 to 8.0 seconds, with the speed values at key times: t = 0 s, v = 0; t = 8.0 s, v = 10.0 m/s (uniform increase).\n\n57. Determine the average speed of the car from t = 0 to t = 8.0 seconds. [1]',
      modelAnswer: 'Average speed = (v_i + v_f)/2 = (0 + 10.0 m/s)/2 = 5.0 m/s\n\n(Alternatively: average speed = total distance / total time; distance = area under v–t graph = ½ × 8.0 s × 10.0 m/s = 40. m; average speed = 40./8.0 = 5.0 m/s)',
      topic: 'Kinematics',
      explanation: 'For uniform acceleration from 0 to 10.0 m/s, the average speed = (0 + 10.0)/2 = 5.0 m/s.',
      diveDeep: 'Average speed for uniform (constant) acceleration = (v_i + v_f)/2. With v_i = 0 and v_f = 10.0 m/s, average speed = 5.0 m/s. This equals the instantaneous speed at the midpoint of the time interval (t = 4.0 s). Alternatively, compute total distance as the area under the v-t graph (a triangle): d = ½ × base × height = ½ × 8.0 × 10.0 = 40. m, then average speed = 40./8.0 = 5.0 m/s. Both methods agree. This is a 1-point question — just the final answer with units is sufficient, though showing work is good practice.', image: '/images/exams/phys-june-2024/context_57_59.png' },
    {
      number: 58,
      part: 'B-2',
      type: 'written',
      text: 'Questions 58–59: Using the same speed-versus-time graph (speed increases uniformly from 0 m/s at t = 0 to 10.0 m/s at t = 8.0 s):\n\nCalculate the magnitude of the acceleration of the car from t = 0 to t = 8.0 seconds. [Show all work, including the equation and substitution with units.] [2]',
      modelAnswer: 'Equation: a = Δv / Δt = (v_f − v_i) / t\nSubstitution: a = (10.0 m/s − 0 m/s) / 8.0 s\nAnswer: a = 1.25 m/s² ≈ 1.3 m/s²',
      topic: 'Kinematics',
      explanation: 'a = Δv/Δt = (10.0 − 0)/8.0 = 1.25 m/s².',
      diveDeep: 'The slope of a speed-time graph gives acceleration: a = Δv/Δt = (10.0 − 0)/8.0 = 1.25 m/s². This is uniform (constant) acceleration since the graph is linear. On the Regents, the slope of a v-t graph is one of the most frequently tested graphical skills. For the 2-point question, show: (1) the equation a = Δv/Δt or slope = rise/run, (2) the substitution with units, and (3) the answer with units. The "magnitude" means give the positive value (1.25 m/s²), not a negative sign. Note: 1.25 m/s² rounds to 1.3 m/s² — either is acceptable.', image: '/images/exams/phys-june-2024/context_57_59.png' },
    {
      number: 60,
      part: 'B-2',
      type: 'written',
      text: 'A light ray is traveling through a transparent medium at a speed of 1.75 × 10⁸ meters per second. Determine the absolute index of refraction of this medium for this light ray. [1]',
      modelAnswer: 'Equation: n = c/v\nn = (3.00 × 10⁸ m/s) / (1.75 × 10⁸ m/s)\nn ≈ 1.71',
      topic: 'Waves & Light',
      explanation: 'n = c/v = (3.00 × 10⁸)/(1.75 × 10⁸) ≈ 1.71. This is close to the index of refraction of glass (~1.50–1.70).',
      diveDeep: 'The absolute index of refraction n = c/v, where c = 3.00 × 10⁸ m/s (speed of light in vacuum) and v is the speed in the medium. n = 3.00 × 10⁸ / 1.75 × 10⁸ = 300/175 ≈ 1.71. The index of refraction is always ≥ 1 because light slows down in any medium (n = 1 only in vacuum). n ≈ 1.71 corresponds to a dense glass or crystal. This is a 1-point question — just write the equation, substitute, and state the answer (no units; n is dimensionless).'
    },
    {
      number: 61,
      part: 'B-2',
      type: 'written',
      text: 'A ray of light traveling through medium X is incident upon the surface of medium Y. The absolute index of refraction of medium Y is greater than the absolute index of refraction of medium X.\n\nOn the diagram in your answer booklet, use a straightedge to draw a ray that could represent the path of the light in medium Y. [1]',
      modelAnswer: 'Draw the refracted ray in medium Y bending toward the normal (closer to the normal line than the incident ray in medium X). Since n_Y > n_X, light travels slower in medium Y, and by Snell\'s law (n_X sinθ_X = n_Y sinθ_Y), the angle of refraction θ_Y < angle of incidence θ_X. The refracted ray should be on the transmitted side of the surface, bent toward the normal.',
      topic: 'Waves & Light',
      explanation: 'When light passes from a lower-index medium (X) to a higher-index medium (Y), it slows down and bends toward the normal. The refracted angle is smaller than the incident angle.',
      diveDeep: 'Snell\'s law: n_X sinθ_X = n_Y sinθ_Y. Since n_Y > n_X, sinθ_Y = (n_X/n_Y) sinθ_X < sinθ_X, so θ_Y < θ_X — the refracted ray is closer to the normal. This is analogous to a car driving from a smooth road onto gravel: the wheel that hits gravel first slows first, causing the car to turn toward the gravel (slower) side. For the diagram: the incident ray in X hits the surface at some angle to the normal; the refracted ray in Y continues on the other side of the surface but at a smaller angle to the normal. A common mistake is drawing the ray bending away from the normal (which would occur if n_Y < n_X).', image: '/images/exams/phys-june-2024/q61.png' },
    {
      number: 62,
      part: 'B-2',
      type: 'written',
      text: 'Questions 62–63: A tungsten wire has a cross-sectional area of 5.03 × 10⁻⁷ meter squared and has a resistance of 1.21 × 10⁻² ohm when operated at 20°C. Calculate the length of this wire. [Show all work, including the equation and substitution with units.] [2]',
      modelAnswer: 'From Regents Reference Table: resistivity of tungsten at 20°C: ρ = 5.60 × 10⁻⁸ Ω·m\nEquation: R = ρL/A  →  L = RA/ρ\nSubstitution: L = (1.21 × 10⁻² Ω)(5.03 × 10⁻⁷ m²) / (5.60 × 10⁻⁸ Ω·m)\nL = (6.09 × 10⁻⁹) / (5.60 × 10⁻⁸)\nAnswer: L ≈ 0.109 m ≈ 0.11 m',
      topic: 'Electricity',
      explanation: 'R = ρL/A → L = RA/ρ = (1.21 × 10⁻²)(5.03 × 10⁻⁷)/(5.60 × 10⁻⁸) ≈ 0.109 m.',
      diveDeep: 'Resistance of a wire: R = ρL/A, where ρ is resistivity (from Regents reference table), L is length, and A is cross-sectional area. For tungsten at 20°C: ρ = 5.60 × 10⁻⁸ Ω·m. Solving for L: L = RA/ρ = (1.21 × 10⁻²)(5.03 × 10⁻⁷)/(5.60 × 10⁻⁸) = 6.09 × 10⁻⁹ / 5.60 × 10⁻⁸ ≈ 0.109 m (about 10.9 cm). This is a typical tungsten filament length in a small lightbulb. The Regents requires you to look up ρ from the reference table. Units check: (Ω)(m²)/(Ω·m) = m ✓.'
    },
    {
      number: 64,
      part: 'B-2',
      type: 'written',
      text: 'Questions 64–65: A block hangs motionless from a vertical spring, having caused the spring to elongate from its unstretched length of 0.200 meter to a length of 0.500 meter. The spring constant is 250. newtons per meter.\n\nCalculate the magnitude of the force exerted by the block on the spring. [Show all work, including the equation and substitution with units.] [2]',
      modelAnswer: 'Elongation: x = 0.500 m − 0.200 m = 0.300 m\nEquation: F = kx\nSubstitution: F = (250. N/m)(0.300 m)\nAnswer: F = 75.0 N\n\n(The block\'s weight = 75.0 N, and by Newton\'s third law, the block exerts 75.0 N downward on the spring.)',
      topic: 'Energy & Work',
      explanation: 'Stretch = 0.500 − 0.200 = 0.300 m. F = kx = 250. N/m × 0.300 m = 75.0 N.',
      diveDeep: 'First, find the elongation (not the total length): x = 0.500 − 0.200 = 0.300 m. Hooke\'s Law: F_spring = kx = 250. × 0.300 = 75.0 N. Since the block is motionless (static equilibrium), the spring force equals the weight of the block: F_g = 75.0 N. By Newton\'s third law, the block exerts an equal and opposite force on the spring: 75.0 N downward. A common mistake is using the total spring length (0.500 m) instead of the elongation (0.300 m). Always calculate stretch as final length − natural length. Another mistake is forgetting Newton\'s third law — the block pulls the spring down with the same magnitude force the spring pulls the block up.', image: '/images/exams/phys-june-2024/q64.png' },

    // ── Part C (Q66–85) ────────────────────────────────────────────────────
    {
      number: 66,
      part: 'C',
      type: 'written',
      text: 'Questions 66–70: In an experiment, a resistor is connected to a source of varying potential difference. A voltmeter and an ammeter measure the current at different potential difference settings. The data table shows:\n\nPotential Difference (V) | Current (A)\n0.0 | 0.00\n2.0 | 0.26\n3.0 | 0.35\n5.0 | 0.63\n8.0 | 0.98\n\n66. Plot the data points for current versus potential difference on the grid in your answer booklet. [1]\n\n67. Draw the line of best fit. [1]',
      modelAnswer: '66. Plot each (V, I) pair as a data point on a grid with Potential Difference (V) on the x-axis and Current (A) on the y-axis:\n  (0.0, 0.00), (2.0, 0.26), (3.0, 0.35), (5.0, 0.63), (8.0, 0.98)\n\n67. Draw a straight line of best fit through the data points. The line should pass through or near the origin (0,0) and have a positive slope, with approximately equal numbers of data points above and below the line.',
      topic: 'Electricity',
      explanation: 'The data shows a linear relationship between current and potential difference (Ohm\'s Law: I = V/R), so the best-fit line is straight through the origin.',
      diveDeep: 'Ohm\'s Law states that for a resistor at constant temperature, I ∝ V (current is directly proportional to potential difference). A graph of I vs. V produces a straight line through the origin. The slope of this line equals 1/R (conductance). When drawing a line of best fit: (1) use a ruler/straightedge; (2) aim for equal numbers of points above and below the line; (3) do not connect the dots — draw one smooth line. The line should pass through or near the origin since at V = 0, I = 0. These are standard graphing skills tested in the Regents laboratory component.', image: '/images/exams/phys-june-2024/context_66_70.png' },
    {
      number: 68,
      part: 'C',
      type: 'written',
      text: 'Questions 68–70 (continued from 66–67, same experiment):\n\n68–69. Calculate the slope of the line of best fit. [Show all work, including the equation and substitution with units.] [2]\n\n70. Determine the resistance of the resistor. [1]',
      modelAnswer: '68–69. Choose two widely separated points on the line of best fit (not necessarily data points):\nExample: (1.0 V, 0.12 A) and (8.0 V, 0.98 A)\nslope = ΔI/ΔV = (0.98 − 0.12) A / (8.0 − 1.0) V = 0.86 / 7.0 ≈ 0.123 A/V\n\n(Acceptable range using best-fit line: approximately 0.12–0.13 A/V)\n\n70. R = 1/slope = 1 / 0.123 A/V ≈ 8.1 Ω\n\n(Acceptable range: approximately 7.7–8.3 Ω; consistent with the data: e.g., R ≈ 8.0/0.98 ≈ 8.2 Ω at the highest data point)',
      topic: 'Electricity',
      explanation: 'The slope of the I vs. V graph = ΔI/ΔV ≈ 0.12–0.13 A/V = 1/R, so R ≈ 8.0 Ω.',
      diveDeep: 'The slope of an I vs. V graph has units of A/V = 1/Ω (siemens, or conductance). For an ohmic resistor: I = V/R, so the slope = 1/R. Calculating from data endpoints: slope ≈ (0.98 − 0)/( 8.0 − 0) = 0.1225 A/V. R = 1/slope ≈ 8.2 Ω. Regents scoring: for the slope calculation (2 pts) — show the formula slope = Δy/Δx, pick two points on the line (not necessarily data points), substitute values with units, give the numerical slope with units. For resistance (1 pt): use R = 1/slope or R = V/I from any data point. Common mistake: using only data points for slope instead of points on the best-fit line.', image: '/images/exams/phys-june-2024/context_66_70.png' },
    {
      number: 71,
      part: 'C',
      type: 'written',
      text: 'Questions 71–75: An alpha particle with a charge of +2 elementary charges is moving toward two oppositely charged parallel plates. The magnitude of the electric field strength between the plates is 5.0 × 10⁴ newtons per coulomb.\n\n71. Determine the magnitude of the charge of an alpha particle in coulombs. [1]\n\n72. On the diagram in your answer booklet, draw at least three field lines to show the direction of the electric field in the space between the charged plates. [1]\n\n73. What is the direction of the electrostatic force exerted on the alpha particle as it passes between the plates? [1]',
      modelAnswer: '71. Charge of alpha particle = 2 elementary charges × (1.6 × 10⁻¹⁹ C/elementary charge)\n    q = 3.2 × 10⁻¹⁹ C\n\n72. Draw 3 or more parallel, horizontal arrows pointing from the positive plate (+) to the negative plate (−). The field lines should be evenly spaced and perpendicular to the plates.\n\n73. The electrostatic force on the alpha particle is directed toward the negative plate (in the direction of the electric field), because the alpha particle has a positive charge and positive charges experience force in the direction of E.',
      topic: 'Electricity',
      explanation: 'Alpha particle charge = 2 × 1.6 × 10⁻¹⁹ C = 3.2 × 10⁻¹⁹ C. Electric field lines point from + to − plate. Force on positive charge is in the direction of E — toward the negative plate.',
      diveDeep: 'An alpha particle consists of 2 protons and 2 neutrons; its charge is +2e = 2(1.6 × 10⁻¹⁹) = 3.2 × 10⁻¹⁹ C. Between parallel plates, the electric field is uniform and directed from + plate to − plate. Electric field lines always point from positive to negative. The force on a charge in an electric field: F = qE. For a positive charge (q > 0), force is in the same direction as E — toward the negative plate. For negative charges, force opposes E. A common mistake is drawing field lines from − to + (backward). Remember: field lines point in the direction a positive test charge would accelerate.', image: '/images/exams/phys-june-2024/context_71_75.png' },
    {
      number: 74,
      part: 'C',
      type: 'written',
      text: 'Questions 74–75 (continued): Calculate the magnitude of the electrostatic force exerted on the alpha particle by the electric field as the alpha particle passes through the electric field. [Show all work, including the equation and substitution with units.] [2]',
      modelAnswer: 'Equation: F = qE\nSubstitution: F = (3.2 × 10⁻¹⁹ C)(5.0 × 10⁴ N/C)\nAnswer: F = 1.6 × 10⁻¹⁴ N',
      topic: 'Electricity',
      explanation: 'F = qE = (3.2 × 10⁻¹⁹ C)(5.0 × 10⁴ N/C) = 1.6 × 10⁻¹⁴ N.',
      diveDeep: 'The electrostatic force on a charge in an electric field: F = qE. Here q = 3.2 × 10⁻¹⁹ C (from Q71) and E = 5.0 × 10⁴ N/C. F = (3.2 × 10⁻¹⁹)(5.0 × 10⁴) = 16.0 × 10⁻¹⁵ = 1.6 × 10⁻¹⁴ N. This tiny force (compared to everyday scales) has a large effect on the nearly massless alpha particle: a = F/m = 1.6 × 10⁻¹⁴ / (6.64 × 10⁻²⁷) ≈ 2.4 × 10¹² m/s² — an enormous acceleration! Units check: C × N/C = N ✓. For the Regents 2-point answer: 1 point for correct equation/setup, 1 point for correct numerical answer with units.', image: '/images/exams/phys-june-2024/context_71_75.png' },
    {
      number: 76,
      part: 'C',
      type: 'written',
      text: 'Questions 76–80: Two students investigate transverse waves using a long, stretched spring. One student holds one end stationary while the other produces 12 waves every 4.0 seconds. The waves have a uniform amplitude of 0.20 meter and the distance between two adjacent crests is 0.40 meter.\n\n76–77. On the diagram in your answer booklet, draw at least one complete wave produced in the spring. [2]\n\n78. Determine the frequency of the waves. [1]',
      modelAnswer: '76–77. Draw at least one complete wave (one full cycle) showing:\n  • Amplitude = 0.20 m (height from equilibrium to crest, or equilibrium to trough)\n  • Wavelength = 0.40 m (distance from one crest to the next, or one trough to the next)\n  The wave should have a sinusoidal shape with labeled amplitude and wavelength.\n  [1 pt for amplitude = 0.20 m labeled; 1 pt for wavelength = 0.40 m labeled]\n\n78. Frequency = number of waves / time = 12 waves / 4.0 s = 3.0 Hz',
      topic: 'Waves & Sound',
      explanation: 'Frequency f = 12/4.0 = 3.0 Hz. The wave has amplitude 0.20 m and wavelength 0.40 m.',
      diveDeep: 'Frequency is the number of complete waves (cycles) per second: f = 12 waves / 4.0 s = 3.0 Hz. The amplitude is the maximum displacement from equilibrium = 0.20 m (NOT the peak-to-trough distance, which would be 0.40 m). The wavelength λ = 0.40 m is the distance between adjacent crests (or adjacent troughs, or between equivalent points on adjacent cycles). For the diagram: draw a sinusoidal wave, label the amplitude as 0.20 m (vertical from centerline to peak) and wavelength as 0.40 m (horizontal from peak to next peak). A common mistake is drawing amplitude as the total peak-to-trough distance.'
    },
    {
      number: 79,
      part: 'C',
      type: 'written',
      text: 'Questions 79–80 (continued from 76–78): Calculate the speed of the waves. [Show all work, including the equation and substitution with units.] [2]',
      modelAnswer: 'Equation: v = fλ\nSubstitution: v = (3.0 Hz)(0.40 m)\nAnswer: v = 1.2 m/s',
      topic: 'Waves & Sound',
      explanation: 'Wave speed v = fλ = (3.0 Hz)(0.40 m) = 1.2 m/s.',
      diveDeep: 'The universal wave equation: v = fλ, where f = frequency (Hz) and λ = wavelength (m). Using f = 3.0 Hz and λ = 0.40 m: v = 3.0 × 0.40 = 1.2 m/s. Units: Hz × m = (1/s)(m) = m/s ✓. The wave speed in a spring depends on the tension and linear mass density of the spring — this is a measured property of the medium, not related to amplitude or frequency independently. For the Regents 2-point response: write v = fλ, substitute with units, state the answer with units. If f was calculated incorrectly in Q78, full credit may still be earned in Q79–80 if the calculation is consistent with the previous answer (error-carried-forward credit).'
    },
    {
      number: 81,
      part: 'C',
      type: 'written',
      text: 'Questions 81–85: Alpha particles are stable decay products of many nuclear disintegrations. An alpha particle consists of two protons and two neutrons and has a mass of 6.644 × 10⁻²⁷ kilogram. When the individual masses of two protons and two neutrons are added, the sum is 6.695 × 10⁻²⁷ kilogram. The difference between the mass of an alpha particle and the total mass of its four individual component particles is called the mass defect.\n\n81. Determine the mass defect in kilograms when two protons and two neutrons combine to form an alpha particle. [1]',
      modelAnswer: 'Mass defect = (mass of individual particles) − (mass of alpha particle)\nΔm = 6.695 × 10⁻²⁷ kg − 6.644 × 10⁻²⁷ kg\nΔm = 0.051 × 10⁻²⁷ kg = 5.1 × 10⁻²⁹ kg',
      topic: 'Modern Physics',
      explanation: 'Mass defect Δm = 6.695 × 10⁻²⁷ − 6.644 × 10⁻²⁷ = 5.1 × 10⁻²⁹ kg. The "missing" mass was converted to binding energy when the nucleus formed.',
      diveDeep: 'The mass defect arises because when nucleons bind together, some mass is converted to binding energy (nuclear binding energy) via E = mc². The alpha particle is lighter than the sum of its parts by 5.1 × 10⁻²⁹ kg. This small mass difference corresponds to a significant amount of energy (calculated in Q82–83). The alpha particle is particularly stable — its binding energy per nucleon is one of the highest among all nuclei, which is why alpha particles are common decay products. A common mistake is subtracting in the wrong order (getting a negative value) — always subtract the actual particle mass from the sum of component masses.'
    },
    {
      number: 82,
      part: 'C',
      type: 'written',
      text: 'Questions 82–83 (continued): Calculate the total amount of energy in joules that would result from the complete conversion of this mass defect to energy. [Show all work, including the equation and substitution with units.] [2]',
      modelAnswer: 'Equation: E = mc²\nSubstitution: E = (5.1 × 10⁻²⁹ kg)(3.00 × 10⁸ m/s)²\nE = (5.1 × 10⁻²⁹)(9.00 × 10¹⁶)\nAnswer: E = 4.59 × 10⁻¹² J ≈ 4.6 × 10⁻¹² J',
      topic: 'Modern Physics',
      explanation: 'E = mc² = (5.1 × 10⁻²⁹ kg)(3.00 × 10⁸ m/s)² = 4.59 × 10⁻¹² J.',
      diveDeep: 'Einstein\'s mass-energy equivalence: E = mc². Using Δm = 5.1 × 10⁻²⁹ kg and c = 3.00 × 10⁸ m/s: E = (5.1 × 10⁻²⁹)(9.00 × 10¹⁶) = 45.9 × 10⁻¹³ = 4.59 × 10⁻¹² J ≈ 4.6 × 10⁻¹² J. Units: kg × (m/s)² = kg·m²/s² = J ✓. This binding energy (≈4.6 × 10⁻¹² J = 28.7 MeV) is the energy that holds the alpha particle together. For the Regents: show E = mc², substitute with correct values and units (remember to square c), and give the answer in joules with correct scientific notation.'
    },
    {
      number: 84,
      part: 'C',
      type: 'written',
      text: 'Questions 84–85 (continued):\n\n84. Determine the total amount of energy that would result from the complete conversion of this mass defect to energy in megaelectronvolts (MeV). [1]\n\n85. What fundamental interaction is primarily responsible for holding protons and neutrons together in an alpha particle? [1]',
      modelAnswer: '84. Convert joules to MeV:\nFrom the Regents Reference Table: 1 MeV = 1.60 × 10⁻¹³ J\nE = (4.59 × 10⁻¹² J) / (1.60 × 10⁻¹³ J/MeV)\nE ≈ 28.7 MeV ≈ 28 MeV\n\n(Accept any answer consistent with Q82–83 calculation using 1 MeV = 1.60 × 10⁻¹³ J)\n\n85. The strong nuclear force (strong force / strong interaction) is primarily responsible for holding protons and neutrons together in the nucleus.',
      topic: 'Modern Physics',
      explanation: 'E ≈ 4.6 × 10⁻¹² J ÷ 1.60 × 10⁻¹³ J/MeV ≈ 28.7 MeV. The strong nuclear force holds nucleons together.',
      diveDeep: 'For Q84: 1 MeV = 1.60 × 10⁻¹³ J (from Regents reference table). E = 4.59 × 10⁻¹² / 1.60 × 10⁻¹³ ≈ 28.7 MeV. The alpha particle\'s binding energy of ~28 MeV is large compared to chemical bond energies (~few eV), illustrating why nuclear reactions release far more energy than chemical reactions. For Q85: the strong nuclear force (also called strong interaction or strong force) acts between all nucleons (protons and neutrons) and overcomes the electrostatic repulsion between protons. It is short-ranged (acts only within ~10⁻¹⁵ m = 1 fm) but much stronger than electromagnetism at that range. This is one of the four fundamental forces; the other three are weak nuclear, electromagnetic, and gravitational.'
    }
  ]
}
