export const TOPICS = {
  CELL_BIOLOGY: 'Cell Biology',
  GENETICS: 'Genetics & Heredity',
  EVOLUTION: 'Evolution',
  ECOLOGY: 'Ecology',
  HUMAN_BODY: 'Human Body Systems',
  PHOTOSYNTHESIS: 'Photosynthesis & Respiration',
  REPRODUCTION: 'Reproduction & Development',
  VISUAL: 'Visual Questions',
}

export const TOPIC_ICONS = {
  [TOPICS.CELL_BIOLOGY]: '🔬',
  [TOPICS.GENETICS]: '🧬',
  [TOPICS.EVOLUTION]: '🦕',
  [TOPICS.ECOLOGY]: '🌿',
  [TOPICS.HUMAN_BODY]: '🫀',
  [TOPICS.PHOTOSYNTHESIS]: '☀️',
  [TOPICS.REPRODUCTION]: '🌱',
  [TOPICS.VISUAL]: '🖼️',
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
    context: 'A student placed a carrot strip in a beaker of highly concentrated salt water. After 30 minutes, the carrot became limp and its mass had decreased. The student concluded that water molecules had crossed the carrot cells\' membranes into the surrounding solution.',
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
    diagram: { type: 'punnett', alleles: { parent1: ['Y', 'y'], parent2: ['y', 'y'] }, title: 'Yy × yy Cross' },
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
    diagram: { type: 'foodweb' },
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

  // ── Cell Biology (continued) ─────────────────────────────────────────────
  {
    id: 26,
    topic: TOPICS.CELL_BIOLOGY,
    text: 'Which organelle is responsible for synthesizing proteins?',
    choices: ['Mitochondria', 'Ribosome', 'Lysosome', 'Vacuole'],
    correct: 1,
    explanation: 'Ribosomes are the sites of protein synthesis — they read mRNA and assemble amino acids into proteins.',
  },
  {
    id: 27,
    topic: TOPICS.CELL_BIOLOGY,
    text: 'Photosynthesis takes place in which organelle?',
    choices: ['Mitochondria', 'Nucleus', 'Chloroplast', 'Ribosome'],
    correct: 2,
    explanation: 'Chloroplasts contain chlorophyll and are the sites of photosynthesis, converting light energy into glucose.',
  },
  {
    id: 28,
    topic: TOPICS.CELL_BIOLOGY,
    context: 'Cells lining the kidney tubules must reclaim glucose from fluid that will become urine. They move glucose from a lower concentration in the tubule fluid into the blood, where glucose concentration is already higher. Researchers found this process stops completely when the cells are deprived of oxygen.',
    text: 'Which type of cellular transport requires the use of ATP energy?',
    choices: ['Osmosis', 'Diffusion', 'Active transport', 'Facilitated diffusion'],
    correct: 2,
    explanation: 'Active transport moves substances against the concentration gradient and requires ATP, unlike passive transport processes.',
  },
  {
    id: 29,
    topic: TOPICS.CELL_BIOLOGY,
    text: 'The Golgi apparatus is responsible for',
    choices: [
      'producing ATP through respiration',
      'packaging and shipping proteins out of the cell',
      'storing the cell\'s genetic material',
      'breaking down old organelles',
    ],
    correct: 1,
    explanation: 'The Golgi apparatus processes, packages, and ships proteins and lipids to their destinations inside or outside the cell.',
  },
  {
    id: 30,
    topic: TOPICS.CELL_BIOLOGY,
    context: 'A student prepared three beakers: Beaker A held pure distilled water, Beaker B held normal saline (0.9% NaCl), and Beaker C held 5% NaCl solution — much saltier than blood plasma. Identical samples of red blood cells were placed in each beaker and examined under a microscope after five minutes. Cells in Beaker A appeared to swell; cells in Beaker B looked normal; cells in Beaker C looked noticeably smaller and wrinkled.',
    text: 'A cell is placed in a solution with a higher solute concentration than the cell\'s interior. The cell will most likely',
    choices: [
      'swell and burst',
      'remain unchanged',
      'shrink as water leaves the cell',
      'absorb solute molecules',
    ],
    correct: 2,
    explanation: 'In a hypertonic solution, water moves out of the cell by osmosis toward higher solute concentration, causing the cell to shrink (crenation).',
  },

  // ── Genetics & Heredity (continued) ─────────────────────────────────────
  {
    id: 31,
    topic: TOPICS.GENETICS,
    text: 'The process by which DNA makes an exact copy of itself is called',
    choices: ['Transcription', 'Translation', 'Replication', 'Mutation'],
    correct: 2,
    explanation: 'DNA replication occurs during the S phase of the cell cycle — each strand serves as a template to produce two identical double-stranded DNA molecules.',
  },
  {
    id: 32,
    topic: TOPICS.GENETICS,
    text: 'Which molecule carries amino acids to the ribosome during protein synthesis?',
    choices: ['mRNA', 'DNA', 'tRNA', 'rRNA'],
    correct: 2,
    explanation: 'Transfer RNA (tRNA) has an anticodon that matches the mRNA codon and carries the corresponding amino acid to the ribosome.',
  },
  {
    id: 33,
    topic: TOPICS.GENETICS,
    context: 'A genetics student studied a child whose father has Type A blood and whose mother has Type B blood. When the student tested the child\'s red blood cells, she found that both anti-A and anti-B test antibodies caused clumping — indicating both A and B surface proteins were present. Unlike typical dominant-recessive traits, neither allele appeared to suppress the other.',
    text: 'A person with type AB blood has codominant alleles. This means',
    choices: [
      'one allele is dominant over the other',
      'both alleles are equally expressed in the phenotype',
      'neither allele is expressed',
      'the alleles combine to form a blended trait',
    ],
    correct: 1,
    explanation: 'Codominance means both alleles are fully expressed — a person with AB blood produces both A and B antigens on their red blood cells.',
  },
  {
    id: 34,
    topic: TOPICS.GENETICS,
    context: 'During meiosis, chromosome pairs are supposed to separate equally so each gamete receives one copy of each chromosome. A cell biologist studied a case where chromosome 21 failed to separate properly during meiosis II — a process called nondisjunction. One resulting gamete received two copies of chromosome 21. When this gamete was fertilized by a normal gamete carrying one copy of chromosome 21, the zygote had three copies total.',
    text: 'Down syndrome (trisomy 21) is caused by',
    choices: [
      'a point mutation in chromosome 21',
      'an extra copy of chromosome 21',
      'a deletion of part of chromosome 21',
      'a recessive allele on chromosome 21',
    ],
    correct: 1,
    explanation: 'Down syndrome results from nondisjunction during meiosis, producing an egg or sperm with an extra chromosome 21, giving the offspring three copies (trisomy).',
  },
  {
    id: 35,
    topic: TOPICS.GENETICS,
    text: 'The order of information flow in the central dogma of molecular biology is',
    choices: ['RNA → DNA → Protein', 'DNA → RNA → Protein', 'Protein → DNA → RNA', 'DNA → Protein → RNA'],
    correct: 1,
    explanation: 'The central dogma: DNA is transcribed into mRNA, which is then translated into a protein — DNA → RNA → Protein.',
  },

  // ── Evolution (continued) ────────────────────────────────────────────────
  {
    id: 36,
    topic: TOPICS.EVOLUTION,
    context: 'In the 1940s, penicillin was introduced and effectively killed nearly all Staphylococcus bacteria. Doctors prescribed it widely. By the 1960s, some strains could no longer be killed by penicillin. Researchers confirmed that no individual bacterium changed during its own lifetime — resistant bacteria were those that happened to already carry a random genetic variation allowing survival, and they reproduced while others died.',
    text: 'Antibiotic resistance in bacteria is an example of',
    choices: [
      'Lamarckian inheritance',
      'natural selection acting on existing variation',
      'directed mutation',
      'genetic engineering',
    ],
    correct: 1,
    explanation: 'Bacteria with random mutations that resist antibiotics survive and reproduce — natural selection increases the frequency of resistance genes in the population.',
  },
  {
    id: 37,
    topic: TOPICS.EVOLUTION,
    text: 'The whale\'s flipper and a human arm are considered homologous structures. Which is the best evidence they share a common ancestor?',
    choices: [
      'They perform the same function',
      'They are made of the same materials',
      'They have similar underlying bone arrangements',
      'They look identical on the outside',
    ],
    correct: 2,
    explanation: 'Homologous structures share the same basic bone arrangement (humerus, radius, ulna, etc.) inherited from a common ancestor, even if their functions differ.',
  },
  {
    id: 38,
    topic: TOPICS.EVOLUTION,
    context: 'Scientists studying squirrels at the Grand Canyon found two distinct populations: the Kaibab squirrel on the north rim and the Abert squirrel on the south rim. Though only about 10 miles apart by air, the two populations have noticeably different coat patterns and cannot interbreed. Fossil evidence suggests both descended from a single population that lived in the area before the Colorado River carved the canyon over thousands of years.',
    text: 'When a population is divided by a geographic barrier and the two groups evolve separately into different species, the process is called',
    choices: ['Convergent evolution', 'Coevolution', 'Allopatric speciation', 'Adaptive radiation'],
    correct: 2,
    explanation: 'Allopatric speciation occurs when a geographic barrier isolates a population; the separated groups accumulate different mutations over time until they can no longer interbreed.',
  },
  {
    id: 39,
    topic: TOPICS.EVOLUTION,
    context: 'During his voyage on the HMS Beagle, Charles Darwin observed that finch populations on different Galápagos islands had differently shaped beaks suited to local food sources. He also read Malthus\'s work showing that populations grow faster than food supplies, leading to competition for resources. Darwin noted that individuals within a population vary in their traits, and some traits help individuals survive and reproduce.',
    text: 'Which observation led Darwin to develop his theory of natural selection?',
    choices: [
      'All organisms have identical DNA sequences',
      'Offspring show variation, and not all survive to reproduce',
      'Environments remain stable over long periods',
      'Mutations are always harmful',
    ],
    correct: 1,
    explanation: 'Darwin observed that populations produce more offspring than can survive, individuals vary, and those best suited to the environment are more likely to survive and reproduce.',
  },

  // ── Ecology (continued) ──────────────────────────────────────────────────
  {
    id: 40,
    topic: TOPICS.ECOLOGY,
    context: 'In 1944, 24 reindeer were released on an isolated Alaskan island with no predators and abundant lichen. The population grew rapidly for two decades, reaching nearly 6,000 animals by the mid-1960s. Within two years the population crashed to only 42 animals. Researchers documented that the lichen — the reindeer\'s primary food source — had been almost completely consumed and could not regenerate quickly enough to sustain the herd.',
    text: 'The maximum population size an environment can support indefinitely is called the',
    choices: ['Population density', 'Carrying capacity', 'Biotic potential', 'Limiting factor'],
    correct: 1,
    explanation: 'Carrying capacity (K) is the largest population size that the available resources of a habitat can sustain long-term.',
  },
  {
    id: 41,
    topic: TOPICS.ECOLOGY,
    context: 'A marine biologist observed several species interactions on a coral reef. In one case, clownfish were observed living among the tentacles of sea anemones. The anemone\'s stinging cells, which kill other fish, did not harm the clownfish. The clownfish were protected from predators and ate food scraps near the anemone. Meanwhile, the clownfish chased away butterflyfish that would have eaten the anemone.',
    text: 'Which of the following is an example of a mutualistic relationship?',
    choices: [
      'A tick feeding on a deer',
      'A clownfish living among sea anemone tentacles, both benefiting',
      'A tapeworm living in a host\'s intestine',
      'A lion hunting a zebra',
    ],
    correct: 1,
    explanation: 'Mutualism benefits both species — the clownfish gets shelter and food scraps while it chases away fish that eat anemones.',
  },
  {
    id: 42,
    topic: TOPICS.ECOLOGY,
    context: 'The 1980 eruption of Mount St. Helens destroyed all vegetation and animal life across hundreds of square miles. The blast zone was buried under deep ash and hardened lava — a completely lifeless landscape with no soil. Over the following years scientists documented a gradual progression of life returning: first lichens on bare rock, then mosses, then small flowering plants, and eventually shrubs and young trees.',
    text: 'After a volcanic eruption destroys all life on a lava field, the gradual establishment of living communities is called',
    choices: ['Secondary succession', 'Primary succession', 'Climax community', 'Ecological restoration'],
    correct: 1,
    explanation: 'Primary succession begins on bare, lifeless substrate (like new lava) with no soil — pioneer species such as lichens start the process of soil formation.',
  },
  {
    id: 43,
    topic: TOPICS.ECOLOGY,
    context: 'Scientists at a Hawaiian observatory have measured atmospheric CO₂ continuously since 1958. Pre-industrial levels were approximately 280 parts per million (ppm). By 2023, CO₂ had reached over 420 ppm — the highest in 800,000 years based on ice core records. Global average temperatures have risen approximately 1.1°C above pre-industrial levels, and this increase closely tracks rising CO₂ concentrations.',
    text: 'Human burning of fossil fuels primarily contributes to climate change by',
    choices: [
      'depleting ozone in the stratosphere',
      'releasing CO₂ that traps heat in the atmosphere',
      'reducing the amount of solar energy reaching Earth',
      'increasing the reflectivity of Earth\'s surface',
    ],
    correct: 1,
    explanation: 'CO₂ is a greenhouse gas — it absorbs outgoing infrared radiation and re-emits it, warming the lower atmosphere (the greenhouse effect).',
  },

  // ── Human Body Systems (continued) ───────────────────────────────────────
  {
    id: 44,
    topic: TOPICS.HUMAN_BODY,
    context: 'After eating a large meal rich in carbohydrates, a student\'s blood glucose rose from 90 mg/dL to 180 mg/dL within one hour. Her pancreas detected this rise and released a chemical messenger into the bloodstream. Over the next two hours, her blood glucose returned to 90 mg/dL. A classmate with Type 1 diabetes, who cannot produce this chemical, experienced blood glucose levels that remained dangerously elevated without medication.',
    text: 'Insulin is a hormone that regulates blood sugar by',
    choices: [
      'breaking down glycogen in the liver',
      'stimulating cells to take in glucose from the blood',
      'increasing the rate of digestion',
      'raising blood pressure',
    ],
    correct: 1,
    explanation: 'Insulin (released by the pancreas) signals body cells to absorb glucose, lowering blood sugar levels after a meal.',
  },
  {
    id: 45,
    topic: TOPICS.HUMAN_BODY,
    context: 'A person who had chickenpox as a child was heavily exposed to the varicella-zoster virus again as an adult. Despite close contact with an infected person, the adult showed no symptoms. Blood tests showed that within hours of exposure, the immune system launched a rapid and powerful response. The immune system appeared to "remember" the specific virus from the childhood infection and responded far faster than during the original exposure.',
    text: 'The immune system responds to a pathogen by producing',
    choices: ['Hormones', 'Enzymes', 'Antibodies', 'Platelets'],
    correct: 2,
    explanation: 'B lymphocytes produce antibodies — proteins that bind to specific antigens on pathogens, marking them for destruction.',
  },
  {
    id: 46,
    topic: TOPICS.HUMAN_BODY,
    context: 'A patient reports that their heart rate accelerates unexpectedly, their pupils dilate and constrict without reason, and their digestive activity fluctuates beyond their control. The patient is completely unaware of when these changes occur and cannot consciously control them. Neurological testing reveals damage to a specific division of the nervous system that operates independently of the brain\'s conscious centers.',
    text: 'Which part of the nervous system controls involuntary actions such as heart rate and digestion?',
    choices: ['Cerebrum', 'Cerebellum', 'Autonomic nervous system', 'Somatic nervous system'],
    correct: 2,
    explanation: 'The autonomic nervous system regulates involuntary body functions — the sympathetic division speeds responses ("fight or flight") and the parasympathetic slows them ("rest and digest").',
  },
  {
    id: 47,
    topic: TOPICS.HUMAN_BODY,
    text: 'Where does chemical digestion of carbohydrates begin?',
    choices: ['Stomach', 'Small intestine', 'Mouth', 'Large intestine'],
    correct: 2,
    explanation: 'Salivary amylase in the mouth begins breaking down starch into simpler sugars — this is the first step of chemical digestion.',
  },

  // ── Reproduction & Development (continued) ───────────────────────────────
  {
    id: 48,
    topic: TOPICS.REPRODUCTION,
    context: 'During a prenatal checkup, an ultrasound reveals a disc-shaped structure attached to the uterine wall, connected to the fetus by the umbilical cord. Lab analysis shows that the structure contains both fetal and maternal blood vessels in extremely close proximity, yet the two blood supplies remain separated by thin tissue layers. Substances can pass between the two circulatory systems through these thin membranes.',
    text: 'The placenta functions to',
    choices: [
      'produce eggs for fertilization',
      'exchange nutrients, gases, and wastes between mother and fetus',
      'protect the fetus from physical impact only',
      'produce the hormones that cause ovulation',
    ],
    correct: 1,
    explanation: 'The placenta is the exchange organ — oxygen and nutrients pass from mother\'s blood to fetal blood, while CO₂ and wastes move in the opposite direction.',
  },
  {
    id: 49,
    topic: TOPICS.REPRODUCTION,
    context: 'A researcher preparing slides of onion root tip cells stains and examines them under a microscope. She observes many cells at various stages of division — some with duplicated chromosomes aligned in the middle, others with chromosomes pulling apart. The onion species she is studying normally contains 16 chromosomes in each body cell. She wants to predict what she will observe in newly formed daughter cells after division completes.',
    text: 'During mitosis, the chromosome number of daughter cells compared to the parent cell is',
    choices: [
      'half as many',
      'twice as many',
      'the same',
      'one quarter as many',
    ],
    correct: 2,
    explanation: 'Mitosis produces two genetically identical daughter cells, each with the same chromosome number (2n) as the original cell.',
  },
  {
    id: 50,
    topic: TOPICS.REPRODUCTION,
    text: 'Which term describes the stage of development when a fertilized egg implants in the uterus and begins forming distinct tissues?',
    choices: ['Gamete', 'Zygote', 'Embryo', 'Fetus'],
    correct: 2,
    explanation: 'After fertilization the zygote divides into a blastocyst, which implants and develops into an embryo — the stage of major organ formation during the first 8 weeks.',
  },

  // ── Cell Biology (batch 3) ───────────────────────────────────────────────
  {
    id: 51, topic: TOPICS.CELL_BIOLOGY,
    text: 'The overall equation for photosynthesis shows that plants use carbon dioxide and water to produce',
    choices: ['oxygen and ATP only', 'glucose and oxygen', 'glucose and carbon dioxide', 'water and ATP'],
    correct: 1,
    explanation: 'Photosynthesis: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂. Plants produce glucose (stored energy) and release oxygen as a byproduct.',
  },
  {
    id: 52, topic: TOPICS.CELL_BIOLOGY,
    context: 'A student added increasing amounts of hydrogen peroxide to a fixed quantity of catalase enzyme and measured the rate of oxygen gas produced at each concentration. At low concentrations, reaction rate increased steadily with each addition. Beyond a certain point, however, doubling the amount of substrate produced no further increase in rate — the graph flattened out completely.',
    text: 'A student observes that adding more substrate to an enzyme reaction no longer increases the reaction rate. The most likely explanation is that',
    choices: [
      'the enzyme has been destroyed by the substrate',
      'all enzyme active sites are occupied',
      'the pH of the solution has changed',
      'the substrate has become denatured',
    ],
    correct: 1,
    explanation: 'When all enzyme active sites are saturated with substrate, adding more substrate has no effect — the reaction rate plateaus at Vmax.',
  },
  {
    id: 53, topic: TOPICS.CELL_BIOLOGY,
    context: 'A biology student tested a salivary enzyme\'s ability to break down starch at four temperatures: 4°C, 37°C, 60°C, and 100°C. Activity was highest at 37°C. At 100°C the enzyme produced no reaction at all. When the same 100°C sample was cooled back to 37°C and fresh substrate was added, the enzyme still did not function.',
    text: 'Boiling an enzyme solution at 100°C causes the enzyme to lose its ability to function. This is because high temperature',
    choices: [
      'increases the pH of the solution',
      'removes all substrate molecules',
      'denatures the enzyme, changing its shape',
      'increases the activation energy needed',
    ],
    correct: 2,
    explanation: 'Enzymes are proteins. Extreme heat breaks hydrogen bonds and disrupts the 3-D shape (denatures) of the active site, preventing substrate binding.',
  },
  {
    id: 54, topic: TOPICS.CELL_BIOLOGY,
    text: 'Which of the following is a key difference between prokaryotic and eukaryotic cells?',
    choices: [
      'Only eukaryotic cells have ribosomes',
      'Only prokaryotic cells have a cell membrane',
      'Eukaryotic cells have a membrane-bound nucleus; prokaryotes do not',
      'Prokaryotic cells are always larger than eukaryotic cells',
    ],
    correct: 2,
    explanation: 'Eukaryotic cells (plants, animals, fungi, protists) have a membrane-bound nucleus housing DNA. Prokaryotes (bacteria) lack a nuclear membrane — DNA floats in the cytoplasm.',
  },
  {
    id: 55, topic: TOPICS.CELL_BIOLOGY,
    text: 'The smooth endoplasmic reticulum (smooth ER) is primarily involved in',
    choices: [
      'synthesizing proteins for export',
      'producing ATP through respiration',
      'lipid synthesis and detoxification',
      'packaging proteins into vesicles',
    ],
    correct: 2,
    explanation: 'Smooth ER lacks ribosomes and specializes in lipid synthesis, steroid hormone production, and detoxification of drugs and poisons.',
  },
  {
    id: 56, topic: TOPICS.CELL_BIOLOGY,
    text: 'Lysosomes protect the cell by',
    choices: [
      'producing energy through fermentation',
      'synthesizing proteins needed for defense',
      'digesting worn-out organelles and foreign particles using enzymes',
      'pumping excess water out of the cell',
    ],
    correct: 2,
    explanation: 'Lysosomes contain hydrolytic enzymes that break down damaged organelles (autophagy), bacteria, and cellular debris — acting as the cell\'s cleanup crew.',
  },
  {
    id: 57, topic: TOPICS.CELL_BIOLOGY,
    text: 'During cellular respiration, glucose is broken down to release energy. Most of this energy is captured in the form of',
    choices: ['ADP', 'ATP', 'RNA', 'DNA'],
    correct: 1,
    explanation: 'Cellular respiration converts the chemical energy in glucose into ATP (adenosine triphosphate), the cell\'s universal energy currency.',
  },
  {
    id: 58, topic: TOPICS.CELL_BIOLOGY,
    context: 'A lab technician accidentally prepared an IV solution with a salt concentration 10 times higher than normal blood plasma. When a sample of red blood cells was exposed to this solution and viewed under a microscope, the cells appeared dramatically different from cells in normal saline solution — they had changed in size and shape.',
    text: 'A red blood cell placed in a very salty (hypertonic) solution will most likely',
    choices: [
      'swell and burst due to water entering',
      'remain unchanged',
      'shrivel as water leaves the cell by osmosis',
      'absorb salt to balance the concentrations',
    ],
    correct: 2,
    explanation: 'In a hypertonic solution, the solute concentration outside is higher than inside. Water moves out of the cell by osmosis, causing the cell to shrivel (crenation).',
  },
  {
    id: 59, topic: TOPICS.CELL_BIOLOGY,
    text: 'Which statement best describes the cell theory?',
    choices: [
      'All cells contain a nucleus and mitochondria',
      'Cells can arise spontaneously from nonliving matter',
      'All living things are made of cells, and all cells come from pre-existing cells',
      'Only multicellular organisms are composed of cells',
    ],
    correct: 2,
    explanation: 'The three principles of cell theory: (1) all living things are made of cells, (2) the cell is the basic unit of life, (3) all cells come from pre-existing cells.',
  },
  {
    id: 60, topic: TOPICS.CELL_BIOLOGY,
    text: 'Which process produces a small amount of ATP without using oxygen?',
    choices: ['Aerobic respiration', 'Photosynthesis', 'Fermentation', 'Osmosis'],
    correct: 2,
    explanation: 'Fermentation (anaerobic respiration) breaks down glucose without oxygen, producing only 2 ATP per glucose molecule. Examples include lactic acid fermentation in muscles and alcoholic fermentation in yeast.',
  },
  {
    id: 61, topic: TOPICS.CELL_BIOLOGY,
    text: 'A cell uses vesicles to export large protein molecules to the outside of the cell. This process is called',
    choices: ['endocytosis', 'osmosis', 'pinocytosis', 'exocytosis'],
    correct: 3,
    explanation: 'Exocytosis is the process where vesicles fuse with the cell membrane and release their contents outside the cell — used to secrete hormones, enzymes, and other proteins.',
  },
  {
    id: 62, topic: TOPICS.CELL_BIOLOGY,
    context: 'Researchers treated two groups of cells with a toxin that binds to mitochondria and prevents ATP production. They then tested each group for several transport activities. One group continued moving water and dissolved gases across membranes without difficulty. Another group showed a dramatic decline in their ability to move specific ions against a concentration gradient — a process that had been operating normally before treatment.',
    text: 'In an experiment, cells are treated with a poison that blocks ATP production. Which process would be most directly affected?',
    choices: ['Osmosis', 'Simple diffusion', 'Active transport', 'Facilitated diffusion'],
    correct: 2,
    explanation: 'Active transport requires ATP to move substances against the concentration gradient. Without ATP, active transport stops while passive processes (osmosis, diffusion) can continue.',
  },
  {
    id: 63, topic: TOPICS.CELL_BIOLOGY,
    text: 'The organelle that modifies, sorts, and packages proteins received from the rough ER is the',
    choices: ['Lysosome', 'Golgi apparatus', 'Vacuole', 'Centriole'],
    correct: 1,
    explanation: 'The Golgi apparatus acts like the cell\'s postal system — it receives proteins from the ER, modifies them (e.g., adds sugars), and packages them into vesicles for shipping.',
  },
  {
    id: 64, topic: TOPICS.CELL_BIOLOGY,
    text: 'Chlorophyll absorbs sunlight most efficiently in which colors of the visible spectrum?',
    choices: ['Green and yellow', 'Red and blue-violet', 'Orange and indigo', 'All colors equally'],
    correct: 1,
    explanation: 'Chlorophyll absorbs red and blue-violet light for photosynthesis and reflects green light — which is why plants appear green.',
  },
  {
    id: 65, topic: TOPICS.CELL_BIOLOGY,
    text: 'Which laboratory technique is used to observe the internal structure of a cell in detail?',
    choices: [
      'Gel electrophoresis',
      'Paper chromatography',
      'Electron microscopy',
      'Spectrophotometry',
    ],
    correct: 2,
    explanation: 'Electron microscopes use electron beams instead of light, giving much higher magnification and resolution needed to see organelle structure.',
  },

  // ── Genetics & Heredity (batch 3) ────────────────────────────────────────
  {
    id: 66, topic: TOPICS.GENETICS,
    text: 'In snapdragons, crossing a red-flowered plant (RR) with a white-flowered plant (WW) produces all pink offspring (RW). This pattern of inheritance is called',
    choices: ['complete dominance', 'codominance', 'incomplete dominance', 'sex linkage'],
    correct: 2,
    explanation: 'Incomplete dominance produces a blended phenotype in heterozygotes — neither allele is fully dominant, so RW appears pink (a blend of red and white).',
  },
  {
    id: 67, topic: TOPICS.GENETICS,
    text: 'A person with type O blood has the genotype ii. If they reproduce with a person who is type A (IAi), what fraction of offspring could be type O?',
    choices: ['0%', '25%', '50%', '100%'],
    correct: 2,
    explanation: 'Cross: IAi × ii → ½ IAi (type A) and ½ ii (type O). So 50% of offspring will be type O.',
  },
  {
    id: 68, topic: TOPICS.GENETICS,
    text: 'Color blindness is an X-linked recessive trait. A carrier mother (X^N X^n) and a normal-sighted father (X^N Y) have children. Which of the following is true?',
    choices: [
      'All daughters will be color blind',
      'All sons will be color blind',
      '50% of sons may be color blind',
      'Daughters cannot be carriers',
    ],
    correct: 2,
    explanation: 'Sons receive the X chromosome from their mother. There is a 50% chance a son inherits X^n (recessive allele) and is color blind. Daughters receive X^N from the father so none will be color blind.',
  },
  {
    id: 69, topic: TOPICS.GENETICS,
    text: 'A pedigree shows two unaffected parents with an affected child. The trait is most likely',
    choices: ['dominant', 'autosomal recessive', 'X-linked dominant', 'codominant'],
    correct: 1,
    explanation: 'When two unaffected (carrier) parents produce an affected offspring, the trait is autosomal recessive — both parents carry one copy of the recessive allele without showing the phenotype.',
  },
  {
    id: 70, topic: TOPICS.GENETICS,
    text: 'DNA is described as a double helix. Which base always pairs with guanine (G)?',
    choices: ['Adenine (A)', 'Thymine (T)', 'Uracil (U)', 'Cytosine (C)'],
    correct: 3,
    explanation: 'Base pairing rules in DNA: A–T and G–C. Guanine always pairs with Cytosine via three hydrogen bonds.',
  },
  {
    id: 71, topic: TOPICS.GENETICS,
    text: 'Which of the following correctly distinguishes RNA from DNA?',
    choices: [
      'RNA contains thymine; DNA contains uracil',
      'RNA is double-stranded; DNA is single-stranded',
      'RNA contains uracil and ribose; DNA contains thymine and deoxyribose',
      'RNA stores genetic information; DNA carries out protein synthesis',
    ],
    correct: 2,
    explanation: 'RNA uses uracil (instead of thymine) and ribose sugar (instead of deoxyribose). RNA is also typically single-stranded, while DNA is double-stranded.',
  },
  {
    id: 72, topic: TOPICS.GENETICS,
    text: 'During transcription, which molecule is used as a template to produce mRNA?',
    choices: ['tRNA', 'rRNA', 'The DNA template strand', 'An existing mRNA molecule'],
    correct: 2,
    explanation: 'During transcription, RNA polymerase reads the DNA template strand (3′→5′) and synthesizes a complementary mRNA strand (5′→3′).',
  },
  {
    id: 73, topic: TOPICS.GENETICS,
    text: 'The mRNA codon AUG codes for methionine and also serves as the',
    choices: ['stop codon', 'start codon', 'nonsense codon', 'anticodon'],
    correct: 1,
    explanation: 'AUG is the universal start codon — it signals the ribosome to begin translation and codes for the amino acid methionine in all organisms.',
  },
  {
    id: 74, topic: TOPICS.GENETICS,
    text: 'Gel electrophoresis separates DNA fragments based on',
    choices: [
      'base sequence only',
      'size — smaller fragments travel farther from the well',
      'shape of the double helix',
      'the number of guanine bases present',
    ],
    correct: 1,
    explanation: 'In gel electrophoresis, DNA is negatively charged and moves toward the positive pole. Smaller fragments move faster through the gel, traveling farther from the loading well.',
  },
  {
    id: 75, topic: TOPICS.GENETICS,
    text: 'Restriction enzymes are used in genetic engineering to',
    choices: [
      'join two DNA fragments together',
      'copy DNA in the PCR process',
      'cut DNA at specific base sequences',
      'translate mRNA into proteins',
    ],
    correct: 2,
    explanation: 'Restriction enzymes (restriction endonucleases) recognize and cut specific short DNA sequences, producing fragments that can be joined with other DNA — a key tool in recombinant DNA technology.',
  },
  {
    id: 76, topic: TOPICS.GENETICS,
    text: 'Sickle cell anemia is caused by a point mutation that changes one amino acid in hemoglobin. This mutation directly affects the protein\'s',
    choices: ['base sequence in DNA', 'number of chromosomes', 'shape and therefore its function', 'ability to replicate'],
    correct: 2,
    explanation: 'A single amino acid substitution (glutamic acid → valine) causes hemoglobin to polymerize in low-oxygen conditions, distorting red blood cells into a sickle shape and reducing oxygen delivery.',
  },
  {
    id: 77, topic: TOPICS.GENETICS,
    text: 'A karyotype is used to',
    choices: [
      'determine the base sequence of a gene',
      'observe the number and structure of chromosomes in a cell',
      'measure the rate of protein synthesis',
      'identify which proteins are expressed in a tissue',
    ],
    correct: 1,
    explanation: 'A karyotype is an organized image of all chromosomes in a cell, arranged by size and shape. It can reveal chromosomal abnormalities like trisomy 21 (Down syndrome).',
  },
  {
    id: 78, topic: TOPICS.GENETICS,
    text: 'Scientists inserted the human insulin gene into bacteria so that the bacteria produce insulin. The bacteria can read the human gene because',
    choices: [
      'bacteria and humans share the same cytoplasm',
      'the genetic code (codons) is nearly universal across all organisms',
      'bacteria and humans have identical ribosomes',
      'the human gene mutated to match bacterial DNA',
    ],
    correct: 1,
    explanation: 'The genetic code is nearly universal — the same codons specify the same amino acids in bacteria, humans, and almost all other life. This allows genes to be transferred across species.',
  },
  {
    id: 79, topic: TOPICS.GENETICS,
    text: 'Which process creates new combinations of alleles on a chromosome during meiosis?',
    choices: ['Replication', 'Translation', 'Crossing over', 'Transcription'],
    correct: 2,
    explanation: 'Crossing over (recombination) occurs in prophase I of meiosis when homologous chromosomes exchange segments, creating new combinations of alleles — a major source of genetic variation.',
  },
  {
    id: 80, topic: TOPICS.GENETICS,
    text: 'A frameshift mutation caused by inserting one extra base into a DNA sequence will most likely',
    choices: [
      'change only the codon where the insertion occurred',
      'have no effect because the genetic code is redundant',
      'alter every codon after the insertion point, changing the protein significantly',
      'cause the ribosome to skip the affected codon',
    ],
    correct: 2,
    explanation: 'A frameshift mutation shifts the reading frame for all codons downstream of the insertion, usually producing a completely non-functional protein.',
  },

  // ── Evolution (batch 3) ──────────────────────────────────────────────────
  {
    id: 81, topic: TOPICS.EVOLUTION,
    text: 'The human appendix and whale pelvis bones are considered vestigial structures because they',
    choices: [
      'perform important functions in both species',
      'are fully developed and functional organs',
      'are reduced, non-functional remnants of structures that were useful in ancestors',
      'evolved independently in unrelated species',
    ],
    correct: 2,
    explanation: 'Vestigial structures are evolutionary remnants — they were functional in ancestors but have been reduced or lost their original function over time. They provide evidence of common ancestry.',
  },
  {
    id: 82, topic: TOPICS.EVOLUTION,
    text: 'The fact that the embryos of fish, reptiles, birds, and mammals all have gill slits and tails at early developmental stages is evidence of',
    choices: [
      'convergent evolution among unrelated groups',
      'common ancestry among vertebrates',
      'identical environments in their evolutionary past',
      'the same mutation occurring in all groups',
    ],
    correct: 1,
    explanation: 'Comparative embryology shows that distantly related vertebrates share similar developmental stages — evidence they descended from a common ancestor.',
  },
  {
    id: 83, topic: TOPICS.EVOLUTION,
    text: 'Comparing the amino acid sequences of the same protein (e.g., cytochrome c) across species shows that species with more similar sequences are',
    choices: [
      'more distantly related evolutionarily',
      'more closely related evolutionarily',
      'found in the same geographic location',
      'the same species that diverged recently due to behavior',
    ],
    correct: 1,
    explanation: 'Molecular evidence: the more similar the protein (or DNA) sequence between two species, the more recently they shared a common ancestor. Fewer differences = closer relationship.',
  },
  {
    id: 84, topic: TOPICS.EVOLUTION,
    text: 'Industrial melanism in the peppered moth is an example of natural selection because',
    choices: [
      'moths purposely changed their color to match tree bark',
      'the industrial pollution caused mutations that made moths darker',
      'darker moths had better camouflage on soot-covered trees and survived to reproduce more',
      'all moths became dark within one generation',
    ],
    correct: 2,
    explanation: 'Before industrialization, light moths were camouflaged on lichen-covered trees; darker moths were visible and eaten. After pollution darkened tree bark, dark moths had better camouflage and higher survival rates — natural selection in action.',
  },
  {
    id: 85, topic: TOPICS.EVOLUTION,
    text: 'Genetic drift is most likely to significantly affect a population that is',
    choices: [
      'large and geographically widespread',
      'small and isolated',
      'subject to strong directional selection',
      'interbreeding with neighboring populations',
    ],
    correct: 1,
    explanation: 'Genetic drift — random changes in allele frequencies — has the greatest impact on small populations. Random events can eliminate alleles entirely in a small gene pool.',
  },
  {
    id: 86, topic: TOPICS.EVOLUTION,
    text: 'Coevolution is best illustrated by',
    choices: [
      'two unrelated species developing similar wing shapes independently',
      'a flower and its specific pollinator evolving matching adaptations together over time',
      'a predator evolving faster running speed in one isolated population',
      'a mutation that provides antibiotic resistance in bacteria',
    ],
    correct: 1,
    explanation: 'Coevolution occurs when two species exert mutual selective pressure on each other — each change in one species drives adaptive change in the other, as seen in flower-pollinator or predator-prey pairs.',
  },
  {
    id: 87, topic: TOPICS.EVOLUTION,
    text: 'The geographic distribution of marsupials (pouched mammals) almost exclusively in Australia is best explained by',
    choices: [
      'convergent evolution from placental mammals',
      'continental drift — marsupials evolved in isolation after Australia separated',
      'identical climates promoting the same type of organism worldwide',
      'marsupials being introduced by humans',
    ],
    correct: 1,
    explanation: 'Australia separated from other landmasses early in mammal evolution. Marsupials evolved in isolation without competition from placental mammals — a classic example of how geography drives evolution.',
  },
  {
    id: 88, topic: TOPICS.EVOLUTION,
    text: 'According to the concept of punctuated equilibrium, the fossil record would show',
    choices: [
      'a gradual, steady change in organisms over millions of years',
      'long periods of little change interrupted by rapid bursts of evolutionary change',
      'all species changing at exactly the same rate',
      'no evidence of extinction events in Earth\'s history',
    ],
    correct: 1,
    explanation: 'Punctuated equilibrium (Gould & Eldredge) proposes that species remain stable for long periods (stasis) then change rapidly in geologically short periods, often after environmental disturbances.',
  },
  {
    id: 89, topic: TOPICS.EVOLUTION,
    text: 'Artificial selection differs from natural selection in that artificial selection',
    choices: [
      'produces more random variation in offspring',
      'is driven by human choices about which individuals breed',
      'occurs over millions of years without human involvement',
      'only affects wild animal populations',
    ],
    correct: 1,
    explanation: 'In artificial selection, humans choose which individuals reproduce based on desired traits (e.g., dog breeding, crop improvement). Natural selection is driven by environmental pressures without human involvement.',
  },
  {
    id: 90, topic: TOPICS.EVOLUTION,
    text: 'A new volcanic island forms in the ocean and is gradually colonized by organisms. Over thousands of years, populations on different parts of the island become distinct species. This process is best described as',
    choices: ['genetic drift only', 'allopatric speciation', 'convergent evolution', 'sympatric speciation'],
    correct: 1,
    explanation: 'Allopatric speciation occurs when populations are geographically separated and evolve independently until they can no longer interbreed.',
  },
  {
    id: 91, topic: TOPICS.EVOLUTION,
    text: 'Which of the following is NOT a condition required for Hardy-Weinberg equilibrium (no evolution)?',
    choices: [
      'Random mating within the population',
      'No mutations occurring',
      'Large population size',
      'Strong natural selection favoring one allele',
    ],
    correct: 3,
    explanation: 'Hardy-Weinberg equilibrium requires: no mutations, no natural selection, random mating, large population, no gene flow. Strong natural selection violates this and causes evolution.',
  },
  {
    id: 92, topic: TOPICS.EVOLUTION,
    text: 'The wings of insects and the wings of birds are an example of analogous structures because they',
    choices: [
      'have the same internal bone structure',
      'descended from the same ancestral wing structure',
      'perform the same function (flight) but evolved independently in unrelated groups',
      'are found in organisms living in the same ecosystem',
    ],
    correct: 2,
    explanation: 'Analogous structures (convergent evolution) — same function but different evolutionary origins. Insect and bird wings evolved flight independently; their internal structures are completely different.',
  },

  // ── Ecology (batch 3) ────────────────────────────────────────────────────
  {
    id: 93, topic: TOPICS.ECOLOGY,
    text: 'In the carbon cycle, which process removes carbon dioxide from the atmosphere?',
    choices: ['Cellular respiration', 'Decomposition', 'Combustion', 'Photosynthesis'],
    correct: 3,
    explanation: 'Photosynthesis removes CO₂ from the atmosphere and converts it into organic compounds. Respiration, decomposition, and combustion all release CO₂ back into the atmosphere.',
  },
  {
    id: 94, topic: TOPICS.ECOLOGY,
    text: 'Which of the following best describes the role of decomposers in an ecosystem?',
    choices: [
      'They convert solar energy into chemical energy',
      'They are the primary consumers in the food web',
      'They break down dead organic matter and return nutrients to the soil',
      'They remove nitrogen from the atmosphere and add it to the soil',
    ],
    correct: 2,
    explanation: 'Decomposers (bacteria, fungi) break down dead organisms and waste into inorganic nutrients, recycling them back into the ecosystem for producers to use.',
  },
  {
    id: 95, topic: TOPICS.ECOLOGY,
    text: 'Nitrogen-fixing bacteria are essential to ecosystems because they',
    choices: [
      'remove excess nitrogen from the soil to prevent toxicity',
      'convert atmospheric nitrogen (N₂) into ammonia that plants can use',
      'produce oxygen from nitrogen compounds',
      'decompose nitrogen-containing organic matter',
    ],
    correct: 1,
    explanation: 'Most organisms cannot use atmospheric N₂ directly. Nitrogen-fixing bacteria convert N₂ into ammonia (NH₃) or related compounds, making nitrogen available for plants and the rest of the food web.',
  },
  {
    id: 96, topic: TOPICS.ECOLOGY,
    text: 'A population of deer in a forest grows rapidly at first, then levels off as it approaches the environment\'s carrying capacity. This S-shaped growth pattern is called',
    choices: ['exponential growth', 'logistic growth', 'boom-and-bust cycling', 'density-independent growth'],
    correct: 1,
    explanation: 'Logistic growth produces an S-curve: rapid growth when resources are plentiful, slowing as the population approaches carrying capacity due to limiting factors like food and space.',
  },
  {
    id: 97, topic: TOPICS.ECOLOGY,
    text: 'Disease, predation, and competition for food are examples of density-dependent limiting factors because they',
    choices: [
      'affect all populations equally regardless of size',
      'are caused by weather events unrelated to population density',
      'have a greater impact as population density increases',
      'only affect plant populations, not animal populations',
    ],
    correct: 2,
    explanation: 'Density-dependent factors intensify as population size increases — more crowded populations spread disease more easily, attract more predators, and experience greater competition for limited resources.',
  },
  {
    id: 98, topic: TOPICS.ECOLOGY,
    text: 'When a non-native species is introduced to a new ecosystem, it often becomes invasive because',
    choices: [
      'it immediately adapts its DNA to the new environment',
      'it has no natural predators or competitors in the new location',
      'native species welcome it as a new food source',
      'it reproduces more slowly than native species',
    ],
    correct: 1,
    explanation: 'Invasive species thrive because they lack the natural predators, parasites, and competitors that controlled them in their native range, allowing unchecked population growth.',
  },
  {
    id: 99, topic: TOPICS.ECOLOGY,
    text: 'Biomagnification refers to the',
    choices: [
      'increase in biodiversity as an ecosystem matures',
      'magnification used in electron microscopy of ecosystem samples',
      'increasing concentration of toxins in organisms at higher trophic levels',
      'rapid growth of a population after a limiting factor is removed',
    ],
    correct: 2,
    explanation: 'Biomagnification occurs when toxins (like DDT or mercury) are not excreted and accumulate in body tissue. Each predator eats many prey, so toxin concentration multiplies going up the food chain.',
  },
  {
    id: 100, topic: TOPICS.ECOLOGY,
    text: 'A keystone species is one that',
    choices: [
      'has the largest population in an ecosystem',
      'forms the base of the food pyramid',
      'has a disproportionately large effect on its ecosystem relative to its abundance',
      'can survive in all types of ecosystems',
    ],
    correct: 2,
    explanation: 'Keystone species — like sea otters or wolves — have outsized ecosystem impacts. Removing them causes dramatic changes (trophic cascades) far beyond what their numbers alone would suggest.',
  },
  {
    id: 101, topic: TOPICS.ECOLOGY,
    text: 'After a forest fire destroys vegetation in an area with existing soil, the gradual return of plant life is called',
    choices: ['primary succession', 'secondary succession', 'climax community formation', 'pioneer species colonization'],
    correct: 1,
    explanation: 'Secondary succession occurs in areas where a community was disrupted but soil remains. Because soil already exists, it proceeds faster than primary succession.',
  },
  {
    id: 102, topic: TOPICS.ECOLOGY,
    text: 'Which human activity most directly contributes to the acidification of lakes and streams in northeastern North America?',
    choices: [
      'Overfishing of freshwater species',
      'Introduction of invasive fish species',
      'Burning fossil fuels that release sulfur dioxide and nitrogen oxides forming acid rain',
      'Removal of riparian (streamside) vegetation',
    ],
    correct: 2,
    explanation: 'Acid rain forms when sulfur dioxide (SO₂) and nitrogen oxides (NOₓ) from burning fossil fuels dissolve in rainwater to form sulfuric and nitric acids, lowering the pH of lakes and streams.',
  },
  {
    id: 103, topic: TOPICS.ECOLOGY,
    text: 'Deforestation most directly contributes to climate change by',
    choices: [
      'increasing the amount of solar radiation absorbed by Earth\'s surface',
      'releasing stored carbon into the atmosphere and reducing CO₂ absorption',
      'causing more volcanic eruptions that emit greenhouse gases',
      'disrupting ocean circulation patterns',
    ],
    correct: 1,
    explanation: 'Trees store carbon in their wood. When forests are cleared or burned, stored carbon is released as CO₂. Fewer trees also means less CO₂ is removed from the atmosphere — a double impact on climate.',
  },
  {
    id: 104, topic: TOPICS.ECOLOGY,
    text: 'A population of wolves was reintroduced to Yellowstone National Park. This caused elk to graze less intensively in certain areas, allowing vegetation to recover, which reduced river erosion. This chain of effects is called a',
    choices: ['food chain', 'symbiotic relationship', 'trophic cascade', 'succession event'],
    correct: 2,
    explanation: 'A trophic cascade occurs when a predator indirectly affects lower trophic levels. The wolves changed elk behavior, which allowed plants to grow, stabilizing riverbanks — a classic Yellowstone example.',
  },

  // ── Human Body Systems (batch 3) ─────────────────────────────────────────
  {
    id: 105, topic: TOPICS.HUMAN_BODY,
    text: 'A negative feedback mechanism maintains homeostasis by',
    choices: [
      'amplifying a change until it reaches a maximum level',
      'producing a response that reverses or reduces the original change',
      'preventing any change from occurring in the body',
      'increasing body temperature in all cases',
    ],
    correct: 1,
    explanation: 'Negative feedback is the body\'s primary homeostatic tool — when a variable moves away from its set point, the response brings it back. Example: rising blood glucose triggers insulin release, which lowers glucose.',
  },
  {
    id: 106, topic: TOPICS.HUMAN_BODY,
    text: 'When blood glucose levels fall too low, the pancreas releases glucagon to',
    choices: [
      'stimulate cells to absorb glucose from the blood',
      'convert glucose to glycogen for storage',
      'signal the liver to break down glycogen and release glucose into the blood',
      'reduce the rate of cellular respiration',
    ],
    correct: 2,
    explanation: 'Glucagon (released by alpha cells of the pancreas) signals the liver to break down stored glycogen into glucose (glycogenolysis), raising blood glucose levels — the opposite effect of insulin.',
  },
  {
    id: 107, topic: TOPICS.HUMAN_BODY,
    text: 'The villi and microvilli of the small intestine increase the efficiency of nutrient absorption by',
    choices: [
      'producing digestive enzymes to break down food',
      'greatly increasing the surface area available for absorption',
      'secreting acid to denature proteins',
      'producing bile to emulsify fats',
    ],
    correct: 1,
    explanation: 'The folded surface (villi and microvilli) of the small intestine increases surface area approximately 600-fold, maximizing the absorption of nutrients into the bloodstream.',
  },
  {
    id: 108, topic: TOPICS.HUMAN_BODY,
    text: 'Pepsin is an enzyme that digests proteins in the stomach. It works best at a pH of about 2 (highly acidic). If the pH of the stomach rises to 7, pepsin would most likely',
    choices: [
      'work faster because neutral pH is ideal for all enzymes',
      'become more effective because it can now bind more substrate',
      'lose its effectiveness because it is outside its optimal pH range',
      'begin to digest fats instead of proteins',
    ],
    correct: 2,
    explanation: 'Each enzyme has an optimal pH at which its active site shape is maintained. Outside this range, the protein conformation changes, reducing or eliminating catalytic activity.',
  },
  {
    id: 109, topic: TOPICS.HUMAN_BODY,
    text: 'The left ventricle of the heart must pump blood with more force than the right ventricle because it pumps blood',
    choices: [
      'to the lungs, which are nearby',
      'to the right atrium',
      'through the entire body via the systemic circulation',
      'back through the pulmonary veins',
    ],
    correct: 2,
    explanation: 'The left ventricle has thicker, more muscular walls because it pumps blood through the systemic circulation — to the entire body — which requires much greater pressure than the short trip to the lungs.',
  },
  {
    id: 110, topic: TOPICS.HUMAN_BODY,
    text: 'Vaccines protect against future infections by',
    choices: [
      'killing pathogens before they can enter the body',
      'introducing antibiotics that destroy bacteria',
      'stimulating the immune system to produce memory cells without causing disease',
      'replacing damaged white blood cells',
    ],
    correct: 2,
    explanation: 'Vaccines expose the immune system to antigens (weakened/killed pathogen or a piece of it). The immune system produces memory B and T cells so that a real future infection is recognized and neutralized quickly.',
  },
  {
    id: 111, topic: TOPICS.HUMAN_BODY,
    text: 'Neurons transmit signals as electrical impulses. The space between two neurons where a signal is transmitted chemically is called a',
    choices: ['axon terminal', 'node of Ranvier', 'synapse', 'myelin sheath'],
    correct: 2,
    explanation: 'At a synapse, an electrical impulse causes vesicles to release neurotransmitters into the synaptic cleft. These bind to receptors on the next neuron, continuing the signal.',
  },
  {
    id: 112, topic: TOPICS.HUMAN_BODY,
    text: 'The antidiuretic hormone (ADH) helps maintain water balance by acting on the',
    choices: ['liver, causing glucose storage', 'kidneys, increasing water reabsorption', 'pancreas, reducing insulin output', 'small intestine, slowing digestion'],
    correct: 1,
    explanation: 'ADH (vasopressin) is released by the posterior pituitary when blood is too concentrated. It signals the kidney tubules to reabsorb more water, producing less concentrated (smaller volume) urine.',
  },
  {
    id: 113, topic: TOPICS.HUMAN_BODY,
    text: 'Which component of blood is primarily responsible for transporting oxygen to body tissues?',
    choices: ['Plasma', 'Platelets', 'Hemoglobin in red blood cells', 'Lymphocytes'],
    correct: 2,
    explanation: 'Hemoglobin is an iron-containing protein in red blood cells that binds oxygen in the lungs and releases it in tissues. Each RBC contains about 280 million hemoglobin molecules.',
  },
  {
    id: 114, topic: TOPICS.HUMAN_BODY,
    text: 'The skin and mucous membranes represent which line of defense against pathogens?',
    choices: ['Second line — inflammatory response', 'Third line — adaptive immunity', 'First line — physical and chemical barriers', 'Fourth line — vaccine immunity'],
    correct: 2,
    explanation: 'The first line of defense is non-specific physical and chemical barriers: skin blocks entry, mucus traps pathogens, stomach acid destroys them. These don\'t require prior exposure to the pathogen.',
  },
  {
    id: 115, topic: TOPICS.HUMAN_BODY,
    text: 'The liver plays a role in homeostasis by',
    choices: [
      'producing red blood cells for oxygen transport',
      'filtering pathogens from the lymph',
      'regulating blood glucose, detoxifying substances, and producing bile',
      'secreting hormones that control heart rate',
    ],
    correct: 2,
    explanation: 'The liver is a metabolic hub: it stores and releases glucose, detoxifies drugs and alcohol, produces bile for fat digestion, and synthesizes many blood proteins.',
  },
  {
    id: 116, topic: TOPICS.HUMAN_BODY,
    text: 'During vigorous exercise, a person breathes faster and deeper primarily because',
    choices: [
      'the brain senses a drop in body temperature',
      'rising CO₂ levels in the blood signal the brain to increase breathing rate',
      'the heart pumps blood to the lungs more slowly',
      'the diaphragm becomes fatigued and compensates',
    ],
    correct: 1,
    explanation: 'Rising CO₂ (from increased cellular respiration) lowers blood pH. Chemoreceptors detect this and signal the respiratory center in the brainstem to increase breathing rate and depth.',
  },

  // ── Reproduction & Development (batch 3) ─────────────────────────────────
  {
    id: 117, topic: TOPICS.REPRODUCTION,
    text: 'During prophase of mitosis, which of the following events occurs?',
    choices: [
      'Chromosomes line up at the cell\'s equator',
      'Sister chromatids separate and move to opposite poles',
      'Chromosomes condense and the nuclear envelope breaks down',
      'The cell plate forms between two new nuclei',
    ],
    correct: 2,
    explanation: 'In prophase: chromatin condenses into visible chromosomes, the nuclear envelope disintegrates, and the mitotic spindle begins to form.',
  },
  {
    id: 118, topic: TOPICS.REPRODUCTION,
    text: 'A parent cell with 46 chromosomes undergoes mitosis. Each daughter cell will have',
    choices: ['23 chromosomes', '46 chromosomes', '92 chromosomes', '12 chromosomes'],
    correct: 1,
    explanation: 'Mitosis preserves the chromosome number — each daughter cell receives a complete copy of all chromosomes, so both have 46 (diploid, 2n).',
  },
  {
    id: 119, topic: TOPICS.REPRODUCTION,
    text: 'A hydra reproduces by forming a small genetically identical outgrowth that eventually breaks off. This type of asexual reproduction is called',
    choices: ['fragmentation', 'binary fission', 'budding', 'sporulation'],
    correct: 2,
    explanation: 'Budding is a form of asexual reproduction where a new organism grows from the parent\'s body. In hydra, the bud develops while attached, then separates as an independent organism.',
  },
  {
    id: 120, topic: TOPICS.REPRODUCTION,
    text: 'During meiosis, crossing over between homologous chromosomes occurs in',
    choices: ['Metaphase II', 'Anaphase I', 'Prophase I', 'Telophase II'],
    correct: 2,
    explanation: 'Crossing over (homologous recombination) occurs during prophase I when homologous chromosomes pair up (synapse) and exchange segments, creating new combinations of alleles.',
  },
  {
    id: 121, topic: TOPICS.REPRODUCTION,
    text: 'Stem cells are important in medicine because they',
    choices: [
      'can only develop into red blood cells',
      'carry no genetic information and can be safely transplanted',
      'are undifferentiated cells that can potentially develop into many specialized cell types',
      'reproduce by meiosis to increase genetic diversity',
    ],
    correct: 2,
    explanation: 'Stem cells are unspecialized (undifferentiated) cells that can divide and differentiate into various specialized cell types, making them valuable for treating diseases that damage specific tissues.',
  },
  {
    id: 122, topic: TOPICS.REPRODUCTION,
    text: 'After fertilization, the zygote undergoes a series of rapid cell divisions called cleavage. These divisions increase cell number without increasing overall size, producing a ball of cells called a',
    choices: ['gamete', 'blastocyst', 'gastrula', 'morula → blastocyst'],
    correct: 3,
    explanation: 'Cleavage divisions produce a morula (solid ball of cells) that develops into a blastocyst (hollow ball). The blastocyst implants in the uterus and continues developing.',
  },
  {
    id: 123, topic: TOPICS.REPRODUCTION,
    text: 'Which statement correctly compares mitosis and meiosis?',
    choices: [
      'Mitosis produces 4 haploid cells; meiosis produces 2 diploid cells',
      'Mitosis occurs only in reproductive organs; meiosis occurs throughout the body',
      'Mitosis produces 2 genetically identical diploid cells; meiosis produces 4 genetically varied haploid cells',
      'Both mitosis and meiosis involve two rounds of DNA replication',
    ],
    correct: 2,
    explanation: 'Mitosis: 1 diploid cell → 2 identical diploid cells (growth/repair). Meiosis: 1 diploid cell → 4 haploid gametes with genetic variation from crossing over and independent assortment.',
  },

  // ── NYS Living Environment Regents — June 2024 ──────────────────────────────
  {
    id: 124, topic: TOPICS.GENETICS,
    source: 'NYS Regents June 2024 #2',
    text: 'A colony of 47,000 quaking aspen trees, all connected by one root system, is considered to be Earth\'s most massive organism. When the trees are stressed, shoots are sent out from the roots and develop into new trees. Every new tree in this colony would contain',
    choices: [
      'the same genetic information, because it is produced asexually',
      'the same genetic information, because it is produced sexually',
      'less genetic material, since it is produced from root cells',
      'a different combination of genes, since it is produced from various roots',
    ],
    correct: 0,
  },
  {
    id: 125, topic: TOPICS.REPRODUCTION,
    source: 'NYS Regents June 2024 #5',
    text: 'The process of differentiation occurs when',
    choices: [
      'two different cells, a sperm cell and an egg cell, combine to produce a zygote',
      'different zygotes are formed each time that an egg and sperm unite',
      'different kinds of cells and tissues form during embryonic development',
      'two different sexes are present among the offspring, after sexual reproduction',
    ],
    correct: 2,
  },
  {
    id: 126, topic: TOPICS.GENETICS,
    source: 'NYS Regents June 2024 #8',
    text: 'Dioxin, a toxin associated with waste incineration and some plastics, has been found to directly disrupt normal gamete production in human females. Dioxin most likely affects the',
    choices: [
      'testes and progesterone production',
      'ovaries and estrogen production',
      'DNA in the nuclei of sperm cells',
      'pancreas and insulin production',
    ],
    correct: 1,
  },
  {
    id: 127, topic: TOPICS.GENETICS,
    source: 'NYS Regents June 2024 #9',
    text: 'A gene present only in a single plant species was found to regulate protein content. This gene could increase the protein content of other food crops in the developing world. The most likely method that scientists would use to incorporate this gene into a variety of food crops is',
    choices: [
      'genetic engineering',
      'selective breeding',
      'sexual reproduction between the plants with this gene and those without it',
      'deletion of the genes that limit protein production from each individual food crop plant',
    ],
    correct: 0,
  },
  {
    id: 128, topic: TOPICS.REPRODUCTION,
    source: 'NYS Regents June 2024 #12',
    text: 'Which statement best describes a critical function of the placenta?',
    choices: [
      'Meiosis occurs in the placenta, allowing for the development and release of eggs.',
      'Blood from the mother and fetus mixes at the placenta, providing nutrients and oxygen.',
      'The placenta filters out all harmful toxins and chemicals from the mother\'s blood, so that they cannot reach the fetus.',
      'The exchange of oxygen and carbon dioxide occurs between the mother and developing fetus across the placenta.',
    ],
    correct: 3,
  },
  {
    id: 129, topic: TOPICS.HUMAN_BODY,
    source: 'NYS Regents June 2024 #13',
    text: 'Organisms maintain internal stability in a changing environment. To do this, they make a series of adjustments. The process of making these continual adjustments is referred to as',
    choices: [
      'cellular respiration',
      'active transport',
      'natural selection',
      'dynamic equilibrium',
    ],
    correct: 3,
  },
  {
    id: 130, topic: TOPICS.EVOLUTION,
    source: 'NYS Regents June 2024 #14',
    text: 'A species of octopus lives in the depths of the ocean where oxygen levels are low. These octopuses have specific proteins in their blood that allow for more efficient oxygen transport than in those that live in surface waters. Which statement best explains the presence of these proteins in the octopuses living deep in the ocean?',
    choices: [
      'Migration to warmer and shallower ocean water favored the formation of the specific proteins.',
      'Octopuses that had the specific proteins were able to survive and reproduce in the deep water environment and passed the trait on to future generations.',
      'When some octopuses migrated to a deeper environment, they needed to produce new proteins so that their blood could carry more oxygen.',
      'Mutations occurred in the body cells of the octopuses, which resulted in the specific proteins being produced and passed on to their offspring.',
    ],
    correct: 1,
  },
  {
    id: 131, topic: TOPICS.CELL_BIOLOGY,
    source: 'NYS Regents June 2024 #15',
    text: 'Tissue engineering is being developed as a technology that would use laboratory-grown tissues to replace diseased or damaged human body parts, such as hearts and kidneys. In order to build these new body parts, scientists would start by',
    choices: [
      'assembling molecules directly into tissues that can make body systems',
      'making organelles and using the organelles to develop organs',
      'engineering body systems in order to develop organelles for transplant',
      'growing cells to develop tissues and then growing these tissues to form an organ',
    ],
    correct: 3,
  },
  {
    id: 132, topic: TOPICS.CELL_BIOLOGY,
    source: 'NYS Regents June 2024 #16',
    text: 'People with cystic fibrosis have decreased levels of some digestive enzymes in their small intestines. It is essential that they take enzyme supplements in order to prevent malnutrition. These enzymes are an important part of the digestive process because they',
    choices: [
      'break down foods so that nutrients can be absorbed and used',
      'contain vitamins and other nutrients necessary for a healthy diet',
      'allow the person to synthesize large, inorganic nutrient molecules',
      'are the building blocks of carbohydrates and other nutrient molecules',
    ],
    correct: 0,
  },
  {
    id: 133, topic: TOPICS.HUMAN_BODY,
    source: 'NYS Regents June 2024 #18',
    text: 'Kidney-transplant surgery places a healthy kidney from one person into the body of another. The body will often produce substances that work against this transplanted organ. The system most directly involved in attacking the transplanted kidney is the',
    choices: [
      'excretory system',
      'nervous system',
      'circulatory system',
      'immune system',
    ],
    correct: 3,
  },
  {
    id: 134, topic: TOPICS.HUMAN_BODY,
    source: 'NYS Regents June 2024 #20',
    text: 'When body temperature gets too low, blood vessels in the skin constrict reducing heat loss, and muscles begin shivering generating heat, causing body temperature to increase. These events can be best described as an example of',
    choices: [
      'a feedback mechanism that maintains homeostasis',
      'a cycle that regulates cellular communication',
      'an immune system response to increasing heart rate',
      'a body system regulating hormone production',
    ],
    correct: 0,
  },
  {
    id: 135, topic: TOPICS.ECOLOGY,
    source: 'NYS Regents June 2024 #21',
    text: 'The World Wildlife Federation\'s recent report indicated that there has been a 60% decline in the size of monitored wildlife populations in just over 40 years. The most likely factor contributing to this decline was',
    choices: [
      'animals reproducing successfully',
      'the destruction of many natural habitats',
      'passing environmental protection laws',
      'the introduction of native species into habitats',
    ],
    correct: 1,
  },
  {
    id: 136, topic: TOPICS.ECOLOGY,
    source: 'NYS Regents June 2024 #22',
    text: 'An Adirondack Mountain ecosystem is represented below. An abiotic factor in this ecosystem is the',
    choices: [
      'pH of the soil where the trees grow',
      'number of deer of reproductive age',
      'different species of grass present',
      'balance between predators and prey',
    ],
    correct: 0,
  },
  {
    id: 137, topic: TOPICS.ECOLOGY,
    source: 'NYS Regents June 2024 #23',
    text: 'A partial food chain is represented: Grasses → Field mice → Owls. A student observed owls hunting mice in a field. Some chemicals from the waste products of the owls were made available to be absorbed by the roots of the grasses due to the action of',
    choices: [
      'autotrophs',
      'carnivores',
      'herbivores',
      'decomposers',
    ],
    correct: 3,
  },
  {
    id: 138, topic: TOPICS.CELL_BIOLOGY,
    source: 'NYS Regents June 2024 #24',
    text: 'Which two terms are opposite processes?',
    choices: [
      'autotrophic nutrition and photosynthesis',
      'asexual reproduction and cloning',
      'digestion and synthesis',
      'natural selection and evolution',
    ],
    correct: 2,
  },
  {
    id: 139, topic: TOPICS.ECOLOGY,
    source: 'NYS Regents June 2024 #25',
    text: 'Which human activity would most likely deplete finite resources?',
    choices: [
      'recycling of aluminum and paper',
      'protection of wildlife habitats',
      'uncontrolled population growth',
      'regulations that reduce industrial pollution',
    ],
    correct: 2,
  },
  {
    id: 140, topic: TOPICS.GENETICS,
    source: 'NYS Regents June 2024 #26',
    text: 'Scientists cloned two baby macaques from a single body cell. These monkeys are genetically',
    choices: [
      'identical to each other, but different from the donor of the body cell',
      'different from each other, but identical to the donor of the body cell',
      'identical to each other and to the donor of the body cell',
      'different from each other and from the donor of the body cell',
    ],
    correct: 2,
  },
  {
    id: 141, topic: TOPICS.ECOLOGY,
    source: 'NYS Regents June 2024 #27',
    text: 'Which event would most likely be the immediate result of significantly lowering the oxygen concentration in a freshwater lake?',
    choices: [
      'a decrease in the number of fish',
      'an increase in the number of plants',
      'an increase in biodiversity',
      'a decrease in water temperature',
    ],
    correct: 0,
  },
  {
    id: 142, topic: TOPICS.GENETICS,
    source: 'NYS Regents June 2024 #28',
    text: 'Scientists have modified papayas to be resistant to the papaya ringspot virus and to decrease the time that it takes for them to ripen. These modifications',
    choices: [
      'may cause papayas to ripen too slowly, causing loss of revenue',
      'are passed to any organism that eats them, making the organism resistant to the virus',
      'are an example of using agricultural technologies to increase farm yields',
      'could spread ringspot virus throughout the entire ecosystem',
    ],
    correct: 2,
  },
  {
    id: 143, topic: TOPICS.HUMAN_BODY,
    source: 'NYS Regents June 2024 #29',
    text: 'Vaccinated individuals are protected from disease because their bodies have been stimulated to',
    choices: [
      'produce antibodies against specific pathogens',
      'synthesize antigens against harmful microbes',
      'make fewer white blood cells during infection',
      'manufacture more enzymes to react to microbes',
    ],
    correct: 0,
  },
  {
    id: 144, topic: TOPICS.ECOLOGY,
    source: 'NYS Regents June 2024 #30',
    text: 'A species of predatory wasp is introduced to control an insect pest. A possible negative consequence of this action is that the new predatory wasp may',
    choices: [
      'limit the population of the insect pest',
      'prey on beneficial insects',
      'disrupt mineral availability in the ecosystem',
      'cause an increase in pesticide-resistant plants',
    ],
    correct: 1,
  },
  {
    id: 145, topic: TOPICS.ECOLOGY,
    source: 'NYS Regents June 2024 #32',
    text: 'Industrialization has contributed to unsafe levels of mercury compounds building up in aquatic ecosystems. Which statement is best supported by information about the levels of mercury present in seafood?',
    choices: [
      'Human activities do not affect mercury levels in fish species.',
      'Future generations can be affected by choices made by past and present generations.',
      'Fish that consume plants have the highest levels of mercury compounds.',
      'If people stop eating fish, then the mercury levels in fish will decrease.',
    ],
    correct: 1,
  },
  {
    id: 146, topic: TOPICS.GENETICS,
    source: 'NYS Regents June 2024 #33',
    text: 'Grasshopper mice are unaffected by the painful venom of the bark scorpion. Scientists have determined that these mice have one amino acid difference in their pain receptors, which causes the receptor to function differently. This change in protein function was originally caused by a change in',
    choices: [
      'molecular bases located in the nucleus',
      'fat molecules in the cell membrane',
      'the amino acids in the DNA',
      'the genes located in the protein',
    ],
    correct: 0,
  },
  {
    id: 147, topic: TOPICS.GENETICS,
    source: 'NYS Regents June 2024 #37',
    text: 'Researchers found that genetically identical water fleas show different appearances depending on the type of predator in their environment. Which statement best explains why the three genetically identical water fleas have different appearances?',
    choices: [
      'Random alterations of genes occur in water fleas when they eat different foods.',
      'Predators in the water flea\'s environment cause mutations in the water flea.',
      'Genes are not involved in the appearance of these water fleas.',
      'Water flea gene expression can be influenced by the type of predator present in their environment.',
    ],
    correct: 3,
  },
  {
    id: 148, topic: TOPICS.GENETICS,
    source: 'NYS Regents June 2024 #38',
    text: 'It was widely accepted that humans inherit their mitochondria only from their mothers. However, evidence was found that some children inherit mitochondria from their fathers. This discovery illustrates the concept that',
    choices: [
      'inquiry does not judge the reliability of sources',
      'experiments without controls are not valid',
      'scientific explanations are tentative and subject to change',
      'advancements in technology usually make scientific theories invalid',
    ],
    correct: 2,
  },
  {
    id: 149, topic: TOPICS.CELL_BIOLOGY,
    source: 'NYS Regents June 2024 #39',
    text: 'The most likely explanation for why children who inherited mutated mitochondria suffer fatigue and muscle pain is that their mitochondria fail to',
    choices: [
      'provide the antigens needed to fight the mutated DNA',
      'regulate the transport of nutrients to the muscle cells',
      'synthesize the starch needed by the muscles',
      'release enough energy for cells to function properly',
    ],
    correct: 3,
  },
  {
    id: 150, topic: TOPICS.EVOLUTION,
    source: 'NYS Regents June 2024 #40',
    text: 'Burmese pythons are an invasive species in the Everglades. A rare hard freeze killed 40–90% of the pythons. Which statement best describes a likely cause for the changes that might exist in the present python population?',
    choices: [
      'The python species needed cold-tolerant genes, and they appeared in 2010 by rapid mutation.',
      'The freeze event served as a selecting agent, and a higher percentage of the pythons existing today are cold-tolerant.',
      'Many individual pythons were unable to reproduce during the freeze event and did not pass on their cold-tolerant genes.',
      'There was no actual change in the population, and if a similar freeze event occurred again, 40–90% of the snakes would die.',
    ],
    correct: 1,
  },
  {
    id: 151, topic: TOPICS.EVOLUTION,
    source: 'NYS Regents June 2024 #41',
    text: 'Pythons in their native habitat often eat a large animal and then do not feed again for weeks. In the Florida Everglades, food sources are often small mammals and birds. The current large python population in Florida can be described as a species that',
    choices: [
      'will quickly die out because there are no appropriate food sources in their environment',
      'will develop new digestive organs as needed to succeed in the Florida Everglades',
      'has expanded only because small animals reproduce so quickly that they provide an unlimited food source',
      'has already successfully adapted to an unfamiliar environment through natural selection',
    ],
    correct: 3,
  },
  {
    id: 152, topic: TOPICS.ECOLOGY,
    source: 'NYS Regents June 2024 #42',
    text: 'Fishers are mammals that prefer to live in forested areas and have no natural enemies. New regulations have been adopted that affect the trapping of fishers. Which action would probably result in an increase in the fisher population?',
    choices: [
      'removing all regulations regarding fisher trapping',
      'increasing the area where fisher trapping is allowed',
      'changing the fisher trapping season from 46 to 30 days',
      'decreasing the cost of the permit needed for fisher trapping',
    ],
    correct: 2,
  },

  // ── NYS Living Environment Regents — January 2024 ───────────────────────────
  {
    id: 153, topic: TOPICS.CELL_BIOLOGY,
    source: 'NYS Regents January 2024 #1',
    text: 'Homeostasis in single-celled organisms is maintained through the proper functioning of',
    choices: [
      'organelles',
      'estrogen',
      'guard cells',
      'antibodies',
    ],
    correct: 0,
  },
  {
    id: 154, topic: TOPICS.EVOLUTION,
    source: 'NYS Regents January 2024 #2',
    text: 'In a stable ecosystem, each niche is usually occupied by only one species. The species occupying a particular niche is able to continue to remain there as a direct result of',
    choices: [
      'ecological succession',
      'favorable adaptations',
      'a new mutation',
      'selective breeding',
    ],
    correct: 1,
  },
  {
    id: 155, topic: TOPICS.GENETICS,
    source: 'NYS Regents January 2024 #3',
    text: 'When exposed to ultraviolet (UV) light, human skin cells produce the protein melanin. This protein helps protect skin cells from damage caused by UV light. This is an example of',
    choices: [
      'a gene that cannot be passed on to offspring',
      'natural selection producing a new species',
      'sexual reproduction that will produce variation',
      'environmental factors affecting gene expression',
    ],
    correct: 3,
  },
  {
    id: 156, topic: TOPICS.GENETICS,
    source: 'NYS Regents January 2024 #4',
    text: 'The human pancreas contains cells that secrete insulin. Only these cells produce insulin because',
    choices: [
      'cells eliminate the parts of the genetic code they do not use',
      'all other cells lack the genes for insulin production',
      'different cells use different parts of the genetic information that they contain',
      'they are the only cells associated with the digestion of sugar',
    ],
    correct: 2,
  },
  {
    id: 157, topic: TOPICS.GENETICS,
    source: 'NYS Regents January 2024 #8',
    text: 'The diagram below represents a process that occurs in many cells, showing a DNA double helix being copied. The main function of this process is to',
    choices: [
      'produce variations in cells before asexual reproduction',
      'synthesize antigens needed to combat immunity',
      'provide exact copies of the genetic code before cell division',
      'make proteins needed for cellular metabolism',
    ],
    correct: 2,
  },
  {
    id: 158, topic: TOPICS.ECOLOGY,
    source: 'NYS Regents January 2024 #9',
    text: 'Which interaction is an example of competition between two species?',
    choices: [
      'mice and chipmunks eating sunflower seeds at a bird feeder',
      'mold growing on a tree that has fallen in the forest',
      'a coyote feeding on the remains of a squirrel killed on the road',
      'a lion stalking, killing, and eating a zebra',
    ],
    correct: 0,
  },
  {
    id: 159, topic: TOPICS.ECOLOGY,
    source: 'NYS Regents January 2024 #10',
    text: 'One important reason that humans have such a significant effect on Earth\'s ecosystems is that humans',
    choices: [
      'remove large amounts of carbon dioxide from the air',
      'are able to increase the amount of finite resources',
      'can modify the environment through technology',
      'reproduce faster than other animal species',
    ],
    correct: 2,
  },
  {
    id: 160, topic: TOPICS.EVOLUTION,
    source: 'NYS Regents January 2024 #11',
    text: 'Mutations can be beneficial to a species because they',
    choices: [
      'can lead to some members of a species having favorable traits in a changing environment',
      'allow organisms to mate with other species',
      'will lead to the loss of traits that are helpful in a specific environment',
      'cause the reproductive rate of a species to decrease',
    ],
    correct: 0,
  },
  {
    id: 161, topic: TOPICS.EVOLUTION,
    source: 'NYS Regents January 2024 #12',
    text: 'Within ten years after the introduction of a new mosquito spray, very few of the descendants of the targeted mosquito populations were killed by the usual dose of the spray. The best explanation for this is that',
    choices: [
      'ingesting the spray caused the mosquitoes to become resistant to it',
      'the spray polluted the water in which the mosquitoes deposited their eggs',
      'the spray killed organisms that caused diseases in mosquitoes',
      'existing variations in the mosquito population provided resistance to the spray',
    ],
    correct: 3,
  },
  {
    id: 162, topic: TOPICS.HUMAN_BODY,
    source: 'NYS Regents January 2024 #13',
    text: 'Once implanted into a recipient, bioengineered blood vessels made from a plastic-like material become covered with the recipient\'s own cells. An advantage of using these bioengineered vessels is that',
    choices: [
      'they contain antibodies that will block an immune response',
      'viruses and bacteria will not infect the cells on these blood vessels',
      'they do not trigger an immune response',
      'the engineered blood vessels can be inherited by future generations',
    ],
    correct: 2,
  },
  {
    id: 163, topic: TOPICS.CELL_BIOLOGY,
    source: 'NYS Regents January 2024 #14',
    text: 'Messages between parts of the body are carried by a series of nerve cells that are not in direct contact with each other. Which statement best explains how the message is delivered, even though these cells are not physically connected?',
    choices: [
      'The cells communicate with the use of chemical messengers between them.',
      'The cells send messages by direct contact with other types of cells.',
      'Nutrients are the primary means of communication between cells.',
      'Ribosomes move out of one nerve cell into the other.',
    ],
    correct: 0,
  },
  {
    id: 164, topic: TOPICS.CELL_BIOLOGY,
    source: 'NYS Regents January 2024 #15',
    text: 'Members of a species of small fish from a freshwater stream were accidentally added to a saltwater tank. Within an hour, all of the freshwater fish were dead, while the saltwater fish were still healthy. The freshwater fish most likely died because they',
    choices: [
      'became severely dehydrated due to the process of diffusion',
      'swelled up and died due to taking in too much water',
      'had no freshwater organisms to eat in the saltwater tank, so they died of starvation',
      'ate all of the plants in the tank, so there was no longer oxygen in the water',
    ],
    correct: 0,
  },
  {
    id: 165, topic: TOPICS.GENETICS,
    source: 'NYS Regents January 2024 #17',
    text: 'The axolotl, also known as the Mexican walking fish, can regenerate parts of its body, such as a leg or a tail. The regeneration of these parts involves the process of',
    choices: [
      'biotechnology',
      'selective breeding',
      'mitotic cell division',
      'fertilization',
    ],
    correct: 2,
  },
  {
    id: 166, topic: TOPICS.ECOLOGY,
    source: 'NYS Regents January 2024 #18',
    text: 'Which would most likely control an insect pest and be the least harmful to the environment?',
    choices: [
      'eliminating the plants that the insect pest feeds on',
      'using traps baited with sex hormones that attract the insect pest',
      'releasing imported insects that prey on the insect pest',
      'spraying areas with insecticides that affect the insect pest',
    ],
    correct: 1,
  },
  {
    id: 167, topic: TOPICS.CELL_BIOLOGY,
    source: 'NYS Regents January 2024 #19',
    text: 'Which statement concerning the functioning of cells is correct?',
    choices: [
      'Mitochondria transfer energy from organic compounds to form ATP molecules.',
      'Vacuoles are the sites of DNA synthesis.',
      'The nucleus stores genes that will later be removed from the cell.',
      'The cell membrane prevents the diffusion of all poisons into a cell from its environment.',
    ],
    correct: 0,
  },
  {
    id: 168, topic: TOPICS.ECOLOGY,
    source: 'NYS Regents January 2024 #20',
    text: 'The photograph shows the result of a deadly wildfire in California. What is most likely expected to occur to this ecosystem in the future?',
    choices: [
      'The ecosystem will eventually restore itself, but will be very different from the original.',
      'The ecosystem will eventually restore itself and will be similar to the original.',
      'The ecosystem will be completely reestablished after six months.',
      'The ecosystem will be unable to reach a state of stability again.',
    ],
    correct: 1,
  },
  {
    id: 169, topic: TOPICS.GENETICS,
    source: 'NYS Regents January 2024 #21',
    text: 'Kittens born in the same litter often have similar characteristics, such as fur texture and markings, because they',
    choices: [
      'were fed milk from the same mother',
      'developed in the same environment',
      'inherited similar genes',
      'were born at the same time',
    ],
    correct: 2,
  },
  {
    id: 170, topic: TOPICS.REPRODUCTION,
    source: 'NYS Regents January 2024 #22',
    text: 'Damage to which structure would directly interfere with the nutritional needs of a developing embryo?',
    choices: [
      'ovary',
      'testes',
      'lungs',
      'placenta',
    ],
    correct: 3,
  },
  {
    id: 171, topic: TOPICS.HUMAN_BODY,
    source: 'NYS Regents January 2024 #24',
    text: 'Test anxiety and stress can trigger many responses in the human body including increased heart rate, respiratory rates, and increased sweating. These physical responses to increased stress are examples of',
    choices: [
      'competition',
      'infections',
      'gene manipulation',
      'feedback mechanisms',
    ],
    correct: 3,
  },
  {
    id: 172, topic: TOPICS.ECOLOGY,
    source: 'NYS Regents January 2024 #25',
    text: 'A self-sustaining ecosystem in a glass tank must include',
    choices: [
      'producers, decomposers, light, and water',
      'herbivores, consumers, decomposers, and water',
      'decomposers, heterotrophs, light, water, and carbon',
      'heterotrophs, water, and carbon dioxide',
    ],
    correct: 0,
  },
  {
    id: 173, topic: TOPICS.HUMAN_BODY,
    source: 'NYS Regents January 2024 #26',
    text: 'Scientists examined 39 tree species from warm and cold areas of Earth, and found that the trees were able to regulate their leaf temperatures, keeping them about 21°C. This is an example of',
    choices: [
      'maintaining homeostasis by responding to environmental change',
      'controlling carbon dioxide release during daylight hours',
      'decreasing evaporation for cooling during evening hours',
      'failing to respond to environmental conditions',
    ],
    correct: 0,
  },
  {
    id: 174, topic: TOPICS.CELL_BIOLOGY,
    source: 'NYS Regents January 2024 #28',
    text: 'A sea slug found along the eastern coast of North America incorporates part of algae into its tissues, allowing the sea slug to directly use energy from the Sun. Which structures from the algae would the sea slug need to take in to accomplish this?',
    choices: [
      'nuclei',
      'mitochondria',
      'chloroplasts',
      'ribosomes',
    ],
    correct: 2,
  },
  {
    id: 175, topic: TOPICS.GENETICS,
    source: 'NYS Regents January 2024 #29',
    text: 'Which three processes usually result in the greatest variety of possible gene combinations?',
    choices: [
      'mutation, meiosis, and fertilization',
      'differentiation, mitosis, and fertilization',
      'cloning, meiosis, and fertilization',
      'differentiation, mutation, and fertilization',
    ],
    correct: 0,
  },
  {
    id: 176, topic: TOPICS.GENETICS,
    source: 'NYS Regents January 2024 #30',
    text: 'All the genetic information necessary for the growth and development in a sexually reproducing animal is present in',
    choices: [
      'egg cells, only',
      'sperm cells, only',
      'either sperm cells or egg cells',
      'zygotes',
    ],
    correct: 3,
  },
  {
    id: 177, topic: TOPICS.ECOLOGY,
    source: 'NYS Regents January 2024 #31',
    text: 'Venus flytraps do not capture the insects that usually pollinate them. Researchers found that 87% of Venus flytrap pollinators can fly, and only 20% of insects captured can fly. In order to support the claim that the pollinators are mostly flying insects, the researchers would',
    choices: [
      'publish the study immediately and ask other researchers to support their claim',
      'expand the study to other Venus flytrap habitats and determine the number of flying and nonflying insect remains found in the plants there',
      'continue to study the insects found in the Venus flytraps in the research area, but only record insects without wings',
      'compare the kinds of insect bodies with and without wings found in pitcher plants with the kinds found in the original study',
    ],
    correct: 1,
  },
  {
    id: 178, topic: TOPICS.GENETICS,
    source: 'NYS Regents January 2024 #32',
    text: 'In an experiment, nuclei were removed from the intestinal cells of tadpoles and transplanted into eggs whose nuclei had been removed. A small number of these eggs developed into normal frogs. This suggests that the nuclei of tadpole intestinal cells',
    choices: [
      'can undergo meiosis and form gametes',
      'contain all of the genetic information needed for frog development',
      'will undergo mitosis and form a new zygote',
      'fused with the frog genes already present in the zygotes',
    ],
    correct: 1,
  },
  {
    id: 179, topic: TOPICS.EVOLUTION,
    source: 'NYS Regents January 2024 #35',
    text: 'Desert camels have large feet, nostrils that can be closed, and fat stored in their humps. Which statement best describes these camel characteristics?',
    choices: [
      'Natural selection favored other characteristics over the ones listed.',
      'The listed characteristics are the result of manipulating genes in female camels.',
      'These characteristics have adaptive value for the camel.',
      'Camels have these characteristics because they needed them.',
    ],
    correct: 2,
  },
  {
    id: 180, topic: TOPICS.ECOLOGY,
    source: 'NYS Regents January 2024 #36',
    text: 'Decreases in soil, air, and water quality can result from human activities that have',
    choices: [
      'negatively influenced these resources by removing pollutants',
      'modified natural cycles, increasing the quality of these resources',
      'resulted in an increase in the stability of these resources',
      'had a negative influence on the natural systems that maintain these resources',
    ],
    correct: 3,
  },
  {
    id: 181, topic: TOPICS.ECOLOGY,
    source: 'NYS Regents January 2024 #37',
    text: 'Current evidence has indicated that with an increase in global temperature, there will be more infectious and respiratory diseases. Worldwide efforts to slow down or halt the rise in temperature are being developed to',
    choices: [
      'increase the strain on the biosphere, resulting in the destruction of ecosystems',
      'introduce proposals that will limit the improvement of air, soil, and water quality',
      'protect resources for future generations',
      'increase the release of greenhouse gases into the atmosphere',
    ],
    correct: 2,
  },
  {
    id: 182, topic: TOPICS.GENETICS,
    source: 'NYS Regents January 2024 #38',
    text: 'Which sequence represents the correct interaction of organelles and processes for the synthesis of proteins?',
    choices: [
      'nucleus → amino acid bonding → ribosomes → gene codes',
      'ribosomes → nucleus → gene codes → amino acid bonding',
      'ribosomes → gene codes → amino acid bonding → nucleus',
      'nucleus → gene codes → ribosomes → amino acid bonding',
    ],
    correct: 3,
  },
  {
    id: 183, topic: TOPICS.REPRODUCTION,
    source: 'NYS Regents January 2024 #39',
    text: 'In a diagram of the human female reproductive system, if both fallopian tubes (structures B) were damaged or blocked, what would occur?',
    choices: [
      'The egg would remain in the uterus and not travel to the ovary.',
      'The egg would not be able to unite with the sperm.',
      'The reproductive cycle in the female would stop.',
      'The process of mitosis would stop in the ovary.',
    ],
    correct: 1,
  },
  {
    id: 184, topic: TOPICS.GENETICS,
    source: 'NYS Regents January 2024 #41',
    text: 'Based on studies involving newborns, medical professionals recommend that pregnant women avoid secondhand smoke because chemicals in the smoke',
    choices: [
      'cause mutations in the cells of the ovaries',
      'affect the growth of the fetus',
      'are unable to pass through the placenta',
      'decrease digestion in the stomach of the fetus',
    ],
    correct: 1,
  },
  {
    id: 185, topic: TOPICS.CELL_BIOLOGY,
    source: 'NYS Regents January 2024 #42',
    text: 'Various plant species from warm and cold areas control water loss. Even though these plants grow in different environments, they most likely control water loss through',
    choices: [
      'the synthesis of proteins in their roots',
      'the functioning of the cell membranes in their flowers',
      'the actions of the guard cells in their leaves',
      'the storage of glucose in the vacuoles in their stems',
    ],
    correct: 2,
  },

  // ── NYS Living Environment Regents — June 2023 ──────────────────────────────
  {
    id: 186, topic: TOPICS.HUMAN_BODY,
    source: 'NYS Regents June 2023 #1',
    text: 'Which two body systems provide humans with the raw materials necessary for their cells to release energy?',
    choices: [
      'muscular and skeletal',
      'endocrine and nervous',
      'digestive and respiratory',
      'reproductive and circulatory',
    ],
    correct: 2,
  },
  {
    id: 187, topic: TOPICS.HUMAN_BODY,
    source: 'NYS Regents June 2023 #2',
    text: 'An example of an activity that best contributes to maintaining homeostasis in an organism is a',
    choices: [
      'bear eating fish from a polluted stream',
      'deer losing its fur at the start of winter',
      'person not sweating on a 100°F day',
      'response to a chickenpox vaccination',
    ],
    correct: 3,
  },
  {
    id: 188, topic: TOPICS.GENETICS,
    source: 'NYS Regents June 2023 #3',
    text: 'Equine cloning can be used to produce performance horses. Although the horses are clones of each other, they may still exhibit slight differences in appearance. The differences in the physical characteristics of the cloned horses are most likely the result of',
    choices: [
      'environmental influences',
      'natural selection',
      'sexual reproduction',
      'changes in gametes',
    ],
    correct: 0,
  },
  {
    id: 189, topic: TOPICS.ECOLOGY,
    source: 'NYS Regents June 2023 #4',
    text: 'Which situation is an example of an organism responding to an abiotic factor?',
    choices: [
      'Plants in a forest grow toward areas where there is more sunlight available.',
      'Rabbits attract mates by performing a mating dance.',
      'Woodpeckers peck holes in the trunks of trees to find insects for food.',
      'Deer eat tree bark in winter when other food is scarce.',
    ],
    correct: 0,
  },
  {
    id: 190, topic: TOPICS.GENETICS,
    source: 'NYS Regents June 2023 #5',
    text: 'CRISPR/Cas9 is a powerful system that bacteria use to cut and remove DNA from invading viruses. Using CRISPR/Cas9, researchers have successfully corrected a disease-causing mutation for muscular dystrophy in laboratory mice. Correcting the harmful mutation using CRISPR/Cas9 is an example of',
    choices: [
      'biological evolution',
      'cloning techniques',
      'genetic engineering',
      'selective breeding',
    ],
    correct: 2,
  },
  {
    id: 191, topic: TOPICS.ECOLOGY,
    source: 'NYS Regents June 2023 #6',
    text: 'Many animal populations living in a particular area would most likely',
    choices: [
      'occupy the same niche',
      'have similar physical requirements',
      'eat the same food',
      'require an input of solar energy',
    ],
    correct: 1,
  },
  {
    id: 192, topic: TOPICS.CELL_BIOLOGY,
    source: 'NYS Regents June 2023 #7',
    text: 'Which statement correctly pairs a cell structure with a function it performs in the cells?',
    choices: [
      'The cell membrane synthesizes proteins for cell processes.',
      'The mitochondria provide energy for cell processes.',
      'Ribosomes regulate which materials enter and leave the cell.',
      'Vacuoles transfer genetic information from one cell to another.',
    ],
    correct: 1,
  },
  {
    id: 193, topic: TOPICS.GENETICS,
    source: 'NYS Regents June 2023 #8',
    text: 'Scientists turned a specialized stomach cell from a mouse into a skin cell by activating a specific gene responsible for the production of skin cells. This provides evidence that',
    choices: [
      'all body cells contain the same DNA, but different genes can be active in different cells',
      'stomach cells and skin cells contain completely different DNA sequences',
      'only specialized cells can be converted into different cell types',
      'genetic engineering permanently changes all cells in an organism',
    ],
    correct: 0,
  },
  {
    id: 194, topic: TOPICS.ECOLOGY,
    source: 'NYS Regents June 2023 #10',
    text: 'Zebra mussels are aquatic animals found in many bodies of fresh water in New York State. When these mussels first appeared, their populations increased rapidly. Lately, the rate of population growth of the zebra mussels has decreased. A reason for this decrease may be',
    choices: [
      'resources needed for the continued growth of their population are limited',
      'competition between zebra mussels for limited resources has decreased',
      'the food available for zebra mussels has decreased, reducing their rate of photosynthesis',
      'a lack of natural predators and disease-causing organisms in their new environment',
    ],
    correct: 0,
  },
  {
    id: 195, topic: TOPICS.ECOLOGY,
    source: 'NYS Regents June 2023 #11',
    text: 'A food web includes coyotes, rodents, insects, roadrunners, lizards, bushes, and grasses. Which statement best describes a relationship represented in this food web?',
    choices: [
      'Bushes are herbivores that feed on insects.',
      'Rodents are consumers that feed on lizards.',
      'Roadrunners are carnivores that feed on insects.',
      'Grasses are producers that are eaten by lizards.',
    ],
    correct: 2,
  },
  {
    id: 196, topic: TOPICS.CELL_BIOLOGY,
    source: 'NYS Regents June 2023 #12',
    text: 'Cell membranes inside the cells that line the stomach pump hydrogen ions from areas of low concentration inside the cells to areas of higher concentration outside the cells. Which activity produces the ATP that makes this pumping possible?',
    choices: [
      'cellular respiration',
      'active transport',
      'carbohydrate digestion',
      'enzyme synthesis',
    ],
    correct: 0,
  },
  {
    id: 197, topic: TOPICS.EVOLUTION,
    source: 'NYS Regents June 2023 #13',
    text: 'If scientists wanted to study the physical characteristics of an extinct animal that once lived in a specific area, the best source of information would be to investigate',
    choices: [
      'plants living in habitats similar to those of long ago',
      'the producer organisms living in that area at the current time',
      'the animals that live in that area today',
      'the fossil record of that area',
    ],
    correct: 3,
  },
  {
    id: 198, topic: TOPICS.HUMAN_BODY,
    source: 'NYS Regents June 2023 #14',
    text: 'Scientists found an effective cancer vaccine that saved Tasmanian devils. The beneficial effect of the vaccine will not be passed on to the Tasmanian devils\' offspring because the',
    choices: [
      'vaccine contained only a small amount of the cancer',
      'cancer can mutate, and the vaccine would then be ineffective',
      'cancer caused the body of the adults to produce antigens against it',
      'vaccine did not produce a change in the sex cells of the adults',
    ],
    correct: 3,
  },
  {
    id: 199, topic: TOPICS.GENETICS,
    source: 'NYS Regents June 2023 #15',
    text: 'Usually, snakes reproduce sexually. However, some female copperhead snakes sometimes produce offspring asexually without sperm from a male. Compared with snakes formed by sexual reproduction, the offspring of these asexually reproducing snakes',
    choices: [
      'have more genetic variation',
      'have limited genetic variation',
      'contain more DNA than the parent',
      'grow larger than the parent',
    ],
    correct: 1,
  },
  {
    id: 200, topic: TOPICS.HUMAN_BODY,
    source: 'NYS Regents June 2023 #16',
    text: 'Myasthenia gravis is an autoimmune disease that occurs when normal communication between nerve and muscle cells is interrupted. The weakness in skeletal muscles is likely due to',
    choices: [
      'the lack of ATP in the muscle caused by a decrease of available carbon dioxide',
      'the brain failing to send the proper hormone signal to vacuoles within muscle cells',
      'the failure of receptor molecules on the muscle to receive the chemical produced by nerve cells',
      'the ribosomes in muscle cells failing to produce enough sugar for muscle contraction',
    ],
    correct: 2,
  },
  {
    id: 201, topic: TOPICS.GENETICS,
    source: 'NYS Regents June 2023 #17',
    text: 'The removal of a short sequence of bases from a gene would most directly affect the',
    choices: [
      'diffusion of materials into a cell',
      'shape of a protein molecule',
      'pH of the cytoplasm',
      'size of a cell\'s nucleus',
    ],
    correct: 1,
  },
  {
    id: 202, topic: TOPICS.ECOLOGY,
    source: 'NYS Regents June 2023 #18',
    text: 'As energy moves through a forest ecosystem, it flows from',
    choices: [
      'heterotrophs to autotrophs',
      'animals to plants',
      'herbivores to carnivores',
      'carnivores to autotrophs',
    ],
    correct: 2,
  },
  {
    id: 203, topic: TOPICS.GENETICS,
    source: 'NYS Regents June 2023 #19',
    text: 'Each winter in the Adirondack Mountains, some of the salt applied to roadways gets washed into lakes. The increase in salt levels in areas where frogs breed has resulted in more male frogs hatching than females. This is an example of',
    choices: [
      'asexual reproduction of male frogs',
      'an abiotic factor affecting gene expression',
      'the normal expression of a gene for female frogs',
      'loss of genetic information for male frogs',
    ],
    correct: 1,
  },
  {
    id: 204, topic: TOPICS.EVOLUTION,
    source: 'NYS Regents June 2023 #21',
    text: 'A certain species of rough-skinned newt produces an extremely powerful toxin. However, the garter snake can eat these newts without being affected by the toxin. Which statement best explains the resistance of garter snakes to the newt toxin?',
    choices: [
      'The snakes needed to become resistant to the toxin in order to survive, so they developed a toxin-resistance gene.',
      'As the newts became more toxic, the snakes became increasingly resistant in order to survive.',
      'Exposure to newt toxin caused a mutation in the snakes, which increased resistance to the toxin.',
      'A random genetic mutation that resulted in toxin resistance increased the survival rates of the snakes that had it, and they passed it on to their offspring.',
    ],
    correct: 3,
  },
  {
    id: 205, topic: TOPICS.GENETICS,
    source: 'NYS Regents June 2023 #22',
    text: 'A podocyte is a highly specialized cell that produces special proteins for filtering fluid in the human kidney. The specialized function of this cell is most dependent on',
    choices: [
      'mutations that produce cells that have a specific shape for filtering the blood',
      'the differentiation of the cell membrane and the functioning of vacuoles',
      'the DNA codes in the cell and the activity of ribosomes',
      'mitochondria in the cell that produce filtering organelles for the kidney',
    ],
    correct: 2,
  },
  {
    id: 206, topic: TOPICS.ECOLOGY,
    source: 'NYS Regents June 2023 #23',
    text: 'Maintaining stability in an ecosystem most likely depends on',
    choices: [
      'a high level of diversity and few resources',
      'little diversity and rapid ecological succession',
      'a high level of diversity and multiple ecological niches',
      'little diversity and multiple extinctions',
    ],
    correct: 2,
  },
  {
    id: 207, topic: TOPICS.CELL_BIOLOGY,
    source: 'NYS Regents June 2023 #24',
    text: 'Which statement best identifies how carbon dioxide and oxygen are involved in photosynthesis and cellular respiration?',
    choices: [
      'Photosynthesis and cellular respiration both use carbon dioxide and release oxygen.',
      'Cellular respiration uses oxygen and releases carbon dioxide, while photosynthesis uses carbon dioxide and releases oxygen.',
      'Cellular respiration uses carbon dioxide and releases oxygen, while photosynthesis uses oxygen and releases carbon dioxide.',
      'Photosynthesis and cellular respiration both use oxygen and release carbon dioxide.',
    ],
    correct: 1,
  },
  {
    id: 208, topic: TOPICS.HUMAN_BODY,
    source: 'NYS Regents June 2023 #25',
    text: 'Antibodies produced against one pathogen infecting the human body may not work against a different pathogen because antibodies are',
    choices: [
      'only produced once in the body so they cannot work on any other infection',
      'unable to produce effective antibiotics against the infection',
      'made of DNA the second pathogen does not contain',
      'specific for the shape of the proteins present on a particular pathogen',
    ],
    correct: 3,
  },
  {
    id: 209, topic: TOPICS.REPRODUCTION,
    source: 'NYS Regents June 2023 #26',
    text: 'A multicellular organism has cells that perform various roles in that organism. This is most likely due to the',
    choices: [
      'differentiation of cells during embryonic development',
      'specialization of gametes',
      'cloning of cells during embryonic development',
      'specialization of zygotes',
    ],
    correct: 1,
  },
  {
    id: 210, topic: TOPICS.CELL_BIOLOGY,
    source: 'NYS Regents June 2023 #27',
    text: 'In plants, guard cells open leaf pores when a large amount of water is available and the sun is shining, but close leaf pores when little water is available. The changes in the guard cells\' activity illustrate',
    choices: [
      'an immune response intended to limit water use',
      'passive transport in response to the Sun shining',
      'a feedback mechanism to control water loss',
      'genetic manipulation caused by the presence or absence of water',
    ],
    correct: 2,
  },
  {
    id: 211, topic: TOPICS.EVOLUTION,
    source: 'NYS Regents June 2023 #28',
    text: 'Today\'s whales and alligators both have pelvic and hind leg bones, yet these bones only function in alligators. This similarity between whales and alligators supports the idea that',
    choices: [
      'whales evolved from alligators',
      'alligators evolved from whales',
      'alligators and whales share a common ancestor',
      'alligators and whales share the same genetic mutations',
    ],
    correct: 2,
  },
  {
    id: 212, topic: TOPICS.ECOLOGY,
    source: 'NYS Regents June 2023 #29',
    text: 'The most likely reason decreased levels of oxygen in the water result in a decrease in the body size of some fish species is',
    choices: [
      'due to the presence of more plant species carrying out photosynthesis',
      'the species producing more ATP molecules and less oxygen',
      'due to an increase in the size of the gills bringing in more carbon dioxide',
      'the species being unable to meet the energy requirements of a larger body size',
    ],
    correct: 3,
  },
  {
    id: 213, topic: TOPICS.ECOLOGY,
    source: 'NYS Regents June 2023 #30',
    text: 'One human activity that most directly contributes to the decrease in the amount of oxygen present in ocean water is',
    choices: [
      'overfishing, causing a lack of biodiversity',
      'planting more trees, causing more soil erosion',
      'introducing foreign species, causing more competition',
      'industrialization, which releases large amounts of carbon dioxide into the atmosphere',
    ],
    correct: 3,
  },
  {
    id: 214, topic: TOPICS.REPRODUCTION,
    source: 'NYS Regents June 2023 #31',
    text: 'A graph represents the levels of estrogen and progesterone across a 28-day female reproductive cycle. When an egg is released from the ovary, which statement is correct regarding the interaction of these hormones?',
    choices: [
      'When the amounts of estrogen and progesterone are at the same level, an egg begins to develop in the ovary.',
      'When an egg is released from the ovary, the level of estrogen is higher than the level of progesterone.',
      'The level of progesterone controls the cycle since it is always higher than the level of estrogen.',
      'After an egg is released from the ovary, the level of estrogen keeps increasing, causing the level of progesterone to decrease.',
    ],
    correct: 1,
  },
  {
    id: 215, topic: TOPICS.ECOLOGY,
    source: 'NYS Regents June 2023 #35',
    text: 'Pikas are small mammals on the Tibetan plateau. Pikas are prey for many predators, their burrows help drain groundwater, and the burrows serve as nesting sites for birds. If the pika populations are completely removed from the grasslands, the most likely result will be that the ecosystems will become',
    choices: [
      'unstable, because predators will have fewer prey, birds will have fewer nesting sites, and groundwater supplies will be disrupted',
      'more stable, because the pikas will be replaced by other species, birds will adapt to nesting above ground, and the soil will become more fertile',
      'unstable, because predators will migrate to nearby ecosystems, birds will nest in nearby trees, and other small animals will make burrows',
      'more stable, because the pikas will no longer eat the grasses, birds will migrate, and small lakes will form because the water will not drain',
    ],
    correct: 0,
  },
  {
    id: 216, topic: TOPICS.EVOLUTION,
    source: 'NYS Regents June 2023 #36',
    text: 'Lamarck proposed that organisms developed new characteristics through the inheritance of acquired traits. As more evidence became available, this theory was replaced by Darwin\'s theory of evolution. This modification of scientific knowledge illustrates that',
    choices: [
      'scientists do not communicate with each other and often make mistakes',
      'all scientific explanations are tentative and subject to change or improvement',
      'scientists often ignore evidence that does not help prove their theory',
      'hypotheses seldom change even when new discoveries are made',
    ],
    correct: 1,
  },
  {
    id: 217, topic: TOPICS.GENETICS,
    source: 'NYS Regents June 2023 #37',
    text: 'The activity of nuclease enzymes would most likely result in the release of',
    choices: [
      'four different kinds of molecular bases',
      'glucose',
      'a variety of different amino acids',
      'hormones',
    ],
    correct: 0,
  },
  {
    id: 218, topic: TOPICS.CELL_BIOLOGY,
    source: 'NYS Regents June 2023 #38',
    text: 'The end products resulting from the action of amylase on starch would most likely be',
    choices: [
      'starches and proteins',
      'carbon dioxide and water',
      'amino acids',
      'simple sugars',
    ],
    correct: 3,
  },
  {
    id: 219, topic: TOPICS.HUMAN_BODY,
    source: 'NYS Regents June 2023 #39',
    text: 'Another important molecule produced by the pancreas functions to decrease glucose levels in the blood. This molecule is',
    choices: [
      'progesterone',
      'insulin',
      'testosterone',
      'ATP',
    ],
    correct: 1,
  },
  {
    id: 220, topic: TOPICS.GENETICS,
    source: 'NYS Regents June 2023 #40',
    text: 'The process of meiotic division (spermatogenesis) in human males produces four sperm cells, each with',
    choices: [
      'all of the genetic information contained in the diploid germ cell',
      'one-quarter of the genetic information contained in the diploid germ cell',
      'twice the genetic information found in the diploid germ cell',
      'one-half of the genetic information found in the diploid germ cell',
    ],
    correct: 3,
  },
  {
    id: 221, topic: TOPICS.CELL_BIOLOGY,
    source: 'NYS Regents June 2023 #41',
    text: 'A student viewed a slide of an onion root tip with a compound light microscope. In order to observe whether or not this root tip was growing, the student should',
    choices: [
      'switch to a higher magnification and look for evidence of cell division',
      'switch to a lower magnification and look for evidence of cell division',
      'switch to a lower magnification and add a stain to the onion root tip cells',
      'switch to a higher magnification and add salt solution to the onion root tip cells',
    ],
    correct: 0,
  },
  {
    id: 222, topic: TOPICS.CELL_BIOLOGY,
    source: 'NYS Regents June 2023 #43',
    text: 'Which statement is an example of a hypothesis that can be tested through experimentation?',
    choices: [
      'The number of times a dog wags its tail is a direct measure of how happy the dog is.',
      'Is the ability of a fish to taste food affected by how clear the water is where it lives?',
      'A plant\'s fear of herbivores increases as the plant grows older.',
      'Bacterial growth will rapidly increase as the temperature increases.',
    ],
    correct: 3,
  },

  // ── Lab Questions ───────────────────────────────────────────────────────────
  // labType: 'experimental' | 'graphing' | 'microscopy' | 'dissection' | 'data'

  // Experimental Design
  {
    id: 223, topic: TOPICS.CELL_BIOLOGY, labType: 'experimental',
    text: 'A student tests whether temperature affects enzyme activity by measuring reaction rates at 10°C, 20°C, 37°C, and 50°C while keeping all other conditions the same. What is the independent variable in this experiment?',
    choices: ['Reaction rate', 'Type of enzyme', 'Temperature', 'Amount of substrate'],
    correct: 2,
    explanation: 'The independent variable is the one the experimenter deliberately changes — temperature. Reaction rate is the dependent variable (what is measured).',
  },
  {
    id: 224, topic: TOPICS.CELL_BIOLOGY, labType: 'experimental',
    text: 'In a valid experiment, the control group differs from the experimental group in that the control group',
    choices: [
      'receives the experimental treatment at a higher dose',
      'does not receive the experimental treatment',
      'uses different measuring equipment',
      'is observed for a longer period of time',
    ],
    correct: 1,
    explanation: 'The control group is identical to the experimental group except it does not receive the variable being tested. It provides a baseline to compare results against.',
  },
  {
    id: 225, topic: TOPICS.GENETICS, labType: 'experimental',
    text: 'A student wants to determine whether a new fertilizer improves plant growth. She grows 20 identical bean plants — 10 get the fertilizer, 10 do not. Both groups receive the same amount of light, water, and soil. Why is it important to keep all other variables the same?',
    choices: [
      'To make the experiment faster',
      'To ensure only the fertilizer causes any difference in growth',
      'To use fewer resources',
      'To make the data easier to graph',
    ],
    correct: 1,
    explanation: 'Controlling all other variables (constants) ensures that any difference between the groups can only be caused by the fertilizer — the independent variable being tested.',
  },
  {
    id: 226, topic: TOPICS.CELL_BIOLOGY, labType: 'experimental',
    text: 'After an experiment, a student\'s results are very different from what was expected. What is the most appropriate next step?',
    choices: [
      'Change the hypothesis to match the results',
      'Ignore the unexpected data',
      'Repeat the experiment to check for errors',
      'Conclude that the hypothesis was proven wrong after one trial',
    ],
    correct: 2,
    explanation: 'Science requires reproducibility. Repeating the experiment helps determine whether the unexpected result was due to experimental error or a genuine finding.',
  },
  {
    id: 227, topic: TOPICS.ECOLOGY, labType: 'experimental',
    context: 'A student investigates water quality in a local stream by measuring dissolved oxygen levels at three sites: upstream from a factory, directly next to the factory discharge pipe, and downstream from the factory. She takes three measurements at each site on the same day.',
    text: 'Taking three measurements at each site rather than one is most useful because it',
    choices: [
      'makes the experiment take longer',
      'reduces the effect of random error and increases reliability',
      'changes the independent variable',
      'eliminates the need for a control',
    ],
    correct: 1,
    explanation: 'Multiple trials at each site reduce the impact of random measurement errors and produce more reliable, reproducible results. Scientists use repeated trials to increase confidence in their data.',
  },
  {
    id: 228, topic: TOPICS.CELL_BIOLOGY, labType: 'experimental',
    text: 'A student observes that plants near a window grow toward the light. She hypothesizes that plants grow toward light because light is their only energy source. Which experimental result would best disprove this hypothesis?',
    choices: [
      'Plants grown in darkness die within weeks',
      'Plants grow toward light even when nutrients are plentiful',
      'Plants in a rotating pot grow equally in all directions despite having plenty of light',
      'Plants grow faster under blue light than red light',
    ],
    correct: 2,
    explanation: 'If plants grow equally in all directions when rotated (even with enough light), it suggests directional growth is a response to the direction of light, not simply due to needing energy — challenging the hypothesis.',
  },

  // Graph Reading
  {
    id: 229, topic: TOPICS.ECOLOGY, labType: 'graphing', diagram: { type: 'predatorprey' },
    context: 'A graph shows two populations over 20 years. When the rabbit population rises, the fox population rises shortly after. When the rabbit population crashes, the fox population crashes soon after.',
    text: 'What does this graph most likely illustrate?',
    choices: [
      'Competition between two prey species',
      'A predator-prey relationship',
      'Symbiosis between rabbits and foxes',
      'The effect of disease on a single population',
    ],
    correct: 1,
    explanation: 'The time-lagged relationship — fox numbers rising and falling after rabbit numbers — is the classic pattern of a predator-prey cycle. Foxes depend on rabbits for food, so their populations are coupled.',
  },
  {
    id: 230, topic: TOPICS.ECOLOGY, labType: 'graphing', diagram: { type: 'population' },
    context: 'A graph of population size over time shows a J-shaped curve followed by a plateau. The plateau occurs at 500 individuals.',
    text: 'What does the plateau at 500 individuals most likely represent?',
    choices: [
      'The point where the population went extinct',
      'The carrying capacity of the environment',
      'The beginning of exponential growth',
      'The maximum birth rate',
    ],
    correct: 1,
    explanation: 'The plateau in an S-shaped (logistic) growth curve represents the carrying capacity — the maximum population size the environment can support given available resources.',
  },
  {
    id: 231, topic: TOPICS.CELL_BIOLOGY, labType: 'graphing', diagram: { type: 'enzymetemp' },
    context: 'A graph shows enzyme reaction rate (y-axis) versus temperature (x-axis). The rate increases from 10°C to 37°C, peaks at 37°C, then drops sharply to nearly zero at 60°C.',
    text: 'What most likely explains the sharp drop in reaction rate above 37°C?',
    choices: [
      'The substrate runs out at high temperatures',
      'The enzyme is denatured and loses its shape',
      'The reaction reverses direction at high temperatures',
      'Heat provides energy that slows the reaction',
    ],
    correct: 1,
    explanation: 'High temperatures break the weak bonds that maintain an enzyme\'s three-dimensional shape. The enzyme denatures (unfolds), its active site changes shape, and it can no longer bind the substrate.',
  },
  {
    id: 232, topic: TOPICS.ECOLOGY, labType: 'graphing', diagram: { type: 'energypyramid', base: 10000 },
    context: 'An energy pyramid shows: Producers = 10,000 kcal; Primary consumers = 1,000 kcal; Secondary consumers = 100 kcal; Tertiary consumers = 10 kcal.',
    text: 'What percentage of energy is transferred from one level to the next in this pyramid?',
    choices: ['1%', '5%', '10%', '50%'],
    correct: 2,
    explanation: 'Only about 10% of energy is transferred from one trophic level to the next. The remaining 90% is lost as heat through metabolism. This is called the 10% rule.',
  },
  {
    id: 233, topic: TOPICS.CELL_BIOLOGY, labType: 'graphing', diagram: { type: 'photosynthesisrate' },
    context: 'A student graphs the rate of photosynthesis (mL of O₂ produced per minute) versus light intensity. The graph rises steeply at first, then flattens into a horizontal line at high light intensity.',
    text: 'What does the flattening of the graph at high light intensity indicate?',
    choices: [
      'The plant is producing too much oxygen',
      'Another factor (such as CO₂ or enzymes) is now limiting the rate',
      'Light is no longer needed at high intensity',
      'The plant has run out of chlorophyll',
    ],
    correct: 1,
    explanation: 'When the graph plateaus, light is no longer the limiting factor. Another variable — such as CO₂ concentration or the amount of available enzymes — is now restricting the rate of photosynthesis.',
  },

  // Microscopy
  {
    id: 234, topic: TOPICS.CELL_BIOLOGY, labType: 'microscopy',
    text: 'A compound light microscope has an eyepiece magnification of 10× and an objective lens of 40×. What is the total magnification of the specimen?',
    choices: ['40×', '50×', '400×', '4,000×'],
    correct: 2,
    explanation: 'Total magnification = eyepiece magnification × objective magnification = 10 × 40 = 400×.',
  },
  {
    id: 235, topic: TOPICS.CELL_BIOLOGY, labType: 'microscopy',
    text: 'When a student switches from the low-power objective (10×) to the high-power objective (40×) on a compound microscope, what happens to the field of view?',
    choices: [
      'It gets larger and shows more cells',
      'It gets smaller and shows fewer cells in greater detail',
      'The brightness increases',
      'The field of view stays the same size',
    ],
    correct: 1,
    explanation: 'Increasing magnification narrows the field of view. Under high power you see a smaller area but in greater detail. Brightness also decreases, which is why the diaphragm may need adjustment.',
  },
  {
    id: 236, topic: TOPICS.CELL_BIOLOGY, labType: 'microscopy',
    text: 'A student preparing a wet mount of cheek cells adds iodine solution to the slide. What is the purpose of the iodine stain?',
    choices: [
      'To kill the cells so they stop moving',
      'To make cell structures more visible by adding contrast',
      'To increase the magnification of the microscope',
      'To prevent the coverslip from sliding',
    ],
    correct: 1,
    explanation: 'Stains like iodine bind to specific cell structures and add color contrast, making organelles and other features easier to see under a microscope. Without stain, many cell components are nearly transparent.',
  },
  {
    id: 237, topic: TOPICS.CELL_BIOLOGY, labType: 'microscopy',
    context: 'A student observes cells under a microscope and sees small, green disk-shaped structures inside plant cells. The same structures are not found in animal cheek cells viewed on the same slide.',
    text: 'What are the green disk-shaped structures, and why are they absent in animal cells?',
    choices: [
      'Mitochondria — animal cells use a different type of respiration',
      'Chloroplasts — animal cells cannot perform photosynthesis',
      'Vacuoles — animal cells store water differently',
      'Nuclei — animal cells have dissolved nuclei',
    ],
    correct: 1,
    explanation: 'Chloroplasts are the photosynthetic organelles found only in plant (and algae) cells. Animal cells cannot perform photosynthesis and therefore lack chloroplasts.',
  },

  // Dissection
  {
    id: 238, topic: TOPICS.HUMAN_BODY, labType: 'dissection',
    context: 'During a frog dissection, a student opens the abdominal cavity and observes a large, dark-red three-lobed organ and a smaller green sac attached to it.',
    text: 'What are these two structures, and what does the green sac store?',
    choices: [
      'Heart and pericardial sac — stores fluid that protects the heart',
      'Liver and gallbladder — the gallbladder stores bile produced by the liver',
      'Kidney and urinary bladder — stores urine',
      'Stomach and spleen — stores blood cells',
    ],
    correct: 1,
    explanation: 'The large dark-red multi-lobed organ is the liver — the largest organ in the body cavity. The small green sac attached to it is the gallbladder, which stores bile used to emulsify fats during digestion.',
  },
  {
    id: 239, topic: TOPICS.HUMAN_BODY, labType: 'dissection',
    context: 'A student dissecting an earthworm identifies five pairs of muscular, pulsating tubes near the front end of the worm. These structures are connected to a dorsal blood vessel running the length of the body.',
    text: 'These pulsating structures function most similarly to which human organ?',
    choices: ['Lungs', 'Kidneys', 'Heart', 'Liver'],
    correct: 2,
    explanation: 'The aortic arches (often called "hearts") of the earthworm pump blood through the circulatory system, functioning similarly to the human heart. Earthworms have a closed circulatory system.',
  },
  {
    id: 240, topic: TOPICS.CELL_BIOLOGY, labType: 'dissection',
    context: 'A student examines a cross-section of a leaf under a microscope. She identifies a tightly packed layer of elongated cells directly below the upper epidermis, each containing many green organelles.',
    text: 'What is this layer called, and why does it contain so many chloroplasts?',
    choices: [
      'Guard cells — they open and close to regulate gas exchange',
      'Palisade mesophyll — it is the primary site of photosynthesis and positioned to receive the most light',
      'Spongy mesophyll — it stores glucose produced during photosynthesis',
      'Phloem — it transports photosynthetic products through the leaf',
    ],
    correct: 1,
    explanation: 'The palisade mesophyll layer is just below the upper surface of the leaf and receives direct sunlight. Its tightly packed, elongated cells are densely packed with chloroplasts to maximize photosynthesis.',
  },
  {
    id: 241, topic: TOPICS.HUMAN_BODY, labType: 'dissection',
    context: 'During a frog dissection, a student traces the digestive system from the mouth through the esophagus into a muscular J-shaped organ. Food then passes into a long, coiled tube before reaching the large intestine.',
    text: 'What is the primary function of the long coiled tube (small intestine) in this digestive pathway?',
    choices: [
      'Mechanical breakdown of food using muscle contractions only',
      'Storage of food before digestion begins',
      'Chemical digestion and absorption of nutrients into the bloodstream',
      'Removal of water from undigested material',
    ],
    correct: 2,
    explanation: 'The small intestine is the main site of chemical digestion (using enzymes from the pancreas and intestinal wall) and nutrient absorption into the bloodstream via villi and microvilli.',
  },

  // Data Analysis
  {
    id: 242, topic: TOPICS.ECOLOGY, labType: 'data',
    context: 'A student counted the number of different bird species in three forest patches of different sizes: Patch A (1 acre) = 4 species; Patch B (5 acres) = 11 species; Patch C (20 acres) = 23 species.',
    text: 'Which conclusion is best supported by this data?',
    choices: [
      'Larger forest patches have lower biodiversity',
      'Habitat size and species diversity are not related',
      'Larger forest patches tend to support greater species diversity',
      'Small patches have more species per acre than large patches',
    ],
    correct: 2,
    explanation: 'The data shows a clear trend: as patch size increases, so does the number of species. This supports the conclusion that larger habitats support greater biodiversity — a key principle in conservation biology.',
  },
  {
    id: 243, topic: TOPICS.CELL_BIOLOGY, labType: 'data',
    context: 'Three students each measured the mass of the same object five times. Student A got: 10.1, 10.2, 10.1, 10.2, 10.1 g. Student B got: 9.5, 10.5, 10.0, 9.8, 10.2 g. Student C got: 8.0, 8.0, 8.0, 8.0, 8.0 g. The actual mass is 10.1 g.',
    text: 'Whose data is both precise AND accurate?',
    choices: [
      'Student A — consistent results very close to the true value',
      'Student B — results that vary but average near the true value',
      'Student C — perfectly consistent results',
      'All three students, because they all performed five trials',
    ],
    correct: 0,
    explanation: 'Accuracy means close to the true value; precision means consistent results. Student A is both — their readings cluster tightly around 10.1 g (the actual mass). Student C is precise but not accurate (consistently wrong). Student B is neither precise nor accurate.',
  },
  {
    id: 244, topic: TOPICS.GENETICS, labType: 'data',
    context: 'A student crosses two heterozygous pea plants (Tt × Tt) and records the offspring: 28 tall, 9 short. The expected ratio from a Punnett square is 3 tall : 1 short.',
    text: 'Why might the student\'s results differ slightly from the expected 3:1 ratio?',
    choices: [
      'The student made an error in setting up the cross',
      'Natural variation due to small sample size — probability predictions become more accurate with larger samples',
      'The trait is sex-linked and behaves differently in small crosses',
      'The short allele mutated during the experiment',
    ],
    correct: 1,
    explanation: 'Probability-based predictions (like Mendelian ratios) become more accurate with larger sample sizes. With only 37 offspring, random chance means the actual ratio may differ somewhat from the theoretical 3:1.',
  },
  {
    id: 245, topic: TOPICS.ECOLOGY, labType: 'data',
    context: 'A researcher measures average global temperature and atmospheric CO₂ concentration for each decade from 1900 to 2020. Both measurements increase over time, and the data points form a strong upward trend on a scatter plot.',
    text: 'What is the most accurate interpretation of this data?',
    choices: [
      'Rising CO₂ causes temperature to rise — the data proves cause and effect',
      'Rising temperature causes CO₂ levels to rise — the correlation shows direction',
      'CO₂ and temperature show a positive correlation, but correlation alone does not prove causation',
      'The data shows no meaningful relationship between CO₂ and temperature',
    ],
    correct: 2,
    explanation: 'Correlation means two variables change together — but does not by itself prove that one causes the other. Additional experimental evidence is needed to establish causation. (Scientific consensus from many studies does support that CO₂ drives warming, but a single correlation graph cannot prove this alone.)',
  },
  {
    id: 246, topic: TOPICS.HUMAN_BODY, labType: 'data',
    context: 'A student tests the effect of exercise on heart rate. She records resting heart rate, heart rate immediately after 2 minutes of jumping jacks, and heart rate 5 minutes after stopping exercise. Results: Rest = 68 bpm; After exercise = 142 bpm; Recovery = 79 bpm.',
    text: 'What do these results suggest about the relationship between exercise and heart rate?',
    choices: [
      'Exercise permanently increases heart rate',
      'Exercise increases heart rate, and the body returns toward resting rate during recovery — consistent with homeostasis',
      'Heart rate only changes if exercise lasts more than 5 minutes',
      'Recovery heart rate is always the same as resting heart rate',
    ],
    correct: 1,
    explanation: 'The data shows heart rate rises during exercise (to deliver more oxygen to muscles) and then returns toward the resting rate during recovery. This pattern of returning to normal conditions is an example of homeostasis.',
  },
  // ── More Experimental Design ────────────────────────────────────────────

  {
    id: 247, topic: TOPICS.CELL_BIOLOGY, labType: 'experimental',
    text: 'A student tests the effect of fertilizer on bean plants. She measures the height of each plant after 3 weeks. What is the dependent variable?',
    choices: ['Type of fertilizer', 'Amount of water given', 'Height of the plants', 'Amount of sunlight'],
    correct: 2,
    explanation: 'The dependent variable is what is measured in response to the independent variable. Here, plant height is what changes in response to the fertilizer (independent variable).',
  },
  {
    id: 248, topic: TOPICS.ECOLOGY, labType: 'experimental',
    text: 'A student tests a new fertilizer on only one plant and concludes it works. Why is this conclusion not well supported?',
    choices: [
      'The experiment needed a longer time period',
      'A single trial cannot distinguish real effects from random chance',
      'The student should have used a different plant species',
      'Fertilizers only work on multiple plants at once',
    ],
    correct: 1,
    explanation: 'One trial is insufficient because the result might be due to chance or unusual conditions with that particular plant. Valid conclusions require multiple trials with larger sample sizes.',
  },
  {
    id: 249, topic: TOPICS.GENETICS, labType: 'experimental',
    text: 'A scientist wants to determine whether a new drug reduces blood pressure. She gives the drug to Group A and a sugar pill (placebo) to Group B, and neither group knows which they received. This type of study is called',
    choices: ['An uncontrolled experiment', 'A single-blind study', 'A double-blind study', 'A controlled observation'],
    correct: 1,
    explanation: 'In a single-blind study, participants do not know which treatment they receive. This reduces bias from the placebo effect. A double-blind study would also keep the researchers unaware of group assignments.',
  },
  {
    id: 250, topic: TOPICS.CELL_BIOLOGY, labType: 'experimental',
    text: 'A student hypothesizes that earthworms prefer dark environments. To test this, she places earthworms in the center of a box with one dark half and one light half and records where they go after 10 minutes. What is the control condition?',
    choices: [
      'Earthworms placed in total darkness',
      'The center starting position — no preference shown before the experiment begins',
      'Earthworms placed in the light half',
      'A box with no earthworms',
    ],
    correct: 1,
    explanation: 'The control condition is the baseline state before any preference is shown — placing earthworms at the center where both environments are equally accessible. Any movement from center represents a measurable response.',
  },
  {
    id: 251, topic: TOPICS.ECOLOGY, labType: 'experimental',
    text: 'Which of the following is the best example of a testable hypothesis?',
    choices: [
      'Plants are more beautiful when given fertilizer',
      'Life on other planets would be interesting to study',
      'Bean plants watered with salt water will grow shorter than those watered with fresh water',
      'Animals feel pain when injured',
    ],
    correct: 2,
    explanation: 'A testable hypothesis must be specific, measurable, and able to be supported or refuted through observation or experiment. "Bean plants watered with salt water will grow shorter" can be directly tested and measured.',
  },
  {
    id: 252, topic: TOPICS.HUMAN_BODY, labType: 'experimental',
    text: 'A student tests whether exercise affects heart rate by measuring her own pulse before and after 3 minutes of jumping jacks. A weakness of this experimental design is that',
    choices: [
      'Heart rate cannot be measured accurately',
      'Only one subject (herself) was tested, limiting generalizability',
      'Jumping jacks are not a valid form of exercise',
      'Three minutes is too long for the experiment',
    ],
    correct: 1,
    explanation: 'Using a single subject means results may reflect that individual\'s unique biology rather than a general pattern. Valid experiments use multiple subjects to allow broader conclusions.',
  },
  {
    id: 253, topic: TOPICS.CELL_BIOLOGY, labType: 'experimental',
    context: 'A student placed a raw potato cube in distilled water, a 1% salt solution, and a 10% salt solution. After 30 minutes she measured the mass change of each cube.',
    text: 'What is the purpose of the distilled water treatment in this experiment?',
    choices: [
      'It dissolves the salt in the other solutions',
      'It serves as the control, showing mass change without added solutes',
      'It speeds up osmosis in the potato',
      'It prevents the potato from absorbing water',
    ],
    correct: 1,
    explanation: 'The distilled water treatment is the control — it shows what happens to potato mass when no solute is present. Any mass change in salt solutions can then be compared against this baseline.',
  },
  {
    id: 254, topic: TOPICS.GENETICS, labType: 'experimental',
    text: 'An experiment\'s results support its hypothesis. What should the scientist do next?',
    choices: [
      'Immediately publish the results as proven fact',
      'Repeat the experiment and have others test the hypothesis independently',
      'Change the hypothesis to match the data',
      'Stop experimenting since the hypothesis is confirmed',
    ],
    correct: 1,
    explanation: 'Science relies on reproducibility. One supportive result is not proof — the experiment must be repeated and independently verified by others before results are widely accepted.',
  },

  // ── More Graph Reading ───────────────────────────────────────────────────

  {
    id: 255, topic: TOPICS.ECOLOGY, labType: 'graphing', diagram: { type: 'population' },
    context: 'A graph shows a J-shaped curve of bacterial population growth over 8 hours in a nutrient-rich broth.',
    text: 'What would most likely happen to the curve if nutrients were depleted after 8 hours?',
    choices: [
      'The curve would continue rising at the same rate',
      'The curve would level off or decline as resources became limiting',
      'The bacteria would switch to a different food source automatically',
      'The population would immediately drop to zero',
    ],
    correct: 1,
    explanation: 'J-shaped exponential growth cannot continue indefinitely. When nutrients run out, growth slows and the curve becomes S-shaped (logistic), leveling off at or declining from the carrying capacity.',
  },
  {
    id: 256, topic: TOPICS.CELL_BIOLOGY, labType: 'graphing', diagram: { type: 'enzymesat' },
    context: 'A graph shows enzyme reaction rate increasing as substrate concentration increases, then leveling off into a plateau despite further increases in substrate.',
    text: 'What does the plateau indicate?',
    choices: [
      'The enzyme has been destroyed by excess substrate',
      'All enzyme active sites are occupied — adding more substrate has no effect',
      'The substrate has run out of reactants',
      'The temperature became too high during the experiment',
    ],
    correct: 1,
    explanation: 'The plateau (enzyme saturation) occurs when every active site on every enzyme molecule is occupied. No matter how much additional substrate is added, the rate cannot increase until an enzyme becomes free.',
  },
  {
    id: 257, topic: TOPICS.ECOLOGY, labType: 'graphing', diagram: { type: 'dosag' },
    context: 'A graph shows dissolved oxygen (DO) in a river decreasing sharply downstream from a sewage discharge point, then slowly recovering further downstream.',
    text: 'Why does dissolved oxygen drop sharply near the sewage discharge?',
    choices: [
      'Sewage removes oxygen chemically through direct reaction',
      'Decomposing bacteria rapidly consume oxygen breaking down the organic waste',
      'Fish at that location consume all available oxygen',
      'Warmer water from the sewage prevents oxygen from dissolving',
    ],
    correct: 1,
    explanation: 'Sewage introduces large amounts of organic matter. Decomposer bacteria consume oxygen as they break down this waste, causing a sharp drop in dissolved oxygen — a pattern called a "sag curve."',
  },
  {
    id: 258, topic: TOPICS.EVOLUTION, labType: 'graphing', diagram: { type: 'beakdepth' },
    context: 'A graph of average beak depth in a finch population shows a shift from 8 mm to 11 mm following a drought that eliminated small, soft seeds, leaving only large, hard seeds available.',
    text: 'What does this graph most directly illustrate?',
    choices: [
      'Finches chose to grow larger beaks in response to the drought',
      'Natural selection favored finches with deeper beaks that could crack large seeds',
      'All finches grew larger beaks because they ate more food',
      'The finch population decreased due to starvation',
    ],
    correct: 1,
    explanation: 'The shift in average beak size illustrates natural selection: finches with deeper beaks could access the remaining large seeds and survived to reproduce, passing on the trait. This is a classic example from Darwin\'s finches.',
  },
  {
    id: 259, topic: TOPICS.CELL_BIOLOGY, labType: 'graphing', diagram: { type: 'photoresp' },
    context: 'A graph shows the rate of photosynthesis and the rate of cellular respiration of a plant over a 24-hour period. At two points in the day the two lines cross.',
    text: 'What does each crossing point represent?',
    choices: [
      'Times when the plant stops producing oxygen completely',
      'The compensation point — when photosynthesis rate equals respiration rate, so net gas exchange is zero',
      'When the plant switches from autotroph to heterotroph',
      'The peak of glucose production during the day',
    ],
    correct: 1,
    explanation: 'The compensation point is where photosynthesis rate equals respiration rate. All oxygen produced by photosynthesis is consumed by respiration and vice versa. This typically occurs at dawn and dusk.',
  },
  {
    id: 260, topic: TOPICS.ECOLOGY, labType: 'graphing', diagram: { type: 'predatorprey' },
    context: 'A graph shows the population of lynx and snowshoe hare in Canada from 1845-1935. Both populations cycle up and down, but the lynx cycle lags slightly behind the hare cycle.',
    text: 'Why does the lynx population peak slightly after the hare population peaks?',
    choices: [
      'Lynx reproduce more slowly than hares, so it takes time for their population to respond',
      'Lynx do not depend on hares for food',
      'The graph shows the populations are independent of each other',
      'Hares control lynx reproduction directly through a chemical signal',
    ],
    correct: 0,
    explanation: 'As hare numbers rise, lynx have more food and reproduce more successfully — but it takes time for this reproductive success to show up as a larger lynx population. The time lag reflects reproduction and growth rates.',
  },
  {
    id: 261, topic: TOPICS.GENETICS, labType: 'graphing', diagram: { type: 'antibioticresistance' },
    context: 'A bar graph shows antibiotic resistance in Staphylococcus bacteria from 1950 to 2020. In 1950, 0% of strains were resistant. By 2020, 85% of strains were resistant.',
    text: 'What best explains this trend?',
    choices: [
      'Bacteria deliberately evolved resistance to survive',
      'Natural selection favored bacteria with random mutations conferring resistance; antibiotic use eliminated non-resistant strains',
      'Hospitals introduced more powerful bacteria over time',
      'Bacteria absorbed resistance genes from patients who took antibiotics',
    ],
    correct: 1,
    explanation: 'Random mutations that confer antibiotic resistance occurred naturally. When antibiotics were used, non-resistant bacteria died while resistant ones survived and reproduced — a clear example of natural selection driven by human activity.',
  },
  {
    id: 262, topic: TOPICS.ECOLOGY, labType: 'graphing', diagram: { type: 'energypyramid', base: 40000 },
    context: 'An energy pyramid shows four trophic levels. The base (producers) contains 40,000 kcal. Each level up contains roughly 10% of the energy of the level below.',
    text: 'How much energy is available to tertiary consumers (the 4th level)?',
    choices: ['4,000 kcal', '400 kcal', '40 kcal', '4 kcal'],
    correct: 2,
    explanation: '10% rule: Producers (40,000) → Primary consumers (4,000) → Secondary consumers (400) → Tertiary consumers (40 kcal). Only ~10% of energy transfers between each level; the rest is lost as heat.',
  },

  // ── More Microscopy ──────────────────────────────────────────────────────

  {
    id: 263, topic: TOPICS.CELL_BIOLOGY, labType: 'microscopy',
    text: 'A student moves a slide to the right under a compound microscope but the image appears to move to the left. This happens because',
    choices: [
      'The slide is upside down',
      'Compound microscopes invert and reverse the image relative to actual movement',
      'The objective lens is too powerful',
      'The student needs to adjust the diaphragm',
    ],
    correct: 1,
    explanation: 'Compound microscopes use multiple lenses that invert the image both vertically and horizontally. This means movement of the slide is reversed in the field of view — moving the slide right makes the image appear to move left.',
  },
  {
    id: 264, topic: TOPICS.CELL_BIOLOGY, labType: 'microscopy',
    text: 'A student observes cells under a microscope and notices some with chromosomes lined up across the center of the cell. These cells are in which phase of mitosis?',
    choices: ['Prophase', 'Metaphase', 'Anaphase', 'Telophase'],
    correct: 1,
    explanation: 'During metaphase, chromosomes align along the cell\'s equatorial plate (middle). This is the most recognizable phase under a microscope and is the stage where chromosomes are most condensed and visible.',
  },
  {
    id: 265, topic: TOPICS.CELL_BIOLOGY, labType: 'microscopy',
    text: 'A student observes a cell with no membrane-bound nucleus, no mitochondria, and no chloroplasts. This cell is most likely from a',
    choices: ['plant', 'animal', 'fungus', 'bacterium'],
    correct: 3,
    explanation: 'Bacteria are prokaryotes — they lack a membrane-bound nucleus and membrane-bound organelles. All other options are eukaryotes and would have a true nucleus.',
  },
  {
    id: 266, topic: TOPICS.CELL_BIOLOGY, labType: 'microscopy',
    context: 'A student observes onion root tip cells under a microscope. The field of view diameter is 0.4 mm and she can fit approximately 8 cells across the field.',
    text: 'What is the approximate length of each cell?',
    choices: ['0.05 mm', '0.4 mm', '3.2 mm', '0.8 mm'],
    correct: 0,
    explanation: 'Cell size = field diameter ÷ number of cells = 0.4 mm ÷ 8 = 0.05 mm. This is a standard microscopy calculation used in NY Regents labs.',
  },
  {
    id: 267, topic: TOPICS.CELL_BIOLOGY, labType: 'microscopy',
    text: 'When switching from low power (10×) to high power (40×) on a microscope, a student should use only the',
    choices: [
      'Coarse adjustment knob, to bring the new view into focus quickly',
      'Fine adjustment knob, because high power requires only small adjustments and the coarse knob could break the slide',
      'Diaphragm, to increase light entering the lens',
      'Stage clips, to hold the slide more firmly',
    ],
    correct: 1,
    explanation: 'On high power, the objective lens is very close to the slide. Using the coarse adjustment knob risks cracking the slide or damaging the lens. Only the fine adjustment knob should be used on high power.',
  },
  {
    id: 268, topic: TOPICS.CELL_BIOLOGY, labType: 'microscopy',
    text: 'A student stains a slide of plant cells with iodine solution and observes that some small oval structures within the cell turn dark blue-black. What does this indicate?',
    choices: [
      'The structures contain large amounts of protein',
      'The structures contain starch (amyloplasts storing starch grains)',
      'The structures are mitochondria producing ATP',
      'The iodine is reacting with the cell membrane',
    ],
    correct: 1,
    explanation: 'Iodine (Lugol\'s solution) reacts with starch to produce a dark blue-black color. Small oval structures that stain this way are amyloplasts — organelles that store starch in plant cells.',
  },

  // ── More Dissection ──────────────────────────────────────────────────────

  {
    id: 269, topic: TOPICS.HUMAN_BODY, labType: 'dissection',
    context: 'During a frog dissection, a student finds a pale, elongated organ tucked behind the stomach. When she examines its secretions, she finds they contain enzymes that break down proteins, carbohydrates, and fats.',
    text: 'What organ is this, and where do its secretions go?',
    choices: [
      'The liver — secretions go to the gallbladder for storage',
      'The pancreas — secretions go into the small intestine to aid digestion',
      'The kidney — secretions go to the urinary bladder',
      'The spleen — secretions go into the bloodstream',
    ],
    correct: 1,
    explanation: 'The pancreas produces digestive enzymes (proteases, amylases, lipases) that are secreted into the small intestine through the pancreatic duct. It also produces hormones like insulin that regulate blood sugar.',
  },
  {
    id: 270, topic: TOPICS.HUMAN_BODY, labType: 'dissection',
    text: 'A student dissecting a frog notices its lungs are small and simple compared to human lungs. The frog supplements lung breathing by absorbing oxygen through its moist skin. This is an example of',
    choices: [
      'Active transport of gases across the skin',
      'Supplemental gas exchange through a moist, highly vascularized surface',
      'Photosynthesis occurring in skin cells',
      'The frog using its skin instead of its lungs when underwater only',
    ],
    correct: 1,
    explanation: 'Frog skin is thin, moist, and richly supplied with blood vessels, allowing gas exchange (oxygen in, carbon dioxide out) to occur directly through the skin — a process called cutaneous respiration. This supplements their simple lungs.',
  },
  {
    id: 271, topic: TOPICS.HUMAN_BODY, labType: 'dissection',
    context: 'During a leaf cross-section lab, a student observes the lower epidermis of the leaf under a microscope. She sees many small openings flanked by two curved, sausage-shaped cells.',
    text: 'What are these openings called, and what do the two flanking cells do?',
    choices: [
      'Lenticels — they permanently remain open for gas exchange',
      'Stomata — the guard cells open and close the stomata to regulate gas exchange and water loss',
      'Root hairs — they absorb water from the surrounding air',
      'Xylem pores — they transport water upward through the leaf',
    ],
    correct: 1,
    explanation: 'Stomata are pores in the leaf epidermis through which CO₂ enters and O₂ and water vapor exit. Guard cells on either side change shape (by taking in or releasing water) to open or close the stomata, regulating gas exchange and transpiration.',
  },
  {
    id: 272, topic: TOPICS.HUMAN_BODY, labType: 'dissection',
    text: 'A student dissecting a frog examines the contents of its stomach and finds partially digested insect parts. This observation tells us that the frog is',
    choices: [
      'A producer that makes its own food',
      'A decomposer that feeds on dead matter',
      'A consumer (heterotroph) that obtains energy by eating other organisms',
      'An omnivore that eats both plants and animals equally',
    ],
    correct: 2,
    explanation: 'Finding partially digested insects in the stomach confirms the frog is a heterotroph (consumer) that obtains energy by consuming other organisms. Frogs are carnivores — they eat primarily invertebrates like insects and worms.',
  },
  {
    id: 273, topic: TOPICS.HUMAN_BODY, labType: 'dissection',
    context: 'During a frog dissection, a student traces the path of blood: the ventricle pumps blood out through a large vessel that almost immediately splits — one branch goes to the lungs, and another goes to the rest of the body.',
    text: 'How does this differ from blood flow in the human heart?',
    choices: [
      'Human hearts also have one ventricle that sends blood to both lungs and body simultaneously',
      'Humans have two ventricles — one pumps to the lungs only (right) and one pumps to the body only (left), keeping oxygenated and deoxygenated blood completely separate',
      'Frog hearts are more efficient than human hearts because blood travels a shorter distance',
      'Human hearts do not have ventricles — only atria pump blood',
    ],
    correct: 1,
    explanation: 'The frog\'s 3-chambered heart (2 atria, 1 ventricle) mixes oxygenated and deoxygenated blood in the single ventricle. The human 4-chambered heart completely separates these circuits, making circulation more efficient for an active, warm-blooded animal.',
  },
  {
    id: 274, topic: TOPICS.CELL_BIOLOGY, labType: 'dissection',
    context: 'A student examines a cross-section of a leaf under a microscope. Below the palisade layer she observes irregularly shaped cells with large air spaces between them.',
    text: 'What is the function of these air spaces in the spongy mesophyll?',
    choices: [
      'They store chlorophyll for later use in photosynthesis',
      'They allow gases (CO₂, O₂, water vapor) to diffuse efficiently between cells and the stomata',
      'They transport water from the roots up through the leaf',
      'They provide structural support to prevent the leaf from wilting',
    ],
    correct: 1,
    explanation: 'The large air spaces in spongy mesophyll provide a large surface area and allow gases to circulate freely. CO₂ from the air diffuses through stomata into these spaces and reaches photosynthetic cells; O₂ and water vapor diffuse out.',
  },

  // ── More Data Analysis ───────────────────────────────────────────────────

  {
    id: 275, topic: TOPICS.ECOLOGY, labType: 'data',
    context: 'A student measures the height of bean plants after 4 weeks: Control (no fertilizer): 12, 11, 13, 12, 12 cm. Fertilizer group: 18, 20, 17, 21, 19 cm.',
    text: 'What is the average (mean) height of the fertilizer group?',
    choices: ['18 cm', '19 cm', '20 cm', '21 cm'],
    correct: 1,
    explanation: 'Mean = (18 + 20 + 17 + 21 + 19) ÷ 5 = 95 ÷ 5 = 19 cm. The mean allows comparison of central tendency between groups.',
  },
  {
    id: 276, topic: TOPICS.CELL_BIOLOGY, labType: 'data',
    context: 'Three students each measured the mass of the same sample five times. Student A: 10.1, 10.2, 10.1, 10.1, 10.2 g. Student B: 10.1, 8.5, 11.2, 9.9, 10.3 g. Student C: 8.0, 8.0, 8.0, 8.0, 8.0 g. True mass = 10.1 g.',
    text: 'Which student\'s data is precise but NOT accurate?',
    choices: ['Student A', 'Student B', 'Student C', 'Both A and C'],
    correct: 2,
    explanation: 'Student C gets the same result every time (precise — low variability) but the result (8.0 g) is far from the true value (10.1 g) — not accurate. Student A is both precise and accurate. Student B is neither.',
  },
  {
    id: 277, topic: TOPICS.ECOLOGY, labType: 'data',
    context: 'A researcher finds a positive correlation between the number of fast food restaurants per square mile and obesity rates in different cities.',
    text: 'What is the most appropriate conclusion from this data?',
    choices: [
      'Fast food restaurants directly cause obesity in all people who live near them',
      'There is a positive correlation between fast food restaurant density and obesity rates, but correlation does not prove causation',
      'Removing fast food restaurants will definitely lower obesity rates',
      'Obesity causes more fast food restaurants to open in an area',
    ],
    correct: 1,
    explanation: 'Correlation means two variables tend to change together. It does not prove that one causes the other — there may be confounding variables (income level, access to exercise facilities, cultural factors) that explain both. Causation requires controlled experiments.',
  },
  {
    id: 278, topic: TOPICS.GENETICS, labType: 'data',
    context: 'A student conducts a genetic cross of two heterozygous tall pea plants (Tt × Tt) and grows 200 offspring. She gets 144 tall and 56 short plants.',
    text: 'How does this result compare to the expected 3:1 ratio, and what explains any difference?',
    choices: [
      'The result (144:56 ≈ 2.6:1) differs due to gene mutation occurring during the cross',
      'The result closely approximates 3:1 (150:50 expected); the small difference is due to random chance in fertilization',
      'The result proves the 3:1 ratio is wrong for pea plants',
      'The difference shows that tall is actually recessive in this cross',
    ],
    correct: 1,
    explanation: 'Expected from 3:1: 150 tall, 50 short. Actual: 144 tall, 56 short — very close. The small deviation is due to random chance in which gametes combine during fertilization. Probability predictions become more accurate with very large sample sizes.',
  },
  {
    id: 279, topic: TOPICS.ECOLOGY, labType: 'data',
    context: 'A student surveys the number of bird species in forest patches of different sizes: 1 acre = 4 species; 5 acres = 9 species; 10 acres = 14 species; 25 acres = 21 species; 100 acres = 28 species.',
    text: 'Which type of graph would BEST display this relationship between habitat area and species number?',
    choices: [
      'A pie chart showing the percentage of species in each patch',
      'A line or scatter plot with habitat size on the x-axis and species number on the y-axis',
      'A bar graph with one bar per species',
      'A histogram showing frequency of patch sizes',
    ],
    correct: 1,
    explanation: 'A scatter plot or line graph is best for showing the relationship between two continuous variables (habitat area and species count). It visually reveals the positive trend — as area increases, species richness increases.',
  },
  {
    id: 280, topic: TOPICS.HUMAN_BODY, labType: 'data',
    context: 'A student tests three brands of antacid to see which neutralizes the most acid. She measures the volume of acid neutralized by equal masses of each antacid: Brand A = 35 mL, Brand B = 28 mL, Brand C = 42 mL.',
    text: 'Based on this data, which brand was most effective and what should the student do before making a final recommendation?',
    choices: [
      'Brand C was most effective; no further testing is needed since the data is clear',
      'Brand A was most effective; the student should test more brands',
      'Brand C was most effective; the student should repeat the experiment multiple times to confirm the result',
      'Brand B was most effective because it neutralized the least acid, showing it is more concentrated',
    ],
    correct: 2,
    explanation: 'Brand C neutralized the most acid (42 mL). However, a single trial is not sufficient to draw firm conclusions — the experiment should be repeated to confirm the result is consistent and not due to experimental error.',
  },
  {
    id: 281, topic: TOPICS.ECOLOGY, labType: 'data',
    context: 'A student records the following water temperature and fish population data for a lake over six years: As temperature increased from 18°C to 26°C, the trout population decreased from 850 to 210 fish.',
    text: 'Which statement best describes what this data shows?',
    choices: [
      'Rising water temperature directly caused trout to leave the lake',
      'The data shows a negative correlation between water temperature and trout population',
      'Trout populations naturally decrease every year regardless of temperature',
      'Trout prefer warmer water and moved deeper in the lake',
    ],
    correct: 1,
    explanation: 'As one variable (temperature) increases, the other (trout population) decreases — a negative (inverse) correlation. Warm water holds less dissolved oxygen, which cold-water fish like trout require. The data shows correlation; additional investigation would be needed to confirm the mechanism.',
  },

  // ── Cell Biology (new) ──────────────────────────────────────────────────────
  { id: 282, topic: TOPICS.CELL_BIOLOGY, text: 'The rough endoplasmic reticulum (RER) differs from the smooth ER because the RER has', choices: ['lipid-producing enzymes', 'ribosomes attached to its surface', 'calcium-storage channels', 'detoxification enzymes'], correct: 1, explanation: 'Ribosomes on the rough ER give it a bumpy appearance and synthesize proteins destined for secretion or the cell membrane.' },
  { id: 283, topic: TOPICS.CELL_BIOLOGY, text: 'The Golgi apparatus is best described as the cell\'s', choices: ['power plant', 'post office and shipping center', 'recycling center', 'control center'], correct: 1, explanation: 'The Golgi apparatus packages, modifies, and ships proteins and lipids to their correct destinations inside or outside the cell.' },
  { id: 284, topic: TOPICS.CELL_BIOLOGY, text: 'Which of the following best describes the difference between prokaryotic and eukaryotic cells?', choices: ['Prokaryotes have a nucleus; eukaryotes do not', 'Eukaryotes have a membrane-bound nucleus; prokaryotes do not', 'Prokaryotes are always larger than eukaryotes', 'Eukaryotes lack a cell membrane'], correct: 1, explanation: 'Eukaryotic cells have a true membrane-bound nucleus and organelles. Prokaryotes lack both.' },
  { id: 285, topic: TOPICS.CELL_BIOLOGY, text: 'Active transport differs from diffusion because active transport', choices: ['moves substances down their concentration gradient', 'requires no energy input', 'requires ATP energy to move substances against their gradient', 'occurs only in plant cells'], correct: 2, explanation: 'Active transport moves substances against their concentration gradient and requires ATP energy, unlike passive diffusion.' },
  { id: 286, topic: TOPICS.CELL_BIOLOGY, text: 'During the cell cycle, DNA replication occurs during which phase?', choices: ['G1 phase', 'S (synthesis) phase', 'G2 phase', 'M (mitotic) phase'], correct: 1, explanation: 'DNA replication occurs during the S phase of interphase, ensuring each daughter cell receives a complete genome.' },
  { id: 287, topic: TOPICS.CELL_BIOLOGY, text: 'The large central vacuole found in plant cells primarily functions to', choices: ['produce glucose through photosynthesis', 'store water and maintain turgor pressure', 'synthesize proteins for export', 'carry out cellular respiration'], correct: 1, explanation: 'The central vacuole stores water, and the resulting turgor pressure keeps plant cells rigid and the plant upright.' },
  { id: 288, topic: TOPICS.CELL_BIOLOGY, text: 'The fluid mosaic model describes the cell membrane as', choices: ['a rigid lipid barrier with no proteins', 'a fluid phospholipid bilayer with embedded proteins', 'a solid structure made entirely of carbohydrates', 'a static layer found only in animal cells'], correct: 1, explanation: 'The fluid mosaic model shows the membrane as a flexible phospholipid bilayer with proteins that can move within it.' },
  { id: 289, topic: TOPICS.CELL_BIOLOGY, text: 'Which phase of mitosis involves chromosomes lining up along the cell\'s equatorial plate?', choices: ['Prophase', 'Metaphase', 'Anaphase', 'Telophase'], correct: 1, explanation: 'During metaphase, chromosomes align at the cell\'s equator, ensuring each daughter cell receives the correct chromosome number.' },
  { id: 290, topic: TOPICS.CELL_BIOLOGY, text: 'A cell placed in a hypotonic solution will most likely', choices: ['shrink and crenate', 'swell and potentially burst', 'remain unchanged', 'divide more rapidly'], correct: 1, explanation: 'In a hypotonic solution, solute concentration is lower outside the cell, so water flows in by osmosis and the cell swells.' },
  { id: 291, topic: TOPICS.CELL_BIOLOGY, text: 'Which organelle modifies, sorts, and packages proteins received from the rough ER?', choices: ['Ribosome', 'Lysosome', 'Golgi apparatus', 'Smooth ER'], correct: 2, explanation: 'The Golgi apparatus receives proteins from the rough ER, adds carbohydrate tags, and packages them into vesicles for delivery.' },

  // ── Genetics (new) ──────────────────────────────────────────────────────────
  { id: 292, topic: TOPICS.GENETICS, text: 'Incomplete dominance is best illustrated by', choices: ['red × white flowers producing only red offspring', 'red × white flowers producing pink offspring', 'red × white flowers producing red and white offspring', 'eye color controlled by many genes'], correct: 1, explanation: 'In incomplete dominance, neither allele is fully dominant and the heterozygote shows a blended intermediate phenotype.' },
  { id: 293, topic: TOPICS.GENETICS, text: 'In codominance, the heterozygous phenotype', choices: ['shows only the dominant trait', 'is a blend of the two traits', 'expresses both traits simultaneously and completely', 'shows only the recessive trait'], correct: 2, explanation: 'In codominance both alleles are fully and simultaneously expressed — for example, AB blood type displays both A and B antigens.' },
  { id: 294, topic: TOPICS.GENETICS, text: 'A karyotype is used to', choices: ['sequence the DNA base pairs of an organism', 'display the complete set of chromosomes arranged in pairs', 'identify which proteins a cell manufactures', 'measure the rate of mutation in a population'], correct: 1, explanation: 'A karyotype is an image of an organism\'s chromosomes arranged in homologous pairs, used to detect chromosomal abnormalities.' },
  { id: 295, topic: TOPICS.GENETICS, text: 'Down syndrome is caused by', choices: ['a point mutation in chromosome 21', 'trisomy 21 — an extra chromosome 21 from nondisjunction', 'deletion of part of chromosome 21', 'a recessive gene on the X chromosome'], correct: 1, explanation: 'Down syndrome results from nondisjunction during meiosis, giving the zygote three copies of chromosome 21.' },
  { id: 296, topic: TOPICS.GENETICS, text: 'During transcription, which molecule is produced from the DNA template?', choices: ['A new strand of DNA', 'A protein', 'Messenger RNA (mRNA)', 'ATP'], correct: 2, explanation: 'Transcription reads a DNA template to produce a complementary mRNA strand that carries the genetic code to the ribosome.' },
  { id: 297, topic: TOPICS.GENETICS, text: 'The purpose of tRNA during translation is to', choices: ['carry the genetic code from the nucleus to the ribosome', 'form the structure of the ribosome', 'bring the correct amino acid to the ribosome based on mRNA codons', 'replicate DNA before cell division'], correct: 2, explanation: 'Transfer RNA reads mRNA codons at the ribosome and delivers the corresponding amino acid to build the growing protein chain.' },
  { id: 298, topic: TOPICS.GENETICS, text: 'Which of the following is the best example of selective breeding?', choices: ['Wolves evolving smaller body sizes in warm climates', 'Farmers crossing the highest-milk-producing cows each generation', 'A random mutation increasing antibiotic resistance in bacteria', 'Birds migrating to a new habitat during drought'], correct: 1, explanation: 'Selective breeding is deliberate human choice of organisms with desired traits to reproduce, accumulating those traits over generations.' },
  { id: 299, topic: TOPICS.GENETICS, text: 'A trait controlled by many genes and showing a continuous range of phenotypes is called', choices: ['codominant', 'sex-linked', 'polygenic', 'recessive'], correct: 2, explanation: 'Polygenic traits like height and skin color are controlled by multiple genes, producing a continuous spectrum rather than discrete categories.' },
  { id: 300, topic: TOPICS.GENETICS, text: 'Which enzyme unwinds the DNA double helix during replication?', choices: ['RNA polymerase', 'DNA polymerase', 'Helicase', 'Ligase'], correct: 2, explanation: 'Helicase breaks hydrogen bonds between base pairs and unwinds the double helix to expose template strands for replication.' },
  { id: 301, topic: TOPICS.GENETICS, text: 'A frameshift mutation differs from a substitution mutation because a frameshift', choices: ['changes one base to a different base', 'inserts or deletes a base, shifting the entire reading frame', 'affects only introns of a gene', 'increases the number of chromosomes'], correct: 1, explanation: 'An insertion or deletion shifts the codon reading frame, altering every amino acid downstream and usually destroying protein function.' },

  // ── Evolution (new) ─────────────────────────────────────────────────────────
  { id: 302, topic: TOPICS.EVOLUTION, text: 'Convergent evolution produces structures that are', choices: ['identical in internal anatomy but serve different functions', 'different in structure but similar in function', 'found only in closely related species', 'always vestigial remnants of past adaptations'], correct: 1, explanation: 'Convergent evolution produces analogous structures in unrelated species facing similar environmental pressures.' },
  { id: 303, topic: TOPICS.EVOLUTION, text: 'The gene pool of a population refers to', choices: ['only the dominant alleles present', 'all the alleles present in all individuals of the population', 'only the alleles expressed in the phenotype', 'the mutated genes of a species'], correct: 1, explanation: 'The gene pool is the total collection of all alleles in a population at a given time.' },
  { id: 304, topic: TOPICS.EVOLUTION, text: 'Genetic drift has the greatest effect in', choices: ['large, stable populations with high genetic diversity', 'small, isolated populations', 'populations in tropical climates', 'populations with many predators'], correct: 1, explanation: 'Genetic drift causes random changes in allele frequencies; its effects are most pronounced in small populations where chance events have a large impact.' },
  { id: 305, topic: TOPICS.EVOLUTION, text: 'Which provides the strongest molecular evidence that two species share a recent common ancestor?', choices: ['They live in the same habitat', 'They have similar body sizes', 'They have nearly identical DNA sequences', 'They eat the same types of food'], correct: 2, explanation: 'DNA sequence similarity is the most direct molecular evidence of evolutionary relatedness and recent shared ancestry.' },
  { id: 306, topic: TOPICS.EVOLUTION, text: 'The bottleneck effect occurs when', choices: ['a population grows rapidly after a food surplus', 'a large portion of a population is wiped out by a random event, greatly reducing genetic diversity', 'new mutations appear at an accelerated rate', 'a small group colonizes an entirely new area'], correct: 1, explanation: 'The bottleneck effect drastically reduces population size and genetic diversity, because only a random subset of alleles survive.' },
  { id: 307, topic: TOPICS.EVOLUTION, text: 'Analogous structures are those that have', choices: ['the same embryonic origin but different functions', 'different internal structures but perform the same function', 'no function in the current organism', 'identical DNA sequences in different species'], correct: 1, explanation: 'Analogous structures (like bird wings and insect wings) perform similar functions but evolved independently and have different underlying anatomy.' },
  { id: 308, topic: TOPICS.EVOLUTION, text: 'A population in Hardy-Weinberg equilibrium is one in which', choices: ['natural selection is actively changing allele frequencies', 'only dominant alleles are passed to offspring', 'allele frequencies remain constant from generation to generation', 'mutation rates are at their highest'], correct: 2, explanation: 'Hardy-Weinberg equilibrium describes a non-evolving population where allele frequencies remain stable — a theoretical baseline.' },
  { id: 309, topic: TOPICS.EVOLUTION, text: 'Mutations are important to evolution primarily because they', choices: ['always improve an organism\'s survival', 'are the ultimate original source of all new genetic variation', 'occur only during meiosis and affect all offspring', 'always cause harmful phenotypes'], correct: 1, explanation: 'Mutations generate new alleles, providing the raw genetic variation upon which natural selection and other evolutionary forces can act.' },
  { id: 310, topic: TOPICS.EVOLUTION, text: 'The Galápagos finches are a classic example of', choices: ['convergent evolution', 'adaptive radiation', 'genetic drift in large populations', 'the founder effect only'], correct: 1, explanation: 'Adaptive radiation occurs when one ancestral species rapidly diversifies into many forms filling different ecological niches — as Darwin\'s finches did on different islands.' },
  { id: 311, topic: TOPICS.EVOLUTION, text: 'In evolutionary biology, an organism\'s fitness refers to', choices: ['its physical strength compared to others', 'its reproductive success — how many surviving offspring it produces', 'how well it can withstand extreme temperatures', 'the complexity of its nervous system'], correct: 1, explanation: 'Evolutionary fitness is measured by reproductive success — the number of surviving, reproducing offspring an individual leaves.' },

  // ── Ecology (new) ───────────────────────────────────────────────────────────
  { id: 312, topic: TOPICS.ECOLOGY, text: 'Biomagnification refers to the process by which', choices: ['large organisms eat more calories per day', 'toxins become increasingly concentrated at higher trophic levels', 'producers grow larger over successive seasons', 'populations increase rapidly when resources are unlimited'], correct: 1, explanation: 'Toxins like mercury and DDT accumulate in organisms and become increasingly concentrated moving up the food chain.' },
  { id: 313, topic: TOPICS.ECOLOGY, text: 'In the nitrogen cycle, which organisms convert atmospheric nitrogen (N₂) into a usable form for plants?', choices: ['Green plants through photosynthesis', 'Animals through digestion', 'Nitrogen-fixing bacteria in soil and root nodules', 'Decomposers breaking down organic matter'], correct: 2, explanation: 'Nitrogen-fixing bacteria convert inert N₂ gas into ammonia or nitrates that plants can absorb and use to build proteins.' },
  { id: 314, topic: TOPICS.ECOLOGY, text: 'Which of the following is an abiotic factor in an ecosystem?', choices: ['Bacteria living in the soil', 'Oak trees in a forest', 'The temperature of a pond', 'Insects feeding on plant leaves'], correct: 2, explanation: 'Abiotic factors are nonliving physical and chemical components of an ecosystem, such as temperature, light, water, and soil chemistry.' },
  { id: 315, topic: TOPICS.ECOLOGY, text: 'A keystone species is characterized by', choices: ['being the most numerous organism in the ecosystem', 'having a disproportionately large ecological impact relative to its abundance', 'always being the apex predator', 'being found only in a single geographic location'], correct: 1, explanation: 'Removing a keystone species causes major changes to community structure even though it may not be the most abundant organism.' },
  { id: 316, topic: TOPICS.ECOLOGY, text: 'Mutualism is a symbiotic relationship in which', choices: ['one organism benefits while the other is harmed', 'one organism benefits and the other is unaffected', 'both organisms benefit from the interaction', 'both organisms are harmed by the association'], correct: 2, explanation: 'In mutualism both species benefit — for example, bees obtain nectar while pollinating flowers, and clownfish protect sea anemones while gaining shelter.' },
  { id: 317, topic: TOPICS.ECOLOGY, text: 'The carbon cycle returns carbon from the atmosphere to living organisms primarily through', choices: ['combustion of fossil fuels', 'cellular respiration in animals', 'photosynthesis in plants and algae', 'decomposition of organic matter'], correct: 2, explanation: 'Photosynthesis removes CO₂ from the atmosphere and converts it into organic molecules that enter the food chain.' },
  { id: 318, topic: TOPICS.ECOLOGY, text: 'Which of the following most directly limits the size of a population?', choices: ['The number of predators present', 'The climate of the region', 'The availability of food, water, and space', 'The rate of mutation in the gene pool'], correct: 2, explanation: 'Limiting factors such as food, water, and space restrict population growth and determine the environment\'s carrying capacity.' },
  { id: 319, topic: TOPICS.ECOLOGY, text: 'Primary succession differs from secondary succession because primary succession', choices: ['occurs in areas where some organisms still exist', 'begins on bare substrate with no soil or organisms', 'proceeds faster due to remaining seed banks', 'requires a pre-existing community to be disturbed'], correct: 1, explanation: 'Primary succession starts from lifeless bare rock or substrate; secondary succession occurs where a community existed before but was disturbed.' },
  { id: 320, topic: TOPICS.ECOLOGY, text: 'A food web is more realistic than a food chain because a food web', choices: ['shows only the top predators in an ecosystem', 'limits energy flow to a single linear path', 'illustrates all the complex, interconnected feeding relationships', 'includes only producers and primary consumers'], correct: 2, explanation: 'A food web shows the full network of feeding relationships among many species, while a food chain oversimplifies this to one linear path.' },
  { id: 321, topic: TOPICS.ECOLOGY, text: 'Commensalism is a relationship in which', choices: ['both species are harmed', 'one species benefits and the other is harmed', 'one species benefits and the other is neither harmed nor helped', 'both species benefit equally'], correct: 2, explanation: 'In commensalism one species benefits while the other is completely unaffected — for example, barnacles on a whale\'s skin.' },

  // ── Human Body (new) ────────────────────────────────────────────────────────
  { id: 322, topic: TOPICS.HUMAN_BODY, text: 'Which type of blood vessel carries blood away from the heart?', choices: ['Veins', 'Capillaries', 'Arteries', 'Venules'], correct: 2, explanation: 'Arteries carry blood away from the heart under high pressure; veins return blood to the heart under low pressure.' },
  { id: 323, topic: TOPICS.HUMAN_BODY, text: 'The lymphatic system helps maintain homeostasis by', choices: ['pumping blood through the circulatory system', 'producing red blood cells in the bone marrow', 'collecting excess tissue fluid and supporting immune defense', 'breaking down proteins in the small intestine'], correct: 2, explanation: 'The lymphatic system collects interstitial fluid, filters it through lymph nodes that trap pathogens, and returns it to the bloodstream.' },
  { id: 324, topic: TOPICS.HUMAN_BODY, text: 'Skeletal muscle differs from smooth muscle because skeletal muscle is', choices: ['involuntary and found in the walls of organs', 'voluntary and attached to bones to produce movement', 'involuntary and found only in the heart', 'voluntary and lines the walls of blood vessels'], correct: 1, explanation: 'Skeletal muscle is consciously controlled and moves bones; smooth muscle is involuntary and found in organs like the intestines.' },
  { id: 325, topic: TOPICS.HUMAN_BODY, text: 'At a synapse, a nerve impulse is transmitted from one neuron to the next by', choices: ['direct electrical conduction through gap junctions only', 'release of neurotransmitters that bind to receptors on the next neuron', 'blood carrying chemical signals between the cells', 'hormones secreted by the endocrine system'], correct: 1, explanation: 'Neurotransmitters are released from the presynaptic neuron, cross the synaptic cleft, and bind to receptors on the postsynaptic cell.' },
  { id: 326, topic: TOPICS.HUMAN_BODY, text: 'Which digestive enzyme begins the chemical breakdown of carbohydrates in the mouth?', choices: ['Pepsin', 'Lipase', 'Salivary amylase', 'Trypsin'], correct: 2, explanation: 'Salivary amylase in saliva begins hydrolyzing starch into simpler sugars as soon as food enters the mouth.' },
  { id: 327, topic: TOPICS.HUMAN_BODY, text: 'Bile, produced by the liver, aids digestion by', choices: ['chemically breaking down proteins into amino acids', 'emulsifying large fat droplets into smaller ones', 'absorbing water from undigested food', 'converting glucose to glycogen for storage'], correct: 1, explanation: 'Bile emulsifies fats, breaking large globules into smaller droplets that give lipase more surface area to digest.' },
  { id: 328, topic: TOPICS.HUMAN_BODY, text: 'A person with type A blood has which antigens on their red blood cells?', choices: ['B antigens only', 'Both A and B antigens', 'No antigens (type O)', 'A antigens only'], correct: 3, explanation: 'Type A blood has A antigens on red blood cells and anti-B antibodies in the plasma — critical for safe blood transfusions.' },
  { id: 329, topic: TOPICS.HUMAN_BODY, text: 'The glomerulus in the nephron is primarily responsible for', choices: ['reabsorbing water and glucose back into the blood', 'filtering blood under pressure into the Bowman\'s capsule', 'secreting hormones that regulate blood pressure', 'producing red blood cells'], correct: 1, explanation: 'The glomerulus is a capillary ball where blood is filtered under pressure; small molecules pass into the Bowman\'s capsule to form filtrate.' },
  { id: 330, topic: TOPICS.HUMAN_BODY, text: 'Vaccination prevents disease by', choices: ['killing all bacteria currently in the body', 'introducing a weakened or inactivated pathogen to stimulate immune memory', 'replacing damaged immune cells with healthy ones', 'increasing the number of red blood cells'], correct: 1, explanation: 'Vaccines expose the immune system to antigens without causing disease, triggering production of memory B and T cells for a faster future response.' },
  { id: 331, topic: TOPICS.HUMAN_BODY, text: 'Body temperature regulation is an example of negative feedback because', choices: ['it amplifies the original change in temperature', 'the response reinforces the stimulus that caused it', 'the response reverses the change to restore the set point', 'it only operates when external temperatures rise'], correct: 2, explanation: 'Negative feedback reverses a change — sweating cools an overheated body, shivering warms a cold body — always pushing back toward the set point.' },

  // ── Photosynthesis & Respiration ────────────────────────────────────────────
  { id: 332, topic: TOPICS.PHOTOSYNTHESIS, text: 'The equation for photosynthesis shows that plants use carbon dioxide and water to produce', choices: ['oxygen and ATP only', 'glucose and oxygen', 'carbon dioxide and water', 'protein and fat'], correct: 1, explanation: 'Photosynthesis: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂. Plants produce glucose and release oxygen.' },
  { id: 333, topic: TOPICS.PHOTOSYNTHESIS, text: 'Photosynthesis takes place in which organelle?', choices: ['Mitochondria', 'Ribosome', 'Chloroplast', 'Nucleus'], correct: 2, explanation: 'Chloroplasts contain chlorophyll, which captures light energy to drive the reactions of photosynthesis.' },
  { id: 334, topic: TOPICS.PHOTOSYNTHESIS, text: 'Cellular respiration releases energy stored in', choices: ['water molecules', 'oxygen gas', 'glucose molecules', 'carbon dioxide'], correct: 2, explanation: 'Cellular respiration breaks the chemical bonds in glucose to release ATP energy: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP.' },
  { id: 335, topic: TOPICS.PHOTOSYNTHESIS, text: 'Which gas is released as a waste product of cellular respiration in animals?', choices: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'], correct: 2, explanation: 'Carbon dioxide is produced when glucose is broken down during cellular respiration and is exhaled by animals.' },
  { id: 336, topic: TOPICS.PHOTOSYNTHESIS, text: 'The relationship between photosynthesis and cellular respiration is best described as', choices: ['identical processes that produce the same products', 'opposite and complementary processes that cycle matter and energy', 'processes that occur only in plants', 'unrelated processes found in different kingdoms'], correct: 1, explanation: 'The products of photosynthesis (glucose, O₂) are the reactants of respiration, and vice versa — they form a continuous cycle.' },
  { id: 337, topic: TOPICS.PHOTOSYNTHESIS, text: 'Which pigment absorbs light energy to power photosynthesis?', choices: ['Hemoglobin', 'Chlorophyll', 'Melanin', 'Keratin'], correct: 1, explanation: 'Chlorophyll absorbs primarily red and blue wavelengths of light and reflects green, which is why plants appear green.' },
  { id: 338, topic: TOPICS.PHOTOSYNTHESIS, text: 'Fermentation (anaerobic respiration) occurs when there is a lack of', choices: ['glucose', 'water', 'oxygen', 'carbon dioxide'], correct: 2, explanation: 'Fermentation is an oxygen-free backup process that regenerates NAD⁺ to keep glycolysis running when oxygen is unavailable.' },
  { id: 339, topic: TOPICS.PHOTOSYNTHESIS, text: 'ATP is best described as', choices: ['a type of structural protein', 'the energy currency of cells', 'a nucleic acid used in protein synthesis', 'a complex carbohydrate for storage'], correct: 1, explanation: 'ATP (adenosine triphosphate) stores and transfers chemical energy for all cellular processes.' },
  { id: 340, topic: TOPICS.PHOTOSYNTHESIS, text: 'Which factor would NOT increase the rate of photosynthesis?', choices: ['Increasing light intensity', 'Increasing CO₂ concentration', 'Decreasing water availability', 'Providing optimal temperature'], correct: 2, explanation: 'Water is a required reactant. Decreasing its availability reduces photosynthesis even if all other factors are optimal.' },
  { id: 341, topic: TOPICS.PHOTOSYNTHESIS, text: 'Both plant and animal cells carry out', choices: ['photosynthesis only', 'cellular respiration only', 'both photosynthesis and respiration equally', 'neither photosynthesis nor respiration'], correct: 1, explanation: 'All living cells perform cellular respiration to produce ATP. Only plant cells with chloroplasts also perform photosynthesis.' },
  { id: 342, topic: TOPICS.PHOTOSYNTHESIS, text: 'The light-dependent reactions of photosynthesis occur in the', choices: ['stroma of the chloroplast', 'cytoplasm of the cell', 'thylakoid membranes of the chloroplast', 'matrix of the mitochondria'], correct: 2, explanation: 'Light-dependent reactions occur in thylakoid membranes where light energy splits water and produces ATP and NADPH.' },
  { id: 343, topic: TOPICS.PHOTOSYNTHESIS, text: 'The Calvin cycle (light-independent reactions) uses ATP and NADPH to', choices: ['split water molecules and release oxygen', 'produce oxygen as a final product', 'fix CO₂ into organic molecules (glucose)', 'release energy by breaking down glucose'], correct: 2, explanation: 'The Calvin cycle uses energy from ATP and NADPH to convert CO₂ into G3P, which is used to build glucose.' },
  { id: 344, topic: TOPICS.PHOTOSYNTHESIS, text: 'Which step of cellular respiration produces the most ATP per glucose molecule?', choices: ['Glycolysis', 'Pyruvate oxidation', 'Krebs cycle', 'Electron transport chain'], correct: 3, explanation: 'The electron transport chain produces approximately 32–34 ATP per glucose — far more than glycolysis (2 net) or the Krebs cycle (2).' },
  { id: 345, topic: TOPICS.PHOTOSYNTHESIS, text: 'Glycolysis occurs in which part of the cell?', choices: ['Mitochondrial matrix', 'Chloroplast stroma', 'Cytoplasm', 'Cell nucleus'], correct: 2, explanation: 'Glycolysis takes place in the cytoplasm and splits one glucose into two pyruvates, producing a net of 2 ATP — no oxygen required.' },
  { id: 346, topic: TOPICS.PHOTOSYNTHESIS, text: 'Lactic acid fermentation occurs in human muscle cells when', choices: ['oxygen is plentiful during light exercise', 'oxygen is sufficient for aerobic respiration', 'oxygen cannot keep up with demand during intense exercise', 'blood glucose levels are too low'], correct: 2, explanation: 'When oxygen supply is insufficient, muscles switch to lactic acid fermentation to regenerate NAD⁺ and continue ATP production.' },
  { id: 347, topic: TOPICS.PHOTOSYNTHESIS, text: 'Which of the following is a required reactant (input) of cellular respiration?', choices: ['Carbon dioxide', 'Water (as a product)', 'ATP (as a product)', 'Oxygen'], correct: 3, explanation: 'Oxygen is a reactant in aerobic cellular respiration: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP.' },
  { id: 348, topic: TOPICS.PHOTOSYNTHESIS, text: 'If temperature rises far above the optimal for photosynthesis enzymes, the rate of photosynthesis will', choices: ['continue increasing indefinitely', 'remain constant at its maximum rate', 'drop sharply as enzymes are denatured', 'double with each 10°C increase'], correct: 2, explanation: 'Excessive heat permanently alters enzyme shape (denaturation), destroying the active site and halting the reaction.' },
  { id: 349, topic: TOPICS.PHOTOSYNTHESIS, text: 'The primary products released during the Krebs cycle are', choices: ['oxygen and glucose', 'NADH, FADH₂, and CO₂', 'water and ATP only', 'glucose and NADH only'], correct: 1, explanation: 'The Krebs cycle releases CO₂ as waste and produces NADH and FADH₂ that carry electrons to the electron transport chain.' },
  { id: 350, topic: TOPICS.PHOTOSYNTHESIS, text: 'Stomata on plant leaves primarily allow', choices: ['water to enter the leaf from the environment', 'sunlight to directly reach the chloroplasts', 'CO₂ to enter and O₂ to exit during photosynthesis', 'glucose to be released from the leaf to the soil'], correct: 2, explanation: 'Stomata are pores that open to take in CO₂ for photosynthesis and release O₂, while also regulating water loss.' },
  { id: 351, topic: TOPICS.PHOTOSYNTHESIS, text: 'NADH and FADH₂ produced by the Krebs cycle are important because they', choices: ['directly synthesize glucose from CO₂', 'carry high-energy electrons to the electron transport chain', 'break down pyruvate into acetyl-CoA', 'split water molecules in the thylakoid'], correct: 1, explanation: 'NADH and FADH₂ are electron carriers that deliver high-energy electrons to the ETC, where they drive ATP synthesis via oxidative phosphorylation.' },

  // ── Reproduction (new) ──────────────────────────────────────────────────────
  { id: 352, topic: TOPICS.REPRODUCTION, text: 'Crossing over during meiosis I is important because it', choices: ['allows the cell to replicate more quickly', 'creates new combinations of alleles, increasing genetic variation', 'prevents mutations from occurring in gametes', 'ensures chromosomes separate evenly into daughter cells'], correct: 1, explanation: 'During prophase I, homologous chromosomes exchange segments, producing new allele combinations that increase genetic diversity.' },
  { id: 353, topic: TOPICS.REPRODUCTION, text: 'Identical (monozygotic) twins are produced when', choices: ['two eggs are fertilized by two different sperm simultaneously', 'one fertilized egg splits early in development into two embryos', 'an unfertilized egg divides spontaneously', 'two sperm fuse with the same egg at once'], correct: 1, explanation: 'Identical twins result from a single zygote splitting, producing two genetically identical embryos with the same DNA.' },
  { id: 354, topic: TOPICS.REPRODUCTION, text: 'External fertilization is most common in', choices: ['mammals and reptiles', 'birds and reptiles', 'most fish and amphibians', 'insects and mammals'], correct: 2, explanation: 'Most fish and amphibians release eggs and sperm into water where fertilization occurs externally, requiring an aquatic environment.' },
  { id: 355, topic: TOPICS.REPRODUCTION, text: 'Stem cells are valuable in medicine primarily because they', choices: ['divide uncontrollably like cancer cells to generate tissue quickly', 'are already fully differentiated and ready for transplant', 'can differentiate into many different specialized cell types', 'exist only in embryos and cannot be found in adults'], correct: 2, explanation: 'Stem cells are undifferentiated cells that can self-renew and differentiate into specialized cell types, enabling tissue repair and regeneration.' },
  { id: 356, topic: TOPICS.REPRODUCTION, text: 'The main advantage of internal fertilization over external fertilization is that internal fertilization', choices: ['produces far more offspring per reproductive event', 'requires less energy investment from the parents', 'protects fertilized eggs and embryos from environmental hazards', 'allows eggs to develop without any parental involvement'], correct: 2, explanation: 'Internal fertilization protects the embryo from predation and drying out, increasing survival rates despite fewer offspring.' },
  { id: 357, topic: TOPICS.REPRODUCTION, text: 'Metamorphosis in insects is best described as', choices: ['a form of asexual reproduction', 'a dramatic, hormone-driven transformation in body form during development', 'a type of genetic mutation affecting larval stages', 'the gradual shutdown of cell differentiation'], correct: 1, explanation: 'Metamorphosis is a major developmental transformation (e.g., caterpillar → butterfly) driven by hormones and changes in gene expression.' },
  { id: 358, topic: TOPICS.REPRODUCTION, text: 'The correct order of phases in mitosis is', choices: ['Prophase → Anaphase → Metaphase → Telophase', 'Metaphase → Prophase → Anaphase → Telophase', 'Prophase → Metaphase → Anaphase → Telophase', 'Anaphase → Metaphase → Prophase → Telophase'], correct: 2, explanation: 'Mitosis follows PMAT: Prophase (chromosomes condense), Metaphase (lineup at equator), Anaphase (separation), Telophase (two nuclei form).' },
  { id: 359, topic: TOPICS.REPRODUCTION, text: 'A clone is an organism that is', choices: ['produced by the fertilization of two gametes from different parents', 'genetically identical to its parent organism', 'always physically larger than the original organism', 'a product of sexual reproduction with high genetic variation'], correct: 1, explanation: 'A clone is a genetically identical copy of an organism, produced by asexual reproduction or laboratory nuclear transfer techniques.' },
  { id: 360, topic: TOPICS.REPRODUCTION, text: 'The pituitary gland triggers puberty by signaling the gonads to produce', choices: ['insulin and glucagon', 'adrenaline and cortisol', 'sex hormones (testosterone or estrogen)', 'oxytocin and antidiuretic hormone'], correct: 2, explanation: 'The pituitary releases LH and FSH, which stimulate the gonads to produce sex hormones that drive the physical changes of puberty.' },
  { id: 361, topic: TOPICS.REPRODUCTION, text: 'During meiosis II, what event separates sister chromatids to produce four haploid cells?', choices: ['Homologous chromosomes pair up and cross over again', 'DNA is replicated a second time before division', 'Sister chromatids are pulled to opposite poles by spindle fibers', 'The cell membrane re-forms around the original nucleus'], correct: 2, explanation: 'Meiosis II separates sister chromatids — like mitosis — producing four genetically unique haploid cells from the two cells after meiosis I.' },

  // ── Visual Questions ─────────────────────────────────────────────────────────
  { id: 362, topic: TOPICS.VISUAL, diagram: { type: 'foodweb', highlight: 'Producer' }, text: 'Based on the food web shown, which organism is the producer?', choices: ['Hawk', 'Fox', 'Grass', 'Rabbit'], correct: 2, explanation: 'Grass is the producer — it converts sunlight into food through photosynthesis. All other organisms shown are consumers.' },
  { id: 363, topic: TOPICS.VISUAL, diagram: { type: 'foodweb', highlight: 'Primary Consumer' }, text: 'According to the food web, which organisms are primary consumers (herbivores)?', choices: ['Fox and Snake', 'Hawk only', 'Rabbit and Mouse', 'Fox and Hawk'], correct: 2, explanation: 'Primary consumers eat producers directly. Rabbit and Mouse both feed directly on Grass, making them herbivores at the first consumer level.' },
  { id: 364, topic: TOPICS.VISUAL, diagram: { type: 'foodweb' }, text: 'Based on the food web, if the fox population suddenly decreased, which population would most likely increase?', choices: ['Hawk', 'Grass', 'Snake', 'Rabbit'], correct: 3, explanation: 'Foxes prey on rabbits. Fewer foxes means less predation pressure on rabbits, so the rabbit population would likely increase.' },
  { id: 365, topic: TOPICS.VISUAL, diagram: { type: 'foodweb', highlight: 'Tertiary Consumer' }, text: 'In the food web shown, the hawk occupies which trophic level?', choices: ['First (producer)', 'Second (primary consumer)', 'Third (secondary consumer)', 'Fourth (tertiary consumer)'], correct: 3, explanation: 'The hawk eats foxes and snakes, which already ate primary consumers — placing the hawk at the fourth trophic level.' },
  { id: 366, topic: TOPICS.VISUAL, diagram: { type: 'punnett', alleles: { parent1: ['T', 't'], parent2: ['T', 't'] }, title: 'Tt × Tt Cross' }, text: 'The Punnett square shows a Tt × Tt cross. What percentage of offspring are expected to show the tall phenotype (T is dominant)?', choices: ['25%', '50%', '75%', '100%'], correct: 2, explanation: 'The Tt × Tt cross yields TT : Tt : Tt : tt (1:2:1). Three of four cells show the dominant tall phenotype — 75%.' },
  { id: 367, topic: TOPICS.VISUAL, diagram: { type: 'punnett', alleles: { parent1: ['T', 't'], parent2: ['T', 't'] }, title: 'Tt × Tt Cross' }, text: 'In this Tt × Tt Punnett square, what fraction of offspring are expected to be homozygous dominant (TT)?', choices: ['1/4 (25%)', '2/4 (50%)', '3/4 (75%)', '4/4 (100%)'], correct: 0, explanation: 'Only the top-left cell of the Punnett square produces TT — 1 out of 4 possible offspring, or 25%.' },
  { id: 368, topic: TOPICS.VISUAL, diagram: { type: 'punnett', alleles: { parent1: ['T', 't'], parent2: ['T', 't'] }, title: 'Tt × Tt Cross' }, text: 'How many genotypically distinct types of offspring does this Punnett square predict?', choices: ['1 type (TT only)', '2 types (TT and Tt)', '3 types (TT, Tt, and tt)', '4 distinct types'], correct: 2, explanation: 'The Tt × Tt cross produces three distinct genotypes: TT, Tt, and tt in a 1:2:1 ratio.' },
  { id: 369, topic: TOPICS.VISUAL, diagram: { type: 'punnett', alleles: { parent1: ['T', 't'], parent2: ['T', 't'] }, title: 'Tt × Tt Cross' }, text: 'If 80 plants are produced from this Tt × Tt cross, approximately how many would be expected to be short (tt)?', choices: ['10', '20', '40', '60'], correct: 1, explanation: '25% of Tt × Tt offspring are tt. 25% of 80 = 20 plants expected to show the recessive (short) phenotype.' },
  { id: 370, topic: TOPICS.VISUAL, diagram: { type: 'cladogram' }, text: 'Based on the cladogram, which two organisms share the most recent common ancestor?', choices: ['Fish and Frog', 'Lizard and Fish', 'Cat and Human', 'Frog and Lizard'], correct: 2, explanation: 'Cat and Human branch off from ancestor node D — the rightmost (most recent) branching point — indicating they diverged most recently.' },
  { id: 371, topic: TOPICS.VISUAL, diagram: { type: 'cladogram' }, text: 'According to the cladogram, which organism is LEAST closely related to humans?', choices: ['Cat', 'Lizard', 'Frog', 'Fish'], correct: 3, explanation: 'Fish branches off from the most ancient common ancestor (node A), meaning it diverged from the human lineage earliest and shares the fewest derived traits.' },
  { id: 372, topic: TOPICS.VISUAL, diagram: { type: 'cladogram' }, text: 'The cladogram shows that Lizard, Cat, and Human share ancestor C but Fish and Frog do not. Which trait was most likely acquired at ancestor C?', choices: ['A vertebral column (backbone)', 'Four limbs (tetrapod body plan)', 'The amniotic egg — allowing reproduction on land', 'Warm-blooded metabolism'], correct: 2, explanation: 'Lizards, cats, and humans are amniotes — they have structures allowing reproduction away from water. Fish and frogs must still return to water to reproduce.' },
  { id: 373, topic: TOPICS.VISUAL, diagram: { type: 'mitosis' }, text: 'The diagram shows a cell in which phase of mitosis?', choices: ['Prophase', 'Metaphase', 'Anaphase', 'Telophase'], correct: 1, explanation: 'The diagram shows chromosomes aligned along the equatorial plate with spindle fibers attached — the defining characteristic of metaphase.' },
  { id: 374, topic: TOPICS.VISUAL, diagram: { type: 'mitosis' }, text: 'In the cell diagram shown, which structures are responsible for pulling chromosomes to the equatorial plate?', choices: ['Ribosomes', 'Cell membrane', 'Spindle fibers (microtubules)', 'Nuclear envelope'], correct: 2, explanation: 'Spindle fibers extend from the cell poles and attach to chromosome centromeres, aligning them at the metaphase plate through equal tension.' },
  { id: 375, topic: TOPICS.VISUAL, diagram: { type: 'mitosis' }, text: 'What event in mitosis occurs immediately after the phase shown in the diagram?', choices: ['Chromosomes condense and become visible', 'The nuclear envelope reforms around each chromosome set', 'Sister chromatids separate and move to opposite poles (anaphase)', 'Cytokinesis divides the cytoplasm into two cells'], correct: 2, explanation: 'After metaphase (shown), the cell enters anaphase: spindle fibers pull sister chromatids apart to opposite poles of the cell.' },
  { id: 376, topic: TOPICS.VISUAL, diagram: { type: 'population' }, text: 'Based on the population growth graph, what does the letter K represent?', choices: ['The initial population size at time zero', 'The carrying capacity of the environment', 'The point of fastest population growth', 'The extinction threshold for the population'], correct: 1, explanation: 'K is the carrying capacity — the maximum population size an environment can support given its available resources.' },
  { id: 377, topic: TOPICS.VISUAL, diagram: { type: 'population' }, text: 'At which point on the S-shaped population graph is the population growing most rapidly?', choices: ['At the very start when the population is smallest', 'At the midpoint inflection point of the S-curve', 'Just below the carrying capacity line (K)', 'Growth rate is constant throughout the entire curve'], correct: 1, explanation: 'The population grows fastest at the inflection point — the midpoint of the S-curve — where reproduction rate is highest relative to limiting factors.' },
  { id: 378, topic: TOPICS.VISUAL, diagram: { type: 'population' }, text: 'The early J-shaped portion of the S-curve represents rapid exponential growth. This phase occurs because', choices: ['predators are actively hunting the population', 'resources are essentially unlimited relative to population size', 'the population has reached its carrying capacity', 'genetic drift is reducing allele diversity'], correct: 1, explanation: 'In the early exponential phase, resources are plentiful relative to population size, so birth rates far exceed death rates and the population grows at its maximum rate.' },

  // ── Living Environment June 2025 ─────────────────────────────────────────
  { id: 379, topic: TOPICS.CELL_BIOLOGY, text: 'Which of these components are found in all living organisms?', choices: ['estrogen and testosterone', 'insulin and water', 'chlorophyll and hemoglobin', 'cytoplasm and ATP'], correct: 3, explanation: 'Cytoplasm and ATP are universal — every living cell contains cytoplasm and uses ATP as its energy currency.' },
  { id: 380, topic: TOPICS.CELL_BIOLOGY, text: 'Two types of molecules directly involved in cellular communication are', choices: ['hormones and nerve cell chemicals', 'fats and carbohydrates', 'ATP and carbon dioxide', 'glucose and oxygen'], correct: 0, explanation: 'Hormones (chemical messengers in the bloodstream) and neurotransmitters (nerve cell chemicals) are the two main categories of cellular communication molecules.' },
  { id: 381, topic: TOPICS.ECOLOGY, text: 'When mountain lions consume large prey, they often leave large pieces of their prey behind. The carcass becomes a food source for other organisms — beetles, wolves, bears, and other animals all take advantage of the remains. The role of the mountain lion in this ecosystem is an example of the concept that', choices: ['ecosystems require a large number of predators to increase the number of prey', 'populations are linked with many others in a stable ecosystem', 'large animals waste food, resulting in harm to other organisms in the ecosystem', 'predators should consume small prey to protect the diversity of the ecosystem'], correct: 1, explanation: 'The mountain lion\'s kills benefit many other species, illustrating how populations are interconnected — a core ecology concept.' },
  { id: 382, topic: TOPICS.EVOLUTION, text: 'Mutations are an important part of evolution. One reason for this is that mutations', choices: ['that occur in body cells are passed to offspring', 'are random events that always increase the ability of members to reproduce', 'occur only in sexually reproducing organisms', 'may result in gene variations that provide a survival advantage'], correct: 3, explanation: 'Mutations create new genetic variations; those that provide a survival or reproductive advantage are naturally selected and spread through the population.' },
  { id: 383, topic: TOPICS.ECOLOGY, text: 'Ladybugs that eat plant pests are raised and sold commercially to gardeners. It was assumed that imported ladybugs would remain in the garden area, but studies show that within a few days, 99% had left the original release area. One environmental concern regarding the use of ladybugs to control insect pests could be that', choices: ['ladybugs are an endangered species and must be collected in the wild', 'ladybugs are a safer alternative than the use of chemical pesticides', 'the migration of introduced ladybugs may affect food webs in other areas', 'the action of ladybugs may reduce insect pest populations'], correct: 2, explanation: 'Introduced organisms that migrate can disrupt food webs in areas beyond the intended release site — a key concern with biocontrol agents.' },
  { id: 384, topic: TOPICS.EVOLUTION, text: 'The best-adapted individuals in a population are most likely to be successful in passing on their traits to the next generation because', choices: ['they were able to survive the conditions of their environment when others could not', 'their offspring will be better able to cope with any environmental changes that may occur', 'their genes are the strongest, which will help them attract suitable mates', 'they are less attractive and are less likely to find suitable mates'], correct: 0, explanation: 'Natural selection favors individuals that survive long enough to reproduce, passing their adaptive traits to offspring.' },
  { id: 385, topic: TOPICS.CELL_BIOLOGY, text: 'A diagram shows three structures: a protein molecule, a DNA molecule, and a cell. Which statement best describes the relationship among the three structures?', choices: ['DNA is produced by large protein molecules that diffuse into the cell.', 'Protein is composed of DNA that is produced in the cell.', 'DNA controls the production of protein in the cell.', 'A cell is composed entirely of DNA and protein.'], correct: 2, explanation: 'DNA carries the genetic instructions that are transcribed and translated to build proteins — DNA directs protein synthesis inside the cell.' },
  { id: 386, topic: TOPICS.ECOLOGY, text: 'Scientists found that over a period of 300 years, a pond slowly transformed into a meadow and then a forest. During that time, communities of organisms were replaced by different communities. The best explanation for why new communities were able to replace the older communities is that', choices: ['the species in the old communities died of disease', 'the environment gradually changed, making the area less favorable for the old communities', 'there was a lack of predators for the new communities of organisms', 'the original species suddenly became extinct'], correct: 1, explanation: 'Ecological succession occurs as gradual environmental changes make conditions less suitable for existing communities and more suitable for new ones.' },
  { id: 387, topic: TOPICS.ECOLOGY, text: 'Warblers migrate from Central and South America to New York State each summer, where they breed. Warblers primarily prey on insects and nest in hemlock trees. An invasive insect, the wooly adelgid, is killing hemlock trees across the state. If this continues, fewer warblers will be able to find suitable nesting sites. One consequence of this may be that', choices: ['there will be more food for birds that prey on warblers and other small birds', 'fewer acorns will grow on the oak trees that also grow in the forest', 'insect pest populations will increase because fewer warblers are present', 'more warbler eggs will be hatched in Central and South America to increase the population'], correct: 2, explanation: 'Fewer warblers means less predation on insects, allowing insect pest populations to grow — an example of a trophic cascade.' },
  { id: 388, topic: TOPICS.ECOLOGY, text: 'Seagrass populations decrease significantly in size when sea turtles overgraze the area in which the grasses grow. When predators such as sharks have a constant presence in the same area, the turtles leave and the seagrass population increases. This is an example of how organisms', choices: ['influence other species in a community', 'balance their basic nutritional needs', 'maintain their own internal stability', 'depend on physical conditions for survival'], correct: 0, explanation: 'This trophic cascade — sharks → turtles → seagrass — demonstrates how species in a community influence one another indirectly.' },
  { id: 389, topic: TOPICS.REPRODUCTION, text: 'Strawberry plants grow runners off the main parent plant. New strawberry plants that are genetically identical to the parent plant develop along the runners. This phenomenon can be best explained by the fact that these strawberry plants are produced by', choices: ['asexual reproduction, and the new plants develop by mitosis and differentiation', 'sexual reproduction, and the new plants develop by meiosis and fertilization', 'asexual reproduction, and the new plants develop by meiosis and fertilization', 'sexual reproduction, and the new plants develop by mitosis and differentiation'], correct: 0, explanation: 'Runners produce clones via asexual reproduction; mitosis copies DNA exactly, and differentiation produces the varied tissues of a new plant.' },
  { id: 390, topic: TOPICS.ECOLOGY, text: 'During a class field trip, a student measured and recorded some abiotic factors present in a pond. Which data did the student most likely include in their record of abiotic factors?', choices: ['the number of possible food chains and food webs', 'the diversity of decomposers and their total mass', 'the temperature and pH of the water', 'the size and number of fish species'], correct: 2, explanation: 'Abiotic factors are non-living physical and chemical components of the environment — temperature and pH are classic examples.' },
  { id: 391, topic: TOPICS.ECOLOGY, text: 'Researchers have discovered that certain spiders produce a milk-like fluid for their young. The spider leaves droplets of her "milk" around the nest for the babies after they hatch, and after one week the babies feed directly from her body for at least 20 days. Which statement best describes this recent discovery?', choices: ['It proves that all female animals produce the same hormones to make milk.', 'The discovery will allow for the re-classification of spiders as mammals.', 'It is an example of parental care for the survival of their offspring.', 'The discovery confirms that spiders provide mammal milk to their offspring.'], correct: 2, explanation: 'Parental care behaviors — providing nutrition and protection — increase offspring survival rates across many animal groups.' },
  { id: 392, topic: TOPICS.ECOLOGY, text: 'As part of the "Charge NY" energy plan, New York drivers are being encouraged to purchase electrically powered cars. Many believe that this will help the environment by', choices: ['reducing the number of cars on the road, since drivers will only be able to go short distances before having to recharge the battery', 'reducing local air pollution by lowering levels of carbon dioxide and other pollutants', 'decreasing the number of car sales, since electric cars are more expensive than gasoline-powered cars', 'decreasing the consumption of fossil fuels, since only renewable energy sources can be used to generate electricity'], correct: 1, explanation: 'Electric vehicles produce zero tailpipe emissions, directly reducing local air pollution and greenhouse gas levels in urban areas.' },
  { id: 393, topic: TOPICS.EVOLUTION, text: 'The New Mexico whiptail is a female-only species of lizard that exhibits an unusual form of asexual reproduction. Researchers discovered that these lizards produce eggs that have a full set of chromosomes and have the genetic diversity of sexually reproducing lizards. Which statement best describes the offspring of these lizards?', choices: ['The offspring are a result of uniting a male and female gamete.', 'The offspring develop from eggs with twice the genetic information of the female lizard.', 'The offspring have cells that contain DNA found only in the female lizard.', 'The offspring are genetically identical to each other and the female lizard.'], correct: 2, explanation: 'Because no paternal DNA is involved, all genetic material in the offspring comes exclusively from the female lizard.' },
  { id: 394, topic: TOPICS.REPRODUCTION, text: 'In humans, the placenta is important to the developing embryo. Which essential life functions are carried out by the placenta?', choices: ['nutrition, excretion, and reproduction', 'respiration, nutrition, and excretion', 'movement, reproduction, and nutrition', 'coordination, immunity, and movement'], correct: 1, explanation: 'The placenta exchanges gases (respiration), delivers nutrients (nutrition), and removes metabolic wastes (excretion) for the developing embryo.' },
  { id: 395, topic: TOPICS.HUMAN_BODY, text: 'Injecting individuals with a vaccine composed of killed bacteria protects them from a disease because the proteins from the killed bacteria', choices: ['serve as food for invading pathogens, which prevents them from feeding on human proteins', 'bind with cell nuclei, preventing live pathogenic bacteria from binding with the nuclei later', 'cause a mild case of the disease, preventing the immune system from responding to future infections', 'stimulate the production of antibodies that can be produced in response to an infection'], correct: 3, explanation: 'Vaccine antigens (from killed pathogens) prime the immune system to produce antibodies; future exposure triggers a rapid, memory-driven immune response.' },
  { id: 396, topic: TOPICS.CELL_BIOLOGY, text: 'Which statement about amino acids and simple sugars is correct?', choices: ['Amino acids are used to build inorganic molecules, and simple sugars are used to build organic molecules.', 'Starches are digested into amino acids, and proteins are digested into simple sugars.', 'Amino acids and simple sugars are used as building blocks in the synthesis of organic compounds.', 'Amino acids can enter cells, and simple sugars cannot enter cells.'], correct: 2, explanation: 'Amino acids are monomers of proteins; simple sugars (monosaccharides) are monomers of polysaccharides — both are organic building blocks.' },
  { id: 397, topic: TOPICS.CELL_BIOLOGY, text: 'Protein chains may break. This can cause a problem for living cells because', choices: ['if the proteins break, the cell will contain more proteins than it needs', 'if the chains break, the amino acids will poison the cell, destroying organelles', 'the broken proteins will not interact with other molecules correctly', 'the broken chains will attack the ribosomes of the cell and shut them down'], correct: 2, explanation: 'Protein function depends on 3D shape; broken chains lose their shape and can no longer bind receptors, catalyze reactions, or carry out their roles.' },
  { id: 398, topic: TOPICS.CELL_BIOLOGY, text: 'Enzymes are essential to maintaining homeostasis and helping to regulate human metabolism. They are also examples of molecules that are', choices: ['composed of complex carbohydrates', 'not specific to any life function', 'synthesized by the cell membrane', 'influenced by pH'], correct: 3, explanation: 'Enzymes are proteins whose shape (and therefore activity) is sensitive to pH — denaturation at extreme pH values destroys enzyme function.' },
  { id: 399, topic: TOPICS.CELL_BIOLOGY, text: 'The process by which DNA molecules separate and add new molecular bases to form another DNA molecule is called', choices: ['protein synthesis', 'cell membrane synthesis', 'replication', 'mitosis'], correct: 2, explanation: 'DNA replication unwinds the double helix and uses each strand as a template to build a complementary copy — producing two identical DNA molecules.' },
  { id: 400, topic: TOPICS.PHOTOSYNTHESIS, text: 'Which row in the chart correctly describes activities that occur in the chloroplast and mitochondrion? (Row 1: Chloroplast uses glucose / Mitochondrion makes glucose. Row 2: Chloroplast makes glucose / Mitochondrion uses glucose. Row 3: Chloroplast uses oxygen / Mitochondrion makes oxygen. Row 4: Chloroplast uses oxygen as energy source / Mitochondrion uses carbon dioxide as energy source.)', choices: ['Chloroplast uses glucose as it functions / Mitochondrion makes glucose as it functions', 'Chloroplast makes glucose as it functions / Mitochondrion uses glucose as it functions', 'Chloroplast uses oxygen as it functions / Mitochondrion makes oxygen as it functions', 'Chloroplast uses oxygen as an energy source / Mitochondrion uses carbon dioxide as an energy source'], correct: 1, explanation: 'Chloroplasts produce glucose via photosynthesis; mitochondria break down glucose via cellular respiration — they carry out complementary processes.' },
  { id: 401, topic: TOPICS.ECOLOGY, context: 'A graph shows global fossil fuel consumption from 1800 to 2017, measured in terawatt-hours. All three sources (coal, crude oil, natural gas) show dramatic increases, reaching ~120,000 TWh total by 2017.', text: 'Based on the graph showing global fossil fuel consumption from 1800 to 2017, the increased demand for and use of fossil fuels is a direct result of an', choices: ['increased focus on renewable energy sources', 'increased concern for environmental stability', 'increase in atmospheric changes', 'increase in industrialization'], correct: 3, explanation: 'The Industrial Revolution and subsequent industrial expansion drove the exponential growth in fossil fuel consumption from 1800 onward.' },
  { id: 402, topic: TOPICS.REPRODUCTION, text: 'Some prescription drugs come with a warning that these drugs should be avoided during the early stages of pregnancy. The reason that pregnant women should avoid certain medications early in their pregnancy is because the drug may', choices: ['affect the development of organs in the fetus', 'interfere with meiosis', 'allow differentiation to occur', 'interfere with fertilization'], correct: 0, explanation: 'During the first trimester, organs are forming (organogenesis) — chemicals that disrupt cell differentiation or division can cause birth defects.' },
  { id: 403, topic: TOPICS.ECOLOGY, text: 'Lions in East Africa are most successful hunting during the darker phases of the moon, when they are less visible. Prey animals such as wildebeest are also influenced by moon cycles — during dark phases of the moon, they are less active. This behavior shows that', choices: ['predator behaviors are controlled by the carrying capacity of the environment', 'environmental factors can influence the behavior of predators and their prey', 'producers directly regulate the number of predators in a community', 'consumers influence the physical factors in the predator\'s ecosystem'], correct: 1, explanation: 'Moon phase is an abiotic environmental factor that shapes the behavior of both predators and prey — demonstrating organism–environment interaction.' },
  { id: 404, topic: TOPICS.GENETICS, text: 'The removal of three consecutive base-subunits from a gene would most directly affect the', choices: ['membrane of a cell', 'structure of a protein', 'pH of the cytoplasm', 'size of a cell nucleus'], correct: 1, explanation: 'Removing three consecutive bases (one codon) deletes one amino acid from the resulting protein, altering its structure and potentially its function.' },
  { id: 405, topic: TOPICS.CELL_BIOLOGY, text: 'Some medications have been found to damage mitochondria. This can upset metabolism because mitochondria', choices: ['synthesize energy to make organic compounds', 'produce carbon dioxide, which is used for cellular respiration', 'release oxygen, which is necessary for photosynthesis', 'produce ATP molecules used for cellular processes'], correct: 3, explanation: 'Mitochondria are the primary site of ATP synthesis via cellular respiration; damaged mitochondria reduce the cell\'s energy supply.' },
  { id: 406, topic: TOPICS.GENETICS, text: 'The Labrador retriever is characterized by a solid yellow, brown, or black coat and a friendly personality. In order to increase the chances of Labrador retriever puppies having these traits, breeders should', choices: ['insert the genes for these traits into the cells of the puppies', 'increase genetic variation by mating dogs with different traits', 'breed only dogs with the desired traits to produce puppies', 'use asexual reproduction to breed dogs with a variety of traits'], correct: 2, explanation: 'Selective breeding — mating individuals that express the desired traits — is the traditional method to increase trait frequency in offspring.' },
  { id: 407, topic: TOPICS.HUMAN_BODY, text: 'An example of a harmful immune response occurs when immune cells cause the breakdown of', choices: ['cancerous tissue', 'bacteria cells', 'pathogenic viruses', 'transplanted organs'], correct: 3, explanation: 'The immune system treats a transplanted organ as foreign tissue and attacks it — a harmful autoimmune/rejection response.' },
  { id: 408, topic: TOPICS.GENETICS, text: 'Individuals who use tanning beds have an increased risk of getting skin cancer. Their skin cancer may', choices: ['be passed to their offspring because it is a gene mutation', 'spread in the individual but will not be directly passed to their offspring', 'result in the offspring having immunity to skin cancer', 'help their offspring better adapt to skin cancer in sunnier climates'], correct: 1, explanation: 'Somatic (body cell) mutations from UV damage cause cancer in the individual but are not inherited by offspring; only germline mutations are heritable.' },

  // Part B-1 questions
  { id: 409, topic: TOPICS.ECOLOGY, context: 'A diagram shows the nitrogen cycle. Atmospheric nitrogen (N₂) is converted by nitrogen-fixing bacteria (in soil and legume root nodules) to ammonium (NH₄⁺). Nitrifying bacteria convert ammonium to nitrite then nitrate (NO₃⁻). Plants assimilate nitrates. Decomposers return nitrogen to ammonium through ammonification. Denitrifying bacteria return nitrogen gas to the atmosphere.', text: 'Based on the nitrogen-cycling model, which bacteria are able to convert atmospheric nitrogen gas to nitrogen compounds in the soil?', choices: ['aerobic and anaerobic bacteria', 'nitrifying bacteria', 'nitrogen-fixing bacteria', 'denitrifying bacteria'], correct: 2, explanation: 'Nitrogen-fixing bacteria (in soil and legume root nodules) are the only organisms that can convert inert atmospheric N₂ into biologically usable ammonia/ammonium.' },
  { id: 410, topic: TOPICS.ECOLOGY, context: 'A diagram shows the nitrogen cycle. Atmospheric nitrogen (N₂) is converted by nitrogen-fixing bacteria to ammonium (NH₄⁺). Nitrifying bacteria convert ammonium to nitrate (NO₃⁻). Denitrifying bacteria return nitrogen gas to the atmosphere.', text: 'Based on the nitrogen-cycling model, which two organisms carry out opposite processes?', choices: ['nitrifying bacteria and nitrogen-fixing bacteria in the soil', 'nitrogen-fixing bacteria in the soil and nitrogen-fixing bacteria in legumes', 'aerobic bacteria and anaerobic bacteria', 'denitrifying bacteria and nitrogen-fixing bacteria in the soil'], correct: 3, explanation: 'Nitrogen-fixing bacteria add nitrogen to the soil ecosystem; denitrifying bacteria remove it — they carry out directly opposite processes in the nitrogen cycle.' },
  { id: 411, topic: TOPICS.ECOLOGY, context: 'Plants can use nitrates from the soil to make amino acids such as alanine (C₃H₇NO₂). The nitrogen comes from soil nitrates. Carbon, hydrogen, and oxygen must come from other environmental sources.', text: 'Plants can use nitrates from the soil to make amino acids such as alanine (C₃H₇NO₂). Two other substances plants take in from their environment that would provide all of the remaining components to make many alanine molecules are', choices: ['carbon dioxide (CO₂) and water (H₂O)', 'carbon dioxide (CO₂) and sunlight', 'water (H₂O) and oxygen (O₂)', 'glucose (C₆H₁₂O₆) and oxygen (O₂)'], correct: 0, explanation: 'Alanine contains C, H, O, and N. Nitrates supply N; CO₂ supplies C and O; H₂O supplies H and O — together these provide all four elements.' },
  { id: 412, topic: TOPICS.ECOLOGY, context: 'A diagram shows the nitrogen cycle. Decomposers (aerobic and anaerobic bacteria, fungi) return nitrogen from dead organisms to ammonium through ammonification.', text: 'If all of the aerobic and anaerobic bacteria indicated as decomposers in the nitrogen-cycle model were lost from this ecosystem, the most likely effect would be', choices: ['a decrease in the carrying capacity for nitrogen-fixing bacteria', 'an increase in the number of nitrifying bacteria', 'a decrease in the carrying capacity for plants', 'an increase in activity of the nitrifying bacteria'], correct: 2, explanation: 'Without decomposers, nitrogen would not be recycled from dead organisms back to ammonium/nitrates, starving plants of nitrogen and reducing plant carrying capacity.' },
  { id: 413, topic: TOPICS.EVOLUTION, context: 'Male Pacific field crickets on the island of Kauai attract mates with loud wing songs, but also attract a fly that deposits larvae on the cricket. Scientists observed quiet crickets with differently-shaped wings. Data: Without wing mutation: 30% with fly larvae. With wing mutation: 0.8% with fly larvae.', text: 'Based on the cricket wing mutation data, which statement most accurately describes the relationship between the data and the original hypothesis?', choices: ['The data support the hypothesis because crickets with the mutation had fewer fly larvae.', 'The data support the hypothesis because crickets without the mutation had a greater percentage of survivors.', 'The data do not support the hypothesis because crickets with the mutation had more fly larvae.', 'The data do not support the hypothesis because crickets with the mutation had a smaller percentage of survivors.'], correct: 0, explanation: 'The mutation dramatically reduced parasitism (30% → 0.8%), which directly supports the hypothesis that the wing mutation helps crickets escape the fly.' },
  { id: 414, topic: TOPICS.EVOLUTION, context: 'Male Pacific field crickets with a wing mutation have a 0.8% parasitism rate vs. 30% for normal crickets. Scientists noticed crickets with the mutation can still attract mates.', text: 'Scientists noticed that crickets with the mutation are still able to attract mates. Based on the data, which prediction is valid if this particular fly remains part of the cricket\'s environment?', choices: ['The number of crickets with the mutation will decrease because the trait is beneficial to them.', 'The number of crickets with the mutation will remain the same because the trait is neither beneficial nor harmful.', 'The number of crickets with the mutation will increase because the trait gives them an advantage.', 'The number of crickets with the mutation will increase because the trait is a disadvantage.'], correct: 2, explanation: 'The mutation provides a survival advantage (less parasitism) without reducing mating success, so natural selection will increase its frequency over time.' },
  { id: 415, topic: TOPICS.ECOLOGY, context: 'Two groups of plants with the same initial stem length (15 mm) were grown for 20 days at different temperatures. Group A at 17°C grew from 15 to 71 mm. Group B at 27°C grew from 15 to 92 mm.', text: 'Scientists claimed that plants growing in the Group A experimental setup at 17°C would be likely to survive if the temperature in their natural environment decreased over time to 17°C. Which statement uses data from the table to support this claim?', choices: ['Plants in A survived growing at 17°C in their experimental setup and would therefore be likely to survive.', 'Plants in A require less water. This makes them more likely to survive in cooler temperatures.', 'Plants in B are growing the most rapidly. A temperature of 17°C will not harm them.', 'Plants in B will survive and will grow faster at the cooler temperature.'], correct: 0, explanation: 'The data directly show Group A plants survived and grew at 17°C, which is valid evidence to support the claim about survival at that temperature.' },
  { id: 416, topic: TOPICS.ECOLOGY, text: 'A single-celled parasite is responsible for the death of a large number of sea otters. Scientists traced the origin of the parasite to multiple sources, including domestic cat feces. Rain washes some litter box wastes into the ocean kelp forests where sea otters live. Failure to properly dispose of contaminated cat litter is an example of', choices: ['one way sea otters are negatively affecting large numbers of household pets', 'how humans are preventing a dangerous parasite from reproducing', 'a human action that inadvertently could alter the equilibrium in an ecosystem', 'the release of a substance that could result in a rapid growth of the sea otter population'], correct: 2, explanation: 'Improper disposal of cat litter introduces a pathogen into the marine ecosystem, demonstrating how human actions can disrupt ecosystem equilibrium.' },
  { id: 417, topic: TOPICS.HUMAN_BODY, context: 'Scientists examined the relationship between lead in topsoil and learning difficulties in children. Lead was used as a gasoline additive until 1996. They found that where lead levels in soil are high, the number of children with learning difficulties is also high.', text: 'In order to support the claim that lead in the soil can result in learning difficulties in children, the scientists should', choices: ['repeat the study comparing lead levels in the soils near rivers with those near highways', 'support the passage of laws to eliminate the use of lead additives in gasoline', 'determine if high soil concentration of other metals, such as iron, causes learning difficulties in children', 'determine if there is a correlation between high levels of lead in the soil and in the blood of children with learning disabilities'], correct: 3, explanation: 'To establish causation, scientists need to show lead from soil enters children\'s bodies — measuring lead in blood would establish this physiological link.' },
  { id: 418, topic: TOPICS.HUMAN_BODY, context: 'Scientists measured lead concentration along interstate highways and compared it with the number of children experiencing cognitive difficulties. Lead in soil clings to fingers and toys; young children experience difficulty with memory and concentration when exposed.', text: 'After discovering where lead levels in the topsoil are high, what could parents do to reduce the chances of learning difficulties in their children?', choices: ['Provide their children with only organic fruits and vegetables.', 'Have their children wash their hands after playing outside.', 'Have their children attend school in a different part of the community where lead levels are lower.', 'Provide their family physician with information about any genetic disorders in the family.'], correct: 1, explanation: 'Lead clings to hands and objects; handwashing after outdoor play directly removes the exposure pathway before children can ingest it.' },
  { id: 419, topic: TOPICS.ECOLOGY, text: 'Beavers have been migrating north and impacting Arctic ecosystems. By building dams on streams, beavers are creating new bodies of water that contribute to the thawing of frozen permafrost, a huge natural reservoir of stored greenhouse gases. There were 94 beaver dams on Alaska\'s Baldwin Peninsula in 2010 and 409 dams by 2019. Based on these numbers, a reasonable claim that scientists can make concerning beaver activity in the Arctic is that beavers', choices: ['are accelerating the rate of global climate change', 'are producing a more stable Arctic ecosystem through dam-building', 'have exceeded their carrying capacity in the Arctic', 'have caused more soil to freeze during the winter months'], correct: 0, explanation: 'Beaver dams thaw permafrost, releasing stored greenhouse gases — a positive feedback loop that accelerates warming and climate change.' },
  { id: 420, topic: TOPICS.ECOLOGY, context: 'A timeline shows the white-tailed deer reproductive cycle: breeding in October–November; birth of offspring in May–June.', text: 'White-tailed deer in New York State breed once a year, with breeding in fall and birth of offspring in spring/early summer. Which statement best helps explain why this breeding cycle is successful for deer?', choices: ['Giving birth in the spring and early summer ensures that there will be food for the offspring.', 'Deer avoid giving birth during the fall hunting season.', 'Fall is the only time of the year male and female deer are in the same locations.', 'Large deer predators move to cooler locations during the hot summer months.'], correct: 0, explanation: 'Spring births align with peak plant growth, ensuring abundant food for nursing mothers and newly weaned fawns during the most resource-rich season.' },
  { id: 421, topic: TOPICS.CELL_BIOLOGY, context: 'A diagram shows normal insulin function (insulin binds to body cell receptors and allows glucose to enter cells) and insulin resistance (insulin cannot bind properly, so glucose remains in bloodstream).', text: 'Insulin resistance results when the body produces insulin but cells are not able to respond to it. This resistance could result in', choices: ['a lower level of glucose in the bloodstream', 'an increase of glucose in the cell', 'a failure of glucose to leave the cells', 'an increase in glucose in the bloodstream'], correct: 3, explanation: 'If cells cannot respond to insulin, glucose cannot enter them and accumulates in the bloodstream — the defining characteristic of Type 2 diabetes.' },


{ id: 422, topic: TOPICS.CELL_BIOLOGY, text: 'In an animal cell, all of the organelles work together to carry out', choices: ['photosynthesis', 'diffusion', 'metabolic processes', 'information storage'], correct: 2, explanation: 'Organelles function collectively to perform the metabolic processes (chemical reactions) that keep the cell alive, such as energy production, protein synthesis, and waste removal.' },

{ id: 423, topic: TOPICS.REPRODUCTION, text: "A colony of 47,000 quaking aspen trees, all connected by one root system, is considered to be Earth's most massive organism. When the trees are stressed, shoots are sent out from the roots and develop into new trees. Every new tree in this colony would contain", choices: ['the same genetic information, because it is produced asexually', 'the same genetic information, because it is produced sexually', 'less genetic material, since it is produced from root cells', 'a different combination of genes, since it is produced from various roots'], correct: 0, explanation: 'Asexual reproduction via shoots from a single root system produces clones — genetically identical copies of the original organism — because no mixing of genetic material occurs.' },

{ id: 424, topic: TOPICS.CELL_BIOLOGY, text: 'Scientists have found that different tissues in the prostate gland respond to different hormones — center area tissues respond to testosterone, outer area tissues respond to estrogen. The cells that make up these two regions of the prostate are different in that', choices: ['cells in the center area produce more estrogen than cells in the outer area', 'cells in the outer area have many testosterone receptors', 'they contain different receptors on their cell membranes', 'they contain different DNA sequences for the production of hormones'], correct: 2, explanation: 'Different receptors on cell membranes allow cells to respond to specific hormones; center cells have testosterone receptors and outer cells have estrogen receptors, explaining their different responses.' },

{ id: 425, topic: TOPICS.ECOLOGY, text: 'Energy transfers in a natural ecosystem are represented in a food web containing: Hawks, Foxes, Small birds, Badgers, Hedgehogs, Rabbits, Beetles, Slugs, Mice, and Grasses. Which statement about this ecosystem is correct?', choices: ['A reduction in the number of species present would most likely upset the stability of this ecosystem.', 'This ecosystem would not be affected if decomposers did not perform their function.', 'This ecosystem lacks producer organisms.', 'There are most likely more foxes than rabbits in this ecosystem.'], correct: 0, explanation: 'Greater biodiversity provides more feeding relationships and redundancy, so removing species reduces the stability and resilience of the food web.' },

{ id: 426, topic: TOPICS.REPRODUCTION, text: 'The process of differentiation occurs when', choices: ['two different cells, a sperm cell and an egg cell, combine to produce a zygote', 'different zygotes are formed each time that an egg and sperm unite', 'different kinds of cells and tissues form during embryonic development', 'two different sexes are present among the offspring, after sexual reproduction'], correct: 2, explanation: 'Differentiation is the developmental process by which genetically identical embryonic cells become specialized into the many different cell and tissue types of a multicellular organism.' },

{ id: 427, topic: TOPICS.HUMAN_BODY, text: 'Which two human systems work together to provide glucose for the cells of the body?', choices: ['nervous and reproductive systems', 'nervous and respiratory systems', 'circulatory and digestive systems', 'circulatory and respiratory systems'], correct: 2, explanation: 'The digestive system breaks food down into glucose and the circulatory system transports that glucose through the blood to all body cells.' },

{ id: 428, topic: TOPICS.CELL_BIOLOGY, context: 'Chart lists four levels of biological organization in a multicellular organism: organs (Row 1), tissues (Row 2), organelles (Row 3), and cells (Row 4).', text: 'A chart includes structures found in a multicellular organism — Row 1: organs, Row 2: tissues, Row 3: organelles, Row 4: cells. Which row contains the structures that would be most numerous?', choices: ['Row 1 — organs', 'Row 2 — tissues', 'Row 3 — organelles', 'Row 4 — cells'], correct: 2, explanation: 'Each cell contains many organelles, and since a multicellular organism has trillions of cells each containing numerous organelles, organelles far outnumber cells, tissues, or organs.' },

{ id: 429, topic: TOPICS.REPRODUCTION, text: 'Dioxin, a toxin associated with waste incineration and some plastics, has been found to directly disrupt normal gamete production in human females. Dioxin most likely affects the', choices: ['testes and progesterone production', 'ovaries and estrogen production', 'DNA in the nuclei of sperm cells', 'pancreas and insulin production'], correct: 1, explanation: 'In human females, eggs (gametes) are produced in the ovaries, and estrogen is the primary female sex hormone regulating that process, so a toxin disrupting female gamete production would target ovaries and estrogen.' },

{ id: 430, topic: TOPICS.GENETICS, text: 'A gene present only in a single plant species was found to regulate protein content. This gene could increase the protein content of other food crops in the developing world. The most likely method that scientists would use to incorporate this gene into a variety of food crops is', choices: ['genetic engineering', 'selective breeding', 'sexual reproduction between the plants with this gene and those without it', 'deletion of the genes that limit protein production from each individual food crop plant'], correct: 0, explanation: 'Genetic engineering allows scientists to directly insert a specific gene from one species into another, which is the only reliable method when the gene exists in an entirely different, sexually incompatible species.' },

{ id: 431, topic: TOPICS.ECOLOGY, text: 'A decrease in predators within an ecosystem would lead to an increase in herbivores. The increase in herbivores would cause a decrease in', choices: ['decomposers', 'prey', 'consumers', 'producers'], correct: 3, explanation: 'More herbivores consume more plants (producers), so the producer population declines as a direct result of increased herbivore grazing pressure.' },

{ id: 432, topic: TOPICS.GENETICS, text: 'A lioness and her cub share similar characteristics. In order for some of the genetic information in the lioness to be present in the cub, the genetic information from the mother must have been', choices: ['copied and present in the egg cell of the lioness', 'combined with genetic information from another lioness', 'contained in half of the DNA found in the sperm cells of the father', 'able to make enzymes to produce all of the carbohydrates found in the mother'], correct: 0, explanation: "The mother's DNA is replicated and packaged into her egg cells during meiosis, so the egg carries a copy of half the mother's genetic information that is then passed to the offspring." },

{ id: 433, topic: TOPICS.REPRODUCTION, text: 'Which statement best describes a critical function of the placenta?', choices: ["Meiosis occurs in the placenta, allowing for the development and release of eggs.", "Blood from the mother and fetus mixes at the placenta, providing nutrients and oxygen.", "The placenta filters out all harmful toxins and chemicals from the mother's blood, so that they cannot reach the fetus.", 'The exchange of oxygen and carbon dioxide occurs between the mother and developing fetus across the placenta.'], correct: 3, explanation: "The placenta allows oxygen and nutrients to pass from the mother's blood to the fetus and carbon dioxide and waste products to move in the opposite direction, without the two bloodstreams actually mixing." },

{ id: 434, topic: TOPICS.HUMAN_BODY, text: 'Organisms maintain internal stability in a changing environment by making a series of continual adjustments. The process of making these continual adjustments is referred to as', choices: ['cellular respiration', 'active transport', 'natural selection', 'dynamic equilibrium'], correct: 3, explanation: 'Dynamic equilibrium describes the ongoing, active process by which organisms constantly adjust their internal conditions to maintain homeostasis in a changing environment.' },

{ id: 435, topic: TOPICS.EVOLUTION, text: 'A species of octopus lives in the depths of the ocean where oxygen levels are low. These octopuses have specific proteins in their blood that allow for more efficient oxygen transport than those that live in surface waters. Which statement best explains the presence of these proteins?', choices: ['Migration to warmer and shallower ocean water favored the formation of the specific proteins.', 'Octopuses that had the specific proteins were able to survive and reproduce in the deep water environment and passed the trait on to future generations.', 'When some octopuses migrated to a deeper environment, they needed to produce new proteins so that their blood could carry more oxygen.', 'Mutations occurred in the body cells of the octopuses, which resulted in the specific proteins being produced and passed on to their offspring.'], correct: 1, explanation: 'Natural selection explains this: octopuses that happened to have the more efficient oxygen-transport proteins survived and reproduced in the low-oxygen environment, passing the trait to offspring over many generations.' },

{ id: 436, topic: TOPICS.CELL_BIOLOGY, text: 'Tissue engineering is being developed as a technology that would use laboratory-grown tissues to replace diseased or damaged human body parts, such as hearts and kidneys. In order to build these new body parts, scientists would start by', choices: ['assembling molecules directly into tissues that can make body systems', 'making organelles and using the organelles to develop organs', 'engineering body systems in order to develop organelles for transplant', 'growing cells to develop tissues and then growing these tissues to form an organ'], correct: 3, explanation: 'Biological organization proceeds from cells → tissues → organs, so tissue engineering must begin at the cellular level, culturing cells that then organize into tissues and eventually form an organ.' },

{ id: 437, topic: TOPICS.HUMAN_BODY, text: 'People with cystic fibrosis have decreased levels of some digestive enzymes in their small intestines and must take enzyme supplements to prevent malnutrition. These enzymes are an important part of the digestive process because they', choices: ['break down foods so that nutrients can be absorbed and used', 'contain vitamins and other nutrients necessary for a healthy diet', 'allow the person to synthesize large, inorganic nutrient molecules', 'are the building blocks of carbohydrates and other nutrient molecules'], correct: 0, explanation: 'Digestive enzymes catalyze the breakdown of large food molecules into small absorbable nutrients; without them, nutrients cannot enter the bloodstream and nourish the body.' },

{ id: 438, topic: TOPICS.GENETICS, context: 'Diagram shows the sexual reproductive cycle: adults undergo meiosis to form gametes, gametes unite via fertilization to form a zygote, and mitosis drives growth back to adults.', text: 'A reproductive cycle is illustrated: Adults → (Process 1: meiosis) → Sperm/Eggs → (Process 2: fertilization) → Zygotes → (Process 3: mitosis) → Growth stages → Adults. Which statement about this reproductive cycle is correct?', choices: ['Mutations that occur during processes 1 and 2 will not be passed on to offspring.', 'Exact copies of the parents are produced, which leads to a stable population.', 'Sorting and recombining of genes occurs, which leads to new genetic combinations.', 'The three processes result in offspring with half as much genetic information as the adults.'], correct: 2, explanation: 'During meiosis, independent assortment and crossing over randomly shuffle and recombine alleles, while fertilization combines two different gametes, together generating new genetic combinations in each offspring.' },

{ id: 439, topic: TOPICS.HUMAN_BODY, text: 'Kidney-transplant surgery places a healthy kidney from one person into the body of another. The body will often produce substances that work against this transplanted organ. The system most directly involved in attacking the transplanted kidney is the', choices: ['excretory system', 'nervous system', 'circulatory system', 'immune system'], correct: 3, explanation: 'The immune system recognizes the transplanted kidney as foreign tissue and mounts an immune response, producing antibodies and activating immune cells that attack the organ.' },

{ id: 440, topic: TOPICS.ECOLOGY, context: 'Diagram shows a four-level energy pyramid with level A at the base and level D at the top; four columns offer different organism assignments for each level.', text: 'An energy pyramid has four levels (A = base, D = top). Which column correctly identifies the organisms at each level?', choices: ['Column 1: D=carnivores, C=heterotrophs, B=producers, A=herbivores', 'Column 2: D=carnivores, C=carnivores, B=herbivores, A=producers', 'Column 3: D=heterotrophs, C=autotrophs, B=herbivores, A=producers', 'Column 4: D=producers, C=carnivores, B=herbivores, A=heterotrophs'], correct: 1, explanation: 'In a correctly structured energy pyramid, the base (A) is producers, the next level (B) is herbivores, followed by carnivores (C), with top carnivores (D) at the apex.' },

{ id: 441, topic: TOPICS.HUMAN_BODY, context: 'Diagram illustrates the negative feedback loop for thermoregulation: a drop below normal body temperature triggers vasoconstriction and shivering, which restore temperature to the normal 36–38°C range.', text: 'A diagram shows human body temperature regulation: Normal body temperature (36–38°C) → Body temperature gets too low → Blood vessels in skin constrict, reducing heat loss / Muscles begin shivering, generating heat → Body temperature increases. These events can be best described as an example of', choices: ['a feedback mechanism that maintains homeostasis', 'a cycle that regulates cellular communication', 'an immune system response to increasing heart rate', 'a body system regulating hormone production'], correct: 0, explanation: 'The body detecting a drop in temperature and triggering responses (vasoconstriction, shivering) that restore normal temperature is a classic negative feedback mechanism that maintains homeostasis.' },

{ id: 442, topic: TOPICS.ECOLOGY, text: "The World Wildlife Federation's recent report indicated that there has been a 60% decline in the size of monitored wildlife populations in just over 40 years. The most likely factor contributing to this decline was", choices: ['animals reproducing successfully', 'the destruction of many natural habitats', 'passing environmental protection laws', 'the introduction of native species into habitats'], correct: 1, explanation: 'Habitat destruction is the single greatest driver of wildlife population decline worldwide, removing the food, shelter, and space that species need to survive and reproduce.' },

{ id: 443, topic: TOPICS.ECOLOGY, text: 'An Adirondack Mountain ecosystem is represented with trees, deer, grass, and various predators and prey. An abiotic factor in this ecosystem is the', choices: ['pH of the soil where the trees grow', 'number of deer of reproductive age', 'different species of grass present', 'balance between predators and prey'], correct: 0, explanation: 'Abiotic factors are non-living components of an ecosystem; soil pH is a chemical property of the physical environment, while the other choices all describe living (biotic) components or their interactions.' },

{ id: 444, topic: TOPICS.ECOLOGY, text: 'A partial food chain is represented: Grasses → Field mice → Owls. A student observed owls hunting mice in a field. Some chemicals from the waste products of the owls were made available to be absorbed by the roots of the grasses due to the action of', choices: ['autotrophs', 'carnivores', 'herbivores', 'decomposers'], correct: 3, explanation: 'Decomposers (bacteria and fungi) break down organic waste and dead organisms, recycling the nutrients they contain back into the soil where plants can absorb them.' },

{ id: 445, topic: TOPICS.CELL_BIOLOGY, text: 'Which two terms are opposite processes?', choices: ['autotrophic nutrition and photosynthesis', 'asexual reproduction and cloning', 'digestion and synthesis', 'natural selection and evolution'], correct: 2, explanation: 'Digestion breaks large molecules down into smaller ones (catabolism), while synthesis builds large molecules from smaller ones (anabolism), making them directly opposite chemical processes.' },

{ id: 446, topic: TOPICS.ECOLOGY, text: 'Which human activity would most likely deplete finite resources?', choices: ['recycling of aluminum and paper', 'protection of wildlife habitats', 'uncontrolled population growth', 'regulations that reduce industrial pollution'], correct: 2, explanation: 'Uncontrolled population growth increases demand for food, water, energy, and raw materials, accelerating the consumption of finite natural resources faster than they can be replenished or managed.' },

{ id: 447, topic: TOPICS.GENETICS, text: 'Macaques are a species of monkey. In January 2018, scientists cloned two baby macaques from a single body cell. These monkeys are genetically', choices: ['identical to each other, but different from the donor of the body cell', 'different from each other, but identical to the donor of the body cell', 'identical to each other and to the donor of the body cell', 'different from each other and from the donor of the body cell'], correct: 2, explanation: 'Cloning copies the complete DNA of the donor cell, so both cloned individuals are genetically identical to each other and to the original donor organism.' },

{ id: 448, topic: TOPICS.ECOLOGY, text: 'Which event would most likely be the immediate result of significantly lowering the oxygen concentration in a freshwater lake?', choices: ['a decrease in the number of fish', 'an increase in the number of plants', 'an increase in biodiversity', 'a decrease in water temperature'], correct: 0, explanation: 'Fish and most aquatic animals require dissolved oxygen for cellular respiration; a sharp drop in oxygen concentration causes fish to suffocate and die, immediately reducing their numbers.' },

{ id: 449, topic: TOPICS.GENETICS, text: 'Scientists have modified papayas to be resistant to the papaya ringspot virus and to decrease the time that it takes for them to ripen. These modifications', choices: ['may cause papayas to ripen too slowly, causing loss of revenue', 'are passed to any organism that eats them, making the organism resistant to the virus', 'are an example of using agricultural technologies to increase farm yields', 'could spread ringspot virus throughout the entire ecosystem'], correct: 2, explanation: 'Engineering disease resistance and faster ripening are agricultural biotechnology strategies that directly increase crop productivity and reduce losses, thereby improving farm yields.' },

{ id: 450, topic: TOPICS.HUMAN_BODY, text: 'Vaccinated individuals are protected from disease because their bodies have been stimulated to', choices: ['produce antibodies against specific pathogens', 'synthesize antigens against harmful microbes', 'make fewer white blood cells during infection', 'manufacture more enzymes to react to microbes'], correct: 0, explanation: 'Vaccines expose the immune system to an antigen, stimulating it to produce specific antibodies and memory cells so the body can rapidly neutralize the actual pathogen if encountered later.' },

{ id: 451, topic: TOPICS.ECOLOGY, text: 'A species of predatory wasp is introduced to control an insect pest. A possible negative consequence of this action is that the new predatory wasp may', choices: ['limit the population of the insect pest', 'prey on beneficial insects', 'disrupt mineral availability in the ecosystem', 'cause an increase in pesticide-resistant plants'], correct: 1, explanation: 'Introduced predators rarely restrict themselves to the target pest and can attack native beneficial insects such as pollinators, causing unintended ecological harm.' },

{ id: 452, topic: TOPICS.ECOLOGY, context: 'Table shows mercury levels (ppm/oz) in common seafood: Swordfish 0.995, King mackerel 0.73, Cod 0.11, Trout 0.07, Halibut 0.024, Tilapia 0.013, Shrimp 0.009. Omega-3 fats in seafood support circulatory and fetal brain development; mercury is especially harmful to fetuses and young children.', text: 'Based on the information given, which statement concerning the eating of fish and seafood is most accurate?', choices: ['People should avoid eating seafood because the negative effects of the mercury in seafood are far worse than any benefits. Even shrimp and tilapia contain high levels of mercury.', "The normal development of a baby's nervous system requires that the mother be more concerned with eating enough seafood and less concerned with the side effects of higher levels of mercury on the child.", 'Eating certain selected species of seafood can provide health benefits without the negative effects of high mercury intake.', 'It is important that pregnant women eat a regular diet of seafood, including swordfish, halibut, and cod.'], correct: 2, explanation: 'The data show that low-mercury species like shrimp and tilapia provide omega-3 benefits with negligible mercury risk, while high-mercury species like swordfish should be avoided, supporting a selective approach.' },

{ id: 453, topic: TOPICS.ECOLOGY, context: 'Table shows mercury levels (ppm/oz) in common seafood. Industrialization has contributed to unsafe mercury levels building up in aquatic ecosystems; mercury is especially harmful during fetal development.', text: 'Which statement is best supported by the information provided about the levels of mercury present in seafood?', choices: ['Human activities do not affect mercury levels in fish species.', 'Future generations can be affected by choices made by past and present generations.', 'Fish that consume plants have the highest levels of mercury compounds.', 'If people stop eating fish, then the mercury levels in fish will decrease.'], correct: 1, explanation: 'Mercury pollution from industrialization (a human activity) accumulates in fish and can harm developing fetuses and children, demonstrating that current human decisions impose environmental and health consequences on future generations.' },

{ id: 454, topic: TOPICS.GENETICS, text: "Grasshopper mice feed on bark scorpions but, unlike other mice, are unaffected by the scorpion's painful venom. Scientists determined that these mice have one amino acid difference in their pain receptors, causing the receptor to function differently. This change in protein function was originally caused by a change in", choices: ['molecular bases located in the nucleus', 'fat molecules in the cell membrane', 'the amino acids in the DNA', 'the genes located in the protein'], correct: 0, explanation: 'Proteins are built according to instructions encoded in DNA base sequences in the nucleus; a change in one amino acid in the receptor protein traces back to a mutation — a change in the DNA nucleotide bases that code for that protein.' },

{ id: 455, topic: TOPICS.PHOTOSYNTHESIS, context: 'Table pairs a type of organism (small mammal or grasses) with a process (respiration or photosynthesis) across four rows; the question asks which pairing matches the autotrophic function of deep-sea vent organisms.', text: 'Certain organisms living deep in the ocean can obtain energy from inorganic compounds that flow out of volcanic vents and use this energy to synthesize energy-rich organic compounds. Which row correctly pairs an organism that performs a similar function in land environments with the process involved?', choices: ['Row 1: small mammal — respiration', 'Row 2: grasses — photosynthesis', 'Row 3: small mammal — photosynthesis', 'Row 4: grasses — respiration'], correct: 1, explanation: 'Like deep-sea chemoautotrophs, grasses are primary producers that convert inorganic raw materials into energy-rich organic compounds — in their case using light energy via photosynthesis.' },

{ id: 456, topic: TOPICS.ECOLOGY, context: 'Passage describes declining Atlantic salmon populations due to overfishing and the development of salmon farming. Farmed populations have limited genetic diversity compared to wild-caught salmon.', text: 'Which row correctly pairs possible effects of fish farming?', choices: ['Negative: Loss of biodiversity among farmed fish / Positive: Increased sales of fish, a food source', 'Negative: Increased sales of fish, a food source / Positive: Limited genetic diversity in salmon population', 'Negative: Loss of biodiversity in wild fish / Positive: Decreased population size', 'Negative: Increased biodiversity / Positive: Increased population size'], correct: 0, explanation: 'Farm-raised salmon populations have limited genetic diversity (a negative consequence for long-term survival), while providing an increased supply of fish as a food source is the clear positive benefit.' },

{ id: 457, topic: TOPICS.EVOLUTION, context: 'Four phylogenetic (evolutionary) trees are shown, each arranging bears, giant pandas, raccoons, and red pandas differently based on proposed ancestor relationships.', text: 'DNA studies show that bears and raccoons evolved from a common ancestor about 50 million years ago. Giant pandas evolved from a more recent ancestor related to bears. Red pandas evolved from a more recent ancestor related to raccoons. Which evolutionary tree best represents these sequences of events?', choices: ['Tree 1: raccoon and red panda are sister groups; bear and giant panda are sister groups; these two pairs share the oldest common ancestor ~50 mya', 'Tree 2: bear and red panda are sister groups; giant panda and raccoon are sister groups', 'Tree 3: bear, giant panda, and red panda are grouped together; raccoon is the outgroup', 'Tree 4: giant panda, raccoon, and red panda are grouped together; bear is the outgroup'], correct: 0, explanation: 'The DNA evidence places giant panda closest to bears and red panda closest to raccoons, with bears and raccoons sharing the most ancient common ancestor ~50 mya, which is correctly depicted only in Tree 1.' },

{ id: 458, topic: TOPICS.GENETICS, context: 'Researchers found that genetically identical water fleas develop different body armor forms depending on whether no predator, a stickleback fish, or a backswimmer bug is present in their environment.', text: 'Which statement best explains why the three genetically identical water fleas have different appearances?', choices: ['Random alterations of genes occur in water fleas when they eat different foods.', "Predators in the water flea's environment cause mutations in the water flea.", 'Genes are not involved in the appearance of these water fleas.', 'Water flea gene expression can be influenced by the type of predator present in their environment.'], correct: 3, explanation: 'This is an example of phenotypic plasticity: the same genome produces different physical traits (body armor forms) depending on environmental signals (predator type), demonstrating that gene expression — not the genes themselves — is altered by the environment.' },

{ id: 459, topic: TOPICS.GENETICS, context: 'It was widely accepted that mitochondria are inherited only from mothers. In 2002, a patient was found to have inherited a mitochondrial DNA mutation from his father; additional cases have since been documented.', text: 'The discovery that humans can inherit mitochondria from their fathers illustrates the concept that', choices: ['inquiry does not judge the reliability of sources', 'experiments without controls are not valid', 'scientific explanations are tentative and subject to change', 'advancements in technology usually make scientific theories invalid'], correct: 2, explanation: 'Science is self-correcting: new evidence (paternal mitochondrial inheritance cases) led scientists to revise a widely accepted explanation, demonstrating that scientific understanding is always open to revision when better evidence emerges.' },

{ id: 460, topic: TOPICS.CELL_BIOLOGY, context: 'An individual suffering from fatigue and muscle pain was found to have inherited a mutation in his mitochondrial DNA from his father.', text: 'The most likely explanation for why children who inherited mutated mitochondria suffer fatigue and muscle pain is that their mitochondria fail to', choices: ['provide the antigens needed to fight the mutated DNA', 'regulate the transport of nutrients to the muscle cells', 'synthesize the starch needed by the muscles', 'release enough energy for cells to function properly'], correct: 3, explanation: 'Mitochondria are the site of cellular respiration and ATP production; mutated mitochondria that malfunction produce insufficient ATP, causing energy-deficient cells — especially in energy-demanding muscles — to result in fatigue and pain.' },

{ id: 461, topic: TOPICS.EVOLUTION, context: 'In 2010, a rare hard freeze killed 40–90% of Burmese pythons in the Everglades. Because not all pythons died, the surviving population may differ genetically from the pre-2010 population.', text: 'Which statement best describes a likely cause for the changes that might exist in the present python population?', choices: ['The python species needed cold-tolerant genes, and they appeared in 2010 by rapid mutation.', 'The freeze event served as a selecting agent, and a higher percentage of the pythons existing today are cold-tolerant.', 'Many individual pythons were unable to reproduce during the freeze event and did not pass on their cold-tolerant genes.', 'There was no actual change in the population, and if a similar freeze event occurred again, 40–90% of the snakes would die.'], correct: 1, explanation: 'The hard freeze acted as a natural selecting agent, killing cold-sensitive individuals; the cold-tolerant pythons that survived reproduced, increasing the frequency of cold-tolerance genes in the current population — a clear example of natural selection.' },

{ id: 462, topic: TOPICS.EVOLUTION, context: 'Burmese pythons are an invasive species in Everglades National Park. In their native habitat they eat large animals infrequently; in Florida they feed on small mammals and birds and have established a large, expanding population.', text: 'The current large python population in Florida can be described as a species that', choices: ['will quickly die out because there are no appropriate food sources in their environment', 'will develop new digestive organs as needed to succeed in the Florida Everglades', 'has expanded only because small animals reproduce so quickly that they provide an unlimited food source', 'has already successfully adapted to an unfamiliar environment through natural selection'], correct: 3, explanation: 'The pythons thriving on small mammals and birds in the Everglades — a habitat very different from their native range — demonstrates that natural selection has already favored individuals able to succeed in this new environment, as evidenced by their large and growing population.' },

{ id: 463, topic: TOPICS.ECOLOGY, context: 'Fishers are forest-dwelling mammals with no natural enemies; primary causes of death are automobiles, trapping, logging, and road-building. The trapping season is currently 46 days.', text: 'Recently, new regulations have been adopted that affect the trapping of fishers. Which action would probably result in an increase in the fisher population?', choices: ['removing all regulations regarding fisher trapping', 'increasing the area where fisher trapping is allowed', 'changing the fisher trapping season from 46 to 30 days', 'decreasing the cost of the permit needed for fisher trapping'], correct: 2, explanation: 'Shortening the trapping season directly reduces the number of fishers killed by trapping each year, allowing more individuals to survive and reproduce, thereby increasing the population size.' },

{ id: 464, topic: TOPICS.ECOLOGY, context: 'Humans have disrupted fisher habitat through logging and road-building in the Adirondack ecosystem.', text: 'Humans have negatively affected the ecosystem that fishers occupy. An altered or changed ecosystem can', choices: ['never recover or become stable again', 'usually recover gradually to a point of long-term stability', 'never recover unless there is a decrease in biodiversity', 'usually recover quickly into the same ecosystem as it was previously'], correct: 1, explanation: 'Ecological succession allows disturbed ecosystems to recover over time through a gradual sequence of community changes that eventually leads to a stable, long-term state — though recovery is slow and the end state may differ from the original.' },

{ id: 465, topic: TOPICS.HUMAN_BODY, text: 'The human body maintains a balanced internal environment. In order to accomplish this,', choices: ['organelles work independently', 'all cells have the same shape and function', 'insulin is produced when protein levels are low', 'stimuli are detected, and actions are taken'], correct: 3, explanation: 'Homeostasis is maintained when the body detects stimuli (changes) and responds with corrective actions to restore balance.' },

{ id: 466, topic: TOPICS.ECOLOGY, text: 'Wolves are important predators in some ecosystems. If wolves are removed from their environment, the ecosystem is in danger of becoming unstable due to', choices: ['a reduction of autotrophs when the number of herbivores is not being kept in check by the wolves', 'a decrease in the number of herbivores because they will not be able to reach carrying capacity', 'an increase in the biodiversity of the remaining animal and plant species', 'some species of herbivores taking over the niche the wolves occupied'], correct: 0, explanation: 'Without wolves to control herbivore populations, herbivores overpopulate and overgraze, reducing the autotroph (plant) base of the ecosystem.' },

{ id: 467, topic: TOPICS.ECOLOGY, text: 'Which statement best explains how deforestation that is the result of forest fires can contribute to global warming?', choices: ['Burning the trees adds smoke to the atmosphere and blocks sunlight.', 'Burning the trees adds carbon dioxide to the atmosphere.', 'Deforestation removes trees that produce carbon dioxide through the process of photosynthesis.', 'Deforestation immediately increases ecosystem stability needed in the burned area.'], correct: 1, explanation: 'Burning trees releases the carbon stored in them as carbon dioxide, a greenhouse gas that drives global warming.' },

{ id: 468, topic: TOPICS.ECOLOGY, text: 'For centuries, humans have built dams along rivers to redirect water for power, irrigation, and transportation. Dams can prevent migrating fish from swimming upstream to reproduce and can also disrupt the flow of sediments and nutrients. Communities are starting to eliminate some dams, and the health of the river ecosystems is being restored. This best illustrates that', choices: ['technological advances often involve environmental trade-offs', 'when humans modify their environment it always has effects that cannot be reversed', 'industrialization has had a positive effect on the health of river ecosystems', 'the construction of dams affected abiotic factors in the river but not biotic factors'], correct: 0, explanation: 'Dams provide human benefits but harm ecosystems — and their removal restores ecosystems — demonstrating that technology involves environmental trade-offs.' },

{ id: 469, topic: TOPICS.CELL_BIOLOGY, text: 'In humans, lactose is broken down into glucose and galactose in the presence of a particular enzyme. It is most likely that the enzyme that breaks down lactose', choices: ['breaks down several other types of food in the stomach', 'is involved in other reactions when the temperature and pH are ideal', 'helps in the synthesis of complex sugars during autotrophic nutrition', 'is not involved in other types of reactions because enzymes are specific'], correct: 3, explanation: 'Enzymes are highly specific — their active site shape matches only one type of substrate, so the lactase enzyme acts only on lactose.' },

{ id: 470, topic: TOPICS.HUMAN_BODY, text: 'The Tdap vaccine can protect adolescents and adults from tetanus, diphtheria, and pertussis. Another vaccine, Td, protects against tetanus and diphtheria, but not pertussis. Td does not protect against pertussis because the', choices: ['Tdap vaccine is given to treat pertussis', 'Td vaccine does not contain the antibodies from pertussis to fight the bacteria', 'Tdap vaccine contains a small amount of the bacteria that causes pertussis', 'Td vaccine does not stimulate the immune system of people to recognize pertussis antigens'], correct: 3, explanation: 'Vaccines work by exposing the immune system to antigens so it can learn to recognize a pathogen; the Td vaccine lacks pertussis antigens, so no immunity is developed against it.' },

{ id: 471, topic: TOPICS.ECOLOGY, text: 'Pelagic red crabs living on the ocean floor have been found to eat small bits of plastic. When they are consumed, these small creatures are passing the plastics along the food chain to predators, including fish consumed by humans. This is of concern because it', choices: ['decreases plastic recycling by primary consumers', 'increases the risk of harmful substances in our food supply', 'decreases the producers in the ecosystem', 'increases the biodiversity of the ocean'], correct: 1, explanation: 'Plastics (and their associated toxins) bioaccumulate as they move up the food chain, ultimately reaching and contaminating the human food supply.' },

{ id: 472, topic: TOPICS.ECOLOGY, text: 'Duckweed is a small plant that grows on the surface of still bodies of water. Over a nine-week period, scientists monitored the growth of duckweed in three ditches on the same farm. The number of duckweed plants increased rapidly during weeks one and two. After two weeks, each ditch was completely covered and remained covered for the remaining seven weeks. A valid conclusion based on the data collected is that', choices: ['animals that eat duckweed have the greatest effect on duckweed population size', 'duckweed populations die off after completing a two-week life cycle in the ditch', 'only changes in temperature affect duckweed population size', 'the size of the duckweed population is kept stable by limited resources in the ditch'], correct: 3, explanation: 'Once the ditches were fully covered, growth stopped because the ditch\'s limited space and resources acted as a carrying capacity, stabilizing the population.' },

{ id: 473, topic: TOPICS.ECOLOGY, text: 'Which statement explains why the organisms in some ecosystems, such as rainforests, deserts, and oceans, are different from each other?', choices: ['The living organisms in each ecosystem have different needs and produce the physical conditions that they require.', 'Each ecosystem contains different types of living organisms that change each of the physical conditions present there.', 'They all have the same physical conditions present, but the living organisms use them in different ways.', 'Each ecosystem contains different physical conditions that determine the type of living organisms present there.'], correct: 3, explanation: 'Abiotic (physical) conditions such as temperature, moisture, and light differ between ecosystems and determine which organisms are adapted to live there.' },

{ id: 474, topic: TOPICS.PHOTOSYNTHESIS, text: 'Some green plants secrete acids that dissolve rock, which makes it possible for the plants to absorb phosphorus needed for healthy plant growth. In addition to phosphorus, plants require many other substances. Which substances are required for the production of carbohydrates in green plants?', choices: ['oxygen and nitrogen', 'carbon and glucose', 'carbon dioxide and water', 'hydrogen and starch'], correct: 2, explanation: 'Photosynthesis uses carbon dioxide and water as raw materials to produce carbohydrates (glucose), powered by light energy.' },

{ id: 475, topic: TOPICS.EVOLUTION, text: 'Which statement about competition in ecosystems is correct?', choices: ['Organisms compete most when they occupy different niches and resources are plentiful.', 'Individuals need not compete, because resources such as water and food are always plentiful in ecosystems.', 'Organisms that compete successfully will survive, reproduce, and pass their traits on to their offspring.', 'Competition usually results in the extinction of a species, ensuring the survival of other species.'], correct: 2, explanation: 'Natural selection acts through competition — organisms with advantageous traits survive and reproduce, passing those traits to the next generation.' },

{ id: 476, topic: TOPICS.HUMAN_BODY, text: 'Human body systems interact with each other. The results of one body system functioning normally include: muscle cells receive oxygen, nerve cells receive glucose, lungs get rid of carbon dioxide, and some gland cells send chemical signals to organs. Which body system most directly enables all these functions to occur?', choices: ['circulatory system', 'excretory system', 'digestive system', 'immune system'], correct: 0, explanation: 'The circulatory system transports oxygen, nutrients, carbon dioxide, and hormones throughout the body, making all of these functions possible.' },

{ id: 477, topic: TOPICS.GENETICS, text: 'The Himalayan rabbit lives in the cold Tibetan mountains. It typically has white fur on its body and black fur on its outer extremities. A scientist shaved a patch of white fur off the back of a Himalayan rabbit and applied an ice pack to the area for 30 minutes. The fur in the shaved area grew in black. The best explanation for why black fur grew in the shaved area is that', choices: ['the food the rabbit ate during the experiment influenced fur color', 'the fur in the newly shaved area was younger than the white fur on the rest of the body', 'the ice pack caused a mutation in the genes that regulate fur color', 'warm and cold temperatures activate different genes for fur color'], correct: 3, explanation: 'Environmental temperature influences gene expression in Himalayan rabbits — cooler temperatures activate the gene for dark pigment, demonstrating that genes can be differentially expressed based on environmental conditions.' },

{ id: 478, topic: TOPICS.GENETICS, text: 'Researchers have identified a mutually beneficial relationship between some plant species and specific fungi. The fungi increase the nutrient uptake for these plants, and the plants provide nutrition to the fungi. In order for this relationship to occur, the plant must produce a particular protein. Scientists hope to enable plants that normally do not interact with these fungi to obtain the benefits. In order to make this possible, which process would scientists most likely use?', choices: ['Treat the plants with chemical fertilizers to stimulate their growth.', 'Provide the fungi with the same molecular bases that are found in plant protein.', 'Identify the gene that codes for the protein and introduce it into plant cells by genetic engineering.', 'Selectively breed a new type of fungus that does not require the nutrients that the plants provide.'], correct: 2, explanation: 'Genetic engineering allows scientists to insert a specific gene from one organism into another, enabling the recipient plant to produce the protein needed to attract beneficial fungi.' },

{ id: 479, topic: TOPICS.EVOLUTION, text: 'Milkweeds are plants that produce toxic, bitter-tasting chemicals. Some insects have developed the ability to safely feed on milkweed and accumulate the toxin in their bodies, causing them to taste bitter to predators. As a result, most animals avoid eating these insects. A possible explanation for this relationship is that', choices: ['eating a toxic plant increases the ability of these insects to survive and reproduce', 'milkweed populations are controlled by many insects', 'the milkweed benefits from the insects that can tolerate the toxin they produce', 'eventually the insects will become immune to the toxin'], correct: 0, explanation: 'Insects with a heritable tolerance for milkweed toxin gain protection from predators, increasing their survival and reproductive success — a classic example of natural selection.' },

{ id: 480, topic: TOPICS.HUMAN_BODY, text: 'Which type of cell engulfs pathogens and marks them for killing?', choices: ['red blood cell', 'white blood cell', 'nerve cell', 'muscle cell'], correct: 1, explanation: 'White blood cells (leukocytes) are the immune system\'s primary defenders, engulfing and destroying pathogens through phagocytosis.' },

{ id: 481, topic: TOPICS.CELL_BIOLOGY, context: 'A diagram shows a hierarchy of biological organization with a box labeled X positioned between cells and organs.', text: 'A diagram shows a hierarchy of biological organization. Which choice correctly labels and defines the box labeled X in the hierarchy (between cells and organs)?', choices: ['cell: the basic structural, functional, and biological unit', 'organ: a group of tissues with a common function', 'tissue: a group of cells with a similar structure and function', 'organ system: a collection of organs with a common function'], correct: 2, explanation: 'In the hierarchy of organization, tissues (groups of similar cells working together) are the level between individual cells and organs.' },

{ id: 482, topic: TOPICS.ECOLOGY, context: 'A graph titled "Cumulative Vertebrate Species Extinction" shows the percentage of mammal, bird, and other vertebrate species that have gone extinct from 1500–2014. The percentage increases dramatically from 1850 to 2014, with mammals showing the steepest rise.', text: 'Concern is rising that mass extinctions of many species may increase. Based on the graph showing rising extinction rates from 1850 to 2014, this loss of different species is a concern because it may', choices: ['lead to an increase in diversity in the ecosystem', 'impact the energy flow and food supply within an ecosystem', 'produce increased nonrenewable resources', 'provide additional sources of potential medicines'], correct: 1, explanation: 'Species extinctions remove organisms from food webs, disrupting energy flow and potentially collapsing food supplies for organisms higher in the chain.' },

{ id: 483, topic: TOPICS.ECOLOGY, text: 'The American Museum of Natural History has an Ecosystem Sphere — a huge sealed glass globe assembled in 1999 with populations of algae, bacteria, and little shrimp sealed with water and air inside. It is kept in a well-lit area. Although the sphere has never been opened, groups of each kind of organism are still alive inside it. The most likely reason is because the populations have', choices: ['remained in separate areas of the sphere and do not interact', 'adapted so that they do not require food', 'a constant source of energy because they cannot recycle gases and materials', 'a constant source of energy and recycle gases and materials'], correct: 3, explanation: 'The sealed sphere functions as a self-sustaining ecosystem because light provides constant energy input and the organisms recycle gases and nutrients among themselves.' },

{ id: 484, topic: TOPICS.HUMAN_BODY, text: 'Ebola is a deadly viral disease. Researchers are testing a vaccine on people who have not yet been infected by Ebola but live in high-risk areas. The vaccine must be given to the subjects before exposure to Ebola because', choices: ['the vaccine will mutate the virus when a person gets infected', 'if a subject is infected with Ebola, it will destroy the vaccine', 'vaccines stimulate the subject\'s immune system to react to future exposure to the virus', 'vaccines are only effective for a few days, so the patient must get the vaccine before exposure'], correct: 2, explanation: 'Vaccines work by pre-exposing the immune system to antigens so it develops memory cells capable of mounting a rapid response upon real infection.' },

{ id: 485, topic: TOPICS.HUMAN_BODY, text: 'A relatively large number of antibodies in a blood sample would most likely indicate that there is', choices: ['an infection in the body', 'a mutation in the lung', 'a deficiency of carbon dioxide in the circulatory system', 'an insufficient amount of a specific vitamin in the diet'], correct: 0, explanation: 'Antibodies are produced by the immune system in response to antigens from pathogens, so elevated antibody levels indicate an active or recent infection.' },

{ id: 486, topic: TOPICS.GENETICS, text: 'Ultraviolet light can alter the DNA segments of genes in the skin cells of an individual. Which statement best describes a direct result of these alterations?', choices: ['Any cells produced from the altered skin cells will have the same alterations.', 'All the offspring of the individual will have the same skin cell alterations.', 'These alterations will spread to all the other cells in the body.', 'The sex cells of the individual will have the same alterations.'], correct: 0, explanation: 'When mutated skin cells divide by mitosis, they pass the altered DNA to all daughter cells, but somatic (body) cell mutations are not inherited by offspring.' },

{ id: 487, topic: TOPICS.CELL_BIOLOGY, text: 'The energy required to assemble proteins and fats is directly supplied to body cells from', choices: ['all the colors of visible light', 'molecules of ATP contained within the cells', 'all the DNA found in sex cells', 'molecules of carbon dioxide produced by chloroplasts'], correct: 1, explanation: 'ATP (adenosine triphosphate) is the universal energy currency of cells, directly powering biosynthetic reactions such as protein and fat assembly.' },

{ id: 488, topic: TOPICS.GENETICS, text: 'There are over 200 different cell types in the human body. Each type of cell is specialized to carry out a particular function, but they all developed from the same single cell. This is because each type of cell', choices: ['contains different genes than the other types of cells', 'destroys the genes found in the other types of cells', 'expresses some genes not expressed in the other cell types', 'lacks the genes found in the other cell types'], correct: 2, explanation: 'All cells contain the same DNA, but differentiation occurs because different cell types express different subsets of genes, producing distinct proteins and functions.' },

{ id: 489, topic: TOPICS.ECOLOGY, text: 'Coral reefs are vital components of marine ecosystems. Some coral reefs in the Pacific Ocean are heavily polluted with plastic objects that provide surfaces where disease-causing microbes are able to grow. If the amount of plastic present on coral reefs continues to increase, it is likely that the', choices: ['coral will adapt to the presence of the plastic and thrive', 'microbes will adapt to living directly on the coral', 'algae that live on the reef will begin to decompose the dying coral', 'species dependent on the coral will be negatively impacted'], correct: 3, explanation: 'Coral reefs support enormous biodiversity, so their degradation by disease-causing microbes on plastic would cascade negatively through all species that depend on the reef habitat.' },

{ id: 490, topic: TOPICS.CELL_BIOLOGY, text: 'Enzymes, antibodies, and receptor molecules all have different functions. However, they are alike in that they', choices: ['all are involved in cellular respiration', 'have a shape that is specific to their function', 'are classified as carbohydrates', 'are important in animals but not plants'], correct: 1, explanation: 'Enzymes, antibodies, and receptors are all proteins whose three-dimensional shape is precisely configured to interact with a specific molecule or antigen.' },

{ id: 491, topic: TOPICS.GENETICS, text: 'Australian quolls are endangered mammals. Scientists identified a gene that some quolls possess that makes them avoid eating poisonous cane toads. By selectively breeding quolls with the "toad-avoiding gene" with other quolls who lack the gene, scientists found all hybrid offspring inherited the survival gene. Before the survival gene could be passed on to any offspring, the genetic material present in the parent with the "toad-avoiding gene" would have to be', choices: ['mutated to become a different gene', 'accurately replicated', 'genetically engineered', 'changed through recombination'], correct: 1, explanation: 'DNA must be accurately replicated during gamete production so that the gene can be faithfully passed on to offspring.' },

{ id: 492, topic: TOPICS.REPRODUCTION, text: 'Scientists have cloned many animals, such as cows, sheep, and chickens, from a single cell. Which natural process is most similar to these cloning techniques?', choices: ['asexual reproduction', 'genetic recombination', 'chromosome mutations', 'gamete production'], correct: 0, explanation: 'Cloning produces genetically identical copies from a single cell, which mirrors asexual reproduction where offspring are genetically identical to the parent.' },

{ id: 493, topic: TOPICS.REPRODUCTION, text: 'Within a sexually reproducing species, the correct chromosome number is maintained by', choices: ['halving the chromosome number in gamete production, followed by fertilization', 'doubling the chromosome number in gamete production, followed by fertilization', 'halving the chromosome number during mitosis, followed by differentiation', 'doubling the chromosome number during mitosis, followed by differentiation'], correct: 0, explanation: 'Meiosis halves the chromosome number to produce haploid gametes, and fertilization restores the diploid number, ensuring chromosome number stays constant across generations.' },

{ id: 494, topic: TOPICS.EVOLUTION, text: 'The ability of sea otters to find food can be reduced because the environment where they search for food is often dark and murky. It has been recently discovered that the surface of otters\' paws are able to quickly detect a difference of one-quarter of a millimeter when comparing the size of objects, including food sources. The special characteristics of the otters\' paws can be described as', choices: ['a variation that eliminates the need for other senses otters normally possess', 'a variation that is unlikely to be passed on to offspring because it is not a genetic trait', 'an adaptation that could provide an advantage over the other organisms that they compete with for food', 'an adaptation that is most likely the result of a mutation in body cells of the ancestors of the otter'], correct: 2, explanation: 'The highly sensitive paws are a heritable adaptation that gives sea otters a competitive foraging advantage in low-visibility conditions, consistent with natural selection.' },

{ id: 495, topic: TOPICS.CELL_BIOLOGY, context: 'A graph titled "The Effect of Temperature on Catalase Activity" shows relative catalase activity rising from 0°C to a peak around 35°C, then dropping sharply above 35°C.', text: 'Catalase is an enzyme produced by organisms that breaks down hydrogen peroxide, releasing oxygen and water. Based on the graph showing catalase activity at different temperatures, which statement best explains the decrease in activity of catalase after 35°C?', choices: ['The structure of the enzyme changes, which slows down the reaction.', 'There is no hydrogen peroxide left for the activity to continue, so it stops.', 'The raw materials permanently bind to the catalase, preventing the reaction.', 'The reaction is no longer needed for survival of the individual.'], correct: 0, explanation: 'Above the optimal temperature, heat denatures the enzyme by altering its three-dimensional shape, so the active site no longer fits the substrate and activity drops.' },

{ id: 496, topic: TOPICS.CELL_BIOLOGY, context: 'A chart shows four cells (A, B, C, D) and which structures each contains. Cell A has: cell membrane, cell wall, chloroplasts, DNA, nucleus. Cell B has: cell membrane, DNA, nucleus. Cell C has: cell membrane, cell wall, DNA (no nucleus). Cell D has: cell membrane, DNA, nucleus.', text: 'Using a microscope, a student observed four different types of cells and recorded which structures were present (cell membrane, cell wall, chloroplasts, DNA, nucleus). Which of the cells he viewed were most likely from heterotrophs?', choices: ['A and C', 'B and D', 'C and B', 'D and C'], correct: 3, explanation: 'Heterotrophs lack chloroplasts (they cannot photosynthesize); Cells D and C have no chloroplasts — Cell C is prokaryotic (no nucleus) and Cell D is an animal-type cell — making D and C the heterotrophs.' },

{ id: 497, topic: TOPICS.PHOTOSYNTHESIS, context: 'A coleus plant leaf has chloroplast-rich (green) areas on the edges and chloroplast-lacking areas in the middle. After exposure to sunlight and addition of starch indicator, the green (chloroplast-rich) areas turned blue-black, while the non-green middle areas did not.', text: 'A student exposed a coleus leaf (with chloroplast-rich edges and chloroplast-lacking middle) to sunlight, then added starch indicator to the entire leaf. The edges turned blue-black; the middle did not. Which statement is a valid claim, supported by evidence from this experiment?', choices: ['Chloroplasts are necessary for the production of starch indicator.', 'Starch indicator causes leaves to produce oxygen.', 'Chloroplasts are necessary for the production of starch.', 'Water is necessary for the production of starch.'], correct: 2, explanation: 'Only the regions with chloroplasts produced starch (detected by the blue-black color change), directly demonstrating that chloroplasts are required for photosynthetic starch production.' },

{ id: 498, topic: TOPICS.HUMAN_BODY, text: 'Breathing vapors produced by e-cigarettes has caused respiratory problems, including coughing, shortness of breath, difficulty breathing, and even some deaths. Medical experts are warning the public and discouraging the use of these devices. The medical issues associated with vaping are an example of', choices: ['organ malfunctions caused by personal behaviors', 'feedback response maintaining homeostasis', 'inherited disorders resulting from inhaling vapors', 'the effects of infectious parasites carried by the vapors'], correct: 0, explanation: 'Vaping is a personal lifestyle choice (behavior) that directly damages the respiratory organs, illustrating how personal behaviors can cause organ malfunction.' },

{ id: 499, topic: TOPICS.ECOLOGY, context: 'A chart shows organisms and their energy sources: grasses (sunlight), leopard frog (insects, algae), carp (plants, insect larvae), heron (carp, frogs, salamanders), turtle (fish, plants, tadpoles, insects).', text: 'Based on the chart listing organisms and their energy sources in a New York ecosystem, when constructing an energy pyramid of this ecosystem, which of these organisms would be placed at the top of the pyramid?', choices: ['grasses', 'carp', 'heron', 'leopard frog'], correct: 2, explanation: 'The heron feeds on carp, frogs, and salamanders, placing it at the highest trophic level among the listed organisms, which is the apex of the energy pyramid.' },

{ id: 500, topic: TOPICS.ECOLOGY, context: 'A graph titled "Corn Yield as Affected by Planting Date" shows % of maximum yield on the y-axis vs. planting date on the x-axis. Yield is near 100% for plantings in late April/early May, then drops steadily, reaching approximately 80% of maximum by June 1.', text: 'An unusually cool and wet spring prevented certain farmers from planting corn at the usual time (May 1), delaying planting until June 1. Based on the graph of corn yield by planting date, what is the most likely impact of the delayed planting on the production of corn?', choices: ['Corn yield will remain at 100% because higher temperatures in June will make plants grow faster.', 'The corn yield may be reduced by about 20% because of the delay in planting.', 'Corn yield may be reduced by about 80% because of the delayed planting.', 'Crops planted on June 1 will have the same yield as those planted on April 1.'], correct: 1, explanation: 'The graph shows yield drops to approximately 80% of maximum by June 1, meaning a roughly 20% reduction compared to optimal planting in late April or early May.' },

{ id: 501, topic: TOPICS.ECOLOGY, context: 'A table titled "Beetle Biodiversity" shows the number of individuals of each species (A–E) in four habitats. Habitat W: C=32, D=54 (2 species). Habitat X: A=2, B=6, C=10, D=22, E=8 (5 species). Habitat Y: C=120 (1 species). Habitat Z: A=40, C=40, E=40 (3 species).', text: 'An ecologist counted the number of individuals of each beetle species (A–E) she observed in four different habitats. Based on the data table showing species counts per habitat, which of these habitats displays the most biodiversity of beetle species?', choices: ['Habitat W', 'Habitat X', 'Habitat Y', 'Habitat Z'], correct: 1, explanation: 'Habitat X contains all five species (A through E), giving it the greatest number of different species and therefore the highest biodiversity.' },

{ id: 502, topic: TOPICS.EVOLUTION, text: 'Hummingbirds, with their long beaks and tongues, are attracted to long, tubular flowers with a lot of nectar. When a hummingbird consumes the nectar from a flower, pollen sticks to the hummingbird and is transferred when the hummingbird feeds from other flowers. This relationship between the flowers and hummingbirds is a result of', choices: ['changes in hummingbirds and flowers in response to their needs', 'inheritance of characteristics acquired during their lifetime', 'natural selection of beneficial variations', 'the environment modifying gene expression'], correct: 2, explanation: 'The co-evolved traits of long tubular flowers and long-beaked hummingbirds arose because individuals with these heritable variations had greater reproductive success — a product of natural selection.' },

{ id: 503, topic: TOPICS.GENETICS, text: 'Kittens from the same litter all have different fur colors and patterns. One possible reason that they all have different fur colors and patterns is that', choices: ['different kittens inherited more chromosomes from one parent than the other', 'there was a random resorting of genes during gamete formation in each parent', 'because there were so many, they did not receive the same amount of nutrients from the mother', 'there were pH differences depending on where in the uterus each kitten developed'], correct: 1, explanation: 'During meiosis, the independent assortment and crossing-over of chromosomes randomly resorts genes into gametes, so each kitten inherits a unique combination of alleles for coat color and pattern.' },

{ id: 504, topic: TOPICS.ECOLOGY, context: 'A study placed heated panels on the Antarctic Ocean floor 50 feet below the surface. Panels were 1°C warmer, 2°C warmer, or unheated (control). Over 9 months, 1°C warming caused one invertebrate species to grow rapidly and become dominant, replacing multiple other species. Results on 2°C panels were less consistent.', text: 'Based on this experiment studying the effect of temperature increase on an Antarctic Ocean ecosystem, one result of the future warming of the Antarctic Ocean could be', choices: ['an increase in the stability of the Antarctic ecosystem', 'the disruption of existing Antarctic marine food webs', 'marine organisms evolving more rapidly in order to compete for resources', 'the need to import predators to eat the tiny invertebrates'], correct: 1, explanation: 'When one species dominates and replaces others due to warming, existing predator-prey and competitive relationships are disrupted, destabilizing marine food webs.' },

{ id: 505, topic: TOPICS.ECOLOGY, context: 'A study placed heated panels on the Antarctic Ocean floor 50 feet below the surface. Panels were 1°C warmer, 2°C warmer, or unheated (control). Over 9 months, 1°C warming caused one invertebrate species to grow rapidly and become dominant, replacing multiple other species. Results on 2°C panels were less consistent.', text: 'A possible explanation for the differences observed on the panels (control, +1°C, and +2°C) is that', choices: ['the growth of organisms is dependent on the abiotic factors present in the environment', 'on the warmer panels, organisms reached carrying capacity more rapidly and completely died out', 'on the control panels, wastes built up, poisoning some of the organisms growing there', 'on the warmer panels, there were fewer decomposers present to recycle available energy'], correct: 0, explanation: 'Temperature is an abiotic factor, and the different growth patterns on each panel type directly show that organism growth rates respond to abiotic environmental conditions.' },

{ id: 506, topic: TOPICS.ECOLOGY, context: 'A study placed heated panels on the Antarctic Ocean floor 50 feet below the surface. Panels were 1°C warmer, 2°C warmer, or unheated (control). Over 9 months, 1°C warming caused one invertebrate species to grow rapidly and become dominant, replacing multiple other species. Results on 2°C panels were less consistent.', text: 'These test panels provided scientists with information about', choices: ['how ecological niches influence the rate of mutation', 'the effect of environmental change on the biodiversity of the Antarctic Ocean', 'the variety of producer/consumer relationships in the Antarctic Ocean', 'how the stability of an ecosystem is affected by competition and disease'], correct: 1, explanation: 'By comparing species composition on heated vs. control panels, scientists directly gathered data on how a temperature shift (environmental change) alters the variety of species (biodiversity) present.' },

{ id: 507, topic: TOPICS.ECOLOGY, context: 'The kakapo is a small, flightless parrot with a small population on four islands off New Zealand. When food is scarce, sons are weak and unable to compete for mates; when food is plentiful, sons may be healthy, strong, and able to mate with many females.', text: 'Scientists are concerned the kakapo may become extinct. They observed that when food is plentiful, more male offspring survive. If scientists were going to test this hypothesis, the best way would be to select a test group and develop a research plan that includes collecting data when', choices: ['all of the kakapos are fed a reduced amount of food', 'all of the kakapos are fed an unlimited amount of food', 'the kakapo test group is divided in half, and one-half is fed unlimited food and the other a reduced amount of food', 'the entire test group of kakapos is fed one type of food for one month and a different type of food for the second month'], correct: 2, explanation: 'A valid experiment requires a control and experimental group — dividing the group so half receive unlimited food and half receive reduced food allows a direct comparison to test whether food abundance affects male offspring survival.' },

{ id: 508, topic: TOPICS.HUMAN_BODY, text: 'Which two body systems provide humans with the raw materials necessary for their cells to release energy?', choices: ['muscular and skeletal', 'endocrine and nervous', 'digestive and respiratory', 'reproductive and circulatory'], correct: 2, explanation: 'Cellular respiration requires glucose (supplied by the digestive system) and oxygen (supplied by the respiratory system), making these two systems the raw-material providers for energy release.' },

{ id: 509, topic: TOPICS.HUMAN_BODY, text: 'An example of an activity that best contributes to maintaining homeostasis in an organism is a', choices: ['bear eating fish from a polluted stream', 'deer losing its fur at the start of winter', 'person not sweating on a 100°F day', 'response to a chickenpox vaccination'], correct: 3, explanation: 'A vaccination triggers the immune system to produce antibodies and memory cells, which is a regulated internal response that maintains the body\'s ability to defend itself — a classic example of homeostasis.' },

{ id: 510, topic: TOPICS.GENETICS, text: 'Equine cloning can be used to produce performance horses. Although the horses are clones of each other, they may still exhibit slight differences in appearance. The differences in the physical characteristics of the cloned horses are most likely the result of', choices: ['environmental influences', 'natural selection', 'sexual reproduction', 'changes in gametes'], correct: 0, explanation: 'Clones share identical DNA, so any physical differences must stem from environmental factors (such as diet, temperature, or exercise) that affect how genes are expressed.' },

{ id: 511, topic: TOPICS.ECOLOGY, text: 'Which situation is an example of an organism responding to an abiotic factor?', choices: ['Plants in a forest grow toward areas where there is more sunlight available.', 'Rabbits attract mates by performing a mating dance.', 'Woodpeckers peck holes in the trunks of trees to find insects for food.', 'Deer eat tree bark in winter when other food is scarce.'], correct: 0, explanation: 'Sunlight is a nonliving (abiotic) factor, and plants growing toward it (phototropism) is a direct response to that physical environmental condition.' },

{ id: 512, topic: TOPICS.GENETICS, text: 'CRISPR/Cas9 is a powerful system that bacteria use to cut and remove DNA from invading viruses. Using CRISPR/Cas9, researchers have successfully corrected a disease-causing mutation for muscular dystrophy in laboratory mice. Correcting the harmful mutation using CRISPR/Cas9 is an example of', choices: ['biological evolution', 'cloning techniques', 'genetic engineering', 'selective breeding'], correct: 2, explanation: 'Genetic engineering involves deliberately altering an organism\'s DNA, and using CRISPR/Cas9 to correct a specific disease-causing mutation is precisely that process.' },

{ id: 513, topic: TOPICS.ECOLOGY, text: 'Many animal populations living in a particular area would most likely', choices: ['occupy the same niche', 'have similar physical requirements', 'eat the same food', 'require an input of solar energy'], correct: 1, explanation: 'Animals in the same area share the same physical environment and therefore have similar basic physical requirements such as temperature range and water availability, even if they occupy different niches.' },

{ id: 514, topic: TOPICS.CELL_BIOLOGY, text: 'Cells possess structures that perform specific jobs. Which statement correctly pairs a cell structure with a function it performs in the cells?', choices: ['The cell membrane synthesizes proteins for cell processes.', 'The mitochondria provide energy for cell processes.', 'Ribosomes regulate which materials enter and leave the cell.', 'Vacuoles transfer genetic information from one cell to another.'], correct: 1, explanation: 'Mitochondria carry out cellular respiration, producing ATP that powers all cell processes, making them the energy-providing organelles of the cell.' },

{ id: 515, topic: TOPICS.EVOLUTION, text: 'The endangered Everglade snail kite usually feeds on small snails. Conservationists feared the snail kite would decline when the Everglades was invaded by a species of larger snail that the birds had historically struggled to eat. But the snail kite population increased over several years, and the snail kites now have larger beaks and bodies. This change in the snail kite can best be explained by', choices: ['selective breeding with larger kites', 'natural selection after an environmental change', 'genetic engineering to modify specific genes', 'ecological succession due to random mutation'], correct: 1, explanation: 'The arrival of larger snails created new selection pressure; birds with naturally larger beaks and bodies could exploit this new food source, survive, and reproduce — classic natural selection following an environmental change.' },

{ id: 516, topic: TOPICS.CELL_BIOLOGY, text: 'Scientists turned a specialized stomach cell from a mouse into a skin cell by activating a specific gene responsible for the production of skin cells. Which claim can be made, based on this evidence?', choices: ['Stomach cells have the genetic information to form other types of cells.', 'Skin and stomach cells produce identical proteins.', 'Stomach cells receive half their genetic information from each parent.', 'Skin and stomach cells have completely different genes.'], correct: 0, explanation: 'Because a stomach cell could be reprogrammed into a skin cell by switching on a gene, it must already contain all the genetic information necessary to form other cell types — confirming that differentiated cells retain the full genome.' },

{ id: 517, topic: TOPICS.GENETICS, text: 'New York State is home to animals such as the Eastern chipmunk. Individuals within this species are not genetically identical. This variability is primarily the result of', choices: ['asexual reproduction and mutation', 'mitosis and selective breeding', 'meiosis and recombination', 'sexual reproduction and cloning'], correct: 2, explanation: 'Meiosis shuffles genetic information through independent assortment and crossing-over (recombination), generating the unique gene combinations responsible for genetic variation among sexually reproducing individuals.' },

{ id: 518, topic: TOPICS.ECOLOGY, text: 'Zebra mussels are aquatic animals not native to North America. When they first appeared, their populations increased rapidly. Lately, it has been observed that the rate of population growth of the zebra mussels has decreased. A reason for this decrease may be', choices: ['resources needed for the continued growth of their population are limited', 'competition between zebra mussels for limited resources has decreased', 'the food available for zebra mussels has decreased, reducing their rate of photosynthesis', 'a lack of natural predators and disease-causing organisms in their new environment'], correct: 0, explanation: 'As any population grows, it eventually encounters the limits of its environment\'s carrying capacity, so limited resources such as food and space cause the growth rate to slow.' },

{ id: 519, topic: TOPICS.ECOLOGY, context: 'A food web diagram shows: Grasses → Insects → Roadrunners → Coyotes; Grasses → Rodents → Coyotes; Bushes → Rodents; Insects → Lizards → Roadrunners → Coyotes.', text: 'Based on the food web showing coyotes, rodents, insects, roadrunners, lizards, bushes, and grasses, which statement best describes a relationship represented in the diagram?', choices: ['Bushes are herbivores that feed on insects.', 'Rodents are consumers that feed on lizards.', 'Roadrunners are carnivores that feed on insects.', 'Grasses are producers that are eaten by lizards.'], correct: 2, explanation: 'The food web shows insects as prey for roadrunners, and because roadrunners eat other animals (insects), they are correctly classified as carnivores.' },

{ id: 520, topic: TOPICS.CELL_BIOLOGY, text: 'Cell membranes inside the cells that line the stomach pump hydrogen ions from areas of low concentration inside the cells to areas of higher concentration outside the cells. Which activity produces the ATP that makes this pumping possible?', choices: ['cellular respiration', 'active transport', 'carbohydrate digestion', 'enzyme synthesis'], correct: 0, explanation: 'Cellular respiration (occurring in the mitochondria) is the process that produces ATP, which is the energy currency required to drive active transport against a concentration gradient.' },

{ id: 521, topic: TOPICS.EVOLUTION, text: 'If scientists wanted to study the physical characteristics of an extinct animal that once lived in a specific area, the best source of information would be to investigate', choices: ['plants living in habitats similar to those of long ago', 'the producer organisms living in that area at the current time', 'the animals that live in that area today', 'the fossil record of that area'], correct: 3, explanation: 'Fossils are the preserved remains or traces of organisms that lived in the past and are the most direct evidence of the physical characteristics of extinct species.' },

{ id: 522, topic: TOPICS.GENETICS, text: 'Tasmanian devil numbers were greatly reduced after two forms of contagious cancer appeared in the population. Scientists have found an effective cancer vaccine that has saved a number of adult Tasmanian devils. The beneficial effect of the vaccine will not be passed on to the Tasmanian devils\' offspring because the', choices: ['vaccine contained only a small amount of the cancer', 'cancer can mutate, and the vaccine would then be ineffective', 'cancer caused the body of the adults to produce antigens against it', 'vaccine did not produce a change in the sex cells of the adults'], correct: 3, explanation: 'Only changes to the DNA in sex cells (gametes) can be inherited; because the vaccine affected somatic (body) cells but not the germ line, the immunity cannot be passed to offspring.' },

{ id: 523, topic: TOPICS.REPRODUCTION, text: 'Usually, snakes reproduce sexually. However, some female copperhead snakes sometimes produce offspring asexually without sperm from a male. Compared with snakes formed by sexual reproduction, the offspring of these asexually reproducing snakes', choices: ['have more genetic variation', 'have limited genetic variation', 'contain more DNA than the parent', 'grow larger than the parent'], correct: 1, explanation: 'Asexual reproduction produces offspring that are genetically identical (or nearly so) to the parent, resulting in far less genetic variation than sexual reproduction, which combines genes from two parents.' },

{ id: 524, topic: TOPICS.GENETICS, text: 'The brown anole is native to Cuba and the Bahamas. Males and females share most of the same genes and are the same size when they hatch. However, during the first year, the males grow to be three times larger than the females. The most likely explanation for the differences in size between male and female anoles is that', choices: ['male organisms are always larger than the female members of a species', 'the males developed for a longer period of time', 'the females mutated during hatching, reducing their ability to grow', 'hormones can affect gene expression'], correct: 3, explanation: 'Despite having essentially the same genes, males and females produce different hormones that regulate which genes are expressed and to what degree, explaining the dramatic size difference.' },

{ id: 525, topic: TOPICS.HUMAN_BODY, text: 'Myasthenia gravis is an autoimmune disease characterized by weakness of the skeletal muscles. It occurs when normal communication between nerve and muscle cells is interrupted. The weakness is likely due to', choices: ['the lack of ATP in the muscle caused by a decrease of available carbon dioxide', 'the brain failing to send the proper hormone signal to vacuoles within muscle cells', 'the failure of receptor molecules on the muscle to receive the chemical produced by nerve cells', 'the ribosomes in the muscle cells failing to produce enough sugar for muscle contraction'], correct: 2, explanation: 'Nerve-muscle communication depends on neurotransmitters binding to receptor proteins on muscle cells; if the autoimmune attack destroys these receptors, the chemical signal cannot be received and muscles cannot contract.' },

{ id: 526, topic: TOPICS.GENETICS, text: 'The removal of a short sequence of bases from a gene would most directly affect the', choices: ['diffusion of materials into a cell', 'shape of a protein molecule', 'pH of the cytoplasm', 'size of a cell\'s nucleus'], correct: 1, explanation: 'A gene\'s base sequence codes for the amino acid sequence of a protein; deleting bases alters this code (a frameshift or deletion mutation), changing the amino acid sequence and therefore the three-dimensional shape of the resulting protein.' },

{ id: 527, topic: TOPICS.ECOLOGY, text: 'As energy moves through a forest ecosystem, it flows from', choices: ['heterotrophs to autotrophs', 'animals to plants', 'herbivores to carnivores', 'carnivores to autotrophs'], correct: 2, explanation: 'In a food chain, energy flows from producers to primary consumers (herbivores) and then to secondary consumers (carnivores), so energy moves from herbivores to carnivores.' },

{ id: 528, topic: TOPICS.GENETICS, text: 'Each winter in the Adirondack Mountains, some of the salt applied to roadways gets washed into lakes. The increase in salt levels in areas where frogs breed has resulted in more male frogs hatching than females. This is an example of', choices: ['asexual reproduction of male frogs', 'an abiotic factor affecting gene expression', 'the normal expression of a gene for female frogs', 'loss of genetic information for male frogs'], correct: 1, explanation: 'Salt is a nonliving (abiotic) environmental factor, and its presence alters which sex-determining genes are expressed during development, shifting the sex ratio of offspring.' },

{ id: 529, topic: TOPICS.HUMAN_BODY, text: 'Which substances usually stimulate an immune response?', choices: ['antibodies', 'antigens', 'carbon dioxide molecules', 'biological catalysts'], correct: 1, explanation: 'Antigens are foreign molecules (typically proteins on the surface of pathogens) that the immune system recognizes as non-self and responds to by producing antibodies.' },

{ id: 530, topic: TOPICS.EVOLUTION, text: 'A certain species of rough-skinned newt produces an extremely powerful toxin that helps prevent attacks by predators. However, one predator, the garter snake, can eat these newts without being affected by the toxin. Which statement best explains the resistance of garter snakes to the newt toxin?', choices: ['The snakes needed to become resistant to the toxin in order to survive, so they developed a toxin-resistance gene.', 'As the newts became more toxic, the snakes became increasingly resistant in order to survive.', 'Exposure to newt toxin caused a mutation in the snakes, which increased resistance to the toxin in the snakes.', 'A random genetic mutation that resulted in toxin resistance increased the survival rates of the snakes that had it, and they passed it on to their offspring.'], correct: 3, explanation: 'Natural selection explains this: a random mutation conferring toxin resistance allowed those snakes to survive and reproduce while others died, so the resistance trait spread through the population over generations.' },

{ id: 531, topic: TOPICS.CELL_BIOLOGY, text: 'A podocyte is a highly specialized cell that produces special proteins for filtering fluid in the human kidney. The specialized function of this cell is most dependent on', choices: ['mutations that produce cells that have a specific shape for filtering the blood', 'the differentiation of the cell membrane and the functioning of vacuoles', 'the DNA codes in the cell and the activity of ribosomes', 'mitochondria in the cell that produce filtering organelles for the kidney'], correct: 2, explanation: 'A cell\'s specialized function is determined by which genes in its DNA are expressed; ribosomes then translate those genes into the specific proteins the cell needs, making DNA and ribosomes central to cell specialization.' },

{ id: 532, topic: TOPICS.ECOLOGY, text: 'Maintaining stability in an ecosystem most likely depends on', choices: ['a high level of diversity and few resources', 'little diversity and rapid ecological succession', 'a high level of diversity and multiple ecological niches', 'little diversity and multiple extinctions'], correct: 2, explanation: 'High biodiversity with many different ecological niches creates a web of interactions that buffers the ecosystem against disturbances, making it more resilient and stable.' },

{ id: 533, topic: TOPICS.PHOTOSYNTHESIS, text: 'Photosynthesis and cellular respiration both involve the gases carbon dioxide and oxygen. Which statement best identifies how these gases are involved in the two processes?', choices: ['Photosynthesis and cellular respiration both use carbon dioxide and release oxygen.', 'Cellular respiration uses oxygen and releases carbon dioxide, while photosynthesis uses carbon dioxide and releases oxygen.', 'Cellular respiration uses carbon dioxide and releases oxygen, while photosynthesis uses oxygen and releases carbon dioxide.', 'Photosynthesis and cellular respiration both use oxygen and release carbon dioxide.'], correct: 1, explanation: 'Cellular respiration breaks down glucose using oxygen and releases carbon dioxide as a byproduct, while photosynthesis does the opposite — taking in carbon dioxide and releasing oxygen.' },

{ id: 534, topic: TOPICS.HUMAN_BODY, text: 'Antibodies produced against one pathogen infecting the human body may not work against a different pathogen because antibodies are', choices: ['only produced once in the body so they can\'t work on any other infection', 'unable to produce effective antibiotics against the infection', 'made of DNA the second pathogen doesn\'t contain', 'specific for the shape of the proteins present on a particular pathogen'], correct: 3, explanation: 'Antibody-antigen binding is based on complementary molecular shapes (lock-and-key specificity), so an antibody shaped to fit one pathogen\'s surface proteins will not fit the differently shaped proteins of a different pathogen.' },

{ id: 535, topic: TOPICS.CELL_BIOLOGY, text: 'A multicellular organism has cells that perform various roles in that organism. This is most likely due to the', choices: ['differentiation of cells during embryonic development', 'specialization of gametes', 'cloning of cells during embryonic development', 'specialization of zygotes'], correct: 0, explanation: 'Cell differentiation is the process by which embryonic cells activate different subsets of their genes during development, causing them to become specialized cell types with distinct structures and functions.' },

{ id: 536, topic: TOPICS.HUMAN_BODY, context: 'A diagram shows guard cells of a plant opening leaf pores when the sun is shining and water is plentiful, and closing leaf pores when the sun is shining but little water is available.', text: 'Based on the diagram showing guard cells opening or closing leaf pores depending on available water, the changes in the guard cells\' activity illustrate', choices: ['an immune response intended to limit water use', 'passive transport in response to the Sun shining', 'a feedback mechanism to control water loss', 'genetic manipulation caused by the presence or absence of water'], correct: 2, explanation: 'When water is scarce, guard cells detect the deficit and close the stomata to reduce transpiration — a negative feedback loop that regulates water loss and maintains homeostasis.' },

{ id: 537, topic: TOPICS.EVOLUTION, text: 'Today\'s whales and alligators both have pelvic and hind leg bones, yet these bones only function in alligators. This similarity between whales and alligators supports the idea that', choices: ['whales evolved from alligators', 'alligators evolved from whales', 'alligators and whales share a common ancestor', 'alligators and whales share the same genetic mutations'], correct: 2, explanation: 'Vestigial structures (like the non-functional pelvic bones in whales) that are homologous to functional structures in related animals are evidence that both groups descended from a common ancestor that used those bones.' },

{ id: 538, topic: TOPICS.ECOLOGY, context: 'As fish grow, body mass increases and so does oxygen demand. However, gills do not increase in size at the same rate as the body. As ocean waters become warmer, there is less dissolved oxygen in the water, and the average size of many fish species becomes smaller.', text: 'The most likely reason decreased levels of oxygen in the water result in a decrease in the body size of some fish species is', choices: ['due to the presence of more plant species carrying out photosynthesis', 'the species producing more ATP molecules and less oxygen', 'due to an increase in the size of the gills bringing in more carbon dioxide', 'the species being unable to meet the energy requirements of a larger body size'], correct: 3, explanation: 'Because gill size does not keep pace with body growth and less dissolved oxygen is available, larger fish cannot extract enough oxygen to generate the ATP required to maintain a bigger body, so smaller body sizes are selected for.' },

{ id: 539, topic: TOPICS.ECOLOGY, context: 'As ocean waters become warmer, there is less dissolved oxygen in the water. Warmer ocean temperatures are linked to increased carbon dioxide in the atmosphere.', text: 'One human activity that most directly contributes to the decrease in the amount of oxygen present in ocean water is', choices: ['overfishing, causing a lack of biodiversity', 'planting more trees, causing more soil erosion', 'introducing foreign species, causing more competition', 'industrialization, which releases large amounts of carbon dioxide into the atmosphere'], correct: 3, explanation: 'Burning fossil fuels during industrialization releases CO₂, which warms the atmosphere and oceans; warmer water holds less dissolved oxygen, reducing ocean oxygen levels.' },

{ id: 540, topic: TOPICS.REPRODUCTION, context: 'A graph titled "Female Reproductive Hormone Interaction" shows hormone levels in blood over 28 days. Estrogen rises and peaks around day 14 (when egg is released), then falls. Progesterone is low until day 14, then rises and remains elevated as egg moves to uterus before falling near day 28.', text: 'Based on the graph showing interactions of estrogen and progesterone levels over the reproductive cycle, which statement is correct regarding the interaction of the levels of estrogen and progesterone?', choices: ['When the amounts of estrogen and progesterone are at the same level, an egg begins to develop in the ovary.', 'When an egg is released from the ovary, the level of estrogen is higher than the level of progesterone.', 'The level of progesterone controls the cycle since it is always higher than the level of estrogen.', 'After an egg is released from the ovary, the level of estrogen keeps increasing, causing the level of progesterone to decrease.'], correct: 1, explanation: 'The graph shows estrogen peaking around ovulation (day 14) while progesterone is still low, so at the moment of egg release estrogen is the dominant hormone.' },

{ id: 541, topic: TOPICS.REPRODUCTION, context: 'A scatter plot titled "Male Fitness" shows data for male juncos. The x-axis shows % of Male Chemical (0–7%), and the y-axis shows Number of Offspring (0–8). The data points show a positive trend: males with higher percentages of male chemical tend to produce more offspring.', text: 'Scientists hypothesized that female birds use their sense of smell to gather information about the fitness of their potential mates. Based on the data relating % of male chemical to number of offspring produced, which conclusion is most valid?', choices: ['Male juncos with a higher percentage of the male chemical have greater reproductive success.', 'Male juncos with a lower percentage of the male chemical have greater reproductive success.', 'The percentage of the male chemical has no effect on the reproductive success of the male juncos.', 'There is a negative relationship between the percentage of male chemical produced and the reproductive success of the male juncos.'], correct: 0, explanation: 'The scatter plot shows a positive trend between the percentage of male chemical and number of offspring, indicating that males with higher concentrations of the chemical sire more offspring and thus have greater reproductive success.' },

{ id: 542, topic: TOPICS.ECOLOGY, text: 'Pikas are small mammals found in the grassland ecosystems of the Tibetan plateau. They are prey for many predators, have large burrow systems that help drain groundwater, and their burrows serve as nesting sites for numerous bird species. If the pika populations are completely removed from the grasslands of the Tibetan plateau, the most likely result will be that the grassland ecosystems will become', choices: ['unstable, because predators will have fewer prey, the birds will have fewer nesting sites, and groundwater supplies will be disrupted', 'more stable, because the pikas will be replaced by other species, the birds will adapt to nesting above ground, and the soil will become more fertile', 'unstable, because predators will migrate to nearby ecosystems, birds will nest in nearby trees, and other small animals will make burrows', 'more stable, because the pikas will no longer be eating the grasses, the birds will migrate to other ecosystems, and small lakes will form because water will not drain without pika burrows'], correct: 0, explanation: 'Pikas play multiple keystone roles (as prey, drainage engineers, and nesting providers), so their removal disrupts the food web, bird habitat, and groundwater drainage simultaneously, destabilizing the ecosystem.' },

{ id: 543, topic: TOPICS.EVOLUTION, text: 'Jean-Baptiste Lamarck proposed the idea that modern-day organisms developed new characteristics through the inheritance of acquired traits. As more evidence became available, this theory was eventually replaced by Charles Darwin\'s theory of evolution. This modification of scientific knowledge illustrates that', choices: ['scientists do not communicate with each other and often make mistakes', 'all scientific explanations are tentative and subject to change or improvement', 'scientists often ignore evidence that does not help prove their theory', 'hypotheses seldom change even when new discoveries are made'], correct: 1, explanation: 'Science is a self-correcting process; when new evidence contradicts an existing explanation, the scientific community revises or replaces it, showing that scientific knowledge is always subject to change.' },

{ id: 544, topic: TOPICS.HUMAN_BODY, context: 'A diagram shows digestive enzymes produced by the human pancreas: Lipase (digests fats), Nucleases (digest nucleic acids), Chymotrypsin/Carboxypeptidase/Trypsin (digest proteins), and Amylase (digests carbohydrates).', text: 'Based on the diagram of digestive enzymes produced by the pancreas, the activity of nuclease enzymes would most likely result in the release of', choices: ['four different kinds of molecular bases', 'glucose', 'a variety of different amino acids', 'hormones'], correct: 0, explanation: 'Nucleases digest nucleic acids (DNA and RNA), breaking them down into their component nucleotides and ultimately releasing the four nitrogenous bases (adenine, thymine/uracil, guanine, cytosine).' },

{ id: 545, topic: TOPICS.HUMAN_BODY, context: 'A diagram shows digestive enzymes produced by the human pancreas: Lipase (digests fats), Nucleases (digest nucleic acids), Chymotrypsin/Carboxypeptidase/Trypsin (digest proteins), and Amylase (digests carbohydrates).', text: 'The end products resulting from the action of amylase would most likely be', choices: ['starches and proteins', 'carbon dioxide and water', 'amino acids', 'simple sugars'], correct: 3, explanation: 'Amylase is a carbohydrate-digesting enzyme that breaks down starch (a polysaccharide) into simple sugars such as maltose and glucose.' },

{ id: 546, topic: TOPICS.HUMAN_BODY, text: 'Another important molecule not shown in the pancreatic enzyme diagram is also produced by the pancreas. It functions to decrease glucose levels in the blood. This molecule is', choices: ['progesterone', 'insulin', 'testosterone', 'ATP'], correct: 1, explanation: 'Insulin is the hormone secreted by the pancreas that signals cells to take up glucose from the blood, thereby lowering blood glucose levels as part of the body\'s homeostatic regulation.' },

{ id: 547, topic: TOPICS.REPRODUCTION, context: 'A diagram titled "Spermatogenesis" shows a diploid germ cell undergoing meiotic division to produce four sperm cells.', text: 'Based on the diagram of spermatogenesis, the process of meiotic division in human males produces four sperm cells, each with', choices: ['all of the genetic information contained in the diploid germ cell', 'one-quarter of the genetic information contained in the diploid germ cell', 'twice the genetic information found in the diploid germ cell', 'one-half of the genetic information found in the diploid germ cell'], correct: 3, explanation: 'Meiosis halves the chromosome number, so each of the four resulting sperm cells is haploid and contains exactly half the genetic information of the original diploid germ cell.' },

{ id: 548, topic: TOPICS.CELL_BIOLOGY, text: 'A student viewed a slide of an onion root tip with a compound light microscope. In order to observe whether or not this root tip was growing, the student should', choices: ['switch to a higher magnification and look for evidence of cell division', 'switch to a lower magnification and look for evidence of cell division', 'switch to a lower magnification and add a stain to the onion root tip cells', 'switch to a higher magnification and add salt solution to the onion root tip cells'], correct: 0, explanation: 'Growth in a root tip occurs through mitotic cell division; switching to higher magnification allows the student to see individual cells undergoing division (e.g., cells with visible chromosomes), which is evidence of growth.' },

{ id: 549, topic: TOPICS.CELL_BIOLOGY, text: 'Which statement is an example of a hypothesis that can be tested through experimentation?', choices: ['The number of times a dog wags its tail is a direct measure of how happy the dog is.', 'Is the ability of a fish to taste food affected by how clear the water is where it lives?', 'A plant\'s fear of herbivores increases as the plant grows older.', 'Bacterial growth will rapidly increase as the temperature increases.'], correct: 3, explanation: 'A testable hypothesis must be a falsifiable statement with a measurable independent variable (temperature) and a measurable dependent variable (bacterial growth rate), which makes "bacterial growth will rapidly increase as the temperature increases" the only experimentally testable choice.' },

{ id: 550, topic: TOPICS.ECOLOGY, text: 'Deforestation is a major cause of soil loss. Without trees and other plants to hold the soil in place, it either washes or blows away. Governments and international organizations are working to decrease the rate of deforestation. In addition to slowing the rate of soil loss, another potential benefit of this action would be', choices: ['a decrease in atmospheric carbon dioxide levels', 'more land available for agriculture', 'a decrease in the amount of firewood for heating', 'more locations for the construction of new homes'], correct: 0, explanation: 'Trees absorb CO₂ during photosynthesis; preserving forests (reducing deforestation) means more trees continue removing carbon dioxide from the atmosphere, helping to lower atmospheric CO₂ levels.' },

]

export function getByTopic(topic) {
  return questions.filter((q) => q.topic === topic)
}

export function getContextual() {
  return questions.filter((q) => q.context)
}

export const LAB_TYPES = {
  experimental: 'Experimental Design',
  graphing:     'Graph Reading',
  microscopy:   'Microscopy',
  dissection:   'Dissection',
  data:         'Data Analysis',
}

export function getLabQuestions(labType) {
  if (labType) return questions.filter((q) => q.labType === labType)
  return questions.filter((q) => q.labType)
}

export function shuffled(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

export const QUESTIONS_PER_DIAGNOSTIC_TOPIC = 3

export function buildDiagnosticSet() {
  return Object.values(TOPICS).flatMap((topic) =>
    shuffled(getByTopic(topic)).slice(0, QUESTIONS_PER_DIAGNOSTIC_TOPIC)
  )
}
