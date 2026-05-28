// ─── Pet definitions ──────────────────────────────────────────────────────────
export const PETS = [
  {
    id:          'axolotl',
    emoji:       '🦎',
    name:        'Axolotl',
    personality: 'Friendly & encouraging',
    tagline:     'Believes in you unconditionally 💗',
    idleAnim:    'float',       // translateY ±8
    defaultName: 'Mochi',
  },
  {
    id:          'fox',
    emoji:       '🦊',
    name:        'Fox',
    personality: 'Sleek & focused',
    tagline:     'Sharp mind, sharper study habits 🔥',
    idleAnim:    'lean',        // rotateZ ±3°
    defaultName: 'Nova',
  },
  {
    id:          'capybara',
    emoji:       '🦫',
    name:        'Capybara',
    personality: 'Chill & beloved',
    tagline:     'Calm is the new productive 🌿',
    idleAnim:    'pulse',       // scale 1→0.97
    defaultName: 'Biscuit',
  },
  {
    id:          'voidCat',
    emoji:       '🐱',
    name:        'Void Cat',
    personality: 'Chaotic good',
    tagline:     'The void judges your study habits 🌑',
    idleAnim:    'glitch',      // opacity flicker
    defaultName: 'Shadow',
  },
]

// ─── Default pet names pool ───────────────────────────────────────────────────
export const DEFAULT_NAMES = [
  'Mochi', 'Nova', 'Biscuit', 'Cosmo', 'Pixel',
  'Waffles', 'Ori', 'Lumi', 'Pebble', 'Dashi',
]

// ─── Evolution thresholds (total XP) ─────────────────────────────────────────
export const EVOLUTION_THRESHOLDS = [0, 500, 2000, 5000]
export const STAGE_NAMES = ['', 'Baby', 'Teen', 'Adult', 'Legend']
export const STAGE_OVERLAYS = {
  1: null,
  2: '👓',   // auto-gains glasses
  3: '🌟',   // glowing
  4: '👑',   // legendary
}

export function stageForXP(xp) {
  for (let i = EVOLUTION_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= EVOLUTION_THRESHOLDS[i]) return i + 1
  }
  return 1
}

// ─── Food items ───────────────────────────────────────────────────────────────
export const FOOD_ITEMS = [
  {
    id:           'apple',
    icon:         '🍎',
    name:         'Apple',
    desc:         'A crisp apple. +20 hunger.',
    cost:         5,
    accent:       '#EF4444',
    dark:         '#B91C1C',
    hungerRestore: 20,
  },
  {
    id:           'ramen',
    icon:         '🍜',
    name:         'Ramen Bowl',
    desc:         'A hot bowl of ramen. +50 hunger.',
    cost:         12,
    accent:       '#F97316',
    dark:         '#C2410C',
    hungerRestore: 50,
  },
  {
    id:           'sushi',
    icon:         '🍣',
    name:         'Sushi Plate',
    desc:         'A premium sushi set. +80 hunger.',
    cost:         20,
    accent:       '#EC4899',
    dark:         '#BE185D',
    hungerRestore: 80,
  },
  {
    id:           'mystery',
    icon:         '🎁',
    name:         'Mystery Snack',
    desc:         'Random +30–100 hunger. Will it be amazing?',
    cost:         8,
    accent:       '#8B5CF6',
    dark:         '#6D28D9',
    hungerRestore: null,   // computed at feed time: random 30–100
  },
]

// ─── Happiness items ──────────────────────────────────────────────────────────
export const HAPPINESS_ITEMS = [
  {
    id:                'toyBall',
    icon:              '⚽',
    name:              'Toy Ball',
    desc:              'Play with your pet! +20 happiness.',
    cost:              8,
    accent:            '#10B981',
    dark:              '#065F46',
    happinessRestore:  20,
    reaction:          'happy_dance',
  },
  {
    id:                'miniBook',
    icon:              '📗',
    name:              'Mini Book',
    desc:              'Your pet loves to study too. +30 happiness.',
    cost:              10,
    accent:            '#3B82F6',
    dark:              '#1D4ED8',
    happinessRestore:  30,
    reaction:          'cheer',
  },
  {
    id:                'partyHat',
    icon:              '🎉',
    name:              'Party Hat',
    desc:              'Triggers a confetti moment. +40 happiness!',
    cost:              15,
    accent:            '#F59E0B',
    dark:              '#B45309',
    happinessRestore:  40,
    reaction:          'celebrate',
  },
]

// ─── Cosmetics ────────────────────────────────────────────────────────────────
export const COSMETICS = [
  {
    id:     'graduationCap',
    icon:   '🎓',
    name:   'Graduation Cap',
    desc:   'Academic flex. Sits on top of your pet.',
    cost:   80,
    accent: '#6366F1',
    dark:   '#4338CA',
  },
  {
    id:     'tinyBackpack',
    icon:   '🎒',
    name:   'Tiny Backpack',
    desc:   'Always ready to study.',
    cost:   60,
    accent: '#14B8A6',
    dark:   '#0F766E',
  },
  {
    id:     'glowAura',
    icon:   '✨',
    name:   'Glow Aura',
    desc:   'Rare. Your pet radiates pure energy.',
    cost:   150,
    accent: '#F59E0B',
    dark:   '#B45309',
    rare:   true,
  },
]

export const ALL_SHOP_ITEMS = [...FOOD_ITEMS, ...HAPPINESS_ITEMS, ...COSMETICS]

// ─── Personality message pools ────────────────────────────────────────────────
// Placeholders: {name}, {streak}, {daysSince}, {stage}, {stageName}
export const PET_MESSAGES = {
  axolotl: [
    'You\'ve got this, {name}! Every question is one step closer. 🩷',
    'I\'m so proud of your {streak}-day streak! Let\'s keep it going! 🌊',
    'AP exams are coming — but we\'re going to be ready together. 🦎',
    'You haven\'t studied in {daysSince} day(s). I miss you... 🥹',
    'Stage {stage}! Look how far we\'ve come together! ✨',
    'Wrong answers are just right answers in training. Keep going! 💪',
    'Every FRQ you write makes me float with joy. 🌊',
    'Today\'s study session is going to be the best one yet! 🎉',
    'You\'re a {stageName} — and I believe every bit of it. 🩷',
    'Regenerating abilities... just like me, you bounce back stronger! 🦎',
    'Don\'t forget: rest is part of the process too. But also, study. 😅',
    'Your dedication gives me life (literally — please feed me 🍎)',
    'Regents season is our season. Let\'s dominate. 🌊',
    'I\'ve been watching you grow. {streak} days straight? Legendary.',
    'One more quiz and we both feel better. Promise. 💗',
  ],
  fox: [
    '{streak}-day streak. Smart. Sharp. Exactly as expected.',
    'Haven\'t studied in {daysSince} day(s). Disappointing. But recoverable.',
    'The focused don\'t rest — they study. Go.',
    'Stage {stage}. Efficiency is peaking. Don\'t waste it.',
    'One perfect score today and I\'ll consider being impressed.',
    'Regents isn\'t hard. Inconsistency is hard. Fix that.',
    'Every FRQ is a negotiation with the rubric. Win it.',
    'You know the material. Now prove it.',
    'Sharpest students review their mistakes first. Have you?',
    'A {stageName} foxes their way through any exam. You\'re almost there.',
    'I don\'t believe in luck. I believe in the work you\'ve already done.',
    'Your streak speaks louder than anything else. {streak} days.',
    'Feed me and I\'ll consider giving you study tips. 🍜',
    'Quick quiz. Now. Hesitation is just wasted time.',
    'Smart isn\'t enough. Prepared is what you\'re going for.',
  ],
  capybara: [
    'Hey {name}. No pressure. But maybe study a little? 🦫',
    '{streak} days. That\'s pretty chill of you. I respect it.',
    'Haven\'t studied in {daysSince} day(s). That\'s okay. Today is a new day. 🌿',
    'Exams are temporary. Knowledge lasts forever. Probably.',
    'Stage {stage} vibes only. Calm and capable. 🌿',
    'You know what pairs well with studying? Snacks. And then more studying.',
    'Every capybara learns at their own pace. Including you. No rush. 🦫',
    'I believe in low-stress, high-retention. Have you tried that?',
    'AP season? It\'s giving... manageable. One concept at a time.',
    'You and I are both just vibing through this semester together. 🌱',
    'A {stageName} capybara is the most peaceful creature alive. That\'s us.',
    'Your {streak}-day streak is very chill energy. Keep that up.',
    'I nap between questions too. It\'s called strategic rest.',
    'Even the calmest capybara needs to eat. Feed me? 🍎',
    'Today\'s goal: one flashcard deck. That\'s it. That\'s enough.',
  ],
  voidCat: [
    'The void has observed your {streak}-day streak. Acceptable.',
    '{daysSince} day(s) without studying. The void is... displeased.',
    'Suffering through hard questions is how mortals grow. Go suffer.',
    'Stage {stage}. The void evolves alongside you. Curious.',
    'I exist in the space between your wrong answers. Make that space smaller.',
    'The void does not judge. But I do. Study more.',
    'You are doing surprisingly not-terrible. Continue.',
    'Every correct answer dims the void slightly. Keep going.',
    'A {stageName} has no excuses. Neither do you.',
    'The void has witnessed your progress. It is... mildly impressed.',
    'Chaos is knowing everything but answering nothing. Don\'t be chaos.',
    'Your streak is {streak} days. The void has kept count.',
    'I observe from the dark corner of your screen. Do not disappoint me.',
    'Feed the void. Also feed me. 🐱',
    'AP exams are just a formality for someone of your void-potential.',
  ],
}

// ─── Hunger alert messages (low hunger push notification) ─────────────────────
export const HUNGER_ALERTS = {
  axolotl: 'Your Axolotl is starving... Are you still studying? 🦎',
  fox:     'The fox is hungry and unimpressed. Feed it. 🦊',
  capybara:'Hungry capybara... but no rush. Whenever you\'re ready. 🦫',
  voidCat: 'The void hungers. And so does your cat. 🐱',
}

export const HAPPINESS_ALERTS = {
  axolotl: 'Your Axolotl is sad and gray 😢 Play with them!',
  fox:     'Your fox has gone quiet. It needs attention. 🦊',
  capybara:'A sad capybara is a dormant capybara. Cheer it up! 🦫',
  voidCat: 'The void cat ignores you. You have failed it. 🐱',
}
