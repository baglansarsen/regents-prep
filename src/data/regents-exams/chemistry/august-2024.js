// Chemistry Regents — August 2024
export default {
  id: 'chem-august-2024',
  subject: 'chemistry',
  year: 2024,
  session: 'August',
  totalMinutes: 180,
  questions: [
    {
      number: 1,
      part: 'A',
      text: 'Which statement describes the wave-mechanical model of the atom?',
      choices: ['Electrons travel in definite circular orbits around the nucleus.', 'Electrons are located in orbitals, which are regions of most probable location.', 'The atom is a positive sphere with negative electrons embedded inside.', 'The nucleus contains both protons and electrons.'],
      topic: 'Atomic Structure',
      correct: 1,
      explanation: 'The wave-mechanical model describes electrons as being located in orbitals, which are defined as regions of most probable location, rather than definite circular orbits.',
      diveDeep: 'The wave-mechanical model (also called the electron cloud model) is the modern understanding of atomic structure. Unlike the Bohr model, which pictured electrons in fixed, circular orbits, this quantum model shows electrons in orbitals, which are mathematical probability regions where an electron is most likely to be found. A common distractor is Dalton\'s indivisible sphere or Thomson\'s plum pudding model.'
    },
    {
      number: 2,
      part: 'A',
      text: 'Two atoms that are isotopes of each other must have the same number of',
      choices: ['protons, but different numbers of neutrons', 'neutrons, but different numbers of protons', 'protons, but different numbers of electrons', 'neutrons, but different numbers of electrons'],
      topic: 'Atomic Structure',
      correct: 0,
      explanation: 'Isotopes are atoms of the same element that have the same number of protons but different numbers of neutrons, resulting in different mass numbers.',
      diveDeep: 'Isotopes are atoms of the same element, meaning they share the same number of protons (atomic number) and thus have the same chemical properties. However, they contain different numbers of neutrons, which gives them different physical masses. Be careful not to confuse isotopes with ions, which have the same number of protons but different numbers of electrons.'
    },
    {
      number: 3,
      part: 'A',
      text: 'Which physical phase change represents sublimation?',
      choices: ['CO2(s) → CO2(g)', 'H2O(l) → H2O(s)', 'NaCl(s) → NaCl(l)', 'NH3(g) → NH3(l)'],
      topic: 'Matter & Energy',
      correct: 0,
      explanation: 'Sublimation is the physical phase change in which a substance transitions directly from a solid to a gas, as represented by CO2(s) → CO2(g).',
      diveDeep: 'Sublimation occurs in substances with weak intermolecular forces and high vapor pressures, such as dry ice (solid carbon dioxide) or iodine, allowing them to vaporize directly from the solid phase without turning into a liquid first. The opposite process is deposition. Phase change equations are easily identified by looking at the state symbols (s, l, g) on each side of the reaction arrow.'
    },
    {
      number: 4,
      part: 'A',
      text: 'Which molecular structure represents a nonpolar molecule containing polar covalent bonds?',
      choices: ['H2O', 'NH3', 'CO2', 'HCl'],
      topic: 'Chemical Bonding',
      correct: 2,
      explanation: 'CO2 contains polar covalent bonds, but because the molecule is linear and symmetrical, the bond dipoles cancel out, making the overall molecule nonpolar.',
      diveDeep: 'Bond polarity is determined by the difference in electronegativity between the two bonded atoms. Molecule polarity, however, depends on molecular symmetry. In CO2, the electronegativity difference between C (2.6) and O (3.4) makes the C=O bonds polar covalent. However, because CO2 is a linear, symmetrical molecule, the two bond dipoles point in opposite directions and cancel out, leaving the molecule nonpolar.'
    },
    {
      number: 5,
      part: 'A',
      text: 'Under which conditions of temperature and pressure is a real gas behavior most similar to an ideal gas?',
      choices: ['low temperature and low pressure', 'low temperature and high pressure', 'high temperature and low pressure', 'high temperature and high pressure'],
      topic: 'Matter & Energy',
      correct: 2,
      explanation: 'Real gases behave most like ideal gases under high temperature and low pressure conditions, where intermolecular attractions and particle volume become negligible.',
      diveDeep: 'An ideal gas is a theoretical construct where gas particles have no volume and no attractive forces. Real gases behave most like ideal gases under high temperature (particles move too fast to attract each other) and low pressure (particles are too far apart to interact). Real gases deviate most from ideal behavior under high pressure and low temperature.'
    },
    {
      number: 6,
      part: 'A',
      text: 'Which parameters represent the values of standard temperature and pressure (STP) for gases?',
      choices: ['0°C and 101.3 kPa', '273°C and 1 atm', '298 K and 100 kPa', '0 K and 1 atm'],
      topic: 'Matter & Energy',
      correct: 0,
      explanation: 'According to Reference Table A, standard temperature and pressure (STP) for gases are defined as 0°C (273 K) and 101.3 kPa (1 atm).',
      diveDeep: 'Standard Temperature and Pressure (STP) parameters are essential references located on Table A of the Chemistry Reference Tables. Standard temperature is 273 K or 0°C, and standard pressure is 101.3 kPa or 1 atm. A common test trap is mixing temperature and pressure units, such as pairing 273°C with 1 atm, or using Celsius in gas law calculations where Kelvin is required.'
    },
    {
      number: 7,
      part: 'A',
      text: 'A chemical reaction has reached dynamic equilibrium when the',
      choices: ['concentrations of reactants and products are equal', 'rates of the forward and reverse reactions are equal', 'reactants are completely consumed', 'catalyst has been fully regenerated'],
      topic: 'Matter & Energy',
      correct: 1,
      explanation: 'Dynamic equilibrium is reached when the rates of the forward and reverse reactions become equal, keeping the concentrations of reactants and products constant.',
      diveDeep: 'At chemical equilibrium, the forward and reverse reactions occur at identical rates. Because the reactions are balanced, the concentrations of the reactants and products remain constant over time. A common trap is assuming that the concentrations of reactants and products must be equal; they only need to be constant. Remember: \'Rates are equal, concentrations are constant.\''
    },
    {
      number: 8,
      part: 'A',
      text: 'According to the Arrhenius theory, an acid is a substance that dissolves in water to yield which ion as the only positive ion?',
      choices: ['hydroxide (OH-)', 'hydride (H-)', 'hydrogen (H+)', 'oxide (O2-)'],
      topic: 'Matter & Energy',
      correct: 2,
      explanation: 'According to the Arrhenius theory, an acid is a substance that ionizes in water to produce hydrogen ions (H+ or hydronium, H3O+) as the only positive ions.',
      diveDeep: 'The Arrhenius theory defines acids by their behavior in water: they release hydrogen ions (H+), which immediately bond with water molecules to form hydronium ions (H3O+). This makes hydronium the only positive ion in an acidic solution. Arrhenius bases release hydroxide (OH-) as the only negative ion. Neutral salts yield other positive and negative ions, but not H+ or OH-.'
    },
    {
      number: 9,
      part: 'A',
      text: 'In a voltaic cell, reduction occurs at the electrode known as the',
      choices: ['anode', 'cathode', 'salt bridge', 'external wire'],
      topic: 'Chemical Bonding',
      correct: 1,
      explanation: 'In all electrochemical cells, reduction occurs at the cathode (Red Cat), which is the electrode where electrons are gained.',
      diveDeep: 'In all electrochemical cells, oxidation occurs at the anode and reduction occurs at the cathode. The cathode is the site where chemical species gain electrons. To remember this, use the mnemonics \'An Ox\' (Anode = Oxidation) and \'Red Cat\' (Reduction = Cathode). In a voltaic cell, the cathode is the positive electrode, while in an electrolytic cell, it is the negative electrode.'
    },
    {
      number: 10,
      part: 'A',
      text: 'Which reaction type represents the reaction of an organic acid and an alcohol to produce an ester and water?',
      choices: ['saponification', 'esterification', 'polymerization', 'fermentation'],
      topic: 'Organic Chemistry',
      correct: 1,
      explanation: 'Esterification is the organic reaction in which an organic acid reacts with an alcohol to produce an ester and water.',
      diveDeep: 'Esterification is a condensation reaction where a carboxylic acid and an alcohol combine in the presence of an acid catalyst. The reaction removes a water molecule (dehydration) and joins the remaining fragments with an ester linkage (-COO-). Esters are known for their pleasant, fruity odors. The opposite reaction, which breaks down an ester using a base to make soap, is saponification.'
    },
    {
      number: 11,
      part: 'A',
      text: 'Which subatomic particle has a mass of approximately 1 amu and no charge?',
      choices: ['proton', 'neutron', 'electron', 'positron'],
      topic: 'Atomic Structure',
      correct: 1,
      explanation: 'A neutron is a subatomic particle located in the nucleus that has a mass of approximately 1 amu and no electrical charge.',
      diveDeep: 'An atom is composed of protons, neutrons, and electrons. Protons (+1 charge) and neutrons (neutral) both have a mass of approximately 1 amu and reside in the nucleus, contributing to nearly all of the atom\'s mass. Electrons have a -1 charge and negligible mass (~1/1836 amu) and orbit the nucleus. Positrons are antimatter particles with a +1 charge and negligible mass.'
    },
    {
      number: 12,
      part: 'A',
      text: 'What represents the number of protons in an atom?',
      choices: ['mass number', 'atomic number', 'valence number', 'oxidation number'],
      topic: 'Atomic Structure',
      correct: 1,
      explanation: 'The atomic number represents the number of protons in the nucleus of an atom, defining the identity of the element.',
      diveDeep: 'The atomic number is the defining characteristic of an element and equals the number of protons in the nucleus of any atom of that element. On the Periodic Table, elements are arranged in order of increasing atomic number. Mass number is the sum of protons and neutrons, while oxidation number represents the charge of an ion. Always use the atomic number to identify an element.'
    },
    {
      number: 13,
      part: 'A',
      text: 'Which element is classified as a metalloid on the Periodic Table?',
      choices: ['silicon', 'sodium', 'sulfur', 'copper'],
      topic: 'Periodic Table',
      correct: 0,
      explanation: 'Silicon (Si) is classified as a metalloid on the Periodic Table because it lies along the stair-step line and exhibits properties of both metals and nonmetals.',
      diveDeep: 'Metalloids (or semi-metals) are elements that lie along the bold, stair-step line on the Periodic Table (B, Si, Ge, As, Sb, Te). They display intermediate properties between metals and nonmetals. Silicon (Si) is a classic metalloid used as a semiconductor. Sodium (Na) is a Group 1 metal, sulfur (S) is a Group 16 nonmetal, and copper (Cu) is a transition metal.'
    },
    {
      number: 14,
      part: 'A',
      text: 'As the elements of Group 1 are considered from top to bottom, atomic radius',
      choices: ['decreases', 'increases', 'remains the same', 'increases, then decreases'],
      topic: 'Periodic Table',
      correct: 1,
      explanation: 'Going down Group 1, atomic radius increases because each successive element has an additional occupied electron shell, increasing the distance from the nucleus.',
      diveDeep: 'Going down Group 1, atomic radius increases. With each successive row, a new principal energy level (electron shell) is added. Although the nuclear charge increases, the inner electron shells shield the outer valence electrons from the nucleus, causing the atom to expand. Across a period, atomic radius decreases because electrons are added to the same shell while nuclear charge increases, pulling them tighter.'
    },
    {
      number: 15,
      part: 'A',
      text: 'Which element is classified as a noble gas?',
      choices: ['nitrogen', 'oxygen', 'neon', 'fluorine'],
      topic: 'Periodic Table',
      correct: 2,
      explanation: 'Neon (Ne) is located in Group 18 of the Periodic Table, which comprises the noble gases.',
      diveDeep: 'Noble gases belong to Group 18 on the Periodic Table and have complete valence shells (a stable octet, or duet for helium). This configuration makes them extremely unreactive and monatomic under standard conditions. Neon (Ne) is a noble gas, while nitrogen (Group 15), oxygen (Group 16), and fluorine (Group 17) are highly reactive diatomic nonmetals.'
    },
    {
      number: 16,
      part: 'A',
      text: 'Which type of bond is formed by the attraction between a lattice of positive ions and mobile electrons?',
      choices: ['ionic bond', 'covalent bond', 'metallic bond', 'hydrogen bond'],
      topic: 'Chemical Bonding',
      correct: 2,
      explanation: 'Metallic bonding is defined as the attraction between a lattice of positive metal ions and a surrounding sea of mobile valence electrons.',
      diveDeep: 'Metallic bonding is found in pure metals and alloys. It is characterized by positive metal ions held in a fixed lattice, surrounded by a highly mobile, shared pool of valence electrons (often called a \'sea of mobile electrons\'). This mobility of electrons explains why metals are excellent conductors of electricity and heat, and why they can be hammered into sheets (malleable) or drawn into wires (ductile).'
    },
    {
      number: 17,
      part: 'A',
      text: 'The sharing of two pairs of electrons between two atoms represents a',
      choices: ['single covalent bond', 'double covalent bond', 'triple covalent bond', 'ionic bond'],
      topic: 'Chemical Bonding',
      correct: 1,
      explanation: 'The sharing of two pairs (four electrons total) of electrons between two atoms constitutes a double covalent bond.',
      diveDeep: 'Covalent bonds involve the sharing of valence electrons between nonmetals to achieve stable configurations. A single covalent bond involves sharing one pair (2 electrons), a double covalent bond shares two pairs (4 electrons), and a triple covalent bond shares three pairs (6 electrons). The sharing of electrons is shown in Lewis electron-dot structures, where each shared pair can be represented by a line.'
    },
    {
      number: 18,
      part: 'A',
      text: 'Which molecule has a symmetrical, nonpolar shape?',
      choices: ['H2O', 'NH3', 'CH4', 'HCl'],
      topic: 'Chemical Bonding',
      correct: 2,
      explanation: 'Methane (CH4) has a tetrahedral, symmetrical shape that causes its polar bonds to cancel out, resulting in a nonpolar molecule.',
      diveDeep: 'Methane (CH4) contains four polar covalent C-H bonds. Because the carbon atom is bonded to four identical hydrogen atoms in a perfectly symmetrical tetrahedral shape, the individual bond polarities cancel each other out, making the overall molecule nonpolar. Water (H2O) and ammonia (NH3) are asymmetrical (bent and pyramidal, respectively) and are highly polar, while HCl is a linear, asymmetrical polar molecule.'
    },
    {
      number: 19,
      part: 'A',
      text: 'Which state of matter contains particles that are highly disordered and occupy all available space?',
      choices: ['solid', 'liquid', 'gas', 'solution'],
      topic: 'Matter & Energy',
      correct: 2,
      explanation: 'Gases contain particles that are highly disordered, move in constant random motion, and expand to occupy all available space in a container.',
      diveDeep: 'In a gas, the intermolecular forces of attraction are very weak, allowing the particles to move freely in all directions. Because of this high kinetic energy and minimal attraction, gas particles are highly disordered and will expand or compress to completely fill both the shape and volume of any container. Solids have fixed shape and volume; liquids have definite volume but indefinite shape.'
    },
    {
      number: 20,
      part: 'A',
      text: 'Which process represents deposition?',
      choices: ['liquid to solid', 'gas to solid', 'solid to gas', 'gas to liquid'],
      topic: 'Matter & Energy',
      correct: 1,
      explanation: 'Deposition is the phase change in which a gas transitions directly into a solid, bypassing the liquid phase.',
      diveDeep: 'Deposition is the phase change from gas directly to solid, bypassing the liquid state. This occurs when a gas is cooled rapidly or when its pressure is below the triple point. An everyday example is the formation of frost on a cold window or windowpane. Sublimation is the opposite endothermic process (solid to gas). Condensation is gas to liquid, and freezing is liquid to solid.'
    },
    {
      number: 21,
      part: 'A',
      text: 'What represents the average kinetic energy of the molecules in a gas sample?',
      choices: ['volume', 'pressure', 'temperature', 'molarity'],
      topic: 'Matter & Energy',
      correct: 2,
      explanation: 'Temperature is a direct measure of the average kinetic energy of the particles in a sample of matter.',
      diveDeep: 'Temperature is defined as a measure of the average kinetic energy of the particles in a sample. As temperature increases, the particles move faster, increasing their kinetic energy. Potential energy refers to stored energy (such as in chemical bonds or phase changes). The heat of fusion and activation energy are specific energy quantities associated with phase changes and chemical reactions, respectively.'
    },
    {
      number: 22,
      part: 'A',
      text: 'A reaction in which energy is released is classified as',
      choices: ['endothermic', 'exothermic', 'synthesis', 'decomposition'],
      topic: 'Matter & Energy',
      correct: 1,
      explanation: 'An exothermic reaction is one in which energy is released to the surroundings, resulting in a negative change in enthalpy (-ΔH).',
      diveDeep: 'In an exothermic reaction, the potential energy of the reactants is higher than that of the products. The difference in energy is released as heat to the surroundings. The heat of reaction (ΔH) is negative: ΔH = PE(products) - PE(reactants). In an endothermic reaction, energy is absorbed (+ΔH). Synthesis and decomposition refer to structural changes of the substances, not energy flow.'
    },
    {
      number: 23,
      part: 'A',
      text: 'Which functional group represents an alcohol?',
      choices: ['-OH', '-COOH', '-CO-', '-CHO'],
      topic: 'Organic Chemistry',
      correct: 0,
      explanation: '-OH (the hydroxyl group) is the functional group that represents an alcohol.',
      diveDeep: 'Functional groups (found on Table R) determine the chemical reactivity and class of organic compounds. The hydroxyl group (-OH) characterizes alcohols, such as methanol and ethanol. The carboxyl group (-COOH) represents organic acids, the carbonyl group (-CO-) represents ketones, and the formyl group (-CHO) represents aldehydes. Do not confuse the organic hydroxyl group with the inorganic hydroxide ion (OH-).'
    },
    {
      number: 24,
      part: 'A',
      text: 'Which reaction combines small molecules into larger chains called polymers?',
      choices: ['saponification', 'esterification', 'polymerization', 'fermentation'],
      topic: 'Organic Chemistry',
      correct: 2,
      explanation: 'Polymerization is the organic reaction in which small monomer molecules are chemically combined to form long chains called polymers.',
      diveDeep: 'Polymerization is the process of linking many small repeating units (monomers) together via covalent bonds to form giant macromolecules called polymers. This can occur via addition (opening double bonds in alkenes) or condensation (releasing small molecules like water). Saponification produces soap, esterification produces esters, and fermentation breaks down sugars into alcohol and carbon dioxide.'
    },
    {
      number: 25,
      part: 'A',
      text: 'In an electrochemical cell, the salt bridge is used to',
      choices: ['allow the flow of electrons', 'allow the migration of ions', 'increase the rate of reaction', 'separate the reactants physically'],
      topic: 'Chemical Bonding',
      correct: 1,
      explanation: 'In an electrochemical cell, the salt bridge is used to allow the migration of ions, maintaining electrical neutrality in both half-cells.',
      diveDeep: 'An operating electrochemical cell requires a closed circuit. While electrons travel through the external metallic wire, the salt bridge completes the circuit internally by permitting the migration of ions between the two half-cells. Anions migrate toward the anode to balance the build-up of positive charge, and cations migrate toward the cathode. Without a salt bridge, charge would build up and the reaction would stop immediately.'
    },
    {
      number: 26,
      part: 'A',
      text: 'An Arrhenius acid is a substance that produces which positive ion in water?',
      choices: ['hydroxide', 'hydronium', 'hydride', 'ammonium'],
      topic: 'Matter & Energy',
      correct: 1,
      explanation: 'An Arrhenius acid yields hydronium ions (H3O+, formed when H+ associates with water) as the only positive ions in aqueous solution.',
      diveDeep: 'In water, free hydrogen ions (H+, which are single protons) are highly reactive and immediately coordinate with water molecules to form hydronium ions (H3O+): H+ + H2O → H3O+. Under the Arrhenius theory, these are the only positive ions produced when an acid dissolves in water. Hydroxide (OH-) is the only negative ion produced by Arrhenius bases, and hydride (H-) and ammonium (NH4+) are different chemical species.'
    },
    {
      number: 27,
      part: 'A',
      text: 'Neutralization is a double replacement reaction between',
      choices: ['an acid and a salt', 'an acid and a base', 'a base and a metal', 'two acidic solutions'],
      topic: 'Matter & Energy',
      correct: 1,
      explanation: 'Neutralization is a double replacement reaction between an acid and a base, producing a salt and water.',
      diveDeep: 'Neutralization is an acid-base double replacement reaction. The H+ ions from the acid react with the OH- ions from the base to form water (H2O), while the remaining spectator ions form an ionic salt. For example, HCl + NaOH → NaCl + H2O. Since both compounds swap partners, it is classified as a double replacement reaction, not a single replacement or synthesis.'
    },
    {
      number: 28,
      part: 'A',
      text: 'Which radioisotope is used to diagnose thyroid disorders?',
      choices: ['Carbon-14', 'Iodine-131', 'Uranium-238', 'Cobalt-60'],
      topic: 'Atomic Structure',
      correct: 1,
      explanation: 'Iodine-131 is a radioisotope used in nuclear medicine to diagnose and treat thyroid disorders.',
      diveDeep: 'The thyroid gland requires iodine to synthesize hormones. Radioactive Iodine-131 is administered to patients to trace thyroid function or destroy overactive thyroid tissue. Other radioisotopes have distinct uses: Carbon-14 is for dating organic remains, Cobalt-60 is for cancer radiation therapy, and Uranium-238 is for geological dating of rocks. Memorizing this list is a common Regents strategy.'
    },
    {
      number: 29,
      part: 'A',
      text: 'Which nuclear emission consists of high-energy electromagnetic waves?',
      choices: ['alpha particle', 'beta particle', 'gamma ray', 'positron'],
      topic: 'Atomic Structure',
      correct: 2,
      explanation: 'Gamma rays are high-energy electromagnetic waves that carry no mass or charge.',
      diveDeep: 'Gamma radiation (γ) is a form of high-energy electromagnetic radiation emitted from an unstable nucleus. It has no mass and no electrical charge, giving it extremely high penetrating power. Alpha particles (helium nuclei) and beta particles/positrons (electrons/positrons) have mass and charge, which makes them easier to shield. Gamma rays require heavy lead or thick concrete to be absorbed.'
    },
    {
      number: 30,
      part: 'A',
      text: 'What nuclear process involves the splitting of a heavy nucleus into two lighter nuclei?',
      choices: ['fusion', 'fission', 'alpha decay', 'artificial transmutation'],
      topic: 'Atomic Structure',
      correct: 1,
      explanation: 'Fission is the nuclear process in which a heavy nucleus splits into two lighter nuclei of comparable mass, releasing a large amount of energy.',
      diveDeep: 'Nuclear fission is the splitting of a heavy, unstable nucleus (such as U-235) into smaller, more stable nuclei after absorbing a neutron. This process releases a massive amount of energy along with additional neutrons that can trigger a chain reaction. Fusion is the joining of light nuclei, alpha decay is a type of natural decay, and artificial transmutation is bombarding a nucleus to change its identity.'
    },
    {
      number: 31,
      part: 'B-1',
      text: 'What is the average atomic mass of a sample of an element consisting of 90.% isotope X (mass 20. amu) and 10.% isotope Y (mass 22. amu)?',
      choices: ['20.0 amu', '20.2 amu', '21.0 amu', '22.0 amu'],
      topic: 'Atomic Structure',
      correct: 1,
      explanation: 'The average atomic mass is calculated as a weighted average: (0.90 × 20. amu) + (0.10 × 22. amu) = 18.0 + 2.2 = 20.2 amu.',
      diveDeep: 'To calculate the average atomic mass of an element, multiply the mass of each isotope by its relative abundance (expressed as a decimal) and add the products together: (20. amu × 0.90) + (22. amu × 0.10) = 18.0 amu + 2.2 amu = 20.2 amu. The average atomic mass is a weighted average and will always be closest to the mass of the isotope with the highest abundance (isotope X).'
    },
    {
      number: 32,
      part: 'B-1',
      text: 'Which electron configuration represents a sodium ion (Na+) in the ground state?',
      choices: ['2-8', '2-8-1', '2-8-2', '2-7'],
      topic: 'Atomic Structure',
      correct: 0,
      explanation: 'A neutral sodium atom has 11 electrons (configuration 2-8-1). A Na+ ion has lost its single valence electron, leaving 10 electrons with a ground state configuration of 2-8.',
      diveDeep: 'A neutral sodium atom (Na) has 11 protons and 11 electrons, with a ground state configuration of 2-8-1. To achieve a stable octet, it loses its single valence electron from the outermost shell to form a Na+ ion. The resulting sodium ion has 10 electrons and a ground state configuration of 2-8, which is identical to the configuration of neon. Metal cations are always smaller than their neutral atoms.'
    },
    {
      number: 33,
      part: 'B-1',
      text: 'What represents the empirical formula for the compound C6H6?',
      choices: ['CH', 'C2H2', 'C6H6', 'CH2'],
      topic: 'Chemical Bonding',
      correct: 0,
      explanation: 'The molecular formula C6H6 can be simplified by dividing the subscripts by 6, yielding the simplest whole-number ratio: the empirical formula CH.',
      diveDeep: 'An empirical formula represents the simplest, reduced ratio of elements in a compound. For benzene (C6H6), both subscripts are divisible by 6, which reduces the carbon-to-hydrogen ratio to 1:1, or CH. C2H2 is acetylene (which also has the empirical formula CH but is a different molecular formula), and CH2 is the empirical formula for alkenes like C2H4.'
    },
    {
      number: 34,
      part: 'B-1',
      text: 'Based on Reference Table F, which compound is insoluble in water?',
      choices: ['AgNO3', 'BaSO4', 'Li2CO3', 'CaCl2'],
      topic: 'Periodic Table',
      correct: 1,
      explanation: 'According to Reference Table F, most sulfates are soluble, but barium sulfate (BaSO4) is an exception and is insoluble in water.',
      diveDeep: 'Reference Table F lists the solubility guidelines. According to Table F, sulfate (SO4^2-) compounds are soluble in water except when combined with Ca2+, Sr2+, Ba2+, or Pb2+. Because barium (Ba2+) is an exception, barium sulfate (BaSO4) is insoluble and forms a precipitate in water. AgNO3, Li2CO3, and CaCl2 are soluble based on Table F rules.'
    },
    {
      number: 35,
      part: 'B-1',
      text: 'According to Reference Table G, which solute decreases in solubility as temperature increases?',
      choices: ['KNO3', 'NaCl', 'HCl', 'NH4Cl'],
      topic: 'Matter & Energy',
      correct: 2,
      explanation: 'According to Table G, gases (like HCl) decrease in solubility as temperature increases, whereas the solubility of most solids increases with temperature.',
      diveDeep: 'The solubility of gases in liquids decreases as the temperature increases because the gas molecules gain kinetic energy and escape from the solvent. HCl is a gas at STP, so its solubility decreases as temperature rises (its curve on Table G has a negative slope). Solid solutes (like KNO3, NaCl, and NH4Cl) generally increase in solubility as temperature increases (positive slopes on Table G).'
    },
    {
      number: 36,
      part: 'B-1',
      text: 'What is the concentration of a solution containing 2.0 moles of solute in 4.0 liters of solution?',
      choices: ['0.50 M', '2.0 M', '4.0 M', '8.0 M'],
      topic: 'Matter & Energy',
      correct: 0,
      explanation: 'Molarity is moles of solute per liter of solution: 2.0 moles / 4.0 liters = 0.50 M.',
      diveDeep: 'Molarity (M) is the concentration of a solution expressed as the number of moles of solute dissolved per liter of solution. Use the formula Molarity = moles of solute / liters of solution. Substituting the values: M = 2.0 moles / 4.0 liters = 0.50 M. A common mistake is multiplying the values instead of dividing. Always check your units.'
    },
    {
      number: 37,
      part: 'B-1',
      text: 'What is the total mass of 3.0 moles of Carbon dioxide (CO2)?',
      choices: ['44 g', '88 g', '132 g', '176 g'],
      topic: 'Chemical Bonding',
      correct: 2,
      explanation: 'The molar mass of CO2 is 12 + 2(16) = 44 g/mol. The total mass of 3.0 moles is: 3.0 moles × 44 g/mol = 132 g.',
      diveDeep: 'The gram-formula mass of carbon dioxide (CO2) is calculated using the atomic masses on the Periodic Table: (1 × 12.011 g/mol for C) + (2 × 15.999 g/mol for O) = 44.0 g/mol. Using the formula from Table T, mass = moles × gram-formula mass = 3.0 moles × 44.0 g/mol = 132 g. Make sure to calculate the molar mass first before multiplying by the moles.'
    },
    {
      number: 38,
      part: 'B-1',
      text: 'A gas occupies 2.0 liters at 300. K. If the temperature is raised to 600. K at constant pressure, the new volume will be',
      choices: ['1.0 L', '2.0 L', '4.0 L', '8.0 L'],
      topic: 'Matter & Energy',
      correct: 2,
      explanation: 'According to Charles\'s Law, volume is directly proportional to Kelvin temperature. Raising the temperature from 300. K to 600. K (doubling it) doubles the volume from 2.0 L to 4.0 L.',
      diveDeep: 'Charles\'s Law states that the volume of a gas is directly proportional to its absolute temperature in Kelvin (V1/T1 = V2/T2) when pressure is held constant. Raising the temperature from 300. K to 600. K represents a doubling of the temperature. Consequently, the volume of the gas doubles from 2.0 L to 4.0 L. Always convert Celsius to Kelvin before calculating gas behaviors.'
    },
    {
      number: 39,
      part: 'B-1',
      text: 'How much heat is required to melt 20.0 grams of ice completely at 0°C? (Heat of fusion of H2O = 334 J/g)',
      choices: ['16.7 J', '334 J', '6680 J', '45200 J'],
      topic: 'Matter & Energy',
      correct: 2,
      explanation: 'Using the heat of fusion formula q = mHf: q = 20.0 g × 334 J/g = 6680 J.',
      diveDeep: 'When water melts (solid to liquid), it undergoes a phase change where temperature remains constant at 0°C. The energy required is calculated using the heat of fusion formula: q = mHf. For water, the heat of fusion (Hf) is 334 J/g (Reference Table B). Substituting: q = 20.0 g × 334 J/g = 6680 J. Use heat of vaporization (Hv) only for boiling or condensing.'
    },
    {
      number: 40,
      part: 'B-1',
      text: 'Based on Reference Table H, what is the vapor pressure of propanone at 50°C?',
      choices: ['30 kPa', '60 kPa', '82 kPa', '101 kPa'],
      topic: 'Matter & Energy',
      correct: 2,
      explanation: 'According to Reference Table H, finding 50°C on the x-axis and moving vertically to the propanone curve yields a vapor pressure of approximately 82 kPa.',
      diveDeep: 'Reference Table H plots vapor pressure against temperature for four liquids. To find the vapor pressure of propanone at 50°C, locate 50°C on the horizontal axis and follow it vertically to the propanone curve. Moving horizontally to the vertical axis yields a vapor pressure of approximately 82 kPa. Note that the normal boiling point is where a curve intersects 101.3 kPa.'
    },
    {
      number: 41,
      part: 'B-1',
      text: 'What type of reaction is represented by the equation: Mg + 2HCl → MgCl2 + H2?',
      choices: ['synthesis', 'decomposition', 'single replacement', 'double replacement'],
      topic: 'Chemical Bonding',
      correct: 2,
      explanation: 'In the reaction Mg + 2HCl → MgCl2 + H2, the more active metal magnesium replaces hydrogen in the acid, representing a single replacement reaction.',
      diveDeep: 'In a single replacement reaction, an active element reacts with a compound and replaces one of its elements. According to Table J, magnesium (Mg) is higher on the activity series than hydrogen, so it spontaneously displaces hydrogen from HCl to form MgCl2 and hydrogen gas. Double replacement involves two compounds swapping ions, while synthesis combines elements into one product.'
    },
    {
      number: 42,
      part: 'B-1',
      text: 'A catalyst increases the rate of reaction by providing a pathway with a lower',
      choices: ['activation energy', 'potential energy of reactants', 'potential energy of products', 'heat of reaction'],
      topic: 'Matter & Energy',
      correct: 0,
      explanation: 'A catalyst provides an alternative reaction pathway with a lower activation energy, speeding up the rate of both forward and reverse reactions.',
      diveDeep: 'A catalyst provides an alternative pathway with a lower activation energy, which speeds up both the forward and reverse reaction rates by allowing more reactant collisions to have sufficient energy. It does not alter the potential energy of the reactants or the products, meaning the overall heat of reaction (ΔH) remains completely unchanged on a potential energy diagram.'
    },
    {
      number: 43,
      part: 'B-1',
      text: 'What represents the IUPAC name for CH3OH?',
      choices: ['methanol', 'ethanol', 'propanol', 'butanol'],
      topic: 'Organic Chemistry',
      correct: 0,
      explanation: 'CH3OH contains one carbon atom (prefix "meth-") with single bonds and an alcohol group (-OH), giving it the IUPAC name methanol.',
      diveDeep: 'Organic compounds are named according to IUPAC rules using Table P and Table R. A single carbon atom uses the prefix \'meth-\'. Since all bonds are single, the base name is methane. The hydroxyl group (-OH) indicates an alcohol, replacing the \'-e\' ending of the alkane with \'-ol\' to yield methanol. Ethanol has two carbons, propanol has three, and butanol has four.'
    },
    {
      number: 44,
      part: 'B-1',
      text: 'What is the oxidation number of manganese in KMnO4?',
      choices: ['+2', '+4', '+6', '+7'],
      topic: 'Chemical Bonding',
      correct: 3,
      explanation: 'In KMnO4, potassium is +1 and each oxygen is -2 (total -8). For the compound to be neutral, manganese must have an oxidation number of +7.',
      diveDeep: 'In a neutral compound, the sum of all oxidation numbers must be zero. In KMnO4, potassium (K) is a Group 1 metal with an oxidation number of +1, and each oxygen (O) is -2 (total -8). Let x be the oxidation number of manganese: +1 + x + 4(-2) = 0 → x - 7 = 0 → x = +7. Manganese is in its highest oxidation state here.'
    },
    {
      number: 45,
      part: 'B-1',
      text: 'In an operating electrolytic cell, oxidation occurs at the electrode called the',
      choices: ['anode', 'cathode', 'salt bridge', 'external wire'],
      topic: 'Chemical Bonding',
      correct: 0,
      explanation: 'In both voltaic and electrolytic cells, oxidation always occurs at the anode (An Ox).',
      diveDeep: 'An electrolytic cell uses electrical energy to drive a non-spontaneous chemical change. The power source pumps electrons to the cathode (making it negative), where reduction occurs. Electrons are pulled from the anode (making it positive), where oxidation occurs. Remember that oxidation always occurs at the anode (An Ox) in all cells, both voltaic and electrolytic.'
    },
    {
      number: 46,
      part: 'B-1',
      text: 'Which pH represents an acidic solution?',
      choices: ['3.0', '7.0', '9.0', '14.0'],
      topic: 'Matter & Energy',
      correct: 0,
      explanation: 'A pH value below 7.0 is acidic. Among the choices, 3.0 is the only acidic pH value.',
      diveDeep: 'The pH scale is a measure of the acidity or basicity of a solution. A pH of 7.0 is neutral. Acidic solutions have pH values below 7.0, and basic solutions have pH values above 7.0. A pH of 3.0 is acidic. A pH of 9.0 or 14.0 represents basic solutions, and a pH of 7.0 is neutral. A lower pH indicates a higher concentration of hydronium ions.'
    },
    {
      number: 47,
      part: 'B-1',
      text: 'What is the hydronium ion concentration in a solution with a pH of 4.0?',
      choices: ['1.0 x 10^-4 M', '1.0 x 10^-10 M', '1.0 x 10^4 M', '4.0 M'],
      topic: 'Matter & Energy',
      correct: 0,
      explanation: 'The hydronium ion concentration is related to pH by [H3O+] = 10^-pH. For a pH of 4.0, [H3O+] = 1.0 × 10^-4 M.',
      diveDeep: 'The pH is defined as the negative logarithm of the hydronium ion concentration: pH = -log[H3O+]. This can be rearranged to find the concentration: [H3O+] = 10^-pH. For a solution with a pH of 4.0, the hydronium ion concentration is 1.0 × 10^-4 M. Each decrease of 1.0 pH unit represents a tenfold increase in hydronium concentration.'
    },
    {
      number: 48,
      part: 'B-1',
      text: 'If 20.0 mL of 1.0 M HCl is neutralized by 10.0 mL of NaOH, what is the concentration of the NaOH?',
      choices: ['0.50 M', '1.0 M', '2.0 M', '4.0 M'],
      topic: 'Matter & Energy',
      correct: 2,
      explanation: 'Using the titration equation MaVa = MbVb: (1.0 M)(20.0 mL) = (Mb)(10.0 mL) → Mb = 2.0 M.',
      diveDeep: 'The titration formula MaVa = MbVb represents the neutralization equivalence point, where the moles of H+ ions equal the moles of OH- ions. Substituting the given values: (1.0 M HCl)(20.0 mL) = (Mb KOH)(10.0 mL). Solving for Mb: Mb = (1.0 × 20.0) / 10.0 = 2.0 M. Because the volume of base is half the volume of acid, the base must be twice as concentrated.'
    },
    {
      number: 49,
      part: 'B-1',
      text: 'A sample of Co-60 decays until only 12.5% of the original mass remains. If the half-life of Co-60 is 5.3 years, how much time has elapsed?',
      choices: ['5.3 years', '10.6 years', '15.9 years', '21.2 years'],
      topic: 'Atomic Structure',
      correct: 2,
      explanation: 'Decaying until 12.5% remains represents three half-lives (100% → 50% → 25% → 12.5%). The total time elapsed is: 3 × 5.3 years = 15.9 years.',
      diveDeep: 'A radioisotope decays by half each half-life. A sample decaying until 12.5% remains has undergone three half-lives: 100% → 50% (1 half-life) → 25% (2 half-lives) → 12.5% (3 half-lives). Since the half-life of Co-60 is 5.3 years, the total elapsed time is calculated by multiplying the number of half-lives by the half-life duration: 3 × 5.3 years = 15.9 years.'
    },
    {
      number: 50,
      part: 'B-1',
      text: 'Which equation represents artificial transmutation?',
      choices: ['14N + 4He → 17O + 1H', '14C → 14N + 0e-', '226Ra → 222Rn + 4He', '235U + 1n → 142Ba + 91Kr + 3 1n'],
      topic: 'Atomic Structure',
      correct: 0,
      explanation: 'Artificial transmutation involves bombarding a stable nucleus with a high-energy particle to force a nuclear change, represented by two reactants on the left side: 14N + 4He → 17O + 1H.',
      diveDeep: 'Natural transmutation is spontaneous radioactive decay involving a single reactant nucleus (like alpha or beta decay). Artificial transmutation involves a non-spontaneous nuclear change forced by bombarding a nucleus with a high-energy particle, represented by two reactants on the left side of the equation (a target nucleus and a projectile particle), as seen in 14N + 4He → 17O + 1H.'
    }
  ]
};
