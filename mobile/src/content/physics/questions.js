import physJun2025 from '../regents-exams/physics/june-2025'
import physJun2024 from '../regents-exams/physics/june-2024'
import physAug2024 from '../regents-exams/physics/august-2024'
import physJun2023 from '../regents-exams/physics/june-2023'

export const TOPICS = {
  MECHANICS: 'Mechanics & Forces',
  ENERGY_AND_POWER: 'Energy & Power',
  ELECTRICITY_AND_MAGNETISM: 'Electricity & Magnetism',
  WAVES: 'Waves & Optics',
  MODERN_PHYSICS: 'Modern Physics',
}

export const TOPIC_ICONS = {
  [TOPICS.MECHANICS]: '🏹',
  [TOPICS.ENERGY_AND_POWER]: '🔋',
  [TOPICS.ELECTRICITY_AND_MAGNETISM]: '🔌',
  [TOPICS.WAVES]: '🌊',
  [TOPICS.MODERN_PHYSICS]: '🪐',
}

export const questions = [
  // ── Mechanics & Forces (5 Questions) ───────────────────────────────────────
  {
    id: 301,
    topic: TOPICS.MECHANICS,
    text: 'A 2.0-kilogram mass is thrown vertically upward from the ground with an initial velocity of 19.6 meters per second. What is the maximum height reached by the mass? (Neglect air resistance)',
    choices: ['9.8 m', '19.6 m', '39.2 m', '78.4 m'],
    correct: 1,
    explanation: 'Using the kinematic equation v_f^2 = v_i^2 + 2ad: At maximum height, final velocity v_f = 0. Therefore, 0 = (19.6)^2 + 2(-9.81)d, which simplifies to 19.6d = 384.16, giving a distance d ≈ 19.6 meters.'
  },
  {
    id: 302,
    topic: TOPICS.MECHANICS,
    text: 'An object is sliding at constant speed across a horizontal wooden table. The net force acting on the object is',
    choices: ['zero', 'equal to the force of kinetic friction', 'equal to the normal force', 'directed in the direction of motion'],
    correct: 0,
    explanation: 'According to Newton\'s first law of motion, an object moving at a constant velocity (constant speed in a straight line) experiences zero acceleration. Therefore, the net force acting on it must be zero. The pushing force is exactly balanced by the frictional force.'
  },
  {
    id: 303,
    topic: TOPICS.MECHANICS,
    text: 'Which quantity is a vector quantity that has both magnitude and direction?',
    choices: ['mass', 'distance', 'momentum', 'kinetic energy'],
    correct: 2,
    explanation: 'Momentum is defined as the product of mass (scalar) and velocity (vector), making momentum a vector quantity. Mass, distance, and kinetic energy are all scalar quantities, which possess magnitude but lack direction.'
  },
  {
    id: 304,
    topic: TOPICS.MECHANICS,
    text: 'A student pulls a 10.0-kilogram sled across flat snow with a force of 30.0 Newtons directed at an angle of 30.0° above the horizontal. What is the horizontal component of the pulling force?',
    choices: ['15.0 N', '26.0 N', '30.0 N', '100.0 N'],
    correct: 1,
    explanation: 'The horizontal component of a force vector is given by F_x = F * cos(θ). Here, F_x = 30.0 N * cos(30.0°) = 30.0 N * 0.866 = 26.0 Newtons. The vertical component would be F_y = F * sin(θ) = 15.0 Newtons.'
  },
  {
    id: 305,
    topic: TOPICS.MECHANICS,
    text: 'Compared to the inertia of a 1.0-kilogram mass moving at 10.0 meters per second, the inertia of a 2.0-kilogram mass moving at 5.0 meters per second is',
    choices: ['one-half as great', 'twice as great', 'the same', 'four times as great'],
    correct: 1,
    explanation: 'Inertia is a fundamental property of matter that depends solely on an object\'s mass. It is independent of speed or velocity. Therefore, a 2.0-kilogram mass has exactly twice the inertia of a 1.0-kilogram mass, regardless of their respective speeds.'
  },

  // ── Energy & Power (5 Questions) ──────────────────────────────────────────
  {
    id: 306,
    topic: TOPICS.ENERGY_AND_POWER,
    text: 'A 60.0-kilogram student runs up a flight of stairs that is 5.00 meters high in 4.00 seconds. What is the average power developed by the student?',
    choices: ['75.0 W', '736 W', '120 W', '2940 W'],
    correct: 1,
    explanation: 'Power is defined as work done per unit time: P = W / t. The work done is equal to the gravitational potential energy gained: W = mgh = (60.0 kg)(9.81 m/s^2)(5.00 m) = 2943 Joules. Power = 2943 J / 4.00 s ≈ 736 Watts.'
  },
  {
    id: 307,
    topic: TOPICS.ENERGY_AND_POWER,
    text: 'As a freely falling object nears the ground, its total mechanical energy',
    choices: ['decreases', 'increases', 'remains the same', 'first decreases and then increases'],
    correct: 2,
    explanation: 'In the absence of air resistance, the total mechanical energy (the sum of potential and kinetic energy, E_t = PE + KE) of a freely falling system remains constant. As the object falls, its potential energy is converted entirely into kinetic energy, but the sum remains the same.'
  },
  {
    id: 308,
    topic: TOPICS.ENERGY_AND_POWER,
    text: 'A spring with a spring constant of 100. Newtons per meter is compressed 0.20 meter. What is the potential energy stored in the compressed spring?',
    choices: ['2.0 J', '4.0 J', '10. J', '20. J'],
    correct: 0,
    explanation: 'The elastic potential energy stored in a spring is calculated using PE_s = 1/2 * k * x^2. Here, PE_s = 0.5 * (100. N/m) * (0.20 m)^2 = 50 * 0.04 = 2.0 Joules.'
  },
  {
    id: 309,
    topic: TOPICS.ENERGY_AND_POWER,
    text: 'Which unit is equivalent to a Joule?',
    choices: ['Newton · meter', 'Newton / meter', 'Watt · second^2', 'Kilogram · meter / second'],
    correct: 0,
    explanation: 'Work is force times distance (W = F * d), so work is measured in Newtons times meters (N·m). Since work and energy are both measured in Joules, a Joule is equivalent to a Newton·meter (N·m).'
  },
  {
    id: 310,
    topic: TOPICS.ENERGY_AND_POWER,
    text: 'An object is sliding down a rough inclined plane at constant speed. What is happening to the total mechanical energy of the object?',
    choices: ['It is increasing.', 'It is decreasing.', 'It remains the same.', 'It is converted entirely into potential energy.'],
    correct: 1,
    explanation: 'Since the speed is constant, the kinetic energy (KE) remains constant. However, as the object slides down, its height decreases, meaning its potential energy (PE) decreases. Since PE decreases while KE is constant, the total mechanical energy (PE + KE) decreases, being converted into thermal energy due to friction.'
  },

  // ── Electricity & Magnetism (5 Questions) ───────────────────────────────
  {
    id: 311,
    topic: TOPICS.ELECTRICITY_AND_MAGNETISM,
    text: 'What is the electrical resistance of a copper wire if a current of 2.0 Amperes flows through it when connected to a 12-Volt battery?',
    choices: ['6.0 Ω', '24 Ω', '0.17 Ω', '4.0 Ω'],
    correct: 0,
    explanation: 'According to Ohm\'s law, resistance is defined as R = V / I. Using the given values: R = 12 V / 2.0 A = 6.0 Ohms (Ω).'
  },
  {
    id: 312,
    topic: TOPICS.ELECTRICITY_AND_MAGNETISM,
    text: 'Two identical small metal spheres carry charges of +3.0 × 10^-6 Coulomb and -1.0 × 10^-6 Coulomb, respectively. The spheres are brought into contact and then separated. What is the final charge on each sphere?',
    choices: ['+1.0 × 10^-6 C', '+2.0 × 10^-6 C', '+3.0 × 10^-6 C', '0 C'],
    correct: 0,
    explanation: 'When identical conducting spheres are brought into contact, charge distributes evenly. The total charge is (+3.0 - 1.0) × 10^-6 C = +2.0 × 10^-6 C. Upon separation, each sphere receives half of the total: +1.0 × 10^-6 Coulomb.'
  },
  {
    id: 313,
    topic: TOPICS.ELECTRICITY_AND_MAGNETISM,
    text: 'An electrostatic force of 4.0 Newtons exists between two charges separated by a distance of 1.0 meter. If the distance between the charges is doubled to 2.0 meters, the magnitude of the electrostatic force becomes',
    choices: ['1.0 N', '2.0 N', '8.0 N', '16 N'],
    correct: 0,
    explanation: 'According to Coulomb\'s law, the electrostatic force is inversely proportional to the square of the distance between the charges (F ∝ 1/r^2). If the distance is doubled (×2), the force becomes 1/2^2 = 1/4th of the original value. 4.0 N * 1/4 = 1.0 Newton.'
  },
  {
    id: 314,
    topic: TOPICS.ELECTRICITY_AND_MAGNETISM,
    text: 'Which diagram represents the magnetic field lines near a bar magnet?',
    choices: ['Lines radiating straight out from both ends', 'Lines curving from the South pole to the North pole externally', 'Lines curving from the North pole to the South pole externally', 'Circular concentric lines centered on the magnet\'s midpoint'],
    correct: 2,
    explanation: 'Magnetic field lines are drawn to represent the direction a north pole of a test compass would point. They emerge from the North pole of a magnet and curve around to enter the South pole externally.'
  },
  {
    id: 315,
    topic: TOPICS.ELECTRICITY_AND_MAGNETISM,
    text: 'If three 6.0-Ohm resistors are connected in parallel, what is their equivalent combined resistance?',
    choices: ['0.50 Ω', '2.0 Ω', '18 Ω', '6.0 Ω'],
    correct: 1,
    explanation: 'For parallel resistors, the equivalent resistance R_eq is given by 1/R_eq = 1/R1 + 1/R2 + 1/R3 = 1/6 + 1/6 + 1/6 = 3/6 = 1/2. Therefore, R_eq = 2.0 Ohms. The equivalent resistance of parallel resistors is always smaller than the smallest individual resistor.'
  },

  // ── Waves & Optics (5 Questions) ──────────────────────────────────────────
  {
    id: 316,
    topic: TOPICS.WAVES,
    text: 'A sound wave has a frequency of 440 Hertz and travels through air at 340 meters per second. What is the wavelength of the sound wave?',
    choices: ['0.77 m', '1.3 m', '1.5 × 10^5 m', '1.5 m'],
    correct: 0,
    explanation: 'Using the wave equation v = f * λ: Wavelength λ = v / f = 340 m/s / 440 Hz ≈ 0.773 meters.'
  },
  {
    id: 317,
    topic: TOPICS.WAVES,
    text: 'A light ray in air enters a block of crown glass (index of refraction = 1.52) at an angle of incidence of 30.0°. As the light enters the glass, it',
    choices: ['speeds up and bends toward the normal', 'slows down and bends toward the normal', 'speeds up and bends away from the normal', 'slows down and bends away from the normal'],
    correct: 1,
    explanation: 'Crown glass has a higher index of refraction than air (n_glass = 1.52 > n_air = 1.00). When entering a more dense medium with a higher refractive index, light slows down and bends toward the normal line (Snell\'s law).'
  },
  {
    id: 318,
    topic: TOPICS.WAVES,
    text: 'The absolute index of refraction of a medium is 2.00. What is the speed of light in this medium? (Speed of light in a vacuum c = 3.00 × 10^8 m/s)',
    choices: ['1.50 × 10^8 m/s', '3.00 × 10^8 m/s', '6.00 × 10^8 m/s', '2.00 × 10^8 m/s'],
    correct: 0,
    explanation: 'The index of refraction is defined as n = c / v. Re-arranging for velocity: v = c / n = (3.00 × 10^8 m/s) / 2.00 = 1.50 × 10^8 meters per second.'
  },
  {
    id: 319,
    topic: TOPICS.WAVES,
    text: 'Which wave phenomenon occurs when a wave bends around the edges of an obstacle or spreads through a narrow opening?',
    choices: ['reflection', 'refraction', 'dispersion', 'diffraction'],
    correct: 3,
    explanation: 'Diffraction is the bending and spreading of waves around obstacles or through small openings. Reflection is bouncing back, refraction is bending due to speed changes between media, and dispersion is the separation of white light into its component colors.'
  },
  {
    id: 320,
    topic: TOPICS.WAVES,
    text: 'What type of wave requires a physical medium to propagate and cannot travel through a vacuum?',
    choices: ['sound wave', 'light wave', 'radio wave', 'X-ray wave'],
    correct: 0,
    explanation: 'Sound waves are mechanical longitudinal waves, which propagate via particle collisions and require a physical medium. Electromagnetic waves (light, radio, X-rays) do not require a medium and can travel through a vacuum.'
  },

  // ── Modern Physics (5 Questions) ──────────────────────────────────────────
  {
    id: 321,
    topic: TOPICS.MODERN_PHYSICS,
    text: 'What is the energy of a photon of green light with a frequency of 6.00 × 10^14 Hertz? (Planck\'s constant h = 6.63 × 10^-34 J·s)',
    choices: ['1.10 × 10^-48 J', '3.98 × 10^-19 J', '9.05 × 10^-20 J', '4.40 × 10^-19 J'],
    correct: 1,
    explanation: 'Using Planck\'s equation E = h * f: E = (6.63 × 10^-34 J·s) * (6.00 × 10^14 Hz) = 3.978 × 10^-19 Joules.'
  },
  {
    id: 322,
    topic: TOPICS.MODERN_PHYSICS,
    text: 'A proton is composed of which combination of quarks?',
    choices: ['up, up, down (uud)', 'up, down, down (udd)', 'up, up, up (uuu)', 'down, down, down (ddd)'],
    correct: 0,
    explanation: 'An up quark (u) has a charge of +2/3, and a down quark (d) has a charge of -1/3. A proton has a net charge of +1, which corresponds to up + up + down (uud) since 2/3 + 2/3 - 1/3 = +3/3 = +1.'
  },
  {
    id: 323,
    topic: TOPICS.MODERN_PHYSICS,
    text: 'A neutron is composed of which combination of quarks?',
    choices: ['up, up, down (uud)', 'up, down, down (udd)', 'up, up, up (uuu)', 'down, down, down (ddd)'],
    correct: 1,
    explanation: 'An up quark has a charge of +2/3 and a down quark has a charge of -1/3. A neutron is neutral (charge of 0). The combination up + down + down (udd) gives 2/3 - 1/3 - 1/3 = 0, which corresponds to a neutron.'
  },
  {
    id: 324,
    topic: TOPICS.MODERN_PHYSICS,
    text: 'According to the Standard Model of Particle Physics, electrons are classified as',
    choices: ['baryons', 'mesons', 'quarks', 'leptons'],
    correct: 3,
    explanation: 'Electrons are fundamental particles that do not experience the strong nuclear force and are classified as leptons. Baryons and mesons are composite particles (hadrons) made of quarks, whereas quarks are different fundamental particles.'
  },
  {
    id: 325,
    topic: TOPICS.MODERN_PHYSICS,
    text: 'If a hydrogen atom undergoes a transition from the n = 3 energy level to the n = 2 energy level, a photon is emitted. What is the energy of this emitted photon? (E3 = -1.51 eV, E2 = -3.40 eV)',
    choices: ['1.89 eV', '4.91 eV', '1.51 eV', '3.40 eV'],
    correct: 0,
    explanation: 'The energy of the emitted photon is equal to the difference in energy levels: E_photon = E_initial - E_final = -1.51 eV - (-3.40 eV) = 1.89 electron-Volts (eV).'
  }
]

// Dynamically distribute past exam questions into topics
const PHYS_EXAMS = [physJun2025, physJun2024, physAug2024, physJun2023]
let physNextId = 400
PHYS_EXAMS.forEach((exam) => {
  if (!exam || !exam.questions) return
  exam.questions.forEach((q) => {
    questions.push({
      id: physNextId++,
      topic: q.topic, // Maps perfectly to existing 'Mechanics & Forces', 'Energy & Power', etc.
      text: q.text,
      choices: q.choices,
      correct: q.correct,
      explanation: `From the ${exam.session} ${exam.year} Physics Regents Exam. Part ${q.part}, Question ${q.number}.`,
      context: q.context,
      image: q.image,
    })
  })
})

export function getByTopic(topic) {
  return questions.filter(q => q.topic === topic)
}

export function getContextual() {
  return questions.filter(q => q.context)
}

export function buildDiagnosticSet() {
  // Get 3 questions from each topic
  return Object.values(TOPICS).flatMap(topic => {
    const pool = getByTopic(topic)
    return pool.sort(() => Math.random() - 0.5).slice(0, 3)
  })
}

export function shuffled(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}
