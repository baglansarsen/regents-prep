export const TOPICS = {
  CELLS:          'Cells & Cell Processes',
  GENETICS:       'Genetics & Heredity',
  EVOLUTION:      'Evolution & Natural Selection',
  ECOSYSTEMS:     'Ecosystems & Ecology',
  HUMAN_BODY:     'Human Body Systems',
  CLASSIFICATION: 'Classification of Life',
}

export const TOPIC_ICONS = {
  [TOPICS.CELLS]:          '🔬',
  [TOPICS.GENETICS]:       '🧬',
  [TOPICS.EVOLUTION]:      '🦕',
  [TOPICS.ECOSYSTEMS]:     '🌿',
  [TOPICS.HUMAN_BODY]:     '🫀',
  [TOPICS.CLASSIFICATION]: '🌳',
}

export const questions = [
  // ── Cells & Cell Processes ──────────────────────────────────────────────────
  {
    id: 4001,
    topic: TOPICS.CELLS,
    text: 'Which organelle is known as the "powerhouse of the cell" because it produces ATP?',
    choices: ['Ribosome', 'Mitochondria', 'Vacuole', 'Golgi apparatus'],
    correct: 1,
    explanation: 'Mitochondria convert glucose and oxygen into ATP through cellular respiration, supplying the cell with usable energy.',
  },
  {
    id: 4002,
    topic: TOPICS.CELLS,
    text: 'Which structure is found in plant cells but NOT in animal cells?',
    choices: ['Mitochondria', 'Cell membrane', 'Cell wall', 'Nucleus'],
    correct: 2,
    explanation: 'Plant cells have a rigid cell wall made of cellulose that provides structural support. Animal cells have only a flexible cell membrane.',
  },
  {
    id: 4003,
    topic: TOPICS.CELLS,
    text: 'The movement of water across a selectively permeable membrane from an area of high water concentration to low water concentration is called',
    choices: ['Active transport', 'Osmosis', 'Diffusion', 'Endocytosis'],
    correct: 1,
    explanation: 'Osmosis is the passive movement of water molecules through a semipermeable membrane down their concentration gradient.',
  },
  {
    id: 4004,
    topic: TOPICS.CELLS,
    text: 'Which process allows plants to convert light energy into chemical energy stored in glucose?',
    choices: ['Cellular respiration', 'Fermentation', 'Photosynthesis', 'Transpiration'],
    correct: 2,
    explanation: 'Photosynthesis occurs in chloroplasts using light, CO₂, and water to produce glucose and oxygen.',
  },
  {
    id: 4005,
    topic: TOPICS.CELLS,
    text: 'Which organelle directs all cell activities by containing the cell\'s genetic information?',
    choices: ['Ribosome', 'Nucleus', 'Endoplasmic reticulum', 'Lysosome'],
    correct: 1,
    explanation: 'The nucleus houses DNA and controls all cellular processes by directing protein synthesis and regulating gene expression.',
  },
  {
    id: 4006,
    topic: TOPICS.CELLS,
    text: 'During which phase of the cell cycle does DNA replication occur?',
    choices: ['Mitosis', 'Cytokinesis', 'G2 phase', 'S phase'],
    correct: 3,
    explanation: 'DNA replication takes place during the S (synthesis) phase of interphase, before the cell enters mitosis.',
  },
  {
    id: 4007,
    topic: TOPICS.CELLS,
    text: 'A cell placed in a hypertonic solution will most likely',
    choices: ['swell and burst', 'shrink due to water loss', 'remain unchanged', 'undergo mitosis faster'],
    correct: 1,
    explanation: 'In a hypertonic solution the solute concentration is higher outside the cell, so water exits the cell by osmosis, causing the cell to shrink (crenate).',
  },
  {
    id: 4008,
    topic: TOPICS.CELLS,
    text: 'Ribosomes are responsible for',
    choices: ['breaking down old cell parts', 'producing ATP', 'synthesizing proteins', 'packaging proteins for export'],
    correct: 2,
    explanation: 'Ribosomes translate mRNA into polypeptide chains (proteins) using amino acids delivered by tRNA.',
  },

  // ── Genetics & Heredity ─────────────────────────────────────────────────────
  {
    id: 4051,
    topic: TOPICS.GENETICS,
    text: 'What is the correct base-pairing rule in DNA?',
    choices: ['A pairs with C; G pairs with T', 'A pairs with G; T pairs with C', 'A pairs with T; G pairs with C', 'A pairs with U; G pairs with C'],
    correct: 2,
    explanation: 'In DNA, adenine always pairs with thymine (A-T) and guanine always pairs with cytosine (G-C) via hydrogen bonds.',
  },
  {
    id: 4052,
    topic: TOPICS.GENETICS,
    text: 'A plant with genotype Tt is crossed with a plant with genotype tt. What fraction of offspring will be tall (T is dominant)?',
    choices: ['0%', '25%', '50%', '100%'],
    correct: 2,
    explanation: 'The cross Tt × tt produces offspring Tt and tt in a 1:1 ratio, so 50% will be tall (Tt) and 50% will be short (tt).',
  },
  {
    id: 4053,
    topic: TOPICS.GENETICS,
    text: 'A mutation that changes one nucleotide in a codon and results in no amino acid change is called a',
    choices: ['frameshift mutation', 'nonsense mutation', 'silent mutation', 'missense mutation'],
    correct: 2,
    explanation: 'A silent (synonymous) mutation changes a single base but does not alter the amino acid coded due to the redundancy of the genetic code.',
  },
  {
    id: 4054,
    topic: TOPICS.GENETICS,
    text: 'Sex-linked traits are most often carried on the',
    choices: ['autosomes', 'X chromosome', 'Y chromosome', 'mitochondrial DNA'],
    correct: 1,
    explanation: 'Most sex-linked traits are X-linked because the X chromosome carries many more genes than the Y chromosome.',
  },
  {
    id: 4055,
    topic: TOPICS.GENETICS,
    text: 'Which process produces gametes (sperm and egg cells) with half the chromosome number of the parent cell?',
    choices: ['Mitosis', 'Binary fission', 'Meiosis', 'Budding'],
    correct: 2,
    explanation: 'Meiosis reduces the chromosome number by half (from diploid 2n to haploid n), ensuring the correct chromosome number is restored at fertilization.',
  },
  {
    id: 4056,
    topic: TOPICS.GENETICS,
    text: 'In an organism with the genotype AaBb, how many unique types of gametes can be produced?',
    choices: ['1', '2', '4', '8'],
    correct: 2,
    explanation: 'Each pair of alleles segregates independently. AaBb can produce AB, Ab, aB, and ab gametes — 4 unique types.',
  },
  {
    id: 4057,
    topic: TOPICS.GENETICS,
    text: 'What is the role of mRNA in protein synthesis?',
    choices: ['It carries amino acids to the ribosome', 'It copies DNA in the nucleus', 'It carries the genetic message from DNA to the ribosome', 'It catalyzes peptide bond formation'],
    correct: 2,
    explanation: 'mRNA is transcribed from DNA in the nucleus and travels to the ribosome, where its codons are translated into an amino acid sequence.',
  },

  // ── Evolution & Natural Selection ───────────────────────────────────────────
  {
    id: 4101,
    topic: TOPICS.EVOLUTION,
    text: 'Which of the following best describes natural selection?',
    choices: [
      'Organisms change traits during their lifetime to survive',
      'Individuals with favorable traits are more likely to survive and reproduce',
      'Mutations always produce beneficial traits',
      'All members of a species evolve at the same rate',
    ],
    correct: 1,
    explanation: 'Natural selection acts on heritable variation: individuals with traits that improve survival and reproduction pass those traits to more offspring.',
  },
  {
    id: 4102,
    topic: TOPICS.EVOLUTION,
    text: 'Homologous structures in different species suggest that the species',
    choices: ['evolved convergently', 'share a common ancestor', 'have identical DNA', 'live in the same habitat'],
    correct: 1,
    explanation: 'Homologous structures (e.g., the forelimbs of humans, whales, and bats) share underlying anatomy inherited from a common ancestor, evidence of divergent evolution.',
  },
  {
    id: 4103,
    topic: TOPICS.EVOLUTION,
    text: 'The fossil record supports evolution primarily by showing',
    choices: [
      'that all species appeared at the same time',
      'gradual changes in organisms over time in rock layers',
      'that mutations are always harmful',
      'that species never go extinct',
    ],
    correct: 1,
    explanation: 'Fossils found in successive rock strata show transitional forms and gradual anatomical changes, providing direct evidence for evolution over geologic time.',
  },
  {
    id: 4104,
    topic: TOPICS.EVOLUTION,
    text: 'Which observation most directly supports the idea of genetic variation within a population?',
    choices: [
      'All giraffes have the same neck length',
      'Individual beetles in a population differ in shell color',
      'Two species of fish live in the same lake',
      'A mutation appears in every organism',
    ],
    correct: 1,
    explanation: 'Variation in shell color among individual beetles demonstrates heritable differences within a population — the raw material for natural selection.',
  },
  {
    id: 4105,
    topic: TOPICS.EVOLUTION,
    text: 'Antibiotic resistance in bacteria develops most quickly because bacteria',
    choices: [
      'choose to mutate when antibiotics are present',
      'reproduce slowly, allowing time for adaptation',
      'reproduce rapidly, and resistant variants are strongly selected',
      'share resistance genes with humans',
    ],
    correct: 2,
    explanation: 'Bacteria reproduce in minutes. Any rare individual with a resistance mutation quickly becomes the dominant genotype when antibiotics eliminate non-resistant competitors.',
  },

  // ── Ecosystems & Ecology ────────────────────────────────────────────────────
  {
    id: 4151,
    topic: TOPICS.ECOSYSTEMS,
    text: 'Which trophic level contains the most energy in an ecosystem?',
    choices: ['Primary consumers', 'Secondary consumers', 'Producers', 'Decomposers'],
    correct: 2,
    explanation: 'Producers (plants and other autotrophs) capture solar energy and form the base of every food chain; each successive trophic level contains only ~10% of the energy of the level below.',
  },
  {
    id: 4152,
    topic: TOPICS.ECOSYSTEMS,
    text: 'What is the role of decomposers in an ecosystem?',
    choices: [
      'They convert sunlight into glucose',
      'They break down dead organisms and recycle nutrients',
      'They consume primary consumers for energy',
      'They fix atmospheric nitrogen in roots',
    ],
    correct: 1,
    explanation: 'Decomposers (bacteria and fungi) break down organic matter into inorganic nutrients, returning them to the soil for producers to reuse.',
  },
  {
    id: 4153,
    topic: TOPICS.ECOSYSTEMS,
    text: 'A sudden decrease in the number of wolves in a forest ecosystem would most likely cause the deer population to',
    choices: ['decrease', 'remain unchanged', 'increase', 'migrate to another biome'],
    correct: 2,
    explanation: 'Wolves are predators that regulate deer populations. Fewer wolves reduces predation pressure, allowing deer numbers to rise.',
  },
  {
    id: 4154,
    topic: TOPICS.ECOSYSTEMS,
    text: 'Which term describes all the populations of different species living and interacting in the same area?',
    choices: ['Ecosystem', 'Community', 'Biosphere', 'Population'],
    correct: 1,
    explanation: 'A community includes all populations of different species in a given area. An ecosystem adds the abiotic (non-living) factors to the community.',
  },
  {
    id: 4155,
    topic: TOPICS.ECOSYSTEMS,
    text: 'Approximately what percentage of energy is transferred from one trophic level to the next in a typical food chain?',
    choices: ['1%', '10%', '50%', '90%'],
    correct: 1,
    explanation: 'The 10% rule states that roughly 10% of energy stored in one trophic level is converted to biomass in the next; the rest is lost as heat.',
  },

  // ── Human Body Systems ──────────────────────────────────────────────────────
  {
    id: 4201,
    topic: TOPICS.HUMAN_BODY,
    text: 'Which chamber of the heart pumps oxygenated blood to the entire body?',
    choices: ['Right atrium', 'Right ventricle', 'Left atrium', 'Left ventricle'],
    correct: 3,
    explanation: 'The left ventricle has the thickest walls and generates the pressure needed to pump oxygenated blood through the aorta to the systemic circulation.',
  },
  {
    id: 4202,
    topic: TOPICS.HUMAN_BODY,
    text: 'Which organ is responsible for filtering blood and producing urine?',
    choices: ['Liver', 'Pancreas', 'Kidney', 'Spleen'],
    correct: 2,
    explanation: 'Kidneys filter blood to remove waste products (mainly urea), excess water, and ions, producing urine that is excreted from the body.',
  },
  {
    id: 4203,
    topic: TOPICS.HUMAN_BODY,
    text: 'The primary function of the small intestine is to',
    choices: [
      'store and concentrate bile',
      'absorb water from indigestible food',
      'absorb nutrients from digested food into the bloodstream',
      'produce digestive enzymes only',
    ],
    correct: 2,
    explanation: 'The small intestine, lined with villi and microvilli, is the main site of nutrient absorption into blood capillaries and lacteals.',
  },
  {
    id: 4204,
    topic: TOPICS.HUMAN_BODY,
    text: 'Which type of blood vessel carries blood away from the heart?',
    choices: ['Vein', 'Capillary', 'Artery', 'Venule'],
    correct: 2,
    explanation: 'Arteries carry blood away from the heart under high pressure. Veins return blood to the heart; capillaries are the sites of gas and nutrient exchange.',
  },
  {
    id: 4205,
    topic: TOPICS.HUMAN_BODY,
    text: 'Which component of the immune system produces antibodies?',
    choices: ['Red blood cells', 'Platelets', 'B lymphocytes (B cells)', 'Neutrophils'],
    correct: 2,
    explanation: 'B cells (B lymphocytes) differentiate into plasma cells that secrete antibodies specific to foreign antigens.',
  },

  // ── Classification of Life ──────────────────────────────────────────────────
  {
    id: 4251,
    topic: TOPICS.CLASSIFICATION,
    text: 'Which of the following represents the correct order of taxonomic classification from broadest to most specific?',
    choices: [
      'Kingdom → Phylum → Class → Order → Family → Genus → Species',
      'Species → Genus → Family → Order → Class → Phylum → Kingdom',
      'Kingdom → Class → Phylum → Order → Family → Genus → Species',
      'Domain → Family → Class → Genus → Order → Species',
    ],
    correct: 0,
    explanation: 'The standard hierarchy from broadest to most specific is: Domain, Kingdom, Phylum, Class, Order, Family, Genus, Species — remembered by "Dear King Philip Came Over For Good Spaghetti."',
  },
  {
    id: 4252,
    topic: TOPICS.CLASSIFICATION,
    text: 'An organism that is prokaryotic, unicellular, and lacks a membrane-bound nucleus belongs to domain',
    choices: ['Eukarya', 'Protista', 'Bacteria or Archaea', 'Fungi'],
    correct: 2,
    explanation: 'Bacteria and Archaea are the two domains of prokaryotes — single-celled organisms without a true nucleus or membrane-bound organelles.',
  },
  {
    id: 4253,
    topic: TOPICS.CLASSIFICATION,
    text: 'Two organisms that share the same genus but different species are most closely related compared to organisms that share the same',
    choices: ['family but different genera', 'order but different families', 'class but different orders', 'phylum but different classes'],
    correct: 0,
    explanation: 'Shared genus (same genus, different species) indicates the closest relationship among the options; shared family but different genera is the next less-specific grouping.',
  },
  {
    id: 4254,
    topic: TOPICS.CLASSIFICATION,
    text: 'Which kingdom includes multicellular organisms that obtain nutrients by absorbing organic material from their environment?',
    choices: ['Plantae', 'Animalia', 'Fungi', 'Protista'],
    correct: 2,
    explanation: 'Fungi are heterotrophs that secrete enzymes to digest organic material externally, then absorb the nutrients — this distinguishes them from animals (ingest) and plants (photosynthesize).',
  },
]

export function getByTopic(topic) {
  return questions.filter((q) => q.topic === topic)
}

export function buildDiagnosticSet(count = 20) {
  const topicList = Object.values(TOPICS)
  const perTopic = Math.floor(count / topicList.length)
  const result = []
  for (const topic of topicList) {
    const pool = getByTopic(topic)
    result.push(...pool.sort(() => Math.random() - 0.5).slice(0, perTopic))
  }
  return result.sort(() => Math.random() - 0.5).slice(0, count)
}

export function shuffled() {
  return [...questions].sort(() => Math.random() - 0.5)
}
