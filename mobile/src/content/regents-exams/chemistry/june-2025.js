// Chemistry Regents — June 2025
export default {
  id: 'chem-jun-2025',
  subject: 'chemistry',
  year: 2025,
  session: 'June',
  totalMinutes: 180,
  questions: [
    {
      number: 1, part: 'A',
      text: 'Which description is based on the results of the gold foil experiment?',
      choices: ['Atoms are small, hard, indivisible spheres.', 'Atoms contain electrons embedded in a diffuse positive cloud.', 'Atoms have a small, dense, positively charged nucleus.', 'Atoms have electrons with wavelike properties.'],
      topic: 'Atomic Structure', correct: 2,
      explanation: 'Rutherford\'s gold foil experiment demonstrated that atoms have a small, dense, positively charged nucleus, with most of the atom being empty space.',
      diveDeep: 'Before Rutherford, Thomson\'s plum-pudding model placed electrons in a diffuse positive sphere. When Rutherford fired alpha particles at gold foil, most passed through, but a few deflected sharply — only a tiny, dense, positive nucleus could explain this result. Neutrons were not yet discovered (Chadwick, 1932) and wave properties came from de Broglie. Each answer maps to a different historical atomic model.'
    },
    {
      number: 2, part: 'A',
      text: 'According to the wave-mechanical model, which term describes the most probable location of an electron in an atom?',
      choices: ['nucleus', 'orbital', 'configuration', 'spectrum'],
      topic: 'Atomic Structure', correct: 1,
      explanation: 'An orbital is a region of space around the nucleus where an electron is most likely to be found, as defined by the wave-mechanical model.',
      diveDeep: 'Orbitals are defined by quantum numbers and represent probability distributions — not fixed paths. Electron configuration describes how electrons fill available orbitals. Spectrum refers to wavelengths of emitted or absorbed light. The nucleus houses protons and neutrons only. Orbital shapes include s (spherical), p (dumbbell), and d (more complex), each accommodating up to 2 electrons.'
    },
    {
      number: 3, part: 'A',
      text: 'Which statement describes what occurs when an electron in an atom moves from a lower energy state to a higher energy state?',
      choices: ['A photon is emitted and the electron gains energy.', 'A photon is absorbed and the electron gains energy.', 'A photon is emitted and the electron loses energy.', 'A photon is absorbed and the electron loses energy.'],
      topic: 'Atomic Structure', correct: 1,
      explanation: 'When an electron absorbs a photon of the correct energy, it moves from a lower energy level to a higher energy level.',
      diveDeep: 'The photon\'s energy must exactly match the difference between the two energy levels (E = hf). This is the basis of atomic absorption spectra — each element absorbs specific wavelengths unique to its energy levels. The reverse (electron dropping down) emits a photon and produces emission spectra. Quantized energy levels mean only specific photon energies are absorbed or emitted, not a continuous range.'
    },
    {
      number: 4, part: 'A',
      text: 'The bright-line spectrum of an element is produced when electrons in the atoms of that element',
      choices: ['are removed from the atoms', 'move from lower to higher energy levels', 'move from higher to lower energy levels', 'are captured by the nuclei of the atoms'],
      topic: 'Atomic Structure', correct: 2,
      explanation: 'Electrons release photons of specific wavelengths (visible light) when they fall from higher to lower energy levels, producing a characteristic bright-line (emission) spectrum.',
      diveDeep: 'Each element\'s bright-line spectrum is unique — like a fingerprint — because energy levels are element-specific. The energy of each emitted photon equals the energy difference between levels (E = hf = hc/λ). This is the basis for spectroscopic identification of elements in stars and laboratories. The Regents may show a spectrum diagram and ask you to identify the transitions responsible for each line.'
    },
    {
      number: 5, part: 'A',
      text: 'Which phrase describes all isotopes of an element?',
      choices: ['same atomic number and same mass number', 'same atomic number and different mass numbers', 'different atomic numbers and same mass number', 'different atomic numbers and different mass numbers'],
      topic: 'Atomic Structure', correct: 1,
      explanation: 'Isotopes of an element always have the same number of protons (same atomic number) but different numbers of neutrons, giving them different mass numbers.',
      diveDeep: 'Carbon-12 and Carbon-14 both have 6 protons but 6 and 8 neutrons respectively — making them isotopes. Different atomic numbers would mean different elements. Isotopes have identical chemical properties (same electron configuration) but different physical properties, particularly mass. Radioactive isotopes have unstable nucleus configurations that decay over time, emitting radiation.'
    },
    {
      number: 6, part: 'A',
      text: 'Which property of an element determines its placement in a period of the Periodic Table?',
      choices: ['atomic mass', 'atomic number', 'number of neutrons', 'number of electron shells'],
      topic: 'Periodic Table', correct: 3,
      explanation: 'Elements are placed in a period (row) based on the number of occupied electron shells, which increases by one across each period.',
      diveDeep: 'Period number equals the number of principal energy levels containing electrons. All elements in Period 2 have electrons in 2 shells; Period 3 elements have 3 shells. Atomic number determines the element\'s identity and column placement within a group. Atomic mass is not the organizing principle of the modern periodic table (Mendeleev initially used mass, but Moseley corrected this to atomic number).'
    },
    {
      number: 7, part: 'A',
      text: 'Which formula contains a polyatomic ion?',
      choices: ['CaCl₂', 'Na₂SO₄', 'MgO', 'NaF'],
      topic: 'Chemical Bonding', correct: 1,
      explanation: 'Na₂SO₄ contains the sulfate ion (SO₄²⁻), which is a polyatomic ion consisting of one sulfur atom and four oxygen atoms with a 2− charge.',
      diveDeep: 'Polyatomic ions are groups of two or more covalently bonded atoms that carry a net charge. Common ones to memorize from Table E: OH⁻, CN⁻, NH₄⁺, NO₃⁻, SO₄²⁻, CO₃²⁻, PO₄³⁻, CrO₄²⁻. CaCl₂, MgO, and NaF all contain only monatomic ions. The ability to recognize polyatomic ions in formulas is essential for naming compounds and writing ionic equations.'
    },
    {
      number: 8, part: 'A',
      text: 'What information about C₄H₁₀ can be determined from its structural formula but NOT from its molecular formula alone?',
      choices: ['molar mass', 'ratio of atoms', 'arrangement of atoms', 'number of carbon atoms'],
      topic: 'Chemical Bonding', correct: 2,
      explanation: 'The structural formula shows how atoms are bonded and arranged, which allows identification of isomers that have the same molecular formula.',
      diveDeep: 'C₄H₁₀ can be either n-butane (straight chain) or isobutane (branched) — two structural isomers with different properties but the same molecular formula. The molecular formula alone cannot distinguish them. Molar mass and atom ratios can be derived from the molecular formula. Structural formulas are essential for identifying functional groups in organic chemistry, which determine chemical behavior.'
    },
    {
      number: 9, part: 'A',
      text: 'Which quantity is conserved in all chemical reactions?',
      choices: ['moles', 'volume', 'charge', 'density'],
      topic: 'Stoichiometry', correct: 2,
      explanation: 'Electric charge is conserved in all chemical reactions — the total net charge of reactants equals the total net charge of products.',
      diveDeep: 'Conservation laws in chemistry: (1) mass/atoms are conserved, (2) charge is conserved, (3) energy is conserved. Total moles can change (2 mol H₂ + 1 mol O₂ → 2 mol H₂O: 3 mol reactants, 2 mol products). Volume and density are not conserved. Conservation of charge is especially important when balancing half-reactions in electrochemistry and redox equations.'
    },
    {
      number: 10, part: 'A',
      text: 'Given the equation representing a reaction: Br + Br → Br₂  Which statement describes what occurs during this reaction?',
      choices: ['Energy is released as bonds are formed.', 'Energy is released as bonds are broken.', 'Energy is absorbed as bonds are formed.', 'Energy is absorbed as bonds are broken.'],
      topic: 'Chemical Bonding', correct: 0,
      explanation: 'Bond formation is always exothermic — energy is released when atoms combine to form a covalent bond in Br₂.',
      diveDeep: 'Bond formation releases energy; bond breaking absorbs energy. In Br + Br → Br₂, a new Br–Br bond forms, releasing approximately 194 kJ/mol of energy. The reverse (Br₂ → Br + Br) absorbs energy. This principle applies universally: reactions that form strong bonds (large bond dissociation energies) release more energy. Net ΔH of a reaction = energy of bonds broken − energy of bonds formed.'
    },
    {
      number: 11, part: 'A',
      text: 'Which term represents a property used to determine the degree of polarity in the bond between two atoms?',
      choices: ['conductivity', 'joule', 'electronegativity', 'pascal'],
      topic: 'Chemical Bonding', correct: 2,
      explanation: 'Electronegativity difference between two bonded atoms determines whether the bond is nonpolar covalent, polar covalent, or ionic.',
      diveDeep: 'ΔEN < 0.4: nonpolar covalent; 0.4–1.7: polar covalent; > 1.7: ionic. Conductivity is a physical/electrical property. Joule is a unit of energy. Pascal is a unit of pressure. Electronegativity values are listed in the Periodic Table of the NY Regents Reference Tables. Fluorine has the highest electronegativity (4.0); noble gases and metals tend to have low values. Polarity affects solubility, intermolecular forces, and reactivity.'
    },
    {
      number: 12, part: 'A',
      text: 'Which sample of matter has proportions of components that can be varied?',
      choices: ['solid iodine', 'liquid ammonia', 'gaseous iodine', 'aqueous ammonia'],
      topic: 'Matter & Energy', correct: 3,
      explanation: 'Aqueous ammonia is a solution (mixture) — the ratio of ammonia to water can be varied, unlike pure substances which have fixed compositions.',
      diveDeep: 'Pure substances (elements and compounds) have fixed, definite compositions: solid I₂, liquid NH₃, and gaseous I₂ are pure. Aqueous ammonia (NH₃ dissolved in water) is a solution — a homogeneous mixture whose concentration can range from nearly 0% to ~35% NH₃. Mixtures can always be varied in proportion. This is a fundamental distinction between pure substances and mixtures tested frequently on the Regents.'
    },
    {
      number: 13, part: 'A',
      text: 'Which term identifies a form of energy?',
      choices: ['pascal', 'temperature', 'molarity', 'electromagnetic'],
      topic: 'Matter & Energy', correct: 3,
      explanation: 'Electromagnetic (radiation) is a form of energy that travels as waves and includes visible light, UV, X-rays, and radio waves.',
      diveDeep: 'Forms of energy include: electromagnetic radiation, kinetic energy, thermal energy, potential energy, chemical energy, and nuclear energy. Pascal is a unit of pressure (Pa = N/m²). Temperature measures average kinetic energy of particles but is not itself a form of energy. Molarity (mol/L) is a measure of concentration. Electromagnetic radiation transfers energy through space — its energy is E = hf (Planck\'s equation).'
    },
    {
      number: 14, part: 'A',
      text: 'According to the kinetic molecular theory, which statement describes the particles of an ideal gas?',
      choices: ['The force of attraction between the particles is strong.', 'The particles are arranged in a regular, geometric pattern.', 'The particles move in random, constant, straight-line motion.', 'The collisions between particles result in a net loss of energy.'],
      topic: 'Matter & Energy', correct: 2,
      explanation: 'Kinetic molecular theory states that ideal gas particles move in random, constant, straight-line motion and change direction only when they collide.',
      diveDeep: 'Four key ideal gas assumptions: (1) no intermolecular attractions or repulsions, (2) particle volume negligible compared to container, (3) elastic collisions — no net energy loss, (4) random straight-line motion. Regular geometric arrangement describes solids (crystalline). Strong attractions describe liquids and solids. Real gases deviate most at high pressure and low temperature when particles are crowded and attractions become significant.'
    },
    {
      number: 15, part: 'A',
      text: 'A reaction most likely occurs when particles collide with proper energy and',
      choices: ['mass', 'volume', 'density', 'orientation'],
      topic: 'Equilibrium & Kinetics', correct: 3,
      explanation: 'Collision theory requires that reacting particles collide with both sufficient activation energy AND the correct spatial orientation for bonds to break and form.',
      diveDeep: 'Even at high temperatures with abundant energy, collisions can be ineffective if molecules are not oriented so their reactive sites meet. For example, H₂ + Cl₂ requires the H–H and Cl–Cl bonds to be accessible to each other. Mass, volume, and density are physical properties that do not determine whether a collision is effective. Catalysts work partly by providing a surface that orients reactants favorably, lowering the frequency of ineffective collisions.'
    },
    {
      number: 16, part: 'A',
      text: 'At STP, 2.0 liters of N₂(g) and 2.0 liters of O₂(g) have the same',
      choices: ['density', 'boiling point', 'melting point', 'number of molecules'],
      topic: 'Matter & Energy', correct: 3,
      explanation: 'By Avogadro\'s Law, equal volumes of gases at the same temperature and pressure contain equal numbers of molecules.',
      diveDeep: 'N₂ molar mass = 28 g/mol; O₂ molar mass = 32 g/mol. Equal volumes at STP (0°C, 1 atm) contain equal moles, hence equal numbers of molecules. Their densities differ (density = molar mass / 22.4 L/mol at STP): N₂ ≈ 1.25 g/L, O₂ ≈ 1.43 g/L. Their boiling and melting points also differ. "Same number of molecules" is the direct consequence of Avogadro\'s Law and appears regularly on Regents exams.'
    },
    {
      number: 17, part: 'A',
      text: 'Which phrase describes a factor that determines the physical state of a molecular substance?',
      choices: ['arrangement of the molecules', 'decay mode of the molecules', 'conductivity of the molecules', 'solubility of the molecules'],
      topic: 'Matter & Energy', correct: 0,
      explanation: 'The physical state (solid, liquid, gas) of a molecular substance depends on the arrangement and relative motion of its molecules, which is governed by intermolecular forces and temperature.',
      diveDeep: 'In a solid, molecules are in fixed, ordered positions; in a liquid, they are close but mobile; in a gas, they are far apart and move freely. Decay mode refers to radioactive decay — a nuclear property unrelated to physical state. Conductivity is an electrical property. Solubility measures how much dissolves in a solvent. Temperature and the strength of intermolecular forces (IMFs) are the primary determinants of physical state.'
    },
    {
      number: 18, part: 'A',
      text: 'Which combination of reactants will result in the fastest rate of reaction of a 1.0-gram sample of Zn(s) and 30. milliliters of HCl(aq) at 25°C?',
      choices: ['1.0-g cube of Zn(s) with 1.0 M HCl(aq)', '1.0-g cube of Zn(s) with 2.0 M HCl(aq)', '1.0-g powdered Zn(s) with 1.0 M HCl(aq)', '1.0-g powdered Zn(s) with 2.0 M HCl(aq)'],
      topic: 'Equilibrium & Kinetics', correct: 3,
      explanation: 'Powdered Zn has a greater surface area AND 2.0 M HCl has a higher concentration — both factors independently increase reaction rate, together they produce the fastest rate.',
      diveDeep: 'Factors that increase reaction rate: increased concentration, higher temperature, smaller particle size (greater surface area), and the use of a catalyst. Powdered zinc exposes far more Zn atoms to acid than a cube of the same mass. Higher molarity means more H⁺ ions per liter for more frequent effective collisions. This question tests two factors simultaneously — always identify which choice maximizes all favorable variables at once.'
    },
    {
      number: 19, part: 'A',
      text: 'Which term represents the energy absorbed or released during a chemical change?',
      choices: ['heat of fusion', 'heat of reaction', 'heat of vaporization', 'heat capacity'],
      topic: 'Matter & Energy', correct: 1,
      explanation: 'Heat of reaction (ΔH) is the energy absorbed or released when reactants are converted to products in a chemical reaction.',
      diveDeep: 'Heat of fusion is the energy to melt a solid; heat of vaporization is the energy to evaporate a liquid — both are physical changes. Heat capacity (q = mcΔT) measures a substance\'s ability to store thermal energy. Only heat of reaction specifically describes energy changes in chemical processes. Exothermic reactions release energy (negative ΔH); endothermic reactions absorb energy (positive ΔH). Table I in the Regents Reference Tables lists heats of reaction for common reactions.'
    },
    {
      number: 20, part: 'A',
      text: 'In terms of energy and disorder, systems in nature have a tendency to undergo changes toward',
      choices: ['lower energy and greater disorder', 'lower energy and less disorder', 'higher energy and greater disorder', 'higher energy and less disorder'],
      topic: 'Matter & Energy', correct: 0,
      explanation: 'Natural systems spontaneously move toward states of lower energy (stability) and greater disorder (higher entropy), which is consistent with thermodynamic principles.',
      diveDeep: 'The second law of thermodynamics states that the entropy (disorder) of the universe increases in spontaneous processes. Combustion, dissolution, and gas expansion all increase disorder. Systems also tend to move toward lower potential energy (lower enthalpy). When both conditions are met (lower energy AND greater disorder), reactions are always spontaneous. When they oppose each other, temperature determines which dominates (Gibbs free energy: ΔG = ΔH − TΔS).'
    },
    {
      number: 21, part: 'A',
      text: 'A molecule of which straight-chain hydrocarbon contains nine carbon atoms?',
      choices: ['butane', 'nonane', 'hexane', 'propane'],
      topic: 'Organic Chemistry', correct: 1,
      explanation: 'Nonane is the straight-chain alkane with nine carbon atoms (C₉H₂₀); the prefix "non-" means nine.',
      diveDeep: 'Alkane naming uses Greek/Latin prefixes for carbon count: meth-(1), eth-(2), prop-(3), but-(4), pent-(5), hex-(6), hept-(7), oct-(8), non-(9), dec-(10). Butane has 4 carbons; hexane has 6; propane has 3; nonane has 9. These prefixes appear throughout organic chemistry — alcohols, aldehydes, ketones, and acids use the same root names. Table P in the Regents Reference Tables summarizes organic prefixes.'
    },
    {
      number: 22, part: 'A',
      text: 'Which compound is an unsaturated hydrocarbon?',
      choices: ['1-heptanol', 'octane', '2-butyne', 'ethanal'],
      topic: 'Organic Chemistry', correct: 2,
      explanation: '2-butyne is an unsaturated hydrocarbon because it contains a carbon-carbon triple bond, meaning it has fewer than the maximum number of hydrogen atoms.',
      diveDeep: 'Unsaturated hydrocarbons contain at least one double (alkenes) or triple bond (alkynes) between carbon atoms. 2-butyne (C₄H₆) has a triple bond: CH₃–C≡C–CH₃. Octane (C₈H₁₈) is a saturated alkane with only single bonds. 1-heptanol contains an –OH group, making it an alcohol, not a hydrocarbon. Ethanal (CH₃CHO) is an aldehyde — also not a hydrocarbon. Hydrocarbons contain ONLY carbon and hydrogen atoms.'
    },
    {
      number: 23, part: 'A',
      text: 'What is the number of electrons shared between the carbon atoms in an ethene molecule?',
      choices: ['6', '3', '2', '4'],
      topic: 'Organic Chemistry', correct: 3,
      explanation: 'Ethene (C₂H₄) contains a carbon-carbon double bond, which consists of 4 shared electrons (2 pairs) between the two carbon atoms.',
      diveDeep: 'Ethene structure: H₂C=CH₂. Each carbon forms 4 bonds: 2 to H and a double bond to the other C. A double bond = 2 shared pairs = 4 electrons. A single bond = 1 pair = 2 electrons; a triple bond = 3 pairs = 6 electrons. The question asks specifically about electrons shared between the two carbons only — not total bonding electrons in the molecule. Identifying bond order and electron count is fundamental to organic and general chemistry.'
    },
    {
      number: 24, part: 'A',
      text: 'Which two terms represent types of organic reactions?',
      choices: ['solidification and polymerization', 'solidification and vaporization', 'substitution and polymerization', 'substitution and vaporization'],
      topic: 'Organic Chemistry', correct: 2,
      explanation: 'Substitution and polymerization are both types of organic reactions; substitution replaces a functional group, and polymerization links monomers into large polymer chains.',
      diveDeep: 'Major organic reaction types tested on the Regents: addition (adds atoms across a double bond), substitution (replaces one atom/group with another), fermentation (glucose → ethanol + CO₂), esterification (acid + alcohol → ester + water), saponification (ester + base → soap), combustion, and polymerization (monomers → polymer). Solidification and vaporization are physical changes, not organic reaction types. Table R in the Regents Reference Tables summarizes organic reactions.'
    },
  ]
}
