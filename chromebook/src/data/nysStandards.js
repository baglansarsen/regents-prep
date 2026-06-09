/**
 * NYS Next Generation Learning Standards
 *
 * Maps each subject → topic → NYS standard code + description.
 * Used by the Teacher Dashboard Standards Matrix.
 *
 * Sources:
 *  - NYSED Next Generation ELA & Math Standards (2017)
 *  - NYS Living Environment, Earth Science, Chemistry, Physics Core Curricula
 *  - NYSED Science Learning Standards (2020)
 */

export const NYS_STANDARDS = {
  'living-environment': {
    'Cell Biology': {
      code: 'LE-HS-LS1-1',
      standard: 'Structure & Function',
      description: 'Construct an explanation based on evidence for how the structure of DNA determines the structure of proteins which carry out the essential functions of life.',
      remediation: 'Re-teach cell organelles, membrane transport (osmosis/active), enzyme activity. Focus lab: catalase rate experiment.',
    },
    'Genetics & Heredity': {
      code: 'LE-HS-LS3-1',
      standard: 'Heredity',
      description: 'Ask questions to clarify relationships about the role of DNA and chromosomes in coding the instructions for characteristic traits passed from parents to offspring.',
      remediation: 'Review Punnett squares, meiosis, and inheritance patterns (dominant, recessive, codominant, X-linked).',
    },
    'Evolution': {
      code: 'LE-HS-LS4-2',
      standard: 'Biological Evolution',
      description: 'Construct an explanation based on evidence that the process of evolution primarily results from four factors: variation, inheritance, selection, and time.',
      remediation: 'Review natural selection, speciation, fossil record, homologous structures, and antibiotic resistance examples.',
    },
    'Ecology': {
      code: 'LE-HS-LS2-6',
      standard: 'Ecosystems',
      description: 'Evaluate the claims, evidence, and reasoning that the complex interactions in ecosystems maintain relatively consistent numbers and types of organisms.',
      remediation: 'Focus on food webs, energy pyramids, carrying capacity, succession, and human impact on ecosystems.',
    },
    'Human Body Systems': {
      code: 'LE-HS-LS1-3',
      standard: 'Body Systems & Homeostasis',
      description: 'Plan and conduct an investigation to provide evidence that feedback mechanisms maintain homeostasis.',
      remediation: 'Review all major body systems (nervous, immune, endocrine, digestive, circulatory). Emphasize homeostasis examples.',
    },
    'Reproduction & Development': {
      code: 'LE-HS-LS1-4',
      standard: 'Reproduction & Growth',
      description: 'Use a model to illustrate the role of cellular division (mitosis) and differentiation in producing and maintaining complex organisms.',
      remediation: 'Compare mitosis vs. meiosis, review embryonic development, differentiation, and placenta function.',
    },
  },

  'earth-science': {
    'Minerals & Rocks': {
      code: 'ES-HS-ESS2-2',
      standard: 'Earth\'s Systems',
      description: 'Analyze geoscience data to make the claim that one change to Earth\'s surface can create feedbacks that cause changes to other Earth systems.',
      remediation: 'Re-teach mineral identification, rock cycle, and sediment formation.',
    },
    'Plate Tectonics': {
      code: 'ES-HS-ESS2-1',
      standard: 'Earth\'s Systems',
      description: 'Develop a model to illustrate how Earth\'s internal and surface processes operate at different spatial and temporal scales.',
      remediation: 'Review plate boundaries, evidence for continental drift, seismic waves.',
    },
    'Weathering & Erosion': {
      code: 'ES-HS-ESS2-5',
      standard: 'Biogeology',
      description: 'Plan and conduct an investigation of the properties of water and its effects on Earth materials and surface processes.',
      remediation: 'Focus on mechanical vs. chemical weathering, deposition, stream transport.',
    },
    'Weather & Climate': {
      code: 'ES-HS-ESS2-4',
      standard: 'Weather & Climate',
      description: 'Use a model to describe how variations in the flow of energy into and out of Earth\'s systems result in changes in climate.',
      remediation: 'Review air masses, fronts, pressure systems, Coriolis effect, and climate change evidence.',
    },
    'Astronomy': {
      code: 'ES-HS-ESS1-1',
      standard: 'Earth\'s Place in the Universe',
      description: 'Develop a model based on evidence to illustrate the life span of the sun and the role of nuclear fusion in the sun\'s core.',
      remediation: 'Re-teach stellar evolution, Earth-Moon-Sun system, seasons, and Doppler effect.',
    },
    'Geologic History': {
      code: 'ES-HS-ESS1-5',
      standard: 'Earth\'s History',
      description: 'Evaluate evidence of the past and current movements of continental and oceanic crust and the theory of plate tectonics.',
      remediation: 'Focus on relative and absolute dating, geologic time scale, and index fossils.',
    },
  },

  'chemistry': {
    'Matter & Atomic Structure': {
      code: 'CH-HS-PS1-1',
      standard: 'Matter & Its Interactions',
      description: 'Use the periodic table as a model to predict the relative properties of elements based on the patterns of electrons in the outermost energy level.',
      remediation: 'Re-teach subatomic particles, electron configuration, periodic trends.',
    },
    'Chemical Bonding': {
      code: 'CH-HS-PS1-2',
      standard: 'Chemical Bonding',
      description: 'Construct and revise an explanation for the outcome of a simple chemical reaction based on the outermost electron states of atoms.',
      remediation: 'Review ionic vs. covalent bonds, electronegativity, Lewis dot structures.',
    },
    'Reactions & Stoichiometry': {
      code: 'CH-HS-PS1-7',
      standard: 'Chemical Reactions',
      description: 'Use mathematical representations to support the claim that atoms and therefore mass are conserved during a chemical reaction.',
      remediation: 'Practice balancing equations, mole conversions, limiting reagent calculations.',
    },
    'Solutions & Acids/Bases': {
      code: 'CH-HS-PS1-8',
      standard: 'Solutions',
      description: 'Develop models to illustrate the changes in the composition of the nucleus of the atom and the energy released during the processes of fission, fusion, and radioactive decay.',
      remediation: 'Review pH scale, molarity, solubility rules, acid-base neutralization.',
    },
    'Kinetics & Thermodynamics': {
      code: 'CH-HS-PS3-2',
      standard: 'Energy',
      description: 'Develop and use models to illustrate that energy at the macroscopic scale can be accounted for as a combination of energy associated with the motions and relative positions of atoms and molecules.',
      remediation: 'Focus on activation energy, collision theory, Le Chatelier\'s principle, enthalpy.',
    },
  },

  'physics': {
    'Kinematics': {
      code: 'PH-HS-PS2-1',
      standard: 'Motion & Stability',
      description: 'Analyze data to support the claim that Newton\'s second law of motion describes the relationship between the net force on a macroscopic object and its acceleration.',
      remediation: 'Practice kinematics equations, velocity/acceleration graphs, free-fall problems.',
    },
    'Forces & Newton\'s Laws': {
      code: 'PH-HS-PS2-2',
      standard: 'Forces & Motion',
      description: 'Use mathematical representations to support the claim that the total momentum of a system of objects is conserved when there is no net force on the system.',
      remediation: 'Review all three Newton\'s laws, friction, normal force, free-body diagrams.',
    },
    'Energy & Work': {
      code: 'PH-HS-PS3-1',
      standard: 'Energy',
      description: 'Create a computational model to calculate the change in the energy of one component in a system when the change in energy of the other component(s) is known.',
      remediation: 'Practice work-energy theorem, conservation of energy, power calculations.',
    },
    'Waves & Optics': {
      code: 'PH-HS-PS4-1',
      standard: 'Waves & Electromagnetic Radiation',
      description: 'Use mathematical representations to support a claim regarding relationships among the frequency, wavelength, and speed of waves traveling in various media.',
      remediation: 'Review wave equation (v = fλ), reflection, refraction, Doppler effect.',
    },
    'Electricity & Magnetism': {
      code: 'PH-HS-PS2-5',
      standard: 'Electricity',
      description: 'Plan and conduct an investigation to provide evidence that an electric current can produce a magnetic field and that a changing magnetic field can produce an electric current.',
      remediation: 'Review Ohm\'s law, series/parallel circuits, Coulomb\'s law.',
    },
  },

  'algebra-1': {
    'Linear Equations & Inequalities': {
      code: 'NY-A1-A.REI.3',
      standard: 'Reasoning with Equations & Inequalities',
      description: 'Solve linear equations and inequalities in one variable, including equations with coefficients represented by letters.',
      remediation: 'Practice solving multi-step equations, graphing inequalities, and real-world applications.',
    },
    'Functions & Relations': {
      code: 'NY-A1-F.IF.1',
      standard: 'Interpreting Functions',
      description: 'Understand that a function from one set to another set assigns to each element of the domain exactly one element of the range.',
      remediation: 'Review function notation, domain/range, vertical line test, function tables.',
    },
    'Systems of Equations': {
      code: 'NY-A1-A.REI.6',
      standard: 'Systems of Equations',
      description: 'Solve systems of linear equations exactly and approximately (graphically), focusing on pairs of linear equations in two variables.',
      remediation: 'Practice graphing, substitution, and elimination methods. Review real-world system word problems.',
    },
    'Polynomials & Factoring': {
      code: 'NY-A1-A.APR.1',
      standard: 'Arithmetic with Polynomials',
      description: 'Understand that polynomials form a system analogous to integers; add, subtract, and multiply polynomials.',
      remediation: 'Practice FOIL, GCF factoring, difference of squares, and trinomial factoring.',
    },
    'Quadratic Functions': {
      code: 'NY-A1-F.IF.8a',
      standard: 'Quadratic Functions',
      description: 'Use the process of factoring and completing the square in a quadratic function to show zeros, extreme values, and symmetry.',
      remediation: 'Review vertex form, factoring, quadratic formula, discriminant, and graphing parabolas.',
    },
    'Statistics & Probability': {
      code: 'NY-A1-S.ID.1',
      standard: 'Statistics & Data',
      description: 'Represent data with plots on the real number line (dot plots, histograms, and box plots) and interpret their shape and spread.',
      remediation: 'Focus on measures of center/spread, scatter plots, correlation, and line of best fit.',
    },
  },

  'algebra-2': {
    'Polynomial Functions': {
      code: 'NY-A2-A.APR.2',
      standard: 'Polynomial & Rational Expressions',
      description: 'Know and apply the Remainder Theorem: for a polynomial p(x) and a number a, the remainder is p(a).',
      remediation: 'Review polynomial division, the Factor Theorem, and end behavior.',
    },
    'Rational & Radical Functions': {
      code: 'NY-A2-A.REI.2',
      standard: 'Rational & Radical Equations',
      description: 'Solve simple rational and radical equations in one variable, and give examples showing how extraneous solutions may arise.',
      remediation: 'Practice simplifying rational expressions, solving radical equations, and checking for extraneous solutions.',
    },
    'Exponential & Logarithmic Functions': {
      code: 'NY-A2-F.BF.5',
      standard: 'Building Functions',
      description: 'Understand the inverse relationship between exponents and logarithms and use this relationship to solve problems.',
      remediation: 'Review logarithm properties, change of base, natural log, and exponential growth/decay.',
    },
    'Trigonometry': {
      code: 'NY-A2-F.TF.1',
      standard: 'Trigonometric Functions',
      description: 'Understand radian measure of an angle as the length of the arc on the unit circle subtended by the angle.',
      remediation: 'Practice unit circle, trig ratios, amplitude/period/phase shift, and inverse trig.',
    },
    'Statistics & Probability': {
      code: 'NY-A2-S.MD.6',
      standard: 'Statistics & Probability',
      description: 'Evaluate the probability of an event using permutations and combinations and apply to decision-making.',
      remediation: 'Review normal distributions, z-scores, permutations, combinations, and conditional probability.',
    },
  },

  'geometry': {
    'Transformations': {
      code: 'NY-GEO-G.CO.2',
      standard: 'Congruence & Transformations',
      description: 'Represent transformations in the plane; describe transformations as functions that take points to points.',
      remediation: 'Practice translations, reflections, rotations, dilations on the coordinate plane.',
    },
    'Triangles & Congruence': {
      code: 'NY-GEO-G.CO.10',
      standard: 'Congruence',
      description: 'Prove theorems about triangles: base angles of isosceles triangles are congruent; segment joining midpoints is parallel.',
      remediation: 'Review congruence postulates (SSS, SAS, ASA, AAS, HL), triangle inequalities.',
    },
    'Similarity': {
      code: 'NY-GEO-G.SRT.2',
      standard: 'Similarity',
      description: 'Given two figures, use the definition of similarity in terms of similarity transformations to decide if they are similar.',
      remediation: 'Practice similarity proofs, AA/SAS/SSS similarity, proportional sides, scale factor.',
    },
    'Right Triangles & Trigonometry': {
      code: 'NY-GEO-G.SRT.8',
      standard: 'Right Triangles & Trigonometry',
      description: 'Use trigonometric ratios and the Pythagorean Theorem to solve right triangles in applied problems.',
      remediation: 'Review SOH-CAH-TOA, Pythagorean theorem, special right triangles (30-60-90, 45-45-90).',
    },
    'Circles': {
      code: 'NY-GEO-G.C.2',
      standard: 'Circles',
      description: 'Identify and describe relationships among inscribed angles, radii, and chords.',
      remediation: 'Review arc/angle relationships, inscribed angles, tangent lines, and sector area.',
    },
    'Area & Volume': {
      code: 'NY-GEO-G.GMD.3',
      standard: 'Geometric Measurement & Dimension',
      description: 'Use volume formulas for cylinders, pyramids, cones, and spheres to solve problems.',
      remediation: 'Practice area formulas, 3-D volume/surface area, density problems.',
    },
  },

  'life-science': {
    'Cell Biology': {
      code: 'LS-HS-LS1-1',
      standard: 'Cell Structure & Function',
      description: 'Construct an explanation based on evidence for how the structure of DNA determines the structure of proteins.',
      remediation: 'Review cell organelles, cell theory, cell types (prokaryote vs. eukaryote), and cellular respiration.',
    },
    'Genetics': {
      code: 'LS-HS-LS3-1',
      standard: 'Heredity',
      description: 'Ask questions to clarify relationships about the role of DNA and chromosomes in coding the instructions for characteristic traits.',
      remediation: 'Re-teach Mendelian genetics, meiosis, gene expression, mutations.',
    },
    'Evolution': {
      code: 'LS-HS-LS4-2',
      standard: 'Natural Selection & Evolution',
      description: 'Construct an explanation based on evidence that the process of evolution primarily results from natural selection acting on variation.',
      remediation: 'Review natural selection, adaptation, speciation, phylogenetics.',
    },
    'Ecology': {
      code: 'LS-HS-LS2-2',
      standard: 'Ecosystems',
      description: 'Use mathematical representations to support and revise explanations based on evidence about factors affecting biodiversity and populations.',
      remediation: 'Focus on food webs, energy flow, biomes, biodiversity, human impacts.',
    },
    'Human Body': {
      code: 'LS-HS-LS1-3',
      standard: 'Human Body Systems',
      description: 'Plan and conduct an investigation to provide evidence that feedback mechanisms maintain homeostasis.',
      remediation: 'Review all body systems with emphasis on homeostasis and system interactions.',
    },
    'Reproduction': {
      code: 'LS-HS-LS1-4',
      standard: 'Reproduction & Development',
      description: 'Use a model to illustrate the role of cellular division and differentiation in producing and maintaining complex organisms.',
      remediation: 'Compare mitosis vs. meiosis, embryonic development, stem cells.',
    },
  },

  'english': {
    'Reading Literature': {
      code: 'NY-ELA-11-12-RL-1',
      standard: 'Key Ideas & Details',
      description: 'Cite strong and thorough textual evidence to support analysis of what the text says explicitly and what is inferred from the text.',
      remediation: 'Practice close reading, identifying theme, analyzing characterization, and textual evidence strategies.',
    },
    'Reading Informational': {
      code: 'NY-ELA-11-12-RI-6',
      standard: 'Craft & Structure',
      description: 'Determine an author\'s point of view or purpose in a text in which rhetoric is particularly effective.',
      remediation: 'Focus on central idea vs. theme, author\'s purpose, bias, and rhetorical devices.',
    },
    'Writing Argument': {
      code: 'NY-ELA-11-12-W-1',
      standard: 'Argument Writing',
      description: 'Write arguments to support claims with clear reasons and relevant evidence from multiple sources.',
      remediation: 'Practice thesis construction, evidence integration, counterargument, and transitions.',
    },
    'Language & Vocabulary': {
      code: 'NY-ELA-11-12-L-4',
      standard: 'Vocabulary Acquisition',
      description: 'Determine or clarify the meaning of unknown words using context clues, word parts, and references.',
      remediation: 'Review Greek/Latin roots, context clue strategies, figurative language, and connotation/denotation.',
    },
  },

  'global-history': {
    'Ancient Civilizations': {
      code: 'GH-9-1.1',
      standard: 'Development of Civilizations',
      description: 'Students investigate how early civilizations developed in response to geographic and environmental factors.',
      remediation: 'Review river valley civilizations, social structures, and rise of agriculture.',
    },
    'World Religions': {
      code: 'GH-9-2.1',
      standard: 'Belief Systems',
      description: 'Examine the development and spread of major world religions and ethical systems and their influence on culture.',
      remediation: 'Compare the Five Pillars of Islam, Four Noble Truths, Ten Commandments, Dharma concept.',
    },
    'Revolutions & Nationalism': {
      code: 'GH-10-5.1',
      standard: 'Political & Social Change',
      description: 'Analyze how political revolutions challenged existing power structures and inspired new ideologies.',
      remediation: 'Review causes of French, American, and Industrial Revolutions; nationalism movements.',
    },
    'Imperialism & Colonialism': {
      code: 'GH-10-6.1',
      standard: 'Imperialism',
      description: 'Evaluate the causes, impacts, and legacy of Western imperialism on colonized peoples.',
      remediation: 'Study "White Man\'s Burden," Berlin Conference, effects on Africa and Asia.',
    },
    'World Wars & Modern History': {
      code: 'GH-10-7.1',
      standard: 'Global Conflict',
      description: 'Analyze the causes and consequences of the World Wars, including the rise of totalitarianism.',
      remediation: 'Review WWI causes (MAIN), WWII ideologies, Holocaust, Cold War origins.',
    },
  },

  'us-history': {
    'Colonial & Revolutionary Era': {
      code: 'US-11-1.1',
      standard: 'Colonial America',
      description: 'Examine the economic, political, and social factors that led to the American Revolution.',
      remediation: 'Review colonial grievances, key events (Boston Massacre, Tea Party), Declaration principles.',
    },
    'Constitution & Early Republic': {
      code: 'US-11-2.1',
      standard: 'Constitutional Foundations',
      description: 'Analyze the debates at the Constitutional Convention and the compromises that shaped the U.S. Constitution.',
      remediation: 'Review Articles of Confederation weaknesses, Constitutional Convention compromises, Bill of Rights.',
    },
    'Civil War & Reconstruction': {
      code: 'US-11-4.1',
      standard: 'Sectionalism & Civil War',
      description: 'Evaluate the causes and consequences of the Civil War and the successes and failures of Reconstruction.',
      remediation: 'Review Missouri Compromise, Dred Scott, Lincoln-Douglas debates, Reconstruction Amendments.',
    },
    'Industrialization & Immigration': {
      code: 'US-11-5.1',
      standard: 'Industrialization',
      description: 'Analyze the social, political, and economic changes brought about by industrialization and immigration.',
      remediation: 'Study robber barons, labor unions, Progressive Era reforms, immigration push-pull factors.',
    },
    '20th Century America': {
      code: 'US-11-7.1',
      standard: 'Modern America',
      description: 'Analyze the major domestic and foreign policy challenges facing the United States in the 20th century.',
      remediation: 'Review New Deal, Cold War policy, Civil Rights Movement, Vietnam era.',
    },
  },
}

/**
 * Get the NYS standard for a given subject + topic.
 * Falls back to a generic entry if the topic isn't found.
 */
export function getNYSStandard(subject, topic) {
  const subjectMap = NYS_STANDARDS[subject] || {}
  return subjectMap[topic] || {
    code: 'NYS-NG',
    standard: 'Next Generation Standards',
    description: `Performance standards for ${topic} in the NYS curriculum.`,
    remediation: `Review ${topic} concepts and practice with Regents-style questions.`,
  }
}
