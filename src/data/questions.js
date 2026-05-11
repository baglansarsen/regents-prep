export const TOPICS = {
  CELL_BIOLOGY: 'Cell Biology',
  GENETICS: 'Genetics & Heredity',
  EVOLUTION: 'Evolution',
  ECOLOGY: 'Ecology',
  HUMAN_BODY: 'Human Body Systems',
  REPRODUCTION: 'Reproduction & Development',
}

export const TOPIC_ICONS = {
  [TOPICS.CELL_BIOLOGY]: '🔬',
  [TOPICS.GENETICS]: '🧬',
  [TOPICS.EVOLUTION]: '🦕',
  [TOPICS.ECOLOGY]: '🌿',
  [TOPICS.HUMAN_BODY]: '🫀',
  [TOPICS.REPRODUCTION]: '🌱',
}

export const questions = [
  // ── Cell Biology ────────────────────────────────────────────────────────────
  {
    id: 1,
    topic: TOPICS.CELL_BIOLOGY,
    text: 'Which organelle is responsible for producing ATP through cellular respiration?',
    choices: ['Ribosome', 'Mitochondria', 'Chloroplast', 'Nucleus'],
    correct: 1,
    explanation: 'Mitochondria convert glucose and oxygen into ATP through cellular respiration — they are the "powerhouses of the cell."',
  },
  {
    id: 2,
    topic: TOPICS.CELL_BIOLOGY,
    text: 'What is the primary function of the cell membrane?',
    choices: [
      'To produce proteins for the cell',
      'To control what enters and exits the cell',
      'To store genetic information',
      'To break down waste materials',
    ],
    correct: 1,
    explanation: 'The cell membrane is selectively permeable — it regulates which substances can pass in or out of the cell.',
  },
  {
    id: 3,
    topic: TOPICS.CELL_BIOLOGY,
    text: 'Which process allows water molecules to move from an area of high concentration to low concentration across a membrane?',
    choices: ['Active transport', 'Osmosis', 'Diffusion', 'Endocytosis'],
    correct: 1,
    explanation: 'Osmosis is the diffusion of water across a semipermeable membrane, moving from high water concentration to low water concentration.',
  },
  {
    id: 4,
    topic: TOPICS.CELL_BIOLOGY,
    text: 'A student observes a cell under a microscope and notices a large central vacuole and a rigid cell wall. This cell is most likely from a',
    choices: ['bacterium', 'animal', 'plant', 'fungus'],
    correct: 2,
    explanation: 'Plant cells have a large central vacuole for storage and a rigid cell wall made of cellulose — both absent in animal cells.',
  },
  {
    id: 5,
    topic: TOPICS.CELL_BIOLOGY,
    text: 'Enzymes are important for cellular activities because they',
    choices: [
      'provide energy for chemical reactions',
      'speed up chemical reactions without being used up',
      'carry genetic information',
      'transport materials across the cell membrane',
    ],
    correct: 1,
    explanation: 'Enzymes are biological catalysts — they lower activation energy and speed up reactions, and are not consumed in the process.',
  },

  // ── Genetics & Heredity ─────────────────────────────────────────────────────
  {
    id: 6,
    topic: TOPICS.GENETICS,
    text: 'In humans, the sex chromosomes of a female are represented as',
    choices: ['XY', 'XX', 'YY', 'XO'],
    correct: 1,
    explanation: 'Females have two X chromosomes (XX) and males have one X and one Y chromosome (XY).',
  },
  {
    id: 7,
    topic: TOPICS.GENETICS,
    text: 'A garden pea plant that is heterozygous for seed color (Yy) is crossed with a homozygous recessive plant (yy). What percentage of the offspring will have yellow seeds?',
    choices: ['25%', '50%', '75%', '100%'],
    correct: 1,
    explanation: 'A Yy × yy cross produces 50% Yy (yellow) and 50% yy (green) offspring.',
  },
  {
    id: 8,
    topic: TOPICS.GENETICS,
    text: 'Which type of mutation involves a change in a single base pair of DNA?',
    choices: ['Chromosomal mutation', 'Point mutation', 'Frameshift mutation', 'Deletion mutation'],
    correct: 1,
    explanation: 'A point mutation (or substitution) changes just one nucleotide base in the DNA sequence.',
  },
  {
    id: 9,
    topic: TOPICS.GENETICS,
    text: 'The sequence of bases in mRNA is determined by the sequence of bases in',
    choices: ['tRNA', 'ribosomes', 'DNA', 'proteins'],
    correct: 2,
    explanation: 'During transcription, mRNA is synthesized using DNA as a template — the mRNA base sequence is complementary to the DNA template strand.',
  },
  {
    id: 10,
    topic: TOPICS.GENETICS,
    text: 'Which term describes an organism that has two different alleles for a trait?',
    choices: ['Homozygous', 'Phenotype', 'Heterozygous', 'Recessive'],
    correct: 2,
    explanation: 'A heterozygous organism carries two different alleles for a gene (e.g., Tt), while homozygous organisms carry two identical alleles.',
  },

  // ── Evolution ───────────────────────────────────────────────────────────────
  {
    id: 11,
    topic: TOPICS.EVOLUTION,
    text: 'According to Darwin, the mechanism that drives evolutionary change is',
    choices: [
      'genetic engineering',
      'natural selection',
      'selective breeding',
      'gene mutations only',
    ],
    correct: 1,
    explanation: 'Natural selection — survival and reproduction of individuals best suited to their environment — is the primary mechanism Darwin proposed for evolution.',
  },
  {
    id: 12,
    topic: TOPICS.EVOLUTION,
    text: 'Fossils are important evidence for evolution because they',
    choices: [
      'show how organisms look today',
      'reveal the genetic code of extinct species',
      'provide a record of organisms that lived in the past',
      'prove that all species are related',
    ],
    correct: 2,
    explanation: 'Fossils document the history of life on Earth, showing how organisms have changed over time.',
  },
  {
    id: 13,
    topic: TOPICS.EVOLUTION,
    text: 'Two species of birds live in the same forest. One feeds on seeds near the ground and the other feeds on insects in the treetops. This is an example of',
    choices: ['competition', 'niche differentiation', 'mutualism', 'predation'],
    correct: 1,
    explanation: 'Niche differentiation (resource partitioning) allows two species to coexist by using different resources or microhabitats, reducing direct competition.',
  },
  {
    id: 14,
    topic: TOPICS.EVOLUTION,
    text: 'The wings of a bat and the arms of a human are considered homologous structures because they',
    choices: [
      'perform the same function',
      'have a similar appearance',
      'share a common evolutionary ancestor',
      'develop from the same embryonic tissue in all species',
    ],
    correct: 2,
    explanation: 'Homologous structures share a common ancestor even if they now serve different functions — evidence of divergent evolution.',
  },

  // ── Ecology ─────────────────────────────────────────────────────────────────
  {
    id: 15,
    topic: TOPICS.ECOLOGY,
    text: 'In a food chain, which organisms are always found at the first trophic level?',
    choices: ['Consumers', 'Decomposers', 'Producers', 'Carnivores'],
    correct: 2,
    explanation: 'Producers (plants and other photosynthetic organisms) form the base of every food chain by converting solar energy into chemical energy.',
  },
  {
    id: 16,
    topic: TOPICS.ECOLOGY,
    text: 'When a forest is cleared and a parking lot is built, the greatest immediate effect on the local ecosystem would be',
    choices: [
      'an increase in biodiversity',
      'a decrease in the water cycle disruption',
      'a loss of habitat for many species',
      'an increase in local precipitation',
    ],
    correct: 2,
    explanation: 'Habitat destruction is the leading cause of species loss — removing the forest eliminates food and shelter for the organisms that lived there.',
  },
  {
    id: 17,
    topic: TOPICS.ECOLOGY,
    text: 'Which of the following best describes a biotic factor in an ecosystem?',
    choices: ['Temperature', 'Amount of rainfall', 'Predator population', 'Soil composition'],
    correct: 2,
    explanation: 'Biotic factors are living components of an ecosystem (organisms). Predator populations are living things, while temperature, rainfall, and soil are abiotic.',
  },
  {
    id: 18,
    topic: TOPICS.ECOLOGY,
    text: 'Energy transfer between trophic levels in a food chain is approximately',
    choices: ['10% efficient', '50% efficient', '90% efficient', '100% efficient'],
    correct: 0,
    explanation: 'Only about 10% of energy is passed from one trophic level to the next — the rest is lost as heat during metabolism.',
  },

  // ── Human Body Systems ──────────────────────────────────────────────────────
  {
    id: 19,
    topic: TOPICS.HUMAN_BODY,
    text: 'Which system is responsible for producing hormones that regulate body functions?',
    choices: ['Nervous system', 'Endocrine system', 'Circulatory system', 'Digestive system'],
    correct: 1,
    explanation: 'The endocrine system produces hormones (chemical messengers) that travel through the blood to regulate growth, metabolism, and homeostasis.',
  },
  {
    id: 20,
    topic: TOPICS.HUMAN_BODY,
    text: 'The primary function of the kidneys is to',
    choices: [
      'produce digestive enzymes',
      'filter waste from the blood and regulate water balance',
      'exchange oxygen and carbon dioxide',
      'pump blood through the body',
    ],
    correct: 1,
    explanation: 'The kidneys filter blood, remove nitrogenous waste (urea), and maintain water/salt balance — key to homeostasis.',
  },
  {
    id: 21,
    topic: TOPICS.HUMAN_BODY,
    text: 'Which blood component is primarily responsible for fighting infection?',
    choices: ['Red blood cells', 'Platelets', 'Plasma', 'White blood cells'],
    correct: 3,
    explanation: 'White blood cells (leukocytes) are the immune system\'s main defense — they identify and destroy pathogens.',
  },
  {
    id: 22,
    topic: TOPICS.HUMAN_BODY,
    text: 'Gas exchange in the human respiratory system occurs in the',
    choices: ['trachea', 'bronchi', 'alveoli', 'diaphragm'],
    correct: 2,
    explanation: 'Alveoli are tiny air sacs in the lungs with thin walls and rich blood supply — the site where O₂ moves into blood and CO₂ moves out.',
  },

  // ── Reproduction & Development ──────────────────────────────────────────────
  {
    id: 23,
    topic: TOPICS.REPRODUCTION,
    text: 'Which process produces gametes (sex cells) with half the normal chromosome number?',
    choices: ['Mitosis', 'Binary fission', 'Meiosis', 'Budding'],
    correct: 2,
    explanation: 'Meiosis is a two-stage cell division that produces four haploid (n) gametes from one diploid (2n) cell.',
  },
  {
    id: 24,
    topic: TOPICS.REPRODUCTION,
    text: 'Differentiation in a developing embryo refers to',
    choices: [
      'the process of cells dividing rapidly',
      'cells becoming specialized for different functions',
      'the joining of egg and sperm cells',
      'the movement of cells during development',
    ],
    correct: 1,
    explanation: 'Differentiation is the process by which cells develop into specific types (muscle, nerve, skin) by expressing different genes, even though they all carry the same DNA.',
  },
  {
    id: 25,
    topic: TOPICS.REPRODUCTION,
    text: 'An advantage of sexual reproduction over asexual reproduction is that it',
    choices: [
      'requires only one parent',
      'produces offspring identical to the parent',
      'increases genetic variation in offspring',
      'is faster than asexual reproduction',
    ],
    correct: 2,
    explanation: 'Sexual reproduction combines alleles from two parents, creating genetic variation that can help populations adapt to changing environments.',
  },
]

export function getByTopic(topic) {
  return questions.filter((q) => q.topic === topic)
}

export function shuffled(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}
