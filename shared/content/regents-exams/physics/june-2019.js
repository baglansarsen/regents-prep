// Physics Regents — June 2019
export default {
  id: 'phys-jun-2019',
  subject: 'physics',
  year: 2019,
  session: 'June',
  totalMinutes: 180,
  questions: [
    {
      number: 1,
      part: 'A',
      text: 'Which pair of quantities represent scalar quantities?',
      choices: ['displacement and velocity', 'displacement and time', 'energy and velocity', 'energy and time'],
      topic: 'Forces & Newton',
      correct: 3,
      explanation: 'Energy and time are both scalar quantities — they have magnitude but no direction. Displacement and velocity are vectors.',
      diveDeep: 'Scalars: mass, time, speed, energy (KE, PE), temperature, distance. Vectors: displacement, velocity, acceleration, force, momentum, electric field. A common mistake is thinking displacement is scalar because it sounds like distance. Displacement specifies both how far and in which direction an object moved. Energy (joules) has no direction. On the Regents, recognizing scalar vs. vector classification is foundational to understanding which quantities add algebraically vs. by vector methods.'
    },
    {
      number: 2,
      part: 'A',
      text: 'A sailboat on a lake sails 40. meters north and then sails 40. meters due east. Compared to its starting position, the new position of the sailboat is',
      choices: ['40. m due east', '57 m northeast', '40. m due north', '80. m northeast'],
      topic: 'Kinematics',
      correct: 1,
      image: '/images/exams/phys-june-2019/q2.png',
      explanation: 'The two displacements are perpendicular, so the resultant displacement = √(40² + 40²) = √3200 ≈ 57 m at 45° northeast.',
      diveDeep: 'When two perpendicular displacements are equal in magnitude, the resultant makes a 45° angle with each component: R = √(40² + 40²) = 40√2 ≈ 56.6 m ≈ 57 m northeast. This is the 45-45-90 triangle pattern. A common mistake is adding the magnitudes (40 + 40 = 80 m) instead of using the Pythagorean theorem. The direction northeast is confirmed because the eastward and northward components are equal. Displacement is a vector — both magnitude and direction must be stated.'
    },
    {
      number: 3,
      part: 'A',
      text: 'A ball is thrown straight upward from the surface of Earth. Which statement best describes the ball\'s velocity and acceleration at the top of its flight?',
      choices: [
        'Both velocity and acceleration are zero.',
        'Velocity is zero and acceleration is nonzero.',
        'Velocity is nonzero and acceleration is zero.',
        'Both velocity and acceleration are not zero.'
      ],
      topic: 'Kinematics',
      correct: 1,
      image: '/images/exams/phys-june-2019/q3.png',
      explanation: 'At the highest point, the ball momentarily stops (v = 0), but gravity still acts downward (a = g = 9.81 m/s² ≠ 0).',
      diveDeep: 'At the apex of vertical throw, instantaneous velocity = 0 but acceleration due to gravity = 9.81 m/s² downward — always. Gravity never "turns off." This is the most commonly missed conceptual question in Regents kinematics. Students confuse "stopping momentarily" with "no acceleration." If acceleration were zero at the top, the ball would remain stationary (Newton\'s first law). The ball\'s velocity changes sign (up → down) because of this constant downward acceleration. This also explains why the ball decelerates going up and accelerates coming down.'
    },
    {
      number: 4,
      part: 'A',
      text: 'As a student runs a plastic comb through her hair, the comb acquires a negative electric charge. This charge results from the transfer of',
      choices: [
        'protons from the comb to her hair',
        'protons from her hair to the comb',
        'electrons from the comb to her hair',
        'electrons from her hair to the comb'
      ],
      topic: 'Electricity',
      correct: 3,
      explanation: 'The comb becomes negatively charged because it gains electrons, which must come from her hair (electrons transfer from hair to comb).',
      diveDeep: 'In contact charging (triboelectric effect), only electrons transfer — protons are locked in atomic nuclei and do not move between macroscopic objects. If the comb gains a negative charge, it gained electrons from the hair, making the hair positively charged (electron deficit). A common mistake is thinking protons transfer. The triboelectric series ranks materials by their tendency to give up or gain electrons. This also explains static cling in laundry and lightning formation in clouds. In all charging processes, charge is conserved — no charge is created or destroyed.'
    },
    {
      number: 5,
      part: 'A',
      text: 'How would the mass and weight of an object on the Moon compare to the mass and weight of the same object on Earth?',
      choices: [
        'Mass and weight would both be less on the Moon.',
        'Mass would be the same but its weight would be less on the Moon.',
        'Mass would be less on the Moon and its weight would be the same.',
        'Mass and weight would both be the same on the Moon.'
      ],
      topic: 'Forces & Newton',
      correct: 1,
      explanation: 'Mass is an intrinsic property of matter and does not change with location. Weight W = mg depends on local gravitational acceleration g, which is less on the Moon (~1.62 m/s²) than on Earth.',
      diveDeep: 'Mass measures inertia — it is the same everywhere in the universe. Weight is a gravitational force that depends on the local value of g. On the Moon, g ≈ 1.62 m/s² ≈ g_Earth/6, so a 60-kg person weighs about 588 N on Earth but only ~97 N on the Moon. A common misconception (and a classic Regents trap) is that mass also decreases on the Moon. Students sometimes confuse "feeling lighter" (less weight) with "having less mass." This distinction is fundamental in physics and appears in multiple Regents questions each year.'
    },
    {
      number: 6,
      part: 'A',
      text: 'An object is moving with constant speed in a circular path. The object\'s centripetal acceleration remains constant in',
      choices: ['magnitude, only', 'direction, only', 'both magnitude and direction', 'neither magnitude nor direction'],
      topic: 'Kinematics',
      correct: 0,
      explanation: 'For uniform circular motion (constant speed, constant radius), a_c = v²/r has constant magnitude but continuously changing direction (always toward the center).',
      diveDeep: 'Centripetal acceleration a_c = v²/r. With constant v and r, the magnitude v²/r is constant. However, the direction of a_c always points toward the center of the circle, which continuously changes as the object moves. So a_c is constant in magnitude but not in direction — making it technically a changing vector. A common mistake is saying acceleration is constant because speed is constant. Acceleration is a vector: changing direction means the acceleration changes even if its magnitude does not. This is why uniform circular motion requires a continuous centripetal force.'
    },
    {
      number: 7,
      part: 'A',
      text: 'A rope attached to a 500.-kilogram crate is used to exert a force of 45 newtons at an angle of 65° above the horizontal. The horizontal component of the force acting on the crate is',
      choices: ['19 N', '−10 N', '41 N', '450 N'],
      topic: 'Forces & Newton',
      correct: 0,
      image: '/images/exams/phys-june-2019/q7.png',
      explanation: 'Horizontal component F_x = F cosθ = 45 × cos 65° ≈ 45 × 0.423 ≈ 19 N.',
      diveDeep: 'For a force applied at angle θ above horizontal: F_x = F cosθ (horizontal) and F_y = F sinθ (vertical). Here F_x = 45 cos 65° ≈ 19 N. Note that the 65° angle is large (closer to vertical), so most of the force is vertical (~41 N) and little is horizontal (~19 N). The mass of the crate (500 kg) is irrelevant for finding the component. A common mistake is using sin instead of cos for the horizontal component. Remember: cosine → horizontal (adjacent side of triangle), sine → vertical (opposite side).'
    },
    {
      number: 8,
      part: 'A',
      text: 'A spring with a spring constant of 68 newtons per meter hangs from a ceiling. When a 12-newton downward force is applied to the free end of the spring, the spring stretches a total distance of',
      choices: ['0.18 m', '5.7 m', '0.59 m', '820 m'],
      topic: 'Kinematics',
      correct: 0,
      explanation: "Hooke's law: x = F/k = 12 N / 68 N/m ≈ 0.18 m.",
      diveDeep: "Hooke's law states F = kx for an ideal spring, where k is the spring constant and x is the extension or compression. Solving for x: x = F/k = 12/68 ≈ 0.176 m ≈ 0.18 m. Choice B (5.7 m) comes from inverting to k/F. Choice C (0.59 m) might come from a calculation error. A spring with k = 68 N/m is moderately stiff — stretching 0.18 m (18 cm) under 12 N is physically reasonable. The Regents reference table includes F_spring = kx. This is directly testable and one of the more straightforward calculation questions."
    },
    {
      number: 9,
      part: 'A',
      text: 'As a student walks downhill at constant speed, his gravitational potential energy',
      choices: [
        'increases and his kinetic energy increases',
        'increases and his kinetic energy remains the same',
        'decreases and his kinetic energy increases',
        'decreases and his kinetic energy remains the same'
      ],
      topic: 'Energy & Work',
      correct: 3,
      explanation: 'Going downhill, height decreases so PE = mgh decreases. At constant speed, KE = ½mv² remains the same. The lost PE must be converted to heat/sound through friction (muscles do negative work).',
      diveDeep: 'Walking downhill at constant speed means KE is constant (constant speed). Since height decreases, gravitational PE decreases. The "lost" PE is converted to thermal energy through friction in muscles and on the ground — not to kinetic energy. Without friction (like sliding on frictionless ice downhill), PE would convert to KE and speed would increase. A common mistake is assuming PE converts to KE because the student goes downhill. The constant speed tells us net KE change is zero. This illustrates how energy can be dissipated in real systems.'
    },
    {
      number: 10,
      part: 'A',
      text: 'When 150 joules of work is done on a system by an external force of 15 newtons in 20. seconds, the total energy of that system increases by',
      choices: ['1.5 × 10² J', '3.0 × 10² J', '2.0 × 10² J', '2.3 × 10³ J'],
      topic: 'Forces & Newton',
      correct: 0,
      explanation: 'By the work-energy theorem, the work done on a system equals the increase in its energy: ΔE = W = 150 J = 1.5 × 10² J.',
      diveDeep: 'The work-energy theorem: net work done on a system = change in mechanical energy of the system. The force (15 N) and time (20 s) are given but not needed — 150 J is the direct answer. Choice B (300 J) might come from computing Pt = F·d·(1/t)·t where d is miscalculated. Choice C (200 J) might come from F × t = 15 × 20 = 300 J (impulse, not work). Always use the stated work value directly for energy change. Power here would be P = W/t = 150/20 = 7.5 W — not asked.'
    },
    {
      number: 11,
      part: 'A',
      text: 'A person on a ledge throws a ball vertically downward, striking the ground below the ledge with 200 joules of kinetic energy. The person then throws an identical ball vertically upward at the same initial speed from the same point. What is the kinetic energy of the second ball when it hits the ground? [Neglect friction.]',
      choices: ['200 J', 'less than 200 J', '400 J', 'more than 400 J'],
      topic: 'Kinematics',
      correct: 0,
      explanation: 'Both balls have the same initial KE (same mass, same speed) and fall the same vertical distance, gaining the same amount of PE → KE. By conservation of energy (no friction), both hit the ground with 200 J.',
      diveDeep: 'Conservation of mechanical energy (no friction): KE_final = KE_initial + ΔPE = KE_initial + mgh. Both balls are thrown at the same speed from the same height, so they start with the same KE and gain the same PE during descent. The direction of the initial throw (up vs. down) does not matter — by the time the upward ball returns to the ledge height, it has the same speed as it started with. Then both balls fall the same h to the ground, arriving with identical KE = 200 J. This is a classic energy conservation symmetry problem.'
    },
    {
      number: 12,
      part: 'A',
      text: 'Two construction cranes are used to lift identical 1200-kilogram loads of bricks the same vertical distance. The first crane lifts the bricks in 20. seconds and the second crane lifts the bricks in 40. seconds. Compared to the power developed by the first crane, the power developed by the second crane is',
      choices: ['the same', 'half as great', 'twice as great', 'four times as great'],
      topic: 'Energy & Work',
      correct: 1,
      explanation: 'P = W/t. Both cranes do the same work (same mass, same distance), but crane 2 takes twice as long: P₂ = W/(2t) = P₁/2. Crane 2 is half as powerful.',
      diveDeep: 'Power P = W/t. The work W = mgh is identical for both cranes (same mass, same height). Crane 1: P₁ = W/20 s. Crane 2: P₂ = W/40 s = P₁/2. Crane 2 is half as powerful because it does the same work in twice the time. A common mistake is saying they have the same power (because they do the same work) — forgetting that time matters for power. This demonstrates the practical difference between energy and power: two machines can do equal work while having very different power ratings.'
    },
    {
      number: 13,
      part: 'A',
      text: 'An ionized calcium atom has a charge of +2 elementary charges. If this ion is accelerated through a potential difference of 2.0 × 10³ volts, the ion\'s change in kinetic energy will be',
      choices: ['1.0 × 10³ eV', '3.0 × 10³ eV', '2.0 × 10³ eV', '4.0 × 10³ eV'],
      topic: 'Electricity',
      correct: 3,
      explanation: 'ΔKE = qΔV = 2e × 2.0 × 10³ V = 4.0 × 10³ eV. A charge of 2 elementary charges accelerated through 2000 V gains 4000 eV.',
      diveDeep: 'When a charge q is accelerated through potential difference ΔV, it gains kinetic energy ΔKE = qΔV. In electron volts, 1 eV is the energy gained by 1 elementary charge through 1 volt. For charge 2e through 2000 V: ΔKE = 2 × 2000 = 4000 eV = 4.0 × 10³ eV. The key insight is that the energy gained scales with both the charge and the voltage. A common mistake is using charge = 2 C instead of 2 elementary charges, or forgetting to multiply the charge by the voltage. The eV unit is convenient for atomic-scale energies.'
    },
    {
      number: 14,
      part: 'A',
      text: 'A total charge of 100. coulombs flows past a fixed point in a circuit every 500. seconds. What is the current at this point in the circuit?',
      choices: ['0.200 A', '5.00 × 10⁴ A', '5.00 A', '1.25 × 10¹⁸ A'],
      topic: 'Electricity',
      correct: 0,
      explanation: 'Current I = Q/t = 100 C / 500 s = 0.200 A.',
      diveDeep: 'Electric current is defined as I = Q/t — the charge per unit time passing a point. Here I = 100/500 = 0.200 A. Choice B (5.00 × 10⁴) comes from Q × t instead of Q/t. Choice C (5.00 A) comes from Q/t where the numbers are swapped: 500/100. Choice D (1.25 × 10¹⁸) involves dividing by the elementary charge — a different kind of calculation. The ampere is defined as 1 C/s. On the Regents, current problems always use I = Q/t. A current of 0.200 A is typical for small electronic devices.'
    },
    {
      number: 15,
      part: 'A',
      text: 'An aluminum wire of length 1.0 meter has a resistance of 9.0 × 10⁻³ ohm. If the wire were cut into two equal lengths, each length would have a resistance of',
      choices: ['2.8 × 10⁻⁸ Ω', '9.0 × 10⁻³ Ω', '4.5 × 10⁻³ Ω', '1.8 × 10⁻² Ω'],
      topic: 'Electricity',
      correct: 2,
      explanation: 'Resistance R = ρL/A. Cutting the wire in half halves the length L, so resistance halves: R = 9.0 × 10⁻³ / 2 = 4.5 × 10⁻³ Ω.',
      diveDeep: 'R = ρL/A: resistance is directly proportional to length. Halving the length halves the resistance. Cross-sectional area is unchanged since the cut is along the length. Resistivity ρ is unchanged (same material, same temperature). Choice D (1.8 × 10⁻²) comes from doubling instead of halving. A common mistake is thinking cutting changes the cross-section (it does not — cutting lengthwise would change area). Choice A (2.8 × 10⁻⁸) is close to the resistivity of aluminum — confusing R with ρ. This is a standard R = ρL/A scaling question.'
    },
    {
      number: 16,
      part: 'A',
      text: 'In an operating electrical circuit, the source of potential difference could be',
      choices: ['a voltmeter', 'an ammeter', 'a battery', 'a resistor'],
      topic: 'Electricity',
      correct: 2,
      explanation: 'A battery (electrochemical cell) converts chemical energy to electrical energy, creating a potential difference that drives current through the circuit.',
      diveDeep: 'Potential difference sources include batteries, generators, and power supplies — they convert some form of energy into electrical potential energy. A voltmeter measures potential difference but does not create it (very high internal resistance). An ammeter measures current. A resistor opposes current flow and dissipates energy as heat — it does not create potential difference. The Regents frequently tests the distinction between circuit elements that supply energy (battery, generator) vs. those that measure or consume it. Batteries maintain a roughly constant terminal voltage through electrochemical reactions.'
    },
    {
      number: 17,
      part: 'A',
      text: 'A lightbulb with a resistance of 2.9 ohms is operated using a 1.5-volt battery. At what rate is electrical energy transformed in the lightbulb?',
      choices: ['0.52 W', '4.4 W', '0.78 W', '6.5 W'],
      topic: 'Electricity',
      correct: 2,
      explanation: 'P = V²/R = (1.5)²/2.9 = 2.25/2.9 ≈ 0.78 W.',
      diveDeep: 'Power can be calculated three ways: P = IV, P = I²R, or P = V²/R. When V and R are given (no current stated), use P = V²/R. Here P = 1.5²/2.9 = 2.25/2.9 ≈ 0.776 W ≈ 0.78 W. Choice A (0.52 W) might come from P = V/R × something. Choice B (4.4 W) comes from P = V × R = 1.5 × 2.9. Always select the power formula based on which quantities are given. The three power formulas are on the Regents reference table. A 0.78 W lightbulb is typical for a small battery-operated device.'
    },
    {
      number: 18,
      part: 'A',
      text: 'A 40.0-kilogram child exerts a 100.-newton force on a 50.0-kilogram object. The magnitude of the force that the object exerts on the child is',
      choices: ['0.0 N', '100. N', '80.0 N', '125 N'],
      topic: 'Forces & Newton',
      correct: 1,
      explanation: "By Newton's third law, the object exerts an equal and opposite force of 100. N on the child, regardless of the masses involved.",
      diveDeep: "Newton's third law: when object A exerts a force on object B, object B exerts an equal magnitude, opposite direction force on object A. The masses (40 kg, 50 kg) are irrelevant to the Newton's third law pair — forces are always equal and opposite. Choice C (80 N) likely comes from (40/50) × 100 — incorrectly scaling by mass ratio. Choice D (125 N) comes from (50/40) × 100. A common misconception is that the heavier or larger object exerts more force. Newton's third law pairs are simultaneous and equal regardless of mass difference."
    },
    {
      number: 19,
      part: 'A',
      text: 'Two identical stationary bar magnets are arranged with their north poles facing each other. What is the direction of the magnetic field at point P, located midway between the two magnets?',
      choices: [
        'toward the left magnet\'s north pole',
        'toward the right magnet\'s north pole',
        'perpendicular to the line connecting the magnets',
        'there is no magnetic field at point P'
      ],
      topic: 'Electricity & Magnetism',
      correct: 3,
      explanation: 'With identical north poles facing each other, the magnetic fields from each magnet at the midpoint are equal in magnitude but point in opposite directions, canceling each other out to give zero net field.',
      diveDeep: 'Magnetic field lines exit north poles and enter south poles. With two north poles facing each other, the field from the left magnet points rightward at midpoint, and the field from the right magnet points leftward. By symmetry (identical magnets, equal distances), these fields are equal and opposite — they cancel, giving zero net field at the exact midpoint. This is analogous to two equal and opposite electric charges creating zero field at the midpoint between like charges. A common mistake is drawing field lines as if they pass through the midpoint unchanged.'
    },
    {
      number: 20,
      part: 'A',
      text: 'A student claps his hands once to produce a sudden loud sound that travels through the air. This sound is classified as a',
      choices: ['longitudinal mechanical wave', 'longitudinal electromagnetic wave', 'transverse mechanical wave', 'transverse electromagnetic wave'],
      topic: 'Waves & Sound',
      correct: 0,
      explanation: 'Sound is a longitudinal mechanical wave — air molecules compress and rarefy along the direction of wave travel, and a medium (air) is required for propagation.',
      diveDeep: 'Sound waves are longitudinal (particle motion parallel to wave travel) and mechanical (require a medium). They cannot travel through vacuum. In contrast, light is a transverse electromagnetic wave that does not require a medium. The distinction between mechanical and electromagnetic waves and between transverse and longitudinal is foundational for the Regents. Students sometimes call sound "transverse" because they picture water waves — but sound in air is always longitudinal. The speed of sound in air at room temperature is approximately 343 m/s.'
    },
    {
      number: 21,
      part: 'A',
      text: 'A student generates water waves in a pool of water. In order to increase the energy carried by the waves, the student should generate waves with a',
      choices: ['greater amplitude', 'higher frequency', 'greater wavelength', 'longer period'],
      topic: 'Waves & Sound',
      correct: 0,
      explanation: 'Wave energy is proportional to the square of amplitude: E ∝ A². Increasing amplitude increases the energy carried by the wave.',
      diveDeep: 'For mechanical waves, energy density E ∝ A². Doubling amplitude quadruples energy. Frequency and wavelength affect energy per photon for light (E = hf) but for mechanical waves, frequency affects power (P = ½μω²A²v) — so higher frequency also increases power, but the question asks about energy of the wave, which scales most directly with A². On the Regents, the standard answer is amplitude. A longer period means lower frequency. This is why destructive ocean waves (high amplitude) carry enormous energy, and why high-amplitude sound is louder.'
    },
    {
      number: 22,
      part: 'A',
      text: 'A wave generator produces straight, parallel wave fronts in a shallow tank of uniform-depth water. As the frequency of vibration of the generator increases, which characteristic of the wave will always decrease?',
      choices: ['amplitude', 'wavelength', 'phase', 'speed'],
      topic: 'Waves & Sound',
      correct: 1,
      explanation: 'v = fλ. If the wave speed in the medium is constant and frequency increases, wavelength λ = v/f must decrease.',
      diveDeep: 'The wave equation v = fλ shows that at constant wave speed (same medium, same depth), frequency and wavelength are inversely proportional. Increasing f decreases λ. Speed does not change because the medium (same-depth water) has not changed. Amplitude depends on the source energy, not frequency per se. A common mistake is saying speed changes with frequency — it does not in a uniform medium (dispersion effects are beyond the Regents scope). This inverse relationship between f and λ at constant v is one of the most fundamental wave relationships.'
    },
    {
      number: 23,
      part: 'A',
      text: 'A space probe produces a radio signal pulse. If the pulse reaches Earth 12.3 seconds after it is emitted by the probe, what is the distance from the probe to Earth?',
      choices: ['3.71 × 10² m', '4.10 × 10⁸ m', '4.07 × 10³ m', '3.69 × 10⁹ m'],
      topic: 'Waves & Sound',
      correct: 3,
      image: '/images/exams/phys-june-2019/q23.png',
      explanation: 'Radio waves travel at the speed of light: c = 3.00 × 10⁸ m/s. d = ct = (3.00 × 10⁸)(12.3) = 3.69 × 10⁹ m.',
      diveDeep: 'Radio waves are electromagnetic waves that travel at c = 3.00 × 10⁸ m/s in vacuum (space). Distance = speed × time = 3.00 × 10⁸ × 12.3 = 3.69 × 10⁹ m ≈ 3.7 million km. This is about 10 times the distance from Earth to the Moon. Choices A and C are far too small (not using the speed of light). Choice B uses c but misplaces the decimal: 3.00 × 10⁸ × 1.23 instead of × 12.3. A common mistake is not knowing that radio waves travel at c. All electromagnetic waves (radio, microwave, infrared, visible, UV, X-ray, gamma) travel at c in vacuum.'
    },
    {
      number: 24,
      part: 'A',
      text: 'The diagram below represents a light ray reflecting from a plane mirror. The angle of reflection for this light ray is',
      choices: ['20°', '140°', '70°', '160°'],
      topic: 'Light & Optics',
      correct: 2,
      image: '/images/exams/phys-june-2019/q24.png',
      explanation: 'The law of reflection states that the angle of incidence equals the angle of reflection, both measured from the normal to the mirror surface. If the ray makes 70° with the normal, the angle of reflection is also 70°.',
      diveDeep: 'Angles in reflection are always measured from the normal (perpendicular to the surface), not from the surface itself. The angle of incidence = angle of reflection (law of reflection). If a ray strikes at 20° to the mirror surface, the angle to the normal is 70°, so both incidence and reflection angles are 70°. Choice A (20°) is the complement — measured from the surface, not the normal. Choice B (140°) and D (160°) are obtuse angles that make no physical sense for reflection angles. Always check whether an angle is measured from the surface or the normal.'
    },
    // ── Part A continued (Q25–35) ──────────────────────────────────────────
    {
      number: 25,
      part: 'A',
      text: 'A light wave travels from one medium into a second medium with a greater absolute index of refraction. Which characteristic of the wave can not change as the wave enters the second medium?',
      choices: ['frequency', 'speed', 'direction', 'wavelength'],
      topic: 'Light & Optics',
      correct: 0,
      explanation: 'Frequency is determined by the source and remains constant as light crosses a boundary. Speed, wavelength, and direction (refraction) all change when light enters a new medium.',
      diveDeep: 'When light enters a denser medium (higher n), its speed decreases (v = c/n), its wavelength decreases (λ = v/f), and its direction bends toward the normal (Snell\'s law). Frequency is set by the energy of each photon (E = hf) and is unchanged by the medium — conservation of energy at the boundary requires frequency to be invariant. This is the single most reliable invariant when a wave crosses an interface. The Regents reference table lists indices of refraction for common materials.'
    },
    {
      number: 26,
      part: 'A',
      text: 'The speed of light (f = 5.09 × 10¹⁴ Hz) in glycerol is',
      choices: ['1.70 × 10⁶ m/s', '2.04 × 10⁸ m/s', '3.00 × 10⁸ m/s', '4.41 × 10⁸ m/s'],
      topic: 'Light & Optics',
      correct: 1,
      explanation: 'From the Regents reference table, the index of refraction of glycerol is n = 1.47. Speed v = c/n = (3.00 × 10⁸)/1.47 ≈ 2.04 × 10⁸ m/s.',
      diveDeep: 'The absolute index of refraction n = c/v, so v = c/n. For glycerol n = 1.47 (from reference table): v = (3.00 × 10⁸)/1.47 ≈ 2.04 × 10⁸ m/s. The frequency given (5.09 × 10¹⁴ Hz) is irrelevant for finding speed — speed depends only on n and c. Choice C (3.00 × 10⁸) is the speed in vacuum, not glycerol. Choice D results from multiplying rather than dividing. Higher n always means slower speed — light slows in optically denser materials.'
    },
    {
      number: 27,
      part: 'A',
      text: 'A standing wave is produced in a string by a vibrating wave generator. How many antinodes are shown in this standing wave? [The diagram shows a standing wave pattern with loops between fixed endpoints.]',
      choices: ['6', '2', '3', '4'],
      topic: 'Waves & Sound',
      correct: 2,
      image: '/images/exams/phys-june-2019/q27.png',
      explanation: 'Antinodes are the points of maximum displacement in a standing wave. Counting the loops (half-wavelengths) between nodes in the diagram gives 3 antinodes.',
      diveDeep: 'In a standing wave, nodes are points of zero amplitude and antinodes are points of maximum amplitude. Each "loop" or half-wavelength segment between adjacent nodes contains exactly one antinode at its midpoint. If there are 3 loops in the diagram, there are 3 antinodes. The number of loops equals the harmonic number (n): 1 loop = 1st harmonic (fundamental), 2 loops = 2nd harmonic, 3 loops = 3rd harmonic. Nodes and antinodes alternate along the string. On the Regents, carefully count the loops — students often count nodes instead of antinodes.'
    },
    {
      number: 28,
      part: 'A',
      text: 'The Doppler effect is best described as the',
      choices: [
        'bending of waves as they pass by obstacles or through openings',
        'change in speed of a wave as the wave moves from one medium to another',
        'creation of a standing wave from two waves traveling in opposite directions in the same medium',
        'shift in the observed frequency and wavelength of a wave caused by the relative motion between the wave\'s source and an observer'
      ],
      topic: 'Waves & Sound',
      correct: 3,
      explanation: 'The Doppler effect is the perceived change in frequency (and wavelength) of a wave when there is relative motion between the source and the observer.',
      diveDeep: 'The Doppler effect: when a source approaches, the observer hears higher frequency (shorter wavelength); when the source recedes, lower frequency (longer wavelength). Choice A describes diffraction. Choice B describes refraction. Choice C describes standing waves (superposition). The Doppler effect does not change the actual speed of the wave or the frequency emitted by the source — only the perceived frequency at the observer. Classic examples: ambulance siren, radar speed guns, redshift of distant galaxies (cosmological Doppler effect).'
    },
    {
      number: 29,
      part: 'A',
      text: 'Which diagram represents diffraction of wave fronts as they encounter an obstacle?',
      choices: [
        'Wave fronts bend around the edges of the obstacle',
        'Wave fronts reflect straight back',
        'Wave fronts pass through unchanged',
        'Wave fronts speed up past the obstacle'
      ],
      topic: 'Waves & Sound',
      correct: 0,
      image: '/images/exams/phys-june-2019/q29.png',
      explanation: 'Diffraction is the bending of waves around obstacles or through openings. The correct diagram shows wave fronts curving around the edges of the obstacle.',
      diveDeep: 'Diffraction occurs when a wave encounters an obstacle or opening whose size is comparable to the wavelength. The wave bends around the edges, producing curved wave fronts in the "shadow" region behind the obstacle. Larger openings produce less diffraction; openings about the size of the wavelength produce the most dramatic bending. Diffraction explains why sound can be heard around corners and why radio waves can travel over hills. Light diffracts too, but its wavelength (~500 nm) is so short that obstacles must be tiny for visible diffraction.'
    },
    {
      number: 30,
      part: 'A',
      text: 'Which types of forces exist between the two protons in a helium nucleus?',
      choices: [
        'a repulsive electrostatic force and a repulsive gravitational force',
        'a repulsive electrostatic force and an attractive strong nuclear force',
        'an attractive electrostatic force and an attractive gravitational force',
        'an attractive electrostatic force and an attractive strong nuclear force'
      ],
      topic: 'Modern Physics',
      correct: 1,
      explanation: 'Two protons in a nucleus both carry positive charge, creating a repulsive electrostatic force. The strong nuclear force, which is attractive at short range, overcomes this repulsion and holds the nucleus together.',
      diveDeep: 'Within a nucleus, two protons experience: (1) repulsive electrostatic (Coulomb) force — like charges repel; (2) attractive strong nuclear force — short-range force that binds nucleons together at distances of ~10⁻¹⁵ m. Gravity between protons is astronomically weak (~10⁻³⁶ times the electrostatic force) and is negligible at nuclear scales. The strong force is about 100× stronger than electrostatics at close range, which is why nuclei are stable despite proton-proton repulsion. Nuclei too large (Z > 83) become unstable because the electrostatic repulsion eventually wins over the short-range strong force.'
    },
    {
      number: 31,
      part: 'A',
      text: 'A meson could be composed of',
      choices: [
        'a top quark and a bottom quark',
        'an electron and an antielectron',
        'a strange quark and an anticharm quark',
        'an up quark and a muon'
      ],
      topic: 'Modern Physics',
      correct: 2,
      explanation: 'Mesons are hadrons composed of one quark and one antiquark. A strange quark (s) and an anticharm quark (c̄) is a valid quark–antiquark pair, forming a meson.',
      diveDeep: 'Hadrons come in two types: baryons (3 quarks) and mesons (1 quark + 1 antiquark). The quark–antiquark combination carries an integer charge (0 or ±1). Choice A (top + bottom) are two quarks — not a quark–antiquark pair (would be a different system). Choice B is a lepton pair, not quarks. Choice D mixes a quark with a lepton (muon) — not allowed. Strange quark charge = −1/3; anticharm quark charge = +2/3; total = +1/3 − 1/3 = 0 (neutral meson). This tests knowledge of the Standard Model hadron classification.'
    },
    {
      number: 32,
      part: 'A',
      text: 'An electron in an excited mercury atom is in energy level g. What is the minimum energy required to ionize this atom?',
      choices: ['0.20 eV', '0.91 eV', '2.48 eV', '7.90 eV'],
      topic: 'Modern Physics',
      correct: 0,
      explanation: 'From the Mercury energy level diagram in the Regents reference table, energy level g is −0.20 eV below the ionization level (0 eV). The minimum energy to ionize is 0.20 eV.',
      diveDeep: 'Ionization requires removing the electron from the atom — bringing its energy from the current level to ≥ 0 eV (the ionization threshold). From the Regents Mercury energy-level table, level g is at approximately −0.20 eV, so ionization energy = 0.20 eV (the minimum photon energy needed). Levels a (ground) through j are listed. A common mistake is reading the energy of a transition instead of the energy to ionization. The deeper the energy level, the more energy is required to ionize. Mercury energy levels are on the Regents reference table.'
    },
    {
      number: 33,
      part: 'A',
      text: 'A student is standing in an elevator that travels from the first floor to the tenth floor of a building. The student exerts the greatest force on the floor of the elevator when the elevator is',
      choices: [
        'accelerating upward as it leaves the first floor',
        'slowing down as it approaches the tenth floor',
        'moving upward at constant speed',
        'at rest on the first floor'
      ],
      topic: 'Forces & Newton',
      correct: 0,
      explanation: 'When the elevator accelerates upward, the net force on the student is upward, so the normal force N = mg + ma > mg. The student feels heavier and pushes harder on the floor.',
      diveDeep: 'Normal force N = m(g + a) when accelerating upward, and N = m(g − a) when decelerating upward (or accelerating downward). At constant speed or rest, N = mg. Accelerating upward gives the greatest N (apparent weight). When slowing down going up, the elevator decelerates (acceleration is downward), so N = m(g − a) < mg. A common mistake is thinking "rest" gives the greatest force — but rest and constant speed give the same N = mg. The critical concept is that apparent weight depends on acceleration, not speed.'
    },
    {
      number: 34,
      part: 'A',
      text: 'At the bottom of a hill, a car has an initial velocity of +16.0 meters per second. The car is uniformly accelerated at −2.20 meters per second squared for 5.00 seconds as it moves up the hill. How far does the car travel during this 5.00-second interval?',
      choices: ['107 m', '74.5 m', '52.5 m', '25.0 m'],
      topic: 'Kinematics',
      correct: 2,
      explanation: 'd = v₀t + ½at² = (16.0)(5.00) + ½(−2.20)(5.00)² = 80.0 − 27.5 = 52.5 m.',
      diveDeep: 'Using d = v₀t + ½at²: d = (16.0 m/s)(5.00 s) + ½(−2.20 m/s²)(5.00 s)² = 80.0 − 27.5 = 52.5 m. Choice A (107 m) comes from using only v₀t + |a|t². Choice D (25.0 m) likely comes from average velocity (v₀ + v_f)/2 × t but with wrong v_f. The negative acceleration opposes motion, so the car slows as it climbs. After 5 s the car has traveled 52.5 m up the hill (v_f = 16.0 − 2.20×5.00 = 5.0 m/s > 0, so the car has not stopped yet).'
    },
    {
      number: 35,
      part: 'A',
      text: 'A particle enters the electric field between two oppositely charged parallel plates. Which particle will be deflected toward the positive plate as it enters the electric field?',
      choices: ['photon', 'proton', 'electron', 'neutrino'],
      topic: 'Electricity',
      correct: 2,
      image: '/images/exams/phys-june-2019/q35.png',
      explanation: 'Negative charges are attracted toward the positive plate. An electron (charge −e) will deflect toward the positive plate. Protons go toward the negative plate. Photons and neutrinos are uncharged and are not deflected.',
      diveDeep: 'Electric field lines point from + plate to − plate. A positive charge (proton) experiences force in the direction of E (toward − plate). A negative charge (electron) experiences force opposite to E (toward + plate). Photons are uncharged electromagnetic radiation — no deflection. Neutrinos are electrically neutral leptons — no deflection. This tests the fundamental rule: F = qE, direction depends on sign of q. On the Regents, the particle deflected toward the + plate must be negatively charged.'
    },
    // ── Part B-1 (Q36–50, multiple choice) ─────────────────────────────────
    {
      number: 36,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'An object of mass m, located on the surface of the Moon, is attracted to the Moon with a gravitational force F. An object of mass 2m, at an altitude equal to the Moon\'s radius r above the surface of the Moon, is attracted to the Moon with a gravitational force of',
      choices: ['F', '2F', 'F/2', 'F/4'],
      topic: 'Forces & Newton',
      correct: 2,
      explanation: 'Doubling the mass doubles F, but doubling the distance (r_surface to 2r from center) reduces F by 1/4. Net effect: 2 × (1/4) = 1/2 F.',
      diveDeep: 'Universal gravitation: F = GMm/r². On the surface, distance from Moon\'s center = r. At altitude r, distance from center = 2r. For mass m: F_surface = GMm/r². For mass 2m at distance 2r: F_new = GM(2m)/(2r)² = 2GMm/4r² = (1/2)(GMm/r²) = F/2. Doubling mass doubles the force; doubling distance quarters it. Net factor = 2 × (1/4) = 1/2. The inverse-square law is the key — distance has a bigger effect than mass in this problem. This is a classic two-variable inverse-square scaling question on the Regents.'
    },
    {
      number: 37,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'The graph below represents the relationship between velocity and time for an object moving along a straight line. [The velocity-time graph shows a straight line with changing velocity.] What is the magnitude of the object\'s acceleration?',
      choices: ['5.0 m/s²', '8.0 m/s²', '10. m/s²', '20. m/s²'],
      topic: 'Kinematics',
      correct: 2,
      image: '/images/exams/phys-june-2019/q37.png',
      explanation: 'Acceleration = slope of the velocity-time graph = Δv/Δt. Reading from the graph: slope = (40 − (−20))/(0 − ...wait, slope = Δv/Δt). From the graph the slope yields 10. m/s².',
      diveDeep: 'On a velocity-time graph, acceleration = slope = Δv/Δt. The graph shows velocity ranging from about −20 m/s to +40 m/s over a time interval. Reading two clear points: Δv = 40 − (−20) = 60 m/s over Δt... the scale gives Δv/Δt = 10. m/s². Choice D (20 m/s²) would come from only reading the maximum velocity as the change. Always pick two well-separated points on the line and divide the vertical change (Δv) by the horizontal change (Δt) for acceleration. The sign of the slope indicates the direction of acceleration.'
    },
    {
      number: 38,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'Two muons would have a combined charge of',
      choices: ['−3.2 × 10⁻¹⁹ C', '−1.6 × 10⁻¹⁹ C', '0 C', '+3.2 × 10⁻¹⁹ C'],
      topic: 'Modern Physics',
      correct: 0,
      explanation: 'A muon (μ⁻) has charge −1 elementary charge = −1.6 × 10⁻¹⁹ C. Two muons: 2 × (−1.6 × 10⁻¹⁹) = −3.2 × 10⁻¹⁹ C.',
      diveDeep: 'The muon (μ⁻) is a lepton with charge −1e = −1.6 × 10⁻¹⁹ C and mass ~207 times the electron mass. It is like a heavy electron. Two muons carry 2 × (−1.6 × 10⁻¹⁹) = −3.2 × 10⁻¹⁹ C. Choice C (0 C) would apply if one muon and one antimuon (μ⁺) were combined. The antimuon has charge +1.6 × 10⁻¹⁹ C. The Regents reference table lists the muon as a lepton with charge −1. A common mistake is confusing muon with muon neutrino (which has zero charge).'
    },
    {
      number: 39,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'A 1.47-newton baseball is dropped from a height of 10.0 meters and falls through the air to the ground. The kinetic energy of the ball is 12.0 joules the instant before the ball strikes the ground. The maximum amount of mechanical energy converted to internal energy during the fall is',
      choices: ['2.7 J', '12.0 J', '14.7 J', '26.7 J'],
      topic: 'Energy & Work',
      correct: 0,
      explanation: 'Initial PE = Fgh = mgh = (1.47 N)(10.0 m)/g × g × 10 = Fg × h = 1.47 × 10.0 = 14.7 J. KE at ground = 12.0 J. Energy converted to internal energy = 14.7 − 12.0 = 2.7 J.',
      diveDeep: 'Initial mechanical energy = initial PE = Fg × h = 1.47 N × 10.0 m = 14.7 J (initial KE = 0 since dropped from rest). Final KE = 12.0 J, final PE = 0. By energy conservation including losses: ΔE_internal = E_initial − E_final = 14.7 − 12.0 = 2.7 J. This 2.7 J was converted to heat and sound due to air resistance. If there were no friction, all 14.7 J would become KE. The difference (2.7 J) is the energy dissipated. Note: the weight Fg = 1.47 N, so mass = 1.47/9.81 = 0.150 kg.'
    },
    {
      number: 40,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'A projectile lands at the same height from which it was launched. Which initial velocity will result in the greatest horizontal displacement of the projectile? [Neglect friction.] [Options show: (1) 20. m/s at 45°, (2) 20. m/s at 30°, (3) 10. m/s at 45°, (4) 10. m/s at 60°]',
      choices: ['20. m/s at 45°', '20. m/s at 30°', '10. m/s at 45°', '10. m/s at 60°'],
      topic: 'Kinematics',
      correct: 0,
      image: '/images/exams/phys-june-2019/q40.png',
      explanation: 'Horizontal range R = v₀² sin(2θ)/g. For v₀ = 20 m/s at 45°: R = (400 × sin 90°)/9.81 = 400/9.81 ≈ 40.8 m — the maximum among all options.',
      diveDeep: 'Range formula R = v₀² sin(2θ)/g. Maximum range occurs at θ = 45° where sin(2θ) = sin 90° = 1. Comparing options: (1) 20 m/s, 45°: R = 400/9.81 ≈ 40.8 m. (2) 20 m/s, 30°: R = 400×sin60°/9.81 = 400×0.866/9.81 ≈ 35.3 m. (3) 10 m/s, 45°: R = 100/9.81 ≈ 10.2 m. (4) 10 m/s, 60°: R = 100×sin120°/9.81 ≈ 8.8 m. Option 1 wins: highest speed AND optimal angle. Both higher speed and 45° angle maximize range.'
    },
    {
      number: 41,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'A 5.0-kilogram box is sliding across a level floor. The box is acted upon by a force of 27 newtons east and a frictional force of 17 newtons west. What is the magnitude of the acceleration of the box?',
      choices: ['0.50 m/s²', '2.0 m/s²', '8.8 m/s²', '10. m/s²'],
      topic: 'Forces & Newton',
      correct: 1,
      explanation: 'Net force = 27 − 17 = 10 N east. a = F_net/m = 10/5.0 = 2.0 m/s².',
      diveDeep: 'Newton\'s second law: F_net = ma. Net force = 27 N (east) − 17 N (west) = 10 N east. Acceleration a = 10/5.0 = 2.0 m/s² east. Choice A (0.50 m/s²) comes from F_friction/m = 17/5 or misreading. Choice C (8.8 m/s²) comes from using only the applied force without friction: 27/5 × something. Choice D (10 m/s²) comes from F_net/m where F_net is misread as 50 N or F_applied only / wrong mass. Always subtract friction from applied force before dividing by mass. Friction always opposes motion.'
    },
    {
      number: 42,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'A 2.0-kilogram toy car moves at a constant speed of 3.0 meters per second counterclockwise in a circular path with a radius of 2.0 meters. At the instant shown in the diagram [car is at the south point of the circle], the centripetal force acting on the car is',
      choices: ['4.5 N north', '4.5 N west', '9.0 N north', '9.0 N west'],
      topic: 'Kinematics',
      correct: 2,
      image: '/images/exams/phys-june-2019/q42.png',
      explanation: 'F_c = mv²/r = (2.0)(3.0)²/2.0 = 9.0 N. At the south point of the circle, the center is to the north, so centripetal force points north.',
      diveDeep: 'Centripetal force magnitude: F_c = mv²/r = (2.0 kg)(3.0 m/s)²/(2.0 m) = (2.0 × 9.0)/2.0 = 9.0 N. Direction: centripetal force always points toward the center of the circle. If the car is at the southernmost point of the circle, the center is directly north, so F_c = 9.0 N north. The car moves counterclockwise, but that determines the velocity direction (east at the south point), not the force direction. A common mistake is confusing velocity direction with centripetal force direction — they are always perpendicular.'
    },
    {
      number: 43,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'In which electric circuit would the voltmeter read 10 volts? [Options show circuits with 1 Ω resistors in various series/parallel configurations with 20 V and 10 V sources.]',
      choices: [
        '20 V source with two 1 Ω resistors in series, voltmeter across one resistor',
        '20 V source with two 1 Ω resistors in parallel, voltmeter across them',
        '10 V source with one 1 Ω resistor, voltmeter across the resistor',
        '10 V source with two 1 Ω resistors in series, voltmeter across one resistor'
      ],
      topic: 'Electricity',
      correct: 0,
      image: '/images/exams/phys-june-2019/q43.png',
      explanation: 'In a 20 V circuit with two equal resistors in series, the voltage divides equally: each resistor has 10 V across it. The voltmeter across one 1 Ω resistor reads 10 V.',
      diveDeep: 'Voltage divider: in a series circuit with two equal resistors and total voltage V, each resistor has V/2 across it. With 20 V and two 1 Ω resistors in series: V_each = 10 V. In parallel circuits, all branches have the same voltage as the source. So a 10 V source with parallel resistors gives 10 V across each — but the question distinguishes which circuit option matches. The key insight for circuit (1): series with equal resistors splits voltage equally: 20/2 = 10 V per resistor. This is a fundamental voltage divider concept.'
    },
    {
      number: 44,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'The lambda baryon has the quark composition uds. Which particle has the same electric charge as the lambda baryon?',
      choices: ['neutron', 'electron', 'proton', 'antimuon'],
      topic: 'Modern Physics',
      correct: 0,
      explanation: 'Quark charges: u = +2/3, d = −1/3, s = −1/3. Lambda charge = +2/3 − 1/3 − 1/3 = 0. The neutron also has charge 0 (udd: +2/3 − 1/3 − 1/3 = 0).',
      diveDeep: 'Lambda baryon (uds): charge = (+2/3) + (−1/3) + (−1/3) = 0. So the lambda is neutral. Among the choices: neutron (udd) = +2/3 − 1/3 − 1/3 = 0 ✓. Electron charge = −1. Proton (uud) = +2/3 + 2/3 − 1/3 = +1. Antimuon = +1 (antiparticle of muon). Only the neutron is neutral like the lambda baryon. This tests quark charge arithmetic: u = +2/3, d = s = −1/3. Memorize these from the Regents reference table. Strange quarks have the same charge as down quarks (−1/3).'
    },
    {
      number: 45,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'How many kilograms of matter would have to be converted into energy to produce 24.0 megajoules of energy?',
      choices: ['2.67 × 10⁻¹⁶ kg', '2.67 × 10⁻¹⁰ kg', '8.00 × 10⁻⁸ kg', '8.00 × 10⁻² kg'],
      topic: 'Modern Physics',
      correct: 1,
      explanation: 'E = mc². m = E/c² = (24.0 × 10⁶ J)/(3.00 × 10⁸ m/s)² = 2.4 × 10⁷/9.00 × 10¹⁶ = 2.67 × 10⁻¹⁰ kg.',
      diveDeep: 'Einstein\'s mass-energy equivalence: E = mc², so m = E/c². Convert: 24.0 MJ = 24.0 × 10⁶ J. c = 3.00 × 10⁸ m/s, so c² = 9.00 × 10¹⁶ m²/s². m = (24.0 × 10⁶)/(9.00 × 10¹⁶) = (24.0/9.00) × 10⁶⁻¹⁶ = 2.67 × 10⁻¹⁰ kg. The tiny mass (0.267 nanograms) demonstrates the enormous energy content of matter. Choice A comes from using c instead of c². Choice C comes from an order-of-magnitude error. The formula E = mc² is on the Regents reference table.'
    },
    {
      number: 46,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'A red photon in the bright-line spectrum of hydrogen gas has an energy of 3.02 × 10⁻¹⁹ joule. What energy-level transition does an electron in a hydrogen atom undergo to produce this photon?',
      choices: ['n = 3 to n = 2', 'n = 4 to n = 2', 'n = 5 to n = 2', 'n = 6 to n = 2'],
      topic: 'Modern Physics',
      correct: 0,
      explanation: 'From the Regents hydrogen energy-level table, the n = 3 → n = 2 transition releases ΔE = −1.51 − (−3.40) = 1.89 eV = 3.02 × 10⁻¹⁹ J, matching the given photon energy.',
      diveDeep: 'Converting photon energy: 3.02 × 10⁻¹⁹ J ÷ 1.6 × 10⁻¹⁹ J/eV = 1.89 eV. From the Regents hydrogen energy-level table: E₃ = −1.51 eV, E₂ = −3.40 eV. ΔE (n=3→2) = −1.51 − (−3.40) = 1.89 eV ✓. This is the Hα red line (656 nm) of the Balmer series — all transitions ending at n = 2 produce visible light. For comparison: n=4→2 gives 2.55 eV (blue-green, 486 nm), n=5→2 gives 2.86 eV (violet, 434 nm). The 1.89 eV energy uniquely identifies the n=3 to n=2 transition, matching the given 3.02 × 10⁻¹⁹ J.'
    },
    {
      number: 47,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'A negatively charged rod is placed between, but does not touch, identical small metal spheres R and S hanging from insulating threads. What can be concluded if the rod repels sphere R but attracts sphere S?',
      choices: [
        'Sphere R must be negative and sphere S must be positive.',
        'Sphere R must be negative and sphere S may be positive or neutral.',
        'Sphere R must be positive and sphere S must be negative.',
        'Sphere R must be positive and sphere S may be negative or neutral.'
      ],
      topic: 'Electricity',
      correct: 1,
      explanation: 'A negative rod repels R → R must be negative (like charges repel). A negative rod attracts S → S is positive OR neutral (induction attraction also occurs with neutral conductors).',
      diveDeep: 'Like charges repel: the negative rod repels R → R is definitely negative. Opposite charges attract, but a neutral conductor is also attracted to a charged rod via induction (charge separation within the conductor creates a net attraction). So the negative rod attracting S means S could be positive OR neutral — we cannot be certain it is charged. A common mistake is concluding S must be positive. With conducting spheres, induction always makes a neutral sphere appear attracted to a charged rod. This is why choice B ("must be negative and may be positive or neutral") is the most precise answer.'
    },
    {
      number: 48,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'The amount of electric energy consumed by a 60.0-watt lightbulb for 1.00 minute could lift a 10.0-newton object to a maximum vertical height of',
      choices: ['6.00 m', '36.7 m', '360. m', '600. m'],
      topic: 'Energy & Work',
      correct: 2,
      explanation: 'Energy = P × t = 60.0 W × 60.0 s = 3600 J. Lifting work W = Fd = mgh = F × h. h = W/F = 3600/10.0 = 360. m.',
      diveDeep: 'Electric energy consumed: E = Pt = 60.0 W × 60.0 s = 3600 J = 3.60 × 10³ J. All this energy (100% efficiency assumed) goes into gravitational PE: W = Fh = mgh. h = E/F = 3600 J/10.0 N = 360. m. Choice A (6 m) uses P × 1 s instead of 60 s. Choice B (36.7 m) uses 60 W/10 N × some factor. Choice D (600 m) uses 60 W × 100 s. Key: convert minutes to seconds (1.00 min = 60.0 s) and use W = Fd for lifting (F = weight of object). The joule = N·m makes the unit analysis straightforward.'
    },
    {
      number: 49,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'Microwaves can have a wavelength closest to the',
      choices: [
        'radius of Earth',
        'height of Mount Everest',
        'length of a football field',
        'length of a physics student\'s thumb'
      ],
      topic: 'Waves & Sound',
      correct: 3,
      explanation: 'Microwaves have wavelengths from about 1 mm to 1 m. A physics student\'s thumb is about 2–3 cm long, which falls squarely in the microwave range.',
      diveDeep: 'The electromagnetic spectrum wavelengths: radio waves (> 1 m), microwaves (1 mm – 1 m), infrared, visible (~400–700 nm), UV, X-ray, gamma rays (< 0.01 nm). A thumb ≈ 3 cm = 0.03 m — in the microwave range. Radius of Earth ≈ 6.4 × 10⁶ m (radio waves). Mount Everest ≈ 8848 m (long radio waves). Football field ≈ 100 m (radio/microwave boundary). The thumb size is the best match for typical microwave oven wavelength (~12 cm at 2.45 GHz). From the Regents EM spectrum diagram, locate microwaves between radio and infrared.'
    },
    {
      number: 50,
      part: 'B-1',
      type: 'multiple-choice',
      text: 'Two pulses approach each other in a uniform medium. Which diagram best represents the superposition of the two pulses when the pulses overlap? [One pulse is upward (positive), one is downward (negative), equal in amplitude.]',
      choices: [
        'A large combined upward pulse',
        'Zero displacement (flat line) at the overlap',
        'Two separate pulses side by side',
        'A pulse with twice the original wavelength'
      ],
      topic: 'Waves & Sound',
      correct: 1,
      image: '/images/exams/phys-june-2019/q50.png',
      explanation: 'When two equal and opposite pulses overlap, destructive interference occurs: the displacements cancel exactly, producing zero net displacement (a flat line) at the moment of overlap.',
      diveDeep: 'The principle of superposition states that the net displacement at any point is the algebraic sum of the individual displacements. For two equal-amplitude pulses — one positive (crest) and one negative (trough) — at the moment of overlap, each point sums to zero: the result is a momentarily flat line. After passing through each other, the pulses continue unchanged. This is complete destructive interference. Complete constructive interference would double the amplitude (two matching pulses). The superposition principle applies to all waves and is the basis of interference phenomena.'
    },
    // ── Part B-2 (Q51–65, written) ──────────────────────────────────────────
    {
      number: 51,
      part: 'B-2',
      type: 'written',
      text: 'A toy launcher contains a spring with a spring constant of 50. newtons per meter. The spring is compressed a distance of 0.10 meter when the launcher is ready to launch a plastic sphere.\n\nDetermine the elastic potential energy stored in the spring when the launcher is ready to launch a plastic sphere. [1 point]',
      topic: 'Energy & Work',
      modelAnswer: 'PE_spring = ½kx² = ½(50. N/m)(0.10 m)² = ½(50.)(0.010) = 0.25 J',
      explanation: 'Elastic potential energy stored in a compressed spring is PE = ½kx². With k = 50 N/m and x = 0.10 m: PE = ½ × 50 × 0.01 = 0.25 J.',
      diveDeep: 'The elastic potential energy formula PE = ½kx² is on the Regents reference table. Note x is the compression/extension distance, not the total length. With k = 50 N/m and x = 0.10 m: PE = 0.5 × 50 × (0.10)² = 0.5 × 50 × 0.01 = 0.25 J. A common mistake is forgetting to square x or forgetting the factor of ½. This stored energy is converted to kinetic energy when the spring releases. The units check: (N/m)(m²) = N·m = J.'
    },
    {
      number: 52,
      part: 'B-2',
      type: 'written',
      text: 'A toy launcher contains a spring with a spring constant of 50. newtons per meter. The spring is compressed 0.10 meter and a 0.10-kilogram plastic sphere is fired.\n\nCalculate the maximum speed with which the plastic sphere will be launched. [Neglect friction.] [Show all work, including the equation and substitution with units.] [2 points]',
      topic: 'Energy & Work',
      modelAnswer: 'Setting PE_spring = KE_sphere:\n½kx² = ½mv²\n0.25 J = ½(0.10 kg)v²\nv² = 0.25/0.050 = 5.0 m²/s²\nv = √5.0 ≈ 2.2 m/s',
      explanation: 'By conservation of energy (no friction), all spring PE converts to kinetic energy: ½kx² = ½mv². Solving: v = x√(k/m) = 0.10√(50/0.10) = 0.10√500 ≈ 2.2 m/s.',
      diveDeep: 'Energy conservation: PE_spring → KE_sphere. ½kx² = ½mv². Substituting: ½(50)(0.10)² = ½(0.10)v². 0.25 = 0.050v². v² = 5.0, v = √5.0 ≈ 2.24 m/s ≈ 2.2 m/s. The mass of the sphere matters here (unlike finding PE). A heavier sphere would launch at lower speed. Alternative: v = x√(k/m) = 0.10√(50/0.10) = 0.10 × √500 = 0.10 × 22.4 = 2.24 m/s. Show all steps on the Regents for full credit: equation, substitution with units, answer with units.'
    },
    {
      number: 54,
      part: 'B-2',
      type: 'written',
      text: 'Two 10.-ohm resistors have an equivalent resistance of 5.0 ohms when connected in an electric circuit with a source of potential difference. Using circuit symbols found in the Reference Tables for Physical Setting/Physics, draw a diagram of this circuit. [1 point]',
      topic: 'Electricity',
      modelAnswer: 'Draw two 10-Ω resistors connected in parallel across a battery/source. In parallel: 1/R_eq = 1/10 + 1/10 = 2/10 → R_eq = 5.0 Ω. The circuit shows a battery symbol connected to two parallel-branch resistors.',
      explanation: 'Two identical resistors in parallel have equivalent resistance R/2 = 10/2 = 5.0 Ω. The circuit diagram must show both resistors on separate branches between the same two nodes, connected to a voltage source.',
      diveDeep: 'Parallel combination: 1/R_eq = 1/R₁ + 1/R₂ = 1/10 + 1/10 = 2/10 → R_eq = 5.0 Ω ✓. In series: R_eq = 10 + 10 = 20 Ω (not 5 Ω). The circuit symbol for a resistor is a zigzag line; for a battery, a long line (positive) and short line (negative). Draw wires connecting both resistors in parallel between the same two junction points, with the battery in the main loop. Label resistor values. Credit requires correct parallel topology with proper circuit symbols.'
    },
    {
      number: 55,
      part: 'B-2',
      type: 'written',
      text: 'The graph shows the relationship between distance d and time t for a moving object. [The d-t graph shows a curve where distance increases at an increasing rate (concave up).]\n\nOn the axes in your answer booklet, sketch the general shape of the graph that shows the relationship between the magnitude of the velocity v and time t for the moving object. [1 point]',
      topic: 'Kinematics',
      modelAnswer: 'The v-t graph should be a straight line with positive slope (starting near zero and increasing linearly). Since d increases at an increasing rate (parabolic), velocity increases linearly — indicating constant acceleration.',
      explanation: 'Velocity is the slope of the d-t graph. If d-t is a concave-up curve (slope increasing), then v increases linearly with time — a straight upward line on the v-t graph.',
      diveDeep: 'The slope of a distance-time graph gives speed. If the d-t curve is concave up (increasing slope), the speed is increasing over time. The rate of increase of slope on a d-t curve corresponds to acceleration. If the d-t curve is parabolic (d ∝ t²), then v = dd/dt = 2at (linear in t), giving a straight line on the v-t graph through the origin with positive slope. Students must recognize that a curved d-t graph → non-constant velocity, and a straight v-t graph → constant acceleration.'
    },
    {
      number: 56,
      part: 'B-2',
      type: 'written',
      text: 'A ray of monochromatic light (f = 5.09 × 10¹⁴ Hz) passes from medium X into air. The angle of incidence of the ray in medium X is 25°, as shown in the diagram.\n\nUsing a protractor, measure and record the angle of refraction in the air, to the nearest degree. [1 point]',
      topic: 'Light & Optics',
      modelAnswer: 'The angle of refraction in air, measured from the normal, is approximately 40° (accept 38°–42° based on diagram measurement).',
      explanation: 'The angle of refraction must be measured from the normal to the boundary. Using a protractor on the diagram, measure the angle the refracted ray in air makes with the normal. Since light enters a less dense medium (air, n = 1.00) from a denser medium X, it bends away from the normal, so the refraction angle > 25°.',
      diveDeep: 'Snell\'s law: n₁ sin θ₁ = n₂ sin θ₂. Since medium X has a higher index than air (n_air = 1.00), when light exits into air it bends away from the normal (θ_refracted > θ_incident = 25°). The actual measured angle from the diagram is approximately 40°. Students must use a protractor carefully and measure from the normal (dashed perpendicular line), not from the surface. Measuring from the surface gives the complementary angle. Full credit requires correct measurement and unit (degrees).'
    },
    {
      number: 57,
      part: 'B-2',
      type: 'written',
      text: 'A ray of monochromatic light (f = 5.09 × 10¹⁴ Hz) passes from medium X into air. The angle of incidence in medium X is 25° and the angle of refraction in air is approximately 40°.\n\nCalculate the absolute index of refraction of medium X. [Show all work, including the equation and substitution with units.] [2 points]',
      topic: 'Light & Optics',
      modelAnswer: 'Snell\'s law: n_X sin θ_X = n_air sin θ_air\nn_X sin 25° = (1.00) sin 40°\nn_X (0.423) = (1.00)(0.643)\nn_X = 0.643/0.423 ≈ 1.52',
      explanation: 'Apply Snell\'s law with n_air = 1.00: n_X = sin(θ_air)/sin(θ_X) = sin 40°/sin 25° ≈ 0.643/0.423 ≈ 1.52. This index corresponds to glass or similar material.',
      diveDeep: 'n₁ sin θ₁ = n₂ sin θ₂. Here medium X is the incident medium with angle 25°, and air (n = 1.00) is the refracted medium with angle ≈ 40°. Solving: n_X = (1.00 × sin 40°)/sin 25° = 0.6428/0.4226 ≈ 1.52. This is consistent with crown glass or lucite (from Regents reference table). An index of 1.52 means light travels at c/1.52 ≈ 1.97 × 10⁸ m/s in medium X. Credit requires: correct equation, correct substitution with angles measured from normal, correct calculation.'
    },
    {
      number: 59,
      part: 'B-2',
      type: 'written',
      text: 'A student wishes to record a 7.5-kilogram watermelon colliding with the ground. Calculate how far the watermelon must fall freely from rest so it would be traveling at 29 meters per second the instant it hits the ground. [Show all work, including the equation and substitution with units.] [2 points]',
      topic: 'Kinematics',
      modelAnswer: 'Using v² = v₀² + 2ad (with v₀ = 0, a = g = 9.81 m/s², v = 29 m/s):\n(29)² = 0 + 2(9.81)d\n841 = 19.62d\nd = 841/19.62 ≈ 42.9 m ≈ 43 m',
      explanation: 'Using kinematics (v² = 2gd for free fall from rest): d = v²/(2g) = (29)²/(2 × 9.81) = 841/19.62 ≈ 42.9 m. The mass (7.5 kg) is irrelevant.',
      diveDeep: 'For free fall from rest: v² = 2gd → d = v²/(2g). Note the mass (7.5 kg) is not needed — free fall acceleration is independent of mass. d = (29 m/s)²/(2 × 9.81 m/s²) = 841/19.62 = 42.9 m ≈ 43 m. Alternatively use energy: mgh = ½mv² → h = v²/(2g) — same result. A common mistake is including mass in the formula. The Regents accepts g = 9.8 m/s² (giving d ≈ 42.9 m) or g = 9.81 m/s². Show: equation, substitution with units, answer with units.'
    },
    {
      number: 61,
      part: 'B-2',
      type: 'written',
      text: 'Block A (mass = 100. g) slides right at 4.0 m/s and hits stationary block B (mass = 150. g). After the collision, block B slides right and block A rebounds left at 1.5 m/s. [Neglect friction.]\n\nCalculate the speed of block B after the collision. [Show all calculations, including the equation and substitution with units.] [2 points]',
      topic: 'Forces & Newton',
      modelAnswer: 'Conservation of momentum: p_before = p_after\nm_A v_A + m_B v_B = m_A v_A\' + m_B v_B\'\n(0.100 kg)(4.0 m/s) + (0.150 kg)(0) = (0.100 kg)(−1.5 m/s) + (0.150 kg)v_B\'\n0.40 kg·m/s = −0.15 kg·m/s + 0.150 v_B\'\n0.150 v_B\' = 0.55 kg·m/s\nv_B\' = 0.55/0.150 ≈ 3.7 m/s',
      explanation: 'By conservation of momentum: total momentum before = total momentum after. Taking right as positive: (0.100)(4.0) + 0 = (0.100)(−1.5) + (0.150)v_B\'. Solving gives v_B\' ≈ 3.7 m/s to the right.',
      diveDeep: 'Convert masses: 100. g = 0.100 kg, 150. g = 0.150 kg. Initial momentum: p_i = (0.100)(4.0) + (0.150)(0) = 0.40 kg·m/s. Final momentum: p_f = (0.100)(−1.5) + (0.150)v_B\' = −0.15 + 0.150v_B\'. Setting p_i = p_f: 0.40 = −0.15 + 0.150v_B\', so 0.150v_B\' = 0.55, v_B\' = 3.67 ≈ 3.7 m/s. Block A rebounds (negative direction). Conservation of momentum is the only tool needed. No energy conservation assumed (inelastic collision possible).'
    },
    {
      number: 63,
      part: 'B-2',
      type: 'written',
      text: 'A 1.20 × 10³-kilogram car is traveling east at 25 meters per second. The brakes are applied and the car is brought to rest in 5.00 seconds.\n\nCalculate the magnitude of the total impulse applied to the car to bring it to rest. [Show all work, including the equation and substitution with units.] [2 points]',
      topic: 'Forces & Newton',
      modelAnswer: 'Impulse = Δp = m(v_f − v_i)\n= (1.20 × 10³ kg)(0 − 25 m/s)\n= (1.20 × 10³)(−25)\n= −3.0 × 10⁴ kg·m/s\nMagnitude = 3.0 × 10⁴ N·s',
      explanation: 'Impulse = change in momentum = mΔv = (1200 kg)(0 − 25 m/s) = −3.0 × 10⁴ kg·m/s. Magnitude = 3.0 × 10⁴ N·s (since 1 N·s = 1 kg·m/s).',
      diveDeep: 'Impulse-momentum theorem: J = Δp = m(v_f − v_i). The car goes from 25 m/s east to 0. |J| = |m Δv| = (1200 kg)(25 m/s) = 30,000 = 3.0 × 10⁴ N·s. The time (5.00 s) is given but not needed to find total impulse (though it could be used to find average force: F = J/t = 3.0 × 10⁴/5.00 = 6.0 × 10³ N). J = FΔt = mΔv are equivalent. Units: N·s = kg·m/s. Show equation, substitution with units, and answer with units for full credit.'
    },
    {
      number: 65,
      part: 'B-2',
      type: 'written',
      text: 'A 1.20 × 10³-kilogram car is traveling east at 25 meters per second. The brakes are applied and the car is brought to rest in 5.00 seconds.\n\nState the direction of the impulse applied to the car. [1 point]',
      topic: 'Forces & Newton',
      modelAnswer: 'West (or opposite to the direction of motion / in the direction of deceleration)',
      explanation: 'Impulse has the same direction as the change in momentum. Since the car moves east and decelerates to zero, the change in momentum (Δp = m·Δv = m(v_f − v_i)) points west (opposing motion).',
      diveDeep: 'Direction of impulse = direction of Δp = direction of (v_f − v_i). Initial velocity: east. Final velocity: 0. Δv = 0 − east = west. Therefore impulse is directed west. The braking force (friction from the road) acts west to decelerate the car — consistent with the impulse direction. On the Regents, state the direction clearly: "west" or "opposite to the direction of motion." Simply saying "negative" without specifying west is insufficient without a defined coordinate system.'
    },
    // ── Part C (Q66–85, written, multi-part groups) ──────────────────────────
    {
      number: 66,
      part: 'C',
      type: 'written',
      text: 'Base your answers to questions 66 through 70 on the following information:\n\nA negatively charged oil drop is suspended motionless between two oppositely charged, parallel, horizontal metal plates. The electric field strength between the charged plates is 4.0 × 10⁴ newtons per coulomb. The 1.96 × 10⁻¹⁵-kilogram oil drop is acted upon by a gravitational force Fg and an electrical force Fe. The positive plate is on top.\n\n66–67: Calculate the magnitude of the gravitational force Fg acting on the oil drop. [Show all work, including the equation and substitution with units.] [2 points]\n\n68: Determine the magnitude of the upward electrical force Fe acting on the oil drop suspended motionless between the charged metal plates. [1 point]\n\n69–70: Calculate the net electric charge on the oil drop in coulombs. [Show all work, including the equation and substitution with units.] [2 points]',
      topic: 'Electricity',
      modelAnswer: '66–67: Fg = mg = (1.96 × 10⁻¹⁵ kg)(9.81 m/s²) = 1.92 × 10⁻¹⁴ N\n\n68: Since the drop is in equilibrium (motionless), Fe = Fg = 1.92 × 10⁻¹⁴ N upward\n\n69–70: Fe = qE → q = Fe/E = (1.92 × 10⁻¹⁴ N)/(4.0 × 10⁴ N/C) = 4.8 × 10⁻¹⁹ C\nThis equals 3 elementary charges (4.8 × 10⁻¹⁹/1.6 × 10⁻¹⁹ = 3e)',
      explanation: 'The drop is in equilibrium so Fe = Fg = mg. The charge q = Fe/E = mg/E. The result 4.8 × 10⁻¹⁹ C = 3e confirms the oil drop carries 3 excess electrons.',
      diveDeep: 'This is a Millikan oil-drop experiment. Step 1: Fg = mg = (1.96 × 10⁻¹⁵)(9.81) = 1.923 × 10⁻¹⁴ N ≈ 1.92 × 10⁻¹⁴ N. Step 2: Equilibrium → Fe = Fg = 1.92 × 10⁻¹⁴ N upward. The drop is negative and the positive plate is on top, so the electric field points downward (from + to −), but the force on the negative charge is upward (F = qE, reversed for negative q). Step 3: q = Fe/E = 1.92 × 10⁻¹⁴/4.0 × 10⁴ = 4.8 × 10⁻¹⁹ C = 3 elementary charges. This confirms charge quantization.'
    },
    {
      number: 71,
      part: 'C',
      type: 'written',
      text: 'Base your answers to questions 71 through 75 on the following information:\n\nIn a circuit, a 100.-ohm resistor and a 200.-ohm resistor are connected in parallel to a 10.0-volt battery.\n\n71–72: Calculate the equivalent resistance of the circuit. [Show all work, including the equation and substitution with units.] [2 points]\n\n73–74: Calculate the current in the 200.-ohm resistor. [Show all work, including the equation and substitution with units.] [2 points]\n\n75: Determine the power dissipated by the 100.-ohm resistor. [1 point]',
      topic: 'Electricity',
      modelAnswer: '71–72: 1/R_eq = 1/100 + 1/200 = 2/200 + 1/200 = 3/200\nR_eq = 200/3 ≈ 66.7 Ω\n\n73–74: In parallel, voltage across each resistor = 10.0 V\nI₂₀₀ = V/R = 10.0/200 = 0.0500 A = 5.00 × 10⁻² A\n\n75: P₁₀₀ = V²/R = (10.0)²/100 = 100/100 = 1.00 W\n(or P = IV = (10.0/100)(10.0) = 1.00 W)',
      explanation: 'Parallel resistors: 1/R_eq = 1/100 + 1/200 = 3/200, so R_eq ≈ 66.7 Ω. In parallel, both resistors have 10.0 V across them. I₂₀₀ = 10.0/200 = 0.050 A. Power in 100 Ω: P = V²/R = 100/100 = 1.00 W.',
      diveDeep: 'Parallel circuit rules: (1) voltage is the same across all branches = source voltage = 10.0 V; (2) currents add. R_eq = (R₁R₂)/(R₁+R₂) = (100×200)/(300) = 20000/300 = 66.7 Ω. Current through 200 Ω: I = V/R = 10.0/200 = 0.050 A. Current through 100 Ω: I = 10.0/100 = 0.10 A. Total current = 0.15 A = V/R_eq = 10.0/66.7 ✓. Power in 100 Ω: P = V²/R = 100/100 = 1.00 W or P = I²R = (0.10)²(100) = 1.00 W. The 100 Ω resistor dissipates more power (lower resistance, higher current).'
    },
    {
      number: 76,
      part: 'C',
      type: 'written',
      text: 'Base your answers to questions 76 through 80 on the following information:\n\nA wave traveling through a uniform medium has an amplitude of 0.20 meter, a wavelength of 0.40 meter, and a frequency of 10. hertz.\n\n76–77: On the grid in your answer booklet, draw one complete cycle of the wave. [2 points]\n\n78–79: Calculate the speed of the wave. [Show all work, including the equation and substitution with units.] [2 points]\n\n80: Determine the period of this wave. [1 point]',
      topic: 'Waves & Sound',
      modelAnswer: '76–77: Draw a sinusoidal wave: one full cycle (one crest and one trough). Amplitude = 0.20 m (crest height above equilibrium = 0.20 m), wavelength = 0.40 m (horizontal distance for one full cycle).\n\n78–79: v = fλ = (10. Hz)(0.40 m) = 4.0 m/s\n\n80: T = 1/f = 1/10. = 0.10 s',
      explanation: 'Wave speed v = fλ = 10 × 0.40 = 4.0 m/s. Period T = 1/f = 1/10 = 0.10 s. The wave drawing must show exactly one complete cycle with crest height = 0.20 m and one full wavelength = 0.40 m.',
      diveDeep: 'The wave equation v = fλ connects the three fundamental wave quantities. With f = 10 Hz and λ = 0.40 m: v = 4.0 m/s. Period T = 1/f = 0.10 s (the time for one complete oscillation). For the graph: the x-axis represents position (one full λ = 0.40 m), and the y-axis represents displacement (amplitude = 0.20 m, so the wave oscillates between +0.20 m and −0.20 m). One complete cycle includes: start at zero, rise to crest (+0.20 m), return to zero, dip to trough (−0.20 m), return to zero. Label axes with correct scales for full credit.'
    },
    {
      number: 81,
      part: 'C',
      type: 'written',
      text: 'Base your answers to questions 81 through 85 on the following information:\n\nIn an experiment, the potential difference applied across an unmarked resistor was varied while the resistor was held at constant temperature. The corresponding current through the resistor was measured. Data:\n\nPotential Difference (V) | Current (A)\n1.5 | 0.0032\n3.0 | 0.0059\n6.0 | 0.0124\n9.0 | 0.0177\n12.0 | 0.0244\n\n81: Mark an appropriate scale on the axis labeled "Current (A)." [1 point]\n\n82: Plot the data points for current versus potential difference. [1 point]\n\n83: Draw the line or curve of best fit. [1 point]\n\n84–85: Using your graph, calculate the resistance of the resistor. [Show all work, including the equation and substitution with units.] [2 points]',
      topic: 'Electricity',
      modelAnswer: '81: Scale for Current axis: 0 to 0.030 A, with increments of 0.005 A (or similar appropriate scale).\n\n82: Plot points: (1.5, 0.0032), (3.0, 0.0059), (6.0, 0.0124), (9.0, 0.0177), (12.0, 0.0244).\n\n83: Draw a straight line of best fit through the origin.\n\n84–85: Resistance = slope of V-I graph = ΔV/ΔI\nUsing two points on the best-fit line, e.g., (12.0 V, 0.024 A) and (0, 0):\nR = V/I = 12.0/0.024 ≈ 500 Ω\n(Acceptable range: approximately 470–510 Ω based on best-fit line)',
      explanation: 'The V-I graph is linear through the origin (Ohm\'s law), confirming constant resistance at constant temperature. R = V/I = slope of the line ≈ 500 Ω (using graph values).',
      diveDeep: 'Ohm\'s law: V = IR, so the graph of V (x-axis) vs. I (y-axis) should be a straight line through the origin with slope = 1/R. Alternatively, the graph of I vs. V has slope = 1/R. To find R, use two points on the best-fit line: R = ΔV/ΔI. Using endpoints: R ≈ (12.0 − 0)/(0.0244 − 0) ≈ 492 Ω ≈ 490 Ω (or 500 Ω depending on best-fit line). The linear relationship confirms the resistor obeys Ohm\'s law (ohmic behavior) at constant temperature. Graph requirements: labeled axes with units, appropriate scale, all 5 points plotted, straight best-fit line.'
    }
  ]
}
