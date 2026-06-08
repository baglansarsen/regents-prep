// Chemistry Regents — June 2023
export default {
  id: 'chem-june-2023',
  subject: 'chemistry',
  year: 2023,
  session: 'June',
  totalMinutes: 180,
  questions: [
    {
      number: 1,
      part: 'A',
      text: 'Which subatomic particle has a charge of +1 and a mass of approximately 1 amu?',
      choices: ['proton', 'neutron', 'electron', 'positron'],
      topic: 'Atomic Structure',
      correct: 0,
      explanation: 'A proton has a charge of +1 and a mass of approximately 1 amu, making option 1 the correct answer.',
      diveDeep: 'Protons and neutrons are the two nucleons residing in the nucleus. A proton has a +1 elementary charge and a mass of ~1 amu. A neutron has a neutral charge (0) and a mass of ~1 amu. Electrons have a −1 charge and negligible mass (~1/1836 amu), whereas positrons are antimatter particles with a +1 charge but negligible mass. Remembering these core properties of subatomic particles is essential for atomic structure questions on the Regents exam.'
    },
    {
      number: 2,
      part: 'A',
      text: 'What is the total number of valence electrons in an atom of oxygen in the ground state?',
      choices: ['2', '4', '6', '8'],
      topic: 'Atomic Structure',
      correct: 2,
      explanation: 'Oxygen is in Group 16 of the Periodic Table, which means it has 6 valence electrons in its outermost shell.',
      diveDeep: 'Valence electrons are the electrons in the outermost energy level of an atom, which determine its chemical reactivity. For Group 13–18 elements, the number of valence electrons corresponds to the group number minus 10 (or the ones digit of the group number). Since oxygen is in Group 16, it has 6 valence electrons (electron configuration 2-6). A common student error is selecting the total number of electrons (8) instead of just the valence electrons (6).'
    },
    {
      number: 3,
      part: 'A',
      text: 'All isotopes of an element must have the same number of',
      choices: ['protons, but different number of neutrons', 'neutrons, but different number of protons', 'protons, but different number of electrons', 'electrons, but different number of protons'],
      topic: 'Atomic Structure',
      correct: 0,
      explanation: 'Isotopes are atoms of the same element (same number of protons) that have different masses due to a different number of neutrons.',
      diveDeep: 'By definition, the identity of an element is determined solely by its atomic number (number of protons). Isotopes of the same element share this atomic number but differ in mass number because they contain different numbers of neutrons. In neutral atoms, the number of electrons equals the number of protons, so neutral isotopes also have the same electron configuration. A key test strategy is to remember that isotopes equal same protons, different neutrons.'
    },
    {
      number: 4,
      part: 'A',
      text: 'Which element is classified as a noble gas?',
      choices: ['fluorine', 'neon', 'nitrogen', 'oxygen'],
      topic: 'Periodic Table',
      correct: 1,
      explanation: 'Neon is located in Group 18 of the Periodic Table, which consists of the noble gases.',
      diveDeep: 'Noble gases (Group 18) are characterized by having a full valence shell (octet), making them extremely stable and chemically unreactive under standard conditions. Fluorine is a halogen (Group 17), while nitrogen (Group 15) and oxygen (Group 16) are reactive nonmetals. Knowing the group names on the Periodic Table (alkali metals, alkaline earth metals, halogens, noble gases) is highly testable.'
    },
    {
      number: 5,
      part: 'A',
      text: 'Compared to a neutral sodium atom, a sodium ion (Na+) has a radius that is',
      choices: ['larger, because it gained an electron', 'smaller, because it lost an electron', 'the same', 'larger, because it lost a proton'],
      topic: 'Periodic Table',
      correct: 1,
      explanation: 'A sodium atom loses its single valence electron to form a Na+ ion, which loses an entire electron shell and results in a smaller radius.',
      diveDeep: 'Metal atoms form positive ions (cations) by losing valence electrons. For sodium (Na, configuration 2-8-1), losing one electron to form Na+ (configuration 2-8) removes the entire third electron shell. Consequently, the ion is significantly smaller than the neutral atom because of fewer electron shells and reduced electron-electron repulsion. A transferable strategy is: metal ions are always smaller than their parent atoms, whereas nonmetal ions (anions) are always larger because they gain electrons.'
    },
    {
      number: 6,
      part: 'A',
      text: 'Which type of bond is formed when valence electrons are transferred from a metal to a nonmetal?',
      choices: ['covalent', 'ionic', 'metallic', 'hydrogen'],
      topic: 'Chemical Bonding',
      correct: 1,
      explanation: 'An ionic bond is formed when electrons are transferred from a metal (which becomes a cation) to a nonmetal (which becomes an anion).',
      diveDeep: 'Ionic bonding involves the electrostatic attraction between oppositely charged ions created by electron transfer. Covalent bonds, by contrast, involve the sharing of electrons between nonmetal atoms. Metallic bonding is described as a lattice of positive metal ions in a mobile "sea of electrons." Remember that electron transfer is the hallmark of ionic bonding, whereas electron sharing characterizes covalent bonding.'
    },
    {
      number: 7,
      part: 'A',
      text: 'The process of breaking a chemical bond is always',
      choices: ['endothermic, which releases energy', 'endothermic, which absorbs energy', 'exothermic, which releases energy', 'exothermic, which absorbs energy'],
      topic: 'Chemical Bonding',
      correct: 1,
      explanation: 'Breaking a bond always requires an input of energy, which is an endothermic process.',
      diveDeep: 'A fundamental rule of chemistry is that bond breaking is always endothermic (absorbs energy, +ΔH), and bond forming is always exothermic (releases energy, −ΔH). You can remember the acronym BARF: Break Absorb, Release Form. A common trap is thinking that breaking bonds releases energy because some overall reactions (like combustion) release energy. However, the energy release in those reactions comes from forming new, stronger bonds, not from breaking the reactant bonds.'
    },
    {
      number: 8,
      part: 'A',
      text: 'Which phase change is exothermic (releases heat)?',
      choices: ['H2O(s) → H2O(l)', 'H2O(l) → H2O(g)', 'H2O(l) → H2O(s)', 'CO2(s) → CO2(g)'],
      topic: 'Matter & Energy',
      correct: 2,
      explanation: 'Freezing water (liquid to solid) is an exothermic process because the particles lose kinetic energy and release heat to their surroundings.',
      diveDeep: 'Phase changes that release heat (exothermic) move from a state of higher energy/disorder to lower energy/disorder: condensation (gas to liquid), freezing (liquid to solid), and deposition (gas to solid). Phase changes that absorb heat (endothermic) are melting, boiling/vaporizing, and sublimation. A useful exam strategy is to visualize the particles: if they are slowing down and coming together, energy must be released.'
    },
    {
      number: 9,
      part: 'A',
      text: 'What are the products of an acid-base neutralization reaction?',
      choices: ['acid and base', 'water and carbon dioxide', 'salt and water', 'salt and base'],
      topic: 'Matter & Energy',
      correct: 2,
      explanation: 'Neutralization is a double replacement reaction between an acid and a base that produces an ionic salt and water.',
      diveDeep: 'In an Arrhenius neutralization reaction, the hydrogen ions (H+) from the acid combine with the hydroxide ions (OH−) from the base to form water (H2O). The remaining anions and cations form an ionic compound known as a salt. For example: HCl(aq) + NaOH(aq) → NaCl(aq) + H2O(l). Remembering that Acid + Base → Salt + Water is a classic and highly reliable Regents rule.'
    },
    {
      number: 10,
      part: 'A',
      text: 'Which nuclear emission has the greatest penetrating power?',
      choices: ['alpha particle', 'beta particle', 'gamma radiation', 'positron'],
      topic: 'Atomic Structure',
      correct: 2,
      explanation: 'Gamma radiation consists of high-energy electromagnetic waves with no mass or charge, giving it the highest penetrating power.',
      diveDeep: 'Penetrating power of nuclear emissions increases as their mass and charge decrease. Alpha particles (mass 4, charge +2) have the lowest penetrating power and can be stopped by paper. Beta particles and positrons (mass ~0, charge ±1) have moderate penetrating power. Gamma rays (mass 0, charge 0) are highly energetic photons and require thick lead or concrete to be blocked. Memorizing this order (Alpha < Beta < Gamma) is a recurring question topic.'
    },
    {
      number: 11,
      part: 'A',
      text: 'Which subatomic particle has a charge of -1 and negligible mass?',
      choices: ['proton', 'neutron', 'electron', 'positron'],
      topic: 'Atomic Structure',
      correct: 2,
      explanation: 'An electron carries a charge of -1 and has a mass of approximately 1/1836 amu, which is considered negligible.',
      diveDeep: 'Electrons are subatomic particles that reside in orbitals outside the nucleus. They have a charge of −1 and a mass of ~0 amu. Protons (+1, ~1 amu) and neutrons (0, ~1 amu) reside in the nucleus. Positrons (+1, ~0 amu) are the antimatter counterparts of electrons. Be careful not to confuse electrons with protons or positrons, especially when comparing their masses and charges.'
    },
    {
      number: 12,
      part: 'A',
      text: 'An atom is electrically neutral because the number of',
      choices: ['protons equals the number of electrons', 'protons equals the number of neutrons', 'neutrons equals the number of electrons', 'protons equals the mass number'],
      topic: 'Atomic Structure',
      correct: 0,
      explanation: 'For an atom to have a net neutral charge, the number of positive protons must equal the number of negative electrons.',
      diveDeep: 'Every proton in an atom carries a +1 charge, and every electron carries a −1 charge. Neutrons carry no charge. Therefore, the overall charge of an atom is determined by the balance of protons and electrons: Net Charge = Protons − Electrons. In any neutral atom, this difference must be zero. If an atom gains or loses electrons, it becomes a charged ion.'
    },
    {
      number: 13,
      part: 'A',
      text: 'Which element belongs in Group 2 on the Periodic Table?',
      choices: ['calcium', 'sodium', 'potassium', 'chlorine'],
      topic: 'Periodic Table',
      correct: 0,
      explanation: 'Calcium (Ca) is located in Group 2, which consists of the alkaline earth metals.',
      diveDeep: 'Group 2 elements are known as the alkaline earth metals and contain two valence electrons. Sodium and potassium belong to Group 1 (alkali metals), and chlorine belongs to Group 17 (halogens). You can use the Periodic Table to easily identify the group of any element. Group names and numbers are essential references on the Regents.'
    },
    {
      number: 14,
      part: 'A',
      text: 'Which group on the Periodic Table contains the halogens?',
      choices: ['Group 1', 'Group 2', 'Group 17', 'Group 18'],
      topic: 'Periodic Table',
      correct: 2,
      explanation: 'Group 17 elements (F, Cl, Br, I, At) are known as the halogens.',
      diveDeep: 'Halogens are highly reactive nonmetals that have 7 valence electrons and need to gain one electron to achieve a noble gas configuration. Group 1 represents the alkali metals, Group 2 the alkaline earth metals, and Group 18 the noble gases. Knowing these specific family names is very common in Regents chemistry multiple-choice questions.'
    },
    {
      number: 15,
      part: 'A',
      text: 'Electronegativity generally increases as you move',
      choices: ['left to right across a period', 'right to left across a period', 'top to bottom down a group', 'bottom to top up a group'],
      topic: 'Periodic Table',
      correct: 0,
      explanation: 'Electronegativity increases from left to right across a period as the nuclear charge increases, attracting electrons more strongly.',
      diveDeep: 'Electronegativity measures an atom\'s attraction for shared electrons in a bond. Across a period (left to right), the atomic number (nuclear charge) increases while the number of energy shells remains constant, pulling electrons closer and increasing electronegativity. Down a group (top to bottom), the additional electron shells shield the nucleus and increase atomic size, decreasing electronegativity. Fluorine has the highest electronegativity (4.0) on the Periodic Table.'
    },
    {
      number: 16,
      part: 'A',
      text: 'What type of bond is formed when two atoms share a pair of electrons?',
      choices: ['covalent bond', 'ionic bond', 'metallic bond', 'hydrogen bond'],
      topic: 'Chemical Bonding',
      correct: 0,
      explanation: 'A covalent bond is defined as the sharing of electrons between two atoms.',
      diveDeep: 'Covalent bonds occur when two nonmetal atoms have similar electronegativities and share valence electrons to achieve stable octets. If they share one pair of electrons, it is a single covalent bond. Sharing two pairs forms a double bond, and sharing three pairs forms a triple bond. Ionic bonds involve electron transfer, and metallic bonds involve a sea of mobile electrons.'
    },
    {
      number: 17,
      part: 'A',
      text: 'The bond in a molecule of hydrogen chloride (HCl) is classified as',
      choices: ['polar covalent', 'nonpolar covalent', 'ionic', 'metallic'],
      topic: 'Chemical Bonding',
      correct: 0,
      explanation: 'Hydrogen and chlorine are both nonmetals with different electronegativities, resulting in an unequal sharing of electrons (polar covalent bond).',
      diveDeep: 'To classify a bond, look at the difference in electronegativity between the bonded atoms. Hydrogen has an electronegativity of 2.2, and chlorine has 3.2 (Table S). The electronegativity difference (1.0) is greater than 0.4 but less than 1.7, which indicates a polar covalent bond where electrons are shared unequally. If they were the same nonmetal (e.g., Cl2), the bond would be nonpolar covalent; if it were a metal and a nonmetal (e.g., NaCl), it would be ionic.'
    },
    {
      number: 18,
      part: 'A',
      text: 'Which compound contains both ionic and covalent bonds?',
      choices: ['NaCl', 'CO2', 'NaOH', 'H2O'],
      topic: 'Chemical Bonding',
      correct: 2,
      explanation: 'NaOH contains an ionic bond between the sodium cation (Na+) and the hydroxide anion (OH-), and a covalent bond between the oxygen and hydrogen atoms within the hydroxide ion.',
      diveDeep: 'Compounds containing a polyatomic ion (found on Reference Table E) will always have both ionic and covalent bonds. In sodium hydroxide (NaOH), the bond between Na+ and OH− is ionic, while the O−H bond inside the polyatomic OH− ion is covalent. NaCl has only ionic bonds, while CO2 and H2O contain only covalent bonds. A helpful tip: look for a metal bonded to a polyatomic ion to find compounds with both bond types.'
    },
    {
      number: 19,
      part: 'A',
      text: 'Which physical state of matter has a definite volume but no definite shape?',
      choices: ['solid', 'liquid', 'gas', 'aqueous solution'],
      topic: 'Matter & Energy',
      correct: 1,
      explanation: 'Liquids have a definite volume, but their particles can flow to take the shape of their container.',
      diveDeep: 'Physical state reflects the spacing and ordering of molecules: tightly ordered for solids, loosely arranged for liquids, and widely separated for gases. Solids have a definite shape and volume. Liquids have a definite volume but no definite shape. Gases have neither. Aqueous solutions are mixtures, not pure phases of matter.'
    },
    {
      number: 20,
      part: 'A',
      text: 'The change of a substance directly from the solid phase to the gas phase is called',
      choices: ['melting', 'vaporization', 'sublimation', 'deposition'],
      topic: 'Matter & Energy',
      correct: 2,
      explanation: 'Sublimation is the direct phase transition from a solid to a gas, bypassing the liquid phase.',
      diveDeep: 'Common examples of sublimation include dry ice (solid CO2) and iodine crystals at room temperature. The opposite process, where a gas changes directly to a solid, is called deposition. Melting (solid to liquid) and vaporization (liquid to gas) both involve the intermediate liquid phase. Sublimation is an endothermic phase change because it requires energy to overcome all intermolecular forces holding the solid together.'
    },
    {
      number: 21,
      part: 'A',
      text: 'What is standard pressure for gases at STP?',
      choices: ['1.0 atm', '10.0 atm', '101.3 atm', '273 atm'],
      topic: 'Matter & Energy',
      correct: 0,
      explanation: 'According to Reference Table A, standard pressure is defined as 1.0 atmosphere (atm) or 101.3 kilopascals (kPa).',
      diveDeep: 'Reference Table A (Standard Temperature and Pressure) is a crucial resource on the Regents exam. It lists standard pressure as 101.3 kPa or 1 atm, and standard temperature as 273 K or 0°C. Be careful not to mix up standard pressure values with standard temperature values (like 273), and always verify units (atm vs. kPa) when answering gas law questions.'
    },
    {
      number: 22,
      part: 'A',
      text: 'A reaction in which energy is absorbed is classified as',
      choices: ['endothermic', 'exothermic', 'synthesis', 'decomposition'],
      topic: 'Matter & Energy',
      correct: 0,
      explanation: 'An endothermic reaction absorbs heat energy from its surroundings, resulting in a positive change in enthalpy (+ΔH).',
      diveDeep: 'In an endothermic reaction, the potential energy of the products is higher than the potential energy of the reactants because energy is absorbed. An exothermic reaction, by contrast, releases energy to the surroundings (−ΔH). Synthesis and decomposition are chemical reaction types based on how reactants combine or break apart, but they do not define the thermodynamic energy flow. On potential energy diagrams, endothermic curves end higher than they start.'
    },
    {
      number: 23,
      part: 'A',
      text: 'Hydrocarbons containing one double bond belong to which homologous series?',
      choices: ['alkanes', 'alkenes', 'alkynes', 'alkadienes'],
      topic: 'Organic Chemistry',
      correct: 1,
      explanation: 'According to Reference Table Q, alkenes are unsaturated hydrocarbons that contain exactly one carbon-carbon double bond.',
      diveDeep: 'Reference Table Q (Homologous Series of Hydrocarbons) defines the three main series: alkanes contain only single bonds (general formula CnH2n+2), alkenes contain one double bond (CnH2n), and alkynes contain one triple bond (CnH2n-2). Knowing how to use Table Q is a key shortcut for organic chemistry questions. Alkene names end with the suffix "-ene."'
    },
    {
      number: 24,
      part: 'A',
      text: 'Which functional group represents an ester?',
      choices: ['-COO-', '-O-', '-COOH', '-CO-'],
      topic: 'Organic Chemistry',
      correct: 0,
      explanation: 'According to Reference Table R, the ester functional group is represented by -COO-, which connects two carbon chains.',
      diveDeep: 'Reference Table R (Organic Functional Groups) is the ultimate guide for identifying organic classes. In Table R, -COO- represents an ester, -O- represents an ether, -COOH represents an organic acid (carboxylic acid), and -CO- represents a ketone. Comparing the choices directly to Table R is the most reliable strategy to avoid confusing these similar-looking oxygen-containing groups.'
    },
    {
      number: 25,
      part: 'A',
      text: 'In an operating voltaic cell, oxidation takes place at the',
      choices: ['anode', 'cathode', 'salt bridge', 'external wire'],
      topic: 'Chemical Bonding',
      correct: 0,
      explanation: 'In all electrochemical cells, oxidation occurs at the anode (An Ox) and reduction occurs at the cathode (Red Cat).',
      diveDeep: 'A voltaic cell generates electricity spontaneously. The electrode where oxidation occurs (loss of electrons) is called the anode, and it carries a negative charge in a voltaic cell. Electrons flow from the anode through the external wire to the cathode, where reduction occurs. Remember the mnemonic "An Ox" (Anode = Oxidation) and "Red Cat" (Reduction = Cathode) to easily answer electrode function questions.'
    },
    {
      number: 26,
      part: 'A',
      text: 'According to the Arrhenius theory, an acid dissolves in water to yield',
      choices: ['H+ ions only', 'OH- ions only', 'H- ions only', 'O2- ions only'],
      topic: 'Matter & Energy',
      correct: 0,
      explanation: 'An Arrhenius acid is defined as a substance that produces hydrogen ions (H+ or hydronium, H3O+) as the only positive ions in solution.',
      diveDeep: 'According to the Arrhenius model, acids ionize in water to yield H+(aq) ions, which associate with water molecules to form hydronium ions (H3O+). Arrhenius bases dissolve to produce hydroxide ions (OH−) as the only negative ions. The hydride ion (H−) is a hydrogen atom with an extra electron, and the oxide ion (O2−) does not exist as a free ion in aqueous solutions. Always use the definition of Arrhenius acids/bases directly from your class notes or Table T if applicable.'
    },
    {
      number: 27,
      part: 'A',
      text: 'A substance that conducts electricity when dissolved in water is classified as an',
      choices: ['electrolyte', 'nonelectrolyte', 'isomer', 'hydrocarbon'],
      topic: 'Matter & Energy',
      correct: 0,
      explanation: 'An electrolyte dissociates into free-moving ions in water, allowing the solution to conduct electricity.',
      diveDeep: 'Electrolytes include soluble ionic compounds (salts), acids, and bases. When dissolved in water, they break apart into mobile cations and anions that carry an electrical current. Nonelectrolytes (like molecular sugars or alcohols) dissolve as neutral molecules and do not conduct electricity. Isomers are compounds with the same molecular formula but different structures, and hydrocarbons are organic compounds containing only carbon and hydrogen.'
    },
    {
      number: 28,
      part: 'A',
      text: 'Which radioisotope is used to treat cancer?',
      choices: ['Carbon-14', 'Cobalt-60', 'Iodine-131', 'Uranium-238'],
      topic: 'Atomic Structure',
      correct: 1,
      explanation: 'Cobalt-60 emits gamma radiation, which is used in radiation therapy to target and destroy cancer cells.',
      diveDeep: 'Each radioisotope listed has a specific practical application tested on the Regents exam: Cobalt-60 is used for cancer treatment; Carbon-14 is used for dating organic archaeological artifacts; Iodine-131 is used for diagnosing and treating thyroid disorders; Uranium-238 is used for dating geological formations (rocks). Memorizing this specific list of radioisotopes and their uses is highly recommended.'
    },
    {
      number: 29,
      part: 'A',
      text: 'Which nuclear emission consists of high-speed electrons?',
      choices: ['alpha particle', 'beta particle', 'gamma ray', 'positron'],
      topic: 'Atomic Structure',
      correct: 1,
      explanation: 'A beta particle (denoted as β- or 0e-1) is a high-speed electron ejected from a nucleus during radioactive decay.',
      diveDeep: 'According to Reference Table O, nuclear particles are defined by their mass and charge. A beta particle has a mass of 0 and a charge of −1, which corresponds to an electron. An alpha particle is a helium nucleus (mass 4, charge +2). A gamma ray is high-energy electromagnetic radiation (mass 0, charge 0). A positron is a positive electron (mass 0, charge +1). Knowing Table O is vital for balancing nuclear reactions.'
    },
    {
      number: 30,
      part: 'A',
      text: 'What process involves the splitting of a heavy nucleus into two lighter nuclei?',
      choices: ['fission', 'fusion', 'alpha decay', 'artificial transmutation'],
      topic: 'Atomic Structure',
      correct: 0,
      explanation: 'Nuclear fission is the splitting of a large, heavy nucleus (such as Uranium-235) into smaller, lighter nuclei, releasing a large amount of energy.',
      diveDeep: 'To distinguish nuclear reactions: natural transmutation involves a single reactant nucleus decaying on its own; artificial transmutation has two reactants (a target nucleus and a bombarding particle); fission splits a heavy nucleus with a neutron; and fusion combines light nuclei. The decay of Carbon-14 (14C → 14N + 0e-) has only one reactant, making it natural transmutation. The other choices represent artificial transmutation, fission, and fusion.'
    },
    {
      number: 31,
      part: 'B-1',
      text: 'What is the average atomic mass of a sample of an element consisting of 50.% isotope A (mass 10. amu) and 50.% isotope B (mass 12. amu)?',
      choices: ['10.0 amu', '11.0 amu', '12.0 amu', '22.0 amu'],
      topic: 'Atomic Structure',
      correct: 1,
      explanation: 'The average atomic mass is calculated as a weighted average: (0.50 × 10. amu) + (0.50 × 12. amu) = 11.0 amu.',
      diveDeep: 'To find the average atomic mass, convert each percentage abundance to a decimal, multiply it by the mass of that isotope, and sum the terms: Average Mass = Σ (abundance × mass). Here, 50% of 10 is 5, and 50% of 12 is 6. Summing these gives 5 + 6 = 11.0 amu. Always ensure your calculated average lies between the masses of the isotopes (10 and 12) and is closer to the isotope with the higher abundance.'
    },
    {
      number: 32,
      part: 'B-1',
      text: 'Which electron configuration represents an atom of chlorine in the ground state?',
      choices: ['2-8-5', '2-8-7', '2-8-8', '2-8-8-1'],
      topic: 'Atomic Structure',
      correct: 1,
      explanation: 'A neutral chlorine atom has an atomic number of 17, giving it 17 electrons. Its ground state configuration is 2-8-7.',
      diveDeep: 'The ground state electron configurations are listed directly on the Periodic Table for each element. For chlorine (Cl, atomic number 17), the configuration is 2-8-7. The configuration 2-8-5 represents phosphorus (Z=15) in the ground state. The configuration 2-8-8 represents argon (Z=18), and 2-8-8-1 represents potassium (Z=19). Always check the total number of electrons to ensure it matches the atomic number of the neutral element.'
    },
    {
      number: 33,
      part: 'B-1',
      text: 'What represents the empirical formula for the compound C4H8?',
      choices: ['CH', 'CH2', 'C2H4', 'C4H8'],
      topic: 'Chemical Bonding',
      correct: 1,
      explanation: 'An empirical formula represents the simplest whole-number ratio of atoms in a compound. For C4H8, dividing by the greatest common divisor (4) yields CH2.',
      diveDeep: 'A molecular formula (like C4H8) shows the actual number of atoms of each element in a molecule. To find the empirical formula, divide all subscripts in the molecular formula by their greatest common factor. In C4H8, both 4 and 8 are divisible by 4, giving a 1:2 ratio, or CH2. A key strategy on the Regents is to simplify subscripts to their lowest terms.'
    },
    {
      number: 34,
      part: 'B-1',
      text: 'Based on Reference Table F, which compound is soluble in water?',
      choices: ['BaCO3', 'AgCl', 'K2CO3', 'CaSO4'],
      topic: 'Periodic Table',
      correct: 2,
      explanation: 'According to Table F, all carbonates (CO3^2-) are insoluble, except when combined with Group 1 elements (like Potassium, K).',
      diveDeep: 'Reference Table F lists the solubility guidelines for aqueous solutions. Under the table, carbonates (CO3^2−) are listed as insoluble except when combined with Group 1 ions or ammonium (NH4+). Since potassium (K) is in Group 1, K2CO3 is soluble. BaCO3 is insoluble. AgCl is insoluble because halides are insoluble when paired with Ag+, Pb2+, or Hg2^2+. CaSO4 is insoluble because sulfates are insoluble when paired with Ca2+, Sr2+, Ba2+, or Pb2+.'
    },
    {
      number: 35,
      part: 'B-1',
      text: 'According to Reference Table G, which solute is saturated when 30 grams of it are dissolved in 100 grams of water at 20°C?',
      choices: ['KClO3', 'NaCl', 'KNO3', 'NH4Cl'],
      topic: 'Matter & Energy',
      correct: 0,
      explanation: 'According to Reference Table G, dissolving 30 grams of KClO3 in 100 grams of water at 20°C exceeds its solubility limit of about 6 grams, resulting in a saturated solution with excess undissolved solute.',
      diveDeep: 'On Reference Table G, the solubility of KClO3 at 20°C is approximately 6 grams per 100 grams of water. Because 30 grams exceeds this limit, the solution becomes saturated with the remaining 24 grams of solute remaining as a solid precipitate. For the other options—NaCl (solubility ~36g), KNO3 (solubility ~32g), and NH4Cl (solubility ~37g)—dissolving 30 grams results in an unsaturated solution because it is below their respective saturation limits at 20°C.'
    },
    {
      number: 36,
      part: 'B-1',
      text: 'What is the concentration of a solution containing 1.5 moles of solute in 3.0 liters of solution?',
      choices: ['0.50 M', '1.5 M', '3.0 M', '4.5 M'],
      topic: 'Matter & Energy',
      correct: 0,
      explanation: 'Molarity (M) is defined as moles of solute divided by liters of solution: 1.5 moles / 3.0 liters = 0.50 M.',
      diveDeep: 'The formula for molarity is found on Reference Table T: Molarity = moles of solute / liters of solution. Substituting the given values: M = 1.5 mol / 3.0 L = 0.50 mol/L or 0.50 M. Make sure the volume is in liters; if it is given in milliliters, you must convert it to liters by dividing by 1000 before applying the formula.'
    },
    {
      number: 37,
      part: 'B-1',
      text: 'What is the total mass of 2.5 moles of Oxygen gas (O2)?',
      choices: ['40. g', '80. g', '120. g', '160. g'],
      topic: 'Chemical Bonding',
      correct: 1,
      explanation: 'The molar mass of diatomic oxygen gas (O2) is 32.0 g/mol. Multiplying the moles by the molar mass: 2.5 moles × 32.0 g/mol = 80. g.',
      diveDeep: 'A common trap is using the atomic mass of oxygen (16.0 g/mol) instead of the molecular mass of oxygen gas, which is diatomic (O2 = 32.0 g/mol). Using the mole formula from Reference Table T: mass = moles × gram-formula mass. Substituting: mass = 2.5 mol × 32.0 g/mol = 80. g. Always check whether the gas is diatomic (H2, N2, O2, F2, Cl2, Br2, I2) when calculating molecular mass.'
    },
    {
      number: 38,
      part: 'B-1',
      text: 'A gas occupies 5.0 liters at 1.0 atm. If the pressure is doubled to 2.0 atm at constant temperature, the new volume will be',
      choices: ['2.5 L', '5.0 L', '7.5 L', '10. L'],
      topic: 'Matter & Energy',
      correct: 0,
      explanation: 'According to Boyle\'s Law (P1V1 = P2V2), pressure and volume are inversely proportional. Doubling the pressure halves the volume: (1.0 atm)(5.0 L) = (2.0 atm)(V2) → V2 = 2.5 L.',
      diveDeep: 'When temperature and amount of gas are held constant, volume decreases as pressure increases. Using the combined gas law from Table T (P1V1/T1 = P2V2/T2) and removing temperature: P1V1 = P2V2. Solving for V2: V2 = P1V1 / P2 = (1.0 atm × 5.0 L) / 2.0 atm = 2.5 L. This inverse relationship means that doubling one factor cuts the other in half.'
    },
    {
      number: 39,
      part: 'B-1',
      text: 'How much heat is required to melt 5.0 grams of ice completely at 0°C? (Heat of fusion of H2O = 334 J/g)',
      choices: ['66.8 J', '334 J', '1670 J', '11300 J'],
      topic: 'Matter & Energy',
      correct: 2,
      explanation: 'Using the heat of fusion formula q = mHf: q = 5.0 g × 334 J/g = 1670 J.',
      diveDeep: 'For phase changes, temperature remains constant, so we do not use the specific heat formula (q = mcΔT). Instead, for melting or freezing, we use q = mHf (where Hf is the heat of fusion, found on Reference Table B as 334 J/g for water). Substituting the values: q = (5.0 g)(334 J/g) = 1670 J. If the question asked about vaporization or condensation, you would use q = mHv with the heat of vaporization (2260 J/g).'
    },
    {
      number: 40,
      part: 'B-1',
      text: 'Based on Reference Table H, what is the vapor pressure of water at 100°C?',
      choices: ['40 kPa', '70 kPa', '101.3 kPa', '200 kPa'],
      topic: 'Matter & Energy',
      correct: 2,
      explanation: 'At 100°C, which is the normal boiling point of water, its vapor pressure equals standard atmospheric pressure, which is 101.3 kPa.',
      diveDeep: 'A liquid boils when its vapor pressure equals the atmospheric pressure. The normal boiling point is the temperature at which its vapor pressure equals standard atmospheric pressure (101.3 kPa or 1 atm). Looking at Reference Table H, the water curve intersects the 101.3 kPa line (marked as a dashed line) at exactly 100°C. You can read the vapor pressure of other liquids (propanone, ethanol, ethanoic acid) at any temperature using Table H.'
    },
    {
      number: 41,
      part: 'B-1',
      text: 'What type of reaction is represented by the equation: CH4 + 2O2 → CO2 + 2H2O?',
      choices: ['synthesis', 'decomposition', 'combustion', 'neutralization'],
      topic: 'Chemical Bonding',
      correct: 2,
      explanation: 'The reaction of a hydrocarbon with oxygen to produce carbon dioxide and water is a combustion reaction.',
      diveDeep: 'Combustion reactions always involve a fuel (typically a hydrocarbon) reacting with oxygen gas (O2) to release energy, carbon dioxide (CO2), and water vapor (H2O). Synthesis reactions combine two or more substances to form a single product. Decomposition reactions break a single reactant into multiple products. Neutralization is an acid-base reaction. Recognizing the reactants (hydrocarbon + O2) is the easiest way to identify combustion.'
    },
    {
      number: 42,
      part: 'B-1',
      text: 'For a chemical reaction at equilibrium, what must be true about the rates of forward and reverse reactions?',
      choices: ['They must be equal.', 'They must be constant but not equal.', 'They must be zero.', 'The forward rate must be greater.'],
      topic: 'Matter & Energy',
      correct: 0,
      explanation: 'Dynamic equilibrium is defined as the state where the rate of the forward reaction equals the rate of the reverse reaction.',
      diveDeep: 'A very common Regents question tests the definition of equilibrium. The correct key phrases to remember are: "Rates are equal, concentrations are constant." The rates of the forward and reverse processes must be exactly equal, which prevents the concentrations of reactants and products from changing. A common distractor is that concentrations must be equal—this is false, they only need to remain constant.'
    },
    {
      number: 43,
      part: 'B-1',
      text: 'What represents the IUPAC name for CH3CH2CH3?',
      choices: ['methane', 'ethane', 'propane', 'butane'],
      topic: 'Organic Chemistry',
      correct: 2,
      explanation: 'According to Reference Table P, the prefix for a three-carbon chain is "prop-", and since it is an alkane, its IUPAC name is propane.',
      diveDeep: 'Use Reference Table P (Organic Prefixes) and Reference Table Q (Homologous Series). Table P lists "meth-" for 1 carbon, "eth-" for 2, "prop-" for 3, and "but-" for 4. Since CH3CH2CH3 has 3 carbons and only single bonds (alkane), we combine the prefix "prop-" and suffix "-ane" to get propane. Alkanes follow the general formula CnH2n+2, which matches propane (C3H8).'
    },
    {
      number: 44,
      part: 'B-1',
      text: 'What is the oxidation number of carbon in CO2?',
      choices: ['-2', '+2', '+4', '+6'],
      topic: 'Chemical Bonding',
      correct: 2,
      explanation: 'Oxygen always has an oxidation number of -2. For CO2 to be neutral, the carbon atom must have an oxidation number of +4.',
      diveDeep: 'In any neutral compound, the sum of all oxidation numbers must equal zero. In CO2, each oxygen atom has an oxidation number of −2 (for a total of −4). Let x be the oxidation number of carbon: x + 2(−2) = 0 → x − 4 = 0 → x = +4. Memorizing that oxygen is typically −2 and Group 1/2 metals are +1/+2 is highly useful for solving oxidation state problems.'
    },
    {
      number: 45,
      part: 'B-1',
      text: 'In a voltaic cell, the flow of electrons through the wire is from the',
      choices: ['anode to the cathode', 'cathode to the anode', 'salt bridge to the anode', 'salt bridge to the cathode'],
      topic: 'Chemical Bonding',
      correct: 0,
      explanation: 'Electrons are generated at the anode (where oxidation occurs) and flow through the external wire to the cathode (where reduction occurs).',
      diveDeep: 'In all electrochemical cells (both voltaic and electrolytic), electrons flow through the external circuit (wire) from the anode to the cathode. The salt bridge allows the migration of ions to maintain electrical neutrality, but it does not allow the flow of electrons. Remember the direction of electron flow is always alphabetical: A to C (Anode to Cathode).'
    },
    {
      number: 46,
      part: 'B-1',
      text: 'A solution with a pH of 11.0 is classified as',
      choices: ['strongly acidic', 'strongly basic', 'neutral', 'weakly acidic'],
      topic: 'Matter & Energy',
      correct: 1,
      explanation: 'Solutions with a pH greater than 7.0 are basic. A pH of 11.0 is far above 7.0, classifying it as strongly basic.',
      diveDeep: 'The pH scale ranges from 0 to 14: pH < 7 is acidic (lower pH is more acidic), pH = 7 is neutral, and pH > 7 is basic (higher pH is more basic). A pH of 11.0 represents a high concentration of hydroxide ions (OH−) and a low concentration of hydronium ions (H3O+). A common mistake is confusing high pH with acidity; always remember that high pH means basic and low pH means acidic.'
    },
    {
      number: 47,
      part: 'B-1',
      text: 'What is the concentration of hydronium ions in a solution with a pH of 6.0?',
      choices: ['1.0 x 10^-6 M', '1.0 x 10^-8 M', '1.0 x 10^6 M', '6.0 M'],
      topic: 'Matter & Energy',
      correct: 0,
      explanation: 'The pH of a solution is the negative logarithm of the hydronium ion concentration: [H3O+] = 10^-pH. For pH = 6.0, [H3O+] = 1.0 × 10^-6 M.',
      diveDeep: 'By definition, pH = −log[H3O+]. This means that the hydronium concentration is 10 raised to the negative pH power: [H3O+] = 10^−pH. For a pH of 6.0, this translates to 1.0 × 10^−6 M. Every change of 1.0 pH unit represents a tenfold change in hydronium ion concentration. For example, a solution with a pH of 5.0 has 10 times more hydronium ions than a solution with a pH of 6.0.'
    },
    {
      number: 48,
      part: 'B-1',
      text: 'During a titration, 15.0 mL of 2.0 M HCl is neutralized by 30.0 mL of KOH. What is the concentration of the KOH?',
      choices: ['0.50 M', '1.0 M', '2.0 M', '4.0 M'],
      topic: 'Matter & Energy',
      correct: 1,
      explanation: 'Using the titration formula MaVa = MbVb: (2.0 M)(15.0 mL) = (Mb)(30.0 mL) → Mb = 1.0 M.',
      diveDeep: 'The titration formula on Reference Table T is MaVa = MbVb, which applies to monoprotic acids (like HCl) and monobasic bases (like KOH). Substituting the given values: (2.0 M)(15.0 mL) = (Mb)(30.0 mL). Solving for Mb gives Mb = 30.0 / 30.0 = 1.0 M. Since the base volume is twice the acid volume, the base must be half as concentrated to deliver the same number of moles of hydroxide ions.'
    },
    {
      number: 49,
      part: 'B-1',
      text: 'A sample of Na-24 decays until only 25% of the original mass remains. If the half-life of Na-24 is 15 hours, how much time has elapsed?',
      choices: ['7.5 hours', '15 hours', '30 hours', '45 hours'],
      topic: 'Atomic Structure',
      correct: 2,
      explanation: 'A decay to 25% represents two half-lives (100% → 50% → 25%). Two half-lives of 15 hours each equal 30 hours.',
      diveDeep: 'Half-life calculations can be solved by counting the number of half-life cycles. Each cycle cuts the remaining radioisotope mass in half: 100% remaining after 0 half-lives, 50% after 1 half-life, and 25% after 2 half-lives. Since each half-life cycle for Na-24 takes 15 hours (as given in the problem or Reference Table N), the total elapsed time is 2 × 15 = 30 hours.'
    },
    {
      number: 50,
      part: 'B-1',
      text: 'Which balanced equation represents natural transmutation?',
      choices: ['14C → 14N + 0e-', '27Al + 4He → 30P + 1n', '235U + 1n → 142Ba + 91Kr + 3 1n', '2H + 3H → 4He + 1n'],
      topic: 'Atomic Structure',
      correct: 0,
      explanation: 'Natural transmutation (radioactive decay) has only a single reactant nucleus that decays spontaneously, as seen in the decay of Carbon-14.',
      diveDeep: 'To distinguish nuclear reactions: natural transmutation involves a single reactant nucleus decaying on its own; artificial transmutation has two reactants (a target nucleus and a bombarding particle); fission splits a heavy nucleus with a neutron; and fusion combines light nuclei. The decay of Carbon-14 (14C → 14N + 0e-) has only one reactant, making it natural transmutation. The other choices represent artificial transmutation, fission, and fusion.'
    }
  ]
};
