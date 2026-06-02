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
    }
  ]
}
