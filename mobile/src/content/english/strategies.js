// Strategy guides keyed by unit id. The ELA Regents Part 1 is reading-comprehension
// MC, so guides target reading-analysis skills.
export const STRATEGIES = {
  'english-cr': { // Close Reading
    mentalPrep: [
      'Skim the question stems before reading so you know what to look for in the passage.',
      'The answer is always IN the text — never pick a choice based on outside opinion.',
      'Read for what the author actually says, not what you assume they mean.',
    ],
    answeringTechniques: [
      'For line-reference questions, re-read a sentence or two before AND after the cited lines for context.',
      'Paraphrase the relevant lines in your own words, then match to the closest choice.',
    ],
    guessingStrategy: [
      'Eliminate choices that are true in real life but not stated/implied in THIS passage.',
      'Extreme wording ("always," "never," "proves") is usually wrong in reading questions.',
    ],
    processOfElimination: [
      'Cross out choices that distort the text, are too narrow, or are too broad for what is asked.',
    ],
    timeManagement: [
      'Answer detail questions you can pin to a line first; flag big "central idea" ones for after.',
    ],
  },
  'english-cft': { // Author's Craft & Tone
    mentalPrep: [
      'Tone = the author\'s attitude; mood = the reader\'s feeling. Keep them straight.',
      'Spot figurative language (metaphor, simile, imagery) and ask what effect it creates.',
    ],
    answeringTechniques: [
      'For tone, find the loaded/connotative words and judge whether they lean positive, negative, or neutral.',
      '"The author uses X in order to…" questions ask for PURPOSE — answer the effect on the reader.',
    ],
    guessingStrategy: [
      'Tone is rarely extreme (not "furious" or "ecstatic") — moderate choices usually win.',
    ],
    processOfElimination: [
      'Eliminate devices that are not actually present in the cited lines.',
    ],
    timeManagement: [
      'Craft questions hinge on a few words — locate them and decide quickly.',
    ],
  },
  'english-ci': { // Central Idea & Theme
    mentalPrep: [
      'The central idea covers the WHOLE passage, not one paragraph or detail.',
      'Theme is the universal message; state it as a full idea ("perseverance overcomes hardship"), not one word.',
    ],
    answeringTechniques: [
      'After reading, sum up the passage in one sentence, then pick the choice closest to it.',
      'Check the opening and closing lines — central ideas are often framed there.',
    ],
    guessingStrategy: [
      'A choice that is true of only one part of the text is too narrow to be the central idea.',
    ],
    processOfElimination: [
      'Eliminate choices that are details, off-topic, or broader than the passage supports.',
    ],
    timeManagement: [
      'Do central-idea questions LAST for a passage — you understand the whole text better by then.',
    ],
  },
  'english-inf': { // Inference
    mentalPrep: [
      'An inference is a logical step BEYOND the literal text, but still anchored to evidence in it.',
      '"Suggests," "implies," "most likely," "can be concluded" all signal an inference question.',
    ],
    answeringTechniques: [
      'Find the textual clue first, then choose the conclusion that clue best supports.',
      'Ask: "Does the passage give me enough to know this?" If not, it\'s not the answer.',
    ],
    guessingStrategy: [
      'The best inference is the SMALLEST safe step from the text — not the most dramatic one.',
    ],
    processOfElimination: [
      'Eliminate choices that need information the passage never provides.',
    ],
    timeManagement: [
      'Inference questions take longer — locate the evidence before weighing choices.',
    ],
  },
  'english-voc': { // Word Meaning in Context
    mentalPrep: [
      'The "right" meaning is the one that fits THIS sentence — not the word\'s most common meaning.',
      'Use the surrounding sentence as a definition clue.',
    ],
    answeringTechniques: [
      'Substitute each choice into the sentence; the one that keeps the meaning intact is correct.',
      'Match connotation too — a positive context needs a positive-shaded word.',
    ],
    guessingStrategy: [
      'Beware the "obvious" common meaning trap on multiple-meaning words.',
    ],
    processOfElimination: [
      'Eliminate choices that change the sentence\'s meaning or tone.',
    ],
    timeManagement: [
      'Vocabulary-in-context questions are quick — substitute and move on.',
    ],
  },
  'english-arg': { // Argument & Structure
    mentalPrep: [
      'Identify the author\'s claim and the evidence/appeals (ethos, pathos, logos) used to support it.',
      'Notice the structure: cause/effect, compare/contrast, problem/solution, chronological.',
    ],
    answeringTechniques: [
      'For "in order to / the function of" questions, ask how that part advances the overall argument.',
      'Distinguish the claim from the evidence and from a counterclaim.',
    ],
    guessingStrategy: [
      'A choice describing HOW the text is built (not just what it says) usually answers structure questions.',
    ],
    processOfElimination: [
      'Eliminate choices that misidentify the author\'s position or the role of a paragraph.',
    ],
    timeManagement: [
      'Structure questions reward seeing the big picture — skim how paragraphs connect first.',
    ],
  },
}
