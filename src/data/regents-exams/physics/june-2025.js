// Physics Regents — June 2025
export default {
  id: 'phys-june-2025',
  subject: 'physics',
  year: 2025,
  session: 'June',
  totalMinutes: 180,
  questions: [
    {
      number: 1,
      part: 'A',
      text: 'A car accelerates uniformly from rest at 3.0 meters per second squared for 4.0 seconds. What is the total displacement of the car during this time interval?',
      choices: ['6.0 m', '12 m', '24 m', '48 m'],
      topic: 'Mechanics & Forces',
      correct: 2,
      explanation: 'The displacement is 24 meters, calculated using the kinematic equation d = vᵢt + ½at². Since the car starts from rest, the initial velocity is zero, and the equation simplifies to ½(3.0 m/s²)(4.0 s)².',
      diveDeep: 'When solving kinematics problems, always list your \'givens\' first to identify which equation fits best. \'From rest\' is a crucial clue that vᵢ = 0, which often makes the math much simpler. The most frequent error students make is forgetting to square the time or forgetting the ½ in the formula. A good habit is to write the full formula out before plugging in numbers to avoid these simple calculation traps.'
    },
    {
      number: 2,
      part: 'A',
      text: 'A 20.-Newton horizontal force is required to slide a 5.0-kilogram box across a level floor at constant speed. What is the coefficient of kinetic friction between the box and the floor?',
      choices: ['0.25', '0.41', '2.0', '4.0'],
      topic: 'Mechanics & Forces',
      correct: 1,
      explanation: 'The coefficient of kinetic friction is 0.41. Because the box moves at a constant speed, the force of friction is equal to the applied horizontal force (20 N); dividing this by the box\'s weight (mg ≈ 49 N) yields the coefficient.',
      diveDeep: 'The phrase \'constant speed\' tells you that the net force is zero, meaning friction exactly cancels out the 20 N push. To find the coefficient (μ), you must divide the friction force by the normal force, which on a level surface is equal to the weight (mg). A common mistake is using the mass (5.0 kg) instead of the weight (49 N) in the denominator. Remember that μ is a unitless ratio that describes the \'grippiness\' of the two surfaces.'
    },
    {
      number: 3,
      part: 'A',
      text: 'An object travels in a circular path at constant speed. The direction of the object\'s centripetal acceleration is always',
      choices: [
        'tangent to the circular path',
        'opposite the direction of the object\'s velocity',
        'toward the center of the circular path',
        'away from the center of the circular path'
      ],
      topic: 'Mechanics & Forces',
      correct: 2,
      explanation: 'For any object in circular motion, the centripetal acceleration is always directed toward the center of the circle. This inward acceleration is necessary to constantly change the object\'s direction and maintain the curved path.',
      diveDeep: 'The word \'centripetal\' literally means \'center-seeking,\' which helps you remember its direction. While the velocity of the object is always tangent to the path, the acceleration and the net force must point toward the center. Many students wrongly believe there is an \'outward\' force, but that is actually just the object\'s inertia trying to keep it moving in a straight line. Always draw a vector arrow pointing to the middle of the circle when asked about centripetal force or acceleration.'
    },
    {
      number: 4,
      part: 'A',
      text: 'The gravitational force of attraction between two masses is F. If the mass of one object is doubled and the distance between their centers is also doubled, the new gravitational force will be',
      choices: ['F/2', '2F', 'F/4', '4F'],
      topic: 'Mechanics & Forces',
      correct: 0,
      explanation: 'The new force will be F/2. While doubling one mass doubles the force (2F), doubling the distance between the masses reduces the force by a factor of four (1/2²), leading to a net change of 2/4, which simplifies to 1/2.',
      diveDeep: 'This problem tests your understanding of the Inverse Square Law. The force of gravity is proportional to the masses but inversely proportional to the square of the distance. If you double the distance, the force is divided by 2² (which is 4). A transferable strategy for these \'ratio\' questions is to plug the changes directly into the formula: (2 × 1) / (2²) = 2/4 = 0.5. This method prevents confusion when multiple variables change at once.'
    },
    {
      number: 5,
      part: 'A',
      text: 'A 5.0-kilogram mass is raised 2.0 meters vertically above the ground. How much work is done against gravity to raise the mass?',
      choices: ['10. J', '49 J', '98 J', '245 J'],
      topic: 'Energy & Power',
      correct: 1,
      explanation: 'The work done against gravity is equal to the change in gravitational potential energy, calculated using the formula W = mgh. Multiplying the mass (5.0 kg) by the acceleration due to gravity (9.81 m/s²) and the height (2.0 m) gives 98 Joules. Choice 1 (49 J) is incorrect because it only represents the weight of the object, not the total work performed.',
      diveDeep: 'Work is defined as the product of the force applied and the displacement in the direction of that force. When lifting an object at a constant speed, the force required is equal to the object\'s weight (mg). A common student trap is forgetting to multiply the weight by the distance or confusing mass with weight. On the Regents exam, always verify if you are being asked for the force (Newtons) or the work/energy (Joules) to ensure you use the complete formula.'
    },
    {
      number: 6,
      part: 'A',
      text: 'Electric current is defined as the rate of flow of electric charge. Which formula correctly represents current?',
      choices: ['I = q/t', 'I = V/R', 'I = P/V', 'I = F/q'],
      topic: 'Electricity & Magnetism',
      correct: 0,
      explanation: 'Electric current is defined as the rate at which charge passes a point, which is mathematically expressed as I = q/t. Choice 0 directly represents this relationship, where \'q\' is charge in Coulombs and \'t\' is time in seconds.',
      diveDeep: 'In physics, the term \'rate\' almost always indicates that a quantity is being divided by time. While formulas like I = V/R (Ohm\'s Law) or I = P/V (Power) can be used to calculate current in specific circuit scenarios, they do not define what current fundamentally is. When you see \'rate of flow\' on the exam, look for the formula that places time (t) in the denominator. This definition helps explain why the unit for current, the Ampere, is equivalent to one Coulomb per second.'
    },
    {
      number: 7,
      part: 'A',
      text: 'If three 6.0-Ohm resistors are connected in series, what is their equivalent combined resistance?',
      choices: ['2.0 Ω', '6.0 Ω', '12 Ω', '18 Ω'],
      topic: 'Electricity & Magnetism',
      correct: 3,
      explanation: 'In a series circuit, the total or equivalent resistance is the sum of all individual resistors (Req = R1 + R2 + R3). Adding three 6.0 Ω resistors together gives a total resistance of 18 Ω.',
      diveDeep: 'Series circuits provide only one path for the flow of electrons, meaning every resistor added increases the total opposition to the current. A common error is using the parallel resistance formula, which would result in 2.0 Ω (choice 0). A helpful exam strategy is to remember that in series, the equivalent resistance must always be larger than any single resistor in the circuit, while in parallel, it will always be smaller.'
    },
    {
      number: 8,
      part: 'A',
      text: 'Two wave pulses traveling in opposite directions meet and interfere, resulting in a wave pulse with a larger displacement. This phenomenon is known as',
      choices: ['refraction', 'diffraction', 'constructive interference', 'destructive interference'],
      topic: 'Waves & Optics',
      correct: 2,
      explanation: 'This phenomenon is known as constructive interference, which occurs when two waves meet \'in phase\' (such as crest meeting crest) to create a larger resultant amplitude. The individual displacements add together at the point of overlap.',
      diveDeep: 'The principle of superposition allows wave pulses to occupy the same space at the same time, combining their amplitudes algebraically. Destructive interference would occur if a crest met a trough, resulting in a smaller displacement or total cancellation. On the exam, if you are told the displacement increases, it is constructive; if it decreases, it is destructive. Remember that after meeting, the pulses continue on their original paths unchanged in shape or direction.'
    },
    {
      number: 9,
      part: 'A',
      text: 'What is the energy of a photon emitted during a transition that releases 2.0 electron-Volts of energy?',
      choices: ['1.3 × 10^-19 J', '3.2 × 10^-19 J', '2.0 × 10^19 J', '6.0 × 10^-19 J'],
      topic: 'Modern Physics',
      correct: 1,
      explanation: 'To find the energy in Joules, you must convert from electron-Volts using the conversion factor 1 eV = 1.60 × 10⁻¹⁹ J. Multiplying 2.0 eV by this factor results in 3.2 × 10⁻¹⁹ Joules.',
      diveDeep: 'Electron-Volts (eV) are often used in atomic physics because Joules are inconveniently large for such small energy changes, but standard formulas require SI units. You can always find this conversion factor on the first page of your Physics Reference Tables. Watch the exponents carefully: atomic energies will almost always have a very small, negative exponent (like 10⁻¹⁹). Choice 2 is a distractor with a positive exponent, which would represent an impossible amount of energy for a single photon.'
    },
    {
      number: 10,
      part: 'A',
      text: 'According to the Standard Model, which of the following is classified as a fundamental force carrier (gauge boson) for electromagnetism?',
      choices: ['photon', 'graviton', 'gluon', 'W/Z boson'],
      topic: 'Modern Physics',
      correct: 0,
      explanation: 'The photon is the fundamental force carrier, or gauge boson, responsible for mediating the electromagnetic force. Each fundamental force has a specific particle associated with its interaction.',
      diveDeep: 'The Standard Model organizes particles into matter (fermions) and force carriers (bosons). While gluons carry the strong nuclear force and W/Z bosons carry the weak nuclear force, photons are responsible for all electromagnetic interactions, from light to radio waves to the attraction between protons and electrons. To succeed on Standard Model questions, it is helpful to memorize the \'Boson-Force\' pairs found in the particles section of your Reference Tables.'
    },
    {
      number: 11,
      part: 'A',
      text: 'Which quantity is a vector?',
      choices: ['mass', 'displacement', 'distance', 'time'],
      topic: 'Mechanics & Forces',
      correct: 1,
      explanation: 'Displacement is a vector because it describes both the magnitude of the distance covered and the specific direction from the starting point. Mass, distance, and time are scalars, meaning they only have magnitude.',
      diveDeep: 'The primary difference between a vector and a scalar is direction. For example, \'5 meters\' is a distance (scalar), while \'5 meters East\' is a displacement (vector). On the Regents exam, common vectors include displacement, velocity, acceleration, force, and momentum. If you can describe a quantity with just a number and a unit without needing to say \'which way,\' it is almost certainly a scalar.'
    },
    {
      number: 12,
      part: 'A',
      text: 'An object is in equilibrium when the net force acting on the object is',
      choices: ['zero', 'directed upward', 'directed downward', 'equal to its mass'],
      topic: 'Mechanics & Forces',
      correct: 0,
      explanation: 'An object is in equilibrium when the vector sum of all forces acting on it (the net force) is zero. This indicates that there is no change in the object\'s state of motion.',
      diveDeep: 'Equilibrium does not necessarily mean the object is at rest; it means the object\'s acceleration is zero. An object moving at a constant velocity in a straight line is just as much in equilibrium as a stationary object. If the net force were directed upward or downward, the object would be accelerating in that direction. A key exam strategy is to equate \'equilibrium\' with \'constant velocity\' or \'static\' (not moving) and instantly set the sum of forces to zero.'
    },
    {
      number: 13,
      part: 'A',
      text: 'The inertia of an object is directly proportional to its',
      choices: ['velocity', 'mass', 'acceleration', 'force'],
      topic: 'Mechanics & Forces',
      correct: 1,
      explanation: 'Inertia is the resistance of an object to changes in its motion and is determined solely by its mass. Therefore, an object with more mass has more inertia.',
      diveDeep: 'A common misconception is that inertia depends on speed or velocity, but a 100 kg rock has the same inertia whether it is sitting still or flying through space. Inertia is a property of matter, not a force or a state of motion. On the exam, if you are asked to compare the inertia of two objects, ignore their speeds and simply pick the one with the higher mass value.'
    },
    {
      number: 14,
      part: 'A',
      text: 'What is the momentum of a 2.0-kilogram mass moving at 5.0 meters per second?',
      choices: ['2.5 kg·m/s', '5.0 kg·m/s', '10. kg·m/s', '20. kg·m/s'],
      topic: 'Mechanics & Forces',
      correct: 2,
      explanation: 'Momentum is calculated using the formula p = mv, where mass is multiplied by velocity. For this object, 2.0 kg × 5.0 m/s equals 10. kg·m/s.',
      diveDeep: 'Momentum is a vector quantity that describes \'mass in motion.\' It is directly proportional to both mass and velocity, meaning if you double either one, the momentum doubles as well. Be careful not to confuse this with kinetic energy (1/2 mv²), which would involve squaring the velocity. Always check the units in the answer choices; momentum units are always a mass unit multiplied by a velocity unit (kg·m/s).'
    },
    {
      number: 15,
      part: 'A',
      text: 'A student drop-kicks a ball horizontally from a cliff. The horizontal component of the ball\'s velocity',
      choices: ['remains constant', 'increases', 'decreases', 'first increases, then decreases'],
      topic: 'Mechanics & Forces',
      correct: 0,
      explanation: 'The horizontal component of the ball\'s velocity remains constant (choice 1) because there are no horizontal forces, such as air resistance, acting on the ball once it is released. Gravity only acts vertically, affecting the vertical velocity but not the horizontal one.',
      diveDeep: 'This question tests the independence of vertical and horizontal motion in projectile physics. While gravity accelerates the ball downward at 9.8 m/s², it has no effect on the horizontal motion. Students often mistakenly think the ball slows down horizontally, but in Regents physics, we assume a vacuum unless stated otherwise. A key strategy is to always separate motion into x and y components and remember that only forces in a specific direction can change velocity in that direction.'
    },
    {
      number: 16,
      part: 'A',
      text: 'As a body falls freely near Earth\'s surface, its acceleration',
      choices: ['remains constant', 'increases', 'decreases', 'first increases, then decreases'],
      topic: 'Mechanics & Forces',
      correct: 0,
      explanation: 'The acceleration of a body in free fall remains constant (choice 1) at approximately 9.8 m/s² toward the center of the Earth. Even though the object\'s velocity is increasing, the rate at which it increases (acceleration) stays the same due to the uniform gravitational field.',
      diveDeep: 'A common trap is confusing velocity with acceleration; while the speed increases every second, the \'push\' from gravity remains steady. In the \'free fall\' model, we ignore air resistance, which in reality would eventually lead to terminal velocity where acceleration becomes zero. For the exam, remember that \'free fall\' is a code word for constant acceleration. Strategy: Whenever you see \'freely\' or \'free fall,\' immediately think of the constant value \'g\' from your reference table.'
    },
    {
      number: 17,
      part: 'A',
      text: 'Which unit is equivalent to a Joule?',
      choices: ['Newton · meter', 'Newton / meter', 'Watt · second^2', 'Kilogram · meter / second'],
      topic: 'Energy & Power',
      correct: 0,
      explanation: 'A Newton · meter is equivalent to a Joule. This is because work and energy are defined as a force (Newtons) applied over a distance (meters).',
      diveDeep: 'Understanding unit equivalence is a common Regents topic; a Joule is also equal to a Watt · second or a kg·m²/s². Distractors like Newton/meter describe the spring constant, while kg·m/s describes momentum. A great strategy is to check your formula sheet: any terms that multiply to equal Work or Energy will give you an equivalent unit for Joules.'
    },
    {
      number: 18,
      part: 'A',
      text: 'As an object falls freely near Earth\'s surface, the kinetic energy of the object',
      choices: ['remains constant', 'increases', 'decreases', 'first decreases, then increases'],
      topic: 'Energy & Power',
      correct: 1,
      explanation: 'The kinetic energy increases (choice 2) because the object is accelerating downward, which increases its velocity. Since kinetic energy is proportional to the square of velocity (KE = ½mv²), any increase in speed results in an increase in kinetic energy.',
      diveDeep: 'This problem illustrates the Law of Conservation of Energy: as the object loses height (gravitational potential energy), it must gain speed (kinetic energy). Students sometimes confuse this with the \'total mechanical energy,\' which remains constant, but the individual types of energy change. A useful strategy is to track the energy transformation: \'Falling\' means height goes down (PE decreases) and speed goes up (KE increases).'
    },
    {
      number: 19,
      part: 'A',
      text: 'A spring has a spring constant of 50. N/m. If the spring is compressed 0.10 meter, the potential energy stored in the spring is',
      choices: ['0.25 J', '2.5 J', '5.0 J', '25 J'],
      topic: 'Energy & Power',
      correct: 0,
      explanation: 'The potential energy is 0.25 J (choice 1), calculated using the formula PEs = ½kx². By plugging in the spring constant (50 N/m) and the compression (0.10 m), the result is ½ × 50 × (0.10)² = 0.25 Joules.',
      diveDeep: 'This question tests your ability to use the Elastic Potential Energy formula from the Reference Tables. A common mistake is forgetting to square the displacement (x) or forgetting the ½ in the formula. Always check your units; since N/m and meters are used, the energy will correctly be in Joules. Strategy: When dealing with springs, identify your variables (k and x) and double-check that you squared the \'x\' before multiplying.'
    },
    {
      number: 20,
      part: 'A',
      text: 'An electrostatic force of attraction exists between two charged spheres. If the charge on one sphere is doubled, the force will be',
      choices: ['halved', 'doubled', 'the same', 'quadrupled'],
      topic: 'Electricity & Magnetism',
      correct: 1,
      explanation: 'The force will be doubled (choice 2) because electrostatic force is directly proportional to the product of the two charges. According to Coulomb\'s Law, if you multiply one of the charges by two, the resulting force must also be multiplied by two.',
      diveDeep: 'This is a classic \'proportionality\' question based on Coulomb\'s Law (Fe = kq₁q₂/r²). Traps often involve confusing charge changes with distance changes; doubling a charge doubles the force, but doubling the distance would quarter it. Students might also overthink and try to square the change, which only applies to the distance. Strategy: Write out the formula and replace the variables being changed with their factors (e.g., replace q₁ with 2q₁) to see how the total value changes.'
    },
    {
      number: 21,
      part: 'A',
      text: 'Which diagram represents the electric field lines near a positive point charge?',
      choices: [
        'Concentric circles around the charge',
        'Straight lines pointing directly toward the charge',
        'Straight lines pointing directly away from the charge',
        'Concentric square shapes around the charge'
      ],
      topic: 'Electricity & Magnetism',
      correct: 2,
      explanation: 'Electric field lines are defined by the direction a positive test charge would move. Since like charges repel, the lines must point directly away from a positive point charge.',
      diveDeep: 'By convention, field lines always exit positive charges and enter negative charges. They never cross each other and their density represents the strength of the field (closer lines mean a stronger field). A common trap is confusing electric field lines with magnetic field lines, which can form loops. Strategy: Memorize the \'Positive = Out, Negative = In\' rule for both electric fields and gravitational fields (though gravity only goes \'In\').'
    },
    {
      number: 22,
      part: 'A',
      text: 'If three 6.0-Ohm resistors are connected in parallel, what is their equivalent combined resistance?',
      choices: ['2.0 Ω', '6.0 Ω', '12 Ω', '18 Ω'],
      topic: 'Electricity & Magnetism',
      correct: 0,
      explanation: 'The equivalent resistance is 2.0 Ω. In a parallel circuit, you calculate the total resistance using the reciprocal formula (1/Req = 1/R₁ + 1/R₂ + 1/R₃); since the resistors are identical, you can also simply divide the resistance of one (6.0 Ω) by the number of branches (3).',
      diveDeep: 'A key rule to remember for parallel circuits is that the equivalent resistance will always be less than the smallest individual resistor in the group. This happens because adding more paths (branches) for the current to flow through actually reduces the overall resistance of the circuit. If your calculated answer is larger than the individual resistors (like the 18 Ω distractor for series), you likely used the wrong formula.'
    },
    {
      number: 23,
      part: 'A',
      text: 'A wave in which the particles of the medium vibrate perpendicular to the direction of wave motion is classified as',
      choices: ['transverse', 'longitudinal', 'torsional', 'magnetic'],
      topic: 'Waves & Optics',
      correct: 0,
      explanation: 'The correct answer is transverse. In a transverse wave, the particles move up and down (or side to side) at a 90-degree angle to the direction the wave energy travels.',
      diveDeep: 'Light and other electromagnetic waves are examples of transverse waves, while sound is a longitudinal wave where particles move parallel to the wave direction. Students often confuse these two, but you can remember that \'Transverse\' starts with \'T\', which looks like a right angle or perpendicular intersection. Visualizing a \'stadium wave\' where fans jump up while the wave moves horizontally is a great way to anchor this concept.'
    },
    {
      number: 24,
      part: 'A',
      text: 'What phenomenon occurs when a wave bends around the edges of an obstacle?',
      choices: ['reflection', 'refraction', 'diffraction', 'dispersion'],
      topic: 'Waves & Optics',
      correct: 2,
      explanation: 'Diffraction (choice 3) is the phenomenon where waves bend as they pass around the edge of an obstacle or through a small opening. This is a characteristic behavior of all waves, including sound, light, and water waves.',
      diveDeep: 'It is easy to confuse diffraction with refraction; remember that refraction requires the wave to enter a new medium (changing speed), while diffraction happens in the same medium. Dispersion is the separation of light into colors (like in a prism), and reflection is simply bouncing off a surface. Strategy: Associate \'bending around corners\' or \'spreading through gaps\' specifically with the term diffraction.'
    },
    {
      number: 25,
      part: 'A',
      text: 'The absolute index of refraction of a medium is 1.50. What is the speed of light in this medium?',
      choices: ['1.50 × 10^8 m/s', '2.00 × 10^8 m/s', '3.00 × 10^8 m/s', '4.50 × 10^8 m/s'],
      topic: 'Waves & Optics',
      correct: 1,
      explanation: 'The speed of light is 2.00 × 10⁸ m/s (choice 2), which is found by dividing the speed of light in a vacuum (3.00 × 10⁸ m/s) by the index of refraction (1.50). This relationship is defined by the formula n = c/v.',
      diveDeep: 'The index of refraction (n) is a ratio that compares how much slower light travels in a material compared to a vacuum. Since n is always 1.00 or greater for physical materials, the speed of light in a medium will always be less than or equal to 3.00 × 10⁸ m/s. A common trap is multiplying instead of dividing, which would result in a speed faster than light—a physical impossibility. Strategy: Always check that your calculated speed is lower than \'c\' and use the \'Speed of Light in a Vacuum\' constant from your reference table.'
    },
    {
      number: 26,
      part: 'A',
      text: 'A neutron is composed of which combination of quarks?',
      choices: ['up, up, down (uud)', 'up, down, down (udd)', 'up, up, up (uuu)', 'down, down, down (ddd)'],
      topic: 'Modern Physics',
      correct: 1,
      explanation: 'A neutron consists of one up quark and two down quarks (udd). This combination results in a neutral particle because the charges (+2/3, -1/3, and -1/3) sum exactly to zero.',
      diveDeep: 'Quarks are the fundamental building blocks of \'hadrons\' like protons and neutrons. It is easy to confuse the neutron (udd) with the proton (uud), so remember that \'up\' quarks have a positive 2/3 charge while \'down\' quarks have a negative 1/3 charge. You can always use the \'Particles of the Standard Model\' chart on your Reference Table to verify these charge sums during the test.'
    },
    {
      number: 27,
      part: 'A',
      text: 'Electrons are classified under the Standard Model as',
      choices: ['leptons', 'baryons', 'mesons', 'quarks'],
      topic: 'Modern Physics',
      correct: 0,
      explanation: 'Electrons are classified as leptons. Unlike baryons and mesons, leptons are fundamental particles that are not made up of smaller components like quarks.',
      diveDeep: 'The Standard Model divides matter into two main categories: leptons and quarks. While quarks interact via the strong nuclear force to form larger particles, leptons like the electron and neutrino do not experience the strong force. Remember that electrons have a lepton number of +1 and are much lighter than the particles in the hadron family. On the exam, if you are asked about fundamental particles that exist on their own without quarks, leptons is almost always the answer.'
    },
    {
      number: 28,
      part: 'A',
      text: 'What is the charge of an up quark?',
      choices: ['-1/3 e', '+1/3 e', '-2/3 e', '+2/3 e'],
      topic: 'Modern Physics',
      correct: 3,
      explanation: 'The charge of an up quark is +2/3 e (choice 4). Quarks are elementary particles that carry fractional charges, and the up quark is one of the \'up-type\' quarks that all share this positive two-thirds charge.',
      diveDeep: 'This is a pure recall question that can be quickly verified using the \'Particles of the Standard Model\' chart in your Physics Reference Tables. Students often mix up the fractional charges of \'up-type\' (+2/3) and \'down-type\' (-1/3) quarks. Knowing these charges is essential for determining the total charge of composite particles like protons (uud = +1) and neutrons (udd = 0). Strategy: Never guess on quark charges; always flip to the last page of your reference table to confirm the sign and fraction.'
    },
    {
      number: 29,
      part: 'A',
      text: 'Which force is responsible for holding the nucleus of an atom together?',
      choices: ['gravitational force', 'electromagnetic force', 'strong nuclear force', 'weak nuclear force'],
      topic: 'Modern Physics',
      correct: 2,
      explanation: 'The correct answer is the strong nuclear force. This force acts between protons and neutrons at very short distances to overcome the electromagnetic repulsion between positive protons.',
      diveDeep: 'Without the strong nuclear force, the nucleus would instantly fly apart because like-charged protons repel each other with great intensity. Gravity is much too weak to hold subatomic particles together, and the weak force is primarily involved in radioactive decay. Remembering that \'strong\' refers to its ability to dominate over the \'electromagnetic\' repulsion at close range is a key strategy for this topic.'
    },
    {
      number: 30,
      part: 'A',
      text: 'Planck\'s constant h is equal to',
      choices: ['6.63 × 10^-34 J·s', '3.00 × 10^8 m/s', '1.60 × 10^-19 C', '9.81 m/s^2'],
      topic: 'Modern Physics',
      correct: 0,
      explanation: 'Planck\'s constant h is equal to 6.63 × 10⁻³⁴ J·s. This fundamental constant relates the energy of a photon to its frequency through the equation E = hf.',
      diveDeep: 'Max Planck introduced this constant to explain blackbody radiation, marking the birth of quantum mechanics. It defines the scale at which quantum effects become important, showing that energy is quantized rather than continuous. The other choices represent the speed of light (c), the elementary charge (e), and the acceleration due to gravity (g). A reliable strategy for these questions is to look at the units; J·s is specific to action or angular momentum, which characterizes Planck\'s constant.'
    },
    {
      number: 31,
      part: 'B-1',
      text: 'A ball is thrown horizontally with a speed of 10. m/s from a height of 5.0 meters. How much time does it take for the ball to hit the ground?',
      choices: ['0.50 s', '1.0 s', '2.0 s', '5.0 s'],
      topic: 'Mechanics & Forces',
      correct: 1,
      explanation: 'The correct answer is 1.0 s. Using the vertical motion formula d = 1/2 at², we solve 5.0 m = 1/2 (9.8 m/s²)t², which yields approximately 1 second.',
      diveDeep: 'The most important concept here is that horizontal and vertical motions are independent; the ball\'s horizontal speed of 10 m/s does not affect how fast it falls. Whether you drop the ball or fire it from a cannon horizontally, it will hit the ground at the same time from the same height. On the exam, always use only the vertical components (initial vertical velocity is zero) to find the time of flight.'
    },
    {
      number: 32,
      part: 'B-1',
      text: 'A 1.0-kilogram mass is attached to a string of length 2.0 meters and revolves in a circle at a constant speed of 4.0 meters per second. What is the centripetal force acting on the mass?',
      choices: ['2.0 N', '4.0 N', '8.0 N', '16 N'],
      topic: 'Mechanics & Forces',
      correct: 2,
      explanation: 'The correct answer is 8.0 N. Using the formula Fc = mv²/r, we calculate (1.0 kg × (4.0 m/s)²) / 2.0 m, which equals 16 / 2 = 8.0 Newtons.',
      diveDeep: 'Centripetal force is always directed toward the center of the circular path and is required to keep an object in uniform circular motion. A common error is forgetting to square the velocity or accidentally using the diameter instead of the radius (length of the string). Always double-check your Reference Table for the formula and ensure your units are in kilograms, meters, and seconds before calculating.'
    },
    {
      number: 33,
      part: 'B-1',
      text: 'An elastic collision occurs between two spheres of equal mass. If sphere A is moving at v and sphere B is at rest before the collision, what is sphere A\'s speed after the collision?',
      choices: ['zero', 'v/2', 'v', '2v'],
      topic: 'Mechanics & Forces',
      correct: 0,
      explanation: 'The correct answer is zero. In a perfectly elastic collision between two identical masses where one is stationary, they swap velocities completely.',
      diveDeep: 'This is often demonstrated with billiard balls; the cue ball hits a stationary ball and stops dead while the second ball moves off with the original speed. This happens because both momentum and kinetic energy must be conserved. If the masses were not equal, sphere A would either continue forward or bounce backward, but the \'equal mass\' keyword is your cue for a total velocity exchange.'
    },
    {
      number: 34,
      part: 'B-1',
      text: 'A 5.0-Newton force is applied to a block at an angle of 60. degrees above the horizontal. What is the horizontal component of the force?',
      choices: ['2.5 N', '4.3 N', '5.0 N', '10. N'],
      topic: 'Mechanics & Forces',
      correct: 0,
      explanation: 'The correct answer is 2.5 N. The horizontal component is found by multiplying the magnitude of the force by the cosine of the angle: Fx = F cos(θ) = 5.0 N × cos(60°).',
      diveDeep: 'Since the cosine of 60 degrees is 0.5, the horizontal component is exactly half the applied force. Students often mistakenly use sine, which would give the vertical component (4.3 N) instead. A helpful visual check is to remember that as the angle increases toward 90 degrees, the horizontal component should get smaller, while the vertical component gets larger.'
    },
    {
      number: 35,
      part: 'B-1',
      text: 'What represents the work done when a 10.0-Newton force is used to push a box 5.00 meters across a level floor?',
      choices: ['2.00 J', '5.00 J', '50.0 J', '100. J'],
      topic: 'Energy & Power',
      correct: 2,
      explanation: 'The correct answer is 50.0 J. Work is calculated by multiplying the force applied by the distance moved in the direction of the force (W = Fd), so 10.0 N × 5.00 m = 50.0 Joules.',
      diveDeep: 'Work represents the transfer of energy to the object, and its unit is the Joule (equivalent to a Newton-meter). If the force was applied at an angle, you would only use the component of the force that is parallel to the displacement. Be careful with distractors that might ask for \'Power,\' which would require dividing this work by time.'
    },
    {
      number: 36,
      part: 'B-1',
      text: 'A 60.-kilogram student runs up a flight of stairs that is 4.0 meters high in 3.0 seconds. What is the average power developed by the student?',
      choices: ['80. W', '240 W', '780 W', '2350 W'],
      topic: 'Energy & Power',
      correct: 2,
      explanation: 'Power is the rate at which work is done, calculated as P = (mgh) / t. Using the student\'s mass, gravity, and height, the calculation (60. kg × 9.81 m/s² × 4.0 m) / 3.0 s gives approximately 780 W.',
      diveDeep: 'In this problem, the student is performing work against gravity to increase their gravitational potential energy. Power measures how quickly this energy transfer occurs; notice that if the student ran faster, the power would increase even though the work done stays the same. A common mistake is forgetting to multiply mass by gravity (9.81 m/s²) to find the force (weight). Always ensure your time is in seconds and your mass is in kilograms to get the result in Watts.'
    },
    {
      number: 37,
      part: 'B-1',
      text: 'A 2.0-kilogram object is moving at 10. meters per second. What is the kinetic energy of the object?',
      choices: ['10. J', '20. J', '100. J', '200. J'],
      topic: 'Energy & Power',
      correct: 2,
      explanation: 'Kinetic energy is the energy of motion and is calculated using the formula KE = ½mv². Substituting the given values, ½(2.0 kg)(10. m/s)² equals 100. Joules.',
      diveDeep: 'The relationship between velocity and kinetic energy is squared, meaning that speed has a much greater impact on energy than mass does. For example, if this object\'s speed doubled to 20 m/s, its energy would actually quadruple to 400 J! When solving these on the exam, the most frequent error is forgetting to square the velocity. Always write out the formula first to ensure you don\'t skip that critical step.'
    },
    {
      number: 38,
      part: 'B-1',
      text: 'An electrostatic force of F exists between two charges separated by a distance of r. If the distance between the charges is doubled, the new force will be',
      choices: ['F/4', 'F/2', '2F', '4F'],
      topic: 'Electricity & Magnetism',
      correct: 0,
      explanation: 'The new force is F/4. Because electrostatic force follows an inverse square law (1/r²), doubling the distance means the force is divided by 2² (or 4). Choices like 2F or 4F incorrectly suggest that force increases with distance, which contradicts Coulomb\'s Law.',
      diveDeep: 'This \'proportionality\' question is a Regents favorite. You don\'t need the actual charge values; you just need to see how the change in one variable affects the result. If the distance were tripled, the force would become F/9; if the distance were halved, the force would quadruple (4F). A foolproof strategy is to plug the \'change factor\' into the formula: if r becomes 2, then 1/r² becomes 1/(2²), which is 1/4.'
    },
    {
      number: 39,
      part: 'B-1',
      text: 'A copper wire has a resistance of 10. Ohms. If its length is doubled while its cross-sectional area remains the same, the new resistance will be',
      choices: ['5.0 Ω', '10. Ω', '20. Ω', '40. Ω'],
      topic: 'Electricity & Magnetism',
      correct: 2,
      explanation: 'Resistance is directly proportional to the length of a wire (R = ρL/A). Since the length is doubled and all other factors remain constant, the resistance also doubles from 10. Ω to 20. Ω.',
      diveDeep: 'Think of a wire like a hallway: a longer hallway is harder to walk through because there is more distance for \'collisions\' to occur, which represents higher resistance. The formula R = ρL/A shows that length (L) is in the numerator, confirming this direct relationship. Be careful on the exam if the question mentions changing the area or radius; area is in the denominator, so doubling the area would actually cut the resistance in half.'
    },
    {
      number: 40,
      part: 'B-1',
      text: 'What is the voltage drop across a 4.0-Ohm resistor carrying a current of 3.0 Amperes?',
      choices: ['0.75 V', '1.3 V', '12 V', '48 V'],
      topic: 'Electricity & Magnetism',
      correct: 2,
      explanation: 'According to Ohm\'s Law, voltage drop is calculated as V = IR. Multiplying the current of 3.0 A by the resistance of 4.0 Ω gives a potential difference of 12 V.',
      diveDeep: 'Ohm\'s Law is the most fundamental relationship in circuit electricity, linking the \'push\' (voltage), the \'flow\' (current), and the \'opposition\' (resistance). You can think of voltage as the energy given to each charge as it moves through the resistor. On the Regents, always check your Reference Table for this formula and ensure your units are in standard Ohms, Amperes, and Volts before calculating.'
    },
    {
      number: 41,
      part: 'B-1',
      text: 'A parallel circuit contains two branches. The voltage drop across the first branch is 12 Volts. What is the voltage drop across the second branch?',
      choices: ['6.0 V', '12 V', '24 V', 'equal to the current'],
      topic: 'Electricity & Magnetism',
      correct: 1,
      explanation: 'In a parallel circuit, the voltage drop is the same across all branches. Since the first branch has a 12 V drop, the second branch must also have a 12 V drop.',
      diveDeep: 'This is a defining characteristic of parallel circuits: every path from the positive to the negative terminal of the source experiences the full potential difference of that source. This is why your home is wired in parallel—every outlet provides the same 120 volts regardless of what is plugged in. Don\'t be fooled by questions that give you different resistance values for the branches; the voltage remains constant regardless of the resistance.'
    },
    {
      number: 42,
      part: 'B-1',
      text: 'A wave has a frequency of 100. Hertz and travels at 300. meters per second. What is the wavelength of the wave?',
      choices: ['0.33 m', '3.00 m', '30.0 m', '300.0 m'],
      topic: 'Waves & Optics',
      correct: 1,
      explanation: 'The relationship between wave speed, frequency, and wavelength is v = fλ. Rearranging to solve for wavelength (λ = v/f), we divide 300. m/s by 100. Hz to get 3.00 m.',
      diveDeep: 'Wavelength and frequency are inversely proportional when the speed of the wave is constant. This means that high-frequency waves (like blue light) have short wavelengths, while low-frequency waves (like red light) have long wavelengths. When calculating, always ensure your units are consistent—Hertz is equivalent to \'per second,\' which allows the seconds to cancel out and leave you with meters.'
    },
    {
      number: 43,
      part: 'B-1',
      text: 'A light ray enters a block of crown glass (index of refraction = 1.52) from air. As the light enters the glass, the ray bends',
      choices: [
        'toward the normal because it slows down',
        'away from the normal because it slows down',
        'toward the normal because it speeds up',
        'away from the normal because it speeds up'
      ],
      topic: 'Waves & Optics',
      correct: 0,
      explanation: 'The light bends toward the normal because it slows down. When light moves from a lower index of refraction (air, n ≈ 1) to a higher one (glass, n = 1.52), it loses speed and its path shifts closer to the perpendicular normal line. Distractors suggesting it bends \'away\' or \'speeds up\' describe the opposite transition (glass to air).',
      diveDeep: 'The behavior of light at boundaries is governed by the index of refraction, which is a ratio of the speed of light in a vacuum to its speed in the material. A higher index means the light travels more slowly. A great mnemonic to remember is \'FST\': Fast to Slow, Towards the normal. This principle is why objects underwater appear to be at different depths than they actually are. Master this \'bending\' rule to solve almost any refraction problem without even needing Snell\'s Law.'
    },
    {
      number: 44,
      part: 'B-1',
      text: 'A wave pulse is reflected from a rigid boundary. Compared to the incident pulse, the reflected pulse is inverted by',
      choices: ['0°', '90°', '180°', '360°'],
      topic: 'Waves & Optics',
      correct: 2,
      explanation: 'The reflected pulse is inverted by 180°. This flip occurs because the rigid boundary acts as a fixed point that exerts an equal and opposite downward force on the incoming upward pulse. Choices like 0° describe reflection from a \'free\' or non-rigid boundary where no inversion happens.',
      diveDeep: 'This inversion is a direct application of Newton\'s Third Law: as the wave pulse pulls up on the wall, the wall pulls down on the string with an equal force, creating a new pulse that is upside down. If the end of the string were free to move (like a ring on a pole), the pulse would bounce back upright. In wave physics, a 180° phase shift is the same as turning a \'crest\' into a \'trough.\' When reading these questions, always check if the boundary is described as \'fixed,\' \'rigid,\' or \'hard.\''
    },
    {
      number: 45,
      part: 'B-1',
      text: 'Which phenomenon is responsible for the separation of white light into its component colors when passing through a prism?',
      choices: ['reflection', 'refraction', 'dispersion', 'diffraction'],
      topic: 'Waves & Optics',
      correct: 2,
      explanation: 'The correct phenomenon is dispersion. This occurs because different colors (frequencies) of light refract at slightly different angles when passing through a material. While refraction is the bending itself, dispersion is the specific term for the separation of those colors into a spectrum.',
      diveDeep: 'Dispersion happens because the index of refraction for a material like glass is not a single fixed number; it actually varies slightly depending on the wavelength of the light. Violet light has a higher frequency and shorter wavelength, so it interacts more with the material, slows down more, and bends more sharply than red light. This is why red is always at the top of a rainbow and violet is at the bottom. Distractors like diffraction or reflection involve light bending around corners or bouncing off surfaces, which does not cause this specific color separation.'
    },
    {
      number: 46,
      part: 'B-1',
      text: 'What is the frequency of a photon of light containing 4.0 × 10^-19 Joule of energy?',
      choices: ['6.0 × 10^14 Hz', '2.5 × 10^14 Hz', '6.0 × 10^15 Hz', '2.5 × 10^15 Hz'],
      topic: 'Modern Physics',
      correct: 0,
      explanation: 'The energy of a photon is given by E = hf, where h is Planck\'s constant. Dividing the energy (4.0 × 10⁻¹⁹ J) by Planck\'s constant (6.63 × 10⁻³⁴ J·s) yields a frequency of 6.0 × 10¹⁴ Hz.',
      diveDeep: 'This question explores the \'quantum\' nature of light, where energy is proportional to frequency rather than brightness. Planck\'s constant is a tiny value found on your Reference Table, and it acts as the bridge between the wave property (frequency) and the particle property (energy) of light. A common trap is using the speed of light formula (c = fλ) instead of the energy formula; remember to use E = hf whenever the problem mentions Joules or photons.'
    },
    {
      number: 47,
      part: 'B-1',
      text: 'A proton consists of which combination of quarks?',
      choices: ['up, up, down (uud)', 'up, down, down (udd)', 'up, up, up (uuu)', 'down, down, down (ddd)'],
      topic: 'Modern Physics',
      correct: 0,
      explanation: 'A proton consists of two up quarks and one down quark (uud). This combination results in a total net charge of +1e, which matches the known charge of a proton.',
      diveDeep: 'Quarks are the fundamental building blocks of hadrons, such as protons and neutrons. Protons (uud) and neutrons (udd) are both classified as baryons because they are made of three quarks. You can verify these combinations using the charges provided in your Reference Table: Up quarks have a charge of +2/3e and Down quarks have -1/3e. A great exam strategy is to calculate the total charge of the choices if you forget the specific combination.'
    },
    {
      number: 48,
      part: 'B-1',
      text: 'A baryon must always consist of how many quarks?',
      choices: ['one', 'two', 'three', 'four'],
      topic: 'Modern Physics',
      correct: 2,
      explanation: 'A baryon must always consist of three quarks. Protons and neutrons are the most common examples, each made of three-quark combinations. Mesons, a different type of particle, are made of two quarks (one quark and one antiquark).',
      diveDeep: 'In the Standard Model, hadrons are divided into baryons and mesons based on their quark count. For a particle to be stable and \'color-neutral,\' it must combine quarks in specific ways; for baryons, this requires three quarks of different \'colors\' (red, green, and blue). This three-quark structure is what gives baryons their relatively large mass compared to other particles. A quick memory trick is that \'Baryon\' starts with \'B\' like \'Big,\' and three is the largest number of quarks you\'ll usually be asked about for a single particle.'
    },
    {
      number: 49,
      part: 'B-1',
      text: 'A meson must always consist of',
      choices: [
        'a quark and an antiquark',
        'three quarks',
        'three antiquarks',
        'leptons and gauge bosons'
      ],
      topic: 'Modern Physics',
      correct: 0,
      explanation: 'A meson must always consist of a quark and an antiquark. This two-particle structure distinguishes them from baryons, which consist of three quarks. Distractors like \'leptons\' are incorrect because leptons are a completely different family of particles (like electrons) that contain no quarks at all.',
      diveDeep: 'Mesons are unique because they pair a matter particle with an antimatter particle, which makes them highly unstable compared to baryons. They are essential for explaining how the strong nuclear force keeps the nucleus of an atom together. Be careful not to confuse them with baryons (3 quarks) or leptons (like electrons, which have no quarks). Check your Reference Table\'s \'Classification of Matter\' chart if you forget these groupings. Remember: 3 quarks = Baryon, 2 quarks (matter/antimatter) = Meson.'
    },
    {
      number: 50,
      part: 'B-1',
      text: 'According to the mass-energy equivalence equation E=mc^2, if 1.0 microgram of mass is converted entirely into energy, how much energy is released?',
      choices: ['9.0 × 10^7 J', '9.0 × 10^10 J', '9.0 × 10^13 J', '9.0 × 10^16 J'],
      topic: 'Modern Physics',
      correct: 0,
      explanation: 'First, convert 1.0 microgram to kilograms (1.0 × 10⁻⁹ kg). Then, using E = mc², multiply the mass by the square of the speed of light (3.0 × 10⁸ m/s)², resulting in 9.0 × 10⁷ J.',
      diveDeep: 'Einstein\'s most famous equation shows that mass is actually a highly concentrated form of energy. The speed of light squared (c²) is a massive number (9 × 10¹⁶), which is why even a tiny \'micro\' amount of mass releases an enormous amount of energy. The key to this problem is the unit conversion: \'micro\' means 10⁻⁶, and since there are 1,000 grams in a kilogram, you must be very careful with your exponents to reach the correct answer.'
    }
  ]
}
