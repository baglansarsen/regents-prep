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
    }
  ]
}
