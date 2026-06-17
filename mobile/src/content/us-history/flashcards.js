import { TOPICS } from './questions'

// Source-analysis skills + high-frequency US-history concepts, tagged to the
// skill unit they support.
export const flashcards = [
  // ── Document & Source Analysis ──
  { topic: TOPICS.DOCUMENTS, term: 'Point of view (POV)', definition: 'Who wrote the source and how their role, era, or purpose shapes it. Ask: who, when, and why?' },
  { topic: TOPICS.DOCUMENTS, term: 'Sourcing', definition: 'Read the attribution (author, date, type) before the document to judge reliability and perspective.' },
  { topic: TOPICS.DOCUMENTS, term: 'Primary vs. secondary source', definition: 'Primary = from the time (letter, law, photo); secondary = later analysis (textbook). Both are useful for different reasons.' },
  { topic: TOPICS.DOCUMENTS, term: 'Corroboration', definition: 'Checking whether several sources agree; the strongest conclusions are supported by multiple documents.' },
  { topic: TOPICS.DOCUMENTS, term: 'Founding documents', definition: 'Declaration of Independence (1776), Constitution (1787), Bill of Rights (1791) — know each one\'s purpose.' },
  { topic: TOPICS.DOCUMENTS, term: 'Landmark Supreme Court cases', definition: 'Marbury v. Madison (judicial review), Brown v. Board (ended school segregation), Miranda (rights) — connect case to principle.' },
  // ── Causation & Turning Points ──
  { topic: TOPICS.CAUSATION, term: 'Cause vs. effect', definition: 'A cause comes before and produces an event; an effect is the result. Watch for "led to," "because," "resulted in."' },
  { topic: TOPICS.CAUSATION, term: 'Turning point', definition: 'An event that redirects history: the Civil War, the New Deal, WWII, the Civil Rights Movement.' },
  { topic: TOPICS.CAUSATION, term: 'Sectionalism', definition: 'Loyalty to regional (esp. North vs. South) interests over national unity — a long-term cause of the Civil War.' },
  { topic: TOPICS.CAUSATION, term: 'Manifest Destiny', definition: 'The 1800s belief the US was destined to expand to the Pacific — drove westward expansion and conflict.' },
  { topic: TOPICS.CAUSATION, term: 'Long- vs. short-term cause', definition: 'Underlying conditions (e.g., slavery) vs. immediate triggers (e.g., Fort Sumter).' },
  // ── Themes & Review ──
  { topic: TOPICS.THEMES, term: 'Federalism', definition: 'Power shared between national and state governments — a recurring constitutional theme.' },
  { topic: TOPICS.THEMES, term: 'Checks and balances', definition: 'Each branch limits the others (veto, judicial review, impeachment) to prevent concentrated power.' },
  { topic: TOPICS.THEMES, term: 'Civil rights movement', definition: 'Mid-1900s campaign to end segregation and secure equality (Brown v. Board, MLK, Civil Rights Act of 1964).' },
  { topic: TOPICS.THEMES, term: 'Progressive Era', definition: 'Early-1900s reforms against industrial abuses — trust-busting, labor laws, suffrage, muckrakers.' },
  { topic: TOPICS.THEMES, term: 'Foreign policy: isolation vs. intervention', definition: 'Recurring swing — Washington\'s neutrality, Monroe Doctrine, WWI/WWII entry, Cold War containment.' },
  { topic: TOPICS.THEMES, term: 'New Deal', definition: 'FDR\'s 1930s relief/recovery/reform response to the Great Depression — expanded the federal role.' },
  { topic: TOPICS.THEMES, term: 'Immigration & migration', definition: 'Waves of immigration and the Great Migration reshaped US society, cities, and politics.' },
  // ── Images & Political Cartoons ──
  { topic: TOPICS.IMAGES, term: 'Symbolism in cartoons', definition: 'Uncle Sam = the US, a trust = a giant/octopus. Identify the symbol, then the cartoonist\'s message.' },
  { topic: TOPICS.IMAGES, term: 'Reading an image', definition: 'Check the date, labels, and who is shown; decide the creator\'s viewpoint before answering.' },
  { topic: TOPICS.IMAGES, term: 'Propaganda', definition: 'Media promoting a cause (war bonds, recruitment) — emotional appeal, clear hero/villain, call to action.' },
  { topic: TOPICS.IMAGES, term: 'Muckrakers', definition: 'Progressive journalists who exposed corruption and abuse (e.g., photos of tenements, factory conditions).' },
  // ── Maps & Geography ──
  { topic: TOPICS.MAPS, term: 'Reading a map key', definition: 'Use the legend, scale, and direction; match shading/arrows to the legend before answering.' },
  { topic: TOPICS.MAPS, term: 'Westward expansion', definition: 'Louisiana Purchase, Oregon Trail, transcontinental railroad — geography drove growth and displacement.' },
  { topic: TOPICS.MAPS, term: 'Free vs. slave states', definition: 'Maps of the Missouri Compromise / Compromise of 1850 show the sectional balance that led to war.' },
]

export const FLASHCARD_TOPIC_LIST = [
  { label: 'All Topics', value: null },
  ...Array.from(new Set(flashcards.map((c) => c.topic))).map((t) => ({ label: t, value: t })),
]
