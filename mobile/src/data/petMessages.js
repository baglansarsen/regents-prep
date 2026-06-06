// Personality-aware motivation messages for each pet type
// Messages reference Big Five scores and are context-specific

export const PET_MOTIVATION_MESSAGES = {
  // FOX: High Extraversion + High Agreeableness (Dog personality)
  // Traits: Social, energetic, motivating, people-oriented
  fox: {
    quiz_pass: [
      'Crushed it! Your sharp focus paid off 🦊',
      'That\'s how you do it. Mind-sharp, results-sharp.',
      'High score energy. Your preparation showed.',
      'Excellence recognized. Let\'s keep that up.',
    ],
    quiz_fail: [
      'Even the sharpest foxes have learning moments. Reset and retry.',
      'Sharp minds learn faster than most. You\'ll nail the next one.',
      'Wrong answers are just data. Process and move on.',
      'Setback, not defeat. Your track record speaks louder.',
    ],
    quiz_pass_high_extraversion: [
      'Crushed it! Your teammates would be so proud 🦊',
      'Great score—you should share this win with your study group!',
      'That\'s the energy we need. Lead the charge in the next session.',
    ],
    quiz_pass_high_agreeableness: [
      'You nailed it! Your dedication to mastery is admirable 💪',
      'That score shows how much you care about doing well 🦊',
      'Your conscientiousness paid off. Keep bringing that care to every quiz.',
    ],
    quiz_fail_high_extraversion: [
      'Tough one, but you\'ve got your study crew to rally with!',
      'This is where teamwork helps. Get your group to review this together.',
      'One misstep in a long winning streak. Bounce back with energy.',
    ],
    quiz_fail_high_agreeableness: [
      'You care deeply about doing well—that\'s your strength. Try again.',
      'This doesn\'t define you. Your commitment is what matters most.',
      'Mistakes are how good people become great. You\'ve got this.',
    ],
    streak: [
      '{streak}-day streak! Your consistency is inspiring 🔥',
      '{streak} days of showing up. That\'s leadership energy.',
      'A {streak}-day streak means you\'re someone people can count on. Legendary.',
    ],
    streak_at_risk: [
      'Your {streak}-day streak is about to break. Not on your watch 🦊',
      '{streak} days built—don\'t let this momentum stop now.',
      'One quiz away from keeping your legend alive. You\'ve got this.',
    ],
    lesson_start: [
      'New unit unlocked. Time to bring your A-game 🦊',
      'Fresh content. Your focused energy is about to shine.',
      'Ready to master this? Let\'s go.',
    ],
    mistake_review: [
      'Sharp minds learn from mistakes faster than anyone. Dig in.',
      'These errors? Just stepping stones to your next perfect score.',
      'Review mode: where foxes sharpen their claws 🦊',
    ],
    level_up: [
      'You\'ve reached a new level! Your hard work is paying dividends 🦊',
      'Level up! Every step forward is a victory.',
      'You\'re evolving. Keep this momentum going.',
    ],
    daily_motivation: [
      'Morning focus time. Let\'s ace this subject 🦊',
      'You know what today needs? Sharp thinking and sharper results.',
      'Your study session is about to be peak productivity.',
    ],
  },

  // BUNNY: High Openness + High Extraversion (Parrot personality)
  // Traits: Curious, playful, energetic, loves novelty
  bunny: {
    quiz_pass: [
      'Awesome score! Your curiosity keeps winning 🐰',
      'Another great result! You make learning look fun.',
      'Crushed it! That\'s the energy we love to see.',
      'Fantastic job! Your enthusiasm really pays off.',
    ],
    quiz_fail: [
      'Wrong answers? Just plot twists in your learning story 🐰',
      'This is a bounce-back moment! Come back stronger.',
      'Even the quickest bunny takes a hop backward sometimes.',
      'Interesting failure. What will you discover on the next try?',
    ],
    quiz_pass_high_openness: [
      'Your creative approach to this material really showed! 🐰',
      'That score reflects your unique way of thinking—keep going.',
      'You solved that in an unconventional way and it worked perfectly.',
    ],
    quiz_pass_high_extraversion: [
      'Amazing! You should celebrate with your study buddies! 🐰',
      'Great score—you\'re the kind of energy that lifts study groups.',
      'When you bring this enthusiasm to every quiz, success follows.',
    ],
    quiz_fail_high_openness: [
      'This could be a chance to explore a new study approach 🐰',
      'Wrong answers = creative learning opportunity. Dig into why.',
      'Let\'s try a totally different angle next time.',
    ],
    quiz_fail_high_extraversion: [
      'Group study session might help you bounce back! 🐰',
      'Your energy will help you recover fast from this one.',
      'Perfect time to team up and tackle this together.',
    ],
    streak: [
      '{streak} days! Your momentum is electric 🐰',
      '{streak}-day streak powered by pure enthusiasm! Keep hopping!',
      'Look at that streak! Your consistency is contagious.',
    ],
    streak_at_risk: [
      'Don\'t break your {streak}-day magic! One quiz to save it 🐰',
      'Your streak is on the line. Bring back that bunny energy.',
      '{streak} days of wins—let\'s not stop now.',
    ],
    lesson_start: [
      'New topic unlocked! Time to explore something fresh 🐰',
      'Another unit to discover. You love this part.',
      'Fresh content alert! Let\'s see what you\'ll find interesting.',
    ],
    mistake_review: [
      'Time to explore why these went wrong—curious mind activated! 🐰',
      'Each mistake is a puzzle to solve. Dig in with energy.',
      'Review mode unlocked! Let\'s see what we discover.',
    ],
    level_up: [
      'Level up! Your playful learning style is paying off 🐰',
      'You\'ve reached new heights! Keep riding this wave.',
      'Next level unlocked! Your progress is amazing.',
    ],
    daily_motivation: [
      'Ready for a fun study session? Because I am 🐰',
      'Let\'s make learning an adventure today.',
      'Time to hop into this subject with full energy!',
    ],
  },

  // VOID CAT: High Openness + Low Extraversion (Cat personality)
  // Traits: Independent, introspective, creative, analytical
  voidCat: {
    quiz_pass: [
      'Your independent analysis shines through 🐱',
      'Another proof that your unconventional approach works.',
      'Sharp thinking. No shortcuts. That\'s your style.',
      'A score that reflects your depth. Excellent.',
    ],
    quiz_fail: [
      'The void has witnessed this failure. Time to think deeper 🐱',
      'Wrong answers reveal patterns. Analyze them independently.',
      'Setback noted. Your introspection will find the truth.',
      'Even brilliant minds encounter resistance. Persist.',
    ],
    quiz_pass_high_openness: [
      'Your creative problem-solving elevated that score 🐱',
      'That answer showed real intellectual depth.',
      'The unconventional thinker strikes again with brilliance.',
    ],
    quiz_pass_low_extraversion: [
      'Your solo prep work delivered results 🐱',
      'Independent study style = consistent excellence.',
      'Working alone, thinking deeply—that\'s your power.',
    ],
    quiz_fail_high_openness: [
      'An interesting intellectual challenge for next time 🐱',
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
      '{streak} days of quiet mastery.',
      'Your solo journey has built real momentum.',
    ],
    streak_at_risk: [
      'Your {streak}-day streak is fading. The void watches 🐱',
      '{streak} days of progress—don\'t let silence break it.',
      'Time to study. Alone. Focused. To save your streak.',
    ],
    lesson_start: [
      'New unit: time for deep independent learning 🐱',
      'Another concept to analyze thoroughly. Your domain.',
      'Fresh material awaits your unconventional mind.',
    ],
    mistake_review: [
      'Solo analysis reveals the patterns others miss 🐱',
      'Dig into the void—find the underlying logic.',
      'Your introspection will uncover what went wrong.',
    ],
    level_up: [
      'Level up. The void evolves alongside you 🐱',
      'Your depth has brought you to new heights.',
      'Progress noted. The void is... mildly impressed.',
    ],
    daily_motivation: [
      'Alone with your thoughts and the material. Perfect 🐱',
      'Solo study session incoming. Maximum focus.',
      'Time to dive deep into what makes this subject tick.',
    ],
  },

  // AXOLOTL: High Conscientiousness + High Agreeableness (Rabbit personality)
  // Traits: Reliable, empathetic, steady, caring
  axolotl: {
    quiz_pass: [
      'Your preparation and care showed perfectly 💗',
      'Another win powered by your dedication.',
      'That score reflects your conscientiousness. Excellent.',
      'Your steady approach delivered results again.',
    ],
    quiz_fail: [
      'Even the most reliable hit bumps. This isn\'t failure 💗',
      'Your consistency will carry you through this moment.',
      'One wrong turn doesn\'t erase your track record.',
      'You care deeply about doing well—that\'s your strength. Try again.',
    ],
    quiz_pass_high_conscientiousness: [
      'Your preparation was thorough and it showed 💗',
      'That score is a direct result of your careful study habits.',
      'Conscientiousness wins again. As expected.',
    ],
    quiz_pass_high_agreeableness: [
      'Your empathetic understanding of concepts shines through 💗',
      'You care about mastering this—and it shows in your score.',
      'Kindness toward learning = knowledge mastery.',
    ],
    quiz_fail_high_conscientiousness: [
      'Even with perfect prep, some questions surprise us 💗',
      'Your methodical approach will get you to the right answer next time.',
      'One setback won\'t shake your steady foundation.',
    ],
    quiz_fail_high_agreeableness: [
      'You\'re harder on yourself than anyone else 💗',
      'Remember: mistakes are how good people become great.',
      'Your caring nature means you\'ll learn from this thoroughly.',
    ],
    streak: [
      '{streak}-day streak! Your reliability is everything 🩷',
      '{streak} days of showing up—that\'s legendary consistency.',
      'People trust you to deliver. Your streak proves it.',
    ],
    streak_at_risk: [
      'Your {streak}-day streak matters. Don\'t let it slip 💗',
      '{streak} days of consistency—fight to keep it.',
      'One quiz away from protecting what you\'ve built.',
    ],
    lesson_start: [
      'New material awaits your careful study 💗',
      'Time to build mastery the steady way.',
      'Ready to give this topic the attention it deserves?',
    ],
    mistake_review: [
      'Your empathy extends to understanding errors 💗',
      'Careful analysis of what went wrong—your specialty.',
      'Review with the same care you give to everything.',
    ],
    level_up: [
      'Level up! Your steady dedication got you here 💗',
      'Progress through consistency—that\'s the Axolotl way.',
      'You\'ve reached new heights through careful effort.',
    ],
    daily_motivation: [
      'Another day to show up and do the work 💗',
      'Your reliability starts with today\'s study session.',
      'Let\'s build on your foundation with focused learning.',
    ],
  },

  // CAPYBARA: High Conscientiousness + Low Neuroticism (Fish personality)
  // Traits: Calm, methodical, organized, serene
  capybara: {
    quiz_pass: [
      'Your calm approach led to another win 🦫',
      'Methodical thinking = consistent results.',
      'That\'s the methodical mastery at work.',
      'Composed and correct. That\'s your style.',
    ],
    quiz_fail: [
      'Even calm water has rough patches sometimes 🦫',
      'No stress, no worry—just reset and try again.',
      'Wrong answers don\'t disturb your peace.',
      'Take a breath. You\'ll get this next time. No rush.',
    ],
    quiz_pass_high_conscientiousness: [
      'Your systematic approach delivered again 🦫',
      'Organization leads to excellence. Proof: this score.',
      'Methodical preparation always pays off.',
    ],
    quiz_pass_low_neuroticism: [
      'Your calm under pressure shows in this result 🦫',
      'No stress, just steady performance.',
      'Serenity + skill = success.',
    ],
    quiz_fail_high_conscientiousness: [
      'Even systematic minds encounter surprises 🦫',
      'Your organized approach will reveal what went wrong.',
      'One setback won\'t disrupt your methodical progress.',
    ],
    quiz_fail_low_neuroticism: [
      'Stay calm. The next attempt will be smoother 🦫',
      'Stress is optional. Learning is inevitable.',
      'Wrong answer? Water off a capybara\'s back.',
    ],
    streak: [
      '{streak}-day streak of peaceful progress 🦫',
      '{streak} days of calm, consistent learning.',
      'Your zen streak continues. Beautiful.',
    ],
    streak_at_risk: [
      'Time to save your {streak}-day serenity 🦫',
      '{streak} days of calm—protect the peace.',
      'One quiz to preserve your methodical momentum.',
    ],
    lesson_start: [
      'New unit: organize, calm, and conquer 🦫',
      'Fresh material ready for your methodical approach.',
      'Time to add structure to new concepts.',
    ],
    mistake_review: [
      'Calm analysis reveals patterns others miss 🦫',
      'Methodical review of what went sideways.',
      'Take your time. Understanding awaits.',
    ],
    level_up: [
      'Level up—your methodical journey continues 🦫',
      'Progress through peaceful persistence.',
      'New heights reached through calm discipline.',
    ],
    daily_motivation: [
      'Calm study session incoming. Maximum focus 🦫',
      'Time to organize today\'s learning.',
      'Let\'s progress steadily and serenely.',
    ],
  },

  // BEAR: Default (Hamster personality)
  // Traits: Grounded, observant, steady, independent
  bear: {
    quiz_pass: [
      'Solid work. You earned that score 🐻',
      'Another win built on steady effort.',
      'That\'s the reliable performance we expect.',
      'Your pace, your results. Excellent.',
    ],
    quiz_fail: [
      'Even the strongest bears stumble sometimes 🐻',
      'Wrong answer, right lesson learned.',
      'Steady progress includes occasional setbacks.',
      'You\'ll get the next one. No doubt about it.',
    ],
    quiz_pass_default: [
      'You set your own pace and it\'s working 🐻',
      'Independent learning pays off in results.',
      'Quiet wins are still wins. This one counts.',
    ],
    quiz_fail_default: [
      'Solo learners bounce back stronger 🐻',
      'This stumble won\'t stop your steady climb.',
      'Your independent approach will crack this next time.',
    ],
    streak: [
      '{streak}-day streak of grounded progress 🐻',
      '{streak} days at your own pace. That\'s solid.',
      'Your steady journey builds real strength.',
    ],
    streak_at_risk: [
      'Your {streak}-day foundation is worth protecting 🐻',
      '{streak} days of building something real.',
      'One quiz to keep your momentum alive.',
    ],
    lesson_start: [
      'New territory to explore at your own pace 🐻',
      'Fresh material ready for your thoughtful approach.',
      'Time to build mastery, step by step.',
    ],
    mistake_review: [
      'Grounded analysis shows you exactly what went wrong 🐻',
      'Your observant nature will catch the pattern.',
      'Review and learn at your own pace.',
    ],
    level_up: [
      'Level up—your steady climb continues 🐻',
      'Progress through persistent independence.',
      'New heights reached at your pace.',
    ],
    daily_motivation: [
      'Another day of progress at your pace 🐻',
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
  // For Fox (E + A)
  if (petType === 'fox') {
    if (scores.E >= 4 && context.includes('pass')) return 'quiz_pass_high_extraversion';
    if (scores.A >= 4 && context.includes('pass')) return 'quiz_pass_high_agreeableness';
    if (scores.E >= 4 && context.includes('fail')) return 'quiz_fail_high_extraversion';
    if (scores.A >= 4 && context.includes('fail')) return 'quiz_fail_high_agreeableness';
  }
  // For Bunny (O + E)
  if (petType === 'bunny') {
    if (scores.O >= 4 && context.includes('pass')) return 'quiz_pass_high_openness';
    if (scores.E >= 4 && context.includes('pass')) return 'quiz_pass_high_extraversion';
    if (scores.O >= 4 && context.includes('fail')) return 'quiz_fail_high_openness';
    if (scores.E >= 4 && context.includes('fail')) return 'quiz_fail_high_extraversion';
  }
  // For Void Cat (O + low E)
  if (petType === 'voidCat') {
    if (scores.O >= 4 && context.includes('pass')) return 'quiz_pass_high_openness';
    if (scores.E < 3 && context.includes('pass')) return 'quiz_pass_low_extraversion';
    if (scores.O >= 4 && context.includes('fail')) return 'quiz_fail_high_openness';
    if (scores.E < 3 && context.includes('fail')) return 'quiz_fail_low_extraversion';
  }
  // For Axolotl (C + A)
  if (petType === 'axolotl') {
    if (scores.C >= 4 && context.includes('pass')) return 'quiz_pass_high_conscientiousness';
    if (scores.A >= 4 && context.includes('pass')) return 'quiz_pass_high_agreeableness';
    if (scores.C >= 4 && context.includes('fail')) return 'quiz_fail_high_conscientiousness';
    if (scores.A >= 4 && context.includes('fail')) return 'quiz_fail_high_agreeableness';
  }
  // For Capybara (C + low N)
  if (petType === 'capybara') {
    if (scores.C >= 4 && context.includes('pass')) return 'quiz_pass_high_conscientiousness';
    if (scores.N < 3 && context.includes('pass')) return 'quiz_pass_low_neuroticism';
    if (scores.C >= 4 && context.includes('fail')) return 'quiz_fail_high_conscientiousness';
    if (scores.N < 3 && context.includes('fail')) return 'quiz_fail_low_neuroticism';
  }
  // For Bear (default)
  if (petType === 'bear' && context.includes('pass')) return 'quiz_pass_default';
  if (petType === 'bear' && context.includes('fail')) return 'quiz_fail_default';

  return null;
}
