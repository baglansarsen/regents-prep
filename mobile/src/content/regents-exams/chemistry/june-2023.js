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
      diveDeep: 'Table I lists heats of reaction. Exothermic reactions release energy as a product; endothermic reactions absorb energy as a reactant. The equation must also be balanced: 1 CH₄ + 2 O₂ → 1 CO₂ + 2 H₂O. Two common errors: placing energy on the wrong side, and forgetting to balance O atoms (requires coefficient 2 for O₂ and H₂O).'
    },
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
  ]
}
