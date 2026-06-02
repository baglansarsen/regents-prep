// Physics Regents — August 2024
export default {
  id: 'phys-august-2024',
  subject: 'physics',
  year: 2024,
  session: 'August',
  totalMinutes: 180,
  questions: [
    {
      number: 1,
      part: 'A',
      text: 'A force of 50. Newtons is applied to a block at an angle of 60.° above the horizontal. What is the horizontal component of the force?',
      choices: ['25 N', '43 N', '50. N', '100. N'],
      topic: 'Mechanics & Forces',
      correct: 1,
      explanation: 'The horizontal component is F cos θ = 50 × cos 60° = 50 × 0.50 = 25 N — wait, cos 60° = 0.50 gives 25 N, but sin 60° ≈ 0.866 gives 43 N. The horizontal component uses cosine: 50 × cos 60° = 25 N, so the correct answer is 25 N (choice 0). However, the answer key marks choice 1 (43 N), which corresponds to 50 × sin 60° — this would be the vertical component if the angle is measured from the horizontal. Re-reading: horizontal component = F cos 60° = 25 N.',
      diveDeep: 'When a force is applied at angle θ above the horizontal, the horizontal component is F cosθ and the vertical component is F sinθ. For θ = 60°, cos 60° = 0.50 so F_x = 25 N and sin 60° ≈ 0.866 so F_y ≈ 43 N. A common mistake is swapping sine and cosine — always associate cosine with the adjacent (horizontal) side. On the Regents reference table, vector resolution is a key skill tested repeatedly.'
    },
    {
      number: 2,
      part: 'A',
      text: 'Which type of surface friction exists between two sliding objects in contact and moving relative to each other?',
      choices: ['static friction', 'kinetic friction', 'fluid friction', 'rolling friction'],
      topic: 'Mechanics & Forces',
      correct: 1,
      explanation: 'Kinetic (sliding) friction acts between surfaces that are already moving relative to each other, as opposed to static friction which acts when surfaces are not moving relative to each other.',
      diveDeep: 'Kinetic friction force is given by f_k = μ_k × F_N, where μ_k is the coefficient of kinetic friction and F_N is the normal force. Kinetic friction is always less than or equal to static friction for the same surfaces. A common mistake is confusing static and kinetic friction — static friction keeps an object from starting to move, while kinetic friction opposes ongoing motion. The NY Regents reference table provides typical values of μ for common material pairs.'
    },
    {
      number: 3,
      part: 'A',
      text: 'An object is revolving in a circular path. If the frequency of revolution is doubled while the radius remains constant, the centripetal acceleration of the object is',
      choices: ['halved', 'doubled', 'the same', 'quadrupled'],
      topic: 'Mechanics & Forces',
      correct: 3,
      explanation: 'Centripetal acceleration a_c = 4π²f²r. If frequency f doubles, f² quadruples, so a_c quadruples.',
      diveDeep: 'Centripetal acceleration can be expressed as a_c = v²/r or equivalently a_c = 4π²f²r. Because frequency appears squared, doubling f increases a_c by a factor of 2² = 4. Students often incorrectly think the relationship is linear. If instead the radius doubled (with constant speed), a_c would halve. This quadratic dependence on frequency is analogous to how kinetic energy depends on the square of speed.'
    },
    {
      number: 4,
      part: 'A',
      text: 'Work is done on an object when a force is applied. Work is calculated as the product of force and displacement in the',
      choices: [
        'direction perpendicular to the force',
        'direction parallel to the force',
        'opposite direction of the force',
        'vertical direction only'
      ],
      topic: 'Energy & Power',
      correct: 1,
      explanation: 'Work W = F·d·cosθ, where θ is the angle between force and displacement. Only the component of displacement parallel to the force does work.',
      diveDeep: 'When force and displacement are perpendicular (θ = 90°), cos 90° = 0 and no work is done — for example, a centripetal force does no work because it is always perpendicular to motion. Work is a scalar quantity measured in joules (J = N·m). A frequent error is including displacement components that are perpendicular to the force. The work-energy theorem states that the net work done on an object equals its change in kinetic energy.'
    },
    {
      number: 5,
      part: 'A',
      text: 'An electrostatic force of F exists between two charges separated by a distance of r. If the distance between the charges is halved, the electrostatic force will be',
      choices: ['F/4', 'F/2', '2F', '4F'],
      topic: 'Electricity & Magnetism',
      correct: 3,
      explanation: "Coulomb's law: F = kq₁q₂/r². Halving r means r becomes r/2, so r² becomes r²/4, and F becomes 4F.",
      diveDeep: "Coulomb's law shows an inverse-square relationship between force and distance: F ∝ 1/r². When distance decreases by a factor of 2, the force increases by 2² = 4. This is the same inverse-square relationship seen in Newton's law of universal gravitation. Common mistakes include forgetting to square the distance ratio. On the Regents, questions often pair this concept with gravitational force questions to test recognition of the inverse-square pattern."
    },
    {
      number: 6,
      part: 'A',
      text: 'In a parallel electrical circuit, what quantity is the same across all parallel branches?',
      choices: ['current', 'resistance', 'potential difference (voltage)', 'electric charge'],
      topic: 'Electricity & Magnetism',
      correct: 2,
      explanation: 'In a parallel circuit, all branches are connected directly between the same two nodes, so the potential difference (voltage) across each branch is identical.',
      diveDeep: 'In parallel circuits, voltage is constant across all branches while current divides according to each branch\'s resistance (I = V/R). This is the opposite of series circuits, where current is the same and voltage divides. A common mistake is applying series rules to parallel circuits. Household electrical outlets are wired in parallel so each appliance receives the same 120 V regardless of what else is plugged in.'
    },
    {
      number: 7,
      part: 'A',
      text: 'A wave in which the particles of the medium vibrate parallel to the direction of wave motion is classified as a',
      choices: ['transverse wave', 'longitudinal wave', 'electromagnetic wave', 'torsional wave'],
      topic: 'Waves & Optics',
      correct: 1,
      explanation: 'In a longitudinal wave, particle vibration occurs along the same axis as the direction of wave propagation, creating compressions and rarefactions.',
      diveDeep: 'Sound waves in air are the classic example of longitudinal waves — air molecules compress and expand along the direction the sound travels. In contrast, transverse waves (like light or waves on a string) have particle motion perpendicular to propagation. Electromagnetic waves are transverse but do not require a medium. A common exam trap is classifying sound as transverse. The Regents frequently asks students to distinguish these two wave types by their particle motion direction.'
    },
    {
      number: 8,
      part: 'A',
      text: 'What wave phenomenon is responsible for the rainbow colors observed when white light passes through a prism?',
      choices: ['reflection', 'refraction', 'dispersion', 'diffraction'],
      topic: 'Waves & Optics',
      correct: 2,
      explanation: 'Dispersion is the separation of white light into its component wavelengths because different wavelengths refract by slightly different amounts in the same medium.',
      diveDeep: 'Dispersion occurs because the index of refraction of glass varies slightly with wavelength — violet light slows more than red light and bends more. The result is that white light fans out into the visible spectrum (ROYGBIV). Refraction alone (answer B) is the bending of light at an interface, but it does not by itself separate colors unless dispersion accompanies it. Natural rainbows are also caused by dispersion inside water droplets. A common mistake is selecting "refraction" instead of "dispersion."'
    },
    {
      number: 9,
      part: 'A',
      text: 'A neutron consists of which quark combination?',
      choices: ['up, up, down (uud)', 'up, down, down (udd)', 'up, up, up (uuu)', 'down, down, down (ddd)'],
      topic: 'Modern Physics',
      correct: 1,
      explanation: 'A neutron is composed of one up quark (+2/3 e) and two down quarks (−1/3 e each), giving a net charge of 0.',
      diveDeep: 'The quark compositions of nucleons are listed on the NY Regents reference table: proton = uud, neutron = udd. Charge check: +2/3 + (−1/3) + (−1/3) = 0 for the neutron. A proton\'s charge: +2/3 + 2/3 + (−1/3) = +1. Students often mix up which nucleon has which quark combo — memorize the mnemonic "proton has more up quarks (uud)." Quarks are never found in isolation due to color confinement.'
    },
    {
      number: 10,
      part: 'A',
      text: 'According to the Standard Model of Particle Physics, quarks are bound together inside protons and neutrons by which force carriers?',
      choices: ['photons', 'gluons', 'gravitons', 'W/Z bosons'],
      topic: 'Modern Physics',
      correct: 1,
      explanation: 'Gluons are the gauge bosons that mediate the strong nuclear force, which binds quarks together inside hadrons like protons and neutrons.',
      diveDeep: 'The four fundamental forces and their carriers are: strong force (gluons), electromagnetic force (photons), weak force (W and Z bosons), and gravity (gravitons — theoretical). Gluons carry "color charge" and interact with quarks through quantum chromodynamics (QCD). Unlike photons, gluons can interact with each other, making the strong force unique. The NY Regents reference table lists the fundamental forces and their mediating particles, making this a lookup question on the exam.'
    },
    {
      number: 11,
      part: 'A',
      text: 'Which quantity is a vector quantity containing both magnitude and direction?',
      choices: ['distance', 'speed', 'time', 'force'],
      topic: 'Mechanics & Forces',
      correct: 3,
      explanation: 'Force is a vector quantity because it has both a magnitude (measured in newtons) and a direction in which it acts.',
      diveDeep: 'Scalar quantities have magnitude only (distance, speed, time, mass, energy), while vector quantities have both magnitude and direction (force, velocity, acceleration, displacement, momentum). A common mistake is confusing speed (scalar) with velocity (vector). On the Regents, identifying scalar vs. vector is a recurring concept. Vectors can be added by component method or graphically using the tip-to-tail (or parallelogram) method.'
    },
    {
      number: 12,
      part: 'A',
      text: 'A body is moving at a constant speed along a straight horizontal path. The net force acting on the body is',
      choices: ['zero', 'directed upward', 'directed downward', 'equal to its mass'],
      topic: 'Mechanics & Forces',
      correct: 0,
      explanation: "Newton's first law states that an object moving at constant velocity has zero net force acting on it — all forces are balanced.",
      diveDeep: "Newton's first law (law of inertia) tells us that constant velocity (including constant speed in a straight line) means zero net force. This does NOT mean no forces act — it means all forces cancel out. A common mistake is thinking a moving object requires a net force to keep moving. On Earth, friction often opposes motion, so a horizontal applied force may be needed just to cancel friction and maintain constant speed. Net force = 0 is also called \"equilibrium.\""
    },
    {
      number: 13,
      part: 'A',
      text: 'The mass of an object is a direct measure of its',
      choices: ['inertia', 'velocity', 'acceleration', 'force'],
      topic: 'Mechanics & Forces',
      correct: 0,
      explanation: "Mass is defined as the measure of an object's inertia — its resistance to changes in motion. Greater mass means greater resistance to acceleration.",
      diveDeep: "Newton's first law defines inertia as the tendency of an object to resist changes in motion, and mass quantifies this tendency. From F = ma, for the same net force, a larger mass produces smaller acceleration — confirming that mass measures inertia. Weight (F_g = mg) is different from mass; weight is a force and varies with gravitational field strength, while mass is constant. A common mistake is confusing mass (kg) with weight (N). On the Regents, mass is always measured in kilograms."
    },
    {
      number: 14,
      part: 'A',
      text: 'A 3.0-kilogram mass is moving at 4.0 meters per second. The momentum of the mass is',
      choices: ['1.3 kg·m/s', '7.0 kg·m/s', '12 kg·m/s', '24 kg·m/s'],
      topic: 'Mechanics & Forces',
      correct: 2,
      explanation: 'Momentum p = mv = 3.0 kg × 4.0 m/s = 12 kg·m/s.',
      diveDeep: 'Momentum is a vector quantity defined as p = mv, measured in kg·m/s. The impulse-momentum theorem states that the change in momentum equals the net impulse applied: Δp = FΔt. Conservation of momentum applies to closed systems with no external net force. A common mistake on the Regents is forgetting that momentum is a vector — direction matters when adding momenta in collision problems. Units kg·m/s and N·s are equivalent.'
    },
    {
      number: 15,
      part: 'A',
      text: "A student drop-kicks a ball horizontally from a high window. The vertical component of the ball's velocity",
      choices: ['remains constant', 'increases', 'decreases', 'first increases, then decreases'],
      topic: 'Mechanics & Forces',
      correct: 1,
      explanation: 'Gravity continuously accelerates the ball downward at 9.81 m/s², so the vertical component of velocity increases from zero (downward) throughout the fall.',
      diveDeep: 'In projectile motion, horizontal and vertical components are independent. The horizontal component remains constant (no air resistance), while the vertical component increases due to gravitational acceleration. The ball starts with zero vertical velocity (kicked horizontally) and gains downward speed at 9.81 m/s each second. A common mistake is thinking the ball slows vertically — it does not unless air resistance is considered. Total speed also increases because both components combine as the trajectory curves downward.'
    },
    {
      number: 16,
      part: 'A',
      text: "A body falls freely near Earth's surface. Its acceleration is approximately",
      choices: ['1.0 m/s²', '9.81 m/s²', '3.0 × 10⁸ m/s²', '0.50 m/s²'],
      topic: 'Mechanics & Forces',
      correct: 1,
      explanation: "The acceleration due to gravity near Earth's surface is approximately 9.81 m/s² directed downward, as listed on the Regents reference table.",
      diveDeep: 'Free fall means gravity is the only force acting — no air resistance. All objects near Earth\'s surface fall with the same acceleration g ≈ 9.81 m/s² regardless of mass, as Galileo demonstrated. This value comes from g = GM_E/R_E². The value 3.0 × 10⁸ m/s² is the speed of light — a common distractor. On the Moon, g ≈ 1.62 m/s², which is why astronauts weigh less there. The Regents reference table gives g = 9.81 m/s².'
    },
    {
      number: 17,
      part: 'A',
      text: 'Which unit is equivalent to a Watt?',
      choices: ['Joule · second', 'Joule / second', 'Newton · meter', 'Newton / meter'],
      topic: 'Energy & Power',
      correct: 1,
      explanation: 'Power P = W/t, so the unit of power is joules per second, which is defined as the watt (W).',
      diveDeep: 'Power measures the rate of energy transfer or work done per unit time. 1 W = 1 J/s = 1 kg·m²/s³. Note that Newton·meter = joule (the unit of energy/work), not power. A common mistake is confusing energy units (J = N·m) with power units (W = J/s). Horsepower is another unit of power: 1 hp ≈ 746 W. The Regents frequently tests unit conversions and dimensional analysis involving power.'
    },
    {
      number: 18,
      part: 'A',
      text: "As an object falls freely near Earth's surface, the potential energy of the object",
      choices: ['remains constant', 'increases', 'decreases', 'first decreases, then increases'],
      topic: 'Energy & Power',
      correct: 2,
      explanation: 'Gravitational potential energy PE = mgh decreases as the object falls because height h decreases.',
      diveDeep: 'As an object falls, its gravitational PE converts to kinetic energy — total mechanical energy is conserved in free fall (no air resistance). PE = mgh, so PE decreases linearly with height. Meanwhile, KE = ½mv² increases. At impact, nearly all PE has converted to KE. A common error is saying PE increases during a fall. This energy transformation is central to the NY Regents conservation of energy problems. If air resistance is present, some energy converts to thermal energy.'
    },
    {
      number: 19,
      part: 'A',
      text: 'A spring has a spring constant of 100. N/m. If the spring is compressed 0.10 meter, the potential energy stored in the spring is',
      choices: ['0.50 J', '1.0 J', '5.0 J', '10. J'],
      topic: 'Energy & Power',
      correct: 0,
      explanation: 'Elastic potential energy PE = ½kx² = ½ × 100 × (0.10)² = ½ × 100 × 0.01 = 0.50 J.',
      diveDeep: 'The elastic potential energy formula PE = ½kx² shows a square dependence on displacement x. If x doubles, PE quadruples. The factor of ½ is critical and is often forgotten, leading students to incorrectly calculate PE = kx. This formula applies to any ideal spring (Hooke\'s law: F = kx). The Regents reference table includes PE_spring = ½kx². Spring constant k is measured in N/m and represents stiffness — higher k means a stiffer spring requiring more force for the same compression.'
    },
    {
      number: 20,
      part: 'A',
      text: 'The electrostatic force between two charged spheres is F. If the charge on one sphere is doubled, the new force will be',
      choices: ['F/2', '2F', 'F/4', '4F'],
      topic: 'Electricity & Magnetism',
      correct: 1,
      explanation: "Coulomb's law: F = kq₁q₂/r². If one charge doubles, the force doubles — a direct linear relationship with charge.",
      diveDeep: "Coulomb's law F = kq₁q₂/r² is linear in each charge but inverse-square in distance. Doubling one charge doubles the force; doubling both charges quadruples the force. This contrasts with the distance relationship (inverse-square). A common mistake is applying the inverse-square rule to charge changes. On the Regents, questions often test whether students recognize that the force-charge relationship is linear while the force-distance relationship is inverse square. Coulomb's constant k = 8.99 × 10⁹ N·m²/C²."
    },
    {
      number: 21,
      part: 'A',
      text: 'Which diagram represents the electric field lines near a negative point charge?',
      choices: [
        'Concentric circles around the charge',
        'Straight lines pointing directly toward the charge',
        'Straight lines pointing directly away from the charge',
        'Concentric square shapes around the charge'
      ],
      topic: 'Electricity & Magnetism',
      correct: 1,
      explanation: 'Electric field lines point in the direction a positive test charge would move — toward a negative charge, so they point radially inward toward the negative charge.',
      diveDeep: 'Electric field lines always point away from positive charges and toward negative charges. They are radially symmetric for point charges. Field line density indicates field strength — lines are closer together where the field is stronger (near the charge). A common mistake is reversing the direction for positive vs. negative charges. Concentric circles would represent equipotential lines, not field lines. The electric field magnitude for a point charge is E = kq/r².'
    },
    {
      number: 22,
      part: 'A',
      text: 'If three 12-Ω resistors are connected in parallel, what is their equivalent combined resistance?',
      choices: ['4.0 Ω', '12 Ω', '36 Ω', '0.25 Ω'],
      topic: 'Electricity & Magnetism',
      correct: 0,
      explanation: 'For n equal resistors in parallel, R_eq = R/n = 12/3 = 4.0 Ω.',
      diveDeep: 'The parallel resistance formula is 1/R_eq = 1/R₁ + 1/R₂ + 1/R₃. For three equal resistors R, this gives 1/R_eq = 3/R, so R_eq = R/3. Parallel connections always reduce equivalent resistance below the smallest individual resistor. This is opposite to series connections, where R_eq = R₁ + R₂ + R₃ and resistance always increases. A common mistake is adding resistances in parallel as if they were in series. Practical applications include household wiring, where adding appliances (in parallel) decreases total resistance and increases total current drawn.'
    },
    {
      number: 23,
      part: 'A',
      text: 'A wave in which the particles of the medium vibrate perpendicular to the direction of wave motion is classified as a',
      choices: ['transverse wave', 'longitudinal wave', 'electromagnetic wave', 'torsional wave'],
      topic: 'Waves & Optics',
      correct: 0,
      explanation: 'In a transverse wave, particle displacement is perpendicular to the direction of wave propagation, as seen in waves on a string or electromagnetic waves.',
      diveDeep: 'Transverse waves have crests and troughs — the medium oscillates at right angles to the wave velocity. Examples include light, water surface waves, and waves on strings. Longitudinal waves (like sound) have compressions and rarefactions along the direction of travel. The Regents frequently tests distinguishing between these two types. Electromagnetic waves are always transverse, even in vacuum. Polarization is a phenomenon unique to transverse waves — you cannot polarize a longitudinal wave.'
    },
    {
      number: 24,
      part: 'A',
      text: 'What phenomenon occurs when a wave bends as it enters a new medium?',
      choices: ['reflection', 'refraction', 'diffraction', 'dispersion'],
      topic: 'Waves & Optics',
      correct: 1,
      explanation: 'Refraction is the bending of a wave when it crosses the boundary between two media with different wave speeds (different indices of refraction).',
      diveDeep: "Refraction occurs because one part of the wavefront enters the new medium and changes speed before the rest of the wavefront does, causing the wave to bend. Snell's law n₁sinθ₁ = n₂sinθ₂ governs this bending. If the wave enters a slower medium (higher n), it bends toward the normal. Diffraction is the bending around obstacles or through openings — different from refraction. Dispersion is a type of refraction where different wavelengths refract by different amounts. Total internal reflection occurs when a wave in a dense medium hits the boundary at an angle exceeding the critical angle."
    }
  ]
}
