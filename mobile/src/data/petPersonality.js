// Big Five personality quiz questions (2 per trait: O, C, E, A, N)
export const QUESTIONS = [
  // Openness (O) - Curiosity, creativity, new experiences
  {
    id: 1,
    trait: 'O',
    text: 'On a free weekend, you typically…',
    choices: [
      { text: 'Try a totally new activity or explore somewhere unfamiliar', score: 3 },
      { text: 'Mix visiting familiar spots with trying something new', score: 2 },
      { text: 'Stick mostly to activities you already enjoy', score: 1 },
      { text: 'Recharge at home doing the same routine', score: 0 },
    ],
  },
  {
    id: 2,
    trait: 'O',
    text: 'When faced with a problem, you…',
    choices: [
      { text: 'Brainstorm wild ideas and unconventional solutions', score: 3 },
      { text: 'Think creatively but consider proven methods too', score: 2 },
      { text: 'Prefer tested approaches that have worked before', score: 1 },
      { text: 'Follow established rules and best practices', score: 0 },
    ],
  },

  // Conscientiousness (C) - Organization, responsibility, planning
  {
    id: 3,
    trait: 'C',
    text: 'Your ideal schedule is…',
    choices: [
      { text: 'Flexible and spontaneous, changing day to day', score: 0 },
      { text: 'Mostly planned with room for flexibility', score: 1 },
      { text: 'Pretty structured with a predictable routine', score: 2 },
      { text: 'Highly organized with everything scheduled', score: 3 },
    ],
  },
  {
    id: 4,
    trait: 'C',
    text: 'When working on a project, you…',
    choices: [
      { text: 'Dive in and figure it out as you go', score: 0 },
      { text: 'Have a rough plan but adjust as needed', score: 1 },
      { text: 'Plan ahead and follow the plan closely', score: 2 },
      { text: 'Create detailed timelines and checklists', score: 3 },
    ],
  },

  // Extraversion (E) - Sociability, energy, excitement-seeking
  {
    id: 5,
    trait: 'E',
    text: 'After a busy week, you feel energized by…',
    choices: [
      { text: 'Quiet time alone to recharge', score: 0 },
      { text: 'A mix of social time and alone time', score: 1 },
      { text: 'Hanging out with friends or going out', score: 2 },
      { text: 'Big parties, group activities, or being around people', score: 3 },
    ],
  },
  {
    id: 6,
    trait: 'E',
    text: 'In conversations, you typically…',
    choices: [
      { text: 'Listen more and talk less', score: 0 },
      { text: 'Balance listening and sharing', score: 1 },
      { text: 'Share freely and enjoy talking', score: 2 },
      { text: 'Talk a lot and love being the center of attention', score: 3 },
    ],
  },

  // Agreeableness (A) - Empathy, cooperation, kindness
  {
    id: 7,
    trait: 'A',
    text: 'When someone is upset, you…',
    choices: [
      { text: 'Feel uncomfortable and try to leave', score: 0 },
      { text: 'Acknowledge it but keep some distance', score: 1 },
      { text: 'Listen and offer support', score: 2 },
      { text: 'Immediately try to comfort them and help', score: 3 },
    ],
  },
  {
    id: 8,
    trait: 'A',
    text: "When there's conflict, you usually…",
    choices: [
      { text: 'Stand firm on your position', score: 0 },
      { text: 'Defend your view but listen to others', score: 1 },
      { text: 'Look for compromises', score: 2 },
      { text: "Prioritize harmony and others' feelings over winning", score: 3 },
    ],
  },

  // Neuroticism (N) - Emotional sensitivity, stress reactivity, worry
  {
    id: 9,
    trait: 'N',
    text: 'When stressed, you tend to…',
    choices: [
      { text: 'Stay calm and think clearly', score: 0 },
      { text: 'Feel a bit worried but manage it', score: 1 },
      { text: 'Get quite anxious and overwhelmed', score: 2 },
      { text: 'Feel very anxious, stressed, or emotionally exhausted', score: 3 },
    ],
  },
  {
    id: 10,
    trait: 'N',
    text: 'You need emotional comfort when…',
    choices: [
      { text: 'Almost never; you handle things independently', score: 0 },
      { text: 'Once in a while, during tough times', score: 1 },
      { text: 'Regularly; you value reassurance from others', score: 2 },
      { text: 'Frequently; you need consistent support and comfort', score: 3 },
    ],
  },
];

// Pet result configurations
export const PET_RESULTS = {
  dog: {
    name: 'Dog',
    emoji: '🐶',
    tagline: 'Loyal, energetic, and ready for adventure!',
    description:
      "You're a natural people-person with a warm heart. You thrive on connection, bring energy to every room, and genuinely care about the people around you. You're the friend everyone wants at their side.",
    tips: [
      "Schedule regular social hangouts—they're fuel for your soul",
      'Lead group projects and team activities where you shine',
      'Balance your social calendar with meaningful one-on-one time',
    ],
  },
  cat: {
    name: 'Cat',
    emoji: '🐱',
    tagline: 'Independent, curious, and wonderfully unique.',
    description:
      "You march to the beat of your own drum. You're creative, introspective, and drawn to novel ideas that others might overlook. You value your independence and prefer depth over constant socializing.",
    tips: [
      "Protect your alone time—it's where your best ideas come from",
      'Seek out niche communities that share your quirky interests',
      'Share your unique perspective; the world needs it',
    ],
  },
  parrot: {
    name: 'Parrot',
    emoji: '🐦',
    tagline: 'Playful, social, and full of personality.',
    description:
      "You're the life of the party with a curious mind that's always seeking the next big adventure. You love trying new things, making people laugh, and diving into conversations about almost anything.",
    tips: [
      'Channel your energy into creative projects or learning new skills',
      'Find friends who match your enthusiasm and sense of play',
      'Balance your active schedule with occasional quiet time to reflect',
    ],
  },
  rabbit: {
    name: 'Rabbit',
    emoji: '🐰',
    tagline: 'Gentle, reliable, and deeply caring.',
    description:
      "You're the calm presence people turn to in a storm. You value routine, take your responsibilities seriously, and show up consistently for the people you care about. Your quiet strength is your superpower.",
    tips: [
      'Trust that your steady approach gets results over time',
      'Share your empathy—people need your kindness more than you know',
      'Occasionally try something outside your comfort zone to grow',
    ],
  },
  fish: {
    name: 'Fish',
    emoji: '🐠',
    tagline: 'Calm, thoughtful, and serene.',
    description:
      "You're a natural at staying grounded and composed. You think things through carefully, appreciate structure, and find peace in routines that work. You're the steady anchor that keeps others sane.",
    tips: [
      'Create a calm environment that lets you thrive',
      'Develop systems and processes that minimize stress',
      'Remember that your peaceful demeanor is a gift to others',
    ],
  },
  hamster: {
    name: 'Hamster',
    emoji: '🐹',
    tagline: 'Low-key, observant, and perfectly content.',
    description:
      "You're happiest in a quiet, drama-free life where you can do your own thing. You're observant, unflappable, and don't need much fanfare to be happy—just some space and peace.",
    tips: [
      'Design a life that gives you the quiet and autonomy you need',
      'Branch out socially when you feel like it—quality over quantity',
      'Trust that your understated style is totally valid',
    ],
  },
};

// Compute which pet matches based on Big Five scores
export function computePetMatch(scores) {
  const { O, C, E, A, N } = scores;

  // Priority order (first match wins)
  if (E >= 4 && A >= 4) return 'dog';
  if (O >= 4 && E >= 4) return 'parrot';
  if (O >= 4 && E < 3) return 'cat';
  if (C >= 4 && A >= 4) return 'rabbit';
  if (C >= 4 && N < 3) return 'fish';
  // Default fallback
  return 'hamster';
}
