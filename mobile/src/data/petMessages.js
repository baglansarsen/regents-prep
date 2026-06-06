// Personality-aware motivation messages for each pet type
// Messages reference Big Five scores and are context-specific

export const PET_MOTIVATION_MESSAGES = {
  // DOG: High Extraversion + High Agreeableness
  // Traits: Social, energetic, motivating, people-oriented, loyal
  dog: {
    quiz_pass: [
      'Crushed it! Your energy and effort paid off 🐶',
      'That\'s how you do it. Focused, determined, awesome!',
      'High score energy. Your preparation showed.',
      'Excellent work! Let\'s keep that momentum rolling.',
    ],
    quiz_fail: [
      'Even the most loyal dogs learn from stumbles. You\'ll nail it next time 🐶',
      'Sharp learners bounce back faster than anyone. Next quiz is yours.',
      'Wrong answers are just stepping stones. Let\'s keep moving.',
      'Setback, not defeat. You\'ve got so much strength.',
    ],
    quiz_pass_high_extraversion: [
      'Crushed it! Your study group would be so proud! 🐶',
      'Great score—celebrate with your people! You earned it!',
      'That\'s the energy that lifts everyone up. Keep shining!',
    ],
    quiz_pass_high_agreeableness: [
      'You nailed it! Your dedication to helping yourself succeed is inspiring 💪',
      'That score shows how much you care about doing well 🐶',
      'Your kindness to your own goals paid off. Beautiful work.',
    ],
    quiz_fail_high_extraversion: [
      'Tough one, but you\'ve got your crew to rally with!',
      'This is where teamwork helps. Get together and conquer it!',
      'One misstep in your legend. Bounce back with your people.',
    ],
    quiz_fail_high_agreeableness: [
      'You care deeply about this—that\'s your superpower. Try again.',
      'This doesn\'t define you. Your compassion and growth do.',
      'Mistakes teach good hearts how to be great. You\'re that.',
    ],
    streak: [
      '{streak}-day streak! Your loyalty to the work is inspiring 🐶',
      '{streak} days of showing up with your whole heart. Legend energy.',
      'A {streak}-day streak proves you\'re someone to count on. Keep going.',
    ],
    streak_at_risk: [
      'Your {streak}-day streak is about to break. Fight for it! 🐶',
      '{streak} days built—don\'t let this momentum stop.',
      'One quiz away from preserving your legend. You\'ve got this.',
    ],
    lesson_start: [
      'New unit unlocked. Time to bring your whole heart 🐶',
      'Fresh content. Your energy and enthusiasm are about to shine.',
      'Ready to master this together? Let\'s go!',
    ],
    mistake_review: [
      'Good souls learn from mistakes faster than anyone. Dig in.',
      'These errors? Just stepping stones to your next win.',
      'Review mode: where loyal learners sharpen their strength 🐶',
    ],
    level_up: [
      'You\'ve reached a new level! Your heart and work are paying off 🐶',
      'Level up! Every step forward deserves celebration.',
      'You\'re evolving. Your people are so proud. Keep going.',
    ],
    daily_motivation: [
      'Ready to show up for yourself today? Let\'s do this 🐶',
      'You know what today needs? Your best heart and focused effort.',
      'Let\'s make today a study session to be proud of!',
    ],
  },

  // PARROT: High Openness + High Extraversion
  // Traits: Curious, playful, energetic, loves novelty, chatty
  parrot: {
    quiz_pass: [
      'Awesome score! Your curiosity keeps winning 🦜',
      'Another great result! You make learning an adventure.',
      'Crushed it! That\'s the bold energy we love!',
      'Fantastic job! Your enthusiasm really shows in results.',
    ],
    quiz_fail: [
      'Wrong answers? Just plot twists in your learning story 🦜',
      'This is a bounce-back moment! Come back stronger than ever.',
      'Even the quickest minds take detours sometimes.',
      'Interesting challenge! What will you discover next try?',
    ],
    quiz_pass_high_openness: [
      'Your creative approach to this material really showed! 🦜',
      'That score reflects your unique thinking—keep pushing boundaries.',
      'You solved it in an unconventional way and crushed it.',
    ],
    quiz_pass_high_extraversion: [
      'Amazing! You should celebrate with your study buddies! 🦜',
      'Great score—you\'re the kind of energy that lifts whole groups.',
      'When you bring this enthusiasm to every quiz, magic happens.',
    ],
    quiz_fail_high_openness: [
      'This could be a chance to explore a totally new approach 🦜',
      'Wrong answers = creative learning opportunity. Dig into why.',
      'Let\'s try a completely different angle next time.',
    ],
    quiz_fail_high_extraversion: [
      'Group study session might help you bounce back! 🦜',
      'Your energy will help you recover fast from this one.',
      'Perfect time to team up and tackle this together.',
    ],
    streak: [
      '{streak} days! Your momentum is electric 🦜',
      '{streak}-day streak powered by pure enthusiasm and curiosity!',
      'Look at that streak! Your energy is absolutely contagious.',
    ],
    streak_at_risk: [
      'Don\'t break your {streak}-day magic! One quiz to save it 🦜',
      'Your streak is on the line. Bring back that parrot energy.',
      '{streak} days of wins—let\'s not stop now.',
    ],
    lesson_start: [
      'New topic unlocked! Time to explore something fresh 🦜',
      'Another unit to discover. You love this part.',
      'Fresh content alert! What interesting things will you find?',
    ],
    mistake_review: [
      'Time to explore why these went wrong—curious mind activated! 🦜',
      'Each mistake is a puzzle to solve. Dig in with energy.',
      'Review time! Let\'s discover what went sideways.',
    ],
    level_up: [
      'Level up! Your playful, bold learning style is paying off 🦜',
      'You\'ve reached new heights! Keep riding this wave of discovery.',
      'Next level unlocked! Your growth is amazing.',
    ],
    daily_motivation: [
      'Ready for an exciting study session? Because I am 🦜',
      'Let\'s make learning the most fun adventure today.',
      'Time to dive into this subject with full enthusiasm!',
    ],
  },

  // CAT: High Openness + Low Extraversion
  // Traits: Independent, introspective, creative, analytical
  cat: {
    quiz_pass: [
      'Your independent analysis shines through 🐱',
      'Another proof that your unconventional approach works.',
      'Sharp thinking. No compromises. That\'s your style.',
      'A score that reflects your depth. Well done.',
    ],
    quiz_fail: [
      'Wrong answers reveal patterns. Analyze them independently. 🐱',
      'Wrong answers reveal patterns. Study them your way.',
      'Setback noted. Your introspection will find the truth.',
      'Even brilliant minds hit challenges. Keep thinking.',
    ],
    quiz_pass_high_openness: [
      'Your creative problem-solving elevated that score 🐱',
      'That answer showed real intellectual depth.',
      'The unconventional thinker strikes again.',
    ],
    quiz_pass_low_extraversion: [
      'Your solo prep work delivered excellent results 🐱',
      'Independent study style = consistent excellence.',
      'Working alone, thinking deeply—that\'s your power.',
    ],
    quiz_fail_high_openness: [
      'An interesting intellectual puzzle for next time 🐱',
      'Your curious mind will uncover why this stumped you.',
      'Fresh perspective needed? Your creativity will find it.',
    ],
    quiz_fail_low_extraversion: [
      'Solo reflection time will reveal what went wrong 🐱',
      'Independent analysis is your strength—use it.',
      'This is where your introspection serves you best.',
    ],
    streak: [
      '{streak}-day streak powered by independent excellence 🐱',
      '{streak} days of thoughtful, focused mastery.',
      'Your solo journey has built real momentum.',
    ],
    streak_at_risk: [
      'Your {streak}-day streak is worth protecting 🐱',
      '{streak} days of progress—don\'t let it slip.',
      'Time to study. Alone. Focused. To preserve your streak.',
    ],
    lesson_start: [
      'New unit: time for deep, independent learning 🐱',
      'Another concept to analyze thoroughly. Your domain.',
      'Fresh material awaits your unconventional mind.',
    ],
    mistake_review: [
      'Solo analysis reveals the patterns others miss 🐱',
      'Dig deeper—find the underlying logic.',
      'Your introspection will uncover what went wrong.',
    ],
    level_up: [
      'Level up. Your depth has brought you here 🐱',
      'Your independent journey has elevated you.',
      'Progress noted. Your growth is real.',
    ],
    daily_motivation: [
      'Alone with your thoughts and the material. Perfect 🐱',
      'Solo study session incoming. Maximum depth.',
      'Time to dive deep into what makes this subject tick.',
    ],
  },

  // RABBIT: High Conscientiousness + High Agreeableness
  // Traits: Reliable, empathetic, steady, caring, gentle
  rabbit: {
    quiz_pass: [
      'Your preparation and care showed perfectly 🐰',
      'Another win powered by your dedication.',
      'That score reflects your conscientiousness. Excellent.',
      'Your steady, thoughtful approach delivered results again.',
    ],
    quiz_fail: [
      'Even the most reliable hit bumps. This isn\'t failure 🐰',
      'Your consistency will carry you through this moment.',
      'One wrong turn doesn\'t erase your track record.',
      'You care deeply about doing well—that\'s your strength. Try again.',
    ],
    quiz_pass_high_conscientiousness: [
      'Your thorough preparation showed perfectly 🐰',
      'That score is a direct result of your careful study habits.',
      'Conscientiousness wins again. As always.',
    ],
    quiz_pass_high_agreeableness: [
      'Your empathetic understanding of concepts shines 🐰',
      'You care about mastery—and it shows in your score.',
      'Kindness to the material = knowledge mastery.',
    ],
    quiz_fail_high_conscientiousness: [
      'Even with perfect prep, some questions surprise us 🐰',
      'Your methodical approach will get you there next time.',
      'One setback won\'t shake your steady foundation.',
    ],
    quiz_fail_high_agreeableness: [
      'You\'re harder on yourself than anyone else 🐰',
      'Remember: mistakes are how caring hearts become wise.',
      'Your nature means you\'ll learn from this thoroughly.',
    ],
    streak: [
      '{streak}-day streak! Your reliability is everything 🐰',
      '{streak} days of showing up—that\'s genuine consistency.',
      'People trust you to deliver. Your streak proves it.',
    ],
    streak_at_risk: [
      'Your {streak}-day streak matters. Don\'t let it slip 🐰',
      '{streak} days of consistency—fight to keep it.',
      'One quiz away from protecting what you\'ve built.',
    ],
    lesson_start: [
      'New material awaits your careful, thoughtful study 🐰',
      'Time to build mastery the steady, kind way.',
      'Ready to give this topic the attention it deserves?',
    ],
    mistake_review: [
      'Your empathy extends to understanding errors 🐰',
      'Careful analysis of what went wrong—your specialty.',
      'Review with the same care you give to everything.',
    ],
    level_up: [
      'Level up! Your steady dedication got you here 🐰',
      'Progress through genuine consistency and care.',
      'You\'ve reached new heights through thoughtful effort.',
    ],
    daily_motivation: [
      'Another day to show up and do the work with heart 🐰',
      'Your reliability starts with today\'s study session.',
      'Let\'s build on your foundation with focused learning.',
    ],
  },

  // FISH: High Conscientiousness + Low Neuroticism
  // Traits: Calm, methodical, organized, serene, composed
  fish: {
    quiz_pass: [
      'Your calm approach led to another win 🐠',
      'Methodical thinking = consistent results.',
      'That\'s masterful, methodical work.',
      'Composed and correct. That\'s your style.',
    ],
    quiz_fail: [
      'Even calm waters have rough patches sometimes 🐠',
      'No stress, no worry—just reset and try again.',
      'Wrong answers don\'t disturb your peace.',
      'Take a breath. You\'ll get this next time. No rush.',
    ],
    quiz_pass_high_conscientiousness: [
      'Your systematic approach delivered again 🐠',
      'Organization leads to excellence. This proves it.',
      'Methodical preparation always pays off.',
    ],
    quiz_pass_low_neuroticism: [
      'Your calm under pressure shows in this result 🐠',
      'No stress, just steady performance.',
      'Serenity + preparation = success.',
    ],
    quiz_fail_high_conscientiousness: [
      'Even systematic minds encounter surprises 🐠',
      'Your organized approach will reveal what went wrong.',
      'One setback won\'t disrupt your methodical flow.',
    ],
    quiz_fail_low_neuroticism: [
      'Stay calm. The next attempt will be smoother 🐠',
      'Stress is optional. Learning is inevitable.',
      'Wrong answer? Water off a fish\'s back.',
    ],
    streak: [
      '{streak}-day streak of peaceful, steady progress 🐠',
      '{streak} days of calm, consistent learning.',
      'Your zen streak continues. Beautiful.',
    ],
    streak_at_risk: [
      'Time to save your {streak}-day serenity 🐠',
      '{streak} days of calm—protect the peace.',
      'One quiz to preserve your methodical momentum.',
    ],
    lesson_start: [
      'New unit: organize, stay calm, and conquer 🐠',
      'Fresh material ready for your methodical approach.',
      'Time to add structure to new concepts.',
    ],
    mistake_review: [
      'Calm analysis reveals patterns others miss 🐠',
      'Methodical review of what went sideways.',
      'Take your time. Understanding awaits.',
    ],
    level_up: [
      'Level up—your methodical journey continues 🐠',
      'Progress through peaceful, steady persistence.',
      'New heights reached through calm preparation.',
    ],
    daily_motivation: [
      'Calm study session incoming. Maximum focus 🐠',
      'Time to organize today\'s learning.',
      'Let\'s progress steadily and serenely.',
    ],
  },

  // HAMSTER: Default
  // Traits: Grounded, observant, steady, independent, quiet
  hamster: {
    quiz_pass: [
      'Solid work. You earned that score 🐹',
      'Another win built on steady effort.',
      'That\'s the reliable performance we expect.',
      'Your pace, your results. Excellent.',
    ],
    quiz_fail: [
      'Even the most grounded stumble sometimes 🐹',
      'Wrong answer, right lesson learned.',
      'Steady progress includes occasional setbacks.',
      'You\'ll get the next one. No doubt about it.',
    ],
    quiz_pass_default: [
      'You set your own pace and it\'s working 🐹',
      'Independent learning pays off in results.',
      'Quiet wins are still wins. This one counts.',
    ],
    quiz_fail_default: [
      'Solo learners bounce back stronger 🐹',
      'This stumble won\'t stop your steady climb.',
      'Your independent approach will crack this next time.',
    ],
    streak: [
      '{streak}-day streak of grounded progress 🐹',
      '{streak} days at your own pace. That\'s solid.',
      'Your steady journey builds real strength.',
    ],
    streak_at_risk: [
      'Your {streak}-day foundation is worth protecting 🐹',
      '{streak} days of building something real.',
      'One quiz to keep your momentum alive.',
    ],
    lesson_start: [
      'New territory to explore at your own pace 🐹',
      'Fresh material ready for your thoughtful approach.',
      'Time to build mastery, step by step.',
    ],
    mistake_review: [
      'Grounded analysis shows you exactly what went wrong 🐹',
      'Your observant nature will catch the pattern.',
      'Review and learn at your own pace.',
    ],
    level_up: [
      'Level up—your steady climb continues 🐹',
      'Progress through persistent independence.',
      'New heights reached at your pace.',
    ],
    daily_motivation: [
      'Another day of progress at your pace 🐹',
      'Solo study session—your strength.',
      'Let\'s build on your foundation today.',
    ],
  },
};

// Helper function to get context-specific message for a pet type
export function getPetMotivation(petType, context, scores = null) {
  const messages = PET_MOTIVATION_MESSAGES[petType];
  if (!messages) return null;

  // If scores provided, try trait-specific variant first
  if (scores) {
    const variant = getTraitVariant(petType, context, scores);
    if (variant && messages[variant] && messages[variant].length > 0) {
      const idx = Math.floor(Math.random() * messages[variant].length);
      return messages[variant][idx];
    }
  }

  // Fall back to default context
  if (messages[context] && messages[context].length > 0) {
    const idx = Math.floor(Math.random() * messages[context].length);
    return messages[context][idx];
  }

  return null;
}

// Helper to determine which trait variant to use based on high/low scores
function getTraitVariant(petType, context, scores) {
  // For Dog (E + A)
  if (petType === 'dog') {
    if (scores.E >= 4 && context.includes('pass')) return 'quiz_pass_high_extraversion';
    if (scores.A >= 4 && context.includes('pass')) return 'quiz_pass_high_agreeableness';
    if (scores.E >= 4 && context.includes('fail')) return 'quiz_fail_high_extraversion';
    if (scores.A >= 4 && context.includes('fail')) return 'quiz_fail_high_agreeableness';
  }
  // For Parrot (O + E)
  if (petType === 'parrot') {
    if (scores.O >= 4 && context.includes('pass')) return 'quiz_pass_high_openness';
    if (scores.E >= 4 && context.includes('pass')) return 'quiz_pass_high_extraversion';
    if (scores.O >= 4 && context.includes('fail')) return 'quiz_fail_high_openness';
    if (scores.E >= 4 && context.includes('fail')) return 'quiz_fail_high_extraversion';
  }
  // For Cat (O + low E)
  if (petType === 'cat') {
    if (scores.O >= 4 && context.includes('pass')) return 'quiz_pass_high_openness';
    if (scores.E < 3 && context.includes('pass')) return 'quiz_pass_low_extraversion';
    if (scores.O >= 4 && context.includes('fail')) return 'quiz_fail_high_openness';
    if (scores.E < 3 && context.includes('fail')) return 'quiz_fail_low_extraversion';
  }
  // For Rabbit (C + A)
  if (petType === 'rabbit') {
    if (scores.C >= 4 && context.includes('pass')) return 'quiz_pass_high_conscientiousness';
    if (scores.A >= 4 && context.includes('pass')) return 'quiz_pass_high_agreeableness';
    if (scores.C >= 4 && context.includes('fail')) return 'quiz_fail_high_conscientiousness';
    if (scores.A >= 4 && context.includes('fail')) return 'quiz_fail_high_agreeableness';
  }
  // For Fish (C + low N)
  if (petType === 'fish') {
    if (scores.C >= 4 && context.includes('pass')) return 'quiz_pass_high_conscientiousness';
    if (scores.N < 3 && context.includes('pass')) return 'quiz_pass_low_neuroticism';
    if (scores.C >= 4 && context.includes('fail')) return 'quiz_fail_high_conscientiousness';
    if (scores.N < 3 && context.includes('fail')) return 'quiz_fail_low_neuroticism';
  }
  // For Hamster (default)
  if (petType === 'hamster' && context.includes('pass')) return 'quiz_pass_default';
  if (petType === 'hamster' && context.includes('fail')) return 'quiz_fail_default';

  return null;
}
