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
// Big Five mapping: dog (E+A), parrot (O+E), cat (O+low E), rabbit (C+A), fish (C+low N), hamster (default)
export const PET_RESULTS = {
  dog: {
    petType: 'dog',
    name: 'Dog',
    emoji: '🐶',
    tagline: 'Loyal, energetic, and naturally people-oriented.',
    description:
      "You're a natural people-person with infectious energy and a genuine heart. You thrive on connection, bring focus and enthusiasm to every situation, and truly motivate those around you. You're the friend everyone wants on their study team.",
    tips: [
      'Channel your social energy into group study sessions',
      'Lead study groups and help others sharpen their focus',
      'Use your warmth and loyalty to inspire consistent habits',
    ],
  },
  cat: {
    petType: 'cat',
    name: 'Cat',
    emoji: '🐱',
    tagline: 'Independent, creative, and brilliantly introspective.',
    description:
      "You march to the beat of your own drum. You're intellectually curious, drawn to novel ideas others overlook, and you excel at deep, independent analysis. You value your solitude—it's where the real breakthroughs happen.",
    tips: [
      "Protect your alone study time—it's where breakthroughs happen",
      'Trust your unconventional approach to problems',
      "Share your unique insights; they're often right",
    ],
  },
  parrot: {
    petType: 'parrot',
    name: 'Parrot',
    emoji: '🦜',
    tagline: 'Playful, curious, and endlessly enthusiastic.',
    description:
      "You're the energizer of any study session with a mind that bounces between ideas brilliantly. You love experimenting with new approaches, making learning fun, and diving deep into topics that fascinate you. Your curiosity and energy are your superpowers.",
    tips: [
      'Use quick study sprints to match your natural pace',
      'Find study partners who share your enthusiasm and energy',
      'Balance fast learning with time to consolidate concepts',
    ],
  },
  rabbit: {
    petType: 'rabbit',
    name: 'Rabbit',
    emoji: '🐰',
    tagline: 'Gentle, reliable, and deeply empathetic.',
    description:
      "You're the steady presence everyone relies on. You value consistency, take your responsibilities seriously, and show up for others with genuine care. Your reliability and kindness make you an incredible study partner—people trust you completely.",
    tips: [
      'Your steady approach builds real mastery over time',
      'Help others when you can—your kindness strengthens their understanding',
      'Occasionally push yourself beyond your comfort zone to grow stronger',
    ],
  },
  fish: {
    petType: 'fish',
    name: 'Fish',
    emoji: '🐠',
    tagline: 'Calm, methodical, and naturally serene.',
    description:
      "You're a natural at staying grounded and composed under pressure. You think things through carefully, appreciate structure, and find your best learning happens in peaceful, organized environments. You're the calm anchor that steadies everyone around you.",
    tips: [
      'Create a calm, distraction-free study space',
      'Use systematic study methods that match your peaceful nature',
      'Share your serene perspective with stressed friends',
    ],
  },
  hamster: {
    petType: 'hamster',
    name: 'Hamster',
    emoji: '🐹',
    tagline: 'Grounded, observant, and dependably independent.',
    description:
      "You're happy doing things at your own pace, in your own way. You're observant and thoughtful, don't need constant external validation, and build strength through steady, solo progress. Your independent learning style is completely valid and incredibly effective.",
    tips: [
      'Trust your solo learning process—it works for you',
      'Set your own pace and celebrate your quiet wins',
      'Branch out to study groups when it feels right to you',
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

// Get Big Five profile object with trait names and descriptions
export function getBigFiveProfile(scores) {
  return {
    O: { score: scores.O, name: 'Openness', trait: 'curious, creative, loves novelty' },
    C: { score: scores.C, name: 'Conscientiousness', trait: 'organized, reliable, plans ahead' },
    E: { score: scores.E, name: 'Extraversion', trait: 'social, energetic, outgoing' },
    A: { score: scores.A, name: 'Agreeableness', trait: 'empathetic, cooperative, kind' },
    N: { score: scores.N, name: 'Neuroticism', trait: 'emotionally sensitive, anxious' },
  };
}
