import { TOPICS } from './questions'

export const flashcards = [
  // Cells & Cell Processes
  { topic: TOPICS.CELLS, term: 'Cell membrane', definition: 'A selectively permeable phospholipid bilayer that controls what enters and exits the cell.' },
  { topic: TOPICS.CELLS, term: 'Mitochondria', definition: 'The organelle that produces ATP through cellular respiration; the "powerhouse of the cell."' },
  { topic: TOPICS.CELLS, term: 'Chloroplast', definition: 'The organelle found in plant cells that captures light energy and performs photosynthesis to produce glucose.' },
  { topic: TOPICS.CELLS, term: 'Osmosis', definition: 'The passive diffusion of water molecules across a selectively permeable membrane from high to low water concentration.' },
  { topic: TOPICS.CELLS, term: 'Nucleus', definition: 'The membrane-bound organelle that contains DNA and directs all cellular activities.' },
  { topic: TOPICS.CELLS, term: 'Ribosome', definition: 'A cellular structure (found on rough ER or free in cytoplasm) that translates mRNA into protein.' },
  { topic: TOPICS.CELLS, term: 'Mitosis', definition: 'Cell division that produces two genetically identical diploid daughter cells; used for growth and repair.' },

  // Genetics & Heredity
  { topic: TOPICS.GENETICS, term: 'DNA', definition: 'Deoxyribonucleic acid — the double-helix molecule that carries hereditary information in the sequence of its nitrogenous bases.' },
  { topic: TOPICS.GENETICS, term: 'Gene', definition: 'A segment of DNA that codes for a specific protein or RNA molecule, determining an inherited trait.' },
  { topic: TOPICS.GENETICS, term: 'Dominant allele', definition: 'An allele whose trait is expressed whenever it is present, even in a heterozygous organism.' },
  { topic: TOPICS.GENETICS, term: 'Recessive allele', definition: 'An allele whose trait is expressed only when two copies are present (homozygous recessive).' },
  { topic: TOPICS.GENETICS, term: 'Meiosis', definition: 'Cell division that reduces chromosome number by half, producing four genetically unique haploid gametes.' },
  { topic: TOPICS.GENETICS, term: 'Mutation', definition: 'A permanent change in the DNA nucleotide sequence; the original source of all genetic variation.' },
  { topic: TOPICS.GENETICS, term: 'Punnett square', definition: 'A grid used to predict the probability of offspring genotypes from a cross between two parents.' },

  // Evolution & Natural Selection
  { topic: TOPICS.EVOLUTION, term: 'Natural selection', definition: 'The process by which individuals with favorable heritable traits survive and reproduce more successfully.' },
  { topic: TOPICS.EVOLUTION, term: 'Adaptation', definition: 'A heritable trait that increases an organism\'s fitness (survival and reproduction) in its environment.' },
  { topic: TOPICS.EVOLUTION, term: 'Homologous structures', definition: 'Anatomical structures in different species with the same evolutionary origin but possibly different functions, indicating common ancestry.' },
  { topic: TOPICS.EVOLUTION, term: 'Vestigial structures', definition: 'Reduced or non-functional body parts inherited from ancestors in which they served a purpose (e.g., human tailbone).' },
  { topic: TOPICS.EVOLUTION, term: 'Common ancestor', definition: 'An ancestral species from which two or more descendant species have evolved through divergent evolution.' },

  // Ecosystems & Ecology
  { topic: TOPICS.ECOSYSTEMS, term: 'Producer', definition: 'An autotroph (e.g., plant, algae) that captures energy from sunlight or chemicals to make organic compounds, forming the base of a food web.' },
  { topic: TOPICS.ECOSYSTEMS, term: 'Consumer', definition: 'A heterotroph that obtains energy by eating other organisms; classified as primary, secondary, or tertiary.' },
  { topic: TOPICS.ECOSYSTEMS, term: 'Decomposer', definition: 'An organism (bacteria or fungi) that breaks down dead organic matter, returning nutrients to the abiotic environment.' },
  { topic: TOPICS.ECOSYSTEMS, term: 'Food web', definition: 'A network of interconnected food chains showing the complex feeding relationships within an ecosystem.' },
  { topic: TOPICS.ECOSYSTEMS, term: 'Carrying capacity', definition: 'The maximum population size that an environment can sustainably support given available resources.' },
  { topic: TOPICS.ECOSYSTEMS, term: 'Biome', definition: 'A large geographical area characterized by a specific climate, plant community, and associated animal life (e.g., tundra, rainforest).' },

  // Human Body Systems
  { topic: TOPICS.HUMAN_BODY, term: 'Artery', definition: 'A blood vessel that carries oxygenated blood away from the heart under high pressure.' },
  { topic: TOPICS.HUMAN_BODY, term: 'Vein', definition: 'A blood vessel that returns deoxygenated blood to the heart; contains valves to prevent backflow.' },
  { topic: TOPICS.HUMAN_BODY, term: 'Neuron', definition: 'A specialized nerve cell that transmits electrical impulses; the functional unit of the nervous system.' },
  { topic: TOPICS.HUMAN_BODY, term: 'Antibody', definition: 'A Y-shaped protein produced by B cells that binds specifically to an antigen, neutralizing or marking it for destruction.' },
  { topic: TOPICS.HUMAN_BODY, term: 'Enzyme', definition: 'A biological catalyst (usually a protein) that speeds up chemical reactions without being consumed.' },

  // Classification of Life
  { topic: TOPICS.CLASSIFICATION, term: 'Taxonomy', definition: 'The science of naming, describing, and classifying organisms based on shared characteristics and evolutionary relationships.' },
  { topic: TOPICS.CLASSIFICATION, term: 'Prokaryote', definition: 'An organism (Bacteria or Archaea) that lacks a membrane-bound nucleus and membrane-bound organelles.' },
  { topic: TOPICS.CLASSIFICATION, term: 'Eukaryote', definition: 'An organism whose cells contain a membrane-bound nucleus and organelles; includes Protists, Fungi, Plants, and Animals.' },
  { topic: TOPICS.CLASSIFICATION, term: 'Binomial nomenclature', definition: 'The two-part scientific naming system developed by Linnaeus; genus name + species epithet (e.g., Homo sapiens).' },
  { topic: TOPICS.CLASSIFICATION, term: 'Domain', definition: 'The broadest taxonomic category, above kingdom; the three domains are Bacteria, Archaea, and Eukarya.' },
]

export const FLASHCARD_TOPIC_LIST = Object.values(TOPICS)
