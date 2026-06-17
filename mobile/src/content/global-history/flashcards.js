import { TOPICS } from './questions'

// Flashcards mix source-analysis skills (the post-2019 exam's core) with
// high-frequency world-history concepts, tagged to the skill unit they support.
export const flashcards = [
  // ── Document & Source Analysis ──
  { topic: TOPICS.DOCUMENTS, term: 'Point of view (POV)', definition: 'Who wrote/created the source and how their position, background, or purpose shapes what they say. Always ask: who, when, and why?' },
  { topic: TOPICS.DOCUMENTS, term: 'Sourcing', definition: 'Reading the attribution (author, date, type) BEFORE the document to judge its reliability and perspective.' },
  { topic: TOPICS.DOCUMENTS, term: 'Bias', definition: 'A one-sided perspective. A biased source is still useful — it reveals the author\'s viewpoint and intent.' },
  { topic: TOPICS.DOCUMENTS, term: 'Primary vs. secondary source', definition: 'Primary = created during the time studied (letter, treaty, photo). Secondary = later analysis (textbook, article).' },
  { topic: TOPICS.DOCUMENTS, term: 'Corroboration', definition: 'Checking whether multiple sources agree; stronger claims are supported by several documents.' },
  { topic: TOPICS.DOCUMENTS, term: 'Audience & purpose', definition: 'Who the source was made for and why — propaganda, persuasion, record-keeping — changes how you read it.' },
  // ── Causation & Turning Points ──
  { topic: TOPICS.CAUSATION, term: 'Cause vs. effect', definition: 'A cause comes before and produces an event; an effect is the result. Watch for "led to," "resulted in," "because."' },
  { topic: TOPICS.CAUSATION, term: 'Turning point', definition: 'An event that produces lasting change in a different direction (e.g., Neolithic Revolution, fall of Rome, Industrial Revolution, WWII).' },
  { topic: TOPICS.CAUSATION, term: 'Correlation vs. causation', definition: 'Two things happening together is not proof one caused the other — look for a real mechanism.' },
  { topic: TOPICS.CAUSATION, term: 'Continuity & change', definition: 'What stays the same vs. what transforms over a period — a core comparison the exam tests.' },
  { topic: TOPICS.CAUSATION, term: 'Long- vs. short-term cause', definition: 'Underlying conditions (e.g., nationalism) vs. immediate triggers (e.g., assassination of Franz Ferdinand).' },
  // ── Images & Political Cartoons ──
  { topic: TOPICS.IMAGES, term: 'Symbolism in cartoons', definition: 'Cartoonists use symbols (a dove = peace, an octopus = an empire\'s reach). Identify the symbol, then the message.' },
  { topic: TOPICS.IMAGES, term: 'Caricature', definition: 'Exaggerating a figure\'s features to criticize or make a point about them.' },
  { topic: TOPICS.IMAGES, term: 'Reading an image', definition: 'Note the date, who/what is shown, the labels/captions, and the creator\'s likely viewpoint before choosing an answer.' },
  { topic: TOPICS.IMAGES, term: 'Propaganda', definition: 'Media designed to promote a viewpoint or cause; look for emotional appeals, a clear hero/villain, and a call to action.' },
  // ── Maps & Geography ──
  { topic: TOPICS.MAPS, term: 'Reading a map key', definition: 'Use the legend, scale, and direction. Match shaded regions/arrows to the legend before answering.' },
  { topic: TOPICS.MAPS, term: 'Geography shapes history', definition: 'Rivers, mountains, and coasts drive settlement, trade, and isolation (e.g., Nile, Himalayas, Mediterranean).' },
  { topic: TOPICS.MAPS, term: 'Diffusion', definition: 'The spread of ideas, goods, religions, or technology along trade routes (Silk Road, Indian Ocean).' },
  { topic: TOPICS.MAPS, term: 'Spheres of influence', definition: 'Regions where an outside power holds economic/political control — common on imperialism-era maps.' },
  // ── Themes & Review ──
  { topic: TOPICS.THEMES, term: 'Belief systems', definition: 'Hinduism, Buddhism, Judaism, Christianity, Islam, Confucianism — know core ideas and where they spread.' },
  { topic: TOPICS.THEMES, term: 'Nationalism', definition: 'Loyalty/devotion to one\'s nation; unified Germany and Italy and helped trigger WWI and decolonization.' },
  { topic: TOPICS.THEMES, term: 'Imperialism', definition: 'One country extending control over another\'s land, economy, or politics (19th-c. Africa and Asia).' },
  { topic: TOPICS.THEMES, term: 'Revolution', definition: 'A fundamental overthrow of a system (French, Russian, Industrial, Green) — know cause, change, and effect.' },
  { topic: TOPICS.THEMES, term: 'Globalization', definition: 'Growing interconnection of economies and cultures; speeds trade, migration, and the spread of ideas and disease.' },
  { topic: TOPICS.THEMES, term: 'Human rights', definition: 'Basic rights all people hold; the UN Universal Declaration (1948) followed WWII and the Holocaust.' },
]

export const FLASHCARD_TOPIC_LIST = [
  { label: 'All Topics', value: null },
  ...Array.from(new Set(flashcards.map((c) => c.topic))).map((t) => ({ label: t, value: t })),
]
