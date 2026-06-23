// Chemistry Regents — June 2023
export default {
  id: 'chem-jun-2023',
  subject: 'chemistry',
  year: 2023,
  session: 'June',
  totalMinutes: 180,
  questions: [
    {
      number: 1, part: 'A',
      text: 'Which phrase describes the nucleus of any atom?',
      choices: ['has an overall positive charge', 'has an overall negative charge', 'contains negative electrons', 'contains positive electrons'],
      topic: 'Atomic Structure', correct: 0,
      explanation: 'The nucleus contains only protons (positive) and neutrons (neutral), giving it an overall positive charge.',
      diveDeep: 'Electrons are located outside the nucleus in orbitals. A common trap is confusing the nucleus with the full atom; a neutral atom has no overall charge, but the nucleus itself is always positive. The number of protons (atomic number) equals the number of electrons in a neutral atom. Ions form when electrons are gained or lost, but the nucleus charge never changes in a chemical reaction.'
    },
    {
      number: 2, part: 'A',
      text: 'Which two particles each have a mass of approximately one atomic mass unit?',
      choices: ['an electron and a proton', 'an electron and a positron', 'a neutron and a proton', 'a neutron and a positron'],
      topic: 'Periodic Table', correct: 2,
      explanation: 'Protons and neutrons each have a mass of approximately 1 amu; electrons are ~1/1836 amu and are essentially massless by comparison.',
      diveDeep: 'A positron is the antimatter counterpart of an electron — it has the same tiny mass as an electron, not 1 amu. Knowing that electrons have negligible mass is essential for calculating atomic mass: atomic mass ≈ protons + neutrons. This is tested frequently when asking which particles contribute to mass number.'
    },
    {
      number: 3, part: 'A',
      text: 'The wave-mechanical model of the atom describes the location of electrons',
      choices: ['as loosely packed in the nucleus of an atom', 'as densely packed in the nucleus of an atom', 'in circular paths around the nucleus', 'in orbitals outside the nucleus'],
      topic: 'Atomic Structure', correct: 3,
      explanation: 'The wave-mechanical (quantum) model places electrons in orbitals — regions of probability outside the nucleus.',
      diveDeep: 'The older Bohr model used fixed circular paths; the wave-mechanical model replaced this with probability clouds (orbitals). An orbital is not a definite path but a region where an electron is likely to be found 90% of the time. Confusing Bohr (circular paths) with wave-mechanical (orbitals) is a classic exam trap. The s, p, d, f orbital shapes arise from this model.'
    },
    {
      number: 4, part: 'A',
      text: 'When a ground state electron in an atom moves to an excited state, the electron',
      choices: ['absorbs energy as it moves to a higher energy state', 'absorbs energy as it moves to a lower energy state', 'releases energy as it moves to a higher energy state', 'releases energy as it moves to a lower energy state'],
      topic: 'Atomic Structure', correct: 0,
      explanation: 'Moving to a higher (excited) energy level requires absorbing energy; the electron moves farther from the nucleus.',
      diveDeep: 'Energy is absorbed as light or heat when an electron jumps up, and energy is released (emitted as a photon) when it falls back down. This is the basis of atomic emission spectra — each element emits characteristic wavelengths. The trap is to confuse the direction of energy flow: going up = absorb, coming down = release.'
    },
    {
      number: 5, part: 'A',
      text: 'Which statement describes a chemical property of iron?',
      choices: ['Iron is malleable.', 'Iron conducts electricity.', 'Iron reacts with nitric acid.', 'Iron has a high melting point.'],
      topic: 'Periodic Table', correct: 2,
      explanation: 'A chemical property describes how a substance changes into a different substance; reacting with nitric acid produces new substances.',
      diveDeep: 'Malleability, conductivity, and melting point are physical properties — they can be observed without changing the chemical identity. Chemical properties include reactivity with acids, combustion, and rusting. A key strategy: if the description involves forming or breaking chemical bonds to produce a new substance, it is a chemical property.'
    },
    {
      number: 6, part: 'A',
      text: 'Diamond and graphite are two forms of solid carbon. These two forms of carbon have',
      choices: ['different crystal structures and different properties', 'different crystal structures and the same properties', 'the same crystal structure and different properties', 'the same crystal structure and the same properties'],
      topic: 'Chemical Bonding', correct: 0,
      explanation: 'Diamond and graphite are allotropes of carbon with different crystal structures (tetrahedral vs. layered), leading to very different properties.',
      diveDeep: 'In diamond, each carbon forms 4 covalent bonds in a tetrahedral network making it extremely hard. In graphite, carbons form sheets of hexagonal rings with delocalized electrons between layers, making it soft and electrically conductive. Allotropes share the same element but differ in structure and properties — fullerenes (C₆₀) are a third allotrope. This is a classic allotrope question on the NY Regents.'
    },
    {
      number: 7, part: 'A',
      text: 'Which substance can be broken down by a chemical change?',
      choices: ['cobalt', 'krypton', 'ethane', 'manganese'],
      topic: 'Matter & Energy', correct: 2,
      explanation: 'Ethane (C₂H₆) is a compound that can be broken down into simpler substances by chemical change; cobalt, krypton, and manganese are elements that cannot be chemically broken down.',
      diveDeep: 'Elements (cobalt, krypton, manganese) consist of only one type of atom and cannot be decomposed by chemical means. Compounds like ethane consist of two or more elements chemically bonded and can be broken down. This distinction between elements and compounds is fundamental. Do not confuse physical separation (mixtures) with chemical decomposition (compounds).'
    },
    {
      number: 8, part: 'A',
      text: 'Based on Table I, which equation represents conservation of mass and energy?',
      choices: [
        'CH₄(g) + O₂(g) + 890.4 kJ → CO₂(g) + H₂O(ℓ)',
        'CH₄(g) + O₂(g) → CO₂(g) + H₂O(ℓ) + 890.4 kJ',
        'CH₄(g) + 2O₂(g) + 890.4 kJ → CO₂(g) + 2H₂O(ℓ)',
        'CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(ℓ) + 890.4 kJ'
      ],
      topic: 'Stoichiometry', correct: 3,
      explanation: 'Combustion of methane is exothermic (Table I: ΔH = −890.4 kJ), so energy is a product on the right side, and the balanced equation requires 2O₂ and 2H₂O.',
      diveDeep: 'Table I lists heats of reaction. Exothermic reactions release energy as a product; endothermic reactions absorb energy as a reactant. The equation must also be balanced: 1 CH₄ + 2 O₂ → 1 CO₂ + 2 H₂O. Two common errors: placing energy on the wrong side, and forgetting to balance O atoms (requires coefficient 2 for O₂ and H₂O).', image: '/images/exams/chem-june-2023/q8.png' },
    {
      number: 9, part: 'A',
      text: 'At STP, which property can be used to differentiate a 10.-gram sample of NaCl(s) from a 10.-gram sample of NaNO₃(s)?',
      choices: ['mass of the sample', 'temperature of the sample', 'solubility in water', 'phase at STP'],
      topic: 'Matter & Energy', correct: 2,
      explanation: 'Both samples have the same mass (10 g) and are both solids at STP; their solubility values differ and can distinguish them.',
      diveDeep: 'Mass is identical by design. Both are ionic solids at STP (same phase). Temperature at STP is 0°C for both. Solubility from Table F or G is a characteristic physical property unique to each substance — NaCl is about 36 g/100 mL and NaNO₃ is about 88 g/100 mL at 20°C. Identifying which intensive property can distinguish two samples is a recurring exam skill.'
    },
    {
      number: 10, part: 'A',
      text: 'What is the number of electrons shared between the two atoms in an O₂ molecule?',
      choices: ['6', '3', '2', '4'],
      topic: 'Chemical Bonding', correct: 3,
      explanation: 'O₂ has a double bond consisting of 4 shared electrons (2 pairs).',
      diveDeep: 'Each oxygen has 6 valence electrons and needs 2 more to complete its octet; sharing 2 pairs (4 electrons) forms a double bond. Do not confuse the number of bonds (2) with the number of shared electrons (4). N₂ has a triple bond with 6 shared electrons. The Lewis structure approach: count lone pairs and bonding pairs carefully.'
    },
    {
      number: 11, part: 'A',
      text: 'Which changes in both charge and radius occur when an atom loses an electron?',
      choices: [
        'A negative ion is formed with a smaller radius than the atom.',
        'A negative ion is formed with a larger radius than the atom.',
        'A positive ion is formed with a smaller radius than the atom.',
        'A positive ion is formed with a larger radius than the atom.'
      ],
      topic: 'Atomic Structure', correct: 2,
      explanation: 'Losing an electron forms a cation (positive ion), and the reduced electron-electron repulsion causes the radius to shrink.',
      diveDeep: 'When an electron is removed, the same nuclear charge now attracts fewer electrons more strongly, pulling them inward and decreasing the radius. Conversely, gaining an electron (anion) increases electron-electron repulsion and increases radius. This trend — cations are smaller than neutral atoms, anions are larger — is key for periodic table questions. Also, when the outermost energy level is emptied, the ion is much smaller.'
    },
    {
      number: 12, part: 'A',
      text: 'Which statement describes what occurs when two iodine atoms react to produce an iodine molecule?',
      choices: ['A bond forms and energy is absorbed.', 'A bond forms and energy is released.', 'A bond breaks and energy is absorbed.', 'A bond breaks and energy is released.'],
      topic: 'Chemical Bonding', correct: 1,
      explanation: 'Bond formation always releases energy; two iodine atoms bonding together release energy as the I–I bond forms.',
      diveDeep: 'The rule is: bond breaking requires energy (endothermic), bond formation releases energy (exothermic). When two I atoms join to form I₂, a bond is formed and energy is released. This is the reverse of bond dissociation. The bond dissociation energy of I₂ is 151 kJ/mol — this energy would be absorbed to break the bond. A common trap is reversing this relationship.'
    },
    {
      number: 13, part: 'A',
      text: 'Which process can be used to separate a mixture of two liquids having different boiling points?',
      choices: ['deposition', 'filtration', 'distillation', 'sublimation'],
      topic: 'Matter & Energy', correct: 2,
      explanation: 'Distillation separates liquids based on differences in boiling point by vaporizing the lower-boiling component first.',
      diveDeep: 'Filtration separates solids from liquids. Deposition is the phase change from gas directly to solid. Sublimation is solid directly to gas. Distillation is the correct laboratory technique for separating miscible liquids with different boiling points (e.g., ethanol/water). Fractional distillation is used in petroleum refining to separate crude oil components.'
    },
    {
      number: 14, part: 'A',
      text: 'Which statement describes a solution of sodium chloride in water?',
      choices: [
        'The mixture is heterogeneous, the solute is NaCl and the solvent is H₂O.',
        'The mixture is heterogeneous, the solute is H₂O and the solvent is NaCl.',
        'The mixture is homogeneous, the solute is NaCl and the solvent is H₂O.',
        'The mixture is homogeneous, the solute is H₂O and the solvent is NaCl.'
      ],
      topic: 'Solutions', correct: 2,
      explanation: 'A solution is a homogeneous mixture; the substance dissolved (NaCl) is the solute and the dissolving substance (H₂O) is the solvent.',
      diveDeep: 'Homogeneous means uniform composition throughout — you cannot see separate components. The solute is present in smaller quantity; the solvent is the substance doing the dissolving (usually in greater quantity). "Like dissolves like" — polar solvents dissolve polar/ionic solutes. NaCl dissociates into Na⁺ and Cl⁻ ions in water. Do not confuse solute and solvent — the solvent is always the liquid medium.'
    },
    {
      number: 15, part: 'A',
      text: 'At STP, which property would be the same for 1.0 liter of helium and 1.0 liter of argon?',
      choices: ['boiling point', 'mass', 'density', 'number of atoms'],
      topic: 'Matter & Energy', correct: 3,
      explanation: 'At STP, equal volumes of any ideal gas contain the same number of particles (Avogadro\'s law), so 1.0 L of He and 1.0 L of Ar have the same number of atoms.',
      diveDeep: 'At STP, 1 mole of any gas occupies 22.4 L, so 1.0 L contains 1/22.4 mol of atoms regardless of the gas identity. Mass and density differ because He (4 g/mol) and Ar (40 g/mol) have different molar masses. Boiling points also differ. This is a direct application of Avogadro\'s Law: equal volumes at the same T and P contain equal numbers of particles.'
    },
    {
      number: 16, part: 'A',
      text: 'The melting of an ice cube is an example of an',
      choices: ['endothermic, chemical change', 'endothermic, physical change', 'exothermic, chemical change', 'exothermic, physical change'],
      topic: 'Matter & Energy', correct: 1,
      explanation: 'Melting absorbs energy from the surroundings (endothermic) and is a physical change because water\'s chemical identity does not change.',
      diveDeep: 'Phase changes (melting, boiling, sublimation) are physical changes — the substance\'s chemical formula remains the same. Melting requires overcoming intermolecular forces, which absorbs energy. The reverse (freezing) releases energy (exothermic). A trap: combustion of wood is exothermic AND a chemical change — both descriptors matter.'
    },
    {
      number: 17, part: 'A',
      text: 'Which statement explains the low boiling point of hydrogen, H₂, at standard pressure?',
      choices: ['Hydrogen has strong covalent bonds.', 'Hydrogen has weak covalent bonds.', 'Hydrogen has strong intermolecular forces.', 'Hydrogen has weak intermolecular forces.'],
      topic: 'Matter & Energy', correct: 3,
      explanation: 'H₂ is nonpolar and has only very weak London dispersion forces between molecules, requiring little energy to overcome — hence a very low boiling point (−253°C).',
      diveDeep: 'Boiling point depends on intermolecular forces (IMFs), not intramolecular (covalent) bond strength. H₂ has a strong H–H covalent bond but very weak IMFs. London dispersion forces are the weakest type of IMF and increase with molecular size and surface area. Polar molecules have dipole-dipole forces; molecules with N–H, O–H, or F–H bonds have hydrogen bonding (strongest). H₂ has none of these, so it boils very low.'
    },
    {
      number: 18, part: 'A',
      text: 'In chemical reactions, which term is defined as the difference between the potential energy of the products and the potential energy of the reactants?',
      choices: ['heat of fusion', 'heat of reaction', 'thermal conductivity', 'electrical conductivity'],
      topic: 'Thermochemistry', correct: 1,
      explanation: 'Heat of reaction (ΔH) is defined as the difference in potential energy between products and reactants.',
      diveDeep: 'ΔH = PE(products) − PE(reactants). If products are lower in energy (exothermic), ΔH is negative. If products are higher (endothermic), ΔH is positive. Heat of fusion is the energy to melt a solid. Thermal and electrical conductivity describe physical properties of matter, not energy of reactions. Knowing the definition of ΔH is essential for interpreting potential energy diagrams.'
    },
    {
      number: 19, part: 'A',
      text: 'Which phrase describes what happens to the reaction pathway and activation energy of a reaction to which a catalyst is added?',
      choices: ['the same pathway with the same activation energy', 'the same pathway with a lower activation energy', 'a different pathway with the same activation energy', 'a different pathway with a lower activation energy'],
      topic: 'Kinetics', correct: 3,
      explanation: 'A catalyst provides an alternate reaction pathway with a lower activation energy, speeding up the reaction without being consumed.',
      diveDeep: 'The catalyst lowers activation energy (Ea) by providing a different mechanism (pathway). It does not change the potential energy of reactants or products — only the height of the energy barrier. ΔH remains the same with or without a catalyst. Enzymes are biological catalysts. A common trap: students think catalysts change ΔH or are consumed; they do neither.'
    },
    {
      number: 20, part: 'A',
      text: 'An atom of which element is bonded to the carbon atom in the amide functional group?',
      choices: ['iodine', 'phosphorus', 'nitrogen', 'sulfur'],
      topic: 'Organic Chemistry', correct: 2,
      explanation: 'The amide functional group is –CONH₂; it contains a nitrogen atom bonded to the carbonyl carbon.',
      diveDeep: 'Functional groups to know: amide (–CONH₂), ester (–COO–), amine (–NH₂), alcohol (–OH), aldehyde (–CHO), ketone (C=O), carboxylic acid (–COOH), ether (–O–). The amide is recognized by the C bonded to N. Proteins are polymers of amino acids linked by amide (peptide) bonds. The question tests knowledge of functional group structure, not just its name.'
    },
    {
      number: 21, part: 'A',
      text: 'Which statement describes the two isomers of butane?',
      choices: [
        'They have the same molecular formula but different structural formulas.',
        'They have the same molecular formula and the same structural formula.',
        'They have different molecular formulas and different structural formulas.',
        'They have different molecular formulas but the same structural formula.'
      ],
      topic: 'Organic Chemistry', correct: 0,
      explanation: 'Isomers (n-butane and isobutane) share the molecular formula C₄H₁₀ but have different structural arrangements.',
      diveDeep: 'Structural isomers have the same molecular formula (same number and types of atoms) but different connectivity. n-butane is a straight chain; isobutane (2-methylpropane) has a branched structure. They have different physical properties (e.g., different boiling points). This is distinct from isotopes (same element, different neutrons) — do not confuse the prefixes "iso".'
    },
    {
      number: 22, part: 'A',
      text: 'Which term represents an organic reaction that produces soap?',
      choices: ['esterification', 'saponification', 'fermentation', 'solidification'],
      topic: 'Organic Chemistry', correct: 1,
      explanation: 'Saponification is the hydrolysis of a fat (ester) with a strong base (NaOH or KOH) to produce soap (fatty acid salt) and glycerol.',
      diveDeep: 'Esterification combines an acid and alcohol to form an ester plus water — the reverse of saponification. Fermentation uses yeast enzymes to convert glucose to ethanol and CO₂ (anaerobic). Saponification is a specific type of ester hydrolysis under basic conditions that produces soap. The name comes from the Latin "sapo" (soap). This is tested as a vocabulary/reaction-type identification question.'
    },
    {
      number: 23, part: 'A',
      text: 'In which part of an electrochemical cell does reduction occur?',
      choices: ['anode', 'wire', 'cathode', 'voltmeter'],
      topic: 'Redox & Electrochemistry', correct: 2,
      explanation: 'Reduction (gain of electrons) occurs at the cathode in both voltaic and electrolytic cells.',
      diveDeep: 'Memory trick: "Red Cat — An Ox" (Reduction at Cathode, Oxidation at Anode). In a voltaic cell, the cathode is positive; in an electrolytic cell, the cathode is negative. In both cases, cations in solution are attracted to the cathode where they are reduced. The wire carries electrons from anode to cathode. The voltmeter measures potential difference but is not a site of reaction.'
    },
    {
      number: 24, part: 'A',
      text: 'Which energy change occurs in an operating voltaic cell?',
      choices: ['chemical energy to electrical energy', 'chemical energy to nuclear energy', 'electrical energy to chemical energy', 'electrical energy to nuclear energy'],
      topic: 'Redox & Electrochemistry', correct: 0,
      explanation: 'A voltaic (galvanic) cell converts chemical energy from spontaneous redox reactions into electrical energy.',
      diveDeep: 'Voltaic cell: spontaneous reaction → electrical energy (e.g., a battery). Electrolytic cell: electrical energy → drives a non-spontaneous chemical reaction (e.g., electroplating, electrolysis of water). This distinction appears frequently. Nuclear energy is not involved in electrochemistry. Remembering that batteries supply electrical energy from chemical reactions is the key concept.'
    },
    { number: 25, part: 'A', text: 'According to the Brønsted-Lowry theory, an acid is a substance that', choices: ['accepts a proton', 'donates a proton', 'accepts an electron pair', 'donates an electron pair'], topic: 'Acids & Bases', correct: 1, explanation: 'A Brønsted-Lowry acid is defined as a proton (H⁺) donor — it gives a proton to the base in the reaction.', diveDeep: 'Brønsted-Lowry expands on Arrhenius: an acid donates H⁺ and a base accepts H⁺. This applies even in non-aqueous solutions. The Lewis definition is broader — Lewis acid accepts an electron pair, Lewis base donates one. The Regents tests all three definitions; know which is being asked. Conjugate acid-base pairs differ by one H⁺.' },
    { number: 26, part: 'A', text: 'Which functional group is found in an amide?', choices: ['-OH', '-COOH', '-CONH-', '-COO-'], topic: 'Organic Chemistry', correct: 2, explanation: 'The amide functional group is –CONH– (a carbonyl group bonded to a nitrogen).', diveDeep: 'Functional group identification: –OH is alcohol or carboxylic acid (if attached to C=O), –COOH is carboxylic acid, –CONH– is amide, –COO– is ester. Amides form when a carboxylic acid reacts with an amine (with loss of water), or in protein synthesis (peptide bonds). Distinguishing ester (–COO–) from amide (–CONH–) is a frequent trap on organic chemistry questions.' },
    { number: 27, part: 'A', text: 'Which type of nuclear radiation has the greatest penetrating power?', choices: ['alpha particles', 'beta particles', 'gamma rays', 'positrons'], topic: 'Nuclear Chemistry', correct: 2, explanation: 'Gamma rays are high-energy electromagnetic radiation with the greatest penetrating power, requiring lead or thick concrete to be stopped.', diveDeep: 'Penetrating power order: gamma (greatest) > beta > alpha (least). Ionizing power is the reverse: alpha (greatest) > beta > gamma. Alpha particles are stopped by paper or skin; beta by aluminum; gamma by thick lead or concrete. On the Regents, this inverse relationship between penetrating and ionizing power is tested. Gamma emission does not change mass number or atomic number.' },
    { number: 28, part: 'A', text: 'In terms of electrons, oxidation is best defined as', choices: ['a gain of electrons', 'a loss of electrons', 'a gain of protons', 'a loss of protons'], topic: 'Redox & Electrochemistry', correct: 1, explanation: 'Oxidation is defined as the loss of electrons (LEO — Lose Electrons = Oxidation).', diveDeep: 'The mnemonic LEO the lion says GER: Loss of Electrons = Oxidation; Gain of Electrons = Reduction. Oxidation number increases during oxidation. In a redox reaction, oxidation and reduction always occur together. The substance that loses electrons is the reducing agent; the one that gains electrons is the oxidizing agent. This is one of the most-tested definitions on the Chemistry Regents.' },
    { number: 29, part: 'A', text: 'In a voltaic cell, which electrode is the site of oxidation?', choices: ['cathode', 'anode', 'salt bridge', 'electrolyte'], topic: 'Redox & Electrochemistry', correct: 1, explanation: 'In a voltaic cell, oxidation (loss of electrons) occurs at the anode — the negative electrode.', diveDeep: 'Memory aid: "An Ox Red Cat" — Anode = Oxidation, Cathode = Reduction. In a voltaic cell, the anode is negative (electrons flow away from it through the external circuit to the cathode). In an electrolytic cell, the anode is connected to the positive terminal of the power supply, but oxidation still occurs there. The salt bridge maintains electrical neutrality by allowing ion flow.' },
    { number: 30, part: 'A', text: 'Which stress applied to an equilibrium system will cause the equilibrium to shift and produce more products?', choices: ['adding a product', 'removing a product', 'increasing the temperature of an exothermic reaction', 'decreasing the temperature of an endothermic reaction'], topic: 'Kinetics', correct: 1, explanation: 'Removing a product decreases its concentration, and by Le Chatelier\'s principle the equilibrium shifts right (toward products) to restore balance.', diveDeep: 'Le Chatelier\'s Principle: when a stress is applied, the system shifts to relieve that stress. Adding a product shifts left; removing a product shifts right (more products form). For temperature: raising T favors the endothermic direction; lowering T favors the exothermic direction. Adding a catalyst does NOT shift equilibrium — it speeds up both directions equally. This principle is tested heavily in Part B-1 and B-2.' },
    { number: 31, part: 'B-1', text: 'Based on Table G, what is the maximum amount of NaNO₃ that can dissolve in 100 grams of water at 40°C?', choices: ['about 55 g', 'about 65 g', 'about 75 g', 'about 104 g'], topic: 'Solutions', correct: 2, explanation: 'From Table G\'s solubility curve, NaNO₃ dissolves approximately 75 g per 100 g of water at 40°C.', diveDeep: 'Table G shows solubility curves for several compounds in g per 100 g H₂O vs. temperature. Reading a solubility curve: locate the compound\'s curve, find the temperature on the x-axis, and read across to the y-axis. At 40°C, NaNO₃ is approximately 75 g/100 g H₂O. A saturated solution holds the maximum amount at that temperature. Below the curve = unsaturated; above = supersaturated.', image: '/images/exams/chem-june-2023/q31.png' },
    { number: 32, part: 'B-1', text: 'Based on Table G, a solution that contains 90 grams of NaNO₃ dissolved in 100 grams of water at 40°C is best described as', choices: ['unsaturated', 'saturated', 'supersaturated', 'dilute'], topic: 'Solutions', correct: 0, explanation: 'At 40°C the maximum solubility of NaNO₃ is ~75 g/100 g H₂O; 90 g exceeds this maximum, making the solution supersaturated.', diveDeep: 'A supersaturated solution contains more dissolved solute than the saturation limit at that temperature — it is unstable and can crystallize rapidly when disturbed. It is prepared by dissolving extra solute at high temperature and carefully cooling. On Table G, a point plotted above the curve represents supersaturation. This concept is often paired with crystallization questions in Part B-2.', image: '/images/exams/chem-june-2023/q32.png' },
    { number: 33, part: 'B-1', text: 'Which statement correctly describes a potential energy diagram for an exothermic reaction?', choices: ['The products have higher potential energy than the reactants.', 'The products have lower potential energy than the reactants.', 'The activation energy equals the heat of reaction.', 'The activation energy is zero for an exothermic reaction.'], topic: 'Thermochemistry', correct: 1, explanation: 'In an exothermic reaction, energy is released, so products have lower potential energy than reactants; ΔH is negative.', diveDeep: 'On a PE diagram: the peak is the activated complex (transition state). Activation energy (Ea) is the energy needed to reach the peak from the reactants. ΔH = PE(products) − PE(reactants). Exothermic: products lower → ΔH < 0 (negative). Endothermic: products higher → ΔH > 0 (positive). A catalyst lowers the peak (lower Ea) but does not change the PE of reactants or products, so ΔH remains the same.' },
    { number: 34, part: 'B-1', text: 'On a heating curve for water, which segment represents the substance entirely in the gas phase?', choices: ['the segment where temperature rises from −20°C to 0°C', 'the flat segment at 0°C', 'the flat segment at 100°C', 'the segment where temperature rises above 100°C'], topic: 'Matter & Energy', correct: 3, explanation: 'Once all liquid has vaporized at 100°C, additional heat raises the temperature of the gas. The segment above 100°C where temperature is increasing represents water entirely as steam.', diveDeep: 'A heating curve for water has 5 segments: (1) solid warming, (2) melting plateau at 0°C, (3) liquid warming, (4) boiling plateau at 100°C, (5) gas warming. Flat segments = phase changes (temperature constant, energy used to break/form intermolecular forces). Sloped segments = temperature rising within a single phase. Gas phase = segment 5 (rising above 100°C). The slope depends on the specific heat capacity of each phase.' },
    { number: 35, part: 'B-1', text: 'Based on Table S, what is the trend in first ionization energy as you move down Group 1 on the Periodic Table?', choices: ['First ionization energy generally increases.', 'First ionization energy generally decreases.', 'First ionization energy remains the same.', 'First ionization energy first increases, then decreases.'], topic: 'Periodic Table', correct: 1, explanation: 'Going down Group 1, atoms have more electron shells, increasing atomic radius; the outermost electron is farther from the nucleus and easier to remove, so ionization energy decreases.', diveDeep: 'Table S lists first ionization energies. Down a group: more energy levels → larger atomic radius → valence electron farther from nucleus → less attraction → lower ionization energy. Across a period (left to right): nuclear charge increases → smaller radius → higher ionization energy. Noble gases have the highest ionization energies in each period. This trend is critical for understanding reactivity: low IE = metals readily lose electrons.' },
    { number: 36, part: 'B-1', text: 'Based on Table N, what is the product of the alpha decay of thorium-232?', choices: ['radium-228', 'radon-228', 'radium-224', 'radon-224'], topic: 'Nuclear Chemistry', correct: 0, explanation: 'Alpha decay emits an alpha particle (⁴₂He), reducing mass number by 4 (232−4=228) and atomic number by 2 (90−2=88). Element 88 is radium, so the product is radium-228.', diveDeep: 'Alpha decay: ²³²₉₀Th → ²²⁸₈₈Ra + ⁴₂He. Mass number decreases by 4, atomic number decreases by 2. Element 88 is Ra (radium) from the Periodic Table. Table N lists common nuclear equations for reference. Beta decay: mass number unchanged, atomic number increases by 1. Gamma decay: neither mass nor atomic number changes. Always check the Periodic Table to identify the product element by its atomic number.', image: '/images/exams/chem-june-2023/q36.png' },
    { number: 37, part: 'B-1', text: 'Strontium-90 has a half-life of approximately 29 years. After 58 years, what fraction of a strontium-90 sample remains?', choices: ['1/2', '1/4', '1/8', '1/3'], topic: 'Nuclear Chemistry', correct: 1, explanation: '58 years = 2 half-lives (58 ÷ 29 = 2). After 2 half-lives: (1/2)² = 1/4 of the original sample remains.', diveDeep: 'Half-life formula: remaining fraction = (1/2)^n, where n = number of half-lives elapsed. n = total time ÷ half-life = 58 ÷ 29 = 2. (1/2)² = 1/4. A common mistake is using n = 58 instead of dividing by the half-life first. Half-life is constant regardless of sample size or conditions. After 3 half-lives: 1/8; after 4: 1/16. This calculation type appears on almost every Chemistry Regents exam.', image: '/images/exams/chem-june-2023/q37.png' },
    { number: 38, part: 'B-1', text: 'What is the IUPAC name for the 4-carbon carboxylic acid?', choices: ['butanoic acid', 'butanol', 'butenoic acid', 'butanal'], topic: 'Organic Chemistry', correct: 0, explanation: 'A 4-carbon carboxylic acid (–COOH) is named butanoic acid using the but- prefix (4 carbons) and the -anoic acid suffix.', diveDeep: 'IUPAC naming for carboxylic acids: count the longest carbon chain including the –COOH carbon, use the appropriate prefix (meth-, eth-, prop-, but-, pent-...) and the suffix –anoic acid. Butanoic acid (CH₃CH₂CH₂COOH) is also known as butyric acid (responsible for the odor of rancid butter). Butanol is an alcohol (–OH), butanal is an aldehyde (–CHO), butenoic acid has a double bond (–ene–). The -anoic acid suffix confirms a saturated carboxylic acid.' },
    { number: 39, part: 'B-1', text: 'Based on Table J, which reaction will occur spontaneously?', choices: ['Al³⁺(aq) + Mg(s) → Al(s) + Mg²⁺(aq)', 'Al(s) + Mg²⁺(aq) → Al³⁺(aq) + Mg(s)', 'Cu²⁺(aq) + Ag(s) → Cu(s) + Ag⁺(aq)', 'Zn(s) + Fe²⁺(aq) → Zn²⁺(aq) + Fe(s)'], topic: 'Redox & Electrochemistry', correct: 3, explanation: 'Table J (activity series) shows Zn is above Fe, meaning Zn is more active and will spontaneously reduce Fe²⁺ ions, displacing iron from solution.', diveDeep: 'Table J lists metals in order of decreasing activity (reducing ability). A spontaneous single-replacement reaction occurs when the metal on the left side is higher on the activity series than the metal ion on the right. Zn > Fe in activity, so Zn displaces Fe²⁺ spontaneously. Al > Mg is false (Mg is higher than Al), so Al cannot displace Mg²⁺. Cu < Ag is false (Cu is above Ag), so actually Cu can displace Ag⁺ — but check answer C: it has Ag displacing Cu²⁺, which is backward.' },
    { number: 40, part: 'B-1', text: 'In a neutralization titration, what is true at the equivalence point?', choices: ['The moles of H⁺ equal the moles of OH⁻.', 'The concentration of acid equals the concentration of base.', 'The solution is always at pH 7.', 'The volume of acid equals the volume of base.'], topic: 'Acids & Bases', correct: 0, explanation: 'At the equivalence point in a neutralization reaction, the moles of H⁺ (from acid) exactly equal the moles of OH⁻ (from base), resulting in complete neutralization.', diveDeep: 'The equivalence point is defined by equal moles of H⁺ and OH⁻, not equal concentrations or volumes. The formula used is: M_a × V_a = M_b × V_b (when the acid and base are monoprotic). pH at equivalence is 7 only for strong acid + strong base titrations; with weak acids or bases, the pH will be above or below 7. This is one of the most quantitative concepts tested in Part B-2 and C.', image: '/images/exams/chem-june-2023/q40.png' },
    { number: 41, part: 'B-1', text: 'A container holds a mixture of nitrogen gas and oxygen gas. If the partial pressure of nitrogen is 600 mmHg and the partial pressure of oxygen is 200 mmHg, what is the total pressure of the gas mixture?', choices: ['400 mmHg', '600 mmHg', '800 mmHg', '1200 mmHg'], topic: 'Gas Laws', correct: 2, explanation: 'Dalton\'s Law of Partial Pressures: total pressure = sum of partial pressures. 600 + 200 = 800 mmHg.', diveDeep: 'Dalton\'s Law: P_total = P₁ + P₂ + P₃ + ... Each gas in a mixture behaves independently and contributes its partial pressure to the total. This applies to ideal gases. A common application: when collecting gas over water, the total pressure equals the gas pressure plus the vapor pressure of water (found on Table H). This concept is fundamental for stoichiometry problems involving gases collected over water.' },
    { number: 42, part: 'B-1', text: 'Which expression correctly represents percent by mass of a solute in a solution?', choices: ['(mass of solute / mass of solvent) × 100', '(mass of solute / mass of solution) × 100', '(mass of solution / mass of solute) × 100', '(mass of solvent / mass of solution) × 100'], topic: 'Solutions', correct: 1, explanation: 'Percent by mass = (mass of solute / mass of solution) × 100. The solution mass includes both solute and solvent.', diveDeep: 'A common error is dividing by the solvent mass instead of the solution mass. Mass of solution = mass of solute + mass of solvent. For example, dissolving 10 g NaCl in 90 g water gives 100 g solution → 10% by mass. This formula is on Table T. Percent by mass is an intensive property and does not change if you dilute or concentrate the solution — but the percent value itself would change.' },
    { number: 43, part: 'B-1', text: 'Using q = mCΔT, how much heat is released when 50.0 grams of water cools from 80.°C to 60.°C? (C for water = 4.18 J/g·°C)', choices: ['418 J', '2090 J', '4180 J', '8360 J'], topic: 'Thermochemistry', correct: 2, explanation: 'q = mCΔT = (50.0 g)(4.18 J/g·°C)(20.°C) = 4180 J of heat released as the water cools.', diveDeep: 'The formula q = mCΔT is on Table T. ΔT = T_final − T_initial = 60 − 80 = −20°C; the negative sign indicates heat is released (cooling). When asked for "heat released," report the magnitude (positive value). C for water = 4.18 J/g·°C (given on Table B). Key trap: forgetting to multiply all three quantities or using incorrect ΔT sign. This type of calculation appears in nearly every Part B-2 and C section.' },
    { number: 44, part: 'B-1', text: 'In the reaction Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g), which species is reduced?', choices: ['Zn', 'Cl⁻', 'H⁺', 'Zn²⁺'], topic: 'Redox & Electrochemistry', correct: 2, explanation: 'H⁺ ions gain electrons (are reduced) to form H₂ gas; the oxidation state of H goes from +1 to 0.', diveDeep: 'Assign oxidation states: Zn goes from 0 to +2 (oxidized, loses 2e⁻). H goes from +1 (in HCl) to 0 (in H₂) (reduced, gains 2e⁻). Cl stays at −1 throughout (spectator ion). Zn is the reducing agent; H⁺ is the oxidizing agent. Single-replacement reactions always involve a metal displacing hydrogen or another metal, making them straightforward redox examples. This is a bread-and-butter Regents redox identification question.', image: '/images/exams/chem-june-2023/q44.png' },
    { number: 45, part: 'B-1', text: 'Based on Table I, what is the heat of combustion of methane (CH₄)?', choices: ['−74.8 kJ/mol', '−285.8 kJ/mol', '−890.4 kJ/mol', '−1560 kJ/mol'], topic: 'Thermochemistry', correct: 2, explanation: 'Table I lists the heat of combustion of methane as −890.4 kJ/mol. The negative sign confirms an exothermic reaction.', diveDeep: 'Table I (Selected Heats of Reaction) provides ΔH values for standard reactions including combustion. CH₄ + 2O₂ → CO₂ + 2H₂O, ΔH = −890.4 kJ. −74.8 kJ/mol is the heat of formation of CH₄ (not combustion). Combustion reactions are always exothermic (negative ΔH). This value is also used in stoichiometry problems: to find heat released when a given mass of CH₄ burns, convert grams to moles and multiply by 890.4 kJ/mol.', image: '/images/exams/chem-june-2023/q45.png' },
    { number: 46, part: 'B-1', text: 'Which functional group is characteristic of an ester, formed in an esterification reaction?', choices: ['-OH', '-COOH', '-COO-', '-CONH-'], topic: 'Organic Chemistry', correct: 2, explanation: 'The ester functional group is –COO– (or –COOR). Esters are formed from the reaction of a carboxylic acid and an alcohol.', diveDeep: 'Esterification: carboxylic acid + alcohol → ester + water. The ester linkage –COO– is characteristic of fats and many fruity/floral fragrances. Contrast with amide (–CONH–), which forms from a carboxylic acid and an amine. In saponification (soap-making), esters are hydrolyzed back to acid and alcohol under basic conditions. Knowing the ester linkage structure is tested both in functional group identification and reaction-type questions.', image: '/images/exams/chem-june-2023/q46.png' },
    { number: 47, part: 'B-1', text: 'During electrolysis, toward which electrode do cations migrate?', choices: ['anode (positive electrode)', 'cathode (negative electrode)', 'salt bridge', 'external wire'], topic: 'Redox & Electrochemistry', correct: 1, explanation: 'Cations (positive ions) are attracted to the cathode, which is the negative electrode in an electrolytic cell, where they are reduced.', diveDeep: 'Opposite charges attract: cations (positive) migrate to the cathode (negative); anions (negative) migrate to the anode (positive). At the cathode, cations gain electrons (reduction). At the anode, anions lose electrons (oxidation). In electrolysis of water, H⁺ (cations) are reduced to H₂ at the cathode; OH⁻ (anions) are oxidized to O₂ at the anode. This principle also applies in the electrolytic refining of metals (e.g., copper purification).' },
    { number: 48, part: 'B-1', text: 'Which statement correctly distinguishes a strong acid from a weak acid?', choices: ['A strong acid partially dissociates in water; a weak acid fully dissociates.', 'A strong acid fully dissociates in water; a weak acid partially dissociates.', 'A strong acid has a higher Ka than 1; a weak acid has a Ka equal to 1.', 'A strong acid has a higher pH than a weak acid at the same concentration.'], topic: 'Acids & Bases', correct: 1, explanation: 'A strong acid (e.g., HCl, HNO₃) fully (completely) dissociates in water; a weak acid (e.g., CH₃COOH) only partially dissociates, establishing an equilibrium.', diveDeep: 'Strong acids: HCl, HBr, HI, HNO₃, H₂SO₄, HClO₄ — memorize these. All others are weak acids. Full dissociation means Ka is very large (not in equilibrium). Weak acid Ka is small (< 1), indicating mostly undissociated molecules at equilibrium. A strong acid of a given concentration has a lower pH (more H⁺) than a weak acid of the same concentration. This concept is tested with both conceptual and calculation questions.' },
    { number: 49, part: 'B-1', text: 'Which change increases the entropy of a system?', choices: ['A gas condenses to a liquid.', 'A liquid freezes to a solid.', 'The temperature of a gas increases.', 'A solution crystallizes.'], topic: 'Thermochemistry', correct: 2, explanation: 'Increasing the temperature of a gas increases the average kinetic energy of particles, increasing disorder (entropy).', diveDeep: 'Entropy (S) measures the disorder or randomness of a system. Entropy increases when: temperature increases, phase changes from solid → liquid → gas, a substance dissolves, or the number of moles of gas increases in a reaction. Entropy decreases when: substances condense, freeze, or crystallize (more ordered states). The Second Law of Thermodynamics states the entropy of the universe always increases for spontaneous processes. ΔG = ΔH − TΔS links entropy to spontaneity.' },
    { number: 50, part: 'B-1', text: 'A student multiplies 2.5 cm × 3.42 cm. How many significant figures should the answer contain?', choices: ['1', '2', '3', '4'], topic: 'Matter & Energy', correct: 1, explanation: 'In multiplication (and division), the result must have the same number of significant figures as the measurement with the fewest significant figures. 2.5 has 2 sig figs; 3.42 has 3 sig figs → the answer must have 2 significant figures.', diveDeep: 'Significant figure rules for multiplication/division: count sig figs in each factor and use the smallest count for the answer. 2.5 × 3.42 = 8.55 cm² → rounded to 2 sig figs = 8.6 cm². For addition/subtraction, the rule is different: use the fewest decimal places. Common traps: zeros as placeholders are not significant (0.0025 has 2 sig figs); trailing zeros after a decimal point are significant (3.40 has 3 sig figs). Significant figures appear in calculation questions throughout the exam.' },
  ]
}
