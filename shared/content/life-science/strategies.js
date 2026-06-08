export const STRATEGIES = {
  'life-science-u1': { // Cells & Cell Processes
    mentalPrep: [
      'Recall the two main cell types: prokaryotic (no nucleus) and eukaryotic (has nucleus, organelles).',
      'Remember the key organelles by function: mitochondria = energy (ATP); chloroplast = photosynthesis; ribosome = protein synthesis; nucleus = DNA storage.',
      'Know the three transport types: passive (diffusion, osmosis — no energy), active transport (energy required), bulk transport (endo/exocytosis).',
    ],
    answeringTechniques: [
      'For osmosis questions, compare solute concentrations: water moves toward the higher solute (lower water) side.',
      'Hypertonic solution = high solute outside → cell shrinks. Hypotonic solution = low solute outside → cell swells.',
    ],
    guessingStrategy: [
      'If asked about ATP production, the answer almost always involves mitochondria (or chloroplasts for photosynthesis).',
      'Cell wall is found in plants, fungi, and bacteria — NOT in animal cells.',
    ],
    processOfElimination: [
      'Eliminate any organelle option that does not match the described function.',
      'If a question mentions "no energy required," cross off active transport immediately.',
    ],
    timeManagement: [
      'Organelle function questions are quick — answer them early.',
      'Reserve extra time for multi-step diffusion/osmosis calculations.',
    ],
  },

  'life-science-u2': { // Genetics & Heredity
    mentalPrep: [
      'Review base-pairing rules: A-T and G-C in DNA; A-U and G-C in RNA.',
      'Know the difference between genotype (alleles) and phenotype (expressed trait).',
      'Punnett squares follow simple probability — set up the grid carefully before filling it in.',
    ],
    answeringTechniques: [
      'For Punnett square crosses, write parent gametes across the top and side before filling in offspring.',
      'A 3:1 phenotype ratio indicates a monohybrid cross between two heterozygous parents.',
    ],
    guessingStrategy: [
      'If the question says "carrier," the organism is heterozygous for a recessive trait.',
      'Sex-linked recessive traits appear more often in males (XY) because they have only one X chromosome.',
    ],
    processOfElimination: [
      'For mutation type questions, eliminate silent if the amino acid changes; eliminate frameshift if only one base is substituted.',
    ],
    timeManagement: [
      'Draw the Punnett square even on timed tests — it saves re-reading and error-checking time.',
    ],
  },

  'life-science-u3': { // Evolution & Natural Selection
    mentalPrep: [
      'Darwin\'s key ideas: variation exists in populations, some traits are heritable, more offspring are born than can survive, and survival is not random.',
      'Know the three types of evidence for evolution: fossil record, comparative anatomy (homologous/analogous/vestigial structures), and molecular biology (DNA/protein similarities).',
    ],
    answeringTechniques: [
      'Distinguish homologous (same origin, different function) from analogous (different origin, same function — convergent evolution).',
      'Antibiotic/pesticide resistance questions are always about natural selection of pre-existing variants, NOT directed mutation.',
    ],
    guessingStrategy: [
      'If a population changes after an environmental change, the answer is almost always natural selection acting on existing variation.',
    ],
    processOfElimination: [
      'Eliminate any choice that suggests organisms "choose" to mutate or "try" to adapt — evolution is not goal-directed.',
    ],
    timeManagement: [
      'Evidence-for-evolution questions are typically straightforward — answer them quickly.',
    ],
  },

  'life-science-u4': { // Ecosystems & Ecology
    mentalPrep: [
      'Energy flows in one direction through a food chain; matter (nutrients) cycles.',
      'Only ~10% of energy transfers between trophic levels — higher levels have less energy and fewer organisms.',
      'Know the roles: producer (autotroph), consumer (heterotroph), decomposer (saprotroph).',
    ],
    answeringTechniques: [
      'For food web questions, trace arrows from prey to predator (arrows point in the direction of energy flow).',
      'Removing a top predator typically causes prey populations to increase (trophic cascade).',
    ],
    guessingStrategy: [
      'The organism with the most total energy/biomass is always the producer level.',
      'If a question describes recycling of nutrients, the answer involves decomposers.',
    ],
    processOfElimination: [
      'Eliminate trophic levels that would not exist in the scenario (e.g., no producers = no ecosystem).',
    ],
    timeManagement: [
      'Energy pyramid calculations are simple percentages — solve them quickly and move on.',
    ],
  },

  'life-science-u5': { // Human Body Systems
    mentalPrep: [
      'Match each organ to its system: heart/vessels = circulatory; lungs = respiratory; brain/nerves = nervous; kidneys = excretory; stomach/intestines = digestive.',
      'Know blood vessel types: arteries (away from heart, high pressure), veins (toward heart, valves), capillaries (exchange sites).',
    ],
    answeringTechniques: [
      'For immune system questions, remember: B cells produce antibodies; T cells kill infected cells or coordinate immune response.',
      'Left ventricle pumps to the body; right ventricle pumps to the lungs.',
    ],
    guessingStrategy: [
      'Any question about filtering blood → kidneys. Producing bile → liver. Producing insulin → pancreas.',
    ],
    processOfElimination: [
      'Eliminate organs that belong to the wrong system for the described function.',
    ],
    timeManagement: [
      'Body system matching questions are straightforward — prioritize them to save time for multi-step questions.',
    ],
  },

  'life-science-u6': { // Classification of Life
    mentalPrep: [
      'Memorize the hierarchy: Domain → Kingdom → Phylum → Class → Order → Family → Genus → Species.',
      'Three domains: Bacteria, Archaea (both prokaryotes), and Eukarya (all eukaryotes).',
      'Binomial nomenclature: Genus is capitalized; species is lowercase; both italicized.',
    ],
    answeringTechniques: [
      'Closer shared taxonomic level = more closely related. Two organisms in the same genus are more related than two in the same family.',
    ],
    guessingStrategy: [
      'Prokaryote (no true nucleus) → must be Bacteria or Archaea domain.',
      'Multicellular, absorbs nutrients externally → Fungi.',
    ],
    processOfElimination: [
      'Eliminate kingdoms based on cell type (prokaryote vs. eukaryote) and nutrition mode (autotroph vs. heterotroph).',
    ],
    timeManagement: [
      'Classification hierarchy questions are recall-based — answer them immediately without overthinking.',
    ],
  },
}
