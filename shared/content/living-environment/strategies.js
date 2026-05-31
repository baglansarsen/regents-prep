export const STRATEGIES = {
  'le-u1': { // Cell Biology
    mentalPrep: [
      'Visualize the cell as a city: nucleus = city hall, mitochondria = power plant, ribosomes = factories.',
      'Remind yourself: prokaryotes (bacteria) have no nucleus; all other living things are eukaryotes.',
      'Before reading a question, ask: is this about structure, function, or a process (like diffusion)?',
    ],
    answeringTechniques: [
      'When a diagram of a cell is shown, identify the organelle by shape before reading the choices.',
      'For transport questions, check whether energy is required — active transport needs ATP, passive does not.',
      'Function questions want one clear job: mitochondria → energy (ATP); chloroplast → photosynthesis.',
    ],
    guessingStrategy: [
      'Mitochondria and nucleus appear in roughly 30% of cell biology answer choices — lean toward them when stuck.',
      'If the question mentions "energy" or "ATP," the answer almost always involves the mitochondria.',
      'Questions about plant cells often hinge on structures animals lack: cell wall and chloroplast.',
    ],
    processOfElimination: [
      'Drop any choice that confuses plant-only structures (cell wall, chloroplast) with animal cells.',
      'Eliminate answers that mix up the roles of DNA (nucleus) and protein synthesis (ribosome/ER).',
      'Remove choices that say a membrane-bound organelle is found in prokaryotes.',
    ],
    timeManagement: [
      'Diagram questions add reading time — orient yourself to the diagram before reading the question text.',
      'Straightforward "which organelle does X" questions are fast; answer them first to bank time.',
      'If a transport question requires you to trace a molecule step by step, flag it and return later.',
    ],
  },

  'le-u2': { // Genetics
    mentalPrep: [
      'As soon as you see parent genotypes, mentally set up a blank Punnett square before reading choices.',
      'Lock in the dominance rule: one capital letter = dominant trait is expressed.',
      'Remind yourself: sex-linked traits travel on the X chromosome; males (XY) have no backup allele.',
    ],
    answeringTechniques: [
      'Write the cross (e.g. Bb × Bb) in the margin before evaluating answer choices.',
      'For probability, count squares — "2 out of 4" is clearer and faster than converting to percentages.',
      'Pedigree questions: trace filled shapes (affected) backward to find the inheritance pattern first.',
    ],
    guessingStrategy: [
      'A 3:1 phenotype ratio (dominant:recessive) is the most common outcome for a Bb × Bb monohybrid cross.',
      'If a trait skips a generation, guess recessive — dominant traits show in every generation that carries them.',
      'Sex-linked traits affect males far more often; use that to eliminate choices that say females are equally affected.',
    ],
    processOfElimination: [
      'Eliminate any choice claiming a recessive trait permanently disappears — it can reappear when two carriers mate.',
      'Remove choices that give an organism three alleles for one gene — diploid organisms have exactly two.',
      'Drop answers that confuse genotype (actual alleles) with phenotype (visible trait).',
    ],
    timeManagement: [
      'Draw the Punnett square before reading the choices — 20 seconds spent now prevents re-reading the question twice.',
      'Multi-generational pedigrees are the most time-consuming genetics questions; mark them and return last.',
      'Simple dominant/recessive definition questions are quick — do those first.',
    ],
  },

  'le-u3': { // Evolution
    mentalPrep: [
      'Ground yourself in the core idea: evolution is change in allele frequency over generations, driven by natural selection.',
      'Remember the four Darwin conditions: variation exists → variation is heritable → overproduction → differential survival.',
      'Recall that evolution acts on populations, not individuals.',
    ],
    answeringTechniques: [
      'For natural selection questions, identify the selection pressure (environment change) before picking the outcome.',
      'Adaptation questions ask what trait helps survival — always tie the answer to the specific environment described.',
      'When comparing homologous vs. analogous structures, ask: same ancestry (homologous) or same function (analogous)?',
    ],
    guessingStrategy: [
      'If a population faces a new environmental threat, the answer almost always involves survival of individuals with a pre-existing variation.',
      'Questions about evidence of evolution most commonly reference fossils, DNA comparisons, or homologous structures.',
      '"Survival of the fittest" means best suited to the environment — not necessarily the largest or fastest.',
    ],
    processOfElimination: [
      'Remove choices that say an individual organism changes (adapts) during its lifetime — evolution is generational.',
      'Eliminate answers that claim evolution is directed toward a goal or is "trying" to improve a species.',
      'Drop any choice suggesting all members of a population die in natural selection — some must survive to reproduce.',
    ],
    timeManagement: [
      'Evolution scenario questions are often long to read; skim for the key change (environment, predator, disease) first.',
      'Graph-based evolution questions (allele frequency over time) — read axis labels before the question text.',
      'Definition-type questions (what is natural selection?) are fast — answer those immediately.',
    ],
  },

  'le-u4': { // Ecology
    mentalPrep: [
      'Visualize a food web before the question: energy flows from producers → primary consumers → secondary consumers → tertiary.',
      'Remind yourself: only about 10% of energy transfers between each trophic level.',
      'Recall the difference between abiotic (non-living: water, temperature, light) and biotic (living) factors.',
    ],
    answeringTechniques: [
      'Food web questions: trace arrows in the direction energy flows — arrow tip points to the consumer.',
      'For population change questions, identify what changed (predator, food, disease) then reason through cause and effect.',
      'Biome questions often hinge on precipitation and temperature — match those two factors to the biome name.',
    ],
    guessingStrategy: [
      'If a top predator is removed, prey populations increase — then their food source (producers) decreases.',
      'Questions about carrying capacity: when a population levels off on a graph, it has reached carrying capacity.',
      'Symbiosis type: both benefit = mutualism; one benefits, one unaffected = commensalism; one benefits, one harmed = parasitism.',
    ],
    processOfElimination: [
      'Eliminate choices that say energy increases as it moves up a food chain — it always decreases.',
      'Drop answers that confuse producers (make their own food) with decomposers (break down dead matter).',
      'Remove any choice that says a keystone species is always the most numerous — keystone species have disproportionate impact, not necessarily high numbers.',
    ],
    timeManagement: [
      'Food web diagrams: spend 15 seconds mapping the chain before answering — saves re-reading.',
      'Multi-part ecology scenarios are longer; budget 90 seconds and move on if stuck.',
      'Simple definition questions (what is a producer?) are quick — answer those first to build momentum.',
    ],
  },

  'le-u5': { // Human Body
    mentalPrep: [
      'Organize systems by function: transport (circulatory), exchange (respiratory), coordination (nervous/endocrine), defense (immune).',
      'Remind yourself: homeostasis = the body maintaining a stable internal environment via feedback loops.',
      'Recall the two feedback types: negative feedback reverses a change; positive feedback amplifies it.',
    ],
    answeringTechniques: [
      'For homeostasis questions, identify the stimulus → receptor → response chain.',
      'When a diagram of an organ system appears, name the system first, then answer the specific question.',
      'Immune system questions: distinguish between non-specific defenses (skin, fever) and specific (antibodies, T-cells).',
    ],
    guessingStrategy: [
      'If a question involves maintaining body temperature or blood sugar, the answer almost certainly involves negative feedback.',
      'Hormone questions: insulin lowers blood sugar; glucagon raises it — these appear very frequently.',
      'When unsure about a body system, the nervous system coordinates the fastest responses; the endocrine system is slower but longer-lasting.',
    ],
    processOfElimination: [
      'Remove choices that say the immune system attacks its own healthy cells in a normal response — that describes autoimmune disease.',
      'Eliminate answers that confuse arteries (away from heart) with veins (toward heart).',
      'Drop choices that say positive feedback is used to maintain homeostasis — negative feedback is the homeostatic mechanism.',
    ],
    timeManagement: [
      'Diagram-heavy human body questions (labeled organs) — identify the system in 10 seconds before reading the question.',
      'Feedback loop scenario questions require careful reading; if time is short, look for "reverses" or "amplifies" as keywords.',
      'Simple function questions (what does the kidney do?) are fast — complete these first.',
    ],
  },

  'le-u6': { // Reproduction
    mentalPrep: [
      'Separate mitosis (growth/repair, produces 2 identical cells) from meiosis (sex cells, produces 4 genetically unique cells) before every question.',
      'Remind yourself: asexual reproduction produces clones; sexual reproduction creates genetic variation.',
      'Recall ploidy: diploid (2n) body cells; haploid (n) gametes (sperm and egg).',
    ],
    answeringTechniques: [
      'For mitosis vs. meiosis questions, check the outcome: same chromosome number = mitosis; half the number = meiosis.',
      'Embryonic development questions: fertilization → zygote → differentiation → specialized tissues.',
      'Genetic variation questions: identify the source — crossing over (meiosis), random assortment, or mutation.',
    ],
    guessingStrategy: [
      'If a question asks about producing offspring identical to the parent, the answer involves asexual reproduction or mitosis.',
      'Questions about genetic diversity in offspring almost always point to sexual reproduction or meiosis.',
      'When unsure about a reproductive process, the answer involving "gametes" or "egg and sperm" points to meiosis.',
    ],
    processOfElimination: [
      'Eliminate choices that say mitosis produces four cells — it produces two.',
      'Drop answers claiming asexual reproduction produces genetic variation — it does not (barring mutation).',
      'Remove choices that confuse fertilization (gametes joining) with cleavage (early cell division of the zygote).',
    ],
    timeManagement: [
      'Phase-of-mitosis diagram questions are fast once you recognize the visual pattern — do these quickly.',
      'Longer scenario questions about development or variation require more careful reading; flag and return if short on time.',
      'Simple true/false-style questions about mitosis vs. meiosis outcomes are the quickest in this unit.',
    ],
  },
}
