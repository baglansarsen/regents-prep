// Strategy guides keyed by unit id. The NY US History Regents is a
// source-analysis exam, so guides target the analysis skill, not era recall.
export const STRATEGIES = {
  'us-history-doc': { // Document & Source Analysis
    mentalPrep: [
      'Read the attribution FIRST (who, when, what kind of source) — it frames how to read the document.',
      'Every source has a point of view; ask what the author wants you to believe and why.',
      'The answer must be supported BY THE DOCUMENT, not by outside facts you happen to know.',
    ],
    answeringTechniques: [
      'Underline the main idea, then match it to the choice that restates it.',
      'For founding-document and Supreme Court questions, connect the source to the constitutional principle it shows.',
      'Separate a fact stated in the source from an opinion or interpretation.',
    ],
    guessingStrategy: [
      'Eliminate choices that are true in general but NOT shown in the document.',
      'Absolute words ("all," "never") are usually wrong unless the source is that absolute.',
    ],
    processOfElimination: [
      'Cross out choices the source contradicts or never addresses.',
    ],
    timeManagement: [
      'Document sets cluster questions on one source — read it once, answer them together.',
    ],
  },
  'us-history-cau': { // Causation & Turning Points
    mentalPrep: [
      'Separate cause (comes before, produces) from effect (the result). Watch for "led to," "because," "resulted in."',
      'Know key turning points: the Revolution, Civil War, Industrialization, the New Deal, WWII, the Civil Rights Movement.',
      'Distinguish long-term causes (e.g., slavery, sectionalism) from short-term triggers (e.g., Fort Sumter).',
    ],
    answeringTechniques: [
      'Build a quick cause → event → effect chain before reading the choices.',
      'For "most immediate cause," choose the trigger closest in time; for "underlying cause," choose the condition.',
    ],
    guessingStrategy: [
      'Beware correlation-vs-causation: events in the same era are not automatically cause and effect.',
      'A choice that reverses cause and effect is wrong.',
    ],
    processOfElimination: [
      'Eliminate effects offered as causes (and vice versa).',
    ],
    timeManagement: [
      'Causation questions are quick once the chain is clear — bank time for document sets.',
    ],
  },
  'us-history-thm': { // Themes & Review
    mentalPrep: [
      'Know the recurring themes: federalism, checks and balances, civil rights, reform, foreign policy (isolation vs. intervention), immigration/migration.',
      'Hold one or two clear examples per theme you can apply across eras.',
    ],
    answeringTechniques: [
      'Identify the theme the question targets, then pick the example that best fits it.',
      'Comparison questions: find the trait two events or policies genuinely share.',
    ],
    guessingStrategy: [
      'When unsure, the broadest accurate generalization that fits the theme is usually correct.',
    ],
    processOfElimination: [
      'Eliminate choices true of only one case when the question asks what is common to both.',
    ],
    timeManagement: [
      'Answer clear thematic questions first; flag dense comparisons and return.',
    ],
  },
  'us-history-img': { // Images & Political Cartoons
    mentalPrep: [
      'Note the date and creator; a cartoon\'s meaning depends on its moment.',
      'Identify symbols (Uncle Sam, a trust as a giant/octopus) and labels, then the message.',
      'Decide whom the cartoonist is criticizing or supporting.',
    ],
    answeringTechniques: [
      'State the cartoon\'s message in one sentence, then pick the matching choice.',
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
  'us-history-map': { // Maps & Geography
    mentalPrep: [
      'Use the legend, scale, and compass; match shading/arrows to the key before interpreting.',
      'Geography drove US growth: westward expansion, rivers/railroads for trade, free vs. slave state lines.',
    ],
    answeringTechniques: [
      'Locate the regions named in the question, then read what the map shows about them.',
      'For movement arrows (migration, expansion), trace direction and what is moving.',
    ],
    guessingStrategy: [
      'Pick the choice the map actually depicts, not outside knowledge it does not show.',
    ],
    processOfElimination: [
      'Eliminate choices about regions not on the map or not in the legend.',
    ],
    timeManagement: [
      'Map questions are quick once you read the key — do them early.',
    ],
  },
}
