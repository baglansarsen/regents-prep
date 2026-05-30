import { TOPICS } from './questions'

// Each card: { id, term, definition, topic }
export const flashcards = [
  // ── Cell Biology ──────────────────────────────────────────────────────────
  { id: 'cb1',  topic: TOPICS.CELL_BIOLOGY, term: 'Cell membrane',         definition: 'Selectively permeable phospholipid bilayer that controls what enters and leaves the cell.' },
  { id: 'cb2',  topic: TOPICS.CELL_BIOLOGY, term: 'Nucleus',               definition: 'Membrane-bound organelle that contains DNA and directs cell activities; the "control center" of the cell.' },
  { id: 'cb3',  topic: TOPICS.CELL_BIOLOGY, term: 'Mitochondria',          definition: 'Organelle that produces ATP through cellular respiration; called the "powerhouse of the cell."' },
  { id: 'cb4',  topic: TOPICS.CELL_BIOLOGY, term: 'Chloroplast',           definition: 'Organelle found in plant cells that captures light energy and converts it to glucose via photosynthesis.' },
  { id: 'cb5',  topic: TOPICS.CELL_BIOLOGY, term: 'Ribosome',              definition: 'Small organelle (in cytoplasm or on rough ER) that assembles proteins from amino acids using mRNA instructions.' },
  { id: 'cb6',  topic: TOPICS.CELL_BIOLOGY, term: 'Vacuole',               definition: 'Storage organelle; in plant cells the large central vacuole maintains turgor pressure.' },
  { id: 'cb7',  topic: TOPICS.CELL_BIOLOGY, term: 'Cell wall',             definition: 'Rigid outer layer found in plant, fungal, and bacterial cells; provides structural support.' },
  { id: 'cb8',  topic: TOPICS.CELL_BIOLOGY, term: 'Prokaryote',            definition: 'Cell that lacks a membrane-bound nucleus and organelles (e.g., bacteria).' },
  { id: 'cb9',  topic: TOPICS.CELL_BIOLOGY, term: 'Eukaryote',             definition: 'Cell with a true membrane-bound nucleus and membrane-bound organelles (e.g., animal and plant cells).' },
  { id: 'cb10', topic: TOPICS.CELL_BIOLOGY, term: 'ATP',                   definition: 'Adenosine triphosphate — the primary energy currency of cells; releases energy when the third phosphate bond is broken.' },
  { id: 'cb11', topic: TOPICS.CELL_BIOLOGY, term: 'Photosynthesis',        definition: '6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂. Process by which producers convert light energy into stored chemical (glucose) energy.' },
  { id: 'cb12', topic: TOPICS.CELL_BIOLOGY, term: 'Cellular respiration',  definition: 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP. Releases chemical energy from glucose to produce ATP.' },
  { id: 'cb13', topic: TOPICS.CELL_BIOLOGY, term: 'Diffusion',             definition: 'Passive movement of particles from high concentration to low concentration; requires no energy.' },
  { id: 'cb14', topic: TOPICS.CELL_BIOLOGY, term: 'Osmosis',               definition: 'Diffusion of water across a selectively permeable membrane from low solute to high solute concentration.' },
  { id: 'cb15', topic: TOPICS.CELL_BIOLOGY, term: 'Active transport',      definition: 'Movement of substances against the concentration gradient; requires ATP energy and carrier proteins.' },
  { id: 'cb16', topic: TOPICS.CELL_BIOLOGY, term: 'Mitosis',               definition: 'Cell division that produces 2 genetically identical daughter cells; used for growth and repair.' },
  { id: 'cb17', topic: TOPICS.CELL_BIOLOGY, term: 'Enzyme',                definition: 'Biological catalyst (protein) that speeds up chemical reactions by lowering activation energy; not consumed in the reaction.' },
  { id: 'cb18', topic: TOPICS.CELL_BIOLOGY, term: 'Organelle',             definition: 'Specialized structure within a cell that performs a specific function (e.g., mitochondria, nucleus, ribosome).' },

  // ── Genetics ──────────────────────────────────────────────────────────────
  { id: 'ge1',  topic: TOPICS.GENETICS, term: 'Gene',                      definition: 'Segment of DNA on a chromosome that codes for a specific protein or trait.' },
  { id: 'ge2',  topic: TOPICS.GENETICS, term: 'Allele',                    definition: 'One of two or more forms of a gene; inherited one from each parent.' },
  { id: 'ge3',  topic: TOPICS.GENETICS, term: 'Genotype',                  definition: 'The genetic makeup of an organism; represented by letter combinations (e.g., Tt, BB, rr).' },
  { id: 'ge4',  topic: TOPICS.GENETICS, term: 'Phenotype',                 definition: 'The observable physical traits of an organism resulting from its genotype and environment.' },
  { id: 'ge5',  topic: TOPICS.GENETICS, term: 'Dominant allele',           definition: 'Allele that is expressed in the phenotype even when only one copy is present; written as a capital letter.' },
  { id: 'ge6',  topic: TOPICS.GENETICS, term: 'Recessive allele',          definition: 'Allele expressed only when two copies are present (homozygous recessive); written as a lowercase letter.' },
  { id: 'ge7',  topic: TOPICS.GENETICS, term: 'Homozygous',                definition: 'Having two identical alleles for a trait (e.g., TT or tt); also called "true breeding."' },
  { id: 'ge8',  topic: TOPICS.GENETICS, term: 'Heterozygous',              definition: 'Having two different alleles for a trait (e.g., Tt); also called a "hybrid" or "carrier."' },
  { id: 'ge9',  topic: TOPICS.GENETICS, term: 'Punnett square',            definition: 'Grid used to predict the genotype and phenotype ratios of offspring from a genetic cross.' },
  { id: 'ge10', topic: TOPICS.GENETICS, term: 'Codominance',               definition: 'Both alleles are fully expressed in the heterozygote (e.g., AB blood type, roan coat color).' },
  { id: 'ge11', topic: TOPICS.GENETICS, term: 'Incomplete dominance',      definition: 'Neither allele is fully dominant; heterozygote shows a blended intermediate phenotype (e.g., red × white = pink).' },
  { id: 'ge12', topic: TOPICS.GENETICS, term: 'Mutation',                  definition: 'A change in the DNA sequence; can be a point mutation (single base) or chromosomal mutation.' },
  { id: 'ge13', topic: TOPICS.GENETICS, term: 'Chromosome',                definition: 'Tightly coiled DNA + protein structure; humans have 46 (23 pairs). Contains many genes.' },
  { id: 'ge14', topic: TOPICS.GENETICS, term: 'DNA',                       definition: 'Deoxyribonucleic acid — double helix molecule that stores genetic information using base pairs (A-T, G-C).' },
  { id: 'ge15', topic: TOPICS.GENETICS, term: 'Transcription',             definition: 'The process of copying DNA into mRNA in the nucleus; first step of protein synthesis.' },
  { id: 'ge16', topic: TOPICS.GENETICS, term: 'Translation',               definition: 'The process of reading mRNA codons at ribosomes to build a protein from amino acids.' },
  { id: 'ge17', topic: TOPICS.GENETICS, term: 'Sex-linked trait',          definition: 'Trait controlled by a gene on the X or Y chromosome; more common in males (e.g., color blindness, hemophilia).' },
  { id: 'ge18', topic: TOPICS.GENETICS, term: 'Meiosis',                   definition: 'Cell division that produces 4 genetically unique haploid (n) gametes; introduces genetic variation.' },
  { id: 'ge19', topic: TOPICS.GENETICS, term: 'Codon',                     definition: 'Three-base sequence on mRNA that codes for a specific amino acid during translation.' },
  { id: 'ge20', topic: TOPICS.GENETICS, term: 'Protein synthesis',         definition: 'Two-step process (transcription + translation) that uses DNA instructions to build proteins.' },

  // ── Evolution ─────────────────────────────────────────────────────────────
  { id: 'ev1',  topic: TOPICS.EVOLUTION, term: 'Natural selection',        definition: 'Process by which individuals with favorable traits survive and reproduce more than those without; mechanism of evolution.' },
  { id: 'ev2',  topic: TOPICS.EVOLUTION, term: 'Adaptation',               definition: 'An inherited trait that increases an organism\'s fitness (survival and reproduction) in its environment.' },
  { id: 'ev3',  topic: TOPICS.EVOLUTION, term: 'Fitness',                  definition: 'An organism\'s ability to survive and reproduce in its environment; measured by reproductive success.' },
  { id: 'ev4',  topic: TOPICS.EVOLUTION, term: 'Variation',                definition: 'Differences in traits among individuals in a population; the raw material for natural selection.' },
  { id: 'ev5',  topic: TOPICS.EVOLUTION, term: 'Speciation',               definition: 'The formation of a new species, usually through reproductive isolation of two populations.' },
  { id: 'ev6',  topic: TOPICS.EVOLUTION, term: 'Common ancestor',          definition: 'A shared ancestor from which two or more species evolved; evidence from fossils and DNA.' },
  { id: 'ev7',  topic: TOPICS.EVOLUTION, term: 'Homologous structures',    definition: 'Similar structures inherited from a common ancestor; may have different functions (e.g., human arm, whale flipper, bat wing).' },
  { id: 'ev8',  topic: TOPICS.EVOLUTION, term: 'Analogous structures',     definition: 'Structures that have the same function but different evolutionary origins (e.g., bird wing vs. insect wing).' },
  { id: 'ev9',  topic: TOPICS.EVOLUTION, term: 'Vestigial structure',      definition: 'Reduced, non-functional structure inherited from ancestors (e.g., human appendix, whale hip bones).' },
  { id: 'ev10', topic: TOPICS.EVOLUTION, term: 'Fossil record',            definition: 'Evidence of past life preserved in rock; shows evolutionary change over time.' },
  { id: 'ev11', topic: TOPICS.EVOLUTION, term: 'Genetic drift',            definition: 'Random change in allele frequencies in a small population; not driven by selection.' },
  { id: 'ev12', topic: TOPICS.EVOLUTION, term: 'Gene pool',                definition: 'All the alleles present in a population at a given time.' },
  { id: 'ev13', topic: TOPICS.EVOLUTION, term: 'Extinction',               definition: 'Permanent disappearance of a species; occurs when organisms can\'t adapt to environmental change.' },
  { id: 'ev14', topic: TOPICS.EVOLUTION, term: 'Reproductive isolation',   definition: 'Barrier preventing two populations from interbreeding; leads to speciation over time.' },
  { id: 'ev15', topic: TOPICS.EVOLUTION, term: 'Darwin',                   definition: 'Charles Darwin — proposed evolution by natural selection in "On the Origin of Species" (1859); observed variation and survival of the fittest.' },

  // ── Ecology ───────────────────────────────────────────────────────────────
  { id: 'ec1',  topic: TOPICS.ECOLOGY, term: 'Ecosystem',                  definition: 'All the living (biotic) and non-living (abiotic) components in an area and their interactions.' },
  { id: 'ec2',  topic: TOPICS.ECOLOGY, term: 'Food chain',                 definition: 'Linear sequence showing the flow of energy from producer → primary consumer → secondary consumer → etc.' },
  { id: 'ec3',  topic: TOPICS.ECOLOGY, term: 'Food web',                   definition: 'Interconnected network of food chains in an ecosystem; more realistic than a single chain.' },
  { id: 'ec4',  topic: TOPICS.ECOLOGY, term: 'Producer (autotroph)',       definition: 'Organism that makes its own food via photosynthesis or chemosynthesis; base of every food chain.' },
  { id: 'ec5',  topic: TOPICS.ECOLOGY, term: 'Consumer (heterotroph)',     definition: 'Organism that obtains energy by eating other organisms; cannot produce its own food.' },
  { id: 'ec6',  topic: TOPICS.ECOLOGY, term: 'Decomposer',                 definition: 'Organism (bacteria, fungi) that breaks down dead organic matter and returns nutrients to the soil.' },
  { id: 'ec7',  topic: TOPICS.ECOLOGY, term: 'Carrying capacity',          definition: 'Maximum population size an environment can sustainably support given available resources.' },
  { id: 'ec8',  topic: TOPICS.ECOLOGY, term: 'Limiting factor',            definition: 'Any resource or condition (food, water, space, predation) that restricts population growth.' },
  { id: 'ec9',  topic: TOPICS.ECOLOGY, term: 'Niche',                      definition: 'An organism\'s role in its ecosystem: what it eats, where it lives, and how it interacts with other species.' },
  { id: 'ec10', topic: TOPICS.ECOLOGY, term: 'Habitat',                    definition: 'The physical location where an organism lives (e.g., pond, forest floor, coral reef).' },
  { id: 'ec11', topic: TOPICS.ECOLOGY, term: 'Symbiosis',                  definition: 'Close, long-term interaction between two different species living together.' },
  { id: 'ec12', topic: TOPICS.ECOLOGY, term: 'Mutualism',                  definition: 'Symbiotic relationship where both species benefit (e.g., bees + flowers, clownfish + anemone).' },
  { id: 'ec13', topic: TOPICS.ECOLOGY, term: 'Commensalism',               definition: 'Symbiosis where one species benefits and the other is neither helped nor harmed (e.g., barnacles on whale).' },
  { id: 'ec14', topic: TOPICS.ECOLOGY, term: 'Parasitism',                 definition: 'Symbiosis where one species (parasite) benefits at the expense of the other (host).' },
  { id: 'ec15', topic: TOPICS.ECOLOGY, term: 'Ecological succession',      definition: 'Gradual change in species composition in an ecosystem over time (primary or secondary).' },
  { id: 'ec16', topic: TOPICS.ECOLOGY, term: 'Biodiversity',               definition: 'The variety of species in an area; high biodiversity generally means a more stable and resilient ecosystem.' },
  { id: 'ec17', topic: TOPICS.ECOLOGY, term: 'Biotic factor',              definition: 'Living component of an ecosystem (organisms, their interactions, decomposing matter).' },
  { id: 'ec18', topic: TOPICS.ECOLOGY, term: 'Abiotic factor',             definition: 'Non-living component of an ecosystem (temperature, water, light, soil, pH).' },

  // ── Human Body ────────────────────────────────────────────────────────────
  { id: 'hb1',  topic: TOPICS.HUMAN_BODY, term: 'Homeostasis',             definition: 'The process by which organisms maintain a stable internal environment despite external changes (e.g., body temperature 37°C).' },
  { id: 'hb2',  topic: TOPICS.HUMAN_BODY, term: 'Hormone',                 definition: 'Chemical messenger secreted by endocrine glands; travels through the blood to target organs.' },
  { id: 'hb3',  topic: TOPICS.HUMAN_BODY, term: 'Neuron',                  definition: 'Nerve cell that transmits electrical and chemical signals; basic unit of the nervous system.' },
  { id: 'hb4',  topic: TOPICS.HUMAN_BODY, term: 'Antibody',                definition: 'Y-shaped protein produced by B-cells that binds to a specific antigen to neutralize pathogens.' },
  { id: 'hb5',  topic: TOPICS.HUMAN_BODY, term: 'Antigen',                 definition: 'Foreign molecule (usually on a pathogen\'s surface) that triggers an immune response.' },
  { id: 'hb6',  topic: TOPICS.HUMAN_BODY, term: 'Immune response',         definition: 'The body\'s defense against pathogens; involves white blood cells, antibodies, and memory cells.' },
  { id: 'hb7',  topic: TOPICS.HUMAN_BODY, term: 'Digestive system',        definition: 'Breaks down food into small molecules (nutrients) that can be absorbed into the blood; includes stomach, intestines.' },
  { id: 'hb8',  topic: TOPICS.HUMAN_BODY, term: 'Circulatory system',      definition: 'Heart + blood vessels; transports oxygen, nutrients, hormones, and waste throughout the body.' },
  { id: 'hb9',  topic: TOPICS.HUMAN_BODY, term: 'Respiratory system',      definition: 'Lungs + airways; exchanges O₂ and CO₂ between blood and the environment.' },
  { id: 'hb10', topic: TOPICS.HUMAN_BODY, term: 'Nervous system',          definition: 'Brain, spinal cord, and nerves; controls body functions via electrical signals; coordinates responses to stimuli.' },
  { id: 'hb11', topic: TOPICS.HUMAN_BODY, term: 'Endocrine system',        definition: 'Glands (pituitary, thyroid, adrenal, etc.) that release hormones to regulate growth, metabolism, and reproduction.' },
  { id: 'hb12', topic: TOPICS.HUMAN_BODY, term: 'Negative feedback',       definition: 'Control mechanism that reverses a change to restore homeostasis (e.g., high blood sugar → insulin release → blood sugar drops).' },
  { id: 'hb13', topic: TOPICS.HUMAN_BODY, term: 'Receptor',                definition: 'Protein on a cell or sensory organ that detects a specific stimulus and initiates a response.' },
  { id: 'hb14', topic: TOPICS.HUMAN_BODY, term: 'Excretory system',        definition: 'Removes metabolic waste from the body; kidneys filter blood and produce urine.' },
  { id: 'hb15', topic: TOPICS.HUMAN_BODY, term: 'Stimulus / Response',     definition: 'Stimulus: a change that triggers a reaction. Response: the organism\'s reaction to maintain homeostasis.' },

  // ── Reproduction & Development ────────────────────────────────────────────
  { id: 're1',  topic: TOPICS.REPRODUCTION, term: 'Asexual reproduction',  definition: 'Reproduction involving one parent; offspring are genetically identical clones (e.g., binary fission, budding, vegetative propagation).' },
  { id: 're2',  topic: TOPICS.REPRODUCTION, term: 'Sexual reproduction',   definition: 'Reproduction involving two parents and fertilization; produces offspring with genetic variation.' },
  { id: 're3',  topic: TOPICS.REPRODUCTION, term: 'Fertilization',         definition: 'Union of egg (n) and sperm (n) to form a diploid zygote (2n); begins development.' },
  { id: 're4',  topic: TOPICS.REPRODUCTION, term: 'Zygote',                definition: 'The first cell formed after fertilization; contains a full diploid set of chromosomes (2n).' },
  { id: 're5',  topic: TOPICS.REPRODUCTION, term: 'Embryo',                definition: 'Multicellular stage of development after the zygote begins dividing by mitosis.' },
  { id: 're6',  topic: TOPICS.REPRODUCTION, term: 'Differentiation',       definition: 'Process by which cells become specialized in structure and function during development despite having the same DNA.' },
  { id: 're7',  topic: TOPICS.REPRODUCTION, term: 'Stem cell',             definition: 'Undifferentiated cell capable of becoming many cell types; found in embryos and some adult tissues.' },
  { id: 're8',  topic: TOPICS.REPRODUCTION, term: 'Gamete',                definition: 'Haploid (n) reproductive cell — sperm in males, egg (ovum) in females.' },
  { id: 're9',  topic: TOPICS.REPRODUCTION, term: 'Placenta',              definition: 'Organ that exchanges nutrients, oxygen, and waste between mother and fetus during pregnancy.' },
  { id: 're10', topic: TOPICS.REPRODUCTION, term: 'Vegetative propagation',definition: 'Asexual reproduction in plants using roots, stems, or leaves (e.g., runners, cuttings, tubers).' },
]

export function getFlashcardsByTopic(topic) {
  if (!topic) return flashcards
  return flashcards.filter((c) => c.topic === topic)
}

export const FLASHCARD_TOPIC_LIST = [
  { label: 'All Topics', value: null },
  ...Array.from(new Set(flashcards.map((c) => c.topic))).map((t) => ({ label: t, value: t })),
]
