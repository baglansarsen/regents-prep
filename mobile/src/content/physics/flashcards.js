import { TOPICS } from './questions'

export const flashcards = [
  // Mechanics
  { topic: TOPICS.FORCES, term: 'Inertia', definition: 'The tendency of an object to resist changes in its state of motion, directly proportional to its mass.' },
  { topic: TOPICS.KINEMATICS, term: 'Vector', definition: 'A quantity that has both a magnitude and a direction (e.g., velocity, acceleration, force, momentum).' },
  { topic: TOPICS.KINEMATICS, term: 'Scalar', definition: 'A quantity that has magnitude only, without a direction (e.g., mass, time, distance, speed, energy).' },
  { topic: TOPICS.KINEMATICS, term: 'Acceleration', definition: 'The rate of change of velocity over time (a = Δv/t), measured in meters per second squared (m/s²).' },

  // Energy & Power
  { topic: TOPICS.ENERGY_AND_POWER, term: 'Joule', definition: 'The SI unit of work and energy, equivalent to a Newton·meter (N·m) or a Kilogram·meter squared per second squared.' },
  { topic: TOPICS.ENERGY_AND_POWER, term: 'Kinetic Energy', definition: 'The energy an object possesses due to its motion, calculated using KE = 1/2 * m * v².' },
  { topic: TOPICS.ENERGY_AND_POWER, term: 'Gravitational Potential Energy', definition: 'The energy stored in an object due to its position in a gravitational field, calculated using PE = mgh.' },
  { topic: TOPICS.ENERGY_AND_POWER, term: 'Power', definition: 'The rate at which work is done or energy is transferred over time, measured in Watts (W).' },

  // Electricity & Magnetism
  { topic: TOPICS.CIRCUITS, term: 'Ohm', definition: 'The unit of electrical resistance (Ω), representing the ratio of potential difference to current.' },
  { topic: TOPICS.ELECTROSTATICS, term: 'Coulomb', definition: 'The SI unit of electric charge (C), equivalent to the charge transported by a constant current of one Ampere in one second.' },
  { topic: TOPICS.CIRCUITS, term: 'Resistance', definition: 'The opposition that a material offers to the flow of electric current, dependent on resistivity, length, and area.' },
  { topic: TOPICS.ELECTROSTATICS, term: 'Magnetic Field', definition: 'A region around a magnetic material or a moving electric charge within which the force of magnetism acts.' },

  // Waves
  { topic: TOPICS.WAVES_SOUND, term: 'Diffraction', definition: 'The spreading of waves around obstacles, corners, or through small openings.' },
  { topic: TOPICS.LIGHT_OPTICS, term: 'Refraction', definition: 'The bending of a wave as it passes from one medium into another, caused by a change in its speed.' },
  { topic: TOPICS.WAVES_SOUND, term: 'Transverse Wave', definition: 'A wave in which the particles of the medium vibrate perpendicular to the direction of wave propagation.' },
  { topic: TOPICS.WAVES_SOUND, term: 'Longitudinal Wave', definition: 'A wave in which the particles of the medium vibrate parallel to the direction of wave propagation (e.g., sound).' },

  // Modern Physics
  { topic: TOPICS.MODERN_PHYSICS, term: 'Photon', definition: 'A quantum or discrete packet of electromagnetic energy, with energy proportional to its wave frequency.' },
  { topic: TOPICS.MODERN_PHYSICS, term: 'Quark', definition: 'A fundamental particle that makes up hadrons (such as protons and neutrons) and has fractional electric charge.' },
  { topic: TOPICS.MODERN_PHYSICS, term: 'Lepton', definition: 'A class of fundamental particles (such as electrons and neutrinos) that do not experience the strong nuclear force.' },
  { topic: TOPICS.MODERN_PHYSICS, term: 'Threshold Frequency', definition: 'The minimum frequency of incident light required to eject electrons from a metal surface in the photoelectric effect.' },

  // ── Formulas, Graphs & Diagrams (science practices) ──
  { topic: TOPICS.SCIENCE_PRACTICES, term: 'Physics Reference Table', definition: 'Holds every formula + constant you need — you are not expected to memorize them. Identify the right equation and the variables given before solving.' },
  { topic: TOPICS.SCIENCE_PRACTICES, term: 'Slope of a graph', definition: 'Slope carries meaning: on a distance–time graph slope = velocity; on a velocity–time graph slope = acceleration and area = displacement.' },
  { topic: TOPICS.SCIENCE_PRACTICES, term: 'Free-body diagram', definition: 'Draw every force acting ON the object as arrows from its center; the net (unbalanced) force sets the direction of acceleration.' },
  { topic: TOPICS.SCIENCE_PRACTICES, term: 'Vector vs. scalar', definition: 'Vectors have magnitude AND direction (add tip-to-tail / by components); scalars have magnitude only. Mismatching them is a classic trap.' },
  { topic: TOPICS.SCIENCE_PRACTICES, term: 'Units & significant figures', definition: 'Check that units cancel to the answer\'s unit, and keep sig figs consistent — a quick way to eliminate wrong choices.' },
]

export const FLASHCARD_TOPIC_LIST = Object.values(TOPICS)
