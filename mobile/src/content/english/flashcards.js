import { TOPICS } from './questions'

// Reading-analysis skills + literary/rhetorical terms, tagged to the skill unit.
export const flashcards = [
  // ── Close Reading ──
  { topic: TOPICS.CLOSE_READING, term: 'Close reading', definition: 'Reading slowly for exactly what the text says and how it says it. Find the answer IN the passage, not from outside knowledge.' },
  { topic: TOPICS.CLOSE_READING, term: 'Cite textual evidence', definition: 'Point to the specific line/detail that supports your answer — the right choice can always be tied to the text.' },
  { topic: TOPICS.CLOSE_READING, term: 'Paraphrase', definition: 'Restate a line in your own words to test understanding; the correct choice usually paraphrases the text.' },
  { topic: TOPICS.CLOSE_READING, term: 'Detail vs. main point', definition: 'A true detail is not always the answer — match the choice to what the QUESTION asks.' },
  // ── Author's Craft & Tone ──
  { topic: TOPICS.CRAFT_TONE, term: 'Tone', definition: "The author's attitude toward the subject (e.g., nostalgic, critical, hopeful), conveyed through word choice." },
  { topic: TOPICS.CRAFT_TONE, term: 'Mood', definition: 'The feeling the text creates in the reader (e.g., tense, peaceful) — distinct from tone.' },
  { topic: TOPICS.CRAFT_TONE, term: 'Figurative language', definition: 'Metaphor, simile, personification, hyperbole — language meaning more than the literal words.' },
  { topic: TOPICS.CRAFT_TONE, term: 'Imagery', definition: 'Descriptive language appealing to the senses to create a vivid picture.' },
  { topic: TOPICS.CRAFT_TONE, term: 'Diction', definition: "An author's deliberate word choice, which shapes tone and meaning." },
  { topic: TOPICS.CRAFT_TONE, term: 'Characterization', definition: 'How an author reveals a character — through actions, speech, thoughts, and others\' reactions.' },
  { topic: TOPICS.CRAFT_TONE, term: 'Point of view', definition: 'Who narrates (first person "I", third-person limited/omniscient) and how that shapes what we know.' },
  // ── Central Idea & Theme ──
  { topic: TOPICS.CENTRAL_IDEA, term: 'Central idea', definition: 'The main point the whole passage develops — broader than any single detail.' },
  { topic: TOPICS.CENTRAL_IDEA, term: 'Theme', definition: 'A universal message or insight about life the text conveys (e.g., resilience, the cost of ambition).' },
  { topic: TOPICS.CENTRAL_IDEA, term: 'Summary', definition: 'A brief restatement of the key points; the best "central idea" choice covers the whole text, not one part.' },
  // ── Inference ──
  { topic: TOPICS.INFERENCE, term: 'Inference', definition: 'A logical conclusion drawn from textual clues + reasoning — what is implied, not stated outright.' },
  { topic: TOPICS.INFERENCE, term: 'Implication', definition: 'A meaning suggested by the text. "Suggests," "implies," and "most likely" signal an inference question.' },
  { topic: TOPICS.INFERENCE, term: 'Supported vs. unsupported', definition: 'A valid inference is backed by the text; eliminate choices that go beyond what the evidence allows.' },
  // ── Word Meaning in Context ──
  { topic: TOPICS.VOCAB_CONTEXT, term: 'Context clues', definition: 'Nearby words that reveal a word\'s meaning. Re-read the sentence and substitute each choice to test fit.' },
  { topic: TOPICS.VOCAB_CONTEXT, term: 'Connotation vs. denotation', definition: 'Denotation = dictionary meaning; connotation = emotional shade. The right "as used" answer fits BOTH the sentence and tone.' },
  { topic: TOPICS.VOCAB_CONTEXT, term: 'Multiple-meaning words', definition: 'Many words have several meanings — pick the one that fits THIS sentence, not the most common one.' },
  // ── Argument & Structure ──
  { topic: TOPICS.ARGUMENT, term: 'Claim', definition: "The author's main position or assertion in an argument." },
  { topic: TOPICS.ARGUMENT, term: 'Evidence', definition: 'Facts, examples, statistics, or expert testimony that support a claim.' },
  { topic: TOPICS.ARGUMENT, term: 'Rhetorical appeals', definition: 'Ethos (credibility), pathos (emotion), logos (logic) — how a writer persuades.' },
  { topic: TOPICS.ARGUMENT, term: 'Text structure', definition: 'How a text is organized (cause/effect, compare/contrast, problem/solution, chronological) to develop ideas.' },
  { topic: TOPICS.ARGUMENT, term: 'Counterclaim', definition: 'An opposing view the author raises (and usually rebuts) to strengthen their argument.' },
]

export const FLASHCARD_TOPIC_LIST = [
  { label: 'All Topics', value: null },
  ...Array.from(new Set(flashcards.map((c) => c.topic))).map((t) => ({ label: t, value: t })),
]
