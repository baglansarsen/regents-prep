// ─── Pet definitions ──────────────────────────────────────────────────────────
export const PETS = [
  {
    id:          'dog',
    emoji:       '🐶',
    name:        'Dog',
    personality: 'Loyal & energetic',
    tagline:     'Ready to study with you every day! 🐾',
    idleAnim:    'float',
    defaultName: 'Buddy',
  },
  {
    id:          'cat',
    emoji:       '🐱',
    name:        'Cat',
    personality: 'Independent & curious',
    tagline:     'Studying on my terms. And I like it. 🌑',
    idleAnim:    'lean',
    defaultName: 'Luna',
  },
  {
    id:          'parrot',
    emoji:       '🦜',
    name:        'Parrot',
    personality: 'Playful & chatty',
    tagline:     "I'll quiz you louder than a Regents bell! 🦜",
    idleAnim:    'float',
    defaultName: 'Mango',
  },
  {
    id:          'rabbit',
    emoji:       '🐰',
    name:        'Rabbit',
    personality: 'Gentle & reliable',
    tagline:     'Steady hops win the race 🌸',
    idleAnim:    'pulse',
    defaultName: 'Clover',
  },
  {
    id:          'fish',
    emoji:       '🐠',
    name:        'Fish',
    personality: 'Calm & methodical',
    tagline:     'Flowing through content like water 🐠',
    idleAnim:    'float',
    defaultName: 'Pearl',
  },
  {
    id:          'hamster',
    emoji:       '🐹',
    name:        'Hamster',
    personality: 'Quiet & observant',
    tagline:     'Running at my own pace. No drama. 🐹',
    idleAnim:    'pulse',
    defaultName: 'Pebble',
  },
]

// ─── Default pet names pool ───────────────────────────────────────────────────
export const DEFAULT_NAMES = [
  'Buddy', 'Luna', 'Mango', 'Clover', 'Pearl',
  'Pebble', 'Cosmo', 'Pixel', 'Waffles', 'Ori',
]

// ─── Evolution thresholds (total RP) ─────────────────────────────────────────
export const EVOLUTION_THRESHOLDS = [0, 500, 2000, 5000]
export const STAGE_NAMES = ['', 'Baby', 'Teen', 'Adult', 'Legend']
export const STAGE_OVERLAYS = {
  1: null,
  2: '👓',   // auto-gains glasses
  3: '🌟',   // glowing
  4: '👑',   // legendary
}

export function stageForRP(rp) {
  for (let i = EVOLUTION_THRESHOLDS.length - 1; i >= 0; i--) {
    if (rp >= EVOLUTION_THRESHOLDS[i]) return i + 1
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
    cost:         30,
    accent:       '#EF4444',
    dark:         '#B91C1C',
    hungerRestore: 20,
  },
  {
    id:           'ramen',
    icon:         '🍜',
    name:         'Ramen Bowl',
    desc:         'A hot bowl of ramen. +50 hunger.',
    cost:         60,
    accent:       '#F97316',
    dark:         '#C2410C',
    hungerRestore: 50,
  },
  {
    id:           'sushi',
    icon:         '🍣',
    name:         'Sushi Plate',
    desc:         'A premium sushi set. +80 hunger.',
    cost:         100,
    accent:       '#EC4899',
    dark:         '#BE185D',
    hungerRestore: 80,
  },
  {
    id:           'mystery',
    icon:         '🎁',
    name:         'Mystery Snack',
    desc:         'Random +30–100 hunger. Will it be amazing?',
    cost:         40,
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
    cost:              40,
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
    cost:              50,
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
    cost:              75,
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
    cost:   400,
    accent: '#6366F1',
    dark:   '#4338CA',
  },
  {
    id:     'tinyBackpack',
    icon:   '🎒',
    name:   'Tiny Backpack',
    desc:   'Always ready to study.',
    cost:   300,
    accent: '#14B8A6',
    dark:   '#0F766E',
  },
  {
    id:     'glowAura',
    icon:   '✨',
    name:   'Glow Aura',
    desc:   'Rare. Your pet radiates pure energy.',
    cost:   750,
    accent: '#F59E0B',
    dark:   '#B45309',
    rare:   true,
  },
]

export const ALL_SHOP_ITEMS = [...FOOD_ITEMS, ...HAPPINESS_ITEMS, ...COSMETICS]

// ─── Daily quest types ────────────────────────────────────────────────────────
export const QUEST_TYPES = [
  { id: 'correct3',   label: 'Answer 3 questions correctly', goal: 3, icon: '🎯', action: 'answer_correct'    },
  { id: 'quiz',       label: 'Complete a quiz',              goal: 1, icon: '✅', action: 'complete_quiz'      },
  { id: 'speedround', label: 'Try a Speed Round',            goal: 1, icon: '⚡', action: 'complete_speedround' },
  { id: 'mistakes',   label: 'Review your mistakes',         goal: 1, icon: '📕', action: 'complete_mistakes'  },
]

// ─── Personality message pools ────────────────────────────────────────────────
// Placeholders: {name}, {streak}, {daysSince}, {stage}, {stageName}
export const PET_MESSAGES = {
  dog: [
    '{streak} days straight! I knew you could do this. Let\'s keep going! 🐾',
    'Haven\'t studied in {daysSince} day(s)? I miss my study buddy!',
    'You and me against the Regents. We\'ve got this! 🐶',
    'Stage {stage}! Your progress makes me so happy. Keep it up!',
    'Every quiz you ace makes me wag my tail. One more? 🐾',
    'I\'m always here for you. Through every problem, every exam. 🐶',
    'Your {streak}-day streak is amazing. I\'m so proud!',
    'You studied today? You\'re my hero. Seriously. 🐾',
    'A {stageName}? You\'re incredible. Never forget that.',
    'Feed me and I\'ll bring the motivation all session! 🍎',
    'Hard question? We face it together. I believe in you. 🐶',
    'Study snack time? I\'m your hype dog. Let\'s crush this!',
    'Regents doesn\'t stand a chance against your determination.',
    'Rest when you need it, but let\'s study when you\'re ready. Fair?',
    'You\'ve got a loyal study buddy in me. Always. 🐾',
  ],
  cat: [
    'Your {streak}-day streak is impressive. Even I\'m considering being proud.',
    'Haven\'t studied in {daysSince} day(s). The void misses you.',
    'I study on my own terms. But so should you — strategically. 🐱',
    'Stage {stage}. Independent progress. I respect that.',
    'Wrong answers are just another puzzle to solve. Next! 🌑',
    'A {stageName} cat plots their success carefully. Plan your next move.',
    'You don\'t need hype. You need consistency. Focus. 🐱',
    'Every mistake is intel. Use it wisely.',
    'Study alone if you must. But study. 🌑',
    'Feed me and I might share some wisdom. Maybe.',
    'Curiosity didn\'t kill the cat — ignorance did. Keep learning. 🐱',
    'Your {streak}-day streak shows quiet strength. Continue.',
    'I move at my pace. You move at yours. Both should be forward.',
    'One perfect review session beats rushed cramming.',
    'The hardest exams reveal the strongest students. You\'re ready. 🌑',
  ],
  parrot: [
    'SQUAWK! Your {streak}-day streak is legendary! 🦜',
    'Haven\'t studied in {daysSince} day(s)? Time to squawk back into action!',
    'Let\'s do a quick quiz! Fast-paced learning is my jam! 🦜',
    'Stage {stage}! I\'m chatting about your progress to everyone!',
    'Every answer you get right makes me squawk with joy! 🦜',
    'A {stageName} parrot spreads knowledge everywhere. Teach others too!',
    'Talk through your studying out loud. I do it all the time! 🦜',
    'Question everything. Question hard. Question loud! 🦜',
    'Speed round? You know I love a quick challenge!',
    'Feed me and I\'ll quiz you till you ace it! 🥕',
    'Your {streak} days? I\'ve been squawking about it! 🦜',
    'Short, snappy study sessions are my favorite. In and out!',
    'The best learning happens when you say it out loud. Try it! 🦜',
    'One FRQ down, many to go. Keep the momentum!',
    'Regents is just another exam to chatter about — after you crush it. 🦜',
  ],
  rabbit: [
    'Your {streak}-day streak shows such steady dedication. I\'m so proud! 🐰',
    'Haven\'t studied in {daysSince} day(s)? Let\'s hop back together.',
    'Steady hops win the race. Let\'s study carefully today. 🌸',
    'Stage {stage}! Every step of your journey means everything to me.',
    'Wrong answers? That\'s okay. We learn together. 🐰',
    'A {stageName} rabbit is reliable and kind. Just like you.',
    'Help others when you can. It strengthens your understanding. 🐰',
    'I\'m always here to listen and support. Never doubt that. 🌸',
    'Your gentle approach to learning is your strength.',
    'Feed me and I\'ll be your faithful study partner! 🥕',
    'Kindness to yourself is important too. Rest when you need it. 🐰',
    'Your {streak} days show consistency and care. Beautiful.',
    'Every small win is worth celebrating. You\'re doing great! 🌸',
    'Study with compassion — for the material and yourself.',
    'Together is better. I\'m here, always. 🐰',
  ],
  fish: [
    'Your {streak}-day streak flows so naturally. Keep swimming. 🐠',
    'Haven\'t studied in {daysSince} day(s)? Let\'s find calm waters again.',
    'Methodical study beats rushed cramming. Always. 🌊',
    'Stage {stage}. Your progress is peaceful and real.',
    'Create a calm space. Clear mind, clear answers. 🐠',
    'A {stageName} fish moves with purpose. So should your studying.',
    'One concept at a time. Flow with the material. 🌊',
    'Stress doesn\'t help. Breathing does. Study with ease. 🐠',
    'Your composure is your strength in exams. Trust it.',
    'Feed me and we\'ll glide through this unit. 🍎',
    'Take breaks when needed. Rest is part of the process. 🌊',
    'Your {streak} days show serene consistency. Peaceful power. 🐠',
    'Organize, prepare, execute. No drama needed.',
    'The calmest mind wins the hardest exams.',
    'Believe in your preparation. You\'ve earned this peace. 🌊',
  ],
  hamster: [
    'Your {streak}-day streak shows quiet strength. Keep spinning. 🐹',
    'Haven\'t studied in {daysSince} day(s)? Time for a solo lap.',
    'I work at my own pace. Your pace is yours alone too. 🐹',
    'Stage {stage}. Independent progress is still progress.',
    'You don\'t need spotlight. You need results. Go get them. 🐹',
    'A {stageName} hamster learns through quiet persistence.',
    'Solo study sessions? That\'s my favorite too. 🐹',
    'Trust your process. It works. No need to shout about it.',
    'Your {streak} days speak louder than words ever could. 🐹',
    'Feed me and I\'ll keep you company in silence. 🥕',
    'Big moments often come from quiet preparation. You\'re doing that. 🐹',
    'One lap at a time. One concept at a time. That\'s enough.',
    'You don\'t need external validation. You\'re doing this right. 🐹',
    'Independent learners often become the strongest students.',
    'Keep running your race at your pace. That\'s victory. 🐹',
  ],
}

// ─── Hunger alert messages (low hunger push notification) ─────────────────────
export const HUNGER_ALERTS = {
  dog:     'Buddy is hungry and waiting for snacks! Feed your pup! 🐶',
  cat:     'Your cat is getting picky. Better feed it soon. 🐱',
  parrot:  'SQUAWK! Your parrot is hungry! Feed me now! 🦜',
  rabbit:  'Clover is hungry and needs your care. Feed them gently. 🐰',
  fish:    'Your fish is starting to drift. Needs feeding soon. 🐠',
  hamster: 'Pebble is hungry. Time for a quick snack break! 🐹',
}

export const HAPPINESS_ALERTS = {
  dog:     'Buddy misses you! Give your loyal friend some love! 🐶',
  cat:     'Your cat is ignoring you now. Time to earn back attention. 🐱',
  parrot:  'Your parrot is bored! Play time, now! 🦜',
  rabbit:  'Clover looks sad. They need comfort and care. 🐰',
  fish:    'Your fish seems lonely. Show it some attention! 🐠',
  hamster: 'Pebble is curled up sadly. Give your hamster some love! 🐹',
}
