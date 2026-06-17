export const STRATEGIES = {
  'physics-kin': { // Kinematics & Projectile Motion (covers the Mechanics split)
    mentalPrep: [
      'Locate page 6 of the Physics Reference Table (PRT) for standard motion equations.',
      'Remember that gravitational acceleration (g) is 9.81 m/s² on Earth (PRT page 1).',
      'Double check vector representations: forces and velocities always have directions.'
    ],
    answeringTechniques: [
      'Sketch a quick Free-Body Diagram (FBD) for all force-related problems.',
      'Check if the system is in "equilibrium" — if so, the net force is exactly zero.',
      'Identify initial variables (v_i, v_f, a, d, t) before selecting a kinematic equation.'
    ],
    guessingStrategy: [
      'Mass does not affect acceleration in a free fall (neglecting air resistance).',
      'For projectile motions, horizontal velocity is constant; only vertical velocity changes.',
      'If given mass and speed, the momentum is always a simple linear multiplication (p=mv).'
    ],
    processOfElimination: [
      'Eliminate any speeds that exceed the speed of light (3.00 × 10^8 m/s).',
      'Toss out negative answers for scalar magnitudes like distance or mass.',
      'Reject options that mistake mass (kilograms) for weight (Newtons).'
    ],
    timeManagement: [
      'Spend 1 minute drawing vector components for angled pulls to prevent simple math slips.',
      'If stuck on projectile angles, skip and return after standard linear motion questions.',
      'Use approximately 45 seconds on conceptual definition questions to save time for arithmetic.'
    ]
  },
  'physics-u2': {
    mentalPrep: [
      'Find the work and energy equations on page 6 of the PRT.',
      'Remember that conservative forces preserve total mechanical energy (PE + KE).',
      'Recall the unit conversion: 1 Watt is equal to 1 Joule per second (J/s).'
    ],
    answeringTechniques: [
      'Use the formula PE_s = 1/2 k x² for springs, and remember x must be in meters.',
      'For work calculations, make sure the force and displacement are in the same direction.',
      'Power can be calculated as Force times average velocity (P = Fv).'
    ],
    guessingStrategy: [
      'Mechanical energy is conserved: potential energy lost always equals kinetic energy gained.',
      'If height is halved, potential energy is also halved (PE = mgh is linear).',
      'Frictional forces always convert mechanical energy into non-useful thermal energy.'
    ],
    processOfElimination: [
      'Eliminate power options that are labeled in Joules instead of Watts.',
      'Throw out negative kinetic energy values — KE is always positive.',
      'Reject answers showing kinetic energy changing when velocity is constant.'
    ],
    timeManagement: [
      'Write down variables for Spring calculations carefully — squaring decimal displacements takes time.',
      'Spend at most 2 minutes on power equations; if stuck, review page 6 of the PRT.',
      'Keep conceptual energy conservation questions under 30 seconds.'
    ]
  },
  'physics-cir': { // Circuits (covers the Electricity & Magnetism split)
    mentalPrep: [
      'Find the electricity equations on page 4 of the PRT.',
      'Note the charge of an electron on page 1 of the PRT (1.60 × 10^-19 Coulombs).',
      'Locate resistivity variables on the copper and wire table on page 4.'
    ],
    answeringTechniques: [
      'In parallel circuits, voltage is identical across all loops.',
      'In series circuits, current is identical through all resistors.',
      'Apply Coulomb\'s inverse-square law: if distance doubles, force drops to one-fourth.'
    ],
    guessingStrategy: [
      'Total resistance in parallel is always smaller than the smallest individual resistor.',
      'Concentric circles around current-carrying wires represent magnetic fields.',
      'Electric fields flow away from positive charges and toward negative charges.'
    ],
    processOfElimination: [
      'Eliminate any resistance results that are smaller than components in a series circuit.',
      'Discard magnetic field directions that flow South-to-North externally.',
      'Reject fractional electron charges that do not divide evenly by 1.60 × 10^-19 C.'
    ],
    timeManagement: [
      'Parallel resistor computations require reciprocating decimals; write steps down carefully.',
      'Take 90 seconds to trace loops on complex circuit diagrams before answering.',
      'Spend under 40 seconds on field line conceptual diagrams.'
    ]
  },
  'physics-wav': { // Waves & Sound (covers the Waves & Optics split)
    mentalPrep: [
      'Open PRT page 5 for wave and optics equations.',
      'Review electromagnetic spectrum frequency ranges on page 5.',
      'Recall that sound is a longitudinal wave, whereas light is transverse.'
    ],
    answeringTechniques: [
      'Use Snell\'s law: light bending is directly related to index of refraction shifts.',
      'Calculate absolute index of refraction as n = c/v, where c = 3.00 × 10^8 m/s.',
      'Identify diffraction when waves squeeze through slits or bend around barriers.'
    ],
    guessingStrategy: [
      'Light slowing down when entering a denser medium always bends toward the normal line.',
      'EM waves (like light and X-rays) can travel through vacuums; sound cannot.',
      'Frequency never changes when a wave changes media — only speed and wavelength change.'
    ],
    processOfElimination: [
      'Toss out any refracted speeds that exceed 3.00 × 10^8 m/s.',
      'Eliminate normal lines that are not drawn perpendicular to the boundary.',
      'Reject options claiming sound speed is faster than light speed.'
    ],
    timeManagement: [
      'Spend 1 minute carefully comparing electromagnetic index entries on PRT page 2.',
      'Write down division steps for n = c/v to avoid shifting decimal exponents.',
      'Complete definition-based longitudinal/transverse questions quickly.'
    ]
  },
  'physics-u5': {
    mentalPrep: [
      'Use PRT page 5 for modern physics and photon energy equations.',
      'Familiarize yourself with standard model tables and quark charges on page 5.',
      'Locate hydrogen energy level diagram levels on page 5.'
    ],
    answeringTechniques: [
      'Use E = hf to calculate photon energy, where h = 6.63 × 10^-34 J·s.',
      'Calculate quark configurations by adding fractional charges to match net particles.',
      'Electrons and neutrinos are leptons; protons and neutrons are baryons (hadrons).'
    ],
    guessingStrategy: [
      'A proton uud has charge 2/3 + 2/3 - 1/3 = +1; a neutron udd has 2/3 - 1/3 - 1/3 = 0.',
      'Energy level transitions going down emit light; going up absorbs light.',
      'All leptons are fundamental particles and contain no quarks.'
    ],
    processOfElimination: [
      'Eliminate any quark configurations that do not sum to integer charges.',
      'Discard energy options that fail to match differences between PRT levels.',
      'Reject answers showing leptons undergoing strong force interactions.'
    ],
    timeManagement: [
      'Planck equation multiplications have very small numbers; use exponents carefully.',
      'Spend 90 seconds checking the particle tables to be 100% sure of classification.',
      'Complete quark charge additions quickly on paper.'
    ]
  },

  'physics-sp': { // Formulas, Graphs & Diagrams (science practices)
    mentalPrep: [
      'The Physics Reference Table has every formula and constant — find the right equation, not the right memory.',
      'Slopes and areas carry meaning: distance–time slope = velocity; velocity–time slope = acceleration, area = displacement.',
      'For force problems, draw a free-body diagram first; the net (unbalanced) force sets the direction of acceleration.',
    ],
    answeringTechniques: [
      'List the givens with units, pick the reference-table formula that uses exactly those, then solve.',
      'Check units cancel to the answer\'s unit — a fast way to eliminate wrong choices.',
      'Vectors: add tip-to-tail or by components; never add a vector to a scalar.',
    ],
    guessingStrategy: [
      'Linear formula → doubling an input doubles the result; squared (KE ∝ v²) → it quadruples.',
      'Eliminate choices whose units do not match what the question asks for.',
    ],
    processOfElimination: [
      'Drop answers that confuse a vector with a scalar or reverse a proportionality.',
    ],
    timeManagement: [
      'Graph/diagram questions are fast once you know what slope/area means — bank time there.',
      'Multi-step calculations: write the formula, sub in units, compute — flag and return if it stalls.',
    ],
  }
}
