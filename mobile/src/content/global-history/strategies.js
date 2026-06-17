// Strategy guides keyed by unit id. The post-2019 Global History Regents is a
// source-analysis exam, so guides target the analysis skill, not era recall.
export const STRATEGIES = {
  'global-history-doc': { // Document & Source Analysis
    mentalPrep: [
      'Read the attribution FIRST (who, when, what kind of source) before the document itself — it frames everything.',
      'Every document has a point of view; ask what the author wants you to think and why.',
      'The answer must be supported BY THE DOCUMENT — not by outside facts you happen to know.',
    ],
    answeringTechniques: [
      'Underline the claim or main idea of the passage, then match it to the choice that restates it.',
      'For "the author would most likely agree" questions, find the choice consistent with the document\'s viewpoint.',
      'Distinguish a fact stated in the source from an opinion or interpretation.',
    ],
    guessingStrategy: [
      'Eliminate choices that state something true in general but NOT shown in the document.',
      'Extreme words ("all," "never," "always") are usually wrong unless the document is that absolute.',
    ],
    processOfElimination: [
      'Cross out choices that contradict the source or that the source never addresses.',
    ],
    timeManagement: [
      'Document sets cluster several questions on one source — read it once, answer them together.',
    ],
  },
  'global-history-cau': { // Causation & Turning Points
    mentalPrep: [
      'Separate cause (comes before, produces) from effect (the result). Watch for "led to," "because," "resulted in."',
      'A turning point changes the direction of history — know a few cold (Neolithic Revolution, fall of Rome, Industrial Revolution, WWII, end of the Cold War).',
      'Distinguish long-term causes (underlying conditions) from short-term triggers (the spark).',
    ],
    answeringTechniques: [
      'Build a quick cause → event → effect chain in your head before reading the choices.',
      'For "most immediate cause," pick the trigger closest in time; for "underlying cause," pick the condition.',
    ],
    guessingStrategy: [
      'Beware correlation-vs-causation traps: two events in the same era are not automatically cause and effect.',
      'If a choice reverses cause and effect, it is wrong.',
    ],
    processOfElimination: [
      'Eliminate effects offered as causes (and vice versa).',
    ],
    timeManagement: [
      'Causation questions are quick once the chain is clear — bank time here for the document sets.',
    ],
  },
  'global-history-img': { // Images & Political Cartoons
    mentalPrep: [
      'Note the date and creator first — a cartoon\'s meaning depends on its moment.',
      'Identify the symbols and labels; cartoonists exaggerate (caricature) to make a point.',
      'Decide the creator\'s viewpoint: who are they criticizing or supporting?',
    ],
    answeringTechniques: [
      'State the cartoon\'s message in one sentence, then pick the choice that matches it.',
      'Use captions and labels as direct clues to the intended meaning.',
    ],
    guessingStrategy: [
      'The answer is usually the creator\'s OPINION, not a neutral description of the image.',
    ],
    processOfElimination: [
      'Eliminate literal "what is shown" choices when the question asks for the message or purpose.',
    ],
    timeManagement: [
      'Image questions are fast — read the labels and commit.',
    ],
  },
  'global-history-map': { // Maps & Geography
    mentalPrep: [
      'Use the legend, scale, and compass before interpreting; match shading/arrows to the key.',
      'Geography drives history: rivers and coasts enable trade; mountains and deserts isolate.',
      'Know empire/trade-route maps (Silk Road, Indian Ocean, imperial spheres of influence).',
    ],
    answeringTechniques: [
      'Locate the regions named in the question on the map first, then read what the map shows about them.',
      'For movement/diffusion arrows, trace the direction and what is spreading.',
    ],
    guessingStrategy: [
      'Pick the choice the map actually depicts — not outside knowledge the map does not show.',
    ],
    processOfElimination: [
      'Eliminate choices about regions not on the map or not addressed by the legend.',
    ],
    timeManagement: [
      'Map questions are quick once you read the key — do them early.',
    ],
  },
  'global-history-thm': { // Themes & Review
    mentalPrep: [
      'Know the recurring themes: belief systems, trade/diffusion, nationalism, imperialism, revolution, conflict, human rights.',
      'For each theme, hold one or two clear examples you can apply across eras.',
    ],
    answeringTechniques: [
      'Identify the theme the question targets, then choose the example that best fits it.',
      'Comparison questions: find the trait the two societies/events truly share.',
    ],
    guessingStrategy: [
      'When unsure, the broadest accurate generalization that fits the theme is usually correct.',
    ],
    processOfElimination: [
      'Eliminate choices that are true of only one case when the question asks what is common to both.',
    ],
    timeManagement: [
      'Flag dense comparison questions and return; answer the clear thematic ones first.',
    ],
  },
}
