import { TOPICS } from './questions'

export const ACHIEVEMENTS = [
  {
    id: 'physics_mechanics_master',
    title: 'Galilean Pioneer',
    description: 'Master forces and motion in Physics mechanics',
    icon: '🏹',
    condition: s => s.topicsPassed?.has(TOPICS.KINEMATICS)
  },
  {
    id: 'physics_energy_master',
    title: 'Thermodynamic Titan',
    description: 'Master work, power, and conservation of energy',
    icon: '🔋',
    condition: s => s.topicsPassed?.has(TOPICS.ENERGY_AND_POWER)
  },
  {
    id: 'physics_electricity_master',
    title: 'Coulomb Commander',
    description: 'Master electrostatic fields and circuit loops',
    icon: '🔌',
    condition: s => s.topicsPassed?.has(TOPICS.CIRCUITS)
  },
  {
    id: 'physics_waves_master',
    title: 'Wavefront Explorer',
    description: 'Master light refraction and acoustic waves',
    icon: '🌊',
    condition: s => s.topicsPassed?.has(TOPICS.WAVES_SOUND)
  },
  {
    id: 'physics_modern_master',
    title: 'Quantum Leaper',
    description: 'Master quarks, standard model, and subatomic energy',
    icon: '🪐',
    condition: s => s.topicsPassed?.has(TOPICS.MODERN_PHYSICS)
  },
  {
    id: 'physics_perfect_quiz',
    title: 'Absolute Equilibrium',
    description: 'Score 100% on any Physics quiz',
    icon: '💯',
    condition: s => s.perfectScore
  },
  {
    id: 'physics_speed',
    title: 'Relativistic Velocity',
    description: 'Complete a Physics quiz without any timeouts',
    icon: '⚡',
    condition: s => s.noTimeouts
  },
  {
    id: 'physics_streak_5',
    title: 'Inertial Motion',
    description: 'Maintain a 5-day study streak with Physics',
    icon: '🔥',
    condition: s => (s.streak ?? 0) >= 5
  }
]
